import { useState } from "react";
import Layout from "./Layout";
import FilterBar, { type FilterField } from "./FilterBar";
import Pagination from "./Pagination";
import Checkbox from "./Checkbox";
import { DownloadPdfButton, RecordTabs } from "./StatusBadge";
import { EyeIcon } from "./icons";
import { useNavigation } from "./NavigationContext";

/**
 * RegularCommissionList — "Commission > Regular Commission" screen.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 171748:282530.
 */

const FILTERS: FilterField[] = [
  { kind: "text", label: "Client Name", placeholder: "Enter client name" },
  { kind: "text", label: "Seller Name", placeholder: "Enter seller name" },
  { kind: "select", label: "Accounts", placeholder: "Select one" },
  { kind: "select", label: "Contract Status", placeholder: "Select one" },
  { kind: "date-range", label: "Reservation Date" },
  { kind: "select", label: "Commission Status", placeholder: "Select one" },
];

interface RegularRow {
  contractNo: string;
  buildingUnit: string;
  clientName: string;
  netTcp: string;
  primarySellerName: string;
  sellerRole: string;
  sellerGroup: string;
}

const ROWS: RegularRow[] = [
  {
    contractNo: "HLD0327451",
    buildingUnit: "AST-00A-C-08018",
    clientName: "Ja Morant",
    netTcp: "1,235",
    primarySellerName: "Ja Morant",
    sellerRole: "-",
    sellerGroup: "LG_RMC29",
  },
  {
    contractNo: "HLD0327448",
    buildingUnit: "SAT-00D-P-B1207",
    clientName: "Damian Lillard",
    netTcp: "2,451",
    primarySellerName: "Damian Lillard",
    sellerRole: "-",
    sellerGroup: "LG_RMC189",
  },
  {
    contractNo: "HLD0327426",
    buildingUnit: "LMR-00E-C-02014",
    clientName: "Stephen Curry",
    netTcp: "3,678",
    primarySellerName: "Stephen Curry",
    sellerRole: "-",
    sellerGroup: "LG_RMC132",
  },
  {
    contractNo: "HLD0327412",
    buildingUnit: "ALR-00C-C-01007",
    clientName: "Kevin Durant",
    netTcp: "4,890",
    primarySellerName: "Kevin Durant",
    sellerRole: "-",
    sellerGroup: "LG_RMC6",
  },
  {
    contractNo: "HLD0327408",
    buildingUnit: "ARP-00K-C-04005",
    clientName: "Anthony Edwards",
    netTcp: "5,123",
    primarySellerName: "Anthony Edwards",
    sellerRole: "-",
    sellerGroup: "LG_RMC195",
  },
  {
    contractNo: "HLD0327395",
    buildingUnit: "AVB-00A-C-01001",
    clientName: "Jimmy Butler",
    netTcp: "6,245",
    primarySellerName: "Jimmy Butler",
    sellerRole: "-",
    sellerGroup: "LG_RMC195",
  },
  {
    contractNo: "HLD0327382",
    buildingUnit: "BRX-00F-C-03009",
    clientName: "Joel Embiid",
    netTcp: "7,890",
    primarySellerName: "Joel Embiid",
    sellerRole: "-",
    sellerGroup: "LG_RMC6",
  },
];

export default function RegularCommissionList() {
  const { navigate } = useNavigation();
  const [tab, setTab] = useState("My commission");

  return (
    <Layout
      active="commissions"
      activeSubItem="Regular Commission"
      breadcrumb={[
        {
          label: "Dashboard",
          onClick: () => navigate({ screen: "dashboard" }),
        },
        { label: "Commission" },
        { label: "Regular Commission" },
      ]}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex shrink-0 flex-col gap-4 px-5 pt-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold text-gray-900">
              Regular Commission
            </h1>
            <p className="text-sm text-gray-600">30 records found</p>
          </div>

          <FilterBar fields={FILTERS} />

          <p className="text-xs text-gray-500">
            <strong className="font-semibold">Note:</strong> All reservations
            prior to July 1, 2016 and released in IFCA (previous system) will
            not be displayed in commission ledger.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
            <span className="text-sm text-gray-700">
              View Seller:{" "}
              <strong className="font-semibold text-gray-900">
                E000000000000000008729345
              </strong>
            </span>
            <div className="flex gap-2">
              {["Deduction", "Posted VAT", "Debit Advice"].map((label) => (
                <span
                  key={label}
                  className="rounded-md border border-primary-50 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-primary-500"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
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
              <table className="w-full min-w-[1040px] border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-gray-50 [&_th]:text-xs [&_th]:font-semibold">
                  <tr className="shadow-[inset_0_-1px_0_0_#e5e7eb] bg-gray-50 text-left text-gray-500">
                    <th className="w-10 px-4 py-2">
                      <Checkbox size="sm" />
                    </th>
                    <th className="px-2 py-2 font-semibold">Contract No.</th>
                    <th className="px-2 py-2 font-semibold">Building Unit</th>
                    <th className="px-2 py-2 font-semibold">Client Name</th>
                    <th className="px-2 py-2 font-semibold">Net TCP</th>
                    <th className="px-2 py-2 font-semibold">
                      Primary Seller Name
                    </th>
                    <th className="px-2 py-2 font-semibold">Seller Role</th>
                    <th className="px-2 py-2 font-semibold">Seller Group</th>
                    <th className="w-[88px] px-2 py-2 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr
                      key={row.contractNo}
                      className="border-b border-gray-100 text-gray-600 hover:bg-gray-50"
                    >
                      <td className="px-4 py-1">
                        <Checkbox size="sm" />
                      </td>
                      <td className="px-2 py-1 font-medium text-gray-900">
                        {row.contractNo}
                      </td>
                      <td className="px-2 py-1">{row.buildingUnit}</td>
                      <td className="px-2 py-1 font-medium text-gray-900">
                        {row.clientName}
                      </td>
                      <td className="px-2 py-1">{row.netTcp}</td>
                      <td className="px-2 py-1">{row.primarySellerName}</td>
                      <td className="px-2 py-1">{row.sellerRole}</td>
                      <td className="px-2 py-1">{row.sellerGroup}</td>
                      <td className="px-2 py-1">
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            aria-label={`View ${row.contractNo} details`}
                            onClick={() =>
                              navigate({
                                screen: "regular-commission-details",
                                itemId: row.contractNo,
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
