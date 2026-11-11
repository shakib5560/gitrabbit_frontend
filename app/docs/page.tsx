"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Code,
  Terminal,
  ArrowRight,
  Lock,
  GitPullRequest,
  Brain,
  Users,
  Shield,
  Puzzle,
  GitMerge,
  FlaskConical,
  BookOpen,
  BarChart3,
  MessageSquare,
  Settings,
  Bug,
  FileText,
  Workflow,
  Eye,
  Database,
  FileCheck,
  List,
  ChevronRight,
} from "lucide-react";
import { Slack } from "@/components/Icons";

const ARCHITECTURE_STAGES = [
  {
    step: "01",
    title: "Ingest PR & Specifications",
    desc: "Webhooks trigger on pull request events while optional Jira, Linear, or PRD links supply acceptance criteria.",
  },
  {
    step: "02",
    title: "Build Repository Code Graph",
    desc: "AST parsers map cross-file callers, database schemas, and auth boundaries beyond the changed diff lines.",
  },
  {
    step: "03",
    title: "Multi-Pass Review & SAST",
    desc: "Combines 40+ static analyzers with spec-alignment checks to surface real defects and filter noisy false positives.",
  },
  {
    step: "04",
    title: "Actionable Fixes & Merge Gate",
    desc: "Posts committable one-click patches, threaded @gitrabbit chat, and automated merge readiness checks.",
  },
];

const QUICK_ACCESS = [
  {
    title: "Quickstart",
    href: "/docs/quickstart",
    icon: Zap,
    tag: "5 min setup",
    desc: "Install the GitHub App or GitLab integration and receive your first automated PR review.",
  },
  {
    title: "Installation",
    href: "/docs/installation",
    icon: Terminal,
    tag: "Cloud & Self-Hosted",
    desc: "Configure repository scopes, self-hosted Docker runners, and webhook authentication.",
  },
  {
    title: "Configuration (.gitrabbit.yml)",
    href: "/docs/config",
    icon: Settings,
    tag: "YAML Reference",
    desc: "Tune review focus areas, path exclusions, SAST severity gates, and agent behavior.",
  },
  {
    title: "REST & GraphQL API",
    href: "/docs/api",
    icon: Code,
    tag: "Developer API",
    desc: "Query review histories, codebase health scores, and configure webhooks programmatically.",
  },
];

