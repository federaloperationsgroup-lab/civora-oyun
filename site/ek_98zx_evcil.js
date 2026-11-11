// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98zx_evcil.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/evcil",{async ac(kap){let v=null,yuklendi=0,kapandi=!1,mesgul=!1,gorunus,tur="kedi",cins="tekir";const sahne=EvcilSahnesi.ac();sahne.dinle("sec",ad=>{const ilk=(v?.pets??[]).find(p=>p.
state==="ac"||p.state==="acikti")??(v?.pets??[])[0],esyadaki=ad==="kafes"||ad==="akvaryum"?(v?.pets??[]).find(p=>p.species===(ad==="kafes"?"kus":"balik")):null,sec=ad.startsWith("hayvan:")?`#evcil-${ad.
slice(7)}`:esyadaki?`#evcil-${esyadaki.id}`:ad==="mama"&&ilk?`#evcil-${ilk.id}`:ad==="ben"?"#evcil-dost":(v?.pets??[]).length?`#evcil-${v.pets[0].id}`:"#evcil-barinak",el=$(sec,kap);el&&(el.scrollIntoView(
{behavior:hareketAzalt?"auto":"smooth",block:"center"}),el.classList.remove("vurgu-yan"),el.offsetWidth,el.classList.add("vurgu-yan"))});const ben=()=>Durum.v.ozet?.character??{},R=()=>v?.rules?v.rules:
evcilKurali(),hayvanlar=()=>v?.pets??[],gecen=()=>Math.floor((Date.now()-yuklendi)/1e3),bekle=sn=>Math.max(0,Number(sn??0)-gecen()),dakika=sn=>Math.max(1,Math.ceil(sn/60)),krediSerbest=()=>{const b=(Durum.
v.ozet?.balances??[]).find(x=>x.asset==="CR");return Number(b?.spendable??b?.amount??0)};async function yukle(){const[x,bak]=await Promise.all([Sunucu.cagir("pets"),gorunus===void 0?Sunucu.cagir("my_l\
ook").catch(()=>null):null]);v=x,yuklendi=Date.now(),gorunus===void 0&&(gorunus=bak?.look??null)}function kartHtml(p){const r=R(),tok=Number(p.food??0),sev=Number(p.love??0),tokMu=tok>=Number(r.food?.
full??80),pw=bekle(p.pet_wait),oy=bekle(p.play_wait),mama=Number(v.food_stock??0),numarasiz=!(evcilTur(p.species)?.tricks??r.tricks??[]).length,sonraki=p.next_trick?\u00E7("S\u0131radaki numara: {numara} (\
{n} bak\u0131m g\xFCn\xFC sonra)",{numara:EVCIL_NUMARA_AD[p.next_trick.id]??p.next_trick.id,n:sayi(p.next_trick.left)}):numarasiz?\u00E7("Bal\u0131k numara bilmez; onu seyretmek ikinizi de dinlendirir."):
\u00E7("B\xFCt\xFCn numaralar\u0131 biliyor."),bakim=p.care??evcilBakimlar(p.species),sevAd=p.species==="balik"?\u00E7("Seyret"):\u00E7("Sev"),sevIk=p.species==="balik"?"eye":"hand-heart",yuruyen=evcilYuruyen(
p.species),gelir=v.walk_pet===p.id,yuruNot=gelir?p.walk==="PET_WALK_HUNGRY"?\u00E7("Meydana gelecek; \u015Fimdi a\xE7: toklu\u011Fu en az %{n} olunca gelir.",{n:sayi(r.walk?.minFood??50)}):p.walk==="P\
ET_WALK_SAD"?\u00E7("Meydana gelecek; \u015Fimdi keyifsiz: sevgisi en az %{n} olunca gelir.",{n:sayi(r.walk?.minLove??70)}):\u00E7("Meydana girince arkandan y\xFCr\xFCr; \xF6tekiler g\xF6r\xFCr ve sevebilir."):
"",ister=evcilIster(p.species),esyaYok=ister&&v.items&&v.items[ister]===!1,tokRenk=p.state==="ac"?"mercan":tok<Number(r.hungryBelow??20)?"altin":"deniz";return`<section class="kart evcil-kart" id="evc\
il-${esc(p.id)}" data-evcil="${esc(p.id)}" data-hal="${esc(p.state)}" data-tur="${esc(p.species)}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(evcilCinsAdi(p.breed))} \xB7 ${esc(\u00E7("{n} bak\u0131m g\xFCn\xFC",{n:sayi(p.bond_days??0)}))}</p>
          <h2 class="b2">${esc(p.name)}</h2></div>
          <span class="evcil-resim">${hayvanSvg(p,evcilBosDurus(p.state),{etiket:evcilTanim(p)})}</span></div>
        <p><span class="cip ${EVCIL_HAL_RENK[p.state]??""}" data-evcil-hal>${ikon(evcilIkon(p.species))}${esc(EVCIL_HAL_AD[p.state]??p.state)}</span>
          ${p.name_reset?`<span class="cip mercan">${ikon("circle-alert")}${esc(\u00E7("Ad\u0131 kald\u0131r\u0131ld\u0131; yeni ad koy"))}</span>`:""}</p>
        <div class="evcil-cubuklar">
          <div><small>${\u00E7("Tokluk")}</small><div class="cubuk ${tokRenk}"><i style="width:${Math.min(100,tok)}%"></i></div><b data-evcil-tok>${esc(\u00E7("%{n}",{n:sayi(tok)}))}</b></div>
          <div><small>${\u00E7("Sevgi")}</small><div class="cubuk ${sev<Number(r.sulkBelow??20)?"mercan":"yesil"}"><i style="width:${Math.min(100,sev)}%"></i></div><b data-evcil-sevgi>${esc(\u00E7("%{\
n}",{n:sayi(sev)}))}</b></div>
        </div>
        <p class="kucuk evcil-sonraki">${ikon("sparkles")} ${esc(sonraki)}</p>
        <div class="evcil-dugmeler">
          <button class="dugme altin kucuk-d" data-evcil-besle="${esc(p.id)}" ${tokMu||mesgul||mama<=0?"disabled":""}>${ikon("bone")}${tokMu?\u00E7("Tok"):\u00E7("Besle")}</button>
          ${bakim.includes("pet")?`<button class="dugme kucuk-d" data-evcil-sev="${esc(p.id)}" ${pw>0||mesgul?"disabled":""}>${ikon(sevIk)}${pw>0?esc(\u00E7("{ad} ({n} dk)",{ad:sevAd,n:sayi(dakika(pw))})):
esc(sevAd)}</button>`:""}
          ${bakim.includes("play")?`<button class="dugme kucuk-d" data-evcil-oyna="${esc(p.id)}" ${oy>0||mesgul?"disabled":""}>${ikon("party-popper")}${oy>0?esc(\u00E7("Oyna ({n} dk)",{n:sayi(dakika(oy))})):
\u00E7("Oyna")}</button>`:""}
          ${yuruyen?`<button class="dugme sade kucuk-d" data-evcil-yuru="${esc(p.id)}" aria-pressed="${gelir}" ${mesgul?"disabled":""}>${ikon("footprints")}${gelir?\u00E7("Meydana gelmesin"):\u00E7("M\
eydana gelsin")}</button>`:""}
        </div>
        ${yuruNot?`<p class="kucuk evcil-yuru-not" data-evcil-yuru-not="${esc(p.walk??"")}">${ikon("footprints")} ${esc(yuruNot)}</p>`:""}
        ${Array.isArray(p.friends)?dostlarHtml(p):""}
        ${esyaYok?`<div class="bilgi-kutusu uyari-kutusu" style="margin-top:10px" data-evcil-esya-yok="${esc(ister)}">${ikon("circle-alert")}<span>${esc(ister==="kus_kafesi"?\u00E7("{ad} i\xE7in evinde k\
u\u015F kafesi yok. Evim \u2192 D\xFCzenle \u2192 E\u015Fya ekle'den yeniden kur.",{ad:p.name}):\u00E7("{ad} i\xE7in evinde akvaryum yok. Evim \u2192 D\xFCzenle \u2192 E\u015Fya ekle'den yeniden kur.",
{ad:p.name}))}
          <button class="baglanti" type="button" data-git="sehir/ev">${\u00E7("Evim")}</button></span></div>`:""}
        ${(p.tricks??[]).length?`<div class="secim-sec evcil-numaralar" role="group" aria-label="${\u00E7("Numaralar")}">${p.tricks.map(t=>`<button type="button" class="secim-cip" data-evcil-numara="${esc(
p.id)}|${esc(t)}">${ikon("sparkles")}${esc(EVCIL_NUMARA_AD[t]??t)}</button>`).join("")}</div>`:""}
        ${!tokMu&&mama<=0?`<div class="bilgi-kutusu uyari-kutusu" style="margin-top:10px">${ikon("circle-alert")}<span>${esc(\u00E7("\xC7antanda mama yok: 1. kalite erzak gerekir. Pazardan ya da devlet d\
eposundan alabilirsin."))}
          <button class="baglanti" type="button" data-git="sehir/pazar">${\u00E7("Pazar")}</button></span></div>`:""}
        <div class="oneri-dugmeler" style="margin-top:10px">
          <button class="dugme sade kucuk-d" data-evcil-ad="${esc(p.id)}" ${bekle(p.rename_wait)>0||mesgul?"disabled":""}>${ikon("pencil")}${\u00E7("Ad\u0131n\u0131 de\u011Fi\u015Ftir")}</button>
          <button class="dugme sade kucuk-d" data-evcil-birak="${esc(p.id)}" ${mesgul?"disabled":""}>${ikon("house")}${\u00E7("Bar\u0131na\u011Fa geri ver")}</button>
        </div>
      </section>`}function dostlarHtml(p){const l=p.friends??[];if(!l.length)return`<div class="evcil-dostlar" data-evcil-dostlar="${esc(p.id)}" data-sayi="0"><p class="kucuk">${ikon("paw-print")} ${esc(
\u00E7('{ad} hen\xFCz meydanda ba\u015Fka bir hayvanla oynamad\u0131. Yan\u0131nda y\xFCr\xFCrken ba\u015Fkas\u0131n\u0131n kedisine ya da k\xF6pe\u011Fine dokun: "Oynas\u0131nlar".',{ad:p.name}))}</p\
></div>`;const kucukHarf=t=>String(t??"").toLocaleLowerCase(DIL.yerel);return`<div class="evcil-dostlar" data-evcil-dostlar="${esc(p.id)}" data-sayi="${l.length}">
        <p class="ust-yazi">${esc(\u00E7("Arkada\u015Flar\u0131 ({n})",{n:l.length}))}</p>
        <ul class="evcil-dost-liste">${l.map(f=>`<li data-evcil-dost="${esc(f.pet_id)}" data-basamak="${esc(f.tier??"")}" data-gun="${Number(f.days??0)}">
          <span class="evcil-dost-resim">${hayvanSvg(f,f.today?"sevin":"otur",{etiket:f.name??evcilCinsAdi(f.breed)})}</span>
          <span class="evcil-dost-yazi"><b>${esc(f.name?evcilTanim(f):evcilCinsAdi(f.breed))}</b>
            <small>${esc([f.owner?\u00E7("sahibi {ad}",{ad:f.owner}):\u00E7("sahibi ad\u0131n\u0131 gizliyor"),\u00E7("{n} g\xFCn birlikte",{n:Number(f.days??0)}),f.next?\u00E7("{n} g\xFCn sonra {basamak\
}",{n:Number(f.next.left??0),basamak:kucukHarf(EVCIL_DOST_AD[f.next.tier])}):null,f.today?\u00E7("bug\xFCn oynad\u0131lar"):null].filter(Boolean).join(" \xB7 "))}</small></span>
          <span class="cip ${f.tier==="yakin"?"yesil":f.tier==="arkadas"?"deniz":""}">${ikon("paw-print")}${esc(EVCIL_DOST_AD[f.tier]??"")}</span></li>`).join("")}</ul></div>`}function barinakHtml(){const r=R(),
max=Number(r.max??2),n=hayvanlar().length;if(n>=max)return"";const ucret=Number(r.adoption?.feeCr??2e3),bugun=Number(v.adopted_today??0)>=Number(r.adoption?.perDay??1),yetmez=krediSerbest()<ucret,turler=evcilTurleri().
map(s=>s.id);turler.includes(tur)||(tur=turler[0]??"kedi");const cinsler=evcilTurleri().find(s=>s.id===tur)?.breeds??[];cinsler.some(b=>b.id===cins)||(cins=cinsler[0]?.id??cins);const ister=evcilIster(
tur),esyaVar=!ister||!!v.items?.[ister],odada=v.home?.kind==="room",esyaEngel=esyaVar?null:ister==="kus_kafesi"?\u00E7("Ku\u015F i\xE7in evinde ku\u015F kafesi olmal\u0131. Evim \u2192 D\xFCzenle \u2192 E\u015Fya ekle'den kur (mobilyayl\
a)."):odada?\u00E7("Bal\u0131k i\xE7in akvaryum gerekir; akvaryum pansiyon odas\u0131na konmaz, yaln\u0131z evde kurulur. \u015Eehrinden bir ev al\u0131nca kurabilirsin."):\u00E7("Bal\u0131k i\xE7in evinde ak\
varyum olmal\u0131. Evim \u2192 D\xFCzenle \u2192 E\u015Fya ekle'den kur (mobilyayla)."),engel=bugun?\u00E7("Bug\xFCn bir hayvan sahiplendin; yar\u0131n yeniden gel."):yetmez?\u00E7("Bar\u0131na\u011Fa ba\u011F\u0131\u015F i\xE7\
in kredin yetmiyor."):esyaEngel;return`<section class="kart" id="evcil-barinak">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Bar\u0131nak")}</p><h2 class="b2">${n?\u00E7("Bir dost daha sahiplen"):\u00E7("Bir dost sahiplen")}</h2></div>
          <span class="ik-kutu">${ikon("house")}</span></div>
        <p class="kucuk">${esc(\u00E7("Bar\u0131na\u011Fa {kr} kredi ba\u011F\u0131\u015F yap\u0131l\u0131r (yak\u0131l\u0131r). G\xFCnde bir hayvan, en \xE7ok {n} hayvan. Hayvan evinde ya\u015Far; misafirlerin de g\xF6r\xFCr.",
{kr:kr(ucret),n:sayi(max)}))}</p>
        <div class="secim-sec" role="group" aria-label="${\u00E7("T\xFCr")}" id="evcil-tur" style="margin-top:10px">
          ${turler.map(t=>`<button type="button" class="secim-cip" data-evcil-tur="${t}" aria-pressed="${tur===t}">${ikon(evcilIkon(t))}${esc(evcilTurAdi(t))}</button>`).join("")}</div>
        ${tur==="kus"?`<p class="kucuk" style="margin-top:8px" id="evcil-tur-not">${ikon("bird")} ${esc(\u00E7("Ku\u015F kafesinde ya\u015Far; mama g\xFCnde bir. \xDC\xE7 bak\u0131m g\xFCn\xFCnde \u015Fark\u0131 s\xF6ylemeyi \xF6\u011Frenir."))}\
</p>`:tur==="balik"?`<p class="kucuk" style="margin-top:8px" id="evcil-tur-not">${ikon("fish")} ${esc(\u00E7("Bal\u0131k akvaryumda ya\u015Far; yem iki g\xFCnde bir. Numara bilmez; onu seyredersin."))}\
</p>`:`<p class="kucuk" style="margin-top:8px" id="evcil-tur-not">${ikon("footprints")} ${esc(\u00E7("Tok ve mutluyken meydanda arkandan y\xFCr\xFCr."))}</p>`}
        <div class="evcil-cinsler" role="radiogroup" aria-label="${\u00E7("Cins")}" style="margin-top:10px">
          ${cinsler.map(b=>`<button type="button" class="evcil-cins${b.id===cins?" secili":""}" role="radio" aria-checked="${b.id===cins}" data-evcil-cins="${esc(b.id)}">
            ${hayvanSvg({species:tur,breed:b.id},"otur")}<b>${esc(evcilCinsAdi(b.id))}</b></button>`).join("")}</div>
        ${engel?`<div class="bilgi-kutusu uyari-kutusu" style="margin-top:10px" id="evcil-barinak-engel" data-engel="${esc(engel===esyaEngel?ister:"")}">${ikon("circle-alert")}<span>${esc(engel)}${engel===
esyaEngel&&!odada?` <button class="baglanti" type="button" data-git="sehir/ev">${\u00E7("Evim")}</button>`:""}</span></div>`:""}
        <div class="oneri-dugmeler" style="margin-top:12px"><button class="dugme altin" id="evcil-sahiplen" ${engel||mesgul?"disabled":""}>${ikon("hand-heart")}${esc(\u00E7("Sahiplen: {cins}",{cins:evcilCinsAdi(
cins)}))}</button></div>
      </section>`}function dostHtml(){const r=R(),k=v.keeper??{},gun=Number(k.care_days??0),esik=[30,100,365],basamaklar=(Durum.v.kurallar?.data?.medal?.medals??[]).find(m2=>m2.id==="can_dostu")?.tiers??
esik,sira=basamaklar.find(e=>gun<e),once=[...basamaklar].reverse().find(e=>gun>=e)??0,oran=sira?Math.min(100,(gun-once)/Math.max(1,sira-once)*100):100,m=v.mood;return`<section class="kart" id="evcil-d\
ost">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Can Dostu")}</p><h2 class="b2">${esc(\u00E7("{n} bak\u0131m g\xFCn\xFC",{n:sayi(gun)}))}</h2></div>
          <span class="ik-kutu">${ikon("heart")}</span></div>
        <p class="kucuk">${esc(sira?\u00E7("Can Dostu madalyas\u0131n\u0131n s\u0131radaki basama\u011F\u0131na {n} g\xFCn.",{n:sayi(sira-gun)}):\u00E7("Can Dostu madalyas\u0131n\u0131n b\xFCt\xFCn basamaklar\u0131 senin."))}\

          ${k.counted_today?esc(\u00E7("Bug\xFCn say\u0131ld\u0131.")):esc(\u00E7("Bug\xFCn tok hayvan\u0131n\u0131 sev ya da onunla oyna; g\xFCn say\u0131l\u0131r."))}</p>
        <div class="cubuk altin" style="margin-top:8px"><i style="width:${oran.toFixed(1)}%"></i></div>
        ${m?`<p class="kucuk" style="margin-top:10px" id="evcil-keyif">${ikon("face-grinning")} ${esc(\u00E7("Evcil hayvan keyfi bug\xFCn {a} / {b}: tok hayvan\u0131 sevmek +{s}, oynamak +{o}.",{a:sayi(
m.used??0),b:sayi(m.cap??0),s:sayi(m.pet??0),o:sayi(m.play??0)}))}</p>`:""}
        ${v.plays?`<p class="kucuk" style="margin-top:6px" id="evcil-oyun" data-bugun="${Number(v.plays.today??0)}" data-alinan="${Number(v.plays.received_today??0)}" data-dost="${Number(k.friends_made??
0)}">${ikon("paw-print")} ${esc(\u00E7("Bug\xFCn meydanda {a} / {b} oyun ba\u015Flatt\u0131n.",{a:sayi(v.plays.today??0),b:sayi(v.plays.per_day??5)}))}${Number(v.plays.received_today??0)?" "+esc(\u00E7(
"Hayvanlar\u0131nla bug\xFCn {n} kez oynad\u0131lar.",{n:Number(v.plays.received_today)})):""} ${esc(\u00E7("Patili Dostluk Madalyas\u0131: {n} arkada\u015F.",{n:Number(k.friends_made??0)}))}</p>`:""}\

        ${v.greets?`<p class="kucuk" style="margin-top:6px" id="evcil-sevme" data-bugun="${Number(v.greets.today??0)}" data-alinan="${Number(v.greets.received_today??0)}">${ikon("hand-heart")} ${esc(\u00E7(
"Bug\xFCn meydanda ba\u015Fkalar\u0131n\u0131n hayvanlar\u0131ndan {a} / {b} sevdin.",{a:sayi(v.greets.today??0),b:sayi(v.greets.per_day??5)}))}${Number(v.greets.received_today??0)?" "+esc(\u00E7("Hay\
vanlar\u0131n\u0131 bug\xFCn {n} kez sevdiler.",{n:sayi(v.greets.received_today)})):""}</p>`:""}
        <ul class="arac-kural" style="margin-top:10px">
          <li>${esc(\u00E7("Mama 1. kalite erzakt\u0131r; kedi ve k\xF6pekte tokluk iki g\xFCnde, ku\u015Fta bir g\xFCnde, bal\u0131kta iki g\xFCnde biter. Tok hayvan beslenmez."))}</li>
          <li>${esc(\u00E7("Sevmek saatte bir, oynamak d\xF6rt saatte bir. Sevgi \xFC\xE7 g\xFCnde biter; ilgisiz kalan hayvan k\xFCser."))}</li>
          <li>${esc(\u00E7("Bak\u0131m g\xFCn\xFC: tok hayvan\u0131nla ilgilendi\u011Fin g\xFCn. Bak\u0131m g\xFCnleri numaralar\u0131 a\xE7ar: otur 3, pati 7, yuvarlan 14, dans 30; ku\u015Fun \u015Fark\u0131s\u0131 3."))}\
</li>
          <li>${esc(\u00E7("Ku\u015F kafeste, bal\u0131k akvaryumda ya\u015Far; ikisi de evde kal\u0131r. Tok ve mutlu kedi ya da k\xF6pek meydanda arkandan y\xFCr\xFCr."))}</li>
          <li>${esc(\u00E7("Meydanda ba\u015Fkas\u0131n\u0131n hayvan\u0131n\u0131 g\xFCnde 5 kez (ayn\u0131 hayvan\u0131 bir kez), ev partisinde bir kez sevebilirsin; sahibine haber gider."))}</li>
          ${v.plays?`<li>${esc(\u00E7("Meydanda yan\u0131nda y\xFCr\xFCyen kedin ya da k\xF6pe\u011Fin ba\u015Fkas\u0131n\u0131n kedisi ya da k\xF6pe\u011Fiyle oynar: ayn\u0131 iki hayvan g\xFCnde bir kez, sen g\xFCnde 5 oyun. \u0130kisinin sevgisi artar, ik\
i sahibe keyif. 1 g\xFCn tan\u0131d\u0131k, 3 g\xFCn arkada\u015F, 7 g\xFCn yak\u0131n arkada\u015F."))}</li>`:""}
          <li>${esc(\u00E7("Hayvan \xF6lmez, kaybolmaz, sat\u0131lmaz; a\xE7 ya da k\xFCs kal\u0131r. Sava\u015Fa, oylara ve gelire etkisi yoktur."))}</li>
        </ul>
        ${hayvanlar().length?`<p class="kucuk">${ikon("map-pin")} ${esc(\u00E7("Evin: {sehir}",{sehir:bolgeAdi(v.home?.region_id)||"\u2014"}))} \xB7 ${esc(\u00E7("\xC7antanda {n} mama",{n:sayi(v.food_stock??
0)}))}</p>`:""}
      </section>`}function ciz(){if(v?.active===!1){kap.innerHTML=`<div class="sayfa sayfa-dar"><div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m")}</p><h1 class="b1">${\u00E7("Ev\
cil hayvan")}</h1></div></div>
          <p class="bos">${\u00E7("Bar\u0131nak hen\xFCz a\xE7\u0131k de\u011Fil.")}</p></div>`;return}kap.innerHTML=`<div class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m")}</p><h1 class="b1">${\u00E7("Evcil hayvan")}</h1>
          <p class="aciklama">${\u00E7("Bar\u0131naktan bir kedi, k\xF6pek, ku\u015F ya da bal\u0131k sahiplen: evinde ya\u015Far, beslersin, seversin, oynars\u0131n\u0131z. Bak\u0131m g\xFCnleri yeni numaralar a\xE7ar; kedi ve k\xF6pek meydanda s\
eninle y\xFCr\xFCr.")}</p></div></div>
        <div id="evcil-kose-yer"></div>
        ${hayvanlar().length?`<div class="izgara iki" style="margin-top:20px">${hayvanlar().map(kartHtml).join("")}</div>`:""}
        <div class="izgara iki" style="margin-top:20px">${barinakHtml()}${dostHtml()}</div>
      </div>`,$("#evcil-kose-yer",kap)?.replaceWith(sahne.el),sahne.yaz({v,ben:{id:ben().id,ad:ben().name,gorunus,ulke:ben().citizenship}}),bagla()}async function isle(fn,basari){if(!mesgul){mesgul=!0;
try{const y=await fn();if(kapandi)return;y?.rules&&(v=y,yuklendi=Date.now()),basari?.(y),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert"),await yukle().catch(()=>{})}finally{mesgul=
!1,kapandi||ciz()}}}function sonuc(y,basari){kapandi||(y?.rules&&(v=y,yuklendi=Date.now()),basari?.(y),Durum.ozet().catch(()=>{}),ciz())}const adi=id=>hayvanlar().find(p=>p.id===id)??{};function adPenceresi({
baslik,ust,onay,ilk="",is}){pencereForm({ust,baslik,onayAd:onay,onayIkon:"pencil",govde:`<label class="alan"><span>${\u00E7("Ad\u0131")}</span><input name="ad" maxlength="16" minlength="2" required va\
lue="${esc(ilk)}" autocomplete="off"></label>
          <p class="kucuk">${\u00E7("2\u201316 karakter. Ba\u015Fkalar\u0131 da g\xF6r\xFCr; topluluk kurallar\u0131na uymayan ad raporlanabilir.")}</p>`,is:async f=>{const ad=String(f.get("ad")??"").
trim();if(ad.length<2||ad.length>16)throw new Error(\u00E7("Ad 2\u201316 karakter olmal\u0131."));await is(ad)}})}function bagla(){for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.
git);for(const b of $$("[data-evcil-besle]",kap))b.onclick=()=>{const id=b.dataset.evcilBesle;isle(()=>Sunucu.yap("pet_feed",{p_pet:id}),()=>{tost(\u00E7("{ad} karn\u0131n\u0131 doyurdu.",{ad:adi(id).
name??""}),"bone"),sahne.oyna("ye",id)})};for(const b of $$("[data-evcil-sev]",kap))b.onclick=()=>{const id=b.dataset.evcilSev,p=adi(id);isle(()=>Sunucu.yap("pet_pet",{p_pet:id}),y=>{tost(p.species===
"kopek"?\u00E7("{ad} kuyruk sall\u0131yor.",{ad:p.name??""}):p.species==="kus"?\u00E7("{ad} c\u0131v\u0131ld\u0131yor.",{ad:p.name??""}):p.species==="balik"?\u00E7("{ad} cam\u0131n \xF6n\xFCne y\xFCzd\xFC.",
{ad:p.name??""}):\u00E7("{ad} m\u0131rl\u0131yor.",{ad:p.name??""}),p.species==="balik"?"eye":"hand-heart"),y?.new_trick&&tost(\u00E7("{ad} yeni bir numara \xF6\u011Frendi: {numara}.",{ad:p.name??"",numara:EVCIL_NUMARA_AD[y.
new_trick]??y.new_trick}),"sparkles"),sahne.oyna("sev",id)})};for(const b of $$("[data-evcil-oyna]",kap))b.onclick=()=>{const id=b.dataset.evcilOyna,p=adi(id);isle(()=>Sunucu.yap("pet_play",{p_pet:id}),
y=>{tost(p.species==="kus"?\u00E7("{ad} kanat \xE7\u0131rp\u0131yor!",{ad:p.name??""}):\u00E7("{ad} topun pe\u015Finde!",{ad:p.name??""}),"party-popper"),y?.new_trick&&tost(\u00E7("{ad} yeni bir numar\
a \xF6\u011Frendi: {numara}.",{ad:p.name??"",numara:EVCIL_NUMARA_AD[y.new_trick]??y.new_trick}),"sparkles"),sahne.oyna("oyna",id)})};for(const b of $$("[data-evcil-numara]",kap))b.onclick=()=>{const[id,
t]=b.dataset.evcilNumara.split("|");sahne.oyna("numara",id,t),t==="sarki"&&Ezgi.cikvil("evcil-sarki:"+id,ozet(String(id))+Math.floor(Date.now()/6e4)).catch(()=>{}),tost(\u00E7("{ad}: {numara}!",{ad:adi(
id).name??"",numara:EVCIL_NUMARA_AD[t]??t}),"sparkles"),$("#evcil-kose",kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"nearest"})};for(const b of $$("[data-evcil-ad]",kap))b.onclick=
()=>{const id=b.dataset.evcilAd,p=adi(id);adPenceresi({ust:evcilCinsAdi(p.breed),baslik:\u00E7("Ad\u0131n\u0131 de\u011Fi\u015Ftir"),onay:\u00E7("Kaydet"),ilk:p.name??"",is:async ad=>sonuc(await Sunucu.
yap("pet_rename",{p_pet:id,p_name:ad}),()=>tost(\u00E7("Yeni ad\u0131: {ad}.",{ad}),"pencil"))})};for(const b of $$("[data-evcil-birak]",kap))b.onclick=()=>{const id=b.dataset.evcilBirak,p=adi(id);pencere(
{ust:\u00E7("Evcil hayvan"),baslik:\u00E7("{ad} bar\u0131na\u011Fa geri verilsin mi?",{ad:p.name??""}),govde:`<p class="aciklama">${esc(\u00E7("Bar\u0131nak ona iyi bakar. Geri d\xF6n\xFC\u015F\xFC yok: bak\u0131m g\xFCnleri nu\
maralar\u0131yla gider, ba\u011F\u0131\u015F geri \xF6denmez. Can Dostu g\xFCnlerin kal\u0131r."))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Geri ver"),sinif:"mercan",ikon:"house",is:()=>isle(
()=>Sunucu.yap("pet_release",{p_pet:id}),()=>tost(\u00E7("{ad} bar\u0131na\u011Fa d\xF6nd\xFC; ona iyi bakacaklar.",{ad:p.name??""}),"house"))}]})};for(const b of $$("[data-evcil-yuru]",kap))b.onclick=
()=>{const id=b.dataset.evcilYuru,p=adi(id),kapat=v.walk_pet===id;isle(()=>Sunucu.yap("pet_walk_set",{p_pet:kapat?null:id}),y=>{tost(kapat?\u00E7("{ad} evde kalacak.",{ad:p.name??""}):y?.walk_code?\u00E7(
"{ad} tok ve mutlu olunca meydanda arkandan y\xFCr\xFCr.",{ad:p.name??""}):y?.in_square?\u00E7("{ad} meydana geldi; arkandan y\xFCr\xFCyor.",{ad:p.name??""}):\u00E7("{ad} meydana girince arkandan y\xFCr\xFC\
r.",{ad:p.name??""}),"footprints")})};for(const b of $$("[data-evcil-tur]",kap))b.onclick=()=>{tur=b.dataset.evcilTur,ciz()};for(const b of $$("[data-evcil-cins]",kap))b.onclick=()=>{cins=b.dataset.evcilCins,
ciz()};$("#evcil-sahiplen",kap)?.addEventListener("click",()=>{const ucret=Number(R().adoption?.feeCr??2e3);adPenceresi({ust:\u00E7("Bar\u0131nak"),baslik:\u00E7("{cins} sahiplen",{cins:evcilCinsAdi(cins)}),
onay:\u00E7("Sahiplen"),is:async ad=>sonuc(await Sunucu.yap("pet_adopt",{p_species:tur,p_breed:cins,p_name:ad}),y=>{tost(\u00E7("{ad} art\u0131k evinde! Bar\u0131na\u011Fa {kr} kredi ba\u011F\u0131\u015Flad\u0131n.",
{ad,kr:kr(Number(y?.fee_cr??ucret))}),"heart"),y?.adopted?.id&&setTimeout(()=>sahne.oyna("sev",y.adopted.id),400)})})})}const tazele=tazeleyici(async()=>{await yukle(),!kapandi&&!mesgul&&!document.querySelector(
".perde")&&ciz()});await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^pet\./.test(olay)&&tazele()}),saat=setInterval(()=>{kapandi||tazele()},3e4);return()=>{kapandi=!0,b1(),clearInterval(saat),
sahne.kapat()}}}),Parcalar.tamam("ek_98zx_evcil");
