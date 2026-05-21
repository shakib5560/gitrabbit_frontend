"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, Sparkles, CreditCard, Lock, Mail, User, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";

const pricingPlans = [
  {
    name: "Starter",
    price: "0",
    coins: "25",
    description: "Perfect for trying out GitRabbit on your side projects.",
    features: [
      "25 Rabbit Coins",
      "Basic AI Reviews",
      "Standard Latency",
      "Community Support",
      "GitHub Integration",
    ],
    buttonText: "Claim Free Coins",
    popular: false,
  },
  {
    name: "Standard",
    price: "3",
    coins: "50",
    description: "Ideal for consistent individual developers.",
    features: [
      "50 Rabbit Coins",
      "Advanced AI Insights",
      "Faster Processing",
      "Email Support",
      "Slack Integration",
    ],
    buttonText: "Purchase Coins",
    popular: false,
  },
  {
    name: "Power",
    price: "5",
    coins: "100",
    description: "The best value for high-velocity developers.",
    features: [
      "100 Rabbit Coins",
      "Deep Neural Analysis",
      "Priority Execution",
      "Priority Support",
      "All Integrations",
    ],
    buttonText: "Get Power Pack",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    coins: "∞",
    description: "For teams needing unlimited autonomous power.",
    features: [
      "Unlimited Rabbit Coins",
      "Custom AI Training",
      "SSO & Security Audit",
      "Dedicated Support",
      "Custom Contracts",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"form" | "loading" | "success">("form");

  // Form states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");

  const handlePlanClick = (plan: any) => {
    setSelectedPlan(plan);
    setCheckoutStep("form");
    setIsCheckoutOpen(true);
    // Reset inputs
    setEmail("");
    setName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setCompany("");
    setNotes("");
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setCheckoutStep("loading");

    setTimeout(() => {
      // Process purchase
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

      // Add to transaction log
      const currentTxStr = localStorage.getItem("rabbit_coin_transactions");
      const currentTx = currentTxStr ? JSON.parse(currentTxStr) : [];
      const newTx = {
        id: Date.now(),
        type: "earn",
        amount: coinsToAdd,
        description: desc,
        time: "Just now"
      };
      localStorage.setItem("rabbit_coin_transactions", JSON.stringify([newTx, ...currentTx]));

      // Trigger coins update event
      window.dispatchEvent(new Event("coins_updated"));

      setCheckoutStep("success");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-brand-black font-mono">
      <Navbar />

      <div className="pt-40 pb-24 px-6 md:px-16 bg-pixel-grid relative">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:flex-1 text-center lg:text-left"
            >
              <h1 className="text-3xl md:text-5xl font-press-start leading-tight text-brand-white mb-6">
                Rabbit <span className="text-brand-yellow">Coins</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0">
                GitRabbit runs on a credit-based system. Purchase Rabbit Coins to power your autonomous code reviews and AI refactors.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:flex-1 relative aspect-square max-w-sm w-full"
            >
              <div className="absolute inset-0 bg-brand-yellow/10 blur-3xl rounded-full"></div>
              <Image
                src="/gcoin.png"
                alt="Rabbit Coins"
                fill
                className="object-contain relative z-10 brightness-110 drop-shadow-[0_0_20px_rgba(245,197,24,0.3)]"
              />
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className={`relative flex flex-col p-6 bg-[#080808] border ${plan.popular ? "border-brand-yellow/50" : "border-gray-900"
                  } rounded-sm group hover:border-brand-yellow transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-yellow text-brand-black px-3 py-1 text-[7px] font-press-start uppercase tracking-tighter">
                    Best Value
                  </div>
                )}

                <div className="mb-6">
                  <div className="text-brand-yellow font-press-start text-[8px] uppercase tracking-widest mb-2 opacity-60">
                    {plan.name}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 relative">
                      <Image src="/icon.png" alt="" fill className="object-contain grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <span className="text-brand-white text-2xl font-bold font-pixelify tracking-wide">{plan.coins} COINS</span>
                  </div>

                  <div className="flex items-baseline gap-1 mb-3">
                    {plan.price !== "Custom" ? (
                      <>
                        <span className="text-brand-white text-3xl font-bold font-pixelify tracking-tighter">${plan.price}</span>
                        <span className="text-gray-600 text-[9px] uppercase font-mono">/ One-time</span>
                      </>
                    ) : (
                      <span className="text-brand-white text-2xl font-bold font-pixelify uppercase">Custom</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed font-mono min-h-[40px]">{plan.description}</p>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[11px] text-gray-400 font-mono">
                      <Check className="w-3 h-3 text-brand-yellow shrink-0 mt-0.5" strokeWidth={4} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanClick(plan)}
                  className={`w-full py-3.5 text-[9px] font-press-start uppercase transition-all cursor-pointer ${plan.popular
                    ? "bg-brand-yellow text-brand-black shadow-[4px_4px_0px_#FFFFFF] hover:brightness-110 active:shadow-none translate-y-[-2px] active:translate-y-0"
                    : "bg-gray-900 text-brand-white hover:bg-brand-yellow hover:text-brand-black shadow-[4px_4px_0px_#333333] hover:shadow-[4px_4px_0px_#FFFFFF] active:shadow-none active:translate-y-0"
                    }`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            ))}
          </div>

          {/* FAQ or Bottom CTA */}
          <div className="text-center bg-[#0C0C0C] border border-brand-gray p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow"></div>
            <h2 className="text-xl md:text-2xl font-press-start text-brand-white mb-6">
              Need something <span className="text-brand-yellow">different?</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              We offer flexible pricing for startups, non-profits, and open-source projects.
              Talk to our team to find the best fit for your organization.
            </p>
            <Link
              href="/contact"
              className="inline-block text-brand-yellow hover:text-brand-white font-mono text-sm uppercase tracking-widest transition-colors"
            >
              Contact our sales team &rarr;
            </Link>
          </div>
        </div>
      </div>

      <Footer />

      {/* Simulation Checkout Modal */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title={
          selectedPlan?.name === "Enterprise"
            ? "Enterprise Request"
            : selectedPlan?.price === "0"
            ? "Claim Free Coins"
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
              // Enterprise Contact Form
              <>
                <p className="text-xs text-text-secondary">
                  Please submit details below. We'll credit your wallet with <span className="text-brand-yellow font-bold">500 free demo coins</span> instantly to help you explore.
                </p>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="email"
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Vercel Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                    Usage Requirements (Optional)
                  </label>
                  <textarea
                    placeholder="We have 15 developers looking for daily AI reviews..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors resize-none"
                  />
                </div>
              </>
            ) : selectedPlan.price === "0" ? (
              // Free Plan Confirmation
              <>
                <p className="text-xs text-text-secondary">
                  Ready to claim your free pack? Starter coins are limited to one claim per account.
                </p>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="email"
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors"
                    />
                  </div>
                </div>
              </>
            ) : (
              // Paid Plans Payment Form
              <>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="email"
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                    Card Details
                  </label>
                  <div className="relative">
                    <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242 (Simulated)"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors font-mono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                      className="w-full px-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      required
                      className="w-full px-4 py-2 text-xs rounded-xl border border-border-primary bg-bg-secondary text-text-primary focus:outline-none focus:border-brand-yellow transition-colors font-mono"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                  <Lock size={12} className="text-emerald-500" />
                  <span>Secure 256-bit SSL encrypted simulator checkout</span>
                </div>
              </>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t border-border-primary mt-6">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-border-primary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-brand-yellow text-brand-black hover:brightness-110 transition-colors shadow-[2px_2px_0px_#FFFFFF] cursor-pointer"
              >
                {selectedPlan.name === "Enterprise"
                  ? "Submit Sales Query"
                  : selectedPlan.price === "0"
                  ? "Claim Free Coins"
                  : "Purchase Coins"}
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
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-border-primary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/user/dashboard"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-brand-yellow text-brand-black hover:brightness-110 transition-colors shadow-[2px_2px_0px_#FFFFFF] cursor-pointer"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
