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
  Code2,
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

const ARROW = (
  <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true">
    <path
      d="M2.2 1.6 13.4 9.9c.5.4.3 1.2-.4 1.3l-4.6.6-2.2 4.2c-.3.6-1.2.5-1.4-.1L1.2 2.4c-.2-.6.5-1.1 1-.8Z"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

export const CollaborationVisual = (): JSX.Element => (
  <div className="magic-bento__collab magic-bento__well">
    <span className="magic-bento__doc-title">System Architecture: Distributed Cache</span>
    <div className="magic-bento__lines">
      <span className="magic-bento__line" style={vars({ '--w': '92%' })} />
      <span className="magic-bento__line" style={vars({ '--w': '78%' })} />
      <span className="magic-bento__line" style={vars({ '--w': '86%' })} />
      <span className="magic-bento__line" style={vars({ '--w': '44%' })} />
      <span className="magic-bento__line magic-bento__line--gap" style={vars({ '--w': '88%' })} />
      <span className="magic-bento__line" style={vars({ '--w': '70%' })}>
        <span className="magic-bento__selection" style={vars({ '--from': '18%', '--span': '58%' })}>
          <span className="magic-bento__caret" />
        </span>
      </span>
      <span className="magic-bento__line" style={vars({ '--w': '82%' })} />
    </div>
    <span
      className="magic-bento__cursor magic-bento__cursor--primary"
      style={vars({ '--x': '58%', '--y': '52%', '--i': 0, '--path': 'magic-bento-path-a' })}
    >
      {ARROW}
      <span className="magic-bento__cursor-name">AI Coach</span>
    </span>
    <span
      className="magic-bento__cursor magic-bento__cursor--secondary"
      style={vars({ '--x': '30%', '--y': '24%', '--i': 1, '--path': 'magic-bento-path-b' })}
    >
      {ARROW}
      <span className="magic-bento__cursor-name">Candidate</span>
    </span>
  </div>
);

const TEST_STEPS = [
  { label: 'Syntax & AST Check', time: '4ms' },
  { label: 'Sample Unit Tests', time: '12ms' },
  { label: 'Boundary Edge Cases', time: '28ms' },
  { label: 'Big-O & Memory Limits', time: '16ms' }
];

export const AutomationVisual = (): JSX.Element => (
  <div className="magic-bento__flow" style={vars({ '--n': TEST_STEPS.length })}>
    <div className="magic-bento__flow-trigger magic-bento__tile">
      <span className="magic-bento__flow-glyph">
        <Terminal className="w-4 h-4 text-emerald-400" strokeWidth={2} />
      </span>
      <span className="magic-bento__flow-copy">
        <span className="magic-bento__flow-name">Code Test Matrix</span>
        <span className="magic-bento__flow-meta magic-bento__flow-hash">24 / 24 Passed</span>
      </span>
    </div>
    <ol className="magic-bento__steps magic-bento__well">
      <span className="magic-bento__rail" aria-hidden="true">
        <span className="magic-bento__rail-fill" />
      </span>
      {TEST_STEPS.map((step, index) => (
        <li key={step.label} className="magic-bento__step" style={vars({ '--i': index })}>
          <span className="magic-bento__status">
            <span className="magic-bento__pending" />
            <span className="magic-bento__spinner" />
            <span className="magic-bento__done">
              <HugeiconsIcon icon={Tick02Icon} size={11} strokeWidth={2.6} />
            </span>
          </span>
          {step.label}
          <span className="magic-bento__step-time">{step.time}</span>
        </li>
      ))}
    </ol>
  </div>
);

const AI_NODES = [
  { icon: Mic, label: 'Audio / Voice', x: '17%', y: '24%', color: 'text-sky-400' },
  { icon: Code2, label: 'Code Sandbox', x: '83%', y: '24%', color: 'text-emerald-400' },
  { icon: Layers, label: 'System Design', x: '17%', y: '78%', color: 'text-blue-400' },
  { icon: FileText, label: 'Rubric Score', x: '83%', y: '78%', color: 'text-purple-400' }
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
      title="AI Technical Interview Engine"
    >
      <Brain className="w-4 h-4 text-blue-400" strokeWidth={2} />
    </span>
  </div>
);

const SYSTEM_GUARDS = [
  { icon: Key01Icon, label: 'Thread Mutex Locks' },
  { icon: FingerPrintIcon, label: 'Memory Barrier Isolation' }
];

export const SecurityVisual = (): JSX.Element => (
  <div className="magic-bento__shield">
    {SYSTEM_GUARDS.map((setting, index) => (
      <div key={setting.label} className="magic-bento__setting magic-bento__tile">
        <HugeiconsIcon icon={setting.icon} size={14} strokeWidth={1.8} />
        <span className="magic-bento__setting-label">{setting.label}</span>
        <span className="magic-bento__switch" style={vars({ '--i': index })} />
      </div>
    ))}
  </div>
);

export const VISUALS: Record<BuiltInVisual, () => JSX.Element> = {
  analytics: AnalyticsVisual,
  dashboard: DashboardVisual,
  collaboration: CollaborationVisual,
  automation: AutomationVisual,
  integration: IntegrationVisual,
  security: SecurityVisual
};
