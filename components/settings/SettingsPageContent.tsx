"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
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
}

export function SettingsPageContent({
  initialSettings,
  initials = "AM",
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
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex">
      {/* 72px Desktop Navigation Rail Dock & Mobile Bar */}
      <DashboardSidebar initials={initials} />

      {/* Main Content Area */}
      <main className="flex-1 w-full md:pl-[72px] transition-all">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
          {/* Header */}
          <SettingsHeader
            isSaving={isSaving}
            onDiscard={onDiscard}
            onSave={onSubmit}
          />

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
      </main>
    </div>
  );
}
