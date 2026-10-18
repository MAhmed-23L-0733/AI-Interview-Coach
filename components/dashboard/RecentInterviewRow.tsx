import * as React from "react";
import Link from "next/link";
import { ChevronRight, Calendar, Network, Activity, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InterviewSessionData {
  id: string;
  topic: string;
  date: string;
  duration: string;
  score: number;
  iconName: "Network" | "Activity" | "Cpu";
}

const ICONS = {
  Network,
  Activity,
  Cpu,
} as const;

interface RecentInterviewRowProps {
  session: InterviewSessionData;
}

export function RecentInterviewRow({
  session,
}: RecentInterviewRowProps): React.JSX.Element {
  const IconComponent = ICONS[session.iconName];

  return (
    <Link
      href={`/report/${session.id}`}
      className="group flex items-center justify-between p-4 transition-colors hover:bg-[#151d30] cursor-pointer"
    >
      {/* Left Column: Icon + Topic Metadata */}
      <div className="flex items-center gap-3.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E293B] text-[#60A5FA] transition-transform group-hover:scale-105">
          <IconComponent className="h-5 w-5" />
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white tracking-tight">
            {session.topic}
          </h4>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="h-3.5 w-3.5 text-slate-500" />
            <span>
              {session.date} • {session.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Monospace Score Badge & Chevron */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <span
            className={cn(
              "font-mono text-base font-bold tabular-nums tracking-tight",
              session.score >= 80 ? "text-white" : "text-amber-400/90"
            )}
          >
            {session.score}
          </span>
          <span className="font-mono text-xs text-slate-500">/100</span>
        </div>

        <ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-300" />
      </div>
    </Link>
  );
}
