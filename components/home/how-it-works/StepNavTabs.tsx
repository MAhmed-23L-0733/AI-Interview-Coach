'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sliders, Mic, BarChart3 } from 'lucide-react';
import type { StepId, HowItWorksStep } from './types';

interface StepNavTabsProps {
  steps: HowItWorksStep[];
  activeStep: StepId;
  onSelectStep: (stepId: StepId) => void;
}

const STEP_ICONS: Record<StepId, React.ElementType> = {
  configure: Sliders,
  session: Mic,
  report: BarChart3,
};

export function StepNavTabs({
  steps,
  activeStep,
  onSelectStep,
}: StepNavTabsProps): React.JSX.Element {
  return (
    <div className="relative mb-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-md">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          const Icon = STEP_ICONS[step.id];

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectStep(step.id)}
              className={`relative flex items-center gap-3 w-full py-3 px-3.5 rounded-xl text-left transition-all duration-200 z-10 min-h-[48px] min-w-0 overflow-hidden ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-step-tab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-blue-600/30 border border-blue-500/50 shadow-lg shadow-blue-500/10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {step.stepNumber}
              </div>

              <div className="relative min-w-0 flex-1 overflow-hidden">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="font-semibold text-xs sm:text-sm truncate">
                    {step.title}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
