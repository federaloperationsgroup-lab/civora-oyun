// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98zu_araclar.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/araclar",{async ac(kap){let v=null,kapandi=!1,mesgul=!1,gorunus;const sahne=AracSahnesi.ac();sahne.dinle("sec",ad=>{const el=$({land:"#arac-yer-land",sea:"#arac-yer-sea",kit:"#arac\
-kurallar",ben:"#arac-bayi"}[ad]??"#arac-bayi",kap);el&&(el.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"center"}),el.classList.remove("vurgu-yan"),el.offsetWidth,el.classList.add("vur\
gu-yan"))});const ben=()=>Durum.v.ozet?.character??{};async function yukle(){const[x,bak]=await Promise.all([Sunucu.cagir("vehicles"),gorunus===void 0?Sunucu.cagir("my_look").catch(()=>null):null]);v=
x,gorunus===void 0&&(gorunus=bak?.look??null)}const R=()=>v.rule??{},tur=id=>(R().kinds??[]).find(k=>k.id===id)??null,ORTAM_AD={land:\u00E7("Kara arac\u0131"),sea:\u00E7("Tekne")},KR=()=>R().rental??null,
kilitli=u=>!!u.rental||!!u.busy,KIRA_DURUM={active:\u00E7("S\xFCr\xFCyor"),returned:\u00E7("D\xF6nd\xFC"),scrapped:\u00E7("Hurdaya ayr\u0131ld\u0131")},kimlikHtml=(u,m)=>`<div class="arac-kimlik" data\
-arac-kimlik="${m}">
        <span class="plaka" data-plaka="${esc(u.plate??"")}">${esc(u.plate??"")}</span>
        ${u.name?`<b class="arac-adi" data-arac-adi="${esc(u.name)}">${esc(u.name)}</b>`:`<span class="kucuk">${\u00E7("Ads\u0131z")}</span>`}
        ${R().name?`<button class="dugme sade kucuk-d" data-arac-ad="${m}" ${mesgul?"disabled":""}>${ikon("pencil")}${u.name?\u00E7("Ad\u0131n\u0131 de\u011Fi\u015Ftir"):\u00E7("Ad ver")}</button>`:""}\

      </div>
      ${u.name_reset&&!u.name?`<p class="kucuk">${\u00E7("Arac\u0131n\u0131n ad\u0131 topluluk kurallar\u0131na uymad\u0131\u011F\u0131 i\xE7in kald\u0131r\u0131ld\u0131; yeni bir ad verebilirsin.")}<\
