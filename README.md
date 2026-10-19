# Civora

Çevrimiçi strateji ve yaşam oyunu. Bu depo yalnız oyunun yayımlanmış ekranlarını taşır; kaynak kod ayrı (gizli) depodadır.

- Oyun: bu deponun GitHub Pages adresi (Settings → Pages) ya da alan adı bağlanınca o adres.
- Gizlilik ve oyun kuralları: sitedeki `gizlilik.html`.
- Sorun ve öneriler: oyun içindeki Geri bildirim formu (Hayatım → Ayarlar).

## Nasıl yayımlanır

- **GitHub Pages:** her gönderimde `.github/workflows/yayin.yml` çalışır; ayar dosyasını `yapilandirma.mjs` yazar.
  Depo değişkenleri (Settings → Secrets and variables → Actions → Variables): `SUPABASE_URL`, `SUPABASE_ANAHTAR`
  (herkese açık anahtar) ve isteğe bağlı `SITE_ADRESI` (sitenin asıl adresi; paylaşım kartı için).
- **Cloudflare Pages** (alan adıyla): Workers & Pages → Create → Pages → Connect to Git → bu depo.
  - Build command: `node yapilandirma.mjs`
  - Build output directory: `site`
  - Environment variables: `SUPABASE_URL`, `SUPABASE_ANAHTAR`, `SITE_ADRESI` (ör. `https://civora.com`)
  - Güvenlik ve önbellek başlıkları `site/_headers` dosyasından gelir.

## Bekçi

`.github/workflows/bekci.yml` 15 dakikada bir siteyi, giriş servisini ve veritabanını dener. Sorun görürse "bekci"
etiketli bir konu (issue) açar ve depo sahibini anar; düzelince konuyu kapatır.

Bu depodaki dosyalar elle düzenlenmez; ana depodaki yayın aracıyla (`tools/yayin/yayinla.sh`) üretilir.
