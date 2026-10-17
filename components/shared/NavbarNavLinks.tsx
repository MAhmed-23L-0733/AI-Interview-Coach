"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SECTION_IDS } from "@/components/shared/navData";
import { useActiveSection } from "@/hooks/useActiveSection";

export function NavbarNavLinks(): React.JSX.Element {
  const pathname = usePathname();
  const activeSection = useActiveSection(SECTION_IDS);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ): void => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${sectionId}`);
      }
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-1.5" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.sectionId;

        return (
          <Link
            key={item.sectionId}
            href={item.href}
            onClick={(e) => handleLinkClick(e, item.sectionId)}
            className={cn(
              "text-sm font-medium px-3.5 py-1.5 rounded-xl border transition-all duration-200",
              isActive
                ? "bg-blue-500/10 border-blue-500/30 text-blue-400 font-semibold shadow-xs shadow-blue-500/15"
                : "border-transparent text-slate-300 hover:bg-slate-800/40 hover:text-white"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
