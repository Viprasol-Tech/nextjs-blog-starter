/**
 * In-repo blog post store with typed frontmatter.
 *
 * This starter intentionally avoids a heavy MDX/file-system dependency. Posts
 * live in a typed array so the logic stays trivially testable and the project
 * builds without any extra tooling. Swap `posts` for a filesystem/CMS loader
 * later without changing the public API below.
 */

export interface Post {
  /** URL-safe identifier, unique across all posts. */
  slug: string;
  /** Human-readable title. */
  title: string;
  /** ISO-8601 date string (YYYY-MM-DD). */
  date: string;
  /** Lowercase tags used for filtering. */
  tags: string[];
  /** Short summary shown in listings and meta descriptions. */
  excerpt: string;
  /** Full post body (plain text / lightweight markup). */
  body: string;
}

const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello, World",
    date: "2025-01-05",
    tags: ["meta", "intro"],
    excerpt: "Why this blog exists and what you can expect to read here.",
    body: [
      "Welcome to the Next.js blog starter.",
      "",
      "This first post is a placeholder you can safely delete. It exists to",
      "demonstrate the typed frontmatter contract and the listing/detail pages.",
      "Edit `lib/posts.ts` to add your own entries."
    ].join("\n")
  },
  {
    slug: "typed-frontmatter",
    title: "Typed Frontmatter the Easy Way",
    date: "2025-02-18",
    tags: ["typescript", "patterns"],
    excerpt:
      "Modelling post metadata with a TypeScript interface keeps the whole pipeline honest.",
    body: [
      "Frontmatter bugs usually come from untyped string soup.",
      "",
      "By describing every post with the `Post` interface, a missing field or a",
      "mistyped date becomes a compile-time error instead of a production 500.",
      "The helpers in this file all return the same strongly-typed shape."
    ].join("\n")
  },
  {
    slug: "app-router-tips",
    title: "App Router Tips for Static Blogs",
    date: "2025-03-30",
    tags: ["nextjs", "patterns"],
    excerpt:
      "generateStaticParams, dynamic segments, and keeping data access in lib/.",
    body: [
      "The App Router shines for content sites.",
      "",
      "Keep data access inside `lib/` so your route components stay thin and your",
      "logic stays unit-testable. Use `generateStaticParams` to pre-render every",
      "post at build time for instant navigation and great SEO."
    ].join("\n")
  }
];

/**
 * Returns all posts sorted by date, newest first. Ties (same date) fall back to
 * a stable title comparison so ordering is deterministic.
 */
export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => {
    if (a.date === b.date) {
      return a.title.localeCompare(b.title);
    }
    return a.date < b.date ? 1 : -1;
  });
}

/**
 * Finds a single post by slug. Returns `undefined` when no post matches so
 * callers can render a 404 deliberately.
 */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/**
 * Returns all posts (newest first) that carry the given tag. Tag matching is
 * case-insensitive. An unknown tag yields an empty array.
 */
export function getPostsByTag(tag: string): Post[] {
  const needle = tag.trim().toLowerCase();
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === needle)
  );
}

/** Returns the sorted, de-duplicated set of every tag used across all posts. */
export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      set.add(tag.toLowerCase());
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
