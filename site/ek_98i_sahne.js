// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98i_sahne.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/sahne",{async ac(kap){let v=null,plaklar=[],fv=null,disari=null,kulupler=[],kapandi=!1,durdur=()=>{};const hedef=KonserHedef.sahneAl();let bolge=hedef?.bolge??null,secili=hedef?.konser??
null;const salon=KonserSalonu.ac();salon.dinle("sec",(ad,id)=>{if(ad==="kisi"){id&&profilAc(id,()=>tazele());return}ad==="ekran"&&salon.secili&&konserKartiAc(salon.secili,()=>tazele())});const ben=()=>Durum.
v.ozet?.character??{},tum=()=>[...v?.live??[],...v?.upcoming??[],...v?.recent??[]];async function yukle(){[v,plaklar,fv]=await Promise.all([Sunucu.cagir("city_concerts",{p_region:bolge}),Sunucu.cagir(
"ep_list",{p_scope:"new",p_band:null}).then(x=>x?.eps??[]).catch(()=>[]),Sunucu.cagir("festival_view",{p_season:null}).catch(()=>null)]),bolge=v.region_id,kulupler=await MekanYolu.kulupler(bolge).catch(
()=>[])??[],disari=secili&&!tum().some(c=>c.concert_id===secili)?await Sunucu.cagir("concert_get",{p_concert:secili}).catch(()=>null):null,disari&&disari.region_id!==v.region_id&&(disari=null),secili&&
!disari&&!tum().some(c=>c.concert_id===secili)&&(secili=null)}function gosterilen(){if(secili)return tum().find(c=>c.concert_id===secili)??disari??null;const bugun=c=>new Date(c.starts_at).toDateString()===
new Date().toDateString();return v.live?.[0]??(v.upcoming??[]).find(bugun)??v.upcoming?.[0]??v.recent?.[0]??null}function mekanlarHtml(){return`<div class="liste">${(v.venues??[]).map(x=>`<div class="\
liste-satir${x.open?"":" kapali"}"><span class="liste-ikon"><span class="ozet-ikon">${ikon(KONSER_MEKAN[x.venue]?.ik??"drama")}</span></span>
          <div><span class="tur">${x.open?\u00E7("{n} ki\u015Filik",{n:sayi(x.capacity)}):\u00E7("{s}. seviyede a\xE7\u0131l\u0131r",{s:Number(x.min_level)})}</span><b>${esc(konserMekanAdi(x.venue))}<\
/b>
            <div class="alt">${\u00E7("Kira {kr} kredi \xB7 {n} sahne malzemesi \xB7 gideri {g} kredi",{kr:kr(x.rent_cr),n:Number(x.stage_units),g:kr(x.cost_cr)})}</div></div>
          ${x.open?`<span class="cip yesil">${\u00E7("A\xE7\u0131k")}</span>`:`<span class="cip">${ikon("lock")}${\u00E7("Kapal\u0131")}</span>`}</div>`).join("")}
        ${kulupler.map(x=>`<div class="liste-satir" data-kulup="${esc(x.venue_id)}"><span class="liste-ikon yesil"><span class="ozet-ikon">${ikon("headphones")}</span></span>
          <div><span class="tur">${esc(\u00E7("Oyuncunun kul\xFCb\xFC \xB7 {n} ki\u015Filik",{n:sayi(x.capacity)}))}</span><b>${esc(x.name)}</b>
            <div class="alt">${esc(\u00E7("Sahibi {ad} \xB7 tarz\u0131 {tarz} \xB7 kira {kr} kredi kul\xFCb\xFCn kasas\u0131na \xB7 {n} sahne malzemesi",{ad:x.owner??"",tarz:MUZIK_TUR[x.style]??x.style??
"",kr:kr(x.rent_cr),n:Number(x.stage_units)}))}</div></div>
          <button class="dugme sade kucuk-d" data-kulup-git="${esc(x.venue_id)}">${ikon("door-open")}${\u00E7("Kul\xFCbe git")}</button></div>`).join("")}</div>`}function butceHtml(){const b=v.budget??
{},oran=Number(b.budget_cr)>0?Math.min(100,Math.round(Number(b.paid_cr)*100/Number(b.budget_cr))):0;return`<p class="aciklama" style="margin:0">${\u00E7("Bug\xFCn kap\u0131dan gelen seyircinin b\xFCt\xE7esi {b} kre\
di; {p} kredisi {n} konserde harcand\u0131.",{b:kr(b.budget_cr??0),p:kr(b.paid_cr??0),n:sayi(b.concerts??0)})}</p>
        <div class="muzik-ilerleme" style="margin-top:8px" role="img" aria-label="${esc(\u00E7("B\xFCt\xE7enin %{n}'i harcand\u0131",{n:oran}))}"><span style="width:${oran}%"></span></div>
        <p class="kucuk" style="margin-top:8px">${\u00E7("\u015Eehrin seviyesi b\xFCy\xFCd\xFCk\xE7e b\xFCt\xE7e artar. Bir konser b\xFCt\xE7enin en \xE7ok %{p}'ini al\u0131r, o da konserin kalitesiyle orant\u0131l\u0131d\u0131r; bilet alan oyuncular\u0131n\
 paras\u0131 ayr\u0131ca gelir.",{p:Math.round(Number(Durum.v.kurallar?.data?.culture?.concert?.audience?.eventSharePpm??4e5)/1e4)})}</p>`}function sevilenHtml(){const l=v.favorites??[];return l.length?
`<div class="liste">${l.map((x,i)=>`<div class="liste-satir"><span class="liste-ikon">${muzikAfis(x)}</span>
          <div><span class="tur">${\u00E7("{n}. \xB7 {tur}",{n:i+1,tur:esc(MUZIK_TUR[x.genre]??x.genre)})}</span><b><button class="baglanti" type="button" data-grup-ac="${esc(x.band_id)}">${esc(x.name)}\
</button></b></div>
          <span class="cip">${ikon("heart")}${\u00E7("{n} hayran",{n:sayi(x.fans)})}</span></div>`).join("")}</div>`:`<p class="bos">${\u00E7("Hen\xFCz bu \u015Fehirde hayran\u0131 olan grup yok.")}</\
p>`}function ciz(){durdur();const burada=(ben().location??null)===v.region_id,goster=gosterilen(),satirlar=(l,bos)=>l.length?`<div class="konser-satirlar">${l.map(c=>konserSatiri(c,{sahne:!0,secili:goster?.
concert_id===c.concert_id})).join("")}</div>`:`<p class="bos">${esc(bos)}</p>`;kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim \xB7 Sahne")}</p>
          <h1 class="b1">${\u00E7("Sahne \xB7 {sehir}",{sehir:esc(bolgeAdi(v.region_id))})}</h1>
          <p class="aciklama">${\u00E7("\u015Eehrin konser mek\xE2nlar\u0131 ve konserleri: bilet al, konseri izle, grubunla sahneye \xE7\u0131k.")}</p></div>
          <div class="oneri-dugmeler">${kareSahneDugmeHtml("concert",gosterilen()?.concert_id)}<span class="cip">${ikon("building")}${\u00E7("{s}. seviye \xB7 {n} sakin",{s:Number(v.level??1),n:sayi(v.
residents??0)})}</span></div></div>
        ${burada?"":`<div class="bilgi-kutusu" style="margin-bottom:12px">${ikon("map-pin")}<span>${\u00E7("Ba\u015Fka bir \u015Fehrin sahnesine bak\u0131yorsun.")}</span>
          <button class="dugme sade kucuk-d" id="sahne-buraya">${\u00E7("Bulundu\u011Fum \u015Fehrin sahnesi")}</button></div>`}
        ${v.war?`<div class="hata-kutusu" style="margin-bottom:12px">${ikon("swords")}<span>${\u00E7("Bu \u015Fehir sava\u015F b\xF6lgesi: yeni konser ayr\u0131lmaz; bekleyen konserler iptal olur ve biletler iade edili\
r.")}</span></div>`:""}
        <div id="konser-salon-yer"></div>
        <div class="izgara iki">
          <div class="yigin">
            ${festivalAfisHtml(fv)}
            <section class="kart" id="sahne-simdi"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u015Eimdi ve yak\u0131nda")}</p>
                <h2 class="b2">${(v.live??[]).length?\u00E7("{n} konser s\xFCr\xFCyor",{n:v.live.length}):(v.upcoming??[]).length?\u00E7("{n} konser ayr\u0131ld\u0131",{n:v.upcoming.length}):\u00E7("A\
yr\u0131lm\u0131\u015F konser yok")}</h2></div>
                <span class="ik-kutu">${ikon("ticket")}</span></div>
              ${(v.live??[]).length?satirlar(v.live,""):""}
              ${satirlar(v.upcoming??[],(v.live??[]).length?\u00E7("Ba\u015Fka ayr\u0131lm\u0131\u015F konser yok."):\u00E7("\u015Eehrin sahnesinde bekleyen konser yok. Bir grup konser ay\u0131r\u0131nca burada g\xF6r\xFC\
n\xFCr ve bilet alabilirsin."))}
              <p class="kucuk" style="margin-top:8px">${\u00E7("Bilet paras\u0131 hesab\u0131nda ayr\u0131l\u0131r; konser ba\u015Flang\u0131\xE7tan 60 dakika \xF6nce kilitlenene kadar tam iade edilir. \u0130ptal edilen konserin bileti kendi\
li\u011Finden iade edilir.")}</p></section>
            <section class="kart" id="sahne-son"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Son 7 g\xFCn")}</p><h2 class="b2">${\u00E7("Son konserler")}</h2></div><span class="ik-kutu">${ikon(
"star")}</span></div>
              ${satirlar(v.recent??[],\u00E7("Son 7 g\xFCnde bu \u015Fehirde konser olmad\u0131."))}</section>
          </div>
          <div class="yigin">
            <section class="kart" id="sahne-mekanlar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrin mek\xE2nlar\u0131")}</p><h2 class="b2">${\u00E7("Mek\xE2nlar")}</h2></div><sp\
