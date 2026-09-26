"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface AiCodeReviewLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showBar?: boolean;
}

/**
 * Compact, Minimalist & Smooth GitRabbit Icon Loader
 */
export function AiCodeReviewLoader({
  size = "md",
  className = "",
  showBar = true,
}: AiCodeReviewLoaderProps) {
  const sizeMap = {
    sm: { rabbit: "w-8 h-8", shadow: "w-6 h-0.5", bar: "w-10" },
    md: { rabbit: "w-12 h-12", shadow: "w-8 h-1", bar: "w-14" },
    lg: { rabbit: "w-16 h-16", shadow: "w-11 h-1.5", bar: "w-18" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Slower, graceful floating hop */}
      <motion.div
        animate={{
          y: [0, -6, 0.8, -3, 0],
          rotate: [0, -1.5, 1.5, -0.8, 0],
          scaleX: [1, 0.97, 1.03, 0.98, 1],
          scaleY: [1, 1.03, 0.97, 1.02, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.92,
          ease: [0.45, 0.05, 0.55, 0.95],
        }}
        className={`relative ${currentSize.rabbit}`}
      >
        <Image
          src="/footerlogo.png"
          alt="Loading..."
          fill
          sizes="64px"
          priority
          className="object-contain drop-shadow-[0_4px_10px_rgba(245,197,24,0.3)]"
        />
      </motion.div>

      {/* Gentle shadow */}
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
        className={`${currentSize.shadow} bg-black/60 rounded-full blur-[1px] mt-1`}
      />

      {/* Minimal hairline indicator */}
      {showBar && (
        <div className={`${currentSize.bar} h-[1.5px] bg-white/10 rounded-full overflow-hidden mt-3 relative`}>
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "easeInOut",
            }}
            className="w-1/2 h-full bg-brand-yellow shadow-[0_0_6px_#F5C518]"
          />
        </div>
      )}
    </div>
  );
}
