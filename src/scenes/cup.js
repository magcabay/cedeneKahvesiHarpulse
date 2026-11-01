import gsap from 'gsap';
import { formatTL, whatsappLink } from '../config.js';

// Fincanını tasarla: seçimler önizlemeyi canlı değiştirir, sonunda WhatsApp'a hazır sipariş mesajı gider.
const OPTIONS = {
  size: [
    { id: 'kucuk', label: 'Fincan', price: 90, scale: 0.86 },
    { id: 'orta', label: 'Orta', price: 115, scale: 1 },
    { id: 'buyuk', label: 'Kupa', price: 140, scale: 1.12 },
  ],
  milk: [
    { id: 'inek', label: 'İnek sütü', price: 0, color: '#c79a68' },
    { id: 'yulaf', label: 'Yulaf', price: 15, color: '#d2ab7c' },
    { id: 'badem', label: 'Badem', price: 15, color: '#d8b48a' },
    { id: 'keci', label: 'Keçi sütü', price: 20, color: '#c2925e' },
  ],
  // Köpük bardağın görselini seçer: az = koyu, orta = sütlü, bol = köpüklü (fıstık seçilirse fıstıklı bardak)
  foam: [
    { id: 'az', label: 'Az', image: '/assets/bardak-1.jpg' },
    { id: 'orta', label: 'Orta', image: '/assets/bardak-2.jpg' },
    { id: 'bol', label: 'Bol', image: '/assets/bardak-3.jpg' },
  ],
  sweet: [
    { id: 'sade', label: 'Sade' },
    { id: 'az', label: 'Az şekerli' },
    { id: 'orta', label: 'Orta şekerli' },
  ],
  extra: [
    { id: 'tarcin', label: 'Tarçın', price: 5, multi: true },
    { id: 'kakule', label: 'Kakule', price: 5, multi: true },
    { id: 'fistik', label: 'Antep fıstığı', price: 15, multi: true },
    { id: 'lokum', label: 'Yanında lokum', price: 20, multi: true },
  ],
};

export function initCupDesigner() {
  const form = document.querySelector('[data-cup-form]');
  if (!form) return;
  const state = { size: 'orta', milk: 'inek', foam: 'orta', sweet: 'sade', extra: new Set() };

  Object.entries(OPTIONS).forEach(([group, items]) => {
    const box = form.querySelector(`[data-group="${group}"]`);
    box.innerHTML = items
      .map((o) => `<button type="button" class="chip" data-group="${group}" data-id="${o.id}">${o.label}${o.price ? ` <small>+${o.price} ₺</small>` : ''}</button>`)
      .join('');
  });

  form.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    const { group, id } = chip.dataset;
    if (group === 'extra') state.extra.has(id) ? state.extra.delete(id) : state.extra.add(id);
    else state[group] = id;
    render();
  });
  form.querySelector('[data-cup-name]').addEventListener('input', render);

  const cup = document.querySelector('.designer-cup');
  const pick = (group) => OPTIONS[group].find((o) => o.id === state[group]);

  function render() {
    form.querySelectorAll('.chip').forEach((c) => {
      const { group, id } = c.dataset;
      const on = group === 'extra' ? state.extra.has(id) : state[group] === id;
      c.classList.toggle('is-on', on);
      c.setAttribute('aria-pressed', String(on));
    });

    const size = pick('size');
    const milk = pick('milk');
    const foam = pick('foam');
    const extras = OPTIONS.extra.filter((o) => state.extra.has(o.id));
    const name = form.querySelector('[data-cup-name]').value.trim();
    const price = size.price + milk.price + extras.reduce((s, o) => s + o.price, 0);

    gsap.to(cup, { scale: size.scale, transformOrigin: '50% 90%', duration: 0.5, ease: 'back.out(1.6)' });
    const img = cup.querySelector('.dc-img');
    const nextSrc = state.extra.has('fistik') ? '/assets/bardak-4.jpg' : foam.image;
    if (!img.src.endsWith(nextSrc)) {
      gsap.to(img, {
        opacity: 0, y: 8, duration: 0.18, ease: 'power1.in',
        onComplete: () => {
          img.src = nextSrc;
          gsap.to(img, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        },
      });
    }
    // Yanında lokum: bardağın yanına lokum tabağı gelir
    const lokum = document.querySelector('.dc-lokum');
    const wantLokum = state.extra.has('lokum');
    if (lokum && lokum.classList.contains('is-on') !== wantLokum) {
      lokum.classList.toggle('is-on', wantLokum);
      gsap.fromTo(lokum, wantLokum ? { autoAlpha: 0, y: 24, scale: 0.8 } : { autoAlpha: 1, y: 0, scale: 1 },
        wantLokum ? { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.8)' } : { autoAlpha: 0, y: 16, scale: 0.85, duration: 0.25 });
    }

    const nameEl = cup.querySelector('.dc-name');
    nameEl.textContent = name;
    // Uzun isimler bandın içinde kalsın diye küçülür
    nameEl.style.setProperty('--name-size', `${Math.min(9, 62 / Math.max(name.length, 1))}cqw`);

    form.querySelector('[data-cup-price]').textContent = formatTL(price);
    const summary = [size.label, milk.label, `${foam.label} köpük`, pick('sweet').label, ...extras.map((o) => o.label)].join(' · ');
    document.querySelector('[data-cup-summary]').textContent = summary;

    const message = [
      'Merhaba HARPULSE, kendi fincanımı tasarladım:',
      `Boy: ${size.label}`,
      `Süt: ${milk.label}`,
      `Köpük: ${foam.label}`,
      `Tatlılık: ${pick('sweet').label}`,
      extras.length ? `Ekstra: ${extras.map((o) => o.label).join(', ')}` : null,
      name ? `Fincandaki isim: ${name}` : null,
      `Toplam: ${formatTL(price)}`,
    ].filter(Boolean).join('\n');
    form.querySelector('[data-cup-order]').href = whatsappLink(message);
  }

  render();
}
