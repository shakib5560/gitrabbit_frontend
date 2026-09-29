"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { STATS } from "@/lib/constants";
import Image from "next/image";

const iconMap: Record<string, React.ReactNode> = {
  Zap: (
    <div className="relative w-11 h-11 md:w-12 md:h-12 bg-[#0E0E0E] border-2 border-brand-yellow/40 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#F5C518] group-hover:border-brand-yellow group-hover:shadow-[3px_3px_0px_#F5C518] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
      <svg
        viewBox="0 0 16 16"
        width="28"
        height="28"
        fill="currentColor"
        className="text-brand-yellow"
        shapeRendering="crispEdges"
      >
        {/* Authentic 8-bit diagonal lightning bolt */}
        <rect x="7" y="1" width="3" height="2" />
        <rect x="6" y="3" width="3" height="2" />
        <rect x="5" y="5" width="3" height="2" />
        <rect x="2" y="7" width="11" height="2" />
        <rect x="7" y="9" width="4" height="2" />
        <rect x="6" y="11" width="3" height="2" />
        <rect x="5" y="13" width="2" height="2" />
      </svg>
    </div>
  ),
  Shield: (
    <div className="relative w-11 h-11 md:w-12 md:h-12 bg-[#0E0E0E] border-2 border-brand-yellow/40 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#F5C518] group-hover:border-brand-yellow group-hover:shadow-[3px_3px_0px_#F5C518] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
      <svg
        viewBox="0 0 16 16"
        width="28"
        height="28"
        fill="currentColor"
        className="text-brand-yellow"
        shapeRendering="crispEdges"
      >
        {/* Authentic 8-bit knight shield with checkmark */}
        <rect x="2" y="1" width="12" height="2" />
        <rect x="1" y="3" width="14" height="4" />
        <rect x="2" y="7" width="12" height="2" />
        <rect x="3" y="9" width="10" height="2" />
        <rect x="4" y="11" width="8" height="2" />
        <rect x="6" y="13" width="4" height="1" />
        <rect x="7" y="14" width="2" height="1" />
        {/* Pixel checkmark cutout */}
        <rect x="4" y="6" width="2" height="2" fill="#0E0E0E" />
        <rect x="6" y="8" width="2" height="2" fill="#0E0E0E" />
        <rect x="8" y="6" width="2" height="2" fill="#0E0E0E" />
        <rect x="10" y="4" width="2" height="2" fill="#0E0E0E" />
      </svg>
    </div>
  ),
  Heart: (
    <div className="relative w-11 h-11 md:w-12 md:h-12 bg-[#0E0E0E] border-2 border-brand-yellow/40 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#F5C518] group-hover:border-brand-yellow group-hover:shadow-[3px_3px_0px_#F5C518] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
      <svg
        viewBox="0 0 16 16"
        width="28"
        height="28"
        fill="currentColor"
        className="text-brand-yellow"
        shapeRendering="crispEdges"
      >
        {/* Classic 8-bit arcade gaming heart */}
        <rect x="2" y="2" width="4" height="2" />
        <rect x="10" y="2" width="4" height="2" />
        <rect x="1" y="4" width="6" height="2" />
        <rect x="9" y="4" width="6" height="2" />
        <rect x="1" y="6" width="14" height="2" />
        <rect x="2" y="8" width="12" height="2" />
        <rect x="4" y="10" width="8" height="2" />
        <rect x="6" y="12" width="4" height="2" />
        <rect x="7" y="14" width="2" height="1" />
        {/* Retro 8-bit shine glint */}
        <rect x="3" y="4" width="2" height="2" fill="#FFFDE7" />
      </svg>
    </div>
  ),
};

const StatItem = ({ stat }: { stat: typeof STATS[0] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.value;
      if (start === end) return;
      
      const duration = 2000;
      const incrementTime = (duration / end);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <div ref={ref} className="group flex items-center gap-4 px-6 md:px-8 first:pl-0 last:pr-0 border-r border-gray-800/80 last:border-0 py-3">
      {iconMap[stat.icon]}
      <div>
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white font-pixelify flex items-center tracking-tight">
          {count}
          {stat.suffix}
        </div>
        <div className="text-gray-400 text-sm md:text-base font-pixelify tracking-wide mt-0.5">{stat.label}</div>
      </div>
    </div>
  );
};

export const StatsSection = () => {
  return (
    <section className="bg-brand-black border-t border-gray-800 py-16 px-6 md:px-16 w-full">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 relative shrink-0">
            <Image src="/icon.png" alt="gitrabbit" fill sizes="64px" className="object-contain" />
          </div>
          <h2 className="text-brand-white text-base md:text-lg font-semibold font-press-start max-w-sm leading-snug">
            Better reviews.<br />
            Better code.<br />
            Built for speed.
          </h2>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
          {STATS.map((stat, i) => (
            <StatItem key={i} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};
