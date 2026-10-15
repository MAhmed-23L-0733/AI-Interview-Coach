---
trigger: glob
description: Enforce strict modular coding practices for Next.js components, separating concerns, isolating server logic, keeping components small, and using the Page Wrapper pattern.
globs: **/*.tsx, **/*.ts, **/*.jsx, **/*.js
---

# Enforce Modularity in Next.js

Follow these strict modular coding practices whenever generating or refactoring code in this project:

## Rules

1. **Component Decomposition**: React components MUST be kept small and focused. Any component exceeding 100 lines of code must be broken down into smaller, reusable child components.
2. **Client vs. Server Separation**: Clearly separate Server Components from Client Components. Minimize the use of `"use client"` by pushing interactivity down the component tree to leaf components, keeping layout and data-fetching components on the server.
3. **Custom Hooks for State**: Complex state logic, heavy event handling, or multiple `useEffect` chains must not clutter the component body. Extract them into modular custom hooks (e.g., `use[Feature]`).
4. **Isolate Server Actions and API Logic**: Database queries, data mutations, and API integrations must not be written directly inside UI components. Extract them into dedicated `actions.ts` files, utility services, or Next.js Route Handlers.
5. **Extract Pure Logic**: Any generic JavaScript/TypeScript logic (like formatting dates, parsing strings, or mathematical calculations) must be abstracted into pure, testable functions within a `utils/` or `lib/` directory.
6. **Page Wrapper Pattern**: All Next.js route files (e.g., `app/**/page.tsx`) MUST act as thin wrappers. They should only contain a basic HTML wrapper (like a `<div>` or `<main>`) and render a single `PageContent` component. The actual page structure, server-side data fetching, and component composition must be stored in a matching route folder inside the `components/` directory (e.g., `components/dashboard/PageContent.tsx`).

## Examples

### Before (Bloated Component)

```tsx
// app/dashboard/page.tsx
"use client"

import { useState, useEffect } from 'react';
import db from '@/lib/db';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // API/DB logic inside component
      const res = await fetch('/api/data');
      const json = await res.json();
      
      // Data transformation logic inside component
      const formatted = json.map((item: any) => ({
        ...item,
        date: new Date(item.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }));
      
      setData(formatted);
      setLoading(false);
    }
    fetchData();
  }, []);

  async function handleDelete(id: string) {
    // Server action mixed with client component
    await db.delete(id);
    setData(data.filter((item: any) => item.id !== id));
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
      </header>
      
      {isOpen && (
        <nav className="mb-4">
          <ul>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
          </ul>
        </nav>
      )}

      <div className="grid gap-4">
        {data.map((item: any) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <h2>{item.title}</h2>
            <p>{item.date}</p>
            <button 
              onClick={() => handleDelete(item.id)}
              className="text-red-500 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
After (Modular Structure with Page Wrapper Pattern)

// app/dashboard/page.tsx (Thin Wrapper)
import PageContent from '@/components/dashboard/PageContent';

export default function DashboardPage() {
  return (
    <main>
      <PageContent/>
    </main>
  );
}

// components/dashboard/PageContent.tsx (Server Component - Actual Page Logic)
import { fetchDashboardData } from '@/app/actions';
import DashboardList from '@/components/dashboard/DashboardList';
import Header from '@/components/shared/Header';

export default async function PageContent() {
  // Data fetching kept on the server
  const initialData = await fetchDashboardData();

  return (
    <div className="p-4">
      {/* Interactivity pushed down to leaf components */}
      <Header title="Dashboard"/>
      <DashboardList initialData="{initialData}"/>
    </div>
  );
}

// components/shared/Header.tsx (Client Component - Leaf)
"use client"

import { useState } from 'react';

export default function Header({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
      </header>
      {isOpen && (
        <nav className="mb-4">
          <ul>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
          </ul>
        </nav>
      )}
    </>
  );
}

// components/dashboard/DashboardList.tsx (Client Component - specific logic)
"use client"

import { useDashboardData } from '@/hooks/useDashboardData';

export default function DashboardList({ initialData }: { initialData: any[] }) {
  const { data, handleDelete } = useDashboardData(initialData);

  return (
    <div className="grid gap-4">
      {data.map(item => (
        <div key={item.id} className="border p-4 rounded shadow">
          <h2>{item.title}</h2>
          <p>{item.date}</p>
          <button 
            onClick={() => handleDelete(item.id)}
            className="text-red-500 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

// hooks/useDashboardData.ts
import { useState } from 'react';
import { deleteDashboardItem } from '@/app/actions';

export function useDashboardData(initialData: any[]) {
  const [data, setData] = useState(initialData);

  async function handleDelete(id: string) {
    await deleteDashboardItem(id); // Call Server Action
    setData(prev => prev.filter(item => item.id !== id));
  }

  return { data, handleDelete };
}

// app/actions.ts (Server Actions / API Logic)
"use server"

import db from '@/lib/db';
import { formatDate } from '@/utils/formatters';

export async function fetchDashboardData() {
  const rawData = await db.getAll();
  return rawData.map((item: any) => ({
    ...item,
    date: formatDate(item.createdAt) // Pure logic extracted
  }));
}

export async function deleteDashboardItem(id: string) {
  return await db.delete(id);
}

// utils/formatters.ts (Pure Logic)
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}