"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { 
  Users, 
  UserPlus, 
  Search, 
  Trash2, 
  Shield, 
  Clock, 
  Mail, 
  Check, 
  TrendingUp, 
  Activity,
  AlertCircle
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  github: string;
  role: "Owner" | "Admin" | "Reviewer" | "Developer" | "Viewer";
  avatar: string;
  status: "online" | "offline" | "away";
  joinedDate: string;
  metrics: {
    prsReviewed: number;
    fixesApproved: number;
    coinsSpent: number;
  };
}

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

export function TeamTab() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  
  // Invite Form States
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<"Admin" | "Reviewer" | "Developer" | "Viewer">("Developer");
  const [inviteGithub, setInviteGithub] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Alex Morgan",
      email: "alex@example.com",
      github: "alexm-dev",
      role: "Owner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      status: "online",
      joinedDate: "12 Mar 2026",
      metrics: { prsReviewed: 142, fixesApproved: 88, coinsSpent: 420 }
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah.c@example.com",
      github: "sarahc-codes",
      role: "Admin",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
      status: "online",
      joinedDate: "15 Mar 2026",
      metrics: { prsReviewed: 95, fixesApproved: 64, coinsSpent: 280 }
    },
    {
      id: "3",
      name: "Marcus Brodie",
      email: "marcus@example.com",
      github: "brodie-marcus",
      role: "Reviewer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      status: "away",
      joinedDate: "02 Apr 2026",
      metrics: { prsReviewed: 120, fixesApproved: 75, coinsSpent: 340 }
    },
    {
      id: "4",
      name: "David Kim",
      email: "d.kim@example.com",
      github: "dkim-rabbit",
      role: "Developer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      status: "online",
      joinedDate: "18 Apr 2026",
      metrics: { prsReviewed: 28, fixesApproved: 18, coinsSpent: 90 }
    },
    {
      id: "5",
      name: "Emma Watson",
      email: "emma@example.com",
      github: "emma-codes",
      role: "Viewer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      status: "offline",
      joinedDate: "05 May 2026",
      metrics: { prsReviewed: 4, fixesApproved: 2, coinsSpent: 10 }
    }
  ]);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    setIsSubmitting(true);
    
    // Simulate API Inviting member
    setTimeout(() => {
      const newMember: TeamMember = {
        id: (members.length + 1).toString(),
        name: inviteName,
        email: inviteEmail,
        github: inviteGithub || "pending-git",
        role: inviteRole,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?auto=format&fit=crop&w=100&q=80`,
        status: "offline",
        joinedDate: "Pending Invite",
        metrics: { prsReviewed: 0, fixesApproved: 0, coinsSpent: 0 }
      };

      setMembers(prev => [...prev, newMember]);
      setIsSubmitting(false);
      setInviteSuccess(true);

      // Reset Form after timeout
      setTimeout(() => {
        setInviteSuccess(false);
        setIsInviteOpen(false);
        setInviteEmail("");
        setInviteName("");
        setInviteGithub("");
      }, 1500);
    }, 1200);
  };

  const handleRemoveMember = (id: string) => {
    const memberToRemove = members.find(m => m.id === id);
    if (!memberToRemove) return;
    if (memberToRemove.role === "Owner") {
      alert("Cannot remove workspace Owner.");
      return;
    }

    if (confirm(`Are you sure you want to remove ${memberToRemove.name} from the workspace?`)) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleRoleChange = (id: string, newRole: any) => {
    setMembers(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, role: newRole };
      }
      return m;
    }));
  };

  const filteredMembers = members.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.github.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "All" || m.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Calculate totals
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === "online").length;
  const pendingMembers = members.filter(m => m.joinedDate === "Pending Invite").length;

  return (
    <div className="space-y-6 font-sans select-none">
      
      {/* Upper Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card hoverGlow={true} className="bg-bg-secondary border-border-primary p-6 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Total Members</span>
            <span className="text-2xl font-extrabold text-text-primary">{totalMembers} / 10 limit</span>
            <span className="text-[10px] text-text-muted block mt-1 font-mono">Workspace seats filled</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-yellow/5 border border-brand-yellow/15 flex items-center justify-center text-brand-yellow shadow-sm">
            <Users size={20} className="filter drop-shadow-[0_0_4px_#F5C518]" />
          </div>
        </Card>

        <Card hoverGlow={true} className="bg-bg-secondary border-border-primary p-6 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Active Now</span>
            <span className="text-2xl font-extrabold text-emerald-500 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              {activeMembers} Online
            </span>
            <span className="text-[10px] text-text-muted block mt-1 font-mono">Real-time collaborators</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-center text-emerald-500 shadow-sm">
            <Activity size={20} />
          </div>
        </Card>

        <Card hoverGlow={true} className="bg-bg-secondary border-border-primary p-6 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Pending Invites</span>
            <span className="text-2xl font-extrabold text-amber-500">{pendingMembers} Pending</span>
            <span className="text-[10px] text-text-muted block mt-1 font-mono">Awaiting email confirmations</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/5 border border-amber-500/15 flex items-center justify-center text-amber-500 shadow-sm">
            <Clock size={20} />
          </div>
        </Card>
      </div>

      {/* Action and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-bg-secondary border border-border-primary rounded-2xl p-4">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search name, email, github handle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-tertiary text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-yellow transition-colors font-sans"
          />
        </div>

        {/* Filters and Add Team */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-bg-tertiary border border-border-primary rounded-xl px-3 py-2 text-xs text-text-secondary focus:outline-none focus:border-brand-yellow cursor-pointer font-bold font-sans"
          >
            <option value="All">All Roles</option>
            <option value="Owner">Owners</option>
            <option value="Admin">Admins</option>
            <option value="Reviewer">Reviewers</option>
            <option value="Developer">Developers</option>
            <option value="Viewer">Viewers</option>
          </select>

          <Button 
            onClick={() => setIsInviteOpen(true)}
            className="text-xs font-bold py-2 flex items-center gap-1 shadow-sm"
          >
            <UserPlus size={14} />
            <span>Invite Collaborator</span>
          </Button>
        </div>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, idx) => (
          <Card 
            key={member.id} 
            hoverGlow={true} 
            delay={idx * 0.05} 
            className="bg-bg-secondary border-border-primary p-6 flex flex-col justify-between h-[320px]"
          >
            {/* Top Member Info Block */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                
                {/* Avatar and status */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-border-primary bg-bg-tertiary shadow-sm">
                      <img src={member.avatar} alt={member.name} className="object-cover w-full h-full" />
                    </div>
                    <span 
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-bg-secondary ${
                        member.status === "online" 
                          ? "bg-emerald-500" 
                          : member.status === "away" 
                            ? "bg-amber-500" 
                            : "bg-text-muted"
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary font-sans">{member.name}</h4>
                    <p className="text-[10px] text-text-muted font-mono">{member.email}</p>
                  </div>
                </div>

                {/* Role badge */}
                <Badge variant={
                  member.role === "Owner" 
                    ? "gold" 
                    : member.role === "Admin" 
                      ? "info" 
                      : member.role === "Reviewer" 
                        ? "warning" 
                        : member.role === "Developer" 
                          ? "success" 
                          : "default"
                } className="text-[9px]">
                  {member.role}
                </Badge>
              </div>

              {/* GitHub Link & Joined */}
              <div className="flex items-center justify-between text-[11px] font-bold text-text-secondary bg-bg-tertiary/40 border border-border-primary/30 rounded-xl px-3 py-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5 text-text-muted" />
                  <span>{member.github}</span>
                </span>
                <span className="text-text-muted text-[10px]">
                  Joined: {member.joinedDate}
                </span>
              </div>
            </div>

            {/* Middle statistics block */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-border-primary/50 text-center font-sans mt-4">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">PRs Reviewed</span>
                <span className="text-sm font-black text-text-primary mt-0.5">{member.metrics.prsReviewed}</span>
              </div>
              <div className="flex flex-col border-x border-border-primary/30">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Fixes Appr.</span>
                <span className="text-sm font-black text-emerald-500 mt-0.5">{member.metrics.fixesApproved}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Coins Spent</span>
                <span className="text-sm font-black text-brand-yellow mt-0.5">{member.metrics.coinsSpent}</span>
              </div>
            </div>

            {/* Footer options dropdown & action */}
            <div className="flex items-center justify-between mt-4">
              {member.role !== "Owner" ? (
                <div className="flex items-center gap-1.5 w-full justify-between">
                  <div className="flex items-center gap-1">
                    <Shield size={12} className="text-text-muted" />
                    <select
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.id, e.target.value)}
                      className="bg-transparent text-xs text-text-secondary border-none focus:outline-none cursor-pointer font-bold font-sans hover:text-text-primary"
                    >
                      <option value="Admin" className="bg-bg-secondary">Admin</option>
                      <option value="Reviewer" className="bg-bg-secondary">Reviewer</option>
                      <option value="Developer" className="bg-bg-secondary">Developer</option>
                      <option value="Viewer" className="bg-bg-secondary">Viewer</option>
                    </select>
                  </div>
                  
                  <button 
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-1.5 rounded-lg border border-border-primary hover:border-rose-500/30 hover:bg-rose-500/5 text-text-muted hover:text-rose-500 transition-all cursor-pointer"
                    title="Remove user"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ) : (
                <div className="text-[10px] text-text-muted italic flex items-center gap-1.5">
                  <Shield size={12} className="text-brand-yellow" />
                  <span>Workspace Administrator Control</span>
                </div>
              )}
            </div>

          </Card>
        ))}
      </div>

      {/* Invite Modal */}
      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite New Workspace Collaborator"
      >
        {inviteSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center select-none">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
              <Check size={24} />
            </div>
            <h4 className="text-base font-bold text-text-primary font-sans">Invitation Dispatched!</h4>
            <p className="text-xs text-text-secondary mt-1 font-sans">
              An invitation email link has been sent to {inviteEmail}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleInviteSubmit} className="space-y-4 font-sans select-none">
            
            <div className="p-3 border border-border-primary rounded-xl bg-bg-tertiary/20 flex gap-3 items-start">
              <AlertCircle size={16} className="text-brand-yellow shrink-0 mt-0.5" />
              <div className="text-[11px] text-text-secondary leading-relaxed">
                Invited members will consume 1 seat. Invited accounts can analyze repositories, inspect code reviews, and spend Rabbit Coins based on their role permissions.
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-all font-sans"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="john.doe@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-all font-sans"
              />
            </div>

            {/* GitHub Username */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                GitHub Username (Optional)
              </label>
              <input
                type="text"
                placeholder="johndoe-git"
                value={inviteGithub}
                onChange={(e) => setInviteGithub(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-all font-sans"
              />
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                Access Permission Level
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { r: "Admin", desc: "Manage billing, repos & users" },
                  { r: "Reviewer", desc: "Approve/write code reviews" },
                  { r: "Developer", desc: "Request repository scans" },
                  { r: "Viewer", desc: "Read reports & reviews only" }
                ].map((item) => (
                  <button
                    key={item.r}
                    type="button"
                    onClick={() => setInviteRole(item.r as any)}
                    className={`text-left p-3 border rounded-xl flex flex-col gap-1 transition-all cursor-pointer ${
                      inviteRole === item.r
                        ? "border-brand-yellow bg-brand-yellow/5"
                        : "border-border-primary bg-bg-secondary hover:bg-bg-tertiary"
                    }`}
                  >
                    <span className={`text-xs font-bold ${inviteRole === item.r ? "text-brand-yellow" : "text-text-primary"}`}>
                      {item.r}
                    </span>
                    <span className="text-[9.5px] text-text-muted leading-tight font-sans">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 justify-end pt-4 border-t border-border-primary/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsInviteOpen(false)}
                className="text-xs font-bold px-4 py-2 border-border-primary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="text-xs font-bold px-6 py-2"
              >
                {isSubmitting ? "Inviting..." : "Send Invitation"}
              </Button>
            </div>

          </form>
        )}
      </Modal>

    </div>
  );
}
