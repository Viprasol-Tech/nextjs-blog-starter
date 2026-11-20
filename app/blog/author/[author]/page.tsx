import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import {
  getAllAuthors,
  getAuthorBySlug,
  getPostsByAuthor
} from "@/lib/posts";

interface PageProps {
  params: Promise<{ author: string }>;
}

export function generateStaticParams(): { author: string }[] {
  return getAllAuthors().map((author) => ({ author: author.slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const author = getAuthorBySlug(params.author);
  if (!author) {
    return { title: "Author not found" };
  }
  return {
    title: author.name,
    description: author.bio
  };
}

export default async function AuthorPage(props: PageProps) {
  const params = await props.params;
  const author = getAuthorBySlug(params.author);
  if (!author) {
    notFound();
  }

  const posts = getPostsByAuthor(author.slug);

  return (
    <section>
      <Link href="/blog" className="text-sm text-brand hover:underline">
        &larr; Back to blog
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
        {author.name}
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{author.bio}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {posts.length} {posts.length === 1 ? "post" : "posts"}.
      </p>

      <div className="mt-8 space-y-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
