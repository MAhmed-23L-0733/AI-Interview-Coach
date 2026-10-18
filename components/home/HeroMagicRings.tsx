"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MagicRings } from "@/components/ui/MagicRings";

const emptySubscribe = (): (() => void) => () => {};

/**
 * Client leaf component rendering the MagicRings WebGL visual
 * positioned behind the Hero headline and actions.
 * Colors are calibrated to match the ModeroIQ design system:
 * - Primary: #3B82F6 (Electric Blue)
 * - Accent: #10B981 (Emerald)
 */
export function HeroMagicRings(): React.JSX.Element {
  const { resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isLight = mounted && resolvedTheme === "light";

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <MagicRings
        color="#3B82F6"
        colorTwo="#10B981"
        ringCount={10}
        motion="pulse"
        speed={0.85}
        lineThickness={2.5}
        glow={1.4}
        baseRadius={0.35}
        radiusStep={0.18}
        expansion={0.12}
        tilt={-5}
        centerOffset={[0, 0.08]}
        followMouse={true}
        mouseInfluence={0.16}
        hoverScale={1.12}
        hoverIntensity={1.2}
        parallax={0.04}
        clickBurst={true}
        theme={isLight ? "light" : "dark"}
        opacity={1}
      />
    </div>
  );
}
