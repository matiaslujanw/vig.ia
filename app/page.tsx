import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Operatives } from "@/components/Operatives";
import { Values } from "@/components/Values";
import { Services } from "@/components/Services";
import { Dashboard } from "@/components/Dashboard";
import { RiskMap } from "@/components/RiskMap";
import { Stats } from "@/components/Stats";
import { Process } from "@/components/Process";
import { Careers } from "@/components/Careers";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { WhatsApp } from "@/components/WhatsApp";
import { PageBackground } from "@/components/PageBackground";

export default function Page() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <PageBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Operatives />
        <Values />
        <Services />
        <Dashboard />
        <RiskMap />
        <Stats />
        <Process />
        <Careers />
        <CTA />
        <Footer />
        <WhatsApp />
      </div>
    </main>
  );
}
