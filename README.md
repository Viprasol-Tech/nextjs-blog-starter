<div align="center">
  <img src="docs/assets/logo.png" alt="Viprasol Tech" width="120" />

  <h1>nextjs-blog-starter</h1>

  <p><strong>Next.js MDX-style blog starter with typed frontmatter and post listing.</strong></p>

  <p><em>Built and maintained by Viprasol Tech.</em></p>

  <p>
    <a href="https://github.com/Viprasol-Tech/nextjs-blog-starter/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-blog-starter"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black.svg?logo=next.js" /></a>
    <a href="https://github.com/Viprasol-Tech/nextjs-blog-starter"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-blue.svg?logo=typescript" /></a>
  </p>
</div>

---

A minimal, production-shaped blog starter built on the Next.js **App Router** and
TypeScript in **strict** mode. It deliberately skips heavy MDX tooling: posts
live in a typed array so the data layer is trivially testable, and you can swap
in a filesystem or CMS loader later without touching the page components.

## Features

- **Typed frontmatter** — every post conforms to a `Post` interface, so a missing
  field or malformed date is a compile-time error, not a runtime surprise.
- **App Router pages** — blog index, post detail (`/blog/[slug]`), and tag
  archive (`/blog/tag/[tag]`), all statically pre-rendered via
  `generateStaticParams`.
- **Testable data layer** — `getAllPosts` (sorted newest-first), `getPostBySlug`,
  `getPostsByTag` (case-insensitive), and `getAllTags` live in `lib/` with full
  unit coverage.
- **Reusable `<PostCard>` component** — with a render test using Testing Library.
- **Tailwind CSS** — configured and ready, with a small `brand` color extension.
- **Verified gate** — `tsc --noEmit` is clean and `vitest run` is green.

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
  layout.tsx                 Root layout, header/footer, global metadata
  page.tsx                   Home page with latest posts
  not-found.tsx              Custom 404
  blog/page.tsx              Post listing
  blog/[slug]/page.tsx       Post detail
  blog/tag/[tag]/page.tsx    Tag archive
components/
  PostCard.tsx               Summary card used in listings
lib/
  posts.ts                   Typed post store + query helpers
  format.ts                  Date + reading-time formatting
tests/
  posts.test.ts              Sorting, lookup, tag filter, tag list
  format.test.ts             Date + reading-time formatting
  PostCard.test.tsx          Component render test (jsdom)
```

## Adding a post

Append an entry to the `posts` array in `lib/posts.ts`:

```ts
{
  slug: "my-new-post",
  title: "My New Post",
  date: "2025-05-01",
  tags: ["nextjs"],
  excerpt: "One-line summary.",
  body: "Full post body..."
}
```

It will appear automatically on the home page, the blog index, and any matching
tag archive.

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
