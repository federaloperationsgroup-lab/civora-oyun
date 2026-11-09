// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_38_gorunus_ekran.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/gorunum",{async ac(kap){let v=null,secim=null,mod=null,hata3b=!1,kapandi=!1,gonderiliyor=!1,rutbeSayisi=12,magaza=null,gardirop=null;async function yukle(){const[l,kurallar,m,w]=await Promise.
all([Sunucu.cagir("my_look"),Durum.kurallar(),Sunucu.cagir("store_view").catch(()=>null),Sunucu.cagir("wardrobe").catch(()=>null)]);v=l,magaza=m,gardirop=w,rutbeSayisi=kurallar?.data?.combat?.war2?.ranks?.
length??12,secim=gorunusTaslak?.kimlik===v.character_id?{...gorunusTaslak.look}:{...kayitli()},giysiEsle()}function giysiEsle(){const gy=v?.look?.giysi;if(gy)secim={...secim,giysi:gy};else if(secim&&"\
giysi"in secim){const{giysi,...kalan}=secim;secim=kalan}gorunusTaslak?.look&&(gy?gorunusTaslak.look.giysi=gy:delete gorunusTaslak.look.giysi)}const kayitli=()=>v.look??varsayilanGorunus(v.name),ALANLAR=[
"ten","sacRenk","sac","sakal","yuz","beden","kiyafet","renk","zemin"],yuvalar=g=>Object.fromEntries(Object.entries(g?.urunler??{}).filter(([,x])=>typeof x=="string").sort()),degisti=()=>ALANLAR.some(k=>secim[k]!==
kayitli()[k])||JSON.stringify(yuvalar(secim))!==JSON.stringify(yuvalar(kayitli()))||(secim.forma?.k??null)!==(kayitli().forma?.k??null),sahipler=yuva=>(magaza?.products??[]).filter(p=>p.owned&&p.kind===
MAGAZA_YUVALAR[yuva]),ek=()=>({ulke:v.country_id,rutbe:v.rank});kap.innerHTML=`<div class="sayfa">
      <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m")}</p><h1 class="b1">${\u00E7("G\xF6r\xFCn\xFCm")}</h1>
        <p class="aciklama">${\u00E7("Fig\xFCr\xFCn ve profil resmin. G\xF6r\xFCn\xFCm s\xFCst\xFCr: g\xFC\xE7, gelir ya da oy vermez; pilotta b\xFCt\xFCn se\xE7enekler \xFCcretsiz.")}</p></div></div>\

      <div class="gorunus-izgara">
        <section class="kart gorunus-figur-kart">
          <div class="sahne3b figur-sahne" id="figur-sahne">
            <div class="yukleniyor" id="figur-yukleniyor"><div class="yukleniyor-ic"><img src="img/amblem.png" alt=""><span>${\u00E7("Fig\xFCr haz\u0131rlan\u0131yor\u2026")}</span></div></div>
            <div class="figur-2b" id="figur-2b" hidden></div>
          </div>
          <div class="satir figur-alt"><span class="kucuk" id="figur-ipucu"></span>
            <button class="dugme sade kucuk-d" id="figur-mod">${ikon("layers")}<span id="figur-mod-yazi">${\u00E7("2B")}</span></button></div>
          <div class="figur-eylemler" id="figur-eylemler" hidden>
            <p class="ust-yazi">${\u00E7("Hareketler")}</p>
            <div class="secim-sec" role="group" aria-label="${\u00E7("Hareketler")}">${FIGUR_EYLEMLERI.map(x=>`<button type="button" class="secim-cip" data-eylem="${x.id}" aria-pressed="false">${ikon(
x.ik)}${esc(x.ad)}</button>`).join("")}</div>
          </div>
        </section>
        <section class="kart gorunus-secenekler" id="gorunus-secenekler"></section>
      </div>
      <section class="kart" id="gorunus-onizleme" style="margin-top:20px"></section>
      <section class="kart" id="gorunus-gardirop" style="margin-top:20px" hidden></section>
    </div>`;const sahneEl=$("#figur-sahne",kap);function seceneklerCiz(){const K=gorunusKurali(),uniforma=secim.kiyafet==="uniforma",renkler=(alan,dizi,ad,kapali=!1)=>`<div class="gorunus-grup"><p cla\
ss="ust-yazi">${esc(ad)}</p>
        <div class="renk-sec" role="group" aria-label="${esc(ad)}">${dizi.map((r,i)=>`<button type="button" class="renk-kutu" data-gorunus="${alan}" data-deger="${i}"
          style="--renk:${r}" aria-label="${esc(ad)} ${i+1}" aria-pressed="${secim[alan]===i}" ${kapali?"disabled":""}></button>`).join("")}</div></div>`,cipler=(alan,liste,ad)=>`<div class="gorunus-g\
rup"><p class="ust-yazi">${esc(ad)}</p>
        <div class="secim-sec" role="group" aria-label="${esc(ad)}">${liste.map(x=>{const kilit=x.uniform&&!v.uniform_allowed;return`<button type="button" class="secim-cip" data-gorunus="${alan}" data\
-deger="${esc(x.id)}" aria-pressed="${secim[alan]===x.id}" ${kilit?"disabled":""}>
            ${kilit?ikon("lock"):""}${esc(\u00E7v(x.name))}</button>`}).join("")}</div></div>`;$("#gorunus-secenekler",kap).innerHTML=`
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Se\xE7enekler")}</p><h2 class="b2">${\u00E7("Kendini tasarla")}</h2></div>
          <button type="button" class="dugme sade kucuk-d" id="gorunus-rastgele">${ikon("sparkles")}${\u00E7("Rastgele")}</button></div>
        ${renkler("ten",K.skin,\u00E7("Ten"))}
        ${cipler("sac",K.hairStyles,\u00E7("Sa\xE7"))}
        ${renkler("sacRenk",K.hairColor,\u00E7("Sa\xE7 rengi"))}
        ${cipler("sakal",K.beards,\u00E7("Sakal"))}
        ${cipler("yuz",K.faces??GORUNUS_VARSAYILAN_KURAL.faces,\u00E7("Y\xFCz"))}
        ${cipler("beden",K.bodies??GORUNUS_VARSAYILAN_KURAL.bodies,\u00E7("Beden"))}
        ${cipler("kiyafet",K.outfits,\u00E7("K\u0131yafet"))}
        ${secim.giysi&&giysiCizimi(secim.giysi)?`<div class="bilgi-kutusu" id="gorunus-giysi-not">${ikon("shirt")}<span>${esc(\u00E7("\u015Eu an {model} giyiyorsun; k\u0131yafet ve rengi giysiyi \xE7\u0131kar\u0131nca g\xF6r\xFCn\
\xFCr.",{model:giysiModelAdi(secim.giysi.model)}))}</span><button type="button" class="dugme sade kucuk-d" data-giysi-cikar>${\u00E7("\xC7\u0131kar")}</button></div>`:""}
        ${renkler("renk",K.outfitColors,\u00E7("K\u0131yafet rengi"),uniforma)}
        ${(()=>{const kitler=Durum.v.ozet?.kits??[];return kitler.length?`<div class="gorunus-grup" id="gorunus-forma"><p class="ust-yazi">${\u00E7("Kul\xFCp formas\u0131")}</p>
            <div class="secim-sec" role="group" aria-label="${esc(\u00E7("Kul\xFCp formas\u0131"))}">
              <button type="button" class="secim-cip" data-gorunus-forma="" aria-pressed="${!secim.forma}">${\u00E7("Formas\u0131z")}</button>
              ${kitler.map(k=>`<button type="button" class="secim-cip" data-gorunus-forma="${esc(k.club_id)}" aria-pressed="${secim.forma?.k===k.club_id}"><span class="futbol-renk" style="--forma:${kulupRengi(
k.color1)}"></span>${esc(k.name)}</button>`).join("")}
            </div><p class="kucuk">${\u00E7("Forma k\u0131yafetin ve giysinin yerine her sahnede g\xF6r\xFCn\xFCr; kadrodaysan s\u0131rt\u0131nda forma numaran.")}</p></div>`:""})()}
        ${renkler("zemin",K.backgrounds,\u00E7("Resmin zemini"))}
        ${magaza?`<div class="gorunus-grup gorunus-urunler"><p class="ust-yazi">${\u00E7("Ma\u011Faza \xFCr\xFCnlerin")}</p>
          ${(magaza.products??[]).some(p=>p.owned)?Object.keys(MAGAZA_YUVALAR).map(yuva=>{const liste=sahipler(yuva);if(!liste.length)return"";const not=uniforma&&["sapka","desen","renk"].includes(yuva)?
\u00E7("\xFCniformada g\xF6r\xFCnmez"):yuva==="uniforma"&&!uniforma?\u00E7("\xFCniformadayken g\xF6r\xFCn\xFCr"):yuva==="silah"?\u00E7("silah ask\u0131nda ve poligonda"):yuva==="vurus"?\u00E7("arenada\
 kendi vuru\u015Funda"):yuva==="sevinc"?\u00E7("gol at\u0131nca ma\xE7ta"):"";return`<div class="gorunus-yuva"><span class="kucuk">${esc(MAGAZA_YUVA_AD[yuva])}${not?` \xB7 ${not}`:""}</span>
              <div class="secim-sec" role="group" aria-label="${esc(MAGAZA_YUVA_AD[yuva])}">
                <button type="button" class="secim-cip" data-gorunus-yuva="${yuva}" data-deger="" aria-pressed="${!secim.urunler?.[yuva]}">${\u00E7("Yok")}</button>
                ${liste.map(p=>`<button type="button" class="secim-cip" data-gorunus-yuva="${yuva}" data-deger="${esc(p.id)}" aria-pressed="${secim.urunler?.[yuva]===p.id}">${esc(\u00E7v(p.name))}</bu\
tton>`).join("")}
              </div></div>`}).join(""):`<p class="kucuk">${\u00E7("Hen\xFCz \xFCr\xFCn\xFCn yok.")}</p>`}
          <p class="kucuk"><a href="#hayat/magaza">${\u00E7("Ma\u011Faza: hediye, \u015Feref puan\u0131 ve sezon kart\u0131 \xF6d\xFClleri")}</a></p></div>`:""}
        <p class="kucuk gorunus-not">${v.uniform_allowed?`${ikon("shield")}${\u00E7("R\xFCtben <b>{rutbe}</b>: \xFCniformada omuzlar\u0131nda g\xF6r\xFCn\xFCr; kepin band\u0131 \xFClkenin renginde.",{
rutbe:esc(rutbeAdi(v.rank_name))})}`:`${ikon("lock")}${\u00E7("\xDCniforma i\xE7in \xF6nce temel asker\xEE e\u011Fitimi bitir (\xDClkem \u2192 Cephe'deki tatbikat).")}`}</p>
        <div class="satir gorunus-dugmeler">
          <span class="kucuk" id="gorunus-durum">${degisti()?\u00E7("Kaydedilmemi\u015F de\u011Fi\u015Fiklik var."):v.look?\u00E7("Kay\u0131tl\u0131 g\xF6r\xFCn\xFCm\xFCn."):\u00E7("Hen\xFCz kaydetmedin:\
 ad\u0131ndan t\xFCretilen g\xF6r\xFCn\xFCm.")}</span>
          <button type="button" class="dugme sade kucuk-d" id="gorunus-vazgec" ${degisti()?"":"disabled"}>${\u00E7("Vazge\xE7")}</button>
          <button type="button" class="dugme altin kucuk-d" id="gorunus-kaydet" ${(degisti()||!v.look)&&!gonderiliyor?"":"disabled"}>${ikon("check")}${\u00E7("Kaydet")}</button>
        </div>`;for(const b of $$("[data-gorunus]",kap))b.onclick=()=>{const alan=b.dataset.gorunus;secim={...secim,[alan]:["ten","sacRenk","renk","zemin"].includes(alan)?Number(b.dataset.deger):b.dataset.
deger},degistir()};for(const b of $$("[data-gorunus-forma]",kap))b.onclick=()=>{const k=(Durum.v.ozet?.kits??[]).find(x=>x.club_id===b.dataset.gorunusForma),benim=Durum.v.ozet?.club;if(k)secim={...secim,
forma:{k:k.club_id,c1:Number(k.color1),c2:Number(k.color2),n:benim?.id===k.club_id?benim.number??null:null}};else{const{forma,...kalan}=secim;secim=kalan}degistir()};for(const b of $$("[data-gorunus-y\
uva]",kap))b.onclick=()=>{const u={...secim.urunler??{}};b.dataset.deger?u[b.dataset.gorunusYuva]=b.dataset.deger:delete u[b.dataset.gorunusYuva],secim={...secim,urunler:u},degistir()};$("#gorunus-ras\
tgele",kap).onclick=()=>{const r=rastgele((Date.now()^Math.floor(Math.random()*1e9))>>>0),i=n=>Math.floor(r()*n),kiyafetler=K.outfits.filter(x=>!x.uniform||v.uniform_allowed),yuzler=K.faces??GORUNUS_VARSAYILAN_KURAL.
faces,bedenler=K.bodies??GORUNUS_VARSAYILAN_KURAL.bodies;secim={ten:i(K.skin.length),sacRenk:i(K.hairColor.length),sac:K.hairStyles[i(K.hairStyles.length)].id,sakal:K.beards[i(K.beards.length)].id,yuz:yuzler[i(
yuzler.length)].id,beden:bedenler[i(bedenler.length)].id,kiyafet:kiyafetler[i(kiyafetler.length)].id,renk:i(K.outfitColors.length),zemin:i(K.backgrounds.length),...secim.urunler?{urunler:secim.urunler}:
{},...secim.giysi?{giysi:secim.giysi}:{},...secim.forma?{forma:secim.forma}:{}},degistir(),figur3bOrnek?.elSalla()},$("#gorunus-vazgec",kap).onclick=()=>{secim={...kayitli()},gorunusTaslak=null,degistir()},
$("#gorunus-kaydet",kap).onclick=kaydet,$("[data-giysi-cikar]",kap)?.addEventListener("click",e=>isle(e.currentTarget,()=>giy(null)))}function gardiropCiz(){const el=$("#gorunus-gardirop",kap);if(!el||
(el.hidden=!gardirop,!gardirop))return;const R=gardirop.rule??{},T=R.tailoring??terzilikKurali(),B=R.boutique??butikKurali(),liste=gardirop.garments??[],sinir=Number(T.wardrobeMax??30),ilanSayi=Number(
gardirop.listings??0),kart=x=>{const satista=!!x.listing,giyili=!!x.worn,benim=x.source==="sewn",kimden=benim?\u00E7("Sen diktin"):x.maker_name?\u00E7("{ad} dikti \xB7 butikten ald\u0131n",{ad:x.maker_name}):
\u00E7("Butikten ald\u0131n"),d=[];return satista||d.push(giyili?`<button type="button" class="dugme ikincil kucuk-d" data-giysi-giy="">${ikon("undo-2")}${\u00E7("\xC7\u0131kar")}</button>`:`<button t\
ype="button" class="dugme altin kucuk-d" data-giysi-giy="${esc(x.garment_id)}">${ikon("shirt")}${\u00E7("Giy")}</button>`),benim&&!satista&&!giyili&&d.push(`<button type="button" class="dugme ikincil \
kucuk-d" data-giysi-sat="${esc(x.garment_id)}" ${ilanSayi>=Number(B.listingsMax??6)?"disabled":""}>${ikon("shopping-bag")}${\u00E7("Buti\u011Fe koy")}</button>`),satista&&d.push(`<button type="button"\
 class="dugme ikincil kucuk-d" data-giysi-cek="${esc(x.garment_id)}">${ikon("undo-2")}${\u00E7("Sat\u0131\u015Ftan \xE7ek")}</button>`),!satista&&!giyili&&d.push(`<button type="button" class="dugme sa\
de kucuk-d" data-giysi-at="${esc(x.garment_id)}">${ikon("trash")}${\u00E7("At")}</button>`),`<article class="giysi-kart${giyili?" giyili":""}" data-giysi="${esc(x.garment_id)}" data-model="${esc(x.model)}\
" data-giyili="${giyili?1:0}" data-satista="${satista?1:0}">
          <span class="giysi-resim">${giysiSvg(x.model,x.color1,x.color2,x.quality,{etiket:giysiModelAdi(x.model)})}</span>
          <div class="giysi-bilgi"><b>${esc(giysiModelAdi(x.model))}</b>
            <span class="kucuk">${esc(giysiKumasYazisi(x.color1,x.color2))}</span>
            <span class="kucuk"><span class="giysi-yildiz" aria-hidden="true">${giysiYildiz(x.quality)}</span> ${esc(GIYSI_KALITE_AD[x.quality]??"")}</span>
            <span class="kucuk">${esc(kimden)}</span>
            ${giyili?`<span class="cip yesil">${ikon("check")}${\u00E7("Giyiyorsun")}</span>`:""}
            ${satista?`<span class="cip altin">${ikon("shopping-bag")}${esc(\u00E7("Butikte \xB7 {kr} kredi",{kr:kr(x.listing.price_cr)}))}</span>`:""}</div>
          <div class="giysi-dugmeler">${d.join("")}</div></article>`},satislar=gardirop.sales??[];el.innerHTML=`<div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Gard\u0131robum")}</p><h2 class\
="b2">${\u00E7("{n} / {m} giysi",{n:sayi(liste.length),m:sayi(sinir)})}</h2></div>
          <span class="oneri-dugmeler"><button type="button" class="dugme sade kucuk-d" data-git="hayat/hobiler">${ikon("scissors")}${\u00E7("Terzilik")}</button>
            <button type="button" class="dugme sade kucuk-d" data-git="sehir/butik">${ikon("shopping-bag")}${\u00E7("Butik")}</button></span></div>
        ${liste.length?`<div class="gardirop-izgara">${liste.map(kart).join("")}</div>`:`<p class="bos">${\u00E7("Gard\u0131robun bo\u015F. Hayat\u0131m \u2192 Hobiler \u2192 Terzilik'te giysi dik ya da \u015Eehrim \u2192 Butik'ten al.")}\
</p>`}
        <p class="kucuk" style="margin-top:10px">${esc(\u00E7("Buti\u011Finde {n} / {m} giysi. Bug\xFCn {s} / {sm} sat\u0131\u015F, {a} / {am} al\u0131m. Sat\u0131\u015Ftan %{oran} komisyon yak\u0131l\u0131r; butikten al\u0131nan giysi yeniden sat\u0131\
lmaz.",{n:sayi(ilanSayi),m:sayi(B.listingsMax??6),s:sayi(gardirop.sold_today??0),sm:sayi(B.sellerPerDay??5),a:sayi(gardirop.bought_today??0),am:sayi(B.buyerPerDay??5),oran:sayi(Number(B.feePpm??5e4)/1e4)}))}\
</p>
        ${satislar.length?`<details class="gardirop-satislar" style="margin-top:8px"><summary>${esc(\u00E7("Son sat\u0131\u015Flar\u0131n ({n})",{n:sayi(satislar.length)}))}</summary>
          <div class="liste" style="margin-top:8px">${satislar.map(x=>`<div class="liste-satir"><span class="liste-ikon altin">${ikon("shopping-bag")}</span>
            <div><span class="tur">${esc(zamanOnce(x.at))}</span><b>${esc(giysiModelAdi(x.model))} \xB7 ${esc(giysiKumasYazisi(x.color1,x.color2))}</b>
              <div class="alt">${esc(\u00E7("{kr} kredi \xB7 komisyon {k} \xB7 eline {n} kredi ge\xE7ti",{kr:kr(x.price_cr),k:kr(x.fee_cr),n:kr(Number(x.price_cr)-Number(x.fee_cr))}))}</div></div><spa\
n></span></div>`).join("")}</div></details>`:""}`;for(const b of $$("[data-git]",el))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-giysi-giy]",el))b.onclick=()=>isle(b,()=>giy(b.dataset.
giysiGiy||null));for(const b of $$("[data-giysi-sat]",el))b.onclick=()=>satPenceresi((gardirop.garments??[]).find(x=>x.garment_id===b.dataset.giysiSat));for(const b of $$("[data-giysi-cek]",el))b.onclick=
()=>isle(b,async()=>{const g=(gardirop.garments??[]).find(x=>x.garment_id===b.dataset.giysiCek);gardirop=await Sunucu.yap("boutique_unlist",{p_garment:b.dataset.giysiCek}),tost(\u00E7("{model} sat\u0131\u015Fta\
n \xE7ekildi; gard\u0131robunda.",{model:giysiModelAdi(g?.model)}),"undo-2"),gardiropCiz()});for(const b of $$("[data-giysi-at]",el))b.onclick=()=>{const g=(gardirop.garments??[]).find(x=>x.garment_id===
b.dataset.giysiAt);g&&pencere({ust:\u00E7("Gard\u0131robum"),baslik:\u00E7("{model} at\u0131ls\u0131n m\u0131?",{model:giysiModelAdi(g.model)}),govde:`<p class="aciklama">${esc(\u00E7("At\u0131lan giysi ge\
ri gelmez ({kumas}, {kalite}).",{kumas:giysiKumasYazisi(g.color1,g.color2),kalite:GIYSI_KALITE_AD[g.quality]??""}))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("At"),sinif:"mercan",ikon:"trash",
is:()=>isle(null,async()=>{gardirop=await Sunucu.yap("garment_discard",{p_garment:g.garment_id}),tost(\u00E7("{model} at\u0131ld\u0131.",{model:giysiModelAdi(g.model)}),"trash"),gardiropCiz()})}]})}}async function isle(dugme,is){
if(!dugme?.disabled){dugme&&(dugme.disabled=!0);try{await is()}catch(e){tost(hataMetni(e),"circle-alert")}finally{dugme?.isConnected&&(dugme.disabled=!1)}}}async function giy(kimlik){if(kimlik&&!v.look){
pencere({ust:\u00E7("Gard\u0131robum"),baslik:\u00E7("\xD6nce g\xF6r\xFCn\xFCm\xFCn\xFC kaydet"),govde:`<p class="aciklama">${\u00E7("Giysi kay\u0131tl\u0131 g\xF6r\xFCn\xFCm\xFCn\xFCn \xFCst\xFCne giyilir. \u015Eu anki se\xE7imin kaydedil\
ip giysi giyilsin mi?")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Kaydet ve giy"),sinif:"altin",ikon:"check",is:()=>isle(null,async()=>{await kaydet(),v.look&&await giyGonder(kimlik)})}]});
return}await giyGonder(kimlik)}async function giyGonder(kimlik){const r=await Sunucu.yap("garment_wear",{p_garment:kimlik}),{look,...w}=r??{};gardirop=w,look&&(v=look),giysiEsle(),Gorunus.yaz(v.character_id,
{character_id:v.character_id,look:v.look,country_id:v.country_id,rank:v.rank});const g=(gardirop.garments??[]).find(x=>x.garment_id===kimlik);tost(kimlik?\u00E7("{model} giydin.",{model:giysiModelAdi(
g?.model)}):\u00E7("Giysiyi \xE7\u0131kard\u0131n; k\u0131yafetin g\xF6r\xFCn\xFCyor."),kimlik?"shirt":"undo-2"),kapandi||(degistir(),gardiropCiz())}function satPenceresi(g){if(!g)return;const B=gardirop?.
rule?.boutique??butikKurali(),p=pencereForm({ust:\u00E7("Butik"),baslik:\u00E7("{model} buti\u011Fe konsun",{model:giysiModelAdi(g.model)}),onayAd:\u00E7("Buti\u011Fe koy"),onayIkon:"shopping-bag",govde:`\
<div class="dik-pencere"><div class="dik-onizleme">${giysiSvg(g.model,g.color1,g.color2,g.quality)}<b>${esc(giysiModelAdi(g.model))}</b>
            <span class="kucuk">${esc(giysiKumasYazisi(g.color1,g.color2))} \xB7 ${esc(GIYSI_KALITE_AD[g.quality]??"")}</span></div>
          <div class="dik-secim"><label class="alan"><span>${\u00E7("Fiyat (kredi)")}</span><input name="fiyat" inputmode="decimal" value="${krediGirdi(Math.max(Number(B.minCr??500),1500))}"></label>
            <p class="kucuk" id="butik-ozet"></p>
            <p class="kucuk">${esc(\u00E7("Buti\u011Fin \u015Fehri bulundu\u011Fun yer: {yer}. Alan \xF6der; komisyon yak\u0131l\u0131r, kalan\u0131 sana ge\xE7er. Sat\u0131\u015Ftan \xE7ekene ya da sat\u0131lana kadar giyemezsin.",
{yer:bolgeAdi(Durum.v.ozet?.character?.location)}))}</p></div></div>`,is:async d=>{const fiyat=krediAlt(d.get("fiyat"));if(!(fiyat>=Number(B.minCr??500)&&fiyat<=Number(B.maxCr??2e4)))throw new Error(\u00E7(
"Fiyat {a}\u2013{b} kredi aras\u0131nda olmal\u0131.",{a:kr(B.minCr??500),b:kr(B.maxCr??2e4)}));gardirop=await Sunucu.yap("boutique_list",{p_garment:g.garment_id,p_price:fiyat}),tost(\u00E7("{model} b\
utikte: {kr} kredi.",{model:giysiModelAdi(g.model),kr:kr(fiyat)}),"shopping-bag"),gardiropCiz()}}),ozet=()=>{const f=krediAlt(new FormData(p.form).get("fiyat")),el=$("#butik-ozet",p.form);if(!el)return;
if(!(f>0)){el.textContent=\u00E7("Fiyat\u0131 yaz ({a}\u2013{b} kredi).",{a:kr(B.minCr??500),b:kr(B.maxCr??2e4)});return}const kom=Math.floor(f*Number(B.feePpm??5e4)/1e6);el.textContent=\u00E7("Sat\u0131l\u0131\
nca komisyon {k} kredi yak\u0131l\u0131r; eline {n} kredi ge\xE7er.",{k:kr(kom),n:kr(f-kom)})};p.form.addEventListener("input",ozet),ozet()}function onizlemeCiz(){const resim=avatarSvg(v.name,secim,ek());
$("#gorunus-onizleme",kap).innerHTML=`<div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Profil resmin")}</p><h2 class="b2">${\u00E7("Ba\u015Fkalar\u0131 seni b\xF6yle g\xF6r\xFCr")}</h2></div><\
/div>
        <div class="gorunus-onizleme"><span class="avatar gorunus-buyuk">${resim}</span><span class="avatar gorunus-orta">${resim}</span><span class="avatar">${resim}</span>
          <p class="kucuk">${\u00E7("Meclis ve aday listelerinde, Meydan'da, sohbette ve profil penceresinde bu resim g\xF6r\xFCn\xFCr. Kaydedince herkeste de\u011Fi\u015Fir.")}</p></div>`}const durum3b=()=>({
anahtar:v.character_id,ad:v.name,gorunus:secim,ulke:v.country_id,rutbe:{sira:v.rank??0,sayi:rutbeSayisi},uniformaAcik:!!v.uniform_allowed});let onceki2b=null;function figur2bCiz(){const el=$("#figur-2\
b",kap);if(!el||mod!=="2b")return;const doner=!!onceki2b&&!hareketAzalt&&(onceki2b.kiyafet!==secim.kiyafet||onceki2b.renk!==secim.renk);onceki2b={kiyafet:secim.kiyafet,renk:secim.renk},el.innerHTML=terzi2b(
{ad:v.name,gorunus:secim,ek:ek(),uniformaAcik:!!v.uniform_allowed,rutbe:rutbeAdi(v.rank_name),doner,kiyafetler:gorunusKurali().outfits.map(x=>({id:x.id,ad:\u00E7v(x.name)}))})}const dene=id=>{secim.kiyafet!==
id&&(secim={...secim,kiyafet:id},degistir())};$("#figur-2b",kap).addEventListener("click",e=>{const b=e.target.closest("[data-terzi]");b&&!b.disabled&&dene(b.dataset.terzi)});function degistir(){gorunusTaslak=
degisti()?{kimlik:v.character_id,look:{...secim}}:null,seceneklerCiz(),onizlemeCiz(),mod==="3b"?figur3bOrnek?.durumYaz(durum3b()):figur2bCiz()}async function kaydet(){if(!gonderiliyor){gonderiliyor=!0,
seceneklerCiz();try{v=await Sunucu.yap("look_save",{p_look:secim}),secim={...v.look},gorunusTaslak=null,Gorunus.yaz(v.character_id,{character_id:v.character_id,look:v.look,country_id:v.country_id,rank:v.
rank}),tost(\u00E7("G\xF6r\xFCn\xFCm\xFCn kaydedildi."),"check"),figur3bOrnek?.elSalla()}catch(e){tost(hataMetni(e),"circle-alert")}finally{gonderiliyor=!1}kapandi||degistir()}}function eylemCiz(){const kutu=$(
"#figur-eylemler",kap);if(!kutu)return;kutu.hidden=mod!=="3b";const calan=mod==="3b"?figur3bOrnek?.oynayan:null;for(const b of $$("[data-eylem]",kutu))b.setAttribute("aria-pressed",String(b.dataset.eylem===
calan))}$("#figur-eylemler",kap).addEventListener("click",e=>{const b=e.target.closest("[data-eylem]");!b||mod!=="3b"||!figur3bOrnek||(figur3bOrnek.eylem(b.dataset.eylem),eylemCiz())});function ipucuCiz(){
eylemCiz(),$("#figur-ipucu",kap).textContent=mod==="3b"?\u00E7("S\xFCr\xFCkle: d\xF6nd\xFCr \xB7 dokun: el sallar \xB7 ask\u0131daki k\u0131yafete dokun: dene"):\u00E7("Ask\u0131daki k\u0131yafete dokun: dene. \
Kaydet'e bas\u0131nca kal\u0131r.");const b=$("#figur-mod",kap);b.hidden=!Gorunum.webglVar(),b.setAttribute("aria-label",mod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCme (2B) ge\xE7"):\u00E7("3B g\xF6r\xFCn\xFCme ge\
\xE7")),b.title=b.getAttribute("aria-label"),$("#figur-mod-yazi",kap).textContent=mod==="3b"?\u00E7("2B"):\u00E7("3B")}function sahneBirak(){figur3bOrnek&&Uc.cizici?.etkin===figur3bOrnek&&Uc.cizici.birak(
figur3bOrnek)}async function modKur(){const yuk=$("#figur-yukleniyor",kap),iki=$("#figur-2b",kap);if(Gorunum.uc()&&!hata3b){yuk.classList.remove("bitti");try{const{THREE,cizici}=await Uc.yukle("38_gor\
unus_ekran.js");if(kapandi)return;figur3bOrnek??=figur3bKur(THREE,cizici,{oda:!0});const a=figur3bOrnek;if(a.kapBagla(sahneEl),a.dinle("eylemBitti",()=>{kapandi||eylemCiz()}),a.dinle("kiyafet",id=>{kapandi||
dene(id)}),a.dinle("kilit",()=>tost(\u00E7("\xDCniforma, temel asker\xEE e\u011Fitimi bitirenlere a\xE7\u0131k."),"lock")),a.durumYaz(durum3b()),!cizici.bagla(a,sahneEl))throw new Error("webgl-bagla");
iki.hidden=!0,iki.replaceChildren(),mod="3b",sahneEl.dataset.mod="3b",yuk.classList.add("bitti"),ipucuCiz();return}catch(e){console.warn("3B fig\xFCr a\xE7\u0131lamad\u0131:",e),hata3b=!0,kapandi||tost(
\u00E7("3B fig\xFCr bu cihazda a\xE7\u0131lamad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),"layers")}}kapandi||(sahneBirak(),Uc.cizici?.renderer?.domElement.parentElement===sahneEl&&Uc.cizici.renderer.
domElement.remove(),mod="2b",sahneEl.dataset.mod="2b",iki.hidden=!1,figur2bCiz(),yuk.classList.add("bitti"),ipucuCiz())}await yukle(),seceneklerCiz(),onizlemeCiz(),gardiropCiz(),$("#figur-mod",kap).onclick=
()=>{hata3b=!1,Gorunum.ayarla(mod==="3b"?"2b":"3b")},await modKur();const b0=Gorunum.dinle(()=>{kapandi||(hata3b=!1,modKur())}),b1=Durum.dinle("olay",({olay})=>{if(/^(boutique\.|hobby\.completed)/.test(
olay)){Sunucu.cagir("wardrobe").then(w=>{kapandi||!w||(gardirop=w,gardiropCiz())}).catch(()=>{});return}/^(war\.|progress\.)/.test(olay)&&Sunucu.cagir("my_look").then(l=>{kapandi||(v=l,giysiEsle(),degistir())}).
catch(()=>{})});return()=>{kapandi=!0,b0(),b1();for(const x of["eylemBitti","kiyafet","kilit"])figur3bOrnek?.dinle(x,null);sahneBirak()}}}),Parcalar.tamam("ek_38_gorunus_ekran");
