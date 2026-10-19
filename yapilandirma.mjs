// Civora oyun sitesinin yayın ayarı (T-27, D-098). GitHub Actions (.github/workflows/yayin.yml) ve Cloudflare Pages aynı
// betiği çalıştırır. Cloudflare Pages ayarı: derleme komutu "node yapilandirma.mjs", çıktı klasörü "site".
//
// Ortam değişkenleri:
//   SUPABASE_URL      https://<proje>.supabase.co (Supabase → Project Settings → Data API → Project URL)
//   SUPABASE_ANAHTAR  herkese açık anahtar (Supabase → Project Settings → API Keys → Publishable key, sb_publishable_…).
//                     Gizli anahtar (sb_secret_…) ve eski türün service_role anahtarı reddedilir.
//   SITE_ADRESI       (isteğe bağlı) sitenin herkese açık adresi, ör. https://civora.com. Bağlantı paylaşılınca görünen
//                     kartın resmi ve adresi bununla yazılır; yoksa kartın resim satırları silinir (yazılar kalır).
//
// Çıktı: site/yapilandirma.json yazılır; site/index.html'deki __SITE_ADRESI__ yer tutucusu doldurulur.
// Sayfanın içerik güvenlik politikası yalnız satır içi betiklerin özetini içerir; buradaki değişiklik onu bozmaz.
import { readFileSync, writeFileSync } from "node:fs";

function hata(ileti) {
  console.error(`::error::${ileti}`);
  process.exit(1);
}

const url = String(process.env.SUPABASE_URL ?? "").trim().replace(/\/+$/, "");
const anahtar = String(process.env.SUPABASE_ANAHTAR ?? "").trim();
const site = String(process.env.SITE_ADRESI ?? "").trim().replace(/\/+$/, "");

if (!url) hata("SUPABASE_URL tanımlı değil.");
if (!anahtar) hata("SUPABASE_ANAHTAR tanımlı değil.");
if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url)) {
  hata("SUPABASE_URL https://….supabase.co biçiminde olmalı (sonunda /rest/v1 gibi bir ek olmadan).");
}
if (anahtar.startsWith("sb_secret_")) {
  hata("Bu GİZLİ anahtar! Siteye yalnız herkese açık (publishable) anahtar konur. Değişkeni hemen sil ve Supabase'te gizli anahtarı yenile.");
}
if (anahtar.startsWith("eyJ")) {
  // Eski tür anahtar (JWT): yalnız "anon" rolündeki siteye konabilir; service_role bütün kuralları aşar.
  let rol = null;
  try {
    rol = JSON.parse(Buffer.from(anahtar.split(".")[1], "base64url").toString("utf8")).role;
  } catch {
    rol = null;
  }
  if (rol !== "anon") hata("Bu eski tür anahtar herkese açık (anon) anahtar değil. Siteye yalnız herkese açık anahtar konur.");
} else if (!anahtar.startsWith("sb_publishable_")) {
  hata("SUPABASE_ANAHTAR sb_publishable_ ile başlamalı (Supabase → Project Settings → API Keys → Publishable key).");
}
if (site && !/^https:\/\/[^\s"'<>]+$/.test(site)) hata("SITE_ADRESI https:// ile başlayan bir adres olmalı.");

writeFileSync("site/yapilandirma.json", JSON.stringify({ supabaseUrl: url, anahtar, ortam: "canli" }) + "\n");

let sayfa = readFileSync("site/index.html", "utf8");
sayfa = site ? sayfa.replaceAll("__SITE_ADRESI__", site) : sayfa.replace(/^.*(__SITE_ADRESI__|og:image:).*\n/gm, "");
writeFileSync("site/index.html", sayfa);

console.log(`Ayar dosyası yazıldı (${url}). Paylaşım kartı: ${site || "resimsiz (SITE_ADRESI yok)"}.`);
