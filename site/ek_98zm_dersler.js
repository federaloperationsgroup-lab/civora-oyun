// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98zm_dersler.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/dersler",{async ac(kap){let v=null,kapandi=!1,durdur=()=>{},odak=null;const sahne=SinifSahnesi.ac();sahne.dinle("sec",(ad,id)=>{if(ad==="kisi"){id&&profilAc(id,()=>tazele());return}
const el=(ad==="tahta"&&id?$(`[data-ders-satir="${CSS.escape(id)}"]`,kap):null)??$(ad==="ben"?"#dersler-ogrenci":"#dersler-sehir",kap);el&&(el.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"\
center"}),el.classList.remove("vurgu-yan"),el.offsetWidth,el.classList.add("vurgu-yan"))});const ben=()=>Durum.v.ozet?.character??{};let gorunus,bekleyen=null;const yakinda=()=>{clearTimeout(bekleyen),
bekleyen=setTimeout(()=>{kapandi||tazele()},600)};let kirli=!1,ertelendi=!1;kap.addEventListener("input",e=>{e.target.closest("#dersler-ac-form")&&(kirli=!0)});const tazeleIste=()=>{kirli?ertelendi=!0:
tazele()};async function yukle(){const[x,bak]=await Promise.all([Sunucu.cagir("lessons"),gorunus===void 0?Sunucu.cagir("my_look").catch(()=>null):null]);v=x,gorunus===void 0&&(gorunus=bak?.look??null)}
const R=()=>v?.rule??meslekKurali().lessons??{},beceriler=()=>(v?.skills_list??Object.keys(BECERI)).filter(b=>BECERI[b]);function sahneDersi(){const sehir=v.city??[],hepsi=[...sehir,...v.teaching??[],
...v.learning??[]],sec=odak?hepsi.find(l=>l.lesson_id===odak):null;if(sec)return sec;odak=null;const burada=l=>l.region_id===v.region_id;return(v.teaching??[]).find(l=>l.status==="running"&&burada(l))??
(v.learning??[]).find(l=>l.status==="running"&&burada(l))??[...v.teaching??[],...v.learning??[]].filter(burada).sort((a,b)=>Date.parse(a.starts_at)-Date.parse(b.starts_at))[0]??sehir[0]??null}const dilim=kod=>(v?.
languages??[]).find(x=>x.lang===kod)??null,DR=()=>R().language??null,dilDersi=l=>l?.skill==="language";function yazilmaEngeli(l){if(l.mine)return \u00E7("Kendi dersin");if(l.status!=="scheduled")return \u00E7(
"Ders ba\u015Flad\u0131");if(v.on_road)return \u00E7("Yoldas\u0131n");if(l.my_seat?.status==="enrolled")return null;if(dilDersi(l)&&dilim(l.lang)?.native)return \u00E7("Ana dilin");const sev=dilDersi(
l)?Number(dilim(l.lang)?.level??0):Number(v.skills?.[l.skill]??0),en=Number(l.teacher_level??0)-Number(dilDersi(l)?DR()?.gap??20:R().gapLevels??5);return sev>en?\u00E7("Seviyen y\xFCksek (en \xE7ok {n})",
{n:sayi(Math.max(0,en))}):l.blocked?\u00E7("Bu derse yaz\u0131lamazs\u0131n"):Number(l.enrolled??0)>=Number(l.capacity??0)?\u00E7("Yer yok"):null}const kazancYazi=l=>dilDersi(l)?\u00E7("dil seviyesi +\
{n}",{n:sayi(dilDersKazanci(dilim(l.lang)?.level??0,DR()))}):\u00E7("ders hakk\u0131 {n} dk",{n:sayi(l.credit_minutes??0)});function dersSatir(l,{sahneDugme=!0}={}){const yazili=l.my_seat?.status==="e\
nrolled",engel=yazilmaEngeli(l),suruyor=l.status==="running";return`<div class="liste-satir ders-satir" data-ders-satir="${esc(l.lesson_id)}" data-ders-konu="${esc(l.skill)}${l.lang?":"+esc(l.lang):""}\
"><span class="liste-ikon ${suruyor?"mercan":yazili?"yesil":""}">${ikon(dersIkon(l.skill))}</span>
        <div><span class="tur">${esc(suruyor?\u00E7("\u015Eimdi \xB7 biti\u015F {saat}",{saat:saatKisa(l.ends_at)}):saatYaz(l.starts_at))}${l.region_id!==v.region_id?" \xB7 "+esc(bolgeAdi(l.region_id)):
""}</span>
          <b>${esc(\u00E7("{beceri} dersi",{beceri:dersKonuAdi(l.skill,l.lang)}))}</b>
          <div class="alt">${l.mine?esc(\u00E7("senin dersin")):`<button class="baglanti" type="button" data-profil="${esc(l.teacher_id)}">${esc(l.teacher??"")}</button>`} \xB7 ${esc([\u00E7("seviye {\
n}",{n:sayi(l.teacher_level??0)}),\u00E7("{kr} kredi",{kr:kr(l.fee_cr??0)}),kazancYazi(l),\u00E7("{n} / {m} yer",{n:sayi(l.enrolled??0),m:sayi(l.capacity??0)})].join(" \xB7 "))}</div>
          ${engel&&!yazili&&!l.mine?`<div class="alt saglik-engel">${esc(engel)}</div>`:""}</div>
        <div class="mekan-satir-dugmeler">${l.stream?`<button class="dugme sade kucuk-d" data-ders-yayin="${esc(l.stream.stream_id)}" title="${esc(\u00E7("Kanal'da canl\u0131 yay\u0131nda"))}">${ikon(
"radio")}${\u00E7("Kanal'da izle")}</button>`:""}
          ${sahneDugme?`<button class="dugme sade kucuk-d" data-ders-goster="${esc(l.lesson_id)}" title="${esc(\u00E7("S\u0131n\u0131f\u0131 g\xF6r"))}">${ikon("presentation")}${\u00E7("S\u0131n\u0131f")}\
