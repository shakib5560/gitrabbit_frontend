"use client";

import { DocPage } from "@/components/DocPage";
import { Puzzle, HelpCircle, Shield, Key } from "lucide-react";

export default function BitbucketNodePage() {
  return (
    <DocPage
      breadcrumb="Integrations / Bitbucket_Node"
      badge="BITBUCKET INTEGRATION"
      badgeColor="#F5C518"
      title="BITBUCKET NODE INTEGRATION"
      subtitle="Connect GitRabbit to Bitbucket Cloud or Bitbucket Server."
      description={`GitRabbit supports Bitbucket Cloud and self-hosted Bitbucket Server instances. Integration is configured using App Passwords and Repository Webhooks, enabling GitRabbit to scan pull requests and post inline comments.`}
      features={[
        { icon: Key, title: "App Password Authentication", desc: "Securely authenticate GitRabbit using App Passwords with restricted permissions." },
        { icon: Shield, title: "Webhook Integration", desc: "Listen for pull request creation, update, and comment reply events." },
        { icon: HelpCircle, title: "Bitbucket Pipelines Compatibility", desc: "Plug reviews directly into your Bitbucket build and test pipelines." },
      ]}
      steps={[
        { step: "Step 01", title: "Generate App Password", desc: "Go to Bitbucket Personal Settings, select 'App Passwords', and create one with Pull Requests Read & Write scopes." },
        { step: "Step 02", title: "Add Webhook", desc: "Configure a webhook in your Bitbucket repository pointing to the GitRabbit Bitbucket hook URL." },
        { step: "Step 03", title: "Test Connection", desc: "Trigger a test event or open a dummy pull request to verify the webhook connection." },
      ]}
      codeExample={{
        label: "Bitbucket Webhook Configuration",
        code: `Title: GitRabbit Integration Hook
URL: https://api.gitrabbit.com/v1/webhooks/bitbucket
Status: Active
Triggers:
- Pull Request: Created, Updated, Comment Created`,
      }}
      proTips={[
        "Bitbucket Server integrations may require additional firewall rules to allow webhook events to reach GitRabbit endpoints.",
        "Use workspace-level webhooks to configure GitRabbit for all repositories in a workspace at once.",
      ]}
      prevPage={{ href: "/docs/gitlab", label: "GitLab Node" }}
      nextPage={{ href: "/docs/api", label: "API Reference" }}
    />
  );
}