/p>`:""}`,kargoHtml=u=>u.busy?`<div class="bilgi-kutusu deniz-kutusu" data-arac-kargoda="${esc(u.busy.shipment_id??"")}" style="margin-top:10px">${ikon("truck")}<span>${esc(\u00E7("Kargoda: {n} {mal},\
 {a} \u2192 {b}; var\u0131\u015F {zaman}. Bu s\u0131rada yolculukta ve ba\u015Fka i\u015Fte kullan\u0131lmaz.",{n:sayi(u.busy.qty??0),mal:varlikAdi(u.busy.asset??""),a:bolgeAdi(u.busy.from),b:bolgeAdi(
u.busy.to),zaman:saatYaz(u.busy.arrives_at)}))}${u.rental&&u.busy.by?" "+esc(\u00E7("Ta\u015F\u0131yan kirac\u0131n: {ad}.",{ad:u.busy.by})):""}</span></div>`:"";function kiraHtml(u,m){const k=KR();if(!k)
return"";if(u.rental){const x=u.rental;return`<div class="bilgi-kutusu uyari-kutusu" data-arac-kirada="${esc(x.rental_id)}" style="margin-top:10px">${ikon("key-round")}<span>${esc(\u00E7("Kirada: {ad}\
 kullan\u0131yor, {zaman} saatine dek ({gun} g\xFCn, {kr} kredi). Bu s\xFCrede kullanamaz ve de\u011Fi\u015Ftiremezsin.",{ad:x.renter?.name??"",zaman:saatYaz(x.ends_at),gun:sayi(x.days??0),kr:kr(x.fee_cr??
0)}))} ${esc(\u00E7("D\xF6n\xFC\u015Fte kirac\u0131n\u0131n yapt\u0131\u011F\u0131 a\u015F\u0131nman\u0131n bedeli sana \xF6denir: \u015Fimdilik {kr} kredi (en \xE7ok {en}).",{kr:kr(x.repair_now??0),en:kr(
k.depositCr)}))}</span></div>`}if(u.offer){const x=u.offer;return`<div class="bilgi-kutusu" data-arac-ilanda="${esc(x.rental_id)}" style="margin-top:10px">${ikon("hand-coins")}<span>${esc(\u00E7("Kira\
l\u0131k ilanda: g\xFCnl\xFCk {kr} kredi, en \xE7ok {gun} g\xFCn ({sehir}).",{kr:kr(x.day_cr),gun:sayi(x.max_days),sehir:bolgeAdi(x.region_id)}))}${x.region_id!==v.place?" "+esc(\u00E7("\u0130lan {sehir} \u015F\
ehrinde; sen oradayken g\xF6r\xFCn\xFCr.",{sehir:bolgeAdi(x.region_id)})):""}</span></div>
          <div class="oneri-dugmeler" style="margin-top:8px"><button class="dugme ikincil kucuk-d" data-arac-ilan-kaldir="${esc(x.rental_id)}" ${mesgul?"disabled":""}>${ikon("x")}${\u00E7("\u0130lan\u0131 kald\u0131\
r")}</button></div>`}return`<div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-arac-kiraya="${m}" ${v.traveling||!v.place||u.busy||mesgul?"disabled":""}>${ikon(
"hand-coins")}${\u00E7("Kiraya ver")}</button></div>`}const hizYazisi=k=>k.medium==="sea"?\u00E7("Deniz ge\xE7i\u015Finde s\xFCre {oran} k\u0131sa",{oran:ppmYuzde(k.speedPpm)}):\u00E7("Karada s\xFCre {or\
an} k\u0131sa",{oran:ppmYuzde(k.speedPpm)}),SI=()=>R().insurance??null,sigortaNedeni=kod=>({VEHICLE_INSURE_AHEAD:\u00E7("Sigorta \u015Fu andan en \xE7ok {n} g\xFCn ileriye uzat\u0131l\u0131r.",{n:sayi(
SI()?.maxAheadDays??28)}),VEHICLE_INSURE_MONEY:\u00E7("Sigortan\u0131n bedeli i\xE7in kredin yetmiyor."),VEHICLE_INSURE_OFF:\u00E7("Bu ara\xE7 sigortalanmaz.")})[kod]??"";function sigortaHtml(u,m){const s=u.
insurance,k=SI();if(!s||!k)return"";const kaza=Number(u.accident_ppm_edge??0)>0?" "+\u00E7("Yolda kaza olas\u0131l\u0131\u011F\u0131 yol ba\u015F\u0131na {oran}.",{oran:ppmYuzde(u.accident_ppm_edge)}):
"",dugme=s.active?\u00E7("Sigortay\u0131 uzat ({kr} kredi, {n} g\xFCn)",{kr:kr(s.premium_cr),n:sayi(k.days)}):\u00E7("Sigorta yapt\u0131r ({kr} kredi, {n} g\xFCn)",{kr:kr(s.premium_cr),n:sayi(k.days)});
return`<div class="bilgi-kutusu${s.active?"":" deniz-kutusu"}" data-arac-sigorta="${s.active?"var":"yok"}" style="margin-top:10px">${ikon(s.active?"shield-check":"shield")}<span>${esc(s.active?\u00E7(
"Sigortal\u0131: {zaman} saatine dek. Yola \xE7\u0131karken sigortas\u0131 ge\xE7erli ara\xE7ta yolda kaza a\u015F\u0131nma eklemez.",{zaman:saatYaz(s.ends_at)}):\u00E7("Sigortas\u0131z: yolda kaza olursa \
ara\xE7 a\u015F\u0131n\u0131r."))}${esc(kaza)}</span></div>
        <div class="oneri-dugmeler" style="margin-top:8px"><button class="dugme ikincil kucuk-d" data-arac-sigortala="${m}" ${s.code||mesgul?"disabled":""}>${ikon("shield-check")}${esc(dugme)}</button\
></div>
        ${s.code?`<p class="kucuk" data-arac-sigorta-neden="${esc(s.code)}">${esc(sigortaNedeni(s.code))}</p>`:""}`}function yerHtml(m){const u=(v.garage??[]).find(x=>x.medium===m);if(!u){const cantada=(R().
kinds??[]).filter(k2=>k2.medium===m&&Number(v.stock?.[k2.id]??0)>0);return`<section class="kart" id="arac-yer-${m}" data-arac-yer="${m}" data-tur="">
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
v.kits??0)),kilit=kilitli(u),renkler=(R().colors??[]).map(r=>`<button class="arac-renk${r===u.color?" secili":""}" data-arac-renk="${m}|${esc(r)}" aria-pressed="${r===u.color}"
          title="${esc(ARAC_RENK_AD[r]??r)}" aria-label="${esc(ARAC_RENK_AD[r]??r)}" style="--renk:${aracRengi(r)}" ${mesgul||kilit?"disabled":""}></button>`).join("");return`<section class="kart" id=\
"arac-yer-${m}" data-arac-yer="${m}" data-tur="${esc(u.kind)}" data-asinma="${Number(u.wear)}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(ORTAM_AD[m])}</p><h2 class="b2"><span class="arac-nokta" style="--renk:${aracRengi(u.color)}"></span>${esc(aracAdi(u.kind))}</h2></div>
          <span class="ik-kutu">${ikon(ARAC_IK[u.kind]??"car")}</span></div>
        ${kimlikHtml(u,m)}
        <div class="bilgi-izgara">
          <div><small>${\u00E7("H\u0131z")}</small><b>${esc(hizYazisi(k))}</b></div>
          <div><small>${\u00E7("Kalan \xF6m\xFCr")}</small><b>${esc(\u00E7("{n} yol",{n:sayi(u.remaining)}))}</b></div>
          <div><small>${\u00E7("Yolculuk")}</small><b>${esc(\u00E7("{n} yolculuk \xB7 {k} yol",{n:sayi(u.trips),k:sayi(u.edges)}))}</b></div>
          ${R().cargo?`<div><small>${\u00E7("Ta\u015F\u0131ma")}</small><b data-arac-kapasite="${Number(u.capacity??0)}">${esc(Number(u.capacity??0)>0?\u00E7("{n} adet",{n:sayi(u.capacity)}):\u00E7("Y\
\xFCk ta\u015F\u0131maz"))}</b></div>`:""}
        </div>
        <div class="cubuk ${u.warn?"mercan":"deniz"} arac-asinma" style="margin-top:10px"><i style="width:${oran.toFixed(1)}%"></i></div>
        <p class="kucuk">${esc(\u00E7("A\u015F\u0131nma {a} / {b}",{a:sayi(u.wear),b:sayi(u.durability)}))}</p>
        ${u.warn?`<div class="bilgi-kutusu uyari-kutusu" style="margin-top:8px">${ikon("circle-alert")}<span>${esc(\u00E7("A\u015F\u0131nma y\xFCksek: {n} bak\u0131m kitiyle tamamen onar\u0131l\u0131r. \xD6mr\xFC dolan ara\xE7 yolculu\u011Fun\
 ba\u015F\u0131nda hurdaya ayr\u0131l\u0131r.",{n:sayi(u.kits_max)}))}</span></div>`:""}
        <p class="ust-yazi" style="margin-top:12px">${\u00E7("Renk")}</p>
        <div class="arac-renkler" role="group" aria-label="${esc(\u00E7("Renk"))}">${renkler}</div>
        <label class="arac-kullan"><input type="checkbox" data-arac-etkin="${m}" ${u.active?"checked":""} ${mesgul||kilit?"disabled":""}> ${\u00E7("Yolculukta kullan")}</label>
        ${u.active?"":`<p class="kucuk">${esc(\u00E7("Kapal\u0131yken yolculuklar\u0131n ara\xE7s\u0131z (bilet ve otob\xFCsle) olur; ara\xE7 a\u015F\u0131nmaz."))}</p>`}
        ${kargoHtml(u)}${kiraHtml(u,m)}${sigortaHtml(u,m)}
        <div class="oneri-dugmeler" style="margin-top:10px">
          <button class="dugme altin kucuk-d" data-arac-onar="${m}" data-kit="${kit}" ${!u.wear||!kit||mesgul||kilit?"disabled":""}>${ikon("wrench")}${u.wear?\u00E7("Onar ({n} kit)",{n:sayi(Math.max(1,
kit))}):\u00E7("Onar\u0131m gerekmiyor")}</button>
          <button class="dugme ikincil kucuk-d" data-arac-cikar="${m}" ${u.wear>0||v.traveling||mesgul||kilit?"disabled":""}>${ikon("package")}${\u00E7("Garajdan \xE7\u0131kar")}</button>
          <button class="dugme sade kucuk-d" data-arac-hurda="${m}" ${v.traveling||mesgul||kilit?"disabled":""}>${ikon("trash")}${\u00E7("Hurdaya ay\u0131r")}</button>
        </div>
        <p class="kucuk" style="margin-top:6px">${kilit?esc(u.rental?\u00E7("Kiradayken arac\u0131n de\u011Fi\u015Fmez: rengi, onar\u0131m\u0131, garajdan \xE7\u0131karmak ve hurdaya ay\u0131rmak kiralama bitince."):
\u00E7("Kargodayken arac\u0131n de\u011Fi\u015Fmez; var\u0131nca yine kullan\u0131rs\u0131n.")):esc(u.wear>0?Number(v.kits??0)>0?\u00E7("Garajdan \xE7\u0131karmak (satmak) i\xE7in \xF6nce tamamen onar."):
\u00E7("Bak\u0131m kitin yok: Pazar'dan alabilirsin. Garajdan \xE7\u0131karmak i\xE7in \xF6nce tamamen onar."):\u00E7("A\u015F\u0131nmas\u0131z ara\xE7 garajdan \xE7\u0131kar ve \xE7antana d\xF6ner; satabilirsin."))}${v.
traveling?" "+esc(\u00E7("Yoldayken garaj\u0131ndaki arac\u0131 de\u011Fi\u015Ftiremezsin.")):""}</p>
      </section>`}function kiraladiklarimHtml(){const l=v.rented_in??[];return l.length?`<section class="kart" id="arac-kiraladiklarim">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kiral\u0131k")}</p><h2 class="b2">${\u00E7("Kiralad\u0131\u011F\u0131n ara\xE7lar")}</h2></div><span class="ik-kutu">${ikon("key-round")}\
</span></div>
        <div class="liste">${l.map(u=>{const x=u.rental??{};return`<div class="liste-satir" data-arac-kiraladigim="${esc(x.rental_id??"")}">
            <span class="liste-ikon">${ikon(ARAC_IK[u.kind]??"car")}</span>
            <div><span class="tur"><span class="plaka kucuk-plaka">${esc(u.plate??"")}</span></span><b>${esc(aracRenkliAdBas(u.kind,u.color))}${u.name?` \xB7 ${esc(u.name)}`:""}</b>
              <div class="alt">${esc(\u00E7("Sahibi {ad} \xB7 {zaman} saatine dek \xB7 a\u015F\u0131nma {a}/{b}",{ad:x.owner?.name??"",zaman:saatYaz(x.ends_at),a:sayi(u.wear),b:sayi(u.durability)}))}<\
/div>
              <div class="alt">${esc(\u00E7("Onar\u0131m bedeli \u015Fimdilik {kr} kredi; rezervin {dep} kredi, kalan\u0131 d\xF6n\xFC\u015Fte serbest kal\u0131r.",{kr:kr(x.repair_now??0),dep:kr(x.deposit_cr??
0)}))}</div>
              ${u.busy?`<div class="alt">${esc(\u00E7("Kargoda; var\u0131\u015F {zaman}.",{zaman:saatYaz(u.busy.arrives_at)}))}</div>`:""}
              ${SI()?`<div class="alt" data-arac-kiralik-sigorta="${u.insured_until?"var":"yok"}">${esc(u.insured_until?\u00E7("Sahibinin sigortas\u0131 {zaman} saatine dek: yolda kazada ara\xE7 a\u015F\u0131nmaz.",
{zaman:saatYaz(u.insured_until)}):\u00E7("Sigortas\u0131z: yolda kaza olursa a\u015F\u0131n\u0131r; bedeli d\xF6n\xFC\u015Fte onar\u0131m rezervinden."))}</div>`:""}</div><span></span></div>`}).join("")}\
</div>
        <p class="kucuk" style="margin-top:8px">${esc(\u00E7("Kiralad\u0131\u011F\u0131n ara\xE7 yolculuklar\u0131nda kendili\u011Finden kullan\u0131l\u0131r; kom\u015Fu \xFClkedeki depona kargo da ta\u015F\u0131yabilirsin. S\xFCre bitince sahibine d\xF6ner; yol\
 s\xFCreden uzunsa ara\xE7 kullan\u0131lmaz."))}</p>
      </section>`:""}function ilanlarHtml(){const k=KR();if(!k)return"";const l=v.offers_here??[],kredi=Number(v.credits??0);return`<section class="kart" id="arac-ilanlar">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(v.place?bolgeAdi(v.place):\u00E7("Yoldas\u0131n"))}</p><h2 class="b2">${\u00E7("Kiral\u0131k ara\xE7lar")}</h2></div><span class="ik-kutu">${ikon(
"hand-coins")}</span></div>
        ${l.length?`<div class="liste">${l.map(o=>{const engel=(v.garage??[]).some(u=>u.medium===o.medium)||(v.rented_in??[]).some(u=>u.medium===o.medium)?o.medium==="sea"?\u00E7("Garaj\u0131nda tekne var"):
\u00E7("Garaj\u0131nda kara arac\u0131 var"):kredi<Number(o.day_cr)+Number(k.depositCr)?\u00E7("Kredin yetmiyor"):null;return`<div class="liste-satir" data-arac-ilan="${esc(o.rental_id)}"><span class=\
"liste-ikon">${ikon(ARAC_IK[o.kind]??"car")}</span>
            <div><span class="tur"><span class="plaka kucuk-plaka">${esc(o.plate??"")}</span></span><b>${esc(aracRenkliAdBas(o.kind,o.color))}${o.name?` \xB7 ${esc(o.name)}`:""}</b>
              <div class="alt">${esc(\u00E7("Sahibi {ad} \xB7 g\xFCnl\xFCk {kr} kredi \xB7 en \xE7ok {gun} g\xFCn",{ad:o.owner?.name??"",kr:kr(o.day_cr),gun:sayi(o.max_days)}))}</div>
              <div class="alt">${esc(\u00E7("A\u015F\u0131nma {a}/{b}",{a:sayi(o.wear??0),b:sayi(o.durability??0)}))}${Number(o.capacity??0)>0?" \xB7 "+esc(\u00E7("{n} adet ta\u015F\u0131r",{n:sayi(o.
capacity)})):""}</div>
              ${SI()?`<div class="alt" data-arac-ilan-sigorta="${o.insured_until?"var":"yok"}">${esc(o.insured_until?\u00E7("Sigortal\u0131: {zaman} saatine dek",{zaman:saatYaz(o.insured_until)}):\u00E7(
"Sigortas\u0131z"))}</div>`:""}
              ${engel?`<div class="alt saglik-engel">${esc(engel)}</div>`:""}</div>
            <span class="oneri-dugmeler"><button class="dugme altin kucuk-d" data-arac-kirala="${esc(o.rental_id)}" ${engel||mesgul?"disabled":""}>${ikon("key-round")}${\u00E7("Kirala")}</button>
              ${o.name?`<button class="dugme sade kucuk-d" data-arac-bildir="${esc(o.vehicle_id)}" data-ad="${esc(o.name)}" title="${esc(\u00E7("Arac\u0131n ad\u0131n\u0131 raporla"))}" aria-label="${esc(
\u00E7("Arac\u0131n ad\u0131n\u0131 raporla"))}">${ikon("circle-alert")}</button>`:""}</span></div>`}).join("")}</div>`:`<p class="bos">${esc(v.place?\u00E7("Bu \u015Fehirde \u015Fu an kiral\u0131k ara\xE7 yok. Ara\xE7 sa\
hipleri \u015Fehirdeyken ilanlar\u0131 burada g\xF6r\xFCn\xFCr."):\u00E7("Yoldayken kiral\u0131k ara\xE7 g\xF6remezsin; var\u0131nca \u015Fehrin ilanlar\u0131 burada."))}</p>`}
        <p class="kucuk" style="margin-top:8px">${esc(\u00E7("Kira pe\u015Fin \xF6denir; ayr\u0131ca {dep} kredi onar\u0131m rezervi ayr\u0131l\u0131r. D\xF6n\xFC\u015Fte yapt\u0131\u011F\u0131n a\u015F\u0131nman\u0131n bedeli (her birim {a} kredi) sahibine ge\xE7er, kala\
n\u0131 serbest kal\u0131r.",{dep:kr(k.depositCr),a:kr(k.wearCr)}))}</p>
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
      </section>`}function kurallarHtml(){const r=R(),son=v.recent??[],kira=(v.rentals??[]).slice(0,6);return`<section class="kart" id="arac-kurallar">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Nas\u0131l \xE7al\u0131\u015F\u0131r")}</p><h2 class="b2">${\u00E7("Yolda ara\xE7")}</h2></div><span class="ik-kutu">${ikon("info")}</s\
pan></div>
        <ul class="arac-kural">
          <li>${esc(\u00E7("Kara arac\u0131 kara yollar\u0131nda, tekne deniz ge\xE7i\u015Flerinde kullan\u0131l\u0131r; s\xFCre arac\u0131n h\u0131z\u0131 kadar k\u0131sal\u0131r."))}</li>
          <li>${esc(\u00E7("Belediyenin yol projesiyle birlikte yolculuk en \xE7ok {oran} k\u0131sal\u0131r. Bilet bedeli de\u011Fi\u015Fmez.",{oran:ppmYuzde(r.cap_ppm??5e5)}))}</li>
          <li>${esc(\u00E7("Sava\u015F\u0131n hedef ya da \xE7\u0131k\u0131\u015F b\xF6lgesine giden yolculukta ara\xE7 kullan\u0131lmaz."))}</li>
          <li>${esc(\u00E7("Kullan\u0131lan her yol bir a\u015F\u0131nma. Bir bak\u0131m kiti {n} a\u015F\u0131nmay\u0131 giderir; \xF6mr\xFC dolan ara\xE7 hurdaya ayr\u0131l\u0131r.",{n:sayi(r.repair_per_kit??
20)}))}</li>
          <li>${esc(\u00E7("Ara\xE7 sava\u015F g\xFCc\xFCne, oya ve gelire d\xF6n\xFC\u015Fmez; rengi yaln\u0131z g\xF6r\xFCn\xFCm."))}</li>
          ${r.cargo?`<li>${esc(\u00E7("Kendi arac\u0131nla kom\u015Fu \xFClkedeki depona navlunsuz kargo ta\u015F\u0131rs\u0131n (\u015Eehrim \u2192 Depo): motosiklet {a}, otomobil {b}, tekne {c} adet; tekne yaln\u0131z deniz yolundan, bisikle\
t y\xFCk almaz. S\xFCre arac\u0131n h\u0131z\u0131yla k\u0131sal\u0131r, ara\xE7 yol ba\u015F\u0131na a\u015F\u0131n\u0131r ve var\u0131\u015Fa dek ba\u015Fka i\u015Fte kullan\u0131lmaz.",{a:sayi(r.cargo.
kinds?.motosiklet??0),b:sayi(r.cargo.kinds?.otomobil??0),c:sayi(r.cargo.kinds?.tekne??0)}))}</li>`:""}
          ${r.rental?`<li>${esc(\u00E7("Arac\u0131n\u0131 g\xFCnl\xFCk {a}\u2013{b} krediye {c}\u2013{d} g\xFCn kiraya verebilirsin; kirac\u0131n\u0131n yapt\u0131\u011F\u0131 a\u015F\u0131nman\u0131n bedelini (birim ba\u015F\u0131na {e}, en \xE7ok {f} kredi) d\xF6n\xFC\u015Fte al\u0131rs\u0131n.",
{a:kr(r.rental.dayMinCr),b:kr(r.rental.dayMaxCr),c:sayi(r.rental.minDays),d:sayi(r.rental.maxDays),e:kr(r.rental.wearCr),f:kr(r.rental.depositCr)}))}</li>`:""}
          ${r.name?`<li>${esc(\u00E7("Her arac\u0131n \xFClkenin koduyla benzersiz bir plakas\u0131 var; arac\u0131na ad verebilirsin. Topluluk kurallar\u0131na uymayan ad raporlan\u0131r ve kald\u0131r\u0131l\u0131r."))}\
</li>`:""}
        </ul>
        <p class="kucuk">${ikon("wrench")} ${esc(\u00E7("Bak\u0131m kitin: {n}",{n:sayi(v.kits??0)}))}</p>
        ${son.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Ara\xE7la son yolculuklar\u0131n")}</p><div class="liste">${son.map(t=>`<div class="liste-satir" data-arac-son="${esc(t.travel_id)}\
">
            <span class="liste-ikon">${ikon(ARAC_IK[t.land??t.sea]??"route")}</span>
            <div><span class="tur">${esc(saatYaz(t.departs_at))}</span><b>${esc(bolgeAdi(t.from))} \u2192 ${esc(bolgeAdi(t.to))}</b>
              <div class="alt">${esc(\u00E7("{a} yerine {b} dakika",{a:sayi(t.minutes_before??t.minutes),b:sayi(t.minutes)}))}${t.land?" \xB7 "+esc(aracAdi(t.land)):""}${t.sea?" \xB7 "+esc(aracAdi(t.sea)):
""}</div></div><span></span></div>`).join("")}</div>`:""}
        ${kira.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Son kiralamalar\u0131n")}</p><div class="liste">${kira.map(x=>{const sahip=x.owner?.id===ben().id;return`<div class="liste-\
satir" data-arac-kira-gecmis="${esc(x.rental_id)}">
            <span class="liste-ikon">${ikon(ARAC_IK[x.kind]??"car")}</span>
            <div><span class="tur">${esc(sahip?\u00E7("Kiraya verdin"):\u00E7("Kiralad\u0131n"))} \xB7 ${esc(KIRA_DURUM[x.status]??x.status)}</span><b>${esc(aracAdi(x.kind))} \xB7 ${esc(x.plate??"")}<\
/b>
              <div class="alt">${esc(sahip?\u00E7("Kirac\u0131 {ad} \xB7 {gun} g\xFCn \xB7 {kr} kredi",{ad:x.renter?.name??"",gun:sayi(x.days??0),kr:kr(x.fee_cr??0)}):\u00E7("Sahibi {ad} \xB7 {gun} g\xFCn \xB7\
 {kr} kredi",{ad:x.owner?.name??"",gun:sayi(x.days??0),kr:kr(x.fee_cr??0)}))}${x.status!=="active"?" \xB7 "+esc(\u00E7("onar\u0131m {kr} kredi",{kr:kr(x.repair_cr??0)})):""}</div></div><span></span></\
div>`}).join("")}</div>`:""}
      </section>`}const KAZA_AGIRLIK={hafif:\u00E7("Hafif kaza"),agir:\u00E7("A\u011F\u0131r kaza")};function kazaSonucu(a){return a.insured?\u00E7("Sigorta kar\u015F\u0131lad\u0131; ara\xE7 a\u015F\u0131nmad\u0131."):
a.wear_after==null?\u00E7("Ara\xE7 art\u0131k garajda de\u011Fildi."):Number(a.applied)?\u00E7("A\u015F\u0131nma +{n} ({a} \u2192 {b} / {c}).",{n:sayi(a.applied),a:sayi(a.wear_before),b:sayi(a.wear_after),
c:sayi(a.durability)}):\u00E7("Ara\xE7 son yolundayd\u0131; daha fazla a\u015F\u0131nmad\u0131.")}function kazaHtml(){const a=R().accident,k=SI();if(!a&&!k)return"";const l=v.accidents??[],benim=ben().
id,oran=id=>ppmYuzde(a?.perEdgePpm?.[id]??0);return`<section class="kart" id="arac-kaza">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Yolda")}</p><h2 class="b2">${\u00E7("Kaza ve sigorta")}</h2></div><span class="ik-kutu">${ikon("triangle-alert")}</span></div>
        <ul class="arac-kural">
          ${a?`<li>${esc(\u00E7("Ara\xE7la yolda kaza olabilir. Olas\u0131l\u0131k kullan\u0131lan her yol i\xE7in: bisiklet {b}, motosiklet {m}, otomobil {o}, tekne {t}; a\u015F\u0131nm\u0131\u015F ara\xE7ta iki kat\u0131, en \xE7ok {en}.",
{b:oran("bisiklet"),m:oran("motosiklet"),o:oran("otomobil"),t:oran("tekne"),en:ppmYuzde(a.maxPpm)}))}</li>
          <li>${esc(\u00E7("Lojistik becerin y\xFCkseldik\xE7e kaza azal\u0131r: her seviye {oran} (100'de yar\u0131ya). Senin becerin: {n}.",{oran:ppmYuzde(a.skillCutPpm),n:sayi(v.skill??0)}))}</li>
          <li>${esc(\u00E7("Hafif kaza arac\u0131n \xF6mr\xFCnden %{h}, a\u011F\u0131r kaza %{a} g\xF6t\xFCr\xFCr; bir kazan\u0131n a\u011F\u0131r olma olas\u0131l\u0131\u011F\u0131 {oran}. Kaza arac\u0131 hurdaya ay\u0131rmaz; haber yolun ortas\u0131nda gelir.",
{h:sayi(a.damagePct?.hafif??5),a:sayi(a.damagePct?.agir??25),oran:ppmYuzde(a.severePpm)}))}</li>`:""}
          ${k?`<li>${esc(\u00E7("Sigorta {n} g\xFCnl\xFCk: bisiklet {b}, motosiklet {m}, otomobil {o}, tekne {t} kredi; bedel sisteme gider. En \xE7ok {en} g\xFCn ileriye uzat\u0131l\u0131r.",{n:sayi(
k.days),b:kr(k.premiumCr?.bisiklet??0),m:kr(k.premiumCr?.motosiklet??0),o:kr(k.premiumCr?.otomobil??0),t:kr(k.premiumCr?.tekne??0),en:sayi(k.maxAheadDays)}))}</li>
          <li>${esc(\u00E7("Yola \xE7\u0131karken sigortas\u0131 ge\xE7erli ara\xE7ta kaza a\u015F\u0131nma eklemez; kiraya verdi\u011Finde kirac\u0131n\u0131 da kapsar. Sigortas\u0131z kiral\u0131k ara\xE7ta kazan\u0131n a\u015F\u0131nmas\u0131 kirac\u0131n\u0131n onar\u0131m bedeline girer\
."))}</li>`:""}
        </ul>
        ${l.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Son kazalar\u0131n")}</p><div class="liste">${l.map(x=>{const kim=x.driver_id&&x.driver_id!==benim?\u00E7("Kirac\u0131n {ad} kullan\
\u0131yordu.",{ad:x.driver??\u00E7("silinmi\u015F hesap")}):x.owner_id&&x.owner_id!==benim?\u00E7("Kiralad\u0131\u011F\u0131n ara\xE7 (sahibi {ad}).",{ad:x.owner??\u00E7("silinmi\u015F hesap")}):"";return`\
<div class="liste-satir" data-arac-kaza="${esc(x.id)}" data-kaza-agirlik="${esc(x.severity)}">
            <span class="liste-ikon ${x.insured?"yesil":""}">${ikon(x.insured?"shield-check":"triangle-alert")}</span>
            <div><span class="tur">${esc(saatYaz(x.at))} \xB7 ${esc(x.context==="cargo"?\u00E7("Kargo yolunda"):\u00E7("Yolculukta"))}</span><b>${esc(KAZA_AGIRLIK[x.severity]??x.severity)} \xB7 ${esc(
aracRenkliAdBas(x.kind,x.color))} \xB7 ${esc(x.plate??"")}</b>
              <div class="alt">${esc(bolgeAdi(x.from))} \u2192 ${esc(bolgeAdi(x.to))} \xB7 ${esc(kazaSonucu(x))}</div>
              ${kim?`<div class="alt">${esc(kim)}</div>`:""}</div><span></span></div>`}).join("")}</div>`:`<p class="bos">${esc(\u00E7("Hen\xFCz kaza yapmad\u0131n."))}</p>`}
      </section>`}function ciz(){kap.innerHTML=`<div class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m")}</p><h1 class="b1">${\u00E7("Ara\xE7lar\u0131m")}</h1>
          <p class="aciklama">${\u00E7("Bisikletten tekneye: ara\xE7 yolculuklar\u0131n\u0131 k\u0131salt\u0131r. Kara arac\u0131 ve tekne garaj\u0131nda durur; her yolculukta biraz a\u015F\u0131n\u0131r.")}\
</p></div></div>
        <div id="arac-garaj-yer"></div>
        <div class="izgara iki" style="margin-top:20px">${yerHtml("land")}${yerHtml("sea")}</div>
        ${(()=>{const a=kiraladiklarimHtml(),b=ilanlarHtml();return a||b?`<div class="izgara iki" style="margin-top:20px">${a}${b}</div>`:""})()}
        <div class="izgara iki" style="margin-top:20px">${bayiHtml()}${kurallarHtml()}</div>
        ${(()=>{const k=kazaHtml();return k?`<div style="margin-top:20px">${k}</div>`:""})()}
      </div>`,$("#arac-garaj-yer",kap)?.replaceWith(sahne.el),sahne.yaz({v,ben:{id:ben().id,ad:ben().name,gorunus,ulke:ben().citizenship}}),bagla()}async function isle(fn,basari){if(!mesgul){mesgul=!0;
try{const y=await fn();if(kapandi)return;y?.rule&&(v=y),basari?.(y),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert"),await yukle().catch(()=>{})}finally{mesgul=!1,kapandi||ciz()}}}
async function pencereIs(fn,basari){const y=await fn();kapandi||(y?.rule&&(v=y),basari?.(y),Durum.ozet().catch(()=>{}),mesgul||ciz())}function adPenceresi(m){const n=R().name,u=(v.garage??[]).find(x=>x.
medium===m);!n||!u||pencereForm({ust:\u00E7("Ara\xE7lar\u0131m \xB7 {plaka}",{plaka:u.plate??""}),baslik:\u00E7("Arac\u0131na ad ver"),onayAd:\u00E7("Ad\u0131 kaydet"),onayIkon:"pencil",govde:`<label \
class="alan"><span>${esc(\u00E7("Ad ({a}\u2013{b} harf)",{a:sayi(n.minLength),b:sayi(n.maxLength)}))}</span><input name="ad" maxlength="${Number(n.maxLength)}" autocomplete="off" value="${esc(u.name??
"")}"></label>
          <p class="kucuk">${esc(\u00E7("Ad profilinde, kiral\u0131k ilanda ve yolculu\u011Fun kart\u0131nda g\xF6r\xFCn\xFCr; topluluk kurallar\u0131na uymayan ad raporlan\u0131r ve kald\u0131r\u0131l\u0131r. Bo\u015F b\u0131rak\u0131rsan arac\u0131n ads\u0131z olur."))}\
