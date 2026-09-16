import React, { useEffect, useRef } from "react";
import { Badge } from "../ui/Badge";
import { ArrowUpRight, Compass, Cpu, Layers, ShieldCheck, Wrench } from "lucide-react";
import { PumpTechnicalDrawing } from "./PumpTechnicalDrawing";
import { gsap } from "../../lib/gsap";
import engineeringWorkshopImg from "../../assets/engineering-manufacturing.jpg";

const engineeringMetrics = [
  {
    index: "01",
    metric: "HYDRAULIC",
    label: "FLOW ARCHITECTURE",
    desc: "Structured engineering workflows for fluid dynamics and flow performance.",
  },
  {
    index: "02",
    metric: "PRECISION",
    label: "MACHINING STANDARDS",
    desc: "Demonstrating how component tolerances and casting standards can be presented.",
  },
  {
    index: "03",
    metric: "R&D",
    label: "SYSTEM INTEGRATION",
    desc: "Showcasing product development cycles and testing verification protocols.",
  },
];

const engineeringStages = [
  {
    index: "01",
    phase: "UNDERSTAND",
    title: "APPLICATION MAPPING",
    description: "Identify the application and operating requirement.",
    icon: Compass,
  },
  {
    index: "02",
    phase: "ENGINEER",
    title: "HYDRAULIC SIZING",
    description: "Develop the appropriate pumping-system solution.",
    icon: Cpu,
  },
  {
    index: "03",
    phase: "MANUFACTURE",
    title: "SYSTEM ASSEMBLY",
    description: "Build and assemble the selected system.",
    icon: Wrench,
  },
  {
    index: "04",
    phase: "SUPPORT",
    title: "APPLICATION GUIDANCE",
    description: "Provide product and application guidance.",
    icon: ShieldCheck,
  },
];

