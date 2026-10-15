"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLoginForm } from "@/hooks/useLoginForm";
import { AlertCircle, LogIn } from "lucide-react";

export function LoginForm(): React.JSX.Element {
  const {
    email,
    setEmail,
    password,
    setPassword,
    fieldErrors,
    formError,
    isLoading,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Email address
        </label>
        <Input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          autoComplete="email"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Password
        </label>
        <Input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          autoComplete="current-password"
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        <LogIn className="h-4 w-4" />
        <span>Sign In</span>
      </Button>
    </form>
  );
}
