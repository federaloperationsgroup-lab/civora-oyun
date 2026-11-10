// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_98zu_araclar.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/araclar",{async ac(kap){let v=null,kapandi=!1,mesgul=!1,gorunus;const sahne=AracSahnesi.ac();sahne.dinle("sec",ad=>{const el=$({land:"#arac-yer-land",sea:"#arac-yer-sea",kit:"#arac\
-kurallar",ben:"#arac-bayi"}[ad]??"#arac-bayi",kap);el&&(el.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"center"}),el.classList.remove("vurgu-yan"),el.offsetWidth,el.classList.add("vur\
gu-yan"))});const ben=()=>Durum.v.ozet?.character??{};async function yukle(){const[x,bak]=await Promise.all([Sunucu.cagir("vehicles"),gorunus===void 0?Sunucu.cagir("my_look").catch(()=>null):null]);v=
x,gorunus===void 0&&(gorunus=bak?.look??null)}const R=()=>v.rule??{},tur=id=>(R().kinds??[]).find(k=>k.id===id)??null,ORTAM_AD={land:\u00E7("Kara arac\u0131"),sea:\u00E7("Tekne")},hizYazisi=k=>k.medium===
"sea"?\u00E7("Deniz ge\xE7i\u015Finde s\xFCre {oran} k\u0131sa",{oran:ppmYuzde(k.speedPpm)}):\u00E7("Karada s\xFCre {oran} k\u0131sa",{oran:ppmYuzde(k.speedPpm)});function yerHtml(m){const u=(v.garage??
[]).find(x=>x.medium===m);if(!u){const cantada=(R().kinds??[]).filter(k2=>k2.medium===m&&Number(v.stock?.[k2.id]??0)>0);return`<section class="kart" id="arac-yer-${m}" data-arac-yer="${m}" data-tur=""\
>
          <div class="kart-bas"><div><p class="ust-yazi">${esc(ORTAM_AD[m])}</p><h2 class="b2">${esc(m==="sea"?\u00E7("Teknenin yeri bo\u015F"):\u00E7("Kara arac\u0131n\u0131n yeri bo\u015F"))}</h2></\
div>
            <span class="ik-kutu">${ikon(m==="sea"?"sailboat":"car")}</span></div>
          ${cantada.length?`<div class="liste">${cantada.map(k2=>`<div class="liste-satir" data-arac-canta="${esc(k2.id)}">
              <span class="liste-ikon">${ikon(ARAC_IK[k2.id]??"car")}</span>
              <div><span class="tur">${esc(\u00E7("\xC7antanda {n}",{n:sayi(v.stock[k2.id])}))}</span><b>${esc(aracAdi(k2.id))}</b>
                <div class="alt">${esc(hizYazisi(k2))} \xB7 ${esc(\u00E7("{n} yol dayan\u0131r",{n:sayi(k2.durability)}))}</div></div>
              <button class="dugme altin kucuk-d" data-arac-garaja="${esc(k2.id)}" ${v.traveling||mesgul?"disabled":""}>${ikon("warehouse")}${\u00E7("Garaja al")}</button></div>`).join("")}</div>
              ${v.traveling?`<p class="kucuk" style="margin-top:8px">${\u00E7("Yoldayken garaj\u0131ndaki arac\u0131 de\u011Fi\u015Ftiremezsin.")}</p>`:""}`:`<p class="bos">${esc(m==="sea"?\u00E7("\xC7an\
tanda tekne yok. Bayiden ya da pazardan alabilirsin."):\u00E7("\xC7antanda kara arac\u0131 yok. Bayiden ya da pazardan alabilirsin."))}</p>`}
        </section>`}const k=tur(u.kind)??{speedPpm:0,durability:u.durability,medium:m},oran=Math.min(100,Number(u.wear)/Math.max(1,Number(u.durability))*100),kit=Math.min(Number(u.kits_max??0),Number(
v.kits??0)),renkler=(R().colors??[]).map(r=>`<button class="arac-renk${r===u.color?" secili":""}" data-arac-renk="${m}|${esc(r)}" aria-pressed="${r===u.color}"
          title="${esc(ARAC_RENK_AD[r]??r)}" aria-label="${esc(ARAC_RENK_AD[r]??r)}" style="--renk:${aracRengi(r)}" ${mesgul?"disabled":""}></button>`).join("");return`<section class="kart" id="arac-y\
er-${m}" data-arac-yer="${m}" data-tur="${esc(u.kind)}" data-asinma="${Number(u.wear)}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(ORTAM_AD[m])}</p><h2 class="b2"><span class="arac-nokta" style="--renk:${aracRengi(u.color)}"></span>${esc(aracAdi(u.kind))}</h2></div>
          <span class="ik-kutu">${ikon(ARAC_IK[u.kind]??"car")}</span></div>
        <div class="bilgi-izgara">
          <div><small>${\u00E7("H\u0131z")}</small><b>${esc(hizYazisi(k))}</b></div>
          <div><small>${\u00E7("Kalan \xF6m\xFCr")}</small><b>${esc(\u00E7("{n} yol",{n:sayi(u.remaining)}))}</b></div>
          <div><small>${\u00E7("Yolculuk")}</small><b>${esc(\u00E7("{n} yolculuk \xB7 {k} yol",{n:sayi(u.trips),k:sayi(u.edges)}))}</b></div>
        </div>
        <div class="cubuk ${u.warn?"mercan":"deniz"} arac-asinma" style="margin-top:10px"><i style="width:${oran.toFixed(1)}%"></i></div>
        <p class="kucuk">${esc(\u00E7("A\u015F\u0131nma {a} / {b}",{a:sayi(u.wear),b:sayi(u.durability)}))}</p>
        ${u.warn?`<div class="bilgi-kutusu uyari-kutusu" style="margin-top:8px">${ikon("circle-alert")}<span>${esc(\u00E7("A\u015F\u0131nma y\xFCksek: {n} bak\u0131m kitiyle tamamen onar\u0131l\u0131r. \xD6mr\xFC dolan ara\xE7 yolculu\u011Fun\
 ba\u015F\u0131nda hurdaya ayr\u0131l\u0131r.",{n:sayi(u.kits_max)}))}</span></div>`:""}
        <p class="ust-yazi" style="margin-top:12px">${\u00E7("Renk")}</p>
        <div class="arac-renkler" role="group" aria-label="${esc(\u00E7("Renk"))}">${renkler}</div>
        <label class="arac-kullan"><input type="checkbox" data-arac-etkin="${m}" ${u.active?"checked":""} ${mesgul?"disabled":""}> ${\u00E7("Yolculukta kullan")}</label>
        ${u.active?"":`<p class="kucuk">${esc(\u00E7("Kapal\u0131yken yolculuklar\u0131n ara\xE7s\u0131z (bilet ve otob\xFCsle) olur; ara\xE7 a\u015F\u0131nmaz."))}</p>`}
        <div class="oneri-dugmeler" style="margin-top:10px">
          <button class="dugme altin kucuk-d" data-arac-onar="${m}" data-kit="${kit}" ${!u.wear||!kit||mesgul?"disabled":""}>${ikon("wrench")}${u.wear?\u00E7("Onar ({n} kit)",{n:sayi(Math.max(1,kit))}):
\u00E7("Onar\u0131m gerekmiyor")}</button>
          <button class="dugme ikincil kucuk-d" data-arac-cikar="${m}" ${u.wear>0||v.traveling||mesgul?"disabled":""}>${ikon("package")}${\u00E7("Garajdan \xE7\u0131kar")}</button>
          <button class="dugme sade kucuk-d" data-arac-hurda="${m}" ${v.traveling||mesgul?"disabled":""}>${ikon("trash")}${\u00E7("Hurdaya ay\u0131r")}</button>
        </div>
        <p class="kucuk" style="margin-top:6px">${esc(u.wear>0?Number(v.kits??0)>0?\u00E7("Garajdan \xE7\u0131karmak (satmak) i\xE7in \xF6nce tamamen onar."):\u00E7("Bak\u0131m kitin yok: Pazar'dan alabili\
rsin. Garajdan \xE7\u0131karmak i\xE7in \xF6nce tamamen onar."):\u00E7("A\u015F\u0131nmas\u0131z ara\xE7 garajdan \xE7\u0131kar ve \xE7antana d\xF6ner; satabilirsin."))}${v.traveling?" "+esc(\u00E7("Y\
oldayken garaj\u0131ndaki arac\u0131 de\u011Fi\u015Ftiremezsin.")):""}</p>
      </section>`}function bayiHtml(){const bugun=Number(v.dealer_today??0),sinir=Number(R().dealer_per_day??1),kredi=Number(v.credits??0);return`<section class="kart" id="arac-bayi">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Devletin bayisi")}</p><h2 class="b2">${\u00E7("Ara\xE7 al")}</h2></div><span class="ik-kutu">${ikon("car")}</span></div>
        <p class="aciklama">${esc(\u00E7("Bayi her arac\u0131 sabit fiyatla satar; bedel sisteme gider. G\xFCnde {n} ara\xE7 alabilirsin (bug\xFCn {a}). Oyuncular\u0131n \xFCretti\u011Fi ara\xE7lar Pazar'da daha ucuz olabilir.",
{n:sayi(sinir),a:sayi(bugun)}))}</p>
        <div class="liste">${(R().kinds??[]).map(k=>{const engel=bugun>=sinir?\u00E7("Bug\xFCnk\xFC hakk\u0131n\u0131 kulland\u0131n"):kredi<Number(k.dealerCr)?\u00E7("Kredin yetmiyor"):null;return`<d\
iv class="liste-satir" data-arac-bayi="${esc(k.id)}"><span class="liste-ikon">${ikon(ARAC_IK[k.id]??"car")}</span>
            <div><span class="tur">${esc(k.medium==="sea"?\u00E7("Deniz"):\u00E7("Kara"))}</span><b>${esc(aracAdi(k.id))}</b>
              <div class="alt">${esc(hizYazisi(k))} \xB7 ${esc(\u00E7("{n} yol dayan\u0131r",{n:sayi(k.durability)}))}</div>
              ${engel?`<div class="alt saglik-engel">${esc(engel)}</div>`:""}</div>
            <button class="dugme altin kucuk-d" data-arac-al="${esc(k.id)}" ${engel||mesgul?"disabled":""}>${ikon("coins")}${\u00E7("{kr} kredi",{kr:kr(k.dealerCr)})}</button></div>`}).join("")}</div>\

        <div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme sade kucuk-d" data-git="sehir/pazar">${ikon("store")}${\u00E7("Pazar'a git")}</button>
          <button class="dugme sade kucuk-d" data-git="sehir/yol">${ikon("route")}${\u00E7("Seyahat")}</button></div>
      </section>`}function kurallarHtml(){const r=R(),son=v.recent??[];return`<section class="kart" id="arac-kurallar">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Nas\u0131l \xE7al\u0131\u015F\u0131r")}</p><h2 class="b2">${\u00E7("Yolda ara\xE7")}</h2></div><span class="ik-kutu">${ikon("info")}</s\
pan></div>
        <ul class="arac-kural">
          <li>${esc(\u00E7("Kara arac\u0131 kara yollar\u0131nda, tekne deniz ge\xE7i\u015Flerinde kullan\u0131l\u0131r; s\xFCre arac\u0131n h\u0131z\u0131 kadar k\u0131sal\u0131r."))}</li>
          <li>${esc(\u00E7("Belediyenin yol projesiyle birlikte yolculuk en \xE7ok {oran} k\u0131sal\u0131r. Bilet bedeli de\u011Fi\u015Fmez.",{oran:ppmYuzde(r.cap_ppm??5e5)}))}</li>
          <li>${esc(\u00E7("Sava\u015F\u0131n hedef ya da \xE7\u0131k\u0131\u015F b\xF6lgesine giden yolculukta ara\xE7 kullan\u0131lmaz."))}</li>
          <li>${esc(\u00E7("Kullan\u0131lan her yol bir a\u015F\u0131nma. Bir bak\u0131m kiti {n} a\u015F\u0131nmay\u0131 giderir; \xF6mr\xFC dolan ara\xE7 hurdaya ayr\u0131l\u0131r.",{n:sayi(r.repair_per_kit??
20)}))}</li>
          <li>${esc(\u00E7("Ara\xE7 sava\u015F g\xFCc\xFCne, oya ve gelire d\xF6n\xFC\u015Fmez; rengi yaln\u0131z g\xF6r\xFCn\xFCm."))}</li>
        </ul>
        <p class="kucuk">${ikon("wrench")} ${esc(\u00E7("Bak\u0131m kitin: {n}",{n:sayi(v.kits??0)}))}</p>
        ${son.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Ara\xE7la son yolculuklar\u0131n")}</p><div class="liste">${son.map(t=>`<div class="liste-satir" data-arac-son="${esc(t.travel_id)}\
">
            <span class="liste-ikon">${ikon(ARAC_IK[t.land??t.sea]??"route")}</span>
            <div><span class="tur">${esc(saatYaz(t.departs_at))}</span><b>${esc(bolgeAdi(t.from))} \u2192 ${esc(bolgeAdi(t.to))}</b>
              <div class="alt">${esc(\u00E7("{a} yerine {b} dakika",{a:sayi(t.minutes_before??t.minutes),b:sayi(t.minutes)}))}${t.land?" \xB7 "+esc(aracAdi(t.land)):""}${t.sea?" \xB7 "+esc(aracAdi(t.sea)):
""}</div></div><span></span></div>`).join("")}</div>`:""}
      </section>`}function ciz(){kap.innerHTML=`<div class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m")}</p><h1 class="b1">${\u00E7("Ara\xE7lar\u0131m")}</h1>
          <p class="aciklama">${\u00E7("Bisikletten tekneye: ara\xE7 yolculuklar\u0131n\u0131 k\u0131salt\u0131r. Kara arac\u0131 ve tekne garaj\u0131nda durur; her yolculukta biraz a\u015F\u0131n\u0131r.")}\
