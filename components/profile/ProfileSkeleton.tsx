export function ProfileSkeleton(): React.JSX.Element {
  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden min-w-0 bg-[#0B0F17] text-slate-100">
      {/* Desktop Navigation Dock Skeleton */}
      <aside className="hidden md:flex w-[72px] shrink-0 flex-col items-center justify-between border-r border-[#1F2937] bg-[#0B0F17] py-6 animate-pulse">
        <div className="flex flex-col items-center gap-6">
          <div className="h-10 w-10 rounded-xl bg-[#1E293B]" />
          <div className="flex flex-col items-center gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-11 w-11 rounded-xl bg-[#111827]" />
            ))}
          </div>
        </div>
        <div className="h-8 w-8 rounded-full bg-[#1E293B]" />
      </aside>

      {/* Main Content Area Skeleton */}
      <div className="flex flex-1 flex-col animate-pulse min-w-0">
        {/* Header Skeleton */}
        <header className="hidden md:flex border-b border-[#1F2937] px-8 py-4 items-center justify-between min-w-0">
          <div className="h-6 w-56 max-w-full rounded bg-[#1F2937]" />
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-[#1F2937]" />
            <div className="h-9 w-28 rounded-lg bg-[#1F2937]" />
          </div>
        </header>

        {/* Content Body */}
        <main className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0">
            <div className="space-y-2 min-w-0">
              <div className="h-8 w-full max-w-xs sm:w-64 rounded bg-[#1F2937]" />
              <div className="h-4 w-full max-w-sm sm:max-w-md rounded bg-[#1F2937]/60" />
            </div>
            <div className="h-12 w-full max-w-[180px] sm:w-48 rounded-xl bg-[#111827] shrink-0" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start min-w-0">
            <div className="lg:col-span-7 space-y-6 min-w-0">
              <div className="h-96 w-full min-w-0 rounded-2xl border border-[#1F2937] bg-[#111827]" />
              <div className="h-48 w-full min-w-0 rounded-2xl border border-[#1F2937] bg-[#111827]" />
            </div>
            <div className="lg:col-span-5 space-y-6 min-w-0">
              <div className="h-80 w-full min-w-0 rounded-2xl border border-[#1F2937] bg-[#111827]" />
              <div className="h-72 w-full min-w-0 rounded-2xl border border-[#1F2937] bg-[#111827]" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
