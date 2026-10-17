import * as React from "react";
import { InterviewClientSession } from "./InterviewClientSession";
import { INITIAL_INTERVIEW_SESSION } from "./mockData";

interface InterviewSessionPageContentProps {
  sessionId: string;
}

/**
 * Server component preparing initial interview problem, topic, and context.
 */
export function InterviewSessionPageContent({
  sessionId,
}: InterviewSessionPageContentProps): React.JSX.Element {
  // Can load or match session topic and problem metadata from server/database
  const sessionTopic = INITIAL_INTERVIEW_SESSION.topic;

  return (
    <main
      data-session-id={sessionId}
      className="flex h-screen w-full flex-col overflow-hidden bg-[#0B0F17]"
    >
      <InterviewClientSession topic={sessionTopic} />
    </main>
  );
}
