import * as React from "react";
import Link from "next/link";
import { SignupShowcase } from "@/components/signup/SignupShowcase";
import { SignupForm } from "@/components/signup/SignupForm";
import { AudioLines } from "lucide-react";

/**
 * Server component providing the split-screen layout for the signup route.
 * Left: Branded Showcase Panel (desktop only).
 * Right: Authentication Form Panel (desktop & mobile).
 */
export function SignupPageContent(): React.JSX.Element {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] w-full bg-[#0B0F17]">
      {/* Left Showcase Brand Panel (Hidden on screens < 1024px) */}
      <SignupShowcase />

      {/* Right Auth Form Panel */}
      <section className="flex flex-1 flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16">
        {/* Compact Top Brand Mark (Visible only on screens < 1024px, links to homepage) */}
        <div className="flex items-center justify-center pt-4 pb-2 lg:hidden">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.35)]">
              <AudioLines className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>
            <span className="text-base font-bold tracking-tight text-white">
              AI Interviewing Coach
            </span>
          </Link>
        </div>

        {/* Centered Form Container */}
        <div className="mx-auto my-auto w-full max-w-[400px] py-8 sm:py-12">
          {/* Header Typography Hierarchy */}
          <div className="mb-8 space-y-1.5">
            <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
              Create your account
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Start practicing today
            </h2>
            <p className="text-sm text-slate-400">
              Build confidence through focused, realistic practice.
            </p>
          </div>

          <SignupForm />
        </div>

        {/* Bottom Legal Notice */}
        <p className="py-4 text-center text-xs text-slate-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </section>
    </div>
  );
}
