"use client";

import { DocPage } from "@/components/DocPage";
import { Database, GitFork, Share2, Compass } from "lucide-react";

export default function CodeGraphPage() {
  return (
    <DocPage
      breadcrumb="Codebase_Intelligence / Code_Graph"
      badge="GRAPH INTELLIGENCE"
      badgeColor="#A78BFA"
      title="CODE GRAPH ANALYSIS"
      subtitle="Analyze the entire codebase to understand file relationships and dependencies."
      description={`Typical review tools only examine the lines that changed. GitRabbit is different. It constructs a full Abstract Syntax Tree (AST) graph of your entire repository, tracing imports, class hierarchies, and database structures. When you modify a file, GitRabbit knows exactly which other files in the codebase are impacted by that change.`}
      features={[
        { icon: GitFork, title: "Impact Propagation Tracking", desc: "See how changing a shared interface affects legacy classes in helper subfolders." },
        { icon: Share2, title: "Cross-file Reference Validation", desc: "Detect broken imports and API changes across multiple repositories." },
        { icon: Compass, title: "Structural Insights", desc: "Ensures code additions follow established design patterns already present in other modules." },
      ]}
      steps={[
        { step: "Step 01", title: "Repository Indexing", desc: "During initial installation, GitRabbit builds a code graph in a secure, ephemeral workspace." },
        { step: "Step 02", title: "Diff Mapping", desc: "When a PR is created, GitRabbit map the changed files against the pre-compiled dependency tree." },
        { step: "Step 03", title: "Propagation Scan", desc: "The agent traces imports to ensure changed APIs match expected types in dependent files." },
      ]}
      codeExample={{
        label: "Visual illustration of Code Graph propagation",
        code: `[user-controller.ts] (Changed)
        │
        └───> Imports: [auth-service.ts] (Valid)
        │
        └───> Imports: [logging-library.ts] ❌ Broke dependency!
              (Parameter 'severity' mismatch detected inside logEvent call)`,
      }}
      proTips={[
        "Keep your export paths clean. Resolving circular dependencies makes the GitRabbit code graph analysis up to 3x faster.",
        "Code graphs are recompiled automatically with every merge into your main branch.",
        "You can view the interactive codebase visualization in the GitRabbit cloud console.",
      ]}
      prevPage={{ href: "/docs/agentic-chat", label: "Agentic Chat" }}
      nextPage={{ href: "/docs/team-learnings", label: "Team Learnings" }}
    />
  );
}
