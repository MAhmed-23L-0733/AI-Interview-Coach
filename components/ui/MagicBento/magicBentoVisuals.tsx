'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { JSX, PointerEvent } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  FingerPrintIcon,
  Key01Icon,
  Tick02Icon
} from '@hugeicons/core-free-icons';
import {
  Brain,
  CheckCircle2,
  Code2,
  Cpu,
  FileText,
  Layers,
  Mic,
  Terminal
} from 'lucide-react';

import { vars, clamp } from './magicBentoUtils';
import { CHART, curve, sampleAt } from './magicBentoChartUtils';
import type { BuiltInVisual } from './types';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export const AnalyticsVisual = (): JSX.Element => {
  const chartRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const noteRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useIsomorphicLayoutEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;
    const update = (): void => {
      const next = { width: plot.clientWidth, height: plot.clientHeight };
      setSize(previous =>
        previous && previous.width === next.width && previous.height === next.height ? previous : next
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(plot);
    return () => observer.disconnect();
  }, []);

  const shape = useMemo(
    () => (size && size.width > 4 && size.height > 4 ? curve(CHART, size.width, size.height) : null),
    [size]
  );

  const scrub = (event: PointerEvent<HTMLDivElement>): void => {
    const plot = plotRef.current;
    const chart = chartRef.current;
    const line = scrubRef.current;
    const dot = dotRef.current;
    const label = valueRef.current;
    const note = noteRef.current;
    if (!shape || !plot || !chart || !line || !dot || !label || !note) return;
    const rect = plot.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, rect.width);
    const y = sampleAt(shape.samples, x);
    const position = (x / Math.max(1, rect.width)) * (CHART.length - 1);
    const index = Math.floor(position);
    const next = Math.min(CHART.length - 1, index + 1);
    const value = CHART[index] + (CHART[next] - CHART[index]) * (position - index);
    
    chart.dataset.scrub = '';
    line.style.transform = `translateX(${x.toFixed(1)}px)`;
    dot.style.transform = `translateY(${y.toFixed(1)}px)`;
    
    const runtimeMs = Math.max(2, Math.round(value * 0.35));
    label.textContent = `${runtimeMs} ms`;
    
    const complexityTiers = ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)', 'O(N²)'];
    const tierIdx = Math.min(
      complexityTiers.length - 1,
      Math.floor((x / Math.max(1, rect.width)) * complexityTiers.length)
    );
    note.textContent = complexityTiers[tierIdx];
  };

  const rest = (): void => {
    if (chartRef.current) delete chartRef.current.dataset.scrub;
    if (valueRef.current) valueRef.current.textContent = '14 ms';
    if (noteRef.current) noteRef.current.textContent = 'O(N log N)';
  };

  return (
    <div
      ref={chartRef}
      className="magic-bento__chart"
      onPointerMove={scrub}
      onPointerDown={scrub}
      onPointerLeave={rest}
    >
      <div className="magic-bento__figure">
        <span ref={valueRef} className="magic-bento__figure-value">
          14 ms
        </span>
        <span ref={noteRef} className="magic-bento__figure-note">
          O(N log N)
        </span>
      </div>
      <div ref={plotRef} className="magic-bento__plot">
        {shape && size && (
          <svg viewBox={`0 0 ${size.width} ${size.height}`} aria-hidden="true">
            <path className="magic-bento__chart-area" d={shape.area} />
            <path className="magic-bento__chart-line" d={shape.line} pathLength="1" />
          </svg>
        )}
        <span ref={scrubRef} className="magic-bento__scrub">
          <span ref={dotRef} className="magic-bento__scrub-dot" />
        </span>
      </div>
    </div>
  );
};

const BARS = [42, 58, 49, 71, 63, 88, 76];

export const DashboardVisual = (): JSX.Element => (
  <div className="magic-bento__bars">
    <div className="magic-bento__figure">
      <span className="magic-bento__figure-value">88 / 100</span>
      <span className="magic-bento__figure-note">Top 4%</span>
    </div>
    <div className="magic-bento__bars-plot">
      {BARS.map((height, index) => (
        <span
          key={index}
          className="magic-bento__bar"
          data-peak={height === Math.max(...BARS) ? '' : undefined}
          style={vars({ '--h': height / 100, '--i': index })}
        />
      ))}
    </div>
  </div>
);

