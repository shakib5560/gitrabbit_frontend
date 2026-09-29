"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-brand-black flex flex-col">
      <Navbar />

      <section className="relative pt-36 md:pt-44 pb-20 px-6 md:px-16 overflow-hidden border-b border-gray-900 bg-pixel-grid">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-yellow/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full mb-6"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 text-[10px] md:text-xs font-mono uppercase tracking-widest font-semibold">
              Zero-Retention Architecture // Privacy Policy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold font-press-start leading-tight mb-6"
          >
            Privacy <span className="text-brand-yellow">Policy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-mono max-w-2xl mx-auto leading-relaxed"
          >
            Your code is your most valuable asset. GitRabbit operates on an uncompromising Zero Data Retention
            pledge: we never train AI models on your code, and we never store your source files permanently.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-yellow" />
              Last Updated: January 1, 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              GDPR &amp; SOC2 Type II Certified
            </span>
          </div>
        </div>
      </section>

      <section className="relative py-16 px-6 md:px-16 max-w-5xl mx-auto w-full flex-1 space-y-12 text-sm font-mono text-gray-300 leading-relaxed">
        {/* Core Privacy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0E0E0E] border border-gray-800 rounded-2xl p-6">
            <EyeOff className="w-6 h-6 text-brand-yellow mb-3" />
            <h3 className="font-press-start text-xs text-white mb-2">Zero Model Training</h3>
            <p className="text-gray-400 text-xs">Under no circumstances will your code or PR diffs be used to train public or commercial AI models.</p>
          </div>
          <div className="bg-[#0E0E0E] border border-gray-800 rounded-2xl p-6">
            <Lock className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-press-start text-xs text-white mb-2">Ephemeral Runners</h3>
            <p className="text-gray-400 text-xs">All code reviews execute in isolated RAM memory. Memory is instantly cleared once the review comment posts.</p>
          </div>
          <div className="bg-[#0E0E0E] border border-gray-800 rounded-2xl p-6">
            <ShieldCheck className="w-6 h-6 text-blue-400 mb-3" />
            <h3 className="font-press-start text-xs text-white mb-2">SOC2 &amp; GDPR Compliant</h3>
            <p className="text-gray-400 text-xs">Audited security controls, end-to-end TLS 1.3 transit encryption, and strict role-based access management.</p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 pt-4">
          <div>
            <h2 className="text-base md:text-lg font-bold font-press-start text-white mb-3">1. Information We Collect</h2>
            <p className="mb-2">We collect only information necessary to deliver and authenticate your code review service:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 pl-4">
              <li><strong>Account Credentials:</strong> Name, email, and OAuth identifier from GitHub, GitLab, or Bitbucket.</li>
              <li><strong>Repository Metadata:</strong> Repository names, PR numbers, commit hashes, and file paths.</li>
              <li><strong>Transient Code Diffs:</strong> Code snippets received via webhooks for the duration of the review cycle.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-bold font-press-start text-white mb-3">2. How We Process Source Code</h2>
            <p className="mb-2">
              When a pull request is created or updated in your connected repository:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 pl-4">
              <li>GitRabbit spawns an isolated sandbox container.</li>
              <li>The diff is parsed in volatile memory against your rules and code graph.</li>
              <li>Review findings are published to your PR conversation thread.</li>
              <li>The container memory is wiped. <strong>No source files remain on our servers.</strong></li>
            </ul>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-bold font-press-start text-white mb-3">3. Subprocessors &amp; Security</h2>
            <p className="mb-4">
              Our infrastructure runs on enterprise cloud providers (AWS, Google Cloud) certified under ISO 27001 and SOC2.
              All data in transit is encrypted using TLS 1.3 with AES-256 GCM cipher suites.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-bold font-press-start text-white mb-3">4. Your Data Rights</h2>
            <p className="mb-4">
              You retain the right to delete your account, revoke VCS webhook tokens at any time, and request full export
              or deletion of any account metadata by contacting <a href="mailto:privacy@gitrabbit.com" className="text-brand-yellow hover:underline">privacy@gitrabbit.com</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
