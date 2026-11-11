// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98zzg_mahalle_ligi.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/lig",{async ac(kap){let v=null,hata=null,kapandi=!1,mesgul=!1,bolge=null,zaman=null;const R=()=>v?.rule??futbolKurali()?.neighborhood??{},T=()=>v?.my_team??null;async function yukle(){
try{v=await Sunucu.cagir("football_neighborhood",bolge?{p_region:bolge}:{}),hata=null}catch(e){hata=e}}async function yap(fn,p,mesaj,ik="badge-check"){if(!mesgul){mesgul=!0;try{await Sunucu.yap(fn,p),
mesaj&&tost(mesaj,ik),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert")}finally{mesgul=!1,await yukle(),kapandi||ciz()}}}const gunAdi=iso=>new Date(iso).toLocaleDateString(DIL.yerel,
{weekday:"short",day:"numeric",month:"short"}),renkKutusu=(r,buyuk=!1)=>`<span class="futbol-renk${buyuk?" buyuk":""}" style="--forma:${esc(r??FUTBOL_RENK.a)}" aria-hidden="true"></span>`,takimYazi=t=>`${renkKutusu(
t?.color)} ${esc(mahalleTakimAdi(t))}`;function davetlerHtml(){const l=v.invites??[];return l.length?`<section class="kart" id="lig-davetler">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Mahalle tak\u0131m\u0131")}</p><h2 class="b2">${\u00E7("Tak\u0131m davetlerin")}</h2></div><span class="ik-kutu">${ikon("mail-open")}</\
span></div>
        <div class="liste">${l.map(x=>`<div class="liste-satir" data-lig-davet="${esc(x.id)}"><span class="liste-ikon">${renkKutusu(x.color)}</span>
          <div><b>${esc(\u00E7("{ad} seni {takim} tak\u0131m\u0131na \xE7a\u011F\u0131r\u0131yor",{ad:x.by??\u00E7("Kaptan"),takim:mahalleTakimAdi(x)}))}</b>
            <div class="alt">${esc([bolgeAdi(x.region_id),\u00E7("{n} \xFCye",{n:sayi(x.members??0)}),Number(x.titles)?\u00E7("{n} \u015Fampiyonluk",{n:sayi(x.titles)}):null,\u00E7("son g\xFCn {t}",{t:saatYaz(
x.expires_at)})].filter(Boolean).join(" \xB7 "))}</div></div>
          <div class="oneri-dugmeler"><button class="dugme altin kucuk-d" data-lig-davet-katil="${esc(x.id)}" ${mesgul||T()?"disabled":""}>${ikon("check")}${\u00E7("Kat\u0131l")}</button>
            <button class="dugme sade kucuk-d" data-lig-davet-red="${esc(x.id)}" ${mesgul?"disabled":""}>${ikon("x")}${\u00E7("Kat\u0131lmam")}</button></div></div>`).join("")}</div>
        ${T()?`<p class="kucuk">${esc(\u00E7("Bir tak\u0131mdas\u0131n; ba\u015Fka tak\u0131ma kat\u0131lmak i\xE7in \xF6nce ayr\u0131l."))}</p>`:""}
      </section>`:""}function takimHtml(){const t=T(),r=R();if(!t)return`<section class="kart" id="lig-takim">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Mahalle tak\u0131m\u0131")}</p><h2 class="b2">${\u00E7("Tak\u0131m\u0131n yok")}</h2></div><span class="ik-kutu">${ikon("shirt")}</sp\
an></div>
          <p class="kucuk">${esc(\u00E7("Bulundu\u011Fun \u015Fehirde tak\u0131m kur: ad\u0131n\u0131 ve rengini se\xE7, kaptan olursun. Arkada\u015Flar\u0131n\u0131 ve tan\u0131d\u0131klar\u0131n\u0131 davet edersin (tak\u0131mda en \xE7ok {n} ki\u015Fi); tak\u0131m\u0131n her hafta \u015F\
ehrin liginde oynar.",{n:sayi(r.team?.maxMembers??8)}))}</p>
          ${v.here?`<button class="dugme altin" id="lig-kur" style="margin-top:8px" ${mesgul?"disabled":""}>${ikon("flag")}${\u00E7("Tak\u0131m kur")}</button>`:`<div class="bilgi-kutusu uyari-kutusu"\
 style="margin-top:8px">${ikon("route")}<span>${esc(\u00E7("Yoldas\u0131n; vard\u0131\u011F\u0131n \u015Fehirde tak\u0131m kurabilirsin."))}</span></div>`}
        </section>`;const ben=(t.members??[]).find(m=>m.me),uyeler=(t.members??[]).map(m=>{const ad=m.me?\u00E7("Sen"):m.name??\u00E7("Ad\u0131n\u0131 gizleyen biri"),alt=[futbolPosAdi(m.pos),m.captain?
\u00E7("kaptan"):null,Number(m.played)?\u00E7("ligde {n} ma\xE7",{n:sayi(m.played)}):null,m.me?m.auto?\u00E7("kendili\u011Finden oynar"):\u00E7("kendili\u011Finden oynamaz"):null].filter(Boolean).join(
" \xB7 "),ic=`<span class="futbol-forma" style="--forma:${esc(t.color)}">${esc(FUTBOL_POS_KISA[m.pos]??"")}</span><div><b>${esc(ad)}</b><div class="alt">${esc(alt)}</div></div>`,islemler=t.captain&&!m.
me&&m.character_id?`<div class="oneri-dugmeler"><button class="dugme sade kucuk-d" data-lig-kaptan="${esc(m.character_id)}" data-ad="${esc(m.name??"")}" ${mesgul?"disabled":""}>${ikon("crown")}${\u00E7(
"Kaptan yap")}</button>
          <button class="dugme sade kucuk-d" data-lig-cikar="${esc(m.character_id)}" data-ad="${esc(m.name??"")}" ${mesgul?"disabled":""}>${ikon("user-round-minus")}${\u00E7("\xC7\u0131kar")}</button>\
</div>`:"<span></span>";return`<div class="liste-satir" data-lig-uye="${m.me?"ben":esc(m.character_id??"")}">${m.character_id&&!m.me?`<button type="button" class="lig-kisi" data-lig-kisi="${esc(m.character_id)}\
">${ic}</button>`:`<div class="lig-kisi">${ic}</div>`}${islemler}</div>`}).join(""),davetler=t.captain&&(t.invites??[]).length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Yan\u0131t bekleyen dav\
etler")}</p>
        <div class="liste">${t.invites.map(i=>`<div class="liste-satir"><span class="liste-ikon">${ikon("hourglass")}</span><div><b>${esc(i.name??"")}</b>
          <div class="alt">${esc(\u00E7("son g\xFCn {t}",{t:saatYaz(i.expires_at)}))}</div></div><span></span></div>`).join("")}</div>`:"",sayi_=Number(t.size??(t.members??[]).length)+(t.captain?(t.invites??
[]).length:0);return`<section class="kart" id="lig-takim" data-lig-takim="${esc(t.id)}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc([bolgeAdi(t.region_id),t.captain?\u00E7("kaptans\u0131n"):null].filter(Boolean).join(" \xB7 "))}</p>
          <h2 class="b2">${renkKutusu(t.color,!0)} ${esc(mahalleTakimAdi(t))}</h2></div>
          <span class="cip ${Number(t.titles)?"altin":""}" data-lig-sampiyonluk="${sayi(t.titles??0)}">${ikon("trophy")}${esc(\u00E7("{n} \u015Fampiyonluk",{n:sayi(t.titles??0)}))}</span></div>
        ${t.name_reset?`<div class="bilgi-kutusu uyari-kutusu" data-lig-adsiz>${ikon("id-card")}<span>${esc(t.captain?\u00E7("Tak\u0131m\u0131n ad\u0131 topluluk kurallar\u0131na uymad\u0131\u011F\u0131 i\xE7in kald\u0131r\u0131ld\u0131; yeni ad ver."):
\u00E7("Tak\u0131m\u0131n ad\u0131 kald\u0131r\u0131ld\u0131; kaptan yeni ad verecek."))}</span></div>`:""}
        <p class="kucuk">${esc(\u00E7("Taktik: {t}. {n}/{m} ki\u015Fi.",{t:futbolTaktikAdi(t.tactic),n:sayi((t.members??[]).length),m:sayi(r.team?.maxMembers??8)}))}</p>
        <div class="liste lig-uyeler">${uyeler}</div>
        ${davetler}
        ${ben?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Senin se\xE7imlerin")}</p>
          <div class="lig-ben">
            <label class="alan"><span>${\u00E7("Mevkin")}</span><select id="lig-mevki">${MAHALLE_POS.map(p=>`<option value="${p}" ${p===ben.pos?"selected":""}>${esc(futbolPosAdi(p))}</option>`).join("")}\
</select></label>
            <label class="onay"><input type="checkbox" id="lig-oto" ${ben.auto?"checked":""}><span>${esc(\u00E7("Lig ma\xE7lar\u0131nda kendili\u011Finden oyna (ma\xE7tan 2 dakika \xF6nce \u015Fehirdeysen kadroya girersin)"))}\
</span></label>
            <button class="dugme ikincil kucuk-d" id="lig-ben-kaydet" ${mesgul?"disabled":""}>${ikon("check")}${\u00E7("Kaydet")}</button>
          </div>`:""}
        <div class="oneri-dugmeler" style="margin-top:12px">
          ${t.captain?`<button class="dugme ikincil" id="lig-davet-et" ${mesgul||sayi_>=Number(r.team?.maxMembers??8)?"disabled":""}>${ikon("user-round-plus")}${\u00E7("Davet et")}</button>
            <button class="dugme ikincil" id="lig-duzenle" ${mesgul?"disabled":""}>${ikon("pencil")}${\u00E7("Ad, renk ve taktik")}</button>`:""}
          <button class="dugme sade" id="lig-ayril" ${mesgul?"disabled":""}>${ikon("door-open")}${\u00E7("Tak\u0131mdan ayr\u0131l")}</button>
        </div>
      </section>`}function kayitHtml(){const t=T(),r=R(),n=v.next;if(!n)return"";const g=t?.registration,benim=!!t&&t.region_id===v.region,takimlar=n.teams??[],bedel=Number(r.league?.entryCr??1e3);let dugme="";
benim&&g&&t.captain&&(dugme=g.registered?`<button class="dugme sade" id="lig-geri" ${mesgul?"disabled":""}>${ikon("undo-2")}${\u00E7("Kayd\u0131 geri al")}</button>`:`<button class="dugme altin" id="l\
ig-yaz" ${mesgul||takimlar.length>=Number(n.max??8)?"disabled":""}>${ikon("clipboard-check")}${esc(\u00E7("Lige yaz ({kr} kredi)",{kr:kr(bedel)}))}</button>`);const durum=t?benim?g?.registered?\u00E7(
"Tak\u0131m\u0131n yaz\u0131l\u0131. Lig kurulunca bedel \u015Fehrin hal\u0131 saha hesab\u0131na ge\xE7er; kurulmazsa d\xF6ner."):t.captain?Number(t.size??0)<Number(g?.min_members??r.team?.minMembers??
2)?\u00E7("Yaz\u0131lmak i\xE7in tak\u0131mda en az {n} ki\u015Fi olmal\u0131.",{n:sayi(g?.min_members??r.team?.minMembers??2)}):\u00E7("Tak\u0131m\u0131n\u0131 yazarsan bedel ({kr} kredi) hesab\u0131nda ayr\u0131l\u0131r; kay\u0131t k\
apanana dek geri alabilirsin.",{kr:kr(bedel)}):\u00E7("Tak\u0131m\u0131n\u0131 lige kaptan yazar."):\u00E7("Tak\u0131m\u0131n ba\u015Fka \u015Fehirde ({sehir}); bu \u015Fehrin ligine yaz\u0131lamaz.",
{sehir:bolgeAdi(t.region_id)}):\u00E7("Tak\u0131m\u0131n yok: tak\u0131m kurunca kaptan olarak yazabilirsin.");return`<section class="kart" id="lig-kayit" data-lig-yazili="${g?.registered?"1":"0"}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(\u00E7("{gun} ba\u015Flar \xB7 kay\u0131t {t} kapan\u0131r",{gun:gunAdi(n.deadline),t:saatYaz(n.deadline)}))}</p><h2 class="b2">${\u00E7("G\
elecek haftan\u0131n ligi")}</h2></div>
          <span class="cip">${esc(\u00E7("{n}/{m} tak\u0131m",{n:sayi(takimlar.length),m:sayi(n.max??8)}))}</span></div>
        ${takimlar.length?`<div class="cip-satir">${takimlar.map(x=>`<span class="cip kucuk-cip">${takimYazi(x)}</span>`).join("")}</div>`:`<p class="bos">${esc(\u00E7("Hen\xFCz yaz\u0131lan tak\u0131m yok."))}\
</p>`}
        <p class="kucuk" style="margin-top:8px">${esc(durum)}</p>
        ${dugme?`<div class="oneri-dugmeler" style="margin-top:8px">${dugme}</div>`:""}
      </section>`}function tabloHtml(l){const mine=l.mine;return`<div class="kulup-tablo-kap"><table class="kulup-tablo lig-tablo"><thead><tr><th>#</th><th>${\u00E7("Tak\u0131m")}</th><th title="${esc(
\u00E7("Oynanan"))}">${\u00E7("O")}</th>
        <th title="${esc(\u00E7("Galibiyet"))}">${\u00E7("G")}</th><th title="${esc(\u00E7("Beraberlik"))}">${\u00E7("B")}</th><th title="${esc(\u00E7("Ma\u011Flubiyet"))}">${\u00E7("M")}</th>
        <th title="${esc(\u00E7("Averaj"))}">${\u00E7("Av")}</th><th>${\u00E7("P")}</th></tr></thead><tbody>${(l.table??[]).map((x,i)=>`<tr${x.id===mine?' class="ben"':""} data-lig-tablo="${esc(x.id)}\
">
        <td>${sayi(x.rank??i+1)}</td><td><span class="kulup-tablo-ad">${takimYazi(x)}${l.champion?.id===x.id?` ${ikon("trophy")}`:""}</span></td>
        <td>${sayi(x.played)}</td><td>${sayi(x.won)}</td><td>${sayi(x.drawn)}</td><td>${sayi(x.lost)}</td><td>${sayi(Number(x.gf)-Number(x.ga))}</td><td><b>${sayi(x.points)}</b></td></tr>`).join("")}<\
/tbody></table></div>`}function fiksturHtml(l){return[...new Set((l.fixtures??[]).map(f=>f.round))].map(k=>{const f0=(l.fixtures??[]).filter(f=>f.round===k);return`<p class="ust-yazi" style="margin-to\
p:12px">${esc(\u00E7("{n}. tur \xB7 {gun}",{n:sayi(k),gun:gunAdi(f0[0].starts_at)}))}</p>
          <div class="liste">${f0.map(f=>{const sonuc=f.status==="played"||f.status==="forfeit"?`${sayi(f.score_home??0)}\u2013${sayi(f.score_away??0)}`:null,durum=f.status==="forfeit"?f.absent==="bot\
h"?\u00E7("iki tak\u0131m da gelmedi"):\u00E7("h\xFCkmen"):f.status==="void"?\u00E7("oynanmad\u0131"):f.status==="scheduled"&&f.phase?futbolEvreAdi(f.phase):null,benim=l.mine&&(f.home?.id===l.mine||f.
away?.id===l.mine),izle=f.match_id&&["locked","live","ended","finished","closing"].includes(f.phase);return`<div class="liste-satir${benim?" lig-benim":""}" data-lig-fikstur="${esc(f.id)}" data-durum=\
"${esc(f.status)}"><span class="liste-ikon ${f.phase==="live"?"mercan":""}">${ikon(f.status==="played"?"goal":f.status==="forfeit"?"flag":"calendar-days")}</span>
              <div><b>${takimYazi(f.home)} <span class="lig-skor">${esc(sonuc??"\u2013")}</span> ${takimYazi(f.away)}</b>
                <div class="alt">${esc([saatKisa(f.starts_at),f.pitch?\u00E7("saha {n}",{n:sayi(f.pitch)}):null,durum].filter(Boolean).join(" \xB7 "))}</div></div>
              ${izle?`<button class="dugme sade kucuk-d" data-lig-izle="${esc(f.match_id)}">${ikon("eye")}${\u00E7("\u0130zle")}</button>`:"<span></span>"}</div>`}).join("")}</div>`}).join("")}function ligHtml(){
const l=v.league;return!l||l.status==="registration"?`<section class="kart" id="lig-bu-hafta"><div class="kart-bas"><div><p class="ust-yazi">${esc(v.region?bolgeAdi(v.region):"")}</p><h2 class="b2">${\u00E7(
"Bu haftan\u0131n ligi")}</h2></div><span class="ik-kutu">${ikon("trophy")}</span></div>
          <p class="bos">${esc(\u00E7("Bu hafta bu \u015Fehirde lig yok. Gelecek haftan\u0131n ligine en az {n} tak\u0131m yaz\u0131l\u0131rsa lig Pazartesi kurulur.",{n:sayi(R().league?.minTeams??2)}))}\
</p></section>`:l.status==="cancelled"?`<section class="kart" id="lig-bu-hafta"><div class="kart-bas"><div><p class="ust-yazi">${esc(bolgeAdi(l.region_id))}</p><h2 class="b2">${\u00E7("Bu haftan\u0131n lig\
i")}</h2></div><span class="cip">${\u00E7("Kurulmad\u0131")}</span></div>
          <p class="kucuk">${esc(\u00E7("Yeterli tak\u0131m yaz\u0131lmad\u0131\u011F\u0131 i\xE7in bu hafta lig kurulmad\u0131; kat\u0131l\u0131m bedelleri d\xF6nd\xFC."))}</p></section>`:`<section c\
lass="kart" id="lig-bu-hafta" data-lig-durum="${esc(l.status)}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(\u00E7("{sehir} \xB7 {gun} haftas\u0131",{sehir:bolgeAdi(l.region_id),gun:gunAdi(l.week_start)}))}</p><h2 class="b2">${\u00E7("Bu haftan\u0131n \
ligi")}</h2></div>
          <span class="cip ${l.status==="finished"?"altin":"yesil"}">${esc(l.status==="finished"?\u00E7("Bitti"):\u00E7("S\xFCr\xFCyor"))}</span></div>
        ${l.status==="finished"?`<div class="bilgi-kutusu" data-lig-sampiyon="${esc(l.champion?.id??"")}">${ikon("trophy")}<span>${esc(l.champion?\u00E7("\u015Eampiyon: {takim}!",{takim:mahalleTakimAdi(
l.champion)}):\u00E7("Lig bitti; \u015Fampiyon \xE7\u0131kmad\u0131 (hi\xE7 puan al\u0131nmad\u0131)."))}</span></div>`:""}
        ${tabloHtml(l)}
        ${fiksturHtml(l)}
      </section>`}function gecenHtml(){const l=v.last;return l?`<section class="kart" id="lig-gecen"><div class="kart-bas"><div><p class="ust-yazi">${esc(\u00E7("{gun} haftas\u0131",{gun:gunAdi(l.week_start)}))}\
</p><h2 class="b2">${\u00E7("Ge\xE7en haftan\u0131n \u015Fampiyonu")}</h2></div><span class="ik-kutu">${ikon("trophy")}</span></div>
        <p>${l.champion?`<b>${takimYazi(l.champion)}</b>`:esc(\u00E7("\u015Eampiyon \xE7\u0131kmad\u0131."))}</p>
        ${tabloHtml(l)}</section>`:""}function takimlarHtml(){const l=v.teams??[],benim=T()?.id;return`<section class="kart" id="lig-takimlar"><div class="kart-bas"><div><p class="ust-yazi">${esc(v.region?
bolgeAdi(v.region):"")}</p><h2 class="b2">${\u00E7("\u015Eehrin tak\u0131mlar\u0131")}</h2></div><span class="ik-kutu">${ikon("users-round")}</span></div>
        ${l.length?`<div class="liste">${l.map(x=>`<div class="liste-satir" data-lig-sehir-takim="${esc(x.id)}"><span class="liste-ikon">${renkKutusu(x.color)}</span>
          <div><b>${esc(mahalleTakimAdi(x))}</b><div class="alt">${esc([\u00E7("{n} \xFCye",{n:sayi(x.members??0)}),Number(x.titles)?\u00E7("{n} \u015Fampiyonluk",{n:sayi(x.titles)}):null,x.registered?
\u00E7("gelecek haftan\u0131n liginde"):null].filter(Boolean).join(" \xB7 "))}</div></div>
          ${x.id!==benim&&x.name?`<button class="dugme sade kucuk-d" type="button" data-lig-rapor="${esc(x.id)}" data-ad="${esc(x.name)}" aria-label="${esc(\u00E7("Tak\u0131m\u0131n ad\u0131n\u0131 raporla"))}\
">${ikon("flag")}${\u00E7("Raporla")}</button>`:"<span></span>"}</div>`).join("")}</div>`:`<p class="bos">${esc(\u00E7("Bu \u015Fehirde hen\xFCz mahalle tak\u0131m\u0131 yok."))}</p>`}
      </section>`}function kurallarHtml(){const r=R(),L=r.league??{},Tm=r.team??{},maddeler=[["shirt",\u00E7("Tak\u0131m\u0131 \u015Fehirdeki bir oyuncu kurar (ad {a}\u2013{b} harf, renk) ve kaptan olur. Kaptan arkada\u015Fla\
r\u0131n\u0131 ve tan\u0131d\u0131klar\u0131n\u0131 davet eder; davet {s} saat ge\xE7erli. Bir ki\u015Fi tek tak\u0131mda; tak\u0131mda en \xE7ok {n} ki\u015Fi (bekleyen davetler dahil).",{a:sayi(Tm.name?.
min??3),b:sayi(Tm.name?.max??24),s:sayi(Tm.inviteHours??72),n:sayi(Tm.maxMembers??8)})],["clipboard-check",\u00E7("Lig \u015Fehirde haftal\u0131kt\u0131r. Kaptan tak\u0131m\u0131n\u0131 gelecek haftan\u0131n ligine yazar (en az {m} \xFCye\
; bedel {kr} kredi, \u015Fehrin hal\u0131 saha hesab\u0131na). Pazartesi en az {t} tak\u0131m varsa lig kurulur (en \xE7ok {x}); yoksa bedeller d\xF6ner.",{m:sayi(Tm.minMembers??2),kr:kr(L.entryCr??1e3),
t:sayi(L.minTeams??2),x:sayi(L.maxTeams??8)})],["calendar-days",\u00E7("Her g\xFCn bir tur: ma\xE7lar \xFClkenin saatiyle {h}.00'de \u015Fehrin hal\u0131 sahas\u0131nda (saha doluysa sonraki \xE7eyrek saatte). Tak\u0131m azsa devrel\
er tekrarlan\u0131r (en \xE7ok {n} tur).",{h:sayi(L.kickoffHour??19),n:sayi(L.maxRounds??7)})],["users-round",\u00E7('Ma\xE7tan 2 dakika \xF6nce \u015Fehirde olan ve "kendili\u011Finden oyna" diyen \xFCyeler kadroya gir\
er (\xF6nce ma\xE7a kendisi yaz\u0131lanlar); "Bu ma\xE7ta yokum" diyen girmez. Bo\u015F yerlere mahalleden yedek. Takti\u011Fi kaptan se\xE7er.')],["flag",\u00E7("Bir tak\u0131mdan \u015Fehirde kimse yoksa h\xFCk\
men: gelen tak\u0131m {g}\u20130 kazan\u0131r; ikisi de yoksa ikisi de yenik say\u0131l\u0131r.",{g:sayi(L.forfeitGoals??3)})],["trophy",\u00E7("Galibiyet {w}, beraberlik {d} puan; s\u0131ra puan, averaj, \
at\u0131lan gol. Son ma\xE7tan sonra lider \u015Fampiyondur: o ligde tak\u0131m\u0131nda oynayanlara Mahalle \u015Eampiyonu madalyas\u0131 ve ya\u015Fam g\xFCnl\xFC\u011F\xFCnde yer. Para \xF6d\xFCl\xFC ve bahis yok.",
{w:sayi(L.points?.win??3),d:sayi(L.points?.draw??1)})],["goal",\u00E7("Lig ma\xE7lar\u0131 hal\u0131 sahan\u0131n \xFCcretsiz ma\xE7lar\u0131d\u0131r: futbol becerin, saya\xE7lar\u0131n ve madalyalar\u0131n hal\u0131 sahadaki gibi i\u015Fler.")]];
return`<section class="kart" id="lig-kurallar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kurallar")}</p><h2 class="b2">${\u00E7("Mahalle ligi nas\u0131l i\u015Fler?")}</h2></div><span c\
lass="ik-kutu">${ikon("book-open")}</span></div>
        <div class="liste">${maddeler.map(([ik,x])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(x)}</div></div><span></span></div>`).
join("")}</div>
      </section>`}const renkSecimi=secili=>`<fieldset class="alan"><legend>${\u00E7("Tak\u0131m\u0131n rengi")}</legend><div class="renk-sec">${(R().colors??KULUP_RENK_VARSAYILAN).map((c,i)=>`<label c\
lass="birlik-renk">
        <input type="radio" name="renk" value="${esc(c)}" ${(secili?c===secili:i===0)?"checked":""}><span style="--renk:${esc(c)}" aria-label="${esc(\u00E7("Renk {n}",{n:i+1}))}"></span></label>`).join(
"")}</div></fieldset>`;function kurPencere(){const r=R();pencereForm({ust:\u00E7("Mahalle tak\u0131m\u0131"),baslik:\u00E7("Tak\u0131m kur"),onayAd:\u00E7("Kur"),onayIkon:"flag",govde:`<p class="acikl\
ama">${esc(\u00E7("Tak\u0131m\u0131n {sehir} \u015Fehrinde kurulur; kaptan sen olursun.",{sehir:bolgeAdi(v.here)}))}</p>
          <label class="alan"><span>${\u00E7("Tak\u0131m\u0131n ad\u0131")}</span><input name="ad" maxlength="${Number(r.team?.name?.max??24)}" required autocomplete="off"></label>
          ${renkSecimi(null)}
          <label class="alan"><span>${\u00E7("Mevkin")}</span><select name="mevki">${MAHALLE_POS.map(p=>`<option value="${p}" ${p==="orta"?"selected":""}>${esc(futbolPosAdi(p))}</option>`).join("")}</\
select></label>
          <p class="kucuk">${esc(\u00E7("Ad topluluk kurallar\u0131na uymal\u0131; ger\xE7ek spor kul\xFCplerinin adlar\u0131 kullan\u0131lamaz."))}</p>`,is:async d=>{const ad=String(d.get("ad")??"").
trim().replace(/\s+/g," ");if([...ad].length<Number(r.team?.name?.min??3)||[...ad].length>Number(r.team?.name?.max??24))throw new Error(\u00E7("Ad {min}\u2013{max} karakter olmal\u0131.",{min:Number(r.
team?.name?.min??3),max:Number(r.team?.name?.max??24)}));await Sunucu.yap("football_team_create",{p_name:ad,p_color:String(d.get("renk")??""),p_pos:String(d.get("mevki")??"orta")}),tost(\u00E7("{takim\
} kuruldu; kaptans\u0131n. \u015Eimdi arkada\u015Flar\u0131n\u0131 davet et.",{takim:ad}),"flag"),bolge=null,await yukle(),kapandi||ciz()}})}function duzenlePencere(){const t=T();pencereForm({ust:mahalleTakimAdi(
t),baslik:\u00E7("Ad, renk ve taktik"),onayAd:\u00E7("Kaydet"),onayIkon:"check",govde:`<label class="alan"><span>${\u00E7("Tak\u0131m\u0131n ad\u0131")}</span><input name="ad" maxlength="${Number(R().
team?.name?.max??24)}" value="${esc(t.name??"")}" autocomplete="off"></label>
          ${renkSecimi(t.color)}
          <label class="alan"><span>${\u00E7("Taktik")}</span><select name="taktik">${["dengeli","hucum","savunma"].map(x=>`<option value="${x}" ${x===t.tactic?"selected":""}>${esc(futbolTaktikAdi(x))}\
</option>`).join("")}</select></label>
          <p class="kucuk">${esc(\u00E7("Taktik tak\u0131m\u0131n b\xFCt\xFCn a\xE7\u0131k lig ma\xE7lar\u0131na yaz\u0131l\u0131r; kilitten \xF6nce ma\xE7\u0131n kart\u0131ndan da de\u011Fi\u015Fir."))}\
