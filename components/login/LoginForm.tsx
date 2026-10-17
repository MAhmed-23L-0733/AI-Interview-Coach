"use client";

import * as React from "react";
import Link from "next/link";
import { useLoginForm } from "@/hooks/useLoginForm";
import { LoginFormFields } from "@/components/login/LoginFormFields";
import { AlertCircle, ChevronRight, Loader2 } from "lucide-react";

/**
 * Client component implementing the login form with Zod validation,
 * error handling, password visibility toggle, remember me checkbox,
 * and NextAuth signIn integration.
 */
export function LoginForm(): React.JSX.Element {
  const {
    email, setEmail, password, setPassword,
    rememberMe, setRememberMe, showPassword, setShowPassword,
    fieldErrors, formError, isLoading, handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {formError && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-950/40 p-2.5 text-xs text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* Input Fields (Email & Password with Visibility Toggle) */}
      <LoginFormFields
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        fieldErrors={fieldErrors}
        isLoading={isLoading}
      />

      {/* Options Row: Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-xs">
        <label className="flex min-h-[44px] cursor-pointer items-center gap-2 select-none text-slate-400 hover:text-slate-300">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-[#1F2937] bg-[#111827] text-[#3B82F6] accent-[#3B82F6]"
          />
          <span>Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="flex min-h-[44px] items-center text-[#3B82F6] transition-colors hover:text-blue-400 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Primary Radiant CTA Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex min-h-[44px] h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#3B82F6] text-sm font-semibold text-white shadow-[0_4px_20px_rgba(37,99,235,0.35)] transition-all duration-200 hover:bg-[#2563EB] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Log in</span>
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </button>

      {/* Switch Action */}
      <div className="pt-2 text-center text-xs text-slate-400">
        New to InterviewAI?{" "}
        <Link
          href="/signup"
          className="font-medium text-[#3B82F6] transition-colors hover:text-blue-400 hover:underline"
        >
          Create an account
        </Link>
      </div>
    </form>
  );
}
