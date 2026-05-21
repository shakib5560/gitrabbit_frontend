"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AnalyticsSection } from "../AnalyticsSection";
import { 
  BarChart3, 
  TrendingUp, 
  HelpCircle, 
  Clock, 
  Activity, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export function AnalyticsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 Days");

  // Mock stats for detailed analytics
  const subStats = [
    { label: "Review Coverage", value: "98.4%", change: "+1.2%", status: "success" },
    { label: "Avg Review Time", value: "8.4 mins", change: "-12.5%", status: "success" },
    { label: "Bugs Prevented", value: "148", change: "+18.2%", status: "success" },
    { label: "Refactor Success", value: "91.2%", change: "+0.5%", status: "success" },
  ];

  // Bar chart data: Issues Caught by Category
  const categories = [
    { name: "Code Security", count: 24, max: 40, color: "bg-rose-500" },
    { name: "API Optimization", count: 35, max: 40, color: "bg-brand-yellow" },
    { name: "Memory Leak Prevention", count: 18, max: 40, color: "bg-sky-500" },
    { name: "Typo & Formatting", count: 29, max: 40, color: "bg-emerald-500" },
    { name: "Config & Environment", count: 12, max: 40, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-6 font-sans select-none">
      
      {/* Filters Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-text-primary tracking-wide">
            Detailed Platform Performance
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Realtime monitoring of AI code audit velocity and diagnostic metrics
          </p>
        </div>
        
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3.5 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer transition-all shadow-sm"
        >
          <option>Last 24 Hours</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      {/* Row 1: Dashboard Stats section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {subStats.map((stat, idx) => (
          <Card key={idx} hoverGlow={false} animate={true} delay={idx * 0.03} className="bg-bg-secondary p-5 flex flex-col justify-between h-28">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{stat.label}</span>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                {stat.change}
              </span>
            </div>
            <h4 className="text-2xl font-extrabold text-text-primary tracking-tight mt-2">{stat.value}</h4>
          </Card>
        ))}
      </div>

      {/* Row 2: Standard Line Chart & Donut Chart (Imported from components/dashboard/AnalyticsSection.tsx) */}
      <AnalyticsSection />

      {/* Row 3: Issues caught categories & velocity card */}
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6">
        {/* Issues Caught Bar Chart */}
        <Card hoverGlow={true} delay={0.1} className="bg-bg-secondary p-6">
          <div className="flex items-center justify-between border-b border-border-primary pb-4 mb-4">
            <div>
              <h3 className="text-sm font-bold text-text-primary tracking-wide">
                Issues Flagged by Category
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Vulnerability scan audits categorized by system domains
              </p>
            </div>
            <BarChart3 size={15} className="text-text-muted" />
          </div>

          <div className="space-y-4 py-2">
            {categories.map((cat, idx) => {
              const pct = (cat.count / cat.max) * 100;
              return (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-text-secondary">
                    <span>{cat.name}</span>
                    <span className="font-mono text-text-primary">{cat.count} flags</span>
                  </div>
                  <div className="h-2 w-full bg-bg-tertiary rounded-full overflow-hidden border border-border-primary/50">
                    <div 
                      className={`h-full rounded-full ${cat.color} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Velocity summary card */}
        <Card hoverGlow={true} delay={0.15} className="bg-bg-secondary p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border-primary pb-4">
              <div>
                <h3 className="text-sm font-bold text-text-primary tracking-wide">
                  System Health Report
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Platform integration health status
                </p>
              </div>
              <Activity size={15} className="text-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-primary">All Webhooks Active</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">Connected to github, gitlab, slack hooks</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-primary">SOC-2 Status Safe</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">Memory cleared successfully in 12 nodes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <Clock size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-primary">AST Scan Delay: 0.12s</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">Queue processor load is standard</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-brand-yellow/5 border border-brand-yellow/15 rounded-xl text-[10px] font-bold text-text-secondary leading-relaxed mt-4 flex items-center gap-2">
            <HelpCircle size={14} className="text-brand-yellow shrink-0" />
            <span>Metrics are refreshed in real-time. Turnaround stats exclude waiting for team approvals.</span>
          </div>
        </Card>
      </div>

    </div>
  );
}
