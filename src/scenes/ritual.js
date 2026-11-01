import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ritualSvg from '../svg/ritual.svg?raw';

// Zaman çizelgesi 0–100 birim: her konum doğrudan scroll yüzdesidir (plan §4).
const SCENE_HEIGHT = 900; // SVG dünyasında bir sahnenin yüksekliği
const POT_START_X = 170; // -30vw karşılığı (1600 * 0.3 = 480 birim solda)
const POT_SAND_X = 650;
const POT_SAND_Y = 2370;
const MORTAR_TOP = { x: 800, y: 1440 };

export function initRitual({ reducedMotion }) {
  const section = document.getElementById('ritual');
  const stage = document.getElementById('ritual-stage');
  stage.innerHTML = ritualSvg;

  const q = (sel) => stage.querySelector(sel);
  const qa = (sel) => stage.querySelectorAll(sel);
  const captions = section.querySelectorAll('.caption');
  const cards = section.querySelectorAll('.info-card');

  prepareStrokes([q('#tree-trunk'), ...qa('.branch'), q('#pour')]);
  gsap.set(q('#pot-move'), { x: POT_START_X, y: POT_SAND_Y });
  gsap.set(qa('.leaf'), { scale: 0, transformOrigin: '50% 50%' });
  gsap.set(qa('.seed'), { opacity: 0 });
  gsap.set(q('#sand-pile'), { scaleY: 0, transformOrigin: '50% 100%' });
  gsap.set(q('#pestle'), { rotation: -25, svgOrigin: '800 1230' });
  gsap.set([...captions, ...cards], { autoAlpha: 0, y: 24 });

  const tl = gsap.timeline({ defaults: { ease: 'none' } });

  // 0–10 · Harput silueti ve yamaçlar beliriyor, parallax
  tl.fromTo('#mountain-far', { opacity: 0 }, { opacity: 0.6, duration: 10 }, 0)
    .fromTo('#mountain-mid', { opacity: 0 }, { opacity: 1, duration: 10 }, 0)
    .fromTo('#mountain-near', { opacity: 0 }, { opacity: 1, duration: 10 }, 0)
    .to('#mountain-far', { y: 30, duration: 22 }, 0)
    .to('#mountain-mid', { y: 60, duration: 22 }, 0)
    .to('#mountain-near', { y: 100, duration: 22 }, 0)
    .to('#tree', { y: 100, duration: 22 }, 0);
  showCaption(tl, captions[0], 1, 19);

  // 10–22 · Ağaç büyüyor: gövde, dallar, yapraklar
  tl.to('#tree-trunk', { strokeDashoffset: 0, duration: 4, ease: 'power2.out' }, 10)
    .to('.branch', { strokeDashoffset: 0, duration: 3, stagger: 0.6, ease: 'power2.out' }, 13.5)
    .to('.leaf', { scale: 1, duration: 2, stagger: 0.3, ease: 'power2.out' }, 17)
    .to('.seed', { opacity: 1, duration: 1.5, stagger: 0.1 }, 19.5);

  // 22–30 · Taneler düşer, kamera dibeğe iner
  tl.to('#world', { y: -SCENE_HEIGHT, duration: 8, ease: 'power1.inOut' }, 22);
  qa('.seed').forEach((seed, i) => {
    const sx = +seed.getAttribute('cx');
    const sy = +seed.getAttribute('cy') + 100; // ağacın parallax kayması
    const dx = MORTAR_TOP.x - sx + (i - 4.5) * 12;
    const dy = MORTAR_TOP.y - sy;
    tl.to(seed, {
      motionPath: { path: [{ x: 0, y: 0 }, { x: dx * 0.4, y: dy * 0.35 }, { x: dx, y: dy }], curviness: 1.2 },
      duration: 6,
      ease: 'power1.in',
    }, 22.5 + i * 0.25);
  });
  showCaption(tl, captions[1], 23, 39);

  // 30–40 · Tokmak 3 kez vurur, taneler ezilir, yeşil yağ parlar
  for (let hit = 0; hit < 3; hit++) {
    const t = 30.5 + hit * 3;
    tl.to('#pestle', { rotation: 0, duration: 0.9, ease: 'power3.in' }, t)
      .to('#world', { x: 2, duration: 0.1, yoyo: true, repeat: 3 }, t + 0.9)
      .to('#seeds', { scaleY: 1 - (hit + 1) * 0.2, svgOrigin: `${MORTAR_TOP.x} ${MORTAR_TOP.y + 100}`, duration: 0.3 }, t + 0.9)
      .to('#oil-glow', { opacity: 0.4 + hit * 0.25, duration: 0.4, yoyo: true, repeat: 1 }, t + 0.9)
      .to('#mortar-mash', { opacity: (hit + 1) / 3, duration: 0.5 }, t + 0.9)
      .to('#pestle', { rotation: -25, duration: 1.4, ease: 'power1.out' }, t + 1.3);
  }
  tl.to('#seeds', { opacity: 0, duration: 1 }, 39);

  // 40–55 · Kum tavası ve kor; cezve soldan kuma girer (lineer, el hissi)
  tl.to('#world', { y: -SCENE_HEIGHT * 2, duration: 3, ease: 'power1.inOut' }, 39.5)
    .to('#pot-move', { x: POT_SAND_X, duration: 15 }, 40)
    .to('#sand-pile', { scaleY: 1, duration: 15 }, 40)
    .to('#heat-wave', { opacity: 0.12, duration: 3 }, 44);
  showCaption(tl, captions[2], 41, 64);

  // 55–65 · Sıvı kabarır, köpük ve kabarcıklar
  tl.to('#pot-liquid', { y: -140, duration: 10 }, 55)
    .to('#foam', { y: -140, duration: 10 }, 55)
    .to('#bubbles', { y: -140, duration: 10 }, 55)
    .fromTo('#foam', { opacity: 0 }, { opacity: 1, duration: 3 }, 58);

  // 65–75 · Cezve kumdan kalkar, fincanın üstüne gelir, kulptan eğilir
  tl.to('#sand-pile', { opacity: 0, duration: 2 }, 65)
    .to('#heat-wave', { opacity: 0, duration: 2 }, 65)
    .to('#pot-move', { y: POT_SAND_Y - 180, duration: 4, ease: 'power1.out' }, 65)
    .to('#pot-move', { x: POT_SAND_X + 400, duration: 6, ease: 'power1.inOut' }, 66)
    .to('#pot', { rotation: -35, svgOrigin: '235 -141', duration: 4 }, 71);
  showCaption(tl, captions[3], 66, 94);

  // 75–95 · Döküm, fincan dolar, kartlar %25/%50/%75'te, buhar
  tl.to('#pour', { strokeDashoffset: 0, duration: 2 }, 75)
    .to('#pot-liquid', { y: -40, duration: 18 }, 76)
    .to('#cup-fill', { y: -88, duration: 18 }, 76)
    .to('#steam', { opacity: 1, duration: 4 }, 80)
    .to('#pour', { opacity: 0, duration: 1 }, 94);
  cards.forEach((card, i) => {
    tl.to(card, { autoAlpha: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 80 + i * 5);
  });

  // 95–100 · Cezve çekilir, sahne kararır, fincan siyahta tek kalır
  tl.to('#pot-move', { x: POT_SAND_X + 900, y: POT_SAND_Y - 500, duration: 4, ease: 'power1.in' }, 95)
    .to(['#scene-hills', '#scene-mortar', '#scene-sand'], { opacity: 0.15, duration: 5 }, 95)
    .to(cards, { autoAlpha: 0, duration: 3 }, 97);

  // Geliştirmede konsoldan yüzdeye atlamak için: __ritual.progress(0.5)
  if (import.meta.env.DEV) window.__ritual = tl;

  if (reducedMotion) {
    tl.progress(1).pause();
    return;
  }

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: '+=600%',
    pin: true,
    scrub: 1,
    animation: tl,
  });

  startAmbientLoops(q, qa);
}

