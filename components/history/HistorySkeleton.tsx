import * as React from "react";

export function HistorySkeleton(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0F17] pb-24 md:pl-[72px] md:pb-12">
      <main className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* Header Skeleton */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="h-8 w-48 animate-pulse rounded-lg bg-[#1E293B]" />
              <div className="h-4 w-72 animate-pulse rounded-lg bg-[#1E293B]/60" />
            </div>
            <div className="h-11 w-36 animate-pulse rounded-xl bg-[#1E293B]" />
          </div>

          {/* Metrics Skeleton */}
          <div className="grid grid-cols-1 divide-y divide-[#1F2937] rounded-2xl border border-[#1F2937] bg-[#111827] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3 p-6">
                <div className="h-3 w-20 animate-pulse rounded bg-[#1E293B]" />
                <div className="h-7 w-14 animate-pulse rounded bg-[#1E293B]" />
                <div className="h-3 w-28 animate-pulse rounded bg-[#1E293B]/60" />
              </div>
            ))}
          </div>

          {/* Table Container Skeleton */}
          <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
            <div className="flex items-center justify-between border-b border-[#1F2937] pb-6">
              <div className="space-y-2">
                <div className="h-6 w-32 animate-pulse rounded bg-[#1E293B]" />
                <div className="h-4 w-56 animate-pulse rounded bg-[#1E293B]/60" />
              </div>
              <div className="h-10 w-36 animate-pulse rounded-xl bg-[#1E293B]" />
            </div>

            <div className="mt-6 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-12 w-full animate-pulse rounded-xl bg-[#1E293B]/40"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
