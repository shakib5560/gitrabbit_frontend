"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { HelpCircle, Sparkles, TrendingUp } from "lucide-react";

interface ChartPoint {
  day: string;
  value: number;
}

export function AnalyticsSection() {
  const trendData: ChartPoint[] = [
    { day: "May 10", value: 21 },
    { day: "May 11", value: 30 },
    { day: "May 12", value: 26 },
    { day: "May 13", value: 45 },
    { day: "May 14", value: 28 },
    { day: "May 15", value: 35 },
    { day: "May 16", value: 42 },
  ];

  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const maxX = trendData.length - 1;
  const maxY = 60;

  const points = trendData.map((pt, idx) => {
    const x = paddingX + (idx / maxX) * (width - paddingX * 2);
    const y = height - paddingY - (pt.value / maxY) * (height - paddingY * 2);
    return { x, y, ...pt };
  });

  const generatePath = () => {
    if (points.length === 0) return "";
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 3;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (2 * (p1.x - p0.x)) / 3;
      const cpY2 = p1.y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  const linePath = generatePath();
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : "";

  const donutData = [
    { id: 0, label: "Suggestions", value: 72, percent: 56, color: "#F5C518", darkColor: "#F5C518" },
    { id: 1, label: "Issues", value: 23, percent: 18, color: "#EF4444", darkColor: "#F43F5E" },
    { id: 2, label: "Nitpicks", value: 20, percent: 16, color: "#3B82F6", darkColor: "#60A5FA" },
    { id: 3, label: "Positive", value: 13, percent: 10, color: "#10B981", darkColor: "#34D399" },
  ];

  const donutTotal = 128;
  const donutRadius = 66;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * donutRadius;

  let accumulatedPercent = 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
      {/* 1. Pull Requests Reviewed Area Chart */}
      <Card hoverGlow={true} delay={0.2} className="lg:col-span-2 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-border-primary pb-4 mb-4">
            <div>
              <h3 className="text-sm font-bold text-text-primary tracking-wide font-sans flex items-center gap-1.5">
                Code Performance & Health Profile
              </h3>
              <p className="text-xs text-text-secondary mt-0.5 font-sans">
                Code velocity and volume analyzed (Last 7 days)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <TrendingUp size={11} className="mr-0.5" /> +14.2%
              </span>
              <select className="px-2.5 py-1.5 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer font-sans transition-all duration-200 shadow-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
          </div>

          <div className="relative mt-2">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto overflow-visible"
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <defs>
                <linearGradient id="goldAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F5C518" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#F5C518" stopOpacity="0.0" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Horizontal Gridlines */}
              {[0, 15, 30, 45, 60].map((val) => {
                const y = height - paddingY - (val / maxY) * (height - paddingY * 2);
                return (
                  <g key={val} className="opacity-40">
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={width - paddingX}
                      y2={y}
                      stroke="currentColor"
                      className="text-border-primary"
                      strokeWidth={1}
                    />
                    <text
                      x={paddingX - 12}
                      y={y + 3}
                      textAnchor="end"
                      fontSize={9}
                      className="fill-text-muted font-mono font-medium"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Shaded Area */}
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                d={areaPath}
                fill="url(#goldAreaGradient)"
              />

              {/* Glowing Bezier Path */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                d={linePath}
                fill="none"
                stroke="#F5C518"
                strokeWidth={3}
                strokeLinecap="round"
                filter="url(#glow)"
              />

              {/* Vertical Guide Lines & Hover Circles */}
              {points.map((pt, idx) => {
                const isHovered = hoveredPoint === idx;
                return (
                  <g key={idx}>
                    {/* Hover vertical dashed line */}
                    {isHovered && (
                      <line
                        x1={pt.x}
                        y1={paddingY}
                        x2={pt.x}
                        y2={height - paddingY}
                        stroke="#F5C518"
                        strokeOpacity={0.3}
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                      />
                    )}

                    {/* Point Circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 6 : 4}
                      className="fill-bg-secondary stroke-brand-yellow cursor-pointer transition-all duration-200"
                      strokeWidth={isHovered ? 3.5 : 2.5}
                      onMouseEnter={() => setHoveredPoint(idx)}
                    />

                    {/* X-Axis labels */}
                    <text
                      x={pt.x}
                      y={height - 8}
                      textAnchor="middle"
                      fontSize={9}
                      className="fill-text-muted font-mono font-bold"
                    >
                      {pt.day.replace("May ", "")}
                    </text>

                    {/* Interactive hitbox */}
                    <rect
                      x={pt.x - (width - paddingX * 2) / maxX / 2}
                      y={paddingY}
                      width={(width - paddingX * 2) / maxX}
                      height={height - paddingY * 2}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPoint(idx)}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Premium 3D Glassmorphic Tooltip */}
            <AnimatePresence>
              {hoveredPoint !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    left: `${((points[hoveredPoint].x - 10) / width) * 100}%`,
                    top: `${((points[hoveredPoint].y - 52) / height) * 100}%`,
                  }}
                  className="bg-bg-secondary/90 backdrop-blur-md border border-brand-yellow/30 text-text-primary px-3.5 py-2 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.3),_inset_1px_1px_0px_rgba(255,255,255,0.05)] pointer-events-none select-none z-10 text-xs flex flex-col min-w-[100px] gap-0.5"
                >
                  <span className="text-[9px] text-text-muted font-mono uppercase tracking-wider">
                    {trendData[hoveredPoint].day}
                  </span>
                  <span className="font-extrabold text-sm text-brand-yellow font-sans tracking-wide">
                    {trendData[hoveredPoint].value} PRs
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>

      {/* 2. AI Review Summary Donut Chart */}
      <Card hoverGlow={true} delay={0.3} className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-border-primary pb-4 mb-4">
            <div>
              <h3 className="text-sm font-bold text-text-primary tracking-wide font-sans">
                AI Review Summary
              </h3>
              <p className="text-xs text-text-secondary mt-0.5 font-sans">
                Breakdown of AI feedback types
              </p>
            </div>
            <HelpCircle size={15} className="text-text-muted cursor-pointer hover:text-text-primary transition-colors" />
          </div>

          <div className="flex flex-col items-center justify-center gap-6 mt-4">
            {/* SVG Ring Donut */}
            <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full rotate-270 transform" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r={donutRadius}
                  className="stroke-bg-tertiary"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {donutData.map((seg, idx) => {
                  const strokeLength = (seg.percent / 100) * circumference;
                  const strokeOffset = circumference - (accumulatedPercent / 100) * circumference;
                  accumulatedPercent += seg.percent;

                  const isSegmentHovered = hoveredSegment === idx;

                  return (
                    <motion.circle
                      key={seg.id}
                      cx="80"
                      cy="80"
                      r={donutRadius}
                      stroke={seg.color}
                      strokeWidth={isSegmentHovered ? strokeWidth + 2.5 : strokeWidth}
                      strokeDasharray={`${strokeLength} ${circumference}`}
                      strokeDashoffset={strokeOffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="cursor-pointer transition-all duration-200"
                      style={{
                        filter: isSegmentHovered ? `drop-shadow(0 0 4px ${seg.color})` : "none",
                      }}
                      onMouseEnter={() => setHoveredSegment(idx)}
                      onMouseLeave={() => setHoveredSegment(null)}
                      initial={{ strokeDasharray: `0 ${circumference}` }}
                      animate={{ strokeDasharray: `${strokeLength} ${circumference}` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  );
                })}
              </svg>

              {/* Donut Center text */}
              <div className="absolute text-center flex flex-col items-center select-none pointer-events-none">
                <span className="text-2xl font-extrabold tracking-tight text-text-primary font-sans flex items-center gap-0.5">
                  {donutTotal}
                  <Sparkles size={12} className="text-brand-yellow animate-pulse" />
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-text-muted mt-0.5 font-sans">
                  AI Comments
                </span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="w-full grid grid-cols-2 gap-2 mt-2">
              {donutData.map((seg, idx) => (
                <div
                  key={seg.id}
                  className={`flex items-center justify-between p-2 rounded-xl transition-all duration-200 border border-transparent ${
                    hoveredSegment === idx ? "bg-bg-tertiary border-border-primary" : ""
                  }`}
                  onMouseEnter={() => setHoveredSegment(idx)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="text-[10px] font-semibold text-text-secondary truncate font-sans">
                      {seg.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-primary">
                    {seg.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
