// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_98zs_oyunlar.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/oyunlar",{async ac(kap){let r=null,hata=null,sistem=null,kapandi=!1,kart=null,kartOyun=null;const sec={oyun:"tavla",kapsam:"dunya",sezonOyun:"tavla",sezonKapsam:"ulke"};try{const s=JSON.
parse(localStorage.getItem("civora.oyunlar")??"null");s?.oyun&&OYUN_AD[s.oyun]&&(sec.oyun=s.oyun),s?.kapsam==="ulke"&&(sec.kapsam="ulke"),s?.sezonOyun&&OYUN_AD[s.sezonOyun]&&(sec.sezonOyun=s.sezonOyun),
s?.sezonKapsam==="sehir"&&(sec.sezonKapsam="sehir")}catch{}const siralamalar=new Map,sezonlar=new Map,sehrim=()=>Durum.v.ozet?.character?.residence??null,ulkem=()=>Durum.v.ozet?.character?.citizenship??
null;async function yukle(){try{const[m,b]=await Promise.all([Masa.benim(),MekanYolu.burada().catch(()=>null)]);r=m,sistem=b?.system??null,hata=null}catch(e){hata=e}}async function siralamaYukle(taze=!1){
const a=sec.oyun+"|"+sec.kapsam;if(!taze&&siralamalar.has(a))return siralamalar.get(a);const l=await Masa.siralama(sec.oyun,sec.kapsam==="ulke"?ulkem():null);return siralamalar.set(a,l),l}function ciz(){
if(kapandi)return;if(hata&&!r){kartBirak(),kap.innerHTML=`<div class="sayfa"><div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(hata))}</span></div>
          <button class="dugme ikincil" style="margin-top:14px" id="oyunlar-yeniden">${\u00E7("Yeniden dene")}</button></div>`,$("#oyunlar-yeniden",kap).onclick=()=>tazele();return}const aktif=r.active??
null,kartKalsin=kart&&kartOyun&&(aktif?.game_id===kartOyun||!aktif&&["finished","cancelled"].includes(kart.oyun?.status)),kartYeri=kartKalsin?$("#oyunlar-masa",kap):null;kartYeri&&kartYeri.remove(),kartKalsin||
kartBirak();const davetler=r.invites??[],son=r.recent??[],puanlar=r.ratings??[];kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${\u00E7("Oyunlar")}</h1>
          <p class="aciklama">${\u00E7("Kahvehanede tavla, satran\xE7 ve okey: masaya oturup oyun a\xE7ars\u0131n ya da bekleyen masaya kat\u0131l\u0131rs\u0131n; bo\u015F yerlere m\xFCdavim oturur. Oyunlar yaln\u0131z puan i\xE7indir (para, \
e\u015Fya ya da bahis yok); puanl\u0131 oyunlar s\u0131ralamaya ve madalyalara say\u0131l\u0131r.")}</p></div>
          ${sistem?`<button class="dugme altin" id="oyunlar-kahvehane">${ikon("door-open")}${esc(\u00E7("{ad}'ne git",{ad:mekanAdi(sistem)}))}</button>`:""}</div>
        <div class="izgara oyunlar-izgara">
          <div class="oyunlar-sol">
            <div id="oyunlar-masa-yer">${aktif||kartKalsin?"":`<section class="kart" id="oyunlar-bos"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Masan")}</p>
              <h2 class="b2">${\u00E7("\u015Eu an bir oyunda de\u011Filsin")}</h2></div><span class="ik-kutu">${ikon("dices")}</span></div>
              <p class="aciklama">${\u00E7("Kahvehaneye gir, bir tavla masas\u0131na (tavla ya da satran\xE7) ya da kahvehane masas\u0131na (okey) otur ve oyunu a\xE7. Bekleyen bir masa varsa oturup kat\u0131l\u0131rs\u0131n.")}\
</p>
              ${sistem?`<div class="oneri-dugmeler"><button class="dugme altin kucuk-d" data-oyunlar-git="${esc(sistem.venue_id)}">${ikon("door-open")}${\u00E7("Kahvehaneye git")}</button></div>`:`<p \
class="kucuk">${\u00E7("Yoldayken kahvehaneye girilmez; vard\u0131\u011F\u0131n \u015Fehrin kahvehanesine gidebilirsin.")}</p>`}</section>`}</div>
            ${davetler.length?`<section class="kart" id="oyunlar-davetler"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Davetler")}</p><h2 class="b2">${\u00E7("Seni masaya \xE7a\u011F\u0131ranlar")}\
</h2></div>
              <span class="ik-kutu">${ikon("user-round-plus")}</span></div>
              <div class="liste">${davetler.map(davetSatir).join("")}</div></section>`:""}
            <section class="kart" id="oyunlar-son"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ge\xE7mi\u015F")}</p><h2 class="b2">${\u00E7("Son oyunlar\u0131n")}</h2></div><span class="i\
k-kutu">${ikon("scroll-text")}</span></div>
              ${son.length?`<div class="liste">${son.map(sonSatir).join("")}</div>`:`<p class="bos">${\u00E7("Hen\xFCz biten bir oyunun yok.")}</p>`}</section>
          </div>
          <div class="oyunlar-sag">
            <section class="kart" id="oyunlar-puanlar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Puanlar\u0131n")}</p><h2 class="b2">${\u00E7("\xDC\xE7 oyunda puan\u0131n")}</h2></div><\
