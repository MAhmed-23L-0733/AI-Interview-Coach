import { getProfile } from "@/actions/profile";
import { DEFAULT_PROFILE } from "@/lib/constants/profile";
import { ProfilePageContent } from "@/components/profile/ProfilePageContent";

export async function ProfileLoader(): Promise<React.JSX.Element> {
  const response = await getProfile();
  const initialData = response.data || DEFAULT_PROFILE;

  return <ProfilePageContent initialData={initialData} />;
}
