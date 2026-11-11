// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_58_hareket.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("ulke/hareket",{async ac(kap){let s=null,es=null,kapandi=!1,durdur=()=>{};const ek=ElKoyma.ekran({kap,tazele:()=>tazele(),ciz:()=>{!kapandi&&s&&ciz()},kapandi:()=>kapandi});let mod=Gorunum.
uc()?"3b":"2b",hata3b=!1;const form={sebep:"economy",metin:"",yanit:""};async function yukle(){[s,es]=await Promise.all([Sunucu.cagir("movement_status"),Sunucu.cagir("seizure_status").catch(()=>null),
Durum.ozet()]),ek.durumYaz(es)}const r=()=>s.rules,p=()=>s.petition,acik=()=>p()?.status==="open";function mitingDurumu(){const x=p(),durum=x?x.status==="open"?"acik":x.status==="succeeded"?"basarili":
"basarisiz":"yok",sandik=!!s.early_election||x?.status==="succeeded";return{ulke:s.country_id,durum,imza:Number(x?.signatures??0),esik:Number(x?.threshold??5),sebep:x?.reason??"other",yanit:!!x?.response,
imzaladim:!!x?.signed,sandik,anahtar:`${x?.petition_id??"-"}|${durum}|${x?.signatures??0}|${x?.response?1:0}|${sandik?1:0}`}}function mitingKarti(){const m=mitingDurumu(),yazi=m.durum==="yok"?\u00E7("\
Meydan sakin. \u0130mza kampanyas\u0131 ba\u015Flay\u0131nca kalabal\u0131k imzalarla b\xFCy\xFCr."):m.durum==="acik"?\u00E7("{n} imza, e\u015Fik {esik}. Meydan e\u015Fikte dolar.",{n:sayi(m.imza),esik:sayi(
m.esik)}):m.durum==="basarili"?\u00E7("Kampanya e\u015Fi\u011Fe ula\u015Ft\u0131: {n} imza.",{n:sayi(m.imza)}):\u00E7("Kampanya s\xFCresinde e\u015Fi\u011Fe ula\u015Famad\u0131 ({n}/{esik}); kalabal\u0131k da\u011F\u0131ld\u0131.",
{n:sayi(m.imza),esik:sayi(m.esik)});return`<section class="kart miting-kart" id="miting-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Miting meydan\u0131")}</p><h2 class="b2">${esc(ulkeAdi(s.country_id))}</h2></div>
          ${Gorunum.webglVar()?`<button class="dugme sade kucuk-d" id="miting-mod" aria-pressed="${mod==="2b"}" title="${mod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCme (2B) ge\xE7"):\u00E7("3B g\xF6r\xFCn\xFCme ge\
\xE7")}">${ikon("layers")}${mod==="3b"?\u00E7("2B"):\u00E7("3B")}</button>`:""}</div>
        <div class="miting-sahne sahne3b" id="miting-sahne" data-mod="${mod}">
          ${mod==="3b"?`<div class="yukleniyor${miting3bOrnek?" bitti":""}" id="miting-yukleniyor"><div class="yukleniyor-ic"><img src="img/amblem.png" alt=""><span>${\u00E7("Meydan a\xE7\u0131l\u0131yor\u2026")}\
</span></div></div>`:""}
          <div class="miting-2b" id="miting-2b"${mod==="3b"?" hidden":""}>${mod==="2b"?miting2b(m):""}</div>
        </div>
        <p class="kucuk" style="margin-top:8px" aria-live="polite">${yazi}</p>
      </section>`}function engelHtml(b){return b?`<div class="hata-kutusu" data-hareket-engel="${esc(b.code)}">${ikon("circle-alert")}<span>${esc(sunucuIletisi(b.code,b.hint))}${b.until?" "+\u00E7("A\xE7\
\u0131l\u0131\u015F: {zaman}.",{zaman:esc(saatYaz(b.until))})+` <b data-bitis="${esc(b.until)}"></b>`:""}</span></div>`:""}function yanitHtml(x){return x.response?`<div class="hareket-yanit" data-hare\
ket-yanit><span class="liste-ikon lacivert">${ikon("scroll-text")}</span>
          <div><span class="tur">${\u00E7("H\xFCk\xFCmetin resm\xEE yan\u0131t\u0131 \xB7 {ad} \xB7 {zaman}",{ad:esc(x.response.by??""),zaman:esc(saatYaz(x.response.at))})}</span>
            <p class="hareket-metin">${esc(x.response.body)}</p></div></div>`:s.is_head?`<form class="form" id="yanit-form" novalidate>
        <label class="alan"><span>${\u00E7("H\xFCk\xFCmetin resm\xEE yan\u0131t\u0131")}</span>
          <textarea name="yanit" maxlength="${Number(r().petition.responseMax)}" rows="3" placeholder="${\u00E7("Kampanyaya h\xFCk\xFCmetin cevab\u0131; bir kez yaz\u0131l\u0131r.")}">${esc(form.yanit)}\
