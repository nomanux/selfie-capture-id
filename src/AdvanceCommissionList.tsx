import { useState } from "react";
import Layout from "./Layout";
import FilterBar, { type FilterField } from "./FilterBar";
import Pagination from "./Pagination";
import Checkbox from "./Checkbox";
import { DownloadPdfButton, RecordTabs } from "./StatusBadge";
import { EyeIcon } from "./icons";
import { useNavigation } from "./NavigationContext";

/**
 * AdvanceCommissionList — "Commission > Advance Commission" screen.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 171752:279411.
 */

const FILTERS: FilterField[] = [
  { kind: "text", label: "Client Name", placeholder: "Enter client name" },
  { kind: "text", label: "Seller Name", placeholder: "Enter seller name" },
  { kind: "text", label: "Property Unit", placeholder: "Enter property unit" },
  { kind: "select", label: "No. of Days", placeholder: "Select one" },
  { kind: "select", label: "Accounts", placeholder: "Select one" },
  { kind: "date-range", label: "Reservation Date" },
  { kind: "select", label: "Commission Type", placeholder: "Select one" },
];

interface AdvanceRow {
  reservationId: string;
  clientName: string;
  buildingUnit: string;
  reservationDate: string;
  completionDate: string;
  days: number;
}

const ROWS: AdvanceRow[] = [
  {
    reservationId: "HLD0327451",
    clientName: "Ja Morant",
    buildingUnit: "AST-00A-C-08018",
    reservationDate: "Jul 20, 2026 9:03 PM",
    completionDate: "Jul 20, 2026 9:03 PM",
    days: 11,
  },
  {
    reservationId: "HLD0327448",
    clientName: "Damian Lillard",
    buildingUnit: "SAT-00D-P-B1207",
    reservationDate: "Jul 20, 2026 9:03 PM",
    completionDate: "Jul 20, 2026 9:03 PM",
    days: 5,
  },
  {
    reservationId: "HLD0327426",
    clientName: "Stephen Curry",
    buildingUnit: "LMR-00E-C-02014",
    reservationDate: "Jul 20, 2026 9:03 PM",
    completionDate: "Jul 20, 2026 9:03 PM",
    days: 6,
  },
  {
    reservationId: "HLD0327412",
    clientName: "Kevin Durant",
    buildingUnit: "ALR-00C-C-01007",
    reservationDate: "Jul 20, 2026 9:03 PM",
    completionDate: "Jul 20, 2026 9:03 PM",
    days: 11,
  },
  {
    reservationId: "HLD0327408",
    clientName: "Anthony Edwards",
    buildingUnit: "ARP-00K-C-04005",
    reservationDate: "Jul 20, 2026 9:03 PM",
    completionDate: "Jul 20, 2026 9:03 PM",
    days: 5,
  },
  {
    reservationId: "HLD0327395",
    clientName: "Jimmy Butler",
    buildingUnit: "AVB-00A-C-01001",
    reservationDate: "Jul 20, 2026 9:03 PM",
    completionDate: "Jul 20, 2026 9:03 PM",
    days: 6,
  },
  {
    reservationId: "HLD0327382",
    clientName: "Joel Embiid",
    buildingUnit: "BRX-00F-C-03009",
    reservationDate: "Jul 20, 2026 9:03 PM",
    completionDate: "Jul 20, 2026 9:03 PM",
    days: 5,
  },
  {
    reservationId: "HLD0327369",
    clientName: "Jayson Tatum",
    buildingUnit: "CPT-00B-D-05012",
    reservationDate: "Jul 20, 2026 9:03 PM",
    completionDate: "Jul 20, 2026 9:03 PM",
    days: 5,
  },
];

export default function AdvanceCommissionList() {
  const { navigate } = useNavigation();
  const [tab, setTab] = useState("My commission");

  return (
    <Layout
      active="commissions"
      activeSubItem="Advance Commission"
      breadcrumb={[
        {
          label: "Dashboard",
          onClick: () => navigate({ screen: "dashboard" }),
        },
        { label: "Commission" },
        { label: "Advance Commission" },
      ]}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex shrink-0 flex-col gap-4 px-5 pt-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold text-gray-900">
              Advance Commission
            </h1>
            <p className="text-sm text-gray-600">30 records found</p>
          </div>

          <FilterBar fields={FILTERS} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 pb-3 pt-4">
          <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
            <div className="flex flex-wrap items-center justify-between gap-3 pr-6 pt-2">
              <RecordTabs
                tabs={["My commission", "Teams Commission"]}
                active={tab}
                onChange={setTab}
              />
              <DownloadPdfButton />
            </div>
            <div className="flex-1 min-h-0 overflow-auto [scrollbar-gutter:stable]">
              <table className="w-full min-w-[960px] border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-gray-50 [&_th]:text-xs [&_th]:font-semibold">
                  <tr className="shadow-[inset_0_-1px_0_0_#e5e7eb] bg-gray-50 text-left text-gray-500">
                    <th className="w-10 px-4 py-2">
                      <Checkbox size="sm" />
                    </th>
                    <th className="px-2 py-2 font-semibold">Reservation ID</th>
                    <th className="px-2 py-2 font-semibold">Client Name</th>
                    <th className="px-2 py-2 font-semibold">Building Unit</th>
                    <th className="px-2 py-2 font-semibold">
                      Reservation Date
                    </th>
                    <th className="px-2 py-2 font-semibold">Completion Date</th>
                    <th className="px-2 py-2 font-semibold">No. of Days</th>
                    <th className="w-[88px] px-2 py-2 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr
                      key={row.reservationId}
                      className="border-b border-gray-100 text-gray-600 hover:bg-gray-50"
                    >
                      <td className="px-4 py-1">
                        <Checkbox size="sm" />
                      </td>
                      <td className="px-2 py-1 font-medium text-gray-900">
                        {row.reservationId}
                      </td>
                      <td className="px-2 py-1">{row.clientName}</td>
                      <td className="px-2 py-1">{row.buildingUnit}</td>
                      <td className="px-2 py-1">{row.reservationDate}</td>
                      <td className="px-2 py-1">{row.completionDate}</td>
                      <td className="px-2 py-1">{row.days} days</td>
                      <td className="px-2 py-1">
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            aria-label={`View ${row.reservationId} details`}
                            onClick={() =>
                              navigate({
                                screen: "advance-commission-details",
                                itemId: row.reservationId,
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
