import type { Metadata } from "next";
import { PostSearch } from "@/components/PostSearch";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every post by title, tag, or category."
};

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Search
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Filter {posts.length} posts instantly. Matching runs in your browser over
        title, excerpt, tags, and category.
      </p>

      <div className="mt-8">
        <PostSearch posts={posts} />
      </div>
    </section>
  );
}
