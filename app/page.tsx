import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";

export default function HomePage() {
  const latest = getAllPosts().slice(0, 3);
  const categories = getAllCategories();

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Next.js Blog Starter
      </h1>
      <p className="mt-3 text-slate-700 dark:text-slate-300">
        A minimal, typed blog starter built with the App Router. Add posts in{" "}
        <code className="rounded bg-slate-100 px-1 py-0.5 text-sm dark:bg-slate-800">
          lib/posts.ts
        </code>{" "}
        and they show up here automatically.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-slate-900 dark:text-slate-100">
        Latest posts
      </h2>
      <ul className="mt-4 space-y-2">
        {latest.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-brand hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      {categories.length > 0 && (
        <>
          <h2 className="mt-10 text-xl font-semibold text-slate-900 dark:text-slate-100">
            Browse by category
          </h2>
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
        </>
      )}

      <p className="mt-8 flex flex-wrap gap-4">
        <Link href="/blog" className="font-medium text-brand hover:underline">
          Browse all posts &rarr;
        </Link>
        <Link href="/search" className="font-medium text-brand hover:underline">
          Search posts &rarr;
        </Link>
        <a href="/rss.xml" className="font-medium text-brand hover:underline">
          RSS feed &rarr;
        </a>
      </p>
    </section>
  );
}
