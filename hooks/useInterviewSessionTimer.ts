"use client";

import { useState, useEffect, useCallback } from "react";

interface UseInterviewSessionTimerReturn {
  timeString: string;
  isPaused: boolean;
  togglePause: () => void;
  resetTimer: () => void;
}

/**
 * Custom hook tracking the live interview stopwatch elapsed time (e.g., "18:42").
 */
export function useInterviewSessionTimer(
  initialSeconds = 1122
): UseInterviewSessionTimerReturn {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeString = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return {
    timeString,
    isPaused,
    togglePause,
    resetTimer,
  };
}
