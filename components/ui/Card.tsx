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
  is3d = true, // Enable premium 3d by default for high visual aesthetics
  ...props
}: CardProps) {
  const [tilt, setTilt] = React.useState({ rX: 0, rY: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is3d) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth 3D tilt formula (max 6 degree rotation)
    const rotateX = -(y / (rect.height / 2)) * 6;
    const rotateY = (x / (rect.width / 2)) * 6;
    
    setTilt({ rX: rotateX, rY: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rX: 0, rY: 0 });
  };

  const cardContent = (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: is3d && isHovered 
          ? `perspective(1000px) rotateX(${tilt.rX}deg) rotateY(${tilt.rY}deg) scale(1.02)` 
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 card-3d ${
        isHovered ? "card-3d-active" : ""
      } ${
        hoverGlow && isHovered
          ? "shadow-[0_0_25px_var(--accent-glow)]"
          : ""
      } ${className}`}
      {...props}
    >
      {/* Dynamic ambient hover glow for premium dark mode card */}
      {hoverGlow && (
        <div 
          className="pointer-events-none absolute -inset-px opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_center,var(--accent-glow),transparent_60%)]" 
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      )}
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}
