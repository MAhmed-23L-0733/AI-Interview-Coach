'use client';

import React from 'react';
import { Award, BarChart3, TrendingUp, CheckCircle } from 'lucide-react';

const METRICS = [
  { label: 'System Architecture', score: 92, color: 'bg-emerald-500' },
  { label: 'Code Correctness & Tests', score: 95, color: 'bg-blue-500' },
  { label: 'Trade-off Articulation', score: 86, color: 'bg-purple-500' },
  { label: 'Complexity Optimization', score: 84, color: 'bg-cyan-500' },
];

export function StepReportVisual(): React.JSX.Element {
  return (
    <div className="relative rounded-2xl border border-emerald-500/30 bg-[#07171F]/90 p-5 backdrop-blur-md shadow-2xl shadow-emerald-500/10 overflow-hidden font-sans">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono text-slate-300 font-medium">SESSION DIAGNOSTIC DOSSIER</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <Award className="w-3 h-3" />
          <span>Top 4% Cohort</span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 mb-4">
        <div>
          <div className="text-[11px] text-slate-400 font-mono">Hiring Committee Outcome</div>
          <div className="text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
            <span className="text-emerald-400">Strong Hire</span>
            <span className="text-slate-500 font-normal text-xs">• L5 Senior</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-white font-mono">89<span className="text-xs text-slate-500">/100</span></div>
          <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Offer Ready
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {METRICS.map((m) => (
          <div key={m.label} className="text-xs">
            <div className="flex justify-between items-center text-[11px] mb-1 font-medium text-slate-300">
              <span>{m.label}</span>
              <span className="font-mono text-slate-400">{m.score}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${m.color} rounded-full transition-all duration-700`}
                style={{ width: `${m.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-300">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="truncate">Optimized lock release latency via Redis Pub/Sub</span>
      </div>
    </div>
  );
}
