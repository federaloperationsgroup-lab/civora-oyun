// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_98zzd_futbol.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/futbol",{async ac(kap){let v=null,mac=null,hata=null,kapandi=!1,mesgul=!1,saatFarki=0,izlenen=null,sonCanli=0,sonGenel=0,yoklamaZaman=null,sonEvre=null;const saha=HaliSaha.ac(),ben=()=>Durum.
v.ozet?.character??{},R=()=>futbolKurali()??v?.rule??{},simdi=()=>Date.now()+saatFarki,me=()=>v?.me??{},git=sec=>$(sec,kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"});saha.
dinle("sec",(ad,id)=>{if(ad==="kisi"&&id){profilAc(id);return}if(ad==="ben"){git("#futbol-ben");return}git("#futbol-macim")});const sonBiten=()=>{const x=(v?.history??[])[0],bitis=x?Date.parse(x.starts_at)+
futbolZaman().son:0;return x&&x.status==="finished"&&x.player_status==="played"&&simdi()-bitis<15*6e4?x.id:null},gosterilen=()=>izlenen??me().current??sonBiten()??(v?.program??[]).find(x=>["live","loc\
ked","closing"].includes(x.phase))?.id??null;let saat={rtt:1/0,an:0};const saatOrnek=(zaman,t0,t1)=>{if(!zaman)return;const rtt=t1-t0,fark=Date.parse(zaman)-(t0+t1)/2;Number.isFinite(fark)&&(rtt<=saat.
rtt||Date.now()-saat.an>6e4)&&(saat={rtt,an:Date.now()},saatFarki=fark)},zamanli=async(fn,args)=>{const t0=Date.now(),x=await Sunucu.cagir(fn,args);return saatOrnek(x?.server_time,t0,Date.now()),x};async function yukle(){
try{const[x]=await Promise.all([zamanli("football"),Durum.kurallar().catch(()=>null)]);v=x,sonGenel=Date.now();const id=gosterilen();izlenen&&!(v.program??[]).some(p=>p.id===izlenen)&&!(v.recent??[]).
some(p=>p.id===izlenen)&&(izlenen=null),id?v.mine?.id===id?mac=v.mine:mac=await zamanli("football_match",{p_match:id}).catch(()=>null):mac=null,hata=null}catch(e){hata=e}}async function canliYukle(){const id=gosterilen();
if(id)try{const x=await zamanli("football_match",{p_match:id});if(kapandi)return;mac=x,v&&v.mine?.id===x.id&&(v.mine=x),sonCanli=Date.now()}catch{}}const oyuncular=()=>futbolKadro(mac?.players??[]);function kadroHtml(m){
const l=oyuncular(),r=R(),takim=s=>{const t=l.filter(o=>o.taraf===s).sort((x,y)=>x.yer-y.yer),satir=o=>{const ic=`<span class="futbol-forma" style="--forma:${futbolForma(o)}">${esc(FUTBOL_POS_KISA[o.mevki]??
"")}</span>
            <div><b>${esc(o.ben?\u00E7("Sen"):o.ad??\u00E7("Ad\u0131n\u0131 gizleyen biri"))}</b><div class="alt">${esc([futbolPosAdi(o.mevki),o.bot?\u00E7("mahalleden yedek"):null,o.guc!=null?\u00E7(
"g\xFC\xE7 {n}",{n:sayi(o.guc)}):null,o.gol?\u00E7("{n} gol",{n:sayi(o.gol)}):null,o.asist?\u00E7("{n} asist",{n:sayi(o.asist)}):null,o.kurtaris?\u00E7("{n} kurtar\u0131\u015F",{n:sayi(o.kurtaris)}):null].
filter(Boolean).join(" \xB7 "))}</div></div>
            ${o.ben?`<span class="cip altin kucuk-cip">${\u00E7("Sen")}</span>`:"<span></span>"}`;return o.id&&!o.ben?`<button type="button" class="liste-satir" data-futbol-kisi="${esc(o.id)}">${ic}</\
button>`:`<div class="liste-satir">${ic}</div>`},alinan=t.map(o=>o.mevki),bos=!m.players?.some(p=>p.slot!=null)&&["open","closing"].includes(m.phase)?Math.max(0,Number(r.team?.size??5)-t.length):0,kap2=futbolTarafAdi(
s),taktik=m[`tactic_${s}`];return`<div class="futbol-takim" data-futbol-takim="${s}"><div class="futbol-takim-bas"><span class="futbol-renk" style="--forma:${FUTBOL_RENK[s]}"></span><b>${esc(kap2)}</b\
>
            <span class="cip kucuk-cip">${ikon(FUTBOL_TAKTIK_IK[taktik]??"scale")}${esc(futbolTaktikAdi(taktik))}</span></div>
          <div class="liste">${t.map(satir).join("")}${bos?`<div class="liste-satir futbol-bos"><span class="futbol-forma bos">+</span><div><div class="alt" style="margin:0">${esc(\u00E7("{n} bo\u015F yer;\
 bo\u015F kalan yere kilitte mahalleden yedek girer",{n:sayi(bos)}))}</div>
            ${["kaleci","defans","orta","forvet"].filter(p=>futbolYerVar(r,alinan,p)).length?`<div class="alt">${esc(\u00E7("Yer var: {l}",{l:["kaleci","defans","orta","forvet"].filter(p=>futbolYerVar(
r,alinan,p)).map(futbolPosAdi).join(", ")}))}</div>`:""}</div><span></span></div>`:""}</div></div>`};return`<div class="futbol-kadro">${takim("a")}${takim("b")}</div>`}function olaylarHtml(m){const l=oyuncular(),
el=futbolEl({bas:Date.parse(m.starts_at)},simdi()),ev=(m.events??[]).filter(e=>m.phase==="finished"||e.t+2e3<=el).slice().reverse();return ev.length?`<div class="liste futbol-olaylar">${ev.map(e=>{const y=futbolOlayYazi(
e,l),benSut=e.decided_a&&l.find(o=>o.taraf===e.s&&o.yer===e.sh)?.ben,kararim=e.decided_g&&l.find(o=>o.taraf!==e.s&&o.yer===0)?.ben?\u00E7("Senin karar\u0131n: {k}",{k:futbolKararAdi(e.keeper,"gk")})+(e.
okG?" \xB7 "+\u00E7("do\u011Fru karar"):""):benSut?\u00E7("Senin karar\u0131n: {k}",{k:futbolKararAdi(e.attack,"att")})+(e.okA?" \xB7 "+\u00E7("do\u011Fru karar"):""):"";return`<div class="liste-satir${y.
soluk?" soluk":""}${y.gol?" gol":""}" data-futbol-olay="${e.i}"><span class="liste-ikon ${y.gol?"altin":""}">${ikon(y.ik)}</span>
          <div><div class="alt" style="margin:0"><b>${sayi(e.minute??0)}'</b> ${esc(y.metin)}</div>${kararim?`<div class="alt" data-futbol-kararim>${esc(kararim)}</div>`:""}</div>
          <span class="futbol-skor-kucuk">${sayi(e.score_a)}\u2013${sayi(e.score_b)}</span></div>`}).join("")}</div>`:`<p class="kucuk">${esc(m.phase==="live"?\u00E7("\u0130lk atak birazdan."):\u00E7(
"Ma\xE7ta olay yok."))}</p>`}function macimHtml(){const m=mac,mineMi=m&&m.me;if(!m)return"";const r=R(),fee=Number(m.fee_cr??r.feeCr??200),kaptan=m.captain,acik=m.phase==="open",el=futbolEl({bas:Date.
parse(m.starts_at)},simdi()),yazi=m.phase==="open"?\u00E7("Kadro ma\xE7tan {dk} dakika \xF6nce kilitlenir. O an \u015Fehirde olmayan gelmedi say\u0131l\u0131r (\xFCcreti d\xF6ner), bo\u015F yerlere mahalleden yedek girer.",
{dk:sayi(Math.round(Number(r.pitch?.lockSeconds??120)/60))}):m.phase==="closing"?\u00E7("Kadro kilitleniyor; birazdan yedekler yerine ge\xE7er."):m.phase==="locked"?\u00E7("Kadrolar kilitlendi; ba\u015Flam\
a saati {saat}. Atak sana gelince ekran\u0131n alt\u0131nda karar penceresi a\xE7\u0131l\u0131r.",{saat:saatKisa(m.starts_at)}):m.phase==="live"?m.break?\u00E7("Devre aras\u0131; ikinci devrede tak\u0131mlar ye\
r de\u011Fi\u015Ftirir."):\u00E7("Ma\xE7 s\xFCr\xFCyor ({devre}. devre). Atak sana gelince karar penceresi a\xE7\u0131l\u0131r; 6 saniyen var.",{devre:sayi(m.half??1)}):m.phase==="cancelled"?m.cancel_reason===
"too_few"?\u00E7("Yeterli oyuncu gelmedi\u011Fi i\xE7in ma\xE7 iptal edildi; \xFCcretler d\xF6nd\xFC."):\u00E7("Herkes ayr\u0131ld\u0131\u011F\u0131 i\xE7in ma\xE7 iptal edildi."):"",skor=["live","end\
ed","finished"].includes(m.phase)?`<div class="futbol-skor" data-futbol-skor="${sayi(m.score_a??0)}-${sayi(m.score_b??0)}"><span style="--forma:${FUTBOL_RENK.a}">${esc(futbolTarafAdi("a"))}</span>
          <b>${sayi(m.score_a??0)} \u2013 ${sayi(m.score_b??0)}</b><span style="--forma:${FUTBOL_RENK.b}">${esc(futbolTarafAdi("b"))}</span>
          <small>${esc(m.phase==="finished"||m.phase==="ended"?\u00E7("Ma\xE7 sonu"):m.break?\u00E7("Devre aras\u0131"):\u00E7("{dk}. dakika",{dk:sayi(m.minute??futbolDakika(el))}))}</small></div>`:"",
benO=oyuncular().find(o=>o.ben);let sonuc="";if(m.phase==="finished"&&benO){const a=Number(m.score_a??0),b=Number(m.score_b??0),bizim=benO.taraf==="a"?a:b,onlar=benO.taraf==="a"?b:a,kazanc=(m.players??
[]).find(p=>p.me)?.skill_gain;sonuc=`<div class="bilgi-kutusu ${bizim>onlar?"":"uyari-kutusu"}" style="margin-top:10px" data-futbol-sonuc="${bizim>onlar?"galibiyet":bizim===onlar?"beraberlik":"maglubi\
yet"}">${ikon(bizim>onlar?"trophy":bizim===onlar?"scale":"shield")}<span>
          ${esc(bizim>onlar?\u00E7("Kazand\u0131n\u0131z {a}\u2013{b}!",{a:bizim,b:onlar}):bizim===onlar?\u00E7("Berabere {a}\u2013{b}.",{a:bizim,b:onlar}):\u00E7("Kaybettiniz {a}\u2013{b}.",{a:bizim,
b:onlar}))}
          ${esc([benO.gol?\u00E7("{n} gol",{n:sayi(benO.gol)}):null,benO.asist?\u00E7("{n} asist",{n:sayi(benO.asist)}):null,benO.kurtaris?\u00E7("{n} kurtar\u0131\u015F",{n:sayi(benO.kurtaris)}):null,
kazanc?\u00E7("futbol becerin +{n}",{n:sayi(kazanc)}):null].filter(Boolean).join(" \xB7 "))}</span></div>`}const adam=m.motm?`<p class="kucuk" data-futbol-adam="${m.motm.me?"ben":"1"}">${ikon("star")}\
 ${esc(m.motm.me?\u00E7("Ma\xE7\u0131n adam\u0131 sensin!"):\u00E7("Ma\xE7\u0131n adam\u0131: {ad}",{ad:m.motm.name??\u00E7("ad\u0131n\u0131 gizleyen biri")}))}</p>`:"",taktikSec=kaptan&&acik?`<div cl\
ass="futbol-taktik" role="group" aria-label="${esc(\u00E7("Tak\u0131m\u0131n takti\u011Fi"))}">${["hucum","dengeli","savunma"].map(t=>`<button type="button" class="cip-dugme${m[`tactic_${kaptan}`]===t?
" secili":""}" data-futbol-taktik="${t}" aria-pressed="${m[`tactic_${kaptan}`]===t}" ${mesgul?"disabled":""}>${ikon(FUTBOL_TAKTIK_IK[t])}${esc(futbolTaktikAdi(t))}</button>`).join("")}</div>
        <p class="kucuk">${esc(\u00E7("Kaptans\u0131n (tak\u0131m\u0131na ilk kat\u0131lan). H\xFCcum topla daha \xE7ok atak eder ama f\u0131rsat da verir; savunma tersi."))}</p>`:"";return`<section c\