</button>`:""}
          ${l.mine?"":yazili?l.status==="scheduled"?`<button class="dugme ikincil kucuk-d" data-ders-birak="${esc(l.lesson_id)}">${ikon("x")}${\u00E7("Kayd\u0131 b\u0131rak")}</button>`:`<span class="\
cip yesil">${\u00E7("Yaz\u0131ld\u0131n")}</span>`:`<button class="dugme kucuk-d" data-ders-yazil="${esc(l.lesson_id)}" ${engel?"disabled":""}>${ikon("user-round-plus")}${\u00E7("Yaz\u0131l")}</button\
>`}</div></div>`}function sehirHtml(){const l=(v.city??[]).filter(x=>!x.mine);return`<section class="kart" id="dersler-sehir"><div class="kart-bas"><div><p class="ust-yazi">${esc(v.region_id?bolgeAdi(
v.region_id):\u00E7("Yoldas\u0131n"))}</p>
          <h2 class="b2">${\u00E7("Bu \u015Fehirdeki dersler")}</h2></div><span class="ik-kutu">${ikon("presentation")}</span></div>
        ${l.length?`<div class="liste">${l.map(x=>dersSatir(x)).join("")}</div>`:`<p class="bos">${v.on_road?\u00E7("Yoldas\u0131n; vard\u0131\u011F\u0131n \u015Fehrin dersleri burada g\xF6r\xFCn\xFCr."):
\u00E7("\u015Eu an bu \u015Fehirde bekleyen ders yok. Becerin en az {n} ise sen ders verebilirsin.",{n:sayi(R().minSkill??20)})}</p>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Ders {dk} dakika s\xFCrer. O becerin \xF6\u011Fretmeninkinden en az {f} seviye a\u015Fa\u011F\u0131daysa yaz\u0131l\u0131rs\u0131n (g\xFCnde {g} ders). \xDCcret yaz\u0131l\u0131rken ayr\u0131l\u0131r; ders saa\
tinde \u015Fehirde de\u011Filsen d\xF6ner. Ders bitince ders hakk\u0131 kazan\u0131rs\u0131n.",{dk:sayi(R().unitMinutes??30),f:sayi(R().gapLevels??5),g:sayi(R().studentDaily??1)})}</p>
        ${DR()?`<p class="kucuk" id="dersler-dil-not">${ikon("languages")} ${esc(\u00E7("Dil dersinde o dildeki seviyen \xF6\u011Fretmeninkinden en az {f} a\u015Fa\u011F\u0131daysa yaz\u0131l\u0131rs\u0131n; ana dilinin dersine yaz\u0131lmazs\u0131\
n. Ders bitince o dildeki seviyen hobi seans\u0131n\u0131n {k} kat\u0131 artar; g\xFCnl\xFCk hobi hakk\u0131ndan d\xFC\u015Fmez.",{f:sayi(DR().gap??20),k:sayi(DR().gainFactor??2)}))}</p>`:""}</section\
>`}function ogrenciHtml(){const l=v.learning??[],h=v.credits??{},son=v.learned??[],haklar=Object.entries(h).filter(([,m])=>Number(m)>0);return`<section class="kart" id="dersler-ogrenci"><div class="ka\
rt-bas"><div><p class="ust-yazi">${\u00E7("\xD6\u011Frencilik")}</p>
          <h2 class="b2">${l.length?\u00E7("{n} derse yaz\u0131ld\u0131n",{n:sayi(l.length)}):\u00E7("Ders haklar\u0131n")}</h2></div><span class="ik-kutu">${ikon("graduation-cap")}</span></div>
        ${l.length?`<div class="liste">${l.map(x=>dersSatir(x)).join("")}</div>`:""}
        ${haklar.length?`<div class="liste" style="margin-top:${l.length?10:0}px">${haklar.map(([b,m])=>`<div class="liste-satir"><span class="liste-ikon yesil">${ikon(BECERI[b]?.ik??"graduation-cap")}\
</span>
            <div><span class="tur">${\u00E7("Ders hakk\u0131")}</span><b>${esc(\u00E7("{beceri}: {n} dakika",{beceri:beceriAdi(b),n:sayi(m)}))}</b><div class="alt">${esc(\u00E7("sonraki {beceri} e\u011Fiti\
minden d\xFC\u015F\xFCl\xFCr",{beceri:beceriAdi(b)}))}</div></div>
            <button class="dugme sade kucuk-d" data-git="hayat/egitim">${ikon("graduation-cap")}${\u00E7("E\u011Fitim")}</button></div>`).join("")}</div>`:`<p class="bos">${\u00E7("Ders hakk\u0131n yok. Bi\
r derse girince ders hakk\u0131 kazan\u0131rs\u0131n: o becerideki s\xFCren e\u011Fitimin hemen k\u0131sal\u0131r, artan\u0131 {g} g\xFCn i\xE7inde sonraki e\u011Fitimden d\xFC\u015F\xFCl\xFCr.",{g:sayi(
R().creditDays??7)})}</p>`}
        ${son.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Son derslerin")}</p><div class="liste">${son.map(x=>`<div class="liste-satir" data-ders-gecmis="${esc(x.lesson_id)}"><span c\
lass="liste-ikon">${ikon(dersIkon(x.skill))}</span>
            <div><span class="tur">${esc(zamanOnce(x.ends_at))} \xB7 ${esc(x.teacher??"")}</span><b>${esc(\u00E7("{beceri} dersi",{beceri:dersKonuAdi(x.skill,x.lang)}))}</b>
              <div class="alt">${esc(x.my_seat?.status!=="attended"?\u00E7("kat\u0131lmad\u0131n: {neden}",{neden:DERS_IPTAL[x.my_seat?.cancel_reason??x.cancel_reason]??""}):dilDersi(x)?\u00E7("kat\u0131ld\
\u0131n: {dil} +{n}, seviye {s}",{dil:dilAdi(x.lang),n:sayi(x.my_seat?.lang_gain??0),s:sayi(x.my_seat?.lang_level??0)}):\u00E7("kat\u0131ld\u0131n: {n} dakika ders hakk\u0131",{n:sayi(x.my_seat?.credit_minutes??
0)}))}</div></div><span></span></div>`).join("")}</div>`:""}</section>`}function odevHtml(){const l=v.homework??[],k=v.homework_rule;if(!k||!l.length)return"";const suren=l.some(h=>h.status==="doing");
return`<section class="kart" id="dersler-odev"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xD6\u011Frencilik")}</p>
          <h2 class="b2">${\u00E7("\xD6devlerin")}</h2></div><span class="ik-kutu">${ikon("notebook-pen")}</span></div>
        <div class="liste">${l.map(h=>{const bekliyor=h.status==="assigned"&&Date.parse(h.due_at)>Date.now(),alt=h.status==="assigned"?\u00E7("son {zaman}",{zaman:saatYaz(h.due_at)}):h.status==="doing"?
\u00E7("biti\u015F {saat}",{saat:saatKisa(h.ends_at)}):h.status==="done"?Number(h.applied_minutes)>0?\u00E7("+{m} dakika ders hakk\u0131; s\xFCren e\u011Fitimin {a} dakika k\u0131sald\u0131",{m:sayi(h.
credit_minutes??0),a:sayi(h.applied_minutes)}):\u00E7("+{m} dakika ders hakk\u0131",{m:sayi(h.credit_minutes??0)}):\u00E7("s\xFCresinde yap\u0131lmad\u0131");return`<div class="liste-satir" data-odev=\
"${esc(h.lesson_id)}" data-odev-durum="${esc(h.status)}"><span class="liste-ikon ${h.status==="done"?"yesil":h.status==="doing"?"mercan":h.status==="assigned"?"altin":""}">${ikon("notebook-pen")}</spa\
n>
            <div><span class="tur">${esc([ODEV_DURUM[h.status]??h.status,h.teacher??\u00E7("silinmi\u015F hesap")].join(" \xB7 "))}</span>
              <b>${esc(\u00E7("{beceri} \xF6devi",{beceri:dersKonuAdi(h.skill,null)}))}</b><div class="alt">${esc(alt)}</div></div>
            ${bekliyor?`<button class="dugme kucuk-d" data-odev-yap="${esc(h.lesson_id)}" ${suren?"disabled":""}>${ikon("notebook-pen")}${\u00E7("\xD6devi yap")}</button>`:h.status==="doing"?`<span cl\
ass="cip">${ikon("hourglass")}<b data-bitis="${esc(h.ends_at)}"></b></span>`:"<span></span>"}</div>`}).join("")}</div>
        <p class="kucuk" style="margin-top:8px">${\u00E7("\xD6dev {dk} dakikal\u0131k k\u0131sa bir \xE7al\u0131\u015Fmad\u0131r; karakterini me\u015Fgul etmez, ayn\u0131 anda bir \xF6dev yap\u0131l\u0131r. S\xFCresinde yaparsan o becerinin ders hakk\u0131na +{m\
} dakika eklenir ve s\u0131nav\u0131n puan\u0131na say\u0131l\u0131r.",{dk:sayi(k.minutes??10),m:sayi(k.creditMinutes??10)})}</p></section>`}function sinavHtml(){const l=v.exams??[],b=v.certificates??
[],k=v.exam_rule;return!k||!l.length&&!b.length?"":`<section class="kart" id="dersler-sinav"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xD6\u011Frencilik")}</p>
          <h2 class="b2">${\u00E7("S\u0131navlar ve belgeler")}</h2></div><span class="ik-kutu">${ikon("award")}</span></div>
        ${l.length?`<div class="liste">${l.map((e,i)=>{const engel=sinavEngeli(e,k);return`<div class="liste-satir" data-sinav="${esc(e.skill)}${e.lang?":"+esc(e.lang):""}" data-sinav-durum="${esc(e.can??
"hazir")}"><span class="liste-ikon ${e.can==="EXAM_PASSED"?"yesil":e.can==null?"altin":""}">${ikon(e.can==="EXAM_PASSED"?"award":"list-checks")}</span>
            <div><span class="tur">${esc([dersKonuAdi(e.skill,e.lang),e.teacher??\u00E7("silinmi\u015F hesap")].join(" \xB7 "))}</span>
              <b>${esc(\u00E7("{a} ders \xB7 {h} \xF6dev \xB7 +{p} seviye",{a:sayi(e.attended??0),h:sayi(e.homework??0),p:sayi(Math.max(0,Number(e.progress??0)))}))}</b>
              <div class="alt">${esc(sinavAlt(e,k))}</div>
              ${engel?`<div class="alt saglik-engel">${esc(engel)}</div>`:""}</div>
            ${e.can==null&&e.teacher_id?`<button class="dugme altin kucuk-d" data-sinav-gir="${i}">${ikon("list-checks")}${\u00E7("S\u0131nava gir")}</button>`:"<span></span>"}</div>`}).join("")}</div\
>`:""}
        ${b.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Belgelerin")}</p><div class="liste" id="dersler-belgeler">${b.map(x=>`<div class="liste-satir" data-belge="${esc(x.exam_id)}">\
<span class="liste-ikon yesil">${ikon("award")}</span>
            <div><span class="tur">${esc(\u00E7("{p} puan",{p:sayi(x.score??0)}))}</span><b>${esc(belgeYazi(x))}</b></div><span></span></div>`).join("")}</div>`:""}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Ayn\u0131 \xF6\u011Fretmenden ayn\u0131 konuda {n} derse gelince s\u0131nava girersin. Puan: her ders {a}, her \xF6dev {b} (en \xE7ok {n}'er), ilk dersten bu yana kazand\u0131\u011F\
\u0131n her seviye {c} (en \xE7ok {m}). {g} ve \xFCst\xFC ge\xE7er; belge profilinde g\xF6r\xFCn\xFCr. Ge\xE7emezsen {d} g\xFCn sonra yeniden girersin.",{n:sayi(k.lessons??5),a:sayi(k.perLesson??8),b:sayi(
k.perHomework??6),c:sayi(k.perLevel??3),m:sayi(k.levelMax??30),g:sayi(k.pass??60),d:sayi(k.retryDays??7)})}</p></section>`}function ogretmenHtml(){const kur=R(),en=Number(kur.minSkill??20),dk=DR(),uygun=beceriler().
filter(b=>Number(v.skills?.[b]??0)>=en),diller=dk?(v.languages??[]).filter(x=>Number(x.level??0)>=Number(dk.minLevel??60)):[],bekleyen2=(v.teaching??[]).filter(l=>l.status==="scheduled").length,sicil=v.
record_until&&Date.parse(v.record_until)>Date.now(),kalan=Math.max(0,Number(v.daily_work_cap??0)-Number(v.units_today??0)),b2=dk?dilBasamagi(dk.minLevel)??"B2":"B2",engel=!uygun.length&&!diller.length?
`<div class="bilgi-kutusu">${ikon("graduation-cap")}<span>${dk?\u00E7("Ders vermek i\xE7in bir becerin en az {n} ya da bir dilde en az {b} olmal\u0131. Hayat\u0131m \u2192 E\u011Fitim'den beceri, Hobiler'den dil \xE7al\u0131\u015Fabilir\
sin.",{n:sayi(en),b:b2}):\u00E7("Ders vermek i\xE7in bir becerin en az {n} olmal\u0131. Hayat\u0131m \u2192 E\u011Fitim'den \xE7al\u0131\u015Fabilirsin.",{n:sayi(en)})}</span></div>`:sicil?`<div class\
="hata-kutusu">${ikon("scale")}<span>${\u00E7("Sicil kayd\u0131n nedeniyle {zaman} tarihine kadar ders veremezsin.",{zaman:esc(saatYaz(v.record_until))})}</span></div>`:v.on_road?`<div class="bilgi-ku\
tusu">${ikon("route")}<span>${\u00E7("Yoldayken ders a\xE7\u0131lmaz; vard\u0131\u011F\u0131n \u015Fehirde a\xE7ars\u0131n.")}</span></div>`:bekleyen2>=Number(kur.upcomingMax??3)?`<div class="bilgi-ku\
tusu">${ikon("calendar")}<span>${\u00E7("Ayn\u0131 anda en \xE7ok {n} bekleyen dersin olabilir.",{n:sayi(kur.upcomingMax??3)})}</span></div>`:kalan<=0?`<div class="bilgi-kutusu">${ikon("hourglass")}<s\
pan>${\u00E7("Bug\xFCnk\xFC \xE7al\u0131\u015Fma s\u0131n\u0131r\u0131n doldu.")}</span></div>`:"",simdi=Date.now(),yerel=t=>{const z=new Date(t);return z.setMinutes(z.getMinutes()-z.getTimezoneOffset()),
z.toISOString().slice(0,16)},enErken=simdi+(Number(kur.leadMinutes??10)+1)*6e4,enGec=simdi+Number(kur.horizonHours??72)*36e5,oneri=Math.ceil((simdi+60*6e4)/(15*6e4))*15*6e4,ogretim=(v.teaching??[]).map(
l=>{const ogr=l.students??[];return`<div class="liste-satir ders-satir" data-ders-satir="${esc(l.lesson_id)}" data-ders-konu="${esc(l.skill)}${l.lang?":"+esc(l.lang):""}"><span class="liste-ikon ${l.status===
"running"?"mercan":"altin"}">${ikon(dersIkon(l.skill))}</span>
          <div><span class="tur">${esc(l.status==="running"?\u00E7("\u015Eimdi \xB7 biti\u015F {saat}",{saat:saatKisa(l.ends_at)}):saatYaz(l.starts_at))}${l.region_id!==v.region_id?" \xB7 "+esc(bolgeAdi(
l.region_id)):""}</span>
            <b>${esc(\u00E7("{beceri} dersin",{beceri:dersKonuAdi(l.skill,l.lang)}))}</b>
            <div class="alt">${esc([\u00E7("{n} / {m} \xF6\u011Frenci",{n:sayi(l.enrolled??0),m:sayi(l.capacity??0)}),\u00E7("{kr} kredi",{kr:kr(l.fee_cr??0)}),dilDersi(l)?\u00E7("dil dersi"):\u00E7("\
ders hakk\u0131 {n} dk",{n:sayi(l.credit_minutes??0)})].join(" \xB7 "))}</div>
            ${ogr.length?`<div class="alt">${ogr.map(s=>`<button class="baglanti" type="button" data-profil="${esc(s.character_id)}">${esc(s.name??"")}</button>`).join(", ")}</div>`:""}</div>
          <div class="mekan-satir-dugmeler"><button class="dugme sade kucuk-d" data-ders-goster="${esc(l.lesson_id)}">${ikon("presentation")}${\u00E7("S\u0131n\u0131f")}</button>
            ${l.status==="scheduled"?`<button class="dugme ikincil kucuk-d" data-ders-iptal="${esc(l.lesson_id)}">${ikon("x")}${\u00E7("\u0130ptal et")}</button>`:""}
            ${l.status==="running"&&l.stream?`<button class="dugme mercan kucuk-d" data-ders-yayin="${esc(l.stream.stream_id)}">${ikon("radio")}${\u00E7("Yay\u0131ndas\u0131n")}</button>`:l.status==="\
running"&&v.stream_class&&!v.my_stream&&l.region_id===v.region_id?`<button class="dugme ikincil kucuk-d" data-ders-yayinla="${esc(l.lesson_id)}">${ikon("radio")}${\u00E7("Kanal'da yay\u0131nla")}</but\
ton>`:""}</div></div>`}).join(""),gecmis=(v.taught??[]).map(l=>{const odev=l.homework?\u00E7("\xF6dev: {a} / {b} \xF6\u011Frenci yapt\u0131",{a:sayi(l.homework.done??0),b:sayi(l.homework.total??0)}):null,
odevVer=l.status==="completed"&&l.homework_can===null&&v.homework_rule;return`<div class="liste-satir" data-ders-verilen="${esc(l.lesson_id)}"><span class="liste-ikon">${ikon(dersIkon(l.skill))}</span\
>
          <div><span class="tur">${esc(zamanOnce(l.ends_at))} \xB7 ${esc(bolgeAdi(l.region_id))}</span><b>${esc(\u00E7("{beceri} dersin",{beceri:dersKonuAdi(l.skill,l.lang)}))}</b>
            <div class="alt">${esc([l.status==="completed"?\u00E7("{n} \xF6\u011Frenci kat\u0131ld\u0131 \xB7 {kr} kredi kazand\u0131n",{n:sayi(l.attended??0),kr:kr(l.earned_cr??0)}):\u00E7("d\xFC\u015Ft\xFC: {n\
eden}",{neden:DERS_IPTAL[l.cancel_reason]??""}),odev].filter(Boolean).join(" \xB7 "))}</div></div>
          ${odevVer?`<button class="dugme ikincil kucuk-d" data-odev-ver="${esc(l.lesson_id)}">${ikon("notebook-pen")}${\u00E7("\xD6dev ver")}</button>`:"<span></span>"}</div>`}).join("");return`<sect\
