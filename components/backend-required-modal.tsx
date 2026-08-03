"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Server,
  X,
  Activity,
  GitPullRequest,
  Brain,
  CreditCard,
  Users,
  Cloud,
  ShieldCheck,
  Terminal,
  BarChart2,
  TestTube,
  Zap,
  BookOpen,
  GitMerge,
  MessageCircle,
  FlaskConical,
  Code,
  AlertCircle,
} from "lucide-react";

interface BackendRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Grouped unavailable features with icons, descriptions, and categories
const featureGroups = [
  {
    category: "Core Platform",
    color: "#3B82F6",
    bgColor: "rgba(59,130,246,0.08)",
    borderColor: "rgba(59,130,246,0.2)",
    items: [
      { icon: ShieldCheck, label: "Authentication", desc: "Login, signup & session management" },
      { icon: BarChart2, label: "Dashboard", desc: "Analytics, stats & activity feed" },
    ],
  },
  {
    category: "AI Features",
    color: "#F5C518",
    bgColor: "rgba(245,197,24,0.08)",
    borderColor: "rgba(245,197,24,0.2)",
    items: [
      { icon: GitPullRequest, label: "AI PR Reviews", desc: "Automated pull request analysis" },
      { icon: Brain, label: "Code Graph Analysis", desc: "Deep codebase intelligence" },
      { icon: FlaskConical, label: "Unit Test Generation", desc: "Auto-generate missing tests" },
      { icon: BookOpen, label: "Docstring Generation", desc: "Automated code documentation" },
    ],
  },
  {
    category: "Integrations",
    color: "#10B981",
    bgColor: "rgba(16,185,129,0.08)",
    borderColor: "rgba(16,185,129,0.2)",
    items: [
      { icon: Code, label: "IDE Integration", desc: "VS Code, Cursor & Windsurf support" },
      { icon: Terminal, label: "Pre-Commit CLI", desc: "Terminal-based review before commit" },
      { icon: MessageCircle, label: "Slack Agent", desc: "PR notifications in Slack" },
    ],
  },
  {
    category: "Billing & Teams",
    color: "#8B5CF6",
    bgColor: "rgba(139,92,246,0.08)",
    borderColor: "rgba(139,92,246,0.2)",
    items: [
      { icon: CreditCard, label: "Payments", desc: "Rabbit Coins purchase & balance" },
      { icon: Users, label: "Team Collaboration", desc: "Shared workspaces & review threads" },
      { icon: Cloud, label: "Cloud Storage", desc: "Repository sync & file persistence" },
    ],
  },
];

