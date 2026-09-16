import React, { useEffect, useRef } from "react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ArrowDown, ArrowUpRight, Shield, Cpu, Activity } from "lucide-react";
import { gsap } from "../../lib/gsap";
import heroPumpImg from "../../assets/vidhya-pump-hero.jpg";

export const HeroShell: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaStripRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const visualCardRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // Entrance choreography with GSAP
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Immediate display without motion transforms
        gsap.set(
          [
            eyebrowRef.current,
            headlineLine1Ref.current,
            headlineLine2Ref.current,
            copyRef.current,
            ctaRef.current,
            metaStripRef.current,
            visualContainerRef.current,
            scrollCueRef.current,
          ],
          { opacity: 1, yPercent: 0, y: 0, scale: 1 }
        );
        return;
      }

      // Choreographed entrance timeline (cubic-bezier 0.16, 1, 0.3, 1 curve via power4.out)
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      // 1. Initial states
      gsap.set([eyebrowRef.current, copyRef.current, ctaRef.current, metaStripRef.current, scrollCueRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set([headlineLine1Ref.current, headlineLine2Ref.current], {
        yPercent: 110,
      });
      gsap.set(visualContainerRef.current, {
        opacity: 0,
        scale: 1.06,
        y: 20,
      });

      // 2. Timeline Sequence
      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
      })
        .to(
          headlineLine1Ref.current,
          {
            yPercent: 0,
            duration: 1.1,
          },
          "-=0.5"
        )
        .to(
          headlineLine2Ref.current,
          {
            yPercent: 0,
            duration: 1.1,
          },
          "-=0.9"
        )
        .to(
          copyRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.7"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .to(
          metaStripRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .to(
          visualContainerRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
          },
          "-=0.9"
        )
        .to(
          scrollCueRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.6"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Subtle Mouse Micro-Parallax on Product Visual
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = visualContainerRef.current;
    const card = visualCardRef.current;
    if (!container || !card) return;

    let bounds: DOMRect | null = null;

    const handleMouseEnter = () => {
      bounds = container.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!bounds) bounds = container.getBoundingClientRect();

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const percentX = (mouseX - centerX) / centerX;
      const percentY = (mouseY - centerY) / centerY;

      // Subtle tilt: max 2.5deg rotateY, max 2.0deg rotateX, max 6px translate
      gsap.to(card, {
        rotateY: percentX * 2.5,
        rotateX: -percentY * 2.0,
        x: percentX * 6,
        y: percentY * 6,
        duration: 0.6,
        ease: "power2.out",
        transformPerspective: 1000,
        transformOrigin: "center center",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      bounds = null;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
      id="hero"
      ref={heroRef}
      className="relative min-h-[calc(100svh-4.5rem)] lg:min-h-[calc(100svh-5.5rem)] flex flex-col justify-between overflow-hidden border-b border-graphite-800 technical-grid bg-graphite-950"
      aria-label="ForgeFlow — Engineered For Flow"
    >
      {/* Precision Radial Ambient Lighting */}
      <div
        className="absolute top-0 right-0 w-full lg:w-2/3 h-full bg-[radial-gradient(ellipse_at_70%_25%,rgba(14,165,233,0.07)_0%,rgba(15,17,21,0.6)_50%,transparent_80%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-[radial-gradient(circle,rgba(30,34,43,0.4)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="container relative z-10 pt-8 pb-12 sm:pt-12 sm:pb-16 lg:py-16 xl:py-20 flex-1 flex flex-col justify-center">
        {/* Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
          
          {/* LEFT COLUMN: Editorial Headline + Proposition + CTAs + Specs */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            
            {/* Top Eyebrow & Metadata Identification */}
            <div ref={eyebrowRef} className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              <Badge variant="accent" indicator className="py-1 px-3 text-[11px] font-mono tracking-wider">
                FORGEFLOW // INDUSTRIAL WEBSITE DEMO
              </Badge>
              <span className="hidden sm:inline-flex items-center text-[10px] font-mono text-steel-500 tracking-widest uppercase">
                [ 01 // DIGITAL CONCEPT ]
              </span>
            </div>

            {/* Primary Display Headline — Masked 2-Line Treatment */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[5rem] font-extrabold font-display tracking-tight text-white uppercase leading-[0.94] mb-6">
              <span className="headline-mask-line">
                <span ref={headlineLine1Ref} className="headline-mask-inner">
                  ENGINEERED
                </span>
              </span>
              <span className="headline-mask-line mt-1 sm:mt-2">
                <span
                  ref={headlineLine2Ref}
                  className="headline-mask-inner text-transparent bg-clip-text bg-gradient-to-r from-white via-steel-100 to-steel-400"
                >
                  FOR FLOW.
                </span>
              </span>
            </h1>

            {/* Supporting Positioning Copy */}
            <p
              ref={copyRef}
              className="text-base sm:text-lg lg:text-xl text-steel-300 max-w-xl mb-8 sm:mb-10 font-sans leading-relaxed font-normal"
            >
              Premium digital experiences for industrial manufacturers, engineering companies and technical businesses.
            </p>

            {/* Dual CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToProducts}
                icon={<ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />}
                className="group w-full sm:w-auto justify-center shadow-lg hover:shadow-precision-cyan/20"
                aria-label="Explore Products"
              >
                EXPLORE PRODUCTS
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToQuote}
                icon={<ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                className="group w-full sm:w-auto justify-center"
                aria-label="Request a Quote"
              >
                REQUEST A QUOTE
              </Button>
            </div>

            {/* Technical Capability Indicator Ribbon (Editorial Metadata Only) */}
            <div
              ref={metaStripRef}
              className="w-full pt-6 border-t border-graphite-800/90 grid grid-cols-3 gap-2 sm:gap-4 font-mono text-[11px] text-steel-400"
            >
              <div className="flex flex-col">
                <span className="text-[10px] text-steel-600 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-precision-cyan" />
                  CATEGORY
                </span>
                <span className="text-steel-200 font-medium tracking-wide mt-0.5">DIGITAL SHOWCASE</span>
              </div>
              <div className="flex flex-col border-l border-graphite-850 pl-2 sm:pl-4">
                <span className="text-[10px] text-steel-600 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-precision-cyan" />
                  DISCIPLINE
                </span>
                <span className="text-steel-200 font-medium tracking-wide mt-0.5">ENGINEERING UX</span>
              </div>
              <div className="flex flex-col border-l border-graphite-850 pl-2 sm:pl-4">
                <span className="text-[10px] text-steel-600 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-precision-cyan" />
                  SCOPE
                </span>
                <span className="text-steel-200 font-medium tracking-wide mt-0.5">DEMO CONCEPT</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Cinematic Industrial Hero Product Visual */}
          <div
            ref={visualContainerRef}
            className="lg:col-span-6 xl:col-span-6 relative w-full flex justify-center lg:justify-end"
          >
            {/* Visual Framing Wrapper with 3D Tilt Ref */}
            <div
              ref={visualCardRef}
              className="relative w-full max-w-xl lg:max-w-none rounded-sm border border-steel-700/60 bg-graphite-900 shadow-2xl overflow-hidden precision-corner group transition-shadow duration-300 hover:border-precision-cyan/40"
            >
              {/* Top Technical Metadata Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-graphite-950/90 border-b border-graphite-800/80 font-mono text-[10px] text-steel-500">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-precision-cyan animate-pulse" />
                  <span className="text-steel-300 uppercase tracking-wider">FIG. 01 — SAMPLE INDUSTRIAL ASSEMBLY</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-steel-600">
                  <span>SCALE 1:1</span>
                  <span>|</span>
                  <span>CONCEPT VISUAL</span>
                </div>
              </div>

              {/* Product Visual Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/12] w-full bg-graphite-950 overflow-hidden">
                <img
                  src={heroPumpImg}
                  alt="ForgeFlow sample industrial pump assembly visual demonstration"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                />

                {/* Subtle Industrial Contrast Vignette Overlay */}
                <div
                  className="absolute inset-0 industrial-vignette pointer-events-none"
                  aria-hidden="true"
                />

                {/* Technical Blueprint Corner Labels */}
                <div className="absolute top-3 left-3 font-mono text-[9px] text-steel-500 tracking-widest bg-graphite-950/80 backdrop-blur-xs px-2 py-0.5 border border-graphite-800 rounded-xs pointer-events-none">
                  SAMPLE ASSEMBLY
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-[9px] text-steel-500 tracking-widest bg-graphite-950/80 backdrop-blur-xs px-2 py-0.5 border border-graphite-800 rounded-xs pointer-events-none">
                  DEMO VISUAL
                </div>
              </div>

              {/* Bottom Framing Status Bar */}
              <div className="px-4 py-2.5 bg-graphite-950/95 border-t border-graphite-800/90 flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="text-precision-cyan">●</span>
                  <span className="text-steel-300 text-xs">FORGEFLOW // INDUSTRIAL DEMO</span>
                </div>
                <span className="text-[10px] text-steel-600 hidden sm:inline">CONCEPT SHOWCASE</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Minimal Scroll Indicator */}
      <div
        ref={scrollCueRef}
        className="container relative z-10 pb-6 pt-2 flex items-center justify-between border-t border-graphite-850/60 font-mono text-[11px] text-steel-500"
      >
        <div className="hidden md:flex items-center gap-3">
          <span className="text-steel-600">01</span>
          <span className="w-6 h-px bg-graphite-800" />
          <span className="text-steel-400 uppercase tracking-widest">INDUSTRIAL WEBSITE ARCHITECTURE</span>
        </div>

        <button
          onClick={scrollToProducts}
          className="flex items-center gap-2 text-steel-400 hover:text-white transition-colors group mx-auto md:mx-0 py-2 focus-visible:outline-2 focus-visible:outline-precision-cyan"
          aria-label="Scroll to explore products"
        >
          <span className="tracking-widest uppercase text-[10px] sm:text-[11px]">SCROLL TO EXPLORE</span>
          <div className="w-4 h-6 rounded-full border border-steel-700 flex items-start justify-center p-1 group-hover:border-precision-cyan transition-colors">
            <div className="w-1 h-1.5 rounded-full bg-precision-cyan animate-bounce" />
          </div>
        </button>

        <div className="hidden md:flex items-center gap-2 text-[10px] text-steel-600">
          <span>CONCEPT DEMO SHOWCASE</span>
        </div>
      </div>
    </section>
  );
};
