import * as React from "react";
import { AppShellDock } from "@/components/shared/AppShellDock";
import { HistoryHeader } from "@/components/history/HistoryHeader";
import { HistoryMetricsGrid } from "@/components/history/HistoryMetricsGrid";
import { HistoryFilterBar } from "@/components/history/HistoryFilterBar";
import { HistorySessionsTable } from "@/components/history/HistorySessionsTable";
import { fetchHistoryData } from "@/actions/history";
import type { HistoryQuery } from "@/lib/validations/history";

interface HistoryPageContentProps {
  query?: Partial<HistoryQuery>;
}

export async function HistoryPageContent({
  query,
}: HistoryPageContentProps): Promise<React.JSX.Element> {
  const data = await fetchHistoryData(query);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100">
      <AppShellDock initials="AM" />

      <main className="flex flex-col pb-24 pt-8 sm:px-6 md:pb-12 md:pl-[72px] lg:px-8">
        <div className="mx-auto w-full max-w-6xl space-y-8 px-4 sm:px-0">
          <HistoryHeader />
          <HistoryMetricsGrid metrics={data.metrics} />

          <section
            aria-label="Interview Sessions"
            className="rounded-2xl border border-[#1F2937] bg-[#111827] p-4 sm:p-6"
          >
            <HistoryFilterBar />
            <HistorySessionsTable sessions={data.sessions} />
          </section>
        </div>
      </main>
    </div>
  );
}
