"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { TOPIC_OPTIONS } from "@/lib/validations/history";

export function HistoryFilterBar(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTopic = searchParams.get("topic") ?? "all";
  const currentSearch = searchParams.get("search") ?? "";

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const params = new URLSearchParams(searchParams.toString());
    const val = e.target.value;
    if (val && val !== "all") {
      params.set("topic", val);
    } else {
      params.delete("topic");
    }
    router.push(`/history?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const params = new URLSearchParams(searchParams.toString());
    const val = e.target.value.trim();
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    router.push(`/history?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 border-b border-[#1F2937] pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-bold text-white sm:text-xl">All sessions</h2>
        <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
          Your completed mock interviews and reports.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 sm:flex-nowrap">
        <div className="relative flex-1 sm:w-56">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search sessions..."
            defaultValue={currentSearch}
            onChange={handleSearchChange}
            aria-label="Search sessions"
            className="w-full rounded-xl border border-[#1F2937] bg-[#1E293B] py-2 pl-9 pr-3 text-base text-slate-200 placeholder-slate-500 transition-colors focus:border-[#3B82F6] focus:outline-none md:text-sm"
          />
        </div>

        <div className="relative min-w-[140px]">
          <select
            value={currentTopic}
            onChange={handleTopicChange}
            aria-label="Filter by topic"
            className="w-full cursor-pointer appearance-none rounded-xl border border-[#1F2937] bg-[#1E293B] py-2 pl-3.5 pr-8 text-base font-medium text-slate-300 transition-colors hover:border-[#334155] focus:border-[#3B82F6] focus:outline-none md:text-sm"
          >
            {TOPIC_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#111827] text-white">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
