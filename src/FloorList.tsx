import GroupedStatsTable, { type GroupedStatsRow } from "./GroupedStatsTable";
import type { FilterField } from "./FilterBar";

// Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 173418:206944 ("Property > List > Floor").
const FILTERS: FilterField[] = [
  { kind: "select", label: "Building", placeholder: "Select one" },
  { kind: "select", label: "Floor Type", placeholder: "Select one" },
  { kind: "select", label: "Category", placeholder: "Select one" },
];

const ROWS: GroupedStatsRow[] = [
  { leading: ["ACE-00A", "ACP - 00B - 01", "Lower Ground Floor", "Parking Floor"], groupValues: [[1, 1, 0], [1, 1, 0], [1, 1, 0]] },
  { leading: ["ACE-00B", "ACP - 00A - 01", "3rd Floor", "Residential Floor"], groupValues: [[5, 5, 5], [5, 5, 5], [5, 5, 5]] },
  { leading: ["ACE-00C", "ACP - 00C - 01", "7th Floor", "Residential Floor"], groupValues: [[10, 10, 2], [10, 10, 2], [10, 10, 2]] },
  { leading: ["ACE-00D", "ACP - 00D - 01", "5th Floor", "Service Area Floor"], groupValues: [[15, 15, 7], [15, 15, 7], [15, 15, 7]] },
  { leading: ["ACE-00E", "ACP - 00E - 01", "2nd Floor", "Residential Floor"], groupValues: [[20, 20, 2], [20, 20, 2], [20, 20, 2]] },
  { leading: ["ACE-00F", "ACP - 00F - 01", "Lower Ground Floor", "Parking Floor"], groupValues: [[25, 25, 9], [25, 25, 9], [25, 25, 9]] },
  { leading: ["ACE-00G", "ACP - 00G - 01", "4th Floor", "Residential Floor"], groupValues: [[30, 30, 1], [30, 30, 1], [30, 30, 1]] },
];

export default function FloorList() {
  return (
    <GroupedStatsTable
      title="Floor"
      filters={FILTERS}
      leadingColumns={["Building", "Floor", "Description", "Type"]}
      groups={["Units", "Parking Slot", "Service Area"]}
      subColumns={["Total", "Sold", "Available"]}
      rows={ROWS}
    />
  );
}
