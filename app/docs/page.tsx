"use client";

import { motion, Variants } from "framer-motion";
import {
  Zap, Code, Terminal, ArrowRight, Activity, Cpu, Lock,
  GitPullRequest, Brain, Users, Shield, Puzzle, GitMerge,
  FlaskConical, BookOpen, BarChart3, MessageSquare,
  Settings, Bug, FileText, Workflow, Eye, Database, Search, Globe
} from "lucide-react";
import { Slack } from "@/components/Icons";
import Link from "next/link";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const FEATURE_CATEGORIES = [
  {
    id: "pr-reviews",
    label: "PR_Reviews",
    color: "#F5C518",
    features: [
      { title: "Automated_Reviews", icon: Eye, desc: "Context-aware, line-by-line feedback within minutes of PR creation.", href: "/docs/reviews" },
      { title: "AI_Summaries", icon: Brain, desc: "Comprehensive architectural walkthroughs generated automatically.", href: "/docs/summaries" },
      { title: "One-Click_Fixes", icon: Zap, desc: "Committable code suggestions applied directly from the PR interface.", href: "/docs/fixes" },
      { title: "Bug_Detection", icon: Bug, desc: "Catch race conditions, null pointers, logic flaws and AI slop.", href: "/docs/bug-detection" },
      { title: "Agentic_Chat", icon: MessageSquare, desc: "Conversational AI debate within GitHub/GitLab comment threads.", href: "/docs/agentic-chat" },
    ]
  },
  {
    id: "intelligence",
    label: "Codebase_Intelligence",
    color: "#A78BFA",
    features: [
      { title: "Code_Graph", icon: Database, desc: "Full-codebase dependency analysis beyond just the diff.", href: "/docs/code-graph" },
      { title: "Team_Learnings", icon: Brain, desc: "Custom YAML rules that evolve with your team's coding style.", href: "/docs/team-learnings" },
      { title: "Language_Support", icon: Code, desc: "JS, TS, Python, Java, C#, Go, Rust, Ruby, PHP and more.", href: "/docs/languages" },
    ]
  },
  {
    id: "team-collab",
    label: "Team_Collaboration",
    color: "#34D399",
    features: [
      { title: "Slack_Agent", icon: Slack, desc: "PR notifications, GitHub↔Slack thread sync, incident triage.", href: "/docs/slack-agent" },
      { title: "Team_Rules", icon: Users, desc: "Org-wide coding standards enforced consistently on every PR.", href: "/docs/team-rules" },
      { title: "Review_Analytics", icon: BarChart3, desc: "Dashboards tracking review quality, code health, and velocity.", href: "/docs/analytics" },
      { title: "Custom_Workflows", icon: Workflow, desc: "Automate review gates, approvals, and notification routing.", href: "/docs/workflows" },
    ]
  },
  {
    id: "developer-workflow",
    label: "Developer_Workflow",
    color: "#60A5FA",
    features: [
      { title: "IDE_Integration", icon: Code, desc: "Real-time inline reviews in VS Code, Cursor, and Windsurf.", href: "/docs/ide" },
      { title: "Pre-Commit_CLI", icon: Terminal, desc: "Review staged and unstaged changes before committing.", href: "/docs/cli" },
      { title: "CI/CD_Integration", icon: GitMerge, desc: "Plug GitRabbit into any pipeline—GitHub Actions, GitLab CI, and more.", href: "/docs/cicd" },
    ]
  },
  {
    id: "pre-merge",
    label: "Pre-Merge_Automation",
    color: "#F97316",
    features: [
      { title: "CodeRabbit_Plan", icon: FileText, desc: "Structured coding plans from Jira/Linear issues before code is written.", href: "/docs/plan" },
      { title: "Unit_Test_Gen", icon: FlaskConical, desc: "Auto-generates missing tests to ensure adequate coverage.", href: "/docs/test-gen" },
      { title: "Docstring_Gen", icon: BookOpen, desc: "Writes and standardizes code documentation automatically.", href: "/docs/docstrings" },
      { title: "Merge_Conflicts", icon: GitPullRequest, desc: "Automatic conflict resolution assistance before PR finalization.", href: "/docs/merge-conflicts" },
    ]
  },
  {
    id: "security",
    label: "Security_&_Compliance",
    color: "#F87171",
    features: [
      { title: "SAST_Integrations", icon: Shield, desc: "40+ open-source static analysis tools and security scanners.", href: "/docs/sast" },
      { title: "Custom_Checks", icon: Settings, desc: "Mandatory pre-merge gates for Pro Plus and Enterprise teams.", href: "/docs/checks" },
      { title: "Enterprise_Security", icon: Lock, desc: "End-to-end encryption with ephemeral, zero-persistence environments.", href: "/docs/security" },
      { title: "Privacy_Vault", icon: Lock, desc: "SOC2 Type II and ISO 27001 — your code never trains our models.", href: "/docs/privacy" },
    ]
  },
];

