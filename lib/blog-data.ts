export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  handle: string;
}

export interface TableOfContentItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: "Engineering" | "Product" | "Tutorial" | "Security" | "AI & ML" | "Case Study";
  date: string;
  publishedDate: string;
  readTime: string;
  image: string;
  featured?: boolean;
  author: Author;
  tags: string[];
  tableOfContents: TableOfContentItem[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "ast-driven-static-analysis-ai-code-reviews",
    title: "How AST-Driven Static Analysis Powers Deep AI Code Reviews",
    excerpt: "Why naive LLM diff prompting fails on complex codebases, and how combining Abstract Syntax Trees with semantic graphs eliminates hallucinated review comments.",
    category: "Engineering",
    date: "May 18, 2026",
    publishedDate: "2026-05-18",
    readTime: "7 min read",
    image: "/blog/blog-ast.jpg",
    featured: true,
    author: {
      name: "Dr. Sarah Chen",
      role: "Principal AI Architect",
      avatar: "/icon.png",
      bio: "Former compiler engineer & researcher focusing on formal verification, AST parsing, and large language model alignment for developer tools.",
      handle: "@sarahchen_dev",
    },
    tags: ["AbstractSyntaxTree", "StaticAnalysis", "LLMOps", "CompilerDesign"],
    tableOfContents: [
      { id: "the-diff-limitation", title: "The Diff Limitation Problem", level: 2 },
      { id: "ast-parsing-vs-regex", title: "AST Parsing vs. Naive Tokenization", level: 2 },
      { id: "the-semantic-code-graph", title: "The Three-Layer Code Graph", level: 2 },
      { id: "real-world-concurrency-bug", title: "Catching Async Race Conditions", level: 2 },
      { id: "benchmarking-accuracy", title: "Accuracy Benchmarks vs. Standard Linters", level: 2 },
      { id: "conclusion", title: "The Future of Hybrid Review Systems", level: 2 },
    ],
    content: `
      <p class="lead-paragraph">Most developers who first try generic AI code reviewers walk away with the same frustration: <em>hallucinated imports, false positives on stylistic conventions, and complete blindness to cross-file side effects</em>. The root cause is simple: raw diffs lack the semantic syntax tree required to reason about program execution.</p>

      <div class="callout-box">
        <div class="callout-title">
          <span class="callout-icon">💡</span>
          <strong>Executive Summary</strong>
        </div>
        <p>A diff is merely a list of inserted and deleted characters. Without constructing an <strong>Abstract Syntax Tree (AST)</strong> and cross-referencing symbol tables, an LLM evaluates code in isolation. GitRabbit combines Treesitter AST extraction, semantic symbol graphs, and multi-agent reasoning to eliminate 89% of hallucinated review comments.</p>
      </div>

      <h2 id="the-diff-limitation">The Diff Limitation Problem</h2>
      <p>When you submit a pull request, your git client produces a unified diff. It highlights what changed, but contains zero information about:</p>
      <ul>
        <li>Downstream functions that consume the modified return type.</li>
        <li>Implicit interface implementations in statically typed languages like Go and TypeScript.</li>
        <li>Transitive concurrency locks held across asynchronous boundary calls.</li>
      </ul>
      <p>When an LLM is given only the 30 lines of changed code, it must guess the broader context. Often, it guesses wrong—suggesting null checks for variables already guaranteed non-null by the caller, or inventing functions that do not exist.</p>

      <h2 id="ast-parsing-vs-regex">AST Parsing vs. Naive Tokenization</h2>
      <p>To provide surgical, production-ready feedback, GitRabbit executes a language-specific AST visitor using tree-sitter bindings before invoking the reasoning model. The tree represents the hierarchical syntactic structure of the source code.</p>

      <div class="code-wrapper">
        <div class="code-header">
          <span class="code-filename">engine/ast_visitor.py</span>
          <span class="code-badge">Python 3.12</span>
        </div>
        <pre><code class="language-python"># Traversal logic extracting symbol definitions & call boundaries
class ASTSymbolVisitor:
    def __init__(self, syntax_tree: Tree, source_bytes: bytes):
        self.tree = syntax_tree
        self.source = source_bytes
        self.dependencies: set[str] = set()

    def extract_taint_sinks(self, node: Node) -> list[SecurityViolation]:
        violations = []
        if node.type == "call_expression":
            function_node = node.child_by_field_name("function")
            func_name = self.source[function_node.start_byte:function_node.end_byte].decode("utf-8")
            if func_name in RESTRICTED_SINK_OPERATORS:
                violations.append(SecurityViolation(sink=func_name, line=node.start_point[0]))
        return violations</code></pre>
      </div>

      <h2 id="the-semantic-code-graph">The Three-Layer Code Graph</h2>
      <p>Once the AST is generated, GitRabbit synthesizes it into three distinct semantic layers:</p>
      <ol>
        <li><strong>Syntactic Layer:</strong> Token-level grammar validation, scoping rules, and type inference trees.</li>
        <li><strong>Relational Graph Layer:</strong> Caller-callee relationships, inheritance hierarchies, and monorepo workspace dependencies.</li>
        <li><strong>Temporal Git History Layer:</strong> Frequent co-commit clusters and past bug regressions linked to the modified modules.</li>
      </ol>

      <blockquote class="custom-quote">
        "Code review is not proofreading English grammar; it is formal theorem verification against human intent and architectural invariants."
        <cite>— GitRabbit Engineering Principles, RFC-08</cite>
      </blockquote>

      <h2 id="real-world-concurrency-bug">Catching Async Race Conditions</h2>
      <p>Consider this real-world example: an async cache invalidation routine where a shared resource is mutated without adequate mutual exclusion. A standard linter passes this without warnings because both functions are syntactically valid.</p>

      <div class="diff-block">
        <div class="diff-header">
          <span>src/services/cache_manager.ts</span>
          <span class="diff-type">AI Recommended Fix</span>
        </div>
        <pre class="diff-content"><span class="diff-del">- async invalidateSession(userId: string): Promise&lt;void&gt; {</span>
<span class="diff-del">-   const session = await this.storage.get(userId);</span>
<span class="diff-del">-   delete this.activeSessions[userId];</span>
<span class="diff-del">-   await this.storage.syncToDisk();</span>
<span class="diff-del">- }</span>
<span class="diff-add">+ async invalidateSession(userId: string): Promise&lt;void&gt; {</span>
<span class="diff-add">+   // GitRabbit identified a race condition: concurrent read/writes to activeSessions</span>
<span class="diff-add">+   await this.mutex.runExclusive(async () => {</span>
<span class="diff-add">+     const session = await this.storage.get(userId);</span>
<span class="diff-add">+     if (session) {</span>
<span class="diff-add">+       delete this.activeSessions[userId];</span>
<span class="diff-add">+       await this.storage.syncToDisk();</span>
<span class="diff-add">+     }</span>
<span class="diff-add">+   });</span>
<span class="diff-add">+ }</span></pre>
      </div>

      <h2 id="benchmarking-accuracy">Accuracy Benchmarks vs. Standard Linters</h2>
      <p>We tested our hybrid AST + Agentic pipeline on 500 open-source pull requests across Go, Python, and TypeScript containing known security and concurrency defects. The results speak for themselves:</p>

      <div class="table-container">
        <table class="benchmark-table">
          <thead>
            <tr>
              <th>Detection System</th>
              <th>False Positive Rate</th>
              <th>Logic Bug Recall</th>
              <th>Context Depth</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Regex Linters (ESLint / Flake8)</td>
              <td>12%</td>
              <td>18%</td>
              <td>Single File (Tokens)</td>
            </tr>
            <tr>
              <td>Standard LLM Diff Prompt</td>
              <td>41%</td>
              <td>54%</td>
              <td>Diff Window Only</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>GitRabbit Hybrid AST Engine</strong></td>
              <td><strong>4.2%</strong></td>
              <td><strong>93.7%</strong></td>
              <td>Full Repository Graph</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="conclusion">The Future of Hybrid Review Systems</h2>
      <p>The debate between deterministic static analysis and probabilistic AI is a false dichotomy. By using deterministic AST parsers to ground generative models in undeniable syntactic facts, we achieve the best of both worlds: zero-hallucination accuracy paired with human-level semantic comprehension.</p>
    `,
  },
  {
    id: 2,
    slug: "introducing-gitrabbit-agent-v2-autonomous-reviews",
    title: "Introducing GitRabbit Agent v2: Inline IDE Reviews & One-Click Fixes",
    excerpt: "A deep dive into our latest update: autonomous issue resolution, bidirectional IDE-to-PR synchronization, and sub-100ms AST indexing.",
    category: "Product",
    date: "May 12, 2026",
    publishedDate: "2026-05-12",
    readTime: "8 min read",
    image: "/pricing_header_pixel_rabbit_1777565653593.png",
    featured: false,
    author: {
      name: "Marcus Vance",
      role: "Head of Developer Experience",
      avatar: "/icon.png",
      bio: "Full-stack developer advocate and open source contributor passionate about high-velocity developer tooling and terminal UX.",
      handle: "@marcus_vance",
    },
    tags: ["AgenticAI", "VSCode", "DeveloperWorkflow", "ProductRelease"],
    tableOfContents: [
      { id: "the-context-switch-tax", title: "The Context-Switching Tax", level: 2 },
      { id: "ide-integration", title: "Direct IDE & Terminal Integration", level: 2 },
      { id: "autonomous-patch-engine", title: "How One-Click Fixes Work", level: 2 },
      { id: "agentic-comment-threads", title: "Debating Code in Comment Threads", level: 2 },
      { id: "rollout-details", title: "Migration Guide & Availability", level: 2 },
    ],
    content: `
      <p class="lead-paragraph">Software engineers spend up to 35% of their working hours waiting for pull request reviews or manually resolving minor nitpicks. With GitRabbit Agent v2, we are turning the code review process into a real-time, collaborative pair-programming experience directly inside your workflow.</p>

      <div class="callout-box">
        <div class="callout-title">
          <span class="callout-icon">🚀</span>
          <strong>What's New in v2</strong>
        </div>
        <p>Agent v2 brings three major breakthroughs: zero-latency inline IDE reviews (VS Code, Cursor, Windsurf), committable one-click patch generation for security issues, and conversational PR threads where you can ask GitRabbit to refactor code on demand.</p>
      </div>

      <h2 id="the-context-switch-tax">The Context-Switching Tax</h2>
      <p>When a reviewer leaves a comment like <em>"Please add bounds checking on line 142"</em>, the author must stop their current task, re-stash working branches, pull the PR branch, make the change, run the test suite, commit, and push. That entire cycle takes an average of 18 minutes for a two-line edit.</p>
      <p>GitRabbit Agent v2 eliminates this tax by generating committable GitHub suggestions with an <strong>"Apply Fix"</strong> button that merges cleanly into the active branch with automated CI re-triggers.</p>

      <h2 id="ide-integration">Direct IDE & Terminal Integration</h2>
      <p>Why wait until code is pushed to GitHub to discover memory leaks or missing unit tests? The new GitRabbit CLI and VS Code extension runs locally before you commit:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <span class="code-filename">Terminal</span>
          <span class="code-badge">bash</span>
        </div>
        <pre><code class="language-bash"># Run pre-commit review directly on staged changes
$ gitrabbit review --staged --deep

✔ Parsing AST for 6 modified files... [42ms]
✔ Checking repository dependency graph... [110ms]
✔ Linters & SAST evaluation (40 tools)... [180ms]

[WARN] src/api/billing.ts:88
  - Potential unhandled Stripe webhook idempotency race condition.
  - Fix suggested: wrap transaction with storage.withIdempotencyKey()

[ACTION] Press [Y] to apply suggested diff directly into working tree:</code></pre>
      </div>

      <h2 id="autonomous-patch-engine">How One-Click Fixes Work</h2>
      <p>Our autonomous patch engine does not just output markdown text; it synthesizes syntactically verifiable Unified Diffs. Before presenting a fix to the developer, Agent v2 runs the compiler in an ephemeral sandbox to ensure:</p>
      <ul>
        <li>The proposed code compiles with zero type errors.</li>
        <li>Existing unit tests continue to pass.</li>
        <li>Project formatting rules (Prettier, Biome, Black) are strictly respected.</li>
      </ul>

      <blockquote class="custom-quote">
        "The fastest pull request review is the one you never had to wait for. Agent v2 resolves 60% of common review items before human eyes even open the PR."
      </blockquote>

      <h2 id="agentic-comment-threads">Debating Code in Comment Threads</h2>
      <p>Have an architectural question about a suggestion? You can now reply directly to any GitRabbit comment on GitHub or GitLab:</p>
      <div class="code-wrapper">
        <div class="code-header">
          <span class="code-filename">GitHub PR Thread</span>
          <span class="code-badge">Markdown</span>
        </div>
        <pre><code class="language-markdown">@gitrabbit Can we refactor this to use Redis streams instead of pub/sub
so that we guarantee at-least-once message delivery if the worker crashes?

---
🐇 **GitRabbit Agent**:
Great point! If worker pods restart during peak traffic, Pub/Sub messages
are dropped. Here is an updated patch replacing Redis PubSub with \`XADD\`
and consumer group acknowledgment:</code></pre>
      </div>

      <h2 id="rollout-details">Migration Guide & Availability</h2>
      <p>GitRabbit Agent v2 is available immediately for all Pro and Enterprise organizations. Existing v1 configurations are backward-compatible. To enable automatic patch proposals, update your repository settings or add <code>enable_one_click_fixes: true</code> to your <code>.gitrabbit.yaml</code>.</p>
    `,
  },
  {
    id: 3,
    slug: "clean-code-and-automated-refactoring-in-2026",
    title: "Best Practices for Clean Code & Architecture in Modern Monorepos",
    excerpt: "Practical patterns for enforcing architectural boundaries, managing dependency drift, and automating boilerplate refactoring at scale.",
    category: "Tutorial",
    date: "May 04, 2026",
    publishedDate: "2026-05-04",
    readTime: "10 min read",
    image: "/changelog_header_pixel_rabbit_1777568213384.png",
    featured: false,
    author: {
      name: "Elena Rostova",
      role: "VP of Platform Engineering",
      avatar: "/icon.png",
      bio: "Specializing in distributed systems architecture, monorepo orchestration, and automated developer tooling across hyper-growth engineering teams.",
      handle: "@elena_rostova",
    },
    tags: ["Monorepo", "CleanCode", "Architecture", "TypeScript"],
    tableOfContents: [
      { id: "the-monorepo-decay-cycle", title: "The Monorepo Decay Cycle", level: 2 },
      { id: "boundary-enforcement", title: "Enforcing Package Boundaries", level: 2 },
      { id: "custom-yaml-rules", title: "Defining Rules with gitrabbit.yaml", level: 2 },
      { id: "hexagonal-refactoring", title: "Refactoring Legacy Modules to Clean Architecture", level: 2 },
      { id: "automated-pr-gates", title: "Continuous Architectural Linting in CI", level: 2 },
    ],
    content: `
      <p class="lead-paragraph">As engineering organizations scale past 50 developers, monorepos often shift from an accelerator to a source of friction. Without automated architectural guardrails, circular dependencies multiply, shared libraries become dumping grounds, and refactoring becomes too risky to attempt.</p>

      <div class="callout-box">
        <div class="callout-title">
          <span class="callout-icon">📐</span>
          <strong>Core Rule of Architectural Health</strong>
        </div>
        <p>If architectural constraints exist only in a Notion wiki or a senior engineer's head, they do not exist. They must be validated automatically on every commit.</p>
      </div>

      <h2 id="the-monorepo-decay-cycle">The Monorepo Decay Cycle</h2>
      <p>The fatal pattern in shared repositories is the "convenience import": a frontend dashboard module importing a backend database schema directly because they share the same repository. Over time, internal boundaries dissolve until the entire application becomes an entangled monolith.</p>

      <h2 id="boundary-enforcement">Enforcing Package Boundaries</h2>
      <p>Modern clean code practices require explicit interface contracts. Internal implementation details within <code>packages/core</code> should never be exposed to consumers. GitRabbit enforces strict visibility levels across package workspaces.</p>

      <div class="code-wrapper">
        <div class="code-header">
          <span class="code-filename">.gitrabbit.yaml</span>
          <span class="code-badge">YAML</span>
        </div>
        <pre><code class="language-yaml">version: "2.0"
architecture_rules:
  - name: "enforce-domain-boundary"
    description: "Prevent UI components from directly importing database models"
    severity: "error"
    source_patterns: ["apps/web/**/*.tsx"]
    forbidden_imports:
      - "@acme/database"
      - "@acme/server-core"
    allowed_alternative: "Use domain service contracts via @acme/api-client"

  - name: "no-leaky-abstractions"
    description: "Ensure storage providers are injected via interfaces"
    source_patterns: ["packages/services/**/*.ts"]
    prohibit_direct_instantiation: ["PrismaClient", "RedisClient"]</code></pre>
      </div>

      <h2 id="custom-yaml-rules">Defining Rules with gitrabbit.yaml</h2>
      <p>The advantage of declarative architecture rules is that they act as automated peer reviewers. When a developer submits a PR with a forbidden import, GitRabbit flags it in seconds, offering the canonical architectural alternative.</p>

      <h2 id="hexagonal-refactoring">Refactoring Legacy Modules to Clean Architecture</h2>
      <p>Let's examine how clean hexagonal architecture (ports and adapters) decouples business logic from external dependencies:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <span class="code-filename">services/checkout_service.ts</span>
          <span class="code-badge">TypeScript</span>
        </div>
        <pre><code class="language-typescript">// Clean Port (Interface) Definition
export interface PaymentProcessorPort {
  charge(amountCents: number, currency: string, token: string): Promise&lt;PaymentResult&gt;;
}

// Business Domain Service - Pure Logic, zero direct third-party SDK imports
export class CheckoutService {
  constructor(
    private readonly paymentGateway: PaymentProcessorPort,
    private readonly auditLogger: AuditLoggerPort
  ) {}

  async processOrder(order: Order, token: string): Promise&lt;Receipt&gt; {
    const payment = await this.paymentGateway.charge(order.total, order.currency, token);
    if (!payment.success) {
      throw new PaymentDeclinedError(payment.reason);
    }
    await this.auditLogger.record({ orderId: order.id, status: "PAID" });
    return new Receipt(order, payment.transactionId);
  }
}</code></pre>
      </div>

      <h2 id="automated-pr-gates">Continuous Architectural Linting in CI</h2>
      <p>By wiring architectural checks into your CI pipeline, teams maintain high velocity without incurring technical debt. When refactoring legacy code, you can use GitRabbit's <code>--fix</code> flag to automatically generate adapter interfaces for older modules.</p>
    `,
  },
  {
    id: 4,
    slug: "catching-zero-day-injection-flaws-taint-analysis",
    title: "Catching Zero-Day Injection & Supply Chain Flaws in CI/CD",
    excerpt: "How modern SAST scanners combine taint analysis with fine-tuned LLMs to spot prototype pollution, SQLi, and malicious dependency drift before merging.",
    category: "Security",
    date: "April 26, 2026",
    publishedDate: "2026-04-26",
    readTime: "9 min read",
    image: "/blog/blog-security.jpg",
    featured: false,
    author: {
      name: "David Okafor",
      role: "Staff Security Researcher",
      avatar: "/icon.png",
      bio: "Offensive security specialist and bug bounty veteran. Researches automated exploit prevention and zero-trust software supply chains.",
      handle: "@d_okafor_sec",
    },
    tags: ["DevSecOps", "AppSec", "TaintAnalysis", "ZeroDay"],
    tableOfContents: [
      { id: "the-sast-noise-problem", title: "The 70% False Positive Dilemma", level: 2 },
      { id: "taint-analysis-explained", title: "Source-to-Sink Taint Flow", level: 2 },
      { id: "prototype-pollution-case", title: "Case Study: Prototype Pollution in Node.js", level: 2 },
      { id: "supply-chain-drift", title: "Defending Against Poisoned Dependencies", level: 2 },
      { id: "zero-trust-policies", title: "Configuring Zero-Trust Merge Gates", level: 2 },
    ],
    content: `
      <p class="lead-paragraph">Security vulnerabilities cost organizations an average of $4.45 million per data breach. Yet, traditional security scanners are widely disliked by developers because 70% or more of their reported alerts are false positives—flagging harmless test files or sanitized strings.</p>

      <div class="callout-box callout-security">
        <div class="callout-title">
          <span class="callout-icon">🛡️</span>
          <strong>Security Advisory</strong>
        </div>
        <p>Combining AST taint flow tracking with semantic code understanding eliminates noise: a vulnerability is only flagged if untrusted user input can demonstrably reach an unescaped execution sink.</p>
      </div>

      <h2 id="the-sast-noise-problem">The 70% False Positive Dilemma</h2>
      <p>When security tooling spams developer pull requests with non-exploitable warnings, developers experience "alert fatigue." They begin clicking "Dismiss" without reading, inadvertently allowing genuine vulnerabilities to slip into production.</p>

      <h2 id="taint-analysis-explained">Source-to-Sink Taint Flow</h2>
      <p>GitRabbit uses automated taint propagation algorithms. A variable originating from an untrusted source (HTTP query parameter, request body, external webhook) is marked as <code>TAINTED</code>. The engine tracks its flow through intermediate variables, function arguments, and object transformations until it terminates in a sanitizer or an execution sink.</p>

      <div class="code-wrapper">
        <div class="code-header">
          <span class="code-filename">vulnerability-tracer.ts</span>
          <span class="code-badge">TypeScript</span>
        </div>
        <pre><code class="language-typescript">// TAINT TRACE DEMONSTRATION
// Source: req.body.templateId
app.post("/render", async (req, res) => {
  const userInput = req.body.templateId; // <-- SOURCE [TAINTED]
  const config = sanitizeIdentifier(userInput); // <-- SANITIZER [CLEANSED]
  
  // Safe execution: input passed through strict alphanumeric whitelist
  const template = await loadTemplateFromDisk(config);
  res.send(template);
});</code></pre>
      </div>

      <h2 id="prototype-pollution-case">Case Study: Prototype Pollution in Node.js</h2>
      <p>Recursive object mergers are notoriously susceptible to prototype pollution if object keys like <code>__proto__</code> or <code>constructor.prototype</code> are not guarded:</p>

      <div class="diff-block">
        <div class="diff-header">
          <span>lib/deep_merge.js</span>
          <span class="diff-type">Security Patch</span>
        </div>
        <pre class="diff-content"><span class="diff-del">- function merge(target, source) {</span>
<span class="diff-del">-   for (let key in source) {</span>
<span class="diff-del">-     if (typeof source[key] === 'object') {</span>
<span class="diff-del">-       target[key] = merge(target[key] || {}, source[key]);</span>
<span class="diff-del">-     }</span>
<span class="diff-del">-   }</span>
<span class="diff-del">- }</span>
<span class="diff-add">+ function merge(target, source) {</span>
<span class="diff-add">+   for (let key of Object.keys(source)) {</span>
<span class="diff-add">+     // Guard against Object Prototype pollution attacks</span>
<span class="diff-add">+     if (key === '__proto__' || key === 'constructor' || key === 'prototype') {</span>
<span class="diff-add">+       continue;</span>
<span class="diff-add">+     }</span>
<span class="diff-add">+     if (typeof source[key] === 'object' && source[key] !== null) {</span>
<span class="diff-add">+       target[key] = merge(target[key] || {}, source[key]);</span>
<span class="diff-add">+     } else {</span>
<span class="diff-add">+       target[key] = source[key];</span>
<span class="diff-add">+     }</span>
<span class="diff-add">+   }</span>
<span class="diff-add">+ }</span></pre>
      </div>

      <h2 id="supply-chain-drift">Defending Against Poisoned Dependencies</h2>
      <p>Modern attackers frequently target developer dependencies rather than writing zero-day exploits against your proprietary code. GitRabbit continuously audits <code>package.json</code>, <code>Cargo.toml</code>, and <code>go.mod</code> diffs, cross-referencing published maintainer keys and release checksums against known malicious typosquats.</p>

      <h2 id="zero-trust-policies">Configuring Zero-Trust Merge Gates</h2>
      <p>Ensure that any PR containing high-severity findings automatically blocks the merge button until a designated security owner provides a signed override. In GitRabbit, this is achieved by enabling <strong>Strict SAST Gate</strong> in repository settings.</p>
    `,
  },
  {
    id: 5,
    slug: "hierarchical-retrieval-context-windows-codebases",
    title: "Solving the Context Window Bottleneck with Hierarchical Code Graphs",
    excerpt: "How GitRabbit indexes 500,000+ line codebases without exceeding token limits or losing critical dependency context during automated code review.",
    category: "AI & ML",
    date: "April 18, 2026",
    publishedDate: "2026-04-18",
    readTime: "10 min read",
    image: "/blog/blog-ast.jpg",
    featured: false,
    author: {
      name: "Dr. Aris Thorne",
      role: "Lead AI Research Scientist",
      avatar: "/icon.png",
      bio: "Ph.D. in Computer Science with focus on graph neural networks, vector embedding quantization, and retrieval-augmented generation for software repositories.",
      handle: "@aris_thorne",
    },
    tags: ["RAG", "CodeEmbeddings", "ContextWindows", "VectorSearch"],
    tableOfContents: [
      { id: "the-token-budget-trap", title: "The Token Budget Trap", level: 2 },
      { id: "chunking-code-properly", title: "Why Text Chunking Breaks Code Logic", level: 2 },
      { id: "hierarchical-indexing", title: "Hierarchical Graph Compression", level: 2 },
      { id: "multi-hop-retrieval", title: "Multi-Hop Dependency Resolution", level: 2 },
      { id: "benchmark-efficiency", title: "Token Efficiency & Latency Benchmarks", level: 2 },
    ],
    content: `
      <p class="lead-paragraph">Even as LLM context windows expand to 1M+ tokens, stuffing an entire repository into a single prompt is slow, prohibitively expensive, and degrades needle-in-a-haystack recall. To review code accurately, an AI system needs precision retrieval, not raw token volume.</p>

      <div class="callout-box">
        <div class="callout-title">
          <span class="callout-icon">🧠</span>
          <strong>Research Breakthrough</strong>
        </div>
        <p>Our hierarchical retrieval pipeline compresses 500,000 lines of code into a compact 4,000-token contextual graph, maintaining 98.4% recall on cross-module interface contracts while cutting inference latency by 72%.</p>
      </div>

      <h2 id="the-token-budget-trap">The Token Budget Trap</h2>
      <p>When reviewing a 50-line pull request, the reviewer might need context from an authentication middleware written 3 years ago and a database migration executed last month. If you pass only the diff, the LLM hallucinates; if you pass the entire repo, the model suffers from attention dilution.</p>

      <h2 id="chunking-code-properly">Why Text Chunking Breaks Code Logic</h2>
      <p>Standard RAG (Retrieval-Augmented Generation) splits documents every 500 words. When applied to code, this naively splits functions across chunk boundaries, separating class headers from their implementations and disconnecting variable declarations from their usages.</p>

      <h2 id="hierarchical-indexing">Hierarchical Graph Compression</h2>
      <p>GitRabbit replaces arbitrary line chunking with <strong>Hierarchical Symbol Pruning</strong>. We build a tree containing:</p>
      <ul>
        <li><strong>Level 0 (Module Manifest):</strong> Public exports, type signatures, and docstrings.</li>
        <li><strong>Level 1 (Call Graph):</strong> Directed edges representing which functions invoke which methods.</li>
        <li><strong>Level 2 (Implementation Bodies):</strong> The raw code lines, loaded lazily only if the symbol is in the active execution path.</li>
      </ul>

      <div class="code-wrapper">
        <div class="code-header">
          <span class="code-filename">engine/graph_compressor.rs</span>
          <span class="code-badge">Rust</span>
        </div>
        <pre><code class="language-rust">// Rust high-performance symbol table encoder
pub struct HierarchicalContextGraph {
    pub root_module: String,
    pub symbol_nodes: HashMap&lt;SymbolId, CompactSymbolNode&gt;,
    pub call_edges: Vec&lt;CallEdge&gt;,
}

impl HierarchicalContextGraph {
    pub fn prune_unrelated_paths(&mut self, active_symbols: &[SymbolId]) -> PrunedContext {
        let reachable = self.traverse_breadth_first(active_symbols, MAX_DEPTH);
        PrunedContext::from_reachable_subgraph(self, reachable)
    }
}</code></pre>
      </div>

      <h2 id="multi-hop-retrieval">Multi-Hop Dependency Resolution</h2>
      <p>When reviewing a change in a payment processing handler, the retriever executes a 2-hop graph traversal to inspect:</p>
      <ol>
        <li>Direct database write queries initiated in the modified controller.</li>
        <li>Downstream consumer webhooks that subscribe to the resulting payment state transition.</li>
      </ol>

      <h2 id="benchmark-efficiency">Token Efficiency & Latency Benchmarks</h2>
      <p>By only supplying relevant pruned symbols, GitRabbit reduces prompt token size by 84% compared to standard repository RAG, achieving sub-2-second turnaround time on PR reviews.</p>
    `,
  },
  {
    id: 6,
    slug: "how-fintech-unicorn-payflow-cut-pr-cycle-time",
    title: "How FinTech Leader PayFlow Reduced Review Bottlenecks by 58%",
    excerpt: "Learn how PayFlow scaled their engineering team to 350+ developers while maintaining SOC2 compliance and accelerating daily production deployments.",
    category: "Case Study",
    date: "April 08, 2026",
    publishedDate: "2026-04-08",
    readTime: "6 min read",
    image: "/blog/blog-velocity.jpg",
    featured: false,
    author: {
      name: "Liam Gallagher",
      role: "Enterprise Solutions Director",
      avatar: "/icon.png",
      bio: "Partnering with hyper-growth engineering leaders to modernize code review infrastructure, CI/CD velocity, and team throughput.",
      handle: "@liam_gallagher_tech",
    },
    tags: ["Enterprise", "FinTech", "Compliance", "Productivity"],
    tableOfContents: [
      { id: "the-challenge", title: "The Bottleneck: 48-Hour PR Queues", level: 2 },
      { id: "the-solution", title: "Deploying GitRabbit as First-Pass Reviewer", level: 2 },
      { id: "compliance-and-security", title: "Meeting SOC2 & PCI-DSS Audit Standards", level: 2 },
      { id: "the-results", title: "Key Metrics: 58% Faster Merge Times", level: 2 },
      { id: "team-quote", title: "What the PayFlow Engineering Team Says", level: 2 },
    ],
    content: `
      <p class="lead-paragraph">PayFlow processes over $14 billion in annualized payment volume. In early 2025, their engineering team hit a major growth hurdle: their average pull request took 48 hours to receive initial peer feedback, holding back daily product shipping goals.</p>

      <div class="callout-box">
        <div class="callout-title">
          <span class="callout-icon">🏆</span>
          <strong>Case Study Snapshot</strong>
        </div>
        <p><strong>Customer:</strong> PayFlow (FinTech, 350+ Engineers)<br />
        <strong>Impact:</strong> 58% reduction in PR turnaround time, 31% fewer staging regression leaks, and an estimated $420,000 saved annually in developer context-switching costs.</p>
      </div>

      <h2 id="the-challenge">The Bottleneck: 48-Hour PR Queues</h2>
      <p>As PayFlow scaled from 80 to 350 developers, code review emerged as the primary development bottleneck. Senior staff engineers spent over 15 hours every week reviewing mundane formatting, missing unit tests, and style nitpicks instead of focusing on complex transaction architecture.</p>

      <h2 id="the-solution">Deploying GitRabbit as First-Pass Reviewer</h2>
      <p>PayFlow deployed GitRabbit Enterprise across all 42 core microservices. Rather than waiting for human peers, every PR receives a comprehensive architectural breakdown and security check within 90 seconds of creation.</p>
      <ul>
        <li><strong>Automated Test Coverage Generation:</strong> GitRabbit automatically drafts missing unit tests for unhandled error branches.</li>
        <li><strong>Compliance Invariant Checking:</strong> Verification that credit card PAN data is never logged to plain-text stdout or Datadog streams.</li>
        <li><strong>One-Click Fixes:</strong> Developers resolve 80% of nitpicks with a single click before asking a senior peer for final signoff.</li>
      </ul>

      <h2 id="compliance-and-security">Meeting SOC2 & PCI-DSS Audit Standards</h2>
      <p>As a regulated financial institution, PayFlow could not allow proprietary code to be permanently stored on third-party servers. GitRabbit's zero-data-retention architecture and SOC2 Type II compliance allowed PayFlow's Chief Information Security Officer to approve enterprise rollout in less than 48 hours.</p>

      <blockquote class="custom-quote">
        "GitRabbit feels like giving every developer on our team their own personal staff engineer sitting beside them, catching bugs before anyone else sees them."
        <cite>— Tariq Mansoor, VP of Technology at PayFlow</cite>
      </blockquote>

      <h2 id="the-results">Key Metrics: 58% Faster Merge Times</h2>
      <p>Within 90 days of deploying GitRabbit, PayFlow achieved remarkable velocity improvements:</p>

      <div class="table-container">
        <table class="benchmark-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Before GitRabbit</th>
              <th>After GitRabbit</th>
              <th>Overall Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mean Time to First Review (MTFR)</td>
              <td>14.2 hours</td>
              <td>1.8 minutes</td>
              <td><strong>98.7% faster</strong></td>
            </tr>
            <tr>
              <td>Total PR Turnaround Time (MTTM)</td>
              <td>48.5 hours</td>
              <td>20.3 hours</td>
              <td><strong>58% reduction</strong></td>
            </tr>
            <tr>
              <td>Post-Merge Regressions in Staging</td>
              <td>23 / month</td>
              <td>16 / month</td>
              <td><strong>31% fewer bugs</strong></td>
            </tr>
            <tr>
              <td>Developer Satisfaction Score</td>
              <td>64%</td>
              <td>94%</td>
              <td><strong>+30 point gain</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="team-quote">What the PayFlow Engineering Team Says</h2>
      <p>By automating the repetitive parts of peer review, PayFlow's senior engineers reclaimed over 10 hours a week for high-impact systems engineering and architectural innovation.</p>
    `,
  },
];

export function getAllBlogs(): BlogPost[] {
  return blogPosts;
}

export function getBlogByIdOrSlug(identifier: string | number): BlogPost | undefined {
  const str = identifier.toString().toLowerCase();
  return blogPosts.find((p) => p.id.toString() === str || p.slug.toLowerCase() === str);
}

export function getRelatedBlogs(currentId: number, count: number = 3): BlogPost[] {
  const otherPosts = blogPosts.filter((p) => p.id !== currentId);
  // Prefer same category, then fallback to others
  const current = blogPosts.find((p) => p.id === currentId);
  if (!current) return otherPosts.slice(0, count);

  const sameCategory = otherPosts.filter((p) => p.category === current.category);
  const differentCategory = otherPosts.filter((p) => p.category !== current.category);
  return [...sameCategory, ...differentCategory].slice(0, count);
}
