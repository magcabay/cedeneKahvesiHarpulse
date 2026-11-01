# Gemini için Prompt — ÇEDENE Projesi "C" Görevi (Bölümler ve Stil)

Aşağıdaki metni Gemini'ye olduğu gibi yapıştır. Prompt tek seferde Sahne 4–6 HTML/CSS, menü yatay kaydırma, formlar, mobil düzen ve font kurulumunu üretmesi için tasarlandı.

---

## Rol
Sen deneyimli bir front-end geliştiricisin. Vite + vanilla JavaScript tabanlı, GSAP + ScrollTrigger + Lenis kullanan bir scrollytelling sitesinde çalışıyorsun. Framework (React/Vue/Tailwind) **yok**. Çıktın production kalitesinde, mobil-öncelikli, erişilebilir ve 60 fps hedefli olacak.

## Proje Bağlamı
"ÇEDENE" — Elazığ'ın yabani menengiç kahvesini anlatan tek sayfalık, scroll ile ilerleyen Türkçe hikâye sitesi. Omurga tek bir pinned sahnedir (Sahne 0–3; A arkadaşımız yapıyor). Senin görevin **Sahne 4, 5, 6** ve sayfanın geri kalanını kurmak: tipografi, menü, formlar, mobil, erişilebilirlik.

## Teknik Yığın (değiştirme)
- Vite + vanilla JS, framework yok
- GSAP 3 + ScrollTrigger + MotionPathPlugin (npm: `gsap`)
- Lenis (npm: `lenis`) — yumuşak scroll
- Tek `styles.css` + CSS custom properties
- Google Fonts (CDN link)
- Form: statik, Formspree veya Google Form linki (örnek placeholder bırak)
- Inline SVG, raster görsel yok

## Dosya Yapısı (bu dosyaları üret / güncelle)
```
index.html                 — tam iskelet, sahne 4-6 markup'ı dahil
src/main.js                — Lenis + GSAP kurulum, modül importları
src/scenes/sections.js     — Sahne 4-6 scroll animasyonları ve menü yatay kaydırma
src/styles.css             — bütün stil (tasarım tokenları + sahneler + form + mobil)
```
Repo şu an boş. `package.json` yoksa minimal bir tane de üret (`vite`, `gsap`, `lenis` bağımlılıkları; `dev`, `build`, `preview` scriptleri).

`src/main.js` ortak dosya: Lenis entegrasyonu A arkadaşımızın sorumluluğunda. Bu yüzden main.js'i kısa tut. Lenis + ScrollTrigger bağlantısını tek bir `initSmoothScroll()` fonksiyonunda topla ki A gerekirse sadece onu değiştirsin. Kendi kodunu `sections.js` içinde tut.

`ritual.js`, `svg/` klasörü, pinned sahne (0–3) **sana ait değil**. Boş import stub bırak ki A entegre ederken çalışsın:
```js
// src/scenes/ritual.js — A arkadaş burayı dolduracak
export function initRitualScene() {}
```

## Tasarım Dili (SIKI UYULACAK)
CSS değişkeni olarak `:root`'a koy:

| Token | Değer | Kullanım |
|---|---|---|
| `--bg-0` | `#050505` | ana zemin |
| `--bg-1` | `#0f0f0f` | ikincil zemin |
| `--bg-2` | `#161412` | kart/panel zemini |
| `--liquid-dark` | `#2D5A43` | sıvı tabanı |
| `--liquid-light` | `#3f7a5a` | sıvı parlak uç |
| `--copper` | `#C87941` | metal / cezve kenarı |
| `--ember` | `#E07B39` | köz parıltısı, vurgu buton |
| `--text-primary` | `#E8DCCB` | kirli beyaz |
| `--text-secondary` | `#8a8580` | ikincil metin |
| `--font-display` | `'Cormorant Garamond', serif` | sadece sahne başlıkları |
| `--font-body` | `'Manrope', sans-serif` | metin, menü, buton |

Kurallar:
- **Saf beyaz (`#fff`) yasak.** Metin daima `--text-primary` ya da `--text-secondary`.
- **Border-radius 0** her yerde. Köşe yuvarlatma yok.
- **Box-shadow yok.** Derinlik için opaklık/kontrast kullan.
- Kart estetiği yok (gradient zemin + border 1px `#1f1b17` kabul).
- Vurgu rengi (`--ember`) **sadece** CTA buton ve dönüşüm odaklı mikro-vurgular için.
- Buton: dolgu yerine 1px `--text-primary` border, hover'da içi `--ember` dolar, metin `--bg-0` olur. Yuvarlatma yok.

## Google Fonts
`index.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet">
```

## İçerik — SAHNE METİNLERİ (aynen kullan)
Tırnak içindeki gövde metinleri onaylı. Başlıklar ve kısa açıklamalar taslak; son hallerini D arkadaşımız verecek. Bu yüzden tüm metinleri HTML'de kolay bulunur tut (her metin bloğuna `data-copy="sahne4-baslik"` gibi bir attribute ekle). Marka adı (`ÇEDENE`) kodda tek bir değişkende dursun: `src/main.js` içinde `export const BRAND = 'ÇEDENE'` ve `[data-brand]` olan elemanlara JS ile yazılsın.

### Sahne 4 — Tescil ve Çatışma
Başlık: **"Tescilli ama hâlâ sıkışmış."**
Gövde:
> "Elazığ Çedene Kahvesi coğrafi işaretle tescilli. Peki neden hâlâ Harput sokaklarına sıkışmış? Dünya kafein çarpıntısına ve sentetik şuruba mahkûm değil."

Dipnot (daha küçük, `--text-secondary`, `<small>` içinde):
> "Kaynak: Türk Patent ve Marka Kurumu, coğrafi işaret tescil no: [EKİP DOLDURACAK]"

