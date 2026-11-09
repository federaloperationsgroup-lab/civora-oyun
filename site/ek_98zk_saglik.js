// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_98zk_saglik.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/saglik",{async ac(kap){let c=null,kapandi=!1,durdur=()=>{};const sahne=SaglikSahnesi.ac();sahne.dinle("sec",(ad,id)=>{if(ad==="kisi"){id&&profilAc(id,()=>tazele());return}const hedef=ad===
"doktor"&&id?`[data-saglik-nobet="${CSS.escape(id)}"]`:{ben:c?.my_visit?"#saglik-siram":"#saglik-yorgunluk",sira:"#saglik-doktorlar",oda:"#saglik-doktorluk",yorgunluk:"#saglik-yorgunluk",doktor:"#sagl\
ik-doktorlar"}[ad],el=hedef?$(hedef,kap):null;el&&(el.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"center"}),el.classList.remove("vurgu-yan"),el.offsetWidth,el.classList.add("vurgu-yan"))});
const ben=()=>Durum.v.ozet?.character??{};let gorunus,bekleyen=null;const yakinda=()=>{clearTimeout(bekleyen),bekleyen=setTimeout(()=>{kapandi||tazeleIste()},600)};let kirli=!1,ertelendi=!1;kap.addEventListener(
"input",e=>{e.target.closest("#saglik-nobet-form")&&(kirli=!0)});const tazeleIste=()=>{kirli?ertelendi=!0:arkaTazele()};async function yukle(){const[x,bak]=await Promise.all([Sunucu.cagir("clinic"),gorunus===
void 0?Sunucu.cagir("my_look").catch(()=>null):null]);c=x,gorunus===void 0&&(gorunus=bak?.look??null)}const R=()=>c?.rule?.clinic??meslekKurali().clinic??{};function yorgunlukHtml(){const f=c.fatigue??
{},gunluk=Number(R().patientDaily??3);return`<section class="kart" id="saglik-yorgunluk"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sava\u015F yorgunlu\u011Fu")}</p>
          <h2 class="b2">${\u00E7("{n} / {m}",{n:sayi(f.points??0),m:sayi(f.max??yorgunlukTavan())})}</h2></div><span class="ik-kutu">${ikon("heart-pulse")}</span></div>
        ${yorgunlukCubugu(f)}
        <p class="aciklama" style="margin-top:10px">${esc(yorgunlukDurumu(f))}</p>
        <p class="kucuk" style="margin-top:6px">${\u00E7("Cephede ve y\xF6netime el koyma giri\u015Fiminde her vuru\u015F {v} puan ekler; {dk} dakikada bir puan kendili\u011Finden azal\u0131r. Yorgunluk sava\u015Fta g\xFCc\xFCn\xFC, ener\
jini ya da sonucu de\u011Fi\u015Ftirmez.",{v:sayi(c.rule?.fatigue?.perHit??1),dk:sayi(c.rule?.fatigue?.recoverMinutesPerPoint??15)})}</p>
        <p class="kucuk" style="margin-top:4px">${\u00E7("Bug\xFCn {n} / {m} muayene.",{n:sayi(c.today??0),m:sayi(gunluk)})}</p></section>`}function siramHtml(){const v=c.my_visit;if(!v)return"";const basladi=Date.
parse(v.slot_starts_at)<=Date.now(),baskaSehir=v.region_id!==c.region_id;return`<section class="kart" id="saglik-siram"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("S\u0131radaki muayenen")}\
</p>
          <h2 class="b2">${esc(v.doctor??"")}</h2></div><span class="ik-kutu">${ikon("stethoscope")}</span></div>
        <div class="liste"><div class="liste-satir"><span class="liste-ikon yesil">${ikon("clock-3")}</span>
          <div><span class="tur">${basladi?\u00E7("Muayene s\xFCr\xFCyor"):\u00E7("Muayene saati")}</span><b>${esc(saatYaz(v.slot_starts_at))}</b>
            <div class="alt">${esc([basladi?\u00E7("biti\u015F {saat}",{saat:saatKisa(v.slot_ends_at)}):null,\u00E7("\xFCcret {kr} kredi (ayr\u0131ld\u0131; muayene olmazsa d\xF6ner)",{kr:kr(v.fee_cr??
0)}),baskaSehir?bolgeAdi(v.region_id):null].filter(Boolean).join(" \xB7 "))}</div></div>
          <span class="cip">${ikon("hourglass")}<b data-bitis="${esc(basladi?v.slot_ends_at:v.slot_starts_at)}"></b></span></div></div>
        ${baskaSehir?`<div class="bilgi-kutusu" style="margin-top:10px">${ikon("map-pin")}<span>${\u00E7("Muayenen {sehir} \u015Fehrinde; saatinde orada olmazsan \xFCcret d\xF6ner.",{sehir:esc(bolgeAdi(
v.region_id))})}</span></div>`:""}
        <p class="kucuk" style="margin-top:8px">${basladi?\u00E7("Saati ba\u015Flayan muayeneden vazge\xE7ilmez; bitince yorgunlu\u011Fun azal\u0131r."):\u00E7("Muayene saatinde bu \u015Fehirde olmal\u0131s\u0131n; \
de\u011Filsen \xFCcret sana d\xF6ner.")}</p>
        ${basladi?"":`<div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme ikincil kucuk-d" id="saglik-vazgec">${ikon("x")}${\u00E7("S\u0131radan \xE7\u0131k")}</button></div>`}</s\
ection>`}function girisEngeli(s){return s.mine?\u00E7("Kendi n\xF6betin"):c.on_road?\u00E7("Yoldas\u0131n"):c.my_visit?\u00E7("Zaten s\u0131radas\u0131n"):Number(c.fatigue?.points??0)<=0?\u00E7("Yorgu\
nlu\u011Fun yok"):Number(c.today??0)>=Number(R().patientDaily??3)?\u00E7("Bug\xFCnk\xFC muayene hakk\u0131n doldu"):s.blocked?\u00E7("Bu doktora s\u0131ra alamazs\u0131n"):!s.next_slot||Number(s.free_slots??
0)<=0?\u00E7("Yer yok"):null}function doktorlarHtml(){const l=c.shifts??[];return`<section class="kart" id="saglik-doktorlar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("N\xF6betteki doktorl\
ar")}</p>
          <h2 class="b2">${l.length?\u00E7("{n} doktor",{n:sayi(l.length)}):\u00E7("N\xF6bet\xE7i yok")}</h2></div><span class="ik-kutu">${ikon("stethoscope")}</span></div>
        ${l.length?`<div class="liste">${l.map(s=>{const engel=girisEngeli(s);return`<div class="liste-satir saglik-nobet" data-saglik-nobet="${esc(s.shift_id)}"><span class="liste-ikon">${avatarKutu(
s.doctor??"",s.doctor_id)}</span>
            <div><span class="tur">${esc([\u00E7("t\u0131p {n}",{n:sayi(s.skill??0)}),\u00E7("\u2212{e} yorgunluk",{e:sayi(s.relief??0)}),\u00E7("{kr} kredi",{kr:kr(s.fee_cr??0)})].join(" \xB7 "))}</s\
pan>
              <b><button class="baglanti" type="button" data-profil="${esc(s.doctor_id)}">${esc(s.doctor??"")}</button>${s.mine?` <span class="cip altin">${\u00E7("Sen")}</span>`:""}</b>
              <div class="alt">${esc([s.treating?\u00E7("\u015Fu an muayenede"):null,s.next_slot?\u00E7("s\u0131radaki bo\u015F saat {saat}",{saat:saatKisa(s.next_slot.starts_at)}):\u00E7("yer kalmad\u0131"),
\u00E7("{n} yer",{n:sayi(s.free_slots??0)}),\u00E7("s\u0131rada {n}",{n:sayi(s.queue??0)}),\u00E7("n\xF6betin biti\u015Fi {saat}",{saat:saatKisa(s.ends_at)})].filter(Boolean).join(" \xB7 "))}</div>
              ${engel&&!s.mine?`<div class="alt saglik-engel">${esc(engel)}</div>`:""}</div>
            ${s.mine?"<span></span>":`<button class="dugme kucuk-d" data-saglik-gir="${esc(s.shift_id)}" ${engel?"disabled":""}>${ikon("user-round-plus")}${\u00E7("S\u0131raya gir")}</button>`}</div>`}).
join("")}</div>`:`<p class="bos">${c.on_road?\u00E7("Yoldas\u0131n; vard\u0131\u011F\u0131n \u015Fehrin doktorlar\u0131 burada g\xF6r\xFCn\xFCr."):\u00E7("\u015Eu an bu \u015Fehirde n\xF6bette doktor yok. T\u0131p bece\
rin {n} olunca sen n\xF6bet tutabilirsin.",{n:sayi(R().minSkill??10)})}</p>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Muayene {dk} dakika s\xFCrer; saati gelince yorgunlu\u011Fun doktorun etkisi kadar azal\u0131r. \xDCcret s\u0131raya girerken ayr\u0131l\u0131r, muayeneden sonra doktora ge\xE7\
er (maa\u015F vergisi d\xFC\u015F\xFCl\xFCr).",{dk:sayi(R().treatMinutes??10)})}</p></section>`}function doktorlukHtml(){const x=c.my_shift,kur=R(),en=Number(kur.minSkill??10),tip=Number(c.medicine??0);
if(x){const visits=x.visits??[];return`<section class="kart" id="saglik-doktorluk"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Doktorluk")} \xB7 ${esc(bolgeAdi(x.region_id))}</p>
            <h2 class="b2">${\u00E7("N\xF6bettesin")}</h2></div><span class="ik-kutu">${ikon("stethoscope")}</span></div>
          <div class="satir" style="justify-content:space-between;flex-wrap:wrap;gap:8px"><span class="kucuk">${esc([\u00E7("{n} birim",{n:sayi(x.units)}),\u00E7("\xFCcret {kr} kredi",{kr:kr(x.fee_cr??
0)}),\u00E7("etki \u2212{e}",{e:sayi(x.relief??0)})].join(" \xB7 "))}</span>
            <span class="cip">${ikon("hourglass")}${\u00E7("biti\u015Fe")} <b data-bitis="${esc(x.ends_at)}"></b></span></div>
          <div class="cubuk" style="margin-top:8px"><i data-ilerleme="${esc(x.starts_at)}|${esc(x.ends_at)}" style="display:block;height:100%;background:var(--orman)"></i></div>
          <p class="kucuk" style="margin-top:8px">${\u00E7("{n} hasta muayene ettin; kazanc\u0131n {kr} kredi (vergiden sonra).",{n:sayi(x.treated??0),kr:kr(x.earned_cr??0)})}</p>
          ${visits.length?`<div class="liste" style="margin-top:10px">${visits.map(v=>{const simdi=Date.now(),bas=Date.parse(v.slot_starts_at),son=Date.parse(v.slot_ends_at),durum=v.status==="treated"?
\u00E7("muayene edildi: {a} \u2192 {b}",{a:sayi(v.fatigue_before??0),b:sayi(v.fatigue_after??0)}):bas<=simdi&&simdi<son?\u00E7("\u015Fu an muayenede"):\u00E7("bekliyor");return`<div class="liste-satir\
"><span class="liste-ikon ${v.status==="treated"?"yesil":""}">${avatarKutu(v.patient??"?",v.patient_id)}</span>
              <div><span class="tur">${esc(saatKisa(v.slot_starts_at))} \xB7 ${esc(durum)}</span><b>${v.patient_id?`<button class="baglanti" type="button" data-profil="${esc(v.patient_id)}">${esc(v.patient??
"")}</button>`:esc(v.patient??"")}</b></div><span></span></div>`}).join("")}</div>`:`<p class="bos" style="margin-top:10px">${\u00E7("Hen\xFCz s\u0131rana giren yok. Yorgun oyuncular n\xF6betteki doktorlar\u0131 bura\
da g\xF6r\xFCr.")}</p>`}
          <div class="oneri-dugmeler" style="margin-top:12px"><button class="dugme mercan kucuk-d" id="saglik-bitir">${ikon("square")}${\u00E7("N\xF6beti bitir")}</button></div>
          <p class="kucuk" style="margin-top:8px">${\u00E7("\u015Eehirden ayr\u0131l\u0131rsan n\xF6bet biter. Bitirince s\u0131radakilerin \xFCcreti d\xF6ner; saati dolmu\u015F muayene yap\u0131l\u0131r.")}\
</p></section>`}const sicil=c.record_until&&Date.parse(c.record_until)>Date.now(),engel=tip<en?`<div class="bilgi-kutusu">${ikon("graduation-cap")}<span>${\u00E7("T\u0131p becerin {n}; n\xF6bet tutmak i\xE7in en\
 az {m} gerekir. Hayat\u0131m \u2192 E\u011Fitim'den t\u0131p \xE7al\u0131\u015Fabilirsin.",{n:sayi(tip),m:sayi(en)})}</span></div>
          <div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="hayat/egitim">${ikon("graduation-cap")}${\u00E7("E\u011Fitim")}</button></div>`:sicil?`<di\
v class="hata-kutusu">${ikon("scale")}<span>${\u00E7("Sicil kayd\u0131n nedeniyle {zaman} tarihine kadar doktorluk yapamazs\u0131n.",{zaman:esc(saatYaz(c.record_until))})}</span></div>`:c.on_road?`<di\
v class="bilgi-kutusu">${ikon("route")}<span>${\u00E7("Yoldayken n\xF6bet tutulmaz; vard\u0131\u011F\u0131n \u015Fehrin sa\u011Fl\u0131k oca\u011F\u0131nda tutars\u0131n.")}</span></div>`:"",birim=Number(
kur.unitMinutes??30),muayene=Number(kur.treatMinutes??10),kalan=Math.max(0,Number(c.daily_work_cap??0)-Number(c.units_today??0)),enCok=Math.max(1,Math.min(Number(kur.maxUnits??4),kalan||1));return`<se\
ction class="kart" id="saglik-doktorluk"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Doktorluk")}</p>
          <h2 class="b2">${\u00E7("N\xF6bet tut")}</h2></div><span class="ik-kutu">${ikon("stethoscope")}</span></div>
        ${tip>=en?`<p class="aciklama">${\u00E7("T\u0131p becerin {n}. Muayenen yorgunlu\u011Fu {e} puan indirir ({b} + t\u0131p seviyen).",{n:sayi(tip),e:sayi(Math.min(yorgunlukTavan(),Number(kur.reliefBase??
40)+Number(kur.reliefPerLevel??1)*tip)),b:sayi(kur.reliefBase??40)})}</p>`:""}
        ${engel||`<form class="form" id="saglik-nobet-form" novalidate style="margin-top:10px">
          <label class="alan"><span>${\u00E7("S\xFCre")}</span><select name="birim">${Array.from({length:Number(kur.maxUnits??4)},(_,i)=>i+1).map(n=>`<option value="${n}" ${n===Math.min(2,enCok)?"sele\
cted":""} ${n>kalan?"disabled":""}>${esc(\u00E7("{n} birim \xB7 {dk} dakika \xB7 {h} hasta",{n,dk:n*birim,h:n*Math.floor(birim/muayene)}))}</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Muayene \xFCcreti (kredi, en \xE7ok {kr})",{kr:kr(kur.feeMaxCr??300)})}</span><input name="ucret" inputmode="decimal" required value="${esc(krediGirdi(kur.
feeDefaultCr??100))}"></label>
          <p class="kucuk">${\u00E7("Bug\xFCn {n} / {m} birim \xE7al\u0131\u015Ft\u0131n. N\xF6bet \xE7izelgende yer tutar ve g\xFCnl\xFCk \xE7al\u0131\u015Fma s\u0131n\u0131r\u0131na say\u0131l\u0131r.",
{n:sayi(c.units_today??0),m:sayi(c.daily_work_cap??0)})}</p>
          <div class="form-mesaj" id="saglik-nobet-mesaj"></div>
          <div class="oneri-dugmeler"><button class="dugme altin" type="submit" ${kalan<=0?"disabled":""}>${ikon("stethoscope")}${\u00E7("N\xF6bet a\xE7")}</button></div></form>`}</section>`}function gecmisHtml(){
const v=c.recent_visits??[],s=c.recent_shifts??[];return!v.length&&!s.length?"":`<section class="kart" id="saglik-gecmis"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ge\xE7mi\u015F")}</p>\
<h2 class="b2">${\u00E7("Son muayeneler ve n\xF6betler")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></div>
        <div class="liste">${v.map(x=>`<div class="liste-satir"><span class="liste-ikon ${x.status==="treated"?"yesil":""}">${ikon(x.status==="treated"?"heart-pulse":"undo-2")}</span>
            <div><span class="tur">${esc(zamanOnce(x.done_at??x.created_at))} \xB7 ${esc(bolgeAdi(x.region_id))}</span><b>${esc(x.doctor??\u00E7("Silinmi\u015F doktor"))}</b>
              <div class="alt">${esc(x.status==="treated"?\u00E7("yorgunluk {a} \u2192 {b} \xB7 {kr} kredi",{a:sayi(x.fatigue_before??0),b:sayi(x.fatigue_after??0),kr:kr(x.fee_cr??0)}):\u00E7("yap\u0131lma\
d\u0131: {neden}",{neden:MUAYENE_IPTAL[x.cancel_reason]??""}))}</div></div><span></span></div>`).join("")}
          ${s.map(x=>`<div class="liste-satir"><span class="liste-ikon altin">${ikon("stethoscope")}</span>
            <div><span class="tur">${esc(zamanOnce(x.ended_at??x.starts_at))} \xB7 ${esc(bolgeAdi(x.region_id))}</span><b>${esc(\u00E7("N\xF6betin: {n} hasta",{n:sayi(x.treated??0)}))}</b>
              <div class="alt">${esc([\u00E7("{n} birim",{n:sayi(x.units??0)}),\u00E7("{kr} kredi kazand\u0131n",{kr:kr(x.earned_cr??0)}),NOBET_SON[x.end_reason]??null].filter(Boolean).join(" \xB7 "))}\
</div></div><span></span></div>`).join("")}</div></section>`}function ciz(){durdur(),kirli=!1,ertelendi&&(ertelendi=!1,setTimeout(()=>arkaTazele()));const f=c.fatigue??{};kap.innerHTML=`<div class="sa\
yfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim \xB7 Sa\u011Fl\u0131k")}</p>
          <h1 class="b1">${c.region_id?\u00E7("Sa\u011Fl\u0131k oca\u011F\u0131 \xB7 {sehir}",{sehir:esc(bolgeAdi(c.region_id))}):\u00E7("Sa\u011Fl\u0131k oca\u011F\u0131")}</h1>
          <p class="aciklama">${\u00E7("Sava\u015Fta biriken yorgunlu\u011Fu doktorlar giderir. T\u0131p becerisi olan oyuncular n\xF6bet tutar; yorgunlar s\u0131raya girer.")}</p></div>
          <div class="oneri-dugmeler">${meydanaDonDugme("saglik")}
            <span class="cip ${f.tired?"mercan":""}" id="saglik-yorgunluk-cip">${ikon("heart-pulse")}${esc(\u00E7("Yorgunluk {n}",{n:sayi(f.points??0)}))}</span></div></div>
        ${c.on_road?`<div class="bilgi-kutusu" style="margin-bottom:14px">${ikon("route")}<span>${\u00E7("Yoldas\u0131n; vard\u0131\u011F\u0131n \u015Fehrin sa\u011Fl\u0131k oca\u011F\u0131 burada g\xF6r\xFCn\xFCr.")}\
</span></div>`:""}
        <div id="saglik-sahne-yer"></div>
        <div class="izgara iki">
          <div class="yigin">${yorgunlukHtml()}${siramHtml()}${doktorlarHtml()}</div>
          <div class="yigin">${doktorlukHtml()}${gecmisHtml()}</div>
        </div></div>`;const yer=$("#saglik-sahne-yer",kap),b=ben();yer&&(yer.replaceWith(sahne.el),sahne.yaz({c,ben:{id:b.id,ad:b.name,gorunus,ulke:b.citizenship??null}})),bagla(),durdur=geriSay(kap,()=>setTimeout(
()=>{kapandi||tazele()},1500))}async function isle(dugme,is){if(!dugme?.disabled){dugme&&(dugme.disabled=!0);try{await is()}catch(e){tost(hataMetni(e),"circle-alert")}finally{dugme?.isConnected&&(dugme.
disabled=!1)}}}function siraPenceresi(s){const f=c.fatigue??{},sonra=Math.max(0,Number(f.points??0)-Number(s.relief??0));pencere({ust:\u00E7("Sa\u011Fl\u0131k oca\u011F\u0131 \xB7 {sehir}",{sehir:bolgeAdi(
s.region_id)}),baslik:\u00E7("{ad} ile muayene",{ad:s.doctor??""}),govde:`<div class="liste"><div class="liste-satir"><span class="liste-ikon yesil">${ikon("clock-3")}</span><div><span class="tur">${\u00E7(
"Muayene saati")}</span><b>${esc(saatYaz(s.next_slot?.starts_at))}</b></div><span></span></div>
            <div class="liste-satir"><span class="liste-ikon">${ikon("heart-pulse")}</span><div><span class="tur">${\u00E7("Yorgunluk")}</span><b>${esc(\u00E7("{a} \u2192 {b}",{a:sayi(f.points??0),b:sayi(
sonra)}))}</b></div><span></span></div>
            <div class="liste-satir"><span class="liste-ikon altin">${ikon("coins")}</span><div><span class="tur">${\u00E7("\xDCcret")}</span><b>${esc(\u00E7("{kr} kredi",{kr:kr(s.fee_cr??0)}))}</b></\
