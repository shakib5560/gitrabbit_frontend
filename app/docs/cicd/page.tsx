"use client";

import { DocPage } from "@/components/DocPage";
import { GitMerge, Layers, Cpu, ShieldCheck } from "lucide-react";

export default function CiCdIntegrationPage() {
  return (
    <DocPage
      breadcrumb="Developer_Workflow / CI_CD_Integration"
      badge="CI PIPELINES"
      badgeColor="#3B82F6"
      title="CI/CD PIPELINE INTEGRATION"
      subtitle="Plug GitRabbit directly into your deployment pipelines."
      description={`GitRabbit integrates with all major CI/CD engines. Running code audits inside your CI/CD pipelines ensures that no code gets merged or deployed without passing security rules, syntax verification, and standard compliance audits.`}
      features={[
        { icon: Layers, title: "GitHub Actions", desc: "Native action setup with automatic PR comments and state check reporting." },
        { icon: GitMerge, title: "GitLab CI & Bitbucket Pipelines", desc: "Integrate using container runners and build steps." },
        { icon: ShieldCheck, title: "Custom Webhooks & Triggers", desc: "Trigger scans manually from custom pipelines or API hooks." },
      ]}
      steps={[
        { step: "Step 01", title: "Generate Secret Key", desc: "Navigate to your GitRabbit organization Settings and generate a Pipeline Token." },
        { step: "Step 02", title: "Add Pipeline Configuration", desc: "Save the token as an environment variable (GITRABBIT_TOKEN) in your CI provider." },
        { step: "Step 03", title: "Add Pipeline Job", desc: "Create a job in your pipeline configuration file (e.g. '.github/workflows/gitrabbit.yml')." },
      ]}
      codeExample={{
        label: ".github/workflows/gitrabbit.yml config file",
        code: `name: GitRabbit Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: GitRabbit Scan
        uses: gitrabbit/actions-scan@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          GITRABBIT_TOKEN: \${{ secrets.GITRABBIT_TOKEN }}`,
      }}
      proTips={[
        "Configure fetch-depth: 0 to ensure GitRabbit has complete access to the git logs required for impact analysis.",
        "Set 'fail-on-alerts: true' to reject the build step if critical vulnerabilities are discovered.",
      ]}
      prevPage={{ href: "/docs/cli", label: "Pre-Commit CLI" }}
      nextPage={{ href: "/docs/plan", label: "CodeRabbit Plan" }}
    />
  );
}
