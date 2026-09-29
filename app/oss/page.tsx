"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, GitPullRequest, ShieldCheck, ArrowRight, Star, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function OSSPage() {
  const [copiedBadge, setCopiedBadge] = useState(false);

  const badgeSnippet = `[![Reviewed by GitRabbit](https://img.shields.io/badge/reviewed_by-GitRabbit-F5C518?logo=github&style=flat-square)](https://gitrabbit.com)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(badgeSnippet);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 1500);
  };

  return (
    <main className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-brand-black flex flex-col">
      <Navbar />

      <section className="relative pt-36 md:pt-44 pb-20 px-6 md:px-16 overflow-hidden border-b border-gray-900 bg-pixel-grid">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-yellow/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 px-3.5 py-1.5 rounded-full mb-6"
          >
            <Heart className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow/30" />
            <span className="text-brand-yellow text-[10px] md:text-xs font-mono uppercase tracking-widest font-semibold">
              Community Initiative // Free Forever
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold font-press-start leading-tight mb-6"
          >
            GitRabbit for <span className="text-brand-yellow">Open Source</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-mono max-w-2xl mx-auto leading-relaxed"
          >
            We believe open source powers the world. GitRabbit is 100% free with unlimited pull request reviews for
            all public and open-source repositories worldwide.
          </motion.p>
        </div>
      </section>

      <section className="relative py-16 px-6 md:px-16 max-w-5xl mx-auto w-full flex-1 space-y-12 text-sm font-mono text-gray-300 leading-relaxed">
        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0E0E0E] border border-gray-800 rounded-2xl p-6">
            <GitPullRequest className="w-6 h-6 text-brand-yellow mb-3" />
            <h3 className="font-press-start text-xs text-white mb-2">Unlimited PR Reviews</h3>
            <p className="text-gray-400 text-xs">Zero monthly caps, zero rate limits on public GitHub, GitLab, and Bitbucket repos.</p>
          </div>
          <div className="bg-[#0E0E0E] border border-gray-800 rounded-2xl p-6">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-press-start text-xs text-white mb-2">Maintainer Relief</h3>
            <p className="text-gray-400 text-xs">Automate initial review rounds, catch edge-case bugs, and keep contributor PRs moving fast.</p>
          </div>
          <div className="bg-[#0E0E0E] border border-gray-800 rounded-2xl p-6">
            <Star className="w-6 h-6 text-purple-400 mb-3" />
            <h3 className="font-press-start text-xs text-white mb-2">Community Badge</h3>
            <p className="text-gray-400 text-xs">Show contributors your repo uses AI-assisted code reviews with our official README badge.</p>
          </div>
        </div>

        {/* README Badge Card */}
        <div className="bg-[#0C0C0C] border border-gray-800 rounded-3xl p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold font-press-start text-xs">Add GitRabbit Badge to your README</h3>
            <button
              onClick={handleCopy}
              className="bg-brand-yellow/15 border border-brand-yellow/40 text-brand-yellow px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 hover:bg-brand-yellow hover:text-black transition-colors cursor-pointer"
            >
              {copiedBadge ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedBadge ? "Copied Markdown!" : "Copy Badge"}
            </button>
          </div>

          <div className="bg-black p-4 rounded-xl border border-gray-800 text-xs text-gray-400 overflow-x-auto">
            <code>{badgeSnippet}</code>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-gray-900/60 via-black to-gray-900/60 border border-gray-800 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-lg md:text-2xl font-bold font-press-start text-white mb-4">
            Protect your open-source repo in 60 seconds
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-mono mb-8 max-w-xl mx-auto">
            No credit card, no expiration date. Simply install the GitHub App and select your public repository.
          </p>
          <Link
            href="/signup"
            className="bg-brand-yellow text-black font-press-start text-xs uppercase px-8 py-4 hover:brightness-110 transition-all shadow-[4px_4px_0px_#FFFFFF] inline-flex items-center gap-2"
          >
            <span>Install on GitHub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
