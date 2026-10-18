import type { CSSProperties } from 'react';
import type { ThemePalette } from './types';

export const THEMES: Record<ThemePalette, Record<string, string | number>> = {
  dark: {
    '--mb-surface': 'linear-gradient(180deg, #111827 0%, #0b0f17 100%)',
    '--mb-edge': 'rgba(255, 255, 255, 0.08)',
    '--mb-highlight': 'rgba(59, 130, 246, 0.15)',
    '--mb-shadow': '0 24px 48px -28px rgba(0, 0, 0, 0.85), 0 8px 18px -12px rgba(0, 0, 0, 0.6)',
    '--mb-tile': 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
    '--mb-tile-edge': 'rgba(255, 255, 255, 0.08)',
    '--mb-tile-highlight': 'rgba(59, 130, 246, 0.12)',
    '--mb-tile-shadow': '0 4px 10px -4px rgba(0, 0, 0, 0.7)',
    '--mb-well': 'rgba(255, 255, 255, 0.03)',
    '--mb-well-edge': 'rgba(255, 255, 255, 0.07)',
    '--mb-ink': '#f8fafc',
    '--mb-muted': 'rgba(148, 163, 184, 0.75)',
    '--mb-faint': 'rgba(148, 163, 184, 0.3)',
    '--mb-line': 'rgba(255, 255, 255, 0.08)',
    '--mb-secondary': '#94a3b8',
    '--mb-secondary-ink': '#0b0f17',
    '--mb-cursor-stroke': 'rgba(11, 15, 23, 0.95)',
    '--mb-ring': 'rgba(11, 15, 23, 0.85)',
    '--mb-focus': 'rgba(59, 130, 246, 0.5)',
    '--mb-glow-alpha': 0.85,
    '--mb-spot-alpha': 0.08
  },
  light: {
    '--mb-surface': 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    '--mb-edge': 'rgba(15, 23, 42, 0.08)',
    '--mb-highlight': 'rgba(255, 255, 255, 1)',
    '--mb-shadow': '0 24px 48px -30px rgba(15, 23, 42, 0.28), 0 8px 18px -14px rgba(15, 23, 42, 0.16)',
    '--mb-tile': 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
    '--mb-tile-edge': 'rgba(15, 23, 42, 0.08)',
    '--mb-tile-highlight': 'rgba(255, 255, 255, 1)',
    '--mb-tile-shadow': '0 4px 10px -5px rgba(15, 23, 42, 0.22)',
    '--mb-well': 'rgba(15, 23, 42, 0.03)',
    '--mb-well-edge': 'rgba(15, 23, 42, 0.06)',
    '--mb-ink': '#0f172a',
    '--mb-muted': 'rgba(100, 116, 139, 0.8)',
    '--mb-faint': 'rgba(100, 116, 139, 0.35)',
    '--mb-line': 'rgba(15, 23, 42, 0.08)',
    '--mb-secondary': '#64748b',
    '--mb-secondary-ink': '#ffffff',
    '--mb-cursor-stroke': '#ffffff',
    '--mb-ring': '#ffffff',
    '--mb-focus': 'rgba(59, 130, 246, 0.5)',
    '--mb-glow-alpha': 0.5,
    '--mb-spot-alpha': 0.035
  }
};

export const INK: Record<ThemePalette, [number, number, number]> = {
  dark: [248, 250, 252],
  light: [15, 23, 42]
};

export const MIN_CELL = 150;
export const MIN_PAIR = 200;
export const STAGGER = 80;
export const TILT = 6;
export const MAGNET = 6;

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const vars = (values: Record<string, string | number>): CSSProperties =>
  values as unknown as CSSProperties;

export const parseRgb = (value?: string | null): [number, number, number] | null => {
  if (!value) return null;
  const text = String(value).trim();
  const hex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text);
  if (hex) {
    const full = hex[1].length === 3 ? hex[1].replace(/./g, digit => digit + digit) : hex[1];
    return [0, 2, 4].map(idx => parseInt(full.slice(idx, idx + 2), 16)) as [number, number, number];
  }
  const numbers = text.match(/[\d.]+/g);
  if (numbers && numbers.length >= 3 && /^(rgba?\(|[\d.\s,]+$)/i.test(text)) {
    return numbers.slice(0, 3).map(ch => clamp(Math.round(parseFloat(ch)), 0, 255)) as [number, number, number];
  }
  return null;
};

export const inkFor = (rgb: [number, number, number]): string => {
  const [r, g, b] = rgb.map(channel => channel / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.55 ? '#0b0f17' : '#ffffff';
};

export const REPLAY = new Set([
  'magic-bento-draw',
  'magic-bento-fade',
  'magic-bento-grow',
  'magic-bento-pop',
  'magic-bento-select',
  'magic-bento-wait',
  'magic-bento-run',
  'magic-bento-check',
  'magic-bento-rail',
  'magic-bento-switch-track',
  'magic-bento-switch-knob'
]);

export const FLOW = new Set([
  'magic-bento-wait',
  'magic-bento-run',
  'magic-bento-check',
  'magic-bento-rail',
  'magic-bento-fade'
]);

export const finite = (animation: Animation): boolean => {
  const timing = animation.effect?.getTiming?.();
  return timing ? timing.iterations !== Infinity : false;
};

export const nameOf = (animation: Animation): string =>
  (animation as { animationName?: string }).animationName || '';
