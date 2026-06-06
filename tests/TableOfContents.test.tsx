import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TableOfContents } from "@/components/TableOfContents";
import type { TocEntry } from "@/lib/toc";

const entries: TocEntry[] = [
  { level: 2, text: "Section A", id: "section-a" },
  { level: 3, text: "Subsection", id: "subsection" }
];

describe("<TableOfContents>", () => {
  it("renders nothing when there are no entries", () => {
    const { container } = render(<TableOfContents entries={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders an anchor link per entry pointing at its id", () => {
    render(<TableOfContents entries={entries} />);
    expect(screen.getByRole("link", { name: "Section A" })).toHaveAttribute(
      "href",
      "#section-a"
    );
    expect(screen.getByRole("link", { name: "Subsection" })).toHaveAttribute(
      "href",
      "#subsection"
    );
  });

  it("labels the navigation region", () => {
    render(<TableOfContents entries={entries} />);
    expect(
      screen.getByRole("navigation", { name: "Table of contents" })
    ).toBeInTheDocument();
  });
});
