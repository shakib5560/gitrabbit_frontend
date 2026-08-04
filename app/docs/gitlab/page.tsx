"use client";

import { DocPage } from "@/components/DocPage";
import { Puzzle, Key, Shield } from "lucide-react";
import { Gitlab } from "@/components/Icons";

export default function GitLabNodePage() {
  return (
    <DocPage
      breadcrumb="Integrations / GitLab_Node"
      badge="GITLAB INTEGRATION"
      badgeColor="#F5C518"
      title="GITLAB NODE INTEGRATION"
      subtitle="Connect GitRabbit to GitLab SaaS or self-hosted instances."
      description={`GitRabbit supports GitLab SaaS (gitlab.com) and self-hosted GitLab instances. Integration is configured using Project Access Tokens and webhooks, enabling GitRabbit to listen to Merge Request events and post feedback threads.`}
      features={[
        { icon: Gitlab, title: "SaaS & Self-Hosted Support", desc: "Integrate with public repositories on GitLab SaaS or private self-hosted deployments." },
        { icon: Key, title: "Access Token Authentication", desc: "Control access scopes with Personal or Project Access Tokens." },
        { icon: Shield, title: "Webhook Events", desc: "Trigger scans on Merge Request creation, updates, and comment thread activities." },
      ]}
      steps={[
        { step: "Step 01", title: "Create Access Token", desc: "Go to your GitLab project settings and generate a Personal or Project Access Token with 'api' scope." },
        { step: "Step 02", title: "Add Webhook", desc: "Add a Webhook to your GitLab project pointing to the GitRabbit API endpoint with Merge Request events enabled." },
        { step: "Step 03", title: "Configure Instance URL", desc: "If using a self-hosted instance, set the base URL in your GitRabbit settings (e.g., gitlab.acme.com)." },
      ]}
      codeExample={{
        label: "GitLab Webhook Configuration Parameters",
        code: `URL: https://api.gitrabbit.com/v1/webhooks/gitlab
Secret Token: gr_gitlab_sec_9f83a21...
Trigger events:
- Merge request events (Checked)
- Note events (Checked - for comment thread replies)
- Pipeline events (Optional)`,
      }}
      proTips={[
        "Ensure the GitRabbit API token has sufficient permissions to write comments on your GitLab projects.",
        "Check your self-hosted instance firewall settings to ensure outbound access to api.gitrabbit.com is enabled.",
      ]}
      prevPage={{ href: "/docs/github", label: "GitHub Node" }}
      nextPage={{ href: "/docs/bitbucket", label: "Bitbucket Node" }}
    />
  );
}
