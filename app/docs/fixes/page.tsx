"use client";

import { DocPage } from "@/components/DocPage";
import { Zap, CheckSquare, RefreshCw, PenTool } from "lucide-react";

export default function OneClickFixesPage() {
  return (
    <DocPage
      breadcrumb="PR_Reviews / One-Click_Fixes"
      badge="AUTOPATCH"
      badgeColor="#10B981"
      title="ONE-CLICK FIXES"
      subtitle="Apply AI-suggested code fixes with a single button click in your PR."
      description={`GitRabbit doesn't just point out problems; it builds the solution. When pointing out a bug, styling error, or performance issue, the agent creates a formatted suggestion block. You can accept this suggestion with a single click, automatically committing the patch directly to your branch.`}
      features={[
        { icon: CheckSquare, title: "Committable Suggestions", desc: "No copy-pasting required. Suggestions are formatted as valid GitHub/GitLab suggestion blocks." },
        { icon: RefreshCw, title: "Context Preservation", desc: "Patches preserve code formatting, indentation, and structure perfectly." },
        { icon: PenTool, title: "Direct Commits", desc: "Committing the suggestion automatically advances your branch, triggering subsequent test pipelines." },
      ]}
      steps={[
        { step: "Step 01", title: "Review Suggestions", desc: "Look for GitRabbit comment bubbles with code diff block highlights." },
        { step: "Step 02", title: "Click 'Commit Suggestion'", desc: "Use the native GitHub/GitLab platform button to apply the replacement code." },
        { step: "Step 03", title: "Automatic Update", desc: "The branch updates instantly and GitRabbit marks the discussion resolved if appropriate." },
      ]}
      codeExample={{
        label: "Formatted One-Click suggestion visualization",
        code: `@@ -10,6 +10,6 @@
- const users = getRawData().filter(u => u.age > 18)
+ const users = getActiveUsers().filter(user => user.age >= 18)

// Click 'Commit suggestion' to automatically write this to your branch.`,
      }}
      proTips={[
        "Multiple suggestions can be batched together in GitHub for a single commit to keep git logs neat.",
        "If a suggestion is close but not quite right, ask GitRabbit to refine it in a comment reply.",
        "One-click fixes are fully compatible with your branch protection rules and commit signing configurations.",
      ]}
      prevPage={{ href: "/docs/summaries", label: "AI Summaries" }}
      nextPage={{ href: "/docs/bug-detection", label: "Bug Detection" }}
    />
  );
}