// Scroll'dan bağımsız sürekli döngüler
function startAmbientLoops(q, qa) {
  gsap.fromTo(q('#tree'), { rotation: -1.2 }, {
    rotation: 1.2, svgOrigin: '520 728', duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1,
  });
  gsap.to(q('#ember'), { opacity: 0.55, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.to(q('#heat-wave'), { x: 8, scaleY: 1.1, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  qa('.bubble').forEach((b, i) => {
    gsap.to(b, { y: -18, opacity: 0, duration: 1.6 + i * 0.3, ease: 'none', repeat: -1, delay: i * 0.4 });
  });
  gsap.to(qa('.foam'), {
    scale: 1.15, transformOrigin: '50% 50%', duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.15,
  });
  gsap.to(q('#pour'), { attr: { 'stroke-width': 5 }, x: 1.5, duration: 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.fromTo(q('#ripple'), { scale: 0, opacity: 1, transformOrigin: '50% 50%' }, {
    scale: 2, opacity: 0, duration: 1.1, ease: 'power1.out', repeat: -1,
  });
  qa('.steam').forEach((s, i) => {
    gsap.fromTo(s, { y: 0, opacity: 0.35 }, { y: -60, opacity: 0, duration: 3, ease: 'none', repeat: -1, delay: i });
  });
}

function prepareStrokes(paths) {
  paths.forEach((p) => {
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
  });
}

function showCaption(tl, el, from, to) {
  tl.to(el, { autoAlpha: 1, y: 0, duration: 2, ease: 'power2.out' }, from)
    .to(el, { autoAlpha: 0, y: -24, duration: 2, ease: 'power2.in' }, to - 2);
}
