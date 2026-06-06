/**
 * In-repo blog post store with typed frontmatter.
 *
 * This starter intentionally avoids a heavy MDX/file-system dependency. Posts
 * live in a typed array so the logic stays trivially testable and the project
 * builds without any extra tooling. Swap `posts` for a filesystem/CMS loader
 * later without changing the public API below.
 */

export interface Author {
  /** URL-safe identifier, unique across all authors. */
  slug: string;
  /** Display name. */
  name: string;
  /** One-line bio shown on author pages. */
  bio: string;
}

export interface Post {
  /** URL-safe identifier, unique across all posts. */
  slug: string;
  /** Human-readable title. */
  title: string;
  /** ISO-8601 date string (YYYY-MM-DD). */
  date: string;
  /** Single high-level category, used for category archive pages. */
  category: string;
  /** Lowercase tags used for filtering. */
  tags: string[];
  /** Slug of the post author (see `authors`). */
  author: string;
  /** Short summary shown in listings and meta descriptions. */
  excerpt: string;
  /** Full post body (plain text / lightweight markup). */
  body: string;
}

const authors: Author[] = [
  {
    slug: "ada",
    name: "Ada Mensah",
    bio: "Front-end engineer who writes about the App Router and type-safe data layers."
  },
  {
    slug: "ravi",
    name: "Ravi Kapoor",
    bio: "TypeScript enthusiast focused on testing, tooling, and developer experience."
  }
];

const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello, World",
    date: "2025-01-05",
    category: "meta",
    tags: ["meta", "intro"],
    author: "ada",
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
    category: "typescript",
    tags: ["typescript", "patterns"],
    author: "ravi",
    excerpt:
      "Modelling post metadata with a TypeScript interface keeps the whole pipeline honest.",
    body: [
      "## Why types",
      "",
      "Frontmatter bugs usually come from untyped string soup.",
      "",
      "## The contract",
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
    category: "nextjs",
    tags: ["nextjs", "patterns"],
    author: "ada",
    excerpt:
      "generateStaticParams, dynamic segments, and keeping data access in lib/.",
    body: [
      "## Keep logic in lib/",
      "",
      "The App Router shines for content sites.",
      "",
      "## Pre-render everything",
      "",
      "Keep data access inside `lib/` so your route components stay thin and your",
      "logic stays unit-testable. Use `generateStaticParams` to pre-render every",
      "post at build time for instant navigation and great SEO."
    ].join("\n")
  },
  {
    slug: "testing-the-data-layer",
    title: "Testing the Data Layer with Vitest",
    date: "2025-04-22",
    category: "typescript",
    tags: ["testing", "typescript"],
    author: "ravi",
    excerpt:
      "A thin, pure data layer is the easiest part of any app to test well.",
    body: [
      "## Pure functions first",
      "",
      "When your query helpers are pure functions over an in-memory store, unit",
      "tests run in milliseconds and never flake.",
      "",
      "## Cover the edges",
      "",
      "Test the empty case, the unknown-slug case, and case-insensitive matching.",
      "Those three edges catch the majority of real-world regressions."
    ].join("\n")
  },
  {
    slug: "dark-mode-done-right",
    title: "Dark Mode Done Right",
    date: "2025-05-11",
    category: "design",
    tags: ["design", "nextjs"],
    author: "ada",
    excerpt:
      "A class-based dark theme that respects system preference and avoids flashes.",
    body: [
      "## Class strategy",
      "",
      "Tailwind's `darkMode: \"class\"` lets you toggle a theme without rebuilding.",
      "",
      "## Persist the choice",
      "",
      "Store the user's preference and apply it before paint to avoid a flash of",
      "the wrong theme. Fall back to the system preference when nothing is stored."
    ].join("\n")
  },
  {
    slug: "rss-and-discoverability",
    title: "RSS and Discoverability",
    date: "2025-06-02",
    category: "meta",
    tags: ["meta", "seo"],
    author: "ravi",
    excerpt:
      "An RSS feed is a tiny file that keeps readers coming back. Here is how to build one.",
    body: [
      "## Why RSS still matters",
      "",
      "Feed readers remain the most reliable way for loyal readers to follow you.",
      "",
      "## Build it from your data layer",
      "",
      "Because every post is typed, generating a valid RSS document is a pure",
      "transform over `getAllPosts()` — no extra source of truth required."
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

/**
 * Returns all posts (newest first) in the given category. Matching is
 * case-insensitive. An unknown category yields an empty array.
 */
export function getPostsByCategory(category: string): Post[] {
  const needle = category.trim().toLowerCase();
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === needle
  );
}

/**
 * Returns each distinct category together with the number of posts in it,
 * sorted by name. Useful for rendering a category navigation with counts.
 */
export function getAllCategories(): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    const key = post.category.toLowerCase();
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

/** Returns every known author, sorted by name. */
export function getAllAuthors(): Author[] {
  return [...authors].sort((a, b) => a.name.localeCompare(b.name));
}

/** Finds a single author by slug, or `undefined` when none matches. */
export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}

/**
 * Returns all posts (newest first) written by the given author slug. An unknown
 * author yields an empty array.
 */
export function getPostsByAuthor(authorSlug: string): Post[] {
  const needle = authorSlug.trim().toLowerCase();
  return getAllPosts().filter(
    (post) => post.author.toLowerCase() === needle
  );
}

/**
 * Finds posts related to `slug`, ranked by the number of shared tags and then
 * recency. The post itself is always excluded. Returns at most `limit` posts
 * (default 3). An unknown slug yields an empty array.
 */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const target = getPostBySlug(slug);
  if (!target) {
    return [];
  }
  const targetTags = new Set(target.tags.map((t) => t.toLowerCase()));

  return getAllPosts()
    .filter((post) => post.slug !== target.slug)
    .map((post) => {
      const shared = post.tags.filter((t) =>
        targetTags.has(t.toLowerCase())
      ).length;
      const sameCategory =
        post.category.toLowerCase() === target.category.toLowerCase() ? 1 : 0;
      return { post, score: shared * 2 + sameCategory };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.post.date < b.post.date ? 1 : -1;
    })
    .slice(0, Math.max(0, limit))
    .map((entry) => entry.post);
}

/**
 * Case-insensitive full-text-ish search over title, excerpt, tags, and category.
 * Whitespace-only or empty queries return all posts (newest first). Results stay
 * sorted newest-first so the listing order is stable.
 */
export function searchPosts(query: string, source?: Post[]): Post[] {
  const all = source ? [...source] : getAllPosts();
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) {
    return all;
  }
  return all.filter((post) => {
    const haystack = [
      post.title,
      post.excerpt,
      post.category,
      ...post.tags
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}
