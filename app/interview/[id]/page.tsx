import { Suspense } from "react";
import { notFound } from "next/navigation";
import { InterviewSessionPageContent } from "@/components/interview/InterviewSessionPageContent";

interface InterviewSessionPageProps {
  params: Promise<{ id: string }>;
}

async function SessionLoader({ params }: InterviewSessionPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  if (!id) notFound();
  return <InterviewSessionPageContent sessionId={id} />;
}

export default function InterviewSessionPage(props: InterviewSessionPageProps): React.JSX.Element {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#0B0F17]" />}>
      <SessionLoader {...props} />
    </Suspense>
  );
}