lass="kart" id="futbol-macim" data-futbol-mac="${esc(m.id)}" data-futbol-evre="${esc(m.phase)}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(mineMi?\u00E7("Ma\xE7\u0131n"):\u00E7("\u0130zledi\u011Fin ma\xE7"))} \xB7 ${esc(bolgeAdi(m.region_id))} \xB7 ${esc(\u00E7("saha {n}",{n:sayi(
m.pitch)}))}</p>
          <h2 class="b2">${ikon("goal")} ${esc(\u00E7("{saat} ma\xE7\u0131",{saat:saatKisa(m.starts_at)}))}</h2></div>
          <span class="cip ${futbolEvreRenk(m.phase)}">${esc(futbolEvreAdi(m.phase))}</span></div>
        ${skor}
        ${yazi?`<p class="kucuk">${esc(yazi)}</p>`:""}
        ${!m.watch&&m.phase==="live"?`<p class="bilgi-kutusu" style="margin-top:6px">${ikon("map-pin")}<span>${esc(\u00E7("Ma\xE7\u0131 izlemek i\xE7in \u015Fehirde olmal\u0131s\u0131n; sonucu ma\xE7 bitince g\xF6r\xFCn\xFCr."))}\
</span></p>`:""}
        ${kadroHtml(m)}
        ${taktikSec}
        ${["live","ended","finished"].includes(m.phase)?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Ma\xE7\u0131n ak\u0131\u015F\u0131")}</p>${olaylarHtml(m)}`:""}
        ${adam}${sonuc}
        <div class="oneri-dugmeler" style="margin-top:10px">
          ${mineMi&&acik?`<button class="dugme sade" id="futbol-ayril" ${mesgul?"disabled":""}>${ikon("door-open")}${\u00E7("Ma\xE7tan ayr\u0131l")}</button>`:""}
          ${izlenen&&izlenen!==me().current?`<button class="dugme sade" id="futbol-izleme-birak">${ikon("x")}${\u00E7("\u0130zlemeyi b\u0131rak")}</button>`:""}
        </div>
        ${mineMi&&acik?`<p class="kucuk">${esc(\u00E7("Ayr\u0131l\u0131rsan {kr} kredi \xFCcretin geri d\xF6ner.",{kr:kr(fee)}))}</p>`:""}
      </section>`}function programHtml(){const l=(v.program??[]).filter(x=>x.phase!=="finished"),r=R(),m=me(),katilabilir=!m.current&&Number(m.left_today??0)>0&&Number(m.credit??0)>=Number(r.feeCr??200)&&
!!v.here;return`<section class="kart" id="futbol-program">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(v.here?bolgeAdi(v.here):\u00E7("Yoldas\u0131n"))}</p><h2 class="b2">${\u00E7("Ma\xE7 program\u0131")}</h2></div><span class="ik-kutu">${ikon(
"calendar-days")}</span></div>
        ${l.length?`<div class="liste">${l.map(x=>{const benim=!!x.me,say=s=>Number(x.counts?.[s]??0),dolu=say("a")+say("b")>=2*Number(r.team?.size??5),dugme=benim?`<span class="cip altin kucuk-cip">${\u00E7(
"Senin ma\xE7\u0131n")}</span>`:x.phase==="open"&&!dolu?`<button class="dugme ${katilabilir?"altin":"ikincil"} kucuk-d" data-futbol-katil="${esc(x.id)}" ${!katilabilir||mesgul?"disabled":""}>${ikon("u\
ser-round-plus")}${\u00E7("Kat\u0131l")}</button>`:["live","locked","closing"].includes(x.phase)?`<button class="dugme sade kucuk-d" data-futbol-izle="${esc(x.id)}">${ikon("eye")}${\u00E7("\u0130zle")}\
</button>`:`<span class="cip kucuk-cip">${esc(futbolEvreAdi(x.phase))}</span>`;return`<div class="liste-satir" data-futbol-program="${esc(x.id)}"><span class="liste-ikon ${x.phase==="live"?"mercan":""}\
">${ikon(x.phase==="live"?"volleyball":"goal")}</span>
            <div><b>${esc(\u00E7("{saat} \xB7 saha {n}",{saat:saatKisa(x.starts_at),n:sayi(x.pitch)}))}</b><div class="alt">${esc([futbolEvreAdi(x.phase),\u00E7("Turuncular {a}/5 \xB7 Maviler {b}/5",{
a:sayi(say("a")),b:sayi(say("b"))}),x.phase==="live"&&x.score_a!=null?`${x.score_a}\u2013${x.score_b}`:null].filter(Boolean).join(" \xB7 "))}</div></div>${dugme}</div>`}).join("")}</div>`:`<p class="b\
os">${esc(v.here?\u00E7("\xD6n\xFCm\xFCzdeki 48 saatte ma\xE7 yok. \u0130lk ma\xE7\u0131 sen kur!"):\u00E7("Bir \u015Fehre var\u0131nca o \u015Fehrin ma\xE7lar\u0131n\u0131 g\xF6r\xFCrs\xFCn."))}</p>`}\

        ${!katilabilir&&v.here&&!m.current?`<p class="kucuk">${esc(Number(m.left_today??0)<=0?FUTBOL_SART.FOOTBALL_DAILY:FUTBOL_SART.FOOTBALL_NO_MONEY)}</p>`:""}
      </section>`}function saatler(){const r=R(),p=r.pitch??{},adim=Number(p.slotMinutes??15)*6e4,ilk=Math.ceil((simdi()+Number(p.minLeadMinutes??10)*6e4)/adim)*adim,son=simdi()+Number(p.maxLeadHours??
48)*36e5,dolu=new Map;for(const x of v.program??[]){const t=Date.parse(x.starts_at);dolu.set(t,(dolu.get(t)??0)+1)}const l=[];for(let t=ilk;t<=son;t+=adim)l.push({t,dolu:(dolu.get(t)??0)>=Number(p.count??
2)});return l}function kurHtml(){const r=R(),m=me(),fee=Number(r.feeCr??200),neden=v.here?m.current?"FOOTBALL_BUSY":Number(m.left_today??0)<=0?"FOOTBALL_DAILY":Number(m.credit??0)<fee?"FOOTBALL_NO_MON\
EY":null:"FOOTBALL_TRAVELING",nereye=v.fee_to==="municipality"?\u00E7("belediye b\xFCt\xE7esine"):\u00E7("\xFClkenin hazinesine");return`<section class="kart" id="futbol-kur">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Yeni ma\xE7")}</p><h2 class="b2">${\u00E7("Ma\xE7 kur")}</h2></div>
          <span class="cip ${Number(m.left_today??0)>0?"yesil":"mercan"}" data-futbol-hak="${sayi(m.left_today??0)}">${esc(\u00E7("Bug\xFCn {n}/{m} hak",{n:sayi(m.left_today??0),m:sayi(r.perDay??3)}))}\
