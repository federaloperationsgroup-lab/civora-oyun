// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_98q_festival.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/festival",{async ac(kap){let fv=null,sezon=null,kapandi=!1,durdur=()=>{},secili=FestivalHedef.al()?.basvuru??null;const salon=KonserSalonu.ac();salon.dinle("sec",(ad,id)=>{if(ad===
"kisi"){id&&profilAc(id,()=>tazele());return}if(ad==="ekran"){const e=gosterilen();e&&festivalBasvuruKartiAc(e,fv,()=>tazele())}});const ben=()=>Durum.v.ozet?.character??{};let bekleyen=null;const yakinda=()=>{
clearTimeout(bekleyen),bekleyen=setTimeout(()=>{kapandi||tazele()},600)};async function yukle(){fv=await Sunucu.cagir("festival_view",{p_season:sezon}),secili&&!festivalListe(fv).some(e=>e.entry_id===
secili&&["selected","performed","no_show"].includes(e.status))&&(secili=null)}function gosterilen(){const l=festivalListe(fv);if(secili)return l.find(e=>e.entry_id===secili)??null;if(fv.phase==="award"||
fv.phase==="done"){const birinci=(fv.festivals??[]).map(festivalBirinci).filter(Boolean).sort((a,b)=>Number(b.score??0)-Number(a.score??0))[0];if(birinci)return birinci}if(fv.now_on_stage)return l.find(
e=>e.entry_id===fv.now_on_stage.entry_id)??fv.now_on_stage;const sira=festivalSiradaki(fv);return sira||(l.filter(e=>e.status==="performed").sort((a,b)=>Date.parse(b.slot_at)-Date.parse(a.slot_at))[0]??
null)}function sahneKonseri(){const e=gosterilen(),odulGecesi=fv.phase==="award"||fv.phase==="done",bekliyor=fv.phase==="award";return e?odulGecesi&&e.status==="performed"&&e.rank&&!secili?festivalKonser(
fv,e,{season:fv.season,genre:e.genre,rank:Number(e.rank),waiting:bekliyor,at:fv.schedule?.award_at}):festivalKonser(fv,e,null):festivalBosKonser(fv,odulGecesi?{waiting:!0,at:fv.schedule?.award_at}:null)}
const sehirVerisi=()=>({region_id:fv.host_region_id,venues:[{venue:"festival",open:!0,capacity:Number(fv.real_tickets??0)+Number(fv.sim_tickets??0)}]});function programHtml(){const oyAcik=!!fv.can_vote,
benimOy=fv.my_votes??{};return(fv.festivals??[]).map(f=>{const l=f.list??[],bas=f.status==="open"?\u00E7("{n} ba\u015Fvuru",{n:Number(f.entries??0)}):f.status==="cancelled"?FESTIVAL_TUR_DURUM.cancelled:
f.status==="selected"?\u00E7("{n} grup kadroda",{n:Number(f.lineup??0)}):FESTIVAL_TUR_DURUM[f.status]??f.status;return`<section class="kart festival-tur" id="festival-${esc(f.genre)}"><div class="kart\
-bas"><div><p class="ust-yazi">${esc(MUZIK_TUR[f.genre]??f.genre)} ${\u00E7("sahnesi")}</p>
            <h2 class="b2">${esc(bas)}</h2></div><span class="liste-ikon">${muzikAfis({genre:f.genre})}</span></div>
          ${l.length?`<ol class="turne-yol">${l.map(e=>festivalBasvuruHtml(e,fv,{sahne:!0,secili:gosterilen()?.entry_id===e.entry_id,oy:oyAcik&&e.status!=="not_selected",oyum:benimOy[f.genre]===e.entry_id})).
join("")}</ol>`:`<p class="bos">${f.status==="open"?\u00E7("Hen\xFCz ba\u015Fvuran yok."):\u00E7("Bu t\xFCrde festival yap\u0131lmad\u0131.")}</p>`}
          ${f.status==="awarded"&&f.pool_cr!=null?`<p class="kucuk" style="margin-top:8px">${\u00E7("T\xFCr\xFCn \xF6d\xFCl havuzu {kr} kredi.",{kr:kr(f.pool_cr)})}</p>`:""}
          ${f.festival_id&&f.status!=="cancelled"?`<div class="oneri-dugmeler" style="margin-top:8px"><button class="dugme sade kucuk-d" type="button" data-festival-yorum="${esc(f.festival_id)}|${esc(
f.genre)}">${ikon("message-circle")}${\u00E7("Yorumlar")}</button></div>`:""}</section>`}).join("")}function biletHtml(){const t=fv.ticket,satista=fv.status==="selected"||fv.status==="running";return`\
<section class="kart" id="festival-bilet"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Bilet")}</p>
          <h2 class="b2">${t?\u00E7("Biletin var"):satista?\u00E7("Bilet {kr} kredi",{kr:kr(fv.ticket_price_cr??1e3)}):fv.phase==="done"||fv.phase==="award"?\u00E7("Sat\u0131\u015F bitti"):\u00E7("Sat\
\u0131\u015F kadro se\xE7ilince ba\u015Flar")}</h2></div>
          <span class="ik-kutu">${ikon("ticket")}</span></div>
        <p class="aciklama" style="margin:0">${\u00E7("{n} bilet sat\u0131ld\u0131{s}.",{n:sayi(fv.real_tickets??0),s:Number(fv.sim_tickets??0)>0?"; "+\u00E7("kap\u0131dan {k} seyirci",{k:sayi(fv.sim_tickets)}):
""})}
          ${fv.gross_cr!=null?" "+esc(\u00E7("Br\xFCt {b} kredi, \xF6d\xFCl havuzu {h} kredi.",{b:kr(fv.gross_cr),h:kr(fv.pool_cr??0)})):""}</p>
        ${fv.sponsor?`<p class="kucuk" style="margin-top:6px" id="festival-sponsor" data-sponsor="${fv.sponsor.refunded?"dondu":"var"}">${ikon("landmark")} ${esc(fv.sponsor.refunded?\u00E7("{sehir} Be\
lediyesi'nin {kr} kredi katk\u0131s\u0131 b\xFCt\xE7eye d\xF6nd\xFC ({neden}).",{sehir:bolgeAdi(fv.sponsor.region_id),kr:kr(fv.sponsor.amount_cr),neden:fv.sponsor.refund_reason==="cancelled"?\u00E7("s\
ezon iptal"):\u00E7("sahneye \xE7\u0131kan olmad\u0131")}):\u00E7("{sehir} Belediyesi festivale {kr} kredi katk\u0131 koydu (Ba\u015Fkan {ad}); \xF6d\xFCl gecesinde vergisiz da\u011F\u0131t\u0131l\u0131r.",
{sehir:bolgeAdi(fv.sponsor.region_id),kr:kr(fv.sponsor.amount_cr),ad:fv.sponsor.by??""}))}</p>`:""}
        ${t?`<p class="kucuk" style="margin-top:6px">${ikon("ticket")} ${esc(\u00E7("Bilet {kr} kredi ({zaman}). Festival g\xFCn\xFC her t\xFCrde bir gruba oy verebilirsin.",{kr:kr(t.price_cr),zaman:saatYaz(
t.at)}))}</p>`:""}
        ${fv.can_buy?`<div class="satir" style="margin-top:10px"><button class="dugme altin" id="festival-bilet-al">${ikon("ticket")}${\u00E7("Bilet al \xB7 {kr} kredi",{kr:kr(fv.ticket_price_cr??1e3)})}\
</button></div>`:""}
        ${fv.can_vote?`<p class="kucuk" style="margin-top:8px">${ikon("vote")} ${esc(\u00E7("Oylar a\xE7\u0131k: her t\xFCrde bir gruba oy ver; {zaman} kapan\u0131r.",{zaman:saatYaz(fv.vote_until)}))}\
</p>`:t&&fv.phase==="festival"&&fv.status==="running"&&Date.parse(fv.schedule?.festival_at)>Date.now()?`<p class="kucuk" style="margin-top:8px">${esc(\u00E7("Oylar festival ba\u015Flay\u0131nca a\xE7\u0131l\u0131r."))}\
</p>`:""}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Bilet paras\u0131 festivalin havuzunda tutulur; \xF6d\xFCl gecesinde vergi (ev sahibi \xFClke) ve bedel d\xFC\u015F\xFCl\xFCp t\xFCrlere e\u015Fit, t\xFCrde s\u0131raya g\xF6re gruplara da\u011F\
\u0131t\u0131l\u0131r. Kap\u0131dan gelen seyirci ev sahibi \u015Fehrin g\xFCnl\xFCk b\xFCt\xE7esinin {x} kat\u0131d\u0131r.",{x:Number(fv.rule?.budgetMultiplier??3)})}</p></section>`}function grubumHtml(){
const m=fv.mine;if(!m)return`<section class="kart" id="festival-grubum"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Grubun")}</p><h2 class="b2">${\u00E7("Grubun yok")}</h2></div><span cla\
ss="ik-kutu">${ikon("eighth-notes")}</span></div>
          <p class="bos">${\u00E7("Bir gruba kat\u0131l ya da grup kur; sezon i\xE7inde konser verip festivale ba\u015Fvurursun.")}</p>
          <div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="hayat/muzik">${ikon("eighth-notes")}${\u00E7("M\xFCzik")}</button></div></section>`;const e=m.entry;
