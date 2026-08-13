"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { LogoStream } from "@/components/brand/LogoStream";
import { GlassSupportPanel } from "@/components/ui/GlassSupportPanel";
import { cn } from "@/lib/cn";
import { SUPPORT_LINE } from "@/lib/home";

const BOOT_VIDEO = "/video/A_light_stream_is_moving.mp4";
/** Fallback if the clip never fires `ended` (slow network / autoplay block). */
const BOOT_FALLBACK_MS = 14000;
/** Fade to black over the last moments of the boot clip. */
const BOOT_BLACKOUT_MS = 1100;
/** Hold full black before revealing the page. */
const BOOT_BLACK_HOLD_MS = 280;
/** Soft reveal from black into the homepage. */
const BOOT_EXIT_MS = 820;
const ROUTE_MS = 1250;
const EXIT_MS = 560;
export const BOOT_STORAGE_KEY = "ist-boot-loader-v2";

function hasSeenBoot() {
  try {
    return sessionStorage.getItem(BOOT_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markBootSeen() {
  try {
    sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
}

/**
 * First visit: full-screen boot video only.
 * Soft navigations (after boot): logo light-stream animation.
 */
export function RouteLoader() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [mode, setMode] = useState<"boot" | "route">("boot");
  const [cycle, setCycle] = useState(0);
  const timers = useRef<number[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishing = useRef(false);
  const modeRef = useRef<"boot" | "route">("boot");
  const blackoutAt = useRef<number | null>(null);
  /** Route animation only after first-visit boot is done (or already seen). */
  const routesReady = useRef(false);
  const prevPath = useRef(pathname);

  function clearTimers() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }

  function beginBlackout() {
    if (blackoutAt.current != null) return;
    blackoutAt.current = performance.now();
    setBlackout(true);
  }

  function finish() {
    if (finishing.current) return;
    finishing.current = true;
    clearTimers();
    const exitMs = modeRef.current === "boot" ? BOOT_EXIT_MS : EXIT_MS;
    if (modeRef.current === "boot") {
      markBootSeen();
      routesReady.current = true;
      // Release hero videos to start from 0 under the fade-out.
      delete document.documentElement.dataset.boot;
    }
    setExiting(true);
    timers.current.push(
      window.setTimeout(() => {
        setActive(false);
        setExiting(false);
        setBlackout(false);
        blackoutAt.current = null;
        finishing.current = false;
        delete document.documentElement.dataset.loader;
      }, exitMs),
    );
  }

  /** End of boot: ensure black, hold, then reveal page. */
  function scheduleBootFinish() {
    if (finishing.current) return;
    beginBlackout();
    const started = blackoutAt.current ?? performance.now();
    const elapsed = performance.now() - started;
    const remainingFade = Math.max(0, BOOT_BLACKOUT_MS - elapsed);
    clearTimers();
    timers.current.push(
      window.setTimeout(finish, remainingFade + BOOT_BLACK_HOLD_MS),
    );
  }

  function run(nextMode: "boot" | "route") {
    clearTimers();
    finishing.current = false;
    blackoutAt.current = null;
    modeRef.current = nextMode;
    setMode(nextMode);
    setExiting(false);
    setBlackout(false);
    setCycle((n) => n + 1);
    setActive(true);
    document.documentElement.dataset.loader = "on";
    if (nextMode === "boot") {
      document.documentElement.dataset.boot = "1";
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (nextMode === "boot") {
      if (reduce) {
        timers.current.push(window.setTimeout(finish, 320));
        return;
      }
      timers.current.push(window.setTimeout(scheduleBootFinish, BOOT_FALLBACK_MS));
      return;
    }

    const hold = reduce ? 320 : ROUTE_MS;
    timers.current.push(window.setTimeout(finish, hold));
  }

  useLayoutEffect(() => {
    if (pathname.startsWith("/admin")) {
      routesReady.current = true;
      delete document.documentElement.dataset.boot;
      delete document.documentElement.dataset.loader;
      return;
    }
    if (!hasSeenBoot()) {
      run("boot");
    } else {
      routesReady.current = true;
      delete document.documentElement.dataset.boot;
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Real navigations only — ignore mount / Strict Mode double-invoke.
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    if (pathname.startsWith("/admin")) {
      clearTimers();
      setActive(false);
      setExiting(false);
      setBlackout(false);
      finishing.current = false;
      blackoutAt.current = null;
      delete document.documentElement.dataset.loader;
      delete document.documentElement.dataset.boot;
      return;
    }

    // Never swap boot video for the logo animation on first visit.
    if (!routesReady.current) return;

    run("route");
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!active || mode !== "boot" || exiting) return;
    const el = videoRef.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.volume = 0;

    const fadeSeconds = BOOT_BLACKOUT_MS / 1000;

    const onTimeUpdate = () => {
      if (!Number.isFinite(el.duration) || el.duration <= 0) return;
      if (el.duration - el.currentTime <= fadeSeconds) {
        beginBlackout();
      }
    };

    const onEnded = () => scheduleBootFinish();
    const onError = () => scheduleBootFinish();
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("ended", onEnded);
    el.addEventListener("error", onError);

    const tryPlay = () => {
      const play = el.play();
      if (play && typeof play.catch === "function") {
        play.catch(() => {
          window.setTimeout(() => {
            el.play().catch(() => scheduleBootFinish());
          }, 50);
        });
      }
    };

    if (el.readyState >= 2) tryPlay();
    else el.addEventListener("loadeddata", tryPlay, { once: true });

    return () => {
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("error", onError);
      el.removeEventListener("loadeddata", tryPlay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, mode, cycle, exiting]);

  if (!active) return null;

  return (
    <div
      key={cycle}
      className={cn(
        "logo-loader",
        mode === "boot" && "logo-loader--boot-video",
        mode === "route" && "logo-loader--route",
        exiting && "logo-loader--exit",
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {mode === "boot" ? (
        <>
          <video
            ref={videoRef}
            className="logo-loader__video"
            src={BOOT_VIDEO}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden
          />
          <GlassSupportPanel
            mobile
            delay="320ms"
            className={cn(blackout && "logo-loader__boot-panel--dim")}
            lines={SUPPORT_LINE.lines}
            closer={SUPPORT_LINE.closer}
          />
          <div
            className={cn(
              "logo-loader__blackout",
              blackout && "logo-loader__blackout--on",
            )}
            aria-hidden
          />
        </>
      ) : (
        <>
          <div className="logo-loader__veil" />
          <div className="logo-loader__grain" />
          <div className="logo-loader__vignette" />
          <LogoStream mode={mode} />
        </>
      )}
    </div>
  );
}
