'use client';

import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';
import './MagicBento.css';
import type { MagicBentoItem, MagicBentoProps } from './types';
import { parseRgb, INK } from './magicBentoUtils';
import { computeBentoGridStyles } from './magicBentoStyles';
import { MagicBentoCard } from './MagicBentoCard';
import { useMagicBentoEngine } from './useMagicBentoEngine';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export const DEFAULT_ITEMS: MagicBentoItem[] = [
  { title: 'Analytics', description: 'Track user behavior', visual: 'analytics' },
  { title: 'Dashboard', description: 'Centralized data view', visual: 'dashboard' },
  {
    title: 'Collaboration',
    description: 'Work together seamlessly',
    visual: 'collaboration',
    colSpan: 2,
    rowSpan: 2
  },
  { title: 'Automation', description: 'Streamline workflows', visual: 'automation', colSpan: 2, rowSpan: 2 },
  { title: 'Integration', description: 'Connect favorite tools', visual: 'integration' },
  { title: 'Security', description: 'Enterprise-grade protection', visual: 'security' }
];

export function MagicBento({
  items = DEFAULT_ITEMS,
  columns = 4,
  rowHeight = 200,
  gap = 12,
  radius = 20,
  theme = 'dark',
  glowColor = '#3B82F6',
  textAutoHide = true,
  enableBorderGlow = true,
  enableSpotlight = true,
  spotlightRadius = 300,
  enableStars = false,
  particleCount = 24,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = true,
  intro = true,
  disableAnimations = false,
  onItemClick,
  className = '',
  style
}: MagicBentoProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const starRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [cols, setCols] = useState(Math.max(1, Math.round(columns)));

  const palette = theme === 'light' ? 'light' : 'dark';
  const glow = parseRgb(glowColor) ?? INK[palette];

  const engineRef = useMagicBentoEngine(
    rootRef,
    cellRefs,
    cardRefs,
    starRefs,
    {
      columns: Math.max(1, Math.round(columns)),
      gap: Math.max(0, gap),
      enableBorderGlow,
      enableSpotlight,
      spotlightRadius: Math.max(40, spotlightRadius),
      enableStars,
      particleCount: Math.min(120, Math.max(0, Math.round(particleCount))),
      enableTilt,
      enableMagnetism,
      clickEffect,
      intro,
      disableAnimations,
      glow
    },
    setCols
  );

  useIsomorphicLayoutEffect(() => {
    engineRef.current?.sync();
  }, [items, cols, rowHeight, gap, radius, enableStars, enableSpotlight, enableBorderGlow]);

  const span = Math.max(1, cols);
  cellRefs.current.length = items.length;
  cardRefs.current.length = items.length;
  starRefs.current.length = items.length;

  const containerStyle = computeBentoGridStyles({
    palette,
    glowColor,
    radius,
    span,
    spotlightRadius,
    rowHeight,
    gap,
    customStyle: style
  });

  return (
    <div
      ref={rootRef}
      className={`magic-bento ${className}`.trim()}
      data-autohide={textAutoHide ? '' : undefined}
      data-motion={disableAnimations ? undefined : ''}
      data-intro={intro && !disableAnimations ? '' : undefined}
      style={containerStyle}
    >
      {items.map((item, index) => (
        <MagicBentoCard
          key={item.id ?? index}
          item={item}
          index={index}
          span={span}
          enableSpotlight={enableSpotlight}
          enableStars={enableStars}
          onItemClick={onItemClick}
          cellRef={el => {
            cellRefs.current[index] = el;
          }}
          cardRef={el => {
            cardRefs.current[index] = el;
          }}
          starCanvasRef={el => {
            starRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
}

export default MagicBento;
