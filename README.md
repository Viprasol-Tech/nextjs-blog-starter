<div align="center">
  <img src="docs/assets/logo.png" alt="Viprasol Tech" width="120" />

  <h1>nextjs-blog-starter</h1>

  <p><strong>A typed, batteries-included Next.js App Router blog starter — categories, tags, authors, search, pagination, related posts, RSS, and dark mode.</strong></p>

  <p><em>Built and maintained by Viprasol Tech.</em></p>

  <p>
    <a href="https://github.com/Viprasol-Tech/nextjs-blog-starter/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-blog-starter"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black.svg?logo=next.js" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-blog-starter"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-blue.svg?logo=typescript" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-blog-starter"><img alt="Tests" src="https://img.shields.io/badge/tests-83%20passing-brightgreen.svg" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-blog-starter"><img alt="Version" src="https://img.shields.io/badge/version-0.2.0-blue.svg" /></a>
  </p>
</div>

---

A minimal-but-complete blog starter built on the Next.js **App Router** and
TypeScript in **strict** mode. It deliberately skips heavy MDX tooling: posts
live in a typed array so the data layer is trivially testable, and you can swap
in a filesystem or CMS loader later without touching the page components.

Every feature below ships with real, pure, unit-tested logic in `lib/` — no
stubs, no TODOs. `tsc --noEmit` is clean and **83 tests** are green.

## Features

- 📝 **Typed frontmatter** — every post conforms to a `Post` interface, so a
  missing field or malformed date is a compile-time error, not a runtime surprise.
- 🗂️ **Categories** — single-category archive pages (`/blog/category/[category]`)
  with live post counts.
- 🏷️ **Tags** — case-insensitive tag archives (`/blog/tag/[tag]`).
- 👤 **Author pages** — bios and per-author post lists (`/blog/author/[author]`).
- 🔍 **Client-side search** — instant filtering at `/search` over title, excerpt,
  tags, and category, with zero network calls.
- 📄 **Pagination** — windowed pager on the blog index (`?page=N`) driven by pure
  helpers.
- 🔗 **Related posts** — ranked by shared tags and category on every post page.
- 📰 **RSS 2.0 feed** — well-formed, escaped, RFC-822 dates, served at `/rss.xml`.
- ⏱️ **Reading-time + table of contents** — pure helpers that parse headings and
  estimate reading time, rendered on each post.
- 🌗 **Dark mode** — class-based theme with a no-flash inline script and a header
  toggle that respects system preference.
- 🎨 **Tailwind CSS** — configured with a `brand` color and full dark variants.
- ✅ **Verified gate** — `tsc --noEmit` clean and `vitest run` green.

## Quickstart

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>. Add or edit posts in `lib/posts.ts`.

Other scripts:

```bash
npm run typecheck   # tsc --noEmit
npm run test        # vitest run
npm run build       # next build (production)
```

## What's included

```
app/
  layout.tsx                       Root layout, header/footer, theme no-flash script
  page.tsx                         Home: latest posts + category nav
  not-found.tsx                    Custom 404
  search/page.tsx                  Client-side search page
  rss.xml/route.ts                 RSS 2.0 feed route handler
  blog/page.tsx                    Paginated post listing
  blog/[slug]/page.tsx             Post detail: TOC, author, related posts
  blog/tag/[tag]/page.tsx          Tag archive
  blog/category/[category]/page.tsx Category archive
  blog/author/[author]/page.tsx    Author page
components/
  PostCard.tsx                     Summary card used in listings
  PostSearch.tsx                   Client search box + results
  Pagination.tsx                   Accessible windowed pager
  TableOfContents.tsx              Rendered TOC from extracted headings
  ThemeToggle.tsx                  Light/dark toggle (client)
lib/
  posts.ts                         Typed store + query/search/related helpers
  pagination.ts                    paginate / pageRange / parsePageParam
  toc.ts                           slugify / extractToc / reading-time
  rss.ts                           buildRssFeed / escapeXml / RFC-822 dates
  format.ts                        Date formatting
tests/
  posts.test.ts                    Data layer: sort, lookup, category, author, related, search
  pagination.test.ts               Slicing, clamping, ranges, param parsing
  toc.test.ts                      Slugs, heading extraction, reading time
  rss.test.ts                      Feed envelope, escaping, dates
  PostCard / Pagination / TableOfContents / PostSearch  Render tests (jsdom)
```

## Adding a post

Append an entry to the `posts` array in `lib/posts.ts`:

```ts
{
  slug: "my-new-post",
  title: "My New Post",
  date: "2025-05-01",
  category: "nextjs",
  tags: ["nextjs"],
  author: "ada",
  excerpt: "One-line summary.",
  body: "## A heading\n\nFull post body..."
}
```

It appears automatically on the home page, the blog index, the matching tag and
category archives, the author's page, the RSS feed, and related-post lists.
Headings (`## ...`) feed the table of contents and reading-time estimate.

## Configuration

Set the public site URL so the RSS feed emits absolute links:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Roadmap

- [x] Categories, tags, and author pages
- [x] Client-side search
- [x] Pagination
- [x] Related posts
- [x] RSS feed
- [x] Reading-time + table-of-contents helpers
- [x] Dark mode
- [ ] MDX / filesystem post loader behind the same `lib/posts.ts` API
- [ ] Full-text search index for large post counts
- [ ] Sitemap and JSON-LD structured data

## FAQ

**Why a typed array instead of MDX files?**
So the data layer is pure and trivially testable. The query helpers in
`lib/posts.ts` define the contract; swap the array for a filesystem or CMS loader
later without touching any page component.

**Is the search server-side?**
No. The full post set is already shipped to the page, and `<PostSearch>` filters
it in the browser via the pure `searchPosts` helper. For very large blogs, build
a search index instead.

**How is the RSS feed generated?**
`lib/rss.ts` is a pure string builder over `getAllPosts()`. The `/rss.xml` route
handler just wraps it in a `Response`, so the same logic is unit-tested without a
server.

**Does dark mode flash on load?**
No. An inline script in the root layout applies the stored or system preference
before first paint.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and our
[Code of Conduct](CODE_OF_CONDUCT.md) before opening a pull request. Run
`npm run typecheck` and `npm run test` and make sure both pass.

## Contact — Viprasol Tech Private Limited

- Website: [viprasol.com](https://viprasol.com)
- Email: [support@viprasol.com](mailto:support@viprasol.com)
- Telegram: [t.me/viprasol_help](https://t.me/viprasol_help) | WhatsApp: +91 96336 52112
- GitHub: [@Viprasol-Tech](https://github.com/Viprasol-Tech) | [LinkedIn](https://www.linkedin.com/in/viprasol/) | X [@viprasol](https://twitter.com/viprasol)

## License

[MIT](LICENSE) (c) 2025 Viprasol Tech Private Limited
