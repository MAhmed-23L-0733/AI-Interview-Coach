import * as React from "react";
import { cn } from "@/lib/utils";

export interface SignupInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const SignupInput = React.forwardRef<HTMLInputElement, SignupInputProps>(
  ({ label, error, rightElement, id, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5 text-left">
        <label
          htmlFor={id}
          className="block text-xs font-medium text-slate-300"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            ref={ref}
            className={cn(
              "h-11 w-full rounded-lg border bg-[#111827] px-3.5 text-base md:text-sm text-white placeholder-[#64748B] transition-colors focus:outline-none",
              error
                ? "border-red-500/80 focus:border-red-500"
                : "border-[#1F2937] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]",
              rightElement && "pr-11",
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

SignupInput.displayName = "SignupInput";
