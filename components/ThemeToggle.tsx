"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem("theme");
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function systemPrefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/**
 * Light/dark theme toggle. Applies the `dark` class to <html>, persists the
 * choice to localStorage, and falls back to the system preference. Pairs with
 * the inline no-flash script in the root layout.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial: Theme = getStoredTheme() ?? (systemPrefersDark() ? "dark" : "light");
    setTheme(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      /* storage may be unavailable; the in-memory state still applies */
    }
  }, [theme, mounted]);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-600 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:text-slate-300"
    >
      {mounted && theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeToggle;
