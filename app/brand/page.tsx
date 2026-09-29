"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Sparkles, Download, Palette, Type, Check, Copy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const COLORS = [
  { name: "Brand Yellow", hex: "#F5C518", rgb: "245, 197, 24", text: "text-black" },
  { name: "Brand Black", hex: "#080808", rgb: "8, 8, 8", text: "text-white" },
  { name: "Brand Dark", hex: "#0E0E0E", rgb: "14, 14, 14", text: "text-white" },
  { name: "Brand Muted", hex: "#6B6B6B", rgb: "107, 107, 107", text: "text-white" },
];

export default function BrandPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
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
            <Palette className="w-3.5 h-3.5 text-brand-yellow" />
            <span className="text-brand-yellow text-[10px] md:text-xs font-mono uppercase tracking-widest font-semibold">
              Design Tokens // Brand Guidelines
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold font-press-start leading-tight mb-6"
          >
            Brand <span className="text-brand-yellow">Guidelines</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-mono max-w-2xl mx-auto leading-relaxed"
          >
            Official logos, pixel typography rules, and color palettes for GitRabbit press assets and community integrations.
          </motion.p>
        </div>
      </section>

      <section className="relative py-16 px-6 md:px-16 max-w-6xl mx-auto w-full flex-1 space-y-16">
        {/* Official Mascot & Logo Assets */}
        <div>
          <h2 className="text-lg md:text-xl font-bold font-press-start text-white mb-6">
            Mascot &amp; Logo Assets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0E0E0E] border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-between text-center">
              <div className="w-24 h-24 relative mb-4">
                <Image src="/icon.png" alt="GitRabbit Mascot" fill sizes="96px" className="object-contain" />
              </div>
              <div>
                <h4 className="text-white font-mono font-bold text-xs mb-1">8-Bit Pixel Mascot</h4>
                <p className="text-gray-500 text-[11px] font-mono mb-4">PNG • 128x128px</p>
                <a
                  href="/icon.png"
                  download="gitrabbit-icon.png"
                  className="bg-brand-yellow text-black font-press-start text-[9px] uppercase px-4 py-2 rounded shadow-[2px_2px_0px_#FFFFFF] inline-flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3" /> Download
                </a>
              </div>
            </div>

            <div className="bg-[#0E0E0E] border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-between text-center">
              <div className="w-36 h-24 relative mb-4 flex items-center justify-center">
                <Image src="/mainlogo.png" alt="GitRabbit Logo" width={160} height={40} className="object-contain" />
              </div>
              <div>
                <h4 className="text-white font-mono font-bold text-xs mb-1">Horizontal Logo</h4>
                <p className="text-gray-500 text-[11px] font-mono mb-4">PNG • Transparent</p>
                <a
                  href="/mainlogo.png"
                  download="gitrabbit-logo.png"
                  className="bg-brand-yellow text-black font-press-start text-[9px] uppercase px-4 py-2 rounded shadow-[2px_2px_0px_#FFFFFF] inline-flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3" /> Download
                </a>
              </div>
            </div>

            <div className="bg-[#0E0E0E] border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-between text-center">
              <div className="w-24 h-24 relative mb-4">
                <Image src="/hero1.png" alt="GitRabbit AI Hero" fill sizes="96px" className="object-contain" />
              </div>
              <div>
                <h4 className="text-white font-mono font-bold text-xs mb-1">Hero Rabbit Artwork</h4>
                <p className="text-gray-500 text-[11px] font-mono mb-4">PNG • High Resolution</p>
                <a
                  href="/hero1.png"
                  download="gitrabbit-hero.png"
                  className="bg-brand-yellow text-black font-press-start text-[9px] uppercase px-4 py-2 rounded shadow-[2px_2px_0px_#FFFFFF] inline-flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3" /> Download
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <h2 className="text-lg md:text-xl font-bold font-press-start text-white mb-6">
            Official Color Palette
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLORS.map((col) => (
              <div
                key={col.hex}
                onClick={() => copyHex(col.hex)}
                className="bg-[#0E0E0E] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer group hover:border-brand-yellow/40 transition-colors"
              >
                <div className="h-28 w-full flex items-end p-4" style={{ backgroundColor: col.hex }}>
                  <span className={`text-[10px] font-mono font-bold ${col.text}`}>
                    {copiedColor === col.hex ? "COPIED!" : "CLICK TO COPY"}
                  </span>
                </div>
                <div className="p-4 font-mono">
                  <div className="text-white text-xs font-bold mb-1">{col.name}</div>
                  <div className="text-gray-400 text-[11px] flex items-center justify-between">
                    <span>{col.hex}</span>
                    <span className="text-gray-600">{col.rgb}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography Standards */}
        <div>
          <h2 className="text-lg md:text-xl font-bold font-press-start text-white mb-6">
            Typography Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="bg-[#0E0E0E] border border-gray-800 rounded-2xl p-6">
              <span className="text-[10px] text-brand-yellow font-bold uppercase block mb-2">Display &amp; Headings</span>
              <div className="font-press-start text-base text-white mb-2 leading-relaxed">Press Start 2P</div>
              <p className="text-gray-400 leading-relaxed">
                Used for primary section headers, callouts, and retro arcade badges.
              </p>
            </div>
            <div className="bg-[#0E0E0E] border border-gray-800 rounded-2xl p-6">
              <span className="text-[10px] text-brand-yellow font-bold uppercase block mb-2">Pixel Numbers &amp; Accents</span>
              <div className="font-pixelify text-2xl text-white mb-2 font-bold">Pixelify Sans 1234567890</div>
              <p className="text-gray-400 leading-relaxed">
                Used for numeric counters, statistics, and subheadings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
