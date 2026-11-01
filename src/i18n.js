import { whatsappLink } from './config.js';

// TR/EN dil desteği. Sayfa Türkçe yazılır; İngilizce, metin düğümleri bu sözlükten değiştirilerek gösterilir.
// Harf harf animasyonlu başlıklar (.split) aria-label'daki tam metinden çevrilir.
const LANG_KEY = 'harpulse-lang';

const EN = {
  // Açılış animasyonu
  'İSTANBUL': 'ISTANBUL',
  'BERLİN': 'BERLIN',
  'LONDRA': 'LONDON',
  'DUBAİ': 'DUBAI',
  "Elazığ'dan tüm": 'From Elazığ to the',
  'dünyaya': 'world',
  'Geç': 'Skip',
  // Üst menü
  'Harput Çedenesi': 'Harput Çedene',
  'Neden Çedene': 'Why Çedene',
  'Mağaza': 'Shop',
  'Menümüz': 'Our Menu',
  'Franchise Al': 'Franchise',
  'Konum': 'Location',
  'Sipariş Ver': 'Order Now',
  'Ismarla': 'Treat',
  'Tadına bak!': 'Have a taste!',
  // Açılış
  "BİR FİNCANIN KIRK YIL HATIRI · ELAZIĞ'DAN DÜNYAYA ·": 'FORTY YEARS OF FRIENDSHIP · ELAZIĞ TO THE WORLD ·',
  'Dağın': 'The',
  'kahvesi:': "Mountain's Coffee:",
  "Yalnızca Harput'un yamaçlarında yetişen yabani menengiçten, taş dibekte dövülüp sütle pişen bir fincan. Kahve çekirdeği yok, katkı yok; kırk yıl hatırı var. Elazığ'dan tüm dünyaya.":
    "A cup made from wild terebinth that grows only on the slopes of Harput, pounded in stone mortars and brewed with milk. No coffee beans, no additives; just forty years of friendship. From Elazığ to the whole world.",
  'Hikâyemiz': 'Our Story',
  // Kayan bant
  'Bir fincanın': 'A cup with',
  'kırk yıl': 'forty years',
  'hatırı': 'of friendship',
  "Elazığ'ın": "Elazığ's",
  'yabani kahvesi': 'wild coffee',
  "Harput'tan": 'From Harput',
  'sofranıza': 'to your table',
  'Taş dibekte': 'Pounded in',
  'dövüldü': 'stone mortars',
  // Hikâye
  'Hikâyemiz ': 'Our story',
  'Dağdan fincana': 'From mountain to cup in',
  'dört adım': 'four steps',
  'Rüzgâr ekti': 'The wind sowed it',
  "Tarlası yok, sulayanı yok. Menengiç, Harput'un yamaçlarında kendiliğinden büyür.":
    "No field, no one to water it. Terebinth grows wild on the slopes of Harput.",
  'El topladı': 'Hands picked it',
  'Ekim ayında, eller üşürken dağdan tek tek toplanır.': 'In October, with cold hands, it is picked berry by berry from the mountain.',
  'Taş dövdü': 'Stone pounded it',
  'Kavrulur, taş dibekte dövülür ve kendi yağıyla kadife bir macuna dönüşür.':
    'It is roasted and pounded in a stone mortar until its own oil turns it into a velvety paste.',
  'Fincan buluşturdu': 'The cup brought us together',
  'Sütle bakır cezvede pişer, taş fincana dökülür; masa dolar, sohbet başlar.':
    'Brewed with milk in a copper cezve and poured into a stone cup; the table fills up and the conversation begins.',
  // Rakamlar
  'bileşen': 'ingredient',
  'kahve çekirdeği': 'coffee beans',
  'coğrafi işaret': 'geographical indication',
  'yıl hatır': 'years of friendship',
  // Kırk yıl hatırı
  'Coğrafi İşaret · 22 Şubat 2022': 'Geographical Indication · 22 February 2022',
  'Elazığ Çedene Kahvesi tescillendi': 'Elazığ Çedene Coffee registered',
  "Türk Patent ve Marka Kurumu, Harput'un yabani menengiçinden yapılan kahveyi mahreç işaretiyle koruma altına aldı.":
    "The Turkish Patent and Trademark Office protected the coffee made from Harput's wild terebinth with a designation of origin.",
  'Tescil No 1034': 'Reg. No 1034',
  "Elazığ'dan bir söz": 'A saying from Elazığ',
  "Harput'un kalesi, Hazar'ın maviliği, Fırat'ın sabrı ve Elazığ'ın kapısı her misafire açık sofraları. Bu topraklarda bir fincan ikram etmek, kırk yıllık bir dostluğa söz vermektir. Çedene o sözün fincanıdır.":
    "Harput's castle, the blue of Lake Hazar, the patience of the Euphrates and Elazığ's tables open to every guest. In these lands, offering a cup is a promise of forty years of friendship. Çedene is the cup of that promise.",
  'Bir fincan ısmarla': 'Treat someone to a cup',
  // Manifesto
  'Çedene manifestosu': 'Our manifesto',
  "Menengiç tarlada yetişmez; onu Harput'un yamaçlarından elleriyle toplayan Elazığlılar vardır. Çedene'yi seçtiğinizde bir içecekten fazlasını seçersiniz: Elazığ'ın emeğini, geleneğini ve adını dünyaya taşırsınız.":
    "Terebinth does not grow in fields; there are people of Elazığ who pick it by hand from the slopes of Harput. When you choose Çedene, you choose more than a drink: you carry Elazığ's labour, tradition and name to the world.",
  "Ekim ayında, Harput'un yamaçlarında elle hasat": 'Hand harvest on the slopes of Harput in October',
  'Tadına bak': 'Have a taste',
  'İlk yudumda fındık, ardından reçinenin ılık dokunuşu.': 'Hazelnut on the first sip, then a warm touch of resin.',
  'Köpüğü kadife gibi, sonu hafif tatlı. Kahve gibi içilir ama kahveye benzemez.':
    'Velvety foam, a gently sweet finish. You drink it like coffee, yet it tastes like nothing else.',
  'Fındıksı': 'Nutty',
  'Kremamsı': 'Creamy',
  'Reçineli': 'Resinous',
  'Doğal tatlılık': 'Natural sweetness',
  'Acılık': 'Bitterness',
  'Ücretsiz tadım iste': 'Request a free tasting',
  'Adil hasat': 'Fair harvest',
  'Menengiçi aracısız, doğrudan yöre halkından ve adil fiyatla alırız.': 'We buy terebinth directly from local pickers at a fair price, with no middlemen.',
  'Yaşayan gelenek': 'Living tradition',
  "Harput'un Kürsübaşı sohbetlerini yeni nesil bir deneyimle şehirlere taşırız.": "We bring Harput's Kürsübaşı gatherings to cities as a new-generation experience.",
  'Tescilli köken': 'Registered origin',
  "2022'de coğrafi işaret alan": 'We grow',
  "Elazığ Çedenesi'ni": 'Elazığ Çedene',
  "Elazığ'ın adıyla büyütürüz.": ", a geographical indication since 2022, under Elazığ's name.",
  // Neden çedene
  'Neden çedene?': 'Why çedene?',
  'Dünyada eşi yok': 'Nothing like it in the world',
  "Yalnızca Harput'un dağlarında yetişen, coğrafi işaretle korunan yabani bir meyve.": "A wild fruit protected by a geographical indication, growing only in the mountains of Harput.",
  'Kahve çekirdeği içermez': 'No coffee beans',
  'Kahvenin ritüeli, kahvesiz bir fincan. Kafeine ara vermek isteyenlere yeni bir seçenek.': 'The ritual of coffee in a coffee-free cup. A new option for anyone taking a break from caffeine.',
  'Tek bileşen, katkısız': 'One ingredient, no additives',
  'İçindekiler tek satır: menengiç. Şeker, aroma ve koruyucu yok.': 'Ingredients in one line: terebinth. No sugar, flavourings or preservatives.',
  'Doğal antioksidan kaynağı': 'A natural source of antioxidants',
  'Laboratuvar çalışmalarında menengiçte fenolik bileşikler ve antioksidan aktivite saptanmıştır.': 'Laboratory studies have found phenolic compounds and antioxidant activity in terebinth.',
  'Kendi yağıyla kadife kıvam': 'Velvety with its own oil',
  'Taş dibekte dövülürken kendi doğal yağını salar; köpüğü kalın, dokusu ipeksi.': 'Pounded in stone, it releases its own natural oil; thick foam, silky texture.',
  'Sütle ya da bitkisel sütle': 'With milk or plant milk',
  'Geleneksel olarak sütle pişer; yulaf ve badem sütüyle de fındıksı tadı öne çıkar.': 'Traditionally brewed with milk; oat and almond milk bring out its nutty taste.',
  'Kaynak:': 'Source:',
  'Erciyes Üniversitesi, menengiç ve menengiç kahvesinde fenolik bileşikler': 'Erciyes University, phenolic compounds in terebinth and terebinth coffee',
  '. Bilgiler tanıtım amaçlıdır ve tıbbi iddia taşımaz. Antep fıstığıyla aynı cinsten olduğu için fıstık alerjisi olanların dikkatli olması önerilir.':
    '. For information only; no medical claims. Terebinth is in the same genus as pistachio, so people with nut allergies should take care.',
  // Mağaza
  'Tüm ürünler': 'All products',
  'En çok tercih edilen': 'Bestseller',
  'Başlangıç Seti': 'Starter Set',
  '350 g taş dibek çedene + Harput motifli taş fincan': '350 g stone-ground çedene + Harput motif stone cup',
  'Sepete ekle': 'Add to cart',
  'Taş Dibek Çedene': 'Stone-Ground Çedene',
  '350 g, katkısız, taş dibekte dövülmüş': '350 g, no additives, pounded in stone',
  '350 g, katkısız. Sıcak ya da soğuk.': '350 g, no additives. Hot or iced.',
  'Çedene ve Harput fincanı bir arada.': 'Çedene and the Harput cup together.',
  'Harput Fincanı': 'Harput Cup',
  'Harput Kalesi motifli taş fincan': 'Stone cup with Harput Castle relief',
  'Abonelik': 'Subscription',
  'Aylık Çedene': 'Monthly Çedene',
  'Her ay taze dövülmüş 350 g çedene kapınızda': 'Freshly pounded 350 g of çedene at your door every month',
  '/ ay': '/ month',
  // Kampanya
  'Yeni · Al-götür': 'New · Take-away',
  "Çedene artık kilim desenli bardağında, yanınızda. Soğuk Harput ya da sıcak Çedene Latte; sabah işe giderken, akşam yürürken Harput'un sıcaklığı elinizde.":
    "Çedene now comes with you in its kilim-pattern cup. An iced Soğuk Harput or a hot Çedene Latte; the warmth of Harput in your hand on the way to work or on an evening walk.",
  'Menüyü Gör': 'See the Menu',
  'Hemen Sipariş Ver': 'Order Now',
  // Menü ve barlar
  'Çedene Barı': 'Çedene Bar',
  'Her fincan, taş dibekte dövülmüş çedeneyle siparişle hazırlanır.': 'Every cup is made to order with stone-ground çedene.',
  'Kürsübaşı nedir?': 'What is Kürsübaşı?',
  "Harput'ta kış gecelerinde, altında közün ısıttığı yorganlı alçak masanın, yani":
    'On winter nights in Harput, people gather around a low quilt-covered table warmed by embers underneath, the',
  'kürsünün': 'kürsü,',
  'etrafında toplanıp türküler, hikâyeler ve sohbetle sabahı etme geleneği. Çedene Barı bu sıcaklığı şehre taşıyor.':
    'and stay up until dawn with folk songs, stories and conversation. Çedene Bar brings this warmth to the city.',
  'Geleneksel Çedene': 'Traditional Çedene',
  'Sütle, bakır cezvede. Harput usulü.': 'With milk, in a copper cezve. The Harput way.',
  'Çift ölçek çedene, yulaf ya da keçi sütü. Yoğun ve kısa.': 'Double çedene, oat or goat milk. Rich and short.',
  'Soğuk demlenmiş çedene, badem sütü, buz.': 'Cold-brewed çedene, almond milk, ice.',
  'Bol köpüklü süt, tek ölçek çedene, bir tutam tarçın.': 'Foamy milk, a single çedene, a pinch of cinnamon.',
  'Kürsübaşı Seremonisi': 'Kürsübaşı Ceremony',
  'Masada kumda pişen cezve, iki taş fincan, lokum.': 'A cezve brewed in hot sand at your table, two stone cups, Turkish delight.',
  'İlk durak': 'First stop',
  'Kalenin eteğinde amiral mağaza: kumda cezve ve Kürsübaşı geceleri.': 'Our flagship at the foot of the castle: sand-brewed cezve and Kürsübaşı nights.',
  'Sıradaki': 'Next',
  'Senin şehrin': 'Your city',
  'İstanbul, Ankara, İzmir ve gurbetteki her Elazığlının şehri.': 'Istanbul, Ankara, İzmir and every city where people from Elazığ live abroad.',
  'Şehrine getir': 'Bring it to your city',
  // Franchise
  "HARPULSE'ü kendi şehrinize taşıyın. Konseptten tedarike, eğitimden pazarlamaya her şeyi birlikte kuruyoruz.":
    'Bring HARPULSE to your city. From concept to supply, training to marketing, we build it all together.',
  'Hazır konsept': 'Ready-made concept',
  'Menü, iç mimari, kumda cezve ocağı ve taş fincanlarla anahtar teslim Çedene Barı.': 'A turnkey Çedene Bar with menu, interior design, hot-sand cezve stove and stone cups.',
  "Harput'tan tedarik": 'Supply from Harput',
  "Taş dibekte dövülmüş çedene, coğrafi işaretli ve izlenebilir şekilde doğrudan Harput'tan gelir.": 'Stone-ground çedene comes straight from Harput, GI-certified and traceable.',
  'Eğitim ve pazarlama': 'Training and marketing',
  'Barista eğitimi, Kürsübaşı gecesi kurgusu ve marka sosyal medya içerikleri hazır.': 'Barista training, Kürsübaşı night playbook and brand social media content, ready to go.',
  'Franchise Ön Talebi': 'Franchise Enquiry',
  'Büyüme planımız': 'Our growth plan',
  'Ön talep formudur; yatırım tutarı ve şartlar görüşmede paylaşılır.': 'This is an enquiry; investment amount and terms are shared in a meeting.',
  // Konum
  'Bizi bulun': 'Find us',
  'Mağaza ': 'Store',
  'Harput Amiral Mağaza': 'Harput Flagship Store',
  'Adres': 'Address',
  'Harput Mahallesi, Merkez / Elazığ': 'Harput Neighbourhood, Merkez / Elazığ',
  'Saatler': 'Hours',
  'Her gün 09:00 – 23:00': 'Every day 09:00 – 23:00',
  "WhatsApp'tan Yaz": 'Message on WhatsApp',
  'Yol Tarifi': 'Directions',
  'Amiral mağaza planlanan konumdur; açılış duyurusu Instagram hesabımızdan yapılacak.': 'The flagship is a planned location; the opening will be announced on our Instagram.',
  // Vizyon
  'Vizyonumuz': 'Our vision',
  "Harput'un yamaçlarında kuşaklardır içilen bu fincanı, coğrafi işaretinin gücüyle dünyanın kahve haritasına taşıyoruz. Her yeni şehirde Elazığ'ın adı da fincanla birlikte yolculuk edecek.":
    "With the strength of its geographical indication, we are putting this cup, enjoyed for generations on the slopes of Harput, on the world's coffee map. In every new city, Elazığ's name will travel with the cup.",
  'Kalenin eteğinde amiral mağaza, online satış ve WhatsApp sipariş.': 'Flagship at the foot of the castle, online sales and WhatsApp orders.',
  'Türkiye': 'Türkiye',
  "İstanbul, Ankara ve İzmir'de Çedene Barları; kafelere hazır macun tedariki.": 'Çedene Bars in Istanbul, Ankara and İzmir; ready-made paste supplied to cafés.',
  'Gurbet': 'Diaspora',
  'Berlin, Köln, Amsterdam ve Londra: Elazığlıların ve Türk diasporasının şehirleri.': 'Berlin, Cologne, Amsterdam and London: cities of the Elazığ and Turkish diaspora.',
  'Dünya': 'The world',
  'Üçüncü dalga kahve dükkânlarının menüsünde: "Harput terebinth coffee".': 'On the menus of third-wave coffee shops: "Harput terebinth coffee".',
  'Yıllar iş planımızdaki hedeflerdir.': 'Years are targets in our business plan.',
  // Büyüme
  'Nasıl büyüyoruz?': 'How we grow',
  'Kime?': 'Who?',
  'Gurbetteki Elazığlılar:': 'People from Elazığ abroad:',
  'memleket özlemi, en anlamlı hediye.': 'a taste of home, the most meaningful gift.',
  'Kahve tutkunları:': 'Coffee lovers:',
  'yeni lezzet arayan üçüncü dalga müdavimleri.': 'third-wave regulars looking for something new.',
  'Kahveyi azaltmak isteyenler:': 'People cutting down on coffee:',
  'ritüelden vazgeçmeden yeni bir fincan.': 'a new cup without giving up the ritual.',
  'Nerede?': 'Where?',
  'Online ve WhatsApp:': 'Online and WhatsApp:',
  'sitemizden doğrudan sipariş.': 'direct orders from our website.',
  'Kafelere tedarik:': 'Café supply:',
  '"Menüne çedene ekle" paketi.': 'the "Add çedene to your menu" pack.',
  'Çedene Barı:': 'Çedene Bar:',
  'önce Harput, sonra büyük şehirler.': 'Harput first, then the big cities.',
  'Nasıl?': 'How?',
  'Kumda cezve videoları:': 'Sand-brewed cezve videos:',
  'sosyal medyanın en çok izlenen kahve sahnesi.': 'the most-watched coffee scene on social media.',
  "Kürsübaşı pop-up'ları:": 'Kürsübaşı pop-ups:',
  'şehir şehir tadım geceleri.': 'tasting nights from city to city.',
  '"Elazığ\'dan bir fincan":': '"A cup from Elazığ":',
  'gurbetteki her eve bir set.': 'a set for every home abroad.',
  'İlk deneme ve hediye': 'First try and gifting',
  'Aylık Abonelik': 'Monthly Subscription',
  'Tekrar eden gelir': 'Recurring revenue',
  'Kafe Tedariki': 'Café Supply',
  'Hızlı ölçeklenen kanal': 'Fast-scaling channel',
  'Deneyim ve en yüksek marj': 'Experience and the highest margin',
  'Birim ekonomi: bir fincan (barda)': 'Unit economics: one cup (at the bar)',
  'Fincan maliyeti': 'Cost per cup',
  'Satış fiyatı': 'Selling price',
  'Brüt marj': 'Gross margin',
  // Kapanış
  'Bir fincanla başla': 'Start with one cup',
  "Başlangıç Seti ile evde ilk Kürsübaşı'nızı kurun; her siparişte Harput'taki toplayıcılar da kazansın.":
    'Host your first Kürsübaşı at home with the Starter Set; every order also supports the pickers in Harput.',
  // Ismarla penceresi
  'Bir Fincan Ismarla': 'Treat Someone to a Cup',
  'Kırk yıl hatırı olan bir fincanı sevdiğine gönder ya da tanımadığın birine askıda bırak.':
    'Send a cup worth forty years of friendship to someone you love, or leave one on hold for a stranger.',
  'Dostuna ısmarla': 'Treat a friend',
  "WhatsApp'tan bir fincan çedene hediye et.": 'Gift a cup of çedene on WhatsApp.',
  'Askıya bırak': 'Leave one on hold',
  "Harput'taki barımızda bir öğrenciye ya da ihtiyacı olana bir fincan bırak.": 'Leave a cup at our Harput bar for a student or someone in need.',
  // Alt bilgi
  'Bir fincanın kırk yıl hatırı': 'A cup worth forty years of friendship',
  'Kaynaklar ve görseller': 'Sources and images',
  'Türk Patent: Elazığ Çedene Kahvesi tescil belgesi (no 1034)': 'Turkish Patent: Elazığ Çedene Coffee registration (no 1034)',
  'Erciyes Üniversitesi: menengiç ve menengiç kahvesinde fenolik bileşikler': 'Erciyes University: phenolic compounds in terebinth and terebinth coffee',
  'Harput Kalesi fotoğrafı:': 'Harput Castle photo:',
  ', renk düzenlemesi yapılmıştır.': ', colour edited.',
  'Bölüm görüntüleri yapay zekâ ile üretilmiştir.': 'Section images were generated with AI.',
  '© 2026 Çedene · Hackathon projesi. Sayfadaki bilgiler tıbbi iddia taşımaz.': '© 2026 Çedene · Hackathon project. Nothing on this page is a medical claim.',
};

