import type { JSX } from 'react';
import {
  Code2,
  Cpu,
  Layers,
  Boxes,
  HardDrive,
  CheckCircle2,
  Brain
} from 'lucide-react';
import type { MagicBentoItem } from '@/components/ui/MagicBento';

export const TOPICS_BENTO_ITEMS: MagicBentoItem[] = [
  {
    id: 'system-design',
    title: 'System Design & Scalability',
    label: 'Architecture · 84 / 100',
    description: 'Distributed databases, caching layers, message brokers, and CAP theorem trade-offs.',
    icon: <Layers className="w-4 h-4 text-blue-400" />,
    visual: 'collaboration',
    colSpan: 2,
    rowSpan: 2
  },
  {
    id: 'data-structures',
    title: 'Data Structures & Memory',
    label: 'Mastery · 88 / 100',
    description: 'Balanced trees, disjoint sets, LRU caches, heaps, and zero-allocation hash maps.',
    icon: <Code2 className="w-4 h-4 text-blue-400" />,
    visual: 'dashboard',
    colSpan: 1,
    rowSpan: 1
  },
  {
    id: 'algorithms',
    title: 'Algorithms & Big-O',
    label: 'Complexity · 92 / 100',
    description: 'Dynamic programming, graph traversals, greedy bounds, and asymptotic runtime.',
    icon: <Cpu className="w-4 h-4 text-emerald-400" />,
    visual: 'analytics',
    colSpan: 1,
    rowSpan: 1
  },
  {
    id: 'concurrency',
    title: 'Concurrency & Deep Systems',
    label: 'Multi-Threading · 78 / 100',
    description: 'Kernel scheduling, thread mutexes, race conditions, and memory barrier isolation.',
    icon: <HardDrive className="w-4 h-4 text-amber-400" />,
    visual: 'security',
    colSpan: 1,
    rowSpan: 1
  },
  {
    id: 'oop-principles',
    title: 'Clean Architecture & OOP',
    label: 'Design Patterns · 85 / 100',
    description: 'SOLID principles, decoupled factory & observer patterns, and domain modeling.',
    icon: <Boxes className="w-4 h-4 text-purple-400" />,
    colSpan: 1,
    rowSpan: 1
  },
  {
    id: 'test-matrix',
    title: 'Automated Test Matrix',
    label: 'Verification · 24 / 24 Passed',
    description: 'Instant AST evaluation, boundary edge cases, memory limits, and runtime profiling.',
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    visual: 'automation',
    colSpan: 2,
    rowSpan: 2
  },
  {
    id: 'ai-interview-engine',
    title: 'Multi-Modal AI Probing',
    label: 'Real-Time Voice & Code',
    description: 'Continuous audio probing, code AST inspection, and diagnostic rubric scorecard generation.',
    icon: <Brain className="w-4 h-4 text-indigo-400" />,
    visual: 'integration',
    colSpan: 2,
    rowSpan: 2
  }
];
