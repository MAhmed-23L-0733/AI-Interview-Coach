"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavDrawerLinksProps {
  onClose: () => void;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  match: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Home,
    match: (p: string): boolean => p === "/dashboard",
  },
  {
    href: "/history",
    label: "History",
    icon: Clock,
    match: (p: string): boolean => p.startsWith("/history") || p.startsWith("/report"),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
    match: (p: string): boolean => p.startsWith("/profile"),
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    match: (p: string): boolean => p.startsWith("/settings"),
  },
];

export function MobileNavDrawerLinks({
  onClose,
}: MobileNavDrawerLinksProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <nav aria-label="Mobile Drawer Navigation" className="flex flex-col gap-1.5">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = item.match(pathname);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200",
              isActive
                ? "bg-[#1E293B] text-[#3B82F6] font-semibold ring-1 ring-blue-500/20 shadow-sm"
                : "text-slate-400 hover:bg-[#1E293B]/60 hover:text-white font-medium"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="truncate">{item.label}</span>
            {isActive && (
              <span
                className="ml-auto h-2 w-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