</span></div>
        <p class="kucuk">${esc(\u00E7("5'e 5, iki devre (11 dakika). Kat\u0131lmak {kr} kredi ({nereye}); g\xFCnde en \xE7ok {n} ma\xE7. Kuran Turuncular'da ba\u015Flar ve kaptand\u0131r.",{kr:kr(fee),
nereye,n:sayi(r.perDay??3)}))}</p>
        ${neden?`<div class="bilgi-kutusu uyari-kutusu" id="futbol-sart" data-sart="${neden}" style="margin-top:8px">${ikon(neden==="FOOTBALL_TRAVELING"?"route":neden==="FOOTBALL_NO_MONEY"?"coins":"ho\
urglass")}<span>${esc(FUTBOL_SART[neden])}
          ${neden==="FOOTBALL_TRAVELING"?` <button class="baglanti" type="button" data-git="sehir/yol">${\u00E7("Seyahat")}</button>`:""}</span></div>`:`<button class="dugme altin" id="futbol-kur-ac" \
style="margin-top:8px" ${mesgul?"disabled":""}>${ikon("calendar-plus")}${\u00E7("Ma\xE7 kur")}</button>`}
        <p class="kucuk" style="margin-top:8px">${esc(\u00E7("Kredin {k}.",{k:kr(m.credit??0)}))}</p>
      </section>`}function benHtml(){const m=me(),r=R(),beceri=Number(m.skill??0),mx=Number(r.skill?.max??100),madalyalar=(Durum.v.kurallar?.data?.medal?.medals??[]).filter(x=>["golcu","halisaha","mac\
in_adami"].includes(x.id)),say={golcu:Number(m.goals??0),halisaha:Number(m.matches??0),macin_adami:Number(m.motm??0)};return`<section class="kart" id="futbol-ben" data-beceri="${beceri}" data-mac="${Number(
m.matches??0)}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sen")}</p><h2 class="b2">${esc(\u00E7("Futbol becerisi {n}",{n:sayi(beceri)}))}</h2></div><span class="ik-kutu">${ikon("shirt")}</span>\
</div>
        <div class="cubuk altin"><i style="width:${Math.min(100,beceri/Math.max(1,mx)*100).toFixed(1)}%"></i></div>
        <p class="kucuk" style="margin-top:6px">${esc(\u00E7("Beceri 0\u2013{m}: her ma\xE7 +{a}, galibiyet +{b}, ma\xE7\u0131n adam\u0131 +{c}. G\xFCc\xFCn beceriden, atletik seviyenden ve formundan (spor salonu).",
{m:sayi(mx),a:sayi(r.skill?.match??3),b:sayi(r.skill?.win??1),c:sayi(r.skill?.motm??1)}))}</p>
        <div class="etkinlik-sayac" style="margin-top:10px">${[["goal",\u00E7("Ma\xE7"),m.matches??0],["trophy",\u00E7("Galibiyet"),m.wins??0],["volleyball",\u00E7("Gol"),m.goals??0],["share-2",\u00E7(
"Asist"),m.assists??0],["hand-grab",\u00E7("Kurtar\u0131\u015F"),m.saves??0],["star",\u00E7("Ma\xE7\u0131n adam\u0131"),m.motm??0],["sparkles",\u00E7("Hat-trick"),m.hattricks??0],["scale",\u00E7("Bera\
berlik"),m.draws??0]].map(([ik,ad,n])=>`<div>${ikon(ik)}<b>${sayi(n)}</b><small>${esc(ad)}</small></div>`).join("")}</div>
        ${m.position?`<p class="kucuk">${esc(\u00E7("En \xE7ok oynad\u0131\u011F\u0131n mevki: {m}.",{m:futbolPosAdi(m.position)}))}</p>`:""}
        ${madalyalar.length?`<p class="kucuk">${esc(madalyalar.map(x=>{const sira=(x.tiers??[]).find(t=>say[x.id]<t);return sira?\u00E7("{madalya}: s\u0131radaki basama\u011Fa {n}",{madalya:\u00E7v(x.
name),n:sayi(sira-say[x.id])}):\u00E7("{madalya}: b\xFCt\xFCn basamaklar",{madalya:\u00E7v(x.name)})}).join(" \xB7 "))}</p>`:""}
        ${m.mood?`<p class="kucuk">${ikon("face-grinning")} ${esc(\u00E7("Bug\xFCnk\xFC spor keyfi {a} / {b}.",{a:sayi(m.mood.today??0),b:sayi(m.mood.cap??0)}))}</p>`:""}
        <button class="baglanti" type="button" data-git="sehir/spor">${ikon("dumbbell")} ${\u00E7("Spor salonunda atletik seviyeni ve formunu art\u0131r")}</button>
      </section>`}function golculerHtml(){const l=v.scorers??[];return`<section class="kart" id="futbol-golculer">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(v.here?bolgeAdi(v.here):\u00E7("Yoldas\u0131n"))} \xB7 ${\u00E7("son 7 g\xFCn")}</p><h2 class="b2">${\u00E7("Haftan\u0131n golc\xFCleri")}<\
