"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Lock,
  Scale,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SECTIONS = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "services", title: "2. Description of Services" },
  { id: "customer-code", title: "3. Proprietary Rights & Customer Code" },
  { id: "ai-policies", title: "4. AI Model Usage & Zero-Training Pledge" },
  { id: "accounts", title: "5. User Accounts & VCS Authorizations" },
  { id: "acceptable-use", title: "6. Acceptable Use Policy" },
  { id: "fees-billing", title: "7. Fees, Subscriptions & Renewals" },
  { id: "disclaimers", title: "8. AI Review Warranties & Disclaimers" },
  { id: "liability", title: "9. Limitation of Liability" },
  { id: "termination", title: "10. Term & Termination" },
  { id: "governing-law", title: "11. Governing Law & Dispute Resolution" },
  { id: "contact", title: "12. Contact & Legal Notices" },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");

  return (
    <main className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-brand-black flex flex-col">
      <Navbar />

      <section className="relative pt-36 md:pt-44 pb-20 px-6 md:px-16 overflow-hidden border-b border-gray-900 bg-pixel-grid">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-yellow/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 px-3.5 py-1.5 rounded-full mb-6"
          >
            <Scale className="w-3.5 h-3.5 text-brand-yellow" />
            <span className="text-brand-yellow text-[10px] md:text-xs font-mono uppercase tracking-widest font-semibold">
              Legal Documentation // GitRabbit Inc.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold font-press-start leading-tight mb-6"
          >
            Terms of <span className="text-brand-yellow">Service</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-mono max-w-2xl mx-auto leading-relaxed"
          >
            Please read these Terms and Conditions carefully before using GitRabbit. These terms govern your access
            to our AI code review platform, developer tools, and API services.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-yellow" />
              Effective Date: January 1, 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Version 2.4 (Enterprise Aligned)
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area: Sidebar Navigation + Terms Body */}
      <section className="relative py-16 px-6 md:px-16 max-w-7xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
          {/* Sticky Left Navigation Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 bg-[#0D0D0D] border border-gray-800 rounded-2xl p-5 shadow-xl">
              <div className="text-[10px] font-press-start text-brand-yellow uppercase mb-4 tracking-wider">
                Table of Contents
              </div>
              <nav className="flex flex-col space-y-1">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`text-xs font-mono py-2 px-3 rounded-lg transition-colors block ${
                      activeSection === sec.id
                        ? "bg-brand-yellow/15 text-brand-yellow font-bold border-l-2 border-brand-yellow"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <Link
                  href="/privacy"
                  className="flex items-center justify-between text-xs font-mono text-gray-400 hover:text-brand-yellow transition-colors"
                >
                  <span>Privacy Policy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Legal Clauses Body */}
          <div className="space-y-12 text-sm leading-relaxed font-mono text-gray-300">
            {/* Callout: Code Ownership */}
            <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-2xl p-6 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-brand-yellow shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-bold font-press-start text-xs md:text-sm mb-2">
                  Customer Code Ownership &amp; Zero Training Pledge
                </h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  GitRabbit operates an uncompromised Zero Data Retention model. We do not own your code, we do not store
                  your repository source files after a review finishes, and we under no circumstances train public or
                  proprietary generative AI models on your private intellectual property.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <div id="acceptance" className="scroll-mt-32 border-b border-gray-900 pb-8">
              <h2 className="text-lg md:text-xl font-bold font-press-start text-brand-white mb-4 flex items-center gap-3">
                <span className="text-brand-yellow">01.</span> Acceptance of Terms
              </h2>
              <p className="mb-4">
                By creating an account, installing the GitRabbit GitHub/GitLab Application, integrating our CLI or IDE
                extensions, or otherwise accessing or using the services provided by GitRabbit Inc. (&ldquo;GitRabbit&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you (&ldquo;Customer&rdquo;, &ldquo;User&rdquo;,
                or &ldquo;You&rdquo;) agree to be legally bound by these Terms of Service (&ldquo;Agreement&rdquo;).
              </p>
              <p>
                If you are entering into this Agreement on behalf of a company, organization, or other legal entity, you
                represent and warrant that you have the authority to bind such entity to these Terms. If you do not agree
                with all provisions of this Agreement, you must not access or use the Services.
              </p>
            </div>

            {/* Section 2 */}
            <div id="services" className="scroll-mt-32 border-b border-gray-900 pb-8">
              <h2 className="text-lg md:text-xl font-bold font-press-start text-brand-white mb-4 flex items-center gap-3">
                <span className="text-brand-yellow">02.</span> Description of Services
              </h2>
              <p className="mb-4">
                GitRabbit provides an automated AI-powered developer review and quality platform that analyzes source code
                pull requests, local staging environments, project contexts, and issue specifications to provide
                syntactic, semantic, architectural, and security recommendations (&ldquo;Services&rdquo;).
              </p>
              <p className="mb-4">The Services include, without limitation:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4 mb-4">
                <li>Automated line-by-line pull request reviews and summaries on GitHub, GitLab, and Bitbucket.</li>
                <li>Full-repo Code Graph dependency parsing and architectural impact assessments.</li>
                <li>Pre-commit and local diff inspections via the GitRabbit CLI and IDE extensions.</li>
                <li>Client requirement and specification verification for human and AI-agent generated code.</li>
                <li>One-click automated fix proposals and continuous learning configuration profiles.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="customer-code" className="scroll-mt-32 border-b border-gray-900 pb-8">
              <h2 className="text-lg md:text-xl font-bold font-press-start text-brand-white mb-4 flex items-center gap-3">
                <span className="text-brand-yellow">03.</span> Proprietary Rights &amp; Customer Code
              </h2>
              <p className="mb-4">
                <strong className="text-white">Your Code Belongs Exclusively to You:</strong> As between GitRabbit and
                Customer, Customer retains all right, title, and interest (including all patent, copyright, trade secret,
                and other intellectual property rights) in and to all code repositories, pull requests, files, and data
                transmitted to or through the Services (&ldquo;Customer Data&rdquo;).
              </p>
              <p className="mb-4">
                <strong className="text-white">Limited Processing License:</strong> You grant GitRabbit a non-exclusive,
                worldwide, royalty-free license solely to access, analyze, and process your Customer Data for the transient
                duration strictly required to generate code review suggestions, security evaluations, and summaries.
              </p>
            </div>

            {/* Section 4 */}
            <div id="ai-policies" className="scroll-mt-32 border-b border-gray-900 pb-8">
              <h2 className="text-lg md:text-xl font-bold font-press-start text-brand-white mb-4 flex items-center gap-3">
                <span className="text-brand-yellow">04.</span> AI Model Usage &amp; Zero-Training Pledge
              </h2>
              <p className="mb-4">
                GitRabbit incorporates large language model inferences to evaluate code diffs. We maintain strict enterprise
                agreements with our infrastructure and AI hosting providers ensuring:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4 mb-4">
                <li><strong className="text-white">Zero Model Training:</strong> Neither GitRabbit nor third-party model providers will train any foundation or public models on Customer source code.</li>
                <li><strong className="text-white">Ephemeral Review Runners:</strong> Code snippets are analyzed in volatile memory. Disks are wiped upon completion of the webhook cycle.</li>
                <li><strong className="text-white">Data Isolation:</strong> Customer repositories are processed within dedicated sandboxes with strict network egress controls.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div id="accounts" className="scroll-mt-32 border-b border-gray-900 pb-8">
              <h2 className="text-lg md:text-xl font-bold font-press-start text-brand-white mb-4 flex items-center gap-3">
                <span className="text-brand-yellow">05.</span> User Accounts &amp; VCS Authorizations
              </h2>
              <p className="mb-4">
                To utilize GitRabbit, you must authenticate through an authorized Version Control Provider (e.g., GitHub,
                GitLab, or Bitbucket OAuth) and grant appropriate scoped permissions. You are responsible for safeguarding
                your credentials, managing organizational seat licenses, and all activities that occur under your account.
              </p>
              <p>
                You agree to promptly notify GitRabbit at <span className="text-brand-yellow">security@gitrabbit.com</span> if you
                suspect any unauthorized access to your account or workspace tokens.
              </p>
            </div>

            {/* Section 6 */}
            <div id="acceptable-use" className="scroll-mt-32 border-b border-gray-900 pb-8">
              <h2 className="text-lg md:text-xl font-bold font-press-start text-brand-white mb-4 flex items-center gap-3">
                <span className="text-brand-yellow">06.</span> Acceptable Use Policy
              </h2>
              <p className="mb-4">You agree that you will NOT, and will not permit any third party to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4 mb-4">
                <li>Reverse-engineer, decompile, or extract the underlying algorithms of GitRabbit&apos;s analysis engine.</li>
                <li>Use the Services to develop a competing code review or AI evaluation software product.</li>
                <li>Subject the Services to abusive automated load, denial-of-service, or rate-limit circumvention.</li>
                <li>Submit intentionally malicious payloads, exploits, or malware designed to compromise review runners.</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div id="fees-billing" className="scroll-mt-32 border-b border-gray-900 pb-8">
              <h2 className="text-lg md:text-xl font-bold font-press-start text-brand-white mb-4 flex items-center gap-3">
                <span className="text-brand-yellow">07.</span> Fees, Subscriptions &amp; Renewals
              </h2>
              <p className="mb-4">
                <strong className="text-white">Free &amp; Open Source Tier:</strong> GitRabbit provides free access for all
                public, open-source repositories and introductory developer trials.
              </p>
              <p className="mb-4">
                <strong className="text-white">Paid Plans:</strong> Subscriptions are billed in advance on a monthly or annual
                cadence according to the pricing tier selected on our <Link href="/pricing" className="text-brand-yellow underline">Pricing Page</Link>.
                Subscriptions automatically renew unless canceled prior to the renewal date.
              </p>
              <p>
                All fees are exclusive of applicable taxes. Refunds are issued in accordance with our refund policy or as
                mandated by local consumer protection statutes.
              </p>
            </div>

            {/* Section 8 */}
            <div id="disclaimers" className="scroll-mt-32 border-b border-gray-900 pb-8">
              <h2 className="text-lg md:text-xl font-bold font-press-start text-brand-white mb-4 flex items-center gap-3">
                <span className="text-brand-yellow">08.</span> AI Review Warranties &amp; Disclaimers
              </h2>
              <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl mb-4 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>ADVISORY TOOL NOTICE</span>
                </div>
                GitRabbit review comments, security flags, and code suggestions are advisory computational recommendations.
                AI analysis is probabilistic and may occasionally produce false positives or overlook defects.
              </div>
              <p>
                THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND,
                WHETHER EXPRESS OR IMPLIED. CUSTOMER ACKNOWLEDGES THAT FINAL MERGE APPROVALS AND HUMAN CODE INSPECTION
                REMAIN THE SOLE RESPONSIBILITY OF CUSTOMER&apos;S ENGINEERING TEAM.
              </p>
            </div>

            {/* Section 9 */}
            <div id="liability" className="scroll-mt-32 border-b border-gray-900 pb-8">
              <h2 className="text-lg md:text-xl font-bold font-press-start text-brand-white mb-4 flex items-center gap-3">
                <span className="text-brand-yellow">09.</span> Limitation of Liability
              </h2>
              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL GITRABBIT INC. OR ITS DIRECTORS, EMPLOYEES, OR
                SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS
                OF PROFITS, CODEBASE CORRUPTION, SYSTEM DOWNTIME, OR DATA LOSS.
              </p>
              <p>
                GITRABBIT&apos;S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL NOT EXCEED THE TOTAL
                AMOUNTS PAID BY CUSTOMER TO GITRABBIT IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
              </p>
            </div>

            {/* Section 10 */}
            <div id="termination" className="scroll-mt-32 border-b border-gray-900 pb-8">
              <h2 className="text-lg md:text-xl font-bold font-press-start text-brand-white mb-4 flex items-center gap-3">
                <span className="text-brand-yellow">10.</span> Term &amp; Termination
              </h2>
              <p className="mb-4">
                This Agreement commences upon your first access to the Services and continues until terminated. You may
                terminate at any time by uninstalling the GitRabbit VCS Application and deleting your account through the
                dashboard.
              </p>
              <p>
                GitRabbit may suspend or terminate your access immediately if you violate these Terms or present an active
                security hazard to our platform or other tenants.
              </p>
            </div>

            {/* Section 11 */}
            <div id="governing-law" className="scroll-mt-32 border-b border-gray-900 pb-8">
              <h2 className="text-lg md:text-xl font-bold font-press-start text-brand-white mb-4 flex items-center gap-3">
                <span className="text-brand-yellow">11.</span> Governing Law &amp; Dispute Resolution
              </h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United
                States, without regard to its conflict of law principles.
              </p>
              <p>
                Any dispute, controversy, or claim arising out of this Agreement shall be resolved through confidential,
                binding arbitration administered by the American Arbitration Association (AAA).
              </p>
            </div>

            {/* Section 12 */}
            <div id="contact" className="scroll-mt-32 pb-8">
              <h2 className="text-lg md:text-xl font-bold font-press-start text-brand-white mb-4 flex items-center gap-3">
                <span className="text-brand-yellow">12.</span> Contact &amp; Legal Notices
              </h2>
              <p className="mb-4">
                If you have questions, notices, or data processing agreement (DPA) requests regarding these Terms, please
                reach out to our legal department:
              </p>
              <div className="bg-[#121212] border border-gray-800 rounded-xl p-5 text-xs font-mono space-y-2">
                <div className="text-white font-bold">GitRabbit Inc. — Legal &amp; Compliance Operations</div>
                <div className="text-gray-400">Email: <a href="mailto:legal@gitrabbit.com" className="text-brand-yellow hover:underline">legal@gitrabbit.com</a></div>
                <div className="text-gray-400">Support Desk: <Link href="/contact" className="text-brand-yellow hover:underline">gitrabbit.com/contact</Link></div>
                <div className="text-gray-400">Security Inquiries: <a href="mailto:security@gitrabbit.com" className="text-brand-yellow hover:underline">security@gitrabbit.com</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
