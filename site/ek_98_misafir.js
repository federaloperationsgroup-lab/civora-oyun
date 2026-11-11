// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_98_misafir.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/misafir",{async ac(kap){let kapandi=!1,zy=null,odaKapat=null;const harita=await Durum.harita().catch(()=>null),birak=()=>{odaKapat?.(),odaKapat=null,zy?.kapat(),zy=null};async function liste(bildiri=null){
birak(),EvYolu.hedefUnut();let r=null,hata=null;try{r=await EvYolu.komsular()}catch(e){hata=e}if(kapandi)return;const evler=r?.homes??[];kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${\u00E7("Misafirlik")}</h1>
          <p class="aciklama">${\u00E7("Arkada\u015Flar\u0131n\u0131n evlerine ve kap\u0131s\u0131 herkese a\xE7\u0131k evlere gidersin. Evdekileri fig\xFCrleriyle g\xF6r\xFCr, Buras\u0131'nda evin sohbetine yazars\u0131n.")}\
</p></div></div>
        ${bildiri?`<div class="bilgi-kutusu" id="misafir-bildiri" style="margin-bottom:14px">${ikon("door-open")}<span>${esc(bildiri)}</span></div>`:""}
        <section class="kart" id="misafir-liste">
          <div class="kart-bas"><div><p class="ust-yazi">${esc(r?.region_id?bolgeAdi(r.region_id):\u00E7("Yoldas\u0131n"))}</p><h2 class="b2">${\u00E7("Bu \u015Fehrin evleri")}</h2></div>
            <span class="ik-kutu">${ikon("users-round")}</span></div>
          ${hata?`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(hata))}</span></div>`:evler.length?`<div class="liste">${evler.map(evKomsuSatir).join("")}</div>`:`<p class="bos\
">${esc(evKomsuBos(r))}</p>`}
          <p class="kucuk" style="margin-top:10px">${\u00E7("Kendi evinin kap\u0131s\u0131n\u0131 Evim'den ayarlars\u0131n: kapal\u0131, arkada\u015Flara ya da herkese a\xE7\u0131k.")}</p>
          <div class="oneri-dugmeler" style="margin-top:12px"><button class="dugme sade kucuk-d" data-git="sehir/ev">${ikon("house")}${\u00E7("Evim")}</button></div>
        </section></div>`;for(const b of $$("[data-komsu-git]",kap))b.onclick=()=>{const h2=evler.find(x=>x.owner_id===b.dataset.komsuGit);h2&&ziyaret(h2.owner_id,h2.name)};for(const b of $$("[data-gi\
t]",kap))b.onclick=()=>Kabuk.git(b.dataset.git)}async function ziyaret(sahip,ad=null){birak(),kap.innerHTML=`<div class="sayfa"><div class="kart yuk-kart">${esc(ad?\u00E7("{ad} adl\u0131 oyuncunun evine gi\
riliyor\u2026",{ad}):\u00E7("Eve giriliyor\u2026"))}</div></div>`;const z=EvZiyareti.ac(sahip);zy=z;let hata=null;z.bagla({bitti:(neden,e)=>{hata=e??null}});const s=await z.gir();if(!(kapandi||zy!==z)){
if(!s){liste(hata?hataMetni(hata):\u00E7("Bu eve \u015Fu an girilemiyor."));return}ciz(s)}}function ciz(s){const h2=s.home,ev=h2.kind==="house",bant=mekanBant(ev?"oda_ev_salon":"oda_pansiyon",ev?\u00E7(
"Misafirlik \xB7 ev"):\u00E7("Misafirlik \xB7 pansiyon odas\u0131"),s.owner_name??"",[bolgeAdi(h2.region_id),ev&&h2.zone?MAHALLE_TUR[h2.zone]??h2.zone:null].filter(Boolean).join(" \xB7 "));kap.innerHTML=
`<div class="sayfa">${bant}<div id="oda-yer"></div></div>`,odaKapat=OdaPaneli.ac($("#oda-yer",kap),odaZiyaretten(h2),{sehir:Number(harita?.cities?.[h2.region_id]??1),ziyaret:zy,misafir:!0,sahip:s.owner_id,
sahipAd:s.owner_name,cik:()=>liste(MISAFIR_NEDEN.cikti),bitti:(neden,e)=>dustu(neden,e)})}function dustu(neden,e){if(kapandi)return;const metin=MISAFIR_NEDEN[neden]??(e?hataMetni(e):MISAFIR_NEDEN.cikti);
tost(metin,"door-open"),liste(metin)}const h=EvYolu.hedefAl();return h?await ziyaret(h.sahip,h.ad):await liste(),()=>{kapandi=!0,birak()}}}),Parcalar.tamam("ek_98_misafir");
