"use client";

import { useState, useCallback } from "react";
import type { SupportedLanguage, CodeExecutionResult, TranscriptMessage } from "@/components/interview/types";
import { LANGUAGE_TEMPLATES, INITIAL_INTERVIEW_SESSION } from "@/components/interview/mockData";

export type UseMockInterviewRunnerReturn = ReturnType<typeof useMockInterviewRunner>;

export function useMockInterviewRunner(
  initialLanguage: SupportedLanguage = "python"
) {
  const [messages, setMessages] = useState<TranscriptMessage[]>(INITIAL_INTERVIEW_SESSION.messages);
  const [isListening, setIsListening] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(true);
  const [activeLanguage, setActiveLanguage] = useState<SupportedLanguage>(initialLanguage);
  const [code, setCode] = useState(LANGUAGE_TEMPLATES[initialLanguage]);
  const [executionResult, setExecutionResult] = useState<CodeExecutionResult>({
    status: "idle",
    output: "",
  });

  const handleToggleMic = useCallback(() => {
    if (!isListening) {
      setIsListening(true);
      setIsAISpeaking(false);
    } else {
      setIsListening(false);
      const userMsg: TranscriptMessage = {
        id: `msg-${Date.now()}`,
        speaker: "user",
        name: "You",
        avatar: "AM",
        timestamp: "18:43",
        content: "I'd use a hash set for O(n) time and O(n) auxiliary space. If in-place modification is permitted, sign negation gives O(1) space.",
      };
      setMessages((prev) => [...prev, userMsg]);

      setTimeout(() => {
        setIsAISpeaking(true);
        const aiMsg: TranscriptMessage = {
          id: `msg-${Date.now() + 1}`,
          speaker: "ai",
          name: "Interviewer",
          avatar: "AI",
          timestamp: "18:45",
          content: "Excellent analysis. Let's inspect your code implementation and test it against sample inputs.",
          isActive: true,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setTimeout(() => setIsAISpeaking(false), 4000);
      }, 1200);
    }
  }, [isListening]);

  const handleRunCode = useCallback(() => {
    setExecutionResult({ status: "running", output: "Executing test suite in isolated sandbox..." });
    setTimeout(() => {
      setExecutionResult({
        status: "success",
        output: `> Running test cases for first_duplicate()...\n✓ Test Case 1: [2, 1, 3, 5, 3, 2] -> Expected: 3, Got: 3 (Passed)\n✓ Test Case 2: [1, 2, 3, 4] -> Expected: None, Got: None (Passed)\nAll tests passed (2/2) in 14ms.`,
        executionTimeMs: 14,
        testsPassed: 2,
        testsTotal: 2,
      });
    }, 700);
  }, []);

  const handleLanguageChange = useCallback((lang: SupportedLanguage) => {
    setActiveLanguage(lang);
    setCode(LANGUAGE_TEMPLATES[lang]);
  }, []);

  const handleCodeChange = useCallback((val: string) => {
    setCode(val);
  }, []);

  return {
    messages,
    isListening,
    isAISpeaking,
    activeLanguage,
    code,
    executionResult,
    handleToggleMic,
    handleRunCode,
    handleLanguageChange,
    handleCodeChange,
  };
}
