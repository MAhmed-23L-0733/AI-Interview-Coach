"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button";

const emptySubscribe = (): (() => void) => () => {};

/**
 * Hydration-safe theme toggle button using next-themes and React 19 useSyncExternalStore.
 * Avoids cascading renders while guaranteeing no hydration mismatch between SSR and client.
 */
export function ThemeToggle(): React.JSX.Element {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="text-zinc-500"
        aria-label="Toggle theme"
        disabled
      >
        <span className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-300 hover:-rotate-12" />
      )}
    </Button>
  );
}
