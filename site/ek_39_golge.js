// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_39_golge.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/golge",{async ac(kap){let v=null,k=null,p=null,vg=null,sc=null,sekme="kacak";try{const s=sessionStorage.getItem("civora.golge");["kara","kolluk","vurgun","sicil"].includes(s)&&(sekme=
s)}catch{}let durdur=()=>{},varisDeneme=0,sinirMod=Gorunum.uc()?"3b":"2b",sinirHata=!1,kapandi=!1,sinirSaat=0,karakolMod=Gorunum.uc()?"3b":"2b",karakolHata=!1,karakolSaat=0,masaMod=Gorunum.uc()?"3b":"\
2b",masaHata=!1,vgBekleT=0,mahkemeMod=Gorunum.uc()?"3b":"2b",mahkemeHata=!1,scBekleT=0;const scSayac={n:0},davadaGorulen=new Set,vgSayac={n:0},yoldaGorulen=new Set,planlandaGorulen=new Set,oynanan=new Set;
let nabiz=null,sokakSaat=0;const sokak=SokakSahnesi.ac();sokak.dinle("sec",id=>{const el=$(`[data-kb-ilan="${CSS.escape(id)}"]`,kap);el&&(el.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"\
center"}),el.classList.add("vurgu-yan"),setTimeout(()=>el.classList.remove("vurgu-yan"),1600))});async function yukle(){const kapali=e=>{if(e.kod==="RULE_NOT_ACTIVE")return null;throw e},[s,b,kl,hv,sr,
nb]=await Promise.all([Sunucu.cagir("shadow_status"),Sunucu.cagir("black_market").catch(kapali),Sunucu.cagir("police_status").catch(kapali),Sunucu.cagir("heist_status").catch(kapali),Sunucu.cagir("rec\
ord_status").catch(kapali),Sunucu.cagir("city_pulse").catch(()=>null),Durum.ozet()]);v=s,k=b,p=kl,vg=hv,sc=sr,nb&&(nabiz=nb),(sekme==="kara"&&!k||sekme==="kolluk"&&!p||sekme==="vurgun"&&!vg||sekme==="\
sicil"&&!sc)&&(sekme="kacak")}const uygunDegil=()=>Date.parse(v.eligible_at)>Date.now(),deneyimsiz=()=>Number(v.work_units??0)<Number(v.rule.min_work_units??0);function durumKarti(){const r=v.rule;return`\
<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Durumun")}</p><h2 class="b2">${esc(bolgeAdi(v.location))}</h2></div><span class="ik-kutu">${ikon("moon-star")}</span></div>
        ${uygunDegil()?`<div class="yasa-bant uyari">${ikon("clock")}<span>${\u00E7("Ka\xE7ak\xE7\u0131l\u0131k i\xE7in hesab\u0131n en az {n} saatlik olmal\u0131. A\xE7\u0131l\u0131\u015F: <b>{zaman}</b>.",
{n:Number(r.min_account_age_h),zaman:esc(saatYaz(v.eligible_at))})}</span></div>`:""}
        ${deneyimsiz()?`<div class="yasa-bant uyari">${ikon("hammer")}<span>${\u00E7("Ka\xE7ak\xE7\u0131l\u0131k i\xE7in \xF6nce d\xFCr\xFCst i\u015Fte deneyim kazanmal\u0131s\u0131n: <b>{n}/{gerek}</b> i\u015F birimi tamamlad\u0131n (\u015Eehrim \u2192 \xC7al\u0131\u015F).",
{n:sayi(v.work_units),gerek:sayi(r.min_work_units)})}</span></div>`:""}
        <div class="bilgi-izgara">
          <div><small>${\u00E7("Lojistik becerin")}</small><b>${sayi(v.logistics_skill)}</b></div>
          <div><small>${\u00E7("Bug\xFCn ta\u015F\u0131d\u0131\u011F\u0131n")}</small><b>${\u00E7("{a} / {b} kr",{a:kr(v.today_used_cr),b:kr(r.daily_per_character_cr)})}</b></div>
          <div><small>${\u00E7("Bir sevkiyatta en \xE7ok")}</small><b>${\u00E7("{kr} kredi",{kr:kr(r.max_run_cr)})}</b></div>
          <div><small>${\u00E7("Sicilin")}</small><b>${Number(v.records)?\u00E7("{n} kay\u0131t",{n:Number(v.records)}):\u00E7("temiz")}</b></div>
        </div>
        <p class="kucuk">${\u00E7("Lojistik becerin y\xFCkseldik\xE7e yakalanma ihtimalin azal\u0131r.")}</p>
      </section>`}function gozaltiKarti(d){return`<section class="kart" id="gozalti-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("G\xF6zalt\u0131ndas\u0131n")}</p><h2 class="b2">${esc(ulkeAdi(d.country_id))}</h2></div><span class="ik-kutu">${ikon("lock")}</span></d\
iv>
        <div class="cubuk mercan"><i data-ilerleme="${esc(d.starts_at)}|${esc(d.ends_at)}"></i></div>
        <p class="kucuk" style="margin-top:8px">${\u00E7("Biti\u015F: <b>{zaman}</b>",{zaman:esc(saatYaz(d.ends_at))})} \xB7 ${\u00E7("kalan")} <b data-bitis="${esc(d.ends_at)}"></b></p>
        <p class="aciklama">${\u00E7("G\xF6zalt\u0131ndayken \xE7al\u0131\u015Famaz, sava\u015Famaz ve yolculuk yapamazs\u0131n. Kefalet \xF6dersen hemen \xE7\u0131kars\u0131n: kalan her ba\u015Flam\u0131\u015F saat i\xE7in {kr} kredi; para {ulke} hazinesine gider.",
{kr:kr(v.rule.bail_per_hour_cr),ulke:esc(ulkeAdi(d.country_id))})}</p>
        ${d.bail_now_cr!=null?`<button class="dugme altin" id="kefalet">${ikon("key-round")}${\u00E7("Kefaletle \xE7\u0131k \xB7 {kr} kredi",{kr:kr(d.bail_now_cr)})}</button>`:""}
      </section>`}function sevkiyatKarti(s){return`<section class="kart" id="sevkiyat-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ka\xE7ak y\xFCk yolda")}</p><h2 class="b2">${esc(bolgeAdi(s.to))}</h2></div><span class="ik-kutu">${ikon("truck")}</span></div>
        <div class="satir" style="gap:10px;align-items:center"><img src="${varlikResim(s.asset)}" alt="" width="44" height="44">
          <b>${\u00E7("{n} {urun}",{n:sayi(s.qty),urun:esc(varlikAdi(s.asset))})}</b></div>
        <div class="cubuk deniz" style="margin-top:10px"><i data-ilerleme="${esc(s.started_at)}|${esc(s.arrives_at)}"></i></div>
        <p class="kucuk" style="margin-top:8px">${\u00E7("Var\u0131\u015F: <b>{zaman}</b>",{zaman:esc(saatYaz(s.arrives_at))})} \xB7 ${\u00E7("kalan")} <b data-bitis="${esc(s.arrives_at)}"></b></p>
        <div class="bilgi-izgara">
          <div><small>${\u00E7("Kara al\u0131c\u0131n\u0131n \xF6deyece\u011Fi")}</small><b>${\u00E7("{kr} kredi",{kr:kr(s.payout_cr)})}</b></div>
          <div><small>${\u00E7("Yakalanma ihtimali")}</small><b>${esc(ppmYuzde(s.catch_ppm))}</b></div>
          <div><small>${\u00E7("G\xFCmr\xFCk")}</small><b>${esc(ulkeAdi(s.customs_country_id))}</b></div>
          <div><small>${\u00E7("Yakalan\u0131rsan")}</small><b>${\u00E7("{kr} kredi ceza, {n} saat g\xF6zalt\u0131",{kr:kr(s.fine_cr),n:Number(s.detention_h)})}</b></div>
        </div>
        <p class="aciklama">${\u00E7("Sonu\xE7 var\u0131\u015Fta belli olur. Y\xFCk ve olas\u0131 ceza yola \xE7\u0131karken ayr\u0131ld\u0131; sat\u0131l\u0131rsa ceza pay\u0131 sana d\xF6ner.")}</p>\

        <button class="dugme ikincil kucuk-d" id="geri-don">${ikon("undo-2")}${\u00E7("Geri d\xF6n")}</button>
        <p class="kucuk" style="margin-top:8px">${\u00E7("Geri d\xF6nersen y\xFCk ve ceza pay\u0131 sende kal\u0131r; bilet geri gelmez.")}</p>
      </section>`}function sinirSevkiyat(){if(v.run)return v.run;const s=v.recent[0];return s&&Date.parse(s.resolved_at??s.started_at)>Date.now()-SINIR_SONUC_MS?s:null}function sinirKarti(s){const durum=SINIR_DURUM[s.
status]??"yolda",yazi=durum==="yolda"?\u00E7("Y\xFCk {ulke} g\xFCmr\xFC\u011F\xFCne gidiyor; var\u0131\u015F {zaman}.",{ulke:esc(ulkeAdi(s.customs_country_id)),zaman:esc(saatYaz(s.arrives_at))}):durum===
"satildi"?\u00E7("Bariyer kalkt\u0131: y\xFCk ge\xE7ti ve kara al\u0131c\u0131ya sat\u0131ld\u0131."):durum==="yakalandi"?\u00E7("G\xFCmr\xFCkte yakaland\u0131n: y\xFCk ve ceza {ulke} hazinesine ge\xE7ti.",
{ulke:esc(ulkeAdi(s.customs_country_id))}):\u00E7("Geri d\xF6nd\xFCn; y\xFCk sende kald\u0131.");return`<section class="kart sinir-kart" id="sinir-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("S\u0131n\u0131r kap\u0131s\u0131")}</p><h2 class="b2">${esc(bolgeAdi(s.from))} \u2192 ${esc(bolgeAdi(s.to))}</h2></div>
          ${Gorunum.webglVar()?`<button class="dugme sade kucuk-d" id="sinir-mod" aria-pressed="${sinirMod==="2b"}" title="${sinirMod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCme (2B) ge\xE7"):\u00E7("3B g\xF6\
r\xFCn\xFCme ge\xE7")}">${ikon("layers")}${sinirMod==="3b"?\u00E7("2B"):\u00E7("3B")}</button>`:""}</div>
        <div class="sinir-sahne sahne3b" id="sinir-sahne" data-mod="${sinirMod}" data-durum="${durum}">
          ${sinirMod==="3b"?`<div class="yukleniyor${sinir3bOrnek?" bitti":""}" id="sinir-yukleniyor"><div class="yukleniyor-ic"><img src="img/amblem.png" alt=""><span>${\u00E7("S\u0131n\u0131r kap\u0131s\u0131 a\xE7\u0131l\u0131yor\u2026")}\
</span></div></div>`:""}
          <div class="sinir-2b" id="sinir-2b"${sinirMod==="3b"?" hidden":""}>${sinirMod==="2b"?sinir2b(s,durum):""}</div>
        </div>
        <p class="kucuk" style="margin-top:8px" aria-live="polite">${yazi}</p>
      </section>`}const sinirDurumu=s=>({anahtar:`${s.run_id}:${s.status}`,durum:SINIR_DURUM[s.status]??"yolda",bas:Date.parse(s.started_at),varis:Date.parse(s.arrives_at),cikisRenk:ulkeRenk(DUNYA.bolgeler?.[s.
from]?.ulke),varisRenk:ulkeRenk(s.customs_country_id),sikilik:s.law?.strictness??"normal",oynat:s.status!=="en_route"&&yoldaGorulen.has(s.run_id)});function sinirBirak(){sinir3bOrnek&&Uc.cizici?.etkin===
sinir3bOrnek&&Uc.cizici.birak(sinir3bOrnek)}async function sinirBagla(){clearInterval(sinirSaat);const kutu=$("#sinir-sahne",kap),s=sinirSevkiyat();if(!kutu||!s){sinirBirak();return}if(s.status==="en_\
route"&&yoldaGorulen.add(s.run_id),sinirMod!=="3b"){sinirBirak(),s.status==="en_route"&&(sinirSaat=setInterval(()=>{const k2=$("[data-sinir-kamyon]",kap);k2&&k2.setAttribute("transform",`translate(${(14+
104*sinirOran(s)).toFixed(1)} 71)`)},2e3));return}try{const{THREE,cizici}=await Uc.yukle("39_golge.js");if(kapandi||sinirMod!=="3b"||$("#sinir-sahne",kap)!==kutu)return;if(sinir3bOrnek??=sinir3bKur(THREE,
cizici),sinir3bOrnek.kapBagla(kutu),sinir3bOrnek.durumYaz(sinirDurumu(s)),!cizici.bagla(sinir3bOrnek,kutu))throw new Error("webgl-bagla");$("#sinir-yukleniyor",kutu)?.classList.add("bitti")}catch(e){if(console.
warn("3B s\u0131n\u0131r kap\u0131s\u0131 a\xE7\u0131lamad\u0131:",e),kapandi)return;sinirHata=!0,sinirMod="2b",tost(\u00E7("3B s\u0131n\u0131r kap\u0131s\u0131 bu cihazda a\xE7\u0131lamad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),
"layers"),ciz()}}function bolgelerKarti(){const engel=v.detention?\u00E7("G\xF6zalt\u0131ndayken yola \xE7\u0131kamazs\u0131n."):v.run?\u00E7("\xD6nce s\xFCren sevkiyat\u0131n bitsin."):uygunDegil()?\u00E7(
"Hesab\u0131n hen\xFCz yeni."):deneyimsiz()?\u00E7("\xD6nce d\xFCr\xFCst i\u015Fte deneyim kazanmal\u0131s\u0131n."):"";return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kara al\u0131c\u0131 nerede?")}</p><h2 class="b2">${\u00E7("Sava\u015F b\xF6lgeleri")}</h2></div><span class="ik-kutu">${ikon("map-pin")}\
</span></div>
        <p class="kucuk">${\u00E7("Kara al\u0131c\u0131 yaln\u0131z s\xFCren ya da haz\u0131rlanan bir sava\u015F\u0131n hedef b\xF6lgesinde ve ona kom\u015Fu b\xF6lgelerde bulunur. Y\xFCk s\u0131n\u0131rdan ge\xE7meli: var\u0131\u015F b\xF6lgesi bulundu\u011Fun b\xF6lgeden ba\u015Fka \
bir \xFClkenin olmal\u0131.")}</p>
        ${v.zones.length?`<div class="liste" style="margin-top:10px">${v.zones.map(z=>`<div class="liste-satir">
            <span class="liste-ikon ${z.region_id===z.target_region_id?"mercan":""}">${ikon(z.region_id===z.target_region_id?"swords":"map-pin")}</span>
            <div><span class="tur">${esc(ulkeAdi(z.owner_country_id))} \xB7 ${z.region_id===z.target_region_id?\u00E7("cephe"):\u00E7("cepheye kom\u015Fu")}</span><b>${esc(bolgeAdi(z.region_id))}</b>
              <div class="alt">${esc(gumrukOzet(z.law,!1))}</div>
              <div class="odul"><span>${ikon("coins")}${\u00E7("Kara al\u0131c\u0131n\u0131n bug\xFCn kalan paras\u0131: {kr} kr",{kr:kr(z.demand_left_cr)})}</span>
                ${v.rule.demand_per_hit_cr!=null?`<span>${ikon("swords")}${\u00E7("bug\xFCn {n} vuru\u015F",{n:sayi(z.hits_today??0)})}</span>`:""}
                ${z.budget_paid_cr?`<span>${ikon("shield")}${\u00E7("G\xFCmr\xFCk b\xFCt\xE7esi bug\xFCn {kr} kr",{kr:kr(z.budget_paid_cr)})}</span>`:""}</div></div>
            <button class="dugme ikincil kucuk-d" data-gotur="${esc(z.region_id)}" ${engel||z.region_id===v.location?"disabled":""}>${ikon("package")}${\u00E7("Mal g\xF6t\xFCr")}</button>
          </div>`).join("")}</div>${engel?`<p class="kucuk" style="margin-top:8px">${esc(engel)}</p>`:""}`:`<p class="bos">${\u00E7("\u015Eu an hi\xE7bir yerde sava\u015F yok; kara al\u0131c\u0131 yaln\u0131z sava\u015F b\xF6lgelerinde \
bulunur.")}</p>`}
      </section>`}function gecmisKarti(){return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Defter")}</p><h2 class="b2">${\u00E7("Son sevkiyatlar")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></div>
        ${v.recent.length?`<div class="liste">${v.recent.map(s=>`<div class="liste-satir">
            <span class="liste-ikon ${s.status==="sold"?"yesil":s.status==="caught"?"mercan":""}">${ikon(s.status==="sold"?"coins":s.status==="caught"?"lock":"undo-2")}</span>
            <div><span class="tur">${esc(SEVKIYAT_DURUM[s.status]??s.status)} \xB7 ${esc(saatYaz(s.resolved_at??s.started_at))}</span>
              <b>${\u00E7("{n} {urun} \u2192 {bolge}",{n:sayi(s.qty),urun:esc(varlikAdi(s.asset)),bolge:esc(bolgeAdi(s.to))})}</b>
              <div class="alt">${s.status==="sold"?\u00E7("{kr} kredi kazand\u0131n",{kr:kr(s.payout_cr)}):s.status==="caught"?\u00E7("Y\xFCk ve {kr} kredi ceza {ulke} hazinesine ge\xE7ti",{kr:kr(s.fine_cr),
ulke:esc(ulkeAdi(s.customs_country_id))}):\u00E7("Y\xFCk sende kald\u0131")}
                ${s.roll_ppm!=null?" \xB7 "+\u00E7("zar {zar}, ihtimal {ihtimal}",{zar:esc(ppmYuzde(s.roll_ppm)),ihtimal:esc(ppmYuzde(s.catch_ppm))}):""}</div></div><span></span></div>`).join("")}</di\
v>`:`<p class="bos">${\u00E7("Hen\xFCz ka\xE7ak sevkiyat yapmad\u0131n.")}</p>`}
      </section>`}function kuralKarti(){const r=v.rule,c=r.catch;return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Nas\u0131l i\u015Fler?")}</p><h2 class="b2">${\u00E7("Ka\xE7ak\xE7\u0131l\u0131\u011F\u0131n kurallar\u0131")}</h2></div><span class="i\
k-kutu">${ikon("scale")}</span></div>
        <div class="yigin" style="gap:8px">
          ${r.demand_per_hit_cr!=null?`<p class="aciklama">${\u00E7("Kara al\u0131c\u0131n\u0131n paras\u0131 sava\u015Ftaki vuru\u015Fla a\xE7\u0131l\u0131r: o g\xFCn at\u0131lan her vuru\u015F i\xE7in {v} kredi, bir sava\u015F i\xE7in g\xFCnde en \xE7ok {kr} kredi. Sen g\
\xFCnde en \xE7ok {gun} kredilik, bir seferde en \xE7ok {tek} kredilik y\xFCk ta\u015F\u0131rs\u0131n.",{v:kr(r.demand_per_hit_cr),kr:kr(r.daily_per_campaign_cr),gun:kr(r.daily_per_character_cr),tek:kr(
r.max_run_cr)})}</p>`:`<p class="aciklama">${\u00E7("Kara al\u0131c\u0131 her sava\u015F i\xE7in g\xFCnde en \xE7ok {kr} kredi \xF6der; sen g\xFCnde en \xE7ok {gun} kredilik, bir seferde en \xE7ok {tek} kredilik y\xFCk ta\u015F\u0131rs\u0131n.",
{kr:kr(r.daily_per_campaign_cr),gun:kr(r.daily_per_character_cr),tek:kr(r.max_run_cr)})}</p>`}
          ${Number(r.min_work_units)>0?`<p class="aciklama">${\u00E7("Ka\xE7ak\xE7\u0131l\u0131k i\xE7in hesab\u0131n en az {saat} saatlik olmal\u0131 ve en az {is} i\u015F birimi tamamlam\u0131\u015F olmal\u0131s\u0131n.",
{saat:Number(r.min_account_age_h),is:sayi(r.min_work_units)})}</p>`:""}
          <p class="aciklama">${\u00E7("Yakalanma ihtimali g\xFCmr\xFC\u011F\xFCn s\u0131k\u0131l\u0131\u011F\u0131ndan ba\u015Flar (gev\u015Fek {g}, ola\u011Fan {o}, s\u0131k\u0131 {s}); \xFClkenin bug\xFCn \xF6dedi\u011Fi g\xFCmr\xFCk b\xFCt\xE7esi, y\xFCk\xFCn b\xFCy\xFCkl\xFC\u011F\xFC ve yasak mal art\u0131r\u0131r, \
lojistik becerin azalt\u0131r. \u0130htimal en az {min}, en \xE7ok {max} olur ve yola \xE7\u0131karken kilitlenir.",{g:ppmYuzde(c.strictnessPpm.low),o:ppmYuzde(c.strictnessPpm.normal),s:ppmYuzde(c.strictnessPpm.
high),min:ppmYuzde(c.minPpm),max:ppmYuzde(c.maxPpm)})}</p>
          <p class="aciklama">${\u00E7("Yakalan\u0131rsan y\xFCk ve ceza g\xFCmr\xFC\u011F\xFCn \xFClkesinin hazinesine ge\xE7er ve g\xF6zalt\u0131na al\u0131n\u0131rs\u0131n (gev\u015Fek {g}, ola\u011Fan {o}, s\u0131k\u0131 {s} saat). Yasak malda ceza da g\xF6zalt\u0131 da {k} \
kat\u0131d\u0131r. Ceza oran\u0131n\u0131 ve yasak mallar\u0131 her \xFClkenin meclisi g\xFCmr\xFCk yasas\u0131yla belirler.",{g:Number(r.detention_h.low),o:Number(r.detention_h.normal),s:Number(r.detention_h.
high),k:Number(r.banned_multiplier)})}</p>
          <p class="kucuk">${\u00E7("Ka\xE7ak\xE7\u0131l\u0131k iste\u011Fe ba\u011Fl\u0131d\u0131r ve riski yaln\u0131z sen ta\u015F\u0131rs\u0131n: ba\u015Fka bir oyuncunun mal\u0131na ya da paras\u0131na dokunulmaz.")}\
</p>
        </div>
      </section>`}const karakolGozalti=()=>p.detention?{bas:Date.parse(p.detention.starts_at),bitis:Date.parse(p.detention.ends_at)}:null,karakolDurumu=()=>({polis:Number(p.on_duty.police),jandarma:Number(
p.on_duty.gendarme),ulkeRenk:ulkeRenk(p.country_id),gozalti:karakolGozalti(),kendiRenk:kendiGiysiRengi()});function karakolKarti(){const d=p.detention,yazi=d?\u00E7("Nezarethanedesin: g\xF6zalt\u0131n {zaman}\
 tarihinde biter.",{zaman:esc(saatYaz(d.ends_at))}):\u00E7("Bu b\xF6lgede \u015Fu an {p} polis ve {j} jandarma n\xF6bette.",{p:sayi(p.on_duty.police),j:sayi(p.on_duty.gendarme)})+" "+\u00E7("Son 24 sa\
atin devriyesi: polis {p}, jandarma {j}.",{p:devriyeSure(p.patrol.police_minutes),j:devriyeSure(p.patrol.gendarme_minutes)});return`<section class="kart karakol-kart" id="karakol-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Karakol")}</p><h2 class="b2">${esc(bolgeAdi(p.location))}</h2></div>
          ${Gorunum.webglVar()?`<button class="dugme sade kucuk-d" id="karakol-mod" aria-pressed="${karakolMod==="2b"}" title="${karakolMod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCme (2B) ge\xE7"):\u00E7(
"3B g\xF6r\xFCn\xFCme ge\xE7")}">${ikon("layers")}${karakolMod==="3b"?\u00E7("2B"):\u00E7("3B")}</button>`:""}</div>
        <div class="karakol-sahne sahne3b" id="karakol-sahne" data-mod="${karakolMod}" data-gozalti="${d?1:0}">
          ${karakolMod==="3b"?`<div class="yukleniyor${karakol3bOrnek?" bitti":""}" id="karakol-yukleniyor"><div class="yukleniyor-ic"><img src="img/amblem.png" alt=""><span>${\u00E7("Karakol a\xE7\u0131l\u0131yor\
\u2026")}</span></div></div>`:""}
          <div class="karakol-2b" id="karakol-2b"${karakolMod==="3b"?" hidden":""}>${karakolMod==="2b"?karakol2b(karakolDurumu()):""}</div>
        </div>
        <p class="kucuk" style="margin-top:8px" aria-live="polite">${yazi}</p>
      </section>`}function karakolBirak(){karakol3bOrnek&&Uc.cizici?.etkin===karakol3bOrnek&&Uc.cizici.birak(karakol3bOrnek)}async function karakolBagla(){clearInterval(karakolSaat);const kutu=$("#kar\
akol-sahne",kap);if(!kutu){karakolBirak();return}if(karakolMod!=="3b"){karakolBirak(),p.detention&&(karakolSaat=setInterval(()=>{const g=$("[data-karakol-saat]",kap);g&&(g.innerHTML=karakolSaat2b(gozaltiPay(
karakolGozalti())))},2e3));return}try{const{THREE,cizici}=await Uc.yukle("39_golge.js");if(kapandi||karakolMod!=="3b"||$("#karakol-sahne",kap)!==kutu)return;if(karakol3bOrnek??=karakol3bKur(THREE,cizici),
karakol3bOrnek.kapBagla(kutu),karakol3bOrnek.durumYaz(karakolDurumu()),!cizici.bagla(karakol3bOrnek,kutu))throw new Error("webgl-bagla");$("#karakol-yukleniyor",kutu)?.classList.add("bitti")}catch(e){
if(console.warn("3B karakol a\xE7\u0131lamad\u0131:",e),kapandi)return;karakolHata=!0,karakolMod="2b",tost(\u00E7("3B karakol bu cihazda a\xE7\u0131lamad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),
"layers"),ciz()}}function klNobetKarti(){const x=p.shift,r=p.rule;if(x)return`<section class="kart" id="kl-nobet">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("N\xF6bettesin")}</p><h2 class="b2">${x.kind==="police"?\u00E7("Polis n\xF6beti"):\u00E7("Jandarma n\xF6beti")}</h2></div><span class=\
"ik-kutu">${ikon(KL_TUR_IKON[x.kind]??"shield")}</span></div>
          <div class="cubuk deniz"><i data-ilerleme="${esc(x.starts_at)}|${esc(x.ends_at)}"></i></div>
          <p class="kucuk" style="margin-top:8px">${\u00E7("Biti\u015F: <b>{zaman}</b>",{zaman:esc(saatYaz(x.ends_at))})} \xB7 ${\u00E7("kalan")} <b data-bitis="${esc(x.ends_at)}"></b></p>
          <div class="bilgi-izgara">
            <div><small>${\u00E7("B\xF6lge")}</small><b>${esc(bolgeAdi(x.region_id))}</b></div>
            <div><small>${\u00E7("Maa\u015F (\xF6dendi)")}</small><b>${\u00E7("{kr} kredi",{kr:kr(x.wage_cr)})}</b></div>
            <div><small>${\u00E7("N\xF6bet")}</small><b>${\u00E7("{n} birim \xB7 {dk} dk",{n:sayi(x.units),dk:sayi(x.units*r.unit_minutes)})}</b></div>
            <div><small>${\u00E7("Bu n\xF6betteki primin")}</small><b>${\u00E7("{kr} kredi",{kr:kr(x.bounties_cr)})}</b></div>
          </div>
          <p class="aciklama">${x.kind==="police"?\u00E7("N\xF6betin ba\u015Flad\u0131\u011F\u0131 andan 24 saat boyunca b\xF6lgenin devriyesine say\u0131l\u0131r: devriyenin her tam g\xFCn\xFC bu b\xF6lgedeki her kara borsa al\u0131m\u0131n\u0131n denetim iht\
imalini {oran} art\u0131r\u0131r. Bask\u0131nda cezalar\u0131n {prim} kadar\u0131 o anki devriyeye b\xF6l\xFCn\xFCr; senin pay\u0131n devriyenin bir g\xFCne oran\u0131 kadard\u0131r. N\xF6betteyken kara borsaya giremezsin.",
{oran:ppmYuzde(r.police_ppm),prim:ppmYuzde(r.bounty_ppm)}):\u00E7("N\xF6betin ba\u015Flad\u0131\u011F\u0131 andan 24 saat boyunca b\xF6lgenin devriyesine say\u0131l\u0131r: devriyenin her tam g\xFCn\xFC bu b\xF6lgeye yola \xE7\u0131kan her ka\xE7ak y\xFCk\xFCn y\
akalanma ihtimalini {oran} art\u0131r\u0131r. G\xFCmr\xFCkte yakalanan\u0131n cezas\u0131n\u0131n {prim} kadar\u0131 o anki devriyeye b\xF6l\xFCn\xFCr; senin pay\u0131n devriyenin bir g\xFCne oran\u0131 kadard\u0131r.",
{oran:ppmYuzde(r.gendarme_ppm),prim:ppmYuzde(r.bounty_ppm)})}</p>
        </section>`;const b=p.blocked;return`<section class="kart" id="kl-durum">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kolluk g\xF6revi")}</p><h2 class="b2">${esc(bolgeAdi(p.location))}</h2></div><span class="ik-kutu">${ikon("id-card")}</span></div>
        ${b?`<div class="yasa-bant uyari">${ikon(KL_ENGEL_IKON[b.code]??"clock")}<span>${esc(kbEngelMetni(b))}</span></div>`:""}
        <div class="bilgi-izgara">
          <div><small>${\u00E7("Devlet")}</small><b>${p.country_id?esc(ulkeAdi(p.country_id)):"\u2014"}</b></div>
          <div><small>${\u00E7("Bug\xFCnk\xFC \xE7al\u0131\u015Fman")}</small><b>${\u00E7("{a} / {b} birim",{a:sayi(p.units_today),b:sayi(p.daily_cap)})}</b></div>
          <div><small>${\u00E7("Birim maa\u015F\u0131")}</small><b>${\u00E7("{kr} kredi",{kr:kr(r.wage_per_unit_cr)})}</b></div>
          <div><small>${\u00E7("Bir n\xF6bette en \xE7ok")}</small><b>${\u00E7("{n} birim",{n:sayi(r.max_units)})}</b></div>
        </div>
        <div class="satir" style="gap:8px;flex-wrap:wrap;margin-top:12px">
          <button class="dugme altin" data-kl-nobet="police" ${b?"disabled":""}>${ikon("shield")}${\u00E7("Polis n\xF6beti")}</button>
          <button class="dugme ikincil" data-kl-nobet="gendarme" ${b?"disabled":""}>${ikon("shield-half")}${\u00E7("Jandarma n\xF6beti")}</button>
        </div>
        <p class="kucuk" style="margin-top:8px">${\u00E7("Polis bulundu\u011Fun b\xF6lgenin kara borsas\u0131n\u0131, jandarma bu b\xF6lgeye gelen ka\xE7ak y\xFCk\xFC denetler.")}</p>
      </section>`}function klButceKarti(){const b=p.budget,butce=Number(b?.budget_cr??0),harcanan=Number(b?.used_cr??0);return`<section class="kart" id="kl-butce">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xDClkenin kolluk b\xFCt\xE7esi")}</p><h2 class="b2">${p.country_id?esc(ulkeAdi(p.country_id)):"\u2014"}</h2></div><span class="ik-kutu\
