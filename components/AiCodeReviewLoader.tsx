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
      <div className={`relative ${currentSize.rabbit}`}>
        <Image
          src="/footerlogo.png"
          alt="Loading..."
          fill
          sizes="64px"
          priority
          className="object-contain opacity-90"
        />
      </div>

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
            className="w-1/2 h-full bg-brand-yellow"
          />
        </div>
      )}
    </div>
  );
}
