import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";

/**
 * Pagination — the "Total N items … 10 / page" footer repeated at the
 * bottom of every property table screen.
 * Source: Figma "pagination" instance, e.g. node 173418:205333.
 */
export default function Pagination({ total, currentPage = 6, pageCount = 8 }: { total: number; currentPage?: number; pageCount?: number }) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 px-5 py-3 text-sm text-gray-700">
      <span className="whitespace-nowrap text-gray-600">Total {total} items</span>
      <div className="flex items-center gap-1">
        <button type="button" aria-label="Previous page" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-500 hover:bg-gray-50">
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={
              "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-sm font-medium " +
              (page === currentPage ? "border border-primary-500 text-primary-500" : "text-gray-700 hover:bg-gray-50")
            }
          >
            {page}
          </button>
        ))}
        <span className="px-1 text-gray-400">...</span>
        <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          50
        </button>
        <button type="button" aria-label="Next page" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-500 hover:bg-gray-50">
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="flex h-8 items-center gap-1 rounded-md border border-gray-300 px-2 text-sm text-gray-700">
        10 / page
        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  );
}
