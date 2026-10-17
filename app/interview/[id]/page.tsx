import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { InterviewSessionPageContent } from "@/components/interview/InterviewSessionPageContent";

interface InterviewSessionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const instant = false;

export async function generateMetadata({
  params,
}: InterviewSessionPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Live Technical Interview (${id}) | AI Interview Coach`,
    description: "Immersive dual-pane mock technical interview session with real-time AI speech and code editor.",
  };
}

async function InterviewSessionLoader({ params }: InterviewSessionPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  if (!id || typeof id !== "string" || id.trim() === "") {
    notFound();
  }
  return <InterviewSessionPageContent sessionId={id} />;
}

/**
 * Thin server wrapper rendering the session wrapped in Suspense for streaming prerendering.
 */
export default function InterviewSessionPage(props: InterviewSessionPageProps): React.JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center text-slate-400 font-mono text-sm">
          Loading interview workspace...
        </div>
      }
    >
      <InterviewSessionLoader {...props} />
    </Suspense>
  );
}
