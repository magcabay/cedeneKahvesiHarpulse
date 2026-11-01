import gsap from 'gsap';
import { BRAND } from '../config.js';

// Açılış: Elazığ'dan dünya şehirlerine rotalar çizilir, marka belirir, perde kalkar.
// Her açılışta gösterilir (Geç ile atlanabilir); dönen değer açılış sahnesinin ne kadar bekleyeceğidir (saniye).
export function initSplash({ reducedMotion }) {
  const splash = document.getElementById('splash');
  if (!splash) return 0;


  // Marka adı logoda harf harf yükselsin diye bölünür
  const logo = splash.querySelector('.splash-logo');
  logo.innerHTML = [...BRAND].map((c) => `<span>${c}</span>`).join('');

  document.documentElement.classList.add('is-splashing');
  const routes = splash.querySelectorAll('.splash-routes path');
  routes.forEach((p) => {
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
  });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish });
  tl.fromTo('.splash-bg', { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 3.6, ease: 'power2.out' }, 0)
    .from('.splash-globe', { opacity: 0, scale: 0.92, transformOrigin: '50% 55%', duration: 1 }, 0)
    .from('.splash-origin', { opacity: 0, scale: 0, svgOrigin: '470 236', duration: 0.6, ease: 'back.out(2)' }, 0.25)
    .to(routes, { strokeDashoffset: 0, duration: 0.9, stagger: 0.12, ease: 'power2.inOut' }, 0.55)
    .from('.splash-city', { opacity: 0, y: 8, duration: 0.4, stagger: 0.12, ease: 'back.out(2.5)' }, 1.15)
    .from('.splash-logo span', { yPercent: 120, opacity: 0, duration: 0.7, stagger: 0.05 }, 1.3)
    .from('.splash-tagline', { y: 18, opacity: 0, duration: 0.7 }, 1.8)
    .to(splash, { yPercent: -100, duration: 0.9, ease: 'power3.inOut' }, 3.1);

  gsap.to('.splash-pulse', { scale: 2.6, opacity: 0, svgOrigin: '470 236', duration: 1.2, repeat: -1, ease: 'power1.out' });

  function finish() {
    document.documentElement.classList.remove('is-splashing');
    gsap.killTweensOf('.splash-pulse');
    splash.remove();
  }

  splash.querySelector('[data-splash-skip]').addEventListener('click', () => {
    tl.progress(1);
  });

  // Açılış sahnesi perde kalkarken başlasın
  return 3.2;
}
