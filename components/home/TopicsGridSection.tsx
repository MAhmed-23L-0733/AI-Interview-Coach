import {
  Code2,
  Cpu,
  Layers,
  Boxes,
  HardDrive,
  Globe,
  Brain,
} from "lucide-react";
import { TopicCard } from "@/components/home/TopicCard";

const TOPICS_DATA = [
  {
    icon: Code2,
    title: "Data Structures",
    description: "Arrays, binary trees, graphs, heaps, and hash structures.",
    avgScore: "84 / 100",
    isHighlighted: true,
  },
  {
    icon: Cpu,
    title: "Algorithms",
    description: "Complexity bounds, dynamic programming, BFS/DFS paradigms.",
    avgScore: "76 / 100",
  },
  {
    icon: Layers,
    title: "System Design",
    description: "High scalability, distributed DBs, caching layers, and CAP tradeoffs.",
    avgScore: "82 / 100",
  },
  {
    icon: Boxes,
    title: "OOP Principles",
    description: "SOLID principles, design patterns, modularity, and encapsulation.",
    avgScore: "79 / 100",
  },
  {
    icon: HardDrive,
    title: "Operating Systems",
    description: "Processes, threads, lock synchronization, and virtual memory.",
    avgScore: "68 / 100",
  },
  {
    icon: Globe,
    title: "Computer Networks",
    description: "TCP/IP handshakes, HTTP/3, TLS encryption, and sockets.",
    avgScore: "73 / 100",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Transformer models, loss convergence, evaluation metrics, and RAG architectures.",
    avgScore: "81 / 100",
    className: "md:col-span-2 lg:col-span-1 xl:col-span-2",
  },
];

export function TopicsGridSection(): React.JSX.Element {
  return (
    <section className="py-20 bg-[#051424]/60 border-y border-[#1F2937]" id="topics">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-bold text-blue-400 tracking-wider uppercase mb-2">
              Curated Question Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Targeted Practice Across Core Domains
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Sharpen your technical depth across the exact topics asked by top tech interviewers.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">7 focus areas ready</span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {TOPICS_DATA.map((topic) => (
            <TopicCard key={topic.title} {...topic} />
          ))}
        </div>
      </div>
    </section>
  );
}
