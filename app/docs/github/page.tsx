"use client";

import { DocPage } from "@/components/DocPage";
import { Puzzle, Shield, CheckCircle } from "lucide-react";
import { Github } from "@/components/Icons";

export default function GitHubNodePage() {
  return (
    <DocPage
      breadcrumb="Integrations / GitHub_Node"
      badge="GITHUB INTEGRATION"
      badgeColor="#F5C518"
      title="GITHUB NODE INTEGRATION"
      subtitle="Connect GitRabbit directly to your GitHub Organization or personal repositories."
      description={`GitRabbit integrates with GitHub using our official GitHub App. This integration enables GitRabbit to listen to webhook events, post inline code review comments, update PR statuses, and handle discussions in PR threads.`}
      features={[
        { icon: Github, title: "Official GitHub App", desc: "Install easily through the GitHub Marketplace. Supports personal accounts and large organizations." },
        { icon: Shield, title: "Fine-grained Permissions", desc: "Grant read/write access to specific repositories or restrict permissions to metadata only." },
        { icon: CheckCircle, title: "PR Status Checks", desc: "Integrate GitRabbit status checks directly with branch protection rules to block unsafe merges." },
      ]}
      steps={[
        { step: "Step 01", title: "Install from Marketplace", desc: "Navigate to the GitRabbit GitHub Marketplace page and click 'Install'.", code: "open https://github.com/apps/gitrabbit" },
        { step: "Step 02", title: "Choose Repository Scope", desc: "Select 'All repositories' or choose specific repositories you want to audit." },
        { step: "Step 03", title: "Grant Permissions", desc: "Approve requested read/write access to Pull Requests, Checks, and Contents." },
      ]}
      codeExample={{
        label: "Required GitHub App Permissions",
        code: `Permissions requested by GitRabbit:
- Pull Requests: Read & Write (For scanning diffs and writing review comments)
- Checks: Read & Write (For updating check status flags)
- Repository Contents: Read (For analyzing file imports and code graph contexts)
- Metadata: Read-only (For repo ownership and basic structures)`,
      }}
      proTips={[
        "Set up branch protection rules in GitHub to require the 'GitRabbit Review' check to pass before merging.",
        "Add collaborators as code owners to automatically route notifications when files are changed.",
      ]}
      prevPage={{ href: "/docs/privacy", label: "Privacy Vault" }}
      nextPage={{ href: "/docs/gitlab", label: "GitLab Node" }}
    />
  );
}
