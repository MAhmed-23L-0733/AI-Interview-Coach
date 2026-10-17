export function ProfileSkeleton(): React.JSX.Element {
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
        <div className="h-8 w-8 rounded-full bg-[#1E293B]" />
      </aside>

      {/* Main Content Area Skeleton */}
      <div className="flex flex-1 flex-col animate-pulse">
        {/* Header Skeleton */}
        <header className="hidden md:flex border-b border-[#1F2937] px-8 py-4 items-center justify-between">
          <div className="h-6 w-56 rounded bg-[#1F2937]" />
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-[#1F2937]" />
            <div className="h-9 w-28 rounded-lg bg-[#1F2937]" />
          </div>
        </header>

        {/* Content Body */}
        <main className="mx-auto w-full max-w-[1440px] px-6 py-8 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <div className="h-8 w-64 rounded bg-[#1F2937]" />
              <div className="h-4 w-96 rounded bg-[#1F2937]/60" />
            </div>
            <div className="h-12 w-48 rounded-xl bg-[#111827]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="h-96 rounded-2xl border border-[#1F2937] bg-[#111827]" />
              <div className="h-48 rounded-2xl border border-[#1F2937] bg-[#111827]" />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="h-80 rounded-2xl border border-[#1F2937] bg-[#111827]" />
              <div className="h-72 rounded-2xl border border-[#1F2937] bg-[#111827]" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
