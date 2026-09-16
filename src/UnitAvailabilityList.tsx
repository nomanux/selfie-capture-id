import { useState } from "react";
import Layout from "./Layout";
import Pagination from "./Pagination";
import Checkbox from "./Checkbox";
import ImagePreviewModal from "./ImagePreviewModal";
import RightDrawer from "./RightDrawer";
import Select from "./Select";
import Input from "./Input";
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


interface UnitAvailabilityRow {
  code: string;
  buildingUnit: string;
  description: string;
  status: string;
  category: string;
  propertyUnit: string;
}

const ROWS: UnitAvailabilityRow[] = [
  {
    code: "ACP",
    buildingUnit: "C- Accolade 11",
    description: "2-Bedroom C (Inner)Available",
    status: "On Hold",
    category: "Condo Unit",
    propertyUnit: "AGP-00A-C-20016",
  },
  {
    code: "ALR",
    buildingUnit: "C- Accolade 22",
    description: "2-Bedroom C (Inner)Available",
    status: "Available",
    category: "Condo Unit",
    propertyUnit: "AGP-00A-C-27024",
  },
  {
    code: "BFS",
    buildingUnit: "C- Accolade 33",
    description: "2-Bedroom C (Inner)Available",
    status: "Sold",
    category: "Condo Unit",
    propertyUnit: "AGP-00A-C-28011",
  },
  {
    code: "CQT",
    buildingUnit: "C- Accolade 55",
    description: "2-Bedroom C (Inner)Available",
    status: "Available",
    category: "Condo Unit",
    propertyUnit: "AGP-00A-C-20016",
  },
  {
    code: "DPX",
    buildingUnit: "C- Accolade 66",
    description: "2-Bedroom C (Inner)Available",
    status: "Available",
    category: "Condo Unit",
    propertyUnit: "AGP-00A-C-27024",
  },
  {
    code: "ERZ",
    buildingUnit: "C- Accolade 77",
    description: "2-Bedroom C (Inner)Available",
    status: "Available",
    category: "Condo Unit",
    propertyUnit: "AGP-00A-C-28011",
  },
  {
    code: "FOS",
    buildingUnit: "C- Accolade 88",
    description: "2-Bedroom C (Inner)Available",
    status: "Available",
    category: "Condo Unit",
    propertyUnit: "AGP-00A-C-20016",
  },
  {
    code: "GHI",
    buildingUnit: "C- Accolade 15",
    description: "2-Bedroom C (Inner)Available",
    status: "Available",
    category: "Condo Unit",
    propertyUnit: "AGP-00A-C-27024",
  },
];