export const VoiceDialogueVisual = (): JSX.Element => (
  <div className="flex flex-col justify-between w-full h-full p-4 rounded-xl bg-[#071322]/80 border border-blue-500/20 backdrop-blur-sm select-none gap-3">
    {/* Live Audio Status Header */}
    <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-[#1F2937]/70">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
        </span>
        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5" />
          Voice Session Active
        </span>
      </div>
      {/* Animated Waveform */}
      <div className="flex items-center gap-1 h-4">
        {[35, 75, 45, 95, 60, 30, 85, 55, 90, 40, 70, 25].map((h, i) => (
          <span
            key={i}
            className="w-0.5 sm:w-1 bg-gradient-to-t from-blue-500 via-sky-400 to-emerald-300 rounded-full animate-pulse"
            style={{
              height: `${h}%`,
              animationDelay: `${(i % 5) * 160}ms`,
              animationDuration: '1.1s'
            }}
          />
        ))}
      </div>
    </div>

    {/* Conversational Voice Exchange */}
    <div className="space-y-2 flex-1 flex flex-col justify-center">
      {/* AI Interviewer prompt */}
      <div className="flex items-start gap-2.5">
        <span className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
          <Brain className="w-3.5 h-3.5" />
        </span>
        <div className="flex-1 bg-[#0D1C30]/90 border border-blue-500/25 rounded-xl p-2.5 text-xs text-slate-200 leading-relaxed shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-blue-400 text-[10px] tracking-wider uppercase">
              AI Interviewer (Speaking)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">18:24</span>
          </div>
          &ldquo;Can you explain your approach and how you&apos;d handle potential duplicates?&rdquo;
        </div>
      </div>

      {/* Candidate voice answer */}
      <div className="flex items-start gap-2.5 pl-3">
        <span className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
          <Mic className="w-3.5 h-3.5" />
        </span>
        <div className="flex-1 bg-[#082229]/80 border border-emerald-500/25 rounded-xl p-2.5 text-xs text-slate-200 leading-relaxed shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-emerald-400 text-[10px] tracking-wider uppercase">
              Candidate (Transcribed Voice)
            </span>
            <span className="text-[10px] text-emerald-400/80 font-mono">Live</span>
          </div>
          &ldquo;I&apos;ll use a hash set for O(1) lookups so we only iterate through the array once...&rdquo;
        </div>
      </div>
    </div>
  </div>
);

export const ScorecardVisual = (): JSX.Element => (
  <div className="flex flex-col justify-between w-full h-full p-4 rounded-xl bg-[#071322]/80 border border-emerald-500/20 backdrop-blur-sm select-none gap-3">
    {/* Scorecard Header */}
    <div className="flex items-center justify-between pb-2.5 border-b border-[#1F2937]/70">
      <div className="flex items-center gap-2.5">
        <span className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </span>
        <div>
          <span className="text-xs font-bold text-white block leading-tight">
            Diagnostic Scorecard
          </span>
          <span className="text-[10px] text-slate-400">Post-Session Evaluation</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
        <span className="text-xs font-mono font-bold text-emerald-400">88</span>
        <span className="text-[10px] text-slate-400">/ 100</span>
        <span className="text-[9px] uppercase font-bold text-emerald-300 ml-1 bg-emerald-500/20 px-1 py-0.5 rounded">
          Strong
        </span>
      </div>
    </div>

    {/* Dimension Breakdown Bars */}
    <div className="space-y-2 flex-1 flex flex-col justify-center">
      {[
        { label: 'Problem Solving & Logic', score: 92, barClass: 'bg-blue-500' },
        { label: 'Technical Accuracy', score: 88, barClass: 'bg-emerald-500' },
        { label: 'Communication Clarity', score: 84, barClass: 'bg-sky-400' },
        { label: 'Code Quality & Style', score: 86, barClass: 'bg-purple-400' }
      ].map(dim => (
        <div key={dim.label} className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-medium">{dim.label}</span>
            <span className="font-mono text-slate-300 font-semibold">{dim.score}%</span>
          </div>
          <div className="h-1.5 w-full bg-[#111C2E] rounded-full overflow-hidden border border-[#1E293B]">
            <div
              className={`h-full ${dim.barClass} rounded-full`}
              style={{ width: `${dim.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>

    {/* Actionable recommendation pill */}
    <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10 border border-blue-500/25 text-[11px] text-blue-200">
      <span className="font-bold text-blue-400 shrink-0 text-[10px] uppercase tracking-wide">
        Actionable Tip:
      </span>
      <span className="truncate text-slate-300">Explain your time-space trade-offs before typing code.</span>
    </div>
  </div>
);

const TOPIC_BADGES = [
  { icon: Cpu, label: 'Operating Systems', sub: 'Processes, Threads & Memory' },
  { icon: Layers, label: 'Computer Networks', sub: 'Protocols & Architecture' }
];

export const SystemsVisual = (): JSX.Element => (
  <div className="flex flex-col justify-center h-full gap-2 p-1">
    {TOPIC_BADGES.map((item) => (
      <div
        key={item.label}
        className="flex items-center justify-between p-2 rounded-lg bg-[#0B1524]/70 border border-[#1E293B] text-[11px]"
      >
        <div className="flex items-center gap-2">
          <item.icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <div className="min-w-0">
            <span className="font-semibold text-slate-200 block text-[11px] leading-tight truncate">
              {item.label}
            </span>
            <span className="text-[9px] text-slate-400 block leading-tight truncate">
              {item.sub}
            </span>
          </div>
        </div>
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 shrink-0 ml-1">
          Ready
        </span>
      </div>
    ))}
  </div>
);

const AI_NODES = [
  { icon: Mic, label: 'Voice Dialogue', x: '17%', y: '24%', color: 'text-sky-400' },
  { icon: Code2, label: 'Live Code Editor', x: '83%', y: '24%', color: 'text-emerald-400' },
  { icon: Layers, label: 'Curated Topics', x: '17%', y: '78%', color: 'text-blue-400' },
  { icon: FileText, label: 'Detailed Scores', x: '83%', y: '78%', color: 'text-purple-400' }
];

export const IntegrationVisual = (): JSX.Element => (
  <div className="magic-bento__hub">
    <svg className="magic-bento__hub-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {AI_NODES.map(node => (
        <line key={node.x + node.y} x1={parseFloat(node.x)} y1={parseFloat(node.y)} x2="50" y2="51" pathLength="1" />
      ))}
    </svg>
    {AI_NODES.map((node, index) => (
      <span
        key={`packet-${index}`}
        className="magic-bento__packet"
        style={vars({ '--x': node.x, '--y': node.y, '--i': index })}
      />
    ))}
    {AI_NODES.map((node, index) => (
      <span
        key={node.x + node.y}
        className="magic-bento__hub-node magic-bento__tile flex items-center justify-center"
        style={vars({ '--x': node.x, '--y': node.y, '--s': '26px', '--i': index + 1 })}
        title={node.label}
      >
        <node.icon className={`w-3.5 h-3.5 ${node.color}`} strokeWidth={2} />
      </span>
    ))}
    <span
      className="magic-bento__hub-node magic-bento__tile flex items-center justify-center"
      style={vars({ '--x': '50%', '--y': '51%', '--s': '34px', '--i': 0 })}
      title="Voice-Based AI Interview Coach"
    >
      <Brain className="w-4 h-4 text-blue-400" strokeWidth={2} />
    </span>
  </div>
);

// Backward-compatible alias exports
export const CollaborationVisual = VoiceDialogueVisual;
export const AutomationVisual = ScorecardVisual;
export const SecurityVisual = SystemsVisual;

export const VISUALS: Record<BuiltInVisual, () => JSX.Element> = {
  analytics: AnalyticsVisual,
  dashboard: DashboardVisual,
  collaboration: VoiceDialogueVisual,
  voice: VoiceDialogueVisual,
  automation: ScorecardVisual,
  scorecard: ScorecardVisual,
  integration: IntegrationVisual,
  security: SystemsVisual,
  systems: SystemsVisual
};
