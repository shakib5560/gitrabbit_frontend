"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  CornerDownLeft,
  Layers,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DOC_TABS,
  getActiveTabForPath,
  getFlatDocPages,
  type DocNavGroup,
  type DocNavItem,
} from "@/lib/docs-nav";

function SidebarItem({
  item,
  pathname,
  onNavigate,
}: {
  item: DocNavItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isChildActive = item.children?.some((c) => c.href === pathname) ?? false;
  const isActive = pathname === item.href;
  const shouldForceOpen = isActive || isChildActive;
  const [prevForceOpen, setPrevForceOpen] = useState(shouldForceOpen);
  const [isOpen, setIsOpen] = useState(shouldForceOpen);

  if (prevForceOpen !== shouldForceOpen) {
    setPrevForceOpen(shouldForceOpen);
    if (shouldForceOpen) setIsOpen(true);
  }

  const Icon = item.icon;

  return (
    <li>
      <div className="flex items-center group">
        <Link
          href={item.href}
          onClick={onNavigate}
          className={`flex-1 flex items-center justify-between gap-2 py-1.5 px-2.5 rounded-lg text-[13px] font-sans transition-colors ${
            isActive
              ? "text-brand-yellow bg-brand-yellow/10 font-medium"
              : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <span className="flex items-center gap-2 min-w-0">
            {Icon && (
              <Icon
                className={`w-3.5 h-3.5 shrink-0 ${
                  isActive ? "text-brand-yellow" : "text-gray-500 group-hover:text-gray-300"
                }`}
              />
            )}
            <span className="truncate">{item.name}</span>
          </span>
          {item.badge && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/25 shrink-0">
              {item.badge}
            </span>
          )}
        </Link>

        {hasChildren && (
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? `Collapse ${item.name}` : `Expand ${item.name}`}
            className="p-1.5 text-gray-500 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            {isOpen ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>

      {hasChildren && isOpen && item.children && (
        <ul className="mt-1 ml-4 pl-3 border-l border-gray-800/80 space-y-0.5">
          {item.children.map((child) => {
            const childActive = pathname === child.href;
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className={`block py-1.5 px-2.5 rounded-md text-[12.5px] font-sans transition-colors ${
                    childActive
                      ? "text-brand-yellow bg-brand-yellow/10 font-medium"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {child.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

function SidebarGroup({
  group,
  pathname,
  onNavigate,
}: {
  group: DocNavGroup;
  pathname: string;
  onNavigate: () => void;
}) {
  const containsActive = group.items.some(
    (item) =>
      item.href === pathname || item.children?.some((child) => child.href === pathname)
  );
  const [prevContainsActive, setPrevContainsActive] = useState(containsActive);
  const [open, setOpen] = useState(group.defaultOpen ?? true);

  if (prevContainsActive !== containsActive) {
    setPrevContainsActive(containsActive);
    if (containsActive) setOpen(true);
  }

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
      >
        <span>{group.title}</span>
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        )}
      </button>

      {open && (
        <ul className="space-y-0.5">
          {group.items.map((item) => (
            <SidebarItem
              key={item.href}
              item={item}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAllSections, setShowAllSections] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const activeTab = useMemo(() => getActiveTabForPath(pathname), [pathname]);
  const allFlatPages = useMemo(() => getFlatDocPages(), []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allFlatPages.slice(0, 8);
    return allFlatPages.filter(
      (page) =>
        page.name.toLowerCase().includes(q) ||
        page.description.toLowerCase().includes(q) ||
        page.tabLabel.toLowerCase().includes(q) ||
        page.groupTitle.toLowerCase().includes(q) ||
        page.keywords.some((kw) => kw.toLowerCase().includes(q))
    );
  }, [allFlatPages, searchQuery]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSelectedResultIndex(0);
  };

  // Global Cmd/Ctrl + K search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => {
          if (prev) {
            setSearchQuery("");
            setSelectedResultIndex(0);
          }
          return !prev;
        });
      } else if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSelectedResultIndex(0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [isSearchOpen]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedResultIndex((i) => Math.min(searchResults.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedResultIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && searchResults[selectedResultIndex]) {
      e.preventDefault();
      router.push(searchResults[selectedResultIndex].href);
      closeSearch();
    }
  };

  const displayedGroups = showAllSections
    ? DOC_TABS.flatMap((t) => t.groups)
    : activeTab.groups;

  return (
    <div className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-brand-black font-sans flex flex-col">
      <div className="fixed inset-0 bg-pixel-grid opacity-[0.04] pointer-events-none" />

      <Navbar />

      {/* LAYER 1: Sticky Docs Domain Sub-Navbar */}
      <div className="sticky top-[96px] md:top-[101px] mt-[96px] md:mt-[101px] z-30 bg-[#08090D]/95 backdrop-blur-md border-b border-gray-800/80">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4">
          {/* Domain Tabs */}
          <nav
            aria-label="Documentation sections"
            className="flex items-center gap-1 overflow-x-auto scrollbar-none h-full"
          >
            {DOC_TABS.map((tab) => {
              const isTabActive = activeTab.id === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={tab.defaultHref}
                  className={`relative h-full flex items-center px-3 text-xs font-medium whitespace-nowrap transition-colors ${
                    isTabActive
                      ? "text-brand-yellow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                  {isTabActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-brand-yellow rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center gap-2.5 bg-[#11131A] hover:bg-[#161922] border border-gray-800 hover:border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-400 transition-colors cursor-pointer shrink-0"
          >
            <Search className="w-3.5 h-3.5 text-gray-500" />
            <span>Search docs...</span>
            <kbd className="text-[10px] font-mono bg-black/60 border border-gray-800 px-1.5 py-0.5 rounded text-gray-500">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      {/* Main 3-Column Documentation Container */}
      <div className="max-w-[1300px] w-full mx-auto flex flex-col lg:flex-row pt-8 md:pt-10 px-4 sm:px-6 lg:px-8 gap-8 relative flex-1">
        {/* Mobile Sidebar Toggle & Search Bar */}
        <div className="lg:hidden flex items-center gap-2 mb-2">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#11131A] border border-gray-800 text-xs text-gray-200 font-medium cursor-pointer"
          >
            {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>Menu</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#11131A] border border-gray-800 text-xs text-gray-400 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-gray-500" />
            <span>Search documentation...</span>
          </button>
        </div>

        {/* LAYER 2: Nested Collapsible Left Sidebar */}
        <aside
          className={`
            fixed inset-0 z-40 lg:relative lg:inset-auto lg:z-auto
            w-full lg:w-60 shrink-0 pb-10 lg:sticky lg:top-[168px] lg:h-[calc(100vh-11.5rem)]
            bg-brand-black/98 lg:bg-transparent px-6 pt-28 pb-12 lg:p-0
            transition-transform duration-200 lg:translate-x-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full pointer-events-none lg:pointer-events-auto"}
            overflow-y-auto overflow-x-hidden custom-scrollbar
          `}
        >
          {/* Mobile close header */}
          <div className="flex lg:hidden items-center justify-between pb-4 mb-4 border-b border-gray-800">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-yellow">
              Documentation
            </span>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-white/5 text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active Layer Indicator */}
          <div className="flex items-center justify-between px-2.5 pb-3 mb-4 border-b border-gray-800/70">
            <span className="text-xs font-semibold text-white">
              {showAllSections ? "All Documentation" : activeTab.label}
            </span>
            <button
              type="button"
              onClick={() => setShowAllSections((v) => !v)}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-500 hover:text-brand-yellow transition-colors cursor-pointer"
            >
              <Layers className="w-3 h-3" />
              {showAllSections ? "Focused" : "View all"}
            </button>
          </div>

          <nav className="space-y-6">
            {displayedGroups.map((group) => (
              <SidebarGroup
                key={`${group.title}-${group.items[0]?.href}`}
                group={group}
                pathname={pathname}
                onNavigate={() => setIsSidebarOpen(false)}
              />
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="mt-10 pt-6 border-t border-gray-800/70 space-y-3 px-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 relative shrink-0">
                <Image src="/icon.png" alt="GitRabbit" fill className="object-contain" />
              </div>
              <div className="text-[11px] leading-tight">
                <span className="text-gray-200 font-semibold block">GitRabbit Docs</span>
                <span className="text-gray-500 font-mono text-[10px]">Platform v1 · v2 Preview</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-gray-500">
              <Link
                href="/status"
                className="inline-flex items-center gap-1.5 hover:text-gray-300 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Status
              </Link>
              <span>•</span>
              <Link
                href="/changelog"
                className="inline-flex items-center gap-1 hover:text-gray-300 transition-colors"
              >
                Changelog
                <ExternalLink className="w-2.5 h-2.5" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content + Right TOC rendered inside DocPage / DocsPage */}
        <main className="flex-1 min-w-0 pb-24 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Footer />

      {/* Command Search Modal (Cmd+K) */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14 }}
              onClick={closeSearch}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 4 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl bg-[#0D0F14] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-800">
                <Search className="w-4 h-4 text-gray-500 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedResultIndex(0);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search documentation pages, YAML keys, or features..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  className="text-[11px] font-mono text-gray-500 hover:text-white px-1.5 py-0.5 border border-gray-800 rounded cursor-pointer"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {searchResults.length === 0 ? (
                  <div className="py-10 text-center text-xs text-gray-500 font-mono">
                    No matching documentation found for &ldquo;{searchQuery}&rdquo;.
                  </div>
                ) : (
                  searchResults.map((item, idx) => {
                    const selected = idx === selectedResultIndex;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeSearch}
                        onMouseEnter={() => setSelectedResultIndex(idx)}
                        className={`flex items-center justify-between gap-4 px-3 py-2.5 rounded-xl transition-colors ${
                          selected ? "bg-brand-yellow/10 text-white" : "text-gray-300 hover:bg-white/[0.03]"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${selected ? "text-brand-yellow" : "text-white"}`}>
                              {item.name}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500">
                              {item.tabLabel} › {item.groupTitle}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        {selected && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                        )}
                      </Link>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 197, 24, 0.35);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 197, 24, 0.7);
        }
      `}</style>
    </div>
  );
}
