"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSignupForm } from "@/hooks/useSignupForm";
import { AlertCircle, UserPlus } from "lucide-react";

export function SignupForm(): React.JSX.Element {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    fieldErrors,
    formError,
    isLoading,
    handleSubmit,
  } = useSignupForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Full Name
        </label>
        <Input
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={fieldErrors.name}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Email address
        </label>
        <Input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Password
        </label>
        <Input
          type="password"
          placeholder="Min 8 chars, 1 upper, 1 number"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Confirm Password
        </label>
        <Input
          type="password"
          placeholder="Repeat password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={fieldErrors.confirmPassword}
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        <UserPlus className="h-4 w-4" />
        <span>Create Account</span>
      </Button>
    </form>
  );
}
