'use client';

import React, { useState } from 'react';
import { Sliders, Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CONFIGURE_DOMAINS, CONFIGURE_LEVELS, CONFIGURE_COMPANIES } from './howItWorksData';

export function StepConfigureVisual(): React.JSX.Element {
  const [domain, setDomain] = useState(CONFIGURE_DOMAINS[0]);
  const [level, setLevel] = useState(CONFIGURE_LEVELS[1]);
  const [company, setCompany] = useState(CONFIGURE_COMPANIES[0]);

  return (
    <div className="relative rounded-2xl border border-blue-500/30 bg-[#0B132B]/90 p-5 backdrop-blur-md shadow-2xl shadow-blue-500/10 font-sans">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400">calibration-wizard.v2</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-3 h-3" />
          <span>Calibrated</span>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        <div>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="font-medium flex items-center gap-1.5 text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-blue-400" /> Technical Domain
            </span>
            <span className="text-[10px] text-blue-400 font-mono">1 of 14 tracks</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CONFIGURE_DOMAINS.map((item) => (
              <button key={item} type="button" onClick={() => setDomain(item)} className={`px-2.5 py-1.5 rounded-lg font-medium text-[11px] transition-all ${domain === item ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-400' : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 border border-slate-700/60'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <div className="text-slate-400 mb-2 font-medium flex items-center gap-1 text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-purple-400" /> Seniority Scope
            </div>
            <div className="flex flex-col gap-1.5">
              {CONFIGURE_LEVELS.map((item) => (
                <button key={item} type="button" onClick={() => setLevel(item)} className={`px-2 py-1 rounded-md text-left font-mono text-[11px] transition-all flex items-center justify-between ${level === item ? 'bg-purple-950/60 text-purple-300 border border-purple-500/50' : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-300'}`}>
                  <span>{item}</span>
                  {level === item && <CheckCircle2 className="w-3 h-3 text-purple-400" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-slate-400 mb-2 font-medium text-slate-300">Target Archetype</div>
            <div className="flex flex-col gap-1.5">
              {CONFIGURE_COMPANIES.map((item) => (
                <button key={item} type="button" onClick={() => setCompany(item)} className={`px-2 py-1 rounded-md text-left font-mono text-[11px] transition-all flex items-center justify-between ${company === item ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/50' : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-300'}`}>
                  <span>{item}</span>
                  {company === item && <CheckCircle2 className="w-3 h-3 text-cyan-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
