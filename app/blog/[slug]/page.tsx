import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { TableOfContents } from "@/components/TableOfContents";
import {
  getAllPosts,
  getAuthorBySlug,
  getPostBySlug,
  getRelatedPosts
} from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { extractToc, estimateReadingTime } from "@/lib/toc";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post not found" };
  }
  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function PostPage(props: PageProps) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const toc = extractToc(post.body);
  const related = getRelatedPosts(post.slug);
  const author = getAuthorBySlug(post.author);

  return (
    <article>
      <Link href="/blog" className="text-sm text-brand hover:underline">
        &larr; Back to blog
      </Link>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-brand">
        <Link href={`/blog/category/${post.category}`} className="hover:underline">
          {post.category}
        </Link>
      </p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100">
        {post.title}
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true"> &middot; </span>
        <span>{estimateReadingTime(post.body)} min read</span>
        {author && (
          <>
            <span aria-hidden="true"> &middot; </span>
            <span>
              by{" "}
              <Link
                href={`/blog/author/${author.slug}`}
                className="text-brand hover:underline"
              >
                {author.name}
              </Link>
            </span>
          </>
        )}
      </p>

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

      {toc.length > 0 && (
        <div className="mt-6">
          <TableOfContents entries={toc} />
        </div>
      )}

      <div className="mt-6 space-y-4 whitespace-pre-line leading-relaxed text-slate-800 dark:text-slate-200">
        {post.body}
      </div>

      {related.length > 0 && (
        <section className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Related posts
          </h2>
          <div className="mt-4 space-y-5">
            {related.map((rel) => (
              <PostCard key={rel.slug} post={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
