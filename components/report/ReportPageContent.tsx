"use client";

import * as React from "react";
import { AppShellDock } from "@/components/shared/AppShellDock";
import { DashboardLayoutWrapper } from "@/components/dashboard/DashboardLayoutWrapper";
import type { SessionReport } from "@/lib/validations/report";
import { ReportHeader } from "./ReportHeader";
import { ReportHeroScore } from "./ReportHeroScore";
import { ReportTopicsCovered } from "./ReportTopicsCovered";
import { ReportMetricsBreakdown } from "./ReportMetricsBreakdown";
import { ReportTopicFeedback } from "./ReportTopicFeedback";
import { ReportQuestionsList } from "./ReportQuestionsList";
import { ReportBottomActions } from "./ReportBottomActions";
import { DownloadReportModal } from "./DownloadReportModal";
import { ShareReportModal } from "./ShareReportModal";

interface ReportPageContentProps {
  report: SessionReport;
  initials?: string;
  userName?: string | null;
}

const REPORT_TOPICS = ["Data Structures", "Algorithms", "OOP", "Operating Systems"] as const;

export function ReportPageContent({
  report,
  initials = "AM",
  userName,
}: ReportPageContentProps): React.JSX.Element {
  const [activeTopic, setActiveTopic] = React.useState<string>("Data Structures");
  const [showDownload, setShowDownload] = React.useState<boolean>(false);
  const [showShare, setShowShare] = React.useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100">
      <AppShellDock initials={initials} name={userName} />

      <DashboardLayoutWrapper className="flex flex-col pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl space-y-6 px-4 sm:px-0">
          <ReportHeader
            topicsCount={report.topicsCount}
            date={report.date}
            duration={report.duration}
            onDownload={() => setShowDownload(true)}
            onShare={() => setShowShare(true)}
          />

          <ReportHeroScore
            score={report.score}
            status={report.status}
            description={report.description}
            highlights={report.highlights}
            percentile={report.percentile}
            percentileSubtext={report.percentileSubtext}
          />

          <ReportTopicsCovered
            topics={REPORT_TOPICS}
            activeTopic={activeTopic}
            onSelectTopic={setActiveTopic}
          />

          <ReportMetricsBreakdown
            dimensions={report.dimensions}
            recommendedFocus={report.recommendedFocus}
          />

          <ReportTopicFeedback
            topicName={activeTopic}
            strengths={report.topicFeedback.strengths}
            gaps={report.topicFeedback.gaps}
          />

          <ReportQuestionsList
            questions={report.questions}
            activeTopic={activeTopic}
          />

          <ReportBottomActions topic={activeTopic} />
        </div>
      </DashboardLayoutWrapper>

      <DownloadReportModal
        isOpen={showDownload}
        onClose={() => setShowDownload(false)}
        report={report}
      />

      <ShareReportModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        report={report}
      />
    </div>
  );
}
