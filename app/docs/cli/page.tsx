"use client";

import { DocPage } from "@/components/DocPage";
import { Terminal, ShieldAlert, Cpu, Settings } from "lucide-react";

export default function PreCommitCliPage() {
  return (
    <DocPage
      breadcrumb="Developer_Workflow / Pre-Commit_CLI"
      badge="COMMAND LINE"
      badgeColor="#F5C518"
      title="PRE-COMMIT CLI REVIEWS"
      subtitle="Review both staged and unstaged local changes before committing."
      description={`GitRabbit CLI (\`gitrabbit-cli\`) provides a powerful terminal integration that allows developers to run comprehensive code reviews locally. Validate staged files, check against security vulnerabilities, and generate docstrings directly from your terminal session prior to pushing to remote git repositories.`}
      features={[
        { icon: ShieldAlert, title: "Staged Changes Scanning", desc: "Scan only what you've staged with 'git add' to keep commits clean and precise." },
        { icon: Cpu, title: "Offline Capabilities", desc: "Local lightweight model execution mode for offline reviews without network connection." },
        { icon: Settings, title: "Husky & Git Hooks", desc: "Easily integrate as a pre-commit hook in your project's pipeline." },
      ]}
      steps={[
        { step: "Step 01", title: "Install CLI Utility", desc: "Install the GitRabbit CLI globally via npm or homebrew.", code: "npm install -g gitrabbit-cli" },
        { step: "Step 02", title: "Authenticate Session", desc: "Log in with your GitRabbit credentials to link your local CLI to your organization settings.", code: "gitrabbit auth login" },
        { step: "Step 03", title: "Run Pre-Commit Scan", desc: "Run a scan on your current unstaged modifications.", code: "gitrabbit review --staged" },
      ]}
      codeExample={{
        label: "Installing as a git pre-commit hook with Husky",
        code: `# Install husky
npm install husky --save-dev
npx husky init

# Add gitrabbit command to hook
echo "gitrabbit review --staged --strict" > .husky/pre-commit
chmod +x .husky/pre-commit`,
      }}
      proTips={[
        "Use the '--fix' parameter with 'gitrabbit review' to let the CLI automatically apply modifications directly to your source files.",
        "Pass '--output=json' to pipe review errors into your custom dev tooling pipelines.",
      ]}
      prevPage={{ href: "/docs/ide", label: "IDE Integration" }}
      nextPage={{ href: "/docs/cicd", label: "CI/CD Integration" }}
    />
  );
}
