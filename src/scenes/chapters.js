import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { startSteam } from './steam.js';

// Her bölüm ekrana sabitlenir; scroll ilerlemesi klibin zamanına bağlanır (örnekteki "Wake the Beans" yapısı).
// Klip yoksa poster görseli, o da yoksa siyah zemin kalır: sayfa hiçbir aşamada kırılmaz.
// Açılış bölümü video değil fotoğraftır: aynı pin ve metin akışını, yalnızca yavaş yakınlaşmayla kullanır.
const PIN_LENGTH = '+=220%';

export function initChapters({ reducedMotion }) {
  document.querySelectorAll('.chapter').forEach((chapter) => {
    const media = chapter.querySelector('.chapter-video');
    const video = media.tagName === 'VIDEO' ? media : null;
    const lines = chapter.querySelectorAll('.chapter-title span');
    const rest = chapter.querySelectorAll('.chapter-num, .chapter-body, .chapter-facts li');
    const hint = chapter.querySelector('.scroll-hint');
    const steam = chapter.querySelector('.chapter-steam');

    if (video) {
      video.addEventListener('error', () => video.removeAttribute('src'), { once: true });
      video.load();
    }
    if (steam) startSteam(steam, media);

    if (reducedMotion) return;

    const isHero = chapter.classList.contains('chapter-hero');
    gsap.set(lines, { yPercent: 110 });
    gsap.set(rest, { autoAlpha: 0, y: 20 });

    // Açılış metni sayfa yüklenince gelir; diğer bölümlerinki scroll ile.
    if (isHero) {
      gsap.to(lines, { yPercent: 0, duration: 1.4, stagger: 0.18, ease: 'power3.out', delay: 0.3 });
      gsap.to(rest, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.9 });
    }

    // Konumlar 0–100 = bölümün scroll yüzdesi.
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (!isHero) {
      tl.to(lines, { yPercent: 0, duration: 12, stagger: 4 }, 2)
        .to(rest, { autoAlpha: 1, y: 0, duration: 10, stagger: 3 }, 10);
    }
    tl.to(chapter.querySelector('.chapter-text'), { autoAlpha: 0, y: -40, duration: 10, ease: 'power2.in' }, 88)
      .to(media, { scale: isHero ? 1.18 : 1.06, duration: 100, ease: 'none' }, 0);
    if (hint) tl.to(hint, { autoAlpha: 0, duration: 6 }, 0);
    tl.set({}, {}, 100);

    // Videonun zamanı yumuşatılarak hedefe yaklaşır: tekerlek adımları kare atlaması gibi görünmez.
    const clip = { t: 0 };
    let target = 0;
    if (video) {
      gsap.ticker.add(() => {
        if (!video.duration) return;
        clip.t += (target - clip.t) * 0.18;
        if (Math.abs(video.currentTime - clip.t) > 0.01) video.currentTime = clip.t;
      });
    }

    ScrollTrigger.create({
      trigger: chapter,
      start: 'top top',
      end: isHero ? '+=120%' : PIN_LENGTH,
      pin: true,
      scrub: 0.6,
      animation: tl,
      onUpdate: (self) => {
        if (video?.duration) target = self.progress * (video.duration - 0.05);
      },
    });
  });
}