return`<section class="kart" id="festival-grubum"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Grubun")} \xB7 ${esc(m.band_name??"")}</p>
          <h2 class="b2">${esc(e?FESTIVAL_BASVURU[e.status]??e.status:fv.phase==="apply"?\u00E7("Hen\xFCz ba\u015Fvurmad\u0131"):\u00E7("Bu sezon ba\u015Fvurmad\u0131"))}</h2>
          <p class="aciklama" style="margin:0">${esc(MUZIK_TUR[m.genre]??m.genre??"")}${m.points!=null?` \xB7 ${esc(\u00E7("sezon puan\u0131 {p}",{p:sayi(m.points)}))}`:""} \xB7 ${esc(\u00E7("{n} kons\
er",{n:Number(m.concerts_done??0)}))}</p></div>
          <span class="ik-kutu">${ikon("eighth-notes")}</span></div>
        ${e?`<ol class="turne-yol">${festivalBasvuruHtml(e,fv,{sahne:!0,secili:gosterilen()?.entry_id===e.entry_id})}</ol>`:""}
        <div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="hayat/muzik">${ikon("eighth-notes")}${fv.phase==="apply"&&!e?\u00E7("M\xFCzik'te ba\u015Fvur"):\u00E7(
"M\xFCzik")}</button></div></section>`}function unvanHtml(){const l=fv.titles??[];return l.length?`<section class="kart" id="festival-unvanlar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7(
"\xD6d\xFCl gecesi")}</p><h2 class="b2">${\u00E7("Sezonun unvanlar\u0131")}</h2></div><span class="ik-kutu">${ikon("trophy")}</span></div>
        <ul class="kucuk konser-kurallar">${l.map(t=>`<li>${ikon(t.kind==="culture"?"crown":"trophy")} <button class="baglanti" type="button" data-grup-ac="${esc(t.band_id)}">${esc(t.band_name??"")}</\
button> \u2014 ${esc(festivalUnvan({...t,season:fv.season}))}</li>`).join("")}</ul>
        <p class="kucuk" style="margin-top:8px">${\u00E7("Festival madalyas\u0131 sahnedeki \xFCyelere say\u0131mla gelir (1, 3, 10 festival). Unvanlar grubun kart\u0131nda g\xF6r\xFCn\xFCr.")}</p></s\
ection>`:""}function ciz(){if(durdur(),!fv||fv.available===!1){kap.innerHTML=`<div class="sayfa"><div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim \xB7 Festival")}</p><h1 class="b1\
">${\u00E7("Festival")}</h1></div></div>
          <div class="bilgi-kutusu">${ikon("circle-alert")}<span>${\u00E7("Bu kural s\xFCr\xFCm\xFCnde festival yok.")}</span></div></div>`;return}const s=fv.schedule??{},burada=(ben().location??null)===
fv.host_region_id,gecmis=sezon!=null;kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim \xB7 Festival alan\u0131")}</p>
          <h1 class="b1">${\u00E7("{sezon}. Sezon Festivali \xB7 {sehir}",{sezon:Number(fv.season),sehir:esc(festivalSehir(fv))})}</h1>
          <p class="aciklama">${esc(FESTIVAL_EVRE[fv.phase]??"")} \xB7 ${esc(\u00E7("festival {zaman}",{zaman:saatYaz(s.festival_at)}))} \xB7 ${esc(\u00E7("\xF6d\xFCl gecesi {zaman}",{zaman:saatYaz(s.
award_at)}))}</p></div>
          <div class="oneri-dugmeler">
            ${kareSahneDugmeHtml("festival",gosterilen()?.festival_id??fv.festivals?.[0]?.festival_id)}
            ${Number(fv.season)>1&&!gecmis?`<button class="dugme sade kucuk-d" id="festival-onceki">${ikon("undo-2")}${\u00E7("\xD6nceki sezon")}</button>`:""}
            ${gecmis?`<button class="dugme sade kucuk-d" id="festival-bu">${ikon("tent")}${\u00E7("Bu sezon")}</button>`:""}
            <span class="cip ${fv.phase==="festival"?"konser-canli":""}">${ikon(fv.phase==="festival"?"play":"calendar")}${esc(FESTIVAL_EVRE[fv.phase]??"")}</span></div></div>
        ${burada?"":`<div class="bilgi-kutusu" style="margin-bottom:12px">${ikon("map-pin")}<span>${\u00E7("Festival alan\u0131 {sehir} \u015Fehrinde; buradan izleyebilir, bilet al\u0131p oy verebilirsin. Kadrodaki \
\xFCyeler slot saatinde orada olmal\u0131.",{sehir:esc(festivalSehir(fv))})}</span></div>`}
        <div id="festival-salon-yer"></div>
        <div class="izgara iki">
          <div class="yigin">${programHtml()}
            <section class="kart" id="festival-siralama"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sezon puan\u0131")}</p><h2 class="b2">${\u00E7("K\xFClt\xFCr s\u0131ralamas\u0131")}</\
h2></div><span class="ik-kutu">${ikon("trending-up")}</span></div>
              ${festivalSiralamaHtml(fv)}
              <p class="kucuk" style="margin-top:8px">${\u00E7("Puan: konser seyircisi (ger\xE7ek {a}, kap\u0131dan {b}), EP sat\u0131\u015F\u0131 (ger\xE7ek {c}, dinleyici {d}), turne dura\u011F\u0131 {e}, festival s\u0131ras\u0131 ve kadro. Sez\
on bitince ilk {n} gruba k\xFClt\xFCr unvan\u0131.",{a:Number(fv.rule?.points?.concertReal??3),b:Number(fv.rule?.points?.concertSim??1),c:Number(fv.rule?.points?.epReal??5),d:Number(fv.rule?.points?.epSim??
1),e:Number(fv.rule?.points?.tourStop??20),n:Number(fv.rule?.cultureTitles??3)})}</p></section>
          </div>
          <div class="yigin">${biletHtml()}
            <section class="kart" id="festival-takvim"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Takvim")}</p><h2 class="b2">${\u00E7("Sezon {n}",{n:Number(fv.season)})}</h2></div><span\
 class="ik-kutu">${ikon("calendar")}</span></div>
              ${festivalTakvimHtml(fv)}
              <p class="kucuk" style="margin-top:8px">${\u00E7("Sezon {g} g\xFCn s\xFCrer; ev sahibi \u015Fehir a\xE7\u0131k \xFClkeler aras\u0131nda s\u0131rayla de\u011Fi\u015Fir.",{g:Number(fv.rule?.
season?.days??14)})}</p></section>
            ${grubumHtml()}${unvanHtml()}
          </div>
        </div></div>`;const yer=$("#festival-salon-yer",kap);yer&&(yer.replaceWith(salon.el),salon.yaz({c:sahneKonseri(),sehir:sehirVerisi()})),bagla(),durdur=geriSay(kap,()=>setTimeout(()=>{kapandi||
tazele()},1500))}function bagla(){festivalBagla(kap,()=>fv,()=>tazele());for(const b of $$("[data-festival-sahne]",kap))b.onclick=()=>{secili=b.dataset.festivalSahne,ciz(),$("#konser-salon",kap)?.scrollIntoView(
{behavior:hareketAzalt?"auto":"smooth",block:"start"})};for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-festival-yorum]",kap))b.onclick=()=>{const[id,
tur]=b.dataset.festivalYorum.split("|");pencere({ust:\u00E7("{sezon}. Sezon Festivali",{sezon:Number(fv.season)}),baslik:\u00E7("{tur} sahnesi",{tur:MUZIK_TUR[tur]??tur}),govde:'<div id="festival-yoru\
mlar"></div>'}),yorumlarKur($("#festival-yorumlar",$(".perde:last-child")),"festival",id)};for(const b of $$("[data-profil]",kap))b.onclick=()=>profilAc(b.dataset.profil,()=>tazele());$("#festival-bil\
et-al",kap)?.addEventListener("click",()=>festivalBiletAl(fv,()=>tazele())),$("#festival-onceki",kap)?.addEventListener("click",()=>{sezon=Number(fv.season)-1,secili=null,tazele()}),$("#festival-bu",kap)?.
addEventListener("click",()=>{sezon=null,secili=null,tazele()})}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()});await Promise.all([Durum.kurallar().catch(()=>null),Durum.ozet().catch(
()=>null)]),await yukle(),ciz();const b1=Sunucu.Canli.dinle("public:city",olay=>{olay==="city.festival"&&yakinda()}),b2=Durum.dinle("ulke-olay",({olay})=>{olay==="festival.season"&&yakinda()}),b3=Durum.
dinle("olay",({olay})=>{/^(festival\.|travel\.arrived)/.test(olay)&&yakinda()});let kanalBirak=null;const kanal=fv?.mine?.band_id??null;kanal&&(kanalBirak=Sunucu.Canli.dinle("band:"+kanal,olay=>{olay===
"band.festival"&&yakinda()}));const saat=setInterval(()=>{!document.hidden&&!document.querySelector(".perde")&&tazele()},6e4),sarki=setInterval(()=>{!document.hidden&&fv?.now_on_stage&&salon.yaz({c:sahneKonseri(),
sehir:sehirVerisi()})},15e3);return()=>{kapandi=!0,durdur(),b1(),b2(),b3(),kanalBirak?.(),clearInterval(saat),clearInterval(sarki),clearTimeout(bekleyen),salon.kapat()}}}),Parcalar.tamam("ek_98q_festi\
val");
