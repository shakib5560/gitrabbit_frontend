"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface SocialShareButtonsProps {
  title: string;
  url?: string;
  tags?: string[];
}

export function SocialShareButtons({ title, url: customUrl, tags = [] }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return customUrl || window.location.href;
    }
    return customUrl || "";
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleTwitterShare = () => {
    const url = getShareUrl();
    const hashtagString = tags.map((t) => t.replace(/[^a-zA-Z0-9]/g, "")).join(",");
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}${hashtagString ? `&hashtags=${hashtagString}` : ""}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const handleLinkedInShare = () => {
    const url = getShareUrl();
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedinUrl, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleTwitterShare}
        aria-label="Share on X (Twitter)"
        title="Share on X"
        className="w-10 h-10 rounded-xl bg-brand-gray/90 border border-brand-gray hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-black flex items-center justify-center transition-all duration-200 text-gray-300 shadow-sm cursor-pointer"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      </button>

      <button
        onClick={handleLinkedInShare}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
        className="w-10 h-10 rounded-xl bg-brand-gray/90 border border-brand-gray hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-black flex items-center justify-center transition-all duration-200 text-gray-300 shadow-sm cursor-pointer"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      </button>

      <button
        onClick={handleCopyLink}
        aria-label="Copy article link"
        title={copied ? "Link Copied!" : "Copy Link"}
        className={`h-10 px-3.5 rounded-xl border flex items-center gap-2 transition-all duration-200 text-xs font-mono cursor-pointer ${
          copied
            ? "bg-brand-yellow text-brand-black border-brand-yellow font-medium shadow-[0_0_15px_rgba(245,197,24,0.4)]"
            : "bg-brand-gray/90 border-brand-gray text-gray-300 hover:border-brand-yellow hover:text-white"
        }`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </>
        )}
      </button>
    </div>
  );
}
