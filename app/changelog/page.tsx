"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { GitCommit, Tag, Box, Zap } from "lucide-react";

const changelogData = [
  {
    version: "v2.4.0",
    date: "April 28, 2026",
    title: "Autonomous Fix Recommendations",
    type: "Feature",
    description: "GitRabbit can now suggest and implement fixes for common security vulnerabilities and performance bottlenecks directly in your PR.",
    changes: [
      "Added 'Apply Fix' button for security vulnerabilities",
      "New performance analysis engine for Node.js and Python",
      "Improved context awareness for large monorepos",
    ]
  },
  {
    version: "v2.3.2",
    date: "April 15, 2026",
    title: "Visual Diff Enhancements",
    type: "Improvement",
    description: "Major updates to the web dashboard for better readability and faster review cycles.",
    changes: [
      "Syntax highlighting for 12 new languages",
      "Collapsible code blocks in reviews",
      "Side-by-side diff view on mobile",
    ]
  },
  {
    version: "v2.3.0",
    date: "March 22, 2026",
    title: "Team Productivity Dashboard",
    type: "Feature",
    description: "A new way to visualize your team's code health, review velocity, and quality trends over time.",
    changes: [
      "New 'Insights' tab in the organization settings",
      "Exportable PDF reports for weekly reviews",
      "Real-time review velocity tracking",
    ]
  },
  {
    version: "v2.2.5",
    date: "March 05, 2026",
    title: "Bitbucket Integration Beta",
    type: "Integration",
    description: "Expanding our horizons. GitRabbit now officially supports Bitbucket Cloud.",
    changes: [
      "Official Bitbucket App listing",
      "Support for Bitbucket Pipelines",
      "Cross-platform review synchronization",
    ]
  }
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-brand-black">
      <Navbar />

      <div className="pt-40 pb-24 px-6 md:px-16 bg-pixel-grid relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-24 border-b border-brand-gray pb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-brand-yellow/10 text-brand-yellow px-3 py-1 text-[8px] font-press-start uppercase mb-6 border border-brand-yellow/30">
                <Box className="w-3 h-3" /> System Update
              </div>
              <h1 className="text-3xl md:text-5xl font-press-start leading-tight text-brand-white mb-6">
                Change<span className="text-brand-yellow">log</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0">
                The latest improvements, features, and bug fixes for the GitRabbit platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:flex-1 relative aspect-square max-w-sm w-full"
            >
              <Image
                src="/backgrount(1).png"
                alt="Changelog Rabbit"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="relative space-y-24">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-yellow via-brand-gray to-transparent -translate-x-1/2 hidden md:block"></div>

            {changelogData.map((item, index) => (
              <motion.div
                key={item.version}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${["Visual Diff Enhancements", "Bitbucket Integration Beta"].includes(item.title) ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Center Node */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-brand-black border-2 border-brand-yellow rounded-sm -translate-x-1/2 z-10 hidden md:block shadow-[0_0_10px_rgba(245,197,24,0.5)]"></div>

                {/* Content Side */}
                <div className="md:w-1/2 md:px-12">
                  <div className="bg-[#0C0C0C] border border-brand-gray p-8 rounded-2xl relative group hover:border-brand-yellow transition-all">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded border border-brand-yellow/20">
                        {item.version}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        {item.date}
                      </span>
                    </div>

                    <h2 className="text-lg font-press-start text-brand-white mb-4 leading-tight group-hover:text-brand-yellow transition-colors">
                      {item.title}
                    </h2>

                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                      {item.description}
                    </p>

                    <ul className="space-y-3">
                      {item.changes.map((change, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs text-gray-300">
                          <Zap className="w-3 h-3 text-brand-yellow mt-0.5 shrink-0" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty Side (Desktop) */}
                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-40 text-center">
            <h3 className="text-brand-white font-press-start text-xs uppercase mb-8">Stay in the loop</h3>
            <button className="bg-brand-yellow text-brand-black px-8 py-4 text-[10px] font-press-start uppercase shadow-[4px_4px_0px_#FFFFFF] hover:brightness-110 active:shadow-none transition-all">
              Follow on GitHub
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
