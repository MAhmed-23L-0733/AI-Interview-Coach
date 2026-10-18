import * as React from "react";
import { DashboardLayoutWrapper } from "@/components/dashboard/DashboardLayoutWrapper";

export function ReportSkeleton(): React.JSX.Element {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden min-w-0 bg-[#0B0F17] text-white">
      <DashboardLayoutWrapper className="flex flex-col pt-8 min-w-0">
        <div className="mx-auto w-full max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8 min-w-0">
          {/* Header Skeleton */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-pulse min-w-0">
            <div className="space-y-2 min-w-0">
              <div className="h-8 w-40 sm:w-48 max-w-full rounded-lg bg-[#1F2937]" />
              <div className="h-4 w-full max-w-[240px] sm:w-64 rounded-md bg-[#1F2937]/60" />
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-3 min-w-0">
              <div className="h-10 w-28 sm:w-36 max-w-full rounded-xl bg-[#1F2937]" />
              <div className="h-10 w-28 sm:w-32 max-w-full rounded-xl bg-[#1F2937]" />
            </div>
          </div>

          {/* Hero Score Card Skeleton */}
          <div className="h-48 w-full min-w-0 rounded-2xl border border-[#1F2937] bg-[#111827] p-6 animate-pulse" />

          {/* Topics Covered Skeleton */}
          <div className="h-20 w-full min-w-0 rounded-2xl border border-[#1F2937] bg-[#111827] p-5 animate-pulse" />

          {/* Breakdown Grid Skeleton */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 min-w-0">
            <div className="h-64 w-full min-w-0 rounded-2xl border border-[#1F2937] bg-[#111827] p-6 animate-pulse" />
            <div className="h-64 w-full min-w-0 rounded-2xl border border-[#1F2937] bg-[#111827] p-6 animate-pulse" />
          </div>

          {/* Topic Feedback Skeleton */}
          <div className="h-72 w-full min-w-0 rounded-2xl border border-[#1F2937] bg-[#111827] p-6 animate-pulse" />

          {/* Question Skeleton */}
          <div className="h-64 w-full min-w-0 rounded-2xl border border-[#1F2937] bg-[#111827] p-6 animate-pulse" />
        </div>
      </DashboardLayoutWrapper>
    </div>
  );
}
