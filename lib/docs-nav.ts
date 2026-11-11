import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Zap,
  Terminal,
  Cpu,
  Eye,
  Brain,
  Bug,
  MessageSquare,
  FileCheck,
  Database,
  Code,
  Users,
  BarChart3,
  Workflow,
  GitMerge,
  FileText,
  FlaskConical,
  BookOpen,
  GitPullRequest,
  Shield,
  Settings,
  Lock,
  Puzzle,
  Activity,
  Layers,
} from "lucide-react";
import { Slack } from "@/components/Icons";

export interface DocNavItem {
  name: string;
  href: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  description: string;
  keywords?: string[];
  badge?: string;
  children?: DocNavItem[];
}

export interface DocNavGroup {
  title: string;
  defaultOpen?: boolean;
  items: DocNavItem[];
}

export interface DocDomainTab {
  id: string;
  label: string;
  defaultHref: string;
  groups: DocNavGroup[];
}

export const DOC_TABS: DocDomainTab[] = [
  {
    id: "get-started",
    label: "Get Started",
    defaultHref: "/docs",
    groups: [
      {
        title: "Overview",
        defaultOpen: true,
        items: [
          {
            name: "Introduction",
            href: "/docs",
            icon: Globe,
            description: "Architecture overview, core pipeline, and platform capabilities.",
            keywords: ["overview", "intro", "home", "architecture"],
          },
          {
            name: "Quickstart",
            href: "/docs/quickstart",
            icon: Zap,
            description: "Connect a repository and receive your first automated PR review in under 5 minutes.",
            keywords: ["quickstart", "start", "setup", "first review"],
            badge: "5 min",
          },
          {
            name: "Installation",
            href: "/docs/installation",
            icon: Terminal,
            description: "Install GitRabbit on GitHub, GitLab, Bitbucket, or self-hosted runners.",
            keywords: ["install", "github app", "gitlab", "bitbucket", "docker", "runner"],
            children: [
              {
                name: "GitHub App",
                href: "/docs/github",
                icon: Puzzle,
                description: "Fine-grained permissions, organization sync, and Marketplace setup.",
                keywords: ["github", "app", "marketplace"],
              },
              {
                name: "GitLab Integration",
                href: "/docs/gitlab",
                icon: Puzzle,
                description: "Merge request webhooks and project access token configuration.",
                keywords: ["gitlab", "merge request", "webhook"],
              },
              {
                name: "Bitbucket Integration",
                href: "/docs/bitbucket",
                icon: Puzzle,
                description: "Bitbucket Cloud and Server integration via app passwords.",
                keywords: ["bitbucket", "cloud", "server"],
              },
            ],
          },
          {
            name: "Configuration",
            href: "/docs/config",
            icon: Cpu,
            description: "Customize review behavior, exclusions, and rules via .gitrabbit.yml.",
            keywords: ["config", "yaml", ".gitrabbit.yml", "exclude", "settings"],
          },
        ],
      },
      {
        title: "Core Features",
        defaultOpen: true,
        items: [
          {
            name: "Automated PR Reviews",
            href: "/docs/reviews",
            icon: Eye,
            description: "Line-by-line context-aware pull request analysis.",
            keywords: ["reviews", "pr", "pull request"],
          },
          {
            name: "Spec Verification",
            href: "/docs/spec-verification",
            icon: FileCheck,
            description: "Audit AI-agent and developer PRs against Jira, Linear, and PRDs.",
            keywords: ["spec", "verification", "requirements", "ai agent"],
            badge: "v2",
          },
          {
            name: "Code Graph Analysis",
            href: "/docs/code-graph",
            icon: Database,
            description: "Repository-wide call graph and cross-file dependency impact mapping.",
            keywords: ["code graph", "ast", "dependencies"],
          },
          {
            name: "GitRabbit Plan",
            href: "/docs/plan",
            icon: FileText,
            description: "Turn Jira and Linear issues into structured implementation blueprints.",
            keywords: ["plan", "blueprint", "jira", "linear"],
          },
        ],
      },
    ],
  },
  {
    id: "reviews",
    label: "PR Reviews & AI",
    defaultHref: "/docs/reviews",
    groups: [
      {
        title: "Pull Request Pipeline",
        defaultOpen: true,
        items: [
          {
            name: "Automated Reviews",
            href: "/docs/reviews",
            icon: Eye,
            description: "Incremental diff reviews, severity classification, and merge readiness.",
            keywords: ["automated", "pr", "review", "diff"],
          },
          {
            name: "AI Summaries & Walkthroughs",
            href: "/docs/summaries",
            icon: Brain,
            description: "High-level PR summaries, sequence diagrams, and file-by-file change tables.",
            keywords: ["summary", "walkthrough", "diagram"],
          },
          {
            name: "One-Click Fixes",
            href: "/docs/fixes",
            icon: Zap,
            description: "Committable patch suggestions applied directly inside your Git provider.",
            keywords: ["fixes", "suggestions", "patch", "commit"],
          },
          {
            name: "Bug & Hallucination Detection",
            href: "/docs/bug-detection",
            icon: Bug,
            description: "Catch race conditions, null dereferences, logic errors, and AI hallucinations.",
            keywords: ["bug", "hallucination", "race condition", "slop"],
          },
          {
            name: "Agentic Chat",
            href: "/docs/agentic-chat",
            icon: MessageSquare,
            description: "Threaded @gitrabbit conversations to refine fixes or explain architectural tradeoffs.",
            keywords: ["chat", "comments", "reply", "@gitrabbit"],
          },
        ],
      },
      {
        title: "Codebase Intelligence",
        defaultOpen: true,
        items: [
          {
            name: "Spec & Context Verification",
            href: "/docs/spec-verification",
            icon: FileCheck,
            description: "Verify code generated by Devin, Claude Code, Cursor, or engineers against real specs.",
            keywords: ["spec", "verification", "prd", "jira", "linear", "drift"],
            badge: "v2",
          },
          {
            name: "Code Graph Analysis",
            href: "/docs/code-graph",
            icon: Database,
            description: "Cross-module dependency tracing beyond isolated diff hunks.",
            keywords: ["graph", "ast", "impact", "cross-file"],
          },
          {
            name: "Team Learnings",
            href: "/docs/team-learnings",
            icon: Brain,
            description: "Persistent organizational memory captured from PR feedback and YAML rules.",
            keywords: ["learnings", "memory", "feedback", "style"],
          },
          {
            name: "Language Support",
            href: "/docs/languages",
            icon: Code,
            description: "Deep AST parsing across TypeScript, Python, Go, Rust, Java, C#, Ruby, and PHP.",
            keywords: ["languages", "typescript", "python", "go", "rust", "java"],
          },
        ],
      },
    ],
  },
  {
    id: "workflow",
    label: "Plan, CLI & IDE",
    defaultHref: "/docs/plan",
    groups: [
      {
        title: "Pre-Merge Automation",
        defaultOpen: true,
        items: [
          {
            name: "GitRabbit Plan",
            href: "/docs/plan",
            icon: FileText,
            description: "Generate editable technical blueprints from issue trackers before coding begins.",
            keywords: ["plan", "blueprint", "tasks", "upstream"],
          },
          {
            name: "Unit Test Generation",
            href: "/docs/test-gen",
            icon: FlaskConical,
            description: "Auto-generate edge-case tests matching Jest, Vitest, Pytest, or Go test conventions.",
            keywords: ["tests", "unit test", "coverage", "jest", "pytest"],
          },
          {
            name: "Docstring Generation",
            href: "/docs/docstrings",
            icon: BookOpen,
            description: "Generate and standardize JSDoc, Google-style Python, and Go docstrings.",
            keywords: ["docstring", "jsdoc", "documentation"],
          },
          {
            name: "Merge Conflict Resolution",
            href: "/docs/merge-conflicts",
            icon: GitPullRequest,
            description: "Context-aware conflict resolution suggestions before finalizing merges.",
            keywords: ["merge", "conflict", "rebase"],
          },
        ],
      },
      {
        title: "Developer Workflow",
        defaultOpen: true,
        items: [
          {
            name: "IDE Integration",
            href: "/docs/ide",
            icon: Code,
            description: "Real-time inline reviews inside VS Code, Cursor, and Windsurf.",
            keywords: ["ide", "vscode", "cursor", "windsurf", "extension"],
          },
          {
            name: "Pre-Commit CLI",
            href: "/docs/cli",
            icon: Terminal,
            description: "Review staged and unstaged local diffs from the terminal before committing.",
            keywords: ["cli", "terminal", "pre-commit", "husky"],
          },
          {
            name: "CI/CD Pipelines",
            href: "/docs/cicd",
            icon: GitMerge,
            description: "Integrate GitRabbit gates with GitHub Actions, GitLab CI, and CircleCI.",
            keywords: ["cicd", "actions", "pipeline", "ci"],
          },
          {
            name: "Slack Agent",
            href: "/docs/slack-agent",
            icon: Slack,
            description: "Two-way PR thread sync, review alerts, and incident triage in Slack.",
            keywords: ["slack", "notifications", "pullflow", "triage"],
          },
        ],
      },
    ],
  },
  {
    id: "security",
    label: "Governance & Security",
    defaultHref: "/docs/sast",
    groups: [
      {
        title: "Team Governance",
        defaultOpen: true,
        items: [
          {
            name: "Team Rules",
            href: "/docs/team-rules",
            icon: Users,
            description: "Enforce organization-wide conventions across every repository.",
            keywords: ["team", "rules", "standards", "org"],
          },
          {
            name: "Custom Workflows",
            href: "/docs/workflows",
            icon: Workflow,
            description: "Automate review routing, reviewer assignment, and escalation policies.",
            keywords: ["workflows", "routing", "automation"],
          },
          {
            name: "Custom Checks",
            href: "/docs/checks",
            icon: Settings,
            description: "Mandatory pre-merge compliance gates for regulated codebases.",
            keywords: ["checks", "gates", "compliance"],
          },
          {
            name: "Review Analytics",
            href: "/docs/analytics",
            icon: BarChart3,
            description: "Track review turnaround, defect density, and engineering velocity.",
            keywords: ["analytics", "metrics", "dashboard", "velocity"],
          },
        ],
      },
      {
        title: "Security & Privacy",
        defaultOpen: true,
        items: [
          {
            name: "SAST & Linters",
            href: "/docs/sast",
            icon: Shield,
            description: "Orchestrate 40+ static analysis scanners with AI false-positive filtering.",
            keywords: ["sast", "linters", "semgrep", "eslint", "security"],
          },
          {
            name: "Enterprise Security",
            href: "/docs/security",
            icon: Lock,
            description: "SSO/SAML, audit logs, TLS 1.3, and isolated ephemeral review sandboxes.",
            keywords: ["security", "sso", "saml", "enterprise", "audit"],
          },
          {
            name: "Privacy & Zero Retention",
            href: "/docs/privacy",
            icon: Layers,
            description: "SOC2 Type II, ISO 27001, volatile memory processing, and zero model training.",
            keywords: ["privacy", "soc2", "iso", "retention", "gdpr"],
          },
        ],
      },
    ],
  },
  {
    id: "integrations",
    label: "Platforms & API",
    defaultHref: "/docs/github",
    groups: [
      {
        title: "Git Providers",
        defaultOpen: true,
        items: [
          {
            name: "GitHub App",
            href: "/docs/github",
            icon: Puzzle,
            description: "GitHub Cloud & Enterprise Server installation, permissions, and check runs.",
            keywords: ["github", "enterprise", "app"],
          },
          {
            name: "GitLab Integration",
            href: "/docs/gitlab",
            icon: Puzzle,
            description: "GitLab SaaS & self-managed merge request hooks and token scopes.",
            keywords: ["gitlab", "self-managed", "mr"],
          },
          {
            name: "Bitbucket Integration",
            href: "/docs/bitbucket",
            icon: Puzzle,
            description: "Bitbucket Cloud and Data Center setup with app passwords and pipelines.",
            keywords: ["bitbucket", "pipelines", "atlassian"],
          },
        ],
      },
      {
        title: "Developer API",
        defaultOpen: true,
        items: [
          {
            name: "REST & GraphQL API",
            href: "/docs/api",
            icon: Activity,
            description: "Programmatic access to review history, health scores, rules, and webhooks.",
            keywords: ["api", "rest", "graphql", "webhooks", "token"],
          },
        ],
      },
    ],
  },
];

