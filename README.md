# cedeneKahvesiHarpulse — ÇEDENE

Elazığ Çedenesi'ni anlatan tek sayfalık scroll hikâyesi. Vite + vanilla JS, GSAP 3 (ScrollTrigger, MotionPath), Lenis.

## Çalıştırma

```bash
npm install
npm run dev      # yerel geliştirme
npm run build    # dist/ üretir (Replit Static deploy: build `npm run build`, public dir `dist`)
```

## Dosyalar ve sahipler

| Dosya | Kim | Ne |
|---|---|---|
| `src/scenes/ritual.js` | A | Sahne 0–3 pinned zaman çizelgesi (600vh, 0–100 = scroll %) |
| `src/svg/ritual.svg` | B | Sahne 0–3 çizimleri (şu an yer tutucu şekiller) |
| `index.html` (Sahne 4–6), `src/scenes/sections.js`, `src/styles.css` | C | Bölümler, menü, formlar, mobil |
| Metinler, README, deploy | D | |
| `src/main.js` | A | GSAP/Lenis kurulumu, `BRAND` değişkeni |

Herkes kendi dalında çalışır (`a-animasyon`, `b-svg`, `c-bolumler`, `d-icerik`), `main`'e PR ile birleşir.

## B için SVG sözleşmesi

`src/svg/ritual.svg` içindeki şekiller yer tutucudur. **id'leri ve class'ları koruyarak** içini gerçek çizimle değiştirin; animasyon kendiliğinden oturur. viewBox `0 0 1600 900`, dünya dikeyde 3 sahne:

- **y 0–900 · Yamaç:** `#mountain-far`, `#mountain-mid` (Harput silueti), `#mountain-near`
- **Ağaç:** `#tree` > `#tree-trunk` (stroke path, dolgu yok), `.branch` (stroke path'ler), `.leaf` (her yaprak ayrı eleman), `.seed` (`circle`, `cx/cy` ile; düşüş hesabı bunu okur). Gövde tabanı ≈ (520, 728).
- **y 900–1800 · Dibek:** `#mortar-bowl`, `#mortar-rim`, `#pestle` (dönüş noktası üst ucu ≈ 800,1230), `#mortar-mash`, `#oil-glow`. Dibek ağzı ≈ (800, 1440).
- **y 1800–2700 · Kum:** `#sand-tray`, `#sand`, `#ember` (kor), `#ledge`
- **Cezve:** `#pot-move` > `#pot` (kendi koordinatında, taban y=0, merkez x=0). `#pot-body`, `#pot-liquid` (`#clip-pot` içinde), `.foam`, `.bubble`, `#pot-handle` (kulp ucu ≈ 235,-141 eğilme noktası), `#heat-wave`, `#sand-pile`. `#clip-pot` path'i `#pot-body` ile aynı olmalı.
- **Fincan:** `#cup` > `#cup-body`, `#cup-fill` (`#clip-cup` içinde, iç alan), `#ripple`, `.steam` (3 adet). `#pour` döküm akışı (stroke path).

Kurallar: raster yok, köşe yuvarlatma ve gölge yok, blur filtresi en fazla 4 elemanda. SVGO ile optimize ederken id'leri silmeyin (`cleanupIds: false`).
