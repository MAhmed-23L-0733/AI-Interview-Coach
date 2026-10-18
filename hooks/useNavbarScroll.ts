"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export interface NavbarScrollState {
  readonly isScrolled: boolean;
  readonly isHomePage: boolean;
}

/**
 * Tracks window scroll position to dynamically toggle between
 * a transparent hero navbar and a frosted glass state.
 */
export function useNavbarScroll(threshold: number = 20): NavbarScrollState {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const evaluateScroll = (): void => {
      const scrolled = window.scrollY > threshold;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
      ticking = false;
    };

    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(evaluateScroll);
        ticking = true;
      }
    };

    // Evaluate scroll position on mount
    evaluateScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { isScrolled, isHomePage };
}
