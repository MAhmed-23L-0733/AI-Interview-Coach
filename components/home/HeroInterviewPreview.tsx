import { Clock } from "lucide-react";
import { HeroAudioTranscript } from "@/components/home/HeroAudioTranscript";
import { HeroCodeEditor } from "@/components/home/HeroCodeEditor";

export function HeroInterviewPreview(): React.JSX.Element {
  return (
    <div className="relative mx-auto max-w-5xl rounded-2xl bg-[#0D1C2D]/80 border border-[#1F2937] shadow-2xl overflow-hidden p-2 md:p-3 backdrop-blur-xl" id="demo">
      <div className="rounded-xl bg-[#051424] border border-[#1F2937] overflow-hidden">
        {/* Window Status Bar Header */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-[#111827] border-b border-[#1F2937] gap-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <div className="h-4 w-px bg-slate-700 mx-1" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">Technical Interview</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[11px] font-semibold border border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                Live
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>18:42</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#1F2937] text-white text-[11px] font-bold border border-slate-700 uppercase tracking-wider">
              Data Structures
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#162232] border border-[#1F2937] text-emerald-400 text-[11px] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
              <span>AI coach online</span>
            </div>
          </div>
        </div>

        {/* Workspace Split: Left (Audio & Transcript) | Right (Editor & Tests) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          <HeroAudioTranscript />
          <HeroCodeEditor />
        </div>
      </div>
    </div>
  );
}
