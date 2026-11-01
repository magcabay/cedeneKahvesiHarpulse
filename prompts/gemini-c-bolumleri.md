# C Görevi: Gemini Görsel Promptu (Sahne 4–6 SVG'leri)

Gemini sadece SVG çizimlerini üretir. HTML, CSS ve JS kodunu Claude ile yazıyoruz. Bu dosya `main` üzerindeki `0ac5d0d` commit'ine (Miraç'ın iskeleti) göre hazırlandı. Aşağıdaki `=== PROMPT ===` bloğunu olduğu gibi Gemini'ye yapıştır. Çıkan dosyaları `src/svg/` altına aynı adlarla kaydet.

=== PROMPT ===

Sen vektör illüstrasyon yapan bir tasarımcısın. Bir web sitesi için 6 adet **inline SVG** dosyası çizeceksin. Bu SVG'ler sayfaya JS ile `innerHTML` olarak gömülecek ve GSAP ile animasyonlanacak. Bu yüzden id'ler ve yapı aşağıdaki sözleşmeye birebir uymalı.

## Proje
"ÇEDENE": Elazığ'ın yabani menengiç kahvesini (çedene) anlatan, siyah zeminli, editoryal bir scroll hikâyesi. Sayfanın ilk yarısında bir ağaç, taş dibek, kızgın kumda bakır cezve ve taş fincana döküm sahnesi var. Senin çizimlerin sayfanın ikinci yarısında yer alacak: tescil mührü, bar menüsü ve satın alma bölümü. Estetik: taş, bakır, el işçiliği, müze etiketi sadeliği. Çizgi illüstrasyon, düz renk, minimal.

## Renkler (yalnızca bunlar, hex olarak yaz)
- Zemin: şeffaf. SVG'ye arka plan dikdörtgeni koyma, sayfa zemini `#050505`.
- Kap çizgileri: `#8a8580`
- Bakır (metal, mühür, cezve): `#c87941`
- Köz: `#e07b39`
- Sıvı: `#2d5a43` (koyu) ve `#3f7a5a` (parlak)
- Süt ve köpük: `#e8dccb`
- Saf beyaz (`#fff`) ve siyah dolgu kullanma. Bu renkler dışında renk yok.

## Teknik kurallar
- Her dosya tek bir `<svg>`, `xmlns="http://www.w3.org/2000/svg"` ile. `width` ve `height` yazma, sadece `viewBox` olacak.
- Yasak: raster (`<image>`), `filter`, blur, gölge, gradient mesh, `<style>` bloğu, CSS class ile renk, `<foreignObject>`. Renkleri attribute olarak ver (`fill`, `stroke`).
- Linear gradient serbest, en fazla 1 tane, sadece sıvıda koyu → parlak geçiş için.
- Kap çizgileri: `fill="none"`, `stroke-width="1.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `vector-effect="non-scaling-stroke"`.
- Köşeler keskin veya organik olsun. Yuvarlatılmış dikdörtgen (`rx`) kullanma.
- Tüm SVG'ler aynı sayfada inline duracak. Bu yüzden her `id` dosya önekiyle **benzersiz** olmalı (`seal-…`, `kortado-…` gibi). `clipPath` ve `linearGradient` id'leri de buna dahil.
- Sıvı grupları animasyonda alttan yukarı `scaleY` ile dolacak. Bu yüzden sıvı **ayrı bir `<g>` içinde** olmalı ve kabın iç alanını tanımlayan bir `clipPath` ile kırpılmalı. `clipPath` sıvı grubunun **dışındaki** bir sarmalayıcı `<g clip-path="url(#…)">` üzerinde olmalı (yoksa scale ile kırpma alanı da büyür).
- Path'ler sade olsun, gereksiz nokta olmasın. Koordinatları en fazla 1 ondalık hane ile yaz. Her dosya 6 KB altında kalsın.
- Yazı gerekiyorsa `font-family="Manrope, sans-serif"` kullan. Türkçe karakterler (Ç, Ğ, İ, Ş) doğru yazılmalı.
- Dosyanın başına içeriğini anlatan tek satırlık bir XML yorumu koy.

## Dosyalar ve id sözleşmesi

### 1) `seal.svg`: temsili coğrafi işaret mührü
- `viewBox="0 0 280 280"`, merkez (140, 140). Tümü bakır `#c87941` stroke, dolgu yok.
- `<svg>` üzerinde `role="img"` ve `aria-label="Temsili mühür"`.
- `#seal-outer`: r=130 çember, stroke-width 1.5.
- `#seal-inner`: r=96 çember, stroke-width 1.
- `#seal-text`: iki çember arasında, r≈113 çember path'i üzerinde `<textPath>`. Metin: "ELAZIĞ · ÇEDENE · HARPUT · ". Font-size 13, letter-spacing 4, `fill="#c87941"`, stroke yok. Yazının tam bir tur dönmesine yakın sığması gerekiyor. Yazının üzerinde durduğu path `<defs>` içinde `#seal-text-path` id'siyle olsun.
- `#seal-mark`: merkezde, iç çemberin içine sığan sade bir menengiç dalı. Hafif kavisli bir sap, 3 adet mızrak biçimli yaprak (bileşik yaprak hissi) ve 2 küçük yuvarlak tane. Sap ve yapraklar stroke, taneler `#c87941` dolu küçük daireler (r 4–5).
- Çemberler `<circle>` olarak değil, çizim animasyonu için `<path>` olarak çizilsin (iki yay ile tam çember).
- **Resmi "Coğrafi İşaret" amblemini veya TÜRKPATENT logosunu taklit etme.** Bu, markaya özgü temsili bir damga.

