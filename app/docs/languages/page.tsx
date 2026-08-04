"use client";

import { DocPage } from "@/components/DocPage";
import { Code, Layers, Hammer, ShieldAlert } from "lucide-react";

export default function LanguageSupportPage() {
  return (
    <DocPage
      breadcrumb="Codebase_Intelligence / Language_Support"
      badge="MULTI-LANGUAGE"
      badgeColor="#60A5FA"
      title="UNIVERSAL LANGUAGE SUPPORT"
      subtitle="Designed to work across all major backend, frontend, and system languages."
      description={`GitRabbit compiles language-specific Abstract Syntax Trees (AST) dynamically. We support JavaScript, TypeScript, Python, Java, C#, C++, Go, Rust, Ruby, PHP, Swift, Kotlin, and Scala out of the box. Our backend parser updates weekly with support for new syntax versions (e.g. ES2026, Python 3.13, Go 1.25).`}
      features={[
        { icon: Code, title: "Modern ECMAScript & TypeScript", desc: "Full support for React Server Components, Next.js page layouts, and complex generic models." },
        { icon: Layers, title: "Strongly Typed Compilers", desc: "In-depth checks for Java, C++, C#, Go and Rust. Finds pointer exceptions and race states." },
        { icon: Hammer, title: "Scripting & Backend Frameworks", desc: "Optimizations for Rails (Ruby), Django/FastAPI (Python), Laravel (PHP) databases and schemas." },
      ]}
      steps={[
        { step: "Scan Ext", title: "Automatic Extension Matching", desc: "GitRabbit identifies changed file extensions to spin up language parsers." },
        { step: "Lint Link", title: "Linter Integration", desc: "Integrates with language-specific compilers to filter out typical style warnings." },
        { step: "Evaluate Types", title: "Type-Graph Evaluation", desc: "Verifies type compatibility between calling variables and exported methods." },
      ]}
      codeExample={{
        label: "Typical multi-language support metrics",
        code: `Supported Languages:
- TS / JS: Full static analysis, React Hook violations, and Bundle warnings
- Go: Concurrency safety, race-condition analysis, defer checks
- Rust: Borrow checker warnings, lifetime analysis, unwrap suggestions
- Python: GIL efficiency, type hinting validation, dependency issues
- Java / C#: Memory allocations, collection efficiency, null reference checks`,
      }}
      proTips={[
        "Specify language hint priority inside '.gitrabbit.yml' if you use a polyglot monorepo.",
        "Ensure TSConfig is checked in for TypeScript repos to enable optimal type-graph parsing.",
      ]}
      prevPage={{ href: "/docs/team-learnings", label: "Team Learnings" }}
      nextPage={{ href: "/docs/slack-agent", label: "Slack Agent" }}
    />
  );
}
