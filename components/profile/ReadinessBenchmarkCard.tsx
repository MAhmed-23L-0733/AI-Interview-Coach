"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3 } from "lucide-react";
import { useProfileStore } from "@/lib/stores/useProfileStore";

interface SkillMetric {
  name: string;
  pct: number;
  label: string;
  color: string;
  barColor: string;
}

const SKILL_METRICS: SkillMetric[] = [
  { name: "Data Structures", pct: 88, label: "Strong", color: "text-blue-400", barColor: "bg-blue-400" },
  { name: "System Design & Scalability", pct: 82, label: "Strong", color: "text-blue-400", barColor: "bg-blue-500" },
  { name: "Algorithms & Optimization", pct: 76, label: "Good", color: "text-amber-400", barColor: "bg-amber-400" },
  { name: "Behavioral & Architecture Defense", pct: 90, label: "Exceptional", color: "text-emerald-400", barColor: "bg-emerald-400" },
];

export function ReadinessBenchmarkCard(): React.JSX.Element {
  const { profile } = useProfileStore();

  return (
    <div className="rounded-2xl border border-blue-500/30 bg-[#111827] p-6 shadow-[0_0_30px_rgba(59,130,246,0.08)]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 font-mono">
          Readiness Benchmark
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Interview Ready
        </span>
      </div>

      {/* Gauge Score Block */}
      <div className="flex items-center gap-5 my-4">
        <div className="relative w-24 h-24 shrink-0 rounded-full border-4 border-[#1F2937] flex flex-col items-center justify-center bg-[#0B0F17]">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent -rotate-45" />
          <span className="text-2xl font-extrabold text-white tracking-tight font-mono">
            {profile.readinessScore || 84}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">/ 100</span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white">{profile.benchmarkTier || "Tier 1 Calibrated"}</h3>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
            Alex ranks in the <span className="text-emerald-400 font-medium">Top 16%</span> of Senior candidates practicing this week.
          </p>
          <button type="button" className="mt-1 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium group">
            <span>View full rubric breakdown</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Skill Breakdown Bars */}
      <div className="space-y-3.5 mt-5 pt-4 border-t border-[#1F2937]">
        {SKILL_METRICS.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-300 font-medium">{skill.name}</span>
              <div className="flex items-center gap-2">
                <span className={`font-mono font-semibold ${skill.color}`}>{skill.pct}%</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#1E293B] text-slate-400 font-mono">
                  {skill.label}
                </span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-[#1F2937] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full ${skill.barColor} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full mt-6 py-2.5 bg-[#1E293B] hover:bg-[#334155] text-slate-200 font-medium rounded-xl text-xs border border-[#334155] transition-colors flex items-center justify-center gap-2"
      >
        <BarChart3 className="w-4 h-4 text-blue-400" />
        <span>Calibrate benchmark rubric</span>
      </button>
    </div>
  );
}
