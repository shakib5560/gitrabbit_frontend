"use client";

import { DocPage } from "@/components/DocPage";
import { Code, Terminal, Zap, Shield } from "lucide-react";

export default function IdeIntegrationPage() {
  return (
    <DocPage
      breadcrumb="Developer_Workflow / IDE_Integration"
      badge="IDE EXTENSION"
      badgeColor="#3B82F6"
      title="IDE INTEGRATION"
      subtitle="Bring real-time, senior-level inline reviews directly into your editor."
      description={`Why wait until you push your code to get feedback? GitRabbit extensions for VS Code, Cursor, and Windsurf bring our review engine directly into your local editor. As you write code, the extension reviews your syntax and highlights potential bugs, logic flows, or structural errors in real time, before you even open a commit.`}
      features={[
        { icon: Code, title: "Inline Diagnostics", desc: "Get red/orange squiggles with clear, actionable refactoring tips right inside your files." },
        { icon: Zap, title: "Local One-Click Fixes", desc: "Accept code edits locally, automatically updating your code file without leaving the cursor." },
        { icon: Shield, title: "Pre-Commit Checks", desc: "Local scanners run your configured linting rules locally to prevent dirty commits." },
      ]}
      steps={[
        { step: "Step 01", title: "Install the Extension", desc: "Search for 'GitRabbit' in the VS Code Marketplace or Cursor Extensions store and install it.", code: "ext install gitrabbit.gitrabbit-vscode" },
        { step: "Step 02", title: "Authenticate with API Token", desc: "Sign in using your GitRabbit account or enter your Personal Developer Token in Settings." },
        { step: "Step 03", title: "Run Local Analysis", desc: "Right-click any folder or file to trigger a full local code validation." },
      ]}
      codeExample={{
        label: "settings.json (VS Code / Cursor setup)",
        code: `{
  "gitrabbit.apiToken": "gr_dev_token_8f93aa2...",
  "gitrabbit.enableRealtimeLinting": true,
  "gitrabbit.autoApplyFixesOnSave": false,
  "gitrabbit.severityThreshold": "medium",
  "gitrabbit.ignoredFiles": [
    "**/node_modules/**",
    "**/build/**"
  ]
}`,
      }}
      proTips={[
        "Toggle 'gitrabbit.enableRealtimeLinting' if you experience performance lag on large monorepos.",
        "You can debate suggestions with the local extension using standard AI chat sidebars.",
      ]}
      prevPage={{ href: "/docs/workflows", label: "Custom Workflows" }}
      nextPage={{ href: "/docs/cli", label: "Pre-Commit CLI" }}
    />
  );
}
