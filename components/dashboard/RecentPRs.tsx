"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight, Sparkles, GitMerge, GitPullRequest } from "lucide-react";

interface PRItem {
  repoName: string;
  prNumber: number;
  title: string;
  status: "Merged" | "Open" | "Review";
  reviewer: {
    name: string;
    username: string;
    location: string;
    initials: string;
    color: string;
  };
  time: string;
  branch: string;
  insights: {
    high: number;
    medium: number;
    low: number;
  };
  additions: number;
  deletions: number;
}

interface RecentPRsProps {
  onViewAll?: () => void;
}

export function RecentPRs({ onViewAll }: RecentPRsProps) {
  const prs: PRItem[] = [
    {
      repoName: "gitrabbit-backend",
      prNumber: 47,
      title: "Implement JWT refresh token rotation & Redis session store",
      status: "Open",
      reviewer: {
        name: "Rakibul Hasan",
        username: "rakib-dev",
        location: "Dhaka, BD 🇧🇩",
        initials: "RH",
        color: "#F5C518",
      },
      time: "2h ago",
      branch: "feature/auth-refresh",
      insights: { high: 2, medium: 4, low: 7 },
      additions: 312,
      deletions: 48,
    },
    {
      repoName: "gitrabbit-frontend",
      prNumber: 83,
      title: "Add AI-powered PR diff viewer with syntax highlighting",
      status: "Review",
      reviewer: {
        name: "Tanvir Ahmed",
        username: "tanvir-codes",
        location: "Chittagong, BD 🇧🇩",
        initials: "TA",
        color: "#10B981",
      },
      time: "5h ago",
      branch: "feature/ai-diff-viewer",
      insights: { high: 0, medium: 3, low: 11 },
      additions: 528,
      deletions: 92,
    },
  ];

  return (
    <Card hoverGlow={true} delay={0.3} className="flex flex-col h-full select-none justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-primary pb-4 mb-5">
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

        {/* PR Cards */}
        <div className="space-y-4">
          {prs.map((pr, idx) => (
            <div
              key={idx}
              className="group relative rounded-xl border border-border-primary bg-bg-secondary hover:border-brand-yellow/30 hover:bg-bg-tertiary/30 transition-all duration-300 p-4 overflow-hidden"
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl transition-all duration-300"
                style={{ backgroundColor: pr.status === "Merged" ? "#38bdf8" : pr.status === "Review" ? pr.reviewer.color : "#F5C518" }}
              />

              <div className="flex flex-col gap-3 pl-2">
                {/* Top row: repo + status + time */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold text-text-secondary bg-bg-tertiary px-2 py-0.5 rounded border border-border-primary/50">
                      {pr.repoName}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">
                      {pr.branch}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-text-muted font-sans">{pr.time}</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                        pr.status === "Merged"
                          ? "border-sky-500/25 bg-sky-500/5 text-sky-400"
                          : pr.status === "Review"
                          ? "border-emerald-500/25 bg-emerald-500/5 text-emerald-400"
                          : "border-amber-500/25 bg-amber-500/5 text-amber-400"
                      }`}
                    >
                      {pr.status === "Merged" ? (
                        <GitMerge size={9} />
                      ) : (
                        <GitPullRequest size={9} />
                      )}
                      {pr.status}
                    </span>
                  </div>
                </div>

                {/* PR title */}
                <p className="text-sm font-bold text-text-primary group-hover:text-brand-yellow transition-colors font-sans leading-snug">
                  <span className="text-text-muted font-mono text-xs mr-1">#{pr.prNumber}</span>
                  {pr.title}
                </p>

                {/* Bottom row: reviewer + diff stats + insights */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  {/* Reviewer */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-black shrink-0 shadow-sm"
                      style={{ backgroundColor: pr.reviewer.color }}
                    >
                      {pr.reviewer.initials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-primary font-sans leading-none">
                        {pr.reviewer.name}
                      </p>
                      <p className="text-[10px] text-text-muted font-sans mt-0.5">
                        {pr.reviewer.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Diff stats */}
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold">
                      <span className="text-emerald-400">+{pr.additions}</span>
                      <span className="text-text-muted">/</span>
                      <span className="text-rose-400">-{pr.deletions}</span>
                    </div>

                    {/* AI Insight badges */}
                    <div className="flex items-center gap-1">
                      {pr.insights.high > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20">
                          H:{pr.insights.high}
                        </span>
                      )}
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20">
                        M:{pr.insights.medium}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                        L:{pr.insights.low}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer — View All */}
      <button
        onClick={onViewAll}
        className="flex items-center gap-1.5 text-xs font-bold text-brand-yellow hover:text-[#e0b410] mt-5 group transition-all self-start cursor-pointer font-sans"
      >
        <span>View all pull requests</span>
        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </Card>
  );
}
