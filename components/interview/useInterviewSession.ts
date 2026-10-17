"use client";

import { useState, useEffect, useCallback } from "react";
import type { TranscriptMessage, SupportedLanguage, CodeExecutionResult } from "./types";
import { INITIAL_INTERVIEW_SESSION, LANGUAGE_TEMPLATES } from "./mockData";
import { formatSeconds, MOCK_TEST_OUTPUT, FOLLOW_UP_AI_PROMPT, USER_MOCK_ANSWER } from "./interviewUtils";

export function useInterviewSession() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_INTERVIEW_SESSION.initialTimeRemaining);
  const [messages, setMessages] = useState<TranscriptMessage[]>(INITIAL_INTERVIEW_SESSION.messages);
  const [language, setLanguageState] = useState<SupportedLanguage>("python");
  const [code, setCode] = useState(INITIAL_INTERVIEW_SESSION.initialCode);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(true);
  const [executionResult, setExecutionResult] = useState<CodeExecutionResult>({
    status: "idle",
    output: "Run your code to see the output here.",
  });

  useEffect(() => {
    const timer = setInterval(() => setSecondsLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    setCode(LANGUAGE_TEMPLATES[newLang]);
  }, []);

  const runCode = useCallback(() => {
    setExecutionResult({ status: "running", output: "Running tests on sandbox..." });
    setTimeout(() => {
      setExecutionResult({
        status: "success",
        output: MOCK_TEST_OUTPUT,
        executionTimeMs: 14,
        testsPassed: 3,
        testsTotal: 3,
      });
    }, 700);
  }, []);

  const toggleListening = useCallback(() => {
    if (!isListening) {
      setIsListening(true);
      setIsSpeaking(false);
      return;
    }
    setIsListening(false);
    setIsTranscribing(true);
    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, isActive: false })),
      {
        id: `user-${Date.now()}`,
        speaker: "user",
        name: "You",
        avatar: "AM",
        timestamp: "18:43",
        content: USER_MOCK_ANSWER,
        isActive: false,
      },
    ]);
    setTimeout(() => {
      setIsSpeaking(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          speaker: "ai",
          name: "Interviewer",
          avatar: "AI",
          timestamp: "18:44",
          content: FOLLOW_UP_AI_PROMPT,
          isActive: true,
        },
      ]);
    }, 1200);
  }, [isListening]);

  return {
    formattedTime: formatSeconds(secondsLeft),
    messages,
    language,
    setLanguage,
    code,
    setCode,
    isSpeaking,
    isListening,
    isTranscribing,
    executionResult,
    runCode,
    toggleListening,
  };
}
