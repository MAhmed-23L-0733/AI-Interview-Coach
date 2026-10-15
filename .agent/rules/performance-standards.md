---
trigger: glob
globs: **/*.tsx, **/*.ts
---

---
description: Enforce strict performance standards including core web vitals, bundle sizing, Next.js native optimizations, and dynamic imports.
globs: "**/*.tsx", "**/*.ts"
alwaysApply: false
---

# Performance Standards

Keep the application lightning-fast by strictly managing client bundle sizes, optimizing assets, and utilizing Next.js built-in performance tools.

## Rules
1. **Asset Optimization**: NEVER use standard HTML `<img>` tags. You MUST use Next.js `<Image />` (`next/image`) for all images to ensure automatic WebP/AVIF conversion, lazy loading, and correct sizing. Use `next/font` for all typography to prevent layout shifts (CLS).
2. **Lazy Loading Heavy Components**: Use `next/dynamic` to lazy-load heavy client-side components that are not immediately visible or critical to the initial page load (e.g., complex modals, charts, rich text editors, or heavy UI libraries).
3. **Native APIs over Heavy Libraries**: Do not introduce heavy utility libraries for tasks that modern JavaScript can handle natively. For example, use standard `Intl.DateTimeFormat` instead of `moment.js` or `date-fns` whenever possible.
4. **Minimize Client JavaScript**: Keep `"use client"` components as small and shallow as possible. If a Client Component wraps a large layout, pass Server Components into it as `children` to prevent the entire tree from becoming part of the client JavaScript bundle.

## Examples

### Before (Slow & Bloated)
```tsx
"use client"

// BAD: Imports a massive library for a simple date format
import moment from 'moment';
// BAD: Standard img tag causes layout shifts and unoptimized loading
import HeavyChart from '@/components/HeavyChart'; 

export default function UserProfile({ user }: { user: any }) {
  return (
    <div className="p-4">
      {/* BAD: Unoptimized image */}
      <img src={user.avatar} alt="Avatar" width="100" height="100" />
      
      <p>Joined: {moment(user.createdAt).format('MMMM Do YYYY')}</p>
      
      {/* BAD: Heavy component blocks initial render even if not immediately needed */}
      <HeavyChart data="{user.stats}"/>
    </div>
  );
}
After (Optimized & Fast)

import Image from 'next/image';
import dynamic from 'next/dynamic';

// GOOD: Lazy load the heavy chart so it doesn't block the initial page load
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div className="h-64 w-full animate-pulse bg-gray-200 rounded-md" />,
  ssr: false, // Optional: Disable SSR if the chart relies heavily on browser APIs like window
});

export default function UserProfile({ user }: { user: any }) {
  // GOOD: Native Intl API adds 0kb to the bundle
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(user.createdAt));

  return (
    <div className="p-4">
      {/* GOOD: next/image prevents layout shifts and optimizes format/size */}
      <Image alt="{`${user.name}'s" avatar`} className="rounded-full" height="{100}" src="{user.avatar}" width="{100}"/>
      
      <p>Joined: {formattedDate}</p>
      
      <HeavyChart data="{user.stats}"/>
    </div>
  );
}