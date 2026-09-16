import { useEffect } from "react";
import { initLenis } from "./lib/lenis";
import { initGsapScrollTrigger, ScrollTrigger } from "./lib/gsap";
import { Navbar } from "./components/navigation/Navbar";
import { HeroShell } from "./components/hero/HeroShell";
import { ProductSystemsScaffold } from "./components/products/ProductSystemsScaffold";
import { FlowSystemScaffold } from "./components/flow-system/FlowSystemScaffold";
import { PumpFinderScaffold } from "./components/pump-finder/PumpFinderScaffold";
import { EngineeringScaffold } from "./components/engineering/EngineeringScaffold";
import { ApplicationsScaffold } from "./components/applications/ApplicationsScaffold";
import { CompanyScaffold } from "./components/company/CompanyScaffold";
import { QuoteScaffold } from "./components/quote/QuoteScaffold";
import { Footer } from "./components/footer/Footer";

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    initLenis();
    // Synchronize GSAP ScrollTrigger with Lenis
    initGsapScrollTrigger();

    // Refresh ScrollTrigger once the DOM layout is stable
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);


  return (
    <div className="min-h-screen bg-graphite-950 text-steel-200 font-sans selection:bg-precision-cyan/20 selection:text-white flex flex-col">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 01 — HERO */}
        <HeroShell />

        {/* 02 — PRODUCT SYSTEMS */}
        <ProductSystemsScaffold />

        {/* SIGNATURE INTERACTION — FLOW SYSTEM */}
        <FlowSystemScaffold />

        {/* 03 — FIND YOUR PUMP */}
        <PumpFinderScaffold />

        {/* 04 — APPLICATIONS */}
        <ApplicationsScaffold />

        {/* 05 — ENGINEERING & MANUFACTURING */}
        <EngineeringScaffold />

        {/* 06 — COMPANY */}
        <CompanyScaffold />

        {/* 07 — REQUEST A QUOTE */}
        <QuoteScaffold />
      </main>

      {/* 08 — FOOTER */}
      <Footer />
    </div>
  );
}
