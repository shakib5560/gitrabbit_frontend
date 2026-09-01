"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import {
  Check,
  Sparkles,
  CreditCard,
  Lock,
  Mail,
  User,
  Building,
  Zap,
  Shield,
  Infinity as InfinityIcon,
  Star,
  ArrowRight,
  Gift,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";


const pricingPlans = [
  {
    name: "Starter",
    price: "0",
    coins: "5",
    description: "Start your free trial — perfect for trying GitRabbit on side projects.",
    icon: Gift,
    color: "from-gray-700 to-gray-900",
    accentColor: "#6B7280",
    features: [
      "5 Rabbit Coins included (Free Trial)",
      "Basic AI PR Reviews",
      "Standard latency processing",
      "Community support",
      "GitHub Integration",
    ],
    buttonText: "Start Free Trial",
    popular: false,
  },
  {
    name: "Standard",
    price: "15",
    coins: "50",
    description: "Ideal for consistent individual developers.",
    icon: Zap,
    color: "from-blue-900 to-gray-900",
    accentColor: "#3B82F6",
    features: [
      "50 Rabbit Coins",
      "Advanced AI Insights",
      "Faster processing speed",
      "Priority email support",
      "Slack & IDE integrations",
    ],
    buttonText: "Purchase Coins",
    popular: false,
  },
  {
    name: "Power",
    price: "30",
    coins: "100",
    description: "The best value for high-velocity developers.",
    icon: Star,
    color: "from-yellow-900 to-gray-900",
    accentColor: "#F5C518",
    features: [
      "100 Rabbit Coins",
      "Deep Neural Code Analysis",
      "Priority execution queue",
      "Priority support channel",
      "All integrations included",
    ],
    buttonText: "Get Power Pack",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    coins: "∞",
    description: "For teams needing unlimited autonomous power.",
    icon: InfinityIcon,
    color: "from-purple-900 to-gray-900",
    accentColor: "#8B5CF6",
    features: [
      "Unlimited Rabbit Coins",
      "Custom AI model training",
      "SSO & security audit",
      "Dedicated support team",
      "Custom contracts & SLA",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
];

const FAQData = [
  {
    q: "What are Rabbit Coins?",
    a: "Rabbit Coins are credits that power every GitRabbit action — AI code reviews, deep analysis, test generation, and more. Each operation consumes a set amount of coins based on complexity.",
  },
  {
    q: "Do coins expire?",
    a: "No! Rabbit Coins never expire. Purchase when you need them, use them whenever you're ready.",
  },
  {
    q: "Can I top up anytime?",
    a: "Absolutely. You can purchase any coin pack anytime, and the balance stacks — no monthly limits.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! The Starter plan gives you 5 free Rabbit Coins as a free trial to experience full AI reviews with zero commitment.",
  },
];

// Floating particle component
function FloatingParticle({ delay, duration, x, y }: { delay: number; duration: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-brand-yellow rounded-full opacity-20"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.1, 0.5, 0.1],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border border-gray-800 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors cursor-pointer"
      >
        <span className="text-brand-white font-semibold text-sm">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-brand-yellow text-xl font-bold shrink-0 ml-4"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function PricingPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"form" | "loading" | "success">("form");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");

  const handlePlanClick = (plan: any) => {
    router.push("/login");
    return;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setCheckoutStep("loading");

    setTimeout(() => {
      let coinsToAdd = 0;
      let desc = "";

      if (selectedPlan.name === "Enterprise") {
        coinsToAdd = 500;
        desc = "Promo Balance (Enterprise Sales Request)";
      } else {
        coinsToAdd = parseInt(selectedPlan.coins, 10);
        desc = `Purchased ${selectedPlan.name} Plan`;
      }

      const currentCoins = localStorage.getItem("rabbit_coins");
      const balance = currentCoins ? parseInt(currentCoins, 10) : 50;
      const nextBalance = balance + coinsToAdd;
      localStorage.setItem("rabbit_coins", nextBalance.toString());

      const currentTxStr = localStorage.getItem("rabbit_coin_transactions");
      const currentTx = currentTxStr ? JSON.parse(currentTxStr) : [];
      const newTx = {
        id: Date.now(),
        type: "earn",
        amount: coinsToAdd,
        description: desc,
        time: "Just now",
      };
      localStorage.setItem("rabbit_coin_transactions", JSON.stringify([newTx, ...currentTx]));
      window.dispatchEvent(new Event("coins_updated"));
      setCheckoutStep("success");
    }, 1500);
  };

  // Particles config
  const particles = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 0.4,
    duration: 3 + (i % 4),
    x: (i * 47) % 100,
    y: (i * 31) % 100,
  }));

  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-brand-black font-mono overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 md:px-16 bg-pixel-grid overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Floating particles */}
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:flex-1 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-[10px] font-press-start uppercase px-4 py-2 mb-6"
              >
                <Sparkles className="w-3 h-3" />
                Credit-Based AI Reviews
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-press-start leading-tight text-brand-white mb-6">
                Rabbit{" "}
                <span className="relative inline-block text-brand-yellow">
                  Coins
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] bg-brand-yellow"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  />
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                GitRabbit runs on a credit-based system. Purchase Rabbit Coins to power your autonomous code reviews, AI refactors, test generation, and more.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start"
              >
                {[
                  { icon: Zap, label: "No subscriptions" },
                  { icon: Shield, label: "Coins never expire" },
                  { icon: Check, label: "Pay as you go" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-gray-400 text-sm">
                    <Icon className="w-4 h-4 text-brand-yellow" />
                    {label}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:flex-1 relative aspect-square max-w-sm w-full"
            >
              {/* Animated rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute inset-0 rounded-full border border-brand-yellow/10"
                  style={{
                    scale: 0.7 + ring * 0.15,
                    opacity: 0.5 / ring,
                  }}
                  animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 8 + ring * 4, repeat: Infinity, ease: "linear" }}
                />
              ))}
              <div className="absolute inset-0 bg-brand-yellow/10 blur-3xl rounded-full" />
              <Image
                src="/gcoin.png"
                alt="Rabbit Coins"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain relative z-10 brightness-110 drop-shadow-[0_0_40px_rgba(245,197,24,0.5)] animate-float"
              />
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1), duration: 0.6 }}
                  onHoverStart={() => setHoveredPlan(plan.name)}
                  onHoverEnd={() => setHoveredPlan(null)}
                  className={`relative flex flex-col p-6 bg-[#080808] border ${
                    plan.popular ? "border-brand-yellow/60" : "border-gray-900"
                  } rounded-sm group transition-all duration-500 cursor-pointer overflow-hidden`}
                  style={{
                    boxShadow:
                      hoveredPlan === plan.name
                        ? `0 0 40px ${plan.accentColor}20, 0 0 80px ${plan.accentColor}10`
                        : plan.popular
                        ? `0 0 20px ${plan.accentColor}15`
                        : "none",
                    borderColor:
                      hoveredPlan === plan.name
                        ? plan.accentColor + "80"
                        : plan.popular
                        ? plan.accentColor + "60"
                        : undefined,
                  }}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                  />

                  {/* Shimmer line at top */}
                  {plan.popular && (
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-yellow to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-yellow text-brand-black px-4 py-1 text-[7px] font-press-start uppercase tracking-tighter flex items-center gap-1">
                      <Star className="w-2 h-2" />
                      Best Value
                    </div>
                  )}

                  <div className="relative z-10 mb-6">
                    {/* Icon */}
                    <motion.div
                      className="w-10 h-10 rounded-sm flex items-center justify-center mb-4"
                      style={{ backgroundColor: plan.accentColor + "20", border: `1px solid ${plan.accentColor}30` }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-5 h-5" style={{ color: plan.accentColor }} />
                    </motion.div>

                    <div className="font-press-start text-[8px] uppercase tracking-widest mb-2 opacity-60" style={{ color: plan.accentColor }}>
                      {plan.name}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 relative">
                        <Image
                          src="/icon.png"
                          alt=""
                          fill
                          sizes="28px"
                          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <span className="text-brand-white text-2xl font-bold font-pixelify tracking-wide">
                        {plan.coins} COINS
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 mb-3">
                      {plan.price !== "Custom" ? (
                        <>
                          <motion.span
                            className="text-brand-white text-3xl font-bold font-pixelify tracking-tighter"
                            key={plan.price}
                          >
                            ${plan.price}
                          </motion.span>
                          <span className="text-gray-600 text-[9px] uppercase font-mono">/ One-time</span>
                        </>
                      ) : (
                        <span className="text-brand-white text-2xl font-bold font-pixelify uppercase">Custom</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed font-mono min-h-[40px]">{plan.description}</p>
                  </div>

                  <ul className="relative z-10 flex-1 space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-[11px] text-gray-400 font-mono group/item">
                        <Check
                          className="w-3 h-3 shrink-0 mt-0.5 transition-colors"
                          style={{ color: plan.accentColor }}
                          strokeWidth={3}
                        />
                        <span className="group-hover/item:text-gray-300 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => handlePlanClick(plan)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative z-10 w-full py-3.5 text-[9px] font-press-start uppercase transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      plan.popular
                        ? "bg-brand-yellow text-brand-black shadow-[4px_4px_0px_#FFFFFF] hover:brightness-110"
                        : "bg-gray-900 text-brand-white hover:text-brand-black shadow-[4px_4px_0px_#333333] hover:shadow-[4px_4px_0px_#FFFFFF]"
                    }`}
                    style={
                      !plan.popular && hoveredPlan === plan.name
                        ? { backgroundColor: plan.accentColor, color: "#000" }
                        : {}
                    }
                  >
                    {plan.buttonText}
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Value Comparison Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-900 border border-gray-900 rounded-xl overflow-hidden mb-24"
          >
            {[
              { label: "50 COINS", price: "$15", per: "$0.30 / coin", highlight: false },
              { label: "100 COINS", price: "$30", per: "$0.30 / coin — Best Value", highlight: true },
              { label: "Enterprise", price: "Custom", per: "Unlimited scale", highlight: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`p-6 flex flex-col items-center text-center ${
                  item.highlight ? "bg-brand-yellow/5 border border-brand-yellow/20" : "bg-[#0A0A0A]"
                }`}
              >
                <span className="text-gray-500 text-xs font-mono mb-1">{item.label}</span>
                <span className={`text-3xl font-bold font-pixelify mb-1 ${item.highlight ? "text-brand-yellow" : "text-brand-white"}`}>
                  {item.price}
                </span>
                <span className="text-gray-600 text-[10px] font-mono">{item.per}</span>
              </div>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <span className="text-brand-yellow text-xs tracking-widest font-mono uppercase mb-4 block">
                Frequently Asked
              </span>
              <h2 className="text-brand-white text-2xl md:text-3xl font-press-start">
                Common <span className="text-brand-yellow">Questions</span>
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {FAQData.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-[#0C0C0C] border border-brand-gray p-12 rounded-3xl relative overflow-hidden"
          >
            {/* Animated corner decorations */}
            <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-brand-yellow/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-brand-yellow/30 rounded-br-3xl" />
            <motion.div
              className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-yellow to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            <Sparkles className="w-8 h-8 text-brand-yellow mx-auto mb-6 opacity-60" />
            <h2 className="text-xl md:text-2xl font-press-start text-brand-white mb-6">
              Need something <span className="text-brand-yellow">different?</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              We offer flexible pricing for startups, non-profits, and open-source projects. Talk to our team to find the best fit for your organization.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-brand-yellow hover:text-brand-white font-mono text-sm uppercase tracking-widest transition-colors group"
            >
              Contact our sales team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Simulation Checkout Modal */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title={
          selectedPlan?.name === "Enterprise"
            ? "Enterprise Request"
            : selectedPlan?.price === "0"
            ? "Start Free Trial"
            : "Purchase Plan"
        }
      >
        {checkoutStep === "form" && selectedPlan && (
          <form onSubmit={handleCheckoutSubmit} className="space-y-4 font-sans select-none text-text-primary">
            <div className="bg-brand-yellow/5 border border-brand-yellow/20 rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-brand-yellow">{selectedPlan.name} Pack</h4>
                <p className="text-[11px] text-text-secondary mt-0.5">{selectedPlan.description}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-brand-white font-mono block">
                  {selectedPlan.coins} COINS
                </span>
                <span className="text-xs font-semibold text-text-secondary">
                  {selectedPlan.price === "0"
                    ? "Free"
                    : selectedPlan.price === "Custom"
                    ? "Let's Talk"
                    : `$${selectedPlan.price}`}
                </span>
              </div>
            </div>

            {selectedPlan.name === "Enterprise" ? (
              <>
                <p className="text-xs text-text-secondary">
                  Please submit details below. We'll credit your wallet with <span className="text-brand-yellow font-bold">500 free demo coins</span> instantly to help you explore.
                </p>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Your Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="text" placeholder="Alex Morgan" value={name} onChange={(e) => setName(e.target.value)} required className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Work Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="email" placeholder="alex@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Company Name</label>
                  <div className="relative">
                    <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="text" placeholder="Vercel Inc." value={company} onChange={(e) => setCompany(e.target.value)} required className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Usage Requirements (Optional)</label>
                  <textarea placeholder="We have 15 developers looking for daily AI reviews..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full px-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors resize-none" />
                </div>
              </>
            ) : selectedPlan.price === "0" ? (
              <>
                <p className="text-xs text-text-secondary">Ready to start your free trial? Starter coins are limited to one claim per account.</p>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="email" placeholder="alex@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="email" placeholder="alex@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Card Details</label>
                  <div className="relative">
                    <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input type="text" placeholder="4242 4242 4242 4242 (Simulated)" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors font-mono" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} required className="w-full px-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors font-mono" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">CVC</label>
                    <input type="text" placeholder="123" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} required className="w-full px-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors font-mono" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                  <Lock size={12} className="text-emerald-500" />
                  <span>Secure 256-bit SSL encrypted simulator checkout</span>
                </div>
              </>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t border-border-primary mt-6">
              <button type="button" onClick={() => setIsCheckoutOpen(false)} className="px-4 py-2 text-xs font-semibold rounded-xl border border-border-primary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 text-xs font-semibold rounded-xl bg-brand-yellow text-brand-black hover:brightness-110 transition-colors shadow-[2px_2px_0px_#FFFFFF] cursor-pointer">
                {selectedPlan.name === "Enterprise" ? "Submit Sales Query" : selectedPlan.price === "0" ? "Start Free Trial" : "Purchase Coins"}
              </button>
            </div>
          </form>
        )}

        {checkoutStep === "loading" && (
          <div className="flex flex-col items-center justify-center py-12 text-center select-none font-sans">
            <div className="w-10 h-10 rounded-full border-2 border-brand-yellow border-t-transparent animate-spin mb-4" />
            <h4 className="text-sm font-bold text-text-primary">Authorizing transaction...</h4>
            <p className="text-[11px] text-text-secondary mt-1 max-w-[240px]">
              Verifying credentials and transferring Rabbit Coins to your dashboard balance securely.
            </p>
          </div>
        )}

        {checkoutStep === "success" && selectedPlan && (
          <div className="flex flex-col items-center justify-center py-8 text-center select-none font-sans">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
              <Check size={24} />
            </div>
            <h4 className="text-base font-bold text-text-primary">
              {selectedPlan.name === "Enterprise" ? "Query Submitted!" : "Payment Successful!"}
            </h4>
            <p className="text-xs text-text-secondary mt-1.5 max-w-[280px]">
              {selectedPlan.name === "Enterprise"
                ? "Your query is received! We credited 500 promotional Rabbit Coins to your balance."
                : `Successfully claimed and credited ${selectedPlan.coins} Rabbit Coins to your account.`}
            </p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsCheckoutOpen(false)} className="px-4 py-2 text-xs font-semibold rounded-xl border border-border-primary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors cursor-pointer">
                Close
              </button>
              <Link href="/superadmin/dashboard" className="px-4 py-2 text-xs font-semibold rounded-xl bg-brand-yellow text-brand-black hover:brightness-110 transition-colors shadow-[2px_2px_0px_#FFFFFF] cursor-pointer">
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
