import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles.css';
import { initHome } from './scenes/home.js';
import { initSplash } from './scenes/splash.js';
import { initI18n } from './i18n.js';
import { initSections } from './scenes/sections.js';
import { BRAND, BRAND_HANDLE, BRAND_HASHTAG, BRAND_TAGLINE, STORE, whatsappLink } from './config.js';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-brand]').forEach((el) => {
  el.textContent = BRAND;
});
document.querySelectorAll('[data-brand-tagline]').forEach((el) => {
  el.textContent = BRAND_TAGLINE;
});
document.querySelectorAll('[data-brand-hashtag]').forEach((el) => {
  el.textContent = BRAND_HASHTAG;
});
document.querySelectorAll('[data-brand-handle]').forEach((el) => {
  el.textContent = BRAND_HANDLE;
});
document.title = `${BRAND} · Harput Çedenesi`;

const map = document.querySelector('[data-store-map]');
if (map) map.src = `https://www.google.com/maps?q=${encodeURIComponent(STORE.mapQuery)}&output=embed`;
document.querySelectorAll('[data-store]').forEach((el) => {
  el.textContent = STORE[el.dataset.store];
});

document.querySelectorAll('[data-whatsapp]').forEach((el) => {
  el.href = whatsappLink(el.dataset.whatsapp);
});

// "Bir fincan ısmarla": iki fincana basınca açılır; dosta WhatsApp paylaşımı ya da askıda çedene
const treatDialog = document.getElementById('treat-dialog');
if (treatDialog) {
  const shareText = `Sana Harput'tan bir fincan çedene ısmarladım. Bir fincanın kırk yıl hatırı vardır. ${location.origin}`;
  treatDialog.querySelector('[data-treat-share]').href = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  document.querySelectorAll('[data-treat-open]').forEach((btn) => btn.addEventListener('click', () => treatDialog.showModal()));
  treatDialog.querySelector('[data-treat-close]').addEventListener('click', () => treatDialog.close());
  treatDialog.addEventListener('click', (e) => {
    if (e.target === treatDialog) treatDialog.close();
  });
}

if (!reducedMotion) {
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

const splashDelay = initSplash({ reducedMotion });
initHome({ reducedMotion, delay: splashDelay });
initSections({ reducedMotion });
initI18n();

// Koyu/açık mod: düğmenin olduğu yerden daire şeklinde yayılan geçiş (View Transitions destekleyen tarayıcılarda)
const themeToggle = document.querySelector('[data-theme-toggle]');
if (themeToggle) {
  const root = document.documentElement;
  const sync = () => {
    const dark = root.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-label', dark ? 'Açık moda geç' : 'Koyu moda geç');
  };
  sync();
  themeToggle.addEventListener('click', () => {
    const apply = () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      if (next === 'dark') root.dataset.theme = 'dark';
      else delete root.dataset.theme;
      try {
        localStorage.setItem('harpulse-theme', next);
      } catch {
        // tercih hatırlanmaz, sorun değil
      }
      sync();
    };
    const r = themeToggle.getBoundingClientRect();
    root.style.setProperty('--tx', `${r.left + r.width / 2}px`);
    root.style.setProperty('--ty', `${r.top + r.height / 2}px`);
    if (document.startViewTransition && !reducedMotion) document.startViewTransition(apply);
    else apply();
  });
}
