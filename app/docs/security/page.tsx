"use client";

import { DocPage } from "@/components/DocPage";
import { Lock, ShieldAlert, Cpu, Eye } from "lucide-react";

export default function EnterpriseSecurityPage() {
  return (
    <DocPage
      breadcrumb="Security_&_Compliance / Enterprise_Security"
      badge="ENTERPRISE QUALITY"
      badgeColor="#F87171"
      title="ENTERPRISE-GRADE SECURITY"
      subtitle="Complete data isolation and encryption built for high-scale organizations."
      description={`GitRabbit is designed with security as a primary foundation. We utilize volatile, isolated execution nodes to process code reviews, meaning your source files are never saved, stored, or processed on persistent external disks. We support advanced network structures, Single Sign-On (SSO), and local infrastructure execution.`}
      features={[
        { icon: Lock, title: "End-to-End Encryption", desc: "Data is encrypted in transit and in volatile memory using TLS 1.3 and AES-GCM-256." },
        { icon: ShieldAlert, title: "SSO & IAM Sync", desc: "Enforce identity controls via Okta, Ping Identity, Active Directory, or Google Workspace." },
        { icon: Cpu, title: "Ephemeral Review Nodes", desc: "Workspaces run in secure, isolated sandbox containers that terminate immediately post-review." },
        { icon: Eye, title: "Audit Logging", desc: "Monitors administrative actions, settings edits, and model switches for complete transparency." },
      ]}
      steps={[
        { step: "Step 01", title: "Enforce SSO Policy", desc: "Navigate to the Security settings in the enterprise console and configure SAML authentication." },
        { step: "Step 02", title: "Configure Audit Rules", desc: "Integrate Audit Logs with your security monitoring tool (SIEM) like Splunk or Datadog." },
        { step: "Step 03", title: "IP Whitelisting", desc: "Whitelist GitRabbit IP ranges inside your corporate firewall or set up virtual VPC connections." },
      ]}
      codeExample={{
        label: "Typical Security Standards Compliance Profile",
        code: `Compliance Standards Met:
- SOC 2 Type II Certified
- ISO/IEC 27001 Certified
- GDPR Compliant (Zero persistent European data storage)
- HIPAA Ready (Advanced BAA support available)

Data Policy:
- Ephemeral containers destroyed automatically after a maximum of 300 seconds.
- Storage duration: 0 seconds (zero persistence).`,
      }}
      proTips={[
        "Enterprise agreements include access to isolated tenant environments with dedicated resources.",
        "Sign up for our security mailing list to receive compliance and vulnerability reports.",
      ]}
      prevPage={{ href: "/docs/checks", label: "Custom Checks" }}
      nextPage={{ href: "/docs/privacy", label: "Privacy Vault" }}
    />
  );
}
