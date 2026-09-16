import React, { useEffect, useRef } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  ArrowUpRight,
  Compass,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { gsap } from "../../lib/gsap";

const conceptMetadata = [
  { index: "01", label: "CONCEPT TYPE", value: "INDUSTRIAL DIGITAL SHOWCASE" },
  { index: "02", label: "ARCHITECTURE", value: "REACT + TYPESCRIPT + VITE" },
  { index: "03", label: "CAPABILITIES", value: "CATALOGUE, FINDER & RFQ FLOW" },
  { index: "04", label: "DESIGN SYSTEM", value: "PRECISION GRAPHITE UI" },
];

const conceptPillars = [
  {
    index: "01",
    tag: "CATALOGUE",
    title: "STRUCTURED PRODUCT ARCHITECTURE",
    desc: "Multi-family industrial product catalogues with high-density technical cards, modal views, and application categorization.",
    icon: Layers,
  },
  {
    index: "02",
    tag: "SELECTOR",
    title: "INTERACTIVE PRODUCT FINDER",
    desc: "Guided multi-step decision engine translating operational requirements into tailored product family recommendations.",
    icon: Compass,
  },
  {
    index: "03",
    tag: "LEAD GEN",
    title: "HIGH-CONVERSION RFQ ENGINE",
    desc: "Engineered commercial enquiry flow with spec prefill, document attachment, and validation designed for technical buyers.",
    icon: Cpu,
  },
];