</p>`,is:async f=>{const ad=String(f.get("ad")??"").trim().replace(/\s+/g," ");if(ad&&([...ad].length<Number(n.minLength)||[...ad].length>Number(n.maxLength)))throw new Error(\u00E7("Arac\u0131n ad\u0131 {a}\u2013{b\
} harf olmal\u0131.",{a:sayi(n.minLength),b:sayi(n.maxLength)}));await pencereIs(()=>Sunucu.yap("vehicle_name",{p_medium:m,p_name:ad}),()=>tost(ad?\u00E7("Arac\u0131n\u0131n ad\u0131: {ad}",{ad}):\u00E7(
"Arac\u0131n art\u0131k ads\u0131z."),"pencil"))}})}function kirayaVerPenceresi(m){const k=KR(),u=(v.garage??[]).find(x=>x.medium===m);if(!k||!u)return;const gunler=Array.from({length:Number(k.maxDays)-
Number(k.minDays)+1},(_,i)=>Number(k.minDays)+i);pencereForm({ust:\u00E7("Ara\xE7lar\u0131m \xB7 {plaka}",{plaka:u.plate??""}),baslik:\u00E7("{arac}: kiraya ver",{arac:aracRenkliAdBas(u.kind,u.color)}),
onayAd:\u00E7("\u0130lana koy"),onayIkon:"hand-coins",govde:`<p class="aciklama">${esc(\u00E7("\u0130lan bulundu\u011Fun \u015Fehirde ({sehir}) g\xF6r\xFCn\xFCr; sen \u015Fehirdeyken kiralanabilir. Kirac\u0131 arac\u0131n\u0131 s\xFCre boyunca yol\
culukta ve kargoda kullan\u0131r; sen o s\xFCrede kullanamazs\u0131n.",{sehir:bolgeAdi(v.place)}))}</p>
          <label class="alan"><span>${esc(\u00E7("G\xFCnl\xFCk \xFCcret (kredi, {a}\u2013{b})",{a:kr(k.dayMinCr),b:kr(k.dayMaxCr)}))}</span><input name="ucret" inputmode="decimal" required value="${esc(
