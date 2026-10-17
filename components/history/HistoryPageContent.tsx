import * as React from "react";
import { AppShellDock } from "@/components/shared/AppShellDock";
import { DashboardLayoutWrapper } from "@/components/dashboard/DashboardLayoutWrapper";
import { HistoryHeader } from "@/components/history/HistoryHeader";
import { HistoryMetricsGrid } from "@/components/history/HistoryMetricsGrid";
import { HistoryFilterBar } from "@/components/history/HistoryFilterBar";
import { HistorySessionsTable } from "@/components/history/HistorySessionsTable";
import { fetchHistoryData } from "@/actions/history";
import { auth } from "@/auth";
import type { HistoryQuery } from "@/lib/validations/history";

interface HistoryPageContentProps {
  query?: Partial<HistoryQuery>;
}

export async function HistoryPageContent({
  query,
}: HistoryPageContentProps): Promise<React.JSX.Element> {
  const [session, data] = await Promise.all([
    auth(),
    fetchHistoryData(query),
  ]);

  const userName = session?.user?.name || null;
  const initials = userName
    ? userName
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AM";

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100">
      <AppShellDock initials={initials} name={userName} />

      <DashboardLayoutWrapper className="flex flex-col pt-8">
        <div className="mx-auto w-full max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
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
      </DashboardLayoutWrapper>
    </div>
  );
}