export function BackendRequiredModal({ isOpen, onClose }: BackendRequiredModalProps) {
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
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const totalFeatures = featureGroups.reduce((acc, g) => acc + g.items.length, 0);

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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
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
              className="w-full max-w-xl pointer-events-auto bg-[#0D0D0D] border border-white/[0.07] rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden outline-none flex flex-col relative"
            >
              {/* Top accent bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"
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
              <div className="p-6 sm:p-7 space-y-6 max-h-[85vh] overflow-y-auto">

                {/* ── Header ── */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                    <Server className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 id="modal-title" className="text-lg font-bold text-white tracking-tight">
                      Backend Required
                    </h2>
                    <p className="text-neutral-400 mt-0.5 text-sm">
                      You are viewing the <span className="text-white font-medium">Frontend Preview</span> of GitRabbit.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {[
                        { label: "Experimental Demo", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
                        { label: "Frontend Preview Mode", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
                      ].map((tag) => (
                        <span
                          key={tag.label}
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${tag.color}`}
                        >
                          {tag.label}
                        </span>
                      ))}
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border text-amber-400 bg-amber-400/10 border-amber-400/20">
                        <Activity className="w-3 h-3 animate-pulse" />
                        Local Backend Required
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Info Banner ── */}
                <div className="flex items-start gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    This project&apos;s backend runs on a{" "}
                    <span className="text-white font-medium">local development server</span> and is not deployed to the cloud.
                    The{" "}
                    <span className="text-white font-medium">{totalFeatures} features below</span> require the backend to be running.
                    Contact the developer to unlock the full demo experience — similar to CodeRabbit.
                  </p>
                </div>

                {/* ── Unavailable Features ── */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                      Unavailable Features
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-600 bg-white/5 border border-white/[0.06] px-2 py-0.5 rounded">
                      {totalFeatures} locked
                    </span>
                  </div>

                  {featureGroups.map((group, gi) => (
                    <motion.div
                      key={group.category}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + gi * 0.06 }}
                      className="rounded-xl border overflow-hidden"
                      style={{ borderColor: group.borderColor, backgroundColor: group.bgColor }}
                    >
                      {/* Group header */}
                      <div
                        className="flex items-center gap-2 px-3.5 py-2.5 border-b"
                        style={{ borderColor: group.borderColor }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: group.color }}
                        />
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest"
                          style={{ color: group.color }}
                        >
                          {group.category}
                        </span>
                        <span
                          className="ml-auto text-[9px] font-mono"
                          style={{ color: group.color + "80" }}
                        >
                          {group.items.length} features
                        </span>
                      </div>

                      {/* Feature items */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x"
                        style={{ "--divide-color": group.borderColor } as React.CSSProperties}>
                        {group.items.map((item, ii) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.12 + gi * 0.06 + ii * 0.04 }}
                              className="flex items-center gap-3 px-3.5 py-3 group"
                              style={{
                                borderColor: group.borderColor,
                                borderTopWidth: ii > 1 ? "1px" : undefined,
                                borderTopStyle: ii > 1 ? "solid" : undefined,
                              }}
                            >
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                style={{ backgroundColor: group.color + "15", border: `1px solid ${group.color}25` }}
                              >
                                <Icon className="w-3.5 h-3.5" style={{ color: group.color }} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-neutral-200 leading-none mb-0.5">
                                  {item.label}
                                </p>
                                <p className="text-[11px] text-neutral-500 leading-none truncate">
                                  {item.desc}
                                </p>
                              </div>
                              {/* Lock indicator */}
                              <div className="ml-auto shrink-0">
                                <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center">
                                  <svg className="w-2.5 h-2.5 text-neutral-600" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                  </svg>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* ── Developer Contact ── */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-white/[0.06]" />
                  </div>
                  <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="bg-[#0D0D0D] px-3 text-neutral-600">Need Help?</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/15">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.557-5.343 11.897-11.953 11.897-2.006-.002-3.973-.507-5.714-1.467L0 24zm6.59-3.816l.36.214c1.61.956 3.468 1.459 5.366 1.46h.001c5.466 0 9.913-4.447 9.916-9.913.002-2.648-1.03-5.138-2.902-7.01-1.872-1.873-4.363-2.903-7.016-2.905-5.474 0-9.923 4.449-9.927 9.917-.001 1.905.499 3.766 1.446 5.378l.218.371L1.93 22.07l4.717-1.237zM16.745 13.73c-.26-.13-1.536-.758-1.772-.844-.236-.086-.407-.13-.578.13-.17.26-.66.839-.81 1.012-.15.172-.3.193-.56.064-.26-.13-1.097-.404-2.09-1.288-.772-.688-1.293-1.539-1.444-1.8-.15-.26-.016-.4-.147-.53-.118-.117-.26-.305-.39-.457-.13-.15-.172-.258-.258-.43-.086-.172-.043-.323-.022-.452.022-.13.172-.408.258-.602.086-.193.13-.322.193-.43.065-.107.033-.204-.01-.301-.044-.097-.408-.989-.56-1.354-.147-.359-.292-.31-.408-.316l-.348-.006c-.236 0-.623.088-.945.43-.322.345-1.23 1.204-1.23 2.936 0 1.731 1.26 3.407 1.439 3.644.179.237 2.48 3.788 6.007 5.311.839.362 1.493.578 2.003.739.843.269 1.61.23 2.215.14.675-.1 1.536-.628 1.751-1.236.215-.609.215-1.13.15-1.237-.064-.108-.236-.172-.497-.302z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-neutral-300 mb-0.5">Developer Contact</p>
                    <a
                      href="https://wa.me/8801771659336"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      +880 1771-659336
                    </a>
                    <p className="text-[11px] text-neutral-600 mt-0.5">Ask to start the local backend server</p>
                  </div>
                </div>
              </div>

              {/* ── Footer Actions ── */}
              <div className="px-6 sm:px-7 py-4 bg-white/[0.02] border-t border-white/[0.06] flex flex-col sm:flex-row-reverse gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-[2] relative group overflow-hidden rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  onClick={() => window.open("https://wa.me/8801771659336", "_blank")}
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.557-5.343 11.897-11.953 11.897-2.006-.002-3.973-.507-5.714-1.467L0 24zm6.59-3.816l.36.214c1.61.956 3.468 1.459 5.366 1.46h.001c5.466 0 9.913-4.447 9.916-9.913.002-2.648-1.03-5.138-2.902-7.01-1.872-1.873-4.363-2.903-7.016-2.905-5.474 0-9.923 4.449-9.927 9.917-.001 1.905.499 3.766 1.446 5.378l.218.371L1.93 22.07l4.717-1.237zM16.745 13.73c-.26-.13-1.536-.758-1.772-.844-.236-.086-.407-.13-.578.13-.17.26-.66.839-.81 1.012-.15.172-.3.193-.56.064-.26-.13-1.097-.404-2.09-1.288-.772-.688-1.293-1.539-1.444-1.8-.15-.26-.016-.4-.147-.53-.118-.117-.26-.305-.39-.457-.13-.15-.172-.258-.258-.43-.086-.172-.043-.323-.022-.452.022-.13.172-.408.258-.602.086-.193.13-.322.193-.43.065-.107.033-.204-.01-.301-.044-.097-.408-.989-.56-1.354-.147-.359-.292-.31-.408-.316l-.348-.006c-.236 0-.623.088-.945.43-.322.345-1.23 1.204-1.23 2.936 0 1.731 1.26 3.407 1.439 3.644.179.237 2.48 3.788 6.007 5.311.839.362 1.493.578 2.003.739.843.269 1.61.23 2.215.14.675-.1 1.536-.628 1.751-1.236.215-.609.215-1.13.15-1.237-.064-.108-.236-.172-.497-.302z" />
                  </svg>
                  Contact Developer
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className="flex-1 px-5 py-2.5 font-semibold text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/[0.08] rounded-xl transition-colors cursor-pointer text-sm"
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
