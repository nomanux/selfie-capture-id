import UnitStyleTable, { type UnitStyleRow } from "./UnitStyleTable";

// Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 173418:206142 ("Property > List > Parking Slot").
const ROWS: UnitStyleRow[] = [
  { code: "ACP", buildingUnit: "M- Accolade 11", description: "Motorcycle Parking", status: "On Hold", category: "ACP-00A-M-B1011" },
  { code: "ALR", buildingUnit: "M- Accolade 22", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B1012" },
  { code: "BFS", buildingUnit: "M- Accolade 33", description: "Motorcycle Parking", status: "Sold", category: "ACP-00A-M-B1014" },
  { code: "CQT", buildingUnit: "M- Accolade 55", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B1015" },
  { code: "DPX", buildingUnit: "M- Accolade 66", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B1016" },
  { code: "ERZ", buildingUnit: "M- Accolade 77", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B1017" },
  { code: "FOS", buildingUnit: "M- Accolade 88", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B1018" },
  { code: "GHI", buildingUnit: "M- Accolade 15", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B2002" },
  { code: "HJK", buildingUnit: "M- Accolade 16", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B2006" },
];

export default function ParkingSlotList() {
  return <UnitStyleTable title="Parking Slot" categoryDefault="Parking Slot" rows={ROWS} />;
}
