'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import type { ShinyTextProps, ShinySettings } from './types';
import { EASINGS, createShinyGradient, parseColor } from './shinyTextUtils';

export function useShinyAnimation(props: ShinyTextProps) {
  const {
    color = '#94a3b8',
    shineColor = '#38bdf8',
    speed = 3.5,
    angle = 120,
    shineWidth = 35,
    softness = 0.4,
    bands = 1,
    glow = 0,
    direction = 'right',
    easing = 'smooth',
    trigger = 'loop',
    yoyo = false,
    pauseOnHover = false,
    disabled = false,
  } = props;

  const [pos, setPos] = useState<number>(-50);
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  const settings: ShinySettings = useMemo(
    () => ({
      color,
      shineColor,
      speed: Math.max(0.5, speed),
      delay: 0,
      angle,
      shineWidth,
      softness,
      bands,
      glow,
      sign: direction === 'right' ? 1 : -1,
      ease: EASINGS[easing] || EASINGS.smooth,
      trigger,
      yoyo,
      followPointer: false,
      pauseOnHover,
      disabled,
    }),
    [color, shineColor, speed, angle, shineWidth, softness, bands, glow, direction, easing, trigger, yoyo, pauseOnHover, disabled]
  );

  useEffect(() => {
    if (disabled) return;
    let animId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      if (pauseOnHover && isHovered) {
        animId = requestAnimationFrame(tick);
        return;
      }
      const elapsed = (now - startTime) / 1000;
      const progress = (elapsed % settings.speed) / settings.speed;
      setPos(-50 + settings.ease(progress) * 200);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [disabled, pauseOnHover, isHovered, settings]);

  const gradient = useMemo(() => {
    if (disabled || typeof window === 'undefined') return undefined;
    const fill = parseColor(settings.color) || [148, 163, 184, 1];
    const shine = parseColor(settings.shineColor) || [56, 189, 248, 1];
    return createShinyGradient(pos, fill, shine, settings);
  }, [disabled, pos, settings]);

  return { elementRef, gradient, setIsHovered, disabled };
}