const PLATFORM_CAPABILITIES = [
  {
    id: "pr-reviews",
    title: "PR Reviews & Agentic Chat",
    subtitle: "Context-aware line-by-line review directly inside pull requests.",
    color: "#F5C518",
    items: [
      {
        title: "Automated Reviews",
        href: "/docs/reviews",
        icon: Eye,
        desc: "Incremental diff reviews with severity-ranked findings and merge readiness checks.",
      },
      {
        title: "AI Summaries & Walkthroughs",
        href: "/docs/summaries",
        icon: Brain,
        desc: "Architectural summaries, file-by-file change tables, and flow walkthroughs.",
      },
      {
        title: "One-Click Fixes",
        href: "/docs/fixes",
        icon: Zap,
        desc: "Committable code suggestions applied directly from the PR conversation view.",
      },
      {
        title: "Bug & Hallucination Detection",
        href: "/docs/bug-detection",
        icon: Bug,
        desc: "Detects race conditions, null dereferences, logic flaws, and hallucinated APIs.",
      },
      {
        title: "Agentic Chat",
        href: "/docs/agentic-chat",
        icon: MessageSquare,
        desc: "Stateful @gitrabbit comment threads to debate tradeoffs or regenerate patches.",
      },
    ],
  },
  {
    id: "intelligence",
    title: "Codebase Intelligence & Spec Verification",
    subtitle: "Full-repository understanding and requirement verification for human and AI-authored PRs.",
    color: "#A78BFA",
    items: [
      {
        title: "Spec & Context Verification",
        href: "/docs/spec-verification",
        icon: FileCheck,
        desc: "Audit AI-agent and developer code against Jira, Linear, and PRD requirements.",
      },
      {
        title: "Code Graph Analysis",
        href: "/docs/code-graph",
        icon: Database,
        desc: "Cross-file impact tracing across services, ORM models, and shared modules.",
      },
      {
        title: "Team Learnings",
        href: "/docs/team-learnings",
        icon: Brain,
        desc: "Persistent rules and architectural preferences learned from reviewer feedback.",
      },
      {
        title: "Language Support",
        href: "/docs/languages",
        icon: Code,
        desc: "AST-level analysis for TypeScript, JavaScript, Python, Go, Rust, Java, C#, Ruby, and PHP.",
      },
    ],
  },
  {
    id: "pre-merge",
    title: "Planning & Pre-Merge Automation",
    subtitle: "From upstream ticket blueprints to automated test coverage and conflict resolution.",
    color: "#F97316",
    items: [
      {
        title: "GitRabbit Plan",
        href: "/docs/plan",
        icon: FileText,
        desc: "Convert Jira or Linear tickets into structured, editable implementation blueprints.",
      },
      {
        title: "Unit Test Generation",
        href: "/docs/test-gen",
        icon: FlaskConical,
        desc: "Generate missing edge-case tests matching Jest, Vitest, Pytest, or Go conventions.",
      },
      {
        title: "Docstring Generation",
        href: "/docs/docstrings",
        icon: BookOpen,
        desc: "Automatically write and standardize function and module docstrings.",
      },
      {
        title: "Merge Conflict Resolution",
        href: "/docs/merge-conflicts",
        icon: GitPullRequest,
        desc: "Context-aware conflict resolution proposals prior to final merge.",
      },
    ],
  },
  {
    id: "developer-workflow",
    title: "IDE, CLI, CI/CD & Slack",
    subtitle: "Catch defects locally before pushing and keep engineering teams aligned.",
    color: "#60A5FA",
    items: [
      {
        title: "IDE Integration",
        href: "/docs/ide",
        icon: Code,
        desc: "Real-time inline diagnostics inside VS Code, Cursor, and Windsurf.",
      },
      {
        title: "Pre-Commit CLI",
        href: "/docs/cli",
        icon: Terminal,
        desc: "Audit staged and unstaged changes in your terminal before committing.",
      },
      {
        title: "CI/CD Pipelines",
        href: "/docs/cicd",
        icon: GitMerge,
        desc: "Run automated review gates in GitHub Actions, GitLab CI, and CircleCI.",
      },
      {
        title: "Slack Agent",
        href: "/docs/slack-agent",
        icon: Slack,
        desc: "Bidirectional GitHub-to-Slack thread sync, alerts, and triage workflows.",
      },
    ],
  },
  {
    id: "security-governance",
    title: "Security, Governance & Analytics",
    subtitle: "Org-wide guardrails, static analysis orchestration, and zero-retention security.",
    color: "#F87171",
    items: [
      {
        title: "SAST & Linters",
        href: "/docs/sast",
        icon: Shield,
        desc: "Orchestrate 40+ static analysis tools with contextual false-positive filtering.",
      },
      {
        title: "Team Rules",
        href: "/docs/team-rules",
        icon: Users,
        desc: "Enforce organization-level coding standards across all repositories.",
      },
      {
        title: "Custom Checks & Workflows",
        href: "/docs/checks",
        icon: Workflow,
        desc: "Mandatory pre-merge compliance gates, routing policies, and escalations.",
      },
      {
        title: "Review Analytics",
        href: "/docs/analytics",
        icon: BarChart3,
        desc: "Track review latency, issue density, and repository health trends.",
      },
      {
        title: "Enterprise Security",
        href: "/docs/security",
        icon: Lock,
        desc: "SAML SSO, audit logging, TLS 1.3, and isolated ephemeral review containers.",
      },
      {
        title: "Privacy & Zero Retention",
        href: "/docs/privacy",
        icon: Lock,
        desc: "SOC2 Type II and ISO 27001 controls — source code never trains models.",
      },
    ],
  },
];

const TOC_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How GitRabbit Works" },
  { id: "quickstart", label: "Quickstart Guides" },
  { id: "capabilities", label: "Platform Capabilities" },
  { id: "providers", label: "Git Providers" },
  { id: "security", label: "Security & Retention" },
];

