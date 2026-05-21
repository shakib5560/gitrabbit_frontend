"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  GitBranch, 
  Search, 
  Plus, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  MoreVertical,
  Terminal,
  FolderDot
} from "lucide-react";

interface Repository {
  name: string;
  provider: "github" | "gitlab" | "bitbucket";
  health: "Excellent" | "Fair" | "Critical";
  issuesCount: number;
  lastScan: string;
  languages: { name: string; percentage: number; color: string }[];
  isPrivate: boolean;
  status: "idle" | "scanning";
}

export function RepositoriesTab({ onAddRepo }: { onAddRepo: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [repos, setRepos] = useState<Repository[]>([
    {
      name: "frontend-app",
      provider: "github",
      health: "Excellent",
      issuesCount: 3,
      lastScan: "2 hours ago",
      isPrivate: true,
      status: "idle",
      languages: [
        { name: "TypeScript", percentage: 72, color: "#3178C6" },
        { name: "TSX", percentage: 18, color: "#512DA8" },
        { name: "CSS", percentage: 10, color: "#563D7C" },
      ],
    },
    {
      name: "api-service",
      provider: "github",
      health: "Fair",
      issuesCount: 14,
      lastScan: "5 hours ago",
      isPrivate: true,
      status: "idle",
      languages: [
        { name: "Go", percentage: 85, color: "#00ADD8" },
        { name: "Docker", percentage: 10, color: "#384d54" },
        { name: "Shell", percentage: 5, color: "#89e051" },
      ],
    },
    {
      name: "mobile-app",
      provider: "gitlab",
      health: "Critical",
      issuesCount: 32,
      lastScan: "1 day ago",
      isPrivate: true,
      status: "idle",
      languages: [
        { name: "Swift", percentage: 60, color: "#F05138" },
        { name: "Kotlin", percentage: 38, color: "#A97BFF" },
        { name: "Other", percentage: 2, color: "#CCCCCC" },
      ],
    },
    {
      name: "design-system",
      provider: "github",
      health: "Excellent",
      issuesCount: 0,
      lastScan: "3 days ago",
      isPrivate: false,
      status: "idle",
      languages: [
        { name: "TypeScript", percentage: 95, color: "#3178C6" },
        { name: "HTML", percentage: 5, color: "#E34C26" },
      ],
    },
    {
      name: "docs-website",
      provider: "bitbucket",
      health: "Excellent",
      issuesCount: 1,
      lastScan: "4 days ago",
      isPrivate: false,
      status: "idle",
      languages: [
        { name: "MDX", percentage: 80, color: "#fc5a03" },
        { name: "JavaScript", percentage: 20, color: "#F1E05A" },
      ],
    },
  ]);

  const handleScan = (index: number) => {
    // Set status to scanning
    const updated = [...repos];
    updated[index].status = "scanning";
    setRepos(updated);

    // Simulate completion
    setTimeout(() => {
      setRepos(prev => {
        const next = [...prev];
        next[index].status = "idle";
        next[index].lastScan = "Just now";
        if (next[index].issuesCount > 0) {
          next[index].issuesCount = Math.max(0, next[index].issuesCount - 2); // Rabbit fixed some!
        }
        return next;
      });
    }, 2000);
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search connected repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border-primary bg-bg-secondary text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-yellow transition-colors font-sans"
          />
        </div>
        <Button onClick={onAddRepo} className="w-full sm:w-auto font-bold flex items-center gap-1.5 shadow-sm">
          <Plus size={16} />
          <span>Connect Repository</span>
        </Button>
      </div>

      {/* Grid of Repository Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map((repo, idx) => (
          <Card key={repo.name} hoverGlow={true} delay={idx * 0.05} className="flex flex-col justify-between h-[300px]">
            {/* Header info */}
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-bg-tertiary flex items-center justify-center border border-border-primary/50 text-text-secondary">
                    <FolderDot size={18} className="text-text-secondary group-hover:text-brand-yellow transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary font-mono tracking-tight flex items-center gap-1.5">
                      {repo.name}
                      {repo.isPrivate && <Lock size={12} className="text-text-muted" />}
                    </h4>
                    <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider font-sans">
                      via {repo.provider}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Badge 
                    variant={
                      repo.health === "Excellent" 
                        ? "success" 
                        : repo.health === "Fair" 
                          ? "warning" 
                          : "error"
                    }
                  >
                    {repo.health}
                  </Badge>
                  <button className="p-1 rounded hover:bg-bg-tertiary text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                    <MoreVertical size={14} />
                  </button>
                </div>
              </div>

              {/* Stats Block */}
              <div className="grid grid-cols-2 gap-4 mt-6 py-4 border-y border-border-primary/50 font-sans">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Issues Found</span>
                  <span className="text-lg font-extrabold text-text-primary flex items-center gap-1.5">
                    {repo.issuesCount === 0 ? (
                      <span className="text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 size={16} /> 0
                      </span>
                    ) : (
                      <span className={`${repo.issuesCount > 15 ? "text-rose-500" : "text-amber-500"} flex items-center gap-1`}>
                        <AlertTriangle size={16} /> {repo.issuesCount}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Last Analyzed</span>
                  <span className="text-xs font-semibold text-text-secondary mt-1">{repo.lastScan}</span>
                </div>
              </div>
            </div>

            {/* Bottom Languages & Action */}
            <div className="space-y-4">
              {/* Language distribution bar */}
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-bg-tertiary rounded-full overflow-hidden flex">
                  {repo.languages.map((lang) => (
                    <div
                      key={lang.name}
                      style={{ 
                        width: `${lang.percentage}%`, 
                        backgroundColor: lang.color 
                      }}
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-bold text-text-secondary">
                  {repo.languages.map((lang) => (
                    <div key={lang.name} className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lang.color }} />
                      <span>{lang.name} ({lang.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scan Trigger Button */}
              <Button
                variant={repo.status === "scanning" ? "outline" : "secondary"}
                size="sm"
                className="w-full font-bold flex items-center justify-center gap-1.5 shadow-sm text-xs"
                disabled={repo.status === "scanning"}
                onClick={() => handleScan(idx)}
              >
                <RefreshCw size={12} className={repo.status === "scanning" ? "animate-spin" : ""} />
                <span>{repo.status === "scanning" ? "Scanning AST..." : "Analyze Codebase"}</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
