// Sahne 0 manzarası: gece göğü, fraktal dağ sırtları (3 katman) ve kayalık tepe üstünde Harput Kalesi.
// ritual.js sözleşmesi: #mountain-far, #mountain-mid, #mountain-near (artık grup; opaklık ve y parallax'ı alırlar).
const NS = 'http://www.w3.org/2000/svg';
const W = 1600;
const H = 900;
const TREE_BASE = { x: 520, y: 728 };
const CASTLE = { x0: 880, x1: 1080, top: 548 };

function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Orta nokta kaydırma ile doğal dağ sırtı; roughness küçüldükçe sırt yumuşar.
function ridge(rand, { base, amp, roughness, anchors = [] }) {
  const n = 128;
  const ys = new Array(n + 1);
  ys[0] = base + (rand() - 0.5) * amp;
  ys[n] = base + (rand() - 0.5) * amp;
  let step = n;
  let a = amp;
  while (step > 1) {
    const half = step / 2;
    for (let i = half; i < n; i += step) {
      ys[i] = (ys[i - half] + ys[i + half]) / 2 + (rand() - 0.5) * a;
    }
    a *= roughness;
    step = half;
  }
  const pts = ys.map((y, i) => ({ x: (i / n) * W, y }));
  // Sabitlenen noktalar (ağacın tabanı, kale tepesi) çevresine yumuşakça çekilir
  anchors.forEach(({ x, y, radius }) => {
    pts.forEach((p) => {
      const d = Math.abs(p.x - x);
      if (d < radius) {
        const w = 0.5 + 0.5 * Math.cos((d / radius) * Math.PI);
        p.y = p.y * (1 - w) + y * w;
      }
    });
  });
  return pts;
}

const toPath = (pts) =>
  `M0 ${H} L${pts.map((p) => `${f(p.x)} ${f(p.y)}`).join(' L')} L${W} ${H} Z`;
const toLine = (pts) => `M${pts.map((p) => `${f(p.x)} ${f(p.y)}`).join(' L')}`;

export function buildLandscape(group) {
  const rand = mulberry32(23);
  ensureDefs(group.ownerSVGElement);
  group.querySelectorAll('#mountain-far, #mountain-mid, #mountain-near').forEach((n) => n.remove());

  const sky = el('g', { id: 'sky' });
  sky.append(el('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#g-sky)' }));
  for (let i = 0; i < 70; i++) {
    sky.append(el('circle', {
      cx: f(rand() * W), cy: f(rand() * 420), r: f(0.4 + rand() * 0.9),
      fill: '#E8DCCB', opacity: f(0.15 + rand() * 0.45),
    }));
  }

  const far = el('g', { id: 'mountain-far' });
  const farPts = ridge(rand, { base: 520, amp: 180, roughness: 0.55 });
  far.append(
    el('path', { d: toPath(farPts), fill: 'url(#g-far)' }),
    el('path', { d: toLine(farPts), fill: 'none', stroke: '#3a3530', 'stroke-width': 1.2, opacity: 0.7 }),
  );

  const mid = el('g', { id: 'mountain-mid' });
  const midPts = ridge(rand, {
    base: 640, amp: 150, roughness: 0.58,
    anchors: [{ x: (CASTLE.x0 + CASTLE.x1) / 2, y: CASTLE.top + 22, radius: 190 }],
  });
  mid.append(
    el('path', { d: toPath(midPts), fill: 'url(#g-mid)' }),
    el('path', { d: toPath(midPts), fill: 'url(#p-rock)', opacity: 0.5 }),
    el('path', { d: toLine(midPts), fill: 'none', stroke: '#4a4038', 'stroke-width': 1.4, opacity: 0.8 }),
    buildCastle(rand, midPts),
  );

  const near = el('g', { id: 'mountain-near' });
  const nearPts = ridge(rand, {
    base: 760, amp: 70, roughness: 0.62,
    anchors: [{ x: TREE_BASE.x, y: TREE_BASE.y, radius: 160 }],
  });
  near.append(
    el('path', { d: toPath(nearPts), fill: 'url(#g-near)' }),
    el('path', { d: toPath(nearPts), fill: 'url(#p-rock)', opacity: 0.8 }),
    el('path', { d: toLine(nearPts), fill: 'none', stroke: '#2e2924', 'stroke-width': 1.6 }),
    buildScrub(rand, nearPts),
  );

  group.prepend(sky, far, mid, near);
}

