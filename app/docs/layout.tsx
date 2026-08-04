"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search, Menu, X, Globe, Terminal, Cpu, Lock, Zap,
  GitPullRequest, Brain, Users, Code, Shield, Puzzle,
  GitMerge, FlaskConical, BookOpen, BarChart3, MessageSquare,
  Settings, Bug, FileText, Workflow, Eye, Database, Activity
} from "lucide-react";
import { Slack } from "@/components/Icons";
import { motion, AnimatePresence } from "framer-motion";

const DOCS_NAV = [
  {
    title: "System_Core",
    items: [
      { name: "Introduction", href: "/docs", icon: Globe },
      { name: "Quick_Start", href: "/docs/quickstart", icon: Zap },
      { name: "Installation", href: "/docs/installation", icon: Terminal },
      { name: "Configuration", href: "/docs/config", icon: Cpu },
    ]
  },
  {
    title: "PR_Reviews",
    items: [
      { name: "Automated_Reviews", href: "/docs/reviews", icon: Eye },
      { name: "AI_Summaries", href: "/docs/summaries", icon: Brain },
      { name: "One-Click_Fixes", href: "/docs/fixes", icon: Zap },
      { name: "Bug_Detection", href: "/docs/bug-detection", icon: Bug },
      { name: "Agentic_Chat", href: "/docs/agentic-chat", icon: MessageSquare },
    ]
  },
  {
    title: "Codebase_Intelligence",
    items: [
      { name: "Code_Graph", href: "/docs/code-graph", icon: Database },
      { name: "Team_Learnings", href: "/docs/team-learnings", icon: Brain },
      { name: "Language_Support", href: "/docs/languages", icon: Code },
    ]
  },
  {
    title: "Team_Collaboration",
    items: [
      { name: "Slack_Agent", href: "/docs/slack-agent", icon: Slack },
      { name: "Team_Rules", href: "/docs/team-rules", icon: Users },
      { name: "Review_Analytics", href: "/docs/analytics", icon: BarChart3 },
      { name: "Custom_Workflows", href: "/docs/workflows", icon: Workflow },
    ]
  },
  {
    title: "Developer_Workflow",
    items: [
      { name: "IDE_Integration", href: "/docs/ide", icon: Code },
      { name: "Pre-Commit_CLI", href: "/docs/cli", icon: Terminal },
      { name: "CI/CD_Integration", href: "/docs/cicd", icon: GitMerge },
    ]
  },
  {
    title: "Pre-Merge_Automation",
    items: [
      { name: "CodeRabbit_Plan", href: "/docs/plan", icon: FileText },
      { name: "Unit_Test_Gen", href: "/docs/test-gen", icon: FlaskConical },
      { name: "Docstring_Gen", href: "/docs/docstrings", icon: BookOpen },
      { name: "Merge_Conflicts", href: "/docs/merge-conflicts", icon: GitPullRequest },
    ]
  },
  {
    title: "Security_&_Compliance",
    items: [
      { name: "SAST_Integrations", href: "/docs/sast", icon: Shield },
      { name: "Custom_Checks", href: "/docs/checks", icon: Settings },
      { name: "Enterprise_Security", href: "/docs/security", icon: Lock },
      { name: "Privacy_Vault", href: "/docs/privacy", icon: Lock },
    ]
  },
  {
    title: "Integrations",
    items: [
      { name: "GitHub_Node", href: "/docs/github", icon: Puzzle },
      { name: "GitLab_Node", href: "/docs/gitlab", icon: Puzzle },
      { name: "Bitbucket_Node", href: "/docs/bitbucket", icon: Puzzle },
      { name: "API_Reference", href: "/docs/api", icon: Activity },
    ]
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNav = DOCS_NAV.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.name.toLowerCase().replace(/_/g, " ").includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0 || searchQuery === "");

  return (
    <div className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-brand-black font-mono">
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 bg-pixel-grid opacity-5 pointer-events-none" />

      <Navbar />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row pt-40 px-6 md:px-12 gap-12 relative min-h-screen">

        {/* MOBILE SIDEBAR TOGGLE */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed bottom-8 right-8 z-[100] bg-brand-yellow text-brand-black p-5 rounded-full shadow-[0_0_20px_rgba(245,197,24,0.4)] border-2 border-white active:scale-95 transition-all"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* SIDEBAR */}
        <aside className={`
          fixed inset-0 z-[80] lg:relative lg:inset-auto lg:z-auto
          w-full lg:w-64 shrink-0 pb-12 lg:sticky lg:top-40 lg:h-[calc(100vh-12rem)]
          bg-brand-black/95 lg:bg-transparent px-8 py-24 lg:p-0
          transition-all duration-500 lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:opacity-100 opacity-0"}
          overflow-y-auto overflow-x-hidden custom-scrollbar
        `}>
          {/* Docs Search */}
          <div className="relative mb-10 group">
            <div className="absolute -inset-1 bg-brand-yellow/5 rounded blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
            <div className="relative bg-[#0D0D0D] border border-gray-900 group-focus-within:border-brand-yellow/40 rounded-sm flex items-center px-3 py-2.5 transition-colors">
              <Search className="w-3 h-3 text-brand-yellow/50 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="search_docs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent w-full text-[11px] font-mono text-brand-white focus:outline-none uppercase placeholder:text-gray-700"
              />
            </div>
          </div>

          <nav className="space-y-10">
            {filteredNav.map((section) => (
              <div key={section.title} className="relative">
                <h3 className="text-brand-yellow/40 font-press-start text-[7px] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-yellow/30 rounded-full" />
                  {section.title}
                </h3>
                <ul className="space-y-0.5 ml-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`flex items-center gap-2.5 py-1.5 px-3 rounded-sm text-[10px] font-mono transition-all relative group ${
                            isActive
                              ? "text-brand-white bg-brand-yellow/10 border-l-2 border-brand-yellow"
                              : "text-gray-500 hover:text-brand-white hover:bg-white/5 border-l-2 border-transparent"
                          }`}
                        >
                          {Icon && (
                            <Icon className={`w-3 h-3 shrink-0 ${isActive ? "text-brand-yellow" : "text-gray-700 group-hover:text-gray-500"}`} />
                          )}
                          <span className="uppercase tracking-wider">{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col gap-4">
            <div className="flex items-center gap-3 opacity-50 group hover:opacity-100 transition-opacity">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="w-8 h-8 relative shrink-0"
              >
                <Image src="/icon.png" alt="" fill className="object-contain" />
              </motion.div>
              <div className="text-[9px] font-mono uppercase leading-tight">
                <span className="text-brand-yellow font-bold">GitRabbit_OS</span><br />
                <span className="text-gray-600">v2.4.0-STABLE</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] text-gray-600 font-mono uppercase tracking-wider">All Systems Nominal</span>
            </div>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-1 min-w-0 pb-32 relative z-10 lg:pl-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Footer />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1A1A1A;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #F5C518;
        }
      `}</style>
    </div>
  );
}
