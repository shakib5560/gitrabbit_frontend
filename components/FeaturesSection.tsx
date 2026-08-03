"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ALL_FEATURES } from "@/lib/constants";
import Link from "next/link";
import { useState } from "react";
import {
  GitPullRequest,
  FileText,
  Zap,
  MessageSquare,
  AlertTriangle,
  Network,
  Brain,
  Globe,
  Code,
  Terminal,
  MessageCircle,
  ClipboardList,
  FlaskConical,
  BookOpen,
  GitMerge,
  Shield,
  Lock,
  BarChart2,
  SearchCode,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  GitPullRequest,
  FileText,
  Zap,
  MessageSquare,
  AlertTriangle,
  Network,
  Brain,
  Globe,
  Code,
  Terminal,
  MessageCircle,
  Slack: MessageCircle,
  ClipboardList,
  TestTube: FlaskConical,
  FlaskConical,
  BookOpen,
  GitMerge,
  Shield,
  Lock,
  BarChart2,
  SearchCode,
};

const categories = [
  "Core PR Reviews",
  "Codebase Intelligence",
  "Developer Workflow",
  "Pre-Merge Automation",
  "Security & Compliance",
];

const categoryColors: Record<string, string> = {
  "Core PR Reviews": "#F5C518",
  "Codebase Intelligence": "#3B82F6",
  "Developer Workflow": "#10B981",
  "Pre-Merge Automation": "#8B5CF6",
  "Security & Compliance": "#EF4444",
};

const categoryIcons: Record<string, React.ElementType> = {
  "Core PR Reviews": GitPullRequest,
  "Codebase Intelligence": Network,
  "Developer Workflow": Code,
  "Pre-Merge Automation": ClipboardList,
  "Security & Compliance": Shield,
};

export const FeaturesSection = () => {
  const [activeCategory, setActiveCategory] = useState("Core PR Reviews");

  const filtered = ALL_FEATURES.filter((f) => f.category === activeCategory);
  const color = categoryColors[activeCategory];

  return (
    <section className="bg-brand-black py-24 px-6 md:px-16 overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-yellow text-xs tracking-widest font-mono uppercase mb-4 block"
            >
              Complete Feature Set
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-brand-white text-2xl md:text-4xl font-bold font-press-start max-w-2xl leading-snug"
            >
              Everything you need for{" "}
              <span className="text-brand-yellow">smarter</span> code reviews
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-white transition-colors shrink-0 group"
            >
              Explore all features
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const CatIcon = categoryIcons[cat];
            const catColor = categoryColors[cat];
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-4 py-2 text-[10px] font-press-start uppercase tracking-wide transition-all cursor-pointer border ${
                  isActive ? "text-black" : "text-gray-400 bg-transparent hover:text-white border-gray-800 hover:border-gray-600"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: catColor,
                        borderColor: catColor,
                        boxShadow: `0 0 20px ${catColor}40`,
                      }
                    : {}
                }
              >
                <CatIcon className="w-3 h-3" />
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Feature Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((feature, i) => {
              const Icon = iconMap[feature.icon] || SearchCode;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-brand-dark border border-brand-gray rounded-2xl p-6 hover:border-opacity-60 transition-all duration-300 flex flex-col group relative overflow-hidden"
                  style={{
                    borderColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = color + "50";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${color}15`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Background accent */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at top left, ${color}08, transparent 70%)`,
                    }}
                  />

                  {/* Category badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest mb-5 w-fit"
                    style={{ backgroundColor: color + "15", color, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-2.5 h-2.5" />
                    {feature.category}
                  </div>

                  <motion.div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: color + "20", border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </motion.div>

                  <h3 className="text-brand-white font-semibold text-base font-pixelify mb-2 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors flex-1">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-900 border border-gray-900 rounded-xl overflow-hidden"
        >
          {[
            { label: "Languages Supported", value: "20+" },
            { label: "Linter Integrations", value: "50+" },
            { label: "Lines Reviewed Daily", value: "10M+" },
            { label: "Teams Worldwide", value: "4,000+" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0A0A0A] p-6 text-center">
              <div className="text-2xl font-bold font-pixelify text-brand-yellow mb-1">{stat.value}</div>
              <div className="text-gray-500 text-[10px] font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
