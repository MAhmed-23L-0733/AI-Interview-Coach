"use client";

import * as React from "react";
import type { QuestionAnalysis } from "@/lib/validations/report";
import { ReportQuestionCard } from "./ReportQuestionCard";

interface ReportQuestionsListProps {
  questions: QuestionAnalysis[];
  activeTopic?: string;
}

export function ReportQuestionsList({
  questions,
  activeTopic,
}: ReportQuestionsListProps): React.JSX.Element {
  const filteredQuestions = React.useMemo(() => {
    if (!activeTopic || activeTopic.toLowerCase() === "all topics") {
      return questions;
    }
    return questions.filter(
      (q) => q.topic.toLowerCase() === activeTopic.toLowerCase()
    );
  }, [questions, activeTopic]);

  const displayQuestions = filteredQuestions.length > 0 ? filteredQuestions : questions;

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col gap-2 rounded-2xl border border-[#1F2937] bg-[#111827] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-white">
            Question-by-question analysis
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Every prompt, the expected response, and what you said.
          </p>
        </div>

        <span className="self-start rounded-full border border-[#334155] bg-[#1E293B] px-3 py-1 font-mono text-xs text-slate-400 sm:self-auto">
          {displayQuestions.length} questions reviewed
        </span>
      </div>

      {/* Questions Stack */}
      <div className="space-y-4">
        {displayQuestions.map((question) => (
          <ReportQuestionCard key={question.id} question={question} />
        ))}
      </div>
    </section>
  );
}
