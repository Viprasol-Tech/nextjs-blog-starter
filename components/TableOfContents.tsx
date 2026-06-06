import type { TocEntry } from "@/lib/toc";

export interface TableOfContentsProps {
  /** Heading entries produced by `extractToc`. */
  entries: TocEntry[];
}

/**
 * Renders a nested table of contents from extracted heading entries. Returns
 * nothing when the document has no headings.
 */
export function TableOfContents({ entries }: TableOfContentsProps) {
  if (entries.length === 0) {
    return null;
  }

  const minLevel = Math.min(...entries.map((e) => e.level));

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <p className="font-semibold text-slate-900 dark:text-slate-100">
        On this page
      </p>
      <ul className="mt-2 space-y-1">
        {entries.map((entry) => (
          <li
            key={entry.id}
            style={{ paddingLeft: `${(entry.level - minLevel) * 12}px` }}
          >
            <a
              href={`#${entry.id}`}
              className="text-slate-600 transition hover:text-brand dark:text-slate-300"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;
