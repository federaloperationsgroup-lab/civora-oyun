// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_98zh_mekan_ic.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/mekan",{async ac(kap){let kapandi=!1,zy=null,panelBirak=null,burada=null;const[harita]=await Promise.all([Durum.harita().catch(()=>null),Durum.kurallar().catch(()=>null)]),birak=()=>{
panelBirak?.(),panelBirak=null,zy?.kapat(),zy=null},listeye=(bildiri=null)=>{kapandi||(birak(),MekanYolu.hedefUnut(),mekanBildiri=bildiri,Kabuk.git("sehir/mekanlar"))},kalis=()=>burada?.stay&&burada.stay.
venue_id===zy?.s?.venue?.venue_id?burada.stay:null;async function gir(mekan,yer="main",{duzenle=!1}={}){birak(),kap.innerHTML=`<div class="sayfa"><div class="kart yuk-kart">${esc(yer==="main"?\u00E7("\
Mek\xE2na giriliyor\u2026"):\u00E7("Odaya \xE7\u0131k\u0131l\u0131yor\u2026"))}</div></div>`;const z=MekanZiyareti.ac(mekan,yer);zy=z;let hata=null,neden=null;z.bagla({bitti:(n,e)=>{neden=n,hata=e??null}});
const[s,r]=await Promise.all([z.gir(),MekanYolu.burada().catch(()=>null)]);if(!(kapandi||zy!==z||!kap.isConnected)){if(burada=r??burada,!s){listeye(hata?hataMetni(hata):MEKAN_NEDEN[neden]??\u00E7("Bu \
mek\xE2na \u015Fu an girilemiyor."));return}try{sessionStorage.setItem("civora.mekan",JSON.stringify({mekan,yer}))}catch{}ciz(s,duzenle)}}function ciz(s,duzenle){const v=s.venue,salon=s.space==="main";
kap.innerHTML='<div class="sayfa"><div id="mekan-yer"></div></div>',panelBirak=MekanPaneli.ac($("#mekan-yer",kap),zy,{sehir:Number(harita?.cities?.[v.region_id]??1),duzenle,kalis,cik:()=>listeye(salon?
\u00E7("Mek\xE2ndan \xE7\u0131kt\u0131n."):\u00E7("Odadan \xE7\u0131kt\u0131n.")),bitti:(n,e)=>dustu(n,e),yonet:()=>mekanimGit(v.venue_id),oda:n=>gir(v.venue_id,"room:"+n),lobi:()=>gir(v.venue_id,"mai\
n")})}function dustu(neden,e){if(kapandi)return;const metin=e?hataMetni(e):MEKAN_NEDEN[neden]??MEKAN_NEDEN.giris;tost(metin,"door-open"),listeye(metin)}const h=MekanYolu.hedefAl();if(h)await gir(h.mekan,
h.yer??"main",{duzenle:!!h.duzenle});else{const d=await MekanYolu.durum().catch(()=>null);if(!kap.isConnected)return()=>{};d?.in_venue&&d.venue?.venue_id?await gir(d.venue.venue_id,d.space??"main"):setTimeout(
()=>listeye(null))}return()=>{kapandi=!0,birak(),MekanYolu.hedefUnut()}}}),Parcalar.tamam("ek_98zh_mekan_ic");