</textarea>
          <small data-sayac="yanit">${\u00E7("{n}/{max} harf",{n:[...hareketMetni(form.yanit)].length,max:Number(r().petition.responseMax)})}</small></label>
        <div class="satir"><button class="dugme" type="submit">${ikon("scroll-text")}${\u00E7("Yan\u0131t\u0131 yay\u0131mla")}</button></div>
      </form>`:`<p class="kucuk">${\u00E7("H\xFCk\xFCmet hen\xFCz yan\u0131t vermedi. Resm\xEE yan\u0131t\u0131 ba\u015Fkan (yoksa vek\xE2let eden) bir kez yazar.")}</p>`}function kampanyaKarti(){const x=p();
if(x&&x.status==="open"){const oran=Math.min(1,Number(x.signatures)/Math.max(1,Number(x.threshold)));return`<section class="kart" id="kampanya-kart" data-kampanya="${esc(x.petition_id)}">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u0130mza kampanyas\u0131 \xB7 {sebep}",{sebep:esc(hareketSebep(x.reason))})}</p>
            <h2 class="b2">${\u00E7("Erken se\xE7im istiyoruz")}</h2></div><span class="ik-kutu">${ikon(HAREKET_SEBEP[x.reason]?.ik??"megaphone")}</span></div>
          <p class="kucuk">${\u00E7("Ba\u015Flatan {ad} \xB7 {zaman}",{ad:esc(x.initiator??""),zaman:esc(saatYaz(x.opened_at))})}</p>
          ${x.hidden?`<p class="kucuk">${\u00E7("A\xE7\u0131klama kurallara ayk\u0131r\u0131 bulundu\u011Fu i\xE7in gizlendi; kampanya s\xFCr\xFCyor.")}</p>`:`<p class="hareket-metin">${esc(x.body??"")}\
</p>`}
          <div class="hareket-sayac"><b data-imza-sayi>${sayi(x.signatures)}</b><span>${\u00E7("/ {esik} imza",{esik:sayi(x.threshold)})}</span>
            <span class="cip">${ikon("clock")}<b data-bitis="${esc(x.closes_at)}"></b></span></div>
          <div class="cubuk" style="margin-top:6px"><i style="width:${Math.round(oran*100)}%"></i></div>
          <p class="kucuk" style="margin-top:6px">${\u00E7("E\u015Fik a\xE7\u0131l\u0131\u015Ftaki {n} se\xE7menin {oran} kadar\u0131 (en az {min}). E\u015Fik dolunca ola\u011Fan\xFCst\xFC se\xE7im hemen ba\u015Flar.",
{n:sayi(x.voters),oran:ppmYuzde(r().petition.thresholdPpm),min:sayi(r().petition.minSignatures)})}</p>
          <div class="oneri-dugmeler" style="margin-top:10px">
            ${x.signed?`<span class="cip yesil" data-imzaladin>${ikon("check")}${\u00E7("\u0130mzalad\u0131n")}</span>`:s.is_voter?`<button class="dugme altin" id="imzala">${ikon("notebook-pen")}${\u00E7(
"\u0130mzala")}</button>`:""}
            ${x.initiator_id!==benimKimlik()||x.response?`<button class="dugme sade kucuk-d" id="kampanya-rapor">${\u00E7("Raporla")}</button>`:""}
          </div>
          ${!x.signed&&!s.is_voter?`<p class="kucuk">${\u00E7("\u0130mzalamak i\xE7in oy hakk\u0131n olmal\u0131: hesab\u0131n ve vatanda\u015Fl\u0131\u011F\u0131n en az {n} saatlik olmal\u0131 ve vatanda\u015Fl\u0131k \xF6\u011Freticisini bitirmelisin.",
{n:Number(r().normal.accountAgeH)})}</p>`:""}
          ${x.signed?`<p class="kucuk">${\u00E7("\u0130mzan kimseye g\xF6sterilmez; yaln\u0131z say\u0131 herkese a\xE7\u0131k. Kampanya kapand\u0131ktan {gun} g\xFCn sonra imzalayanlar\u0131n kimli\u011Fi silinir.",
{gun:sayi(r().petition.signerRetentionDays)})}</p>`:""}
          <hr class="ayrac">${yanitHtml(x)}
        </section>`}const kapanan=x?`<div class="hareket-sonuc ${x.status==="succeeded"?"yesil":""}" data-kampanya-sonuc="${esc(x.status)}">
          <span class="liste-ikon ${x.status==="succeeded"?"yesil":""}">${ikon(x.status==="succeeded"?"party-popper":"hourglass")}</span>
          <div><span class="tur">${\u00E7("Son kampanya \xB7 {sebep} \xB7 {zaman}",{sebep:esc(hareketSebep(x.reason)),zaman:esc(saatYaz(x.closed_at))})}</span>
            <b>${x.status==="succeeded"?x.close_reason==="threshold"?\u00E7("E\u015Fi\u011Fe ula\u015Ft\u0131: {n} imza. Ola\u011Fan\xFCst\xFC se\xE7im ba\u015Flad\u0131.",{n:sayi(x.signatures)}):\u00E7(
"E\u015Fi\u011Fe ula\u015Ft\u0131: {n} imza. Se\xE7im zaten s\xFCr\xFCyordu; yeni se\xE7im gerekmedi.",{n:sayi(x.signatures)}):\u00E7("S\xFCresinde e\u015Fi\u011Fe ula\u015Famad\u0131: {n}/{esik} imza.",
{n:sayi(x.signatures),esik:sayi(x.threshold)})}</b>
            ${x.response?`<div class="alt">${\u00E7("H\xFCk\xFCmetin yan\u0131t\u0131: {metin}",{metin:esc(x.response.body)})}</div>`:""}</div></div>`:"",b=s.blocker_petition,secmen=Number(s.voters),baslat=b?
engelHtml(b):s.is_voter?`<form class="form" id="kampanya-form" novalidate>
            <p class="aciklama">${\u00E7("Ba\u015Flatan olarak ad\u0131n ve a\xE7\u0131klaman herkese g\xF6r\xFCn\xFCr; ilk imzay\u0131 sen atars\u0131n. {saat} saat i\xE7inde {esik} imza toplan\u0131rsa (\u015Fu an {n} se\xE7men) ola\u011Fan\xFCst\xFC se\xE7im yap\u0131l\
\u0131r.",{saat:sayi(r().petition.hours),esik:sayi(hareketEsik(r(),secmen)),n:sayi(secmen)})}</p>
            <p class="ust-yazi">${\u00E7("Sebep")}</p>
            <div class="radyo-liste">${(r().petition.reasons??Object.keys(HAREKET_SEBEP)).map(k=>`<label class="radyo"><input type="radio" name="sebep" value="${esc(k)}" ${form.sebep===k?"checked":""}\
>
              <span><b>${ikon(HAREKET_SEBEP[k]?.ik??"megaphone")} ${esc(hareketSebep(k))}</b></span></label>`).join("")}</div>
            <label class="alan"><span>${\u00E7("A\xE7\u0131klama")}</span>
              <textarea name="metin" maxlength="${Number(r().petition.textMax)}" rows="3" placeholder="${\u00E7("Neden erken se\xE7im istiyorsunuz? K\u0131sa ve a\xE7\u0131k yaz.")}">${esc(form.metin)}\