</p>`,is:async d=>{const ad=String(d.get("ad")??"").trim().replace(/\s+/g," ");await Sunucu.yap("football_team_set",{p_name:ad&&ad!==t.name?ad:null,p_color:String(d.get("renk")??"")||null,p_tactic:String(
d.get("taktik")??"")||null}),tost(\u00E7("Tak\u0131m\u0131n g\xFCncellendi."),"check"),await yukle(),kapandi||ciz()}})}async function davetPencere(){let liste;try{liste=await Sunucu.cagir("football_te\
am_invitable")}catch(e){tost(hataMetni(e),"circle-alert");return}if(kapandi)return;const kalan=Math.max(0,Number(liste?.max??8)-Number(liste?.size??0)),kisiler=(liste?.people??[]).filter(x=>!x.in_team);
pencereForm({ust:mahalleTakimAdi(T()),baslik:\u00E7("Tak\u0131m\u0131na davet et"),onayAd:\u00E7("Davet et"),onayIkon:"user-round-plus",govde:kisiler.length?`<div class="futbol-adaylar">${kisiler.map(
x=>`<div class="futbol-aday"><label class="futbol-aday-kim"><input type="checkbox" name="davetli" value="${esc(x.character_id)}" ${x.invited?"checked disabled":""}>
            <span><b>${esc(x.name)}</b><span class="kucuk">${ikon(BAG_IK[x.tier]??"users-round")} ${esc(BAG_TUR[x.tier]??"")}${x.invited?" \xB7 "+esc(\u00E7("davet edildi")):""}</span></span></label><\
/div>`).join("")}</div>
            <p class="kucuk">${esc(\u00E7("{n} ki\u015Fi daha davet edebilirsin. Davet {s} saat ge\xE7erli.",{n:sayi(kalan),s:sayi(R().team?.inviteHours??72)}))}</p>`:`<p class="bos">${esc(\u00E7("Dav\
et edebilece\u011Fin kimse yok: arkada\u015Flar\u0131n ya da tan\u0131d\u0131klar\u0131n ba\u015Fka tak\u0131mlarda ya da hen\xFCz tan\u0131\u015Fmad\u0131n."))}</p>`,is:async(d,f)=>{const secilen=$$(
"input[name=davetli]:checked:not([disabled])",f).map(x=>x.value);if(!secilen.length)throw new Error(\u00E7("Davet edece\u011Fin ki\u015Fiyi se\xE7."));if(secilen.length>kalan)throw new Error(\u00E7("E\
n \xE7ok {n} ki\u015Fi davet edebilirsin.",{n:kalan}));for(const id of secilen)await Sunucu.yap("football_team_invite",{p_character:id});tost(\u00E7("{n} ki\u015Fi davet edildi.",{n:secilen.length}),"\
user-round-plus"),await yukle(),kapandi||ciz()}})}function onay(baslik,metin,ad,sinif,ik,is){pencere({ust:mahalleTakimAdi(T()),baslik,govde:`<p class="aciklama">${esc(metin)}</p>`,dugmeler:[{ad:\u00E7(
"Vazge\xE7")},{ad,sinif,ikon:ik,is}]})}function ciz(){if(kapandi)return;if(hata&&!v){kap.innerHTML=`<div class="sayfa"><div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(hata))}</sp\
an></div>
          <button class="dugme ikincil" style="margin-top:14px" id="lig-yeniden">${\u00E7("Yeniden dene")}</button></div>`,$("#lig-yeniden",kap).onclick=()=>tazele();return}const t=T(),sehirler=[...new Set(
[t?.region_id,v.here].filter(Boolean))];kap.innerHTML=`<div class="sayfa" data-lig-bolge="${esc(v.region??"")}">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${esc(v.region?\u00E7("{sehir} mahalle ligi",{sehir:bolgeAdi(v.region)}):\u00E7("Mahalle ligi"))}</h1\
>
          <p class="aciklama">${\u00E7("Mahalle tak\u0131m\u0131n\u0131 kur ya da bir tak\u0131ma kat\u0131l; tak\u0131mlar her hafta \u015Fehrin liginde hal\u0131 sahada kar\u015F\u0131la\u015F\u0131r.")}\
