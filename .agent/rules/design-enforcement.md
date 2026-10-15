---
trigger: glob
globs: **/*.{tsx,jsx,ts,js,css}
---

# Mandatory UI Pre-Flight Check

**Trigger:** Any prompt or task that involves creating, modifying, styling, or reviewing frontend UI components, layouts, CSS, or visual assets.

**Required Action:**
Before writing a single line of frontend code, you MUST silently read and apply the constraints from the following context files:
1. `design.md` (Core ModeroIQ brand colors, Tailwind v4 variables, and logo constraints)
2. `ux-best-practices.md` (Structural hierarchy, empty states, and table layouts)
3. `stitch-ui.md` (Base component library rules)

**Strict Execution Rules:**
*   **Zero Color Hallucinations:** Never use arbitrary hex codes or default Tailwind color approximations (e.g., `red-900` or `yellow-200`) for branded elements. You must strictly use the custom Tailwind v4 variables: `brand-cabernet` and `brand-vanilla`.
*   **Logo Verification:** If the UI requires the ModeroIQ logo, you must cross-reference the exact background contrast and split-color typography rules defined in `design.md`.
*   **No Fallbacks:** If you are unsure how a brand color applies to a specific component state (like hover or active), refer back to `design.md` or ask for clarification rather than inventing a new color shade.