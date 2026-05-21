"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  /** Pass the MouseEvent so the ripple originates from the button's exact position */
  toggleTheme: (event?: React.MouseEvent<HTMLElement>) => void;
};

// Shape of a single pending ripple — everything the overlay needs to render
interface RippleSnapshot {
  /** Incrementing integer — forces React to unmount + remount a fresh motion.div */
  key: number;
  originX: number;
  originY: number;
  /** Radius that guarantees the circle covers the farthest viewport corner */
  maxRadius: number;
  /** Background color of the incoming theme */
  bgColor: string;
  /** The theme we are transitioning TO */
  nextTheme: Theme;
}

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "gitrabbit-theme";

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Active ripple — null means no overlay is mounted
  const [ripple, setRipple] = useState<RippleSnapshot | null>(null);

  // ── Refs (never go stale inside async callbacks) ──────────────────────────
  // Always mirrors `theme` state — read this inside closures, not `theme`
  const themeRef = useRef<Theme>("dark");
  // Monotonically-incrementing ripple key — guarantees a fresh motion.div mount
  const rippleKeyRef = useRef(0);
  // Guards against double-clicks while an animation is in flight
  const isAnimating = useRef(false);

  // Keep themeRef in sync with React state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    themeRef.current = theme;
  });

  // ── Mount: sync from DOM (set synchronously by the inline <head> script) ──
  useEffect(() => {
    const domTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    themeRef.current = domTheme;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(domTheme);
    setMounted(true);
  }, []);

  // ── Apply .dark class + color-scheme + persist ────────────────────────────
  // NOTE: We deliberately do NOT call setTheme here — this effect only *applies*
  // an already-decided theme value to the DOM. Calling setTheme from inside a
  // setTheme-triggered effect would create an infinite loop.
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private/incognito mode — ignore
    }
  }, [theme, mounted]);

  // ─────────────────────────────────────────────
  // Ripple complete handler
  // Called by the motion.div's onAnimationComplete prop
  // ─────────────────────────────────────────────
  const handleRippleComplete = useCallback((nextTheme: Theme) => {
    // Phase 2: The ripple now covers the entire screen.
    // Apply the real theme class synchronously so there is zero visible gap.
    flushSync(() => setTheme(nextTheme));

    // Phase 3: Give React one microtask to commit the class update, then
    // unmount the overlay. 50ms is imperceptible but avoids a 1-frame flash.
    setTimeout(() => {
      setRipple(null);
      isAnimating.current = false;
    }, 50);
  }, []); // No deps — reads nextTheme from argument, not from closure

  // ─────────────────────────────────────────────
  // toggleTheme
  // ─────────────────────────────────────────────
  const toggleTheme = useCallback((event?: React.MouseEvent<HTMLElement>) => {
    // Guard: ignore clicks while an animation is already in flight
    if (isAnimating.current) return;

    // Always read current theme from ref — never from the closure's stale copy
    const currentTheme = themeRef.current;
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced-motion / SSR: instant swap, skip animation entirely
    if (prefersReduced) {
      themeRef.current = nextTheme; // keep ref in sync before state update
      flushSync(() => setTheme(nextTheme));
      return;
    }

    // ── Ripple origin: bottom-left corner of the clicked button ───────────
    let originX = 0;
    let originY = typeof window !== "undefined" ? window.innerHeight : 0;

    if (event?.currentTarget) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      originX = rect.left;
      originY = rect.bottom;
    }

    // Radius that guarantees the circle reaches the farthest viewport corner
    const maxRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    );

    // Increment key — React treats this as an entirely new element, fully
    // unmounting the previous motion.div and mounting a fresh one.
    // This is the fix for "animation doesn't reset between clicks".
    rippleKeyRef.current += 1;

    // Lock further clicks
    isAnimating.current = true;

    // Update themeRef *before* the async animation so any code that reads the
    // ref during the 600ms animation window sees the correct incoming theme.
    themeRef.current = nextTheme;

    // Mount the overlay — the motion.div will animate from initial → animate
    setRipple({
      key: rippleKeyRef.current,
      originX,
      originY,
      maxRadius,
      bgColor: nextTheme === "dark" ? "#0A0B10" : "#F8FAFC",
      nextTheme,
    });
  }, []); // ← intentionally empty: all reads go through themeRef, not state

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/*
        Full-screen ripple overlay.
        AnimatePresence handles mount/unmount lifecycle.
        The `key` prop (ripple.key) forces a fresh motion.div on every toggle,
        so Framer Motion never tries to interpolate from a previous animation's
        end-state — which was the root cause of the "breaks on repeat" bug.
      */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            key={ripple.key}
            aria-hidden="true"
            initial={{
              clipPath: `circle(0px at ${ripple.originX}px ${ripple.originY}px)`,
            }}
            animate={{
              clipPath: `circle(${ripple.maxRadius}px at ${ripple.originX}px ${ripple.originY}px)`,
            }}
            // No exit animation — we hide it instantly after setTheme commits
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1], // fast-out, slow-in — ink-bleed feel
            }}
            onAnimationComplete={() => handleRippleComplete(ripple.nextTheme)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              pointerEvents: "none",
              background: ripple.bgColor,
              willChange: "clip-path",
            }}
          />
        )}
      </AnimatePresence>

      {children}
    </ThemeContext.Provider>
  );
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
