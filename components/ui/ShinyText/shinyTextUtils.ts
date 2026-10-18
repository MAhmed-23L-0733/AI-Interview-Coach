import type { ShinyEasing, ShinySettings, ShinyTrigger } from './types';

export const EASINGS: Record<ShinyEasing, (t: number) => number> = {
  linear: (t) => t,
  smooth: (t) => 0.5 - Math.cos(Math.PI * t) / 2,
  snappy: (t) => (t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) / 2),
};

export const TRIGGERS: ShinyTrigger[] = ['loop', 'hover', 'view'];
export const FALLOFF = [0, 0.2, 0.4, 0.6, 0.8, 1];

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

let canvasContext: CanvasRenderingContext2D | null = null;

export const parseColor = (value: string): number[] | null => {
  if (typeof document === 'undefined') return null;
  if (!canvasContext) {
    canvasContext = document.createElement('canvas').getContext('2d');
  }
  if (!canvasContext) return null;

  canvasContext.fillStyle = '#000000';
  canvasContext.fillStyle = value;
  const resolved = String(canvasContext.fillStyle);

  if (resolved.startsWith('#')) {
    return [1, 3, 5]
      .map((i) => parseInt(resolved.slice(i, i + 2), 16))
      .concat(1);
  }
  const parts = resolved.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return null;
  return [Number(parts[0]), Number(parts[1]), Number(parts[2]), parts.length > 3 ? Number(parts[3]) : 1];
};

export const blendColor = (from: number[], to: number[], amount: number): string => {
  const channel = (a: number, b: number): number =>
    Math.round(
      Math.pow(Math.pow(a / 255, 2.2) * (1 - amount) + Math.pow(b / 255, 2.2) * amount, 1 / 2.2) * 255
    );
  const alpha = from[3] * (1 - amount) + to[3] * amount;
  if (alpha <= 0) return 'rgba(0, 0, 0, 0)';
  const weigh = (a: number, b: number): number => (a * from[3] * (1 - amount) + b * to[3] * amount) / alpha;
  const r = from[3] === to[3] ? channel(from[0], to[0]) : Math.round(weigh(from[0], to[0]));
  const g = from[3] === to[3] ? channel(from[1], to[1]) : Math.round(weigh(from[1], to[1]));
  const b = from[3] === to[3] ? channel(from[2], to[2]) : Math.round(weigh(from[2], to[2]));
  return `rgba(${r}, ${g}, ${b}, ${Math.round(alpha * 1000) / 1000})`;
};

export const createShinyGradient = (
  pos: number,
  fill: number[],
  shine: number[],
  s: ShinySettings
): string => {
  const half = s.shineWidth / 2;
  const core = half * (1 - s.softness);
  const fade = half - core;
  const stops: [number, number][] = [];

  for (let band = 0; band < s.bands; band++) {
    const center = pos - s.sign * band * s.shineWidth * 1.3;
    const strength = 1 - band * 0.28;
    for (const side of [-1, 1]) {
      for (const f of FALLOFF) {
        const at = center + side * (core + fade * (1 - f));
        const amount = f * f * (3 - 2 * f) * strength;
        stops.push([at, amount]);
      }
    }
  }

  stops.sort((a, b) => a[0] - b[0]);
  const list = stops.map(([at, amount]) => `${blendColor(fill, shine, amount)} ${at.toFixed(2)}%`);
  return `linear-gradient(${s.angle}deg, ${blendColor(fill, shine, 0)} 0%, ${list.join(', ')}, ${blendColor(fill, shine, 0)} 100%)`;
};
