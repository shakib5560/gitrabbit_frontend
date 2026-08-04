"use client";

import { DocPage } from "@/components/DocPage";
import { Lock, Shield, EyeOff, CheckCircle } from "lucide-react";

export default function PrivacyVaultPage() {
  return (
    <DocPage
      breadcrumb="Security_&_Compliance / Privacy_Vault"
      badge="PRIVACY VAULT"
      badgeColor="#F87171"
      title="PRIVACY VAULT & COMPLIANCE"
      subtitle="Your code remains yours. Zero model training, zero data retention."
      description={`GitRabbit operates a strict Zero Data Retention policy. Our AI models analyze diffs inside volatile memory, and we do not use your proprietary codebase to train public models. Once the review is completed and comments are pushed to your VCS provider, all source files are permanently deleted from our review runners.`}
      features={[
        { icon: EyeOff, title: "Zero Model Training", desc: "Your code is never used to train public or proprietary AI models." },
        { icon: Shield, title: "GDPR & HIPAA Compliance", desc: "Data processing structures comply with global data protection laws." },
        { icon: Lock, title: "Secure Data Isolation", desc: "Reviews run in private, ephemeral environments that cannot access other customer workspaces." },
      ]}
      steps={[
        { step: "Scan Diff", title: "Diff Isolation", desc: "Only the changes in the diff and immediate file contexts are processed, rather than copying the entire repository." },
        { step: "Analyze", title: "Volatile Execution", desc: "Analysis happens entirely in RAM. No project data is written to disk." },
        { step: "Clean", title: "Instant Deletion", desc: "Sandbox container terminates, and the workspace memory is erased." },
      ]}
      codeExample={{
        label: "Privacy Policy Excerpt",
        code: `GitRabbit Privacy Pledge:
1. Under no circumstances will GitRabbit retain customer code for more than the duration of the review execution.
2. Under no circumstances will customer code be shared, analyzed, or utilized for AI training.
3. Access is restricted exclusively to the API tokens and keys configured by your workspace administrators.`,
      }}
      proTips={[
        "Set 'sast.enable_linters: false' in your config file if you only want semantic analyses without static scanner operations.",
        "Check our Trust Center website (trust.gitrabbit.com) for real-time security updates.",
      ]}
      prevPage={{ href: "/docs/security", label: "Enterprise Security" }}
      nextPage={{ href: "/docs/github", label: "GitHub Node" }}
    />
  );
}
