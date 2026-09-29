"use client";

import { motion } from "framer-motion";
import {
  FileCheck,
  ShieldCheck,
  Cpu,
  ArrowRight,
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Bot,
  Database,
  Terminal,
  FileCode2,
  Check,
  X,
  Code2,
  BookOpen,
  Zap,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SUPPORTED_AGENTS = [
  { name: "Devin AI", role: "Autonomous Software Engineer", color: "#3B82F6" },
  { name: "Cursor Composer", role: "IDE Agentic Pair Programmer", color: "#F5C518" },
  { name: "Claude Code", role: "CLI Agent & Refactoring Engine", color: "#D97706" },
  { name: "GitHub Copilot", role: "Workspace PR Assistant", color: "#10B981" },
];

const AUDIT_STEPS = [
  {
    step: "01",
    tag: "REQUIREMENTS_INGESTION",
    title: "Ingest Client Specs",
    desc: "Connects to Jira tickets, Linear issues, or Markdown PRDs to extract verifiable acceptance criteria.",
  },
  {
    step: "02",
    tag: "CODE_GRAPH_MAPPING",
    title: "Deep Repo Context",
    desc: "Cross-checks database schemas, API boundaries, and auth policies so code is never audited in a vacuum.",
  },
  {
    step: "03",
    tag: "SPEC_ALIGNMENT_AUDIT",
    title: "AST-to-Spec Verification",
    desc: "Analyzes AI-agent generated code against every requirement to catch omitted edge cases or spec drift.",
  },
  {
    step: "04",
    tag: "AUTONOMOUS_FEEDBACK",
    title: "Automated PR Clearance",
    desc: "Applies automated pass/fail review badges or sends structured re-prompt instructions back to the agent.",
  },
];

export const SpecVerificationSection = () => {
  const [activeTab, setActiveTab] = useState<"pass" | "drift">("pass");

  return (
    <section
      id="spec-verification"
      className="relative w-full bg-[#080808] py-24 md:py-32 px-6 md:px-16 overflow-hidden border-t border-b border-gray-900"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-yellow/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Cyberpunk grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 px-3.5 py-1.5 rounded-full mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow"></span>
            </span>
            <span className="text-brand-yellow text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold">
              Autonomous Code Governance
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-white text-base sm:text-xl md:text-2xl lg:text-[28px] xl:text-[32px] font-bold font-press-start leading-normal sm:leading-relaxed md:leading-[1.7] mb-6 max-w-3xl mx-auto"
          >
            <span className="block mb-2 sm:mb-3">
              Verify <span className="text-brand-yellow">AI-Agent Code</span>
            </span>
            <span className="block text-gray-200">
              Against Real Specs
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-mono max-w-2xl mx-auto"
          >
            Autonomous AI agents write code in seconds—but do they satisfy the client&apos;s actual requirements?
            GitRabbit ingests Jira tickets, PRDs, and codebase architecture to audit AI pull requests for strict spec compliance before human review.
          </motion.p>
        </div>

        {/* 4-Step Pipeline Stepper Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {AUDIT_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-[#0C0C0C] border border-gray-800/80 hover:border-brand-yellow/40 rounded-xl p-5 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-press-start text-brand-yellow">{step.step}</span>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{step.tag}</span>
                </div>
                <h4 className="text-white text-sm font-semibold font-mono mb-2 group-hover:text-brand-yellow transition-colors">
                  {step.title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed font-mono">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Showcase: Specs vs AI Code Overview Card */}
        <div className="bg-[#0D0D0D] border border-gray-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)] mb-16">
          {/* Card Top Tab Switcher */}
          <div className="bg-[#121212] border-b border-gray-800 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-white text-xs md:text-sm font-bold font-mono">
                  Spec Verification Engine // Visual Overview
                </h3>
                <p className="text-gray-500 text-[11px] font-mono">
                  Comparing client user stories against AI agent pull requests
                </p>
              </div>
            </div>

            {/* Toggle Mode: Spec Aligned vs Spec Drift Detected */}
            <div className="flex items-center bg-[#181818] p-1 rounded-xl border border-gray-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab("pass")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "pass"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Example: Spec Aligned (Pass)</span>
              </button>

              <button
                onClick={() => setActiveTab("drift")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "drift"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Example: Spec Drift (Intercepted)</span>
              </button>
            </div>
          </div>

          {/* Dual Overview Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            {/* Left Column: Client Requirements */}
            <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-gray-800 bg-[#0A0A0A] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold">
                      Client Specification
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-400">
                    Jira #DATA-290
                  </span>
                </div>

                <div className="bg-[#141414] border border-gray-800 rounded-xl p-4 mb-5">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                    Client User Story:
                  </span>
                  <p className="text-gray-300 text-xs font-mono leading-relaxed italic">
                    &ldquo;Telemetry events must be routed through Kafka with exponential retry. Any unhandled or poisoned payloads must be published to a Dead Letter Queue (DLQ) without crashing the worker.&rdquo;
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block mb-3">
                    Acceptance Criteria Checklist:
                  </span>
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-lg border border-gray-800/80 bg-[#121212] flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs font-mono">
                        <span className="text-white font-semibold block">AC-01: Exponential Retry Budget</span>
                        <span className="text-gray-400 text-[11px]">Consumer retries transient connection drops up to 3 times.</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-gray-800/80 bg-[#121212] flex items-start gap-3">
                      {activeTab === "pass" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      <div className="text-xs font-mono">
                        <span className="text-white font-semibold block">AC-02: DLQ Dead Letter Queue Routing</span>
                        <span className="text-gray-400 text-[11px]">
                          {activeTab === "pass"
                            ? "Poisoned records forwarded to telemetry_dlq topic."
                            : "AI omitted DLQ routing logic (Intercepted by GitRabbit)."}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-gray-800/80 bg-[#121212] flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs font-mono">
                        <span className="text-white font-semibold block">AC-03: Confluent Schema Registry</span>
                        <span className="text-gray-400 text-[11px]">AVRO backward-compatibility validation active.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-gray-800/80 text-[11px] font-mono text-gray-500 flex items-center justify-between">
                <span>Ingestion Source: Jira API Webhook</span>
                <span className="text-emerald-400">Context Synced</span>
              </div>
            </div>

            {/* Right Column: AI Agent Pull Request & GitRabbit Review */}
            <div className="lg:col-span-7 p-6 bg-[#080808] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-800/80">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono font-semibold text-white">
                      AI Agent Pull Request: <span className="text-gray-400 font-normal">feat/kafka-telemetry-consumer</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-800/50">
                    Author: Devin AI
                  </span>
                </div>

                {/* Code Diff Snapshot Preview */}
                <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden mb-4 font-mono text-xs">
                  <div className="bg-[#161616] px-4 py-2 border-b border-gray-800 text-[11px] text-gray-400 flex items-center justify-between">
                    <span>lib/telemetry/consumer.ts</span>
                    <span className="text-gray-500">+42 -6 lines</span>
                  </div>

                  <div className="p-4 space-y-1 text-[11px] leading-relaxed">
                    <div className="text-gray-500">export async function processTelemetryEvent(record: KafkaRecord) &#123;</div>
                    <div className="bg-emerald-950/30 text-emerald-300 px-2 py-0.5 rounded border-l-2 border-emerald-500">
                      + const registry = new ConfluentSchemaRegistry(env.SCHEMA_URL);
                    </div>
                    <div className="bg-emerald-950/30 text-emerald-300 px-2 py-0.5 rounded border-l-2 border-emerald-500">
                      + await registry.validate(record.value, &quot;telemetry_v2&quot;);
                    </div>
                    {activeTab === "pass" ? (
                      <div className="bg-emerald-950/30 text-emerald-300 px-2 py-0.5 rounded border-l-2 border-emerald-500">
                        + await dlqProducer.send(&#123; topic: &quot;telemetry_dlq&quot;, payload: record &#125;);
                      </div>
                    ) : (
                      <div className="bg-amber-950/30 text-amber-300 px-2 py-0.5 rounded border-l-2 border-amber-500">
                        ! // AI Agent silently dropped unparseable record instead of routing to DLQ
                      </div>
                    )}
                    <div className="text-gray-500">&#125;</div>
                  </div>
                </div>

                {/* GitRabbit Automated Bot Review Callout */}
                <div
                  className={`p-4 rounded-xl border text-xs font-mono transition-all ${
                    activeTab === "pass"
                      ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-300"
                      : "bg-amber-950/20 border-amber-500/40 text-amber-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-bold font-press-start text-[10px]">
                      <Terminal className="w-3.5 h-3.5 text-brand-yellow" />
                      <span>gitrabbit autonomous bot verdict</span>
                    </div>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                        activeTab === "pass"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : "bg-amber-950 text-amber-300 border border-amber-800"
                      }`}
                    >
                      {activeTab === "pass" ? "100% SPEC ALIGNED" : "SPEC GAP DETECTED"}
                    </span>
                  </div>

                  <p className="text-gray-300 text-[11px] leading-relaxed">
                    {activeTab === "pass"
                      ? "All 3 acceptance criteria verified against Jira #DATA-290. No hallucinated libraries found; DLQ fallback and schema registry compliance confirmed."
                      : "Spec breach detected: Acceptance criterion AC-02 requires unparseable messages to be sent to telemetry_dlq. The AI agent dropped the payload. Autonomous re-prompt sent to Devin."}
                  </p>
                </div>
              </div>

              {/* Bot Meta Info */}
              <div className="pt-4 mt-6 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>GitRabbit PR Gate: Automated Analysis Complete</span>
                </div>
                <span className="text-gray-400 font-semibold">Zero Hallucinations Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0E0E0E] border border-gray-800 hover:border-brand-yellow/40 rounded-2xl p-6 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center mb-4 text-brand-yellow group-hover:scale-110 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-brand-white text-sm font-semibold font-press-start mb-2 leading-snug">
              PRD &amp; Story Ingestion
            </h3>
            <p className="text-gray-400 text-xs font-mono leading-relaxed">
              Pulls acceptance criteria directly from Jira, Linear, or repo Markdown documents into automated constraint models.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0E0E0E] border border-gray-800 hover:border-blue-500/40 rounded-2xl p-6 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-brand-white text-sm font-semibold font-press-start mb-2 leading-snug">
              Deep Context Mapping
            </h3>
            <p className="text-gray-400 text-xs font-mono leading-relaxed">
              Cross-references Prisma schemas, auth middleware, and existing APIs so agents don&apos;t bypass established code rules.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0E0E0E] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-6 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-brand-white text-sm font-semibold font-press-start mb-2 leading-snug">
              Spec Drift Guard
            </h3>
            <p className="text-gray-400 text-xs font-mono leading-relaxed">
              Catches when AI agents create code that compiles and passes unit tests, yet fundamentally violates client business logic.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0E0E0E] border border-gray-800 hover:border-emerald-500/40 rounded-2xl p-6 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-brand-white text-sm font-semibold font-press-start mb-2 leading-snug">
              Closed-Loop Re-prompting
            </h3>
            <p className="text-gray-400 text-xs font-mono leading-relaxed">
              Feeds exact, structured correction instructions back to the coding agent so the code is fixed before human engineers review.
            </p>
          </motion.div>
        </div>

        {/* Supported AI Agent Ecosystem */}
        <div className="bg-[#0D0D0D] border border-gray-800/80 rounded-2xl p-6 md:p-8 mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-yellow font-bold block mb-1">
                Ecosystem Compatibility
              </span>
              <h4 className="text-white text-base font-bold font-mono">
                Works seamlessly with your AI agent stack
              </h4>
            </div>
            <span className="text-xs font-mono text-gray-500">
              Compatible with GitHub, GitLab &amp; Bitbucket
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUPPORTED_AGENTS.map((ag, i) => (
              <div
                key={i}
                className="bg-[#121212] border border-gray-800/80 rounded-xl p-4 flex items-center gap-3"
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: ag.color }}
                />
                <div>
                  <div className="text-white text-xs font-mono font-bold">{ag.name}</div>
                  <div className="text-gray-500 text-[10px] font-mono">{ag.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Overview CTA */}
        <div className="bg-gradient-to-r from-gray-900/80 via-black to-gray-900/80 border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center shrink-0">
              <GitPullRequest className="w-6 h-6 text-brand-yellow" />
            </div>
            <div>
              <h4 className="text-white text-base md:text-lg font-bold font-press-start mb-1">
                Protect your codebase against AI agent drift
              </h4>
              <p className="text-gray-400 text-xs md:text-sm font-mono">
                Connect your GitHub or GitLab repo in 2 minutes. Free for open source &amp; public repositories.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/docs/spec-verification"
              className="px-5 py-3 rounded-xl border border-gray-700 hover:border-gray-500 text-white text-xs font-mono transition-colors"
            >
              Read Spec Docs &rarr;
            </Link>
            <Link
              href="/signup"
              className="bg-brand-yellow text-brand-black text-xs font-press-start uppercase px-5 py-3 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-[3px_3px_0px_#FFFFFF]"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
