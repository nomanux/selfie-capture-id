import { useState } from "react";
import Layout from "./Layout";
import FilterBar, { type FilterField } from "./FilterBar";
import Pagination from "./Pagination";
import { StatusPill, TableCardHeader } from "./StatusBadge";
import { ArrowRightIcon, CalendarIcon } from "./icons";
import { useNavigation } from "./NavigationContext";
import { useCountdown } from "./useCountdown";
import RegisterCrfModal, { type RegisterCrfDetails } from "./RegisterCrfModal";
import Button from "./Button";

/**
 * LotteryRegistrationList — "Lottery Event > Registration" screen: the
 * live-batch banner + a collapsible Search Filters card (collapsed by
 * default) + the registration table.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 173096:181809.
 * The "Register" action opens node 173424:175687.
 */

const FILTERS: FilterField[] = [
  { kind: "text", label: "CRF Number", placeholder: "Enter CRF number" },
  { kind: "text", label: "Client Name", placeholder: "Enter client name" },
  { kind: "text", label: "Primary Seller", placeholder: "Enter primary seller" },
  { kind: "select", label: "Status", placeholder: "Select one" },
];

interface RegistrationRow {
  crfNumber: string;
  accountNumber: string;
  clientName: string;
  status: string;
  sellerName: string;
}

const ROWS: RegistrationRow[] = [
  { crfNumber: "CRF1297569", accountNumber: "B000143929", clientName: "Ja Morant", status: "Active", sellerName: "Jean Valjean" },
  { crfNumber: "CRF1303552", accountNumber: "B000203725", clientName: "Damian Lillard", status: "Active", sellerName: "Cosette Fauchelevent" },
  { crfNumber: "CRF1302814", accountNumber: "B000210020", clientName: "Stephen Curry", status: "Active", sellerName: "Éponine Thénardier" },
  { crfNumber: "CRF1308471", accountNumber: "B000314679", clientName: "Kevin Durant", status: "Active", sellerName: "Gavroche Thénardier" },
  { crfNumber: "CRF1310034", accountNumber: "B000415832", clientName: "Anthony Edwards", status: "Active", sellerName: "Enjolras ABC" },
  { crfNumber: "CRF1314228", accountNumber: "B000527014", clientName: "Jimmy Butler", status: "Active", sellerName: "Javert XYZ" },
  { crfNumber: "CRF1320197", accountNumber: "B000635920", clientName: "Joel Embiid", status: "Active", sellerName: "Fantine QWE" },
  { crfNumber: "CRF1324570", accountNumber: "B000742118", clientName: "Jayson Tatum", status: "Active", sellerName: "Grantaire UIO" },
  { crfNumber: "CRF1330085", accountNumber: "B000856403", clientName: "Lebron James", status: "Active", sellerName: "Marius Pontmercy" },
];

function LiveBatchBanner() {
  const closesIn = useCountdown(4 * 3600 + 9 * 60 + 13);
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-primary-500 shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-primary-600 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success-500" />
            LIVE
          </span>
          <span className="text-base font-semibold text-white">15 July Lottery Batch</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-white/80">
          CLOSES IN
          <span className="rounded-md bg-white/15 px-2.5 py-1 font-mono text-sm font-bold text-white">{closesIn}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-50 px-5 py-3">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-md bg-gray-900 px-2 py-1 text-xs font-semibold text-white">OPENS</span>
          <span className="text-gray-700">Jul 15, 2026 · 9:00 AM</span>
          <ArrowRightIcon className="h-4 w-4 text-gray-400" />
          <span className="rounded-md bg-gray-900 px-2 py-1 text-xs font-semibold text-white">CLOSES</span>
          <span className="text-gray-700">Jul 15, 2026 · 9:00 PM</span>
          <span className="h-4 w-px bg-primary-50" />
          <CalendarIcon className="h-4 w-4 text-primary-500" />
          <span className="text-gray-700">
            CRF valid until <strong className="font-semibold text-primary-500">Jul 15, 2026</strong>
          </span>
        </div>
        <div className="flex w-full items-center gap-3 sm:w-56">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-primary-600 to-success-500" />
          </div>
          <span className="text-sm font-semibold text-gray-900">65%</span>
        </div>
      </div>
    </div>
  );
}

export default function LotteryRegistrationList() {
  const { navigate } = useNavigation();
  const [registering, setRegistering] = useState<RegistrationRow | null>(null);

  const toDetails = (row: RegistrationRow): RegisterCrfDetails => ({
    crfNumber: row.crfNumber,
    clientName: row.clientName,
    sellerName: row.sellerName,
    crfExpiry: "08/06/2026, 06:00:00",
  });

  return (
    <Layout
      active="lottery"
      activeSubItem="Registration"
      breadcrumb={[
        { label: "Dashboard", onClick: () => navigate({ screen: "dashboard" }) },
        { label: "Lottery Event" },
        { label: "Registration" },
      ]}
      orgBadge
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex shrink-0 flex-col gap-4 px-5 pt-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold text-gray-900">Lottery Registration</h1>
            <p className="text-sm text-gray-600">7 items are available</p>
          </div>

          <LiveBatchBanner />

          <FilterBar fields={FILTERS} defaultOpen={false} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 pb-3 pt-4">
        <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
          <TableCardHeader title="Lottery Registration List" />
          <div className="flex-1 min-h-0 overflow-auto [scrollbar-gutter:stable]">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-gray-50 [&_th]:text-xs [&_th]:font-semibold">
              <tr className="shadow-[inset_0_-1px_0_0_#e5e7eb] bg-gray-50 text-left text-gray-500">
                <th className="px-4 py-2 font-semibold">CRF Number</th>
                <th className="px-2 py-2 font-semibold">Account Number</th>
                <th className="px-2 py-2 font-semibold">Client Name</th>
                <th className="px-2 py-2 text-right font-semibold">Status</th>
                <th className="px-2 py-2 font-semibold">Seller Name</th>
                <th className="w-[88px] px-2 py-2 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.crfNumber} className="border-b border-gray-100 text-gray-600 hover:bg-gray-50">
                  <td className="px-4 py-1 font-semibold text-gray-900">{row.crfNumber}</td>
                  <td className="px-2 py-1">{row.accountNumber}</td>
                  <td className="px-2 py-1">{row.clientName}</td>
                  <td className="px-2 py-1 text-right">
                    <StatusPill status={row.status} />
                  </td>
                  <td className="px-2 py-1">{row.sellerName}</td>
                  <td className="px-2 py-1 text-center">
                    <Button variant="tertiary" size="xs" onClick={() => setRegistering(row)}>
                      Register
                    </Button>
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

      {registering && (
        <RegisterCrfModal
          details={toDetails(registering)}
          onCancel={() => setRegistering(null)}
          onConfirm={() => setRegistering(null)}
        />
      )}
    </Layout>
  );
}
