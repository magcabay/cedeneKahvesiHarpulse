// Fincan görselinin üstünde yükselen buhar (sinemagraf): fotoğraf durur, buhar canlıdır.
// Kaynak noktası görselin piksel koordinatındadır; object-fit: cover ve object-position'a göre ekrana çevrilir.
const SOURCE = { x: 640, y: 338, spread: 120 }; // 04-poster.jpg (1280×720) üzerinde fincan ağzı
const IMAGE = { w: 1280, h: 720 };
const COUNT = 34;

export function startSteam(canvas, media) {
  const ctx = canvas.getContext('2d');
  let w = 0;
  let h = 0;
  let dpr = 1;
  let origin = { x: 0, y: 0, scale: 1 };
  let running = false;

  const particles = Array.from({ length: COUNT }, () => spawn(true));

  function spawn(randomAge = false) {
    return {
      ox: (Math.random() - 0.5) * SOURCE.spread,
      age: randomAge ? Math.random() : 0,
      life: 5 + Math.random() * 4,
      size: 18 + Math.random() * 26,
      drift: (Math.random() - 0.3) * 40,
      phase: Math.random() * Math.PI * 2,
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // object-fit: cover hesabı
    const scale = Math.max(w / IMAGE.w, h / IMAGE.h);
    const [px, py] = getComputedStyle(media).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
    const offX = (w - IMAGE.w * scale) * (Number.isNaN(px) ? 0.5 : px);
    const offY = (h - IMAGE.h * scale) * (Number.isNaN(py) ? 0.5 : py);
    origin = { x: offX + SOURCE.x * scale, y: offY + SOURCE.y * scale, scale };
  }

  let last = performance.now();
  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    for (const p of particles) {
      p.age += dt / p.life;
      if (p.age >= 1) Object.assign(p, spawn());
      const t = p.age;
      const rise = t * 260 * origin.scale;
      const x = origin.x + (p.ox + p.drift * t + Math.sin(p.phase + t * 5) * 14 * t) * origin.scale;
      const y = origin.y - rise;
      const r = (p.size + t * 70) * origin.scale;
      // Doğar, yükselirken kalınlaşır, dağılırken söner
      const alpha = Math.sin(Math.PI * Math.min(1, t * 1.3)) * 0.07;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(232, 220, 203, ${alpha})`);
      g.addColorStop(1, 'rgba(232, 220, 203, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', resize);

  // Yalnızca bölüm görünürken çiz
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) {
      running = true;
      resize();
      last = performance.now();
      requestAnimationFrame(frame);
    } else if (!entry.isIntersecting) {
      running = false;
    }
  }).observe(canvas);
}
