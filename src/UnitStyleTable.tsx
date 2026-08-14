import { useState } from "react";
import Layout, { PageBackHeading } from "./Layout";
import FilterBar, { type FilterField } from "./FilterBar";
import Pagination from "./Pagination";
import Checkbox from "./Checkbox";
import ImagePreviewModal from "./ImagePreviewModal";
import { DownloadPdfButton, StatusPill, TableCardHeader } from "./StatusBadge";
import { EyeIcon, ImageIcon } from "./icons";
import { useNavigation } from "./NavigationContext";
import { unitFloorplanB3Url } from "./assets/figmaAssets";

/**
 * UnitStyleTable — shared table shape used by the Unit, Parking Slot, and
 * Service Area screens: they're the same columns/filters, just scoped to a
 * different "Category" default and (for Service Area) an extra column.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, nodes 173418:206320 (Unit),
 * 173418:206142 (Parking Slot), 173418:206498 (Service Area). The image
 * action opens the "Property Unit Image" modal, node 173418:206567.
 */

export interface UnitStyleRow {
  code: string;
  buildingUnit: string;
  description: string;
  status: string;
  category: string;
  propertyUnit?: string;
  notes?: string;
}

export interface UnitStyleTableProps {
  title: string;
  categoryDefault: string;
  showPropertyUnitColumn?: boolean;
  rows: UnitStyleRow[];
}

export default function UnitStyleTable({
  title,
  categoryDefault,
  showPropertyUnitColumn,
  rows,
}: UnitStyleTableProps) {
  const [previewRow, setPreviewRow] = useState<UnitStyleRow | null>(null);
  const { route, navigate } = useNavigation();
  const project = route.project ?? "Acacia Estates";

  const filters: FilterField[] = [
    { kind: "select", label: "Project", placeholder: "Select one" },
    { kind: "select", label: "Building", placeholder: "Select one" },
    { kind: "select", label: "Status", placeholder: "Select one" },
    {
      kind: "select",
      label: "Category",
      placeholder: "Select one",
      value: categoryDefault,
    },
    { kind: "select", label: "Type", placeholder: "Select one" },
    {
      kind: "select",
      label: "Show List Price?",
      labelAccent: "(PDF Report)",
      placeholder: "Select one",
    },
  ];

  return (
    <Layout
      active="properties"
      activeSubItem="Projects"
      breadcrumb={[
        {
          label: "Property",
          onClick: () => navigate({ screen: "properties" }),
        },
        { label: "List", onClick: () => navigate({ screen: "properties" }) },
        {
          label: project,
          onClick: () => navigate({ screen: "project-details", project }),
        },
        { label: title },
      ]}
      orgBadge
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex shrink-0 flex-col gap-4 px-5 pt-3">
          <PageBackHeading
            title={title}
            onBack={() => navigate({ screen: "project-details", project })}
          />

          <FilterBar fields={filters} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 pb-3 pt-4">
          <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
            <TableCardHeader
              title="Property List"
              rightSlot={<DownloadPdfButton />}
            />
            <div className="flex-1 min-h-0 overflow-auto [scrollbar-gutter:stable]">
              <table className="w-full min-w-[960px] border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-gray-50 [&_th]:text-xs [&_th]:font-semibold">
                  <tr className="shadow-[inset_0_-1px_0_0_#e5e7eb] bg-gray-50 text-left text-gray-500">
                    <th className="w-10 px-4 py-2">
                      <Checkbox size="sm" />
                    </th>
                    <th className="px-2 py-2 font-semibold">Project</th>
                    <th className="px-2 py-2 font-semibold">Building Unit</th>
                    <th className="px-2 py-2 font-semibold">Description</th>
                    <th className="px-2 py-2 font-semibold">Status</th>
                    <th className="px-2 py-2 font-semibold">Category</th>
                    {showPropertyUnitColumn && (
                      <th className="px-2 py-2 font-semibold">Property Unit</th>
                    )}
                    <th className="px-2 py-2 font-semibold">Property Notes</th>
                    <th className="w-[104px] px-2 py-2 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 text-gray-600 hover:bg-gray-50"
                    >
                      <td className="px-4 py-1">
                        <Checkbox size="sm" />
                      </td>
                      <td className="px-2 py-1 font-medium text-gray-900">
                        {row.code}
                      </td>
                      <td className="px-2 py-1">{row.buildingUnit}</td>
                      <td className="px-2 py-1">{row.description}</td>
                      <td className="px-2 py-1">
                        <StatusPill status={row.status} />
                      </td>
                      <td className="px-2 py-1">{row.category}</td>
                      {showPropertyUnitColumn && (
                        <td className="px-2 py-1">{row.propertyUnit ?? "-"}</td>
                      )}
                      <td className="px-2 py-1">{row.notes ?? "-"}</td>
                      <td className="px-2 py-1">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            aria-label={`View ${row.code} details`}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            aria-label={`View ${row.code} image`}
                            onClick={() => setPreviewRow(row)}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                          >
                            <ImageIcon className="h-4 w-4" />
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
          imageUrl={
            categoryDefault === "Condo Unit" ? unitFloorplanB3Url : undefined
          }
          imageAlt={`${previewRow.code} unit image`}
          onClose={() => setPreviewRow(null)}
        />
      )}
    </Layout>
  );
}
