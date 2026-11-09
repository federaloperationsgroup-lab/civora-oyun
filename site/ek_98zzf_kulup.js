// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_98zzf_kulup.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/stadyum",{async ac(kap){let v=null,kul=null,mac=null,lig=null,hata=null,kapandi=!1,mesgul=!1,saatFarki=0,izlenen=null,kulupId=null,ligSecili=null,arama={q:"",sonuc:null},sonGenel=0,
yoklamaZaman=null;const saha=FutbolKart.ac({kulup:!0}),ben=()=>Durum.v.ozet?.character??{},KR=()=>kulupKurali()??v?.rule?.club??{},simdi=()=>Date.now()+saatFarki,git=sec=>$(sec,kap)?.scrollIntoView({behavior:hareketAzalt?
"auto":"smooth",block:"start"});saha.dinle("sec",(ad,id)=>{if(ad==="kisi"&&id){profilAc(id);return}git("#stadyum-mac")});let saat={rtt:1/0,an:0};const saatOrnek=(zaman,t0,t1)=>{if(!zaman)return;const rtt=t1-
t0,fark=Date.parse(zaman)-(t0+t1)/2;Number.isFinite(fark)&&(rtt<=saat.rtt||Date.now()-saat.an>6e4)&&(saat={rtt,an:Date.now()},saatFarki=fark)},zamanli=async(fn,args)=>{const t0=Date.now(),x=await Sunucu.
cagir(fn,args);return saatOrnek(x?.server_time,t0,Date.now()),x},oyuncular=()=>futbolKadro(mac?.players??[]),KP=futbolKararPenceresi({fn:"club_choose",simdi,rtt:()=>saat.rtt,mac:()=>mac,oyuncular}),K3={
get v(){return v},get kul(){return kul},get mesgul(){return mesgul},ben,KR,simdi,isle:(fn,basari)=>isle(fn,basari),yukle:()=>yukle(),ciz:()=>{kapandi||ciz()},kulupAc:id=>kulupAc(id),macIzle:id=>macIzle(
id)};function gosterilen(){if(izlenen)return izlenen;const n=v?.mine?.next;if(n&&(["locked","live","closing"].includes(n.phase)||Date.parse(n.starts_at)-simdi()<48*36e5))return n.id;const l=v?.matches??
[],suren=l.find(x=>["live","locked","closing"].includes(x.phase));if(suren)return suren.id;const Z=kulupZaman(),bitenler=l.filter(x=>x.status==="finished"&&simdi()-(Date.parse(x.starts_at)+Z.son)<15*6e4),
biten=bitenler.filter(x=>Date.parse(x.starts_at)<=simdi()).at(-1)??bitenler.at(-1);return biten?biten.id:l.find(x=>x.phase==="open")?.id??null}async function yukle(){try{const[x]=await Promise.all([zamanli(
"clubs"),Durum.kurallar().catch(()=>null)]);v=x,sonGenel=Date.now();const id=gosterilen();mac=id?await zamanli("club_match",{p_match:id}).catch(()=>null):null,izlenen&&!mac&&(izlenen=null),kulupId&&(kul=
await Sunucu.cagir("club",{p_club:kulupId}).catch(e=>(tost(hataMetni(e),"circle-alert"),kulupId=null,null)));const ligler=v.leagues??[],benimLig=v.mine?.league?.id&&ligler.some(l=>l.id===v.mine.league.
id)?v.mine.league.id:null;(!ligSecili||!ligler.some(l=>l.id===ligSecili))&&(ligSecili=benimLig??ligler[0]?.id??null),lig=ligSecili?await Sunucu.cagir("club_league",{p_league:ligSecili}).catch(()=>null):
null,hata=null}catch(e){hata=e}}async function canliYukle(){const id=gosterilen();if(id)try{const x=await zamanli("club_match",{p_match:id});if(kapandi)return;mac=x}catch{}}const R=()=>kulupKurali()??
{};function takimHtml(m,s){const k=s==="a"?m.home:m.away,F=kulupFormalari(m.home,m.away);return`<button type="button" class="kulup-mac-takim" data-kulup-ac="${esc(k?.id??"")}">${kulupArma(k,48)}<b>${esc(
kulupAdi(k))}</b>
        <small><span class="futbol-renk" style="--forma:${F[s]}"></span> ${esc(s==="a"?\u00E7("Ev sahibi"):\u00E7("Deplasman"))}</small></button>`}function kadroHtml(m){if(!oyuncular().length)return"";
const d=futbolVerisi(m,{id:ben().id},0,{kulup:!0}),takim=s=>{const t=d.oyuncular.filter(o=>o.taraf===s).sort((x,y)=>x.yer-y.yer),satir=o=>{const ic=`<span class="futbol-forma" style="--forma:${futbolForma(
o)};color:${futbolYaziRengi(futbolForma(o))}">${esc(o.no!=null?String(o.no):FUTBOL_POS_KISA[o.mevki]??"")}</span>
            <div><b>${esc(o.ben?\u00E7("Sen"):o.ad??\u00E7("Ad\u0131n\u0131 gizleyen biri"))}</b><div class="alt">${esc([futbolPosAdi(o.mevki),o.akademi?\u00E7("altyap\u0131"):null,o.guc!=null?\u00E7(
"g\xFC\xE7 {n}",{n:sayi(o.guc)}):null,o.gol?\u00E7("{n} gol",{n:sayi(o.gol)}):null,o.asist?\u00E7("{n} asist",{n:sayi(o.asist)}):null,o.kurtaris?\u00E7("{n} kurtar\u0131\u015F",{n:sayi(o.kurtaris)}):null].
filter(Boolean).join(" \xB7 "))}</div></div>
            ${o.ben?`<span class="cip altin kucuk-cip">${\u00E7("Sen")}</span>`:"<span></span>"}`;return o.id&&!o.ben?`<button type="button" class="liste-satir" data-kulup-kisi="${esc(o.id)}">${ic}</b\
utton>`:`<div class="liste-satir">${ic}</div>`},taktik=m[`tactic_${s}`];return`<div class="futbol-takim" data-kulup-takim="${s}"><div class="futbol-takim-bas"><span class="futbol-renk" style="--forma:${d.
renk[s]}"></span><b>${esc(futbolTakimKisa(d,s))}</b>
            <span class="cip kucuk-cip">${ikon(FUTBOL_TAKTIK_IK[taktik]??"scale")}${esc(futbolTaktikAdi(taktik))}</span></div>
          <div class="liste">${t.map(satir).join("")}</div></div>`};return`<div class="futbol-kadro">${takim("a")}${takim("b")}</div>`}function olaylarHtml(m){const l=oyuncular(),d=futbolVerisi(m,{id:ben().
id},0,{kulup:!0}),el=futbolEl({bas:Date.parse(m.starts_at)},simdi()),ev=(m.events??[]).filter(e=>m.phase==="finished"||e.t+2e3<=el).slice().reverse();return ev.length?`<div class="liste futbol-olaylar\
">${ev.map(e=>{const y=kulupOlayYazi(e,l,d),benSut=e.decided_a&&l.find(o=>o.taraf===e.s&&o.yer===e.sh)?.ben,kararim=e.decided_g&&l.find(o=>o.taraf!==e.s&&o.yer===0)?.ben?\u00E7("Senin karar\u0131n: {k}",
{k:futbolKararAdi(e.keeper,"gk")})+(e.okG?" \xB7 "+\u00E7("do\u011Fru karar"):""):benSut?\u00E7("Senin karar\u0131n: {k}",{k:futbolKararAdi(e.attack,"att")})+(e.okA?" \xB7 "+\u00E7("do\u011Fru karar"):
""):"";return`<div class="liste-satir${y.soluk?" soluk":""}${y.gol?" gol":""}" data-kulup-olay="${e.i}"><span class="liste-ikon ${y.gol?"altin":""}">${ikon(y.ik)}</span>
          <div><div class="alt" style="margin:0"><b>${sayi(e.minute??0)}'</b> ${esc(y.metin)}</div>${kararim?`<div class="alt">${esc(kararim)}</div>`:""}</div>
          <span class="futbol-skor-kucuk">${sayi(e.score_a)}\u2013${sayi(e.score_b)}</span></div>`}).join("")}</div>`:`<p class="kucuk">${esc(m.phase==="live"?\u00E7("\u0130lk atak birazdan."):\u00E7(
"Ma\xE7ta olay yok."))}</p>`}function hazirHtml(m){if(!m.my_side||m.status!=="scheduled")return"";const r=R(),l=m.ready??[],acilis=Date.parse(m.starts_at)-Number(r.readyHours??48)*36e5,kilit=Date.parse(
m.lock_at),acik=simdi()>=acilis&&simdi()<kilit,secili=l.filter(x=>x.slot!=null).length;return`<div class="kulup-hazir" id="stadyum-hazir">
        <p class="ust-yazi" style="margin-top:12px">${\u00E7("Ma\xE7a haz\u0131r olanlar")} \xB7 ${esc(\u00E7("{n} ki\u015Fi",{n:sayi(l.length)}))}</p>
        ${l.length?`<div class="cip-satir">${l.map(x=>`<span class="cip kucuk-cip${x.here?"":" soluk"}" title="${esc(x.here?\u00E7("\u015Fehirde"):\u00E7("\u015Fehirde de\u011Fil"))}">${esc(futbolPosAdi(
x.pos))}: ${esc(x.me?\u00E7("Sen"):x.name??"?")}${x.slot!=null?" \xB7 "+esc(\u00E7("kadroda")):""}</span>`).join("")}</div>`:`<p class="kucuk">${esc(\u00E7("Hen\xFCz kimse haz\u0131r demedi."))}</p>`}\

        <div class="oneri-dugmeler" style="margin-top:8px">
          ${acik?`<button class="dugme ${m.my_ready?"sade":"altin"}" id="stadyum-hazir-dugme" data-hazir="${m.my_ready?"0":"1"}" ${mesgul?"disabled":""}>${ikon(m.my_ready?"x":"badge-check")}${m.my_ready?
\u00E7("Haz\u0131r\u0131m'\u0131 geri al"):\u00E7("Ma\xE7a haz\u0131r\u0131m")}</button>`:""}
          ${m.coach&&acik?`<button class="dugme ikincil" id="stadyum-kadro-dugme" ${mesgul?"disabled":""}>${ikon("users-round")}${\u00E7("Kadroyu kur")}</button>`:""}
        </div>
        <p class="kucuk">${esc(!acik&&simdi()<acilis?\u00E7('"Ma\xE7a haz\u0131r\u0131m" ma\xE7tan {n} saat \xF6nce a\xE7\u0131l\u0131r.',{n:sayi(r.readyHours??48)}):\u00E7("Kilitte (ma\xE7tan {dk} dakik\
a \xF6nce) \u015Fehirde olan haz\u0131r oyuncular sahaya \xE7\u0131kar; teknik direkt\xF6r kadroyu se\xE7mediyse en g\xFC\xE7l\xFCler mevkilerine yerle\u015Fir, eksik yerlere altyap\u0131dan oyuncu girer.{kadro}",
{dk:sayi(r.lockMinutes??10),kadro:secili?" "+\u00E7("Kadroda {n} ki\u015Fi se\xE7ili.",{n:sayi(secili)}):""}))}</p>
      </div>`}function biletHtml(m){if(["cancelled","proposed"].includes(m.status))return"";const fiyat=Number(m.ticket_price_cr??0),t=m.ticket,acik=m.status==="scheduled"&&simdi()<Date.parse(m.lock_at),
kapasite=Number(m.ground?.capacity??0),oyuncu=!!m.my_side;let ic;t?ic=`<span class="cip yesil">${ikon("ticket-check")}${esc(t.season?\u00E7("Kombinenle trib\xFCndesin"):\u00E7("Biletin var ({kr} kredi\
)",{kr:kr(t.price_cr??0)}))}</span>
        ${acik&&!t.season?`<button class="dugme sade kucuk-d" id="stadyum-bilet-iade" ${mesgul?"disabled":""}>${ikon("undo-2")}${\u00E7("\u0130ade et")}</button>`:""}`:acik?ic=`<button class="dugme al\
tin" id="stadyum-bilet-al" ${mesgul?"disabled":""}>${ikon("ticket")}${esc(\u00E7("Bilet al ({kr} kredi)",{kr:kr(fiyat)}))}</button>`:ic=`<span class="cip kucuk-cip">${esc(m.status==="finished"?\u00E7(
"Ma\xE7 oynand\u0131"):\u00E7("Bilet sat\u0131\u015F\u0131 kapand\u0131"))}</span>`;const say=m.attendance?\u00E7("Trib\xFCnde {n} ki\u015Fi (kapasite {k}).",{n:sayi(Number(m.attendance.real??0)+Number(
m.attendance.sim??0)),k:sayi(m.attendance.capacity??kapasite)}):\u00E7("{n} bilet sat\u0131ld\u0131; kapasite {k}.",{n:sayi(m.tickets_sold??0),k:sayi(kapasite)});return`<div class="kulup-bilet" id="st\
adyum-bilet"><p class="ust-yazi" style="margin-top:12px">${\u00E7("Trib\xFCn")}</p>
        <div class="oneri-dugmeler">${ic}</div>
        <p class="kucuk">${esc(say)} ${esc(oyuncu?\u00E7('Ma\xE7\u0131 \u015Fehirdeki herkes izler; kul\xFCb\xFCn\xFCn ma\xE7\u0131nda kadroya girmek i\xE7in "Ma\xE7a haz\u0131r\u0131m" de.'):\u00E7("\
Ma\xE7\u0131 \u015Fehirdeki herkes izler; biletle trib\xFCndesin (keyif ve Taraftar madalyas\u0131). Bilet kilide dek iade edilir; kilitte \u015Fehirde de\u011Filsen gelmedin say\u0131l\u0131r, para d\xF6nmez."))}\
</p>
        ${m.gate?`<p class="kucuk" data-kulup-gise>${ikon("coins")} ${esc(\u00E7("Gi\u015Fe {g} kredi: sistem bedeli {f}, kira {k}, kasaya {n}.",{g:kr(m.gate.gross??0),f:kr(m.gate.fee??0),k:kr(m.gate.
rent??0),n:kr(m.gate.net??0)}))}</p>`:""}
      </div>`}function macHtml(){const m=mac;if(!m)return"";const el=futbolEl({bas:Date.parse(m.starts_at)},simdi()),d=futbolVerisi(m,{id:ben().id},0,{kulup:!0}),r=R(),orta=["live","ended","finished"].
includes(m.phase)?`<div class="kulup-mac-skor" data-kulup-skor="${sayi(m.score_a??0)}-${sayi(m.score_b??0)}"><b>${sayi(m.score_a??0)} \u2013 ${sayi(m.score_b??0)}</b>
          <small>${esc(m.phase==="finished"||m.phase==="ended"?\u00E7("Ma\xE7 sonu"):m.break?\u00E7("Devre aras\u0131"):\u00E7("{dk}. dakika",{dk:sayi(m.minute??futbolDakika(el,kulupZaman()))}))}</sma\
ll></div>`:`<div class="kulup-mac-skor"><b>${esc(saatKisa(m.starts_at))}</b><small>${esc(new Date(m.starts_at).toLocaleDateString(DIL.yerel,{weekday:"short",day:"numeric",month:"short"}))}</small></di\
v>`,yazi=m.phase==="proposed"?\u00E7("Haz\u0131rl\u0131k ma\xE7\u0131 \xF6nerisi; kar\u015F\u0131 kul\xFCb\xFCn teknik direkt\xF6r\xFC ya da ba\u015Fkan\u0131 yan\u0131tlar."):m.phase==="open"&&m.kind===
"national"?\u00E7('Mill\xEE ma\xE7: kadro ma\xE7tan {dk} dakika \xF6nce kilitlenir. Mill\xEE kadrodaysan "Ma\xE7a haz\u0131r\u0131m" de; teknik direkt\xF6r kadroyu kurar. Kupa ma\xE7\u0131nda beraberlik penalt\u0131lara gider.',
{dk:sayi(r.lockMinutes??10)}):m.phase==="open"&&m.cup?\u00E7('Kupa ma\xE7\u0131: tek ma\xE7, beraberlikte penalt\u0131lar. Kadro ma\xE7tan {dk} dakika \xF6nce kilitlenir; kul\xFCb\xFCn oyuncusuysan "Ma\xE7a haz\u0131r\u0131m" de ve kilitte \u015F\
ehirde ol.',{dk:sayi(r.lockMinutes??10)}):m.phase==="open"?\u00E7('Kadro ma\xE7tan {dk} dakika \xF6nce kilitlenir. Kul\xFCb\xFCn oyuncusuysan "Ma\xE7a haz\u0131r\u0131m" de ve kilitte \u015Fehirde ol.',
{dk:sayi(r.lockMinutes??10)}):m.phase==="closing"?\u00E7("Kadro kilitleniyor; birazdan altyap\u0131 oyuncular\u0131 eksik yerlere ge\xE7er."):m.phase==="locked"?\u00E7("Kadrolar kilitlendi; ba\u015Flama sa\
ati {saat}. Atak sana gelince ekran\u0131n alt\u0131nda karar penceresi a\xE7\u0131l\u0131r.",{saat:saatKisa(m.starts_at)}):m.phase==="live"?m.break?\u00E7("Devre aras\u0131; ikinci devrede tak\u0131mlar yer de\
\u011Fi\u015Ftirir."):\u00E7("Ma\xE7 s\xFCr\xFCyor ({devre}. devre). Atak sana gelince karar penceresi a\xE7\u0131l\u0131r; 6 saniyen var.",{devre:sayi(m.half??1)}):m.phase==="cancelled"?\u00E7("Ma\xE7 i\
ptal edildi: {neden}.",{neden:KULUP_IPTAL_AD[m.cancel_reason]??""}):m.forfeit?\u00E7("H\xFCkmen sonu\xE7: {takim} yeterli oyuncuyla gelmedi (0\u20133).",{takim:futbolTakimAdi(d,m.forfeit)}):"",benO=oyuncular().
find(o=>o.ben);let sonuc="";if(m.phase==="finished"&&benO&&!m.forfeit){const a=Number(m.score_a??0),b=Number(m.score_b??0),bizim=benO.taraf==="a"?a:b,onlar=benO.taraf==="a"?b:a,kazanc=(m.players??[]).
find(p=>p.me)?.skill_gain;sonuc=`<div class="bilgi-kutusu ${bizim>onlar?"":"uyari-kutusu"}" style="margin-top:10px" data-kulup-sonuc="${bizim>onlar?"galibiyet":bizim===onlar?"beraberlik":"maglubiyet"}\
">${ikon(bizim>onlar?"trophy":bizim===onlar?"scale":"shield")}<span>
          ${esc(bizim>onlar?\u00E7("Kazand\u0131n\u0131z {a}\u2013{b}!",{a:bizim,b:onlar}):bizim===onlar?\u00E7("Berabere {a}\u2013{b}.",{a:bizim,b:onlar}):\u00E7("Kaybettiniz {a}\u2013{b}.",{a:bizim,
b:onlar}))}
          ${esc([benO.gol?\u00E7("{n} gol",{n:sayi(benO.gol)}):null,benO.asist?\u00E7("{n} asist",{n:sayi(benO.asist)}):null,benO.kurtaris?\u00E7("{n} kurtar\u0131\u015F",{n:sayi(benO.kurtaris)}):null,
kazanc?\u00E7("futbol becerin +{n}",{n:sayi(kazanc)}):null].filter(Boolean).join(" \xB7 "))}</span></div>`}const adam=m.motm?`<p class="kucuk" data-kulup-adam="${m.motm.me?"ben":"1"}">${ikon("star")} ${esc(
m.motm.me?\u00E7("Ma\xE7\u0131n adam\u0131 sensin!"):\u00E7("Ma\xE7\u0131n adam\u0131: {ad}",{ad:m.motm.name??\u00E7("ad\u0131n\u0131 gizleyen biri")}))}</p>`:"",benimKulup=v?.mine?.id,oneriYanit=m.phase===
"proposed"&&benimKulup===m.away?.id&&(v.mine.coach||v.mine.president),oneriGeri=m.phase==="proposed"&&benimKulup===m.home?.id&&(v.mine.coach||v.mine.president),kupaUst=typeof kupaMacUstYazi=="function"?
kupaMacUstYazi(m):null;return`<section class="kart" id="stadyum-mac" data-kulup-mac="${esc(m.id)}" data-kulup-evre="${esc(m.phase)}"${m.cup?` data-kulup-kupa="${esc(m.cup.competition)}"`:""}${m.final?
' data-kulup-final="1"':""}>
        <div class="kart-bas"><div><p class="ust-yazi">${esc([kupaUst??kulupMacTuru(m),!kupaUst&&m.round?\u00E7("{n}. hafta",{n:sayi(m.round)}):null,bolgeAdi(m.region_id),m.ground?.own?\u00E7("kul\xFCb\xFCn\
 stadyumu"):\u00E7("belediye stadyumu")].filter(Boolean).join(" \xB7 "))}</p>
          <h2 class="b2">${ikon("land-plot")} ${esc(\u00E7("{ev} \u2013 {dep}",{ev:m.home?.short??"",dep:m.away?.short??""}))}</h2></div>
          <span class="cip ${kulupEvreRenk(m.phase)}">${esc(kulupEvreAdi(m.phase))}</span></div>
        <div class="kulup-mac-takimlar">${takimHtml(m,"a")}${orta}${takimHtml(m,"b")}</div>
        ${yazi?`<p class="kucuk">${esc(yazi)}</p>`:""}
        ${!m.watch&&m.phase==="live"?`<p class="bilgi-kutusu" style="margin-top:6px">${ikon("map-pin")}<span>${esc(\u00E7("Ma\xE7\u0131 izlemek i\xE7in \u015Fehirde olmal\u0131s\u0131n; sonucu ma\xE7 bitince g\xF6r\xFCn\xFCr."))}\
</span></p>`:""}
        ${oneriYanit?`<div class="oneri-dugmeler"><button class="dugme altin" id="stadyum-oneri-kabul" ${mesgul?"disabled":""}>${ikon("handshake")}${\u00E7("Kabul et")}</button>
          <button class="dugme sade" id="stadyum-oneri-ret" ${mesgul?"disabled":""}>${ikon("x")}${\u00E7("Reddet")}</button></div>`:""}
        ${oneriGeri?`<div class="oneri-dugmeler"><button class="dugme sade" id="stadyum-oneri-geri" ${mesgul?"disabled":""}>${ikon("undo-2")}${\u00E7("\xD6neriyi geri \xE7ek")}</button></div>`:""}
        ${hazirHtml(m)}
        ${biletHtml(m)}
        ${kadroHtml(m)}
        ${["live","ended","finished"].includes(m.phase)?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Ma\xE7\u0131n ak\u0131\u015F\u0131")}</p>${olaylarHtml(m)}`:""}
        ${m.shootout&&typeof penaltiYazi=="function"?penaltiYazi(m):""}
        ${m.phase==="finished"&&m.final&&m.cup&&(m.shootout_winner||Number(m.score_a)!==Number(m.score_b)||m.forfeit)?`<div class="bilgi-kutusu kulup-toren" style="margin-top:10px" data-kulup-toren="1\
">${ikon("trophy")}<span>${esc(\u00E7("{kulup} {kupa} \u015Fampiyonu!",{kulup:kulupAdi((m.shootout_winner?m.shootout_winner==="a":m.forfeit?m.forfeit==="b":Number(m.score_a)>Number(m.score_b))?m.home:
m.away),kupa:kupaAdi(m.cup)}))}</span>
          <button class="baglanti" type="button" data-kupa-ac="${esc(m.cup.id)}">${\u00E7("A\u011Fa\xE7")}</button></div>`:""}
        ${adam}${sonuc}
        ${izlenen?`<div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme sade" id="stadyum-izleme-birak">${ikon("x")}${\u00E7("\u0130zlemeyi b\u0131rak")}</button></div>`:""}
      </section>`}function macSatir(x,secenek={}){const skor=x.status==="finished"?`${sayi(x.score_a??0)}\u2013${sayi(x.score_b??0)}`:x.phase==="live"?`${sayi(x.score_a??0)}\u2013${sayi(x.score_b??0)}`:
saatKisa(x.starts_at),alt=[kulupMacTuru(x),x.final?\u00E7("final"):null,kulupTarihi(x.starts_at),x.attendance!=null?\u00E7("{n} seyirci",{n:sayi(x.attendance)}):null,x.status==="scheduled"?\u00E7("bil\
et {kr} kredi",{kr:kr(x.ticket_price_cr??0)}):null,x.my_ticket?\u00E7("biletin var"):null,x.forfeit?\u00E7("h\xFCkmen"):null,x.shootout_winner?\u00E7("penalt\u0131lar"):null,x.status==="cancelled"?KULUP_IPTAL_AD[x.
cancel_reason]??\u00E7("iptal"):null].filter(Boolean).join(" \xB7 ");return`<button type="button" class="liste-satir kulup-mac-satir" data-kulup-izle="${esc(x.id)}"${mac?.id===x.id?' aria-current="tru\
e"':""}>
        <span class="kulup-mac-armalar">${kulupArma(x.home,26)}${kulupArma(x.away,26)}</span>
        <div><b>${esc(`${x.home?.short??""} ${skor} ${x.away?.short??""}`)}</b><div class="alt">${esc(alt)}</div></div>
        ${secenek.dugme??`<span class="cip kucuk-cip ${kulupEvreRenk(x.phase)}">${esc(kulupEvreAdi(x.phase))}</span>`}</button>`}function programHtml(){const l=v.matches??[];return`<section class="kar\
t" id="stadyum-program">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(v.here?bolgeAdi(v.here):\u00E7("Yoldas\u0131n"))} \xB7 ${\u00E7("son 24 saat ve 7 g\xFCn")}</p><h2 class="b2">${\u00E7("\u015Eehrin ma\xE7lar\u0131")}\
</h2></div><span class="ik-kutu">${ikon("calendar-days")}</span></div>
        ${l.length?`<div class="liste">${l.map(x=>macSatir(x)).join("")}</div>`:`<p class="bos">${esc(v.here?\u00E7("Bu \u015Fehirde yak\u0131nda kul\xFCp ma\xE7\u0131 yok."):\u00E7("Bir \u015Fehre var\u0131nca\
 o \u015Fehrin ma\xE7lar\u0131n\u0131 g\xF6r\xFCrs\xFCn."))}</p>`}
      </section>`}function kulupleriHtml(){const l=v.city_clubs??[];return`<section class="kart" id="stadyum-kulupler">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(v.here?bolgeAdi(v.here):\u00E7("Yoldas\u0131n"))}</p><h2 class="b2">${\u00E7("\u015Eehrin kul\xFCpleri")}</h2></div><span class="ik-kutu">${ikon(
"shield")}</span></div>
        ${l.length?`<div class="liste">${l.map(k=>`<div class="liste-satir" data-kulup-satir="${esc(k.id)}">
            ${kulupSatirIc(k,[KULUP_DURUM_AD[k.status],k.league?ligAdi(k.league):null,\u00E7("{n} oyuncu",{n:sayi(k.members??0)})].filter(Boolean).join(" \xB7 "))}
            <span class="satir" style="gap:6px">${k.my_kit?`<span class="cip kucuk-cip yesil">${ikon("shirt")}${\u00E7("Forman var")}</span>`:k.status==="active"?`<button class="dugme ikincil kucuk-d"\
 data-kulup-forma="${esc(k.id)}" ${mesgul?"disabled":""}>${ikon("shirt")}${esc(\u00E7("Forma {kr}",{kr:kr(k.kit_price_cr??0)}))}</button>`:""}
              <button class="dugme sade kucuk-d" data-kulup-ac="${esc(k.id)}">${ikon("eye")}${\u00E7("Kul\xFCp")}</button></span></div>`).join("")}</div>`:`<p class="bos">${esc(v.here?\u00E7("Bu \u015Fehir\
de hen\xFCz kul\xFCp yok. \u0130lk kul\xFCb\xFC sen kur!"):\u00E7("Bir \u015Fehre var\u0131nca o \u015Fehrin kul\xFCplerini g\xF6r\xFCrs\xFCn."))}</p>`}
      </section>`}function kulubumHtml(){const k=v.mine,me=v.me??{};if(k){const n=k.next;return`<section class="kart" id="stadyum-kulubum" data-kulup="${esc(k.id)}">
          <div class="kart-bas"><div class="kulup-baslik">${kulupArma(k,46)}<div><p class="ust-yazi">${\u00E7("Kul\xFCb\xFCn")} \xB7 ${esc(KULUP_DURUM_AD[k.status]??"")}</p>
            <h2 class="b2" style="margin:0">${esc(kulupAdi(k))}</h2></div></div></div>
          <p class="kucuk">${esc([k.president?KULUP_ROL_AD.president:k.coach?KULUP_ROL_AD.coach:null,futbolPosAdi(k.pos),k.number!=null?\u00E7("{n} numara",{n:sayi(k.number)}):null,k.league?ligAdi(k.league)+
(k.league.played!=null?" \xB7 "+\u00E7("{p} puan, {o} ma\xE7",{p:sayi(k.league.points??0),o:sayi(k.league.played??0)}):""):null].filter(Boolean).join(" \xB7 "))}</p>
          ${n?`<div class="liste" style="margin-top:8px">${macSatir(n,{dugme:n.my_ready?`<span class="cip kucuk-cip yesil">${ikon("badge-check")}${\u00E7("Haz\u0131rs\u0131n")}</span>`:void 0})}</div>`:
`<p class="kucuk">${esc(k.status==="applying"?\u00E7("Ba\u015Fvuru s\xFCr\xFCyor: en az {n} kurucu kadroya girince g\xFCnl\xFCk lisans turunu bekler.",{n:sayi(KR().license?.minFounders??7)}):\u00E7("Y\
akla\u015Fan ma\xE7 yok; ligler her Pazartesi kurulur."))}</p>`}
          <div class="oneri-dugmeler" style="margin-top:8px"><button class="dugme altin" data-kulup-ac="${esc(k.id)}">${ikon("shield")}${\u00E7("Kul\xFCb\xFCn sayfas\u0131")}</button></div>
        </section>`}const L=KR().license??{},davetler=v.invites??[],neden=v.here?Number(me.account_days??0)<Number(L.founderAccountDays??14)?\u00E7("Kul\xFCp kurmak i\xE7in hesab\u0131n en az {n} g\xFCnl\xFCk olmal\u0131 (\
\u015Fimdi {g} g\xFCn).",{n:sayi(L.founderAccountDays??14),g:sayi(me.account_days??0)}):Number(me.credit??0)<Number(L.feeCr??1e5)?\u00E7("Lisans \xFCcreti i\xE7in en az {kr} kredin olmal\u0131.",{kr:kr(
L.feeCr??1e5)}):null:\u00E7("Yoldayken kul\xFCp kurulmaz; kul\xFCp bulundu\u011Fun \u015Fehrin kul\xFCb\xFC olur.");return`<section class="kart" id="stadyum-kulubum">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kul\xFCb\xFCn yok")}</p><h2 class="b2">${\u00E7("Kul\xFCbe kat\u0131l ya da kur")}</h2></div><span class="ik-kutu">${ikon("shield")}</s\
pan></div>
        ${davetler.length?`<p class="ust-yazi">${\u00E7("Davetler")}</p><div class="liste" id="stadyum-davetler">${davetler.map(x=>`<div class="liste-satir" data-kulup-davet-satir="${esc(x.id)}">
            ${kulupSatirIc(x.club,[\u00E7("{ad} davet etti",{ad:x.by??"?"}),futbolPosAdi(x.pos),Number(x.wage_cr)?\u00E7("haftal\u0131k {kr} kredi",{kr:kr(x.wage_cr)}):\u00E7("maa\u015Fs\u0131z"),\u00E7(
"{t} tarihine dek",{t:kulupTarihi(x.expires_at)})].join(" \xB7 "))}
            <span class="satir" style="gap:6px"><button class="dugme kucuk-d" data-kulup-davet="${esc(x.id)}|1" ${mesgul?"disabled":""}>${\u00E7("Kat\u0131l")}</button>
              <button class="dugme sade kucuk-d" data-kulup-davet="${esc(x.id)}|0" ${mesgul?"disabled":""}>${\u00E7("Reddet")}</button></span></div>`).join("")}</div>`:""}
        <p class="kucuk">${esc(\u00E7("Bir oyuncu tek kul\xFCpte olur. Kul\xFCb\xFCn ba\u015Fkan\u0131 seni davet edebilir; ya da kendi kul\xFCb\xFCn\xFC kurars\u0131n: ad, k\u0131sa ad, iki renk ve arma; lisans teklifi en az {kr} kredi (\
rezervde). En az {n} kurucu kadroya girince g\xFCnl\xFCk lisans turunda \xFClkenin sezonluk lisans yerine g\xF6re lisans al\u0131r.",{kr:kr(L.feeCr??1e5),n:sayi(L.minFounders??7)}))}</p>
        ${neden?`<div class="bilgi-kutusu uyari-kutusu" id="stadyum-kur-sart" style="margin-top:8px">${ikon("hourglass")}<span>${esc(neden)}</span></div>`:`<button class="dugme altin" id="stadyum-kur"\
 style="margin-top:8px" ${mesgul?"disabled":""}>${ikon("flag")}${\u00E7("Kul\xFCp kur")}</button>`}
      </section>`}function ligHtml(){const ligler=v.leagues??[],s=v.season??{},sezon=s.preseason?\u00E7("Sezon \xF6ncesi: 1. sezon {t} ba\u015Flar.",{t:new Date(s.starts_at).toLocaleDateString(DIL.yerel,
{day:"numeric",month:"long"})}):\u00E7("{s}. sezon, {h}. hafta",{s:sayi(s.season??1),h:sayi(s.week??1)}),tablo=lig?.table??[];return`<section class="kart" id="stadyum-lig">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(ulkeAdi(v.country_id))} \xB7 ${esc(sezon)}</p><h2 class="b2">${\u00E7("Ligler")}</h2></div><span class="ik-kutu">${ikon("trophy")}</span></\
div>
        ${ligler.length?`<div class="cip-satir" role="group" aria-label="${esc(\u00E7("Ligler"))}">${ligler.map(l=>`<button type="button" class="cip-dugme${l.id===ligSecili?" secili":""}" data-kulup-l\
ig="${esc(l.id)}" aria-pressed="${l.id===ligSecili}">${esc(ligAdi(l))}</button>`).join("")}</div>
          ${tablo.length?`<div class="kulup-tablo-kap" style="margin-top:10px">${tabloHtml(tablo,8)}</div>
            <button class="baglanti" type="button" id="stadyum-lig-tam" style="margin-top:6px">${ikon("table-2")} ${\u00E7("Puan durumu ve fikst\xFCr")}</button>`:""}`:`<p class="bos">${esc(\u00E7("\xDCl\
kende bu sezon lig yok. Lisansl\u0131 kul\xFCp say\u0131s\u0131 en az {n} olunca her Pazartesi lig kurulur; daha az kul\xFCpl\xFC \xFClkelerin kul\xFCpleri k\u0131tan\u0131n b\xF6lge liginde oynar.",{
n:sayi(KR().league?.minClubs??4)}))}</p>`}
      </section>`}function tabloHtml(tablo,en=99){const benim=v?.mine?.id;return`<table class="kulup-tablo"><thead><tr><th>#</th><th>${\u00E7("Kul\xFCp")}</th><th title="${esc(\u00E7("Oynanan"))}">${\u00E7(
