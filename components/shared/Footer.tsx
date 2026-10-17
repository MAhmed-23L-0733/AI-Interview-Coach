import Link from "next/link";
import { AudioWaveform, Share2, Code2, MessageSquare } from "lucide-react";
import { FOOTER_GROUPS } from "./footerData";

export function Footer(): React.JSX.Element {
  return (
    <footer className="w-full bg-[#051424] border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white">
                <AudioWaveform className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white">InterviewAI</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Voice-powered technical interview preparation for modern software engineers. Practice realistic technical screens with an AI coach that listens and provides actionable feedback.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Share2, label: "Share" },
                { icon: Code2, label: "Code" },
                { icon: MessageSquare, label: "Community" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-[#111827] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1E293B] transition-colors border border-[#1F2937]"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1F2937] gap-4 text-xs text-slate-400">
          <div>© 2025 InterviewAI Inc. Master the technical screen with voice-driven diagnostics.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
