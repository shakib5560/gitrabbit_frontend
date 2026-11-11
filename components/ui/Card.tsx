"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
  animate?: boolean;
  delay?: number;
  is3d?: boolean;
}

export function Card({
  children,
  className = "",
  hoverGlow = false,
  animate = true,
  delay = 0,
  is3d = false,
  ...props
}: CardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const cardContent = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl p-6 transition-colors duration-200 ${
        is3d ? "card-3d" : "bg-bg-secondary border border-border-primary"
      } ${
        isHovered ? "border-brand-yellow/30" : ""
      } ${
        hoverGlow && isHovered
          ? "shadow-[0_0_20px_var(--accent-glow)]"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}
