import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts, newest first."
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
      <p className="mt-2 text-slate-600">{posts.length} posts, newest first.</p>

      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/blog/tag/${tag}`}
                className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-brand hover:text-white"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 space-y-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
