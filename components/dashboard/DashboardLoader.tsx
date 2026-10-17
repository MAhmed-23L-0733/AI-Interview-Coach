import { connection } from "next/server";
import { auth } from "@/auth";
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent";

/**
 * Server Component: Reads session state securely within Next.js Suspense boundary.
 * Defaults to "Alex" profile if unauthenticated to enable demo practice sessions.
 */
export async function DashboardLoader(): Promise<React.JSX.Element> {
  await connection();
  const session = await auth();

  const user = session?.user
    ? {
        id: session.user.id || "demo-user",
        name: session.user.name || "Alex",
        email: session.user.email || "alex@example.com",
      }
    : {
        id: "demo-user",
        name: "Alex",
        email: "alex@example.com",
      };

  return <DashboardPageContent user={user} />;
}
