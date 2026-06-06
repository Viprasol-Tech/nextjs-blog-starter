import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate, readingTimeMinutes } from "@/lib/format";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams(): { slug: string }[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post not found" };
  }
  return {
    title: post.title,
    description: post.excerpt
  };
}

export default function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <article>
      <Link href="/blog" className="text-sm text-brand hover:underline">
        &larr; Back to blog
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">{post.title}</h1>
      <p className="mt-1 text-sm text-slate-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true"> &middot; </span>
        <span>{readingTimeMinutes(post.body)} min read</span>
      </p>

      {post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
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

      <div className="mt-6 space-y-4 whitespace-pre-line leading-relaxed text-slate-800">
        {post.body}
      </div>
    </article>
  );
}
