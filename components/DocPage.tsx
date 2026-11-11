"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  LucideIcon,
  Copy,
  Check,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  Info,
  ThumbsUp,
  ThumbsDown,
  List,
  Link2,
  Lock,
} from "lucide-react";

export interface DocStep {
  step: string;
  title: string;
  desc: string;
  code?: string;
  maskedCode?: {
    message: string;
    prefix?: string;
    loginHref?: string;
  };
}

export interface DocFeature {
  icon: LucideIcon | React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  desc: string;
}

export interface DocPageProps {
  breadcrumb: string;
  badge?: string;
  badgeColor?: string;
  title: string;
  subtitle: string;
  accentColor?: string;
  description: string;
  features?: DocFeature[];
  steps?: DocStep[];
  codeExample?: { label: string; code: string; lang?: string };
  callout?: { type: "tip" | "warning" | "info"; title: string; body: string };
  proTips?: string[];
  nextPage?: { href: string; label: string };
  prevPage?: { href: string; label: string };
  children?: React.ReactNode;
}

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-white/[0.06] border border-gray-800 font-mono text-[13px] text-brand-yellow"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-gray-800 transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-emerald-400" />
          <span className="text-emerald-400">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

export function DocPage({
  breadcrumb,
  badge,
  badgeColor = "#F5C518",
  title,
  subtitle,
  accentColor = "#F5C518",
  description,
  features,
  steps,
  codeExample,
  callout,
  proTips,
  nextPage,
  prevPage,
  children,
}: DocPageProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const breadcrumbParts = useMemo(
    () =>
      breadcrumb
        .split("/")
        .map((p) => p.replace(/_/g, " ").trim())
        .filter(Boolean),
    [breadcrumb]
  );

  const tocSections = useMemo(() => {
    const items: { id: string; label: string }[] = [{ id: "overview", label: "Overview" }];
    if (features && features.length > 0) {
      items.push({ id: "capabilities", label: "Key Capabilities" });
    }
    if (steps && steps.length > 0) {
      items.push({ id: "setup", label: "Setup & Workflow" });
    }
    if (codeExample) {
      items.push({ id: "configuration", label: "Configuration" });
    }
    if (proTips && proTips.length > 0) {
      items.push({ id: "best-practices", label: "Best Practices" });
    }
    return items;
  }, [features, steps, codeExample, proTips]);

  useEffect(() => {
    const ids = tocSections.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((e) => e.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tocSections]);

  const handleCopyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="flex items-start gap-8">
      {/* CENTER ARTICLE COLUMN */}
      <article className="flex-1 min-w-0 max-w-3xl space-y-12">
        {/* Header & Breadcrumb */}
        <header id="overview" className="scroll-mt-44 border-b border-gray-800/80 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500">
              <Link href="/docs" className="hover:text-brand-yellow transition-colors">
                Docs
              </Link>
              {breadcrumbParts.map((part, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-700" />
                  <span
                    className={
                      idx === breadcrumbParts.length - 1
                        ? "text-gray-200 font-medium"
                        : "text-gray-500"
                    }
                  >
                    {part}
                  </span>
                </React.Fragment>
              ))}
            </nav>

            <button
              type="button"
              onClick={handleCopyPageLink}
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-white px-2.5 py-1 rounded-md border border-gray-800/80 hover:border-gray-700 bg-[#0C0E13] transition-colors cursor-pointer"
            >
              {linkCopied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Link copied</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3 h-3" />
                  <span>Copy link</span>
                </>
              )}
            </button>
          </div>

          {badge && (
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md mb-4"
              style={{
                color: badgeColor,
                border: `1px solid ${badgeColor}35`,
                background: `${badgeColor}12`,
              }}
            >
              {badge}
            </span>
          )}

          <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-white tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-gray-400 mt-3 leading-relaxed">
            {subtitle}
          </p>
        </header>

        {/* Overview Description */}
        <section className="space-y-4 text-[15.5px] leading-[1.75] text-gray-200/90">
          {description.split("\n\n").map((para, i) => (
            <p key={i}>{renderInlineCode(para)}</p>
          ))}
        </section>

        {/* Callout */}
        {callout && (
          <div
            className={`p-4 sm:p-5 rounded-xl border flex items-start gap-3.5 ${
              callout.type === "warning"
                ? "border-amber-500/30 bg-amber-500/[0.06] text-amber-200"
                : callout.type === "tip"
                ? "border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-200"
                : "border-blue-500/30 bg-blue-500/[0.06] text-blue-200"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {callout.type === "warning" ? (
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              ) : callout.type === "tip" ? (
                <Lightbulb className="w-4 h-4 text-emerald-400" />
              ) : (
                <Info className="w-4 h-4 text-blue-400" />
              )}
            </div>
            <div className="text-sm leading-relaxed">
              <p className="font-semibold text-white mb-1">{callout.title}</p>
              <p className="text-gray-300 text-[13.5px]">{renderInlineCode(callout.body)}</p>
            </div>
          </div>
        )}

        {/* Key Capabilities */}
        {features && features.length > 0 && (
          <section id="capabilities" className="scroll-mt-44 space-y-5">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Key Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-gray-800/80 bg-[#0B0C10] hover:border-gray-700 transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3.5"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      border: `1px solid ${accentColor}30`,
                    }}
                  >
                    <feat.icon className="w-4 h-4" style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">{feat.title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed">
                    {renderInlineCode(feat.desc)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Setup & Workflow Steps */}
        {steps && steps.length > 0 && (
          <section id="setup" className="scroll-mt-44 space-y-5">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Setup &amp; Workflow
            </h2>
            <div className="space-y-0">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="relative pl-10 pb-8 border-l border-gray-800 last:border-transparent last:pb-0"
                >
                  <div
                    className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-mono font-semibold bg-[#08090D]"
                    style={{ borderColor: `${accentColor}50`, color: accentColor }}
                  >
                    {i + 1}
                  </div>
                  <div className="space-y-2">
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider block"
                      style={{ color: accentColor }}
                    >
                      {s.step}
                    </span>
                    <h3 className="text-base font-semibold text-white">{s.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {renderInlineCode(s.desc)}
                    </p>
                    {s.maskedCode ? (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-300 font-sans">
                          <Lock className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                          <Link
                            href={s.maskedCode.loginHref ?? "/login"}
                            className="hover:text-brand-yellow transition-colors"
                          >
                            {s.maskedCode.message}
                          </Link>
                        </div>
                        <div className="flex items-center justify-between gap-3 bg-[#090B0F] border border-gray-800/90 rounded-lg px-4 py-3 font-mono text-xs overflow-hidden">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-gray-600 select-none">$</span>
                            {s.maskedCode.prefix && (
                              <span className="text-emerald-400 shrink-0">{s.maskedCode.prefix}</span>
                            )}
                            <span
                              aria-hidden="true"
                              className="relative inline-block px-3 py-0.5 rounded select-none pointer-events-none bg-white/15 shadow-[0_0_18px_4px_rgba(255,255,255,0.14)] backdrop-blur-md"
                            >
                              <span className="blur-[6px] text-white/65">
                                https://••••••••••••••••••••••••••
                              </span>
                            </span>
                          </div>
                          <Link
                            href={s.maskedCode.loginHref ?? "/login"}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-gray-400 hover:text-brand-yellow bg-white/[0.03] border border-gray-800 transition-colors shrink-0"
                          >
                            <Lock className="w-3 h-3" />
                            <span>Hidden</span>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      s.code && (
                        <div className="mt-3 flex items-center justify-between gap-3 bg-[#090B0F] border border-gray-800/90 rounded-lg px-4 py-2.5 font-mono text-xs text-emerald-400 overflow-x-auto">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-gray-600 select-none">$</span>
                            <span className="truncate">{s.code}</span>
                          </div>
                          <CopyButton text={s.code} />
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Configuration / Code Example */}
        {codeExample && (
          <section id="configuration" className="scroll-mt-44 space-y-4">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Configuration &amp; Reference
            </h2>
            <div className="rounded-xl overflow-hidden border border-gray-800/90 bg-[#090B0F]">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0F1117] border-b border-gray-800/90">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xs font-mono text-gray-300 truncate">
                    {codeExample.label}
                  </span>
                  {codeExample.lang && (
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.05] text-gray-400 border border-gray-800">
                      {codeExample.lang}
                    </span>
                  )}
                </div>
                <CopyButton text={codeExample.code} />
              </div>
              <pre className="p-5 text-[13px] font-mono text-gray-200 overflow-x-auto leading-6">
                <code>{codeExample.code}</code>
              </pre>
            </div>
          </section>
        )}

        {/* Extra Custom Children */}
        {children}

        {/* Best Practices / Pro Tips */}
        {proTips && proTips.length > 0 && (
          <section id="best-practices" className="scroll-mt-44 space-y-4">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Best Practices
            </h2>
            <div className="p-5 rounded-xl border border-gray-800/80 bg-[#0B0C10]">
              <ul className="space-y-3">
                {proTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-2 shrink-0" />
                    <span>{renderInlineCode(tip)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Feedback Micro-Widget */}
        <div className="pt-6 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-gray-500">Was this page helpful?</span>
          {feedback ? (
            <span className="text-xs text-emerald-400 font-medium">
              Thanks for your feedback.
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFeedback("yes")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-800 hover:border-gray-700 bg-[#0B0C10] text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                Yes
              </button>
              <button
                type="button"
                onClick={() => setFeedback("no")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-800 hover:border-gray-700 bg-[#0B0C10] text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                No
              </button>
            </div>
          )}
        </div>

        {/* Layered Prev / Next Navigation Cards */}
        {(prevPage || nextPage) && (
          <nav
            aria-label="Pagination"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
          >
            {prevPage ? (
              <Link
                href={prevPage.href}
                className="group p-4 rounded-xl border border-gray-800/80 hover:border-brand-yellow/40 bg-[#0B0C10] transition-colors flex flex-col gap-1"
              >
                <span className="text-[11px] font-mono text-gray-500 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                  Previous
                </span>
                <span className="text-sm font-medium text-white group-hover:text-brand-yellow transition-colors">
                  {prevPage.label}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPage && (
              <Link
                href={nextPage.href}
                className="group p-4 rounded-xl border border-gray-800/80 hover:border-brand-yellow/40 bg-[#0B0C10] transition-colors flex flex-col items-end gap-1 text-right"
              >
                <span className="text-[11px] font-mono text-gray-500 flex items-center gap-1">
                  Next
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-sm font-medium text-white group-hover:text-brand-yellow transition-colors">
                  {nextPage.label}
                </span>
              </Link>
            )}
          </nav>
        )}
      </article>

      {/* LAYER 3: Right Sticky "On This Page" Outline */}
      <aside className="hidden xl:block w-48 shrink-0 sticky top-[168px]">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
            <List className="w-3.5 h-3.5 text-gray-500" />
            <span>On this page</span>
          </div>
          <ul className="space-y-1.5 border-l border-gray-800/80">
            {tocSections.map((section) => {
              const isCurrent = activeSection === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`block pl-3 py-0.5 text-xs transition-colors -ml-px border-l ${
                      isCurrent
                        ? "border-brand-yellow text-brand-yellow font-medium"
                        : "border-transparent text-gray-500 hover:text-gray-200"
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="pt-5 mt-5 border-t border-gray-800/80 space-y-2 text-xs">
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-600">
              Resources
            </p>
            <Link
              href="/docs/config"
              className="block text-gray-400 hover:text-white transition-colors"
            >
              YAML Schema Reference
            </Link>
            <Link
              href="/contact"
              className="block text-gray-400 hover:text-white transition-colors"
            >
              Contact Engineering
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
