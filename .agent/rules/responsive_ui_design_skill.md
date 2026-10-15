---
trigger: glob
description: Enforces mobile-first responsive UI development, including conditional component visibility, dedicated mobile vs. desktop components, adaptive navigation, and touch ergonomics. Apply whenever creating, refactoring, or styling UI components, pages, or layouts.
globs: **/*.tsx, **/*.jsx, **/*.vue, **/*.svelte, **/*.astro, **/*.html, **/*.css, **/*.scss
---

# Responsive UI Design Skill

Whenever you build, modify, or style user interfaces, you must ensure the experience is purpose-built for both mobile (`< 768px`), tablet (`768px - 1024px`), and desktop (`> 1024px`) viewports. Never treat mobile responsiveness as a simple CSS squish—adapt the component architecture to fit the device context.

---

## 1. Viewport Auditing & Strategy Selection

Before writing UI code, classify every layout section and component into one of three responsive strategies:

1. **Fluid Reflow (Simple Components):** Use flexible grids, wrapping flexboxes, and fluid spacing for content that naturally stacks (e.g., metric cards, form fields, hero sections).
2. **Progressive Disclosure / Show & Hide (Secondary Elements):** Hide non-essential visual clutter, secondary metadata, or desktop-only shortcuts on smaller screens while keeping primary actions accessible.
3. **Viewport-Specific Custom Components (Complex UI):** Build separate, purpose-built mobile and desktop implementations when a component's interaction model fundamentally changes across screen sizes.

---

## 2. When to Build Custom Mobile vs. Desktop Components

Do not force complex desktop patterns onto small screens. Swap the component implementation based on the mapping below:

| UI Pattern | Desktop Implementation (`>= 768px`) | Mobile Implementation (`< 768px`) |
| :--- | :--- | :--- |
| **Data Display** | Multi-column `DataTable` with sorting headers and inline actions | Stacked `CardList` showing key-value pairs and an action menu |
| **Primary Navigation** | Persistent left sidebar or horizontal top navbar | Bottom navigation bar (3-5 top-level items) or slide-out Drawer |
| **Filters & Facets** | Persistent left filter panel or inline multi-dropdown bar | Single "Filters (N)" trigger button that opens a Bottom Sheet |
| **Overlays & Forms** | Centered `Modal` or `Popover` anchored to trigger | Full-width `BottomSheet` or full-screen slide-over modal |
| **Action Toolbars** | Row of labeled icon buttons | Primary CTA button + overflow meatball (`...`) menu |
| **Multi-Step Views** | Split-pane Master-Detail view (list on left, detail on right) | Sequential view navigation (list view swaps to full-screen detail view) |

---

## 3. Implementation Patterns

### Pattern A: Conditional Visibility (CSS Show/Hide)
Use CSS utility classes (such as Tailwind's `hidden`, `md:block`, `md:flex`) when the markup is lightweight and SEO or instant viewport resizing is desired.

```tsx
export function ActionHeader({ onCreate, onExport, onFilter }: ActionHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 p-4 md:px-6">
      <h1 className="text-lg font-semibold md:text-2xl truncate">Orders</h1>

      {/* Desktop Controls: Full button group */}
      <div className="hidden md:flex items-center gap-3">
        <button onClick={onFilter} className="btn-secondary">Filter</button>
        <button onClick={onExport} className="btn-secondary">Export CSV</button>
        <button onClick={onCreate} className="btn-primary">New Order</button>
      </div>

      {/* Mobile Controls: Compact primary CTA + overflow trigger */}
      <div className="flex md:hidden items-center gap-2">
        <button onClick={onCreate} className="btn-primary px-3 py-2 text-sm">
          + New
        </button>
        <MobileActionSheet onFilter={onFilter} onExport={onExport} />
      </div>
    </header>
  );
}
```

> **CRITICAL RULE FOR CSS SHOW/HIDE:** Never render duplicate `id` attributes or duplicate active `<form>` inputs in the DOM simultaneously if both mobile and desktop trees are mounted.

### Pattern B: Dynamic Component Swapping (`useMediaQuery`)
When desktop and mobile versions are heavy, attach event listeners, or contain form inputs with identical `id`/`name` attributes, conditionally mount only the active component using a media query hook.

```tsx
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// Usage in an adaptive data view:
export function OrdersView({ orders }: { orders: Order[] }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return isDesktop ? (
    <DesktopOrdersTable orders={orders} />
  ) : (
    <MobileOrdersCardList orders={orders} />
  );
}
```

### Pattern C: Adaptive Data Table to Mobile Card List
Whenever displaying tabular data with more than 3 columns, avoid horizontal scrollbars as the primary mobile experience. Instead, render a stacked card layout on mobile:

```tsx
export function ResponsiveOrdersList({ orders }: { orders: Order[] }) {
  return (
    <div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">#{order.id}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                <td className="px-4 py-3 text-gray-500">{order.date}</td>
                <td className="px-4 py-3 text-right font-semibold">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">#{order.id}</span>
              <StatusBadge status={order.status} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{order.customer}</span>
              <span className="font-bold">{order.amount}</span>
            </div>
            <div className="text-xs text-gray-400">{order.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 4. Layout, Fluid Sizing & Touch Ergonomics Rules

1. **Mobile-First Breakpoints:** Write base styles for mobile (`320px - 639px`) first, then layer larger breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
2. **Eliminate Fixed Widths:** Never use rigid pixel widths (e.g., `w-[500px]`) without a responsive cap (`w-full max-w-[500px]`).
3. **Prevent Text & Flex Overflow:** Always add `min-w-0` to flex/grid children that contain long strings, paired with `truncate` or `break-words`.
4. **Use Dynamic Viewport Heights:** Use `min-h-dvh` or `h-dvh` instead of `100vh` so mobile browser address bars do not clip bottom controls.
5. **Minimum Touch Target Size:** Every interactive element on mobile (buttons, icon triggers, close buttons, pagination links) must have a minimum hit area of `44px x 44px` (`min-h-[44px] min-w-[44px]`).
6. **Prevent iOS Input Auto-Zoom:** All `<input>`, `<select>`, and `<textarea>` elements on mobile must use a minimum font size of `16px` (`text-base md:text-sm`).
7. **No Hover-Only Functionality:** Never hide critical actions behind `:hover` states (`group-hover:opacity-100`) without making them visible by default or accessible via tap on mobile (`opacity-100 md:opacity-0 md:group-hover:opacity-100`).
8. **Safe Area Insets:** Add bottom padding for fixed mobile bottom bars or sheets (`pb-[env(safe-area-inset-bottom)]`).

---

## 5. Pre-Completion Verification Checklist

Before completing any UI task, verify the following:
- [ ] Does the layout render without unintentional horizontal scrolling at `320px` and `375px` widths?
- [ ] Are complex desktop components (sidebars, wide tables, multi-button toolbars) swapped with mobile-appropriate equivalents (drawers, cards, bottom sheets)?
- [ ] Are secondary/decorative desktop elements cleanly hidden on small screens so primary content stays above the fold?
- [ ] Are there zero duplicate `id` attributes when using CSS visibility toggles?
- [ ] Do all mobile interactive controls meet the `44px x 44px` touch target requirement and `16px` input font minimum?