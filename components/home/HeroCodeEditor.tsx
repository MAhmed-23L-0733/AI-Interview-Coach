import { Code2, Play, CheckCircle2 } from "lucide-react";

export function HeroCodeEditor(): React.JSX.Element {
  return (
    <div className="lg:col-span-7 flex flex-col justify-between bg-[#070D16]">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D1826] border-b border-[#1F2937]">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-blue-400" />
          <span className="font-mono text-xs font-semibold text-slate-200">solution.py</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-slate-400">Python 3.11</span>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-[#051424] font-semibold text-xs transition-all shadow-sm"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Run code</span>
          </button>
        </div>
      </div>

      {/* Code Text Area */}
      <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-slate-200">
        <div className="flex">
          <div className="text-slate-600 pr-4 select-none text-right font-mono space-y-1">
            {Array.from({ length: 11 }, (_, i) => (
              <div key={i + 1}>{i + 1}</div>
            ))}
          </div>
          <div className="flex-1 font-mono space-y-1">
            <p>
              <span className="text-amber-400">def </span>
              <span className="text-blue-400 font-semibold">first_duplicate</span>
              (nums: list[int]) -&gt; int:
            </p>
            <p className="text-slate-500 italic">    # O(N) Time Complexity, O(N) Space</p>
            <p>    seen = <span className="text-emerald-400">set</span>()</p>
            <p className="h-4" />
            <p>    <span className="text-amber-400">for </span>num <span className="text-amber-400">in </span>nums:</p>
            <p>        <span className="text-amber-400">if </span>num <span className="text-amber-400">in </span>seen:</p>
            <p>            <span className="text-amber-400">return </span>num</p>
            <p>        seen.add(num)</p>
            <p className="h-4" />
            <p>    <span className="text-amber-400">return </span>-1</p>
          </div>
        </div>
      </div>

      {/* Test Execution Output */}
      <div className="mt-auto border-t border-[#1F2937] bg-[#0D1826] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
            Test Suite Output
          </span>
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4 fill-emerald-500/20" />
            <span>3 / 3 test cases passed (14ms)</span>
          </div>
        </div>
        <div className="p-2.5 rounded bg-[#070D16] border border-[#1F2937] font-mono text-[11px] text-slate-300 flex items-center justify-between">
          <code>assert first_duplicate([2, 5, 1, 2, 3, 5]) == 2</code>
          <span className="text-emerald-400 font-bold">PASS</span>
        </div>
      </div>
    </div>
  );
}
