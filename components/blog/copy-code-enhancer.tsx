"use client";

import { useEffect } from "react";

export function CopyCodeEnhancer() {
  useEffect(() => {
    // Find all code wrappers that have a pre tag inside
    const wrappers = document.querySelectorAll(".article-content .code-wrapper");

    wrappers.forEach((wrapper) => {
      const header = wrapper.querySelector(".code-header");
      const pre = wrapper.querySelector("pre");
      if (!header || !pre || wrapper.querySelector(".copy-btn-attached")) return;

      const button = document.createElement("button");
      button.className =
        "copy-btn-attached ml-auto text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 hover:bg-brand-yellow hover:text-black text-gray-400 border border-white/10 transition-colors flex items-center gap-1 cursor-pointer";
      button.innerHTML = "<span>Copy</span>";

      button.addEventListener("click", async () => {
        const textToCopy = pre.innerText;
        try {
          await navigator.clipboard.writeText(textToCopy);
          button.innerHTML = "<span class='text-brand-yellow'>Copied!</span>";
          setTimeout(() => {
            button.innerHTML = "<span>Copy</span>";
          }, 2000);
        } catch {
          // Fallback
        }
      });

      header.appendChild(button);
    });
  }, []);

  return null;
}
