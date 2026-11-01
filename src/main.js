import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles.css';
import { initRitual } from './scenes/ritual.js';
import { initSections } from './scenes/sections.js';

// Marka adı ekip kararına açık: tek yerden değişir.
export const BRAND = 'ÇEDENE';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-brand]').forEach((el) => {
  el.textContent = BRAND;
});

if (!reducedMotion) {
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

initRitual({ reducedMotion });
initSections({ reducedMotion });
