'use client';

import type { JSX, MouseEvent, Ref } from 'react';
import type { MagicBentoItem } from './types';
import { MagicBentoCardBody } from './MagicBentoCardBody';

export interface MagicBentoCardProps {
  item: MagicBentoItem;
  index: number;
  span: number;
  enableSpotlight: boolean;
  enableStars: boolean;
  onItemClick?: (item: MagicBentoItem, index: number) => void;
  cellRef: Ref<HTMLDivElement>;
  cardRef: Ref<HTMLElement>;
  starCanvasRef: Ref<HTMLCanvasElement>;
}

export const MagicBentoCard = ({
  item,
  index,
  span,
  enableSpotlight,
  enableStars,
  onItemClick,
  cellRef,
  cardRef,
  starCanvasRef
}: MagicBentoCardProps): JSX.Element => {
  const entry = item ?? {};
  const clickable = Boolean(entry.href || entry.onClick || onItemClick);

  const handleClick = (event: MouseEvent): void => {
    entry.onClick?.(event);
    onItemClick?.(entry, index);
  };

  const colSpan = Math.min(span, Math.max(1, Math.round(entry.colSpan ?? 1)));
  const rowSpan = Math.max(1, Math.round(entry.rowSpan ?? 1));

  const body = (
    <MagicBentoCardBody
      entry={entry}
      enableSpotlight={enableSpotlight}
      enableStars={enableStars}
      starCanvasRef={starCanvasRef}
    />
  );

  return (
    <div
      ref={cellRef}
      className="magic-bento__cell"
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`
      }}
    >
      {entry.href ? (
        <a
          ref={cardRef as Ref<HTMLAnchorElement>}
          href={entry.href}
          target={entry.target}
          rel={entry.rel}
          className="magic-bento__card"
          data-clickable=""
          data-image={entry.image ? '' : undefined}
          onClick={clickable ? handleClick : undefined}
        >
          {body}
        </a>
      ) : (
        <div
          ref={cardRef as Ref<HTMLDivElement>}
          role={clickable ? 'button' : undefined}
          tabIndex={clickable ? 0 : undefined}
          aria-label={clickable ? entry.title : undefined}
          className="magic-bento__card"
          data-clickable={clickable ? '' : undefined}
          data-image={entry.image ? '' : undefined}
          onClick={clickable ? handleClick : undefined}
        >
          {body}
        </div>
      )}
    </div>
  );
};
