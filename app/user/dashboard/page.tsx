"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { RecentPRs } from "@/components/dashboard/RecentPRs";
import { SidebarExtras } from "@/components/dashboard/SidebarExtras";
import { InsightsHealth } from "@/components/dashboard/InsightsHealth";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Sparkles, GitBranch, Check } from "lucide-react";

const Github = ({ size = 16, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);



export interface CoinTransaction {
  id: number;
  type: "earn" | "spend";
  amount: number;
  description: string;
  time: string;
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddRepoOpen, setIsAddRepoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Modal form states
  const [newRepoName, setNewRepoName] = useState("");
  const [gitProvider, setGitProvider] = useState("github");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Rabbit Coins State
  const [coins, setCoins] = useState<number>(50);
  const [transactions, setTransactions] = useState<CoinTransaction[]>([]);

  // Seed default values and synchronize coins
  useEffect(() => {
    const syncCoins = () => {
      const storedCoins = localStorage.getItem("rabbit_coins");
      if (storedCoins !== null) {
        setCoins(parseInt(storedCoins, 10));
      }
      const storedTx = localStorage.getItem("rabbit_coin_transactions");
      if (storedTx !== null) {
        setTransactions(JSON.parse(storedTx));
      }
    };

    const storedCoins = localStorage.getItem("rabbit_coins");
    const storedTx = localStorage.getItem("rabbit_coin_transactions");

    const defaultTx: CoinTransaction[] = [
      {
        id: 1,
        type: "earn",
        amount: 65,
        description: "Welcome Bonus / Starter Pack",
        time: "2 days ago"
      },
      {
        id: 2,
        type: "spend",
        amount: 5,
        description: "Initial scan for frontend-app",
        time: "1 day ago"
      },
      {
        id: 3,
        type: "spend",
        amount: 10,
        description: "AI refactoring of database-migration",
        time: "5 hours ago"
      }
    ];

    if (storedCoins === null) {
      localStorage.setItem("rabbit_coins", "50");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCoins(50);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCoins(parseInt(storedCoins, 10));
    }

    if (storedTx === null) {
      localStorage.setItem("rabbit_coin_transactions", JSON.stringify(defaultTx));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTransactions(defaultTx);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTransactions(JSON.parse(storedTx));
    }

    window.addEventListener("storage", syncCoins);
    window.addEventListener("coins_updated", syncCoins);

    return () => {
      window.removeEventListener("storage", syncCoins);
      window.removeEventListener("coins_updated", syncCoins);
    };
  }, []);

  // Buttery-smooth Loading Skeleton Simulation on Mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const addTransaction = (type: "earn" | "spend", amount: number, description: string) => {
    const newTx: CoinTransaction = {
      id: Date.now(),
      type,
      amount,
      description,
      time: "Just now"
    };
    setTransactions((prev) => {
      const updated = [newTx, ...prev];
      localStorage.setItem("rabbit_coin_transactions", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddRepoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepoName.trim()) return;
    if (coins < 5) return;

    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);

      const nextCoins = coins - 5;
      setCoins(nextCoins);
      localStorage.setItem("rabbit_coins", nextCoins.toString());
      addTransaction("spend", 5, `Connected repository ${newRepoName}`);
      window.dispatchEvent(new Event("coins_updated"));

      setShowSuccessMessage(true);
      setTimeout(() => {
        setIsAddRepoOpen(false);
        setNewRepoName("");
        setShowSuccessMessage(false);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="dashboard-container flex min-h-screen bg-bg-primary text-text-primary transition-colors duration-300">
      {/* 1. Left Sticky Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} coins={coins} />

      {/* 2. Main Content Scroll Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Section */}
        <Header
          title={activeTab === "overview" ? "Overview" : activeTab}
          onSearch={handleSearch}
          onAddRepo={() => setIsAddRepoOpen(true)}
          coins={coins}
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {isLoading ? (
            /* Premium skeleton loading states */
            <div className="space-y-6 animate-pulse select-none">
              {/* Metrics row skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-bg-secondary border border-border-primary rounded-2xl p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-28 bg-bg-tertiary rounded-md" />
                      <div className="w-9 h-9 rounded-xl bg-bg-tertiary" />
                    </div>
                    <div className="h-8 w-16 bg-bg-tertiary rounded-md mt-4" />
                    <div className="h-3.5 w-32 bg-bg-tertiary rounded-md mt-4" />
                  </div>
                ))}
              </div>

              {/* Charts row skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-72 bg-bg-secondary border border-border-primary rounded-2xl p-6 flex flex-col justify-between">
                  <div className="h-5 w-44 bg-bg-tertiary rounded-md" />
                  <div className="h-40 bg-bg-tertiary rounded-xl w-full" />
                </div>
                <div className="h-72 bg-bg-secondary border border-border-primary rounded-2xl p-6 flex flex-col justify-between">
                  <div className="h-5 w-36 bg-bg-tertiary rounded-md" />
                  <div className="h-36 w-36 rounded-full bg-bg-tertiary mx-auto mt-4" />
                </div>
              </div>

              {/* Lists/Tables skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-[450px] bg-bg-secondary border border-border-primary rounded-2xl p-6">
                  <div className="h-5 w-40 bg-bg-tertiary rounded-md mb-8" />
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center py-2">
                        <div className="flex flex-col gap-2">
                          <div className="h-3 w-16 bg-bg-tertiary rounded-md" />
                          <div className="h-4 w-48 bg-bg-tertiary rounded-md" />
                        </div>
                        <div className="h-6 w-14 bg-bg-tertiary rounded-md" />
                        <div className="h-4 w-24 bg-bg-tertiary rounded-md" />
                        <div className="h-4 w-20 bg-bg-tertiary rounded-md" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-[210px] bg-bg-secondary border border-border-primary rounded-2xl p-6" />
                  <div className="h-[210px] bg-bg-secondary border border-border-primary rounded-2xl p-6" />
                </div>
              </div>
            </div>
          ) : (
            /* Dashboard Loaded Content */
            <div className="space-y-6">
              {/* Row 1: Key Metrics Stats Section */}
              <StatsSection />

              {/* Row 2: Analytics Charts Section */}
              <AnalyticsSection />

              {/* Row 3: Pull Requests & Sidebar Extras Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <RecentPRs />
                </div>
                <div>
                  <SidebarExtras coins={coins} transactions={transactions} />
                </div>
              </div>

              {/* Row 4: Code Health & AI Insights Section */}
              <InsightsHealth />
            </div>
          )}
        </main>
      </div>

      {/* 3. Add Repository Modal UI */}
      <Modal
        isOpen={isAddRepoOpen}
        onClose={() => setIsAddRepoOpen(false)}
        title="Add Repository"
      >
        {showSuccessMessage ? (
          <div className="flex flex-col items-center justify-center py-8 text-center select-none">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
              <Check size={24} />
            </div>
            <h4 className="text-base font-bold text-text-primary font-sans">Repository Added!</h4>
            <p className="text-xs text-text-secondary mt-1 font-sans">
              GitRabbit is analyzing codebase patterns and review configs...
            </p>
          </div>
        ) : (
          <form onSubmit={handleAddRepoSubmit} className="space-y-4 font-sans select-none">
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                Git Provider
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setGitProvider("github")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 border rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    gitProvider === "github"
                      ? "border-brand-yellow bg-brand-yellow/5 text-brand-yellow"
                      : "border-border-primary bg-bg-secondary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                  }`}
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGitProvider("gitlab")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 border rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    gitProvider === "gitlab"
                      ? "border-brand-yellow bg-brand-yellow/5 text-brand-yellow"
                      : "border-border-primary bg-bg-secondary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                  }`}
                >
                  <GitBranch size={14} />
                  <span>GitLab</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGitProvider("bitbucket")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 border rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    gitProvider === "bitbucket"
                      ? "border-brand-yellow bg-brand-yellow/5 text-brand-yellow"
                      : "border-border-primary bg-bg-secondary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                  }`}
                >
                  <GitBranch size={14} />
                  <span>Bitbucket</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                Repository Name
              </label>
              <input
                type="text"
                placeholder="e.g. org-name/project-repo"
                value={newRepoName}
                onChange={(e) => setNewRepoName(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-border-primary bg-bg-secondary text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-yellow transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                AI review intensity
              </label>
              <select className="w-full px-4 py-2.5 text-sm rounded-xl border border-border-primary bg-bg-secondary text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer">
                <option>Standard (Checks style, security, basic performance)</option>
                <option>Advanced (Performs deep system architectural analysis)</option>
                <option>Strict (Exhaustive reviews, catches minor formatting and nits)</option>
              </select>
            </div>

            {coins < 5 && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs flex flex-col gap-1">
                <span className="font-bold font-sans">Insufficient Rabbit Coins!</span>
                <span className="font-sans">You need at least 5 coins to connect a repository. Your current balance is {coins} coins.</span>
                <a href="/pricing" className="text-brand-yellow font-bold hover:underline mt-1 self-start font-sans">
                  Buy More Coins &rarr;
                </a>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t border-border-primary mt-6">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddRepoOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="font-semibold" disabled={isSubmitting || coins < 5}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Sparkles size={14} className="animate-spin text-black" />
                    <span>Adding...</span>
                  </span>
                ) : (
                  <span>Connect Repository</span>
                )}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