/h2></div><span class="ik-kutu">${ikon("trophy")}</span></div>
        ${l.length?`<div class="liste">${l.map((x,i)=>{const ic=`<span class="liste-ikon ${i===0?"altin":""}">${i===0?ikon("trophy"):`<b>${i+1}</b>`}</span>
            <div><b>${esc(x.me?\u00E7("Sen"):x.name??\u00E7("Ad\u0131n\u0131 gizleyen biri"))}</b><div class="alt">${esc(\u00E7("{g} gol \xB7 {m} ma\xE7",{g:sayi(x.goals),m:sayi(x.matches)}))}</div></\
div><span></span>`;return x.character_id&&!x.me?`<button type="button" class="liste-satir" data-futbol-kisi="${esc(x.character_id)}">${ic}</button>`:`<div class="liste-satir">${ic}</div>`}).join("")}<\
/div>`:`<p class="bos">${esc(\u00E7("Bu hafta hen\xFCz gol yok."))}</p>`}
      </section>`}function sonuclarHtml(){const l=v.recent??[];return`<section class="kart" id="futbol-sonuclar">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(v.here?bolgeAdi(v.here):\u00E7("Yoldas\u0131n"))}</p><h2 class="b2">${\u00E7("Son ma\xE7lar")}</h2></div><span class="ik-kutu">${ikon("scro\
ll-text")}</span></div>
        ${l.length?`<div class="liste">${l.map(x=>`<button type="button" class="liste-satir" data-futbol-izle="${esc(x.id)}"><span class="liste-ikon">${ikon("goal")}</span>
          <div><b>${esc(\u00E7("{a}\u2013{b} \xB7 {saat}",{a:sayi(x.score_a??0),b:sayi(x.score_b??0),saat:saatYaz(x.starts_at)}))}</b><div class="alt">${esc([\u00E7("saha {n}",{n:sayi(x.pitch)}),x.motm?
\u00E7("ma\xE7\u0131n adam\u0131 {ad}",{ad:x.motm}):null,x.me?\u00E7("sen oynad\u0131n"):null].filter(Boolean).join(" \xB7 "))}</div></div><span class="cip kucuk-cip">${ikon("eye")}${\u00E7("Tekrar")}\
</span></button>`).join("")}</div>`:`<p class="bos">${esc(\u00E7("Bu \u015Fehirde hen\xFCz biten ma\xE7 yok."))}</p>`}
      </section>`}function gecmisHtml(){const l=v.history??[];return`<section class="kart" id="futbol-gecmis">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ge\xE7mi\u015F")}</p><h2 class="b2">${\u00E7("Son ma\xE7lar\u0131n")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></di\
v>
        ${l.length?`<div class="liste">${l.map(x=>{const bizim=x.side==="a"?x.score_a:x.score_b,onlar=x.side==="a"?x.score_b:x.score_a,durum=x.player_status==="no_show"?\u00E7("gelmedin (\xFCcret d\xF6nd\xFC)"):
x.status==="cancelled"?\u00E7("iptal"):bizim>onlar?\u00E7("galibiyet"):bizim===onlar?\u00E7("beraberlik"):\u00E7("ma\u011Flubiyet");return`<div class="liste-satir" data-futbol-gecmis="${esc(x.player_status)}\
"><span class="liste-ikon">${ikon(x.motm?"star":x.status==="finished"?"goal":"x")}</span>
            <div><b>${esc(x.status==="finished"&&x.player_status==="played"?\u00E7("{a}\u2013{b} {d}",{a:sayi(bizim??0),b:sayi(onlar??0),d:durum}):durum)}</b>
            <div class="alt">${esc([saatYaz(x.starts_at),bolgeAdi(x.region_id),futbolPosAdi(x.pos),x.goals?\u00E7("{n} gol",{n:sayi(x.goals)}):null,x.assists?\u00E7("{n} asist",{n:sayi(x.assists)}):null,
x.saves?\u00E7("{n} kurtar\u0131\u015F",{n:sayi(x.saves)}):null,x.skill_gain?\u00E7("beceri +{n}",{n:sayi(x.skill_gain)}):null,x.motm?\u00E7("ma\xE7\u0131n adam\u0131"):null].filter(Boolean).join(" \xB7 "))}\
</div></div><span></span></div>`}).join("")}</div>`:`<p class="bos">${\u00E7("Hen\xFCz ma\xE7 oynamad\u0131n.")}</p>`}
      </section>`}function kurallarHtml(){const r=R(),p=r.pitch??{},t=r.team??{},mt=r.match??{},maddeler=[["goal",\u00E7("Her \u015Fehrin belediyesinin {n} hal\u0131 sahas\u0131 var. Ma\xE7\u0131 \u015Fehirdeki herkes kurar: \xE7ey\
rek saat ba\u015Flar\u0131nda, en erken {a} dakika, en ge\xE7 {b} saat sonras\u0131na; ayn\u0131 saatte en \xE7ok {n} ma\xE7.",{n:sayi(p.count??2),a:sayi(p.minLeadMinutes??10),b:sayi(p.maxLeadHours??48)})],
["users-round",\u00E7("5'e 5: kaleci ve d\xF6rt oyuncu (defans, orta saha, forvet; mevki ba\u015F\u0131na en \xE7ok 2). Tak\u0131m\u0131na ilk kat\u0131lan kaptand\u0131r, takti\u011Fi se\xE7er (h\xFCcum, dengeli, savunma). Birbirini tan\u0131yanlar (y\
ak\u0131nl\u0131k) tak\u0131ma uyum katar.")],["coins",\u00E7("Kat\u0131lmak {kr} kredi; g\xFCnde en \xE7ok {n} ma\xE7. Kadro ma\xE7tan {dk} dakika \xF6nce kilitlenir: \u015Fehirde olmayan gelmedi say\u0131l\u0131r, \xFCcreti d\xF6ner; bo\u015F y\
erlere mahalleden (daha zay\u0131f) yedek girer. Her tak\u0131mda en az bir, toplam en az iki oyuncu yoksa ma\xE7 iptal, \xFCcretler d\xF6ner.",{kr:kr(r.feeCr??200),n:sayi(r.perDay??3),dk:sayi(Math.round(
Number(p.lockSeconds??120)/60))})],["timer",\u00E7("Ma\xE7 iki devre, her devre {dk} dakika (oyunda {od} dakika), arada {ara} dakika; her devrede {n} atak. \u0130kinci devrede tak\u0131mlar yer de\u011Fi\u015Ftirir.",
{dk:sayi(Math.round(Number(mt.halfSeconds??300)/60)),od:sayi(mt.minutesPerHalf??25),ara:sayi(Math.round(Number(mt.breakSeconds??60)/60)),n:sayi(mt.attacksPerHalf??12)})],["zap",\u00E7("B\xFCy\xFCk f\u0131rsatta \
\u015Fut\xE7u karar verir: \u015Fut, pas ya da \xE7al\u0131m. Durum en iyisini s\xF6yler: \xF6n\xFCn a\xE7\u0131ksa \u015Fut, defans \xFCst\xFCne geliyorsa \xE7al\u0131m, arkada\u015F\u0131n bo\u015Ftaysa pas.")],
["hand-grab",\u00E7("Her \u015Futta kaleci karar verir: sola uzan, bekle, sa\u011Fa uzan. \u015Eut\xE7unun bakt\u0131\u011F\u0131 k\xF6\u015Fe ipucudur (\xE7o\u011Fu zaman do\u011Fru). Penalt\u0131da \u015Fut\xE7u k\xF6\u015Feyi, kaleci y\xF6n\xFC se\xE7er.")],
["hourglass",\u00E7("Karar i\xE7in {sn} saniyen var; vermezsen becerine g\xF6re biri senin yerine se\xE7er. Do\u011Fru kararlar ma\xE7\u0131n adam\u0131 puan\u0131na say\u0131l\u0131r.",{sn:sayi(Math.
round(Number(r.decisionMs??6e3)/1e3))})],["star",\u00E7("Ma\xE7\u0131n adam\u0131: gol {g}, asist {a}, kurtar\u0131\u015F {k}, do\u011Fru karar {d} puan. Madalyalar: Golc\xFC (gol), Hal\u0131 Saha (ma\xE7), Ma\xE7\u0131n Adam\u0131. Para \xF6d\xFCl\xFC ve bahis\
 yok.",{g:sayi(r.motm?.goal??3),a:sayi(r.motm?.assist??2),k:sayi(r.motm?.save??1),d:sayi(r.motm?.decision??1)})]];return`<section class="kart" id="futbol-kurallar"><div class="kart-bas"><div><p class=\
