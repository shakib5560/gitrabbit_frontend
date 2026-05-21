"use client";

import Image from "next/image";
import Link from "next/link";
import { InteractiveWorkflow } from "./InteractiveWorkflow";

export const WorkflowSection = () => {
  return (
    <section className="bg-[#0D0D0D] py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 items-center mb-24">
          {/* LEFT COLUMN */}
          <div>
            <span className="text-brand-yellow text-xs uppercase font-mono tracking-widest mb-4 block">
              AI That Works With You
            </span>
            <h2 className="text-brand-white text-2xl md:text-3xl font-bold font-press-start mb-4 leading-tight">
              Seamless in your workflow.
            </h2>
            <p className="text-gray-400 text-base mb-6 max-w-sm">
              Works across GitHub, GitLab, and Bitbucket. Inline comments, summaries, and suggestions — right where you code.
            </p>
            <Link href="#integrations" className="text-brand-yellow hover:underline block mb-8 font-medium">
              See Integrations &rarr;
            </Link>

            <div className="flex items-center gap-4">
              <button className="bg-gray-900 border border-gray-700 rounded-xl p-4 hover:border-yellow-400 transition-colors" aria-label="GitHub Integration">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.5C9.339 21.591 9.524 21.282 9.524 21.018C9.524 20.781 9.515 20.155 9.51 19.34C6.73 19.943 6.143 18.003 6.143 18.003C5.688 16.848 5.033 16.541 5.033 16.541C4.127 15.922 5.102 15.934 5.102 15.934C6.104 16.004 6.63 16.96 6.63 16.96C7.52 18.484 8.966 18.044 9.544 17.788C9.635 17.135 9.897 16.695 10.187 16.444C7.967 16.191 5.635 15.333 5.635 11.478C5.635 10.378 6.028 9.477 6.671 8.766C6.567 8.513 6.222 7.487 6.77 6.098C6.77 6.098 7.615 5.827 9.51 7.108C10.313 6.884 11.168 6.772 12.015 6.768C12.861 6.772 13.716 6.884 14.52 7.108C16.414 5.827 17.258 6.098 17.258 6.098C17.807 7.487 17.462 8.513 17.359 8.766C18.003 9.477 18.394 10.378 18.394 11.478C18.394 15.344 16.059 16.188 13.834 16.435C14.197 16.748 14.521 17.368 14.521 18.334C14.521 19.721 14.509 20.841 14.509 21.018C14.509 21.284 14.693 21.603 15.203 21.5C19.172 20.161 22.034 16.418 22.034 12C22.034 6.477 17.523 2 12 2Z" fill="white"/>
                </svg>
              </button>
              <button className="bg-gray-900 border border-gray-700 rounded-xl p-4 hover:border-yellow-400 transition-colors" aria-label="GitLab Integration">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M22.65 14.39L12 22.13L1.35 14.39L4.96 3.28L8.13 10.42H15.86L19.03 3.28L22.65 14.39Z" fill="currentColor"/>
                  <path d="M12 22.13L1.35 14.39L8.13 10.42L12 22.13Z" fill="currentColor"/>
                  <path d="M12 22.13L22.65 14.39L15.86 10.42L12 22.13Z" fill="currentColor"/>
                  <path d="M1.35 14.39L4.96 3.28L8.13 10.42L1.35 14.39Z" fill="currentColor"/>
                  <path d="M22.65 14.39L19.03 3.28L15.86 10.42L22.65 14.39Z" fill="currentColor"/>
                </svg>
              </button>
              <button className="bg-gray-900 border border-gray-700 rounded-xl p-4 hover:border-yellow-400 transition-colors" aria-label="Bitbucket Integration">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2 3.83331L4.66667 20.5H18.6667L22 3.83331H2ZM14.1667 15.5H8.33333L7.16667 9.66665H15.3333L14.1667 15.5Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative w-full flex flex-col md:flex-row gap-6">
            {/* Panel A — Bot Review Comment */}
            <div className="flex-1 bg-[#161616] border border-gray-800 rounded-2xl p-5 overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-black border border-gray-700 flex items-center justify-center overflow-hidden p-1">
                  <Image src="/icon.png" alt="bot" width={16} height={16} className="object-contain" />
                </div>
                <span className="text-white text-sm font-semibold">gitrabbit</span>
                <span className="text-xs text-gray-500 border border-gray-700 px-1.5 py-0.5 rounded">bot</span>
                <span className="text-xs text-gray-500 ml-auto">2 minutes ago</span>
              </div>

              <div className="mb-4">
                <h4 className="text-white text-sm font-semibold mb-1 font-pixelify">Summary</h4>
                <p className="text-gray-400 text-xs">Great work! This PR improves error handling and adds comprehensive tests.</p>
              </div>

              <div className="mb-4">
                <h4 className="text-white text-sm font-semibold mb-2 font-pixelify">Issues (3)</h4>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-red-500">
                      <span className="w-2.5 h-2.5 rounded-sm bg-red-500/20 border border-red-500/50 flex items-center justify-center"><span className="w-1 h-1 bg-red-500 block"></span></span> High
                    </span>
                    <span className="text-gray-300">Possible null pointer</span>
                    <span className="text-gray-500 font-mono">on line 42</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-brand-yellow">
                      <span className="w-2.5 h-2.5 rounded-sm bg-brand-yellow/20 border border-brand-yellow/50 flex items-center justify-center"><span className="w-1 h-1 bg-brand-yellow block"></span></span> Medium
                    </span>
                    <span className="text-gray-300">Consider using const</span>
                    <span className="text-gray-500 font-mono">on line 17</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-green-500">
                      <span className="w-2.5 h-2.5 rounded-sm bg-green-500/20 border border-green-500/50 flex items-center justify-center"><span className="w-1 h-1 bg-green-500 block"></span></span> Low
                    </span>
                    <span className="text-gray-300">Redundant condition</span>
                    <span className="text-gray-500 font-mono">on line 69</span>
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-white text-sm font-semibold mb-2 font-pixelify">Suggestions (2)</h4>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-300 flex items-center gap-1"><span className="text-brand-yellow">💡</span> Extract function</span>
                    <span className="text-gray-500 font-mono">on line 23</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-300 flex items-center gap-1"><span className="text-brand-yellow">💡</span> Simplify expression</span>
                    <span className="text-gray-500 font-mono">on line 67</span>
                  </li>
                </ul>
              </div>

              <button className="w-full bg-brand-yellow text-brand-black text-[9px] md:text-[10px] font-press-start uppercase py-3 flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[3px_3px_0px_#FFFFFF]">
                <span>+</span> Add a comment
              </button>
            </div>

            {/* Panel B — Code Diff View */}
            <div className="flex-1 bg-[#161616] border border-gray-800 rounded-2xl overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] flex flex-col">
              <div className="bg-[#111111] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
                <span className="text-gray-300 text-xs font-mono">src/utils/payment.ts</span>
                <span className="text-gray-500 text-xs flex items-center gap-1">⚙ Review settings</span>
              </div>
              <div className="p-4 font-mono text-[10px] leading-relaxed flex-1">
                <div className="flex group">
                  <span className="w-6 text-gray-600 text-right pr-2 select-none">10</span>
                  <span className="text-gray-400 whitespace-pre">  <span className="text-brand-muted">...</span></span>
                </div>
                <div className="flex group">
                  <span className="w-6 text-gray-600 text-right pr-2 select-none">11</span>
                  <span className="text-gray-300 whitespace-pre">  if (!payment) {"{"}</span>
                </div>
                <div className="flex group">
                  <span className="w-6 text-gray-600 text-right pr-2 select-none">12</span>
                  <span className="text-gray-300 whitespace-pre">    throw new Error(&apos;Invalid payment&apos;);</span>
                </div>
                <div className="flex group">
                  <span className="w-6 text-gray-600 text-right pr-2 select-none">13</span>
                  <span className="text-gray-300 whitespace-pre">  {"}"}</span>
                </div>
                <div className="flex bg-red-950/40 w-full group">
                  <span className="w-6 text-red-500/50 text-right pr-2 select-none">-</span>
                  <span className="text-red-400 whitespace-pre">  const amount = payment.amount;</span>
                </div>
                <div className="flex bg-green-950/40 w-full group relative">
                  <span className="w-6 text-green-500/50 text-right pr-2 select-none">+</span>
                  <span className="text-green-400 whitespace-pre">  const amount = payment?.amount ?? 0;</span>
                  <div className="absolute right-2 top-0.5 w-3 h-3 bg-brand-yellow rounded-sm flex items-center justify-center">
                    <span className="text-[7px] font-bold text-black font-sans">!</span>
                  </div>
                </div>
                <div className="flex bg-green-950/40 w-full group">
                  <span className="w-6 text-green-500/50 text-right pr-2 select-none">+</span>
                  <span className="text-green-400 whitespace-pre">  if (amount {"<"}= 0) {"{"}</span>
                </div>
                <div className="flex bg-green-950/40 w-full group">
                  <span className="w-6 text-green-500/50 text-right pr-2 select-none">+</span>
                  <span className="text-green-400 whitespace-pre">    throw new Error(&apos;Amount must be greater than 0&apos;);</span>
                </div>
                <div className="flex group">
                  <span className="w-6 text-gray-600 text-right pr-2 select-none">18</span>
                  <span className="text-gray-300 whitespace-pre">  {"}"}</span>
                </div>
                <div className="flex group">
                  <span className="w-6 text-gray-600 text-right pr-2 select-none">19</span>
                  <span className="text-gray-300 whitespace-pre">  return charge(amount);</span>
                </div>
              </div>
              
              <div className="p-3 border-t border-gray-800 bg-[#111111]">
                <div className="flex gap-2">
                  <input type="text" placeholder="Reply..." className="flex-1 bg-[#1A1A1A] border border-gray-800 rounded px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gray-600" />
                  <button className="bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded hover:bg-gray-700">Comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NEW SECTION: Code Reviews that learn from you */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <span className="bg-brand-yellow/10 text-brand-yellow text-[10px] font-pixelify px-3 py-1 rounded-full border border-brand-yellow/30 mb-4 inline-block">
              CR_Intelligence
            </span>
            <h3 className="text-brand-white text-2xl md:text-4xl font-bold font-press-start mb-6">
              Code reviews that learn from you.
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-mono">
              Set the baseline with your rules and style guides, then train the agent with feedback via replies. Reviews improve continuously.
            </p>
          </div>
          
          <InteractiveWorkflow />
        </div>
      </div>
    </section>
  );
};
