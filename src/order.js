import './styles.css';
import { BRAND, PRODUCTS, formatTL, whatsappLink } from './config.js';

const cart = new Map(PRODUCTS.map((p) => [p.id, p.id === 'baslangic' ? 1 : 0]));

const list = document.getElementById('products');
const lines = document.getElementById('summary-lines');
const empty = document.getElementById('summary-empty');
const total = document.getElementById('summary-total');
const cta = document.getElementById('order-whatsapp');

document.querySelectorAll('[data-brand]').forEach((el) => {
  el.textContent = BRAND;
});
document.title = `Sipariş · ${BRAND}`;

list.innerHTML = PRODUCTS.map((p) => `
  <li class="product" data-id="${p.id}">
    <div class="product-info">
      <h3>${p.name}</h3>
      <p>${p.detail}</p>
      <span class="product-price">${formatTL(p.price)}</span>
    </div>
    <div class="stepper" role="group" aria-label="${p.name} adedi">
      <button type="button" data-step="-1" aria-label="Azalt">−</button>
      <output>0</output>
      <button type="button" data-step="1" aria-label="Arttır">+</button>
    </div>
  </li>`).join('');

list.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-step]');
  if (!btn) return;
  const id = btn.closest('.product').dataset.id;
  cart.set(id, Math.max(0, Math.min(20, cart.get(id) + Number(btn.dataset.step))));
  render();
});

function render() {
  const chosen = PRODUCTS.filter((p) => cart.get(p.id) > 0);
  const sum = chosen.reduce((s, p) => s + p.price * cart.get(p.id), 0);

  list.querySelectorAll('.product').forEach((li) => {
    li.querySelector('output').textContent = cart.get(li.dataset.id);
    li.classList.toggle('is-selected', cart.get(li.dataset.id) > 0);
  });

  lines.innerHTML = chosen
    .map((p) => `<li><span>${cart.get(p.id)} × ${p.name}</span><span>${formatTL(p.price * cart.get(p.id))}</span></li>`)
    .join('');
  empty.hidden = chosen.length > 0;
  total.textContent = formatTL(sum);

  const message = [
    `Merhaba ${BRAND} ☕`,
    'Web sitenizden sipariş vermek istiyorum:',
    '',
    ...chosen.map((p) => `• ${cart.get(p.id)} × ${p.name} — ${formatTL(p.price * cart.get(p.id))}`),
    '',
    `*Toplam: ${formatTL(sum)}*`,
    '',
    'Teslimat bilgilerim:',
    'Ad Soyad: ',
    'Adres: ',
    'Telefon: ',
    'Not (isteğe bağlı): ',
    '',
    'Teşekkürler, bir fincanın kırk yıl hatırı var! 🤎',
  ].join('\n');
  cta.href = chosen.length ? whatsappLink(message) : '#';
  cta.setAttribute('aria-disabled', String(!chosen.length));
}

cta.addEventListener('click', (e) => {
  if (cta.getAttribute('aria-disabled') === 'true') e.preventDefault();
});

render();
