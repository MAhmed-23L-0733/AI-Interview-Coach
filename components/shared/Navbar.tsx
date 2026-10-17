import Link from "next/link";
import { connection } from "next/server";
import { auth } from "@/auth";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { AuthNav } from "@/components/shared/AuthNav";
import { NavbarMobileDrawer } from "@/components/shared/NavbarMobileDrawer";
import { AudioWaveform, ArrowRight } from "lucide-react";
import type { SafeUser } from "@/types";

export async function Navbar(): Promise<React.JSX.Element> {
  await connection();
  const session = await auth();

  const safeUser: SafeUser | null = session?.user
    ? {
        id: session.user.id || "",
        name: session.user.name || null,
        email: session.user.email || "",
        image: session.user.image || null,
      }
    : null;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0F17]/85 backdrop-blur-md border-b border-[#1F2937]">
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6] flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <AudioWaveform className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
            InterviewAI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#topics" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Topics
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {safeUser ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
              >
                Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <AuthNav user={safeUser} />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
              >
                <span>Start Practicing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        <NavbarMobileDrawer user={safeUser} />
      </div>
    </header>
  );
}
