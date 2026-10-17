import { Suspense } from "react";
import { DashboardLoader } from "@/components/dashboard/DashboardLoader";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

/**
 * Thin Next.js Server Page Wrapper for the AI Interview Coach Dashboard.
 * Encapsulates dynamic data access inside Suspense for streaming and prerendering.
 */
export default function DashboardPage(): React.JSX.Element {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardLoader />
    </Suspense>
  );
}
