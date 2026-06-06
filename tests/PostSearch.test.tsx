import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PostSearch } from "@/components/PostSearch";
import type { Post } from "@/lib/posts";

const posts: Post[] = [
  {
    slug: "alpha",
    title: "Alpha Post",
    date: "2025-01-01",
    category: "meta",
    tags: ["intro"],
    author: "ada",
    excerpt: "The first one.",
    body: "Body."
  },
  {
    slug: "beta",
    title: "Beta Post",
    date: "2025-02-01",
    category: "nextjs",
    tags: ["nextjs"],
    author: "ravi",
    excerpt: "The second one.",
    body: "Body."
  }
];

describe("<PostSearch>", () => {
  it("renders all posts initially", () => {
    render(<PostSearch posts={posts} />);
    expect(screen.getByText("Alpha Post")).toBeInTheDocument();
    expect(screen.getByText("Beta Post")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("2 results");
  });

  it("filters posts as the user types", () => {
    render(<PostSearch posts={posts} />);
    const input = screen.getByPlaceholderText(/Search posts/);
    fireEvent.change(input, { target: { value: "alpha" } });
    expect(screen.getByText("Alpha Post")).toBeInTheDocument();
    expect(screen.queryByText("Beta Post")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent("1 result");
  });

  it("shows an empty state when nothing matches", () => {
    render(<PostSearch posts={posts} />);
    const input = screen.getByPlaceholderText(/Search posts/);
    fireEvent.change(input, { target: { value: "zzzznope" } });
    expect(screen.getByText("No posts match your search.")).toBeInTheDocument();
  });
});
