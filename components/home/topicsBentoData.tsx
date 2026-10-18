import type { JSX } from 'react';
import {
  Mic,
  Code2,
  Cpu,
  Layers,
  Boxes,
  CheckCircle2,
  Brain
} from 'lucide-react';
import type { MagicBentoItem } from '@/components/ui/MagicBento';

export const TOPICS_BENTO_ITEMS: MagicBentoItem[] = [
  {
    id: 'voice-interview',
    title: 'Voice-Based AI Interview Coach',
    label: 'Real-Time Audio · Spoken Dialogue',
    description: 'Practice real-time technical interviews out loud. The AI coach asks questions, listens to your reasoning, and probes your approach dynamically.',
    icon: <Mic className="w-4 h-4 text-sky-400" />,
    visual: 'voice',
    colSpan: 2,
    rowSpan: 2
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    label: 'Mastery · 88 / 100',
    description: 'Arrays, hash tables, binary trees, heaps, and graph algorithms asked in top technical screens.',
    icon: <Code2 className="w-4 h-4 text-blue-400" />,
    visual: 'dashboard',
    colSpan: 1,
    rowSpan: 1
  },
  {
    id: 'algorithms',
    title: 'Algorithms & Big-O',
    label: 'Complexity · 92 / 100',
    description: 'Dynamic programming, graph traversals, two pointers, and asymptotic runtime justification.',
    icon: <Cpu className="w-4 h-4 text-emerald-400" />,
    visual: 'analytics',
    colSpan: 1,
    rowSpan: 1
  },
  {
    id: 'systems-concepts',
    title: 'Systems & Core CS',
    label: 'Core Topics · Ready',
    description: 'Operating systems, memory models, computer networks, and system trade-offs.',
    icon: <Layers className="w-4 h-4 text-amber-400" />,
    visual: 'systems',
    colSpan: 1,
    rowSpan: 1
  },
  {
    id: 'oop-principles',
    title: 'Clean Code & OOP',
    label: 'Design Patterns · 85 / 100',
    description: 'SOLID principles, modular patterns, and writing readable, maintainable code during live interviews.',
    icon: <Boxes className="w-4 h-4 text-purple-400" />,
    colSpan: 1,
    rowSpan: 1
  },
  {
    id: 'interview-results',
    title: 'In-Depth Scoring & Feedback',
    label: 'Scorecard · 88 / 100 Overall',
    description: 'Comprehensive post-interview rubric evaluating problem solving, code quality, and communication with actionable guidance to help you get better.',
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    visual: 'scorecard',
    colSpan: 2,
    rowSpan: 2
  },
  {
    id: 'complete-interview-loop',
    title: 'Live Coding & Voice Sandbox',
    label: 'Voice · Code · Scores',
    description: 'The complete technical screen loop: speak with the AI coach, solve coding problems in the browser sandbox, and receive instant rubric scores.',
    icon: <Brain className="w-4 h-4 text-indigo-400" />,
    visual: 'integration',
    colSpan: 2,
    rowSpan: 2
  }
];
