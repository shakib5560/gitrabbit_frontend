"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  SearchCode: (
    <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor" className="text-brand-yellow mb-6" shapeRendering="crispEdges">
      <path d="M4 2h6v2h2v6h-2v2H4v-2H2V4h2V2zm6 8h2v-2h-2v2zm2 2h2v-2h-2v2zm2 2h2v-2h-2v2zm2 2h2v-2h-2v2z" />
    </svg>
  ),
  AlertTriangle: (
    <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor" className="text-brand-yellow mb-6" shapeRendering="crispEdges">
      <path d="M7 0h2v2H7V0zm-2 2h2v2H5V2zm-2 2h2v2H3V4zm-2 2h2v2H1V6zm-1 2h2v2H0V8zm0 2h2v2H0v-2zm0 2h16v-2H0v2zM7 6h2v4H7V6zm0 5h2v2H7v-2zm4-9h2v2h-2V2zm2 2h2v2h-2V4zm2 2h2v2h-2V6zm1 2h2v2h-2V8zm0 2h2v2h-2v-2z" />
    </svg>
  ),
  MessageSquare: (
    <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor" className="text-brand-yellow mb-6" shapeRendering="crispEdges">
      <path d="M2 2h12v2H2V2zM0 4h2v8H0V4zm14 0h2v8h-2V4zM2 12h4v2h2v2h2v-2h4v-2H2zM4 6h2v2H4V6zm4 0h2v2H8V6zm4 0h2v2h-2V6z" />
    </svg>
  ),
  BarChart2: (
    <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor" className="text-brand-yellow mb-6" shapeRendering="crispEdges">
      <path d="M0 14h16v2H0v-2zM2 8h3v6H2V8zm5-4h3v10H7V4zm5 6h3v4h-3v-4zM2 6h3v2H2V6zM7 2h3v2H7V2zM12 10h3v2h-3v-2z" />
    </svg>
  ),
};

export const FeaturesSection = () => {
  return (
    <section className="bg-brand-black py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-brand-yellow text-xs tracking-widest font-mono uppercase mb-4 block">
              Built for Engineers
            </span>
            <h2 className="text-brand-white text-2xl md:text-3xl font-bold font-press-start max-w-2xl">
              Everything you need for smarter code reviews
            </h2>
          </div>
          <Link href="#features" className="text-gray-400 hover:text-brand-white transition-colors shrink-0">
            Explore all features &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-brand-dark border border-brand-gray rounded-2xl p-6 hover:border-brand-yellow transition-colors duration-300 flex flex-col"
            >
              {iconMap[feature.icon]}
              <h3 className="text-brand-white font-semibold text-lg font-pixelify mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
