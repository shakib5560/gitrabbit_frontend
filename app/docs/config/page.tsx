"use client";

import { DocPage } from "@/components/DocPage";
import { Settings, Sliders, ToggleLeft, Shield } from "lucide-react";

export default function ConfigurationPage() {
  return (
    <DocPage
      breadcrumb="Configuration"
      badge="CUSTOMIZATION"
      badgeColor="#10B981"
      title="CONFIGURATION"
      subtitle="Tune GitRabbit parameters using the .gitrabbit.yml file."
      description={`GitRabbit reads a config file named \`.gitrabbit.yml\` at the root of your repository on every pull request event. This file lets you define review guidelines, exclude folders (like node_modules, dist, or vendor), override model settings, and control chat settings.`}
      features={[
        { icon: Sliders, title: "Fine-grained Exclusions", desc: "Ignore generated files, test fixtures, or vendor assets using glob patterns." },
        { icon: ToggleLeft, title: "Toggle Features", desc: "Turn off specific modules like automated docstrings, unit tests, or SAST scanners." },
        { icon: Shield, title: "Security Thresholds", desc: "Define fail-safe criteria to block merge requests if security violations are detected." },
      ]}
      steps={[
        { step: "Step 01", title: "Create Config File", desc: "Create a new file named '.gitrabbit.yml' in the root directory of your project.", code: "touch .gitrabbit.yml" },
        { step: "Step 02", title: "Add Exclusions", desc: "Specify files or folders that GitRabbit should never analyze (e.g., third-party code)." },
        { step: "Step 03", title: "Commit and Push", desc: "Commit the configuration file to your main branch or directly in a new PR to apply settings immediately." },
      ]}
      codeExample={{
        label: ".gitrabbit.yml complete configuration template",
        code: `# GitRabbit config schema v2
version: 2
reviews:
  auto_review: true
  exclude_paths:
    - "**/node_modules/**"
    - "**/dist/**"
    - "db/schema.rb"
  focus_areas:
    - security
    - performance
    - code_smells
  temperature: 0.2

chat:
  enabled: true
  allow_collaborators: true

sast:
  enable_linters: true
  severity_threshold: high`,
      }}
      proTips={[
        "Excluding massive auto-generated files (like db/schema.rb or package-lock.json) keeps reviews blazing fast.",
        "Set temperature lower (e.g. 0.1) for stricter, more deterministic syntax reviews.",
        "You can check config file validity in the GitRabbit dashboard under Repository Settings.",
      ]}
      prevPage={{ href: "/docs/installation", label: "Installation" }}
      nextPage={{ href: "/docs/reviews", label: "Automated Reviews" }}
    />
  );
}
