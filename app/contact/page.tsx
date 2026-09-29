"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  MessageSquare,
  Building,
  Handshake,
  CheckCircle2,
  Send,
  Loader2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "support";
  const [activeTab, setActiveTab] = useState(initialType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && ["support", "sales", "partnerships"].includes(type)) {
      setActiveTab(type);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-brand-black flex flex-col">
      <Navbar />

      <section className="relative pt-36 md:pt-44 pb-20 px-6 md:px-16 overflow-hidden border-b border-gray-900 bg-pixel-grid">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-yellow/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 px-3.5 py-1.5 rounded-full mb-6"
          >
            <Mail className="w-3.5 h-3.5 text-brand-yellow" />
            <span className="text-brand-yellow text-[10px] md:text-xs font-mono uppercase tracking-widest font-semibold">
              Get in Touch // GitRabbit
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold font-press-start leading-tight mb-6"
          >
            How Can We <span className="text-brand-yellow">Help?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-mono max-w-2xl mx-auto leading-relaxed"
          >
            Have a question, need dedicated enterprise VPC deployment, or want to explore an integration partnership?
            Our engineering team is here for you.
          </motion.p>
        </div>
      </section>

      <section className="relative py-16 px-6 md:px-16 max-w-4xl mx-auto w-full flex-1">
        {/* Department Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => { setActiveTab("support"); setIsSuccess(false); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === "support"
                ? "bg-brand-yellow text-black border-brand-yellow font-bold shadow-[3px_3px_0px_#FFFFFF]"
                : "bg-[#0E0E0E] text-gray-400 border-gray-800 hover:text-white"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Technical Support
          </button>

          <button
            onClick={() => { setActiveTab("sales"); setIsSuccess(false); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === "sales"
                ? "bg-brand-yellow text-black border-brand-yellow font-bold shadow-[3px_3px_0px_#FFFFFF]"
                : "bg-[#0E0E0E] text-gray-400 border-gray-800 hover:text-white"
            }`}
          >
            <Building className="w-4 h-4" />
            Enterprise Sales
          </button>

          <button
            onClick={() => { setActiveTab("partnerships"); setIsSuccess(false); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === "partnerships"
                ? "bg-brand-yellow text-black border-brand-yellow font-bold shadow-[3px_3px_0px_#FFFFFF]"
                : "bg-[#0E0E0E] text-gray-400 border-gray-800 hover:text-white"
            }`}
          >
            <Handshake className="w-4 h-4" />
            Partnerships
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-[#0C0C0C] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="font-press-start text-lg text-white mb-2">Message Dispatched!</h3>
              <p className="text-gray-400 text-xs font-mono max-w-md mx-auto mb-8">
                Thank you for contacting GitRabbit. An engineering specialist will respond within 4 business hours.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="bg-brand-yellow text-black font-press-start text-xs uppercase px-6 py-3 shadow-[2px_2px_0px_#FFFFFF]"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                <div>
                  <label className="block text-gray-400 mb-2 uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    className="w-full bg-[#141414] border border-gray-800 focus:border-brand-yellow rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 uppercase tracking-wider">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    className="w-full bg-[#141414] border border-gray-800 focus:border-brand-yellow rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                <div>
                  <label className="block text-gray-400 mb-2 uppercase tracking-wider">Company / Team Name</label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    className="w-full bg-[#141414] border border-gray-800 focus:border-brand-yellow rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 uppercase tracking-wider">VCS Provider</label>
                  <select
                    className="w-full bg-[#141414] border border-gray-800 focus:border-brand-yellow rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors"
                  >
                    <option>GitHub (Cloud / Enterprise)</option>
                    <option>GitLab (Cloud / Self-Hosted)</option>
                    <option>Bitbucket</option>
                    <option>Custom Git Environment</option>
                  </select>
                </div>
              </div>

              <div className="font-mono text-xs">
                <label className="block text-gray-400 mb-2 uppercase tracking-wider">
                  {activeTab === "support"
                    ? "Describe the issue or question *"
                    : activeTab === "sales"
                    ? "Tell us about your team size and requirements *"
                    : "Partnership or Integration proposal *"}
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you are working on or how we can assist..."
                  className="w-full bg-[#141414] border border-gray-800 focus:border-brand-yellow rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-yellow text-black font-press-start text-xs uppercase py-4 flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all shadow-[3px_3px_0px_#FFFFFF] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Inquiry
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
