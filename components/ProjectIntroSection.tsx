"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const ProjectIntroSection = () => {
  return (
    <section className="relative w-full bg-brand-black py-24 md:py-32 px-6 overflow-hidden">
      {/* Background glow effects matching the hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/20 px-4 py-1.5 rounded-full mb-8 text-brand-yellow text-[10px] md:text-xs font-mono uppercase tracking-widest"
        >
          <Play className="w-3 h-3" />
          Project Introduction
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="font-press-start text-2xl md:text-4xl text-center text-brand-white leading-tight mb-6"
        >
          See the Platform in <span className="text-brand-yellow">Action</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-center text-base md:text-lg max-w-2xl mb-16 leading-relaxed"
        >
          Watch this quick overview to see how GitRabbit automatically reviews pull requests, catches edge-case bugs, and enforces security policies directly within your workflow.
        </motion.p>

        {/* Video Container */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-[#0C0C0C] border border-gray-800 shadow-2xl group"
        >
          {/* Animated border glow on hover */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-brand-yellow/0 group-hover:border-brand-yellow/30 transition-colors duration-500 pointer-events-none z-20" />
          
          {/* Outer glow shadow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-brand-yellow/5 blur-3xl pointer-events-none -z-10" />

          {/* Embedded YouTube Video */}
          <iframe
            className="w-full h-full relative z-10"
            src="https://www.youtube.com/embed/JGCwlSpg1Pc?rel=0&modestbranding=1"
            title="GitRabbit Project Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
