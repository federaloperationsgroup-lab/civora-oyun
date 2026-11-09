// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_98zm_dersler.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/dersler",{async ac(kap){let v=null,kapandi=!1,durdur=()=>{},odak=null;const sahne=SinifSahnesi.ac();sahne.dinle("sec",(ad,id)=>{if(ad==="kisi"){id&&profilAc(id,()=>tazele());return}
const el=(ad==="tahta"&&id?$(`[data-ders-satir="${CSS.escape(id)}"]`,kap):null)??$(ad==="ben"?"#dersler-ogrenci":"#dersler-sehir",kap);el&&(el.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"\
center"}),el.classList.remove("vurgu-yan"),el.offsetWidth,el.classList.add("vurgu-yan"))});const ben=()=>Durum.v.ozet?.character??{};let gorunus,bekleyen=null;const yakinda=()=>{clearTimeout(bekleyen),
bekleyen=setTimeout(()=>{kapandi||tazele()},600)};let kirli=!1,ertelendi=!1;kap.addEventListener("input",e=>{e.target.closest("#dersler-ac-form")&&(kirli=!0)});const tazeleIste=()=>{kirli?ertelendi=!0:
tazele()};async function yukle(){const[x,bak]=await Promise.all([Sunucu.cagir("lessons"),gorunus===void 0?Sunucu.cagir("my_look").catch(()=>null):null]);v=x,gorunus===void 0&&(gorunus=bak?.look??null)}
const R=()=>v?.rule??meslekKurali().lessons??{},beceriler=()=>(v?.skills_list??Object.keys(BECERI)).filter(b=>BECERI[b]);function sahneDersi(){const sehir=v.city??[],hepsi=[...sehir,...v.teaching??[],
...v.learning??[]],sec=odak?hepsi.find(l=>l.lesson_id===odak):null;if(sec)return sec;odak=null;const burada=l=>l.region_id===v.region_id;return(v.teaching??[]).find(l=>l.status==="running"&&burada(l))??
(v.learning??[]).find(l=>l.status==="running"&&burada(l))??[...v.teaching??[],...v.learning??[]].filter(burada).sort((a,b)=>Date.parse(a.starts_at)-Date.parse(b.starts_at))[0]??sehir[0]??null}function yazilmaEngeli(l){
if(l.mine)return \u00E7("Kendi dersin");if(l.status!=="scheduled")return \u00E7("Ders ba\u015Flad\u0131");if(v.on_road)return \u00E7("Yoldas\u0131n");if(l.my_seat?.status==="enrolled")return null;const sev=Number(
v.skills?.[l.skill]??0),en=Number(l.teacher_level??0)-Number(R().gapLevels??5);return sev>en?\u00E7("Seviyen y\xFCksek (en \xE7ok {n})",{n:sayi(Math.max(0,en))}):l.blocked?\u00E7("Bu derse yaz\u0131lamazs\u0131\
n"):Number(l.enrolled??0)>=Number(l.capacity??0)?\u00E7("Yer yok"):null}function dersSatir(l,{sahneDugme=!0}={}){const yazili=l.my_seat?.status==="enrolled",engel=yazilmaEngeli(l),suruyor=l.status==="\
running";return`<div class="liste-satir ders-satir" data-ders-satir="${esc(l.lesson_id)}"><span class="liste-ikon ${suruyor?"mercan":yazili?"yesil":""}">${ikon(BECERI[l.skill]?.ik??"presentation")}</s\
pan>
        <div><span class="tur">${esc(suruyor?\u00E7("\u015Eimdi \xB7 biti\u015F {saat}",{saat:saatKisa(l.ends_at)}):saatYaz(l.starts_at))}${l.region_id!==v.region_id?" \xB7 "+esc(bolgeAdi(l.region_id)):
""}</span>
          <b>${esc(\u00E7("{beceri} dersi",{beceri:beceriAdi(l.skill)}))}</b>
          <div class="alt">${l.mine?esc(\u00E7("senin dersin")):`<button class="baglanti" type="button" data-profil="${esc(l.teacher_id)}">${esc(l.teacher??"")}</button>`} \xB7 ${esc([\u00E7("seviye {\
n}",{n:sayi(l.teacher_level??0)}),\u00E7("{kr} kredi",{kr:kr(l.fee_cr??0)}),\u00E7("ders hakk\u0131 {n} dk",{n:sayi(l.credit_minutes??0)}),\u00E7("{n} / {m} yer",{n:sayi(l.enrolled??0),m:sayi(l.capacity??
0)})].join(" \xB7 "))}</div>
          ${engel&&!yazili&&!l.mine?`<div class="alt saglik-engel">${esc(engel)}</div>`:""}</div>
        <div class="mekan-satir-dugmeler">${sahneDugme?`<button class="dugme sade kucuk-d" data-ders-goster="${esc(l.lesson_id)}" title="${esc(\u00E7("S\u0131n\u0131f\u0131 g\xF6r"))}">${ikon("present\
ation")}${\u00E7("S\u0131n\u0131f")}</button>`:""}
          ${l.mine?"":yazili?l.status==="scheduled"?`<button class="dugme ikincil kucuk-d" data-ders-birak="${esc(l.lesson_id)}">${ikon("x")}${\u00E7("Kayd\u0131 b\u0131rak")}</button>`:`<span class="\
cip yesil">${\u00E7("Yaz\u0131ld\u0131n")}</span>`:`<button class="dugme kucuk-d" data-ders-yazil="${esc(l.lesson_id)}" ${engel?"disabled":""}>${ikon("user-round-plus")}${\u00E7("Yaz\u0131l")}</button\
>`}</div></div>`}function sehirHtml(){const l=(v.city??[]).filter(x=>!x.mine);return`<section class="kart" id="dersler-sehir"><div class="kart-bas"><div><p class="ust-yazi">${esc(v.region_id?bolgeAdi(
v.region_id):\u00E7("Yoldas\u0131n"))}</p>
          <h2 class="b2">${\u00E7("Bu \u015Fehirdeki dersler")}</h2></div><span class="ik-kutu">${ikon("presentation")}</span></div>
        ${l.length?`<div class="liste">${l.map(x=>dersSatir(x)).join("")}</div>`:`<p class="bos">${v.on_road?\u00E7("Yoldas\u0131n; vard\u0131\u011F\u0131n \u015Fehrin dersleri burada g\xF6r\xFCn\xFCr."):
\u00E7("\u015Eu an bu \u015Fehirde bekleyen ders yok. Becerin en az {n} ise sen ders verebilirsin.",{n:sayi(R().minSkill??20)})}</p>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Ders {dk} dakika s\xFCrer. O becerin \xF6\u011Fretmeninkinden en az {f} seviye a\u015Fa\u011F\u0131daysa yaz\u0131l\u0131rs\u0131n (g\xFCnde {g} ders). \xDCcret yaz\u0131l\u0131rken ayr\u0131l\u0131r; ders saa\
tinde \u015Fehirde de\u011Filsen d\xF6ner. Ders bitince ders hakk\u0131 kazan\u0131rs\u0131n.",{dk:sayi(R().unitMinutes??30),f:sayi(R().gapLevels??5),g:sayi(R().studentDaily??1)})}</p></section>`}function ogrenciHtml(){
const l=v.learning??[],h=v.credits??{},son=v.learned??[],haklar=Object.entries(h).filter(([,m])=>Number(m)>0);return`<section class="kart" id="dersler-ogrenci"><div class="kart-bas"><div><p class="ust\
-yazi">${\u00E7("\xD6\u011Frencilik")}</p>
          <h2 class="b2">${l.length?\u00E7("{n} derse yaz\u0131ld\u0131n",{n:sayi(l.length)}):\u00E7("Ders haklar\u0131n")}</h2></div><span class="ik-kutu">${ikon("graduation-cap")}</span></div>
        ${l.length?`<div class="liste">${l.map(x=>dersSatir(x)).join("")}</div>`:""}
        ${haklar.length?`<div class="liste" style="margin-top:${l.length?10:0}px">${haklar.map(([b,m])=>`<div class="liste-satir"><span class="liste-ikon yesil">${ikon(BECERI[b]?.ik??"graduation-cap")}\
</span>
            <div><span class="tur">${\u00E7("Ders hakk\u0131")}</span><b>${esc(\u00E7("{beceri}: {n} dakika",{beceri:beceriAdi(b),n:sayi(m)}))}</b><div class="alt">${esc(\u00E7("sonraki {beceri} e\u011Fiti\
minden d\xFC\u015F\xFCl\xFCr",{beceri:beceriAdi(b)}))}</div></div>
            <button class="dugme sade kucuk-d" data-git="hayat/egitim">${ikon("graduation-cap")}${\u00E7("E\u011Fitim")}</button></div>`).join("")}</div>`:`<p class="bos">${\u00E7("Ders hakk\u0131n yok. Bi\
r derse girince ders hakk\u0131 kazan\u0131rs\u0131n: o becerideki s\xFCren e\u011Fitimin hemen k\u0131sal\u0131r, artan\u0131 {g} g\xFCn i\xE7inde sonraki e\u011Fitimden d\xFC\u015F\xFCl\xFCr.",{g:sayi(
R().creditDays??7)})}</p>`}
        ${son.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Son derslerin")}</p><div class="liste">${son.map(x=>`<div class="liste-satir"><span class="liste-ikon">${ikon(BECERI[x.skill]?.
ik??"presentation")}</span>
            <div><span class="tur">${esc(zamanOnce(x.ends_at))} \xB7 ${esc(x.teacher??"")}</span><b>${esc(\u00E7("{beceri} dersi",{beceri:beceriAdi(x.skill)}))}</b>
              <div class="alt">${esc(x.my_seat?.status==="attended"?\u00E7("kat\u0131ld\u0131n: {n} dakika ders hakk\u0131",{n:sayi(x.my_seat?.credit_minutes??0)}):\u00E7("kat\u0131lmad\u0131n: {neden}",
{neden:DERS_IPTAL[x.my_seat?.cancel_reason??x.cancel_reason]??""}))}</div></div><span></span></div>`).join("")}</div>`:""}</section>`}function ogretmenHtml(){const kur=R(),en=Number(kur.minSkill??20),
uygun=beceriler().filter(b=>Number(v.skills?.[b]??0)>=en),bekleyen2=(v.teaching??[]).filter(l=>l.status==="scheduled").length,sicil=v.record_until&&Date.parse(v.record_until)>Date.now(),kalan=Math.max(
0,Number(v.daily_work_cap??0)-Number(v.units_today??0)),engel=uygun.length?sicil?`<div class="hata-kutusu">${ikon("scale")}<span>${\u00E7("Sicil kayd\u0131n nedeniyle {zaman} tarihine kadar ders veremezsin\
.",{zaman:esc(saatYaz(v.record_until))})}</span></div>`:v.on_road?`<div class="bilgi-kutusu">${ikon("route")}<span>${\u00E7("Yoldayken ders a\xE7\u0131lmaz; vard\u0131\u011F\u0131n \u015Fehirde a\xE7ars\u0131n.")}\
</span></div>`:bekleyen2>=Number(kur.upcomingMax??3)?`<div class="bilgi-kutusu">${ikon("calendar")}<span>${\u00E7("Ayn\u0131 anda en \xE7ok {n} bekleyen dersin olabilir.",{n:sayi(kur.upcomingMax??3)})}\
</span></div>`:kalan<=0?`<div class="bilgi-kutusu">${ikon("hourglass")}<span>${\u00E7("Bug\xFCnk\xFC \xE7al\u0131\u015Fma s\u0131n\u0131r\u0131n doldu.")}</span></div>`:"":`<div class="bilgi-kutusu">${ikon(
"graduation-cap")}<span>${\u00E7("Ders vermek i\xE7in bir becerin en az {n} olmal\u0131. Hayat\u0131m \u2192 E\u011Fitim'den \xE7al\u0131\u015Fabilirsin.",{n:sayi(en)})}</span></div>`,simdi=Date.now(),
yerel=t=>{const z=new Date(t);return z.setMinutes(z.getMinutes()-z.getTimezoneOffset()),z.toISOString().slice(0,16)},enErken=simdi+(Number(kur.leadMinutes??10)+1)*6e4,enGec=simdi+Number(kur.horizonHours??
72)*36e5,oneri=Math.ceil((simdi+60*6e4)/(15*6e4))*15*6e4,ogretim=(v.teaching??[]).map(l=>{const ogr=l.students??[];return`<div class="liste-satir ders-satir" data-ders-satir="${esc(l.lesson_id)}"><spa\
n class="liste-ikon ${l.status==="running"?"mercan":"altin"}">${ikon(BECERI[l.skill]?.ik??"presentation")}</span>
          <div><span class="tur">${esc(l.status==="running"?\u00E7("\u015Eimdi \xB7 biti\u015F {saat}",{saat:saatKisa(l.ends_at)}):saatYaz(l.starts_at))}${l.region_id!==v.region_id?" \xB7 "+esc(bolgeAdi(
l.region_id)):""}</span>
            <b>${esc(\u00E7("{beceri} dersin",{beceri:beceriAdi(l.skill)}))}</b>
            <div class="alt">${esc([\u00E7("{n} / {m} \xF6\u011Frenci",{n:sayi(l.enrolled??0),m:sayi(l.capacity??0)}),\u00E7("{kr} kredi",{kr:kr(l.fee_cr??0)}),\u00E7("ders hakk\u0131 {n} dk",{n:sayi(
l.credit_minutes??0)})].join(" \xB7 "))}</div>
            ${ogr.length?`<div class="alt">${ogr.map(s=>`<button class="baglanti" type="button" data-profil="${esc(s.character_id)}">${esc(s.name??"")}</button>`).join(", ")}</div>`:""}</div>
          <div class="mekan-satir-dugmeler"><button class="dugme sade kucuk-d" data-ders-goster="${esc(l.lesson_id)}">${ikon("presentation")}${\u00E7("S\u0131n\u0131f")}</button>
            ${l.status==="scheduled"?`<button class="dugme ikincil kucuk-d" data-ders-iptal="${esc(l.lesson_id)}">${ikon("x")}${\u00E7("\u0130ptal et")}</button>`:""}</div></div>`}).join(""),gecmis=(v.
taught??[]).map(l=>`<div class="liste-satir"><span class="liste-ikon">${ikon(BECERI[l.skill]?.ik??"presentation")}</span>
          <div><span class="tur">${esc(zamanOnce(l.ends_at))} \xB7 ${esc(bolgeAdi(l.region_id))}</span><b>${esc(\u00E7("{beceri} dersin",{beceri:beceriAdi(l.skill)}))}</b>
            <div class="alt">${esc(l.status==="completed"?\u00E7("{n} \xF6\u011Frenci kat\u0131ld\u0131 \xB7 {kr} kredi kazand\u0131n",{n:sayi(l.attended??0),kr:kr(l.earned_cr??0)}):\u00E7("d\xFC\u015Ft\xFC: {ne\
den}",{neden:DERS_IPTAL[l.cancel_reason]??""}))}</div></div><span></span></div>`).join("");return`<section class="kart" id="dersler-ogretmen"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xD6\
\u011Fretmenlik")}</p>
          <h2 class="b2">${\u00E7("Ders ver")}</h2></div><span class="ik-kutu">${ikon("presentation")}</span></div>
        ${ogretim?`<div class="liste" style="margin-bottom:12px">${ogretim}</div>`:""}
        ${engel||`<form class="form" id="dersler-ac-form" novalidate>
          <label class="alan"><span>${\u00E7("Beceri")}</span><select name="beceri">${uygun.map(b=>`<option value="${esc(b)}">${esc(\u00E7("{beceri} (seviyen {n}; ders hakk\u0131 {m} dk)",{beceri:beceriAdi(
b),n:sayi(v.skills?.[b]??0),m:sayi(Math.min(Number(kur.creditMax??90),Number(kur.creditBase??30)+Number(v.skills?.[b]??0)))}))}</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Ba\u015Flang\u0131\xE7")}</span><input name="zaman" type="datetime-local" required min="${yerel(enErken)}" max="${yerel(enGec)}" value="${yerel(oneri)}"><\
/label>
          <div class="satir" style="gap:10px;flex-wrap:wrap">
            <label class="alan" style="flex:1;min-width:140px"><span>${\u00E7("\xD6\u011Frenci ba\u015F\u0131na \xFCcret (kredi, en \xE7ok {kr})",{kr:kr(kur.feeMaxCr??300)})}</span><input name="ucret"\
 inputmode="decimal" required value="${esc(krediGirdi(kur.feeDefaultCr??100))}"></label>
            <label class="alan" style="flex:1;min-width:120px"><span>${\u00E7("Kontenjan")}</span><select name="kontenjan">${Array.from({length:Number(kur.maxStudents??8)},(_,i)=>i+1).map(n=>`<option \
value="${n}" ${n===Math.min(4,Number(kur.maxStudents??8))?"selected":""}>${esc(\u00E7("{n} \xF6\u011Frenci",{n}))}</option>`).join("")}</select></label></div>
          <p class="kucuk">${\u00E7("Ders {dk} dakika, bir \xE7al\u0131\u015Fma birimi; en erken {e} dakika, en ge\xE7 {s} saat sonra. Ders saatinde bu \u015Fehirde olmal\u0131s\u0131n; kimse yaz\u0131lmazsa ders d\xFC\u015Fer. \xDCcret ders bitin\
ce maa\u015F vergisiyle sana ge\xE7er.",{dk:sayi(kur.unitMinutes??30),e:sayi(kur.leadMinutes??10),s:sayi(kur.horizonHours??72)})}</p>
          <div class="form-mesaj" id="dersler-ac-mesaj"></div>
          <div class="oneri-dugmeler"><button class="dugme altin" type="submit">${ikon("presentation")}${\u00E7("Ders a\xE7")}</button></div></form>`}
        ${gecmis?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Son verdi\u011Fin dersler")}</p><div class="liste">${gecmis}</div>`:""}</section>`}function ciz(){durdur(),kirli=!1,ertelendi&&(ertelendi=
!1,setTimeout(()=>tazele())),kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m \xB7 Dersler")}</p><h1 class="b1">${\u00E7("Dersler")}</h1>
          <p class="aciklama">${\u00E7("Becerisi y\xFCksek oyuncular bulunduklar\u0131 \u015Fehirde ders verir. Derse giren ders hakk\u0131 kazan\u0131r; o becerideki e\u011Fitimi k\u0131sal\u0131r.")}\
</p></div>
          <div class="oneri-dugmeler">${meydanaDonDugme("egitim")}<button class="dugme ikincil kucuk-d" data-git="hayat/egitim">${ikon("graduation-cap")}${\u00E7("E\u011Fitim")}</button></div></div>
        ${v.on_road?`<div class="bilgi-kutusu" style="margin-bottom:14px">${ikon("route")}<span>${\u00E7("Yoldas\u0131n; vard\u0131\u011F\u0131n \u015Fehrin dersleri burada g\xF6r\xFCn\xFCr.")}</span>\
