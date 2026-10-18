export const MAX_RINGS = 12;
export const MAX_BURSTS = 3;
export const SLOTS = MAX_RINGS + MAX_BURSTS;
export const SEGMENTS = 128;

export const MOTIONS = ["pulse", "ripple", "breathe"] as const;
export type MagicRingsMotion = (typeof MOTIONS)[number];

export const CYCLE = 3.45;
export const STAGGER = 0.5;
export const DEPTH = 2.6;
export const BURST_LIFE = 1.1;
export const BURST_SPEED = 0.9;

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const smoothstep = (from: number, to: number, value: number): number => {
  const t = clamp((value - from) / (to - from), 0, 1);
  return t * t * (3 - 2 * t);
};

export const pulseLife = (t: number): number =>
  Math.min(smoothstep(0, 0.7, t), 1 - smoothstep(0.5, 3.25, t));

export const toLinear = (channel: number): number =>
  channel <= 0.04045
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4);

export const parseColor = (value?: string): [number, number, number] => {
  const text = String(value || "").trim();
  const hex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text);
  if (hex) {
    const full =
      hex[1].length === 3
        ? hex[1].replace(/./g, (digit) => digit + digit)
        : hex[1];
    return [0, 2, 4].map(
      (index) => parseInt(full.slice(index, index + 2), 16) / 255
    ) as [number, number, number];
  }
  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(text);
  if (rgb) {
    return [rgb[1], rgb[2], rgb[3]].map((channel) =>
      clamp(parseFloat(channel) / 255, 0, 1)
    ) as [number, number, number];
  }
  if (typeof document !== "undefined") {
    const context = document.createElement("canvas").getContext("2d");
    if (context) {
      context.fillStyle = "#000000";
      context.fillStyle = text;
      const normal = String(context.fillStyle);
      if (normal !== "#000000" || /^(#0{3}|#0{6}|black)$/i.test(text)) {
        return parseColor(normal);
      }
    }
  }
  return [0.66, 0.33, 0.97];
};

export const compile = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader | null => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

export interface CompiledProgram {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
}

export const link = (
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string
): CompiledProgram | null => {
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = vertex && fragment ? gl.createProgram() : null;
  if (!vertex || !fragment || !program) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
  for (let index = 0; index < count; index++) {
    const info = gl.getActiveUniform(program, index);
    if (info) {
      uniforms[info.name.replace(/\[0\]$/, "")] = gl.getUniformLocation(
        program,
        info.name
      );
    }
  }
  return { program, uniforms };
};

export const invert = (m: number[]): number[] => {
  const [a, b, c, d, e, f, g, h, i] = m;
  const A = e * i - f * h;
  const B = f * g - d * i;
  const C = d * h - e * g;
  const det = a * A + b * B + c * C;
  return [
    A,
    c * h - b * i,
    b * f - c * e,
    B,
    a * i - c * g,
    c * d - a * f,
    C,
    b * g - a * h,
    a * e - b * d,
  ].map((value) => value / det);
};

export const planeFor = (
  tiltX: number,
  tiltY: number
): { forward: number[]; inverse: number[] } => {
  const ax = (tiltX * Math.PI) / 180;
  const ay = (tiltY * Math.PI) / 180;
  const cx = Math.cos(ax);
  const sx = Math.sin(ax);
  const cy = Math.cos(ay);
  const sy = Math.sin(ay);
  const forward = [
    cy,
    sy * sx,
    0,
    0,
    cx,
    0,
    (sy * cx) / DEPTH,
    -sx / DEPTH,
    1,
  ];
  return { forward, inverse: invert(forward) };
};

export const project = (
  m: number[],
  x: number,
  y: number
): [number, number, number] => {
  const w = m[6] * x + m[7] * y + m[8];
  return [
    (m[0] * x + m[1] * y + m[2]) / w,
    (m[3] * x + m[4] * y + m[5]) / w,
    w,
  ];
};
