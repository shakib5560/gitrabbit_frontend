"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, ChevronRight, Menu, X, Terminal, Cpu, Globe, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DOCS_NAV = [
  {
    title: "System_Core",
    items: [
      { name: "01. Introduction", href: "/docs", icon: Globe },
      { name: "02. Installation", href: "/docs/installation", icon: Terminal },
      { name: "03. Configuration", href: "/docs/config", icon: Cpu },
    ]
  },
  {
    title: "Nodes_&_Integration",
    items: [
      { name: "GitHub_Node", href: "/docs/github" },
      { name: "GitLab_Node", href: "/docs/gitlab" },
      { name: "Bitbucket_Node", href: "/docs/bitbucket" },
    ]
  },
  {
    title: "Neural_Engine",
    items: [
      { name: "Auto_Reviews", href: "/docs/reviews" },
      { name: "Fix_Generator", href: "/docs/fixes" },
      { name: "Logical_Rules", href: "/docs/rules" },
    ]
  },
  {
    title: "Security_Protocols",
    items: [
      { name: "Compliance", href: "/docs/security" },
      { name: "Privacy_Vault", href: "/docs/privacy" },
    ]
  }
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-brand-black font-mono">
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 bg-pixel-grid opacity-5 pointer-events-none" />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row pt-40 px-6 md:px-12 gap-12 relative min-h-screen">
        
        {/* MOBILE SIDEBAR TOGGLE */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed bottom-8 right-8 z-[100] bg-brand-yellow text-brand-black p-5 rounded-full shadow-[0_0_20px_rgba(245,197,24,0.4)] border-2 border-white active:scale-95 transition-all"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* SIDEBAR */}
        <aside className={`
          fixed inset-0 z-[80] lg:relative lg:inset-auto lg:z-auto
          w-full lg:w-64 shrink-0 pb-12 lg:sticky lg:top-40 lg:h-[calc(100vh-12rem)] 
          bg-brand-black/95 lg:bg-transparent px-8 py-24 lg:p-0
          transition-all duration-500 lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:opacity-100 opacity-0"}
          overflow-y-auto overflow-x-hidden custom-scrollbar
        `}>
          {/* Docs Search - Terminal Style */}
          <div className="relative mb-12 group">
            <div className="absolute -inset-1 bg-brand-yellow/5 rounded blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
            <div className="relative bg-brand-dark rounded-sm flex items-center px-3 py-2.5">
              <span className="text-brand-yellow text-xs mr-2">$</span>
              <input 
                type="text" 
                placeholder="search_docs..." 
                className="bg-transparent w-full text-[11px] font-mono text-brand-white focus:outline-none uppercase placeholder:text-gray-700"
              />
            </div>
          </div>

          <nav className="space-y-12">
            {DOCS_NAV.map((section) => (
              <div key={section.title} className="relative">
                <h3 className="text-brand-yellow/40 font-press-start text-[8px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-yellow/20 rounded-full" />
                  {section.title}
                </h3>
                <ul className="space-y-1 ml-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link 
                          href={item.href}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`flex items-center gap-3 py-2 px-3 rounded-md text-[11px] font-mono transition-all relative group ${
                            isActive 
                              ? "text-brand-white bg-brand-yellow/10" 
                              : "text-gray-500 hover:text-brand-white hover:bg-white/5"
                          }`}
                        >
                          <span className={isActive ? "text-brand-yellow" : "text-gray-700 group-hover:text-gray-500"}>
                            {isActive ? "●" : "○"}
                          </span>
                          <span className="uppercase tracking-wider">{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="mt-20 pt-10 flex flex-col gap-6">
            <div className="flex items-center gap-4 opacity-40 group hover:opacity-100 transition-opacity">
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="w-10 h-10 relative"
              >
                <Image src="/icon.png" alt="" fill className="object-contain" />
              </motion.div>
              <div className="text-[9px] font-mono uppercase leading-tight">
                <span className="text-brand-yellow font-bold">GitRabbit_OS</span><br />
                <span className="text-gray-600">v2.4.0-STABLE</span>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-1 min-w-0 pb-32 relative z-10 lg:pl-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Footer />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1A1A1A;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #F5C518;
        }
      `}</style>
    </div>
  );
}