</div>`:""}
        <div id="dersler-sahne-yer"></div>
        <div class="izgara iki">
          <div class="yigin">${sehirHtml()}${ogrenciHtml()}</div>
          <div class="yigin">${ogretmenHtml()}</div>
        </div></div>`;const yer=$("#dersler-sahne-yer",kap),b=ben();yer&&(yer.replaceWith(sahne.el),sahne.yaz({l:sahneDersi(),ben:{id:b.id,ad:b.name,gorunus,ulke:b.citizenship??null},bolge:v.region_id})),
bagla(),durdur=geriSay(kap,()=>setTimeout(()=>{kapandi||tazele()},1500))}async function isle(dugme,is){if(!dugme?.disabled){dugme&&(dugme.disabled=!0);try{await is()}catch(e){tost(hataMetni(e),"circle\
-alert")}finally{dugme?.isConnected&&(dugme.disabled=!1)}}}const bul=id=>[...v.city??[],...v.learning??[],...v.teaching??[]].find(l=>l.lesson_id===id);function yazilPenceresi(l){const sev=Number(v.skills?.[l.
skill]??0);pencere({ust:\u00E7("Ders \xB7 {sehir}",{sehir:bolgeAdi(l.region_id)}),baslik:\u00E7("{beceri} dersi: {ad}",{beceri:beceriAdi(l.skill),ad:l.teacher??""}),govde:`<div class="liste"><div clas\
s="liste-satir"><span class="liste-ikon yesil">${ikon("clock-3")}</span><div><span class="tur">${\u00E7("Ba\u015Flang\u0131\xE7")}</span><b>${esc(saatYaz(l.starts_at))}</b></div><span></span></div>
            <div class="liste-satir"><span class="liste-ikon">${ikon("graduation-cap")}</span><div><span class="tur">${\u00E7("Ders hakk\u0131")}</span><b>${esc(\u00E7("{n} dakika ({beceri} {s} \u2192 \xF6\u011Fre\
tmen {t})",{n:sayi(l.credit_minutes??0),beceri:beceriAdi(l.skill),s:sayi(sev),t:sayi(l.teacher_level??0)}))}</b></div><span></span></div>
            <div class="liste-satir"><span class="liste-ikon altin">${ikon("coins")}</span><div><span class="tur">${\u00E7("\xDCcret")}</span><b>${esc(\u00E7("{kr} kredi",{kr:kr(l.fee_cr??0)}))}</b></\
div><span></span></div></div>
          <p class="kucuk" style="margin-top:10px">${\u00E7("\xDCcret \u015Fimdi ayr\u0131l\u0131r; ders saatinde bu \u015Fehirde de\u011Filsen ya da ders d\xFC\u015Ferse sana d\xF6ner. Ders ba\u015Flayana dek kayd\u0131 b\u0131rakabilirsin. Dersin yar\u0131m\
 saati \xE7izelgende yer tutar.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Yaz\u0131l"),sinif:"altin",ikon:"user-round-plus",is:()=>isle(null,async()=>{await Sunucu.yap("lesson_enroll",{p_lesson:l.
lesson_id,p_expected_fee:Number(l.fee_cr??0)}),tost(\u00E7("{beceri} dersine yaz\u0131ld\u0131n: {saat}.",{beceri:beceriAdi(l.skill),saat:saatYaz(l.starts_at)}),"presentation"),odak=l.lesson_id,Durum.
ozet().catch(()=>{}),await tazele()})}]})}function bagla(){meydanaDonBagla(kap);for(const b of $$("[data-profil]",kap))b.onclick=()=>profilAc(b.dataset.profil,()=>tazele());for(const b of $$("[data-gi\
t]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-ders-goster]",kap))b.onclick=()=>{odak=b.dataset.dersGoster;const l=bul(odak),k=ben();sahne.yaz({l,ben:{id:k.id,ad:k.name,gorunus,
ulke:k.citizenship??null},bolge:v.region_id}),sahne.el.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})};for(const b of $$("[data-ders-yazil]",kap))b.onclick=()=>{const l=bul(b.dataset.
dersYazil);l&&yazilPenceresi(l)};for(const b of $$("[data-ders-birak]",kap))b.onclick=()=>isle(b,async()=>{await Sunucu.yap("lesson_withdraw",{p_lesson:b.dataset.dersBirak}),tost(\u00E7("Kayd\u0131 b\u0131rakt\u0131\
n; \xFCcretin sana d\xF6nd\xFC."),"undo-2"),Durum.ozet().catch(()=>{}),await tazele()});for(const b of $$("[data-ders-iptal]",kap))b.onclick=()=>{const l=bul(b.dataset.dersIptal);pencere({ust:\u00E7("\
\xD6\u011Fretmenlik"),baslik:\u00E7("{beceri} dersin iptal edilsin mi?",{beceri:beceriAdi(l?.skill)}),govde:`<p class="aciklama">${\u00E7("Yaz\u0131lan \xF6\u011Frencilerin \xFCcreti d\xF6ner ve onlara haber gider.")}\
</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\u0130ptal et"),sinif:"mercan",ikon:"x",is:()=>isle(null,async()=>{await Sunucu.yap("lesson_cancel",{p_lesson:b.dataset.dersIptal}),tost(\u00E7("De\
rsi iptal ettin; \xF6\u011Frencilerin \xFCcreti d\xF6nd\xFC."),"undo-2"),await tazele()})}]})};const f=$("#dersler-ac-form",kap);f?.addEventListener("submit",e=>{e.preventDefault();const d=$("button[t\
ype=submit]",f),mesaj=$("#dersler-ac-mesaj",f),hata=m=>{mesaj.innerHTML=`<div class="hata-kutusu" style="margin-top:8px">${ikon("circle-alert")}<span>${esc(m)}</span></div>`};mesaj.innerHTML="";const fd=new FormData(
f),kur=R(),zaman=new Date(String(fd.get("zaman")??"")),ucret=krediAlt(fd.get("ucret")),dk=(zaman.getTime()-Date.now())/6e4;if(!Number.isFinite(zaman.getTime())||dk<Number(kur.leadMinutes??10)||dk>Number(
kur.horizonHours??72)*60){hata(\u00E7("Ba\u015Flang\u0131\xE7 en erken {e} dakika, en ge\xE7 {s} saat sonra olmal\u0131.",{e:sayi(kur.leadMinutes??10),s:sayi(kur.horizonHours??72)}));return}if(!Number.
isFinite(ucret)||ucret<0||ucret>Number(kur.feeMaxCr??300)){hata(\u00E7("\xDCcret 0 ile {kr} kredi aras\u0131nda olmal\u0131.",{kr:kr(kur.feeMaxCr??300)}));return}isle(d,async()=>{let l;try{l=await Sunucu.
yap("lesson_open",{p_skill:String(fd.get("beceri")),p_starts_at:zaman.toISOString(),p_fee:ucret,p_capacity:Number(fd.get("kontenjan"))})}catch(err){hata(hataMetni(err));return}kirli=!1,odak=l?.lesson_id??
null,tost(\u00E7("Ders a\xE7t\u0131n: {beceri}, {saat}.",{beceri:beceriAdi(l?.skill??fd.get("beceri")),saat:saatYaz(l?.starts_at??zaman.toISOString())}),"presentation"),await tazele()})})}const tazele=tazeleyici(
async()=>{await yukle(),kapandi||ciz()});await Promise.all([Durum.kurallar().catch(()=>null),Durum.ozet().catch(()=>null)]),await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^(lesson\.|travel\.arrived|training\.)/.
test(olay)&&yakinda()}),saat=setInterval(()=>{!document.hidden&&!document.querySelector(".perde")&&tazeleIste()},3e4);return()=>{kapandi=!0,durdur(),b1(),clearInterval(saat),clearTimeout(bekleyen),sahne.
kapat()}}}),Parcalar.tamam("ek_98zm_dersler");
