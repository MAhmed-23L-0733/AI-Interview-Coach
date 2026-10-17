import * as React from "react";
import {
  Network,
  Activity,
  Cpu,
  Code,
  Layers,
  Database,
  Terminal,
  Share2,
  LucideIcon,
} from "lucide-react";

interface HistoryIconProps {
  name: string;
  className?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Network,
  Activity,
  Cpu,
  Code,
  Layers,
  Database,
  Terminal,
  Share2,
};

export function HistoryIcon({ name, className = "h-4 w-4" }: HistoryIconProps): React.JSX.Element {
  const IconComponent = ICON_MAP[name] ?? Code;
  return <IconComponent className={className} />;
}
