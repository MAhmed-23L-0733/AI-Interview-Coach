'use client';

import React from 'react';
import { Mic, Terminal, CheckCircle2, Volume2 } from 'lucide-react';

export function StepSessionVisual(): React.JSX.Element {
  return (
    <div className="relative rounded-2xl border border-cyan-500/30 bg-[#071322]/95 p-5 backdrop-blur-md shadow-2xl shadow-cyan-500/10 overflow-hidden font-sans">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono text-slate-300 font-medium">LIVE INTERVIEW SESSION</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
          <Mic className="w-3 h-3 animate-pulse text-cyan-300" />
          <span>Sub-second Audio</span>
        </div>
      </div>

      <div className="rounded-xl bg-slate-900/90 border border-slate-800/80 p-3 mb-3">
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
            <Volume2 className="w-3.5 h-3.5" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">AI Staff Coach</span>
              <span className="text-[10px] text-slate-400 font-mono">00:14:22</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              &ldquo;Notice how node replication can cause race conditions during failover. How would you handle split-brain under high write throughput?&rdquo;
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-[#030B17] border border-slate-800 p-3 font-mono text-xs text-slate-300">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-850 text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>consensus_lease.ts</span>
          </div>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            14/14 tests pass
          </span>
        </div>
        <pre className="text-[11px] leading-snug overflow-x-auto text-slate-200">
          <code>
            <span className="text-purple-400">async function</span>{' '}
            <span className="text-blue-300">acquireLease</span>(nodeId:{' '}
            <span className="text-yellow-300">string</span>) &#123;{'\n'}
            {'  '}<span className="text-purple-400">const</span> ok ={' '}
            <span className="text-purple-400">await</span> raftEngine.propose({'\n'}
            {'    '}type: <span className="text-emerald-300">&apos;ACQUIRE_LEASE&apos;</span>, term: currentTerm{'\n'}
            {'  '});{'\n'}
            {'  '}<span className="text-purple-400">return</span> ok.status ==={' '}
            <span className="text-emerald-300">&apos;COMMITTED&apos;</span>;{'\n'}
            &#125;
          </code>
        </pre>
      </div>
    </div>
  );
}
