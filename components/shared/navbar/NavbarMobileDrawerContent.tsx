"use client";

import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { NAV_ITEMS } from "@/components/shared/navData";
import { cn } from "@/lib/utils";
import type { SafeUser } from "@/types";

interface NavbarMobileDrawerContentProps {
  readonly user: SafeUser | null;
  readonly activeSection: string | null;
  readonly onNavClick: (sectionId: string) => void;
  readonly onClose: () => void;
}

export function NavbarMobileDrawerContent({
  user,
  activeSection,
  onNavClick,
  onClose,
}: NavbarMobileDrawerContentProps): React.JSX.Element {
  return (
    <nav className="flex flex-col gap-2 text-base font-medium" aria-label="Mobile navigation">
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.sectionId;
        return (
          <Link
            key={item.sectionId}
            href={item.href}
            onClick={() => onNavClick(item.sectionId)}
            className={cn(
              "flex min-h-[44px] items-center px-4 rounded-xl border transition-all duration-200",
              isActive
                ? "bg-blue-500/15 border-blue-500/30 text-blue-400 font-semibold shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                : "border-transparent text-slate-300 hover:bg-white/[0.05] hover:text-white"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}

      <div className="my-2 h-px bg-white/[0.08]" />

      {user ? (
        <Link
          href="/dashboard"
          onClick={onClose}
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)]"
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Go to Dashboard</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            onClick={onClose}
            className="flex min-h-[44px] items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] font-semibold text-slate-200 hover:bg-white/[0.06] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            onClick={onClose}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)]"
          >
            <span>Start Practicing</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </nav>
  );
}
