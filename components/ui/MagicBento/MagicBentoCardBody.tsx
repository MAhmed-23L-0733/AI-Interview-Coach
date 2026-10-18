import type { JSX, Ref } from 'react';
import type { MagicBentoItem } from './types';
import { VISUALS } from './magicBentoVisuals';

export interface MagicBentoCardBodyProps {
  entry: MagicBentoItem;
  enableSpotlight: boolean;
  enableStars: boolean;
  starCanvasRef: Ref<HTMLCanvasElement>;
}

export function MagicBentoCardBody({
  entry,
  enableSpotlight,
  enableStars,
  starCanvasRef
}: MagicBentoCardBodyProps): JSX.Element {
  const Visual = typeof entry.visual === 'string' && entry.visual in VISUALS
    ? VISUALS[entry.visual as keyof typeof VISUALS]
    : null;
  const visual = Visual ? <Visual /> : typeof entry.visual === 'string' ? null : entry.visual;

  return (
    <>
      {entry.image && <img className="magic-bento__image" src={entry.image} alt="" draggable={false} />}
      {entry.image && <span className="magic-bento__scrim" />}
      {enableSpotlight && <span className="magic-bento__light" />}
      {enableStars && (
        <canvas ref={starCanvasRef} className="magic-bento__stars" aria-hidden="true" />
      )}
      <div className="magic-bento__content">
        {entry.content ?? (
          <>
            {(entry.icon || entry.label) && (
              <div className="magic-bento__header">
                {entry.icon && <span className="magic-bento__icon">{entry.icon}</span>}
                {entry.label && <span className="magic-bento__label">{entry.label}</span>}
              </div>
            )}
            {visual && <div className="magic-bento__visual" aria-hidden="true">{visual}</div>}
            {(entry.title || entry.description) && (
              <div className="magic-bento__text">
                {entry.title && <h3 className="magic-bento__title">{entry.title}</h3>}
                {entry.description && <p className="magic-bento__description">{entry.description}</p>}
              </div>
            )}
          </>
        )}
      </div>
      <span className="magic-bento__rim" />
      <span className="magic-bento__border" />
    </>
  );
}