an class="ik-kutu">${ikon("drama")}</span></div>
              ${mekanlarHtml()}
              <p class="kucuk" style="margin-top:8px">${\u00E7("Kira ve sahne malzemesi ay\u0131r\u0131rken grubun kasas\u0131ndan ayr\u0131l\u0131r. Kira belediyeye ge\xE7er, malzeme konserde t\xFCkenir; bilet gelirinden \xF6nce bunl\
ar kasaya d\xF6ner, kalan\u0131 kadroya payla\u015F\u0131l\u0131r.")}</p>
              <div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" id="sahne-ayir">${ikon("calendar")}${\u00E7("Grubunla burada konser ver")}</button></div></section>
            <section class="kart" id="sahne-butce"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Bug\xFCn \xB7 {gun}",{gun:esc(new Date().toLocaleDateString(DIL.yerel,{day:"numeric",month:"\
long"}))})}</p><h2 class="b2">${\u00E7("Kap\u0131dan gelen seyirci")}</h2></div><span class="ik-kutu">${ikon("users-round")}</span></div>
              ${butceHtml()}</section>
            <section class="kart" id="sahne-sevilen"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Hayranlar")}</p><h2 class="b2">${\u00E7("\u015Eehrin sevdi\u011Fi gruplar")}</h2></div><sp\
an class="ik-kutu">${ikon("heart")}</span></div>
              ${sevilenHtml()}
              <p class="kucuk" style="margin-top:8px">${\u00E7("Hayran konserle ve EP al\u0131m\u0131yla kazan\u0131l\u0131r: seyirci say\u0131s\u0131 ve kalite art\u0131r\u0131r. Hayran g\xFCnde %1 azal\u0131r.")}\
