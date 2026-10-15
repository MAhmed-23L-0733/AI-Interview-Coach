---
trigger: glob
globs: app/**/*.tsx, components/**/*.tsx
---

# UX & Interface Design Best Practices

Core user experience (UX) and interface design constraints for AI-assisted frontend generation. Enforces high-converting, accessible, and cognitively low-load SaaS interfaces.

## 1. Visual Hierarchy & Layout Structure
*   **F-Pattern Scannability:** Position the most critical elements (e.g., primary KPIs, high-severity moderation queues) at the top-left of the viewport. Shift secondary navigation and filters to the right or below the fold.
*   **Whitespace over Borders:** Group related components (e.g., a comment and its AI severity score) using generous negative space (`gap-x`, `p-x` in Tailwind) rather than relying on harsh divider lines or nested border boxes.
*   **Progressive Disclosure:** Hide deep analytical metadata, raw JSON logs, or secondary actions (like reporting edge cases) behind tooltips, accordions, or explicit "View Details" interactions to prevent dashboard cognitive overload.

## 2. Component-Level Interaction
*   **Actionable Empty States (Zero-Data):** Never render a blank white screen or a raw "No data" string. All empty views (e.g., an empty review queue) must display a neutral placeholder illustration/icon, a concise explanation of why it is empty, and a clear Call-to-Action (CTA).
*   **Skeleton Loaders over Spinners:** For initial dashboard data fetches, use predictive layout skeleton components (`animate-pulse`) that mimic the shape of the incoming data cards or tables rather than generic centered loading spinners.
*   **Contextual Tooltips:** Implement hover tooltips for any icon-only buttons, truncated text, or complex AI confidence scores. Tooltips must have distinct background shadows to contrast against the canvas.

## 3. Data Tables & Ledgers
*   **Sticky Context:** Implement sticky CSS positioning for table headers (`sticky top-0`) so column context is never lost during vertical scrolling through long lists of user comments or audit logs.
*   **Numeric Alignment:** Right-align all numerical data (e.g., confidence percentages, timestamps, user counts) to allow decimals and digits to line up vertically for rapid scanning. Left-align descriptive text strings (e.g., the comment text itself).
*   **Click Target Expansion:** Ensure interactive rows or table actions have a minimum hit area of `44x44px` for accessibility, utilizing padding on anchor tags or buttons rather than just styling the text.

## 4. Semantic Color & Feedback Systems
*   **Color Token Isolation:** Keep standard interface elements (navigation links, layout borders, secondary buttons) neutral (slate/gray). Strictly reserve pure primary colors (Red, Green, Yellow) for active status indicators, destructive actions (Delete/Block), or system alerts.
*   **Granular Feedback States:** Every user action that mutates data (e.g., hiding a comment) must immediately trigger an optimistic UI update, followed by a non-blocking toast notification confirming success or explaining an error.
*   **Contrast Inversion Protection:** If deploying dark mode, avoid `#000000` pitch black. Use deep, rich grays (e.g., Tailwind `slate-900` or `zinc-900`) for backgrounds to soften the contrast and prevent eye strain when reading dense text blocks, ensuring text maintains a minimum `4.5:1` contrast ratio.

## 5. Decision-Driven Architecture
*   **Role-Based Rendering:** Tie the layout state directly to the user's role or plan tier. Standard users should see a streamlined interface with core metrics, while Premium users or Admins receive granular, filterable data tables on the same route.
*   **Action-Oriented Metrics:** Only render dashboard metrics that drive an immediate user decision (e.g., "Pending Reviews", "Action Failure Rate"). Exclude purely vanity metrics that do not influence the moderation workflow.