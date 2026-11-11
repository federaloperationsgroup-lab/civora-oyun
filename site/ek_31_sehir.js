// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_31_sehir.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/ev",{async ac(kap){let v=null,odaKapat=null,zy=null;const partiEl=document.createElement("div");partiEl.id="parti-yer",partiEl.style.marginTop="20px";const partiKapat=EvPartisiKart.
ac(partiEl);async function yukle(){const[ev,kurallar,,oda,harita,kariyer]=await Promise.all([Sunucu.cagir("my_home"),Durum.kurallar(),Durum.ozet(),Sunucu.cagir("home_layout"),Durum.harita().catch(()=>null),
Sunucu.cagir("media_career").catch(()=>null)]),burasi=await Sunucu.cagir("city",{p_region:ev.location_region_id});v={ev,burasi,kurallar,oda,harita,kariyer}}function evimKarti(ev,kurallar){const h=ev.house;
if(!h)return`<section class="kart">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Evim")}</p><h2 class="b2">${\u00E7("Hen\xFCz evin yok")}</h2></div><span class="ik-kutu">${ikon("bed")}</span></div>
          <p class="aciklama">${\u00E7("\u0130kamet etti\u011Fin \u015Fehirde \xFCcretsiz bir pansiyon odan var. Ev almak istersen bulundu\u011Fun \u015Fehrin sat\u0131l\u0131k evlerine bak.")}</p>
          <div class="yasa-bant">${ikon("key-round")}<span>${\u00E7("Ev oyunda g\xFC\xE7 vermez: sava\u015F g\xFCc\xFC, oy a\u011F\u0131rl\u0131\u011F\u0131 ya da gelir getirmez. \u015Eehirde evin g\xF6r\xFCn\xFCr; odan\u0131 d\xF6\u015Feyip arkada\u015Flar\u0131n\u0131 a\u011F\u0131rlayabilir\
sin.")}</span></div>
        </section>`;const ucretPpm=kurallar.data.market.serviceFeePpm,satista=h.for_sale,vergi=satista&&h.sale_tax_ppm!=null?Math.floor(h.price*h.sale_tax_ppm/1e6):null,bedel=satista?Math.floor(h.price*
ucretPpm/1e6):null;return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Evim")}</p><h2 class="b2">${esc(evAdres(h))}</h2></div><span class="ik-kutu">${ikon("house")}</span></div>
        <div class="bilgi-izgara">
          <div><small>${\u00E7("\u015Eehir")}</small><b>${esc(bolgeAdi(h.region_id))}</b></div>
          <div><small>${\u00E7("Mahalle")}</small><b>${esc(MAHALLE_TUR[h.zone]??h.zone)}</b></div>
          <div><small>${\u00E7("Ev")}</small><b>${esc(evOzellik(h))}</b></div>
          <div><small>${\u00E7("Kap\u0131da ad\u0131n")}</small><b>${h.visible?\u00E7("G\xF6r\xFCn\xFCyor"):\u00E7("Gizli")}</b></div>
        </div>
        ${satista?`<div class="bilgi-kutusu">${ikon("hand-coins")}<span>${\u00E7("Evin sat\u0131\u015Fta: <b>{kr} kredi</b>.",{kr:kr(h.price)})}${vergi!=null?" "+\u00E7("Sat\u0131l\u0131nca sat\u0131\u015F vergisi ({vo},\
 {vk} kredi) ve hizmet bedeli ({ho}, {hk} kredi) d\xFC\u015F\xFCl\xFCr; eline <b>{net} kredi</b> ge\xE7er.",{vo:ppmYuzde(h.sale_tax_ppm),vk:kr(vergi),ho:ppmYuzde(ucretPpm),hk:kr(bedel),net:kr(h.price-
vergi-bedel)}):""}</span></div>`:""}
        <div class="oneri-dugmeler" style="margin-top:14px">
          <button class="dugme ${satista?"ikincil":""} kucuk-d" id="ev-sat">${ikon("hand-coins")}${satista?\u00E7("Fiyat\u0131 de\u011Fi\u015Ftir"):\u00E7("Sat\u0131\u015Fa \xE7\u0131kar")}</button>
          ${satista?`<button class="dugme ikincil kucuk-d" id="ev-cek">${ikon("x")}${\u00E7("Sat\u0131\u015Ftan \xE7ek")}</button>`:""}
          <button class="dugme sade kucuk-d" id="ev-gorunur">${ikon(h.visible?"lock":"eye")}${h.visible?\u00E7("Ad\u0131m\u0131 gizle"):\u00E7("Ad\u0131m\u0131 g\xF6ster")}</button>
        </div>
        <p class="kucuk" style="margin-top:10px">${\u00E7("Sisteme geri sat\u0131\u015F yoktur; evini ba\u015Fka bir oyuncuya satabilirsin. B\xF6lge fethedilse de ev senin kal\u0131r.")}</p>
      </section>`}function ikametKarti(ev,kurallar){const gun=kurallar.data.city.housing.moveCooldownDays,baska=ev.location_region_id!==ev.residence_region_id;return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u0130kamet")}</p><h2 class="b2">${esc(bolgeAdi(ev.residence_region_id))}</h2></div><span class="ik-kutu">${ikon("map-pin-house")}</spa\
n></div>
        <p class="aciklama">${\u00E7("Oturdu\u011Fun \u015Fehir. Orada \xE7al\u0131\u015Ft\u0131k\xE7a \u015Fehrin b\xFCy\xFCmesine say\u0131l\u0131rs\u0131n. Belediye se\xE7imi ve yerel direni\u015F hakk\u0131 da ikametine g\xF6re olacak.")}\
</p>
        ${baska?ev.can_move_here?`<div class="yasa-bant">${ikon("map-pin")}<span>${\u00E7("\u015Eu an <b>{bolge}</b> b\xF6lgesindesin. Buraya ta\u015F\u0131nabilirsin; ta\u015F\u0131nma {n} g\xFCnde bir yap\u0131l\u0131r.",
{bolge:esc(bolgeAdi(ev.location_region_id)),n:Number(gun)})}
               ${ev.house?\u00E7("Evin oldu\u011Fu yerde kal\u0131r."):\u00E7("\xDCcretsiz odan da seninle gelir.")}</span></div>
             <button class="dugme altin" id="tasin">${ikon("map-pin-house")}${\u00E7("Buraya ta\u015F\u0131n")}</button>`:`<p class="kucuk">${\u00E7("\u015Eu an <b>{bolge}</b> b\xF6lgesindesin. Ta\u015F\u0131nma {n} g\xFC\
nde bir; en erken {zaman}.",{bolge:esc(bolgeAdi(ev.location_region_id)),n:Number(gun),zaman:esc(saatYaz(ev.next_move_at))})}</p>`:`<p class="kucuk">${ikon("map-pin")} ${\u00E7("\u015Eu an da burada bulunuy\
orsun.")}${ev.next_move_at&&Date.parse(ev.next_move_at)>Date.now()?" "+\u00E7("Sonraki ta\u015F\u0131nma en erken {zaman}.",{zaman:esc(saatYaz(ev.next_move_at))}):""}</p>`}
      </section>`}function gelisimKarti(sh,kurallar){const n=sh.next;return`<section class="kart">
        <div class="kart-resim mekan" style="background-image:url('img/mekan_belediye_k.webp')"></div>
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Belediye")} \xB7 ${esc(bolgeAdi(sh.region_id))}</p><h2 class="b2">${\u00E7("\u015Eehrin geli\u015Fimi")}</h2></div>
          <span class="cip altin">${\u00E7("{n}. seviye",{n:Number(sh.level)})} \xB7 ${esc(\u00E7v(sh.level_name))}</span></div>
        <p class="aciklama">${\u00E7("\u015Eehir; burada oturup son {n} g\xFCnde \xE7al\u0131\u015Fan sakinler ve \u015Fehirdeki i\u015Fletmelerle b\xFCy\xFCr. Seviye d\xFC\u015Fmez; her seviyede yeni evler a\xE7\u0131l\u0131r.",
{n:Number(kurallar.data.city.activeWindowDays)})}</p>
        ${n?`<div class="yigin" style="margin-top:12px">
            <p class="kucuk">${\u00E7("Sonraki seviye:")} <b>${esc(\u00E7v(n.name))}</b> ${\u00E7("(iki \u015Fart birlikte)")}</p>
            ${gelisimCubugu(\u00E7("Etkin sakin"),sh.active_residents,n.activeResidents)}
            ${gelisimCubugu(\u00E7("\u0130\u015Fletme"),sh.companies,n.companies,"deniz")}
          </div>`:`<p class="bos">${\u00E7("\u015Eehir en y\xFCksek seviyede.")}</p>`}
        <p class="kucuk" style="margin-top:12px">${\u00E7("Say\u0131lar {n} dakikada bir g\xFCncellenir",{n:10})}${sh.computed_at?" "+\u00E7("(son: {zaman})",{zaman:esc(saatYaz(sh.computed_at))}):""}.\
</p>
      </section>`}function evlerKarti(ev,sh){const satilik=sh.houses.filter(x=>x.for_sale&&!x.mine),sahipli=sh.houses.filter(x=>x.owned).length,evimVar=!!ev.house;return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Konut")} \xB7 ${esc(bolgeAdi(sh.region_id))}</p><h2 class="b2">${\u00E7("Sat\u0131l\u0131k evler")}</h2></div><span class="cip">${\u00E7(
"{n} ev",{n:sh.houses.length})} \xB7 ${\u00E7("{n} sahipli",{n:sahipli})}</span></div>
        <p class="aciklama">${\u00E7("\u015Eehirden al\u0131nan evin bedeli sisteme gider (yak\u0131l\u0131r). Oyuncunun satt\u0131\u011F\u0131 evde bedel sat\u0131c\u0131ya ge\xE7er.")}${evimVar?" "+
\u00E7("Karakter ba\u015F\u0131na bir ev: yenisini almak i\xE7in \xF6nce evini sat."):""}</p>
        ${satilik.length?`<div class="liste">${satilik.map(x=>`<div class="liste-satir">
            <span class="liste-ikon ${x.zone==="merkez"?"mercan":x.zone==="kenar"?"yesil":""}">${ikon("house")}</span>
            <div><span class="tur">${esc(MAHALLE_TUR[x.zone]??x.zone)} \xB7 ${x.seller==="city"?\u00E7("\u015Eehirden"):\u00E7("Oyuncudan")}</span><b>${esc(evAdres(x))}</b>
              <div class="alt">${esc(evOzellik(x))}${x.seller==="player"&&x.owner_name?" \xB7 "+\u00E7("satan: {ad}",{ad:esc(x.owner_name)}):""}</div>
              <div class="odul"><span>${ikon("coins")}${\u00E7("{kr} kr",{kr:kr(x.price)})}</span></div></div>
            <button class="dugme kucuk-d" data-ev-al="${esc(x.house_id)}" ${evimVar?"disabled":""}>${ikon("key-round")}${\u00E7("Sat\u0131n al")}</button>
          </div>`).join("")}</div>`:`<p class="bos">${\u00E7("Bu \u015Fehirde \u015Fu an sat\u0131l\u0131k ev yok. \u015Eehir b\xFCy\xFCd\xFCk\xE7e yeni evler a\xE7\u0131l\u0131r.")}</p>`}
      </section>`}function ciz(){const{ev,burasi,kurallar}=v,h=ev.house,bant=h?mekanBant("oda_ev_salon",\u00E7("Evin \xB7 i\xE7eriden"),evAdres(h),\u00E7("{ozellik} ev \xB7 {sehir}",{ozellik:evOzellik(
h),sehir:bolgeAdi(h.region_id)})):mekanBant("oda_pansiyon",\u00E7("Ba\u015Flang\u0131\xE7 odas\u0131 \xB7 i\xE7eriden"),\u00E7("Pansiyon odan"),\u00E7("{sehir} \xB7 \xFCcretsiz ve s\xFCresiz. Kira, bor\xE7 ya da \
ceza yok; uzun s\xFCre girmesen de odan kaybolmaz.",{sehir:bolgeAdi(ev.residence_region_id)}));kap.innerHTML=`<div class="sayfa">
        ${bant}
        <div class="oneri-dugmeler" style="margin-bottom:12px">${kareSahneDugmeHtml("home",Durum.v.ozet?.character?.id)}</div>
        <div id="oda-yer"></div>
        <div id="parti-tutucu"></div>
        <div id="evim-konfor-yer" style="margin-top:20px">${evKonforKarti(v.oda,Durum.v.askerlik?.mood)}</div>
        <div class="izgara iki" style="margin-top:20px">${evimKarti(ev,kurallar)}${ikametKarti(ev,kurallar)}</div>
        ${v.kariyer?.home_studio?`<div style="margin-top:20px">${yayinKosesiKartHtml(v.kariyer.home_studio)}</div>`:""}
        <div class="izgara iki" style="margin-top:20px">${evlerKarti(ev,burasi)}${gelisimKarti(burasi,kurallar)}</div>
      </div>`,$("#parti-tutucu",kap)?.replaceWith(partiEl),bagla(),odaKapat?.(),odaKapat=OdaPaneli.ac($("#oda-yer",kap),v.oda,{sehir:Number(v.harita?.cities?.[v.oda.region_id]??1),yenile:()=>tazele(),
ziyaret:zy,kaydedildi:yeni=>{v.oda=yeni,konforYaz(),Durum.askerlik().then(konforYaz).catch(()=>{})}})}function konforYaz(){const y=$("#evim-konfor-yer",kap);y&&v?.oda&&(y.innerHTML=evKonforKarti(v.oda,
Durum.v.askerlik?.mood))}function bagla(){const{ev,burasi,kurallar}=v,h=ev.house;yayinKosesiBagla(kap,()=>tazele()),$("#ev-sat",kap)?.addEventListener("click",()=>satisaCikar(h,kurallar)),$("#ev-cek",
kap)?.addEventListener("click",()=>islem("house_unlist",{p_house:h.house_id},\u00E7("Evin sat\u0131\u015Ftan \xE7ekildi."),"house")),$("#ev-gorunur",kap)?.addEventListener("click",async()=>{try{await Sunucu.
cagir("house_visibility",{p_visible:!h.visible}),tost(h.visible?\u00E7("Ad\u0131n evinde g\xF6r\xFCnmeyecek."):\u00E7("Ad\u0131n evinde g\xF6r\xFCnecek."),h.visible?"lock":"eye")}catch(e){tost(hataMetni(
e),"circle-alert")}await tazele()}),$("#tasin",kap)?.addEventListener("click",()=>islem("residence_move",{},\u00E7("\u0130kametin art\u0131k {sehir}.",{sehir:bolgeAdi(ev.location_region_id)}),"map-pin\
-house"));for(const b of $$("[data-ev-al]",kap))b.onclick=()=>satinAlSor(burasi.houses.find(x=>x.house_id===b.dataset.evAl),ev,kurallar)}function satisaCikar(h,kurallar){const enCok=kurallar.data.city.
housing.maxListingPriceCr,ucretPpm=kurallar.data.market.serviceFeePpm;pencereForm({ust:h.for_sale?\u00E7("Fiyat\u0131 de\u011Fi\u015Ftir"):\u00E7("Evi sat\u0131\u015Fa \xE7\u0131kar"),baslik:evAdres(h),
onayAd:h.for_sale?\u00E7("Fiyat\u0131 kaydet"):\u00E7("Sat\u0131\u015Fa \xE7\u0131kar"),onayIkon:"hand-coins",govde:`<p class="aciklama">${\u00E7("Fiyat\u0131 sen belirlersin (en \xE7ok {kr} kredi). Sat\u0131\u015F ver\
gisi b\xF6lgenin \xFClkesinin bug\xFCnk\xFC oran\u0131yla, ilan an\u0131nda kilitlenir; hizmet bedeli {oran}. \u0130kisi sat\u0131l\u0131nca senin pay\u0131ndan d\xFC\u015F\xFCl\xFCr.",{kr:kr(enCok),oran:ppmYuzde(
ucretPpm)})}</p>
          <label class="alan"><span>${\u00E7("Fiyat (kredi)")}</span><input name="fiyat" inputmode="decimal" autocomplete="off" required value="${h.for_sale?kr(h.price):""}"></label>`,is:async d=>{const fiyat=krediAlt(
d.get("fiyat"));if(!Number.isFinite(fiyat)||fiyat<100)throw new Error(\u00E7("Ge\xE7erli bir fiyat yaz (en az 1 kredi)."));if(fiyat>enCok)throw new Error(\u00E7("Fiyat en \xE7ok {kr} kredi olabilir.",
{kr:kr(enCok)}));await Sunucu.yap("house_list",{p_house:h.house_id,p_price:fiyat}),tost(\u00E7("Evin {kr} krediden sat\u0131\u015Fta.",{kr:kr(fiyat)}),"hand-coins"),await tazele()}})}function satinAlSor(x,ev,kurallar){
evSatinAlSor(x,ev,kurallar,{once:()=>{for(const b of $$("button",kap))b.disabled=!0},sonra:()=>tazele()})}async function islem(fn,args,mesaj,ik){for(const b of $$("button",kap))b.disabled=!0;try{await Sunucu.
yap(fn,args),tost(mesaj,ik)}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}const tazele=tazeleyici(async()=>{await yukle(),ciz(),zy&&!zy.s&&zy.gir()});await yukle(),zy=EvZiyareti.ac(null),ciz(),
zy.gir();const b1=Durum.dinle("olay",({olay})=>{/^(house\.|travel\.)/.test(olay)&&tazele()});return()=>{b1(),odaKapat?.(),partiKapat(),zy.kapat()}}}),Kabuk.kaydet("sehir/yol",{async ac(kap){let durdur=()=>{},
v=null,varisDeneme=0;const yolculuk=YolculukSahnesi.ac();yolculuk.dinle("arac",()=>$("#yol-kart",kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"}));const istasyon=IstasyonKarti.
ac(),sira=sahneSirasiKur();let istZaman=null;async function yukle(){const[ys,harita,kurallar,,,ist]=await Promise.all([Sunucu.cagir("travel_status"),Durum.harita(),Durum.kurallar(),Durum.ozet(),Durum.
askerlik().catch(()=>null),Sunucu.cagir("station_board").catch(()=>null)]);v={ys,harita,kurallar,ist}}function yolKarti(tr){return`<section class="kart" id="yol-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Yoldas\u0131n")}</p><h2 class="b2">${esc(bolgeAdi(tr.to))}</h2></div><span class="ik-kutu">${ikon("route")}</span></div>
        <div class="rota">${tr.route.map(r=>`<span class="cip">${esc(bolgeAdi(r))}</span>`).join(ikon("arrow-right"))}</div>
        ${tr.vehicle?`<p class="kucuk arac-yol" data-yol-arac="${esc(String(tr.vehicle.ppm))}">${[tr.vehicle.land,tr.vehicle.sea].filter(Boolean).map(x=>`${ikon(ARAC_IK[x.kind]??"car")} ${\u00E7("{ara\
c} ile ({n} kenar)",{arac:esc(aracRenkliAd(x.kind,x.color)),n:Number(x.edges)})}${x.plate?` <span class="plaka kucuk-plaka" data-yol-kart-plaka="${esc(x.plate)}">${esc(x.plate)}</span>`:""}${x.name?` \
<b>${esc(x.name)}</b>`:""}${x.owner?` \xB7 ${esc(\u00E7("kiral\u0131k (sahibi {ad})",{ad:x.owner}))}`:""}`).join(" \xB7 ")}${tr.vehicle.minutes_before?` \xB7 ${\u00E7("{a} yerine {b} dakika",{a:sayi(tr.
vehicle.minutes_before),b:sayi(tr.minutes)})}`:""}</p>`:""}
        <div class="cubuk deniz"><i data-ilerleme="${tr.departs_at}|${tr.arrives_at}"></i></div>
        <p class="kucuk" style="margin-top:8px">${\u00E7("Var\u0131\u015F: <b>{zaman}</b>",{zaman:esc(saatYaz(tr.arrives_at))})} \xB7 ${\u00E7("kalan")} <b data-bitis="${tr.arrives_at}"></b></p>
        <p class="aciklama">${\u00E7("Yolculuk sunucuda s\xFCrer; uygulamay\u0131 kapatsan da var\u0131rs\u0131n. Yoldayken \xE7al\u0131\u015Famaz, cephede vuramazs\u0131n.")}</p>
        <button class="dugme ikincil kucuk-d" id="yol-iptal">${ikon("x")}${\u00E7("Yolculu\u011Fu iptal et")}</button>
        <p class="kucuk" style="margin-top:8px">${\u00E7("\u0130ptal edersen \xE7\u0131kt\u0131\u011F\u0131n b\xF6lgede kal\u0131rs\u0131n; bilet bedeli geri verilmez.")}</p>
      </section>`}function sonKarti(ys){const son=(ys.recent??[]).filter(t=>t.status!=="en_route"),DURUM={arrived:\u00E7("Vard\u0131n"),cancelled:\u00E7("\u0130ptal edildi")};return`<section class="ka\
rt">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Defter")}</p><h2 class="b2">${\u00E7("Son yolculuklar")}</h2></div><span class="ik-kutu">${ikon("footprints")}</span></div>
        ${son.length?`<div class="liste">${son.map(t=>`<div class="liste-satir">
            <span class="liste-ikon ${t.status==="arrived"?"yesil":""}">${ikon(t.status==="arrived"?"map-pin":"x")}</span>
            <div><span class="tur">${esc(DURUM[t.status]??t.status)} \xB7 ${esc(saatYaz(t.departs_at))}</span><b>${esc(bolgeAdi(t.from))} \u2192 ${esc(bolgeAdi(t.to))}</b>
              <div class="alt">${\u00E7("{n} dk",{n:Number(t.minutes)})} \xB7 ${\u00E7("{kr} kredi",{kr:kr(t.fee_cr)})}${t.vehicle?` \xB7 ${[t.vehicle.land,t.vehicle.sea].filter(Boolean).map(x=>`<span\
 class="arac-nokta" data-son-arac="${esc(x.kind)}" style="--renk:${aracRengi(x.color)}">${ikon(ARAC_IK[x.kind]??"car")}${esc(aracAdi(x.kind))}</span>`).join(" ")}`:""}</div></div><span></span></div>`).
join("")}</div>`:`<p class="bos">${\u00E7("Hen\xFCz yolculuk yapmad\u0131n.")}</p>`}
      </section>`}function hedefler(){const{ys,harita,kurallar}=v,t=kurallar.data.economy.travel,ch=Durum.v.ozet?.character??{},cepheler=new Set((Durum.v.askerlik?.campaigns??[]).filter(c=>c.status===
"active"||c.status==="preparing").map(c=>c.target_region_id)),yolda=!!ys.travel;return[...harita.open_countries].sort((a,b)=>a===ch.citizenship?-1:b===ch.citizenship?1:ulkeAdi(a).localeCompare(ulkeAdi(
b),DIL.yerel)).map(u=>{const bolgeler=Object.entries(DUNYA.bolgeler).filter(([,b])=>b.ulke===u).sort(([ia,a],[ib,b])=>(a.baskent?-1:b.baskent?1:a.ad.localeCompare(b.ad,DIL.yerel))||ia.localeCompare(ib));
return`<div class="yol-ulke"><p class="ust-yazi"><span class="ulke-nokta" style="background:${ulkeRenk(u)}"></span> ${esc(ulkeAdi(u))}</p>
          <div class="liste">${bolgeler.map(([id,b])=>{const burada=id===ys.region_id,kenar=burada?0:kenarSayisi(ys.region_id,id),tah=kenar?yolTahmini(t,kenar):null,sahip=harita.sahip[id],rozet=[id===
ch.residence?`<span>${ikon("map-pin-house")}${\u00E7("\u0130kametin")}</span>`:"",cepheler.has(id)?`<span class="rozet-cephe">${ikon("swords")}${\u00E7("Cephe")}</span>`:"",sahip&&sahip!==b.ulke?`<spa\
n>${ikon("flame")}${\u00E7("{ulke} elinde",{ulke:esc(ulkeAdi(sahip))})}</span>`:"",...Object.entries(bolgeAvantaji(id)).map(([k,y])=>`<span>${ikon("sprout")}${esc(AVANTAJ_AD[k]??k)} ${\u00E7("+%{n}",{
n:Number(y)})}</span>`)].filter(Boolean).join("");return`<div class="liste-satir" data-bolge="${esc(id)}">
              <span class="liste-ikon ${burada?"yesil":b.baskent?"lacivert":""}">${ikon(b.baskent?"landmark":"map-pin")}</span>
              <div><span class="tur">${b.baskent?\u00E7("Ba\u015Fkent"):\u00E7("B\xF6lge")}</span><b>${esc(b.ad)}</b>
                <div class="alt">${burada?\u00E7("Buradas\u0131n"):tah?`${\u00E7("{n} kenar",{n:kenar})} \xB7 ${\u00E7("{n} dk",{n:tah.dk})} \xB7 ${\u00E7("{kr} kredi",{kr:kr(tah.ucret)})}`:\u00E7("Yo\
l yok")}</div>
                ${rozet?`<div class="odul">${rozet}</div>`:""}</div>
              ${burada?`<span class="cip yesil">${ikon("map-pin")}${\u00E7("Buradas\u0131n")}</span>`:`<button class="dugme ikincil kucuk-d" data-git-bolge="${esc(id)}" ${yolda||!tah?"disabled":""}>${ikon(
"route")}${\u00E7("Git")}</button>`}
            </div>`}).join("")}</div></div>`}).join("")}function ciz(){durdur();const{ys}=v,sahip=v.harita.sahip[ys.region_id],ch=Durum.v.ozet?.character??{};kap.innerHTML=`<div class="sayfa sayfa-dar\
">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${\u00E7("Seyahat")}</h1>
          <p class="aciklama">${\u00E7("Bir b\xF6lgeden kom\u015Fusuna {n} dakika. Bilet bedeli sisteme gider. Yol uzad\u0131k\xE7a s\xFCre ve bilet artar (en \xE7ok {dk} dakika, {kr} kredi).",{n:Number(
v.kurallar.data.economy.travel.minutesPerEdge),dk:Number(v.kurallar.data.economy.travel.maxMinutes),kr:kr(v.kurallar.data.economy.travel.feeMaxCr)})}</p></div></div>
        <div id="yolculuk-yer"></div>
        ${v.ist?'<div id="istasyon-yer"></div>':""}
        <div class="izgara iki" style="margin-top:20px">
          <section class="kart">
            <div class="kart-bas"><div><p class="ust-yazi">${ys.travel?\u00E7("\xC7\u0131kt\u0131\u011F\u0131n yer"):\u00E7("Buradas\u0131n")}</p><h2 class="b2">${esc(bolgeAdi(ys.region_id))}</h2></di\