krediGirdi(Math.max(Number(k.dayMinCr),Math.min(Number(k.dayMaxCr),500))))}"></label>
          <label class="alan"><span>${\u00E7("En \xE7ok ka\xE7 g\xFCn")}</span><select name="gun">${gunler.map(g=>`<option value="${g}" ${g===Math.min(3,Number(k.maxDays))?"selected":""}>${esc(\u00E7(
"{n} g\xFCn",{n:sayi(g)}))}</option>`).join("")}</select></label>
          <p class="kucuk">${esc(\u00E7("\xDCcret pe\u015Fin \xF6denir; maa\u015F vergisi d\xFC\u015F\xFCl\xFCr. D\xF6n\xFC\u015Fte kirac\u0131n\u0131n yapt\u0131\u011F\u0131 a\u015F\u0131nman\u0131n bedeli (her birim {a} kredi, en \xE7ok {b} kredi) sana ge\xE7er. \u0130lan\u0131 istedi\u011Fin an kal\
d\u0131rabilirsin.",{a:kr(k.wearCr),b:kr(k.depositCr)}))}</p>`,is:async f=>{const alt=krediAlt(String(f.get("ucret")??""));if(!(alt>=Number(k.dayMinCr)&&alt<=Number(k.dayMaxCr)))throw new Error(\u00E7(
"G\xFCnl\xFCk \xFCcret {a}\u2013{b} kredi olmal\u0131.",{a:kr(k.dayMinCr),b:kr(k.dayMaxCr)}));await pencereIs(()=>Sunucu.yap("vehicle_rent_offer",{p_medium:m,p_day_cr:alt,p_max_days:Number(f.get("gun"))}),
()=>tost(\u00E7("{arac} kiral\u0131k ilanda: g\xFCnl\xFCk {kr} kredi.",{arac:aracRenkliAdBas(u.kind,u.color),kr:kr(alt)}),"hand-coins"))}})}function kiralaPenceresi(id){const k=KR(),o=(v.offers_here??
[]).find(x=>x.rental_id===id);if(!k||!o)return;const en=Math.min(Number(o.max_days),Number(k.maxDays)),gunler=Array.from({length:Math.max(0,en-Number(k.minDays)+1)},(_,i)=>Number(k.minDays)+i),ozet=g=>\u00E7(
"Toplam {kr} kredi pe\u015Fin, ayr\u0131ca {dep} kredi onar\u0131m rezervi (kullan\u0131lmayan k\u0131sm\u0131 d\xF6ner). D\xF6n\xFC\u015F: {zaman}.",{kr:kr(Number(o.day_cr)*g),dep:kr(k.depositCr),zaman:saatYaz(
new Date(Date.now()+g*864e5).toISOString())}),p=pencereForm({ust:\u00E7("Kiral\u0131k ara\xE7 \xB7 {plaka}",{plaka:o.plate??""}),baslik:\u00E7("{arac}: kirala",{arac:aracRenkliAdBas(o.kind,o.color)}),
onayAd:\u00E7("Kirala"),onayIkon:"key-round",govde:`<p class="aciklama">${esc(\u00E7("Sahibi {ad}. G\xFCnl\xFCk {kr} kredi, en \xE7ok {gun} g\xFCn. Kiralad\u0131\u011F\u0131n ara\xE7 yolculuklar\u0131nda kendili\u011Finden kullan\u0131l\u0131r; kom\u015Fu\
 \xFClkedeki depona kargo da ta\u015F\u0131yabilirsin.",{ad:o.owner?.name??"",kr:kr(o.day_cr),gun:sayi(en)}))}</p>
          <label class="alan"><span>${\u00E7("Ka\xE7 g\xFCn")}</span><select name="gun">${gunler.map(g=>`<option value="${g}">${esc(\u00E7("{n} g\xFCn",{n:sayi(g)}))}</option>`).join("")}</select></la\
