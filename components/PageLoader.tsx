"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ultra-fast, creative mount timer (600ms) for high-end user experience
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeOut" } }}
          className="fixed inset-0 z-50 bg-[#0A0B10] flex items-center justify-center select-none"
        >
          {/* Sleek top shooting progress bar */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-500 to-brand-yellow shadow-[0_0_8px_#F5C518]"
          />

          {/* Minimalist central creative element */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-14 h-14 flex items-center justify-center">
              {/* Micro circular completion outline */}
              <svg className="w-full h-full rotate-270 transform" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="#F5C518"
                  strokeWidth="3"
                  strokeDasharray={2 * Math.PI * 34}
                  initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    filter: "drop-shadow(0 0 3px rgba(245, 197, 24, 0.45))",
                  }}
                />
              </svg>

              {/* Tiny central floating icon bubble */}
              <div className="absolute w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center border border-brand-yellow/20">
                <img
                  src="/icon.png"
                  alt="GitRabbit"
                  className="w-4.5 h-4.5 object-contain animate-float"
                />
              </div>
            </div>

            {/* Micro loading label */}
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="text-[9px] font-bold font-mono tracking-widest text-brand-yellow uppercase opacity-90"
            >
              Connecting
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
