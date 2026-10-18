"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardLayoutWrapper } from "@/components/dashboard/DashboardLayoutWrapper";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import type { UserSettingsInput } from "@/lib/validations/settings";
import { SettingsHeader } from "./SettingsHeader";
import { AudioSettingsCard } from "./AudioSettingsCard";
import { InterviewPreferencesCard } from "./InterviewPreferencesCard";
import { PrivacyDataCard } from "./PrivacyDataCard";
import { SettingsBottomBar } from "./SettingsBottomBar";

interface SettingsPageContentProps {
  initialSettings?: UserSettingsInput;
  initials?: string;
  userName?: string | null;
}

export function SettingsPageContent({
  initialSettings,
  initials = "AM",
  userName,
}: SettingsPageContentProps): React.JSX.Element {
  const {
    form,
    isSaving,
    toast,
    clearToast,
    onSubmit,
    onDiscard,
    playingVoice,
    handlePlaySample,
    handleExportHistory,
  } = useSettingsForm(initialSettings);

  const isDirty = Object.keys(form.formState.dirtyFields).length > 0;

  return (
    <div className="relative min-h-screen w-full bg-[#0B0F17] text-slate-100">
      {/* Desktop Sidebar & Mobile Nav */}
      <DashboardSidebar initials={initials} name={userName} />

      {/* Main Content Area */}
      <DashboardLayoutWrapper>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 sm:pb-32">
          {/* Header */}
          <SettingsHeader />

          {/* Settings Multi-Section Form */}
          <form onSubmit={onSubmit} className="space-y-8">
            <AudioSettingsCard
              form={form}
              playingVoice={playingVoice}
              onPlaySample={handlePlaySample}
            />

            <InterviewPreferencesCard form={form} />

            <PrivacyDataCard
              form={form}
              onExportHistory={handleExportHistory}
            />
          </form>
        </div>

        {/* Sticky Action Bottom Dock */}
        <SettingsBottomBar
          isSaving={isSaving}
          isDirty={isDirty}
          toast={toast}
          onClearToast={clearToast}
          onDiscard={onDiscard}
          onSave={onSubmit}
        />
      </DashboardLayoutWrapper>
    </div>
  );
}
