// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_54_isbirligi.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("ulke/isbirligi",{async ac(kap){let v=null,sekme="ortaklar";const akisKart=AkisKarti.ac();akisKart.dinle("sec",async(ad,ulke)=>{ad!=="ortak"||!ulke||(sekme="ortaklar",await tazele(),$(`[d\
ata-is-ortak="${CSS.escape(ulke)}"]`,kap)?.scrollIntoView({behavior:"smooth",block:"center"}))});let akisVeri=null,akisAn=0,hatId=null,hat=null,kanal=null,kanalVeri=null,elcilikSec=null,sonMesaj=0,kapandi=!1,
durdur=()=>{},elcilikMod=Gorunum.uc()?"3b":"2b",santiyeMod=Gorunum.uc()?"3b":"2b",elcilikHata=!1,santiyeHata=!1,santiyeOynat=!1;const form={ulke:null,maddeler:new Set(["embassy","trade"]),yardimUlke:null,
yardim:"",hatUlke:null,hatKenar:null,hatTur:null,teslimMal:null,teslimAdet:1,bagis:!1,isBirim:1};let teklifQ=null,teklifQAnahtar="";try{const x=JSON.parse(sessionStorage.getItem("civora.isbirligi")??"\
null");x&&["ortaklar","akis","hatlar","yardim","elcilik"].includes(x.sekme)&&(sekme=x.sekme),x?.hat&&(hatId=x.hat),sessionStorage.removeItem("civora.isbirligi")}catch{}async function yukle(){const[d2,
ben,kurallar,harita]=await Promise.all([Sunucu.cagir("coop_status"),Sunucu.cagir("coop_me"),Durum.kurallar(),Durum.harita(),Durum.ozet()]);v={d:d2,ben,kurallar,harita},sekme==="akis"&&(akisVeri=await Sunucu.
cagir("coop_flow").catch(()=>akisVeri),akisAn=Date.now()),hatId&&(hat=await Sunucu.cagir("line_status",{p_line:hatId}).catch(()=>null)),hat||(hatId=null);const kanallar=ben.embassies??[];if(kanal&&!kanallar.
some(k=>k.partner_id===kanal)&&(kanal=null,kanalVeri=null),sekme==="elcilik"&&!kanal&&kanallar.length&&(kanal=kanallar[0].partner_id),kanal&&sekme==="elcilik"){kanalVeri=await Sunucu.cagir("embassy_hi\
story",{p_country:kanal,p_limit:60}).catch(()=>null);const son=kanalVeri?.messages?.at(-1);son&&(sonMesaj=Math.max(sonMesaj,Date.parse(son.at)))}await teklifHazirla()}const d=()=>v.d,biz=()=>v.d.country_id,
kural=()=>v.d.rules,baskan=()=>!!v.d.is_president,hukumet=()=>!!v.d.in_government,acikUlkeler=()=>(v.harita.open_countries??[]).filter(u=>u!==biz()).sort((a,b)=>ulkeAdi(a).localeCompare(ulkeAdi(b),DIL.
yerel)),karsi=t=>t.country_a===biz()?t.country_b:t.country_a,sayac=()=>v.kurallar?.data?.civic?.diplomacy?.counter??null,karsiOlur=t=>!!sayac()&&(sayac().kinds??[]).includes(t.kind)&&Number(t.round??1)<=
Number(sayac().maxCounters??0);function kenarlar(ulke){return(v.d.borders??[]).filter(b=>b.partner===ulke)}async function teklifHazirla(){if(!baskan()){teklifQ=null;return}const ortaklar=[...new Set((v.
d.borders??[]).map(b=>b.partner))];ortaklar.includes(form.hatUlke)||(form.hatUlke=ortaklar[0]??null);const ks=kenarlar(form.hatUlke);ks.some(k2=>`${k2.region}|${k2.neighbor}`===form.hatKenar)||(form.hatKenar=
ks[0]?`${ks[0].region}|${ks[0].neighbor}`:null);const k=ks.find(x=>`${x.region}|${x.neighbor}`===form.hatKenar);k&&!k.kinds.includes(form.hatTur)&&(form.hatTur=k.kinds[0]);const anahtar=k?`${form.hatUlke}\
|${form.hatKenar}|${form.hatTur}`:"";if(!k){teklifQ=null,teklifQAnahtar="";return}anahtar===teklifQAnahtar&&teklifQ||(teklifQAnahtar=anahtar,teklifQ=await Sunucu.cagir("line_quote",{p_target_country:form.
hatUlke,p_region_a:k.region,p_region_b:k.neighbor,p_kind:form.hatTur}).catch(()=>null))}const meclisCip=(u,an)=>an?`<span class="cip yesil">${ikon("check")}${\u00E7("{ulke} meclisi onaylad\u0131",{ulke:esc(
ulkeAdi(u))})}</span>`:`<span class="cip">${ikon("hourglass")}${\u00E7("{ulke} meclisi bekleniyor",{ulke:esc(ulkeAdi(u))})}</span>`;function bekleyenKarti(liste,baslik){return liste.length?`<section c\
lass="kart" id="is-bekleyen">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Bekleyen teklifler")}</p><h2 class="b2">${esc(baslik)}</h2></div><span class="ik-kutu">${ikon("hourglass")}</span></div>
        <div class="yigin">${liste.map(t=>{const gelen=t.country_b===biz(),dugmeler=[];baskan()&&t.status==="offered"&&gelen&&(dugmeler.push(`<button class="dugme altin kucuk-d" data-is-kabul="${esc(t.
treaty_id)}">${ikon("check")}${\u00E7("Kabul et")}</button>`),karsiOlur(t)&&dugmeler.push(`<button class="dugme ikincil kucuk-d" data-is-karsi="${esc(t.treaty_id)}">${ikon("repeat-2")}${\u00E7("Kar\u015F\u0131 \
teklif")}</button>`),dugmeler.push(`<button class="dugme ikincil kucuk-d" data-is-ret="${esc(t.treaty_id)}">${ikon("x")}${\u00E7("Reddet")}</button>`)),baskan()&&!gelen&&dugmeler.push(`<button class="\
dugme ikincil kucuk-d" data-is-geri="${esc(t.treaty_id)}">${ikon("x")}${\u00E7("Geri \xE7ek")}</button>`);const ne=t.kind==="cooperation"?`${\u00E7("\u0130\u015Fbirli\u011Fi")} \xB7 ${(t.clauses??[]).
map(isMaddeAd).map(esc).join(", ")}`:t.kind==="aid"?\u00E7("Kalk\u0131nma yard\u0131m\u0131 \xB7 {kr} kredi",{kr:kr(t.aid_cr)}):t.line?`${esc(hatTurAd(t.line.kind))} \xB7 ${esc(hatAdi(t.line))} \xB7 ${\u00E7(
"b\xFCt\xE7e {kr} kredi",{kr:kr(t.line.budget_cr)})}`:esc(t.kind),yon=t.kind==="aid"?t.country_a===biz()?\u00E7("Biz veriyoruz \u2192 {ulke}",{ulke:esc(ulkeAdi(t.country_b))}):\u00E7("{ulke} veriyor \u2192\
 biz",{ulke:esc(ulkeAdi(t.country_a))}):gelen?\u00E7("{ulke} teklif etti",{ulke:esc(ulkeAdi(t.country_a))}):\u00E7("Biz teklif ettik \u2192 {ulke}",{ulke:esc(ulkeAdi(t.country_b))});return`<article cl\
ass="antlasma" data-is-teklif="${esc(t.treaty_id)}">
            <div class="antlasma-bas"><span class="liste-ikon lacivert">${ikon(t.kind==="aid"?"hand-coins":t.kind==="line"?HAT_TUR[t.line?.kind]?.ik??"route":"handshake")}</span>
              <div><span class="tur">${ne}</span><b><span class="ulke-nokta" style="background:${ulkeRenk(karsi(t))}"></span> ${esc(ulkeAdi(karsi(t)))}</b>
                <div class="alt">${yon} \xB7 ${esc(saatYaz(t.offered_at))}</div></div>
              <span class="cip altin">${t.status==="offered"?\u00E7("Yan\u0131t bekleniyor"):\u00E7("Meclis onay\u0131nda")}</span></div>
            ${antlasmaCizgisi(t)}
            ${t.previous?`<p class="antlasma-onceki" data-onceki="${esc(t.previous.treaty_id)}">${esc(oncekiTeklifMetni(t))}</p>`:""}
            ${t.status==="offered"&&gelen&&baskan()&&sayac()&&(sayac().kinds??[]).includes(t.kind)&&!karsiOlur(t)?`<p class="kucuk">${\u00E7("Bu g\xF6r\xFC\u015Fmede kar\u015F\u0131 teklif hakk\u0131 bitti ({n} tur): kabul et \
ya da reddet.",{n:Number(sayac().maxCounters??3)})}</p>`:""}
            ${t.status==="accepted"?`<div class="oneri-dugmeler">${meclisCip(t.country_a,t.approved_a_at)}${meclisCip(t.country_b,t.approved_b_at)}</div>
              <p class="kucuk">${\u00E7("Onay oylamas\u0131 \xDClkem \u2192 Meclis'te; yaln\u0131z milletvekilleri oy verir.")}</p>`:""}
            ${dugmeler.length?`<div class="oneri-dugmeler">${dugmeler.join("")}</div>`:""}
          </article>`}).join("")}</div>
      </section>`:""}const bekleyen=turler=>(v.d.pending??[]).filter(t=>turler.includes(t.kind));function elcilikDurumu(){const ortaklar=(v.d.partners??[]).filter(t=>(t.clauses??[]).includes("embassy")).
map(t=>({ulke:t.partner,savas:!!t.at_war}));return ortaklar.some(o=>o.ulke===elcilikSec)||(elcilikSec=ortaklar[0]?.ulke??null),{ulkem:biz(),ortaklar,sec:elcilikSec,mesaj:Date.now()-sonMesaj<36e5,anahtar:`${biz()}\
|${ortaklar.map(o=>o.ulke+(o.savas?"!":"")).join(",")}|${elcilikSec}`}}function elcilikKarti(){const e=elcilikDurumu(),ortak=e.ortaklar.find(o=>o.ulke===e.sec),yazi=e.ortaklar.length?ortak?.savas?\u00E7(
"{ulke} ile sava\u015Ftay\u0131z: bayrak yar\u0131ya indi, kap\u0131 kapal\u0131. El\xE7ilik kanal\u0131 bar\u0131\u015F g\xF6r\xFC\u015Fmesi i\xE7in a\xE7\u0131k.",{ulke:esc(ulkeAdi(ortak.ulke))}):\u00E7(
"{n} \xFClkeyle b\xFCy\xFCkel\xE7ilik. Bayraklar iki ba\u015Fkentte dalgalan\u0131yor.",{n:sayi(e.ortaklar.length)}):\u00E7("Hen\xFCz b\xFCy\xFCkel\xE7ilik yok. B\xFCy\xFCkel\xE7ilik maddeli bir i\u015Fbirli\u011Fi anla\u015Fmas\u0131yla iki\
 ba\u015Fkentte kar\u015F\u0131l\u0131kl\u0131 el\xE7ilik a\xE7\u0131l\u0131r.");return`<section class="kart elcilik-kart" id="elcilik-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("B\xFCy\xFCkel\xE7ilik")}</p><h2 class="b2">${ortak?esc(ulkeAdi(ortak.ulke)):esc(ulkeAdi(biz()))}</h2></div>
          ${Gorunum.webglVar()?`<button class="dugme sade kucuk-d" id="elcilik-mod" aria-pressed="${elcilikMod==="2b"}" title="${elcilikMod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCme (2B) ge\xE7"):\u00E7(
"3B g\xF6r\xFCn\xFCme ge\xE7")}">${ikon("layers")}${elcilikMod==="3b"?\u00E7("2B"):\u00E7("3B")}</button>`:""}</div>
        <div class="elcilik-sahne sahne3b" id="elcilik-sahne" data-mod="${elcilikMod}">
          ${elcilikMod==="3b"?`<div class="yukleniyor${elcilik3bOrnek?" bitti":""}" id="elcilik-yukleniyor"><div class="yukleniyor-ic"><img src="img/amblem.png" alt=""><span>${\u00E7("B\xFCy\xFCkel\xE7ilik a\xE7\u0131\
l\u0131yor\u2026")}</span></div></div>`:""}
          <div class="elcilik-2b" id="elcilik-2b"${elcilikMod==="3b"?" hidden":""}>${elcilikMod==="2b"?elcilik2b(e):""}</div>
        </div>
        ${e.ortaklar.length>1?`<div class="oneri-dugmeler" style="margin-top:8px">${e.ortaklar.map(o=>`<button class="dugme ${o.ulke===e.sec?"":"ikincil"} kucuk-d" data-elcilik-sec="${esc(o.ulke)}" ar\
ia-pressed="${o.ulke===e.sec}">
          <span class="ulke-nokta" style="background:${ulkeRenk(o.ulke)}"></span> ${esc(ulkeAdi(o.ulke))}</button>`).join("")}</div>`:""}
        <p class="kucuk" style="margin-top:8px" aria-live="polite">${yazi}</p>
      </section>`}function ortaklarKarti(){const ps=v.d.partners??[];return`<section class="kart" id="is-ortaklar">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ortaklar")}</p><h2 class="b2">${ps.length?\u00E7("{n} i\u015Fbirli\u011Fi anla\u015Fmas\u0131",{n:sayi(ps.length)}):\u00E7("\u0130\u015Fbirli\u011Fi a\
