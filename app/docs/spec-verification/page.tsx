"use client";

import { DocPage } from "@/components/DocPage";
import { FileCheck, Database, ShieldAlert, Cpu, Sparkles, CheckSquare, Terminal } from "lucide-react";

export default function SpecVerificationPage() {
  return (
    <DocPage
      breadcrumb="Codebase_Intelligence / Spec_Verification"
      badge="AI AGENT VERIFICATION"
      badgeColor="#F5C518"
      accentColor="#F5C518"
      title="SPEC & REQUIREMENT VERIFICATION"
      subtitle="Parse client requirements & project context, then verify whether AI-agent-written code aligns with intended specs."
      description={`As autonomous AI coding agents (Devin, Claude Code, Cursor Composer, Windsurf, SWE-bench runners) generate large-scale pull requests, the core software risk shifts from simple syntax errors to intent divergence. GitRabbit's Spec Alignment Engine parses client requirements from PRDs, Jira tickets, and Linear user stories, cross-references your entire repository's architecture and context, and systematically audits agent-written code to guarantee every intended specification is fulfilled before merge.`}
      features={[
        {
          icon: FileCheck,
          title: "PRD & User Story Ingestion",
          desc: "Parses Jira, Linear, GitHub Issues, or markdown specs into deterministic verification checklists with edge-case requirements.",
        },
        {
          icon: Database,
          title: "Deep Project Context Mapping",
          desc: "Evaluates the diff alongside your ORM models, auth middleware, and repo code graph so specs are verified in real architectural context.",
        },
        {
          icon: ShieldAlert,
          title: "Hallucination & Spec Drift Guard",
          desc: "Detects when AI agents take shortcuts, hallucinate non-existent API parameters, bypass security boundaries, or silently drop requirements.",
        },
        {
          icon: Sparkles,
          title: "Closed-Loop Agent Re-Prompting",
          desc: "Automatically formulates structured corrective prompts directly to the AI agent via PR comments or generates 1-click committable patches.",
        },
      ]}
      steps={[
        {
          step: "Step 01",
          title: "Connect Specs & Trackers",
          desc: "Link Jira, Linear, or mention ticket IDs (e.g. 'Fixes PAY-1082') in your PR description or commit messages.",
        },
        {
          step: "Step 02",
          title: "Automated Contextual Audit",
          desc: "On PR creation by a human or AI agent, GitRabbit parses the requirements, builds the AST diff, and matches code changes against specifications.",
        },
        {
          step: "Step 03",
          title: "Alignment Scorecard & Patching",
          desc: "GitRabbit posts an interactive Spec Alignment Matrix, highlighting verified criteria, flagging deviations, and feeding corrections back to the agent.",
        },
      ]}
      codeExample={{
        label: "Configuration in .gitrabbit.yaml",
        code: `# .gitrabbit.yaml
spec_verification:
  enabled: true
  enforce_on_ai_agents: true # Devin, Claude Code, Cursor, Copilot
  min_alignment_score: 90    # Block merge if alignment drops below 90%
  
  sources:
    jira:
      project_keys: ["PAY", "SEC", "CORE"]
      parse_acceptance_criteria: true
    linear:
      sync_stories: true
    inline_pr_descriptions: true

  guardrails:
    prevent_agent_hallucinations: true
    forbid_client_supplied_tenancy: true
    require_idempotency_on_webhooks: true
    verify_test_coverage_per_requirement: true`,
        lang: "yaml",
      }}
      callout={{
        type: "tip",
        title: "Autonomous Agent Handoff",
        body: "When GitRabbit detects a spec gap in an agent-authored PR, it can automatically trigger the agent's webhooks with exact remedial instructions, allowing autonomous agents to self-correct in place before human review.",
      }}
      proTips={[
        "Use markdown checklists (- [ ]) in your PR description or Jira tickets. GitRabbit maps every item directly to specific files and line numbers.",
        "Include architecture constraints in .gitrabbit.yaml rules so AI agents can never bypass your security patterns.",
      ]}
      prevPage={{ href: "/docs/code-graph", label: "Code Graph Analysis" }}
      nextPage={{ href: "/docs/team-learnings", label: "Team Learnings" }}
    />
  );
}
