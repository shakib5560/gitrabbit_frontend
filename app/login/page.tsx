"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Mail, Lock, Terminal, ArrowRight, Eye, EyeOff } from "lucide-react";
import { V2AnnouncementModal } from "@/components/v2-announcement-modal";
import { useState, useEffect } from "react";

/* ─── Orbiting ring animation ─── */
function OrbitRing({ size, duration, delay, opacity }: { size: number; duration: number; delay: number; opacity: number }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 rounded-full border border-brand-yellow"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        opacity,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="absolute w-2 h-2 bg-brand-yellow rounded-full"
        style={{ top: -4, left: "50%", marginLeft: -4 }}
      />
    </motion.div>
  );
}

/* ─── Scan line effect ─── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent pointer-events-none z-20"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ─── Activity log ─── */
function ActivityLog() {
  const activities = [
    { time: "2s ago", user: "alex.dev", action: "Merged PR #482", color: "text-green-400" },
    { time: "15s ago", user: "sarah_ml", action: "Review complete", color: "text-brand-yellow" },
    { time: "1m ago", user: "devops_j", action: "Fixed 3 issues", color: "text-blue-400" },
    { time: "3m ago", user: "ninja_k", action: "New PR opened", color: "text-purple-400" },
    { time: "5m ago", user: "code_fox", action: "Deployed v2.1.0", color: "text-green-400" },
  ];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < activities.length) {
      const timer = setTimeout(() => {
        setVisibleCount((c) => c + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, activities.length]);

  return (
    <div className="bg-[#080810] border border-gray-800/50 rounded-xl p-5 overflow-hidden">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800/50">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-gray-500 text-[10px] font-mono uppercase tracking-wider">Live Activity</span>
      </div>
      <div className="space-y-3">
        {activities.slice(0, visibleCount).map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-xs font-mono"
          >
            <span className="text-gray-700 w-14 shrink-0">{activity.time}</span>
            <span className="text-gray-400 w-20 shrink-0 truncate">@{activity.user}</span>
            <span className={activity.color}>{activity.action}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isV2ModalOpen, setIsV2ModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsV2ModalOpen(true);
    return;
    setIsSubmitting(true);
    setLoginError(false);
    setTimeout(() => {
      setIsSubmitting(false);
      // Demo: show brief error then clear
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-brand-black">
      <Navbar />

      <div className="pt-40 pb-20 px-6 md:px-16 bg-pixel-grid relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-yellow opacity-[0.04] blur-[150px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-yellow opacity-[0.04] blur-[150px] rounded-full" />
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <Terminal className="w-8 h-8 text-brand-yellow relative z-10" />
                <div className="absolute inset-0 bg-brand-yellow/20 blur-lg rounded-full" />
              </div>
              <span className="text-brand-yellow font-press-start text-[10px] uppercase tracking-widest">
                Secure_Login_Portal
              </span>
            </div>

            <h1 className="text-brand-white font-press-start text-2xl leading-relaxed mb-8">
              Welcome back to the{" "}
              <span className="text-brand-yellow text-3xl block mt-2">Burrow.</span>
            </h1>

            <div className="space-y-5 mb-10">
              {[
                { num: "01", title: "Autonomous Reviews", desc: "Let AI handle the repetitive parts of code review." },
                { num: "02", title: "Deep Learning", desc: "GitRabbit learns from your team\u0027s feedback and style." },
                { num: "03", title: "Instant Reports", desc: "Get actionable insights across all your repositories." },
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 flex items-center justify-center shrink-0 border border-brand-yellow/20 group-hover:bg-brand-yellow/20 group-hover:border-brand-yellow/40 transition-all">
                    <span className="text-brand-yellow font-press-start text-xs">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="text-brand-white font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm font-mono">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Activity log */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <ActivityLog />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Login Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md mx-auto"
          >
            <div className="relative">
              {/* Glow border */}
              <div className="absolute -inset-[1px] bg-gradient-to-b from-brand-yellow/20 via-transparent to-brand-yellow/5 rounded-2xl blur-sm" />

              <div className="bg-[#0A0A14] border border-gray-800/60 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Scan line */}
                <ScanLine />

                {/* Orbit decoration */}
                <div className="absolute -top-20 -right-20 pointer-events-none opacity-10">
                  <OrbitRing size={160} duration={20} delay={0} opacity={0.3} />
                  <OrbitRing size={120} duration={15} delay={2} opacity={0.2} />
                </div>

                <div className="mb-8 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "3rem" }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="h-1 bg-brand-yellow rounded-full mb-6"
                  />
                  <h2 className="text-brand-white font-pixelify text-2xl font-bold uppercase tracking-widest">
                    Authentication
                  </h2>
                  <p className="text-gray-500 text-xs font-mono mt-2">
                    Verify your identity to access the dashboard.
                  </p>
                </div>

                {/* GitHub login */}
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
                    Login with GitHub
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
                      Email Address
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
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[9px] font-press-start text-brand-yellow uppercase">
                        Password
                      </label>
                      <Link href="#" className="text-[9px] font-mono text-gray-500 hover:text-brand-yellow transition-colors">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === "password" ? "text-brand-yellow" : "text-gray-600"}`} />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="••••••••"
                        className="w-full bg-[#0E0E18] border border-gray-800 rounded-xl py-3 px-10 text-brand-white focus:border-brand-yellow/50 focus:bg-[#10101a] focus:outline-none focus:ring-1 focus:ring-brand-yellow/20 transition-all font-mono text-sm placeholder:text-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {loginError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
                      >
                        <span className="text-red-400 text-xs font-mono">Invalid credentials. Please try again.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

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
                          Log in
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>

                <p className="mt-8 text-center text-gray-500 text-sm font-mono">
                  New to GitRabbit?{" "}
                  <Link href="/signup" className="text-brand-yellow hover:underline hover:text-brand-yellow/80 transition-colors">
                    Start Free
                  </Link>
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
