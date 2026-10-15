---
trigger: glob
description: Enforce strict TypeScript practices, banning 'any', requiring runtime validation with Zod, and mandating explicit return types.
globs: **/*.ts, **/*.tsx
---

# Strict TypeScript Standards

Follow these rules to ensure type safety and prevent runtime errors.

## Rules
1. **Never use `any`**: The `any` type is strictly forbidden. If the shape of data is truly unknown (e.g., parsing third-party API responses), use `unknown` and perform type narrowing or schema validation.
2. **Runtime Validation for Boundaries**: All incoming data from APIs, databases, or form submissions MUST be validated at runtime using a schema validation library (e.g., Zod) before being processed.
3. **Explicit Return Types**: All custom hooks, utility functions, and API route handlers must have explicit return types defined to prevent inference-related bugs and improve readability.

## Examples

### Before (Unsafe)
```tsx
// API response handled without validation or explicit returns
export async function getUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  const data: any = await res.json(); // BAD: using any
  return data; // BAD: implicit return type
}
After (Strict & Safe)

import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;

// GOOD: Explicit return type, unknown used for raw data, Zod for validation
export async function getUser(id: string): Promise<User null |> {
  try {
    const res = await fetch(`/api/users/${id}`);
    const rawData: unknown = await res.json(); 
    
    const parsedData = UserSchema.safeParse(rawData);
    if (!parsedData.success) {
      console.error("Type validation failed", parsedData.error);
      return null;
    }
    
    return parsedData.data;
  } catch (error) {
    return null;
  }
}