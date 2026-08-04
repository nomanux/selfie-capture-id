import GroupedStatsTable, { type GroupedStatsRow } from "./GroupedStatsTable";
import type { FilterField } from "./FilterBar";

// Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 173418:206077 ("Property > List > tower").
const FILTERS: FilterField[] = [
  { kind: "select", label: "Building", placeholder: "Select one" },
  { kind: "date-range", label: "RFO Date" },
];

const ROWS: GroupedStatsRow[] = [
  { leading: ["Accolade Place", "ACP - 00B", "09/30/12", 1], groupValues: [[1, 0, 1], [1, 0, 1], [1, 0, 1]] },
  { leading: ["Spring Lane Homes", "ACP - 00A", "07/22/12", 5], groupValues: [[5, 5, 5], [5, 5, 5], [5, 5, 5]] },
  { leading: ["Maple Grove Estates", "ACP - 00C", "05/15/13", 10], groupValues: [[10, 2, 10], [10, 2, 10], [10, 2, 10]] },
  { leading: ["Riverbend Apartments", "ACP - 00D", "03/11/14", 15], groupValues: [[15, 7, 15], [15, 7, 15], [15, 7, 15]] },
  { leading: ["Sunnyvale Villas", "ACP - 00E", "01/25/15", 20], groupValues: [[20, 2, 20], [20, 2, 20], [20, 2, 20]] },
  { leading: ["Cedarwood Condominiums", "ACP - 00F", "12/31/15", 25], groupValues: [[25, 9, 25], [25, 9, 25], [25, 9, 25]] },
  { leading: ["Lakeside Retreat", "ACP - 00G", "10/05/16", 30], groupValues: [[30, 1, 30], [30, 1, 30], [30, 1, 30]] },
];

export default function TowerList() {
  return (
    <GroupedStatsTable
      title="Tower"
      filters={FILTERS}
      leadingColumns={["Building", "Code", "RFO Date", "Floor"]}
      groups={["Units", "Parking Slot", "Service Area"]}
      subColumns={["Sold", "Available", "On hold"]}
      rows={ROWS}
    />
  );
}
