import type { HTMLAttributes, CSSProperties } from 'react';

export type SpotlightShape = 'circle' | 'beam';

export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
  intensity?: number;
  spotlightSize?: number;
  softness?: number;
  shape?: SpotlightShape;
  borderGlow?: number;
  proximity?: number;
  smoothing?: number;
  ambient?: boolean;
  flare?: boolean;
  grain?: number;
  theme?: 'dark' | 'light';
}

export interface Palette {
  surface: string;
  border: string;
  shadow: string;
  light: string;
  fill: number;
  edge: number;
}

export interface SpotlightSettings {
  shape: SpotlightShape;
  fill: string;
  edge: string;
  size: number;
  intensity: number;
  borderGlow: number;
  proximity: number;
  smoothing: number;
  ambient: boolean;
  flare: boolean;
  grain: number;
}
