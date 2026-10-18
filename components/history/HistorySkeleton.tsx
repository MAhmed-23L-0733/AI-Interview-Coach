import * as React from "react";

export function HistorySkeleton(): React.JSX.Element {
  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden min-w-0 flex-col bg-[#0B0F17] pb-12 md:pl-[72px]">
      <main className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 lg:px-8 min-w-0">
        <div className="flex flex-col gap-8 min-w-0">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0">
            <div className="space-y-2 min-w-0">
              <div className="h-8 w-40 sm:w-48 max-w-full animate-pulse rounded-lg bg-[#1E293B]" />
              <div className="h-4 w-full max-w-[260px] sm:w-72 animate-pulse rounded-lg bg-[#1E293B]/60" />
            </div>
            <div className="h-11 w-full max-w-[140px] sm:w-36 animate-pulse rounded-xl bg-[#1E293B] shrink-0" />
          </div>

          {/* Metrics Skeleton */}
          <div className="grid grid-cols-1 divide-y divide-[#1F2937] rounded-2xl border border-[#1F2937] bg-[#111827] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 min-w-0">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3 p-4 sm:p-6 min-w-0">
                <div className="h-3 w-20 max-w-full animate-pulse rounded bg-[#1E293B]" />
                <div className="h-7 w-14 max-w-full animate-pulse rounded bg-[#1E293B]" />
                <div className="h-3 w-28 max-w-full animate-pulse rounded bg-[#1E293B]/60" />
              </div>
            ))}
          </div>

          {/* Table Container Skeleton */}
          <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-4 sm:p-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#1F2937] pb-6 min-w-0">
              <div className="space-y-2 min-w-0">
                <div className="h-6 w-32 max-w-full animate-pulse rounded bg-[#1E293B]" />
                <div className="h-4 w-full max-w-[220px] sm:w-56 animate-pulse rounded bg-[#1E293B]/60" />
              </div>
              <div className="h-10 w-full max-w-[140px] sm:w-36 animate-pulse rounded-xl bg-[#1E293B] shrink-0" />
            </div>

            <div className="mt-6 space-y-4 min-w-0">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-12 w-full min-w-0 animate-pulse rounded-xl bg-[#1E293B]/40"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
