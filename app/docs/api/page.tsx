"use client";

import { DocPage } from "@/components/DocPage";
import { Terminal, Key, ShieldCheck, Activity } from "lucide-react";

export default function ApiReferencePage() {
  return (
    <DocPage
      breadcrumb="Integrations / API_Reference"
      badge="DEVELOPER REFERENCE"
      badgeColor="#10B981"
      title="NEURAL API REFERENCE"
      subtitle="Interact with GitRabbit programmatically using our REST and GraphQL APIs."
      description={`GitRabbit provides a comprehensive API surface to query review histories, update custom rules, check codebase health metrics, and trigger audits programmatically. All requests require a Bearer token in the Authorization header.`}
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
