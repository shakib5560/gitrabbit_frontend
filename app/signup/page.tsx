"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Mail, Lock, User, CheckCircle2, Zap, Shield, GitBranch, ArrowRight, Sparkles } from "lucide-react";
import { V2AnnouncementModal } from "@/components/v2-announcement-modal";
import { useState, useEffect, useRef } from "react";

/* ─── Floating particle component ─── */
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-yellow"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Terminal typing effect ─── */
function TerminalTyping() {
  const lines = [
    "$ gitrabbit init --project my-app",
    "✓ Connected to repository",
    "✓ AI model loaded",
    "$ gitrabbit review --auto",
    "⚡ Scanning 47 files...",
    "✓ Found 3 optimizations",
    "✓ Review complete in 2.3s",
  ];
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayLines, setDisplayLines] = useState<string[]>([]);

  useEffect(() => {
    if (currentLine >= lines.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(0);
        setCurrentChar(0);
        setDisplayLines([]);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    if (currentChar < lines[currentLine].length) {
      const timeout = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, 30 + Math.random() * 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayLines((prev) => [...prev, lines[currentLine]]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, lines]);

  return (
    <div className="bg-[#080810] border border-gray-800/50 rounded-xl p-5 font-mono text-xs overflow-hidden">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800/50">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="text-gray-600 text-[10px] ml-2 font-mono">gitrabbit-cli</span>
      </div>
      <div className="space-y-1.5">
        {displayLines.map((line, i) => (
          <div
            key={i}
            className={`${
              line.startsWith("✓")
                ? "text-green-400"
                : line.startsWith("⚡")
                ? "text-brand-yellow"
                : "text-gray-400"
            }`}
          >
            {line}
          </div>
        ))}
        {currentLine < lines.length && (
          <div className="text-gray-300">
            {lines[currentLine].substring(0, currentChar)}
            <span className="animate-pulse text-brand-yellow">▋</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isV2ModalOpen, setIsV2ModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsV2ModalOpen(true);
    return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const features = [
    { icon: Zap, label: "10x Faster Reviews", desc: "AI-powered code analysis in seconds" },
    { icon: Shield, label: "Enterprise Security", desc: "SOC2 compliant, zero data retention" },
    { icon: GitBranch, label: "All Platforms", desc: "GitHub, GitLab & Bitbucket" },
  ];

  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-brand-black">
      <Navbar />

      <div className="pt-40 pb-20 px-6 md:px-16 bg-pixel-grid relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <FloatingParticles />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-yellow opacity-[0.04] blur-[150px] rounded-full" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-yellow opacity-[0.04] blur-[150px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow opacity-[0.02] blur-[200px] rounded-full" />
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* LEFT COLUMN: Marketing */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden lg:flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full px-4 py-1.5 mb-8 w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
              <span className="text-brand-yellow text-[10px] font-press-start uppercase">Free Forever for Open Source</span>
            </motion.div>

            <h1 className="text-brand-white font-press-start text-2xl leading-relaxed mb-8">
              Start reviewing code{" "}
              <span className="text-brand-yellow text-3xl block mt-2">10x faster.</span>
            </h1>

            {/* Feature cards */}
            <div className="space-y-4 mb-10">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#0C0C14]/80 border border-gray-800/50 hover:border-brand-yellow/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 flex items-center justify-center shrink-0 border border-brand-yellow/20 group-hover:bg-brand-yellow/20 transition-colors">
                    <feat.icon className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <div>
                    <h3 className="text-brand-white font-bold text-sm">{feat.label}</h3>
                    <p className="text-gray-500 text-xs font-mono">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Terminal preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <TerminalTyping />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Sign Up Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md mx-auto"
          >
            <div className="relative">
              {/* Card glow effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-b from-brand-yellow/20 via-transparent to-brand-yellow/5 rounded-2xl blur-sm" />

              <div className="bg-[#0A0A14] border border-gray-800/60 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-brand-yellow/5 to-transparent" />
                </div>

                <div className="mb-8 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "3rem" }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="h-1 bg-brand-yellow rounded-full mb-6"
                  />
                  <h2 className="text-brand-white font-pixelify text-2xl font-bold uppercase tracking-widest">
                    Create Account
                  </h2>
                  <p className="text-gray-500 text-xs font-mono mt-2">
                    Join 4,000+ developers shipping better code.
                  </p>
                </div>

                {/* GitHub button */}
                <div className="space-y-3 mb-8">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setIsV2ModalOpen(true)}
                    className="w-full flex items-center justify-center gap-3 py-3.5 bg-brand-white text-black rounded-xl hover:bg-gray-100 transition-all text-xs font-bold font-press-start uppercase shadow-[3px_3px_0px_rgba(245,197,24,0.5)] hover:shadow-[4px_4px_0px_rgba(245,197,24,0.6)] cursor-pointer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.5C9.339 21.591 9.524 21.282 9.524 21.018C9.524 20.781 9.515 20.155 9.51 19.34C6.73 19.943 6.143 18.003 6.143 18.003C5.688 16.848 5.033 16.541 5.033 16.541C4.127 15.922 5.102 15.934 5.102 15.934C6.104 16.004 6.63 16.96 6.63 16.96C7.52 18.484 8.966 18.044 9.544 17.788C9.635 17.135 9.897 16.695 10.187 16.444C7.967 16.191 5.635 15.333 5.635 11.478C5.635 10.378 6.028 9.477 6.671 8.766C6.567 8.513 6.222 7.487 6.77 6.098C6.77 6.098 7.615 5.827 9.51 7.108C10.313 6.884 11.168 6.772 12.015 6.768C12.861 6.772 13.716 6.884 14.52 7.108C16.414 5.827 17.258 6.098 17.258 6.098C17.807 7.487 17.462 8.513 17.359 8.766C18.003 9.477 18.394 10.378 18.394 11.478C18.394 15.344 16.059 16.188 13.834 16.435C14.197 16.748 14.521 17.368 14.521 18.334C14.521 19.721 14.509 20.841 14.509 21.018C14.509 21.284 14.693 21.603 15.203 21.5C19.172 20.161 22.034 16.418 22.034 12C22.034 6.477 17.523 2 12 2Z" fill="currentColor" />
                    </svg>
                    Continue with GitHub
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent flex-1" />
                  <span className="text-[10px] font-mono text-gray-600 uppercase">Or use email</span>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent flex-1" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[9px] font-press-start text-brand-yellow uppercase mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === "name" ? "text-brand-yellow" : "text-gray-600"}`} />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        className="w-full bg-[#0E0E18] border border-gray-800 rounded-xl py-3 px-10 text-brand-white focus:border-brand-yellow/50 focus:bg-[#10101a] focus:outline-none focus:ring-1 focus:ring-brand-yellow/20 transition-all font-mono text-sm placeholder:text-gray-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-press-start text-brand-yellow uppercase mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === "email" ? "text-brand-yellow" : "text-gray-600"}`} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="name@company.com"
                        className="w-full bg-[#0E0E18] border border-gray-800 rounded-xl py-3 px-10 text-brand-white focus:border-brand-yellow/50 focus:bg-[#10101a] focus:outline-none focus:ring-1 focus:ring-brand-yellow/20 transition-all font-mono text-sm placeholder:text-gray-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-press-start text-brand-yellow uppercase mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === "password" ? "text-brand-yellow" : "text-gray-600"}`} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="••••••••"
                        className="w-full bg-[#0E0E18] border border-gray-800 rounded-xl py-3 px-10 text-brand-white focus:border-brand-yellow/50 focus:bg-[#10101a] focus:outline-none focus:ring-1 focus:ring-brand-yellow/20 transition-all font-mono text-sm placeholder:text-gray-700"
                      />
                    </div>
                    {/* Password strength indicator */}
                    {password.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2 flex gap-1"
                      >
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              password.length >= level * 3
                                ? password.length >= 10
                                  ? "bg-green-500"
                                  : password.length >= 6
                                  ? "bg-brand-yellow"
                                  : "bg-red-500"
                                : "bg-gray-800"
                            }`}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>

                  <div className="pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="w-full bg-brand-yellow text-brand-black font-press-start text-[10px] uppercase py-4 shadow-[4px_4px_0px_#FFFFFF] hover:shadow-[5px_5px_0px_#FFFFFF] hover:brightness-110 active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full"
                        />
                      ) : (
                        <>
                          Start Free Trial
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>

                {/* Success toast */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-xs font-mono">Account created! Check your email.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="mt-8 text-center text-gray-500 text-sm font-mono">
                  Already have an account?{" "}
                  <Link href="/login" className="text-brand-yellow hover:underline hover:text-brand-yellow/80 transition-colors">
                    Log in
                  </Link>
                </p>

                <p className="mt-4 text-center text-gray-700 text-[10px] font-mono">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>

              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <V2AnnouncementModal
        isOpen={isV2ModalOpen}
        onClose={() => setIsV2ModalOpen(false)}
      />
    </main>
  );
}
