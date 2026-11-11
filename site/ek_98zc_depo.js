// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_98zc_depo.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/depo",{async ac(kap){let v=null,harita=null,teklif=null,teklifNo=0,teklifSaat=null,durdur=()=>{},geriZaman=null,yoldaAnahtar="";const bekleme={n:0},form={kaynak:"bag",varlik:null,hedef:null,
miktar:"1",yol:"kargo"};try{const x=JSON.parse(sessionStorage.getItem("civora.depo")??"null");sessionStorage.removeItem("civora.depo"),x?.kaynak&&Object.assign(form,x,{yol:"kargo"})}catch{}async function yukle(){
[v,harita]=await Promise.all([Sunucu.cagir("logistics_me"),Durum.harita(),Durum.ozet()]);const a=(v.in_transit??[]).map(s=>s.shipment_id).join(",");a!==yoldaAnahtar&&(yoldaAnahtar=a,bekleme.n=0)}const depoBul=id=>(v.
warehouses??[]).find(w=>w.warehouse_id===id)??null,isletmeBul=id=>(v.companies??[]).find(c=>c.company_id===id)??null,cantam=()=>(Durum.v.ozet?.balances??[]).filter(b=>b.asset!=="CR"&&Number(b.amount)>
0).map(b=>({asset:b.asset,amount:Number(b.amount),held:Number(b.amount)-Number(b.spendable),spendable:Number(b.spendable)}));function kaynakMallari(k){return k==="bag"?cantam().filter(b=>b.spendable>0):
k.startsWith("w:")?(depoBul(k.slice(2))?.balances??[]).filter(b=>Number(b.spendable)>0):k.startsWith("c:")?(isletmeBul(k.slice(2))?.balances??[]).filter(b=>Number(b.spendable)>0):[]}const ucJson=(k,hedefMi)=>k===
"bag"?{kind:"bag"}:k.startsWith("w:")?{kind:"warehouse",id:k.slice(2)}:k.startsWith("u:")?hedefMi?{kind:"warehouse",country:k.slice(2)}:null:k.startsWith("c:")?{kind:"company",id:k.slice(2)}:null,ucAdi=k=>{
if(k==="bag")return \u00E7("\xC7antam ({yer})",{yer:bolgeAdi(v.location)});if(k.startsWith("w:")){const w=depoBul(k.slice(2));return w?\u00E7("{ulke} deposu ({yer})",{ulke:ulkeAdi(w.country_id),yer:bolgeAdi(
w.region_id)}):""}if(k.startsWith("u:")){const u=k.slice(2),w=(v.warehouses??[]).find(x=>x.country_id===u);return w?\u00E7("{ulke} deposu ({yer})",{ulke:ulkeAdi(u),yer:bolgeAdi(w.region_id)}):\u00E7("\
{ulke} deposu (ba\u015Fkentte a\xE7\u0131l\u0131r)",{ulke:ulkeAdi(u)})}if(k.startsWith("c:")){const c=isletmeBul(k.slice(2));return c?\u00E7("{isletme} ({yer})",{isletme:c.name,yer:bolgeAdi(c.region_id)}):
""}return""};function kaynaklar(){return["bag",...(v.warehouses??[]).map(w=>"w:"+w.warehouse_id),...(v.companies??[]).map(c=>"c:"+c.company_id)]}function hedefler(){return["bag",...[...new Set([...harita?.
open_countries??[],...(v.warehouses??[]).map(w=>w.country_id)])].filter(Boolean).sort((a,b)=>ulkeAdi(a).localeCompare(ulkeAdi(b),DIL.yerel)).map(u=>"u:"+u),...(v.companies??[]).map(c=>"c:"+c.company_id)].
filter(k=>!ayniYer(form.kaynak,k))}function ayniYer(a,b){return a===b?!0:a.startsWith("w:")&&b.startsWith("u:")?depoBul(a.slice(2))?.country_id===b.slice(2):!1}function formDuzelt(){kaynaklar().includes(
form.kaynak)||(form.kaynak="bag");const mallar=kaynakMallari(form.kaynak);mallar.some(b=>b.asset===form.varlik)||(form.varlik=mallar[0]?.asset??null);const h=hedefler(),yabanci=k=>k.startsWith("u:")&&
k.slice(2)!==v.country_id,deposuVar=k=>(v.warehouses??[]).some(w=>w.country_id===k.slice(2));h.includes(form.hedef)||(form.hedef=h.find(k=>yabanci(k)&&deposuVar(k))??h.find(yabanci)??h.find(k=>k!=="ba\
g")??h[0]??null)}const satir=(b,dugmeler)=>`<div class="ilk-adim depo-mal" data-mal="${esc(b.asset)}"><img src="${varlikResim(b.asset)}" alt="" width="40" height="40" style="border-radius:10px">
      <span><b>${esc(varlikAdi(b.asset))} \xB7 ${sayi(b.spendable)}</b>${Number(b.held)>0?`<span class="kucuk">${\u00E7("{n} ilanda, yolda ya da ayr\u0131lm\u0131\u015F",{n:sayi(b.held)})}</span>`:""}\
</span>
      <span class="oneri-dugmeler">${dugmeler}</span></div>`;function cantaKarti(){const l=cantam();return`<section class="kart" id="depo-canta">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xC7antan")}</p><h2 class="b2">${esc(bolgeAdi(v.location))}</h2></div><span class="ik-kutu">${ikon("package")}</span></div>
        <p class="kucuk" style="margin:0 0 10px"><span class="ulke-nokta" style="background:${ulkeRenk(v.country_id)}"></span> ${\u00E7("\xC7anta seninle gider; i\xE7indeki mal bulundu\u011Fun \xFClkede ({ulke}) sa\
y\u0131l\u0131r.",{ulke:esc(ulkeAdi(v.country_id))})}</p>
        ${l.length?`<div class="yigin">${l.map(b=>satir(b,Number(b.spendable)>0?`<button class="dugme ikincil kucuk-d" data-gonder="bag" data-varlik="${esc(b.asset)}">${ikon("send")}${\u00E7("G\xF6nder")}\
</button>
          <button class="dugme sade kucuk-d" data-sat="" data-varlik="${esc(b.asset)}">${\u00E7("Sat")}</button>`:"")).join("")}</div>`:`<p class="bos">${\u00E7("\xC7antan bo\u015F.")}</p>`}
      </section>`}function depoKarti(w){const l=(w.balances??[]).filter(b=>Number(b.amount)>0||Number(b.held)>0);return`<section class="kart depo-kart" data-depo="${esc(w.warehouse_id)}" data-depo-ulk\
e="${esc(w.country_id)}">
        <div class="kart-bas"><div><p class="ust-yazi"><span class="ulke-nokta" style="background:${ulkeRenk(w.country_id)}"></span> ${\u00E7("{ulke} deposu",{ulke:esc(ulkeAdi(w.country_id))})}</p>
          <h2 class="b2">${esc(bolgeAdi(w.region_id))}</h2></div>
          ${w.here?`<span class="cip yesil">${ikon("map-pin")}${\u00E7("Bu \xFClkedesin")}</span>`:`<span class="ik-kutu">${ikon("warehouse")}</span>`}</div>
        ${Number(w.open_orders)>0?`<p class="kucuk" style="margin:0 0 8px">${\u00E7("{n} a\xE7\u0131k ilan bu depodan.",{n:sayi(w.open_orders)})}</p>`:""}
        ${l.length?`<div class="yigin">${l.map(b=>satir(b,Number(b.spendable)>0?`${w.here?`<button class="dugme altin kucuk-d" data-cantaya="${esc(w.warehouse_id)}" data-varlik="${esc(b.asset)}" data-\
n="${Number(b.spendable)}">${ikon("package")}${\u00E7("\xC7antana al")}</button>`:""}
          <button class="dugme ikincil kucuk-d" data-gonder="w:${esc(w.warehouse_id)}" data-varlik="${esc(b.asset)}">${ikon("send")}${\u00E7("G\xF6nder")}</button>
          <button class="dugme sade kucuk-d" data-sat="${esc(w.warehouse_id)}" data-varlik="${esc(b.asset)}">${\u00E7("Sat")}</button>`:"")).join("")}</div>`:`<p class="bos">${\u00E7("Depo bo\u015F.")}\
</p>`}
        <p class="kucuk" style="margin-top:8px">${w.here?\u00E7("Bu \xFClkedesin: depodaki mal hemen \xE7antana al\u0131n\u0131r, ilana konur ya da kamu sipari\u015Fine ve \xF6zel sipari\u015Fe teslim edilir."):
\u00E7("Bu \xFClkede de\u011Filsin: mal\u0131 kargoyla g\xF6nderebilir ya da buradan ilana koyabilirsin (ilan deponun yerinde a\xE7\u0131l\u0131r).")}</p>
      </section>`}function gonderKarti(){formDuzelt();const mallar=kaynakMallari(form.kaynak),sinir=v.rules?.shipment??{};return`<section class="kart" id="depo-gonder">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Mal g\xF6nder")}</p><h2 class="b2">${\u00E7("Nereden nereye")}</h2></div><span class="ik-kutu">${ikon("truck")}</span></div>
        <form class="form" id="gonder-form" novalidate>
          <label class="alan"><span>${\u00E7("Nereden")}</span><select name="kaynak">${kaynaklar().map(k=>`<option value="${esc(k)}" ${k===form.kaynak?"selected":""}>${esc(ucAdi(k))}</option>`).join("")}\
</select></label>
          <div class="izgara" style="grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:12px">
            <label class="alan"><span>${\u00E7("Mal")}</span><select name="varlik">${mallar.length?mallar.map(b=>`<option value="${esc(b.asset)}" ${b.asset===form.varlik?"selected":""}>${esc(varlikAdi(
b.asset))} (${sayi(b.spendable)})</option>`).join(""):`<option value="">${esc(\u00E7("Burada g\xF6nderilecek mal yok"))}</option>`}</select></label>
            <label class="alan"><span>${\u00E7("Miktar")}</span><input name="miktar" inputmode="numeric" value="${esc(form.miktar)}"></label>
          </div>
          <label class="alan"><span>${\u00E7("Nereye")}</span><select name="hedef">${hedefler().map(k=>`<option value="${esc(k)}" ${k===form.hedef?"selected":""}>${esc(ucAdi(k))}</option>`).join("")}<\
/select></label>
          <div id="gonder-teklif" class="gonder-teklif" aria-live="polite">${teklifHtml()}</div>
          <div class="form-mesaj"></div>
          <button class="dugme altin" type="submit" ${mallar.length?"":"disabled"}>${ikon("send")}${teklif?.instant?\u00E7("Aktar"):\u00E7("G\xF6nder")}</button>
        </form>
        <p class="kucuk" style="margin-top:10px">${\u00E7("Kargo s\xFCresi yolculuk gibi: kenar ba\u015F\u0131na {dk} dakika, en \xE7ok {en} dakika. Navlun ilk kenar {a} kredi, her ek kenar {b} kredi, en \xE7ok {c} kred\
i; ticaret anla\u015Fmal\u0131 \xFClkeler aras\u0131nda yar\u0131. Yolda en \xE7ok {n} kargon olabilir.",{dk:sayi(sinir.minutesPerEdge??15),en:sayi(sinir.maxMinutes??120),a:kr(sinir.feeBaseCr??100),b:kr(
sinir.feePerEdgeCr??50),c:kr(sinir.feeMaxCr??500),n:sayi(sinir.maxActive??20)})}</p>
      </section>`}const ARAC_KARGO_NEDEN={VEHICLE_CARGO_OFF:\u00E7("Kendi arac\u0131nla kargo \u015Fu an kapal\u0131."),VEHICLE_NO_CARGO:\u00E7("Bisiklet y\xFCk ta\u015F\u0131maz."),VEHICLE_BUSY:\u00E7(
"Ara\xE7 ba\u015Fka bir kargoda."),VEHICLE_RENTED_OUT:\u00E7("Ara\xE7 kirada."),VEHICLE_CARGO_FAR:\u00E7("Kendi arac\u0131nla yaln\u0131z kom\u015Fu \xFClkeye ta\u015F\u0131rs\u0131n."),VEHICLE_CARGO_ROUTE:\u00E7(
"Arac\u0131n gidebilece\u011Fi yol yok (tekne yaln\u0131z denizden gider)."),VEHICLE_WORN_OUT:\u00E7("Bu yola yetecek \xF6mr\xFC yok; \xF6nce onar."),VEHICLE_RENT_ENDS:\u00E7("Kiral\u0131\u011F\u0131n s\xFCresi bu yola\
 yetmiyor.")},KENDI_ARACINLA={motosiklet:\u00E7("Kendi motosikletinle"),otomobil:\u00E7("Kendi otomobilinle"),tekne:\u00E7("Kendi teknenle"),bisiklet:\u00E7("Kendi bisikletinle")},KIRALIK_ARACLA={motosiklet:\u00E7(
"Kiralad\u0131\u011F\u0131n motosikletle"),otomobil:\u00E7("Kiralad\u0131\u011F\u0131n otomobille"),tekne:\u00E7("Kiralad\u0131\u011F\u0131n tekneyle"),bisiklet:\u00E7("Kiralad\u0131\u011F\u0131n bisikletle")},
aracNedeni=x=>x.code==="VEHICLE_CARGO_CAPACITY"?\u00E7("Bir seferde en \xE7ok {n} adet ta\u015F\u0131r.",{n:sayi(x.capacity??0)}):ARAC_KARGO_NEDEN[x.code]??\u00E7("Bu ara\xE7la ta\u015F\u0131nmaz."),teklifAraclari=()=>teklif&&
!teklif.hata&&!teklif.instant?teklif.vehicles??[]:[];function yolDuzelt(){form.yol!=="kargo"&&!teklifAraclari().some(x=>x.medium===form.yol&&!x.code)&&(form.yol="kargo")}function aracSecenekleri(t){const l=t.
vehicles??[];return l.length?`<div class="yol-secim" role="radiogroup" aria-label="${esc(\u00E7("Nas\u0131l g\xF6nderilsin"))}">
        <label class="secim-satir"><input type="radio" name="yol" value="kargo" ${form.yol==="kargo"?"checked":""}>
          <span><b>${\u00E7("Kargoyla")}</b> <small>${esc(t.no_route||t.at_war?\u00E7("bu yolda kargo \xE7\u0131kmaz"):\u00E7("{dk} dakika \xB7 navlun {kr} kredi",{dk:sayi(t.minutes),kr:kr(t.fee_cr)}))}\
</small></span></label>
        ${l.map(x=>`<label class="secim-satir${x.code?" kapali":""}" data-yol-arac="${esc(x.medium)}" data-yol-arac-kod="${esc(x.code??"")}">
          <input type="radio" name="yol" value="${esc(x.medium)}" ${x.code?"disabled":""} ${form.yol===x.medium&&!x.code?"checked":""}>
          <span><b class="depo-arac">${ikon(ARAC_IK[x.kind]??"car")}${esc((x.rented?KIRALIK_ARACLA:KENDI_ARACINLA)[x.kind]??aracAdi(x.kind))}</b>
            <span class="plaka kucuk-plaka">${esc(x.plate??"")}</span>
            <small>${esc(x.code?aracNedeni(x):\u00E7("{dk} dakika \xB7 navlun yok \xB7 a\u015F\u0131nma {a} \u2192 {b} / {c}",{dk:sayi(x.minutes??0),a:sayi(x.wear),b:sayi(x.wear_after??x.wear),c:sayi(
x.durability)}))}${!x.code&&x.scrapped?" \xB7 "+esc(\u00E7("son yolu: var\u0131nca hurdaya ayr\u0131l\u0131r")):""}</small></span></label>`).join("")}
      </div>
      <p class="kucuk">${esc(\u00E7("Kendi arac\u0131nla g\xF6nderince navlun yok; ara\xE7 var\u0131\u015Fa dek kargoda kal\u0131r, yolculukta kullan\u0131lmaz."))}</p>`:""}function teklifHtml(){const t=teklif;
return t?t.hata?`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(t.hata)}</span></div>`:t.instant?`<div class="bilgi-kutusu">${ikon("check")}<span>${\u00E7("Ayn\u0131 \xFClkenin i\xE7inde: mal hemen \
aktar\u0131l\u0131r, navlun yok.")}</span></div>`:(yolDuzelt(),t.no_route?`<div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("Bu iki yer aras\u0131nda yol yok.")}</span></div>${aracSecenekleri(
t)}`:t.at_war?`<div class="hata-kutusu">${ikon("swords")}<span>${\u00E7("\u0130ki \xFClke sava\u015Fta: kargo \xE7\u0131kmaz. Mal yerinde kal\u0131r.")}</span></div>`:`<div class="bilgi-kutusu deniz-k\
utusu">${ikon("truck")}<span>${\u00E7("Kargoyla {dk} dakika ({kenar} kenar); navlun {kr} kredi, \xE7antandaki krediden.",{dk:sayi(t.minutes),kenar:sayi(t.edges),kr:kr(t.fee_cr)})}
        ${t.trade_discount?" "+\u00E7("Ticaret anla\u015Fmas\u0131yla navlun yar\u0131."):""}${(t.lines??[]).length?" "+\u00E7("Yol ortak hattan ge\xE7iyor; s\xFCre k\u0131sal\u0131r."):""}${t.military?
" "+\u00E7("U\xE7lardan biri cephe: i\u015Fbirli\u011Fi indirimi yok."):""}</span></div>${aracSecenekleri(t)}`):`<p class="kucuk">${\u00E7("Yer se\xE7ince s\xFCre ve navlun burada g\xF6r\xFCn\xFCr.")}\
</p>`}function yolKarti(){const l=v.in_transit??[];return`<section class="kart" id="depo-yolda">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kargolar")}</p><h2 class="b2">${l.length?\u00E7("{n} kargo yolda",{n:sayi(l.length)}):\u00E7("Yolda kargon yok")}</h2></div><span class\
="ik-kutu">${ikon("route")}</span></div>
        ${l.length?`<div class="yigin">${l.map(kargoSatiri).join("")}</div>`:`<p class="bos">${\u00E7('Ba\u015Fka \xFClkeye g\xF6nderdi\u011Fin ya da pazardan "bana g\xF6nder" diye ald\u0131\u011F\u0131n mal burada yolda g\xF6r\xFCn\xFCr.')}\
</p>`}
      </section>`}function gecmisKarti(){const l=(v.recent??[]).slice(0,10);return l.length?`<section class="kart" id="depo-gecmis">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Defter")}</p><h2 class="b2">${\u00E7("Son kargolar")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></div>
        <div class="yigin">${l.map(kargoSatiri).join("")}</div>
      </section>`:""}function ciz(){durdur();const depolar=v.warehouses??[];kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${\u00E7("Depo ve kargo")}</h1>
          <p class="aciklama">${\u00E7("Mal bir \xFClkenin i\xE7inde hemen yer de\u011Fi\u015Ftirir; \xFClkeler aras\u0131nda kargoyla gider. Yoldaki mal kullan\u0131lamaz, var\u0131nca bir kez teslim edilir. \u0130ki \xFClke sava\u015Fa girerse k\
argo geri d\xF6ner; mal \xE7\u0131kt\u0131\u011F\u0131 yerde kal\u0131r.")}</p></div>
          <button class="dugme ikincil kucuk-d" type="button" data-git-pazar>${ikon("store")}${\u00E7("Pazar")}</button></div>
        <div class="izgara iki">
          <div class="yigin">${cantaKarti()}${depolar.map(depoKarti).join("")}
            ${depolar.length?"":`<section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Depolar")}</p><h2 class="b2">${\u00E7("Hen\xFCz deposun yok")}</h2></div><span class="ik\
-kutu">${ikon("warehouse")}</span></div>
              <p class="aciklama">${\u00E7('Ba\u015Fka \xFClkedeki ilandan "depoda tut" diye ald\u0131\u011F\u0131nda ya da o \xFClkeye mal g\xF6nderdi\u011Finde, o \xFClkenin ba\u015Fkentinde depon kendili\u011Finden a\xE7\u0131l\u0131r. Ki\u015Fi ba\u015F\u0131na en \xE7ok {n\
} depo.',{n:sayi(v.rules?.warehouse?.maxPerCharacter??10)})}</p></section>`}</div>
          <div class="yigin">${gonderKarti()}${yolKarti()}${gecmisKarti()}</div>
        </div></div>`,bagla(),durdur=geriSay(kap,()=>{clearTimeout(geriZaman),geriZaman=setTimeout(()=>tazele(),gecikmeli(bekleme))}),teklifIste()}function teklifIste(){clearTimeout(teklifSaat);const from=ucJson(
form.kaynak,!1),to=form.hedef?ucJson(form.hedef,!0):null;if(!from||!to||!form.varlik){teklif=null,teklifYaz();return}const no=++teklifNo;teklifSaat=setTimeout(async()=>{let t;try{t=await Sunucu.cagir(
"goods_quote",{p_from:from,p_to:teklifUcu(to)})}catch(e){t={hata:hataMetni(e)}}no===teklifNo&&(teklif=t,teklifYaz())},150)}const teklifUcu=to=>to?.kind==="warehouse"&&adetAl(form.miktar)>0?{...to,qty:adetAl(
form.miktar)}:to;function teklifYaz(){const yer=$("#gonder-teklif",kap);yer&&(yer.innerHTML=teklifHtml());const d=$("#gonder-form button[type=submit]",kap);d&&(d.innerHTML=ikon("send")+esc(teklif?.instant?
\u00E7("Aktar"):\u00E7("G\xF6nder")))}function bagla(){for(const b of $$("[data-git-pazar]",kap))b.onclick=()=>Kabuk.git("sehir/pazar");for(const b of $$("[data-gonder]",kap))b.onclick=()=>{form.kaynak=
b.dataset.gonder,form.varlik=b.dataset.varlik,form.hedef=null,ciz(),$("#depo-gonder",kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})};for(const b of $$("[data-sat]",kap))b.
onclick=()=>{try{sessionStorage.setItem("civora.pazar",b.dataset.varlik),b.dataset.sat&&sessionStorage.setItem("civora.pazar.kaynak",b.dataset.sat)}catch{}Kabuk.git("sehir/pazar")};for(const b of $$("\
[data-cantaya]",kap))b.onclick=()=>{const n=Number(b.dataset.n);pencereForm({ust:\u00E7("Depo"),baslik:\u00E7("{urun} \xE7antana",{urun:varlikAdi(b.dataset.varlik)}),onayAd:\u00E7("\xC7antana al"),onayIkon:"\
package",govde:`<label class="alan"><span>${\u00E7("Miktar (depoda {n})",{n:sayi(n)})}</span><input name="miktar" inputmode="numeric" value="${n}"></label>
            <p class="kucuk">${\u00E7("Ayn\u0131 \xFClkedesin: mal hemen \xE7antana ge\xE7er.")}</p>`,is:async d=>{const m=adetAl(d.get("miktar"));if(!(m>0))throw new Error(\u00E7("Miktar\u0131 denetle."));
await Sunucu.yap("goods_send",{p_from:{kind:"warehouse",id:b.dataset.cantaya},p_to:{kind:"bag"},p_asset:b.dataset.varlik,p_qty:m,p_expected_fee:0}),tost(\u00E7("{n} {urun} \xE7antana al\u0131nd\u0131.",
{n:sayi(m),urun:varlikAdi(b.dataset.varlik)}),"package"),await tazele()}})};const f=$("#gonder-form",kap);f&&(f.addEventListener("change",e=>{const d=new FormData(f);if(form.miktar=String(d.get("mikta\
r")??"1"),e.target.name==="yol"){form.yol=String(d.get("yol")||"kargo");return}if(e.target.name==="kaynak"){form.kaynak=String(d.get("kaynak")),form.varlik=null,ciz();return}form.varlik=String(d.get("\
varlik")||"")||null,form.hedef=String(d.get("hedef")||"")||null,teklifIste()}),f.addEventListener("input",e=>{e.target.name==="miktar"&&(form.miktar=e.target.value)}),f.addEventListener("submit",async e=>{
e.preventDefault();const yer=$(".form-mesaj",f),dugme=$("button[type=submit]",f),m=adetAl(form.miktar);if(!(m>0)||!form.varlik||!form.hedef){formSerbest(f),yer.innerHTML=`<div class="hata-kutusu">${ikon(
"circle-alert")}<span>${\u00E7("Mal, miktar ve yeri denetle.")}</span></div>`;return}dugme.disabled=!0;try{if(form.yol!=="kargo"){const x=((await Sunucu.cagir("goods_quote",{p_from:ucJson(form.kaynak,
!1),p_to:{...ucJson(form.hedef,!0),qty:m}})).vehicles??[]).find(a=>a.medium===form.yol);if(!x)throw new Error(\u00E7("Bu yerde arac\u0131n yok; kargoyla g\xF6nderebilirsin."));if(x.code)throw new Error(
aracNedeni(x));const r2=await Sunucu.yap("goods_send_vehicle",{p_from:ucJson(form.kaynak,!1),p_to:ucJson(form.hedef,!0),p_asset:form.varlik,p_qty:m,p_medium:form.yol,p_expected_minutes:Number(x.minutes)});
tost(\u00E7("Arac\u0131nla yola \xE7\u0131kt\u0131: {n} {urun}, {dk} dakikada var\u0131r; navlun yok.",{n:sayi(m),urun:varlikAdi(form.varlik),dk:sayi(r2?.minutes??x.minutes)}),ARAC_IK[x.kind]??"truck"),
form.miktar="1",form.yol="kargo",await tazele();return}const t=await Sunucu.cagir("goods_quote",{p_from:ucJson(form.kaynak,!1),p_to:ucJson(form.hedef,!0)}),r=await Sunucu.yap("goods_send",{p_from:ucJson(
form.kaynak,!1),p_to:ucJson(form.hedef,!0),p_asset:form.varlik,p_qty:m,p_expected_fee:t.instant?0:Number(t.fee_cr)});r?.instant?tost(\u00E7("{n} {urun} aktar\u0131ld\u0131: {yer}.",{n:sayi(m),urun:varlikAdi(
form.varlik),yer:ucAdi(form.hedef)}),"package"):tost(\u00E7("Kargo yola \xE7\u0131kt\u0131: {n} {urun}, {dk} dakikada var\u0131r.",{n:sayi(m),urun:varlikAdi(form.varlik),dk:sayi(r?.minutes??t.minutes)}),
"truck"),form.miktar="1",await tazele()}catch(err){yer.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(err))}</span></div>`,dugme.disabled=!1,teklifIste()}finally{formSerbest(
f)}}))}const tazele=tazeleyici(async()=>{await yukle(),ciz()});await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^(shipment\.|market\.|contract\.|job\.|vehicle\.)/.test(olay)&&tazele()});return()=>{
b1(),durdur(),clearTimeout(teklifSaat),clearTimeout(geriZaman)}}}),Parcalar.tamam("ek_98zc_depo");
