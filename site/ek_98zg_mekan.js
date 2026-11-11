// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98zg_mekan.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/mekanlar",{async ac(kap){let r=null,hata=null;const bildiri=mekanBildiri;mekanBildiri=null,await Durum.kurallar().catch(()=>null);async function yukle(){try{r=await MekanYolu.burada(),
hata=null}catch(e){hata=e}}function ciz(){if(hata&&!r){kap.innerHTML=`<div class="sayfa"><div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(hata))}</span></div>
          <button class="dugme ikincil" style="margin-top:14px" id="mekan-yeniden">${\u00E7("Yeniden dene")}</button></div>`,$("#mekan-yeniden",kap).onclick=()=>tazele();return}const sis=r.system,venues=r.
venues??[],mine=r.mine??[],olaylar=r.events??[],sahibi=mine.some(v=>v.role==="owner"),enCok=Number(r.city_venues_max??0);kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${\u00E7("Mek\xE2nlar")}</h1>
          <p class="aciklama">${\u00E7("Kahvehanede, kul\xFCpte ve otelde \u015Fehrin oyuncular\u0131yla oturursun: \xE7ay \u0131smarlar, hediye verir, f\u0131kra anlat\u0131rs\u0131n. Kendi mek\xE2n\u0131n\u0131 da a\xE7abilirsin.")}\
</p></div>
          ${meydanaDonDugme("mekan")}</div>
        ${bildiri?`<div class="bilgi-kutusu" id="mekan-bildiri" style="margin-bottom:14px">${ikon("door-open")}<span>${esc(bildiri)}</span></div>`:""}
        ${r.on_road?`<div class="bilgi-kutusu" style="margin-bottom:14px">${ikon("route")}<span>${\u00E7("Yoldas\u0131n; vard\u0131\u011F\u0131n \u015Fehrin mek\xE2nlar\u0131 burada g\xF6r\xFCn\xFCr.")}\
</span></div>`:""}
        ${sis?mekanBant("mekan_kahvehane",bolgeAdi(sis.region_id),mekanAdi(sis),\u00E7("Belediyenin kahvehanesi: \xE7ay, kahve, ayran, limonata ve \xE7i\xE7ek. \u015Eu an i\xE7eride {n} ki\u015Fi.",{n:sayi(
sis.people??0)}),`<button class="dugme altin" data-mekan-git="${esc(sis.venue_id)}" id="mekan-sistem-gir">${ikon("door-open")}${\u00E7("\u0130\xE7eri gir")}</button>`):""}
        <div class="izgara mekan-izgara">
          <section class="kart" id="mekan-liste"><div class="kart-bas"><div><p class="ust-yazi">${esc(r.region_id?bolgeAdi(r.region_id):\u00E7("Yoldas\u0131n"))}</p>
            <h2 class="b2">${\u00E7("Oyuncular\u0131n mek\xE2nlar\u0131")}</h2></div><span class="ik-kutu">${ikon("sofa")}</span></div>
            ${venues.length?`<div class="liste">${venues.map(mekanSatirHtml).join("")}</div>`:`<p class="bos">${r.region_id?\u00E7("Bu \u015Fehirde hen\xFCz oyuncu mek\xE2n\u0131 yok. \u0130lk kahvehaneyi sen a\xE7!"):
\u00E7("Yoldayken mek\xE2nlar g\xF6r\xFCnmez.")}</p>`}
            ${r.region_id?`<p class="kucuk" style="margin-top:10px">${\u00E7("Bu \u015Fehirde {n} / {m} mek\xE2n yeri dolu (\u015Fehrin seviyesine g\xF6re).",{n:venues.length,m:enCok})}</p>`:""}
          </section>
          <section class="kart" id="mekan-etkinlikler"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Bu \u015Fehirde")}</p><h2 class="b2">${\u00E7("Etkinlikler")}</h2></div><span class="ik-\
kutu">${ikon("calendar")}</span></div>
            ${olaylar.length?`<div class="liste">${olaylar.map(etkinlikSatir).join("")}</div>`:`<p class="bos">${\u00E7("Yakla\u015Fan etkinlik yok. Mek\xE2n sahipleri \xE7ay saati, canl\u0131 m\xFCzik, \u015Fiir gecesi gibi\
 etkinlikler a\xE7ar.")}</p>`}</section>
          <section class="kart" id="mekan-mekanim"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Mek\xE2n\u0131m")}</p><h2 class="b2">${mine.length?\u00E7("Y\xF6netti\u011Fin mek\xE2nlar"):
\u00E7("Kendi mek\xE2n\u0131n")}</h2></div><span class="ik-kutu">${ikon("key-round")}</span></div>
            ${mine.length?`<div class="liste">${mine.map(mekanimSatir).join("")}</div>`:`<p class="aciklama">${\u00E7("Kahvehane (her \u015Fehirde), kul\xFCp ya da otel (\u015Fehir 2. seviyede) a\xE7abilirsin. Men\xFCye\
 fiyat koyar, dekoru d\xFCzenler, etkinlik a\xE7ars\u0131n; m\xFC\u015Fterilerin sipari\u015Fi ve g\xFCnl\xFCk sim\xFClasyon m\xFC\u015Fterisi kasana gelir.")}</p>`}
            ${!sahibi&&r.region_id?`<div class="oneri-dugmeler" style="margin-top:12px"><button class="dugme altin kucuk-d" id="mekan-ac">${ikon("key-round")}${\u00E7("Mek\xE2n a\xE7")}</button></div>`:
""}
          </section>
          ${r.stay?`<section class="kart" id="mekan-kalis"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Otel")}</p><h2 class="b2">${\u00E7("Konaklaman")}</h2></div><span class="ik-kutu">${ikon(
"bed")}</span></div>
            <div class="liste">${kalisHtml(r.stay,r.region_id)}</div></section>`:""}
          <section class="kart" id="mekan-baglar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Yak\u0131nl\u0131k")}</p><h2 class="b2">${\u00E7("Tan\u0131d\u0131k \u2192 arkada\u015F \u2192 yak\u0131n dost \u2192 kanka")}\
