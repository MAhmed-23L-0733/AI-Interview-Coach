"use client";

import * as React from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * NextAuth SessionProvider wrapper to give client components access to auth session.
 */
export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
