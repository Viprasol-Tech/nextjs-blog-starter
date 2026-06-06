/**
 * Table-of-contents and reading helpers for lightweight markdown-ish bodies.
 *
 * Bodies in this starter use a simple convention: lines beginning with one or
 * more "#" characters are headings (ATX style). These helpers are pure and
 * fully unit-tested so the UI can rely on stable, predictable output.
 */

export interface TocEntry {
  /** Heading depth (1 for "#", 2 for "##", capped at 6). */
  level: number;
  /** The heading text with the leading "#" markers stripped. */
  text: string;
  /** A URL-safe slug derived from the text, unique within the document. */
  id: string;
}

/**
 * Converts arbitrary heading text into a URL-safe slug: lowercased, with
 * non-alphanumerics collapsed to single hyphens and edges trimmed.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extracts an ordered table of contents from a markdown-ish body. Duplicate
 * heading slugs are de-duplicated with a numeric suffix (`intro`, `intro-2`).
 * Bodies with no headings return an empty array.
 */
export function extractToc(body: string): TocEntry[] {
  const seen = new Map<string, number>();
  const entries: TocEntry[] = [];

  for (const line of body.split("\n")) {
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) {
      continue;
    }
    const level = match[1].length;
    const text = match[2].trim();
    const base = slugify(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    entries.push({ level, text, id });
  }

  return entries;
}

/**
 * Counts words in a body, ignoring heading markers and collapsing whitespace.
 */
export function countWords(body: string): number {
  return body
    .replace(/^#{1,6}\s+/gm, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * Estimates reading time in whole minutes (minimum 1) for a body, at a
 * configurable words-per-minute rate (default 200).
 */
export function estimateReadingTime(body: string, wpm = 200): number {
  const rate = Math.max(1, wpm);
  return Math.max(1, Math.ceil(countWords(body) / rate));
}
