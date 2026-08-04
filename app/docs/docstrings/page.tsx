"use client";

import { DocPage } from "@/components/DocPage";
import { BookOpen, Edit, FileText, CheckCircle } from "lucide-react";

export default function DocstringGenPage() {
  return (
    <DocPage
      breadcrumb="Pre-Merge_Automation / Docstring_Gen"
      badge="DOCUMENTATION"
      badgeColor="#F97316"
      title="DOCSTRING GENERATION"
      subtitle="Automatically write and standardize code documentation and inline docstrings."
      description={`Undocumented code slows down collaboration. GitRabbit reviews export variables, modules, and API route changes, writing precise, standard-compliant docstrings (JSDoc, Docstring Sphinx, JavaDoc, Go comments) so developers don't have to write them manually.`}
      features={[
        { icon: Edit, title: "Standard Specifications Matching", desc: "Generates JSDoc for TypeScript/JavaScript, Sphinx/Google style for Python, and standard summaries for Go." },
        { icon: FileText, title: "Parameter Explanations", desc: "Extracts parameter type boundaries and constraints to write clear parameter guides." },
        { icon: CheckCircle, title: "Inline updates", desc: "Writes modifications straight into code headers with commit suggestion formats." },
      ]}
      steps={[
        { step: "Step 01", title: "Parse Export Elements", desc: "Looks for newly exported methods or variables missing documentation." },
        { step: "Step 02", title: "Synthesize Docstring", desc: "Synthesizes code functionality and registers variables, parameter types, and return categories." },
        { step: "Step 03", title: "Review Suggestion", desc: "Provides the complete documentation block as a commit suggestion on your branch." },
      ]}
      codeExample={{
        label: "JSDoc comment generated for a data processor",
        code: `/**
 * Sanitizes and aggregates user event telemetry.
 *
 * @param {TelemetryEvent[]} events - List of raw events captured from client tracker.
 * @param {string} filterScope - Category scope to filter elements (e.g. 'click').
 * @returns {AggregatedData} Aggregated metrics ready to export to console.
 * @throws {InvalidEventException} If events list contains corrupt structure.
 */
export function processTelemetry(events, filterScope) { ... }`,
      }}
      proTips={[
        "Configure docstring requirements inside '.gitrabbit.yml' so GitRabbit only docstrings public exports, avoiding internal helper clutter.",
        "Ensure standard formatting by using Prettier or ESLint after applying the documentation suggestions.",
      ]}
      prevPage={{ href: "/docs/test-gen", label: "Unit Test Generation" }}
      nextPage={{ href: "/docs/merge-conflicts", label: "Merge Conflict Resolution" }}
    />
  );
}
