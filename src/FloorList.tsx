import { useState } from "react";
import Layout from "./Layout";
import Pagination from "./Pagination";
import Checkbox from "./Checkbox";
import Button from "./Button";
import Select from "./Select";
import { DownloadPdfButton, TableCardHeader } from "./StatusBadge";
import FilterTrigger from "./FilterTrigger";
import { PlusIcon } from "./icons";
import { useNavigation } from "./NavigationContext";

/**
 * FloorList — "Property > List > Floor" screen, displays floor inventory across
 * buildings with unit, parking slot, and service area breakdowns.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv, node 173418:206944 ("Property > List > Floor").
 */

interface FloorRow {
  id: string;
  building: string;
  floor: string;
  description: string;
  type: string;
  unitsTotal: number;
  unitsSold: number;
  unitsAvailable: number;
  parkingTotal: number;
  parkingSold: number;
  parkingAvailable: number;
  serviceTotal: number;
  serviceSold: number;
  serviceAvailable: number;
}

const ROWS: FloorRow[] = [
  { id: "FL0001", building: "ACE-00A", floor: "ACP - 00B - 01", description: "Lower Ground Floor", type: "Parking Floor", unitsTotal: 1, unitsSold: 1, unitsAvailable: 0, parkingTotal: 1, parkingSold: 1, parkingAvailable: 0, serviceTotal: 1, serviceSold: 1, serviceAvailable: 0 },
  { id: "FL0002", building: "ACE-00B", floor: "ACP - 00A - 01", description: "3rd Floor", type: "Residential Floor", unitsTotal: 5, unitsSold: 5, unitsAvailable: 5, parkingTotal: 5, parkingSold: 5, parkingAvailable: 5, serviceTotal: 5, serviceSold: 5, serviceAvailable: 5 },
  { id: "FL0003", building: "ACE-00C", floor: "ACP - 00C - 01", description: "7th Floor", type: "Residential Floor", unitsTotal: 10, unitsSold: 10, unitsAvailable: 2, parkingTotal: 10, parkingSold: 10, parkingAvailable: 2, serviceTotal: 10, serviceSold: 10, serviceAvailable: 2 },
  { id: "FL0004", building: "ACE-00D", floor: "ACP - 00D - 01", description: "5th Floor", type: "Service Area Floor", unitsTotal: 15, unitsSold: 15, unitsAvailable: 7, parkingTotal: 15, parkingSold: 15, parkingAvailable: 7, serviceTotal: 15, serviceSold: 15, serviceAvailable: 7 },
  { id: "FL0005", building: "ACE-00E", floor: "ACP - 00E - 01", description: "2nd Floor", type: "Residential Floor", unitsTotal: 20, unitsSold: 20, unitsAvailable: 2, parkingTotal: 20, parkingSold: 20, parkingAvailable: 2, serviceTotal: 20, serviceSold: 20, serviceAvailable: 2 },
  { id: "FL0006", building: "ACE-00F", floor: "ACP - 00F - 01", description: "Lower Ground Floor", type: "Parking Floor", unitsTotal: 25, unitsSold: 25, unitsAvailable: 9, parkingTotal: 25, parkingSold: 25, parkingAvailable: 9, serviceTotal: 25, serviceSold: 25, serviceAvailable: 9 },
  { id: "FL0007", building: "ACE-00G", floor: "ACP - 00G - 01", description: "4th Floor", type: "Residential Floor", unitsTotal: 30, unitsSold: 30, unitsAvailable: 1, parkingTotal: 30, parkingSold: 30, parkingAvailable: 1, serviceTotal: 30, serviceSold: 30, serviceAvailable: 1 },
  { id: "FL0008", building: "BCP-00A", floor: "BCP - 01A - 02", description: "6th Floor", type: "Residential Floor", unitsTotal: 12, unitsSold: 8, unitsAvailable: 4, parkingTotal: 12, parkingSold: 8, parkingAvailable: 4, serviceTotal: 12, serviceSold: 8, serviceAvailable: 4 },
  { id: "FL0009", building: "BCP-00B", floor: "BCP - 02B - 03", description: "1st Floor", type: "Commercial Floor", unitsTotal: 8, unitsSold: 6, unitsAvailable: 2, parkingTotal: 8, parkingSold: 6, parkingAvailable: 2, serviceTotal: 8, serviceSold: 6, serviceAvailable: 2 },
  { id: "FL0010", building: "BCP-00C", floor: "BCP - 03C - 01", description: "Ground Floor", type: "Retail Floor", unitsTotal: 18, unitsSold: 15, unitsAvailable: 3, parkingTotal: 18, parkingSold: 15, parkingAvailable: 3, serviceTotal: 18, serviceSold: 15, serviceAvailable: 3 },
  { id: "FL0011", building: "CRP-00A", floor: "CRP - 04D - 02", description: "8th Floor", type: "Residential Floor", unitsTotal: 22, unitsSold: 18, unitsAvailable: 4, parkingTotal: 22, parkingSold: 18, parkingAvailable: 4, serviceTotal: 22, serviceSold: 18, serviceAvailable: 4 },
  { id: "FL0012", building: "CRP-00B", floor: "CRP - 05E - 03", description: "Basement Level 1", type: "Parking Floor", unitsTotal: 35, unitsSold: 32, unitsAvailable: 3, parkingTotal: 35, parkingSold: 32, parkingAvailable: 3, serviceTotal: 35, serviceSold: 32, serviceAvailable: 3 },
  { id: "FL0013", building: "CRP-00C", floor: "CRP - 06F - 01", description: "2nd Floor", type: "Mixed Use Floor", unitsTotal: 16, unitsSold: 12, unitsAvailable: 4, parkingTotal: 16, parkingSold: 12, parkingAvailable: 4, serviceTotal: 16, serviceSold: 12, serviceAvailable: 4 },
  { id: "FL0014", building: "DRP-00A", floor: "DRP - 07G - 02", description: "9th Floor", type: "Residential Floor", unitsTotal: 28, unitsSold: 24, unitsAvailable: 4, parkingTotal: 28, parkingSold: 24, parkingAvailable: 4, serviceTotal: 28, serviceSold: 24, serviceAvailable: 4 },
  { id: "FL0015", building: "DRP-00B", floor: "DRP - 08H - 03", description: "Penthouse", type: "Premium Residential", unitsTotal: 4, unitsSold: 3, unitsAvailable: 1, parkingTotal: 4, parkingSold: 3, parkingAvailable: 1, serviceTotal: 4, serviceSold: 3, serviceAvailable: 1 },
  { id: "FL0016", building: "ERP-00A", floor: "ERP - 09I - 01", description: "3rd Floor", type: "Office Floor", unitsTotal: 24, unitsSold: 20, unitsAvailable: 4, parkingTotal: 24, parkingSold: 20, parkingAvailable: 4, serviceTotal: 24, serviceSold: 20, serviceAvailable: 4 },
  { id: "FL0017", building: "ERP-00B", floor: "ERP - 10J - 02", description: "Basement Level 2", type: "Parking Floor", unitsTotal: 40, unitsSold: 38, unitsAvailable: 2, parkingTotal: 40, parkingSold: 38, parkingAvailable: 2, serviceTotal: 40, serviceSold: 38, serviceAvailable: 2 },
  { id: "FL0018", building: "FRP-00A", floor: "FRP - 11K - 03", description: "10th Floor", type: "Residential Floor", unitsTotal: 26, unitsSold: 22, unitsAvailable: 4, parkingTotal: 26, parkingSold: 22, parkingAvailable: 4, serviceTotal: 26, serviceSold: 22, serviceAvailable: 4 },
  { id: "FL0019", building: "FRP-00B", floor: "FRP - 12L - 01", description: "4th Floor", type: "Mixed Use Floor", unitsTotal: 19, unitsSold: 16, unitsAvailable: 3, parkingTotal: 19, parkingSold: 16, parkingAvailable: 3, serviceTotal: 19, serviceSold: 16, serviceAvailable: 3 },
  { id: "FL0020", building: "FRP-00C", floor: "FRP - 13M - 02", description: "Lobby Level", type: "Commercial Floor", unitsTotal: 12, unitsSold: 10, unitsAvailable: 2, parkingTotal: 12, parkingSold: 10, parkingAvailable: 2, serviceTotal: 12, serviceSold: 10, serviceAvailable: 2 },
  { id: "FL0021", building: "GRP-00A", floor: "GRP - 14N - 03", description: "11th Floor", type: "Residential Floor", unitsTotal: 31, unitsSold: 27, unitsAvailable: 4, parkingTotal: 31, parkingSold: 27, parkingAvailable: 4, serviceTotal: 31, serviceSold: 27, serviceAvailable: 4 },
  { id: "FL0022", building: "GRP-00B", floor: "GRP - 15O - 01", description: "Basement Level 3", type: "Parking Floor", unitsTotal: 45, unitsSold: 42, unitsAvailable: 3, parkingTotal: 45, parkingSold: 42, parkingAvailable: 3, serviceTotal: 45, serviceSold: 42, serviceAvailable: 3 },
  { id: "FL0023", building: "GRP-00C", floor: "GRP - 16P - 02", description: "5th Floor", type: "Office Floor", unitsTotal: 20, unitsSold: 17, unitsAvailable: 3, parkingTotal: 20, parkingSold: 17, parkingAvailable: 3, serviceTotal: 20, serviceSold: 17, serviceAvailable: 3 },
  { id: "FL0024", building: "HRP-00A", floor: "HRP - 17Q - 03", description: "12th Floor", type: "Residential Floor", unitsTotal: 29, unitsSold: 25, unitsAvailable: 4, parkingTotal: 29, parkingSold: 25, parkingAvailable: 4, serviceTotal: 29, serviceSold: 25, serviceAvailable: 4 },
  { id: "FL0025", building: "HRP-00B", floor: "HRP - 18R - 01", description: "Rooftop", type: "Amenity Floor", unitsTotal: 2, unitsSold: 1, unitsAvailable: 1, parkingTotal: 2, parkingSold: 1, parkingAvailable: 1, serviceTotal: 2, serviceSold: 1, serviceAvailable: 1 },
  { id: "FL0026", building: "IRP-00A", floor: "IRP - 19S - 02", description: "6th Floor", type: "Office Floor", unitsTotal: 23, unitsSold: 19, unitsAvailable: 4, parkingTotal: 23, parkingSold: 19, parkingAvailable: 4, serviceTotal: 23, serviceSold: 19, serviceAvailable: 4 },
  { id: "FL0027", building: "IRP-00B", floor: "IRP - 20T - 03", description: "Basement Level 4", type: "Parking Floor", unitsTotal: 50, unitsSold: 47, unitsAvailable: 3, parkingTotal: 50, parkingSold: 47, parkingAvailable: 3, serviceTotal: 50, serviceSold: 47, serviceAvailable: 3 },
  { id: "FL0028", building: "JRP-00A", floor: "JRP - 21U - 01", description: "13th Floor", type: "Residential Floor", unitsTotal: 27, unitsSold: 23, unitsAvailable: 4, parkingTotal: 27, parkingSold: 23, parkingAvailable: 4, serviceTotal: 27, serviceSold: 23, serviceAvailable: 4 },
  { id: "FL0029", building: "JRP-00B", floor: "JRP - 22V - 02", description: "7th Floor", type: "Mixed Use Floor", unitsTotal: 17, unitsSold: 14, unitsAvailable: 3, parkingTotal: 17, parkingSold: 14, parkingAvailable: 3, serviceTotal: 17, serviceSold: 14, serviceAvailable: 3 },
  { id: "FL0030", building: "JRP-00C", floor: "JRP - 23W - 03", description: "Gym & Spa Level", type: "Amenity Floor", unitsTotal: 1, unitsSold: 0, unitsAvailable: 1, parkingTotal: 1, parkingSold: 0, parkingAvailable: 1, serviceTotal: 1, serviceSold: 0, serviceAvailable: 1 },
  { id: "FL0031", building: "KRP-00A", floor: "KRP - 24X - 01", description: "14th Floor", type: "Residential Floor", unitsTotal: 32, unitsSold: 28, unitsAvailable: 4, parkingTotal: 32, parkingSold: 28, parkingAvailable: 4, serviceTotal: 32, serviceSold: 28, serviceAvailable: 4 },
  { id: "FL0032", building: "KRP-00B", floor: "KRP - 25Y - 02", description: "8th Floor", type: "Office Floor", unitsTotal: 21, unitsSold: 18, unitsAvailable: 3, parkingTotal: 21, parkingSold: 18, parkingAvailable: 3, serviceTotal: 21, serviceSold: 18, serviceAvailable: 3 },
];

