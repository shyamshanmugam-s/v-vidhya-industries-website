import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ArrowUpRight, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "PRODUCTS", href: "#products", index: "01" },
    { label: "FIND A PUMP", href: "#pump-finder", index: "02" },
    { label: "APPLICATIONS", href: "#applications", index: "03" },
    { label: "ENGINEERING", href: "#engineering", index: "04" },
    { label: "COMPANY", href: "#company", index: "05" },
  ];

  return (
    <header className="navbar-root sticky top-0 z-50 w-full bg-graphite-950/95 backdrop-blur-sm border-b border-graphite-800/80 transition-colors">
      {/* Top Precision Engineering Metadata Bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 border-b border-graphite-850 bg-graphite-950 text-[11px] font-mono text-steel-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-precision-cyan animate-pulse" />
            <span className="text-steel-400">PUMP ENGINEERING BASE:</span> COIMBATORE, TAMIL NADU
          </span>
          <span className="text-graphite-800">|</span>
          <span>COIMBATORE, TAMIL NADU</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-steel-400">PUMP SYSTEMS // COIMBATORE</span>
          <span className="text-graphite-800">|</span>
          <Badge variant="accent" indicator className="py-0.5 px-2 text-[10px]">
            DEMO PREVIEW
          </Badge>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container flex items-center justify-between h-16 sm:h-18">
        {/* Brand Logo & Identification */}
        <a href="#" className="flex flex-col group" aria-label="V. Vidhya Industries Home">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-sm bg-graphite-850 border border-steel-700/60 flex items-center justify-center text-precision-cyan font-mono text-xs font-bold group-hover:border-precision-cyan/60 transition-colors">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold tracking-tight text-base sm:text-lg text-white group-hover:text-steel-100 transition-colors leading-none">
                V. VIDHYA INDUSTRIES
              </span>
              <span className="text-[10px] font-mono tracking-widest text-steel-500 uppercase mt-1">
                Coimbatore, India
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center gap-1.5 text-xs font-mono tracking-widest text-steel-400 hover:text-white transition-colors py-2"
            >
              <span className="text-[10px] text-steel-600 group-hover:text-precision-cyan transition-colors">
                {link.index}
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const el = document.getElementById("quote");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            REQUEST A QUOTE
          </Button>
        </div>

        {/* Mobile Menu Toggle Button (44px min touch target) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm text-steel-300 hover:text-white hover:bg-graphite-900 border border-graphite-800"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-graphite-800 bg-graphite-950 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-graphite-900 text-sm font-mono tracking-wider text-steel-300 hover:text-precision-cyan"
              >
                <span>{link.label}</span>
                <span className="text-xs text-steel-600 font-mono">[{link.index}]</span>
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById("quote");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              REQUEST A QUOTE
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
