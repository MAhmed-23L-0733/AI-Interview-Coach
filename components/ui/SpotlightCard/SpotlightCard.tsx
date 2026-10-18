'use client';

import React, { useRef } from 'react';
import type { SpotlightCardProps, SpotlightSettings } from './types';
import { THEMES, SHAPES, NOISE, CARD_BASE_CLASS } from './spotlightCardConstants';
import { clamp, falloff } from './spotlightCardUtils';
import { useSpotlightEffect } from './useSpotlightEffect';
import { cn } from '@/lib/utils';

export function SpotlightCard({
  children,
  className = '',
  style,
  spotlightColor,
  intensity = 0.15,
  spotlightSize = 260,
  softness = 0.7,
  shape = 'circle',
  borderGlow = 0.6,
  proximity = 100,
  smoothing = 0.3,
  ambient = true,
  flare = true,
  grain = 0.04,
  theme = 'dark',
  ...rest
}: SpotlightCardProps): React.JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  const grainRef = useRef<HTMLSpanElement>(null);
  const edgeRef = useRef<HTMLSpanElement>(null);

  const palette = THEMES[theme] ?? THEMES.dark;
  const color = spotlightColor ?? palette.light;
  const form = SHAPES.includes(shape) ? shape : 'circle';

  const settings: SpotlightSettings = {
    shape: form,
    fill: falloff(color, softness),
    edge: falloff(color, 1),
    size: Math.max(20, spotlightSize),
    intensity: clamp(intensity, 0, 1) * palette.fill,
    borderGlow: clamp(borderGlow, 0, 1) * palette.edge,
    proximity: Math.max(0, proximity),
    smoothing: clamp(smoothing, 0, 1),
    ambient,
    flare,
    grain: clamp(grain, 0, 1),
  };

  useSpotlightEffect({
    rootRef,
    lightRef,
    grainRef,
    edgeRef,
    settings,
  });

  return (
    <div
      ref={rootRef}
      className={cn(CARD_BASE_CLASS, className)}
      style={
        {
          '--spotlight-card-surface': palette.surface,
          '--spotlight-card-border': palette.border,
          '--spotlight-card-shadow': palette.shadow,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <span
        ref={lightRef}
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0"
        aria-hidden="true"
      />
      <span
        ref={grainRef}
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[length:160px_160px] opacity-0 mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col h-full justify-between">
        {children}
      </div>
      <span
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] p-px [background:var(--spotlight-card-border)] [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
        aria-hidden="true"
      />
      <span
        ref={edgeRef}
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] p-px opacity-0 [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
        aria-hidden="true"
      />
    </div>
  );
}

export default SpotlightCard;
