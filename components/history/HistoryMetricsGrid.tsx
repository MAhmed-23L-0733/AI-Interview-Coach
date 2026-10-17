"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { HistoryMetrics } from "@/lib/validations/history";

interface HistoryMetricsGridProps {
  metrics: HistoryMetrics;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function HistoryMetricsGrid({ metrics }: HistoryMetricsGridProps): React.JSX.Element {
  return (
    <motion.section
      aria-label="Practice Statistics"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 divide-y divide-[#1F2937] rounded-2xl border border-[#1F2937] bg-[#111827] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
    >
      <motion.div variants={itemVariants} className="p-6">
        <span className="text-xs font-medium text-slate-400">Total sessions</span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-mono text-3xl font-bold tracking-tight text-white">
            {metrics.totalSessions}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-400">
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span>{metrics.totalSessionsDelta}</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="p-6">
        <span className="text-xs font-medium text-slate-400">Average score</span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-mono text-3xl font-bold tracking-tight text-white">
            {metrics.averageScore}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-400">
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span>{metrics.averageScoreDelta}</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="p-6">
        <span className="text-xs font-medium text-slate-400">Practice time</span>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-mono text-3xl font-bold tracking-tight text-white">
            {metrics.practiceTimeHours}
          </span>
        </div>
        <div className="mt-2 text-xs text-slate-400">
          {metrics.practiceTimeSubtext}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="p-6">
        <span className="text-xs font-medium text-slate-400">Strongest topic</span>
        <div className="mt-2">
          <p className="truncate text-xl font-bold text-white sm:text-2xl">
            {metrics.strongestTopic}
          </p>
        </div>
        <div className="mt-2 text-xs text-slate-400">
          <span className="font-mono font-medium text-slate-300">
            {metrics.strongestTopicAverage}
          </span>{" "}
          average score
        </div>
      </motion.div>
    </motion.section>
  );
}
