"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  GitPullRequest, 
  Search, 
  Sparkles, 
  ArrowUpRight, 
  RefreshCw, 
  Check,
  User,
  Clock,
  ExternalLink
} from "lucide-react";

interface PRItem {
  id: string;
  repoName: string;
  prNumber: number;
  title: string;
  author: string;
  status: "Open" | "Merged" | "Closed";
  reviewStatus: "Completed" | "Pending" | "Running";
  time: string;
  insights: {
    high: number;
    medium: number;
    low: number;
  };
}

export function PullRequestsTab() {
  const [filterStatus, setFilterStatus] = useState<"All" | "Open" | "Merged">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [prs, setPrs] = useState<PRItem[]>([
    {
      id: "pr1",
      repoName: "api-service",
      prNumber: 233,
      title: "Optimize database queries and indexes",
      author: "Michael Chen",
      status: "Open",
      reviewStatus: "Completed",
      time: "4 hours ago",
      insights: { high: 5, medium: 10, low: 8 },
    },
    {
      id: "pr2",
      repoName: "frontend-app",
      prNumber: 134,
      title: "Add dark mode support and theme animations",
      author: "Sarah Johnson",
      status: "Merged",
      reviewStatus: "Completed",
      time: "2 hours ago",
      insights: { high: 0, medium: 3, low: 14 },
    },
    {
      id: "pr3",
      repoName: "frontend-app",
      prNumber: 89,
      title: "Fix login session timeout leak on dashboard",
      author: "Emily Davis",
      status: "Merged",
      reviewStatus: "Completed",
      time: "6 hours ago",
      insights: { high: 1, medium: 2, low: 5 },
    },
    {
      id: "pr4",
      repoName: "api-service",
      prNumber: 132,
      title: "Improve API accessibility and documentation hooks",
      author: "David Wilson",
      status: "Open",
      reviewStatus: "Pending",
      time: "1 day ago",
      insights: { high: 0, medium: 0, low: 0 },
    },
    {
      id: "pr5",
      repoName: "mobile-app",
      prNumber: 421,
      title: "Feature/payment integrations (Stripe, Paypal SDK)",
      author: "Alex Morgan",
      status: "Open",
      reviewStatus: "Running",
      time: "30 mins ago",
      insights: { high: 0, medium: 0, low: 0 },
    },
    {
      id: "pr6",
      repoName: "design-system",
      prNumber: 52,
      title: "Upgrade Tailwind package and CSS variables template",
      author: "Sarah Johnson",
      status: "Closed",
      reviewStatus: "Completed",
      time: "5 days ago",
      insights: { high: 0, medium: 1, low: 10 },
    },
  ]);

  const handleReRequestReview = (id: string) => {
    setPrs(prev => prev.map(pr => {
      if (pr.id === id) {
        return { ...pr, reviewStatus: "Running" };
      }
      return pr;
    }));

    setTimeout(() => {
      setPrs(prev => prev.map(pr => {
        if (pr.id === id) {
          return { 
            ...pr, 
            reviewStatus: "Completed", 
            insights: { high: Math.floor(Math.random() * 3), medium: Math.floor(Math.random() * 8), low: Math.floor(Math.random() * 12) } 
          };
        }
        return pr;
      }));
    }, 2000);
  };

  const filteredPrs = prs.filter(pr => {
    const matchesSearch = pr.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pr.repoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pr.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || pr.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters & Search Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search pull requests by title, repository, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border-primary bg-bg-secondary text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-yellow transition-colors font-sans"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2 p-1.5 bg-bg-secondary border border-border-primary rounded-xl self-stretch md:self-auto justify-around">
          {(["All", "Open", "Merged"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                filterStatus === status
                  ? "bg-brand-yellow/10 text-brand-yellow"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* PR Card list */}
      <div className="space-y-4">
        {filteredPrs.map((pr, idx) => (
          <Card key={pr.id} hoverGlow={true} delay={idx * 0.04} className="font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Left Column: Info & Details */}
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-[10px] font-mono font-bold text-text-secondary bg-bg-tertiary px-2 py-0.5 rounded border border-border-primary/50">
                    {pr.repoName}
                  </span>
                  <span className="text-xs text-text-muted">#{pr.prNumber}</span>
                  <Badge 
                    variant={
                      pr.status === "Merged" 
                        ? "info" 
                        : pr.status === "Closed" 
                          ? "default" 
                          : "warning"
                    }
                  >
                    {pr.status}
                  </Badge>
                </div>
                
                <h4 className="text-sm md:text-base font-bold text-text-primary hover:text-brand-yellow transition-colors cursor-pointer truncate max-w-xl flex items-center gap-1.5">
                  {pr.title}
                  <ExternalLink size={12} className="text-text-muted inline" />
                </h4>

                <div className="flex items-center gap-4 text-xs text-text-secondary flex-wrap">
                  <span className="flex items-center gap-1">
                    <User size={12} className="text-text-muted" /> {pr.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-text-muted" /> {pr.time}
                  </span>
                  
                  {/* AI Status Indicator */}
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
                    <span className="text-brand-yellow font-bold uppercase tracking-wider text-[9px]">
                      AI: {pr.reviewStatus}
                    </span>
                  </span>
                </div>
              </div>

              {/* Right Column: AI Insights & Quick Actions */}
              <div className="flex items-center gap-4 self-end md:self-auto">
                {/* Insights Pills */}
                {pr.reviewStatus === "Completed" && (
                  <div className="flex items-center gap-1.5">
                    {pr.insights.high > 0 && (
                      <span className="px-2 py-1 rounded-lg text-[10px] font-bold font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 shadow-[0_0_8px_rgba(244,63,94,0.15)]">
                        H: {pr.insights.high}
                      </span>
                    )}
                    <span className="px-2 py-1 rounded-lg text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.1)]">
                      M: {pr.insights.medium}
                    </span>
                    <span className="px-2 py-1 rounded-lg text-[10px] font-bold font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.1)]">
                      L: {pr.insights.low}
                    </span>
                  </div>
                )}

                {pr.reviewStatus === "Running" && (
                  <span className="text-xs text-text-secondary flex items-center gap-1 font-mono">
                    <RefreshCw size={12} className="animate-spin text-brand-yellow" />
                    Analyzing Diff...
                  </span>
                )}

                {pr.reviewStatus === "Pending" && (
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="font-bold text-xs"
                    onClick={() => handleReRequestReview(pr.id)}
                  >
                    <Sparkles size={12} />
                    <span>Run Review</span>
                  </Button>
                )}

                {pr.reviewStatus === "Completed" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="font-bold text-xs text-text-secondary hover:text-text-primary"
                    onClick={() => handleReRequestReview(pr.id)}
                  >
                    <RefreshCw size={12} />
                    <span>Re-Run</span>
                  </Button>
                )}
              </div>

            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
