// Ekip tarafından doldurulacak değerler tek yerde (D: numara ve fiyatlar).
// Marka adı tek yerden değişir: başlık, logo, sipariş mesajları ve sosyal medya hesabı buradan gelir.
export const BRAND = 'HARPULSE';
export const BRAND_TAGLINE = 'Bir fincanın kırk yıl hatırı';
export const BRAND_HASHTAG = '#KırkYılHatır';
export const BRAND_HANDLE = `@${BRAND.toLocaleLowerCase('tr-TR').replace(/[^a-z0-9ğüşıöç]/g, '')}`;

// Bar konumu (amiral mağaza, planlanan)
export const STORE = {
  name: 'Harput Amiral Mağaza',
  address: 'Harput Mahallesi, Merkez / Elazığ',
  hours: 'Her gün 09:00 – 23:00',
  mapQuery: 'Harput Kalesi, Elazığ',
};

// Uluslararası biçim, başında + ve boşluk olmadan: 905xxxxxxxxx
export const WHATSAPP_NUMBER = '905531346134';

// Fiyatlar yer tutucudur; D ekibi birim ekonomiye göre güncelleyecek.
export const PRODUCTS = [
  {
    id: 'baslangic',
    name: 'Başlangıç Seti',
    detail: '350 g taş dibek çedene + Harput motifli taş fincan',
    tag: 'En çok tercih edilen',
    image: '/assets/baslangic-seti.jpg',
    price: 890,
  },
  {
    id: 'cedene-350',
    name: 'Taş Dibek Çedene',
    detail: '350 g, katkısız, taş dibekte dövülmüş',
    image: '/assets/02-poster.jpg',
    price: 420,
  },
  {
    id: 'fincan',
    name: 'Harput Fincanı',
    detail: 'Harput Kalesi motifli taş fincan',
    image: '/assets/04-poster.jpg',
    // Aynı fincan fotoğrafı burada kale kabartmasına yakın kadrajlanır
    focus: 'transform: scale(1.8); transform-origin: 48% 72%;',
    price: 520,
  },
  {
    id: 'abonelik',
    name: 'Aylık Çedene',
    detail: 'Her ay taze dövülmüş 350 g çedene kapınızda',
    tag: 'Abonelik',
    image: '/assets/el-toplama.jpg',
    price: 390,
    unit: '/ ay',
  },
];

// Bar menüsü (yer tutucu fiyatlar)
export const MENU = [
  { name: 'Geleneksel Çedene', detail: 'Sütle, bakır cezvede. Harput usulü.', price: 90 },
  { name: 'Çedene Kortado', detail: 'Çift ölçek çedene, yulaf ya da keçi sütü. Yoğun ve kısa.', price: 120 },
  { name: 'Soğuk Harput', detail: 'Soğuk demlenmiş çedene, badem sütü, buz.', price: 130 },
  { name: 'Çedene Latte', detail: 'Bol köpüklü süt, tek ölçek çedene, bir tutam tarçın.', price: 115 },
  { name: 'Kürsübaşı Seremonisi', detail: 'Masada kumda pişen cezve, iki taş fincan, lokum.', price: 260 },
];

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const formatTL = (n) => `${n.toLocaleString('tr-TR')} ₺`;
