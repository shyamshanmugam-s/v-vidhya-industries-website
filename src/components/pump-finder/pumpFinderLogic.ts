import type { ProductFamilyItem } from "../products/ProductDetailModal";
import selfPrimingImg from "../../assets/product-self-priming.jpg";
import centrifugalMonoblockImg from "../../assets/product-centrifugal-monoblock.jpg";
import horizontalOpenwellImg from "../../assets/product-horizontal-openwell.jpg";
import pressureBoostingImg from "../../assets/product-pressure-boosting.jpg";
import ssSubmersibleImg from "../../assets/product-ss-submersible.jpg";

export interface FinderStepOption {
  id: string;
  label: string;
  subtitle?: string;
}

export interface FinderStep {
  index: string;
  id: "application" | "installation" | "requirement";
  title: string;
  question: string;
  options: FinderStepOption[];
}

export const finderSteps: FinderStep[] = [
  {
    index: "01",
    id: "application",
    title: "APPLICATION",
    question: "WHAT ARE YOU PUMPING FOR?",
    options: [
      { id: "Domestic water applications", label: "Domestic water applications" },
      { id: "Agricultural water applications", label: "Agricultural water applications" },
      { id: "Open well water applications", label: "Open well water applications" },
      { id: "Submersible water applications", label: "Submersible water applications" },
      { id: "Domestic pressure boosting applications", label: "Domestic pressure boosting applications" },
      { id: "General water-handling applications", label: "General water-handling applications" },
      { id: "Not sure", label: "Not sure" },
    ],
  },
  {
    index: "02",
    id: "installation",
    title: "INSTALLATION",
    question: "HOW IS THE SYSTEM INSTALLED?",
    options: [
      { id: "Surface / Above ground", label: "Surface / Above ground", subtitle: "Mounted at ground level or pump platform" },
      { id: "Open well", label: "Open well", subtitle: "Installed in open sump or well" },
      { id: "Submersible", label: "Submersible", subtitle: "Submerged pump installation" },
      { id: "Domestic pressure boosting system", label: "Domestic pressure boosting system", subtitle: "Inline pressure boosting setup" },
      { id: "Not sure", label: "Not sure", subtitle: "Installation requirements to be confirmed" },
    ],
  },
  {
    index: "03",
    id: "requirement",
    title: "REQUIREMENT",
    question: "WHAT DO YOU NEED HELP WITH?",
    options: [
      { id: "New installation", label: "New installation", subtitle: "Planning a new pumping setup" },
      { id: "Replacement", label: "Replacement", subtitle: "Replacing existing pump" },
      { id: "Choosing a pump", label: "Choosing a pump", subtitle: "Evaluating suitable pump family" },
      { id: "Pressure boosting", label: "Pressure boosting", subtitle: "Addressing line pressure requirements" },
      { id: "General enquiry", label: "General enquiry", subtitle: "General product and catalogue enquiry" },
      { id: "Not sure", label: "Not sure", subtitle: "Discussing requirement with technical team" },
    ],
  },
];

export const allVerifiedFamilies: Record<string, ProductFamilyItem> = {
  "self-priming-pumps": {
    id: "self-priming-pumps",
    index: "01",
    name: "SELF PRIMING PUMPS",
    category: "DOMESTIC & UTILITY WATER TRANSFER",
    description: "Pump systems designed for applications where self-priming operation is required.",
    applicationScope: "Domestic water supply, overhead tanks, utility transfer.",
    image: selfPrimingImg,
    imageAlt: "V. Vidhya Industries Self Priming Pump system with cast iron housing and precision motor",
  },
  "centrifugal-monoblock-pumps": {
    id: "centrifugal-monoblock-pumps",
    index: "02",
    name: "CENTRIFUGAL MONOBLOCK PUMPS",
    category: "AGRICULTURE & INDUSTRIAL CIRCULATION",
    description: "Compact pump systems for a range of domestic, agricultural and water-handling applications.",
    applicationScope: "Agricultural irrigation, industrial circulation, water transfer.",
    image: centrifugalMonoblockImg,
    imageAlt: "V. Vidhya Industries Centrifugal Monoblock Pump with flanged ports and heavy motor assembly",
  },
  "horizontal-open-well-pumps": {
    id: "horizontal-open-well-pumps",
    index: "03",
    name: "HORIZONTAL OPEN WELL PUMPS",
    category: "OPEN WELLS & RESERVOIRS",
    description: "Pump systems designed for horizontal open well water applications.",
    applicationScope: "Open wells, sumps, irrigation canals, water transfer.",
    image: horizontalOpenwellImg,
    imageAlt: "V. Vidhya Industries Horizontal Open Well Submersible Pump with water-cooled motor body",
  },
  "domestic-pressure-boosting-systems": {
    id: "domestic-pressure-boosting-systems",
    index: "04",
    name: "DOMESTIC PRESSURE BOOSTING SYSTEMS",
    category: "DOMESTIC PRESSURE BOOSTING",
    description: "Pressure boosting solutions designed for domestic water applications.",
    applicationScope: "Multi-story domestic water networks, pressure-boosting lines.",
    image: pressureBoostingImg,
    imageAlt: "V. Vidhya Industries Domestic Pressure Boosting System with pressure tank and automated controller",
  },
  "stainless-steel-submersible-pumpsets": {
    id: "stainless-steel-submersible-pumpsets",
    index: "05",
    name: "STAINLESS STEEL SUBMERSIBLE PUMPSETS",
    category: "SUBMERSIBLE PUMP SYSTEMS",
    description: "Stainless steel submersible pumping systems for suitable water applications.",
    applicationScope: "Submersible water applications, groundwater extraction.",
    image: ssSubmersibleImg,
    imageAlt: "V. Vidhya Industries Stainless Steel Submersible Pumpset with multi-stage hydraulic bowls",
  },
};