span class="ik-kutu">${ikon("trophy")}</span></div>
              <div class="liste">${puanlar.map(puanSatir).join("")}</div>
              <p class="kucuk">${esc(\u00E7("Herkes {n} puanla ba\u015Flar. Puanl\u0131 oyunda kazan\u0131nca artar, kaybedince d\xFC\u015Fer; g\xFC\xE7l\xFC rakibi yenmek daha \xE7ok kazand\u0131r\u0131r. M\xFCdavimli oyunlar puans\u0131zd\u0131r; ayn\u0131 iki \
ki\u015Fi aras\u0131nda g\xFCnde {m} puanl\u0131 oyun say\u0131l\u0131r.",{n:sayi(r.rule?.rating?.start??1200),m:sayi(r.rule?.rating?.pairPerDay??3)}))}</p></section>
            <section class="kart" id="oyunlar-siralama"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("S\u0131ralama")}</p><h2 class="b2">${\u00E7("En iyiler")}</h2></div><span class="ik-kut\
u">${ikon("medal")}</span></div>
              <div class="sekme-dugmeler oyunlar-sec" role="tablist" aria-label="${esc(\u00E7("Oyun"))}">${Object.keys(OYUN_AD).map(oy=>`<button class="dugme ${sec.oyun===oy?"":"ikincil"} kucuk-d" rol\
e="tab" aria-selected="${sec.oyun===oy}" data-oyunlar-oyun="${oy}">${ikon(OYUN_IK[oy])}${esc(oyunAdi(oy))}</button>`).join("")}</div>
              <div class="sekme-dugmeler oyunlar-sec" role="tablist" aria-label="${esc(\u00E7("Kapsam"))}">
                <button class="dugme ${sec.kapsam==="dunya"?"":"ikincil"} kucuk-d" role="tab" aria-selected="${sec.kapsam==="dunya"}" data-oyunlar-kapsam="dunya">${ikon("globe")}${\u00E7("D\xFCnya")}<\
