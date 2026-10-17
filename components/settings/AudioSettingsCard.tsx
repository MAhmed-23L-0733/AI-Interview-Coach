"use client";

import * as React from "react";
import { Mic, ChevronDown } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { UserSettingsInput, VoicePersonality } from "@/lib/validations/settings";
import { AudioMeterVisualizer } from "./AudioMeterVisualizer";
import { VoicePersonalityCards } from "./VoicePersonalityCards";
import { AudioPlaybackControls } from "./AudioPlaybackControls";

interface AudioSettingsCardProps {
  form: UseFormReturn<UserSettingsInput>;
  playingVoice: VoicePersonality | null;
  onPlaySample: (voice: VoicePersonality) => void;
}

export function AudioSettingsCard({
  form,
  playingVoice,
  onPlaySample,
}: AudioSettingsCardProps): React.JSX.Element {
  const { register, watch, setValue } = form;
  const currentVoice = watch("voicePersonality");
  const currentRate = watch("speechRate");
  const noiseCancellation = watch("noiseCancellation");

  return (
    <section className="bg-[#111827] rounded-xl border border-[#1F2937] p-6 lg:p-7 shadow-sm">
      <div className="flex items-start justify-between border-b border-[#1F2937] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#3B82F6]">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Audio & Speech Settings</h2>
            <p className="text-xs text-slate-400">Calibrate voice capture, AI synthesized responses, and dynamic microphone threshold.</p>
          </div>
        </div>
        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">SEC-01</span>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-2">
            <label htmlFor="mic-select" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Microphone Input Device
            </label>
            <div className="relative">
              <select
                id="mic-select"
                {...register("microphone")}
                className="w-full bg-[#1E293B] rounded-lg border border-[#334155] text-white text-sm px-4 py-2.5 pr-10 focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer"
              >
                <option value="MacBook Pro Microphone (Built-in) - 48kHz">MacBook Pro Microphone (Built-in) - 48kHz</option>
                <option value="Shure MV7 USB Audio Interface (Default)">Shure MV7 USB Audio Interface (Default)</option>
                <option value="AirPods Pro - Spatial Input Filter">AirPods Pro - Spatial Input Filter</option>
                <option value="External Broadcast Interface (Channel 1)">External Broadcast Interface (Channel 1)</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <AudioMeterVisualizer />
          </div>
        </div>

        <div className="pt-4 border-t border-[#1F2937]">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
            AI Coach Voice Personality
          </label>
          <VoicePersonalityCards
            value={currentVoice}
            onChange={(v) => setValue("voicePersonality", v, { shouldDirty: true })}
            playingVoice={playingVoice}
            onPlaySample={onPlaySample}
          />
        </div>

        <AudioPlaybackControls
          speechRate={currentRate}
          noiseCancellation={noiseCancellation}
          onRateChange={(r) => setValue("speechRate", r, { shouldDirty: true })}
          onNoiseToggle={(val) => setValue("noiseCancellation", val, { shouldDirty: true })}
        />
      </div>
    </section>
  );
}