</p></div></div>
        <div id="arac-garaj-yer"></div>
        <div class="izgara iki" style="margin-top:20px">${yerHtml("land")}${yerHtml("sea")}</div>
        <div class="izgara iki" style="margin-top:20px">${bayiHtml()}${kurallarHtml()}</div>
      </div>`,$("#arac-garaj-yer",kap)?.replaceWith(sahne.el),sahne.yaz({v,ben:{id:ben().id,ad:ben().name,gorunus,ulke:ben().citizenship}}),bagla()}async function isle(fn,basari){if(!mesgul){mesgul=!0;
try{const y=await fn();if(kapandi)return;y?.rule&&(v=y),basari?.(y),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert"),await yukle().catch(()=>{})}finally{mesgul=!1,kapandi||ciz()}}}
function bagla(){for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-arac-al]",kap))b.onclick=()=>isle(()=>Sunucu.yap("vehicle_dealer_buy",{p_kind:b.dataset.
aracAl,p_use:!0}),y=>tost(y?.used?\u00E7("Ald\u0131n: {arac}; garaj\u0131na kondu.",{arac:aracAdi(y.bought)}):\u00E7("Ald\u0131n: {arac}; \xE7antanda duruyor.",{arac:aracAdi(y?.bought)}),"car"));for(const b of $$(
"[data-arac-garaja]",kap))b.onclick=()=>isle(()=>Sunucu.yap("vehicle_register",{p_kind:b.dataset.aracGaraja,p_color:null}),()=>tost(\u00E7("{arac} garaj\u0131na kondu.",{arac:aracAdi(b.dataset.aracGaraja)}),
"warehouse"));for(const b of $$("[data-arac-renk]",kap))b.onclick=()=>{const[m,r]=b.dataset.aracRenk.split("|");isle(()=>Sunucu.yap("vehicle_set",{p_medium:m,p_color:r,p_active:null}))};for(const b of $$(
"[data-arac-etkin]",kap))b.onchange=()=>isle(()=>Sunucu.yap("vehicle_set",{p_medium:b.dataset.aracEtkin,p_color:null,p_active:b.checked}),()=>tost(b.checked?\u00E7("Yolculuklar\u0131nda arac\u0131n\u0131 kullanacaks\
\u0131n."):\u00E7("Yolculuklar\u0131nda arac\u0131n\u0131 kullanmayacaks\u0131n."),"route"));for(const b of $$("[data-arac-onar]",kap))b.onclick=()=>isle(()=>Sunucu.yap("vehicle_repair",{p_medium:b.dataset.
aracOnar,p_kits:Math.max(1,Number(b.dataset.kit))}),y=>tost(\u00E7("Onar\u0131ld\u0131: a\u015F\u0131nma {n}.",{n:sayi(y?.wear??0)}),"wrench"));for(const b of $$("[data-arac-cikar]",kap))b.onclick=()=>isle(
()=>Sunucu.yap("vehicle_release",{p_medium:b.dataset.aracCikar}),y=>tost(\u00E7("{arac} garajdan \xE7\u0131kt\u0131; \xE7antanda.",{arac:aracAdi(y?.released)}),"package"));for(const b of $$("[data-ara\
c-hurda]",kap))b.onclick=()=>{const u=(v.garage??[]).find(x=>x.medium===b.dataset.aracHurda);pencere({ust:\u00E7("Ara\xE7lar\u0131m"),baslik:\u00E7("Hurdaya ay\u0131rmak istiyor musun?"),govde:`<p cla\
ss="aciklama">${esc(\u00E7("{arac} t\xFCkenir; geri al\u0131nmaz.",{arac:aracAdi(u?.kind)}))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Hurdaya ay\u0131r"),sinif:"mercan",ikon:"trash",is:()=>isle(
()=>Sunucu.yap("vehicle_scrap",{p_medium:b.dataset.aracHurda}),()=>tost(\u00E7("Arac\u0131n hurdaya ayr\u0131ld\u0131."),"trash"))}]})}}const tazele=tazeleyici(async()=>{await yukle(),!kapandi&&!mesgul&&
ciz()});await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^(vehicle\.|travel\.)/.test(olay)&&tazele()});return()=>{kapandi=!0,b1(),sahne.kapat()}}}),Parcalar.tamam("ek_98zu_araclar");
