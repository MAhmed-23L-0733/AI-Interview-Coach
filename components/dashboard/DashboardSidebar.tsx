"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Home, Clock, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/lib/stores/useSidebarStore";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavItem } from "./sidebar/SidebarNavItem";
import { SidebarUserFooter } from "./sidebar/SidebarUserFooter";
import { DashboardMobileNav } from "./DashboardMobileNav";

interface DashboardSidebarProps {
  initials?: string;
}

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: Home, match: (p: string) => p === "/dashboard" },
  { href: "/history", label: "History", icon: Clock, match: (p: string) => p.startsWith("/history") },
  { href: "/settings", label: "Settings", icon: Settings, match: (p: string) => p.startsWith("/settings") },
] as const;

export function DashboardSidebar({ initials = "AM" }: DashboardSidebarProps): React.JSX.Element {
  const pathname = usePathname();
  const { isExpanded, toggleSidebar } = useSidebarStore();

  return (
    <>
      <aside
        aria-label="Sidebar Navigation"
        className={cn(
          "fixed bottom-0 left-0 top-0 z-40 hidden flex-col justify-between border-r border-[#1F2937] bg-[#0B0F17] py-6 transition-all duration-300 ease-in-out md:flex",
          isExpanded ? "w-64 px-4" : "w-[72px] px-3 items-center"
        )}
      >
        <div className="flex w-full flex-col items-center gap-6">
          <SidebarHeader isExpanded={isExpanded} onToggle={toggleSidebar} />

          <nav className="flex w-full flex-col gap-1.5">
            {NAV_ITEMS.map((item) => (
              <SidebarNavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={item.match(pathname)}
                isExpanded={isExpanded}
              />
            ))}
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              aria-label="Log out"
              title="Log out"
              className={cn(
                "flex items-center rounded-xl text-slate-400 transition-all duration-200 hover:bg-[#1E293B]/70 hover:text-red-400",
                isExpanded ? "w-full gap-3 px-3.5 py-2.5 text-sm font-medium" : "h-10 w-10 justify-center"
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {isExpanded && <span className="truncate">Log out</span>}
            </button>
          </nav>
        </div>

        <SidebarUserFooter
          initials={initials}
          isExpanded={isExpanded}
          isActive={pathname.startsWith("/profile")}
        />
      </aside>

      <DashboardMobileNav initials={initials} />
    </>
  );
}
