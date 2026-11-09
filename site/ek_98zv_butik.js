// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_98zv_butik.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/butik",{async ac(kap){let v=null,w=null,kapsam="world",model=null,kapandi=!1;try{kapsam=sessionStorage.getItem("civora.butik.kapsam")==="city"?"city":"world",model=sessionStorage.getItem(
"civora.butik.model")||null}catch{}model&&!GIYSI_MODELLER.includes(model)&&(model=null);async function yukle(){const[b,g]=await Promise.all([Sunucu.cagir("boutique",{p_scope:kapsam,p_model:model}),Sunucu.
cagir("wardrobe").catch(()=>null)]);v=b,w=g}const B=()=>v?.rule?.boutique??butikKurali(),T=()=>v?.rule?.tailoring??terzilikKurali(),alimKalan=()=>Math.max(0,Number(B().buyerPerDay??5)-Number(v?.bought_today??
0)),gardiropDolu=()=>w&&(w.garments??[]).length>=Number(T().wardrobeMax??30);function kartHtml(x){const benim=!!x.mine,engel=benim?null:alimKalan()<=0?\u00E7("Bug\xFCnk\xFC al\u0131m hakk\u0131n bitti"):
gardiropDolu()?\u00E7("Gard\u0131robun dolu"):null;return`<article class="butik-kart${benim?" benim":""}" data-butik="${esc(x.garment_id)}" data-model="${esc(x.model)}" data-fiyat="${Number(x.price_cr)}\
">
        <span class="butik-resim">${giysiSvg(x.model,x.color1,x.color2,x.quality,{etiket:giysiModelAdi(x.model)})}</span>
        <div class="butik-bilgi"><b>${esc(giysiModelAdi(x.model))}</b>
          <span class="kucuk">${esc(giysiKumasYazisi(x.color1,x.color2))}</span>
          <span class="kucuk"><span class="giysi-yildiz" aria-hidden="true">${giysiYildiz(x.quality)}</span> ${esc(GIYSI_KALITE_AD[x.quality]??"")}</span>
          <span class="kucuk">${benim?esc(\u00E7("Senin buti\u011Fin")):`<button class="baglanti" type="button" data-profil="${esc(x.seller_id)}">${esc(x.seller_name??"")}</button>`} \xB7 ${esc(bolgeAdi(
x.region_id))}</span>
          <span class="butik-fiyat">${esc(\u00E7("{kr} kredi",{kr:kr(x.price_cr)}))}</span>
          ${engel?`<span class="kucuk saglik-engel">${esc(engel)}</span>`:""}</div>
        ${benim?`<button class="dugme ikincil kucuk-d" data-butik-cek="${esc(x.garment_id)}">${ikon("undo-2")}${\u00E7("Sat\u0131\u015Ftan \xE7ek")}</button>`:`<button class="dugme altin kucuk-d" data\
-butik-al="${esc(x.garment_id)}" ${engel?"disabled":""}>${ikon("shopping-bag")}${\u00E7("Sat\u0131n al")}</button>`}
      </article>`}function butigimHtml(){if(!w)return"";const ilanlar=(w.garments??[]).filter(x=>x.listing),sat=w.sales??[],bk=B();return`<section class="kart" id="butik-benim" style="margin-top:20px"\
><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Senin buti\u011Fin")}</p>
          <h2 class="b2">${\u00E7("{n} / {m} giysi sat\u0131\u015Fta",{n:sayi(ilanlar.length),m:sayi(bk.listingsMax??6)})}</h2></div>
          <button class="dugme sade kucuk-d" data-git="hayat/gorunum">${ikon("shirt")}${\u00E7("Gard\u0131robum")}</button></div>
        <div class="bilgi-izgara">
          <div><small>${\u00E7("Bug\xFCnk\xFC sat\u0131\u015F\u0131n")}</small><b>${esc(\u00E7("{n} / {m}",{n:sayi(w.sold_today??0),m:sayi(bk.sellerPerDay??5)}))}</b></div>
          <div><small>${\u00E7("Bug\xFCnk\xFC al\u0131m\u0131n")}</small><b>${esc(\u00E7("{n} / {m}",{n:sayi(w.bought_today??0),m:sayi(bk.buyerPerDay??5)}))}</b></div>
          <div><small>${\u00E7("Komisyon")}</small><b>${esc(\u00E7("%{n}, yak\u0131l\u0131r",{n:sayi(Number(bk.feePpm??5e4)/1e4)}))}</b></div>
        </div>
        ${ilanlar.length?`<div class="liste" style="margin-top:10px">${ilanlar.map(x=>`<div class="liste-satir" data-butik-ilan="${esc(x.garment_id)}">
            <span class="liste-ikon giysi-mini">${giysiSvg(x.model,x.color1,x.color2,x.quality,{aski:!1})}</span>
            <div><span class="tur">${esc(bolgeAdi(x.listing.region_id))} \xB7 ${esc(zamanOnce(x.listing.listed_at))}</span><b>${esc(giysiModelAdi(x.model))} \xB7 ${esc(\u00E7("{kr} kredi",{kr:kr(x.listing.
price_cr)}))}</b>
              <div class="alt">${esc(\u00E7("Sat\u0131l\u0131nca eline {n} kredi ge\xE7er.",{n:kr(Number(x.listing.price_cr)-Math.floor(Number(x.listing.price_cr)*Number(bk.feePpm??5e4)/1e6))}))}</div\
></div>
            <button class="dugme ikincil kucuk-d" data-butik-cek="${esc(x.garment_id)}">${ikon("undo-2")}${\u00E7("Sat\u0131\u015Ftan \xE7ek")}</button></div>`).join("")}</div>`:`<p class="bos" style=\
"margin-top:10px">${\u00E7("Buti\u011Finde giysi yok. Dikti\u011Fin giysiyi Hayat\u0131m \u2192 G\xF6r\xFCn\xFCm \u2192 Gard\u0131robum'dan buti\u011Fe koyabilirsin.")}</p>`}
        ${sat.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Son sat\u0131\u015Flar\u0131n")}</p><div class="liste">${sat.slice(0,5).map(x=>`<div class="liste-satir">
            <span class="liste-ikon altin">${ikon("shopping-bag")}</span><div><span class="tur">${esc(zamanOnce(x.at))}</span><b>${esc(giysiModelAdi(x.model))}</b>
              <div class="alt">${esc(\u00E7("{kr} kredi \xB7 komisyon {k} \xB7 eline {n} kredi ge\xE7ti",{kr:kr(x.price_cr),k:kr(x.fee_cr),n:kr(Number(x.price_cr)-Number(x.fee_cr))}))}</div></div><spa\
n></span></div>`).join("")}</div>`:""}
      </section>`}function ciz(){const liste=v?.listings??[],yer=v?.region_id?bolgeAdi(v.region_id):null,bk=B();kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim \xB7 Butik")}</p><h1 class="b1">${\u00E7("Butik")}</h1>
          <p class="aciklama">${esc(\u00E7("Terzilerin dikti\u011Fi giysiler. Alan \xF6der; %{oran} komisyon yak\u0131l\u0131r, kalan\u0131 terziye ge\xE7er. Giysi hemen gard\u0131robuna gelir ve yeniden sat\u0131lmaz. G\xFCnde en \xE7ok {n} \
al\u0131m.",{oran:sayi(Number(bk.feePpm??5e4)/1e4),n:sayi(bk.buyerPerDay??5)}))}</p></div>
          <div class="oneri-dugmeler"><button class="dugme ikincil kucuk-d" data-git="hayat/hobiler">${ikon("scissors")}${\u00E7("Terzilik")}</button></div></div>
        <section class="kart" id="butik-vitrin">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Vitrin")}</p><h2 class="b2">${liste.length?\u00E7("{n} giysi",{n:sayi(liste.length)}):\u00E7("Vitrin bo\u015F")}</h2></div>
            <span class="cip ${alimKalan()>0?"yesil":"mercan"}" id="butik-hak">${ikon("shopping-bag")}${esc(\u00E7("Bug\xFCn {n} al\u0131m hakk\u0131n kald\u0131",{n:sayi(alimKalan())}))}</span></div>\

          <div class="secim-sec" role="group" aria-label="${\u00E7("Vitrin")}" id="butik-kapsam">
            <button type="button" class="secim-cip" data-butik-kapsam="world" aria-pressed="${kapsam==="world"}">${ikon("globe")}${\u00E7("D\xFCnya")}</button>
            <button type="button" class="secim-cip" data-butik-kapsam="city" aria-pressed="${kapsam==="city"}">${ikon("map-pin")}${esc(yer?\u00E7("Bulundu\u011Fum \u015Fehir: {sehir}",{sehir:yer}):\u00E7(
"Bulundu\u011Fum \u015Fehir"))}</button></div>
          <div class="secim-sec" role="group" aria-label="${\u00E7("Model")}" id="butik-model" style="margin-top:8px">
            <button type="button" class="secim-cip" data-butik-model="" aria-pressed="${!model}">${\u00E7("B\xFCt\xFCn modeller")}</button>
            ${(T().models??[]).map(m=>`<button type="button" class="secim-cip" data-butik-model="${esc(m.id)}" aria-pressed="${model===m.id}">${esc(giysiModelAdi(m.id))}</button>`).join("")}</div>
          ${liste.length?`<div class="butik-izgara" style="margin-top:12px">${liste.map(kartHtml).join("")}</div>`:`<p class="bos" style="margin-top:12px">${esc(model?kapsam==="city"?\u00E7("Bu \u015Fehird\
e bu modelden sat\u0131\u015Fta giysi yok."):\u00E7("Bu modelden sat\u0131\u015Fta giysi yok."):kapsam==="city"?\u00E7("Bu \u015Fehirde sat\u0131\u015Fta giysi yok. D\xFCnyan\u0131n butiklerine bak ya da kendi dikti\u011Fin giys\
iyi buti\u011Fe koy."):\u00E7("Hen\xFCz kimse giysi satm\u0131yor. Hobiler \u2192 Terzilik'te dik, Gard\u0131robum'dan buti\u011Fe koy."))}</p>`}
          ${gardiropDolu()?`<div class="bilgi-kutusu uyari-kutusu" style="margin-top:10px">${ikon("circle-alert")}<span>${\u00E7("Gard\u0131robun dolu; almadan \xF6nce bir giysiyi at ya da sat.")}</sp\
