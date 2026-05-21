"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  Settings, 
  User, 
  Key, 
  CreditCard, 
  Cpu, 
  Save, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff,
  Copy,
  Check
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string;
}

export function SettingsTab() {
  const [profileName, setProfileName] = useState("Alex Morgan");
  const [profileEmail, setProfileEmail] = useState("alex@example.com");
  const [selectedModel, setSelectedModel] = useState("gemini-3.5-flash");
  const [scanIntensity, setScanIntensity] = useState("Standard");
  const [autoApplyFixes, setAutoApplyFixes] = useState(false);

  // API Key management
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "key1",
      name: "Production CI/CD Key",
      prefix: "gr_live_41k9...",
      created: "May 10, 2026",
      lastUsed: "2 hours ago",
    },
    {
      id: "key2",
      name: "Staging Pipeline",
      prefix: "gr_test_89j2...",
      created: "May 15, 2026",
      lastUsed: "Never",
    }
  ]);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const randomVal = Math.random().toString(36).substring(2, 22).toUpperCase();
    const fullKey = `gr_live_${randomVal}`;
    setGeneratedKey(fullKey);

    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      prefix: `${fullKey.substring(0, 12)}...`,
      created: "Just now",
      lastUsed: "Never",
    };

    setApiKeys(prev => [newKey, ...prev]);
    setNewKeyName("");
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
  };

  const handleCopyKey = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSaveProfile = () => {
    alert("Profile settings saved successfully!");
  };

  return (
    <div className="space-y-8 font-sans select-none pb-12">
      
      {/* Overview Header */}
      <div>
        <h3 className="text-sm font-bold text-text-primary tracking-wide">
          Account & Configuration Settings
        </h3>
        <p className="text-xs text-text-secondary mt-0.5">
          Configure profile details, API integrations, and AI processing parameters
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Profile & Model settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Profile Details */}
          <Card hoverGlow={false} animate={true} className="bg-bg-secondary border-border-primary p-6">
            <div className="flex items-center gap-2 border-b border-border-primary pb-4 mb-4">
              <User size={16} className="text-brand-yellow" />
              <h4 className="text-sm font-bold text-text-primary">Profile Configuration</h4>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-border-primary bg-bg-primary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-border-primary bg-bg-primary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors font-sans"
                  />
                </div>
              </div>
              <Button onClick={handleSaveProfile} size="sm" className="font-bold flex items-center gap-1.5 shadow-sm text-xs">
                <Save size={14} />
                <span>Save Changes</span>
              </Button>
            </div>
          </Card>

          {/* AI Model Engine Parameters */}
          <Card hoverGlow={false} animate={true} delay={0.05} className="bg-bg-secondary border-border-primary p-6">
            <div className="flex items-center gap-2 border-b border-border-primary pb-4 mb-4">
              <Cpu size={16} className="text-brand-yellow" />
              <h4 className="text-sm font-bold text-text-primary">AI Engine Controls</h4>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider">Preferred AI Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-border-primary bg-bg-primary text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer transition-colors"
                  >
                    <option value="gemini-3.5-flash">Gemini 3.5 Flash (Recommended - High Speed)</option>
                    <option value="gemini-3.1-pro">Gemini 3.1 Pro (In-depth analysis)</option>
                    <option value="gpt-4o-mini">GPT-4o Mini (Alternative)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider">Default Audit Strictness</label>
                  <select
                    value={scanIntensity}
                    onChange={(e) => setScanIntensity(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-border-primary bg-bg-primary text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer transition-colors"
                  >
                    <option>Standard (Checks style, security, basic performance)</option>
                    <option>Strict (Exhaustive reviews, catches minor formatting and nits)</option>
                    <option>Lax (Only blocks high-priority errors)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-bg-primary border border-border-primary rounded-xl">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-text-primary">Auto-Apply AI suggestions</span>
                  <p className="text-[10px] text-text-secondary">Deduct coins and push commits directly to branches without approvals</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoApplyFixes}
                  onChange={(e) => setAutoApplyFixes(e.target.checked)}
                  className="w-4 h-4 accent-brand-yellow rounded cursor-pointer"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: API Keys block */}
        <div className="space-y-6">
          <Card hoverGlow={false} animate={true} delay={0.1} className="bg-bg-secondary border-border-primary p-6">
            <div className="flex items-center gap-2 border-b border-border-primary pb-4 mb-4">
              <Key size={16} className="text-brand-yellow" />
              <h4 className="text-sm font-bold text-text-primary">API Integration Keys</h4>
            </div>

            {/* Generated Key Prompt */}
            {generatedKey && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-xs space-y-2 mb-4">
                <span className="font-bold block">New Key Created! Copy now, you won&apos;t see it again.</span>
                <div className="flex items-center gap-2 bg-bg-primary p-2 rounded border border-border-primary w-full justify-between">
                  <span className="font-mono text-[10px] text-text-primary truncate mr-2 select-all">{generatedKey}</span>
                  <button 
                    onClick={handleCopyKey} 
                    className="p-1 text-emerald-500 hover:text-emerald-400 cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copiedKey ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-[9px] font-bold uppercase tracking-wider text-emerald-500 p-0 hover:bg-transparent"
                  onClick={() => setGeneratedKey(null)}
                >
                  Dismiss
                </Button>
              </div>
            )}

            {/* Create Key Form */}
            <form onSubmit={handleCreateKey} className="space-y-3 mb-6">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider">Key Label Name</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Jenkins Builder"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border-primary bg-bg-primary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors font-sans"
                  />
                  <Button type="submit" size="sm" className="font-bold flex items-center justify-center p-2.5 aspect-square">
                    <Plus size={14} />
                  </Button>
                </div>
              </div>
            </form>

            {/* Keys Listing */}
            <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Active Keys ({apiKeys.length})</span>
              {apiKeys.length === 0 ? (
                <div className="py-6 text-center border border-dashed border-border-primary rounded-xl">
                  <span className="text-[10px] font-bold text-text-muted">No API keys found.</span>
                </div>
              ) : (
                apiKeys.map((key) => (
                  <div key={key.id} className="flex justify-between items-center p-3 border border-border-primary bg-bg-primary/50 rounded-xl">
                    <div className="space-y-1 min-w-0">
                      <span className="text-xs font-bold text-text-primary block truncate">{key.name}</span>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-text-muted flex-wrap">
                        <span className="font-mono">{key.prefix}</span>
                        <span>•</span>
                        <span>Used {key.lastUsed}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteKey(key.id)}
                      className="p-1.5 text-text-muted hover:text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 rounded-lg transition-all cursor-pointer"
                      title="Revoke key"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))
              )}
            </div>

          </Card>
        </div>

      </div>

    </div>
  );
}
