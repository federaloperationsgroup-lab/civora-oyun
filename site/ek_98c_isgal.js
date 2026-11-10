// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_98c_isgal.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("ulke/topraklar",{async ac(kap){let o=null,s=null,bakilan=isgBakilan;isgBakilan=null;try{const x=sessionStorage.getItem("civora.topraklar");x&&(bakilan??=x,sessionStorage.removeItem("civo\
ra.topraklar"))}catch{}let kapandi=!1,durdur=()=>{};const depo={varlik:"muhimmat@1",miktar:""},ben=()=>Durum.v.ozet?.character??{};async function yukle(){const[ov,h]=await Promise.all([Sunucu.cagir("o\
ccupation_overview"),Durum.harita().catch(()=>Durum.v.harita),Durum.ozet(),Durum.kurallar()]);if(o=ov,!bakilan){const yer=ben().location;bakilan=(h?.occupations??[]).some(([id])=>id===yer)||Number(h?.
damage?.[yer]??0)>0?yer:o.lost?.[0]?.occupation?.region_id??o.held?.[0]?.occupation?.region_id??yer??null}s=bakilan?await Sunucu.cagir("occupation_region",{p_region:bakilan}):null}const k=()=>s?.rule??
isgKural();function ozetKarti(){const ek=Number(o.extra??0),r=isgKural(),toplam=(o.held??[]).reduce((s2,x)=>s2+Number(x.occupation?.upkeep_cr??o.upkeep_per_region??0),0);return`<section class="kart" i\
d="isg-ozet" data-isg-tutulan="${o.held?.length??0}" data-isg-kaybedilen="${o.lost?.length??0}">
        <div class="kart-bas"><div>${ulkeUst(o.country_id,\u00E7("Topraklar"))}<h2 class="b2">${\u00E7("{n} b\xF6lge elimizde",{n:sayi(o.owned??0)})}</h2></div><span class="ik-kutu">${ikon("map-pin")}\
</span></div>
        <div class="bilgi-izgara">
          <div><small>${\u00E7("As\u0131l b\xF6lgelerimiz")}</small><b>${sayi(o.home??0)}</b></div>
          <div><small>${\u00E7("Fazladan b\xF6lge")}</small><b>${sayi(ek)}</b></div>
          <div><small>${\u00E7("B\xF6lge ba\u015F\u0131 g\xFCnl\xFCk bak\u0131m")}</small><b>${\u00E7("{kr} kr",{kr:kr(o.upkeep_per_region??0)})}</b></div>
          <div><small>${\u00E7("Hazine")}</small><b>${o.treasury_cr!=null?\u00E7("{kr} kr",{kr:kr(o.treasury_cr)}):"\u2014"}</b></div>
        </div>
        ${o.region_income?`<div class="yasa-bant" data-isg-gelir="${Number(o.region_income.income_cr)}" style="margin-bottom:8px">${ikon("coins")}<span>${\u00E7("B\xF6lgelerin g\xFCnl\xFCk geliri (son g\xFCn): {k\
r} kr, {n} b\xF6lgeden; {h} kr hazineye{b}.",{kr:kr(o.region_income.income_cr),n:sayi(o.region_income.regions),h:kr(o.region_income.treasury_cr),b:Number(o.region_income.region_cr)>0?\u00E7(", {kr} kr\
 \xF6zerk b\xF6lgelerin b\xFCt\xE7esine",{kr:kr(o.region_income.region_cr)}):""})}${Number(o.region_income.skipped)>0?" "+\u00E7("{n} b\xF6lge s\xF6z bozma y\xFCz\xFCnden gelir vermedi.",{n:sayi(o.region_income.
skipped)}):""}</span></div>`:""}
        ${o.exiled_at?`<div class="yasa-bant uyari" data-isg-surgun>${ikon("castle")}<span>${\u00E7("Devlet s\xFCrg\xFCnde: hi\xE7 topra\u011F\u0131m\u0131z kalmad\u0131. H\xFCk\xFCmet da\u011F\u0131ld\u0131; vatanda\u015Fl\u0131k ve partiler s\xFCrer. Bir b\xF6lge \
kurtulunca Kurucu Meclis se\xE7imiyle yeniden kurulur.")}</span></div>`:""}
        <p class="kucuk">${o.held?.length?\u00E7("Bug\xFCnk\xFC toplam i\u015Fgal bak\u0131m\u0131 {kr} kr ({n} b\xF6lge). Hazinede yoksa o g\xFCn \xF6denmez ve o b\xF6lgenin \xFCretim avantaj\u0131 kapan\u0131r.",
{kr:kr(toplam),n:sayi(o.held.length)}):\u00E7("Elimizde i\u015Fgal b\xF6lgesi yok; i\u015Fgal bak\u0131m\u0131 \xF6demiyoruz.")}${r&&ek>0?" "+\u00E7("Elimizdeki b\xF6lgeler as\u0131l b\xF6lgelerimizi {n} a\u015Ft\u0131\u011F\u0131 \
i\xE7in bak\u0131m taban {taban} kr'nin {oran} fazlas\u0131.",{n:sayi(ek),taban:kr(r.upkeep.baseCr),oran:ppmYuzde(Number(r.upkeep.extraPpm)*ek)}):""}</p>
      </section>`}function satir(x,tur){const io=x.occupation,d=x.resistance,[ad,sinif,ik]=d?drnDurum(d.status):[null,"",""];return`<button class="liste-satir" type="button" data-isg-sec="${esc(io.region_id)}\
" data-isg-tur="${tur}" ${io.region_id===bakilan?'aria-current="true"':""}>
        <span class="liste-ikon ${d?sinif:tur==="lost"?"mercan":"lacivert"}">${ikon(d?ik:tur==="lost"?"flame":"map-pin")}</span>
        <div><span class="tur">${tur==="lost"?\u00E7("{ulke} elinde",{ulke:esc(ulkeAdi(io.occupier_country_id))}):\u00E7("{ulke} topra\u011F\u0131",{ulke:esc(ulkeAdi(io.home_country_id))})}</span>
          <b>${esc(bolgeAdi(io.region_id))}</b>
          <div class="odul">${d?`<span data-isg-satir-direnis="${esc(d.status)}">${ikon(ik)}${esc(ad)}</span>`:""}${io.regime==="autonomous"?`<span data-isg-satir-bicim="autonomous">${ikon("landmark")}${\u00E7(
"\xF6zerk")}</span>`:""}${io.breach_until?`<span>${ikon("ban")}${\u00E7("s\xF6z bozma")}</span>`:""}${io.lapsed?`<span>${ikon("trending-down")}${\u00E7("bak\u0131m aks\u0131yor")}</span>`:""}${Number(
x.damage_ppm)>0?`<span>${ikon("hammer")}${\u00E7("hasar {n}",{n:ppmYuzde(x.damage_ppm)})}</span>`:""}${x.on_roll?`<span>${ikon("users-round")}${\u00E7("listedesin")}</span>`:""}</div></div>
        <span></span></button>`}function listeKarti(tur){const l=tur==="lost"?o.lost??[]:o.held??[];return l.length?`<section class="kart" id="isg-${tur==="lost"?"kaybedilen":"tutulan"}">
        <div class="kart-bas"><div><p class="ust-yazi">${tur==="lost"?\u00E7("\u0130\u015Fgal alt\u0131ndaki as\u0131l b\xF6lgelerimiz"):\u00E7("Elimizdeki i\u015Fgal b\xF6lgeleri")}</p>
          <h2 class="b2">${tur==="lost"?\u00E7("Kaybetti\u011Fimiz b\xF6lgeler"):\u00E7("\u0130\u015Fgal etti\u011Fimiz b\xF6lgeler")}</h2></div><span class="ik-kutu">${ikon(tur==="lost"?"flame":"cast\
le")}</span></div>
        <div class="yigin isg-liste" style="gap:4px">${l.map(x=>satir(x,tur)).join("")}</div>
        <p class="kucuk" style="margin-top:6px">${tur==="lost"?\u00E7("\u0130\u015Fgal alt\u0131ndaki b\xF6lgenin sakinleri yerel direni\u015Fle b\xF6lgeyi geri isteyebilir; \xFClkenin b\xFCt\xFCn vatanda\u015Flar\u0131 direni\u015F deposuna m\xFChimmat\
 ve lojistik koyabilir."):\u00E7("Her i\u015Fgal b\xF6lgesinin bak\u0131m\u0131 her g\xFCn hazineden d\xFC\u015Fer. Bak\u0131m \xF6denmezse b\xF6lgenin \xFCretim avantaj\u0131 kapan\u0131r; \xFC\xE7 g\xFCn \xFCst \xFCste \xF6denmezse yerel direni\u015Fin e\u015Fi\u011Fi d\xFC\u015Fer.")}\
</p>
      </section>`:""}function bolgeKarti(){const io=s.occupation,r=k(),koruma=s.war_protected_until&&Date.parse(s.war_protected_until)>Date.now(),vergi=s.tax_keep&&Date.parse(s.tax_keep.until)>Date.now(),
av=Object.entries(s.advantage??{}),gunler=io?.days??[];return`<section class="kart" id="isg-bolge" data-isg-bolge="${esc(s.region_id)}" data-isg-isgal="${io?"evet":"hayir"}">
        <div class="kart-bas"><div>${ulkeUst(io?io.home_country_id:s.owner_country_id,io?\u00E7("i\u015Fgal alt\u0131nda"):\u00E7("B\xF6lge"))}<h2 class="b2">${esc(bolgeAdi(s.region_id))}</h2></div>
          <span class="ik-kutu">${ikon(io?"flame":"map-pin")}</span></div>
        <p class="aciklama">${io?\u00E7("{asil} topra\u011F\u0131; {zaman} tarihinden beri {isgalci} elinde ({neden}).",{asil:esc(ulkeAdi(io.home_country_id)),zaman:esc(saatYaz(io.occupier_since??io.started_at)),
isgalci:esc(ulkeAdi(io.occupier_country_id)),neden:esc(ISG_NEDEN[io.start_reason]??"")}):\u00E7("B\xF6lge as\u0131l \xFClkesinin ({ulke}) elinde; i\u015Fgal yok.",{ulke:esc(ulkeAdi(s.home_country_id))})}\
</p>
        ${koruma?`<div class="yasa-bant" data-isg-koruma>${ikon("shield-half")}<span>${\u00E7("Sava\u015Fla yeni el de\u011Fi\u015Ftirdi: {zaman} tarihine kadar yeni kampanyaya kapal\u0131.",{zaman:esc(
saatYaz(s.war_protected_until))})} <b data-bitis="${esc(s.war_protected_until)}"></b></span></div>`:""}
        ${vergi?`<div class="yasa-bant" data-isg-vergi style="margin-top:6px">${ikon("percent")}<span>${\u00E7("{zaman} tarihine kadar b\xF6lgede yeni i\u015Flerde, pazar ilanlar\u0131nda ve ev sat\u0131\u015Flar\u0131nda {ulke}\
 vergi oranlar\u0131 ge\xE7erli: sat\u0131\u015F {s}, maa\u015F {m}.",{zaman:esc(saatYaz(s.tax_keep.until)),ulke:esc(ulkeAdi(s.tax_keep.country_id)),s:ppmYuzde(s.tax_keep.sales_tax_ppm??0),m:ppmYuzde(
s.tax_keep.wage_tax_ppm??0)})} <b data-bitis="${esc(s.tax_keep.until)}"></b></span></div>`:""}
        ${io?`<div class="bilgi-izgara">
            <div><small>${\u00E7("Direni\u015F listesi")}</small><b data-isg-liste="${Number(io.roll_size)}">${\u00E7("{n} ki\u015Fi",{n:sayi(io.roll_size)})}</b></div>
            <div><small>${\u00E7("G\xFCnl\xFCk bak\u0131m (i\u015Fgalciden)")}</small><b>${\u00E7("{kr} kr",{kr:kr(io.upkeep_cr??0)})}</b></div>
            <div><small>${\u00E7("Bak\u0131m")}</small><b data-isg-bakim="${io.unpaid_streak?"odenmiyor":"odeniyor"}">${io.unpaid_streak?\u00E7("{n} g\xFCnd\xFCr \xF6denmiyor",{n:sayi(io.unpaid_streak)}):
io.paid_streak?\u00E7("{n} g\xFCnd\xFCr \xF6deniyor",{n:sayi(io.paid_streak)}):\u00E7("\u0130lk g\xFCn: bak\u0131m yar\u0131ndan")}</b></div>
            <div><small>${\u00E7("\u0130kmal ba\u011Flant\u0131s\u0131")}</small><b>${io.supplied?\u00E7("Var"):\u00E7("Yok: avantaj kapal\u0131")}</b></div>
          </div>
          ${io.lapsed?`<div class="yasa-bant uyari" data-isg-aksadi>${ikon("trending-down")}<span>${\u00E7("\u0130\u015Fgalcinin bak\u0131m\u0131 {n} g\xFCnd\xFCr \xF6denmiyor: direni\u015F e\u015Fi\u011Fi listenin {oran} kadar\u0131na indi.",
{n:sayi(io.unpaid_streak),oran:ppmYuzde(r?.resistance?.lapseThresholdPpm??0)})}</span></div>`:""}
          ${bicimHtml(io)}`:""}
        ${s.wealth?`<p class="kucuk" data-isg-zenginlik="${esc(s.wealth.wealth)}" style="margin-top:8px">${ikon("coins")} ${\u00E7("B\xF6lgenin zenginli\u011Fi: {ad}; b\xF6lgeyi tutan \xFClkenin hazinesine g\xFCnde {k\
r} kr.",{ad:esc(ZENGINLIK_AD[s.wealth.wealth]??s.wealth.wealth),kr:kr(s.wealth.income_cr)})}</p>`:""}
        ${av.length?`<p class="ust-yazi" style="margin-top:10px">${\u00E7("\xDCretim avantaj\u0131")}</p>
          <div class="yigin" style="gap:6px">${av.map(([u,a])=>`<div class="sart ${Number(a.effective)>=Number(a.base)?"tamam":"eksik"}" data-isg-avantaj="${esc(u)}">${ikon(Number(a.effective)>=Number(
a.base)?"sprout":"trending-down")}
            <span><b>${esc(AVANTAJ_AD[u]??u)} ${\u00E7("+%{n}",{n:sayi(a.effective)})}</b><span class="kucuk">${Number(a.effective)>=Number(a.base)?\u00E7("Tam a\xE7\u0131k."):\u00E7("Tam h\xE2li +%{n}; \
i\u015Fgal ve sava\u015F hasar\u0131 azalt\u0131yor.",{n:sayi(a.base)})}</span></span><span></span></div>`).join("")}</div>`:""}
        ${io&&gunler.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Son g\xFCnlerin bak\u0131m\u0131")}</p>
          <div class="isg-gunler">${gunler.map(g=>`<div class="isg-gun ${g.paid?"odendi":"odenmedi"}" data-isg-gun="${esc(g.game_day)}" title="${esc(g.paid?\u00E7("\xD6dendi: {kr} kr",{kr:kr(g.amount_cr)}):
\u00E7("\xD6denmedi"))}">
            ${ikon(g.paid?"check":"x")}<small>${esc(new Date(g.game_day+"T12:00:00Z").toLocaleDateString(DIL.yerel,{day:"numeric",month:"short"}))}</small></div>`).join("")}</div>`:""}
        ${!s.me?.here&&ben().location!==s.region_id?`<div class="satir" style="margin-top:12px"><button class="dugme ikincil kucuk-d" data-isg-seyahat="${esc(s.region_id)}">${ikon("route")}${\u00E7("B\
u b\xF6lgeye seyahat et")}</button></div>`:""}
      </section>`}function bicimHtml(io){const ozerk=io.regime==="autonomous",kural=io.regime_rule??null,benBaskan=ben().citizenship===io.occupier_country_id&&!!o.me_president,breach=io.breach_until&&
Date.parse(io.breach_until)>Date.now(),erken=kural?.to_direct_from&&Date.parse(kural.to_direct_from)>Date.now();return`<div class="yasa-bant" data-isg-bicim="${esc(io.regime)}" style="margin-top:8px">${ikon(
ozerk?"landmark":"flag")}<span>
          <b>${ozerk?\u00E7("\xD6zerk b\xF6lge"):\u00E7("Do\u011Frudan y\xF6netim")}</b> \xB7 ${ozerk?\u00E7("yerliler valisini se\xE7er; gelirin yar\u0131s\u0131 {ulke} \xFClkesine hara\xE7, bak\u0131m d\xF6rtte bir, direni\u015F e\
\u015Fi\u011Fi %40",{ulke:esc(ulkeAdi(io.occupier_country_id))}):\u00E7("gelir ve vergi {ulke} \xFClkesinin; bak\u0131m tam, direni\u015F e\u015Fi\u011Fi %25",{ulke:esc(ulkeAdi(io.occupier_country_id))})}\
.</span></div>
        <div class="bilgi-izgara" style="margin-top:8px">
          <div><small>${\u00E7("B\xF6lgenin g\xFCnl\xFCk geliri")}</small><b data-isg-bolge-gelir="${Number(io.income_cr??0)}">${\u00E7("{kr} kr",{kr:kr(io.income_cr??0)})}${ozerk&&Number(io.income_region_cr)>
0?` <span class="kucuk">${\u00E7("({b} kr b\xFCt\xE7eye, {h} kr hara\xE7)",{b:kr(io.income_region_cr),h:kr(io.income_treasury_cr)})}</span>`:""}</b></div>
          <div><small>${\u00E7("\u0130\u015Fgalciye net (gelir \u2212 bak\u0131m)")}</small><b class="${Number(io.net_cr)>=0?"":"mercan-yazi"}" data-isg-net="${Number(io.net_cr??0)}">${\u00E7("{kr} kr",
{kr:kr(io.net_cr??0)})}</b></div>
          ${io.annex_at?`<div><small>${\u00E7("\xDClkeye kat\u0131lma")}</small><b data-isg-katilma="${esc(io.annex_at)}">${esc(saatYaz(io.annex_at))}</b></div>`:""}
          ${breach?`<div><small>${\u00E7("S\xF6z bozma biti\u015Fi")}</small><b data-isg-soz-bozma="${esc(io.breach_until)}">${esc(saatYaz(io.breach_until))}</b></div>`:""}
        </div>
        ${io.annex_at?`<p class="kucuk">${\u00E7("B\xF6lge {zaman} tarihine kadar geri al\u0131nmazsa (s\xFCren kampanya ya da direni\u015F yoksa) {ulke} \xFClkesine kat\u0131l\u0131r: bak\u0131m biter, \xF6zerk b\xF6lge \xF6zerk kal\u0131r, b\xF6lged\
e oturanlar yeni \xFClkenin vatanda\u015Fl\u0131\u011F\u0131n\u0131 alabilir.",{zaman:esc(saatYaz(io.annex_at)),ulke:esc(ulkeAdi(io.occupier_country_id))})}</p>`:""}
        ${breach?`<div class="yasa-bant uyari" data-isg-breach>${ikon("ban")}<span>${\u00E7("S\xF6z bozma: \xF6zerk b\xF6lge meclis oyuyla do\u011Frudan y\xF6netime al\u0131nd\u0131; {zaman} tarihine kadar b\xF6lgenin geliri ve \xFCr\
etim avantaj\u0131 gelmez.",{zaman:esc(saatYaz(io.breach_until))})}</span></div>`:""}
        ${kural?.treaty_id?`<p class="kucuk" data-isg-anlasma>${ikon("handshake")} ${\u00E7("B\xF6lgenin y\xF6netim bi\xE7imini bar\u0131\u015F anla\u015Fmas\u0131 yazd\u0131; anla\u015Fma s\xFCrerken de\u011Fi\u015Fmez.")}\
</p>`:""}
        ${benBaskan&&kural&&!kural.treaty_id?kural.motion_id?`<p class="cip altin" data-isg-oneri-var>${ikon("scroll-text")}${\u00E7("Y\xF6netim bi\xE7imi \xF6nerisi mecliste")}</p>`:`<div class="sati\
r" style="margin-top:8px"><button class="dugme ikincil kucuk-d" data-isg-bicim-oner="${ozerk?"direct":"autonomous"}" ${ozerk&&erken?"disabled":""}>${ikon(ozerk?"flag":"landmark")}${ozerk?\u00E7("Do\u011Fru\
dan y\xF6netime al (meclis oyu)"):\u00E7("\xD6zerk b\xF6lge yap (meclis oyu)")}</button>
              ${ozerk&&erken?`<span class="kucuk">${\u00E7("En erken {zaman}; s\xF6z bozma say\u0131l\u0131r ({n} g\xFCn gelir ve avantaj yok).",{zaman:esc(saatYaz(kural.to_direct_from)),n:sayi(kural.
breach_days??7)})}</span>`:ozerk?`<span class="kucuk">${\u00E7("S\xF6z bozma say\u0131l\u0131r: {n} g\xFCn gelir ve avantaj yok.",{n:sayi(kural.breach_days??7)})}</span>`:""}</div>`:""}`}function direnisKarti(){
const io=s.occupation,d=s.resistance,r=k(),me=s.me??{},rr=r?.resistance??{},son=s.last_resistance,sonHtml=son&&(!d||son.resistance_id!==d.resistance_id)?`<p class="kucuk" style="margin-top:10px" data-\
isg-son="${esc(son.status)}">${ikon(drnDurum(son.status)[2])} ${\u00E7("Son direni\u015F ({zaman}):",{zaman:esc(saatYaz(son.closed_at??son.opened_at))})} ${esc(drnSonuc(son))}</p>`:"";if(!io)return son?
`<section class="kart" id="isg-direnis" data-isg-direnis="yok"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Yerel direni\u015F")}</p><h2 class="b2">${\u00E7("B\xF6lge i\u015Fgalde de\u011Fil")}\
</h2></div><span class="ik-kutu">${ikon("megaphone")}</span></div>${sonHtml}</section>`:"";const kisi=me.voter_code&&me.citizen_of_home?drnKisiNeden(me.voter_code,r,io.home_country_id):"",isgalciNot=!me.
citizen_of_home&&ben().citizenship===io.occupier_country_id?`<p class="kucuk" data-isg-isgalci>${\u00E7("Oylamay\u0131 yaln\u0131z b\xF6lgenin direni\u015F listesindekiler yapar. Kabul edilirse koruma bitince direni\u015F k\
ampanyas\u0131 a\xE7\u0131l\u0131r; b\xF6lge cepheden savunulur.")}</p>`:"",esikAciklama=\u00E7("Listedeki {n} ki\u015Fiden en az {esik} ki\u015Fi evet derse (listenin {oran}; bak\u0131m {g} g\xFCn aksarsa {oran2}) i\u015Fg\
alciye kar\u015F\u0131 yerel direni\u015F kampanyas\u0131 a\xE7\u0131l\u0131r.",{n:sayi(io.roll_size),esik:sayi(Math.max(Number(rr.minSupport??3),Math.floor((Number(io.roll_size)*Number(io.lapsed?rr.lapseThresholdPpm:
rr.thresholdPpm)+999999)/1e6))),oran:ppmYuzde(rr.thresholdPpm??0),g:sayi(r?.upkeep?.lapseDays??3),oran2:ppmYuzde(rr.lapseThresholdPpm??0)}),bas=(ust,baslik,ik2,durum)=>`<section class="kart" id="isg-d\
irenis" data-isg-direnis="${esc(durum)}"${d?` data-isg-direnis-kimlik="${esc(d.resistance_id)}"`:""}>
        <div class="kart-bas"><div><p class="ust-yazi">${esc(ust)}</p><h2 class="b2">${baslik}</h2></div><span class="ik-kutu">${ikon(ik2)}</span></div>`;if(!d){const b=s.blocker?.code?s.blocker:null,
acar=!b&&me.on_roll&&!me.voter_code;return`${bas(\u00E7("Yerel direni\u015F"),b?.code==="RESISTANCE_TOO_FEW"?\u00E7("Direni\u015F listesi yetersiz"):\u00E7("Direni\u015F yok"),"megaphone",b?"engel":"a\
cik")}
          <p class="aciklama">${esikAciklama}</p>
          ${b?`<div class="yasa-bant uyari" data-isg-engel="${esc(b.code)}">${ikon("circle-alert")}<span>${esc(drnEngel(b.code,r))}${b.until?" "+\u00E7("A\xE7\u0131l\u0131\u015F: {zaman}.",{zaman:esc(
saatYaz(b.until))})+` <b data-bitis="${esc(b.until)}"></b>`:""}</span></div>`:""}
          ${acar?`<p class="aciklama" style="margin-top:10px">${\u00E7("Oylama {saat} saat s\xFCrer. A\xE7arken depodan {m} m\xFChimmat ve {l} lojistik oylama s\xFCresince ayr\u0131l\u0131r; oylama tutmazsa \xE7\xF6z\xFCl\xFCr.",
{saat:sayi(rr.voteH??24),m:sayi(rr.reserve?.["muhimmat@1"]??0),l:sayi(rr.reserve?.["lojistik@1"]??0)})}</p>
            <div class="satir"><button class="dugme mercan" id="isg-ac">${ikon("megaphone")}${\u00E7("Direni\u015F oylamas\u0131 a\xE7")}</button></div>`:!b&&kisi?`<p class="kucuk" data-isg-kisi="${esc(
me.voter_code)}">${esc(kisi)}</p>`:""}
          ${isgalciNot}${sonHtml}</section>`}const[ad,,ik]=drnDurum(d.status);if(d.status==="open"){const kat=Number(d.voters??0),n=Math.max(1,Number(d.roll_size??0));return`${bas(\u00E7("Yerel direni\
\u015F \xB7 oylama"),\u00E7("{bolge} i\xE7in direni\u015F oylamas\u0131",{bolge:esc(bolgeAdi(s.region_id))}),ik,"open")}
          <div class="hareket-sayac"><b data-isg-katilim>${sayi(kat)}</b><span>${\u00E7("/ {n} ki\u015Fi oy verdi",{n:sayi(d.roll_size)})}</span>
            <span class="cip">${ikon("clock")}<b data-bitis="${esc(d.closes_at)}"></b></span></div>
          <div class="cubuk mercan" style="margin-top:6px"><i data-isg-katilim-cubuk style="width:${Math.round(Math.min(1,kat/n)*100)}%"></i></div>
          <p class="kucuk" style="margin-top:6px">${\u00E7("Kabul i\xE7in en az {n} evet gerekir (a\xE7\u0131l\u0131\u015Fta listenin {oran} kadar\u0131 olarak kilitlendi{aksama}). Oy gizlidir; say\u0131m oylama kapan\u0131nca a\xE7\u0131klan\u0131r\
.",{n:sayi(d.required_yes),oran:ppmYuzde(d.threshold_ppm),aksama:d.lapsed?\u00E7("; bak\u0131m aksad\u0131\u011F\u0131 i\xE7in d\xFC\u015F\xFCk e\u015Fik"):""})}</p>
          <div class="oneri-dugmeler" id="isg-oy" style="margin-top:10px">
            ${me.voted?`<span class="cip yesil" data-isg-oyladin>${ikon("check")}${\u00E7("Oyunu verdin")}</span>`:me.on_roll&&!me.voter_code?`<button class="dugme mercan" data-isg-oy="yes">${ikon("me\
gaphone")}${\u00E7("Evet: direni\u015F")}</button><button class="dugme ikincil" data-isg-oy="no">${ikon("x")}${\u00E7("Hay\u0131r")}</button>`:""}
          </div>
          ${!me.voted&&kisi?`<p class="kucuk" data-isg-kisi="${esc(me.voter_code)}">${esc(kisi)}</p>`:""}
          ${isgalciNot}${sonHtml}</section>`}if(d.status==="waiting"){const koruma=s.war_protected_until&&Date.parse(s.war_protected_until)>Date.now();return`${bas(\u00E7("Yerel direni\u015F \xB7 kabul edildi"),
esc(ad),ik,"waiting")}
          <p class="aciklama">${\u00E7("Oylama kabul edildi: {e} evet, {h} hay\u0131r (gereken {n}).",{e:sayi(d.yes??0),h:sayi(d.no??0),n:sayi(d.required_yes)})}
            ${koruma?\u00E7("B\xF6lgenin sava\u015F korumas\u0131 {zaman} bitince direni\u015F kampanyas\u0131 a\xE7\u0131l\u0131r.",{zaman:esc(saatYaz(s.war_protected_until))})+` <b data-bitis="${esc(
s.war_protected_until)}"></b>`:\u00E7("Direni\u015F kampanyas\u0131 birazdan a\xE7\u0131l\u0131r.")}</p>
          <p class="kucuk">${\u00E7("Kampanya a\xE7\u0131l\u0131rken b\xF6lge ba\u015Fka bir kampanyan\u0131n hedefiyse ya da \xFClkenin ba\u015Fka bir direni\u015F kampanyas\u0131 ba\u015Flad\u0131ysa \xF6nce kesinle\u015Fen y\xFCr\xFCr; bu direni\u015F d\xFC\u015Fer.")}\
