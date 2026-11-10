// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_98zp_hobi.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/hobiler",{async ac(kap){let v=null,kapandi=!1,durdur=()=>{};const sahne=HobiSahnesi.ac();sahne.dinle("sec",ad=>{const el=$({mutfak:"#hobi-mutfak",diller:"#hobi-diller",kiler:"#hobi\
-kiler",terzi:"#hobi-terzi"}[ad]??"#hobi-seans",kap);el&&(el.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"center"}),el.classList.remove("vurgu-yan"),el.offsetWidth,el.classList.add("vu\
rgu-yan"))});const ben=()=>Durum.v.ozet?.character??{};let gorunus,bekleyenZaman=null,kirli=!1,bekleyen=!1,kapaliAcik=!1,terziKapaliAcik=!1,sonRenk=[5,1];kap.addEventListener("toggle",e=>{e.target?.id===
"hobi-kapali"&&(kapaliAcik=e.target.open),e.target?.id==="hobi-terzi-kapali"&&(terziKapaliAcik=e.target.open)},!0),kap.addEventListener("input",e=>{e.target.closest("#hobi-dil-form")&&(kirli=!0)}),kap.
addEventListener("change",e=>{e.target.closest("#hobi-dil-form")&&(kirli=!0)});const tazeleIste=()=>{kirli?bekleyen=!0:arkaTazele()},yakinda=()=>{clearTimeout(bekleyenZaman),bekleyenZaman=setTimeout(()=>{
kapandi||tazeleIste()},600)};async function yukle(){const[x,bak]=await Promise.all([Sunucu.cagir("hobbies"),gorunus===void 0?Sunucu.cagir("my_look").catch(()=>null):null]);v=x,gorunus===void 0&&(gorunus=
bak?.look??null);const t=v.session?.kind==="tailoring"?v.session:v.last?.kind==="tailoring"?v.last:null;t&&(sonRenk=[Number(t.color1??5),Number(t.color2??1)])}const R=()=>v?.rule?{...hobiKurali(),...v.
rule}:hobiKurali(),kalan=()=>Math.max(0,Number(v.left_today??0)),suren=()=>v.session??null;function seansEngeli(){return suren()?\u00E7("S\xFCren bir seans\u0131n var"):kalan()<=0?\u00E7("Bug\xFCnk\xFC sean\
slar\u0131n bitti"):null}const dilEngeli=seviye=>Number(seviye)>=Number(R().max??100)?\u00E7("En \xFCst seviyedesin"):null;function tarifEngeli(t){return Number(v.cooking?.level??0)>=Number(R().max??100)?
\u00E7("En \xFCst seviyedesin"):Number(v.stock?.erzak??0)<Number(t.erzak)||Number(v.stock?.tahil??0)<Number(t.tahil)?\u00E7("Malzeme yok"):null}function seansHtml(){const s=suren(),toplam=Number(R().session?.
daily??3),kullanilan=Number(v.used_today??0),noktalar=Array.from({length:toplam},(_,i)=>`<span class="hobi-hak${i<kullanilan?" dolu":""}"></span>`).join(""),m=v.mood,kova=Number(m?.today?.hobby??0),tavan=Number(
m?.caps?.hobby??0);let govde;if(s){const dil=s.kind==="language",terzi=s.kind==="tailoring",ad=dil?dilAdi(s.lang):terzi?giysiModelAdi(s.model):yemekAdi(s.recipe),kaz=hobiKazanc(s.from_level,s.bonus),alt=dil?
\u00E7("Seviye {a} \u2192 {b}{ek}",{a:sayi(s.from_level),b:sayi(Math.min(Number(R().max??100),Number(s.from_level)+kaz)),ek:Number(s.bonus)?" "+\u00E7("(dilin \xFClkesinde +{n})",{n:Number(s.bonus)}):
""}):terzi?\u00E7("{kumas} \xB7 {kalite} \xB7 terzilik {a} \u2192 {b}",{kumas:giysiKumasYazisi(s.color1,s.color2),kalite:GIYSI_KALITE_AD[s.quality]??"",a:sayi(s.from_level),b:sayi(Number(s.from_level)+
kaz)}):\u00E7("{n} porsiyon \xB7 {kalite} \xB7 a\u015F\xE7\u0131l\u0131k {a} \u2192 {b}",{n:sayi(s.portions??0),kalite:HOBI_KALITE[s.quality]??"",a:sayi(s.from_level),b:sayi(Number(s.from_level)+kaz)}),
sinif=dil?"deniz":terzi?"mor":"mercan";govde=`<div class="liste"><div class="liste-satir" id="hobi-suren" data-tur="${esc(s.kind)}" data-bitti="${s.due?1:0}"><span class="liste-ikon ${sinif}">${ikon(dil?
"languages":terzi?"scissors":"cooking-pot")}</span>
            <div><span class="tur">${esc(dil?\u00E7("Dil \xE7al\u0131\u015F\u0131yorsun"):terzi?\u00E7("Dikiyorsun"):\u00E7("Ocakta"))} \xB7 ${s.due?esc(\u00E7("s\xFCre doldu")):`<span data-bitis="${esc(
s.ends_at)}"></span>`}</span>
              <b>${esc(ad)}</b><div class="alt">${esc(alt)}</div>
              <div class="cubuk" style="margin-top:8px"><i data-ilerleme="${esc(s.starts_at)}|${esc(s.ends_at)}" style="display:block;height:100%;background:var(--${dil?"deniz":terzi?"mor":"altin"})">\
