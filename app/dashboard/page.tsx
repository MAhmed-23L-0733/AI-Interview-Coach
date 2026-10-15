import { Suspense } from "react";
import { DashboardLoader } from "@/components/dashboard/DashboardLoader";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

/**
 * Thin Page Wrapper for the Protected Dashboard route.
 * Wraps server auth-check loader in Suspense to support Next.js partial prefetching and streaming.
 */
export default function DashboardPage(): React.JSX.Element {
  return (
    <div className="flex-1">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardLoader />
      </Suspense>
    </div>
  );
}
