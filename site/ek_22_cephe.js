// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_22_cephe.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("ulke/cephe",{async ac(kap){let a=await Durum.askerlik(),oturum=null,sonuc=null,secim={kesim:"center",durus:"assault",vurus:0},gonderiliyor=!1,bitis=null;const tatbikatKarti=()=>{const d=a.
drill,hak=d.daily_limit-d.sessions_last_24h;return oturum?adimKarti():`<section class="kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Tatbikat cephesi \xB7 bota kar\u015F\u0131")}</p><h2 class="b2">${\u00E7("Vurmay\u0131 \xF6\u011Fren")}</h2></div><span class="ik-kutu"\
>${ikon("target")}</span></div>
        <p class="aciklama">${\u00E7("Be\u015F ad\u0131ml\u0131k k\u0131sa bir \xE7at\u0131\u015Fma. Her ad\u0131mda bir kesim ve duru\u015F se\xE7ip en \xE7ok 10 kez vurursun; g\xFCc\xFCn ger\xE7ek cephedeki gibi hesaplan\u0131r. Tatbikat mal\u0131na, enerjine ve den\
eyimine dokunmaz.")}${a.basic_training_done?"":" "+\u00E7("\u0130lk tatbikat\u0131 bitirince ger\xE7ek cepheye kat\u0131labilirsin.")}</p>
        ${bitis?bitisKutusu():""}
        <div class="satir" style="margin-top:14px;flex-wrap:wrap">
          <button class="dugme altin" id="tb-basla" ${hak<=0?"disabled":""}>${ikon("play")}${d.open_session_id?\u00E7("Tatbikata devam et"):\u00E7("Tatbikat\u0131 ba\u015Flat")}</button>
          <span class="kucuk">${\u00E7("Bug\xFCn kalan hak: {kalan} / {toplam}",{kalan:Math.max(0,hak),toplam:Number(d.daily_limit)})}</span>
          ${a.soldier?`<span class="kucuk" id="tb-silah">${ikon("shield-half")} ${a.soldier.weapon_max==null?\u00E7("Silah: en iyisi"):Number(a.soldier.weapon_max)===0?\u00E7("Silah: silahs\u0131z (se\xE7im)"):
\u00E7("Silah: en \xE7ok {n}. kalite (se\xE7im)",{n:Number(a.soldier.weapon_max)})}</span>`:""}
        </div>
      </section>`},bitisKutusu=()=>`<div class="${bitis.won?"bilgi-kutusu":"hata-kutusu"}" style="margin-top:12px">${ikon(bitis.won?"trophy":"circle-alert")}
      <span>${bitis.won?\u00E7("Tatbikat\u0131 kazand\u0131n!"):\u00E7("Bu tatbikat\u0131 bot kazand\u0131; bir daha dene.")} ${\u00E7("Ortalama pay: <b>{pay}</b>.",{pay:payYuzde(bitis.total_x10/bitis.
steps_total/10)})}
      ${bitis.ilk?\u00E7("Temel asker\xEE e\u011Fitimin tamamland\u0131: art\u0131k ger\xE7ek cepheye kat\u0131labilirsin."):""}</span></div>`,adimKarti=()=>{const s=a.soldier,dusman=new Map((oturum.next_enemy??
[]).map(e=>[e.sector,e])),plan=oturum.mode!=="hits",adimlar=Array.from({length:oturum.steps_total},(_,i)=>{const r=sonucGecmisi[i];return`<i class="${r?r>5e6?"kazandi":"kaybetti":i===oturum.steps_done?
"simdi":""}"></i>`}).join("");return`<section class="kart" aria-live="polite">
        <div class="tb-ust"><div><p class="ust-yazi">${\u00E7("Tatbikat \xB7 ad\u0131m {n} / {toplam}",{n:oturum.steps_done+1,toplam:oturum.steps_total})}</p><h2 class="b2">${sonuc?\u00E7("Ad\u0131m\u0131n sonu\
cu"):\u00E7("Kesimini ve duru\u015Funu se\xE7")}</h2></div>
          <div class="tb-adimlar" aria-hidden="true">${adimlar}</div></div>
        ${sonuc?sonucKutusu():`
        <p class="kucuk" style="margin:10px 0 8px">${\u00E7("Kesim (a\u011F\u0131rl\u0131k: sol 3, merkez 4, sa\u011F 3). D\xFC\u015Fman\u0131n nerede topland\u0131\u011F\u0131 canl\u0131 \xE7ubukta g\xF6r\xFCn\xFCr; duru\u015Funu ad\u0131mdan sonra g\xF6r\xFCrs\xFCn.")}\
</p>
        <div class="tb-kesimler" role="group" aria-label="${\u00E7("Kesim")}">${Object.entries(KESIM).map(([k,x])=>{const e=dusman.get(k);return`<button class="tb-kesim" data-kesim="${k}" aria-pressed\
="${secim.kesim===k}"><b>${x.ad}</b><span class="agirlik">${\u00E7("A\u011F\u0131rl\u0131k {n}",{n:x.agirlik})}</span>
            ${e?`<span class="tb-dusman">${\u00E7("D\xFC\u015Fman: {n} vuru\u015F \xB7 {puan} puan",{n:Number(e.hits),puan:puan(e.power)})}</span>`:`<span class="tb-bos">${\u00E7("Bo\u015F")}</span>`}\
</button>`}).join("")}</div>
        <p class="kucuk" style="margin:14px 0 8px">${\u00E7("Duru\u015F")}</p>
        <div class="tb-duruslar" role="group" aria-label="${\u00E7("Duru\u015F")}">${Object.entries(DURUS).map(([k,x])=>`<button class="tb-durus" data-durus="${k}" aria-pressed="${secim.durus===k}"><b\
>${x.ad}</b><span>${x.yener}</span></button>`).join("")}</div>
        ${plan?`<div class="satir" style="margin-top:16px"><button class="dugme altin" id="tb-plan">${ikon("send")}${\u00E7("Plan\u0131 g\xF6nder")}</button></div>`:`
        <div class="tb-vur-alan">
          <button class="vur-dugme" id="tb-vur" style="--oran:${secim.vurus/(s?.hits_per_tick??10)}" aria-label="${\u00E7("Vur")}">
            <span>${\u00E7("VUR")}<small>${sayi(secim.vurus)} / ${sayi(s?.hits_per_tick??10)}</small></span></button>
          <span class="kucuk">${\u00E7("Vuru\u015Fun {puan} puan. {n} vuru\u015Fta ad\u0131m kendili\u011Finden g\xF6nderilir.",{puan:s?puan(s.power):"?",n:Number(s?.hits_per_tick??10)})}</span>
          <button class="dugme ikincil kucuk-d" id="tb-gonder" ${secim.vurus<1?"disabled":""}>${\u00E7("Ad\u0131m\u0131 g\xF6nder")}</button>
        </div>`}`}
      </section>`},sonucGecmisi=[],sonucKutusu=()=>{const r=sonuc,kazandi=Number(r.slice_x10)>5e6,bot=r.opponent?.[0]??r.opponent_plans?.[0];return`<div class="tb-sonuc">
        <div class="${kazandi?"bilgi-kutusu":"hata-kutusu"}">${ikon(kazandi?"trophy":"circle-alert")}
          <span>${kazandi?\u00E7("Bu ad\u0131m\u0131 sen ald\u0131n: dilim pay\u0131n <b>{pay}</b>.",{pay:payYuzde(Number(r.slice_x10)/10)}):\u00E7("Bu ad\u0131m\u0131 bot ald\u0131: dilim pay\u0131n <b>{pay}</b>.",
{pay:payYuzde(Number(r.slice_x10)/10)})}
          ${bot?\u00E7("Bot {kesim} kesimindeydi, duru\u015Fu <b>{durus}</b>.",{kesim:esc(KESIM[bot.sector]?.ad??bot.sector),durus:esc(DURUS[bot.stance]?.ad??bot.stance)}):""}</span></div>
        ${["left","center","right"].map(k=>{const x=r.sectors?.[k],pay=Number(typeof x=="object"?x?.share:x);return`<div class="pay-satir"><span>${KESIM[k].ad}</span><span class="pay-cubuk"><i style="\
width:${Math.round(pay/1e4)}%"></i></span><b>${payYuzde(pay)}</b></div>`}).join("")}
        ${r.real_cost?`<p class="kucuk">${r.real_cost.ammo?\u00E7("Ger\xE7ek cephede bu ad\u0131m <b>{enerji} enerji</b>, <b>{muhimmat} m\xFChimmat</b> ve <b>{lojistik} lojistik paketi</b> harcard\u0131.",
{enerji:Number(r.real_cost.energy),muhimmat:Number(r.real_cost.ammo),lojistik:Number(r.real_cost.logistics)}):\u00E7("Ger\xE7ek cephede bu ad\u0131m <b>{enerji} enerji</b> ve <b>{lojistik} lojistik paketi</b>\
 harcard\u0131.",{enerji:Number(r.real_cost.energy),lojistik:Number(r.real_cost.logistics)})}</p>`:""}
        <div class="satir"><button class="dugme altin" id="tb-sonraki">${ikon("arrow-right")}${r.session.status==="finished"?\u00E7("Sonucu g\xF6r"):\u00E7("Sonraki ad\u0131m")}</button></div>
      </div>`};kap.innerHTML=`<div class="sayfa">
      <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Cephe")}</p><h1 class="b1">${\u00E7("Sava\u015F ve tatbikat")}</h1><p class="aciklama" id="cephe-aciklama"></p></div></div>
      <div id="cephe-arena"></div>
      <div class="izgara iki" style="margin-top:20px"><div class="yigin" id="cephe-tatbikat"></div><section class="kart" id="cephe-kampanyalar"></section></div>
      <div class="izgara iki" id="cephe-millet" style="margin-top:20px"></div>
      <section class="kart" id="cephe-seferler" style="margin-top:20px"></section>
    </div>`;const tb=$("#cephe-tatbikat",kap),kl=$("#cephe-kampanyalar",kap),ar=$("#cephe-arena",kap),sf=$("#cephe-seferler",kap),mil=$("#cephe-millet",kap);async function seferlerCiz(){try{sf.innerHTML=
sonSeferlerHtml(await Sunucu.cagir("war_results",{p_limit:10}))}catch{sf.innerHTML=""}}let secili=null,arenaBirak=null;function kampanyalarCiz(){if($("#cephe-aciklama",kap).textContent=a.live_war?\u00E7(
"\xDClkenin s\xFCren bir sava\u015F\u0131 var: cepheye gir, vur."):a.campaigns?.length?\u00E7("\xDClkenin haz\u0131rl\u0131ktaki bir kampanyas\u0131 var."):\u00E7("\u015Eu an \xFClkenin s\xFCren bir sava\u015F\u0131 yok; \
tatbikatla haz\u0131rlanabilirsin."),typeof Rehber=="object"&&Rehber.kilitli("war")){kl.innerHTML=Rehber.kilitIcerik("war"),kl.classList.add("kilit-karti"),Rehber.kilitBagla(kl);return}kl.classList.remove(
"kilit-karti"),kl.innerHTML=`<div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xDClkenin sava\u015Flar\u0131")}</p><h2 class="b2">${\u00E7("Kampanyalar")}</h2></div><span class="ik-kutu">${ikon(
"swords")}</span></div>
        ${a.campaigns?.length?`<div class="yigin">${a.campaigns.map(c=>{const acik=c.status==="active"&&c.next_round_at&&Date.parse(c.next_round_at)<=Date.now();return`<div class="ilk-adim"><span clas\
s="ozet-ikon" style="background:var(--mercan-acik);color:var(--mercan-2)">${ikon("swords")}</span>
            <span><b>${esc(bolgeAdi(c.target_region_id))}</b><span class="kucuk">${c.drive_id?c.my_side==="attacker"?\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131 \xB7 ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131ndas\u0131n"):
\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131 \xB7 \xFClkeyi savunuyoruz"):c.resistance_id?c.my_side==="attacker"?\u00E7("Yerel direni\u015F \xB7 b\xF6lgemizi geri al\u0131yoruz"):\u00E7("Y\
erel direni\u015F \xB7 i\u015Fgal b\xF6lgemizi savunuyoruz"):c.ally_country_id?\u00E7("Koalisyon yard\u0131m\u0131 \xB7 m\xFCttefik olarak savunuyorsun"):c.ally_join_code==="OK"?\u00E7("Koalisyon yard\
\u0131m\u0131 \xB7 m\xFCttefik olarak kat\u0131labilirsin"):c.ally_join_code?`${\u00E7("Koalisyon yard\u0131m\u0131")} \xB7 ${esc(muttefikNeden(c.ally_join_code))}`:c.my_side==="attacker"?\u00E7("Sald\
\u0131r\u0131yoruz"):\u00E7("Savunuyoruz")} \xB7 ${c.status==="preparing"?\u00E7("haz\u0131rl\u0131k"):acik?\u00E7("tur s\xFCr\xFCyor"):\u00E7("turlar aras\u0131")}${c.next_round_at&&!acik?" \xB7 "+\u00E7(
"s\u0131radaki tur {zaman}",{zaman:esc(saatYaz(c.next_round_at))}):""}</span></span>
            ${secili===c.campaign_id?`<span class="cip altin">${\u00E7("A\xE7\u0131k")}</span>`:`<button class="dugme kucuk-d ${acik?"mercan":"ikincil"}" data-kampanya="${esc(c.campaign_id)}">${acik?\u00E7(
"Cepheye gir"):\u00E7("A\xE7")}</button>`}</div>`}).join("")}</div>`:`<p class="bos">${\u00E7("\xDClkenin a\xE7\u0131k bir kampanyas\u0131 yok. Sava\u015F\u0131 ba\u015Fkan, meclisin verdi\u011Fi yetkiyle ilan eder (\xDClkem \u2192 Meclis).")}\
</p>`}`;for(const b of $$("[data-kampanya]",kl))b.onclick=()=>arenaAc(b.dataset.kampanya)}async function arenaAc(id){if(arenaBirak){try{arenaBirak()}catch(e){console.error(e)}arenaBirak=null}secili=id;
try{sessionStorage.setItem("civora.kampanya",id)}catch{}kampanyalarCiz(),ar.innerHTML=`<div class="kart yuk-kart">${\u00E7("Cephe y\xFCkleniyor\u2026")}</div>`;try{arenaBirak=await CepheArena.ac(ar,id)}catch(e){
ar.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(e))}</span></div>`}}const ciz=()=>{tb.innerHTML=tatbikatKarti(),bagla()};function bagla(){$("#tb-basla",tb)?.addEventListener(
"click",baslat);for(const b of $$("[data-kesim]",tb))b.onclick=()=>{secim.kesim=b.dataset.kesim,ciz()};for(const b of $$("[data-durus]",tb))b.onclick=()=>{secim.durus=b.dataset.durus,ciz()};const vur=$(
"#tb-vur",tb);vur&&vur.addEventListener("pointerdown",e=>{e.preventDefault(),vurus()}),$("#tb-gonder",tb)?.addEventListener("click",gonder),$("#tb-plan",tb)?.addEventListener("click",gonder),$("#tb-so\
nraki",tb)?.addEventListener("click",sonraki)}async function baslat(){try{oturum=await Sunucu.yap("drill_start"),sonuc=null,bitis=null,secim.vurus=0,ciz()}catch(e){tost(hataMetni(e),"circle-alert")}}function vurus(){
if(gonderiliyor||sonuc)return;const tavan=a.soldier?.hits_per_tick??10;if(secim.vurus>=tavan)return;secim.vurus++;const v=$("#tb-vur",tb);v.style.setProperty("--oran",String(secim.vurus/tavan)),$("sma\
ll",v).textContent=`${secim.vurus} / ${tavan}`,$("#tb-gonder",tb).disabled=!1,navigator.vibrate&&navigator.vibrate(8),secim.vurus>=tavan&&gonder()}async function gonder(){if(!gonderiliyor){gonderiliyor=
!0;try{sonuc=oturum.mode==="hits"?await Sunucu.yap("drill_hit",{p_session:oturum.session_id,p_sector:secim.kesim,p_stance:secim.durus,p_hits:Math.max(1,secim.vurus)}):await Sunucu.yap("drill_step",{p_session:oturum.
session_id,p_sector:secim.kesim,p_stance:secim.durus}),sonucGecmisi[sonuc.step_no-1]=Number(sonuc.slice_x10),sonuc.basic_training_completed_now&&(bitis={ilk:!0}),ciz()}catch(e){tost(hataMetni(e),"circ\
le-alert")}finally{gonderiliyor=!1}}}async function sonraki(){const s=sonuc.session;s.status==="finished"?(bitis={...bitis??{},won:s.won,total_x10:s.total_x10,steps_total:s.steps_total},oturum=null,Millet.
cepheCiz(mil),sonucGecmisi.length=0,a=await Durum.askerlik(),typeof Rehber=="object"&&Rehber.kilitli("war")&&Durum.ozet().then(()=>{Rehber.kilitli("war")||(kampanyalarCiz(),tost(\u00E7("Sava\u015F a\xE7\u0131ld\u0131: \
\xFClkenin kampanyalar\u0131na kat\u0131labilirsin."),"lock-open"))}).catch(()=>{})):oturum=s,sonuc=null,secim.vurus=0,ciz()}a.drill?.open_session&&(oturum=a.drill.open_session),ciz(),kampanyalarCiz(),
seferlerCiz(),Millet.cepheCiz(mil);let onceki=null;try{onceki=sessionStorage.getItem("civora.kampanya")}catch{}const kl0=a.campaigns??[],ilk=kl0.find(c=>c.campaign_id===onceki)??kl0.find(c=>c.status===
"active"&&c.next_round_at&&Date.parse(c.next_round_at)<=Date.now())??kl0[0];ilk&&await arenaAc(ilk.campaign_id);const b1=Durum.dinle("askerlik",x=>{const anahtar=l=>(l??[]).map(c=>c.campaign_id+c.status+
c.my_side+(c.ally_join_code??"")).join(),eskiSayi=anahtar(a.campaigns);a=x,!oturum&&!sonuc&&ciz(),anahtar(a.campaigns)!==eskiSayi&&(kampanyalarCiz(),seferlerCiz(),!secili&&a.campaigns?.length&&arenaAc(
a.campaigns[0].campaign_id))}),b2=Durum.dinle("ulke-olay",({olay})=>{/^nation\.drill_tournament_ended$/.test(olay)&&Millet.cepheCiz(mil)}),b3=Durum.dinle("olay",({olay})=>{/^nation\.patrol_/.test(olay)&&
Millet.cepheCiz(mil)});return()=>{b1(),b2(),b3(),mil._dur?.(),arenaBirak&&arenaBirak()}}}),Parcalar.tamam("ek_22_cephe");
