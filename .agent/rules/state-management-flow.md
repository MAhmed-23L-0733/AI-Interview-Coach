---
trigger: glob
globs: **/*.tsx, **/*.ts
---

### 4. `state-management-flow.md`

```markdown
---
description: Prevent state chaos by enforcing Next.js URL state first, restricting useState to UI only, and using Zustand for global state.
globs: "**/*.tsx", "**/*.ts"
alwaysApply: false
---

# State Management Flow

Keep state predictable, shareable, and performant by choosing the right layer for your data.

## Rules
1. **URL State First (Search Parameters)**: Any state that controls data fetching, filtering, pagination, or active tabs MUST be stored in the URL search parameters (e.g., `?page=2&sort=desc`). This makes the application shareable and allows Server Components to read the state directly. Use tools like `nuqs` or Next.js `useSearchParams`.
2. **Local State (`useState`)**: Strictly reserve `useState` for ephemeral, component-level UI state (e.g., tracking if a dropdown menu is open, or managing raw text input in a form before submission).
3. **Global State (Zustand)**: Use a global store like Zustand ONLY for client-side data that must be accessed across deeply nested or parallel component trees where prop-drilling becomes unmanageable (e.g., global audio player state, user session preferences, complex multi-step wizards).

## Examples

### Before (Anti-pattern: Using useState for URL-driven data)
```tsx
"use client"
import { useState, useEffect } from 'react';

export default function ProductList() {
  // BAD: This state is trapped in the client. Users cannot share a link to "page 2".
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts(page, search);
  }, [page, search]);

  return (
    <div>
      <input onChange={(e) => setSearch(e.target.value)} />
      <button onClick={() => setPage(p => p + 1)}>Next Page</button>
    </div>
  );
}
After (Best Practice: URL-driven state)

// app/products/page.tsx (Server Component)
import ProductList from './ProductList';

// Page automatically receives searchParams
export default async function ProductsPage({ searchParams }: { searchParams: { q?: string, page?: string } }) {
  const query = searchParams.q || '';
  const page = Number(searchParams.page) || 1;
  
  // Fetch data on the server based on URL state
  const products = await fetchProducts(page, query);

  return <ProductList initialProducts="{products}"/>;
}

// app/products/ProductSearch.tsx (Client Component - Leaf)
"use client"
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Update URL instead of local state
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set('q', term);
    else params.delete('q');
    
    // Pushes state to URL, triggering a server re-render of the page
    router.push(`?${params.toString()}`); 
  };

  return (
    <input 
      defaultValue={searchParams.get('q') || ''}
      onChange={(e) => handleSearch(e.target.value)} 
      placeholder="Search..."
    />
  );
}