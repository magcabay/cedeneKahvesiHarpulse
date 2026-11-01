import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles.css';
import { initHome } from './scenes/home.js';
import { initSplash } from './scenes/splash.js';
import { initI18n } from './i18n.js';
import { initCupDesigner } from './scenes/cup.js';
import { initSections } from './scenes/sections.js';
import { BRAND, BRAND_HANDLE, BRAND_HASHTAG, BRAND_TAGLINE, STORE, whatsappLink } from './config.js';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Sayfa her açılışta en baştan başlar: tarayıcının kaldığı yeri hatırlaması ve #bölüm adresleri intro'dan sonra ortaya atlatmasın
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (location.hash) history.replaceState(null, '', location.pathname + location.search);
window.scrollTo(0, 0);

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
  const shareText = `Sana Harput'tan bir fincan çedene ısmarladım. Bir fincanın kırk yıl hatırı vardır. ${location.origin}${import.meta.env.BASE_URL}`;
  treatDialog.querySelector('[data-treat-share]').href = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  document.querySelectorAll('[data-treat-open]').forEach((btn) => btn.addEventListener('click', () => treatDialog.showModal()));
  treatDialog.querySelector('[data-treat-close]').addEventListener('click', () => treatDialog.close());
  treatDialog.addEventListener('click', (e) => {
    if (e.target === treatDialog) treatDialog.close();
  });
}

// Görseller sürüklenip kaydırılamasın
document.querySelectorAll('img').forEach((img) => img.setAttribute('draggable', 'false'));
document.addEventListener('dragstart', (e) => {
  if (e.target.closest?.('img, video')) e.preventDefault();
});

let lenis = null;
if (!reducedMotion) {
  lenis = new Lenis();
  lenis.scrollTo(0, { immediate: true });
  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// İç bağlantılar (#menu gibi): Lenis'in yarım kalan kaydırması geri çekmesin diye kaydırmayı Lenis üzerinden yap
const HEADER_OFFSET = -84;
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const hash = link.getAttribute('href');
  if (hash === '#') return;
  const target = hash === '#top' ? document.body : document.querySelector(hash);
  if (!target) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(hash === '#top' ? 0 : target, { offset: HEADER_OFFSET, duration: 1.2 });
  else window.scrollTo({ top: hash === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET, behavior: 'smooth' });
});

// Yukarı çık oku: açılış geçilince belirir
const toTop = document.querySelector('[data-to-top]');
if (toTop) {
  const sync = () => toTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.9);
  window.addEventListener('scroll', sync, { passive: true });
  sync();
  toTop.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const splashDelay = initSplash({ reducedMotion, lenis });
initHome({ reducedMotion, delay: splashDelay });
initSections({ reducedMotion });
initCupDesigner();
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
