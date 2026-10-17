"use client";

import * as React from "react";
import { useInterviewSessionTimer } from "@/hooks/useInterviewSessionTimer";
import { useMockInterviewRunner } from "@/hooks/useMockInterviewRunner";
import { InterviewHeader } from "./InterviewHeader";
import { InterviewWorkspace } from "./InterviewWorkspace";

interface InterviewClientSessionProps {
  topic?: string;
}

export function InterviewClientSession({
  topic = "Data Structures",
}: InterviewClientSessionProps): React.JSX.Element {
  const timer = useInterviewSessionTimer(18 * 60 + 42);
  const runner = useMockInterviewRunner("python");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0B0F17] text-white">
      <InterviewHeader
        topic={topic}
        formattedTime={timer.timeString}
      />
      <InterviewWorkspace runner={runner} />
    </div>
  );
}