</i></div></div>
            ${s.due?`<button class="dugme kucuk-d altin" data-hobi-bitir>${ikon("check")}${\u00E7("Kazanc\u0131 al")}</button>`:`<button class="dugme ikincil kucuk-d" data-hobi-vazgec>${ikon("x")}${\u00E7(
"Vazge\xE7")}</button>`}</div></div>
          <p class="kucuk" style="margin-top:8px">${s.due?\u00E7("S\xFCre doldu; kazanc\u0131n birazdan kendili\u011Finden yaz\u0131l\u0131r. Beklemek istemezsen \u015Fimdi al."):\u00E7("Seans i\u015Fini, \
e\u011Fitimini ya da yolculu\u011Funu durdurmaz. Vazge\xE7ersen hakk\u0131n{malzeme} geri d\xF6ner, kazan\xE7 olmaz.",{malzeme:s.kind==="cooking"?" "+\u00E7("ve malzemen"):s.kind==="tailoring"?" "+\u00E7(
"ve kuma\u015F\u0131n"):""})}</p>`}else{const son=v.last&&Date.parse(v.last.closed_at)>Date.now()-216e5?v.last:null,sonKart=son?`<div class="liste"><div class="liste-satir" id="hobi-son" data-tur="${esc(
son.kind)}"><span class="liste-ikon yesil">${ikon(son.kind==="language"?"languages":son.kind==="tailoring"?"shirt":"soup")}</span>
            <div><span class="tur">${esc(\u00E7("Son seans"))} \xB7 ${esc(zamanOnce(son.closed_at))}</span><b>${esc(son.kind==="language"?dilAdi(son.lang):son.kind==="tailoring"?giysiModelAdi(son.model):
yemekAdi(son.recipe))}</b>
              <div class="alt">${esc(son.kind==="language"?\u00E7("+{n}: seviye {s}{b}",{n:sayi(son.gain??0),s:sayi(son.to_level??0),b:dilBasamagi(son.to_level)?" \xB7 "+dilBasamagi(son.to_level):""}):
son.kind==="tailoring"?\u00E7("Gard\u0131robuna kondu \xB7 {kumas} \xB7 terzilik {s}",{kumas:giysiKumasYazisi(son.color1,son.color2),s:sayi(son.to_level??0)}):\u00E7("{n} porsiyon kilere kondu \xB7 a\u015F\xE7\u0131l\
\u0131k {s}",{n:sayi(son.portions??0),s:sayi(son.to_level??0)}))}</div></div>
              ${son.kind==="tailoring"?`<button class="dugme sade kucuk-d" data-git="hayat/gorunum">${ikon("shirt")}${\u00E7("Gard\u0131robum")}</button>`:"<span></span>"}</div></div>`:"",durum=kalan()<=
0?\u00E7("Bug\xFCnk\xFC seanslar\u0131n\u0131 yapt\u0131n; yar\u0131n (UTC gece yar\u0131s\u0131) yeniden."):son?"":\u00E7("\u015Eu an seans yok. A\u015Fa\u011F\u0131dan bir dil se\xE7, bir tarif pi\u015Fir ya da bir giysi dik.");
govde=sonKart+(durum?`<p class="bos"${sonKart?' style="margin-top:8px"':""}>${durum}</p>`:"")}return`<section class="kart" id="hobi-seans"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Bug\xFC\
n")}</p>
          <h2 class="b2">${\u00E7("{n} / {m} seans",{n:sayi(kullanilan),m:sayi(toplam)})}</h2></div><span class="hobi-haklar" aria-hidden="true">${noktalar}</span></div>
        ${govde}
        ${tavan>0?`<p class="kucuk" style="margin-top:8px" id="hobi-keyif">${ikon("face-slightly-smiling")} ${esc(kova>=tavan?\u00E7("Hobiler keyfi bug\xFCn {a} / {b}: bug\xFCnl\xFCk doldu.",{a:kova,b:tavan}):
\u00E7("Hobiler keyfi bug\xFCn {a} / {b}: her seans keyfini {n} art\u0131r\u0131r.",{a:kova,b:tavan,n:Number(m?.gains?.language??0)}))}</p>`:""}
      </section>`}function dillerHtml(){const r=R(),diller=v.languages??[],ana=diller.find(l=>l.native),ogrenilen=diller.filter(l=>!l.native),bilinen=new Set(diller.map(l=>l.lang)),burada=v.here?.lang??
null,ek=Number(v.here?.bonus??r.language?.inCountryBonus??1),satir=l=>{const engel=dilEngeli(l.level),kapali=engel||seansEngeli(),son=l.next,kaz=Number(l.gain??hobiKazanc(l.level,l.lang===burada?ek:0));
return`<div class="liste-satir hobi-dil" data-hobi-dil="${esc(l.lang)}"><span class="liste-ikon deniz">${ikon("languages")}</span>
          <div><span class="tur">${esc(l.band??\u00E7("A1 alt\u0131"))}${l.lang===burada?" \xB7 "+esc(\u00E7("bulundu\u011Fun \xFClkenin dili")):""}</span><b>${esc(dilAdi(l.lang))}</b>
            <div class="cubuk deniz hobi-cubuk" style="margin-top:6px"><i style="width:${Math.min(100,Number(l.level))}%"></i></div>
            <div class="alt">${esc(\u00E7("seviye {n} / {m}",{n:sayi(l.level),m:sayi(r.max??100)}))}${son?" \xB7 "+esc(\u00E7("{b} i\xE7in {n} puan",{b:son.band,n:sayi(son.left)})):""}</div>
            ${engel?`<div class="alt saglik-engel">${esc(engel)}</div>`:""}</div>
          <button class="dugme kucuk-d" data-hobi-calis="${esc(l.lang)}" ${kapali?"disabled":""}>${ikon("book-open")}${\u00E7("\xC7al\u0131\u015F (+{n})",{n:kaz})}</button></div>`},tum=Object.entries(
hobiKurali().languages??{}).filter(([k])=>!bilinen.has(k)).sort(([a,x],[b,y])=>(a===burada?-1:b===burada?1:0)||(DIL.kod==="en"?x.en:x.tr).localeCompare(DIL.kod==="en"?y.en:y.tr,DIL.yerel)),yeniEngel=seansEngeli();
return`<section class="kart" id="hobi-diller"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Dil \xF6\u011Frenme")}</p>
          <h2 class="b2">${\u00E7("Diller")}</h2></div><span class="ik-kutu">${ikon("languages")}</span></div>
        ${ana?`<div class="bilgi-kutusu" id="hobi-ana-dil">${ikon("globe")}<span>${esc(\u00E7("Ana dilin {dil} (C2). Karakterinin a\xE7\u0131ld\u0131\u011F\u0131 \xFClkenin dilidir; de\u011Fi\u015Fmez.",
{dil:dilAdi(ana.lang)}))}</span></div>`:""}
        ${burada&&burada!==ana?.lang?`<p class="kucuk" style="margin-top:8px" id="hobi-burada">${ikon("map-pin")} ${esc(\u00E7("Bulundu\u011Fun yerin dili {dil}: burada \xE7al\u0131\u015F\u0131rsan seans {n} puan fazla kaza\
nd\u0131r\u0131r.",{dil:dilAdi(burada),n:ek}))}</p>`:""}
        ${ogrenilen.length?`<div class="liste" style="margin-top:10px">${ogrenilen.map(satir).join("")}</div>`:`<p class="bos" style="margin-top:10px">${\u00E7("Hen\xFCz yabanc\u0131 dil \xE7al\u0131\u015Fmad\u0131n. A\u015Fa\u011F\u0131dan \
bir dil se\xE7: her seans {n} puan (A1 i\xE7in 10 puan).",{n:hobiKazanc(0)})}</p>`}
        <form class="form" id="hobi-dil-form" novalidate style="margin-top:12px">
          <label class="alan"><span>${\u00E7("Yeni bir dil")}</span><select name="dil">${tum.map(([k,x])=>`<option value="${esc(k)}">${esc(DIL.kod==="en"?x.en:x.tr)}${k===burada?" \xB7 "+esc(\u00E7("b\
urada +{n}",{n:ek})):""}</option>`).join("")}</select></label>
          <div class="oneri-dugmeler"><button class="dugme altin" type="submit" ${yeniEngel?"disabled":""}>${ikon("book-open")}${\u00E7("\xC7al\u0131\u015Fmaya ba\u015Fla")}</button></div>
          ${yeniEngel?`<p class="kucuk saglik-engel">${esc(yeniEngel)}</p>`:""}
        </form>
        <p class="kucuk" style="margin-top:8px">${\u00E7("Basamaklar: A1 {a1}, A2 {a2}, B1 {b1}, B2 {b2}, C1 {c1}, C2 {c2}. Ana dilin ve B1 ve \xFCst\xFCndeki diller profilinde herkese g\xF6r\xFCn\xFCr; B1'e ula\u015Ft\u0131\u011F\
\u0131n her dil Dil Madalyas\u0131'na say\u0131l\u0131r.",{a1:r.language?.bands?.A1??10,a2:r.language?.bands?.A2??25,b1:r.language?.bands?.B1??40,b2:r.language?.bands?.B2??60,c1:r.language?.bands?.C1??
80,c2:r.language?.bands?.C2??100})}</p>
      </section>`}function mutfakHtml(){const r=R(),c=v.cooking??{},sev=Number(c.level??0),q=yemekKalitesi(sev,r),sonrakiKalite=(r.cooking?.quality??[]).find(x=>Number(x.min)>sev),tarifler=r.cooking?.
recipes??[],ortak=seansEngeli(),kapali=ortak||!v.home?.at_home,satir=t=>{const acik=sev>=Number(t.minLevel),engel=acik?tarifEngeli(t):null,malzeme=[Number(t.erzak)?\u00E7("{n} erzak",{n:sayi(t.erzak)}):
"",Number(t.tahil)?\u00E7("{n} tah\u0131l",{n:sayi(t.tahil)}):""].filter(Boolean).join(" + ");return`<div class="liste-satir hobi-tarif${acik?"":" kapali"}" data-hobi-tarif-satir="${esc(t.id)}"><span \
class="liste-ikon ${acik?"altin":""}">${ikon(acik?"soup":"lock")}</span>
          <div><span class="tur">${esc(acik?\u00E7("seviye {n}",{n:sayi(t.minLevel)}):\u00E7("seviye {n} gerekir",{n:sayi(t.minLevel)}))}</span><b>${esc(yemekAdi(t.id))}</b>
            <div class="alt">${esc(\u00E7("{malzeme} \u2192 {n} porsiyon",{malzeme,n:sayi(t.portions)}))}</div>
            ${engel?`<div class="alt saglik-engel">${esc(engel)}</div>`:""}</div>
          ${acik?`<button class="dugme kucuk-d" data-hobi-pisir="${esc(t.id)}" ${engel||kapali?"disabled":""}>${ikon("cooking-pot")}${\u00E7("Pi\u015Fir")}</button>`:"<span></span>"}</div>`},acikT=tarifler.
filter(t=>sev>=Number(t.minLevel)),kapaliT=tarifler.filter(t=>sev<Number(t.minLevel));return`<section class="kart" id="hobi-mutfak"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("A\u015F\xE7\u0131l\u0131k")}\
</p>
          <h2 class="b2">${\u00E7("Mutfak \xB7 seviye {n}",{n:sayi(sev)})}</h2></div><span class="ik-kutu">${ikon("chef-hat")}</span></div>
        <div class="cubuk altin hobi-cubuk"><i style="width:${Math.min(100,sev)}%"></i></div>
        <p class="kucuk" style="margin-top:6px">${esc(\u00E7("Yemeklerin {kalite}.",{kalite:HOBI_KALITE[q]??""})+(sonrakiKalite?" "+\u00E7("A\u015F\xE7\u0131l\u0131k {n} olunca {kalite}.",{n:sonrakiKalite.
min,kalite:HOBI_KALITE[sonrakiKalite.q]??""}):""))}</p>
        ${v.home?.at_home?"":`<div class="bilgi-kutusu" style="margin-top:10px" id="hobi-ev-uzak">${ikon("house")}<span>${esc(\u00E7("Yemek evinde pi\u015Fer: {sehir}. \u015Eu an evinin \u015Fehrinde de\u011Filsin.",
{sehir:v.home?.region_id?bolgeAdi(v.home.region_id):""}))}</span>
          <button class="dugme sade kucuk-d" data-git="sehir/yol">${ikon("route")}${\u00E7("Seyahat")}</button></div>`}
        <div class="bilgi-kutusu" style="margin-top:10px" id="hobi-malzeme">${ikon("wheat")}<span>${esc(\u00E7("\xC7antanda {e} erzak ve {t} tah\u0131l (1. kalite). Malzeme pi\u015Firmeye ba\u015Flarken ayr\u0131l\u0131r, yemek \
pi\u015Fince harcan\u0131r.",{e:sayi(v.stock?.erzak??0),t:sayi(v.stock?.tahil??0)}))}</span><button class="dugme sade kucuk-d" data-git="sehir/pazar">${ikon("store")}${\u00E7("Pazar")}</button></div>
        ${ortak?`<p class="kucuk saglik-engel" style="margin-top:10px" id="hobi-mutfak-engel">${esc(ortak)}</p>`:""}
        <div class="liste" style="margin-top:10px">${acikT.map(satir).join("")}</div>
        ${kapaliT.length?`<details class="hobi-kapali" id="hobi-kapali" style="margin-top:12px"${kapaliAcik?" open":""}><summary>${ikon("lock")}${esc(\u00E7("A\xE7\u0131lacak tarifler: {n} (s\u0131radaki {yemek}, \
a\u015F\xE7\u0131l\u0131k {s})",{n:sayi(kapaliT.length),yemek:yemekAdi(kapaliT[0].id),s:sayi(kapaliT[0].minLevel)}))}</summary><div class="liste">${kapaliT.map(satir).join("")}</div></details>`:""}
      </section>`}function kilerHtml(){const r=R(),k=v.pantry??[],kalanHediye=Number(v.gifts_left??0),gelen=v.gifts_in??[],keyif=keyifKurali(),satir=p=>`<div class="liste-satir hobi-kiler-satir" data-\
