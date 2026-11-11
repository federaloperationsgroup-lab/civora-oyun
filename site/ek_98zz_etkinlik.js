// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98zz_etkinlik.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/etkinlikler",{async ac(kap){let v=null,hata=null,detay=null,secili=null,kapandi=!1,mesgul=!1,saatFarki=0,bolge=null,ilkBolge=null,gorunus;const alan=EtkinlikAlani.ac();alan.dinle("\
sec",ad=>{$(ad==="program"?"#etkinlik-program":"#etkinlik-detay",kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})});const ben=()=>Durum.v.ozet?.character??{},R=()=>v?.rules??
etkinlikKurali()??{},simdi=()=>Date.now()+saatFarki,program=()=>v?.program??[],burada=(e=null)=>!!v&&v.here===(e?.region_id??v.region_id);async function yukle(){try{const[x,bak]=await Promise.all([Sunucu.
cagir("cityevents",{p_region:bolge??v?.region_id??null}),gorunus===void 0?Sunucu.cagir("my_look").catch(()=>null):null,Durum.kurallar().catch(()=>null)]);v=x,ilkBolge??=v.region_id??null,gorunus===void 0&&
(gorunus=bak?.look??null),hata=null;const hepsi=[...program(),...v.recent??[]],moda=(v.fashion_week?.shows??[]).map(x2=>x2.event_id);(!secili||!(hepsi.some(e=>e.id===secili)||moda.includes(secili)))&&
(secili=(program().find(e=>e.status==="live")??program().find(e=>e.status==="scheduled")??(v.recent??[])[0]??program()[0])?.id??null),await detayYukle()}catch(e){hata=e}}async function detayYukle(){if(!secili){
detay=null;return}try{detay=await Sunucu.cagir("cityevent_get",{p_event:secili}),saatFarki=detay?.server_time?Date.parse(detay.server_time)-Date.now():saatFarki}catch{detay=null}}function modaHtml(){const w=v.
fashion_week,f=w?.rules??modaKurali(R());if(!w||!f)return"";const gosteriler=w.shows??[],basladi=gosteriler.some(x=>x.status==="live"||x.status==="finished"),durum=w.status==="finished"?\u00E7("Bitti"):
basladi?\u00E7("S\xFCr\xFCyor"):\u00E7("Takvimde"),sehir=x=>{const m=x.mine,alt=[];x.status==="scheduled"&&alt.push(\u00E7("{n}/{m} kay\u0131tl\u0131",{n:sayi(x.count??0),m:sayi(w.max??20)})),Number(x.
pool_cr)>0&&alt.push(\u00E7("\xD6d\xFCl havuzu {kr} kredi",{kr:kr(x.pool_cr)})),x.status==="finished"&&x.winner?.name&&alt.push(\u00E7("Birinci: {ad}",{ad:x.winner.name})),x.status==="cancelled"&&alt.
push(ETKINLIK_IPTAL[x.cancel_reason]??"");const ben3=m?m.status==="finished"&&m.place?\u00E7("{n}. oldun \xB7 {p} puan",{n:sayi(m.place),p:sayi(m.points??modaPuani(m.place,f))}):m.status==="dns"?\u00E7(
"Gelmedin"):etkinlikKayitDurum(m,"contest"):"",renk=x.status==="live"?"deniz":x.status==="cancelled"?"mercan":x.status==="finished"?"":"altin";return`<button type="button" class="liste-satir etkinlik-\
satir moda-sehir${x.region_id===v.region_id?" secili":""}" data-moda-sehir="${esc(x.region_id)}" data-moda-etkinlik="${esc(x.event_id)}"
            data-durum="${esc(x.status)}" aria-current="${x.region_id===v.region_id?"true":"false"}">
          <span class="liste-ikon ${x.region_id===v.here?"yesil":""}">${ikon(x.region_id===v.here?"map-pin":"shirt")}</span>
          <div><span class="tur">${esc(saatYaz(x.starts_at))}</span><b>${esc(bolgeAdi(x.region_id))}</b>
            <div class="alt">${esc(alt.filter(Boolean).join(" \xB7 "))}</div></div>
          <span class="etkinlik-satir-sag"><span class="cip ${renk}">${esc(ETKINLIK_DURUM[x.status]??x.status)}</span>${ben3?`<span class="cip yesil kucuk-cip" data-moda-ben>${ikon("check")}${esc(ben3)}\
</span>`:""}</span>
        </button>`},l=w.standings??[],ben2=w.mine,siraSatir=x=>`<li class="moda-sira-satir${x.character_id===ben2?.character_id?" ben":""}" data-moda-sira="${sayi(x.rank)}">
          <span class="moda-sira-no">${Number(x.rank)<=3?ikon(Number(x.rank)===1?"trophy":"medal"):esc(sayi(x.rank))}</span>
          <b>${esc(x.name??\u00E7("Silinmi\u015F hesap"))}</b><small>${esc(\u00E7("{p} puan \xB7 {n} defile",{p:sayi(x.points),n:sayi(x.shows)}))}</small></li>`,siralama=l.length?`<ol class="moda-sira\
" id="moda-sira">${l.map(siraSatir).join("")}</ol>
          ${ben2&&!l.some(x=>x.character_id===ben2.character_id)?`<p class="kucuk" data-moda-benim>${esc(\u00E7("Sen {n}. s\u0131radas\u0131n: {p} puan, {d} defile.",{n:sayi(ben2.rank),p:sayi(ben2.points),
d:sayi(ben2.shows)}))}</p>`:""}`:`<p class="kucuk">${esc(w.status==="finished"?\u00E7("Bu hafta defileler yap\u0131lamad\u0131; s\u0131ralama yok."):\u00E7("S\u0131ralama ilk defile bitince ba\u015Flar."))}\
</p>`,yildiz=w.status==="finished"&&l[0]?`<div class="bilgi-kutusu moda-yildiz" data-moda-yildiz>${ikon("sparkles")}<span>${esc(\u00E7("Haftan\u0131n y\u0131ld\u0131z\u0131: {ad} ({p} puan).",{ad:l[0].
name??\u00E7("Silinmi\u015F hesap"),p:sayi(l[0].points)}))}</span></div>`:"";return`<section class="kart moda-hafta" id="etkinlik-moda" data-moda-hafta="${esc(w.id)}" data-durum="${esc(w.status)}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(modaHaftasiAraligi(w.week_start))} \xB7 ${esc(\u00E7("{n} \u015Fehir",{n:sayi(w.hosts??gosteriler.length)}))}</p>
          <h2 class="b2">${esc(modaHaftasiAdi(w.no))}</h2></div><span class="cip ${w.status==="finished"?"":basladi?"deniz":"altin"}" data-moda-durum>${esc(durum)}</span></div>
        <p class="kucuk">${esc(\u00E7("D\xF6rt haftada bir uyan\u0131k ba\u015Fkentlerde moda haftas\u0131: her \u015Fehirde bir defile, \xFClkenin saatiyle {s}:00. \u015Eehre dokun, program\u0131na ge\xE7; ba\u015Flarken o \u015Fehirde ol.",
{s:sayi(f.hour??20)}))} ${esc(modaKuralYazisi(f))}</p>
        ${yildiz}
        <div class="yigin moda-sehirler" style="gap:6px">${gosteriler.map(sehir).join("")}</div>
        <p class="ust-yazi" style="margin-top:12px">${esc(w.status==="finished"?\u00E7("Haftan\u0131n s\u0131ralamas\u0131"):\u00E7("Haftan\u0131n s\u0131ralamas\u0131 (biten defilelerden)"))}</p>
        ${siralama}
      </section>`}function satirHtml(e){const r=R(),kume=etkinlikKume(e.kind,r),m=e.mine,durum=e.status==="scheduled"&&Date.parse(e.starts_at)<=simdi()?\u00E7("Ba\u015Fl\u0131yor"):ETKINLIK_DURUM[e.status]??
e.status,renk=e.status==="live"?"deniz":e.status==="cancelled"?"mercan":e.status==="finished"?"":"altin",alt=[];return kume!=="senlik"&&alt.push(Number(e.pool_cr)>0?\u00E7("\xD6d\xFCl havuzu {kr} kredi",
{kr:kr(e.pool_cr)}):\u00E7("\xD6d\xFCls\xFCz")),kume!=="senlik"&&e.status==="scheduled"&&alt.push(\u00E7("{n}/{m} kay\u0131tl\u0131",{n:sayi(e.count??0),m:sayi(e.max??0)})),Number(e.team_count)>0&&alt.
push(\u00E7("{n} tak\u0131m",{n:sayi(e.team_count)})),etkinlikSponsorAdlari(e).length&&alt.push(\u00E7("{n} sponsor",{n:sayi(etkinlikSponsorAdlari(e).length)})),e.status==="finished"&&(e.winners??[])[0]?.
name&&alt.push(\u00E7("Birinci: {ad}",{ad:e.winners[0].name})),e.status==="cancelled"&&alt.push(ETKINLIK_IPTAL[e.cancel_reason]??""),`<button type="button" class="liste-satir etkinlik-satir${e.id===secili?
" secili":""}" data-etkinlik="${esc(e.id)}" data-tur="${esc(e.kind)}" data-durum="${esc(e.status)}"
          aria-pressed="${e.id===secili}">
        <span class="liste-ikon ${e.status==="live"?"deniz":e.source==="mayor"||e.source==="fashionweek"?"altin":""}">${ikon(etkinlikIkon(e.kind))}</span>
        <div><span class="tur">${esc(saatYaz(e.starts_at))} \xB7 ${esc(etkinlikKaynak(e))}</span>
          <b>${esc(etkinlikAdi(e.kind))}</b>
          <div class="alt">${esc(alt.filter(Boolean).join(" \xB7 "))}</div></div>
        <span class="etkinlik-satir-sag"><span class="cip ${renk}">${esc(durum)}</span>${m?`<span class="cip yesil kucuk-cip" data-etkinlik-ben>${ikon("check")}${esc(etkinlikKayitDurum(m,kume))}</span\
>`:""}</span>
      </button>`}function davetlerHtml(){const l=v.mine?.invites??[];return l.length?`<div class="yigin etkinlik-davetler" id="etkinlik-davetler" style="gap:6px;margin-bottom:10px">${l.map(x=>`<div cl\
ass="bilgi-kutusu" data-takim-davet="${esc(x.team_id)}">
          ${ikon("user-round-plus")}<span>${esc(\u00E7("{kaptan} seni {etkinlik} tak\u0131m\u0131na \xE7a\u011F\u0131rd\u0131 ({saat}; {n}/{m} ki\u015Fi).",{kaptan:x.captain??\u00E7("Silinmi\u015F hesap"),
etkinlik:etkinlikAdi(x.kind),saat:saatYaz(x.starts_at),n:sayi(x.size??0),m:sayi(etkinlikTakimMax(x.kind,R()))}))}
          <span class="etkinlik-davet-dugmeler"><button class="dugme altin kucuk-d" type="button" data-takim-kabul="${esc(x.team_id)}" ${mesgul?"disabled":""}>${ikon("check")}${\u00E7("Kat\u0131l")}</\
button>
            <button class="dugme sade kucuk-d" type="button" data-takim-ret="${esc(x.team_id)}" ${mesgul?"disabled":""}>${ikon("x")}${\u00E7("Reddet")}</button></span></span></div>`).join("")}</div>`:
""}function programHtml(){const p=program();return`<section class="kart" id="etkinlik-program">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Bu hafta")} \xB7 ${esc(bolgeAdi(v.region_id))}</p><h2 class="b2">${\u00E7("Etkinlik program\u0131")}</h2></div>
          <span class="ik-kutu">${ikon("calendar-days")}</span></div>
        ${davetlerHtml()}
        ${p.length?`<div class="yigin etkinlik-liste" style="gap:6px">${p.map(satirHtml).join("")}</div>`:`<p class="bos">${v.is_capital?\u00E7("\xD6n\xFCm\xFCzdeki g\xFCnlerde etkinlik yok."):\u00E7(
"Bu \u015Fehir uyan\u0131k bir \xFClkenin ba\u015Fkenti de\u011Fil; etkinlikler ba\u015Fkentlerde yap\u0131l\u0131r.")}</p>`}
        <p class="kucuk" style="margin-top:8px">${esc(\u00E7("Her hafta \xC7ar\u015Famba {s}:00 haftan\u0131n yar\u0131\u015Fmas\u0131, Cumartesi {s}:00 \u015Fehir \u015Fenli\u011Fi (\xFClkenin saatiyle). Belediye ba\u015Fkan\u0131 haftada {n} etkinlik dah\
a d\xFCzenleyebilir.",{s:sayi((R().tradition??[])[0]?.hour??20),n:sayi(R().mayor?.perWeek??2)}))}${v.mayor?` <button class="baglanti" type="button" data-git="sehir/belediye">${\u00E7("Belediye'den d\xFCz\
enle")}</button>`:""}</p>
      </section>`}function aciklama(e){const r=R(),kume=etkinlikKume(e.kind,r);if(kume==="senlik")return \u00E7("\u015Eenlik {dk} dakika s\xFCrer. S\xFCre i\xE7inde \u015Fehirdeysen bir kez kat\u0131l\u0131rs\u0131n: keyfin artar, \u015Een\
lik madalyana say\u0131l\u0131r; ayn\u0131 \u015Fenli\u011Fe kat\u0131lan arkada\u015Flar\u0131nla yak\u0131nla\u015F\u0131rs\u0131n.",{dk:sayi(r.senlik?.minutes??120)});if(kume==="race"){const k=r.race?.[e.
kind]??{};if(e.kind==="ralli"&&r.rally){const y=r.rally;return \u00E7("Ralliye garaj\u0131ndaki motosiklet ya da otomobille kat\u0131l\u0131rs\u0131n; haz\u0131rl\u0131k yok. Yeni bir ara\xE7 {c} dakikaya dek kazand\u0131r\u0131r (a\u015F\u0131nd\u0131k\xE7a az\
), lojistik becerinin her seviyesi {b} saniye; \u015Fans \xB1{s} dakika. Yar\u0131\u015F {dk} dakika canl\u0131 izlenir.",{c:sayi(Math.round(Number(y.condSec??600)/60)),b:sayi(y.skillSec??6),s:sayi(Math.
round((k.luckSec??300)/60)),dk:sayi(k.liveMin??30)})+" "+\u00E7("Ralli arac\u0131n\u0131 {w} birim a\u015F\u0131nd\u0131r\u0131r; \xF6mr\xFC dolan ara\xE7 hurdaya ayr\u0131l\u0131r.",{w:sayi(Durum.v.kurallar?.
data?.vehicle?.rallyWear??10)})}const metin=\u00E7("Kay\u0131tl\u0131ysan yar\u0131\u015Fa dek g\xFCnde bir haz\u0131rl\u0131k yapars\u0131n (en \xE7ok {n}; her biri {h} dakika kazand\u0131r\u0131r). Keyfin iyiyse {a}, yerindeyse {b} dakika daha h\u0131zl\u0131\
s\u0131n; \u015Fans \xB1{s} dakika. Yar\u0131\u015F {dk} dakika canl\u0131 izlenir; yar\u0131\u015F\xE7\u0131lar var\u0131\u015F anlar\u0131nda \xE7izgiyi ge\xE7er.",{n:sayi(k.prepMax??5),h:sayi(Math.
round((k.prepSec??360)/60)),a:sayi(Math.round((k.moodSec?.good??240)/60)),b:sayi(Math.round((k.moodSec?.happy??480)/60)),s:sayi(Math.round((k.luckSec??600)/60)),dk:sayi(k.liveMin??30)})+(k.vehicle?" "+
\u00E7("Garaj\u0131nda a\u015F\u0131nmas\u0131 dolmam\u0131\u015F bir bisiklet gerekir; yar\u0131\u015Fta a\u015F\u0131nmaz."):"")+(k.athleteSec?" "+\u00E7("Atletik seviyen de h\u0131zland\u0131r\u0131r: 1. seviyeni\
n \xFCst\xFCndeki her seviye {s} saniye (\u015Eehrim \u2192 Spor salonu).",{s:sayi(k.athleteSec)}):"");if(etkinlikBayrakMi(e.kind,r))return \u00E7("Bayrak ko\u015Fusu {n} ki\u015Filik tak\u0131mla ko\u015Fulur: tak\u0131m\u0131 ka\
ptan kurar ve arkada\u015Flar\u0131n\u0131 davet eder (tek ba\u015F\u0131na kay\u0131t yok). Her \xFCye bir etap ko\u015Far; etab\u0131n s\xFCresi maratonun hesab\u0131n\u0131n {n}'te biri (haz\u0131rl\u0131k, keyif, atletik seviye ve \u015Fans maratondaki gibi), tak\u0131m\u0131n\
 s\xFCresi etaplar\u0131n toplam\u0131. \xD6d\xFCl tak\u0131mlar\u0131n s\u0131ras\u0131na; tak\u0131mda e\u015Fit payla\u015F\u0131l\u0131r, kalan kuru\u015F kaptana.",{n:sayi(etkinlikTakimMax(e.kind,
r))})+" "+metin;if(etkinlikTakimMax(e.kind,r)>0){const t2=r.teams;return metin+" "+\u00E7("\u0130stersen {a}\u2013{b} ki\u015Filik tak\u0131m kur: tak\u0131m\u0131n s\xFCresi en iyi {c} \xFCyenin s\xFCrelerinin toplam\u0131. En az {m} tak\u0131m s\u0131r\
alan\u0131rsa havuzun %{p}'i birinci tak\u0131ma (tak\u0131mda e\u015Fit), kalan\u0131 ki\u015Filerin s\u0131ras\u0131na.",{a:sayi(t2.min??3),b:sayi(t2.max??4),c:sayi(t2.scoreBest??3),m:sayi(t2.minTeams??
2),p:sayi(Math.round(etkinlikTakimPayi(r)/1e4))})}return metin}if(kume==="contest"){const c=r.contest??{};return(e.kind==="yemek"?\u00E7("Kilerinden bir porsiyonla kaydolursun (j\xFCri yer; vazge\xE7ersen y\
a da gelmezsen kilere d\xF6ner)."):\u00E7("Kendi dikti\u011Fin bir giysiyle kaydolursun (kay\u0131tl\u0131yken buti\u011Fe konmaz, at\u0131lmaz)."))+" "+\u00E7("J\xFCri puan\u0131: tarifin ya da modelin seviy\
esi (en \xE7ok {s}), kalite ({k}) ve be\u011Feni (en \xE7ok {b}). {dk} dakika boyunca \u015Fehirde olan herkes bir oy verir. Son puan: j\xFCri %{j}, halk oyu %{o}.",{s:sayi(c.levelPts??50),k:(c.qualityPts??
[10,25,40]).map(sayi).join("/"),b:sayi(c.likePts??10),dk:sayi(c.minutes??60),j:sayi(Math.round((c.juryPpm??7e5)/1e4)),o:sayi(Math.round((c.votePpm??3e5)/1e4))})}const t=r.tournament?.[e.kind]??{};return \u00E7(
"Ba\u015Flarken \u015Fehirde olanlar oyun puan\u0131na g\xF6re s\u0131ralan\u0131r; tek eleme a\u011Fac\u0131 (bo\u015F yerler ba\u015Ftakilere bay). Turlar {dk} dakikada bir ba\u015Flar; ma\xE7lar kahvehanenin turnuva masas\u0131nda puans\u0131z oynan\u0131r (her yerden\
). S\xFCre dolunca bitmeyen ma\xE7a hakem karar verir; beraberlikte \xFCst s\u0131radaki tur atlar.",{dk:sayi(t.roundMin??25)})}function dugmelerHtml(e){const r=R(),kume=etkinlikKume(e.kind,r),m=e.mine,
d=[],acik=e.status==="scheduled"&&Date.parse(e.starts_at)>simdi(),sureli=e.status==="live"&&Date.parse(e.ends_at)>simdi(),tmax=etkinlikTakimMax(e.kind,r),bayrak=etkinlikBayrakMi(e.kind,r),takim=(e.teams??
[]).find(t=>t.mine)??null,dolu=Number(e.count)>=Number(e.max);if(acik&&kume!=="senlik")if(!m)bayrak?d.push(`<button class="dugme altin" data-etkinlik-takim-kur="${esc(e.id)}" ${mesgul||dolu?"disabled":
""}>${ikon("users-round")}${dolu?\u00E7("Kay\u0131t dolu"):\u00E7("Tak\u0131m kur ve kaydol")}</button>`):d.push(`<button class="dugme altin" data-etkinlik-kayit="${esc(e.id)}" ${mesgul||dolu?"disable\
d":""}>${ikon("ticket")}${dolu?\u00E7("Kay\u0131t dolu"):\u00E7("Kay\u0131t ol")}</button>`),tmax>0&&!bayrak&&!dolu&&d.push(`<button class="dugme ikincil" data-etkinlik-takim-kur="${esc(e.id)}" ${mesgul?
"disabled":""}>${ikon("users-round")}${\u00E7("Tak\u0131m kur")}</button>`);else{const pm=Number(r.race?.[e.kind]?.prepMax??5);if(kume==="race"&&pm>0&&d.push(`<button class="dugme ${m.can_prep?"altin":
"ikincil"}" data-etkinlik-hazirlik="${esc(e.id)}" ${!m.can_prep||mesgul?"disabled":""}>${ikon("dumbbell")}${Number(m.preps)>=pm?esc(\u00E7("Haz\u0131rl\u0131k tamam ({n}/{m})",{n:sayi(m.preps),m:sayi(
pm)})):m.can_prep?esc(\u00E7("Haz\u0131rl\u0131k yap ({n}/{m})",{n:sayi(m.preps),m:sayi(pm)})):esc(\u00E7("Bug\xFCnk\xFC haz\u0131rl\u0131k bitti ({n}/{m})",{n:sayi(m.preps),m:sayi(pm)}))}</button>`),
tmax>0)if(!m.team_id)d.push(`<button class="dugme ikincil" data-etkinlik-takim-kur="${esc(e.id)}" ${mesgul?"disabled":""}>${ikon("users-round")}${\u00E7("Tak\u0131m kur")}</button>`);else if(m.captain){
const yer=Number(takim?.size??1)<tmax,sinir=Number(takim?.invites_count??0)<Number(r.teams?.invitesMax??6);d.push(`<button class="dugme altin" data-etkinlik-takim-davet="${esc(e.id)}" ${mesgul||!yer||
!sinir?"disabled":""}>${ikon("user-round-plus")}${yer?\u00E7("Arkada\u015F\u0131n\u0131 davet et"):\u00E7("Tak\u0131m dolu")}</button>`),d.push(`<button class="dugme sade" data-etkinlik-takim-ayril="${esc(
e.id)}" data-kaptan ${mesgul?"disabled":""}>${ikon("log-out")}${\u00E7("Tak\u0131m\u0131 da\u011F\u0131t")}</button>`)}else d.push(`<button class="dugme sade" data-etkinlik-takim-ayril="${esc(e.id)}" ${mesgul?
"disabled":""}>${ikon("log-out")}${\u00E7("Tak\u0131mdan ayr\u0131l")}</button>`);bayrak&&m.team_id||d.push(`<button class="dugme sade" data-etkinlik-vazgec="${esc(e.id)}" ${mesgul?"disabled":""}>${ikon(
"x")}${\u00E7("Vazge\xE7")}</button>`)}if(acik&&kume!=="senlik"&&r.sponsor&&(v.mine?.companies??[]).length&&e.region_id===v.region_id){const yerVar=(e.sponsors??[]).length<Number(r.sponsor.perEvent??3),
zaten=new Set((e.sponsors??[]).map(x=>x.company_id)),isl=v.mine?.companies??[],hepsiSponsor=isl.every(c=>zaten.has(c.company_id)),uygun=isl.some(c=>!zaten.has(c.company_id)&&Number(c.season_count??0)<
Number(r.sponsor.perCompanySeason??6)),ad=hepsiSponsor?\u00E7("\u0130\u015Fletmen sponsor"):yerVar?uygun?\u00E7("Sponsor ol"):\u00E7("Sezonun s\u0131n\u0131r\u0131 doldu"):\u00E7("Sponsor yerleri dolu");
d.push(`<button class="dugme ikincil" data-etkinlik-sponsor="${esc(e.id)}" ${mesgul||!yerVar||!uygun?"disabled":""}>${ikon("store")}${ad}</button>`)}if(kume==="senlik"&&sureli&&d.push(m?`<span class="\
cip yesil">${ikon("check")}${\u00E7("\u015Eenli\u011Fe kat\u0131ld\u0131n")}</span>`:`<button class="dugme altin" data-etkinlik-katil="${esc(e.id)}" ${mesgul||!burada(e)?"disabled":""}>${ikon("party-p\
opper")}${\u00E7("\u015Eenli\u011Fe kat\u0131l")}</button>`),kume==="tournament"&&e.status==="live"&&m&&m.status==="started"){const mac=(e.matches??[]).filter(x=>x.game_id&&(x.a?.id===ben().id||x.b?.id===
ben().id)).sort((a,b)=>b.round-a.round)[0];mac&&mac.game_status==="playing"&&d.push(`<button class="dugme altin" data-git="sehir/oyunlar">${ikon(etkinlikIkon(e.kind))}${\u00E7("Ma\xE7\u0131na git")}</\
button>`)}v.mayor&&e.region_id===v.region_id&&acik&&kume!=="senlik"&&d.push(`<button class="dugme ikincil" data-etkinlik-odul="${esc(e.id)}" ${mesgul?"disabled":""}>${ikon("hand-coins")}${\u00E7("\xD6d\xFCl\
 koy")}</button>`);const uyari=[];return(acik||sureli)&&!burada(e)&&kume!=="contest"&&uyari.push(kume==="senlik"?\u00E7("\u015Eenli\u011Fe kat\u0131lmak i\xE7in \u015Fenli\u011Fin \u015Fehrinde ({sehir}) olmal\u0131s\u0131n.",
{sehir:bolgeAdi(e.region_id)}):\u00E7("Etkinlik ba\u015Flarken etkinli\u011Fin \u015Fehrinde ({sehir}) olmal\u0131s\u0131n; olmazsan gelmemi\u015F say\u0131l\u0131rs\u0131n.",{sehir:bolgeAdi(e.region_id)})),
kume==="contest"&&(acik||sureli)&&!burada(e)&&uyari.push(\u00E7("Yar\u0131\u015Fmac\u0131lar ba\u015Flarken, oy verenler oylama s\u0131ras\u0131nda etkinli\u011Fin \u015Fehrinde ({sehir}) olmal\u0131.",
{sehir:bolgeAdi(e.region_id)})),(d.length?`<div class="oneri-dugmeler etkinlik-dugmeler" style="margin-top:10px">${d.join("")}</div>`:"")+(uyari.length?`<div class="bilgi-kutusu" style="margin-top:10p\
x">${ikon("map-pin")}<span>${esc(uyari.join(" "))} <button class="baglanti" type="button" data-git="sehir/yol">${\u00E7("Seyahat")}</button></span></div>`:"")}function yarisHtml(e){if(etkinlikBayrakMi(
e.kind,R()))return bayrakHtml(e);const girenler=(e.entries??[]).filter(x=>x.status!=="dns"&&x.status!=="registered"),yolda=new Map((e.progress??[]).map(p=>[p.character_id,Number(p.ppm)])),varan=girenler.
filter(x=>x.result_sec!=null).sort((a,b)=>Number(a.place)-Number(b.place)),kosan=girenler.filter(x=>x.result_sec==null).sort((a,b)=>(yolda.get(b.character_id)??0)-(yolda.get(a.character_id)??0)),arac=x=>x.
vehicle?`<small class="etkinlik-arac" data-arac="${esc(x.vehicle.kind)}">${esc(aracRenkliAd(x.vehicle.kind,x.vehicle.color))}${x.vehicle_after!=null?" \xB7 "+esc(x.vehicle_scrapped?\u00E7("hurdaya ayr\
\u0131ld\u0131"):\u00E7("a\u015F\u0131nma {a} \u2192 {b}",{a:sayi(x.vehicle_wear??0),b:sayi(x.vehicle_after)})):""}</small>`:"";return`<div class="etkinlik-yaris" id="etkinlik-yaris">
        ${varan.map(x=>`<div class="etkinlik-yarisci vardi${x.character_id===ben().id?" ben":""}" data-yarisci="${esc(x.character_id)}">
          <span class="etkinlik-sira">${sayi(x.place)}</span><b>${esc(x.name??\u00E7("Silinmi\u015F hesap"))}${arac(x)}</b><span class="etkinlik-zaman"${Number(x.athlete_sec)>0?` title="${esc(\u00E7("\
Atletik seviye {n}: {sure} k\u0131sa",{n:sayi(x.athletic),sure:sporSure(x.athlete_sec)}))}"`:""}>${esc(etkinlikSure(x.result_sec))}</span>
          ${Number(x.prize_cr)>0?`<span class="cip altin kucuk-cip">${esc(\u00E7("{kr} kr",{kr:kr(x.prize_cr)}))}</span>`:""}</div>`).join("")}
        ${kosan.map(x=>`<div class="etkinlik-yarisci${x.character_id===ben().id?" ben":""}" data-yarisci="${esc(x.character_id)}">
          <span class="etkinlik-sira">${ikon(x.vehicle?ARAC_IK[x.vehicle.kind]??"car":etkinlikIkon(e.kind))}</span><b>${esc(x.name??"")}${arac(x)}</b>
          <span class="cubuk deniz etkinlik-ilerleme"><i style="width:${((yolda.get(x.character_id)??0)/1e4).toFixed(1)}%"></i></span></div>`).join("")}
      </div>`}function bayrakHtml(e){const canli=new Map((e.relay??[]).map(x=>[x.team_id,x])),l=(e.teams??[]).filter(t=>t.status!=="dns"),varan=l.filter(t=>t.team_sec!=null).sort((a,b)=>Number(a.place)-
Number(b.place)),kosan=l.filter(t=>t.team_sec==null).sort((a,b)=>Number(canli.get(b.id)?.ppm??0)-Number(canli.get(a.id)?.ppm??0)),adi=t=>esc(\u00E7("{ad} tak\u0131m\u0131",{ad:t.captain?.name??\u00E7(
"Silinmi\u015F hesap")}));return`<div class="etkinlik-yaris" id="etkinlik-yaris" data-bayrak>
        ${varan.map(t=>`<div class="etkinlik-yarisci vardi${t.mine?" ben":""}" data-takim-yaris="${esc(t.id)}">
          <span class="etkinlik-sira">${sayi(t.place)}</span><b>${adi(t)}</b><span class="etkinlik-zaman">${esc(etkinlikSure(t.team_sec))}</span>
          ${Number(t.prize_cr)>0?`<span class="cip altin kucuk-cip">${esc(\u00E7("{kr} kr",{kr:kr(t.prize_cr)}))}</span>`:""}</div>`).join("")}
        ${kosan.map(t=>{const c=canli.get(t.id),kosucu=(t.members??[]).find(x=>x.id===c?.runner_id);return`<div class="etkinlik-yarisci${t.mine?" ben":""}" data-takim-yaris="${esc(t.id)}" data-etap="${esc(
String(c?.leg??""))}">
            <span class="etkinlik-sira">${ikon("flag")}</span><b>${adi(t)}${c?`<small class="etkinlik-arac">${esc(\u00E7("{n}. etap: {ad}",{n:sayi(c.leg),ad:kosucu?.name??\u00E7("Silinmi\u015F hesap")}))}\
</small>`:""}</b>
            <span class="cubuk deniz etkinlik-ilerleme"><i style="width:${(Number(c?.ppm??0)/1e4).toFixed(1)}%"></i></span></div>`}).join("")}
        ${l.length?"":`<p class="kucuk">${esc(\u00E7("Ko\u015Fan tak\u0131m yok."))}</p>`}
      </div>`}function takimlarHtml(e){const r=R(),tmax=etkinlikTakimMax(e.kind,r);if(!tmax)return"";const acik=e.status==="scheduled"&&Date.parse(e.starts_at)>simdi(),bayrak=etkinlikBayrakMi(e.kind,r),
l=e.teams??[];if(!l.length&&!acik)return"";const uye=(t,x)=>{const sure=bayrak?x.leg_sec:x.result_sec;return`<span class="cip${x.id===ben().id?" yesil":""}${x.status==="dns"?" soluk":""}" data-takim-u\
ye="${esc(x.id)}">${x.id===t.captain?.id?ikon("crown"):""}${x.leg?esc(\u00E7("{n}. etap",{n:sayi(x.leg)}))+" \xB7 ":""}${esc(x.name??\u00E7("Silinmi\u015F hesap"))}${sure!=null?" \xB7 "+esc(etkinlikSure(
sure)):""}</span>`},satir=t=>`<div class="etkinlik-takim${t.mine?" benim":""}" data-takim="${esc(t.id)}" data-takim-durum="${esc(t.status)}">
          <div class="etkinlik-takim-bas"><span class="liste-ikon ${t.place===1?"altin":""}">${t.place?`<b>${sayi(t.place)}</b>`:ikon("users-round")}</span>
            <b>${esc(\u00E7("{ad} tak\u0131m\u0131",{ad:t.captain?.name??\u00E7("Silinmi\u015F hesap")}))}</b>
            <span class="cip kucuk-cip">${esc(\u00E7("{n}/{m} ki\u015Fi",{n:sayi(t.size??0),m:sayi(tmax)}))}</span>
            ${t.status==="dns"?`<span class="cip mercan kucuk-cip">${esc(\u00E7("gelmedi"))}</span>`:""}
            ${t.team_sec!=null?`<span class="etkinlik-zaman">${esc(etkinlikSure(t.team_sec))}</span>`:""}
            ${Number(t.prize_cr)>0?`<span class="cip altin kucuk-cip">${esc(\u00E7("{kr} kr",{kr:kr(t.prize_cr)}))}</span>`:""}</div>
          <div class="etkinlik-takim-uyeler">${(t.members??[]).map(x=>uye(t,x)).join("")}</div>
          ${t.mine&&(t.invites??[]).length?`<p class="kucuk">${esc(\u00E7("Bekleyen davet: {adlar}.",{adlar:t.invites.map(x=>x.name??"").join(", ")}))}</p>`:!t.mine&&acik&&Number(t.invites_count)>0?`<\
p class="kucuk">${esc(\u00E7("{n} davet bekliyor.",{n:sayi(t.invites_count)}))}</p>`:""}
        </div>`;return`<div class="etkinlik-takimlar" id="etkinlik-takimlar" data-takim-sayi="${l.length}" style="margin-top:12px">
          <p class="ust-yazi">${esc(\u00E7("Tak\u0131mlar \xB7 {n}",{n:sayi(l.length)}))}</p>
          ${l.length?`<div class="yigin" style="gap:8px">${l.map(satir).join("")}</div>`:`<p class="kucuk">${esc(bayrak?\u00E7("Hen\xFCz tak\u0131m yok. Tak\u0131m\u0131n\u0131 kur ve {n} ki\u015Fiye tamamla.",
{n:sayi(tmax)}):\u00E7("Hen\xFCz tak\u0131m yok."))}</p>`}
        </div>`}function sponsorlarHtml(e){const r=R();if(!r.sponsor||etkinlikKume(e.kind,r)==="senlik")return"";const l=e.sponsors??[],acik=e.status==="scheduled"&&Date.parse(e.starts_at)>simdi();if(!l.
length&&!acik)return"";const durum=x=>x.status==="refunded"?\u00E7("iade edildi"):x.status==="spent"&&Number(x.refund_cr)>0?\u00E7("{kr} kr d\xF6nd\xFC",{kr:kr(x.refund_cr)}):"";return`<div class="etk\
inlik-sponsorlar" id="etkinlik-sponsorlar" data-sponsor-sayi="${l.length}" style="margin-top:10px">
          <p class="ust-yazi">${\u00E7("Sponsorlar")}</p>
          ${l.length?`<div class="etkinlik-tabelalar">${l.map(x=>`<span class="etkinlik-tabela${x.status==="refunded"?" soluk":""}" data-sponsor="${esc(x.company_id)}">${ikon("store")}<b>${esc(x.name??
"")}</b>
              <small>${esc([\u00E7("{kr} kr",{kr:kr(x.amount_cr)}),durum(x)].filter(Boolean).join(" \xB7 "))}</small></span>`).join("")}</div>`:`<p class="kucuk">${esc(\u00E7("Hen\xFCz sponsor yok. Bu \u015Fe\
hirde i\u015Fletmesi olan sponsor olabilir: {a}\u2013{b} kredi, etkinlik ba\u015F\u0131na en \xE7ok {n} i\u015Fletme.",{a:kr(r.sponsor.minCr??500),b:kr(r.sponsor.maxCr??2e4),n:sayi(r.sponsor.perEvent??
3)}))}</p>`}
        </div>`}function agacHtml(e){const turlar=Number(e.rounds??0);if(!turlar)return"";const mac=e.matches??[],kisi=(k,kazanan)=>k?`<span class="etkinlik-oyuncu${kazanan?" kazandi":""}${k.id===ben().
id?" ben":""}"><small>${k.seed?sayi(k.seed):""}</small>${esc(k.name??\u00E7("Silinmi\u015F hesap"))}</span>`:`<span class="etkinlik-oyuncu bos">${\u00E7("bay")}</span>`,tur=n=>n===turlar?\u00E7("Final"):
n===turlar-1?\u00E7("Yar\u0131 final"):\u00E7("{n}. tur",{n:sayi(n)});return`<div class="etkinlik-agac" id="etkinlik-agac" style="--tur:${turlar}">${Array.from({length:turlar},(_,i)=>i+1).map(n=>`<div\
 class="etkinlik-agac-tur">
          <p class="ust-yazi">${esc(tur(n))}</p>
          ${mac.filter(x=>x.round===n).sort((a,b)=>a.slot-b.slot).map(x=>`<div class="etkinlik-mac" data-mac="${n}-${x.slot}" data-sonuc="${esc(x.result??"")}">
            ${kisi(x.a,x.winner_id&&x.winner_id===x.a?.id)}${kisi(x.b,x.winner_id&&x.winner_id===x.b?.id)}
            <small class="etkinlik-mac-durum">${esc(x.result?ETKINLIK_MAC[x.result]??"":x.game_status==="playing"?\u00E7("oynan\u0131yor"):"")}</small></div>`).join("")||`<p class="kucuk">${esc(\u00E7(
"S\u0131ras\u0131 gelince"))}</p>`}
        </div>`).join("")}</div>`}function yarismaHtml(e){const sureli=e.status==="live"&&Date.parse(e.ends_at)>simdi(),liste=(e.entries??[]).filter(x=>x.status!=="registered"||e.status==="scheduled").
filter(x=>x.status!=="dns");return e.status==="finished"&&liste.sort((a,b)=>Number(a.place??99)-Number(b.place??99)),`<div class="yigin etkinlik-yarismacilar" style="gap:6px">${liste.map(x=>`<div clas\
s="liste-satir" data-yarismaci="${esc(x.character_id)}">
          <span class="liste-ikon ${x.place===1?"altin":""}">${x.place?`<b>${sayi(x.place)}</b>`:ikon(etkinlikIkon(e.kind))}</span>
          <div><b>${esc(x.name??\u00E7("Silinmi\u015F hesap"))}${x.character_id===ben().id?" "+\u00E7("(sen)"):""}</b>
            <div class="alt">${esc(etkinlikGetirilen(x))}${e.status==="finished"&&x.score!=null?" \xB7 "+esc(\u00E7("j\xFCri {j}, {o} oy, puan {p}",{j:sayi(x.jury??0),o:sayi(x.votes??0),p:(Number(x.score)/
1e3).toLocaleString(DIL.yerel,{maximumFractionDigits:1})})):""}
              ${Number(x.prize_cr)>0?" \xB7 "+esc(\u00E7("{kr} kr \xF6d\xFCl",{kr:kr(x.prize_cr)})):""}</div></div>
          ${sureli&&x.status==="started"&&x.character_id!==ben().id?e.voted_for===x.character_id?`<span class="cip yesil">${ikon("check")}${\u00E7("Oyun burada")}</span>`:`<button class="dugme ${burada(
e)?"altin":"ikincil"} kucuk-d" data-etkinlik-oy="${esc(x.character_id)}" ${!burada(e)||mesgul?"disabled":""}>${ikon("vote")}${\u00E7("Oy ver")}</button>`:"<span></span>"}
        </div>`).join("")||`<p class="kucuk">${\u00E7("Hen\xFCz kay\u0131t yok.")}</p>`}</div>`}function kayitlilarHtml(e){const l=e.entries??[];return l.length?`<div class="etkinlik-kayitlilar">${l.map(
x=>`<span class="cip${x.character_id===ben().id?" yesil":""}${x.status==="dns"?" soluk":""}" data-kayitli="${esc(x.character_id)}">${esc(x.name??\u00E7("Silinmi\u015F hesap"))}${x.status==="dns"?" \xB7 "+
esc(\u00E7("gelmedi")):""}</span>`).join("")}</div>`:`<p class="kucuk">${etkinlikKume(e.kind,R())==="senlik"?\u00E7("Hen\xFCz kat\u0131lan yok."):\u00E7("Hen\xFCz kay\u0131t yok. \u0130lk kaydolan sen ol!")}\
</p>`}function sonucHtml(e){if(etkinlikBayrakMi(e.kind,R())){const t3=(e.teams??[]).filter(t=>t.place!=null&&Number(t.place)<=3).sort((a,b)=>Number(a.place)-Number(b.place));return t3.length?`<div cla\
ss="etkinlik-kursu" id="etkinlik-kursu">${t3.map(t=>`<div class="etkinlik-kursu-yer" data-yer="${sayi(t.place)}" data-takim-yer="${esc(t.id)}">
            <span class="etkinlik-madalya">${Number(t.place)===1?ikon("trophy"):ikon("medal")}</span><b>${esc(\u00E7("{ad} tak\u0131m\u0131",{ad:t.captain?.name??\u00E7("Silinmi\u015F hesap")}))}</b>
            <small>${esc([\u00E7("{n}.",{n:sayi(t.place)}),t.team_sec?etkinlikSure(t.team_sec):"",Number(t.prize_cr)>0?\u00E7("{kr} kr",{kr:kr(t.prize_cr)}):""].filter(Boolean).join(" \xB7 "))}</small\
></div>`).join("")}</div>`:""}const w=e.winners??[];return w.length?`<div class="etkinlik-kursu" id="etkinlik-kursu">${w.slice(0,4).map(x=>`<div class="etkinlik-kursu-yer" data-yer="${sayi(x.place)}">\

          <span class="etkinlik-madalya">${x.place===1?ikon("trophy"):ikon("medal")}</span><b>${esc(x.name??\u00E7("Silinmi\u015F hesap"))}</b>
          <small>${esc([\u00E7("{n}.",{n:sayi(x.place)}),x.result_sec?etkinlikSure(x.result_sec):"",Number(x.prize_cr)>0?\u00E7("{kr} kr",{kr:kr(x.prize_cr)}):""].filter(Boolean).join(" \xB7 "))}</sma\
ll></div>`).join("")}</div>`:etkinlikKume(e.kind,R())==="senlik"?`<p class="kucuk">${esc(\u00E7("{n} ki\u015Fi kat\u0131ld\u0131.",{n:sayi(e.attendees??0)}))}</p>`:""}function detayHtml(){const e=detay;
if(!e)return`<section class="kart" id="etkinlik-detay"><p class="bos">${\u00E7("Bir etkinlik se\xE7.")}</p></section>`;const r=R(),kume=etkinlikKume(e.kind,r),odul=etkinlikOduller(e,r),sureDk=Math.round(
(Date.parse(e.ends_at)-Date.parse(e.starts_at))/6e4),icerik=e.status==="cancelled"?`<p class="bilgi-kutusu uyari-kutusu">${ikon("x")}<span>${esc(\u00E7("Etkinlik iptal edildi: {neden}.",{neden:ETKINLIK_IPTAL[e.
cancel_reason]??""}))}</span></p>`:kume==="race"&&e.status!=="scheduled"?yarisHtml(e):kume==="tournament"&&e.status!=="scheduled"?agacHtml(e):kume==="contest"?yarismaHtml(e):kayitlilarHtml(e);return`<\
section class="kart" id="etkinlik-detay" data-etkinlik-detay="${esc(e.id)}" data-tur="${esc(e.kind)}" data-durum="${esc(e.status)}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(saatYaz(e.starts_at))} \xB7 ${esc(\u00E7("{dk} dakika",{dk:sayi(sureDk)}))}${e.source==="mayor"?" \xB7 "+esc(\u00E7("D\xFCzenleyen: Ba\u015Fkan {ad\
}",{ad:e.organizer?.name??\u00E7("Silinmi\u015F hesap")})):" \xB7 "+esc(etkinlikKaynak(e))}</p>
          <h2 class="b2">${ikon(etkinlikIkon(e.kind))} ${esc(etkinlikAdi(e.kind))}</h2></div>
          <span class="cip ${e.status==="live"?"deniz":e.status==="cancelled"?"mercan":e.status==="scheduled"?"altin":""}" data-etkinlik-durum>${esc(ETKINLIK_DURUM[e.status]??e.status)}</span></div>
        <p class="kucuk">${esc(aciklama(e))}</p>
        ${e.source==="fashionweek"?`<p class="kucuk etkinlik-moda-not" data-moda-not>${ikon("sparkles")} ${esc(\u00E7("Bu defile moda haftas\u0131n\u0131n par\xE7as\u0131 ({tarih}): yerin haftan\u0131n s\u0131ralamas\u0131na puan get\
irir; ayn\u0131 giysi bir haftada bir kez y\xFCr\xFCr.",{tarih:modaHaftasiAraligi(e.fashion_week?.week_start??"")}))} <button class="baglanti" type="button" data-moda-git>${\u00E7("Haftan\u0131n s\u0131ralamas\u0131")}\
</button></p>`:""}
        ${kume!=="senlik"?`<p class="kucuk etkinlik-odul" data-havuz="${esc(String(e.pool_cr??0))}" data-sponsor-cr="${esc(String(e.sponsor_cr??0))}">${ikon("hand-coins")} ${Number(e.pool_cr)>0?esc((()=>{
const paylar=odul.map((x,i)=>kume==="tournament"&&i>=2?\u00E7("yar\u0131 finalcilere {kr}",{kr:kr(x)}):etkinlikBayrakMi(e.kind,r)?\u00E7("{n}. tak\u0131m {kr}",{n:i+1,kr:kr(x)}):\u00E7("{n}. {kr}",{n:i+
1,kr:kr(x)})).join(", ");return Number(e.sponsor_cr)>0?Number(e.sponsor_cr)>=Number(e.pool_cr)?\u00E7("\xD6d\xFCl havuzu {kr} kredi (sponsorlardan): {paylar}.",{kr:kr(e.pool_cr),paylar}):\u00E7("\xD6d\xFCl \
havuzu {kr} kredi (belediye b\xFCt\xE7esinden ve sponsorlardan): {paylar}.",{kr:kr(e.pool_cr),paylar}):\u00E7("\xD6d\xFCl havuzu {kr} kredi (belediye b\xFCt\xE7esinden): {paylar}.",{kr:kr(e.pool_cr),paylar})})()):
esc(r.sponsor?\u00E7("Bu etkinlikte \xF6d\xFCl yok; ba\u015Flamadan ba\u015Fkan \xF6d\xFCl koyabilir, \u015Fehirdeki i\u015Fletmeler sponsor olabilir."):\u00E7("Bu etkinlikte \xF6d\xFCl yok; ba\u015Fkan ba\u015Flamad\
an \xF6d\xFCl koyabilir."))}</p>`:""}
        ${sponsorlarHtml(e)}
        ${e.status==="scheduled"&&kume!=="senlik"?`<p class="kucuk">${esc(\u00E7("{n}/{m} kay\u0131tl\u0131 (en az {a} ki\u015Fi gerekir). Kay\u0131t ve vazge\xE7mek ba\u015Flayana dek a\xE7\u0131k.",
{n:sayi(e.count??0),m:sayi(e.max??0),a:sayi(e.min??0)}))}</p>`:""}
        ${e.mine&&kume==="race"&&e.status==="scheduled"&&Number(r.race?.[e.kind]?.prepMax??5)>0?`<p class="kucuk" data-etkinlik-hazirlik-sayi="${sayi(e.mine.preps??0)}">${esc(\u00E7("Haz\u0131rl\u0131\u011F\u0131n: {n}. \
Yar\u0131\u015F g\xFCn\xFC \u015Fehirde ol.",{n:sayi(e.mine.preps??0)}))}</p>`:""}
        ${e.mine&&kume==="race"&&e.status==="scheduled"&&Number(r.race?.[e.kind]?.athleteSec)>0&&Number(Durum.v.ozet?.gym?.level??1)>1?`<p class="kucuk" data-etkinlik-atletik>${ikon("dumbbell")} ${esc(
\u00E7("Atletik seviyen {n}: yar\u0131\u015Fta {sure} daha h\u0131zl\u0131s\u0131n.",{n:sayi(Durum.v.ozet.gym.level),sure:sporSure(Number(r.race[e.kind].athleteSec)*(Number(Durum.v.ozet.gym.level)-1))}))}\
</p>`:""}
        ${e.mine?.dish||e.mine?.garment?`<p class="kucuk">${ikon(etkinlikIkon(e.kind))} ${esc(\u00E7("Yar\u0131\u015Fmaya getirdi\u011Fin: {ne}.",{ne:etkinlikGetirilen(e.mine)}))}</p>`:""}
        ${e.mine?.bike_color?`<p class="kucuk">${ikon("bike")} ${esc(\u00E7("Yar\u0131\u015Fta {renk} bisikletinle.",{renk:(ARAC_RENK_AD[e.mine.bike_color]??e.mine.bike_color).toLocaleLowerCase(DIL.yerel)}))}\
</p>`:""}
        ${e.mine?.vehicle?`<p class="kucuk" data-etkinlik-aracim="${esc(e.mine.vehicle.kind)}">${ikon(ARAC_IK[e.mine.vehicle.kind]??"car")} ${esc(\u00E7("Rallide {arac} ile yar\u0131\u015F\u0131rs\u0131n.",
{arac:aracRenkliAd(e.mine.vehicle.kind,e.mine.vehicle.color)}))}</p>`:""}
        ${dugmelerHtml(e)}
        ${takimlarHtml(e)}
        ${e.status==="finished"?sonucHtml(e):""}
        <div class="etkinlik-icerik" style="margin-top:12px">${icerik}</div>
        ${e.status==="live"&&kume==="contest"?`<p class="kucuk" style="margin-top:8px">${esc(\u00E7("Oylaman\u0131n biti\u015Fi: {saat}. Oyunu de\u011Fi\u015Ftirebilirsin.",{saat:saatKisa(e.ends_at)}))}\
</p>`:""}
        ${e.status!=="cancelled"?'<div id="etkinlik-yorumlar" style="margin-top:14px"></div>':""}
      </section>`}function benHtml(){const m=v.mine??{},s=m.stats??{},r=R(),tavan=Number(r.prize?.weekCapCr??1e5),alinan=Number(m.prize_week_cr??0),madalyalar=(Durum.v.kurallar?.data?.medal?.medals??[]).
filter(x=>["senlik","yarisci","sampiyon"].includes(x.id)),say={senlik:Number(s.senlik??0),yarisci:Number(s.races??0),sampiyon:Number(s.wins??0)};return`<section class="kart" id="etkinlik-ben">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sen")}</p><h2 class="b2">${\u00E7("Etkinlik karnen")}</h2></div><span class="ik-kutu">${ikon("award")}</span></div>
        <div class="etkinlik-sayac">${[["party-popper",\u00E7("\u015Eenlik"),say.senlik],["footprints",\u00E7("Bitirdi\u011Fin yar\u0131\u015F"),say.yarisci],["trophy",\u00E7("Birincilik"),say.sampiyon],
["medal",\u00E7("\u0130lk \xFC\xE7"),Number(s.podiums??0)]].map(([ik,ad,n])=>`<div>${ikon(ik)}<b>${sayi(n)}</b><small>${esc(ad)}</small></div>`).join("")}</div>
        ${madalyalar.length?`<p class="kucuk">${esc(madalyalar.map(x=>{const sira=(x.tiers??[]).find(t=>say[x.id]<t);return sira?\u00E7("{madalya}: s\u0131radaki basama\u011Fa {n}",{madalya:\u00E7v(x.
name),n:sayi(sira-say[x.id])}):\u00E7("{madalya}: b\xFCt\xFCn basamaklar",{madalya:\u00E7v(x.name)})}).join(" \xB7 "))}</p>`:""}
        <p class="kucuk">${esc(\u00E7("Son {g} g\xFCnde ald\u0131\u011F\u0131n etkinlik \xF6d\xFCl\xFC: {a} / {b} kredi.",{g:sayi(r.prize?.weekDays??7),a:kr(alinan),b:kr(tavan)}))}</p>
        <div class="cubuk altin"><i style="width:${Math.min(100,alinan/Math.max(1,tavan)*100).toFixed(1)}%"></i></div>
        ${(m.bests??[]).length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Ki\u015Fisel rekorlar\u0131n")}</p><div class="liste">${m.bests.map(b=>`<div class="liste-satir" data-rekor-ben="${esc(
b.kind)}">
            <span class="liste-ikon">${ikon(etkinlikIkon(b.kind))}</span><div><b>${esc(etkinlikAdi(b.kind))}: ${esc(etkinlikSure(b.best_sec))}</b><div class="alt">${esc(bolgeAdi(b.region_id))} \xB7 ${esc(
saatYaz(b.at))}</div></div><span></span></div>`).join("")}</div>`:""}
      </section>`}function rekorHtml(){const l=v.records??[];return`<section class="kart" id="etkinlik-rekor">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(bolgeAdi(v.region_id))}</p><h2 class="b2">${\u00E7("\u015Eehrin rekorlar\u0131")}</h2></div><span class="ik-kutu">${ikon("timer")}</span></\
