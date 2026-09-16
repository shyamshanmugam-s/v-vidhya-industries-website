import React, { useEffect, useRef } from "react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { X, ArrowUpRight, FileText, Layers, HelpCircle } from "lucide-react";

export interface ProductFamilyItem {
  id: string;
  index: string;
  name: string;
  category: string;
  description: string;
  applicationScope: string;
  image: string;
  imageAlt: string;
}

interface ProductDetailModalProps {
  product: ProductFamilyItem | null;
  isOpen: boolean;
  onClose: () => void;
  onQuoteSelect: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onQuoteSelect,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus trap & ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-graphite-950/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl bg-graphite-900 border border-steel-700/80 rounded-sm shadow-2xl overflow-hidden precision-corner flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-graphite-950 border-b border-graphite-800 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-precision-cyan font-bold">[{product.index}]</span>
            <span className="text-steel-300 uppercase tracking-wider font-semibold">
              PRODUCT FAMILY // {product.name}
            </span>
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-2 -mr-2 text-steel-400 hover:text-white hover:bg-graphite-850 rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-precision-cyan min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close product details dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Main Large Visual Stage */}
          <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-graphite-800 bg-graphite-950">
            <img
              src={product.image}
              alt={product.imageAlt}
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 industrial-vignette pointer-events-none" />
            <div className="absolute top-3 left-3 bg-graphite-950/90 backdrop-blur-xs px-2.5 py-1 border border-graphite-800 rounded-xs font-mono text-[10px] text-steel-400">
              FORGEFLOW // INDUSTRIAL DEMO
            </div>
            <div className="absolute bottom-3 right-3 bg-graphite-950/90 backdrop-blur-xs px-2.5 py-1 border border-graphite-800 rounded-xs font-mono text-[10px] text-precision-cyan">
              FIG. {product.index}
            </div>
          </div>

          {/* Product Family Name & Classification */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent" indicator>
                SAMPLE PRODUCT FAMILY
              </Badge>
              <span className="font-mono text-xs text-steel-500 uppercase">
                CONCEPT DEMO
              </span>
            </div>
            <h2
              id="modal-product-title"
              className="text-2xl sm:text-3xl font-bold font-display text-white uppercase tracking-tight"
            >
              {product.name}
            </h2>
          </div>

          {/* Product Overview */}
          <div className="p-5 bg-graphite-950 rounded-sm border border-graphite-850 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-precision-cyan uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>PRODUCT OVERVIEW</span>
            </div>
            <p className="text-sm sm:text-base text-steel-200 leading-relaxed font-sans">
              {product.description}
            </p>
          </div>

          {/* Applications Scope */}
          <div className="p-5 bg-graphite-950 rounded-sm border border-graphite-850 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-precision-cyan uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>APPLICATIONS</span>
            </div>
            <p className="text-xs sm:text-sm text-steel-300 font-sans leading-relaxed">
              {product.applicationScope}
            </p>
          </div>

          {/* Technical Information Notice */}
          <div className="p-4 bg-graphite-950/70 rounded-sm border border-steel-700/60 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-steel-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-mono text-xs text-steel-300 uppercase tracking-wider font-semibold">
                TECHNICAL INFORMATION
              </div>
              <p className="text-xs font-mono text-steel-400 leading-relaxed">
                Technical specifications available on request.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-graphite-950 border-t border-graphite-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
            className="order-2 sm:order-1 justify-center"
          >
            BACK TO CATALOGUE
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => onQuoteSelect(product.name)}
            icon={<ArrowUpRight className="w-4 h-4" />}
            className="order-1 sm:order-2 justify-center"
          >
            REQUEST A QUOTE
          </Button>
        </div>
      </div>
    </div>
  );
};
