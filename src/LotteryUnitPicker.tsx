import { useMemo, useState } from "react";
import Layout from "./Layout";
import { RotateCcwIcon, SearchIcon, XIcon } from "./icons";
import { useNavigation } from "./NavigationContext";
import { useCountdown } from "./useCountdown";
import Button from "./Button";
import Select from "./Select";

/**
 * LotteryUnitPicker — "Lottery Event > Lottery" screen: pick an available
 * unit for the client currently being served, then proceed to Unit Holding.
 * Source: Figma file NcMe5sSgPs65q3Ed2rV1Kv,
 *   default state: node 173176:191401
 *   "Available" filter selected: node 173176:192071
 *   "Not available" filter selected: node 173176:192776
 */

interface FloorGroup {
  towerCode: string;
  floorNumber: string;
  unitStart: number;
  unitEnd: number;
  available: number[];
}

const FLOORS: FloorGroup[] = [
  {
    towerCode: "AGP-00A",
    floorNumber: "02",
    unitStart: 201,
    unitEnd: 231,
    available: [202, 207, 213, 221, 225, 229, 231],
  },
  {
    towerCode: "AGP-00A",
    floorNumber: "03",
    unitStart: 301,
    unitEnd: 329,
    available: [302, 313, 325, 329],
  },
  {
    towerCode: "AGP-00A",
    floorNumber: "04",
    unitStart: 401,
    unitEnd: 429,
    available: [402, 413, 425, 429],
  },
  {
    towerCode: "VLT-05C",
    floorNumber: "05",
    unitStart: 501,
    unitEnd: 513,
    available: [502, 505, 509, 513],
  },
];

type AvailabilityFilter = "all" | "available" | "unavailable";

