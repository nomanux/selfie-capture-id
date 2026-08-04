import type { ReactNode } from "react";

/**
 * KeyValueList — the "label : value" rows repeated in the Unit Availability
 * Details and Unit Holding Details cards. Renders as a two-column grid;
 * pass `columns={2}` to lay two of these side by side (Unit Holding
 * Details' Overview card).
 */
export interface KeyValueRow {
  label: string;
  value: ReactNode;
}

export default function KeyValueList({ rows }: { rows: KeyValueRow[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-[180px_1fr]">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt className="text-sm text-gray-500">{row.label}</dt>
          <dd className="flex items-center gap-1 text-sm text-gray-900 before:text-gray-500 before:content-[':']">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
