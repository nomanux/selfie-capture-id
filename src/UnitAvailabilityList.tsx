import { useState } from "react";
import Layout from "./Layout";
import FilterBar, { type FilterField } from "./FilterBar";
import Pagination from "./Pagination";
import Checkbox from "./Checkbox";
import ImagePreviewModal from "./ImagePreviewModal";
import { DownloadPdfButton, StatusPill, TableCardHeader } from "./StatusBadge";
import { EyeIcon, ImageIcon, PauseCircleIcon } from "./icons";
import { useNavigation } from "./NavigationContext";
import { unitFloorplanB3Url } from "./assets/figmaAssets";

/**
 * UnitAvailabilityList — "Property > Unit Availability" screen, reached
 * from the sidebar (not scoped to a single project). Its Actions column has
 * three icons: View (opens Details), Image (opens the image preview
 * modal), and Hold.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 173424:197248 (page shell)
 * and node 170838:208896 ("Property List" table with the Actions column).
 */

const FILTERS: FilterField[] = [
  { kind: "select", label: "Project", placeholder: "Select one" },
  { kind: "select", label: "Building", placeholder: "Select one" },
  { kind: "select", label: "Status", placeholder: "Select one" },
  { kind: "select", label: "Category", placeholder: "Select one" },
  { kind: "select", label: "Type", placeholder: "Select one" },
  { kind: "select", label: "Show List Price? (PDF Report)", placeholder: "Select one" },
];

interface UnitAvailabilityRow {
  code: string;
  buildingUnit: string;
  description: string;
  status: string;
  category: string;
  propertyUnit: string;
}

const ROWS: UnitAvailabilityRow[] = [
  { code: "ACP", buildingUnit: "C- Accolade 11", description: "2-Bedroom C (Inner)Available", status: "On Hold", category: "Condo Unit", propertyUnit: "AGP-00A-C-20016" },
  { code: "ALR", buildingUnit: "C- Accolade 22", description: "2-Bedroom C (Inner)Available", status: "Available", category: "Condo Unit", propertyUnit: "AGP-00A-C-27024" },
  { code: "BFS", buildingUnit: "C- Accolade 33", description: "2-Bedroom C (Inner)Available", status: "Sold", category: "Condo Unit", propertyUnit: "AGP-00A-C-28011" },
  { code: "CQT", buildingUnit: "C- Accolade 55", description: "2-Bedroom C (Inner)Available", status: "Available", category: "Condo Unit", propertyUnit: "AGP-00A-C-20016" },
  { code: "DPX", buildingUnit: "C- Accolade 66", description: "2-Bedroom C (Inner)Available", status: "Available", category: "Condo Unit", propertyUnit: "AGP-00A-C-27024" },
  { code: "ERZ", buildingUnit: "C- Accolade 77", description: "2-Bedroom C (Inner)Available", status: "Available", category: "Condo Unit", propertyUnit: "AGP-00A-C-28011" },
  { code: "FOS", buildingUnit: "C- Accolade 88", description: "2-Bedroom C (Inner)Available", status: "Available", category: "Condo Unit", propertyUnit: "AGP-00A-C-20016" },
  { code: "GHI", buildingUnit: "C- Accolade 15", description: "2-Bedroom C (Inner)Available", status: "Available", category: "Condo Unit", propertyUnit: "AGP-00A-C-27024" },
];

export default function UnitAvailabilityList() {
  const [previewRow, setPreviewRow] = useState<UnitAvailabilityRow | null>(null);
  const { navigate } = useNavigation();

  return (
    <Layout
      active="properties"
      activeSubItem="Unit Availability"
      breadcrumb={[
        { label: "Dashboard", onClick: () => navigate({ screen: "dashboard" }) },
        { label: "Property", onClick: () => navigate({ screen: "properties" }) },
        { label: "Unit Availability" },
      ]}
      orgBadge
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex shrink-0 flex-col gap-5 px-6 pt-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-gray-900">Unit Availability</h1>
            <p className="text-sm text-gray-600">30 property units available</p>
          </div>

          <FilterBar fields={FILTERS} columns={6} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-6 pb-4 pt-5">
        <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
          <TableCardHeader title="Property List" rightSlot={<DownloadPdfButton />} />
          <div className="flex-1 overflow-auto [scrollbar-gutter:stable]">
          <table className="w-full min-w-[1040px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-white text-left text-gray-700">
                <th className="w-10 px-5 py-3">
                  <Checkbox size="sm" />
                </th>
                <th className="px-2 py-3 font-semibold">Project</th>
                <th className="px-2 py-3 font-semibold">Building Unit</th>
                <th className="px-2 py-3 font-semibold">Description</th>
                <th className="px-2 py-3 font-semibold">Status</th>
                <th className="px-2 py-3 font-semibold">Category</th>
                <th className="px-2 py-3 font-semibold">Property Unit</th>
                <th className="px-2 py-3 font-semibold">Property Notes</th>
                <th className="min-w-[104px] px-2 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 text-gray-700 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <Checkbox size="sm" />
                  </td>
                  <td className="px-2 py-3 font-semibold text-gray-900">{row.code}</td>
                  <td className="px-2 py-3">{row.buildingUnit}</td>
                  <td className="px-2 py-3">{row.description}</td>
                  <td className="px-2 py-3">
                    <StatusPill status={row.status} />
                  </td>
                  <td className="px-2 py-3">{row.category}</td>
                  <td className="px-2 py-3">{row.propertyUnit}</td>
                  <td className="px-2 py-3">-</td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`View ${row.buildingUnit} details`}
                        onClick={() => navigate({ screen: "unit-availability-details", itemId: row.buildingUnit })}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`View ${row.buildingUnit} image`}
                        onClick={() => setPreviewRow(row)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Put ${row.buildingUnit} on hold`}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                      >
                        <PauseCircleIcon className="h-4 w-4" />
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

      {previewRow && (
        <ImagePreviewModal
          imageUrl={unitFloorplanB3Url}
          imageAlt={`${previewRow.buildingUnit} unit image`}
          onClose={() => setPreviewRow(null)}
        />
      )}
    </Layout>
  );
}
