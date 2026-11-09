// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_25_calis.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/is",{async ac(kap){let durdur=()=>{},birimler=1,depoAdet=1;const atolye=AtolyeSahnesi.ac(),isletmeKart=IsletmeSahnesi.ac({calisan:!0});let veri=null,nabiz=null,gorunus,isletme=null;
async function yukle(){const[is,ilan,depo,kurallar,hatlar,nb,bak,,onarim]=await Promise.all([Sunucu.cagir("my_work"),Sunucu.cagir("job_offers"),Sunucu.cagir("depot_status"),Durum.kurallar(),Sunucu.cagir(
"coop_map").catch(()=>null),Sunucu.cagir("city_pulse").catch(()=>null),gorunus===void 0?Sunucu.cagir("my_look").catch(()=>null):null,Durum.askerlik(),Sunucu.cagir("repair_status").catch(()=>null)]);nb&&
(nabiz=nb),gorunus===void 0&&(gorunus=bak?.look??null),isletme=is.active?.kind==="company"&&is.active.company_id?await Sunucu.cagir("company_live",{p_company:is.active.company_id}).catch(()=>null):null;
const yer=Durum.v.ozet?.character?.location,santiyeler=(hatlar?.lines??[]).filter(l=>l.status==="building"&&(l.region_a===yer||l.region_b===yer));return{is,ilan,depo,kurallar,santiyeler,onarim}}const atolyeYaz=()=>{
veri&&!isletme&&atolye.yaz({is:veri.is,depo:veri.depo,nabiz,gorunus,ozet:Durum.v.ozet,asker:Durum.v.askerlik})};atolye.dinle("git",ne=>{const hedef=ne==="depo"?$("#depo-kart",kap):$("#is-kart",kap);if(!hedef)
return;hedef.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"center"});const d=$(ne==="depo"?"#depo-al":"#sistem-is",hedef);hedef.classList.remove("vurgu-yan"),hedef.offsetWidth,hedef.classList.
add("vurgu-yan"),d?.focus({preventScroll:!0})});function ciz({is,ilan,depo,kurallar,santiyeler,onarim}){veri={is,depo},durdur();const a=Durum.v.askerlik,ek=kurallar.data.economy,eg=kurallar.data.training,
birimDk=ek.workUnitMinutes??30,kalanBirim=Math.max(0,is.daily_cap-is.units_today);birimler=Math.max(1,Math.min(birimler,kalanBirim||1));const ak=is.active;kap.innerHTML=`<div class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\xC7al\u0131\u015F")}</p><h1 class="b1">${\u00E7("\u0130\u015F ve erzak")}</h1>
          <p class="aciklama">${\u00E7("\u0130\u015F sunucuda s\xFCrer; uygulamay\u0131 kapatsan da biter, \xFCcretin hesab\u0131na ge\xE7er.")}</p></div></div>
        <div id="atolye-yer"></div>
        <div class="izgara iki">
            <section class="kart" id="is-kart">
              <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u0130\u015Fin \xB7 bug\xFCn {n} / {max} birim",{n:Number(is.units_today),max:Number(is.daily_cap)})}</p>
                <h2 class="b2">${ak?ak.kind==="system"?\u00E7("Sistem i\u015Finde \xE7al\u0131\u015F\u0131yorsun"):\u00E7("\u0130\u015Fletmede \xE7al\u0131\u015F\u0131yorsun"):\u00E7("\u015Eu an \xE7al\u0131\u015Fm\u0131yor\
sun")}</h2></div>
                <span class="ik-kutu">${ikon("briefcase-business")}</span></div>
              ${ak?`
                <p class="aciklama">${Number(ak.gym_ppm)>0?\u00E7("{n} birim ({dk} dakika; atletik seviyenle {o} k\u0131sa). Bitince <b>{kr} kredi</b> (vergiden sonra) hesab\u0131na ge\xE7er.",{n:Number(
ak.work_units),dk:(Math.round((Date.parse(ak.ends_at)-Date.parse(ak.starts_at))/6e3)/10).toLocaleString(DIL.yerel),o:ppmYuzde(ak.gym_ppm),kr:kr(ak.wage_net)}):\u00E7("{n} birim ({dk} dakika). Bitince \
<b>{kr} kredi</b> (vergiden sonra) hesab\u0131na ge\xE7er.",{n:Number(ak.work_units),dk:ak.work_units*birimDk,kr:kr(ak.wage_net)})}
                  ${ak.output_asset?\u00E7("\u0130\u015Fletme {n} {urun} \xFCretecek.",{n:Number(ak.output_qty),urun:esc(varlikAdi(ak.output_asset))}):""}</p>
                <div class="cubuk" style="margin-top:12px"><i data-ilerleme="${ak.starts_at}|${ak.ends_at}" style="display:block;height:100%;background:var(--deniz)"></i></div>
                <p class="kucuk" style="margin-top:6px">${\u00E7("Kalan:")} <b data-bitis="${ak.ends_at}"></b></p>`:kalanBirim<=0?`<p class="aciklama">${\u00E7("Bug\xFCnk\xFC i\u015F hakk\u0131n\u0131 doldurdun. Yar\u0131n yen\
iden \xE7al\u0131\u015Fabilirsin.")}</p>`:`
                <p class="aciklama">${\u00E7("\xDClkenin sistem i\u015Fi her zaman a\xE7\u0131k: birim ba\u015F\u0131na <b>{kr} kredi</b> (vergiden sonra).",{kr:kr(ilan.system_job.wage_net_per_unit)})}\

                  ${ilan.system_job.budget_left!=null?\u00E7("Bug\xFCn sistem i\u015Finin kalan b\xFCt\xE7esi {kr} kredi.",{kr:kr(ilan.system_job.budget_left)}):""}</p>
                <div class="satir" style="margin-top:12px;flex-wrap:wrap">
                  <div class="adim"><button type="button" id="b-eksi" aria-label="${\u00E7("Azalt")}">${ikon("minus")}</button><input id="b-sayi" value="${birimler}" inputmode="numeric" aria-label="${\u00E7(
"Birim")}">
                    <button type="button" id="b-arti" aria-label="${\u00E7("Art\u0131r")}">${ikon("plus")}</button></div>
                  <span class="kucuk" id="b-bilgi">${\u00E7("{dk} dakika \xB7 {kr} kredi",{dk:birimler*birimDk,kr:kr(birimler*ilan.system_job.wage_net_per_unit)})}</span>
                </div>
                ${sporIsOrani()>0?`<p class="kucuk" id="is-spor" style="margin-top:6px">${ikon("dumbbell")} ${esc(\u00E7("Atletik seviyenle i\u015Flerin {o} k\u0131sa s\xFCrer (\u015Eehrim \u2192 Spor salonu).",
{o:ppmYuzde(sporIsOrani())}))}</p>`:""}
                <button class="dugme altin" id="sistem-is" style="margin-top:12px">${ikon("play")}${\u00E7("Sistem i\u015Fine ba\u015Fla")}</button>`}
              ${!ak&&ilan.offers.length?`<hr class="ayrac"><p class="ust-yazi">${\u00E7("\u0130\u015F ilanlar\u0131 \xB7 {yer}",{yer:esc(bolgeAdi(ilan.region_id))})}</p>
                <div class="yigin" style="margin-top:10px">${ilan.offers.map(o=>`<div class="ilk-adim">
                  <span class="ozet-ikon" style="background:var(--altin-acik);color:var(--altin-2)">${ikon("factory")}</span>
                  <span><b>${esc(o.company_name)}</b><span class="kucuk">${esc(tarifAdi(kurallar,o.recipe_id))} \xB7 ${\u00E7("{n} birim \xB7 {kr} kredi (vergiden sonra) \xB7 {yer} yer",{n:Number(o.work_units),
kr:kr(o.wage_net),yer:Number(o.slots_open)})}${o.company_id?` \xB7 <button class="baglanti" type="button" data-isletme-rapor="${esc(o.company_id)}|${esc(o.company_name)}">${\u00E7("Raporla")}</button>`:
""}</span></span>
                  <button class="dugme kucuk-d" data-ilan="${o.offer_id}">${\u00E7("Kabul et")}</button></div>`).join("")}</div>`:""}
              ${is.ration_left!=null?`<p class="kucuk" style="margin-top:12px">${ikon("croissant")} ${\u00E7("Bug\xFCnk\xFC tay\u0131n hakk\u0131n: {n} koli erzak (sistem i\u015Fiyle gelir).",{n:Number(
is.ration_left)})}</p>`:""}
            </section>
            ${santiyeler?.length?`<section class="kart" id="calis-santiye">
              <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ortak hat \u015Fantiyesi \xB7 kamu i\u015Fi")}</p><h2 class="b2">${\u00E7("Bu b\xF6lgede {n} \u015Fantiye",{n:sayi(santiyeler.length)})}\
</h2></div><span class="ik-kutu">${ikon("hammer")}</span></div>
              <div class="liste">${santiyeler.map(l=>`<div class="liste-satir" data-calis-santiye="${esc(l.line_id)}">
                <span class="liste-ikon altin">${ikon(HAT_TUR[l.kind]?.ik??"route")}</span>
                <div><span class="tur">${esc(hatTurAd(l.kind))} \xB7 ${esc(ulkeAdi(l.country_a))} \u2013 ${esc(ulkeAdi(l.country_b))}</span><b>${esc(hatAdi(l))}</b>
                  <div class="cubuk deniz" style="margin-top:6px"><i style="width:${Math.round(Number(l.progress_ppm??0)/1e4)}%"></i></div></div>
                <button class="dugme kucuk-d" data-santiyeye="${esc(l.line_id)}">${ikon("hammer")}${\u00E7("\u015Eantiyeye git")}</button></div>`).join("")}</div>
              <p class="kucuk" style="margin-top:8px">${\u00E7("\u015Eantiye malzemeyi sabit fiyatla al\u0131r ve i\u015F birimi ba\u015F\u0131na \xFCcret \xF6der (kasadan, ba\u015Fta). Kimin ne verdi\u011Fi herkese a\xE7\u0131kt\u0131r.")}\
