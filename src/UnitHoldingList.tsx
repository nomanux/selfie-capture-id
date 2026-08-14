import Layout from "./Layout";
import FilterBar, { type FilterField } from "./FilterBar";
import Pagination from "./Pagination";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { DownloadPdfButton, StatusPill, TableCardHeader } from "./StatusBadge";
import { EyeIcon, PlusIcon } from "./icons";
import { useNavigation } from "./NavigationContext";

/**
 * UnitHoldingList — "Property > Unit Holding" screen, reached from the
 * sidebar. Reads like a CRM queue of hold requests rather than a project
 * inventory table (Unit Holding ID, Client, Seller, Expiration).
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 173424:195442.
 */

const FILTERS: FilterField[] = [
  { kind: "select", label: "Project", placeholder: "Select one" },
  { kind: "date-range", label: "Expiry Date" },
  { kind: "text", label: "Client Name", placeholder: "Enter client name" },
  { kind: "text", label: "Seller Name", placeholder: "Enter seller name" },
  { kind: "select", label: "Status", placeholder: "Select one" },
];

interface HoldingRow {
  holdingId: string;
  status: string;
  clientName: string;
  sellerName: string;
  project: string;
  buildingUnit: string;
  expiration: string;
}

const ROWS: HoldingRow[] = [
  {
    holdingId: "HLD0327451",
    status: "Active",
    clientName: "Ja Morant",
    sellerName: "Motorcycle Parking",
    project: "AST",
    buildingUnit: "AST-00A-C-08018",
    expiration: "3/10/2026 11:11:58 AM",
  },
  {
    holdingId: "HLD0327448",
    status: "On Queue",
    clientName: "Damian Lillard",
    sellerName: "Motorcycle Parking",
    project: "SAT",
    buildingUnit: "SAT-00D-P-B1207",
    expiration: "2/20/2026 1:48:04 PM",
  },
  {
    holdingId: "HLD0327426",
    status: "Cancelled",
    clientName: "Stephen Curry",
    sellerName: "Motorcycle Parking",
    project: "BXP",
    buildingUnit: "LMR-00E-C-02014",
    expiration: "1/23/2026 1:27:45 PM",
  },
  {
    holdingId: "HLD0327412",
    status: "Expired",
    clientName: "Kevin Durant",
    sellerName: "Motorcycle Parking",
    project: "LMR",
    buildingUnit: "ALR-00C-C-01007",
    expiration: "12/15/2025 3:30:12 PM",
  },
  {
    holdingId: "HLD0327408",
    status: "Closed",
    clientName: "Anthony Edwards",
    sellerName: "Motorcycle Parking",
    project: "QNT",
    buildingUnit: "ARP-00K-C-04005",
    expiration: "11/05/2025 9:45:22 AM",
  },
  {
    holdingId: "HLD0327395",
    status: "On Queue",
    clientName: "Jimmy Butler",
    sellerName: "Motorcycle Parking",
    project: "ZED",
    buildingUnit: "AVB-00A-C-01001",
    expiration: "10/10/2025 4:05:55 PM",
  },
  {
    holdingId: "HLD0327382",
    status: "Cancelled",
    clientName: "Joel Embiid",
    sellerName: "Motorcycle Parking",
    project: "TKR",
    buildingUnit: "BRX-00F-C-03009",
    expiration: "9/29/2025 7:20:30 AM",
  },
  {
    holdingId: "HLD0327369",
    status: "Expired",
    clientName: "Jayson Tatum",
    sellerName: "Motorcycle Parking",
    project: "PVX",
    buildingUnit: "CPT-00B-D-05012",
    expiration: "8/14/2025 5:15:40 PM",
  },
  {
    holdingId: "HLD0327354",
    status: "Closed",
    clientName: "Lebron James",
    sellerName: "Motorcycle Parking",
    project: "NXY",
    buildingUnit: "DNL-00A-C-06020",
    expiration: "7/01/2025 8:00:00 AM",
  },
];

export default function UnitHoldingList() {
  const { navigate } = useNavigation();

  return (
    <Layout
      active="properties"
      activeSubItem="Unit Holding"
      breadcrumb={[
        {
          label: "Dashboard",
          onClick: () => navigate({ screen: "dashboard" }),
        },
        {
          label: "Property",
          onClick: () => navigate({ screen: "properties" }),
        },
        { label: "Unit Holding" },
      ]}
      orgBadge
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex shrink-0 flex-col gap-4 px-5 pt-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-semibold text-gray-900">
                Unit Holding
              </h1>
              <p className="text-sm text-gray-600">
                30 unit holdings available
              </p>
            </div>
            <Button variant="primary" size="md">
              <PlusIcon className="h-4 w-4" />
              New Unit Holding
            </Button>
          </div>

          <FilterBar fields={FILTERS} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 pb-3 pt-4">
          <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
            <TableCardHeader
              title="Unit Holding List"
              rightSlot={<DownloadPdfButton />}
            />
            <div className="flex-1 min-h-0 overflow-auto [scrollbar-gutter:stable]">
              <table className="w-full min-w-[1040px] border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-gray-50 [&_th]:text-xs [&_th]:font-semibold">
                  <tr className="shadow-[inset_0_-1px_0_0_#e5e7eb] bg-gray-50 text-left text-gray-500">
                    <th className="w-10 px-4 py-2">
                      <Checkbox size="sm" />
                    </th>
                    <th className="px-2 py-2 font-semibold">Unit Holding ID</th>
                    <th className="px-2 py-2 font-semibold">Status</th>
                    <th className="px-2 py-2 font-semibold">Client Name</th>
                    <th className="px-2 py-2 font-semibold">
                      Primary Seller Name
                    </th>
                    <th className="px-2 py-2 font-semibold">Project</th>
                    <th className="px-2 py-2 font-semibold">Building Unit</th>
                    <th className="px-2 py-2 font-semibold">Expiration Date</th>
                    <th className="w-[88px] px-2 py-2 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr
                      key={row.holdingId}
                      className="border-b border-gray-100 text-gray-600 hover:bg-gray-50"
                    >
                      <td className="px-4 py-1">
                        <Checkbox size="sm" />
                      </td>
                      <td className="px-2 py-1 font-medium text-gray-900">
                        {row.holdingId}
                      </td>
                      <td className="px-2 py-1">
                        <StatusPill status={row.status} />
                      </td>
                      <td className="px-2 py-1">{row.clientName}</td>
                      <td className="px-2 py-1">{row.sellerName}</td>
                      <td className="px-2 py-1">{row.project}</td>
                      <td className="px-2 py-1">{row.buildingUnit}</td>
                      <td className="px-2 py-1">{row.expiration}</td>
                      <td className="px-2 py-1">
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            aria-label={`View ${row.holdingId} details`}
                            onClick={() =>
                              navigate({
                                screen: "unit-holding-details",
                                itemId: row.holdingId,
                              })
                            }
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination total={85} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