Not: Tescil bilgisi henüz ekipçe doğrulanmadı. "Türkiye'nin ilk" gibi bir iddia ekleme; tescil no alanını placeholder olarak bırak.

### Sahne 5 — Yeni Nesil Çedene Barı (yatay kaydırma menüsü)
Başlık: **"Yeni Nesil Çedene Barı"**
3 menü kartı (yatay kayan şerit, ScrollTrigger pin + x translate ile):

1. **Çedene Kortado**
   - Yulaf veya keçi sütü · Çift ölçek çedene
   - Birim ekonomi: Maliyet ₺— · Satış ₺— · Brüt marj %— *(rakamları ekip dolduracak, placeholder olarak em-dash bırak)*

2. **Soğuk Harput**
   - Soğuk demleme · Badem sütü
   - Birim ekonomi: Maliyet ₺— · Satış ₺— · Brüt marj %—

3. **Kürsübaşı Seremonisi**
   - Bakır cezve · Taş fincan
   - Birim ekonomi: Maliyet ₺— · Satış ₺— · Brüt marj %—

### Sahne 6 — Eylem (2 kolonlu CTA)
Başlık: **"Sıra sende."**

Sol kolon — **Tüketici**:
- Başlık: "Başlangıç Seti"
- Metin: "350 g taş dibek çedene + Harput motifli taş fincan. Kapında."
- CTA: `[ Sipariş Ver ]`

Sağ kolon — **Yatırımcı**:
- Başlık: "İlk Çedene Barını şehrine taşı"
- Metin: "Franchise ön talep formu. Şehir, iletişim, kapasite."
- CTA: `[ Ön Talep Formu ]`

Form (yatırımcı CTA'ya tıklanınca açılan basit modal **veya** sayfa altında inline — modal'ı tercih et, Lenis ile çakışmaması için `data-lenis-prevent` ekle):
- Ad Soyad (text, required)
- E-posta (email, required)
- Şehir (text, required)
- Mesaj (textarea, 300 karakter)
- Submit: Formspree placeholder → `<form action="https://formspree.io/f/REPLACE_ME" method="POST">`

## Animasyon Davranışı (sahne 4–6)
Sahne 0–3 pinned, Sahne 4–6 **normal akar**. Her bölüm için:
- **Başlık karakter karakter giriş**: SplitText kullanma; JS'te başlığı `<span>` ile tek tek karaktere böl, GSAP ile stagger 0.025, y: 20 → 0, opacity 0 → 1, ScrollTrigger `start: "top 75%"`.
- **Metin fade + y 16 → 0**, delay 0.15.
- Menü yatay kaydırma: ScrollTrigger `pin: true`, `scrub: 1`, kartlar `x: 0 → -(toplam genişlik - 100vw)`.
- **Mobilde (≤ 768px) menü dikey akar**, pin kapalı. `matchMedia` ile ayır.
- `prefers-reduced-motion: reduce` → scrub kapalı, girişler statik son karede.

## Performans Kuralları
- Sadece `transform` ve `opacity` animasyonu. `width/height/top/left` tetikleme.
- `will-change: transform` yalnızca pin'li elemanda.
- Filter / blur senin bölümünde kullanma (A kullanıyor).
- Font-display: swap (link'te zaten var).

## Erişilebilirlik
- Semantik HTML: `<section>`, `<article>`, `<h2>`, `<h3>`, `<button>`, `<form>`, `<label>`.
- Her form inputunun görünür `<label>`'ı (sr-only değil — tasarım yeterince minimalist).
- Form hata mesajları için `aria-live="polite"` bölge bırak.
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, Esc ile kapat, focus trap (basit JS yeterli).
- CTA butonlarının `aria-label`'ı dolu.
- Minimum kontrast AA (metin kirli beyaz #E8DCCB üstünde zemin #050505 → yeterli).

## Mobil Düzen
- Breakpoint: 768px.
- Mobilde başlık fontu 2 kademe küçül (clamp kullan: `clamp(2rem, 6vw, 3.5rem)`).
- Menü kartları yatay yerine dikey, her kart %100 genişlik, 24px dikey boşluk.
- 2 kolonlu CTA mobilde tek kolon alt alta.
- Modal mobilde tam ekran.

## Teslim Formatı
Her dosyayı aşağıdaki markdown başlıkları ile ayır ve her birinin tam içeriğini kod bloğunda ver — kesme, kısaltma, `// ...` yok. `package.json` ve `src/scenes/ritual.js` stub'ını da aynı formatta ekle:

```
### FILE: index.html
```
```html
<!doctype html>
<!-- tam dosya -->
```

```
### FILE: src/main.js
```
```js
// tam dosya
```

```
### FILE: src/scenes/sections.js
```
```js
// tam dosya
```

```
### FILE: src/styles.css
```
```css
/* tam dosya */
```

Sonunda `### NOTES` başlığıyla:
- `npm install` komutu
- Formspree formunu nereye bağlayacağımı
- Birim ekonomi rakamlarını nereye gireceğimi
- Modal focus trap'ın bilinen sınırları

## Yapma
- React, Vue, Tailwind, styled-components kullanma.
- Köşe yuvarlatma, box-shadow, saf beyaz, emoji kullanma.
- Sahne 0–3 (pinned) animasyonlarına dokunma, sadece boş `#ritual` konteynırı için yer bırak.
- `svg/` klasörüne dosya yazma — B arkadaşımız yapıyor.
- Birim ekonomi rakamlarını uydurma; placeholder bırak.

## Hazırsan Başla
Önce 2 cümlelik düşünce özetinle başla (hangi yaklaşımı seçtin, hangi küçük kararı neye göre verdin), sonra tüm dosyaları tam ver, sonra `### NOTES`.
