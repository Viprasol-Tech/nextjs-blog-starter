/** Pure pagination helpers, framework-agnostic and unit-tested in isolation. */

export interface Page<T> {
  /** The 1-based page number this slice represents. */
  page: number;
  /** Number of items requested per page. */
  pageSize: number;
  /** Total number of items across all pages. */
  totalItems: number;
  /** Total number of pages (at least 1, even when there are no items). */
  totalPages: number;
  /** The items belonging to this page. */
  items: T[];
  /** Whether a previous page exists. */
  hasPrev: boolean;
  /** Whether a next page exists. */
  hasNext: boolean;
}

/**
 * Slices `items` into the requested page. `page` is 1-based and clamped into the
 * valid range; `pageSize` is forced to at least 1. The returned metadata is safe
 * to drive a pager UI without extra guards.
 */
export function paginate<T>(
  items: readonly T[],
  page: number,
  pageSize: number
): Page<T> {
  const safeSize = Math.max(1, Math.floor(pageSize));
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safeSize));
  const safePage = Math.min(Math.max(1, Math.floor(page)), totalPages);
  const start = (safePage - 1) * safeSize;
  const slice = items.slice(start, start + safeSize);

  return {
    page: safePage,
    pageSize: safeSize,
    totalItems,
    totalPages,
    items: slice,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages
  };
}

/**
 * Builds a compact list of page numbers for a pager, inserting the literal
 * "..." string where pages are skipped. Always includes the first and last page
 * and a window of `siblings` pages on each side of `current`.
 */
export function pageRange(
  current: number,
  totalPages: number,
  siblings = 1
): (number | "...")[] {
  const total = Math.max(1, Math.floor(totalPages));
  const safeCurrent = Math.min(Math.max(1, Math.floor(current)), total);
  const safeSiblings = Math.max(0, Math.floor(siblings));

  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let i = safeCurrent - safeSiblings; i <= safeCurrent + safeSiblings; i++) {
    if (i >= 1 && i <= total) {
      pages.add(i);
    }
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | "...")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev !== 0 && p - prev > 1) {
      out.push("...");
    }
    out.push(p);
    prev = p;
  }
  return out;
}

/**
 * Parses an unknown page query value (string | string[] | undefined) into a
 * positive integer, defaulting to 1 for missing or invalid input.
 */
export function parsePageParam(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const n = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}
