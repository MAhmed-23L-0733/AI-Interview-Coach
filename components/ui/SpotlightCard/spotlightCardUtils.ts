import type { SpotlightShape, SpotlightSettings } from './types';

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const falloff = (color: string, softness: number): string => {
  const soft = clamp(softness, 0, 1);
  const core = (1 - soft) ** 1.5 * 0.85;
  const stop = (alpha: number, at: number): string =>
    `color-mix(in srgb, ${color} ${(alpha * 100).toFixed(2)}%, transparent) ${(at * 100).toFixed(2)}%`;

  const list: string[] = [stop(1, 0)];
  for (let i = 0; i <= 14; i++) {
    const t = core + ((1 - core) * i) / 14;
    const g = (t - core) / (1 - core);
    const smooth = 1 - g * g * (3 - 2 * g);
    const glow = Math.exp(-4.6 * g * g) * (1 - g ** 6);
    list.push(stop(smooth + (glow - smooth) * soft, t));
  }
  return list.join(', ');
};

export const calculateSpotlightGradient = (
  s: SpotlightSettings,
  size: number,
  x: number,
  y: number,
  stops: string
): string => {
  if (s.shape === 'beam') {
    const reach = Math.max(size * 0.6, y + size * 0.55);
    return `radial-gradient(${(size * 0.55).toFixed(1)}px ${reach.toFixed(1)}px at ${x.toFixed(1)}px 0px, ${stops})`;
  }
  return `radial-gradient(circle ${size.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, ${stops})`;
};
