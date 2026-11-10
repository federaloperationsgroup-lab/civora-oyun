// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_26_pazar.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/pazar",{async ac(kap){let secili="erzak@1",yalnizBurada=!1;try{secili=sessionStorage.getItem("civora.pazar")||"erzak@1",yalnizBurada=sessionStorage.getItem("civora.pazar.burada")===
"1"}catch{}PAZAR_URUNLER.includes(secili)||(secili="erzak@1");let kaynak="";try{kaynak=sessionStorage.getItem("civora.pazar.kaynak")||"",sessionStorage.removeItem("civora.pazar.kaynak")}catch{}let ozetler=[],
ilanlar=[],benim={open:[],recent:[]},nabiz=null,sehir=null,gorunus,lojistik=null,fisler=[],sozlesmeler={open:[],recent:[],rules:null},ilanHata=!1,ilanIstek=0;const carsi=CarsiSahnesi.ac(),benVerisi=()=>{
const ch=Durum.v.ozet?.character;return ch?{anahtar:ch.id,ad:ch.name??"",gorunus:gorunus??null,ulke:ch.citizenship??null,rutbe:{sira:Durum.v.askerlik?.soldier?.rank??0,sayi:12}}:null},carsiYaz=()=>carsi.
yaz({ozetler,nabiz,sehir,secili,ben:benVerisi()});carsi.dinle("sec",a=>{if(a==="pano"){Kabuk.git("ulke/ekonomi");return}const b=$(`[data-urun="${CSS.escape(a)}"]`,kap);b&&(b.click(),$("#pazar-ilanlar",
kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"}))});const ilanOku=urun=>Sunucu.cagir("market_orders",{p_asset:urun,p_limit:30,...yalnizBurada?{p_here:!0}:{}});async function yukle(){
let nb,sh,bak,lj,fs,sz;[ozetler,ilanlar,benim,nb,sh,,bak,lj,fs,sz]=await Promise.all([Sunucu.cagir("market_overview"),ilanOku(secili),Sunucu.cagir("my_market_orders"),Sunucu.cagir("market_pulse").catch(
()=>null),Sunucu.cagir("city_pulse").catch(()=>null),Durum.ozet(),gorunus===void 0?Sunucu.cagir("my_look").catch(()=>null):null,Sunucu.cagir("logistics_me").catch(()=>null),Sunucu.cagir("trade_receipt\
s",{p_limit:20}).catch(()=>null),Sunucu.cagir("contracts_me").catch(()=>null)]),nb&&(nabiz=nb),sh&&(sehir=sh),lj&&(lojistik=lj),fs&&(fisler=fs),sz&&(sozlesmeler=sz),gorunus===void 0&&(gorunus=bak?.look??
null)}const depolar=()=>lojistik?.warehouses??[],depo=id=>depolar().find(w=>w.warehouse_id===id)??null;function ilanSatiri(o){const mi=benim.open.some(x=>x.order_id===o.order_id),ulke=o.country_id??o.
tax_country_id;return`<div class="ilk-adim ilan-satir" data-ilan="${esc(o.order_id)}" data-yerel="${o.local?1:0}"><span class="ozet-ikon" style="background:var(--kagit-3)">${ikon("store")}</span>
        <span><b>${\u00E7("{kr} kredi / {birim}",{kr:kr(o.unit_price),birim:esc(URUN[secili.split("@")[0]]?.birim??\u00E7("adet"))})}</b>
          <span class="kucuk">${\u00E7("{n} adet \xB7 {yer}",{n:Number(o.qty_remaining),yer:esc(bolgeAdi(o.region_id))})} \xB7 <span class="ulke-nokta" style="background:${ulkeRenk(ulke)}"></span> ${esc(
ulkeAdi(ulke))}${mi?" \xB7 "+\u00E7("senin ilan\u0131n"):""}</span>
          <span class="ilan-cipler">${o.local?`<span class="cip yesil">${ikon("check")}${\u00E7("Hemen teslim")}</span>`:`<span class="cip deniz">${ikon("truck")}${\u00E7("Kargoyla ya da depoda")}</sp\
an>`}
            <span class="cip">${ikon("percent")}${\u00E7("vergi {oran}",{oran:ppmYuzde(o.tax_rate_ppm??0)})}</span>
            ${o.promo?`<span class="cip tanitim-cip" data-tanitim="${esc(o.promo.offer_id??"")}" title="${esc(\u00E7("Bu \xFCr\xFCn {isletme} tan\u0131t\u0131m\u0131nda; s\xFCresi {zaman} biter.",{isletme:o.
promo.company??"",zaman:saatYaz(o.promo.until)}))}">${ikon("megaphone")}${\u00E7("Tan\u0131t\u0131mda \xB7 {isletme}",{isletme:esc(o.promo.company??"")})}</span>`:""}</span></span>
        ${mi?"<span></span>":`<button class="dugme kucuk-d" data-al="${o.order_id}">${\u00E7("Al")}</button>`}</div>`}function ilanlarHtml(oz){const sec=oz.get(secili);return`<div class="kart-bas"><di\
