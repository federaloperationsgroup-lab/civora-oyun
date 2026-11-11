// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_98p_studyo.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/studyo",{async ac(kap){let v=null,m=null,kapandi=!1,durdur=()=>{};const sahne=StudyoSahnesi.ac();sahne.dinle("sec",(ad,id)=>{if(ad==="kisi"){id&&profilAc(id,()=>tazele());return}if(ad===
"ep"){id&&epKartiAc(id,()=>tazele());return}const el=$({masa:"#studyo-kayitta",levha:"#studyo-son"}[ad]??"#yok",kap);el&&(el.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"}),el.classList.
remove("vurgu-yan"),el.offsetWidth,el.classList.add("vurgu-yan"))});const ben=()=>Durum.v.ozet?.character??{};let bekleyen=null;const yakinda=()=>{clearTimeout(bekleyen),bekleyen=setTimeout(()=>{kapandi||
tazele()},500)};let kanal=null,kanalBirak=null;async function yukle(){v=await Sunucu.cagir("studio_view",{p_region:null});const id=v?.my_band?.band_id??null;id!==kanal&&(kanalBirak?.(),kanalBirak=null,
kanal=id,id&&(kanalBirak=Sunucu.Canli.dinle("band:"+id,olay=>{/^band\.(recording|ep)/.test(olay)&&yakinda()})))}async function muzikYukle(){return m=await Sunucu.cagir("music_overview"),m}function kayittaHtml(){
const hepsi=v.recording_now??[],benId=ben().id,l=[...hepsi.filter(k=>k.character_id===benId),...hepsi.filter(k=>k.character_id!==benId)].slice(0,20);return`<section class="kart" id="studyo-kayitta"><d\
iv class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kabin")}</p>
          <h2 class="b2">${hepsi.length?\u00E7("{n} ki\u015Fi kay\u0131tta",{n:hepsi.length}):\u00E7("Kabin bo\u015F")}</h2></div><span class="ik-kutu">${ikon("mic")}</span></div>
        ${l.length?`<div class="liste">${l.map(k=>`<div class="liste-satir"><span class="liste-ikon">${avatarKutu(k.name,k.character_id)}</span>
            <div><span class="tur">${esc(k.band_name??"")} \xB7 ${esc(MUZIK_ROL[k.stage_role]??"")}</span><b><button class="baglanti" type="button" data-profil="${esc(k.character_id)}">${esc(k.name)}<\
/button></b>
              <div class="alt">${\u00E7("{sarki} \xB7 {n} / {g} birim \xB7 biti\u015F {zaman}",{sarki:esc(k.title??""),n:Number(k.progress??0),g:Number(k.needed??8),zaman:esc(saatYaz(k.ends_at))})}</d\
iv></div>
            <span class="cip"><b data-bitis="${esc(k.ends_at)}"></b></span></div>`).join("")}</div>${hepsi.length>l.length?`<p class="kucuk" data-studyo-fazla>${\u00E7("ve {n} ki\u015Fi daha kay\u0131tta",
{n:hepsi.length-l.length})}</p>`:""}`:`<p class="bos">${\u00E7("\u015Eu an kabinde kimse yok. Bug\xFCn {n} oturum yap\u0131ld\u0131.",{n:Number(v.today??0)})}</p>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Her \u015Fehirde devletin st\xFCdyosu var. Grubun \xFCyesi bulundu\u011Fu \u015Fehirde repertuvar\u0131ndan bir \u015Fark\u0131y\u0131 kaydeder; oturum {min}\u2013{max} birim, birim ba\u015F\u0131na\
 {kr} kredi kira kasadan belediyeye.",{min:Number(v.rule?.sessionUnits?.min??1),max:Number(v.rule?.sessionUnits?.max??4),kr:kr(v.rule?.feePerUnitCr??100)})}</p></section>`}function grubumHtml(){const g=v.
my_band;if(!g)return`<section class="kart" id="studyo-grubum"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Grubun")}</p><h2 class="b2">${\u00E7("Grubun yok")}</h2></div><span class="ik-kut\
u">${ikon("eighth-notes")}</span></div>
          <p class="bos">${\u00E7("Bir gruba kat\u0131l ya da grup kur; \u015Fark\u0131 yaz\u0131p bitirince burada kaydedersin.")}</p>
          <div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="hayat/muzik">${ikon("eighth-notes")}${\u00E7("M\xFCzik")}</button></div></section>`;const suren=g.recordings??
[],aday=(g.recordable??[]).filter(s=>!suren.some(k=>k.song_id===s.song_id)),burada=v.here&&v.open,satir=(k,sure)=>`<div class="liste-satir"><span class="liste-ikon"><span class="ozet-ikon">${ikon(sure?
"audio-lines":"eighth-notes")}</span></span>
          <div><span class="tur">${sure?\u00E7("{n} / {g} birim",{n:Number(k.units),g:Number(k.needed??8)}):\u00E7("\u015Fark\u0131 kalitesi {q}",{q:Number(k.quality??0)})}</span><b>${esc(k.title)}</b\
></div>
          <button class="dugme kucuk-d" data-kayit-yap="${esc(k.song_id)}" ${burada?"":"disabled"}>${ikon("mic")}${\u00E7("Kaydet")}</button></div>`;return`<section class="kart" id="studyo-grubum"><di\
v class="kart-bas"><div><p class="ust-yazi">${\u00E7("Grubun")} \xB7 ${esc(g.name??"")}</p>
          <h2 class="b2">${suren.length?\u00E7("{n} kayd\u0131n s\xFCr\xFCyor",{n:suren.length}):\u00E7("Kay\u0131t yap")}</h2></div><span class="ik-kutu">${ikon("disc-3")}</span></div>
        ${v.here?v.open?"":`<div class="bilgi-kutusu" style="margin-bottom:10px">${ikon("circle-alert")}<span>${\u00E7("Bu \u015Fehirde st\xFCdyo yok.")}</span></div>`:`<div class="bilgi-kutusu" style\
="margin-bottom:10px">${ikon("map-pin")}<span>${\u00E7("Kay\u0131t i\xE7in bu \u015Fehirde olmal\u0131s\u0131n.")}</span></div>`}
        ${suren.length||aday.length?`<div class="liste">${suren.map(k=>satir(k,!0)).join("")}${aday.map(k=>satir(k,!1)).join("")}</div>`:`<p class="bos">${\u00E7("Kaydedilecek \u015Fark\u0131 yok: repertuvardak\
i bitmi\u015F \u015Fark\u0131lar burada kaydedilir.")}</p>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Kasada harcanabilir {kr} kredi.",{kr:kr(g.free_cr??0)})}</p>
        <div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="hayat/muzik">${ikon("eighth-notes")}${\u00E7("M\xFCzik")}</button></div></section>`}function studyolarHtml(){
const l=v.studios??[],R=v.studio_rule??{},benimki=l.find(x=>x.role),satir=x=>`<div class="liste-satir mekan-satir${x.status!=="open"||x.door==="closed"&&!x.role||x.door==="friends"&&!x.role&&!x.friend?
" kapali":""}" data-studyo-satir="${esc(x.venue_id)}"><span class="liste-ikon ${Number(x.recording_now)?"altin":x.role?"yesil":""}">${ikon("mic")}</span>
          <div><span class="tur">${esc([\u00E7("sahibi {ad}",{ad:x.owner??""}),x.status==="suspended"?\u00E7("ask\u0131da"):x.door==="closed"?\u00E7("kap\u0131s\u0131 kapal\u0131"):x.door==="friends"?
\u00E7("arkada\u015Flar\u0131na a\xE7\u0131k"):\u00E7("herkese a\xE7\u0131k")].join(" \xB7 "))}</span><b>${esc(x.name)}</b>
            <div class="alt">${esc([\u00E7("birim {kr} kredi",{kr:kr(x.record_fee_cr??0)}),\u00E7("kalite eki +{n}",{n:Number(x.studio_bonus??0)}),Number(x.recording_now)?\u00E7("{n} ki\u015Fi kay\u0131tta",
{n:Number(x.recording_now)}):Number(x.people)?\u00E7("i\xE7eride {n} ki\u015Fi",{n:Number(x.people)}):null].filter(Boolean).join(" \xB7 "))}</div></div>
          <div class="mekan-satir-dugmeler"><button class="dugme kucuk-d" data-mekan-git="${esc(x.venue_id)}" ${x.status==="suspended"&&!x.role?"disabled":""}>${ikon("door-open")}${\u00E7("Gir")}</but\
