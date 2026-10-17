"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

// Works without next-themes or HeroUI. It adds or removes the "dark" class on <html>
// and saves the choice in localStorage.
export function ModeToggle() {
  const [isDark, setIsDark] = useState(null); // null until mounted

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    root.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
  };

  // Placeholder with the same size, so the layout doesn't jump on load
  if (isDark === null) {
    return <span className="inline-block h-10 w-10 rounded-full bg-white/15" />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
        isDark
          ? "border-indigo-300/40 bg-indigo-500/20 hover:bg-indigo-500/30"
          : "border-amber-300/60 bg-amber-300/20 hover:bg-amber-300/30"
      }`}
    >
      <Sun
        className={`absolute h-5 w-5 text-amber-300 transition-all duration-500 ${
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 text-indigo-200 transition-all duration-500 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}