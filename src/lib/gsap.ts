import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "./lenis";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Binds GSAP ScrollTrigger to Lenis scroll updates for synchronized animations.
 */
export function initGsapScrollTrigger() {
  const lenis = getLenis();
  if (!lenis) return;

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
