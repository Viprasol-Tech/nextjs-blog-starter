import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { paginate, parsePageParam } from "@/lib/pagination";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts, newest first."
};

const PAGE_SIZE = 4;

interface BlogIndexPageProps {
  searchParams: Promise<{ page?: string | string[] }>;
}

export default async function BlogIndexPage(props: BlogIndexPageProps) {
  const searchParams = await props.searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const requested = parsePageParam(searchParams.page);
  const page = paginate(allPosts, requested, PAGE_SIZE);

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Blog</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        {allPosts.length} posts, newest first.{" "}
        <Link href="/search" className="text-brand hover:underline">
          Search
        </Link>
      </p>

      {categories.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {categories.map(({ category, count }) => (
            <li key={category}>
              <Link
                href={`/blog/category/${category}`}
                className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-brand hover:text-white dark:bg-slate-800 dark:text-slate-300"
              >
                {category} ({count})
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 space-y-5">
        {page.items.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination
        current={page.page}
        totalPages={page.totalPages}
        hrefForPage={(p) => (p === 1 ? "/blog" : `/blog?page=${p}`)}
      />
    </section>
  );
}
