import { LinkIcon, FileIcon } from "./icons";
import Button from "./Button";

/**
 * Small shared pill/badge/card-header pieces reused across every property
 * table (status pills, "Tower / Floor / Unit" link badges, the card header
 * with a "Download PDF" action).
 */

// Pill colors match Figma "Badge / Pill color" (file NcMe5sSgPs65q3Ed2rV1Kv):
// Brand = node 9:12758 (bg #f0f5ff, border primary-50 #d4e1fc, text primary-500 #07389d)
// Success = node 9:12770 (bg #ecfdf3, border #abefc6, text #067647)
// Gray = node 9:12824 (bg gray-50 #f9fafb, border gray-200 #e5e7eb, text gray-700 #374151)
// Warning/Error statuses aren't in the referenced nodes, so they keep their prior colors.
const STATUS_STYLES: Record<string, string> = {
  "On Hold": "bg-warning-100 text-warning-800",
  Available: "border border-primary-50 bg-[#f0f5ff] text-primary-500",
  Sold: "border border-[#abefc6] bg-[#ecfdf3] text-[#067647]",
  "Ready for Occupancy": "border border-[#abefc6] bg-[#ecfdf3] text-[#067647]",
  "Ongoing Construction": "bg-warning-100 text-warning-800",
  "Under Review": "border border-primary-50 bg-[#f0f5ff] text-primary-500",
  "Pending Approval": "bg-warning-100 text-warning-800",
  Approved: "border border-[#abefc6] bg-[#ecfdf3] text-[#067647]",
  Completed: "border border-[#abefc6] bg-[#ecfdf3] text-[#067647]",
  "On Hold ": "bg-warning-100 text-warning-800",
  Cancelled: "bg-error-50 text-error-700",
  Postponed: "border border-gray-200 bg-gray-50 text-gray-700",
  Active: "border border-[#abefc6] bg-[#ecfdf3] text-[#067647]",
  "On Queue": "bg-warning-100 text-warning-800",
  Closed: "border border-gray-200 bg-gray-50 text-gray-700",
  Expired: "bg-error-50 text-error-700",
  Confirmed: "border border-primary-50 bg-[#f0f5ff] text-primary-500",
  Pass: "border border-[#abefc6] bg-[#ecfdf3] text-[#067647]",
  "Not Qualified": "bg-error-50 text-error-700",
};

export function StatusPill({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "border border-gray-200 bg-gray-50 text-gray-700";
  return (
    <span className={"inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium " + style}>{status}</span>
  );
}

export function LinkBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-primary-50 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-primary-500">
      <LinkIcon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

export function TableCardHeader({ title, rightSlot }: { title: string; rightSlot?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-2.5">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <div className="flex items-center gap-3">{rightSlot}</div>
    </div>
  );
}

/** Tab switcher used at the top of the Advance/Regular Commission tables ("My commission" / "Teams Commission"). */
export function RecordTabs({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (tab: string) => void }) {
  return (
    <div className="flex items-center gap-6 border-b border-gray-100 px-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={
            "cursor-pointer border-b-2 py-3 text-sm font-semibold " +
            (tab === active ? "border-primary-500 text-primary-500" : "border-transparent text-gray-500 hover:text-gray-700")
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

/**
 * Download PDF — uses the "Secondary color" button variant (brand-blue
 * outline), not the neutral-gray secondary used elsewhere. Size "sm" (32px)
 * matches the button's own Figma spec (node 9:10812/9:10911, h-32px).
 * Reference: Figma node 173424:198691.
 */
export function DownloadPdfButton() {
  return (
    <Button variant="secondary-color" size="sm">
      <FileIcon className="h-4 w-4" />
      Download PDF
    </Button>
  );
}
