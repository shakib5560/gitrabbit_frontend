"use client";

import { COMPANY_LOGOS } from "@/lib/constants";

export const LogoBar = () => {
  return (
    <div className="w-full bg-brand-black border-y border-gray-800 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-gray-500 text-sm whitespace-nowrap shrink-0">
          Loved by 4,000+ engineering teams
        </div>
        
        {/* Marquee on mobile, flex on desktop */}
        <div className="w-full md:w-auto overflow-hidden relative">
          <div className="flex gap-10 items-center w-max animate-scroll-x md:animate-none">
            {COMPANY_LOGOS.map((logo, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                {/* Simulated simple text icon */}
                <span className="text-gray-600 opacity-50 text-xs">●</span>
                <span>{logo}</span>
              </div>
            ))}
            {/* Duplicate for marquee effect on mobile */}
            {COMPANY_LOGOS.map((logo, i) => (
              <div key={`dup-${i}`} className="flex items-center gap-2 text-gray-500 text-sm font-medium md:hidden">
                <span className="text-gray-600 opacity-50 text-xs">●</span>
                <span>{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