nla\u015Fmas\u0131 yok")}</h2></div>
          <span class="ik-kutu">${ikon("heart-handshake")}</span></div>
        ${ps.length?`<div class="yigin">${ps.map(t=>`<article class="antlasma" data-is-ortak="${esc(t.partner)}">
            <div class="antlasma-bas"><span class="liste-ikon ${t.at_war?"mercan":"yesil"}">${ikon(t.at_war?"swords":"heart-handshake")}</span>
              <div><span class="tur">${t.status==="terminating"?\u00E7("Fesih bildirildi \xB7 sona erer {zaman}",{zaman:esc(saatYaz(t.ends_at))}):\u00E7("Y\xFCr\xFCrl\xFCkte \xB7 {zaman}",{zaman:esc(saatYaz(
t.starts_at))})}</span>
                <b><span class="ulke-nokta" style="background:${ulkeRenk(t.partner)}"></span> ${esc(ulkeAdi(t.partner))}</b></div>
              <span class="cip ${t.at_war?"mercan":t.status==="terminating"?"altin":"yesil"}">${t.at_war?\u00E7("Sava\u015Fta: maddeler ask\u0131da"):t.status==="terminating"?\u00E7("Fesih bildirildi"):
\u00E7("Y\xFCr\xFCrl\xFCkte")}</span></div>
            <div class="is-maddeler">${(t.clauses??[]).map(m=>`<div class="is-madde" data-madde="${esc(m)}"><span class="liste-ikon">${ikon(IS_MADDE_IKON[m]??"check")}</span>
              <div><b>${esc(isMaddeAd(m))}</b><p class="kucuk">${isMaddeEtki(m,kural())}</p></div></div>`).join("")}</div>
            ${baskan()&&t.status==="in_force"?`<div class="oneri-dugmeler"><button class="dugme ikincil kucuk-d" data-is-degistir="${esc(t.partner)}">${ikon("notebook-pen")}${\u00E7("Maddeleri de\u011Fi\u015Fti\
r")}</button>
              <button class="dugme sade kucuk-d" data-is-fesih="${esc(t.treaty_id)}">${ikon("scroll-text")}${\u00E7("Fesih bildir")}</button></div>`:""}
          </article>`).join("")}</div>`:`<p class="bos">${\u00E7("\xDClkenin hen\xFCz bir i\u015Fbirli\u011Fi orta\u011F\u0131 yok.")}</p>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Anla\u015Fmalar s\xFCresizdir; taraflardan birinin ba\u015Fkan\u0131 {n} saat \xF6nceden bildirerek bitirir. Ayn\u0131 etki birden \xE7ok ortakla katlanmaz. \u0130ki \xFClke aras\u0131\
nda sava\u015F varken maddelerin etkisi durur.",{n:sayi(kural()?.notice_h??72)})}</p>
      </section>`}function isbirligiTeklifKarti(){if(!baskan())return`<section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Teklif")}</p><h2 class="b2">${\u00E7("\u0130\u015Fbirli\u011Fini b\
a\u015Fkan teklif eder")}</h2></div><span class="ik-kutu">${ikon("handshake")}</span></div>
          <p class="aciklama">${\u00E7("\xDClke ba\u015Fkan\u0131 maddeleri se\xE7ip teklif eder; kar\u015F\u0131 \xFClkenin ba\u015Fkan\u0131 kabul edince iki \xFClkenin meclisi onaylar. Milletvekilleri onay oylamas\u0131n\u0131 Meclis'te yapar.")}\
</p></section>`;const ulkeler=acikUlkeler();ulkeler.includes(form.ulke)||(form.ulke=ulkeler[0]??null);const mevcut=(v.d.partners??[]).find(t=>t.partner===form.ulke),maddeler=kural()?.clauses??["embass\
y","trade","customs_union","free_movement","education"];return`<section class="kart" id="is-teklif">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u015Fkan")}</p><h2 class="b2">${\u00E7("\u0130\u015Fbirli\u011Fi teklifi")}</h2></div><span class="ik-kutu">${ikon("handshake")}</sp\
an></div>
        <form class="form" id="isbirligi-form" novalidate>
          <label class="alan"><span>${\u00E7("\xDClke")}</span><select name="ulke">${ulkeler.map(u=>`<option value="${esc(u)}" ${u===form.ulke?"selected":""}>${esc(ulkeAdi(u))}</option>`).join("")}</s\
elect></label>
          ${mevcut?`<div class="bilgi-kutusu">${ikon("info")}<span>${\u00E7("{ulke} ile anla\u015Fma y\xFCr\xFCrl\xFCkte. Yeni teklif y\xFCr\xFCrl\xFC\u011Fe girince eskisinin yerine ge\xE7er.",{ulke:esc(
ulkeAdi(form.ulke))})}</span></div>`:""}
          <div class="radyo-liste">${maddeler.map(m=>`<label class="radyo"><input type="checkbox" name="madde" value="${esc(m)}" ${form.maddeler.has(m)?"checked":""}>
            <span><b>${ikon(IS_MADDE_IKON[m]??"check")} ${esc(isMaddeAd(m))}</b><span class="kucuk">${isMaddeEtki(m,kural())}</span></span></label>`).join("")}</div>
          <p class="kucuk">${\u00E7("Kar\u015F\u0131 \xFClkenin ba\u015Fkan\u0131 b\xFCt\xFCn maddeleri birlikte kabul eder, reddeder ya da maddeleri de\u011Fi\u015Ftirip kar\u015F\u0131 teklif yapar. Kabulde iki \xFClkenin meclisinde onay oylamas\u0131 a\xE7\u0131\
l\u0131r.")}</p>
          <button class="dugme altin" type="submit">${ikon("send")}${\u00E7("Teklif et")}</button>
          <div class="form-mesaj"></div>
        </form>
      </section>`}const hatBakim=l=>l.status!=="built"?"":l.weight_q==null?l.at_war?\u00E7("Kapal\u0131: iki \xFClke sava\u015Fta"):\u00E7("Kapal\u0131: u\xE7lardan biri el de\u011Fi\u015Ftirdi"):l.upkeep_paid===
