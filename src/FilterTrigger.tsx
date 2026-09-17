import { FilterIcon } from "./icons";

/**
 * FilterTrigger — the "Filter" button (with active-count badge) plus an
 * adjacent "Reset" link button, shared by every list screen that opens a
 * filters drawer. The Reset link only renders when activeFilterCount > 0,
 * so it appears/disappears as filters are applied/cleared.
 */
export default function FilterTrigger({
  activeFilterCount,
  onOpenFilters,
  onReset,
}: {
  activeFilterCount: number;
  onOpenFilters: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onOpenFilters}
        className="relative inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
      >
        <FilterIcon className="h-4 w-4" />
        Filter
        {activeFilterCount > 0 && (
          <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white">
            {activeFilterCount}
          </span>
        )}
      </button>
      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline"
        >
          Reset
        </button>
      )}
    </div>
  );
}
