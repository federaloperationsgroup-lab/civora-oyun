// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_98r_magaza.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/magaza",{async ac(kap){let v=null,l=null,tur="cerceve",suzgec="hepsi",hedefUrun=null,kapandi=!1,mesgul=!1;try{const s=JSON.parse(sessionStorage.getItem("civora.magaza")??"null");sessionStorage.
removeItem("civora.magaza"),s&&MAGAZA_TURLER.some(([k])=>k===s.tur)&&(tur=s.tur,hedefUrun=typeof s.urun=="string"?s.urun:null)}catch{}async function yukle(){const[s,m]=await Promise.all([Sunucu.cagir(
"store_view"),Sunucu.cagir("my_look"),Durum.kurallar()]);v=s,l=m,v.pass?.pending>0&&(v=await Sunucu.yap("store_sync"))}const urunler=()=>v.products??[],urun=id=>urunler().find(p=>p.id===id)??null,gorunus=()=>l?.
look??varsayilanGorunus(l?.name??""),ek=()=>({ulke:l?.country_id,rutbe:l?.rank}),yuvasi=p=>Object.keys(MAGAZA_YUVALAR).find(k=>MAGAZA_YUVALAR[k]===p.kind)??null,turu=p=>MAGAZA_TURLER.find(t=>t[1]===p.
kind)?.[0]??null,kullanilir=p=>p.owned||p.free,vitrinde=p=>(v.showcase?.products??[]).includes(p.id),onizleme=(p,kucuk=!1)=>{const svg=magazaOnizlemeSvg(p);if(svg)return`<span class="magaza-resim${kucuk?
" kucuk-o":""}">${svg}</span>`;const y=yuvasi(p),g={...gorunus(),...p.kind==="uniform"?{kiyafet:"uniforma",giysi:null}:{},urunler:{...gorunus().urunler??{},...y?{[y]:p.id}:{}}};return`<span class="ava\
tar magaza-onizleme${kucuk?" kucuk-o":""}">${avatarSvg(l?.name??"",g,ek())}</span>`},giyili=p=>{const y=yuvasi(p);return!!y&&gorunus().urunler?.[y]===p.id},fiyatYazisi=p=>{if(p.owned)return"";if(p.free)
return \u00E7("Herkese a\xE7\u0131k");if(p.priceHonor!=null)return \u00E7("{n} \u015Feref puan\u0131",{n:p.priceHonor});if(p.id===v.gift?.product)return \u00E7("A\xE7\u0131l\u0131\u015F hediyesi");const odul=(v.
pass?.rewards??[]).find(r=>r.product===p.id);if(odul)return odul.track==="premium"?\u00E7("Sezon kart\u0131 \xB7 se\xE7kin yol, {n}. seviye",{n:odul.level}):\u00E7("Sezon kart\u0131 \xB7 {n}. seviye",
{n:odul.level});const kurucu=(v.founder?.tiers??[]).find(t=>t.products.includes(p.id));return kurucu?\u00E7v(kurucu.name):p.priceTry!=null?v.sales_open?tlYaz(p.priceTry):\u00E7("{tl} (sat\u0131\u015F a\xE7\u0131l\u0131nca)",
{tl:tlYaz(p.priceTry)}):\u00E7("Sat\u0131\u015Fta de\u011Fil")};kap.innerHTML=`<div class="sayfa">
      <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m")}</p><h1 class="b1">${\u00E7("Ma\u011Faza")}</h1>
        <p class="aciklama">${\u00E7("G\xF6r\xFCn\xFCm s\xFCsleri: \xE7er\xE7eve, zemin, kuma\u015F, \u015Fapka, g\xF6zl\xFCk, \xFCniforma, silah g\xF6r\xFCn\xFCm\xFC, vuru\u015F efekti, sahne temas\u0131, amblem, \xE7\u0131kartma ve ev e\u015Fyas\u0131. Hi\xE7bir \xFCr\xFCn g\xFC\xE7, gelir\
 ya da oy vermez; s\xFCrpriz kutu yok. Pilotta sat\u0131\u015F kapal\u0131: \xFCr\xFCnler \u015Feref puan\u0131 ve sezon kart\u0131yla al\u0131n\u0131r.")}</p></div></div>
      <div class="magaza-ust" id="magaza-ust"></div>
      <section class="kart" id="magaza-vitrin" style="margin-bottom:20px"></section>
      <section class="kart" id="magaza-katalog"></section>
      <section class="kart" id="magaza-sezon" style="margin-top:20px"></section>
      <section class="kart" id="magaza-kurucu" style="margin-top:20px"></section>
      <section class="kart" id="magaza-haklar" style="margin-top:20px"></section>
    </div>`;function ustCiz(){const h=v.honor??{earned:0,balance:0},hediye=v.gift?.product?urun(v.gift.product):null,p=v.pass,seviyeYuzde=p?Math.min(100,Math.round((p.points-p.level*p.points_per_level)/
p.points_per_level*100)):0,sonraki=p?(p.rewards??[]).find(r=>r.level>p.level&&(r.track==="free"||p.premium)):null;$("#magaza-ust",kap).innerHTML=`
        <section class="kart magaza-kart">
          <p class="ust-yazi">${ikon("medal")}${\u00E7("\u015Eeref puan\u0131")}</p>
          <p class="magaza-sayi">${sayi(h.balance)}</p>
          <p class="kucuk">${\u00E7("Madalya basamaklar\u0131ndan {n} puan kazand\u0131n (bronz {b}, g\xFCm\xFC\u015F {g}, alt\u0131n {a}; ni\u015Fan {r}). Sezon kart\u0131 da puan verir.",{n:sayi(h.earned),
b:h.tiers?.[0]??50,g:h.tiers?.[1]??100,a:h.tiers?.[2]??200,r:h.badge??100})}</p>
          <a class="dugme sade kucuk-d" href="#hayat/profil">${ikon("trophy")}${\u00E7("Vitrinim")}</a>
        </section>
        <section class="kart magaza-kart">
          <p class="ust-yazi">${ikon("gift")}${\u00E7("A\xE7\u0131l\u0131\u015F hediyesi")}</p>
          ${hediye?`<div class="magaza-hediye">${onizleme(hediye)}
            <div><b>${esc(\u00E7v(hediye.name))}</b><p class="kucuk">${v.gift.taken?\u00E7("Ald\u0131n; G\xF6r\xFCn\xFCm'den takabilirsin."):\u00E7("Her hesaba bir kez, bedelsiz.")}</p></div></div>
            <button type="button" class="dugme ${v.gift.taken?"sade":"altin"} kucuk-d" id="magaza-hediye-al" ${v.gift.taken||mesgul?"disabled":""}>${ikon(v.gift.taken?"check":"gift")}${v.gift.taken?\u00E7(
"Al\u0131nd\u0131"):\u00E7("Hediyeyi al")}</button>`:`<p class="kucuk">${\u00E7("Hediye tan\u0131ml\u0131 de\u011Fil.")}</p>`}
        </section>
        <section class="kart magaza-kart">
          <p class="ust-yazi">${ikon("ticket")}${\u00E7("Sezon kart\u0131")}</p>
          ${p?`<div class="satir" style="justify-content:space-between"><b>${\u00E7("{n}. sezon",{n:p.season})}</b><span class="cip ${p.premium?"altin":""}">${p.premium?\u00E7("Se\xE7kin yol"):\u00E7(
"\xDCcretsiz yol")}</span></div>
            <p class="magaza-sayi">${\u00E7("{n}. seviye",{n:p.level})}</p>
            <div class="cubuk altin" aria-hidden="true"><i style="width:${p.level>=p.levels?100:seviyeYuzde}%"></i></div>
            <p class="kucuk">${\u00E7("{g} etkin g\xFCn \xB7 {p} puan \xB7 her etkin g\xFCn {e} puan, {s} puanda bir seviye (en \xE7ok {m}).",{g:p.active_days,p:sayi(p.points),e:p.active_day_points,s:p.
points_per_level,m:p.levels})}
              ${sonraki?" "+\u00E7("S\u0131radaki \xF6d\xFCl {n}. seviyede: {o}.",{n:sonraki.level,o:sonraki.product?\u00E7v(urun(sonraki.product)?.name??sonraki.product):\u00E7("{n} \u015Feref puan\u0131",
{n:sonraki.honor})}):""}</p>
            <div class="satir"><a class="dugme sade kucuk-d" href="#magaza-sezon-odulleri" data-git="magaza-sezon">${ikon("gift")}${\u00E7("\xD6d\xFCller")}</a>
              ${p.pending>0?`<button type="button" class="dugme altin kucuk-d" id="magaza-esle">${ikon("sparkles")}${\u00E7("\xD6d\xFClleri al ({n})",{n:p.pending})}</button>`:""}</div>`:`<p class="ku\
cuk">${\u00E7("Sezon kart\u0131 ilk sezonla (27 Ekim 2026) ba\u015Flar: her etkin g\xFCn puan, puanlar seviye, seviyeler \xF6d\xFCl verir.")}</p>`}
        </section>`,$("#magaza-hediye-al",kap)?.addEventListener("click",()=>al(v.gift.product)),$("#magaza-esle",kap)?.addEventListener("click",esle),$("[data-git='magaza-sezon']",kap)?.addEventListener(
"click",e=>{e.preventDefault(),$("#magaza-sezon",kap).scrollIntoView({behavior:"smooth",block:"start"})})}function vitrinCiz(){const s=v.showcase,kutu=$("#magaza-vitrin",kap),liste=(s?.products??[]).map(
urun).filter(Boolean);if(!liste.length){kutu.hidden=!0;return}kutu.hidden=!1,kutu.innerHTML=`<div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Haftal\u0131k vitrin")}</p><h2 class="b2">${\u00E7(
"Bu haftan\u0131n \xFCr\xFCnleri")}</h2></div>
          <span class="cip" id="magaza-vitrin-sayac">${\u00E7("Yeni vitrin: {zaman}",{zaman:esc(new Date(s.next_at).toLocaleString(DIL.yerel,{weekday:"long",hour:"2-digit",minute:"2-digit"}))})}</span\
></div>
        <p class="kucuk">${\u00E7("Her Pazartesi sekiz \xFCr\xFCn \xF6ne \xE7\u0131kar; fiyatlar ayn\u0131d\u0131r, indirim ya da s\xFCrpriz kutu yoktur.")}</p>
        <div class="magaza-vitrin">${liste.map(p=>`<button type="button" class="magaza-vitrin-urun ${kullanilir(p)?"sende":""}" data-vitrin="${esc(p.id)}">
            ${onizleme(p)}<b>${esc(\u00E7v(p.name))}</b><span class="kucuk">${esc(MAGAZA_TURLER.find(t=>t[1]===p.kind)?.[2]??"")}</span>
            <span class="kucuk">${kullanilir(p)?`${ikon("check")}${\u00E7("Sende")}`:esc(fiyatYazisi(p))}</span></button>`).join("")}</div>`;for(const b of $$("[data-vitrin]",kutu))b.onclick=()=>{const p=urun(
b.dataset.vitrin);p&&(tur=turu(p),suzgec="hepsi",hedefUrun=p.id,katalogCiz())}}function urunDugmeleri(p){const u=v.uses??{},bakiye=v.honor?.balance??0,l2=[];if(!p.owned&&!p.free&&p.priceHonor!=null){const yeter=bakiye>=
p.priceHonor;l2.push(`<button type="button" class="dugme ${yeter?"altin":"ikincil"} kucuk-d" data-al="${esc(p.id)}" ${yeter&&!mesgul?"":"disabled"} title="${yeter?"":esc(\u00E7("\u015Eeref puan\u0131n yetmiyor"))}\
">${ikon("medal")}${\u00E7("Al")}</button>`)}const y=yuvasi(p);p.owned&&y&&l2.push(giyili(p)?`<button type="button" class="dugme sade kucuk-d" data-cikar="${esc(p.id)}" ${mesgul?"disabled":""}>${ikon(
"undo-2")}${\u00E7("\xC7\u0131kar")}</button>`:`<button type="button" class="dugme ikincil kucuk-d" data-giy="${esc(p.id)}" ${mesgul?"disabled":""}>${ikon("shirt")}${\u00E7("Tak")}</button>`);const tak=(hedef,ad,ik)=>{
const h=u[hedef];if(!h?.can)return"";const takili=h.product===p.id;return`<button type="button" class="dugme ${takili?"sade":"ikincil"} kucuk-d" data-kullan="${hedef}|${takili?"":esc(p.id)}" ${mesgul?
"disabled":""}>${ikon(takili?"undo-2":ik)}${takili?\u00E7("{yer}: \xE7\u0131kar",{yer:ad}):\u00E7("{yer}: tak",{yer:ad})}</button>`};if(p.owned&&p.kind==="stage"&&l2.push(tak("band",\u00E7("Sahne"),"d\
rama")),p.owned&&p.kind==="emblem"&&l2.push(tak("party",\u00E7("Parti"),"users-round"),tak("unit",\u00E7("Birlik"),"shield")),p.owned&&MAGAZA_KULUP_HEDEF[p.kind]&&l2.push(tak(MAGAZA_KULUP_HEDEF[p.kind],
\u00E7("Kul\xFCp"),"shield")),p.kind==="anthem"){const calan=typeof Ezgi=="object"&&Ezgi.calan==="mars:"+p.id;l2.push(`<button type="button" class="dugme sade kucuk-d" data-mars-dinle="${esc(p.id)}" a\
ria-pressed="${calan}">${ikon(calan?"pause":"play")}${calan?\u00E7("Durdur"):\u00E7("Dinle")}</button>`)}return p.kind==="furniture"&&l2.push(p.owned?`<button type="button" class="dugme ikincil kucuk-\
d" data-evim="${esc(p.id)}">${ikon("house")}${\u00E7("Evimde yerle\u015Ftir")}</button>`:`<button type="button" class="dugme sade kucuk-d" data-evim="${esc(p.id)}">${ikon("eye")}${\u00E7("Odada dene")}\
</button>`),l2.filter(Boolean).join("")}function kullanimNotu(p){const u=v.uses??{},yerler=[];p.kind==="stage"&&u.band?.product===p.id&&yerler.push(\u00E7("{ad} grubunun sahnesinde",{ad:u.band.name})),
p.kind==="emblem"&&u.party?.product===p.id&&yerler.push(\u00E7("{ad} partisinde",{ad:u.party.name})),p.kind==="emblem"&&u.unit?.product===p.id&&yerler.push(\u00E7("{ad} birli\u011Finde",{ad:u.unit.name}));
const kh=MAGAZA_KULUP_HEDEF[p.kind];return kh&&u[kh]?.product===p.id&&yerler.push(\u00E7("{ad} kul\xFCb\xFCnde",{ad:u[kh].name})),yerler.length?yerler.join(" \xB7 "):p.owned&&p.kind==="stage"&&!u.band?.
can?u.band?\u00E7("Sahne temas\u0131n\u0131 grubun y\xF6neticisi takar."):\u00E7("Bir m\xFCzik grubunun y\xF6neticisi olunca takars\u0131n."):p.owned&&p.kind==="emblem"&&!u.party?.can&&!u.unit?.can?\u00E7(
"Amblemi parti ba\u015Fkan\u0131 ya da birlik lideri takar."):p.owned&&kh&&!u[kh]?.can?u[kh]?\u00E7("Kul\xFCb\xFCn g\xF6r\xFCn\xFCm\xFCn\xFC ba\u015Fkan takar."):\u00E7("Bir kul\xFCb\xFCn ba\u015Fkan\u0131 olunca tak\
ars\u0131n."):MAGAZA_KULLANIM[p.kind]??""}function katalogCiz(){const liste=urunler().filter(p=>p.kind===(MAGAZA_TURLER.find(t=>t[0]===tur)?.[1]??"frame")).filter(p=>suzgec==="hepsi"||suzgec==="vitrin"&&
vitrinde(p)||suzgec==="sezon"&&p.season!=null),sezonlar=[...new Set(urunler().map(p=>p.season).filter(x=>x!=null))].sort((a,b)=>b-a);$("#magaza-katalog",kap).innerHTML=`
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Katalog")}</p><h2 class="b2">${\u00E7("\xDCr\xFCnler")}</h2></div>
          <span class="cip">${\u00E7("{n} \xFCr\xFCn",{n:urunler().length})} \xB7 ${v.sales_open?\u00E7("Sat\u0131\u015F a\xE7\u0131k"):\u00E7("Sat\u0131\u015F kapal\u0131 (pilot)")}</span></div>
        <div class="secim-sec magaza-yuvalar" role="tablist" aria-label="${\u00E7("\xDCr\xFCn t\xFCr\xFC")}">${MAGAZA_TURLER.map(([k,t,ad,ik,grup],i)=>{const hepsi=urunler().filter(p=>p.kind===t);return`${grup===
"kulup"&&MAGAZA_TURLER[i-1]?.[4]!=="kulup"?`<span class="magaza-tur-grup" role="presentation">${ikon("shield")}${\u00E7("Kul\xFCp g\xF6r\xFCn\xFCmleri")}</span>`:""}<button type="button" class="secim-\
cip" role="tab" data-tur="${k}" aria-pressed="${k===tur}">${ikon(ik)}${esc(ad)}<span class="kucuk">${hepsi.filter(kullanilir).length}/${hepsi.length}</span></button>`}).join("")}</div>
        <div class="secim-sec magaza-suzgec" role="group" aria-label="${\u00E7("S\xFCzge\xE7")}">
          <button type="button" class="secim-cip" data-suzgec="hepsi" aria-pressed="${suzgec==="hepsi"}">${\u00E7("Hepsi")}</button>
          <button type="button" class="secim-cip" data-suzgec="vitrin" aria-pressed="${suzgec==="vitrin"}">${ikon("store")}${\u00E7("Bu hafta vitrinde")}</button>
          ${sezonlar.length?`<button type="button" class="secim-cip" data-suzgec="sezon" aria-pressed="${suzgec==="sezon"}">${ikon("calendar-days")}${\u00E7("{n}. sezon koleksiyonu",{n:sezonlar[0]})}<\
/button>`:""}
        </div>
        ${liste.length?`<div class="magaza-izgara">${liste.map(p=>`<article class="magaza-urun ${kullanilir(p)?"sende":""}${p.id===hedefUrun?" hedef":""}" data-urun="${esc(p.id)}">
            ${onizleme(p)}
            <div class="magaza-urun-bilgi"><b>${esc(\u00E7v(p.name))}</b>
              <span class="satir" style="gap:4px;flex-wrap:wrap"><span class="cip ${p.rarity==="epic"?"altin":p.rarity==="rare"?"yesil":""}">${esc(MAGAZA_NADIRLIK[p.rarity]??p.rarity)}</span>
                ${p.season!=null?`<span class="cip">${\u00E7("{n}. sezon",{n:p.season})}</span>`:""}${vitrinde(p)?`<span class="cip altin">${\u00E7("Vitrinde")}</span>`:""}</span>
              <span class="kucuk">${p.owned?`${ikon("check")}${\u00E7("Sende")}${giyili(p)?" \xB7 "+\u00E7("tak\u0131l\u0131"):""}`:esc(fiyatYazisi(p))}</span>
              ${!p.owned&&p.priceTry!=null&&p.priceHonor!=null?`<span class="kucuk magaza-tl">${v.sales_open?\u00E7("ya da {tl}",{tl:tlYaz(p.priceTry)}):\u00E7("ya da {tl} (sat\u0131\u015F a\xE7\u0131l\u0131nca)",
{tl:tlYaz(p.priceTry)})}</span>`:""}
              ${kullanimNotu(p)?`<span class="kucuk magaza-kullanim">${esc(kullanimNotu(p))}</span>`:""}</div>
            <div class="magaza-urun-dugmeler">${urunDugmeleri(p)}</div>
          </article>`).join("")}</div>`:`<p class="kucuk">${\u00E7("Bu s\xFCzge\xE7te \xFCr\xFCn yok.")}</p>`}
        <p class="kucuk magaza-not">${\u00E7("\xDCniformada \u015Fapka, kuma\u015F rengi ve desen g\xF6r\xFCnmez; ma\u011Fazan\u0131n \xFCniformas\u0131 kuma\u015F\u0131 de\u011Fi\u015Ftirir. \xC7er\xE7eve ve g\xF6zl\xFCk her k\u0131yafette g\xF6r\xFCn\xFCr. G\xF6r\xFCn\xFCm \xFCr\xFCnlerini G\xF6r\xFCn\
\xFCm ekran\u0131ndan da takars\u0131n.")}</p>`;for(const b of $$("[data-tur]",kap))b.onclick=()=>{tur=b.dataset.tur,hedefUrun=null,katalogCiz()};for(const b of $$("[data-suzgec]",kap))b.onclick=()=>{
suzgec=b.dataset.suzgec,katalogCiz()};for(const b of $$("[data-al]",kap))b.onclick=()=>al(b.dataset.al);for(const b of $$("[data-giy]",kap))b.onclick=()=>giy(b.dataset.giy,!0);for(const b of $$("[data\
-cikar]",kap))b.onclick=()=>giy(b.dataset.cikar,!1);for(const b of $$("[data-kullan]",kap))b.onclick=()=>{const[hedef,id]=b.dataset.kullan.split("|");kullan(hedef,id||null)};for(const b of $$("[data-e\
vim]",kap))b.onclick=()=>odaDenemeIste(b.dataset.evim);for(const b of $$("[data-mars-dinle]",kap))b.onclick=()=>{const p=urun(b.dataset.marsDinle);p&&kulupMarsiCal(p,"mars:"+p.id)};hedefUrun&&$(`[data\
-urun="${CSS.escape(hedefUrun)}"]`,kap)?.scrollIntoView({behavior:"smooth",block:"center"})}function sezonCiz(){const p=v.pass,kutu=$("#magaza-sezon",kap);if(!p){kutu.hidden=!0;return}kutu.hidden=!1;const seviyeler=[
...new Set((p.rewards??[]).map(r=>r.level))].sort((a,b)=>a-b),odul=r=>{if(!r)return'<span class="kucuk magaza-bos">\u2014</span>';const ad=r.product?\u00E7v(urun(r.product)?.name??r.product):\u00E7("{\
n} \u015Feref puan\u0131",{n:r.honor}),durum=r.earned?r.product&&!r.owned?\u00E7("al\u0131nacak"):\u00E7("al\u0131nd\u0131"):"";return`<span class="magaza-odul ${r.earned?"kazanildi":""}">${r.product?
onizleme(urun(r.product)??{id:r.product,kind:"frame"},!0):ikon("medal")}
          <span>${esc(ad)}${durum?` <span class="cip ${r.earned?"yesil":""}">${esc(durum)}</span>`:""}</span></span>`};kutu.innerHTML=`<div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sezon ka\
rt\u0131")}</p><h2 class="b2">${\u00E7("{n}. sezonun \xF6d\xFClleri",{n:p.season})}</h2></div>
          <span class="cip ${p.premium?"altin":""}">${p.premium?\u00E7("Se\xE7kin yol a\xE7\u0131k"):v.sales_open?\u00E7("Se\xE7kin yol: {tl}",{tl:tlYaz(p.price_try)}):\u00E7("Se\xE7kin yol: sat\u0131\u015F a\xE7\u0131l\u0131n\
ca ({tl})",{tl:tlYaz(p.price_try)})}</span></div>
        <p class="kucuk">${\u00E7("\xDCcretsiz yol herkese a\xE7\u0131kt\u0131r; se\xE7kin yol sat\u0131n al\u0131n\u0131nca ayn\u0131 seviyelerin ikinci \xF6d\xFClleri de verilir. Seviye, sezon i\xE7indeki etkin g\xFCn say\u0131s\u0131ndan gelir ({n}. seviyede\
sin).",{n:p.level})}</p>
        <div class="magaza-sezon-tablo"><div class="magaza-sezon-bas"><span>${\u00E7("Seviye")}</span><span>${\u00E7("\xDCcretsiz yol")}</span><span>${\u00E7("Se\xE7kin yol")}</span></div>
          ${seviyeler.map(s=>`<div class="magaza-sezon-satir ${s<=p.level?"gecildi":""}"><span class="magaza-seviye">${s}</span>
            ${odul(p.rewards.find(r=>r.level===s&&r.track==="free"))}${odul(p.rewards.find(r=>r.level===s&&r.track==="premium"))}</div>`).join("")}</div>
        ${p.premium?"":`<div class="satir" style="margin-top:12px"><button type="button" class="dugme ${v.sales_open?"altin":"ikincil"} kucuk-d" id="magaza-seckin" ${v.sales_open&&!mesgul?"":"disabled"}\
>${ikon("ticket")}${\u00E7("Se\xE7kin yolu al")}</button>
          ${v.sales_open?"":`<span class="kucuk">${\u00E7("Sat\u0131\u015F pilotta kapal\u0131; Android s\xFCr\xFCm\xFCyle a\xE7\u0131lacak.")}</span>`}</div>`}`,$("#magaza-seckin",kap)?.addEventListener(
"click",()=>satinAl(`pass:${p.season}`,\u00E7("Se\xE7kin yol ({n}. sezon)",{n:p.season}),p.price_try))}function kurucuCiz(){const f=v.founder??{tiers:[],owned:null};$("#magaza-kurucu",kap).innerHTML=`\
<div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kurucu paketi")}</p><h2 class="b2">${\u00E7("Oyunu ayakta tutanlara")}</h2></div>
          ${f.owned?`<span class="cip altin">${ikon("crown")}${esc(\u00E7v(f.tiers.find(t=>t.id===f.owned)?.name??f.owned))}</span>`:""}</div>
        <p class="kucuk">${\u00E7("Bir kerelik destek paketi: yaln\u0131z g\xF6r\xFCn\xFCm \xFCr\xFCnleri ve ad listesi; oyun g\xFCc\xFC vermez. G\xFCm\xFC\u015F ve alt\u0131n paketlerde ad\u0131n ba\u015Fkentteki Kurucular an\u0131t\u0131na yaz\u0131l\u0131r.")}\
</p>
        <div class="magaza-kurucu-izgara">${(f.tiers??[]).map(t=>`<article class="magaza-kurucu ${f.owned===t.id?"sende":""}">
            <p class="ust-yazi">${esc(\u00E7v(t.name))}</p><p class="magaza-sayi">${tlYaz(t.priceTry)}</p>
            <ul class="magaza-liste">${t.products.map(id=>`<li>${urun(id)?.owned?ikon("check"):ikon("sparkles")}${esc(\u00E7v(urun(id)?.name??id))}</li>`).join("")}
              ${t.monument?`<li>${ikon("landmark")}${\u00E7("Kurucular an\u0131t\u0131nda ad\u0131n")}</li>`:""}</ul>
            <button type="button" class="dugme ${v.sales_open&&!f.owned?"altin":"ikincil"} kucuk-d" data-kurucu="${esc(t.id)}" ${v.sales_open&&!f.owned&&!mesgul?"":"disabled"}>${ikon("crown")}${f.owned===
t.id?\u00E7("Sende"):\u00E7("Sat\u0131n al")}</button>
          </article>`).join("")}</div>
        ${v.sales_open?"":`<p class="kucuk magaza-not">${\u00E7("Sat\u0131\u015F pilotta kapal\u0131; Android s\xFCr\xFCm\xFCyle (Google Play) a\xE7\u0131lacak. Fiyatlar taslakt\u0131r.")}</p>`}`;for(const b of $$(
"[data-kurucu]",kap))b.onclick=()=>{const t=f.tiers.find(x=>x.id===b.dataset.kurucu);satinAl(`founder:${t.id}`,\u00E7v(t.name),t.priceTry)}}function haklarCiz(){const haklar=urunler().filter(p=>p.owned).
sort((a,b)=>(b.granted_at??"").localeCompare(a.granted_at??"")),satin=v.purchases??[],tarih=t=>t?new Date(t).toLocaleDateString(DIL.yerel,{day:"numeric",month:"short",year:"numeric"}):"";$("#magaza-ha\
klar",kap).innerHTML=`<div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Hesab\u0131m")}</p><h2 class="b2">${\u00E7("Haklar\u0131m")}</h2></div>
          <button type="button" class="dugme sade kucuk-d" id="magaza-geri-yukle" ${mesgul?"disabled":""}>${ikon("rotate-cw")}${\u00E7("Geri y\xFCkle")}</button></div>
        ${haklar.length?`<ul class="magaza-liste iki">${haklar.map(p=>`<li>${onizleme(p,!0)}<span><b>${esc(\u00E7v(p.name))}</b><br><span class="kucuk">${esc(\u00E7v(MAGAZA_KAYNAK[p.source]??p.source))}\
 \xB7 ${tarih(p.granted_at)}</span></span></li>`).join("")}</ul>`:`<p class="kucuk">${\u00E7("Hen\xFCz \xFCr\xFCn\xFCn yok. A\xE7\u0131l\u0131\u015F hediyesini al, sezon kart\u0131nda ilerle, madalyalarla \u015Feref puan\u0131 kazan.")}\
</p>`}
        ${satin.length?`<h3 class="b3" style="margin-top:16px">${\u00E7("Sat\u0131n almalar\u0131m")}</h3><ul class="magaza-liste">${satin.map(x=>{const t=x.package.startsWith("founder:")?\u00E7("Kuru\
cu paketi ({ad})",{ad:\u00E7v((v.founder?.tiers??[]).find(y=>y.id===x.package.slice(8))?.name??x.package.slice(8))}):x.package.startsWith("pass:")?\u00E7("Se\xE7kin yol ({n}. sezon)",{n:x.package.slice(
5)}):\u00E7v(urun(x.package)?.name??x.package);return`<li>${ikon(x.status==="verified"?"check":x.status==="pending"?"hourglass":"x")}<span><b>${esc(t)}</b> \xB7 ${tlYaz(x.price_try)}<br><span class="k\
ucuk">${esc(\u00E7v(MAGAZA_SATIN_DURUM[x.status]??x.status))} \xB7 ${tarih(x.created_at)}</span></span></li>`}).join("")}</ul>`:""}
        <p class="kucuk magaza-not">${\u00E7(`\xDCr\xFCnler hesab\u0131na ba\u011Fl\u0131d\u0131r, ba\u015Fkas\u0131na verilmez ve krediye d\xF6nmez. Sat\u0131n almalar Google Play'de do\u011Frulan\u0131r; iade edilen \xFCr\xFCn hesaptan d\xFC\u015Fer. Cihaz de\u011Fi\u015Ftiri\
nce "Geri y\xFCkle" haklar\u0131 yeniden e\u015Fler.`)}</p>`,$("#magaza-geri-yukle",kap).onclick=esle}function ciz(){ustCiz(),vitrinCiz(),katalogCiz(),sezonCiz(),kurucuCiz(),haklarCiz()}async function islem(f,tamam){
if(!mesgul){mesgul=!0,ciz();try{await f(),tamam&&tost(...tamam)}catch(e){tost(hataMetni(e),"circle-alert")}finally{mesgul=!1}kapandi||ciz()}}const al=id=>islem(async()=>{const p=urun(id);await Sunucu.
yap("store_claim",{p_product:id}),v=await Sunucu.cagir("store_view"),tost(p?.priceHonor!=null&&id!==v.gift?.product?\u00E7("{ad} al\u0131nd\u0131: {n} \u015Feref puan\u0131 harcand\u0131.",{ad:\u00E7v(
p.name),n:p.priceHonor}):\u00E7("{ad} hesab\u0131na eklendi.",{ad:\u00E7v(p?.name??id)}),"check")}),esle=()=>islem(async()=>{v=await Sunucu.yap("store_sync")},[\u00E7("Haklar ve sezon kart\u0131 e\u015Flendi."),
"check"]),giy=(id,tak)=>islem(async()=>{const p=urun(id),g={...gorunus()},u={...g.urunler??{}};tak?u[yuvasi(p)]=id:delete u[yuvasi(p)],g.urunler=u,l=await Sunucu.yap("look_save",{p_look:g}),Gorunus.yaz(
l.character_id,{character_id:l.character_id,look:l.look,country_id:l.country_id,rank:l.rank}),typeof gorunusTaslak<"u"&&gorunusTaslak?.kimlik===l.character_id&&(gorunusTaslak=null),tost(tak?\u00E7("{a\
d} tak\u0131ld\u0131.",{ad:\u00E7v(p.name)}):\u00E7("{ad} \xE7\u0131kar\u0131ld\u0131.",{ad:\u00E7v(p.name)}),"check")}),kullan=(hedef,id)=>islem(async()=>{v=(await Sunucu.yap("store_use",{p_target:hedef,
p_product:id})).view??await Sunucu.cagir("store_view");const yer={band:\u00E7("grubun sahnesi"),party:\u00E7("parti"),unit:\u00E7("birlik"),...MAGAZA_KULUP_YER}[hedef];tost(id?\u00E7("{ad} tak\u0131ld\u0131: {y\
er}.",{ad:\u00E7v(urun(id)?.name??id),yer}):\u00E7("\xC7\u0131kar\u0131ld\u0131: {yer}.",{yer}),"check")}),satinAl=(paket,ad,fiyat)=>pencere({ust:\u00E7("Sat\u0131n alma"),baslik:ad,govde:`<p>${\u00E7(
"Bedel: {tl}. \xD6deme Google Play \xFCzerinden al\u0131n\u0131r; sunucu sat\u0131n almay\u0131 do\u011Frulay\u0131nca \xFCr\xFCnler hesab\u0131na eklenir.",{tl:tlYaz(fiyat)})}</p>
        <p class="kucuk">${\u00E7("Sat\u0131n alma kozmetiktir: g\xFC\xE7, gelir ya da oy vermez; ba\u015Fkas\u0131na devredilmez; krediye d\xF6nmez.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7(
"Devam"),sinif:"altin",ikon:"crown",is:()=>islem(async()=>{const r=await Sunucu.yap("store_purchase_begin",{p_package:paket});v=await Sunucu.cagir("store_view"),tost(\u00E7("Sat\u0131n alma ba\u015Flat\u0131ld\u0131 ({tl\
}); \xF6deme do\u011Frulan\u0131nca \xFCr\xFCnler eklenir.",{tl:tlYaz(r.price_try)}),"hourglass")})}]});await yukle(),ciz();const sayac=setInterval(()=>{const n=v?.showcase?.next_at?Date.parse(v.showcase.
next_at):0;n&&Date.now()>=n&&!mesgul&&!kapandi&&Sunucu.cagir("store_view").then(x=>{v=x,kapandi||ciz()}).catch(()=>{})},6e4),b0=Gorunus.dinle(k=>{if(!kapandi&&l&&k.includes(l.character_id)){const x=Gorunus.
al(l.character_id);x?.look&&(l={...l,look:x.look},ciz())}}),b1=typeof Ezgi=="object"?Ezgi.dinle(()=>{!kapandi&&tur==="mars"&&katalogCiz()}):()=>{};return()=>{kapandi=!0,b0(),b1(),clearInterval(sayac),
typeof Ezgi=="object"&&String(Ezgi.calan??"").startsWith("mars:")&&Ezgi.durdur()}}}),Parcalar.tamam("ek_98r_magaza");
