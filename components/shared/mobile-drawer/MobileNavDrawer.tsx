"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { MobileNavDrawerLinks } from "./MobileNavDrawerLinks";
import { MobileNavDrawerFooter } from "./MobileNavDrawerFooter";

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initials?: string;
  name?: string | null;
  onLogoutClick?: () => void;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  initials = "AM",
  name = "Alex",
  onLogoutClick,
}: MobileNavDrawerProps): React.JSX.Element {
  const pathname = usePathname();

  const prevPathnameRef = React.useRef(pathname);
  React.useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Close on Escape key press
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background body scroll while drawer is open
  React.useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Slide-Out Drawer */}
          <motion.aside
            key="mobile-nav-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            aria-label="Navigation Menu"
            role="dialog"
            aria-modal="true"
            className="fixed inset-y-0 right-0 z-50 flex h-dvh w-full max-w-xs flex-col justify-between border-l border-[#1F2937] bg-[#0B0F17] p-5 shadow-2xl md:hidden"
          >
            {/* Top Section: App Logo, Branding & Close Button */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="flex items-center gap-2.5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3B82F6] text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]">
                    <Activity className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <span className="text-base font-bold tracking-tight text-white">
                    AI Interview Coach
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close Navigation Menu"
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#1F2937] bg-[#111827] text-slate-400 transition-colors hover:bg-[#1E293B] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <MobileNavDrawerLinks onClose={onClose} />
            </div>

            {/* Bottom Section: User Info & Log out */}
            <MobileNavDrawerFooter
              initials={initials}
              name={name}
              onLogoutClick={onLogoutClick}
              onClose={onClose}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
