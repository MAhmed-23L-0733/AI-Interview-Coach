"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useActiveSection(sectionIds: readonly string[]): string | null {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Active section highlighting only applies on the homepage
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    let ticking = false;

    const checkActiveSection = (): void => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom edge check: highlight last section when scrolled to footer
      if (scrollY + windowHeight >= documentHeight - 50) {
        if (sectionIds.length > 0) {
          setActiveSection(sectionIds[sectionIds.length - 1]);
        }
        return;
      }

      // Top area check: in Hero, no navigation anchor is highlighted
      if (scrollY < 180) {
        setActiveSection(null);
        return;
      }

      const offsetThreshold = 180;
      let matchedSection: string | null = null;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= offsetThreshold && rect.bottom > offsetThreshold) {
          matchedSection = id;
          break;
        }
      }

      setActiveSection(matchedSection);
    };

    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleHash = (): void => {
      const hash = window.location.hash.replace("#", "");
      if (sectionIds.includes(hash)) {
        setActiveSection(hash);
      } else {
        checkActiveSection();
      }
    };

    // Initial evaluation
    if (window.location.hash) {
      handleHash();
    } else {
      checkActiveSection();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHash);
    };
  }, [pathname, sectionIds]);

  return activeSection;
}
