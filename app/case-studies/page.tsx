"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Award, ArrowRight, TrendingUp, Zap, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

const CASE_STUDIES = [
  {
    company: "Samsara",
    logoColor: "#3B82F6",
    headline: "How Samsara Cut PR Turnaround Times by 44% Across 400+ Engineers",
    metric1: "44%",
    metric1Label: "Faster Review Cycles",
    metric2: "2.4 hrs",
    metric2Label: "Saved Per Developer / Week",
    summary:
      "Samsara integrated GitRabbit into their GitHub monorepo to automate initial PR sanity checks, AST linting, and bug regression testing before senior human approval.",
    quote:
      "GitRabbit became an indispensable member of our engineering organization. It catches tricky null-pointers and async race conditions within minutes.",
    author: "VP of Engineering, Samsara",
  },
  {
    company: "MongoDB Ecosystem",
    logoColor: "#10B981",
    headline: "Catching Complex Concurrency Bugs Before Production Deployment",
    metric1: "92%",
    metric1Label: "False-Positive Reduction",
    metric2: "0",
    metric2Label: "Production P0 Leaks",
    summary:
      "By utilizing GitRabbit's full Code Graph analysis, MongoDB integration teams mapped cross-file dependencies and eliminated breaking schema mismatches in client drivers.",
    quote:
      "Standard linters were drowning us in noise. GitRabbit understands the architectural context of our codebase.",
    author: "Principal Systems Architect, Driver Ecosystem",
  },
  {
    company: "Pinecone",
    logoColor: "#8B5CF6",
    headline: "Automating Spec Verification for AI-Generated Microservice PRs",
    metric1: "3.8x",
    metric1Label: "Increase in Merge Velocity",
    metric2: "100%",
    metric2Label: "Spec Compliance Verified",
    summary:
      "Pinecone adopted GitRabbit's Spec Alignment Engine to verify that autonomous coding agents satisfied client PRDs and vector index constraints without hallucinating APIs.",
    quote:
      "AI agents write code at blistering speed, but GitRabbit ensures that every generated line strictly adheres to our specifications.",
    author: "Director of Autonomous Infrastructure, Pinecone",
  },
];

export default function CaseStudiesPage() {
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
            <Award className="w-3.5 h-3.5 text-brand-yellow" />
            <span className="text-brand-yellow text-[10px] md:text-xs font-mono uppercase tracking-widest font-semibold">
              Customer Success // Case Studies
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold font-press-start leading-tight mb-6"
          >
            Proven <span className="text-brand-yellow">Impact</span> at Scale
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-mono max-w-2xl mx-auto leading-relaxed"
          >
            Explore how modern engineering teams use GitRabbit to accelerate review velocity, eliminate regressions,
            and maintain architectural integrity.
          </motion.p>
        </div>
      </section>

      <section className="relative py-16 px-6 md:px-16 max-w-6xl mx-auto w-full flex-1 space-y-12">
        {CASE_STUDIES.map((study, idx) => (
          <div
            key={idx}
            className="bg-[#0C0C0C] border border-gray-800 rounded-3xl p-8 md:p-12 hover:border-brand-yellow/30 transition-all shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 items-center">
              <div>
                <span className="text-xs font-press-start font-bold uppercase tracking-widest text-brand-yellow mb-3 block">
                  {study.company}
                </span>
                <h2 className="text-lg md:text-2xl font-bold font-mono text-white mb-4 leading-snug">
                  {study.headline}
                </h2>
                <p className="text-gray-400 text-xs md:text-sm font-mono leading-relaxed mb-6">
                  {study.summary}
                </p>

                <div className="bg-[#141414] border-l-2 border-brand-yellow p-4 rounded-r-xl mb-6">
                  <p className="text-xs font-mono italic text-gray-300 mb-2">&ldquo;{study.quote}&rdquo;</p>
                  <span className="text-[10px] font-mono text-brand-yellow font-bold uppercase">{study.author}</span>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="flex flex-col gap-4">
                <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold font-pixelify text-brand-yellow mb-1">{study.metric1}</div>
                  <div className="text-gray-400 text-xs font-mono">{study.metric1Label}</div>
                </div>
                <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold font-pixelify text-white mb-1">{study.metric2}</div>
                  <div className="text-gray-400 text-xs font-mono">{study.metric2Label}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  );
}
