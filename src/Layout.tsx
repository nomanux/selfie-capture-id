import { useState, type ReactNode } from "react";
import "./tailwind.css";
import "./Dashboard.css";
import { dmciLogoUrl } from "./assets/figmaAssets";
import { useNavigation } from "./NavigationContext";
import EntitySelectionModal, {
  type SelectedEntity,
} from "./EntitySelectionModal";
import {
  LayoutDashboardIcon,
  Building2Icon,
  WalletIcon,
  FileTextIcon,
  UsersIcon,
  TicketIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  MenuIcon,
  XIcon,
  type IconProps,
} from "./icons";

/**
 * Layout — shared sidebar navigation + topbar shell used by every DMCI Homes
 * Sales CRF/RA screen (Dashboard, Properties, Project Details, Tower, Floor,
 * Unit, Parking Slot, Service Area). Extracted from Dashboard.tsx so each new
 * page doesn't re-implement the ~150 lines of nav markup. Navigation is
 * wired through NavigationContext (see App.tsx / NavigationContext.tsx).
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, "Sidebar navigation" + "Avatar
 * and Title" components (shared across nodes 170838:208627, 173418:205101,
 * 173418:205335, 173418:206077/206944/206320/206142/206498).
 */

export type NavKey =
  | "dashboard"
  | "properties"
  | "commissions"
  | "computation"
  | "clients"
  | "lottery";

interface NavLeaf {
  key: NavKey;
  label: string;
  icon: (props: IconProps) => React.JSX.Element;
  onClick?: () => void;
}

interface NavSubItem {
  label: string;
  onClick?: () => void;
}

interface NavBranch {
  key: NavKey;
  label: string;
  icon: (props: IconProps) => React.JSX.Element;
  items: NavSubItem[];
}

function isBranch(item: NavLeaf | NavBranch): item is NavBranch {
  return "items" in item;
}

function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: (props: IconProps) => React.JSX.Element;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex h-10 w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-semibold transition-colors " +
        (active
          ? "bg-gray-50 text-primary-500"
          : "text-gray-500 hover:bg-gray-50")
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </button>
  );
}

