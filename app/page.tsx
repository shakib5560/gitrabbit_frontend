import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { WorkflowSection } from "@/components/WorkflowSection";
import { StatsSection } from "@/components/StatsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-brand-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <StatsSection />
      <Footer />
    </main>
  );
}
