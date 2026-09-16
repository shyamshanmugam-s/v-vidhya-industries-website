import React from "react";

export const PumpTechnicalDrawing: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={`relative w-full aspect-[16/9] bg-graphite-950 rounded-sm border border-graphite-800 overflow-hidden precision-corner flex items-center justify-center p-6 ${className}`}
      aria-label="Abstract engineering schematic vector of generic pump casing"
    >
      {/* Background Precision Blueprint Grid */}
      <div className="absolute inset-0 technical-grid opacity-60 pointer-events-none" />

      {/* Blueprint Header Metadata */}
      <div className="absolute top-3 left-4 flex items-center gap-3 font-mono text-[10px] text-steel-500">
        <span className="text-precision-cyan font-bold">[ 05 // SCHEMATIC ]</span>
        <span>SECTION / 05</span>
        <span className="text-graphite-800">|</span>
        <span>PUMP SYSTEM ARCHITECTURE</span>
      </div>

      <div className="absolute top-3 right-4 font-mono text-[10px] text-steel-600 hidden sm:block">
        FORGEFLOW // HYDRAULIC GEOMETRY
      </div>

      {/* Abstract Engineering Vector Line-Art */}
      <svg
        viewBox="0 0 800 450"
        className="w-full h-full max-h-[320px] text-steel-500 transition-all duration-700 select-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Center Grid Reference Lines */}
        <line x1="100" y1="225" x2="700" y2="225" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
        <line x1="400" y1="50" x2="400" y2="400" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

        {/* Outer Volute Casing Contour */}
        <path
          d="M 280 225 C 280 140, 360 100, 430 100 L 430 40 L 490 40 L 490 120 C 560 140, 600 200, 600 270 C 600 350, 520 400, 420 400 C 330 400, 280 330, 280 225 Z"
          stroke="rgba(14, 165, 233, 0.4)"
          strokeWidth="1.75"
          className="transition-colors duration-500 hover:stroke-precision-cyan"
        />

        {/* Discharge Port Flange */}
        <rect x="420" y="30" width="80" height="14" rx="1" stroke="rgba(255,255,255,0.3)" />
        <line x1="460" y1="20" x2="460" y2="44" stroke="rgba(14,165,233,0.5)" strokeDasharray="2 2" />

        {/* Suction Port Flange & Inlet Body */}
        <path d="M 200 180 L 280 180 L 280 270 L 200 270 Z" stroke="rgba(255,255,255,0.25)" />
        <rect x="186" y="165" width="14" height="120" rx="1" stroke="rgba(255,255,255,0.3)" />

        {/* Concentric Impeller & Eye Geometry */}
        <circle cx="430" cy="255" r="95" stroke="rgba(255,255,255,0.15)" strokeDasharray="6 3" />
        <circle cx="430" cy="255" r="65" stroke="rgba(14,165,233,0.3)" />
        <circle cx="430" cy="255" r="32" stroke="rgba(255,255,255,0.4)" />
        <circle cx="430" cy="255" r="12" fill="rgba(14,165,233,0.2)" stroke="rgba(14,165,233,0.6)" />

        {/* Impeller Vane Geometry Curves */}
        <path d="M 430 223 C 455 220, 480 210, 500 190" stroke="rgba(255,255,255,0.25)" />
        <path d="M 462 255 C 475 280, 490 300, 515 315" stroke="rgba(255,255,255,0.25)" />
        <path d="M 430 287 C 410 310, 395 330, 370 345" stroke="rgba(255,255,255,0.25)" />
        <path d="M 398 255 C 385 230, 365 210, 345 195" stroke="rgba(255,255,255,0.25)" />

        {/* Shaft & Motor Coupling Axis */}
        <rect x="490" y="240" width="180" height="30" stroke="rgba(255,255,255,0.2)" />
        <rect x="670" y="210" width="80" height="90" rx="2" stroke="rgba(255,255,255,0.15)" />
        <line x1="670" y1="230" x2="750" y2="230" stroke="rgba(255,255,255,0.1)" />
        <line x1="670" y1="250" x2="750" y2="250" stroke="rgba(255,255,255,0.1)" />
        <line x1="670" y1="270" x2="750" y2="270" stroke="rgba(255,255,255,0.1)" />

        {/* Base Support Frame Geometry */}
        <path d="M 330 400 L 310 430 L 630 430 L 610 400" stroke="rgba(255,255,255,0.2)" />

        {/* Precision Crosshair Target Markers */}
        <g stroke="rgba(14,165,233,0.5)">
          <path d="M 425 255 L 435 255 M 430 250 L 430 260" />
          <path d="M 275 225 L 285 225 M 280 220 L 280 230" />
          <path d="M 455 35 L 465 35 M 460 30 L 460 40" />
        </g>

        {/* Non-Fabricated Design Labels */}
        <text x="430" y="150" fill="rgba(140,160,185,0.5)" fontSize="10" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">
          VOLUTE CAVITY
        </text>
        <text x="210" y="295" fill="rgba(140,160,185,0.4)" fontSize="9" fontFamily="'JetBrains Mono', monospace">
          SUCTION INLET
        </text>
        <text x="505" y="65" fill="rgba(140,160,185,0.4)" fontSize="9" fontFamily="'JetBrains Mono', monospace">
          DISCHARGE FLANGE
        </text>
        <text x="540" y="232" fill="rgba(140,160,185,0.4)" fontSize="9" fontFamily="'JetBrains Mono', monospace">
          DRIVE SHAFT
        </text>
      </svg>

      {/* Bottom Blueprint Footer Metadata */}
      <div className="absolute bottom-3 left-4 font-mono text-[10px] text-steel-500 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-precision-cyan" />
        <span>REPRESENTATIVE SCHEMATIC ARCHITECTURE</span>
      </div>

      <div className="absolute bottom-3 right-4 font-mono text-[10px] text-steel-600 hidden sm:block">
        FORGEFLOW CONCEPT // INDUSTRIAL DEMO
      </div>
    </div>
  );
};
