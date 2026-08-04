"use client";

import { DocPage } from "@/components/DocPage";
import { FileText, Calendar, CheckSquare, Layers } from "lucide-react";

export default function CodeRabbitPlanPage() {
  return (
    <DocPage
      breadcrumb="Pre-Merge_Automation / CodeRabbit_Plan"
      badge="UPSTREAM PLANNING"
      badgeColor="#F97316"
      title="CODERABBIT PLAN"
      subtitle="Generate structured, editable coding plans from issue tickets and text prompts."
      description={`GitRabbit Plan (inspired by CodeRabbit Plan) acts as an upstream architect. Before a single line of code is written, it interprets issue descriptions from trackers (Jira, Linear, GitHub Issues) or simple text prompts and writes a structured technical design document. These plans can then be directly assigned to your developers or AI coding agents for execution.`}
      features={[
        { icon: Calendar, title: "Issue Tracker Integrations", desc: "Syncs directly with Jira and Linear. Reads project tickets to design solutions." },
        { icon: CheckSquare, title: "Editable Tasks List", desc: "Allows technical architects to edit, split, and refine the generated checklists before handoff." },
        { icon: Layers, title: "AI Agent Handoff", desc: "Export tasks directly into format specifications compatible with coding agents (like Devin or GitRabbit runners)." },
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
