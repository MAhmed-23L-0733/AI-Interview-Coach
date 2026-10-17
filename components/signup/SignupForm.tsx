"use client";

import * as React from "react";
import Link from "next/link";
import { useSignupForm } from "@/hooks/useSignupForm";
import { SignupInput } from "@/components/signup/SignupInput";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SignupForm(): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    name, setName, email, setEmail, password, setPassword,
    fieldErrors, formError, isLoading, handleSubmit,
  } = useSignupForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-900/60 bg-red-950/40 p-3.5 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <SignupInput
        id="name"
        label="Full name"
        placeholder="Alex Morgan"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={fieldErrors.name}
        disabled={isLoading}
      />

      <SignupInput
        id="email"
        type="email"
        label="Email address"
        placeholder="alex@example.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
        disabled={isLoading}
      />

      <SignupInput
        id="password"
        type={showPassword ? "text" : "password"}
        label="Password"
        placeholder="Enter your password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
        disabled={isLoading}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-white focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        }
      />

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] font-semibold text-white shadow-[0_4px_20px_rgba(37,99,235,0.35)] transition-all duration-200",
          "hover:bg-[#2563EB] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <span>Creating account...</span>
          </>
        ) : (
          <span>Create account &gt;</span>
        )}
      </button>

      <p className="pt-2 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-[#3B82F6] underline-offset-4 transition-colors hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
