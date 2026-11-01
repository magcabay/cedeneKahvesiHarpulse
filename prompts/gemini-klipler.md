# ÇEDENE · Klip Prompt'ları (Gemini sürümü)

`KLIP_GOREVLERI.md` dosyasındaki 4 klibin Gemini ile üretilecek hâli. Görseli Gemini'nin görsel üretimiyle yap, sonra aynı görseli Gemini'de video üretimine (Veo) "fotoğraftan video" olarak yükle. Ortak kurallar (16:9, sabit kamera, saf siyah zemin, bakır yan ışık, yazı/logo/el yok) aynen geçerli.

## Gemini'ye özel farklar
- **Negatif prompt kutusu yok.** Kaçınılacakları her prompt'un sonundaki `Avoid:` satırı taşıyor, silme.
- **Oran:** Görsel prompt'larının başında `16:9 landscape image` yazıyor. Kare çıkarsa "make it 16:9 landscape, same image" diye düzelttir.
- **Tutarlılık:** Klip 01'in görseli gruba düşünce onu Gemini'ye yükle ve prompt'un başına şunu ekle: `Use the attached image only as a style reference: match its lighting, black background, color grade and realism. Do not copy its subject.`
- **Ses:** Veo video ile birlikte ses de üretebilir. Sitede ses kullanılmayacak, sorun değil.
- **Bitiş karesi:** Scroll ile oynatılan videoda son kare ekranda uzun süre kalır. Bu yüzden her video prompt'u "son 1 saniye sakin, hareketsiz kare" ile bitiyor.

## Orijinal prompt'larda düzelttiklerim
- **Klip 03:** "brass handle" → "copper handle". Cezve tamamen bakır olsun, diğer kliplerle aynı obje gibi dursun.
- **Klip 04:** Orijinalde 5–8 saniyeye dört ayrı hareket sığdırılmıştı: döküm, dolum, cezvenin kadrajdan çıkması ve fincanın 180° dönmesi. Video modelleri bu kadar olayı bir arada yaparken objeyi bozuyor; dönen fincanda kale motifi büyük ihtimalle erir. Döküm ve dolumu ana klip yaptım, dönüşü isteğe bağlı ayrı bir klibe ayırdım.
- **Klip 02:** "Üç kez" gibi sayılı tekrarlar modellerde tutmuyor. Prompt'u "birkaç ağır vuruş" diye yazdım; sitede vuruş sayısı önemli değil.

---

## 01 · YABANİ DOĞDU

**Görsel:**
```
16:9 landscape image. Macro photograph of a wild terebinth tree branch (Pistacia terebinthus) with dense clusters of small round berries in mixed blue-green, turquoise and reddish-brown colors, small glossy pinnate dark green leaves, rough grey bark. Isolated on a pure solid black background. Single warm copper side light from the right creating rim highlights on the berries. Shot on a 100mm macro lens at f/4, shallow depth of field, ultra realistic natural textures, fine dust on the berries, cinematic product photography.
Avoid: text, watermark, logo, cartoon, illustration, CGI or 3D render look, plastic texture, oversaturated colors, extra objects, human hands, any background other than pure black.
```

**Video (Veo, fotoğraftan video):**
```
Static locked-off camera, absolutely no camera movement, no zoom, no pan. The branch sways very gently as if in a soft breeze. Then three or four berries detach one at a time and fall straight down out of frame in slow motion. Leaves tremble slightly. The pure black background stays perfectly black. Photorealistic, cinematic slow motion. The last second is a calm, almost still frame of the branch.
Avoid: camera movement, zoom, morphing berries, berries appearing or multiplying, text, watermark, hands.
```

---

## 02 · TAŞTA DÖVÜLÜR

**Görsel:**
```
16:9 landscape image. Ancient hand-carved dark basalt stone mortar filled with small blue-green terebinth berries, a worn olive wood pestle held just above it, rough porous stone texture with chisel marks. Isolated on a pure solid black background. Single warm copper side light. Three-quarter view from slightly above. Shot on an 85mm lens at f/5.6, ultra realistic, cinematic still life product photography.
Avoid: text, watermark, logo, cartoon, illustration, CGI or 3D render look, plastic texture, oversaturated colors, extra objects, human hands, any background other than pure black.
```

**Video:**
```
Static locked-off camera, absolutely no camera movement, no zoom. The olive wood pestle strikes down into the stone mortar a few times with heavy weight, as if moved by an invisible hand. With each strike the berries crush, and they gradually turn into a thick, glossy, dark green oily paste that shines in the copper light. Tiny fragments jump on impact. Pure black background. Photorealistic slow motion. The last second: the pestle rests still above the glistening green paste.
Avoid: hands, arms, people, camera movement, the mortar changing shape, text, watermark.
```

---

## 03 · KUMDA SABREDER (sitenin ana anı)

**Görsel:**
```
16:9 landscape image. A traditional hand-hammered copper cezve (Turkish coffee pot) with a long copper handle, half buried in fine golden hot sand inside a wide shallow copper tray. Glowing orange embers visible beneath the edge of the sand, thin heat haze. Pure solid black background. Warm orange glow from below plus a soft copper rim light. Side view at sand level. Shot on a 50mm lens at f/2.8, ultra realistic metal reflections and individual sand grains, cinematic product photography.
Avoid: text, watermark, logo, cartoon, illustration, CGI or 3D render look, plastic texture, oversaturated colors, extra objects, human hands, any background other than pure black.
```

**Video:**
```
Static locked-off camera, absolutely no camera movement, no zoom, no pan. The copper cezve slides slowly from left to right through the hot sand on its own, pushing a small wave of sand ahead of it. Thick green-brown foam slowly rises and swells up to the rim of the cezve. Embers beneath the sand pulse softly, subtle heat shimmer above. Pure black background. Photorealistic, cinematic slow motion. The last second: the cezve stops, the foam sits just at the rim, calm.
Avoid: hands, the cezve changing shape or size, the handle bending, foam overflowing, camera movement, text, watermark.
```

---

## 04 · FİNCANDA BULUŞUR

**Görsel:**
```
16:9 landscape image. A dark carved stone coffee cup with an engraved band of Harput castle walls and battlements around it, standing on a matching stone saucer, half filled with thick creamy green-brown coffee. A hand-hammered copper cezve tilted above it pours a thin glossy stream into the cup. Pure solid black background. Warm copper side light, soft steam. Shot on an 85mm lens at f/4, ultra realistic stone texture, cinematic product photography.
Avoid: text, watermark, logo, cartoon, illustration, CGI or 3D render look, plastic texture, oversaturated colors, extra objects, human hands, any background other than pure black.
```

**Video (ana klip):**
```
Static locked-off camera, absolutely no camera movement, no zoom. A thin glossy stream of thick green-brown coffee pours from the tilted copper cezve into the stone cup. The cup fills up to just below the rim and a fine layer of foam forms on top. The stream thins and stops. Delicate steam rises from the cup. Pure black background. Photorealistic slow motion. The last second: the full cup with foam and gentle steam, calm.
Avoid: hands, the cup melting or changing shape, the engraving changing, coffee spilling, camera movement, text, watermark.
```

**İsteğe bağlı ek klip `04b`:** fincan dönüşü. Yalnızca dolu fincan görseliyle (cezvesiz) dene:
```
Static locked-off camera, no zoom. The full stone coffee cup slowly rotates about 90 degrees on its saucer, revealing more of the engraved castle battlement band. Gentle steam rises. Pure black background. Photorealistic slow motion.
Avoid: the engraving morphing, the cup changing shape, hands, camera movement, text.
```
