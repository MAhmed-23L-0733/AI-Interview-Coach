import * as React from "react";

export function SettingsSkeleton(): React.JSX.Element {
  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden min-w-0 bg-[#0B0F17] text-slate-100">
      <aside className="hidden md:flex w-[72px] shrink-0 border-r border-[#1F2937] bg-[#0B0F17]" />
      <div className="flex flex-1 flex-col animate-pulse min-w-0">
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-w-0">
          <div className="h-12 w-1/2 sm:w-1/3 max-w-xs bg-[#111827] rounded-lg" />
          <div className="h-64 w-full min-w-0 bg-[#111827] rounded-xl border border-[#1F2937]" />
          <div className="h-64 w-full min-w-0 bg-[#111827] rounded-xl border border-[#1F2937]" />
          <div className="h-48 w-full min-w-0 bg-[#111827] rounded-xl border border-[#1F2937]" />
        </main>
      </div>
    </div>
  );
}
