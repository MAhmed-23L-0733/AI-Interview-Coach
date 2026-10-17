import { Volume2, Mic, Pause } from "lucide-react";

export function HeroAudioTranscript(): React.JSX.Element {
  return (
    <div className="lg:col-span-5 p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-[#1F2937] flex flex-col justify-between bg-[#0B0F17]/70">
      {/* Voice Activity Module */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#111827] border border-[#1F2937]">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#1C2B3C] border border-blue-500/40 shrink-0">
          <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-radar-pulse" />
          <Volume2 className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white truncate">Interviewer is speaking</div>
          <div className="text-xs text-slate-400 truncate">Exploring time complexity tradeoff</div>
        </div>
        <div className="flex items-center gap-1 h-8 shrink-0">
          <span className="w-1 bg-blue-500 rounded-full wave-anim-1" />
          <span className="w-1 bg-blue-500 rounded-full wave-anim-2" />
          <span className="w-1 bg-blue-500 rounded-full wave-anim-3" />
          <span className="w-1 bg-blue-500 rounded-full wave-anim-4" />
          <span className="w-1 bg-blue-500 rounded-full wave-anim-5" />
        </div>
      </div>

      {/* Transcript Stream */}
      <div className="space-y-4 my-6">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-500/30">
            AI
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-white">Interviewer</span>
              <span className="text-[11px] text-slate-500 font-mono">18:10</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-[#162232] p-3 rounded-lg rounded-tl-none border border-[#1F2937]">
              Let&apos;s work through a data structures problem. Given an array of integers, can you describe how you&apos;d find the first duplicate value in O(N) time?
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#273647] text-white flex items-center justify-center font-bold text-xs shrink-0 border border-[#3B82F6]/40">
            AM
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-white">You</span>
              <span className="text-[11px] text-slate-500 font-mono">18:24</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed bg-blue-500/10 p-3 rounded-lg rounded-tl-none border border-blue-500/30">
              I&apos;d use a hash set to track the elements we&apos;ve encountered so far. As I iterate through the array, I can do an O(1) membership check.
            </p>
          </div>
        </div>
      </div>

      {/* Voice Status Bottom Dock */}
      <div className="pt-3 border-t border-[#1F2937] flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Mic className="w-4 h-4 text-emerald-400" />
          <span>AI coach is listening...</span>
        </div>
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg bg-[#111827] hover:bg-[#1C2B3C] text-slate-200 text-xs font-medium border border-[#1F2937] flex items-center gap-1.5 transition-colors"
        >
          <Pause className="w-3.5 h-3.5" />
          <span>Hold Voice</span>
        </button>
      </div>
    </div>
  );
}