</textarea>
              <small data-sayac="metin">${\u00E7("{n}/{max} harf",{n:[...hareketMetni(form.metin)].length,max:Number(r().petition.textMax)})}</small></label>
            <div class="satir"><button class="dugme altin" type="submit">${ikon("megaphone")}${\u00E7("Kampanyay\u0131 ba\u015Flat")}</button></div>
          </form>`:`<p class="aciklama">${\u00E7("Kampanya ba\u015Flatmak i\xE7in oy hakk\u0131n olmal\u0131: hesab\u0131n ve vatanda\u015Fl\u0131\u011F\u0131n en az {n} saatlik olmal\u0131 ve vatanda\u015Fl\u0131k \xF6\u011Freticisini bitirmelisin.",
{n:Number(r().normal.accountAgeH)})}</p>`;return`<section class="kart" id="kampanya-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u0130mza kampanyas\u0131")}</p><h2 class="b2">${\u00E7("Erken se\xE7im i\xE7in imza topla")}</h2></div><span class="ik-kutu">${ikon("m\
egaphone")}</span></div>
        ${kapanan}${kapanan?'<hr class="ayrac">':""}${baslat}
      </section>`}function guvensizlikKarti(){const m=s.no_confidence;if(m)return`<section class="kart" id="guvensizlik-kart">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Meclis")}</p><h2 class="b2">${\u00E7("G\xFCvensizlik oyu s\xFCr\xFCyor")}</h2></div><span class="ik-kutu">${ikon("gavel")}</span></di\
v>
          <p class="aciklama">${\u00E7("\xD6neren {ad}. Kabul i\xE7in {n} evet gerekir ({dolu} dolu sandalye).",{ad:esc(m.proposer??""),n:sayi(m.required_yes),dolu:sayi(m.seats_filled)})}</p>
          <div class="oy-say"><span>${\u00E7("Evet")} <b>${sayi(m.yes)}</b></span><span>${\u00E7("\xC7ekimser")} <b>${sayi(m.abstain)}</b></span><span>${\u00E7("Hay\u0131r")} <b>${sayi(m.no)}</b></spa\
