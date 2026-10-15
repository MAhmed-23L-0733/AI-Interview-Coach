---
trigger: glob
globs: app/api/**/*.ts, app/actions.ts, actions/**/*.ts
---

```markdown
---
description: Standardize server-side error handling, prevent database leakage, and enforce consistent API response shapes.
globs: "app/api/**/*.ts", "app/actions.ts", "actions/**/*.ts"
alwaysApply: false
---

# API & Server Action Error Handling

Ensure robust, secure, and predictable server-to-client communication.

## Rules
1. **Never Leak Raw Database Errors**: Never return raw database error strings (e.g., PostgreSQL or Supabase constraint errors) to the client. Log them securely on the server and return a sanitized message.
2. **Standardized Response Shape**: All Server Actions must return a predictable object shape: `{ success: boolean; data?: T; error?: string; }`.
3. **Graceful Try/Catch**: Every database operation or external API call inside an Action or Route Handler MUST be wrapped in a `try/catch` block.
4. **Appropriate HTTP Codes**: Next.js Route Handlers (`app/api/**/route.ts`) must return accurate HTTP status codes (e.g., 400 for validation failure, 401/403 for auth issues, 500 for server crashes).

## Examples

### Before (Insecure and Unpredictable)
```ts
"use server"
import db from '@/lib/db';

export async function createUser(data: any) {
  // BAD: No try/catch, leaks potential constraint errors directly to client
  const result = await db.insert('users').values(data);
  return result; 
}
After (Standardized and Secure)

"use server"
import db from '@/lib/db';
import { z } from 'zod';

type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function createUser(payload: unknown): Promise<ActionResponse<any>> {
  try {
    // 1. Validate payload
    const parsed = UserSchema.safeParse(payload);
    if (!parsed.success) {
      return { success: false, error: "Invalid user data provided." };
    }

    // 2. Perform DB operation
    const result = await db.insert('users').values(parsed.data);
    
    // 3. Return success shape
    return { success: true, data: result };

  } catch (error) {
    // 4. Secure logging and sanitized error return
    console.error("[CREATE_USER_ERROR]", error);
    return { success: false, error: "Failed to create user. Please try again later." };
  }
}