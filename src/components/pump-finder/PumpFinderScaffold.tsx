import React, { useState, useRef, useEffect } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Compass,
  Eye,
  RotateCcw,
} from "lucide-react";
import {
  finderSteps,
  determineRecommendations,
  type FinderState,
} from "./pumpFinderLogic";
import { ProductDetailModal, type ProductFamilyItem } from "../products/ProductDetailModal";
import { gsap } from "../../lib/gsap";

export const PumpFinderScaffold: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selections, setSelections] = useState<FinderState>({
    application: null,
    installation: null,
    requirement: null,
  });
  const [selectedProductForModal, setSelectedProductForModal] = useState<ProductFamilyItem | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepContainerRef = useRef<HTMLDivElement>(null);

  const isComplete = currentStepIndex >= finderSteps.length;
  const currentStep = finderSteps[currentStepIndex];

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Step transition animation
  const animateStepTransition = (direction: "forward" | "backward" | "reset") => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !stepContainerRef.current) return;

    const xOffset = direction === "forward" ? 20 : direction === "backward" ? -20 : 0;

    gsap.fromTo(
      stepContainerRef.current,
      { opacity: 0, x: xOffset },
      { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }
    );
  };

  const handleSelectOption = (optionId: string) => {
    if (!currentStep) return;

    const updated = {
      ...selections,
      [currentStep.id]: optionId,
    };
    setSelections(updated);

    // Auto advance with subtle deliberate timing
    setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
      animateStepTransition("forward");
    }, 180);
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      animateStepTransition("backward");
    }
  };

  const handleReset = () => {
    setSelections({
      application: null,
      installation: null,
      requirement: null,
    });
    setCurrentStepIndex(0);
    animateStepTransition("reset");
  };

  const handleQuoteClick = (_productName?: string) => {
    setSelectedProductForModal(null);
    const el = document.getElementById("quote");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const recommendations = isComplete ? determineRecommendations(selections) : [];

  return (
    <section
      id="pump-finder"
      ref={sectionRef}
      className="relative py-12 sm:py-16 border-b border-graphite-800 bg-graphite-950 technical-grid"
      aria-label="V. Vidhya Industries Pump Application Selector"
    >
      {/* Background Ambience */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(14,165,233,0.05)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 max-w-5xl">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-graphite-850">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-precision-cyan tracking-widest uppercase">
                [ 03 ]
              </span>
              <span className="text-graphite-800">/</span>
              <span className="font-mono text-xs text-steel-500 tracking-widest uppercase">
                FIND YOUR PUMP
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white uppercase leading-[1.02] mb-4">
              FIND THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-steel-200 to-steel-400">
                RIGHT PUMP.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-steel-300 font-sans max-w-xl leading-relaxed">
              Start with your application and requirements. We'll guide you toward the relevant V. Vidhya Industries pump systems.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 self-start md:self-auto">
            <Badge variant="outline" className="text-[11px] font-mono">
              APPLICATION SELECTOR
            </Badge>
            <span className="font-mono text-[10px] text-steel-500">
              3-STEP APPLICATION MATRIX
            </span>
          </div>
        </div>

        {/* Guided Selector Instrument Container */}
        <div className="relative rounded-sm border border-steel-700/80 bg-graphite-900 shadow-2xl overflow-hidden precision-corner">
          
          {/* Instrument Top Frame Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-graphite-950 border-b border-graphite-800 font-mono text-xs text-steel-400">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-precision-cyan animate-pulse" />
              <span className="text-white font-semibold uppercase tracking-wider">
                {!isComplete ? `STEP ${currentStep.index} / 03 — ${currentStep.title}` : "APPLICATION RESULTS"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {!isComplete ? (
                <div className="flex items-center gap-1.5 text-steel-500 text-[11px]">
                  <span>0{currentStepIndex + 1}</span>
                  <span>/</span>
                  <span>03</span>
                </div>
              ) : (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-precision-cyan hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-precision-cyan py-1 px-2 rounded-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>START OVER</span>
                </button>
              )}
            </div>
          </div>

          {/* Segmented Progress Line */}
          <div className="grid grid-cols-3 h-1 bg-graphite-850">
            <div
              className={`transition-colors duration-300 ${
                currentStepIndex >= 0 ? "bg-precision-cyan" : "bg-transparent"
              }`}
            />
            <div
              className={`transition-colors duration-300 ${
                currentStepIndex >= 1 ? "bg-precision-cyan" : "bg-transparent"
              }`}
            />
            <div
              className={`transition-colors duration-300 ${
                currentStepIndex >= 2 ? "bg-precision-cyan" : "bg-transparent"
              }`}
            />
          </div>

          {/* Instrument Body Area */}
          <div ref={stepContainerRef} className="p-6 sm:p-10">
            {!isComplete ? (
              /* ACTIVE STEP VIEW */
              <div className="space-y-8">
                <div>
                  <div className="font-mono text-xs text-precision-cyan uppercase tracking-widest mb-2">
                    QUESTION {currentStep.index}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white uppercase tracking-tight">
                    {currentStep.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-steel-400 font-sans mt-2">
                    Select the option that closest matches your intended setup.
                  </p>
                </div>

                {/* Option Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {currentStep.options.map((option) => {
                    const isSelected = selections[currentStep.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelectOption(option.id)}
                        className={`group p-4 sm:p-5 text-left rounded-sm border transition-all duration-200 flex items-start justify-between gap-4 min-h-[56px] select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-precision-cyan ${
                          isSelected
                            ? "bg-graphite-850 border-precision-cyan text-white shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                            : "bg-graphite-950/70 border-graphite-800 text-steel-300 hover:border-steel-600 hover:bg-graphite-850 hover:text-white"
                        }`}
                        aria-pressed={isSelected}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isSelected ? "bg-precision-cyan" : "bg-graphite-750 group-hover:bg-steel-500"
                              }`}
                            />
                            <span className="font-mono text-sm font-semibold tracking-wide text-white">
                              {option.label}
                            </span>
                          </div>
                          {option.subtitle && (
                            <p className="text-xs text-steel-400 font-sans pl-4 leading-relaxed">
                              {option.subtitle}
                            </p>
                          )}
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? "border-precision-cyan bg-precision-cyan text-graphite-950"
                              : "border-graphite-800 group-hover:border-steel-600"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Bar */}
                <div className="pt-6 border-t border-graphite-800 flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    disabled={currentStepIndex === 0}
                    className={`flex items-center gap-2 font-mono text-xs tracking-wider uppercase py-2.5 px-4 rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-precision-cyan ${
                      currentStepIndex === 0
                        ? "opacity-30 cursor-not-allowed text-steel-600"
                        : "text-steel-400 hover:text-white hover:bg-graphite-850"
                    }`}
                    aria-label="Previous step"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>

                  <div className="font-mono text-[11px] text-steel-500 hidden sm:block">
                    SELECT AN OPTION TO ADVANCE
                  </div>
                </div>
              </div>
            ) : (
              /* RESULTS VIEW */
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 mb-3">
                    <Badge variant="accent" indicator>
                      SELECTION MATCH COMPLETED
                    </Badge>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-white uppercase tracking-tight">
                    SUGGESTED PRODUCT FAMILIES
                  </h3>
                  <p className="text-sm sm:text-base text-steel-300 font-sans mt-2 max-w-2xl leading-relaxed">
                    Final product selection depends on the specific installation and technical requirements.
                  </p>
                </div>

                {/* Selections Summary Breadcrumbs */}
                <div className="p-4 bg-graphite-950 rounded-sm border border-graphite-850 flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs text-steel-400">
                  <span className="text-steel-600 uppercase text-[10px]">PARAMETERS:</span>
                  <span className="px-2 py-1 bg-graphite-900 border border-graphite-800 rounded-xs text-steel-200">
                    {selections.application}
                  </span>
                  <span className="text-steel-700">&rarr;</span>
                  <span className="px-2 py-1 bg-graphite-900 border border-graphite-800 rounded-xs text-steel-200">
                    {selections.installation}
                  </span>
                  <span className="text-steel-700">&rarr;</span>
                  <span className="px-2 py-1 bg-graphite-900 border border-graphite-800 rounded-xs text-steel-200">
                    {selections.requirement}
                  </span>
                </div>

                {/* Recommended Product Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((product) => (
                    <div
                      key={product.id}
                      className="group rounded-sm border border-steel-700/80 bg-graphite-950 shadow-lg overflow-hidden flex flex-col justify-between hover:border-precision-cyan/40 transition-all"
                    >
                      {/* Card Image */}
                      <div className="relative aspect-[16/10] w-full bg-graphite-900 overflow-hidden border-b border-graphite-850">
                        <img
                          src={product.image}
                          alt={product.imageAlt}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="eager"
                          decoding="async"
                        />
                        <div className="absolute inset-0 industrial-vignette pointer-events-none" />
                        <div className="absolute top-2.5 left-2.5 bg-graphite-950/90 backdrop-blur-xs px-2 py-0.5 border border-graphite-800 rounded-xs font-mono text-[10px] text-precision-cyan">
                          [{product.index}]
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="font-mono text-[10px] text-steel-500 uppercase tracking-wider block mb-1">
                            SUGGESTED PRODUCT FAMILY
                          </span>
                          <h4 className="text-lg font-bold font-display text-white uppercase tracking-tight mb-2">
                            {product.name}
                          </h4>
                          <p className="text-xs text-steel-300 font-sans leading-relaxed mb-4">
                            {product.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-graphite-850 space-y-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedProductForModal(product)}
                            icon={<Eye className="w-3.5 h-3.5" />}
                            className="w-full justify-between text-xs"
                            aria-label={`View details for ${product.name}`}
                          >
                            VIEW PRODUCT
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuoteClick(product.name)}
                            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                            className="w-full justify-between text-xs"
                            aria-label={`Request Quote for ${product.name}`}
                          >
                            REQUEST A QUOTE
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technical Guidance & Sizing Guardrail Callout */}
                <div className="p-6 bg-graphite-950 rounded-sm border border-dashed border-steel-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-sm bg-graphite-850 border border-graphite-800 text-precision-cyan shrink-0 mt-0.5">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-base uppercase tracking-tight flex items-center gap-2">
                        APPLICATION GUIDANCE
                      </h4>
                      <p className="text-xs sm:text-sm text-steel-300 font-sans mt-1 leading-relaxed">
                        Application guidance is indicative. Final product selection depends on the specific installation and technical requirements.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      icon={<RotateCcw className="w-3.5 h-3.5" />}
                    >
                      RESTART
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleQuoteClick()}
                      icon={<ArrowUpRight className="w-4 h-4" />}
                    >
                      REQUEST A QUOTE
                    </Button>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>

      {/* Product Detail Modal for Recommended Families */}
      <ProductDetailModal
        product={selectedProductForModal}
        isOpen={Boolean(selectedProductForModal)}
        onClose={() => setSelectedProductForModal(null)}
        onQuoteSelect={handleQuoteClick}
      />
    </section>
  );
};
