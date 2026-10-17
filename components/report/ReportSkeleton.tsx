import * as React from "react";
import { DashboardLayoutWrapper } from "@/components/dashboard/DashboardLayoutWrapper";

export function ReportSkeleton(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-white">
      <DashboardLayoutWrapper className="flex flex-col pt-8">
        <div className="mx-auto w-full max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-pulse">
            <div className="space-y-2">
              <div className="h-8 w-48 rounded-lg bg-[#1F2937]" />
              <div className="h-4 w-64 rounded-md bg-[#1F2937]/60" />
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-36 rounded-xl bg-[#1F2937]" />
              <div className="h-10 w-32 rounded-xl bg-[#1F2937]" />
            </div>
          </div>

          {/* Hero Score Card Skeleton */}
          <div className="h-48 w-full rounded-2xl border border-[#1F2937] bg-[#111827] p-6 animate-pulse" />

          {/* Topics Covered Skeleton */}
          <div className="h-20 w-full rounded-2xl border border-[#1F2937] bg-[#111827] p-5 animate-pulse" />

          {/* Breakdown Grid Skeleton */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="h-64 rounded-2xl border border-[#1F2937] bg-[#111827] p-6 animate-pulse" />
            <div className="h-64 rounded-2xl border border-[#1F2937] bg-[#111827] p-6 animate-pulse" />
          </div>

          {/* Topic Feedback Skeleton */}
          <div className="h-72 rounded-2xl border border-[#1F2937] bg-[#111827] p-6 animate-pulse" />

          {/* Question Skeleton */}
          <div className="h-64 rounded-2xl border border-[#1F2937] bg-[#111827] p-6 animate-pulse" />
        </div>
      </DashboardLayoutWrapper>
    </div>
  );
}
