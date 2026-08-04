"use client";

import { DocPage } from "@/components/DocPage";
import { Brain, Settings, GraduationCap, CheckCircle } from "lucide-react";

export default function TeamLearningsPage() {
  return (
    <DocPage
      breadcrumb="Codebase_Intelligence / Team_Learnings"
      badge="KNOWLEDGE REPO"
      badgeColor="#10B981"
      title="TEAM LEARNINGS & RULES"
      subtitle="Teach GitRabbit your team's specific coding styles and customs."
      description={`Every team has distinct architectural patterns, naming styles, and code formatting rules. GitRabbit learns your style automatically by analyzing your commit history. Additionally, you can specify custom rules inside YAML configuration files to mandate conventions (e.g. 'Use custom logger instead of console.log').`}
      features={[
        { icon: GraduationCap, title: "Style Adaptability", desc: "The agent learns which pull requests are merged vs rejected, automatically fine-tuning its recommendations." },
        { icon: Settings, title: "YAML System Guidelines", desc: "Write explicit instructions for specific folders or the entire repository." },
        { icon: CheckCircle, title: "Automated Enforcement", desc: "No more spending review time reminding team members about PascalCase namespaces or import orders." },
      ]}
      steps={[
        { step: "Step 01", title: "Add Guidelines", desc: "Define rules in '.gitrabbit/rules.yml' or in the GitRabbit Settings dashboard." },
        { step: "Step 02", title: "Historical Scan", desc: "The agent parses past merge history to understand standard library conventions." },
        { step: "Step 03", title: "Enforcement", desc: "Every subsequent PR will flag deviation from the learned standards." },
      ]}
      codeExample={{
        label: ".gitrabbit/rules.yml template config",
        code: `# Rules configuration
rules:
  - name: "No Direct Console Logs"
    pattern: "console\\.(log|error|warn)"
    message: "Use our custom logging module: import { logger } from '@/lib/logger'"
    severity: warning

  - name: "PascalCase Components"
    paths: ["frontend/components/**"]
    message: "Ensure all component filenames are strictly PascalCase."`,
      }}
      proTips={[
        "Keep rules simple. GitRabbit handles complex semantic requirements without regex if you write clear messages.",
        "Add examples of good code directly in the rules file to train the review agent faster.",
        "Custom instructions are applied team-wide and can be version-controlled in Git.",
      ]}
      prevPage={{ href: "/docs/code-graph", label: "Code Graph" }}
      nextPage={{ href: "/docs/languages", label: "Language Support" }}
    />
  );
}
