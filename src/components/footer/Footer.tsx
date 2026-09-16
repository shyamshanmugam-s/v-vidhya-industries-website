import React, { useEffect, useRef } from "react";
import { ArrowUp, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "../ui/Button";
import { gsap } from "../../lib/gsap";

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            once: true,
          },
          clearProps: "opacity,transform",
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-graphite-950 border-t border-graphite-800 text-steel-400 font-sans relative z-10"
      aria-label="Site Footer"
    >
      <div ref={contentRef} className="container py-8 sm:py-12 space-y-8">
        
        {/* Main Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Large Closing Statement & Primary CTA */}
          <div className="md:col-span-5 lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm bg-precision-cyan/10 border border-precision-cyan/40 flex items-center justify-center text-precision-cyan font-mono text-xs font-bold">
                V
              </div>
              <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">
                V. VIDHYA INDUSTRIES
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white uppercase tracking-tight leading-[0.98]">
              ENGINEERED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-steel-200 to-steel-400">
                FOR FLOW.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-steel-300 max-w-md font-sans leading-relaxed">
              V. Vidhya Industries — pumping systems and engineering from Coimbatore, Tamil Nadu.
            </p>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => scrollToSection("quote")}
                icon={<ArrowUpRight className="w-4 h-4" />}
                className="min-h-[44px]"
                aria-label="Request a Quote"
              >
                REQUEST A QUOTE
              </Button>
            </div>
          </div>

          {/* CENTER COLUMN: Navigation System */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4 font-mono text-xs">
            <div className="text-precision-cyan font-bold uppercase tracking-widest pb-2 border-b border-graphite-800">
              NAVIGATION
            </div>

            <ul className="space-y-3">
              <li>
                <a
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("products");
                  }}
                  className="text-steel-300 hover:text-white transition-colors flex items-center justify-between py-1 min-h-[32px] focus-visible:outline-precision-cyan"
                >
                  <span>PRODUCTS</span>
                  <span className="text-steel-600 text-[10px]">[ 02 ]</span>
                </a>
              </li>
              <li>
                <a
                  href="#pump-finder"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("pump-finder");
                  }}
                  className="text-steel-300 hover:text-white transition-colors flex items-center justify-between py-1 min-h-[32px] focus-visible:outline-precision-cyan"
                >
                  <span>FIND A PUMP</span>
                  <span className="text-steel-600 text-[10px]">[ 03 ]</span>
                </a>
              </li>
              <li>
                <a
                  href="#applications"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("applications");
                  }}
                  className="text-steel-300 hover:text-white transition-colors flex items-center justify-between py-1 min-h-[32px] focus-visible:outline-precision-cyan"
                >
                  <span>APPLICATIONS</span>
                  <span className="text-steel-600 text-[10px]">[ 04 ]</span>
                </a>
              </li>
              <li>
                <a
                  href="#engineering"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("engineering");
                  }}
                  className="text-steel-300 hover:text-white transition-colors flex items-center justify-between py-1 min-h-[32px] focus-visible:outline-precision-cyan"
                >
                  <span>ENGINEERING</span>
                  <span className="text-steel-600 text-[10px]">[ 05 ]</span>
                </a>
              </li>
              <li>
                <a
                  href="#company"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("company");
                  }}
                  className="text-steel-300 hover:text-white transition-colors flex items-center justify-between py-1 min-h-[32px] focus-visible:outline-precision-cyan"
                >
                  <span>COMPANY</span>
                  <span className="text-steel-600 text-[10px]">[ 06 ]</span>
                </a>
              </li>
              <li>
                <a
                  href="#quote"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("quote");
                  }}
                  className="text-precision-cyan font-bold hover:text-white transition-colors flex items-center justify-between py-1 min-h-[32px] focus-visible:outline-precision-cyan"
                >
                  <span>REQUEST A QUOTE</span>
                  <span className="text-steel-600 text-[10px]">[ 07 ]</span>
                </a>
              </li>
            </ul>
          </div>

          {/* RIGHT COLUMN: Verified Facility Contact & Address */}
          <div className="md:col-span-4 lg:col-span-3 space-y-4 font-mono text-xs">
            <div className="text-precision-cyan font-bold uppercase tracking-widest pb-2 border-b border-graphite-800">
              FACILITY LOCATION
            </div>

            <div className="p-4 rounded-sm bg-graphite-900 border border-graphite-800 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold uppercase">
                <MapPin className="w-3.5 h-3.5 text-precision-cyan shrink-0" />
                <span>V. VIDHYA INDUSTRIES</span>
              </div>

              <address className="not-italic text-steel-300 leading-relaxed text-[11px] space-y-0.5">
                <p>6-1 Nehru Street,</p>
                <p>(opp. Tirupur Textiles),</p>
                <p>Avinashi Road, Peelamedu,</p>
                <p>Coimbatore — 641004,</p>
                <p className="text-steel-400">Tamil Nadu, India</p>
              </address>

              <div className="pt-2 border-t border-graphite-800">
                <a
                  href="#quote"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("quote");
                  }}
                  className="text-precision-cyan hover:underline text-[11px] flex items-center justify-between min-h-[32px]"
                >
                  <span>FACTORY ENQUIRY</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="pt-8 border-t border-graphite-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-steel-500">
          <div className="space-y-1">
            <div className="text-steel-400 font-semibold tracking-wider uppercase">
              V. VIDHYA INDUSTRIES // COIMBATORE // TAMIL NADU // INDIA
            </div>
            <div>
              &copy; V. Vidhya Industries. All rights reserved.
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] text-steel-600 uppercase">
              [ CLIENT DEMO PREVIEW ]
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-graphite-900 hover:bg-graphite-850 border border-graphite-800 text-steel-300 hover:text-white transition-colors min-h-[36px] focus-visible:outline-precision-cyan"
              aria-label="Scroll back to top of page"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3 text-precision-cyan" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
