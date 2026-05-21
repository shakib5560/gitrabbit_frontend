"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Mail, Lock, Terminal } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-brand-black">
      <Navbar />

      <div className="pt-40 pb-20 px-6 md:px-16 bg-pixel-grid relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-yellow opacity-5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-yellow opacity-5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* LEFT COLUMN: Why GitRabbit */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex flex-col"
          >
            <div className="flex items-center gap-4 mb-8">
              <Terminal className="w-8 h-8 text-brand-yellow" />
              <span className="text-brand-yellow font-press-start text-xs uppercase tracking-widest">Secure_Login_Portal</span>
            </div>

            <h1 className="text-brand-white font-press-start text-3xl leading-tight mb-8">
              Welcome back to the <span className="text-brand-yellow text-4xl">Burrow.</span>
            </h1>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-brand-yellow/10 flex items-center justify-center shrink-0 border border-brand-yellow/20">
                  <span className="text-brand-yellow font-press-start text-xs">01</span>
                </div>
                <div>
                  <h3 className="text-brand-white font-bold mb-1">Autonomous Reviews</h3>
                  <p className="text-gray-500 text-sm font-mono">Let AI handle the repetitive parts of code review.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-brand-yellow/10 flex items-center justify-center shrink-0 border border-brand-yellow/20">
                  <span className="text-brand-yellow font-press-start text-xs">02</span>
                </div>
                <div>
                  <h3 className="text-brand-white font-bold mb-1">Deep Learning</h3>
                  <p className="text-gray-500 text-sm font-mono">GitRabbit learns from your team&apos;s feedback and style.</p>
                </div>
              </div>
            </div>

            <div className="relative w-48 h-48 opacity-20">
              <Image src="/icon.png" alt="GitRabbit" fill className="object-contain" />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Login Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-[#0C0C0C] border border-gray-800 p-8 rounded-2xl shadow-2xl relative">
              <div className="mb-8">
                <h2 className="text-brand-white font-pixelify text-2xl font-bold uppercase tracking-widest">
                  Authentication
                </h2>
                <p className="text-gray-500 text-xs font-mono mt-2">
                  Verify your identity to access the dashboard.
                </p>
              </div>

              {/* PRIORITY SOCIAL LOGINS */}
              <div className="space-y-3 mb-8">
                <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-brand-white text-black rounded-lg hover:bg-gray-200 transition-all text-xs font-bold font-press-start uppercase shadow-[3px_3px_0px_rgba(245,197,24,0.5)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.5C9.339 21.591 9.524 21.282 9.524 21.018C9.524 20.781 9.515 20.155 9.51 19.34C6.73 19.943 6.143 18.003 6.143 18.003C5.688 16.848 5.033 16.541 5.033 16.541C4.127 15.922 5.102 15.934 5.102 15.934C6.104 16.004 6.63 16.96 6.63 16.96C7.52 18.484 8.966 18.044 9.544 17.788C9.635 17.135 9.897 16.695 10.187 16.444C7.967 16.191 5.635 15.333 5.635 11.478C5.635 10.378 6.028 9.477 6.671 8.766C6.567 8.513 6.222 7.487 6.77 6.098C6.77 6.098 7.615 5.827 9.51 7.108C10.313 6.884 11.168 6.772 12.015 6.768C12.861 6.772 13.716 6.884 14.52 7.108C16.414 5.827 17.258 6.098 17.258 6.098C17.807 7.487 17.462 8.513 17.359 8.766C18.003 9.477 18.394 10.378 18.394 11.478C18.394 15.344 16.059 16.188 13.834 16.435C14.197 16.748 14.521 17.368 14.521 18.334C14.521 19.721 14.509 20.841 14.509 21.018C14.509 21.284 14.693 21.603 15.203 21.5C19.172 20.161 22.034 16.418 22.034 12C22.034 6.477 17.523 2 12 2Z" fill="currentColor" />
                  </svg>
                  Login with GitHub
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-gray-800 flex-1" />
                <span className="text-[10px] font-mono text-gray-600 uppercase">Or use email</span>
                <div className="h-px bg-gray-800 flex-1" />
              </div>

              {/* Form */}
              <form className="space-y-4">
                <div>
                  <label className="block text-[9px] font-press-start text-brand-yellow uppercase mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input type="email" placeholder="name@company.com" className="w-full bg-brand-dark border border-gray-800 rounded-lg py-2.5 px-10 text-brand-white focus:border-brand-yellow focus:outline-none transition-colors font-mono text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-press-start text-brand-yellow uppercase mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input type="password" placeholder="••••••••" className="w-full bg-brand-dark border border-gray-800 rounded-lg py-2.5 px-10 text-brand-white focus:border-brand-yellow focus:outline-none transition-colors font-mono text-sm" />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="button" className="w-full bg-brand-yellow text-brand-black font-press-start text-[10px] uppercase py-4 shadow-[4px_4px_0px_#FFFFFF] hover:brightness-110 active:shadow-none transition-all">
                    Log in
                  </button>
                </div>
              </form>

              <p className="mt-8 text-center text-gray-500 text-sm font-mono">
                New to GitRabbit?{" "}
                <Link href="/signup" className="text-brand-yellow hover:underline">
                  Start Free
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
