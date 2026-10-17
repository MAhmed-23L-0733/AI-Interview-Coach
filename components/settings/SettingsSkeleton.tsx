import * as React from "react";

export function SettingsSkeleton(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#0B0F17] flex">
      <div className="w-[72px] hidden md:block bg-[#0B0F17] border-r border-[#1F2937]" />
      <div className="flex-1 max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8 animate-pulse">
        <div className="h-12 bg-[#111827] rounded-lg w-1/3" />
        <div className="h-64 bg-[#111827] rounded-xl border border-[#1F2937]" />
        <div className="h-64 bg-[#111827] rounded-xl border border-[#1F2937]" />
        <div className="h-48 bg-[#111827] rounded-xl border border-[#1F2937]" />
      </div>
    </div>
  );
}