</p></section>
            ${plakRafiHtml(plaklar)}
            <section class="kart" id="sahne-studyo"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kay\u0131t st\xFCdyosu")}</p><h2 class="b2">${\u00E7("\u015Eehrin st\xFCdyosu")}</h2></div>\
<span class="ik-kutu">${ikon("sliders-horizontal")}</span></div>
              <p class="aciklama" style="margin:0">${\u00E7("Gruplar \u015Fark\u0131lar\u0131n\u0131 burada kaydeder, kay\u0131tl\u0131 \u015Fark\u0131lardan EP yay\u0131mlar.")}</p>
              <div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="sehir/studyo">${ikon("mic")}${\u00E7("St\xFCdyoya gir")}</button></div></section>
          </div>
        </div></div>`;const yer=$("#konser-salon-yer",kap);yer&&(yer.replaceWith(salon.el),salon.yaz({c:goster,sehir:v})),bagla(),durdur=geriSay(kap,()=>setTimeout(()=>{kapandi||tazele()},1500))}function bagla(){
konserSatirBagla(kap,()=>[...tum(),...disari?[disari]:[]],()=>tazele());for(const b of $$("[data-konser-sahne]",kap))b.onclick=()=>{secili=b.dataset.konserSahne,ciz(),$("#konser-salon",kap)?.scrollIntoView(
{behavior:hareketAzalt?"auto":"smooth",block:"start"})};$("#sahne-buraya",kap)?.addEventListener("click",()=>{bolge=null,secili=null,tazele()}),$("#sahne-ayir",kap)?.addEventListener("click",()=>KonserHedef.
ayirAc(v.region_id));for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);epBagla(kap,()=>tazele());for(const b of $$("[data-festival-git]",kap))b.onclick=()=>FestivalHedef.ac(b.
dataset.festivalGit||null);for(const b of $$("[data-kulup-git]",kap))b.onclick=()=>MekanYolu.git(b.dataset.kulupGit)}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()});await Promise.all(
[Durum.kurallar().catch(()=>null),Durum.ozet().catch(()=>null)]),await yukle(),ciz();let bekleyen=null;const yakinda=()=>{clearTimeout(bekleyen),bekleyen=setTimeout(()=>{kapandi||tazele()},500)},b1=Sunucu.
Canli.dinle("public:city",(olay,yuk)=>{olay==="city.concert"&&yuk?.data?.region_id===v?.region_id&&yakinda()}),b2=Durum.dinle("olay",({olay})=>{/^(concert\.|travel\.arrived)/.test(olay)&&yakinda()}),saat=setInterval(
()=>{!document.hidden&&!document.querySelector(".perde")&&tazele()},6e4),sarki=setInterval(()=>{!document.hidden&&v?.live?.length&&salon.yaz({c:gosterilen(),sehir:v})},15e3);return()=>{kapandi=!0,durdur(),
b1(),b2(),clearInterval(saat),clearInterval(sarki),clearTimeout(bekleyen),salon.kapat()}}}),Parcalar.tamam("ek_98i_sahne");
