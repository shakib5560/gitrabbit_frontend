"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  Suspense,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface ProgressBarContextType {
  start: () => void;
  complete: () => void;
  set: (percentage: number) => void;
  isLoading: boolean;
  progress: number;
  visible: boolean;
}

const ProgressBarContext = createContext<ProgressBarContextType>({
  start: () => {},
  complete: () => {},
  set: () => {},
  isLoading: false,
  progress: 0,
  visible: false,
});

export const useProgressBar = () => useContext(ProgressBarContext);

function RouteWatcher({ onComplete }: { onComplete: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    // Route navigation completed
    onComplete();
  }, [pathname, searchParams, onComplete]);

  return null;
}

export function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const trickleRef = useRef<NodeJS.Timeout | null>(null);
  const fadeRef = useRef<NodeJS.Timeout | null>(null);
  const resetRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = () => {
    if (trickleRef.current) clearInterval(trickleRef.current);
    if (fadeRef.current) clearTimeout(fadeRef.current);
    if (resetRef.current) clearTimeout(resetRef.current);
  };

  const start = useCallback(() => {
    clearAllTimers();
    setVisible(true);
    setIsLoading(true);
    // Instant silky jump to 28%
    setProgress(28);

    // Natural fluid deceleration
    let current = 28;
    trickleRef.current = setInterval(() => {
      // Smooth asymptotic curve towards 88%
      const step = Math.max(0.4, (88 - current) * 0.12);
      current = Math.min(88, current + step);
      setProgress(current);

      if (current >= 88 && trickleRef.current) {
        clearInterval(trickleRef.current);
      }
    }, 220);
  }, []);

  const complete = useCallback(() => {
    if (trickleRef.current) clearInterval(trickleRef.current);

    // Swift smooth glide to 100%
    setProgress(100);
    setIsLoading(false);

    // Fade out after completion
    fadeRef.current = setTimeout(() => {
      setVisible(false);
      resetRef.current = setTimeout(() => {
        setProgress(0);
      }, 350);
    }, 260);
  }, []);

  const setManual = useCallback(
    (percentage: number) => {
      clearAllTimers();
      setVisible(true);
      const val = Math.min(100, Math.max(0, percentage));
      setProgress(val);
      setIsLoading(val < 100);

      if (val >= 100) {
        complete();
      }
    },
    [complete]
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
      clearAllTimers();
    };
  }, [start]);

  return (
    <ProgressBarContext.Provider
      value={{
        start,
        complete,
        set: setManual,
        isLoading,
        progress,
        visible,
      }}
    >
      <Suspense fallback={null}>
        <RouteWatcher onComplete={complete} />
      </Suspense>
      {children}
    </ProgressBarContext.Provider>
  );
}

/**
 * YouTube-style Minimalistic Progress Bar UI Component
 * Ultra-thin 1.5px hairline with silky transform animation and zero bulky glow or corner light.
 */
export function YouTubeProgressBar() {
  const { progress, visible } = useProgressBar();

  if (!visible && progress === 0) return null;

  const scale = progress / 100;
  const isFinishing = progress >= 100;

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 h-[1.5px] z-50 pointer-events-none overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 320ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Precision Hairline Progress Thread with GPU scaleX */}
      <div
        className="w-full h-full origin-left bg-gradient-to-r from-transparent via-[#F5C518]/70 to-[#F5C518]"
        style={{
          transform: `scaleX(${scale})`,
          transition: isFinishing
            ? "transform 240ms cubic-bezier(0.2, 0.9, 0.3, 1)"
            : "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 1px 4px rgba(245, 197, 24, 0.35)",
        }}
      >
        {/* Subtle, soft traveling light wave inside the thread */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            animation: "shimmer 2.2s linear infinite",
            backgroundSize: "200% 100%",
          }}
        />
      </div>
    </div>
  );
}
