// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98zzd_futbol.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/futbol",{async ac(kap){let v=null,mac=null,hata=null,kapandi=!1,mesgul=!1,saatFarki=0,izlenen=futbolIzlenecek;futbolIzlenecek=null;let sonCanli=0,sonGenel=0,yoklamaZaman=null,sonEvre=null;
const saha=HaliSaha.ac(),spiker=MacSpikeri.ac("futbol-spiker"),ben=()=>Durum.v.ozet?.character??{},R=()=>futbolKurali()??v?.rule??{},simdi=()=>Date.now()+saatFarki,me=()=>v?.me??{},git=sec=>$(sec,kap)?.
scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"});saha.dinle("sec",(ad,id)=>{if(ad==="kisi"&&id){profilAc(id);return}if(ad==="ben"){git("#futbol-ben");return}git("#futbol-macim")});
const sonBiten=()=>{const x=(v?.history??[])[0],bitis=x?Date.parse(x.starts_at)+futbolZaman().son:0;return x&&x.status==="finished"&&x.player_status==="played"&&simdi()-bitis<15*6e4?x.id:null},gosterilen=()=>izlenen??
me().current??sonBiten()??(v?.program??[]).find(x=>x.id&&["live","locked","closing"].includes(x.phase))?.id??null;let saat={rtt:1/0,an:0};const saatOrnek=(zaman,t0,t1)=>{if(!zaman)return;const rtt=t1-
t0,fark=Date.parse(zaman)-(t0+t1)/2;Number.isFinite(fark)&&(rtt<=saat.rtt||Date.now()-saat.an>6e4)&&(saat={rtt,an:Date.now()},saatFarki=fark)},zamanli=async(fn,args)=>{const t0=Date.now(),x=await Sunucu.
cagir(fn,args);return saatOrnek(x?.server_time,t0,Date.now()),x};async function yukle(){try{const[x]=await Promise.all([zamanli("football"),Durum.kurallar().catch(()=>null)]);v=x,sonGenel=Date.now();const id=gosterilen();
izlenen&&!(v.program??[]).some(p=>p.id===izlenen)&&!(v.recent??[]).some(p=>p.id===izlenen)&&(izlenen=null),id?v.mine?.id===id?mac=v.mine:mac=await zamanli("football_match",{p_match:id}).catch(()=>null):
mac=null,hata=null}catch(e){hata=e}}async function canliYukle(){const id=gosterilen();if(id)try{const x=await zamanli("football_match",{p_match:id});if(kapandi)return;mac=x,v&&v.mine?.id===x.id&&(v.mine=
x),sonCanli=Date.now()}catch{}}const ligTakim=(m,s)=>s==="a"?m?.league?.home:m?.league?.away,takimAdi=(s,m=mac)=>m?.league?mahalleTakimAdi(ligTakim(m,s)):futbolTarafAdi(s),takimRengi=(s,m=mac)=>m?.league?
mahalleFormalari(m.league.home?.color,m.league.away?.color)[s]:FUTBOL_RENK[s],oyuncular=()=>{const l=futbolKadro(mac?.players??[]);if(mac?.league){const F=mahalleFormalari(mac.league.home?.color,mac.league.
away?.color);for(const o of l)o.renk=o.yer===0?o.taraf==="a"?F.ak:F.bk:F[o.taraf]}return l};function kadroHtml(m){const l=oyuncular(),r=R(),takim=s=>{const t=l.filter(o=>o.taraf===s).sort((x,y)=>x.yer-
y.yer),satir=o=>{const ic=`<span class="futbol-forma" style="--forma:${futbolForma(o)}">${esc(FUTBOL_POS_KISA[o.mevki]??"")}</span>
            <div><b>${esc(o.ben?\u00E7("Sen"):o.ad??\u00E7("Ad\u0131n\u0131 gizleyen biri"))}</b><div class="alt">${esc([futbolPosAdi(o.mevki),o.bot?\u00E7("mahalleden yedek"):null,o.guc!=null?\u00E7(
"g\xFC\xE7 {n}",{n:sayi(o.guc)}):null,o.gol?\u00E7("{n} gol",{n:sayi(o.gol)}):null,o.asist?\u00E7("{n} asist",{n:sayi(o.asist)}):null,o.kurtaris?\u00E7("{n} kurtar\u0131\u015F",{n:sayi(o.kurtaris)}):null].
filter(Boolean).join(" \xB7 "))}</div></div>
            ${o.ben?`<span class="cip altin kucuk-cip">${\u00E7("Sen")}</span>`:"<span></span>"}`;return o.id&&!o.ben?`<button type="button" class="liste-satir" data-futbol-kisi="${esc(o.id)}">${ic}</\
button>`:`<div class="liste-satir">${ic}</div>`},alinan=t.map(o=>o.mevki),bos=!m.players?.some(p=>p.slot!=null)&&["open","closing"].includes(m.phase)?Math.max(0,Number(r.team?.size??5)-t.length):0,ayrilan=m.
private&&bos?Number(m.reserved?.[s]??0):0,kap2=takimAdi(s,m),taktik=m[`tactic_${s}`];return`<div class="futbol-takim" data-futbol-takim="${s}"><div class="futbol-takim-bas"><span class="futbol-renk" s\
tyle="--forma:${takimRengi(s,m)}"></span><b>${esc(kap2)}</b>
            <span class="cip kucuk-cip">${ikon(FUTBOL_TAKTIK_IK[taktik]??"scale")}${esc(futbolTaktikAdi(taktik))}</span></div>
          <div class="liste">${t.map(satir).join("")}${bos?`<div class="liste-satir futbol-bos"><span class="futbol-forma bos">+</span><div><div class="alt" style="margin:0">${esc(\u00E7("{n} bo\u015F yer;\
 bo\u015F kalan yere kilitte mahalleden yedek girer",{n:sayi(bos)}))}</div>
            ${["kaleci","defans","orta","forvet"].filter(p=>futbolYerVar(r,alinan,p)).length?`<div class="alt">${esc(\u00E7("Yer var: {l}",{l:["kaleci","defans","orta","forvet"].filter(p=>futbolYerVar(
r,alinan,p)).map(futbolPosAdi).join(", ")}))}</div>`:""}
            ${ayrilan?`<div class="alt" data-futbol-ayrilan="${ayrilan}">${esc(\u00E7("{n} yer davetlilere ayr\u0131ld\u0131",{n:sayi(ayrilan)}))}</div>`:""}</div><span></span></div>`:""}</div></div>`};
return`<div class="futbol-kadro">${takim("a")}${takim("b")}</div>`}function olaylarHtml(m){const l=oyuncular(),el=futbolEl({bas:Date.parse(m.starts_at)},simdi()),ev=(m.events??[]).filter(e=>m.phase===
"finished"||e.t+2e3<=el).slice().reverse();return ev.length?`<div class="liste futbol-olaylar">${ev.map(e=>{const y=futbolOlayYazi(e,l,s=>takimAdi(s,m)),benSut=e.decided_a&&l.find(o=>o.taraf===e.s&&o.
yer===e.sh)?.ben,kararim=e.decided_g&&l.find(o=>o.taraf!==e.s&&o.yer===0)?.ben?\u00E7("Senin karar\u0131n: {k}",{k:futbolKararAdi(e.keeper,"gk")})+(e.okG?" \xB7 "+\u00E7("do\u011Fru karar"):""):benSut?
\u00E7("Senin karar\u0131n: {k}",{k:futbolKararAdi(e.attack,"att")})+(e.okA?" \xB7 "+\u00E7("do\u011Fru karar"):""):"";return`<div class="liste-satir${y.soluk?" soluk":""}${y.gol?" gol":""}" data-futb\
ol-olay="${e.i}"><span class="liste-ikon ${y.gol?"altin":""}">${ikon(y.ik)}</span>
          <div><div class="alt" style="margin:0"><b>${sayi(e.minute??0)}'</b> ${esc(y.metin)}</div>${kararim?`<div class="alt" data-futbol-kararim>${esc(kararim)}</div>`:""}</div>
          <span class="futbol-skor-kucuk">${sayi(e.score_a)}\u2013${sayi(e.score_b)}</span></div>`}).join("")}</div>`:`<p class="kucuk">${esc(m.phase==="live"?\u00E7("\u0130lk atak birazdan."):\u00E7(
"Ma\xE7ta olay yok."))}</p>`}function macimHtml(){const m=mac,mineMi=m&&m.me;if(!m)return"";const r=R(),fee=Number(m.fee_cr??r.feeCr??200),kaptan=m.captain,acik=m.phase==="open",el=futbolEl({bas:Date.
parse(m.starts_at)},simdi()),yazi=m.phase==="open"?m.league?\u00E7("Kadro ma\xE7tan {dk} dakika \xF6nce kilitlenir. O an \u015Fehirde olmayan gelmedi say\u0131l\u0131r; bir tak\u0131mdan \u015Fehirde kimse yoksa ma\xE7 h\xFCkmen biter. B\
o\u015F yerlere mahalleden yedek girer.",{dk:sayi(Math.round(Number(r.pitch?.lockSeconds??120)/60))}):\u00E7("Kadro ma\xE7tan {dk} dakika \xF6nce kilitlenir. O an \u015Fehirde olmayan gelmedi say\u0131l\u0131r (\xFCcreti d\xF6n\
er), bo\u015F yerlere mahalleden yedek girer.",{dk:sayi(Math.round(Number(r.pitch?.lockSeconds??120)/60))}):m.phase==="closing"?\u00E7("Kadro kilitleniyor; birazdan yedekler yerine ge\xE7er."):m.phase===
"locked"?\u00E7("Kadrolar kilitlendi; ba\u015Flama saati {saat}. Atak sana gelince ekran\u0131n alt\u0131nda karar penceresi a\xE7\u0131l\u0131r.",{saat:saatKisa(m.starts_at)}):m.phase==="live"?m.break?
\u00E7("Devre aras\u0131; ikinci devrede tak\u0131mlar yer de\u011Fi\u015Ftirir."):\u00E7("Ma\xE7 s\xFCr\xFCyor ({devre}. devre). Atak sana gelince karar penceresi a\xE7\u0131l\u0131r; 6 saniyen var.",
{devre:sayi(m.half??1)}):m.phase==="cancelled"?m.cancel_reason==="forfeit"?\u00E7("H\xFCkmen: kilit an\u0131nda bir tak\u0131mdan ma\xE7\u0131n \u015Fehrinde kimse yoktu; lig tablosuna h\xFCkmen sonu\xE7 yaz\u0131ld\u0131."):
m.cancel_reason==="too_few"?\u00E7("Yeterli oyuncu gelmedi\u011Fi i\xE7in ma\xE7 iptal edildi; \xFCcretler d\xF6nd\xFC."):m.cancel_reason==="host"?\u00E7("Kurucu \xF6zel ma\xE7\u0131 iptal etti; \xFCcretler d\xF6nd\xFC."):
\u00E7("Herkes ayr\u0131ld\u0131\u011F\u0131 i\xE7in ma\xE7 iptal edildi."):"",kurucu=m.private&&m.mine,ozelYazi=m.private?`<div class="bilgi-kutusu" style="margin-top:8px" data-futbol-ozel="1">${ikon(
"lock")}<span>${esc(\u00E7("Arkada\u015Flarla \xF6zel ma\xE7: yaln\u0131z davetliler kat\u0131l\u0131r. Dostluk ma\xE7\u0131d\u0131r: kat\u0131l\u0131m say\u0131l\u0131r (beceri, deneyim, keyif, yak\u0131nl\u0131k), sonu\xE7 say\u0131lmaz (galibiyet, gol ve madalya saya\xE7lar\u0131na\
 ge\xE7mez)."))}</span></div>`:"",davetliler=m.private&&(m.invites??[]).length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Davetliler")}</p><div class="liste futbol-davetliler">${m.invites.
map(d=>{const ic=`<span class="liste-ikon ${d.status==="accepted"?"yesil":""}">${ikon(d.status==="accepted"?"check":d.status==="pending"?"hourglass":"x")}</span>
            <div><b>${esc(d.me?\u00E7("Sen"):d.name??\u00E7("Ad\u0131n\u0131 gizleyen biri"))}</b><div class="alt">${esc([FUTBOL_DAVET_DURUM[d.status]??d.status,d.side?\u00E7("tak\u0131m\u0131: {t}",{
t:futbolTarafAdi(d.side)}):null].filter(Boolean).join(" \xB7 "))}</div></div><span></span>`;return d.character_id&&!d.me?`<button type="button" class="liste-satir" data-futbol-kisi="${esc(d.character_id)}\
" data-futbol-davetli="${esc(d.status)}">${ic}</button>`:`<div class="liste-satir" data-futbol-davetli="${esc(d.status)}">${ic}</div>`}).join("")}</div>`:"",davetSay=(m.invites??[]).length,davetSinir=Number(
r.private?.maxInvites??9),skor=["live","ended","finished"].includes(m.phase)?`<div class="futbol-skor" data-futbol-skor="${sayi(m.score_a??0)}-${sayi(m.score_b??0)}"><span style="--forma:${takimRengi(
"a",m)}">${esc(takimAdi("a",m))}</span>
          <b>${sayi(m.score_a??0)} \u2013 ${sayi(m.score_b??0)}</b><span style="--forma:${takimRengi("b",m)}">${esc(takimAdi("b",m))}</span>
          <small>${esc(m.phase==="finished"||m.phase==="ended"?\u00E7("Ma\xE7 sonu"):m.break?\u00E7("Devre aras\u0131"):\u00E7("{dk}. dakika",{dk:sayi(m.minute??futbolDakika(el))}))}</small></div>`:"",
benO=oyuncular().find(o=>o.ben);let sonuc="";if(m.phase==="finished"&&benO){const a=Number(m.score_a??0),b=Number(m.score_b??0),bizim=benO.taraf==="a"?a:b,onlar=benO.taraf==="a"?b:a,kazanc=(m.players??
[]).find(p=>p.me)?.skill_gain,baslik=m.private?bizim>onlar?\u00E7("Dostluk ma\xE7\u0131: kazand\u0131n\u0131z {a}\u2013{b}!",{a:bizim,b:onlar}):bizim===onlar?\u00E7("Dostluk ma\xE7\u0131: berabere {a}\u2013{b}.",
{a:bizim,b:onlar}):\u00E7("Dostluk ma\xE7\u0131: kaybettiniz {a}\u2013{b}.",{a:bizim,b:onlar}):bizim>onlar?\u00E7("Kazand\u0131n\u0131z {a}\u2013{b}!",{a:bizim,b:onlar}):bizim===onlar?\u00E7("Berabere\
 {a}\u2013{b}.",{a:bizim,b:onlar}):\u00E7("Kaybettiniz {a}\u2013{b}.",{a:bizim,b:onlar});sonuc=`<div class="bilgi-kutusu ${bizim>onlar?"":"uyari-kutusu"}" style="margin-top:10px" data-futbol-sonuc="${bizim>
