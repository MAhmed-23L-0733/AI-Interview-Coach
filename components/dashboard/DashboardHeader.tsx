import * as React from "react";

interface DashboardHeaderProps {
  name?: string | null;
  initials?: string;
}

export function DashboardHeader({
  name = "Alex",
  initials = "AM",
}: DashboardHeaderProps): React.JSX.Element {
  return (
    <header className="flex items-center justify-between">
      {/* Left: Personalized Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
          Good morning, {name || "Alex"}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Ready for another focused practice session?
        </p>
      </div>

      {/* Right: User Profile Avatar Badge */}
      <div className="flex items-center">
        <div
          aria-label={`User profile for ${name || "Alex"}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#334155] bg-[#1E293B] text-xs font-bold text-slate-200 shadow-sm transition-transform hover:scale-105"
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
