export type FeatureVisualType = 'voice' | 'code' | 'report';
export type FeatureIconType = 'mic' | 'terminal' | 'barChart';
export type FeatureBadgeIconType = 'volume' | 'bug' | 'lineChart';

export interface FeatureItem {
  id: string;
  iconType: FeatureIconType;
  title: string;
  tagline: string;
  description: string;
  badgeIconType: FeatureBadgeIconType;
  badgeTitle: string;
  badgeDescription: string;
  spotlightColor: string;
  iconBgClass: string;
  iconTextClass: string;
  badgeTextClass: string;
  visualType: FeatureVisualType;
}

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'voice-dialogue',
    iconType: 'mic',
    title: 'Real-Time Voice Dialogue',
    tagline: 'Multi-Modal Voice Engine',
    description:
      'Ultra-low-latency conversational AI with proactive clarification. If you make a sub-optimal assumption or stay silent too long, the interviewer naturally interjects.',
    badgeIconType: 'volume',
    badgeTitle: 'Proactive Probing',
    badgeDescription: "Interrupts gently when Big-O isn't properly justified.",
    spotlightColor: '#3B82F6',
    iconBgClass: 'bg-blue-500/15',
    iconTextClass: 'text-blue-400',
    badgeTextClass: 'text-blue-400',
    visualType: 'voice',
  },
  {
    id: 'coding-sandbox',
    iconType: 'terminal',
    title: 'Live Coding Sandbox',
    tagline: 'Browser Runtime IDE',
    description:
      'Integrated browser IDE supporting Python, Java, C++, TypeScript, and Go. Write executable logic against hidden unit tests with instant runtime feedback.',
    badgeIconType: 'bug',
    badgeTitle: 'Automated Test Matrix',
    badgeDescription: 'Evaluates edge cases, null checks, and integer overflows.',
    spotlightColor: '#10B981',
    iconBgClass: 'bg-emerald-500/15',
    iconTextClass: 'text-emerald-400',
    badgeTextClass: 'text-emerald-400',
    visualType: 'code',
  },
  {
    id: 'rubric-reports',
    iconType: 'barChart',
    title: 'Diagnostic Rubric Reports',
    tagline: 'Quantitative Evaluation',
    description:
      'Comprehensive post-session evaluation broken into 5 quantitative pillars: problem solving, accuracy, communication, code quality, and Big-O efficiency.',
    badgeIconType: 'lineChart',
    badgeTitle: 'Cohort Benchmarking',
    badgeDescription: 'See where your solution places against top 10% benchmarks.',
    spotlightColor: '#F59E0B',
    iconBgClass: 'bg-amber-500/15',
    iconTextClass: 'text-amber-400',
    badgeTextClass: 'text-amber-400',
    visualType: 'report',
  },
];
