export function DashboardSkeleton(): React.JSX.Element {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="space-y-2">
            <div className="h-5 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
        <div className="h-6 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 rounded-xl border border-zinc-200 bg-zinc-100 p-5 dark:border-zinc-800 dark:bg-zinc-900"
          />
        ))}
      </div>

      <div className="h-48 rounded-2xl border border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-800 dark:bg-zinc-900" />
    </div>
  );
}
