import { useEffect, useRef, type RefObject } from 'react';
import type { SpotlightSettings } from './types';
import { calculateSpotlightGradient } from './spotlightCardUtils';

interface UseSpotlightEffectParams {
  rootRef: RefObject<HTMLDivElement | null>;
  lightRef: RefObject<HTMLSpanElement | null>;
  grainRef: RefObject<HTMLSpanElement | null>;
  edgeRef: RefObject<HTMLSpanElement | null>;
  settings: SpotlightSettings;
}

export function useSpotlightEffect({
  rootRef,
  lightRef,
  grainRef,
  edgeRef,
  settings,
}: UseSpotlightEffectParams): void {
  const wakeRef = useRef<(() => void) | null>(null);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    wakeRef.current?.();
  });

  useEffect(() => {
    const root = rootRef.current;
    const light = lightRef.current;
    const noise = grainRef.current;
    const edge = edgeRef.current;
    if (!root || !light || !noise || !edge) return undefined;

    const reduce =
      typeof window !== 'undefined' &&
      (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

    const state = {
      x: 0,
      y: 0,
      presence: 0,
      flare: 0,
      time: Math.random() * 60,
      pressed: false,
      visible: true,
    };
    const pointer = { x: 0, y: 0, active: false };
    const drawn = { light: '', edge: '', noise: '' };
    let focus: Element | null = null;
    let raf = 0;
    let last = 0;
    let alive = true;

    const paint = (s: SpotlightSettings): void => {
      const size = s.size * (1 + 0.2 * state.flare);
      const boost = 1 + 0.7 * state.flare;
      const fill = calculateSpotlightGradient(s, size, state.x, state.y, s.fill);
      const rim = calculateSpotlightGradient(
        s,
        size * 0.6,
        state.x,
        s.shape === 'beam' ? 0 : state.y,
        s.edge
      );

      if (fill !== drawn.light) {
        drawn.light = fill;
        light.style.background = fill;
      }
      if (rim !== drawn.edge) {
        drawn.edge = rim;
        edge.style.background = rim;
      }
      light.style.opacity = String(Math.min(1, state.presence * s.intensity * boost));
      edge.style.opacity = String(Math.min(1, state.presence * s.borderGlow * boost));

      const grainy =
        s.grain > 0
          ? calculateSpotlightGradient(s, size, state.x, state.y, '#000 0%, transparent 100%')
          : 'none';
      if (grainy !== drawn.noise) {
        drawn.noise = grainy;
        noise.style.webkitMaskImage = grainy;
        noise.style.maskImage = grainy;
      }
      noise.style.opacity = String(state.presence * s.grain);
    };

    const tick = (now: number): void => {
      raf = 0;
      if (!alive) return;
      const s = settingsRef.current;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const rect = root.getBoundingClientRect();
      let tx = state.x;
      let ty = state.y;
      let target = 0;

      if (focus && root.contains(focus)) {
        const box = focus.getBoundingClientRect();
        tx = box.left + box.width / 2 - rect.left;
        ty = box.top + box.height / 2 - rect.top;
        target = 1;
      } else if (pointer.active) {
        tx = pointer.x - rect.left;
        ty = pointer.y - rect.top;
        const gap = Math.hypot(
          Math.max(0, -tx, tx - rect.width),
          Math.max(0, -ty, ty - rect.height)
        );
        if (gap === 0) target = 1;
        else if (s.proximity > 0) target = Math.max(0, 1 - gap / s.proximity) ** 2;
      }

      if (target < 0.6 && s.ambient && state.visible) {
        if (!reduce) state.time += dt;
        const drift = 0.6 - target;
        tx += (rect.width * (0.5 + 0.34 * Math.sin(state.time * 0.43)) - tx) * (drift / 0.6);
        ty += (rect.height * (0.5 + 0.3 * Math.sin(state.time * 0.61 + 1.3)) - ty) * (drift / 0.6);
        target = 0.6;
      }

      if (state.presence < 0.02 && target > 0 && !s.ambient) {
        state.x = tx;
        state.y = ty;
      }

      const follow =
        reduce || s.smoothing === 0 ? 1 : 1 - Math.exp(-dt / (0.015 + s.smoothing * 0.22));
      state.x += (tx - state.x) * follow;
      state.y += (ty - state.y) * follow;

      const fade = reduce ? 1 : 1 - Math.exp(-dt / (target > state.presence ? 0.1 : 0.32));
      state.presence += (target - state.presence) * fade;
      if (Math.abs(target - state.presence) < 0.002) state.presence = target;

      const press = state.pressed && s.flare && !reduce ? 1 : 0;
      state.flare += (press - state.flare) * (1 - Math.exp(-dt / (press ? 0.05 : 0.28)));
      if (Math.abs(press - state.flare) < 0.002) state.flare = press;

      paint(s);

      const moving = Math.abs(tx - state.x) > 0.1 || Math.abs(ty - state.y) > 0.1;
      const settled = !moving && state.presence === target && state.flare === press;
      if (!settled || (s.ambient && state.visible && !reduce)) raf = requestAnimationFrame(tick);
    };

    const wake = (): void => {
      if (raf || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    wakeRef.current = wake;

    const onMove = (event: PointerEvent): void => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      if (
        state.presence > 0 ||
        settingsRef.current.proximity > 0 ||
        root.contains(event.target as Node | null)
      ) {
        wake();
      }
    };

    const onOut = (event: PointerEvent): void => {
      if (event.relatedTarget) return;
      pointer.active = false;
      wake();
    };

    const onDown = (event: PointerEvent): void => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      state.pressed = true;
      wake();
    };

    const onUp = (event: PointerEvent): void => {
      if (event.pointerType !== 'mouse') pointer.active = false;
      if (!state.pressed && event.pointerType === 'mouse') return;
      state.pressed = false;
      wake();
    };

    const onFocusIn = (event: FocusEvent): void => {
      if (!(event.target instanceof Element) || !event.target.matches(':focus-visible')) return;
      focus = event.target;
      wake();
    };

    const onFocusOut = (event: FocusEvent): void => {
      if (root.contains(event.relatedTarget as Node | null)) return;
      focus = null;
      wake();
    };

    const onScroll = (): void => {
      if (pointer.active || state.presence > 0) wake();
    };

    const observer = new IntersectionObserver((entries) => {
      state.visible = entries.some((entry) => entry.isIntersecting);
      if (state.visible) wake();
    });

    observer.observe(root);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    document.addEventListener('pointerout', onOut);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('focusin', onFocusIn);
    root.addEventListener('focusout', onFocusOut);
    wake();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('scroll', onScroll, { capture: true });
      document.removeEventListener('pointerout', onOut);
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('focusin', onFocusIn);
      root.removeEventListener('focusout', onFocusOut);
      wakeRef.current = null;
    };
  }, [edgeRef, grainRef, lightRef, rootRef]);
}
