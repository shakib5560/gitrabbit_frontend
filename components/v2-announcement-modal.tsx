"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  X,
  Brain,
  FolderTree,
  Users,
  Zap,
  VolumeX,
  TrendingUp,
  Heart,
  Handshake,
  MessageCircle,
} from "lucide-react";

interface V2AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  {
    icon: Brain,
    title: "Deeper Architectural Reviews",
    desc: "GitRabbit v2 will go beyond conventional PR comments and surface deeper architectural problems, anti-patterns, framework-specific issues, and design decisions that can affect long-term maintainability.",
    color: "#3B82F6", // Blue
  },
  {
    icon: FolderTree,
    title: "Full-Codebase Context",
    desc: "Instead of looking only at a changed diff, GitRabbit v2 is designed to understand the wider repository and identify how a local change can affect services, modules, and code in other parts of the codebase.",
    color: "#10B981", // Emerald
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Introduce a more collaborative engineering workflow where teams can review AI findings together, discuss issues, and work through AI-flagged problems in a shared environment.",
    color: "#8B5CF6", // Purple
  },
  {
    icon: Zap,
    title: "Smarter & More Cost-Effective",
    desc: "Designed around intelligent multi-model orchestration — using deeper reasoning where necessary and efficient models for high-context tasks.",
    highlight: "Better analysis without unnecessarily increasing AI costs.",
    color: "#F5C518", // Brand Yellow
  },
  {
    icon: VolumeX,
    title: "Zero-Noise Reviews",
    desc: "Keep the focus on meaningful engineering problems instead of overwhelming developers with stylistic preferences and minor nitpicks.",
    highlight: "Fewer comments. Better comments.",
    color: "#EF4444", // Red
  },
  {
    icon: TrendingUp,
    title: "Scalability & Performance Analysis",
    desc: "Focus on problems that can become expensive at scale, including inefficient algorithms, N+1 queries, unnecessary resource consumption, and other performance-related patterns.",
    color: "#F97316", // Orange
  },
];

export function V2AnnouncementModal({ isOpen, onClose }: V2AnnouncementModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (modalRef.current) modalRef.current.focus();
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              tabIndex={-1}
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="w-full max-w-2xl pointer-events-auto bg-[#0D0D0D] border border-white/[0.07] rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden outline-none flex flex-col relative"
            >
              {/* Top accent bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-yellow to-transparent"
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors z-10 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Scrollable body */}
              <div className="p-6 sm:p-8 space-y-8 max-h-[85vh] overflow-y-auto">
                
                {/* Header */}
                <div className="space-y-4">
                  <div className="w-32 h-8 relative shrink-0 mb-4">
                    <Image src="/mainlogo.png" alt="GitRabbit Logo" fill className="object-contain object-left" />
                  </div>
                  <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    GitRabbit v2 is under construction
                  </h2>
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl">
                    We&apos;re rebuilding GitRabbit into a deeper AI engineering partner — focused not only on finding bugs, but on understanding architecture, codebase-wide impact, scalability, and how teams actually build software together.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: feature.color }} />
                          </div>
                          <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                        </div>
                        <p className="text-[13px] text-neutral-400 leading-relaxed">
                          {feature.desc}
                        </p>
                        {feature.highlight && (
                          <div className="mt-3 inline-block px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide" style={{ color: feature.color, backgroundColor: `${feature.color}15`, border: `1px solid ${feature.color}30` }}>
                            {feature.highlight}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Support Section */}
                <div className="mt-8 pt-8 border-t border-white/[0.06]">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-bold text-white">Want to help build GitRabbit?</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed max-w-xl mx-auto">
                      GitRabbit is an independent product being built with a long-term vision for AI-powered software engineering. If you believe in the idea and want to support its development, you can get in touch directly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://wa.me/8801771659336"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all font-semibold text-sm cursor-pointer"
                      >
                        <Heart className="w-4 h-4" />
                        Support / Donate
                      </motion.a>
                      
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://wa.me/8801771659336"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 hover:bg-brand-yellow/20 transition-all font-semibold text-sm cursor-pointer"
                      >
                        <Handshake className="w-4 h-4" />
                        Interested in Equity
                      </motion.a>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-6 text-emerald-400 text-sm font-semibold">
                      <MessageCircle className="w-4 h-4" />
                      <a href="https://wa.me/8801771659336" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">
                        +880 1771-659336
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
