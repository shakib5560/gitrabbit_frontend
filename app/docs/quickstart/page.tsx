"use client";

import { DocPage } from "@/components/DocPage";
import { Zap, Terminal, GitPullRequest, Brain, Code } from "lucide-react";

export default function QuickStartPage() {
  return (
    <DocPage
      breadcrumb="Overview & Setup / Quickstart"
      badge="START HERE"
      badgeColor="#F5C518"
      title="Quickstart Guide"
      subtitle="Get your first AI-powered pull request review in under 5 minutes."
      description={`GitRabbit is designed to be operational within minutes. Install the GitHub App (or GitLab integration), open a pull request, and watch the agent analyze your code in real time.\n\nThis guide walks you through the minimum steps to go from zero to your first automated review, with no configuration required to start.`}
      features={[
        { icon: GitPullRequest, title: "Instant Reviews", desc: "Open any PR and GitRabbit will start reviewing within 2–3 minutes." },
        { icon: Brain, title: "Zero Config Start", desc: "No YAML, no setup scripts. The agent works out of the box." },
        { icon: Zap, title: "One-Click Fixes", desc: "Apply AI-generated patches directly in the GitHub/GitLab UI." },
        { icon: Code, title: "All Repos Covered", desc: "Works across public and private repositories instantly." },
      ]}
      steps={[
        {
          step: "Step 01",
          title: "Install the App",
          desc: "Visit the GitHub Marketplace and install the GitRabbit app on your organization or personal account.",
          maskedCode: {
            message: "Logging to get your unique link",
            prefix: "open",
            loginHref: "/login",
          },
        },
        { step: "Step 02", title: "Select Repositories", desc: "Choose which repositories GitRabbit should have access to. You can always add more later." },
        { step: "Step 03", title: "Open a Pull Request", desc: "Create or update any pull request. GitRabbit will automatically trigger and post its first review." },
        { step: "Step 04", title: "Review the Feedback", desc: "Read through the inline comments, apply one-click fixes, and chat with the agent for clarification." },
      ]}
      codeExample={{
        label: ".gitrabbit.yml (optional)",
        lang: "yaml",
        code: `# Optional: customize review profile
reviews:
  auto_review: true
  profile: "assertive"
  language_hints:
    - typescript
    - python
  focus:
    - security
    - performance
    - logic_errors

chat:
  enabled: true
  auto_reply: true`,
      }}
      proTips={[
        "You don't need a config file to get started — GitRabbit works intelligently out of the box.",
        "Use @gitrabbit in any PR comment to trigger a focused re-review.",
        "Check the Agentic Chat docs to learn how to debate suggestions with the AI.",
      ]}
      nextPage={{ href: "/docs/installation", label: "Installation" }}
    />
  );
}
