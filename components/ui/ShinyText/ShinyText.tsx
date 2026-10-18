'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { ShinyTextProps } from './types';
import { useShinyAnimation } from './useShinyAnimation';

export function ShinyText({
  text,
  children,
  className,
  style,
  disabled = false,
  ...rest
}: ShinyTextProps) {
  const content = text ?? children;
  const { elementRef, gradient, setIsHovered } = useShinyAnimation({
    ...rest,
    disabled,
  });

  const inlineStyle: React.CSSProperties = {
    ...style,
    ...(gradient
      ? {
          backgroundImage: gradient,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          display: 'inline-block',
        }
      : {}),
  };

  return (
    <span
      ref={elementRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('inline-block select-none transition-opacity duration-300', className)}
      style={inlineStyle}
    >
      {content}
    </span>
  );
}

export default ShinyText;