export function getActiveTabForPath(pathname: string): DocDomainTab {
  // Exact match priority across tabs (prefer non-overview specific tabs when a page appears in both)
  const orderedTabs = [...DOC_TABS.slice(1), DOC_TABS[0]];
  for (const tab of orderedTabs) {
    for (const group of tab.groups) {
      for (const item of group.items) {
        if (item.href === pathname) return tab;
        if (item.children?.some((c) => c.href === pathname)) return tab;
      }
    }
  }
  return DOC_TABS[0];
}

export interface FlatDocEntry {
  name: string;
  href: string;
  description: string;
  tabLabel: string;
  groupTitle: string;
  keywords: string[];
  badge?: string;
}

export function getFlatDocPages(): FlatDocEntry[] {
  const seen = new Set<string>();
  const results: FlatDocEntry[] = [];

  for (const tab of DOC_TABS) {
    for (const group of tab.groups) {
      for (const item of group.items) {
        if (!seen.has(item.href)) {
          seen.add(item.href);
          results.push({
            name: item.name,
            href: item.href,
            description: item.description,
            tabLabel: tab.label,
            groupTitle: group.title,
            keywords: item.keywords || [],
            badge: item.badge,
          });
        }
        if (item.children) {
          for (const child of item.children) {
            if (!seen.has(child.href)) {
              seen.add(child.href);
              results.push({
                name: child.name,
                href: child.href,
                description: child.description,
                tabLabel: tab.label,
                groupTitle: group.title,
                keywords: child.keywords || [],
                badge: child.badge,
              });
            }
          }
        }
      }
    }
  }
  return results;
}
