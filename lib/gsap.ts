"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

registerGsap();

/** Brand easing — soft ease-out, matches prior Framer curve feel */
export const GSAP_EASE = "power3.out";

export { gsap, ScrollTrigger };
