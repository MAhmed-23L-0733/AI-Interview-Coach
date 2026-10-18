import type { HowItWorksStep } from './types';

export const CONFIGURE_DOMAINS = ['Distributed Systems', 'Algorithms & DSA', 'Concurrency & Low-Latency'];
export const CONFIGURE_LEVELS = ['L4 Core', 'L5 Senior', 'L6+ Staff'];
export const CONFIGURE_COMPANIES = ['FAANG Bar', 'High-Frequency Trading', 'Fast-Growth Startup'];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: 'configure',
    stepNumber: '01',
    title: 'Select Focus & Difficulty',
    badge: 'Step 01',
    description:
      'Pick your technical domain, target seniority level (L4, L5, Staff), and company style (FAANG, high-frequency trading, fast-growth startup).',
    highlights: [
      {
        id: 'domain',
        label: 'Technical Domain',
        detail: 'Distributed Systems, System Design, Algorithms, Frontend',
      },
      {
        id: 'level',
        label: 'Target Seniority',
        detail: 'L4 Engineer, L5 Senior Engineer, or L6+ Staff Architect',
      },
      {
        id: 'company',
        label: 'Company Archetype',
        detail: 'FAANG bar, High-Frequency Trading, or fast-scaling startups',
      },
    ],
  },
  {
    id: 'session',
    stepNumber: '02',
    title: 'Speak and Code in Real Time',
    badge: 'Step 02',
    description:
      'Put on your headset. Discuss your approach out loud, analyze tradeoffs, and implement clean code in the synchronized editor.',
    highlights: [
      {
        id: 'voice',
        label: 'Conversational Voice',
        detail: 'Real-time audio feedback with zero awkward turn-taking lag',
      },
      {
        id: 'editor',
        label: 'Synchronized Sandbox',
        detail: 'Integrated code editor with instant test runner validation',
      },
      {
        id: 'probing',
        label: 'Proactive Probing',
        detail: 'Constructive follow-ups on complexity and edge case handling',
      },
    ],
  },
  {
    id: 'report',
    stepNumber: '03',
    title: 'Get In-depth Analysis & Report',
    badge: 'Step 03',
    description:
      'Receive line-by-line code reviews, rubric score breakdowns, question-by-question coach assessments, and targeted study recommendations.',
    highlights: [
      {
        id: 'rubrics',
        label: 'Hiring Rubrics',
        detail: 'Evaluation on architecture, code quality, speed, and communication',
      },
      {
        id: 'review',
        label: 'Line-by-Line Review',
        detail: 'Concrete diffs showing optimal memory and algorithmic improvements',
      },
      {
        id: 'recommendations',
        label: 'Targeted Guidance',
        detail: 'Curated drill-downs to patch knowledge gaps before screen day',
      },
    ],
  },
];
