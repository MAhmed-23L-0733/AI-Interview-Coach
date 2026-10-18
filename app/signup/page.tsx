import type { Metadata } from "next";
import { SignupPageContent } from "@/components/signup/SignupPageContent";

export const metadata: Metadata = {
  title: "Create Account | AI Interviewing Coach",
  description:
    "Sign up for AI Interviewing Coach to build confidence through focused, voice-powered interview practice.",
};

/**
 * Thin Next.js Server Page Wrapper for the Signup route.
 */
export default function SignupPage(): React.JSX.Element {
  return (
    <div className="flex min-h-dvh flex-col w-full bg-[#0B0F17]">
      <SignupPageContent />
    </div>
  );
}
