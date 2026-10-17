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
          className="block text-xs font-medium text-slate-300 sm:text-sm"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            ref={ref}
            className={cn(
              "h-12 w-full rounded-xl border bg-[#111827] px-4 text-base text-white placeholder-[#64748B] transition-colors duration-150 sm:text-sm",
              "border-[#1F2937] focus:border-[#3B82F6] focus:outline-none focus:ring-1 focus:ring-[#3B82F6]",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              rightElement && "pr-12",
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

SignupInput.displayName = "SignupInput";
