// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_37_sehir_ekran.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/sehir",{async ac(kap){let v=null,mod=null,hata3b=!1,kapandi=!1,secili=null,havaOnizle=null,tumIsletmeler=!1;async function yukle(tam){const o=tam||!Durum.v.ozet?await Durum.ozet():
Durum.v.ozet,bolge=o.character.location,kapali=e=>{if(e.kod==="RULE_NOT_ACTIVE")return null;throw e},[sh,ic,harita,kurallar,un,dedikodu]=await Promise.all([Sunucu.cagir("city",{p_region:bolge}),Sunucu.
cagir("city_companies",{p_region:bolge}),Durum.harita().catch(()=>Durum.v.harita),Durum.kurallar(),Sunucu.cagir("fame_board",{p_region:bolge}).catch(kapali),Sunucu.cagir("gossip",{p_region:bolge}).catch(
kapali)]),sahip=harita?.sahip?.[bolge]??DUNYA.bolgeler?.[bolge]?.ulke,baskent=DUNYA.ulkeler?.[sahip]?.baskent===bolge,[ulke,isb,nabiz,hareket,secim,isgal]=await Promise.all([sahip?Sunucu.cagir("countr\
y_overview",{p_country:sahip}).catch(()=>null):null,baskent?Sunucu.cagir("coop_map").catch(()=>null):null,Sunucu.cagir("city_pulse",{p_region:bolge}).catch(()=>null),sahip&&sahip===o.character.citizenship?
Sunucu.cagir("movement_status").catch(()=>null):null,sahip?Sunucu.cagir("election_scene",{p_country:sahip}).catch(()=>null):null,Sunucu.cagir("occupation_region",{p_region:bolge}).catch(()=>null)]),elcilikler=(isb?.
embassies??[]).filter(x=>x.a===sahip||x.b===sahip).map(x=>x.a===sahip?x.b:x.a).sort(),dilekce=hareket?.petition,kampanya=dilekce&&dilekce.status==="open"?{imza:Number(dilekce.signatures??0)}:null,ozerk=(harita?.
autonomies??[]).find(([id])=>id===bolge)??null,ozkSurec=(harita?.autonomy_drives??[]).find(([id])=>id===bolge)??null;v={o,bolge,sh,ic,sahip,ulke,kurallar,un,dedikodu,elcilikler,nabiz,kampanya,secim:secimAfisleri(
secim?.election),baskent,ozerk,ozkSurec,isgal,saatFarki:ic.server_time?Date.parse(ic.server_time)-Date.now():0}}const bolgeBilgi=()=>DUNYA.bolgeler?.[v.bolge]??{},yabanci=()=>v.sahip!==v.o.character.citizenship,
limanMi=()=>sehirKiyida(bolgeBilgi()),isletmeler=()=>v.ic.companies??[],evler=()=>v.sh.houses??[],gunesNe=()=>sehirGunesi(v.bolge,Date.now()+v.saatFarki),havaTahmini=()=>havaTahmin(v.bolge,Date.now()+
v.saatFarki,8),havaGoster=()=>havaOnizle!=null?havaTahmini()[havaOnizle]:havaAn(v.bolge,Date.now()+v.saatFarki),projeler=()=>(v.sh.projects??[]).filter(p=>p.status&&p.status!=="cancelled").map(p=>{const a=Date.
parse(p.started_at),b=Date.parse(p.ready_at),simdi=Date.now()+v.saatFarki,x={tur:p.kind,ad:bldProjeAdi(p.kind),durum:p.status,hazir:p.ready_at??null,baslatan:p.started_by_name??null,ilerleme:p.status===
"building"?b>a?Math.max(0,Math.min(1,(simdi-a)/(b-a))):0:1};return x.durumYazi=bldDurumYazi(x),x});function durumlar(){const u=v.ulke,c=u?.campaigns?.[0],uretimde=isletmeler().filter(x=>x.producing).length;
return{meclis:u?u.open_motions?\u00E7("{n} a\xE7\u0131k oylama",{n:Number(u.open_motions)}):\u00E7("A\xE7\u0131k oylama yok"):"",kisla:u?c?`${c.attacker_country_id===v.sahip?\u00E7("Taarruz"):\u00E7("\
Savunma")}: ${bolgeAdi(c.target_region_id)}`:\u00E7("Cephe sakin"):"",belediye:`${\u00E7("{n}. seviye",{n:Number(v.sh.level)})} \xB7 ${SEVIYE_AD[v.sh.level]??\u00E7v(v.sh.level_name)}${v.sh.mayor?" \xB7 "+
\u00E7("Ba\u015Fkan {ad}",{ad:v.sh.mayor.name}):""}`,sanayi:isletmeler().length?`${\u00E7("{n} i\u015Fletme",{n:isletmeler().length})} \xB7 ${\u00E7("{n} \xFCretimde",{n:uretimde})}`:\u00E7("Hen\xFCz i\u015Fl\
etme yok"),liman:\u00E7("Yolculuk"),istasyon:\u00E7("Yolculuk")}}const savasDurumu=()=>{const x=v.isgal;if(!x)return null;const io=x.occupation,h=x.damage??{},p=Number(h.damage_ppm??0);if(!io&&p<=0)return null;
const gecen=h.war_at?Date.now()+v.saatFarki-Date.parse(h.war_at):1/0;return{hasar:p,duman:p>0&&gecen<864e5?Math.max(.2,1-gecen/864e5):0,isgalci:io?.occupier_country_id??null,asil:io?.home_country_id??
null,direnis:x.resistance?.status??null,onarim:Number(h.working??0)}},durum3b=()=>({bolge:{id:v.bolge,iklim:bolgeBilgi().iklim,arazi:bolgeBilgi().arazi},ulke:v.sahip,seviye:Number(v.sh.level)||1,evler:evler(),
isletmeler:isletmeler(),durumlar:durumlar(),gunes:gunesNe(),elcilikler:v.elcilikler??[],nabiz:v.nabiz,kampanya:v.kampanya,secim:v.secim,savas:savasDurumu(),projeler:projeler(),hava:havaSahne(havaGoster())});
kap.innerHTML=`<div class="sayfa sehir-sayfa">
      <div class="sahne3b sehir-sahne" id="sehir-sahne">
        <div class="yukleniyor" id="sehir-yukleniyor"><div class="yukleniyor-ic"><img src="img/amblem.png" alt=""><span>${\u00E7("\u015Eehir kuruluyor\u2026")}</span></div></div>
        <div class="etiketler" id="sehir-noktalar"></div>
        <div class="sehir-2b" id="sehir-2b" hidden></div>
        <div class="sahne-katman">
          <div class="sehir-ust" id="sehir-ust"></div>
          <div class="sehir-araclar">
            <div class="arac-kutu cam sehir-vakit" id="sehir-vakit"></div>
            <button type="button" class="arac-kutu cam sehir-vakit sehir-hava" id="sehir-hava"></button>
            <div class="arac-kutu cam">
              <button type="button" id="sehir-genel" aria-label="${\u00E7("Genel bak\u0131\u015F")}" title="${\u00E7("Genel bak\u0131\u015F")}">${ikon("rotate-3d")}<span>${\u00E7("Genel bak\u0131\u015F")}\
</span></button>
              <button type="button" id="sehir-mod">${ikon("layers")}<span id="sehir-mod-yazi">${\u00E7("2B")}</span></button>
            </div>
          </div>
          <div class="sehir-ipucu cam" id="sehir-ipucu"></div>
          <div class="sehir-kart" id="sehir-kart"></div>
        </div>
      </div>
      <div class="izgara iki sehir-alt" id="sehir-savas-satir" hidden>
        <section class="kart" id="sehir-isgal"></section>
        <section class="kart" id="sehir-onarim"></section>
      </div>
      <div class="izgara iki sehir-alt">
        <section class="kart" id="sehir-isletmeler"></section>
        <section class="kart" id="sehir-yerler"></section>
      </div>
      <section class="kart sehir-alt" id="sehir-projeler" hidden></section>
      <div class="izgara iki sehir-alt" id="sehir-un-satir" hidden>
        <section class="kart" id="sehir-un"></section>
        <section class="kart" id="sehir-dedikodu"></section>
      </div>
    </div>`;const sahneEl=$("#sehir-sahne",kap);function ustCiz(){const{sh,bolge,sahip}=v,b=bolgeBilgi(),ch=v.o.character,L=Number(sh.level)||1,n=sh.next,oran=n?Math.min(1,sh.active_residents/Math.max(
1,n.activeResidents),sh.companies/Math.max(1,n.companies)):1,satilik=evler().filter(h=>h.for_sale&&!h.mine).length,uretimde=isletmeler().filter(x=>x.producing).length;$("#sehir-ust",kap).innerHTML=`
        <p class="ust-yazi">${ikon("map-pin")}${b.baskent?\u00E7("Ba\u015Fkent"):\u00E7("B\xF6lge")} \xB7 ${esc(ulkeAdi(sahip))}${b.ulke&&sahip!==b.ulke?" \xB7 "+\u00E7("as\u0131l \xFClkesi {ulke}",{ulke:esc(
ulkeAdi(b.ulke))}):""}</p>
        <h1 class="b1">${esc(bolgeAdi(bolge))}</h1>
        <p>${b.iklim?`${esc(IKLIM_AD[b.iklim]??b.iklim)} \xB7 `:""}${\u00E7("Buradas\u0131n")}${ch.residence===bolge?" \xB7 "+\u00E7("ikametin"):""}</p>
        ${savasSatiri()}${nabizYazi()}
        <div class="seviye-satir">
          <span class="seviye-rozet">${sayi(L)}</span>
          <div><b>${esc(SEVIYE_AD[L]??\u00E7v(sh.level_name))}</b>${n?`<small>${\u00E7("{seviye} olmaya {oran}",{seviye:esc(\u00E7v(n.name)),oran:yuzde(oran)})}</small>`:`<small>${\u00E7("En y\xFCksek se\
viye")}</small>`}
            <div class="cubuk altin"><i style="width:${Math.round(oran*100)}%"></i></div></div>
        </div>
        <div class="mini-sayilar">
          <div><b>${sayi(sh.active_residents)}</b><small>${\u00E7("Etkin sakin")}</small></div>
          <div><b>${sayi(isletmeler().length)}</b><small>${\u00E7("\u0130\u015Fletme")}</small></div>
          <div><b>${sayi(uretimde)}</b><small>${\u00E7("\xDCretimde")}</small></div>
          <div><b>${sayi(satilik)}</b><small>${\u00E7("Sat\u0131l\u0131k ev")}</small></div>
        </div>`}function savasSatiri(){const x=v.isgal,io=x?.occupation,p=Number(x?.damage?.damage_ppm??0),d=x?.resistance;return!io&&p<=0?"":`<p class="sehir-nabiz sehir-isgal" id="sehir-isgal-satir"\
>${io?`<span data-sehir-isgal="${esc(io.occupier_country_id)}">${ikon("flame")}${\u00E7("{ulke} i\u015Fgalinde",{ulke:esc(ulkeAdi(io.occupier_country_id))})}</span>`:""}${d?`<span data-sehir-direnis="${esc(
d.status)}">${ikon(drnDurum(d.status)[2])}${esc(drnDurum(d.status)[0])}</span>`:""}${p>0?`<span data-sehir-hasar="${p}">${ikon("hammer")}${\u00E7("hasar {n}",{n:ppmYuzde(p)})}</span>`:""}</p>`}let savasSay=()=>{};
function savasCiz(){const satir=$("#sehir-savas-satir",kap);savasSay();const x=v.isgal,io=x?.occupation,h=x?.damage??{},p=Number(h.damage_ppm??0);if(!x||!io&&p<=0&&!(h.recent??[]).length){satir.hidden=
!0;return}satir.hidden=!1;const r=x.rule,me=x.me??{},d=x.resistance,ik=$("#sehir-isgal",kap),on=$("#sehir-onarim",kap);ik.hidden=!io,io&&(ik.innerHTML=`<div class="kart-bas"><div>${ulkeUst(io.home_country_id,
\u00E7("i\u015Fgal alt\u0131nda"))}<h2 class="b2">${\u00E7("{ulke} i\u015Fgalinde",{ulke:esc(ulkeAdi(io.occupier_country_id))})}</h2></div>
            <span class="ik-kutu">${ikon("flame")}</span></div>
          <p class="aciklama">${\u00E7("{zaman} tarihinden beri. Direni\u015F listesi {n} ki\u015Fi; i\u015Fgalcinin bak\u0131m\u0131 {durum}.",{zaman:esc(saatYaz(io.occupier_since??io.started_at)),n:sayi(
io.roll_size),durum:io.unpaid_streak?\u00E7("{n} g\xFCnd\xFCr \xF6denmiyor",{n:sayi(io.unpaid_streak)}):\u00E7("\xF6deniyor")})}</p>
          ${d?`<p class="cip ${drnDurum(d.status)[1]}" data-sehir-direnis-kart="${esc(d.status)}">${ikon(drnDurum(d.status)[2])}${esc(drnDurum(d.status)[0])}${d.status==="open"?" \xB7 "+\u00E7("{n} / \
{m} oy",{n:sayi(d.voters??0),m:sayi(d.roll_size??0)}):""}</p>`:""}
          ${me.on_roll?`<p class="kucuk">${\u00E7("Bu b\xF6lgenin direni\u015F listesindesin.")}</p>`:""}
          <div class="satir" style="margin-top:10px"><button class="dugme ${me.citizen_of_home?"mercan":"ikincil"} kucuk-d" data-sehir-topraklar="${esc(x.region_id)}">${ikon("megaphone")}${\u00E7("Dir\
eni\u015F ve depo")}</button></div>`),on.hidden=!(p>0||(h.recent??[]).length),on.hidden||(on.innerHTML=`<div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sava\u015F izleri")}</p><h2 class="b2">${p>
0?\u00E7("\u015Eehrin hasar\u0131 {n}",{n:ppmYuzde(p)}):\u00E7("\u015Eehir onar\u0131ld\u0131")}</h2></div>
            <span class="ik-kutu">${ikon("hammer")}</span></div>
          ${hasarOzetHtml(h,r)}${onarimHtml(me.repair,r)}${onaranlarHtml(h)}`,onarimBagla(on,me.repair,()=>yenile()));for(const b of $$("[data-sehir-topraklar]",satir))b.onclick=()=>topraklarAc(b.dataset.
sehirTopraklar);savasSay=geriSay(satir,()=>yenile())}function nabizYazi(){if(!v.nabiz)return"";const devriye=Number(v.nabiz.police??0)+Number(v.nabiz.gendarmes??0),p=(ik,metin,ad)=>`<span data-nabiz="${ad}\
">${ikon(ik)}${metin}</span>`;return`<p class="sehir-nabiz" id="sehir-nabiz"><b>${\u00E7("\u015Eu an:")}</b>${p("users-round",\u00E7("{n} ki\u015Fi",{n:Number(v.nabiz.present??0)}),"kisi")}${devriye?p(
"shield",\u00E7("{n} devriye",{n:devriye}),"devriye"):""}${v.kampanya?p("megaphone",\u00E7("miting"),"miting"):""}</p>`}function vakitCiz(){const g=gunesNe(),tz=DUNYA.ulkeler?.[bolgeBilgi().ulke]?.tz;
let saat="";try{saat=new Date(Date.now()+v.saatFarki).toLocaleTimeString(DIL.yerel,{hour:"2-digit",minute:"2-digit",...tz?{timeZone:tz}:{}})}catch{saat=""}const ad=g.vakit==="gece"?\u00E7("Gece"):g.vakit===
"gun"?\u00E7("G\xFCnd\xFCz"):g.sabah?\u00E7("Sabah"):\u00E7("Ak\u015Fam"),el=$("#sehir-vakit",kap);return el.innerHTML=`${ikon(g.vakit==="gece"?"moon-star":g.vakit==="gun"?"sun":g.sabah?"cloud-sun":"s\
unset")}<span>${esc(ad)}${saat?" \xB7 "+esc(saat):""}</span>`,el.title=\u00E7("Gece ve g\xFCnd\xFCz \u015Fehrin ger\xE7ek saatine g\xF6re"),sahneEl.dataset.vakit=g.vakit,havaCiz(g),g}function havaCiz(g=gunesNe()){
const h=havaGoster(),el=$("#sehir-hava",kap),onizle=havaOnizle!=null;return el&&(el.innerHTML=`${ikon(havaIkon(h,g.vakit==="gece"))}<span>${esc(havaAdi(h))}${onizle?" \xB7 "+esc(\u00E7("\xF6nizleme")):
""}</span>`,el.title=\u00E7("Hava durumu (alt\u0131 saatte bir de\u011Fi\u015Fir); dokun: iki g\xFCnl\xFCk tahmin"),el.setAttribute("aria-label",\u00E7("Hava durumu: {hava}. Tahmini a\xE7",{hava:havaAdi(
h)})),el.classList.toggle("onizleme",onizle),el.setAttribute("aria-expanded",String(secili?.tur==="hava"))),Object.assign(sahneEl.dataset,{hava:h.tur,havaGuclu:h.guclu?"1":"0",mevsim:String(h.mevsim),
kar:h.kar.toFixed(2),havaDilim:String(h.dilim),havaOnizleme:onizle?"1":"0"}),h}function havaUygula(){havaCiz(),mod==="3b"?sehir3bOrnek?.havaYaz(havaSahne(havaGoster())):mod==="2b"&&ciz2b()}function havaOnizleAyarla(i){
havaOnizle=i>0?i:null,kartCiz(),havaUygula()}function ipucuCiz(){$("#sehir-ipucu",kap).innerHTML=mod==="3b"?`${ikon("mouse-pointer-click")}${\u00E7("Binalara dokun \xB7 s\xFCr\xFCkle: d\xF6nd\xFCr \xB7 tekerlek: yak\u0131nl\
a\u015F \xB7 gece ve g\xFCnd\xFCz ger\xE7ek saate g\xF6re")}`:`${ikon("mouse-pointer-click")}${\u00E7("Hafif g\xF6r\xFCn\xFCm \xB7 yerlere ve i\u015Fletmelere dokun")}`;const b=$("#sehir-mod",kap);b.hidden=
!Gorunum.webglVar(),b.setAttribute("aria-label",mod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCme (2B) ge\xE7"):\u00E7("3B g\xF6r\xFCn\xFCme ge\xE7")),b.title=b.getAttribute("aria-label"),$("#sehir-mod-yazi",
kap).textContent=mod==="3b"?\u00E7("2B"):\u00E7("3B"),$("#sehir-genel",kap).hidden=mod!=="3b"}function kartHtml(){if(!secili)return"";const kapat=`<button class="kapat" data-kapat-kart aria-label="${\u00E7(
"Kapat")}">${ikon("x")}</button>`;if(secili.tur==="hava"){const tahmin=havaTahmini(),h0=tahmin[0],sira=havaOnizle??0,tz=DUNYA.ulkeler?.[bolgeBilgi().ulke]?.tz,saat=ms=>{try{return new Date(ms).toLocaleString(
DIL.yerel,{weekday:"short",hour:"2-digit",minute:"2-digit",...tz?{timeZone:tz}:{}})}catch{return""}};return`<section class="bolge-karti cam" data-sehir-kart="hava" data-hava-simdi="${esc(h0.tur)}">${kapat}\

          <p class="ust-yazi">${ikon("umbrella")} ${\u00E7("Hava durumu")} \xB7 ${esc(MEVSIM_AD[h0.mevsim])}</p>
          <h2 class="b2">${esc(havaAdi(h0))}</h2>
          ${h0.kar>0?`<p class="cip" style="margin-top:8px" data-kar-ortusu>${ikon("snowflake")}${\u00E7("Kar \xF6rt\xFCs\xFC: {n}",{n:yuzde(h0.kar)})}</p>`:""}
          <div class="hava-tahmin" id="sehir-tahmin" role="group" aria-label="${\u00E7("\u0130ki g\xFCnl\xFCk tahmin")}">${tahmin.map((h,i)=>`<button type="button" class="hava-dilim${i===sira?" secili":
""}" data-hava-dilim="${i}" data-hava-tur="${esc(h.tur)}" aria-pressed="${i===sira}">
            <span class="hava-saat">${i===0?\u00E7("\u015Eimdi"):esc(saat(h.bas))}</span>${ikon(havaIkon(h))}<span class="hava-ad">${esc(havaAdi(h))}</span></button>`).join("")}</div>
          <p class="kucuk" style="margin-top:8px">${havaOnizle!=null?\u00E7('\xD6nizleme: sahne se\xE7ti\u011Fin saatin havas\u0131n\u0131 g\xF6steriyor. "\u015Eimdi"ye dokununca \u015Fimdiki havaya d\xF6ner.'):
\u00E7("Bir saate dokun: sahnede o saatin havas\u0131n\u0131 \xF6nizle.")}</p>
          <p class="kucuk">${\u00E7("Hava b\xF6lgenin iklimine ve ger\xE7ek takvime g\xF6re alt\u0131 saatte bir de\u011Fi\u015Fir; herkes ayn\u0131 havay\u0131 g\xF6r\xFCr. Yaln\u0131z g\xF6r\xFCn\xFC\u015Ft\xFCr, oyuna etkisi yoktur.")}\
</p>
        </section>`}if(secili.tur==="isletme"){const co=isletmeler().find(x=>x.company_id===secili.id);if(!co)return"";const r=(v.kurallar.data.economy.recipes??[]).find(x=>x.id===co.recipe_id);return`\
<section class="bolge-karti cam" data-sehir-kart="isletme">${kapat}
          <p class="ust-yazi">${ikon(ISLETME_IKON[co.recipe_id]??"factory")} ${esc(tarifAdi(v.kurallar,co.recipe_id))} \xB7 ${esc(TUR_AD[co.kind]??co.kind)}${co.mine?" \xB7 "+\u00E7("senin"):""}</p>
          <h2 class="b2">${esc(co.name)}</h2>
          <p class="cip ${co.producing?"yesil":""}" style="margin-top:8px">${ikon(co.producing?"activity":"pause")}${co.producing?\u00E7("\xDCretimde: bacas\u0131 t\xFCt\xFCyor"):\u00E7("\u015Eu an \xFCretim \
yok")}</p>
          <div class="bilgi-izgara">
            <div><small>${\u00E7("\xDCr\xFCn")}</small><b>${r?esc(varlikAdi(`${r.out[0]}@${r.quality??1}`)):"\u2014"}</b></div>
            <div><small>${\u00E7("A\xE7\u0131k i\u015F yeri")}</small><b>${sayi(co.open_slots)}</b></div>
            ${co.mine?`<div><small>${\u00E7("\u015Eu an \xE7al\u0131\u015Fan")}</small><b>${sayi(co.workers_now??0)}</b></div>`:""}
          </div>
          <div class="satir" style="flex-wrap:wrap;gap:8px">
            ${co.mine?`<button class="dugme kucuk-d" data-git="sehir/uretim">${ikon("factory")}${\u00E7("\u0130\u015Fletmeme git")}</button>`:""}
            ${!co.mine&&co.open_slots>0?`<button class="dugme kucuk-d" data-git="sehir/is">${ikon("briefcase-business")}${\u00E7("\u0130\u015F ilanlar\u0131na bak")}</button>`:""}
          </div>
        </section>`}if(secili.tur==="proje"){const p=projeler().find(x=>x.tur===secili.id);if(!p)return"";const k=(v.kurallar?.data?.city?.projects?.catalog??[]).find(x=>x.id===p.tur);return`<section \
class="bolge-karti cam" data-sehir-kart="proje" data-sehir-proje="${esc(p.tur)}" data-sehir-proje-durum="${esc(p.durum)}">${kapat}
          <p class="ust-yazi">${ikon(BLD_PROJE_IKON[p.tur]??"hammer")} ${\u00E7("Belediye projesi")} \xB7 ${esc(bolgeAdi(v.bolge))}</p>
          <h2 class="b2">${esc(p.ad)}</h2>
          <p class="cip ${p.durum==="active"?"yesil":p.durum==="suspended"?"mercan":"altin"}" style="margin-top:8px">${ikon(p.durum==="active"?"check":p.durum==="suspended"?"pause":"hammer")}${esc(p.durumYazi)}\
</p>
          ${k?`<p class="aciklama" style="font-size:14px">${esc(bldEtki(k))}</p>`:""}
          <div class="bilgi-izgara">
            <div><small>${\u00E7("Ba\u015Flatan")}</small><b>${esc(p.baslatan??"\u2014")}</b></div>
            ${p.durum==="building"&&p.hazir?`<div><small>${\u00E7("Haz\u0131r olur")}</small><b>${esc(saatYaz(p.hazir))}</b></div>`:""}
            ${v.sh.budget_cr!=null?`<div><small>${\u00E7("Belediye b\xFCt\xE7esi")}</small><b>${\u00E7("{kr} kr",{kr:kr(v.sh.budget_cr)})}</b></div>`:""}
          </div>
          ${p.durum==="suspended"?`<p class="kucuk">${\u00E7("Bak\u0131m\u0131 \xF6denemedi\u011Fi i\xE7in etkisi kalkt\u0131; b\xFCt\xE7e gelince kendili\u011Finden a\xE7\u0131l\u0131r.")}</p>`:""}
          <div class="satir" style="flex-wrap:wrap;gap:8px;margin-top:10px"><button class="dugme ikincil kucuk-d" data-bld-ac="${esc(v.bolge)}">${ikon("landmark")}${\u00E7("Belediye")}</button></div>
        </section>`}if(secili.tur==="ev"){const h=evler().find(x=>x.house_id===secili.id);if(!h)return"";const sahibi=h.mine?\u00E7("Sen"):h.owned?h.owner_name??\u00E7("Ad\u0131n\u0131 gizlemi\u015F"):
\u00E7("\u015Eehir");return`<section class="bolge-karti cam" data-sehir-kart="ev">${kapat}
          <p class="ust-yazi">${ikon("house")} ${\u00E7("Konut")} \xB7 ${esc(MAHALLE_TUR[h.zone]??h.zone)}</p>
          <h2 class="b2">${esc(evAdres(h))}</h2>
          <div class="bilgi-izgara">
            <div><small>${\u00E7("Ev")}</small><b>${esc(evOzellik(h))}</b></div>
            <div><small>${\u00E7("Sahibi")}</small><b>${esc(sahibi)}</b></div>
            ${h.for_sale?`<div><small>${h.seller==="city"?\u00E7("\u015Eehirden"):\u00E7("Sat\u0131\u015Fta")}</small><b>${\u00E7("{kr} kr",{kr:kr(h.price)})}</b></div>`:""}
          </div>
          ${h.mine?`<button class="dugme ikincil kucuk-d" data-git="sehir/ev">${ikon("house")}${\u00E7("Evime git")}</button>`:h.for_sale?`<button class="dugme altin kucuk-d" data-ev-al="${esc(h.house_id)}\
">${ikon("key-round")}${\u00E7("Sat\u0131n al")}</button>`:""}
        </section>`}const y=SEHIR_YER[secili.id];if(!y)return"";const dur=durumlar()[secili.id],kapali=y.ulkenin&&yabanci();let ek="";if(secili.id==="belediye"){const n=v.sh.next,satilik=evler().filter(
h=>h.for_sale&&!h.mine),enUcuz=satilik.reduce((a,h)=>a==null||h.price<a?h.price:a,null),io=v.isgal?.occupation,pl=projeler(),calisan=pl.filter(p=>p.durum==="active").length;ek=`${io?`<p class="cip mer\
can" style="margin-top:8px" data-sehir-kart-isgal>${ikon("flame")}${\u00E7("{ulke} i\u015Fgalinde: belediyede i\u015Fgalcinin bayra\u011F\u0131",{ulke:esc(ulkeAdi(io.occupier_country_id))})}</p>`:""}${v.
ozerk?`<p class="cip yesil" style="margin-top:8px" data-sehir-ozerk>${ikon("landmark")}${v.ozerk[1]?\u00E7("\xD6zerk b\xF6lge \xB7 Vali {ad}",{ad:esc(v.ozerk[1])}):\u00E7("\xD6zerk b\xF6lge")}</p>`:v.
ozkSurec?`<p class="cip altin" style="margin-top:8px" data-sehir-ozk-surec>${ikon(v.ozkSurec[1]==="referendum"?"vote":"scroll-text")}${v.ozkSurec[1]==="referendum"?\u00E7("\xD6zerklik referandumu s\xFCr\xFCyor"):
\u00E7("\xD6zerklik s\xFCreci s\xFCr\xFCyor")}</p>`:""}
          ${v.baskent?`<p class="cip ${v.sh.mayor?"yesil":""}" style="margin-top:8px" data-sehir-belediye-baskani="${esc(v.sh.mayor?.character_id??"")}">${ikon("landmark")}${v.sh.mayor?\u00E7("Belediy\
e Ba\u015Fkan\u0131 {ad}",{ad:esc(v.sh.mayor.name)}):\u00E7("Belediye ba\u015Fkan\u0131 yok")}</p>`:""}
          ${n?`<div class="yigin" style="margin:10px 0">${gelisimCubugu(\u00E7("Etkin sakin"),v.sh.active_residents,n.activeResidents)}${gelisimCubugu(\u00E7("\u0130\u015Fletme"),v.sh.companies,n.companies,
"deniz")}${n.projects?gelisimCubugu(\u00E7("\xC7al\u0131\u015Fan proje"),calisan,n.projects,"altin"):""}</div>`:""}
          ${v.baskent&&v.sh.budget_cr!=null?`<p class="kucuk" data-sehir-belediye-butce="${esc(String(v.sh.budget_cr))}">${\u00E7("Belediye b\xFCt\xE7esi: {kr} kredi.",{kr:kr(v.sh.budget_cr)})}</p>`:""}\

          ${pl.length?`<div class="liste sehir-kart-liste" style="margin-top:6px">${pl.map(p=>`<button class="sehir-kart-satir" data-sehir-proje-ac="${esc(p.tur)}">
              <span class="liste-ikon ${p.durum==="active"?"yesil":p.durum==="suspended"?"mercan":"altin"}">${ikon(BLD_PROJE_IKON[p.tur]??"hammer")}</span>
              <span><b>${esc(p.ad)}</b><small>${esc(p.durumYazi)}${p.baslatan?" \xB7 "+\u00E7("ba\u015Flatan {ad}",{ad:esc(p.baslatan)}):""}</small></span></button>`).join("")}</div>`:""}
          <p class="kucuk">${satilik.length?\u00E7("{n} sat\u0131l\u0131k ev; en ucuzu {kr} kredi.",{n:satilik.length,kr:kr(enUcuz)}):\u00E7("\u015Eu an sat\u0131l\u0131k ev yok.")}${calisan?" "+\u00E7(
"{n} belediye projesi \xE7al\u0131\u015F\u0131yor.",{n:sayi(calisan)}):""}</p>`}else if(secili.id==="sanayi"){const l=isletmeler();ek=l.length?`<div class="liste sehir-kart-liste">${l.slice(0,8).map(co=>`\
<button class="sehir-kart-satir" data-sehir-isletme="${esc(co.company_id)}">
            <span class="liste-ikon ${co.producing?"yesil":""}">${ikon(ISLETME_IKON[co.recipe_id]??"factory")}</span>
            <span><b>${esc(co.name)}</b><small>${co.producing?\u00E7("\xDCretimde"):\u00E7("Durgun")}${co.open_slots?" \xB7 "+\u00E7("{n} i\u015F yeri a\xE7\u0131k",{n:Number(co.open_slots)}):""}${co.
mine?" \xB7 "+\u00E7("senin"):""}</small></span></button>`).join("")}</div>`:`<p class="kucuk">${\u00E7("Bu \u015Fehirde hen\xFCz i\u015Fletme yok.")}</p>`}const dugmeler=secili.id==="sanayi"?`<button\
 class="dugme kucuk-d" data-git="sehir/is">${ikon("briefcase-business")}${\u00E7("\u0130\u015F ilanlar\u0131")}</button>
           <button class="dugme ikincil kucuk-d" data-git="sehir/uretim">${ikon("factory")}${isletmeler().some(x=>x.mine)?\u00E7("\u0130\u015Fletmem"):\u00E7("\u0130\u015Fletme kur")}</button>`:kapali?
