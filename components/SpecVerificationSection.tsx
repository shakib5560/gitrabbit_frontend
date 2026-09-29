"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCheck,
  ShieldAlert,
  Cpu,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCw,
  Terminal,
  Layers,
  FileCode,
  AlertTriangle,
  Database,
  GitPullRequest,
  Check,
  Bot,
  Zap,
  ExternalLink,
  ChevronRight,
  Play,
  Lock,
  Search,
  MessageSquareCode,
  Sliders,
} from "lucide-react";
import Link from "next/link";

interface RequirementItem {
  id: string;
  title: string;
  description: string;
  passed: boolean;
  targetLine?: number;
  location?: string;
  auditNote: string;
  specTag: string;
}

interface Scenario {
  id: string;
  title: string;
  agentName: string;
  agentModel: string;
  agentAvatarColor: string;
  ticketId: string;
  ticketPriority: "P0 Blocker" | "P1 High" | "P2 Medium";
  ticketSource: "Jira Enterprise" | "Linear" | "Client PRD";
  complianceScore: number;
  status: "warning" | "error" | "verified";
  statusText: string;
  userStory: string;
  requirements: RequirementItem[];
  projectContext: {
    label: string;
    value: string;
    icon: "database" | "shield" | "cpu";
  }[];
  codeFile: string;
  branch: string;
  prNumber: number;
  codeLines: {
    num: number;
    type?: "add" | "del" | "highlight" | "normal";
    content: string;
    requirementId?: string;
    callout?: {
      type: "error" | "warning" | "success";
      title: string;
      message: string;
    };
  }[];
  botFeedback: {
    summary: string;
    promptToAgent: string;
    primaryAction: string;
    secondaryAction: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "stripe-idempotency",
    title: "Stripe Webhook Idempotency",
    agentName: "Devin AI",
    agentModel: "Cognition Autonomous Runner v2.1",
    agentAvatarColor: "#3B82F6",
    ticketId: "PAY-1082",
    ticketPriority: "P0 Blocker",
    ticketSource: "Jira Enterprise",
    complianceScore: 68,
    status: "warning",
    statusText: "SPEC GAP DETECTED",
    userStory:
      "When Stripe delivers invoice.payment_succeeded, ensure atomic idempotency using Redis key with 24h TTL. Discard replay attempts and respond with HTTP 409.",
    requirements: [
      {
        id: "AC-01",
        title: "Verify Stripe Cryptographic HMAC",
        description: "Validate stripe-signature against process.env.STRIPE_WEBHOOK_SECRET before parsing body payload.",
        passed: true,
        targetLine: 13,
        location: "stripe.ts:L13",
        auditNote: "Cryptographic HMAC check present and verified",
        specTag: "CRYPTO_AUTH",
      },
      {
        id: "AC-02",
        title: "Atomic Redis Idempotency Lock",
        description: "Acquire atomic Redis SET NX with 86,400s TTL key 'idem:stripe:{id}' to block concurrent duplicate executions.",
        passed: false,
        targetLine: 15,
        location: "Omitted by Agent",
        auditNote: "Devin skipped Redis lock lookup; directly modified DB",
        specTag: "IDEMPOTENCY_LOCK",
      },
      {
        id: "AC-03",
        title: "409 Conflict Response on Replay",
        description: "If lock key exists, return HTTP 409 Conflict with structured JSON error payload.",
        passed: false,
        targetLine: 18,
        location: "Omitted by Agent",
        auditNote: "Hardcoded 200 OK returned on all execution paths",
        specTag: "HTTP_STATUS_409",
      },
      {
        id: "AC-04",
        title: "Enqueue Invoice Notification",
        description: "Push verified invoice object to customer notification worker queue.",
        passed: true,
        targetLine: 17,
        location: "stripe.ts:L17",
        auditNote: "Producer job payload structure matches BullMQ schema",
        specTag: "WORKER_QUEUE",
      },
    ],
    projectContext: [
      { label: "Redis Cluster", value: "@redis/client namespace isolation enabled in @/lib/redis", icon: "database" },
      { label: "Security Policy", value: "Strict 24h (86,400s) replay tolerance per SEC-SPEC-401", icon: "shield" },
      { label: "ORM Mapping", value: "Prisma payments table requires optimistic concurrency lock", icon: "cpu" },
    ],
    codeFile: "src/api/webhooks/stripe.ts",
    branch: "devin/feat-stripe-webhooks",
    prNumber: 342,
    codeLines: [
      { num: 11, type: "normal", content: "export async function handleWebhook(req: Request, res: Response) {" },
      { num: 12, type: "normal", content: "  const sig = req.headers['stripe-signature'];" },
      { num: 13, type: "highlight", content: "  const event = stripe.webhooks.constructEvent(rawBody, sig, secret);", requirementId: "AC-01" },
      { num: 14, type: "normal", content: "" },
      {
        num: 15,
        type: "del",
        content: "- // [SPEC GAP]: AI Agent omitted Redis idempotency check specified in PAY-1082",
        requirementId: "AC-02",
        callout: {
          type: "warning",
          title: "SPEC GAP: PAY-1082 AC-02 VIOLATED",
          message: "Devin AI omitted 24h Redis idempotency check. Concurrent webhook retries will cause duplicate payment updates.",
        },
      },
      { num: 16, type: "add", content: "+ await db.payments.updateStatus(event.data.id, 'PAID');", requirementId: "AC-02" },
      { num: 17, type: "highlight", content: "  await notificationQueue.push(event.data.object);", requirementId: "AC-04" },
      {
        num: 18,
        type: "add",
        content: "+ return res.status(200).json({ received: true });",
        requirementId: "AC-03",
        callout: {
          type: "error",
          title: "SPEC GAP: PAY-1082 AC-03 VIOLATED",
          message: "Returning HTTP 200 on duplicates instead of HTTP 409 Conflict required by billing integration spec.",
        },
      },
      { num: 19, type: "normal", content: "}" },
    ],
    botFeedback: {
      summary:
        "AI Agent successfully implemented signature validation & queue publishing, but omitted 2 out of 4 client acceptance criteria: 24h Redis idempotency check (AC-02) and 409 replay conflict response (AC-03).",
      promptToAgent:
        "gitrabbit bot: PAY-1082 spec verification failed. Please import getRedisClient() from '@/lib/redis' and guard execution with 'SET idem:stripe:{event.id} locked NX EX 86400'. Return 409 on failure.",
      primaryAction: "Re-prompt Devin with Spec Fix",
      secondaryAction: "Generate Committable Patch",
    },
  },
  {
    id: "rbac-tenancy",
    title: "Multi-Tenant RBAC Boundary",
    agentName: "Claude 3.7 Sonnet",
    agentModel: "SWE-Agent Autonomous Runner",
    agentAvatarColor: "#D97706",
    ticketId: "SEC-419",
    ticketPriority: "P0 Blocker",
    ticketSource: "Client PRD",
    complianceScore: 50,
    status: "error",
    statusText: "CRITICAL SPEC BREACH",
    userStory:
      "All tenant mutations must resolve tenant_id strictly from verified JWT session claims. Never accept client-supplied tenant_id in URL params or POST request body.",
    requirements: [
      {
        id: "AC-01",
        title: "Session JWT Claims Resolution",
        description: "Extract tenantId strictly from req.session.user.tenantId populated by verified auth middleware.",
        passed: false,
        targetLine: 21,
        location: "members.ts:L21",
        auditNote: "Agent parsed tenantId from req.body instead of authenticated claims",
        specTag: "JWT_CLAIMS_ONLY",
      },
      {
        id: "AC-02",
        title: "Forbid Body/Param Tenant Overrides",
        description: "Explicitly strip or reject any tenant_id present in the incoming client payload.",
        passed: false,
        targetLine: 22,
        location: "members.ts:L22",
        auditNote: "Accepted raw body input, exposing cross-tenant privilege escalation",
        specTag: "ZERO_TRUST_PARAMS",
      },
      {
        id: "AC-03",
        title: "Enforce Org Admin Role Gate",
        description: "Verify actor role contains 'ORG_ADMIN' or 'OWNER' permission before executing member invitation.",
        passed: true,
        targetLine: 24,
        location: "members.ts:L24",
        auditNote: "verifyRole('ORG_ADMIN') check properly executed",
        specTag: "RBAC_ROLE_CHECK",
      },
      {
        id: "AC-04",
        title: "Audit Log Tenant Mutation",
        description: "Record security audit event in audit_logs table with actor ID and target tenant.",
        passed: true,
        targetLine: 26,
        location: "members.ts:L26",
        auditNote: "Audit logger dispatched with trace ID",
        specTag: "AUDIT_COMPLIANCE",
      },
    ],
    projectContext: [
      { label: "PostgreSQL RLS", value: "Row-Level Security policy checks current_setting('app.tenant_id')", icon: "database" },
      { label: "Compliance Mandate", value: "SOC2 Type II requires zero trust parameter boundaries", icon: "shield" },
      { label: "Session Middleware", value: "JWT token verified in @/middleware/auth.ts with Ed25519 signature", icon: "cpu" },
    ],
    codeFile: "src/controllers/organization/members.ts",
    branch: "claude/sec-419-tenant-isolation",
    prNumber: 512,
    codeLines: [
      { num: 20, type: "normal", content: "export async function addMember(req: AuthenticatedRequest, res: Response) {" },
      {
        num: 21,
        type: "del",
        content: "- const { orgId, email, role } = req.body; // Insecure client-supplied tenant",
        requirementId: "AC-01",
        callout: {
          type: "error",
          title: "CRITICAL: SPEC & SECURITY BREACH",
          message: "Claude Code accepted orgId directly from req.body. Malicious users can invite themselves into arbitrary organizations!",
        },
      },
      {
        num: 22,
        type: "add",
        content: "+ const tenantId = req.user.tenantId; // Required by GitRabbit Spec Engine",
        requirementId: "AC-01",
      },
      { num: 23, type: "normal", content: "" },
      { num: 24, type: "highlight", content: "  await verifyRole(req.user.id, tenantId, 'ORG_ADMIN');", requirementId: "AC-03" },
      { num: 25, type: "normal", content: "  const member = await inviteMember({ tenantId, email, role });" },
      { num: 26, type: "highlight", content: "  await logSecurityEvent('MEMBER_INVITED', { actor: req.user.id, tenantId });", requirementId: "AC-04" },
      { num: 27, type: "normal", content: "  return res.json({ success: true, member });" },
      { num: 28, type: "normal", content: "}" },
    ],
    botFeedback: {
      summary:
        "CRITICAL SPEC VIOLATION: Agent trusted req.body.orgId instead of authenticated JWT session claims (AC-01, AC-02). GitRabbit blocked PR merge to protect tenant boundary.",
      promptToAgent:
        "gitrabbit bot: REJECTED merge on SEC-419. Never trust req.body for tenant resolution. You must read req.user.tenantId from verified session context.",
      primaryAction: "Block PR & Reprompt Agent",
      secondaryAction: "Sanitize & Apply Patch",
    },
  },
  {
    id: "kafka-telemetry",
    title: "Kafka Telemetry & DLQ Routing",
    agentName: "Cursor Composer",
    agentModel: "Cursor Agent v0.45",
    agentAvatarColor: "#10B981",
    ticketId: "DATA-290",
    ticketPriority: "P1 High",
    ticketSource: "Linear",
    complianceScore: 100,
    status: "verified",
    statusText: "100% SPEC VERIFIED",
    userStory:
      "Telemetry consumer must implement exponential backoff (max 3 retries). Poison pill messages must route to 'telemetry.events.dlq' with full error stack before committing offsets.",
    requirements: [
      {
        id: "AC-01",
        title: "At-Least-Once Consumer Semantics",
        description: "Manual offset commit after message processing or successful DLQ dead-letter forwarding.",
        passed: true,
        targetLine: 44,
        location: "consumer.ts:L44",
        auditNote: "Manual commitOffsets verified",
        specTag: "KAFKA_MANUAL_COMMIT",
      },
      {
        id: "AC-02",
        title: "Max 3 Exponential Retries",
        description: "Retry transient failures up to MAX_RETRIES (3) with exponential backoff & full jitter.",
        passed: true,
        targetLine: 46,
        location: "consumer.ts:L46",
        auditNote: "Backoff multiplier & attempts boundary verified",
        specTag: "EXPONENTIAL_RETRY",
      },
      {
        id: "AC-03",
        title: "Poison Pill Routing to DLQ Topic",
        description: "On retry exhaustion, publish event to 'telemetry.events.dlq' with error stack and timestamp.",
        passed: true,
        targetLine: 48,
        location: "consumer.ts:L48",
        auditNote: "DLQ topic naming & error packaging match spec exactly",
        specTag: "DEAD_LETTER_QUEUE",
      },
      {
        id: "AC-04",
        title: "Header & Partition Key Preservation",
        description: "Retain original Kafka message headers, partition key, and trace_id in dead-letter event.",
        passed: true,
        targetLine: 50,
        location: "consumer.ts:L50",
        auditNote: "Headers & trace context propagated faithfully",
        specTag: "TRACE_PROPAGATION",
      },
    ],
    projectContext: [
      { label: "Schema Registry", value: "Confluent AVRO schema registry with backward compatibility check", icon: "database" },
      { label: "Kafka Broker", value: "Cluster configured with min.insync.replicas=2 for telemetry topic", icon: "cpu" },
      { label: "Prometheus Metrics", value: "Metric 'telemetry_consumer_dlq_count' registered in @/lib/metrics", icon: "shield" },
    ],
    codeFile: "src/workers/telemetry/consumer.ts",
    branch: "cursor/telemetry-dlq-pipeline",
    prNumber: 189,
    codeLines: [
      { num: 43, type: "normal", content: "  } catch (err) {" },
      { num: 44, type: "highlight", content: "    attempts++;", requirementId: "AC-02" },
      { num: 45, type: "normal", content: "    if (attempts >= MAX_RETRIES) {" },
      {
        num: 46,
        type: "add",
        content: "+     await sendToDeadLetterQueue({",
        requirementId: "AC-03",
        callout: {
          type: "success",
          title: "SPEC CERTIFIED: DATA-290 FULLY MET",
          message: "All 4 acceptance criteria satisfied. Zero hallucinated schemas. Ready for instant production merge.",
        },
      },
      { num: 47, type: "add", content: "+       topic: 'telemetry.events.dlq',", requirementId: "AC-03" },
      { num: 48, type: "add", content: "+       key: message.key, headers: message.headers, error: err.stack", requirementId: "AC-04" },
      { num: 49, type: "add", content: "+     });", requirementId: "AC-03" },
      { num: 50, type: "highlight", content: "      await consumer.commitOffsets([{ topic, partition, offset }]);", requirementId: "AC-01" },
      { num: 51, type: "normal", content: "    }" },
      { num: 52, type: "normal", content: "  }" },
    ],
    botFeedback: {
      summary:
        "PERFECT SPEC ALIGNMENT: 4 of 4 acceptance criteria verified against client specs and Kafka infrastructure. Code adheres strictly to technical specifications.",
      promptToAgent:
        "gitrabbit bot: Verified clean alignment with DATA-290. All edge cases, DLQ routing, and retry budgets confirmed.",
      primaryAction: "Approve & Grant Merge Clearance",
      secondaryAction: "View Telemetry Audit Log",
    },
  },
];

