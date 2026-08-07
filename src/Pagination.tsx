import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";
import Select from "./Select";

/**
 * Pagination — the "Total N items … 10 / page" footer repeated at the
 * bottom of every table screen. Fully interactive (real page state, real
 * prev/next/page-size behavior), not a static decoration.
 * Desktop (sm+) matches the web pagination bar exactly: Figma file
 * NcMe5sSgPs65q3Ed2rV1Kv, node 173424:195170 — one centered row (Total N
 * items, prev, numbered pages with "•••" ellipsis, next, page-size select).
 * Below sm there's no Figma spec for this control, so it falls back to a
 * "Page X of Y" jump-to-page control (matches the uploaded pagination.html
 * reference) since the numbered row doesn't fit a phone width.
 */

const PAGE_SIZE_OPTIONS = [
  { value: "10", label: "10 / page" },
  { value: "20", label: "20 / page" },
  { value: "50", label: "50 / page" },
];

/** First page, last page, current page ± 1 neighbor, "…" filling any gaps. */
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 4) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 3) pages.push("...");
  pages.push(total);
  return pages;
}

export default function Pagination({
  total,
  defaultPage = 6,
  defaultPageSize = 10,
}: {
  total: number;
  defaultPage?: number;
  defaultPageSize?: number;
}) {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [page, setPage] = useState(() => Math.min(defaultPage, totalPages));
  const [jumpOpen, setJumpOpen] = useState(false);
  const [jumpValue, setJumpValue] = useState(String(page));
  const jumpInputRef = useRef<HTMLInputElement>(null);

  // Clamp the current page if a page-size change (or a fresh `total`) makes
  // it fall past the new last page.
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  useEffect(() => {
    if (jumpOpen) {
      jumpInputRef.current?.focus();
      jumpInputRef.current?.select();
    }
  }, [jumpOpen]);

  const goTo = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
  };

  const openJump = () => {
    setJumpValue(String(page));
    setJumpOpen(true);
  };

  const submitJump = () => {
    const value = Number(jumpValue);
    if (Number.isInteger(value) && value >= 1 && value <= totalPages) {
      setPage(value);
    }
    setJumpOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 border-t border-gray-200 bg-white px-6 py-2 text-sm sm:flex-nowrap">
      {/* Mobile: prev/next + a "Page X of Y" control that opens a jump-to-page box. */}
      <div className="flex w-full items-center justify-between gap-2 sm:hidden">
          <button
            type="button"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => goTo(page - 1)}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          {jumpOpen ? (
            <div className="flex flex-1 items-center justify-center gap-1.5">
              <input
                ref={jumpInputRef}
                type="number"
                min={1}
                max={totalPages}
                inputMode="numeric"
                value={jumpValue}
                onChange={(e) => setJumpValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitJump();
                  if (e.key === "Escape") setJumpOpen(false);
                }}
                className="h-9 w-14 rounded-md border border-primary-500 text-center text-sm text-gray-900 outline-none"
              />
              <span className="whitespace-nowrap text-xs text-gray-500">
                of {totalPages}
              </span>
              <button
                type="button"
                onClick={submitJump}
                className="h-9 shrink-0 cursor-pointer rounded-md bg-primary-600 px-3 text-xs font-semibold text-white hover:bg-primary-700"
              >
                Go
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={openJump}
              className="flex  cursor-pointer items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Page <b className="font-semibold text-gray-900">{page}</b> of{" "}
              {totalPages}
              <ChevronDownIcon className="h-3.5 w-3.5 text-gray-400" />
            </button>
          )}

          <button
            type="button"
            aria-label="Next page"
            disabled={page === totalPages}
            onClick={() => goTo(page + 1)}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

      {/* Desktop: Figma node 173424:195170 — one centered row, Total N items
          grouped together with the numbered nav, "•••" ellipsis, then a
          16px gap before the page-size select. */}
      <div className="hidden items-center gap-2 sm:flex">
        <span className="whitespace-nowrap pr-2 text-gray-900">Total {total} items</span>
        <button
          type="button"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => goTo(page - 1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-500 hover:bg-gray-50 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        {getPageNumbers(page, totalPages).map((p, index) =>
          p === "..." ? (
            <span key={"dots-" + index} className="flex h-8 w-8 items-center justify-center tracking-[2px] text-gray-300">
              •••
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => goTo(p)}
              aria-current={p === page ? "page" : undefined}
              className={
                "flex h-8 min-w-[18px] cursor-pointer items-center justify-center rounded-md px-[7px] text-sm font-medium " +
                (p === page ? "border border-primary-500 bg-gray-50 text-primary-500" : "text-gray-700 hover:bg-gray-50")
              }
            >
              {p}
            </button>
          )
        )}
        <button
          type="button"
          aria-label="Next page"
          disabled={page === totalPages}
          onClick={() => goTo(page + 1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-500 hover:bg-gray-50 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="hidden w-[108px] shrink-0 sm:block">
        <Select
          size="sm"
          options={PAGE_SIZE_OPTIONS}
          value={String(pageSize)}
          onChange={(value) => {
            setPageSize(Number(value));
            setPage(1);
          }}
          aria-label="Rows per page"
        />
      </div>
    </div>
  );
}
