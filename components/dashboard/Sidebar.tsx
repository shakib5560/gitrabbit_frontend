"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  GitBranch,
  GitPullRequest,
  CheckSquare,
  Sparkles,
  BarChart3,
  FileText,
  Blocks,
  Settings,
  ChevronLeft,
  ChevronRight,
  FolderDot,
  Users,
  MessageSquare,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  coins: number;
}

export function Sidebar({ activeTab, setActiveTab, coins }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "repositories", label: "Repositories", icon: GitBranch },
    { id: "prs", label: "Pull Requests", icon: GitPullRequest },
    { id: "reviews", label: "Reviews", icon: CheckSquare },
    { id: "suggestions", label: "AI Suggestions", icon: Sparkles },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "integrations", label: "Integrations", icon: Blocks },
    { id: "team", label: "Team Collaboration", icon: Users },
    { id: "chat", label: "Real-time Messaging", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const recentRepos = [
    { name: "frontend-app", count: 12 },
    { name: "api-service", count: 7 },
    { name: "mobile-app", count: 5 },
    { name: "design-system", count: 3 },
    { name: "docs-website", count: 2 },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-0 left-0 h-screen border-r border-border-primary bg-bg-secondary flex flex-col justify-between py-6 px-4 z-40 select-none shadow-[4px_0_20px_rgba(0,0,0,0.15)]"
    >
      {/* Top Brand Logo Section */}
      <div>
        <div className="flex items-center justify-between px-2 mb-8 relative">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex-shrink-0 w-8 h-8 rounded-xl overflow-hidden bg-brand-yellow/10 flex items-center justify-center border border-brand-yellow/20 shadow-sm animate-float">
              <img
                src="/icon.png"
                alt="GitRabbit Icon"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="font-black text-lg text-text-primary tracking-tight font-sans"
              >
                GitRabbit
              </motion.span>
            )}
          </div>

          {/* Collapse Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-7 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-border-primary bg-bg-secondary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary flex items-center justify-center transition-all cursor-pointer shadow-sm"
          >
            {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all relative overflow-hidden group cursor-pointer ${
                  isActive
                    ? "text-brand-yellow"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-brand-yellow/10 border-l-[3px] border-brand-yellow rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  size={16}
                  className={`relative z-10 transition-transform duration-250 group-hover:scale-110 ${
                    isActive ? "text-brand-yellow filter drop-shadow-[0_0_3px_#F5C518]" : "text-text-secondary"
                  }`}
                />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10 font-sans tracking-wide text-xs"
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Divider & Recent Repositories */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 pt-5 border-t border-border-primary/50"
          >
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted">
              Recent Repositories
            </span>
            <div className="mt-3 space-y-1">
              {recentRepos.map((repo) => (
                <button
                  key={repo.name}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <FolderDot size={14} className="text-text-muted group-hover:text-brand-yellow transition-colors" />
                    <span className="truncate max-w-[130px] font-mono">{repo.name}</span>
                  </div>
                  <span className="bg-bg-tertiary text-text-secondary group-hover:bg-brand-yellow/15 group-hover:text-brand-yellow font-sans px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors">
                    {repo.count}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Rabbit Coins Balance Card (only when sidebar is expanded) */}
      <div className="mt-auto">
        {!isCollapsed ? (
          <div className="mx-1 mb-4 p-3 bg-brand-yellow/5 border border-brand-yellow/15 rounded-2xl flex flex-col gap-2 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-brand-yellow/10 rounded-md flex items-center justify-center border border-brand-yellow/20">
                  <img src="/icon.png" alt="Coin Icon" className="w-3.5 h-3.5 object-contain" />
                </div>
                <span className="text-[10px] font-bold text-text-primary font-sans uppercase tracking-wider">Rabbit Coins</span>
              </div>
              <span className="text-xs font-extrabold text-brand-yellow font-sans">{coins}</span>
            </div>
            <div className="h-1.5 w-full bg-bg-tertiary rounded-full overflow-hidden border border-border-primary/50">
              <div
                style={{ width: `${Math.min(100, (coins / 100) * 100)}%` }}
                className="h-full bg-brand-yellow rounded-full transition-all duration-500 shadow-[0_0_6px_#F5C518]"
              />
            </div>
            <div className="flex justify-between items-center text-[9px] font-bold text-text-muted mt-0.5">
              <span>{coins} Available</span>
              <a
                href="/pricing"
                className="text-brand-yellow font-black hover:underline tracking-wide font-sans flex items-center gap-0.5 cursor-pointer uppercase"
              >
                Buy More &rarr;
              </a>
            </div>
          </div>
        ) : (
          <a
            href="/pricing"
            className="mx-auto mb-4 w-9 h-9 rounded-xl border border-brand-yellow/20 bg-brand-yellow/5 flex items-center justify-center text-brand-yellow hover:bg-brand-yellow/15 transition-all cursor-pointer relative group shadow-sm coin-glow"
            title={`${coins} Rabbit Coins available. Click to buy more.`}
          >
            <img src="/icon.png" alt="Coins" className="w-4 h-4 object-contain animate-pulse" />
            <span className="absolute -top-1 -right-1 bg-brand-yellow text-brand-black text-[8px] font-black px-1.5 rounded-full border border-bg-secondary scale-90 shadow-sm">
              {coins}
            </span>
          </a>
        )}

        {/* Profile Section */}
        <div className="border-t border-border-primary/50 pt-4 px-1 flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border border-border-primary bg-bg-tertiary flex items-center justify-center select-none shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Alex Morgan Avatar"
              width={36}
              height={36}
              className="object-cover w-9 h-9"
            />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col min-w-0"
            >
              <p className="text-xs font-bold text-text-primary truncate font-sans">
                Alex Morgan
              </p>
              <p className="text-[9px] font-bold text-text-muted truncate font-mono mt-0.5">
                alex@example.com
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