export interface FinderState {
  application: string | null;
  installation: string | null;
  requirement: string | null;
}

/**
 * Maps user requirements transparently to relevant verified product families.
 * Does NOT perform technical sizing or calculate HP/head.
 */
export function determineRecommendations(state: FinderState): ProductFamilyItem[] {
  const { application, installation, requirement } = state;
  const results: ProductFamilyItem[] = [];

  // Rule 1: Pressure Boosting
  if (
    application === "Domestic pressure boosting applications" ||
    installation === "Domestic pressure boosting system" ||
    requirement === "Pressure boosting"
  ) {
    results.push(allVerifiedFamilies["domestic-pressure-boosting-systems"]);
    if (installation === "Surface / Above ground" || application === "Domestic water applications") {
      results.push(allVerifiedFamilies["self-priming-pumps"]);
    }
    return results;
  }

  // Rule 2: Open Well Water / Installation
  if (application === "Open well water applications" || installation === "Open well") {
    results.push(allVerifiedFamilies["horizontal-open-well-pumps"]);
    if (application === "Agricultural water applications" || installation === "Surface / Above ground") {
      results.push(allVerifiedFamilies["centrifugal-monoblock-pumps"]);
    }
    return results;
  }

  // Rule 3: Submersible Extraction
  if (application === "Submersible water applications" || installation === "Submersible") {
    results.push(allVerifiedFamilies["stainless-steel-submersible-pumpsets"]);
    if (installation === "Open well" || application === "Open well water applications") {
      results.push(allVerifiedFamilies["horizontal-open-well-pumps"]);
    }
    return results;
  }

  // Rule 4: Surface + Agricultural Water
  if (
    installation === "Surface / Above ground" &&
    application === "Agricultural water applications"
  ) {
    results.push(allVerifiedFamilies["centrifugal-monoblock-pumps"]);
    results.push(allVerifiedFamilies["horizontal-open-well-pumps"]);
    return results;
  }

  // Rule 5: Surface + Domestic Water
  if (
    installation === "Surface / Above ground" &&
    application === "Domestic water applications"
  ) {
    results.push(allVerifiedFamilies["self-priming-pumps"]);
    results.push(allVerifiedFamilies["centrifugal-monoblock-pumps"]);
    return results;
  }

  // Rule 6: Domestic General
  if (application === "Domestic water applications") {
    results.push(allVerifiedFamilies["self-priming-pumps"]);
    results.push(allVerifiedFamilies["domestic-pressure-boosting-systems"]);
    results.push(allVerifiedFamilies["centrifugal-monoblock-pumps"]);
    return results;
  }

  // Rule 7: Agricultural General
  if (application === "Agricultural water applications") {
    results.push(allVerifiedFamilies["centrifugal-monoblock-pumps"]);
    results.push(allVerifiedFamilies["horizontal-open-well-pumps"]);
    results.push(allVerifiedFamilies["stainless-steel-submersible-pumpsets"]);
    return results;
  }

  // Rule 8: General water handling / Not Sure / Multi-System Default
  return [
    allVerifiedFamilies["self-priming-pumps"],
    allVerifiedFamilies["centrifugal-monoblock-pumps"],
    allVerifiedFamilies["horizontal-open-well-pumps"],
  ];
}
