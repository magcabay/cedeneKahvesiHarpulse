import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { startSteam } from './steam.js';

// Intro: sahneler yan yana bir şerittir. Sayfa aşağı kaydırıldıkça şerit sola akar,
// Harput fonu arkada daha yavaş kayar (parallax). Her sahne ekranın ortasına geldiğinde klibi oynar.
const PANEL_SCROLL = 70; // sahne başına scroll yüksekliği (vh): intro kısa kalsın

export function initStory({ reducedMotion }) {
  const story = document.querySelector('.story');
  if (!story) return;
  const q = (sel) => story.querySelector(sel);
  const qa = (sel) => [...story.querySelectorAll(sel)];

  const track = q('.story-track');
  const panels = qa('.story-panel');
  const dots = qa('.story-progress li');
  const steps = panels.length;
  const span = (steps - 1) * 100; // zaman çizelgesi: sahne i'nin merkezi = i * 100

  const videos = panels
    .map((panel, i) => ({ i, video: panel.querySelector('video'), t: 0, target: 0 }))
    .filter((v) => v.video);
  videos.forEach(({ video }) => {
    video.addEventListener('error', () => video.removeAttribute('src'), { once: true });
    video.load();
  });

  const steam = q('.chapter-steam');
  if (steam) startSteam(steam, steam.parentElement.querySelector('.story-media'));

  const setActive = (i) => dots.forEach((d) => d.classList.toggle('is-active', +d.dataset.step === i));
  setActive(0);

  if (reducedMotion) return;

  const textOf = (i) => panels[i].querySelector('.story-text');
  qa('.chapter-title span').forEach((s) => gsap.set(s, { yPercent: 110 }));
  gsap.set(qa('.chapter-num, .chapter-body, .chapter-facts li'), { autoAlpha: 0, y: 20 });

  // Açılış metni sayfa yüklenince gelir
  const hero = textOf(0);
  gsap.to(hero.querySelectorAll('.chapter-title span'), { yPercent: 0, duration: 1.4, stagger: 0.18, ease: 'power3.out', delay: 0.3 });
  gsap.to(hero.querySelectorAll('.chapter-num, .chapter-body'), { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.9 });

  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  tl.to(track, { xPercent: -100 * (steps - 1) / steps, duration: span }, 0)
    .to('.story-base', { xPercent: -8, scale: 1.15, duration: span }, 0)
    .fromTo('.story-dim', { opacity: 0.35 }, { opacity: 0.8, duration: 60, ease: 'power1.inOut' }, 0)
    .to('.scroll-hint', { autoAlpha: 0, duration: 10 }, 0)
    .to('.photo-credit', { autoAlpha: 0, duration: 20 }, 10);

  panels.forEach((panel, i) => {
    // Her sahnenin görüntüsü şeritten biraz geride kalır: derinlik hissi
    tl.fromTo(panel.querySelector('.story-media'), { xPercent: i === 0 ? 0 : -12 }, { xPercent: 12, duration: 200 }, (i - 1) * 100);
    if (i === 0) return;
    const text = textOf(i);
    tl.to(text.querySelectorAll('.chapter-title span'), { yPercent: 0, duration: 30, stagger: 8, ease: 'power3.out' }, i * 100 - 45)
      .to(text.querySelectorAll('.chapter-num, .chapter-body, .chapter-facts li'), { autoAlpha: 1, y: 0, duration: 25, stagger: 6, ease: 'power3.out' }, i * 100 - 30);
  });

  // Son: şerit durunca kısa bir an bekler, sonra siyaha kararıp içerik bölümlerine geçer
  tl.to('.story-fade', { opacity: 1, duration: 20 }, span + 20);

  ScrollTrigger.create({
    trigger: story,
    start: 'top top',
    end: `+=${(steps - 1) * PANEL_SCROLL + 40}%`,
    pin: '.story-stage',
    scrub: 0.6,
    animation: tl,
    onUpdate: (self) => {
      const pos = (self.progress * tl.duration()) / 100; // ortadaki sahnenin sürekli konumu
      setActive(Math.min(steps - 1, Math.round(pos)));
      videos.forEach((v) => {
        if (!v.video.duration) return;
        // Sahne sağdan girerken başlar, ortada durunca biter
        const local = gsap.utils.clamp(0, 1, pos - v.i + 0.8);
        v.target = local * (v.video.duration - 0.05);
      });
    },
  });

  // Video zamanı hedefe yumuşakça yaklaşır: tekerlek adımları kare atlaması gibi görünmez
  gsap.ticker.add(() => {
    videos.forEach((v) => {
      if (!v.video.duration) return;
      v.t += (v.target - v.t) * 0.18;
      if (Math.abs(v.video.currentTime - v.t) > 0.01) v.video.currentTime = v.t;
    });
  });
}
