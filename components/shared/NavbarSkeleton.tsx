import { ShieldCheck } from "lucide-react";

export function NavbarSkeleton(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="font-bold tracking-tight text-zinc-900 text-lg dark:text-white">
              ModeroIQ
            </span>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
          <div className="h-4 w-12 rounded bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
          <div className="h-4 w-16 rounded bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
          <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-9 w-24 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
        </div>
      </div>
    </header>
  );
}