div><span></span></div></div>
          <p class="kucuk" style="margin-top:10px">${\u00E7("\xDCcret \u015Fimdi ayr\u0131l\u0131r; muayene saatinde bu \u015Fehirde de\u011Filsen ya da yorgunlu\u011Fun kalmam\u0131\u015Fsa sana d\xF6ner. Saati ba\u015Flamadan s\u0131radan \xE7\u0131kabilirsin.")}\
</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("S\u0131raya gir"),sinif:"altin",ikon:"user-round-plus",is:()=>isle(null,async()=>{const v=await Sunucu.yap("clinic_visit_join",{p_shift:s.shift_id,
p_expected_fee:Number(s.fee_cr??0)});tost(\u00E7("S\u0131raya girdin: muayene saatin {saat}.",{saat:saatKisa(v.slot_starts_at)}),"stethoscope"),Durum.ozet().catch(()=>{}),await tazele()})}]})}function bagla(){
meydanaDonBagla(kap);for(const b of $$("[data-profil]",kap))b.onclick=()=>profilAc(b.dataset.profil,()=>tazele());for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$(
"[data-saglik-gir]",kap))b.onclick=()=>{const s=(c.shifts??[]).find(x=>x.shift_id===b.dataset.saglikGir);s&&siraPenceresi(s)};$("#saglik-vazgec",kap)?.addEventListener("click",e=>isle(e.currentTarget,
async()=>{await Sunucu.yap("clinic_visit_cancel",{}),tost(\u00E7("S\u0131radan \xE7\u0131kt\u0131n; \xFCcretin sana d\xF6nd\xFC."),"undo-2"),Durum.ozet().catch(()=>{}),await tazele()})),$("#saglik-bit\
ir",kap)?.addEventListener("click",()=>pencere({ust:\u00E7("Doktorluk"),baslik:\u00E7("N\xF6beti bitir"),govde:`<p class="aciklama">${\u00E7("S\u0131rada bekleyenlerin \xFCcreti d\xF6ner; saati dolmu\u015F muayene ya\
p\u0131l\u0131r. N\xF6betin \xE7izelgende \u015Fimdiye kadar say\u0131l\u0131r.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("N\xF6beti bitir"),sinif:"mercan",ikon:"square",is:()=>isle(null,async()=>{
const x=await Sunucu.yap("clinic_shift_end",{});tost(\u00E7("N\xF6betin bitti: {n} hasta muayene ettin, {kr} kredi kazand\u0131n.",{n:sayi(x.treated??0),kr:kr(x.earned_cr??0)}),"stethoscope"),Durum.ozet().
catch(()=>{}),await tazele()})}]}));const f=$("#saglik-nobet-form",kap);f?.addEventListener("submit",e=>{e.preventDefault();const d=$("button[type=submit]",f),mesaj=$("#saglik-nobet-mesaj",f),hata=m=>{
mesaj.innerHTML=`<div class="hata-kutusu" style="margin-top:8px">${ikon("circle-alert")}<span>${esc(m)}</span></div>`};mesaj.innerHTML="";const fd=new FormData(f),birim=Number(fd.get("birim")),ucret=krediAlt(
fd.get("ucret"));if(!Number.isFinite(ucret)||ucret<0||ucret>Number(R().feeMaxCr??300)){hata(\u00E7("\xDCcret 0 ile {kr} kredi aras\u0131nda olmal\u0131.",{kr:kr(R().feeMaxCr??300)}));return}isle(d,async()=>{
try{await Sunucu.yap("clinic_shift_open",{p_units:birim,p_fee:ucret})}catch(err){hata(hataMetni(err));return}kirli=!1,tost(\u00E7("N\xF6bet a\xE7t\u0131n: {n} birim, \xFCcret {kr} kredi.",{n:birim,kr:kr(
ucret)}),"stethoscope"),await tazele()})})}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()}),arkaTazele=tazeleyici(async()=>{if(await yukle(),!kapandi){if(kirli){ertelendi=!0;return}ciz()}});
await Promise.all([Durum.kurallar().catch(()=>null),Durum.ozet().catch(()=>null)]),await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^(clinic\.|travel\.arrived|war\.)/.test(olay)&&yakinda()}),
saat=setInterval(()=>{!document.hidden&&!document.querySelector(".perde")&&tazeleIste()},3e4);return()=>{kapandi=!0,durdur(),b1(),clearInterval(saat),clearTimeout(bekleyen),sahne.kapat()}}}),Parcalar.
tamam("ek_98zk_saglik");