const QUICK_LINKS = [
  { label: "Initialization", icon: Terminal, href: "/docs/installation", num: "01", desc: "Boot GitRabbit and connect your repos." },
  { label: "Quick_Start", icon: Zap, href: "/docs/quickstart", num: "02", desc: "Get your first AI review in under 5 minutes." },
  { label: "Neural_API", icon: Code, href: "/docs/api", num: "03", desc: "Integrate into your CI/CD pipelines." },
  { label: "Team_Setup", icon: Users, href: "/docs/team-rules", num: "04", desc: "Configure org-wide rules and collaboration." },
];

export default function DocsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-24"
    >
      {/* HERO SECTION */}
      <motion.section variants={itemVariants} className="relative">
        <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-yellow/40 mb-10">
          <span>DOCS</span>
          <span className="w-1 h-1 bg-brand-yellow/20 rounded-full" />
          <span className="text-brand-yellow/60">Introduction</span>
        </nav>

        <div className="relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -top-4 left-0 h-px bg-gradient-to-r from-brand-yellow to-transparent opacity-30"
          />
          <h1 className="text-brand-white font-press-start text-3xl md:text-5xl lg:text-6xl mb-8 leading-[1.2] tracking-tighter">
            THE <span className="text-brand-yellow block md:inline">FUTURE</span> OF <br className="hidden md:block" />
            CODE REVIEWS
          </h1>
        </div>

        <p className="text-gray-500 text-xl leading-relaxed max-w-2xl font-mono border-l-2 border-brand-yellow/20 pl-8 italic mb-10">
          Welcome to GitRabbit. We&apos;ve built an autonomous agent that doesn&apos;t just scan code—it understands it.
          From pull requests to pre-commit checks, from IDE to Slack, GitRabbit covers every touchpoint of your dev workflow.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-8 mt-8">
          {[
            { val: "30+", label: "Feature Modules" },
            { val: "40+", label: "SAST Integrations" },
            { val: "20+", label: "Languages Supported" },
            { val: "99.9%", label: "Uptime SLA" },
          ].map(s => (
            <div key={s.label} className="flex flex-col">
              <span className="text-brand-yellow font-press-start text-xl">{s.val}</span>
              <span className="text-gray-600 font-mono text-[10px] uppercase tracking-widest mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* QUICK START GRID */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="h-px bg-gray-900 flex-1" />
          <h2 className="text-brand-yellow font-press-start text-[9px] uppercase tracking-[0.5em]">Quick_Access</h2>
          <div className="h-px bg-gray-900 flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUICK_LINKS.map((ql) => (
            <Link
              key={ql.href}
              href={ql.href}
              className="group bg-[#080808] border border-gray-900 p-7 rounded-sm hover:border-brand-yellow/50 transition-all relative overflow-hidden flex flex-col justify-between h-48"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-yellow opacity-[0.02] group-hover:opacity-10 rounded-full blur-3xl transition-opacity" />
              <div className="relative">
                <ql.icon className="w-8 h-8 text-brand-yellow mb-4" />
                <h3 className="text-brand-white font-press-start text-xs mb-2 uppercase tracking-widest">{ql.label}</h3>
                <p className="text-gray-600 text-[11px] font-mono leading-relaxed">{ql.desc}</p>
              </div>
              <div className="flex items-center justify-between relative">
                <span className="text-brand-yellow text-[9px] font-bold uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform flex items-center gap-2">
                  Open_Docs <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-gray-900 font-mono text-[36px] font-black group-hover:text-brand-yellow/10 transition-colors">{ql.num}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* FEATURE CATEGORIES */}
      {FEATURE_CATEGORIES.map((cat) => (
        <motion.section key={cat.id} variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px bg-gray-900 flex-1" />
            <h2
              className="font-press-start text-[8px] uppercase tracking-[0.4em] whitespace-nowrap"
              style={{ color: cat.color }}
            >
              {cat.label}
            </h2>
            <div className="h-px bg-gray-900 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.features.map((feat) => (
              <Link
                key={feat.href}
                href={feat.href}
                className="group p-5 border border-gray-900 hover:border-gray-700 bg-[#050505] hover:bg-[#080808] transition-all relative overflow-hidden rounded-sm"
              >
                <div
                  className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(to right, transparent, ${cat.color}40, transparent)` }}
                />
                <feat.icon
                  className="w-5 h-5 mb-4 transition-colors"
                  style={{ color: `${cat.color}60` }}
                />
                <h4 className="text-brand-white text-[11px] font-bold uppercase mb-2 tracking-widest">{feat.title}</h4>
                <p className="text-gray-600 text-[11px] font-mono leading-relaxed mb-4">{feat.desc}</p>
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  style={{ color: cat.color }}
                >
                  Read_More <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </Link>
            ))}
          </div>
        </motion.section>
      ))}

      {/* INTEGRATIONS SECTION */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px bg-gray-900 flex-1" />
          <h2 className="text-brand-yellow/60 font-press-start text-[8px] uppercase tracking-[0.4em]">Platform_Integrations</h2>
          <div className="h-px bg-gray-900 flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "GitHub_Node", href: "/docs/github", badge: "Most Popular" },
            { title: "GitLab_Node", href: "/docs/gitlab", badge: "Enterprise" },
            { title: "Bitbucket_Node", href: "/docs/bitbucket", badge: "Available" },
          ].map(p => (
            <Link
              key={p.href}
              href={p.href}
              className="group p-6 border border-gray-900 hover:border-brand-yellow/30 bg-[#050505] transition-all rounded-sm flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Puzzle className="w-4 h-4 text-brand-yellow/40 group-hover:text-brand-yellow transition-colors" />
                  <span className="text-brand-white text-[11px] font-bold uppercase tracking-widest">{p.title}</span>
                </div>
                <span className="text-brand-yellow/40 text-[9px] font-mono uppercase tracking-widest ml-7">{p.badge}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-brand-yellow group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </motion.section>

      {/* SECURITY VAULT */}
      <motion.section variants={itemVariants} className="relative py-12 px-8 border-2 border-brand-yellow/20 bg-brand-yellow/[0.02] rounded-sm overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }}>
            <Image src="/icon.png" alt="" width={120} height={120} />
          </motion.div>
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-brand-yellow" />
            <h3 className="text-brand-white font-press-start text-xs uppercase tracking-[0.2em]">Security_Protocol_v4</h3>
          </div>
          <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8">
            Data privacy is at the core of GitRabbit. Your code is processed in volatile memory
            and is never persisted or used for model training. We maintain SOC2 Type II
            and ISO 27001 standards across all nodes.
          </p>
          <div className="flex gap-6">
            <Link href="/docs/privacy" className="text-brand-yellow text-[9px] font-bold uppercase border-b border-brand-yellow/40 hover:border-brand-yellow transition-all pb-1">
              Privacy_Statement
            </Link>
            <Link href="/docs/security" className="text-brand-yellow text-[9px] font-bold uppercase border-b border-brand-yellow/40 hover:border-brand-yellow transition-all pb-1">
              Security_Docs
            </Link>
          </div>
        </div>
      </motion.section>

      {/* FOOTER CTA */}
      <motion.section variants={itemVariants} className="pt-20 border-t border-gray-900">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h4 className="text-brand-white font-press-start text-xs uppercase mb-4 tracking-widest">Still_Have_Questions?</h4>
            <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">Join_the_developer_underground</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-brand-yellow text-brand-black px-10 py-4 text-[10px] font-press-start uppercase hover:scale-105 active:scale-95 transition-all shadow-[6px_6px_0px_#FFFFFF]">
              Enter_Discord
            </button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