!1?\u00E7("Bak\u0131ms\u0131z: yolculuk yava\u015F (d\xF6rtte \xFC\xE7 kenar)"):\u00E7("A\xE7\u0131k ve bak\u0131ml\u0131: yolculukta yar\u0131m kenar");function hatlarKarti(){const ls=v.d.lines??[];return`\
<section class="kart" id="is-hatlar">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ortak hatlar")}</p><h2 class="b2">${ls.length?\u00E7("{n} hat",{n:sayi(ls.length)}):\u00E7("Ortak hat yok")}</h2></div><span class="ik-\
kutu">${ikon("train-front")}</span></div>
        ${ls.length?`<div class="liste">${ls.map(l=>{const p=hatIlerleme(l),durum=HAT_DURUM[l.status]??{ad:l.status,sinif:""};return`<div class="liste-satir" data-hat-satir="${esc(l.line_id)}" ${hatId===
l.line_id?'aria-current="true"':""}>
            <span class="liste-ikon ${l.status==="built"?"yesil":l.status==="building"?"altin":""}">${ikon(HAT_TUR[l.kind]?.ik??"route")}</span>
            <div><span class="tur">${esc(hatTurAd(l.kind))} \xB7 ${esc(ulkeAdi(l.country_a))} \u2013 ${esc(ulkeAdi(l.country_b))}</span><b>${esc(hatAdi(l))}</b>
              <div class="alt">${l.status==="building"?`${\u00E7("\u0130lerleme {n}",{n:yuzde(p)})} \xB7 ${\u00E7("son g\xFCn {zaman}",{zaman:esc(saatYaz(l.deadline_at))})}`:l.status==="built"?esc(hatBakim(
l)):l.status==="closed"?\u00E7("Kapand\u0131: {neden}",{neden:esc(HAT_KAPANIS[l.close_reason]??l.close_reason??"")}):\u00E7("B\xFCt\xE7e {kr} kredi \xB7 meclis onay\u0131 bekleniyor",{kr:kr(l.budget_cr)})}\
</div>
              ${l.status==="building"?`<div class="cubuk deniz" style="margin-top:6px"><i style="width:${Math.round(p*100)}%"></i></div>`:""}</div>
            <span class="satir" style="gap:6px;flex-wrap:wrap;justify-content:flex-end"><span class="cip ${l.treaty_status==="terminating"?"mercan":durum.sinif}">${l.treaty_status==="terminating"?\u00E7(
"Fesih: {zaman}",{zaman:esc(saatYaz(l.treaty_ends_at))}):esc(durum.ad)}</span>
              ${["building","built"].includes(l.status)?`<button class="dugme ${l.status==="building"?"":"ikincil"} kucuk-d" data-hat-ac="${esc(l.line_id)}">${ikon(l.status==="building"?"hammer":"eye")}${l.
status==="building"?\u00E7("\u015Eantiye"):\u00E7("G\xF6ster")}</button>`:""}
              ${baskan()&&["building","built"].includes(l.status)&&l.treaty_status==="in_force"?`<button class="dugme sade kucuk-d" data-is-fesih="${esc(l.treaty_id)}" data-is-fesih-hat="1">${ikon("sc\
roll-text")}${\u00E7("Feshet")}</button>`:""}</span>
          </div>`}).join("")}</div>`:`<p class="bos">${\u00E7("\xDClkenin hen\xFCz bir ortak hatt\u0131 yok. Ba\u015Fkan kom\u015Fu \xFClkeyle demiryolu, feribot ya da k\xF6pr\xFC \xF6nerebilir.")}</p\
>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Hat bitince iki b\xF6lge aras\u0131ndaki yolculuk yar\u0131m kenar say\u0131l\u0131r (s\xFCre ve bilet yar\u0131). B\xFCt\xFCn i\u015Fbirli\u011Fi etkileri birlikte yolculu\u011Fu en \xE7ok yar\u0131ya \
indirir. Bak\u0131m\u0131 iki hazine \xF6der; \xF6denmezse hat yava\u015Flar. Sava\u015Fta ve sava\u015F\u0131n cephesine giden yolculukta hat kullan\u0131lmaz.")}</p>
      </section>`}function santiyeDurumu(){const l=hat,p=l.progress,malzeme=Object.fromEntries((p?.materials??[]).map(m=>[m.asset,[Number(m.delivered),Number(m.need)]])),suren=(l.shifts??[]).filter(s=>s.
status==="active"&&Date.parse(s.ends_at)>Date.now()),ben=suren.some(s=>s.character_id===benimKimlik());return{anahtar:`${l.line_id}|${l.status}|${Math.round(hatIlerleme(l)*100)}|${suren.length}|${ben}`,
tur:l.kind,durum:l.status,ilerleme:hatIlerleme(l),malzeme,isci:suren.length,ben,savas:!!l.at_war,bakimsiz:l.upkeep_paid===!1,ulkeA:l.country_a,ulkeB:l.country_b,oynat:santiyeOynat&&!hareketAzalt}}function santiyeKarti(){
if(!hat)return"";const l=hat,me=l.me??{},p=l.progress,sd=santiyeDurumu(),kalanIs=Math.max(0,Number(l.work_units)-Number(p.work_done)),yazi=l.status==="building"?\u00E7("\u0130lerleme {n}. Son g\xFCn {zaman}; \
bitmezse \u015Fantiye kapan\u0131r, harcanmayan para hazinelere d\xF6ner.",{n:yuzde(hatIlerleme(l)),zaman:esc(saatYaz(l.deadline_at))}):l.status==="built"?esc(hatBakim(l)):l.status==="closed"?\u00E7("\
\u015Eantiye kapand\u0131: {neden}.",{neden:esc(HAT_KAPANIS[l.close_reason]??l.close_reason??"")}):\u00E7("Hat iki meclisin onay\u0131n\u0131 bekliyor; onayla b\xFCt\xE7e \u015Fantiye kasas\u0131na ge\xE7er."),
engel=me.blocked,satirMal=m=>{const benim=Number(me.delivered?.[m.asset]??0),kota=Number(me.supplier_max?.[m.asset]??0);return`<div class="liste-satir" data-santiye-mal="${esc(m.asset)}"><span class="\
liste-ikon">${ikon("package")}</span>
          <div><span class="tur">${\u00E7("Birim fiyat {kr} kredi",{kr:kr(m.price_cr)})} \xB7 ${\u00E7("senin pay\u0131n {a} / {b}",{a:sayi(benim),b:sayi(kota)})}</span><b>${esc(varlikAdi(m.asset))}</\
b>
            <div class="cubuk deniz" style="margin-top:6px"><i style="width:${Math.round(100*Math.min(Number(m.delivered),Number(m.need))/Math.max(1,Number(m.need)))}%"></i></div></div>
          <span class="kucuk"><b>${sayi(m.delivered)}</b> / ${sayi(m.need)}</span></div>`},katkilar=[...(l.deliveries??[]).map(x=>({t:Date.parse(x.at),html:`<div class="liste-satir"><span class="liste\
-ikon">${ikon("package")}</span>
          <div><span class="tur">${esc(zamanOnce(x.at))}</span><b>${esc(x.name)}</b><div class="alt">${\u00E7("{n} {urun}",{n:sayi(x.qty),urun:esc(varlikAdi(x.asset))})} \xB7 ${Number(x.paid_cr)?\u00E7(
"{kr} kredi ald\u0131",{kr:kr(x.paid_cr)}):\u00E7("ba\u011F\u0131\u015F")}</div></div></div>`})),...(l.shifts??[]).map(x=>({t:Date.parse(x.starts_at),html:`<div class="liste-satir"><span class="liste-\
ikon">${ikon("hammer")}</span>
          <div><span class="tur">${esc(zamanOnce(x.starts_at))}</span><b>${esc(x.name)}</b><div class="alt">${\u00E7("{n} i\u015F birimi \xB7 {kr} kredi",{n:sayi(x.units),kr:kr(x.wage_cr)})}${x.status===
"cancelled"?" \xB7 "+\u00E7("kapand\u0131"):Date.parse(x.ends_at)>Date.now()?" \xB7 "+\u00E7("\xE7al\u0131\u015F\u0131yor"):""}</div></div></div>`}))].sort((a,b)=>b.t-a.t).slice(0,30),mallar=(p.materials??
[]).filter(m=>Number(m.left)>0);mallar.some(m=>m.asset===form.teslimMal)||(form.teslimMal=mallar[0]?.asset??null);const mal=mallar.find(m=>m.asset===form.teslimMal),enCok=mal?Math.max(0,Math.min(Number(
mal.left),Number(me.supplier_max?.[mal.asset]??0)-Number(me.delivered?.[mal.asset]??0),Durum.stok(mal.asset))):0;form.teslimAdet=Math.max(1,Math.min(form.teslimAdet,enCok||1));const gunluk=Math.max(0,
Number(me.work_max_per_day??4)-Number(me.work_today??0)),enCokIs=Math.min(gunluk,kalanIs,Number(me.work_max_per_day??4));form.isBirim=Math.max(1,Math.min(form.isBirim,enCokIs||1));const calisabilir=l.
status==="building"&&!engel;return`<section class="kart santiye-kart" id="santiye-kart" data-santiye="${esc(l.line_id)}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(hatTurAd(l.kind))} \xB7 ${esc(ulkeAdi(l.country_a))} \u2013 ${esc(ulkeAdi(l.country_b))}</p><h2 class="b2">${esc(hatAdi(l))}</h2></div>
          <span class="satir" style="gap:6px">${Gorunum.webglVar()?`<button class="dugme sade kucuk-d" id="santiye-mod" aria-pressed="${santiyeMod==="2b"}" title="${santiyeMod==="3b"?\u00E7("Hafif g\xF6r\
\xFCn\xFCme (2B) ge\xE7"):\u00E7("3B g\xF6r\xFCn\xFCme ge\xE7")}">${ikon("layers")}${santiyeMod==="3b"?\u00E7("2B"):\u00E7("3B")}</button>`:""}
            <button class="dugme sade kucuk-d" id="santiye-kapat" aria-label="${\u00E7("Kapat")}">${ikon("x")}</button></span></div>
        <div class="santiye-sahne sahne3b" id="santiye-sahne" data-mod="${santiyeMod}" data-durum="${esc(l.status)}">
          ${santiyeMod==="3b"?`<div class="yukleniyor${santiye3bOrnek?" bitti":""}" id="santiye-yukleniyor"><div class="yukleniyor-ic"><img src="img/amblem.png" alt=""><span>${\u00E7("\u015Eantiye a\xE7\u0131l\u0131yor\
\u2026")}</span></div></div>`:""}
          <div class="santiye-2b" id="santiye-2b"${santiyeMod==="3b"?" hidden":""}>${santiyeMod==="2b"?santiye2b(sd):""}</div>
        </div>
        <p class="kucuk" style="margin-top:8px" aria-live="polite">${yazi}</p>
        <div class="bilgi-izgara">
          <div><small>${\u00E7("B\xFCt\xE7e")}</small><b>${\u00E7("{kr} kredi",{kr:kr(l.budget_cr)})}</b></div>
          <div><small>${\u00E7("Kasada")}</small><b>${p.account_cr==null?"\u2014":\u00E7("{kr} kredi",{kr:kr(p.account_cr)})}</b></div>
          <div><small>${\u00E7("\u0130\u015F")}</small><b>${\u00E7("{a} / {b} birim",{a:sayi(p.work_done),b:sayi(l.work_units)})}</b></div>
          <div><small>${\u00E7("G\xFCnl\xFCk bak\u0131m (a\xE7\u0131l\u0131nca)")}</small><b>${\u00E7("{kr} kredi",{kr:kr(l.upkeep_cr)})}</b></div>
        </div>
        ${l.status==="building"?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Malzeme")}</p><div class="liste">${(p.materials??[]).map(satirMal).join("")}</div>
          ${engel?`<div class="yasa-bant uyari" style="margin-top:12px">${ikon("circle-alert")}<span>${esc(sunucuIletisi(engel.code,engel.hint))}</span></div>`:""}
          <div class="izgara iki" style="margin-top:12px">
            <form class="form" id="teslim-form" novalidate>
              <p class="ust-yazi">${\u00E7("Malzeme ver")}</p>
              ${mallar.length?`<label class="alan"><span>${\u00E7("Mal")}</span><select name="mal">${mallar.map(m=>`<option value="${esc(m.asset)}" ${m.asset===form.teslimMal?"selected":""}>${esc(varlikAdi(
m.asset))} \xB7 ${\u00E7("depoda {n}",{n:sayi(Durum.stok(m.asset))})}</option>`).join("")}</select></label>
                <label class="alan"><span>${\u00E7("Adet (en \xE7ok {n})",{n:sayi(enCok)})}</span><input name="adet" type="number" inputmode="numeric" min="1" max="${Math.max(1,enCok)}" value="${form.
teslimAdet}"></label>
                <label class="radyo"><input type="checkbox" name="bagis" ${form.bagis?"checked":""}><span><b>${\u00E7("Ba\u011F\u0131\u015Fla")}</b><span class="kucuk">${\u00E7("Para almadan ver; kasa\
daki para i\u015F\xE7ilere ve \xF6teki malzemeye kal\u0131r.")}</span></span></label>
                <p class="kucuk" id="teslim-bilgi">${form.bagis?\u00E7("Ba\u011F\u0131\u015F: para almazs\u0131n."):\u00E7("Kasadan alaca\u011F\u0131n: {kr} kredi",{kr:kr(form.teslimAdet*Number(mal?.price_cr??
0))})}</p>
                <button class="dugme altin" type="submit" ${calisabilir&&enCok>0?"":"disabled"}>${ikon("package")}${\u00E7("Teslim et")}</button>`:`<p class="bos">${\u00E7("B\xFCt\xFCn malzeme geldi.")}\
</p>`}
              <div class="form-mesaj"></div>
            </form>
            <form class="form" id="is-form" novalidate>
              <p class="ust-yazi">${\u00E7("\u015Eantiyede \xE7al\u0131\u015F")}</p>
              <p class="kucuk">${\u00E7("Kalan i\u015F {n} birim. Birim {dk} dakika, \xFCcreti {kr} kredi (ba\u015Fta \xF6denir). Bir \u015Fantiyede g\xFCnde en \xE7ok {g} birim; g\xFCnl\xFCk \xE7al\u0131\u015Fma s\u0131n\u0131r\u0131na say\u0131l\u0131r.",
{n:sayi(kalanIs),dk:sayi(l.unit_minutes??kural()?.lines?.unitMinutes??30),kr:kr(l.wage_cr),g:sayi(me.work_max_per_day??4)})}</p>
              ${kalanIs>0?`<label class="alan"><span>${\u00E7("Birim")}</span><select name="birim">${Array.from({length:Math.max(1,enCokIs)},(_,i)=>i+1).map(n=>`<option value="${n}" ${n===form.isBirim?
"selected":""}>${\u00E7("{n} birim \xB7 {kr} kredi",{n,kr:kr(n*Number(l.wage_cr))})}</option>`).join("")}</select></label>
                <button class="dugme altin" type="submit" ${calisabilir&&enCokIs>0?"":"disabled"}>${ikon("hammer")}${\u00E7("\xC7al\u0131\u015F")}</button>`:`<p class="bos">${\u00E7("Gereken i\u015F tamam;\
 s\xFCrenler bitince hat a\xE7\u0131l\u0131r.")}</p>`}
              <div class="form-mesaj"></div>
            </form>
          </div>`:""}
        ${l.status==="built"&&(l.upkeep??[]).length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Bak\u0131m")}</p><div class="oneri-dugmeler">${l.upkeep.slice(0,7).map(u=>`<span class="cip ${u.
paid?"yesil":"mercan"}">${u.paid?ikon("check"):ikon("x")}${esc(new Date(u.game_day+"T00:00:00Z").toLocaleDateString(DIL.yerel,{day:"numeric",month:"short"}))}</span>`).join("")}</div>`:""}
        <p class="ust-yazi" style="margin-top:12px">${\u00E7("Katk\u0131 verenler (herkese a\xE7\u0131k)")}</p>
        ${katkilar.length?`<div class="liste">${katkilar.map(x=>x.html).join("")}</div>`:`<p class="bos">${\u00E7("Hen\xFCz katk\u0131 yok.")}</p>`}
      </section>`}function hatTeklifKarti(){if(!baskan())return"";const ortaklar=[...new Set((v.d.borders??[]).map(b=>b.partner))].sort((a,b)=>ulkeAdi(a).localeCompare(ulkeAdi(b),DIL.yerel));if(!ortaklar.
length)return`<section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u015Fkan")}</p><h2 class="b2">${\u00E7("Ortak hat teklifi")}</h2></div><span class="ik-kutu">${ikon("tra\
in-front")}</span></div>
        <p class="bos">${\u00E7("\xDClkenin oyundaki bir \xFClkeyle ortak s\u0131n\u0131r\u0131 yok.")}</p></section>`;const ks=kenarlar(form.hatUlke),k=ks.find(x=>`${x.region}|${x.neighbor}`===form.hatKenar),
q=teklifQ,engel=q?.blocked;return`<section class="kart" id="hat-teklif">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u015Fkan")}</p><h2 class="b2">${\u00E7("Ortak hat teklifi")}</h2></div><span class="ik-kutu">${ikon("train-front")}</span></div>
        <form class="form" id="hat-form" novalidate>
          <label class="alan"><span>${\u00E7("Kom\u015Fu \xFClke")}</span><select name="ulke">${ortaklar.map(u=>`<option value="${esc(u)}" ${u===form.hatUlke?"selected":""}>${esc(ulkeAdi(u))}</option>`).
join("")}</select></label>
          <label class="alan"><span>${\u00E7("S\u0131n\u0131r")}</span><select name="kenar">${ks.map(x=>`<option value="${esc(x.region+"|"+x.neighbor)}" ${`${x.region}|${x.neighbor}`===form.hatKenar?"\
selected":""}>${esc(bolgeAdi(x.region))} \u2194 ${esc(bolgeAdi(x.neighbor))} \xB7 ${x.edge==="land"?\u00E7("kara"):\u00E7("deniz, {km} km",{km:sayi(x.km??0)})}${x.line?" \xB7 "+\u00E7("hatt\u0131 var"):
""}</option>`).join("")}</select></label>
          ${k?`<div class="radyo-liste">${k.kinds.map(t=>`<label class="radyo"><input type="radio" name="tur" value="${esc(t)}" ${t===form.hatTur?"checked":""}>
            <span><b>${ikon(HAT_TUR[t]?.ik??"route")} ${esc(hatTurAd(t))}</b><span class="kucuk">${t==="rail"?\u00E7("Kara s\u0131n\u0131r\u0131nda raylar ve tren."):t==="ferry"?\u00E7("Denizde iki k\u0131\
y\u0131 aras\u0131nda feribot."):\u00E7("K\u0131sa denizde k\xF6pr\xFC: pahal\u0131 ama bak\u0131m\u0131 ucuz.")}</span></span></label>`).join("")}</div>`:""}
          ${q?`<div class="bilgi-izgara">
              <div><small>${\u00E7("Malzeme")}</small><b>${Object.entries(q.materials??{}).map(([a,n])=>`${sayi(n)} ${esc(varlikAdi(a))}`).join(", ")}</b></div>
              <div><small>${\u00E7("\u0130\u015F")}</small><b>${\u00E7("{n} birim",{n:sayi(q.work_units)})}</b></div>
              <div><small>${\u00E7("B\xFCt\xE7e")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.budget_cr)})}</b></div>
              <div><small>${\u00E7("Bizim pay\u0131m\u0131z")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.share_a_cr)})}</b></div>
              <div><small>${\u00E7("Orta\u011F\u0131n pay\u0131")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.share_b_cr)})}</b></div>
              <div><small>${\u00E7("G\xFCnl\xFCk bak\u0131m")}</small><b>${\u00E7("{kr} kredi (yar\u0131 yar\u0131ya)",{kr:kr(q.upkeep_cr)})}</b></div>
              <div><small>${\u00E7("Hazinemiz")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.treasury_a_cr)})}</b></div>
              <div><small>${\u00E7("S\xFCre")}</small><b>${\u00E7("{n} g\xFCn",{n:sayi(q.deadline_days)})}</b></div>
            </div>
            ${engel?`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(sunucuIletisi(engel.code,engel.hint))}</span></div>`:""}`:""}
          <p class="kucuk">${\u00E7("\u0130ki meclis onaylay\u0131nca iki hazine paylar\u0131n\u0131 \u015Fantiye kasas\u0131na aktar\u0131r; yetmezse anla\u015Fma onaylanmam\u0131\u015F say\u0131l\u0131r. Malzemeyi ve eme\u011Fi oyuncular verir; kasadan sabit fiya\
tla \xF6denir.")}</p>
          <button class="dugme altin" type="submit" ${q&&!engel?"":"disabled"}>${ikon("send")}${\u00E7("Teklif et")}</button>
          <div class="form-mesaj"></div>
        </form>
      </section>`}function yardimKarti(){const a=v.d.aid,cubuk=(x,m)=>`<div class="cubuk deniz"><i style="width:${Math.min(100,100*Number(x)/Math.max(1,Number(m))).toFixed(1)}%"></i></div>`;return`<se\
