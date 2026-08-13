"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LogoStream } from "@/components/brand/LogoStream";
import { cn } from "@/lib/cn";

const BOOT_MS = 2600;
const ROUTE_MS = 1250;
const EXIT_MS = 560;
const STORAGE_KEY = "ist-boot-loader";

/**
 * Premium full-screen logo reveal on first visit + soft route transitions.
 */
export function RouteLoader() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [mode, setMode] = useState<"boot" | "route">("boot");
  const [cycle, setCycle] = useState(0);
  const skipFirstPath = useRef(true);
  const timers = useRef<number[]>([]);

  function clearTimers() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }

  function run(nextMode: "boot" | "route") {
    clearTimers();
    setMode(nextMode);
    setExiting(false);
    setCycle((n) => n + 1);
    setActive(true);
    document.documentElement.dataset.loader = "on";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 320 : nextMode === "boot" ? BOOT_MS : ROUTE_MS;

    timers.current.push(
      window.setTimeout(() => {
        setExiting(true);
        timers.current.push(
          window.setTimeout(() => {
            setActive(false);
            setExiting(false);
            delete document.documentElement.dataset.loader;
          }, EXIT_MS),
        );
      }, hold),
    );
  }

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (!seen) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* private mode */
      }
      run("boot");
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (skipFirstPath.current) {
      skipFirstPath.current = false;
      return;
    }
    if (pathname.startsWith("/admin")) {
      clearTimers();
      setActive(false);
      setExiting(false);
      delete document.documentElement.dataset.loader;
      return;
    }
    run("route");
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!active) return null;

  return (
    <div
      key={cycle}
      className={cn(
        "logo-loader",
        mode === "route" && "logo-loader--route",
        exiting && "logo-loader--exit",
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="logo-loader__veil" />
      <div className="logo-loader__grain" />
      <div className="logo-loader__vignette" />
      <LogoStream mode={mode} />
    </div>
  );
}
