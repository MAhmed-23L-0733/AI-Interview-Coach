import { LoginPageContent } from "@/components/login/LoginPageContent";

/**
 * Thin Page Wrapper for the Login route.
 */
export default function LoginPage(): React.JSX.Element {
  return (
    <div className="flex-1">
      <LoginPageContent />
    </div>
  );
}
