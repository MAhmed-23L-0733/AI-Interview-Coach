---
trigger: glob
globs: app/**/*.tsx, components/**/*.tsx
---

# Framer Motion & Engaging UI Animation Standards

Make every interface feel alive, tactile, and premium through purposeful motion. Every transition and interaction should provide immediate spatial clarity and physical feedback without sacrificing Next.js performance, server-side rendering, or accessibility.

---

## 1. Core Principles

1. **Purposeful, Not Distracting**: Motion must orient the user, reinforce hierarchy, or confirm actions. Avoid decorative animations that delay user interaction or cause cognitive fatigue.
2. **Snappy & Physics-Driven**: Use natural spring physics or swift easing curves (`0.15s` to `0.35s`). Never force users to wait for an animation to complete before they can click or interact.
3. **Hardware Acceleration**: Strictly animate GPU-accelerated properties (`transform`: `x`, `y`, `scale`, `rotate`, and `opacity`). Never animate layout-triggering properties like `height`, `width`, `margin`, or `top` directly without Framer Motion's `layout` prop.

---

## 2. Where Animations Are Required

Apply Framer Motion animations across these key interface touchpoints:

| Category | UI Element | Recommended Motion Behavior |
| :--- | :--- | :--- |
| **Hero & Section Reveals** | Landing page sections, headings, showcase grids | Subtle fade-in with vertical slide (`y: 16 -> 0`, `opacity: 0 -> 1`) using `viewport={{ once: true }}`. |
| **Grid & List Staggers** | Feature cards, topic pills, pricing tiers, metrics | Parent container orchestrates `staggerChildren: 0.06` to prevent abrupt, jarring mass pop-ins. |
| **Tactile Micro-Interactions** | Buttons, badge toggles, action icons | `whileHover={{ scale: 1.02, y: -1 }}` and `whileTap={{ scale: 0.97 }}` for instant physical responsiveness. |
| **Conditional UI & Overlays** | Modals, mobile drawers, dropdowns, toasts, error alerts | `<AnimatePresence>` for graceful mounting and exit transitions (fade + slight scale or directional slide). |
| **Active Indicators & Tabs** | Navigation pills, segmented controls, filter bars | Shared `layoutId="activeIndicator"` with spring transition for fluid, morphing highlight pills. |
| **Dynamic Cards & Accordions** | Expandable FAQ items, collapsible filter panels | `layout` prop on container elements with `overflow-hidden` for seamless expanding/collapsing. |

---

## 3. Strict Next.js & Architecture Rules

1. **Protect Server/Client Boundaries**:
   - Framer Motion requires `"use client"`.
   - **NEVER** mark an entire Page (`PageContent.tsx`) or data-fetching Server Component with `"use client"` just to add motion.
   - Encapsulate motion inside small, dedicated client wrapper components (e.g., `<FadeIn>`, `<MotionCard>`) or keep animation logic isolated to leaf client components.
2. **Preserve Modularity (< 100 lines)**:
   - Separate complex animation variant objects into dedicated files or declare them outside component render functions to avoid unnecessary re-creation on renders.
3. **Respect Reduced Motion**:
   - Always honor `useReducedMotion()`. If reduced motion is requested, fall back to instant appearance or pure opacity fades.
4. **Strict TypeScript Typing**:
   - Explicitly type animation variant maps using `type Variants` from `framer-motion` (or `motion/react`).

---

## 4. Reusable Motion Presets

### Standard Spring Physics
```ts
export const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 400,
  damping: 30,
} as const;

export const SMOOTH_EASE = {
  duration: 0.25,
  ease: [0.16, 1, 0.3, 1],
} as const;
```

### Staggered List Variants
```ts
import type { Variants } from "framer-motion";

export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const FADE_UP_ITEM: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
```

---

## 5. Implementation Patterns

### Pattern A: Leaf Client Wrapper for Server Components
Keep your parent layout or page on the server, wrapping children in an animated client wrapper:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Pattern B: Tactile Interactive Button
```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import * as React from "react";

interface MotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MotionButton({ children, className, ...props }: MotionButtonProps): React.JSX.Element {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className={cn(
        "rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/20",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

### Pattern C: Graceful Conditional Exit with AnimatePresence
```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import * as React from "react";

interface ErrorBannerProps {
  error: string | null;
}

export function ErrorBanner({ error }: ErrorBannerProps): React.JSX.Element {
  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          key="error-message"
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-950/40 p-2.5 text-xs text-red-400"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Pattern D: Sliding Active Tab Indicator (`layoutId`)
```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import * as React from "react";

interface TabItem {
  id: string;
  label: string;
}

export function AnimatedTabs({
  tabs,
  activeId,
  onChange,
}: {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}): React.JSX.Element {
  return (
    <div className="flex items-center gap-1 rounded-2xl border border-slate-800 bg-slate-900/60 p-1 backdrop-blur-md">
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-4 py-1.5 text-sm font-medium transition-colors duration-200",
              isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 rounded-xl bg-blue-600/20 border border-blue-500/40 shadow-xs shadow-blue-500/20"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
```

---

## 6. Anti-Patterns to Avoid

- ❌ **Sluggish Staggers**: Delaying children by > 0.15s each, making users wait 2 seconds for a grid to render.
- ❌ **Client Leaks**: Turning an entire page into a Client Component because a single card or title needs motion.
- ❌ **Non-Hardware Properties**: Animating `height: "auto"` to `height: "200px"` or `width` directly instead of using `layout` or `scaleY`/`scaleX`.
- ❌ **Unconstrained Infinite Loops**: Continuously animating large DOM nodes or heavy blur elements, causing thermal throttling on mobile devices.
- ❌ **Missing `exit` Animations**: Unmounting conditionally rendered elements abruptly inside an `AnimatePresence` wrapper without specifying `exit` props.