export default function FloorList() {
  const { navigate } = useNavigation();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    building: "",
    floorType: "",
    category: "",
  });

  const activeFilterCount = Object.values(filters).filter((val) => val).length;

  const resetFilters = () => {
    setFilters({
      building: "",
      floorType: "",
      category: "",
    });
  };

  const filteredRows = ROWS.filter((row) => {
    if (filters.building && row.building !== filters.building) return false;
    if (filters.floorType && row.type !== filters.floorType) return false;
    if (filters.category && !row.description.toLowerCase().includes(filters.category.toLowerCase())) return false;
    if (searchQuery && !row.floor.toLowerCase().includes(searchQuery.toLowerCase()) && !row.building.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const uniqueBuildings = [...new Set(ROWS.map((r) => r.building))];
  const uniqueTypes = [...new Set(ROWS.map((r) => r.type))];

  return (
    <Layout
      active="properties"
      activeSubItem="Projects"
      breadcrumb={[
        {
          label: "Dashboard",
          onClick: () => navigate({ screen: "dashboard" }),
        },
        {
          label: "Property",
          onClick: () => navigate({ screen: "properties" }),
        },
        { label: "Floor" },
      ]}
      orgBadge
    >
      <div className="flex h-full w-full flex-col">
        <div className="shrink-0 px-5 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-base font-semibold text-gray-900">
                Floor
              </h1>
              <p className="text-xs text-gray-600">
                {ROWS.length} floors available
              </p>
            </div>
            <Button variant="primary" size="sm">
              <PlusIcon className="h-4 w-4" />
              New Floor
            </Button>
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
                  <FilterTrigger
                    activeFilterCount={activeFilterCount}
                    onOpenFilters={() => setShowFilters(true)}
                    onReset={resetFilters}
                  />
                </div>
              }
              rightSlot={<DownloadPdfButton />}
            />
            <div className="flex-1 min-h-0 overflow-auto [scrollbar-gutter:stable]">
              <table className="w-full min-w-[1200px] border-collapse" style={{ fontSize: "13px" }}>
                <thead className="sticky top-0 z-10 bg-gray-50 [&_th]:text-xs [&_th]:font-semibold">
                  <tr className="shadow-[inset_0_-1px_0_0_#e5e7eb] bg-gray-50 text-left text-gray-500">
                    <th className="w-8 px-3 py-1">
                      <Checkbox size="sm" />
                    </th>
                    <th className="px-2 py-1 font-semibold">Building</th>
                    <th className="px-2 py-1 font-semibold">Floor</th>
                    <th className="px-2 py-1 font-semibold">Description</th>
                    <th className="px-2 py-1 font-semibold">Type</th>
                    <th className="px-2 py-1 text-center font-semibold">Units Total</th>
                    <th className="px-2 py-1 text-center font-semibold">Units Sold</th>
                    <th className="px-2 py-1 text-center font-semibold">Units Avail</th>
                    <th className="px-2 py-1 text-center font-semibold">Parking Total</th>
                    <th className="px-2 py-1 text-center font-semibold">Parking Sold</th>
                    <th className="px-2 py-1 text-center font-semibold">Parking Avail</th>
                    <th className="px-2 py-1 text-center font-semibold">Service Total</th>
                    <th className="px-2 py-1 text-center font-semibold">Service Sold</th>
                    <th className="px-2 py-1 text-center font-semibold">Service Avail</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-100 text-gray-600 hover:bg-gray-50"
                    >
                      <td className="px-3 py-2">
                        <Checkbox size="sm" />
                      </td>
                      <td className="px-2 py-2 font-medium text-gray-900">
                        {row.building}
                      </td>
                      <td className="px-2 py-2">{row.floor}</td>
                      <td className="px-2 py-2">{row.description}</td>
                      <td className="px-2 py-2">{row.type}</td>
                      <td className="px-2 py-2 text-center text-primary-600 font-semibold">{row.unitsTotal}</td>
                      <td className="px-2 py-2 text-center">{row.unitsSold}</td>
                      <td className="px-2 py-2 text-center">{row.unitsAvailable}</td>
                      <td className="px-2 py-2 text-center text-primary-600 font-semibold">{row.parkingTotal}</td>
                      <td className="px-2 py-2 text-center">{row.parkingSold}</td>
                      <td className="px-2 py-2 text-center">{row.parkingAvailable}</td>
                      <td className="px-2 py-2 text-center text-primary-600 font-semibold">{row.serviceTotal}</td>
                      <td className="px-2 py-2 text-center">{row.serviceSold}</td>
                      <td className="px-2 py-2 text-center">{row.serviceAvailable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination total={filteredRows.length} />
          </div>
        </div>

        <>
          <div
            className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ${
              showFilters ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={() => setShowFilters(false)}
          />
          <div
            className={`fixed right-0 top-0 z-50 flex h-full w-96 flex-col bg-white shadow-xl transition-transform duration-300 ease-out ${
              showFilters ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-3">
              <h2 className="text-base font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="rounded-md p-0.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-900">
                    Building
                  </label>
                  <Select
                    size="md"
                    value={filters.building}
                    onChange={(value) => setFilters({ ...filters, building: value })}
                    placeholder="Select one"
                    options={[
                      { value: "", label: "Select one" },
                      ...uniqueBuildings.map((b) => ({
                        value: b,
                        label: b,
                      })),
                    ]}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-900">
                    Floor Type
                  </label>
                  <Select
                    size="md"
                    value={filters.floorType}
                    onChange={(value) => setFilters({ ...filters, floorType: value })}
                    placeholder="Select one"
                    options={[
                      { value: "", label: "Select one" },
                      ...uniqueTypes.map((t) => ({
                        value: t,
                        label: t,
                      })),
                    ]}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-900">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-gray-200 px-5 py-3">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFilters({
                      building: "",
                      floorType: "",
                      category: "",
                    });
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
                <div className="flex-1">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setShowFilters(false)}
                    className="w-full"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </Layout>
  );
}