ton>
            ${x.role?`<button class="dugme ikincil kucuk-d" data-mekan-yonet="${esc(x.venue_id)}">${ikon("settings")}${\u00E7("Y\xF6net")}</button>`:""}</div></div>`;return`<section class="kart" id="s\
tudyo-oyuncu"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Oyuncu st\xFCdyolar\u0131")}</p>
          <h2 class="b2">${l.length?\u00E7("\u015Eehirde {n} st\xFCdyo",{n:l.length}):\u00E7("\u015Eehirde oyuncu st\xFCdyosu yok")}</h2></div><span class="ik-kutu">${ikon("mic")}</span></div>
        <p class="kucuk">${\u00E7("Devletin st\xFCdyosu birim ba\u015F\u0131na {kr} kredi al\u0131r. Oyuncu st\xFCdyosunda \xFCcreti sahibi belirler ({a}\u2013{b} kredi), s\xFCs e\u015Fyas\u0131 kayd\u0131n kalitesine ek verir (en \xE7ok +{m}). Kay\u0131t\
 formunda st\xFCdyoyu se\xE7ersin.",{kr:kr(v.state_fee_cr??100),a:kr(R.feeCr?.min??50),b:kr(R.feeCr?.max??300),m:Number(R.qualityBonusMax??10)})}</p>
        ${l.length?`<div class="liste" style="margin-top:8px">${l.map(satir).join("")}</div>`:""}
        ${benimki?"":`<div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="sehir/mekanlar">${ikon("key-round")}${\u00E7("St\xFCdyo a\xE7mak i\xE7in Mek\xE2nlar")}\
</button></div>`}
      </section>`}function duvarHtml(){const l=v.wall??[];return`<section class="kart" id="studyo-duvar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Duvar")}</p><h2 class="b2">${l.length?
\u00E7("Burada kaydedilen {n} EP",{n:l.length}):\u00E7("Duvar bo\u015F")}</h2></div><span class="ik-kutu">${ikon("disc-album")}</span></div>
        ${l.length?`<div class="ep-raf">${l.map(e=>`<button class="ep-raf-oge" type="button" data-ep-ac="${esc(e.ep_id)}">${epKapakSvg(e,92)}<b>${esc(e.name)}</b><span class="kucuk">${esc(e.band_name??
"")} \xB7 ${\u00E7("{kr} kredi",{kr:kr(e.price_cr)})}</span></button>`).join("")}</div>`:`<p class="bos">${\u00E7("Bu st\xFCdyoda kaydedilmi\u015F par\xE7as\u0131 olan EP yay\u0131mlan\u0131nca kapa\u011F\u0131 duvara as\u0131l\u0131r.")}\
</p>`}</section>`}function sonHtml(){const l=v.recent??[];return`<section class="kart" id="studyo-son"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Son kay\u0131tlar")}</p><h2 class="b2">${l.
length?\u00E7("{n} kay\u0131t",{n:l.length}):\u00E7("Hen\xFCz kay\u0131t yok")}</h2></div><span class="ik-kutu">${ikon("audio-lines")}</span></div>
        ${l.length?`<div class="liste">${l.map(k=>`<div class="liste-satir"><span class="liste-ikon">${muzikAfis({genre:k.genre})}</span>
            <div><span class="tur"><button class="baglanti" type="button" data-grup-ac="${esc(k.band_id)}">${esc(k.band_name??"")}</button> \xB7 ${\u00E7("kay\u0131t kalitesi {q}",{q:Number(k.quality??
0)})} \xB7 ${esc(zamanOnce(k.done_at))}</span><b>${esc(k.title)}</b></div>
            ${muzikDinle({song_id:k.song_id,...k.play})}</div>`).join("")}</div>`:`<p class="bos">${\u00E7("\u0130lk kayd\u0131 yapan grup burada g\xF6r\xFCn\xFCr.")}</p>`}</section>`}function ciz(){durdur(),
kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim \xB7 St\xFCdyo")}</p>
          <h1 class="b1">${\u00E7("Kay\u0131t st\xFCdyosu \xB7 {sehir}",{sehir:esc(v.region_id?bolgeAdi(v.region_id):v.region_name??"")})}</h1>
          <p class="aciklama">${\u00E7("Gruplar \u015Fark\u0131lar\u0131n\u0131 burada kaydeder; kay\u0131tl\u0131 \u015Fark\u0131lardan EP yay\u0131mlan\u0131r, oyuncular al\u0131r ve dinler.")}</p><\
/div>
          <div class="oneri-dugmeler">${meydanaDonDugme("studyo")}
            <span class="cip ${(v.recording_now??[]).length?"altin":""}">${ikon("mic")}${(v.recording_now??[]).length?\u00E7("{n} ki\u015Fi kay\u0131tta",{n:(v.recording_now??[]).length}):\u00E7("Kabi\
n bo\u015F")}</span></div></div>
        <div id="studyo-sahne-yer"></div>
        <div class="izgara iki">
          <div class="yigin">${kayittaHtml()}${sonHtml()}</div>
          <div class="yigin">${grubumHtml()}${studyolarHtml()}${duvarHtml()}</div>
        </div></div>`;const yer=$("#studyo-sahne-yer",kap);yer&&(yer.replaceWith(sahne.el),sahne.yaz({s:v,ben:ben().id})),bagla(),durdur=geriSay(kap,()=>setTimeout(()=>{kapandi||tazele()},1500))}function bagla(){
meydanaDonBagla(kap),epBagla(kap,()=>tazele());for(const b of $$("[data-profil]",kap))b.onclick=()=>profilAc(b.dataset.profil,()=>tazele());for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(
b.dataset.git);for(const b of $$("[data-grup-ac]",kap))b.onclick=()=>muzikKartiAc(b.dataset.grupAc);for(const b of $$("[data-mekan-git]",kap))b.onclick=()=>MekanYolu.git(b.dataset.mekanGit);for(const b of $$(
"[data-mekan-yonet]",kap))b.onclick=()=>mekanimGit(b.dataset.mekanYonet);for(const b of $$("[data-kayit-yap]",kap))b.onclick=async()=>{b.disabled=!0;try{const mo=await muzikYukle();if(!mo?.band){tost(
\u00E7("Bir grubun \xFCyesi de\u011Filsin."),"circle-alert");return}kayitYap(mo.band,mo,{...mo.rule??{},studio:mo.studio_rule??{},ep:mo.ep_rule??{}},b.dataset.kayitYap,()=>tazele())}catch(e){tost(hataMetni(
e),"circle-alert")}finally{b.disabled=!1}}}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()});await Promise.all([Durum.kurallar().catch(()=>null),Durum.ozet().catch(()=>null)]),await yukle(),
ciz();const b1=Durum.dinle("olay",({olay})=>{/^travel\.arrived/.test(olay)&&yakinda()}),b2=Sunucu.Canli.dinle("public:city",(olay,yuk)=>{olay==="city.ep"&&yuk?.data?.region_id===v?.region_id&&yakinda()}),
saat=setInterval(()=>{!document.hidden&&!document.querySelector(".perde")&&tazele()},3e4);return()=>{kapandi=!0,durdur(),b1(),b2(),kanalBirak?.(),clearInterval(saat),clearTimeout(bekleyen),sahne.kapat()}}}),
Parcalar.tamam("ek_98p_studyo");
