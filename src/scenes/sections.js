import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MENU, PRODUCTS, formatTL } from '../config.js';

// İçerik bölümleri: pinned değil, normal akış. Her bölüm için tek giriş animasyonu.
// Ürün ve menü kartları config.js'ten üretilir: fiyatlar tek yerden değişir.
export function initSections({ reducedMotion }) {
  renderProducts();
  renderMenu();
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

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="product-card fade">
      <a class="product-media" href="siparis.html">
        <img src="${p.image}" alt="${p.name}" loading="lazy"${p.focus ? ` style="${p.focus}"` : ''} />
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
      </a>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.detail}</p>
        <div class="product-foot">
          <span class="product-price">${formatTL(p.price)}${p.unit ? ` <small>${p.unit}</small>` : ''}</span>
          <a class="product-buy" href="siparis.html">Sepete ekle</a>
        </div>
      </div>
    </article>`).join('');
}

function renderMenu() {
  const list = document.getElementById('bar-menu');
  if (!list) return;
  list.innerHTML = MENU.map((m) => `
    <li class="bar-item fade">
      <div><h3>${m.name}</h3><p>${m.detail}</p></div>
      <span class="bar-price">${formatTL(m.price)}</span>
    </li>`).join('');
}

// SplitText yerine kendi span bölmemiz; kelimeler satır sonunda bölünmesin diye kelime sarmalı.
function splitChars(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.setAttribute('aria-label', el.textContent.trim());
  el.innerHTML = words
    .map((w) => `<span class="word" aria-hidden="true">${[...w].map((c) => `<span class="char">${c}</span>`).join('')}</span>`)
    .join(' ');
}
