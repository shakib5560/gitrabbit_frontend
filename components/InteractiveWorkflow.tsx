"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  {
    id: "learnings",
    title: "GitRabbit learnings",
    description: "Train the agent with your feedback via replies. Reviews improve continuously based on your project's unique style.",
    code: `# .gitrabbit.yaml
language: en
learning_mode: true
auto_adapt: true

reviews:
  profile: "professional"
  feedback_loops:
    - enabled: true
      threshold: 0.8
      source: "pull_request_comments"

# Learn from previous PR feedback
context_window: 10
deep_learning: enabled`,
  },
  {
    id: "ast",
    title: "Path & AST-based instructions",
    description: "Easily configurable instructions that let you quickly share how you want your code reviewed based on structure.",
    code: `# Path-based rules
rules:
  - path: "src/components/**"
    instructions: |
      Ensure all components use the design system tokens.
      Check for proper accessibility labels.

  - path: "**/api/**"
    ast_check:
      pattern: "try_catch_block"
      requirement: "must_log_error"`,
  },
  {
    id: "guidelines",
    title: "Coding agent guidelines",
    description: "Set the baseline with your rules and style guides. Define exactly how the coding agent should interact with your team.",
    code: `# Agent Guidelines
agent:
  identity: "Senior Developer Assistant"
  tone: "Constructive & Direct"
  
  priorities:
    - security_vulnerabilities
    - performance_bottlenecks
    - code_readability
    
  interaction:
    allow_suggestions: true
    inline_replies: enabled`,
  },
];

export const InteractiveWorkflow = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="mt-20 border border-gray-800 rounded-3xl overflow-hidden bg-[#0D0D0D] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] min-h-[500px]">
        {/* LEFT SIDEBAR - TABS */}
        <div className="border-r border-gray-800 p-8 flex flex-col justify-center gap-8 bg-black/40">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`text-left group transition-all duration-300 relative ${
                activeTab.id === tab.id ? "opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              {activeTab.id === tab.id && (
                <motion.div
                  layoutId="active-tab-line"
                  className="absolute -left-8 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-brand-yellow rounded-r-full"
                />
              )}
              <h3 className={`text-sm md:text-base font-pixelify mb-2 ${
                activeTab.id === tab.id ? "text-brand-yellow" : "text-white"
              }`}>
                {tab.title}
              </h3>
              {activeTab.id === tab.id && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-gray-400 leading-relaxed max-w-xs"
                >
                  {tab.description}
                </motion.p>
              )}
            </button>
          ))}
        </div>

        {/* RIGHT SIDE - PREVIEW */}
        <div className="relative p-8 overflow-hidden flex items-center justify-center bg-[#080808]">
          {/* Grid Background with perspective effect */}
          <div className="absolute inset-0 bg-pixel-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          
          {/* Perspective Grid Lines (Decorative) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-brand-yellow"
                style={{ 
                  left: `${10 + i * 10}%`,
                  transform: `skewX(${ (i - 5) * 5 }deg)`,
                }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 w-full max-w-2xl"
            >
              {/* Code Window */}
              <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                {/* Window Header */}
                <div className="bg-[#1A1A1A] px-4 py-2 flex items-center gap-2 border-b border-gray-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 ml-2">gitrabbit_config.yaml</span>
                </div>
                
                {/* Code Body */}
                <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
                  <pre className="text-gray-300">
                    {activeTab.code.split("\n").map((line, i) => (
                      <div key={i} className="flex gap-4 group">
                        <span className="text-gray-700 w-4 text-right select-none">{i + 1}</span>
                        <code className="text-gray-300">
                          {line.startsWith("#") ? (
                            <span className="text-gray-600">{line}</span>
                          ) : line.includes(":") ? (
                            <>
                              <span className="text-brand-yellow">{line.split(":")[0]}:</span>
                              <span className="text-green-400">{line.split(":").slice(1).join(":")}</span>
                            </>
                          ) : (
                            line
                          )}
                        </code>
                      </div>
                    ))}
                  </pre>
                </div>
              </div>

              {/* Decorative shadow element */}
              <div className="absolute -inset-2 bg-brand-yellow/5 blur-3xl -z-10 rounded-full" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
