import { describe, it, expect } from "vitest";
import { formatDate, readingTimeMinutes } from "@/lib/format";

describe("formatDate", () => {
  it("formats a valid ISO date", () => {
    expect(formatDate("2025-01-05")).toBe("January 5, 2025");
  });

  it("returns the input unchanged for malformed dates", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });
});

describe("readingTimeMinutes", () => {
  it("returns at least 1 minute for short bodies", () => {
    expect(readingTimeMinutes("only a few words")).toBe(1);
  });

  it("scales with word count at 200 wpm", () => {
    const body = Array.from({ length: 400 }, () => "word").join(" ");
    expect(readingTimeMinutes(body)).toBe(2);
  });
});
