"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Bell, Search, Calendar, ChevronDown, Plus, Check } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

interface HeaderProps {
  title: string;
  onSearch: (query: string) => void;
  onAddRepo: () => void;
  coins?: number;
}


export function Header({ title, onSearch, onAddRepo, coins = 50 }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState("May 10 - May 17");

  const notifications = [
    { id: 1, text: "AI found 3 new issues in api-service", time: "2h ago", unread: true },
    { id: 2, text: "Sarah Johnson merged PR #134", time: "2h ago", unread: true },
    { id: 3, text: "AI suggested improvements in #132", time: "4h ago", unread: false },
    { id: 4, text: "Michael Chen opened PR #233", time: "4h ago", unread: false },
  ];

  const dateRanges = ["May 10 - May 17", "Last 7 days", "Last 30 days", "All time"];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch(val);
  };

  return (
    <header className="sticky top-0 bg-bg-primary/80 backdrop-blur-md border-b border-border-primary py-4 px-6 md:px-8 z-30 flex flex-col md:flex-row md:items-center md:justify-between gap-4 select-none">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl md:text-2xl font-black tracking-tight text-text-primary uppercase font-sans">
          {title}
        </h1>
        <p className="text-xs text-text-secondary mt-1 font-sans font-semibold">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Bar */}
        <div className="relative w-full max-w-[200px] md:max-w-[240px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search dashboard..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 py-2 text-xs md:text-sm rounded-xl border border-border-primary bg-bg-secondary text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-yellow/50 transition-colors font-sans shadow-sm"
          />
        </div>

        {/* Date Selector */}
        <div className="relative">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border-primary bg-bg-secondary text-xs md:text-sm font-bold text-text-secondary hover:text-text-primary transition-all cursor-pointer shadow-sm"
          >
            <Calendar size={14} className="text-text-muted" />
            <span className="font-sans">{selectedRange}</span>
            <ChevronDown size={13} className={`text-text-muted transition-transform duration-200 ${showCalendar ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {showCalendar && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCalendar(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 mt-2 w-48 rounded-2xl border border-border-primary bg-bg-secondary p-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.25)] z-50"
                >
                  {dateRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setSelectedRange(range);
                        setShowCalendar(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl text-left text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors cursor-pointer font-sans font-semibold"
                    >
                      <span>{range}</span>
                      {selectedRange === range && <Check size={12} className="text-brand-yellow" />}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl border border-border-primary bg-bg-secondary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all cursor-pointer relative shadow-sm"
          >
            <Bell size={15} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-yellow shadow-[0_0_8px_#F5C518]" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 mt-2 w-72 rounded-2xl border border-border-primary bg-bg-secondary p-4 shadow-[0_10px_25px_rgba(0,0,0,0.3)] z-50"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 border-b border-border-primary pb-2 font-sans">
                    Notifications
                  </h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="flex flex-col gap-1 text-xs border-b border-border-primary/35 pb-2 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`font-sans leading-normal ${notif.unread ? "text-text-primary font-bold" : "text-text-secondary font-medium"}`}>
                            {notif.text}
                          </p>
                          {notif.unread && <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0 mt-1" />}
                        </div>
                        <span className="text-[9px] text-text-muted font-mono font-bold">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Rabbit Coins Capsule Badge */}
        <Link
          href="/pricing"
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-brand-yellow/30 bg-brand-yellow/5 hover:bg-brand-yellow/15 hover:border-brand-yellow/50 transition-all cursor-pointer relative overflow-hidden group shadow-sm coin-glow"
          title="View Pricing & Buy Coins"
        >
          <img
            src="/icon.png"
            alt="Coin"
            className="w-3.5 h-3.5 object-contain animate-pulse"
          />
          <span className="text-xs font-extrabold text-brand-yellow font-sans tracking-wide">
            {coins} Coins
          </span>
        </Link>

        {/* Theme Toggle Button */}
        <button
          onClick={(e) => toggleTheme(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleTheme();
            }
          }}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={theme === "dark"}
          tabIndex={0}
          className="theme-toggle-btn p-2.5 rounded-xl border border-border-primary bg-bg-secondary text-text-secondary cursor-pointer shadow-sm"
        >
          {/* Icon crossfade: Moon ↔ Sun */}
          <span className="relative block w-[15px] h-[15px]">
            <motion.span
              key="moon"
              initial={false}
              animate={{
                opacity: theme === "dark" ? 1 : 0,
                rotate: theme === "dark" ? 0 : -45,
                scale: theme === "dark" ? 1 : 0.5,
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon size={15} className="text-brand-yellow" />
            </motion.span>
            <motion.span
              key="sun"
              initial={false}
              animate={{
                opacity: theme === "light" ? 1 : 0,
                rotate: theme === "light" ? 0 : 45,
                scale: theme === "light" ? 1 : 0.5,
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun size={15} className="text-amber-400" />
            </motion.span>
          </span>
        </button>

        {/* Add Repository Flat-3D Button */}
        <button
          onClick={onAddRepo}
          className="btn-flat-3d btn-flat-3d-gold flex items-center justify-center gap-1.5 px-4 py-2 text-xs md:text-sm font-bold rounded-xl cursor-pointer"
        >
          <Plus size={15} className="text-black stroke-[3px]" />
          <span className="font-sans">Add Repository</span>
        </button>
      </div>
    </header>
  );
}
