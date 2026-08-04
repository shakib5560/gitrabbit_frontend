"use client";

import { DocPage } from "@/components/DocPage";
import { Shield, Layers, ShieldCheck, Activity } from "lucide-react";

export default function SastIntegrationsPage() {
  return (
    <DocPage
      breadcrumb="Security_&_Compliance / SAST_Integrations"
      badge="SECURITY & STATIC ANALYSIS"
      badgeColor="#F87171"
      title="LINTERS & SAST INTEGRATIONS"
      subtitle="Integrates with over 40+ static analysis tools to provide security coverage."
      description={`GitRabbit operates in tandem with industry-standard security scanners and static code analyzers (SAST). By aggregating scanner outputs, GitRabbit filters out false positives, matches exceptions, and frames warnings with code fixes. There is no need to write manual scanner setups.`}
      features={[
        { icon: Shield, title: "40+ Integrated Scanners", desc: "Includes support for ESLint, SonarQube, Semgrep, Checkov, GoSec, Bandit, and more." },
        { icon: Layers, title: "False Positive Filter", desc: "AI filters out noisy static-linter warnings that do not impact runtime states." },
        { icon: ShieldCheck, title: "Compliance Mapping", desc: "Maps code vulnerabilities against standard frameworks like OWASP Top 10 and SANS 25." },
      ]}
      steps={[
        { step: "Step 01", title: "Enable Scanners", desc: "Select which scanners should run in your '.gitrabbit.yml' file or leave it to Auto-Detect." },
        { step: "Step 02", title: "Continuous Scan", desc: "During PR checks, GitRabbit runs scanners inside isolated, transient environments." },
        { step: "Step 03", title: "Consolidated Feedback", desc: "Vulnerability outputs are combined with code fixes directly in the PR review." },
      ]}
      codeExample={{
        label: "Configuration sample for SAST integration",
        code: `# .gitrabbit.yml
sast:
  scanners:
    semgrep:
      enabled: true
      rulesets: ["owasp-top-10"]
    gosec:
      enabled: true
    bandit:
      enabled: false
  fail_on_vulnerability: true
  ignore_warnings:
    - "no-console-log"`,
      }}
      proTips={[
        "Set 'fail_on_vulnerability: true' to block PR merges when critical code leaks (like API keys or SQL injection flaws) are flagged.",
        "Disable heavy checkers inside staging environments to optimize pipeline build speeds.",
      ]}
      prevPage={{ href: "/docs/merge-conflicts", label: "Merge Conflict Resolution" }}
      nextPage={{ href: "/docs/checks", label: "Custom Checks" }}
    />
  );
}
