"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/lib/posts";
import { searchPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export interface PostSearchProps {
  /** The full set of posts to filter, typically newest-first. */
  posts: Post[];
}

/**
 * Client-side search box that filters the provided posts by title, excerpt,
 * tags, and category as the user types. No network calls — the filter runs over
 * the data already shipped to the page.
 */
export function PostSearch({ posts }: PostSearchProps) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchPosts(query, posts), [query, posts]);

  return (
    <div>
      <label htmlFor="post-search" className="sr-only">
        Search posts
      </label>
      <input
        id="post-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search posts by title, tag, or category..."
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400" role="status">
        {results.length} {results.length === 1 ? "result" : "results"}
        {query.trim() ? ` for "${query.trim()}"` : ""}
      </p>

      {results.length === 0 ? (
        <p className="mt-6 text-slate-600 dark:text-slate-300">
          No posts match your search.
        </p>
      ) : (
        <div className="mt-6 space-y-5">
          {results.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostSearch;
