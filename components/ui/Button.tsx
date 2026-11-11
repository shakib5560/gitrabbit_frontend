"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none select-none active:opacity-90";

  const variants = {
    primary:
      "bg-brand-yellow text-black hover:bg-[#e0b410] shadow-[0_2px_10px_rgba(245,197,24,0.2)] focus:ring-2 focus:ring-brand-yellow/50",
    secondary:
      "bg-bg-tertiary text-text-primary hover:bg-border-primary border border-border-primary",
    outline:
      "bg-transparent text-text-primary border border-border-primary hover:bg-bg-tertiary hover:border-text-muted",
    ghost: "bg-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-4 py-2 text-sm rounded-xl gap-2",
    lg: "px-5 py-2.5 text-base rounded-xl gap-2",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
