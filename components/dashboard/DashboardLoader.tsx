import { connection } from "next/server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent";

/**
 * Server Component: Fetches session securely on the server and redirects if unauthenticated.
 */
export async function DashboardLoader(): Promise<React.JSX.Element> {
  await connection();
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  return (
    <DashboardPageContent
      user={{
        id: session.user.id,
        name: session.user.name ?? null,
        email: session.user.email ?? null,
      }}
    />
  );
}