"":`<button class="dugme kucuk-d" data-git="${y.git}">${ikon(y.ik)}${esc(y.gitAd)}</button>`+(secili.id==="belediye"&&v.baskent?`<button class="dugme ikincil kucuk-d" data-bld-ac="${esc(v.bolge)}">${ikon(
"landmark")}${\u00E7("Belediye")}</button>`:"")+(secili.id==="belediye"&&!v.baskent&&!yabanci()?`<button class="dugme ikincil kucuk-d" data-ozk-bolge-ac="${esc(v.bolge)}">${ikon("map-pin-house")}${\u00E7(
"B\xF6lge")}</button>`:"")+(secili.id==="belediye"&&(v.isgal?.occupation||Number(v.isgal?.damage?.damage_ppm??0)>0)?`<button class="dugme ikincil kucuk-d" data-sehir-topraklar="${esc(v.bolge)}">${ikon(
v.isgal?.occupation?"megaphone":"hammer")}${v.isgal?.occupation?\u00E7("Direni\u015F"):\u00E7("Onar\u0131m")}</button>`:"");return`<section class="bolge-karti cam" data-sehir-kart="${esc(secili.id)}">${kapat}\

        <p class="ust-yazi">${ikon(y.ik)} ${esc(y.ulkenin?ulkeAdi(v.sahip):bolgeAdi(v.bolge))}</p>
        <h2 class="b2">${esc(y.ad)}</h2>
        ${dur?`<p class="cip${secili.id==="kisla"&&v.ulke?.campaigns?.length?" mercan":""}" style="margin-top:8px">${esc(dur)}</p>`:""}
        <p class="aciklama" style="font-size:14px">${esc(y.aciklama)}</p>${ek}
        ${kapali?`<p class="kucuk">${\u00E7("Bu \u015Fehir {ulke} topra\u011F\u0131; {yer} o \xFClkenin vatanda\u015Flar\u0131n\u0131nd\u0131r.",{ulke:esc(ulkeAdi(v.sahip)),yer:esc(y.ad.toLocaleLowerCase(
DIL.yerel))})}</p>`:""}
        ${dugmeler?`<div class="satir" style="flex-wrap:wrap;gap:8px;margin-top:10px">${dugmeler}</div>`:""}
      </section>`}function kartCiz(){const yer=$("#sehir-kart",kap);if(!yer)return;const html=kartHtml();html||(secili=null),yer.innerHTML=html,$("[data-kapat-kart]",yer)?.addEventListener("click",()=>sec(
null));for(const b of $$("[data-git]",yer))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-sehir-isletme]",yer))b.onclick=()=>sec({tur:"isletme",id:b.dataset.sehirIsletme},!0);for(const b of $$(
"[data-sehir-proje-ac]",yer))b.onclick=()=>sec({tur:"proje",id:b.dataset.sehirProjeAc},!0);for(const b of $$("[data-ozk-bolge-ac]",yer))b.onclick=()=>ozkBolgeAc(b.dataset.ozkBolgeAc);for(const b of $$(
"[data-bld-ac]",yer))b.onclick=()=>bldAc(b.dataset.bldAc);for(const b of $$("[data-sehir-topraklar]",yer))b.onclick=()=>topraklarAc(b.dataset.sehirTopraklar);$("[data-ev-al]",yer)?.addEventListener("c\
lick",e=>evAl(e.currentTarget.dataset.evAl));for(const b of $$("[data-hava-dilim]",yer))b.onclick=()=>havaOnizleAyarla(Number(b.dataset.havaDilim))}function sec(s,odakla=!1){const onizlemeBitti=havaOnizle!=
null&&s?.tur!=="hava";secili=s,onizlemeBitti&&(havaOnizle=null),kartCiz(),onizlemeBitti?havaUygula():havaCiz(),odakla&&s&&mod==="3b"&&sehir3bOrnek?.odakla(s.tur,s.id),s&&mod==="2b"&&telefon()&&$("#seh\
ir-kart",kap)?.scrollIntoView({block:"nearest",behavior:hareketAzalt?"auto":"smooth"})}async function evAl(id){const h=evler().find(x=>x.house_id===id);if(!h)return;let ev;try{ev=await Sunucu.cagir("m\
y_home")}catch(e){tost(hataMetni(e),"circle-alert");return}evSatinAlSor(h,ev,v.kurallar,{sonra:()=>yenile()})}function altCiz(){const hepsi=[...isletmeler()].sort((a,b)=>!!b.mine-!!a.mine||!!b.producing-
!!a.producing||!!b.open_slots-!!a.open_slots),l=tumIsletmeler?hepsi:hepsi.slice(0,30);$("#sehir-isletmeler",kap).innerHTML=`
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sanayi")} \xB7 ${esc(bolgeAdi(v.bolge))}</p><h2 class="b2">${\u00E7("\u015Eehrin i\u015Fletmeleri")}</h2></div>
          <span class="cip">${\u00E7("{n} i\u015Fletme",{n:hepsi.length})}</span></div>
        ${l.length?`<div class="liste">${l.map(co=>`<div class="liste-satir">
            <span class="liste-ikon ${co.producing?"yesil":""}">${ikon(ISLETME_IKON[co.recipe_id]??"factory")}</span>
            <div><span class="tur">${esc(tarifAdi(v.kurallar,co.recipe_id))}${co.mine?" \xB7 "+\u00E7("senin"):""}</span><b>${esc(co.name)}</b>
              <div class="odul"><span>${ikon(co.producing?"activity":"pause")}${co.producing?\u00E7("\xDCretimde"):\u00E7("Durgun")}</span>${co.open_slots?`<span>${ikon("briefcase-business")}${\u00E7(
"{n} i\u015F yeri a\xE7\u0131k",{n:Number(co.open_slots)})}</span>`:""}</div></div>
            <button class="dugme ikincil kucuk-d" data-sehir-goster="${esc(co.company_id)}">${ikon("eye")}${\u00E7("G\xF6ster")}</button>
          </div>`).join("")}</div>
          ${hepsi.length>l.length?`<button class="dugme sade kucuk-d" style="margin-top:8px" data-isletme-tumu>${ikon("chevron-down")}${\u00E7("T\xFCm\xFCn\xFC g\xF6ster ({n} i\u015Fletme daha)",{n:sayi(
hepsi.length-l.length)})}</button>`:""}
          ${hepsi.length>SEHIR_ISLETME_EN_COK?`<p class="kucuk" style="margin-top:8px">${\u00E7("Maket en \xE7ok {n} i\u015Fletmeyi g\xF6sterir: \xF6nce seninki, sonra \xFCretimdekiler.",{n:SEHIR_ISLETME_EN_COK})}\
</p>`:""}`:`<p class="bos">${\u00E7("Bu \u015Fehirde hen\xFCz i\u015Fletme yok. \u0130lk i\u015Fletmeyi sen kur; binas\u0131 \u015Fehirde y\xFCkselir.")}</p>
             <button class="dugme kucuk-d" data-git="sehir/uretim">${ikon("factory")}${\u00E7("\u0130\u015Fletme kur")}</button>`}`;const d=durumlar(),yerler=["meclis","kisla","belediye","pazar","gaze\
te","meydan","akademi",limanMi()?"liman":"istasyon"];$("#sehir-yerler",kap).innerHTML=`
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehirde")}</p><h2 class="b2">${\u00E7("Yerler")}</h2></div><span class="ik-kutu">${ikon("map-pin")}</span></div>
        <div class="sehir-yerler">${yerler.map(id=>{const y=SEHIR_YER[id],kapali=y.ulkenin&&yabanci();return`<button class="sehir-yer" data-sehir-yer="${id}" ${kapali?"disabled":""}>
            <span class="liste-ikon">${ikon(y.ik)}</span><span><b>${esc(y.ad)}</b><small>${esc(kapali?\u00E7("{ulke} vatanda\u015Flar\u0131n\u0131n",{ulke:ulkeAdi(v.sahip)}):d[id]||y.gitAd)}</small></\
span></button>`}).join("")}</div>`;for(const b of $$("[data-git]",$("#sehir-isletmeler",kap)))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-isletme-tumu]",kap))b.onclick=()=>{tumIsletmeler=
!0,altCiz()};for(const b of $$("[data-sehir-goster]",kap))b.onclick=()=>{sec({tur:"isletme",id:b.dataset.sehirGoster},!0),sahneEl.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})};
for(const b of $$("[data-sehir-yer]",kap))b.onclick=()=>Kabuk.git(SEHIR_YER[b.dataset.sehirYer].git);unCiz()}function projeCiz(){const kutu=$("#sehir-projeler",kap);if(!kutu)return;if(kutu.hidden=!v.baskent,
!v.baskent){kutu.innerHTML="";return}const pl=projeler();kutu.innerHTML=`<div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Belediye")} \xB7 ${esc(bolgeAdi(v.bolge))}</p><h2 class="b2">${\u00E7(
"Belediye projeleri")}</h2></div><span class="ik-kutu">${ikon("hammer")}</span></div>
        <p class="kucuk">${v.sh.mayor?\u00E7("Karar\u0131 Belediye Ba\u015Fkan\u0131 {ad} verir.",{ad:esc(v.sh.mayor.name)}):\u00E7("G\xF6revde belediye ba\u015Fkan\u0131 yok: ge\xE7ici sistem y\xF6netimi.")}${v.
sh.budget_cr!=null?" "+\u00E7("B\xFCt\xE7e {kr} kredi.",{kr:kr(v.sh.budget_cr)}):""}</p>
        ${pl.length?`<div class="liste" style="margin-top:8px">${pl.map(p=>`<div class="liste-satir" data-sehir-proje-satir="${esc(p.tur)}" data-durum="${esc(p.durum)}">
            <span class="liste-ikon ${p.durum==="active"?"yesil":p.durum==="suspended"?"mercan":"altin"}">${ikon(BLD_PROJE_IKON[p.tur]??"hammer")}</span>
            <div><span class="tur">${esc(p.durumYazi)}</span><b>${esc(p.ad)}</b>${p.baslatan?`<div class="alt">${\u00E7("Ba\u015Flatan: {ad}.",{ad:esc(p.baslatan)})}</div>`:""}</div>
            <button class="dugme ikincil kucuk-d" data-sehir-proje-goster="${esc(p.tur)}">${ikon("eye")}${\u00E7("G\xF6ster")}</button></div>`).join("")}</div>`:`<p class="bos">${\u00E7("Belediye hen\xFC\
z proje ba\u015Flatmad\u0131. Kurulan proje \u015Fehirde iskeleyle y\xFCkselir.")}</p>`}
        <div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-bld-ac="${esc(v.bolge)}">${ikon("landmark")}${\u00E7("Belediye")}</button></div>`;for(const b of $$("[data\
-sehir-proje-goster]",kutu))b.onclick=()=>{sec({tur:"proje",id:b.dataset.sehirProjeGoster},!0),sahneEl.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})};for(const b of $$("[data-b\
ld-ac]",kutu))b.onclick=()=>bldAc(b.dataset.bldAc)}function unCiz(){const satir=$("#sehir-un-satir",kap);if(!v.un||!v.dedikodu){satir.hidden=!0;return}satir.hidden=!1;const u=v.un,r=u.rule,me=u.me;$("\
#sehir-un",kap).innerHTML=`
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u015E\xF6hret")} \xB7 ${esc(bolgeAdi(v.bolge))}</p><h2 class="b2">${\u00E7("\u015Eehrin tan\u0131nanlar\u0131")}</h2></div><span class\
="ik-kutu">${ikon("sparkles")}</span></div>
        ${u.board.length?`<ol class="liste un-liste">${u.board.map(x=>`<li class="liste-satir${x.me?" ben":""}" data-un-kisi="${esc(x.character_id)}">
            <span class="liste-ikon un-sira${x.rank===1?"":" lacivert"}">${sayi(x.rank)}</span>
            <div><span class="tur">${esc(unBasamakAdi(x.tier,x.is_legend))}${x.me?" \xB7 "+\u00E7("sen"):""}</span>
              <b><button type="button" class="baglanti" data-un-profil="${esc(x.character_id)}">${esc(x.name)}</button></b>
              <div class="alt">${\u00E7("G\xFCncel \xFCn {n} \xB7 efsane {m}",{n:sayi(x.popularity),m:sayi(x.legend)})}</div></div><span></span></li>`).join("")}</ol>`:`<p class="bos">${\u00E7("Bu \u015Feh\
irde hen\xFCz tan\u0131nan kimse yok.")}</p>`}
        <p class="kucuk" style="margin-top:8px">${me?\u00E7("Senin \xFCn\xFCn burada: {n} ({basamak}); s\u0131ran {s}.",{n:sayi(me.popularity),basamak:esc(unBasamakAdi(me.tier,me.is_legend)),s:sayi(me.
rank)}):\u00E7("Bu \u015Fehirde hen\xFCz \xFCn\xFCn yok.")}${u.my_cities?.length?" "+\u00E7("En \xE7ok tan\u0131nd\u0131\u011F\u0131n \u015Fehir: {sehir}.",{sehir:esc(bolgeAdi(u.my_cities[0].region_id))}):
""}</p>
        <p class="kucuk">${\u00E7("\xDCn yaln\u0131z herkese a\xE7\u0131k olaylardan gelir ({kaynaklar}); son {g} g\xFCn\xFCn olaylar\u0131 g\xFCncel \xFCn\xFC, b\xFCt\xFCn zamanlar efsaneyi yapar. \xDCn g\xFC\xE7, gelir ya da oy vermez.",
{kaynaklar:Object.keys(UN_KAYNAK).filter(k=>r.sources?.[k]!=null).map(k=>UN_KAYNAK[k]).join(", "),g:sayi(r.window_days)})}</p>`;const d=v.dedikodu;$("#sehir-dedikodu",kap).innerHTML=`
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Gazete")} \xB7 ${\u00E7("son {n} saat",{n:sayi(d.hours)})}</p><h2 class="b2">${\u00E7("Dedikodu k\xF6\u015Fesi")}</h2></div><span class\
="ik-kutu">${ikon("newspaper")}</span></div>
        ${d.items.length?`<div class="liste">${d.items.map(x=>{const[ik,metin]=dedikoduMetni(x);return`<div class="liste-satir" data-dedikodu="${esc(x.kind)}"><span class="liste-ikon">${ik}</span>
            <div><span class="tur">${esc(saatYaz(x.at))}</span><div class="alt" style="font-size:13.5px">${metin}</div></div><span></span></div>`}).join("")}</div>`:`<p class="bos">${\u00E7("\u015Eehirde b\
ug\xFCnlerde konu\u015Fulacak bir \u015Fey olmad\u0131.")}</p>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Dedikodu yaln\u0131z oyunun herkese a\xE7\u0131k olaylar\u0131d\u0131r: ki\u015Fisel veri ve sicil yer almaz, g\xF6lgedeki olaylar ads\u0131zd\u0131r.")}\
</p>`;for(const b of $$("[data-un-profil]",kap))b.onclick=()=>profilAc(b.dataset.unProfil)}function ciz2b(){const kutu=$("#sehir-2b",kap),b=bolgeBilgi(),kiyi=limanMi(),L=Number(v.sh.level)||1,P=SEHIR_PALET[b.
iklim]??SEHIR_PALET.bozkir,g=gunesNe(),f=n=>n.toFixed(2),cizim=[],hv=havaGoster(),zemin=renkKaristir(renkKaristir(P.zemin,"#F4F7F8",Math.min(.85,hv.kar*1.1)),"#4E5A63",hv.tur==="yagmur"?hv.guclu?.2:.12:
0);if(cizim.push(`<circle r="18.7" class="s2b-kaide"/><circle r="18" fill="${zemin}"/>`),kiyi){const n=[];for(let x=-18.5;x<=18.5;x+=.5)n.push(`${f(x)},${f(sehirKiyiZ(x))}`);cizim.push(`<clipPath id="\
s2b-daire"><circle r="18"/></clipPath>
          <g clip-path="url(#s2b-daire)"><path class="s2b-deniz" d="M${n.join(" L")} L18.5,19 L-18.5,19 Z"/>
          <polyline class="s2b-kumsal" points="${n.join(" ")}" style="stroke:${P.kum}"/></g>`)}for(let k=1;k<=4;k++){const[r0,r1]=SEHIR_BANT[k];cizim.push(`<circle r="${f((r0+r1)/2)}" class="s2b-bant"\
 style="stroke-width:${f(r1-r0)}"/>`)}const son=L>=5?SEHIR_R-.4:SEHIR_HALKA[Math.min(L,4)-1]+1.6;for(let k=0;k<Math.min(L,4);k++)cizim.push(`<circle r="${SEHIR_HALKA[k]}" class="s2b-yol" style="stroke\
:${P.yol}"/>`);for(const c of SEHIR_CADDE){let r1=son;if(kiyi){for(let r=SEHIR_MEYDAN_R;r<=son;r+=.25)if(Math.sin(c)*r>sehirKiyiZ(Math.cos(c)*r)-.3){r1=r;break}}cizim.push(`<line x1="${f(Math.cos(c)*SEHIR_MEYDAN_R)}\
" y1="${f(Math.sin(c)*SEHIR_MEYDAN_R)}" x2="${f(Math.cos(c)*r1)}" y2="${f(Math.sin(c)*r1)}" class="s2b-cadde" style="stroke:${P.yol}"/>`)}cizim.push(`<circle r="${SEHIR_MEYDAN_R}" fill="${P.meydan}" c\
lass="s2b-meydan"/><circle r="0.75" class="s2b-havuz"/>`);const evYer=new Map;for(const[zone,bant]of Object.entries({merkez:1,ic:2,ara:3,kenar:4})){const[r0,r1]=SEHIR_BANT[bant],rr=(r0+r1)/2,adim=1.5/
rr,adaylar=[];for(let a=0;a<Math.PI*2;a+=adim){const x=Math.cos(a)*rr,z=Math.sin(a)*rr;SEHIR_CADDE.some(c=>Math.abs(Math.atan2(Math.sin(a-c),Math.cos(a-c)))*rr<1.1)||bant===2&&Math.abs(Math.atan2(Math.
sin(a),Math.cos(a)))<56*Math.PI/180||kiyi&&z>sehirKiyiZ(x)-1||adaylar.push({a,x,z})}adaylar.sort((p,q)=>q.z-p.z),evler().filter(h=>h.zone===zone).sort((p,q)=>p.no-q.no).forEach((h,i)=>{const p=adaylar[i];
if(!p)return;evYer.set(h.house_id,p);const sinif=h.mine?"benim":h.for_sale?"satilik":h.owned?"sahipli":"";cizim.push(`<rect x="-0.5" y="-0.5" width="1" height="1" rx="0.12" class="s2b-ev ${sinif}" tra\
nsform="translate(${f(p.x)} ${f(p.z)}) rotate(${f(p.a*180/Math.PI+90)})"/>`)})}for(const id of["meclis","belediye","gazete","pazar","akademi","kisla",kiyi?"liman":"istasyon"]){const[x,z]=SEHIR2B_YER[id];
cizim.push(`<rect x="${f(x-.9)}" y="${f(z-.6)}" width="1.8" height="1.2" rx="0.2" class="s2b-simge"/>`)}(v.elcilikler??[]).slice(0,3).forEach((u,i)=>{const x=.9+i*.75,z=-1.9;cizim.push(`<g data-s2b-el\
cilik="${esc(u)}"><rect x="${f(x-.3)}" y="${f(z-.25)}" width="0.6" height="0.5" rx="0.08" class="s2b-simge"/>
          <line x1="${f(x+.32)}" y1="${f(z+.25)}" x2="${f(x+.32)}" y2="${f(z-.75)}" stroke="#8D8A84" stroke-width="0.06"/>
          <rect x="${f(x+.33)}" y="${f(z-.75)}" width="0.42" height="0.27" fill="${ulkeRenk(u)}"><title>${esc(\u00E7("B\xFCy\xFCkel\xE7ilik: {ulke}",{ulke:ulkeAdi(u)}))}</title></rect></g>`)});const yerler=sehirIsletmeYerleri(
kiyi);isletmeler().slice(0,yerler.length).forEach((co,i)=>{const y=yerler[i],x=Math.cos(y.a)*y.rr,z=Math.sin(y.a)*y.rr,ik=IKON[ISLETME_IKON[co.recipe_id]??"factory"]??"";cizim.push(`<g class="s2b-isle\
tme${co.producing?" uretimde":""}${co.mine?" benim":""}" transform="translate(${f(x)} ${f(z)})" data-s2b-isletme="${esc(co.company_id)}" role="button" tabindex="0" aria-label="${esc(co.name)}, ${co.producing?
\u00E7("\xFCretimde"):\u00E7("durgun")}">
          <circle r="1.9" class="s2b-dokun"/>
          <rect x="-1.3" y="-0.9" width="2.6" height="1.8" rx="0.22" class="s2b-isletme-govde"/>
          <svg x="-0.7" y="-0.7" width="1.4" height="1.4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="s2b-isletme-ik"\
>${ik}</svg>
          <circle cx="1" cy="-0.7" r="0.26" class="s2b-baca"/>
          ${co.producing?'<g class="s2b-duman"><circle cx="1" cy="-0.8" r="0.4"/><circle cx="1" cy="-0.8" r="0.4"/><circle cx="1" cy="-0.8" r="0.4"/></g>':""}
        </g>`)});const pl=projeler();for(const p of pl){const yer=SEHIR2B_PROJE_YER[p.tur];if(!yer)continue;const sinif={building:"yapim",active:"acik",suspended:"askida"}[p.durum]??"",ik=IKON[BLD_PROJE_IKON[p.
tur]??"hammer"]??"";cizim.push(`<g class="s2b-proje ${sinif}" transform="translate(${f(yer[0])} ${f(yer[1])})" data-s2b-proje="${esc(p.tur)}" data-durum="${esc(p.durum)}" role="button" tabindex="0" ar\
ia-label="${esc(p.ad)}, ${esc(p.durumYazi)}">
          <circle r="1.9" class="s2b-dokun"/>
          <rect x="-1.2" y="-0.95" width="2.4" height="1.9" rx="0.25" class="s2b-proje-govde"/>
          ${p.durum==="building"?'<path d="M-1.2 0.95 L-0.2 -0.95 M-0.4 0.95 L0.6 -0.95 M0.4 0.95 L1.2 -0.55" class="s2b-proje-iskele"/>':""}
          <svg x="-0.65" y="-0.75" width="1.3" height="1.3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="s2b-proje-ik"\
>${ik}</svg>
          ${p.durum==="building"?`<rect x="-1.2" y="1.15" width="2.4" height="0.32" rx="0.16" class="s2b-proje-bos"/><rect x="-1.2" y="1.15" width="${f(2.4*Math.max(.05,p.ilerleme))}" height="0.32" rx\
="0.16" class="s2b-proje-cubuk"/>`:""}
        </g>`)}const sv=savasDurumu(),savas=sv?sehir2bSavas(sv,kiyi,v.bolge,hareketAzalt):null;savas&&cizim.push(savas.svg);const hayat=sehir2bHayat({nabiz:v.nabiz,kampanya:v.kampanya,secim:v.secim,L,
kiyi,son,durgun:hareketAzalt,tohum:ozet(String(v.bolge))});cizim.push(hayat.svg),g.gece>.02&&cizim.push(`<circle r="18.7" class="s2b-gece" style="opacity:${(.38*g.gece).toFixed(2)}"/>`),cizim.push(sehir2bHava(
hv,hareketAzalt));const d=durumlar(),ignler=[],igne=(id,x,z,ad,ik,durumMetni,sinif="")=>ignler.push(`<button type="button" class="nokta ${sinif}" data-s2b-nokta="${esc(id)}" data-oncelik="${SEHIR2B_ONCELIK[id.
split(":")[0]]??2}"
        style="left:${f((x+20)/40*100)}%;top:${f((z+20)/40*100)}%" aria-label="${esc(ad)}${durumMetni?", "+esc(durumMetni):""}">
        <span class="nokta-ikon">${ikon(ik)}</span><span class="nokta-ad">${esc(ad)}</span>${durumMetni?`<span class="nokta-durum">${esc(durumMetni)}</span>`:""}</button>`),benimIs=isletmeler().slice(
0,yerler.length).findIndex(co=>co.mine);for(const id of["meclis","belediye","gazete","pazar","akademi","kisla",kiyi?"liman":"istasyon",...benimIs>=0?[]:["sanayi"]]){const[x,z]=SEHIR2B_YER[id];igne(id,
x,z-.5,SEHIR_YER[id].ad,SEHIR_YER[id].ik,d[id])}if(benimIs>=0){const co=isletmeler()[benimIs],y=yerler[benimIs];igne("isletmem:"+co.company_id,Math.cos(y.a)*(y.rr+1.6),Math.sin(y.a)*(y.rr+1.6)-.3,\u00E7(
"\u0130\u015Fletmen"),"briefcase-business",co.producing?\u00E7("\xDCretimde"):\u00E7("Durgun"),"evim")}for(const p of pl){const yer=SEHIR2B_PROJE_YER[p.tur];yer&&igne("proje:"+p.tur,yer[0],yer[1]-1.1,
p.ad,BLD_PROJE_IKON[p.tur]??"hammer",p.durumYazi,"kucuk-nokta proje-nokta")}const benimEv=evler().find(h=>h.mine),ep=benimEv&&evYer.get(benimEv.house_id);ep&&igne("evim:"+benimEv.house_id,ep.x,ep.z-.6,
\u00E7("Evim"),"house",\u00E7("Senin evin"),"evim"),kutu.innerHTML=`<div class="s2b-kare" id="s2b-kare">
        <svg viewBox="-20 -20 40 40" role="img" aria-label="${\u00E7("{sehir} \u015Fehrinin plan\u0131, hafif g\xF6r\xFCn\xFCm",{sehir:esc(bolgeAdi(v.bolge))})}" ${hayat.oz} ${savas?.oz??""} data-hava\
="${esc(hv.tur)}" data-kar="${hv.kar.toFixed(2)}">${cizim.join("")}</svg>
        <div class="s2b-noktalar">${ignler.join("")}</div></div>`;for(const el of $$("[data-s2b-nokta]",kutu))el.onclick=()=>{const[tur,id]=el.dataset.s2bNokta.split(":");sec(tur==="evim"?{tur:"ev",id}:
tur==="isletmem"?{tur:"isletme",id}:tur==="proje"?{tur:"proje",id}:{tur:"yer",id:tur})};for(const el of $$("[data-s2b-proje]",kutu)){const ac=()=>sec({tur:"proje",id:el.dataset.s2bProje});el.addEventListener(
"click",ac),el.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ac())})}for(const el of $$("[data-s2b-isletme]",kutu)){const ac=()=>sec({tur:"isletme",id:el.dataset.s2bIsletme});
el.addEventListener("click",ac),el.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ac())})}yerlesim2b()}function yerlesim2b(){const kare=$("#s2b-kare",kap);if(!kare||
mod!=="2b")return;const r=sahneEl.getBoundingClientRect();if(r.width<2)return;if(r.width>860){const ust=$("#sehir-ust",kap).getBoundingClientRect(),arac=$(".sehir-araclar",kap).getBoundingClientRect(),
x0=Math.min(r.width*.5,ust.right-r.left+20),x1=arac.left-r.left-12,y0=12,y1=r.height-12,boy=Math.max(180,Math.min(x1-x0,y1-y0));Object.assign(kare.style,{width:boy+"px",height:boy+"px",left:(x0+x1-boy)/
2+"px",top:(y0+y1-boy)/2+"px"})}else kare.removeAttribute("style");const dolu=[],kesisir=k=>dolu.some(q=>!(k.right<q.left||k.left>q.right||k.bottom<q.top||k.top>q.bottom)),ignler=$$(".s2b-noktalar .no\
kta",kare).sort((a,b)=>Number(b.dataset.oncelik)-Number(a.dataset.oncelik));for(const el of ignler){el.classList.remove("sikisik"),el.style.visibility="";let k=el.getBoundingClientRect();if(kesisir(k)&&
(el.classList.add("sikisik"),k=el.getBoundingClientRect(),kesisir(k))){el.style.visibility="hidden";continue}dolu.push(k)}}function boslukBildir(){if(mod!=="3b"||!sehir3bOrnek)return;const r=sahneEl.getBoundingClientRect();
if(r.height<2)return;const ust=$("#sehir-ust",kap).getBoundingClientRect(),arac=$(".sehir-araclar",kap).getBoundingClientRect();if(r.width>860){const kutu=e=>{const q=e.getBoundingClientRect();return[
q.left-r.left-4,q.top-r.top-4,q.right-r.left+4,q.bottom-r.top+4]};sehir3bOrnek.bosluk(0,0,[kutu($("#sehir-ust",kap)),kutu($(".sehir-araclar",kap)),kutu($("#sehir-ipucu",kap))])}else sehir3bOrnek.bosluk(
ust.bottom-r.top+4,r.bottom-arac.top+4)}const gozlem=new ResizeObserver(()=>{boslukBildir(),yerlesim2b()});gozlem.observe(sahneEl),gozlem.observe($("#sehir-ust",kap));async function modKur(){const yuk=$(
"#sehir-yukleniyor",kap),iki=$("#sehir-2b",kap);if(Gorunum.uc()&&!hata3b){yuk.classList.remove("bitti");try{const{THREE,OrbitControls,birlestir,cizici}=await Uc.yukle("37_sehir_ekran.js");if(kapandi)return;
sehir3bOrnek??=sehir3bKur(THREE,OrbitControls,birlestir,cizici);const a=sehir3bOrnek;if(a.dinle("nokta",id=>sec({tur:"yer",id})),a.dinle("isletme",id=>sec({tur:"isletme",id})),a.dinle("proje",id=>sec(
{tur:"proje",id})),a.dinle("ev",id=>sec({tur:"ev",id})),a.dinle("bos",()=>{secili&&sec(null)}),a.kapBagla(sahneEl,$("#sehir-noktalar",kap)),a.durumYaz(durum3b()),!cizici.bagla(a,sahneEl))throw new Error(
"webgl-bagla");iki.hidden=!0,iki.replaceChildren(),mod="3b",boslukBildir(),sahneEl.dataset.mod="3b",yuk.classList.add("bitti"),ipucuCiz();return}catch(e){console.warn("3B \u015Fehir a\xE7\u0131lamad\u0131:",
e),hata3b=!0,kapandi||tost(\u00E7("3B \u015Fehir bu cihazda a\xE7\u0131lamad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),"layers")}}kapandi||(sehir3bOrnek&&Uc.cizici?.birak(sehir3bOrnek),Uc.cizici?.
renderer?.domElement.parentElement===sahneEl&&Uc.cizici.renderer.domElement.remove(),$("#sehir-noktalar",kap).replaceChildren(),mod="2b",sahneEl.dataset.mod="2b",iki.hidden=!1,ciz2b(),yuk.classList.add(
"bitti"),ipucuCiz())}function hepsiniCiz(){ustCiz(),vakitCiz(),savasCiz(),altCiz(),projeCiz(),kartCiz()}const yenile=tazeleyici(async()=>{const once=v?.bolge;await yukle(!1),!kapandi&&(v.bolge!==once&&
(secili=null),hepsiniCiz(),mod==="3b"?sehir3bOrnek?.durumYaz(durum3b()):mod==="2b"&&ciz2b())}),tamYenile=tazeleyici(async()=>{await yukle(!0),!kapandi&&(secili=null,hepsiniCiz(),mod==="3b"?sehir3bOrnek?.
durumYaz(durum3b()):mod==="2b"&&ciz2b())});await yukle(!0),hepsiniCiz(),$("#sehir-genel",kap).onclick=()=>sehir3bOrnek?.genelBakis(),$("#sehir-hava",kap).onclick=()=>sec(secili?.tur==="hava"?null:{tur:"\
hava"}),$("#sehir-mod",kap).onclick=()=>{hata3b=!1,Gorunum.ayarla(mod==="3b"?"2b":"3b")},await modKur();const b0=Gorunum.dinle(()=>{kapandi||(hata3b=!1,modKur())}),b1=Durum.dinle("olay",({olay})=>{/^travel\.arrived/.
test(olay)?tamYenile():/^(job\.|house\.|company\.)/.test(olay)&&yenile()}),b2=Sunucu.Canli.dinle("public:city",(olay,yuk)=>{!v||yuk?.data?.region_id!==v.bolge||olay==="city.concert"||(olay==="city.lev\
el_up"&&tost(\u00E7("{sehir} b\xFCy\xFCd\xFC: art\u0131k {seviye}!",{sehir:bolgeAdi(v.bolge),seviye:yuk.data.name?\u00E7v(yuk.data.name):\u00E7("bir \xFCst seviye")}),"party-popper"),yenile())}),b3=Sunucu.
Canli.dinle("public:company",(olay,yuk)=>{olay==="company.founded"&&v&&yuk?.data?.region_id===v.bolge&&yenile()}),b4=Durum.dinle("ulke-olay",({olay})=>{/^(parliament\.motion_(opened|closed)|country\.war_|municipal\.|mayor\.)/.
test(olay)&&yenile()}),b5=Sunucu.Canli.dinle("public:region",(olay,yuk)=>{v&&yuk?.data?.region_id===v.bolge&&/^(occupation|resistance|damage)\./.test(olay)&&yenile()}),zamanlayici=setInterval(()=>{document.
hidden||yenile()},6e4);return()=>{kapandi=!0,clearInterval(zamanlayici),b0(),b1(),b2(),b3(),b4(),b5(),savasSay(),gozlem.disconnect(),sehir3bOrnek&&Uc.cizici?.birak(sehir3bOrnek)}}}),Parcalar.tamam("ek\
_37_sehir_ekran");