div>
        ${["maraton","bisiklet"].map(k=>{const x=l.find(y=>y.kind===k);return`<div class="liste-satir" data-rekor="${k}"><span class="liste-ikon ${x?"altin":""}">${ikon(etkinlikIkon(k))}</span>
            <div><b>${esc(etkinlikAdi(k))}${x?": "+esc(etkinlikSure(x.best_sec)):""}</b><div class="alt">${x?esc(\u00E7("{ad} \xB7 {zaman}",{ad:x.name??\u00E7("Silinmi\u015F hesap"),zaman:saatYaz(x.at)})):
esc(\u00E7("Hen\xFCz rekor yok."))}</div></div><span></span></div>`}).join("")}
      </section>`}function sonHtml(){const l=v.recent??[];return`<section class="kart" id="etkinlik-son">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ge\xE7mi\u015F")}</p><h2 class="b2">${\u00E7("Son sonu\xE7lar")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></div>
        ${l.length?`<div class="yigin" style="gap:6px">${l.map(satirHtml).join("")}</div>`:`<p class="bos">${\u00E7("Hen\xFCz biten etkinlik yok.")}</p>`}
      </section>`}function kurallarHtml(){const r=R(),ucret=r.kinds??{},maddeler=[["landmark",\u00E7("Etkinlikler uyan\u0131k \xFClkelerin ba\u015Fkentinde yap\u0131l\u0131r; herkes kat\u0131labilir (vatanda\u015F olmak gerekmez). Et\
kinlik ba\u015Flarken \u015Fehirde olan yar\u0131\u015F\u0131r.")],["calendar-days",\u00E7("Gelenek: her hafta \xC7ar\u015Famba yar\u0131\u015F (s\u0131rayla {liste}), Cumartesi \u015Fenlik. Yedi g\xFCn \xF6nceden takvime girer.",
{liste:(r.rotation??["maraton","yemek","satranc","defile","bisiklet","tavla"]).map(k=>etkinlikAdi(k).toLocaleLowerCase(DIL.yerel)).join(", ")})],["landmark",\u00E7("Belediye ba\u015Fkan\u0131 haftada {n} etkinl\
ik daha d\xFCzenler; bedeli (\u015Fenlik {s}, yar\u0131\u015F {y}, yar\u0131\u015Fma {m}, turnuva {t} kredi) belediye b\xFCt\xE7esinden yak\u0131l\u0131r. \xD6d\xFCl havuzu en \xE7ok {h} kredi.",{n:sayi(
r.mayor?.perWeek??2),s:kr(ucret.senlik?.feeCr??15e3),y:kr(ucret.maraton?.feeCr??1e4),m:kr(ucret.yemek?.feeCr??8e3),t:kr(ucret.satranc?.feeCr??6e3),h:kr(r.pool?.maxCr??5e4)})],["hand-coins",\u00E7("\xD6d\xFC\
l: yar\u0131\u015F ve yar\u0131\u015Fmada 1. %50, 2. %30, 3. %20; turnuvada 1. %50, 2. %30, yar\u0131 finalcilere %10'ar. \u015Eehrin ba\u015Fkan\u0131 ve karakteri {g} g\xFCnden yeni olan \xF6d\xFCl almaz; ki\u015Fi ba\u015F\u0131na {d} g\xFCnde en \xE7ok {kr} kredi.",
{g:sayi(r.prize?.minCharacterDays??7),d:sayi(r.prize?.weekDays??7),kr:kr(r.prize?.weekCapCr??1e5)})],["sparkles",\u00E7("\u0130lk \xFC\xE7e \xFCn, keyif ve madalya (\u015Eenlik, Yar\u0131\u015F\xE7\u0131, \u015Eampiyon); birincilik ya\u015Fam g\xFCnl\
\xFC\u011F\xFCne yaz\u0131l\u0131r. Bunlar g\xFC\xE7, oy ya da gelir vermez; bahis yoktur.")]];r.sponsor&&maddeler.push(["store",\u00E7("Sponsor: bu \u015Fehirde i\u015Fletmesi olan, \xF6d\xFCll\xFC etkinli\u011Fe i\u015Fletmenin\
 kasas\u0131ndan {a}\u2013{b} kredi koyar (etkinlik ba\u015F\u0131na en \xE7ok {n} i\u015Fletme, bir i\u015Fletme bir sezonda en \xE7ok {s} etkinlik). \u0130\u015Fletmenin ad\u0131 tabelada ve meydanda g\xF6r\xFCn\xFCr; iptalde tutar\u0131n tamam\u0131, sonunda da\u011F\u0131t\u0131lm\
ayan \xF6d\xFCl\xFCn pay\u0131 i\u015Fletmeye d\xF6ner.",{a:kr(r.sponsor.minCr??500),b:kr(r.sponsor.maxCr??2e4),n:sayi(r.sponsor.perEvent??3),s:sayi(r.sponsor.perCompanySeason??6)})]),r.teams&&maddeler.
push(["users-round",\u00E7("Tak\u0131m: kaptan kurar ve arkada\u015Flar\u0131n\u0131 davet eder (ayn\u0131 anda en \xE7ok {d} davet). Maraton ve bisiklet turunda {a}\u2013{b} ki\u015Fi, bayrak ko\u015Fusunda {c} ki\u015Fi. Tak\u0131m\u0131n \xF6d\xFCl\xFC bitiren \xFCye\
lere e\u015Fit payla\u015F\u0131l\u0131r; kalan kuru\u015F kaptana.",{d:sayi(r.teams.invitesMax??6),a:sayi(r.teams.min??3),b:sayi(r.teams.max??4),c:sayi(r.teams.relaySize??4)})]),r.rally&&maddeler.push(
["car",\u00E7("Ralli: garaj\u0131nda motosiklet ya da otomobil gerekir; sonu\xE7 arac\u0131n durumu, lojistik becerin ve \u015Fanstan. Rallide ara\xE7 a\u015F\u0131n\u0131r; \xF6mr\xFC dolarsa hurdaya ayr\u0131l\u0131r.")]);
const mf=modaKurali(r);return mf&&maddeler.push(["sparkles",\u00E7("Moda haftas\u0131: d\xF6rt haftada bir uyan\u0131k ba\u015Fkentlerde birer defile (\xFClkenin saatiyle {s}:00; \u015Fehirler do\u011Fudan bat\u0131ya Pazartesi, Sal\u0131, P\
er\u015Fembe, Cuma ve Pazar'a da\u011F\u0131l\u0131r). Hafta sekiz g\xFCn \xF6nceden takvime girer.",{s:sayi(mf.hour??20)})+(v.fashion_week_next?" "+\u00E7("S\u0131radaki moda haftas\u0131: {tarih}.",
{tarih:modaHaftasiAraligi(v.fashion_week_next)}):"")+" "+modaKuralYazisi(mf)+" "+\u00E7("Haftan\u0131n ilk \xFC\xE7\xFCne \xFCn, Moda Haftas\u0131 Madalyas\u0131 ve ya\u015Fam g\xFCnl\xFC\u011F\xFC.")]),
`<section class="kart" id="etkinlik-kurallar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kurallar")}</p><h2 class="b2">${\u00E7("Etkinlikler nas\u0131l i\u015Fler?")}</h2></div><span cla\
ss="ik-kutu">${ikon("book-open")}</span></div>
        <div class="liste">${maddeler.map(([ik,m])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(m)}</div></div><span></span></div>`).
join("")}</div>
      </section>`}function ciz(){if(kapandi)return;if(hata&&!v){kap.innerHTML=`<div class="sayfa"><div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(hata))}</span></div>
          <button class="dugme ikincil" style="margin-top:14px" id="etkinlik-yeniden">${\u00E7("Yeniden dene")}</button></div>`,$("#etkinlik-yeniden",kap).onclick=()=>tazele();return}if(v?.active===!1){
kap.innerHTML=`<div class="sayfa sayfa-dar"><div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${\u00E7("Etkinlikler")}</h1></div></div>
          <p class="bos">${\u00E7("\u015Eehir etkinlikleri hen\xFCz a\xE7\u0131k de\u011Fil.")}</p></div>`;return}const yorumEski=$("#etkinlik-yorumlar",kap),yorumKimlik=yorumEski?.dataset.kimlik??null;
kap.innerHTML=`<div class="sayfa" data-etkinlik-bolge="${esc(v.region_id)}">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${esc(\u00E7("{sehir} etkinlikleri",{sehir:bolgeAdi(v.region_id)}))}</h1>
          <p class="aciklama">${\u00E7("Ba\u015Fkentin \u015Fenlikleri, yar\u0131\u015Flar\u0131, yar\u0131\u015Fmalar\u0131 ve turnuvalar\u0131. Kaydol, haz\u0131rlan, kat\u0131l; \xF6d\xFCller belediye b\xFCt\xE7esinden.")}\
</p></div>
          <span class="etkinlik-bas-sag"><span class="cip ${burada()?"yesil":""}" id="etkinlik-burada">${ikon("map-pin")}${esc(burada()?\u00E7("\u015Eehirdesin"):v.here?\u00E7("\u015Eu an: {sehir}",{sehir:bolgeAdi(
v.here)}):\u00E7("Yoldas\u0131n"))}</span>
            ${ilkBolge&&v.region_id!==ilkBolge?`<button class="dugme sade kucuk-d" type="button" data-etkinlik-don>${ikon("map-pin-house")}${esc(\u00E7("{sehir} program\u0131na d\xF6n",{sehir:bolgeAdi(
ilkBolge)}))}</button>`:""}</span></div>
        <div id="etkinlik-alan-yer"></div>
        <div class="izgara iki etkinlik-izgara" style="margin-top:20px">
          <div class="yigin">${modaHtml()}${programHtml()}${detayHtml()}</div>
          <div class="yigin">${benHtml()}${rekorHtml()}${sonHtml()}${kurallarHtml()}</div>
        </div></div>`,$("#etkinlik-alan-yer",kap)?.replaceWith(alan.el),alan.yaz({olay:detay,ben:{id:ben().id,ad:ben().name,gorunus,ulke:ben().citizenship},saatFarki}),bagla();const yk=$("#etkinlik-yo\
rumlar",kap);yk&&detay&&(yk.dataset.kimlik=detay.id,yorumEski&&yorumKimlik===detay.id?yk.replaceWith(yorumEski):yorumlarKur(yk,"cityevent",detay.id))}async function isle(fn,basari){if(!mesgul){mesgul=
!0;try{const y=await fn();if(kapandi)return;basari?.(y),Durum.ozet().catch(()=>{}),await yukle()}catch(e){tost(hataMetni(e),"circle-alert"),await yukle().catch(()=>{})}finally{mesgul=!1,kapandi||ciz()}}}
function kayitPenceresi(e){const r=R(),kume=etkinlikKume(e.kind,r),m=v.mine??{},baslik=\u00E7("{etkinlik}: kaydol",{etkinlik:etkinlikAdi(e.kind)}),ust=\u00E7("{saat} \xB7 {sehir}",{saat:saatYaz(e.starts_at),
sehir:bolgeAdi(e.region_id)}),kaydet=item=>isle(()=>Sunucu.yap("cityevent_register",{p_event:e.id,p_item:item??null}),()=>tost(\u00E7("{etkinlik} i\xE7in kayd\u0131n al\u0131nd\u0131.",{etkinlik:etkinlikAdi(
e.kind)}),"ticket"));if(e.kind==="yemek"){const kiler=(m.pantry??[]).filter(p=>Number(p.qty)>0);if(!kiler.length){pencere({ust,baslik,govde:`<p class="aciklama">${esc(\u00E7("Kilerinde porsiyon yok. H\
ayat\u0131m \u2192 Hobiler'de evinde yemek pi\u015Fir; pi\u015Fen porsiyonlar kilere girer."))}</p>`,dugmeler:[{ad:\u00E7("Kapat")},{ad:\u00E7("Hobiler"),sinif:"altin",ikon:"chef-hat",is:()=>Kabuk.git(
"hayat/hobiler")}]});return}pencereForm({ust,baslik,onayAd:\u00E7("Kaydol"),onayIkon:"ticket",govde:`<p class="aciklama">${esc(\u00E7("Kilerinden bir porsiyon se\xE7; yar\u0131\u015Fmaya ayr\u0131l\u0131r ve j\xFCri yer. Vazge\
\xE7ersen ya da yar\u0131\u015Fma ba\u015Flarken \u015Fehirde olmazsan kilere d\xF6ner."))}</p>
            <div class="secim-liste" role="radiogroup" aria-label="${esc(\u00E7("Porsiyon"))}">${kiler.map((p,i)=>`<label class="secim-satir"><input type="radio" name="porsiyon" value="${esc(p.recipe)}\
|${Number(p.quality)}" ${i===0?"checked":""}>
              <span><b>${esc(yemekAdi(p.recipe))}</b> <small>${esc(HOBI_KALITE[p.quality]??"")} \xB7 ${esc(\u00E7("{n} porsiyon",{n:sayi(p.qty)}))}</small></span></label>`).join("")}</div>`,is:async f=>{
const[recipe,q]=String(f.get("porsiyon")??"").split("|");if(!recipe)throw new Error(\u00E7("Bir porsiyon se\xE7."));await kaydet({recipe,quality:Number(q)})}});return}if(e.kind==="defile"){const giysiler=m.
garments??[];if(!giysiler.length){pencere({ust,baslik,govde:`<p class="aciklama">${esc(\u00E7("Defileye yaln\u0131z kendi dikti\u011Fin giysiyle kat\u0131l\u0131rs\u0131n. Hayat\u0131m \u2192 Hobiler'de terzilikle giysi dik."))}\
</p>`,dugmeler:[{ad:\u00E7("Kapat")},{ad:\u00E7("Hobiler"),sinif:"altin",ikon:"shirt",is:()=>Kabuk.git("hayat/hobiler")}]});return}const hafta=e.fashion_week?.id??null,yurudu=g=>!!hafta&&!g.busy&&!g.listed&&
(g.walked??[]).includes(hafta),ilk=giysiler.find(g=>!g.listed&&!g.busy&&!yurudu(g));pencereForm({ust,baslik,onayAd:\u00E7("Kaydol"),onayIkon:"ticket",govde:`<p class="aciklama">${esc(\u00E7("Kendi dik\
ti\u011Fin bir giysi se\xE7. Kay\u0131tl\u0131yken buti\u011Fe konmaz ve at\u0131lmaz; giyebilirsin. Modeller podyumda kendi giysileriyle y\xFCr\xFCr."))}${hafta?" "+esc(\u00E7("Moda haftas\u0131nda ayn\u0131 g\
iysi bir kez y\xFCr\xFCr; her \u015Fehrin defilesine ba\u015Fka bir giysiyle kat\u0131l.")):""}</p>
            <div class="secim-liste" role="radiogroup" aria-label="${esc(\u00E7("Giysi"))}">${giysiler.map(g=>{const kapali=g.listed||g.busy||yurudu(g);return`<label class="secim-satir${kapali?" kapal\
i":""}"><input type="radio" name="giysi" value="${esc(g.garment_id)}" ${kapali?"disabled":""} ${ilk&&g.garment_id===ilk.garment_id?"checked":""}>
                <span class="etkinlik-kumas" style="--r1:${giysiRengi(g.color1)};--r2:${giysiRengi(g.color2)}"></span>
                <span><b>${esc(giysiModelAdi(g.model))}</b> <small>${esc(giysiKumasYazisi(g.color1,g.color2))} \xB7 ${esc(GIYSI_KALITE_AD[g.quality]??"")}${g.listed?" \xB7 "+esc(\u00E7("butikte sat\u0131\u015Ft\
a")):g.busy?" \xB7 "+esc(\u00E7("ba\u015Fka defilede")):yurudu(g)?" \xB7 "+esc(\u00E7("bu moda haftas\u0131nda y\xFCr\xFCd\xFC")):""}</small></span></label>`}).join("")}</div>`,is:async f=>{const id=String(
f.get("giysi")??"");if(!id)throw new Error(\u00E7("Bir giysi se\xE7."));await kaydet({garment_id:id})}});return}let govde=`<p class="aciklama">${esc(aciklama(e))}</p>`;if(e.kind==="ralli"&&r.rally){const b=m.
bike,turler=r.rally.vehicles??["motosiklet","otomobil"],uygun=b&&turler.includes(b.kind);if(!uygun||Number(b.wear)>=Number(b.durability??0)){pencere({ust,baslik,govde:`<p class="aciklama">${esc(uygun?
\u00E7("Arac\u0131n y\u0131prand\u0131; ralliye a\u015F\u0131nmas\u0131 dolmam\u0131\u015F bir motosiklet ya da otomobil gerekir. Hayat\u0131m \u2192 Ara\xE7lar\u0131m'da onarabilirsin."):\u00E7("Rall\
iye garaj\u0131nda bir motosiklet ya da otomobil gerekir. Hayat\u0131m \u2192 Ara\xE7lar\u0131m'dan bayiden alabilir, garaj\u0131na koyabilirsin."))}</p>`,dugmeler:[{ad:\u00E7("Kapat")},{ad:\u00E7("Ar\
a\xE7lar\u0131m"),sinif:"altin",ikon:"car",is:()=>Kabuk.git("hayat/araclar")}]});return}const asinma=Number(Durum.v.kurallar?.data?.vehicle?.rallyWear??10),son2=Number(b.wear)+Math.min(asinma,Number(b.
durability)-Number(b.wear));govde+=`<p class="kucuk" data-ralli-arac="${esc(b.kind)}">${ikon(ARAC_IK[b.kind]??"car")} ${esc(\u00E7("Rallide {arac} ile yar\u0131\u015F\u0131rs\u0131n: a\u015F\u0131nma {a}/{d}, ralliden sonra {s}/{d\
}.",{arac:aracRenkliAd(b.kind,b.color),a:sayi(b.wear),s:sayi(son2),d:sayi(b.durability)}))}
          ${son2>=Number(b.durability)?esc(\u00E7("Arac\u0131n \xF6mr\xFC bu rallide doluyor; yar\u0131\u015Ftan sonra hurdaya ayr\u0131l\u0131r.")):""}</p>
          <p class="kucuk">${ikon("route")} ${esc(\u00E7("Lojistik becerin {n}: rallide {sure} kazand\u0131r\u0131r.",{n:sayi(v.mine?.logistics??0),sure:sporSure(Math.min(100,Number(v.mine?.logistics??
0))*Number(r.rally.skillSec??6))}))}</p>`}if(kume==="race"&&r.race?.[e.kind]?.vehicle){const b=m.bike;if(!(b&&b.kind===r.race[e.kind].vehicle&&Number(b.wear)<Number(b.durability??0))){pencere({ust,baslik,
govde:`<p class="aciklama">${esc(b&&b.kind===r.race[e.kind].vehicle?\u00E7("Bisikletin y\u0131prand\u0131; bisiklet turuna a\u015F\u0131nmas\u0131 dolmam\u0131\u015F bir bisiklet gerekir. Hayat\u0131m \u2192 Ara\xE7lar\u0131m'da onarabilirsin."):
\u00E7("Bisiklet turuna garaj\u0131nda bir bisiklet gerekir. Hayat\u0131m \u2192 Ara\xE7lar\u0131m'dan bayiden alabilir, garaj\u0131na koyabilirsin."))}</p>`,dugmeler:[{ad:\u00E7("Kapat")},{ad:\u00E7(
"Ara\xE7lar\u0131m"),sinif:"altin",ikon:"bike",is:()=>Kabuk.git("hayat/araclar")}]});return}govde+=`<p class="kucuk">${ikon("bike")} ${esc(\u00E7("Yar\u0131\u015Fta {renk} bisikletinle yar\u0131\u015F\u0131rs\u0131n.",
{renk:(ARAC_RENK_AD[b.color]??b.color).toLocaleLowerCase(DIL.yerel)}))}</p>`}kume==="tournament"&&(govde+=`<p class="kucuk">${esc(\u00E7("Ma\xE7\u0131n ba\u015Flad\u0131\u011F\u0131nda sana haber gelir; \u015Eehrim \u2192 Oyunlar'dan oyna\
rs\u0131n. O s\u0131rada ba\u015Fka masada oyunun s\xFCr\xFCyorsa ma\xE7\u0131 h\xFCkmen kaybedersin."))}</p>`),pencere({ust,baslik,govde,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Kaydol"),sinif:"\
altin",ikon:"ticket",is:()=>kaydet(null)}]})}function odulPenceresi(e){const r=R(),kalan=Math.max(0,Number(r.pool?.maxCr??5e4)-(Number(e.pool_cr??0)-Number(e.sponsor_cr??0)));pencereForm({ust:\u00E7("\
Belediye b\xFCt\xE7esi"),baslik:\u00E7("{etkinlik}: \xF6d\xFCl koy",{etkinlik:etkinlikAdi(e.kind)}),onayAd:\u00E7("\xD6d\xFCl koy"),onayIkon:"hand-coins",govde:`<p class="aciklama">${esc(\u00E7("Tutar\
 belediye b\xFCt\xE7esinden \xF6d\xFCl havuzuna (emanete) ge\xE7er; etkinlik bitince ilk \xFC\xE7e payla\u015F\u0131l\u0131r, da\u011F\u0131t\u0131lmayan b\xFCt\xE7eye d\xF6ner. Havuzda {a} kredi var; en \xE7ok {b} kredi daha konabilir. B\xFCt\xE7e: {c} kredi.",
{a:kr(e.pool_cr??0),b:kr(kalan),c:kr(v.mayor?.budget_cr??0)}))}</p>
          <label class="alan"><span>${\u00E7("Tutar (kredi)")}</span><input name="tutar" inputmode="decimal" required placeholder="${esc(\u00E7("\xF6r. 100"))}"></label>`,is:async f=>{const alt=krediAlt(
String(f.get("tutar")??""));if(!alt||alt<=0)throw new Error(\u00E7("Tutar\u0131 kredi olarak yaz (\xF6r. 100)."));if(alt>kalan)throw new Error(\u00E7("Havuz en \xE7ok {kr} kredi olabilir.",{kr:kr(r.pool?.
maxCr??5e4)}));await isle(()=>Sunucu.yap("cityevent_fund",{p_event:e.id,p_amount_cr:alt}),()=>tost(\u00E7("\xD6d\xFCl havuzuna {kr} kredi kondu.",{kr:kr(alt)}),"hand-coins"))}})}function sponsorPenceresi(e){
const r=R(),sp=r.sponsor??{},zaten=new Set((e.sponsors??[]).map(x=>x.company_id)),l=v.mine?.companies??[],sinir=Number(sp.perCompanySeason??6),ilk=l.find(c=>!zaten.has(c.company_id)&&Number(c.season_count)<
sinir);pencereForm({ust:\u00E7("{saat} \xB7 {sehir}",{saat:saatYaz(e.starts_at),sehir:bolgeAdi(e.region_id)}),baslik:\u00E7("{etkinlik}: sponsor ol",{etkinlik:etkinlikAdi(e.kind)}),onayAd:\u00E7("Spon\
sor ol"),onayIkon:"store",govde:`<p class="aciklama">${esc(\u00E7("Tutar i\u015Fletmenin kasas\u0131ndan \xF6d\xFCl havuzuna (emanete) ge\xE7er ve ilk \xFC\xE7e payla\u015F\u0131l\u0131r; i\u015Fletmenin ad\u0131 etkinli\u011Fin tabelas\u0131nda ve meydan\u0131n s\xFC\
s\xFCnde g\xF6r\xFCn\xFCr. Etkinlik iptal edilirse tutar\u0131n tamam\u0131, sonunda da\u011F\u0131t\u0131lmayan \xF6d\xFCl\xFCn pay\u0131 i\u015Fletmeye d\xF6ner."))}</p>
          <div class="secim-liste" role="radiogroup" aria-label="${esc(\u00E7("\u0130\u015Fletme"))}">${l.map(c=>{const kapali=zaten.has(c.company_id)||Number(c.season_count)>=sinir;return`<label clas\
s="secim-satir${kapali?" kapali":""}"><input type="radio" name="isletme" value="${esc(c.company_id)}" ${kapali?"disabled":""} ${ilk&&c.company_id===ilk.company_id?"checked":""}>
              <span><b>${esc(c.name??"")}</b> <small>${esc(\u00E7("Kasa {kr} kr \xB7 bu sezon {n}/{m} sponsorluk",{kr:kr(c.cash_cr??0),n:sayi(c.season_count??0),m:sayi(sinir)}))}${zaten.has(c.company_id)?
" \xB7 "+esc(\u00E7("zaten sponsor")):""}</small></span></label>`}).join("")}</div>
          <label class="alan"><span>${esc(\u00E7("Tutar (kredi, {a}\u2013{b})",{a:kr(sp.minCr??500),b:kr(sp.maxCr??2e4)}))}</span><input name="tutar" inputmode="decimal" required placeholder="${esc(\u00E7(
