import { useState } from "react";
import Layout from "./Layout";
import FilterBar, { type FilterField } from "./FilterBar";
import Pagination from "./Pagination";
import Checkbox from "./Checkbox";
import { DownloadPdfButton, LinkBadge, StatusPill, TableCardHeader } from "./StatusBadge";
import { GridIcon, ListIcon } from "./icons";
import { useNavigation, type Screen } from "./NavigationContext";
import { acaciaEstatesLogoUrl, aristaPlaceLogoUrl, valeronTowerLogoUrl, noImageAvailableUrl } from "./assets/figmaAssets";

/**
 * PropertiesListView — "Property > List" screen, with the List/Grid toggle.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv,
 *   List view: node 173418:205101
 *   Grid view: node 173418:205694
 */

const FILTERS: FilterField[] = [
  { kind: "select", label: "Project", placeholder: "Select project" },
  { kind: "text", label: "Location", placeholder: "Enter location" },
  { kind: "select", label: "Status", placeholder: "Select status" },
  { kind: "select", label: "Type", placeholder: "Select type" },
];

// Only these link labels have a matching screen to navigate to.
const LINK_SCREENS: Record<string, Screen> = {
  Tower: "tower",
  Floor: "floor",
  Unit: "unit",
};

interface ProjectRow {
  code: string;
  project: string;
  type: string;
  status: string;
  building: number;
  units: number;
  links: string[];
}

const PROJECTS: ProjectRow[] = [
  { code: "ACP", project: "Accolade Place", type: "Mid-rise", status: "Ready for Occupancy", building: 1, units: 130, links: ["Tower", "Floor", "Unit"] },
  { code: "ALR", project: "Spring Lane Homes", type: "Subdivision", status: "Ongoing Construction", building: 5, units: 523, links: ["House & Lot", "Lot Only"] },
  { code: "BFS", project: "Maple Grove Estates", type: "High-rise", status: "Under Review", building: 10, units: 874, links: ["Tower", "Floor", "Unit"] },
  { code: "CQT", project: "Riverbend Apartments", type: "Apartment Complex", status: "Pending Approval", building: 15, units: 215, links: ["House & Lot", "Lot Only"] },
  { code: "DPX", project: "Sunnyvale Villas", type: "Single-family Home", status: "Approved", building: 20, units: 689, links: ["Tower", "Floor", "Unit"] },
  { code: "ERZ", project: "Cedarwood Condominiums", type: "Townhouse", status: "Completed", building: 25, units: 432, links: ["House & Lot", "Lot Only"] },
  { code: "FOS", project: "Lakeside Retreat", type: "Mixed-use Development", status: "On Hold", building: 30, units: 107, links: ["Tower", "Floor", "Unit"] },
  { code: "GHI", project: "Horizon Heights", type: "Condominium", status: "Cancelled", building: 35, units: 945, links: ["House & Lot", "Lot Only"] },
  { code: "HJK", project: "Oakridge Meadows", type: "Mobile Home Park", status: "Postponed", building: 40, units: 308, links: ["House & Lot", "Lot Only"] },
];

interface GridCard {
  name: string;
  logoUrl?: string;
  available: [number, number, number];
  sold: [number, number, number];
}

const GRID_CARDS: GridCard[] = [
  { name: "Arista Place", logoUrl: aristaPlaceLogoUrl, available: [1302, 1230, 1123], sold: [523, 523, 523] },
  { name: "Acacia Estates", logoUrl: acaciaEstatesLogoUrl, available: [1302, 1230, 1123], sold: [523, 523, 523] },
  { name: "The Valeron Tower", logoUrl: valeronTowerLogoUrl, available: [1302, 1230, 1123], sold: [523, 523, 523] },
  { name: "Alta Vista De Boracay", available: [1302, 1230, 1123], sold: [523, 523, 523] },
  { name: "Arista Place", logoUrl: aristaPlaceLogoUrl, available: [1302, 1230, 1123], sold: [523, 523, 523] },
  { name: "Arista Place", logoUrl: aristaPlaceLogoUrl, available: [1302, 1230, 1123], sold: [523, 523, 523] },
  { name: "Acacia Estates", logoUrl: acaciaEstatesLogoUrl, available: [1302, 1230, 1123], sold: [523, 523, 523] },
  { name: "Arista Place", logoUrl: aristaPlaceLogoUrl, available: [1302, 1230, 1123], sold: [523, 523, 523] },
];

