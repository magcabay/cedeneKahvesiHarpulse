import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ana sayfa hareketleri: açılış girişi ve parallax, yatay hikâye şeridi, sayan rakamlar, görsel yakınlaşmaları.
export function initHome({ reducedMotion, delay = 0 }) {
  mascot(reducedMotion);
  if (reducedMotion) return;
  heroIntro(delay);
  journey();
  countUp();
  reveals();
}

function heroIntro(delay) {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Giriş: dalga süzülür, başlık kelime kelime yükselir, fincan dönerek gelir, kartlar kayar
  gsap.timeline({ defaults: { ease: 'power3.out' }, delay })
    .from('.hero-wave-shape, .hero-visual', { x: () => window.innerWidth * 0.3, opacity: 0, duration: 1.4, ease: 'power2.out' }, 0)
    .from('.hero .eyebrow', { y: 20, opacity: 0, duration: 0.8 }, 0.2)
    .from('.hero-title .w', { yPercent: 110, opacity: 0, rotate: 4, duration: 1, stagger: 0.12 }, 0.3)
    .from('.hero-lead, .hero .hero-actions', { y: 24, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.8)
        .from('.hero-card', { y: 80, opacity: 0, duration: 1, stagger: 0.15 }, 0.9)
    .from('.hero-seal', { scale: 0.4, opacity: 0, rotate: -120, duration: 1.4, ease: 'back.out(1.4)' }, 1.1)
    .from('.hero-watermark', { opacity: 0, duration: 2 }, 0);

  // Mühür: yazı çemberi sürekli döner, mühür hafifçe süzülür
  gsap.to('.seal-text', { rotate: 360, svgOrigin: '100 100', duration: 24, ease: 'none', repeat: -1 });
  gsap.to('.hero-seal', { y: -10, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.5 });

  // Harput silüeti: önce dağlar, sonra kayalık tepe ve kale bakır çizgiyle çizilir; dolgu ardından belirir
  document.querySelectorAll('.hero-skyline path').forEach((p, i) => {
    const len = p.getTotalLength();
    gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len, fillOpacity: 0 }, {
      strokeDashoffset: 0, fillOpacity: 1, duration: 2.2, ease: 'power2.inOut', delay: delay + 0.3 + Math.min(i, 5) * 0.25,
    });
  });

  // Parallax: scroll ile katmanlar farklı hızda
  const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('.hero-copy', { yPercent: -18, ease: 'none', scrollTrigger: st });
  gsap.to('.hero-watermark img', { yPercent: 12, ease: 'none', scrollTrigger: { ...st } });
  gsap.to('.hero-cards', { yPercent: -45, ease: 'none', scrollTrigger: { ...st } });
  gsap.to('.hero-wave-shape, .hero-visual', { xPercent: 12, ease: 'none', scrollTrigger: { ...st } });
}

function journey() {
  const section = document.querySelector('.journey');
  if (!section) return;
  const track = section.querySelector('.journey-track');
  const bar = section.querySelector('.journey-progress i');
  const distance = () => track.scrollWidth - section.clientWidth;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  });
  tl.to(track, { x: () => -distance(), ease: 'none' }, 0)
    .fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);

}

function countUp() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: end > 1000 ? end - 60 : 0 };
    el.textContent = Math.round(obj.v);
    gsap.to(obj, {
      v: end,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        el.textContent = Math.round(obj.v);
      },
    });
  });
}

function reveals() {
  // Neden çedene: fincan scroll ile döner gelir, maddeler iki yandan sırayla belirir
  const why = document.querySelector('.why-orbit');
  if (why) {
    gsap.fromTo('.why-center img', { scale: 0.75, rotate: -25 }, {
      scale: 1, rotate: 0, ease: 'none',
      scrollTrigger: { trigger: why, start: 'top bottom', end: 'center center', scrub: true },
    });
    gsap.from('.why-left .why-item', {
      x: -60, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out',
      scrollTrigger: { trigger: why, start: 'top 70%', once: true },
    });
    gsap.from('.why-right .why-item', {
      x: 60, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out', delay: 0.1,
      scrollTrigger: { trigger: why, start: 'top 70%', once: true },
    });
  }

  // Tat çubukları kart görününce tek tek dolar
  const taste = document.querySelector('.taste');
  if (taste) {
    ScrollTrigger.create({
      trigger: taste,
      start: 'top 75%',
      once: true,
      onEnter: () => taste.classList.add('is-tasted'),
    });
  }

  // Harput filigranı bölümden daha yavaş kayar
  gsap.fromTo('.hatir-watermark img', { yPercent: -10, scale: 1.15 }, {
    yPercent: 10, scale: 1.05, ease: 'none',
    scrollTrigger: { trigger: '.hatir', start: 'top bottom', end: 'bottom top', scrub: true },
  });
  gsap.from('.hatir-badge', {
    scale: 0, rotate: -90, duration: 0.9, ease: 'back.out(1.8)',
    scrollTrigger: { trigger: '.hatir', start: 'top 70%', once: true },
  });
  gsap.utils.toArray('.product-card, .hero-card').forEach((card) => {
    card.addEventListener('mouseenter', () => gsap.to(card, { y: -8, duration: 0.35, ease: 'power2.out' }));
    card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.35, ease: 'power2.out' }));
  });
  gsap.from('.promo-media img', {
    yPercent: 12, rotate: -6, ease: 'none',
    scrollTrigger: { trigger: '.promo', start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

// Maskot: açılıştan sonra belirir, el sallar; tıklanınca tadım kartına götürür
function mascot(reducedMotion) {
  const btn = document.querySelector('[data-mascot]');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.querySelector('.taste')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  if (reducedMotion) {
    btn.classList.add('is-visible');
    return;
  }
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'bottom 60%',
    onEnter: () => btn.classList.add('is-visible'),
    onLeaveBack: () => btn.classList.remove('is-visible'),
  });
  gsap.to(btn.querySelector('.mascot-arm'), {
    rotate: -28, svgOrigin: '40 104', duration: 0.35, ease: 'sine.inOut', yoyo: true, repeat: -1, repeatDelay: 0.05,
  });
  gsap.to(btn.querySelectorAll('.mascot-steam path'), {
    y: -6, opacity: 0.2, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.3,
  });
  // Ara sıra göz kırpar
  gsap.to(btn.querySelector('.mascot-eyes'), {
    scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.08, yoyo: true, repeat: -1, repeatDelay: 3.2,
  });
}
