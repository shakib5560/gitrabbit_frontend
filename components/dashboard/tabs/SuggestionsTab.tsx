"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  Sparkles, 
  Code2, 
  Cpu, 
  Zap, 
  Check, 
  X,
  FileCode,
  ArrowRight,
  TrendingDown,
  Info
} from "lucide-react";

interface Suggestion {
  id: string;
  repoName: string;
  file: string;
  category: "Performance" | "Security" | "Refactoring";
  description: string;
  impact: string;
  cost: number;
  oldCode: string;
  newCode: string;
  isApplied: boolean;
  isIgnored: boolean;
}

export function SuggestionsTab({ coins, setCoins }: { coins: number; setCoins: (c: number) => void }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: "sug1",
      repoName: "api-service",
      file: "src/utils/payment.ts",
      category: "Security",
      description: "Potential null pointer access when reading stripe client transaction objects. Needs optional chaining fallback.",
      impact: "Prevents API 500 runtime crashes during webhooks.",
      cost: 5,
      oldCode: `const amount = payment.amount;\nif (amount <= 0) {\n  throw new Error('Invalid amount');\n}`,
      newCode: `const amount = payment?.amount ?? 0;\nif (amount <= 0) {\n  throw new Error('Amount must be greater than 0');\n}`,
      isApplied: false,
      isIgnored: false,
    },
    {
      id: "sug2",
      repoName: "frontend-app",
      file: "components/StatsSection.tsx",
      category: "Performance",
      description: "Heavy parsing in continuous loop inside React useEffect without dependencies array control.",
      impact: "Reduces client CPU frame drops from 8% to 1.2%.",
      cost: 10,
      oldCode: `useEffect(() => {\n  let start = 0;\n  const end = parseInt(stat.value as string, 10);\n  const timer = setInterval(() => {\n    setCount(start);\n  }, 10);\n});`,
      newCode: `useEffect(() => {\n  let start = 0;\n  const end = stat.value;\n  const timer = setInterval(() => {\n    setCount(start);\n  }, 50);\n  return () => clearInterval(timer);\n}, [stat.value]);`,
      isApplied: false,
      isIgnored: false,
    },
    {
      id: "sug3",
      repoName: "api-service",
      file: "src/db/connection.ts",
      category: "Refactoring",
      description: "Convert nested promise chains into clean await operators for readable node execution blocks.",
      impact: "Improves readability index and code complexity metrics.",
      cost: 5,
      oldCode: `db.connect().then(client => {\n  return client.query('SELECT 1').then(res => {\n    console.log(res);\n  });\n});`,
      newCode: `const client = await db.connect();\ntry {\n  const res = await client.query('SELECT 1');\n  console.log(res);\n} finally {\n  client.release();\n}`,
      isApplied: false,
      isIgnored: false,
    }
  ]);

  const handleApply = (id: string, cost: number) => {
    if (coins < cost) {
      alert("Insufficient Rabbit Coins! Connect a repo or buy more to apply.");
      return;
    }

    // Deduct coins
    const nextCoins = coins - cost;
    setCoins(nextCoins);
    localStorage.setItem("rabbit_coins", nextCoins.toString());
    
    // Add transaction history
    const storedTx = localStorage.getItem("rabbit_coin_transactions");
    if (storedTx) {
      const txs = JSON.parse(storedTx);
      const targetSug = suggestions.find(s => s.id === id);
      const newTx = {
        id: Date.now(),
        type: "spend",
        amount: cost,
        description: `Applied AI refactor suggestion in ${targetSug?.file}`,
        time: "Just now"
      };
      localStorage.setItem("rabbit_coin_transactions", JSON.stringify([newTx, ...txs]));
    }
    
    window.dispatchEvent(new Event("coins_updated"));

    // Apply Suggestion
    setSuggestions(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, isApplied: true };
      }
      return s;
    }));
  };

  const handleIgnore = (id: string) => {
    setSuggestions(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, isIgnored: true };
      }
      return s;
    }));
  };

  const activeSuggestions = suggestions.filter(s => !s.isApplied && !s.isIgnored);

  return (
    <div className="space-y-6 font-sans select-none">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card hoverGlow={false} animate={true} className="flex items-center gap-4 bg-bg-secondary p-5">
          <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow">
            <Sparkles size={18} className="animate-pulse" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-text-primary">{activeSuggestions.length}</h4>
            <p className="text-xs text-text-secondary mt-0.5">Pending AI Proposals</p>
          </div>
        </Card>
        <Card hoverGlow={false} animate={true} className="flex items-center gap-4 bg-bg-secondary p-5">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500">
            <Cpu size={18} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-text-primary">12</h4>
            <p className="text-xs text-text-secondary mt-0.5">Refactors Auto-Applied</p>
          </div>
        </Card>
        <Card hoverGlow={false} animate={true} className="flex items-center gap-4 bg-bg-secondary p-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <TrendingDown size={18} />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-text-primary">-1,400ms</h4>
            <p className="text-xs text-text-secondary mt-0.5">Latency Reduction Saved</p>
          </div>
        </Card>
      </div>

      {/* Suggestion proposals listing */}
      {activeSuggestions.length === 0 ? (
        <Card hoverGlow={false} animate={true} className="flex flex-col items-center justify-center py-16 text-center bg-bg-secondary border-border-primary">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
            <Check size={28} />
          </div>
          <h4 className="text-base font-bold text-text-primary">All caught up!</h4>
          <p className="text-xs text-text-secondary max-w-sm mt-1.5 leading-relaxed">
            There are no pending AI suggestions. Run reviews or connect more repositories to generate refactoring opportunities.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {activeSuggestions.map((sug, idx) => (
            <Card key={sug.id} hoverGlow={true} delay={idx * 0.05} className="bg-bg-secondary border-border-primary p-6">
              
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                
                {/* Left: Metadata & Description */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-[10px] font-mono font-bold text-text-secondary bg-bg-tertiary px-2 py-0.5 rounded border border-border-primary/50">
                      {sug.repoName}
                    </span>
                    <span className="text-xs text-text-secondary font-mono flex items-center gap-1">
                      <FileCode size={12} className="text-text-muted" /> {sug.file}
                    </span>
                    <Badge 
                      variant={
                        sug.category === "Security" 
                          ? "error" 
                          : sug.category === "Performance" 
                            ? "warning" 
                            : "gold"
                      }
                      className="text-[9px]"
                    >
                      {sug.category}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-text-primary leading-snug">
                      {sug.description}
                    </h4>
                    <p className="text-xs text-text-secondary flex items-start gap-1">
                      <Info size={14} className="text-brand-yellow shrink-0 mt-0.5" />
                      <span><strong>Impact:</strong> {sug.impact}</span>
                    </p>
                  </div>

                  {/* Code Diff Panel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-border-primary/60 rounded-xl overflow-hidden mt-4">
                    {/* Old Code */}
                    <div className="bg-[#0B0C10] border-r border-border-primary/50">
                      <div className="bg-[#121420] px-4 py-2 border-b border-border-primary/50 text-[10px] font-bold text-text-muted flex items-center justify-between">
                        <span>Original Code</span>
                        <Badge variant="error" className="scale-75 origin-right">Redundant</Badge>
                      </div>
                      <pre className="p-4 font-mono text-[10.5px] leading-relaxed text-rose-300 bg-rose-950/5 overflow-x-auto whitespace-pre">
                        {sug.oldCode}
                      </pre>
                    </div>

                    {/* New Code */}
                    <div className="bg-[#0B0C10]">
                      <div className="bg-[#121420] px-4 py-2 border-b border-border-primary/50 text-[10px] font-bold text-text-muted flex items-center justify-between">
                        <span>AI Suggestion</span>
                        <Badge variant="success" className="scale-75 origin-right">Refactored</Badge>
                      </div>
                      <pre className="p-4 font-mono text-[10.5px] leading-relaxed text-emerald-300 bg-emerald-950/5 overflow-x-auto whitespace-pre">
                        {sug.newCode}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Right: Cost & Apply Actions */}
                <div className="flex flex-row lg:flex-col lg:justify-between items-center lg:items-end justify-between border-t lg:border-t-0 lg:border-l border-border-primary/50 pt-4 lg:pt-0 lg:pl-6 min-w-[140px] shrink-0 gap-4">
                  <div className="text-left lg:text-right space-y-1">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Refactor Cost</span>
                    <div className="flex items-center gap-1.5 justify-start lg:justify-end">
                      <div className="w-4 h-4 bg-brand-yellow/15 rounded flex items-center justify-center border border-brand-yellow/30">
                        <img src="/icon.png" alt="" className="w-2.5 h-2.5 object-contain" />
                      </div>
                      <span className="text-base font-extrabold text-brand-yellow font-sans">{sug.cost} Coins</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleIgnore(sug.id)}
                      className="p-2 border border-border-primary rounded-xl hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                      title="Ignore suggestion"
                    >
                      <X size={16} />
                    </button>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="font-bold text-xs"
                      onClick={() => handleApply(sug.id, sug.cost)}
                    >
                      <Check size={14} />
                      <span>Apply Fix</span>
                    </Button>
                  </div>
                </div>

              </div>

            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
