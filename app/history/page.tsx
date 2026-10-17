import * as React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { HistoryPageContent } from "@/components/history/HistoryPageContent";
import { HistorySkeleton } from "@/components/history/HistorySkeleton";
import { historyQuerySchema } from "@/lib/validations/history";

export const metadata: Metadata = {
  title: "Interview History | AI Interview Coach",
  description:
    "Track your progress and review detailed performance reports across all mock interview sessions.",
};

interface HistoryPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function HistoryDataLoader({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<React.JSX.Element> {
  const resolvedParams = await searchParams;
  const parsed = historyQuerySchema.safeParse({
    topic: typeof resolvedParams.topic === "string" ? resolvedParams.topic : undefined,
    search: typeof resolvedParams.search === "string" ? resolvedParams.search : undefined,
  });

  const query = parsed.success ? parsed.data : undefined;
  return <HistoryPageContent query={query} />;
}

/**
 * Thin Next.js Server Page Wrapper for the Interview History route.
 */
export default function HistoryPage({ searchParams }: HistoryPageProps): React.JSX.Element {
  return (
    <Suspense fallback={<HistorySkeleton />}>
      <HistoryDataLoader searchParams={searchParams} />
    </Suspense>
  );
}