const PIPELINE_STEPS = [
  {
    step: "01",
    tag: "REQUIREMENTS_PARSER",
    title: "Ingest Client Specs",
    desc: "Parses Jira acceptance criteria, Linear user stories, and client PRD markdown into machine-checkable constraint models.",
  },
  {
    step: "02",
    tag: "CONTEXT_MAPPER",
    title: "Deep Repo Graph",
    desc: "Cross-references your Prisma/Drizzle schemas, auth policies, Redis clusters, and API boundaries—never evaluating code in a vacuum.",
  },
  {
    step: "03",
    tag: "ALIGNMENT_AUDITOR",
    title: "AST-to-Spec Verification",
    desc: "Scans agent-generated AST diffs for omitted edge cases, bypassed security guards, and hallucinated function calls.",
  },
  {
    step: "04",
    tag: "AUTONOMOUS_LOOP",
    title: "Closed-Loop Correction",
    desc: "Generates precise, structured corrective prompts directly to the AI agent or commits instant patches before human review.",
  },
];

export const SpecVerificationSection = () => {
  const [activeScenarioId, setActiveScenarioId] = useState(SCENARIOS[0].id);
  const [selectedRequirementId, setSelectedRequirementId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<"side-by-side" | "diff-only" | "spec-only">("side-by-side");

  const current = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1100);
  };

  const handleSelectReq = (reqId: string) => {
    setSelectedRequirementId((prev) => (prev === reqId ? null : reqId));
  };

  return (
    <section
      id="spec-verification"
      className="relative w-full bg-[#080808] py-24 md:py-32 px-6 md:px-16 overflow-hidden border-t border-b border-gray-900"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-brand-yellow/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Cyberpunk grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 bg-brand-yellow/10 border border-brand-yellow/30 px-3.5 py-1.5 rounded-full mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow"></span>
            </span>
            <span className="text-brand-yellow text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold">
              CR_ALIGNMENT_ENGINE // SPEC_VERIFICATION_V2
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-white text-base sm:text-xl md:text-2xl lg:text-[28px] xl:text-[32px] font-bold font-press-start leading-normal sm:leading-relaxed md:leading-[1.7] mb-6 max-w-3xl mx-auto"
          >
            <span className="block mb-2 sm:mb-3">
              Verify <span className="text-brand-yellow">AI-Agent Code</span>
            </span>
            <span className="block text-gray-200">
              Against Real Specs
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-mono max-w-2xl mx-auto"
          >
            Autonomous coding agents write code fast — but did they follow the client&apos;s PRD? GitRabbit digests
            client requirements, Jira tickets, and deep project context to verify agent-written code matches intended
            specifications before merge.
          </motion.p>
        </div>

        {/* 4-Step Visual Stepper Pipeline Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PIPELINE_STEPS.map((pipe, idx) => (
            <div
              key={idx}
              className="bg-[#0D0D0D] border border-gray-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-brand-yellow/40 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-press-start text-brand-yellow">{pipe.step}</span>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{pipe.tag}</span>
              </div>
              <h4 className="text-white text-xs font-semibold font-mono mb-1 group-hover:text-brand-yellow transition-colors">
                {pipe.title}
              </h4>
              <p className="text-gray-500 text-[11px] leading-relaxed font-mono">{pipe.desc}</p>
            </div>
          ))}
        </div>

        {/* Master Console Container */}
        <div className="bg-[#0C0C0C] border border-gray-800 rounded-2xl md:rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden mb-16">
          {/* Console Header Bar */}
          <div className="bg-[#121212] border-b border-gray-800 px-5 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* Scenario Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 xl:pb-0 scrollbar-none">
              <span className="text-[10px] font-mono uppercase text-gray-500 mr-2 flex items-center gap-1.5 shrink-0">
                <Sliders className="w-3.5 h-3.5 text-brand-yellow" />
                Select Audit Scenario:
              </span>
              {SCENARIOS.map((sc) => {
                const isActive = sc.id === activeScenarioId;
                return (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setActiveScenarioId(sc.id);
                      setSelectedRequirementId(null);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap flex items-center gap-2.5 cursor-pointer border ${
                      isActive
                        ? "bg-brand-yellow/15 border-brand-yellow text-brand-yellow font-bold shadow-[0_0_20px_rgba(245,197,24,0.2)]"
                        : "bg-[#181818] border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sc.agentAvatarColor }} />
                    <span className="font-semibold">{sc.ticketId}</span>
                    <span className="text-gray-500">({sc.agentName})</span>
                    {sc.status === "verified" ? (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                        VERIFIED
                      </span>
                    ) : sc.status === "warning" ? (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                        SPEC GAP
                      </span>
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 font-mono">
                        BREACH
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Run Live Verification Scan Button */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleRunScan}
                disabled={isScanning}
                className="bg-brand-yellow text-brand-black text-[9px] md:text-[10px] font-press-start uppercase px-4 py-2.5 flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[3px_3px_0px_#FFFFFF] disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
                {isScanning ? "Scanning Spec AST..." : "Run Spec Verification"}
              </button>
            </div>
          </div>

          {/* Subheader: Active Agent & Spec Compliance Meter */}
          <div className="bg-[#0F0F0F] border-b border-gray-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border font-press-start text-[11px] text-black font-bold shadow-md"
                style={{ backgroundColor: current.agentAvatarColor, borderColor: current.agentAvatarColor }}
              >
                AI
              </div>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-gray-400">
                  <span>Author:</span>
                  <span className="text-white font-bold">{current.agentName}</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-500">{current.agentModel}</span>
                </div>
                <div className="text-white text-xs font-semibold font-mono flex items-center gap-2 mt-0.5">
                  <span className="text-brand-yellow">Target: #{current.ticketId}</span>
                  <span className="text-gray-600">•</span>
                  <span>{current.title}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-[10px] text-gray-500">{current.ticketSource}</span>
                </div>
              </div>
            </div>

            {/* Alignment Score Meter */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase text-gray-500">Spec Alignment Score</div>
                <div className="text-sm md:text-base font-bold font-mono flex items-center justify-end gap-1.5">
                  <span
                    className={
                      current.complianceScore >= 90
                        ? "text-emerald-400"
                        : current.complianceScore >= 60
                        ? "text-brand-yellow"
                        : "text-red-400"
                    }
                  >
                    {current.complianceScore}%
                  </span>
                  <span className="text-xs text-gray-500">/ 100%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-24 h-3 bg-gray-900 border border-gray-800 rounded-full overflow-hidden p-0.5 hidden sm:block">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    current.complianceScore >= 90
                      ? "bg-emerald-400"
                      : current.complianceScore >= 60
                      ? "bg-brand-yellow"
                      : "bg-red-400"
                  }`}
                  style={{ width: `${current.complianceScore}%` }}
                />
              </div>

              {/* Status Pill */}
              <div
                className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  current.status === "verified"
                    ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-400"
                    : current.status === "warning"
                    ? "bg-amber-950/40 border-amber-500/50 text-amber-300"
                    : "bg-red-950/40 border-red-500/50 text-red-400"
                }`}
              >
                {current.status === "verified" ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5" />
                )}
                {current.statusText}
              </div>
            </div>
          </div>

          {/* Dual Engine Side-by-Side Command Center */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* LEFT ENGINE PANEL: Client Specs & Project Context (5 cols) */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-gray-800 p-6 bg-[#0D0D0D] flex flex-col justify-between">
              <div>
                {/* Panel Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-brand-yellow" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Client Requirement Specs
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-400">
                      {current.ticketPriority}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      {current.requirements.filter((r) => r.passed).length}/{current.requirements.length} Passed
                    </span>
                  </div>
                </div>

                {/* Client User Story Quote */}
                <div className="bg-[#141414] border border-gray-800 rounded-xl p-3.5 mb-5">
                  <div className="text-[9px] font-mono text-brand-yellow uppercase tracking-widest mb-1 flex items-center gap-1.5">
                    <MessageSquareCode className="w-3 h-3" />
                    Client Requirement Brief:
                  </div>
                  <p className="text-xs font-mono text-gray-300 leading-relaxed italic">
                    &ldquo;{current.userStory}&rdquo;
                  </p>
                </div>

                {/* Interactive Acceptance Criteria (Click to Highlight in Code) */}
                <div className="mb-6">
                  <div className="text-[10px] font-mono uppercase text-gray-500 mb-3 flex items-center justify-between">
                    <span>Acceptance Criteria Checklist</span>
                    <span className="text-[9px] text-brand-yellow">(Click to trace in diff)</span>
                  </div>

                  <div className="space-y-2.5">
                    {current.requirements.map((req) => {
                      const isSelected = selectedRequirementId === req.id;
                      return (
                        <div
                          key={req.id}
                          onClick={() => handleSelectReq(req.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "ring-2 ring-brand-yellow bg-brand-yellow/10 border-brand-yellow shadow-lg"
                              : req.passed
                              ? "bg-emerald-950/15 border-emerald-900/40 hover:border-emerald-700/60"
                              : "bg-red-950/15 border-red-900/40 hover:border-red-700/60"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                req.passed ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {req.passed ? (
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              ) : (
                                <XCircle className="w-2.5 h-2.5 stroke-[3]" />
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                                <span className="text-brand-yellow font-bold">{req.id}</span>
                                <span
                                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                                    req.passed
                                      ? "bg-emerald-900/40 text-emerald-300 border border-emerald-800/40"
                                      : "bg-red-900/40 text-red-300 border border-red-800/40"
                                  }`}
                                >
                                  {req.location}
                                </span>
                              </div>
                              <h5 className="text-xs font-semibold text-white mb-1 font-mono">{req.title}</h5>
                              <p className="text-[11px] text-gray-400 leading-snug font-mono mb-2">
                                {req.description}
                              </p>

                              <div className="flex items-center justify-between text-[9px] font-mono pt-1.5 border-t border-gray-800/60">
                                <span className="text-gray-500">RULE: {req.specTag}</span>
                                <span className={req.passed ? "text-emerald-400/90 font-semibold" : "text-amber-400/90 font-semibold"}>
                                  {req.auditNote}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ingested Project Context */}
                <div className="pt-4 border-t border-gray-800">
                  <div className="text-[10px] font-mono uppercase text-gray-500 mb-2.5 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-brand-yellow" />
                    Ingested Project Context (Code Graph &amp; Policies)
                  </div>
                  <div className="space-y-2">
                    {current.projectContext.map((ctx, idx) => (
                      <div
                        key={idx}
                        className="bg-[#121212] border border-gray-800 rounded-lg p-2.5 text-xs font-mono flex items-start gap-2"
                      >
                        <span className="text-brand-yellow mt-0.5">•</span>
                        <div>
                          <span className="text-white font-semibold">{ctx.label}: </span>
                          <span className="text-gray-400 text-[11px]">{ctx.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT ENGINE PANEL: AI Agent PR Code Inspector & Inline Bot Audit (7 cols) */}
            <div className="lg:col-span-7 bg-[#0A0A0A] flex flex-col justify-between">
              <div>
                {/* Code Inspector Header Tab */}
                <div className="bg-[#111111] border-b border-gray-800 px-5 py-3 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    </div>
                    <span className="text-gray-600 font-mono text-xs">|</span>
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-200">
                      <FileCode className="w-3.5 h-3.5 text-brand-yellow" />
                      <span className="font-semibold">{current.codeFile}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                    <GitPullRequest className="w-3 h-3 text-brand-yellow" />
                    <span>PR #{current.prNumber}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-500">{current.branch}</span>
                  </div>
                </div>

                {/* Scanning Beam (when simulation triggered) */}
                <AnimatePresence>
                  {isScanning && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-brand-yellow text-black text-[10px] font-press-start uppercase px-4 py-2 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Scanning AST &amp; Cross-Referencing PRD Rules...
                      </span>
                      <span>100%</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Code Diff Display with Inline Bot Audit Callouts */}
                <div className="p-5 font-mono text-[11px] leading-relaxed overflow-x-auto space-y-1">
                  {current.codeLines.map((line, idx) => {
                    const isTargeted = selectedRequirementId && line.requirementId === selectedRequirementId;
                    return (
                      <div key={idx} className="flex flex-col">
                        <div
                          className={`flex items-center py-1 px-3 rounded transition-all ${
                            isTargeted
                              ? "ring-2 ring-brand-yellow bg-brand-yellow/15 text-white"
                              : line.type === "del"
                              ? "bg-red-950/40 text-red-300 border-l-2 border-red-500"
                              : line.type === "add"
                              ? "bg-green-950/40 text-green-300 border-l-2 border-green-500"
                              : line.type === "highlight"
                              ? "bg-brand-yellow/10 text-brand-yellow border-l-2 border-brand-yellow"
                              : "text-gray-400 hover:bg-white/[0.02]"
                          }`}
                        >
                          <span className="w-7 text-gray-600 text-right pr-3 select-none text-[10px]">{line.num}</span>
                          <span className="flex-1 whitespace-pre">{line.content}</span>
                          {line.requirementId && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 border border-gray-700 text-gray-300">
                              {line.requirementId}
                            </span>
                          )}
                        </div>

                        {/* Inline GitRabbit Callout attached directly to line */}
                        {line.callout && (
                          <div
                            className={`my-2 ml-7 p-3 rounded-xl border text-[11px] font-mono transition-all ${
                              line.callout.type === "error"
                                ? "bg-red-950/50 border-red-600/70 text-red-200"
                                : line.callout.type === "warning"
                                ? "bg-amber-950/50 border-amber-600/70 text-amber-200"
                                : "bg-emerald-950/50 border-emerald-600/70 text-emerald-200"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1 font-bold font-press-start text-[9px]">
                              <Bot className="w-3.5 h-3.5" />
                              <span>{line.callout.title}</span>
                            </div>
                            <p className="text-gray-300 leading-snug">{line.callout.message}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bot Audit Verdict & Action Banner */}
              <div className="border-t border-gray-800 bg-[#0E0E0E] p-5">
                <div className="flex items-center gap-2 mb-2 text-[10px] font-mono uppercase text-brand-yellow font-bold tracking-widest">
                  <Terminal className="w-3.5 h-3.5" />
                  GitRabbit Autonomous Bot Verdict
                </div>

                <div className="bg-black border border-gray-800 rounded-xl p-3.5 mb-4">
                  <div className="text-gray-400 text-xs font-mono leading-relaxed mb-2">
                    {current.botFeedback.summary}
                  </div>
                  <div className="bg-[#121212] p-2.5 rounded-lg border border-brand-yellow/30 text-[11px] font-mono text-brand-yellow/90">
                    <span className="text-gray-500 select-none">&gt; </span>
                    {current.botFeedback.promptToAgent}
                  </div>
                </div>

                {/* Bottom Action Deck */}
                <div className="pt-3 border-t border-gray-800/80 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="text-gray-400">Engine Gate:</span>
                      <span className="text-emerald-400/90 font-semibold">Active &bull; Automated Verification</span>
                    </div>
                    <span className="hidden sm:inline text-[10px] font-mono text-gray-500 tracking-wider">
                      AUTH REQUIRED
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
                    <Link
                      href="/login"
                      className="px-4 py-2.5 rounded-lg border border-gray-800 bg-[#141414]/80 hover:bg-[#1E1E1E] hover:border-gray-700 text-gray-300 hover:text-white text-xs font-mono transition-all text-center whitespace-nowrap"
                    >
                      {current.botFeedback.secondaryAction}
                    </Link>

                    <Link
                      href="/login"
                      title="Sign in required to run autonomous clearance"
                      className={`group px-5 py-2.5 rounded-lg text-xs md:text-sm font-pixelify uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 border backdrop-blur-sm whitespace-nowrap ${
                        current.status === "verified"
                          ? "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.15)] hover:shadow-[0_0_24px_rgba(16,185,129,0.3)]"
                          : "bg-brand-yellow/15 hover:bg-brand-yellow/25 text-brand-yellow border-brand-yellow/40 hover:border-brand-yellow shadow-[0_0_16px_rgba(245,197,24,0.15)] hover:shadow-[0_0_24px_rgba(245,197,24,0.3)]"
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all shrink-0" />
                      <span className="font-bold">{current.botFeedback.primaryAction}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Deep-Dive Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0E0E0E] border border-gray-800 hover:border-brand-yellow/40 rounded-2xl p-6 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center mb-4 text-brand-yellow group-hover:scale-110 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-brand-white text-sm font-semibold font-press-start mb-2 leading-snug">
              PRD &amp; Story Ingestion
            </h3>
            <p className="text-gray-400 text-xs font-mono leading-relaxed">
              Ingests Jira tickets, Linear issues, client PRDs, and user acceptance criteria into machine-checkable verification assertions.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0E0E0E] border border-gray-800 hover:border-blue-500/40 rounded-2xl p-6 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-brand-white text-sm font-semibold font-press-start mb-2 leading-snug">
              Deep Context Mapping
            </h3>
            <p className="text-gray-400 text-xs font-mono leading-relaxed">
              Cross-references the full code graph, ORM schemas, auth policies, and shared utilities so AI agents don&apos;t bypass existing conventions.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0E0E0E] border border-gray-800 hover:border-purple-500/40 rounded-2xl p-6 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-brand-white text-sm font-semibold font-press-start mb-2 leading-snug">
              Agent Drift Shield
            </h3>
            <p className="text-gray-400 text-xs font-mono leading-relaxed">
              Detects when LLM coding agents take shortcuts, hallucinate non-existent API endpoints, or quietly omit complex client edge cases.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0E0E0E] border border-gray-800 hover:border-emerald-500/40 rounded-2xl p-6 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-brand-white text-sm font-semibold font-press-start mb-2 leading-snug">
              Autonomous Re-Prompting
            </h3>
            <p className="text-gray-400 text-xs font-mono leading-relaxed">
              Closes the loop by feeding structured correction prompts back to Devin, Cursor, Claude Code, or providing instant committable Git patches.
            </p>
          </motion.div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-gray-900/80 via-black to-gray-900/80 border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center shrink-0">
              <GitPullRequest className="w-6 h-6 text-brand-yellow" />
            </div>
            <div>
              <h4 className="text-white text-base md:text-lg font-bold font-press-start mb-1">
                Protect your codebase against AI agent drift
              </h4>
              <p className="text-gray-400 text-xs md:text-sm font-mono">
                Connect your GitHub or GitLab repo in 2 minutes. Free for open source &amp; public repositories.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/docs/spec-verification"
              className="px-5 py-3 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-brand-yellow text-xs font-mono uppercase transition-colors"
            >
              Read Docs →
            </Link>
            <Link
              href="/signup"
              className="bg-brand-yellow text-black font-press-start text-[10px] md:text-xs uppercase px-6 py-3.5 hover:brightness-110 transition-all shadow-[3px_3px_0px_#FFFFFF]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
