import * as React from "react";
import Link from "next/link";
import {
  RecentInterviewRow,
  type InterviewSessionData,
} from "@/components/dashboard/RecentInterviewRow";

const RECENT_SESSIONS: readonly InterviewSessionData[] = [
  {
    id: "session-1",
    topic: "Data Structures",
    date: "May 24, 2025",
    duration: "28 min",
    score: 84,
    iconName: "Network",
  },
  {
    id: "session-2",
    topic: "Algorithms",
    date: "May 21, 2025",
    duration: "36 min",
    score: 76,
    iconName: "Activity",
  },
  {
    id: "session-3",
    topic: "Operating Systems",
    date: "May 17, 2025",
    duration: "25 min",
    score: 68,
    iconName: "Cpu",
  },
] as const;

export function RecentInterviewsList(): React.JSX.Element {
  return (
    <section aria-label="Recent Interviews" className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Recent interviews
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Review your latest performance and feedback.
          </p>
        </div>

        <Link
          href="/history"
          className="text-xs font-medium text-[#3B82F6] transition-colors hover:text-blue-400 hover:underline"
        >
          View all &gt;
        </Link>
      </div>

      {/* Surface Card Container */}
      <div className="overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827] divide-y divide-[#1F2937]">
        {RECENT_SESSIONS.map((session) => (
          <RecentInterviewRow key={session.id} session={session} />
        ))}
      </div>
    </section>
  );
}