ion class="kart" id="dersler-ogretmen"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xD6\u011Fretmenlik")}</p>
          <h2 class="b2">${\u00E7("Ders ver")}</h2></div><span class="ik-kutu">${ikon("presentation")}</span></div>
        ${ogretim?`<div class="liste" style="margin-bottom:12px">${ogretim}</div>`:""}
        ${engel||`<form class="form" id="dersler-ac-form" novalidate>
          <label class="alan"><span>${diller.length?\u00E7("Konu"):\u00E7("Beceri")}</span><select name="beceri">${uygun.length&&diller.length?`<optgroup label="${esc(\u00E7("Beceriler"))}">`:""}${uygun.
map(b=>`<option value="${esc(b)}">${esc(\u00E7("{beceri} (seviyen {n}; ders hakk\u0131 {m} dk)",{beceri:beceriAdi(b),n:sayi(v.skills?.[b]??0),m:sayi(Math.min(Number(kur.creditMax??90),Number(kur.creditBase??
30)+Number(v.skills?.[b]??0)))}))}</option>`).join("")}${uygun.length&&diller.length?"</optgroup>":""}
            ${diller.length?`<optgroup label="${esc(\u00E7("Diller"))}">${diller.map(x=>`<option value="language:${esc(x.lang)}">${esc(x.native?\u00E7("{dil} (ana dilin)",{dil:dilAdi(x.lang)}):\u00E7(
"{dil} (seviyen {n}, {b})",{dil:dilAdi(x.lang),n:sayi(x.level),b:x.band??dilBasamagi(x.level)??""}))}</option>`).join("")}</optgroup>`:""}</select></label>
          ${diller.length?`<p class="kucuk" id="dersler-dil-ogretmen">${esc(\u00E7("Dil dersinde \xF6\u011Frencinin o dildeki seviyesi seninkinden en az {f} a\u015Fa\u011F\u0131da olmal\u0131; ders bitince seviyesi artar. Dil de\
rsi ders hakk\u0131 vermez.",{f:sayi(dk?.gap??20)}))}</p>`:""}
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
          <div class="yigin">${sehirHtml()}${ogrenciHtml()}${odevHtml()}${sinavHtml()}</div>
          <div class="yigin">${ogretmenHtml()}</div>
        </div></div>`;const yer=$("#dersler-sahne-yer",kap),b=ben();yer&&(yer.replaceWith(sahne.el),sahne.yaz({l:sahneDersi(),ben:{id:b.id,ad:b.name,gorunus,ulke:b.citizenship??null},bolge:v.region_id})),
bagla(),durdur=geriSay(kap,()=>setTimeout(()=>{kapandi||tazele()},1500))}async function isle(dugme,is){if(!dugme?.disabled){dugme&&(dugme.disabled=!0);try{await is()}catch(e){tost(hataMetni(e),"circle\
-alert")}finally{dugme?.isConnected&&(dugme.disabled=!1)}}}const bul=id=>[...v.city??[],...v.learning??[],...v.teaching??[]].find(l=>l.lesson_id===id);function yazilPenceresi(l){const dilD=dilDersi(l),
sev=Number(dilD?dilim(l.lang)?.level??0:v.skills?.[l.skill]??0),kaz=dilD?dilDersKazanci(sev,DR()):0;pencere({ust:\u00E7("Ders \xB7 {sehir}",{sehir:bolgeAdi(l.region_id)}),baslik:\u00E7("{beceri} dersi\
: {ad}",{beceri:dersKonuAdi(l.skill,l.lang),ad:l.teacher??""}),govde:`<div class="liste"><div class="liste-satir"><span class="liste-ikon yesil">${ikon("clock-3")}</span><div><span class="tur">${\u00E7(
"Ba\u015Flang\u0131\xE7")}</span><b>${esc(saatYaz(l.starts_at))}</b></div><span></span></div>
            ${dilD?`<div class="liste-satir" id="ders-dil-kazanc"><span class="liste-ikon deniz">${ikon("languages")}</span><div><span class="tur">${\u00E7("Dil seviyen")}</span><b>${esc(\u00E7("{dil}\
: {s} \u2192 {y} (\xF6\u011Fretmen {t})",{dil:dilAdi(l.lang),s:sayi(sev),y:sayi(sev+kaz),t:sayi(l.teacher_level??0)}))}</b></div><span></span></div>`:`<div class="liste-satir"><span class="liste-ikon"\
>${ikon("graduation-cap")}</span><div><span class="tur">${\u00E7("Ders hakk\u0131")}</span><b>${esc(\u00E7("{n} dakika ({beceri} {s} \u2192 \xF6\u011Fretmen {t})",{n:sayi(l.credit_minutes??0),beceri:beceriAdi(
l.skill),s:sayi(sev),t:sayi(l.teacher_level??0)}))}</b></div><span></span></div>`}
            <div class="liste-satir"><span class="liste-ikon altin">${ikon("coins")}</span><div><span class="tur">${\u00E7("\xDCcret")}</span><b>${esc(\u00E7("{kr} kredi",{kr:kr(l.fee_cr??0)}))}</b></\
div><span></span></div></div>
          <p class="kucuk" style="margin-top:10px">${\u00E7("\xDCcret \u015Fimdi ayr\u0131l\u0131r; ders saatinde bu \u015Fehirde de\u011Filsen ya da ders d\xFC\u015Ferse sana d\xF6ner. Ders ba\u015Flayana dek kayd\u0131 b\u0131rakabilirsin. Dersin yar\u0131m\
 saati \xE7izelgende yer tutar.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Yaz\u0131l"),sinif:"altin",ikon:"user-round-plus",is:()=>isle(null,async()=>{await Sunucu.yap("lesson_enroll",{p_lesson:l.
lesson_id,p_expected_fee:Number(l.fee_cr??0)}),tost(\u00E7("{beceri} dersine yaz\u0131ld\u0131n: {saat}.",{beceri:dersKonuAdi(l.skill,l.lang),saat:saatYaz(l.starts_at)}),"presentation"),odak=l.lesson_id,
Durum.ozet().catch(()=>{}),await tazele()})}]})}function sinavPenceresi(e){const k=v.exam_rule??{};pencere({ust:\u00E7("S\u0131nav \xB7 {ad}",{ad:e.teacher??""}),baslik:\u00E7("{konu} s\u0131nav\u0131",
{konu:dersKonuAdi(e.skill,e.lang)}),govde:`<div class="liste"><div class="liste-satir"><span class="liste-ikon">${ikon("presentation")}</span><div><span class="tur">${\u00E7("Gelinen ders")}</span><b>${esc(
\u00E7("{n} ders \xB7 {p} puan",{n:sayi(e.attended??0),p:sayi(Math.min(Number(k.lessons??5),Number(e.attended??0))*Number(k.perLesson??8))}))}</b></div><span></span></div>
            <div class="liste-satir"><span class="liste-ikon">${ikon("notebook-pen")}</span><div><span class="tur">${\u00E7("Yap\u0131lan \xF6dev")}</span><b>${esc(\u00E7("{n} \xF6dev \xB7 {p} puan",{
n:sayi(e.homework??0),p:sayi(Math.min(Number(k.lessons??5),Number(e.homework??0))*Number(k.perHomework??6))}))}</b></div><span></span></div>
            <div class="liste-satir"><span class="liste-ikon">${ikon("trending-up")}</span><div><span class="tur">${\u00E7("\u0130lerleme")}</span><b>${esc(\u00E7("+{n} seviye \xB7 {p} puan",{n:sayi(Math.
max(0,Number(e.progress??0))),p:sayi(Math.min(Number(k.levelMax??30),Math.max(0,Number(e.progress??0))*Number(k.perLevel??3)))}))}</b></div><span></span></div>
            <div class="liste-satir"><span class="liste-ikon altin">${ikon("award")}</span><div><span class="tur">${\u00E7("Toplam")}</span><b>${esc(\u00E7("{p} puan (ge\xE7me {g})",{p:sayi(e.score??0),
g:sayi(k.pass??60)}))}</b></div><span></span></div></div>
          <p class="kucuk" style="margin-top:10px">${Number(e.score??0)>=Number(k.pass??60)?\u00E7("Ge\xE7ersen belgen profilinde g\xF6r\xFCn\xFCr; bu \xF6\u011Fretmenden bu konuda bir daha s\u0131nava girmezsin."):
\u00E7("Puan\u0131n ge\xE7meye yetmiyor; ge\xE7emezsen {d} g\xFCn sonra yeniden girersin. \xD6dev yapmak ve \xE7al\u0131\u015Fmak puan\u0131n\u0131 art\u0131r\u0131r.",{d:sayi(k.retryDays??7)})}</p>`,
dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("S\u0131nava gir"),sinif:"altin",ikon:"list-checks",is:()=>isle(null,async()=>{const x=await Sunucu.yap("lesson_exam",{p_teacher:e.teacher_id,p_skill:e.skill,
p_lang:e.lang??null});x.passed?tost(\u00E7("S\u0131nav\u0131 ge\xE7tin ({p} puan): belgen profilinde.",{p:sayi(x.score??0)}),"award"):tost(\u00E7("S\u0131navda {p} puan ald\u0131n (ge\xE7me {g}); {d} g\xFCn sonra yen\
iden girebilirsin.",{p:sayi(x.score??0),g:sayi(k.pass??60),d:sayi(k.retryDays??7)}),"list-checks"),await tazele()})}]})}function bagla(){meydanaDonBagla(kap);for(const b of $$("[data-profil]",kap))b.onclick=
()=>profilAc(b.dataset.profil,()=>tazele());for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-ders-goster]",kap))b.onclick=()=>{odak=b.dataset.dersGoster;
const l=bul(odak),k=ben();sahne.yaz({l,ben:{id:k.id,ad:k.name,gorunus,ulke:k.citizenship??null},bolge:v.region_id}),sahne.el.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})};for(const b of $$(
"[data-ders-yazil]",kap))b.onclick=()=>{const l=bul(b.dataset.dersYazil);l&&yazilPenceresi(l)};for(const b of $$("[data-odev-ver]",kap))b.onclick=()=>isle(b,async()=>{const l=await Sunucu.yap("lesson_\
homework_assign",{p_lesson:b.dataset.odevVer});tost(\u00E7("\xD6dev verdin: {n} \xF6\u011Frenci {s} saat i\xE7inde yapabilir.",{n:sayi(l.homework_students??l.homework?.total??0),s:sayi(v.homework_rule?.
dueHours??24)}),"notebook-pen"),await tazele()});for(const b of $$("[data-odev-yap]",kap))b.onclick=()=>isle(b,async()=>{const h=await Sunucu.yap("lesson_homework_start",{p_lesson:b.dataset.odevYap});
tost(\u00E7("\xD6deve ba\u015Flad\u0131n: biti\u015F {saat}; ders hakk\u0131na +{m} dakika.",{saat:saatKisa(h.ends_at),m:sayi(h.credit_minutes??10)}),"notebook-pen"),await tazele()});for(const b of $$(
"[data-sinav-gir]",kap))b.onclick=()=>{const e=(v.exams??[])[Number(b.dataset.sinavGir)];e&&sinavPenceresi(e)};for(const b of $$("[data-ders-yayinla]",kap))b.onclick=()=>yayinAc({sahne:"class",sonra:()=>tazele()});
for(const b of $$("[data-ders-yayin]",kap))b.onclick=()=>yayinOdasi(b.dataset.dersYayin,{sonra:()=>tazele()});for(const b of $$("[data-ders-birak]",kap))b.onclick=()=>isle(b,async()=>{await Sunucu.yap(
"lesson_withdraw",{p_lesson:b.dataset.dersBirak}),tost(\u00E7("Kayd\u0131 b\u0131rakt\u0131n; \xFCcretin sana d\xF6nd\xFC."),"undo-2"),Durum.ozet().catch(()=>{}),await tazele()});for(const b of $$("[d\
ata-ders-iptal]",kap))b.onclick=()=>{const l=bul(b.dataset.dersIptal);pencere({ust:\u00E7("\xD6\u011Fretmenlik"),baslik:\u00E7("{beceri} dersin iptal edilsin mi?",{beceri:dersKonuAdi(l?.skill,l?.lang)}),
govde:`<p class="aciklama">${\u00E7("Yaz\u0131lan \xF6\u011Frencilerin \xFCcreti d\xF6ner ve onlara haber gider.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\u0130ptal et"),sinif:"mercan",ikon:"\
x",is:()=>isle(null,async()=>{await Sunucu.yap("lesson_cancel",{p_lesson:b.dataset.dersIptal}),tost(\u00E7("Dersi iptal ettin; \xF6\u011Frencilerin \xFCcreti d\xF6nd\xFC."),"undo-2"),await tazele()})}]})};
const f=$("#dersler-ac-form",kap);f?.addEventListener("submit",e=>{e.preventDefault();const d=$("button[type=submit]",f),mesaj=$("#dersler-ac-mesaj",f),hata=m=>{mesaj.innerHTML=`<div class="hata-kutus\
u" style="margin-top:8px">${ikon("circle-alert")}<span>${esc(m)}</span></div>`};mesaj.innerHTML="";const fd=new FormData(f),kur=R(),zaman=new Date(String(fd.get("zaman")??"")),ucret=krediAlt(fd.get("u\
cret")),dk=(zaman.getTime()-Date.now())/6e4;if(!Number.isFinite(zaman.getTime())||dk<Number(kur.leadMinutes??10)||dk>Number(kur.horizonHours??72)*60){hata(\u00E7("Ba\u015Flang\u0131\xE7 en erken {e} dakika, en ge\xE7\
 {s} saat sonra olmal\u0131.",{e:sayi(kur.leadMinutes??10),s:sayi(kur.horizonHours??72)}));return}if(!Number.isFinite(ucret)||ucret<0||ucret>Number(kur.feeMaxCr??300)){hata(\u00E7("\xDCcret 0 ile {kr} kr\
edi aras\u0131nda olmal\u0131.",{kr:kr(kur.feeMaxCr??300)}));return}const konu=String(fd.get("beceri")??""),dil=konu.startsWith("language:")?konu.slice(9):null;isle(d,async()=>{let l;try{l=await Sunucu.
yap("lesson_open",{p_skill:dil?"language":konu,p_starts_at:zaman.toISOString(),p_fee:ucret,p_capacity:Number(fd.get("kontenjan")),...dil?{p_lang:dil}:{}})}catch(err){hata(hataMetni(err));return}kirli=
!1,odak=l?.lesson_id??null,tost(\u00E7("Ders a\xE7t\u0131n: {beceri}, {saat}.",{beceri:dersKonuAdi(l?.skill??(dil?"language":konu),l?.lang??dil),saat:saatYaz(l?.starts_at??zaman.toISOString())}),"pres\
entation"),await tazele()})})}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()});await Promise.all([Durum.kurallar().catch(()=>null),Durum.ozet().catch(()=>null)]),await yukle(),ciz();const b1=Durum.
dinle("olay",({olay})=>{/^(lesson\.|travel\.arrived|training\.|media\.stream_)/.test(olay)&&yakinda()}),saat=setInterval(()=>{!document.hidden&&!document.querySelector(".perde")&&tazeleIste()},3e4);return()=>{
kapandi=!0,durdur(),b1(),clearInterval(saat),clearTimeout(bekleyen),sahne.kapat()}}}),Parcalar.tamam("ek_98zm_dersler");