export default function UnitAvailabilityList() {
  const [previewRow, setPreviewRow] = useState<UnitAvailabilityRow | null>(
    null,
  );
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");
  const { navigate } = useNavigation();

  return (
    <Layout
      active="properties"
      activeSubItem="Unit Availability"
      breadcrumb={[
        {
          label: "Dashboard",
          onClick: () => navigate({ screen: "dashboard" }),
        },
        {
          label: "Property",
          onClick: () => navigate({ screen: "properties" }),
        },
        { label: "Unit Availability" },
      ]}
      orgBadge
    >
      <div className="flex h-full w-full flex-col">
        <div className="shrink-0 px-5 py-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-semibold text-gray-900">
              Unit Availability
            </h1>
            <p className="text-xs text-gray-600">30 property units available</p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 pb-3 pt-2">
          <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
            <TableCardHeader
              leftSlot={
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-56 rounded-md border border-gray-300 px-2.5 py-1.5 text-xs placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowFilters(true)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filter
                  </button>
                </div>
              }
              rightSlot={
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-md border border-gray-300 bg-white p-0.5">
                    <button
                      type="button"
                      aria-label="Grid view"
                      aria-pressed={view === "grid"}
                      onClick={() => setView("grid")}
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded ${
                        view === "grid"
                          ? "bg-blue-50 text-primary-500"
                          : "text-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="List view"
                      aria-pressed={view === "list"}
                      onClick={() => setView("list")}
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded ${
                        view === "list"
                          ? "bg-blue-50 text-primary-500"
                          : "text-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                      </svg>
                    </button>
                  </div>
                  <DownloadPdfButton />
                </div>
              }
            />
            {view === "list" ? (
              <div className="flex-1 min-h-0 overflow-auto [scrollbar-gutter:stable]">
                <table className="w-full min-w-[1040px] border-collapse text-sm">
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
                      <th className="px-2 py-2 font-semibold">Property Unit</th>
                      <th className="px-2 py-2 font-semibold">Property Notes</th>
                      <th className="w-[104px] px-2 py-2 text-center font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row, index) => (
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
                        <td className="px-2 py-1">{row.propertyUnit}</td>
                        <td className="px-2 py-1">-</td>
                        <td className="px-2 py-1">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              aria-label={`View ${row.buildingUnit} details`}
                              onClick={() =>
                                navigate({
                                  screen: "unit-availability-details",
                                  itemId: row.buildingUnit,
                                })
                              }
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
            ) : (
              <div className="flex-1 min-h-0 overflow-auto [scrollbar-gutter:stable]">
                <div className="flex flex-col gap-6 p-6">
                  {/* Header */}
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                    </svg>
                    <span className="font-medium text-gray-900">AGP • C- Amina</span>
                    <span className="text-gray-500">Status:</span>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-primary-600 border border-primary-200">
                      Available
                    </span>
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium text-gray-900">Condo Unit</span>
                  </div>

                  {/* Floor and Units Grid */}
                  <div className="flex gap-6">
                  {/* Floor Groups */}
                  <div className="flex flex-col gap-8 shrink-0">
                    {[
                      { floor: "7th", label: "7th Floor" },
                      { floor: "8th", label: "8th Floor" },
                      { floor: "9th", label: "9th Floor" },
                      { floor: "10th", label: "10th Floor" },
                    ].map((floorGroup) => (
                      <div key={floorGroup.floor} className="flex flex-col gap-2">
                        <div className="rounded-md bg-blue-50 px-3 py-2 text-center min-w-[100px]">
                          <div className="text-lg font-bold text-primary-500">
                            {floorGroup.floor}
                          </div>
                          <div className="text-xs text-gray-600">Floor</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Units Grid */}
                  <div className="flex-1 flex flex-col gap-8">
                    {[
                      { floor: "7th", units: ROWS.slice(0, 2) },
                      { floor: "8th", units: ROWS.slice(2, 4) },
                      { floor: "9th", units: ROWS.slice(4, 6) },
                      { floor: "10th", units: ROWS.slice(6, 8) },
                    ].map((floorGroup) => (
                      <div key={floorGroup.floor} className="flex flex-wrap gap-6">
                        {floorGroup.units.map((row, idx) => (
                          <div
                            key={idx}
                            className="group flex flex-col gap-2 text-center cursor-pointer hover:opacity-80 transition-opacity min-w-[100px]"
                          >
                            <div className="flex items-center justify-center gap-1.5">
                              <div className="text-xl font-bold text-gray-900">
                                {row.buildingUnit.split('-').pop()?.trim()}
                              </div>
                              {row.status === "Available" && (
                                <span className="inline-flex items-center justify-center h-5 w-5 rounded text-xs font-semibold text-primary-500 border border-primary-500">
                                  C
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {row.description}
                            </p>
                            <div className="flex gap-1 justify-center pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                aria-label={`View ${row.buildingUnit} details`}
                                onClick={() =>
                                  navigate({
                                    screen: "unit-availability-details",
                                    itemId: row.buildingUnit,
                                  })
                                }
                                className="flex items-center justify-center h-6 w-6 rounded text-gray-400 hover:text-gray-700"
                              >
                                <EyeIcon className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                aria-label={`View ${row.buildingUnit} image`}
                                onClick={() => setPreviewRow(row)}
                                className="flex items-center justify-center h-6 w-6 rounded text-gray-400 hover:text-gray-700"
                              >
                                <ImageIcon className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </div>
            )}
            <Pagination total={85} />
          </div>
        </div>
      </div>

      <RightDrawer
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filters"
      >
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto space-y-4 px-5 py-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-900">Project</label>
            <Select
              size="sm"
              placeholder="Select one"
              options={Array.from({ length: 10 }, (_, i) => ({
                value: String(i + 1),
                label: String(i + 1),
              }))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-900">Building</label>
            <Input
              type="text"
              placeholder="Unit#"
              size="sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-900">Status</label>
            <Select
              size="sm"
              placeholder="Select one"
              options={Array.from({ length: 10 }, (_, i) => ({
                value: String(i + 1),
                label: String(i + 1),
              }))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-900">Category</label>
            <Select
              size="sm"
              placeholder="Select one"
              options={Array.from({ length: 10 }, (_, i) => ({
                value: String(i + 1),
                label: String(i + 1),
              }))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-900">Type</label>
            <Select
              size="sm"
              placeholder="Select one"
              options={Array.from({ length: 10 }, (_, i) => ({
                value: String(i + 1),
                label: String(i + 1),
              }))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-900">Show List Price? (PDF Report)</label>
            <Select
              size="sm"
              placeholder="Select one"
              options={Array.from({ length: 10 }, (_, i) => ({
                value: String(i + 1),
                label: String(i + 1),
              }))}
            />
          </div>
        </div>

        {/* Sticky buttons at bottom */}
        <div className="shrink-0 border-t border-gray-200 px-5 py-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
            >
              Apply
            </button>
          </div>
        </div>
      </RightDrawer>

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
