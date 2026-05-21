"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  Blocks, 
  Settings, 
  Check, 
  Sparkles, 
  ExternalLink,
  GitBranch,
  MessageSquare
} from "lucide-react";

// Custom premium SVGs for services not in local lucide-react version
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const SlackIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.043zm2.52-10.123a2.528 2.528 0 0 1-2.52-2.522A2.528 2.528 0 0 1 8.823 0a2.528 2.528 0 0 1 2.52 2.522v2.52h-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.522-2.522V8.823a2.528 2.528 0 0 1 2.522-2.52h5.043zm10.123 2.52a2.528 2.528 0 0 1 2.522-2.52 2.528 2.528 0 0 1 2.52 2.52 2.528 2.528 0 0 1-2.52 2.52h-2.522v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043zm-2.52 10.123a2.528 2.528 0 0 1 2.52 2.522 2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522zm0-1.261a2.528 2.528 0 0 1-2.522-2.52v-5.043a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.52h-5.043z" />
  </svg>
);

const TrelloIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.43 23.33H4.57c-2.16 0-3.9-1.74-3.9-3.9V4.57c0-2.16 1.74-3.9 3.9-3.9h14.86c2.16 0 3.9 1.74 3.9 3.9v14.86c0 2.16-1.74 3.9-3.9 3.9zM7.2 4.97c-.93 0-1.68.75-1.68 1.68v7.88c0 .93.75 1.68 1.68 1.68h1.8c.93 0 1.68-.75 1.68-1.68V6.65c0-.93-.75-1.68-1.68-1.68H7.2zm7.98 0c-.93 0-1.68.75-1.68 1.68v4.61c0 .93.75 1.68 1.68 1.68h1.8c.93 0 1.68-.75 1.68-1.68V6.65c0-.93-.75-1.68-1.68-1.68h-1.8z" />
  </svg>
);

interface Integration {
  id: string;
  name: string;
  category: "Git Provider" | "Notification" | "Project Management";
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  isConfigurable: boolean;
  statusText: string;
}

export function IntegrationsTab() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "github",
      name: "GitHub Enterprise",
      category: "Git Provider",
      description: "Connect repositories, parse Pull Requests, add inline reviewer logs and check markers dynamically.",
      icon: <GithubIcon className="w-8 h-8 text-[#24292e]" />,
      isConnected: true,
      isConfigurable: true,
      statusText: "Connected (4 repos)",
    },
    {
      id: "gitlab",
      name: "GitLab CI/CD",
      category: "Git Provider",
      description: "Trigger GitRabbit AST review jobs inside merge requests and export logs into build pipeline reports.",
      icon: <GitBranch className="w-8 h-8 text-[#fc6d26]" />,
      isConnected: true,
      isConfigurable: true,
      statusText: "Connected (1 repo)",
    },
    {
      id: "slack",
      name: "Slack Notices",
      category: "Notification",
      description: "Receive real-time notifications inside channels when high-severity bugs or security warnings are flagged.",
      icon: <SlackIcon className="w-8 h-8 text-[#4a154b]" />,
      isConnected: false,
      isConfigurable: false,
      statusText: "Not connected",
    },
    {
      id: "discord",
      name: "Discord Webhooks",
      category: "Notification",
      description: "Stream pull request comments and audit reviews directly to your developer server channels.",
      icon: <MessageSquare className="w-8 h-8 text-[#5865F2]" />,
      isConnected: true,
      isConfigurable: true,
      statusText: "Active webhook",
    },
    {
      id: "jira",
      name: "Jira Software",
      category: "Project Management",
      description: "Automatically file backlog issue cards when critical memory leaks or syntax flaws are caught in production branches.",
      icon: <TrelloIcon className="w-8 h-8 text-[#0052CC]" />,
      isConnected: false,
      isConfigurable: false,
      statusText: "Not connected",
    }
  ]);

  const handleToggleConnect = (id: string) => {
    setIntegrations(prev => prev.map(int => {
      if (int.id === id) {
        const nextConnected = !int.isConnected;
        return {
          ...int,
          isConnected: nextConnected,
          statusText: nextConnected ? "Connected" : "Not connected",
          isConfigurable: nextConnected
        };
      }
      return int;
    }));
  };

  return (
    <div className="space-y-6 font-sans select-none">
      
      {/* Header Info */}
      <div>
        <h3 className="text-sm font-bold text-text-primary tracking-wide">
          Connected Developer Services
        </h3>
        <p className="text-xs text-text-secondary mt-0.5">
          Integrate GitRabbit diagnostics directly into your team communications and CI/CD pipelines
        </p>
      </div>

      {/* Grid Layout of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((int, idx) => (
          <Card key={int.id} hoverGlow={true} delay={idx * 0.05} className="flex flex-col justify-between h-[280px] bg-bg-secondary border-border-primary p-6">
            
            <div className="space-y-4">
              {/* Category, Status & Icon */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-bg-tertiary border border-border-primary/50 flex items-center justify-center shadow-sm">
                  {int.icon}
                </div>
                <div className="text-right">
                  <Badge variant={int.category === "Git Provider" ? "gold" : int.category === "Notification" ? "info" : "default"} className="text-[9px]">
                    {int.category}
                  </Badge>
                  <span className="text-[9.5px] font-bold text-text-muted mt-1.5 block font-mono">
                    {int.statusText}
                  </span>
                </div>
              </div>

              {/* Service title and description */}
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-text-primary flex items-center gap-1">
                  {int.name}
                  {int.isConnected && <Check size={14} className="text-emerald-500 shrink-0" />}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {int.description}
                </p>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex gap-2 items-center justify-end border-t border-border-primary/50 pt-4 mt-4">
              {int.isConfigurable && (
                <Button
                  variant="outline"
                  size="sm"
                  className="py-1 px-3 text-xs text-text-secondary hover:text-text-primary gap-1"
                  onClick={() => alert(`Configuring ${int.name}...`)}
                >
                  <Settings size={12} />
                  <span>Configure</span>
                </Button>
              )}
              <Button
                variant={int.isConnected ? "secondary" : "primary"}
                size="sm"
                className="py-1 px-4 text-xs font-bold gap-1"
                onClick={() => handleToggleConnect(int.id)}
              >
                <span>{int.isConnected ? "Disconnect" : "Connect"}</span>
              </Button>
            </div>

          </Card>
        ))}
      </div>

    </div>
  );
}
