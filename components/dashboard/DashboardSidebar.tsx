"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Home, Clock, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/lib/stores/useSidebarStore";
import { useSidebarUser } from "@/hooks/useSidebarUser";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavItem } from "./sidebar/SidebarNavItem";
import { SidebarUserFooter } from "./sidebar/SidebarUserFooter";
import { LogoutConfirmModal } from "./sidebar/LogoutConfirmModal";
import { DashboardMobileNav } from "./DashboardMobileNav";

interface DashboardSidebarProps {
  initials?: string;
  name?: string | null;
}
const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: Home, match: (p: string) => p === "/dashboard" },
  { href: "/history", label: "History", icon: Clock, match: (p: string) => p.startsWith("/history") || p.startsWith("/report") },
  { href: "/settings", label: "Settings", icon: Settings, match: (p: string) => p.startsWith("/settings") },
] as const;

export function DashboardSidebar({ initials = "AM", name }: DashboardSidebarProps): React.JSX.Element {
  const pathname = usePathname();
  const { isExpanded, toggleSidebar } = useSidebarStore();
  const { name: resolvedName, initials: resolvedInitials } = useSidebarUser({ propInitials: initials, propName: name });
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <aside
        aria-label="Sidebar Navigation"
        className={cn(
          "fixed bottom-0 left-0 top-0 z-40 hidden flex-col justify-between border-r border-[#1F2937] bg-[#0B0F17] py-6 px-3.5 items-start transition-[width] duration-300 ease-in-out overflow-hidden md:flex",
          isExpanded ? "w-64" : "w-[72px]"
        )}
      >
        <div className="flex w-full flex-col items-start gap-6">
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
          </nav>
        </div>

        <div className="flex w-full flex-col items-start gap-1.5">
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            aria-label="Log out"
            title="Log out"
            className="group flex h-10 w-full items-center rounded-xl text-slate-400 transition-colors duration-200 hover:bg-[#1E293B]/70 hover:text-red-400"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <LogOut className="h-5 w-5 shrink-0" />
            </div>
            <span
              className={cn(
                "overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 ease-in-out",
                isExpanded ? "max-w-[160px] opacity-100 ml-2.5" : "max-w-0 opacity-0 ml-0"
              )}
            >
              Log out
            </span>
          </button>
          <SidebarUserFooter
            initials={resolvedInitials}
            name={resolvedName}
            isExpanded={isExpanded}
            isActive={pathname.startsWith("/profile")}
          />
        </div>
      </aside>

      <DashboardMobileNav
        initials={resolvedInitials}
        name={resolvedName}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => !isLoggingOut && setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        isLoggingOut={isLoggingOut}
      />
    </>
  );
}
