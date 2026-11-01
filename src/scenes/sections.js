import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Sahne 4–6: pinned değil, normal akış. Her bölüm için tek giriş animasyonu (plan §4).
// C: menü yatay kaydırma ve mobil düzen buraya eklenecek.
export function initSections({ reducedMotion }) {
  document.querySelectorAll('.split').forEach(splitChars);
  if (reducedMotion) return;

  document.querySelectorAll('.section').forEach((section) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 70%', once: true },
    });
    tl.from(section.querySelectorAll('.split .char'), {
      opacity: 0, y: 20, duration: 0.6, stagger: 0.025, ease: 'power2.out',
    }).from(section.querySelectorAll('.fade'), {
      opacity: 0, y: 16, duration: 0.8, stagger: 0.12, ease: 'power2.out',
    }, '-=0.3');
  });

  ScrollTrigger.refresh();
}

// SplitText yerine kendi span bölmemiz; kelimeler satır sonunda bölünmesin diye kelime sarmalı.
function splitChars(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.setAttribute('aria-label', el.textContent.trim());
  el.innerHTML = words
    .map((w) => `<span class="word" aria-hidden="true">${[...w].map((c) => `<span class="char">${c}</span>`).join('')}</span>`)
    .join(' ');
}