bel>
          <p class="kucuk" data-kira-ozet>${esc(ozet(gunler[0]??1))}</p>
          <p class="kucuk">${esc(\u00E7("D\xF6n\xFC\u015Fte yapt\u0131\u011F\u0131n a\u015F\u0131nman\u0131n bedeli (her birim {a} kredi) rezervden sahibine ge\xE7er.",{a:kr(k.wearCr)}))}</p>`,is:async f=>{
const g=Number(f.get("gun"));await pencereIs(()=>Sunucu.yap("vehicle_rent",{p_rental:id,p_days:g,p_expected_total:Number(o.day_cr)*g}),()=>tost(\u00E7("Kiralad\u0131n: {arac}, {gun} g\xFCn. Yolculuklar\u0131nda ku\
llan\u0131l\u0131r.",{arac:aracRenkliAd(o.kind,o.color),gun:sayi(g)}),"key-round"))}}),s=$("select[name=gun]",p.form),oz=$("[data-kira-ozet]",p.form);s?.addEventListener("change",()=>{oz&&(oz.textContent=
ozet(Number(s.value)))})}function sigortaPenceresi(m){const u=(v.garage??[]).find(x=>x.medium===m),s=u?.insurance,k=SI();if(!u||!s||!k)return;const arac=aracRenkliAdBas(u.kind,u.color);pencere({ust:\u00E7(
"Ara\xE7lar\u0131m \xB7 {plaka}",{plaka:u.plate??""}),baslik:s.active?\u00E7("{arac}: sigortay\u0131 uzat",{arac}):\u00E7("{arac}: sigorta yapt\u0131r",{arac}),govde:`<p class="aciklama">${esc(\u00E7(
"{n} g\xFCnl\xFCk sigorta: {kr} kredi. Bedel sisteme gider; geri verilmez.",{n:sayi(k.days),kr:kr(s.premium_cr)}))}</p>
          <div class="bilgi-izgara">
            <div><small>${\u00E7("Bedel")}</small><b>${esc(\u00E7("{kr} kredi",{kr:kr(s.premium_cr)}))}</b></div>
            <div><small>${\u00E7("Sigortan\u0131n biti\u015Fi")}</small><b data-sigorta-bitis>${esc(saatYaz(s.next_ends_at))}</b></div>
          </div>
          <p class="kucuk">${esc(\u00E7("Yola \xE7\u0131karken sigortas\u0131 ge\xE7erli ara\xE7ta yolda kaza a\u015F\u0131nma eklemez; kiraya verdi\u011Finde kirac\u0131n\u0131 da kapsar. Sigorta en \xE7ok {n} g\xFCn ileriye uzat\u0131l\u0131r; ara\xE7 garajdan \
\xE7\u0131k\u0131nca ya da hurdaya ayr\u0131l\u0131nca biter.",{n:sayi(k.maxAheadDays)}))}</p>
          ${Number(v.credits??0)<Number(s.premium_cr)?`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(\u00E7("Sigortan\u0131n bedeli i\xE7in kredin yetmiyor."))}</span></div>`:""}`,dugmeler:[
{ad:\u00E7("Vazge\xE7")},{ad:s.active?\u00E7("Uzat"):\u00E7("Sigorta yapt\u0131r"),sinif:"altin",ikon:"shield-check",is:()=>isle(()=>Sunucu.yap("vehicle_insure",{p_medium:m,p_expected_cr:Number(s.premium_cr)}),
y=>tost(\u00E7("{arac} {zaman} saatine dek sigortal\u0131.",{arac,zaman:saatYaz(y?.insured?.ends_at)}),"shield-check"))}]})}function bagla(){for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(
b.dataset.git);for(const b of $$("[data-arac-ad]",kap))b.onclick=()=>adPenceresi(b.dataset.aracAd);for(const b of $$("[data-arac-kiraya]",kap))b.onclick=()=>kirayaVerPenceresi(b.dataset.aracKiraya);for(const b of $$(
"[data-arac-sigortala]",kap))b.onclick=()=>sigortaPenceresi(b.dataset.aracSigortala);for(const b of $$("[data-arac-ilan-kaldir]",kap))b.onclick=()=>isle(()=>Sunucu.yap("vehicle_rent_cancel",{p_rental:b.
dataset.aracIlanKaldir}),()=>tost(\u00E7("Kiral\u0131k ilan kald\u0131r\u0131ld\u0131."),"x"));for(const b of $$("[data-arac-kirala]",kap))b.onclick=()=>kiralaPenceresi(b.dataset.aracKirala);for(const b of $$(
"[data-arac-bildir]",kap))b.onclick=()=>raporla({tur:"vehicle",ref:b.dataset.aracBildir,ad:b.dataset.ad});for(const b of $$("[data-arac-al]",kap))b.onclick=()=>isle(()=>Sunucu.yap("vehicle_dealer_buy",
{p_kind:b.dataset.aracAl,p_use:!0}),y=>tost(y?.used?\u00E7("Ald\u0131n: {arac}; garaj\u0131na kondu.",{arac:aracAdi(y.bought)}):\u00E7("Ald\u0131n: {arac}; \xE7antanda duruyor.",{arac:aracAdi(y?.bought)}),
"car"));for(const b of $$("[data-arac-garaja]",kap))b.onclick=()=>isle(()=>Sunucu.yap("vehicle_register",{p_kind:b.dataset.aracGaraja,p_color:null}),()=>tost(\u00E7("{arac} garaj\u0131na kondu.",{arac:aracAdi(
b.dataset.aracGaraja)}),"warehouse"));for(const b of $$("[data-arac-renk]",kap))b.onclick=()=>{const[m,r]=b.dataset.aracRenk.split("|");isle(()=>Sunucu.yap("vehicle_set",{p_medium:m,p_color:r,p_active:null}))};
for(const b of $$("[data-arac-etkin]",kap))b.onchange=()=>isle(()=>Sunucu.yap("vehicle_set",{p_medium:b.dataset.aracEtkin,p_color:null,p_active:b.checked}),()=>tost(b.checked?\u00E7("Yolculuklar\u0131nda a\
rac\u0131n\u0131 kullanacaks\u0131n."):\u00E7("Yolculuklar\u0131nda arac\u0131n\u0131 kullanmayacaks\u0131n."),"route"));for(const b of $$("[data-arac-onar]",kap))b.onclick=()=>isle(()=>Sunucu.yap("ve\
hicle_repair",{p_medium:b.dataset.aracOnar,p_kits:Math.max(1,Number(b.dataset.kit))}),y=>tost(\u00E7("Onar\u0131ld\u0131: a\u015F\u0131nma {n}.",{n:sayi(y?.wear??0)}),"wrench"));for(const b of $$("[da\
ta-arac-cikar]",kap))b.onclick=()=>isle(()=>Sunucu.yap("vehicle_release",{p_medium:b.dataset.aracCikar}),y=>tost(\u00E7("{arac} garajdan \xE7\u0131kt\u0131; \xE7antanda.",{arac:aracAdi(y?.released)}),
"package"));for(const b of $$("[data-arac-hurda]",kap))b.onclick=()=>{const u=(v.garage??[]).find(x=>x.medium===b.dataset.aracHurda);pencere({ust:\u00E7("Ara\xE7lar\u0131m"),baslik:\u00E7("Hurdaya ay\u0131\
rmak istiyor musun?"),govde:`<p class="aciklama">${esc(\u00E7("{arac} t\xFCkenir; geri al\u0131nmaz.",{arac:aracAdi(u?.kind)}))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Hurdaya ay\u0131r"),
sinif:"mercan",ikon:"trash",is:()=>isle(()=>Sunucu.yap("vehicle_scrap",{p_medium:b.dataset.aracHurda}),()=>tost(\u00E7("Arac\u0131n hurdaya ayr\u0131ld\u0131."),"trash"))}]})}}const tazele=tazeleyici(
async()=>{await yukle(),!kapandi&&!mesgul&&ciz()});await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^(vehicle\.|travel\.|shipment\.)/.test(olay)&&tazele()});return()=>{kapandi=!0,b1(),sahne.
kapat()}}}),Parcalar.tamam("ek_98zu_araclar");