an></div>`:""}
        </section>
        ${butigimHtml()}
      </div>`,bagla()}async function isle(dugme,is){if(!dugme?.disabled){dugme&&(dugme.disabled=!0);try{await is()}catch(e){tost(hataMetni(e),"circle-alert"),await tazele()}finally{dugme?.isConnected&&
(dugme.disabled=!1)}}}function alPenceresi(x){if(!x)return;const fiyat=Number(x.price_cr);pencere({ust:\u00E7("Butik"),baslik:\u00E7("{model} \xB7 {kr} kredi",{model:giysiModelAdi(x.model),kr:kr(fiyat)}),
govde:`<div class="dik-pencere"><div class="dik-onizleme">${giysiSvg(x.model,x.color1,x.color2,x.quality)}<b>${esc(giysiModelAdi(x.model))}</b>
            <span class="kucuk">${esc(giysiKumasYazisi(x.color1,x.color2))} \xB7 ${esc(GIYSI_KALITE_AD[x.quality]??"")}</span></div>
          <div class="dik-secim"><p class="aciklama">${esc(\u00E7("{ad} dikti ({sehir}). \xD6dedi\u011Fin {kr} kredinin {k} kredisi komisyon olarak yak\u0131l\u0131r, kalan\u0131 terziye ge\xE7er.",{ad:x.
seller_name??"",sehir:bolgeAdi(x.region_id),kr:kr(fiyat),k:kr(x.fee_cr??0)}))}</p>
            <p class="kucuk">${esc(\u00E7("Giysi hemen gard\u0131robuna gelir; G\xF6r\xFCn\xFCm'de giyebilirsin. Butikten al\u0131nan giysi yeniden sat\u0131lmaz. Bug\xFCn {n} al\u0131m hakk\u0131n kald\u0131.",
{n:sayi(alimKalan())}))}</p></div></div>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Sat\u0131n al"),sinif:"altin",ikon:"shopping-bag",is:()=>isle(null,async()=>{const r=await Sunucu.yap("boutique\
_buy",{p_garment:x.garment_id,p_expected_price:fiyat});tost(\u00E7("{model} ald\u0131n ({kr} kredi): gard\u0131robunda.",{model:giysiModelAdi(x.model),kr:kr(r?.price_cr??fiyat)}),"shirt"),Durum.ozet().
catch(()=>{}),await tazele()})}]})}function bagla(){for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-profil]",kap))b.onclick=()=>profilAc(b.dataset.profil,
()=>tazele());for(const b of $$("[data-butik-kapsam]",kap))b.onclick=()=>{if(kapsam!==b.dataset.butikKapsam){kapsam=b.dataset.butikKapsam;try{sessionStorage.setItem("civora.butik.kapsam",kapsam)}catch{}
tazele()}};for(const b of $$("[data-butik-model]",kap))b.onclick=()=>{const yeni=b.dataset.butikModel||null;if(model!==yeni){model=yeni;try{model?sessionStorage.setItem("civora.butik.model",model):sessionStorage.
removeItem("civora.butik.model")}catch{}tazele()}};for(const b of $$("[data-butik-al]",kap))b.onclick=()=>{b.disabled||alPenceresi((v?.listings??[]).find(x=>x.garment_id===b.dataset.butikAl))};for(const b of $$(
"[data-butik-cek]",kap))b.onclick=()=>isle(b,async()=>{await Sunucu.yap("boutique_unlist",{p_garment:b.dataset.butikCek}),tost(\u00E7("Sat\u0131\u015Ftan \xE7ekildi; giysi gard\u0131robunda."),"undo-2"),
await tazele()})}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()});await Durum.kurallar().catch(()=>null),await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^(boutique\.|hobby\.completed|travel\.arrived)/.
test(olay)&&tazele()}),saat=setInterval(()=>{!document.hidden&&!document.querySelector(".perde")&&tazele()},3e4);return()=>{kapandi=!0,b1(),clearInterval(saat)}}}),Parcalar.tamam("ek_98zv_butik");
