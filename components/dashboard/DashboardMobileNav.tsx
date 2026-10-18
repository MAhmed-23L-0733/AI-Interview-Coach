"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNavDrawer } from "@/components/shared/mobile-drawer/MobileNavDrawer";

interface DashboardMobileNavProps {
  initials?: string;
  name?: string | null;
  onLogoutClick?: () => void;
}

export function DashboardMobileNav({
  initials = "AM",
  name,
  onLogoutClick,
}: DashboardMobileNavProps): React.JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Mobile Top Header Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#1F2937] bg-[#0B0F17]/95 px-4 py-3 backdrop-blur-md md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3B82F6] text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]">
            <Activity className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white">
            AI Interview Coach
          </span>
        </Link>
        <div className="flex items-center gap-2.5">
          <Link
            href="/profile"
            aria-label="User Profile"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border border-[#334155] bg-[#1E293B] text-xs font-bold text-slate-200 transition-colors",
              pathname.startsWith("/profile") && "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0B0F17]"
            )}
          >
            {initials}
          </Link>
          <button
            type="button"
            aria-label="Open Navigation Menu"
            onClick={() => setIsOpen(true)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#1F2937] bg-[#111827] text-slate-300 transition-colors hover:bg-[#1E293B] hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Slide-Out Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isOpen}
        onClose={handleClose}
        initials={initials}
        name={name}
        onLogoutClick={onLogoutClick}
      />
    </>
  );
}
