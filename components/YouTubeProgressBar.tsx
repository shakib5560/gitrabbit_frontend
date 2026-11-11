"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  Suspense,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { MotionConfig } from "framer-motion";

interface ProgressBarContextType {
  start: () => void;
  complete: () => void;
  set: (percentage: number) => void;
  isLoading: boolean;
  progress: number;
  visible: boolean;
  registerElements: (container: HTMLDivElement | null, bar: HTMLDivElement | null) => void;
  unregisterElements: (container: HTMLDivElement | null, bar: HTMLDivElement | null) => void;
}

const ProgressBarContext = createContext<ProgressBarContextType>({
  start: () => {},
  complete: () => {},
  set: () => {},
  isLoading: false,
  progress: 0,
  visible: false,
  registerElements: () => {},
  unregisterElements: () => {},
});

export const useProgressBar = () => useContext(ProgressBarContext);

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function RouteWatcher({ onComplete }: { onComplete: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    onComplete();
  }, [pathname, searchParams, onComplete]);

  return null;
}

type AnimPhase = "idle" | "running" | "completing" | "holding" | "fading";

export function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerElRef = useRef<HTMLDivElement | null>(null);
  const barElRef = useRef<HTMLDivElement | null>(null);

  const animRef = useRef<{
    phase: AnimPhase;
    value: number; // 0..1
    opacity: number; // 0..1
    lastTime: number;
    phaseStartTime: number;
    completeFrom: number;
    completeDuration: number;
    rafId: number | null;
  }>({
    phase: "idle",
    value: 0,
    opacity: 0,
    lastTime: 0,
    phaseStartTime: 0,
    completeFrom: 0,
    completeDuration: 240,
    rafId: null,
  });

  const paint = useCallback(() => {
    const { value, opacity } = animRef.current;
    if (barElRef.current) {
      barElRef.current.style.transform = `scaleX(${value})`;
    }
    if (containerElRef.current) {
      containerElRef.current.style.opacity = `${opacity}`;
    }
  }, []);

  const stopRaf = useCallback(() => {
    if (animRef.current.rafId !== null) {
      cancelAnimationFrame(animRef.current.rafId);
      animRef.current.rafId = null;
    }
  }, []);

  const tickRef = useRef<(now: number) => void>(() => {});

  useEffect(() => {
    tickRef.current = (now: number) => {
      const anim = animRef.current;
      const dt = Math.min(0.05, Math.max(0.001, (now - anim.lastTime) / 1000));
      anim.lastTime = now;

      if (anim.phase === "running") {
        const v = anim.value;
        // Smooth 3-tier YouTube pacing with blended velocity transitions:
        // 1) Initial surge (0 -> ~35%): quick responsive takeoff
        // 2) Cruise (~35% -> ~72%): steady decelerating glide
        // 3) Tail crawl (~72% -> 94%): gentle asymptotic drift while waiting
        const surgeSpeed = 2.35 * (1 - v * 0.55);
        const cruiseSpeed = 0.62 * (1.05 - v);
        const crawlSpeed = Math.max(0.015, (0.94 - v) * 0.45);

        const blend1 = smoothstep(0.24, 0.4, v);
        const blend2 = smoothstep(0.64, 0.78, v);

        const speedToCruise = surgeSpeed * (1 - blend1) + cruiseSpeed * blend1;
        const speed = speedToCruise * (1 - blend2) + crawlSpeed * blend2;

        anim.value = Math.min(0.94, v + speed * dt);
        anim.opacity = 1;
        paint();
        anim.rafId = requestAnimationFrame((t) => tickRef.current(t));
        return;
      }

      if (anim.phase === "completing") {
        const elapsed = now - anim.phaseStartTime;
        const t = Math.min(1, elapsed / anim.completeDuration);
        const eased = easeOutCubic(t);
        anim.value = anim.completeFrom + (1 - anim.completeFrom) * eased;
        anim.opacity = 1;
        paint();

        if (t >= 1) {
          anim.phase = "holding";
          anim.phaseStartTime = now;
        }
        anim.rafId = requestAnimationFrame((next) => tickRef.current(next));
        return;
      }

      if (anim.phase === "holding") {
        if (now - anim.phaseStartTime >= 90) {
          anim.phase = "fading";
          anim.phaseStartTime = now;
        }
        anim.rafId = requestAnimationFrame((next) => tickRef.current(next));
        return;
      }

      if (anim.phase === "fading") {
        const t = Math.min(1, (now - anim.phaseStartTime) / 240);
        anim.opacity = 1 - easeOutCubic(t);
        paint();

        if (t >= 1) {
          anim.phase = "idle";
          anim.value = 0;
          anim.opacity = 0;
          anim.rafId = null;
          setVisible(false);
          setProgress(0);
          return;
        }
        anim.rafId = requestAnimationFrame((next) => tickRef.current(next));
        return;
      }

      anim.rafId = null;
    };
  }, [paint]);

  const ensureRunningLoop = useCallback(() => {
    if (animRef.current.rafId === null) {
      animRef.current.lastTime = performance.now();
      animRef.current.rafId = requestAnimationFrame((t) => tickRef.current(t));
    }
  }, []);

  const registerElements = useCallback(
    (container: HTMLDivElement | null, bar: HTMLDivElement | null) => {
      containerElRef.current = container;
      barElRef.current = bar;
      if (container || bar) {
        paint();
      }
    },
    [paint]
  );

  const unregisterElements = useCallback(
    (container: HTMLDivElement | null, bar: HTMLDivElement | null) => {
      if (containerElRef.current === container) {
        containerElRef.current = null;
      }
      if (barElRef.current === bar) {
        barElRef.current = null;
      }
    },
    []
  );

  const start = useCallback(() => {
    stopRaf();
    const now = performance.now();
    animRef.current.phase = "running";
    animRef.current.value = 0;
    animRef.current.opacity = 1;
    animRef.current.lastTime = now;
    animRef.current.phaseStartTime = now;

    setVisible(true);
    setIsLoading(true);
    setProgress(1);
    paint();
    ensureRunningLoop();
  }, [ensureRunningLoop, paint, stopRaf]);

  const complete = useCallback(() => {
    const anim = animRef.current;
    if (anim.phase === "idle" || anim.phase === "fading") {
      return;
    }

    const now = performance.now();
    const remaining = Math.max(0, 1 - anim.value);
    // Keep fast route transitions feeling fluid and never abrupt
    anim.completeFrom = anim.value;
    anim.completeDuration = Math.max(200, Math.min(340, 180 + remaining * 180));
    anim.phase = "completing";
    anim.phaseStartTime = now;
    anim.lastTime = now;

    setIsLoading(false);
    setProgress(100);
    ensureRunningLoop();
  }, [ensureRunningLoop]);

  const setManual = useCallback(
    (percentage: number) => {
      stopRaf();
      const val = Math.min(100, Math.max(0, percentage));
      const norm = val / 100;

      animRef.current.value = norm;
      animRef.current.opacity = 1;
      setVisible(true);
      setProgress(val);
      setIsLoading(val < 100);

      if (val >= 100) {
        animRef.current.phase = "completing";
        animRef.current.completeFrom = norm;
        animRef.current.completeDuration = 120;
        animRef.current.phaseStartTime = performance.now();
        ensureRunningLoop();
      } else {
        animRef.current.phase = "running";
        paint();
      }
    },
    [ensureRunningLoop, paint, stopRaf]
  );

  // Global click listener for internal link navigation
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");

      if (
        href &&
        !href.startsWith("http://") &&
        !href.startsWith("https://") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        targetAttr !== "_blank"
      ) {
        const [pathPart, hashPart] = href.split("#");

        // Ignore hash jumps on the same page
        if (hashPart && (!pathPart || pathPart === window.location.pathname)) {
          return;
        }

        if (pathPart !== window.location.pathname) {
          start();
        }
      }
    };

    const handlePopState = () => {
      start();
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      stopRaf();
    };
  }, [start, stopRaf]);

  return (
    <ProgressBarContext.Provider
      value={{
        start,
        complete,
        set: setManual,
        isLoading,
        progress,
        visible,
        registerElements,
        unregisterElements,
      }}
    >
      <Suspense fallback={null}>
        <RouteWatcher onComplete={complete} />
      </Suspense>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </ProgressBarContext.Provider>
  );
}

/**
 * YouTube-style Progress Bar UI Component
 * Docked seamlessly along the bottom edge of the navbar, driven at display refresh rate
 * via GPU scaleX with smooth multi-phase pace transitions.
 */
export function YouTubeProgressBar() {
  const { visible, registerElements, unregisterElements } = useProgressBar();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const bar = barRef.current;
    if (visible) {
      registerElements(container, bar);
    }
    return () => {
      unregisterElements(container, bar);
    };
  }, [visible, registerElements, unregisterElements]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 h-[2px] z-50 pointer-events-none overflow-hidden"
      style={{ opacity: 1, willChange: "opacity" }}
    >
      <div
        ref={barRef}
        className="w-full h-full origin-left bg-gradient-to-r from-[#F5C518]/85 via-[#F5C518] to-[#FFF0A8]"
        style={{
          transform: "scaleX(0)",
          willChange: "transform",
          boxShadow: "0 0 8px rgba(245, 197, 24, 0.35)",
        }}
      />
    </div>
  );
}
