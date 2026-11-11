// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_32_diplomasi.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("ulke/diplomasi",{async ac(kap){let v=null;const secim={ulke:null,tur:"non_aggression",gun:null,bolgeler:new Set,bicimler:{}},BICIM_AD={direct:\u00E7("Do\u011Frudan y\xF6netim"),autonomous:\u00E7(
"\xD6zerk b\xF6lge")},salon=DiplomasiSalonu.ac();async function yukle(){const[ulke,liste,kurallar,harita,koal,isb]=await Promise.all([Sunucu.cagir("country_overview"),Sunucu.cagir("treaties"),Durum.kurallar(),
Durum.harita(!0),Sunucu.cagir("coalition_status"),Sunucu.cagir("coop_status").catch(()=>null),Durum.ozet()]);v={ulke,liste,kurallar,harita,koal,isb,hedef:null};const acik=(harita.open_countries??[]).filter(
u=>u!==ulke.country_id);acik.includes(secim.ulke)||(secim.ulke=acik[0]??null),secim.ulke&&baskanim()&&(v.hedef=await Sunucu.cagir("country_overview",{p_country:secim.ulke}).catch(()=>null))}const biz=()=>v.
ulke.country_id,baskanim=()=>!!benimKimlik()&&v.ulke.leadership?.president?.character_id===benimKimlik(),diplo=()=>v.kurallar.data.civic.diplomacy,karsiOlur=t=>!!diplo().counter&&(diplo().counter.kinds??
[]).includes(t.kind)&&Number(t.round??1)<=Number(diplo().counter.maxCounters??0),sayacBitti=t=>!!diplo().counter&&(diplo().counter.kinds??[]).includes(t.kind)&&Number(t.round??1)>Number(diplo().counter.
maxCounters??0),savasta=u=>(v.ulke.campaigns??[]).some(c=>["preparing","active"].includes(c.status)&&(c.attacker_country_id===u||c.defender_country_id===u)),karsiUlke=t=>t.country_c===biz()||t.country_a===
biz()?t.country_b:t.country_a,onayAn=(t,u)=>u===t.country_a?t.approved_a_at:u===t.country_b?t.approved_b_at:t.approved_c_at,meclisCip=(u,an)=>an?`<span class="cip yesil">${ikon("check")}${\u00E7("{ulk\
e} meclisi onaylad\u0131",{ulke:esc(ulkeAdi(u))})}</span>`:`<span class="cip">${ikon("hourglass")}${\u00E7("{ulke} meclisi bekleniyor",{ulke:esc(ulkeAdi(u))})}</span>`;function asamaMetni(t){const r=diplo();
if(t.status==="countered")return \u00E7("{ulke} \u015Fartlar\u0131 de\u011Fi\u015Ftirip kar\u015F\u0131 teklif yapt\u0131 ({zaman}); g\xF6r\xFC\u015Fme yeni teklifle s\xFCr\xFCyor.",{ulke:esc(ulkeAdi(
t.country_b)),zaman:esc(saatYaz(t.closed_at??t.decided_at))});if(t.status==="offered"){const son=new Date(Date.parse(t.offered_at)+r.offerExpiryH*36e5).toISOString();return t.country_c===biz()?\u00E7(
"{a} ba\u015Fkan\u0131 {b} \xFClkesini koalisyona \xE7a\u011F\u0131rd\u0131; yan\u0131t\u0131 {b} ba\u015Fkan\u0131 verir, kabul ederse meclisimiz de oylar. Yan\u0131t i\xE7in son: {zaman}.",{a:esc(ulkeAdi(
t.country_a)),b:esc(ulkeAdi(t.country_b)),zaman:esc(saatYaz(son))}):t.country_b===biz()?\u00E7("{ulke} ba\u015Fkan\u0131 teklif etti; yan\u0131t\u0131 ba\u015Fkan\u0131m\u0131z verir. Yan\u0131t i\xE7in son: {zaman}.",
{ulke:esc(ulkeAdi(t.country_a)),zaman:esc(saatYaz(son))}):\u00E7("Teklifi biz yapt\u0131k; {ulke} ba\u015Fkan\u0131n\u0131n yan\u0131t\u0131 bekleniyor. Yan\u0131t i\xE7in son: {zaman}.",{ulke:esc(ulkeAdi(
t.country_b)),zaman:esc(saatYaz(son))})}return t.status==="accepted"&&t.kind==="coalition_join"?\u00E7("Teklif kabul edildi. Kat\u0131lma i\xE7in \xFC\xE7 meclis de onaylamal\u0131: iki \xFCye ve aday."):
t.status==="accepted"&&t.kind==="coalition"?\u00E7("Teklif kabul edildi. Koalisyon i\xE7in iki \xFClkenin meclisi de onaylamal\u0131."):t.status==="accepted"?\u00E7("Teklif kabul edildi. Y\xFCr\xFCrl\xFCk i\xE7in\
 iki \xFClkenin meclisi de onaylamal\u0131."):t.kind==="coalition"&&t.status==="ended"&&t.close_reason==="enacted"?\u00E7("Savunma koalisyonu {zaman} kuruldu.",{zaman:esc(saatYaz(t.starts_at??t.closed_at))}):
t.kind==="coalition_join"&&t.status==="ended"&&t.close_reason==="enacted"?\u00E7("{ulke} {zaman} koalisyona kat\u0131ld\u0131.",{ulke:esc(ulkeAdi(t.country_b)),zaman:esc(saatYaz(t.starts_at??t.closed_at))}):
["coalition","coalition_join"].includes(t.kind)&&t.status==="failed"&&koalisyonKapanis(t.close_reason)?\u00E7("Y\xFCr\xFCrl\xFC\u011Fe girmedi: {neden}.",{neden:esc(koalisyonKapanis(t.close_reason))}):
t.status==="in_force"&&["cooperation","line"].includes(t.kind)?\u00E7("{bas} tarihinden beri y\xFCr\xFCrl\xFCkte; s\xFCresiz. Ayr\u0131nt\u0131 \xDClkem \u2192 \u0130\u015Fbirli\u011Fi'nde.",{bas:esc(
saatYaz(t.starts_at))}):t.status==="in_force"?\u00E7("{bas} \u2013 {son}. Bu s\xFCrede iki \xFClke birbirine yeni sava\u015F ilan edemez; i\u015Fgal alt\u0131ndaki b\xF6lgelerin yerel direni\u015Fi bunun d\u0131\u015F\u0131nda.",
{bas:esc(saatYaz(t.starts_at)),son:esc(saatYaz(t.ends_at))}):t.kind==="aid"&&t.status==="ended"?\u00E7("Yard\u0131m {zaman} hazineden hazineye ge\xE7ti.",{zaman:esc(saatYaz(t.closed_at??t.starts_at))}):
t.status==="ended"&&t.close_reason==="superseded"?\u00E7("Yeni i\u015Fbirli\u011Fi anla\u015Fmas\u0131 yerine ge\xE7ti: {zaman}.",{zaman:esc(saatYaz(t.closed_at??t.ends_at))}):t.status==="terminating"&&
["cooperation","line"].includes(t.kind)?\u00E7("{ulke} fesih bildirdi; anla\u015Fma {zaman} sona erer.",{ulke:esc(ulkeAdi(t.notice_by_country)),zaman:esc(saatYaz(t.ends_at))}):t.status==="terminating"?
\u00E7("{ulke} fesih bildirdi; antla\u015Fma {zaman} sona erer. O zamana kadar yeni sava\u015F ilan edilemez.",{ulke:esc(ulkeAdi(t.notice_by_country)),zaman:esc(saatYaz(t.ends_at))}):t.status==="faile\
d"?\u00E7("Meclislerden biri onaylamad\u0131 ya da oylama s\xFCresinde bitmedi."):t.status==="expired"?\u00E7("Teklif s\xFCresinde yan\u0131tlanmad\u0131."):t.status==="rejected"?\u00E7("Teklif redded\
ildi."):t.status==="withdrawn"?\u00E7("Teklif eden \xFClke geri \xE7ekti."):t.ends_at||t.closed_at?\u00E7("Sona erdi: {zaman}.",{zaman:esc(saatYaz(t.closed_at??t.ends_at))}):""}function antlasmaKarti(t){
const d=["coalition","coalition_join"].includes(t.kind)&&t.status==="ended"&&t.close_reason==="enacted"?{ad:\u00E7("Y\xFCr\xFCrl\xFC\u011Fe girdi"),sinif:"yesil"}:ANTLASMA_DURUM[t.status]??{ad:t.status,
sinif:""},karsi=karsiUlke(t),baskan=baskanim(),dugmeler=[];baskan&&t.status==="offered"&&t.country_b===biz()&&(dugmeler.push(`<button class="dugme altin kucuk-d" data-kabul="${esc(t.treaty_id)}">${ikon(
"check")}${\u00E7("Kabul et")}</button>`),karsiOlur(t)&&["non_aggression","peace"].includes(t.kind)&&dugmeler.push(`<button class="dugme ikincil kucuk-d" data-karsi="${esc(t.treaty_id)}">${ikon("repea\
t-2")}${\u00E7("Kar\u015F\u0131 teklif")}</button>`),dugmeler.push(`<button class="dugme ikincil kucuk-d" data-ret="${esc(t.treaty_id)}">${ikon("x")}${\u00E7("Reddet")}</button>`)),baskan&&["offered",
"accepted"].includes(t.status)&&t.country_a===biz()&&dugmeler.push(`<button class="dugme ikincil kucuk-d" data-geri="${esc(t.treaty_id)}">${ikon("x")}${\u00E7("Geri \xE7ek")}</button>`),baskan&&t.status===
"in_force"&&["non_aggression","peace"].includes(t.kind)&&dugmeler.push(`<button class="dugme sade kucuk-d" data-fesih="${esc(t.treaty_id)}">${ikon("scroll-text")}${\u00E7("Fesih bildir")}</button>`),[
"cooperation","aid","line"].includes(t.kind)&&ANTLASMA_SUREN.has(t.status)&&dugmeler.push(`<button class="dugme ikincil kucuk-d" data-git-isbirligi>${ikon("heart-handshake")}${\u00E7("\u0130\u015Fbirli\u011Fi'nde a\xE7")}\
</button>`);const bizimOnay=onayAn(t,biz()),taraflar=[t.country_a,t.country_b,...t.country_c?[t.country_c]:[]];return`<article class="antlasma" data-antlasma="${esc(t.treaty_id)}">
        <div class="antlasma-bas"><span class="liste-ikon ${t.kind==="peace"||t.kind==="cooperation"?"yesil":"lacivert"}">${ikon(ANTLASMA_IKON[t.kind]??"scroll-text")}</span>
          <div><span class="tur">${esc(ANTLASMA[t.kind]??t.kind)}${antlasmaAyrinti(t)?" \xB7 "+esc(antlasmaAyrinti(t)):""}</span>
            <b><span class="ulke-nokta" style="background:${ulkeRenk(karsi)}"></span> ${esc(ulkeAdi(karsi))}</b>
            <div class="alt">${t.country_a===biz()?\u00E7("Biz teklif ettik"):t.country_c===biz()?\u00E7("{ulke} \xE7a\u011F\u0131rd\u0131; \xF6teki \xFCye olarak meclisimiz de oylar",{ulke:esc(ulkeAdi(
t.country_a))}):\u00E7("{ulke} teklif etti",{ulke:esc(ulkeAdi(t.country_a))})} \xB7 ${esc(saatYaz(t.offered_at))}</div></div>
          <span class="cip ${d.sinif}">${esc(d.ad)}</span></div>
        ${antlasmaCizgisi(t)}
        <p class="kucuk">${asamaMetni(t)}</p>
        ${t.previous?`<p class="antlasma-onceki" data-onceki="${esc(t.previous.treaty_id)}">${esc(oncekiTeklifMetni(t))}</p>`:""}
        ${t.status==="offered"&&t.country_b===biz()&&baskan&&sayacBitti(t)?`<p class="kucuk">${\u00E7("Bu g\xF6r\xFC\u015Fmede kar\u015F\u0131 teklif hakk\u0131 bitti ({n} tur): kabul et ya da reddet.",
{n:Number(diplo().counter?.maxCounters??3)})}</p>`:""}
        ${t.status==="accepted"?`<div class="oneri-dugmeler">${taraflar.map(u=>meclisCip(u,onayAn(t,u))).join("")}</div>
          ${bizimOnay?"":`<p class="kucuk">${\u00E7("Onay oylamas\u0131 \xDClkem \u2192 Meclis'te; yaln\u0131z milletvekilleri oy verir.")}</p>`}`:""}
        ${(t.transfers??[]).length?`<div class="devir-liste"><p class="ust-yazi">${\u00E7("B\xF6lge devri")}</p>${t.transfers.map(x=>`<div class="devir">${ikon("map-pin")}<b>${esc(bolgeAdi(x.region_id))}\
</b><span>${esc(ulkeAdi(x.from))} ${ikon("arrow-right")} ${esc(ulkeAdi(x.to))}${x.regime?` \xB7 ${esc(BICIM_AD[x.regime]??x.regime)}`:""}</span></div>`).join("")}</div>`:""}
        ${(t.regimes??[]).length?`<div class="devir-liste" data-anlasma-bicimler><p class="ust-yazi">${\u00E7("B\xF6lgelerin y\xF6netim bi\xE7imi")}</p>${t.regimes.map(x=>`<div class="devir">${ikon(x.
regime==="autonomous"?"landmark":"flag")}<b>${esc(bolgeAdi(x.region_id))}</b><span>${esc(ulkeAdi(x.occupier))} ${\u00E7("elinde")} \xB7 ${esc(BICIM_AD[x.regime]??x.regime)}</span></div>`).join("")}</d\
iv>`:""}
        ${dugmeler.length?`<div class="oneri-dugmeler">${dugmeler.join("")}</div>`:""}
      </article>`}function bicimAlani(devredilir){const isgaller=(v.harita.occupations??[]).filter(([,occ,home])=>occ===biz()&&home===secim.ulke||occ===secim.ulke&&home===biz()),satirlar=[];for(const id of secim.
bolgeler){const s=devredilir.find(([x])=>x===id)?.[1];if(!s)continue;const yeni=s===biz()?secim.ulke:biz();DUNYA.bolgeler[id]?.ulke!==yeni&&satirlar.push([id,\u00E7("{ulke} al\u0131yor",{ulke:ulkeAdi(
yeni)}),null])}for(const[id,occ,,,,bicim]of isgaller)secim.bolgeler.has(id)||satirlar.push([id,\u00E7("{ulke} elinde",{ulke:ulkeAdi(occ)}),bicim??null]);return satirlar.length?`<div class="alan" data-\
baris-bicimler><span>${\u00E7("B\xF6lgelerin y\xF6netim bi\xE7imi (iste\u011Fe ba\u011Fl\u0131)")}</span>
        <p class="kucuk" style="margin:0 0 6px">${\u00E7("Bar\u0131\u015F, tutulan ya da devredilen b\xF6lgenin nas\u0131l y\xF6netilece\u011Fini yazabilir; anla\u015Fma s\xFCrerken de\u011Fi\u015Fmez. Yaz\u0131lmayan b\xF6lge oldu\u011Fu gibi kal\u0131r.")}\
</p>
        <div class="yigin" style="gap:6px">${satirlar.map(([id,not,bicim])=>`<label class="alan satir" style="align-items:center;justify-content:space-between"><span><b>${esc(bolgeAdi(id))}</b> <span \
class="kucuk">${esc(not)}${bicim?" \xB7 "+esc(BICIM_AD[bicim]??bicim):""}</span></span>
          <select name="bicim:${esc(id)}" style="max-width:220px"><option value="">${\u00E7("De\u011Fi\u015Fmesin")}</option><option value="direct" ${secim.bicimler[id]==="direct"?"selected":""}>${BICIM_AD.
direct}</option><option value="autonomous" ${secim.bicimler[id]==="autonomous"?"selected":""}>${BICIM_AD.autonomous}</option></select></label>`).join("")}</div></div>`:""}function teklifKarti(){const r=diplo(),
acik=(v.harita.open_countries??[]).filter(u=>u!==biz());if(!acik.length)return"";if(!baskanim())return`<section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Teklif")}</p><h2 c\
lass="b2">${\u00E7("Antla\u015Fmay\u0131 ba\u015Fkan teklif eder")}</h2></div><span class="ik-kutu">${ikon("handshake")}</span></div>
          <p class="aciklama">${v.ulke.leadership?.president?\u00E7("Ba\u015Fkan\u0131m\u0131z {ad}.",{ad:esc(v.ulke.leadership.president.name)}):\u00E7("\xDClkenin \u015Fu an ba\u015Fkan\u0131 yok.")}\
 ${\u00E7("Vekil ba\u015Fkan diplomasi yapmaz. Milletvekilleri onay oylamas\u0131n\u0131 Meclis'te yapar.")}</p></section>`;acik.includes(secim.ulke)||(secim.ulke=acik[0]);const barisOlur=savasta(secim.
ulke),enAz=v.kurallar.data.civic.motionMinYes,vekil=o=>o?.parliament?.members?.length??0,uyarilar=[];v.hedef&&!v.hedef.leadership?.president&&uyarilar.push(\u00E7("{ulke} \u015Fu an ba\u015Fkans\u0131z; teklifi yan\u0131\
tlayacak kimse yok.",{ulke:esc(ulkeAdi(secim.ulke))})),v.hedef&&vekil(v.hedef)<enAz&&uyarilar.push(\u00E7("{ulke} meclisinde {n} milletvekili var; antla\u015Fmay\u0131 onaylamak i\xE7in en az {enaz} gerekir.",
{ulke:esc(ulkeAdi(secim.ulke)),n:vekil(v.hedef),enaz:Number(enAz)})),vekil(v.ulke)<enAz&&uyarilar.push(\u00E7("Meclisimizde {n} milletvekili var; antla\u015Fmay\u0131 onaylamak i\xE7in en az {enaz} gerekir.",
{n:vekil(v.ulke),enaz:Number(enAz)})),secim.tur==="peace"&&!barisOlur&&(secim.tur="non_aggression");const koalEngel=koalisyonTeklifEngeli(v.koal,secim.ulke,v.harita,savasta);secim.tur==="coalition"&&koalEngel&&
(secim.tur="non_aggression");const ortaklik=(v.isb?.partners??[]).find(t=>t.partner===secim.ulke),ticaretVar=(ortaklik?.clauses??[]).includes("trade");secim.tur==="trade"&&(ticaretVar||barisOlur)&&(secim.
tur="non_aggression");const aralik=secim.tur==="peace"?r.peaceDays:r.nonAggressionDays;(secim.gun==null||secim.gun<aralik.min||secim.gun>aralik.max)&&(secim.gun=Math.min(aralik.max,Math.max(aralik.min,
14)));const devredilir=Object.entries(v.harita.sahip).filter(([id,s])=>(s===biz()||s===secim.ulke)&&!DUNYA.bolgeler[id]?.korumali).sort(([a],[b])=>bolgeAdi(a).localeCompare(bolgeAdi(b),DIL.yerel));for(const id of[
...secim.bolgeler])devredilir.some(([x])=>x===id)||secim.bolgeler.delete(id);return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u015Fkan")}</p><h2 class="b2">${\u00E7("Yeni teklif")}</h2></div><span class="ik-kutu">${ikon("handshake")}</span></div>
        ${uyarilar.length?`<div class="bilgi-kutusu uyari-kutusu" style="margin-bottom:12px">${ikon("circle-alert")}<span>${uyarilar.join(" ")} ${\u00E7("Teklif yap\u0131labilir ama bu durumda kabul edilem\
ez.")}</span></div>`:""}
        <form class="form" id="teklif-form" novalidate>
          <label class="alan"><span>${\u00E7("\xDClke")}</span><select name="ulke">${acik.map(u=>`<option value="${esc(u)}" ${u===secim.ulke?"selected":""}>${esc(ulkeAdi(u))}</option>`).join("")}</sel\
ect></label>
          <div class="radyo-liste">
            <label class="radyo"><input type="radio" name="tur" value="non_aggression" ${secim.tur==="non_aggression"?"checked":""}>
              <span><b>${\u00E7("Sald\u0131rmazl\u0131k")}</b><span class="kucuk">${\u00E7("{min}\u2013{max} g\xFCn. \u0130ki \xFClke birbirine yeni sava\u015F ilan edemez; s\xFCren kampanyalara dokunmaz. \u0130\u015Fgal alt\u0131ndaki b\xF6l\
gelerin yerel direni\u015Fini engellemez.",{min:Number(r.nonAggressionDays.min),max:Number(r.nonAggressionDays.max)})}</span></span></label>
            <label class="radyo"><input type="radio" name="tur" value="peace" ${secim.tur==="peace"?"checked":""} ${barisOlur?"":"disabled"}>
              <span><b>${\u00E7("Bar\u0131\u015F")}</b><span class="kucuk">${barisOlur?\u00E7("{min}\u2013{max} g\xFCn. Y\xFCr\xFCrl\xFC\u011Fe girince iki \xFClke aras\u0131ndaki kampanyalar kapan\u0131r (yerel direni\u015Fin kampanyas\u0131 s\xFC\
rer); savunan topra\u011F\u0131n\u0131 korur. \u0130sterseniz b\xF6lge devri eklenir.",{min:Number(r.peaceDays.min),max:Number(r.peaceDays.max)}):\u00E7("Yaln\u0131z aran\u0131zda s\xFCren sava\u015F varken teklif edil\
ir.")}</span></span></label>
            <label class="radyo"><input type="radio" name="tur" value="coalition" ${secim.tur==="coalition"?"checked":""} ${koalEngel?"disabled":""}>
              <span><b>${v.koal?.coalition?\u00E7("Koalisyonumuza \xE7a\u011F\u0131r"):\u00E7("Savunma koalisyonu")}</b><span class="kucuk">${koalEngel||koalisyonTeklifMetni(v.koal,secim.ulke)}</span>\
</span></label>
            <label class="radyo"><input type="radio" name="tur" value="trade" ${secim.tur==="trade"?"checked":""} ${ticaretVar||barisOlur?"disabled":""}>
              <span><b>${\u00E7("Ticaret kolayl\u0131\u011F\u0131")}</b><span class="kucuk">${ticaretVar?\u00E7("{ulke} ile ticaret maddesi zaten y\xFCr\xFCrl\xFCkte.",{ulke:esc(ulkeAdi(secim.ulke))}):
barisOlur?\u00E7("Aran\u0131zda sava\u015F varken ticaret anla\u015Fmas\u0131 yap\u0131lmaz."):\u00E7("\u0130\u015Fbirli\u011Fi anla\u015Fmas\u0131n\u0131n ticaret maddesi: ortak \xFClkenin vatanda\u015F\u0131 \xF6b\xFCr \xFClkedeki ilandan al\u0131rken sat\
\u0131\u015F vergisinin yar\u0131s\u0131n\u0131 \xF6demez; iki \xFClke aras\u0131ndaki kargoda navlun yar\u0131.")+(ortaklik?" "+\u00E7("Y\xFCr\xFCrl\xFCkteki i\u015Fbirli\u011Finin maddelerine eklenir; yeni anla\u015Fma esk\
isinin yerine ge\xE7er."):"")}</span></span></label>
          </div>
          ${["coalition","trade"].includes(secim.tur)?"":`<label class="alan"><span>${\u00E7("S\xFCre (g\xFCn)")}</span><input name="gun" type="number" inputmode="numeric" min="${aralik.min}" max="${aralik.
max}" value="${secim.gun}"></label>`}
          ${secim.tur==="peace"?`<div class="alan"><span>${\u00E7("B\xF6lge devri (iste\u011Fe ba\u011Fl\u0131)")}</span>
            <p class="kucuk" style="margin:0 0 6px">${\u00E7("\u0130\u015Faretlenen b\xF6lge \xF6b\xFCr tarafa ge\xE7er. Ba\u015Fkent devredilmez. Onaydan sonra bir b\xF6lgenin sahibi de\u011Fi\u015Firse antla\u015Fma y\xFCr\xFCrl\xFC\u011Fe girmez.")}\
</p>
            ${devredilir.length?`<div class="radyo-liste">${devredilir.map(([id,s])=>`<label class="radyo"><input type="checkbox" name="bolge" value="${esc(id)}" ${secim.bolgeler.has(id)?"checked":""}\
>
              <span><b>${esc(bolgeAdi(id))}</b><span class="kucuk">${esc(ulkeAdi(s))} \u2192 ${esc(ulkeAdi(s===biz()?secim.ulke:biz()))}</span></span></label>`).join("")}</div>`:`<p class="bos">${\u00E7(
"Devredilebilecek b\xF6lge yok.")}</p>`}</div>
            ${bicimAlani(devredilir)}`:""}
          <p class="kucuk">${\u00E7("Kar\u015F\u0131 \xFClkenin ba\u015Fkan\u0131 kabul ederse iki \xFClkenin meclisinde onay oylamas\u0131 a\xE7\u0131l\u0131r. Yan\u0131ts\u0131z teklif {n} saatte d\xFC\u015Fer; fesih {fesih} saat bildirimle olur.",
{n:Number(r.offerExpiryH),fesih:Number(r.terminationNoticeH)})}</p>
          <p class="kucuk">${\u00E7("\u0130\u015Fbirli\u011Fi anla\u015Fmas\u0131, kalk\u0131nma yard\u0131m\u0131 ve ortak hat teklifleri \xDClkem \u2192 \u0130\u015Fbirli\u011Fi'nde.")} <button clas\
s="baglanti" type="button" data-git-isbirligi>${\u00E7("\u0130\u015Fbirli\u011Fi'ne git")}</button></p>
          <button class="dugme altin" type="submit">${ikon("send")}${\u00E7("Teklif et")}</button>
          <div class="form-mesaj"></div>
        </form>
      </section>`}function ciz(){const suren=v.liste.filter(t=>ANTLASMA_SUREN.has(t.status)),gecmis=v.liste.filter(t=>!ANTLASMA_SUREN.has(t.status)),bize=suren.filter(t=>t.status==="offered"&&t.country_b===
biz()).length;kap.innerHTML=`<div class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div>${ulkeUst(biz())}<h1 class="b1">${\u00E7("Diplomasi")}</h1>
          <p class="aciklama">${\u00E7("Antla\u015Fmalar \xFClkeler aras\u0131ndad\u0131r: ba\u015Fkan teklif eder, kar\u015F\u0131 \xFClkenin ba\u015Fkan\u0131 kabul eder, iki \xFClkenin meclisi de onaylar. Ba\u015Fkan de\u011Fi\u015Fse de antla\u015Fma s\xFCrer.")}\
</p></div>
          ${bize?`<span class="cip altin">${ikon("handshake")}${\u00E7("{n} teklif yan\u0131t bekliyor",{n:bize})}</span>`:""}</div>
        <div id="diplomasi-salon-yer"></div>
        <section class="kart">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Antla\u015Fmalar")}</p><h2 class="b2">${suren.length?\u00E7("{n} s\xFCren ya da bekleyen",{n:suren.length}):\u00E7("S\xFCren antla\u015Fma yo\
k")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></div>
          ${suren.length?`<div class="yigin">${suren.map(antlasmaKarti).join("")}</div>`:`<p class="bos">${v.ulke.at_war?\u00E7("\xDClken sava\u015Fta. Ba\u015Fkan bar\u0131\u015F teklif edebilir."):\u00E7(
"\xDClkenin \u015Fu an bir antla\u015Fmas\u0131 yok.")}</p>`}
        </section>
        ${koalisyonKartiHtml(v.koal,biz(),baskanim())}
        ${teklifKarti()}
        ${gecmis.length?`<section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Defter")}</p><h2 class="b2">${\u00E7("Ge\xE7mi\u015F antla\u015Fmalar")}</h2></div></div>
          <div class="yigin">${gecmis.map(antlasmaKarti).join("")}</div></section>`:""}
      </div>`;const sy=$("#diplomasi-salon-yer",kap);sy&&(sy.replaceWith(salon.el),salon.yaz({biz:biz(),liste:v.liste,kampanyalar:v.ulke.campaigns??[]})),bagla()}function bagla(){for(const b of $$("[d\
ata-kabul]",kap))b.onclick=()=>pencere({ust:\u00E7("Diplomasi"),baslik:\u00E7("Teklifi kabul et"),govde:`<p class="aciklama">${\u00E7("Kabul edince iki \xFClkenin meclisinde onay oylamas\u0131 a\xE7\u0131l\u0131r; ikisi d\
e onaylarsa antla\u015Fma y\xFCr\xFCrl\xFC\u011Fe girer.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Kabul et"),sinif:"altin",ikon:"check",is:()=>islem("treaty_respond",{p_treaty:b.dataset.
kabul,p_accept:!0},null)}]});for(const b of $$("[data-ret]",kap))b.onclick=()=>pencere({ust:\u00E7("Diplomasi"),baslik:\u00E7("Teklifi reddet"),govde:`<p class="aciklama">${karsiOlur(v.liste.find(t=>t.
treaty_id===b.dataset.ret)??{})?\u00E7("Reddedilen teklif kapan\u0131r. \u015Eartlar\u0131 de\u011Fi\u015Ftirmek istersen reddetmek yerine kar\u015F\u0131 teklif yap."):\u00E7("Reddedilen teklif kapan\
\u0131r; istersen sonra kendi teklifini yapars\u0131n.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Reddet"),sinif:"mercan",ikon:"x",is:()=>islem("treaty_respond",{p_treaty:b.dataset.ret,p_accept:!1},
\u00E7("Teklif reddedildi."))}]});for(const b of $$("[data-geri]",kap))b.onclick=()=>pencere({ust:\u00E7("Diplomasi"),baslik:\u00E7("Teklifi geri \xE7ek"),govde:`<p class="aciklama">${\u00E7("Teklif k\
apan\u0131r; a\xE7\u0131lm\u0131\u015F meclis oylamalar\u0131 da kapan\u0131r.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Geri \xE7ek"),sinif:"mercan",ikon:"x",is:()=>islem("treaty_withdra\
w",{p_treaty:b.dataset.geri},\u00E7("Teklif geri \xE7ekildi."))}]});for(const b of $$("[data-fesih]",kap))b.onclick=()=>pencere({ust:\u00E7("Diplomasi"),baslik:\u00E7("Fesih bildir"),govde:`<p class="\
aciklama">${\u00E7("Antla\u015Fma {n} saat sonra sona erer (s\xFCresi daha \xF6nce doluyorsa o an). Bu s\xFCrede yeni sava\u015F ilan edilemez.",{n:Number(diplo().terminationNoticeH)})}</p>`,dugmeler:[
{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Fesih bildir"),sinif:"mercan",ikon:"scroll-text",is:()=>islem("treaty_terminate",{p_treaty:b.dataset.fesih},null)}]});for(const b of $$("[data-karsi]",kap))b.onclick=
()=>karsiTeklif(v.liste.find(t=>t.treaty_id===b.dataset.karsi));for(const b of $$("[data-git-isbirligi]",kap))b.onclick=()=>Kabuk.git("ulke/isbirligi");koalisyonKartiBagla(kap,v.koal,islem,tazele);const f=$(
"#teklif-form",kap);f&&(f.addEventListener("change",e=>{const d=new FormData(f);secim.ulke=String(d.get("ulke")),secim.tur=String(d.get("tur")??"non_aggression"),secim.gun=Number(d.get("gun"))||secim.
gun,secim.bolgeler=new Set(d.getAll("bolge").map(String)),secim.bicimler=Object.fromEntries([...d.entries()].filter(([k,x])=>k.startsWith("bicim:")&&x).map(([k,x])=>[k.slice(6),String(x)])),e.target.name===
"ulke"?tazele():(e.target.name==="tur"||e.target.name==="bolge")&&ciz()}),f.addEventListener("submit",async e=>{e.preventDefault();const d=new FormData(f),yer=$(".form-mesaj",f),gun=Number(d.get("gun")),
hedef=String(d.get("ulke")),tur=String(d.get("tur")),bolgeler=d.getAll("bolge").map(String),b=$("button[type=submit]",f);b.disabled=!0;try{if(tur==="peace")await Sunucu.yap("treaty_offer_peace",{p_target_country:hedef,
p_days:gun,p_regions:bolgeler,...Object.keys(secim.bicimler).length?{p_regimes:secim.bicimler}:{}});else if(tur==="coalition")await Sunucu.yap("coalition_offer",{p_target_country:hedef});else if(tur===
"trade"){const mevcut=(v.isb?.partners??[]).find(t=>t.partner===hedef)?.clauses??[];await Sunucu.yap("coop_offer",{p_target_country:hedef,p_clauses:[...new Set([...mevcut,"trade"])]})}else await Sunucu.
yap("treaty_offer",{p_target_country:hedef,p_kind:tur,p_days:gun});tost(tur==="coalition"?\u00E7("Koalisyon teklifi g\xF6nderildi. Yan\u0131t\u0131 kar\u015F\u0131 \xFClkenin ba\u015Fkan\u0131 verir."):
tur==="trade"?\u00E7("Ticaret kolayl\u0131\u011F\u0131 teklif edildi (i\u015Fbirli\u011Fi anla\u015Fmas\u0131). Yan\u0131t\u0131 kar\u015F\u0131 \xFClkenin ba\u015Fkan\u0131 verir."):\u00E7("Teklif g\xF6\
nderildi. Yan\u0131t\u0131 kar\u015F\u0131 \xFClkenin ba\u015Fkan\u0131 verir."),"send"),secim.bolgeler.clear(),secim.bicimler={},await tazele()}catch(err){yer.innerHTML=`<div class="hata-kutusu" styl\
e="margin-top:12px">${ikon("circle-alert")}<span>${esc(hataMetni(err))}</span></div>`,b.disabled=!1}}))}function karsiTeklif(t){if(!t)return;const r=diplo(),aralik=t.kind==="peace"?r.peaceDays:r.nonAggressionDays,
karsi=t.country_a,devredilir=t.kind==="peace"?Object.entries(v.harita.sahip).filter(([id,s2])=>(s2===biz()||s2===karsi)&&!DUNYA.bolgeler[id]?.korumali).sort(([a],[b])=>bolgeAdi(a).localeCompare(bolgeAdi(
b),DIL.yerel)):[],onceki=new Set((t.transfers??[]).map(x=>x.region_id)),bicimVar=(t.regimes??[]).length>0;pencereForm({ust:\u00E7("Diplomasi"),baslik:\u00E7("Kar\u015F\u0131 teklif \xB7 {antlasma}",{antlasma:ANTLASMA[t.
kind]??t.kind}),onayAd:\u00E7("Kar\u015F\u0131 teklifi g\xF6nder"),onayIkon:"repeat-2",govde:`<p class="aciklama">${\u00E7("{ulke} teklifinin \u015Fartlar\u0131n\u0131 de\u011Fi\u015Ftirip geri g\xF6nderirsin: bu teklif kapan\u0131r,\
 yeni teklif {ulke} ba\u015Fkan\u0131na gider. Bu g\xF6r\xFC\u015Fmede en \xE7ok {n} kar\u015F\u0131 teklif yap\u0131l\u0131r; bu {t}. tur olacak.",{ulke:esc(ulkeAdi(karsi)),n:Number(r.counter?.maxCounters??
3),t:Number(t.round??1)+1})}</p>
          <label class="alan"><span>${\u00E7("S\xFCre (g\xFCn)")}</span><input name="gun" type="number" inputmode="numeric" min="${aralik.min}" max="${aralik.max}" value="${Number(t.days??aralik.min)}\
"></label>
          ${t.kind==="peace"?`<div class="alan"><span>${\u00E7("B\xF6lge devri")}</span>
            <p class="kucuk" style="margin:0 0 6px">${\u00E7("\u0130\u015Faretlenen b\xF6lge \xF6b\xFCr tarafa ge\xE7er. Ba\u015Fkent devredilmez.")}</p>
            ${devredilir.length?`<div class="radyo-liste">${devredilir.map(([id,s2])=>`<label class="radyo"><input type="checkbox" name="bolge" value="${esc(id)}" ${onceki.has(id)?"checked":""}>
              <span><b>${esc(bolgeAdi(id))}</b><span class="kucuk">${esc(ulkeAdi(s2))} \u2192 ${esc(ulkeAdi(s2===biz()?karsi:biz()))}</span></span></label>`).join("")}</div>`:`<p class="bos">${\u00E7(
"Devredilebilecek b\xF6lge yok.")}</p>`}</div>
            ${bicimVar?`<label class="onay"><input type="checkbox" name="bicim" value="1" checked><span>${\u00E7("B\xF6lgelerin y\xF6netim bi\xE7imleri \xF6nceki teklifteki gibi kals\u0131n")}</span><\
/label>`:""}`:""}`,is:async d=>{const gun=adetAl(d.get("gun"));if(!(gun>=aralik.min&&gun<=aralik.max))throw new Error(\u00E7("S\xFCre {min}\u2013{max} g\xFCn olmal\u0131.",{min:Number(aralik.min),max:Number(
aralik.max)}));const sartlar={days:gun};t.kind==="peace"&&(sartlar.regions=d.getAll("bolge").map(String),bicimVar&&d.get("bicim")&&(sartlar.regimes=Object.fromEntries((t.regimes??[]).map(x=>[x.region_id,
x.regime])))),await Sunucu.yap("treaty_counter",{p_treaty:t.treaty_id,p_terms:sartlar}),tost(\u00E7("Kar\u015F\u0131 teklif g\xF6nderildi. Yan\u0131t\u0131 {ulke} ba\u015Fkan\u0131 verir.",{ulke:ulkeAdi(
karsi)}),"repeat-2"),await tazele()}})}async function islem(fn,args,mesaj){for(const b of $$("button",kap))b.disabled=!0;try{await Sunucu.yap(fn,args),mesaj&&tost(mesaj,"handshake")}catch(e){tost(hataMetni(
e),"circle-alert")}await tazele()}const tazele=tazeleyici(async()=>{await yukle(),ciz()});await yukle(),ciz();const b1=Durum.dinle("diplomasi",()=>tazele()),b2=Durum.dinle("ulke-olay",({olay})=>{/^(parliament\.motion_closed|country\.war_|office\.installed|coalition\.)/.
test(olay)&&tazele()}),b3=Durum.dinle("koalisyon",()=>tazele()),salonSaat=setInterval(()=>{!document.hidden&&salon.el.isConnected&&salon.yaz({biz:biz(),liste:v.liste,kampanyalar:v.ulke.campaigns??[]})},
3e5);return()=>{b1(),b2(),b3(),clearInterval(salonSaat),salon.kapat()}}}),Parcalar.tamam("ek_32_diplomasi");
