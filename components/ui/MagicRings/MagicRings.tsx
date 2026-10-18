"use client";

import { useEffect, useRef, useState } from "react";
import "./MagicRings.css";
import {
  MAX_RINGS,
  MAX_BURSTS,
  SLOTS,
  SEGMENTS,
  MOTIONS,
  CYCLE,
  STAGGER,
  BURST_LIFE,
  BURST_SPEED,
  clamp,
  smoothstep,
  pulseLife,
  toLinear,
  parseColor,
  link,
  planeFor,
  project,
  type MagicRingsMotion,
  type CompiledProgram,
} from "./magicRingsUtils";
import {
  FULLSCREEN,
  STRIP,
  COMMON,
  FRAGMENTS,
  shaderSource,
  type FragmentName,
} from "./magicRingsShaders";

export interface MagicRingsProps {
  color?: string;
  colorTwo?: string;
  ringCount?: number;
  motion?: MagicRingsMotion;
  speed?: number;
  lineThickness?: number;
  glow?: number;
  baseRadius?: number;
  radiusStep?: number;
  expansion?: number;
  taper?: number;
  rotation?: number;
  spin?: number;
  tilt?: number;
  dispersion?: number;
  grain?: number;
  opacity?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  hoverScale?: number;
  hoverIntensity?: number;
  parallax?: number;
  clickBurst?: boolean;
  intro?: boolean;
  theme?: "dark" | "light";
  maxDevicePixelRatio?: number;
  className?: string;
  style?: React.CSSProperties;
  centerOffset?: [number, number];
}

interface MagicRingsSettings {
  color: [number, number, number];
  colorTwo: [number, number, number];
  ringCount: number;
  motion: MagicRingsMotion;
  speed: number;
  lineThickness: number;
  glow: number;
  baseRadius: number;
  radiusStep: number;
  expansion: number;
  taper: number;
  rotation: number;
  spin: number;
  tilt: number;
  dispersion: number;
  grain: number;
  opacity: number;
  followMouse: boolean;
  mouseInfluence: number;
  hoverScale: number;
  hoverIntensity: number;
  parallax: number;
  clickBurst: boolean;
  intro: boolean;
  light: boolean;
  maxRatio: number;
  centerOffset: [number, number];
}

interface Burst {
  start: number;
  radius: number;
}