v><span class="ik-kutu">${ikon("map-pin")}</span></div>
            <div class="bilgi-izgara">
              <div><small>${\u00E7("\xDClke")}</small><b>${esc(ulkeAdi(sahip??DUNYA.bolgeler[ys.region_id]?.ulke))}</b></div>
              <div><small>${\u00E7("\u0130kametin")}</small><b>${esc(bolgeAdi(ch.residence))}</b></div>
            </div>
            <div class="oneri-dugmeler"><button class="dugme sade kucuk-d" data-git="sehir/ev">${ikon("house")}${\u00E7("Evim ve \u015Fehir")}</button>
              <button class="dugme sade kucuk-d" data-git="hayat/araclar">${ikon("car")}${\u00E7("Ara\xE7lar\u0131m")}</button></div>
          </section>
          ${ys.travel?yolKarti(ys.travel):sonKarti(ys)}
        </div>
        <section class="kart" style="margin-top:20px">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Nereye?")}</p><h2 class="b2">${\u00E7("B\xF6lgeler")}</h2></div><span class="ik-kutu">${ikon("compass")}</span></div>
          ${ys.travel?`<p class="kucuk">${\u00E7("Yoldayken yeni yolculuk ba\u015Flamaz; \xF6nce var ya da iptal et.")}</p>`:`<p class="kucuk">${\u00E7("S\xFCre ve bilet tahminidir; yola \xE7\u0131kmadan \xF6nce ke\
sin h\xE2li g\xF6sterilir.")}</p>`}
          <div class="yigin" style="gap:18px;margin-top:10px">${hedefler()}</div>
        </section>
      </div>`,$("#yolculuk-yer",kap)?.replaceWith(yolculuk.el),sira.ekle(yolculuk),yolculuk.yaz({ys:v.ys,harita:v.harita});const istYer=$("#istasyon-yer",kap);istYer?(istYer.replaceWith(istasyon.el),sira.
ekle(istasyon),istasyon.yaz(v.ist)):sira.cikar(istasyon),bagla(),durdur=geriSay(kap,()=>varis())}function bagla(){for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$(
"[data-git-bolge]",kap))b.onclick=()=>seyahatSor(b.dataset.gitBolge,async()=>{varisDeneme=0,await tazele()});$("#yol-iptal",kap)?.addEventListener("click",()=>pencere({ust:\u00E7("Yolculuk"),baslik:\u00E7(
"Yolculu\u011Fu iptal et"),govde:`<p class="aciklama">${\u00E7("\xC7\u0131kt\u0131\u011F\u0131n b\xF6lgede kal\u0131rs\u0131n; bilet bedeli geri verilmez.")}</p>`,dugmeler:[{ad:\u00E7("Yola devam")},{
ad:\u00E7("\u0130ptal et"),sinif:"mercan",ikon:"x",is:iptal}]}))}async function iptal(){try{const r=await Sunucu.yap("travel_cancel");tost(r.status==="arrived"?\u00E7("Yolculuk zaten bitmi\u015Fti; vard\u0131n."):
\u00E7("Yolculuk iptal edildi; \xE7\u0131kt\u0131\u011F\u0131n b\xF6lgede kald\u0131n."),"map-pin")}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}async function varis(){if(!(!v.ys.travel||
varisDeneme>=6||!kap.isConnected)){varisDeneme++;try{await Sunucu.cagir("travel_arrive")}catch(e){e.kod!=="TRAVEL_NOT_DUE"&&e.kod!=="NOT_TRAVELING"&&tost(hataMetni(e),"circle-alert")}await tazele()}}const tazele=tazeleyici(
async()=>{await yukle(),ciz()});await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^travel\./.test(olay)&&(varisDeneme=0,tazele())});return istZaman=setInterval(()=>{document.hidden||!kap.isConnected||
!v?.ist||Sunucu.cagir("station_board").then(b=>{b&&kap.isConnected&&(v.ist=b,istasyon.yaz(b))}).catch(()=>{})},3e4),()=>{durdur(),b1(),clearInterval(istZaman),sira.kapat(),yolculuk.kapat(),istasyon.kapat()}}}),
Parcalar.tamam("ek_31_sehir");
