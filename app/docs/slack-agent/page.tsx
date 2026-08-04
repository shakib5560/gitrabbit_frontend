"use client";

import { DocPage } from "@/components/DocPage";
import { MessageSquare, BellRing, Ticket } from "lucide-react";
import { Slack } from "@/components/Icons";

export default function SlackAgentPage() {
  return (
    <DocPage
      breadcrumb="Team_Collaboration / Slack_Agent"
      badge="SLACK INTEGRATION"
      badgeColor="#34D399"
      title="SLACK AGENT (VIA PULLFLOW)"
      subtitle="Centralize notifications, sync chats, and troubleshoot issues directly in Slack."
      description={`GitRabbit integrates with Slack via PullFlow to connect your developer communications. Get real-time updates when reviews occur, sync conversation threads between GitHub/GitLab comments and Slack channels, and ask GitRabbit to investigate incidents or tickets directly from Slack.`}
      features={[
        { icon: Slack, title: "Bi-directional Sync", desc: "Replies on Slack are automatically posted as PR comments, and vice versa." },
        { icon: BellRing, title: "Smart Notification Routing", desc: "Routes notifications only to relevant code owners instead of spamming public channels." },
        { icon: Ticket, title: "Incident Troubleshooting", desc: "Interact with the GitRabbit agent inside Slack to analyze logs or debug active support tickets." },
      ]}
      steps={[
        { step: "Step 01", title: "Add to Slack", desc: "Go to GitRabbit Integration Settings and click 'Install Slack App'.", code: "open https://gitrabbit.com/integrations/slack" },
        { step: "Step 02", title: "Map Channels", desc: "Link repositories or teams to specific Slack channels." },
        { step: "Step 03", title: "Authenticate Members", desc: "Have developers log in to map their Slack accounts to their GitHub/GitLab profiles." },
      ]}
      codeExample={{
        label: "Interacting with GitRabbit in Slack",
        code: `🙋 Developer: @gitrabbit check PR #405 for security issues

🤖 GitRabbit APP:
PR #405 "Update Auth Strategy" has 1 security alert:
- High: Plaintext JWT signing key found in config/env.json.
[View Pull Request] [Apply Fix]`,
      }}
      proTips={[
        "Use /gitrabbit status to get a list of pending PR approvals and reviews for your team.",
        "Enable thread auto-archive to keep Slack channels clean after pull requests are merged.",
        "Team members can approve pull requests directly using emoji reactions in mapped channels.",
      ]}
      prevPage={{ href: "/docs/languages", label: "Language Support" }}
      nextPage={{ href: "/docs/team-rules", label: "Team Rules" }}
    />
  );
}
