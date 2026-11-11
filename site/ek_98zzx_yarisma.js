// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98zzx_yarisma.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/yarisma",{async ac(kap){const kusak=Sunucu.Giris.kusak,rota=Kabuk.etkin;let kapandi=!1,v=null,sonuc=null,gecmis=null,mesgul=!1,gecikme=null,pencereSon=null;function formAc(o){return pencereSon?.
kapat(),pencereSon=pencereForm(o),pencereSon}const gece=YarismaGecesi.ac(),yasiyor=()=>!kapandi&&kusak===Sunucu.Giris.kusak&&rota===Kabuk.etkin&&kap.isConnected;async function yukle(){if(!yasiyor())return;
const s=await Sunucu.cagir("contest_status");if(!yasiyor())return;const r=await Sunucu.cagir("contest_results",{p_season:gecmis??Number(s.season)});yasiyor()&&(v=s,sonuc=r)}const basvurum=()=>{const e=Yarisma.
benim(v).entry;return e&&!e.withdrawn_at?e:null};function aday(e){const s=Yarisma.sarki(e),engel=Yarisma.oyEngeli(v,e);return`<article class="kart" data-yarisma-aday="${esc(e.entry_id)}"><p class="ust\
-yazi">${esc(e.country_name??ulkeAdi(e.country_id))}</p><h3 class="b3">${esc(e.band_name??"")}</h3>
        <p class="aciklama">${esc(s.title)}</p><div class="oneri-dugmeler">${s.seed!=null?muzikDinle(s):""}${["national","final"].includes(Yarisma.asama(v))?`<button class="dugme ikincil" type="button\
" data-yarisma-oy="${esc(e.entry_id)}"${engel?` disabled aria-describedby="yarisma-engel-${esc(e.entry_id)}"`:""}>${ikon("vote")}${\u00E7("Gizli oy ver")}</button>`:""}</div>${engel&&["national","fina\
l"].includes(Yarisma.asama(v))?`<p class="kucuk" id="yarisma-engel-${esc(e.entry_id)}">${esc(engel)}</p>`:""}</article>`}function basvuruHtml(){if(Yarisma.asama(v)!=="application")return"";const m=Yarisma.
benim(v),e=m.entry,yonetici=m.can_manage;return`<section class="kart"><h2 class="b2">${\u00E7("Grubunun ba\u015Fvurusu")}</h2><p class="aciklama">${\u00E7("Kurucu veya y\xF6netici, repertuvardaki bitmi\u015F \
bir \u015Fark\u0131yla ba\u015Fvurur. Grup ba\u015F\u0131na bir ba\u015Fvuru; \xFClke ba\u015F\u0131na en \xE7ok 20 grup. 8. haftan\u0131n sonuna dek \xE7ekilebilirsin.")}</p>
        ${e?`<p><b>${esc(e.band_name??m.band_name??"")}</b> \xB7 ${esc(Yarisma.sarki(e).title)}</p>${e.withdrawn_at?`<p class="kucuk">${\u00E7("Yar\u0131\u015Fma ba\u015Fvurun \xE7ekildi.")}</p>`:""}${e.
can_withdraw?`<button class="dugme sade" type="button" id="yarisma-cekil">${\u00E7("Ba\u015Fvuruyu \xE7ek")}</button>`:""}`:`<button class="dugme ikincil" type="button" id="yarisma-basvur"${m.can_enter?
"":" disabled"}>${ikon("eighth-notes")}${\u00E7("Yar\u0131\u015Fmaya ba\u015Fvur")}</button>${yonetici?"":`<p class="kucuk">${\u00E7("Ba\u015Fvuruyu grubunun kurucusu veya y\xF6neticisi yapar.")}</p>`}`}\
</section>`}function ciz(){if(!yasiyor()||!v)return;const p=Yarisma.asama(v),l=Yarisma.liste(v).filter(e=>!e.withdrawn_at&&(p!=="national"||e.country_id===Yarisma.ulkem(v))),r=sonuc;kap.innerHTML=`<di\
v class="sayfa" data-yarisma-asama="${esc(p)}"><div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("M\xFCzik")}</p><h1 class="b1">${\u00E7("\u015Eark\u0131 Yar\u0131\u015Fmas\u0131")}</h1><p clas\
s="aciklama">${\u00E7("{n}. sezon \xB7 {asama}",{n:Number(v.season),asama:esc(Yarisma.asamaAdi(v))})}</p></div><button class="dugme sade" type="button" id="yarisma-muzik">${\u00E7("M\xFCzi\u011Fe d\xF6n")}\
</button></div>
        <section class="kart"><h2 class="b2">${\u00E7("Her \xFClkenin bir \u015Fark\u0131s\u0131")}</h2><p class="aciklama">${\u00E7("Ba\u015Fvurular 1\u20138, ulusal eleme 9, final 10\u201311 ve sonu\xE7lar 12. haftad\
a. Ulusal elemede kendi \xFClkenin bir grubuna; finalde ba\u015Fka bir \xFClkenin bir grubuna tek gizli oy verirsin. Hesap en az 7 g\xFCnl\xFCk olmal\u0131; telefon gerekmez.")}</p>
        <p class="kucuk">${\u00E7("Finalde her oy veren \xFClkenin ilk 10 tercihi 12, 10, 8, 7, 6, 5, 4, 3, 2, 1 puan al\u0131r. Oysuz \xFClke puan vermez. E\u015Fitlikte puan veren \xFClke say\u0131s\u0131, sonra erken ba\u015Fvuru b\
elirler. Ulusal e\u015Fitlikte erken ba\u015Fvuru; tek aday do\u011Frudan final.")}</p></section>
        ${basvuruHtml()}${Yarisma.oyVar(v)?`<p class="bilgi-kutusu">${\u00E7("Bu a\u015Famadaki gizli oyun kaydedildi; de\u011Fi\u015Ftirilmez.")}</p>`:""}${["national","final"].includes(p)?`<div clas\
s="bilgi-kutusu">${ikon("vote")}<span>${p==="national"?\u00E7("Ulusal eleme: \xFClkeni temsil edecek bir grubu se\xE7. Oylar gizlidir."):\u00E7("Uluslararas\u0131 final: kendi \xFClken d\u0131\u015F\u0131ndaki bir grubu se\xE7\
. Oylar gizlidir.")}</span></div>`:""}
        ${p!=="results"?`<section><h2 class="b2">${p==="final"?\u00E7("Finalistler"):\u00E7("Ba\u015Fvuran gruplar")}</h2><div class="izgara iki">${l.map(aday).join("")||`<p class="bos">${\u00E7("Bu a\
\u015Famada g\xF6sterilecek ba\u015Fvuru yok.")}</p>`}</div></section>`:""}
        <section class="kart"><div class="kart-bas"><h2 class="b2">${\u00E7("Sezon sonu\xE7lar\u0131")}</h2><form id="yarisma-sezon-form" class="oneri-dugmeler"><label class="alan"><span>${\u00E7("Sez\
on")}</span><input name="sezon" type="number" min="1" max="${Number(v.season)}" step="1" value="${Number(gecmis??v.season)}" required></label><button class="dugme sade" type="submit">${\u00E7("G\xF6ster")}\
</button></form></div>${Yarisma.puanlar(r)}
        <p class="kucuk">${\u00E7("Birincinin \xFCyelerine madalya ve g\xFCnl\xFCk an\u0131s\u0131; \u015Fark\u0131ya sezon rozeti verilir. Para, g\xFC\xE7 veya oy a\u011F\u0131rl\u0131\u011F\u0131 \xF6d\xFCl\xFC yoktur.")}\
</p></section><div id="yarisma-gece-yer"></div></div>`,$("#yarisma-muzik",kap).onclick=()=>Kabuk.git("hayat/muzik"),$("#yarisma-basvur",kap)?.addEventListener("click",basvur),$("#yarisma-cekil",kap)?.
addEventListener("click",cekil),$("#yarisma-sezon-form",kap).onsubmit=async e=>{if(e.preventDefault(),mesgul)return;const n=Number(new FormData(e.currentTarget).get("sezon"));!Number.isInteger(n)||n<1||
n>Number(v.season)||(gecmis=n,await tazele())};for(const b of $$("[data-yarisma-oy]",kap))b.onclick=()=>oyVer(l.find(e=>e.entry_id===b.dataset.yarismaOy));muzikDinleBagla(kap),r?.winner??(r?.resolved?
r?.ranking?.[0]:null)?($("#yarisma-gece-yer",kap).replaceWith(gece.el),gece.yaz(r)):gece.birak()}async function yap(fn,args,ileti){if(!(!yasiyor()||mesgul)){mesgul=!0;try{if(await Sunucu.yap(fn,args),
!yasiyor())return;tost(ileti,"badge-check"),await tazele()}finally{mesgul=!1}}}function basvur(){if(!yasiyor()||mesgul)return;const m=Yarisma.benim(v);if(!m.can_enter)return;const sarkilar=m.songs??[];
if(!sarkilar.length){tost(\u00E7("Ba\u015Fvuru i\xE7in repertuvarda bitmi\u015F bir \u015Fark\u0131 olmal\u0131."),"circle-alert");return}formAc({ust:\u00E7("\u015Eark\u0131 Yar\u0131\u015Fmas\u0131"),
baslik:\u00E7("Yar\u0131\u015Fmaya ba\u015Fvur"),onayAd:\u00E7("Ba\u015Fvur"),onayIkon:"eighth-notes",govde:`<p class="aciklama">${\u00E7("Bu \u015Fark\u0131 ve grubun \xFClkeni temsil etmek i\xE7in ba\u015Fvurur. Ba\u015Fvuru\
 \xFCcretsizdir.")}</p><label class="alan"><span>${\u00E7("\u015Eark\u0131")}</span><select name="sarki" required>${sarkilar.map(s=>`<option value="${esc(s.song_id)}">${esc(s.title)}</option>`).join("")}\
</select></label>`,is:async f=>{if(!yasiyor())throw new Error(\u00E7("Bu ekran kapand\u0131; yar\u0131\u015Fmay\u0131 yeniden a\xE7."));await yap("contest_enter",{p_band:m.band_id,p_song:String(f.get(
"sarki"))},\u00E7("Yar\u0131\u015Fma ba\u015Fvurun kaydedildi."))}})}function cekil(){const e=basvurum();!yasiyor()||!e?.can_withdraw||formAc({ust:\u00E7("\u015Eark\u0131 Yar\u0131\u015Fmas\u0131"),baslik:\u00E7(
"Ba\u015Fvuruyu \xE7ek"),onayAd:\u00E7("Ba\u015Fvuruyu \xE7ek"),onayIkon:"x",govde:`<p class="aciklama">${\u00E7("Ba\u015Fvurun \xE7ekilir. Bu sezon grubun yeniden ba\u015Fvuramaz.")}</p>`,is:async()=>{
if(!yasiyor())throw new Error(\u00E7("Bu ekran kapand\u0131; yar\u0131\u015Fmay\u0131 yeniden a\xE7."));await yap("contest_withdraw",{p_entry:e.entry_id},\u00E7("Yar\u0131\u015Fma ba\u015Fvurun \xE7ekildi."))}})}
function oyVer(e){!yasiyor()||!e||mesgul||Yarisma.oyEngeli(v,e)||formAc({ust:\u00E7("\u015Eark\u0131 Yar\u0131\u015Fmas\u0131"),baslik:\u00E7("Gizli oy ver"),onayAd:\u00E7("Oyumu kaydet"),onayIkon:"vo\
te",govde:`<p class="aciklama">${\u00E7("{grup} \xB7 {sarki} i\xE7in tek gizli oyun kaydedilir. Bu a\u015Famada ba\u015Fka oy veremez ve oyunu de\u011Fi\u015Ftiremezsin.",{grup:esc(e.band_name??""),sarki:esc(
Yarisma.sarki(e).title)})}</p>`,is:async()=>{if(!yasiyor())throw new Error(\u00E7("Bu ekran kapand\u0131; yar\u0131\u015Fmay\u0131 yeniden a\xE7."));if(Yarisma.oyEngeli(v,e))throw new Error(Yarisma.oyEngeli(
v,e));await yap("contest_vote",{p_entry:e.entry_id},\u00E7("Gizli oyun kaydedildi."))}})}const tazele=tazeleyici(async()=>{try{await yukle(),yasiyor()&&ciz()}catch(e){if(yasiyor())throw e}}),birak=Durum.
dinle("olay",({olay})=>{!/^contest\./.test(olay)||!yasiyor()||(clearTimeout(gecikme),gecikme=setTimeout(()=>{tazele().catch(()=>{})},250))}),saat=setInterval(()=>{yasiyor()&&tazele().catch(()=>{})},6e4),
kapat=()=>{kapandi||(kapandi=!0,removeEventListener("pagehide",kapat),birak(),clearTimeout(gecikme),clearInterval(saat),pencereSon?.kapat(),gece.kapat(),Yarisma.liste(v).some(e=>Yarisma.sarki(e).song_id===
Ezgi.calan)&&Ezgi.durdur())};addEventListener("pagehide",kapat,{once:!0});try{await yukle(),yasiyor()?ciz():kapat()}catch(e){const etkin=yasiyor();if(kapat(),etkin)throw e}return kapat}}),Parcalar.tamam(
"ek_98zzx_yarisma");
