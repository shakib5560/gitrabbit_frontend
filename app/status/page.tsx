"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, Activity, Server, Clock, ShieldCheck, Zap } from "lucide-react";

const SERVICES = [
  { name: "GitHub App & Webhook Ingestion", status: "Operational", uptime: "99.99%", latency: "18ms" },
  { name: "GitLab & Bitbucket Integrations", status: "Operational", uptime: "99.98%", latency: "22ms" },
  { name: "AI Inference & Review Engine (US-East)", status: "Operational", uptime: "99.99%", latency: "42s avg review" },
  { name: "AI Inference & Review Engine (EU-Central)", status: "Operational", uptime: "100.0%", latency: "39s avg review" },
  { name: "Code Graph & AST Indexer", status: "Operational", uptime: "99.97%", latency: "140ms" },
  { name: "CLI & Local Review Runners", status: "Operational", uptime: "100.0%", latency: "12ms" },
  { name: "Web Dashboard & Management API", status: "Operational", uptime: "99.99%", latency: "35ms" },
];

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-brand-black flex flex-col">
      <Navbar />

      <section className="relative pt-36 md:pt-44 pb-20 px-6 md:px-16 overflow-hidden border-b border-gray-900 bg-pixel-grid">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-emerald-400 text-[10px] md:text-xs font-mono uppercase tracking-widest font-semibold">
              All Systems Operational
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold font-press-start leading-tight mb-6"
          >
            System <span className="text-emerald-400">Status</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-mono max-w-2xl mx-auto leading-relaxed"
          >
            Real-time performance, review latency, and operational health across our global code review clusters.
          </motion.p>
        </div>
      </section>

      <section className="relative py-16 px-6 md:px-16 max-w-5xl mx-auto w-full flex-1 space-y-10">
        {/* Main Status Banner */}
        <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-press-start text-xs text-white">All Systems Fully Operational</h3>
              <p className="text-gray-400 text-xs font-mono mt-0.5">Global review latency: 41.2s average • 0 active incidents</p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
            99.99% Uptime (Past 90 Days)
          </span>
        </div>

        {/* Services Health Table */}
        <div className="bg-[#0C0C0C] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-[#121212] border-b border-gray-800 px-6 py-4 flex items-center justify-between font-mono text-xs text-gray-400">
            <span>Component / Subsystem</span>
            <div className="flex items-center gap-8">
              <span className="hidden sm:inline">Uptime</span>
              <span>Status</span>
            </div>
          </div>

          <div className="divide-y divide-gray-900">
            {SERVICES.map((s, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center justify-between font-mono text-xs hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-white font-medium">{s.name}</span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-gray-500 hidden sm:inline">{s.uptime}</span>
                  <span className="text-emerald-400 font-semibold">{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past 90 Days Pixel Bars */}
        <div className="bg-[#0D0D0D] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 font-mono text-xs">
            <span className="text-white font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              90-Day Uptime Log
            </span>
            <span className="text-gray-400">100.0%</span>
          </div>

          <div className="flex gap-1 h-8 items-end">
            {[...Array(45)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-500/80 hover:bg-emerald-400 transition-colors rounded-sm h-full"
                title={`Day ${45 - i}: 100% Operational`}
              />
            ))}
          </div>

          <div className="flex justify-between mt-3 text-[10px] font-mono text-gray-500">
            <span>90 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
