export type StepId = 'configure' | 'session' | 'report';

export interface HowItWorksHighlight {
  id: string;
  label: string;
  detail: string;
}

export interface HowItWorksStep {
  id: StepId;
  stepNumber: string;
  title: string;
  badge: string;
  description: string;
  highlights: HowItWorksHighlight[];
}