interface SelectedUnit {
  towerCode: string;
  floorNumber: string;
  unit: number;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// Static single-option lists so the filter bar's dropdowns show the same
// pre-selected values the old (non-interactive) placeholder divs displayed —
// swap in a real entity/project/building list once there's a backend to
// source one from.
const ENTITY_OPTIONS = [{ value: "dpdi", label: "DMCI Project Developers Insc." }];
const PROJECT_OPTIONS = [{ value: "agp-amina", label: "Allegra Garden Palace - Amina" }];
const BUILDING_OPTIONS = [{ value: "amina", label: "Amina" }];

export default function LotteryUnitPicker() {
  const { navigate } = useNavigation();
  const nowServingCountdown = useCountdown(4 * 3600 + 9 * 60 + 13);
  const [filter, setFilter] = useState<AvailabilityFilter>("all");
  const [selected, setSelected] = useState<SelectedUnit | null>({
    towerCode: "AGP-00A",
    floorNumber: "02",
    unit: 231,
  });

  const totalAvailable = useMemo(
    () => FLOORS.reduce((sum, f) => sum + f.available.length, 0),
    [],
  );

  return (
    <Layout
      active="lottery"
      activeSubItem="Lottery"
      breadcrumb={[
        {
          label: "Dashboard",
          onClick: () => navigate({ screen: "dashboard" }),
        },
        { label: "Lottery Event" },
        { label: "Lottery" },
      ]}
      orgBadge
    >
      <div className="flex h-full w-full flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-3 [scrollbar-gutter:stable]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold text-gray-900">
              Property Unit List
            </h1>
            <p className="text-sm text-gray-600">200 lists available</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">
              Now Serving:{" "}
              <strong className="font-semibold text-primary-500">
                Slot-1 CRF1308174
              </strong>
            </span>
            <span className="rounded-md bg-error-50 px-2.5 py-1.5 font-mono text-sm font-bold text-error-700">
              {nowServingCountdown}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
          <div className="flex min-w-[220px] flex-1 flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Entity</label>
            <Select size="sm" options={ENTITY_OPTIONS} defaultValue="dpdi" />
          </div>
          <div className="flex min-w-[220px] flex-1 flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Project</label>
            <Select size="sm" options={PROJECT_OPTIONS} defaultValue="agp-amina" />
          </div>
          <div className="flex min-w-[160px] flex-1 flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Building
            </label>
            <Select size="sm" options={BUILDING_OPTIONS} defaultValue="amina" />
          </div>
          <Button variant="primary" size="sm">
            <SearchIcon className="h-4 w-4" />
            Search
          </Button>
        </div>

        <div className="flex w-full flex-1 flex-col rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold text-gray-900">
                Allegra Garden Palace - Amina
              </h2>
              <p className="text-sm font-medium text-error-600">
                <strong className="font-semibold">Disclaimer:</strong> Unit
                availability may change without prior notice.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setFilter((f) => (f === "available" ? "all" : "available"))
                }
                className={
                  "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium " +
                  (filter === "available"
                    ? "border-success-500 bg-success-50 text-success-500"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50")
                }
              >
                <span className="h-3 w-5 rounded border-2 border-success-500" />
                Available({totalAvailable})
              </button>
              <button
                type="button"
                onClick={() =>
                  setFilter((f) =>
                    f === "unavailable" ? "all" : "unavailable",
                  )
                }
                className={
                  "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium " +
                  (filter === "unavailable"
                    ? "border-gray-400 bg-gray-100 text-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50")
                }
              >
                <span className="h-3 w-5 rounded bg-gray-200" />
                Not available
              </button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setFilter("all")}
              >
                <RotateCcwIcon className="h-4 w-4" />
                Refresh Unit Availability
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-[110px_1fr] border-b border-gray-100 bg-gray-50 px-6 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <span>Floor</span>
            <span>Units</span>
          </div>

          <div className="flex flex-col">
            {FLOORS.map((floor) => {
              const units = range(floor.unitStart, floor.unitEnd).filter(
                (unit) => {
                  const isAvailable = floor.available.includes(unit);
                  if (filter === "available") return isAvailable;
                  if (filter === "unavailable") return !isAvailable;
                  return true;
                },
              );
              if (units.length === 0) return null;

              return (
                <div
                  key={floor.towerCode + floor.floorNumber}
                  className="flex gap-4 border-b border-gray-100 px-6 py-4 last:border-b-0"
                >
                  <div className="flex w-[90px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-md bg-blue-50 py-3 text-center">
                    <span className="text-xs font-medium text-gray-700">
                      {floor.towerCode}
                    </span>
                    <span className="text-base font-bold text-primary-500">
                      {floor.floorNumber}
                    </span>
                  </div>
                  <div className="flex min-h-[80px] flex-1 flex-wrap content-start gap-2">
                    {units.map((unit) => {
                      const isAvailable = floor.available.includes(unit);
                      const isSelected =
                        selected?.towerCode === floor.towerCode &&
                        selected.floorNumber === floor.floorNumber &&
                        selected.unit === unit;
                      return (
                        <button
                          key={unit}
                          type="button"
                          disabled={!isAvailable}
                          onClick={() =>
                            isAvailable &&
                            setSelected({
                              towerCode: floor.towerCode,
                              floorNumber: floor.floorNumber,
                              unit,
                            })
                          }
                          className={
                            "min-w-[68px] rounded-md border px-3 py-2 text-sm font-semibold " +
                            (isSelected
                              ? "border-primary-500 bg-blue-50 text-primary-500 ring-2 ring-primary-500/30"
                              : isAvailable
                                ? "cursor-pointer border-success-500 bg-success-50 text-success-500 hover:bg-success-100"
                                : "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400")
                          }
                        >
                          {unit}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>

      <div className="flex min-h-[68px] shrink-0 items-center justify-between border-t border-gray-200 bg-white px-6 py-4 shadow-[0_-1px_2px_rgba(10,13,18,0.05)]">
        {selected ? (
          <>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Selected Unit:</span>
              <span className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-900">
                {selected.towerCode}-{selected.floorNumber}
                <span className="text-gray-300">•</span>
                Unit {selected.unit}
                <button
                  type="button"
                  aria-label="Clear selected unit"
                  onClick={() => setSelected(null)}
                  className="cursor-pointer text-gray-400 hover:text-gray-700"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </span>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate({ screen: "unit-holding" })}
            >
              Proceed to Unit Holding
            </Button>
          </>
        ) : (
          <span className="text-sm text-gray-400">
            Select a unit to continue
          </span>
        )}
      </div>
    </Layout>
  );
}
