"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, Bookmark, Sparkles } from "lucide-react";

interface ArticleReactionsProps {
  postId: number;
}

export function ArticleReactions({ postId }: ArticleReactionsProps) {
  const [likes, setLikes] = useState(48 + postId * 7);
  const [hasLiked, setHasLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    try {
      const likedState = localStorage.getItem(`gitrabbit_liked_${postId}`);
      if (likedState === "true") {
        setHasLiked(true);
      }
      const bookmarkState = localStorage.getItem(`gitrabbit_bookmark_${postId}`);
      if (bookmarkState === "true") {
        setIsBookmarked(true);
      }
    } catch {
      // LocalStorage not available or SSR
    }
  }, [postId]);

  const handleToggleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      try {
        localStorage.setItem(`gitrabbit_liked_${postId}`, "true");
      } catch {}
    } else {
      setLikes((prev) => Math.max(1, prev - 1));
      setHasLiked(false);
      try {
        localStorage.removeItem(`gitrabbit_liked_${postId}`);
      } catch {}
    }
  };

  const handleToggleBookmark = () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    try {
      if (nextState) {
        localStorage.setItem(`gitrabbit_bookmark_${postId}`, "true");
      } else {
        localStorage.removeItem(`gitrabbit_bookmark_${postId}`);
      }
    } catch {}
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleToggleLike}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
          hasLiked
            ? "bg-brand-yellow text-brand-black font-semibold shadow-[0_0_15px_rgba(245,197,24,0.3)]"
            : "bg-brand-gray/90 border border-brand-gray text-gray-300 hover:border-brand-yellow hover:text-white"
        }`}
        title="Was this article helpful?"
      >
        <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? "fill-current" : ""}`} />
        <span>Helpful ({likes})</span>
      </button>

      <button
        onClick={handleToggleBookmark}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
          isBookmarked
            ? "bg-brand-yellow/15 border border-brand-yellow text-brand-yellow font-medium"
            : "bg-brand-gray/90 border border-brand-gray text-gray-300 hover:border-brand-yellow hover:text-white"
        }`}
        title="Save to bookmarks"
      >
        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
        <span>{isBookmarked ? "Saved" : "Save"}</span>
      </button>
    </div>
  );
}
