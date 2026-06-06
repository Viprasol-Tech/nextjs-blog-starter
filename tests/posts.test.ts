import { describe, it, expect } from "vitest";
import {
  getAllPosts,
  getPostBySlug,
  getPostsByTag,
  getAllTags,
  getPostsByCategory,
  getAllCategories,
  getAllAuthors,
  getAuthorBySlug,
  getPostsByAuthor,
  getRelatedPosts,
  searchPosts
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

describe("getPostsByCategory", () => {
  it("filters posts by category, case-insensitively", () => {
    const lower = getPostsByCategory("nextjs");
    const upper = getPostsByCategory("NEXTJS");
    expect(lower.length).toBeGreaterThan(0);
    expect(upper.map((p) => p.slug)).toEqual(lower.map((p) => p.slug));
  });

  it("returns an empty array for an unknown category", () => {
    expect(getPostsByCategory("nope")).toEqual([]);
  });

  it("returns results sorted newest first", () => {
    const posts = getPostsByCategory("meta");
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true);
    }
  });
});

describe("getAllCategories", () => {
  it("returns each category with an accurate post count", () => {
    const categories = getAllCategories();
    expect(categories.length).toBeGreaterThan(0);
    for (const { category, count } of categories) {
      expect(getPostsByCategory(category).length).toBe(count);
    }
  });

  it("returns categories sorted by name", () => {
    const names = getAllCategories().map((c) => c.category);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it("counts sum to the total number of posts", () => {
    const total = getAllCategories().reduce((sum, c) => sum + c.count, 0);
    expect(total).toBe(getAllPosts().length);
  });
});

describe("authors", () => {
  it("returns all authors sorted by name", () => {
    const authors = getAllAuthors();
    expect(authors.length).toBeGreaterThan(0);
    const names = authors.map((a) => a.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it("finds an author by slug", () => {
    const author = getAuthorBySlug("ada");
    expect(author).toBeDefined();
    expect(author?.name).toBe("Ada Mensah");
  });

  it("returns undefined for an unknown author slug", () => {
    expect(getAuthorBySlug("nobody")).toBeUndefined();
  });

  it("lists posts by author, newest first", () => {
    const posts = getPostsByAuthor("ada");
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.author === "ada")).toBe(true);
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true);
    }
  });

  it("returns an empty array of posts for an unknown author", () => {
    expect(getPostsByAuthor("nobody")).toEqual([]);
  });
});

describe("getRelatedPosts", () => {
  it("excludes the post itself", () => {
    const related = getRelatedPosts("app-router-tips");
    expect(related.every((p) => p.slug !== "app-router-tips")).toBe(true);
  });

  it("ranks posts that share tags first", () => {
    const related = getRelatedPosts("app-router-tips");
    expect(related.length).toBeGreaterThan(0);
    // typed-frontmatter shares the "patterns" tag, so it should rank.
    expect(related.map((p) => p.slug)).toContain("typed-frontmatter");
  });

  it("respects the limit", () => {
    const related = getRelatedPosts("typed-frontmatter", 1);
    expect(related.length).toBeLessThanOrEqual(1);
  });

  it("returns an empty array for an unknown slug", () => {
    expect(getRelatedPosts("nope")).toEqual([]);
  });
});

describe("searchPosts", () => {
  it("returns all posts for an empty or whitespace query", () => {
    expect(searchPosts("").length).toBe(getAllPosts().length);
    expect(searchPosts("   ").length).toBe(getAllPosts().length);
  });

  it("matches on title, case-insensitively", () => {
    const results = searchPosts("HELLO");
    expect(results.map((p) => p.slug)).toContain("hello-world");
  });

  it("matches on tags and category", () => {
    expect(searchPosts("seo").length).toBeGreaterThan(0);
    expect(searchPosts("design").length).toBeGreaterThan(0);
  });

  it("returns no results for a query that matches nothing", () => {
    expect(searchPosts("zzzznotapost")).toEqual([]);
  });

  it("searches within a provided source list", () => {
    const subset = getAllPosts().slice(0, 1);
    const results = searchPosts("", subset);
    expect(results.length).toBe(1);
  });
});