</p></div>
          <div class="oneri-dugmeler"><button class="dugme sade" data-git="sehir/futbol">${ikon("goal")}${\u00E7("Hal\u0131 saha")}</button></div></div>
        ${sehirler.length>1?`<div class="cip-satir" role="group" aria-label="${esc(\u00E7("\u015Eehir"))}">${sehirler.map(x=>`<button type="button" class="cip-dugme${x===v.region?" secili":""}" data-l\
ig-bolge-sec="${esc(x)}" aria-pressed="${x===v.region}">${ikon(x===t?.region_id?"shirt":"map-pin")}${esc(bolgeAdi(x))}</button>`).join("")}</div>`:""}
        <div class="izgara iki" style="margin-top:16px">
          <div class="yigin">${davetlerHtml()}${takimHtml()}${kayitHtml()}</div>
          <div class="yigin">${ligHtml()}${gecenHtml()}${takimlarHtml()}${kurallarHtml()}</div>
        </div></div>`,bagla()}function bagla(){for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-lig-kisi]",kap))b.onclick=()=>profilAc(b.dataset.ligKisi);
for(const b of $$("[data-lig-bolge-sec]",kap))b.onclick=async()=>{bolge=b.dataset.ligBolgeSec,await yukle(),kapandi||ciz()};for(const b of $$("[data-lig-davet-katil]",kap))b.onclick=()=>yap("football_\
team_answer",{p_team:b.dataset.ligDavetKatil,p_accept:!0},\u00E7("Tak\u0131ma kat\u0131ld\u0131n."),"check");for(const b of $$("[data-lig-davet-red]",kap))b.onclick=()=>yap("football_team_answer",{p_team:b.
dataset.ligDavetRed,p_accept:!1},\u00E7("Daveti geri \xE7evirdin; kaptana haber gitti."),"x");for(const b of $$("[data-lig-izle]",kap))b.onclick=()=>{futbolIzlenecek=b.dataset.ligIzle,Kabuk.git("sehir\
/futbol")};for(const b of $$("[data-lig-rapor]",kap))b.onclick=()=>raporla({tur:"football_team",ref:b.dataset.ligRapor,ad:b.dataset.ad});for(const b of $$("[data-lig-cikar]",kap))b.onclick=()=>onay(\u00E7(
"Tak\u0131mdan \xE7\u0131kar"),\u00E7("{ad} tak\u0131mdan \xE7\u0131kar; a\xE7\u0131k lig ma\xE7lar\u0131ndaki kayd\u0131 da d\xFC\u015Fer. Kendisine haber gider.",{ad:b.dataset.ad||\u00E7("Bu ki\u015Fi")}),
\u00E7("\xC7\u0131kar"),"mercan","user-round-minus",()=>yap("football_team_kick",{p_character:b.dataset.ligCikar},\u00E7("Tak\u0131mdan \xE7\u0131kar\u0131ld\u0131."),"user-round-minus"));for(const b of $$(
"[data-lig-kaptan]",kap))b.onclick=()=>onay(\u00E7("Kaptanl\u0131\u011F\u0131 devret"),\u00E7("{ad} tak\u0131m\u0131n kaptan\u0131 olur: davet eder, lige yazar, takti\u011Fi se\xE7er. Sen \xFCye olarak kal\u0131rs\u0131n.",
{ad:b.dataset.ad||\u00E7("Bu ki\u015Fi")}),\u00E7("Devret"),"altin","crown",()=>yap("football_team_captain",{p_character:b.dataset.ligKaptan},\u00E7("Kaptanl\u0131\u011F\u0131 devrettin."),"crown"));const k=$(
"#lig-kur",kap);k&&(k.onclick=()=>kurPencere());const de=$("#lig-davet-et",kap);de&&(de.onclick=()=>davetPencere());const du=$("#lig-duzenle",kap);du&&(du.onclick=()=>duzenlePencere());const bk=$("#li\
g-ben-kaydet",kap);bk&&(bk.onclick=()=>yap("football_team_me",{p_pos:$("#lig-mevki",kap).value,p_auto:$("#lig-oto",kap).checked},\u00E7("Se\xE7imlerin kaydedildi."),"check"));const ay=$("#lig-ayril",kap);
ay&&(ay.onclick=()=>{const t=T(),tek=(t.members??[]).length<=1;onay(\u00E7("Tak\u0131mdan ayr\u0131l"),tek?\u00E7("Tak\u0131mda tek ki\u015Fisin: ayr\u0131l\u0131rsan tak\u0131m da\u011F\u0131l\u0131r (gelecek haftan\u0131n kayd\u0131 varsa geri al\u0131n\
\u0131r, bedel d\xF6ner)."):t.captain?\u00E7("Kaptans\u0131n: ayr\u0131l\u0131rsan kaptanl\u0131k tak\u0131m\u0131n en eski \xFCyesine ge\xE7er. A\xE7\u0131k lig ma\xE7lar\u0131ndaki kayd\u0131n d\xFC\u015Fer."):
\u00E7("A\xE7\u0131k lig ma\xE7lar\u0131ndaki kayd\u0131n d\xFC\u015Fer; yeniden kat\u0131lmak i\xE7in davet gerekir."),\u00E7("Ayr\u0131l"),"mercan","door-open",()=>yap("football_team_leave",{},\u00E7(
"Tak\u0131mdan ayr\u0131ld\u0131n."),"door-open"))});const yz=$("#lig-yaz",kap);yz&&(yz.onclick=()=>yap("football_league_register",{p_register:!0},\u00E7("Tak\u0131m\u0131n gelecek haftan\u0131n ligine yaz\u0131ld\u0131; bede\
l hesab\u0131nda ayr\u0131ld\u0131."),"clipboard-check"));const gr=$("#lig-geri",kap);gr&&(gr.onclick=()=>yap("football_league_register",{p_register:!1},\u00E7("Kay\u0131t geri al\u0131nd\u0131; bedel serbest."),
"undo-2"))}const tazele=tazeleyici(async()=>{await yukle(),!kapandi&&!mesgul&&!document.querySelector(".perde")&&ciz()});if(await yukle(),!kap.isConnected)return()=>{};ciz(),zaman=setInterval(()=>{document.
hidden||tazele()},6e4);const b1=Durum.dinle("olay",({olay})=>{/^football\./.test(olay)&&tazele()});return()=>{kapandi=!0,clearInterval(zaman),b1()}}}),Parcalar.tamam("ek_98zzg_mahalle_ligi");
