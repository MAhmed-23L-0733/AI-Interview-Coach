import type { CSSProperties, MouseEvent, ReactNode } from 'react';

export type BuiltInVisual =
  | 'analytics'
  | 'dashboard'
  | 'collaboration'
  | 'automation'
  | 'integration'
  | 'security';

export interface MagicBentoItem {
  id?: string | number;
  title?: string;
  description?: string;
  label?: string;
  icon?: ReactNode;
  image?: string;
  visual?: BuiltInVisual | ReactNode;
  content?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (event: MouseEvent) => void;
  colSpan?: number;
  rowSpan?: number;
}

export type ThemePalette = 'dark' | 'light';

export interface MagicBentoProps {
  items?: MagicBentoItem[];
  columns?: number;
  rowHeight?: number;
  gap?: number;
  radius?: number;
  theme?: ThemePalette;
  glowColor?: string;
  textAutoHide?: boolean;
  enableBorderGlow?: boolean;
  enableSpotlight?: boolean;
  spotlightRadius?: number;
  enableStars?: boolean;
  particleCount?: number;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  intro?: boolean;
  disableAnimations?: boolean;
  onItemClick?: (item: MagicBentoItem, index: number) => void;
  className?: string;
  style?: CSSProperties;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  rate: number;
}

export interface BentoCardState {
  hot: number;
  rx: number;
  ry: number;
  tx: number;
  ty: number;
  vrx: number;
  vry: number;
  vtx: number;
  vty: number;
  press: number;
  vpress: number;
  stars: number;
  particles: Particle[] | null;
  active: boolean;
  drawn?: boolean;
  written: Record<string, string>;
}
