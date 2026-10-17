"use client";

import { useState, useTransition } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSettingsSchema, DEFAULT_USER_SETTINGS, type UserSettingsInput, type VoicePersonality } from "@/lib/validations/settings";
import { updateUserSettings } from "@/actions/settings";

export interface UseSettingsFormReturn {
  form: UseFormReturn<UserSettingsInput>;
  isSaving: boolean;
  toast: { type: "success" | "error"; message: string } | null;
  clearToast: () => void;
  onSubmit: () => Promise<void>;
  onDiscard: () => void;
  playingVoice: VoicePersonality | null;
  handlePlaySample: (voice: VoicePersonality) => void;
  handleExportHistory: () => void;
}

export function useSettingsForm(
  initialSettings: UserSettingsInput = DEFAULT_USER_SETTINGS
): UseSettingsFormReturn {
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [playingVoice, setPlayingVoice] = useState<VoicePersonality | null>(null);

  const form = useForm<UserSettingsInput>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: initialSettings,
  });

  const clearToast = () => setToast(null);

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      const res = await updateUserSettings(data);
      if (res.success) {
        setToast({ type: "success", message: "Settings saved successfully!" });
        form.reset(data);
      } else {
        setToast({ type: "error", message: res.error || "Failed to update settings" });
      }
    });
  });

  const onDiscard = () => {
    form.reset(initialSettings);
    setToast({ type: "success", message: "Settings restored to previous values." });
  };

  const handlePlaySample = (voice: VoicePersonality) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const samples: Record<VoicePersonality, string> = {
        nova: "Hello Alex, I'm Nova. Let's practice system architecture together.",
        echo: "Echo online. Provide algorithmic complexity and test assertions.",
        alloy: "Hey Alex! Great to see you. Ready for technical interview warmup?",
      };
      const utterance = new SpeechSynthesisUtterance(samples[voice]);
      utterance.rate = form.getValues("speechRate") || 1.0;
      utterance.onstart = () => setPlayingVoice(voice);
      utterance.onend = () => setPlayingVoice(null);
      utterance.onerror = () => setPlayingVoice(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setPlayingVoice(voice);
      setTimeout(() => setPlayingVoice(null), 2000);
    }
  };

  const handleExportHistory = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({ exportedAt: new Date().toISOString(), settings: form.getValues() }, null, 2)
    );
    const link = Object.assign(document.createElement("a"), {
      href: dataStr,
      download: `interview_settings_${Date.now()}.json`,
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
    setToast({ type: "success", message: "Settings and mock session data exported!" });
  };

  return {
    form,
    isSaving: isPending,
    toast,
    clearToast,
    onSubmit,
    onDiscard,
    playingVoice,
    handlePlaySample,
    handleExportHistory,
  };
}
