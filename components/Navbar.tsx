"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { V2AnnouncementModal } from "./v2-announcement-modal";

export const Navbar = () => {

  const [isV2ModalOpen, setIsV2ModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      const hasSeenModal = sessionStorage.getItem("hasSeenV2Modal");
      if (!hasSeenModal) {
        const timer = setTimeout(() => {
          setIsV2ModalOpen(true);
          sessionStorage.setItem("hasSeenV2Modal", "true");
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Announcement Bar / Text Ads */}
      <div className="bg-brand-yellow text-brand-black py-2 px-2 md:px-4 border-b border-brand-black/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center">
          <span className="text-[7px] sm:text-[9px] md:text-[10px] font-press-start tracking-tight uppercase leading-relaxed">
            🐇 GitRabbit v2 is under construction
          </span>
          <button
            onClick={() => setIsV2ModalOpen(true)}
            className="bg-brand-black text-brand-yellow px-2 md:px-3 py-1.5 md:py-1 text-[7px] md:text-[9px] font-press-start uppercase hover:brightness-125 transition-all shadow-[1px_1px_0px_#FFFFFF] cursor-pointer whitespace-nowrap"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full bg-brand-black border-b border-brand-gray backdrop-blur-md bg-opacity-90"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity shrink-0">
            <div className="w-36 sm:w-48 md:w-56 h-10 md:h-14 relative shrink-0">
              <Image src="/mainlogo.png" alt="gitrabbit logo" fill className="object-contain object-left" />
            </div>
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
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <Link
              href="/login"
              className="hidden sm:block text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-brand-white transition-colors cursor-pointer"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-brand-yellow text-brand-black font-bold text-[8px] sm:text-[10px] md:text-xs font-press-start uppercase px-2 md:px-4 py-1.5 md:py-2.5 hover:brightness-110 transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#FFFFFF] cursor-pointer whitespace-nowrap"
            >
              Start Free
            </Link>
          </div>
        </div>
      </motion.nav>
    </header>
      <V2AnnouncementModal 
        isOpen={isV2ModalOpen} 
        onClose={() => setIsV2ModalOpen(false)} 
      />
    </>
  );
};