ction class="kart" id="is-yardim">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kalk\u0131nma yard\u0131m\u0131 \xB7 son {n} g\xFCn",{n:sayi(a.window_days)})}</p><h2 class="b2">${esc(ulkeAdi(biz()))}</h2></div><span\
 class="ik-kutu">${ikon("hand-coins")}</span></div>
        <div class="bilgi-izgara">
          <div><small>${\u00E7("Verdi\u011Fimiz")}</small><b>${\u00E7("{a} / {b} kredi",{a:kr(a.given_cr),b:kr(a.given_max_cr)})}</b>${cubuk(a.given_cr,a.given_max_cr)}</div>
          <div><small>${\u00E7("Ald\u0131\u011F\u0131m\u0131z")}</small><b>${\u00E7("{a} / {b} kredi",{a:kr(a.received_cr),b:kr(a.received_max_cr)})}</b>${cubuk(a.received_cr,a.received_max_cr)}</div>\

          <div><small>${\u00E7("Hazine")}</small><b>${\u00E7("{kr} kredi",{kr:kr(v.d.treasury_cr)})}</b></div>
          <div><small>${\u00E7("Tek yard\u0131m en \xE7ok")}</small><b>${\u00E7("{kr} kredi ve hazinenin {oran}",{kr:kr(a.max_cr),oran:ppmYuzde(a.max_treasury_ppm)})}</b></div>
        </div>
        ${(a.history??[]).length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Son yard\u0131mlar")}</p><div class="liste">${a.history.map(t=>`<div class="liste-satir" data-yardim="${esc(t.treaty_id)}\
">
            <span class="liste-ikon ${t.status==="ended"?"yesil":"mercan"}">${ikon(t.status==="ended"?"hand-coins":"x")}</span>
            <div><span class="tur">${esc(saatYaz(t.closed_at??t.offered_at))}</span><b>${esc(ulkeAdi(t.country_a))} \u2192 ${esc(ulkeAdi(t.country_b))} \xB7 ${\u00E7("{kr} kredi",{kr:kr(t.aid_cr)})}</\
b>
              <div class="alt">${t.status==="ended"?\u00E7("Hazineye ge\xE7ti."):\u00E7("D\xFC\u015Ft\xFC: {neden}",{neden:esc(YARDIM_HATA[t.close_reason]??t.close_reason??\u00E7("meclis onaylamad\u0131"))})}\
</div></div></div>`).join("")}</div>`:""}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Yard\u0131m hazineden hazineye ge\xE7er; herkes g\xF6r\xFCr. Yeni para bas\u0131lmaz: iki \xFClkenin son d\xF6rt haftada verdi\u011Fi ve ald\u0131\u011F\u0131 toplam s\u0131n\u0131rl\u0131d\u0131r. \u0130ki \xFClke \
uyan\u0131k olmal\u0131, aralar\u0131nda sava\u015F olmamal\u0131; onay an\u0131nda \u015Fart tutmazsa yard\u0131m d\xFC\u015Fer.")}</p>
      </section>`}function yardimTeklifKarti(){if(!baskan())return"";const ulkeler=acikUlkeler();ulkeler.includes(form.yardimUlke)||(form.yardimUlke=ulkeler[0]??null);const a=v.d.aid,enCok=Math.max(0,
Math.min(Number(a.max_cr),Math.floor(Number(v.d.treasury_cr)*Number(a.max_treasury_ppm)/1e6),Number(a.given_max_cr)-Number(a.given_cr)));return`<section class="kart" id="yardim-teklif">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u015Fkan")}</p><h2 class="b2">${\u00E7("Yard\u0131m teklifi")}</h2></div><span class="ik-kutu">${ikon("hand-coins")}</span></div>
        <form class="form" id="yardim-form" novalidate>
          <label class="alan"><span>${\u00E7("Al\u0131c\u0131 \xFClke")}</span><select name="ulke">${ulkeler.map(u=>`<option value="${esc(u)}" ${u===form.yardimUlke?"selected":""}>${esc(ulkeAdi(u))}</\
option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Tutar (kredi; en \xE7ok {kr})",{kr:kr(enCok)})}</span><input name="tutar" inputmode="decimal" value="${esc(form.yardim)}" placeholder="${esc(kr(Math.min(enCok,
5e4)))}"></label>
          <p class="kucuk">${\u00E7("Al\u0131c\u0131 ba\u015Fkan kabul eder, iki meclis onaylar; onayla para hazineden hazineye ge\xE7er. Al\u0131c\u0131n\u0131n son d\xF6rt haftada alabilece\u011Fi de s\u0131n\u0131rl\u0131d\u0131r.")}\
</p>
          <button class="dugme altin" type="submit" ${enCok>0?"":"disabled"}>${ikon("send")}${\u00E7("Teklif et")}</button>
          <div class="form-mesaj"></div>
        </form>
      </section>`}const mesajHtml=m=>`<div class="mesaj ${m.author_id===benimKimlik()?"benim":""}" data-mesaj="${m.message_id}">
      <span class="mesaj-ust"><span class="ulke-nokta" style="background:${ulkeRenk(m.author_country_id)}"></span> <button class="baglanti" data-profil="${esc(m.author_id)}">${esc(m.author_name)}</but\
ton> \xB7 ${esc(zamanOnce(m.at))}${m.author_id===benimKimlik()?"":` <button class="mesaj-rapor" data-rapor="${m.message_id}|${esc(m.author_id)}" aria-label="${\u00E7("Raporla")}" title="${\u00E7("Rapo\
rla")}">${ikon("circle-alert")}</button>`}</span>
      ${sohbetGovdeHtml(m.body,t=>`<p>${esc(t)}</p>`)}</div>`;function elcilikKanalKarti(){const kanallar=v.ben.embassies??[];if(!hukumet()&&!kanallar.length)return`<section class="kart"><div class="k\
art-bas"><div><p class="ust-yazi">${\u00E7("El\xE7ilik kanal\u0131")}</p><h2 class="b2">${\u00E7("Yaln\u0131z h\xFCk\xFCmet")}</h2></div><span class="ik-kutu">${ikon("landmark")}</span></div>
          <p class="aciklama">${\u00E7("B\xFCy\xFCkel\xE7ilik maddeli anla\u015Fmada iki \xFClkenin ba\u015Fkanlar\u0131 ve milletvekilleri resm\xEE kanalda yaz\u0131\u015F\u0131r. Mesajlar \xFClke sohbeti kadar saklan\u0131r.")}\
</p></section>`;if(!kanallar.length)return`<section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("El\xE7ilik kanal\u0131")}</p><h2 class="b2">${\u00E7("Kanal yok")}</h2></div><\
span class="ik-kutu">${ikon("landmark")}</span></div>
          <p class="bos">${\u00E7("B\xFCy\xFCkel\xE7ilik maddeli bir anla\u015Fma y\xFCr\xFCrl\xFC\u011Fe girince kanal a\xE7\u0131l\u0131r.")}</p></section>`;const ck=v.kurallar.data.social.chat,k=kanallar.
find(x=>x.partner_id===kanal)??kanallar[0];return`<section class="kart sohbet" id="elcilik-kanal" data-kanal="${esc(k.partner_id)}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("El\xE7ilik kanal\u0131 \xB7 iki h\xFCk\xFCmet")}</p><h2 class="b2"><span class="ulke-nokta" style="background:${ulkeRenk(k.partner_id)}\
"></span> ${esc(ulkeAdi(k.partner_id))}</h2></div>
          <span class="ik-kutu">${ikon("landmark")}</span></div>
        ${kanallar.length>1?`<div class="akis-suzgec" role="tablist">${kanallar.map(x=>`<button class="altsekme" data-kanal-sec="${esc(x.partner_id)}" aria-pressed="${x.partner_id===k.partner_id}">
          <span class="ulke-nokta" style="background:${ulkeRenk(x.partner_id)}"></span> ${esc(ulkeAdi(x.partner_id))}</button>`).join("")}</div>`:""}
        ${k.at_war?`<div class="yasa-bant uyari">${ikon("swords")}<span>${\u00E7("\u0130ki \xFClke sava\u015Fta: anla\u015Fman\u0131n maddeleri ask\u0131da, kanal bar\u0131\u015F g\xF6r\xFC\u015Fmesi i\xE7in a\xE7\u0131k.")}\
</span></div>`:""}
        <p class="kucuk">${\u00E7("\u0130ki \xFClkenin ba\u015Fkanlar\u0131 ve milletvekilleri okur ve yazar. Mesajlar {n} g\xFCn saklan\u0131r; kurallara uymayan mesaj\u0131 raporla.",{n:90})}</p>
        <div class="mesajlar" id="mesajlar">${(kanalVeri?.messages??[]).map(mesajHtml).join("")||`<p class="bos">${\u00E7("Hen\xFCz mesaj yok.")}</p>`}</div>
        <form class="sohbet-yaz" id="elcilik-form" novalidate><input name="metin" maxlength="${ck.maxLength}" placeholder="${\u00E7("Resm\xEE mesaj yaz\u2026")}" autocomplete="off" aria-label="${\u00E7(
"Mesaj")}">
          <button class="dugme" type="submit" aria-label="${\u00E7("G\xF6nder")}">${ikon("send")}</button></form>
      </section>`}function sekmeler(){const b=(id,ad,ik,rozet)=>`<button class="altsekme" role="tab" data-is-sekme="${id}" aria-pressed="${sekme===id}">${ikon(ik)}${esc(ad)}${rozet?` <b class="sayi-ro\
zet">${sayi(rozet)}</b>`:""}</button>`,gelen=k=>(v.d.pending??[]).filter(t=>k.includes(t.kind)&&t.status==="offered"&&t.country_b===biz()).length;return`<div class="akis-suzgec" role="tablist">${b("or\
taklar",\u00E7("Ortaklar"),"heart-handshake",gelen(["cooperation"]))}${b("akis",\u00E7("Ak\u0131\u015F"),"truck",0)}${b("hatlar",\u00E7("Hatlar"),"train-front",gelen(["line"]))}
        ${b("yardim",\u00E7("Yard\u0131m"),"hand-coins",gelen(["aid"]))}${b("elcilik",\u00E7("El\xE7ilik"),"landmark",0)}</div>`}function ciz(){durdur();const ust=`<div class="sayfa-bas"><div>${ulkeUst(
biz())}<h1 class="b1">${\u00E7("\u0130\u015Fbirli\u011Fi")}</h1>
          <p class="aciklama">${\u00E7("\u0130ki \xFClkeye birlikte yarayan anla\u015Fmalar: ticaret, g\xFCmr\xFCk birli\u011Fi, serbest dola\u015F\u0131m, e\u011Fitim de\u011Fi\u015Fimi ve b\xFCy\xFCkel\xE7ilik; kalk\u0131nma yard\u0131m\u0131; ortak demiryolu, feribot ve\
 k\xF6pr\xFC. Hepsi iki meclisin onay\u0131yla.")}</p></div>
          ${v.d.dormant?`<span class="cip">${ikon("moon")}${\u00E7("\xDClke uyuyor: anla\u015Fma yap\u0131lamaz")}</span>`:""}</div>`;let govde="";sekme==="ortaklar"?govde=`${elcilikKarti()}${bekleyenKarti(
bekleyen(["cooperation"]),\u00E7("\u0130\u015Fbirli\u011Fi teklifleri"))}${ortaklarKarti()}${isbirligiTeklifKarti()}`:sekme==="akis"?govde='<div id="akis-yer"></div>':sekme==="hatlar"?govde=`${santiyeKarti()}${bekleyenKarti(
bekleyen(["line"]),\u00E7("Hat teklifleri"))}${hatlarKarti()}${hatTeklifKarti()}`:sekme==="yardim"?govde=`${bekleyenKarti(bekleyen(["aid"]),\u00E7("Yard\u0131m teklifleri"))}${yardimKarti()}${yardimTeklifKarti()}`:
govde=`${elcilikKanalKarti()}`,kap.innerHTML=`<div class="sayfa sayfa-dar">${ust}${sekmeler()}<div class="yigin" style="margin-top:12px">${govde}</div></div>`;const ay=$("#akis-yer",kap);ay?(ay.replaceWith(
akisKart.el),akisKart.yaz({biz:biz(),status:v.d,akis:akisVeri})):akisKart.birak(),bagla(),sekme==="ortaklar"?elcilikBagla():elcilikBirak(),sekme==="hatlar"&&hat?santiyeBagla():santiyeBirak();const m=$(
"#mesajlar",kap);m&&(m.scrollTop=m.scrollHeight),durdur=geriSay(kap,()=>tazele()),santiyeOynat=!1}function elcilikBirak(){elcilik3bOrnek&&Uc.cizici?.etkin===elcilik3bOrnek&&Uc.cizici.birak(elcilik3bOrnek)}
async function elcilikBagla(){const kutu=$("#elcilik-sahne",kap);if(!kutu){elcilikBirak();return}if(elcilikMod!=="3b"){elcilikBirak();return}try{const{THREE,cizici}=await Uc.yukle("54_isbirligi.js");if(kapandi||
elcilikMod!=="3b"||$("#elcilik-sahne",kap)!==kutu)return;if(elcilik3bOrnek??=elcilik3bKur(THREE,cizici),elcilik3bOrnek.durumYaz(elcilikDurumu()),!cizici.bagla(elcilik3bOrnek,kutu))throw new Error("web\
gl-bagla");$("#elcilik-yukleniyor",kutu)?.classList.add("bitti")}catch(e){if(console.warn("3B b\xFCy\xFCkel\xE7ilik a\xE7\u0131lamad\u0131:",e),kapandi)return;elcilikHata=!0,elcilikMod="2b",tost(\u00E7(
"3B b\xFCy\xFCkel\xE7ilik bu cihazda a\xE7\u0131lamad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),"layers"),ciz()}}function santiyeBirak(){santiye3bOrnek&&Uc.cizici?.etkin===santiye3bOrnek&&Uc.cizici.
birak(santiye3bOrnek)}async function santiyeBagla(){const kutu=$("#santiye-sahne",kap);if(!kutu||!hat){santiyeBirak();return}if(santiyeMod!=="3b"){santiyeBirak();return}const sd=santiyeDurumu();try{const{
THREE,cizici}=await Uc.yukle("54_isbirligi.js");if(kapandi||santiyeMod!=="3b"||$("#santiye-sahne",kap)!==kutu)return;if(santiye3bOrnek??=santiye3bKur(THREE,cizici),santiye3bOrnek.durumYaz(sd),!cizici.
bagla(santiye3bOrnek,kutu))throw new Error("webgl-bagla");$("#santiye-yukleniyor",kutu)?.classList.add("bitti")}catch(e){if(console.warn("3B \u015Fantiye a\xE7\u0131lamad\u0131:",e),kapandi)return;santiyeHata=
!0,santiyeMod="2b",tost(\u00E7("3B \u015Fantiye bu cihazda a\xE7\u0131lamad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),"layers"),ciz()}}function bagla(){for(const b of $$("[data-is-sekme]",kap))
b.onclick=async()=>{sekme!==b.dataset.isSekme&&(sekme=b.dataset.isSekme,await tazele())};for(const b of $$("[data-is-kabul]",kap))b.onclick=()=>pencere({ust:\u00E7("\u0130\u015Fbirli\u011Fi"),baslik:\u00E7(
"Teklifi kabul et"),govde:`<p class="aciklama">${\u00E7("Kabul edince iki \xFClkenin meclisinde onay oylamas\u0131 a\xE7\u0131l\u0131r; ikisi de onaylarsa y\xFCr\xFCrl\xFC\u011Fe girer.")}</p>`,dugmeler:[
{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Kabul et"),sinif:"altin",ikon:"check",is:()=>islem("treaty_respond",{p_treaty:b.dataset.isKabul,p_accept:!0},\u00E7("Teklifi kabul ettin; iki meclisin onay\u0131na gitt\
i."))}]});for(const b of $$("[data-is-karsi]",kap))b.onclick=()=>karsiTeklif((v.d.pending??[]).find(t=>t.treaty_id===b.dataset.isKarsi));for(const b of $$("[data-is-ret]",kap))b.onclick=()=>pencere({ust:\u00E7(
"\u0130\u015Fbirli\u011Fi"),baslik:\u00E7("Teklifi reddet"),govde:`<p class="aciklama">${karsiOlur((v.d.pending??[]).find(t=>t.treaty_id===b.dataset.isRet)??{})?\u00E7("Reddedilen teklif kapan\u0131r. \u015Eart\
lar\u0131 de\u011Fi\u015Ftirmek istersen reddetmek yerine kar\u015F\u0131 teklif yap."):\u00E7("Reddedilen teklif kapan\u0131r; istersen sonra kendi teklifini yapars\u0131n.")}</p>`,dugmeler:[{ad:\u00E7(
"Vazge\xE7")},{ad:\u00E7("Reddet"),sinif:"mercan",ikon:"x",is:()=>islem("treaty_respond",{p_treaty:b.dataset.isRet,p_accept:!1},\u00E7("Teklif reddedildi."))}]});for(const b of $$("[data-is-geri]",kap))
b.onclick=()=>pencere({ust:\u00E7("\u0130\u015Fbirli\u011Fi"),baslik:\u00E7("Teklifi geri \xE7ek"),govde:`<p class="aciklama">${\u00E7("Teklif kapan\u0131r; a\xE7\u0131lm\u0131\u015F meclis oylamalar\u0131 da kapan\u0131r.")}\
</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Geri \xE7ek"),sinif:"mercan",ikon:"x",is:()=>islem("treaty_withdraw",{p_treaty:b.dataset.isGeri},\u00E7("Teklif geri \xE7ekildi."))}]});for(const b of $$(
"[data-is-fesih]",kap))b.onclick=()=>pencere({ust:\u00E7("\u0130\u015Fbirli\u011Fi"),baslik:\u00E7("Fesih bildir"),govde:`<p class="aciklama">${b.dataset.isFesihHat?\u00E7("Hatt\u0131n anla\u015Fmas\u0131 {n} saat s\
onra sona erer; hat o zaman kapan\u0131r. \u015Eantiyedeyse harcanmayan para hazinelere d\xF6ner.",{n:sayi(kural()?.notice_h??72)}):\u00E7("Anla\u015Fma {n} saat sonra sona erer; o zamana kadar maddeler s\xFC\
rer. Ortak hatlar\u0131n kendi anla\u015Fmas\u0131 vard\u0131r.",{n:sayi(kural()?.notice_h??72)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Fesih bildir"),sinif:"mercan",ikon:"scroll-text",
is:()=>islem("treaty_terminate",{p_treaty:b.dataset.isFesih},\u00E7("Fesih bildirildi."))}]});for(const b of $$("[data-is-degistir]",kap))b.onclick=()=>{const t=(v.d.partners??[]).find(x=>x.partner===
b.dataset.isDegistir);form.ulke=b.dataset.isDegistir,form.maddeler=new Set(t?.clauses??[]),ciz(),$("#is-teklif",kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})};for(const b of $$(
"[data-elcilik-sec]",kap))b.onclick=()=>{elcilikSec=b.dataset.elcilikSec,ciz()};$("#elcilik-mod",kap)?.addEventListener("click",()=>{elcilikHata=!1,Gorunum.ayarla(elcilikMod==="3b"?"2b":"3b"),tost(elcilikMod===
"3b"?\u00E7("Hafif g\xF6r\xFCn\xFCm (2B) se\xE7ildi. Ayarlar'dan de\u011Fi\u015Ftirebilirsin."):\u00E7("3B g\xF6r\xFCn\xFCm se\xE7ildi."),"layers")}),$("#santiye-mod",kap)?.addEventListener("click",()=>{
santiyeHata=!1,Gorunum.ayarla(santiyeMod==="3b"?"2b":"3b"),tost(santiyeMod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCm (2B) se\xE7ildi. Ayarlar'dan de\u011Fi\u015Ftirebilirsin."):\u00E7("3B g\xF6r\xFCn\xFCm se\xE7ildi."),
"layers")});for(const b of $$("[data-hat-ac]",kap))b.onclick=async()=>{hatId=b.dataset.hatAc,await tazele(),$("#santiye-kart",kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})};
$("#santiye-kapat",kap)?.addEventListener("click",()=>{hatId=null,hat=null,ciz()});for(const b of $$("[data-kanal-sec]",kap))b.onclick=async()=>{kanal=b.dataset.kanalSec,kanalVeri=null,await tazele()};
for(const b of $$("[data-profil]",kap))b.onclick=()=>profilAc(b.dataset.profil,tazele);for(const b of $$("[data-rapor]",kap))b.onclick=()=>{const[m,k]=b.dataset.rapor.split("|");raporla({mesaj:Number(
m),kisi:k})};const fi=$("#isbirligi-form",kap);fi?.addEventListener("change",e=>{const kutu=m=>$(`input[name=madde][value=${m}]`,fi);e.target.name==="madde"&&e.target.value==="customs_union"&&e.target.
checked&&kutu("trade")&&(kutu("trade").checked=!0),e.target.name==="madde"&&e.target.value==="trade"&&!e.target.checked&&kutu("customs_union")&&(kutu("customs_union").checked=!1);const fd=new FormData(
fi);form.ulke=String(fd.get("ulke")),form.maddeler=new Set(fd.getAll("madde").map(String)),e.target.name==="ulke"&&ciz()}),fi?.addEventListener("submit",async e=>{e.preventDefault();const yer=$(".form\
-mesaj",fi),b=$("button[type=submit]",fi);b.disabled=!0;try{await Sunucu.yap("coop_offer",{p_target_country:form.ulke,p_clauses:[...form.maddeler]}),tost(\u00E7("Teklif g\xF6nderildi. Yan\u0131t\u0131 kar\u015F\u0131 \xFClkeni\
n ba\u015Fkan\u0131 verir."),"send"),await tazele()}catch(err){yer.innerHTML=`<div class="hata-kutusu" style="margin-top:12px">${ikon("circle-alert")}<span>${esc(hataMetni(err))}</span></div>`,b.disabled=
!1}});const fh=$("#hat-form",kap);fh?.addEventListener("change",async e=>{const fd=new FormData(fh);form.hatUlke=String(fd.get("ulke")),e.target.name!=="ulke"&&(form.hatKenar=String(fd.get("kenar"))),
e.target.name==="tur"&&(form.hatTur=String(fd.get("tur"))),await teklifHazirla(),kapandi||ciz()}),fh?.addEventListener("submit",async e=>{e.preventDefault();const yer=$(".form-mesaj",fh),b=$("button[t\
ype=submit]",fh),[a,c]=String(form.hatKenar??"").split("|");b.disabled=!0;try{await Sunucu.yap("line_offer",{p_target_country:form.hatUlke,p_region_a:a,p_region_b:c,p_kind:form.hatTur}),tost(\u00E7("H\
at teklifi g\xF6nderildi. Yan\u0131t\u0131 kar\u015F\u0131 \xFClkenin ba\u015Fkan\u0131 verir."),"send"),teklifQAnahtar="",await tazele()}catch(err){yer.innerHTML=`<div class="hata-kutusu" style="marg\
in-top:12px">${ikon("circle-alert")}<span>${esc(hataMetni(err))}</span></div>`,b.disabled=!1}});const fy=$("#yardim-form",kap);fy?.addEventListener("input",()=>{const fd=new FormData(fy);form.yardimUlke=
String(fd.get("ulke")),form.yardim=String(fd.get("tutar")??"")}),fy?.addEventListener("submit",async e=>{e.preventDefault();const yer=$(".form-mesaj",fy),b=$("button[type=submit]",fy),tutar=krediAlt(form.
yardim);if(!(tutar>0)){yer.innerHTML=`<div class="hata-kutusu" style="margin-top:12px">${ikon("circle-alert")}<span>${\u00E7("Tutar\u0131 denetle.")}</span></div>`;return}b.disabled=!0;try{await Sunucu.
yap("aid_offer",{p_target_country:form.yardimUlke,p_amount:tutar}),tost(\u00E7("Yard\u0131m teklifi g\xF6nderildi. Yan\u0131t\u0131 al\u0131c\u0131 \xFClkenin ba\u015Fkan\u0131 verir."),"send"),form.yardim=
"",await tazele()}catch(err){yer.innerHTML=`<div class="hata-kutusu" style="margin-top:12px">${ikon("circle-alert")}<span>${esc(hataMetni(err))}</span></div>`,b.disabled=!1}});const ft=$("#teslim-form",
kap);ft?.addEventListener("input",e=>{const fd=new FormData(ft),yeniMal=String(fd.get("mal")??form.teslimMal);if(form.bagis=fd.get("bagis")==="on",form.teslimAdet=Math.max(1,Number(fd.get("adet"))||1),
yeniMal!==form.teslimMal){form.teslimMal=yeniMal,ciz();return}const mal=(hat?.progress?.materials??[]).find(m=>m.asset===form.teslimMal),bilgi=$("#teslim-bilgi",ft);bilgi&&(bilgi.textContent=form.bagis?
\u00E7("Ba\u011F\u0131\u015F: para almazs\u0131n."):\u00E7("Kasadan alaca\u011F\u0131n: {kr} kredi",{kr:kr(form.teslimAdet*Number(mal?.price_cr??0))}))}),ft?.addEventListener("submit",async e=>{e.preventDefault();
const yer=$(".form-mesaj",ft),b=$("button[type=submit]",ft),mal=(hat?.progress?.materials??[]).find(m=>m.asset===form.teslimMal);if(!mal)return;const beklenen=form.bagis?0:form.teslimAdet*Number(mal.price_cr);
b.disabled=!0;try{const r=await Sunucu.yap("line_deliver",{p_line:hat.line_id,p_asset:mal.asset,p_qty:form.teslimAdet,p_donate:form.bagis,p_expected_cr:beklenen});tost(Number(r.paid_cr)?\u00E7("{n} {u\
run} teslim ettin; {kr} kredi ald\u0131n.",{n:sayi(r.qty),urun:varlikAdi(r.asset),kr:kr(r.paid_cr)}):\u00E7("{n} {urun} ba\u011F\u0131\u015Flad\u0131n. Te\u015Fekk\xFCrler!",{n:sayi(r.qty),urun:varlikAdi(
r.asset)}),"package"),santiyeOynat=!0,Durum.ozet().catch(()=>{}),await tazele()}catch(err){yer.innerHTML=`<div class="hata-kutusu" style="margin-top:12px">${ikon("circle-alert")}<span>${esc(hataMetni(
err))}</span></div>`,b.disabled=!1}});const fw=$("#is-form",kap);fw?.addEventListener("change",()=>{form.isBirim=Number(new FormData(fw).get("birim"))||1}),fw?.addEventListener("submit",async e=>{e.preventDefault();
const yer=$(".form-mesaj",fw),b=$("button[type=submit]",fw);b.disabled=!0;try{const r=await Sunucu.yap("line_work",{p_line:hat.line_id,p_units:form.isBirim,p_expected_wage:form.isBirim*Number(hat.wage_cr)});
tost(\u00E7("\u015Eantiyede \xE7al\u0131\u015F\u0131yorsun: {n} birim, {kr} kredi hesab\u0131na ge\xE7ti. Biti\u015F {zaman}.",{n:sayi(r.units),kr:kr(r.wage_cr),zaman:saatYaz(r.ends_at)}),"hammer"),santiyeOynat=
!0,Durum.ozet().catch(()=>{}),await tazele()}catch(err){yer.innerHTML=`<div class="hata-kutusu" style="margin-top:12px">${ikon("circle-alert")}<span>${esc(hataMetni(err))}</span></div>`,b.disabled=!1}});
const fe=$("#elcilik-form",kap);fe?.addEventListener("submit",async e=>{e.preventDefault();const g=$("input",fe),metin=g.value.trim();if(!metin)return;const b=$("button",fe);b.disabled=!0;try{await Sunucu.
yap("embassy_send",{p_country:$("#elcilik-kanal",kap).dataset.kanal,p_body:metin}),g.value="",sonMesaj=Date.now(),await tazele(),$("#elcilik-form input",kap)?.focus()}catch(err){err.kod==="TERMS_REQUI\
RED"&&kurallariKabul(),tost(hataMetni(err),"circle-alert"),b.disabled=!1}})}function karsiTeklif(t){if(!t)return;const ulke=t.country_a,tur=Number(t.round??1)+1,giris=\u00E7("{ulke} teklifinin \u015Fartlar\
\u0131n\u0131 de\u011Fi\u015Ftirip geri g\xF6nderirsin: bu teklif kapan\u0131r, yeni teklif {ulke} ba\u015Fkan\u0131na gider. Bu g\xF6r\xFC\u015Fmede en \xE7ok {n} kar\u015F\u0131 teklif yap\u0131l\u0131r; bu {t}. tur olacak.",
{ulke:esc(ulkeAdi(ulke)),n:Number(sayac()?.maxCounters??3),t:tur});if(t.kind==="cooperation"){const maddeler=kural()?.clauses??["embassy","trade","customs_union","free_movement","education"],secili=new Set(
t.clauses??[]);pencereForm({ust:\u00E7("\u0130\u015Fbirli\u011Fi"),baslik:\u00E7("Kar\u015F\u0131 teklif \xB7 i\u015Fbirli\u011Fi"),onayAd:\u00E7("Kar\u015F\u0131 teklifi g\xF6nder"),onayIkon:"repeat-\
2",govde:`<p class="aciklama">${giris}</p><div class="radyo-liste">${maddeler.map(m=>`<label class="radyo"><input type="checkbox" name="madde" value="${esc(m)}" ${secili.has(m)?"checked":""}>
            <span><b>${ikon(IS_MADDE_IKON[m]??"check")} ${esc(isMaddeAd(m))}</b><span class="kucuk">${isMaddeEtki(m,kural())}</span></span></label>`).join("")}</div>`,is:async d2=>{const l=d2.getAll("\
madde").map(String);if(!l.length)throw new Error(\u00E7("En az bir madde se\xE7."));await Sunucu.yap("treaty_counter",{p_treaty:t.treaty_id,p_terms:{clauses:l}}),tost(\u00E7("Kar\u015F\u0131 teklif g\xF6nderildi. \
Yan\u0131t\u0131 {ulke} ba\u015Fkan\u0131 verir.",{ulke:ulkeAdi(ulke)}),"repeat-2"),await tazele()}});return}if(t.kind!=="line")return;const ks=kenarlar(ulke),once=t.line?`${t.line.region_b}|${t.line.
region_a}`:null;let kenar=ks.some(k=>`${k.region}|${k.neighbor}`===once)?once:ks[0]?`${ks[0].region}|${ks[0].neighbor}`:null;const turlerHtml=(k,sec)=>k?k.kinds.map(x=>`<label class="radyo"><input typ\
e="radio" name="tur" value="${esc(x)}" ${x===(k.kinds.includes(sec)?sec:k.kinds[0])?"checked":""}>
        <span><b>${ikon(HAT_TUR[x]?.ik??"route")} ${esc(hatTurAd(x))}</b></span></label>`).join(""):"",p=pencereForm({ust:\u00E7("\u0130\u015Fbirli\u011Fi"),baslik:\u00E7("Kar\u015F\u0131 teklif \xB7 ortak hat"),
onayAd:\u00E7("Kar\u015F\u0131 teklifi g\xF6nder"),onayIkon:"repeat-2",govde:`<p class="aciklama">${giris}</p>
          <label class="alan"><span>${\u00E7("S\u0131n\u0131r")}</span><select name="kenar">${ks.map(x=>`<option value="${esc(x.region+"|"+x.neighbor)}" ${`${x.region}|${x.neighbor}`===kenar?"selected":
""}>${esc(bolgeAdi(x.region))} \u2194 ${esc(bolgeAdi(x.neighbor))} \xB7 ${x.edge==="land"?\u00E7("kara"):\u00E7("deniz, {km} km",{km:sayi(x.km??0)})}</option>`).join("")}</select></label>
          <div class="radyo-liste" id="karsi-hat-tur">${turlerHtml(ks.find(x=>`${x.region}|${x.neighbor}`===kenar),t.line?.kind)}</div>
          <p class="kucuk">${\u00E7("B\xFCt\xE7e ve paylar yeni teklifte hatt\u0131n t\xFCr\xFCne ve uzunlu\u011Funa g\xF6re yeniden hesaplan\u0131r.")}</p>`,is:async d2=>{const[a,b]=String(d2.get("ke\
nar")??"").split("|"),x=String(d2.get("tur")??"");if(!a||!b||!x)throw new Error(\u00E7("S\u0131n\u0131r\u0131 ve hatt\u0131n t\xFCr\xFCn\xFC se\xE7."));await Sunucu.yap("treaty_counter",{p_treaty:t.treaty_id,
p_terms:{region_a:a,region_b:b,kind:x}}),tost(\u00E7("Kar\u015F\u0131 teklif g\xF6nderildi. Yan\u0131t\u0131 {ulke} ba\u015Fkan\u0131 verir.",{ulke:ulkeAdi(ulke)}),"repeat-2"),await tazele()}});$("sel\
ect[name=kenar]",p.form)?.addEventListener("change",e=>{kenar=e.target.value;const k=ks.find(x=>`${x.region}|${x.neighbor}`===kenar);$("#karsi-hat-tur",p.form).innerHTML=turlerHtml(k,k?.kinds.includes(
t.line?.kind)?t.line.kind:k?.kinds[0])})}async function islem(fn,args,mesaj){for(const b of $$("button",kap))b.disabled=!0;try{await Sunucu.yap(fn,args),mesaj&&tost(mesaj,"handshake")}catch(e){tost(hataMetni(
e),"circle-alert")}await tazele()}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()});await yukle(),ciz();const b1=Durum.dinle("diplomasi",()=>tazele()),b2=Sunucu.Canli.dinle("public:coop\
_line",(olay,yuk)=>{const x=yuk?.data??{};(x.line_id===hatId||x.country_a===biz()||x.country_b===biz())&&tazele()}),b3=Durum.dinle("ulke-olay",({olay})=>{/^(coop\.|parliament\.motion_closed|country\.war_|office\.installed)/.
test(olay)&&tazele()}),b4=Durum.dinle("olay",({olay,yuk})=>{if(olay==="chat.message"&&yuk?.data?.channel==="embassy"){sonMesaj=Date.now(),sekme==="elcilik"&&(yuk.data.partner_id===kanal||yuk.data.country_id===
kanal)?tazele():sekme==="ortaklar"&&elcilik3bOrnek?.durumYaz?.(elcilikDurumu());return}/^coop\./.test(olay)&&tazele()}),b5=Gorunum.dinle(()=>{const e=Gorunum.uc()&&!elcilikHata?"3b":"2b",s=Gorunum.uc()&&
!santiyeHata?"3b":"2b";(e!==elcilikMod||s!==santiyeMod)&&v&&(elcilikMod=e,santiyeMod=s,ciz())}),akisSaat=setInterval(async()=>{if(!(kapandi||sekme!=="akis"||document.hidden||!akisKart.el.isConnected||
Date.now()-akisAn<55e3)){akisAn=Date.now();try{akisVeri=await Sunucu.cagir("coop_flow"),akisKart.yaz({biz:biz(),status:v.d,akis:akisVeri})}catch{}}},15e3);return()=>{kapandi=!0,durdur(),clearInterval(
akisSaat),b1(),b2(),b3(),b4(),b5(),elcilikBirak(),santiyeBirak(),akisKart.kapat()}}}),Parcalar.tamam("ek_54_isbirligi");
