/**
 * RSS 2.0 feed builder. Pure string generation over the typed post store so the
 * output is deterministic and unit-testable without a running server.
 */

import type { Post } from "./posts";

export interface FeedOptions {
  /** Feed title, e.g. the site name. */
  title: string;
  /** One-line feed description. */
  description: string;
  /** Absolute site URL, e.g. "https://example.com" (trailing slash optional). */
  siteUrl: string;
  /** Path the feed is served from. Defaults to "/rss.xml". */
  feedPath?: string;
}

/** Escapes the five XML-significant characters so output is always well-formed. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Joins a base URL and a path with exactly one slash between them. */
export function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

/**
 * Formats an ISO date (YYYY-MM-DD) as an RFC-822 string in UTC, the format RSS
 * readers expect for <pubDate>. Invalid input falls back to the epoch.
 */
export function toRfc822(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  const safe = Number.isNaN(date.getTime()) ? new Date(0) : date;
  return safe.toUTCString();
}

/** Builds a single <item> element for a post. */
function buildItem(post: Post, siteUrl: string): string {
  const link = joinUrl(siteUrl, `/blog/${post.slug}`);
  return [
    "    <item>",
    `      <title>${escapeXml(post.title)}</title>`,
    `      <link>${escapeXml(link)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
    `      <pubDate>${toRfc822(post.date)}</pubDate>`,
    `      <category>${escapeXml(post.category)}</category>`,
    `      <description>${escapeXml(post.excerpt)}</description>`,
    "    </item>"
  ].join("\n");
}

/**
 * Builds a complete, well-formed RSS 2.0 document from a list of posts (in the
 * order given — callers typically pass newest-first).
 */
export function buildRssFeed(posts: readonly Post[], options: FeedOptions): string {
  const { title, description, siteUrl } = options;
  const feedPath = options.feedPath ?? "/rss.xml";
  const self = joinUrl(siteUrl, feedPath);
  const items = posts.map((p) => buildItem(p, siteUrl)).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(title)}</title>`,
    `    <link>${escapeXml(siteUrl.replace(/\/+$/, ""))}</link>`,
    `    <description>${escapeXml(description)}</description>`,
    `    <atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    ""
  ].join("\n");
}
