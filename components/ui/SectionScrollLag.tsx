"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * Light velocity smear on page sections — trails while scrolling, settles
 * immediately when scroll stops (no stop-then-catch-up slide).
 * Half prior strength. No-op under prefers-reduced-motion.
 */
export function SectionScrollLag({ children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) return;

    const offsets = new WeakMap<HTMLElement, number>();
    let frame = 0;
    let running = true;
    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let vel = 0;

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const tick = () => {
      if (!running) return;

      const instant = scrollY - lastScrollY;
      lastScrollY = scrollY;
      vel += (instant - vel) * 0.32;

      const nodes = root.children;
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i];
        if (!(el instanceof HTMLElement)) continue;

        if (el.dataset.scrollLag === "off") {
          el.style.transform = "";
          continue;
        }

        // Half prior strength; tiny stagger so sections don't lock as one slab
        const gain = 0.55 + (i % 3) * 0.08;
        const target = Math.max(-26, Math.min(26, vel * gain));
        let cur = offsets.get(el) ?? 0;
        cur += (target - cur) * 0.34;
        offsets.set(el, cur);

        if (Math.abs(cur) < 0.05) {
          el.style.transform = "";
          el.style.willChange = "";
        } else {
          el.style.transform = `translate3d(0, ${cur.toFixed(2)}px, 0)`;
          el.style.willChange = "transform";
        }
      }

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      const nodes = root.children;
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i];
        if (el instanceof HTMLElement) {
          el.style.transform = "";
          el.style.willChange = "";
        }
      }
    };
  }, [reduceMotion]);

  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  );
}
