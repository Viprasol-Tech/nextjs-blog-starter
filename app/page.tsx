import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const latest = getAllPosts().slice(0, 3);

  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900">Next.js Blog Starter</h1>
      <p className="mt-3 text-slate-700">
        A minimal, typed blog starter built with the App Router. Add posts in{" "}
        <code className="rounded bg-slate-100 px-1 py-0.5 text-sm">
          lib/posts.ts
        </code>{" "}
        and they show up here automatically.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-slate-900">
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

      <p className="mt-8">
        <Link href="/blog" className="font-medium text-brand hover:underline">
          Browse all posts &rarr;
        </Link>
      </p>
    </section>
  );
}