function ViewToggle({ view, onChange }: { view: "list" | "grid"; onChange: (view: "list" | "grid") => void }) {
  return (
    <div className="flex items-center rounded-md border border-gray-300 bg-white p-0.5">
      <button
        type="button"
        aria-label="Grid view"
        aria-pressed={view === "grid"}
        onClick={() => onChange("grid")}
        className={"flex h-8 w-8 cursor-pointer items-center justify-center rounded " + (view === "grid" ? "bg-blue-50 text-primary-500" : "text-gray-400 hover:bg-gray-50")}
      >
        <GridIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="List view"
        aria-pressed={view === "list"}
        onClick={() => onChange("list")}
        className={"flex h-8 w-8 cursor-pointer items-center justify-center rounded " + (view === "list" ? "bg-blue-50 text-primary-500" : "text-gray-400 hover:bg-gray-50")}
      >
        <ListIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

function TableView({ view, onViewChange }: { view: "list" | "grid"; onViewChange: (view: "list" | "grid") => void }) {
  const { navigate } = useNavigation();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
      <TableCardHeader
        title="Property List"
        rightSlot={
          <>
            <DownloadPdfButton />
            <ViewToggle view={view} onChange={onViewChange} />
          </>
        }
      />
      <div className="flex-1 min-h-0 overflow-auto [scrollbar-gutter:stable]">
      <table className="w-full min-w-[960px] border-collapse text-sm">
        <thead className="sticky top-0 z-10 bg-gray-50 [&_th]:text-xs [&_th]:font-semibold">
          <tr className="shadow-[inset_0_-1px_0_0_#e5e7eb] bg-gray-50 text-left text-gray-500">
            <th className="w-10 px-4 py-2">
              <Checkbox size="sm" />
            </th>
            <th className="px-2 py-2 font-semibold">Code</th>
            <th className="px-2 py-2 font-semibold">Project</th>
            <th className="px-2 py-2 font-semibold">Type</th>
            <th className="px-2 py-2 font-semibold">Status</th>
            <th className="px-2 py-2 font-semibold">Building</th>
            <th className="px-2 py-2 font-semibold">Units</th>
            <th className="px-2 py-2 font-semibold">Links</th>
          </tr>
        </thead>
        <tbody>
          {PROJECTS.map((row) => (
            <tr key={row.code} className="border-b border-gray-100 text-gray-600 hover:bg-gray-50">
              <td className="px-4 py-2">
                <Checkbox size="sm" />
              </td>
              <td className="px-2 py-2 font-semibold text-gray-900">{row.code}</td>
              <td className="px-2 py-2">
                <button
                  type="button"
                  onClick={() => navigate({ screen: "project-details", project: row.project })}
                  className="cursor-pointer text-left font-medium text-primary-500 hover:underline"
                >
                  {row.project}
                </button>
              </td>
              <td className="px-2 py-2">{row.type}</td>
              <td className="px-2 py-2">
                <StatusPill status={row.status} />
              </td>
              <td className="px-2 py-2">{row.building}</td>
              <td className="px-2 py-2">{row.units}</td>
              <td className="px-2 py-2">
                <div className="flex flex-wrap gap-1.5">
                  {row.links.map((link) => {
                    const screen = LINK_SCREENS[link];
                    return screen ? (
                      <button key={link} type="button" onClick={() => navigate({ screen, project: row.project })} className="cursor-pointer">
                        <LinkBadge label={link} />
                      </button>
                    ) : (
                      <LinkBadge key={link} label={link} />
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Pagination total={85} />
    </div>
  );
}

function GridView({ view, onViewChange }: { view: "list" | "grid"; onViewChange: (view: "list" | "grid") => void }) {
  const { navigate } = useNavigation();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
      <TableCardHeader title="Property List" rightSlot={<ViewToggle view={view} onChange={onViewChange} />} />
      <div className="grid flex-1 min-h-0 auto-rows-min grid-cols-[repeat(auto-fill,minmax(256px,1fr))] items-start gap-5 overflow-auto p-6 [scrollbar-gutter:stable]">
        {GRID_CARDS.map((card, index) => (
          <button
            key={card.name + index}
            type="button"
            onClick={() => navigate({ screen: "project-details", project: card.name })}
            className="group flex origin-center transform-gpu cursor-pointer flex-col rounded-xl border border-gray-200 bg-white text-left backface-hidden transition-transform duration-200 ease-out will-change-transform hover:z-10 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="flex h-32 shrink-0 items-center justify-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
              {card.logoUrl ? (
                <img src={card.logoUrl} alt={card.name} className="max-h-full max-w-full object-contain" />
              ) : (
                <img src={noImageAvailableUrl} alt="No image available" className="max-h-full max-w-full object-contain" />
              )}
            </div>
            <div className="flex flex-col gap-3 p-4">
              <span className="text-base font-semibold text-primary-500 group-hover:underline">{card.name}</span>
              <div className="grid grid-cols-[1fr_repeat(3,minmax(40px,auto))] items-center gap-x-3 gap-y-1.5">
                <span />
                {["CU", "PS", "SA"].map((label) => (
                  <span key={label} className="justify-self-center rounded-[5px] bg-gray-50 px-3 py-0.5 text-xs font-semibold text-gray-600">
                    {label}
                  </span>
                ))}

                <span className="text-xs font-semibold text-primary-600">Available</span>
                {card.available.map((value, i) => (
                  <span key={i} className="text-center text-sm text-gray-900">
                    {value}
                  </span>
                ))}

                <span className="text-xs font-semibold text-primary-600">Sold</span>
                {card.sold.map((value, i) => (
                  <span key={i} className="text-center text-sm text-gray-900">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
      <Pagination total={85} />
    </div>
  );
}

export default function PropertiesListView() {
  const [view, setView] = useState<"list" | "grid">("grid");
  const { navigate } = useNavigation();

  return (
    <Layout
      active="properties"
      activeSubItem="Projects"
      breadcrumb={[
        { label: "Dashboard", onClick: () => navigate({ screen: "dashboard" }) },
        { label: "Property", onClick: () => navigate({ screen: "properties" }) },
        { label: "List" },
      ]}
      orgBadge
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex shrink-0 flex-col gap-4 px-5 pt-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-600">12 Projects available</p>
          </div>

          <FilterBar fields={FILTERS} showLabels={false} actionsColumn />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 pb-3 pt-4">
          {view === "list" ? <TableView view={view} onViewChange={setView} /> : <GridView view={view} onViewChange={setView} />}
        </div>
      </div>
    </Layout>
  );
}
