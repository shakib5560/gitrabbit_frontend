"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar / Text Ads */}
      <div className="bg-brand-yellow text-brand-black py-2 px-4 border-b border-brand-black/10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <span className="text-[9px] md:text-[10px] font-press-start tracking-tight uppercase">
            🚀 AI Review Agent v2 is now live!
          </span>
          <Link
            href="/blog/agent-v2"
            className="bg-brand-black text-brand-yellow px-3 py-1 text-[8px] md:text-[9px] font-press-start uppercase hover:brightness-125 transition-all shadow-[1px_1px_0px_#FFFFFF]"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full bg-brand-black border-b border-brand-gray backdrop-blur-md bg-opacity-90"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 relative shrink-0">
              <Image src="/logonav.png" alt="gitrabbit logo" fill className="object-contain" />
            </div>
            <span className="font-press-start text-brand-white text-base md:text-lg tracking-tighter">
              gitrabbit
            </span>
          </Link>

          {/* Center: Nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-brand-yellow transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:block text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-brand-white transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-brand-yellow text-brand-black font-bold text-[10px] md:text-xs font-press-start uppercase px-4 py-2.5 hover:brightness-110 transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#FFFFFF]"
            >
              Start Free
            </Link>
          </div>
        </div>
      </motion.nav>
    </header>
  );
};
