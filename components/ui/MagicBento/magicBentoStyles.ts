import type { CSSProperties } from 'react';
import type { ThemePalette } from './types';
import { clamp, inkFor, parseRgb, vars, INK, THEMES } from './magicBentoUtils';

export interface StyleComputationParams {
  palette: ThemePalette;
  glowColor?: string;
  radius: number;
  span: number;
  spotlightRadius: number;
  rowHeight: number;
  gap: number;
  customStyle?: CSSProperties;
}

export function computeBentoGridStyles({
  palette,
  glowColor,
  radius,
  span,
  spotlightRadius,
  rowHeight,
  gap,
  customStyle
}: StyleComputationParams): CSSProperties {
  const ink = INK[palette];
  const glow = parseRgb(glowColor) ?? ink;
  const accent = parseRgb(glowColor) ?? ink;
  const corner = Math.max(0, radius);

  return {
    ...vars({
      ...THEMES[palette],
      '--mb-glow-rgb': glow.join(', '),
      '--mb-accent-rgb': accent.join(', '),
      '--mb-accent-ink': inkFor(accent),
      '--mb-radius': `${corner}px`,
      '--mb-inner-radius': `${Math.round(clamp(corner * 0.5, 6, 12))}px`,
      '--mb-pad': `${Math.round(clamp(corner * 0.85, 14, 20))}px`,
      '--mb-spot-size': `${Math.max(40, spotlightRadius)}px`,
      '--mb-border-size': `${Math.round(Math.max(40, spotlightRadius) * 0.75)}px`
    }),
    gridTemplateColumns: `repeat(${span}, minmax(0, 1fr))`,
    gridAutoRows: span === 1 ? `minmax(${rowHeight}px, auto)` : `${rowHeight}px`,
    gap: `${Math.max(0, gap)}px`,
    ...customStyle
  };
}
