"use client";

import { DocPage } from "@/components/DocPage";
import { Users, FileText, CheckCircle, Lock } from "lucide-react";

export default function TeamRulesPage() {
  return (
    <DocPage
      breadcrumb="Team_Collaboration / Team_Rules"
      badge="ORGANIZATIONAL GOVERNANCE"
      badgeColor="#10B981"
      title="ORGANIZATIONAL TEAM RULES"
      subtitle="Define and enforce standardized coding guidelines across multiple teams."
      description={`For large organizations, maintaining consistency across dozens of microservices or separate frontend sites is difficult. GitRabbit Team Rules allows engineering managers to set global configuration defaults, mandate specific lint configurations, and maintain standard file structures across all organization repositories.`}
      features={[
        { icon: Users, title: "Multi-Team Governance", desc: "Define rules at the Organization level, allowing nested teams to inherit or extend them." },
        { icon: FileText, title: "Global Template Sync", desc: "Store your team templates in a central repository, syncing rules instantly across all client projects." },
        { icon: Lock, title: "Compliance Locks", desc: "Prevent individual repository owners from turning off security or compliance scanners in their configs." },
      ]}
      steps={[
        { step: "Step 01", title: "Create Central Rules Repo", desc: "Create a repository named '.gitrabbit-config' in your organization workspace." },
        { step: "Step 02", title: "Write Global rules.yml", desc: "Populate rules.yml with organization-wide linting guidelines." },
        { step: "Step 03", title: "Enforce Policies", desc: "Turn on rule sync inside the GitRabbit Organization Dashboard to enforce standard quality gates." },
      ]}
      codeExample={{
        label: "Centralized rules.yml mapping example",
        code: `# Global Organization Rules
org:
  name: "acme-corp"
  enforce_strict_sast: true
  rules:
    - name: "License Headers"
      paths: ["**/*.go", "**/*.ts"]
      message: "Include copyright banner at top: (c) Acme Corp 2026"
    - name: "Disallow Private Keys"
      regex: "(?i)private_key|client_secret|password"
      severity: error`,
      }}
      proTips={[
        "Use local rule overrides for legacy projects that cannot yet conform to organization-wide standards.",
        "Include a wiki link inside the rule 'message' field so developers can read documentation about the rule.",
        "Team rules are evaluated before local rules, ensuring central governance has final authority.",
      ]}
      prevPage={{ href: "/docs/slack-agent", label: "Slack Agent" }}
      nextPage={{ href: "/docs/analytics", label: "Review Analytics" }}
    />
  );
}
