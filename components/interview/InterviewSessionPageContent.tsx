"use client";

import { useInterviewSessionTimer } from "@/hooks/useInterviewSessionTimer";
import { useMockInterviewRunner } from "@/hooks/useMockInterviewRunner";
import { InterviewHeader } from "./InterviewHeader";
import { InterviewWorkspace } from "./InterviewWorkspace";

interface InterviewSessionPageContentProps {
  sessionId: string;
}

/**
 * Layout orchestrator connecting the session timer and mock interview runner
 * to the InterviewHeader and responsive InterviewWorkspace.
 */
export function InterviewSessionPageContent({
  sessionId: _sessionId,
}: InterviewSessionPageContentProps): React.JSX.Element {
  const timer = useInterviewSessionTimer(18 * 60 + 42);
  const runner = useMockInterviewRunner("python");

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#0B0F17]">
      <InterviewHeader
        topic="Data Structures"
        formattedTime={timer.timeString}
      />
      <InterviewWorkspace runner={runner} />
    </div>
  );
}
