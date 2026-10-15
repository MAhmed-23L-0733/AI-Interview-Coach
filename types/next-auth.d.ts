import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Returned by the `jwt` callback and `getToken`.
   */
  interface JWT {
    id?: string;
  }
}
