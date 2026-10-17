import Link from "next/link";
import { SignupShowcase } from "@/components/signup/SignupShowcase";
import { SignupForm } from "@/components/signup/SignupForm";
import { AudioWaveform } from "lucide-react";

export function SignupPageContent(): React.JSX.Element {
  return (
    <div className="fixed inset-0 z-50 flex min-h-dvh w-full overflow-y-auto bg-[#0B0F17] text-white">
      <div className="grid min-h-full w-full grid-cols-1 lg:grid-cols-2">
        {/* Left: Showcase Brand Panel */}
        <SignupShowcase />

        {/* Right: Signup Form Panel */}
        <section className="flex flex-1 flex-col justify-between p-6 sm:p-10 lg:p-14">
          {/* Mobile Top Brand Header (Links to homepage) */}
          <div className="flex items-center justify-center lg:hidden">
            <Link
              href="/"
              className="flex items-center gap-3 transition-opacity hover:opacity-90"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3B82F6] text-white shadow-[0_0_15px_rgba(59,130,246,0.35)]">
                <AudioWaveform className="h-5 w-5" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                AI Interviewing Coach
              </span>
            </Link>
          </div>

          {/* Centered Form Wrapper */}
          <div className="mx-auto my-auto w-full max-w-md py-8">
            <header className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                Create your account
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Start practicing today
              </h2>
              <p className="mt-2 text-sm text-[#94A3B8]">
                Build confidence through focused, realistic practice.
              </p>
            </header>

            <SignupForm />
          </div>

          {/* Legal Footer Notice */}
          <footer className="pt-6 text-center">
            <p className="text-xs text-slate-500">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
}