export default function DocsPage() {
  return (
    <div className="flex items-start gap-8">
      {/* CENTER CONTENT */}
      <div className="flex-1 min-w-0 max-w-3xl space-y-16">
        {/* HERO OVERVIEW */}
        <section id="overview" className="scroll-mt-44 border-b border-gray-800/80 pb-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
            <span className="text-gray-400">Docs</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-700" />
            <span className="text-gray-200 font-medium">Introduction</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md mb-4 bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/25">
            GitRabbit Documentation
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            AI Code Reviews &amp; Spec Verification
          </h1>

          <p className="text-base sm:text-lg text-gray-400 mt-4 leading-relaxed">
            GitRabbit is an automated code review and engineering governance platform. It pairs
            full-repository code graph analysis with requirement verification so teams catch
            architectural regressions, logic bugs, and spec drift before code reaches production.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-7">
            <Link
              href="/docs/quickstart"
              className="inline-flex items-center gap-2 bg-brand-yellow text-brand-black font-semibold text-xs px-4 py-2.5 rounded-lg hover:brightness-110 transition-all"
            >
              Get Started in 5 Minutes
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/docs/config"
              className="inline-flex items-center gap-2 border border-gray-800 hover:border-gray-700 bg-[#0B0C10] text-gray-200 font-medium text-xs px-4 py-2.5 rounded-lg transition-colors"
            >
              View .gitrabbit.yml Schema
            </Link>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-gray-800/70">
            {[
              { val: "30+", label: "Platform Modules" },
              { val: "40+", label: "SAST Analyzers" },
              { val: "20+", label: "Languages Supported" },
              { val: "Zero", label: "Code Retention" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xl font-bold text-brand-yellow font-mono">{s.val}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="scroll-mt-44 space-y-5">
          <div>
            <h2 className="text-xl font-semibold text-white tracking-tight">
              How GitRabbit Works
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Every pull request flows through a four-stage verification pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ARCHITECTURE_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="p-5 rounded-xl border border-gray-800/80 bg-[#0B0C10]"
              >
                <span className="text-[11px] font-mono font-semibold text-brand-yellow">
                  STAGE {stage.step}
                </span>
                <h3 className="text-sm font-semibold text-white mt-1.5 mb-1.5">
                  {stage.title}
                </h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* QUICKSTART GUIDES */}
        <section id="quickstart" className="scroll-mt-44 space-y-5">
          <div>
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Quickstart Guides
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Start with zero configuration or customize every stage of the review pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUICK_ACCESS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-5 rounded-xl border border-gray-800/80 hover:border-brand-yellow/40 bg-[#0B0C10] transition-colors flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 border border-brand-yellow/25 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-brand-yellow" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 bg-white/[0.04] border border-gray-800 px-2 py-0.5 rounded">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-brand-yellow transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-gray-400 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-yellow">
                  Read guide
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* LAYERED FEATURE DIRECTORY */}
        <section id="capabilities" className="scroll-mt-44 space-y-10">
          <div>
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Platform Capabilities
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Explore documentation by functional layer across the engineering lifecycle.
            </p>
          </div>

          {PLATFORM_CAPABILITIES.map((group) => (
            <div key={group.id} className="space-y-4">
              <div className="border-b border-gray-800/70 pb-2.5">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                  {group.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{group.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {group.items.map((feat) => (
                  <Link
                    key={feat.href}
                    href={feat.href}
                    className="group p-4 rounded-xl border border-gray-800/80 hover:border-gray-700 bg-[#0B0C10] hover:bg-[#0E1016] transition-colors flex items-start gap-3.5"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        backgroundColor: `${group.color}15`,
                        border: `1px solid ${group.color}30`,
                      }}
                    >
                      <feat.icon className="w-4 h-4" style={{ color: group.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white group-hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                        <span className="truncate">{feat.title}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* GIT PROVIDERS */}
        <section id="providers" className="scroll-mt-44 space-y-4">
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Git Provider Integrations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "GitHub App", href: "/docs/github", badge: "Cloud & GHES" },
              { title: "GitLab Integration", href: "/docs/gitlab", badge: "SaaS & Self-Hosted" },
              { title: "Bitbucket Integration", href: "/docs/bitbucket", badge: "Cloud & Server" },
            ].map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group p-4 rounded-xl border border-gray-800/80 hover:border-brand-yellow/40 bg-[#0B0C10] transition-colors flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Puzzle className="w-4 h-4 text-brand-yellow" />
                    <span className="text-sm font-medium text-white group-hover:text-brand-yellow transition-colors">
                      {p.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500 mt-1 block">
                    {p.badge}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-brand-yellow transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* SECURITY & ZERO RETENTION */}
        <section
          id="security"
          className="scroll-mt-44 relative p-6 sm:p-8 rounded-2xl border border-brand-yellow/25 bg-brand-yellow/[0.03] overflow-hidden"
        >
          <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
            <Image src="/icon.png" alt="" width={96} height={96} />
          </div>
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2.5 mb-3">
              <Lock className="w-4 h-4 text-brand-yellow" />
              <h2 className="text-base font-semibold text-white">
                Zero-Retention Security Architecture
              </h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-5">
              Source files are processed inside ephemeral, isolated containers in volatile memory
              and purged immediately after review completion. Your code is never stored on disk
              or used for model training, under SOC2 Type II and ISO 27001 controls.
            </p>
            <div className="flex flex-wrap gap-5 text-xs font-medium">
              <Link
                href="/docs/privacy"
                className="text-brand-yellow hover:underline inline-flex items-center gap-1"
              >
                Privacy &amp; Data Retention
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/docs/security"
                className="text-brand-yellow hover:underline inline-flex items-center gap-1"
              >
                Enterprise Security Architecture
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* SUPPORT FOOTER */}
        <section className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Need engineering support?</h3>
            <p className="text-xs text-gray-500 mt-1">
              Check live system availability or reach out for enterprise onboarding.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/status"
              className="px-4 py-2 rounded-lg border border-gray-800 hover:border-gray-700 bg-[#0B0C10] text-xs font-medium text-gray-300 hover:text-white transition-colors"
            >
              System Status
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg bg-brand-yellow text-brand-black text-xs font-semibold hover:brightness-110 transition-all"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </div>

      {/* LAYER 3: Right Sticky "On This Page" Outline */}
      <aside className="hidden xl:block w-48 shrink-0 sticky top-[168px]">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
            <List className="w-3.5 h-3.5 text-gray-500" />
            <span>On this page</span>
          </div>
          <ul className="space-y-1.5 border-l border-gray-800/80">
            {TOC_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block pl-3 py-0.5 text-xs text-gray-500 hover:text-brand-yellow transition-colors -ml-px border-l border-transparent hover:border-brand-yellow"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
