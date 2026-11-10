// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_29_uretim.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/uretim",{async ac(kap){let v=null,gorunus;const sahneKart=IsletmeSahnesi.ac();sahneKart.dinle("git",({ne,id})=>{const co=v?.isletmeler.find(x=>x.company_id===id);co&&(ne==="girdi"?
aktar(id,"in","girdi"):ne==="cikti"?co.balances.some(b=>b.asset!=="CR"&&b.amount-b.held>0)?aktar(id,"out","mal"):tost(\u00E7("Depoda \xE7ekilecek \xFCr\xFCn yok."),"package"):ne==="kasa"?aktar(id,"in",
"CR"):ne==="ilan"&&ilanAc(id))});async function yukle(){const[isletmeler,kurallar,o,bak]=await Promise.all([Sunucu.cagir("my_companies"),Durum.kurallar(),Durum.ozet(),gorunus===void 0?Sunucu.cagir("my\
_look").catch(()=>null):null]);gorunus===void 0&&(gorunus=bak?.look??null);const ek=kurallar.data.economy,harita=await Durum.harita().catch(()=>null),sahibi=bolge=>harita?.sahip?.[bolge]??DUNYA.bolgeler?.[bolge]?.
ulke??o.character.citizenship,ulkeler=[...new Set([o.character.location,...isletmeler.map(c=>c.region_id)].map(sahibi))],okunan=await Promise.all(ulkeler.map(u=>Sunucu.cagir("country_taxes",{p_country:u}).
catch(()=>null))),vergiler=Object.fromEntries(ulkeler.map((u,i)=>[u,okunan[i]]));v={isletmeler,ek,o,vergi:vergiler[sahibi(o.character.location)]??null,vergiler,sahibi}}const vergiOrani=bolge=>Number(v.
vergiler?.[v.sahibi(bolge)]?.wage_tax_ppm??v.vergi?.wage_tax_ppm??0),tarif=id=>(v.ek.recipes??[]).find(r=>r.id===id),kasa=(co,varlik)=>co.balances.find(b=>b.asset===varlik)??{amount:0,held:0};function isletmeKarti(co){
const r=tarif(co.recipe_id),cr=kasa(co,"CR"),stoklar=co.balances.filter(b=>b.asset!=="CR"),avantaj=bolgeAvantaji(co.region_id)[r?.out?.[0]],vergiPpm=vergiOrani(co.region_id);return`<section class="kar\
t isletme-kart" data-isletme="${esc(co.company_id)}">
        <div class="kart-resim mekan" style="background-image:url('img/isletme_${ISLETME_RESIM[co.recipe_id]??"techizat"}.webp')"></div>
        <div class="kart-bas"><div><p class="ust-yazi">${esc(tarifAdi({data:{economy:v.ek}},co.recipe_id))} \xB7 ${esc(bolgeAdi(co.region_id))}</p><h2 class="b2">${esc(co.name)}</h2></div>
          <span class="cip">${ikon("factory")}${\u00E7("Bug\xFCn {n} / {toplam} birim",{n:Number(co.units_today),toplam:Number(co.capacity_units_per_day)})}</span></div>
        ${r?`<div class="etki">${ikon("sparkles")}<span>${\u00E7("Bir i\u015F: {n} birim \xE7al\u0131\u015Fma ({dk} dakika)",{n:Number(r.work),dk:Number(r.work*v.ek.workUnitMinutes)})} \xB7 ${esc(tarifMetni(
r))}${avantaj&&v.ek.production.regionAdvantageRecipes.includes(r.id)?" \xB7 "+\u00E7("b\xF6lge avantaj\u0131 +%{n}",{n:Number(avantaj)}):""}${r.minSkill?" \xB7 "+ustaIsci(r):""}</span></div>`:""}
        <div class="izgara" style="grid-template-columns:1fr 1fr;gap:12px;margin-top:14px">
          <div><p class="ust-yazi">${\u00E7("Kasa")}</p><p class="b3" style="margin:4px 0 0">${\u00E7("{kr} kr",{kr:kr(cr.amount-cr.held)})}</p><p class="kucuk">${cr.held?\u00E7("{kr} kr \xFCcretlere ayr\
\u0131lm\u0131\u015F",{kr:kr(cr.held)}):\u00E7("\xDCcretler buradan \xF6denir.")}</p></div>
          <div><p class="ust-yazi">${\u00E7("Depo")}</p>${stoklar.length?`<div class="yigin" style="gap:4px;margin-top:4px">${stoklar.map(b=>`<span class="kucuk"><b>${sayi(b.amount-b.held)}</b> ${esc(
varlikAdi(b.asset))}${b.held?" "+\u00E7("(+{n} i\u015Fte)",{n:Number(b.held)}):""}</span>`).join("")}</div>`:`<p class="kucuk">${\u00E7("Depo bo\u015F.")}</p>`}</div>
        </div>
        <div class="oneri-dugmeler" style="margin-top:12px">
          <button class="dugme ikincil kucuk-d" data-aktar="${esc(co.company_id)}|in|CR">${ikon("coins")}${\u00E7("Kasaya koy")}</button>
          <button class="dugme ikincil kucuk-d" data-aktar="${esc(co.company_id)}|out|CR" ${cr.amount-cr.held>0?"":"disabled"}>${\u00E7("Kasadan \xE7ek")}</button>
          ${r&&Object.keys(r.inputs??{}).length?`<button class="dugme ikincil kucuk-d" data-aktar="${esc(co.company_id)}|in|girdi">${ikon("package")}${\u00E7("Malzeme koy")}</button>`:""}
          ${stoklar.some(b=>b.amount-b.held>0)?`<button class="dugme ikincil kucuk-d" data-aktar="${esc(co.company_id)}|out|mal">${ikon("package")}${\u00E7("\xDCr\xFCn \xE7ek")}</button>`:""}
        </div>
        <hr class="ayrac">
        <div class="kart-bas" style="margin-bottom:8px"><div><p class="ust-yazi">${\u00E7("\u0130\u015F ilanlar\u0131")}</p><h3 class="b3">${co.offers.length?\u00E7("{n} a\xE7\u0131k ilan",{n:co.offers.
length}):\u00E7("A\xE7\u0131k ilan yok")}</h3></div>
          <button class="dugme kucuk-d" data-ilan-ac="${esc(co.company_id)}">${ikon("plus")}${\u00E7("\u0130lan a\xE7")}</button></div>
        ${co.offers.length?`<div class="yigin">${co.offers.map(j=>`<div class="hedef-cift"><span><b>${\u00E7("\u0130\u015F ba\u015F\u0131 {kr} kredi",{kr:kr(j.wage)})}</b>
          <span class="kucuk">${\u00E7("{n} / {toplam} yer bo\u015F \xB7 \xE7al\u0131\u015Fana vergiden sonra yakla\u015F\u0131k {kr} kredi",{n:Number(j.slots_open),toplam:Number(j.slots_total),kr:kr(
j.wage-Math.floor(j.wage*vergiPpm/1e6))})}</span></span>
          <button class="dugme sade kucuk-d" data-ilan-kapat="${esc(j.offer_id)}">${\u00E7("Kapat")}</button></div>`).join("")}</div>`:`<p class="kucuk">${\u00E7("\u0130lan a\xE7\u0131nca bu b\xF6lgedeki oyuncular \xC7a\
l\u0131\u015F ekran\u0131nda g\xF6r\xFCr; sen de kendi i\u015Fletmende \xE7al\u0131\u015Fabilirsin.")}</p>`}
        <div class="satir" style="margin-top:14px;justify-content:flex-end"><button class="dugme sade kucuk-d" data-kapat="${esc(co.company_id)}">${ikon("x")}${\u00E7("\u0130\u015Fletmeyi kapat")}</bu\
tton></div>
      </section>`}function kurKarti(){const p=v.ek.production;if(v.isletmeler.length>=p.maxActiveCompaniesStart)return`<section class="kart"><p class="bos">${\u00E7("\u015Eimdilik en \xE7ok {n} i\u015Fletme y\xF6nete\
bilirsin.",{n:Number(p.maxActiveCompaniesStart)})}</p></section>`;const yer=v.o.character.location,kredi=v.o.balances.find(b=>b.asset==="CR")?.spendable??0,avantaj=bolgeAvantaji(yer);return`<section c\
lass="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Yeni i\u015Fletme")} \xB7 ${esc(bolgeAdi(yer))}</p><h2 class="b2">${\u00E7("\u0130\u015Fletme kur")}</h2></div><span class="ik-kutu\
">${ikon("factory")}</span></div>
        <p class="aciklama">${\u00E7("\u0130\u015Fletme bulundu\u011Fun b\xF6lgede kurulur. Kurulu\u015F bedeli <b>{kr} kredi</b>.",{kr:kr(p.companyFoundingFeeCr)})}${kredi<p.companyFoundingFeeCr?" "+
\u00E7("Kasanda {kr} kredi var; \xF6nce \xE7al\u0131\u015F\u0131p biriktir.",{kr:kr(kredi)}):""}
          ${\u00E7("G\xFCnde en \xE7ok {n} birim \xE7al\u0131\u015Fma.",{n:Number(p.companyCapacityUnitsPerDay)})}
          ${Object.keys(avantaj).length?\u00E7("Bu b\xF6lgenin avantaj\u0131: {liste}.",{liste:Object.entries(avantaj).map(([u,n])=>`${esc(varlikAdi(u+"@1"))} ${\u00E7("+%{n}",{n:Number(n)})}`).join("\
, ")}):""}</p>
        <div class="tarif-izgara" role="radiogroup" aria-label="${\u00E7("Tarif")}">${(v.ek.recipes??[]).map(r=>{const av=p.regionAdvantageRecipes.includes(r.id)?avantaj[r.out[0]]:null;return`<label c\
lass="tarif-sec"><input type="radio" name="tarif" value="${esc(r.id)}">
            <img src="img/isletme_${ISLETME_RESIM[r.id]??"techizat"}.webp" alt="" loading="lazy">
            <span><b>${esc(tarifAdi({data:{economy:v.ek}},r.id))}</b><span class="kucuk">${esc(TUR_AD[p.recipeKinds[r.id]]??"")} \xB7 ${esc(tarifMetni(r))}</span>
              <span class="kucuk">${\u00E7("{n} birim",{n:Number(r.work)})}${av?" \xB7 "+\u00E7("bu b\xF6lgede +%{n}",{n:Number(av)}):""}${r.minSkill?" \xB7 "+ustaIsci(r):""}</span></span></label>`}).
join("")}</div>
        <form class="form" id="kur-form" style="margin-top:14px" novalidate>
          <label class="alan"><span>${\u00E7("\u0130\u015Fletmenin ad\u0131")}</span><input name="ad" minlength="3" maxlength="40" autocapitalize="words" placeholder="${\u00E7("\xF6r. Marmara Lif Bah\xE7esi")}\
"></label>
          <div class="form-mesaj"></div>
          <button class="dugme altin" type="submit" ${kredi<p.companyFoundingFeeCr?"disabled":""}>${ikon("factory")}${\u00E7("Kur ({kr} kredi)",{kr:kr(p.companyFoundingFeeCr)})}</button>
        </form></section>`}function ciz(){kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim \xB7 \xDCretim")}</p><h1 class="b1">${\u00E7("\u0130\u015Fletmelerin")}</h1>
          <p class="aciklama">${\u00E7("\xC7al\u0131\u015Fanlar ilan\u0131na gelir: \xFCcret i\u015Fletmenin kasas\u0131ndan, malzeme deposundan ayr\u0131l\u0131r. \u0130\u015F bitince \xFCr\xFCn depoya girer; \xE7ekip pazarda satars\u0131n.")}\
</p></div></div>
        ${v.isletmeler.length?'<div id="isletme-yer"></div>':""}
        <div class="izgara iki"><div class="yigin">${v.isletmeler.map(isletmeKarti).join("")||`<section class="kart"><p class="bos">${\u00E7("Hen\xFCz i\u015Fletmen yok.")}</p></section>`}</div>
          <div class="yigin">${kurKarti()}</div></div></div>`,v.isletmeler.length?($("#isletme-yer",kap)?.replaceWith(sahneKart.el),sahneKart.yaz({isletmeler:v.isletmeler,kurallar:{data:{economy:v.ek}},
ozet:v.o,asker:Durum.v.askerlik,gorunus})):sahneKart.yaz({isletmeler:[]}),bagla()}function bagla(){const f=$("#kur-form",kap);f?.addEventListener("submit",async e=>{e.preventDefault();const yerM=$(".f\
orm-mesaj",f),t=$("input[name=tarif]:checked",kap)?.value,ad=String(new FormData(f).get("ad")??"").trim().replace(/\s+/g," ");if(!t){yerM.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<sp\
an>${\u00E7("\xD6nce bir tarif se\xE7.")}</span></div>`;return}if(ad.length<3||ad.length>40){yerM.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("Ad 3\u201340 karakter olmal\u0131.")}\
</span></div>`;return}const d=$("button[type=submit]",f);d.disabled=!0;try{await Sunucu.yap("company_create",{p_name:ad,p_recipe_id:t}),tost(\u00E7("\u0130\u015Fletmen kuruldu. Kasaya kredi koyup i\u015F ilan\u0131 a\xE7."),
"factory"),await tazele()}catch(err){yerM.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(err))}</span></div>`,d.disabled=!1}});for(const b of $$("[data-aktar]",kap))b.
onclick=()=>aktar(...b.dataset.aktar.split("|"));for(const b of $$("[data-ilan-ac]",kap))b.onclick=()=>ilanAc(b.dataset.ilanAc);for(const b of $$("[data-ilan-kapat]",kap))b.onclick=()=>islem("job_offe\
r_close",{p_offer_id:b.dataset.ilanKapat},\u00E7("\u0130lan kapand\u0131."));for(const b of $$("[data-kapat]",kap))b.onclick=()=>pencere({ust:\u00E7("\u0130\u015Fletme"),baslik:\u00E7("\u0130\u015Fletmeyi kapat"),
govde:`<p class="aciklama">${\u00E7("A\xE7\u0131k ilanlar kapan\u0131r; kasadaki kredi ve depodaki her \u015Fey senin \xE7antana ge\xE7er. S\xFCren i\u015F varken kapanmaz. Kurulu\u015F bedeli geri gelmez.")}\
</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Kapat"),sinif:"mercan",is:()=>islem("company_close",{p_company_id:b.dataset.kapat},\u00E7("\u0130\u015Fletme kapand\u0131; kasas\u0131 ve deposu \xE7antana ge\xE7ti."))}]})}
function aktar(id,yon,tur){const co=v.isletmeler.find(x=>x.company_id===id),r=tarif(co.recipe_id);if(tur!=="CR"&&v.sahibi(co.region_id)!==v.sahibi(v.o.character.location)){pencere({ust:co.name,baslik:yon===
"in"?\u00E7("Depoya malzeme koy"):\u00E7("Depodan \xFCr\xFCn \xE7ek"),govde:`<p class="aciklama">${\u00E7("\u0130\u015Fletmen ba\u015Fka bir \xFClkede ({ulke}). Mal bir \xFClkenin i\xE7inde hemen, \xFClkeler aras\u0131nda kargoyla g\
ider; s\xFCre ve navlun \u015Eehrim \u2192 Depo'da g\xF6r\xFCn\xFCr.",{ulke:esc(ulkeAdi(v.sahibi(co.region_id)))})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Kargoyla g\xF6nder"),sinif:"alti\
n",ikon:"truck",is:()=>{try{sessionStorage.setItem("civora.depo",JSON.stringify(yon==="in"?{kaynak:"bag",hedef:"c:"+id}:{kaynak:"c:"+id,hedef:"bag"}))}catch{}Kabuk.git("sehir/depo")}}]});return}let secenek;
tur==="CR"?secenek=[["CR",\u00E7("Kredi")]]:yon==="in"?secenek=Object.keys(r.inputs??{}).map(u=>[u+"@1",varlikAdi(u+"@1")]):secenek=co.balances.filter(b=>b.asset!=="CR"&&b.amount-b.held>0).map(b=>[b.asset,
varlikAdi(b.asset)]);const elde=varlik=>yon==="in"?varlik==="CR"?v.o.balances.find(b=>b.asset==="CR")?.spendable??0:Durum.stok(varlik):(()=>{const b=kasa(co,varlik);return b.amount-b.held})();pencereForm(
{ust:co.name,baslik:yon==="in"?tur==="CR"?\u00E7("Kasaya kredi koy"):\u00E7("Depoya malzeme koy"):tur==="CR"?\u00E7("Kasadan kredi \xE7ek"):\u00E7("Depodan \xFCr\xFCn \xE7ek"),onayAd:yon==="in"?\u00E7(
"Koy"):\u00E7("\xC7ek"),onayIkon:tur==="CR"?"coins":"package",govde:`${secenek.length>1||tur!=="CR"?`<label class="alan"><span>${\u00E7("Ne")}</span><select name="varlik">${secenek.map(([a,ad])=>`<opt\
ion value="${esc(a)}">${esc(ad)} (${tur==="CR"?kr(elde(a)):sayi(elde(a))} ${yon==="in"?\u00E7("\xE7antada"):\u00E7("depoda")})</option>`).join("")}</select></label>`:'<input type="hidden" name="varlik\
" value="CR">'}
          <label class="alan"><span>${tur==="CR"?\u00E7("Tutar (kredi)"):\u00E7("Miktar")}</span><input name="miktar" inputmode="${tur==="CR"?"decimal":"numeric"}" required></label>
          <p class="kucuk">${tur==="CR"?yon==="in"?\u00E7("\xC7antanda {kr} kredi var.",{kr:kr(elde("CR"))}):\u00E7("Kasada {kr} kredi var.",{kr:kr(elde("CR"))}):r&&yon==="in"?\u00E7("Bir i\u015F i\xE7in gere\
ken: {liste}.",{liste:esc(Object.entries(r.inputs??{}).map(([u,n])=>`${sayi(n)} ${varlikAdi(u+"@1")}`).join(", "))}):""}</p>`,is:async d=>{const varlik=String(d.get("varlik")??"CR"),miktar=varlik==="C\
R"?krediAlt(d.get("miktar")):adetAl(d.get("miktar"));if(!(miktar>0))throw new Error(varlik==="CR"?\u00E7("Tutar\u0131 kredi olarak yaz."):\u00E7("Miktar\u0131 denetle."));if(miktar>elde(varlik))throw new Error(
\u00E7("O kadar yok."));await Sunucu.yap("company_transfer",{p_company_id:id,p_direction:yon,p_asset:varlik,p_amount:miktar}),tost(yon==="in"?\u00E7("\u0130\u015Fletmeye aktar\u0131ld\u0131."):\u00E7(
"\xC7antana aktar\u0131ld\u0131."),tur==="CR"?"coins":"package"),await tazele()}})}function ilanAc(id){const co=v.isletmeler.find(x=>x.company_id===id),r=tarif(co.recipe_id),vergiPpm=vergiOrani(co.region_id),
sistem=v.ek.production.systemJobWageCr*r.work;pencereForm({ust:co.name,baslik:\u00E7("\u0130\u015F ilan\u0131 a\xE7"),onayAd:\u00E7("\u0130lan\u0131 a\xE7"),onayIkon:"megaphone",govde:`<p class="acikl\
ama">${\u00E7("Bir i\u015F {n} birim \xE7al\u0131\u015Fmad\u0131r ({dk} dakika). \xDCcret kabul an\u0131nda kasandan ayr\u0131l\u0131r; maa\u015F vergisi ({oran}) \xE7al\u0131\u015Fan\u0131n \xFCcretinden kesilir.",
{n:Number(r.work),dk:Number(r.work*v.ek.workUnitMinutes),oran:ppmYuzde(vergiPpm)})}
            ${\u00E7("Kar\u015F\u0131la\u015Ft\u0131rma: devletin sistem i\u015Fi ayn\u0131 s\xFCreye {kr} kredi \xF6der.",{kr:kr(sistem)})}</p>
          <div class="izgara" style="grid-template-columns:1fr 1fr;gap:12px">
            <label class="alan"><span>${\u00E7("\u0130\u015F ba\u015F\u0131 \xFCcret (kredi)")}</span><input name="ucret" inputmode="decimal" required value="${kr(Math.round(sistem*1.1))}"></label>
            <label class="alan"><span>${\u00E7("Ka\xE7 ki\u015Fi")}</span><input name="yer" inputmode="numeric" required value="2"></label>
          </div>
          <p class="kucuk" id="ilan-ozet"></p>`,is:async d=>{const ucret=krediAlt(d.get("ucret")),yer=adetAl(d.get("yer"));if(!(ucret>0))throw new Error(\u00E7("\xDCcreti kredi olarak yaz."));if(!(yer>=
1&&yer<=1e3))throw new Error(\u00E7("Ki\u015Fi say\u0131s\u0131 {min}\u2013{max} olmal\u0131.",{min:1,max:1e3}));await Sunucu.yap("job_offer_create",{p_company_id:id,p_wage:ucret,p_slots:yer}),tost(\u00E7(
"\u0130lan\u0131n a\xE7\u0131ld\u0131; bu b\xF6lgedekiler \xC7al\u0131\u015F ekran\u0131nda g\xF6r\xFCr."),"megaphone"),await tazele()}});const ozetYaz=()=>{const f=$(".perde form");if(!f)return;const ucret=krediAlt(
$("input[name=ucret]",f).value),yer=adetAl($("input[name=yer]",f).value),cr=kasa(co,"CR");$("#ilan-ozet").textContent=ucret>0&&yer>0?\u00E7("\xC7al\u0131\u015Fana vergiden sonra {net} kredi. {n} ki\u015Fi i\xE7in kasada {\
gerek} kredi gerekir (\u015Fu an {var}).",{net:kr(ucret-Math.floor(ucret*vergiPpm/1e6)),n:yer,gerek:kr(ucret*yer),var:kr(cr.amount-cr.held)}):""};for(const g of $$(".perde input"))g.addEventListener("\
input",ozetYaz);ozetYaz()}async function islem(fn,args,mesaj){try{await Sunucu.yap(fn,args),tost(mesaj,"factory")}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}const tazele=tazeleyici(async()=>{
await yukle(),ciz()});await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^job\./.test(olay)&&tazele()});return()=>{b1(),sahneKart.kapat()}}}),Parcalar.tamam("ek_29_uretim");
