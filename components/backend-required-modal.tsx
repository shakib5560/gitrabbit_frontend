"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Server, CheckCircle2, X, Info, Activity, Mail } from "lucide-react";

interface BackendRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  "Authentication",
  "Dashboard",
  "AI Resume Analysis",
  "Payments",
  "Purchases",
  "Collaboration",
  "Cloud Storage",
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

  // Trap focus and prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        modalRef.current.focus();
      }
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
            className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
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
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg pointer-events-auto bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-[24px] shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden outline-none flex flex-col relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Header */}
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-inner border border-blue-200/50 dark:border-blue-800/30">
                    <Server className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 id="modal-title" className="text-2xl font-semibold text-neutral-900 dark:text-white tracking-tight">
                      Backend Required
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">
                      Some features require a running backend server.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2.5 py-1 rounded-md border border-purple-200/60 dark:border-purple-800/50">
                        Experimental Demo
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-md border border-blue-200/60 dark:border-blue-800/50">
                        Frontend Preview Mode
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded-md border border-amber-200/60 dark:border-amber-800/50">
                        <Activity className="w-3.5 h-3.5 animate-pulse" />
                        Local Backend Required
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body Text / Banner */}
                <div className="flex items-start gap-3 p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200/60 dark:border-neutral-700/50">
                  <Info className="w-5 h-5 text-neutral-400 dark:text-neutral-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    <strong className="text-neutral-900 dark:text-white font-semibold">Note:</strong> This is an experimental SaaS resume project.
                    <br /><br />
                    The backend is <strong className="text-neutral-900 dark:text-white font-medium">not deployed to the cloud</strong> and currently runs on a <strong className="text-neutral-900 dark:text-white font-medium">local development server</strong>. To access all features, please contact the developer and ask them to start the local backend server.
                    <br /><br />
                    Once the backend is running, you'll be able to explore the complete SaaS experience, including AI-powered code review features and real-time developer collaboration—similar to CodeRabbit.
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-3">
                  <h3 className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    Unavailable Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2.5">
                    {features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 group cursor-default"
                      >
                        <CheckCircle2 className="w-4 h-4 text-neutral-300 dark:text-neutral-600 group-hover:text-blue-500 transition-colors" />
                        <span className="group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors font-medium">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Need Help? Section */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-neutral-100 dark:border-neutral-800" />
                  </div>
                  <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="bg-white dark:bg-neutral-900 px-3 text-neutral-400 dark:text-neutral-500">
                      Need Help?
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                    Developer Contact
                  </h4>
                  <div className="text-sm text-neutral-600 dark:text-neutral-300 space-y-2 leading-relaxed">
                    <div className="flex items-center gap-2">
                      <span className="text-base select-none">📱</span>
                      <span className="font-semibold text-neutral-400 dark:text-neutral-500">WhatsApp:</span>
                      <a
                        href="https://wa.me/8801771659336"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-neutral-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors underline decoration-dotted underline-offset-4"
                      >
                        +880 1771-659336
                      </a>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Need access to authentication, dashboard, AI features, payments, or collaboration? Contact the developer to start the local backend server and unlock the full demo experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 bg-neutral-50/50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row-reverse gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.2), 0 4px 6px -4px rgba(16, 185, 129, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-[2] relative group overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 font-semibold transition-all border border-transparent cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-500/10"
                    onClick={() => window.open("https://wa.me/8801771659336", "_blank")}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.557-5.343 11.897-11.953 11.897-2.006-.002-3.973-.507-5.714-1.467L0 24zm6.59-3.816l.36.214c1.61.956 3.468 1.459 5.366 1.46h.001c5.466 0 9.913-4.447 9.916-9.913.002-2.648-1.03-5.138-2.902-7.01-1.872-1.873-4.363-2.903-7.016-2.905-5.474 0-9.923 4.449-9.927 9.917-.001 1.905.499 3.766 1.446 5.378l.218.371L1.93 22.07l4.717-1.237zM16.745 13.73c-.26-.13-1.536-.758-1.772-.844-.236-.086-.407-.13-.578.13-.17.26-.66.839-.81 1.012-.15.172-.3.193-.56.064-.26-.13-1.097-.404-2.09-1.288-.772-.688-1.293-1.539-1.444-1.8-.15-.26-.016-.4-.147-.53-.118-.117-.26-.305-.39-.457-.13-.15-.172-.258-.258-.43-.086-.172-.043-.323-.022-.452.022-.13.172-.408.258-.602.086-.193.13-.322.193-.43.065-.107.033-.204-.01-.301-.044-.097-.408-.989-.56-1.354-.147-.359-.292-.31-.408-.316l-.348-.006c-.236 0-.623.088-.945.43-.322.345-1.23 1.204-1.23 2.936 0 1.731 1.26 3.407 1.439 3.644.179.237 2.48 3.788 6.007 5.311.839.362 1.493.578 2.003.739.843.269 1.61.23 2.215.14.675-.1 1.536-.628 1.751-1.236.215-.609.215-1.13.15-1.237-.064-.108-.236-.172-.497-.302z" />
                    </svg>
                    Contact Developer
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 px-6 py-3 font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/80 rounded-full transition-colors shadow-sm cursor-pointer text-sm"
                  >
                    Continue Exploring
                  </motion.button>
                </div>
                <div className="text-center">
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium italic">
                    Start the local backend server to unlock all SaaS features.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
