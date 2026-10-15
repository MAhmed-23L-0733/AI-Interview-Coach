---
trigger: glob
globs: **/*.{tsx,jsx,css,scss,html}
---

# Pixel-Perfect UI Implementation Rules

When given a UI mockup image or design reference, NEVER jump straight to writing code. Follow this sequence:

## 1. Visual Deconstruction (Pre-Code)
Before writing JSX/TSX, output a brief structural breakdown of the mockup:
- **Layout Grid:** Flex/Grid direction, exact column spans, container max-width, and gap sizes.
- **Spacing & Sizing:** Estimate exact Tailwind classes for padding (`p-4`, `px-6`), heights (`h-9`, `h-10`), and border radius (`rounded-lg`, `rounded-xl`).
- **Typography Hierarchy:** Map every text element to its exact size, weight, tracking, and color token (e.g., Title: `text-sm font-semibold text-foreground`, Subtitle: `text-xs text-muted-foreground`).
- **Micro-Details:** Explicitly note 1px borders, subtle shadows, dividers, status dots, badges, and icon positions.

## 2. Implementation Constraints
- **Zero Omissions:** Never use comments like `// ... rest of items` or skip subtle UI elements (chevrons, filter icons, status pills, keyboard shortcut badges). Every visible element in the crop must be rendered.
- **Token Adherence:** Use configured Tailwind theme tokens (`bg-card`, `border-border`, `text-muted-foreground`) instead of random hex guesses unless a one-off gradient is required.
- **Icon Precision:** Match icon stroke width (`strokeWidth={1.5}` or `2`) and size (`size-4` vs `size-5`) to the visual weight in the mockup.