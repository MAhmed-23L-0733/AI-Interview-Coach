import { LoginPageContent } from "@/components/login/LoginPageContent";

/**
 * Thin Next.js Server Page Wrapper for the Login route.
 */
export default function LoginPage(): React.JSX.Element {
  return (
    <div className="flex-1 bg-[#0B0F17]">
      <LoginPageContent />
    </div>
  );
}