</h2></div><span class="ik-kutu">${ikon("heart-handshake")}</span></div>
            <p class="aciklama">${\u00E7("Mek\xE2nda selamla\u015Ft\u0131k\xE7a, \u0131smarlad\u0131k\xE7a, f\u0131kras\u0131na g\xFCld\xFCk\xE7e ve ayn\u0131 masada oturduk\xE7a yak\u0131nl\u0131\u011F\u0131n\u0131z artar (son 90 g\xFCn). Arkada\u015Fken 20 puanda yak\u0131n dost, 50 puanda k\
anka olursunuz. Yak\u0131nl\u0131k g\xFC\xE7, gelir ya da oy vermez.")}</p>
            <div class="oneri-dugmeler"><button class="dugme ikincil kucuk-d" id="mekan-arkadaslar">${ikon("users-round")}${\u00E7("Arkada\u015Flar ve tan\u0131d\u0131klar")}</button>
              <button class="dugme ikincil kucuk-d" id="mekan-hediyeler">${ikon("gift")}${\u00E7("Hediyelerim")}</button></div></section>
        </div></div>`,bagla()}function etkinlikSatir(e){const canli=e.status==="live",yer=e.venue_system?\u00E7("{sehir} Kahvehanesi",{sehir:bolgeAdi(r.region_id)}):e.venue??"";return`<div class="list\
e-satir" data-etkinlik-satir="${esc(e.event_id)}"><span class="liste-ikon ${canli?"mercan":"altin"}">${ikon(MEKAN_ETKINLIK_IK[e.kind]??"calendar")}</span>
        <div><span class="tur">${esc(canli?\u00E7("\u015Eimdi \xB7 {saat}'e kadar",{saat:saatKisa(e.ends_at)}):saatYaz(e.starts_at))}</span><b>${esc(MEKAN_ETKINLIK[e.kind]??e.kind)}</b>
          <div class="alt">${esc([yer,MEKAN_TUR[e.venue_kind]??null,Number(e.interested)?\u00E7("{n} ki\u015Fi ilgileniyor",{n:sayi(e.interested)}):null].filter(Boolean).join(" \xB7 "))}</div></div>
        <div class="mekan-satir-dugmeler">${canli?"":`<button class="dugme ${e.mine?"":"ikincil"} kucuk-d" data-etkinlik-ilgi="${esc(e.event_id)}" aria-pressed="${!!e.mine}">${ikon("bell")}${e.mine?\u00E7(
"\u0130lgileniyorsun"):\u00E7("\u0130lgileniyorum")}</button>`}
          <button class="dugme kucuk-d" data-mekan-git="${esc(e.venue_id)}">${ikon("door-open")}${\u00E7("Git")}</button></div></div>`}function mekanimSatir(v){const m=v.manage??{},durum=v.status==="s\
uspended"?\u00E7("Ask\u0131da: bor\xE7 {kr} kredi",{kr:kr(m.debt_cr??0)}):\u00E7("Kasa {kr} kredi \xB7 g\xFCnl\xFCk gider {g} kredi",{kr:kr(m.cash?.spendable??0),g:kr(m.upkeep_cr??0)});return`<div cla\
ss="liste-satir mekan-satir" data-mekanim-satir="${esc(v.venue_id)}"><span class="liste-ikon ${v.status==="suspended"?"mercan":"yesil"}">${ikon(MEKAN_TUR_IK[v.kind]??"sofa")}</span>
        <div><span class="tur">${esc([MEKAN_TUR[v.kind],bolgeAdi(v.region_id),v.role==="owner"?\u00E7("sahibisin"):\u00E7("y\xF6neticisisin")].join(" \xB7 "))}</span><b>${esc(v.name)}</b>
          <div class="alt">${esc(durum)} \xB7 ${esc(Number(v.people)?\u00E7("i\xE7eride {n} ki\u015Fi",{n:sayi(v.people)}):\u00E7("i\xE7eride kimse yok"))}</div></div>
        <div class="mekan-satir-dugmeler"><button class="dugme kucuk-d" data-mekan-git="${esc(v.venue_id)}">${ikon("door-open")}${\u00E7("Gir")}</button>
          <button class="dugme ikincil kucuk-d" data-mekan-yonet="${esc(v.venue_id)}">${ikon("settings")}${\u00E7("Y\xF6net")}</button></div></div>`}const bul=id=>[r.system,...r.venues??[],...r.mine??
[]].find(v=>v?.venue_id===id)??null;function bagla(){meydanaDonBagla(kap);for(const b of $$("[data-mekan-git]",kap))b.onclick=()=>MekanYolu.git(b.dataset.mekanGit);for(const b of $$("[data-mekan-yonet\
]",kap))b.onclick=()=>mekanimGit(b.dataset.mekanYonet);for(const b of $$("[data-mekan-kal]",kap))b.onclick=()=>{const v=bul(b.dataset.mekanKal);v&&otelKalPenceresi(v,()=>tazele())};for(const b of $$("\
[data-etkinlik-ilgi]",kap))b.onclick=()=>mekanIsle(b,async()=>{const e=(r.events??[]).find(x=>x.event_id===b.dataset.etkinlikIlgi);if(!e)return;const y=await MekanYolu.ilgi(e.event_id,!e.mine);tost(y.
mine?\u00E7("Etkinlik ba\u015Flarken haber verece\u011Fiz."):\u00E7("Art\u0131k haber vermeyece\u011Fiz."),"bell"),await tazele()});$("#mekan-ac",kap)?.addEventListener("click",()=>mekanAcPenceresi(r,
v=>{v?.venue_id?mekanimGit(v.venue_id):tazele()})),$("#mekan-arkadaslar",kap)?.addEventListener("click",()=>Kabuk.git("meydan/arkadas")),$("#mekan-hediyeler",kap)?.addEventListener("click",hediyelerimPenceresi);
const k=$("#mekan-kalis",kap);k&&r.stay&&($("[data-kalis-git]",k)?.addEventListener("click",()=>MekanYolu.git(r.stay.venue_id,r.stay.space)),$("[data-kalis-ayril]",k)?.addEventListener("click",()=>kalisAyril(
r.stay,()=>tazele())))}const tazele=tazeleyici(async()=>{await yukle(),ciz()});await yukle(),ciz();const b1=Sunucu.Canli.dinle("public:place",(olay,yuk)=>{olay==="venue.changed"&&yuk?.data?.region_id&&
yuk.data.region_id===r?.region_id&&tazele()}),b2=Durum.dinle("olay",({olay})=>{/^(venue\.|travel\.arrived)/.test(olay)&&tazele()}),saat=setInterval(()=>{document.hidden||tazele()},6e4);return()=>{b1(),
b2(),clearInterval(saat)}}}),Kabuk.kaydet("sehir/mekanim",{async ac(kap){let r=null,v=null,hata=null,ark=null,id=mekanimHedef??(()=>{try{return sessionStorage.getItem("civora.mekanim")}catch{return null}})();
mekanimHedef=null,await Durum.kurallar().catch(()=>null);async function yukle(){try{r=await MekanYolu.burada();const l=r.mine??[];if(v=l.find(x=>x.venue_id===id)??l[0]??null,v){id=v.venue_id;try{sessionStorage.
setItem("civora.mekanim",id)}catch{}}v?.role==="owner"&&ark===null&&(ark=(await Sunucu.cagir("friends").catch(()=>null))?.friends??[]),hata=null}catch(e){hata=e}}const R=()=>venueKurali();let kirli=!1,
bekleyen=!1;const yazilan=new Map,alanGrubu=el=>[...el.closest("[data-mekanim-kasa],[data-mekanim-tezgah],[data-mekanim-fiyat],[data-mekanim-ayar],[data-mekanim-etkinlik],[data-mekanim-yonetici],[data\
-mekanim-ad],[data-mekanim-sahne]")?.attributes??[]].map(a=>a.name).find(n=>n.startsWith("data-mekanim-")),degisti=e=>{kirli=!0;const el=e.target,grup=el?.name?alanGrubu(el):null;if(!grup)return;const secimli=el.
type==="checkbox"||el.type==="radio",k=`${grup}/${el.name}${secimli?"/"+el.value:""}`;yazilan.delete(k),(secimli||el.value!=="")&&yazilan.set(k,secimli?{secili:el.checked}:{deger:el.value})};kap.addEventListener(
"input",degisti),kap.addEventListener("change",degisti);const tazeleIste=()=>{kirli?bekleyen=!0:arkaTazele()},yazilaniUnut=grup=>{for(const k of[...yazilan.keys()])k.startsWith(grup+"/")&&yazilan.delete(
k)},yazilaniGeriKoy=odakAnahtari=>{for(const[k,y]of yazilan){const[grup,ad,deger]=k.split("/"),el=deger===void 0?$(`[${grup}] [name="${ad}"]`,kap):$(`[${grup}] [name="${ad}"][value="${CSS.escape(deger)}\
"]`,kap);if(!el){yazilan.delete(k);continue}"secili"in y?el.checked=y.secili:el.value=y.deger,k===odakAnahtari&&el.focus({preventScroll:!0})}kirli=yazilan.size>0};function ciz(){const odak=document.activeElement,
odakAnahtari=odak&&kap.contains(odak)&&odak.name&&alanGrubu(odak)?`${alanGrubu(odak)}/${odak.name}${odak.type==="checkbox"||odak.type==="radio"?"/"+odak.value:""}`:null;if(kirli=!1,bekleyen&&(bekleyen=
!1,setTimeout(()=>arkaTazele())),hata&&!v){kap.innerHTML=`<div class="sayfa"><div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(hata))}</span></div>
          <button class="dugme ikincil" style="margin-top:14px" id="mekanim-yeniden">${\u00E7("Yeniden dene")}</button></div>`,$("#mekanim-yeniden",kap).onclick=()=>tazele();return}if(!v){kap.innerHTML=
`<div class="sayfa"><div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim \xB7 Mek\xE2nlar")}</p><h1 class="b1">${\u00E7("Mek\xE2n\u0131m")}</h1>
            <p class="aciklama">${\u00E7("Sahibi ya da y\xF6neticisi oldu\u011Fun bir mek\xE2n yok.")}</p></div></div>
          <div class="oneri-dugmeler"><button class="dugme ikincil" id="mekanim-liste">${ikon("sofa")}${\u00E7("Mek\xE2nlar")}</button>
            ${r?.region_id?`<button class="dugme altin" id="mekanim-ac">${ikon("key-round")}${\u00E7("Mek\xE2n a\xE7")}</button>`:""}</div></div>`,$("#mekanim-liste",kap).onclick=()=>Kabuk.git("sehir/\
mekanlar"),$("#mekanim-ac",kap)?.addEventListener("click",()=>mekanAcPenceresi(r,x=>{id=x?.venue_id??id,tazele()}));return}const m=v.manage??{},sahibi=v.role==="owner",digerleri=(r.mine??[]).filter(x=>x.
venue_id!==v.venue_id);kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${esc([\u00E7("Mek\xE2n\u0131m"),MEKAN_TUR[v.kind],bolgeAdi(v.region_id)].join(" \xB7 "))}</p><h1 class="b1" id="mekanim-ad">${esc(v.name)}</h1>\

          <p class="aciklama">${esc([sahibi?\u00E7("Sahibisin."):\u00E7("Y\xF6neticisisin: kasaya dokunmaz, mek\xE2n\u0131 kapatmazs\u0131n."),MEKAN_DURUM[v.status]??"",MEKAN_KAPI[v.door]??""].filter(
Boolean).join(" \xB7 "))}</p></div>
          <div class="kart-bas-dugmeler"><button class="dugme altin kucuk-d" data-mekan-git="${esc(v.venue_id)}">${ikon("door-open")}${\u00E7("\u0130\xE7eri gir")}</button>
            <button class="dugme ikincil kucuk-d" id="mekanim-dekor">${ikon("move")}${\u00E7("Dekoru d\xFCzenle")}</button>
            <button class="dugme sade kucuk-d" id="mekanim-liste">${ikon("sofa")}${\u00E7("Mek\xE2nlar")}</button></div></div>
        ${digerleri.length?`<div class="secim-sec" style="margin-bottom:12px">${[v,...digerleri].map(x=>`<button class="secim-cip" type="button" data-mekanim-sec="${esc(x.venue_id)}" aria-pressed="${x.
venue_id===v.venue_id}">${ikon(MEKAN_TUR_IK[x.kind]??"sofa")}${esc(x.name)}</button>`).join("")}</div>`:""}
        ${v.status==="suspended"?askiHtml(v,m,sahibi):""}
        ${v.name_reset?`<div class="hata-kutusu" style="margin-bottom:14px">${ikon("id-card")}<span>${\u00E7("Moderat\xF6r mek\xE2n\u0131n ad\u0131n\u0131 kald\u0131rd\u0131; a\u015Fa\u011F\u0131dan yeni bir ad se\xE7 (beklemeden bir kez).")}\
