import * as React from "react";
import { HistorySessionRow } from "@/components/history/HistorySessionRow";
import { HistorySessionCard } from "@/components/history/HistorySessionCard";
import { HistoryEmptyState } from "@/components/history/HistoryEmptyState";
import type { SafeSessionRecord } from "@/lib/validations/history";

interface HistorySessionsTableProps {
  sessions: SafeSessionRecord[];
}

export function HistorySessionsTable({ sessions }: HistorySessionsTableProps): React.JSX.Element {
  if (sessions.length === 0) {
    return <HistoryEmptyState />;
  }

  return (
    <div className="mt-4">
      {/* Desktop Table View (>= 768px) */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#1F2937]/80 text-left font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <th scope="col" className="py-3.5 pl-4 pr-3">
                Topic
              </th>
              <th scope="col" className="px-3 py-3.5">
                Date
              </th>
              <th scope="col" className="px-3 py-3.5">
                Duration
              </th>
              <th scope="col" className="px-3 py-3.5">
                Score
              </th>
              <th scope="col" className="px-3 py-3.5">
                Status
              </th>
              <th scope="col" className="py-3.5 pl-3 pr-4 text-right">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F2937]/40">
            {sessions.map((session) => (
              <HistorySessionRow key={session.id} session={session} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View (< 768px) */}
      <div className="flex flex-col gap-3 md:hidden">
        {sessions.map((session) => (
          <HistorySessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