export function MagicRings({
  color = "#A855F7",
  colorTwo = "#6366F1",
  ringCount = 6,
  motion = "pulse",
  speed = 1,
  lineThickness = 2,
  glow = 1,
  baseRadius = 0.35,
  radiusStep = 0.1,
  expansion = 0.1,
  taper = 1.5,
  rotation = 0,
  spin = 0,
  tilt = 0,
  dispersion = 0,
  grain = 0,
  opacity = 1,
  followMouse = false,
  mouseInfluence = 0.2,
  hoverScale = 1.2,
  hoverIntensity = 1,
  parallax = 0.05,
  clickBurst = true,
  intro = true,
  theme = "dark",
  maxDevicePixelRatio = 2,
  className = "",
  style,
  centerOffset = [0, 0],
}: MagicRingsProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wakeRef = useRef<(() => void) | null>(null);
  const [generation, setGeneration] = useState(0);

  const light = theme === "light";
  const first = parseColor(color);
  const second = parseColor(colorTwo);
  const settings: MagicRingsSettings = {
    color: light
      ? first
      : (first.map(toLinear) as [number, number, number]),
    colorTwo: light
      ? second
      : (second.map(toLinear) as [number, number, number]),
    ringCount: clamp(Math.round(ringCount), 1, MAX_RINGS),
    motion: MOTIONS.includes(motion) ? motion : "pulse",
    speed: Math.max(0, speed),
    lineThickness: Math.max(0.25, lineThickness),
    glow: clamp(glow, 0, 3),
    baseRadius: Math.max(0.01, baseRadius),
    radiusStep: Math.max(0, radiusStep),
    expansion,
    taper: Math.max(0.5, taper),
    rotation: (rotation * Math.PI) / 180,
    spin,
    tilt: clamp(tilt, -80, 80),
    dispersion: clamp(dispersion, 0, 1),
    grain: clamp(grain, 0, 1),
    opacity: clamp(opacity, 0, 1),
    followMouse,
    mouseInfluence,
    hoverScale: Math.max(0.5, hoverScale),
    hoverIntensity: Math.max(0, hoverIntensity),
    parallax,
    clickBurst,
    intro,
    light,
    maxRatio: clamp(maxDevicePixelRatio, 0.5, 3),
    centerOffset,
  };
  const settingsRef = useRef<MagicRingsSettings>(settings);

  useEffect(() => {
    settingsRef.current = settings;
    wakeRef.current?.();
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "default",
    });
    if (!gl) return;

    const programs = new Map<string, CompiledProgram | null>();
    const programFor = (name: FragmentName, flags: string[]): CompiledProgram | null => {
      const key = `${name}|${flags.join(",")}`;
      if (!programs.has(key)) {
        const vertex = shaderSource(name === "line" ? STRIP : FULLSCREEN, flags);
        programs.set(
          key,
          link(gl, vertex, shaderSource(`${COMMON}${FRAGMENTS[name]}`, flags))
        );
      }
      return programs.get(key) ?? null;
    };

    if (!programFor("glow", []) || !programFor("compose", []) || !programFor("line", [])) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vao = gl.createVertexArray();
    const stripVao = gl.createVertexArray();
    const stripBuffer = gl.createBuffer();
    const strip = new Float32Array((SEGMENTS + 1) * 4);
    for (let index = 0; index <= SEGMENTS; index++) {
      strip.set([index / SEGMENTS, -1, index / SEGMENTS, 1], index * 4);
    }
    gl.bindVertexArray(stripVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, stripBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, strip, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    const glowTexture = gl.createTexture();
    const glowBuffer = gl.createFramebuffer();
    const glowSize = { width: 0, height: 0 };
    let floatGlow = Boolean(gl.getExtension("EXT_color_buffer_float"));
    const shape = new Float32Array(SLOTS * 4);
    const frameData = new Float32Array(SLOTS * 4);
    const tints = new Float32Array(SLOTS * 4);
    const size = { width: 1, height: 1, ratio: 1, unit: 1 };
    const pointer = { x: 0, y: 0, inside: false, touch: false };
    const spring = { x: 0, y: 0, vx: 0, vy: 0, hover: 0, hoverVelocity: 0 };
    const bursts: Burst[] = [];
    let introLive =
      settingsRef.current.intro &&
      settingsRef.current.speed > 0 &&
      !reduced &&
      generation === 0;
    let time = introLive ? 0 : 1.6;
    let clock = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    let pageVisible = document.visibilityState !== "hidden";
    let lost = false;

    const resize = (): void => {
      const s = settingsRef.current;
      const rect = container.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, s.maxRatio);
      const width = Math.max(1, Math.round(rect.width * ratio));
      const height = Math.max(1, Math.round(rect.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      Object.assign(size, {
        width,
        height,
        ratio,
        unit: Math.max(1, Math.min(width, height)),
      });
      const glowWidth = Math.max(1, Math.ceil(width / 2));
      const glowHeight = Math.max(1, Math.ceil(height / 2));
      if (glowSize.width === glowWidth && glowSize.height === glowHeight) return;
      Object.assign(glowSize, { width: glowWidth, height: glowHeight });

      const allocate = (useFloat: boolean): boolean => {
        gl.bindTexture(gl.TEXTURE_2D, glowTexture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          useFloat ? gl.RGBA16F : gl.RGBA8,
          glowWidth,
          glowHeight,
          0,
          gl.RGBA,
          useFloat ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE,
          null
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindFramebuffer(gl.FRAMEBUFFER, glowBuffer);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          glowTexture,
          0
        );
        const complete =
          gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return complete;
      };

      if (!allocate(floatGlow)) {
        floatGlow = false;
        allocate(false);
      }
    };

    const ringState = (
      s: MagicRingsSettings,
      index: number,
      count: number
    ): { radius: number; life: number; virtual: number; mix: number; opening: number } => {
      const mix = count > 1 ? index / (count - 1) : 0;
      if (s.motion === "ripple") {
        const span = count * s.radiusStep + s.expansion;
        const period = CYCLE * Math.max(1, count) * 0.32;
        const phase = time / period + index / count;
        const progress = phase - Math.floor(phase);
        const born = time - progress * period >= -1e-4 || !introLive;
        const life = born
          ? smoothstep(0, 0.12, progress) * (1 - smoothstep(0.62, 1, progress))
          : 0;
        const position = progress * Math.max(1, count - 1);
        return {
          radius: s.baseRadius + progress * span,
          life,
          virtual: position,
          mix: progress,
          opening: 1,
        };
      }
      if (s.motion === "breathe") {
        const wave = Math.sin((time / 4) * Math.PI * 2 - index * 0.55);
        const rise = introLive
          ? smoothstep(index * 0.12, index * 0.12 + 0.9, time)
          : 1;
        return {
          radius:
            s.baseRadius +
            index * s.radiusStep +
            s.expansion * 0.5 * (1 + wave),
          life: (0.78 + 0.22 * wave) * rise,
          virtual: index,
          mix,
          opening: 1,
        };
      }
      const local = time - index * STAGGER;
      const t = ((local % CYCLE) + CYCLE) % CYCLE;
      const life = introLive && local < 0 ? 0 : pulseLife(t);
      return {
        radius:
          s.baseRadius +
          index * s.radiusStep +
          (1 - Math.pow(1 - t / CYCLE, 2)) * s.expansion,
        life,
        virtual: index,
        mix,
        opening: introLive && local < CYCLE ? smoothstep(0, 0.9, local) : 1,
      };
    };

    const render = (): void => {
      const s = settingsRef.current;
      const count = s.ringCount;
      const hover = spring.hover;
      const still = reduced ? 0 : 1;
      const scale = 1 + (s.hoverScale - 1) * hover * still;
      const mouseX = spring.x * still;
      const mouseY = spring.y * still;
      const leanX = s.tilt - mouseY * s.parallax * 260;
      const leanY = mouseX * s.parallax * 260;
      const view = planeFor(leanX, leanY);
      const center = [
        (s.followMouse ? mouseX * s.mouseInfluence : 0) + s.centerOffset[0],
        (s.followMouse ? mouseY * s.mouseInfluence : 0) + s.centerOffset[1],
      ];
      const spinBase = s.spin * time * 0.6;

      let slots = 0;
      let lowest = Infinity;
      let highest = 0;
      let shiftMax = 0;
      const place = (
        radius: number,
        life: number,
        cut: number,
        angle: number,
        shiftX: number,
        shiftY: number,
        mix: number,
        width: number
      ): void => {
        if (life <= 0.002) return;
        const gain = 10 * radius * cut * cut * cut;
        shape.set(
          [radius, life, gain, gain > 6.2 ? Math.cbrt(6.2 / gain) : 2],
          slots * 4
        );
        frameData.set(
          [shiftX, shiftY, Math.cos(angle), Math.sin(angle)],
          slots * 4
        );
        tints.set(
          [
            s.color[0] + (s.colorTwo[0] - s.color[0]) * mix,
            s.color[1] + (s.colorTwo[1] - s.color[1]) * mix,
            s.color[2] + (s.colorTwo[2] - s.color[2]) * mix,
            width,
          ],
          slots * 4
        );
        lowest = Math.min(lowest, radius);
        highest = Math.max(highest, radius);
        shiftMax = Math.max(shiftMax, Math.hypot(shiftX, shiftY));
        slots++;
      };

      for (let index = 0; index < count; index++) {
        const state = ringState(s, index, count);
        let radius = state.radius * scale;
        let life = state.life;
        for (const burst of bursts) {
          const age = clock - burst.start;
          const wave = (burst.radius + age * BURST_SPEED) * scale;
          const fade = Math.pow(Math.max(0, 1 - age / BURST_LIFE), 1.5);
          const gap = (wave - radius) / 0.08;
          radius += 0.04 * Math.exp(-gap * gap) * fade;
          life = Math.min(1.6, life + 0.9 * Math.exp(-gap * gap * 1.6) * fade);
        }
        const cut =
          Math.pow(s.taper, state.virtual) / Math.max(0.08, state.opening);
        const angle =
          s.rotation +
          spinBase * (index % 2 ? -1 : 1) * (1 + index * 0.15);
        place(
          radius,
          life,
          cut,
          angle,
          index * s.parallax * mouseX,
          index * s.parallax * mouseY,
          state.mix,
          1
        );
      }
      for (const burst of bursts) {
        const age = clock - burst.start;
        const fade = Math.pow(Math.max(0, 1 - age / BURST_LIFE), 1.5);
        const radius = (burst.radius + age * BURST_SPEED) * scale;
        place(
          radius,
          1.5 * fade,
          0.85,
          s.rotation,
          0,
          0,
          clamp(age / BURST_LIFE, 0, 1),
          1.15
        );
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (!slots) return;

      const flags: string[] = [];
      if (s.light) flags.push("LIGHT");
      if (s.dispersion > 0) flags.push("PRISM");
      if (!floatGlow) flags.push("PACKED");

      const glowProgram = programFor("glow", flags);
      const composeProgram = programFor("compose", flags);
      const lineProgram = programFor("line", flags);
      if (!glowProgram || !composeProgram || !lineProgram) return;

      const glowScale = (s.light ? 0.3 : 1) * (1 - s.dispersion * 0.45);
      const outer = 0.012 + 0.033 * s.glow;
      const innerAmount = 0.5 * Math.min(1, s.glow) * glowScale;
      const outerAmount = 0.9 * s.glow * glowScale;
      const range = outer * 4.5 + 0.008;
      const split = s.dispersion * 0.03;
      const margin = range + split * highest + shiftMax + 0.01;
      const width = s.lineThickness * size.ratio;
      const reach = width * (1 + 0.45 * s.hoverIntensity) * 1.15 + 1.5;
      const cursor = project(view.inverse, pointer.x, pointer.y);

      const shared = (program: CompiledProgram): Record<string, WebGLUniformLocation | null> => {
        const u = program.uniforms;
        gl.useProgram(program.program);
        if (u.uResolution) gl.uniform2f(u.uResolution, canvas.width, canvas.height);
        if (u.uUnit) gl.uniform1f(u.uUnit, size.unit);
        if (u.uCenter) gl.uniform2f(u.uCenter, center[0], center[1]);
        if (u.uCount) gl.uniform1i(u.uCount, slots);
        if (u.uShape) gl.uniform4fv(u.uShape, shape);
        if (u.uFrame) gl.uniform4fv(u.uFrame, frameData);
        if (u.uTint) gl.uniform4fv(u.uTint, tints);
        if (u.uHover) {
          gl.uniform4f(
            u.uHover,
            cursor[0] - center[0],
            cursor[1] - center[1],
            hover * s.hoverIntensity,
            1 / 0.03
          );
        }
        if (u.uSplit) gl.uniform1f(u.uSplit, split);
        if (u.uOpacity) gl.uniform1f(u.uOpacity, s.opacity);
        return u;
      };

      gl.bindVertexArray(vao);
      gl.bindFramebuffer(gl.FRAMEBUFFER, glowBuffer);
      gl.viewport(0, 0, glowSize.width, glowSize.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const glowUniforms = shared(glowProgram);
      if (glowUniforms.uScale) {
        gl.uniform2f(
          glowUniforms.uScale,
          canvas.width / glowSize.width,
          canvas.height / glowSize.height
        );
      }
      if (glowUniforms.uInverse) {
        gl.uniformMatrix3fv(glowUniforms.uInverse, true, new Float32Array(view.inverse));
      }
      if (glowUniforms.uBounds) {
        gl.uniform2f(glowUniforms.uBounds, Math.max(0, lowest - margin), highest + margin);
      }
      if (glowUniforms.uHalo) {
        gl.uniform4f(glowUniforms.uHalo, 0, 1 / outer, innerAmount, outerAmount);
      }
      if (glowUniforms.uRange) {
        gl.uniform3f(glowUniforms.uRange, range * 0.45, 1 / (range * 0.55), range);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const composeUniforms = shared(composeProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, glowTexture);
      if (composeUniforms.uGlow) gl.uniform1i(composeUniforms.uGlow, 0);
      if (composeUniforms.uGrain) gl.uniform1f(composeUniforms.uGrain, s.grain);
      if (composeUniforms.uTime) gl.uniform1f(composeUniforms.uTime, clock);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      const lineUniforms = shared(lineProgram);
      if (lineUniforms.uForward) {
        gl.uniformMatrix3fv(lineUniforms.uForward, true, new Float32Array(view.forward));
      }
      if (lineUniforms.uReach) gl.uniform1f(lineUniforms.uReach, reach);
      if (lineUniforms.uWidth) gl.uniform1f(lineUniforms.uWidth, width);
      gl.enable(gl.BLEND);
      if (s.light) gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      else gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.bindVertexArray(stripVao);
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, (SEGMENTS + 1) * 2, slots);
      gl.disable(gl.BLEND);
      gl.bindVertexArray(null);
    };

    const frame = (now: number): void => {
      raf = 0;
      if (lost) return;
      const s = settingsRef.current;
      const dt = clamp((now - last) / 1000 || 0, 0, 0.05);
      last = Math.max(last, now);
      clock += dt;
      if (!reduced) time += dt * s.speed;

      const targetX = pointer.inside
        ? pointer.x / Math.max(1e-6, size.width / size.unit)
        : 0;
      const targetY = pointer.inside
        ? pointer.y / Math.max(1e-6, size.height / size.unit)
        : 0;
      const stiffness = 70;
      const damping = 2 * Math.sqrt(stiffness) * 0.9;
      const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
      const h = dt / steps;
      for (let step = 0; step < steps; step++) {
        spring.vx += (stiffness * (targetX - spring.x) - damping * spring.vx) * h;
        spring.vy += (stiffness * (targetY - spring.y) - damping * spring.vy) * h;
        spring.x += spring.vx * h;
        spring.y += spring.vy * h;
        const hoverTarget = pointer.inside ? 1 : 0;
        spring.hoverVelocity +=
          (40 * (hoverTarget - spring.hover) - 2 * Math.sqrt(40) * spring.hoverVelocity) * h;
        spring.hover += spring.hoverVelocity * h;
      }

      for (let index = bursts.length - 1; index >= 0; index--) {
        if (clock - bursts[index].start > BURST_LIFE) bursts.splice(index, 1);
      }
      if (introLive && time > (s.ringCount + 2) * STAGGER + CYCLE) {
        introLive = false;
      }

      render();

      const settling =
        Math.abs(spring.vx) + Math.abs(spring.vy) + Math.abs(spring.hoverVelocity) > 1e-4 ||
        Math.abs((pointer.inside ? 1 : 0) - spring.hover) > 1e-3;
      const busy = (s.speed > 0 && !reduced) || settling || bursts.length > 0 || introLive;
      if (busy && visible && pageVisible) raf = requestAnimationFrame(frame);
    };

    const wake = (): void => {
      if (raf || lost || !visible || !pageVisible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    wakeRef.current = () => {
      resize();
      wake();
    };

    const locate = (event: PointerEvent): { x: number; y: number; inside: boolean } => {
      const rect = container.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      const unit = Math.max(1, Math.min(rect.width, rect.height));
      return {
        x: (event.clientX - rect.left - rect.width / 2) / unit,
        y: (rect.top + rect.height / 2 - event.clientY) / unit,
        inside,
      };
    };

    const onPointerMove = (event: PointerEvent): void => {
      if (event.pointerType === "touch" && !pointer.touch) return;
      const spot = locate(event);
      pointer.x = spot.x;
      pointer.y = spot.y;
      pointer.inside = spot.inside;
      wake();
    };

    const onPointerDown = (event: PointerEvent): void => {
      const spot = locate(event);
      if (!spot.inside) return;
      pointer.x = spot.x;
      pointer.y = spot.y;
      pointer.inside = true;
      pointer.touch = event.pointerType === "touch";
      const s = settingsRef.current;
      if (s.clickBurst && !reduced) {
        bursts.push({
          start: clock,
          radius: Math.max(0.04, s.baseRadius * 0.45),
        });
        if (bursts.length > MAX_BURSTS) bursts.shift();
      }
      wake();
    };

    const onPointerUp = (event: PointerEvent): void => {
      if (event.pointerType !== "touch") return;
      pointer.touch = false;
      pointer.inside = false;
      wake();
    };

    const onLeave = (): void => {
      pointer.inside = false;
      wake();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    const onLost = (event: Event): void => {
      event.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onRestored = (): void => setGeneration((value) => value + 1);
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      wake();
    });
    resizeObserver.observe(container);

    const intersection = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      wake();
    });
    intersection.observe(container);

    const onVisibility = (): void => {
      pageVisible = document.visibilityState !== "hidden";
      wake();
    };
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    wake();

    return () => {
      cancelAnimationFrame(raf);
      wakeRef.current = null;
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      if (!gl.isContextLost()) {
        gl.deleteVertexArray(vao);
        gl.deleteTexture(glowTexture);
        gl.deleteFramebuffer(glowBuffer);
        programs.forEach((entry) => {
          if (entry) gl.deleteProgram(entry.program);
        });
        gl.deleteVertexArray(stripVao);
        gl.deleteBuffer(stripBuffer);
      }
    };
  }, [generation]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden magic-rings${className ? ` ${className}` : ""}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none magic-rings__canvas"
        aria-hidden="true"
      />
    </div>
  );
}

export default MagicRings;
