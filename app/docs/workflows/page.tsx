"use client";

import { DocPage } from "@/components/DocPage";
import { Workflow, Layers, GitMerge, Settings } from "lucide-react";

export default function CustomWorkflowsPage() {
  return (
    <DocPage
      breadcrumb="Team_Collaboration / Custom_Workflows"
      badge="WORKFLOW PIPELINES"
      badgeColor="#10B981"
      title="CUSTOM WORKFLOWS & AUTOMATION"
      subtitle="Define review conditions, automated approvals, and routing gates."
      description={`GitRabbit Custom Workflows allow you to adapt review actions based on metadata like files changed, branch name, or PR size. Send structural changes (e.g., database schema modifications) to senior engineers, auto-approve documentation fixes, and trigger deep static testing for code targeting production.`}
      features={[
        { icon: Layers, title: "Conditional Review Gates", desc: "Change review filters and models depending on which directory has modifications." },
        { icon: GitMerge, title: "Automated Merging", desc: "Configure safe branches (like translation updates) to auto-merge when GitRabbit confirms zero style or security issues." },
        { icon: Settings, title: "Reviewer Assignee Mapping", desc: "Automatically assign the correct human reviewers based on the impact scope evaluated by the AI summary." },
      ]}
      steps={[
        { step: "Step 01", title: "Open Workflows Panel", desc: "Access repository Settings in the GitRabbit dashboard and choose Custom Workflows." },
        { step: "Step 02", title: "Create a Trigger Rule", desc: "Specify files or author targets (e.g., changes to 'db/**/*.sql')." },
        { step: "Step 03", title: "Define Actions", desc: "Select options such as adding specific labels, assigning reviews, or requesting secondary approvals." },
      ]}
      codeExample={{
        label: ".gitrabbit/workflows.yml structure",
        code: `# Custom Review Pipelines
workflows:
  - name: "Database Protections"
    trigger:
      files: ["db/**/*.sql", "models/**/*.ts"]
    actions:
      - add_labels: ["database", "needs-migration-audit"]
      - request_reviewers: ["senior-dba-team"]
      - severity_override: strict

  - name: "Auto-Approve Docs"
    trigger:
      files: ["**/*.md", "docs/**/*"]
    actions:
      - auto_approve: true
      - auto_merge: false`,
      }}
      proTips={[
        "Set up an auto-approve workflow for translations (.json files) to speed up localization pipelines.",
        "Ensure workflows are tested on staging branches before applying them to critical release structures.",
      ]}
      prevPage={{ href: "/docs/analytics", label: "Review Analytics" }}
      nextPage={{ href: "/docs/ide", label: "IDE Integration" }}
    />
  );
}
