"use client";

import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "default" | "gold";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  const baseStyle =
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold select-none border";

  const variants = {
    default: "bg-bg-tertiary text-text-secondary border-border-primary",
    success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    error: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    info: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    gold: "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20",
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
