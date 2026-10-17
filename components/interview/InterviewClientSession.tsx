"use client";

import * as React from "react";
import { InterviewHeader } from "./InterviewHeader";
import { InterviewWorkspace } from "./InterviewWorkspace";
import { useInterviewSession } from "./useInterviewSession";

interface InterviewClientSessionProps {
  topic?: string;
}

export function InterviewClientSession({
  topic = "Data Structures",
}: InterviewClientSessionProps): React.JSX.Element {
  const sessionState = useInterviewSession();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0B0F17] text-white">
      <InterviewHeader
        topic={topic}
        formattedTime={sessionState.formattedTime}
      />
      <InterviewWorkspace sessionState={sessionState} />
    </div>
  );
}
