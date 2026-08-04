"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, LucideIcon } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export interface DocStep {
  step: string;
  title: string;
  desc: string;
  code?: string;
}

export interface DocFeature {
  icon: any;
  title: string;
  desc: string;
}

export interface DocPageProps {
  breadcrumb: string;
  badge?: string;
  badgeColor?: string;
  title: string;
  subtitle: string;
  accentColor?: string;
  description: string;
  features?: DocFeature[];
  steps?: DocStep[];
  codeExample?: { label: string; code: string; lang?: string };
  callout?: { type: "tip" | "warning" | "info"; title: string; body: string };
  proTips?: string[];
  nextPage?: { href: string; label: string };
  prevPage?: { href: string; label: string };
  children?: React.ReactNode;
}

export function DocPage({
  breadcrumb,
  badge,
  badgeColor = "#F5C518",
  title,
  subtitle,
  accentColor = "#F5C518",
  description,
  features,
  steps,
  codeExample,
  callout,
  proTips,
  nextPage,
  prevPage,
  children,
}: DocPageProps) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
      {/* BREADCRUMB */}
      <motion.div variants={itemVariants}>
        <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-yellow/40 mb-8">
          <Link href="/docs" className="hover:text-brand-yellow/70 transition-colors">DOCS</Link>
          <span className="w-1 h-1 bg-brand-yellow/20 rounded-full" />
          <span className="text-brand-yellow/60">{breadcrumb}</span>
        </nav>

        {badge && (
          <span
            className="inline-block text-[9px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-sm mb-6 font-mono"
            style={{ color: badgeColor, border: `1px solid ${badgeColor}30`, background: `${badgeColor}10` }}
          >
            {badge}
          </span>
        )}

        <div className="relative mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -top-4 left-0 h-px opacity-30"
            style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
          />
          <h1 className="text-brand-white font-press-start text-2xl md:text-3xl lg:text-4xl leading-[1.3] tracking-tight">
            {title}
          </h1>
        </div>
        <p className="text-gray-500 text-base font-mono mt-4" style={{ borderLeft: `2px solid ${accentColor}30`, paddingLeft: "1.5rem" }}>
          {subtitle}
        </p>
      </motion.div>

      {/* DESCRIPTION */}
      <motion.section variants={itemVariants} className="prose prose-invert max-w-none">
        <div className="text-gray-400 font-mono text-sm leading-relaxed space-y-4">
          {description.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </motion.section>

      {/* CALLOUT */}
      {callout && (
        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-sm border font-mono text-sm ${
            callout.type === "warning"
              ? "border-orange-500/30 bg-orange-500/5 text-orange-300"
              : callout.type === "tip"
              ? "border-green-500/30 bg-green-500/5 text-green-300"
              : "border-blue-500/30 bg-blue-500/5 text-blue-300"
          }`}
        >
          <span className="text-[9px] font-bold uppercase tracking-widest block mb-2 opacity-60">
            {callout.type === "warning" ? "⚠ WARNING" : callout.type === "tip" ? "✦ PRO TIP" : "ℹ INFO"}
          </span>
          <span className="font-bold block mb-1">{callout.title}</span>
          <span className="opacity-80 text-xs">{callout.body}</span>
        </motion.div>
      )}

      {/* FEATURES GRID */}
      {features && features.length > 0 && (
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="font-press-start text-[9px] uppercase tracking-[0.4em]" style={{ color: accentColor }}>
            Key_Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feat, i) => (
              <div key={i} className="p-5 border border-gray-900 bg-[#050505] hover:border-gray-700 transition-colors group rounded-sm">
                <feat.icon className="w-5 h-5 mb-3 transition-colors" style={{ color: `${accentColor}60` }} />
                <h4 className="text-brand-white text-[11px] font-bold uppercase mb-2 tracking-widest">{feat.title}</h4>
                <p className="text-gray-600 text-[11px] font-mono leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* STEPS */}
      {steps && steps.length > 0 && (
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="font-press-start text-[9px] uppercase tracking-[0.4em]" style={{ color: accentColor }}>
            Setup_Sequence
          </h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="relative pl-12 pb-8 border-l border-gray-900 last:border-transparent last:pb-0">
                <div
                  className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-bold font-mono"
                  style={{ borderColor: `${accentColor}40`, color: accentColor, background: "#080808" }}
                >
                  {i + 1}
                </div>
                <div className="ml-4">
                  <span className="text-[9px] font-bold uppercase tracking-widest mb-1 block" style={{ color: accentColor }}>{s.step}</span>
                  <h4 className="text-brand-white text-sm font-bold mb-2">{s.title}</h4>
                  <p className="text-gray-500 font-mono text-xs leading-relaxed mb-3">{s.desc}</p>
                  {s.code && (
                    <div className="bg-[#050505] border border-gray-900 rounded-sm p-4 font-mono text-xs text-green-400 overflow-x-auto">
                      <span className="text-brand-yellow/40 mr-2">$</span>{s.code}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* CODE EXAMPLE */}
      {codeExample && (
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="font-press-start text-[9px] uppercase tracking-[0.4em]" style={{ color: accentColor }}>
            Code_Example
          </h2>
          <div className="rounded-sm overflow-hidden border border-gray-900">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D0D0D] border-b border-gray-900">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{codeExample.label}</span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
            </div>
            <pre className="bg-[#050505] p-6 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {codeExample.code}
            </pre>
          </div>
        </motion.section>
      )}

      {/* EXTRA CHILDREN */}
      {children}

      {/* PRO TIPS */}
      {proTips && proTips.length > 0 && (
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="font-press-start text-[9px] uppercase tracking-[0.4em] text-green-400">Pro_Tips</h2>
          <ul className="space-y-3">
            {proTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 font-mono text-xs text-gray-400">
                <span className="text-green-400 mt-0.5 shrink-0">✦</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* PREV / NEXT */}
      {(prevPage || nextPage) && (
        <motion.section variants={itemVariants} className="pt-12 border-t border-gray-900 flex items-center justify-between gap-4">
          {prevPage ? (
            <Link
              href={prevPage.href}
              className="flex items-center gap-2 text-gray-500 hover:text-brand-white text-[10px] font-mono uppercase tracking-widest group transition-colors"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              {prevPage.label}
            </Link>
          ) : <div />}
          {nextPage && (
            <Link
              href={nextPage.href}
              className="flex items-center gap-2 text-brand-yellow text-[10px] font-mono uppercase tracking-widest group hover:text-brand-white transition-colors"
            >
              {nextPage.label}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </motion.section>
      )}
    </motion.div>
  );
}