function NavDropdown({
  icon: Icon,
  label,
  items,
  active,
  activeSubItem,
  defaultOpen,
}: {
  icon: (props: IconProps) => React.JSX.Element;
  label: string;
  items: NavSubItem[];
  active?: boolean;
  activeSubItem?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen || !!active);
  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          "flex h-10 w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-semibold transition-colors " +
          (active ? "text-primary-500" : "text-gray-500 hover:bg-gray-50")
        }
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1">{label}</span>
        {open ? (
          <ChevronUpIcon className="h-4 w-4 shrink-0" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 shrink-0" />
        )}
      </button>
      {open && items.length > 0 && (
        <div className="flex flex-col items-start pb-1">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              disabled={!item.onClick}
              className={
                "w-full rounded-md py-1.5 pl-8 pr-2 text-left text-[13px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent " +
                (item.onClick ? "cursor-pointer " : "") +
                (item.label === activeSubItem
                  ? "bg-gray-50 font-semibold text-primary-500"
                  : "font-medium text-gray-700")
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface LayoutProps {
  /** Which top-level sidebar section is highlighted. */
  active: NavKey;
  /** Which sub-item (for Properties / Commissions) is highlighted, if any. */
  activeSubItem?: string;
  /** Breadcrumb trail shown in the topbar. Last item is emphasized and not clickable. */
  breadcrumb: (string | BreadcrumbItem)[];
  /** @deprecated the entity chip now always shows in the topbar on every screen; this prop is ignored and kept only so existing call sites don't need to change. */
  orgBadge?: boolean;
  children: ReactNode;
}

export default function Layout({
  active,
  activeSubItem,
  breadcrumb,
  children,
}: LayoutProps) {
  const { navigate } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [entityModalOpen, setEntityModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>({
    code: "DPDI",
    name: "DMCI Project Developers Insc.",
  });

  // Wraps navigate() so tapping any nav destination also closes the mobile
  // drawer. Dropdown expand/collapse (NavDropdown's own onClick) is untouched
  // so opening "Properties" on a phone doesn't immediately hide its sub-items.
  const go = (route: Parameters<typeof navigate>[0]) => {
    navigate(route);
    setSidebarOpen(false);
  };

  const navItems: (NavLeaf | NavBranch)[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboardIcon,
      onClick: () => go({ screen: "dashboard" }),
    },
    {
      key: "properties",
      label: "Properties",
      icon: Building2Icon,
      items: [
        { label: "Projects", onClick: () => go({ screen: "properties" }) },
        {
          label: "Unit Availability",
          onClick: () => go({ screen: "unit-availability" }),
        },
        {
          label: "Unit Holding",
          onClick: () => go({ screen: "unit-holding" }),
        },
      ],
    },
    {
      key: "commissions",
      label: "Commissions",
      icon: WalletIcon,
      items: [
        {
          label: "Advance Commission",
          onClick: () => go({ screen: "advance-commission" }),
        },
        {
          label: "Regular Commission",
          onClick: () => go({ screen: "regular-commission" }),
        },
        {
          label: "For Compliance",
          onClick: () => go({ screen: "compliance" }),
        },
      ],
    },
    {
      key: "computation",
      label: "Computation Sheet",
      icon: FileTextIcon,
      onClick: () => go({ screen: "computation-sheet" }),
    },
    {
      key: "clients",
      label: "Clients",
      icon: UsersIcon,
      onClick: () => go({ screen: "clients" }),
    },
    {
      key: "lottery",
      label: "Lottery Event",
      icon: TicketIcon,
      items: [
        {
          label: "Registration",
          onClick: () => go({ screen: "lottery-registration" }),
        },
        {
          label: "Lottery",
          onClick: () => go({ screen: "lottery-unit-picker" }),
        },
      ],
    },
  ];

  const crumbs: BreadcrumbItem[] = breadcrumb.map((c) =>
    typeof c === "string" ? { label: c } : c,
  );

  return (
    <div className="db-page">
      {/* Mobile backdrop — tap to close the drawer. Sidebar is always in
          normal flow from lg upward, so this never renders there. */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar navigation — fixed off-canvas drawer below lg, static
          in-flow column from lg upward. */}
      <aside
        className={
          "fixed inset-y-0 left-0 z-40 w-64 shrink-0 -translate-x-full transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:w-60 lg:translate-x-0 " +
          (sidebarOpen ? "translate-x-0" : "")
        }
      >
        <div className="flex h-full w-full flex-col justify-between border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto pt-5">
            <div className="flex items-center justify-between gap-2 px-4">
              <button
                type="button"
                onClick={() => go({ screen: "dashboard" })}
                className="flex cursor-pointer items-center self-start"
                aria-label="Go to dashboard"
              >
                <img
                  className="h-8 w-auto"
                  src={dmciLogoUrl}
                  alt="DMCI Homes Sales"
                />
              </button>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setSidebarOpen(false)}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-gray-500 hover:bg-gray-50 lg:hidden"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-start gap-1 px-4">
              {navItems.map((item) =>
                isBranch(item) ? (
                  <NavDropdown
                    key={item.key}
                    icon={item.icon}
                    label={item.label}
                    items={item.items}
                    active={active === item.key}
                    activeSubItem={
                      active === item.key ? activeSubItem : undefined
                    }
                  />
                ) : (
                  <NavItem
                    key={item.key}
                    icon={item.icon}
                    label={item.label}
                    active={active === item.key}
                    onClick={item.onClick}
                  />
                ),
              )}
            </nav>
          </div>

          <div className="flex flex-col gap-4 px-4 pb-4">
            <div className="relative flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-[0_1px_1px_rgba(10,13,18,0.05)]">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[0.75px] border-black/10 bg-gray-100 text-sm font-semibold text-primary-600">
                  OR
                </div>
                <div className="flex flex-col text-sm leading-5">
                  <span className="font-semibold text-gray-900">
                    Super Admin
                  </span>
                  <span className="text-gray-600">Admin</span>
                </div>
              </div>
              <button
                type="button"
                aria-label="Account menu"
                className="absolute right-[5px] top-[5px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-500 hover:bg-gray-50"
              >
                <ChevronsUpDownIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="db-main-col">
        {/* Top bar */}
        <header className="flex w-full shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-white px-3 py-3 sm:gap-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setSidebarOpen((v) => !v)}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md text-gray-500 hover:bg-gray-50"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
            <nav
              aria-label="Breadcrumb"
              className="flex min-w-0 items-center gap-2 overflow-hidden text-sm"
            >
              {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                return (
                  <span
                    key={index}
                    className={
                      "items-center gap-2 " +
                      (isLast
                        ? "flex min-w-0 shrink"
                        : "hidden shrink-0 sm:flex")
                    }
                  >
                    {index > 0 && (
                      <ChevronRightIcon className="h-4 w-4 shrink-0 text-gray-400" />
                    )}
                    {crumb.onClick && !isLast ? (
                      <button
                        type="button"
                        onClick={crumb.onClick}
                        className="cursor-pointer truncate rounded-md px-1 font-medium text-gray-500 hover:text-primary-500 hover:underline"
                      >
                        {crumb.label}
                      </button>
                    ) : (
                      <span
                        className={
                          "truncate rounded-md px-1 " +
                          (isLast
                            ? "font-semibold text-primary-500"
                            : "font-medium text-gray-500")
                        }
                      >
                        {crumb.label}
                      </span>
                    )}
                  </span>
                );
              })}
            </nav>
          </div>

          <button
            type="button"
            onClick={() => setEntityModalOpen(true)}
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-primary-50 bg-white py-1 pl-1 px-1 hover:bg-gray-50"
          >
            <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-primary-500">
              {selectedEntity.code}
            </span>
            <span className="hidden truncate text-sm font-medium text-gray-700 sm:block">
              {selectedEntity.name}
            </span>
          </button>
        </header>

        {/* Scrollable content */}
        <main className="db-main">{children}</main>
      </div>

      {entityModalOpen && (
        <EntitySelectionModal
          selected={selectedEntity}
          onSelect={setSelectedEntity}
          onClose={() => setEntityModalOpen(false)}
        />
      )}
    </div>
  );
}

export function PageBackHeading({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  const { back } = useNavigation();
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Go back"
        onClick={onBack ?? back}
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
    </div>
  );
}
