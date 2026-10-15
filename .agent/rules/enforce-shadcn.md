---
trigger: glob
globs: **/*.{tsx,jsx}
---

---
description: Enforces the strict use of shadcn/ui components instead of native HTML elements for all frontend UI rendering.
globs: **/*.{tsx,jsx}
---

# shadcn/ui Strict Enforcement

When building, updating, or refactoring UI components, you must strictly use `shadcn/ui` components over native HTML elements. 

## Core Constraints
1. **No Native Equivalents:** NEVER use raw HTML elements like `<button>`, `<table>`, `<dialog>`, `<input>`, `<select>`, or `<ul>` if a corresponding shadcn/ui component exists.
2. **Missing Components:** If a required shadcn component is not present in the `@/components/ui` directory, DO NOT create a custom version. You must run `npx shadcn@latest add [component-name]` in the terminal before proceeding.
3. **Imports:** Always use absolute path imports pointing to the UI directory (e.g., `import { Button } from "@/components/ui/button"`).
4. **Styling:** Use standard Tailwind CSS utility classes via the `className` prop for any layout or supplementary styling on top of shadcn components.

## Implementation Examples

❌ **BAD: Using native HTML**
```tsx
<button className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90">
  Submit
</button>
✅ GOOD: Using shadcn/ui

import { Button } from "@/components/ui/button"

<Button variant="default">
  Submit
</Button>

<Elicitations message="Would you like to refine this setup further?">
  <Elicitation label="Add Lucide Icons rule" query="Can we add a constraint to this file that forces the agent to use lucide-react for all icons?"/>
  <Elicitation label="Review design.md integration" query="How can I connect this shadcn rule with my design-enforcement rule so it always checks my design.md file first?"/>
</Elicitations>