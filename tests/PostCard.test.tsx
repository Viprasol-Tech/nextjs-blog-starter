import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostCard } from "@/components/PostCard";
import type { Post } from "@/lib/posts";

const samplePost: Post = {
  slug: "sample-post",
  title: "Sample Post",
  date: "2025-04-01",
  tags: ["alpha", "beta"],
  excerpt: "A short summary of the sample post.",
  body: "The body of the sample post for rendering tests."
};

describe("<PostCard>", () => {
  it("renders the title as a link to the post detail page", () => {
    render(<PostCard post={samplePost} />);
    const link = screen.getByRole("link", { name: "Sample Post" });
    expect(link).toHaveAttribute("href", "/blog/sample-post");
  });

  it("renders the excerpt and a formatted date", () => {
    render(<PostCard post={samplePost} />);
    expect(
      screen.getByText("A short summary of the sample post.")
    ).toBeInTheDocument();
    expect(screen.getByText("April 1, 2025")).toBeInTheDocument();
  });

  it("renders each tag", () => {
    render(<PostCard post={samplePost} />);
    expect(screen.getByText("#alpha")).toBeInTheDocument();
    expect(screen.getByText("#beta")).toBeInTheDocument();
  });
});