v><p class="ust-yazi">${\u00E7("{urun} \xB7 ilanlar",{urun:esc(varlikAdi(secili))})}</p>
          <h2 class="b2">${sec?\u00E7("En d\xFC\u015F\xFCk {kr} kredi",{kr:kr(sec.min_unit_price)}):\u00E7("Bu \xFCr\xFCn i\xE7in ilan yok")}</h2></div>
          <img src="${varlikResim(secili)}" alt="" width="44" height="44" style="border-radius:10px"></div>
        <label class="onay" style="margin-bottom:10px"><input type="checkbox" id="pazar-burada" ${yalnizBurada?"checked":""}>
          <span>${\u00E7("Yaln\u0131z bulundu\u011Fum \xFClkedeki ilanlar (hemen teslim)")}</span></label>
        ${ilanlar.length?`<div class="yigin">${ilanlar.map(ilanSatiri).join("")}</div>`:ilanHata?`<div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("\u0130lanlar okunamad\u0131; ba\u011Flant\u0131n\u0131 denetley\
ip \xFCr\xFCne yeniden dokun.")}</span></div>`:`<p class="bos">${yalnizBurada?\u00E7("Bulundu\u011Fun \xFClkede bu \xFCr\xFCnden ilan yok. S\xFCzgeci kald\u0131r\u0131nca \xF6teki \xFClkelerin ilanlar\u0131 da g\xF6r\xFCn\xFCr."):
\u00E7("\u015Eu an kimse satm\u0131yor. \u0130lk satan sen ol.")}</p>`}
        ${secili==="erzak@1"||secili==="erzak"?`<button class="dugme ikincil kucuk-d" type="button" data-devlet-deposu>${ikon("warehouse")}${\u00E7("Devlet erzak deposu")}</button>`:""}
        <p class="kucuk" style="margin-top:10px">${\u00E7("Ba\u015Fka \xFClkedeki ilandan al\u0131rken teslim \u015Fart\u0131n\u0131 se\xE7ersin: kargoyla bulundu\u011Fun yere gelir ya da o \xFClkedeki deponda kal\u0131r.")}\
