import React, { useState, useEffect, useRef } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { ArrowUpRight, CheckCircle2, ChevronRight, Eye, Shield } from "lucide-react";
import { ProductDetailModal, type ProductFamilyItem } from "./ProductDetailModal";
import { gsap } from "../../lib/gsap";

import selfPrimingImg from "../../assets/product-self-priming.jpg";
import centrifugalMonoblockImg from "../../assets/product-centrifugal-monoblock.jpg";
import horizontalOpenwellImg from "../../assets/product-horizontal-openwell.jpg";
import pressureBoostingImg from "../../assets/product-pressure-boosting.jpg";
import ssSubmersibleImg from "../../assets/product-ss-submersible.jpg";

const productFamilies: ProductFamilyItem[] = [
  {
    id: "self-priming-pumps",
    index: "01",
    name: "SELF PRIMING PUMPS",
    category: "DOMESTIC & UTILITY WATER TRANSFER",
    description: "Pump systems designed for applications where self-priming operation is required.",
    applicationScope: "Domestic water supply, overhead tanks, utility transfer.",
    image: selfPrimingImg,
    imageAlt: "V. Vidhya Industries Self Priming Pump system with cast iron housing and precision motor",
  },
  {
    id: "centrifugal-monoblock-pumps",
    index: "02",
    name: "CENTRIFUGAL MONOBLOCK PUMPS",
    category: "AGRICULTURE & INDUSTRIAL CIRCULATION",
    description: "Compact pump systems for a range of domestic, agricultural and water-handling applications.",
    applicationScope: "Agricultural irrigation, industrial circulation, water transfer.",
    image: centrifugalMonoblockImg,
    imageAlt: "V. Vidhya Industries Centrifugal Monoblock Pump with flanged ports and heavy motor assembly",
  },
  {
    id: "horizontal-open-well-pumps",
    index: "03",
    name: "HORIZONTAL OPEN WELL PUMPS",
    category: "OPEN WELLS & RESERVOIRS",
    description: "Pump systems designed for horizontal open well water applications.",
    applicationScope: "Open wells, sumps, irrigation canals, water transfer.",
    image: horizontalOpenwellImg,
    imageAlt: "V. Vidhya Industries Horizontal Open Well Submersible Pump with water-cooled motor body",
  },
  {
    id: "domestic-pressure-boosting-systems",
    index: "04",
    name: "DOMESTIC PRESSURE BOOSTING SYSTEMS",
    category: "DOMESTIC PRESSURE BOOSTING",
    description: "Pressure boosting solutions designed for domestic water applications.",
    applicationScope: "Multi-story domestic water networks, pressure-boosting lines.",
    image: pressureBoostingImg,
    imageAlt: "V. Vidhya Industries Domestic Pressure Boosting System with pressure tank and automated controller",
  },
  {
    id: "stainless-steel-submersible-pumpsets",
    index: "05",
    name: "STAINLESS STEEL SUBMERSIBLE PUMPSETS",
    category: "SUBMERSIBLE PUMP SYSTEMS",
    description: "Stainless steel submersible pumping systems for suitable water applications.",
    applicationScope: "Submersible water applications, groundwater extraction.",
    image: ssSubmersibleImg,
    imageAlt: "V. Vidhya Industries Stainless Steel Submersible Pumpset with multi-stage hydraulic bowls",
  },
];

