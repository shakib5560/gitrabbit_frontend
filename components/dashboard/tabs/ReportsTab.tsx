"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  FileText, 
  Download, 
  Calendar, 
  Cpu, 
  Lock, 
  Clock, 
  Sparkles, 
  Search, 
  RefreshCw,
  MoreVertical,
  CheckCircle
} from "lucide-react";

interface ReportItem {
  id: string;
  name: string;
  type: "Security Audit" | "Performance Velocity" | "SOC-2 Verification" | "Code Quality Log";
  date: string;
  size: string;
  status: "Ready" | "Generating" | "Outdated";
  scope: string;
}

export function ReportsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState<ReportItem[]>([
    {
      id: "rep1",
      name: "Security Audit Report Q2 2026",
      type: "Security Audit",
      date: "May 20, 2026",
      size: "2.4 MB",
      status: "Ready",
      scope: "frontend-app, api-service",
    },
    {
      id: "rep2",
      name: "Code Performance & Velocity Log (May)",
      type: "Performance Velocity",
      date: "May 18, 2026",
      size: "1.8 MB",
      status: "Ready",
      scope: "All repositories",
    },
    {
      id: "rep3",
      name: "SOC-2 Type II Volatile Memory Clean Verification",
      type: "SOC-2 Verification",
      date: "May 15, 2026",
      size: "950 KB",
      status: "Ready",
      scope: "GitRabbit API Node clusters",
    },
    {
      id: "rep4",
      name: "Complexity & Tech Debt Report (Sprint 12)",
      type: "Code Quality Log",
      date: "May 10, 2026",
      size: "3.1 MB",
      status: "Outdated",
      scope: "frontend-app, api-service, mobile-app",
    },
    {
      id: "rep5",
      name: "Automated ISO-27001 Compliance Index Export",
      type: "SOC-2 Verification",
      date: "Generating",
      size: "--",
      status: "Generating",
      scope: "All configurations",
    }
  ]);

  const handleGenerate = () => {
    const newId = `rep_${Date.now()}`;
    const newReport: ReportItem = {
      id: newId,
      name: `AI Generated Health Audit (Manual Scan)`,
      type: "Code Quality Log",
      date: "Generating",
      size: "--",
      status: "Generating",
      scope: "All active repositories"
    };

    setReports(prev => [newReport, ...prev]);

    // Simulate completion in 3 seconds
    setTimeout(() => {
      setReports(prev => prev.map(rep => {
        if (rep.id === newId) {
          return {
            ...rep,
            date: "Just now",
            size: "1.2 MB",
            status: "Ready"
          };
        }
        return rep;
      }));
    }, 3000);
  };

  const filteredReports = reports.filter(rep =>
    rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rep.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans select-none">
      
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search reports by name, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border-primary bg-bg-secondary text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-yellow transition-colors font-sans"
          />
        </div>
        <Button onClick={handleGenerate} className="w-full sm:w-auto font-bold flex items-center gap-1.5 shadow-sm">
          <Sparkles size={16} />
          <span>Generate New Report</span>
        </Button>
      </div>

      {/* Reports Table Panel */}
      <Card hoverGlow={true} delay={0.1} className="bg-bg-secondary border-border-primary">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border-primary text-text-muted text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Report Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date Created</th>
                <th className="py-3 px-4">Scope</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary/50 text-xs">
              {filteredReports.map((rep) => (
                <tr key={rep.id} className="group hover:bg-bg-tertiary/20 transition-all duration-200">
                  
                  {/* Name */}
                  <td className="py-4 px-4 font-bold text-text-primary group-hover:text-brand-yellow transition-colors flex items-center gap-2">
                    <FileText size={16} className="text-text-muted shrink-0" />
                    <span className="truncate max-w-[220px]">{rep.name}</span>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 text-text-secondary font-semibold">
                    {rep.type}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 text-text-secondary flex items-center gap-1">
                    <Calendar size={12} className="text-text-muted" />
                    <span>{rep.date}</span>
                  </td>

                  {/* Scope */}
                  <td className="py-4 px-4 text-text-muted font-mono font-bold">
                    {rep.scope}
                  </td>

                  {/* Size */}
                  <td className="py-4 px-4 text-text-secondary font-mono">
                    {rep.size}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    <Badge 
                      variant={
                        rep.status === "Ready" 
                          ? "success" 
                          : rep.status === "Generating" 
                            ? "gold" 
                            : "default"
                      }
                      className="text-[9px]"
                    >
                      {rep.status === "Generating" ? (
                        <span className="flex items-center gap-1 font-mono">
                          <RefreshCw size={10} className="animate-spin text-brand-yellow" />
                          Building...
                        </span>
                      ) : (
                        rep.status
                      )}
                    </Badge>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={rep.status === "Generating"}
                        className="py-1 px-2.5 text-[10px] font-bold gap-1 cursor-pointer"
                        onClick={() => alert(`Downloading ${rep.name}...`)}
                      >
                        <Download size={12} />
                        <span>Download</span>
                      </Button>
                      <button className="p-1 rounded hover:bg-bg-tertiary text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Compliance statement footnote */}
      <div className="flex items-center gap-2.5 p-4 bg-brand-yellow/5 border border-brand-yellow/15 rounded-xl text-xs text-text-secondary leading-relaxed">
        <Lock size={16} className="text-brand-yellow shrink-0" />
        <span>
          Reports generated by GitRabbit meet <strong>SOC-2 Type II certification auditing requirements</strong>. Audit logs are encrypted at rest with SHA-256 tokens and kept for 365 days.
        </span>
      </div>

    </div>
  );
}
