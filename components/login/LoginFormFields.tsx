import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoginFormFieldsProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  fieldErrors: { email?: string; password?: string };
  isLoading: boolean;
}

/**
 * Sub-component rendering the Email and Password input fields for LoginForm.
 */
export function LoginFormFields({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  fieldErrors,
  isLoading,
}: LoginFormFieldsProps): React.JSX.Element {
  return (
    <div className="space-y-4">
      {/* Email Input */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs font-medium text-slate-300">
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="alex@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className={cn(
            "h-11 w-full rounded-lg border bg-[#111827] px-3.5 text-base md:text-sm text-white placeholder-[#64748B] transition-colors focus:outline-none",
            fieldErrors.email
              ? "border-red-500/80 focus:border-red-500"
              : "border-[#1F2937] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
          )}
        />
        {fieldErrors.email && (
          <p className="text-xs text-red-400">{fieldErrors.email}</p>
        )}
      </div>

      {/* Password Input with Visibility Toggle */}
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-xs font-medium text-slate-300">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className={cn(
              "h-11 w-full rounded-lg border bg-[#111827] pl-3.5 pr-11 text-base md:text-sm text-white placeholder-[#64748B] transition-colors focus:outline-none",
              fieldErrors.password
                ? "border-red-500/80 focus:border-red-500"
                : "border-[#1F2937] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-slate-400 hover:text-white"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {fieldErrors.password && (
          <p className="text-xs text-red-400">{fieldErrors.password}</p>
        )}
      </div>
    </div>
  );
}