/button>
                ${ulkem()?`<button class="dugme ${sec.kapsam==="ulke"?"":"ikincil"} kucuk-d" role="tab" aria-selected="${sec.kapsam==="ulke"}" data-oyunlar-kapsam="ulke">${ikon("landmark")}${esc(ulkeAdi(
ulkem()))}</button>`:""}</div>
              <div id="oyunlar-liste"><p class="kucuk">${\u00E7("Y\xFCkleniyor\u2026")}</p></div></section>
            <section class="kart" id="oyunlar-sezon" data-sezon-oyun="${esc(sec.sezonOyun)}" data-sezon-kapsam="${esc(sec.sezonKapsam)}"><div class="kart-bas"><div><p class="ust-yazi" id="oyunlar-sezo\
n-ust">${\u00E7("Bu sezon")}</p><h2 class="b2">${\u00E7("Bu sezon")}</h2></div><span class="ik-kutu">${ikon("calendar-range")}</span></div>
              <div class="sekme-dugmeler oyunlar-sec" role="tablist" aria-label="${esc(\u00E7("Oyun"))}">${Object.keys(OYUN_AD).map(oy=>`<button class="dugme ${sec.sezonOyun===oy?"":"ikincil"} kucuk-d\
" role="tab" aria-selected="${sec.sezonOyun===oy}" data-sezon-oyun="${oy}">${ikon(OYUN_IK[oy])}${esc(oyunAdi(oy))}</button>`).join("")}</div>
              <div class="sekme-dugmeler oyunlar-sec" role="tablist" aria-label="${esc(\u00E7("Kapsam"))}">
                ${sehrim()?`<button class="dugme ${sec.sezonKapsam==="sehir"?"":"ikincil"} kucuk-d" role="tab" aria-selected="${sec.sezonKapsam==="sehir"}" data-sezon-kapsam="sehir">${ikon("map-pin-ho\
use")}${esc(bolgeAdi(sehrim()))}</button>`:""}
                ${ulkem()?`<button class="dugme ${sec.sezonKapsam==="ulke"?"":"ikincil"} kucuk-d" role="tab" aria-selected="${sec.sezonKapsam==="ulke"}" data-sezon-kapsam="ulke">${ikon("landmark")}${esc(
ulkeAdi(ulkem()))}</button>`:""}</div>
              <div id="oyunlar-sezon-liste"><p class="kucuk">${\u00E7("Y\xFCkleniyor\u2026")}</p></div>
              <p class="kucuk">${esc(\u00E7("Sezonda puan de\u011Fi\u015Fimi: bug\xFCnk\xFC puan\u0131n ile sezonun ilk puanl\u0131 oyunundan \xF6nceki puan\u0131n\u0131n fark\u0131. \u015Eehir listesi ikamete, \xFClke listesi vatanda\u015Fl\u0131\u011Fa g\xF6redir. Sez\
on kapan\u0131nca her \xFClkede oyunun birincisi (puan\u0131 artm\u0131\u015Fsa) \u201CTavla Ustas\u0131\u201D, \u201CSatran\xE7 Ustas\u0131\u201D ya da \u201COkey Ustas\u0131\u201D unvan\u0131n\u0131 al\u0131r; unvan profilde kal\u0131c\u0131d\u0131r."))}\
</p></section>
            <section class="kart" id="oyunlar-kurallar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kurallar")}</p><h2 class="b2">${\u00E7("Nas\u0131l oynan\u0131r?")}</h2></div><span cla\
