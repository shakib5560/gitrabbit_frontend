"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Activity, ChevronRight } from "lucide-react";

export function InsightsHealth() {
  const healthScore = 87;
  const radius = 42;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  const scoreBreakdowns = [
    { label: "Maintainability", value: 92, color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" },
    { label: "Security", value: 85, color: "bg-brand-yellow shadow-[0_0_8px_rgba(245,197,24,0.3)]" },
    { label: "Performance", value: 75, color: "bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.3)]" },
  ];

  const insights = [
    {
      text: "Your code quality has improved by 5 points this week! 🎉",
      icon: "🏆",
      bg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
    },
    {
      text: "Consider addressing the 3 high-priority issues in api-service.",
      icon: "⚡",
      bg: "bg-amber-500/10 border-amber-500/25 text-amber-400",
    },
    {
      text: "Great job! 85% of your PRs are being reviewed within 2 hours.",
      icon: "⏱️",
      bg: "bg-sky-500/10 border-sky-500/25 text-sky-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 select-none">
      {/* 1. Code Health Score Card */}
      <Card hoverGlow={true} delay={0.2} className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-border-primary pb-3 mb-4">
            <h3 className="text-sm font-bold text-text-primary tracking-wide font-sans flex items-center gap-1.5">
              <Activity size={15} className="text-emerald-500 animate-pulse" />
              Code Health Score
            </h3>
            <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-sm">
              Good
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 mt-4">
            {/* Radial circular indicator */}
            <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full rotate-270 transform" viewBox="0 0 110 110">
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  className="stroke-bg-tertiary"
                  strokeWidth={stroke}
                  fill="transparent"
                />
                <motion.circle
                  cx="55"
                  cy="55"
                  r={radius}
                  stroke="#10B981"
                  strokeWidth={stroke}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    filter: "drop-shadow(0 0 4px #10B981)",
                  }}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeDashoffset }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute text-center flex flex-col items-center">
                <span className="text-3xl font-extrabold text-text-primary font-sans leading-none">
                  {healthScore}
                </span>
                <span className="text-[8px] text-text-muted font-mono font-bold mt-1 uppercase tracking-wider">
                  8713 Spaceships
                </span>
              </div>
            </div>

            {/* Score Breakdown Bars */}
            <div className="flex-1 w-full space-y-3.5">
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block font-sans">
                Score Breakdown
              </span>
              {scoreBreakdowns.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-text-secondary font-sans">{item.label}</span>
                    <span className="text-text-primary font-mono">{item.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-bg-tertiary rounded-full overflow-hidden border border-border-primary/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 2. AI Insights Card */}
      <Card hoverGlow={true} delay={0.3} className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-border-primary pb-3 mb-4">
            <h3 className="text-sm font-bold text-text-primary tracking-wide font-sans flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-brand-yellow" />
              AI Insights Feed
            </h3>
            <span className="text-[9px] font-mono text-text-muted uppercase font-bold tracking-wider">
              Updated Live
            </span>
          </div>

          <div className="space-y-3.5 mt-3">
            {insights.map((insight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-2xl border border-border-primary/50 bg-bg-tertiary/10 hover:bg-bg-tertiary/30 transition-all duration-200"
              >
                {/* Glowing Bullet Icon */}
                <div className="flex-shrink-0 w-8 h-8 rounded-xl border border-border-primary bg-bg-secondary flex items-center justify-center text-sm shadow-sm select-none">
                  {insight.icon}
                </div>

                <div className="flex-1 text-xs pt-0.5">
                  <p className="text-text-secondary leading-relaxed font-sans font-semibold">
                    {insight.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="flex items-center gap-1.5 text-xs font-bold text-brand-yellow hover:text-[#e0b410] group mt-4 transition-all self-start cursor-pointer font-sans">
          <span>Explore recommendations</span>
          <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </Card>
    </div>
  );
}
