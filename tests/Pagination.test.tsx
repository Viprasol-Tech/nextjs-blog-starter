import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pagination } from "@/components/Pagination";

const hrefForPage = (p: number) => (p === 1 ? "/blog" : `/blog?page=${p}`);

describe("<Pagination>", () => {
  it("renders nothing when there is a single page", () => {
    const { container } = render(
      <Pagination current={1} totalPages={1} hrefForPage={hrefForPage} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("marks the current page with aria-current", () => {
    render(<Pagination current={2} totalPages={5} hrefForPage={hrefForPage} />);
    const current = screen.getByText("2");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("renders prev and next links around the current page", () => {
    render(<Pagination current={2} totalPages={5} hrefForPage={hrefForPage} />);
    expect(screen.getByRole("link", { name: /Prev/ })).toHaveAttribute(
      "href",
      "/blog"
    );
    expect(screen.getByRole("link", { name: /Next/ })).toHaveAttribute(
      "href",
      "/blog?page=3"
    );
  });

  it("omits the prev link on the first page", () => {
    render(<Pagination current={1} totalPages={5} hrefForPage={hrefForPage} />);
    expect(screen.queryByRole("link", { name: /Prev/ })).toBeNull();
  });

  it("omits the next link on the last page", () => {
    render(<Pagination current={5} totalPages={5} hrefForPage={hrefForPage} />);
    expect(screen.queryByRole("link", { name: /Next/ })).toBeNull();
  });
});
