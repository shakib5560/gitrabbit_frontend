"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Hash, 
  Plus, 
  Smile, 
  Paperclip, 
  Users,
  Circle,
  GitPullRequest,
  ShieldAlert,
  Sparkles,
  MoreVertical,
  Pin,
  Trash2,
  Copy
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface Message {
  id: string;
  author: string;
  avatar: string;
  role: "Owner" | "Admin" | "Reviewer" | "Developer" | "Viewer";
  content: string;
  timestamp: string;
  reactions: { emoji: string; count: number; reacted: boolean }[];
  isPinned?: boolean;
  type: "text" | "system" | "ai-alert";
}

interface Channel {
  id: string;
  name: string;
  description: string;
  icon: string;
  unread: number;
  isActive: boolean;
  category: "general" | "code" | "alerts";
}

const MEMBERS_ONLINE = [
  { name: "Alex Morgan", role: "Owner", status: "online", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80" },
  { name: "Sarah Chen", role: "Admin", status: "online", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=60&q=80" },
  { name: "Marcus Brodie", role: "Reviewer", status: "away", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80" },
  { name: "David Kim", role: "Developer", status: "online", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80" },
  { name: "Emma Watson", role: "Viewer", status: "offline", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80" },
];

const CHANNELS: Channel[] = [
  { id: "general", name: "general", description: "Team-wide announcements", icon: "💬", unread: 0, isActive: true, category: "general" },
  { id: "code-reviews", name: "code-reviews", description: "PR discussions and review threads", icon: "🔍", unread: 4, isActive: false, category: "code" },
  { id: "ai-alerts", name: "ai-alerts", description: "GitRabbit AI critical detections", icon: "🤖", unread: 2, isActive: false, category: "alerts" },
  { id: "deployments", name: "deployments", description: "CI/CD pipeline notifications", icon: "🚀", unread: 0, isActive: false, category: "code" },
  { id: "security", name: "security", description: "Security scan outputs & CVE notices", icon: "🛡️", unread: 1, isActive: false, category: "alerts" },
];

const MESSAGES_BY_CHANNEL: Record<string, Message[]> = {
  general: [
    {
      id: "g1", author: "Alex Morgan", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80",
      role: "Owner", content: "Hey team! Just finished setting up the new GitRabbit workspace. Everyone please connect your repos this week.",
      timestamp: "09:14 AM", reactions: [{ emoji: "👍", count: 3, reacted: false }, { emoji: "🔥", count: 2, reacted: false }], isPinned: true, type: "text"
    },
    {
      id: "g2", author: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=60&q=80",
      role: "Admin", content: "Done! Just linked frontend-app and api-service. The AST scan is already picking up some issues in the payment module 👀",
      timestamp: "09:31 AM", reactions: [{ emoji: "😬", count: 2, reacted: false }], type: "text"
    },
    {
      id: "g3", author: "GitRabbit AI", avatar: "/icon.png",
      role: "Admin", content: "🤖 **System Alert** — Scan complete on `api-service/payments.ts`. Found 3 critical issues: SQL injection risk on line 84, unhandled async exception on line 127, unused import block on lines 3–7.",
      timestamp: "09:32 AM", reactions: [], type: "ai-alert"
    },
    {
      id: "g4", author: "Marcus Brodie", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80",
      role: "Reviewer", content: "On it! Assigning the SQL injection fix to David. David, check the PR comment thread in #code-reviews.",
      timestamp: "09:45 AM", reactions: [{ emoji: "✅", count: 1, reacted: false }], type: "text"
    },
    {
      id: "g5", author: "David Kim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80",
      role: "Developer", content: "Got it! Already opened a branch `fix/payment-sql-sanitize`. PR up by EOD 🫡",
      timestamp: "10:01 AM", reactions: [{ emoji: "🚀", count: 3, reacted: false }], type: "text"
    },
  ],
  "code-reviews": [
    {
      id: "cr1", author: "Marcus Brodie", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80",
      role: "Reviewer", content: "PR #47 `feat/auth-tokens` — Left 5 inline comments. The JWT expiry logic is wrong. `expiresIn` needs to be `'15m'` not `'150m'`. Critical!",
      timestamp: "08:55 AM", reactions: [{ emoji: "🔍", count: 2, reacted: false }], isPinned: true, type: "text"
    },
    {
      id: "cr2", author: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=60&q=80",
      role: "Admin", content: "Added `LGTM` on `feat/dashboard-tabs`. Clean component structure. Approve when CI passes.",
      timestamp: "09:10 AM", reactions: [{ emoji: "💯", count: 1, reacted: false }], type: "text"
    },
  ],
  "ai-alerts": [
    {
      id: "aa1", author: "GitRabbit AI", avatar: "/icon.png",
      role: "Admin", content: "🚨 **CRITICAL** — `mobile-app/AuthController.kt`: Hardcoded API key detected on line 22. Secret exposure risk! Rotate key immediately and use environment variables.",
      timestamp: "07:30 AM", reactions: [], type: "ai-alert"
    },
    {
      id: "aa2", author: "GitRabbit AI", avatar: "/icon.png",
      role: "Admin", content: "⚠️ **HIGH** — `api-service/caching.go`: Memory leak pattern found. Goroutine created inside loop at line 55 with no termination signal.",
      timestamp: "08:15 AM", reactions: [], type: "ai-alert"
    },
  ],
  deployments: [
    {
      id: "d1", author: "GitRabbit AI", avatar: "/icon.png",
      role: "Admin", content: "✅ **CI PASS** — `main` branch build pipeline completed successfully. 11/11 pages compiled. Deploying to Vercel production...",
      timestamp: "10:22 AM", reactions: [{ emoji: "🎉", count: 4, reacted: false }], type: "ai-alert"
    },
  ],
  security: [
    {
      id: "s1", author: "GitRabbit AI", avatar: "/icon.png",
      role: "Admin", content: "🛡️ **SOC-2 Audit Complete** — November security report generated. Zero critical violations. 2 medium-severity findings flagged for remediation.",
      timestamp: "Yesterday", reactions: [], type: "ai-alert"
    },
  ],
};

export function ChatTab() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>(MESSAGES_BY_CHANNEL);
  const [channels, setChannels] = useState<Channel[]>(CHANNELS);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [hoveredMsg, setHoveredMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChannelData = channels.find(c => c.id === activeChannel)!;
  const currentMessages = messages[activeChannel] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChannel, messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      author: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80",
      role: "Owner",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reactions: [],
      type: "text",
    };

    setMessages(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg],
    }));
    setInput("");
  };

  const handleReaction = (channelId: string, msgId: string, emoji: string) => {
    setMessages(prev => ({
      ...prev,
      [channelId]: prev[channelId].map(m => {
        if (m.id !== msgId) return m;
        const existing = m.reactions.find(r => r.emoji === emoji);
        if (existing) {
          return {
            ...m,
            reactions: m.reactions.map(r =>
              r.emoji === emoji ? { ...r, count: r.reacted ? r.count - 1 : r.count + 1, reacted: !r.reacted } : r
            ),
          };
        }
        return { ...m, reactions: [...m.reactions, { emoji, count: 1, reacted: true }] };
      }),
    }));
  };

  const handleChannelSwitch = (id: string) => {
    setActiveChannel(id);
    setChannels(prev => prev.map(c => ({ ...c, unread: c.id === id ? 0 : c.unread })));
  };

  const roleColor: Record<string, string> = {
    Owner: "text-brand-yellow",
    Admin: "text-sky-400",
    Reviewer: "text-amber-400",
    Developer: "text-emerald-400",
    Viewer: "text-text-muted",
  };

  return (
    <div className="flex h-[calc(100vh-180px)] min-h-[600px] rounded-2xl border border-border-primary bg-bg-secondary overflow-hidden shadow-xl select-none">

      {/* ─── Left: Channel Sidebar ─── */}
      <aside className="w-56 shrink-0 flex flex-col border-r border-border-primary bg-bg-tertiary/30 py-4">
        <div className="px-4 mb-4">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Workspace</p>
          <h2 className="text-sm font-black text-text-primary mt-0.5 font-sans">GitRabbit HQ</h2>
        </div>

        {/* Channel groups */}
        {(["general", "code", "alerts"] as const).map(cat => (
          <div key={cat} className="mb-2">
            <p className="px-4 text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">
              {cat === "general" ? "💬 General" : cat === "code" ? "🔧 Dev Channels" : "🚨 Alert Feeds"}
            </p>
            {channels.filter(c => c.category === cat).map(channel => (
              <button
                key={channel.id}
                onClick={() => handleChannelSwitch(channel.id)}
                className={`w-full flex items-center justify-between px-4 py-1.5 text-xs font-bold transition-all cursor-pointer rounded-none ${
                  activeChannel === channel.id
                    ? "bg-brand-yellow/10 text-brand-yellow border-l-2 border-brand-yellow"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                }`}
              >
                <span className="flex items-center gap-1.5 font-mono">
                  <Hash size={11} className="shrink-0" />
                  <span className="truncate max-w-[100px]">{channel.name}</span>
                </span>
                {channel.unread > 0 && (
                  <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 rounded-full min-w-[18px] text-center">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}

        {/* New Channel button */}
        <button className="mx-4 mt-3 flex items-center gap-1.5 text-[10px] font-bold text-text-muted hover:text-brand-yellow transition-colors cursor-pointer">
          <Plus size={12} />
          <span>Add Channel</span>
        </button>
      </aside>

      {/* ─── Center: Message Area ─── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-border-primary bg-bg-secondary/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{activeChannelData.icon}</span>
            <div>
              <h3 className="text-sm font-black text-text-primary font-mono">#{activeChannelData.name}</h3>
              <p className="text-[10px] text-text-muted font-sans">{activeChannelData.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-bg-tertiary text-text-muted hover:text-text-primary transition-colors cursor-pointer">
              <Search size={15} />
            </button>
            <button
              onClick={() => setShowRightPanel(!showRightPanel)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${showRightPanel ? "bg-brand-yellow/10 text-brand-yellow" : "hover:bg-bg-tertiary text-text-muted hover:text-text-primary"}`}
            >
              <Users size={15} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1 scrollbar-thin">
          <AnimatePresence initial={false}>
            {currentMessages.map((msg, idx) => {
              const isFirst = idx === 0 || currentMessages[idx - 1].author !== msg.author;
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredMsg(msg.id)}
                  onMouseLeave={() => setHoveredMsg(null)}
                  className={`group flex gap-3 relative hover:bg-bg-tertiary/30 rounded-xl px-2 transition-colors ${isFirst ? "mt-4 pt-1" : "pt-0.5"}`}
                >
                  {/* Avatar — only show on first in group */}
                  <div className="shrink-0 w-8 mt-0.5">
                    {isFirst ? (
                      <div className={`w-8 h-8 rounded-full overflow-hidden border ${msg.type === "ai-alert" ? "border-brand-yellow/30 bg-brand-yellow/5" : "border-border-primary bg-bg-tertiary"}`}>
                        <img src={msg.avatar} alt={msg.author} className="object-cover w-full h-full" />
                      </div>
                    ) : null}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {isFirst && (
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className={`text-xs font-black ${msg.type === "ai-alert" ? "text-brand-yellow" : roleColor[msg.role] || "text-text-primary"}`}>
                          {msg.author}
                        </span>
                        {isFirst && <Badge variant={msg.role === "Owner" ? "gold" : msg.role === "Admin" ? "info" : "default"} className="text-[8px] py-0 px-1.5">{msg.role}</Badge>}
                        {msg.isPinned && <span className="text-[9px] text-amber-500 font-bold flex items-center gap-0.5"><Pin size={9} /> Pinned</span>}
                        <span className="text-[10px] text-text-muted font-mono">{msg.timestamp}</span>
                      </div>
                    )}

                    {/* Message bubble */}
                    <div className={`text-xs leading-relaxed font-sans ${
                      msg.type === "ai-alert"
                        ? "bg-brand-yellow/5 border border-brand-yellow/15 rounded-xl px-3 py-2 text-text-secondary"
                        : "text-text-secondary"
                    }`}>
                      {msg.content}
                    </div>

                    {/* Reactions */}
                    {msg.reactions.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        {msg.reactions.map(r => (
                          <button
                            key={r.emoji}
                            onClick={() => handleReaction(activeChannel, msg.id, r.emoji)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold transition-all cursor-pointer ${
                              r.reacted
                                ? "bg-brand-yellow/10 border-brand-yellow/30 text-brand-yellow"
                                : "bg-bg-tertiary border-border-primary text-text-muted hover:border-brand-yellow/30"
                            }`}
                          >
                            <span>{r.emoji}</span>
                            <span>{r.count}</span>
                          </button>
                        ))}
                        {/* Add reaction */}
                        {hoveredMsg === msg.id && (
                          <button
                            onClick={() => handleReaction(activeChannel, msg.id, "👍")}
                            className="px-1.5 py-0.5 rounded-full border border-border-primary bg-bg-tertiary text-text-muted hover:text-brand-yellow hover:border-brand-yellow/30 text-[10px] transition-all cursor-pointer"
                          >
                            + 😊
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Hover action bar */}
                  {hoveredMsg === msg.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-2 top-1 flex items-center gap-0.5 bg-bg-secondary border border-border-primary rounded-lg px-1 py-0.5 shadow-lg z-10"
                    >
                      {["👍", "🔥", "✅", "❤️"].map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => handleReaction(activeChannel, msg.id, emoji)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-bg-tertiary text-sm cursor-pointer transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                      <div className="w-px h-4 bg-border-primary mx-0.5" />
                      <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-bg-tertiary text-text-muted cursor-pointer transition-colors">
                        <MoreVertical size={12} />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="px-6 py-4 border-t border-border-primary shrink-0">
          <div className="flex items-center gap-3 bg-bg-tertiary border border-border-primary rounded-2xl px-4 py-3 focus-within:border-brand-yellow/50 transition-colors">
            <button className="text-text-muted hover:text-brand-yellow transition-colors cursor-pointer shrink-0">
              <Plus size={16} />
            </button>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder={`Message #${activeChannelData.name}...`}
              className="flex-1 bg-transparent text-xs text-text-primary placeholder:text-text-muted focus:outline-none font-sans"
            />
            <div className="flex items-center gap-2 shrink-0">
              <button className="text-text-muted hover:text-brand-yellow transition-colors cursor-pointer">
                <Paperclip size={15} />
              </button>
              <button className="text-text-muted hover:text-brand-yellow transition-colors cursor-pointer">
                <Smile size={15} />
              </button>
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-7 h-7 rounded-xl bg-brand-yellow text-black flex items-center justify-center hover:bg-[#e0b410] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
          <p className="text-[9px] text-text-muted mt-1.5 px-1 font-mono">
            Press <kbd className="bg-bg-tertiary border border-border-primary rounded px-1">Enter</kbd> to send • <kbd className="bg-bg-tertiary border border-border-primary rounded px-1">Shift+Enter</kbd> for newline
          </p>
        </div>
      </div>

      {/* ─── Right: Members Panel ─── */}
      <AnimatePresence>
        {showRightPanel && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 196, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="shrink-0 border-l border-border-primary bg-bg-tertiary/20 py-4 overflow-hidden"
          >
            <div className="px-4 mb-3">
              <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">
                Online — {MEMBERS_ONLINE.filter(m => m.status === "online").length}
              </p>
            </div>
            <div className="space-y-0.5 px-2">
              {MEMBERS_ONLINE.map(member => (
                <div
                  key={member.name}
                  className={`flex items-center gap-2.5 px-2 py-2 rounded-xl cursor-pointer transition-colors hover:bg-bg-tertiary ${member.status === "offline" ? "opacity-40" : ""}`}
                >
                  <div className="relative shrink-0">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-border-primary">
                      <img src={member.avatar} alt={member.name} className="object-cover w-full h-full" />
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-bg-secondary ${
                      member.status === "online" ? "bg-emerald-500" : member.status === "away" ? "bg-amber-500" : "bg-text-muted"
                    }`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-text-primary truncate font-sans">{member.name}</p>
                    <p className={`text-[9px] font-bold truncate ${roleColor[member.role] || "text-text-muted"}`}>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 mt-5">
              <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-2">Offline — {MEMBERS_ONLINE.filter(m => m.status === "offline").length}</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

    </div>
  );
}
