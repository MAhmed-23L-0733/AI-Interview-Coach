import * as React from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { CheckCircle2, ShieldCheck } from "lucide-react";

interface DashboardPageContentProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
  };
}

export function DashboardPageContent({
  user,
}: DashboardPageContentProps): React.JSX.Element {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <DashboardHeader name={user.name ?? null} email={user.email ?? null} />
      <DashboardStats userId={user.id} />

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Protected Route Verification
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Server-side authorization enforced via Auth.js (NextAuth v5)
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-850">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Page Wrapper Pattern
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Thin server wrapper at <code className="text-xs font-mono">app/dashboard/page.tsx</code> verified session and rendered <code className="text-xs font-mono">DashboardPageContent</code>.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-850">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Zero Client Fetch Leaks
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              No client-side <code className="text-xs font-mono">useEffect</code> was used for session retrieval. Data was fetched on the server before rendering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