// Harf harf animasyonlu bölüm başlıkları
const HEADINGS = {
  'Tadınca Anlayacaksınız': 'Taste It and You Will Understand',
  'Bir Fincan Çedenenin Kırk Yıl Hatırı Vardır': 'A Cup of Çedene Is Remembered for Forty Years',
  'Her Fincan, Dağdaki Bir Emeğe Dokunur': 'Every Cup Touches the Labour on the Mountain',
  'Ritüeli Eve Getirin': 'Bring the Ritual Home',
  'Yolda da Kürsübaşı': 'Kürsübaşı on the Go',
  'Kürsübaşı Şehre İniyor': 'Kürsübaşı Comes to the City',
  'Şehrine Bir Kürsü Kur': 'Open a Kürsü in Your City',
  "Harput'ta bir fincan": 'A Cup in Harput',
  "Elazığ'dan Tüm Dünyaya": 'From Elazığ to the Whole World',
  'Dağdan Şehre, Şehirden Dünyaya': 'From Mountain to City, City to the World',
  'Dağın Kahvesi Bir Tık Uzakta': "The Mountain's Coffee Is One Click Away",
};

// WhatsApp hazır mesajları
const WHATSAPP = {
  'Merhaba HARPULSE Harput çedenesi ve ürünleriniz hakkında bilgi almak istiyorum.': 'Hello HARPULSE I would like to learn more about Harput çedene and your products.',
  'Merhaba HARPULSE Çedenenin tadına bakmak istiyorum. Ücretsiz tadım paketi alabilir miyim?': 'Hello HARPULSE I would like to taste çedene. Could I get a free tasting pack?',
  'Merhaba, al-götür çedene siparişi vermek istiyorum.': 'Hello, I would like to order take-away çedene.',
  'Merhaba, şehrime bir Çedene Barı açmakla ilgileniyorum. Ön talep bırakmak istiyorum.': 'Hello, I am interested in opening a Çedene Bar in my city and would like to leave an enquiry.',
  'Merhaba HARPULSE Franchise almak istiyorum. Şehrim: ': 'Hello HARPULSE I would like to open a franchise. My city: ',
  "Merhaba, Harput'taki mağazanız hakkında bilgi almak istiyorum.": 'Hello, I would like to learn more about your store in Harput.',
  'Merhaba, askıya bir fincan çedene bırakmak istiyorum.': 'Hello, I would like to leave a cup of çedene on hold.',
};

