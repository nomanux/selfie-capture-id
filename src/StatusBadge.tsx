import { LinkIcon, FileDownIcon } from "./icons";
import Button from "./Button";

/**
 * Small shared pill/badge/card-header pieces reused across every property
 * table (status pills, "Tower / Floor / Unit" link badges, the card header
 * with a "Download PDF" action).
 */

const STATUS_STYLES: Record<string, string> = {
  "On Hold": "bg-warning-100 text-warning-800",
  Available: "bg-blue-50 text-primary-500",
  Sold: "bg-success-50 text-success-500",
  "Ready for Occupancy": "bg-success-50 text-success-500",
  "Ongoing Construction": "bg-warning-100 text-warning-800",
  "Under Review": "bg-blue-50 text-primary-500",
  "Pending Approval": "bg-warning-100 text-warning-800",
  Approved: "bg-success-50 text-success-500",
  Completed: "bg-success-50 text-success-500",
  "On Hold ": "bg-warning-100 text-warning-800",
  Cancelled: "bg-error-50 text-error-700",
  Postponed: "bg-gray-100 text-gray-600",
  Active: "bg-success-50 text-success-500",
  "On Queue": "bg-warning-100 text-warning-800",
  Closed: "bg-gray-100 text-gray-600",
  Expired: "bg-error-50 text-error-700",
  Confirmed: "bg-blue-50 text-primary-400",
  Pass: "bg-success-50 text-success-500",
  "Not Qualified": "bg-error-50 text-error-700",
};

export function StatusPill({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={"inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium " + style}>{status}</span>
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
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-3">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
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

export function DownloadPdfButton() {
  return (
    <Button variant="secondary" size="md">
      <FileDownIcon className="h-4 w-4" />
      Download PDF
    </Button>
  );
}
