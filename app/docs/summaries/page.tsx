"use client";

import { DocPage } from "@/components/DocPage";
import { Brain, FileText, Compass, ListTodo } from "lucide-react";

export default function AiSummariesPage() {
  return (
    <DocPage
      breadcrumb="PR_Reviews / AI_Summaries"
      badge="SUMMARIES"
      badgeColor="#A78BFA"
      title="AI-GENERATED SUMMARIES"
      subtitle="Understand the impact of complex pull requests at a single glance."
      description={`Large pull requests can be daunting to review. GitRabbit automatically generates comprehensive summaries, file-by-file changes list, and architectural walkthroughs. This description is written directly to the main PR comment/description, saving you time explaining your changes to your teammates.`}
      features={[
        { icon: FileText, title: "Executive Summary", desc: "A brief, high-level summary of what the pull request achieves, suitable for managers and leads." },
        { icon: Compass, title: "Architectural Walkthrough", desc: "Trace major design decisions, refactoring, and logical shifts across your folders." },
        { icon: ListTodo, title: "Impact & Checklist", desc: "Automatically lists modified components and lists potential risk metrics based on change scope." },
      ]}
      steps={[
        { step: "Step 01", title: "Push your modifications", desc: "Create a draft PR or publish a PR as ready-for-review." },
        { step: "Step 02", title: "Description Generation", desc: "Within seconds, GitRabbit populates the top comment or updates the description box with an structured summary." },
        { step: "Step 03", title: "Dynamic Updates", desc: "As you push new commits to the branch, GitRabbit updates the summary to reflect the final state of the PR." },
      ]}
      codeExample={{
        label: "Example generated description in Markdown format",
        code: `## GitRabbit Summary 🗂️

### Key Changes
- **Auth Layer**: Refactored OAuth token exchange to use secure sessions.
- **Frontend App**: Added Next.js Server Actions for forms.

### Architectural Walkthrough
1. **[app/layout.tsx]** Integrated the new Theme Context.
2. **[lib/auth.ts]** Replaced JWT localStorage strategy with HttpOnly Cookie jars.

> ℹ️ **Impact Rating**: Medium-High (Alters security credentials format)`,
      }}
      proTips={[
        "Customize the summary layout or turn on/off sections through '.gitrabbit.yml' configuration.",
        "Human reviewers can read the summary first to save up to 40% of their review session.",
        "Automated labels are added based on the review summary (e.g., 'size:large', 'focus:security').",
      ]}
      prevPage={{ href: "/docs/reviews", label: "Automated Reviews" }}
      nextPage={{ href: "/docs/fixes", label: "One-Click Fixes" }}
    />
  );
}
