"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Zap, Shield, Code, ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BADGES = [
  { icon: Zap, label: "60s Reviews" },
  { icon: Shield, label: "Security Scanning" },
  { icon: Code, label: "50+ Linters" },
];

// Animated floating badge on the hero image
function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Animated pixel dot in orbit
function OrbitDot({ angle, radius, delay }: { angle: number; radius: number; delay: number }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-2 h-2 bg-brand-yellow rounded-full"
      style={{
        x: Math.cos((angle * Math.PI) / 180) * radius - 4,
        y: Math.sin((angle * Math.PI) / 180) * radius - 4,
      }}
      animate={{
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.4, 0.8],
      }}
      transition={{ duration: 2, repeat: Infinity, delay }}
    />
  );
}

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-16 bg-brand-black overflow-hidden bg-pixel-grid"
    >
      {/* Radial ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[58%_42%] gap-12 items-center z-10"
      >
        {/* LEFT COLUMN */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          {/* Pre-badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/20 px-4 py-2 mb-6 text-brand-yellow text-[9px] font-press-start uppercase tracking-widest"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-brand-yellow rounded-full"
            />
            Now with Deep Codebase Intelligence
            <ArrowRight className="w-3 h-3" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-press-start text-3xl md:text-5xl font-bold text-brand-white leading-tight mb-6"
          >
            <span className="block">AI Code Reviews</span>
            <span className="block text-gray-300">that actually</span>
            <span className="relative inline-block text-brand-yellow">
              make sense.
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-brand-yellow"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg max-w-md mb-8 leading-relaxed"
          >
            GitRabbit understands your entire codebase, catches bugs, race conditions, and AI hallucinations — then helps you ship better code, faster.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              href="/signup"
              className="bg-brand-yellow text-brand-black font-bold font-press-start text-[10px] md:text-xs uppercase px-8 py-4 flex items-center gap-2 hover:brightness-110 transition-all shadow-[4px_4px_0px_#FFFFFF] group"
            >
              Start Free
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="text-brand-white font-press-start text-[10px] md:text-xs uppercase flex items-center gap-2 px-6 py-4 border border-gray-800 hover:border-brand-yellow hover:text-brand-yellow transition-all"
            >
              View Pricing →
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <p className="text-sm text-gray-500">Trusted by 4,000+ engineering teams worldwide</p>
            <div className="flex flex-wrap items-center gap-4">
              {BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 bg-[#111111] border border-gray-800 px-3 py-1.5 rounded-full text-[10px] text-gray-400 font-mono"
                >
                  <Icon className="w-3 h-3 text-brand-yellow" />
                  {label}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 text-gray-600 text-xs font-mono">
              {["Samsara", "Vercel", "MongoDB", "Adobe", "Pinecone"].map((company) => (
                <span key={company} className="hover:text-gray-400 transition-colors cursor-default">
                  {company}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative w-full h-full min-h-[420px] flex items-center justify-center"
        >
          {/* Glowing yellow blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-yellow opacity-10 blur-3xl rounded-full pointer-events-none" />

          {/* Rotating orbit rings */}
          {[500, 380, 260].map((size, i) => (
            <motion.div
              key={size}
              className="absolute top-1/2 left-1/2 rounded-full border border-brand-yellow/15"
              style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 15 + i * 8, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* Orbit dots */}
          <div className="absolute top-1/2 left-1/2">
            <OrbitDot angle={30} radius={190} delay={0} />
            <OrbitDot angle={150} radius={190} delay={0.5} />
            <OrbitDot angle={270} radius={190} delay={1} />
            <OrbitDot angle={80} radius={130} delay={0.3} />
            <OrbitDot angle={220} radius={130} delay={0.8} />
          </div>

          {/* Rabbit illustration */}
          <div className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="/hero_image.png"
                alt="GitRabbit AI"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Floating badge: AI Review Agent */}
          <FloatingBadge className="-bottom-6 -right-4 lg:-right-10" delay={0.8}>
            <div className="bg-[#0C0C0C] border border-gray-800 rounded-xl p-4 shadow-2xl min-w-[190px]">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-brand-yellow"
                />
                <span className="text-[9px] font-mono text-brand-yellow tracking-widest uppercase">AI Review Agent</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">Always learning.<br />Always improving.</p>
            </div>
          </FloatingBadge>

          {/* Floating badge: Code Analysis */}
          <FloatingBadge className="-top-4 -left-4 lg:-left-8" delay={1.1}>
            <div className="bg-[#0C0C0C] border border-gray-800 rounded-xl p-3 shadow-2xl">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-brand-yellow/20 rounded flex items-center justify-center">
                  <Zap className="w-3 h-3 text-brand-yellow" />
                </div>
                <div>
                  <div className="text-[8px] text-gray-500 font-mono uppercase">Deep Analysis</div>
                  <div className="text-[10px] text-white font-semibold">Code Graph ✓</div>
                </div>
              </div>
            </div>
          </FloatingBadge>

          {/* Floating badge: Security */}
          <FloatingBadge className="top-1/2 -right-2 lg:-right-6" delay={1.3}>
            <div className="bg-[#0C0C0C] border border-emerald-900/60 rounded-xl p-3 shadow-2xl">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500/20 rounded flex items-center justify-center">
                  <Shield className="w-3 h-3 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[8px] text-gray-500 font-mono uppercase">SAST Scan</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">0 Vulnerabilities</div>
                </div>
              </div>
            </div>
          </FloatingBadge>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-[9px] font-mono uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-brand-yellow/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};
