import Link from "next/link";
import { pageRange } from "@/lib/pagination";

export interface PaginationProps {
  /** The current 1-based page number. */
  current: number;
  /** Total number of pages. */
  totalPages: number;
  /**
   * Builds the href for a given page number. Lets the caller control the route
   * shape (e.g. `/blog?page=2`).
   */
  hrefForPage: (page: number) => string;
}

/**
 * Accessible pager with first/last anchoring and a windowed range of page
 * numbers. Renders nothing when there is only a single page.
 */
export function Pagination({ current, totalPages, hrefForPage }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const range = pageRange(current, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm"
    >
      {current > 1 && (
        <Link
          href={hrefForPage(current - 1)}
          rel="prev"
          className="rounded-md border border-slate-300 px-3 py-1 text-slate-600 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-300"
        >
          &larr; Prev
        </Link>
      )}

      {range.map((entry, index) =>
        entry === "..." ? (
          <span
            key={`gap-${index}`}
            aria-hidden="true"
            className="px-2 text-slate-400"
          >
            &hellip;
          </span>
        ) : entry === current ? (
          <span
            key={entry}
            aria-current="page"
            className="rounded-md bg-brand px-3 py-1 font-medium text-white"
          >
            {entry}
          </span>
        ) : (
          <Link
            key={entry}
            href={hrefForPage(entry)}
            className="rounded-md border border-slate-300 px-3 py-1 text-slate-600 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-300"
          >
            {entry}
          </Link>
        )
      )}

      {current < totalPages && (
        <Link
          href={hrefForPage(current + 1)}
          rel="next"
          className="rounded-md border border-slate-300 px-3 py-1 text-slate-600 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-300"
        >
          Next &rarr;
        </Link>
      )}
    </nav>
  );
}

export default Pagination;
