import { connection } from "next/server";
import { auth } from "@/auth";
import { NavbarClientShell } from "@/components/shared/navbar/NavbarClientShell";
import type { SafeUser } from "@/types";

export async function Navbar(): Promise<React.JSX.Element> {
  await connection();
  const session = await auth();

  const safeUser: SafeUser | null = session?.user
    ? {
        id: session.user.id || "",
        name: session.user.name || null,
        email: session.user.email || "",
        image: session.user.image || null,
      }
    : null;

  return <NavbarClientShell user={safeUser} />;
}
