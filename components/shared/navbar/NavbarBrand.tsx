import Link from "next/link";
import { AudioWaveform } from "lucide-react";

export function NavbarBrand(): React.JSX.Element {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 active:scale-[0.98] transition-transform"
      aria-label="InterviewAI Homepage"
    >
      {/* Glowing Brand Icon */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-0.5 shadow-md shadow-blue-500/25 ring-1 ring-white/20 transition-all duration-300 group-hover:shadow-blue-500/40 group-hover:scale-105">
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0B0F17]/90 text-blue-400 transition-colors group-hover:text-white">
          <AudioWaveform className="h-5 w-5 stroke-[2.2]" />
        </div>
      </div>

      {/* Brand Title */}
      <span className="text-lg sm:text-xl font-bold tracking-tight text-white transition-colors group-hover:text-blue-100">
        Interview<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">AI</span>
      </span>
    </Link>
  );
}