</span></div>`:""}
        <div class="izgara mekanim-izgara">
          ${gunHtml(v,m)}${kasaHtml(m,sahibi)}${tezgahHtml(m,sahibi)}${fiyatHtml(v)}${yemekMenuAcik(v)?yemekHtml(v,m,sahibi):""}${ayarHtml(v)}${v.kind==="otel"?odalarHtml(m):""}
          ${v.kind==="kulup"&&v.stage_policy?sahneYonetHtml(v,m):""}
          ${etkinlikHtml(m)}${yoneticiHtml(m,sahibi)}${sahibi?adHtml(v):""}${sahibi?kapatHtml():""}
        </div></div>`,bagla(),yazilaniGeriKoy(odakAnahtari)}function askiHtml(v2,m,sahibi){const son=v2.manage?.suspended_at?new Date(Date.parse(v2.manage.suspended_at)+Number(m.grace_days??14)*864e5).
toISOString():null;return`<div class="hata-kutusu mekanim-aski" style="margin-bottom:14px">${ikon("circle-alert")}<span>${\u00E7("Mek\xE2n ask\u0131da: g\xFCnl\xFCk gider \xF6denemedi, bor\xE7 {kr} kredi. Kap\u0131 kapal\u0131, sa\
t\u0131\u015F ve sim\xFClasyon m\xFC\u015Fterisi yok.",{kr:kr(m.debt_cr??0)})}
        ${son?" "+esc(\u00E7("{zaman} tarihine kadar bor\xE7 \xF6denmezse mek\xE2n kapan\u0131r.",{zaman:saatYaz(son)})):""}
        ${sahibi?" "+\u00E7("Kasaya koyup \u201CBorcu \xF6de ve a\xE7\u201D de."):" "+\u00E7("Borcu yaln\u0131z sahibi \xF6der.")}</span>
        ${sahibi?`<button class="dugme altin kucuk-d" id="mekanim-ac-yeniden">${ikon("door-open")}${\u00E7("Borcu \xF6de ve a\xE7")}</button>`:""}</div>`}function gunHtml(v2,m){const t=m.today??{},d=m.
yesterday,dk=Math.floor(Number(t.staff_seconds??0)/60),esik=Number(m.operated_minutes??15);return`<section class="kart" id="mekanim-gun"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Bug\xFCn")}\
</p><h2 class="b2">${\u00E7("Mek\xE2n\u0131n g\xFCn\xFC")}</h2></div><span class="ik-kutu">${ikon("chart-line")}</span></div>
        <div class="bilgi-izgara">
          <div><small>${\u00E7("Sat\u0131\u015F")}</small><b>${esc(\u00E7("{n} sipari\u015F \xB7 {kr} kredi",{n:sayi(t.sales_count??0),kr:kr(t.sales_cr??0)}))}</b></div>
          <div><small>${\u00E7("\u0130\u015Fletme")}</small><b>${esc(dk>=esik?\u00E7("Bug\xFCn i\u015Fletildi"):\u00E7("{n} / {m} dakika",{n:dk,m:esik}))}</b></div>
          <div><small>${\u00E7("\u0130\xE7eride")}</small><b>${esc(\u00E7("{n} / {m} ki\u015Fi",{n:sayi(v2.people??0),m:sayi(v2.capacity??0)}))}</b></div>
          <div><small>${\u00E7("\xC7ekicilik")}</small><b>${esc(\u00E7("{a} / {b}",{a:sayi(v2.ambiance??0),b:sayi(m.decor_max??0)}))}</b></div>
        </div>
        <p class="kucuk">${d?esc(\u00E7("D\xFCn: {s} sipari\u015F ({kr} kredi); sim\xFClasyon m\xFC\u015Fterisi {m} ki\u015Fi, {p} kredi (vergiden sonra {n}); gider {g} kredi.",{s:sayi(d.sales_count??
0),kr:kr(d.sales_cr??0),m:sayi(d.sim_visitors??0),p:kr(d.sim_cr??0),n:kr(d.sim_net??0),g:kr(d.upkeep_cr??0)})):esc(\u00E7("D\xFCn\xFCn kayd\u0131 yok."))}</p>
        ${Number(v2.concerts_today??0)>0?`<p class="kucuk" id="mekan-konser-gunu" data-konser="${Number(v2.concerts_today)}">${ikon("eighth-notes")} ${esc(\u00E7("Bug\xFCn \u015Fehirde {n} konser: mek\xE2nlar\u0131n \
sim\xFClasyon m\xFC\u015Fterisi b\xFCt\xE7esi %{p} fazla (konser g\xFCn\xFC \u015Fehre m\xFC\u015Fteri getirir).",{n:Number(v2.concerts_today),p:Math.round(Number(v2.sim_boost_ppm??0)/1e4)}))}</p>`:""}\

        <p class="kucuk">${\u00E7("Sim\xFClasyon m\xFC\u015Fterisi yaln\u0131z i\u015Fletilmi\u015F g\xFCnlerde gelir: sahibi ya da y\xF6neticisi o g\xFCn en az {n} dakika i\xE7eride bulunmal\u0131. Etkinlik g\xFCn\xFC, uygun fiyat ve \xE7ekici dekor d\
aha \xE7ok m\xFC\u015Fteri getirir; \u015Fehirde konser olan g\xFCn b\xFCt\xE7e konser ba\u015F\u0131na %25 b\xFCy\xFCr (en \xE7ok %75).",{n:esik})}</p></section>`}function kasaHtml(m,sahibi){const c=m.
cash??{};return`<section class="kart" id="mekanim-kasa"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kasa")}</p><h2 class="b2">${esc(\u00E7("{kr} kredi",{kr:kr(c.spendable??0)}))}</h2></di\
v><span class="ik-kutu">${ikon("wallet")}</span></div>
        <p class="kucuk">${esc(\u00E7("G\xFCnl\xFCk gider ({g} kredi) her g\xFCn kasadan belediyeye ge\xE7er.",{g:kr(m.upkeep_cr??0)}))}${Number(c.held)?" "+esc(\u00E7("Ayr\u0131lm\u0131\u015F: {kr} kredi.",
{kr:kr(c.held)})):""}${Number(m.debt_cr)?" "+esc(\u00E7("Bor\xE7: {kr} kredi.",{kr:kr(m.debt_cr)})):""}</p>
        ${sahibi?`<div class="form mekanim-form" data-mekanim-kasa><label class="alan"><span>${\u00E7("Tutar (kredi)")}</span><input name="tutar" inputmode="decimal" autocomplete="off" placeholder="${\u00E7(
"\xD6rn. 50")}"></label>
            <div class="satir" style="flex-wrap:wrap;gap:8px"><button class="dugme kucuk-d" type="button" data-kasa="koy">${ikon("plus")}${\u00E7("Kasaya koy")}</button>
              <button class="dugme ikincil kucuk-d" type="button" data-kasa="cek">${ikon("minus")}${\u00E7("Kasadan \xE7ek")}</button></div>
            <p class="kucuk">${esc(\u00E7("Hesab\u0131nda {kr} kredi var.",{kr:kr(krediVar())}))}</p></div>`:`<p class="kucuk">${\u00E7("Kasaya yaln\u0131z sahibi koyar ve \xE7eker.")}</p>`}</section>`}