onlar?"galibiyet":bizim===onlar?"beraberlik":"maglubiyet"}"${m.private?' data-futbol-dostluk="1"':""}>${ikon(m.private?"handshake":bizim>onlar?"trophy":bizim===onlar?"scale":"shield")}<span>
          ${esc(baslik)}
          ${esc([benO.gol?\u00E7("{n} gol",{n:sayi(benO.gol)}):null,benO.asist?\u00E7("{n} asist",{n:sayi(benO.asist)}):null,benO.kurtaris?\u00E7("{n} kurtar\u0131\u015F",{n:sayi(benO.kurtaris)}):null,
kazanc?\u00E7("futbol becerin +{n}",{n:sayi(kazanc)}):null].filter(Boolean).join(" \xB7 "))}
          ${m.private?esc(\u00E7("Sonu\xE7 say\u0131lmaz: galibiyet, gol ve madalya saya\xE7lar\u0131na ge\xE7mez.")):""}</span></div>`}const adam=m.motm?`<p class="kucuk" data-futbol-adam="${m.motm.me?
"ben":"1"}">${ikon("star")} ${esc(m.motm.me?\u00E7("Ma\xE7\u0131n adam\u0131 sensin!"):\u00E7("Ma\xE7\u0131n adam\u0131: {ad}",{ad:m.motm.name??\u00E7("ad\u0131n\u0131 gizleyen biri")}))}</p>`:"",taktikSec=kaptan&&
acik?`<div class="futbol-taktik" role="group" aria-label="${esc(\u00E7("Tak\u0131m\u0131n takti\u011Fi"))}">${["hucum","dengeli","savunma"].map(t=>`<button type="button" class="cip-dugme${m[`tactic_${kaptan}`]===
t?" secili":""}" data-futbol-taktik="${t}" aria-pressed="${m[`tactic_${kaptan}`]===t}" ${mesgul?"disabled":""}>${ikon(FUTBOL_TAKTIK_IK[t])}${esc(futbolTaktikAdi(t))}</button>`).join("")}</div>
        <p class="kucuk">${esc(m.league?\u00E7("Tak\u0131m\u0131n\u0131n kaptan\u0131s\u0131n: lig ma\xE7\u0131nda takti\u011Fi sen se\xE7ersin. H\xFCcum topla daha \xE7ok atak eder ama f\u0131rsat da verir; savunma tersi."):
\u00E7("Kaptans\u0131n (tak\u0131m\u0131na ilk kat\u0131lan). H\xFCcum topla daha \xE7ok atak eder ama f\u0131rsat da verir; savunma tersi."))}</p>`:"",lm=m.league_me,ligYazi=m.league?`<div class="bil\
gi-kutusu" style="margin-top:8px" data-futbol-lig="${esc(m.league.fixture_id??"")}">${ikon("trophy")}<span>${esc(\u00E7('Mahalle ligi, {n}. tur: {ev} \u2013 {konuk}. \xDCcretsiz; iki tak\u0131m\u0131n \xFCyeleri kendi tak\
\u0131m\u0131nda oynar. Kilitte \u015Fehirde olan ve "kendili\u011Finden oyna" diyen \xFCyeler kadroya girer.',{n:sayi(m.league.round??1),ev:takimAdi("a",m),konuk:takimAdi("b",m)}))}
          ${lm?" "+esc(lm.skip?\u00E7("Bu ma\xE7ta yokum dedin."):mineMi?\u00E7("Bu ma\xE7a yaz\u0131ld\u0131n."):lm.auto?\u00E7("Kilitte \u015Fehirdeysen kendili\u011Finden oynars\u0131n."):\u00E7("K\
endili\u011Finden oynam\u0131yorsun; oynamak i\xE7in ma\xE7a kat\u0131l.")):""}</span></div>`:"";return`<section class="kart" id="futbol-macim" data-futbol-mac="${esc(m.id)}" data-futbol-evre="${esc(m.
phase)}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(mineMi?\u00E7("Ma\xE7\u0131n"):\u00E7("\u0130zledi\u011Fin ma\xE7"))} \xB7 ${esc(bolgeAdi(m.region_id))} \xB7 ${esc(\u00E7("saha {n}",{n:sayi(
m.pitch)}))}${m.private?` \xB7 ${ikon("lock")} ${esc(\u00E7("\xF6zel ma\xE7"))}`:""}</p>
          <h2 class="b2">${ikon("goal")} ${esc(\u00E7("{saat} ma\xE7\u0131",{saat:saatKisa(m.starts_at)}))}</h2></div>
          <span class="cip ${futbolEvreRenk(m.phase)}">${esc(futbolEvreAdi(m.phase))}</span></div>
        ${skor}
        ${yazi?`<p class="kucuk">${esc(yazi)}</p>`:""}
        ${m.phase==="open"||m.phase==="finished"?ozelYazi:""}
        ${ligYazi}
        ${!m.watch&&m.phase==="live"?`<p class="bilgi-kutusu" style="margin-top:6px">${ikon("map-pin")}<span>${esc(\u00E7("Ma\xE7\u0131 izlemek i\xE7in \u015Fehirde olmal\u0131s\u0131n; sonucu ma\xE7 bitince g\xF6r\xFCn\xFCr."))}\
</span></p>`:""}
        ${kadroHtml(m)}
        ${taktikSec}
        ${["live","ended","finished"].includes(m.phase)?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Ma\xE7\u0131n ak\u0131\u015F\u0131")}</p>${olaylarHtml(m)}`:""}
        ${davetliler}
        ${adam}${sonuc}
        <div class="oneri-dugmeler" style="margin-top:10px">
          ${kurucu&&acik&&davetSay<davetSinir?`<button class="dugme ikincil" id="futbol-davet-ekle" ${mesgul?"disabled":""}>${ikon("user-round-plus")}${\u00E7("Davet et")}</button>`:""}
          ${kurucu&&acik?`<button class="dugme sade" id="futbol-iptal" ${mesgul?"disabled":""}>${ikon("x")}${\u00E7("Ma\xE7\u0131 iptal et")}</button>`:mineMi&&acik?`<button class="dugme sade" id="fut\
bol-ayril" ${mesgul?"disabled":""}>${ikon("door-open")}${\u00E7("Ma\xE7tan ayr\u0131l")}</button>`:""}
          ${lm&&acik&&!mineMi?`<button class="dugme altin" data-futbol-katil="${esc(m.id)}" ${mesgul?"disabled":""}>${ikon("user-round-plus")}${\u00E7("Ma\xE7a kat\u0131l")}</button>`:""}
          ${lm&&acik?`<button class="dugme sade" data-futbol-yokum="${esc(m.id)}" data-yokum="${lm.skip?"0":"1"}" ${mesgul?"disabled":""}>${ikon(lm.skip?"check":"calendar-x")}${esc(lm.skip?\u00E7("Gel\
irim"):\u00E7("Bu ma\xE7ta yokum"))}</button>`:""}
          ${m.league?`<button class="dugme sade" data-git="sehir/lig">${ikon("trophy")}${\u00E7("Mahalle ligi")}</button>`:""}
          ${izlenen&&izlenen!==me().current?`<button class="dugme sade" id="futbol-izleme-birak">${ikon("x")}${\u00E7("\u0130zlemeyi b\u0131rak")}</button>`:""}
        </div>
        ${kurucu&&acik?`<p class="kucuk">${esc(\u00E7("Kurucu ayr\u0131lamaz; ma\xE7\u0131 iptal edersen kat\u0131lanlar\u0131n \xFCcreti d\xF6ner ve davetlilere haber gider. {n}/{m} davet.",{n:sayi(davetSay),
m:sayi(davetSinir)}))}</p>`:mineMi&&acik?`<p class="kucuk">${esc(m.league?\u00E7("Ayr\u0131l\u0131rsan bu ma\xE7ta yokum say\u0131l\u0131rs\u0131n (kendili\u011Finden kadroya girmezsin); fikrini de\u011Fi\u015Ftirirsen yeniden kat\u0131l."):
m.private?\u00E7("Ayr\u0131l\u0131rsan {kr} kredi \xFCcretin geri d\xF6ner; kilitten \xF6nce davet kart\u0131ndan yeniden kat\u0131labilirsin.",{kr:kr(fee)}):\u00E7("Ayr\u0131l\u0131rsan {kr} kredi \xFCcretin geri\
 d\xF6ner.",{kr:kr(fee)}))}</p>`:""}
      </section>`}function davetlerHtml(){const l=v.invites??[];if(!l.length)return"";const r=R(),m=me();return`<section class="kart" id="futbol-davetler">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Arkada\u015Flarla \xF6zel ma\xE7")}</p><h2 class="b2">${\u00E7("Davetlerin")}</h2></div><span class="ik-kutu">${ikon("mail-open")}</spa\
n></div>
        <div class="liste">${l.map(x=>{const durum=x.invite?.status,taraf=x.invite?.side,alt=[bolgeAdi(x.region_id),\u00E7("saha {n}",{n:sayi(x.pitch)}),taraf?\u00E7("seni {t} tak\u0131m\u0131na koydu",
{t:futbolTarafAdi(taraf)}):\u00E7("tak\u0131m\u0131n\u0131 sen se\xE7ersin"),\u00E7("Turuncular {a}/5 \xB7 Maviler {b}/5",{a:sayi(x.counts?.a??0),b:sayi(x.counts?.b??0)}),durum==="declined"?\u00E7("ka\
t\u0131lmam dedin"):durum==="left"?\u00E7("ayr\u0131ld\u0131n"):null].filter(Boolean).join(" \xB7 "),engel=x.here?m.current?FUTBOL_SART.FOOTBALL_BUSY:Number(m.left_today??0)<=0?FUTBOL_SART.FOOTBALL_DAILY:
Number(m.credit??0)<Number(x.fee_cr??r.feeCr??200)?FUTBOL_SART.FOOTBALL_NO_MONEY:null:\u00E7("Kat\u0131lmak i\xE7in {sehir} \u015Fehrinde olmal\u0131s\u0131n.",{sehir:bolgeAdi(x.region_id)});return`<d\
iv class="liste-satir futbol-davet" data-futbol-davet="${esc(x.id)}" data-davet-durum="${esc(durum??"")}"><span class="liste-ikon altin">${ikon("goal")}</span>
            <div><b>${esc(\u00E7("{ad} seni \xF6zel ma\xE7a \xE7a\u011F\u0131r\u0131yor: {zaman}",{ad:x.host??\u00E7("Kurucu"),zaman:saatYaz(x.starts_at)}))}</b>
              <div class="alt">${esc(alt)}</div>${engel?`<div class="alt uyari-yazi" data-futbol-davet-engel>${esc(engel)}</div>`:""}</div>
            <div class="oneri-dugmeler futbol-davet-dugmeler">
              <button class="dugme altin kucuk-d" data-futbol-davet-katil="${esc(x.id)}" ${engel||mesgul?"disabled":""}>${ikon("check")}${\u00E7("Kat\u0131l")}</button>
              ${durum==="pending"?`<button class="dugme sade kucuk-d" data-futbol-davet-red="${esc(x.id)}" ${mesgul?"disabled":""}>${ikon("x")}${\u00E7("Kat\u0131lmam")}</button>`:""}
            </div></div>`}).join("")}</div>
        <p class="kucuk">${esc(\u00E7("Dostluk ma\xE7\u0131: kat\u0131l\u0131m say\u0131l\u0131r (beceri, deneyim, keyif, yak\u0131nl\u0131k), sonu\xE7 say\u0131lmaz. Kat\u0131lmak {kr} kredi; ma\xE7 ba\u015Flarken \u015Fehirde ol.",
{kr:kr(r.feeCr??200)}))}</p>
      </section>`}function ligKartHtml(){const n=v.neighborhood??{},t=n.team,x=n.next,gun=iso=>new Date(iso).toLocaleDateString(DIL.yerel,{weekday:"long"});let govde;if(!t)govde=`<p class="kucuk">${esc(
\u00E7("Mahalle tak\u0131mlar\u0131 her hafta \u015Fehrin liginde oynar: tak\u0131m\u0131n\u0131 kur ya da arkada\u015F\u0131n\u0131n tak\u0131m\u0131na kat\u0131l."))}</p>
          ${Number(n.invites??0)?`<p class="kucuk" data-futbol-lig-davet="${sayi(n.invites)}">${ikon("mail-open")} ${esc(\u00E7("{n} tak\u0131m davetin var.",{n:sayi(n.invites)}))}</p>`:""}`;else if(!x)
govde=`<p class="kucuk">${esc(\u00E7("Tak\u0131m\u0131n\u0131n yakla\u015Fan lig ma\xE7\u0131 yok. Gelecek haftan\u0131n ligine kaptan yazar."))}</p>`;else{const durum=x.joined?\u00E7("ma\xE7a yaz\u0131ld\u0131n"):
x.skip?\u00E7("bu ma\xE7ta yokum dedin"):t.auto?\u00E7("\u015Fehirdeysen kendili\u011Finden oynars\u0131n"):\u00E7("kendili\u011Finden oynam\u0131yorsun");govde=`<div class="liste"><div class="liste-s\
atir" data-futbol-lig-sonraki="${esc(x.match_id??"")}"><span class="liste-ikon altin">${ikon("trophy")}</span>
            <div><b>${esc(\u00E7("{gun} {saat} \xB7 {rakip}",{gun:gun(x.starts_at),saat:saatKisa(x.starts_at),rakip:mahalleTakimAdi(x.opponent)}))}</b>
              <div class="alt">${esc([\u00E7("{n}. tur",{n:sayi(x.round??1)}),x.home?\u00E7("ev sahibi"):\u00E7("deplasman"),\u00E7("saha {n}",{n:sayi(x.pitch??1)}),futbolEvreAdi(x.phase),durum].filter(
Boolean).join(" \xB7 "))}</div></div><span></span></div></div>
          <div class="oneri-dugmeler" style="margin-top:8px">
            ${x.phase==="open"&&!x.joined?`<button class="dugme altin kucuk-d" data-futbol-katil="${esc(x.match_id)}" ${mesgul||me().current||!v.here?"disabled":""}>${ikon("user-round-plus")}${\u00E7(
"Ma\xE7a kat\u0131l")}</button>`:""}
            ${x.phase==="open"?`<button class="dugme sade kucuk-d" data-futbol-yokum="${esc(x.match_id)}" data-yokum="${x.skip?"0":"1"}" ${mesgul?"disabled":""}>${ikon(x.skip?"check":"calendar-x")}${esc(
x.skip?\u00E7("Gelirim"):\u00E7("Bu ma\xE7ta yokum"))}</button>`:""}
            ${["locked","live","closing"].includes(x.phase)?`<button class="dugme sade kucuk-d" data-futbol-izle="${esc(x.match_id)}">${ikon("eye")}${\u00E7("\u0130zle")}</button>`:""}
          </div>`}return`<section class="kart" id="futbol-lig">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(t?mahalleTakimAdi(t):\u00E7("Mahalle tak\u0131m\u0131 yok"))}</p><h2 class="b2">${\u00E7("Mahalle ligi")}</h2></div>
          ${t?`<span class="futbol-renk buyuk" style="--forma:${esc(t.color??FUTBOL_RENK.a)}" aria-hidden="true"></span>`:`<span class="ik-kutu">${ikon("trophy")}</span>`}</div>
        ${govde}
        <button class="baglanti" type="button" data-git="sehir/lig" style="margin-top:8px">${ikon("table-2")} ${esc(t?\u00E7("Tak\u0131m\u0131n, puan durumu ve fikst\xFCr"):\u00E7("Tak\u0131m kur, davetler\
in ve \u015Fehrin ligi"))}</button>
      </section>`}function programHtml(){const l=(v.program??[]).filter(x=>x.phase!=="finished"),r=R(),m=me(),katilabilir=!m.current&&Number(m.left_today??0)>0&&Number(m.credit??0)>=Number(r.feeCr??200)&&
!!v.here;return`<section class="kart" id="futbol-program">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(v.here?bolgeAdi(v.here):\u00E7("Yoldas\u0131n"))}</p><h2 class="b2">${\u00E7("Ma\xE7 program\u0131")}</h2></div><span class="ik-kutu">${ikon(
"calendar-days")}</span></div>
        ${l.length?`<div class="liste">${l.map(x=>{if(!x.id)return`<div class="liste-satir soluk" data-futbol-program-ozel><span class="liste-ikon">${ikon("lock")}</span>
            <div><b>${esc(\u00E7("{saat} \xB7 saha {n}",{saat:saatKisa(x.starts_at),n:sayi(x.pitch)}))}</b><div class="alt">${esc([futbolEvreAdi(x.phase),\u00E7("\xD6zel ma\xE7: yaln\u0131z davetliler")].
join(" \xB7 "))}</div></div>
            <span class="cip kucuk-cip">${ikon("lock")}${\u00E7("\xD6zel")}</span></div>`;const benim=!!x.me,say=s=>Number(x.counts?.[s]??0),dolu=say("a")+say("b")>=2*Number(r.team?.size??5),davet=x.private&&
!benim&&x.phase==="open"?(v.invites??[]).find(d=>d.id===x.id):null,takimim=v.neighborhood?.team?.id??null,ligde=!!x.league&&!!takimim&&(x.league.home?.id===takimim||x.league.away?.id===takimim),ligKatil=ligde&&
!m.current&&Number(m.left_today??0)>0&&!!v.here,dugme=benim?`<span class="cip altin kucuk-cip">${\u00E7("Senin ma\xE7\u0131n")}</span>`:davet?`<button class="dugme altin kucuk-d" data-futbol-davet-git\
="${esc(x.id)}">${ikon("mail-open")}${\u00E7("Davetin var")}</button>`:x.private&&x.phase==="open"?`<span class="cip kucuk-cip">${ikon("lock")}${\u00E7("\xD6zel")}</span>`:x.league&&x.phase==="open"?ligde?
`<button class="dugme ${ligKatil?"altin":"ikincil"} kucuk-d" data-futbol-katil="${esc(x.id)}" ${!ligKatil||mesgul?"disabled":""}>${ikon("user-round-plus")}${\u00E7("Kat\u0131l")}</button>`:`<span clas\
s="cip kucuk-cip">${ikon("trophy")}${\u00E7("Lig")}</span>`:x.phase==="open"&&!dolu?`<button class="dugme ${katilabilir?"altin":"ikincil"} kucuk-d" data-futbol-katil="${esc(x.id)}" ${!katilabilir||mesgul?
"disabled":""}>${ikon("user-round-plus")}${\u00E7("Kat\u0131l")}</button>`:["live","locked","closing"].includes(x.phase)?`<button class="dugme sade kucuk-d" data-futbol-izle="${esc(x.id)}">${ikon("eye")}${\u00E7(
"\u0130zle")}</button>`:`<span class="cip kucuk-cip">${esc(futbolEvreAdi(x.phase))}</span>`,takimlar=x.league?\u00E7("Lig: {ev} {a}/5 \xB7 {konuk} {b}/5",{ev:mahalleTakimAdi(x.league.home),konuk:mahalleTakimAdi(
x.league.away),a:sayi(say("a")),b:sayi(say("b"))}):\u00E7("Turuncular {a}/5 \xB7 Maviler {b}/5",{a:sayi(say("a")),b:sayi(say("b"))});return`<div class="liste-satir" data-futbol-program="${esc(x.id)}"${x.
league?` data-futbol-program-lig="${esc(x.league.fixture_id??"")}"`:""}><span class="liste-ikon ${x.phase==="live"?"mercan":""}">${ikon(x.league?"trophy":x.phase==="live"?"volleyball":"goal")}</span>
            <div><b>${esc(\u00E7("{saat} \xB7 saha {n}",{saat:saatKisa(x.starts_at),n:sayi(x.pitch)}))}</b><div class="alt">${esc([futbolEvreAdi(x.phase),x.private?\u00E7("\xF6zel ma\xE7"):null,takimlar,
x.phase==="live"&&x.score_a!=null?`${x.score_a}\u2013${x.score_b}`:null].filter(Boolean).join(" \xB7 "))}</div></div>${dugme}</div>`}).join("")}</div>`:`<p class="bos">${esc(v.here?\u00E7("\xD6n\xFCm\xFCzdeki \
48 saatte ma\xE7 yok. \u0130lk ma\xE7\u0131 sen kur!"):\u00E7("Bir \u015Fehre var\u0131nca o \u015Fehrin ma\xE7lar\u0131n\u0131 g\xF6r\xFCrs\xFCn."))}</p>`}
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
          ${neden==="FOOTBALL_TRAVELING"?` <button class="baglanti" type="button" data-git="sehir/yol">${\u00E7("Seyahat")}</button>`:""}</span></div>`:`<div class="oneri-dugmeler" style="margin-top:8\
px"><button class="dugme altin" id="futbol-kur-ac" ${mesgul?"disabled":""}>${ikon("calendar-plus")}${\u00E7("Ma\xE7 kur")}</button>
              ${r.private?`<button class="dugme ikincil" id="futbol-ozel-ac" ${mesgul?"disabled":""}>${ikon("lock")}${\u00E7("Arkada\u015Flarla \xF6zel ma\xE7")}</button>`:""}</div>`}
        ${r.private?`<p class="kucuk" style="margin-top:8px">${esc(\u00E7("\xD6zel ma\xE7a yaln\u0131z davet etti\u011Fin arkada\u015Flar\u0131n ve tan\u0131d\u0131klar\u0131n kat\u0131l\u0131r (en \xE7ok {n} ki\u015Fi). Dostluk ma\xE7\u0131d\u0131r: sonu\xE7 say\u0131lmaz.",
{n:sayi(r.private.maxInvites??9)}))}</p>`:""}
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
        ${Number(m.friendly??0)?`<p class="kucuk" data-futbol-dostluk-sayi="${Number(m.friendly)}">${ikon("handshake")} ${esc(\u00E7("Arkada\u015Flarla {n} dostluk ma\xE7\u0131 (saya\xE7lara ge\xE7mez).",
{n:sayi(m.friendly)}))}</p>`:""}
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
          <div><b>${esc(\u00E7("{a}\u2013{b} \xB7 {saat}",{a:sayi(x.score_a??0),b:sayi(x.score_b??0),saat:saatYaz(x.starts_at)}))}</b><div class="alt">${esc([\u00E7("saha {n}",{n:sayi(x.pitch)}),x.league?
\u00E7("lig ma\xE7\u0131: {ev} \u2013 {konuk}",{ev:mahalleTakimAdi(x.league.home),konuk:mahalleTakimAdi(x.league.away)}):null,x.motm?\u00E7("ma\xE7\u0131n adam\u0131 {ad}",{ad:x.motm}):null,x.me?\u00E7(
"sen oynad\u0131n"):null].filter(Boolean).join(" \xB7 "))}</div></div><span class="cip kucuk-cip">${ikon("eye")}${\u00E7("Tekrar")}</span></button>`).join("")}</div>`:`<p class="bos">${esc(\u00E7("Bu \
\u015Fehirde hen\xFCz biten ma\xE7 yok."))}</p>`}
      </section>`}function gecmisHtml(){const l=v.history??[];return`<section class="kart" id="futbol-gecmis">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ge\xE7mi\u015F")}</p><h2 class="b2">${\u00E7("Son ma\xE7lar\u0131n")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></di\
v>
        ${l.length?`<div class="liste">${l.map(x=>{const bizim=x.side==="a"?x.score_a:x.score_b,onlar=x.side==="a"?x.score_b:x.score_a,lg=x.league,hukmen=lg?.status==="forfeit"&&x.cancel_reason==="for\
feit",hb=hukmen?x.side==="a"?lg.score_home:lg.score_away:null,ho=hukmen?x.side==="a"?lg.score_away:lg.score_home:null,durum=x.player_status==="no_show"?lg?\u00E7("gelmedin"):\u00E7("gelmedin (\xFCcret d\xF6\
nd\xFC)"):hukmen?lg.absent==="both"?\u00E7("h\xFCkmen: iki tak\u0131m da gelmedi"):\u00E7("h\xFCkmen {a}\u2013{b} {d}",{a:sayi(hb??0),b:sayi(ho??0),d:hb>ho?\u00E7("galibiyet"):\u00E7("ma\u011Flubiyet")}):
x.status==="cancelled"?x.cancel_reason==="host"?\u00E7("iptal (kurucu)"):\u00E7("iptal"):bizim>onlar?\u00E7("galibiyet"):bizim===onlar?\u00E7("beraberlik"):\u00E7("ma\u011Flubiyet");return`<div class=\
"liste-satir" data-futbol-gecmis="${esc(x.player_status)}"${lg?` data-futbol-gecmis-lig="${esc(lg.status??"")}"`:""}><span class="liste-ikon">${ikon(x.motm?"star":x.status==="finished"?"goal":hukmen?"\
flag":"x")}</span>
            <div><b>${esc(x.status==="finished"&&x.player_status==="played"?\u00E7("{a}\u2013{b} {d}",{a:sayi(bizim??0),b:sayi(onlar??0),d:durum}):durum)}</b>
            <div class="alt">${esc([saatYaz(x.starts_at),bolgeAdi(x.region_id),x.private?\u00E7("dostluk ma\xE7\u0131"):null,lg?\u00E7("lig ma\xE7\u0131: {ev} \u2013 {konuk}",{ev:mahalleTakimAdi(lg.home),
konuk:mahalleTakimAdi(lg.away)}):null,futbolPosAdi(x.pos),x.goals?\u00E7("{n} gol",{n:sayi(x.goals)}):null,x.assists?\u00E7("{n} asist",{n:sayi(x.assists)}):null,x.saves?\u00E7("{n} kurtar\u0131\u015F",
{n:sayi(x.saves)}):null,x.skill_gain?\u00E7("beceri +{n}",{n:sayi(x.skill_gain)}):null,x.motm?\u00E7("ma\xE7\u0131n adam\u0131"):null].filter(Boolean).join(" \xB7 "))}</div></div><span></span></div>`}).
join("")}</div>`:`<p class="bos">${\u00E7("Hen\xFCz ma\xE7 oynamad\u0131n.")}</p>`}
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
 yok.",{g:sayi(r.motm?.goal??3),a:sayi(r.motm?.assist??2),k:sayi(r.motm?.save??1),d:sayi(r.motm?.decision??1)})],...r.private?[["lock",\u00E7("Arkada\u015Flarla \xF6zel ma\xE7: kuran en \xE7ok {n} arkada\u015F\u0131n\u0131 ya da \
tan\u0131d\u0131\u011F\u0131n\u0131 davet eder; yaln\u0131z davetliler kat\u0131l\u0131r. Dostluk ma\xE7\u0131d\u0131r: beceri (yaln\u0131z ma\xE7 ba\u015F\u0131na), deneyim, keyif ve yak\u0131nl\u0131k kazan\u0131l\u0131r; galibiyet, gol ve madalya saya\xE7lar\u0131na ge\xE7mez. Kurucu ma\xE7\u0131 kilitten \
\xF6nce iptal edebilir.",{n:sayi(r.private.maxInvites??9)})]]:[]];return`<section class="kart" id="futbol-kurallar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kurallar")}</p><h2 class="b\
2">${\u00E7("Hal\u0131 saha nas\u0131l i\u015Fler?")}</h2></div><span class="ik-kutu">${ikon("book-open")}</span></div>
        <div class="liste">${maddeler.map(([ik,x])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(x)}</div></div><span></span></div>`).
join("")}</div>
      </section>`}const KP=futbolKararPenceresi({fn:"football_choose",simdi,rtt:()=>saat.rtt,mac:()=>mac,oyuncular}),kararAc=m=>KP.ac(m),kararKapat=()=>KP.kapat();function spikerYaz(){const m=mac;if(!m||
!["live","ended","finished"].includes(m.phase)||m.phase==="live"&&!m.watch){spiker.yaz(null);return}const el=futbolEl({bas:Date.parse(m.starts_at)},simdi()),Z=futbolZaman(),gorunen=(m.events??[]).filter(
e=>m.phase==="finished"||e.t+2e3<=el),l=oyuncular(),kisi=(s,yer)=>{const o=l.find(x=>x.taraf===s&&x.yer===yer);return o?o.ad||(o.ben?ben().name??null:null):null};spiker.yaz(m.id,macSpikerGirdisi(m,gorunen,
R().match?.minutesPerHalf??Z.dakika,el>=Z.yari),{takim:s=>takimAdi(s,m),kisi,adam:m.motm?m.motm.name||(m.motm.me?ben().name??null:null):null})}function sahneYaz(){const sonraki=(v?.program??[]).find(x=>x.
phase==="open"||x.phase==="closing");saha.yaz({mac,ben:{id:ben().id},saatFarki,bolge:v?.here??null,sonrakiMac:sonraki?Date.parse(sonraki.starts_at):null,yolda:!v?.here})}function ciz(){if(kapandi)return;
if(hata&&!v){kap.innerHTML=`<div class="sayfa"><div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(hata))}</span></div>
          <button class="dugme ikincil" style="margin-top:14px" id="futbol-yeniden">${\u00E7("Yeniden dene")}</button></div>`,$("#futbol-yeniden",kap).onclick=()=>tazele();return}const burada=!!v.here;
kap.innerHTML=`<div class="sayfa" data-futbol-bolge="${esc(v.here??"")}">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${esc(burada?\u00E7("{sehir} hal\u0131 sahas\u0131",{sehir:bolgeAdi(v.here)}):\u00E7("Hal\u0131 saha"))}\
</h1>
          <p class="aciklama">${\u00E7("5'e 5 ma\xE7lar: kur ya da kat\u0131l, sahada karar ver, gol at. Futbol becerin ma\xE7 ma\xE7 geli\u015Fir.")}</p></div>
          <div class="oneri-dugmeler">${kareSahneDugmeHtml("stadium",mac?.id?`football:${mac.id}`:null)}<span class="cip ${burada?"yesil":""}" id="futbol-burada">${ikon("map-pin")}${esc(burada?\u00E7(
"\u015Eehirdesin"):\u00E7("Yoldas\u0131n"))}</span></div></div>
        <div id="futbol-saha-yer"></div>
        <div class="izgara iki futbol-izgara" style="margin-top:20px">
          <div class="yigin">${davetlerHtml()}${macimHtml()}<div id="futbol-spiker-yer"></div>${ligKartHtml()}${programHtml()}${kurHtml()}</div>
          <div class="yigin">${benHtml()}${golculerHtml()}${sonuclarHtml()}${gecmisHtml()}${kurallarHtml()}</div>
        </div></div>`,$("#futbol-saha-yer",kap)?.replaceWith(saha.el),$("#futbol-spiker-yer",kap)?.replaceWith(spiker.el),sahneYaz(),spikerYaz(),bagla(),mac?.decision&&kararAc(mac)}function canliCiz(){
if(kapandi)return;const k=$("#futbol-macim",kap);if(k&&mac){const yeni=document.createElement("div");yeni.innerHTML=macimHtml();const el=yeni.firstElementChild;el&&el.outerHTML!==k.outerHTML&&(k.replaceWith(
el),bagla())}else if(mac&&!k){ciz();return}sahneYaz(),spikerYaz(),mac?.decision?kararAc(mac):KP.karar&&!(mac?.events??[]).some(x=>x.i===KP.karar.k.i)&&futbolEl({bas:Date.parse(KP.karar.m.starts_at)},simdi())<
KP.karar.k.opens-4e3&&kararKapat()}async function isle(fn,basari){if(!mesgul){mesgul=!0;try{const y=await fn();if(kapandi)return;basari?.(y),Durum.ozet().catch(()=>{}),await yukle()}catch(e){tost(hataMetni(
e),"circle-alert"),await yukle().catch(()=>{})}finally{mesgul=!1,kapandi||ciz()}}}async function katilPencere(id){const kartla=m=>m?{...m,taken:{a:(m.players??[]).filter(p=>p.side==="a"&&p.status!=="n\
o_show").map(p=>p.pos),b:(m.players??[]).filter(p=>p.side==="b"&&p.status!=="no_show").map(p=>p.pos)}}:null;let x=(v.program??[]).find(p=>p.id===id)??(mac?.id===id?kartla(mac):null);if(!x)try{x=kartla(
await Sunucu.cagir("football_match",{p_match:id}))}catch(e){tost(hataMetni(e),"circle-alert");return}if(!x||kapandi)return;const r=R(),secenek=[],takimim=v.neighborhood?.team?.id??null,ligTaraf=x.league?
x.league.home?.id===takimim?"a":x.league.away?.id===takimim?"b":null:null;for(const s of ligTaraf?[ligTaraf]:["a","b"])for(const p of["kaleci","defans","orta","forvet"]){const alinan=x.taken?.[s]??[];
secenek.push({s,p,bos:futbolYerVar(r,alinan,p)})}const ilk=secenek.find(o=>o.bos&&o.p!=="kaleci")??secenek.find(o=>o.bos);pencereForm({ust:\u00E7("{saat} \xB7 saha {n}",{saat:saatKisa(x.starts_at),n:sayi(
x.pitch)}),baslik:\u00E7("Ma\xE7a kat\u0131l"),onayAd:x.league?\u00E7("Kat\u0131l (\xFCcretsiz)"):\u00E7("Kat\u0131l ({kr} kredi)",{kr:kr(r.feeCr??200)}),onayIkon:"user-round-plus",govde:`<p class="ac\
iklama">${esc(x.league?\u00E7("Lig ma\xE7\u0131: tak\u0131m\u0131n\u0131n taraf\u0131nda oynars\u0131n, mevkini se\xE7. Ma\xE7 ba\u015Flarken \u015Fehirde olmal\u0131s\u0131n."):\u00E7("Tak\u0131m\u0131n\u0131 ve me\
vkini se\xE7. Kilitten \xF6nce ayr\u0131l\u0131rsan \xFCcretin d\xF6ner; ma\xE7 ba\u015Flarken \u015Fehirde olmal\u0131s\u0131n."))}</p>
          ${(ligTaraf?[ligTaraf]:["a","b"]).map(s=>`<p class="ust-yazi" style="margin-top:10px"><span class="futbol-renk" style="--forma:${takimRengi(s,x)}"></span> ${esc(takimAdi(s,x))} \xB7 ${esc(\u00E7(
"{n}/5",{n:sayi(x.counts?.[s]??0)}))}</p>
            <div class="secim-liste" role="radiogroup" aria-label="${esc(futbolTarafAdi(s))}">${secenek.filter(o=>o.s===s).map(o=>`<label class="secim-satir${o.bos?"":" kapali"}">
              <input type="radio" name="yer" value="${s}|${o.p}" ${o.bos?"":"disabled"} ${ilk&&ilk.s===s&&ilk.p===o.p?"checked":""}>
              <span><b>${esc(futbolPosAdi(o.p))}</b> <small>${esc(o.bos?o.p==="kaleci"?\u00E7("\u015Eutlarda sen karar verirsin"):o.p==="forvet"?\u00E7("F\u0131rsatlar \xE7o\u011Fu zaman sende"):\u00E7(
"yer var"):\u00E7("dolu"))}</small></span></label>`).join("")}</div>`).join("")}`,is:async f=>{const[s,p]=String(f.get("yer")??"").split("|");if(!s||!p)throw new Error(\u00E7("Bir yer se\xE7."));await Sunucu.
yap("football_join",{p_match:id,p_side:s,p_pos:p}),tost(\u00E7("Ma\xE7a kat\u0131ld\u0131n: {taraf}, {mevki}. Ma\xE7tan \xF6nce \u015Fehirde ol.",{taraf:takimAdi(s,x),mevki:futbolPosAdi(p)}),"goal"),izlenen=
null,Durum.ozet().catch(()=>{}),await yukle(),kapandi||ciz()}})}function kurPencere(){const r=R(),l=saatler(),gunler=[...new Set(l.map(x=>new Date(x.t).toDateString()))],gunAdi=g=>{const d=new Date(g),
bugun=new Date(simdi()).toDateString(),yarin=new Date(simdi()+864e5).toDateString();return g===bugun?\u00E7("Bug\xFCn"):g===yarin?\u00E7("Yar\u0131n"):d.toLocaleDateString(DIL.yerel,{weekday:"long",day:"\
numeric",month:"long"})},ilk=l.find(x=>!x.dolu),ff=pencereForm({ust:\u00E7("Hal\u0131 saha"),baslik:\u00E7("Ma\xE7 kur"),onayAd:\u00E7("Kur ({kr} kredi)",{kr:kr(r.feeCr??200)}),onayIkon:"calendar-plus",
govde:`<p class="aciklama">${esc(\u00E7("Saati, mevkini ve tak\u0131m\u0131n\u0131n takti\u011Fini se\xE7. Turuncular'da ba\u015Flars\u0131n; \u015Fehirdeki herkes kat\u0131labilir."))}</p>
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
"dolu")):""}</option>`).join("")};gunSec.onchange=doldur,doldur()}async function ozelPencere(){let liste;try{liste=await Sunucu.cagir("football_invitable")}catch(e){tost(hataMetni(e),"circle-alert");return}
if(kapandi)return;const r=R(),enCok=Number(liste?.max??r.private?.maxInvites??9),l=saatler(),gunler=[...new Set(l.map(x=>new Date(x.t).toDateString()))],gunAdi=g=>{const d=new Date(g),bugun=new Date(simdi()).
toDateString(),yarin=new Date(simdi()+864e5).toDateString();return g===bugun?\u00E7("Bug\xFCn"):g===yarin?\u00E7("Yar\u0131n"):d.toLocaleDateString(DIL.yerel,{weekday:"long",day:"numeric",month:"long"})},
ilk=l.find(x=>!x.dolu),ff=pencereForm({ust:\u00E7("Hal\u0131 saha"),baslik:\u00E7("Arkada\u015Flarla \xF6zel ma\xE7"),onayAd:\u00E7("Kur ve davet et ({kr} kredi)",{kr:kr(r.feeCr??200)}),onayIkon:"lock",
govde:`<p class="aciklama">${esc(\u00E7("Yaln\u0131z davet ettiklerin kat\u0131l\u0131r. Turuncular'da ba\u015Flars\u0131n; davetlinin tak\u0131m\u0131n\u0131 se\xE7ebilir ya da kendisine b\u0131rakabilirsin."))}\
</p>
          <label class="alan"><span>${\u00E7("G\xFCn")}</span><select name="gun">${gunler.map(g=>`<option value="${esc(g)}" ${ilk&&new Date(ilk.t).toDateString()===g?"selected":""}>${esc(gunAdi(g))}</\
option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Saat")}</span><select name="saat"></select></label>
          <label class="alan"><span>${\u00E7("Mevkin")}</span><select name="mevki">${["forvet","orta","defans","kaleci"].map(p=>`<option value="${p}">${esc(futbolPosAdi(p))}</option>`).join("")}</sele\
ct></label>
          <label class="alan"><span>${\u00E7("Taktik")}</span><select name="taktik">${["dengeli","hucum","savunma"].map(t=>`<option value="${t}">${esc(futbolTaktikAdi(t))}</option>`).join("")}</select\
></label>
          <fieldset class="alan"><legend>${\u00E7("Davetliler")}</legend>${futbolAdayHtml(liste?.people??[])}
            <p class="kucuk" id="futbol-ozel-secim">${esc(\u00E7("{n} / {m} ki\u015Fi se\xE7ildi",{n:0,m:enCok}))}</p></fieldset>
          <p class="kucuk">${esc(\u00E7("Her tak\u0131mda en az bir oyuncu olmal\u0131; yoksa ma\xE7 kilitte d\xFC\u015Fer ve \xFCcretler d\xF6ner. Bo\u015F yerlere mahalleden yedek girer. Davetlilerin ma\xE7 ba\u015Flarken bu \u015Fehirde olmal\
\u0131."))}</p>`,is:async(d,f)=>{const t=Number(d.get("saat"));if(!Number.isFinite(t)||!t)throw new Error(\u00E7("Bir saat se\xE7."));const davetler=futbolSecilenler(f);if(!davetler.length)throw new Error(
\u00E7("Davet edece\u011Fin ki\u015Fiyi se\xE7."));if(davetler.length>enCok)throw new Error(\u00E7("En \xE7ok {n} ki\u015Fi davet edebilirsin.",{n:enCok}));await Sunucu.yap("football_private_open",{p_starts_at:new Date(
t).toISOString(),p_pos:String(d.get("mevki")),p_tactic:String(d.get("taktik")),p_invites:davetler}),tost(\u00E7("\xD6zel ma\xE7\u0131 kurdun: {saat}. Davetlilerine haber gitti.",{saat:saatKisa(t)}),"l\
ock"),izlenen=null,Durum.ozet().catch(()=>{}),await yukle(),kapandi||ciz()}}),gunSec=$("select[name=gun]",ff.form),saatSec=$("select[name=saat]",ff.form),doldur=()=>{const g=gunSec.value,s2=l.filter(x=>new Date(
x.t).toDateString()===g),sec=s2.find(x=>!x.dolu);saatSec.innerHTML=s2.map(x=>`<option value="${x.t}" ${x.dolu?"disabled":""} ${sec&&x.t===sec.t?"selected":""}>${esc(saatKisa(x.t))}${x.dolu?" \xB7 "+esc(
\u00E7("dolu")):""}</option>`).join("")};gunSec.onchange=doldur,doldur();const say=()=>{const n=futbolSecilenler(ff.form).length;$("#futbol-ozel-secim",ff.form).textContent=\u00E7("{n} / {m} ki\u015Fi se\xE7i\
ldi",{n,m:enCok})};for(const k of $$("input[name=davetli]",ff.form))k.onchange=say}async function davetEklePencere(m){let liste;try{liste=await Sunucu.cagir("football_invitable",{p_match:m.id})}catch(e){
tost(hataMetni(e),"circle-alert");return}if(kapandi)return;const kalan=Math.max(0,Number(liste?.max??9)-Number(liste?.invited??0));pencereForm({ust:\u00E7("{saat} ma\xE7\u0131",{saat:saatKisa(m.starts_at)}),
baslik:\u00E7("Davet et"),onayAd:\u00E7("Davet et"),onayIkon:"user-round-plus",govde:`${futbolAdayHtml((liste?.people??[]).filter(x=>!x.invited))}<p class="kucuk">${esc(\u00E7("{n} ki\u015Fi daha davet ede\
bilirsin.",{n:kalan}))}</p>`,is:async(d,f)=>{const davetler=futbolSecilenler(f);if(!davetler.length)throw new Error(\u00E7("Davet edece\u011Fin ki\u015Fiyi se\xE7."));if(davetler.length>kalan)throw new Error(
\u00E7("En \xE7ok {n} ki\u015Fi davet edebilirsin.",{n:kalan}));await Sunucu.yap("football_invite_add",{p_match:m.id,p_invites:davetler}),tost(\u00E7("{n} ki\u015Fi davet edildi.",{n:davetler.length}),
"user-round-plus"),await yukle(),kapandi||ciz()}})}function davetKatilPencere(id){const x=(v.invites??[]).find(p=>p.id===id);if(!x)return;const r=R(),sabit=x.invite?.side??null,secenek=[];for(const s of sabit?
[sabit]:["a","b"]){const yer=Number(x.counts?.[s]??0)+Number(x.reserved?.[s]??0)<Number(r.team?.size??5);for(const p of["kaleci","defans","orta","forvet"])secenek.push({s,p,bos:yer&&futbolYerVar(r,x.taken?.[s]??
[],p)})}const ilk=secenek.find(o=>o.bos&&o.p!=="kaleci")??secenek.find(o=>o.bos);pencereForm({ust:\u00E7("{ad} \xB7 {zaman}",{ad:x.host??\u00E7("Kurucu"),zaman:saatYaz(x.starts_at)}),baslik:\u00E7("\xD6z\
el ma\xE7a kat\u0131l"),onayAd:\u00E7("Kat\u0131l ({kr} kredi)",{kr:kr(x.fee_cr??r.feeCr??200)}),onayIkon:"check",govde:`<p class="aciklama">${esc(sabit?\u00E7("Kurucu seni {t} tak\u0131m\u0131na koydu; mevkini\
 se\xE7.",{t:futbolTarafAdi(sabit)}):\u00E7("Tak\u0131m\u0131n\u0131 ve mevkini se\xE7."))} ${esc(\u00E7("Kilitten \xF6nce ayr\u0131l\u0131rsan \xFCcretin d\xF6ner; ma\xE7 ba\u015Flarken \u015Fehirde olmal\u0131s\u0131n."))}\
</p>
          ${[...new Set(secenek.map(o=>o.s))].map(s=>`<p class="ust-yazi" style="margin-top:10px"><span class="futbol-renk" style="--forma:${FUTBOL_RENK[s]}"></span> ${esc(futbolTarafAdi(s))} \xB7 ${esc(
\u00E7("{n}/5",{n:sayi(x.counts?.[s]??0)}))}${Number(x.reserved?.[s]??0)?" \xB7 "+esc(\u00E7("{n} yer davetlilere ayr\u0131ld\u0131",{n:sayi(x.reserved[s])})):""}</p>
            <div class="secim-liste" role="radiogroup" aria-label="${esc(futbolTarafAdi(s))}">${secenek.filter(o=>o.s===s).map(o=>`<label class="secim-satir${o.bos?"":" kapali"}">
              <input type="radio" name="yer" value="${s}|${o.p}" ${o.bos?"":"disabled"} ${ilk&&ilk.s===s&&ilk.p===o.p?"checked":""}>
              <span><b>${esc(futbolPosAdi(o.p))}</b> <small>${esc(o.bos?\u00E7("yer var"):\u00E7("dolu"))}</small></span></label>`).join("")}</div>`).join("")}`,is:async f=>{const[s,p]=String(f.get("y\
er")??"").split("|");if(!s||!p)throw new Error(\u00E7("Bir yer se\xE7."));await Sunucu.yap("football_invite_answer",{p_match:id,p_accept:!0,p_side:s,p_pos:p}),tost(\u00E7("\xD6zel ma\xE7a kat\u0131ld\u0131n: {taraf},\
 {mevki}. Ma\xE7tan \xF6nce \u015Fehirde ol.",{taraf:futbolTarafAdi(s),mevki:futbolPosAdi(p)}),"goal"),izlenen=null,Durum.ozet().catch(()=>{}),await yukle(),kapandi||ciz()}})}function bagla(){for(const b of $$(
"[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-futbol-kisi]",kap))b.closest(".futbol-sahne")||(b.onclick=()=>profilAc(b.dataset.futbolKisi));for(const b of $$("[data\
-futbol-katil]",kap))b.onclick=()=>katilPencere(b.dataset.futbolKatil);for(const b of $$("[data-futbol-izle]",kap))b.onclick=async()=>{izlenen=b.dataset.futbolIzle,await yukle(),kapandi||(ciz(),git("#\
futbol-saha"))};const ib=$("#futbol-izleme-birak",kap);ib&&(ib.onclick=async()=>{izlenen=null,await yukle(),kapandi||ciz()});const kb=$("#futbol-kur-ac",kap);kb&&(kb.onclick=()=>kurPencere());const ob=$(
"#futbol-ozel-ac",kap);ob&&(ob.onclick=()=>ozelPencere());for(const b of $$("[data-futbol-davet-katil]",kap))b.onclick=()=>davetKatilPencere(b.dataset.futbolDavetKatil);for(const b of $$("[data-futbol\
-davet-red]",kap))b.onclick=()=>isle(()=>Sunucu.yap("football_invite_answer",{p_match:b.dataset.futbolDavetRed,p_accept:!1}),()=>tost(\u00E7("Daveti geri \xE7evirdin; kurucuya haber gitti."),"x"));for(const b of $$(
"[data-futbol-davet-git]",kap))b.onclick=()=>git("#futbol-davetler");const de=$("#futbol-davet-ekle",kap);de&&(de.onclick=()=>davetEklePencere(mac));const ip=$("#futbol-iptal",kap);ip&&(ip.onclick=()=>{
const m=mac;pencere({ust:\u00E7("{saat} ma\xE7\u0131",{saat:saatKisa(m.starts_at)}),baslik:\u00E7("\xD6zel ma\xE7\u0131 iptal et"),govde:`<p class="aciklama">${esc(\u00E7("Kat\u0131lanlar\u0131n \xFCcreti d\xF6ner; k\
at\u0131lanlara ve yan\u0131t bekleyen davetlilere haber gider."))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\u0130ptal et"),sinif:"mercan",ikon:"x",is:()=>isle(()=>Sunucu.yap("football_pri\
vate_cancel",{p_match:m.id}),()=>tost(\u00E7("\xD6zel ma\xE7 iptal edildi; \xFCcretler d\xF6nd\xFC."),"x"))}]})});for(const b of $$("[data-futbol-yokum]",kap))b.onclick=()=>{const yok=b.dataset.yokum===
"1";isle(()=>Sunucu.yap("football_league_skip",{p_match:b.dataset.futbolYokum,p_skip:yok}),()=>tost(yok?\u00E7("Bu ma\xE7ta yokum dedin; kendili\u011Finden kadroya girmezsin."):\u00E7("Gelirim dedin; \
kilitte \u015Fehirdeysen kendili\u011Finden oynars\u0131n."),yok?"calendar-x":"check"))};for(const b of $$("[data-futbol-taktik]",kap))b.onclick=()=>{const t=b.dataset.futbolTaktik;isle(()=>Sunucu.yap(
"football_tactic",{p_match:mac.id,p_tactic:t}),()=>tost(\u00E7("Taktik: {t}.",{t:futbolTaktikAdi(t)}),FUTBOL_TAKTIK_IK[t]))};const ay=$("#futbol-ayril",kap);ay&&(ay.onclick=()=>{const m=mac;pencere({ust:\u00E7(
"{saat} ma\xE7\u0131",{saat:saatKisa(m.starts_at)}),baslik:\u00E7("Ma\xE7tan ayr\u0131l"),govde:`<p class="aciklama">${esc(m.league?\u00E7("Bu ma\xE7ta yokum say\u0131l\u0131rs\u0131n: kilitte kendili\u011Finden kadroya gir\
mezsin. Fikrini de\u011Fi\u015Ftirirsen yeniden kat\u0131l."):\u00E7("\xDCcretin geri d\xF6ner; bug\xFCnk\xFC hakk\u0131ndan say\u0131lmaz. Kaptan ayr\u0131l\u0131rsa tak\u0131m\u0131na sonra kat\u0131lan kaptan olur."))}\
</p>`,dugmeler:[{ad:\u00E7("Kal")},{ad:\u00E7("Ayr\u0131l"),sinif:"mercan",ikon:"door-open",is:()=>isle(()=>Sunucu.yap("football_leave",{p_match:m.id}),()=>tost(m.league?\u00E7("Ma\xE7tan ayr\u0131ld\u0131n; bu ma\
\xE7ta yokum say\u0131ld\u0131n."):\u00E7("Ma\xE7tan ayr\u0131ld\u0131n; \xFCcretin geri d\xF6nd\xFC."),"door-open"))}]})})}const tazele=tazeleyici(async()=>{await yukle(),!kapandi&&!mesgul&&!document.
querySelector(".perde")&&ciz()});function sonrakiYoklama(){if(clearTimeout(yoklamaZaman),kapandi)return;const m=mac,canli=m&&["closing","locked","live","ended"].includes(m.phase);let bekle=canli?2500:
3e4;if(m&&m.phase==="open"&&m.lock_at){const x=Date.parse(m.lock_at)-simdi()+2e3;x>150&&x<bekle&&(bekle=x)}if(m&&canli){const el=futbolEl({bas:Date.parse(m.starts_at)},simdi());for(const n of m.next??
[]){const sonuc=n.t-el+300,pencereOnu=n.t-el-Number(R().decisionMs??6e3)-2500;for(const x of[sonuc,pencereOnu])x>150&&x<bekle&&(bekle=x)}const Z=futbolZaman();for(const x of[-el+300,Z.yari-el+300,Z.ikinci-
el+300,Z.son-el+1500])x>150&&x<bekle&&(bekle=x)}yoklamaZaman=setTimeout(async()=>{if(kapandi)return;if(document.hidden){sonrakiYoklama();return}const evre=mac?.phase;canli?(await canliYukle(),mac?.phase!==
evre||mac?.phase==="finished"||Date.now()-sonGenel>3e4?(await yukle(),!kapandi&&!mesgul&&!document.querySelector(".perde")&&ciz()):canliCiz()):(await yukle(),!kapandi&&!mesgul&&!document.querySelector(
".perde")&&ciz()),sonEvre=mac?.phase??null,sonrakiYoklama()},Math.max(150,bekle))}if(await yukle(),!kap.isConnected)return saha.kapat(),()=>{};ciz(),sonrakiYoklama();const b1=Durum.dinle("olay",({olay})=>{
/^football\./.test(olay)&&tazele().then(()=>sonrakiYoklama())});return()=>{kapandi=!0,b1(),clearTimeout(yoklamaZaman),kararKapat(),saha.kapat(),spiker.kapat()}}}),Parcalar.tamam("ek_98zzd_futbol");
