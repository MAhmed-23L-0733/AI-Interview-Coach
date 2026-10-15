import { HomePageContent } from "@/components/home/HomePageContent";

/**
 * Thin Page Wrapper for the Home route.
 * Keeps UI and state logic encapsulated within components/home/HomePageContent.
 */
export default function HomePage(): React.JSX.Element {
  return (
    <div className="flex-1">
      <HomePageContent />
    </div>
  );
}