</p>`}function ilanlarBagla(){for(const b of $$("[data-al]",kap))b.onclick=()=>alPenceresi(ilanlar.find(o=>o.order_id===b.dataset.al));$("[data-devlet-deposu]",kap)?.addEventListener("click",async()=>{
if(await Kabuk.git("sehir/is"),Kabuk.etkin!=="sehir/is")return;$("#depo-kart")?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"center"}),$("#depo-al")?.focus({preventScroll:!0})});const s=$(
"#pazar-burada",kap);s&&(s.onchange=async()=>{yalnizBurada=s.checked;try{sessionStorage.setItem("civora.pazar.burada",yalnizBurada?"1":"0")}catch{}await ilanTazele()})}async function ilanTazele(){const istek=++ilanIstek,
urun=secili;let yeni=[],hata=!1;try{yeni=await ilanOku(urun)}catch{hata=!0}if(istek!==ilanIstek||urun!==secili)return;ilanlar=yeni,ilanHata=hata;const yer=$("#pazar-ilanlar",kap);yer&&(yer.innerHTML=ilanlarHtml(
new Map(ozetler.map(x=>[x.asset,x]))),ilanlarBagla())}function kaynakStoklari(k){return k?(depo(k)?.balances??[]).filter(b=>Number(b.spendable)>0):(Durum.v.ozet?.balances??[]).filter(b=>b.asset!=="CR"&&
b.spendable>0)}function kaynakNotu(k){const w=depo(k);return w?\u00E7("\u0130lan deponun yerinde ({yer}) a\xE7\u0131l\u0131r; sat\u0131\u015F vergisini {ulke} al\u0131r. Para \xE7antana gelir.",{yer:bolgeAdi(
w.region_id),ulke:ulkeAdi(w.country_id)}):\u00E7("\u0130lan bulundu\u011Fun yerde ({yer}) a\xE7\u0131l\u0131r; sat\u0131\u015F vergisini o \xFClke al\u0131r.",{yer:bolgeAdi(Durum.v.ozet?.character?.location??
lojistik?.location)})}function urunSecenekleri(k,sec){return kaynakStoklari(k).map(b=>`<option value="${b.asset}" ${b.asset===sec?"selected":""}>${esc(varlikAdi(b.asset))} (${sayi(b.spendable)})</opti\
on>`).join("")}function satisKarti(sec){kaynak&&!depo(kaynak)&&(kaynak="");const stok=kaynakStoklari(kaynak),depoVar=depolar().some(w=>(w.balances??[]).some(b=>Number(b.spendable)>0));return`<section \
class="kart" id="pazar-satis">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sat\u0131\u015F ilan\u0131")}</p><h2 class="b2">${\u00E7("Mal\u0131n\u0131 sat")}</h2></div><span class="ik-kutu">${ikon("hand-coins")}\
</span></div>
        ${stok.length||depoVar?`<form class="form" id="sat-form" novalidate>
          ${depolar().length?`<label class="alan"><span>${\u00E7("Kaynak")}</span><select name="kaynak">
            <option value="" ${kaynak?"":"selected"}>${esc(\u00E7("\xC7anta ({yer})",{yer:bolgeAdi(Durum.v.ozet?.character?.location??lojistik?.location)}))}</option>
            ${depolar().map(w=>`<option value="${esc(w.warehouse_id)}" ${w.warehouse_id===kaynak?"selected":""}>${esc(\u00E7("{ulke} deposu ({yer})",{ulke:ulkeAdi(w.country_id),yer:bolgeAdi(w.region_id)}))}\
</option>`).join("")}
          </select></label>`:""}
          <label class="alan"><span>${\u00E7("\xDCr\xFCn")}</span><select name="varlik">${urunSecenekleri(kaynak,secili)}</select></label>
          <div class="izgara" style="grid-template-columns:1fr 1fr;gap:12px">
            <label class="alan"><span>${\u00E7("Miktar")}</span><input name="miktar" inputmode="numeric" value="1"></label>
            <label class="alan"><span>${\u00E7("Birim fiyat (kredi)")}</span><input name="fiyat" inputmode="decimal" value="${sec?(sec.min_unit_price/100).toLocaleString(DIL.yerel):""}"></label>
          </div>
          <p class="kucuk" id="sat-kaynak">${esc(kaynakNotu(kaynak))}</p>
          <p class="kucuk" id="sat-ozet">${\u00E7("\u0130lan 72 saat a\xE7\u0131k kal\u0131r. Sat\u0131\u015Ftan sat\u0131\u015F vergisi ve %3 hizmet bedeli d\xFC\u015F\xFCl\xFCr.")}</p>
          <div class="form-mesaj"></div>
          <button class="dugme altin" type="submit">${ikon("store")}${\u00E7("\u0130lana koy")}</button></form>`:`<p class="bos">${\u00E7("\xC7antanda sat\u0131lacak \xFCr\xFCn yok.")}</p>`}
      </section>`}function ilanlarimKarti(){return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u0130lanlar\u0131n")}</p><h2 class="b2">${benim.open.length?\u00E7("{n} a\xE7\u0131k ilan",{n:benim.open.length}):\u00E7("A\xE7\u0131k ilan\u0131n \
yok")}</h2></div><span class="ik-kutu">${ikon("receipt-text")}</span></div>
        <div class="yigin">${benim.open.map(o=>`<div class="ilk-adim"><img src="${varlikResim(o.asset)}" alt="" width="40" height="40" style="border-radius:10px">
          <span><b>${esc(varlikAdi(o.asset))} \xB7 ${\u00E7("{kr} kr",{kr:kr(o.unit_price)})}</b><span class="kucuk">${\u00E7("{kalan} / {toplam} kald\u0131 \xB7 {yer}",{kalan:Number(o.qty_remaining),
toplam:Number(o.qty_total),yer:esc(bolgeAdi(o.region_id))})}${o.warehouse_id?" \xB7 "+\u00E7("depodan"):""}</span></span>
          <button class="dugme sade kucuk-d" data-iptal="${o.order_id}" data-depodan="${o.warehouse_id?1:0}">${\u00E7("Geri \xE7ek")}</button></div>`).join("")}
        ${benim.recent.slice(0,5).map(o=>`<div class="ilk-adim bitti"><img src="${varlikResim(o.asset)}" alt="" width="40" height="40" style="border-radius:10px">
          <span><b>${esc(varlikAdi(o.asset))} \xB7 ${\u00E7("{kr} kr",{kr:kr(o.unit_price)})}</b><span class="kucuk">${o.status==="filled"?\u00E7("sat\u0131ld\u0131"):o.status==="expired"?\u00E7("s\xFCre\
si doldu"):\u00E7("geri \xE7ekildi")} \xB7 ${\u00E7("{n} sat\u0131ld\u0131",{n:o.qty_total-o.qty_remaining})}</span></span><span></span></div>`).join("")}</div>
      </section>`}function fislerKarti(){const l=fisler.slice(0,8);return`<section class="kart" id="pazar-fisler">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u0130\u015Flem fi\u015Fleri")}</p><h2 class="b2">${l.length?\u00E7("Son al\u0131m ve sat\u0131\u015Flar\u0131n"):\u00E7("Hen\xFCz fi\u015Fin y\
ok")}</h2></div><span class="ik-kutu">${ikon("receipt-text")}</span></div>
        ${l.length?`<div class="yigin">${l.map((f,i)=>{const al=f.kind==="purchase"||f.kind==="contract_in",teslim=f.kind==="purchase"?f.delivery==="ship"?f.shipment?.status==="in_transit"?\u00E7("kar\
go yolda"):\u00E7("kargoyla geldi"):f.delivery==="warehouse"?\u00E7("depoda"):\u00E7("hemen"):"";return`<button type="button" class="ilk-adim fis-satir" data-fis="${i}" data-fis-tur="${esc(f.kind)}">
            <img src="${varlikResim(f.asset)}" alt="" width="40" height="40" style="border-radius:10px">
            <span><b>${esc(FIS_TUR[f.kind]??f.kind)} \xB7 ${esc(varlikAdi(f.asset))}</b>
              <span class="kucuk">${\u00E7("{n} \xD7 {kr} kr",{n:sayi(f.qty),kr:kr(f.unit_price)})} \xB7 ${esc(saatYaz(f.at))}${teslim?" \xB7 "+esc(teslim):""}</span></span>
            <span class="fis-tutar ${al?"eksi":"arti"}">${al?"\u2212"+kr(Number(f.total)+Number(f.freight_cr??0)):"+"+kr(f.seller_net)}</span></button>`}).join("")}</div>`:`<p class="bos">${\u00E7("Al\
\u0131m ve sat\u0131\u015Flar\u0131n burada fi\u015F olarak g\xF6r\xFCn\xFCr: vergi, hizmet bedeli, teslim \u015Fart\u0131 ve kargo.")}</p>`}
      </section>`}const SOZ_DURUM={offered:{ad:\u00E7("Yan\u0131t bekleniyor"),sinif:"altin"},accepted:{ad:\u00E7("Teslim s\xFCr\xFCyor"),sinif:"deniz"},completed:{ad:\u00E7("Tamamland\u0131"),sinif:"\
yesil"},declined:{ad:\u00E7("Reddedildi"),sinif:"mercan"},withdrawn:{ad:\u00E7("Geri \xE7ekildi"),sinif:""},cancelled:{ad:\u00E7("\u0130ptal edildi"),sinif:"mercan"},expired:{ad:\u00E7("S\xFCresi doldu"),
sinif:""}};function sozlesmeSatiri(k){const ben=k.role,d=SOZ_DURUM[k.status]??{ad:k.status,sinif:""},karsi=ben==="requester"?k.contractor:k.requester,dugmeler=[];k.status==="offered"&&ben==="contracto\
r"&&dugmeler.push(`<button class="dugme altin kucuk-d" data-soz-kabul="${esc(k.contract_id)}">${ikon("check")}${\u00E7("Kabul et")}</button>`,`<button class="dugme ikincil kucuk-d" data-soz-ret="${esc(
k.contract_id)}">${ikon("x")}${\u00E7("Reddet")}</button>`),k.status==="offered"&&ben==="requester"&&dugmeler.push(`<button class="dugme ikincil kucuk-d" data-soz-iptal="${esc(k.contract_id)}">${ikon(
"x")}${\u00E7("Geri \xE7ek")}</button>`),k.status==="accepted"&&ben==="contractor"&&dugmeler.push(`<button class="dugme altin kucuk-d" data-soz-teslim="${esc(k.contract_id)}">${ikon("package")}${\u00E7(
"Teslim et")}</button>`,`<button class="dugme sade kucuk-d" data-soz-iptal="${esc(k.contract_id)}">${\u00E7("B\u0131rak")}</button>`),k.status==="accepted"&&ben==="requester"&&dugmeler.push(`<button c\
lass="dugme sade kucuk-d" data-soz-iptal="${esc(k.contract_id)}">${\u00E7("\u0130ptal et")}</button>`);const asama=k.status==="offered"?\u00E7("Yan\u0131t i\xE7in son: {zaman}",{zaman:saatYaz(k.offer_expires_at)}):
k.status==="accepted"?\u00E7("Teslim i\xE7in son: {zaman}",{zaman:saatYaz(k.deliver_by)}):k.closed_at?\u00E7("Kapand\u0131: {zaman}",{zaman:saatYaz(k.closed_at)}):"";return`<article class="antlasma so\
z-satir" data-sozlesme="${esc(k.contract_id)}" data-durum="${esc(k.status)}" data-rol="${esc(ben)}">
        <div class="antlasma-bas"><span class="liste-ikon ${ben==="requester"?"lacivert":"yesil"}"><img src="${varlikResim(k.asset)}" alt="" width="34" height="34"></span>
          <div><span class="tur">${ben==="requester"?\u00E7("Senin sipari\u015Fin \u2192 {ad}",{ad:esc(karsi)}):\u00E7("{ad} senden istiyor",{ad:esc(karsi)})}</span>
            <b>${\u00E7("{n} {urun} \xB7 birimi {kr} kredi",{n:sayi(k.qty_total),urun:esc(varlikAdi(k.asset)),kr:kr(k.unit_price)})}</b>
            <div class="alt">${\u00E7("Teslim yeri {ulke} \xB7 {gun} g\xFCn \xB7 iptal bedeli {oran}",{ulke:esc(ulkeAdi(k.country_id)),gun:sayi(k.days),oran:ppmYuzde(k.cancel_fee_ppm)})}</div></div>
          <span class="cip ${d.sinif}">${esc(d.ad)}</span></div>
        ${k.status==="accepted"||k.status!=="offered"&&Number(k.qty_delivered)>0?`<div class="soz-ilerleme"><div class="cubuk"><i style="width:${Math.round(100*Number(k.qty_delivered)/Math.max(1,Number(
k.qty_total)))}%"></i></div>
          <span class="kucuk">${\u00E7("{d} / {n} teslim edildi \xB7 kalan bedel {kr} kredi",{d:sayi(k.qty_delivered),n:sayi(k.qty_total),kr:kr(k.budget_left_cr)})}</span></div>`:""}
        <p class="kucuk">${esc(asama)}${k.status==="cancelled"&&Number(k.cancel_fee_cr)>0?" \xB7 "+esc(\u00E7("iptal bedeli {kr} kredi",{kr:kr(k.cancel_fee_cr)})):""}</p>
        ${dugmeler.length?`<div class="oneri-dugmeler">${dugmeler.join("")}</div>`:""}
      </article>`}function sozlesmeKarti(){const acik=sozlesmeler.open??[],gecmis=(sozlesmeler.recent??[]).slice(0,5),bekleyen=acik.filter(k=>k.status==="offered"&&k.role==="contractor").length;return`\
<section class="kart" id="ozel-siparis">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xD6zel sipari\u015F")}</p><h2 class="b2">${acik.length?\u00E7("{n} a\xE7\u0131k s\xF6zle\u015Fme",{n:sayi(acik.length)}):\u00E7("A\xE7\u0131k \
s\xF6zle\u015Fmen yok")}</h2></div>
          ${bekleyen?`<span class="cip altin">${ikon("bell")}${\u00E7("{n} teklif yan\u0131t bekliyor",{n:sayi(bekleyen)})}</span>`:`<span class="ik-kutu">${ikon("notebook-pen")}</span>`}</div>
        <p class="kucuk" style="margin:0 0 10px">${\u00E7("Bir oyuncuya sabit i\u015F ver: mal, miktar, birim fiyat ve teslim s\xFCresi. Bedel teklif an\u0131nda kredinden ayr\u0131l\u0131r; teslim edildik\xE7e pazar sat\u0131\u015F\u0131 gi\
bi vergilenip \xF6denir. Teslim, teklif etti\u011Fin anda bulundu\u011Fun \xFClkede yap\u0131l\u0131r.")}</p>
        ${acik.length?`<div class="yigin">${acik.map(sozlesmeSatiri).join("")}</div>`:""}
        <div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme ikincil" type="button" id="ozel-yeni">${ikon("plus")}${\u00E7("Yeni \xF6zel sipari\u015F")}</button></div>
        ${gecmis.length?`<details class="soz-gecmis" style="margin-top:10px"><summary>${\u00E7("Kapanan s\xF6zle\u015Fmeler ({n})",{n:sayi(gecmis.length)})}</summary>
          <div class="yigin" style="margin-top:8px">${gecmis.map(sozlesmeSatiri).join("")}</div></details>`:""}
      </section>`}function ciz(){const oz=new Map(ozetler.map(x=>[x.asset,x])),sec=oz.get(secili);kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Pazar")}</p><h1 class="b1">${\u00E7("Al, sat")}</h1>
          <p class="aciklama">${\u00E7("\u0130lanlar b\xFCt\xFCn \xFClkelerden. Al\u0131c\u0131 ilandaki fiyat\u0131 \xF6der; vergi ve hizmet bedeli sat\u0131c\u0131n\u0131n pay\u0131ndan d\xFC\u015Fer. Mal bir \xFClkenin i\xE7inde hemen, \xFClkeler aras\u0131nda kargoyla g\
ider.")}</p></div>
          <div class="oneri-dugmeler"><button class="dugme ikincil kucuk-d" type="button" data-git-depo>${ikon("warehouse")}${\u00E7("Depo ve kargo")}</button>
            <button class="dugme ikincil kucuk-d" type="button" data-git-butik>${ikon("shopping-bag")}${\u00E7("Butik")}</button></div></div>
        <div id="carsi-yer"></div>
        <div class="pazar-urunler" role="tablist" aria-label="${\u00E7("\xDCr\xFCnler")}">${PAZAR_URUNLER.map(a=>{const x=oz.get(a);return`<button class="pazar-urun" role="tab" aria-selected="${a===secili}\
" data-urun="${a}">
            <img src="${varlikResim(a)}" alt=""><span><b>${esc(varlikAdi(a))}</b><span class="kucuk">${x?\u00E7("{kr} kr'den \xB7 {n}",{kr:kr(x.min_unit_price),n:Number(x.qty)}):\u00E7("ilan yok")}</s\
pan></span></button>`}).join("")}</div>
        <div class="izgara iki" style="margin-top:20px">
          <section class="kart" id="pazar-ilanlar">${ilanlarHtml(oz)}</section>
          <div class="yigin">
            ${satisKarti(sec)}
            ${ilanlarimKarti()}
          </div>
        </div>
        <div class="izgara iki" style="margin-top:20px">
          ${sozlesmeKarti()}
          ${fislerKarti()}
        </div></div>`,$("#carsi-yer",kap)?.replaceWith(carsi.el),carsiYaz(),bagla()}async function islem(fn,args,mesaj,ik="store"){try{await Sunucu.yap(fn,args),mesaj&&tost(mesaj,ik)}catch(e){tost(hataMetni(
e),"circle-alert")}await tazele()}function bagla(){for(const b of $$("[data-urun]",kap))b.onclick=async()=>{secili=b.dataset.urun;try{sessionStorage.setItem("civora.pazar",secili)}catch{}for(const x of $$(
"[data-urun]",kap))x.setAttribute("aria-selected",String(x.dataset.urun===secili));carsiYaz(),await ilanTazele()};ilanlarBagla();for(const b of $$("[data-git-depo]",kap))b.onclick=()=>Kabuk.git("sehir\
/depo");for(const b of $$("[data-git-butik]",kap))b.onclick=()=>Kabuk.git("sehir/butik");for(const b of $$("[data-iptal]",kap))b.onclick=()=>islem("market_cancel_order",{p_order_id:b.dataset.iptal},b.
dataset.depodan==="1"?\u00E7("\u0130lan geri \xE7ekildi; \xFCr\xFCnler depoya d\xF6nd\xFC."):\u00E7("\u0130lan geri \xE7ekildi; \xFCr\xFCnler \xE7antana d\xF6nd\xFC."));for(const b of $$("[data-fis]",
kap))b.onclick=()=>{const f2=fisler[Number(b.dataset.fis)];f2&&fisPenceresi(f2)};sozlesmeBagla();const f=$("#sat-form",kap);if(!f)return;const ks=$("select[name=kaynak]",f);ks&&(ks.onchange=()=>{kaynak=
ks.value;const vs=$("select[name=varlik]",f);vs.innerHTML=urunSecenekleri(kaynak,secili)||`<option value="">${esc(\u00E7("Bu kaynakta sat\u0131lacak mal yok"))}</option>`,$("#sat-kaynak",f).textContent=
kaynakNotu(kaynak)}),f.addEventListener("submit",async e=>{e.preventDefault();const v=new FormData(f),[urun,q]=String(v.get("varlik")??"").split("@"),miktar=adetAl(v.get("miktar")),fiyat=krediAlt(v.get(
"fiyat")),yer=$(".form-mesaj",f),dugme=$("button[type=submit]",f);if(!urun||!q||!(miktar>0)||!(fiyat>0)){formSerbest(f),yer.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("M\
iktar ve fiyat\u0131 denetle.")}</span></div>`;return}dugme&&(dugme.disabled=!0);try{await Sunucu.yap("market_create_order",{p_product:urun,p_quality:Number(q),p_qty:miktar,p_unit_price:fiyat,...kaynak?
{p_warehouse:kaynak}:{}}),tost(\u00E7("\u0130lan\u0131n pazarda."),"store"),secili=`${urun}@${q}`,await tazele()}catch(err){yer.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(
err))}</span></div>`}finally{dugme&&(dugme.disabled=!1),formSerbest(f)}})}const sozBul=id=>[...sozlesmeler.open??[],...sozlesmeler.recent??[]].find(k=>k.contract_id===id);function sozlesmeBagla(){$("#\
ozel-yeni",kap)?.addEventListener("click",yeniSozlesme);for(const b of $$("[data-soz-kabul]",kap))b.onclick=()=>{const k=sozBul(b.dataset.sozKabul);pencere({ust:\u00E7("\xD6zel sipari\u015F"),baslik:\u00E7(
"Sipari\u015Fi kabul et"),govde:`<p class="aciklama">${\u00E7("{n} {urun} teslim edeceksin; birimi {kr} kredi. Teslim {ulke} i\xE7inde: orada bulunmal\u0131s\u0131n ya da mal oradaki deponda olmal\u0131. S\xFCre kabulden \
itibaren {gun} g\xFCn.",{n:sayi(k?.qty_total??0),urun:esc(varlikAdi(k?.asset??"")),kr:kr(k?.unit_price??0),ulke:esc(ulkeAdi(k?.country_id)),gun:sayi(k?.days??0)})}</p>
            <p class="kucuk">${\u00E7("Her teslim pazar sat\u0131\u015F\u0131 gibi vergilenir ({oran} vergi ve hizmet bedeli). B\u0131rak\u0131rsan kalan bedel isteyene d\xF6ner.",{oran:ppmYuzde(k?.tax_rate_ppm??
0)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Kabul et"),sinif:"altin",ikon:"check",is:()=>islem("contract_respond",{p_contract:b.dataset.sozKabul,p_accept:!0},\u00E7("Sipari\u015Fi kabul ettin\
; teslim edebilirsin."),"notebook-pen")}]})};for(const b of $$("[data-soz-ret]",kap))b.onclick=()=>islem("contract_respond",{p_contract:b.dataset.sozRet,p_accept:!1},\u00E7("Sipari\u015Fi reddettin."),
"notebook-pen");for(const b of $$("[data-soz-iptal]",kap))b.onclick=()=>{const k=sozBul(b.dataset.sozIptal);if(!k)return;const isteyen=k.role==="requester",bedel=isteyen&&k.status==="accepted"?Math.floor(
Number(k.budget_left_cr)*Number(k.cancel_fee_ppm)/1e6):0,metin=isteyen?k.status==="offered"?\u00E7("Teklifi geri \xE7ekersen ayr\u0131lan bedelin tamam\u0131 ({kr} kredi) kredine d\xF6ner.",{kr:kr(k.budget_left_cr)}):
\u00E7("Kabul edilmi\u015F sipari\u015Fi iptal ediyorsun: iptal bedeli {bedel} kredi \xFCstlenene ge\xE7er (vergisi ve hizmet bedeliyle), kalan {kalan} kredi sana d\xF6ner.",{bedel:kr(bedel),kalan:kr(
Number(k.budget_left_cr)-bedel)}):\u00E7("Sipari\u015Fi b\u0131rak\u0131rsan kalan bedel ({kr} kredi) isteyene d\xF6ner; teslim etti\u011Fin k\u0131sm\u0131n paras\u0131 sende kal\u0131r.",{kr:kr(k.budget_left_cr)});
pencere({ust:\u00E7("\xD6zel sipari\u015F"),baslik:isteyen?k.status==="offered"?\u00E7("Teklifi geri \xE7ek"):\u00E7("Sipari\u015Fi iptal et"):\u00E7("Sipari\u015Fi b\u0131rak"),govde:`<p class="acikl\
ama">${metin}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:isteyen?k.status==="offered"?\u00E7("Geri \xE7ek"):\u00E7("\u0130ptal et"):\u00E7("B\u0131rak"),sinif:"mercan",ikon:"x",is:()=>islem("contract\
_cancel",{p_contract:k.contract_id},\u00E7("S\xF6zle\u015Fme kapand\u0131."),"notebook-pen")}]})};for(const b of $$("[data-soz-teslim]",kap))b.onclick=()=>teslimPenceresi(sozBul(b.dataset.sozTeslim))}
function teslimPenceresi(k){if(!k)return;const kaynaklar=[...lojistik?.country_id===k.country_id?[{deger:"bag",ad:\u00E7("\xC7antam ({n} var)",{n:sayi(Durum.stok(k.asset))})}]:[],...depolar().filter(w=>w.
country_id===k.country_id).map(w=>({deger:"w:"+w.warehouse_id,ad:\u00E7("{ulke} deposu ({n} var)",{ulke:ulkeAdi(w.country_id),n:sayi((w.balances??[]).find(x=>x.asset===k.asset)?.spendable??0)})}))];pencereForm(
{ust:\u00E7("\xD6zel sipari\u015F"),baslik:\u00E7("{urun} teslim et",{urun:varlikAdi(k.asset)}),onayAd:\u00E7("Teslim et"),onayIkon:"package",govde:kaynaklar.length?`<label class="alan"><span>${\u00E7(
"Nereden")}</span><select name="kaynak">${kaynaklar.map(x=>`<option value="${esc(x.deger)}">${esc(x.ad)}</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Miktar (kalan {n})",{n:sayi(k.qty_left)})}</span><input name="miktar" inputmode="numeric" value="${Number(k.qty_left)}"></label>
          <p class="kucuk">${\u00E7("Her teslim pazar sat\u0131\u015F\u0131 gibi vergilenir: {oran} sat\u0131\u015F vergisi ({ulke}) ve hizmet bedeli d\xFC\u015F\xFCl\xFCr; kalan eline ge\xE7er.",{oran:ppmYuzde(
k.tax_rate_ppm),ulke:esc(ulkeAdi(k.country_id))})}</p>`:`<div class="bilgi-kutusu uyari-kutusu">${ikon("circle-alert")}<span>${\u00E7("Teslim {ulke} i\xE7inde yap\u0131l\u0131r: oraya git ya da mal\u0131 oradaki depona\
 kargoyla g\xF6nder (\u015Eehrim \u2192 Depo).",{ulke:esc(ulkeAdi(k.country_id))})}</span></div>`,is:async v=>{if(!kaynaklar.length)throw new Error(\u00E7("Teslim i\xE7in mal\u0131n s\xF6zle\u015Fmenin \xFClkesinde olma\
l\u0131."));const miktar=adetAl(v.get("miktar"));if(!(miktar>0))throw new Error(\u00E7("Miktar\u0131 denetle."));const kay=String(v.get("kaynak")),r=await Sunucu.yap("contract_deliver",{p_contract:k.contract_id,
p_qty:miktar,p_source:kay==="bag"?{kind:"bag"}:{kind:"warehouse",id:kay.slice(2)}});tost(\u00E7("{n} {urun} teslim ettin; eline {kr} kredi ge\xE7ti.",{n:sayi(miktar),urun:varlikAdi(k.asset),kr:kr(r?.seller_net??
0)}),"package"),await tazele()}})}function yeniSozlesme(){const r=sozlesmeler.rules?.contract??{minDays:1,maxDays:14,cancelFeeMaxPpm:2e5,offerExpiryH:72},yerim=lojistik?.country_id??Durum.v.ozet?.character?.
citizenship,p=pencereForm({ust:\u00E7("\xD6zel sipari\u015F"),baslik:\u00E7("Yeni \xF6zel sipari\u015F"),onayAd:\u00E7("Teklif et"),onayIkon:"send",govde:`<label class="alan"><span>${\u00E7("Kime (oyu\
ncunun ad\u0131)")}</span><input name="ad" autocomplete="off" maxlength="40"></label>
          <label class="alan"><span>${\u00E7("\xDCr\xFCn")}</span><select name="urun">${PAZAR_URUNLER.map(a=>`<option value="${a}" ${a===secili?"selected":""}>${esc(varlikAdi(a))}</option>`).join("")}\
</select></label>
          <div class="izgara" style="grid-template-columns:1fr 1fr;gap:12px">
            <label class="alan"><span>${\u00E7("Miktar")}</span><input name="miktar" inputmode="numeric" value="10"></label>
            <label class="alan"><span>${\u00E7("Birim fiyat (kredi)")}</span><input name="fiyat" inputmode="decimal" value="1"></label>
            <label class="alan"><span>${\u00E7("Teslim s\xFCresi (g\xFCn)")}</span><input name="gun" type="number" inputmode="numeric" min="${r.minDays}" max="${r.maxDays}" value="${Math.min(r.maxDays,
3)}"></label>
            <label class="alan"><span>${\u00E7("\u0130ptal bedeli (%)")}</span><input name="iptal" inputmode="decimal" value="10"></label>
          </div>
          <p class="kucuk" id="soz-butce"></p>
          <p class="kucuk">${\u00E7("Teslim yeri bulundu\u011Fun \xFClke ({ulke}); vergi o \xFClkenin bug\xFCnk\xFC oran\u0131yla kilitlenir. \xDCstlenen {saat} saat i\xE7inde yan\u0131tlar; kabulden \xF6nce geri \xE7ekersen bedel tamamen \
d\xF6ner. \u0130ptal bedeli en \xE7ok {oran}.",{ulke:esc(ulkeAdi(yerim)),saat:sayi(r.offerExpiryH),oran:ppmYuzde(r.cancelFeeMaxPpm)})}</p>`,is:async v=>{const ad=String(v.get("ad")??"").trim(),[urun,q]=String(
v.get("urun")).split("@"),miktar=adetAl(v.get("miktar")),fiyat=krediAlt(v.get("fiyat")),gun=adetAl(v.get("gun")),iptal=yuzdePpm(v.get("iptal"));if(!ad)throw new Error(\u00E7("Oyuncunun ad\u0131n\u0131 yaz."));
if(!(miktar>0)||!(fiyat>0)||!(gun>0)||!(iptal>=0))throw new Error(\u00E7("Miktar, fiyat, s\xFCre ve iptal bedelini denetle."));await Sunucu.yap("contract_offer",{p_contractor_name:ad,p_product:urun,p_quality:Number(
q),p_qty:miktar,p_unit_price:fiyat,p_days:gun,p_cancel_fee_ppm:iptal}),tost(\u00E7("\xD6zel sipari\u015F g\xF6nderildi; bedel kredinden ayr\u0131ld\u0131."),"send"),await tazele()}}),butce=()=>{const d=new FormData(
p.form),m=adetAl(d.get("miktar")),f=krediAlt(d.get("fiyat")),el=$("#soz-butce",p.form);el&&(el.textContent=m>0&&f>0?\u00E7("Ayr\u0131lacak bedel: {kr} kredi ({n} \xD7 {f} kredi).",{kr:kr(m*f),n:sayi(m),
f:kr(f)}):\u00E7("Miktar ve fiyat\u0131 yaz."))};p.form.addEventListener("input",butce),butce()}function alPenceresi(o){if(!o)return;let miktar=1,teslim=null,sonTeklif=null;const ulke=o.country_id??o.
tax_country_id;pencere({ust:\u00E7("Sat\u0131n al"),baslik:`${varlikAdi(o.asset)} \xB7 ${\u00E7("{kr} kredi",{kr:kr(o.unit_price)})}`,govde:`<p class="aciklama">${\u00E7("{yer} pazar\u0131ndan ({ulke}). \u0130l\
anda {n} adet var.",{yer:esc(bolgeAdi(o.region_id)),ulke:esc(ulkeAdi(ulke)),n:Number(o.qty_remaining)})}</p>
          <label class="alan" style="margin-top:12px"><span>${\u00E7("Miktar")}</span><input id="al-miktar" inputmode="numeric" value="1"></label>
          <div id="al-teslim" style="margin-top:12px">${o.local?`<p class="kucuk">${ikon("check")} ${\u00E7("\u0130lan bulundu\u011Fun \xFClkede: mal hemen \xE7antana girer.")}</p>`:`<p class="kucuk">${\u00E7(
"Teslim \u015Fart\u0131 okunuyor\u2026")}</p>`}</div>
          <p class="kucuk" id="al-toplam" style="margin-top:8px">${\u00E7("Toplam: {kr} kredi",{kr:kr(o.unit_price)})}</p>
          <p class="kucuk" id="al-indirim" style="margin-top:4px" hidden></p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Sat\u0131n al"),sinif:"altin",is:async()=>{try{const t=await Sunucu.cagir(
"market_quote",{p_order_id:o.order_id,p_qty:miktar}),mod=t.delivery?.local?null:teslim??(t.delivery?.modes?.includes("ship")?"ship":"warehouse"),beklenen=mod==="ship"?t.ship_total:t.total,r=await Sunucu.
yap("market_buy",{p_order_id:o.order_id,p_qty:miktar,p_expected_total:beklenen,...mod?{p_delivery:mod}:{}});mod==="ship"?tost(\u00E7("{n} {urun} ald\u0131n ({kr} kredi); kargo {dk} dakikada gelir (\u015Eehrim \u2192\
 Depo).",{n:miktar,urun:varlikAdi(o.asset),kr:kr(beklenen),dk:sayi(r?.shipment?.minutes??0)}),"truck"):mod==="warehouse"?tost(\u00E7("{n} {urun} ald\u0131n ({kr} kredi); {ulke} deposunda (\u015Eehrim \u2192 Depo).",
{n:miktar,urun:varlikAdi(o.asset),kr:kr(beklenen),ulke:ulkeAdi(ulke)}),"warehouse"):tost(\u00E7("{n} {urun} ald\u0131n ({kr} kredi).",{n:miktar,urun:varlikAdi(o.asset),kr:kr(t.total)}),"store")}catch(e){
tost(hataMetni(e),"circle-alert")}await tazele()}}]});const toplamYaz=t=>{const top=document.getElementById("al-toplam");if(!top)return;const mal=t?Number(t.total):miktar*o.unit_price,navlun=teslim===
"ship"?Number(sonTeklif?.delivery?.ship?.fee_cr??0):0;top.textContent=navlun>0?\u00E7("Toplam: {kr} kredi (mal {mal} + navlun {navlun})",{kr:kr(mal+navlun),mal:kr(mal),navlun:kr(navlun)}):\u00E7("Topl\
am: {kr} kredi",{kr:kr(mal)})},teslimYaz=t=>{const yer=document.getElementById("al-teslim"),dl=t?.delivery;if(!yer||!dl||dl.local)return;const gemi=dl.modes?.includes("ship");(!teslim||teslim==="ship"&&
!gemi)&&(teslim=gemi?"ship":"warehouse");const s=dl.ship??{};yer.innerHTML=`<p class="ust-yazi" style="margin:0 0 6px">${\u00E7("Teslim \u015Fart\u0131")}</p><div class="radyo-liste">
          <label class="radyo"><input type="radio" name="teslim" value="ship" ${teslim==="ship"?"checked":""} ${gemi?"":"disabled"}>
            <span><b>${ikon("truck")} ${\u00E7("Bana g\xF6nder")}</b><span class="kucuk">${gemi?\u00E7("Kargoyla {dk} dakikada bulundu\u011Fun yere ({yer}) gelir; navlun {kr} kredi.",{dk:sayi(s.minutes??
0),yer:esc(bolgeAdi(Durum.v.ozet?.character?.location)),kr:kr(s.fee_cr??0)})+(s.trade_discount?" "+\u00E7("Ticaret anla\u015Fmas\u0131yla navlun yar\u0131."):"")+((s.lines??[]).length?" "+\u00E7("Yol \
ortak hattan ge\xE7iyor."):""):s.at_war?\u00E7("\u0130ki \xFClke sava\u015Fta: kargo \xE7\u0131kmaz. Mal yaln\u0131z depoda tutulur."):\u00E7("Bu iki yer aras\u0131nda yol yok.")}</span></span></label\
>
          <label class="radyo"><input type="radio" name="teslim" value="warehouse" ${teslim==="warehouse"?"checked":""}>
            <span><b>${ikon("warehouse")} ${\u00E7("Depoda tut")}</b><span class="kucuk">${\u00E7("Navlunsuz. Mal {ulke} deposunda kal\u0131r; oradan sonra g\xF6nderebilir, satabilir ya da teslim edebilirsin.",
{ulke:esc(ulkeAdi(dl.country_id))})}</span></span></label></div>`;for(const r of $$("input[name=teslim]",yer))r.onchange=()=>{teslim=r.value,toplamYaz(sonTeklif)}};let teklifSaat=null,teklifNo=0;const teklifYaz=async()=>{
const no=++teklifNo,t=await Sunucu.cagir("market_quote",{p_order_id:o.order_id,p_qty:miktar}).catch(()=>null);if(no!==teklifNo||!t)return;sonTeklif=t,teslimYaz(t),toplamYaz(t);const ind=document.getElementById(
"al-indirim");ind&&(ind.hidden=!(Number(t.tax_discount)>0),ind.textContent=Number(t.tax_discount)>0?Number(t.tax_discount_ppm)>=1e6?\u00E7("G\xFCmr\xFCk birli\u011Fi: sat\u0131\u015F vergisi yok (\u2212{kr} kredi).",
{kr:kr(t.tax_discount)}):\u00E7("Ticaret anla\u015Fmas\u0131: sat\u0131\u015F vergisinin {oran} kadar\u0131n\u0131 \xF6demezsin (\u2212{kr} kredi).",{oran:ppmYuzde(t.tax_discount_ppm),kr:kr(t.tax_discount)}):
"")};teklifYaz();const g=document.getElementById("al-miktar");g?.addEventListener("input",()=>{miktar=Math.max(1,Math.min(o.qty_remaining,adetAl(g.value)||1)),toplamYaz(null),clearTimeout(teklifSaat),
teklifSaat=setTimeout(teklifYaz,250)})}async function tazele(){try{await yukle(),ciz()}catch(e){tost(hataMetni(e),"circle-alert")}}await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^(market\.|contract\.|shipment\.)/.
test(olay)&&tazele()}),nabizZaman=setInterval(async()=>{if(document.visibilityState!=="visible")return;const[oz,nb,sh]=await Promise.all([Sunucu.cagir("market_overview").catch(()=>null),Sunucu.cagir("\
market_pulse").catch(()=>null),Sunucu.cagir("city_pulse").catch(()=>null)]);oz&&(ozetler=oz),nb&&(nabiz=nb),sh&&(sehir=sh),carsiYaz()},6e4);return()=>{b1(),clearInterval(nabizZaman),carsi.kapat()}}}),
Parcalar.tamam("ek_26_pazar");