</p>
          ${sonHtml}</section>`}const c=s.campaign,katilabilir=me.citizen_of_home&&!me.joined&&!me.join_code,kNeden=!me.joined&&me.join_code&&me.join_code!=="RESISTANCE_NO_CAMPAIGN"?drnKisiNeden(me.join_code,
r,io.home_country_id):"";return`${bas(\u00E7("Yerel direni\u015F \xB7 kampanya"),\u00E7("{bolge}: direni\u015F {isgalci} \xFClkesine kar\u015F\u0131",{bolge:esc(bolgeAdi(s.region_id)),isgalci:esc(ulkeAdi(
d.occupier_country_id))}),"flame","campaign")}
        <div class="yasa-bant${c?.status==="active"?" uyari":""}" style="margin-top:4px">${ikon(c?.status==="active"?"swords":"hourglass")}<span data-isg-kampanya="${esc(c?.status??"")}">${esc(drnKampanyaMetni(
c))}${c?.status==="preparing"&&c.first_round_at?` <b data-bitis="${esc(c.first_round_at)}"></b>`:""}</span></div>
        <div class="oy-say" style="margin-top:10px"><span>${\u00E7("Direni\u015Fe kat\u0131lan")} <b data-isg-savasan>${sayi(d.fighters??0)}</b></span>
          <span>${\u00E7("Oylama")} <b>${sayi(d.yes??0)}\u2013${sayi(d.no??0)}</b></span></div>
        <p class="kucuk">${\u00E7("Sald\u0131ran taraf {asil}: b\xFCt\xFCn vatanda\u015Flar\u0131 cephede (b\xF6lgede ya da kom\u015Fusunda) vurabilir. Direni\u015Fe kat\u0131lanlar ayr\u0131ca her tur a\xE7\u0131l\u0131rken depodan e\u015Fit pay al\u0131r. Kat\u0131l\u0131m g\
eri al\u0131nmaz.",{asil:esc(ulkeAdi(io.home_country_id))})}</p>
        <div class="oneri-dugmeler" style="margin-top:10px">
          ${me.joined?`<span class="cip yesil" data-isg-katildin>${ikon("check")}${\u00E7("Direni\u015Fe kat\u0131ld\u0131n")}</span>`:katilabilir?`<button class="dugme mercan" id="isg-katil">${ikon("\
user-round-plus")}${\u00E7("Direni\u015Fe kat\u0131l")}</button>`:""}
          ${c?.campaign_id&&me.citizen_of_home?`<button class="dugme ikincil" data-isg-cephe="${esc(c.campaign_id)}">${ikon("swords")}${\u00E7("Cepheye git")}</button>`:""}
        </div>
        ${kNeden?`<p class="kucuk" data-isg-katilamaz="${esc(me.join_code)}">${esc(kNeden)}</p>`:""}
        ${sonHtml}</section>`}function depoKarti(){const io=s.occupation,dp=s.depot;if(!io||!dp)return"";const r=k(),rr=r?.resistance??{},me=s.me??{},stok=a=>dp.stock?.[a]??{free:0,held:0},ver=dp.give??
rr.give??["muhimmat@1","lojistik@1"];return ver.includes(depo.varlik)||(depo.varlik=ver[0]),`<section class="kart" id="isg-depo">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Yerel direni\u015F")}</p><h2 class="b2">${\u00E7("Direni\u015F deposu")}</h2></div><span class="ik-kutu">${ikon("package")}</span></div\
>
        <div class="isg-depo">${ver.map(a=>{const x=stok(a),gerek=Number(dp.reserve?.[a]??rr.reserve?.[a]??0);return`<div class="isg-depo-kutu" data-isg-depo="${esc(a)}" data-isg-depo-serbest="${Number(
x.free)}"><small>${esc(varlikAdi(a))}</small><b>${sayi(Number(x.free)+Number(x.held))}</b>
            <span class="kucuk">${Number(x.held)?\u00E7("{n} oylama i\xE7in ayr\u0131ld\u0131",{n:sayi(x.held)}):gerek?\u00E7("oylama i\xE7in en az {n}",{n:sayi(gerek)}):""}</span></div>`}).join("")}<\