export const ProductSystemsScaffold: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductFamilyItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
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

      // Cards staggered reveal
      const cards = gridRef.current?.querySelectorAll(".product-catalogue-panel");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
            clearProps: "opacity,transform",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  const handleQuoteClick = (_productName: string) => {
    setSelectedProduct(null);
    const el = document.getElementById("quote");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-12 sm:py-16 border-b border-graphite-800 bg-graphite-950 technical-grid"
      aria-label="V. Vidhya Industries Pumping Systems"
    >
      {/* Background radial accent */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.04)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-graphite-850">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-precision-cyan tracking-widest uppercase">
                [ 02 ]
              </span>
              <span className="text-graphite-800">/</span>
              <span className="font-mono text-xs text-steel-500 tracking-widest uppercase">
                PUMPING SYSTEMS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white uppercase leading-[1.02] mb-4">
              PUMPING SYSTEMS.
            </h2>

            <p className="text-base sm:text-lg text-steel-300 font-sans leading-relaxed">
              Explore the pump families offered by V. Vidhya Industries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2 self-start lg:self-auto">
            <Badge variant="accent" indicator className="py-1 px-3 text-[11px] font-mono">
              5 VERIFIED PRODUCT FAMILIES
            </Badge>
            <span className="font-mono text-[10px] text-steel-500">
              COIMBATORE // TAMIL NADU
            </span>
          </div>
        </div>

        {/* Editorial Product Catalogue Arrangement */}
        <div ref={gridRef} className="space-y-8 lg:space-y-10">
          
          {/* TOP TIER: Large Featured Product Cards (01 & 02) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8">
            {productFamilies.slice(0, 2).map((product) => (
              <article
                key={product.id}
                className="product-catalogue-panel group relative rounded-sm border border-steel-700/60 bg-graphite-900 shadow-xl overflow-hidden precision-corner flex flex-col justify-between transition-all duration-300 hover:border-precision-cyan/40 hover:shadow-2xl"
              >
                {/* Top Panel Technical Header */}
                <div className="flex items-center justify-between px-5 py-3 bg-graphite-950/90 border-b border-graphite-800/80 font-mono text-xs text-steel-400">
                  <div className="flex items-center gap-2.5">
                    <span className="text-precision-cyan font-bold">[{product.index}]</span>
                    <span className="text-steel-300 uppercase tracking-wider text-[11px]">
                      {product.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-steel-600 hidden sm:inline">COIMBATORE, TN</span>
                </div>

                {/* Product Image Stage */}
                <div className="relative aspect-[16/10] w-full bg-graphite-950 overflow-hidden border-b border-graphite-850">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 industrial-vignette pointer-events-none" />
                  
                  {/* Quick Action Overlay on Hover */}
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="absolute inset-0 flex items-center justify-center bg-graphite-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs cursor-pointer"
                    aria-label={`Open details for ${product.name}`}
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-precision-blue text-white font-mono text-xs font-semibold tracking-wider uppercase shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-3.5 h-3.5" />
                      VIEW PRODUCT
                    </span>
                  </button>

                  <div className="absolute bottom-3 left-3 bg-graphite-950/90 backdrop-blur-xs px-2.5 py-1 border border-graphite-800 rounded-xs font-mono text-[10px] text-steel-400">
                    FIG. {product.index} // PRODUCT FAMILY
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white uppercase tracking-tight mb-3 group-hover:text-steel-100 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm sm:text-base text-steel-300 font-sans leading-relaxed mb-6">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-graphite-800 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-steel-400 bg-graphite-950 px-3.5 py-2.5 rounded-sm border border-graphite-850">
                      <CheckCircle2 className="w-4 h-4 text-precision-cyan shrink-0" />
                      <span>Technical specifications available on request.</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => setSelectedProduct(product)}
                        icon={<ChevronRight className="w-4 h-4" />}
                        className="w-full justify-between"
                        aria-label={`View ${product.name}`}
                      >
                        VIEW PRODUCT
                      </Button>
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => handleQuoteClick(product.name)}
                        icon={<ArrowUpRight className="w-4 h-4" />}
                        className="w-full justify-between"
                        aria-label={`Request Quote for ${product.name}`}
                      >
                        REQUEST A QUOTE
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* LOWER TIER: 3-Column Balanced Secondary Grid (03, 04, 05) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8">
            {productFamilies.slice(2, 5).map((product) => (
              <article
                key={product.id}
                className="product-catalogue-panel group relative rounded-sm border border-steel-700/60 bg-graphite-900 shadow-xl overflow-hidden precision-corner flex flex-col justify-between transition-all duration-300 hover:border-precision-cyan/40 hover:shadow-2xl"
              >
                {/* Top Panel Technical Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-graphite-950/90 border-b border-graphite-800/80 font-mono text-xs text-steel-400">
                  <div className="flex items-center gap-2">
                    <span className="text-precision-cyan font-bold">[{product.index}]</span>
                    <span className="text-steel-400 uppercase tracking-wider text-[10px] truncate max-w-[180px]">
                      {product.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-steel-600">FIG. {product.index}</span>
                </div>

                {/* Product Image Stage */}
                <div className="relative aspect-[16/10] w-full bg-graphite-950 overflow-hidden border-b border-graphite-850">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 industrial-vignette pointer-events-none" />

                  {/* Quick Action Overlay */}
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="absolute inset-0 flex items-center justify-center bg-graphite-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs cursor-pointer"
                    aria-label={`Open details for ${product.name}`}
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-precision-blue text-white font-mono text-[11px] font-semibold tracking-wider uppercase shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      VIEW PRODUCT
                    </span>
                  </button>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white uppercase tracking-tight mb-2.5 group-hover:text-steel-100 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-steel-300 font-sans leading-relaxed mb-5">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-graphite-800 space-y-3.5">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-steel-400 bg-graphite-950 px-3 py-2 rounded-sm border border-graphite-850">
                      <CheckCircle2 className="w-3.5 h-3.5 text-precision-cyan shrink-0" />
                      <span className="truncate">Specifications on request</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedProduct(product)}
                        icon={<ChevronRight className="w-3.5 h-3.5" />}
                        className="w-full justify-between text-[11px]"
                        aria-label={`View ${product.name}`}
                      >
                        VIEW PRODUCT
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuoteClick(product.name)}
                        icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                        className="w-full justify-between text-[11px]"
                        aria-label={`Request Quote for ${product.name}`}
                      >
                        REQUEST A QUOTE
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Factory Direct Engineering Consultation Strip */}
          <div className="rounded-sm border border-dashed border-steel-700/80 bg-graphite-900/60 p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-graphite-850 border border-graphite-800 flex items-center justify-center text-precision-cyan shrink-0 mt-0.5">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                  LOOKING FOR SPECIFICATIONS OR PRODUCT INFORMATION?
                </h4>
                <p className="text-xs sm:text-sm text-steel-400 font-sans mt-1">
                  Connect directly with the Coimbatore team for product availability, datasheets, or commercial enquiries.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => {
                const el = document.getElementById("quote");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full md:w-auto shrink-0 justify-center"
            >
              REQUEST A QUOTE
            </Button>
          </div>

        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onQuoteSelect={handleQuoteClick}
      />
    </section>
  );
};
