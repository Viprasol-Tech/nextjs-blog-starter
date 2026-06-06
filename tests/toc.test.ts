import { describe, it, expect } from "vitest";
import { slugify, extractToc, countWords, estimateReadingTime } from "@/lib/toc";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("collapses runs of non-alphanumerics and trims edges", () => {
    expect(slugify("  Why Types?!  ")).toBe("why-types");
    expect(slugify("A & B / C")).toBe("a-b-c");
  });
});

describe("extractToc", () => {
  it("extracts headings with levels", () => {
    const body = ["# Title", "intro", "## Section A", "## Section B"].join("\n");
    const toc = extractToc(body);
    expect(toc).toEqual([
      { level: 1, text: "Title", id: "title" },
      { level: 2, text: "Section A", id: "section-a" },
      { level: 2, text: "Section B", id: "section-b" }
    ]);
  });

  it("de-duplicates repeated heading slugs", () => {
    const body = ["## Intro", "## Intro"].join("\n");
    const toc = extractToc(body);
    expect(toc.map((e) => e.id)).toEqual(["intro", "intro-2"]);
  });

  it("strips trailing closing hashes", () => {
    expect(extractToc("## Section ##")[0].text).toBe("Section");
  });

  it("returns an empty array when there are no headings", () => {
    expect(extractToc("just a paragraph\nand another")).toEqual([]);
  });
});

describe("countWords", () => {
  it("ignores heading markers", () => {
    expect(countWords("# Title\none two three")).toBe(4);
  });

  it("returns 0 for an empty body", () => {
    expect(countWords("   ")).toBe(0);
  });
});

describe("estimateReadingTime", () => {
  it("returns at least 1 minute", () => {
    expect(estimateReadingTime("a few words")).toBe(1);
  });

  it("scales with word count at the given wpm", () => {
    const body = Array.from({ length: 400 }, () => "word").join(" ");
    expect(estimateReadingTime(body, 200)).toBe(2);
  });

  it("treats a non-positive wpm as 1 word per minute", () => {
    expect(estimateReadingTime("one two three", 0)).toBe(3);
  });
});
