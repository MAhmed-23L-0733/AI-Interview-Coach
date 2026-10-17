import type { Metadata } from "next";
import { Suspense } from "react";
import { SettingsLoader } from "@/components/settings/SettingsLoader";
import { SettingsSkeleton } from "@/components/settings/SettingsSkeleton";

export const metadata: Metadata = {
  title: "Settings | AI Interview Coach",
  description:
    "Configure audio devices, AI voice persona, coding preferences, and data privacy policies.",
};

/**
 * Thin Next.js Server Page Wrapper for the Settings route.
 * Employs Suspense boundary around the SettingsLoader to enable dynamic streaming prerendering.
 */
export default function SettingsPage(): React.JSX.Element {
  return (
    <Suspense fallback={<SettingsSkeleton />}>
      <SettingsLoader />
    </Suspense>
  );
}
