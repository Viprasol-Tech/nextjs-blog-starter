import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Next.js Blog Starter",
    template: "%s | Next.js Blog Starter"
  },
  description:
    "Next.js MDX-style blog starter with typed frontmatter and post listing."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4">
          <header className="flex items-center justify-between py-6">
            <Link href="/" className="text-lg font-bold text-brand">
              nextjs-blog-starter
            </Link>
            <nav className="flex gap-4 text-sm text-slate-600">
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
              <Link href="/blog" className="hover:text-brand">
                Blog
              </Link>
            </nav>
          </header>
          <main className="flex-1 py-4">{children}</main>
          <footer className="py-8 text-sm text-slate-500">
            Built and maintained by Viprasol Tech.
          </footer>
        </div>
      </body>
    </html>
  );
}
