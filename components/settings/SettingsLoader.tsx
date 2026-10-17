import * as React from "react";
import { auth } from "@/auth";
import { getUserSettings } from "@/actions/settings";
import { SettingsPageContent } from "./SettingsPageContent";

export async function SettingsLoader(): Promise<React.JSX.Element> {
  const [session, settingsRes] = await Promise.all([
    auth(),
    getUserSettings(),
  ]);

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AM";

  return (
    <SettingsPageContent
      initialSettings={settingsRes.data}
      initials={initials}
    />
  );
}
