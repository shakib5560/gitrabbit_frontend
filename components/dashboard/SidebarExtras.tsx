"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

import { ArrowUpRight, Flame, GitMerge, Sparkles, PlusCircle } from "lucide-react";
import { CoinTransaction } from "@/app/user/dashboard/page";

interface TopRepo {
  name: string;
  prCount: number;
  maxPrCount: number;
}

interface ActivityItem {
  icon: React.ReactNode;
  text: string;
  time: string;
}

interface SidebarExtrasProps {
  coins: number;
  transactions: CoinTransaction[];
}

export function SidebarExtras({ coins, transactions }: SidebarExtrasProps) {
  const topRepos: TopRepo[] = [
    { name: "frontend-app", prCount: 24, maxPrCount: 24 },
    { name: "api-service", prCount: 18, maxPrCount: 24 },
    { name: "mobile-app", prCount: 14, maxPrCount: 24 },
    { name: "design-system", prCount: 8, maxPrCount: 24 },
    { name: "docs-website", prCount: 3, maxPrCount: 24 },
  ];

  const activityFeed: ActivityItem[] = [
    {
      icon: <Sparkles size={11} className="text-brand-yellow" />,
      text: "AI found 3 new issues in api-service",
      time: "2h ago",
    },
    {
      icon: <GitMerge size={11} className="text-sky-500" />,
      text: "Sarah Johnson merged PR #134",
      time: "2h ago",
    },
    {
      icon: <Sparkles size={11} className="text-brand-yellow animate-pulse" />,
      text: "AI suggested improvements in #132",
      time: "4h ago",
    },
    {
      icon: <PlusCircle size={11} className="text-emerald-500" />,
      text: "Michael Chen opened PR #233",
      time: "4h ago",
    },
  ];

  return (
    <div className="flex flex-col gap-6 select-none">
      {/* 1. Rabbit Coins Wallet Panel (High-End 3D skeuomorphic card) */}
      <Card hoverGlow={true} delay={0.1} className="flex flex-col justify-between h-[300px] relative overflow-hidden group select-none">
        {/* Glow backlight behind the gold coin */}
        <div className="absolute right-2 top-2 w-28 h-28 rounded-full bg-brand-yellow/10 blur-xl pointer-events-none group-hover:bg-brand-yellow/15 transition-all duration-300" />
        
        {/* Glowing stars vector graphics for skeuomorphic detail */}
        <div className="absolute right-20 top-8 text-brand-yellow/30 pointer-events-none group-hover:scale-125 transition-transform duration-300">
          <Sparkles size={14} />
        </div>
        <div className="absolute right-4 top-24 text-brand-yellow/20 pointer-events-none group-hover:scale-110 transition-transform duration-300">
          <Sparkles size={10} />
        </div>

        <div>
          <div className="flex items-center justify-between border-b border-border-primary pb-3 mb-4 relative z-10">
            <h3 className="text-xs font-bold text-text-primary tracking-wider font-sans uppercase flex items-center gap-1.5">
              <span className="w-5 h-5 bg-brand-yellow/10 rounded-md flex items-center justify-center border border-brand-yellow/20">
                <img src="/icon.png" alt="Wallet Icon" className="w-3.5 h-3.5 object-contain" />
              </span>
              Rabbit Coins Wallet
            </h3>
            {/* Spinning/floating 3D physical gold coin */}
            <div className="absolute -right-3 -top-2 w-14 h-14 pointer-events-none">
              <img 
                src="/gcoin.png" 
                alt="3D Gold Coin" 
                className="w-full h-full object-contain animate-coin-spin filter drop-shadow-[0_4px_12px_rgba(245,197,24,0.45)]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-2 mb-3 relative z-10">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider">
                Available Balance
              </span>
              <span className="text-3xl font-black text-text-primary font-sans flex items-baseline gap-1 mt-0.5 tracking-tight">
                {coins}
                <span className="text-xs font-bold text-text-secondary">Coins</span>
              </span>
            </div>
            
            {/* Tactile flat-3D buy coins button */}
            <a
              href="/pricing"
              className="btn-flat-3d btn-flat-3d-gold px-4 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer font-sans"
            >
              Buy Coins
            </a>
          </div>

          <div className="space-y-2 mt-2 relative z-10">
            <span className="text-[9px] uppercase font-bold text-text-muted tracking-wider block mb-1">
              Recent Transactions
            </span>
            <div className="space-y-2 max-h-[100px] overflow-y-auto pr-1">
              {transactions && transactions.length > 0 ? (
                transactions.slice(0, 3).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between text-xs py-1.5 border-b border-border-primary/30 last:border-0">
                    <div className="flex flex-col min-w-0 max-w-[75%]">
                      <span className="text-text-primary truncate font-sans font-semibold text-[11px] leading-tight">{tx.description}</span>
                      <span className="text-[8px] text-text-muted mt-0.5 font-mono font-bold">{tx.time}</span>
                    </div>
                    <span className={`font-bold font-mono text-[11px] ${tx.type === "earn" ? "text-emerald-500" : "text-rose-500"}`}>
                      {tx.type === "earn" ? "+" : "-"}{tx.amount}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-3 text-xs text-text-muted font-sans font-semibold">
                  No transactions yet
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* 2. Top Repositories Panel */}
      <Card hoverGlow={true} delay={0.2} className="flex flex-col justify-between h-[300px]">
        <div>
          <div className="flex items-center justify-between border-b border-border-primary pb-3 mb-4">
            <h3 className="text-xs font-bold text-text-primary tracking-wider font-sans uppercase flex items-center gap-1.5">
              <Flame size={14} className="text-brand-yellow animate-pulse" />
              Top Repositories
            </h3>
            <span className="text-[9px] font-mono font-bold text-text-muted uppercase tracking-wider">By PR count</span>
          </div>

          <div className="space-y-3">
            {topRepos.map((repo, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-text-secondary truncate max-w-[150px]">{repo.name}</span>
                  <span className="font-extrabold text-text-primary font-mono">{repo.prCount}</span>
                </div>
                {/* Horizontal Progress Bar with gradient */}
                <div className="h-1.5 w-full bg-bg-tertiary rounded-full overflow-hidden border border-border-primary/30">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(repo.prCount / repo.maxPrCount) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-amber-500 to-brand-yellow rounded-full shadow-[0_0_4px_#F5C518]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="flex items-center gap-1 text-xs font-bold text-brand-yellow hover:text-[#e0b410] group mt-4 transition-all self-start cursor-pointer font-sans">
          <span>View all repositories</span>
          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </Card>

      {/* 3. Activity Feed Timeline */}
      <Card hoverGlow={true} delay={0.3} className="flex flex-col justify-between h-[300px]">
        <div>
          <div className="flex items-center justify-between border-b border-border-primary pb-3 mb-4">
            <h3 className="text-xs font-bold text-text-primary tracking-wider font-sans uppercase">
              Activity Feed
            </h3>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="relative border-l border-border-primary/50 pl-4 ml-1.5 space-y-4">
            {activityFeed.map((activity, idx) => (
              <div key={idx} className="relative group text-xs">
                {/* Timeline node dot */}
                <div className="absolute -left-[22px] top-0.5 w-3.5 h-3.5 rounded-full border border-border-primary bg-bg-secondary flex items-center justify-center group-hover:border-brand-yellow transition-colors shadow-sm">
                  {activity.icon}
                </div>

                <div className="flex flex-col">
                  <span className="text-text-primary font-bold tracking-wide leading-relaxed font-sans">
                    {activity.text}
                  </span>
                  <span className="text-[8px] text-text-muted mt-0.5 font-mono font-bold">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="flex items-center gap-1 text-xs font-bold text-brand-yellow hover:text-[#e0b410] group mt-4 transition-all self-start cursor-pointer font-sans">
          <span>View full activity</span>
          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </Card>
    </div>
  );
}
