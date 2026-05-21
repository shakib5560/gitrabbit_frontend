"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { GitPullRequest, MessageSquareCode, ShieldAlert, Zap, TrendingUp, TrendingDown } from "lucide-react";

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {/* Card 1: Pull Requests Reviewed */}
      <Card hoverGlow={true} delay={0.1} className="flex flex-col justify-between h-[180px] group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-text-secondary tracking-wider uppercase font-sans">
            Pull Requests Reviewed
          </span>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 transition-transform duration-300 group-hover:scale-110 shadow-sm">
            <GitPullRequest size={15} />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5 mt-2">
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight font-sans">
            42
          </h2>
          <span className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            <TrendingUp size={10} className="mr-0.5" /> 12%
          </span>
        </div>

        {/* Green bar chart & curve sparkline */}
        <svg className="w-full h-10 overflow-visible mt-2" viewBox="0 0 200 40">
          {/* Bars */}
          <rect x="10" y="25" width="4" height="15" rx="1.5" className="fill-emerald-500/15 group-hover:fill-emerald-500/25 transition-colors duration-300" />
          <rect x="35" y="20" width="4" height="20" rx="1.5" className="fill-emerald-500/15 group-hover:fill-emerald-500/25 transition-colors duration-300" />
          <rect x="60" y="28" width="4" height="12" rx="1.5" className="fill-emerald-500/15 group-hover:fill-emerald-500/25 transition-colors duration-300" />
          <rect x="85" y="15" width="4" height="25" rx="1.5" className="fill-emerald-500/30 group-hover:fill-emerald-500/40 transition-colors duration-300" />
          <rect x="110" y="22" width="4" height="18" rx="1.5" className="fill-emerald-500/15 group-hover:fill-emerald-500/25 transition-colors duration-300" />
          <rect x="135" y="18" width="4" height="22" rx="1.5" className="fill-emerald-500/20 group-hover:fill-emerald-500/30 transition-colors duration-300" />
          <rect x="160" y="10" width="4" height="30" rx="1.5" className="fill-emerald-500/40 group-hover:fill-emerald-500/50 transition-colors duration-300" />
          {/* Smooth Path */}
          <path 
            d="M 12,25 C 37,15 62,32 87,15 C 112,0 137,25 162,10" 
            fill="none" 
            stroke="#10B981" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <circle cx="162" cy="10" r="3" className="fill-emerald-400 stroke-bg-secondary" strokeWidth="1" />
        </svg>
      </Card>

      {/* Card 2: AI Review Comments */}
      <Card hoverGlow={true} delay={0.2} className="flex flex-col justify-between h-[180px] group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-text-secondary tracking-wider uppercase font-sans">
            AI Review Comments
          </span>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 transition-transform duration-300 group-hover:scale-110 shadow-sm">
            <MessageSquareCode size={15} />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5 mt-2">
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight font-sans">
            128
          </h2>
          <span className="flex items-center text-[10px] font-bold text-brand-yellow bg-brand-yellow/10 px-1.5 py-0.5 rounded border border-brand-yellow/20">
            <TrendingUp size={10} className="mr-0.5" /> 18%
          </span>
        </div>

        {/* Gold wave sparkline with shaded gradient */}
        <svg className="w-full h-10 overflow-visible mt-2" viewBox="0 0 200 40">
          <defs>
            <linearGradient id="goldSpark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5C518" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F5C518" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path 
            d="M 10,32 C 40,32 60,10 90,25 C 120,40 140,15 170,20" 
            fill="none" 
            stroke="#F5C518" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <path 
            d="M 10,32 C 40,32 60,10 90,25 C 120,40 140,15 170,20 L 170,40 L 10,40 Z" 
            fill="url(#goldSpark)"
          />
          <circle cx="170" cy="20" r="3" className="fill-brand-yellow stroke-bg-secondary" strokeWidth="1" />
        </svg>
      </Card>

      {/* Card 3: Issues Found */}
      <Card hoverGlow={true} delay={0.3} className="flex flex-col justify-between h-[180px] group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-text-secondary tracking-wider uppercase font-sans">
            Issues Found
          </span>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/10 text-rose-500 border border-rose-500/20 transition-transform duration-300 group-hover:scale-110 shadow-sm">
            <ShieldAlert size={15} />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5 mt-2">
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight font-sans">
            23
          </h2>
          <span className="flex items-center text-[10px] font-bold text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
            <TrendingDown size={10} className="mr-0.5" /> 8%
          </span>
        </div>

        {/* 3D Segmented Issue Slider */}
        <div className="w-full mt-2 space-y-1.5">
          <div className="h-2 w-full rounded-full overflow-hidden flex bg-bg-tertiary">
            <div style={{ width: "21.7%" }} className="h-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
            <div style={{ width: "43.5%" }} className="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <div style={{ width: "34.8%" }} className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </div>
          <div className="flex items-center justify-between text-[9px] font-mono">
            <span className="text-rose-500 font-bold">High: 5</span>
            <span className="text-amber-500 font-bold">Medium: 10</span>
            <span className="text-emerald-500 font-bold">Low: 8</span>
          </div>
        </div>
      </Card>

      {/* Card 4: Review Time Saved */}
      <Card hoverGlow={true} delay={0.4} className="flex flex-col justify-between h-[180px] group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-text-secondary tracking-wider uppercase font-sans">
            Review Time Saved
          </span>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-sky-500/10 text-sky-500 border border-sky-500/20 transition-transform duration-300 group-hover:scale-110 shadow-sm">
            <Zap size={15} />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5 mt-2">
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight font-sans">
            18h 42m
          </h2>
          <span className="flex items-center text-[10px] font-bold text-sky-500 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
            <TrendingUp size={10} className="mr-0.5" /> 24%
          </span>
        </div>

        {/* Stopwatch integration with rotating hand animation */}
        <div className="flex items-center justify-between mt-2">
          <div className="w-8 h-8 rounded-full border border-sky-500/20 bg-sky-500/5 flex items-center justify-center relative shadow-[0_0_10px_rgba(56,189,248,0.1)]">
            <svg className="w-6 h-6 text-sky-400 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l2 2" />
              {/* Spinning Second Hand for micro animation */}
              <line x1="12" y1="12" x2="15.5" y2="8.5" strokeWidth="1.5" strokeLinecap="round" className="origin-center animate-[spin_8s_linear_infinite]" />
            </svg>
          </div>
          <span className="text-[8px] font-mono text-sky-400/80 font-bold bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
            Stopwatch Active
          </span>
        </div>
      </Card>
    </div>
  );
}
