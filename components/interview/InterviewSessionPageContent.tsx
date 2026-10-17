"use client";

import * as React from "react";
import { TOPIC_ITEMS } from "@/lib/stores/useTopicStore";
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
  sessionId,
}: InterviewSessionPageContentProps): React.JSX.Element {
  const timer = useInterviewSessionTimer(18 * 60 + 42);
  const runner = useMockInterviewRunner("python");
  const { resetSession } = runner;
  const { resetTimer } = timer;

  React.useEffect(() => {
    resetSession();
    resetTimer();
  }, [sessionId, resetSession, resetTimer]);

  const resolvedTopic = React.useMemo(() => {
    const matched = TOPIC_ITEMS.find(
      (item) => item.id === sessionId || sessionId.includes(item.id)
    );
    if (matched) return matched.title;
    if (sessionId === "session-2") return "Algorithms";
    if (sessionId === "session-3") return "Operating Systems";
    return "Data Structures";
  }, [sessionId]);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#0B0F17]">
      <InterviewHeader
        topic={resolvedTopic}
        formattedTime={timer.timeString}
      />
      <InterviewWorkspace runner={runner} />
    </div>
  );
}