export const EngineeringScaffold: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroBlockRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header Animation
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

      // Main Split Block Animation
      gsap.fromTo(
        heroBlockRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: heroBlockRef.current,
            start: "top 80%",
            once: true,
          },
          clearProps: "opacity,transform",
        }
      );

      // 4-Stage Cards Stagger
      const stageCards = stagesRef.current?.querySelectorAll(".engineering-stage-card");
      if (stageCards && stageCards.length > 0) {
        gsap.fromTo(
          stageCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stagesRef.current,
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

  return (
    <section
      id="engineering"
      ref={sectionRef}
      className="relative py-12 sm:py-16 border-b border-graphite-800 bg-graphite-950 technical-grid"
      aria-label="ForgeFlow Engineering-Led Digital Experiences"
    >
      {/* Background Radial Light */}
      <div
        className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(14,165,233,0.04)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 space-y-10 sm:space-y-14">
        
        {/* 1. Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-graphite-850">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-precision-cyan tracking-widest uppercase">
                [ 05 ]
              </span>
              <span className="text-graphite-800">/</span>
              <span className="font-mono text-xs text-steel-500 tracking-widest uppercase">
                ENGINEERING
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white uppercase leading-[1.02] mb-4">
              ENGINEERING-LED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-steel-200 to-steel-400">
                DIGITAL EXPERIENCES.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-steel-300 font-sans leading-relaxed">
              Demonstrating how industrial manufacturers can showcase engineering depth, manufacturing capability, and technical precision online.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2 self-start lg:self-auto">
            <Badge variant="accent" indicator className="py-1 px-3 text-[11px] font-mono">
              ENGINEERING STORYTELLING
            </Badge>
            <span className="font-mono text-[10px] text-steel-500">
              SAMPLE CAPABILITY MODULE
            </span>
          </div>
        </div>

        {/* 2. Main Editorial Split Dossier */}
        <div ref={heroBlockRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* LEFT: Experience Statement & 3 Data Strips */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-precision-cyan uppercase tracking-widest">
                <Layers className="w-4 h-4" />
                <span>TECHNICAL CAPABILITY</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white uppercase tracking-tight leading-[1.05]">
                PRECISION <br />
                ENGINEERING <br />
                <span className="text-steel-400">STORYTELLING.</span>
              </h3>

              <p className="text-base sm:text-lg text-steel-300 font-sans leading-relaxed">
                ForgeFlow showcases how complex industrial equipment and engineering expertise can be structured into clear, engaging digital presentations for technical buyers.
              </p>
            </div>

            {/* 3 Editorial Metrics */}
            <div className="space-y-4 pt-6 border-t border-graphite-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {engineeringMetrics.map((item) => (
                  <div
                    key={item.index}
                    className="p-4 rounded-sm bg-graphite-900 border border-steel-700/60 flex flex-col justify-between"
                  >
                    <div className="font-mono text-[10px] text-precision-cyan mb-2">
                      [{item.index}]
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight">
                        {item.metric}
                      </div>
                      <div className="font-mono text-[10px] font-semibold text-steel-400 tracking-wider uppercase mt-1">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discreet Demonstration Notice */}
              <p className="text-[11px] font-mono text-steel-500 leading-relaxed pt-2">
                * Conceptual engineering content presented for website demonstration purposes.
              </p>
            </div>
          </div>

          {/* RIGHT: Industrial Machining Photography Treatment */}
          <div className="lg:col-span-6 relative flex flex-col justify-center">
            <div className="relative w-full rounded-sm border border-steel-700/80 bg-graphite-900 shadow-2xl overflow-hidden precision-corner group">
              
              {/* Header metadata */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-graphite-950/90 border-b border-graphite-800/80 font-mono text-[10px] text-steel-500">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-precision-cyan" />
                  <span className="text-steel-300 uppercase tracking-wider">
                    SAMPLE COMPONENT ASSEMBLY
                  </span>
                </div>
                <span className="text-steel-600 hidden sm:inline">DEMO WORKSHOP VISUAL</span>
              </div>

              {/* Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-graphite-950 overflow-hidden">
                <img
                  src={engineeringWorkshopImg}
                  alt="Sample industrial equipment components on workshop workbench"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 industrial-vignette pointer-events-none" />

                <div className="absolute bottom-3 right-3 bg-graphite-950/90 backdrop-blur-xs px-2.5 py-1 border border-graphite-800 rounded-xs font-mono text-[10px] text-steel-400">
                  REPRESENTATIVE INDUSTRIAL VISUAL
                </div>
              </div>

              {/* Footer status bar */}
              <div className="px-4 py-2.5 bg-graphite-950/95 border-t border-graphite-800/90 flex items-center justify-between font-mono text-[11px]">
                <span className="text-steel-400 text-xs">HARDWARE & SUBASSEMBLIES</span>
                <span className="text-[10px] text-precision-cyan">FORGEFLOW // ENGINEERING DEMO</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Engineering Approach: From Requirement to Pump System */}
        <div ref={stagesRef} className="space-y-8 pt-6 border-t border-graphite-850">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-precision-cyan uppercase tracking-widest mb-2">
                ENGINEERING APPROACH
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold font-display text-white uppercase tracking-tight">
                FROM REQUIREMENT <br className="hidden sm:inline" />
                TO PUMP SYSTEM.
              </h3>
            </div>

            <p className="text-xs sm:text-sm font-sans text-steel-400 max-w-md leading-relaxed">
              Structured four-stage development workflow translating site operating requirements into reliable pumping hardware.
            </p>
          </div>

          {/* 4 Stages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.index}
                  className="engineering-stage-card relative p-6 rounded-sm bg-graphite-900 border border-steel-700/60 shadow-lg precision-corner flex flex-col justify-between group hover:border-precision-cyan/40 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-steel-500 mb-5">
                      <span className="text-precision-cyan font-bold">STAGE {stage.index}</span>
                      <span className="text-steel-600 uppercase text-[10px]">[{stage.phase}]</span>
                    </div>

                    <div className="w-10 h-10 rounded-sm bg-graphite-850 border border-graphite-800 flex items-center justify-center text-precision-cyan mb-4 group-hover:bg-precision-cyan/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h4 className="text-base font-bold font-display text-white uppercase tracking-wider mb-2">
                      {stage.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-steel-300 font-sans leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-graphite-850 mt-6 font-mono text-[10px] text-steel-500 uppercase tracking-widest">
                    FORGEFLOW ENGINEERING // DEMO ARCHITECTURE
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Signature Technical Visual: Pump Line-Art Vector Schematic */}
        <div className="space-y-4 pt-6 border-t border-graphite-850">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-precision-cyan uppercase tracking-widest mb-1">
                TECHNICAL ARCHITECTURE
              </div>
              <h4 className="text-xl sm:text-2xl font-bold font-display text-white uppercase tracking-tight">
                REPRESENTATIVE PUMP GEOMETRY
              </h4>
              <p className="text-[11px] font-mono text-steel-500 mt-1">
                Illustrative technical visual — sample concept schematic.
              </p>
            </div>

            <button
              onClick={scrollToQuote}
              className="inline-flex items-center gap-2 text-xs font-mono text-precision-cyan hover:text-white transition-colors self-start sm:self-auto py-2 focus-visible:outline-2 focus-visible:outline-precision-cyan"
            >
              <span>EXPLORE DEMO RFQ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <PumpTechnicalDrawing />
        </div>

      </div>
    </section>
  );
};