### 2) `drink-kortado.svg`: Çedene Kortado
- `viewBox="0 0 240 320"`. Kap, çizimin alt 2/3'ünde ortalı dursun.
- `#kortado-glass`: kısa, düz kenarlı, tabanı kalın Gibraltar tipi bardak. Stroke `#8a8580`. Tabanda kalınlığı gösteren ikinci bir yatay çizgi olsun.
- `#kortado-clip`: bardağın iç hacmi (clipPath).
- `<g clip-path="url(#kortado-clip)">` içinde `<g id="kortado-liquid" class="drink-liquid">`:
  - alt %60 koyu-parlak yeşil sıvı (gradient serbest),
  - üstünde `#kortado-milk`: `#e8dccb` süt katmanı (`opacity="0.85"`), sıvıyla birleştiği kenar hafif dalgalı.
- Sıvı grubu bardağın iç alanını tabandan ağza yaklaşık %85 doldursun.

### 3) `drink-soguk-harput.svg`: Soğuk Harput
- `viewBox="0 0 240 320"`.
- `#soguk-glass`: uzun, hafif konik highball bardak. Stroke `#8a8580`.
- `#soguk-clip`: iç hacim.
- `<g clip-path="url(#soguk-clip)">` içinde `<g id="soguk-liquid" class="drink-liquid">`:
  - parlak yeşil `#3f7a5a` sıvı (%80 dolu),
  - `#soguk-swirl`: badem sütünü anlatan, sıvının içinde aşağı süzülen 1–2 kıvrımlı stroke çizgi (`#e8dccb`, `opacity="0.5"`, `stroke-width="2"`),
  - 3 adet `.ice` buz küpü: farklı açılarda döndürülmüş kareler, stroke `#e8dccb` `opacity="0.6"`, dolgu yok. Biri sıvı yüzeyinden hafifçe taşsın.

### 4) `drink-kursubasi.svg`: Kürsübaşı Seremonisi
- `viewBox="0 0 240 320"`. Solda cezve, sağda önde fincan, ikisi aynı zemin çizgisinde.
- `#kursubasi-pot`: geleneksel bakır cezve. Geniş taban, daralan boyun, ağızda dışa açılan dudak ve sağa doğru uzun düz kulp. Stroke `#c87941`, dolgu yok. Gövdede 2 ince yatay dövme bakır çizgisi süs olarak.
- `#kursubasi-cup`: küçük, kulpsuz, kalın cidarlı taş fincan. Stroke `#8a8580`. Dış yüzeyinde basit bir Harput kalesi burç motifi (3–4 diş, tek çizgi).
- `#kursubasi-clip`: fincanın iç hacmi.
- `<g clip-path="url(#kursubasi-clip)">` içinde `<g id="kursubasi-liquid" class="drink-liquid">`: yeşil sıvı, üstünde ince `#e8dccb` köpük şeridi (`opacity="0.7"`).
- Zemin: `#kursubasi-ground`, iki objenin altında tek ince yatay çizgi (`#8a8580`, `opacity="0.5"`).

### 5) `starter-set.svg`: Başlangıç Seti (350 g çedene + Harput fincanı)
- `viewBox="0 0 260 260"`.
- `#set-bag`: arkada, üstü iki kez katlanmış kraft kese kâğıdı silueti. Stroke `#8a8580`. Ön yüzünde küçük bir etiket dikdörtgeni ve içinde "350 g" yazısı (`fill="#8a8580"`, font-size 12). Etiketin üstünde mührün küçültülmüş hâli olarak tek bir bakır çember (`#c87941`).
- `#set-cup`: önde, sağa kaymış, `drink-kursubasi.svg` içindeki taş fincanla aynı form (kale motifi dahil).
- `#set-clip` + `<g clip-path="url(#set-clip)">` içinde `<g id="set-liquid" class="drink-liquid">`: yeşil sıvı.
- Zemin çizgisi `#set-ground`.

### 6) `ember-spread.svg`: şehre yayılan köz (yatırımcı bölümü)
- `viewBox="0 0 260 260"`, merkez (130, 120).
- `#ember-core`: merkezde r=6 dolu `#e07b39` daire.
- `.ember-ring` sınıfıyla 3 eş merkezli çember: `#ember-ring-1`, `#ember-ring-2`, `#ember-ring-3`. Her biri r=100, stroke `#c87941` 1px, dolgu yok. Hepsi aynı boyutta olacak, animasyonla 0'dan büyütülecek. Her halkada `transform-origin` için `transform-box="fill-box"` ve `transform-origin="center"` attribute'ları olsun.
- `#ember-label`: noktanın 28px altında "HARPUT" yazısı (`fill="#8a8580"`, font-size 11, letter-spacing 3, `text-anchor="middle"`).
- Arka planda çok soluk (`opacity="0.25"`, stroke `#8a8580`) 5–6 küçük nokta (r=2): halkaların ulaşacağı uzak "şehirler". İsim yok. `#ember-dots` grubu içinde.

## Çıktı formatı
Her dosya için önce `### FILE: src/svg/<ad>.svg` başlığını, hemen altında tam SVG içeriğini tek bir ```svg kod bloğunda ver. Kısaltma yok. 6 dosyanın hepsi tek cevapta olsun. En sonda `### ID LİSTESİ` başlığı altında her dosyanın id'lerini ve class'larını madde madde yaz ki sözleşmeye uyduğunu kontrol edebileyim. Başka açıklama yazma.

=== PROMPT SONU ===
