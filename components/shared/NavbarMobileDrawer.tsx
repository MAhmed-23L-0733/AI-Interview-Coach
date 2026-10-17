"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import type { SafeUser } from "@/types";

interface NavbarMobileDrawerProps {
  user: SafeUser | null;
}

export function NavbarMobileDrawer({ user }: NavbarMobileDrawerProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center gap-2">
      <ThemeToggle />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#1F2937] bg-[#111827] text-slate-300 hover:text-white"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-20 z-50 border-b border-[#1F2937] bg-[#0B0F17]/95 p-6 backdrop-blur-xl shadow-2xl">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <Link
              href="#features"
              onClick={() => setIsOpen(false)}
              className="flex min-h-[44px] items-center text-slate-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#topics"
              onClick={() => setIsOpen(false)}
              className="flex min-h-[44px] items-center text-slate-300 hover:text-white transition-colors"
            >
              Topics
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setIsOpen(false)}
              className="flex min-h-[44px] items-center text-slate-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="flex min-h-[44px] items-center text-slate-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <div className="my-2 h-px bg-[#1F2937]" />
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#3B82F6] font-semibold text-white shadow-lg shadow-blue-500/20"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-[44px] items-center justify-center rounded-xl border border-[#1F2937] bg-[#111827] font-semibold text-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#3B82F6] font-semibold text-white shadow-lg shadow-blue-500/20"
                >
                  Start Practicing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
