export function DashboardSkeleton(): React.JSX.Element {
  return (
    <div className="flex min-h-screen bg-[#0B0F17] text-slate-100">
      {/* Desktop Navigation Dock Skeleton */}
      <aside className="hidden md:flex w-[72px] flex-col items-center justify-between border-r border-[#1F2937] bg-[#0B0F17] py-6 animate-pulse">
        <div className="flex flex-col items-center gap-6">
          <div className="h-10 w-10 rounded-xl bg-[#1E293B]" />
          <div className="flex flex-col items-center gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-11 w-11 rounded-xl bg-[#111827]" />
            ))}
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-[#1E293B]" />
      </aside>

      {/* Main Content Area Skeleton */}
      <div className="flex flex-1 flex-col animate-pulse">
        {/* Header Skeleton */}
        <header className="border-b border-[#1F2937] px-6 py-5 lg:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="space-y-2">
              <div className="h-7 w-48 rounded-md bg-[#1F2937]" />
              <div className="h-4 w-72 rounded bg-[#1F2937]/60" />
            </div>
            <div className="h-10 w-10 rounded-full bg-[#1E293B]" />
          </div>
        </header>

        {/* Content Body Skeleton */}
        <main className="mx-auto w-full max-w-6xl space-y-8 px-6 py-8 lg:px-8">
          {/* Next Session Card Skeleton */}
          <div className="h-56 rounded-2xl border border-[#1F2937] bg-[#111827] p-8" />

          {/* Topic Selector Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-6 w-44 rounded bg-[#1F2937]" />
              <div className="h-4 w-28 rounded bg-[#1F2937]/60" />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-xl border border-[#1F2937] bg-[#111827]"
                />
              ))}
            </div>
          </div>

          {/* Recent Interviews Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-6 w-40 rounded bg-[#1F2937]" />
              <div className="h-4 w-20 rounded bg-[#1F2937]/60" />
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-xl border border-[#1F2937] bg-[#111827]"
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
