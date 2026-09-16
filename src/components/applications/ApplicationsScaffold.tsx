import React, { useState, useEffect, useRef } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Layers,
  ShieldAlert,
} from "lucide-react";
import { gsap } from "../../lib/gsap";

import appDomesticImg from "../../assets/app-domestic.jpg";
import appAgriculturalImg from "../../assets/app-agricultural.jpg";
import appOpenwellImg from "../../assets/app-openwell.jpg";
import appSubmersibleImg from "../../assets/app-submersible.jpg";
import appPressureBoostingImg from "../../assets/app-pressure-boosting.jpg";
import appWaterHandlingImg from "../../assets/app-water-handling.jpg";

interface ApplicationCategory {
  index: string;
  id: string;
  title: string;
  description: string;
  relevantFamilies: string[];
  image: string;
  imageAlt: string;
}

const applicationCategories: ApplicationCategory[] = [
  {
    index: "01",
    id: "domestic",
    title: "DOMESTIC",
    description: "Domestic water applications.",
    relevantFamilies: [
      "CENTRIFUGAL MONOBLOCK PUMPS",
      "SELF PRIMING PUMPS",
      "DOMESTIC PRESSURE BOOSTING SYSTEMS",
    ],
    image: appDomesticImg,
    imageAlt: "Domestic water application environment",
  },
  {
    index: "02",
    id: "agricultural",
    title: "AGRICULTURAL",
    description: "Agricultural water applications.",
    relevantFamilies: [
      "CENTRIFUGAL MONOBLOCK PUMPS",
      "SELF PRIMING PUMPS",
    ],
    image: appAgriculturalImg,
    imageAlt: "Agricultural water application environment",
  },
  {
    index: "03",
    id: "open-well",
    title: "OPEN WELL",
    description: "Open well water applications.",
    relevantFamilies: [
      "HORIZONTAL OPEN WELL PUMPS",
    ],
    image: appOpenwellImg,
    imageAlt: "Open well water application environment",
  },
  {
    index: "04",
    id: "submersible",
    title: "SUBMERSIBLE",
    description: "Submersible water applications.",
    relevantFamilies: [
      "STAINLESS STEEL SUBMERSIBLE PUMPSETS",
    ],
    image: appSubmersibleImg,
    imageAlt: "Submersible water application environment",
  },
  {
    index: "05",
    id: "pressure-boosting",
    title: "PRESSURE BOOSTING",
    description: "Domestic pressure boosting applications.",
    relevantFamilies: [
      "DOMESTIC PRESSURE BOOSTING SYSTEMS",
    ],
    image: appPressureBoostingImg,
    imageAlt: "Domestic pressure boosting application environment",
  },
  {
    index: "06",
    id: "water-handling",
    title: "GENERAL WATER HANDLING",
    description: "General water-handling applications.",
    relevantFamilies: [
      "Multiple product families may apply",
    ],
    image: appWaterHandlingImg,
    imageAlt: "General water-handling application environment",
  },
];