</p>
            </section>`:""}
            ${onarim&&Number(onarim.damage_ppm)>0?`<section class="kart" id="calis-onarim">
              <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("G\xF6n\xFCll\xFC i\u015F \xB7 {yer}",{yer:esc(bolgeAdi(onarim.region_id))})}</p><h2 class="b2">${\u00E7("\u015Eehrin onar\u0131m\u0131")}\
</h2></div><span class="ik-kutu">${ikon("hammer")}</span></div>
              <p class="aciklama">${\u00E7("Sava\u015F bu \u015Fehirde {n} hasar b\u0131rakt\u0131; \u015Fehrin \xFCretim avantaj\u0131 ayn\u0131 oranda azald\u0131. Onar\u0131ma kat\u0131lan her i\u015F birimi hasar\u0131 {b} azalt\u0131r.",
{n:ppmYuzde(onarim.damage_ppm),b:ppmYuzde(onarim.per_unit_ppm??0)})}</p>
              ${onarimHtml(onarim,isgKural())}
            </section>`:""}
            <section class="kart" id="depo-kart">
              <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Devlet erzak deposu")}</p><h2 class="b2">${\u00E7("Erzak al")}</h2></div><span class="ik-kutu">${ikon("warehouse")}</span></div>
              ${depo.here?`<p class="aciklama">${\u00E7("Ba\u015Fkentte koli ba\u015F\u0131na <b>{kr} kredi</b>; ki\u015Fi ba\u015F\u0131 g\xFCnde {n} koli. Bug\xFCn kalan: <b>{kalan}</b>.",{kr:kr(depo.
unit_price),n:Number(depo.daily_cap),kalan:Number(depo.left_today)})}</p>
                <div class="satir" style="margin-top:12px;flex-wrap:wrap">
                  <div class="adim"><button type="button" id="d-eksi" aria-label="${\u00E7("Azalt")}">${ikon("minus")}</button><input id="d-sayi" value="${Math.min(depoAdet,Math.max(1,depo.left_today))}\
" inputmode="numeric" aria-label="${\u00E7("Koli")}">
                    <button type="button" id="d-arti" aria-label="${\u00E7("Art\u0131r")}">${ikon("plus")}</button></div>
                  <button class="dugme ikincil" id="depo-al" ${depo.left_today<=0?"disabled":""}>${ikon("croissant")}${\u00E7("Sat\u0131n al")}</button></div>`:`<p class="aciklama">${\u00E7("Devlet de\
posu yaln\u0131z ba\u015Fkentte. Ba\u015Fkente gidince buradan erzak alabilirsin.")}</p>`}
              <p class="kucuk" style="margin-top:10px">${\u00E7("Kamu sipari\u015Fiyle gelen mallar (m\xFChimmat, lojistik, metal\u2026) devlet deposunun kamu sto\u011Funda; sipari\u015Fin fiyat\u0131ndan al\u0131n\u0131r.")}\

                <button class="baglanti" type="button" data-git-ekonomi>${\u00E7("Kamu sto\u011Fu (\xDClkem \u2192 Ekonomi)")}</button></p>
            </section>
        </div></div>`,isletme?($("#atolye-yer",kap)?.replaceWith(isletmeKart.el),isletmeKart.yaz({isletmeler:[isletme],kurallar,ozet:Durum.v.ozet,asker:Durum.v.askerlik,gorunus})):($("#atolye-yer",kap)?.
replaceWith(atolye.el),atolyeYaz()),bagla({is,ilan,depo}),onarimBagla(kap,onarim,()=>tazele()),durdur=geriSay(kap,()=>tazele())}function bagla({is,ilan,depo}){const kalan=Math.max(0,is.daily_cap-is.units_today),
sayac=(eksi,arti,giris,deger,ust,yaz)=>{const k=v=>{const n=Math.max(1,Math.min(ust,Number(v)||1));giris.value=String(n),yaz(n)};eksi.onclick=()=>k(Number(giris.value)-1),arti.onclick=()=>k(Number(giris.
value)+1),giris.onchange=()=>k(giris.value)};if($("#b-sayi",kap)){const ek=Durum.v.kurallar.data.economy;sayac($("#b-eksi",kap),$("#b-arti",kap),$("#b-sayi",kap),birimler,kalan,n=>{birimler=n,$("#b-bi\
lgi",kap).textContent=\u00E7("{dk} dakika \xB7 {kr} kredi",{dk:n*(ek.workUnitMinutes??30),kr:kr(n*ilan.system_job.wage_net_per_unit)})})}$("#d-sayi",kap)&&sayac($("#d-eksi",kap),$("#d-arti",kap),$("#d\
-sayi",kap),depoAdet,Math.max(1,depo.left_today),n=>{depoAdet=n}),$("#sistem-is",kap)?.addEventListener("click",()=>islem("system_job_start",{p_units:birimler},\u00E7("\u0130\u015Fe ba\u015Flad\u0131n. Bitince \xFCcretin he\
sab\u0131na ge\xE7ecek."),"briefcase-business"));for(const b of $$("[data-ilan]",kap))b.onclick=()=>islem("job_accept",{p_offer_id:b.dataset.ilan},\u00E7("\u0130\u015Fe ba\u015Flad\u0131n."),"factory");
for(const b of $$("[data-isletme-rapor]",kap))b.onclick=()=>{const[id,ad]=b.dataset.isletmeRapor.split("|");raporla({tur:"company",ref:id,ad})};for(const b of $$("[data-git-ekonomi]",kap))b.onclick=()=>Kabuk.
git("ulke/ekonomi");$("#depo-al",kap)?.addEventListener("click",()=>islem("depot_buy",{p_qty:Number($("#d-sayi",kap).value)||1},\u00E7("Erzak \xE7antana kondu."),"croissant"));for(const b of $$("[data\
-santiyeye]",kap))b.onclick=()=>santiyeyeGit(b.dataset.santiyeye)}async function islem(fn,args,mesaj,ik,askerlik=!1){for(const b of $$("button",kap))b.disabled=!0;try{await Sunucu.yap(fn,args),tost(mesaj,
ik),await Promise.all([Durum.ozet(),askerlik?Durum.askerlik():null])}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}async function tazele(){try{ciz(await yukle())}catch(e){tost(hataMetni(e),
"circle-alert")}}ciz(await yukle());const b1=Durum.dinle("olay",({olay})=>{/^(job\.|repair\.)/.test(olay)&&tazele()}),nabizZaman=setInterval(async()=>{if(document.visibilityState!=="visible")return;const nb=await Sunucu.
cagir("city_pulse").catch(()=>null);nb&&(nabiz=nb,atolyeYaz())},6e4);return()=>{durdur(),b1(),clearInterval(nabizZaman),atolye.kapat(),isletmeKart.kapat()}}}),Parcalar.tamam("ek_25_calis");
