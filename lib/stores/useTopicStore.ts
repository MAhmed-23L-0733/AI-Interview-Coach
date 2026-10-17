import { create } from "zustand";

export interface TopicItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: "Network" | "Activity" | "Boxes" | "Cpu" | "Globe" | "Sparkles" | "Code2";
}

export const TOPIC_ITEMS: readonly TopicItem[] = [
  {
    id: "data-structures",
    title: "Data Structures",
    subtitle: "Arrays, trees, graphs",
    iconName: "Network",
  },
  {
    id: "algorithms",
    title: "Algorithms",
    subtitle: "Patterns & complexity",
    iconName: "Activity",
  },
  {
    id: "oop",
    title: "OOP",
    subtitle: "Principles & patterns",
    iconName: "Boxes",
  },
  {
    id: "operating-systems",
    title: "Operating Systems",
    subtitle: "Processes & memory",
    iconName: "Cpu",
  },
  {
    id: "computer-networks",
    title: "Computer Networks",
    subtitle: "Protocols & systems",
    iconName: "Globe",
  },
  {
    id: "ai-ml",
    title: "AI / Machine Learning",
    subtitle: "Models, training & evaluation",
    iconName: "Sparkles",
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    subtitle: "Architecture & delivery",
    iconName: "Code2",
  },
] as const;

interface TopicStoreState {
  selectedIds: string[];
  toggleTopic: (id: string) => void;
  keepFirstOnly: () => void;
  selectAll: () => void;
}

const ALL_TOPIC_IDS = TOPIC_ITEMS.map((t) => t.id);

export const useTopicStore = create<TopicStoreState>((set) => ({
  selectedIds: ALL_TOPIC_IDS,
  toggleTopic: (id: string) =>
    set((state) => {
      const exists = state.selectedIds.includes(id);
      if (exists) {
        // Enforce at least one topic remains selected
        if (state.selectedIds.length <= 1) return state;
        return { selectedIds: state.selectedIds.filter((item) => item !== id) };
      }
      return { selectedIds: [...state.selectedIds, id] };
    }),
  keepFirstOnly: () => set({ selectedIds: [ALL_TOPIC_IDS[0]] }),
  selectAll: () => set({ selectedIds: ALL_TOPIC_IDS }),
}));
