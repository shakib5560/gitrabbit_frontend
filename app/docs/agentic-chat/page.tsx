"use client";

import { DocPage } from "@/components/DocPage";
import { MessageSquare, RefreshCw, Send, Compass } from "lucide-react";

export default function AgenticChatPage() {
  return (
    <DocPage
      breadcrumb="PR_Reviews / Agentic_Chat"
      badge="CHAT ENGINE"
      badgeColor="#3B82F6"
      title="AGENTIC CHAT"
      subtitle="Debate, refine, and modify code changes directly within your review comments."
      description={`GitRabbit operates as a stateful agent. You can reply directly to any comment left by GitRabbit in GitHub or GitLab to request corrections, ask for code alternatives, or debate style issues. The agent maintains the context of the discussion and can rewrite suggestions in real-time.`}
      features={[
        { icon: MessageSquare, title: "Threaded Context", desc: "The agent understands the historical context of a comment thread and respects prior updates." },
        { icon: RefreshCw, title: "Automatic Code Refinement", desc: "Ask GitRabbit to modify its suggestion, and it will update the suggestion block instantly." },
        { icon: Send, title: "Command Prompts", desc: "Use explicit commands like '/refactor' or '/explain' in your replies to instruct the agent." },
      ]}
      steps={[
        { step: "Step 01", title: "Reply to a Comment", desc: "Go to any line comment created by GitRabbit in your pull request." },
        { step: "Step 02", title: "Ask a Question", desc: "Type your query, e.g. '@gitrabbit can you rewrite this using async/await?'" },
        { step: "Step 03", title: "Observe Update", desc: "GitRabbit will analyze your reply, rewrite the code, and replace the inline suggestion." },
      ]}
      codeExample={{
        label: "Conversation transcript in PR review",
        code: `🙋 Developer: @gitrabbit please implement this with a debounce delay of 300ms instead.

🤖 GitRabbit: Certainly. Here is the updated code utilizing debounced execution:
\`\`\`typescript
const debouncedSearch = debounce((query) => {
  fetchResults(query);
}, 300);
\`\`\``,
      }}
      proTips={[
        "Keep responses simple. GitRabbit reads code changes automatically when you push new commits to the branch.",
        "You can restrict chat capabilities to collaborators only in your .gitrabbit.yml file.",
        "Use '/explain' if you want a detailed algorithmic walkthrough of why GitRabbit flagged a block of code.",
      ]}
      prevPage={{ href: "/docs/bug-detection", label: "Bug Detection" }}
      nextPage={{ href: "/docs/code-graph", label: "Code Graph" }}
    />
  );
}
