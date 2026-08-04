import { useState } from "react";
import Layout from "./Layout";
import FilterBar, { type FilterField } from "./FilterBar";
import Pagination from "./Pagination";
import { StatusPill, TableCardHeader } from "./StatusBadge";
import { EyeIcon } from "./icons";
import { useNavigation } from "./NavigationContext";
import ClientDetailsModal, { type ClientDetails } from "./ClientDetailsModal";

/**
 * ClientsList — "Clients" screen, reached from the sidebar.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 169326:205226.
 * Clicking the eye ("Actions") icon opens the "View Client" modal,
 * node 172025:276541.
 */

const FILTERS: FilterField[] = [
  { kind: "text", label: "Client Name", placeholder: "Enter client name" },
  { kind: "text", label: "Primary Seller", placeholder: "Enter primary seller" },
  { kind: "select", label: "Status", placeholder: "Select one" },
];

interface ClientRow {
  crfNumber: string;
  accountNo: string;
  clientName: string;
  status: string;
  sellerName: string;
  salesGroup: string;
}

const ROWS: ClientRow[] = [
  { crfNumber: "CRF1297569", accountNo: "B000143929", clientName: "Ja Morant", status: "Expired", sellerName: "Jean Valjean", salesGroup: "Dummy_CRF" },
  { crfNumber: "CRF1303552", accountNo: "B000203725", clientName: "Damian Lillard", status: "Active", sellerName: "Cosette Fauchelevent", salesGroup: "Dummy_CRF" },
  { crfNumber: "CRF1302814", accountNo: "B000210020", clientName: "Stephen Curry", status: "Active", sellerName: "Éponine Thénardier", salesGroup: "Dummy_CRF" },
  { crfNumber: "CRF1308471", accountNo: "B000314679", clientName: "Kevin Durant", status: "Expired", sellerName: "Gavroche Thénardier", salesGroup: "Dummy_CRF" },
  { crfNumber: "CRF1310034", accountNo: "B000415832", clientName: "Anthony Edwards", status: "Expired", sellerName: "Enjolras ABC", salesGroup: "Dummy_CRF" },
  { crfNumber: "CRF1314228", accountNo: "B000527014", clientName: "Jimmy Butler", status: "Active", sellerName: "Javert XYZ", salesGroup: "Dummy_CRF" },
  { crfNumber: "CRF1320197", accountNo: "B000635920", clientName: "Joel Embiid", status: "Active", sellerName: "Fantine QWE", salesGroup: "Dummy_CRF" },
  { crfNumber: "CRF1324570", accountNo: "B000742118", clientName: "Jayson Tatum", status: "Active", sellerName: "Grantaire UIO", salesGroup: "Dummy_CRF" },
  { crfNumber: "CRF1330085", accountNo: "B000856403", clientName: "Lebron James", status: "Active", sellerName: "Marius Pontmercy", salesGroup: "Dummy_CRF" },
];

// Demo client detail payload — the table doesn't carry these fields per row, so
// every "View" click shows the same representative record from the design.
const SAMPLE_CLIENT_DETAILS: ClientDetails = {
  address: "SLR-102938",
  registrationDate: "06/17/2026",
  expirationDate: "07/17/2026",
  contactNumber: "+639181231231",
  emailAddress: "asd@mailtrap.cc",
  customerGroup: "C-Local",
  sourceOfAwareness: [
    "Referral: Home Owner",
    "Online",
    "Agent/Broker",
    "Outdoor Ads",
    "Referral: DMCI Employee",
    "Referral: Others",
    "Booth (Asdsd D)",
    "Property Sites (ACP)",
    "Other Sources (lsd Sdiiss)",
  ],
};

export default function ClientsList() {
  const { navigate } = useNavigation();
  const [viewingClient, setViewingClient] = useState<ClientRow | null>(null);

  return (
    <Layout
      active="clients"
      breadcrumb={[{ label: "Dashboard", onClick: () => navigate({ screen: "dashboard" }) }, { label: "Client" }]}
      orgBadge
    >
      <div className="flex w-full flex-col gap-5 px-6 py-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-600">120 clients available</p>
        </div>

        <FilterBar fields={FILTERS} />

        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
          <TableCardHeader title="Client List" />
          <table className="w-full min-w-[960px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-gray-700">
                <th className="px-5 py-3 font-semibold">CRF Number</th>
                <th className="px-2 py-3 font-semibold">Account #</th>
                <th className="px-2 py-3 font-semibold">Client Name</th>
                <th className="px-2 py-3 text-right font-semibold">Status</th>
                <th className="px-2 py-3 font-semibold">Seller Name</th>
                <th className="px-2 py-3 font-semibold">Sales Group</th>
                <th className="px-2 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.crfNumber} className="border-b border-gray-100 text-gray-700 hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">{row.crfNumber}</td>
                  <td className="px-2 py-3">{row.accountNo}</td>
                  <td className="px-2 py-3">{row.clientName}</td>
                  <td className="px-2 py-3 text-right">
                    <StatusPill status={row.status} />
                  </td>
                  <td className="px-2 py-3">{row.sellerName}</td>
                  <td className="px-2 py-3">{row.salesGroup}</td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        aria-label={`View ${row.clientName}`}
                        onClick={() => setViewingClient(row)}
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

      {viewingClient && <ClientDetailsModal client={SAMPLE_CLIENT_DETAILS} onClose={() => setViewingClient(null)} />}
    </Layout>
  );
}
