// Menengiç ağacını kodla üretir: kıvrık kısa gövde, geniş yuvarlak taç, bileşik yaprak kümeleri, meyve salkımları.
// Çıktı ritual.js sözleşmesine uyar: #tree-trunk, .branch (genişlikten sıralı), .leaf, .seed (düşen 10 tane).
const NS = 'http://www.w3.org/2000/svg';
const BASE = { x: 520, y: 728 };
const MAX_DEPTH = 6;
const FALLING_SEEDS = 10;
const LEAF_COLORS = ['#2D5A43', '#3f7a5a', '#35583c', '#4f7d4a', '#284d3a', '#5b8a55'];
const FRUIT_COLORS = ['#4f8a86', '#5e9a92', '#8a4a3a', '#a35a44'];

// Her yüklemede aynı ağaç çıksın diye sabit tohumlu rastgele sayı üreteci
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildTree(treeGroup) {
  const rand = mulberry32(1034);
  const range = (a, b) => a + rand() * (b - a);

  const branches = []; // { d, width, depth }
  const leaves = []; // { x, y, rx, ry, rot, color }
  const fruits = []; // { x, y, r, color }

  // Genişlik öncelikli üretim: DOM sırası gövdeden uca doğru olur, çizim animasyonu da öyle akar.
  let queue = [{ x: BASE.x, y: BASE.y, angle: -90 + range(-4, 4), len: 112, width: 24, depth: 0 }];
  while (queue.length) {
    const next = [];
    for (const b of queue) {
      const rad = (b.angle * Math.PI) / 180;
      const ex = b.x + Math.cos(rad) * b.len;
      const ey = b.y + Math.sin(rad) * b.len;
      // Dalı hafif büken kontrol noktası: menengiçin kıvrık, rüzgâr yemiş hâli
      const bend = range(-0.22, 0.22) * b.len;
      const cx = (b.x + ex) / 2 + Math.cos(rad + Math.PI / 2) * bend;
      const cy = (b.y + ey) / 2 + Math.sin(rad + Math.PI / 2) * bend;
      branches.push({ d: `M${f(b.x)} ${f(b.y)} Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`, width: b.width, depth: b.depth });

      if (b.depth >= 3) addLeafCluster(ex, ey, b.depth);
      if (b.depth >= 4 && rand() < 0.28) addFruitCluster(ex, ey);

      if (b.depth < MAX_DEPTH) {
        const count = b.depth === 0 ? 3 : rand() < 0.35 ? 3 : 2;
        // Taç geniş ve yuvarlak: alt dallar yana açılır, uçlar yukarı yönelir
        const spread = b.depth < 2 ? range(30, 46) : range(22, 36);
        for (let i = 0; i < count; i++) {
          const t = count === 1 ? 0 : i / (count - 1) - 0.5;
          let angle = b.angle + t * spread * 2 + range(-8, 8);
          angle = angle * 0.85 + -90 * 0.15; // ışığa doğru hafif çekim
          next.push({
            x: ex,
            y: ey,
            angle,
            len: b.len * range(0.66, 0.8),
            width: Math.max(1.2, b.width * range(0.58, 0.68)),
            depth: b.depth + 1,
          });
        }
      }
    }
    queue = next;
  }

  function addLeafCluster(x, y, depth) {
    // Menengiç yaprağı bileşik: uçta 5–9 küçük yaprakçık
    const n = depth >= MAX_DEPTH ? Math.round(range(6, 9)) : Math.round(range(3, 6));
    for (let i = 0; i < n; i++) {
      const a = range(0, Math.PI * 2);
      const dist = range(2, 14);
      leaves.push({
        x: x + Math.cos(a) * dist,
        y: y + Math.sin(a) * dist * 0.8,
        rx: range(5, 9),
        ry: range(2.4, 4),
        rot: range(-180, 180),
        color: LEAF_COLORS[Math.floor(rand() * LEAF_COLORS.length)],
      });
    }
  }

  function addFruitCluster(x, y) {
    const n = Math.round(range(4, 8));
    const color = FRUIT_COLORS[Math.floor(rand() * FRUIT_COLORS.length)];
    for (let i = 0; i < n; i++) {
      fruits.push({ x: x + range(-6, 6), y: y + range(2, 12), r: range(2, 3.2), color });
    }
  }

  // Düşecek taneler: tacın altına yakın, birbirinden uzak meyveler seçilir
  fruits.sort((a, b) => b.y - a.y);
  const step = Math.max(1, Math.floor(fruits.length / FALLING_SEEDS));
  const falling = new Set(fruits.filter((_, i) => i % step === 0).slice(0, FALLING_SEEDS));

  treeGroup.replaceChildren();

  const trunk = branches.shift();
  const trunkEl = el('path', {
    id: 'tree-trunk', d: trunk.d, fill: 'none', stroke: 'url(#g-bark)', 'stroke-width': trunk.width, 'stroke-linecap': 'round',
  });

  const branchGroup = el('g', { id: 'tree-branches', fill: 'none', 'stroke-linecap': 'round' });
  branches.forEach((b) => {
    branchGroup.append(el('path', {
      class: 'branch', d: b.d, stroke: b.depth < 3 ? 'url(#g-bark)' : '#3a2c22', 'stroke-width': f(b.width),
    }));
  });

  const leafGroup = el('g', { id: 'tree-leaves' });
  leaves.forEach((l) => {
    leafGroup.append(el('ellipse', {
      class: 'leaf', cx: f(l.x), cy: f(l.y), rx: f(l.rx), ry: f(l.ry), fill: l.color,
      transform: `rotate(${f(l.rot)} ${f(l.x)} ${f(l.y)})`,
    }));
  });

  const fruitGroup = el('g', { id: 'tree-fruits' });
  const seedGroup = el('g', { id: 'seeds' });
  fruits.forEach((fr) => {
    const attrs = { cx: f(fr.x), cy: f(fr.y), r: f(fr.r), fill: fr.color };
    if (falling.has(fr)) seedGroup.append(el('circle', { ...attrs, class: 'seed' }));
    else fruitGroup.append(el('circle', { ...attrs, class: 'fruit' }));
  });

  // Gölge: ağacın yamaca oturması için
  const shadow = el('ellipse', { cx: BASE.x + 10, cy: BASE.y + 4, rx: 110, ry: 9, fill: '#000', opacity: 0.45 });

  treeGroup.append(shadow, trunkEl, branchGroup, leafGroup, fruitGroup, seedGroup);
}

function el(tag, attrs) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

const f = (n) => Math.round(n * 10) / 10;
