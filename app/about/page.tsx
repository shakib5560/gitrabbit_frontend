"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Zap, Heart, Shield, Code, ArrowRight, Users, Sparkles, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VALUES = [
  {
    icon: Zap,
    title: "Relentless Speed",
    desc: "Code reviews shouldn't be the bottleneck of your sprint. We deliver line-by-line intelligence in under 60 seconds.",
  },
  {
    icon: Shield,
    title: "Zero-Trust Privacy",
    desc: "Your code is your crown jewel. Ephemeral runners, volatile RAM analysis, and zero public AI model training.",
  },
  {
    icon: Code,
    title: "Developer First",
    desc: "Built to work where you already live: GitHub, GitLab, VS Code, and terminal CLI. No clunky portals.",
  },
  {
    icon: Sparkles,
    title: "Deep Context",
    desc: "Reviews that look beyond the diff. We analyze your entire code graph, architecture rules, and database schemas.",
  },
];

export default function AboutPage() {
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
            <Users className="w-3.5 h-3.5 text-brand-yellow" />
            <span className="text-brand-yellow text-[10px] md:text-xs font-mono uppercase tracking-widest font-semibold">
              Our Mission // GitRabbit
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold font-press-start leading-tight mb-6"
          >
            Engineering <span className="text-brand-yellow">Smarter</span> Code Reviews
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-mono max-w-2xl mx-auto leading-relaxed"
          >
            We are building the future of autonomous code quality. GitRabbit combines deep codebase graph analysis,
            AI reasoning, and AST verification to make developer teams 10x faster.
          </motion.p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="relative py-20 px-6 md:px-16 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center mb-20">
          <div className="relative aspect-square max-w-md mx-auto w-full bg-[#0E0E0E] border border-gray-800 rounded-3xl p-8 flex items-center justify-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-brand-yellow/5 rounded-3xl blur-2xl" />
            <Image src="/hero1.png" alt="GitRabbit Mascot" width={280} height={280} className="object-contain relative z-10" />
          </div>

          <div className="space-y-6 text-sm font-mono text-gray-300 leading-relaxed">
            <h2 className="text-xl md:text-2xl font-bold font-press-start text-white leading-snug">
              Why We Built <span className="text-brand-yellow">GitRabbit</span>
            </h2>
            <p>
              Software engineers spend up to 30% of their working hours waiting for or conducting manual code reviews.
              Too often, reviews devolve into nitpicking formatting, missing edge-case race conditions, or worse:
              merging code that completely drifts from client requirements.
            </p>
            <p>
              We built GitRabbit to be the world&apos;s most context-aware code review partner. It reads your entire
              codebase like a senior principal architect—catching critical defects, verifying specifications, and
              suggesting committable fixes within 60 seconds of raising a pull request.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-brand-yellow font-bold">
              <span>✓ 4,000+ Teams</span>
              <span>✓ 1.2M+ PRs Reviewed</span>
              <span>✓ 0 Data Retained</span>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="mb-20">
          <h2 className="text-center font-press-start text-xl md:text-2xl text-white mb-12">
            Our Core <span className="text-brand-yellow">Principles</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, idx) => (
              <div
                key={idx}
                className="bg-[#0E0E0E] border border-gray-800 rounded-2xl p-6 hover:border-brand-yellow/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center mb-4 text-brand-yellow group-hover:scale-110 transition-transform">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="font-press-start text-xs text-white mb-2 leading-snug">{v.title}</h3>
                <p className="text-gray-400 text-xs font-mono leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#141414] via-black to-[#141414] border border-gray-800 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h3 className="text-lg md:text-2xl font-bold font-press-start text-white mb-4">
            Join thousands of teams shipping with GitRabbit
          </h3>
          <p className="text-gray-400 text-xs md:text-sm font-mono mb-8">
            Install the GitHub or GitLab integration in 2 minutes. Free forever for open-source repositories.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="bg-brand-yellow text-black font-press-start text-xs uppercase px-8 py-4 hover:brightness-110 transition-all shadow-[4px_4px_0px_#FFFFFF]"
            >
              Start Free Today
            </Link>
            <Link
              href="/pricing"
              className="border border-gray-800 hover:border-gray-600 text-gray-300 font-mono text-xs uppercase px-6 py-4 transition-colors"
            >
              View Pricing →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
