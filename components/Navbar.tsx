"use client";

import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { V2AnnouncementModal } from "./v2-announcement-modal";
import { V1GuestAccessModal } from "./v1-guest-access-modal";
import { YouTubeProgressBar } from "./YouTubeProgressBar";

export const Navbar = () => {
  const [isV2ModalOpen, setIsV2ModalOpen] = useState(false);
  const [isV1ModalOpen, setIsV1ModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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

  const handleCloseV2 = () => {
    setIsV2ModalOpen(false);
    setTimeout(() => {
      setIsV1ModalOpen(true);
    }, 350);
  };

  return (
    <>
      {/* Completely Fixed Header with Zero Movement on Page Load */}
      <header className="fixed top-0 left-0 right-0 z-50 select-none">
        {/* Top Announcement Bar - Fixed Single Row on All Devices */}
        <div className="bg-brand-yellow text-brand-black py-1.5 md:py-2 px-3 md:px-4 border-b border-brand-black/10">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 md:gap-4 text-center">
            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-press-start tracking-tight uppercase truncate">
              🐇 GitRabbit v2 is under construction
            </span>
            <button
              onClick={() => setIsV2ModalOpen(true)}
              className="bg-brand-black text-brand-yellow px-2 md:px-3 py-1 text-[7px] md:text-[9px] font-press-start uppercase hover:brightness-125 transition-all shadow-[1px_1px_0px_#FFFFFF] cursor-pointer whitespace-nowrap shrink-0"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Main Navbar - Rock-solid Fixed Position without Entry Translation */}
        <nav className="w-full bg-brand-black border-b border-brand-gray backdrop-blur-md bg-opacity-95 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            {/* Left: Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity shrink-0"
            >
              <div className="w-32 sm:w-44 md:w-56 h-10 md:h-14 relative shrink-0">
                <Image
                  src="/mainlogo.png"
                  alt="gitrabbit logo"
                  fill
                  priority
                  sizes="(max-width: 768px) 176px, 224px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Center: Desktop Nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-mono uppercase tracking-widest transition-colors ${
                    pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                      ? "text-brand-yellow font-bold"
                      : "text-gray-400 hover:text-brand-yellow"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right: Desktop Action Buttons & Mobile Hamburger Toggle */}
            <div className="flex items-center gap-3 md:gap-4 shrink-0">
              <Link
                href="/login"
                className="hidden sm:block text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-brand-white transition-colors cursor-pointer"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="flex bg-brand-yellow text-brand-black font-bold text-[8px] sm:text-[10px] md:text-xs font-press-start uppercase px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 hover:brightness-110 transition-all items-center gap-1.5 shadow-[2px_2px_0px_#FFFFFF] cursor-pointer whitespace-nowrap"
              >
                Sign Up
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-brand-yellow hover:border-brand-yellow/40 transition-colors focus:outline-none cursor-pointer"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-brand-yellow" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Minimalistic YouTube-like animated progress bar smartly docked along the navbar seam */}
          <YouTubeProgressBar />

          {/* Smooth Animated Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="lg:hidden border-t border-brand-gray/80 bg-[#0A0B10]/98 backdrop-blur-xl px-5 py-6 overflow-hidden shadow-2xl"
              >
                <div className="flex flex-col space-y-4">
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href));
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between py-2 text-sm font-mono uppercase tracking-wider transition-colors ${
                          isActive
                            ? "text-brand-yellow font-bold border-l-2 border-brand-yellow pl-3"
                            : "text-gray-300 hover:text-brand-yellow pl-1"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                      </Link>
                    );
                  })}

                  <div className="pt-4 border-t border-brand-gray/60 flex flex-col gap-3">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center py-2.5 text-xs font-mono uppercase tracking-wider text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center py-3 bg-brand-yellow text-brand-black text-[9px] font-press-start uppercase shadow-[2px_2px_0px_#FFFFFF] hover:brightness-110 transition-all"
                    >
                      Sign Up 🐇
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <V2AnnouncementModal isOpen={isV2ModalOpen} onClose={handleCloseV2} />
      <V1GuestAccessModal isOpen={isV1ModalOpen} onClose={() => setIsV1ModalOpen(false)} />
    </>
  );
};
