import UnitStyleTable, { type UnitStyleRow } from "./UnitStyleTable";

// Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 173418:206498 ("Property > List > Service Area").
const ROWS: UnitStyleRow[] = [
  { code: "ACP", buildingUnit: "M- Accolade 11", description: "Motorcycle Parking", status: "On Hold", category: "ACP-00A-M-B1011", propertyUnit: "ASR-00A-S-RD101" },
  { code: "ALR", buildingUnit: "M- Accolade 22", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B1012", propertyUnit: "ASR-00A-S-RD103" },
  { code: "BFS", buildingUnit: "M- Accolade 33", description: "Motorcycle Parking", status: "Sold", category: "ACP-00A-M-B1014", propertyUnit: "ASR-00A-S-RD106" },
  { code: "CQT", buildingUnit: "M- Accolade 55", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B1015", propertyUnit: "ASR-00A-S-RD108" },
  { code: "DPX", buildingUnit: "M- Accolade 66", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B1016", propertyUnit: "ASR-00A-S-RD110" },
  { code: "ERZ", buildingUnit: "M- Accolade 77", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B1017", propertyUnit: "ASR-00A-S-RD112" },
  { code: "FOS", buildingUnit: "M- Accolade 88", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B1018", propertyUnit: "ASR-00A-S-RD115" },
  { code: "GHI", buildingUnit: "M- Accolade 15", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B2002", propertyUnit: "ASR-00A-S-RD120" },
  { code: "HJK", buildingUnit: "M- Accolade 16", description: "Motorcycle Parking", status: "Available", category: "ACP-00A-M-B2006", propertyUnit: "ASR-00A-S-RD125" },
];

export default function ServiceAreaList() {
  return <UnitStyleTable title="Service Area" categoryDefault="Service Area" showPropertyUnitColumn rows={ROWS} />;
}
