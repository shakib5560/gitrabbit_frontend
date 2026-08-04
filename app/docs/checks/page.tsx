"use client";

import { DocPage } from "@/components/DocPage";
import { Settings, Lock, CheckSquare, ShieldAlert } from "lucide-react";

export default function CustomChecksPage() {
  return (
    <DocPage
      breadcrumb="Security_&_Compliance / Custom_Checks"
      badge="PRE-MERGE CONTROLS"
      badgeColor="#F87171"
      title="CUSTOM PRE-MERGE CHECKS"
      subtitle="Mandate specific automated checks before any code can be merged."
      description={`Ensure repository health by implementing strict pre-merge gates. GitRabbit Custom Checks allow you to prevent merge actions on code branches that do not meet organizational standards (e.g. minimum test coverage, zero high-priority SAST security alerts, or pending reviewer sign-offs).`}
      features={[
        { icon: Lock, title: "Hard Merge Blocks", desc: "Locks the merge button in GitHub/GitLab until all verification rules are resolved." },
        { icon: CheckSquare, title: "Test Coverage Gates", desc: "Require a minimum percentage of test coverage on any new code additions." },
        { icon: ShieldAlert, title: "Security Assertions", desc: "Block merges instantly if vulnerability scanners detect API secret leaks." },
      ]}
      steps={[
        { step: "Step 01", title: "Open Settings Panel", desc: "Access the settings console on GitRabbit and go to 'Checks & Restrictions'." },
        { step: "Step 02", title: "Configure Policies", desc: "Choose rules like 'Require zero security alerts' or 'Minimum 80% test coverage'." },
        { step: "Step 03", title: "Enforce Check Status", desc: "Save the rules to enable GitRabbit check statuses as a required branch validation in GitHub or GitLab." },
      ]}
      codeExample={{
        label: "Sample policy status returned to VCS platforms",
        code: `Status: ❌ GitRabbit Checks Failed
Details:
- [FAILED] Required Test Coverage: 74% (Required: 80%)
- [PASSED] Zero High Security Alerts
- [FAILED] Missing review sign-off from: QA-Lead-Team

(This PR cannot be merged until these statuses are resolved.)`,
      }}
      proTips={[
        "Set up an exclusion list for documentation changes (.md) to prevent coverage checks from blocking docs updates.",
        "Enable administrator overrides for situations requiring hotfixes.",
      ]}
      prevPage={{ href: "/docs/sast", label: "SAST Integrations" }}
      nextPage={{ href: "/docs/security", label: "Enterprise Security" }}
    />
  );
}
