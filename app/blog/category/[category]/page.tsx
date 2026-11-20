import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams(): { category: string }[] {
  return getAllCategories().map(({ category }) => ({ category }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `Category: ${params.category}`,
    description: `Posts in the ${params.category} category.`
  };
}

export default async function CategoryPage(props: PageProps) {
  const params = await props.params;
  const posts = getPostsByCategory(params.category);
  if (posts.length === 0) {
    notFound();
  }

  return (
    <section>
      <Link href="/blog" className="text-sm text-brand hover:underline">
        &larr; Back to blog
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Category: {params.category.toLowerCase()}
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
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
