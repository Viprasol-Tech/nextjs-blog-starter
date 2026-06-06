import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/posts";

interface PageProps {
  params: { tag: string };
}

export function generateStaticParams(): { tag: string }[] {
  return getAllTags().map((tag) => ({ tag }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  return {
    title: `#${params.tag}`,
    description: `Posts tagged #${params.tag}.`
  };
}

export default function TagPage({ params }: PageProps) {
  const posts = getPostsByTag(params.tag);
  if (posts.length === 0) {
    notFound();
  }

  return (
    <section>
      <Link href="/blog" className="text-sm text-brand hover:underline">
        &larr; Back to blog
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        #{params.tag.toLowerCase()}
      </h1>
      <p className="mt-2 text-slate-600">
        {posts.length} {posts.length === 1 ? "post" : "posts"} tagged.
      </p>

      <div className="mt-8 space-y-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
