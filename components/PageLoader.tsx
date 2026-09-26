"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * Minimalist, Premium Loading Animation
 * Compact size, ultra-smooth and slow graceful floating hop stride.
 * Built with user's pixel rabbit icon (/footerlogo.png).
 */
export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Relaxed, graceful timer so the user experiences the buttery smooth animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 950);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 bg-[#0A0B10]/95 backdrop-blur-md flex items-center justify-center select-none pointer-events-none"
        >
          {/* Soft ambient golden glow */}
          <div className="absolute w-32 h-32 rounded-full bg-brand-yellow/8 blur-2xl pointer-events-none" />

          {/* Minimalist Centered Icon Stage */}
          <div className="relative flex flex-col items-center">
            {/* Compact, refined size (48px) with slower, buttery smooth float & hop */}
            <motion.div
              animate={{
                y: [0, -6.5, 0.8, -3.5, 0],
                rotate: [0, -1.5, 1.5, -0.8, 0],
                scaleX: [1, 0.97, 1.03, 0.98, 1],
                scaleY: [1, 1.03, 0.97, 1.02, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.92,
                ease: [0.45, 0.05, 0.55, 0.95],
              }}
              className="relative w-12 h-12"
            >
              <Image
                src="/footerlogo.png"
                alt="Loading"
                fill
                priority
                sizes="48px"
                className="object-contain drop-shadow-[0_4px_12px_rgba(245,197,24,0.3)]"
              />
            </motion.div>

            {/* Synchronized gentle ground shadow */}
            <motion.div
              animate={{
                scaleX: [1, 0.78, 1.08, 0.84, 1],
                opacity: [0.45, 0.18, 0.55, 0.24, 0.45],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.92,
                ease: [0.45, 0.05, 0.55, 0.95],
              }}
              className="w-8 h-1 bg-black/60 rounded-full blur-[1px] mt-1"
            />

            {/* Minimalist hairline progress bar */}
            <div className="w-14 h-[1.5px] bg-white/10 rounded-full overflow-hidden mt-3.5 relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-full bg-gradient-to-r from-brand-yellow/60 via-brand-yellow to-brand-yellow shadow-[0_0_6px_#F5C518]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
