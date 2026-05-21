"use client";

import { motion, Variants } from "framer-motion";
import { Zap, Code, Terminal, ArrowRight, Activity, Cpu, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DocsPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
  };


  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-24"
    >
      {/* HERO SECTION */}
      <motion.section variants={itemVariants} className="relative">
        <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-yellow/40 mb-10">
          <span>DOCS</span>
          <span className="w-1 h-1 bg-brand-yellow/20 rounded-full" />
          <span className="text-brand-yellow/60">Introduction</span>
        </nav>

        <div className="relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -top-4 left-0 h-px bg-gradient-to-r from-brand-yellow to-transparent opacity-30"
          />
          <h1 className="text-brand-white font-press-start text-3xl md:text-5xl lg:text-6xl mb-8 leading-[1.2] tracking-tighter">
            THE <span className="text-brand-yellow block md:inline">FUTURE</span> OF <br className="hidden md:block" />
            CODE REVIEWS
          </h1>
        </div>
        
        <p className="text-gray-500 text-xl leading-relaxed max-w-2xl font-mono border-l-2 border-brand-yellow/20 pl-8 italic">
          Welcome to GitRabbit. We&apos;ve built an autonomous agent that doesn&apos;t just scan code—it understands it.
        </p>
      </motion.section>

      {/* QUICK ACTIONS */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/docs/installation" className="group bg-[#080808] border border-gray-900 p-8 rounded-sm hover:border-brand-yellow transition-all relative overflow-hidden h-64 flex flex-col justify-between">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-yellow opacity-[0.02] group-hover:opacity-10 rounded-full blur-3xl transition-opacity" />
          <div className="relative">
            <Terminal className="w-10 h-10 text-brand-yellow mb-6" />
            <h3 className="text-brand-white font-press-start text-sm mb-3 uppercase tracking-widest">Initialization</h3>
            <p className="text-gray-600 text-xs font-mono leading-relaxed max-w-[240px]">Boot the GitRabbit engine and connect your primary repositories.</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-brand-yellow text-[9px] font-bold uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform flex items-center gap-2">
              Execute_Setup <ArrowRight className="w-3 h-3" />
            </span>
            <span className="text-gray-900 font-mono text-[40px] font-black group-hover:text-brand-yellow/10 transition-colors">01</span>
          </div>
        </Link>

        <Link href="/docs/api" className="group bg-[#080808] border border-gray-900 p-8 rounded-sm hover:border-brand-yellow transition-all relative overflow-hidden h-64 flex flex-col justify-between">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-yellow opacity-[0.02] group-hover:opacity-10 rounded-full blur-3xl transition-opacity" />
          <div className="relative">
            <Code className="w-10 h-10 text-brand-yellow mb-6" />
            <h3 className="text-brand-white font-press-start text-sm mb-3 uppercase tracking-widest">Neural_API</h3>
            <p className="text-gray-600 text-xs font-mono leading-relaxed max-w-[240px]">Integrate the agent directly into your CI/CD pipelines and custom tools.</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-brand-yellow text-[9px] font-bold uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform flex items-center gap-2">
              Connect_Node <ArrowRight className="w-3 h-3" />
            </span>
            <span className="text-gray-900 font-mono text-[40px] font-black group-hover:text-brand-yellow/10 transition-colors">02</span>
          </div>
        </Link>
      </motion.section>

      {/* CORE LOGIC SECTION */}
      <motion.section variants={itemVariants} className="space-y-12">
        <div className="flex items-center gap-6">
          <div className="h-px bg-gray-900 flex-1" />
          <h2 className="text-brand-yellow font-press-start text-[10px] uppercase tracking-[0.5em]">System_Logic</h2>
          <div className="h-px bg-gray-900 flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "Semantic_AST", 
              icon: Cpu, 
              desc: "Deep analysis of your Abstract Syntax Tree to find logical flaws that static linters miss." 
            },
            { 
              title: "Neural_Feedback", 
              icon: Activity, 
              desc: "The agent learns from every comment you write, adapting to your project's unique personality." 
            },
            { 
              title: "Auto_Refactor", 
              icon: Zap, 
              desc: "Automatically generates pull requests with optimized code and security patches." 
            }
          ].map((item, i) => (
            <div key={i} className="p-6 border border-gray-900 hover:border-gray-700 transition-colors bg-[#050505] group">
              <item.icon className="w-6 h-6 text-brand-yellow/40 group-hover:text-brand-yellow mb-6 transition-colors" />
              <h4 className="text-brand-white text-xs font-bold uppercase mb-3 tracking-widest">{item.title}</h4>
              <p className="text-gray-600 text-[11px] font-mono leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECURITY VAULT */}
      <motion.section variants={itemVariants} className="relative py-12 px-8 border-2 border-brand-yellow/20 bg-brand-yellow/[0.02] rounded-sm overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 grayscale group-hover:grayscale-0 transition-all">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <Image src="/icon.png" alt="" width={120} height={120} />
          </motion.div>
        </div>
        
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-brand-yellow" />
            <h3 className="text-brand-white font-press-start text-xs uppercase tracking-[0.2em]">Security_Protocol_v4</h3>
          </div>
          <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8">
            Data privacy is at the core of GitRabbit. Your code is processed in volatile memory 
            and is never persisted or used for model training. We maintain SOC2 Type II 
            and ISO 27001 standards across all nodes.
          </p>
          <div className="flex gap-6">
            <button className="text-brand-yellow text-[9px] font-bold uppercase border-b border-brand-yellow/40 hover:border-brand-yellow transition-all pb-1">
              Privacy_Statement
            </button>
            <button className="text-brand-yellow text-[9px] font-bold uppercase border-b border-brand-yellow/40 hover:border-brand-yellow transition-all pb-1">
              Audit_Report_2026
            </button>
          </div>
        </div>
      </motion.section>

      {/* FOOTER TERMINAL */}
      <motion.section variants={itemVariants} className="pt-20 border-t border-gray-900">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h4 className="text-brand-white font-press-start text-xs uppercase mb-4 tracking-widest">Still_Have_Questions?</h4>
            <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">Join_the_developer_underground</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-brand-yellow text-brand-black px-10 py-4 text-[10px] font-press-start uppercase hover:scale-105 active:scale-95 transition-all shadow-[6px_6px_0px_#FFFFFF]">
              Enter_Discord
            </button>
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
}
