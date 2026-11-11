"use client";

import { DocPage } from "@/components/DocPage";
import { Terminal, Key, ShieldCheck, Activity } from "lucide-react";

export default function ApiReferencePage() {
  return (
    <DocPage
      breadcrumb="Platforms & API / REST & GraphQL API"
      badge="DEVELOPER REFERENCE"
      badgeColor="#10B981"
      title="REST & GraphQL API Reference"
      subtitle="Query review histories, codebase health metrics, and trigger audits programmatically."
      description={`GitRabbit exposes versioned REST and GraphQL endpoints for querying pull request review histories, updating organization rules, reading repository health scores, and triggering automated spec audits from external CI workflows. All API requests authenticate with a Bearer token in the \`Authorization\` header.`}
      features={[
        { icon: Key, title: "API Authentication", desc: "Access the API securely using personal developer tokens or organization tokens." },
        { icon: ShieldCheck, title: "Rate Limiting & Safety", desc: "Generous rate limits of 10,000 requests/hour per organization with secure CORS rules." },
        { icon: Activity, title: "Webhooks Integration", desc: "Listen for real-time review completions, security notifications, or team changes." },
      ]}
      steps={[
        { step: "Step 01", title: "Generate API Token", desc: "Go to the Settings page in the GitRabbit web console and generate a new Developer Token." },
        { step: "Step 02", title: "Authorize Request", desc: "Include the API token as a Bearer token in the 'Authorization' header of your HTTP request." },
        { step: "Step 03", title: "Query Endpoint", desc: "Make a request to any of our API endpoints (e.g. '/v1/reviews').", code: "curl -H \"Authorization: Bearer gr_dev_token\" https://api.gitrabbit.com/v1/reviews" },
      ]}
      codeExample={{
        label: "REST API Endpoint: GET /v1/reviews/health-score",
        code: `// Request
GET https://api.gitrabbit.com/v1/reviews/health-score?repo=frontend-app
Headers:
  Authorization: Bearer gr_dev_token_xyz

// Response
{
  "status": "success",
  "data": {
    "repository": "frontend-app",
    "score": "A-",
    "issues_count": {
      "critical": 0,
      "high": 2,
      "medium": 15,
      "low": 42
    },
    "scanned_at": "2026-08-04T10:00:00Z"
  }
}`,
      }}
      proTips={[
        "Keep your API tokens safe and rotate them regularly in settings.",
        "Check our OpenAPI specification (swagger.json) in the dashboard for the complete endpoint schema definitions.",
      ]}
      prevPage={{ href: "/docs/bitbucket", label: "Bitbucket Node" }}
    />
  );
}
