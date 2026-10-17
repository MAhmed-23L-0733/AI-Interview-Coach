import { Suspense } from "react";
import type { Metadata } from "next";
import { ProfileLoader } from "@/components/profile/ProfileLoader";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";


export const metadata: Metadata = {
  title: "Profile & Account — AI Interview Coach",
  description:
    "Manage your developer identity, target roles, and interview readiness benchmarks for tailored voice mock interviews.",
};

export default function ProfilePage(): React.JSX.Element {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileLoader />
    </Suspense>
  );
}
