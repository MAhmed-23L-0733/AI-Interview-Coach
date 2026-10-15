import { SignupPageContent } from "@/components/signup/SignupPageContent";

/**
 * Thin Page Wrapper for the Signup route.
 */
export default function SignupPage(): React.JSX.Element {
  return (
    <div className="flex-1">
      <SignupPageContent />
    </div>
  );
}