n>
            <span class="cip">${ikon("clock")}<b data-bitis="${esc(m.closes_at)}"></b></span></div>
          ${s.is_member?`<div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="ulke/meclis">${ikon("gavel")}${\u00E7("Meclise git, oy ver")}</button></div>`:""}
        </section>`;const b=s.blocker_no_confidence;return`<section class="kart" id="guvensizlik-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Meclis")}</p><h2 class="b2">${\u00E7("G\xFCvensizlik oyu")}</h2></div><span class="ik-kutu">${ikon("gavel")}</span></div>
        <p class="aciklama">${\u00E7("Milletvekilleri h\xFCk\xFCmete g\xFCvensizlik \xF6nergesi verebilir. Dolu sandalyelerin \xFC\xE7te ikisi ve en az {n} evet kabul ederse ola\u011Fan\xFCst\xFC se\xE7im olur: ba\u015Fkan ve meclisin ta\
mam\u0131 yeniden se\xE7ilir.",{n:sayi(r().no_confidence.minYes)})}</p>
        ${s.is_member?b?engelHtml(b):`<div class="satir" style="margin-top:10px"><button class="dugme mercan" id="guvensizlik-ver">${ikon("gavel")}${\u00E7("G\xFCvensizlik \xF6nergesi ver")}</button><\
/div>`:""}
      </section>`}function secimKarti(){const e=s.early_election;if(!e)return"";const bekle=e.war_hold_until&&e.stage==="scheduled";return`<section class="kart" id="olaganustu-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ola\u011Fan\xFCst\xFC se\xE7im \xB7 {neden}",{neden:esc(HAREKET_YOL[e.cause]??e.cause)})}</p>
          <h2 class="b2">${esc(ASAMA[e.stage]??e.stage)}</h2></div><span class="ik-kutu">${ikon("vote")}</span></div>
        ${bekle?`<div class="yasa-bant uyari" data-savas-ertelemesi>${ikon("swords")}<span>${\u00E7("\xDClke sava\u015Fta: se\xE7imin ba\u015Flang\u0131c\u0131 sava\u015F bitene kadar, en ge\xE7 {zaman} ertelendi.",
{zaman:esc(saatYaz(e.war_hold_until))})}
          <b data-bitis="${esc(e.war_hold_until)}"></b></span></div>`:""}
        <div class="gunluk">
          <div class="gunluk-oge ${e.stage==="scheduled"?"altin":"gecti"}"><time>${esc(saatYaz(e.freeze_at))}</time><b>${\u00E7("Se\xE7men listesi donar")}</b><p>${\u00E7("O anda oy hakk\u0131 olanlar list\
eye girer.")}</p></div>
          <div class="gunluk-oge ${e.stage==="candidacy"?"altin":["voting","runoff","certified"].includes(e.stage)?"gecti":""}"><time>${esc(saatYaz(e.freeze_at))} \u2013 ${esc(saatYaz(e.voting_start))}\
