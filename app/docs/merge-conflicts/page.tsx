"use client";

import { DocPage } from "@/components/DocPage";
import { GitPullRequest, Settings, ShieldCheck, Zap } from "lucide-react";

export default function MergeConflictsPage() {
  return (
    <DocPage
      breadcrumb="Pre-Merge_Automation / Merge_Conflicts"
      badge="MERGE HELPER"
      badgeColor="#F97316"
      title="MERGE CONFLICT RESOLUTION"
      subtitle="Identify, analyze, and resolve code conflicts before merging."
      description={`GitRabbit assists you in resolving complex branch merges. The agent parses standard conflict markers (<<<<<<<, =======, >>>>>>>), evaluates parent history from both base and head branches, and generates a resolved file version that preserves both feature implementations without losing code changes.`}
      features={[
        { icon: Settings, title: "Dual-Branch Evaluation", desc: "Traces logic changes on both branches to understand original intent." },
        { icon: ShieldCheck, title: "AST-Level Verification", desc: "Ensures the generated resolution is syntax-compliant and won't crash when executed." },
        { icon: Zap, title: "Resolve Suggestions", desc: "Receive the resolved code via the GitRabbit interface to write or commit changes easily." },
      ]}
      steps={[
        { step: "Step 01", title: "Conflict Detection", desc: "GitRabbit detects when a pull request cannot be merged due to conflict markers." },
        { step: "Step 02", title: "Synthesize Resolution", desc: "The agent reviews conflict sections and evaluates surrounding imports to write a resolved file state." },
        { step: "Step 03", title: "Commit Resolution", desc: "Accept the resolution to automatically push a clean merge commit." },
      ]}
      codeExample={{
        label: "Visual of a merge conflict resolved by GitRabbit",
        code: `<<<<<<< HEAD
const apiUrl = "https://api.production.acme.com";
=======
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.staging.acme.com";
>>>>>>> feature-branch

// GitRabbit Proposed Resolution:
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.production.acme.com";`,
      }}
      proTips={[
        "Use local CLI reviews ('gitrabbit review --staged') to identify and resolve conflicts prior to pushing your work.",
        "Always review the resolved code outputs if they contain database structure updates.",
      ]}
      prevPage={{ href: "/docs/docstrings", label: "Docstring Generation" }}
      nextPage={{ href: "/docs/sast", label: "SAST Integrations" }}
    />
  );
}