const originals = new Map(); // metin düğümü → Türkçe metin
let current = 'tr';

export function initI18n() {
  const toggle = document.querySelector('[data-lang-toggle]');
  let saved = 'tr';
  try {
    saved = localStorage.getItem(LANG_KEY) || 'tr';
  } catch {
    // tercih hatırlanmaz
  }
  // Dinamik içerik (ürünler, menü) çizildikten sonra uygulanır
  requestAnimationFrame(() => applyLang(saved));
  toggle?.addEventListener('click', () => {
    const next = current === 'tr' ? 'en' : 'tr';
    applyLang(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      // önemli değil
    }
  });
}

function applyLang(lang) {
  current = lang;
  const en = lang === 'en';
  document.documentElement.lang = en ? 'en' : 'tr';
  document.querySelectorAll('[data-lang-toggle]').forEach((b) => {
    b.textContent = en ? 'TR' : 'EN';
    b.setAttribute('aria-label', en ? 'Türkçeye geç' : 'Switch to English');
  });

  // Metin düğümleri
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => {
      const p = n.parentElement;
      if (!p || ['SCRIPT', 'STYLE'].includes(p.tagName) || p.closest('.split')) return NodeFilter.FILTER_REJECT;
      return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!originals.has(node)) originals.set(node, node.nodeValue);
    const tr = originals.get(node);
    if (!en) {
      node.nodeValue = tr;
      return;
    }
    const key = tr.trim().replace(/\s+/g, ' ');
    const translated = EN[key];
    if (translated !== undefined) node.nodeValue = tr.replace(tr.trim(), translated);
  });

  // Harf harf animasyonlu başlıklar: kelime/harf yapısı korunarak yeniden kurulur
  document.querySelectorAll('.split').forEach((el) => {
    const trText = el.dataset.tr || el.getAttribute('aria-label');
    if (!trText) return;
    el.dataset.tr = trText;
    const text = en ? HEADINGS[trText] || trText : trText;
    el.setAttribute('aria-label', text);
    el.innerHTML = text
      .split(/\s+/)
      .map((w) => `<span class="word" aria-hidden="true">${[...w].map((c) => `<span class="char">${c}</span>`).join('')}</span>`)
      .join(' ');
  });

  // WhatsApp mesajları
  document.querySelectorAll('[data-whatsapp]').forEach((a) => {
    const tr = a.dataset.whatsapp;
    a.href = whatsappLink(en ? WHATSAPP[tr] || tr : tr);
  });
}
