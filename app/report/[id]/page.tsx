import * as React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ReportPageContent } from "@/components/report/ReportPageContent";
import { ReportSkeleton } from "@/components/report/ReportSkeleton";
import { fetchSessionReport } from "@/actions/report";

export const metadata: Metadata = {
  title: "Session Report | AI Interview Coach",
  description:
    "Comprehensive diagnostic report and performance analytics for your AI mock interview session.",
};

import { auth } from "@/auth";

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

async function ReportDataLoader({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> {
  const { id } = await params;
  const [session, report] = await Promise.all([
    auth(),
    fetchSessionReport(id),
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
    <ReportPageContent
      report={report}
      initials={initials}
      userName={userName}
    />
  );
}

/**
 * Thin Next.js Server Page Wrapper for the Interview Session Report route.
 */
export default function ReportPage({ params }: ReportPageProps): React.JSX.Element {
  return (
    <Suspense fallback={<ReportSkeleton />}>
      <ReportDataLoader params={params} />
    </Suspense>
  );
}
