import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Next.js Blog Starter",
    template: "%s | Next.js Blog Starter"
  },
  description:
    "Next.js MDX-style blog starter with typed frontmatter and post listing.",
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml"
    }
  }
};

/** Inline script applied before paint to avoid a flash of the wrong theme. */
const noFlashScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : prefersDark;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4">
          <header className="flex items-center justify-between py-6">
            <Link href="/" className="text-lg font-bold text-brand">
              nextjs-blog-starter
            </Link>
            <nav className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
              <Link href="/blog" className="hover:text-brand">
                Blog
              </Link>
              <Link href="/search" className="hover:text-brand">
                Search
              </Link>
              <ThemeToggle />
            </nav>
          </header>
          <main className="flex-1 py-4">{children}</main>
          <footer className="py-8 text-sm text-slate-500 dark:text-slate-400">
            Built and maintained by Viprasol Tech.
          </footer>
        </div>
      </body>
    </html>
  );
}