ss="ik-kutu">${ikon("book-open")}</span></div>
              <div class="liste">${Object.keys(OYUN_AD).map(oy=>`<div class="liste-satir"><span class="liste-ikon">${ikon(OYUN_IK[oy])}</span>
                <div><b>${esc(oyunAdi(oy))}</b><div class="alt">${esc(OYUN_ACIKLAMA[oy])}</div></div></div>`).join("")}</div>
              <p class="kucuk">${esc(\u00E7("S\u0131ran gelince tavla ve okeyde {t} saniyen var; s\xFCre dolarsa elini sunucu oynar, \xFCst \xFCste {n} kez olursa masadan kalkm\u0131\u015F say\u0131l\u0131rs\u0131n. Satran\xE7ta saatin biters\
e kaybedersin.",{t:Number(r.rule?.games?.tavla?.turnSec??60),n:Number(r.rule?.games?.tavla?.autoLimit??3)}))}</p>
              ${(r.rule?.games?.satranc?.clocks??[]).length?`<p class="kucuk" data-oyunlar-sureler>${esc(\u00E7("Satran\xE7 s\xFCreleri: {l}. Masay\u0131 a\xE7an se\xE7er.",{l:r.rule.games.satranc.clocks.
map(satrancSureAdi).join(", ")}))}</p>`:""}
              ${r.rule?.replay?`<p class="kucuk">${esc(\u00E7("Biten oyunlar {n} g\xFCn ba\u015Ftan izlenir: oyuncular ve arkada\u015Flar\u0131 izleyebilir.",{n:sayi(Number(r.rule.replay.keepDays??30))}))}\
</p>`:""}</section>
          </div>
        </div></div>`;const yer=$("#oyunlar-masa-yer",kap);if(kartKalsin&&kartYeri)yer.appendChild(kartYeri);else if(aktif){const k=document.createElement("div");k.id="oyunlar-masa",yer.appendChild(k),
kart=MasaKarti.ac(k,aktif,{bitti:()=>{kartBirak(),tazele()}}),kartOyun=aktif.game_id}bagla(),siralamaCiz(),sezonCiz()}function kartBirak(){kart?.kapat(),kart=null,kartOyun=null}function davetSatir(d){
const yer=d.venue_system?mekanAdi({system:!0,region_id:d.region_id}):d.venue??"";return`<div class="liste-satir" data-oyunlar-davet="${esc(d.game_id)}"><span class="liste-ikon altin">${ikon(OYUN_IK[d.
game]??"dices")}</span>
        <div><span class="tur">${esc(zamanOnce(d.at))}</span><b>${esc(\u00E7("{ad} seni {oyun} masas\u0131na \xE7a\u011F\u0131rd\u0131",{ad:d.from_name??\u00E7("Biri"),oyun:oyunAdi(d.game)}))}</b>
          <div class="alt">${esc([yer,bolgeAdi(d.region_id)].filter(Boolean).join(" \xB7 "))}</div></div>
        <div class="mekan-satir-dugmeler"><button class="dugme altin kucuk-d" data-oyunlar-git="${esc(d.venue_id)}">${ikon("door-open")}${\u00E7("Git")}</button></div></div>`}function sonSatir(g){const ben=(g.
players??[]).find(p=>p.me),o={...g,my_seat:ben?.seat??null},d=puanFarki(ben),kazandi=g.winner!=null&&ben&&g.winner===ben.seat;return`<div class="liste-satir oyunlar-son-satir${kazandi?" kazandi":""}" \
data-oyunlar-son="${esc(g.game_id)}"><span class="liste-ikon ${kazandi?"yesil":g.winner==null?"":"mercan"}">${ikon(OYUN_IK[g.game]??"dices")}</span>
        <div><span class="tur">${esc([oyunAdi(g.game),g.finished_at?zamanOnce(g.finished_at):"",g.rated?\u00E7("puanl\u0131"):\u00E7("puans\u0131z")].filter(Boolean).join(" \xB7 "))}</span>
          <b>${esc(masaSonucYazisi(o))}</b>
          <div class="alt">${esc((g.players??[]).filter(p=>!p.me).map(masaOyuncuAdi).join(", "))}</div></div>
        ${d!=null?`<span class="masa-puan-fark ${d>0?"arti":d<0?"eksi":""}">${esc(puanFarkYazisi(d))}</span>`:""}
        ${masaIzlenir(o)?`<button class="dugme ikincil kucuk-d" type="button" data-oyunlar-izle="${esc(g.game_id)}" aria-label="${esc(\u00E7("Oyunu izle"))}" title="${esc(\u00E7("Oyunu izle"))}">${ikon(
"rotate-ccw")}${esc(\u00E7("\u0130zle"))}</button>`:""}</div>`}function puanSatir(p){const l=[\u00E7("{n} oyun",{n:sayi(p.games)}),\u00E7("{n} galibiyet",{n:sayi(p.wins)}),\u00E7("{n} yenilgi",{n:sayi(
p.losses)})];return Number(p.draws)&&l.push(\u00E7("{n} beraberlik",{n:sayi(p.draws)})),`<div class="liste-satir" data-oyunlar-puan="${esc(p.game)}"><span class="liste-ikon">${ikon(OYUN_IK[p.game]??"d\
ices")}</span>
        <div><b>${esc(oyunAdi(p.game))}</b><div class="alt">${esc(l.join(" \xB7 "))}${p.rank?" \xB7 "+esc(\u00E7("s\u0131ralamada {n}.",{n:sayi(p.rank)})):""}</div></div>
        <span class="oyunlar-puan">${esc(sayi(p.rating))}</span></div>`}async function siralamaCiz(taze=!1){const el=$("#oyunlar-liste",kap);if(!el)return;let l;try{l=await siralamaYukle(taze)}catch(e){
kapandi||(el.innerHTML=`<p class="kucuk">${esc(hataMetni(e))}</p>`);return}const el2=$("#oyunlar-liste",kap);if(kapandi||!el2||l.game!==sec.oyun)return;const min=Number(l.min_games??5),ben=l.me;el2.innerHTML=
`${(l.leaders??[]).length?`<ol class="oyunlar-siralama" data-oyun="${esc(l.game)}">${l.leaders.map(x=>`<li class="${x.me?"ben":""}" data-oyunlar-lider="${esc(x.character_id)}"><span class="oyunlar-sir\
a">${sayi(x.rank)}</span><span class="oyunlar-ad"><button type="button" class="baglanti oyunlar-kisi" data-profil="${esc(x.character_id)}">${esc(x.name)}</button>${x.country_id?`<small>${esc(ulkeAdi(x.
country_id))}</small>`:""}</span>
            <span class="oyunlar-puan">${esc(sayi(x.rating))}</span><small class="oyunlar-oyun">${esc(\u00E7("{n} oyun",{n:sayi(x.games)}))}</small></li>`).join("")}</ol>`:`<p class="bos">${esc(\u00E7(
"Hen\xFCz s\u0131ralamaya giren yok: en az {n} puanl\u0131 oyun gerekir.",{n:min}))}</p>`}
        <p class="kucuk">${esc(ben?.rank?\u00E7("Senin yerin: {n}. ({p} puan).",{n:sayi(ben.rank),p:sayi(ben.rating)}):\u00E7("S\u0131ralamaya girmek i\xE7in en az {n} puanl\u0131 oyun oynamal\u0131s\u0131n ({m}/{n}).",
{n:min,m:sayi(ben?.games??0)}))}</p>`;for(const b of $$("[data-profil]",el2))b.onclick=()=>profilAc(b.dataset.profil)}function bagla(){$("#oyunlar-kahvehane",kap)?.addEventListener("click",()=>sistem&&
MekanYolu.git(sistem.venue_id));for(const b of $$("[data-oyunlar-git]",kap))b.onclick=()=>MekanYolu.git(b.dataset.oyunlarGit);const sakla=()=>{try{localStorage.setItem("civora.oyunlar",JSON.stringify(
sec))}catch{}};for(const b of $$("[data-oyunlar-oyun]",kap))b.onclick=()=>{sec.oyun=b.dataset.oyunlarOyun,sakla(),secimYaz()};for(const b of $$("[data-oyunlar-kapsam]",kap))b.onclick=()=>{sec.kapsam=b.
dataset.oyunlarKapsam,sakla(),secimYaz()};for(const b of $$("[data-sezon-oyun]",kap))b instanceof HTMLButtonElement&&(b.onclick=()=>{sec.sezonOyun=b.dataset.sezonOyun,sakla(),sezonSecimYaz()});for(const b of $$(
"[data-sezon-kapsam]",kap))b instanceof HTMLButtonElement&&(b.onclick=()=>{sec.sezonKapsam=b.dataset.sezonKapsam,sakla(),sezonSecimYaz()});for(const b of $$("[data-oyunlar-izle]",kap))b.onclick=()=>masaIzlePenceresi(
b.dataset.oyunlarIzle)}async function sezonYukle(taze=!1){const a=sec.sezonOyun+"|"+sec.sezonKapsam;if(!taze&&sezonlar.has(a))return sezonlar.get(a);const l=await Masa.sezon(sec.sezonOyun,sec.sezonKapsam);
return sezonlar.set(a,l),l}async function sezonCiz(taze=!1){const el=$("#oyunlar-sezon-liste",kap);if(!el)return;sec.sezonKapsam==="sehir"&&!sehrim()&&(sec.sezonKapsam="ulke");let l;try{l=await sezonYukle(
taze)}catch(e){kapandi||(el.innerHTML=`<p class="kucuk">${esc(hataMetni(e))}</p>`);return}const el2=$("#oyunlar-sezon-liste",kap);if(kapandi||!el2||l.game!==sec.sezonOyun||l.scope==="city"!=(sec.sezonKapsam===
"sehir"))return;el2.innerHTML=kahveSezonIc(l,sec.sezonKapsam);const ust=$("#oyunlar-sezon-ust",kap);ust&&(ust.textContent=kahveSezonUst(l));const kart2=$("#oyunlar-sezon",kap);kart2&&(kart2.dataset.sezonNo=
String(l.season_no??""),kart2.dataset.sezonSatir=String((l.rows??[]).length));for(const b of $$("[data-profil]",el2))b.onclick=()=>profilAc(b.dataset.profil)}function sezonSecimYaz(){const kart2=$("#o\
yunlar-sezon",kap);if(!kart2)return;kart2.dataset.sezonOyun=sec.sezonOyun,kart2.dataset.sezonKapsam=sec.sezonKapsam;for(const b of $$("button[data-sezon-oyun]",kart2)){const a=b.dataset.sezonOyun===sec.
sezonOyun;b.classList.toggle("ikincil",!a),b.setAttribute("aria-selected",String(a))}for(const b of $$("button[data-sezon-kapsam]",kart2)){const a=b.dataset.sezonKapsam===sec.sezonKapsam;b.classList.toggle(
"ikincil",!a),b.setAttribute("aria-selected",String(a))}const el=$("#oyunlar-sezon-liste",kap);el&&(el.innerHTML=`<p class="kucuk">${\u00E7("Y\xFCkleniyor\u2026")}</p>`),sezonCiz()}function secimYaz(){
for(const b of $$("[data-oyunlar-oyun]",kap)){const a=b.dataset.oyunlarOyun===sec.oyun;b.classList.toggle("ikincil",!a),b.setAttribute("aria-selected",String(a))}for(const b of $$("[data-oyunlar-kapsa\
m]",kap)){const a=b.dataset.oyunlarKapsam===sec.kapsam;b.classList.toggle("ikincil",!a),b.setAttribute("aria-selected",String(a))}const el=$("#oyunlar-liste",kap);el&&(el.innerHTML=`<p class="kucuk">${\u00E7(
"Y\xFCkleniyor\u2026")}</p>`),siralamaCiz()}const tazele=tazeleyici(async()=>{await yukle(),siralamalar.clear(),sezonlar.clear(),ciz()});if(await yukle(),!kap.isConnected)return()=>{};ciz();const durumlar=new Map,
b1=Durum.dinle("olay",({olay,yuk})=>{if(olay==="board.invited"||olay==="board.ended"){tazele();return}if(olay==="board.update"){const d=yuk?.data??{},once=durumlar.get(d.game_id)??(r?.active?.game_id===
d.game_id?r.active.status:void 0);durumlar.set(d.game_id,d.status),d.game_id!==kartOyun&&once!==d.status&&tazele()}}),saat=setInterval(()=>{!document.hidden&&!kart&&tazele()},3e4);return()=>{kapandi=!0,
b1(),clearInterval(saat),kartBirak()}}}),Parcalar.tamam("ek_98zs_oyunlar");
