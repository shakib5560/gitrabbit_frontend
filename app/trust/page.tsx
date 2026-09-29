"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2, Download, Server, Cpu } from "lucide-react";
import Link from "next/link";

const CERTS = [
  { title: "SOC2 Type II Certified", status: "Active & Audited", desc: "Independent annual audits verifying security, confidentiality, and availability controls." },
  { title: "ISO/IEC 27001", status: "Compliant", desc: "Rigorous information security management systems governing all operational workflows." },
  { title: "GDPR & CCPA Aligned", status: "Fully Compliant", desc: "Zero persistent storage of personal data, full DPA availability, and EU data residency options." },
  { title: "Zero Data Retention (ZDR)", status: "Guaranteed by Architecture", desc: "Ephemeral sandboxes process code diffs entirely in volatile RAM with immediate memory zeroization." },
];

export default function TrustPage() {
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
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 text-[10px] md:text-xs font-mono uppercase tracking-widest font-semibold">
              Security &amp; Compliance // Trust Center
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold font-press-start leading-tight mb-6"
          >
            Trust &amp; <span className="text-emerald-400">Security</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-mono max-w-2xl mx-auto leading-relaxed"
          >
            Enterprise-grade security is foundational to GitRabbit. Explore our certifications, architectural
            safeguards, and data protection practices.
          </motion.p>
        </div>
      </section>

      <section className="relative py-16 px-6 md:px-16 max-w-6xl mx-auto w-full flex-1 space-y-12">
        {/* Compliance Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTS.map((cert, idx) => (
            <div key={idx} className="bg-[#0C0C0C] border border-gray-800 rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-bold uppercase">
                  {cert.status}
                </span>
              </div>
              <h3 className="text-white font-bold font-mono text-base md:text-lg mb-2">{cert.title}</h3>
              <p className="text-gray-400 text-xs font-mono leading-relaxed">{cert.desc}</p>
            </div>
          ))}
        </div>

        {/* Security Architecture Details */}
        <div className="bg-[#0E0E0E] border border-gray-800 rounded-3xl p-8 md:p-12 space-y-8">
          <h2 className="text-lg md:text-xl font-bold font-press-start text-white">
            Architectural Safeguards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
            <div className="space-y-2">
              <div className="text-brand-yellow font-bold uppercase">1. Volatile In-Memory Runners</div>
              <p className="text-gray-400 leading-relaxed">
                Code diffs are analyzed inside isolated ephemeral micro-containers without persistent block storage.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-brand-yellow font-bold uppercase">2. Zero Model Training</div>
              <p className="text-gray-400 leading-relaxed">
                We contractually and technically guarantee that customer source code is never used to train public LLMs.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-brand-yellow font-bold uppercase">3. Strict TLS 1.3 Encryption</div>
              <p className="text-gray-400 leading-relaxed">
                All data in flight is protected with modern cryptographic cipher suites and automated certificate rotation.
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Reports Download Banner */}
        <div className="bg-gradient-to-r from-gray-900/60 via-black to-gray-900/60 border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-white text-sm md:text-base font-bold font-press-start mb-1">
              Need a Data Processing Agreement (DPA)?
            </h4>
            <p className="text-gray-400 text-xs font-mono">
              Download standard enterprise DPA contracts or request our latest SOC2 Type II compliance audit packet.
            </p>
          </div>
          <Link
            href="/contact?type=sales"
            className="bg-brand-yellow text-black font-press-start text-[10px] md:text-xs uppercase px-6 py-3.5 hover:brightness-110 transition-all shadow-[3px_3px_0px_#FFFFFF] shrink-0"
          >
            Request Security Packet
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
