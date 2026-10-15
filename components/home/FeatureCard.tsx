import * as React from "react";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
}: FeatureCardProps): React.JSX.Element {
  return (
    <div className="relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
            <Icon className="h-5 w-5" />
          </div>
          {badge && (
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-650 dark:bg-zinc-800 dark:text-zinc-350">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