hobi-kiler="${esc(p.recipe)}|${Number(p.quality)}"><span class="liste-ikon" style="color:${HOBI_KALITE_RENK[p.quality]??""}">${ikon("soup")}</span>
          <div><span class="tur">${esc(HOBI_KALITE[p.quality]??"")}</span><b>${esc(yemekAdi(p.recipe))}</b><div class="alt">${esc(\u00E7("{n} porsiyon",{n:sayi(p.qty)}))}</div></div>
          <div class="mekan-satir-dugmeler"><button class="dugme kucuk-d" data-hobi-ye="${esc(p.recipe)}|${Number(p.quality)}">${ikon("croissant")}${\u00E7("Ye (+{n})",{n:Number(keyif.gains?.["meal"+p.
quality]??0)})}</button>
            <button class="dugme ikincil kucuk-d" data-hobi-hediye="${esc(p.recipe)}|${Number(p.quality)}" ${kalanHediye<=0?"disabled":""}>${ikon("gift")}${\u00E7("Hediye et")}</button></div></div>`;return`\
<section class="kart" id="hobi-kiler"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kiler")}</p>
          <h2 class="b2">${\u00E7("{n} porsiyon ev yeme\u011Fi",{n:sayi(k.reduce((t,p)=>t+Number(p.qty??0),0))})}</h2></div><span class="ik-kutu">${ikon("soup")}</span></div>
        ${k.length?`<div class="liste">${k.map(satir).join("")}</div>`:`<p class="bos">${\u00E7("Kilerin bo\u015F. Evinde yemek pi\u015Firince porsiyonlar buraya gelir.")}</p>`}
        <p class="kucuk" style="margin-top:8px">${esc(\u00E7("Ev yeme\u011Fi sat\u0131lmaz; yenir ya da arkada\u015F\u0131na hediye edilir. Bug\xFCn {n} hediye hakk\u0131n kald\u0131 (g\xFCnde {m}).",
{n:kalanHediye,m:Number(r.cooking?.giftsPerDay??5)}))}</p>
        ${gelen.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Gelen hediyeler")}</p><div class="liste">${gelen.map(g=>`<div class="liste-satir"><span class="liste-ikon yesil">${ikon("g\
ift")}</span>
            <div><span class="tur">${esc(zamanOnce(g.at))}</span><b>${esc(yemekAdi(g.recipe))} \xB7 ${esc(HOBI_KALITE[g.quality]??"")}</b>
              <div class="alt"><button class="baglanti" type="button" data-profil="${esc(g.from_id)}">${esc(g.from_name??"")}</button></div></div><span></span></div>`).join("")}</div>`:""}
      </section>`}function terziHtml(){const r=R(),T=r.tailoring??terzilikKurali(),t=v.tailoring??{},sev=Number(t.level??0),q=giysiKalitesi(sev),sonrakiKalite=(T.quality??[]).find(x=>Number(x.min)>sev),
kumas=Number(v.stock?.kumas??0),adet=Number(t.wardrobe??0),sinir=Number(t.wardrobe_max??T.wardrobeMax??30),dolu=adet>=sinir,enUst=sev>=Number(r.max??100),ortak=seansEngeli(),kapali=ortak||!v.home?.at_home||
dolu||enUst,satir=mo=>{const acik=sev>=Number(mo.minLevel),yok=kumas<Number(mo.kumas);return`<div class="liste-satir hobi-model${acik?"":" kapali"}" data-hobi-model-satir="${esc(mo.id)}">
          <span class="hobi-model-resim">${giysiSvg(mo.id,acik?5:11,1,acik?q:1)}</span>
          <div><span class="tur">${esc(acik?\u00E7("seviye {n}",{n:sayi(mo.minLevel)}):\u00E7("seviye {n} gerekir",{n:sayi(mo.minLevel)}))}</span><b>${esc(giysiModelAdi(mo.id))}</b>
            <div class="alt">${esc(\u00E7("{n} kuma\u015F",{n:sayi(mo.kumas)}))}</div>
            ${acik&&yok?`<div class="alt saglik-engel">${esc(\u00E7("Kuma\u015F yetmiyor"))}</div>`:""}</div>
          ${acik?`<button class="dugme kucuk-d" data-hobi-dik="${esc(mo.id)}" ${kapali||yok?"disabled":""}>${ikon("scissors")}${\u00E7("Dik")}</button>`:"<span></span>"}</div>`},modeller=T.models??[],
acikM=modeller.filter(m=>sev>=Number(m.minLevel)),kapaliM=modeller.filter(m=>sev<Number(m.minLevel)),engel=ortak??(dolu?\u00E7("Gard\u0131robun dolu; bir giysiyi at ya da sat."):enUst?\u00E7("Terzilik\
te en \xFCst seviyedesin"):null);return`<section class="kart" id="hobi-terzi"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Terzilik")}</p>
          <h2 class="b2">${\u00E7("Diki\u015F \xB7 seviye {n}",{n:sayi(sev)})}</h2></div><span class="ik-kutu">${ikon("scissors")}</span></div>
        <div class="cubuk hobi-cubuk"><i style="width:${Math.min(100,sev)}%;background:var(--mor)"></i></div>
        <p class="kucuk" style="margin-top:6px">${esc(\u00E7("Giysilerin {kalite}.",{kalite:GIYSI_KALITE_AD[q]??""})+(sonrakiKalite?" "+\u00E7("Terzilik {n} olunca {kalite}.",{n:sonrakiKalite.min,kalite:GIYSI_KALITE_AD[sonrakiKalite.
q]??""}):""))}</p>
        ${v.home?.at_home?"":`<div class="bilgi-kutusu" style="margin-top:10px" id="hobi-terzi-uzak">${ikon("house")}<span>${esc(\u00E7("Diki\u015F makinen evinde: {sehir}. \u015Eu an evinin \u015Fehrinde de\u011Filsin.",
{sehir:v.home?.region_id?bolgeAdi(v.home.region_id):""}))}</span>
          <button class="dugme sade kucuk-d" data-git="sehir/yol">${ikon("route")}${\u00E7("Seyahat")}</button></div>`}
        <div class="bilgi-kutusu" style="margin-top:10px" id="hobi-kumas">${ikon("spool")}<span>${esc(\u00E7("\xC7antanda {n} kuma\u015F (1. kalite). Kuma\u015F diki\u015Fe ba\u015Flarken ayr\u0131l\u0131r, giysi dikilince harcan\u0131r.",
{n:sayi(kumas)}))}</span>
          <button class="dugme sade kucuk-d" data-git="sehir/pazar" data-pazar-urun="kumas@1">${ikon("store")}${\u00E7("Pazar")}</button></div>
        <div class="satir hobi-gardirop" style="margin-top:10px" id="hobi-gardirop" data-adet="${adet}"><span class="kucuk">${ikon("shirt")} ${esc(\u00E7("Gard\u0131robunda {n} / {m} giysi.",{n:sayi(adet),
m:sayi(sinir)}))}</span>
          <span class="oneri-dugmeler"><button class="dugme sade kucuk-d" data-git="hayat/gorunum">${ikon("shirt")}${\u00E7("Gard\u0131robum")}</button>
            <button class="dugme sade kucuk-d" data-git="sehir/butik">${ikon("shopping-bag")}${\u00E7("Butik")}</button></span></div>
        ${engel?`<p class="kucuk saglik-engel" style="margin-top:10px" id="hobi-terzi-engel">${esc(engel)}</p>`:""}
        <div class="liste" style="margin-top:10px">${acikM.map(satir).join("")}</div>
        ${kapaliM.length?`<details class="hobi-kapali" id="hobi-terzi-kapali" style="margin-top:12px"${terziKapaliAcik?" open":""}><summary>${ikon("lock")}${esc(\u00E7("A\xE7\u0131lacak modeller: {n} (s\u0131radak\
i {model}, terzilik {s})",{n:sayi(kapaliM.length),model:giysiModelAdi(kapaliM[0].id),s:sayi(kapaliM[0].minLevel)}))}</summary><div class="liste">${kapaliM.map(satir).join("")}</div></details>`:""}
        <p class="kucuk" style="margin-top:8px">${esc(\u00E7("Giysi s\xFCst\xFCr: g\xFC\xE7, gelir ya da oy vermez. Dikti\u011Fini giyersin ya da butikte satars\u0131n; butikten al\u0131nan giysi yeniden sat\u0131lmaz."))}\
