/** Small formatting helpers used by the UI and unit-tested in isolation. */

/**
 * Formats an ISO date string (YYYY-MM-DD) into a readable long form such as
 * "January 5, 2025". Invalid input is returned unchanged so the UI never throws.
 */
export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) {
    return iso;
  }
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

/**
 * Estimates reading time in whole minutes (minimum 1) at 200 words per minute.
 */
export function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
