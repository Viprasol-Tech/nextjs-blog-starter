# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/); versioning
follows [SemVer](https://semver.org/).

## [0.2.0] - 2025

### Added
- **Category archive pages** (`/blog/category/[category]`) with post counts and a
  `getPostsByCategory` / `getAllCategories` data layer.
- **Author pages** (`/blog/author/[author]`) with bios, plus `getAllAuthors`,
  `getAuthorBySlug`, and `getPostsByAuthor` helpers.
- **Client-side search** at `/search` (filters by title, excerpt, tags, and
  category as you type) backed by a pure `searchPosts` helper.
- **Pagination** on the blog index (`?page=N`) with a windowed pager, powered by
  pure `paginate`, `pageRange`, and `parsePageParam` helpers in `lib/pagination.ts`.
- **Related posts** on the post detail page, ranked by shared tags and category
  via `getRelatedPosts`.
- **RSS 2.0 feed** served at `/rss.xml`, built by a pure `buildRssFeed` helper in
  `lib/rss.ts` (with `escapeXml`, `joinUrl`, and RFC-822 date formatting).
- **Reading-time and table-of-contents helpers** in `lib/toc.ts`
  (`slugify`, `extractToc`, `countWords`, `estimateReadingTime`) and a rendered
  `<TableOfContents>` on post pages.
- **Dark mode** via a class-based theme with a no-flash inline script and a
  `<ThemeToggle>` in the header; dark variants across all pages and components.
- New `<PostSearch>`, `<Pagination>`, and `<TableOfContents>` components.
- Roughly doubled the test suite: new unit tests for posts, pagination, TOC, and
  RSS plus render tests for the new components.

### Changed
- `Post` frontmatter now includes `category` and `author` fields.
- `<PostCard>` shows the category and uses the new reading-time estimator.

## [0.1.0] - 2025

### Added
- Initial release of nextjs-blog-starter: Next.js MDX-style blog starter with typed frontmatter and post listing.
