import { describe, it, expect } from "vitest";
import {
  getAllPosts,
  getPostBySlug,
  getPostsByTag,
  getAllTags
} from "@/lib/posts";

describe("getAllPosts", () => {
  it("returns posts sorted by date descending", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(1);
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true);
    }
  });

  it("does not mutate the underlying store between calls", () => {
    const first = getAllPosts();
    first.reverse();
    const second = getAllPosts();
    expect(second[0].date >= second[second.length - 1].date).toBe(true);
  });
});

describe("getPostBySlug", () => {
  it("finds an existing post", () => {
    const post = getPostBySlug("hello-world");
    expect(post).toBeDefined();
    expect(post?.title).toBe("Hello, World");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPostBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("getPostsByTag", () => {
  it("filters posts by tag, case-insensitively", () => {
    const lower = getPostsByTag("patterns");
    const upper = getPostsByTag("PATTERNS");
    expect(lower.length).toBeGreaterThan(0);
    expect(upper.map((p) => p.slug)).toEqual(lower.map((p) => p.slug));
  });

  it("returns results sorted newest first", () => {
    const posts = getPostsByTag("patterns");
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true);
    }
  });

  it("returns an empty array for an unknown tag", () => {
    expect(getPostsByTag("nope")).toEqual([]);
  });
});

describe("getAllTags", () => {
  it("returns a sorted, de-duplicated tag list", () => {
    const tags = getAllTags();
    const sorted = [...tags].sort((a, b) => a.localeCompare(b));
    expect(tags).toEqual(sorted);
    expect(new Set(tags).size).toBe(tags.length);
    expect(tags).toContain("patterns");
  });
});
