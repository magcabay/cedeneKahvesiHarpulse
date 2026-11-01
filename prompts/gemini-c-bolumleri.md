# C Görevi: Gemini Görsel Promptu (3D realistik, Sahne 4–6)

Gemini'nin görsel üretim modeliyle (Gemini uygulamasında görsel oluşturma) kullanılacak. Her görsel ayrı bir sohbet mesajıdır: önce **Stil bloğu**nu, ardından ilgili görselin promptunu tek mesajda yapıştır. Prompt'lar İngilizce, çünkü görsel modelleri İngilizce'de daha tutarlı sonuç veriyor.

## Önce bil
- Planda "raster görsel yok, hepsi SVG" kararı vardı. 3D realistik görseller bu kararı C bölümü için değiştiriyor. Ekibe haber ver. Ritüel sahnesi (0–3) SVG olarak kalıyor, çünkü oradaki animasyon parça parça SVG'ye bağlı.
- Gemini şeffaf arka plan üretemiyor. Bu yüzden her görsel **saf siyah zeminde** (#050505) üretilecek. Sitenin zemini de aynı renk olduğu için kenarlar CSS maskesiyle görünmez hâle getirilecek.
- İçeceklerin scroll ile dolma animasyonu için 3 içeceğin **boş** hâli de üretilecek (aynı görselin düzenlemesi). Kod tarafında dolu görsel, boş görselin üstünde alttan yukarı açılacak. İki görsel birebir hizalı olmalı.
- Kaydetme: 1600 px genişlik, WebP veya JPG. Dosyaları `public/img/` altına aşağıdaki adlarla koy. Her biri 250 KB altında olsun (squoosh.app ile sıkıştırılabilir).

## Stil bloğu (her mesajın başına yapıştır)

```
STYLE (apply to every image):
Photorealistic 3D product render, high-end editorial still life, as if shot on a medium-format camera with a 90mm lens.
Background: pure solid near-black #050505, completely flat and seamless, no floor line, no horizon, no gradient, no texture. The object must fade naturally into the black at the edges.
Lighting: single soft key light from upper left, warm copper-colored rim light from behind right, deep shadows. Low-key, moody, chiaroscuro. No bright highlights blown out.
Color palette strictly limited to: black and charcoal, warm grey stone (#8a8580), copper and burnt orange (#c87941, #e07b39), deep olive-green liquid (#2d5a43 to #3f7a5a), creamy off-white milk (#e8dccb). No pure white, no blue, no saturated colors.
Materials feel handmade and ancient: hand-hammered copper, rough basalt and limestone, raw ceramic.
Composition: single object group centered, occupying about 60% of the frame, generous black space around it.
Strictly no text, no letters, no logos, no watermark, no people, no hands, no props other than those described.
```

## Görseller

### 1) `seal.webp`: Sahne 4, temsili tescil mührü (kare, 1:1)
```
SUBJECT: A round antique copper seal medallion lying flat, viewed from a slight 3/4 top angle. Hand-hammered copper disc with an embossed raised border ring and, in the center, an embossed relief of a small wild pistachio (menengiç) branch with three slender leaves and two small round berries. The surface has subtle patina in the recesses and polished edges catching the copper rim light. No letters or text anywhere on the seal. It must not resemble any official government emblem. Aspect ratio 1:1.
```

### 2) `drink-kortado.webp` + `drink-kortado-empty.webp`: Sahne 5 (dikey, 3:4)
```
SUBJECT: A short, thick-bottomed clear Gibraltar glass on nothing (floating on the black background), straight sides. Inside: a deep olive-green pistachio coffee (#2d5a43) filling the lower part, topped with a layer of creamy off-white steamed oat milk (#e8dccb) with a soft, slightly uneven boundary between the layers and fine microfoam on top. Glass about 85% full. Subtle condensation-free clear glass reflections from the copper rim light. Eye-level camera, slightly above. Aspect ratio 3:4.
```
Boş hâli için aynı sohbette, dolu görsel üretildikten sonra:
```
Edit this exact image: keep the glass, camera angle, framing, lighting and background exactly identical, pixel-aligned. Only remove all liquid and milk so the glass is completely empty and clean.
```

### 3) `drink-soguk-harput.webp` + `drink-soguk-harput-empty.webp`: Sahne 5 (dikey, 3:4)
```
SUBJECT: A tall, slightly tapered clear highball glass floating on the black background. Inside: cold brew pistachio coffee in a brighter olive green (#3f7a5a), with almond milk (#e8dccb) slowly swirling down through the liquid in soft ribbons. Three clear, hand-cut ice cubes, one breaking the surface. Glass about 80% full. Light condensation droplets on the outside of the glass catching the copper rim light. Eye-level camera. Aspect ratio 3:4.
```
Boş hâli: yukarıdaki düzenleme promptunu kullan, sonuna `Also remove the ice cubes and the condensation.` ekle.

### 4) `drink-kursubasi.webp` + `drink-kursubasi-empty.webp`: Sahne 5 (dikey, 3:4)
```
SUBJECT: A traditional Turkish hand-hammered copper cezve (coffee pot) with a wide base, narrowing neck, flared spout lip and a long straight copper handle extending to the right, standing on the left. In front of it on the right, a small handleless thick-walled cup carved from grey basalt stone, with a simple carved relief band of castle battlements around its outer wall. Inside the cup: deep olive-green pistachio coffee (#2d5a43) with a thin layer of fine pale foam on top, cup nearly full. A faint wisp of steam rising from the cup. Both objects rest on an invisible surface; only a very subtle contact shadow. Camera slightly above eye level. Aspect ratio 3:4.
```
Boş hâli: düzenleme promptunu kullan, `Only remove the coffee, foam and steam from the stone cup so it is empty. The copper pot stays exactly the same.` şeklinde.

### 5) `starter-set.webp`: Sahne 6, Başlangıç Seti (kare, 1:1)
```
SUBJECT: A product set composition. Behind: a small kraft paper coffee bag, top folded twice and closed with a thin copper clip, with a blank plain paper label (no text). In front and slightly right: the same small handleless grey basalt stone cup with carved castle-battlement relief band, filled with deep olive-green pistachio coffee. Beside the cup, a small scattering of whole dried wild pistachio (menengiç) berries, small, round, dark green-brown. Camera at a 30-degree angle from above. Aspect ratio 1:1.
```

### 6) `ember-spread.webp`: Sahne 6, yatırımcı bölümü (kare, 1:1)
```
SUBJECT: A single glowing ember coal resting on a bed of dark fine sand, seen from a low 3/4 angle. The ember glows deep orange (#e07b39) from within, with tiny cracks of brighter light. Around it, faint concentric ripples in the sand radiate outward, lit by the ember's warm glow, fading into darkness. A few tiny floating sparks rise upward. Mood: patience, warmth spreading slowly. Aspect ratio 1:1.
```

## Kontrol listesi (her görsel için)
- Zemin gerçekten düz siyah mı? Kenarlarda gri ton, zemin çizgisi veya vinyet var mı?
- Görselde yazı, harf ya da logo çıkmış mı? Çıktıysa tekrar üret.
- Renkler palet dışına taşmış mı (mavi, saf beyaz, doygun yeşil)?
- Boş ve dolu hâller üst üste konduğunda birebir hizalı mı? Kaymışsa düzenlemeyi tekrar iste.
- Aynı taş fincan (3, 4, 5 numaralı görseller) birbirine benziyor mu? Benzemiyorsa 4 numaralı görseli referans olarak yükleyip "use this exact cup" diye ekle.
