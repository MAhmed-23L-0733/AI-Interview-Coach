import type { JSX } from 'react';
import { Sparkles, CheckCircle2, Trophy, Volume2 } from 'lucide-react';

export function FeatureVoiceVisual(): JSX.Element {
  return (
    <div className="my-5 p-3.5 rounded-xl bg-[#0B132B]/80 border border-blue-500/20 backdrop-blur-xs">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span>Adaptive Voice Engine</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
          180ms latency
        </span>
      </div>

      <div className="flex items-center justify-center gap-1 h-8 px-2 py-1 mb-2.5 rounded-lg bg-[#070D1F]">
        {[35, 60, 95, 45, 80, 100, 70, 50, 85, 40, 65, 30].map((h, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full transition-all duration-300"
            style={{
              height: `${h}%`,
              animation: `pulse 1.4s ease-in-out infinite ${i * 0.12}s`,
            }}
          />
        ))}
      </div>

      <div className="flex items-start gap-2 text-[11px] text-slate-300 bg-[#0F1B35]/60 p-2 rounded-lg border border-blue-500/10">
        <Volume2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
        <p className="italic leading-snug">
          &ldquo;What is your worst-case space bound if the call stack grows unbounded?&rdquo;
        </p>
      </div>
    </div>
  );
}

export function FeatureCodeVisual(): JSX.Element {
  return (
    <div className="my-5 p-3.5 rounded-xl bg-[#061815]/80 border border-emerald-500/20 backdrop-blur-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 font-mono">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>solution.py</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
          Python 3.12
        </span>
      </div>

      <div className="font-mono text-[11px] bg-[#03110E] p-2.5 rounded-lg border border-emerald-500/10 mb-2.5 leading-relaxed text-slate-300">
        <div className="text-purple-400">
          def <span className="text-yellow-300">find_median</span>(self, stream):
        </div>
        <div className="pl-3 text-emerald-300">
          heapq.heappush(self.small, -val)
        </div>
        <div className="pl-3 text-slate-500 text-[10px]">
          # O(log n) insert · O(1) peek
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-emerald-300 bg-[#0B251F]/70 px-2.5 py-1.5 rounded-lg border border-emerald-500/20">
        <div className="flex items-center gap-1.5 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>24 / 24 Tests Passed</span>
        </div>
        <span className="text-[10px] text-emerald-400/80 font-mono">0ms runtime</span>
      </div>
    </div>
  );
}

export function FeatureReportVisual(): JSX.Element {
  const pillars = [
    { label: 'Problem Solving', score: '96%', width: '96%' },
    { label: 'Code Efficiency (Big-O)', score: '92%', width: '92%' },
    { label: 'Technical Communication', score: '95%', width: '95%' },
  ];

  return (
    <div className="my-5 p-3.5 rounded-xl bg-[#1C1305]/80 border border-amber-500/20 backdrop-blur-xs">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-400">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Diagnostic Rubric</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
          <Trophy className="w-2.5 h-2.5 text-amber-400" />
          <span>Top 5% Cohort</span>
        </div>
      </div>

      <div className="space-y-2 mb-2">
        {pillars.map((pillar) => (
          <div key={pillar.label} className="text-[11px]">
            <div className="flex justify-between text-slate-300 mb-1">
              <span className="text-slate-400 text-[10px]">{pillar.label}</span>
              <span className="font-mono font-semibold text-amber-300 text-[10px]">
                {pillar.score}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#2A1D0B] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                style={{ width: pillar.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
