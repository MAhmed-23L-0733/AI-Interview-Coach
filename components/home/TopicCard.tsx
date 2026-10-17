import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopicCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  avgScore: string;
  isHighlighted?: boolean;
  className?: string;
}

export function TopicCard({
  icon: Icon,
  title,
  description,
  avgScore,
  isHighlighted,
  className,
}: TopicCardProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "group p-5 rounded-2xl bg-[#111827] border transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5",
        isHighlighted
          ? "border-blue-500/70 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          : "border-[#1F2937] hover:border-blue-500/50",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              isHighlighted
                ? "bg-blue-500/20 text-blue-400"
                : "bg-[#1E293B] text-slate-300 group-hover:bg-blue-500/10 group-hover:text-blue-400"
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          <CheckCircle2
            className={cn(
              "w-5 h-5",
              isHighlighted ? "text-blue-400 fill-blue-500/20" : "text-slate-600"
            )}
          />
        </div>

        <h3 className="text-base font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#1F2937] text-xs">
        <span className="font-mono text-slate-500">Avg. Score</span>
        <span
          className={cn(
            "font-semibold font-mono",
            isHighlighted ? "text-blue-400" : "text-slate-300"
          )}
        >
          {avgScore}
        </span>
      </div>
    </div>
  );
}
