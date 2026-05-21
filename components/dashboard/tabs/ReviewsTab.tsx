"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  CheckSquare, 
  Search, 
  MessageSquare, 
  ThumbsUp, 
  AlertCircle, 
  ShieldAlert, 
  FileCode,
  Sparkles,
  Check,
  ChevronRight
} from "lucide-react";

interface ReviewItem {
  id: string;
  repoName: string;
  prNumber: number;
  author: string;
  avatar: string;
  approvalStatus: "Approved" | "Requested Changes" | "Commented";
  summary: string;
  bugsCaught: number;
  securityVulns: number;
  time: string;
  commentDetails: {
    file: string;
    line: number;
    issue: string;
    suggestion: string;
  }[];
}

export function ReviewsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  const reviews: ReviewItem[] = [
    {
      id: "rev1",
      repoName: "api-service",
      prNumber: 233,
      author: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
      approvalStatus: "Commented",
      summary: "Identified a potential connection pool exhaustion vector and suggested a debounce routine for Redis reads.",
      bugsCaught: 3,
      securityVulns: 1,
      time: "2 hours ago",
      commentDetails: [
        {
          file: "src/db/connection.ts",
          line: 42,
          issue: "Database connection pool is instantiated on every module load instead of cached.",
          suggestion: "Use a global client cache to hold the database pool singleton across serverless runs.",
        },
        {
          file: "src/api/auth.ts",
          line: 89,
          issue: "JWT signing key is stored in raw config file and not sourced dynamically.",
          suggestion: "Source the signing key from `process.env.JWT_SECRET` and trigger an alert if missing.",
        }
      ]
    },
    {
      id: "rev2",
      repoName: "frontend-app",
      prNumber: 134,
      author: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
      approvalStatus: "Approved",
      summary: "Tested styling variables, checked hydration flags, and validated nested Framer Motion anim paths. Looks solid.",
      bugsCaught: 0,
      securityVulns: 0,
      time: "4 hours ago",
      commentDetails: []
    },
    {
      id: "rev3",
      repoName: "frontend-app",
      prNumber: 89,
      author: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
      approvalStatus: "Requested Changes",
      summary: "Found redundant token encryption block that degrades execution time by 1.2s. Requires immediate refactoring.",
      bugsCaught: 2,
      securityVulns: 2,
      time: "1 day ago",
      commentDetails: [
        {
          file: "app/login/page.tsx",
          line: 120,
          issue: "Synchronous crypto algorithm used on the main thread, blocking the event loop.",
          suggestion: "Use asynchronous crypto methods or delegate to a Web Worker script.",
        }
      ]
    },
  ];

  const filteredReviews = reviews.filter(rev =>
    rev.repoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rev.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rev.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeReview = reviews.find(r => r.id === selectedReview) || reviews[0];

  return (
    <div className="space-y-6 font-sans select-none">
      {/* Overview stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card hoverGlow={false} animate={true} className="flex items-center gap-4 bg-bg-secondary p-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <ThumbsUp size={18} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-text-primary">94.2%</h4>
            <p className="text-xs text-text-secondary mt-0.5">AI Review Accuracy</p>
          </div>
        </Card>
        <Card hoverGlow={false} animate={true} className="flex items-center gap-4 bg-bg-secondary p-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <AlertCircle size={18} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-text-primary">15</h4>
            <p className="text-xs text-text-secondary mt-0.5">Bugs Discovered (This week)</p>
          </div>
        </Card>
        <Card hoverGlow={false} animate={true} className="flex items-center gap-4 bg-bg-secondary p-5">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
            <ShieldAlert size={18} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-text-primary">3</h4>
            <p className="text-xs text-text-secondary mt-0.5">Security Flaws Patched</p>
          </div>
        </Card>
      </div>

      {/* Main Section split: Left Feed, Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-6">
        {/* Left Feed */}
        <div className="space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Filter reviews by repo, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border-primary bg-bg-secondary text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-yellow transition-colors font-sans"
            />
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                onClick={() => setSelectedReview(rev.id)}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                  (selectedReview === rev.id || (!selectedReview && rev.id === "rev1"))
                    ? "bg-bg-secondary border-brand-yellow/50 shadow-sm"
                    : "bg-bg-secondary/40 border-border-primary hover:border-text-muted hover:bg-bg-secondary/70"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-text-secondary bg-bg-tertiary px-1.5 py-0.5 rounded border border-border-primary/50">
                      {rev.repoName}
                    </span>
                    <span className="text-[10px] text-text-muted">PR #{rev.prNumber}</span>
                  </div>
                  <Badge 
                    variant={
                      rev.approvalStatus === "Approved" 
                        ? "success" 
                        : rev.approvalStatus === "Requested Changes" 
                          ? "error" 
                          : "gold"
                    }
                    className="text-[9px]"
                  >
                    {rev.approvalStatus}
                  </Badge>
                </div>

                <p className="text-xs text-text-primary font-sans line-clamp-2 leading-relaxed">
                  {rev.summary}
                </p>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-primary/50 text-[10px] font-bold text-text-muted">
                  <span>Reviewed {rev.time}</span>
                  <div className="flex gap-2">
                    {rev.bugsCaught > 0 && <span className="text-amber-500">{rev.bugsCaught} Bugs</span>}
                    {rev.securityVulns > 0 && <span className="text-rose-500">{rev.securityVulns} Sec</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div>
          <Card hoverGlow={false} animate={true} className="h-full bg-bg-secondary border-border-primary flex flex-col justify-between p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-border-primary pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-border-primary bg-bg-tertiary shadow-sm">
                    <img src={activeReview.avatar} alt={activeReview.author} className="object-cover w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">{activeReview.author}</h4>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Review for <span className="font-mono font-bold text-brand-yellow">{activeReview.repoName} #{activeReview.prNumber}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-text-muted block">{activeReview.time}</span>
                  <span className="inline-block mt-1">
                    <Badge variant={activeReview.approvalStatus === "Approved" ? "success" : activeReview.approvalStatus === "Requested Changes" ? "error" : "gold"}>
                      {activeReview.approvalStatus}
                    </Badge>
                  </span>
                </div>
              </div>

              {/* Summary description */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted">Summary & Overview</h5>
                <p className="text-sm text-text-primary leading-relaxed font-sans bg-bg-tertiary/40 border border-border-primary/50 p-3.5 rounded-xl italic">
                  &ldquo;{activeReview.summary}&rdquo;
                </p>
              </div>

              {/* Found comments / suggestions */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-text-muted">AI AST Observations ({activeReview.commentDetails.length})</h5>
                
                {activeReview.commentDetails.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center bg-bg-tertiary/20 border border-dashed border-border-primary rounded-xl">
                    <Check className="w-8 h-8 text-emerald-500 mb-2 animate-pulse" />
                    <span className="text-xs font-bold text-text-secondary">Clean Review! No issues flagged.</span>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1">
                    {activeReview.commentDetails.map((det, idx) => (
                      <div key={idx} className="border border-border-primary rounded-xl overflow-hidden bg-bg-primary/50">
                        <div className="bg-bg-tertiary px-3.5 py-2 border-b border-border-primary flex items-center justify-between font-mono text-[10px] font-bold">
                          <span className="text-text-secondary flex items-center gap-1">
                            <FileCode size={12} className="text-text-muted" /> {det.file}
                          </span>
                          <span className="text-brand-yellow">Line {det.line}</span>
                        </div>
                        <div className="p-3.5 space-y-2 text-xs font-sans">
                          <div className="flex items-start gap-1.5 text-text-primary">
                            <span className="text-rose-500 font-bold shrink-0">Issue:</span>
                            <span className="text-text-secondary leading-relaxed">{det.issue}</span>
                          </div>
                          <div className="flex items-start gap-1.5 text-text-primary border-t border-border-primary/50 pt-2.5 mt-2.5">
                            <span className="text-emerald-500 font-bold shrink-0">Fix:</span>
                            <span className="text-text-primary font-mono text-[11px] leading-relaxed bg-bg-tertiary/80 p-2 rounded w-full border border-border-primary/50 block select-all">
                              {det.suggestion}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button className="w-full mt-4 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-bold py-2.5 rounded-xl hover:bg-brand-yellow/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              <Sparkles size={14} />
              <span>Open in Full Code Diff</span>
              <ChevronRight size={14} />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
