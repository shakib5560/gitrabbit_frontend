"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-16 bg-brand-black overflow-hidden bg-pixel-grid">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 items-center z-10">
        {/* LEFT COLUMN */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.h1
            variants={itemVariants}
            className="font-press-start text-3xl md:text-5xl font-bold text-brand-white leading-tight mb-6"
          >
            <span className="block">AI Code Reviews</span>
            <span className="block text-gray-300">that actually</span>
            <span className="block text-brand-yellow">make sense.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg max-w-md mb-8"
          >
            gitrabbit understands your codebase, catches issues, and helps you
            ship better code, faster.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              href="/signup"
              className="bg-brand-yellow text-brand-black font-bold font-press-start text-[10px] md:text-xs uppercase px-8 py-4 flex items-center gap-2 hover:brightness-110 transition-all shadow-[4px_4px_0px_#FFFFFF]"
            >
              Start Free ↗
            </Link>
            <Link
              href="/login"
              className="text-brand-white font-press-start text-[10px] md:text-xs uppercase flex items-center gap-2 px-6 py-4 hover:text-brand-yellow transition-colors"
            >
              Log in →
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <p className="text-sm text-gray-400">Loved by 4,000+ engineering teams</p>
            <div className="flex items-center gap-6 text-gray-400 text-sm font-semibold">
              <div className="flex items-center gap-1.5"><div className="w-4 h-4 bg-gray-400 rounded-full opacity-80" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}></div> samsara</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 border-b-[6px] border-b-gray-400 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div> Vercel</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-4 bg-gray-400 rounded-full rotate-45 opacity-80"></div> MongoDB</div>
              <div className="flex items-center gap-1.5"><div className="w-3.5 h-4 bg-gray-400 opacity-80" style={{clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)"}}></div> Adobe</div>
              <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 bg-gray-400 rounded-sm opacity-80 rotate-45"></div> Pinecone</div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full h-full min-h-[400px] flex items-center justify-center"
        >
          {/* Glowing yellow circular gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-yellow opacity-10 blur-3xl rounded-full pointer-events-none"></div>
          
          {/* Circular orbit dashed line behind rabbit */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-dashed border-brand-yellow/30 rounded-full pointer-events-none">
            <div className="absolute top-[14%] left-[14%] w-2 h-2 bg-brand-yellow"></div>
            <div className="absolute bottom-[14%] right-[14%] w-1.5 h-1.5 bg-brand-yellow/50"></div>
          </div>

          <div className="relative z-10 w-full max-w-lg aspect-square flex items-center justify-center overflow-hidden">
            {/* The pixel rabbit illustration */}
            <Image
              src="/hero_image.png"
              alt="GitRabbit AI"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Floating card bottom-right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute -bottom-6 -right-6 lg:-right-12 bg-[#0C0C0C] border border-gray-800 rounded-lg p-5 shadow-2xl z-20 min-w-[200px]"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 bg-brand-yellow"></div>
              <span className="text-[10px] font-mono text-brand-yellow tracking-widest uppercase">AI Review Agent</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">Always learning.<br/>Always improving.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