</time>
            <b>${\u00E7("Adayl\u0131k ({n} saat)",{n:sayi(r().early.candidacyH)})}</b><p>${\u00E7("Ba\u015Fkanl\u0131\u011Fa ve meclise aday olunur.")}</p></div>
          <div class="gunluk-oge ${e.stage==="voting"||e.stage==="runoff"?"altin":e.stage==="certified"?"gecti":""}"><time>${esc(saatYaz(e.voting_start))} \u2013 ${esc(saatYaz(e.voting_end))}</time>
            <b>${\u00E7("Oylama ({n} saat)",{n:sayi(r().early.votingH)})}</b><p>${\u00E7("Gizli oy.")}</p></div>
          <div class="gunluk-oge ${e.stage==="certified"?"altin":""}"><time>${esc(saatYaz(e.term_start))}</time><b>${\u00E7("Yeni d\xF6nem ba\u015Flar")}</b>
            <p>${\u00E7("Kazananlar tam d\xF6nem ({n} g\xFCn) g\xF6rev yapar; o zamana kadar eski y\xF6netim g\xF6revde.",{n:sayi(e.term_days)})}</p></div>
        </div>
        <div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="ulke/secim">${ikon("vote")}${\u00E7("Se\xE7ime git")}</button></div>
      </section>`}function kurallarKarti(){const k=r(),maddeler=[["megaphone",\u00E7("\u0130mza kampanyas\u0131n\u0131 oy hakk\u0131 olan her vatanda\u015F ba\u015Flat\u0131r; {saat} saat s\xFCrer. E\u015Fik a\xE7\u0131l\u0131\u015Ftaki se\xE7menlerin {oran} kadar\
\u0131, en az {min} imza.",{saat:sayi(k.petition.hours),oran:ppmYuzde(k.petition.thresholdPpm),min:sayi(k.petition.minSignatures)})],["gavel",\u00E7("G\xFCvensizlik oyunu milletvekilleri \xF6nerir; oylama {\
saat} saat s\xFCrer, dolu sandalyelerin \xFC\xE7te ikisi gerekir.",{saat:sayi(k.parliament_vote_h)})],["vote",\u00E7("Ola\u011Fan\xFCst\xFC se\xE7im s\u0131radaki ola\u011Fan se\xE7imin yerine ge\xE7er: {aday} saat adayl\u0131k, {oy} s\
aat oylama; kazananlar tam d\xF6nem g\xF6rev yapar.",{aday:sayi(k.early.candidacyH),oy:sayi(k.early.votingH)})],["hourglass",\u00E7("D\xF6nemin ilk {gun} g\xFCn\xFCnde hareket ba\u015Flamaz; ba\u015Far\u0131s\u0131z hareketten so\
nra {bekleme} g\xFCn beklenir. Ayn\u0131 anda tek hareket olur; ola\u011Fan se\xE7im yak\u0131nsa hareket ba\u015Flamaz; uyuyan \xFClkede hareket yoktur.",{gun:sayi(k.term_grace_days),bekleme:sayi(k.cooldown_days)})],
["swords",\u00E7("\xDClke sava\u015Ftaysa se\xE7imin ba\u015Flang\u0131c\u0131 sava\u015F bitene kadar, en \xE7ok {gun} g\xFCn ertelenir.",{gun:sayi(k.war_hold_max_days)})],["eye-off",\u00E7("\u0130mzalaya\
nlar kimseye g\xF6sterilmez; kampanya kapand\u0131ktan {gun} g\xFCn sonra kimlikleri silinir, say\u0131 kal\u0131r.",{gun:sayi(k.petition.signerRetentionDays)})]];return`<section class="kart"><div cla\
ss="kart-bas"><div><p class="ust-yazi">${\u00E7("Kurallar")}</p><h2 class="b2">${\u00E7("Halk hareketi nas\u0131l i\u015Fler?")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></div>
        <div class="liste">${maddeler.map(([ik,m])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(m)}</div></div><span></span></div>`).
join("")}</div>
      </section>`}function gecmisKarti(){const h=s.history??[];return h.length?`<section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ge\xE7mi\u015F")}</p><h2 class="b2">${\u00E7(
"\xD6nceki hareketler")}</h2></div><span class="ik-kutu">${ikon("calendar")}</span></div>
        <div class="liste">${h.slice(0,12).map(x=>{if(x.type==="petition"){const ok2=x.status==="succeeded";return`<div class="liste-satir" data-gecmis-kampanya="${esc(x.petition_id)}"><span class="li\
ste-ikon ${ok2?"yesil":""}">${ikon(HAREKET_SEBEP[x.reason]?.ik??"megaphone")}</span>
              <div><span class="tur">${\u00E7("\u0130mza kampanyas\u0131 \xB7 {sebep} \xB7 {zaman}",{sebep:esc(hareketSebep(x.reason)),zaman:esc(saatYaz(x.closed_at??x.opened_at))})}</span>
                <b>${\u00E7("{n}/{esik} imza",{n:sayi(x.signatures),esik:sayi(x.threshold)})}</b><div class="alt">${\u00E7("Ba\u015Flatan {ad}",{ad:esc(x.initiator??"")})}</div></div>
              <span class="cip ${ok2?"yesil":""}">${ok2?\u00E7("Ba\u015Far\u0131l\u0131"):\u00E7("E\u015Fi\u011Fe ula\u015Fmad\u0131")}</span></div>`}const ok=x.status==="passed";return`<div class="li\
ste-satir" data-gecmis-onerge="${esc(x.motion_id)}"><span class="liste-ikon ${ok?"yesil":"mercan"}">${ikon("gavel")}</span>
            <div><span class="tur">${\u00E7("G\xFCvensizlik oyu \xB7 {zaman}",{zaman:esc(saatYaz(x.closed_at??x.opened_at))})}</span>
              <b>${\u00E7("Evet {e} / gereken {n}",{e:sayi(x.yes),n:sayi(x.required_yes)})}</b><div class="alt">${\u00E7("\xD6neren {ad}",{ad:esc(x.proposer??"")})}</div></div>
            <span class="cip ${ok?"yesil":"mercan"}">${ok?\u00E7("Kabul edildi"):\u00E7("Reddedildi")}</span></div>`}).join("")}</div></section>`:""}function ciz(){durdur();const x=p(),cip=es?.active?
[\u00E7("Ba\u015Fkentte m\xFCcadele"),"mercan","swords"]:es?.interim?[\u00E7("Ge\xE7ici y\xF6netim"),"mercan","lock"]:s.early_election?[\u00E7("Ola\u011Fan\xFCst\xFC se\xE7im"),"altin","vote"]:acik()?
[\u00E7("Kampanya s\xFCr\xFCyor"),"altin","megaphone"]:s.no_confidence?[\u00E7("G\xFCvensizlik oyu"),"mercan","gavel"]:[\u00E7("Sakin"),"","landmark"];kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div>${ulkeUst(s.country_id,\u00E7("Halk hareketi"))}<h1 class="b1">${\u00E7("Halk hareketi")}</h1>
          <p class="aciklama">${\u00E7("Vatanda\u015Flar imza kampanyas\u0131yla, meclis g\xFCvensizlik oyuyla erken se\xE7im isteyebilir.")}</p></div>
          <span class="cip ${cip[1]}" id="hareket-cip">${ikon(cip[2])}${esc(cip[0])}</span></div>
        ${Durum.v.ozet?.character?.civic_tutorial_done?"":`<div class="yasa-bant uyari">${ikon("graduation-cap")}<span><b>${\u00E7("\u0130mza atmak ve kampanya ba\u015Flatmak i\xE7in vatanda\u015Fl\u0131k \xF6\u011Freticisini bitir\
.")}</b></span>
          <button class="dugme kucuk-d" data-ogretici>${\u00E7("\xD6\u011Freticiyi a\xE7")}</button></div>`}
        ${ek.ust()?`<div class="yigin ek-ust">${ek.ust()}</div>`:""}
        <div class="izgara iki">
          <div class="yigin">${mitingKarti()}${kampanyaKarti()}</div>
          <div class="yigin">${secimKarti()}${guvensizlikKarti()}${ek.kart()}${kurallarKarti()}${gecmisKarti()}</div>
        </div></div>`,bagla(),ek.bagla(),mitingBagla();const an=[x?.status==="open"?x.closes_at:null,s.blocker_petition?.until,s.blocker_no_confidence?.until,s.no_confidence?.closes_at,s.early_election?.
war_hold_until,...ek.anlar()].filter(Boolean).sort()[0]??null;an!==sonAn&&(sonAn=an,sayac.n=0),durdur=geriSay(kap,()=>setTimeout(tazele,gecikmeli(sayac)))}let sonAn=null;const sayac={n:0};function mitingBirak(){
miting3bOrnek&&Uc.cizici?.etkin===miting3bOrnek&&Uc.cizici.birak(miting3bOrnek)}async function mitingBagla(){const kutu=$("#miting-sahne",kap);if(!kutu||mod!=="3b"){mitingBirak();return}try{const{THREE,
cizici,birlestir}=await Uc.yukle("58_hareket.js");if(kapandi||mod!=="3b"||$("#miting-sahne",kap)!==kutu)return;if(miting3bOrnek??=miting3bKur(THREE,cizici,birlestir),miting3bOrnek.durumYaz(mitingDurumu()),
!cizici.bagla(miting3bOrnek,kutu))throw new Error("webgl-bagla");$("#miting-yukleniyor",kutu)?.classList.add("bitti"),kutu.dataset.kisi=String(miting3bOrnek.kalabalik.kisi)}catch(e){if(console.warn("3\
B meydan a\xE7\u0131lamad\u0131:",e),kapandi)return;hata3b=!0,mod="2b",tost(\u00E7("3B meydan bu cihazda a\xE7\u0131lamad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),"layers"),ciz()}}function harfSayaci(alan,max){
const g=$(`textarea[name=${alan}]`,kap),yaz=$(`[data-sayac=${alan}]`,kap);g?.addEventListener("input",()=>{form[alan]=g.value,yaz&&(yaz.textContent=\u00E7("{n}/{max} harf",{n:[...hareketMetni(g.value)].
length,max}))})}function bagla(){for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);ogreticiBagla(kap,tazele),$("#miting-mod",kap)?.addEventListener("click",()=>{hata3b=!1;const ikiB=mod===
"3b";Gorunum.ayarla(ikiB?"2b":"3b"),tost(ikiB?\u00E7("Hafif g\xF6r\xFCn\xFCm (2B) se\xE7ildi. Ayarlar'dan de\u011Fi\u015Ftirebilirsin."):\u00E7("3B g\xF6r\xFCn\xFCm se\xE7ildi."),"layers")});for(const g of $$(
"#kampanya-form input[name=sebep]",kap))g.onchange=()=>{form.sebep=g.value};harfSayaci("metin",Number(r().petition.textMax)),harfSayaci("yanit",Number(r().petition.responseMax)),$("#kampanya-form",kap)?.
addEventListener("submit",e=>{e.preventDefault();const metin=hareketMetni(form.metin),n=[...metin].length;if(n<Number(r().petition.textMin)||n>Number(r().petition.textMax)){tost(\u00E7("A\xE7\u0131klama {min}\
\u2013{max} harf olmal\u0131.",{min:Number(r().petition.textMin),max:Number(r().petition.textMax)}),"circle-alert");return}const esik=hareketEsik(r(),s.voters);pencere({ust:\u00E7("\u0130mza kampanyas\u0131"),
baslik:\u00E7("Kampanyay\u0131 ba\u015Flat"),govde:`<p class="aciklama">${\u00E7("Sebep: <b>{sebep}</b>.",{sebep:esc(hareketSebep(form.sebep))})} ${\u00E7("{saat} saat i\xE7inde {esik} imza toplan\u0131rsa ol\
a\u011Fan\xFCst\xFC se\xE7im yap\u0131l\u0131r; toplanmazsa {gun} g\xFCn yeni hareket ba\u015Flamaz.",{saat:sayi(r().petition.hours),esik:sayi(esik),gun:sayi(r().cooldown_days)})}</p>
            <p class="kucuk" style="margin-top:8px">${\u00E7("Ad\u0131n ve a\xE7\u0131klaman herkese g\xF6r\xFCn\xFCr. A\xE7\u0131klama sonradan de\u011Fi\u015Ftirilemez.")}</p>`,dugmeler:[{ad:\u00E7(
"Vazge\xE7")},{ad:\u00E7("Ba\u015Flat"),sinif:"altin",ikon:"megaphone",is:async()=>{try{await Sunucu.yap("petition_open",{p_reason:form.sebep,p_body:metin}),form.metin="",tost(\u00E7("Kampanya ba\u015Flad\u0131\
; ilk imzay\u0131 sen att\u0131n."),"megaphone")}catch(err){tost(hataMetni(err),"circle-alert")}await tazele()}}]})}),$("#imzala",kap)?.addEventListener("click",()=>{const x=p();pencere({ust:\u00E7("\u0130\
mza kampanyas\u0131"),baslik:\u00E7("Kampanyay\u0131 imzala"),govde:`<p class="aciklama">${\u00E7("\u0130mzan geri al\u0131nmaz. Kimin imzalad\u0131\u011F\u0131 kimseye g\xF6sterilmez; yaln\u0131z say\u0131 herkese a\xE7\u0131k.")}\
</p>
            <p class="kucuk" style="margin-top:8px">${\u00E7("Kampanya kapand\u0131ktan {gun} g\xFCn sonra imzalayanlar\u0131n kimli\u011Fi silinir.",{gun:sayi(r().petition.signerRetentionDays)})}</p>`,
dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\u0130mzala"),sinif:"altin",ikon:"notebook-pen",is:async()=>{try{const y=await Sunucu.yap("petition_sign",{p_petition:x.petition_id});tost(y?.status==="s\
ucceeded"?\u00E7("\u0130mzan e\u015Fi\u011Fi doldurdu: ola\u011Fan\xFCst\xFC se\xE7im ba\u015Fl\u0131yor!"):\u00E7("\u0130mzan say\u0131ld\u0131."),y?.status==="succeeded"?"party-popper":"check")}catch(err){
tost(hataMetni(err),"circle-alert")}await tazele()}}]})}),$("#kampanya-rapor",kap)?.addEventListener("click",()=>raporla({kampanya:p().petition_id})),$("#yanit-form",kap)?.addEventListener("submit",async e=>{
e.preventDefault();const metin=hareketMetni(form.yanit),n=[...metin].length,max=Number(r().petition.responseMax);if(n<Number(r().petition.textMin)||n>max){tost(\u00E7("Yan\u0131t {min}\u2013{max} harf olmal\u0131.",
{min:Number(r().petition.textMin),max}),"circle-alert");return}const b=$("#yanit-form button[type=submit]",kap);b.disabled=!0;try{await Sunucu.yap("petition_respond",{p_petition:p().petition_id,p_body:metin}),
form.yanit="",tost(\u00E7("H\xFCk\xFCmetin yan\u0131t\u0131 kampanyan\u0131n yan\u0131nda yay\u0131mland\u0131."),"scroll-text")}catch(err){tost(hataMetni(err),"circle-alert"),b.disabled=!1}await tazele()}),
$("#guvensizlik-ver",kap)?.addEventListener("click",guvensizlikVer)}function guvensizlikVer(){pencere({ust:\u00E7("Meclis"),baslik:\u00E7("G\xFCvensizlik \xF6nergesi"),govde:`<p class="aciklama">${\u00E7(
"Oylama {saat} saat s\xFCrer. Kabul i\xE7in dolu sandalyelerin \xFC\xE7te ikisi ve en az {n} evet gerekir. Kabul edilirse ola\u011Fan\xFCst\xFC se\xE7im olur; reddedilirse {gun} g\xFCn yeni hareket ba\u015Flamaz.",
{saat:sayi(r().parliament_vote_h),n:sayi(r().no_confidence.minYes),gun:sayi(r().cooldown_days)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Oylamaya a\xE7"),sinif:"mercan",ikon:"gavel",is:async()=>{
try{await Sunucu.yap("motion_propose_no_confidence",{}),tost(\u00E7("G\xFCvensizlik \xF6nergesi oylamaya a\xE7\u0131ld\u0131."),"gavel")}catch(err){tost(hataMetni(err),"circle-alert")}await tazele()}}]})}
const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()});await yukle(),ciz();const b1=Durum.dinle("ulke-olay",({olay,yuk})=>{if(olay==="seizure.live"){ek.canli(yuk?.data);return}/^(movement\.|parliament\.motion_|election\.|office\.installed|country\.(war_|awoke|dormant)|seizure\.)/.
test(olay)&&tazele()}),b3=Durum.dinle("olay",({olay})=>{/^seizure\./.test(olay)&&tazele()}),ulke=Durum.v.ozet?.character?.citizenship;let katildi=!1;const b4=ulke?Sunucu.Canli.dinle("movement:"+ulke,olay=>{
/^movement\./.test(olay)&&tazele()},{katilinca:()=>{katildi&&tazele(),katildi=!0}}):()=>{},b2=Gorunum.dinle(()=>{const m=Gorunum.uc()&&!hata3b?"3b":"2b";m!==mod&&s&&(mod=m,ciz())});return()=>{kapandi=
!0,durdur(),b1(),b2(),b3(),b4(),ek.birak(),mitingBirak()}}}),Parcalar.tamam("ek_58_hareket");
