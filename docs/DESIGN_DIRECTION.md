# V. VIDHYA INDUSTRIES — DESIGN SYSTEM DIRECTION
**Design System Name**: `INDUSTRIAL PRECISION`  
**Industry**: Industrial & Domestic Pump Manufacturing  
**Origin**: Coimbatore, Tamil Nadu, India  
**Document Version**: 1.0.0 (Foundation Stage)

---

## 1. Brand Philosophy & Aesthetic Vision

V. Vidhya Industries is an established pump engineering and manufacturing enterprise in Coimbatore, Tamil Nadu. The digital representation must mirror the physical gravity, exact tolerances, and functional longevity of precision machinery.

### Core Mood & Tenets
- **Engineering Gravity**: Weighted, grounded, uncompromising structural integrity.
- **Physical Metallurgy**: Textures and tones inspired by cast iron, machined stainless steel, cold-rolled carbon steel, and graphite casings.
- **Controlled Hydrodynamics**: Water presented not as playful splashes, but as pressure, velocity, hydraulic head, and volumetric flow.
- **Technical Honesty**: Zero artificial exaggeration. What is verified is presented with pristine typographical precision; what is unconfirmed is designated for inquiry.

### Anti-Patterns (Strictly Avoided)
- ❌ Generic SaaS / Web3 / Fintech aesthetic (glassmorphism, saturated neon gradients, pill buttons).
- ❌ Generic corporate blue template aesthetic.
- ❌ Floating non-contextual 3D orbs or decorative geometric noise.
- ❌ Fabricated performance metrics, awards, certifications, or stock-photo corporate handshakes.
- ❌ Overly bubbly or rounded border radii (maintain crisp `2px` to `6px` architectural radii).

---

## 2. Color System & Design Tokens

The palette is rooted in cold industrial metallurgy, weighted by deep graphite, with a single high-contrast technical cyan/blue accent utilized with strict functional restraint.

| Token | Hex / HSL | Semantic Role | Usage Guidance |
| :--- | :--- | :--- | :--- |
| `--graphite-950` | `#08090b` | Foundation Canvas | Primary background surface |
| `--graphite-900` | `#0f1115` | Section / Card Base | Elevated surfaces, card panels |
| `--graphite-850` | `#15181f` | Hover / Frame Layer | Secondary panel states, headers |
| `--graphite-800` | `#1e222b` | Structural Dividers | Subtle section borders, grid rules |
| `--steel-700` | `#2b323d` | High-contrast rules | Interactive borders, input outlines |
| `--steel-500` | `#5d6b82` | Secondary Metadata | Inactive markers, tertiary labels |
| `--steel-400` | `#8b9bb4` | Muted Body Text | Explanatory copy, supporting specs |
| `--offwhite-100` | `#f0f3f7` | Primary Typography | Headers, primary titles, hero callouts |
| `--offwhite-200` | `#d2d9e4` | Body Copy | Standard readable paragraphs |
| `--accent-cyan` | `#0284c7` / `#0ea5e9` | Functional Precision Accent | Active states, primary CTA, flow vectors |
| `--accent-cyan-glow` | `rgba(14, 165, 233, 0.15)` | Optical Indicator | Subtle glow under high-importance badges |

### Accent Restraint Rule
`--accent-cyan` must cover **less than 4%** of the visible viewport area at any time. It exists solely to guide the eye to interactive affordances (CTA, active category, fluid direction) and never as decorative background flooding.

---

## 3. Typography Hierarchy

Typographic composition balances editorial weight with engineering documentation rigor.

```
┌─────────────────────────────────────────────────────────────┐
│ DISPLAY (Space Grotesk / Syne)                              │
│ Bold, geometric, industrial cadence, tight tracking (-0.03em)│
├─────────────────────────────────────────────────────────────┤
│ BODY (Inter / Plus Jakarta Sans)                            │
│ High legibility, neutral geometry, balanced vertical rhythm │
├─────────────────────────────────────────────────────────────┤
│ TECHNICAL METADATA (JetBrains Mono)                         │
│ Monospaced indices, coordinates, dimensional parameters     │
└─────────────────────────────────────────────────────────────┘
```

### Scale & Application
1. **Hero Headline**: `clamp(2.5rem, 6vw, 4.5rem)` | Weight: 700 | Tracking: `-0.03em` | Space Grotesk
2. **Section Titles (H2)**: `clamp(1.75rem, 3.5vw, 2.75rem)` | Weight: 600 | Tracking: `-0.02em` | Space Grotesk
3. **Card / Family Titles (H3)**: `1.25rem - 1.5rem` | Weight: 600 | Space Grotesk
4. **Body Text**: `1rem - 1.125rem` | Line Height: 1.65 | Inter
5. **Technical Badges / Metadata**: `0.75rem - 0.8125rem` | Uppercase | Tracking: `0.08em` | JetBrains Mono

---

## 4. Grid, Structure & Precision Details

- **Container Widths**: Max `1400px` standard container with responsive padding (`1.25rem` mobile, `2.5rem` desktop).
- **Hairline Framing**: 1px subtle borders (`border-white/10` or `border-graphite-800`) mimicking technical blueprints.
- **Crosshair & Coordinate Accents**: Subtle coordinate tags (`11.0168° N, 76.9558° E [COIMBATORE]`) and corner alignment marks `+` at structural section corners.
- **Elevation**: Minimal drop-shadows; separation is achieved through tonal contrast and hairline borders rather than muddy blur shadows.

---

## 5. Signature Interaction: The "Flow System"

```
[ WATER SOURCE ] ──► [ PRECISION PUMP ] ──► [ PRESSURE STABILIZER ] ──► [ END APPLICATION ]
 (Ground / Well)      (Impeller / Motor)      (Bar / Dynamic Head)       (Agri / Domestic / Ind)
```

- **Concept**: A restrained, schematic water-flow visual showing fluid entering, building dynamic pressure inside the engineered pump body, and discharging to specific industrial/domestic applications.
- **Execution Strategy**: Precision SVG / Canvas / WebGL vector flow lines with subtle animated dash-offset or velocity particles.
- **Rule**: Must feel like a dynamic engineering cross-section or SCADA flow diagram, NOT a generic particle simulation.

---

## 6. Responsiveness & Accessibility

- **Touch Targets**: Minimum `44px × 44px` on all mobile interactive elements.
- **Contrast**: Full compliance with WCAG AA (minimum 4.5:1 for body copy against dark graphite backdrops).
- **Reduced Motion**: All GSAP/ScrollTrigger and Three.js animations respect `prefers-reduced-motion: reduce`.
- **Keyboard Navigation**: High-contrast focus rings (`outline: 2px solid #0ea5e9; outline-offset: 2px`).
