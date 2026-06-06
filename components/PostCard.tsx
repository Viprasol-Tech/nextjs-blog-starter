import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { estimateReadingTime } from "@/lib/toc";

export interface PostCardProps {
  post: Post;
}

/** Summary card for a single post, used on listing pages. */
export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 p-5 transition hover:border-brand hover:shadow-sm dark:border-slate-800 dark:hover:border-brand">
      <p className="text-xs font-medium uppercase tracking-wide text-brand">
        <Link href={`/blog/category/${post.category}`} className="hover:underline">
          {post.category}
        </Link>
      </p>
      <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
        <Link href={`/blog/${post.slug}`} className="hover:text-brand">
          {post.title}
        </Link>
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true"> &middot; </span>
        <span>{estimateReadingTime(post.body)} min read</span>
      </p>
      <p className="mt-3 text-slate-700 dark:text-slate-300">{post.excerpt}</p>
      {post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/blog/tag/${tag}`}
                className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-brand hover:text-white dark:bg-slate-800 dark:text-slate-300"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default PostCard;