export const CompanyScaffold: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
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

      // Split dossier reveal
      gsap.fromTo(
        splitRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: splitRef.current,
            start: "top 80%",
            once: true,
          },
          clearProps: "opacity,transform",
        }
      );

      // Trust strip cards reveal
      const cards = trustRef.current?.querySelectorAll(".trust-signal-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: trustRef.current,
              start: "top 80%",
              once: true,
            },
            clearProps: "opacity,transform",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToQuote = () => {
    const el = document.getElementById("quote");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="company"
      ref={sectionRef}
      className="relative py-12 sm:py-16 border-b border-graphite-800 bg-graphite-950 technical-grid"
      aria-label="About the ForgeFlow Concept"
    >
      {/* Background Ambience */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(14,165,233,0.03)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 space-y-10 sm:space-y-14">
        
        {/* 1. Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-graphite-850">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-precision-cyan tracking-widest uppercase">
                [ 06 ]
              </span>
              <span className="text-graphite-800">/</span>
              <span className="font-mono text-xs text-steel-500 tracking-widest uppercase">
                ABOUT THE CONCEPT
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white uppercase leading-[1.02] mb-4">
              BUILT FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-steel-200 to-steel-400">
                INDUSTRIAL BRANDS.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-steel-300 font-sans leading-relaxed">
              ForgeFlow is a website concept demonstrating how an industrial manufacturer can present products, applications, engineering capabilities and enquiries through a modern digital experience.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2 self-start lg:self-auto">
            <Badge variant="accent" indicator className="py-1 px-3 text-[11px] font-mono">
              CONCEPT SHOWCASE
            </Badge>
            <span className="font-mono text-[10px] text-steel-500">
              DIGITAL ARCHITECTURE
            </span>
          </div>
        </div>

        {/* 2. Main Asymmetric Editorial Split Composition */}
        <div ref={splitRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* LEFT: Typography Statement, Profile & Abstract Blueprint Frame */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-precision-cyan uppercase tracking-widest">
                <Compass className="w-4 h-4" />
                <span>AGENCY CONCEPT // DEMO ARCHITECTURE</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white uppercase tracking-tight leading-[1.05]">
                ENGINEERED FOR <br />
                <span className="text-steel-400">PRECISION & SCALE.</span>
              </h3>

              <p className="text-base sm:text-lg text-steel-200 font-sans leading-relaxed">
                ForgeFlow is designed as a reusable agency showcase demonstrating modern web standards for manufacturers, engineering firms, and technical B2B companies.
              </p>

              <p className="text-sm sm:text-base text-steel-400 font-sans leading-relaxed pt-2 border-t border-graphite-850">
                From fluid Lenis smooth scrolling and robust GSAP animations to responsive data architectures, it proves how industrial websites can feel state-of-the-art while remaining highly functional.
              </p>
            </div>

            {/* Abstract Platform Blueprint Visual */}
            <div className="rounded-sm border border-steel-700/60 bg-graphite-900 p-6 precision-corner space-y-4">
              <div className="flex items-center justify-between font-mono text-[11px] text-steel-400 pb-3 border-b border-graphite-800">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-precision-cyan" />
                  <span className="text-white font-semibold uppercase">FORGEFLOW PLATFORM</span>
                </div>
                <span className="text-steel-500">SHOWCASE ENVIRONMENT</span>
              </div>

              {/* Minimal Geometric Blueprint Frame */}
              <div className="relative aspect-[16/6] w-full bg-graphite-950 rounded-sm border border-graphite-850 overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 technical-grid opacity-60" />
                
                {/* Abstract Vector Coordinates */}
                <div className="relative z-10 text-center space-y-1 font-mono">
                  <div className="text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
                    FORGEFLOW // DIGITAL CONCEPT
                  </div>
                  <div className="text-[10px] text-precision-cyan tracking-wider">
                    INDUSTRIAL WEBSITE DEMO
                  </div>
                </div>

                {/* Target Crosshairs */}
                <div className="absolute top-2 left-2 text-[9px] font-mono text-steel-600">UI // 06</div>
                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-steel-600">VER // 2.0</div>
              </div>

              {/* Demonstration Disclaimer Note */}
              <p className="text-[11px] font-mono text-steel-500 leading-relaxed pt-1">
                * Concept website demonstrating digital capabilities for industrial and manufacturing companies.
              </p>
            </div>
          </div>

          {/* RIGHT: Showcase Metadata & Capabilities Path */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 rounded-sm border border-steel-700/80 bg-graphite-900 p-6 sm:p-8 shadow-2xl precision-corner">
            
            {/* Top Dossier Title */}
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-steel-400 pb-4 border-b border-graphite-800 mb-6">
                <span className="text-precision-cyan font-bold uppercase tracking-widest">[ SHOWCASE SPECIFICATIONS ]</span>
                <span className="text-steel-500">DOSSIER / 06</span>
              </div>

              {/* 4 Metadata Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {conceptMetadata.map((item) => (
                  <div
                    key={item.index}
                    className="p-3.5 rounded-sm bg-graphite-950 border border-graphite-850"
                  >
                    <div className="font-mono text-[10px] text-precision-cyan mb-1">
                      [{item.index}] {item.label}
                    </div>
                    <div className="font-mono text-xs font-bold text-white uppercase tracking-wide">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Showcase Scope Box */}
            <div className="p-5 rounded-sm bg-graphite-950 border border-graphite-850 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-precision-cyan uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-precision-cyan shrink-0" />
                <span>DESIGNED FOR INDUSTRIAL CAPABILITIES</span>
              </div>

              <div className="font-mono text-xs sm:text-sm text-steel-200 leading-relaxed space-y-0.5 pl-6">
                <p className="font-semibold text-white">ForgeFlow Demonstration Platform</p>
                <p>Industrial Manufacturer & Engineering Showcase</p>
                <p>Product Catalogues • Guided Selectors • RFQ Workflows</p>
                <p className="text-steel-400">High-Performance • Accessible • Modern Motion</p>
              </div>
            </div>

            {/* Interactive Test Channels */}
            <div className="pt-4 border-t border-graphite-800 space-y-3">
              <div className="font-mono text-xs text-steel-400 uppercase tracking-widest">
                INTERACTIVE DEMO MODULES
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <a
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToProducts();
                  }}
                  className="p-3 rounded-sm bg-graphite-950 border border-steel-700/60 hover:border-precision-cyan text-steel-300 hover:text-white transition-colors flex items-center justify-between min-h-[44px] focus-visible:outline-2 focus-visible:outline-precision-cyan"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-precision-cyan" />
                    <span>SAMPLE CATALOGUE</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#quote"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToQuote();
                  }}
                  className="p-3 rounded-sm bg-graphite-950 border border-steel-700/60 hover:border-precision-cyan text-steel-300 hover:text-white transition-colors flex items-center justify-between min-h-[44px] focus-visible:outline-2 focus-visible:outline-precision-cyan"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-precision-cyan" />
                    <span>DEMO RFQ FLOW</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* 3. Showcase Pillars */}
        <div ref={trustRef} className="space-y-6 pt-6 border-t border-graphite-850">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-precision-cyan uppercase tracking-widest mb-2">
                CORE SHOWCASE PILLARS
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold font-display text-white uppercase tracking-tight">
                DEMONSTRATED CAPABILITIES.
              </h3>
            </div>

            <p className="text-xs sm:text-sm font-sans text-steel-400 max-w-md leading-relaxed">
              Key functional modules designed to convert technical buyers and showcase manufacturing depth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {conceptPillars.map((signal) => {
              const Icon = signal.icon;
              return (
                <div
                  key={signal.index}
                  className="trust-signal-card p-6 sm:p-7 rounded-sm bg-graphite-900 border border-steel-700/60 shadow-lg precision-corner flex flex-col justify-between group hover:border-precision-cyan/40 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-steel-500 mb-4">
                      <span className="text-precision-cyan font-bold">[{signal.index}]</span>
                      <span className="text-steel-600 uppercase text-[10px]">[{signal.tag}]</span>
                    </div>

                    <div className="w-10 h-10 rounded-sm bg-graphite-850 border border-graphite-800 flex items-center justify-center text-precision-cyan mb-4 group-hover:bg-precision-cyan/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h4 className="text-base sm:text-lg font-bold font-display text-white uppercase tracking-tight mb-2">
                      {signal.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-steel-300 font-sans leading-relaxed">
                      {signal.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-graphite-850 mt-6 flex items-center gap-2 text-[10px] font-mono text-steel-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-precision-cyan" />
                    <span>FORGEFLOW CONCEPT // SHOWCASE PILLAR</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Strong Final Transition to Quote / Demo Inquiries */}
        <div className="rounded-sm border border-dashed border-steel-700/80 bg-graphite-900/60 p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-mono text-xs text-precision-cyan uppercase tracking-widest">
              NEXT STEP
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-display text-white uppercase tracking-tight">
              READY TO EXPLORE THE DEMO?
            </h4>
            <p className="text-xs sm:text-sm text-steel-300 font-sans max-w-xl leading-relaxed">
              Test the interactive Pump Finder, browse the sample product families, or try the demo RFQ enquiry flow.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={scrollToQuote}
            icon={<ArrowUpRight className="w-4 h-4" />}
            className="w-full md:w-auto shrink-0 justify-center"
            aria-label="Try Sample RFQ"
          >
            TRY SAMPLE RFQ
          </Button>
        </div>

      </div>
    </section>
  );
};
