import type { CSSProperties, ReactNode } from 'react';

export type ShinyEasing = 'smooth' | 'linear' | 'snappy';
export type ShinyTrigger = 'loop' | 'hover' | 'view';

export interface ShinyTextProps {
  text?: string;
  children?: ReactNode;
  color?: string;
  shineColor?: string;
  speed?: number;
  delay?: number;
  angle?: number;
  shineWidth?: number;
  softness?: number;
  bands?: number;
  glow?: number;
  direction?: 'left' | 'right';
  easing?: ShinyEasing;
  trigger?: ShinyTrigger;
  yoyo?: boolean;
  followPointer?: boolean;
  pauseOnHover?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface ShinySettings {
  color: string;
  shineColor: string;
  speed: number;
  delay: number;
  angle: number;
  shineWidth: number;
  softness: number;
  bands: number;
  glow: number;
  sign: number;
  ease: (t: number) => number;
  trigger: ShinyTrigger;
  yoyo: boolean;
  followPointer: boolean;
  pauseOnHover: boolean;
  disabled: boolean;
}
