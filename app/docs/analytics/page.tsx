"use client";

import { DocPage } from "@/components/DocPage";
import { BarChart3, LineChart, PieChart, Activity } from "lucide-react";

export default function ReviewAnalyticsPage() {
  return (
    <DocPage
      breadcrumb="Team_Collaboration / Review_Analytics"
      badge="INSIGHTS"
      badgeColor="#A78BFA"
      title="REVIEW QUALITY & ANALYTICS"
      subtitle="Track review quality, codebase health, and developer velocity."
      description={`GitRabbit compiles diagnostic reports to help teams measure review accuracy and developer velocity. Monitor average PR approval times, identify projects experiencing elevated defect density, and check how many AI suggestions are accepted vs rejected to measure custom rules effectiveness.`}
      features={[
        { icon: LineChart, title: "Velocity Tracking", desc: "Track code review cycle times and blockages across various team units." },
        { icon: PieChart, title: "Suggestion Actionability", desc: "View the acceptance rate of GitRabbit suggestions to check rule quality and filter out noise." },
        { icon: Activity, title: "Codebase Health Index", desc: "Consolidated index charting vulnerability scores, test coverage, and documentation depth." },
      ]}
      steps={[
        { step: "Step 01", title: "Open Analytics Dashboard", desc: "Navigate to the GitRabbit web console and click the Analytics tab." },
        { step: "Step 02", title: "Select Scope", desc: "Filter metrics by organization, repository, specific team, or time period." },
        { step: "Step 03", title: "Export Reports", desc: "Download summaries as CSV, JSON, or configure scheduled PDF delivery to Slack or email." },
      ]}
      codeExample={{
        label: "Sample metrics JSON payload exported from API",
        code: `{
  "repo": "frontend-app",
  "period": "2026-Q3",
  "average_pr_cycle_hours": 3.4,
  "suggestions_provided": 1420,
  "suggestions_accepted_pct": 84.5,
  "detected_bugs_escaped_to_production": 0,
  "codebase_health_score": "A-"
}`,
      }}
      proTips={[
        "Low suggestion acceptance rates? Tweak your rules.yml to prevent the agent from leaving comments your team finds pedantic.",
        "Integrate analytics into your monthly sprint reviews to monitor code quality improvements over time.",
      ]}
      prevPage={{ href: "/docs/team-rules", label: "Team Rules" }}
      nextPage={{ href: "/docs/workflows", label: "Custom Workflows" }}
    />
  );
}
