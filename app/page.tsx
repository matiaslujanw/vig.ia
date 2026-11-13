import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Values } from "@/components/Values";
import { Services } from "@/components/Services";
import { Ecosystem } from "@/components/Ecosystem";
import { Dashboard } from "@/components/Dashboard";
import { Tracking } from "@/components/Tracking";
import { RiskMap } from "@/components/RiskMap";
import { Process } from "@/components/Process";
import { Careers } from "@/components/Careers";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { WhatsApp } from "@/components/WhatsApp";
import { MotionProvider } from "@/components/MotionProvider";
import { Marquee } from "@/components/fx";

const capabilities = [
  "Monitoreo 24/7",
  "Drones",
  "Cámaras LPR",
  "Accesos biométricos",
  "Tótem con IA",
  "Rastreo GPS",
  "Control de accesos",
  "Análisis de riesgo",
];
const promise = ["Prevenimos", "Controlamos", "Protegemos"];

export default function Page() {
  return (
    <MotionProvider>
      <Navbar />
      <main>
        <Hero />
        <Marquee items={capabilities} />
        <About />
        <Values />
        <Services />
        <Ecosystem />
        <Dashboard />
        <Tracking />
        <RiskMap />
        <Process />
        <Careers />
        <Marquee items={[...promise, ...promise]} reverse />
        <CTA />
      </main>
      <Footer />
      <WhatsApp />
    </MotionProvider>
  );
}
