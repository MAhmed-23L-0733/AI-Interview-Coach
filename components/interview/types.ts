export type MessageSpeaker = "ai" | "user";

export interface TranscriptMessage {
  id: string;
  speaker: MessageSpeaker;
  name: string;
  avatar: string;
  timestamp: string;
  content: string;
  isActive?: boolean;
}

export type SupportedLanguage = "python" | "typescript" | "javascript" | "go";

export interface CodeExecutionResult {
  status: "idle" | "running" | "success" | "error";
  output: string;
  executionTimeMs?: number;
  testsPassed?: number;
  testsTotal?: number;
}

export interface InterviewSessionData {
  id: string;
  title: string;
  topic: string;
  initialTimeRemaining: number;
  initialCode: string;
  initialLanguage: SupportedLanguage;
  messages: TranscriptMessage[];
}
