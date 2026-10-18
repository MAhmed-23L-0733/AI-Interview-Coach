import * as React from "react";

interface DashboardHeaderProps {
  name?: string | null;
  initials?: string;
}

export function DashboardHeader({
  name = "Alex",
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
    </header>
  );
}
