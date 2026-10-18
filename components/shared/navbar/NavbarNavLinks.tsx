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
    <nav
      className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-md"
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.sectionId;

        return (
          <Link
            key={item.sectionId}
            href={item.href}
            onClick={(e) => handleLinkClick(e, item.sectionId)}
            className={cn(
              "relative px-4 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200",
              isActive
                ? "bg-blue-500/15 text-blue-400 font-semibold border border-blue-500/30 shadow-[0_0_14px_rgba(59,130,246,0.25)]"
                : "border border-transparent text-slate-300 hover:text-white hover:bg-white/[0.06]"
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
