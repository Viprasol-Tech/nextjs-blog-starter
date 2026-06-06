import { getAllPosts } from "@/lib/posts";
import { buildRssFeed } from "@/lib/rss";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nextjs-blog-starter.example.com";

/**
 * Serves an RSS 2.0 feed of all posts, newest first. The document is generated
 * by the pure `buildRssFeed` helper in `lib/rss.ts`.
 */
export function GET(): Response {
  const xml = buildRssFeed(getAllPosts(), {
    title: "Next.js Blog Starter",
    description:
      "Next.js MDX-style blog starter with typed frontmatter and post listing.",
    siteUrl: SITE_URL,
    feedPath: "/rss.xml"
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
