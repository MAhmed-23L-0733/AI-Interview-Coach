import * as React from "react";
import { ShieldCheck, User } from "lucide-react";

interface DashboardHeaderProps {
  name: string | null;
  email: string | null;
}

export function DashboardHeader({ name, email }: DashboardHeaderProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-6 dark:border-zinc-800">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow">
          <User className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome, {name || "User"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{email}</p>
        </div>
      </div>
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
        <ShieldCheck className="h-4 w-4" />
        <span>Authenticated Session</span>
      </div>
    </div>
  );
}
