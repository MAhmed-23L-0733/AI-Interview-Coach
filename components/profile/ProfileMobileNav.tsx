"use client";

import * as React from "react";
import Link from "next/link";
import { Activity, Menu } from "lucide-react";
import { MobileNavDrawer } from "@/components/shared/mobile-drawer/MobileNavDrawer";

interface ProfileMobileNavProps {
  userInitials?: string;
  userName?: string | null;
  onLogoutClick?: () => void;
}

export function ProfileMobileNav({
  userInitials = "AM",
  userName,
  onLogoutClick,
}: ProfileMobileNavProps): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#1F2937] bg-[#0B0F17]/95 px-4 backdrop-blur-md md:hidden">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]">
            <Activity className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold text-white">Syntropic Coach</span>
          <span className="rounded-full border border-blue-500/30 bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
            PRO
          </span>
        </Link>
        <div className="flex items-center gap-2.5">
          <Link
            href="/profile"
            aria-label="User Profile"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-xs font-bold text-white ring-2 ring-blue-500/80"
          >
            {userInitials}
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
        initials={userInitials}
        name={userName}
        onLogoutClick={onLogoutClick}
      />
    </>
  );
}
