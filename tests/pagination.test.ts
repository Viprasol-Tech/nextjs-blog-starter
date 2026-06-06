import { describe, it, expect } from "vitest";
import { paginate, pageRange, parsePageParam } from "@/lib/pagination";

const items = Array.from({ length: 10 }, (_, i) => i + 1);

describe("paginate", () => {
  it("returns the first page slice with correct metadata", () => {
    const page = paginate(items, 1, 4);
    expect(page.items).toEqual([1, 2, 3, 4]);
    expect(page.page).toBe(1);
    expect(page.totalPages).toBe(3);
    expect(page.totalItems).toBe(10);
    expect(page.hasPrev).toBe(false);
    expect(page.hasNext).toBe(true);
  });

  it("returns a middle page", () => {
    const page = paginate(items, 2, 4);
    expect(page.items).toEqual([5, 6, 7, 8]);
    expect(page.hasPrev).toBe(true);
    expect(page.hasNext).toBe(true);
  });

  it("returns the partial last page", () => {
    const page = paginate(items, 3, 4);
    expect(page.items).toEqual([9, 10]);
    expect(page.hasNext).toBe(false);
  });

  it("clamps a page above the maximum to the last page", () => {
    const page = paginate(items, 99, 4);
    expect(page.page).toBe(3);
    expect(page.items).toEqual([9, 10]);
  });

  it("clamps a page below 1 to the first page", () => {
    const page = paginate(items, 0, 4);
    expect(page.page).toBe(1);
  });

  it("forces a minimum page size of 1", () => {
    const page = paginate(items, 1, 0);
    expect(page.pageSize).toBe(1);
    expect(page.items).toEqual([1]);
  });

  it("reports a single page for an empty input", () => {
    const page = paginate([], 1, 5);
    expect(page.totalPages).toBe(1);
    expect(page.items).toEqual([]);
    expect(page.hasPrev).toBe(false);
    expect(page.hasNext).toBe(false);
  });
});

describe("pageRange", () => {
  it("lists every page when the total is small", () => {
    expect(pageRange(1, 3)).toEqual([1, 2, 3]);
  });

  it("inserts an ellipsis on the right edge", () => {
    expect(pageRange(1, 10)).toEqual([1, 2, "...", 10]);
  });

  it("inserts ellipses on both sides for a middle page", () => {
    expect(pageRange(5, 10)).toEqual([1, "...", 4, 5, 6, "...", 10]);
  });

  it("inserts an ellipsis on the left edge", () => {
    expect(pageRange(10, 10)).toEqual([1, "...", 9, 10]);
  });

  it("clamps an out-of-range current page", () => {
    expect(pageRange(99, 3)).toEqual([1, 2, 3]);
  });
});

describe("parsePageParam", () => {
  it("parses a numeric string", () => {
    expect(parsePageParam("3")).toBe(3);
  });

  it("uses the first element of an array", () => {
    expect(parsePageParam(["2", "5"])).toBe(2);
  });

  it("defaults to 1 for undefined, empty, or invalid input", () => {
    expect(parsePageParam(undefined)).toBe(1);
    expect(parsePageParam("")).toBe(1);
    expect(parsePageParam("abc")).toBe(1);
    expect(parsePageParam("-4")).toBe(1);
    expect(parsePageParam("0")).toBe(1);
  });
});
