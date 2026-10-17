"use client";

import { useEffect } from "react";
import type { ProfileData } from "@/lib/validations/profile";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { AppShellDock } from "@/components/profile/AppShellDock";
import { DashboardLayoutWrapper } from "@/components/dashboard/DashboardLayoutWrapper";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTitleBar } from "@/components/profile/ProfileTitleBar";
import { DeveloperIdentityCard } from "@/components/profile/DeveloperIdentityCard";
import { TargetCompaniesSection } from "@/components/profile/TargetCompaniesSection";
import { VoicePreferencesCard } from "@/components/profile/VoicePreferencesCard";
import { ReadinessBenchmarkCard } from "@/components/profile/ReadinessBenchmarkCard";
import { SubscriptionBillingCard } from "@/components/profile/SubscriptionBillingCard";
import { ProfileStickyBar } from "@/components/profile/ProfileStickyBar";

interface ProfilePageContentProps {
  initialData: ProfileData;
}

export function ProfilePageContent({ initialData }: ProfilePageContentProps): React.JSX.Element {
  const { initProfile, profile } = useProfileStore();

  useEffect(() => {
    initProfile(initialData);
  }, [initialData, initProfile]);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Persistent Left Sidebar Navigation Rail / Mobile Nav */}
      <AppShellDock userInitials={profile.avatarInitials || "AM"} />

      {/* Main Workspace Canvas with dynamic sidebar padding */}
      <DashboardLayoutWrapper className="flex flex-1 flex-col">
        {/* Top Header Navigation */}
        <ProfileHeader />

        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 pb-32">
          {/* Title & Quick Status */}
          <ProfileTitleBar />

          {/* Two-Column Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Column 1: Identity, Companies & Preferences (7 Cols) */}
            <section className="lg:col-span-7 flex flex-col gap-6">
              <DeveloperIdentityCard />
              <TargetCompaniesSection />
              <VoicePreferencesCard />
            </section>

            {/* Column 2: Readiness Benchmark & Billing (5 Cols) */}
            <section className="lg:col-span-5 flex flex-col gap-6">
              <ReadinessBenchmarkCard />
              <SubscriptionBillingCard />
            </section>
          </div>
        </main>

        {/* Bottom Sticky Bar */}
        <ProfileStickyBar />
      </DashboardLayoutWrapper>
    </div>
  );
}