"\xF6r. 50"))}"></label>`,is:async f=>{const id=String(f.get("isletme")??"");if(!id)throw new Error(\u00E7("Bir i\u015Fletme se\xE7."));const alt=krediAlt(String(f.get("tutar")??""));if(!alt||alt<Number(
sp.minCr??500)||alt>Number(sp.maxCr??2e4))throw new Error(\u00E7("Tutar {a}\u2013{b} kredi olmal\u0131.",{a:kr(sp.minCr??500),b:kr(sp.maxCr??2e4)}));const ad=l.find(c=>c.company_id===id)?.name??"";await isle(
()=>Sunucu.yap("cityevent_sponsor",{p_event:e.id,p_company:id,p_amount_cr:alt}),()=>tost(\u00E7("{isletme}, {etkinlik} i\xE7in {kr} kredi sponsor oldu.",{isletme:ad,etkinlik:etkinlikAdi(e.kind),kr:kr(
alt)}),"store"))}})}async function davetPenceresi(e){let a;try{a=await Sunucu.cagir("friends")}catch(x){tost(hataMetni(x),"circle-alert");return}if(kapandi)return;const r=R(),t=(e.teams??[]).find(x=>x.
mine)??null,var_=new Set([...(t?.members??[]).map(x=>x.id),...(t?.invites??[]).map(x=>x.id)]),adaylar=(a.friends??[]).filter(f=>!var_.has(f.character_id));if(!adaylar.length){tost(\u00E7("\xC7a\u011F\u0131racak ar\
kada\u015F\u0131n yok; Meydan \u2192 Arkada\u015Flar'dan arkada\u015F ekle."),"users-round");return}pencereForm({ust:\u00E7("{etkinlik} \xB7 {saat}",{etkinlik:etkinlikAdi(e.kind),saat:saatYaz(e.starts_at)}),
baslik:\u00E7("Tak\u0131m\u0131na kimi \xE7a\u011F\u0131ral\u0131m?"),onayAd:\u00E7("Davet et"),onayIkon:"user-round-plus",govde:`<p class="aciklama">${esc(\u00E7("Arkada\u015F\u0131na bildirim gider; kabul ede\
rse tak\u0131m\u0131na girer (kay\u0131tl\u0131 de\u011Filse kayd\u0131 da a\xE7\u0131l\u0131r). Tak\u0131m en \xE7ok {m} ki\u015Fi; ayn\u0131 anda en \xE7ok {d} davetin bekleyebilir.",{m:sayi(etkinlikTakimMax(
e.kind,r)),d:sayi(r.teams?.invitesMax??6)}))}</p>
          <div class="radyo-liste">${adaylar.map((f,i)=>`<label class="radyo"><input type="radio" name="kisi" value="${esc(f.character_id)}" ${i===0?"checked":""}>
            <span><b>${esc(f.name)}</b>${f.country_id?`<span class="kucuk">${esc(ulkeAdi(f.country_id))}</span>`:""}</span></label>`).join("")}</div>`,is:async d=>{const kim=String(d.get("kisi")??"");
if(!kim)throw new Error(\u00E7("Bir arkada\u015F se\xE7."));await isle(()=>Sunucu.yap("cityevent_team_invite",{p_event:e.id,p_character:kim}),()=>tost(\u00E7("Davet g\xF6nderildi."),"user-round-plus"))}})}
const bul=id=>(detay?.id===id?detay:null)??[...program(),...v.recent??[]].find(e=>e.id===id)??null;function bagla(){for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);const kaydir=(sec,blok="\
start")=>$(sec,kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:blok});for(const b of $$("[data-moda-sehir]",kap))b.onclick=async()=>{if(mesgul)return;const r=b.dataset.modaSehir,id=b.
dataset.modaEtkinlik||null;if(r===v.region_id){id&&id!==secili&&(secili=id,await detayYukle(),kapandi||ciz()),kaydir("#etkinlik-detay");return}bolge=r,secili=id,await yukle(),kapandi||(ciz(),kaydir("#\
etkinlik-detay"))};for(const b of $$("[data-etkinlik-don]",kap))b.onclick=async()=>{mesgul||(bolge=ilkBolge,secili=null,await yukle(),kapandi||(ciz(),window.scrollTo({top:0,behavior:hareketAzalt?"auto":
"smooth"})))};for(const b of $$("[data-moda-git]",kap))b.onclick=()=>kaydir("#etkinlik-moda");for(const b of $$("[data-etkinlik]",kap))b.onclick=async()=>{if(secili===b.dataset.etkinlik){$("#etkinlik-\
detay",kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"});return}secili=b.dataset.etkinlik,await detayYukle(),kapandi||(ciz(),$("#etkinlik-alan",kap)?.scrollIntoView({behavior:hareketAzalt?
"auto":"smooth",block:"nearest"}))};for(const b of $$("[data-etkinlik-kayit]",kap))b.onclick=()=>{const e=bul(b.dataset.etkinlikKayit);e&&kayitPenceresi(e)};for(const b of $$("[data-etkinlik-vazgec]",
kap))b.onclick=()=>{const e=bul(b.dataset.etkinlikVazgec);e&&pencere({ust:etkinlikAdi(e.kind),baslik:\u00E7("Kayd\u0131ndan vazge\xE7"),govde:`<p class="aciklama">${esc(e.kind==="yemek"?\u00E7("Porsiy\
onun kilere d\xF6ner. Etkinlik ba\u015Flayana dek yeniden kaydolabilirsin."):e.mine?.preps?\u00E7("Haz\u0131rl\u0131klar\u0131n silinir. Etkinlik ba\u015Flayana dek yeniden kaydolabilirsin."):\u00E7("\
Etkinlik ba\u015Flayana dek yeniden kaydolabilirsin."))}${e.mine?.team_id?" "+esc(e.mine.captain?\u00E7("Kaptan\u0131 oldu\u011Fun tak\u0131m da\u011F\u0131l\u0131r."):\u00E7("Tak\u0131m\u0131ndan da \xE7\u0131kars\u0131n.")):
""}</p>`,dugmeler:[{ad:\u00E7("Kay\u0131tl\u0131 kal")},{ad:\u00E7("Vazge\xE7"),sinif:"mercan",ikon:"x",is:()=>isle(()=>Sunucu.yap("cityevent_withdraw",{p_event:e.id}),()=>tost(\u00E7("Kayd\u0131ndan vazge\
\xE7tin."),"x"))}]})};for(const b of $$("[data-etkinlik-hazirlik]",kap))b.onclick=()=>{const id=b.dataset.etkinlikHazirlik;isle(()=>Sunucu.yap("cityevent_prep",{p_event:id}),y=>{tost(\u00E7("Haz\u0131rl\u0131k \
yapt\u0131n ({n}). Yar\u0131n yeniden.",{n:sayi(y?.mine?.preps??0)}),"dumbbell"),alan.oyna("hazirlik")})};for(const b of $$("[data-etkinlik-katil]",kap))b.onclick=()=>{const id=b.dataset.etkinlikKatil;
isle(()=>Sunucu.yap("cityevent_attend",{p_event:id}),y=>{tost(Number(y?.bond_points)>0?\u00E7("\u015Eenli\u011Fe kat\u0131ld\u0131n; arkada\u015Flar\u0131nla yak\u0131nla\u015Ft\u0131n."):\u00E7("\u015Eenl\
i\u011Fe kat\u0131ld\u0131n! Keyfin yerine geldi."),"party-popper"),alan.oyna("katil")})};for(const b of $$("[data-etkinlik-oy]",kap))b.onclick=()=>{const kim=b.dataset.etkinlikOy,x=(detay?.entries??[]).
find(y=>y.character_id===kim);isle(()=>Sunucu.yap("cityevent_vote",{p_event:detay.id,p_entry:kim}),()=>tost(\u00E7("Oyunu {ad} adl\u0131 yar\u0131\u015Fmac\u0131ya verdin.",{ad:x?.name??""}),"vote"))};
for(const b of $$("[data-etkinlik-odul]",kap))b.onclick=()=>{const e=bul(b.dataset.etkinlikOdul);e&&odulPenceresi(e)};for(const b of $$("[data-etkinlik-sponsor]",kap))b.onclick=()=>{const e=bul(b.dataset.
etkinlikSponsor);e&&sponsorPenceresi(e)};for(const b of $$("[data-etkinlik-takim-kur]",kap))b.onclick=()=>{const e=bul(b.dataset.etkinlikTakimKur);if(!e)return;const bayrak=etkinlikBayrakMi(e.kind,R());
pencere({ust:\u00E7("{etkinlik} \xB7 {saat}",{etkinlik:etkinlikAdi(e.kind),saat:saatYaz(e.starts_at)}),baslik:\u00E7("Tak\u0131m kur"),govde:`<p class="aciklama">${esc(bayrak?\u00E7("Tak\u0131m\u0131n kaptan\u0131 o\
lursun ve bayrak ko\u015Fusuna kaydolursun. Sonra {n} arkada\u015F\u0131n\u0131 davet et; tak\u0131m ba\u015Flarken tam ({m} ki\u015Fi) ve hepiniz \u015Fehirde olmal\u0131s\u0131n\u0131z, yoksa tak\u0131m gelmemi\u015F say\u0131l\u0131r.",
{n:sayi(etkinlikTakimMax(e.kind,R())-1),m:sayi(etkinlikTakimMax(e.kind,R()))}):\u00E7("Tak\u0131m\u0131n kaptan\u0131 olursun (kay\u0131tl\u0131 de\u011Filsen kayd\u0131n da a\xE7\u0131l\u0131r). Sonra arkada\u015Flar\u0131n\u0131 davet et; tak\u0131m\u0131n s\xFCresi en iyi \
{c} \xFCyenin s\xFCresinden.",{c:sayi(R().teams?.scoreBest??3)}))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Tak\u0131m kur"),sinif:"altin",ikon:"users-round",is:()=>isle(()=>Sunucu.yap("cit\
yevent_team_create",{p_event:e.id}),()=>tost(bayrak?\u00E7("Tak\u0131m\u0131n\u0131 kurdun ve kaydoldun; arkada\u015Flar\u0131n\u0131 davet et."):\u00E7("Tak\u0131m\u0131n\u0131 kurdun; arkada\u015Flar\u0131n\u0131 davet et."),
"users-round"))}]})};for(const b of $$("[data-etkinlik-takim-davet]",kap))b.onclick=()=>{const e=bul(b.dataset.etkinlikTakimDavet);e&&davetPenceresi(e)};for(const b of $$("[data-etkinlik-takim-ayril]",
kap))b.onclick=()=>{const e=bul(b.dataset.etkinlikTakimAyril);if(!e)return;const kaptan=b.hasAttribute("data-kaptan"),bayrak=etkinlikBayrakMi(e.kind,R());pencere({ust:etkinlikAdi(e.kind),baslik:kaptan?
\u00E7("Tak\u0131m\u0131 da\u011F\u0131t"):\u00E7("Tak\u0131mdan ayr\u0131l"),govde:`<p class="aciklama">${esc(kaptan?bayrak?\u00E7("Tak\u0131m\u0131n da\u011F\u0131l\u0131r, davetler d\xFC\u015Fer; bayrak ko\u015Fusunda \xFCyelerin ve senin\
 kayd\u0131n da silinir."):\u00E7("Tak\u0131m\u0131n da\u011F\u0131l\u0131r, davetler d\xFC\u015Fer; sen ve \xFCyeler tak\u0131ms\u0131z kay\u0131tl\u0131 kal\u0131rs\u0131n\u0131z."):bayrak?\u00E7("T\
ak\u0131mdan ayr\u0131l\u0131rs\u0131n; bayrak ko\u015Fusunda kayd\u0131n da silinir."):\u00E7("Tak\u0131mdan ayr\u0131l\u0131rs\u0131n; tak\u0131ms\u0131z kay\u0131tl\u0131 kal\u0131rs\u0131n."))}</p\
>`,dugmeler:[{ad:\u00E7("Kal")},{ad:kaptan?\u00E7("Tak\u0131m\u0131 da\u011F\u0131t"):\u00E7("Tak\u0131mdan ayr\u0131l"),sinif:"mercan",ikon:"log-out",is:()=>isle(()=>Sunucu.yap("cityevent_team_leave",
{p_event:e.id}),()=>tost(kaptan?\u00E7("Tak\u0131m\u0131n\u0131 da\u011F\u0131tt\u0131n."):\u00E7("Tak\u0131mdan ayr\u0131ld\u0131n."),"log-out"))}]})};for(const b of $$("[data-takim-kabul]",kap))b.onclick=
()=>{const id=b.dataset.takimKabul,x=(v.mine?.invites??[]).find(y=>y.team_id===id);isle(()=>Sunucu.yap("cityevent_team_answer",{p_team:id,p_accept:!0}),y=>{tost(\u00E7("{kaptan} tak\u0131m\u0131na kat\u0131ld\u0131n.",
{kaptan:x?.captain??""}),"users-round"),y?.id&&y.id!==secili&&(secili=y.id)})};for(const b of $$("[data-takim-ret]",kap))b.onclick=()=>{const id=b.dataset.takimRet;isle(()=>Sunucu.yap("cityevent_team_\
answer",{p_team:id,p_accept:!1}),()=>tost(\u00E7("Daveti reddettin."),"x"))}}const tazele=tazeleyici(async()=>{await yukle(),!kapandi&&!mesgul&&!document.querySelector(".perde")&&ciz()});if(await yukle(),
!kap.isConnected)return alan.kapat(),()=>{};ciz();const b1=Durum.dinle("olay",({olay})=>{/^cityevent\.|^fashionweek\.|^board\.ended$/.test(olay)&&tazele()}),b2=Durum.dinle("ulke-olay",({olay})=>{/^(cityevent|fashionweek)\./.
test(olay)&&tazele()});let son=0;const saat=setInterval(()=>{if(kapandi||document.hidden)return;const canli=detay?.status==="live"||program().some(e=>e.status==="scheduled"&&Date.parse(e.starts_at)<=simdi()+
6e4);Date.now()-son>=(canli?1e4:3e4)&&(son=Date.now(),tazele())},5e3);return()=>{kapandi=!0,b1(),b2(),clearInterval(saat),alan.kapat()}}}),Parcalar.tamam("ek_98zz_etkinlik");
