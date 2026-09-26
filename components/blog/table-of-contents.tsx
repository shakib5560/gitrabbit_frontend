"use client";

import { useEffect, useState } from "react";
import { TableOfContentItem } from "@/lib/blog-data";
import { AlignLeft, Hash, ChevronDown } from "lucide-react";

interface TableOfContentsProps {
  items: TableOfContentItem[];
  mobileCollapsible?: boolean;
}

export function TableOfContents({ items, mobileCollapsible = false }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      setIsMobileExpanded(false);
    }
  };

  if (!items || items.length === 0) return null;

  // Mobile Collapsible Bar version
  if (mobileCollapsible) {
    return (
      <div className="lg:hidden mb-8 rounded-xl bg-[#0F1118] border border-brand-gray/90 overflow-hidden">
        <button
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
          className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center gap-2 text-brand-yellow font-press-start text-[8px] uppercase">
            <AlignLeft className="w-3.5 h-3.5" /> Quick Navigation ({items.length})
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isMobileExpanded ? "rotate-180 text-brand-yellow" : ""
            }`}
          />
        </button>

        {isMobileExpanded && (
          <div className="p-4 pt-0 border-t border-brand-gray/60 space-y-2 max-h-60 overflow-y-auto">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`text-left w-full py-2 px-2.5 rounded-lg text-xs font-sans flex items-center gap-2 transition-colors cursor-pointer ${
                    isActive
                      ? "bg-brand-yellow/15 text-brand-yellow font-medium"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  } ${item.level === 3 ? "pl-5" : ""}`}
                >
                  <Hash className="w-3 h-3 text-brand-yellow/60 flex-shrink-0" />
                  <span className="truncate">{item.title}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Desktop Sticky Sidebar version
  return (
    <nav className="p-6 rounded-2xl bg-[#0F1118]/80 dark:bg-[#0F1118]/80 border border-brand-gray/80 backdrop-blur-md sticky top-32">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brand-gray/60 text-brand-yellow font-press-start text-[9px] uppercase tracking-wider">
        <AlignLeft className="w-3.5 h-3.5" /> Table of Contents
      </div>

      <ul className="space-y-2 text-xs font-sans">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className={`${item.level === 3 ? "pl-4" : ""}`}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`text-left w-full py-1.5 px-2 rounded-md transition-all flex items-center gap-2 group cursor-pointer ${
                  isActive
                    ? "bg-brand-yellow/15 text-brand-yellow font-medium border-l-2 border-brand-yellow"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Hash
                  className={`w-3 h-3 flex-shrink-0 transition-opacity ${
                    isActive ? "opacity-100 text-brand-yellow" : "opacity-30 group-hover:opacity-70"
                  }`}
                />
                <span className="truncate">{item.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