"O")}</th><th title="${esc(\u00E7("Galibiyet"))}">${\u00E7("G")}</th><th title="${esc(\u00E7("Beraberlik"))}">${\u00E7("B")}</th>
        <th title="${esc(\u00E7("Ma\u011Flubiyet"))}">${\u00E7("M")}</th><th title="${esc(\u00E7("Averaj"))}">${\u00E7("Av")}</th><th>${\u00E7("P")}</th></tr></thead><tbody>${tablo.slice(0,en).map((x,i)=>`\
<tr${x.club?.id===benim?' class="ben"':""}>
        <td>${sayi(x.rank??i+1)}</td><td><button type="button" class="baglanti kulup-tablo-ad" data-kulup-ac="${esc(x.club?.id??"")}">${kulupArma(x.club,20)} ${esc(x.club?.short??"")}</button></td>
        <td>${sayi(x.played)}</td><td>${sayi(x.won)}</td><td>${sayi(x.drawn)}</td><td>${sayi(x.lost)}</td><td>${sayi(Number(x.gf)-Number(x.ga))}</td><td><b>${sayi(x.points)}</b></td></tr>`).join("")}<\
/tbody></table>`}function biletlerHtml(){const l=v.tickets??[];return l.length?`<section class="kart" id="stadyum-biletler">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Trib\xFCn")}</p><h2 class="b2">${\u00E7("Biletlerin")}</h2></div><span class="ik-kutu">${ikon("ticket")}</span></div>
        <div class="liste">${l.map(x=>macSatir(x,{dugme:`<span class="cip kucuk-cip yesil">${ikon("ticket-check")}</span>`})).join("")}</div>
      </section>`:""}function kurallarHtml(){const c=KR(),L=c.license??{},t=c.ticket??{},kt=c.kit??{},mt=c.match??{},sq=c.squad??{},maddeler=[["flag",\u00E7("Kul\xFCb\xFC \u015Fehirdeki bir oyuncu kurar: ad, k\u0131s\
a ad (3 harf), iki renk, arma. Lisans teklifi en az {kr} kredi; en az {n} kurucu (en az {g} g\xFCnl\xFCk hesap) kadroya girince her g\xFCn lisans turunda \xFClkenin sezonluk {y} lisans yerine g\xF6re en y\xFCksek tekli\
fler lisans al\u0131r; para \xFClkenin futbol fonuna (ligin \xF6d\xFClleri) gider.",{kr:kr(L.feeCr??1e5),n:sayi(L.minFounders??7),g:sayi(L.founderAccountDays??14),y:sayi(L.perSeason??8)})],["users-rou\
nd",\u00E7("Ba\u015Fkan davet eder, s\xF6zle\u015Fme yapar (forma numaras\u0131, mevki, haftal\u0131k maa\u015F), teknik direkt\xF6r\xFC ve kaptan\u0131 atar, bilet ve forma fiyat\u0131n\u0131 koyar, stadyumu yapt\u0131r\u0131r. Teknik direkt\xF6r kadroyu (4-4-2\
) ve takti\u011Fi se\xE7er, haz\u0131rl\u0131k ma\xE7\u0131 \xF6nerir. Kadroda en \xE7ok {n} oyuncu.",{n:sayi(sq.max??25)})],["trophy",\u00E7("Ligler her Pazartesi kurulur: \xFClkede en az {n} lisansl\u0131 k\
ul\xFCp varsa 1. Lig, 2. Lig ve Amat\xF6r Lig gruplar\u0131 (en \xE7ok {m} kul\xFCp); az kul\xFCpl\xFC \xFClkelerin kul\xFCpleri k\u0131tan\u0131n b\xF6lge liginde. Ma\xE7lar Cumartesi ve Pazar ak\u015Fam\u0131; galibiyet 3, beraberlik 1 puan. Sezon sonun\
da ilk iki \xE7\u0131kar, son iki d\xFC\u015Fer; fonun bir pay\u0131 ilk \xFC\xE7e \xF6d\xFCl.",{n:sayi(c.league?.minClubs??4),m:sayi(c.league?.maxClubs??10)})],["timer",\u00E7("Ma\xE7 11'e 11, iki devre\
, her devre {dk} dakika (oyunda {od} dakika), arada {ara} dakika; her devrede {n} atak. Karar anlar\u0131 hal\u0131 sahadaki gibi: b\xFCy\xFCk f\u0131rsatta \u015Fut\xE7u, \u015Futta kaleci, penalt\u0131da ikisi.",
{dk:sayi(Math.round(Number(mt.halfSeconds??480)/60)),od:sayi(mt.minutesPerHalf??45),ara:sayi(Math.round(Number(mt.breakSeconds??120)/60)),n:sayi(mt.attacksPerHalf??16)})],["ticket",\u00E7("Bilet {a}\u2013{\
b} kredi; kilide dek iade. Kombine sezonun kalan ev ma\xE7lar\u0131n\u0131 kapsar (en \xE7ok {n} ma\xE7). \u015Eehrin seyircisi \u015Fehrin seviyesine, ligin basama\u011F\u0131na, formalara ve fiyata g\xF6re gelir. Gi\u015Feden %5 sistem bedeli, b\
elediye stadyumunda kira; kalan\u0131 kul\xFCb\xFCn kasas\u0131na.",{a:kr(t.minCr??100),b:kr(t.maxCr??5e3),n:sayi(t.seasonMatches??8)})],["shirt",\u00E7("Forma {a}\u2013{b} kredi (kul\xFCb\xFCn fiyat\u0131; g\xFCnde en \
\xE7ok {n} forma). G\xF6r\xFCn\xFCm'de giyersin; her sahnede kul\xFCb\xFCn\xFCn renklerinde g\xF6r\xFCn\xFCrs\xFCn. Kadroya kat\u0131lana forma bedelsiz.",{a:kr(kt.minCr??500),b:kr(kt.maxCr??5e3),n:sayi(
kt.perDay??3)})],["coins",\u00E7("Maa\u015F her Pazartesi kasadan \xF6denir; maa\u015Fa en \xE7ok son d\xF6rt haftan\u0131n gelirinin %70'i ayr\u0131l\u0131r (yeni kul\xFCpte haftada {kr} kredi), yetmezse orant\u0131l\u0131 \xF6denir. Lisans her sezo\
n {y} kredi ile yenilenir.",{kr:kr(sq.wageBaseCr??5e3),y:kr(L.renewCr??3e4)})],["brick-wall",\u00E7("Stadyum be\u015F seviye ({a}\u2013{b} ki\u015Fi): kredi, in\u015Faat malzemesi (\u0130malat: cevher ve metal) ve s\xFCre; \u015Fehri\
n seviyesi yetmeli. Tesisler: antrenman, akademi, \u0131\u015F\u0131klar, bak\u0131ml\u0131 \xE7im. Herkes katk\u0131 duvar\u0131na kredi ya da malzeme b\u0131rakabilir.",{a:sayi(c.stadium?.levels?.[0]?.
capacity??500),b:sayi(c.stadium?.levels?.[4]?.capacity??6e4)})]];return`<section class="kart" id="stadyum-kurallar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kurallar")}</p><h2 class="b\
2">${\u00E7("Kul\xFCpler nas\u0131l i\u015Fler?")}</h2></div><span class="ik-kutu">${ikon("book-open")}</span></div>
        <div class="liste">${maddeler.map(([ik,x])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(x)}</div></div><span></span></div>`).
join("")}</div>
      </section>`}function kulupSayfasiHtml(){const k=kul;if(!k)return"";const c=KR(),baskan=k.my_role==="president",yonetici=k.my_role==="president"||k.my_role==="coach",uye=!!k.my_role,durum=k.national?
\u00E7("Mill\xEE tak\u0131m: federasyonun teknik direkt\xF6r\xFC kadroyu \xE7a\u011F\u0131r\u0131r; Civora Kupas\u0131'nda oynar."):k.status==="dissolved"?\u00E7("Da\u011F\u0131ld\u0131: {neden}.",{neden:KULUP_DAGILMA_AD[k.
dissolve_reason]??""}):k.status==="applying"?\u00E7("Ba\u015Fvuruda: {n} kurucu daha gerekiyor; ba\u015Fvuru {t} tarihine dek a\xE7\u0131k.",{n:sayi(k.founders_needed??0),t:kulupTarihi(new Date(Date.parse(
k.applied_at)+Number(c.license?.applicationDays??7)*864e5).toISOString())}):\u00E7("Lisansl\u0131 ({s}. sezondan beri).",{s:sayi(k.license_season??1)}),kadro=(k.members??[]).map(x=>{const roller=[x.president?
KULUP_ROL_AD.president:null,x.coach&&!x.president?KULUP_ROL_AD.coach:null,x.captain?KULUP_ROL_AD.captain:null].filter(Boolean),un=typeof unRozet=="function"?unRozet(k.members_fame?.[x.character_id]):"";
return`<div class="liste-satir" data-kulup-uye="${esc(x.character_id)}">
          <span class="futbol-forma" style="--forma:${kulupRengi(k.color1)};color:${futbolYaziRengi(kulupRengi(k.color1))}">${esc(x.number!=null?String(x.number):FUTBOL_POS_KISA[x.pos]??"")}</span>
          <div><b>${x.me?esc(\u00E7("Sen")):`<button type="button" class="baglanti" data-kulup-kisi="${esc(x.character_id)}">${esc(x.name??\u00E7("Ad\u0131n\u0131 gizleyen biri"))}</button>`}</b> ${un}\

            <div class="alt">${esc([futbolPosAdi(x.pos),...roller,\u00E7("beceri {n}",{n:sayi(x.skill??0)}),\u00E7("{m} ma\xE7, {g} gol",{m:sayi(x.matches??0),g:sayi(x.goals??0)}),x.wage_cr!=null?\u00E7(
"haftal\u0131k {kr} kredi",{kr:kr(x.wage_cr)}):null].filter(Boolean).join(" \xB7 "))}</div></div>
          ${baskan&&!x.me?`<button class="dugme sade kucuk-d" data-kulup-yonet="${esc(x.character_id)}" ${mesgul?"disabled":""}>${ikon("pencil")}${\u00E7("Y\xF6net")}</button>`:baskan&&x.me?`<button c\
lass="dugme sade kucuk-d" data-kulup-yonet="${esc(x.character_id)}" ${mesgul?"disabled":""}>${ikon("pencil")}${\u00E7("S\xF6zle\u015Fmen")}</button>`:k.can_offer&&!x.me&&!k.transfer_rule?.closed?`<but\
ton class="dugme sade kucuk-d" data-transfer-teklif="${esc(x.character_id)}" ${mesgul?"disabled":""}>${ikon("arrow-right-left")}${\u00E7("Teklif")}</button>`:"<span></span>"}</div>`}).join(""),f=k.finance,
kasa=f?`<section class="kart" id="kulup-kasa">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Yaln\u0131z kadro g\xF6r\xFCr")}</p><h2 class="b2">${\u00E7("Kasa ve maa\u015F")}</h2></div><span class="ik-kutu">${ikon("wallet")}</sp\
an></div>
        <div class="etkinlik-sayac">${[["coins",\u00E7("Kasa"),kr(f.balance_cr??0)],["brick-wall",\u00E7("\u0130n\u015Faat malzemesi"),sayi(f.insaat??0)],["receipt",\u00E7("Son 28 g\xFCn gelir"),kr(f.
income_cr??0)],["hand-coins",\u00E7("Haftal\u0131k maa\u015F b\xFCt\xE7esi"),kr(f.wage_budget_cr??0)],["users-round",\u00E7("Haftal\u0131k maa\u015Flar"),kr(f.wages_cr??0)]].map(([ik,ad,n])=>`<div>${ikon(
ik)}<b>${esc(String(n))}</b><small>${esc(ad)}</small></div>`).join("")}</div>
        ${Number(f.wages_cr??0)>Number(f.wage_budget_cr??0)?`<p class="bilgi-kutusu uyari-kutusu">${ikon("circle-alert")}<span>${esc(\u00E7("Maa\u015Flar b\xFCt\xE7eyi a\u015F\u0131yor; Pazartesi orant\u0131l\u0131 \xF6denir."))}\
</span></p>`:""}
        ${(f.recent??[]).length?`<p class="ust-yazi" style="margin-top:10px">${\u00E7("Son gelirler")}</p><div class="liste">${f.recent.map(x=>`<div class="liste-satir"><span class="liste-ikon">${ikon(
x.kind==="prize"?"trophy":x.kind==="kit"?"shirt":"ticket")}</span>
          <div><b>${esc(KULUP_GELIR_AD[x.kind]??x.kind)}</b><div class="alt">${esc(kulupTarihi(x.at))}</div></div><span class="futbol-skor-kucuk">+${esc(kr(x.amount_cr))}</span></div>`).join("")}</div\
>`:""}
        ${(f.wage_weeks??[]).length?`<p class="ust-yazi" style="margin-top:10px">${\u00E7("Maa\u015F haftalar\u0131")}</p><div class="liste">${f.wage_weeks.map(x=>`<div class="liste-satir"><span class\
="liste-ikon">${ikon("calendar-check")}</span>
          <div><b>${esc(new Date(x.week).toLocaleDateString(DIL.yerel,{day:"numeric",month:"short"}))}</b><div class="alt">${esc(\u00E7("\xF6denen {a} / {b} kredi",{a:kr(x.paid_cr??0),b:kr(x.due_cr??0)}))}\
</div></div><span></span></div>`).join("")}</div>`:""}
      </section>`:"",st=k.stadium,b=k.build,sev=Number(st?.level??0),sonraki=(c.stadium?.levels??[]).find(x=>Number(x.level)===sev+1),tesisler=st?.facilities??[],yapim=b?`<div class="bilgi-kutusu" id=\
"kulup-yapim">${ikon("hard-hat")}<span>${esc(b.target==="level"?\u00E7("Stadyum {n}. seviyeye \xE7\u0131k\u0131yor; {t} biter.",{n:sayi(b.level),t:kulupTarihi(b.ends_at)}):\u00E7("{tesis} yap\u0131l\u0131yor; {\
t} biter.",{tesis:KULUP_TESIS_AD[b.target]??b.target,t:kulupTarihi(b.ends_at)}))}</span></div>`:"",yapDugme=(hedef,ad,gerek)=>`<div class="liste-satir"><span class="liste-ikon">${ikon(hedef==="level"?
"brick-wall":KULUP_TESIS_IK[hedef]??"hammer")}</span>
        <div><b>${esc(ad)}</b><div class="alt">${esc(gerek)}</div></div>
        ${baskan&&k.status==="active"&&!b?`<button class="dugme ikincil kucuk-d" data-kulup-yap="${hedef}" ${mesgul?"disabled":""}>${ikon("hammer")}${\u00E7("Yapt\u0131r")}</button>`:"<span></span>"}<\
/div>`,stadyum=`<section class="kart" id="kulup-stadyum">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(bolgeAdi(k.region_id))}</p><h2 class="b2">${esc(sev?\u00E7("Stadyum: {n}. seviye",{n:sayi(sev)}):\u00E7("Belediye stadyumunda oynuyor"))}</\
h2></div><span class="ik-kutu">${ikon("land-plot")}</span></div>
        <p class="kucuk">${esc(sev?\u00E7("Kapasite {n} ki\u015Fi.",{n:sayi(k.ground?.capacity??0)}):\u00E7("Belediye stadyumu: {n} ki\u015Fi, ma\xE7 ba\u015F\u0131na {kr} kredi kira.",{n:sayi(c.stadium?.
municipal?.capacity??500),kr:kr(c.stadium?.municipal?.rentCr??500)}))}
          ${tesisler.length?" "+esc(\u00E7("Tesisler: {l}.",{l:tesisler.map(x=>KULUP_TESIS_AD[x]??x).join(", ")})):""}</p>
        ${yapim}
        ${k.status==="active"?`<div class="liste" style="margin-top:8px">
          ${sonraki?yapDugme("level",sev?\u00E7("{n}. seviye ({k} ki\u015Fi)",{n:sayi(sonraki.level),k:sayi(sonraki.capacity)}):\u00E7("Kendi stadyumu ({k} ki\u015Fi)",{k:sayi(sonraki.capacity)}),\u00E7(
"{kr} kredi, {m} in\u015Faat malzemesi, {s} saat; \u015Fehrin seviyesi en az {c}",{kr:kr(sonraki.costCr),m:sayi(sonraki.insaat),s:sayi(sonraki.hours),c:sayi(sonraki.cityLevel)})):""}
          ${sev?Object.entries(c.stadium?.facilities??{}).filter(([id])=>!tesisler.includes(id)).map(([id,x])=>yapDugme(id,KULUP_TESIS_AD[id]??id,`${KULUP_TESIS_YAZI[id]??""} \xB7 ${\u00E7("{kr} kredi\
, {m} malzeme, {s} saat",{kr:kr(x.costCr),m:sayi(x.insaat),s:sayi(x.hours)})}`)).join(""):""}
        </div>`:""}
      </section>`,duvar=`<section class="kart" id="kulup-duvar">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Herkes katk\u0131 verebilir")}</p><h2 class="b2">${\u00E7("Katk\u0131 duvar\u0131")}</h2></div><span class="ik-kutu">${ikon("brick-wall")}\
</span></div>
        ${(k.wall??[]).length?`<div class="liste">${k.wall.map(x=>`<div class="liste-satir"><span class="liste-ikon">${ikon(Number(x.insaat)?"brick-wall":"coins")}</span>
          <div><b>${x.me?esc(\u00E7("Sen")):x.character_id?`<button type="button" class="baglanti" data-kulup-kisi="${esc(x.character_id)}">${esc(x.name??"?")}</button>`:esc(\u00E7("Ad\u0131n\u0131 gizleyen bir\
i"))}</b>
            <div class="alt">${esc([Number(x.cr)?\u00E7("{kr} kredi",{kr:kr(x.cr)}):null,Number(x.insaat)?\u00E7("{n} in\u015Faat malzemesi",{n:sayi(x.insaat)}):null,kulupTarihi(x.at)].filter(Boolean).
join(" \xB7 "))}</div></div><span></span></div>`).join("")}</div>`:`<p class="bos">${esc(\u00E7("Hen\xFCz katk\u0131 yok."))}</p>`}
        ${k.status==="active"?`<button class="dugme ikincil" id="kulup-katki" style="margin-top:8px" ${mesgul?"disabled":""}>${ikon("hand-coins")}${\u00E7("Katk\u0131 ver")}</button>`:""}
      </section>`,maclar=`<section class="kart" id="kulup-maclar">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(k.league?ligAdi(k.league):\u00E7("Ligi yok"))}</p><h2 class="b2">${\u00E7("Ma\xE7lar")}</h2></div><span class="ik-kutu">${ikon("calendar-da\
ys")}</span></div>
        ${(k.upcoming??[]).length?`<p class="ust-yazi">${\u00E7("Yakla\u015Fan")}</p><div class="liste">${k.upcoming.map(x=>macSatir(x)).join("")}</div>`:`<p class="kucuk">${esc(\u00E7("Yakla\u015Fan ma\xE7 y\
ok."))}</p>`}
        ${(k.results??[]).length?`<p class="ust-yazi" style="margin-top:10px">${\u00E7("Sonu\xE7lar")}</p><div class="liste">${k.results.map(x=>macSatir(x)).join("")}</div>`:""}
        ${yonetici&&k.status==="active"&&!k.national?`<button class="dugme ikincil" id="kulup-dostluk" style="margin-top:8px" ${mesgul?"disabled":""}>${ikon("handshake")}${\u00E7("Haz\u0131rl\u0131k ma\xE7\u0131 \xF6ner")}\
</button>`:""}
      </section>`,davet=baskan&&k.status!=="dissolved"?`<hr class="ayrac"><p class="ust-yazi">${\u00E7("Davet et")}</p>
        ${(k.members??[]).length>=Number(k.squad_max??25)?`<p class="kucuk">${esc(\u00E7("Kadro dolu: en \xE7ok {n} oyuncu.",{n:sayi(k.squad_max??25)}))}</p>`:`
        <form class="sohbet-yaz" id="kulup-ara" novalidate style="margin-top:6px"><input name="q" minlength="2" maxlength="24" placeholder="${\u00E7("Ad yaz (en az 2 harf)")}" value="${esc(arama.q)}" \
aria-label="${\u00E7("Oyuncu ad\u0131")}" autocomplete="off">
          <button class="dugme" type="submit" aria-label="${\u00E7("Ara")}">${ikon("zoom-in")}</button></form>
        ${arama.sonuc?`<div class="koltuk-liste" style="margin-top:10px" id="kulup-ara-sonuc">${arama.sonuc.map(x=>{const uyeMi=(k.members??[]).some(m=>m.character_id===x.character_id),bekliyor=(k.invites??
[]).some(q=>q.character_id===x.character_id);return`<div class="koltuk">${avatarKutu(x.name,x.character_id)}<div><b>${esc(x.name)}</b><div class="kucuk">${esc(ulkeAdi(x.country_id))}</div></div>
              ${uyeMi?`<span class="cip">${\u00E7("Kadroda")}</span>`:bekliyor?`<span class="cip">${\u00E7("Davet edildi")}</span>`:`<button class="dugme ikincil kucuk-d" data-kulup-davet-et="${esc(x.
character_id)}">${ikon("user-round-plus")}${\u00E7("Davet et")}</button>`}</div>`}).join("")||`<p class="bos">${\u00E7("Bulunamad\u0131.")}</p>`}</div>`:""}`}
        <p class="kucuk">${esc(\u00E7("Kul\xFCb\xFC olmayan her oyuncu davet edilir; davet {n} saat ge\xE7erlidir. Kul\xFCp kurulurken davet ettiklerin kurucu say\u0131l\u0131r.",{n:sayi(c.squad?.inviteHours??
72)}))}</p>
        ${(k.invites??[]).length?`<div class="liste" id="kulup-davetlerimiz">${k.invites.map(q=>`<div class="liste-satir"><span class="liste-ikon">${avatarKutu(q.name??"?",q.character_id)}</span>
          <div><b>${esc(q.name??"?")}</b><div class="alt">${esc([futbolPosAdi(q.pos),Number(q.wage_cr)?\u00E7("haftal\u0131k {kr} kredi",{kr:kr(q.wage_cr)}):\u00E7("maa\u015Fs\u0131z"),\u00E7("{t} tar\
ihine dek",{t:kulupTarihi(q.expires_at)})].join(" \xB7 "))}</div></div>
          <button class="dugme sade kucuk-d" data-kulup-davet-geri="${esc(q.id)}" ${mesgul?"disabled":""}>${ikon("undo-2")}${\u00E7("Geri \xE7ek")}</button></div>`).join("")}</div>`:""}`:"",pro=typeof kulupProBolumleriHtml==
"function"?kulupProBolumleriHtml(K3):{oda:"",sponsor:"",transfer:""},forma=k.status==="active"?k.my_kit?`<button class="dugme ikincil" id="kulup-forma-giy">${ikon("shirt")}${\u00E7("Formay\u0131 giy")}\
</button>`:`<button class="dugme ikincil" id="kulup-forma-al" ${mesgul?"disabled":""}>${ikon("shirt")}${esc(\u00E7("Forma al ({kr} kredi)",{kr:kr(k.kit_price_cr??0)}))}</button>`:"",kombine=k.status===
"active"&&k.league&&!uye?k.season_ticket?`<span class="cip yesil">${ikon("ticket-check")}${\u00E7("Kombinen var")}</span>`:`<button class="dugme ikincil" id="kulup-kombine" ${mesgul?"disabled":""}>${ikon(
"ticket")}${\u00E7("Kombine al")}</button>`:"";return`<div class="sayfa" data-kulup-sayfa="${esc(k.id)}">
        <div class="sayfa-bas"><div class="kulup-baslik">${kulupArma(k,64)}<div><p class="ust-yazi"><button class="baglanti" type="button" id="kulup-geri">${ikon("arrow-left")} ${\u00E7("Stadyum")}</b\
utton> \xB7 ${esc(bolgeAdi(k.region_id))}</p>
          <h1 class="b1" style="margin:0">${esc(kulupAdi(k))} <small class="soluk">${esc(k.short)}</small></h1>
          <p class="aciklama">${esc(durum)} ${esc(k.league?ligAdi(k.league,k.country_id)+(k.league.played!=null?" \xB7 "+\u00E7("{p} puan, {o} ma\xE7",{p:sayi(k.league.points??0),o:sayi(k.league.played??
0)}):""):"")}</p></div></div>
          <span class="cip ${k.status==="active"?"yesil":k.status==="applying"?"altin":""}">${esc(KULUP_DURUM_AD[k.status]??"")}</span></div>
        ${k.invited?`<div class="bilgi-kutusu" style="margin-top:12px" id="kulup-davetin">${ikon("user-round-plus")}<span>${esc(\u00E7("Bu kul\xFCp seni davet etti: {mevki}, {ucret}.",{mevki:futbolPosAdi(
k.invited.pos),ucret:Number(k.invited.wage_cr)?\u00E7("haftal\u0131k {kr} kredi",{kr:kr(k.invited.wage_cr)}):\u00E7("maa\u015Fs\u0131z")}))}
          <button class="dugme kucuk-d" data-kulup-davet="${esc(k.invited.id)}|1">${\u00E7("Kat\u0131l")}</button> <button class="dugme sade kucuk-d" data-kulup-davet="${esc(k.invited.id)}|0">${\u00E7(
"Reddet")}</button></span></div>`:""}
        <div class="izgara iki" style="margin-top:16px">
          <div class="yigin">
            <section class="kart" id="kulup-kadro">
              <div class="kart-bas"><div><p class="ust-yazi">${esc(\u00E7("{n} / {m} oyuncu",{n:sayi((k.members??[]).length),m:sayi(k.squad_max??25)}))}</p><h2 class="b2">${\u00E7("Kadro")}</h2></div>\
<span class="ik-kutu">${ikon("users-round")}</span></div>
              <p class="kucuk">${esc([\u00E7("Ba\u015Fkan: {ad}",{ad:k.president?.me?\u00E7("sen"):k.president?.name??"?"}),\u00E7("Teknik direkt\xF6r: {ad}",{ad:k.coach?.me?\u00E7("sen"):k.coach?.name??
"?"}),k.captain?\u00E7("Kaptan: {ad}",{ad:k.captain.me?\u00E7("sen"):k.captain.name??"?"}):null].filter(Boolean).join(" \xB7 "))}</p>
              <div class="liste futbol-takim" style="margin-top:8px">${kadro||`<p class="bos">${\u00E7("Kadro bo\u015F.")}</p>`}</div>
              ${davet}
              ${uye&&!k.national?`<div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme sade" id="kulup-ayril" ${mesgul?"disabled":""}>${ikon("door-open")}${baskan&&k.status==="appl\
ying"?\u00E7("Ba\u015Fvuruyu geri \xE7ek"):\u00E7("Kul\xFCpten ayr\u0131l")}</button></div>`:""}
              ${k.national&&uye?`<p class="kucuk">${esc(\u00E7("Mill\xEE kadrodan ayr\u0131lmak ve \xE7a\u011Fr\u0131lar: Stadyum \u2192 Federasyon \u2192 Mill\xEE tak\u0131m."))}</p>`:""}
            </section>
            ${maclar}${pro.transfer}
          </div>
          <div class="yigin">
            <section class="kart" id="kulup-taraftar">
              <div class="kart-bas"><div><p class="ust-yazi">${esc(\u00E7("{n} forma sat\u0131ld\u0131",{n:sayi(k.kits_sold??0)}))}</p><h2 class="b2">${\u00E7("Taraftar")}</h2></div><span class="ik-ku\
tu">${ikon("shirt")}</span></div>
              <p class="kucuk">${esc(\u00E7("Bilet {b} kredi, forma {f} kredi.",{b:kr(k.ticket_price_cr??0),f:kr(k.kit_price_cr??0)}))}</p>
              <div class="oneri-dugmeler">${forma}${kombine}
                ${baskan&&k.status!=="dissolved"?`<button class="dugme sade" id="kulup-fiyat" ${mesgul?"disabled":""}>${ikon("coins")}${\u00E7("Fiyatlar")}</button>`:""}
                ${baskan&&k.name_reset?`<button class="dugme altin" id="kulup-ad" ${mesgul?"disabled":""}>${ikon("pencil")}${\u00E7("Yeni ad koy")}</button>`:""}
                ${uye?"":`<button class="dugme sade" id="kulup-raporla">${ikon("flag")}${\u00E7("Ad\u0131 raporla")}</button>`}</div>
            </section>
            ${kulupGorunumKarti(k,baskan,mesgul)}${pro.oda}${kasa}${stadyum}${pro.sponsor}${duvar}
          </div>
        </div></div>`}function sahneYaz(){const sonraki=(v?.matches??[]).find(x=>x.phase==="open"||x.phase==="closing"),enIyi=(v?.grounds??[])[0];saha.yaz({mac,ben:{id:ben().id},saatFarki,bolge:v?.here??
null,sonrakiMac:sonraki?Date.parse(sonraki.starts_at):null,yolda:!v?.here,stadyum:enIyi?{kendi:!0,seviye:Number(enIyi.level??1),kapasite:null,ev:enIyi.club,cim:(enIyi.facilities??[]).includes("cim"),sponsorlar:enIyi.
sponsors??[]}:{kendi:!1,seviye:1}})}function ciz(){if(kapandi)return;if(hata&&!v){kap.innerHTML=`<div class="sayfa"><div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(hata))}</span>\
</div>
          <button class="dugme ikincil" style="margin-top:14px" id="stadyum-yeniden">${\u00E7("Yeniden dene")}</button></div>`,$("#stadyum-yeniden",kap).onclick=()=>tazele();return}if(kulupId&&kul){saha.
el.remove(),kap.innerHTML=kulupSayfasiHtml(),bagla();return}const burada=!!v.here,s=v.season??{};kap.innerHTML=`<div class="sayfa" data-stadyum-bolge="${esc(v.here??"")}">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${esc(burada?\u00E7("{sehir} stadyumu",{sehir:bolgeAdi(v.here)}):\u00E7("Stadyum"))}</h1>
          <p class="aciklama">${\u00E7("Futbol kul\xFCpleri ve lig: kul\xFCb\xFCnle sahaya \xE7\u0131k, trib\xFCnden izle, forman\u0131 giy.")}</p></div>
          <span class="cip ${s.preseason?"altin":"yesil"}" id="stadyum-sezon">${ikon("trophy")}${esc(s.preseason?\u00E7("Sezon \xF6ncesi"):\u00E7("{s}. sezon \xB7 {h}. hafta",{s:sayi(s.season??1),h:sayi(
s.week??1)}))}</span></div>
        <div id="stadyum-saha-yer"></div>
        <div class="izgara iki futbol-izgara" style="margin-top:20px">
          <div class="yigin">${macHtml()}${programHtml()}${kulupleriHtml()}</div>
          <div class="yigin">${kulubumHtml()}${transferKartHtml(K3)}${ligHtml()}${kupalarKartHtml(K3)}${federasyonKartHtml(K3)}${yildizlarKartHtml(K3)}${biletlerHtml()}${kurallarHtml()}</div>
        </div></div>`,$("#stadyum-saha-yer",kap)?.replaceWith(saha.el),sahneYaz(),bagla(),mac?.decision&&KP.ac(mac)}function canliCiz(){if(kapandi||kulupId)return;const k=$("#stadyum-mac",kap);if(k&&mac){
const yeni=document.createElement("div");yeni.innerHTML=macHtml();const el=yeni.firstElementChild;el&&el.outerHTML!==k.outerHTML&&(k.replaceWith(el),bagla())}else if(mac&&!k){ciz();return}sahneYaz(),mac?.
decision?KP.ac(mac):KP.karar&&!(mac?.events??[]).some(x=>x.i===KP.karar.k.i)&&futbolEl({bas:Date.parse(KP.karar.m.starts_at)},simdi())<KP.karar.k.opens-4e3&&KP.kapat()}async function isle(fn,basari){if(!mesgul){
mesgul=!0;try{const y=await fn();if(kapandi)return;basari?.(y),Durum.ozet().catch(()=>{}),await yukle()}catch(e){tost(hataMetni(e),"circle-alert"),await yukle().catch(()=>{})}finally{mesgul=!1,kapandi||
ciz()}}}function armaOnizleme(f){const g=(ad,yedek)=>Number(f.get(ad)??yedek);return kulupArmaSvg({color1:g("r1",0),color2:g("r2",4),crest:{shape:g("sekil",0),symbol:g("sembol",0)}},72)}function kurPencere(){
const c=KR(),L=c.license??{},renkler=c.colors??KULUP_RENK_VARSAYILAN,secim=(ad,liste,cizim,sec=0)=>`<div class="kulup-secim" role="radiogroup" aria-label="${esc(ad)}">${liste.map((x,i)=>`<label title=\
"${esc(cizim.ad(x,i))}">
        <input type="radio" name="${cizim.alan}" value="${i}" ${i===sec?"checked":""} aria-label="${esc(cizim.ad(x,i))}">${cizim.html(x,i)}</label>`).join("")}</div>`,ff=pencereForm({ust:\u00E7("Stady\
um"),baslik:\u00E7("Kul\xFCp kur"),onayAd:\u00E7("Ba\u015Fvur"),onayIkon:"flag",govde:`<div class="kulup-kur-onizleme" id="kulup-kur-arma" aria-hidden="true"></div>
          <p class="aciklama">${esc(\u00E7("Kul\xFCp {sehir} kul\xFCb\xFC olur. Ad\u0131 ve k\u0131sa ad\u0131 topluluk kurallar\u0131na uygun olmal\u0131; ger\xE7ek kul\xFCp, lig ve futbolcu adlar\u0131 kullan\u0131lmaz.",
{sehir:bolgeAdi(v.here)}))}</p>
          <label class="alan"><span>${\u00E7("Kul\xFCb\xFCn ad\u0131")}</span><input name="ad" required minlength="${c.name?.min??3}" maxlength="${c.name?.max??30}" autocomplete="off"></label>
          <label class="alan"><span>${\u00E7("K\u0131sa ad (3 harf)")}</span><input name="kisa" required minlength="3" maxlength="3" autocomplete="off" style="text-transform:uppercase"></label>
          <p class="ust-yazi" style="margin-top:10px">${\u00E7("Birinci renk (forma)")}</p>${secim(\u00E7("Birinci renk"),renkler,{alan:"r1",ad:(_x,i)=>\u00E7("Renk {n}",{n:i+1}),html:x=>`<span class=\
"renk-ornek" style="--renk:${x}"></span>`},0)}
          <p class="ust-yazi" style="margin-top:10px">${\u00E7("\u0130kinci renk (\u015Fort, \u015Ferit, arma)")}</p>${secim(\u00E7("\u0130kinci renk"),renkler,{alan:"r2",ad:(_x,i)=>\u00E7("Renk {n}",
{n:i+1}),html:x=>`<span class="renk-ornek" style="--renk:${x}"></span>`},4)}
          <p class="ust-yazi" style="margin-top:10px">${\u00E7("Arman\u0131n bi\xE7imi")}</p>${secim(\u00E7("Arman\u0131n bi\xE7imi"),c.crest?.shapes??KULUP_SEKILLER,{alan:"sekil",ad:x=>KULUP_SEKIL_AD[x]??
x,html:(x,i)=>`<span class="sekil-ornek">${kulupArmaSvg({color1:5,color2:4,crest:{shape:i,symbol:-1}},30)}</span>`},0)}
          <p class="ust-yazi" style="margin-top:10px">${\u00E7("Arman\u0131n simgesi")}</p>${secim(\u00E7("Arman\u0131n simgesi"),c.crest?.symbols??KULUP_SEMBOLLER,{alan:"sembol",ad:x=>KULUP_SEMBOL_AD[x]??
x,html:x=>`<span class="sekil-ornek">${ikon(x)}</span>`},0)}
          <label class="alan" style="margin-top:10px"><span>${\u00E7("Mevkin")}</span><select name="mevki">${["forvet","orta","defans","kaleci"].map(p=>`<option value="${p}">${esc(futbolPosAdi(p))}</o\
ption>`).join("")}</select></label>
          <label class="alan"><span>${esc(\u00E7("Lisans teklifi (kredi; en az {a}, en \xE7ok {b})",{a:kr(L.feeCr??1e5),b:kr(Math.floor(Number(L.feeCr??1e5)*Number(L.bidMaxPpm??1e7)/1e6))}))}</span>
            <input name="teklif" type="number" inputmode="decimal" min="${(L.feeCr??1e5)/100}" max="${Math.floor(Number(L.feeCr??1e5)*Number(L.bidMaxPpm??1e7)/1e6)/100}" step="1" value="${(L.feeCr??1e5)/