">${ikon("landmark")}</span></div>
        ${b?`<div class="cubuk deniz"><i style="width:${butce?Math.min(100,100*harcanan/butce).toFixed(1):0}%"></i></div>
          <div class="bilgi-izgara" style="margin-top:8px">
            <div><small>${\u00E7("Bug\xFCnk\xFC b\xFCt\xE7e")}</small><b>${\u00E7("{kr} kredi",{kr:kr(butce)})}</b></div>
            <div><small>${\u00E7("Harcanan")}</small><b>${\u00E7("{kr} kredi",{kr:kr(harcanan)})}</b></div>
            <div><small>${\u00E7("Kalan")}</small><b>${\u00E7("{kr} kredi",{kr:kr(Math.max(0,butce-harcanan))})}</b></div>
            <div><small>${\u00E7("B\xF6lgede n\xF6bette")}</small><b>${\u00E7("{p} polis \xB7 {j} jandarma",{p:sayi(p.on_duty.police),j:sayi(p.on_duty.gendarme)})}</b></div>
            <div><small>${\u00E7("Polis devriyesi (24 saat)")}</small><b>${esc(devriyeSure(p.patrol.police_minutes))} \xB7 ${\u00E7("kara borsaya {oran}",{oran:"+"+ppmYuzde(p.patrol.police_ppm)})}</b>\
</div>
            <div><small>${\u00E7("Jandarma devriyesi (24 saat)")}</small><b>${esc(devriyeSure(p.patrol.gendarme_minutes))} \xB7 ${\u00E7("ka\xE7ak y\xFCke {oran}",{oran:"+"+ppmYuzde(p.patrol.gendarme_ppm)})}\
</b></div>
          </div>
          ${butce?"":`<p class="kucuk">${\u00E7("Meclis g\xFCmr\xFCk yasas\u0131nda kolluk b\xFCt\xE7esi ay\u0131rmad\u0131k\xE7a n\xF6bet tutulmaz.")}</p>`}`:`<p class="bos">${\u00E7("Bu b\xF6lge bir \xFCl\
kenin de\u011Fil.")}</p>`}
        <p class="kucuk">${\u00E7("B\xFCt\xE7eyi meclis g\xFCmr\xFCk yasas\u0131yla belirler (g\xFCnde en \xE7ok {kr} kredi). B\xFCt\xE7e ya da hazine biterse o g\xFCn yeni n\xF6bet a\xE7\u0131lmaz.",
{kr:kr(p.rule.budget_max_cr)})}</p>
      </section>`}function klGecmisKarti(){const satirlar=[...p.bounties.map(b=>({t:Date.parse(b.at),html:`<div class="liste-satir">
            <span class="liste-ikon yesil">${ikon("hand-coins")}</span>
            <div><span class="tur">${\u00E7("Yakalama primi")} \xB7 ${esc(saatYaz(b.at))}</span>
              <b>${b.source==="black_market"?\u00E7("Kara borsa bask\u0131n\u0131 \xB7 {bolge}",{bolge:esc(bolgeAdi(b.region_id))}):\u00E7("G\xFCmr\xFCkte yakalama \xB7 {bolge}",{bolge:esc(bolgeAdi(b.
region_id))})}</b>
              <div class="alt">${\u00E7("+{kr} kredi",{kr:kr(b.amount_cr)})}</div></div><span></span></div>`})),...p.recent.map(x=>({t:Date.parse(x.starts_at),html:`<div class="liste-satir">
            <span class="liste-ikon ${x.status==="cancelled"?"mercan":""}">${ikon(KL_TUR_IKON[x.kind]??"shield")}</span>
            <div><span class="tur">${esc(KL_TUR[x.kind]??x.kind)} \xB7 ${esc(saatYaz(x.starts_at))}${x.on_duty?" \xB7 "+\u00E7("s\xFCr\xFCyor"):x.status==="cancelled"?" \xB7 "+\u00E7("kapand\u0131"):""}\
