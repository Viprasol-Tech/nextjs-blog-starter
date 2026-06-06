import { describe, it, expect } from "vitest";
import { escapeXml, joinUrl, toRfc822, buildRssFeed } from "@/lib/rss";
import type { Post } from "@/lib/posts";

const samplePosts: Post[] = [
  {
    slug: "first",
    title: "First & Best",
    date: "2025-01-05",
    category: "meta",
    tags: ["intro"],
    author: "ada",
    excerpt: "An <intro> post.",
    body: "Body one."
  },
  {
    slug: "second",
    title: "Second Post",
    date: "2025-02-10",
    category: "nextjs",
    tags: ["nextjs"],
    author: "ravi",
    excerpt: "Another post.",
    body: "Body two."
  }
];

describe("escapeXml", () => {
  it("escapes the five XML-significant characters", () => {
    expect(escapeXml(`& < > " '`)).toBe("&amp; &lt; &gt; &quot; &apos;");
  });
});

describe("joinUrl", () => {
  it("joins with exactly one slash", () => {
    expect(joinUrl("https://x.com", "/blog")).toBe("https://x.com/blog");
    expect(joinUrl("https://x.com/", "blog")).toBe("https://x.com/blog");
    expect(joinUrl("https://x.com/", "/blog")).toBe("https://x.com/blog");
  });
});

describe("toRfc822", () => {
  it("formats a valid ISO date in UTC", () => {
    expect(toRfc822("2025-01-05")).toBe("Sun, 05 Jan 2025 00:00:00 GMT");
  });

  it("falls back to the epoch for invalid input", () => {
    expect(toRfc822("not-a-date")).toBe("Thu, 01 Jan 1970 00:00:00 GMT");
  });
});

describe("buildRssFeed", () => {
  const xml = buildRssFeed(samplePosts, {
    title: "My Blog",
    description: "A feed",
    siteUrl: "https://example.com/"
  });

  it("produces a well-formed RSS 2.0 envelope", () => {
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("<channel>");
    expect(xml).toContain("</rss>");
  });

  it("includes one item per post with absolute links", () => {
    const itemCount = (xml.match(/<item>/g) ?? []).length;
    expect(itemCount).toBe(samplePosts.length);
    expect(xml).toContain("<link>https://example.com/blog/first</link>");
  });

  it("escapes special characters in titles and excerpts", () => {
    expect(xml).toContain("<title>First &amp; Best</title>");
    expect(xml).toContain("<description>An &lt;intro&gt; post.</description>");
  });

  it("emits a self-referencing atom:link at the configured path", () => {
    expect(xml).toContain(
      'href="https://example.com/rss.xml" rel="self"'
    );
  });

  it("uses RFC-822 pubDates", () => {
    expect(xml).toContain("<pubDate>Sun, 05 Jan 2025 00:00:00 GMT</pubDate>");
  });
});