export const ApplicationsScaffold: React.FC = () => {
  const [activeAppIndex, setActiveAppIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualCardRef = useRef<HTMLDivElement>(null);
  const activeImageRef = useRef<HTMLImageElement>(null);

  const activeApp = applicationCategories[activeAppIndex];

  // GSAP Entrance
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
          clearProps: "opacity,transform",
        }
      );

      gsap.fromTo(
        ".application-row-item",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".application-list-container",
            start: "top 80%",
            once: true,
          },
          clearProps: "opacity,transform",
        }
      );

      gsap.fromTo(
        visualCardRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: visualCardRef.current,
            start: "top 80%",
            once: true,
          },
          clearProps: "opacity,transform",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Image transition on active application change
  const handleSelectApp = (index: number) => {
    if (index === activeAppIndex) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActiveAppIndex(index);

    if (!prefersReducedMotion && activeImageRef.current) {
      gsap.fromTo(
        activeImageRef.current,
        { opacity: 0.3, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToQuote = () => {
    const el = document.getElementById("quote");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="applications"
      ref={sectionRef}
      className="relative py-12 sm:py-16 border-b border-graphite-800 bg-graphite-950 technical-grid"
      aria-label="ForgeFlow Sample Application Map"
    >
      {/* Background Ambience */}
      <div
        className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(14,165,233,0.04)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 space-y-8 sm:space-y-12">
        
        {/* 1. Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-graphite-850">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-precision-cyan tracking-widest uppercase">
                [ 04 ]
              </span>
              <span className="text-graphite-800">/</span>
              <span className="font-mono text-xs text-steel-500 tracking-widest uppercase">
                APPLICATIONS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white uppercase leading-[1.02] mb-4">
              BUILT FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-steel-200 to-steel-400">
                REAL-WORLD FLOW.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-steel-300 font-sans leading-relaxed">
              Explore sample environments and applications demonstrating how industrial products map to operating requirements.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2 self-start lg:self-auto">
            <Badge variant="accent" indicator className="py-1 px-3 text-[11px] font-mono">
              6 SAMPLE APPLICATION DOMAINS
            </Badge>
            <span className="font-mono text-[10px] text-steel-500">
              SAMPLE APPLICATION MAP
            </span>
          </div>
        </div>

        {/* 2. Interactive Application Map: Asymmetric Featured Visual + Editorial List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT COLUMN: Featured Application Visual & Relevant Systems */}
          <div
            ref={visualCardRef}
            className="lg:col-span-7 flex flex-col justify-between rounded-sm border border-steel-700/80 bg-graphite-900 shadow-2xl overflow-hidden precision-corner"
          >
            {/* Top Technical Metadata Bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-graphite-950 border-b border-graphite-800 font-mono text-xs text-steel-400">
              <div className="flex items-center gap-2.5">
                <span className="text-precision-cyan font-bold">[{activeApp.index}]</span>
                <span className="text-white uppercase tracking-wider font-semibold">
                  {activeApp.title} WATER INFRASTRUCTURE
                </span>
              </div>
              <span className="text-[10px] text-steel-600 hidden sm:inline">
                REPRESENTATIVE TOPOLOGY
              </span>
            </div>

            {/* Featured Atmospheric Image Stage */}
            <div className="relative aspect-[16/10] w-full bg-graphite-950 overflow-hidden border-b border-graphite-850">
              <img
                ref={activeImageRef}
                src={activeApp.image}
                alt={activeApp.imageAlt}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 industrial-vignette pointer-events-none" />

              <div className="absolute bottom-3 left-3 bg-graphite-950/90 backdrop-blur-xs px-2.5 py-1 border border-graphite-800 rounded-xs font-mono text-[10px] text-steel-400">
                TOPOLOGY // {activeApp.title}
              </div>
            </div>

            {/* Context & Relevant Product Systems */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-precision-cyan uppercase tracking-wider mb-2">
                  <Layers className="w-4 h-4" />
                  <span>APPLICATION CONTEXT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white uppercase tracking-tight mb-3">
                  {activeApp.title}
                </h3>
                <p className="text-sm sm:text-base text-steel-200 font-sans leading-relaxed">
                  {activeApp.description}
                </p>
              </div>

              {/* Potentially Relevant Systems */}
              <div className="p-5 bg-graphite-950 rounded-sm border border-graphite-850 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-steel-400">
                  <span className="uppercase text-steel-300 font-semibold tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-precision-cyan" />
                    POTENTIALLY RELEVANT PRODUCT FAMILIES
                  </span>
                  <span className="text-[10px] text-steel-600 hidden sm:inline">INDICATIVE</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {activeApp.relevantFamilies.map((fam) => (
                    <span
                      key={fam}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-graphite-900 border border-steel-700/60 font-mono text-xs text-steel-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-precision-cyan" />
                      {fam}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] font-mono text-steel-500 pt-2 border-t border-graphite-900 leading-relaxed">
                  * Application guidance is indicative. Final product selection depends on the specific installation and technical requirements.
                </p>
              </div>

              {/* Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
                <Button
                  variant="outline"
                  size="md"
                  onClick={scrollToProducts}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="justify-between"
                  aria-label="View Product Systems"
                >
                  VIEW PRODUCT SYSTEMS
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={scrollToQuote}
                  icon={<ArrowUpRight className="w-4 h-4" />}
                  className="justify-between"
                  aria-label="Discuss Your Application"
                >
                  DISCUSS YOUR APPLICATION
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Selectable Vertical Editorial Application Rows */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3 application-list-container">
            <div className="font-mono text-xs text-steel-400 uppercase tracking-widest mb-1 px-1 flex items-center justify-between">
              <span>SELECT AN APPLICATION DOMAIN</span>
              <span className="text-steel-600 text-[10px]">01 — 06</span>
            </div>

            <div className="space-y-3">
              {applicationCategories.map((app, index) => {
                const isActive = index === activeAppIndex;
                return (
                  <button
                    key={app.id}
                    onClick={() => handleSelectApp(index)}
                    className={`application-row-item w-full p-4 sm:p-5 rounded-sm border text-left transition-all duration-200 flex items-start justify-between gap-4 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-precision-cyan min-h-[56px] ${
                      isActive
                        ? "bg-graphite-900 border-precision-cyan text-white shadow-[0_0_20px_rgba(14,165,233,0.15)]"
                        : "bg-graphite-900/60 border-graphite-800 text-steel-400 hover:border-steel-600 hover:bg-graphite-900 hover:text-steel-200"
                    }`}
                    aria-selected={isActive}
                    role="tab"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isActive ? "text-precision-cyan" : "text-steel-600"
                          }`}
                        >
                          [{app.index}]
                        </span>
                        <h4 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-white">
                          {app.title}
                        </h4>
                      </div>
                      <p className="text-xs text-steel-400 font-sans pl-7 leading-relaxed">
                        {app.description}
                      </p>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                        isActive
                          ? "border-precision-cyan bg-precision-cyan text-graphite-950"
                          : "border-graphite-800"
                      }`}
                    >
                      {isActive && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Quick Indicator */}
            <div className="p-4 rounded-sm bg-graphite-950 border border-graphite-850 font-mono text-[11px] text-steel-400 flex items-start gap-2.5 mt-4">
              <ShieldAlert className="w-4 h-4 text-steel-500 shrink-0 mt-0.5" />
              <span>
                Sample application mapping demonstrating how industrial equipment can be matched to diverse operating environments.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
