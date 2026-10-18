'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { HowItWorksStep } from './types';

interface StepDetailCardProps {
  step: HowItWorksStep;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function StepDetailCard({
  step,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: StepDetailCardProps): React.JSX.Element {
  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono font-medium text-blue-400">
          <span>{step.badge}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {step.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed">
          {step.description}
        </p>

        <div className="space-y-2.5 pt-2">
          {step.highlights.map((h) => (
            <div key={h.id} className="flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">{h.label}: </span>
                <span className="text-slate-400">{h.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label="Previous step"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-700/80 bg-slate-800/50 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white transition-all min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next step"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-500 transition-all shadow-md shadow-blue-500/20 min-h-[44px]"
        >
          <span>Next Step</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
