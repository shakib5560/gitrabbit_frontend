"use client";

import { DocPage } from "@/components/DocPage";
import { Eye, Clock, Sparkles, MessageSquare } from "lucide-react";

export default function AutomatedReviewsPage() {
  return (
    <DocPage
      breadcrumb="PR_Reviews / Automated_Reviews"
      badge="CORE REVIEW"
      badgeColor="#F5C518"
      title="AUTOMATED REVIEWS"
      subtitle="Context-aware, line-by-line feedback within minutes of PR creation."
      description={`GitRabbit reviews every single line of code modified in your Pull Request. Instead of just highlighting syntax styling issues, the agent performs a semantic review, understanding the overall logic flow, potential memory leaks, performance regressions, and architectural coherence.\n\nComments are posted directly as inline code review threads, allowing you to view and resolve suggestions easily.`}
      features={[
        { icon: Clock, title: "Sub-5 Minute Turnaround", desc: "No more waiting for human reviewers. Receive instantaneous feedback to keep your momentum." },
        { icon: Sparkles, title: "Semantic Analysis", desc: "Understand the intent behind the code, tracing variables and functions across file borders." },
        { icon: MessageSquare, title: "Inline Threads", desc: "Comments are grouped on the exact code line, maintaining native GitHub/GitLab structures." },
      ]}
      steps={[
        { step: "Step 01", title: "Open a Pull Request", desc: "Push your feature branch and open a PR against your target base branch (e.g., main)." },
        { step: "Step 02", title: "Webhook Activation", desc: "GitRabbit detects the event and spins up an isolated, volatile execution node." },
        { step: "Step 03", title: "Line-by-Line Review", desc: "The agent analyzes the code diff and posts inline comments highlighting improvements, bugs, and stylistic issues." },
      ]}
      codeExample={{
        label: "Typical AI feedback on a PR line",
        code: `// Review feedback from GitRabbit:
// ⚠ Potential Memory Leak: The EventListener registered here is never cleaned up.
// Consider adding a return cleanup function to removeEventListener inside useEffect.
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // Suggestion: return () => window.removeEventListener('resize', handleResize);
}, []);`,
      }}
      proTips={[
        "You can temporarily mute reviews by adding '[noreview]' to your commit message or PR title.",
        "GitRabbit only posts comments on issues it is highly confident about to avoid review fatigue.",
        "Set custom review guidelines in your .gitrabbit.yml file to point the AI to specific code patterns.",
      ]}
      prevPage={{ href: "/docs/config", label: "Configuration" }}
      nextPage={{ href: "/docs/summaries", label: "AI Summaries" }}
    />
  );
}
