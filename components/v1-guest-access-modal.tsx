"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  MessageSquare,
  Phone,
  PhoneCall,
  Copy,
  Check,
  Sparkles,
  KeyRound,
} from "lucide-react";

interface V1GuestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function V1GuestAccessModal({ isOpen, onClose }: V1GuestAccessModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

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

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText("+8801771659336");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is not available
      const textArea = document.createElement("textarea");
      textArea.value = "+8801771659336";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            className="fixed inset-0 z-[10000] bg-black/65 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="v1-modal-title"
              tabIndex={-1}
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="w-full max-w-lg pointer-events-auto bg-[#0D0D0D] border border-white/[0.08] rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.7)] overflow-hidden outline-none flex flex-col relative"
            >
              {/* Top animated accent bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-yellow to-transparent"
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Ambient radial glow */}
              <div
                className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-brand-yellow/10 blur-3xl rounded-full"
                aria-hidden="true"
              />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors z-10 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[88vh] overflow-y-auto relative z-[1]">
                {/* Badge & Version Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/25 text-brand-yellow text-[9px] sm:text-[10px] font-press-start tracking-wider uppercase">
                    <Sparkles className="w-3 h-3 text-brand-yellow animate-pulse" />
                    <span>V1 Guest Access</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
                    Live Demo
                  </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-3">
                  <h2
                    id="v1-modal-title"
                    className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight leading-snug"
                  >
                    Are you coming from{" "}
                    <span className="text-brand-yellow underline decoration-brand-yellow/40 underline-offset-4">
                      Sheikh Shamiul Shakib’s
                    </span>{" "}
                    resume and want to explore V1?
                  </h2>
                  <p className="text-sm sm:text-base font-sans text-neutral-300 leading-relaxed">
                    If yes, please contact me on{" "}
                    <strong className="text-white font-semibold">WhatsApp</strong> or{" "}
                    <strong className="text-white font-semibold">call: +880 1771-659336</strong>{" "}
                    to request <strong className="text-brand-yellow font-semibold">guest access</strong>.
                  </p>
                </div>

                {/* Contact Card */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center shrink-0 text-brand-yellow">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                          Direct Contact / Guest Access
                        </div>
                        <div className="text-base sm:text-lg font-mono font-bold text-white tracking-tight truncate">
                          +880 1771-659336
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Copy phone number"
                      aria-label="Copy phone number"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[11px] text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-2.5 border-t border-white/[0.06] text-xs text-neutral-400 font-sans">
                    <KeyRound className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                    <span>
                      Guest access credentials will be provided promptly so you can test the platform.
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Primary CTA: WhatsApp */}
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://wa.me/8801771659336?text=Hi%20Shamiul%2C%20I%20came%20across%20GitRabbit%20from%20your%20resume%20and%20would%20love%20to%20request%20guest%20access%20to%20explore%20V1."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-yellow text-brand-black font-press-start text-[8px] sm:text-[9px] uppercase font-bold tracking-tight shadow-[2px_2px_0px_#FFFFFF] hover:brightness-110 transition-all cursor-pointer text-center"
                    >
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span>WhatsApp Me</span>
                    </motion.a>

                    {/* Secondary CTA: Call */}
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="tel:+8801771659336"
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-press-start text-[8px] sm:text-[9px] uppercase font-bold tracking-tight border border-white/15 transition-all cursor-pointer text-center"
                    >
                      <Phone className="w-4 h-4 shrink-0 text-brand-yellow" />
                      <span>Call for Access</span>
                    </motion.a>
                  </div>

                  {/* Subtle Close / Maybe Later */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors underline-offset-4 hover:underline cursor-pointer"
                    >
                      Close / Maybe Later
                    </button>
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
