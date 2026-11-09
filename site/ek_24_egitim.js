// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_24_egitim.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/egitim",{async ac(kap){let durdur=()=>{},kapandi=!1;const saha=EgitimSahasi.ac();let sahne=null,gorunus,asker=null,sahneAn=0;async function sahaYukle(){const[s,bak]=await Promise.all(
[Sunucu.cagir("training_scene").catch(()=>sahne),gorunus===void 0?Sunucu.cagir("my_look").catch(()=>null):null]);sahne=s,sahneAn=Date.now(),gorunus===void 0&&(gorunus=bak?.look??null)}const sahaYaz=()=>saha.
yaz({sahne,gorunus,ozet:Durum.v.ozet,asker});async function ciz(){durdur();const[a,kurallar,ben,sehir]=await Promise.all([Durum.askerlik(),Durum.kurallar(),Sunucu.cagir("coop_me").catch(()=>null),Sunucu.
cagir("city").catch(()=>null),sahaYukle()]);if(kapandi)return;asker=a;const eg=kurallar.data.training,indirim=Number(ben?.education_ppm??0),merkez=Number(sehir?.bonus?.training_ppm??0),kisalt=(dk,ppm)=>ppm>
0?Math.max(1,Math.ceil(dk*(1e6-ppm)/1e6)):dk,yorgunluk=a?.fatigue??null,yavas=yorgunluk?.tired?Number(eg.fatigueSlowPpm??0):0,uzat=dk=>yavas>0?Math.ceil(dk*(1e6+yavas)/1e6):dk,haklar=a?.lesson_credits??
{},hakDus=(dk,b)=>Math.max(0,Math.min(Number(haklar[b]??0),dk-1)),keyif=a?.mood??null,sureDk=(dk,b)=>keyifKisalt(uzat(kisalt(kisalt(dk,indirim),merkez)),b,keyif),egitim=a?.training;kap.innerHTML=`<div\
 class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m \xB7 E\u011Fitim")}</p><h1 class="b1">${\u00E7("Becerilerin")}</h1>
          <p class="aciklama">${\u00E7("Bir e\u011Fitim kuyru\u011Fun var; e\u011Fitim s\xFCrerken \xE7al\u0131\u015Fabilirsin. Askerlik vuru\u015Funu, \xFCretim usta i\u015F\xE7i tariflerini a\xE7ar.")}\
</p></div></div>
        <div id="egitim-sahasi-yer"></div>
        <section class="kart">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("E\u011Fitim \xB7 tek \xFCcretsiz kuyruk")}</p>
            <h2 class="b2">${egitim?\u00E7("{beceri} e\u011Fitimi s\xFCr\xFCyor",{beceri:esc(BECERI[egitim.skill]?.ad??egitim.skill)}):\u00E7("\u015Eu an e\u011Fitimde de\u011Filsin")}</h2></div>
            <span class="ik-kutu">${ikon("graduation-cap")}</span></div>
          ${indirim>0?`<div class="yasa-bant">${ikon("heart-handshake")}<span>${\u00E7("E\u011Fitim de\u011Fi\u015Fimi: {ulke} topra\u011F\u0131ndas\u0131n; e\u011Fitim {oran} k\u0131sa s\xFCrer.",{ulke:esc(
ulkeAdi(ben.location_owner)),oran:ppmYuzde(indirim)})}</span></div>`:""}
          ${merkez>0?`<div class="yasa-bant" data-egitim-merkezi="${esc(String(merkez))}">${ikon("graduation-cap")}<span>${\u00E7("Belediyenin e\u011Fitim merkezi: {sehir} \u015Fehrinde ba\u015Flayan e\u011Fitimler {oran\
} k\u0131sa s\xFCrer.",{sehir:esc(bolgeAdi(sehir.region_id)),oran:ppmYuzde(merkez)})}</span></div>`:""}
          ${yorgunluk?.tired?`<div class="yasa-bant mercan" id="egitim-yorgun">${ikon("heart-pulse")}<span>${\u00E7("Yorgunsun (yorgunluk {n}): yeni ba\u015Flayan e\u011Fitimler {oran} uzun s\xFCrer; {zaman} e\u015Fi\u011Fi\
n alt\u0131na inersin. Sa\u011Fl\u0131k oca\u011F\u0131nda muayene olursan hemen iner.",{n:sayi(yorgunluk.points),oran:ppmYuzde(yavas),zaman:esc(saatYaz(yorgunluk.below_at))})}</span>
            <button class="dugme ikincil kucuk-d" data-git="sehir/saglik">${ikon("stethoscope")}${\u00E7("Sa\u011Fl\u0131k")}</button></div>`:""}
          ${keyifEgitimBandi(keyif)}
          ${egitim?`<p class="aciklama">${\u00E7("{a} \u2192 {b}. seviye. Uygulamay\u0131 kapatsan da biter.",{a:Number(egitim.from_level),b:Number(egitim.to_level)})}</p>
            ${Number(egitim.fatigue_ppm)>0||Number(egitim.mood_ppm)>0||Number(egitim.lesson_minutes)>0?`<p class="kucuk" id="egitim-not">${esc([Number(egitim.fatigue_ppm)>0?\u00E7("Yorgun ba\u015Flad\u0131\u011F\u0131n i\
\xE7in seans {oran} uzun.",{oran:ppmYuzde(egitim.fatigue_ppm)}):null,Number(egitim.mood_ppm)>0?\u00E7("Keyfin yerindeyken ba\u015Flad\u0131\u011F\u0131n i\xE7in seans {oran} k\u0131sa.",{oran:ppmYuzde(
egitim.mood_ppm)}):null,Number(egitim.lesson_minutes)>0?\u00E7("Ders hakk\u0131ndan {n} dakika d\xFC\u015F\xFCld\xFC.",{n:sayi(egitim.lesson_minutes)}):null].filter(Boolean).join(" "))}</p>`:""}
            <div class="cubuk" style="margin-top:10px"><i data-ilerleme="${egitim.starts_at}|${egitim.ends_at}" style="display:block;height:100%;background:var(--altin)"></i></div>
            <div class="satir" style="margin-top:8px;justify-content:space-between"><span class="kucuk">${\u00E7("Kalan:")} <b data-bitis="${egitim.ends_at}"></b></span>
              <button class="dugme sade kucuk-d" id="egitim-iptal">${\u00E7("Vazge\xE7")}</button></div><hr class="ayrac">`:""}
          <div class="yigin">${Object.entries(BECERI).filter(([k])=>(eg.skills??Object.keys(BECERI)).includes(k)).map(([k,b])=>{const sev=a?.skills?.[k]??0,dk0=sureDk((eg.session?.baseMinutes??10)+(eg.
session?.perLevelMinutes??1)*sev,k),dus=hakDus(dk0,k),dk=dk0-dus,not=[Number(haklar[k]??0)>0?\u00E7("ders hakk\u0131 {n} dk",{n:sayi(haklar[k])}):null,dus>0?\u00E7("{n} dk d\xFC\u015F\xFCl\xFCr",{n:sayi(
dus)}):null].filter(Boolean).join(" \xB7 ");return`<div class="ilk-adim" data-egitim-beceri="${k}" data-sure="${dk}"><span class="ozet-ikon" style="background:var(--orman-acik);color:var(--orman)">${ikon(
b.ik)}</span>
              <span><b>${b.ad} \xB7 ${sayi(sev)}</b><span class="kucuk">${sev>=(eg.maxLevel??100)?\u00E7("En \xFCst seviye"):\u00E7("Sonraki seviye {n} dakika",{n:dk})}${not?" \xB7 "+esc(not):""}</spa\
n></span>
              ${egitim||sev>=(eg.maxLevel??100)?"<span></span>":`<button class="dugme kucuk-d ikincil" data-beceri="${k}">${\u00E7("E\u011Fit")}</button>`}</div>`}).join("")}</div>
        </section>
        <section class="kart" id="egitim-dersler" style="margin-top:16px"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Dersler")}</p>
            <h2 class="b2">${Object.values(haklar).some(m=>Number(m)>0)?\u00E7("Ders haklar\u0131n var"):\u00E7("\xD6\u011Fretmenden ders al")}</h2></div><span class="ik-kutu">${ikon("presentation")}<\
/span></div>
          <p class="aciklama">${\u00E7("Becerisi y\xFCksek oyuncular \u015Fehirde ders verir. Derse girince o becerideki e\u011Fitimin k\u0131sal\u0131r; becerin y\xFCksekse sen de ders verirsin.")}</\
p>
          ${Object.entries(haklar).filter(([,m])=>Number(m)>0).length?`<p class="kucuk" style="margin-top:6px">${esc(Object.entries(haklar).filter(([,m])=>Number(m)>0).map(([b,m])=>\u00E7("{beceri}: {\
n} dakika",{beceri:beceriAdi(b),n:sayi(m)})).join(" \xB7 "))}</p>`:""}
          <div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="hayat/dersler">${ikon("presentation")}${\u00E7("Dersler")}</button></div></section></div>`,
$("#egitim-sahasi-yer",kap)?.replaceWith(saha.el),sahaYaz();for(const b of $$("[data-beceri]",kap))b.onclick=()=>islem("training_start",{p_skill:b.dataset.beceri},\u00E7("E\u011Fitime ba\u015Flad\u0131n."));
for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);$("#egitim-iptal",kap)?.addEventListener("click",()=>islem("training_cancel",{},\u00E7("E\u011Fitimden vazge\xE7tin."))),durdur=
geriSay(kap,()=>ciz().catch(()=>{})),clearTimeout(keyifZaman);const keyifBitis=keyif?.happy&&keyif.happy_until?Date.parse(keyif.happy_until)-Date.now()+1500:0;keyifBitis>0&&keyifBitis<2**31-1&&(keyifZaman=
setTimeout(()=>{kapandi||ciz().catch(()=>{})},keyifBitis))}let keyifZaman=null;async function islem(fn,args,mesaj){for(const b of $$("button",kap))b.disabled=!0;try{await Sunucu.yap(fn,args),tost(mesaj,
"graduation-cap")}catch(e){tost(hataMetni(e),"circle-alert")}await ciz()}await ciz();const b1=Durum.dinle("olay",({olay})=>{/^(training\.|clinic\.treated$|lesson\.completed|mood\.)/.test(olay)&&setTimeout(
()=>{kapandi||ciz().catch(()=>{})},400)}),sahaSaat=setInterval(async()=>{kapandi||document.hidden||!saha.el.isConnected||Date.now()-sahneAn<55e3||(await sahaYukle(),kapandi||sahaYaz())},15e3);return()=>{
kapandi=!0,durdur(),b1(),clearInterval(sahaSaat),clearTimeout(keyifZaman),saha.kapat()}}}),Parcalar.tamam("ek_24_egitim");
