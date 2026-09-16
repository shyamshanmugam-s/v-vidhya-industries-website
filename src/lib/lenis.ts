import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/**
 * Initializes smooth scrolling with Lenis.
 */
export function initLenis(): Lenis {
  if (typeof window === "undefined") {
    return null as unknown as Lenis;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
  });

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

