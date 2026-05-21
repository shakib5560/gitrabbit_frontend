"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface PRItem {
  repoName: string;
  prNumber: number;
  title: string;
  status: "Merged" | "Open";
  reviewer: {
    name: string;
    avatar: string;
  };
  time: string;
  insights: {
    high: number;
    medium: number;
    low: number;
  };
}

export function RecentPRs() {
  const prs: PRItem[] = [
    {
      repoName: "api-service",
      prNumber: 233,
      title: "Optimize database queries",
      status: "Open",
      reviewer: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
      },
      time: "4h ago",
      insights: { high: 5, medium: 10, low: 8 },
    },
    {
      repoName: "frontend-app",
      prNumber: 134,
      title: "Add dark mode support",
      status: "Merged",
      reviewer: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
      },
      time: "2h ago",
      insights: { high: 0, medium: 3, low: 14 },
    },
    {
      repoName: "frontend-app",
      prNumber: 89,
      title: "Fix login session issue",
      status: "Merged",
      reviewer: {
        name: "Emily Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
      },
      time: "6h ago",
      insights: { high: 1, medium: 2, low: 5 },
    },
    {
      repoName: "api-service",
      prNumber: 132,
      title: "Improve accessibility",
      status: "Open",
      reviewer: {
        name: "David Wilson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
      },
      time: "1d ago",
      insights: { high: 3, medium: 6, low: 9 },
    },
  ];

  return (
    <Card hoverGlow={true} delay={0.3} className="flex flex-col h-full select-none justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-border-primary pb-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-text-primary tracking-wide font-sans">
              Recent Pull Requests
            </h3>
            <p className="text-xs text-text-secondary mt-0.5 font-sans">
              Code reviews currently active or recently closed
            </p>
          </div>
          <Sparkles size={16} className="text-brand-yellow animate-pulse" />
        </div>

        {/* PR List Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border-primary text-text-muted text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3 font-sans">Repository</th>
                <th className="py-3 font-sans">Title</th>
                <th className="py-3 font-sans">Status</th>
                <th className="py-3 font-sans">Reviewer</th>
                <th className="py-3 font-sans text-right">Insights</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary/50">
              {prs.map((pr, idx) => (
                <tr key={idx} className="group hover:bg-bg-tertiary/20 transition-all duration-200">
                  {/* Repo */}
                  <td className="py-4 pr-3">
                    <span className="text-[10px] font-mono font-bold text-text-secondary bg-bg-tertiary px-2 py-0.5 rounded border border-border-primary/50">
                      {pr.repoName}
                    </span>
                  </td>

                  {/* Title */}
                  <td className="py-4 pr-4">
                    <span className="text-xs md:text-sm font-bold text-text-primary group-hover:text-brand-yellow transition-colors font-sans truncate max-w-[220px] block">
                      #{pr.prNumber} {pr.title}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm ${
                        pr.status === "Merged"
                          ? "border-sky-500/25 bg-sky-500/5 text-sky-400"
                          : "border-amber-500/25 bg-amber-500/5 text-amber-400"
                      }`}
                    >
                      {pr.status}
                    </span>
                  </td>

                  {/* Reviewer Profile */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-border-primary flex-shrink-0 bg-bg-tertiary shadow-sm">
                        <img
                          src={pr.reviewer.avatar}
                          alt={pr.reviewer.name}
                          width={24}
                          height={24}
                          className="object-cover w-6 h-6"
                        />
                      </div>
                      <span className="text-xs font-semibold text-text-secondary font-sans truncate max-w-[100px]">
                        {pr.reviewer.name}
                      </span>
                    </div>
                  </td>

                  {/* AI Insights Indicators */}
                  <td className="py-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      {pr.insights.high > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 shadow-[0_0_8px_rgba(244,63,94,0.15)]">
                          High: {pr.insights.high}
                        </span>
                      )}
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.1)]">
                        Medium: {pr.insights.medium}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.1)]">
                        Low: {pr.insights.low}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer link */}
      <button className="flex items-center gap-1.5 text-xs font-bold text-brand-yellow hover:text-[#e0b410] mt-4 group transition-all self-start cursor-pointer font-sans">
        <span>View all pull requests</span>
        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </Card>
  );
}
