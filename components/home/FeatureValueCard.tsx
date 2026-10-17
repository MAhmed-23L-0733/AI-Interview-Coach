import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badgeIcon: LucideIcon;
  badgeTitle: string;
  badgeDescription: string;
  iconBgClass: string;
  iconTextClass: string;
  badgeTextClass: string;
}

export function FeatureValueCard({
  icon: Icon,
  title,
  description,
  badgeIcon: BadgeIcon,
  badgeTitle,
  badgeDescription,
  iconBgClass,
  iconTextClass,
  badgeTextClass,
}: FeatureValueCardProps): React.JSX.Element {
  return (
    <div className="rounded-2xl bg-[#111827] p-8 border border-[#1F2937] flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300">
      <div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
            iconBgClass,
            iconTextClass
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">
          {title}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="p-4 rounded-xl bg-[#0D1826] border border-[#1F2937] text-xs">
        <div className={cn("flex items-center gap-2 font-semibold mb-1", badgeTextClass)}>
          <BadgeIcon className="w-4 h-4" />
          <span>{badgeTitle}</span>
        </div>
        <span className="text-slate-400">
          {badgeDescription}
        </span>
      </div>
    </div>
  );
}
