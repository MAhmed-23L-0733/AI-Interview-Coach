export function NavbarSkeleton(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0B0F17]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand Skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-800 animate-pulse" />
          <div className="h-6 w-28 rounded bg-slate-800 animate-pulse hidden sm:block" />
        </div>

        {/* Center Pill Skeleton */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] p-1.5">
          <div className="h-7 w-20 rounded-full bg-slate-800 animate-pulse" />
          <div className="h-7 w-20 rounded-full bg-slate-800 animate-pulse" />
          <div className="h-7 w-20 rounded-full bg-slate-800 animate-pulse" />
          <div className="h-7 w-20 rounded-full bg-slate-800 animate-pulse" />
        </div>

        {/* Actions Skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-slate-800 animate-pulse hidden md:block" />
          <div className="h-9 w-20 rounded-xl bg-slate-800 animate-pulse hidden md:block" />
          <div className="h-9 w-28 rounded-xl bg-slate-800 animate-pulse hidden md:block" />
          <div className="h-10 w-10 rounded-xl bg-slate-800 animate-pulse md:hidden" />
        </div>
      </div>
    </header>
  );
}