</span>
              <b>${\u00E7("{n} birim \xB7 {bolge}",{n:sayi(x.units),bolge:esc(bolgeAdi(x.region_id))})}</b>
              <div class="alt">${\u00E7("Maa\u015F {kr} kredi",{kr:kr(x.wage_cr)})}${Number(x.bounties_cr)?" \xB7 "+\u00E7("prim {kr} kredi",{kr:kr(x.bounties_cr)}):""}</div></div><span></span></div>`}))].
sort((a,b)=>b.t-a.t);return`<section class="kart" id="kl-gecmis">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ge\xE7mi\u015F")}</p><h2 class="b2">${\u00E7("N\xF6betlerin ve primlerin")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</spa\
n></div>
        ${satirlar.length?`<div class="liste">${satirlar.map(x=>x.html).join("")}</div>`:`<p class="bos">${\u00E7("Hen\xFCz kolluk n\xF6beti tutmad\u0131n.")}</p>`}
      </section>`}function klKuralKarti(){const r=p.rule;return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Nas\u0131l i\u015Fler?")}</p><h2 class="b2">${\u00E7("Kollu\u011Fun kurallar\u0131")}</h2></div><span class="ik-kutu">${ikon("scale")}<\
/span></div>
        <div class="yigin" style="gap:8px">
          <p class="aciklama">${\u00E7("Kolluk n\xF6beti \xFClkenin kamu i\u015Fidir: {dk} dakikal\u0131k birimlerle, bir n\xF6bette en \xE7ok {n} birim. G\xFCnl\xFCk \xE7al\u0131\u015Fma s\u0131n\u0131r\u0131 i\u015Fle ortakt\u0131r. Maa\u015F birim ba\u015F\u0131na {kr} kredi; n\
\xF6bet ba\u015Flarken \xFClkenin hazinesinden \xF6denir. N\xF6bet erzak istemez ve maa\u015Ftan vergi kesilmez.",{dk:sayi(r.unit_minutes),n:sayi(r.max_units),kr:kr(r.wage_per_unit_cr)})}</p>
          <p class="aciklama">${\u00E7("Bir b\xF6lgenin devriyesi son 24 saatin n\xF6betleridir: n\xF6bet ba\u015Flay\u0131nca tamam\u0131 say\u0131l\u0131r, ba\u015Flang\u0131c\u0131ndan 24 saat sonra azalarak d\xFC\u015Fer. N\xF6betin bitmesini beklemek risk\
i azaltmaz.")}</p>
          <p class="aciklama">${\u00E7("Polis n\xF6beti bulundu\u011Fun b\xF6lgenin kara borsas\u0131n\u0131 denetler: polis devriyesinin her tam g\xFCn\xFC o b\xF6lgedeki her al\u0131m\u0131n denetim ihtimalini {p} art\u0131r\u0131r (en \xE7ok {pm}). J\
andarma n\xF6beti bu b\xF6lgeye gelen ka\xE7ak y\xFCk\xFC denetler: jandarma devriyesinin her tam g\xFCn\xFC yola \xE7\u0131kan y\xFCk\xFCn yakalanma ihtimalini {j} art\u0131r\u0131r (en \xE7ok {jm}); ihtimal y\xFCk yola \xE7\u0131karken kilitlenir.",
{p:ppmYuzde(r.police_ppm),pm:ppmYuzde(r.police_max_ppm),j:ppmYuzde(r.gendarme_ppm),jm:ppmYuzde(r.gendarme_max_ppm)})}</p>
          <p class="aciklama">${\u00E7("Yakalama primi: b\xF6lgende yakalanan\u0131n cezas\u0131n\u0131n {b} kadar\u0131 o anki devriyeye b\xF6l\xFCn\xFCr (polise kara borsa bask\u0131n\u0131, jandarmaya g\xFCmr\xFCk): her g\xF6revli devriyesinin bir \
tam g\xFCne oran\u0131 kadar al\u0131r; devriye bir g\xFCn\xFC a\u015Farsa pay devriyeleri oran\u0131nda b\xF6l\xFCn\xFCr. Kalan\u0131 hazineye gider; yeni para de\u011Fildir. Su\xE7un taraf\u0131 olan g\xF6revli prim almaz.",
{b:ppmYuzde(r.bounty_ppm)})}</p>
          <p class="aciklama">${\u00E7("\u015Eartlar: o \xFClkenin vatanda\u015F\u0131 olmal\u0131 ve onun bir b\xF6lgesinde bulunmal\u0131s\u0131n; temel asker\xEE e\u011Fitim, hesap en az {saat} saatlik, en az {is} i\u015F birimi; son {gun} g\xFCnde \
mahk\xFBmiyet yok; g\xF6zalt\u0131nda ve yolda de\u011Filsin.",{saat:sayi(r.min_account_age_h),is:sayi(r.min_work_units),gun:sayi(r.clean_days)})}</p>
          <p class="aciklama">${\u00E7("Meclis g\xFCmr\xFCk yasas\u0131nda g\xFCnl\xFCk kolluk b\xFCt\xE7esi ay\u0131r\u0131r (en \xE7ok {kr} kredi); b\xFCt\xE7e ya da hazine biterse o g\xFCn yeni n\xF6bet a\xE7\u0131lmaz.",
{kr:kr(r.budget_max_cr)})}</p>
          <p class="kucuk">${\u00E7("Kolluk g\xF6lge ekonomisine kat\u0131lmayan oyuncuya hi\xE7bir \u015Fey yapamaz; yaln\u0131z ka\xE7ak\xE7\u0131l\u0131k ve kara borsadaki yakalanma ihtimalini art\u0131r\u0131r. N\xF6betteyken kara borsaya giremez\
sin.")}</p>
        </div>
      </section>`}function klNobetFormu(tur){const r=p.rule,bos=Math.max(1,Math.min(r.max_units,Number(p.daily_cap)-Number(p.units_today)));pencereForm({ust:\u00E7("Kolluk"),baslik:tur==="police"?\u00E7(
"Polis n\xF6beti \xB7 {bolge}",{bolge:bolgeAdi(p.location)}):\u00E7("Jandarma n\xF6beti \xB7 {bolge}",{bolge:bolgeAdi(p.location)}),onayAd:\u00E7("Teklifi g\xF6r"),onayIkon:"calculator",govde:`<p clas\
s="aciklama">${tur==="police"?\u00E7("Polis n\xF6beti bulundu\u011Fun b\xF6lgenin kara borsas\u0131n\u0131 denetler."):\u00E7("Jandarma n\xF6beti bu b\xF6lgeye gelen ka\xE7ak y\xFCk\xFC denetler.")}
            ${\u00E7("Maa\u015F n\xF6bet ba\u015Flarken \xF6denir.")}</p>
          <div class="radyo-liste">${Array.from({length:r.max_units},(_,i)=>i+1).map(n=>`<label class="radyo"><input type="radio" name="birim" value="${n}" ${n===bos?"checked":""}>
            <span><b>${\u00E7("{n} birim \xB7 {dk} dk",{n:sayi(n),dk:sayi(n*r.unit_minutes)})}</b><span class="kucuk">${\u00E7("maa\u015F {kr} kredi",{kr:kr(n*r.wage_per_unit_cr)})}</span></span></lab\
el>`).join("")}</div>`,is:async d=>{const q=await Sunucu.cagir("police_quote",{p_kind:tur,p_units:Number(d.get("birim"))});if(q.blocked)throw new Error(kbEngelMetni(q.blocked));setTimeout(()=>klNobetOnayi(
q),0)}})}function klNobetOnayi(q){pencere({ust:\u00E7("Kolluk \xB7 n\xF6bet"),baslik:q.kind==="police"?\u00E7("Polis n\xF6beti \xB7 {bolge}",{bolge:bolgeAdi(q.region_id)}):\u00E7("Jandarma n\xF6beti \xB7 {b\
olge}",{bolge:bolgeAdi(q.region_id)}),govde:`
          <div class="bilgi-izgara">
            <div><small>${\u00E7("Maa\u015F (hazineden, ba\u015Fta)")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.wage_cr)})}</b></div>
            <div><small>${\u00E7("S\xFCre")}</small><b>${\u00E7("{n} birim \xB7 biti\u015F {zaman}",{n:sayi(q.units),zaman:esc(saatYaz(q.ends_at))})}</b></div>
            <div><small>${\u00E7("\xDClkenin kalan b\xFCt\xE7esi")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.budget_left_cr)})}</b></div>
            <div><small>${\u00E7("B\xF6lgede n\xF6bette")}</small><b>${\u00E7("{p} polis \xB7 {j} jandarma",{p:sayi(q.police_on_duty),j:sayi(q.gendarmes_on_duty)})}</b></div>
            <div><small>${q.kind==="police"?\u00E7("Polis devriyesi (24 saat)"):\u00E7("Jandarma devriyesi (24 saat)")}</small><b>${esc(devriyeSure(q.patrol_minutes))}</b></div>
          </div>
          <p class="aciklama">${\u00E7("N\xF6bet s\xFCresince ba\u015Fka i\u015F tutamaz ve kara borsaya giremezsin; n\xF6bet birimleri g\xFCnl\xFCk \xE7al\u0131\u015Fma s\u0131n\u0131r\u0131na say\u0131l\u0131r ({a}/{b}).",
{a:sayi(Number(q.units_today)+Number(q.units)),b:sayi(q.daily_cap)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("N\xF6bete ba\u015Fla"),sinif:"altin",ikon:KL_TUR_IKON[q.kind]??"shield",is:async()=>{
try{await Sunucu.yap("police_start",{p_kind:q.kind,p_units:q.units,p_expected_wage:q.wage_cr}),tost(\u00E7("N\xF6bet ba\u015Flad\u0131; maa\u015F\u0131n \xF6dendi."),KL_TUR_IKON[q.kind]??"shield"),Durum.
ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}}]})}function kbDurumKarti(){const r=k.rule,b=k.blocked,bant=b?b.code==="BLACK_MARKET_NOT_EXPERIENCED"?`<div class="yasa-\
bant uyari">${ikon("hammer")}<span>${\u00E7("Kara borsa i\xE7in \xF6nce d\xFCr\xFCst i\u015Fte deneyim kazanmal\u0131s\u0131n: <b>{n}/{gerek}</b> i\u015F birimi tamamlad\u0131n (\u015Eehrim \u2192 \xC7al\u0131\u015F).",
{n:sayi(b.work_units),gerek:sayi(b.need_units)})}</span></div>`:`<div class="yasa-bant uyari">${ikon(KB_ENGEL_IKON[b.code]??"clock")}<span>${esc(kbEngelMetni(b))}</span></div>`:"";return`<section clas\
s="kart" id="kb-durum">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Bu b\xF6lgenin kara borsas\u0131")}</p><h2 class="b2">${esc(bolgeAdi(k.location))}</h2></div><span class="ik-kutu">${ikon("store")}</sp\
an></div>
        ${bant}
        <div class="bilgi-izgara">
          <div><small>${\u00E7("Devlet")}</small><b>${k.country_id?esc(ulkeAdi(k.country_id)):"\u2014"}</b></div>
          <div><small>${\u00E7("Kara borsa denetimi")}</small><b>${k.law?esc(SIKILIK[k.law.inspection]??k.law.inspection):"\u2014"}</b></div>
          <div><small>${\u00E7("Ceza oran\u0131")}</small><b>${k.law?esc(ppmYuzde(k.law.finePpm)):"\u2014"}</b></div>
          <div><small>${\u00E7("\xD6denmeyen sat\u0131\u015F vergisi")}</small><b>${k.sales_tax_ppm!=null?esc(ppmYuzde(k.sales_tax_ppm)):"\u2014"}</b></div>
          <div><small>${\u00E7("Bug\xFCn ald\u0131\u011F\u0131n")}</small><b>${\u00E7("{a} / {b} kr",{a:kr(k.bought_today_cr),b:kr(r.buyer_daily_cr)})}</b></div>
          <div><small>${\u00E7("Sat\u0131\u015Ftaki y\xFCk\xFCn")}</small><b>${\u00E7("{a} / {b} kr",{a:kr(k.exposure_cr),b:kr(r.seller_daily_cr)})}</b></div>
        </div>
        ${k.law?.banned?.length?`<p class="kucuk">${\u00E7("Yasak mallar: {mallar}. Yasak malda denetim daha s\u0131k, ceza {kat} kat\u0131.",{mallar:esc(listeYaz(k.law.banned.map(varlikAdi))),kat:Number(
r.banned_multiplier)})}</p>`:""}
        ${Number(k.police_on_duty)?`<p class="kucuk">${\u00E7("Bu b\xF6lgede \u015Fu an {n} polis n\xF6bette.",{n:sayi(k.police_on_duty)})}</p>`:""}
      </section>`}function kbDefterKarti(){const engel=!!k.blocked;return`<section class="kart" id="kb-defter">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sat\u0131c\u0131lar gizli")}</p><h2 class="b2">${\u00E7("Defter")}</h2></div>
          <button class="dugme altin kucuk-d" id="kb-ilan" ${engel||!k.country_id?"disabled":""}>${ikon("plus")}${\u00E7("\u0130lan a\xE7")}</button></div>
        ${k.book.length?`<div class="liste">${k.book.map(l=>`<div class="liste-satir" data-kb-ilan="${esc(l.listing_id)}">
            <img src="${varlikResim(l.asset)}" alt="" width="40" height="40">
            <div><span class="tur">${l.mine?\u00E7("Senin ilan\u0131n"):\u00E7("Gizli sat\u0131c\u0131")}</span>
              <b>${\u00E7("{n} {urun}",{n:sayi(l.qty_remaining),urun:esc(varlikAdi(l.asset))})} \xB7 ${\u00E7("birimi {kr} kr",{kr:kr(l.unit_price)})}</b>
              <div class="alt">${l.legal_ask!=null?\u00E7("Yasal pazarda en d\xFC\u015F\xFCk: {kr} kr",{kr:kr(l.legal_ask)}):\u00E7("Yasal pazarda bu mal yok")}
                \xB7 ${\u00E7("kalan")} <span data-bitis="${esc(l.expires_at)}"></span></div></div>
            ${l.mine?`<button class="dugme ikincil kucuk-d" data-kb-vazgec="${esc(l.listing_id)}">${ikon("x")}${\u00E7("Vazge\xE7")}</button>`:`<button class="dugme ikincil kucuk-d" data-kb-al="${esc(
l.listing_id)}" ${engel?"disabled":""}>${ikon("hand-coins")}${\u00E7("Al")}</button>`}
          </div>`).join("")}</div>`:`<p class="bos">${\u00E7("Bu b\xF6lgenin kara borsas\u0131nda \u015Fu an ilan yok.")}</p>`}
        ${engel?`<p class="kucuk" style="margin-top:8px">${\u00E7("\u015Eartlar\u0131 tutmad\u0131\u011F\u0131n i\xE7in \u015Fimdilik yaln\u0131z bakabilirsin.")}</p>`:""}
      </section>`}function kbBenimKarti(){const diger=k.mine.filter(l=>l.region_id!==k.location);return diger.length?`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u015Fka b\xF6lgelerde")}</p><h2 class="b2">${\u00E7("A\xE7\u0131k ilanlar\u0131n")}</h2></div><span class="ik-kutu">${ikon("map-pin")}\
</span></div>
        <div class="liste">${diger.map(l=>`<div class="liste-satir">
            <img src="${varlikResim(l.asset)}" alt="" width="40" height="40">
            <div><span class="tur">${esc(bolgeAdi(l.region_id))}</span>
              <b>${\u00E7("{n} {urun}",{n:sayi(l.qty_remaining),urun:esc(varlikAdi(l.asset))})} \xB7 ${\u00E7("birimi {kr} kr",{kr:kr(l.unit_price)})}</b>
              <div class="alt">${\u00E7("Ayr\u0131lan ceza pay\u0131 {kr} kr",{kr:kr(l.fine_reserve_cr)})} \xB7 ${\u00E7("kalan")} <span data-bitis="${esc(l.expires_at)}"></span></div></div>
            <button class="dugme ikincil kucuk-d" data-kb-vazgec="${esc(l.listing_id)}">${ikon("x")}${\u00E7("Vazge\xE7")}</button></div>`).join("")}</div>
      </section>`:""}function kbGecmisKarti(){return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ge\xE7mi\u015F")}</p><h2 class="b2">${\u00E7("Son kara borsa i\u015Flerin")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</sp\
an></div>
        ${k.recent.length?`<div class="liste">${k.recent.map(d=>`<div class="liste-satir">
            <span class="liste-ikon ${d.status==="sold"?"yesil":"mercan"}">${ikon(d.status==="sold"?"coins":"shield")}</span>
            <div><span class="tur">${esc(KB_DURUM[d.status]??d.status)} \xB7 ${d.role==="buyer"?\u00E7("ald\u0131n"):\u00E7("satt\u0131n")} \xB7 ${esc(saatYaz(d.at))}</span>
              <b>${\u00E7("{n} {urun} \xB7 {kr} kr",{n:sayi(d.qty),urun:esc(varlikAdi(d.asset)),kr:kr(d.total_cr)})}</b>
              <div class="alt">${d.status==="caught"?\u00E7("Mala el kondu; {kr} kredi ceza \xF6dedin.",{kr:kr(d.fine_cr)}):\u00E7("Vergisiz.")}
                ${" \xB7 "+\u00E7("zar {zar}, ihtimal {ihtimal}",{zar:esc(ppmYuzde(d.roll_ppm)),ihtimal:esc(ppmYuzde(d.catch_ppm))})}</div></div><span></span></div>`).join("")}</div>`:`<p class="bos">${\u00E7(
"Hen\xFCz kara borsada al\u0131m sat\u0131m yapmad\u0131n.")}</p>`}
      </section>`}function kbKuralKarti(){const r=k.rule,c=r.inspection;return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Nas\u0131l i\u015Fler?")}</p><h2 class="b2">${\u00E7("Kara borsan\u0131n kurallar\u0131")}</h2></div><span class="ik-kutu">${ikon("scal\
e")}</span></div>
        <div class="yigin" style="gap:8px">
          <p class="aciklama">${\u00E7("Kara borsada sat\u0131\u015F vergisi ve hizmet bedeli yoktur: sat\u0131c\u0131 yazd\u0131\u011F\u0131 fiyat\u0131n tamam\u0131n\u0131 al\u0131r. \u0130lan bulundu\u011Fun b\xF6lgede a\xE7\u0131l\u0131r ve {saat} saat durur; almak i\xE7in de o b\
\xF6lgede olmal\u0131s\u0131n. Sat\u0131c\u0131n\u0131n ad\u0131 gizlidir.",{saat:Number(r.listing_h)})}</p>
          <p class="aciklama">${\u00E7("Her al\u0131mda denetim ihtimali vard\u0131r ve almadan g\xF6r\xFCn\xFCr: \xFClkenin kara borsa denetimi (gev\u015Fek {g}, ola\u011Fan {o}, s\u0131k\u0131 {s}); al\u0131m\u0131n b\xFCy\xFCkl\xFC\u011F\xFC ve yasak mal art\u0131r\u0131r. En\
 az {min}, en \xE7ok {max}.",{g:ppmYuzde(c.strictnessPpm.low),o:ppmYuzde(c.strictnessPpm.normal),s:ppmYuzde(c.strictnessPpm.high),min:ppmYuzde(c.minPpm),max:ppmYuzde(c.maxPpm)})}</p>
          ${c.cargoDaily?`<p class="aciklama">${\u00E7("B\xFCy\xFCkl\xFCk pay\u0131 o g\xFCn daha \xF6nce ald\u0131klar\u0131n\u0131 da sayar (\xF6ncekilerin iki kat\u0131 ve bu al\u0131m): g\xFCn\xFCn al\u0131m\u0131n\u0131 k\xFC\xE7\xFCk par\xE7alara b\xF6lmek riski azaltmaz.")}\
</p>`:""}
          ${c.policePpm!=null?`<p class="aciklama">${\u00E7("B\xF6lgenin polis devriyesi (son 24 saatin n\xF6betleri) ihtimali art\u0131r\u0131r: devriyenin her tam g\xFCn\xFC {p} (en \xE7ok {pm}).",{
p:ppmYuzde(c.policePpm),pm:ppmYuzde(c.policeMaxPpm)})}</p>`:""}
          <p class="aciklama">${\u00E7("Yakalan\u0131rsa al\u0131nan mala el konur; sat\u0131c\u0131 da al\u0131c\u0131 da al\u0131m\u0131n de\u011Feri \xFCzerinden yasadaki oranda ceza \xF6der (yasak malda {kat} kat\u0131) ve ikisinin siciline yaz\u0131l\u0131r. Al\
\u0131c\u0131n\u0131n al\u0131m paras\u0131 kendisinde kal\u0131r; g\xF6zalt\u0131 yoktur. Sat\u0131c\u0131n\u0131n olas\u0131 cezas\u0131 ilan a\xE7\u0131l\u0131rken ayr\u0131l\u0131r; bask\u0131ndan sonra ilan kapan\u0131r.",
{kat:Number(r.banned_multiplier)})}</p>
          <p class="aciklama">${\u00E7("S\u0131n\u0131rlar: bir ilan en \xE7ok {ilan} kredi ve en \xE7ok {n} a\xE7\u0131k ilan; sat\u0131c\u0131 olarak a\xE7\u0131k ilanlar\u0131n\u0131n kalan\u0131 ile bug\xFCn elden \xE7\u0131kan en \xE7ok {satis} kredi, al\u0131c\u0131 olarak g\
\xFCnde en \xE7ok {alim} kredi.",{ilan:kr(r.max_listing_cr),n:sayi(r.max_open_listings),satis:kr(r.seller_daily_cr),alim:kr(r.buyer_daily_cr)})}</p>
          <p class="aciklama">${\u00E7("Kara borsa i\xE7in hesab\u0131n en az {saat} saatlik olmal\u0131 ve en az {is} i\u015F birimi tamamlam\u0131\u015F olmal\u0131s\u0131n.",{saat:Number(r.min_account_age_h),
is:sayi(r.min_work_units)})}</p>
          <p class="kucuk">${\u00E7("Kara borsa iste\u011Fe ba\u011Fl\u0131d\u0131r; riski yaln\u0131z al\u0131p satanlar ta\u015F\u0131r. \xDClkenin ka\xE7an vergisi \xDClkem \u2192 \xD6zet'te g\xF6r\xFCn\xFCr ve kara borsa denetimini meclis g\xFCmr\xFCk yasas\u0131yla belirl\
er.")}</p>
        </div>
      </section>`}function kbIlanFormu(){const mallar=(Durum.v.ozet?.balances??[]).filter(b=>b.asset!=="CR"&&Number(b.spendable)>0);if(!mallar.length){tost(\u00E7("Satacak mal\u0131n yok."),"package");
return}pencereForm({ust:\u00E7("Kara borsa"),baslik:\u00E7("\u0130lan a\xE7 \xB7 {bolge}",{bolge:bolgeAdi(k.location)}),onayAd:\u00E7("Teklifi g\xF6r"),onayIkon:"calculator",govde:`<p class="aciklama"\
>${\u00E7("Sat\u0131c\u0131 ad\u0131n gizli kal\u0131r. Mal ve olas\u0131 ceza pay\u0131n ilan a\xE7\u0131l\u0131rken ayr\u0131l\u0131r.")}</p>
          <div class="radyo-liste">${mallar.map((b,i)=>`<label class="radyo"><input type="radio" name="mal" value="${esc(b.asset)}" ${i===0?"checked":""}>
            <span><b>${esc(varlikAdi(b.asset))}</b><span class="kucuk">${\u00E7("sende {n}",{n:sayi(b.spendable)})}</span></span></label>`).join("")}</div>
          <label class="alan"><span>${\u00E7("Miktar")}</span><input name="miktar" inputmode="numeric" required placeholder="${\u00E7("\xF6r. 10")}"></label>
          <label class="alan"><span>${\u00E7("Birim fiyat (kredi)")}</span><input name="fiyat" inputmode="decimal" required placeholder="${\u00E7("\xF6r. 2,50")}">
            <small>${\u00E7("Bir ilan en \xE7ok {kr} kredi.",{kr:kr(k.rule.max_listing_cr)})}</small></label>`,is:async d=>{const miktar=adetAl(d.get("miktar")),fiyat=krediAlt(d.get("fiyat"));if(!(miktar>
0))throw new Error(\u00E7("Miktar\u0131 say\u0131 olarak yaz."));if(!(fiyat>0))throw new Error(\u00E7("Fiyat\u0131 kredi olarak yaz (\xF6r. 2,50)."));const q=await Sunucu.cagir("black_market_listing_q\
uote",{p_asset:d.get("mal"),p_qty:miktar,p_unit_price:fiyat});if(q.blocked)throw new Error(kbEngelMetni(q.blocked));setTimeout(()=>kbIlanOnayi(q),0)}})}function kbIlanOnayi(q){pencere({ust:\u00E7("Kar\
a borsa \xB7 ilan"),baslik:\u00E7("{n} {urun} \xB7 birimi {kr} kr",{n:sayi(q.qty),urun:varlikAdi(q.asset),kr:kr(q.unit_price)}),govde:`
          <div class="bilgi-izgara">
            <div><small>${\u00E7("\u0130lan\u0131n de\u011Feri")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.value_cr)})}</b></div>
            <div><small>${\u00E7("Ayr\u0131lacak ceza pay\u0131")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.fine_reserve_cr)})}</b></div>
            <div><small>${\u00E7("Devlet")}</small><b>${esc(ulkeAdi(q.country_id))}</b></div>
            <div><small>${\u00E7("S\xFCre")}</small><b>${\u00E7("{n} saat",{n:Number(q.listing_h)})}</b></div>
          </div>
          <p class="kucuk">${\u00E7("Tamam\u0131 tek seferde al\u0131n\u0131rsa denetim ihtimali:")}</p>
          ${kbIhtimalParcalari(q.catch)}
          <p class="aciklama">${\u00E7("Sat\u0131l\u0131rsa fiyat\u0131n tamam\u0131 sana ge\xE7er. Bir al\u0131m bask\u0131na u\u011Frarsa o al\u0131m\u0131n mal\u0131na el konur, ayr\u0131lan paydan o al\u0131m\u0131n cezas\u0131 hazineye ge\xE7er ve ilan kapan\u0131r; kalan mal\
\u0131n ve pay\u0131n sana d\xF6ner.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\u0130lan\u0131 a\xE7"),sinif:"altin",ikon:"store",is:async()=>{try{await Sunucu.yap("black_market_list",{p_asset:q.
asset,p_qty:q.qty,p_unit_price:q.unit_price,p_expected_reserve:q.fine_reserve_cr}),tost(\u00E7("\u0130lan\u0131n kara borsada; ad\u0131n gizli."),"store"),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(
e),"circle-alert")}await tazele()}}]})}function kbAlFormu(id){const l=k.book.find(x=>x.listing_id===id);l&&pencereForm({ust:\u00E7("Kara borsa"),baslik:\u00E7("{urun} \xB7 birimi {kr} kr",{urun:varlikAdi(
l.asset),kr:kr(l.unit_price)}),onayAd:\u00E7("Teklifi g\xF6r"),onayIkon:"calculator",govde:`<label class="alan"><span>${\u00E7("Miktar")}</span><input name="miktar" inputmode="numeric" required value=\
"${Number(l.qty_remaining)}">
            <small>${\u00E7("\u0130landa {n} var.",{n:sayi(l.qty_remaining)})}</small></label>`,is:async d=>{const miktar=adetAl(d.get("miktar"));if(!(miktar>0))throw new Error(\u00E7("Miktar\u0131 say\u0131 ol\
arak yaz."));const q=await Sunucu.cagir("black_market_quote",{p_listing:id,p_qty:miktar});if(q.blocked)throw new Error(kbEngelMetni(q.blocked,!0));setTimeout(()=>kbAlOnayi(q),0)}})}function kbAlOnayi(q){
const l=q.listing;pencere({ust:\u00E7("Kara borsa \xB7 al\u0131m"),baslik:\u00E7("{n} {urun}",{n:sayi(q.qty),urun:varlikAdi(l.asset)}),govde:`
          <div class="bilgi-izgara">
            <div><small>${\u00E7("\xD6deyece\u011Fin")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.total_cr)})}</b></div>
            <div><small>${\u00E7("Vergi ve hizmet bedeli")}</small><b>${\u00E7("yok")}</b></div>
            <div><small>${\u00E7("Yakalan\u0131rsan cezan")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.buyer_fine_cr)})}</b></div>
            <div><small>${\u00E7("Sat\u0131c\u0131n\u0131n cezas\u0131")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.seller_fine_cr)})}</b></div>
          </div>
          ${kbIhtimalParcalari(q.catch,!!k.rule.inspection?.cargoDaily)}
          ${k.rule.inspection?.cargoDaily&&Number(q.bought_today_cr)?`<p class="kucuk">${\u00E7("Bug\xFCn kara borsada {kr} kredilik al\u0131m yapt\u0131n; b\xFCy\xFCkl\xFCk pay\u0131 onlar\u0131 da sayar.",
{kr:kr(q.bought_today_cr)})}</p>`:""}
          <p class="aciklama">${\u00E7("Zar al\u0131m an\u0131nda at\u0131l\u0131r. Yakalanmazsan mal\u0131 al\u0131rs\u0131n. Yakalan\u0131rsan mala el konur, sen ve sat\u0131c\u0131 ceza \xF6dersiniz, ikinizin siciline yaz\u0131l\u0131r; al\u0131m paran sende kal\u0131r.")}\
</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Al"),sinif:"altin",ikon:"hand-coins",is:async()=>{try{const r=await Sunucu.yap("black_market_buy",{p_listing:l.listing_id,p_qty:q.qty,p_expected_total:q.
total_cr,p_expected_catch_ppm:q.catch_ppm});kbSonuc(r),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}}]})}function kbSonuc(r){if(r.status==="sold"){tost(\u00E7("\
Ald\u0131n: {n} {urun}, {kr} kredi. Vergi \xF6denmedi.",{n:sayi(r.qty),urun:varlikAdi(r.asset),kr:kr(r.total_cr)}),"hand-coins");return}pencere({ust:\u00E7("Kara borsa"),baslik:\u00E7("Bask\u0131n!"),
govde:`
          <div class="yasa-bant uyari" id="kb-baskin">${ikon("shield")}<span>${\u00E7("Denetimde yakaland\u0131n: {n} {urun} el kondu, {kr} kredi ceza \xF6dedin. Al\u0131m paran sende kald\u0131; siciline yaz\u0131ld\u0131.",
{n:sayi(r.qty),urun:esc(varlikAdi(r.asset)),kr:kr(r.fine_cr)})}</span></div>
          <p class="kucuk" style="margin-top:8px">${\u00E7("Zar {zar}, ihtimal {ihtimal}.",{zar:esc(ppmYuzde(r.roll_ppm)),ihtimal:esc(ppmYuzde(r.catch_ppm))})}</p>`})}async function kbVazgec(id){try{await Sunucu.
yap("black_market_cancel",{p_listing:id}),tost(\u00E7("\u0130landan vazge\xE7tin; mal\u0131n ve ceza pay\u0131n sana d\xF6nd\xFC."),"undo-2"),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"cir\
cle-alert")}await tazele()}const vgPlanlar=()=>vg.heists.filter(x=>x.status==="planning").sort((a,b)=>Date.parse(a.starts_at)-Date.parse(b.starts_at)),vgBen=x=>x.members.find(m=>m.me),vgSaatiGecti=x=>Date.
parse(x.starts_at)<=Date.now(),vgHedefVar=()=>!!vg.country_id&&Number(vg.city.level)>=Number(vg.rule.min_city_level),vgPlanEngel=()=>v.detention?\u00E7("G\xF6zalt\u0131ndayken vurgun planlayamazs\u0131n."):
vg.blocked?vgEngelMetni(vg.blocked):vg.country_id?vgHedefVar()?"":\u00E7("Bu \u015Fehirde vurgun hedefi yok: \u015Fehir en az {n}. seviye olmal\u0131.",{n:sayi(vg.rule.min_city_level)}):\u00E7("Bu b\xF6l\
ge bir \xFClkenin de\u011Fil; vurgun hedefi yok.");function masaVurgun(){const plan=vgPlanlar()[0];if(plan)return plan;const son=vg.heists[0];return son&&son.status!=="planning"&&Date.parse(son.resolved_at??
son.starts_at)>Date.now()-VG_SONUC_MS?son:null}function masaDurumu(x){const anahtar=x?`${x.heist_id}:${x.status}`:`bos:${vg.city.today.target}`;return{anahtar,hedef:x?x.target:vg.city.today.target,roller:x?
x.members.filter(m=>["joined","invited","done"].includes(m.status)).map(m=>({role:m.role,durum:m.status==="invited"?"invited":"joined"})):[],kesif:x?x.members.reduce((t,m)=>t+(m.status==="dropped"||m.
status==="left"?0:Number(m.recon_units)||0),0):0,devriye:Number(vg.city.patrol_minutes)>0,sonuc:x&&(x.status==="success"||x.status==="failed")?x.status:null,oynat:!!x&&x.status!=="planning"&&planlandaGorulen.
has(x.heist_id)&&!oynanan.has(anahtar)}}function masaKarti(){const x=masaVurgun(),hedef=x?.target??vg.city.today.target,ekip=x?x.members.filter(m=>m.status==="joined"||m.status==="done").length:0,yazi=x?
x.status==="planning"?vgSaatiGecti(x)?\u00E7("Vurgun s\xFCr\xFCyor; sonu\xE7 birka\xE7 dakika i\xE7inde gelir."):\u00E7("Vurgun {zaman}: ekipte {n} ki\u015Fi, ba\u015Far\u0131 ihtimali \u015Fu an {ihtimal}.",
{zaman:esc(saatYaz(x.starts_at)),n:sayi(ekip),ihtimal:esc(ppmYuzde(x.preview?.ppm??0))}):x.status==="success"?\u00E7("Vurgun ba\u015Far\u0131l\u0131: ekip ka\xE7t\u0131, \xF6d\xFCl payla\u015F\u0131ld\u0131."):
x.status==="failed"?\u00E7("Vurgun bast\u0131r\u0131ld\u0131: polis ekibi yakalad\u0131."):\u00E7("Vurgun iptal oldu; ayr\u0131lan ceza paylar\u0131 \xE7\xF6z\xFCld\xFC."):\u00E7("Bug\xFCn\xFCn hedefi: {hed\
ef}. \xD6d\xFCl {kr} kredi; planlay\u0131p arkada\u015Flar\u0131n\u0131 \xE7a\u011F\u0131r\u0131rs\u0131n.",{hedef:esc(VG_HEDEF[hedef]),kr:kr(vg.rule.targets[hedef].rewardCr)});return`<section class="\
kart masa-kart" id="masa-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Planlama masas\u0131")}</p><h2 class="b2">${esc(VG_HEDEF[hedef])} \xB7 ${esc(bolgeAdi(x?.region_id??vg.location))}</h2></div>
          ${Gorunum.webglVar()?`<button class="dugme sade kucuk-d" id="masa-mod" aria-pressed="${masaMod==="2b"}" title="${masaMod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCme (2B) ge\xE7"):\u00E7("3B g\xF6r\xFCn\
\xFCme ge\xE7")}">${ikon("layers")}${masaMod==="3b"?\u00E7("2B"):\u00E7("3B")}</button>`:""}</div>
        <div class="masa-sahne sahne3b" id="masa-sahne" data-mod="${masaMod}" data-durum="${esc(x?.status??"bos")}">
          ${masaMod==="3b"?`<div class="yukleniyor${masa3bOrnek?" bitti":""}" id="masa-yukleniyor"><div class="yukleniyor-ic"><img src="img/amblem.png" alt=""><span>${\u00E7("Planlama masas\u0131 a\xE7\u0131l\u0131yor\u2026")}\
</span></div></div>`:""}
          <div class="masa-2b" id="masa-2b"${masaMod==="3b"?" hidden":""}>${masaMod==="2b"?masa2b(masaDurumu(x)):""}</div>
        </div>
        <p class="kucuk" style="margin-top:8px" aria-live="polite">${yazi}</p>
      </section>`}function masaBirak(){masa3bOrnek&&Uc.cizici?.etkin===masa3bOrnek&&Uc.cizici.birak(masa3bOrnek)}async function masaBagla(){const kutu=$("#masa-sahne",kap);if(!kutu){masaBirak();return}
const x=masaVurgun(),d=masaDurumu(x);if(x?.status==="planning"&&planlandaGorulen.add(x.heist_id),d.oynat&&oynanan.add(d.anahtar),masaMod!=="3b"){masaBirak();return}try{const{THREE,cizici}=await Uc.yukle(
"39_golge.js");if(kapandi||masaMod!=="3b"||$("#masa-sahne",kap)!==kutu)return;if(masa3bOrnek??=masa3bKur(THREE,cizici),masa3bOrnek.kapBagla(kutu),masa3bOrnek.durumYaz(d),!cizici.bagla(masa3bOrnek,kutu))
throw new Error("webgl-bagla");$("#masa-yukleniyor",kutu)?.classList.add("bitti")}catch(e){if(console.warn("3B planlama masas\u0131 a\xE7\u0131lamad\u0131:",e),kapandi)return;masaHata=!0,masaMod="2b",
tost(\u00E7("3B planlama masas\u0131 bu cihazda a\xE7\u0131lamad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),"layers"),ciz()}}function vgHedefKarti(){const r=vg.rule,c=vg.city,b=vg.blocked,engel=vgPlanEngel(),
bant=b?b.code==="HEIST_NOT_EXPERIENCED"?`<div class="yasa-bant uyari">${ikon("hammer")}<span>${\u00E7("Vurgun i\xE7in \xF6nce d\xFCr\xFCst i\u015Fte deneyim kazanmal\u0131s\u0131n: <b>{n}/{gerek}</b> i\u015F birimi tamamlad\u0131n (\u015Eehri\
m \u2192 \xC7al\u0131\u015F).",{n:sayi(b.work_units),gerek:sayi(b.need_units)})}</span></div>`:`<div class="yasa-bant uyari">${ikon(VG_ENGEL_IKON[b.code]??"clock")}<span>${esc(vgEngelMetni(b))}</span>\
</div>`:"",gun=(g,ad)=>{const t=r.targets[g.target];return`<div class="liste-satir" data-vg-gun="${esc(g.day)}">
          <span class="liste-ikon ${g.robbed?"mercan":""}">${ikon(VG_HEDEF_IKON[g.target]??"target")}</span>
          <div><span class="tur">${esc(ad)}${g.robbed?" \xB7 "+\u00E7("soyuldu"):""}</span><b>${esc(VG_HEDEF[g.target]??g.target)}</b>
            <div class="alt">${\u00E7("\xD6d\xFCl {o} kredi \xB7 ceza pay\u0131 {c} kredi \xB7 taban {t}",{o:kr(t.rewardCr),c:kr(t.penaltyCr),t:esc(ppmYuzde(t.basePpm))})}</div></div><span></span></di\
v>`};return`<section class="kart" id="vg-hedef">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrin hedefi")}</p><h2 class="b2">${esc(bolgeAdi(vg.location))}</h2></div><span class="ik-kutu">${ikon("target")}</span></div>
        ${bant}
        ${vg.country_id?vgHedefVar()?`<div class="liste">${gun(c.today,\u00E7("Bug\xFCn"))}${gun(c.tomorrow,\u00E7("Yar\u0131n"))}</div>`:`<p class="bos">${\u00E7("Bu \u015Fehirde vurgun hedefi yok: \u015Fehir \
en az {n}. seviye olmal\u0131 (\u015Fu an {s}).",{n:sayi(r.min_city_level),s:sayi(c.level)})}</p>`:`<p class="bos">${\u00E7("Bu b\xF6lge bir \xFClkenin de\u011Fil; vurgun hedefi yok.")}</p>`}
        <div class="bilgi-izgara">
          <div><small>${\u00E7("\u015Eehrin seviyesi")}</small><b>${sayi(c.level)}</b></div>
          <div><small>${\u00E7("Polis devriyesi (24 saat)")}</small><b>${esc(devriyeSure(c.patrol_minutes))}${vgPolisPpm(r,c.patrol_minutes)?" \xB7 \u2212"+esc(ppmYuzde(vgPolisPpm(r,c.patrol_minutes))):
""}</b></div>
          <div><small>${\u00E7("Kara borsa denetimi")}</small><b>${esc(SIKILIK[c.inspection]??c.inspection)}${Number(r.inspection_ppm[c.inspection])?" \xB7 \u2212"+esc(ppmYuzde(r.inspection_ppm[c.inspection])):
""}</b></div>
          <div><small>${\u00E7("Devlet")}</small><b>${vg.country_id?esc(ulkeAdi(vg.country_id)):"\u2014"}</b></div>
        </div>
        <div class="satir" style="gap:8px;flex-wrap:wrap;margin-top:12px">
          <button class="dugme altin" id="vg-planla" ${engel?"disabled":""}>${ikon("target")}${\u00E7("Vurgun planla")}</button>
        </div>
        ${engel&&!b?`<p class="kucuk" style="margin-top:8px">${esc(engel)}</p>`:""}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Hedef her g\xFCn de\u011Fi\u015Fir ve \xF6nceden g\xF6r\xFCn\xFCr; bir \u015Fehirde g\xFCnde en \xE7ok bir vurgun ba\u015Far\u0131l\u0131 olur.")}\
</p>
      </section>`}function vgPlanKarti(x){const r=vg.rule,ben=vgBen(x),on=x.preview??{ppm:0,base:0},gecti=vgSaatiGecti(x),katilan=VG_ROLLER.filter(rol=>x.members.some(m=>m.role===rol&&m.status==="join\
ed")),insp=on.inspection_level??vg.city.inspection,satirlar=VG_ROLLER.map(rol=>{const m=x.members.find(u=>u.role===rol&&(u.status==="joined"||u.status==="invited")),beceri=BECERI_AD2[r.role_skill[rol]]??
r.role_skill[rol];return`<div class="liste-satir" data-vg-rol="${rol}">
          <span class="liste-ikon" style="color:${VG_ROL_RENK[rol]}">${ikon(VG_ROL_IKON[rol])}</span>
          <div><span class="tur">${esc(VG_ROL[rol])} \xB7 ${esc(beceri)}</span>
            <b>${m?esc(m.name)+(m.me?" \xB7 "+\u00E7("sen"):""):\u00E7("bo\u015F")}</b>
            <div class="alt">${m?m.status==="invited"?\u00E7("\xE7a\u011Fr\u0131ld\u0131; yan\u0131t bekleniyor"):\u00E7("kat\u0131ld\u0131 \xB7 ke\u015Fif {n}/{en}",{n:sayi(m.recon_units),en:sayi(r.recon_max_units)}):
\u00E7("Rol bo\u015F kal\u0131rsa pay\u0131 \xF6tekilere b\xF6l\xFCn\xFCr.")}</div></div>
          ${!m&&x.is_planner&&!gecti?`<button class="dugme ikincil kucuk-d" data-vg-cagir="${esc(x.heist_id)}|${rol}">${ikon("user-round-plus")}${\u00E7("\xC7a\u011F\u0131r")}</button>`:"<span></span>"}\

        </div>`}).join(""),kesifKalan=Math.max(0,Number(r.recon_max_units)-Number(ben?.recon_units??0));return`<section class="kart vg-plan" data-vg-plan="${esc(x.heist_id)}">
        <div class="kart-bas"><div><p class="ust-yazi">${x.is_planner?\u00E7("Planlad\u0131\u011F\u0131n vurgun"):\u00E7("Ekibinde oldu\u011Fun vurgun")}</p><h2 class="b2">${esc(VG_HEDEF[x.target])} \xB7\
 ${esc(bolgeAdi(x.region_id))}</h2></div><span class="ik-kutu">${ikon(VG_HEDEF_IKON[x.target]??"target")}</span></div>
        <p class="kucuk">${gecti?\u00E7("Vurgun saati geldi; sonu\xE7 birka\xE7 dakika i\xE7inde gelir."):`${\u00E7("Vurgun saati: <b>{zaman}</b>",{zaman:esc(saatYaz(x.starts_at))})} \xB7 ${\u00E7("ka\
lan")} <b data-bitis="${esc(x.starts_at)}"></b>`}</p>
        <div class="liste" style="margin-top:8px">${satirlar}</div>
        <div style="margin-top:10px">${vgIhtimalParcalari(on,!0)}</div>
        <div class="bilgi-izgara" style="margin-top:10px">
          <div><small>${\u00E7("\xD6d\xFCl (ekibe)")}</small><b>${\u00E7("{kr} kredi",{kr:kr(x.reward_cr)})}</b></div>
          <div><small>${\u00E7("Ba\u015Far\u0131da pay\u0131n (ekip b\xF6yle kal\u0131rsa)")}</small><b>${\u00E7("{kr} kredi",{kr:kr(vgPay(r,x.reward_cr,katilan,ben?.role))})}</b></div>
          <div><small>${\u00E7("Ayr\u0131lan ceza pay\u0131n")}</small><b>${\u00E7("{kr} kredi",{kr:kr(x.penalty_cr)})}</b></div>
          <div><small>${\u00E7("Yakalan\u0131rsan")}</small><b>${\u00E7("ceza pay\u0131, {n} saat g\xF6zalt\u0131, sicil",{n:Number(r.detention_h[insp]??0)})}</b></div>
        </div>
        ${katilan.length<Number(r.min_members)?`<div class="yasa-bant uyari" style="margin-top:10px">${ikon("users-round")}<span>${\u00E7("Vurgun i\xE7in en az {n} ki\u015Fi gerekir; vurgun saatinde eksik kal\
\u0131rsa cezas\u0131z iptal olur.",{n:sayi(r.min_members)})}</span></div>`:""}
        <p class="aciklama">${\u00E7("Vurgun saatinde {bolge} \u015Fehrinde ol: ba\u015Fka \u015Fehirde, g\xF6zalt\u0131nda ya da yoldaysan ekipten d\xFC\u015Fersin (ceza pay\u0131n \xE7\xF6z\xFCl\xFCr). \u0130htimal vurgun saatinde kilitlenir.",
{bolge:esc(bolgeAdi(x.region_id))})}</p>
        ${gecti?"":`<div class="satir" style="gap:8px;flex-wrap:wrap;margin-top:10px">
          ${ben?.status==="joined"&&kesifKalan>0?`<button class="dugme ikincil" data-vg-kesif="${esc(x.heist_id)}">${ikon("footprints")}${\u00E7("Ke\u015Ffe \xE7\u0131k")}</button>`:""}
          ${x.is_planner?`<button class="dugme sade" data-vg-iptal="${esc(x.heist_id)}">${ikon("x")}${\u00E7("Vurgunu iptal et")}</button>`:`<button class="dugme sade" data-vg-ayril="${esc(x.heist_id)}\
">${ikon("door-open")}${\u00E7("Ekipten ayr\u0131l")}</button>`}
        </div>`}
      </section>`}function vgCagriKarti(){return`<section class="kart" id="vg-cagri">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Seni \xE7a\u011F\u0131rd\u0131lar")}</p><h2 class="b2">${\u00E7("Vurgun \xE7a\u011Fr\u0131lar\u0131")}</h2></div><span class="ik-kutu">${ikon(
"users-round")}</span></div>
        <div class="liste">${vg.invites.map(x=>{const ben=vgBen(x),pl=x.members.find(m=>m.role==="planner"),burada=vg.location===x.region_id;return`<div class="liste-satir" data-vg-cagri="${esc(x.heist_id)}\
">
            <span class="liste-ikon">${ikon(VG_HEDEF_IKON[x.target]??"target")}</span>
            <div><span class="tur">${esc(VG_ROL[ben?.role]??"")} \xB7 ${esc(saatYaz(x.starts_at))}</span>
              <b>${esc(VG_HEDEF[x.target])} \xB7 ${esc(bolgeAdi(x.region_id))}</b>
              <div class="alt">${\u00E7("{ad} \xE7a\u011F\u0131rd\u0131 \xB7 ba\u015Far\u0131 ihtimali \u015Fu an {ihtimal} \xB7 ceza pay\u0131 {kr} kredi",{ad:esc(pl?.name??""),ihtimal:esc(ppmYuzde(x.
preview?.ppm??0)),kr:kr(x.penalty_cr)})}${burada?"":" \xB7 "+\u00E7("kat\u0131lmak i\xE7in {bolge} \u015Fehrinde olmal\u0131s\u0131n",{bolge:esc(bolgeAdi(x.region_id))})}</div></div>
            <span class="satir" style="gap:6px"><button class="dugme kucuk-d" data-vg-katil="${esc(x.heist_id)}" ${burada&&!vg.blocked&&!v.detention?"":"disabled"}>${\u00E7("Kat\u0131l")}</button>
              <button class="dugme sade kucuk-d" data-vg-reddet="${esc(x.heist_id)}">${\u00E7("Reddet")}</button></span></div>`}).join("")}</div>
        ${vg.blocked?`<p class="kucuk" style="margin-top:8px">${esc(vgEngelMetni(vg.blocked))}</p>`:""}
      </section>`}function vgGecmisKarti(){const gecmis=vg.heists.filter(x=>x.status!=="planning");return`<section class="kart" id="vg-gecmis">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ge\xE7mi\u015F")}</p><h2 class="b2">${\u00E7("Son vurgunlar\u0131n")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></di\
v>
        ${gecmis.length?`<div class="liste">${gecmis.map(x=>{const ben=vgBen(x),sonuclu=ben?.status==="done",durum=ben?.status==="dropped"?\u00E7("D\xFC\u015Ft\xFCn"):ben?.status==="left"?\u00E7("Ayr\u0131\
ld\u0131n"):VG_DURUM[x.status]??x.status,alt=ben?.status==="left"?\u00E7("Vurgun saatinden \xF6nce ayr\u0131ld\u0131n; ceza pay\u0131n \xE7\xF6z\xFCld\xFC."):ben?.status==="dropped"?\u00E7("Vurgun saa\
tinde \u015Fehirde de\u011Fildin (ya da g\xF6zalt\u0131nda, yoldayd\u0131n); ceza pay\u0131n \xE7\xF6z\xFCld\xFC."):x.status==="success"?\u00E7("Ekip ka\xE7t\u0131: pay\u0131n {kr} kredi.",{kr:kr(ben?.
share_cr??0)}):x.status==="failed"?\u00E7("Polis ekibi yakalad\u0131: {kr} kredi ceza, g\xF6zalt\u0131 ve sicil.",{kr:kr(ben?.penalty_cr??x.penalty_cr)}):VG_IPTAL[x.cancel_reason]??"",renk=sonuclu&&x.
status==="success"?"yesil":sonuclu&&x.status==="failed"?"mercan":"";return`<div class="liste-satir" data-vg-gecmis="${esc(x.heist_id)}">
            <span class="liste-ikon ${renk}">${ikon(sonuclu&&x.status==="success"?"coins":sonuclu&&x.status==="failed"?"lock":"undo-2")}</span>
            <div><span class="tur">${esc(durum)} \xB7 ${esc(VG_ROL[ben?.role]??"")} \xB7 ${esc(saatYaz(x.resolved_at??x.starts_at))}</span>
              <b>${esc(VG_HEDEF[x.target])} \xB7 ${esc(bolgeAdi(x.region_id))}</b>
              <div class="alt">${alt}${x.roll_ppm!=null&&sonuclu?" \xB7 "+\u00E7("zar {zar}, ihtimal {ihtimal}",{zar:esc(ppmYuzde(x.roll_ppm)),ihtimal:esc(ppmYuzde(x.chance_ppm))}):""}</div></div><spa\
n></span></div>`}).join("")}</div>`:`<p class="bos">${\u00E7("Hen\xFCz vurguna kat\u0131lmad\u0131n.")}</p>`}
      </section>`}function vgKuralKarti(){const r=vg.rule,t=r.targets,s=r.shares_ppm,hedef=id=>\u00E7("{ad} (\xF6d\xFCl {o}, ceza pay\u0131 {c} kredi, taban {t})",{ad:VG_HEDEF[id],o:kr(t[id].rewardCr),
c:kr(t[id].penaltyCr),t:ppmYuzde(t[id].basePpm)});return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Nas\u0131l i\u015Fler?")}</p><h2 class="b2">${\u00E7("Vurgunun kurallar\u0131")}</h2></div><span class="ik-kutu">${ikon("scale")}</span\
></div>
        <div class="yigin" style="gap:8px">
          <p class="aciklama">${\u00E7("Seviyesi en az {n} olan her \u015Fehirde her oyun g\xFCn\xFC tek hedef olur ve \xF6nceden g\xF6r\xFCn\xFCr: {a}; {b}; {c}. \xD6d\xFCl sistemden \xE7\u0131kar; bir \u015Fehirde g\xFCnde en \xE7ok bir vurgun ba\
\u015Far\u0131l\u0131 olur.",{n:sayi(r.min_city_level),a:esc(hedef("cashbox")),b:esc(hedef("depot")),c:esc(hedef("gold"))})}</p>
          <p class="aciklama">${\u00E7("Ekip {min}\u2013{max} ki\u015Fidir; her rolde bir ki\u015Fi: planlayan (y\xF6netim), uzman (\xFCretim), \u015Fof\xF6r (lojistik), g\xF6zc\xFC (askerlik). Planlayan bulundu\u011Fu \u015Fehirde vurgun saatin\
i {a}\u2013{b} saat sonras\u0131 se\xE7er ve yaln\u0131z arkada\u015Flar\u0131n\u0131 \xE7a\u011F\u0131r\u0131r. Ki\u015Fi ba\u015F\u0131 g\xFCnde bir vurgun.",{min:sayi(r.min_members),max:sayi(r.max_members),
a:sayi(r.min_lead_minutes/60),b:sayi(r.max_lead_minutes/60)})}</p>
          <p class="aciklama">${\u00E7("Kat\u0131lan herkes ceza pay\u0131n\u0131 ay\u0131r\u0131r ve vurgun saatinde \xE7izelgesine {dk} dakikal\u0131k g\xF6rev yaz\u0131l\u0131r. Saatten \xF6nce ayr\u0131labilirsin; ayr\u0131l\u0131nca pay\u0131n \xE7\xF6z\xFCl\xFCr. Planlayan a\
yr\u0131lamaz, vurgunu iptal edebilir.",{dk:sayi(r.duration_minutes)})}</p>
          <p class="aciklama">${\u00E7("Ke\u015Fif: her \xFCye vurgun saatinden \xF6nce bitecek en \xE7ok {n} birim ({dk} dakikal\u0131k) ke\u015Fif yapar; her birim ihtimali {p} art\u0131r\u0131r. Ke\u015Fif \xFCcretsizdir ve g\xFCnl\xFCk \xE7al\u0131\u015Fma \
s\u0131n\u0131r\u0131na say\u0131l\u0131r.",{n:sayi(r.recon_max_units),dk:sayi(r.recon_unit_minutes),p:ppmYuzde(r.recon_ppm_per_unit)})}</p>
          <p class="aciklama">${\u00E7("Ba\u015Far\u0131 ihtimali: hedefin taban\u0131, her rolde becerinin seviye ba\u015F\u0131na {s} katk\u0131s\u0131 ve ke\u015Fif art\u0131r\u0131r; \u015Fehrin polis devriyesi (devriyenin her tam g\xFCn\xFC {pp}, en \xE7ok {p\
m}) ve \xFClkenin kara borsa denetimi (gev\u015Fek {g}, ola\u011Fan {o}, s\u0131k\u0131 {sk}) azalt\u0131r. En az {min}, en \xE7ok {max}; vurgun saatinde kilitlenir.",{s:ppmYuzde(r.skill_ppm_per_level),
pp:ppmYuzde(r.police_ppm),pm:ppmYuzde(r.police_max_ppm),g:ppmYuzde(r.inspection_ppm.low),o:ppmYuzde(r.inspection_ppm.normal),sk:ppmYuzde(r.inspection_ppm.high),min:ppmYuzde(r.min_ppm),max:ppmYuzde(r.max_ppm)})}\
</p>
          <p class="aciklama">${\u00E7("Vurgun saatinde \u015Fehirde olmayan, g\xF6zalt\u0131ndaki ya da yoldaki \xFCye d\xFC\u015Fer. \u0130kiden az ki\u015Fi kal\u0131rsa ya da hedef o g\xFCn soyulmu\u015Fsa vurgun cezas\u0131z iptal olur.")}\
</p>
          <p class="aciklama">${\u00E7("Ba\u015Far\u0131da \xF6d\xFCl bulunan rollere paylar\u0131 oran\u0131nda b\xF6l\xFCn\xFCr (planlayan {a}, uzman {b}, \u015Fof\xF6r {c}, g\xF6zc\xFC {d}). Ba\u015Far\u0131s\u0131zl\u0131kta ayr\u0131lan cezalar \xFClkenin hazinesine ge\xE7er\
 (bir k\u0131sm\u0131 \u015Fehrin polis devriyesine prim); herkes {g}\u2013{sk} saat g\xF6zalt\u0131na al\u0131n\u0131r ve siciline yaz\u0131l\u0131r.",{a:ppmYuzde(s.planner),b:ppmYuzde(s.specialist),
c:ppmYuzde(s.driver),d:ppmYuzde(s.scout),g:sayi(Math.min(...Object.values(r.detention_h).map(Number))),sk:sayi(Math.max(...Object.values(r.detention_h).map(Number)))})}</p>
          <p class="aciklama">${\u00E7("\u015Eartlar: hesab\u0131n en az {saat} saatlik olmal\u0131 ve en az {is} i\u015F birimi tamamlam\u0131\u015F olmal\u0131s\u0131n; g\xF6zalt\u0131nda ve yolda de\u011Filsin.",
{saat:sayi(r.min_account_age_h),is:sayi(r.min_work_units)})}</p>
          <p class="kucuk">${\u00E7("Vurgun iste\u011Fe ba\u011Fl\u0131d\u0131r; hedef kurgusald\u0131r ve hi\xE7bir oyuncunun paras\u0131na ya da mal\u0131na dokunulmaz.")}</p>
        </div>
      </section>`}function vgPlanFormu(){const r=vg.rule,enAz=Math.ceil(r.min_lead_minutes/60),enCok=Math.floor(r.max_lead_minutes/60),saatler=Array.from({length:Math.max(0,enCok-enAz+1)},(_,i)=>enAz+
i);pencereForm({ust:\u00E7("Vurgun"),baslik:\u00E7("Vurgun planla \xB7 {bolge}",{bolge:bolgeAdi(vg.location)}),onayAd:\u00E7("Teklifi g\xF6r"),onayIkon:"calculator",govde:`<p class="aciklama">${\u00E7(
"Vurgun saatini se\xE7: hedef o g\xFCn\xFCn hedefidir. Ekibine sonra arkada\u015Flar\u0131n\u0131 \xE7a\u011F\u0131r\u0131rs\u0131n.")}</p>
          <label class="alan"><span>${\u00E7("Vurgun saati")}</span><select name="saat">${saatler.map(n=>`<option value="${n}" ${n===Math.min(enCok,enAz+1)?"selected":""}>${esc(\u00E7("{n} saat sonra \
\xB7 {zaman}",{n:sayi(n),zaman:saatYaz(new Date(Date.now()+n*36e5).toISOString())}))}</option>`).join("")}</select></label>`,is:async d=>{const dk=Number(d.get("saat"))*60,q=await Sunucu.cagir("heist_\
plan_quote",{p_lead_minutes:dk});if(q.blocked)throw new Error(vgEngelMetni(q.blocked));setTimeout(()=>vgPlanOnayi(q,dk),0)}})}function vgPlanOnayi(q,dk){const r=vg.rule;pencere({ust:\u00E7("Vurgun \xB7 p\
lan"),baslik:\u00E7("{hedef} \xB7 {bolge}",{hedef:VG_HEDEF[q.target],bolge:bolgeAdi(q.region_id)}),govde:`
          <div class="bilgi-izgara">
            <div><small>${\u00E7("Vurgun saati")}</small><b>${esc(saatYaz(q.starts_at))}</b></div>
            <div><small>${\u00E7("\xD6d\xFCl (ekibe)")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.reward_cr)})}</b></div>
            <div><small>${\u00E7("Ayr\u0131lacak ceza pay\u0131n")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.penalty_cr)})}</b></div>
            <div><small>${\u00E7("Yakalan\u0131rsan")}</small><b>${\u00E7("ceza pay\u0131, {n} saat g\xF6zalt\u0131, sicil",{n:Number(r.detention_h[q.inspection]??0)})}</b></div>
          </div>
          <p class="kucuk">${\u00E7("Yaln\u0131z seninle ba\u015Far\u0131 ihtimali:")}</p>
          ${vgIhtimalParcalari(q.chance)}
          <p class="aciklama">${\u00E7("Ekibe en az bir ki\u015Fi daha gerekir (en \xE7ok {n} ki\u015Fi). Kat\u0131lan her ki\u015Fi becerisiyle, ke\u015Fif de birimiyle ihtimali art\u0131r\u0131r; ihtimal vurgun saatinde kilitlenir.",
{n:sayi(r.max_members)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Planla"),sinif:"altin",ikon:"target",is:async()=>{try{await Sunucu.yap("heist_plan",{p_lead_minutes:dk,p_expected_target:q.
target}),tost(\u00E7("Vurgun planland\u0131; ceza pay\u0131n ayr\u0131ld\u0131. \u015Eimdi ekibine arkada\u015Flar\u0131n\u0131 \xE7a\u011F\u0131r."),"target"),Durum.ozet().catch(()=>{})}catch(e){tost(
hataMetni(e),"circle-alert")}await tazele()}}]})}async function vgCagirFormu(id,rol){const x=vg.heists.find(h=>h.heist_id===id);if(!x)return;let a;try{a=await Sunucu.cagir("friends")}catch(e){tost(hataMetni(
e),"circle-alert");return}const ekipte=new Set(x.members.filter(m=>m.status==="joined"||m.status==="invited").map(m=>m.character_id)),adaylar=(a.friends??[]).filter(f=>!ekipte.has(f.character_id));if(!adaylar.
length){tost(a.friends?.length?\u00E7("B\xFCt\xFCn arkada\u015Flar\u0131n zaten ekipte ya da \xE7a\u011Fr\u0131ld\u0131."):\u00E7("Vurguna yaln\u0131z arkada\u015Flar\u0131n\u0131 \xE7a\u011F\u0131rabilirsin; \xF6nce Meydan \u2192 Arkada\u015Flar\
'dan arkada\u015F ekle."),"users-round");return}pencereForm({ust:\u00E7("Vurgun \xB7 ekip"),baslik:\u00E7("{rol} \xE7a\u011F\u0131r",{rol:VG_ROL[rol]}),onayAd:\u00E7("\xC7a\u011F\u0131r"),onayIkon:"us\
er-round-plus",govde:`<p class="aciklama">${\u00E7("Bu rolde {beceri} becerisi say\u0131l\u0131r. \xC7a\u011F\u0131rd\u0131\u011F\u0131n ki\u015Fi kabul etmek i\xE7in vurgunun \u015Fehrinde olmal\u0131; kabul edince ceza pay\u0131n\u0131 ay\u0131r\u0131r.",
{beceri:esc(BECERI_AD2[vg.rule.role_skill[rol]]??vg.rule.role_skill[rol])})}</p>
          <div class="radyo-liste">${adaylar.map((f,i)=>`<label class="radyo"><input type="radio" name="kisi" value="${esc(f.character_id)}" ${i===0?"checked":""}>
            <span><b>${esc(f.name)}</b>${f.country_id?`<span class="kucuk">${esc(ulkeAdi(f.country_id))}</span>`:""}</span></label>`).join("")}</div>`,is:async d=>{await Sunucu.yap("heist_invite",{p_heist:id,
p_character:d.get("kisi"),p_role:rol}),tost(\u00E7("\xC7a\u011Fr\u0131 g\xF6nderildi."),"user-round-plus"),tazele()}})}function vgKatilOnayi(id){const x=vg.invites.find(h=>h.heist_id===id);if(!x)return;
const ben=vgBen(x),r=vg.rule,insp=x.preview?.inspection_level??vg.city.inspection;pencere({ust:\u00E7("Vurgun \xB7 \xE7a\u011Fr\u0131"),baslik:\u00E7("{rol} \xB7 {hedef}",{rol:VG_ROL[ben?.role]??"",hedef:VG_HEDEF[x.
target]}),govde:`
          <div class="bilgi-izgara">
            <div><small>${\u00E7("Vurgun saati")}</small><b>${esc(saatYaz(x.starts_at))}</b></div>
            <div><small>${\u00E7("\u015Eehir")}</small><b>${esc(bolgeAdi(x.region_id))}</b></div>
            <div><small>${\u00E7("Ayr\u0131lacak ceza pay\u0131n")}</small><b>${\u00E7("{kr} kredi",{kr:kr(x.penalty_cr)})}</b></div>
            <div><small>${\u00E7("Yakalan\u0131rsan")}</small><b>${\u00E7("ceza pay\u0131, {n} saat g\xF6zalt\u0131, sicil",{n:Number(r.detention_h[insp]??0)})}</b></div>
          </div>
          ${x.preview?vgIhtimalParcalari(x.preview,!0):""}
          <p class="aciklama">${\u00E7("Kat\u0131l\u0131nca ceza pay\u0131n ayr\u0131l\u0131r ve vurgun saatinde {dk} dakikal\u0131k g\xF6rev \xE7izelgene yaz\u0131l\u0131r. Rol\xFCnde {beceri} becerin ihtimali art\u0131r\u0131r. Vurgun saatinde bu \u015Fehirde ol\
mal\u0131s\u0131n.",{dk:sayi(r.duration_minutes),beceri:esc(BECERI_AD2[r.role_skill[ben?.role]]??"")})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Kat\u0131l"),sinif:"altin",ikon:"users-round",
is:async()=>{try{await Sunucu.yap("heist_respond",{p_heist:id,p_accept:!0}),tost(\u00E7("Vurgun ekibine kat\u0131ld\u0131n; ceza pay\u0131n ayr\u0131ld\u0131."),"users-round"),Durum.ozet().catch(()=>{})}catch(e){
tost(hataMetni(e),"circle-alert")}await tazele()}}]})}async function vgReddet(id){try{await Sunucu.yap("heist_respond",{p_heist:id,p_accept:!1}),tost(\u00E7("\xC7a\u011Fr\u0131y\u0131 reddettin."),"x")}catch(e){
tost(hataMetni(e),"circle-alert")}await tazele()}function vgKesifFormu(id){const x=vg.heists.find(h=>h.heist_id===id);if(!x)return;const r=vg.rule,ben=vgBen(x),kalan=Math.max(0,Number(r.recon_max_units)-
Number(ben?.recon_units??0)),sigan=Math.floor((Date.parse(x.starts_at)-Date.now())/6e4/Number(r.recon_unit_minutes)),enCok=Math.min(kalan,sigan);if(enCok<1){tost(kalan?\u00E7("Ke\u015Fif vurgun saatinden \xF6\
nce bitmeli; art\u0131k zaman yok."):\u00E7("Bu vurgun i\xE7in ke\u015Fif s\u0131n\u0131r\u0131na ula\u015Ft\u0131n."),"footprints");return}pencereForm({ust:\u00E7("Vurgun \xB7 ke\u015Fif"),baslik:\u00E7(
"Ke\u015Fif \xB7 {bolge}",{bolge:bolgeAdi(x.region_id)}),onayAd:\u00E7("Ke\u015Ffe \xE7\u0131k"),onayIkon:"footprints",govde:`<p class="aciklama">${\u00E7("Ke\u015Fif hedefi tan\u0131man\u0131 sa\u011Flar: her birim ba\u015Fa\
r\u0131 ihtimalini {p} art\u0131r\u0131r. Ke\u015Fif s\xFCresince ba\u015Fka i\u015F tutamazs\u0131n; birimler g\xFCnl\xFCk \xE7al\u0131\u015Fma s\u0131n\u0131r\u0131na say\u0131l\u0131r. \xDCcretsizdir.",
{p:ppmYuzde(r.recon_ppm_per_unit)})}</p>
          <div class="radyo-liste">${Array.from({length:enCok},(_,i)=>i+1).map(n=>`<label class="radyo"><input type="radio" name="birim" value="${n}" ${n===enCok?"checked":""}>
            <span><b>${\u00E7("{n} birim \xB7 {dk} dk",{n:sayi(n),dk:sayi(n*r.recon_unit_minutes)})}</b><span class="kucuk">${\u00E7("ihtimale {oran}",{oran:"+"+ppmYuzde(n*r.recon_ppm_per_unit)})}</sp\
an></span></label>`).join("")}</div>`,is:async d=>{await Sunucu.yap("heist_recon",{p_heist:id,p_units:Number(d.get("birim"))}),tost(\u00E7("Ke\u015Ffe \xE7\u0131kt\u0131n; ihtimal artt\u0131."),"footp\
rints"),Durum.ozet().catch(()=>{}),tazele()}})}async function vgAyril(id){try{await Sunucu.yap("heist_leave",{p_heist:id}),tost(\u00E7("Ekipten ayr\u0131ld\u0131n; ceza pay\u0131n \xE7\xF6z\xFCld\xFC."),
"door-open"),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}async function vgIptal(id){try{await Sunucu.yap("heist_cancel",{p_heist:id}),tost(\u00E7("Vurgunu ipta\
l ettin; ekibin ceza paylar\u0131 \xE7\xF6z\xFCld\xFC."),"x"),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}const scAcik=a=>a&&["lawyer_pending","preparing","rea\
dy","hearing"].includes(a.status),scKendi=()=>sc.records.map(x=>x.appeal).filter(Boolean);function scSalonDavasi(){const kendi=scKendi(),avk=sc.lawyer_cases??[],yrg=sc.court.hearings??[],sure=x=>x.find(
scAcik),yeni=x=>x.find(a=>scKarar(a)&&Date.parse(a.decided_at)>Date.now()-SC_SONUC_MS),sec=[[sure(kendi),"appellant"],[sure(avk.filter(a=>a.lawyer?.status==="accepted"||a.status==="lawyer_pending")),"\
lawyer"],[sure(yrg),"judge"],[yeni(kendi),"appellant"],[yeni(avk),"lawyer"],[yeni(yrg),"judge"]].find(([a])=>a);return sec?{a:sec[0],rol:sec[1]}:null}function mahkemeDurumu(x){if(!x)return{anahtar:"bo\
s",asama:"bos",yargic:!1,avukat:!1,itirazci:!1,rol:null,oynat:!1};const a=x.a,asama=a.status==="acquitted"?"beraat":a.status==="upheld"?"ret":a.status==="hearing"?"durusma":a.status==="preparing"?"sav\
unma":a.status==="withdrawn"?"bos":"sirada",avukatVar=x.rol==="judge"?!!a.lawyer?.present:a.lawyer?.status==="accepted",anahtar=`${a.appeal_id}:${a.status}`;return{anahtar,asama,yargic:a.status==="hea\
ring"||scKarar(a)&&a.decided_by==="judge",avukat:avukatVar,itirazci:!0,rol:x.rol,oynat:scKarar(a)&&davadaGorulen.has(a.appeal_id)&&!oynanan.has(anahtar)}}function mahkemeKarti(){const x=scSalonDavasi(),
a=x?.a,yazi=a?a.status==="lawyer_pending"?\u00E7("Avukat\u0131n yan\u0131t\u0131 bekleniyor; s\xFCre: {zaman}.",{zaman:esc(saatYaz(a.lawyer?.expires_at))}):a.status==="preparing"?\u00E7("Avukat savunm\
ay\u0131 haz\u0131rl\u0131yor; biti\u015F: {zaman}.",{zaman:esc(saatYaz(a.lawyer?.defense_ends_at))}):a.status==="ready"?a.system_decides_at?\u00E7("Dosya mahkemede s\u0131rada. Yarg\u0131\xE7 \xE7\u0131kmazsa sistem {zam\
an} karar verir.",{zaman:esc(saatYaz(a.system_decides_at))}):\u00E7("Dosya mahkemede s\u0131rada."):a.status==="hearing"?\u00E7("Duru\u015Fma s\xFCr\xFCyor; karar {zaman}.",{zaman:esc(saatYaz(a.hearing_ends_at))}):
a.status==="acquitted"?x.rol==="appellant"?\u00E7("Beraat: sicil kayd\u0131n bozuldu."):\u00E7("Karar: beraat."):\u00E7("Karar: ret; kay\u0131t duruyor."):Number(sc.court.queue.ready)?\u00E7("{ulke} m\
ahkemesinde {n} dosya yarg\u0131\xE7 bekliyor.",{ulke:esc(ulkeAdi(sc.court.country_id)),n:sayi(sc.court.queue.ready)}):\u00E7("Mahkeme salonu bo\u015F.");return`<section class="kart mahkeme-kart" id="\
mahkeme-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Mahkeme salonu")}</p><h2 class="b2">${a?`${esc(SC_TUR[a.kind]??a.kind)} \xB7 ${esc(ulkeAdi(a.country_id))}`:esc(ulkeAdi(sc.court.country_id))}\
</h2></div>
          ${Gorunum.webglVar()?`<button class="dugme sade kucuk-d" id="mahkeme-mod" aria-pressed="${mahkemeMod==="2b"}" title="${mahkemeMod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCme (2B) ge\xE7"):\u00E7(
"3B g\xF6r\xFCn\xFCme ge\xE7")}">${ikon("layers")}${mahkemeMod==="3b"?\u00E7("2B"):\u00E7("3B")}</button>`:""}</div>
        <div class="mahkeme-sahne sahne3b" id="mahkeme-sahne" data-mod="${mahkemeMod}" data-durum="${esc(a?.status??"bos")}">
          ${mahkemeMod==="3b"?`<div class="yukleniyor${mahkeme3bOrnek?" bitti":""}" id="mahkeme-yukleniyor"><div class="yukleniyor-ic"><img src="img/amblem.png" alt=""><span>${\u00E7("Mahkeme salonu a\
\xE7\u0131l\u0131yor\u2026")}</span></div></div>`:""}
          <div class="mahkeme-2b" id="mahkeme-2b"${mahkemeMod==="3b"?" hidden":""}>${mahkemeMod==="2b"?mahkeme2b(mahkemeDurumu(x)):""}</div>
        </div>
        <p class="kucuk" style="margin-top:8px" aria-live="polite">${yazi}</p>
      </section>`}function mahkemeBirak(){mahkeme3bOrnek&&Uc.cizici?.etkin===mahkeme3bOrnek&&Uc.cizici.birak(mahkeme3bOrnek)}async function mahkemeBagla(){const kutu=$("#mahkeme-sahne",kap);if(!kutu){
mahkemeBirak();return}const x=scSalonDavasi(),d=mahkemeDurumu(x);for(const a of[...scKendi(),...sc.lawyer_cases??[],...sc.court.hearings??[]])scAcik(a)&&davadaGorulen.add(a.appeal_id);if(d.oynat&&oynanan.
add(d.anahtar),mahkemeMod!=="3b"){mahkemeBirak();return}try{const{THREE,cizici}=await Uc.yukle("39_golge.js");if(kapandi||mahkemeMod!=="3b"||$("#mahkeme-sahne",kap)!==kutu)return;if(mahkeme3bOrnek??=mahkeme3bKur(
THREE,cizici),mahkeme3bOrnek.kapBagla(kutu),mahkeme3bOrnek.durumYaz(d),!cizici.bagla(mahkeme3bOrnek,kutu))throw new Error("webgl-bagla");$("#mahkeme-yukleniyor",kutu)?.classList.add("bitti")}catch(e){
if(console.warn("3B mahkeme salonu a\xE7\u0131lamad\u0131:",e),kapandi)return;mahkemeHata=!0,mahkemeMod="2b",tost(\u00E7("3B mahkeme salonu bu cihazda a\xE7\u0131lamad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),
"layers"),ciz()}}function scKayitKarti(){const r=sc.rule,kayitlar=sc.records,etkin=kayitlar.filter(x=>x.status==="active"),bitis=etkin.length?new Date(Math.max(...etkin.map(x=>Date.parse(x.convicted_at)))+
Number(r.block_days)*864e5).toISOString():null,satir=x=>{const a=x.appeal,itirazli=x.appealable!==!1,acik=!a&&itirazli&&x.status!=="cleared"&&Date.parse(x.appeal_until)>Date.now(),durumYazi=a?`${esc(SC_DAVA[a.
status]??a.status)}${a.lawyer?" \xB7 "+esc(a.lawyer.name??"")+" ("+esc(SC_AVUKAT[a.lawyer.status]??"")+")":" \xB7 "+\u00E7("avukats\u0131z")}`:x.status==="cleared"?\u00E7("\u0130tirazla bozuldu."):itirazli?
acik?`${\u00E7("\u0130tiraz s\xFCresi: kalan")} <b data-bitis="${esc(x.appeal_until)}"></b>`:\u00E7("\u0130tiraz s\xFCresi doldu."):\u00E7("Bu kayda itiraz edilmez."),avukatCagir=a&&a.status==="ready"&&
["none","declined","expired"].includes(a.lawyer?.status??"none"),renk=x.status==="cleared"?"yesil":x.status==="active"?"mercan":"";return`<div class="liste-satir" data-sc-kayit="${esc(x.record_id)}" d\
ata-durum="${esc(x.status)}">
          <span class="liste-ikon ${renk}">${ikon(SC_TUR_IKON[x.kind]??"scroll-text")}</span>
          <div><span class="tur">${esc(SC_KAYIT[x.status]??x.status)} \xB7 ${esc(ulkeAdi(x.country_id))} \xB7 ${esc(saatYaz(x.convicted_at))}</span>
            <b>${esc(SC_TUR[x.kind]??x.kind)}</b>
            <div class="alt">${Number(x.fine_cr)?\u00E7("Ceza {kr} kredi",{kr:kr(x.fine_cr)}):\u00E7("Para cezas\u0131 yok")}${x.detention_h?" \xB7 "+\u00E7("{n} saat g\xF6zalt\u0131",{n:Number(x.detention_h)}):
""} \xB7 ${durumYazi}
              ${a&&scKarar(a)&&a.roll_ppm!=null?" \xB7 "+\u00E7("zar {zar}, ihtimal {ihtimal}",{zar:esc(ppmYuzde(a.roll_ppm)),ihtimal:esc(ppmYuzde(a.chance_ppm))}):""}</div></div>
          <span class="satir" style="gap:6px;flex-wrap:wrap;justify-content:flex-end">
            ${acik?`<button class="dugme kucuk-d" data-sc-itiraz="${esc(x.record_id)}">${ikon("scale")}${\u00E7("\u0130tiraz et")}</button>`:""}
            ${avukatCagir?`<button class="dugme ikincil kucuk-d" data-sc-avukat-cagir="${esc(a.appeal_id)}">${ikon("user-round-plus")}${\u00E7("Avukat \xE7a\u011F\u0131r")}</button>`:""}
            ${a&&(a.status==="lawyer_pending"||a.status==="ready")?`<button class="dugme sade kucuk-d" data-sc-vazgec="${esc(a.appeal_id)}">${\u00E7("Vazge\xE7")}</button>`:""}
          </span></div>`};return`<section class="kart" id="sc-kayitlar">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Yaln\u0131z sen g\xF6r\xFCrs\xFCn")}</p><h2 class="b2">${\u00E7("Sicilin")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</spa\
n></div>
        ${bitis?`<div class="yasa-bant uyari">${ikon("scroll-text")}<span>${\u00E7("Son {n} g\xFCnde bozulmam\u0131\u015F mahk\xFBmiyetin var: aday olamazs\u0131n, kolluk n\xF6beti tutamazs\u0131n, avukat ya da yarg\u0131\xE7 olamazs\u0131n. \
Biti\u015F: <b>{zaman}</b>.",{n:sayi(r.block_days),zaman:esc(saatYaz(bitis))})}</span></div>`:""}
        ${kayitlar.length?`<div class="liste">${kayitlar.map(satir).join("")}</div>`:`<p class="bos">${\u00E7("Sicilin temiz.")}</p>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7("\u0130tiraz edilebilen kayda mahk\xFBmiyetten sonra {n} saat i\xE7inde itiraz edebilirsin (y\xF6netime el koyma giri\u015Fimi ve ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131 kay\u0131tlar\u0131na i\
tiraz yok). Kay\u0131t {g} g\xFCn sonra eski say\u0131l\u0131r.",{n:sayi(r.window_h),g:sayi(r.old_days)})}</p>
      </section>`}function scAvukatKarti(){const r=sc.rule,l=sc.lawyer,b=l.block,davalar=sc.lawyer_cases??[],satir=a=>{const bekler=a.status==="lawyer_pending"&&a.lawyer?.status==="invited"&&Date.parse(
a.lawyer?.expires_at)>Date.now(),alt=bekler?`${\u00E7("Yan\u0131t s\xFCresi: kalan")} <b data-bitis="${esc(a.lawyer.expires_at)}"></b>`:a.status==="preparing"?`${\u00E7("Savunma haz\u0131rlan\u0131yor; biti\u015F")}\
 <b data-bitis="${esc(a.lawyer.defense_ends_at)}"></b>`:scKarar(a)&&a.lawyer?.status==="accepted"?\u00E7("\xDCcretin ({kr} kredi) hesab\u0131na ge\xE7ti.",{kr:kr(a.lawyer.fee_cr)}):a.status==="withdra\
wn"&&a.lawyer?.status==="accepted"?\u00E7("M\xFCvekkil vazge\xE7ti; savunman\u0131n \xFCcreti \xF6dendi."):esc(SC_AVUKAT[a.lawyer?.status]??"");return`<div class="liste-satir" data-sc-dava="${esc(a.appeal_id)}\
">
          <span class="liste-ikon ${a.status==="acquitted"?"yesil":a.status==="upheld"?"mercan":""}">${ikon(SC_TUR_IKON[a.kind]??"scale")}</span>
          <div><span class="tur">${esc(SC_DAVA[a.status]??a.status)} \xB7 ${esc(ulkeAdi(a.country_id))}</span>
            <b>${esc(a.appellant?.name??"")} \xB7 ${esc(SC_TUR[a.kind]??a.kind)}</b>
            <div class="alt">${\u00E7("\xDCcret {kr} kredi",{kr:kr(a.lawyer?.fee_cr??0)})} \xB7 ${alt}</div></div>
          ${bekler?`<span class="satir" style="gap:6px"><button class="dugme kucuk-d" data-sc-kabul="${esc(a.appeal_id)}" ${b?"disabled":""}>${\u00E7("Kabul et")}</button>
            <button class="dugme sade kucuk-d" data-sc-reddet="${esc(a.appeal_id)}">${\u00E7("Reddet")}</button></span>`:"<span></span>"}
          ${a.status==="preparing"?`<div class="cubuk deniz" style="grid-column:1/-1"><i data-ilerleme="${esc(a.lawyer.defense_starts_at)}|${esc(a.lawyer.defense_ends_at)}"></i></div>`:""}
        </div>`};return`<section class="kart" id="sc-avukat">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Meslek")}</p><h2 class="b2">${\u00E7("Avukatl\u0131k")}</h2></div><span class="ik-kutu">${ikon("briefcase-business")}</span></div>
        ${b?`<div class="yasa-bant uyari">${ikon(SC_ENGEL_IKON[b.code]??"clock")}<span>${esc(scEngelMetni(b))}</span></div>`:""}
        <div class="bilgi-izgara">
          <div><small>${\u00E7("Defter")}</small><b>${l.registered&&l.active?\u00E7("dava al\u0131yorsun"):l.registered?\u00E7("dava alm\u0131yorsun"):\u00E7("yaz\u0131l\u0131 de\u011Filsin")}</b></di\
v>
          <div><small>${\u00E7("\xDCcretin")}</small><b>${l.registered?\u00E7("{kr} kredi",{kr:kr(l.fee_cr)}):"\u2014"}</b></div>
          <div><small>${\u00E7("Y\xF6netim becerin")}</small><b>${sayi(l.skill)}</b></div>
          <div><small>${\u00E7("Karara ba\u011Flanm\u0131\u015F davan")}</small><b>${sayi(l.cases)}</b></div>
          <div><small>${\u00E7("Elindeki dava")}</small><b>${\u00E7("{n}/{en}",{n:sayi(l.open_cases),en:sayi(r.max_open_cases_per_lawyer)})}</b></div>
        </div>
        <div class="satir" style="gap:8px;flex-wrap:wrap;margin-top:12px">
          <button class="dugme ${l.registered&&l.active?"ikincil":"altin"}" id="sc-avukat-yaz" ${(!l.registered||!l.active)&&b?"disabled":""}>${ikon("briefcase-business")}${l.registered&&l.active?\u00E7(
"\xDCcreti de\u011Fi\u015Ftir"):\u00E7("Defterine yaz\u0131l")}</button>
          ${l.registered&&l.active?`<button class="dugme sade" id="sc-avukat-cik">${ikon("x")}${\u00E7("Defterden \xE7\u0131k")}</button>`:""}
        </div>
        ${davalar.length?`<div class="liste" style="margin-top:12px">${davalar.map(satir).join("")}</div>`:""}
        <p class="kucuk" style="margin-top:8px">${\u00E7("\xC7a\u011Fr\u0131y\u0131 {n} saat i\xE7inde kabul edersen {dk} dakikal\u0131k savunma haz\u0131rlars\u0131n (g\xFCnl\xFCk \xE7al\u0131\u015Fma s\u0131n\u0131r\u0131na say\u0131l\u0131r). \xDCcret dava karara ba\u011Flan\u0131nca hesab\
\u0131na ge\xE7er; sonu\xE7 ne olursa olsun.",{n:sayi(r.lawyer_wait_h),dk:sayi(r.unit_minutes)})}</p>
      </section>`}function scYargicKarti(){const r=sc.rule,c=sc.court,b=c.block,q=c.queue,durusmalar=c.hearings??[],satir=a=>`<div class="liste-satir" data-sc-durusma="${esc(a.appeal_id)}">
          <span class="liste-ikon ${a.status==="acquitted"?"yesil":a.status==="upheld"?"mercan":""}">${ikon("gavel")}</span>
          <div><span class="tur">${esc(SC_DAVA[a.status]??a.status)} \xB7 ${esc(saatYaz(a.hearing_starts_at))}</span>
            <b>${esc(SC_TUR[a.kind]??a.kind)} \xB7 ${a.lawyer?.present?\u00E7("avukatl\u0131"):\u00E7("avukats\u0131z")}</b>
            <div class="alt">${\u00E7("Beraat ihtimali {ihtimal} \xB7 \xFCcretin {kr} kredi",{ihtimal:esc(ppmYuzde(a.chance_ppm)),kr:kr(a.judge_wage_cr??0)})}
              ${a.status==="hearing"?` \xB7 ${\u00E7("karar")} <b data-bitis="${esc(a.hearing_ends_at)}"></b>`:""}</div></div><span></span></div>`;return`<section class="kart" id="sc-yargic">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Meslek")}</p><h2 class="b2">${\u00E7("Yarg\u0131\xE7l\u0131k \xB7 {ulke}",{ulke:ulkeAdi(c.country_id)})}</h2></div><span class="ik-kutu\
">${ikon("gavel")}</span></div>
        ${b?`<div class="yasa-bant uyari">${ikon(SC_ENGEL_IKON[b.code]??"clock")}<span>${esc(scEngelMetni(b))}</span></div>`:""}
        <div class="bilgi-izgara">
          <div><small>${\u00E7("S\u0131rada bekleyen dosya")}</small><b>${sayi(q.ready)}</b></div>
          <div><small>${\u00E7("En eski dosya")}</small><b>${q.oldest_ready_at?esc(saatYaz(q.oldest_ready_at)):"\u2014"}</b></div>
          <div><small>${\u00E7("Duru\u015Fma ba\u015F\u0131na \xFCcret")}</small><b>${\u00E7("{kr} kredi",{kr:kr(r.judge_wage_cr)})}</b></div>
          <div><small>${\u00E7("Bakt\u0131\u011F\u0131n dava")}</small><b>${sayi(c.cases)}</b></div>
        </div>
        <div class="satir" style="gap:8px;flex-wrap:wrap;margin-top:12px">
          <button class="dugme altin" id="sc-dosya-al" ${b||!Number(q.ready)?"disabled":""}>${ikon("gavel")}${\u00E7("S\u0131radaki dosyay\u0131 al")}</button>
        </div>
        ${durusmalar.length?`<div class="liste" style="margin-top:12px">${durusmalar.map(satir).join("")}</div>`:""}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Dosya se\xE7ilmez: mahkeme s\u0131radaki en eski dosyay\u0131 verir; taraf\u0131 ya da taraflar\u0131n arkada\u015F\u0131 oldu\u011Fun dosya atlan\u0131r. Kimli\u011Fin taraflara g\xF6r\xFCnmez. S\
onucu sen se\xE7mezsin: ihtimal dosyay\u0131 al\u0131nca kilitlenir, karar duru\u015Fma bitince gizli zarla gelir.")}</p>
      </section>`}function scKuralKarti(){const r=sc.rule,e=r.evidence_ppm;return`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Nas\u0131l i\u015Fler?")}</p><h2 class="b2">${\u00E7("Sicilin ve itiraz\u0131n kurallar\u0131")}</h2></div><span class="ik-kutu">${ikon(
"scale")}</span></div>
        <div class="yigin" style="gap:8px">
          <p class="aciklama">${\u00E7("Ka\xE7ak\xE7\u0131l\u0131k, kara borsa ve vurgundaki mahk\xFBmiyetler siciline yaz\u0131l\u0131r; sicilini yaln\u0131z sen g\xF6r\xFCrs\xFCn. Son {n} g\xFCnde itirazla bozulmam\u0131\u015F mahk\xFBmiyetin varsa aday ola\
maz, kolluk n\xF6beti tutamaz, avukat ya da yarg\u0131\xE7 olamazs\u0131n. {g} g\xFCnden eski kay\u0131t eski say\u0131l\u0131r.",{n:sayi(r.block_days),g:sayi(r.old_days)})}</p>
          <p class="aciklama">${\u00E7("\u0130tiraz mahk\xFBmiyetten sonra {n} saat i\xE7inde, seni mahk\xFBm eden \xFClkenin mahkemesine yap\u0131l\u0131r. Har\xE7 {kr} kredi, o \xFClkenin hazinesine gider ve geri verilmez.",
{n:sayi(r.window_h),kr:kr(r.fee_cr)})}</p>
          <p class="aciklama">${\u00E7("\u0130stersen avukat defterinden bir avukat se\xE7ersin: \xFCcreti itirazda ayr\u0131l\u0131r, avukat {n} saat i\xE7inde kabul edip {dk} dakikal\u0131k savunma haz\u0131rlar; \xFCcret dava karara b\
a\u011Flan\u0131nca avukata ge\xE7er. Reddederse ya da s\xFCresinde yan\u0131t vermezse \xFCcret sana d\xF6ner, dosya avukats\u0131z s\xFCrer; ba\u015Fka avukat \xE7a\u011F\u0131rabilirsin.",{n:sayi(r.
lawyer_wait_h),dk:sayi(r.unit_minutes)})}</p>
          <p class="aciklama">${\u00E7("Haz\u0131r dosyay\u0131 mahkemenin bir yarg\u0131c\u0131 s\u0131rayla al\u0131r; \xFCcreti ({kr} kredi) hazineden \xF6denir ve {dk} dakikal\u0131k duru\u015Fma yapar. Yarg\u0131\xE7 {s} saat i\xE7inde \xE7\u0131kmazsa sistem \
karar verir.",{kr:kr(r.judge_wage_cr),dk:sayi(r.unit_minutes),s:sayi(r.judge_wait_h)})}</p>
          <p class="aciklama">${\u00E7("Beraat ihtimali: kayd\u0131n t\xFCr\xFCne g\xF6re taban (ka\xE7ak\xE7\u0131l\u0131k {a}, kara borsa {b}, vurgun {c}); avukat {l}, avukat\u0131n y\xF6netim becerisinin her seviyesi {ls}, karara ba\u011Fla\
nm\u0131\u015F her davas\u0131 {lc} (en \xE7ok {lm}); yarg\u0131c\u0131n y\xF6netim becerisinin her seviyesi {j}. En az {min}, en \xE7ok {max}. Sonucu sunucunun gizli zar\u0131 verir.",{a:ppmYuzde(e.smuggling),
b:ppmYuzde(e.black_market_sell),c:ppmYuzde(e.heist),l:ppmYuzde(r.lawyer_ppm),ls:ppmYuzde(r.lawyer_skill_ppm_per_level),lc:ppmYuzde(r.lawyer_case_ppm),lm:ppmYuzde(r.lawyer_case_max_ppm),j:ppmYuzde(r.judge_skill_ppm_per_level),
min:ppmYuzde(r.min_ppm),max:ppmYuzde(r.max_ppm)})}</p>
          <p class="aciklama">${\u00E7("Beraat sicil kayd\u0131n\u0131 bozar; ceza ve g\xF6zalt\u0131 geri verilmez.")}</p>
          <p class="aciklama">${\u00E7("Avukatl\u0131k i\xE7in y\xF6netim becerisi en az {a}, yarg\u0131\xE7l\u0131k i\xE7in en az {j}; hesab\u0131n en az {saat} saatlik olmal\u0131, en az {is} i\u015F birimi tamamlam\u0131\u015F olmal\u0131s\u0131n. Yarg\u0131\xE7 yaln\
\u0131z kendi \xFClkesinin bir b\xF6lgesinde dosya al\u0131r.",{a:sayi(r.lawyer_min_skill),j:sayi(r.judge_min_skill),saat:sayi(r.min_account_age_h),is:sayi(r.min_work_units)})}</p>
        </div>
      </section>`}async function scItirazFormu(kayit){let liste;try{liste=await Sunucu.cagir("lawyers")}catch(e){tost(hataMetni(e),"circle-alert");return}const x=sc.records.find(y=>String(y.record_id)===
String(kayit));x&&pencereForm({ust:\u00E7("\u0130tiraz"),baslik:\u00E7("{tur} \xB7 {ulke}",{tur:SC_TUR[x.kind]??x.kind,ulke:ulkeAdi(x.country_id)}),onayAd:\u00E7("Teklifi g\xF6r"),onayIkon:"calculator",
govde:`<p class="aciklama">${\u00E7("Bir avukat se\xE7ersen \xFCcreti itirazda ayr\u0131l\u0131r; avukats\u0131z da itiraz edebilirsin.")}</p>
          <div class="radyo-liste">
            <label class="radyo"><input type="radio" name="avukat" value="" checked><span><b>${\u00E7("Avukats\u0131z")}</b><span class="kucuk">${\u00E7("yaln\u0131z har\xE7")}</span></span></label>
            ${liste.map(l=>`<label class="radyo"><input type="radio" name="avukat" value="${esc(l.character_id)}">
              <span><b>${esc(l.name)}</b><span class="kucuk">${\u00E7("\xFCcret {kr} kredi \xB7 beceri {s} \xB7 {n} dava \xB7 {u}",{kr:kr(l.fee_cr),s:sayi(l.skill),n:sayi(l.cases),u:ulkeAdi(l.country_id)})}\
</span></span></label>`).join("")}
          </div>
          ${liste.length?"":`<p class="kucuk">${\u00E7("\u015Eu an dava alan avukat yok.")}</p>`}`,is:async d=>{const avukat=d.get("avukat")||null,q=await Sunucu.cagir("appeal_quote",{p_record:Number(
kayit),p_lawyer:avukat});if(q.blocked)throw new Error(sunucuIletisi(q.blocked.code,q.blocked.hint)+(q.blocked.need_cr!=null?" "+\u00E7("Gereken: {kr} kredi.",{kr:kr(q.blocked.need_cr)}):""));setTimeout(
()=>scItirazOnayi(q,kayit,avukat),0)}})}function scItirazOnayi(q,kayit,avukat){pencere({ust:\u00E7("\u0130tiraz \xB7 teklif"),baslik:\u00E7("{tur} \xB7 {ulke} mahkemesi",{tur:SC_TUR[q.kind]??q.kind,ulke:ulkeAdi(
q.country_id)}),govde:`
          <div class="bilgi-izgara">
            <div><small>${\u00E7("Har\xE7 (hazineye)")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.fee_cr)})}</b></div>
            <div><small>${\u00E7("Avukat")}</small><b>${q.lawyer?esc(q.lawyer.name):\u00E7("avukats\u0131z")}</b></div>
            <div><small>${\u00E7("Avukat \xFCcreti (ayr\u0131l\u0131r)")}</small><b>${q.lawyer?\u00E7("{kr} kredi",{kr:kr(q.lawyer.fee_cr)}):"\u2014"}</b></div>
            <div><small>${\u00E7("Toplam gereken")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.need_cr)})}</b></div>
          </div>
          <p class="kucuk">${\u00E7("Yarg\u0131\xE7 hari\xE7 beraat ihtimali:")}</p>
          ${scIhtimalParcalari(q.chance)}
          ${q.lawyer?`<p class="kucuk">${\u00E7("Avukats\u0131z: {ihtimal}.",{ihtimal:esc(ppmYuzde(q.chance_without_lawyer.ppm))})}</p>`:""}
          <p class="aciklama">${\u00E7("Yarg\u0131\xE7 dosyay\u0131 al\u0131nca becerisi ihtimale eklenir; yarg\u0131\xE7 \xE7\u0131kmazsa sistem yarg\u0131\xE7 pay\u0131 olmadan karar verir. Har\xE7 geri verilmez; beraatte ceza ve g\xF6zalt\u0131 da geri ve\
rilmez, yaln\u0131z sicil kayd\u0131n bozulur.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\u0130tiraz et"),sinif:"altin",ikon:"scale",is:async()=>{try{await Sunucu.yap("appeal_file",{p_record:Number(
kayit),p_lawyer:avukat,p_expected_lawyer_fee:q.lawyer?q.lawyer.fee_cr:null}),tost(q.lawyer?\u00E7("\u0130tiraz edildi; avukat\u0131n yan\u0131t\u0131 bekleniyor."):\u00E7("\u0130tiraz edildi; dosyan mahkem\
ede s\u0131rada."),"scale"),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}}]})}async function scAvukatCagirFormu(id){let liste;try{liste=await Sunucu.cagir("lawy\
ers")}catch(e){tost(hataMetni(e),"circle-alert");return}if(!liste.length){tost(\u00E7("\u015Eu an dava alan avukat yok."),"briefcase-business");return}pencereForm({ust:\u00E7("\u0130tiraz"),baslik:\u00E7(
"Avukat \xE7a\u011F\u0131r"),onayAd:\u00E7("\xC7a\u011F\u0131r"),onayIkon:"user-round-plus",govde:`<p class="aciklama">${\u00E7("\xDCcret \xE7a\u011F\u0131r\u0131rken ayr\u0131l\u0131r; avukat reddederse ya da s\xFCresinde yan\u0131t verme\
zse sana d\xF6ner.")}</p>
          <div class="radyo-liste">${liste.map((l,i)=>`<label class="radyo"><input type="radio" name="avukat" value="${esc(l.character_id)}|${Number(l.fee_cr)}" ${i===0?"checked":""}>
            <span><b>${esc(l.name)}</b><span class="kucuk">${\u00E7("\xFCcret {kr} kredi \xB7 beceri {s} \xB7 {n} dava \xB7 {u}",{kr:kr(l.fee_cr),s:sayi(l.skill),n:sayi(l.cases),u:ulkeAdi(l.country_id)})}\
</span></span></label>`).join("")}</div>`,is:async d=>{const[avukat,ucret]=String(d.get("avukat")).split("|");await Sunucu.yap("appeal_lawyer_invite",{p_appeal:id,p_lawyer:avukat,p_expected_fee:Number(
ucret)}),tost(\u00E7("Avukat \xE7a\u011Fr\u0131ld\u0131; \xFCcreti ayr\u0131ld\u0131."),"user-round-plus"),Durum.ozet().catch(()=>{}),tazele()}})}function scVazgec(id){pencere({ust:\u00E7("\u0130tiraz"),
baslik:\u00E7("\u0130tirazdan vazge\xE7"),govde:`<p class="aciklama">${\u00E7("Har\xE7 geri verilmez. Avukat \xE7a\u011Fr\u0131y\u0131 hen\xFCz kabul etmediyse ayr\u0131lan \xFCcret sana d\xF6ner; savunmas\u0131n\u0131 haz\u0131rlad\u0131ysa \xFCcreti avukat\
a ge\xE7er. Bu kayda yeniden itiraz edemezsin.")}</p>`,dugmeler:[{ad:\u00E7("\u0130tiraz kals\u0131n")},{ad:\u00E7("Vazge\xE7"),sinif:"mercan",ikon:"x",is:async()=>{try{await Sunucu.yap("appeal_withdr\
aw",{p_appeal:id}),tost(\u00E7("\u0130tirazdan vazge\xE7tin."),"x"),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}}]})}async function scYanit(id,kabul){try{await Sunucu.
yap("appeal_lawyer_respond",{p_appeal:id,p_accept:kabul}),tost(kabul?\u00E7("Davay\u0131 kabul ettin; savunmay\u0131 haz\u0131rl\u0131yorsun."):\u00E7("\xC7a\u011Fr\u0131y\u0131 reddettin."),kabul?"br\
iefcase-business":"x")}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}function scAvukatFormu(){const r=sc.rule,l=sc.lawyer;pencereForm({ust:\u00E7("Avukatl\u0131k"),baslik:l.registered&&l.active?
\u00E7("\xDCcreti de\u011Fi\u015Ftir"):\u00E7("Avukat defterine yaz\u0131l"),onayAd:\u00E7("Kaydet"),onayIkon:"briefcase-business",govde:`<p class="aciklama">${\u00E7("\u0130tiraz eden seni defterden se\xE7er\
 ve bu \xFCcreti \xF6der; \xFCcret dava karara ba\u011Flan\u0131nca hesab\u0131na ge\xE7er.")}</p>
          <label class="alan"><span>${\u00E7("\xDCcretin (kredi)")}</span><input name="ucret" inputmode="decimal" required value="${l.registered?esc(krediGirdi(l.fee_cr)):""}" placeholder="${\u00E7("\xF6\
r. 5")}">
            <small>${\u00E7("0\u2013{kr} kredi; \xFCcretsiz de olabilir.",{kr:kr(r.lawyer_max_fee_cr)})}</small></label>`,is:async d=>{const metin=String(d.get("ucret")??"").trim(),ucret=metin==="0"?0:
krediAlt(metin);if(!(ucret>=0)||ucret>Number(r.lawyer_max_fee_cr))throw new Error(\u00E7("\xDCcreti 0\u2013{kr} kredi aras\u0131nda yaz.",{kr:kr(r.lawyer_max_fee_cr)}));await Sunucu.yap("lawyer_set",{
p_fee:ucret,p_active:!0}),tost(\u00E7("Avukat defterindesin; \xFCcretin {kr} kredi.",{kr:kr(ucret)}),"briefcase-business"),tazele()}})}async function scAvukatCik(){try{await Sunucu.yap("lawyer_set",{p_fee:Number(
sc.lawyer.fee_cr??0),p_active:!1}),tost(\u00E7("Avukat defterinden \xE7\u0131kt\u0131n; elindeki davalar s\xFCrer."),"x")}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}async function scDosyaAl(){
try{const a=await Sunucu.yap("court_take");tost(\u00E7("Dosyay\u0131 ald\u0131n: {tur}; \xFCcretin {kr} kredi. Karar {zaman}.",{tur:SC_TUR[a.kind]??a.kind,kr:kr(a.judge_wage_cr??0),zaman:saatYaz(a.hearing_ends_at)}),
"gavel"),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}function scBekle(){if(clearTimeout(scBekleT),!(sc&&[...scKendi(),...sc.lawyer_cases??[],...sc.court.hearings??
[]].some(a=>a.status==="preparing"&&Date.parse(a.lawyer?.defense_ends_at)<=Date.now()||a.status==="hearing"&&Date.parse(a.hearing_ends_at)<=Date.now()))){scSayac.n=0;return}scBekleT=setTimeout(()=>{kap.
isConnected&&!kapandi&&tazele()},gecikmeli(scSayac))}function vgBekle(){if(clearTimeout(vgBekleT),!vg||!vg.heists.some(x=>x.status==="planning"&&vgSaatiGecti(x))){vgSayac.n=0;return}vgBekleT=setTimeout(
()=>{kap.isConnected&&!kapandi&&tazele()},gecikmeli(vgSayac))}function sekmeler(){if(!k&&!p&&!vg&&!sc)return"";const b=(id,ad,ik)=>`<button class="altsekme" role="tab" data-golge-sekme="${id}" aria-pr\
essed="${sekme===id}">${ikon(ik)}${esc(ad)}</button>`;return`<div class="akis-suzgec" role="tablist">${b("kacak",\u00E7("Ka\xE7ak\xE7\u0131l\u0131k"),"truck")}${k?b("kara",\u00E7("Kara borsa"),"store"):
""}${vg?b("vurgun",\u00E7("Vurgun"),"target"):""}${p?b("kolluk",\u00E7("Kolluk"),"id-card"):""}${sc?b("sicil",\u00E7("Sicil"),"scale"):""}</div>`}function ciz(){if(durdur(),clearInterval(karakolSaat),
clearTimeout(vgBekleT),clearTimeout(scBekleT),sekme==="sicil"&&sc){sinirBirak(),karakolBirak(),masaBirak(),kap.innerHTML=`<div class="sayfa sayfa-dar">
          <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${\u00E7("G\xF6lge")}</h1>
            <p class="aciklama">${\u00E7("Sicilini yaln\u0131z sen g\xF6r\xFCrs\xFCn. Mahk\xFBmiyete itiraz edebilir, avukat tutabilirsin; avukat ya da yarg\u0131\xE7 olarak da \xE7al\u0131\u015Fabilirsin. Sonucu hi\xE7bir oyuncu se\xE7mez: ber\
aat ihtimali ba\u015Ftan g\xF6r\xFCn\xFCr, karar\u0131 sunucunun gizli zar\u0131 verir.")}</p></div></div>
          ${sekmeler()}
          <div style="margin-top:12px">${mahkemeKarti()}</div>
          <div class="izgara iki" style="margin-top:12px">
            ${scKayitKarti()}
            ${scAvukatKarti()}
          </div>
          <div class="yigin" style="margin-top:20px">
            ${scYargicKarti()}
            ${scKuralKarti()}
          </div>
        </div>`,bagla(),mahkemeBagla(),durdur=geriSay(kap,()=>tazele()),scBekle();return}if(mahkemeBirak(),sekme==="vurgun"&&vg){sinirBirak(),karakolBirak();const planlar=vgPlanlar();kap.innerHTML=`<d\
iv class="sayfa sayfa-dar">
          <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${\u00E7("G\xF6lge")}</h1>
            <p class="aciklama">${\u00E7("Arkada\u015Flar\u0131nla \u015Fehrin g\xFCnl\xFCk hedefine vurgun planlars\u0131n. Hedef kurgusald\u0131r; hi\xE7bir oyuncunun paras\u0131na ya da mal\u0131na dokunulmaz. Ba\u015Far\u0131 ihtimalini ba\u015Ftan g\xF6r\xFCrs\
\xFCn; sonucu vurgun saatinde sunucunun gizli zar\u0131 belirler.")}</p></div></div>
          ${sekmeler()}
          ${v.detention?`<div style="margin-top:12px">${gozaltiKarti(v.detention)}</div>`:""}
          ${masaVurgun()||vgHedefVar()?`<div style="margin-top:12px">${masaKarti()}</div>`:""}
          <div class="izgara iki" style="margin-top:12px">
            ${planlar[0]?vgPlanKarti(planlar[0]):vgHedefKarti()}
            ${vg.invites.length?vgCagriKarti():vgGecmisKarti()}
          </div>
          <div class="yigin" style="margin-top:20px">
            ${planlar.slice(1).map(vgPlanKarti).join("")}
            ${planlar[0]?vgHedefKarti():""}
            ${vg.invites.length?vgGecmisKarti():""}
            ${vgKuralKarti()}
          </div>
        </div>`,bagla(),masaBagla(),durdur=geriSay(kap,()=>tazele()),vgBekle();return}if(masaBirak(),sekme==="kolluk"&&p){sinirBirak(),kap.innerHTML=`<div class="sayfa sayfa-dar">
          <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${\u00E7("G\xF6lge")}</h1>
            <p class="aciklama">${\u00E7("\xDClkenin kolluk n\xF6betini tutars\u0131n: polis bulundu\u011Fun b\xF6lgenin kara borsas\u0131n\u0131, jandarma bu b\xF6lgeye gelen ka\xE7ak y\xFCk\xFC denetler. Maa\u015F n\xF6bet ba\u015F\u0131nda hazineden \xF6denir\
; yakalanan\u0131n cezas\u0131ndan prim al\u0131rs\u0131n.")}</p></div></div>
          ${sekmeler()}
          <div style="margin-top:12px">${karakolKarti()}</div>
          ${v.detention?`<div style="margin-top:12px">${gozaltiKarti(v.detention)}</div>`:""}
          <div class="izgara iki" style="margin-top:12px">
            ${klNobetKarti()}
            ${klButceKarti()}
          </div>
          <div class="yigin" style="margin-top:20px">
            ${klGecmisKarti()}
            ${klKuralKarti()}
          </div>
        </div>`,bagla(),karakolBagla(),durdur=geriSay(kap,()=>tazele());return}if(karakolBirak(),sekme==="kara"&&k){sinirBirak(),kap.innerHTML=`<div class="sayfa sayfa-dar">
          <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${\u00E7("G\xF6lge")}</h1>
            <p class="aciklama">${\u00E7("Bulundu\u011Fun b\xF6lgenin kara borsas\u0131nda vergisiz al\u0131p satars\u0131n. Her al\u0131mda denetim ihtimali vard\u0131r ve almadan g\xF6r\xFCn\xFCr; yakalan\u0131rsa al\u0131nan mala el konur, iki taraf\
 da ceza \xF6der.")}</p></div></div>
          ${sekmeler()}
          <div id="sokak-yer"></div>
          ${v.detention?`<div style="margin-top:12px">${gozaltiKarti(v.detention)}</div>`:""}
          <div class="izgara iki" style="margin-top:12px">
            ${kbDurumKarti()}
            ${kbDefterKarti()}
          </div>
          <div class="yigin" style="margin-top:20px">
            ${kbBenimKarti()}
            ${kbGecmisKarti()}
            ${kbKuralKarti()}
          </div>
        </div>`,$("#sokak-yer",kap)?.replaceWith(sokak.el),sokak.yaz({k,nabiz,run:v.run}),bagla(),durdur=geriSay(kap,()=>tazele());return}kap.innerHTML=`<div class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${\u00E7("G\xF6lge")}</h1>
          <p class="aciklama">${\u00E7("Sava\u015F b\xF6lgesindeki kara al\u0131c\u0131ya mal g\xF6t\xFCr\xFCrs\xFCn; vard\u0131\u011F\u0131n b\xF6lge ba\u015Fka bir \xFClkenin oldu\u011Fundan onun g\xFCmr\xFC\u011F\xFCnden ge\xE7ersin. Yakalanma ihtimalini yola \xE7\u0131kmadan g\xF6r\xFCrs\
\xFCn; yakalan\u0131rsan mal ve ceza o \xFClkenin hazinesine ge\xE7er, g\xF6zalt\u0131na al\u0131n\u0131rs\u0131n.")}</p></div></div>
        ${sekmeler()}
        <div class="izgara iki"${k||p?' style="margin-top:12px"':""}>
          ${v.detention?gozaltiKarti(v.detention):durumKarti()}
          ${v.run?sevkiyatKarti(v.run):gecmisKarti()}
        </div>
        <div class="yigin" style="margin-top:20px">
          ${sinirSevkiyat()?sinirKarti(sinirSevkiyat()):""}
          ${bolgelerKarti()}
          ${v.run?gecmisKarti():""}
          ${v.detention?durumKarti():""}
          ${kuralKarti()}
        </div>
      </div>`,bagla(),sinirBagla(),durdur=geriSay(kap,()=>v.run?varis():tazele())}function bagla(){for(const b of $$("[data-golge-sekme]",kap))b.onclick=()=>{if(sekme!==b.dataset.golgeSekme){sekme=b.dataset.
golgeSekme;try{sessionStorage.setItem("civora.golge",sekme)}catch{}ciz(),tazele()}};$("#kb-ilan",kap)?.addEventListener("click",kbIlanFormu);for(const b of $$("[data-sc-itiraz]",kap))b.onclick=()=>scItirazFormu(
b.dataset.scItiraz);for(const b of $$("[data-sc-avukat-cagir]",kap))b.onclick=()=>scAvukatCagirFormu(b.dataset.scAvukatCagir);for(const b of $$("[data-sc-vazgec]",kap))b.onclick=()=>scVazgec(b.dataset.
scVazgec);for(const b of $$("[data-sc-kabul]",kap))b.onclick=()=>scYanit(b.dataset.scKabul,!0);for(const b of $$("[data-sc-reddet]",kap))b.onclick=()=>scYanit(b.dataset.scReddet,!1);$("#sc-avukat-yaz",
kap)?.addEventListener("click",scAvukatFormu),$("#sc-avukat-cik",kap)?.addEventListener("click",()=>pencere({ust:\u00E7("Avukatl\u0131k"),baslik:\u00E7("Defterden \xE7\u0131k"),govde:`<p class="acikla\
ma">${\u00E7("Yeni dava almazs\u0131n; elindeki davalar s\xFCrer. \u0130stedi\u011Fin zaman yeniden yaz\u0131labilirsin.")}</p>`,dugmeler:[{ad:\u00E7("Defterde kal")},{ad:\u00E7("\xC7\u0131k"),sinif:"\
mercan",ikon:"x",is:scAvukatCik}]})),$("#sc-dosya-al",kap)?.addEventListener("click",()=>pencere({ust:\u00E7("Yarg\u0131\xE7l\u0131k"),baslik:\u00E7("S\u0131radaki dosyay\u0131 al"),govde:`<p class="a\
ciklama">${\u00E7("Mahkeme s\u0131radaki en eski dosyay\u0131 verir. \xDCcretin ({kr} kredi) hazineden hemen \xF6denir; {dk} dakikal\u0131k duru\u015Fma \xE7izelgene yaz\u0131l\u0131r ve g\xFCnl\xFCk \xE7al\u0131\u015Fma s\u0131n\u0131r\u0131na say\u0131l\u0131r. Beraat ihtimali al\u0131\
nca kilitlenir; karar\u0131 duru\u015Fma bitince sunucunun gizli zar\u0131 verir.",{kr:kr(sc.rule.judge_wage_cr),dk:sayi(sc.rule.unit_minutes)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Do\
syay\u0131 al"),sinif:"altin",ikon:"gavel",is:scDosyaAl}]})),$("#mahkeme-mod",kap)?.addEventListener("click",()=>{mahkemeHata=!1,Gorunum.ayarla(mahkemeMod==="3b"?"2b":"3b"),tost(mahkemeMod==="3b"?\u00E7(
"Hafif g\xF6r\xFCn\xFCm (2B) se\xE7ildi. Ayarlar'dan de\u011Fi\u015Ftirebilirsin."):\u00E7("3B g\xF6r\xFCn\xFCm se\xE7ildi."),"layers")}),$("#vg-planla",kap)?.addEventListener("click",vgPlanFormu);for(const b of $$(
"[data-vg-cagir]",kap))b.onclick=()=>{const[id,rol]=b.dataset.vgCagir.split("|");vgCagirFormu(id,rol)};for(const b of $$("[data-vg-katil]",kap))b.onclick=()=>vgKatilOnayi(b.dataset.vgKatil);for(const b of $$(
"[data-vg-reddet]",kap))b.onclick=()=>vgReddet(b.dataset.vgReddet);for(const b of $$("[data-vg-kesif]",kap))b.onclick=()=>vgKesifFormu(b.dataset.vgKesif);for(const b of $$("[data-vg-ayril]",kap))b.onclick=
()=>pencere({ust:\u00E7("Vurgun"),baslik:\u00E7("Ekipten ayr\u0131l"),govde:`<p class="aciklama">${\u00E7("Ayr\u0131l\u0131rsan ceza pay\u0131n \xE7\xF6z\xFCl\xFCr ve vurgun saatindeki g\xF6revin kalkar. Planlayan seni yeniden \xE7a\u011F\
\u0131rabilir.")}</p>`,dugmeler:[{ad:\u00E7("Ekipte kal")},{ad:\u00E7("Ayr\u0131l"),sinif:"mercan",ikon:"door-open",is:()=>vgAyril(b.dataset.vgAyril)}]});for(const b of $$("[data-vg-iptal]",kap))b.onclick=
()=>pencere({ust:\u00E7("Vurgun"),baslik:\u00E7("Vurgunu iptal et"),govde:`<p class="aciklama">${\u00E7("B\xFCt\xFCn ekibin ceza pay\u0131 \xE7\xF6z\xFCl\xFCr, g\xF6revleri kalkar ve bekleyen \xE7a\u011Fr\u0131lar d\xFC\u015Fer.")}\
</p>`,dugmeler:[{ad:\u00E7("Vurgun kals\u0131n")},{ad:\u00E7("\u0130ptal et"),sinif:"mercan",ikon:"x",is:()=>vgIptal(b.dataset.vgIptal)}]});$("#masa-mod",kap)?.addEventListener("click",()=>{masaHata=!1,
Gorunum.ayarla(masaMod==="3b"?"2b":"3b"),tost(masaMod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCm (2B) se\xE7ildi. Ayarlar'dan de\u011Fi\u015Ftirebilirsin."):\u00E7("3B g\xF6r\xFCn\xFCm se\xE7ildi."),"layer\
s")});for(const b of $$("[data-kl-nobet]",kap))b.onclick=()=>klNobetFormu(b.dataset.klNobet);$("#karakol-mod",kap)?.addEventListener("click",()=>{karakolHata=!1,Gorunum.ayarla(karakolMod==="3b"?"2b":"\
3b"),tost(karakolMod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCm (2B) se\xE7ildi. Ayarlar'dan de\u011Fi\u015Ftirebilirsin."):\u00E7("3B g\xF6r\xFCn\xFCm se\xE7ildi."),"layers")});for(const b of $$("[data-kb\
-al]",kap))b.onclick=()=>kbAlFormu(b.dataset.kbAl);for(const b of $$("[data-kb-vazgec]",kap))b.onclick=()=>pencere({ust:\u00E7("Kara borsa"),baslik:\u00E7("\u0130landan vazge\xE7"),govde:`<p class="ac\
iklama">${\u00E7("Kalan mal\u0131n ve ayr\u0131lan ceza pay\u0131n sana d\xF6ner.")}</p>`,dugmeler:[{ad:\u00E7("\u0130lan kals\u0131n")},{ad:\u00E7("Vazge\xE7"),sinif:"mercan",ikon:"x",is:()=>kbVazgec(
b.dataset.kbVazgec)}]});for(const b of $$("[data-gotur]",kap))b.onclick=()=>goturFormu(b.dataset.gotur);$("#kefalet",kap)?.addEventListener("click",kefalet),$("#sinir-mod",kap)?.addEventListener("clic\
k",()=>{sinirHata=!1,Gorunum.ayarla(sinirMod==="3b"?"2b":"3b"),tost(sinirMod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCm (2B) se\xE7ildi. Ayarlar'dan de\u011Fi\u015Ftirebilirsin."):\u00E7("3B g\xF6r\xFCn\xFCm se\xE7ild\
i."),"layers")}),$("#geri-don",kap)?.addEventListener("click",()=>pencere({ust:\u00E7("Ka\xE7ak y\xFCk"),baslik:\u00E7("Geri d\xF6n"),govde:`<p class="aciklama">${\u00E7("\xC7\u0131kt\u0131\u011F\u0131n b\xF6lgede kal\u0131rs\u0131n; y\xFC\
k ve ceza pay\u0131 sende kal\u0131r, bilet geri gelmez.")}</p>`,dugmeler:[{ad:\u00E7("Yola devam")},{ad:\u00E7("Geri d\xF6n"),sinif:"mercan",ikon:"undo-2",is:geriDon}]}))}function goturFormu(hedef){const mallar=Object.
entries(v.rule.goods);pencereForm({ust:\u00E7("Ka\xE7ak y\xFCk"),baslik:bolgeAdi(hedef),onayAd:\u00E7("Teklifi g\xF6r"),onayIkon:"calculator",govde:`<p class="aciklama">${\u00E7("Kara al\u0131c\u0131n\u0131n birim f\
iyatlar\u0131 sabittir. Y\xFCk\xFC kendi sto\u011Fundan g\xF6t\xFCr\xFCrs\xFCn.")}</p>
          <div class="radyo-liste">${mallar.map(([a,fiyat],i)=>`<label class="radyo"><input type="radio" name="mal" value="${esc(a)}" ${i===0?"checked":""}>
            <span><b>${esc(varlikAdi(a))}</b><span class="kucuk">${\u00E7("birim {kr} kredi \xB7 sende {n}",{kr:kr(fiyat),n:sayi(Durum.stok(a))})}</span></span></label>`).join("")}</div>
          <label class="alan"><span>${\u00E7("Miktar")}</span><input name="miktar" inputmode="numeric" required placeholder="${\u00E7("\xF6r. 10")}"></label>`,is:async d=>{const mal=d.get("mal"),miktar=adetAl(
d.get("miktar"));if(!(miktar>0))throw new Error(\u00E7("Miktar\u0131 say\u0131 olarak yaz."));const q=await Sunucu.cagir("shadow_quote",{p_to:hedef,p_asset:mal,p_qty:miktar});if(q.blocked){const b=q.blocked,
ek=b.until?" "+\u00E7("Bekleme biti\u015Fi: {zaman}.",{zaman:saatYaz(b.until)}):b.need_units!=null?" "+\u00E7("Tamamlad\u0131\u011F\u0131n i\u015F birimi: {n}/{gerek}.",{n:sayi(b.work_units),gerek:sayi(
b.need_units)}):b.left_cr!=null?" "+\u00E7("Kalan: {kr} kredi.",{kr:kr(b.left_cr)})+(b.hits_today!=null?" "+\u00E7("Bug\xFCn bu sava\u015Fta {n} vuru\u015F at\u0131ld\u0131; her vuru\u015F kara al\u0131c\u0131ya para a\xE7ar.",
{n:sayi(b.hits_today)}):""):b.max_cr!=null?" "+\u00E7("S\u0131n\u0131r: {kr} kredi.",{kr:kr(b.max_cr)}):b.have!=null?" "+\u00E7("Sende {n} var.",{n:sayi(b.have)}):b.need_cr!=null?" "+\u00E7("Gereken: \
{kr} kredi.",{kr:kr(b.need_cr)}):"";throw new Error(sunucuIletisi(b.code,b.hint)+ek)}setTimeout(()=>teklifOnayi(q),0)}})}function teklifOnayi(q){pencere({ust:\u00E7("Ka\xE7ak y\xFCk \xB7 teklif"),baslik:\u00E7(
"{n} {urun} \u2192 {bolge}",{n:sayi(q.qty),urun:varlikAdi(q.asset),bolge:bolgeAdi(q.to)}),govde:`
          <div class="rota">${q.route.map(r=>`<span class="cip">${esc(bolgeAdi(r))}</span>`).join(ikon("arrow-right"))}</div>
          <div class="bilgi-izgara">
            <div><small>${\u00E7("Kara al\u0131c\u0131n\u0131n \xF6deyece\u011Fi")}</small><b>${\u00E7("{kr} kredi",{kr:kr(q.payout_cr)})}</b></div>
            <div><small>${\u00E7("G\xFCmr\xFCk")}</small><b>${esc(ulkeAdi(q.customs_country_id))}</b></div>
            <div><small>${\u00E7("S\xFCre ve bilet")}</small><b>${\u00E7("{n} dk \xB7 {kr} kredi",{n:Number(q.minutes),kr:kr(q.fee_cr)})}</b></div>
            <div><small>${\u00E7("Yakalan\u0131rsan")}</small><b>${\u00E7("{kr} kredi ceza, {n} saat g\xF6zalt\u0131",{kr:kr(q.fine_cr),n:Number(q.detention_h)})}</b></div>
          </div>
          <p class="kucuk">${esc(SIKILIK_AD[q.law.strictness]??"")} \xB7 ${esc(gumrukOzet(q.law,!1))}</p>
          ${ihtimalParcalari(q.catch)}
          <p class="aciklama">${\u00E7("Yola \xE7\u0131karken y\xFCk ve olas\u0131 ceza tutar\u0131 ayr\u0131l\u0131r, bilet \xF6denir. Sat\u0131l\u0131rsa ayr\u0131lan ceza geri d\xF6ner; yakalan\u0131rsan y\xFCk ve ceza {ulke} hazinesine ge\xE7er.",
{ulke:esc(ulkeAdi(q.customs_country_id))})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Yola \xE7\u0131k"),sinif:"altin",ikon:"truck",is:async()=>{try{const r=await Sunucu.yap("shadow_run_star\
t",{p_to:q.to,p_asset:q.asset,p_qty:q.qty,p_expected_payout:q.payout_cr,p_expected_catch_ppm:q.catch_ppm,p_expected_fee:q.fee_cr});tost(\u00E7("Ka\xE7ak y\xFCk yola \xE7\u0131kt\u0131. Var\u0131\u015F {zaman}.",
{zaman:saatYaz(r.arrives_at)}),"truck"),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert")}varisDeneme=0,await tazele()}}]})}async function kefalet(){try{await Sunucu.yap("bail_pay"),
tost(\u00E7("Kefaleti \xF6dedin; serbestsin."),"key-round"),Durum.ozet().catch(()=>{})}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}async function geriDon(){try{const r=await Sunucu.yap("\
travel_cancel");tost(r.status==="arrived"?\u00E7("Y\xFCk zaten varm\u0131\u015Ft\u0131; sonucu defterde."):\u00E7("Geri d\xF6nd\xFCn; y\xFCk sende kald\u0131."),"undo-2"),Durum.ozet().catch(()=>{})}catch(e){
tost(hataMetni(e),"circle-alert")}await tazele()}async function varis(){if(!(!v.run||varisDeneme>=6||!kap.isConnected)){varisDeneme++;try{await Sunucu.cagir("travel_arrive")}catch(e){e.kod!=="TRAVEL_N\
OT_DUE"&&e.kod!=="NOT_TRAVELING"&&tost(hataMetni(e),"circle-alert")}await tazele()}}const tazele=tazeleyici(async()=>{await yukle(),ciz()});await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^(shadow\.|detention\.|travel\.|black_market\.|police\.|heist\.|appeal\.)/.
test(olay)&&(varisDeneme=0,tazele())}),b2=Gorunum.dinle(()=>{const yeni=Gorunum.uc()&&!sinirHata?"3b":"2b",yeniKarakol=Gorunum.uc()&&!karakolHata?"3b":"2b",yeniMasa=Gorunum.uc()&&!masaHata?"3b":"2b",yeniMahkeme=Gorunum.
uc()&&!mahkemeHata?"3b":"2b";(yeni!==sinirMod||yeniKarakol!==karakolMod||yeniMasa!==masaMod||yeniMahkeme!==mahkemeMod)&&v&&(sinirMod=yeni,karakolMod=yeniKarakol,masaMod=yeniMasa,mahkemeMod=yeniMahkeme,
ciz())});return sokakSaat=setInterval(()=>{document.hidden||sekme!=="kara"||!k||Sunucu.cagir("city_pulse").then(x=>{kapandi||!x||(nabiz=x,sokak.yaz({k,nabiz,run:v.run}))}).catch(()=>{})},6e4),()=>{kapandi=
!0,durdur(),b1(),b2(),clearInterval(sinirSaat),clearInterval(karakolSaat),clearInterval(sokakSaat),clearTimeout(vgBekleT),clearTimeout(scBekleT),sinirBirak(),karakolBirak(),masaBirak(),mahkemeBirak(),
sokak.kapat()}}}),Parcalar.tamam("ek_39_golge");