</p>
      </section>`}function dikPenceresi(id){const r=R(),T=r.tailoring??terzilikKurali(),sev=Number(v.tailoring?.level??0),q=giysiKalitesi(sev),acik=(T.models??[]).filter(m=>sev>=Number(m.minLevel));if(!acik.
length)return;let model=acik.some(m=>m.id===id)?id:acik[0].id,r1=Number(sonRenk[0]??5),r2=Number(sonRenk[1]??1);const renkler=(ad,alan)=>`<p class="ust-yazi" style="margin:12px 0 6px">${esc(ad)}</p><d\
iv class="renk-sec" role="group" aria-label="${esc(ad)}">${(T.colors??[]).map((c,i)=>`<button type="button" class="renk-kutu" data-dik-renk="${alan}" data-deger="${i}" style="--renk:${esc(c.hex)}" ari\
a-label="${esc(giysiRenkAdi(i))}"
          title="${esc(giysiRenkAdi(i))}" aria-pressed="false"></button>`).join("")}</div>`,p=pencereForm({ust:\u00E7("Terzilik"),baslik:\u00E7("Giysi dik"),onayAd:\u00E7("Dikmeye ba\u015Fla"),onayIkon:"\
scissors",govde:`<div class="dik-pencere"><div class="dik-onizleme" id="dik-onizleme"></div>
            <div class="dik-secim"><p class="ust-yazi" style="margin:0 0 6px">${\u00E7("Model")}</p><div class="secim-sec" role="group" aria-label="${\u00E7("Model")}">${acik.map(m=>`<button type="but\
ton" class="secim-cip" data-dik-model="${esc(m.id)}" aria-pressed="false">${esc(giysiModelAdi(m.id))}</button>`).join("")}</div>
            ${renkler(\u00E7("Ana kuma\u015F"),"1")}${renkler(\u00E7("\u0130kinci kuma\u015F"),"2")}</div></div>
          <p class="kucuk" id="dik-ozet" style="margin-top:10px"></p>`,is:async()=>{const x=await Sunucu.yap("tailor_start",{p_model:model,p_color1:r1,p_color2:r2});sonRenk=[r1,r2],tost(\u00E7("Diki\u015F \
ba\u015Flad\u0131: {model} ({kumas}), {dk} dakika.",{model:giysiModelAdi(model),kumas:giysiKumasYazisi(r1,r2),dk:sayi(R().session?.minutes??20)}),"scissors"),kirli=!1,yanit(x)}}),yaz=()=>{const mo=acik.
find(m=>m.id===model),on=$("#dik-onizleme",p.form);on&&(on.innerHTML=`${giysiSvg(model,r1,r2,q,{etiket:\u00E7("{model} \xF6nizlemesi",{model:giysiModelAdi(model)})})}
          <b>${esc(giysiModelAdi(model))}</b><span class="kucuk">${esc(giysiKumasYazisi(r1,r2))} \xB7 ${esc(GIYSI_KALITE_AD[q]??"")} ${giysiYildiz(q)}</span>`);for(const b of $$("[data-dik-model]",p.form))
b.setAttribute("aria-pressed",String(b.dataset.dikModel===model));for(const b of $$("[data-dik-renk]",p.form))b.setAttribute("aria-pressed",String(Number(b.dataset.deger)===(b.dataset.dikRenk==="1"?r1:
r2)));const oz=$("#dik-ozet",p.form);oz&&(oz.textContent=\u00E7("{n} kuma\u015F (\xE7antanda {m}) \xB7 {dk} dakika \xB7 seviye kazanc\u0131 +{k}. Kuma\u015F ba\u015Flarken \xE7antandan ayr\u0131l\u0131r; vazge\xE7ersen d\xF6ner.",
{n:sayi(mo?.kumas??0),m:sayi(v.stock?.kumas??0),dk:sayi(R().session?.minutes??20),k:hobiKazanc(sev)}))};p.form.addEventListener("click",e=>{const m=e.target.closest("[data-dik-model]"),c=e.target.closest(
"[data-dik-renk]");m&&(model=m.dataset.dikModel,yaz()),c&&(c.dataset.dikRenk==="1"?r1=Number(c.dataset.deger):r2=Number(c.dataset.deger),yaz())}),yaz()}function ciz(){durdur(),kirli=!1,bekleyen&&(bekleyen=
!1,setTimeout(()=>arkaTazele())),kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m \xB7 Hobiler")}</p><h1 class="b1">${\u00E7("Hobiler")}</h1>
          <p class="aciklama">${\u00E7("Bo\u015F zaman\u0131nda bir dil \xF6\u011Fren, evinde yemek pi\u015Fir ya da giysi dik. Seans {dk} dakika s\xFCrer, i\u015Fini ve e\u011Fitimini durdurmaz; g\xFCnde {n} seans. Hobiler sava\u015F g\xFCc\xFC verm\
ez; keyif ve madalya kazand\u0131r\u0131r, dikti\u011Fin giysiyi giyer ya da butikte satars\u0131n.",{dk:sayi(R().session?.minutes??20),n:sayi(R().session?.daily??3)})}</p></div>
          <div class="oneri-dugmeler"><button class="dugme ikincil kucuk-d" data-git="hayat/profil">${ikon("user-round")}${\u00E7("Profil")}</button></div></div>
        <div id="hobi-sahne-yer"></div>
        ${seansHtml()}
        <div class="izgara iki">
          <div class="yigin">${dillerHtml()}${terziHtml()}</div>
          <div class="yigin">${mutfakHtml()}${kilerHtml()}</div>
        </div></div>`;const yer=$("#hobi-sahne-yer",kap),b=ben();yer&&(yer.replaceWith(sahne.el),sahne.yaz({v,ben:{id:b.id,ad:b.name,gorunus,ulke:b.citizenship??null}})),bagla(),durdur=geriSay(kap,()=>setTimeout(
()=>{kapandi||tazeleIste()},1500))}async function isle(dugme,is){if(!dugme?.disabled){dugme&&(dugme.disabled=!0);try{await is()}catch(e){tost(hataMetni(e),"circle-alert")}finally{dugme?.isConnected&&(dugme.
disabled=!1)}}}const yanit=r=>{if(r&&typeof r=="object"&&"used_today"in r)v=r,kapandi||ciz();else return tazele()};async function basla(tur,hedef){const r=await Sunucu.yap("hobby_start",{p_kind:tur,p_target:hedef}),
s=r?.started??r?.session;tost(tur==="language"?\u00E7("{dil} \xE7al\u0131\u015Fmaya ba\u015Flad\u0131n: {dk} dakika.",{dil:dilAdi(hedef),dk:sayi(R().session?.minutes??20)}):\u00E7("{yemek} ocakta: {dk\
} dakika, {n} porsiyon.",{yemek:yemekAdi(hedef),dk:sayi(R().session?.minutes??20),n:sayi(s?.portions??0)}),tur==="language"?"languages":"cooking-pot"),kirli=!1,yanit(r)}function hediyePenceresi(tarif,kalite){
isle(null,async()=>{const adaylar=(await Sunucu.cagir("friends")).friends??[];if(!adaylar.length){tost(\u00E7("Ev yeme\u011Fi yaln\u0131z arkada\u015Flara hediye edilir; \xF6nce Meydan \u2192 Arkada\u015Flar'dan arkada\u015F ekle."),
"users-round");return}pencereForm({ust:\u00E7("Kiler \xB7 hediye"),baslik:\u00E7("{yemek} kime gitsin?",{yemek:yemekAdi(tarif)}),onayAd:\u00E7("G\xF6nder"),onayIkon:"gift",govde:`<p class="aciklama">${esc(
\u00E7("Bir porsiyon {yemek} ({kalite}) arkada\u015F\u0131n\u0131n kilerine gider; ikinizin yak\u0131nl\u0131\u011F\u0131 ve onun keyfi artar.",{yemek:yemekAdi(tarif),kalite:HOBI_KALITE[kalite]??""}))}\
</p>
            <div class="radyo-liste">${adaylar.map((f,i)=>`<label class="radyo"><input type="radio" name="kisi" value="${esc(f.character_id)}" ${i===0?"checked":""}>
              <span><b>${esc(f.name)}</b>${f.country_id?`<span class="kucuk">${esc(ulkeAdi(f.country_id))}</span>`:""}</span></label>`).join("")}</div>`,is:async d=>{const r=await Sunucu.yap("meal_gif\
t",{p_to:d.get("kisi"),p_recipe:tarif,p_quality:kalite});tost(\u00E7("{yemek} {ad} adl\u0131 arkada\u015F\u0131na g\xF6nderildi.",{yemek:yemekAdi(tarif),ad:r?.gift?.to_name??""}),"gift"),yanit(r)}})})}
function bagla(){for(const b of $$("[data-profil]",kap))b.onclick=()=>profilAc(b.dataset.profil,()=>tazele());for(const b of $$("[data-git]",kap))b.onclick=()=>{if(b.dataset.pazarUrun)try{sessionStorage.
setItem("civora.pazar",b.dataset.pazarUrun)}catch{}Kabuk.git(b.dataset.git)};for(const b of $$("[data-hobi-calis]",kap))b.onclick=()=>isle(b,()=>basla("language",b.dataset.hobiCalis));for(const b of $$(
"[data-hobi-pisir]",kap))b.onclick=()=>isle(b,()=>basla("cooking",b.dataset.hobiPisir));for(const b of $$("[data-hobi-dik]",kap))b.onclick=()=>{b.disabled||dikPenceresi(b.dataset.hobiDik)};for(const b of $$(
"[data-hobi-vazgec], [data-hobi-bitir]",kap))b.onclick=()=>isle(b,async()=>{const r=await Sunucu.yap("hobby_cancel",{}),s=r?.closed;s?.status==="done"?tost(s.kind==="language"?\u00E7("{dil}: +{n}, sev\
iye {s}.",{dil:dilAdi(s.lang),n:sayi(s.gain??0),s:sayi(s.to_level??0)}):s.kind==="tailoring"?\u00E7("{model} dikildi: gard\u0131robuna kondu ({kalite}).",{model:giysiModelAdi(s.model),kalite:GIYSI_KALITE_AD[s.
quality]??""}):\u00E7("{yemek} pi\u015Fti: {n} porsiyon kilere kondu.",{yemek:yemekAdi(s.recipe),n:sayi(s.portions??0)}),s.kind==="tailoring"?"shirt":"check"):tost(s?.kind==="cooking"?\u00E7("Vazge\xE7ti\
n; hakk\u0131n ve malzemen geri d\xF6nd\xFC."):s?.kind==="tailoring"?\u00E7("Vazge\xE7tin; hakk\u0131n ve kuma\u015F\u0131n geri d\xF6nd\xFC."):\u00E7("Vazge\xE7tin; hakk\u0131n geri d\xF6nd\xFC."),"u\
ndo-2"),yanit(r)});for(const b of $$("[data-hobi-ye]",kap))b.onclick=()=>isle(b,async()=>{const[tarif,kalite]=b.dataset.hobiYe.split("|"),r=await Sunucu.yap("meal_eat",{p_recipe:tarif,p_quality:Number(
kalite)});tost(\u00E7("Afiyet olsun: {yemek}.",{yemek:yemekAdi(tarif)})+keyifEki(r,r?.mood_source),"croissant"),yanit(r)});for(const b of $$("[data-hobi-hediye]",kap))b.onclick=()=>{const[tarif,kalite]=b.
dataset.hobiHediye.split("|");hediyePenceresi(tarif,Number(kalite))};const f=$("#hobi-dil-form",kap);f?.addEventListener("submit",e=>{e.preventDefault();const dil=String(new FormData(f).get("dil")??"");
dil&&isle($("button[type=submit]",f),()=>basla("language",dil))})}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()}),arkaTazele=tazeleyici(async()=>{if(await yukle(),!kapandi){if(kirli){
bekleyen=!0;return}ciz()}});await Promise.all([Durum.kurallar().catch(()=>null),Durum.ozet().catch(()=>null)]),await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^(hobby\.|meal\.|travel\.arrived|mood\.)/.
test(olay)&&yakinda()}),saat=setInterval(()=>{!document.hidden&&!document.querySelector(".perde")&&tazeleIste()},3e4);return()=>{kapandi=!0,durdur(),b1(),clearInterval(saat),clearTimeout(bekleyenZaman),
sahne.kapat()}}}),Parcalar.tamam("ek_98zp_hobi");