function tezgahHtml(m,sahibi){return`<section class="kart" id="mekanim-tezgah"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Tezg\xE2h")}</p><h2 class="b2">${esc(\u00E7("{n} / {m} erzak",{n:sayi(
m.stock??0),m:sayi(m.stock_max??0)}))}</h2></div><span class="ik-kutu">${ikon("croissant")}</span></div>
        <p class="kucuk">${esc(\u00E7("Yiyecek (tost, simit, at\u0131\u015Ft\u0131rmal\u0131k, kahvalt\u0131) sat\u0131l\u0131nca tezg\xE2htan bir erzak t\xFCkenir. Tezg\xE2ha \xE7antandan koyars\u0131n; mek\xE2n\u0131n \u015Fehrinde olmal\u0131s\u0131n. \xC7antanda {n} erzak.",
{n:sayi(Durum.stok("erzak@1"))}))}</p>
        <div class="form mekanim-form" data-mekanim-tezgah><label class="alan"><span>${\u00E7("Adet")}</span><input name="adet" inputmode="numeric" autocomplete="off" placeholder="${\u00E7("\xD6rn. 10")}\
"></label>
          <div class="satir" style="flex-wrap:wrap;gap:8px"><button class="dugme kucuk-d" type="button" data-tezgah="koy">${ikon("plus")}${\u00E7("Tezg\xE2ha koy")}</button>
            ${sahibi?`<button class="dugme ikincil kucuk-d" type="button" data-tezgah="al">${ikon("minus")}${\u00E7("Tezg\xE2htan al")}</button>`:""}</div></div></section>`}function fiyatHtml(v2){return`\
<section class="kart" id="mekanim-fiyat"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Men\xFC")}</p><h2 class="b2">${\u00E7("Fiyatlar")}</h2></div><span class="ik-kutu">${ikon("receipt-tex\
t")}</span></div>
        <form class="form" data-mekanim-fiyat novalidate>
          <div class="mekanim-fiyatlar">${(v2.menu??[]).map(x=>`<label class="alan mekanim-fiyat"><span>${ikon(MENU_KALEM[x.item]?.[1]??"receipt-text")} ${esc(menuAdi(x.item))} <small>${esc(MENU_TUR[x.
cat]??"")}</small></span>
            <input name="${esc(x.item)}" inputmode="decimal" value="${esc(krediGirdi(x.price))}" autocomplete="off" aria-label="${esc(\u00E7("{kalem} fiyat\u0131 (kredi)",{kalem:menuAdi(x.item)}))}">
            <small>${esc(\u00E7("{a}\u2013{b} kredi",{a:kr(x.min),b:kr(x.max)}))}</small></label>`).join("")}</div>
          <p class="kucuk">${\u00E7("Band\u0131n taban\u0131na yak\u0131n fiyat daha \xE7ok sim\xFClasyon m\xFC\u015Fterisi getirir (\xD71,2), tavan\u0131nda \xD70,6. Sat\u0131\u015F pazar sat\u0131\u015F\u0131 gibi vergilenir; kalan kasaya ge\xE7er.")}\
</p>
          <button class="dugme kucuk-d" type="submit">${ikon("check")}${\u00E7("Fiyatlar\u0131 kaydet")}</button><div class="form-mesaj"></div></form></section>`}const yemekMenuAcik=v2=>!v2.system&&(v2.
meal_rule?.kinds??[]).includes(v2.kind);function yemekHtml(v2,m,sahibi){const K=v2.meal_rule??{},l=m.meals_all??[],kiler=(m.pantry??[]).filter(x=>Number(x.sellable??0)>0),dolu=l.length>=Number(K.dishesMax??
6);return`<section class="kart" id="mekanim-yemek"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ev yeme\u011Fi")}</p><h2 class="b2">${esc(\u00E7("{n} / {m} yemek men\xFCde",{n:l.length,m:Number(
K.dishesMax??6)}))}</h2></div><span class="ik-kutu">${ikon("soup")}</span></div>
        ${l.length?`<div class="liste">${l.map(x=>`<div class="liste-satir mekanim-yemek-satir" data-mekanim-yemek-satir="${Number(x.meal_id)}"><span class="liste-ikon" style="color:${HOBI_KALITE_RENK[x.
quality]??""}">${ikon("soup")}</span>
            <div><span class="tur">${esc(HOBI_KALITE[x.quality]??"")}${x.cook?" \xB7 "+esc(x.mine?\u00E7("senin"):\u00E7("koyan {ad}",{ad:x.cook})):""}</span><b>${esc(yemekAdi(x.recipe))}</b>
              <div class="alt">${esc(\u00E7("{n} tabak \xB7 {kr} kredi \xB7 {s} sat\u0131ld\u0131",{n:sayi(x.qty),kr:kr(x.price),s:sayi(x.sold??0)}))}</div></div>
            <div class="mekan-satir-dugmeler"><button class="dugme ikincil kucuk-d" data-mekanim-yemek-fiyat="${Number(x.meal_id)}">${ikon("receipt-text")}${\u00E7("Fiyat")}</button>
              ${x.mine||sahibi?`<button class="dugme sade kucuk-d" data-mekanim-yemek-geri="${Number(x.meal_id)}">${ikon("undo-2")}${\u00E7("Men\xFCden al")}</button>`:""}</div></div>`).join("")}</div\
>`:`<p class="bos">${\u00E7("Men\xFCde ev yeme\u011Fi yok.")}</p>`}
        <div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme kucuk-d" id="mekanim-yemek-koy" ${!kiler.length||v2.status!=="open"?"disabled":""}>${ikon("store")}${\u00E7("Men\xFCye koy")}\
</button>
          <button class="dugme sade kucuk-d" data-git-hobi>${ikon("chef-hat")}${\u00E7("Mutfak")}</button></div>
        <p class="kucuk">${esc([kiler.length?dolu?\u00E7("Men\xFCde yer yok: \xF6nce bir yeme\u011Fi geri al ya da tabaklar\u0131 bitsin."):"":\u00E7("Kilerinde mek\xE2na konacak ev yeme\u011Fi yok: Hayat\u0131m \u2192\
 Hobiler'de evinde pi\u015Fir."),\u00E7("Kendi pi\u015Firdi\u011Fin yeme\u011Fi koyars\u0131n (hediye gelen sat\u0131lmaz); fiyat {a}\u2013{b} kredi. Sat\u0131\u015F pazar sat\u0131\u015F\u0131 gibi vergilenir, kalan\u0131 kasaya ge\xE7er. Bug\xFCn {n} tabak sat\u0131ld\u0131\
. Ev yeme\u011Fini yaln\u0131z ger\xE7ek oyuncular al\u0131r.",{a:kr(K.minCr??200),b:kr(K.maxCr??1500),n:sayi(m.meals_sold_today??0)})].filter(Boolean).join(" "))}</p></section>`}function ayarHtml(v2){
const Rr=R(),kulup=v2.kind==="kulup",otel=v2.kind==="otel",studyo=v2.kind==="studyo",kira=Rr.club?.concert?.rentCr??{},gece=Rr.hotel?.nightCr??{},ucret=Rr.studio?.feeCr??{};return`<section class="kart\
" id="mekanim-ayar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ayarlar")}</p><h2 class="b2">${\u00E7("Kap\u0131 ve ayarlar")}</h2></div><span class="ik-kutu">${ikon("door-open")}</span><\
/div>
        <form class="form" data-mekanim-ayar novalidate>
          <fieldset class="alan"><legend>${\u00E7("Kim girer")}</legend><div class="radyo-liste">${["open","friends","closed"].map(k=>`<label class="radyo"><input type="radio" name="kapi" value="${k}"\
 ${v2.door===k?"checked":""}>
            <span><b>${esc(MEKAN_KAPI[k])}</b><span class="kucuk">${esc(MEKAN_KAPI_ACIKLAMA[k])}</span></span></label>`).join("")}</div></fieldset>
          ${kulup?`<label class="alan"><span>${\u00E7("Kul\xFCb\xFCn tarz\u0131")}</span><select name="tarz">${(Rr.club?.styles??["pop","rock","caz","elektronik"]).map(s=>`<option value="${esc(s)}" ${v2.
style===s?"selected":""}>${esc(MUZIK_TUR[s]??s)}</option>`).join("")}</select>
              <small>${esc(\u00E7("Bu t\xFCrdeki gruplarla uyum %{a}, \xF6tekilerle %{b}.",{a:Math.round(Number(Rr.club?.concert?.fitOwnPpm??1e6)/1e4),b:Math.round(Number(Rr.club?.concert?.fitOtherPpm??
7e5)/1e4)}))}</small></label>
            <label class="alan"><span>${\u00E7("Konser kiras\u0131 (kredi)")}</span><input name="kira" inputmode="decimal" value="${esc(krediGirdi(v2.concert_rent_cr??kira.default??0))}" autocomplete=\
"off">
              <small>${esc(\u00E7("{a}\u2013{b} kredi. Kul\xFCb\xFCn \u015Fehrin konser mek\xE2nlar\u0131 aras\u0131nda g\xF6r\xFCn\xFCr ({n} ki\u015Fi); kira kasana ge\xE7er.",{a:kr(kira.min??0),b:kr(
kira.max??0),n:sayi(Rr.club?.concert?.capacity??120)}))}</small></label>`:""}
          ${otel?`<label class="alan"><span>${\u00E7("Gecelik oda fiyat\u0131 (kredi)")}</span><input name="gece" inputmode="decimal" value="${esc(krediGirdi(v2.night_price_cr??gece.default??0))}" aut\
ocomplete="off">
              <small>${esc(\u00E7("{a}\u2013{b} kredi. Yeni konaklamalar bu fiyatla ba\u015Flar.",{a:kr(gece.min??0),b:kr(gece.max??0)}))}</small></label>`:""}
          ${studyo?`<label class="alan"><span>${\u00E7("Kay\u0131t \xFCcreti, birim ba\u015F\u0131na (kredi)")}</span><input name="ucret" inputmode="decimal" value="${esc(krediGirdi(v2.record_fee_cr??
ucret.default??0))}" autocomplete="off">
              <small>${esc(\u00E7("{a}\u2013{b} kredi. Devletin st\xFCdyosu birim ba\u015F\u0131na {d} kredi al\u0131r; grup birim ba\u015F\u0131na \xF6dedi\u011Fini kasana b\u0131rak\u0131r. Kayd\u0131n kalite eki \u015Fu an +{e} (s\xFCs e\u015Fyas\u0131yla en \xE7ok +{m}).",
{a:kr(ucret.min??0),b:kr(ucret.max??0),d:kr(Durum.v.kurallar?.data?.culture?.studio?.feePerUnitCr??100),e:Number(v2.studio_bonus??0),m:Number(v2.bonus_max??Rr.studio?.qualityBonusMax??10)}))}</small><\
/label>`:""}
          <button class="dugme kucuk-d" type="submit">${ikon("check")}${\u00E7("Kaydet")}</button><div class="form-mesaj"></div></form></section>`}function sahneYonetHtml(v2,m){const R2=m.stage_rule??
{},l=m.stage_today??[],kapilar=R2.policies??["herkes","arkadaslar","yonetim"],satir=s=>{const canli=s.status==="live",kim=s.kind==="canli"?s.band??"":(s.performers??[]).map(x=>x??\u00E7("Biri")).join(
", ");return`<div class="liste-satir" data-sahne-set="${esc(s.id)}" data-durum="${esc(s.status)}"><span class="liste-ikon ${canli?"mor":""}">${ikon(SAHNE_TUR_IK[s.kind]??"headphones")}</span>
          <div><span class="tur">${esc(saatYaz(s.started_at))} \xB7 ${esc(\u00E7("{n} dakika",{n:Number(s.minutes??0)}))}</span><b>${esc(SAHNE_TUR[s.kind]??s.kind)}${kim?" \xB7 "+esc(kim):""}</b>
            <div class="alt">${esc([canli?\u00E7("s\xFCr\xFCyor"):SAHNE_BITIS[s.end_reason]??"",\u00E7("{n} dinleyici",{n:sayi(s.listeners??0)}),\u00E7("{n} alk\u0131\u015F",{n:sayi(s.applause??0)})].
filter(Boolean).join(" \xB7 "))}</div></div>
          ${canli?`<button class="dugme sade kucuk-d" data-sahne-bitir="${esc(s.id)}">${ikon("x")}${\u00E7("Seti bitir")}</button>`:"<span></span>"}</div>`};return`<section class="kart" id="mekanim-sa\
hne"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sahne")}</p><h2 class="b2">${\u00E7("DJ ve canl\u0131 performans")}</h2></div><span class="ik-kutu">${ikon("headphones")}</span></div>
        <form class="form" data-mekanim-sahne novalidate>
          <fieldset class="alan"><legend>${\u00E7("Sahneye kim \xE7\u0131kar")}</legend><div class="radyo-liste">${kapilar.map(k=>`<label class="radyo"><input type="radio" name="sahne_kapi" value="${esc(
k)}" ${v2.stage_policy===k?"checked":""}>
            <span><b>${esc(SAHNE_KAPI[k]??k)}</b><span class="kucuk">${esc(SAHNE_KAPI_ACIKLAMA[k]??"")}</span></span></label>`).join("")}</div></fieldset>
          <button class="dugme kucuk-d" type="submit">${ikon("check")}${\u00E7("Kaydet")}</button><div class="form-mesaj"></div></form>
        <p class="ust-yazi" style="margin-top:12px">${esc(\u00E7("Bug\xFCnk\xFC setler: {n} / {m}",{n:l.length,m:Number(R2.perVenuePerDay??8)}))}</p>
        ${l.length?`<div class="liste">${l.map(satir).join("")}</div>`:`<p class="bos">${\u00E7("Bug\xFCn sahneye \xE7\u0131kan olmad\u0131.")}</p>`}
        <p class="kucuk">${\u00E7("Kul\xFCpteki oyuncular DJ seti ya da canl\u0131 performans yapar; \u015Fark\u0131lar kul\xFCpte herkese \xE7alar. Sahne para kazand\u0131rmaz: sahnedekiler \xFCn, dinleyenler keyif kazan\u0131r. Sen ve \
y\xF6neticilerin her zaman sahneye \xE7\u0131kar ve s\xFCren seti bitirebilirsiniz.")}</p></section>`}function odalarHtml(m){const H=R().hotel??{},l=m.stays??[];return`<section class="kart" id="mekani\
m-odalar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Otel")}</p><h2 class="b2">${esc(\u00E7("{n} / {m} oda dolu",{n:l.length,m:Number(H.rooms??4)}))}</h2></div><span class="ik-kutu">${ikon(
"bed")}</span></div>
        ${l.length?`<div class="liste">${l.map(s=>`<div class="liste-satir"><span class="liste-ikon lacivert">${ikon("bed")}</span><div><span class="tur">${esc(\u00E7("{n}. oda",{n:Number(s.room)}))}<\
/span><b>${esc(s.guest??"")}</b>
            <div class="alt">${esc(\u00E7("{a} / {b} gece \xF6dendi \xB7 \xE7\u0131k\u0131\u015F {zaman}",{a:Number(s.nights_paid),b:Number(s.nights),zaman:saatYaz(s.ends_at)}))}</div></div><span></sp\
an></div>`).join("")}</div>`:`<p class="bos">${\u00E7("\u015Eu an konaklayan yok.")}</p>`}
        <p class="kucuk">${\u00E7("Konuk 1\u20137 gece kiralar; her gecenin bedeli (vergiden sonra) gecenin ba\u015F\u0131nda kasaya ge\xE7er. Sahibi ve y\xF6neticiler kendi otelinde oda tutmaz.")}</p\
></section>`}function etkinlikHtml(m){const E=R().events??{},yerel=t=>{const z=new Date(t);return z.setMinutes(z.getMinutes()-z.getTimezoneOffset()),z.toISOString().slice(0,16)},en=Date.now()+(Number(
E.leadMin??30)+1)*6e4,son=Date.now()+Number(E.horizonDays??7)*864e5-6e4,oneri=new Date(Math.max(en,Date.now()+2*36e5));oneri.setMinutes(0,0,0),oneri.getTime()<en&&oneri.setTime(oneri.getTime()+36e5);const l=m.
events??[];return`<section class="kart" id="mekanim-etkinlik"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Etkinlikler")}</p><h2 class="b2">${\u00E7("Mek\xE2n\u0131n etkinlikleri")}</h2></\
div><span class="ik-kutu">${ikon("calendar")}</span></div>
        ${l.length?`<div class="liste">${l.map(e=>`<div class="liste-satir" data-etkinlik="${esc(e.event_id)}"><span class="liste-ikon ${e.status==="live"?"mercan":"altin"}">${ikon(MEKAN_ETKINLIK_IK[e.
kind]??"calendar")}</span>
            <div><span class="tur">${esc(saatYaz(e.starts_at))}</span><b>${esc(MEKAN_ETKINLIK[e.kind]??e.kind)}</b><div class="alt">${esc([MEKAN_ETKINLIK_DURUM[e.status]??e.status,Number(e.interested)?
\u00E7("{n} ki\u015Fi ilgileniyor",{n:sayi(e.interested)}):null,e.status==="ended"?\u00E7("{n} ki\u015Fi kat\u0131ld\u0131",{n:sayi(e.attendees??0)}):null].filter(Boolean).join(" \xB7 "))}</div></div>\

            ${e.status==="scheduled"||e.status==="live"?`<button class="dugme sade kucuk-d" data-etkinlik-iptal="${esc(e.event_id)}">${ikon("x")}${\u00E7("\u0130ptal et")}</button>`:"<span></span>"}</\
div>`).join("")}</div>`:`<p class="bos">${\u00E7("Hen\xFCz etkinlik yok.")}</p>`}
        ${v.status==="open"?`<form class="form" data-mekanim-etkinlik novalidate style="margin-top:12px">
          <label class="alan"><span>${\u00E7("T\xFCr")}</span><select name="tur">${(E.kinds??Object.keys(MEKAN_ETKINLIK)).map(k=>`<option value="${esc(k)}">${esc(MEKAN_ETKINLIK[k]??k)}</option>`).join(
"")}</select></label>
          <label class="alan"><span>${\u00E7("Ba\u015Flang\u0131\xE7")}</span><input name="zaman" type="datetime-local" required min="${yerel(en)}" max="${yerel(son)}" value="${yerel(oneri)}"></label>\

          <fieldset class="alan"><legend>${\u00E7("S\xFCre")}</legend><div class="radyo-liste birlik-yatay">${(E.hours??[1,2,3]).map((h,i)=>`<label class="radyo"><input type="radio" name="saat" value=\
"${Number(h)}" ${i===1||(E.hours??[]).length===1?"checked":""}><span><b>${esc(\u00E7("{n} saat",{n:Number(h)}))}</b></span></label>`).join("")}</div></fieldset>
          <p class="kucuk">${esc(\u00E7("En erken {d} dakika, en ge\xE7 {g} g\xFCn sonra; mek\xE2nda g\xFCnde bir etkinlik, en \xE7ok {n} yakla\u015Fan. \u0130lgilenenlere ba\u015Flarken haber gider; etkinlik g\xFCn\xFC daha \xE7ok m\xFC\u015Fteri\
 gelir.",{d:Number(E.leadMin??30),g:Number(E.horizonDays??7),n:Number(E.upcomingMax??5)}))}</p>
          <button class="dugme kucuk-d" type="submit">${ikon("calendar")}${\u00E7("Etkinlik a\xE7")}</button><div class="form-mesaj"></div></form>`:""}</section>`}function yoneticiHtml(m,sahibi){const l=m.
managers??[],enCok=Number(m.managers_max??2),adaylar=(ark??[]).filter(x=>!l.some(y=>y.character_id===x.character_id));return`<section class="kart" id="mekanim-yonetici"><div class="kart-bas"><div><p c\
lass="ust-yazi">${\u00E7("Y\xF6neticiler")}</p><h2 class="b2">${esc(\u00E7("{n} / {m} y\xF6netici",{n:l.length,m:enCok}))}</h2></div><span class="ik-kutu">${ikon("key-round")}</span></div>
        ${l.length?`<div class="koltuk-liste">${l.map(x=>`<div class="koltuk">${avatarKutu(x.name,x.character_id)}<div><button class="baglanti" data-profil="${esc(x.character_id)}"><b>${esc(x.name)}</\
b></button>
            <div class="kucuk">${esc(beriYaz(x.added_at))}</div></div>${sahibi?`<button class="dugme sade kucuk-d" data-yonetici-cikar="${esc(x.character_id)}">${\u00E7("G\xF6revden al")}</button>`:"<\
span></span>"}</div>`).join("")}</div>`:`<p class="bos">${\u00E7("Y\xF6neticin yok.")}</p>`}
        ${sahibi&&l.length<enCok?adaylar.length?`<div class="form mekanim-form" data-mekanim-yonetici style="margin-top:10px"><label class="alan"><span>${\u00E7("Arkada\u015Flar\u0131ndan ekle")}</spa\
n>
            <select name="kisi">${adaylar.map(x=>`<option value="${esc(x.character_id)}">${esc(x.name)}</option>`).join("")}</select></label>
            <button class="dugme kucuk-d" type="button" data-yonetici-ekle>${ikon("user-round-plus")}${\u00E7("Y\xF6netici yap")}</button></div>`:`<p class="kucuk">${\u00E7("Y\xF6netici yaln\u0131z arkada\u015Flar\
\u0131ndan olur; \xF6nce arkada\u015F ekle.")}</p>`:""}
        <p class="kucuk">${\u00E7("Y\xF6netici fiyatlar\u0131, dekoru, tezg\xE2h\u0131 ve etkinlikleri d\xFCzenler, i\xE7eridekileri \xE7\u0131karabilir; kasaya dokunmaz, mek\xE2n\u0131 kapatmaz. \u0130\xE7eride bulunmas\u0131 o g\xFCn\xFC i\u015Fletilmi\u015F sayar.")}\
</p></section>`}function adHtml(v2){const N=R().name??{min:3,max:40,renameDays:30},hazir=v2.name_reset||!v2.can_rename_at||Date.parse(v2.can_rename_at)<=Date.now();return`<section class="kart" id="mek\
anim-adi"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ad")}</p><h2 class="b2">${esc(v2.name)}</h2></div><span class="ik-kutu">${ikon("id-card")}</span></div>
        ${hazir?`<form class="form" data-mekanim-ad novalidate><label class="alan"><span>${\u00E7("Yeni ad")}</span><input name="ad" required minlength="${Number(N.min)}" maxlength="${Number(N.max)}" \
autocomplete="off" value="${esc(v2.name_reset?"":v2.name)}"></label>
            <button class="dugme kucuk-d" type="submit">${ikon("check")}${\u00E7("Ad\u0131 de\u011Fi\u015Ftir")}</button><div class="form-mesaj"></div></form>
            <p class="kucuk">${esc(\u00E7("Ad {g} g\xFCnde bir de\u011Fi\u015Ftirilir.",{g:Number(N.renameDays??30)}))}</p>`:`<p class="kucuk">${esc(\u00E7("Ad {zaman} tarihinden sonra de\u011Fi\u015Ftirilebili\
r ({g} g\xFCnde bir).",{zaman:saatYaz(v2.can_rename_at),g:Number(N.renameDays??30)}))}</p>`}</section>`}const kapatHtml=()=>`<section class="kart mekanim-tehlike" id="mekanim-kapat-kart"><p class="ust\
-yazi">${\u00E7("Mek\xE2n\u0131 kapat")}</p>
      <p class="kucuk">${\u00E7("Kapat\u0131nca ruhsat geri verilmez. Kasadaki kredi ve tezg\xE2htaki erzak sana d\xF6ner; konuklar\u0131n kalan geceleri kendilerine d\xF6ner, bekleyen konser ve etkinlikler iptal olur.")}\
</p>
      <button class="dugme mercan kucuk-d" id="mekanim-kapat">${ikon("x")}${\u00E7("Mek\xE2n\u0131 kapat")}</button></section>`,kartAl=y=>{y?.venue_id&&(v={...v,...y})};function bagla(){meydanaDonBagla(
kap);for(const b of $$("[data-mekan-git]",kap))b.onclick=()=>MekanYolu.git(b.dataset.mekanGit);$("#mekanim-dekor",kap)?.addEventListener("click",()=>MekanYolu.git(v.venue_id,"main",{duzenle:!0})),$("#\
mekanim-liste",kap)?.addEventListener("click",()=>Kabuk.git("sehir/mekanlar"));for(const b of $$("[data-mekanim-sec]",kap))b.onclick=()=>{id=b.dataset.mekanimSec,v=(r.mine??[]).find(x=>x.venue_id===id)??
v,yazilan.clear(),ciz()};for(const b of $$("[data-profil]",kap))b.onclick=()=>profilAc(b.dataset.profil,tazele);$("#mekanim-ac-yeniden",kap)?.addEventListener("click",e=>mekanIsle(e.currentTarget,async()=>{
kartAl(await MekanYolu.yenidenAc(v.venue_id)),tost(\u00E7("Bor\xE7 \xF6dendi; mek\xE2n yeniden a\xE7\u0131k."),"door-open"),await tazele()}));const kasa=$("[data-mekanim-kasa]",kap);for(const b of $$(
"[data-kasa]",kasa??kap))b.onclick=()=>mekanIsle(b,async()=>{const t=krediAlt($("input[name=tutar]",kasa)?.value);if(!Number.isFinite(t)||t<=0){tost(\u00E7("Tutar\u0131 kredi olarak yaz (\xF6r. 25 ya da 12,50\
)."),"circle-alert");return}kartAl(await MekanYolu.kasa(v.venue_id,b.dataset.kasa==="koy"?t:-t)),tost(b.dataset.kasa==="koy"?\u00E7("Kasaya {kr} kredi koydun.",{kr:kr(t)}):\u00E7("Kasadan {kr} kredi \xE7\
ektin.",{kr:kr(t)}),"wallet"),Durum.ozet().catch(()=>{}),yazilaniUnut("data-mekanim-kasa"),ciz()});const tz=$("[data-mekanim-tezgah]",kap);for(const b of $$("[data-tezgah]",tz??kap))b.onclick=()=>mekanIsle(
b,async()=>{const n=adetAl($("input[name=adet]",tz)?.value);if(!Number.isFinite(n)||n<=0){tost(\u00E7("Adedi tam say\u0131 olarak yaz."),"circle-alert");return}kartAl(await MekanYolu.tezgah(v.venue_id,
b.dataset.tezgah==="koy"?n:-n)),tost(b.dataset.tezgah==="koy"?\u00E7("Tezg\xE2ha {n} erzak koydun.",{n}):\u00E7("Tezg\xE2htan {n} erzak ald\u0131n.",{n}),"croissant"),Durum.ozet().catch(()=>{}),yazilaniUnut(
"data-mekanim-tezgah"),ciz()});const ff=$("[data-mekanim-fiyat]",kap);ff?.addEventListener("submit",async e=>{e.preventDefault();const yaz=m=>{$(".form-mesaj",ff).innerHTML=m?`<div class="hata-kutusu"\
 style="margin-top:10px">${ikon("circle-alert")}<span>${esc(m)}</span></div>`:""},yeni={};for(const x of v.menu??[]){const f=krediAlt($(`input[name="${x.item}"]`,ff)?.value);if(!Number.isFinite(f)){yaz(
\u00E7("{kalem}: fiyat\u0131 kredi olarak yaz (\xF6r. 1 ya da 1,50).",{kalem:menuAdi(x.item)})),formSerbest(ff);return}if(f<Number(x.min)||f>Number(x.max)){yaz(\u00E7("{kalem}: fiyat {a}\u2013{b} kredi ara\
s\u0131nda olur.",{kalem:menuAdi(x.item),a:kr(x.min),b:kr(x.max)})),formSerbest(ff);return}f!==Number(x.price)&&(yeni[x.item]=f)}if(!Object.keys(yeni).length){yaz(""),tost(\u00E7("Fiyatlarda de\u011Fi\u015Fikli\
k yok."),"receipt-text"),formSerbest(ff);return}const d=$("button[type=submit]",ff);d.disabled=!0;try{kartAl(await MekanYolu.fiyatlar(v.venue_id,yeni)),tost(\u00E7("Fiyatlar kaydedildi."),"receipt-tex\
t"),yazilaniUnut("data-mekanim-fiyat"),ciz()}catch(err){yaz(hataMetni(err)),d.disabled=!1}finally{formSerbest(ff)}}),$("#mekanim-yemek-koy",kap)?.addEventListener("click",()=>mekanYemekPenceresi({kural:v.
meal_rule,mekanlar:[v],kiler:v.manage?.pantry,sonra:async y=>{kartAl(y),await tazele()}})),$("[data-git-hobi]",kap)?.addEventListener("click",()=>Kabuk.git("hayat/hobiler"));const yemekBul=id2=>(v.manage?.
meals_all??[]).find(x=>Number(x.meal_id)===Number(id2));for(const b of $$("[data-mekanim-yemek-fiyat]",kap))b.onclick=()=>{const x=yemekBul(b.dataset.mekanimYemekFiyat);x&&mekanYemekFiyatPenceresi(x,v.
meal_rule,async y=>{kartAl(y),await tazele()})};for(const b of $$("[data-mekanim-yemek-geri]",kap))b.onclick=()=>mekanIsle(b,async()=>{const y=await MekanYolu.yemekGeri(Number(b.dataset.mekanimYemekGeri));
tost(\u00E7("{n} tabak {yemek} men\xFCden kalkt\u0131; koyan\u0131n kilerine d\xF6nd\xFC.",{n:sayi(y?.returned??0),yemek:yemekAdi(y?.meal?.recipe)}),"undo-2"),kartAl(y),await tazele()});const fa=$("[d\
ata-mekanim-ayar]",kap);fa?.addEventListener("submit",async e=>{e.preventDefault();const yaz=m=>{$(".form-mesaj",fa).innerHTML=m?`<div class="hata-kutusu" style="margin-top:10px">${ikon("circle-alert")}\
<span>${esc(m)}</span></div>`:""},fd=new FormData(fa),Rr=R(),a={door:String(fd.get("kapi")??v.door)};if(v.kind==="kulup"){a.style=String(fd.get("tarz")??v.style);const k=krediAlt(fd.get("kira")),b=Rr.
club?.concert?.rentCr??{};if(!Number.isFinite(k)||k<Number(b.min??0)||k>Number(b.max??1/0)){yaz(\u00E7("Konser kiras\u0131 {a}\u2013{b} kredi aras\u0131nda olur.",{a:kr(b.min??0),b:kr(b.max??0)})),formSerbest(
fa);return}a.rent=k}if(v.kind==="otel"){const g=krediAlt(fd.get("gece")),b=Rr.hotel?.nightCr??{};if(!Number.isFinite(g)||g<Number(b.min??0)||g>Number(b.max??1/0)){yaz(\u00E7("Gecelik fiyat {a}\u2013{b} kre\
di aras\u0131nda olur.",{a:kr(b.min??0),b:kr(b.max??0)})),formSerbest(fa);return}a.night=g}let ucretYeni=null;if(v.kind==="studyo"){const u=krediAlt(fd.get("ucret")),b=Rr.studio?.feeCr??{};if(!Number.
isFinite(u)||u<Number(b.min??0)||u>Number(b.max??1/0)){yaz(\u00E7("Kay\u0131t \xFCcreti {a}\u2013{b} kredi aras\u0131nda olur.",{a:kr(b.min??0),b:kr(b.max??0)})),formSerbest(fa);return}u!==Number(v.record_fee_cr??
b.default??0)&&(ucretYeni=u)}const d=$("button[type=submit]",fa);d.disabled=!0;try{let kart=await MekanYolu.ayar(v.venue_id,a);ucretYeni!==null&&(kart=await MekanYolu.kayitUcreti(v.venue_id,ucretYeni)),
kartAl(kart),tost(\u00E7("Ayarlar kaydedildi."),"door-open"),yazilaniUnut("data-mekanim-ayar"),ciz()}catch(err){yaz(hataMetni(err)),d.disabled=!1}finally{formSerbest(fa)}});const fs=$("[data-mekanim-s\
ahne]",kap);fs?.addEventListener("submit",async e=>{e.preventDefault();const yaz=m=>{$(".form-mesaj",fs).innerHTML=m?`<div class="hata-kutusu" style="margin-top:10px">${ikon("circle-alert")}<span>${esc(
m)}</span></div>`:""},k=String(new FormData(fs).get("sahne_kapi")??""),d=$("button[type=submit]",fs);d.disabled=!0;try{kartAl(await MekanYolu.sahneKapi(v.venue_id,k)),tost(\u00E7("Sahnenin kap\u0131s\u0131 kayd\
edildi."),"headphones"),yazilaniUnut("data-mekanim-sahne"),ciz()}catch(err){yaz(hataMetni(err)),d.disabled=!1}finally{formSerbest(fs)}});for(const b of $$("[data-sahne-bitir]",kap))b.onclick=()=>{pencere(
{ust:\u00E7("Sahne"),baslik:\u00E7("Set bitsin mi?"),govde:`<p class="aciklama">${\u00E7("Sahnedekilerin seti biter; o ana dek gelen dinleyicilerin \xFCn\xFC verilir.")}</p>`,dugmeler:[{ad:\u00E7("Vaz\
ge\xE7")},{ad:\u00E7("Seti bitir"),sinif:"mercan",ikon:"x",is:()=>mekanIsle(null,async()=>{const j=await MekanYolu.sahneBitir(v.venue_id);tost(\u00E7("Set bitti: {n} dinleyici, {m} alk\u0131\u015F.",{
n:sayi(j?.ended?.listeners??0),m:sayi(j?.ended?.applause??0)}),"headphones"),await tazele()})}]})};for(const b of $$("[data-etkinlik-iptal]",kap))b.onclick=()=>{const e=(v.manage?.events??[]).find(x=>x.
event_id===b.dataset.etkinlikIptal);pencere({ust:\u00E7("Etkinlik"),baslik:\u00E7("{tur} iptal edilsin mi?",{tur:MEKAN_ETKINLIK[e?.kind]??""}),govde:`<p class="aciklama">${\u00E7("\u0130lgilenenlere iptal \
haberi gider.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\u0130ptal et"),sinif:"mercan",ikon:"x",is:()=>mekanIsle(null,async()=>{await MekanYolu.etkinlikIptal(b.dataset.etkinlikIptal),tost(
\u00E7("Etkinlik iptal edildi."),"x"),await tazele()})}]})};const fe=$("[data-mekanim-etkinlik]",kap);fe?.addEventListener("submit",async e=>{e.preventDefault();const yaz=m=>{$(".form-mesaj",fe).innerHTML=
m?`<div class="hata-kutusu" style="margin-top:10px">${ikon("circle-alert")}<span>${esc(m)}</span></div>`:""},fd=new FormData(fe),z=new Date(String(fd.get("zaman")??""));if(Number.isNaN(z.getTime())){yaz(
\u00E7("Ba\u015Flang\u0131\xE7 zaman\u0131n\u0131 se\xE7.")),formSerbest(fe);return}const d=$("button[type=submit]",fe);d.disabled=!0;try{await MekanYolu.etkinlikAc(v.venue_id,String(fd.get("tur")),z.
toISOString(),Number(fd.get("saat"))),tost(\u00E7("Etkinlik a\xE7\u0131ld\u0131: {tur}, {zaman}.",{tur:MEKAN_ETKINLIK[String(fd.get("tur"))]??"",zaman:saatYaz(z.toISOString())}),"calendar"),yazilaniUnut(
"data-mekanim-etkinlik"),await tazele()}catch(err){yaz(hataMetni(err)),d.disabled=!1}finally{formSerbest(fe)}});const fy=$("[data-mekanim-yonetici]",kap);$("[data-yonetici-ekle]",fy??kap)?.addEventListener(
"click",e=>mekanIsle(e.currentTarget,async()=>{const k=$("select[name=kisi]",fy)?.value;k&&(kartAl(await MekanYolu.yonetici(v.venue_id,k,!0)),tost(\u00E7("Y\xF6netici eklendi."),"key-round"),yazilaniUnut(
"data-mekanim-yonetici"),ciz())}));for(const b of $$("[data-yonetici-cikar]",kap))b.onclick=()=>mekanIsle(b,async()=>{kartAl(await MekanYolu.yonetici(v.venue_id,b.dataset.yoneticiCikar,!1)),tost(\u00E7(
"Y\xF6neticilikten \xE7\u0131kar\u0131ld\u0131."),"key-round"),ciz()});const fd2=$("[data-mekanim-ad]",kap);fd2?.addEventListener("submit",async e=>{e.preventDefault();const N=R().name??{min:3,max:40},
yaz=m=>{$(".form-mesaj",fd2).innerHTML=m?`<div class="hata-kutusu" style="margin-top:10px">${ikon("circle-alert")}<span>${esc(m)}</span></div>`:""},ad=String(new FormData(fd2).get("ad")??"").trim().replace(
/\s+/g," ");if(ad.length<Number(N.min)||ad.length>Number(N.max)){yaz(\u00E7("Mek\xE2n\u0131n ad\u0131 {a}\u2013{b} harf olmal\u0131.",{a:Number(N.min),b:Number(N.max)})),formSerbest(fd2);return}const d=$(
"button[type=submit]",fd2);d.disabled=!0;try{kartAl(await MekanYolu.adDegistir(v.venue_id,ad)),tost(\u00E7("Mek\xE2n\u0131n ad\u0131 de\u011Fi\u015Fti: {ad}.",{ad}),"id-card"),yazilaniUnut("data-mekan\
im-ad"),await tazele()}catch(err){yaz(hataMetni(err)),d.disabled=!1}finally{formSerbest(fd2)}}),$("#mekanim-kapat",kap)?.addEventListener("click",()=>{pencere({ust:\u00E7("Mek\xE2n\u0131 kapat"),baslik:v.
name,govde:`<p class="aciklama">${\u00E7("Mek\xE2n kapan\u0131r ve geri a\xE7\u0131lmaz; ruhsat geri verilmez. Kasadaki kredi ve tezg\xE2htaki erzak sana d\xF6ner.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},
{ad:\u00E7("Kapat"),sinif:"mercan",ikon:"x",is:()=>mekanIsle(null,async()=>{await MekanYolu.kapat(v.venue_id),tost(\u00E7("Mek\xE2n\u0131n kapand\u0131: {ad}.",{ad:v.name}),"x"),Durum.ozet().catch(()=>{});
try{sessionStorage.removeItem("civora.mekanim")}catch{}Kabuk.git("sehir/mekanlar")})}]})})}const tazele=tazeleyici(async()=>{await yukle(),ciz()}),arkaTazele=tazeleyici(async()=>{if(await yukle(),kirli){
bekleyen=!0;return}ciz()});await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^venue\./.test(olay)&&tazeleIste()}),saat=setInterval(()=>{!document.hidden&&!$(":focus",kap)&&tazeleIste()},6e4);
return()=>{b1(),clearInterval(saat),kap.removeEventListener("input",degisti),kap.removeEventListener("change",degisti)}}}),Parcalar.tamam("ek_98zg_mekan");
