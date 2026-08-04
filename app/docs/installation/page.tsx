"use client";

import { DocPage } from "@/components/DocPage";
import { Terminal, ShieldAlert, Cpu } from "lucide-react";
import { Gitlab, Github } from "@/components/Icons";

export default function InstallationPage() {
  return (
    <DocPage
      breadcrumb="Installation"
      badge="CORE SETUP"
      badgeColor="#3B82F6"
      title="INSTALLATION GUIDE"
      subtitle="Connect GitRabbit to your version control systems."
      description={`GitRabbit supports seamless integration with GitHub, GitLab, and Bitbucket. By default, it operates as an authorized app, listening to webhook events (like pull request creation or updates) and running isolated reviews in ephemeral environments.\n\nChoose your platform below to begin the setup sequence.`}
      features={[
        { icon: Github, title: "GitHub App", desc: "Install in one click via the GitHub Marketplace. Supports fine-grained permissions." },
        { icon: Gitlab, title: "GitLab Integration", desc: "Integrate using self-hosted or SaaS GitLab using Project Webhooks and Access Tokens." },
        { icon: ShieldAlert, title: "Secure Handshake", desc: "All communication is encrypted via TLS 1.3 with automated key rotation." },
        { icon: Cpu, title: "Self-Hosted Runners", desc: "Run analysis on your own infrastructure for maximum data isolation." },
      ]}
      steps={[
        { step: "GitHub Step 01", title: "Access GitHub Marketplace", desc: "Navigate to the marketplace and look for the GitRabbit integration app." },
        { step: "GitHub Step 02", title: "Configure Scope", desc: "Select either 'All repositories' or specify a list of repositories you wish to scan." },
        { step: "GitLab Step 01", title: "Create Access Token", desc: "In GitLab, generate a Personal Access Token or Project Access Token with 'api' scope." },
        { step: "GitLab Step 02", title: "Setup Webhook", desc: "Add a Webhook to your GitLab project pointing to the GitRabbit API endpoint with Merge Request events enabled." },
      ]}
      codeExample={{
        label: "Self-Hosted runner configuration (docker-compose.yml)",
        code: `version: '3.8'
services:
  gitrabbit-runner:
    image: gitrabbit/runner:latest
    environment:
      - GITRABBIT_AGENT_KEY=gr_live_8f3a92c810d
      - REPO_SCOPE=github.com/my-org/*
      - MAX_CONCURRENT_JOBS=4
    restart: always`,
      }}
      proTips={[
        "We recommend selecting specific repositories during initial installation to control review volume.",
        "Ensure your CI environment has outbound access to api.gitrabbit.com if using self-hosted runners.",
        "Check our Enterprise Security section for IP whitelisting instructions.",
      ]}
      prevPage={{ href: "/docs/quickstart", label: "Quick Start" }}
      nextPage={{ href: "/docs/config", label: "Configuration" }}
    />
  );
}
