---
trigger: glob
globs: **/*.tsx, **/*.jsx
---

```markdown
---
description: Enforce clean Tailwind CSS practices using cn() for dynamic classes, cva for variants, and logical class sorting.
globs: "**/*.tsx", "**/*.jsx"
alwaysApply: false
---

# Tailwind CSS Standards

Keep JSX clean, prevent class name conflicts, and maintain scalable UI components.

## Rules
1. **Dynamic Class Merging**: Always use a utility function like `cn()` (which wraps `clsx` and `tailwind-merge`) when applying conditional Tailwind classes or accepting `className` as a prop. This prevents specificity conflicts.
2. **Component Variants**: For components with multiple visual states (e.g., Buttons, Badges, Alerts), use `class-variance-authority` (`cva`) instead of inline ternary operators.
3. **Class Sorting Strategy**: Group Tailwind classes logically: Layout (flex, grid) -> Spacing (p, m) -> Sizing (w, h) -> Typography (text, font) -> Colors (bg, text, border) -> Interactions (hover, focus).

## Examples

### Before (Messy and Conflict-Prone)
```tsx
export default function Button({ isActive, isLarge, className, children }: any) {
  return (
    <button 
      className={`flex items-center justify-center rounded-md font-bold transition-colors ${
        isActive ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-800'
      } ${isLarge ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm'} ${className}`}
    >
      {children}
    </button>
  );
}
After (Clean and Scalable)

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils'; // Assuming cn uses clsx + tailwind-merge

const buttonVariants = cva(
  // Base styles (Layout -> Spacing -> Typography -> Interactions)
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export default function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button 
      className={cn(buttonVariants({ variant, size, className }))} 
      {...props} 
    />
  );
}