100}"></label>
          <p class="kucuk">${esc(\u00E7("Teklif rezervde kal\u0131r; lisans al\u0131nca \xFClkenin futbol fonuna ge\xE7er, ba\u015Fvuru d\xFC\u015Ferse geri d\xF6ner. Kredin {k}.",{k:kr(v.me?.credit??
0)}))}</p>`,is:async f=>{const teklif=Math.round(Number(String(f.get("teklif")??"").replace(",","."))*100);if(!Number.isFinite(teklif)||teklif<=0)throw new Error(\u00E7("Lisans teklifini yaz."));await Sunucu.
yap("club_found",{p_name:String(f.get("ad")??"").trim(),p_short:String(f.get("kisa")??"").trim().toLocaleUpperCase("en"),p_color1:Number(f.get("r1")),p_color2:Number(f.get("r2")),p_shape:Number(f.get(
"sekil")),p_symbol:Number(f.get("sembol")),p_pos:String(f.get("mevki")),p_bid_cr:teklif}),tost(\u00E7("Kul\xFCb\xFCn\xFCn ba\u015Fvurusu yap\u0131ld\u0131. Kurucular\u0131 davet et; en az {n} ki\u015Fi olunca lisans turunu bekler.",
{n:sayi(L.minFounders??7)}),"flag"),Durum.ozet().catch(()=>{}),await yukle(),kulupId=v?.mine?.id??null,kulupId&&(kul=await Sunucu.cagir("club",{p_club:kulupId}).catch(()=>null)),kapandi||ciz()}}),onizle=()=>{
const yer=$("#kulup-kur-arma",ff.form);yer&&(yer.innerHTML=armaOnizleme(new FormData(ff.form)))};ff.form.addEventListener("change",onizle),onizle()}function davetPencere(kisi){kisi&&kulupDavetPenceresi(
kisi,kul?.name??"",async()=>{await yukle(),kapandi||ciz()})}function yonetPencere(id){const x=(kul?.members??[]).find(m=>m.character_id===id);if(!x)return;const c=KR(),ff=pencereForm({ust:kul.name,baslik:x.
me?\u00E7("S\xF6zle\u015Fmen"):x.name??"",onayAd:\u00E7("S\xF6zle\u015Fmeyi kaydet"),onayIkon:"pencil",govde:`<label class="alan"><span>${\u00E7("Mevki")}</span><select name="mevki">${["kaleci","defan\
s","orta","forvet"].map(p=>`<option value="${p}" ${x.pos===p?"selected":""}>${esc(futbolPosAdi(p))}</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Forma numaras\u0131 (1\u201399)")}</span><input name="no" type="number" min="1" max="99" step="1" value="${x.number??""}"></label>
          <label class="alan"><span>${esc(\u00E7("Haftal\u0131k maa\u015F (kredi; en \xE7ok {kr})",{kr:kr(c.squad?.wageMaxCr??2e4)}))}</span><input name="maas" type="number" inputmode="decimal" min="0\
" max="${(c.squad?.wageMaxCr??2e4)/100}" step="1" value="${Number(x.wage_cr??0)/100}"></label>
          ${x.me?"":`<p class="ust-yazi" style="margin-top:10px">${\u00E7("G\xF6rev")}</p><div class="oneri-dugmeler">
            ${x.coach&&!x.president?"":`<button type="button" class="dugme sade kucuk-d" data-rol="coach">${ikon("users-round")}${\u00E7("Teknik direkt\xF6r yap")}</button>`}
            ${x.captain?"":`<button type="button" class="dugme sade kucuk-d" data-rol="captain">${ikon("badge-check")}${\u00E7("Kaptan yap")}</button>`}
            <button type="button" class="dugme sade kucuk-d" data-rol="president">${ikon("crown")}${\u00E7("Ba\u015Fkanl\u0131\u011F\u0131 devret")}</button>
            <button type="button" class="dugme mercan kucuk-d" data-birak="1">${ikon("door-open")}${\u00E7("Kadrodan \xE7\u0131kar")}</button></div>`}`,is:async f=>{const no=String(f.get("no")??"").trim();
await Sunucu.yap("club_contract",{p_target:id,p_wage_cr:Math.round(Number(String(f.get("maas")??"0").replace(",","."))*100)||0,p_number:no?Number(no):null,p_pos:String(f.get("mevki"))}),tost(\u00E7("S\
\xF6zle\u015Fme kaydedildi."),"pencil"),await yukle(),kapandi||ciz()}});for(const b of $$("[data-rol]",ff.form))b.onclick=()=>{const rol=b.dataset.rol;ff.kapat();const ad=x.name??"",metin=rol==="presi\
dent"?\u00E7("Ba\u015Fkanl\u0131\u011F\u0131 {ad} ki\u015Fisine devredersen kul\xFCb\xFCn y\xF6netimi ona ge\xE7er; sen oyuncu olarak kal\u0131rs\u0131n.",{ad}):rol==="coach"?\u00E7("{ad} teknik direk\
t\xF6r olur: kadroyu ve takti\u011Fi se\xE7er, haz\u0131rl\u0131k ma\xE7\u0131 \xF6nerir.",{ad}):\u00E7("{ad} kaptan olur.",{ad});pencere({ust:kul.name,baslik:KULUP_ROL_AD[rol],govde:`<p class="acikla\
ma">${esc(metin)}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Onayla"),sinif:"altin",is:()=>isle(()=>Sunucu.yap("club_role",{p_target:id,p_role:rol}),()=>tost(\u00E7("G\xF6rev verildi: {ad}, {rol\
}.",{ad,rol:KULUP_ROL_AD[rol]}),"badge-check"))}]})};const bb=$("[data-birak]",ff.form);bb&&(bb.onclick=()=>{ff.kapat(),pencere({ust:kul.name,baslik:\u00E7("Kadrodan \xE7\u0131kar"),govde:`<p class="a\
ciklama">${esc(\u00E7("{ad} kadrodan \xE7\u0131kar; s\xF6zle\u015Fmesi biter, haz\u0131r oldu\u011Fu ma\xE7lardan d\xFC\u015Fer.",{ad:x.name??""}))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7(
"\xC7\u0131kar"),sinif:"mercan",ikon:"door-open",is:()=>isle(()=>Sunucu.yap("club_release",{p_target:id}),()=>tost(\u00E7("{ad} kadrodan \xE7\u0131kar\u0131ld\u0131.",{ad:x.name??""}),"door-open"))}]})})}
function fiyatPencere(){const c=KR(),t=c.ticket??{},kt=c.kit??{};pencereForm({ust:kul.name,baslik:\u00E7("Fiyatlar"),onayAd:\u00E7("Kaydet"),onayIkon:"coins",govde:`<label class="alan"><span>${esc(\u00E7(
"Bilet (kredi; {a}\u2013{b})",{a:kr(t.minCr??100),b:kr(t.maxCr??5e3)}))}</span><input name="bilet" type="number" inputmode="decimal" min="${(t.minCr??100)/100}" max="${(t.maxCr??5e3)/100}" step="1" va\
lue="${Number(kul.ticket_price_cr??300)/100}"></label>
          <label class="alan"><span>${esc(\u00E7("Forma (kredi; {a}\u2013{b})",{a:kr(kt.minCr??500),b:kr(kt.maxCr??5e3)}))}</span><input name="forma" type="number" inputmode="decimal" min="${(kt.minCr??
500)/100}" max="${(kt.maxCr??5e3)/100}" step="1" value="${Number(kul.kit_price_cr??1500)/100}"></label>
          <p class="kucuk">${esc(\u00E7("Yeni fiyat bundan sonra a\xE7\u0131lan ma\xE7lara ve sat\u0131\u015Flara uygulan\u0131r. Ucuz bilet seyirciyi art\u0131r\u0131r."))}</p>`,is:async f=>{await Sunucu.
yap("club_prices",{p_ticket_cr:Math.round(Number(String(f.get("bilet")).replace(",","."))*100),p_kit_cr:Math.round(Number(String(f.get("forma")).replace(",","."))*100)}),tost(\u00E7("Fiyatlar kaydedil\
di."),"coins"),await yukle(),kapandi||ciz()}})}function katkiPencere(){const c=KR().contribution??{};pencereForm({ust:kul.name,baslik:\u00E7("Katk\u0131 ver"),onayAd:\u00E7("Kasaya b\u0131rak"),onayIkon:"\
hand-coins",govde:`<p class="aciklama">${esc(\u00E7("Katk\u0131 kul\xFCb\xFCn kasas\u0131na ge\xE7er (stadyum ve tesisler i\xE7in); geri al\u0131nmaz. Katk\u0131 duvar\u0131nda ad\u0131nla g\xF6r\xFCn\xFCr."))}\
</p>
          <label class="alan"><span>${esc(\u00E7("Kredi (kredin {k})",{k:kr(v?.me?.credit??0)}))}</span><input name="kredi" type="number" inputmode="decimal" min="0" max="${Number(c.maxCr??1e6)/100}" \
step="1" value="0"></label>
          <label class="alan"><span>${esc(\u00E7("\u0130n\u015Faat malzemesi (sende {n})",{n:sayi(v?.me?.insaat??0)}))}</span><input name="malzeme" type="number" min="0" max="${Number(c.maxInsaat??2e3)}\
" step="1" value="0"></label>`,is:async f=>{const cr=Math.round(Number(String(f.get("kredi")??"0").replace(",","."))*100)||0,m=Number(f.get("malzeme")??0)||0;if(!cr&&!m)throw new Error(\u00E7("Kredi y\
a da malzeme yaz."));await Sunucu.yap("club_contribute",{p_club:kul.id,p_cr:cr,p_insaat:m}),tost(\u00E7("Katk\u0131n i\xE7in te\u015Fekk\xFCrler: {ad} kasas\u0131.",{ad:kul.name}),"hand-coins"),Durum.
ozet().catch(()=>{}),await yukle(),kapandi||ciz()}})}function kadroPencere(){const m=mac;if(!m?.ready)return;const yerler=clubSlotPozisyonlari(),l=m.ready??[],sec=new Map(l.filter(x=>x.slot!=null).map(
x=>[Number(x.slot),x.character_id])),taktik=m[`tactic_${m.my_side}`]??"dengeli";pencereForm({ust:\u00E7("{ev} \u2013 {dep}",{ev:m.home?.short??"",dep:m.away?.short??""}),baslik:\u00E7("Kadroyu kur (4-\
4-2)"),onayAd:\u00E7("Kadroyu kaydet"),onayIkon:"users-round",govde:`<p class="aciklama">${esc(\u00E7('Yaln\u0131z "Ma\xE7a haz\u0131r\u0131m" diyenler se\xE7ilir. Bo\u015F b\u0131rakt\u0131\u011F\u0131n yerlere kilitte en g\xFC\xE7l\xFC haz\u0131r oyuncu, o d\
a yoksa altyap\u0131dan biri girer; kilitte \u015Fehirde olmayan sahaya \xE7\u0131kmaz.'))}</p>
          <div class="kulup-kadro-form">${yerler.map((p,i)=>`<label class="alan kulup-kadro-yer"><span>${esc(`${i+1}. ${futbolPosAdi(p)}`)}</span><select name="y${i}"><option value="">${\u00E7("Otomat\
ik")}</option>${l.map(x=>`<option value="${esc(x.character_id)}" ${sec.get(i)===x.character_id?"selected":""}>${esc(`${x.me?\u00E7("Sen"):x.name??"?"} \xB7 ${futbolPosAdi(x.pos)} \xB7 ${\u00E7("g\xFC\xE7 {n\
}",{n:sayi(x.rating??0)})}${x.here?"":" \xB7 "+\u00E7("\u015Fehirde de\u011Fil")}`)}</option>`).join("")}</select></label>`).join("")}</div>
          <label class="alan"><span>${\u00E7("Taktik")}</span><select name="taktik">${["dengeli","hucum","savunma"].map(t=>`<option value="${t}" ${taktik===t?"selected":""}>${esc(futbolTaktikAdi(t))}<\
/option>`).join("")}</select></label>`,is:async f=>{const slots=yerler.map((_p,i)=>String(f.get(`y${i}`)??"")||null),dolu=slots.filter(Boolean);if(new Set(dolu).size!==dolu.length)throw new Error(\u00E7(
"Bir oyuncu kadroda tek yerde olur."));await Sunucu.yap("club_lineup",{p_match:m.id,p_slots:slots,p_tactic:String(f.get("taktik"))}),tost(\u00E7("Kadro kaydedildi."),"users-round"),await yukle(),kapandi||
ciz()}})}const clubSlotPozisyonlari=()=>{const f=KR().team?.formation??{defans:4,orta:4,forvet:2};return["kaleci",...Array(f.defans).fill("defans"),...Array(f.orta).fill("orta"),...Array(f.forvet).fill(
"forvet")]};function dostlukPencere(){const c=KR(),fr=c.friendly??{},rakipler=[...v.country_clubs??[],...(v.city_clubs??[]).filter(x=>x.status==="active")].filter((x,i,a)=>x.id!==kul.id&&a.findIndex(y=>y.
id===x.id)===i),adim=Number(fr.slotMinutes??15)*6e4,ilk=Math.ceil((simdi()+Number(fr.minLeadMinutes??60)*6e4)/adim)*adim,son=simdi()+Number(fr.maxLeadHours??72)*36e5,saatler=[];for(let t=ilk;t<=son;t+=
adim)saatler.push(t);const gunler=[...new Set(saatler.map(t=>new Date(t).toDateString()))],gunAdi=g=>{const bugun=new Date(simdi()).toDateString(),yarin=new Date(simdi()+864e5).toDateString();return g===
bugun?\u00E7("Bug\xFCn"):g===yarin?\u00E7("Yar\u0131n"):new Date(g).toLocaleDateString(DIL.yerel,{weekday:"long",day:"numeric",month:"long"})};if(!rakipler.length){tost(\u00E7("Haz\u0131rl\u0131k ma\xE7\u0131 i\xE7in \xFClke\
nde ba\u015Fka lisansl\u0131 kul\xFCp yok."),"circle-alert");return}const ff=pencereForm({ust:kul.name,baslik:\u00E7("Haz\u0131rl\u0131k ma\xE7\u0131 \xF6ner"),onayAd:\u00E7("\xD6ner"),onayIkon:"hands\
hake",govde:`<p class="aciklama">${esc(\u00E7("Ma\xE7 senin sahanda oynan\u0131r (kendi stadyumun ya da belediyenin). Kar\u015F\u0131 kul\xFCb\xFCn teknik direkt\xF6r\xFC ya da ba\u015Fkan\u0131 kabul edince programa girer; kul\xFCbe g\xFCnde {n}\
 haz\u0131rl\u0131k ma\xE7\u0131.",{n:sayi(fr.perDay??1)}))}</p>
          <label class="alan"><span>${\u00E7("Rakip")}</span><select name="rakip">${rakipler.map(x=>`<option value="${esc(x.id)}">${esc(`${x.name} (${x.short})`)}</option>`).join("")}</select></label>\

          <label class="alan"><span>${\u00E7("G\xFCn")}</span><select name="gun">${gunler.map(g=>`<option value="${esc(g)}">${esc(gunAdi(g))}</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Saat")}</span><select name="saat"></select></label>
          <label class="alan"><span>${esc(\u00E7("Bilet (kredi; bo\u015F: kul\xFCb\xFCn fiyat\u0131 {kr})",{kr:kr(kul.ticket_price_cr??300)}))}</span><input name="bilet" type="number" inputmode="decim\
al" min="${(c.ticket?.minCr??100)/100}" max="${(c.ticket?.maxCr??5e3)/100}" step="1"></label>`,is:async f=>{const t=Number(f.get("saat"));if(!t)throw new Error(\u00E7("Bir saat se\xE7."));const b=String(
f.get("bilet")??"").trim();await Sunucu.yap("club_friendly_propose",{p_opponent:String(f.get("rakip")),p_starts_at:new Date(t).toISOString(),p_price_cr:b?Math.round(Number(b.replace(",","."))*100):null}),
tost(\u00E7("Haz\u0131rl\u0131k ma\xE7\u0131 \xF6nerildi; kar\u015F\u0131 kul\xFCp yan\u0131tlay\u0131nca programa girer."),"handshake"),await yukle(),kapandi||ciz()}}),gunSec=$("select[name=gun]",ff.
form),saatSec=$("select[name=saat]",ff.form),doldur=()=>{const g=gunSec.value;saatSec.innerHTML=saatler.filter(t=>new Date(t).toDateString()===g).map(t=>`<option value="${t}">${esc(saatKisa(t))}</opti\
on>`).join("")};gunSec.onchange=doldur,doldur()}async function ligPencere(){if(!lig)return;const turlar=new Map;for(const m of lig.fixtures??[]){const r=Number(m.round??0);turlar.has(r)||turlar.set(r,
[]),turlar.get(r).push(m)}pencere({ust:\u00E7("{s}. sezon \xB7 {b}",{s:sayi(lig.season),b:lig.format==="double"?\u00E7("\xE7ift devreli"):\u00E7("tek devreli")}),baslik:ligAdi(lig,lig.country_id),govde:`\
<div class="kulup-tablo-kap">${tabloHtml(lig.table??[])}</div>
          ${(lig.table??[]).some(x=>Number(x.prize_cr))?`<p class="kucuk">${esc(\u00E7("\xD6d\xFCller: {l}.",{l:(lig.table??[]).filter(x=>Number(x.prize_cr)).map(x=>`${x.club?.short??""} ${kr(x.prize_cr)}`).
join(", ")}))}</p>`:""}
          <div class="kulup-fikstur">${[...turlar.entries()].map(([r,l])=>`<p class="ust-yazi" style="margin-top:10px">${esc(\u00E7("{n}. hafta",{n:sayi(r)}))}</p>
            <div class="liste">${l.map(x=>`<div class="liste-satir"><span class="kulup-mac-armalar">${kulupArma(x.home,22)}${kulupArma(x.away,22)}</span>
              <div><b>${esc(`${x.home?.short??""} ${x.status==="finished"?`${sayi(x.score_a??0)}\u2013${sayi(x.score_b??0)}`:saatKisa(x.starts_at)} ${x.away?.short??""}`)}</b>
              <div class="alt">${esc([kulupTarihi(x.starts_at),x.forfeit?\u00E7("h\xFCkmen"):null,x.status==="cancelled"?\u00E7("iptal"):null].filter(Boolean).join(" \xB7 "))}</div></div><span></span>\
</div>`).join("")}</div>`).join("")}</div>`})}async function kulupAc(id){id&&(kulupId=id,kul=await Sunucu.cagir("club",{p_club:id}).catch(err=>(tost(hataMetni(err),"circle-alert"),null)),kul||(kulupId=
null),arama={q:"",sonuc:null},kapandi||(ciz(),window.scrollTo?.({top:0})))}async function macIzle(id){izlenen=id,kulupId=null,kul=null,await yukle(),kapandi||(ciz(),git("#stadyum-saha"))}function bagla(){
for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-kulup-kisi]",kap))b.onclick=e=>{e.stopPropagation(),profilAc(b.dataset.kulupKisi)};for(const b of $$(
"[data-kulup-ac]",kap))b.onclick=e=>{e.stopPropagation(),kulupAc(b.dataset.kulupAc)};$("#kulup-geri",kap)?.addEventListener("click",async()=>{kulupId=null,kul=null,await yukle(),kapandi||ciz()});for(const b of $$(
"[data-kulup-izle]",kap))b.onclick=()=>macIzle(b.dataset.kulupIzle);$("#stadyum-izleme-birak",kap)?.addEventListener("click",async()=>{izlenen=null,await yukle(),kapandi||ciz()});for(const b of $$("[d\
ata-kulup-lig]",kap))b.onclick=async()=>{ligSecili=b.dataset.kulupLig,lig=await Sunucu.cagir("club_league",{p_league:ligSecili}).catch(()=>null),kapandi||ciz()};$("#stadyum-lig-tam",kap)?.addEventListener(
"click",()=>ligPencere()),$("#stadyum-kur",kap)?.addEventListener("click",()=>kurPencere());for(const b of $$("[data-kulup-davet]",kap))b.onclick=()=>{const[id,k]=b.dataset.kulupDavet.split("|");isle(
()=>Sunucu.yap("club_invite_answer",{p_invite:id,p_accept:k==="1"}),()=>tost(k==="1"?\u00E7("Kul\xFCbe kat\u0131ld\u0131n; forman\u0131 G\xF6r\xFCn\xFCm'de giyebilirsin."):\u00E7("Daveti reddettin."),
k==="1"?"shield":"x"))};for(const b of $$("[data-kulup-forma]",kap))b.onclick=()=>{const k=(v.city_clubs??[]).find(x=>x.id===b.dataset.kulupForma);formaAl(k)};$("#stadyum-bilet-al",kap)?.addEventListener(
"click",()=>{const m=mac;pencere({ust:\u00E7("{ev} \u2013 {dep}",{ev:kulupAdi(m.home),dep:kulupAdi(m.away)}),baslik:\u00E7("Bilet al"),govde:`<p class="aciklama">${esc(\u00E7("Bilet {kr} kredi; kilide\
 dek iade edilir. Ma\xE7 ba\u015Flarken (kilitte) {sehir} \u015Fehrinde olmal\u0131s\u0131n.",{kr:kr(m.ticket_price_cr??0),sehir:bolgeAdi(m.region_id)}))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7(
"Bilet al"),sinif:"altin",ikon:"ticket",is:()=>isle(()=>Sunucu.yap("club_ticket_buy",{p_match:m.id}),()=>tost(\u00E7("Biletin al\u0131nd\u0131; ma\xE7 g\xFCn\xFC trib\xFCndesin."),"ticket-check"))}]})}),
$("#stadyum-bilet-iade",kap)?.addEventListener("click",()=>isle(()=>Sunucu.yap("club_ticket_refund",{p_match:mac.id}),()=>tost(\u00E7("Bilet iade edildi; \xFCcretin d\xF6nd\xFC."),"undo-2"))),$("#stad\
yum-hazir-dugme",kap)?.addEventListener("click",e=>{const hazir=e.currentTarget.dataset.hazir==="1";isle(()=>Sunucu.yap("club_ready",{p_match:mac.id,p_ready:hazir}),()=>tost(hazir?\u00E7("Ma\xE7a haz\u0131rs\u0131\
n; kilitte \u015Fehirde ol."):\u00E7("Haz\u0131r\u0131m'\u0131 geri ald\u0131n."),hazir?"badge-check":"x"))}),$("#stadyum-kadro-dugme",kap)?.addEventListener("click",()=>kadroPencere()),$("#stadyum-on\
eri-kabul",kap)?.addEventListener("click",()=>isle(()=>Sunucu.yap("club_friendly_answer",{p_match:mac.id,p_accept:!0}),()=>tost(\u00E7("Haz\u0131rl\u0131k ma\xE7\u0131 programa girdi."),"handshake"))),
$("#stadyum-oneri-ret",kap)?.addEventListener("click",()=>isle(()=>Sunucu.yap("club_friendly_answer",{p_match:mac.id,p_accept:!1}),()=>tost(\u00E7("\xD6neriyi reddettin."),"x"))),$("#stadyum-oneri-ger\
i",kap)?.addEventListener("click",()=>isle(()=>Sunucu.yap("club_friendly_cancel",{p_match:mac.id}),()=>tost(\u00E7("\xD6neriyi geri \xE7ektin."),"undo-2")));for(const b of $$("[data-kulup-yonet]",kap))
b.onclick=()=>yonetPencere(b.dataset.kulupYonet);for(const b of $$("[data-kulup-yap]",kap))b.onclick=()=>{const hedef=b.dataset.kulupYap,c=KR(),st=Number(kul.stadium?.level??0),x=hedef==="level"?(c.stadium?.
levels??[]).find(l=>Number(l.level)===st+1):c.stadium?.facilities?.[hedef];x&&pencere({ust:kul.name,baslik:hedef==="level"?st?\u00E7("Stadyumu b\xFCy\xFCt"):\u00E7("Stadyum yapt\u0131r"):KULUP_TESIS_AD[hedef]??
hedef,govde:`<p class="aciklama">${esc(\u00E7("Kasadan {kr} kredi ve {m} in\u015Faat malzemesi d\xFC\u015Fer; yap\u0131m {s} saat s\xFCrer. Kasa: {k} kredi, {n} malzeme.",{kr:kr(x.costCr),m:sayi(x.insaat),
s:sayi(x.hours),k:kr(kul.finance?.balance_cr??0),n:sayi(kul.finance?.insaat??0)}))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Yapt\u0131r"),sinif:"altin",ikon:"hammer",is:()=>isle(()=>Sunucu.
yap("club_build",{p_target:hedef}),()=>tost(\u00E7("Yap\u0131m ba\u015Flad\u0131."),"hard-hat"))}]})};$("#kulup-katki",kap)?.addEventListener("click",()=>katkiPencere()),$("#kulup-dostluk",kap)?.addEventListener(
"click",()=>dostlukPencere()),$("#kulup-fiyat",kap)?.addEventListener("click",()=>fiyatPencere()),$("#kulup-forma-al",kap)?.addEventListener("click",()=>(kul?.members??[]).some(x=>x.number!=null&&!x.me)&&
typeof adliFormaPenceresi=="function"?adliFormaPenceresi(kul,K3):formaAl(kul)),typeof kupaBagla=="function"&&kupaBagla(kap,K3),$("#kulup-forma-giy",kap)?.addEventListener("click",()=>formaGiy(kul));for(const b of $$(
"[data-kulup-gorunum]",kap))b.onclick=()=>{try{sessionStorage.setItem("civora.magaza",JSON.stringify({tur:b.dataset.kulupGorunum}))}catch{}Kabuk.git("hayat/magaza")};for(const b of $$("[data-kulup-mar\
s]",kap))b.onclick=()=>{const p=magazaUrun(b.dataset.kulupMars);p&&kul&&kulupMarsiCal(p,"kulup-mars:"+kul.id)};$("#kulup-kombine",kap)?.addEventListener("click",()=>{const c=KR();pencere({ust:kul.name,
baslik:\u00E7("Kombine al"),govde:`<p class="aciklama">${esc(\u00E7("Kombine bu sezonun kalan ev ma\xE7lar\u0131n\u0131n (en \xE7ok {n}) biletleridir; bug\xFCnk\xFC bilet fiyat\u0131yla, \xF6denir ve iade edilmez. Her ma\xE7ta kilitt\
e \u015Fehirde olmal\u0131s\u0131n.",{n:sayi(c.ticket?.seasonMatches??8)}))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Kombine al"),sinif:"altin",ikon:"ticket",is:()=>isle(()=>Sunucu.yap("cl\
ub_season_ticket_buy",{p_club:kul.id}),()=>tost(\u00E7("Kombinen haz\u0131r; ev ma\xE7lar\u0131nda trib\xFCndesin."),"ticket-check"))}]})}),$("#kulup-ad",kap)?.addEventListener("click",()=>pencereForm(
{ust:kul.name,baslik:\u00E7("Yeni ad koy"),onayAd:\u00E7("Kaydet"),onayIkon:"pencil",govde:`<p class="aciklama">${esc(\u00E7("Kul\xFCb\xFCn ad\u0131 topluluk kurallar\u0131na uymad\u0131\u011F\u0131 i\xE7in kald\u0131r\u0131ld\u0131. Bir kez yeni ad\
 koyabilirsin."))}</p>
          <label class="alan"><span>${\u00E7("Kul\xFCb\xFCn ad\u0131")}</span><input name="ad" required minlength="3" maxlength="30" autocomplete="off"></label>`,is:async f=>{await Sunucu.yap("club_re\
name",{p_name:String(f.get("ad")??"").trim()}),tost(\u00E7("Kul\xFCb\xFCn yeni ad\u0131 kaydedildi."),"pencil"),await yukle(),kapandi||ciz()}})),$("#kulup-raporla",kap)?.addEventListener("click",()=>raporla(
{tur:"club",ref:kul.id,ad:kul.name})),$("#kulup-ayril",kap)?.addEventListener("click",()=>{const geri=kul.my_role==="president"&&kul.status==="applying";pencere({ust:kul.name,baslik:geri?\u00E7("Ba\u015Fvu\
ruyu geri \xE7ek"):\u00E7("Kul\xFCpten ayr\u0131l"),govde:`<p class="aciklama">${esc(geri?\u00E7("Ba\u015Fvuru geri \xE7ekilir, kul\xFCp da\u011F\u0131l\u0131r; lisans teklifin rezervden d\xF6ner."):kul.
my_role==="president"?\u00E7("Ba\u015Fkan ayr\u0131lmadan \xF6nce ba\u015Fkanl\u0131\u011F\u0131 kadrodan birine devreder; kadroda yaln\u0131zsan kul\xFCp da\u011F\u0131l\u0131r."):\u00E7("S\xF6zle\u015Fmen b\
iter; haz\u0131r oldu\u011Fun ma\xE7lardan d\xFC\u015Fersin."))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:geri?\u00E7("Geri \xE7ek"):\u00E7("Ayr\u0131l"),sinif:"mercan",ikon:"door-open",is:()=>isle(
()=>Sunucu.yap("club_leave",{}),()=>{tost(geri?\u00E7("Ba\u015Fvuru geri \xE7ekildi."):\u00E7("Kul\xFCpten ayr\u0131ld\u0131n."),"door-open"),kulupId=null,kul=null})}]})});for(const b of $$("[data-kul\
up-davet-geri]",kap))b.onclick=()=>isle(()=>Sunucu.yap("club_invite_cancel",{p_invite:b.dataset.kulupDavetGeri}),()=>tost(\u00E7("Davet geri \xE7ekildi."),"undo-2"));$("#kulup-ara",kap)?.addEventListener(
"submit",async e=>{if(e.preventDefault(),arama.q=String(new FormData(e.target).get("q")??"").trim(),arama.q.length<2){tost(\u00E7("En az 2 harf yaz."),"circle-alert");return}try{const liste=await Sunucu.
cagir("character_search",{p_query:arama.q});arama.sonuc=liste.filter(x=>x.character_id!==ben().id),ciz(),$("#kulup-ara-sonuc",kap)?.scrollIntoView({block:"nearest"})}catch(err){tost(hataMetni(err),"ci\
rcle-alert")}});for(const b of $$("[data-kulup-davet-et]",kap))b.onclick=()=>davetPencere(arama.sonuc?.find(k=>k.character_id===b.dataset.kulupDavetEt))}function formaAl(k){k&&pencere({ust:kulupAdi(k),
baslik:\u00E7("Forma al"),govde:`<div class="kulup-forma-onizleme">${kulupArma(k,56)}<span class="avatar" aria-hidden="true">${avatarSvg(ben().name??"",{...Gorunus.al(ben().id)?.look??varsayilanGorunus(
ben().name??""),forma:{k:k.id,c1:k.color1,c2:k.color2,n:null}})}</span></div>
          <p class="aciklama">${esc(\u00E7("Forma {kr} kredi; kul\xFCb\xFCn kasas\u0131na ge\xE7er (%5 sistem bedeli). G\xF6r\xFCn\xFCm'de giyersin, her sahnede kul\xFCb\xFCn renklerinde g\xF6r\xFCn\xFCrs\xFCn.",
{kr:kr(k.kit_price_cr??0)}))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Sat\u0131n al"),sinif:"altin",ikon:"shirt",is:()=>isle(()=>Sunucu.yap("club_kit_buy",{p_club:k.id}),()=>tost(\u00E7("F\
orma senin. Hayat\u0131m \u2192 G\xF6r\xFCn\xFCm'den giyebilirsin."),"shirt"))}]})}async function formaGiy(k){if(k)try{const g={...(await Sunucu.cagir("my_look"))?.look??varsayilanGorunus(ben().name??
"")},y=await Sunucu.yap("look_save",{p_look:{...g,forma:k.id}});Gorunus.yaz(y.character_id,{character_id:y.character_id,look:y.look,country_id:y.country_id,rank:y.rank}),tost(\u00E7("{ad} formas\u0131n\u0131 gi\
ydin. Hayat\u0131m \u2192 G\xF6r\xFCn\xFCm'den \xE7\u0131karabilirsin.",{ad:kulupAdi(k)}),"shirt")}catch(e){tost(hataMetni(e),"circle-alert")}}const tazele=tazeleyici(async()=>{await yukle(),!kapandi&&
!mesgul&&!document.querySelector(".perde")&&ciz()});function sonrakiYoklama(){if(clearTimeout(yoklamaZaman),kapandi)return;const m=mac,canli=m&&["closing","locked","live","ended"].includes(m.phase);let bekle=canli?
2500:3e4;if(m&&m.phase==="open"&&m.lock_at){const x=Date.parse(m.lock_at)-simdi()+2500;x>150&&x<bekle&&(bekle=x)}if(m&&canli){const el=futbolEl({bas:Date.parse(m.starts_at)},simdi());for(const n of m.
next??[]){const sonuc=n.t-el+300,pencereOnu=n.t-el-Number(futbolKurali()?.decisionMs??6e3)-2500;for(const x of[sonuc,pencereOnu])x>150&&x<bekle&&(bekle=x)}const Z=kulupZaman();for(const x of[-el+300,Z.
yari-el+300,Z.ikinci-el+300,Z.son-el+1500])x>150&&x<bekle&&(bekle=x)}yoklamaZaman=setTimeout(async()=>{if(kapandi)return;if(document.hidden){sonrakiYoklama();return}const evre=mac?.phase;canli&&!kulupId?
(await canliYukle(),mac?.phase!==evre||mac?.phase==="finished"||Date.now()-sonGenel>3e4?(await yukle(),!kapandi&&!mesgul&&!document.querySelector(".perde")&&ciz()):canliCiz()):(await yukle(),!kapandi&&
!mesgul&&!document.querySelector(".perde")&&ciz()),sonrakiYoklama()},Math.max(150,bekle))}if(kulupAcilacak&&(kulupId=kulupAcilacak,kulupAcilacak=null),await yukle(),!kap.isConnected)return saha.kapat(),
()=>{};ciz(),sonrakiYoklama();const b1=Durum.dinle("olay",({olay})=>{!/^(club|cup|federation|national|transfer|sponsor)\./.test(olay)&&olay!=="football.award"||tazele().then(()=>sonrakiYoklama())}),b2=typeof Ezgi==
"object"?Ezgi.dinle(()=>{!kapandi&&kul&&$("#kulup-gorunum",kap)&&ciz()}):()=>{};return()=>{kapandi=!0,b1(),b2(),clearTimeout(yoklamaZaman),KP.kapat(),saha.kapat(),typeof Ezgi=="object"&&/^(kulup|stadyum)-mars:/.
test(String(Ezgi.calan??""))&&Ezgi.durdur()}}}),Parcalar.tamam("ek_98zzf_kulup");