/div>
        <p class="kucuk">${\u00E7("{n} ki\u015Fi depoya koydu. Kimin ne koydu\u011Fu gizli; yaln\u0131z toplam ve katk\u0131 veren say\u0131s\u0131 herkese a\xE7\u0131k. \u0130\u015Fgal biterse depo {ulke} hazinesine ge\xE7er.",
{n:sayi(dp.givers??0),ulke:esc(ulkeAdi(io.home_country_id))})}</p>
        ${me.citizen_of_home?`<form class="form" id="isg-depo-form" novalidate style="margin-top:10px">
            <p class="ust-yazi">${\u00E7("Depoya koy")}</p>
            <div class="satir" style="flex-wrap:wrap;gap:8px">
              <select name="varlik" aria-label="${\u00E7("Ne koyacaks\u0131n")}">${ver.map(a=>`<option value="${esc(a)}"${depo.varlik===a?" selected":""}>${esc(\u00E7("{urun} (elinde {n})",{urun:varlikAdi(
a),n:sayi(Durum.stok(a))}))}</option>`).join("")}</select>
              <input name="miktar" inputmode="numeric" placeholder="${\u00E7("Miktar")}" aria-label="${\u00E7("Miktar")}" value="${esc(depo.miktar)}" style="max-width:8em">
              <button class="dugme altin" type="submit">${ikon("package")}${\u00E7("Depoya koy")}</button></div>
            <p class="kucuk">${\u00E7("As\u0131l \xFClkenin b\xFCt\xFCn vatanda\u015Flar\u0131, d\xFCnyan\u0131n her yerinden koyabilir. Koydu\u011Fun geri al\u0131nmaz.")}</p>
          </form>`:""}
      </section>`}function hasarKarti(){const h=s.damage??{},r=k(),me=s.me??{},p=Number(h.damage_ppm??0);return p<=0&&!(h.recent??[]).length?"":`<section class="kart" id="isg-hasar" data-isg-hasar="${p}\
">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sava\u015F izleri")}</p><h2 class="b2">${p>0?\u00E7("\u015Eehrin hasar\u0131 {n}",{n:ppmYuzde(p)}):\u00E7("\u015Eehir onar\u0131ld\u0131")}\
</h2></div><span class="ik-kutu">${ikon("hammer")}</span></div>
        ${hasarOzetHtml(h,r)}
        ${me.repair?onarimHtml(me.repair,r):p>0?`<p class="kucuk">${\u00E7("Onar\u0131ma kat\u0131lmak i\xE7in bu \u015Fehirde olmal\u0131s\u0131n.")}</p>`:""}
        ${onaranlarHtml(h)}
      </section>`}function kurallarKarti(){const r=isgKural();if(!r)return"";const d=r.resistance,h=r.damage,maddeler=[["flame",\u00E7("\u0130\u015Fgal: b\xF6lgenin bug\xFCnk\xFC sahibi as\u0131l \xFClkesi de\u011Filse s\xFCrer; b\xF6lge \
as\u0131l \xFClkesine d\xF6n\xFCnce biter. \u015Eirket, ev, mal ve vatanda\u015Fl\u0131k de\u011Fi\u015Fmez.")],["coins",\u00E7("Bak\u0131m: i\u015Fgalcinin hazinesinden her g\xFCn b\xF6lge ba\u015F\u0131na {taban} kr; \xFClkenin\
 elindeki b\xF6lgeler as\u0131l b\xF6lgelerini a\u015Ft\u0131k\xE7a her fazladan b\xF6lge i\xE7in bak\u0131m {oran} artar. Hazinede yoksa o g\xFCn \xF6denmez: bor\xE7 olmaz, b\xF6lge el de\u011Fi\u015Ftirmez.",
{taban:kr(r.upkeep.baseCr),oran:ppmYuzde(r.upkeep.extraPpm)})],["sprout",\u00E7("\xDCretim avantaj\u0131 i\u015Fgalde kademeli a\xE7\u0131l\u0131r: \xFCst \xFCste \xF6denen her g\xFCn \xFC\xE7te bir ({g} g\xFCnde tam). Bak\u0131m \xF6denmeyen g\xFCn ya da i\u015F\
galcinin ba\u015Fkentinden kendi b\xF6lgeleriyle yol yoksa kapal\u0131d\u0131r.",{g:sayi(r.advantage.rampDays)})],["shield-half",\u00E7("Sava\u015Fla el de\u011Fi\u015Ftiren b\xF6lge {s} saat yeni kampanyaya kapal\u0131. El\
 de\u011Fi\u015Ftirmeden sonraki {v} saat b\xF6lgede yeni i\u015Flerde, ilanlarda ve ev sat\u0131\u015Flar\u0131nda eski sahibinin vergi oranlar\u0131 ge\xE7erli.",{s:sayi(r.protection.afterWarH),v:sayi(
r.protection.taxKeepH)})],["users-round",\u00E7("Direni\u015F listesi i\u015Fgal ba\u015Flarken bir kez yaz\u0131l\u0131r: as\u0131l \xFClkenin vatanda\u015F\u0131, b\xF6lgede en az {g} g\xFCnd\xFCr oturan ve hesab\u0131 en az {h} g\xFCnl\xFCk olanlar. Sonradan t\
a\u015F\u0131nmak hak vermez; listede {n} ki\u015Fiden az varsa direni\u015F olmaz.",{g:sayi(d.residenceDays),h:sayi(d.accountDays),n:sayi(d.minSupport)})],["vote",\u00E7("Oylamay\u0131 listedeki biri a\xE7ar\
; {s} saat s\xFCrer ve gizlidir. Kabul i\xE7in listenin {e} kadar\u0131 (en az {n}) evet demeli; i\u015Fgalcinin bak\u0131m\u0131 {g} g\xFCn \xFCst \xFCste \xF6denmezse {e2}.",{s:sayi(d.voteH),e:ppmYuzde(
d.thresholdPpm),n:sayi(d.minSupport),g:sayi(r.upkeep.lapseDays),e2:ppmYuzde(d.lapseThresholdPpm)})],["package",\u00E7("Depoya as\u0131l \xFClkenin b\xFCt\xFCn vatanda\u015Flar\u0131 m\xFChimmat ve lojistik koyabilir. Oylama i\xE7i\
n depoda en az {m} m\xFChimmat ve {l} lojistik olmal\u0131; oylama s\xFCresince ayr\u0131l\u0131r.",{m:sayi(d.reserve?.["muhimmat@1"]??0),l:sayi(d.reserve?.["lojistik@1"]??0)})],["swords",\u00E7("Kabu\
l edilirse koruma s\xFCresi bitince direni\u015F kampanyas\u0131 a\xE7\u0131l\u0131r: sald\u0131ran as\u0131l \xFClke, hedef b\xF6lgenin kendisi. Meclis izni, bedel ve kom\u015Fuluk \u015Fart\u0131 yok; sald\u0131rmazl\u0131k ve bar\u0131\u015F antla\u015Fmas\u0131 engellemez. \xDClkenin a\
yn\u0131 anda tek direni\u015F kampanyas\u0131 olur.")],["package",\u00E7("Direni\u015Fe kat\u0131lanlar her tur a\xE7\u0131l\u0131rken depodan e\u015Fit pay al\u0131r. Kazan\u0131l\u0131rsa b\xF6lge as\u0131l \xFClkesine d\xF6ner, depo hazineye ge\xE7er; kayb\
edilirse {g} g\xFCn, tutmayan oylamadan sonra {f} g\xFCn yeni oylama a\xE7\u0131lmaz.",{g:sayi(d.lostCooldownDays),f:sayi(d.failCooldownDays)})],["hammer",\u00E7("Sava\u015F hasar\u0131: hedef b\xF6lgede vuru\u015Flu h\
er tur {t}, sava\u015Fla el de\u011Fi\u015Ftirmek {d} (en \xE7ok {m}). Hasar \xFCretim avantaj\u0131n\u0131 ayn\u0131 oranda azalt\u0131r.",{t:ppmYuzde(h.roundPpm),d:ppmYuzde(h.warTransferPpm),m:ppmYuzde(
h.maxPpm)})],["wrench",\u00E7("Onar\u0131m: \u015Fehirde bulunan herkes kat\u0131l\u0131r; i\u015F birimi ba\u015F\u0131na hasar {b} azal\u0131r, ki\u015Fi ba\u015F\u0131 g\xFCnde en \xE7ok {n} birim (g\xFCnl\xFCk \xE7al\u0131\u015Fma s\u0131n\u0131r\u0131na say\u0131l\u0131r; \xFCcret ve vergi yok). B\xF6lge \
sava\u015F\u0131n hedefiyken onar\u0131m olmaz.",{b:ppmYuzde(h.repairPerUnitPpm),n:sayi(h.repairDailyUnits)})]];return`<section class="kart" id="isg-kurallar"><div class="kart-bas"><div><p class="ust-\
yazi">${\u00E7("Kurallar")}</p><h2 class="b2">${\u00E7("\u0130\u015Fgal ve direni\u015F nas\u0131l i\u015Fler?")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></div>
        <div class="liste">${maddeler.map(([ik,m])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(m)}</div></div><span></span></div>`).
join("")}</div>
      </section>`}function ciz(){durdur();const bos=!o.held?.length&&!o.lost?.length;kap.innerHTML=`<div class="sayfa" data-isg-ekran="${esc(o.country_id??"")}">
        <div class="sayfa-bas"><div>${ulkeUst(o.country_id,\u00E7("Topraklar"))}<h1 class="b1">${\u00E7("Topraklar\u0131m\u0131z")}</h1>
          <p class="aciklama">${\u00E7("Elimizdeki i\u015Fgal b\xF6lgeleri ve kaybetti\u011Fimiz b\xF6lgeler. \u0130\u015Fgal bak\u0131m\u0131 her g\xFCn hazineden d\xFC\u015Fer; i\u015Fgal alt\u0131ndaki b\xF6lgenin sakinleri yerel direni\u015Fle b\xF6lgeyi geri iste\
yebilir.")}</p></div>
          <span class="cip ${o.lost?.length?"mercan":"yesil"}" id="isg-cip">${ikon(o.lost?.length?"flame":"shield")}${o.lost?.length?esc(\u00E7("{n} b\xF6lgemiz i\u015Fgalde",{n:sayi(o.lost.length)})):
esc(\u00E7("Toprak kayb\u0131m\u0131z yok"))}</span></div>
        ${bos?`<div class="bilgi-kutusu" style="margin-bottom:12px">${ikon("shield")}<span>${\u00E7("\xDClkenin i\u015Fgal etti\u011Fi ya da kaybetti\u011Fi b\xF6lge yok.")}</span></div>`:""}
        <div class="izgara iki">
          <div class="yigin">${s?bolgeKarti()+direnisKarti()+depoKarti()+hasarKarti():""}</div>
          <div class="yigin">${ozetKarti()}${listeKarti("lost")}${listeKarti("held")}${kurallarKarti()}</div>
        </div></div>`,bagla();const an=[s?.resistance?.status==="open"?s.resistance.closes_at:null,s?.war_protected_until,s?.tax_keep?.until,s?.blocker?.until,s?.campaign?.first_round_at,s?.campaign?.
next_round_at,s?.me?.repair?.working_until].filter(x=>x&&Date.parse(x)>Date.now()-6e4).sort()[0]??null;an!==sonAn&&(sonAn=an,sayac.n=0),durdur=geriSay(kap,()=>setTimeout(tazele,gecikmeli(sayac)))}let sonAn=null;
const sayac={n:0};function onay({ust,baslik,govde,ad,sinif="altin",ik="check",is}){pencere({ust,baslik,govde,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad,sinif,ikon:ik,is:async()=>{try{await is()}catch(err){
tost(hataMetni(err),"circle-alert")}await tazele()}}]})}function bagla(){for(const b of $$("[data-isg-sec]",kap))b.addEventListener("click",()=>{bakilan=b.dataset.isgSec,tazele(),$("#isg-bolge",kap)?.
scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})});for(const b of $$("[data-isg-seyahat]",kap))b.addEventListener("click",()=>seyahatSor(b.dataset.isgSeyahat,()=>tazele()));for(const b of $$(
"[data-isg-bicim-oner]",kap))b.addEventListener("click",()=>{const hedef=b.dataset.isgBicimOner;onay({ust:\u00E7("Y\xF6netim bi\xE7imi"),baslik:hedef==="autonomous"?\u00E7("\xD6zerk b\xF6lge yap\u0131ls\u0131n m\u0131?"):
\u00E7("Do\u011Frudan y\xF6netime al\u0131ns\u0131n m\u0131?"),govde:`<p class="aciklama">${hedef==="autonomous"?\u00E7("{bolge} \xF6zerk b\xF6lge olur: yerliler valisini se\xE7er, gelirin yar\u0131s\u0131 bize hara\xE7, b\
ak\u0131m d\xF6rtte bir, direni\u015F e\u015Fi\u011Fi %40. Meclis salt \xE7o\u011Funlukla karar verir.",{bolge:`<b>${esc(bolgeAdi(s.region_id))}</b>`}):\u00E7("{bolge} do\u011Frudan y\xF6netime al\u0131n\u0131r: gelir \
ve vergi bizim, bak\u0131m tam, direni\u015F e\u015Fi\u011Fi %25. Bu s\xF6z bozmad\u0131r: {n} g\xFCn b\xF6lgenin geliri ve \xFCretim avantaj\u0131 gelmez, b\xF6lgede oturanlara duyurulur. Meclis salt \xE7o\u011Funlukla karar verir.",
{bolge:`<b>${esc(bolgeAdi(s.region_id))}</b>`,n:sayi(s.occupation?.regime_rule?.breach_days??7)})}</p>`,ad:\u00E7("Oylamaya a\xE7"),sinif:hedef==="autonomous"?"altin":"mercan",ik:"scroll-text",is:async()=>{
await Sunucu.yap("motion_propose_regime",{p_region:s.region_id,p_regime:hedef}),tost(\u00E7("Y\xF6netim bi\xE7imi \xF6nerisi oylamaya a\xE7\u0131ld\u0131."),"scroll-text")}})});const r=k(),rr=r?.resistance??
{};$("#isg-ac",kap)?.addEventListener("click",()=>onay({ust:\u00E7("Yerel direni\u015F"),baslik:\u00E7("Direni\u015F oylamas\u0131 a\xE7"),govde:`<p class="aciklama">${\u00E7("{bolge} i\xE7in {saat} saat\
lik gizli oylama a\xE7\u0131l\u0131r; listedeki {n} ki\u015Fiye haber gider. A\xE7an olarak ad\u0131n kimseye g\xF6sterilmez. Depodan {m} m\xFChimmat ve {l} lojistik oylama s\xFCresince ayr\u0131l\u0131r.",
{bolge:`<b>${esc(bolgeAdi(s.region_id))}</b>`,saat:sayi(rr.voteH??24),n:sayi(s.occupation?.roll_size??0),m:sayi(rr.reserve?.["muhimmat@1"]??0),l:sayi(rr.reserve?.["lojistik@1"]??0)})}</p>`,ad:\u00E7("\
Oylamay\u0131 a\xE7"),sinif:"mercan",ik:"megaphone",is:async()=>{await Sunucu.yap("resistance_open",{p_region:s.region_id}),tost(\u00E7("Direni\u015F oylamas\u0131 a\xE7\u0131ld\u0131: listedekiler {saat} saat oy verecek.",
{saat:sayi(rr.voteH??24)}),"megaphone")}}));for(const b of $$("[data-isg-oy]",kap))b.addEventListener("click",()=>{const evet=b.dataset.isgOy==="yes";OyKabini.ac({ust:\u00E7("Yerel direni\u015F"),baslik:evet?
\u00E7("Direni\u015Fe evet"):\u00E7("Direni\u015Fe hay\u0131r"),secim:\u00E7("Direni\u015F oylamas\u0131"),pusula:[{ad:\u00E7("Evet"),secili:evet},{ad:\u00E7("Hay\u0131r"),secili:!evet}],not:`<p class\
="aciklama">${\u00E7("Oyun gizlidir ve de\u011Fi\u015Ftirilemez: kimin oy verdi\u011Fi ayr\u0131, pusula kimliksiz tutulur. Say\u0131m oylama kapan\u0131nca a\xE7\u0131klan\u0131r.")}</p>`,ad:evet?\u00E7(
"Evet oyu ver"):\u00E7("Hay\u0131r oyu ver"),sinif:evet?"mercan":"ikincil",sayac:{oy:Number(s.resistance?.voters??0),secmen:s.resistance?.roll_size??null},gonder:async()=>{await Sunucu.yap("resistance\
_vote",{p_resistance:s.resistance.resistance_id,p_choice:evet?"yes":"no"}),tost(\u00E7("Oyun sand\u0131\u011Fa at\u0131ld\u0131."),"vote")},sonra:()=>tazele()})});$("#isg-katil",kap)?.addEventListener(
"click",()=>onay({ust:\u00E7("Yerel direni\u015F"),baslik:\u00E7("Direni\u015Fe kat\u0131l"),govde:`<p class="aciklama">${\u00E7("Bu kampanyada sald\u0131ran tarafta kilitlenirsin; her tur a\xE7\u0131l\u0131rken cephed\
eysen (b\xF6lgede ya da kom\u015Fusunda) depodan pay al\u0131rs\u0131n. Kat\u0131l\u0131m geri al\u0131nmaz.")}</p>`,ad:\u00E7("Kat\u0131l"),sinif:"mercan",ik:"user-round-plus",is:async()=>{await Sunucu.
yap("resistance_join",{p_resistance:s.resistance.resistance_id}),tost(\u00E7("Direni\u015Fe kat\u0131ld\u0131n: her tur ba\u015F\u0131nda depodan pay al\u0131rs\u0131n."),"user-round-plus"),Durum.askerlik().
catch(()=>{})}}));for(const b of $$("[data-isg-cephe]",kap))b.addEventListener("click",()=>{try{sessionStorage.setItem("civora.kampanya",b.dataset.isgCephe)}catch{}Kabuk.git("ulke/cephe")});const df=$(
"#isg-depo-form",kap);df?.addEventListener("input",()=>{const f=new FormData(df);depo.varlik=String(f.get("varlik")??depo.varlik),depo.miktar=String(f.get("miktar")??"")}),df?.addEventListener("submit",
e=>{e.preventDefault();const f=new FormData(df),varlik=String(f.get("varlik")??"muhimmat@1"),metin=String(f.get("miktar")??"").trim(),miktar=/^[0-9]{1,7}$/.test(metin)?Number(metin):0;if(!miktar){tost(
\u00E7("Miktar\u0131 tam say\u0131 olarak yaz."),"circle-alert");return}const ne=`${sayi(miktar)} ${varlikAdi(varlik)}`;onay({ust:\u00E7("Direni\u015F deposu"),baslik:\u00E7("Depoya koy"),govde:`<p cl\
ass="aciklama">${\u00E7("{bolge} direni\u015F deposuna {ne} koyacaks\u0131n. Geri al\u0131nmaz; kimin koydu\u011Fu g\xF6sterilmez.",{bolge:esc(bolgeAdi(s.region_id)),ne:`<b>${esc(ne)}</b>`})}</p>`,ad:\u00E7(
"Koy"),ik:"package",is:async()=>{await Sunucu.yap("resistance_give",{p_region:s.region_id,p_asset:varlik,p_qty:miktar}),depo.miktar="",tost(\u00E7("Depoya koydun: {ne}.",{ne}),"package"),await Durum.ozet().
catch(()=>{})}})}),onarimBagla(kap,s.me?.repair,()=>tazele())}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()});await yukle(),ciz();const ilgili=()=>new Set([bakilan,...(o?.held??[]).map(
x=>x.occupation.region_id),...(o?.lost??[]).map(x=>x.occupation.region_id)]),b1=Sunucu.Canli.dinle("public:region",(olay,yuk)=>{const d=yuk?.data??{};if(!(!/^(occupation|resistance|damage)\./.test(olay)||
!ilgili().has(d.region_id))){if(olay==="resistance.turnout"&&s?.resistance?.resistance_id===d.resistance_id&&s.resistance.status==="open"){s.resistance.voters=d.voters;const el=$("[data-isg-katilim]",
kap),cb=$("[data-isg-katilim-cubuk]",kap);el&&(el.textContent=sayi(d.voters)),cb&&(cb.style.width=Math.round(Math.min(1,Number(d.voters)/Math.max(1,Number(d.roll_size)))*100)+"%");return}tazele()}}),b2=Durum.
dinle("ulke-olay",({olay})=>{/^(occupation\.|resistance\.|country\.war_)/.test(olay)&&tazele()}),b3=Sunucu.Canli.dinle("public:campaign",(olay,yuk)=>{const c=s?.campaign;!c||yuk?.data?.campaign_id!==c.
campaign_id||/^(war\.(round_closed|campaign_closed|cancelled)|resistance\.supplied)/.test(olay)&&tazele()}),b4=Durum.dinle("olay",({olay})=>{/^(travel\.arrived|repair\.)/.test(olay)&&tazele()});return()=>{
kapandi=!0,durdur(),b1(),b2(),b3(),b4()}}}),Parcalar.tamam("ek_98c_isgal");