"ust-yazi">${\u00E7("Kurallar")}</p><h2 class="b2">${\u00E7("Hal\u0131 saha nas\u0131l i\u015Fler?")}</h2></div><span class="ik-kutu">${ikon("book-open")}</span></div>
        <div class="liste">${maddeler.map(([ik,x])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(x)}</div></div><span></span></div>`).
join("")}</div>
      </section>`}const KP=futbolKararPenceresi({fn:"football_choose",simdi,rtt:()=>saat.rtt,mac:()=>mac,oyuncular}),kararAc=m=>KP.ac(m),kararKapat=()=>KP.kapat();function sahneYaz(){const sonraki=(v?.
program??[]).find(x=>x.phase==="open"||x.phase==="closing");saha.yaz({mac,ben:{id:ben().id},saatFarki,bolge:v?.here??null,sonrakiMac:sonraki?Date.parse(sonraki.starts_at):null,yolda:!v?.here})}function ciz(){
if(kapandi)return;if(hata&&!v){kap.innerHTML=`<div class="sayfa"><div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(hata))}</span></div>
          <button class="dugme ikincil" style="margin-top:14px" id="futbol-yeniden">${\u00E7("Yeniden dene")}</button></div>`,$("#futbol-yeniden",kap).onclick=()=>tazele();return}const burada=!!v.here;
kap.innerHTML=`<div class="sayfa" data-futbol-bolge="${esc(v.here??"")}">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${esc(burada?\u00E7("{sehir} hal\u0131 sahas\u0131",{sehir:bolgeAdi(v.here)}):\u00E7("Hal\u0131 saha"))}\
</h1>
          <p class="aciklama">${\u00E7("5'e 5 ma\xE7lar: kur ya da kat\u0131l, sahada karar ver, gol at. Futbol becerin ma\xE7 ma\xE7 geli\u015Fir.")}</p></div>
          <span class="cip ${burada?"yesil":""}" id="futbol-burada">${ikon("map-pin")}${esc(burada?\u00E7("\u015Eehirdesin"):\u00E7("Yoldas\u0131n"))}</span></div>
        <div id="futbol-saha-yer"></div>
        <div class="izgara iki futbol-izgara" style="margin-top:20px">
          <div class="yigin">${macimHtml()}${programHtml()}${kurHtml()}</div>
          <div class="yigin">${benHtml()}${golculerHtml()}${sonuclarHtml()}${gecmisHtml()}${kurallarHtml()}</div>
        </div></div>`,$("#futbol-saha-yer",kap)?.replaceWith(saha.el),sahneYaz(),bagla(),mac?.decision&&kararAc(mac)}function canliCiz(){if(kapandi)return;const k=$("#futbol-macim",kap);if(k&&mac){const yeni=document.
createElement("div");yeni.innerHTML=macimHtml();const el=yeni.firstElementChild;el&&el.outerHTML!==k.outerHTML&&(k.replaceWith(el),bagla())}else if(mac&&!k){ciz();return}sahneYaz(),mac?.decision?kararAc(
mac):KP.karar&&!(mac?.events??[]).some(x=>x.i===KP.karar.k.i)&&futbolEl({bas:Date.parse(KP.karar.m.starts_at)},simdi())<KP.karar.k.opens-4e3&&kararKapat()}async function isle(fn,basari){if(!mesgul){mesgul=
!0;try{const y=await fn();if(kapandi)return;basari?.(y),Durum.ozet().catch(()=>{}),await yukle()}catch(e){tost(hataMetni(e),"circle-alert"),await yukle().catch(()=>{})}finally{mesgul=!1,kapandi||ciz()}}}
function katilPencere(id){const x=(v.program??[]).find(p=>p.id===id);if(!x)return;const r=R(),secenek=[];for(const s of["a","b"])for(const p of["kaleci","defans","orta","forvet"]){const alinan=x.taken?.[s]??
[];secenek.push({s,p,bos:futbolYerVar(r,alinan,p)})}const ilk=secenek.find(o=>o.bos&&o.p!=="kaleci")??secenek.find(o=>o.bos);pencereForm({ust:\u00E7("{saat} \xB7 saha {n}",{saat:saatKisa(x.starts_at),
n:sayi(x.pitch)}),baslik:\u00E7("Ma\xE7a kat\u0131l"),onayAd:\u00E7("Kat\u0131l ({kr} kredi)",{kr:kr(r.feeCr??200)}),onayIkon:"user-round-plus",govde:`<p class="aciklama">${esc(\u00E7("Tak\u0131m\u0131n\u0131 ve mev\
kini se\xE7. Kilitten \xF6nce ayr\u0131l\u0131rsan \xFCcretin d\xF6ner; ma\xE7 ba\u015Flarken \u015Fehirde olmal\u0131s\u0131n."))}</p>
          ${["a","b"].map(s=>`<p class="ust-yazi" style="margin-top:10px"><span class="futbol-renk" style="--forma:${FUTBOL_RENK[s]}"></span> ${esc(futbolTarafAdi(s))} \xB7 ${esc(\u00E7("{n}/5",{n:sayi(
x.counts?.[s]??0)}))}</p>
            <div class="secim-liste" role="radiogroup" aria-label="${esc(futbolTarafAdi(s))}">${secenek.filter(o=>o.s===s).map(o=>`<label class="secim-satir${o.bos?"":" kapali"}">
              <input type="radio" name="yer" value="${s}|${o.p}" ${o.bos?"":"disabled"} ${ilk&&ilk.s===s&&ilk.p===o.p?"checked":""}>
              <span><b>${esc(futbolPosAdi(o.p))}</b> <small>${esc(o.bos?o.p==="kaleci"?\u00E7("\u015Eutlarda sen karar verirsin"):o.p==="forvet"?\u00E7("F\u0131rsatlar \xE7o\u011Fu zaman sende"):\u00E7(
"yer var"):\u00E7("dolu"))}</small></span></label>`).join("")}</div>`).join("")}`,is:async f=>{const[s,p]=String(f.get("yer")??"").split("|");if(!s||!p)throw new Error(\u00E7("Bir yer se\xE7."));await Sunucu.
yap("football_join",{p_match:id,p_side:s,p_pos:p}),tost(\u00E7("Ma\xE7a kat\u0131ld\u0131n: {taraf}, {mevki}. Ma\xE7tan \xF6nce \u015Fehirde ol.",{taraf:futbolTarafAdi(s),mevki:futbolPosAdi(p)}),"goal"),
izlenen=null,Durum.ozet().catch(()=>{}),await yukle(),kapandi||ciz()}})}function kurPencere(){const r=R(),l=saatler(),gunler=[...new Set(l.map(x=>new Date(x.t).toDateString()))],gunAdi=g=>{const d=new Date(
g),bugun=new Date(simdi()).toDateString(),yarin=new Date(simdi()+864e5).toDateString();return g===bugun?\u00E7("Bug\xFCn"):g===yarin?\u00E7("Yar\u0131n"):d.toLocaleDateString(DIL.yerel,{weekday:"long",
day:"numeric",month:"long"})},ilk=l.find(x=>!x.dolu),ff=pencereForm({ust:\u00E7("Hal\u0131 saha"),baslik:\u00E7("Ma\xE7 kur"),onayAd:\u00E7("Kur ({kr} kredi)",{kr:kr(r.feeCr??200)}),onayIkon:"calendar\
-plus",govde:`<p class="aciklama">${esc(\u00E7("Saati, mevkini ve tak\u0131m\u0131n\u0131n takti\u011Fini se\xE7. Turuncular'da ba\u015Flars\u0131n; \u015Fehirdeki herkes kat\u0131labilir."))}</p>
          <label class="alan"><span>${\u00E7("G\xFCn")}</span><select name="gun">${gunler.map(g=>`<option value="${esc(g)}" ${ilk&&new Date(ilk.t).toDateString()===g?"selected":""}>${esc(gunAdi(g))}</\
option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Saat")}</span><select name="saat"></select></label>
          <label class="alan"><span>${\u00E7("Mevkin")}</span><select name="mevki">${["forvet","orta","defans","kaleci"].map(p=>`<option value="${p}">${esc(futbolPosAdi(p))}</option>`).join("")}</sele\
ct></label>
          <label class="alan"><span>${\u00E7("Taktik")}</span><select name="taktik">${["dengeli","hucum","savunma"].map(t=>`<option value="${t}">${esc(futbolTaktikAdi(t))}</option>`).join("")}</select\
></label>`,is:async f=>{const t=Number(f.get("saat"));if(!Number.isFinite(t)||!t)throw new Error(\u00E7("Bir saat se\xE7."));await Sunucu.yap("football_open",{p_starts_at:new Date(t).toISOString(),p_pos:String(
f.get("mevki")),p_tactic:String(f.get("taktik"))}),tost(\u00E7("Ma\xE7\u0131 kurdun: {saat}. \u015Eehirdekiler kat\u0131labilir; ma\xE7tan \xF6nce \u015Fehirde ol.",{saat:saatKisa(t)}),"goal"),izlenen=
null,Durum.ozet().catch(()=>{}),await yukle(),kapandi||ciz()}}),gunSec=$("select[name=gun]",ff.form),saatSec=$("select[name=saat]",ff.form),doldur=()=>{const g=gunSec.value,s=l.filter(x=>new Date(x.t).
toDateString()===g),sec=s.find(x=>!x.dolu);saatSec.innerHTML=s.map(x=>`<option value="${x.t}" ${x.dolu?"disabled":""} ${sec&&x.t===sec.t?"selected":""}>${esc(saatKisa(x.t))}${x.dolu?" \xB7 "+esc(\u00E7(
"dolu")):""}</option>`).join("")};gunSec.onchange=doldur,doldur()}function bagla(){for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-futbol-kisi]",kap))
b.closest(".futbol-sahne")||(b.onclick=()=>profilAc(b.dataset.futbolKisi));for(const b of $$("[data-futbol-katil]",kap))b.onclick=()=>katilPencere(b.dataset.futbolKatil);for(const b of $$("[data-futbo\
l-izle]",kap))b.onclick=async()=>{izlenen=b.dataset.futbolIzle,await yukle(),kapandi||(ciz(),git("#futbol-saha"))};const ib=$("#futbol-izleme-birak",kap);ib&&(ib.onclick=async()=>{izlenen=null,await yukle(),
kapandi||ciz()});const kb=$("#futbol-kur-ac",kap);kb&&(kb.onclick=()=>kurPencere());for(const b of $$("[data-futbol-taktik]",kap))b.onclick=()=>{const t=b.dataset.futbolTaktik;isle(()=>Sunucu.yap("foo\
tball_tactic",{p_match:mac.id,p_tactic:t}),()=>tost(\u00E7("Taktik: {t}.",{t:futbolTaktikAdi(t)}),FUTBOL_TAKTIK_IK[t]))};const ay=$("#futbol-ayril",kap);ay&&(ay.onclick=()=>{const m=mac;pencere({ust:\u00E7(
"{saat} ma\xE7\u0131",{saat:saatKisa(m.starts_at)}),baslik:\u00E7("Ma\xE7tan ayr\u0131l"),govde:`<p class="aciklama">${esc(\u00E7("\xDCcretin geri d\xF6ner; bug\xFCnk\xFC hakk\u0131ndan say\u0131lmaz. Kaptan ayr\u0131l\u0131rsa tak\u0131\
m\u0131na sonra kat\u0131lan kaptan olur."))}</p>`,dugmeler:[{ad:\u00E7("Kal")},{ad:\u00E7("Ayr\u0131l"),sinif:"mercan",ikon:"door-open",is:()=>isle(()=>Sunucu.yap("football_leave",{p_match:m.id}),()=>tost(
\u00E7("Ma\xE7tan ayr\u0131ld\u0131n; \xFCcretin geri d\xF6nd\xFC."),"door-open"))}]})})}const tazele=tazeleyici(async()=>{await yukle(),!kapandi&&!mesgul&&!document.querySelector(".perde")&&ciz()});function sonrakiYoklama(){
if(clearTimeout(yoklamaZaman),kapandi)return;const m=mac,canli=m&&["closing","locked","live","ended"].includes(m.phase);let bekle=canli?2500:3e4;if(m&&m.phase==="open"&&m.lock_at){const x=Date.parse(m.
lock_at)-simdi()+2e3;x>150&&x<bekle&&(bekle=x)}if(m&&canli){const el=futbolEl({bas:Date.parse(m.starts_at)},simdi());for(const n of m.next??[]){const sonuc=n.t-el+300,pencereOnu=n.t-el-Number(R().decisionMs??
6e3)-2500;for(const x of[sonuc,pencereOnu])x>150&&x<bekle&&(bekle=x)}const Z=futbolZaman();for(const x of[-el+300,Z.yari-el+300,Z.ikinci-el+300,Z.son-el+1500])x>150&&x<bekle&&(bekle=x)}yoklamaZaman=setTimeout(
async()=>{if(kapandi)return;if(document.hidden){sonrakiYoklama();return}const evre=mac?.phase;canli?(await canliYukle(),mac?.phase!==evre||mac?.phase==="finished"||Date.now()-sonGenel>3e4?(await yukle(),
!kapandi&&!mesgul&&!document.querySelector(".perde")&&ciz()):canliCiz()):(await yukle(),!kapandi&&!mesgul&&!document.querySelector(".perde")&&ciz()),sonEvre=mac?.phase??null,sonrakiYoklama()},Math.max(
150,bekle))}if(await yukle(),!kap.isConnected)return saha.kapat(),()=>{};ciz(),sonrakiYoklama();const b1=Durum.dinle("olay",({olay})=>{/^football\./.test(olay)&&tazele().then(()=>sonrakiYoklama())});return()=>{
kapandi=!0,b1(),clearTimeout(yoklamaZaman),kararKapat(),saha.kapat()}}}),Parcalar.tamam("ek_98zzd_futbol");
