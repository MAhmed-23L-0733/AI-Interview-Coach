'use client';

import type { JSX } from 'react';
import { Mic, Terminal, BarChart3, Volume2, Bug, LineChart } from 'lucide-react';
import type { FeatureItem } from './featuresData';
import {
  FeatureVoiceVisual,
  FeatureCodeVisual,
  FeatureReportVisual,
} from './featureVisuals';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { cn } from '@/lib/utils';

const ICONS = {
  mic: Mic,
  terminal: Terminal,
  barChart: BarChart3,
};

const BADGE_ICONS = {
  volume: Volume2,
  bug: Bug,
  lineChart: LineChart,
};

export function FeatureValueCard({
  iconType,
  title,
  tagline,
  description,
  badgeIconType,
  badgeTitle,
  badgeDescription,
  spotlightColor,
  iconBgClass,
  iconTextClass,
  badgeTextClass,
  visualType,
}: FeatureItem): JSX.Element {
  const Icon = ICONS[iconType];
  const BadgeIcon = BADGE_ICONS[badgeIconType];

  return (
    <SpotlightCard
      spotlightColor={spotlightColor}
      spotlightSize={320}
      borderGlow={0.7}
      ambient={true}
      proximity={120}
      className="h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5"
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105',
              iconBgClass,
              iconTextClass
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {tagline}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2.5 tracking-tight">
          {title}
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed mb-1">
          {description}
        </p>

        {/* Dynamic engaging micro-preview */}
        {visualType === 'voice' && <FeatureVoiceVisual />}
        {visualType === 'code' && <FeatureCodeVisual />}
        {visualType === 'report' && <FeatureReportVisual />}
      </div>

      <div className="p-3.5 rounded-xl bg-[#0D1826]/90 border border-[#1F2937] text-xs mt-3">
        <div className={cn('flex items-center gap-2 font-semibold mb-1', badgeTextClass)}>
          <BadgeIcon className="w-4 h-4 shrink-0" />
          <span>{badgeTitle}</span>
        </div>
        <span className="text-slate-400 text-[11px] leading-relaxed block">
          {badgeDescription}
        </span>
      </div>
    </SpotlightCard>
  );
}
