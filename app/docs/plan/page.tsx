"use client";

import { DocPage } from "@/components/DocPage";
import { FileText, Calendar, CheckSquare, Layers } from "lucide-react";

export default function GitRabbitPlanPage() {
  return (
    <DocPage
      breadcrumb="Pre-Merge Automation / GitRabbit Plan"
      badge="UPSTREAM PLANNING"
      badgeColor="#F97316"
      title="GitRabbit Plan"
      subtitle="Generate structured, editable coding blueprints from issue tickets and technical prompts."
      description={`GitRabbit Plan acts as an upstream technical architect before implementation begins. It parses requirements from Jira, Linear, GitHub Issues, or natural-language prompts alongside your repository structure to produce a file-level implementation blueprint.\n\nArchitects and engineers can review, edit, and approve task checklists directly in the workspace, then hand them off to developers or AI coding agents—and verify the resulting pull request against the approved plan.`}
      features={[
        { icon: Calendar, title: "Issue Tracker Sync", desc: "Connects directly with Jira, Linear, and GitHub Issues to convert acceptance criteria into structured engineering tasks." },
        { icon: CheckSquare, title: "Editable Task Blueprints", desc: "Review, split, reorder, and refine proposed file changes and verification checklists before handoff." },
        { icon: Layers, title: "AI Agent & PR Handoff", desc: "Export approved specs to coding agents (Devin, Claude Code, Cursor) and link them to Spec Verification gates." },
      ]}
      steps={[
        { step: "Step 01", title: "Select an Issue", desc: "Link your Jira or Linear workspace to GitRabbit. Import a user story or ticket." },
        { step: "Step 02", title: "Generate Blueprint", desc: "GitRabbit interprets the requirements and writes an implementation blueprint (changes required per folder)." },
        { step: "Step 03", title: "Refine and Approve", desc: "Verify or tweak the steps in the web console, and save the finalized implementation plan." },
      ]}
      codeExample={{
        label: "Sample plan output for 'User Session Expiry' ticket",
        code: `# Technical Implementation Blueprint
## Goal
Implement auto-logout after 15 minutes of inactivity.

## Planned Changes
- **[NEW] middleware.ts**: Add check tracking lastActivity in cookies.
- **[MODIFY] auth-provider.tsx**: Listen to cursor movement and resets cookie TTL.
- **[MODIFY] next.config.ts**: Adjust security cookie parameters to HttpOnly.

## Verification Checklist
- [ ] Session expires after exactly 15 minutes of idle state.
- [ ] Mouse moves reset countdown.`,
      }}
      proTips={[
        "Link Jira tickets to specific branches. GitRabbit will match the PR code against the initial plan to verify feature compliance.",
        "Include reference files (e.g. 'Use login-form.tsx as template') in your prompts to generate highly specific blueprints.",
      ]}
      prevPage={{ href: "/docs/cicd", label: "CI/CD Integration" }}
      nextPage={{ href: "/docs/test-gen", label: "Unit Test Generation" }}
    />
  );
}
