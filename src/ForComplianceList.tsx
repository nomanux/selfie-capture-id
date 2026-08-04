import Layout from "./Layout";
import FilterBar, { type FilterField } from "./FilterBar";
import Pagination from "./Pagination";
import Checkbox from "./Checkbox";
import { DownloadPdfButton, StatusPill, TableCardHeader } from "./StatusBadge";
import { EyeIcon } from "./icons";
import { useNavigation } from "./NavigationContext";

/**
 * ForComplianceList — "Commission > For Compliance" screen.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 171801:261751.
 */

const FILTERS: FilterField[] = [
  { kind: "text", label: "Client Name", placeholder: "Enter client name" },
  { kind: "text", label: "Seller Name", placeholder: "Enter seller name" },
];

interface ComplianceRow {
  contractNumber: string;
  accountNo: string;
  clientName: string;
  paymentReceived: string;
  paymentPercent: number;
  status: string;
  sellerName: string;
}

const ROWS: ComplianceRow[] = [
  { contractNumber: "ACP", accountNo: "B000012748", clientName: "Spouses Ricardo A. Cruz and Erlinda A. Cruz", paymentReceived: "Php 0.00", paymentPercent: 15.48, status: "Confirmed", sellerName: "Jean Valjean" },
  { contractNumber: "ALR", accountNo: "B000027941", clientName: "John Martin Monaghan Married to Candida Orpilla Bonzo", paymentReceived: "Php 1,362,340.26", paymentPercent: 30.43, status: "Confirmed", sellerName: "Cosette Fauchelevent" },
  { contractNumber: "BFS", accountNo: "B000054004", clientName: "Melanie Audrey Stephen", paymentReceived: "Php 2,209,588.14", paymentPercent: 98.56, status: "Confirmed", sellerName: "Éponine Thénardier" },
  { contractNumber: "CQT", accountNo: "B000027459", clientName: "Spouses Julius Mercader Tiamson and Maria Sharon Lagajino Tiamson", paymentReceived: "Php 1,504,177.29", paymentPercent: 72.15, status: "Confirmed", sellerName: "Gavroche Thénardier" },
  { contractNumber: "DPX", accountNo: "B000038172", clientName: "2-Bedroom C (Inner)Available", paymentReceived: "Php 254,548.92", paymentPercent: 45.67, status: "Confirmed", sellerName: "Enjolras ABC" },
  { contractNumber: "ERZ", accountNo: "B000045689", clientName: "Spouses Johnson Chua and Amelita Chua", paymentReceived: "Php 1,535,003.41", paymentPercent: 85.22, status: "Confirmed", sellerName: "Javert XYZ" },
  { contractNumber: "FOS", accountNo: "B000061234", clientName: "Spouses Kevin Liu and Jessica Yang", paymentReceived: "Php 2,289,538.66", paymentPercent: 60.34, status: "Confirmed", sellerName: "Fantine QWE" },
  { contractNumber: "GHI", accountNo: "B000075436", clientName: "Spouses Michael Johnson and Sarah Smith", paymentReceived: "Php 399,612.42", paymentPercent: 40.99, status: "Confirmed", sellerName: "Grantaire UIO" },
  { contractNumber: "HJK", accountNo: "B000082591", clientName: "4-Bedroom A (Corner) Available", paymentReceived: "Php 57,035.90", paymentPercent: 22.11, status: "Confirmed", sellerName: "Marius Pontmercy" },
];

export default function ForComplianceList() {
  const { navigate } = useNavigation();

  return (
    <Layout
      active="commissions"
      activeSubItem="For Compliance"
      breadcrumb={[
        { label: "Dashboard", onClick: () => navigate({ screen: "dashboard" }) },
        { label: "Commission" },
        { label: "For Compliance" },
      ]}
      orgBadge
    >
      <div className="flex w-full flex-col gap-5 px-6 py-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-gray-900">For Compliance</h1>
          <p className="text-sm text-gray-600">30 records found</p>
        </div>

        <FilterBar fields={FILTERS} />

        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
          <TableCardHeader title="Compliance List" rightSlot={<DownloadPdfButton />} />
          <table className="w-full min-w-[1080px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-white text-left text-gray-700">
                <th className="w-10 px-5 py-3">
                  <Checkbox size="sm" />
                </th>
                <th className="px-2 py-3 font-semibold">Contract Number</th>
                <th className="px-2 py-3 font-semibold">Account #</th>
                <th className="px-2 py-3 font-semibold">Client Name</th>
                <th className="px-2 py-3 font-semibold">Payment Received</th>
                <th className="px-2 py-3 font-semibold">Payment %</th>
                <th className="px-2 py-3 font-semibold">Status</th>
                <th className="px-2 py-3 font-semibold">Seller Name</th>
                <th className="px-2 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.contractNumber} className="border-b border-gray-100 text-gray-700 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <Checkbox size="sm" />
                  </td>
                  <td className="px-2 py-3 font-semibold text-gray-900">{row.contractNumber}</td>
                  <td className="px-2 py-3">{row.accountNo}</td>
                  <td className="max-w-[280px] px-2 py-3">{row.clientName}</td>
                  <td className="px-2 py-3">{row.paymentReceived}</td>
                  <td className="px-2 py-3">{row.paymentPercent}</td>
                  <td className="px-2 py-3">
                    <StatusPill status={row.status} />
                  </td>
                  <td className="px-2 py-3">{row.sellerName}</td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        aria-label={`View ${row.contractNumber} compliance details`}
                        onClick={() => navigate({ screen: "compliance-details", itemId: row.contractNumber })}
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
          <Pagination total={85} />
        </div>
      </div>
    </Layout>
  );
}