// Harput Kalesi: kayalık çıkıntı, düzensiz sur, farklı boyda kuleler, mazgallar, gece aydınlatması
function buildCastle(rand, midPts) {
  const g = el('g', { id: 'castle' });
  const groundAt = (x) => {
    const p = midPts.reduce((best, q) => (Math.abs(q.x - x) < Math.abs(best.x - x) ? q : best));
    return p.y;
  };

  // Kayalık tepe: surların oturduğu sarp çıkıntı
  const rock = [];
  for (let x = CASTLE.x0 - 40; x <= CASTLE.x1 + 40; x += 10) {
    const edge = Math.min(1, (x - (CASTLE.x0 - 40)) / 60, (CASTLE.x1 + 40 - x) / 60);
    rock.push({ x, y: CASTLE.top + 30 - edge * 12 + (rand() - 0.5) * 6 });
  }
  const rockBottom = Math.max(groundAt(CASTLE.x0 - 40), groundAt(CASTLE.x1 + 40)) + 20;
  g.append(el('path', {
    d: `M${CASTLE.x0 - 60} ${f(rockBottom)} L${rock.map((p) => `${f(p.x)} ${f(p.y)}`).join(' L')} L${CASTLE.x1 + 60} ${f(rockBottom)} Z`,
    fill: 'url(#g-mid)',
  }));

  // Sur ve kuleler: [x, genişlik, yükseklik, kule mi]
  const segments = [];
  let x = CASTLE.x0;
  while (x < CASTLE.x1) {
    const tower = rand() < 0.42;
    const w = tower ? 14 + rand() * 12 : 18 + rand() * 26;
    const h = tower ? 44 + rand() * 30 : 22 + rand() * 12;
    const ruined = !tower && rand() < 0.2;
    segments.push({ x, w: Math.min(w, CASTLE.x1 - x), h: ruined ? h * 0.55 : h, tower });
    x += w;
  }

  const walls = el('g', { fill: 'url(#g-wall)' });
  const crenels = el('g', { fill: 'url(#g-wall)' });
  const lights = el('g', { fill: '#E07B39' });
  segments.forEach((s) => {
    const baseY = CASTLE.top + 24;
    const topY = baseY - s.h;
    walls.append(el('rect', { x: f(s.x), y: f(topY), width: f(s.w + 0.5), height: f(s.h + 4) }));
    // Mazgallar
    const step = s.tower ? 5 : 6;
    for (let cx = s.x + 1; cx < s.x + s.w - 2; cx += step * 2) {
      crenels.append(el('rect', { x: f(cx), y: f(topY - 4), width: step, height: 4 }));
    }
    // Mazgal pencereleri ve sıcak ışık
    if (s.tower) {
      lights.append(el('rect', { x: f(s.x + s.w / 2 - 1), y: f(topY + 10), width: 2, height: 6, opacity: 0.85 }));
      if (s.h > 56) lights.append(el('rect', { x: f(s.x + s.w / 2 - 1), y: f(topY + 26), width: 2, height: 5, opacity: 0.6 }));
    }
  });

  // Alttan vuran projektör ışığı: sıcak, yukarıda sönen
  const glow = el('rect', {
    x: CASTLE.x0 - 10, y: CASTLE.top - 60, width: CASTLE.x1 - CASTLE.x0 + 20, height: 90,
    fill: 'url(#g-castle-light)',
  });
  g.append(walls, crenels, glow, lights);
  return g;
}

// Yamaçtaki çalılar ve taşlar: ön planın ölçeğini ve dokusunu verir
function buildScrub(rand, pts) {
  const g = el('g', { id: 'scrub' });
  for (let i = 0; i < 46; i++) {
    const p = pts[Math.floor(rand() * pts.length)];
    if (Math.abs(p.x - TREE_BASE.x) < 70) continue;
    const r = 3 + rand() * 9;
    g.append(el('ellipse', {
      cx: f(p.x), cy: f(p.y + 4 + rand() * 30), rx: f(r), ry: f(r * 0.6),
      fill: rand() < 0.6 ? '#1c2a20' : '#1d1a17', opacity: f(0.6 + rand() * 0.4),
    }));
  }
  return g;
}

function ensureDefs(svg) {
  const defs = svg.querySelector('defs');
  if (defs.querySelector('#g-sky')) return;
  defs.insertAdjacentHTML('beforeend', `
    <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#050505"/>
      <stop offset="55%" stop-color="#0b0a0a"/>
      <stop offset="78%" stop-color="#1e140e"/>
      <stop offset="100%" stop-color="#2a1a10"/>
    </linearGradient>
    <linearGradient id="g-far" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a2622"/>
      <stop offset="100%" stop-color="#141210"/>
    </linearGradient>
    <linearGradient id="g-mid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#26211c"/>
      <stop offset="100%" stop-color="#0f0d0c"/>
    </linearGradient>
    <linearGradient id="g-near" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#16130f"/>
      <stop offset="100%" stop-color="#070606"/>
    </linearGradient>
    <linearGradient id="g-wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a3029"/>
      <stop offset="100%" stop-color="#5a3e2a"/>
    </linearGradient>
    <linearGradient id="g-castle-light" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#E07B39" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#E07B39" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="g-bark" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2a1f17"/>
      <stop offset="45%" stop-color="#5a4433"/>
      <stop offset="100%" stop-color="#1f1610"/>
    </linearGradient>
    <pattern id="p-rock" width="53" height="31" patternUnits="userSpaceOnUse">
      <path d="M2 8 L14 5 M20 22 L33 18 M38 9 L50 12 M8 27 L18 25" stroke="#000" stroke-width="1" opacity="0.35"/>
      <path d="M26 4 L34 3 M44 26 L51 24" stroke="#4a4038" stroke-width="0.8" opacity="0.35"/>
    </pattern>`);
}

function el(tag, attrs) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

const f = (n) => Math.round(n * 10) / 10;
