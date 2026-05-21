"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { STATS } from "@/lib/constants";
import Image from "next/image";

const iconMap: Record<string, React.ReactNode> = {
  Zap: (
    <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor" className="text-brand-yellow w-10 h-10" shapeRendering="crispEdges">
      <path d="M8 0H4v6H2v2h4v8h4v-6h2V6H8V0z" />
    </svg>
  ),
  Shield: (
    <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor" className="text-brand-yellow w-10 h-10" shapeRendering="crispEdges">
      <path d="M2 2h12v2H2V2zm0 2H0v6h2v2h2v2h2v2h4v-2h2v-2h2v-2h2V4h-2zm6 8H6v-2H4V8H2V6h12v2h-2v2h-2v2H8zM8 6h2v2H8V6zm-2 2h2v2H6V8zm-2 2h2v2H4v-2z" />
    </svg>
  ),
  Heart: (
    <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor" className="text-brand-yellow w-10 h-10" shapeRendering="crispEdges">
      <path d="M2 4h4v2h4V4h4v4h2v4h-2v2h-2v2h-2v2H8v-2H6v-2H4v-2H2v-2H0V8h2V4z" />
    </svg>
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
    <div ref={ref} className="flex items-center gap-4 px-8 first:pl-0 last:pr-0 border-r border-gray-800 last:border-0">
      {iconMap[stat.icon]}
      <div>
        <div className="text-4xl font-bold text-brand-white font-mono flex items-center">
          {count}
          {stat.suffix}
        </div>
        <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
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
            <Image src="/icon.png" alt="gitrabbit" fill className="object-contain" />
          </div>
          <h2 className="text-brand-white text-lg md:text-xl font-semibold font-press-start max-w-sm leading-tight">
            Better reviews.<br />
            Better code.<br />
            Built for speed.
          </h2>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col md:flex-row items-center">
          {STATS.map((stat, i) => (
            <StatItem key={i} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};
