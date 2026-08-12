"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

import "lenis/dist/lenis.css";

type Props = {
  children: ReactNode;
};

/**
 * Sitewide smooth scroll (Lenis) — same approach as polished portfolio sites:
 * wheel input is lerped so the page eases into motion instead of jumping.
 * Honors prefers-reduced-motion via Lenis autoToggle.
 */
export function SmoothScroll({ children }: Props) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        // Soft delay like https://julianscott.vercel.app — low lerp = more glide
        lerp: 0.075,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.15,
        autoToggle: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
