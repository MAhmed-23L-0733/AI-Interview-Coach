import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const inputVariants = cva(
  "flex w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-zinc-300 text-zinc-900 focus-visible:border-zinc-900 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus-visible:border-zinc-100 dark:focus-visible:ring-zinc-400",
        error:
          "border-red-500 text-zinc-900 focus-visible:border-red-600 focus-visible:ring-red-500 dark:border-red-500 dark:text-zinc-100 dark:focus-visible:ring-red-400",
      },
      inputSize: {
        default: "h-10",
        sm: "h-8 text-xs",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", variant, inputSize, error, ...props }, ref): React.JSX.Element => {
    const computedVariant = error ? "error" : variant;

    return (
      <div className="w-full space-y-1">
        <input
          type={type}
          className={cn(inputVariants({ variant: computedVariant, inputSize, className }))}
          ref={ref}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
