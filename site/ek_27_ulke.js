// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_27_ulke.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("ulke/ozet",{async ac(kap){let o=null,g=null,isb=null,hk=null,cs=null,yv=null,ek=null;const baskent=BaskentSahnesi.ac();baskent.dinle("sec",ad=>{const rota={meclis:"ulke/meclis",kisla:"ul\
ke/cephe",depo:"sehir/is",hazine:"ulke/ekonomi"}[ad];rota&&Kabuk.git(rota)});async function yukle(){[o,g,isb,hk,cs,ek,yv]=await Promise.all([Sunucu.cagir("country_overview"),Sunucu.cagir("customs").catch(
()=>null),Sunucu.cagir("coop_status").catch(()=>null),Sunucu.cagir("movement_status").catch(()=>null),Sunucu.cagir("capital_scene").catch(()=>null),Sunucu.cagir("seizure_status").catch(()=>null),Sunucu.
cagir("contest_status").catch(()=>null),Durum.ozet()])}function hareketBandi(){if(!hk)return"";const x=hk.petition?.status==="open"?hk.petition:null,m=hk.no_confidence,e=hk.early_election,metin=x?\u00E7(
"<b>\u0130mza kampanyas\u0131 s\xFCr\xFCyor</b> \xB7 {n}/{esik} imza.",{n:sayi(x.signatures),esik:sayi(x.threshold)})+` <b data-bitis="${esc(x.closes_at)}"></b>`:m?\u00E7("<b>Mecliste g\xFCvensizlik oyu<\
/b> \xB7 {e}/{n} evet.",{e:sayi(m.yes),n:sayi(m.required_yes)})+` <b data-bitis="${esc(m.closes_at)}"></b>`:e?\u00E7("<b>Ola\u011Fan\xFCst\xFC se\xE7im</b> \xB7 {asama}.",{asama:esc(ASAMA[e.stage]??e.
stage)}):"";return metin?`<div class="yasa-bant" data-ozet-hareket>${ikon("megaphone")}<span>${metin}</span><button class="dugme kucuk-d ikincil" data-git="ulke/hareket">${\u00E7("A\xE7")}</button></d\
iv>`:""}function elKoymaBandi(){const a=ek?.active,gy=ek?.interim;return a?`<div class="yasa-bant uyari" data-ozet-elkoyma="mucadele">${ikon("swords")}<span>${\u00E7("<b>Ba\u015Fkentte y\xF6netime el koyma gi\
ri\u015Fimi</b> \xB7 {ad} ve arkada\u015Flar\u0131; m\xFCcadele s\xFCr\xFCyor.",{ad:esc(a.founder??"")})}
          <b data-bitis="${esc(a.ends_at)}"></b></span><button class="dugme kucuk-d mercan" data-git="ulke/hareket">${\u00E7("A\xE7")}</button></div>`:gy?`<div class="yasa-bant uyari" data-ozet-elkoym\
a="gecici">${ikon("lock")}<span>${\u00E7("<b>Ge\xE7ici y\xF6netim</b> \xB7 {ad} y\xF6netime el koydu; sava\u015F ve vergi karar\u0131 alamaz. Fonda kalan {kr} kr.",{ad:esc(gy.head??""),kr:kr(Number(gy.
fund_cr)-Number(gy.fund_used_cr))})} <b data-bitis="${esc(gy.until)}"></b></span>
          <button class="dugme kucuk-d ikincil" data-git="ulke/hareket">${\u00E7("A\xE7")}</button></div>`:""}function ciz(){const l=o.leadership,e=o.election,savas=o.campaigns??[];kap.innerHTML=`<div\
 class="sayfa">
        <div class="sayfa-bas"><div>${ulkeUst(o.country_id,\u00E7("ba\u015Fkent {yer}",{yer:bolgeAdi(o.capital_region_id)}))}<h1 class="b1">${esc(ulkeAdi(o.country_id))}</h1>
          <p class="aciklama">${\u00E7("{n} vatanda\u015F",{n:Number(o.citizens)})} \xB7 ${\u00E7("{n} b\xF6lge",{n:Number(o.regions)})}${o.founders?" \xB7 "+\u00E7("{n}/{max} kurucu vatanda\u015F",{n:Number(
o.founders.taken),max:Number(o.founders.max)})+(o.founders.me?" \xB7 "+\u00E7("sen {n}. kurucususun",{n:Number(o.founders.me)}):""):""}</p></div>
          <span class="cip ${l.president?ek?.interim?"mercan":"altin":""}">${ikon(ek?.interim?"lock":l.president?"crown":"landmark")}${ek?.interim&&l.president?\u00E7("Ge\xE7ici y\xF6netim: {ad}",{ad:esc(
l.president.name)}):l.president?\u00E7("Ba\u015Fkan: {ad}",{ad:esc(l.president.name)}):l.acting?.kind==="deputy"?\u00E7("Ba\u015Fkan vekili: {ad}",{ad:esc(l.acting.name)}):\u00E7("Ge\xE7ici sistem y\xF6neti\
mi")}</span></div>
        ${ogreticiBandi(e)}
        ${uykuBandi(o)}
        ${devletBandi(o)}
        ${elKoymaBandi()}
        ${hareketBandi()}<div id="yarisma-ulke-yer">${Yarisma.kart(yv,!0)}</div>
        <div class="izgara iki" id="millet-ozet" style="margin-bottom:16px"></div>
        <div class="izgara iki" id="gundem-ozet" style="margin-bottom:16px"></div>
        <div id="baskent-yer"></div>
        <div class="izgara dort" style="margin-top:16px">
          <section class="kart"><p class="ust-yazi">${\u00E7("Ba\u015Fkan")}</p>
            ${l.president?`<div class="satir" style="margin-top:12px">${avatarKutu(l.president.name,l.president.character_id)}<div><b style="font-size:16px">${esc(l.president.name)}</b>
              <div class="kucuk">${\u00E7("D\xF6nem sonu {zaman}",{zaman:esc(saatYaz(l.president.term_end))})}</div></div></div>`:`<p class="b3" style="margin-top:8px">${\u00E7("Ba\u015Fkanl\u0131k bo\u015F")}\
</p><p class="kucuk" style="margin:4px 0 0">${l.acting?.kind==="deputy"?\u00E7("Ba\u015Fkan vekili {ad} y\xF6netiyor ({yetki}).",{ad:esc(l.acting.name),yetki:\u00E7("vergi \xF6nerisi; sava\u015F \xF6nerisi ve il\
an\u0131 yok")}):\u00E7("Se\xE7ilmi\u015F ba\u015Fkan yok: temel bak\u0131m ve savunma s\xFCrer, yeni karar al\u0131nmaz.")}</p>`}
            <button class="dugme ikincil kucuk-d" type="button" id="makam-ac" style="margin-top:10px">${ikon("landmark")}${\u00E7("Ba\u015Fkanl\u0131k makam\u0131")}</button>
          </section>
          <section class="kart"><p class="ust-yazi">${\u00E7("Hazine")}</p><p class="b2" style="margin-top:8px">${\u00E7("{kr} kr",{kr:kr(o.treasury_cr)})}</p>
            <p class="kucuk" style="margin:4px 0 10px">${\u00E7("Ba\u015Fkent belediyesi {kr} kr. Gelir: sat\u0131\u015F ve maa\u015F vergisi.",{kr:kr(o.capital_municipality_cr)})}</p>
            <button class="dugme ikincil kucuk-d" data-git="ulke/ekonomi">${ikon("chart-line")}${\u00E7("Ekonomi panosu")}</button></section>
          <section class="kart"><p class="ust-yazi">${\u00E7("Sava\u015F")}</p>
            ${savas.length?`<p class="b3" style="margin-top:8px">${esc(bolgeAdi(savas[0].target_region_id))}</p>
              <p class="kucuk" style="margin:4px 0 10px">${savas[0].attacker_country_id===o.country_id?\u00E7("Sald\u0131r\u0131yoruz"):\u00E7("Savunuyoruz")} \xB7 ${savas[0].status==="preparing"?\u00E7(
"haz\u0131rl\u0131k"):\u00E7("skor {a}\u2013{b}",{a:Number(savas[0].attacker_wins),b:Number(savas[0].defender_wins)})}${savas.length>1?" \xB7 "+\u00E7("{n} kampanya daha",{n:savas.length-1}):""}</p>
              <button class="dugme mercan kucuk-d" data-git="ulke/cephe">${ikon("swords")}${\u00E7("Cepheye git")}</button>`:`<p class="b3" style="margin-top:8px">${\u00E7("Bar\u0131\u015F")}</p><p cl\
ass="kucuk" style="margin:4px 0 0">${o.war_authorizations?\u00E7("Mecliste kabul edilmi\u015F {n} sava\u015F yetkisi var.",{n:Number(o.war_authorizations)}):\u00E7("\xDClkenin s\xFCren bir sava\u015F\u0131 yok.")}\
</p>`}
          </section>
          <section class="kart"><p class="ust-yazi">${e?.kind==="founding"?\u00E7("Kurucu Meclis se\xE7imi"):e?.kind==="early"?\u00E7("Ola\u011Fan\xFCst\xFC se\xE7im"):\u00E7("S\u0131radaki se\xE7im")}\
</p>
            ${e?`<p class="b3" style="margin-top:8px">${esc(ASAMA[e.stage]??e.stage)}</p>
              <p class="kucuk" style="margin:4px 0 10px">${esc(SIRADAKI_AD[e.stage]??"")}${siradakiAn(e)?` <b data-bitis="${siradakiAn(e)}"></b>`:""}</p>
              <button class="dugme ikincil kucuk-d" data-git="ulke/secim">${ikon("vote")}${\u00E7("Se\xE7ime git")}</button>`:`<p class="kucuk">${\u00E7("Planl\u0131 se\xE7im yok.")}</p>`}
          </section>
        </div>
        <div class="izgara iki" style="margin-top:20px">
          <section class="kart">
            <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Y\xFCr\xFCrl\xFCkte")}</p><h2 class="b2">${\u00E7("\xDClkenin yasalar\u0131")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}\
</span></div>
            <div class="liste">
              <div class="liste-satir"><span class="liste-ikon">${ikon("percent")}</span><div><span class="tur">${\u00E7("Vergi")}</span><b>${\u00E7("Sat\u0131\u015F vergisi {oran}",{oran:ppmYuzde(o.sales_tax_ppm)})}\
</b>
                <div class="alt">${\u00E7("Sat\u0131c\u0131n\u0131n pay\u0131ndan d\xFC\u015Fer; %20'si ba\u015Fkent belediyesine, kalan\u0131 hazineye.")}</div></div><span></span></div>
              <div class="liste-satir"><span class="liste-ikon">${ikon("hand-coins")}</span><div><span class="tur">${\u00E7("Vergi")}</span><b>${\u00E7("Maa\u015F vergisi {oran}",{oran:ppmYuzde(o.wage_tax_ppm)})}\
</b>
                <div class="alt">${\u00E7("\xDCcretten kesilir; i\u015Fin bulundu\u011Fu \xFClkeye gider.")}</div></div><span></span></div>
              <div class="liste-satir" data-ozet-vatandaslik><span class="liste-ikon yesil">${ikon("id-card")}</span><div><span class="tur">${\u00E7("Vatanda\u015Fl\u0131k")}</span><b>${esc(POLITIKA[o.
citizenship_policy]?.ad??o.citizenship_policy)}</b>
                <div class="alt">${esc(POLITIKA[o.citizenship_policy]?.aciklama??"")} ${\u00E7("Vatanda\u015Fl\u0131\u011F\u0131n, ba\u015Fka \xFClkeye ba\u015Fvuru ve ba\u015Fvurular\u0131n karar\u0131:")}\
</div></div>
                <button class="dugme ikincil kucuk-d" type="button" id="vatandaslik-ac">${ikon("id-card")}${\u00E7("Vatanda\u015Fl\u0131k")}</button></div>
              ${g?`<div class="liste-satir"><span class="liste-ikon">${ikon("shield")}</span><div><span class="tur">${\u00E7("G\xFCmr\xFCk")}</span><b>${esc(SIKILIK_AD[g.law.strictness]??g.law.strictness)}\
</b>
                <div class="alt">${esc(gumrukOzet(g.law))}${g.law.budgetCr?" \xB7 "+\u00E7("g\xFCnl\xFCk b\xFCt\xE7e {kr} kr",{kr:kr(g.law.budgetCr)}):""}.
                  ${\u00E7("Son 7 g\xFCnde {n} ka\xE7ak\xE7\u0131 yakaland\u0131; {kr} kredi ceza hazineye ge\xE7ti.",{n:Number(g.stats_7d.caught),kr:kr(g.stats_7d.fines_cr)})}
                  ${g.black_market_7d?kbHaftasi(g.black_market_7d):""}
                  ${g.police?kollukOzeti(g.police):""}
                  ${g.pending?\u00E7("Kabul edilen yeni yasa {zaman} tarihinde y\xFCr\xFCrl\xFC\u011Fe girer: {yasa}.",{zaman:esc(saatYaz(g.pending.effective_from)),yasa:esc(gumrukOzet(g.pending))}):""}\
</div></div><span></span></div>`:""}
              ${isb?`<div class="liste-satir" data-ozet-isbirligi><span class="liste-ikon yesil">${ikon("heart-handshake")}</span><div><span class="tur">${\u00E7("\u0130\u015Fbirli\u011Fi")}</span>
                <b>${isb.partners.length?isb.partners.map(t=>esc(ulkeAdi(t.partner))).join(", "):\u00E7("Ortak yok")}</b>
                <div class="alt">${\u00E7("Son {n} g\xFCnde verilen yard\u0131m {a} kr, al\u0131nan {b} kr.",{n:Number(isb.aid.window_days),a:kr(isb.aid.given_cr),b:kr(isb.aid.received_cr)})}
                  ${isb.lines.filter(l2=>l2.status==="built").length?" "+\u00E7("{n} ortak hat a\xE7\u0131k.",{n:isb.lines.filter(l2=>l2.status==="built").length}):""}</div></div>
                <button class="dugme ikincil kucuk-d" data-git="ulke/isbirligi">${ikon("heart-handshake")}${\u00E7("A\xE7")}</button></div>`:""}
              <div class="liste-satir"><span class="liste-ikon mercan">${ikon("swords")}</span><div><span class="tur">${\u00E7("Sava\u015F")}</span><b>${o.at_war?\u00E7("Sava\u015Fta"):\u00E7("Bar\u0131\u015Fta")}\
</b>
                <div class="alt">${o.war_authorizations?\u00E7("{n} sava\u015F yetkisi y\xFCr\xFCrl\xFCkte.",{n:Number(o.war_authorizations)}):\u00E7("Y\xFCr\xFCrl\xFCkte sava\u015F yetkisi yok.")}</d\
iv></div><span></span></div>
              ${ek?.recent?.length?`<div class="liste-satir" data-ozet-elkoyma-kayit><span class="liste-ikon">${ikon("shield-half")}</span><div><span class="tur">${\u00E7("Y\xF6netime el koyma")}</spa\
n>
                <b>${Number(ek.repelled_count)?\u00E7("{n} giri\u015Fim p\xFCsk\xFCrt\xFCld\xFC",{n:sayi(ek.repelled_count)}):\u00E7("P\xFCsk\xFCrt\xFClen giri\u015Fim yok")}</b>
                <div class="alt">${\u00E7("Son giri\u015Fim: {durum} \xB7 {zaman}",{durum:esc(ekDurum(ek.recent[0].status)[0]),zaman:esc(saatYaz(ek.recent[0].resolved_at))})}</div></div>
                <button class="dugme ikincil kucuk-d" data-git="ulke/hareket">${\u00E7("A\xE7")}</button></div>`:""}
            </div>
          </section>
          <section class="kart">
            <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("{n} / {toplam} sandalye dolu",{n:o.parliament.members.length,toplam:Number(o.parliament.seats)})}</p><h2 class="b2">${\u00E7("Mecli\
s")}</h2></div>
              <button class="dugme ikincil kucuk-d" data-git="ulke/meclis">${ikon("gavel")}${o.open_motions?\u00E7("{n} a\xE7\u0131k oylama",{n:Number(o.open_motions)}):\u00E7("Meclise git")}</button>\
</div>
            ${o.parliament.members.length?`<div class="koltuk-liste">${o.parliament.members.map(m=>`<div class="koltuk">${avatarKutu(m.name,m.character_id)}
              <div><b>${esc(m.name)}${m.character_id===benimKimlik()?" "+\u00E7("(sen)"):""}</b><div class="kucuk">${esc(m.party??\u00E7("Ba\u011F\u0131ms\u0131z"))}${l.deputy?.character_id===m.character_id?
" \xB7 "+\u00E7("ba\u015Fkan vekili"):""}</div></div><span></span></div>`).join("")}</div>`:`<p class="bos">${\u00E7("Meclis bo\u015F. \u0130lk se\xE7imde sandalyeler dolacak.")}</p>`}
          </section>
        </div></div>`,Yarisma.bagla(kap),$("#baskent-yer",kap)?.replaceWith(baskent.el),baskent.yaz({o,cs});for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$(
"[data-ozet-devlet-bolge]",kap))b.onclick=()=>ozkBolgeAc(b.dataset.ozetDevletBolge);$("#vatandaslik-ac",kap).onclick=()=>vatandaslikAc(),$("#makam-ac",kap).onclick=()=>MakamPenceresi.ac(),Millet.ozetCiz(
$("#millet-ozet",kap)),Gundem.ozetCiz($("#gundem-ozet",kap)),ogreticiBagla(kap,()=>ciz()),durdur();const an=e?siradakiAn(e):null;an!==sonAn&&(sonAn=an,sayac.n=0),durdur=geriSay(kap,()=>setTimeout(tazele,
gecikmeli(sayac)))}let durdur=()=>{},sonAn=null;const sayac={n:0},tazele=tazeleyici(async()=>{await yukle(),ciz()});await yukle(),ciz();const b1=Durum.dinle("ulke-olay",({olay})=>{/^(election\.|office\.|parliament\.|tax\.|citizenship\.policy|party\.|country\.|movement\.|seizure\.(struggle|exposed|result|fund_paid))/.
test(olay)&&(tazele(),MakamPenceresi.tazele())}),b4=Durum.dinle("ulke-olay",({olay})=>{/^nation\./.test(olay)&&(Millet.ozetCiz($("#millet-ozet",kap)),MakamPenceresi.tazele())}),b5=Durum.dinle("ulke-ol\
ay",({olay})=>{/^(issue|gov)\./.test(olay)&&Gundem.ozetCiz($("#gundem-ozet",kap))}),yarismaKusak=Sunucu.Giris.kusak,yarismaTazele=tazeleyici(async()=>{if(!(kapandi||!kap.isConnected||yarismaKusak!==Sunucu.
Giris.kusak))try{const x=await Sunucu.cagir("contest_status"),yer=$("#yarisma-ulke-yer",kap);if(kapandi||!kap.isConnected||!yer||yarismaKusak!==Sunucu.Giris.kusak)return;yv=x,yer.innerHTML=Yarisma.kart(
yv,!0),Yarisma.bagla(yer)}catch{}}),yarismaBirak=Durum.dinle("olay",({olay})=>{/^contest\./.test(olay)&&!kapandi&&yarismaTazele()}),yarismaSaat=setInterval(()=>{!kapandi&&!document.hidden&&yarismaTazele()},
6e4),b2=Durum.dinle("devlet",()=>tazele()),b3=Durum.dinle("ozet",oz=>{o&&oz?.character?.citizenship&&oz.character.citizenship!==o.country_id&&tazele()});let kapandi=!1;const baskentSaat=setInterval(()=>{
document.hidden||!o||Sunucu.cagir("capital_scene").then(x=>{kapandi||!x||(cs=x,baskent.yaz({o,cs}))}).catch(()=>{})},6e4);return()=>{kapandi=!0,durdur(),b1(),b2(),b3(),b4(),b5(),yarismaBirak(),clearInterval(
yarismaSaat),$("#millet-ozet",kap)?._dur?.(),$("#gundem-ozet",kap)?._dur?.(),clearInterval(baskentSaat),baskent.kapat(),MakamPenceresi.kapat()}}}),Kabuk.kaydet("ulke/secim",{async ac(kap){let v=null,durdur=()=>{};
const isaret={president:new Set,parliament:new Set},gece=SecimGecesi.ac(),sandik=SandikBasi.ac(),SANDIK_ASAMA=["candidacy","voting","runoff"];sandik.dinle("sec",ad=>{(ad==="adaylar"?$("#aday-listesi",
kap):$("#pusula",kap)??$("#secim-takvim",kap))?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})});async function yukle(){const[s,p,partim,kurallar,,es,bld,by]=await Promise.all([
Sunucu.cagir("election_status"),Sunucu.cagir("parties"),Sunucu.cagir("my_party"),Durum.kurallar(),Durum.ozet(),Sunucu.cagir("election_scene").catch(()=>null),Sunucu.cagir("municipal_status").catch(()=>null),
Sunucu.cagir("by_election_status").catch(()=>null)]);v={s,partiler:p.parties??[],istegim:p.my_request??null,partim,c:kurallar.data.civic,es,bld,by};const araAn=by?.election?.election_id??"";araAn!==araAnahtar&&
(araIsaret.president.clear(),araIsaret.parliament.clear(),araAnahtar=araAn);const anahtar=s.election?`${s.election.election_id}|${s.election.stage}`:"";anahtar!==isaretAnahtar&&(isaret.president.clear(),
isaret.parliament.clear(),isaretAnahtar=anahtar)}let isaretAnahtar=null,araAnahtar=null;const sandikVeri=()=>({e:v.s.election,es:v.es?.election,ulke:v.s.country_id}),sart=(tamam,ad,alt,dugme="")=>`<di\
v class="sart ${tamam?"tamam":"eksik"}">${ikon(tamam?"badge-check":"circle-alert")}
      <span><b>${esc(ad)}</b><span class="kucuk">${esc(alt)}</span></span>${dugme||"<span></span>"}</div>`;function takvim(e){const simdi=Date.now(),sira=["scheduled","candidacy","voting","runoff","ce\
rtified"],ogeler=[{asama:"scheduled",ad:\u00E7("Se\xE7men listesi donar"),an:e.freeze_at,alt:\u00E7("O ana kadar \u015Fartlar\u0131 sa\u011Flayan vatanda\u015Flar listeye girer.")},{asama:"candidacy",
ad:\u00E7("Adayl\u0131k"),an:e.freeze_at,son:e.voting_start,alt:\u00E7("Listedekiler ba\u015Fkanl\u0131\u011Fa ya da meclise aday olur; partiler aday g\xF6sterir.")},{asama:"voting",ad:\u00E7("Oylama"),
an:e.voting_start,son:e.voting_end,alt:\u00E7("Gizli oy: ba\u015Fkan i\xE7in bir, meclis i\xE7in en \xE7ok {n} aday.",{n:Number(v.c.parliamentChoicesMax)})},...e.runoff_end?[{asama:"runoff",ad:\u00E7(
"\u0130kinci tur"),an:e.voting_end,son:e.runoff_end,alt:\u00E7("E\u015Fitlik olan yar\u0131\u015Fta yaln\u0131z e\u015Fit adaylar aras\u0131nda.")}]:[],{asama:"certified",ad:\u00E7("Yeni d\xF6nem ba\u015Flar"),
an:e.term_start,alt:\u00E7("Kazananlar {n} g\xFCn g\xF6rev yapar.",{n:Number(v.c.termDays)})}],simdiki=sira.indexOf(e.stage);return`<div class="gunluk">${ogeler.map(x=>{const i=sira.indexOf(x.asama);return`\
<div class="gunluk-oge ${i===simdiki?"altin":i<simdiki||x.asama==="scheduled"&&Date.parse(x.an)<=simdi?"gecti":""}"><time>${esc(saatYaz(x.an))}${x.son?" \u2013 "+esc(saatYaz(x.son)):""}</time><b>${esc(
x.ad)}</b><p>${esc(x.alt)}</p></div>`}).join("")}</div>`}function durumHtml(e){const ch=Durum.v.ozet.character;if(e.eligible)return`<div class="bilgi-kutusu">${ikon("badge-check")}<span>${\u00E7("Se\xE7m\
en listesindesin.")}${e.stage==="candidacy"?" "+\u00E7("Aday olabilir, oylama ba\u015Flay\u0131nca oy verebilirsin."):""}</span></div>`;if(e.stage==="scheduled"){const w=e.kind==="founding"?v.c.founding:
v.c.normal,donma=Date.parse(e.freeze_at),hesap=Date.parse(ch.created_at)<=donma-w.accountAgeH*36e5,vatandas=Date.parse(ch.citizenship_since)<=donma-w.citizenshipH*36e5,ogr=!!ch.civic_tutorial_done;return`\
<div class="yigin"><p class="aciklama">${\u00E7("Se\xE7men listesi donarken bu \xFC\xE7 \u015Fart\u0131 sa\u011Flayan vatanda\u015Flar oy verir:")}</p>
          ${sart(hesap,\u00E7("Hesab\u0131n en az {n} saatlik",{n:Number(w.accountAgeH)}),hesap?\u00E7("Liste donarken sa\u011Flanacak."):\u00E7("Liste donarken sa\u011Flanmayacak; s\u0131radaki se\xE7imde oy vere\
bilirsin."))}
          ${sart(vatandas,\u00E7("Vatanda\u015Fl\u0131\u011F\u0131n en az {n} saatlik",{n:Number(w.citizenshipH)}),vatandas?\u00E7("Liste donarken sa\u011Flanacak."):\u00E7("Liste donarken sa\u011Flanmayac\
ak."))}
          ${sart(ogr,\u00E7("Vatanda\u015Fl\u0131k \xF6\u011Freticisi"),ogr?\u00E7("Bitirdin."):\u00E7("Liste donmadan bitir; birka\xE7 dakika s\xFCrer."),ogr?"":`<button class="dugme kucuk-d" data-og\
retici>${\u00E7("A\xE7")}</button>`)}</div>`}return`<div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("Bu se\xE7imin se\xE7men listesinde de\u011Filsin (listenin dondu\u011Fu an: {zaman}). S\u0131radaki se\xE7im\
de oy verebilirsin.",{zaman:esc(saatYaz(e.freeze_at))})}</span></div>`}function adaylikHtml(e){if(e.stage!=="candidacy"||!e.eligible)return"";const benim=e.my_candidacies??(e.my_candidacy?[e.my_candidacy]:
[]),iki=!!e.both_races,parti=y=>e.candidates.find(x=>x.character_id===benimKimlik()&&x.race===y)?.party;if(benim.length){const oteki=benim[0]==="president"?"parliament":"president";return`<section cla\
ss="kart" data-adaylik="${esc(benim.join(","))}"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Adayl\u0131\u011F\u0131n")}</p>
            <h2 class="b2">${benim.length===2?\u00E7("Ba\u015Fkanl\u0131k ve meclis aday\u0131s\u0131n"):benim[0]==="president"?\u00E7("Ba\u015Fkanl\u0131k aday\u0131s\u0131n"):\u00E7("Meclis aday\u0131s\u0131n")}\
</h2></div><span class="ik-kutu">${ikon("badge-check")}</span></div>
          ${benim.map(y=>`<div class="satir ara" style="margin-top:8px" data-adaylik-yaris="${y}"><span><b>${esc(YARIS[y])}</b> \xB7 <span class="kucuk">${parti(y)?\u00E7("{parti} seni partinin aday\u0131 \
g\xF6sterdi.",{parti:esc(parti(y))}):\u00E7("Ba\u011F\u0131ms\u0131z aday.")}</span></span>
            <button class="dugme sade kucuk-d" data-adaylik-cekil="${y}">${ikon("x")}${\u00E7("\xC7ekil")}</button></div>`).join("")}
          <p class="kucuk" style="margin-top:8px">${\u00E7("Oylama ba\u015Flayana kadar \xE7ekilebilirsin.")}${benim.length===2?" "+\u00E7("\u0130kisini de kazan\u0131rsan ba\u015Fkanl\u0131\u011F\u0131 al\u0131rs\u0131n; meclis koltu\u011Fun s\u0131\
radaki uygun adaya ge\xE7er."):""}${parti(benim[0])?"":" "+\u00E7("Bir partinin \xFCyesiysen parti ba\u015Fkan\u0131n seni partinin aday\u0131 g\xF6sterebilir.")}</p>
          ${iki&&benim.length===1?`<div class="satir" style="margin-top:10px"><button class="dugme ikincil" data-aday="${oteki}">${ikon(oteki==="president"?"crown":"landmark")}${oteki==="president"?\u00E7(
"Ba\u015Fkanl\u0131\u011Fa da aday ol"):\u00E7("Meclise de aday ol")}</button></div>`:""}
        </section>`}return`<section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Adayl\u0131k d\xF6nemi")}</p><h2 class="b2">${\u00E7("Aday ol")}</h2></div><span class="ik-kut\
u">${ikon("megaphone")}</span></div>
        <p class="aciklama">${iki?\u00E7("Adayl\u0131\u011F\u0131n herkese g\xF6r\xFCn\xFCr. \u0130ki yar\u0131\u015Fa da aday olabilirsin; ikisini de kazan\u0131rsan ba\u015Fkanl\u0131\u011F\u0131 al\u0131rs\u0131n, meclis koltu\u011Fun s\u0131radaki adaya ge\xE7er. Oylama ba\u015Flayana ka\
dar \xE7ekilebilirsin."):\u00E7("Adayl\u0131\u011F\u0131n herkese g\xF6r\xFCn\xFCr. Tek bir yar\u0131\u015Fta aday olabilirsin; oylama ba\u015Flayana kadar \xE7ekilebilirsin.")}</p>
        <div class="satir" style="margin-top:12px;flex-wrap:wrap"><button class="dugme altin" data-aday="president">${ikon("crown")}${\u00E7("Ba\u015Fkanl\u0131\u011Fa aday ol")}</button>
          <button class="dugme ikincil" data-aday="parliament">${ikon("landmark")}${\u00E7("Meclise aday ol")}</button></div></section>`}const araIsaret={president:new Set,parliament:new Set};function araSecimHtml(){
const b=v.by;if(!b?.rule)return"";const e=b.election,son=b.last_election,simdi=Date.now();if(!e){if(!son)return"";const kurulan=son.results?.installed??[];return`<section class="kart" id="ara-secim" d\
ata-ara-secim="${esc(son.stage)}"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ara se\xE7im")} \xB7 ${esc(saatYaz(son.voting_end))}</p>
            <h2 class="b2">${son.stage==="void"?son.void_reason==="no_candidates"?\u00E7("Aday \xE7\u0131kmad\u0131"):son.void_reason==="no_votes"?\u00E7("Oy kullan\u0131lmad\u0131"):son.void_reason===
"superseded"?\u00E7("Yeni d\xF6nem ba\u015Flad\u0131"):\u00E7("Se\xE7im kapand\u0131"):\u00E7("G\xF6reve ba\u015Flayanlar")}</h2></div><span class="ik-kutu">${ikon("vote")}</span></div>
          ${kurulan.length?`<div class="koltuk-liste">${kurulan.map(k=>`<div class="koltuk" data-ara-kurulan="${esc(k.character_id)}">${avatarKutu(k.name,k.character_id)}<div><b>${esc(k.name)}</b><div\
 class="kucuk">${k.office==="president"?\u00E7("Ba\u015Fkan"):\u00E7("Milletvekili \xB7 {n}. koltuk",{n:Number(k.seat_no)})}</div></div><span></span></div>`).join("")}</div>`:""}
          <p class="kucuk" style="margin-top:8px">${\u00E7("D\xF6nem i\xE7inde ba\u015Fkanl\u0131k bo\u015Fal\u0131r ya da bir meclis koltu\u011Fu listeden dolmazsa ara se\xE7im a\xE7\u0131l\u0131r: {c} saat adayl\u0131k, {o} saat oylama; kazanan d\xF6nem\
in kalan\u0131n\u0131 tamamlar. D\xF6nemin bitimine {g} g\xFCnden az kald\u0131ysa a\xE7\u0131lmaz; \xFClkede {b} g\xFCnde bir.",{c:sayi(b.rule.candidacyH),o:sayi(b.rule.votingH),g:sayi(b.rule.minRemainingDays),
b:sayi(b.rule.cooldownDays)})}</p></section>`}const oylama=Date.parse(e.voting_start)<=simdi&&Date.parse(e.voting_end)>simdi,adaylik=!oylama&&Date.parse(e.voting_start)>simdi,yarislar=[...e.president?
["president"]:[],...e.seats>0?["parliament"]:[]],secmen=!b.voter_code,neden={NOT_CITIZEN:\u00E7("Bu \xFClkenin vatanda\u015F\u0131 de\u011Filsin."),ACCOUNT_AGE:\u00E7("Hesab\u0131n yeterince eski de\u011Fil."),
CITIZENSHIP_AGE:\u00E7("Vatanda\u015Fl\u0131\u011F\u0131n yeterince eski de\u011Fil."),TUTORIAL:\u00E7("\xD6nce vatanda\u015Fl\u0131k \xF6\u011Freticisini bitirmelisin.")}[b.voter_code]??"",pusula=y=>{
const adaylar=(e.candidates??[]).filter(x=>x.race===y),ust=y==="president"?1:Number(e.seats);if((e.voted??[]).includes(y))return`<div class="pusula"><p class="ust-yazi">${esc(YARIS[y])}</p><div class=\
"bilgi-kutusu">${ikon("check")}<span>${\u00E7("Oyunu kulland\u0131n. Oy gizlidir; kime verdi\u011Fin g\xF6sterilmez.")}</span></div></div>`;if(!adaylar.length)return`<div class="pusula"><p class="ust-\
yazi">${esc(YARIS[y])}</p><p class="bos">${\u00E7("Bu yar\u0131\u015Fta aday yok.")}</p></div>`;const tip=ust===1?"radio":"checkbox";return`<fieldset class="pusula" data-ara-yaris="${y}" data-ust="${ust}\
"><legend><p class="ust-yazi">${esc(YARIS[y])}</p><span class="kucuk">${ust===1?\u00E7("Bir aday se\xE7."):\u00E7("En \xE7ok {n} aday se\xE7.",{n:ust})}</span></legend>
          ${adaylar.map(x=>`<label class="aday-sec"><input type="${tip}" name="ara-${y}" value="${esc(x.character_id)}" ${araIsaret[y].has(x.character_id)?"checked":""}>
            ${avatarKutu(x.name,x.character_id)}<span><b>${esc(x.name)}</b><span class="kucuk">${esc(x.party??\u00E7("Ba\u011F\u0131ms\u0131z"))}</span></span></label>`).join("")}
          <button class="dugme altin" type="button" data-ara-oy-ver="${y}">${ikon("vote")}${\u00E7("Oyunu ver")}</button></fieldset>`};return`<section class="kart" id="ara-secim" data-ara-secim="${oylama?
"voting":adaylik?"candidacy":"scheduled"}" data-ara-secim-id="${esc(e.election_id)}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ara se\xE7im")} \xB7 ${yarislar.map(y=>y==="president"?\u00E7("ba\u015Fkanl\u0131k"):\u00E7("{n} meclis koltu\u011Fu",{n:Number(e.seats)})).
join(" + ")}</p>
          <h2 class="b2">${oylama?\u00E7("Oylama s\xFCr\xFCyor"):adaylik?\u00E7("Adayl\u0131k s\xFCr\xFCyor"):\u00E7("Ara se\xE7im")}</h2></div><span class="ik-kutu">${ikon("vote")}</span></div>
        <p class="kucuk">${oylama?\u00E7("Oylama {zaman} biter.",{zaman:esc(saatYaz(e.voting_end))})+` <b data-bitis="${esc(e.voting_end)}"></b>`:\u00E7("Adayl\u0131k {zaman} biter; sonra {saat} saat oylam\
a.",{zaman:esc(saatYaz(e.voting_start)),saat:sayi(b.rule.votingH)})+` <b data-bitis="${esc(e.voting_start)}"></b>`}
          ${\u00E7("Kazanan d\xF6nemin kalan\u0131n\u0131 tamamlar ({zaman} kadar).",{zaman:esc(saatYaz(e.term_end))})}</p>
        ${yarislar.map(y=>{const l=(e.candidates??[]).filter(x=>x.race===y);return`<p class="ust-yazi" style="margin-top:8px">${esc(YARIS[y])} \xB7 ${sayi(l.length)}</p>
            ${l.length?`<div class="koltuk-liste" style="margin:6px 0 10px">${l.map(x=>`<div class="koltuk" data-ara-aday="${esc(x.character_id)}" data-ara-aday-yaris="${y}">${avatarKutu(x.name,x.character_id)}\

              <div><b>${esc(x.name)}${x.character_id===benimKimlik()?" "+\u00E7("(sen)"):""}</b><div class="kucuk">${esc(x.party??\u00E7("Ba\u011F\u0131ms\u0131z"))}</div></div>
              ${adaylik&&x.character_id===benimKimlik()?`<button class="dugme sade kucuk-d" data-ara-cekil="${y}">${ikon("x")}${\u00E7("\xC7ekil")}</button>`:"<span></span>"}</div>`).join("")}</div>`:
`<p class="bos" style="margin:6px 0 10px">${\u00E7("Hen\xFCz aday yok.")}</p>`}`}).join("")}
        ${adaylik&&secmen&&!b.in_office?`<div class="satir" style="flex-wrap:wrap;gap:8px">${yarislar.filter(y=>!(e.my_candidacies??[]).includes(y)).map(y=>`<button class="dugme ${y==="president"?"alt\
in":"ikincil"}" data-ara-aday-ol="${y}">${ikon(y==="president"?"crown":"landmark")}${y==="president"?\u00E7("Ba\u015Fkanl\u0131\u011Fa aday ol"):\u00E7("Meclise aday ol")}</button>`).join("")}</div>`:
""}
        ${adaylik&&b.in_office?`<p class="kucuk">${\u00E7("G\xF6revdeyken ara se\xE7ime aday olunmaz.")}</p>`:""}
        ${oylama&&secmen?`<div class="yigin" style="margin-top:6px" id="ara-pusula">${yarislar.map(pusula).join("")}</div>`:""}
        ${!secmen&&neden?`<p class="kucuk" data-ara-secmen="${esc(b.voter_code)}">${esc(neden)}</p>`:""}
        ${oylama?`<p class="kucuk">${\u00E7("Se\xE7men listesi {n} ki\u015Fi; {m} se\xE7men oy kulland\u0131.",{n:sayi(e.voters??0),m:sayi(e.turnout??0)})}</p>`:""}
        <p class="kucuk">${\u00E7("Se\xE7men: ola\u011Fan se\xE7imin \u015Fartlar\u0131n\u0131 o an sa\u011Flayan vatanda\u015Flar. En \xE7ok oy alan kazan\u0131r; e\u015Fitlikte kura. Oy gizlidir.")}\
</p>
      </section>`}function pusulaHtml(e,yaris){const tur=e.stage==="runoff"?2:1,r=e.results?.[yaris];let adaylar=e.candidates.filter(x=>x.race===yaris),ust=yaris==="president"?1:v.c.parliamentChoicesMax;
const bas=`<p class="ust-yazi">${esc(YARIS[yaris])}${tur===2?" \xB7 "+\u00E7("ikinci tur"):""}</p>`;if(tur===2){const esit=new Set(r?.runoff??[]);if(adaylar=adaylar.filter(x=>esit.has(x.character_id)),
ust=r?.runoff_seats??0,!adaylar.length)return`<div class="pusula">${bas}<p class="kucuk">${\u00E7("Bu yar\u0131\u015Fta ikinci tur yok; sonu\xE7 belli.")}</p></div>`}if(e.voted.some(x=>x.race===yaris&&
x.round===tur))return`<div class="pusula">${bas}<div class="bilgi-kutusu">${ikon("check")}<span>${\u00E7("Oyunu kulland\u0131n. Oy gizlidir; kime verdi\u011Fin g\xF6sterilmez.")}</span></div></div>`;if(!adaylar.
length)return`<div class="pusula">${bas}<p class="bos">${\u00E7("Bu yar\u0131\u015Fta aday yok.")}</p></div>`;const tip=ust===1?"radio":"checkbox";return`<fieldset class="pusula" data-yaris="${yaris}"\
 data-ust="${ust}"><legend>${bas}<span class="kucuk">${ust===1?\u00E7("Bir aday se\xE7."):\u00E7("En \xE7ok {n} aday se\xE7.",{n:Number(ust)})}</span></legend>
        ${adaylar.map(x=>`<label class="aday-sec"><input type="${tip}" name="oy-${yaris}" value="${esc(x.character_id)}" ${isaret[yaris].has(x.character_id)?"checked":""}>
          ${avatarKutu(x.name,x.character_id)}<span><b>${esc(x.name)}</b><span class="kucuk">${esc(x.party??\u00E7("Ba\u011F\u0131ms\u0131z"))}${(x.endorsements??[]).length?` \xB7 ${esc(\u00E7("{n} sa\
nat\xE7\u0131 destekliyor",{n:x.endorsements.length}))}`:""}</span></span></label>`).join("")}
        <button class="dugme altin" type="button" data-oy-ver="${yaris}">${ikon("vote")}${\u00E7("Oyunu ver")}</button></fieldset>`}const destekYazi=x=>(x.endorsements??[]).length?`<div class="kucuk a\
day-destek" data-aday-destek="${esc(x.character_id)}">${ikon("eighth-notes")} ${esc(\u00E7("Destekleyen: {adlar}",{adlar:x.endorsements.map(d=>`${d.name} (${d.band})`).join(", ")}))}</div>`:"";function destekDugme(e,x){
const d=e.endorse??{};return d.mine===x.character_id?`<button class="dugme sade kucuk-d" data-destek-cek="${esc(e.election_id)}">${ikon("x")}${\u00E7("Deste\u011Fini \xE7ek")}</button>`:!d.eligible||d.
mine?"":`<button class="dugme ikincil kucuk-d" data-destekle="${esc(x.character_id)}" data-destek-ad="${esc(x.name)}">${ikon("eighth-notes")}${\u00E7("Destekle")}</button>`}function destekNotu(e){const d=e.
endorse??{};return d.eligible||d.mine?`<p class="kucuk" id="destek-notu" data-destek="${d.mine?"var":"uygun"}">${d.mine?\u00E7("Sanat\xE7\u0131 olarak bu se\xE7imde bir aday\u0131 destekliyorsun; deste\u011Fin aday\u0131n kart\
\u0131nda g\xF6r\xFCn\xFCr, ek oy vermez."):\u00E7("\xDCnl\xFC bir m\xFCzisyensin: bir aday\u0131 a\xE7\u0131k\xE7a destekleyebilirsin. Destek aday\u0131n kart\u0131nda g\xF6r\xFCn\xFCr, ek oy vermez; oylama bitene kadar geri \xE7ekilebilirsin.")}\
</p>`:d.reason==="ENDORSE_NOT_FAMOUS"?`<p class="kucuk" id="destek-notu" data-destek="unsuz">${\u00E7("Grubunun \xFClkede en az {n} hayran\u0131 ya da bir unvan\u0131 olunca bir aday\u0131 a\xE7\u0131k\xE7a destekleyebilirsin (\u015Fi\
mdi {h} hayran).",{n:sayi(Math.round(Number(d.min_fans_milli??5e4)/1e3)),h:sayi(Math.floor(Number(d.fans_milli??0)/1e3))})}</p>`:""}function adayListesi(e){return["candidacy","voting","runoff"].includes(
e.stage)?`<section class="kart" id="aday-listesi"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("{n} aday",{n:e.candidates.length})}</p><h2 class="b2">${\u00E7("Adaylar")}</h2></div><span cl\
ass="ik-kutu">${ikon("users-round")}</span></div>
        ${destekNotu(e)}
        ${["president","parliament"].map(y=>{const l=e.candidates.filter(x=>x.race===y);return`<p class="ust-yazi" style="margin-top:6px">${esc(YARIS[y])} \xB7 ${sayi(l.length)}</p>
            ${l.length?`<div class="koltuk-liste" style="margin:8px 0 14px">${l.map(x=>`<div class="koltuk" data-aday-satir="${esc(x.character_id)}">${avatarKutu(x.name,x.character_id)}
              <div><b>${esc(x.name)}${x.character_id===benimKimlik()?" "+\u00E7("(sen)"):""}</b><div class="kucuk">${esc(x.party??\u00E7("Ba\u011F\u0131ms\u0131z"))}</div>${destekYazi(x)}</div><span>${x.
character_id===benimKimlik()?"":destekDugme(e,x)}</span></div>`).join("")}</div>`:`<p class="bos" style="margin:6px 0 14px">${\u00E7("Hen\xFCz aday yok.")}</p>`}`}).join("")}</section>`:""}function sonucHtml(sonuc,adaylar,baslik,alt){
if(!sonuc)return"";const ad=new Map((adaylar??[]).map(x=>[x.character_id,x])),yaris=y=>{const r=sonuc[y];if(!r)return"";const kazanan=new Set(r.winners??[]),ikinci=new Set(r.runoff??[]),kura=new Set(r.
lot??[]),satirlar=Object.entries(r.votes??{}).sort((a,b)=>b[1]-a[1]||String(a[0]).localeCompare(b[0])),enCok=Math.max(1,...satirlar.map(([,n])=>n));return`<p class="ust-yazi" style="margin-top:6px">${esc(
YARIS[y])} \xB7 ${\u00E7("{n} sandalye",{n:Number(r.seats??(y==="president"?1:v.c.parliamentSeats))})}${r.method==="lot"?" \xB7 "+\u00E7("e\u015Fitlik kurayla \xE7\xF6z\xFCld\xFC"):r.method==="runoff"?
" \xB7 "+\u00E7("ikinci tur"):""}</p>
          ${satirlar.length?satirlar.map(([id,n])=>{const x=ad.get(id),iki=r.round2?.[id];return`<div class="sonuc-satir ${kazanan.has(id)?"kazandi":""}"><span><b>${esc(x?.name??\u00E7("Silinmi\u015F hesap"))}\
</b><span class="kucuk">${esc(x?.party??\u00E7("Ba\u011F\u0131ms\u0131z"))}</span></span>
              <span class="cubuk"><i style="width:${Math.round(n/enCok*100)}%"></i></span>
              <span class="sonuc-say">${\u00E7("<b>{n}</b> oy",{n:Number(n)})}${iki!=null?" \xB7 "+\u00E7("2. tur {n}",{n:Number(iki)}):""}
                ${kazanan.has(id)?`<span class="cip altin">${kura.has(id)?\u00E7("Kurayla"):\u00E7("Kazand\u0131")}</span>`:ikinci.has(id)?`<span class="cip">${\u00E7("\u0130kinci turda")}</span>`:""}\
</span></div>`}).join(""):`<p class="bos">${\u00E7("Aday yoktu.")}</p>`}`};return`<section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${esc(alt)}</p><h2 class="b2">${esc(baslik)}</h2>\
</div><span class="ik-kutu">${ikon("trophy")}</span></div>
        ${yaris("president")}${yaris("parliament")}</section>`}function cifteHtml(){const l=v.s.last_double??[];return l.length?`<section class="kart" id="secim-cifte"><div class="kart-bas"><div><p cl\
ass="ust-yazi">${\u00E7("Son se\xE7im")}</p><h2 class="b2">${\u00E7("\xC7ifte kazanan")}</h2></div><span class="ik-kutu">${ikon("crown")}</span></div>
        ${l.map(d=>`<p class="aciklama" data-secim-cifte="${esc(d.character_id??"")}">${d.filled?.filled?\u00E7("{ad} hem ba\u015Fkanl\u0131\u011F\u0131 hem meclisi kazand\u0131: ba\u015Fkanl\u0131\u011F\u0131 ald\u0131, {n}. koltu\u011Fu s\u0131radaki aday {h\
alef} ald\u0131.",{ad:esc(d.name??""),n:Number(d.seat_no),halef:esc(d.filled.name??"")}):\u00E7("{ad} hem ba\u015Fkanl\u0131\u011F\u0131 hem meclisi kazand\u0131: ba\u015Fkanl\u0131\u011F\u0131 ald\u0131; {n}. koltuk i\xE7in s\u0131radaki uygun aday yoktu.",
{ad:esc(d.name??""),n:Number(d.seat_no)})}</p>`).join("")}</section>`:""}function partiHtml(){const p=v.partim,e=v.s.election,lider=p&&p.leader_id===benimKimlik(),adaylar=e?.stage==="candidacy"?e.candidates:
[],gosterim=lider&&adaylar.length?(p.member_list??[]).map(m=>{const a=adaylar.find(x=>x.character_id===m.character_id);if(!a)return"";const bizim=a.party_id===p.party_id;return`<div class="koltuk">${avatarKutu(
m.name,m.character_id)}<div><b>${esc(m.name)}</b><div class="kucuk">${a.race==="president"?\u00E7("Ba\u015Fkanl\u0131k aday\u0131"):\u00E7("Meclis aday\u0131")} \xB7 ${bizim?\u00E7("partinin aday\u0131"):
a.party?esc(a.party):\u00E7("ba\u011F\u0131ms\u0131z")}</div></div>
          <button class="dugme kucuk-d ${bizim?"sade":"ikincil"}" data-goster="${esc(m.character_id)}" data-acik="${bizim?"0":"1"}">${bizim?\u00E7("G\xF6sterimi geri al"):\u00E7("Partinin aday\u0131 g\xF6ster")}\
</button></div>`}).join(""):"";return`<section class="kart">
        <div class="kart-resim" style="background-image:url('img/mekan_parti_k.webp')"></div>
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Partiler \xB7 {n}",{n:v.partiler.length})}</p><h2 class="b2">${\u00E7("{ulke} partileri",{ulke:esc(ulkeAdi(v.s.country_id))})}</h2></di\
v>
          ${p?"":`<button class="dugme ikincil kucuk-d" id="parti-kur">${ikon("plus")}${\u00E7("Parti kur")}</button>`}</div>
        ${v.partiler.length?`<div class="liste">${v.partiler.map(x=>`<div class="liste-satir" data-parti-satir="${esc(x.party_id)}">${x.emblem&&typeof magazaUrun=="function"&&magazaUrun(x.emblem)?`<sp\
an class="liste-ikon amblem-ikon">${magazaAmblemSvg(magazaUrun(x.emblem))}</span>`:`<span class="liste-ikon" style="background:${partiRenk(x.name)};color:#fff">${ikon("users-round")}</span>`}
          <div><span class="tur">${\u00E7("{n} \xFCye \xB7 ba\u015Fkan {ad}",{n:Number(x.members),ad:esc(x.leader??"")})}</span><b>${esc(x.name)}</b><div class="alt">${\u00E7("Kasa {kr} kredi",{kr:kr(
x.balance_cr)})}${x.join_policy==="approval"?" \xB7 "+\u00E7("onayl\u0131 \xFCyelik"):""}${p?.party_id===x.party_id?"":` \xB7 <button class="baglanti" type="button" data-parti-rapor="${esc(x.party_id)}\
|${esc(x.name)}">${\u00E7("Raporla")}</button>`}</div></div>
          ${p?.party_id===x.party_id?`<span class="cip yesil">${\u00E7("\xDCyesin")}</span>`:p?"<span></span>":v.istegim?.party_id===x.party_id?`<span class="cip" data-istek-bekliyor>${\u00E7("\u0130ste\u011Fin\
 bekliyor")}</span>`:`<button class="dugme ikincil kucuk-d" data-katil="${esc(x.party_id)}" data-onayli="${x.join_policy==="approval"?"1":"0"}">${x.join_policy==="approval"?\u00E7("\u0130stek g\xF6nder"):
\u00E7("Kat\u0131l")}</button>`}</div>`).join("")}</div>`:`<p class="bos">${\u00E7("Bu \xFClkede hen\xFCz parti yok. \u0130lk partiyi sen kur.")}</p>`}
        ${!p&&v.istegim?`<div class="bilgi-kutusu" id="istegim" style="margin-top:10px">${ikon("hourglass")}<span>${\u00E7("\xDCyelik iste\u011Fin {parti} partisinde bekliyor; parti ba\u015Fkan\u0131 karar verecek. Kar\
ar \xE7\u0131kmazsa {zaman} d\xFC\u015Fer.",{parti:esc(v.istegim.party??""),zaman:esc(saatYaz(v.istegim.expires_at))})}</span>
          <button class="dugme sade kucuk-d" id="istek-cek">${ikon("x")}${\u00E7("Geri \xE7ek")}</button></div>`:""}
        ${p?`<hr class="ayrac"><p class="ust-yazi">${\u00E7("Partin")}</p><h3 class="b3" style="margin:4px 0 6px">${esc(p.name)}</h3>
          ${p.program?`<p class="aciklama parti-program">${esc(p.program)}</p>`:p.program_hidden?`<p class="kucuk">${\u00E7("Program kurallara ayk\u0131r\u0131 bulundu\u011Fu i\xE7in gizlendi.")}</p>`:
""}
          <p class="kucuk">${\u00E7("{n} \xFCye \xB7 kasa {kr} kredi",{n:Number(p.members),kr:kr(p.balance_cr)})} \xB7 ${lider?\u00E7("partinin ba\u015Fkan\u0131s\u0131n"):\u00E7("ba\u015Fkan {ad}",{ad:esc(
p.leader??"")})}</p>
          ${lider&&p.join_policy==="approval"&&Number(p.pending_requests??0)>0?`<p class="kucuk" data-secim-istek="${Number(p.pending_requests)}">${\u00E7("Kap\u0131da {n} \xFCyelik iste\u011Fi bekliyor (\xDClkem \u2192 P\
arti).",{n:sayi(p.pending_requests)})}</p>`:""}
          ${p.leader_election?`<p class="kucuk" data-secim-parti-secimi="${esc(p.leader_election.election_id)}">${Date.parse(p.leader_election.voting_start)<=Date.now()?\u00E7("Partinde ba\u015Fkanl\u0131k se\xE7i\
minin oylamas\u0131 s\xFCr\xFCyor (\xDClkem \u2192 Parti)."):\u00E7("Partinde ba\u015Fkanl\u0131k se\xE7iminin adayl\u0131\u011F\u0131 s\xFCr\xFCyor (\xDClkem \u2192 Parti).")}</p>`:""}
          ${gosterim?`<p class="ust-yazi" style="margin-top:14px">${\u00E7("Aday g\xF6sterme")}</p><p class="kucuk">${\u00E7("Aday olan \xFCyelerini partinin aday\u0131 g\xF6sterebilirsin (ba\u015Fkanl\u0131kta {b}, mecli\
ste {m}).",{b:Number(v.c.party.nominationsMax.president),m:Number(v.c.party.nominationsMax.parliament)})}</p>
            <div class="koltuk-liste" style="margin-top:10px">${gosterim}</div>`:""}
          <div class="satir" style="margin-top:14px;flex-wrap:wrap;gap:8px"><button class="dugme ikincil kucuk-d" data-git="ulke/parti">${ikon("users-round")}${\u00E7("Parti merkezi")}</button>
            <button class="dugme sade kucuk-d" id="parti-ayril">${ikon("door-open")}${\u00E7("Partiden ayr\u0131l")}</button></div>`:""}
      </section>`}function belediyeHtml(){const b=v.bld;if(!b?.municipality)return"";const e=b.election,m=b.mayor,simdi=Date.now(),oylama=e&&Date.parse(e.voting_start)<=simdi&&Date.parse(e.voting_end)>
simdi,adaylik=e&&!oylama&&Date.parse(e.candidacy_start)<=simdi&&Date.parse(e.voting_start)>simdi,adaylar=e?.candidates??[];return`<section class="kart" id="secim-belediye" data-secim-belediye="${oylama?
"voting":adaylik?"candidacy":e?"scheduled":"none"}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Belediye ba\u015Fkan\u0131 se\xE7imi")} \xB7 ${esc(bolgeAdi(b.region_id))}</p>
          <h2 class="b2">${oylama?\u00E7("Oylama s\xFCr\xFCyor"):adaylik?\u00E7("Adayl\u0131k s\xFCr\xFCyor"):e?\u00E7("S\u0131radaki se\xE7im"):m?\u00E7("Belediye Ba\u015Fkan\u0131 {ad}",{ad:esc(m.name)}):
\u00E7("Belediye ba\u015Fkan\u0131 yok")}</h2></div>
          <span class="ik-kutu">${ikon("landmark")}</span></div>
        <p class="kucuk">${m?\u00E7("Belediye Ba\u015Fkan\u0131 {ad}; d\xF6nemi {zaman} biter.",{ad:esc(m.name),zaman:esc(saatYaz(m.term_end))}):\u00E7("G\xF6revde belediye ba\u015Fkan\u0131 yok (ge\xE7ici sistem y\xF6n\
etimi).")}
          ${e?oylama?\u00E7("Oylama {zaman} biter; {n} aday.",{zaman:esc(saatYaz(e.voting_end)),n:sayi(adaylar.length)}):adaylik?\u00E7("Adayl\u0131k {zaman} biter; {n} aday.",{zaman:esc(saatYaz(e.voting_start)),
n:sayi(adaylar.length)}):\u00E7("Adayl\u0131k {zaman} ba\u015Flar.",{zaman:esc(saatYaz(e.candidacy_start))}):""}
          ${oylama&&e.me_voted?\u00E7("Oyunu kulland\u0131n."):adaylik&&e.me_candidate?\u00E7("Adays\u0131n."):(oylama||adaylik)&&b.voter_code?esc(bldSecmenNeden(b.voter_code,b.rule?.mayor)):""}</p>
        <div class="satir" style="margin-top:8px"><button class="dugme ${oylama&&!e.me_voted&&!b.voter_code?"altin":"ikincil"} kucuk-d" data-bld-ac="${esc(b.region_id)}">${ikon("landmark")}${oylama&&!e.
me_voted&&!b.voter_code?\u00E7("Oy ver"):adaylik&&!e.me_candidate&&!b.voter_code&&!b.me_president?\u00E7("Aday ol"):\u00E7("Belediyeye git")}</button></div>
      </section>`}function ciz(){durdur();const e=v.s.election,sonuc=e&&["runoff","certified"].includes(e.stage)?e.results:null;kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div>${ulkeUst(v.s.country_id,\u00E7("Se\xE7im"))}<h1 class="b1">${e?e.kind==="founding"?\u00E7("Kurucu Meclis se\xE7imi"):e.kind==="early"?\u00E7("Ola\u011Fan\xFCst\xFC se\xE7im"):
\u00E7("Ba\u015Fkan ve meclis se\xE7imi"):\u00E7("Se\xE7im")}</h1>
          <p class="aciklama">${e?`${esc(ASAMA[e.stage]??e.stage)}${siradakiAn(e)?` \xB7 ${esc(SIRADAKI_AD[e.stage]??"")} <b data-bitis="${siradakiAn(e)}"></b>`:""}`:\u00E7("Planl\u0131 se\xE7im yok.")}\
</p></div>
          ${e?`<span class="cip ${e.stage==="voting"||e.stage==="runoff"?"altin":""}">${ikon("calendar")}${esc(ASAMA[e.stage]??e.stage)}</span>`:""}</div>
        ${ogreticiBandi(e)}
        ${e?.kind==="early"?olaganustuBandi(e):""}
        <div class="izgara iki">
          <div class="yigin">
            ${e&&SANDIK_ASAMA.includes(e.stage)?'<div id="sandik-yer"></div>':""}
            ${e&&(e.stage==="voting"||e.stage==="runoff")&&e.eligible?`<section class="kart" id="pusula"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Oy pusulan")}</p><h2 class="b2">${\u00E7(
"Oyunu ver")}</h2></div><span class="ik-kutu">${ikon("vote")}</span></div>
              <div class="yigin">${pusulaHtml(e,"president")}<hr class="ayrac" style="margin:6px 0">${pusulaHtml(e,"parliament")}</div></section>`:""}
            ${e?adaylikHtml(e):""}
            ${araSecimHtml()}
            ${sonuc?`<div id="secim-gecesi-yer"></div>${sonucHtml(sonuc,e.candidates,e.stage==="runoff"?\u00E7("\u0130lk tur sonucu"):\u00E7("Se\xE7im sonucu"),e.stage==="runoff"?\u00E7("E\u015Fit adaylar \
ikinci turda"):\u00E7("Kesin sonu\xE7"))}`:""}
            ${e?`<section class="kart" id="secim-takvim"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Takvim")}</p><h2 class="b2">${\u00E7("Se\xE7imin a\u015Famalar\u0131")}</h2></div><spa\
n class="ik-kutu">${ikon("calendar")}</span></div>
              ${takvim(e)}<hr class="ayrac"><p class="ust-yazi">${\u00E7("Durumun")}</p><div style="margin-top:10px">${durumHtml(e)}</div></section>`:""}
            ${e?adayListesi(e):""}
            ${!sonuc&&v.s.last_results?`<div id="secim-gecesi-yer"></div>${sonucHtml(v.s.last_results,v.s.last_candidates,\u00E7("Son se\xE7imin sonucu"),\u00E7("G\xF6revdeki ba\u015Fkan ve meclis"))}${cifteHtml()}`:
""}
          </div>
          <div class="yigin">${belediyeHtml()}${partiHtml()}</div>
        </div></div>`;const ikiB=!!(e&&SANDIK_ASAMA.includes(e.stage)),gs=sonuc?{anahtar:`${e.election_id}:${e.stage}`,sonuc,adaylar:e.candidates,ulke:v.s.country_id,ikiB,alt:e.stage==="runoff"?\u00E7(
"\u0130lk tur say\u0131ld\u0131 \xB7 e\u015Fit adaylar ikinci turda"):\u00E7("Sand\u0131klar a\xE7\u0131ld\u0131 \xB7 kesin sonu\xE7")}:v.s.last_results?{anahtar:`son:${ozet(JSON.stringify(v.s.last_results))}`,
sonuc:v.s.last_results,adaylar:v.s.last_candidates,ulke:v.s.country_id,alt:\u00E7("Son se\xE7imin sonucu"),ikiB}:null,yer=$("#secim-gecesi-yer",kap);yer&&gs&&(yer.replaceWith(gece.el),gece.yaz(gs));const sy=$(
"#sandik-yer",kap);sy&&(sy.replaceWith(sandik.el),sandik.yaz(sandikVeri())),bagla();const an=e?siradakiAn(e):null;an!==sonAn&&(sonAn=an,sayac.n=0),durdur=geriSay(kap,()=>setTimeout(tazele,gecikmeli(sayac)))}
let sonAn=null;const sayac={n:0};function bagla(){ogreticiBagla(kap,tazele);for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-bld-ac]",kap))b.onclick=
()=>bldAc(b.dataset.bldAc);const isaretle=(f,kume,ust)=>{for(const g of $$("input",f))g.onchange=()=>{const k=kume();if(g.type==="radio")k.clear(),k.add(g.value);else if(g.checked){if(k.size>=ust){g.checked=
!1,tost(\u00E7("En \xE7ok {n} aday se\xE7ebilirsin.",{n:ust}),"circle-alert");return}k.add(g.value)}else k.delete(g.value)}};for(const f of $$("fieldset.pusula[data-yaris]",kap)){const yaris=f.dataset.
yaris;isaretle(f,()=>isaret[yaris],Number(f.dataset.ust))}for(const f of $$("fieldset.pusula[data-ara-yaris]",kap)){const yaris=f.dataset.araYaris;isaretle(f,()=>araIsaret[yaris],Number(f.dataset.ust))}
for(const b of $$("[data-oy-ver]",kap))b.onclick=()=>oyVer(b.dataset.oyVer);for(const b of $$("[data-ara-oy-ver]",kap))b.onclick=()=>araOyVer(b.dataset.araOyVer);for(const b of $$("[data-aday]",kap))b.
onclick=()=>{const yaris=b.dataset.aday;pencere({ust:\u00E7("Adayl\u0131k"),baslik:yaris==="president"?\u00E7("Ba\u015Fkanl\u0131k adayl\u0131\u011F\u0131"):\u00E7("Meclis adayl\u0131\u011F\u0131"),govde:`\
<p class="aciklama">${yaris==="president"?\u00E7("Ba\u015Fkan \xFClkeyi y\xF6netir: vergi ve sava\u015F yetkisi \xF6nerir, meclisin verdi\u011Fi yetkiyle sava\u015F ilan eder."):\u00E7("Milletvekili m\
eclis oylamalar\u0131nda oy verir; vatanda\u015Fl\u0131k yasas\u0131, ba\u015Fkan vekili ve g\xF6revden alma \xF6nerebilir.")} ${\u00E7("Adayl\u0131\u011F\u0131n herkese g\xF6r\xFCn\xFCr.")}</p>`,dugmeler:[
{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Aday ol"),sinif:"altin",is:()=>islem("candidacy_register",{p_race:yaris},\u00E7("Adayl\u0131\u011F\u0131n kaydedildi."),"megaphone")}]})};for(const b of $$("[data-\
destekle]",kap))b.onclick=()=>{const aday=b.dataset.destekle,ad=b.dataset.destekAd,secim=v.s.election?.election_id;pencere({ust:\u00E7("Sanat\xE7\u0131 deste\u011Fi"),baslik:\u00E7("{ad} aday\u0131n\u0131 deste\
kle",{ad}),govde:`<p class="aciklama">${\u00E7("Deste\u011Fin aday\u0131n kart\u0131nda ad\u0131n ve grubunla g\xF6r\xFCn\xFCr; ek oy vermez. Bu se\xE7imde tek bir aday\u0131 destekleyebilirsin; oylama bitene kadar geri \xE7ekebilirsin.")}\
</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Destekle"),sinif:"altin",ikon:"eighth-notes",is:()=>islem("candidate_endorse",{p_election:secim,p_candidate:aday},\u00E7("Deste\u011Fin aday\u0131n kart\u0131na y\
az\u0131ld\u0131."),"eighth-notes")}]})};for(const b of $$("[data-destek-cek]",kap))b.onclick=()=>islem("candidate_endorse_withdraw",{p_election:b.dataset.destekCek},\u00E7("Deste\u011Fini \xE7ektin."),
"x");for(const b of $$("[data-adaylik-cekil]",kap))b.onclick=()=>{const yaris=b.dataset.adaylikCekil;pencere({ust:\u00E7("Adayl\u0131k"),baslik:yaris==="president"?\u00E7("Ba\u015Fkanl\u0131k adayl\u0131\u011F\u0131ndan \xE7ekil"):
\u00E7("Meclis adayl\u0131\u011F\u0131ndan \xE7ekil"),govde:`<p class="aciklama">${\u00E7("Oylama ba\u015Flamadan yeniden aday olabilirsin.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\xC7ekil"),
sinif:"mercan",is:()=>islem("candidacy_withdraw",{p_race:yaris},\u00E7("Adayl\u0131ktan \xE7ekildin."),"x")}]})};const araId=$("#ara-secim",kap)?.dataset.araSecimId;for(const b of $$("[data-ara-aday-o\
l]",kap))b.onclick=()=>{const yaris=b.dataset.araAdayOl;pencere({ust:\u00E7("Ara se\xE7im"),baslik:yaris==="president"?\u00E7("Ba\u015Fkanl\u0131k adayl\u0131\u011F\u0131"):\u00E7("Meclis adayl\u0131\u011F\u0131"),
govde:`<p class="aciklama">${\u00E7("Kazanan d\xF6nemin kalan\u0131n\u0131 tamamlar. Adayl\u0131\u011F\u0131n herkese g\xF6r\xFCn\xFCr; oylama ba\u015Flayana kadar \xE7ekilebilirsin.")}</p>`,dugmeler:[
{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Aday ol"),sinif:"altin",is:()=>islem("by_register",{p_election:araId,p_race:yaris},\u00E7("Ara se\xE7im adayl\u0131\u011F\u0131n kaydedildi."),"megaphone")}]})};for(const b of $$(
"[data-ara-cekil]",kap))b.onclick=()=>pencere({ust:\u00E7("Ara se\xE7im"),baslik:\u00E7("Adayl\u0131ktan \xE7ekil"),govde:`<p class="aciklama">${\u00E7("Oylama ba\u015Flamadan yeniden aday olabilirsin.")}\
</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\xC7ekil"),sinif:"mercan",is:()=>islem("by_withdraw",{p_election:araId,p_race:b.dataset.araCekil},\u00E7("Ara se\xE7im adayl\u0131\u011F\u0131ndan \xE7ekildin."),
"x")}]});$("#parti-kur",kap)?.addEventListener("click",partiKur);for(const b of $$("[data-parti-rapor]",kap))b.onclick=e=>{e.stopPropagation();const[id,ad]=b.dataset.partiRapor.split("|");raporla({tur:"\
party",ref:id,ad})};for(const b of $$("[data-katil]",kap))b.onclick=()=>{const p=v.partiler.find(x=>x.party_id===b.dataset.katil),onayli=b.dataset.onayli==="1";pencere({ust:\u00E7("Parti"),baslik:p?\u00E7(
"Partiye kat\u0131l: {parti}",{parti:p.name}):\u00E7("Partiye kat\u0131l"),govde:`<p class="aciklama">${onayli?\u00E7("Bu partide \xFCyelik onayl\u0131: iste\u011Fin parti ba\u015Fkan\u0131na gider, kabul edilince \xFCye olurs\
un. Karar {n} saat i\xE7inde \xE7\u0131kmazsa istek d\xFC\u015Fer.",{n:Number(v.c.party.membership?.requestExpiryH??72)})+" ":""}${\u00E7("Ayn\u0131 anda tek partinin \xFCyesi olabilirsin. Ayr\u0131l\u0131rsan yeni par\
tiye kat\u0131lmak i\xE7in {n} saat beklersin.",{n:Number(v.c.party.joinCooldownH)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:onayli?\u00E7("\u0130stek g\xF6nder"):\u00E7("Kat\u0131l"),sinif:"alti\
n",is:()=>islem("party_join",{p_party:b.dataset.katil},onayli?\u00E7("\xDCyelik iste\u011Fin g\xF6nderildi; parti ba\u015Fkan\u0131 karar verecek."):\u00E7("Partiye kat\u0131ld\u0131n."),"users-round")}]})};
$("#istek-cek",kap)?.addEventListener("click",()=>islem("party_request_withdraw",{},\u00E7("\xDCyelik iste\u011Fini geri \xE7ektin."),"x")),$("#parti-ayril",kap)?.addEventListener("click",()=>pencere(
{ust:\u00E7("Parti"),baslik:\u00E7("Partiden ayr\u0131l"),govde:`<p class="aciklama">${\u00E7("Ba\u015Fkansan ba\u015Fkanl\u0131k en eski \xFCyeye ge\xE7er; tek \xFCyeysen parti da\u011F\u0131l\u0131r ve kasas\u0131 hazineye ge\xE7er. Yeni partiye\
 kat\u0131lmak i\xE7in {n} saat beklersin.",{n:Number(v.c.party.joinCooldownH)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Ayr\u0131l"),sinif:"mercan",is:()=>islem("party_leave",{},\u00E7("\
Partiden ayr\u0131ld\u0131n."),"door-open")}]}));for(const b of $$("[data-goster]",kap))b.onclick=()=>islem("party_nominate",{p_member:b.dataset.goster,p_on:b.dataset.acik==="1"},b.dataset.acik==="1"?
\u00E7("\xDCyeni partinin aday\u0131 g\xF6sterdin."):\u00E7("G\xF6sterimi geri ald\u0131n."),"users-round")}function oyVer(yaris){const e=v.s.election,esit=e.stage==="runoff"?new Set(e.results?.[yaris]?.
runoff??[]):null,secili=[...isaret[yaris]].filter(id=>e.candidates.some(x=>x.character_id===id&&x.race===yaris)&&(!esit||esit.has(id)));if(!secili.length){tost(\u00E7("\xD6nce en az bir aday i\u015Faretle."),
"circle-alert");return}const tur=e.stage==="runoff"?2:1,ilk=!e.voted.some(x=>x.round===tur),es=v.es?.election,secimAd=yaris==="president"?\u00E7("Ba\u015Fkanl\u0131k oyu"):\u00E7("Meclis oyu");OyKabini.
ac({ust:secimAd,baslik:\u00E7("Oyunu onayla"),secim:secimAd,pusula:secili.map(id=>{const x=e.candidates.find(c=>c.character_id===id&&c.race===yaris);return{ad:x?.name??"",alt:x?.party??\u00E7("Ba\u011F\u0131ms\u0131\
z"),secili:!0}}),not:`<p class="kucuk">${\u00E7("Oy gizlidir ve de\u011Fi\u015Ftirilemez. Kime oy verdi\u011Fin kimseye g\xF6sterilmez.")}</p>`,ad:\u00E7("Oyumu ver"),sayac:es?{oy:Number(es.voted??0),
secmen:es.voters??null}:null,gonder:async()=>(await Sunucu.yap("vote",{p_race:yaris,p_choices:secili}),isaret[yaris].clear(),tost(\u00E7("Oyun kaydedildi."),"vote"),es?{oy:Number(es.voted??0)+(ilk?1:0),
secmen:es.voters??null}:null),sonra:()=>tazele()})}function araOyVer(yaris){const e=v.by?.election;if(!e)return;const secili=[...araIsaret[yaris]].filter(id=>(e.candidates??[]).some(x=>x.character_id===
id&&x.race===yaris));if(!secili.length){tost(\u00E7("\xD6nce en az bir aday i\u015Faretle."),"circle-alert");return}const secimAd=yaris==="president"?\u00E7("Ara se\xE7im \xB7 ba\u015Fkanl\u0131k oyu"):
\u00E7("Ara se\xE7im \xB7 meclis oyu");OyKabini.ac({ust:secimAd,baslik:\u00E7("Oyunu onayla"),secim:secimAd,pusula:secili.map(id=>{const x=e.candidates.find(c=>c.character_id===id&&c.race===yaris);return{
ad:x?.name??"",alt:x?.party??\u00E7("Ba\u011F\u0131ms\u0131z"),secili:!0}}),not:`<p class="kucuk">${\u00E7("Oy gizlidir ve de\u011Fi\u015Ftirilemez. Kime oy verdi\u011Fin kimseye g\xF6sterilmez.")}</p\
>`,ad:\u00E7("Oyumu ver"),sayac:{oy:Number(e.turnout??0),secmen:e.voters??null},gonder:async()=>{const r=await Sunucu.yap("by_vote",{p_election:e.election_id,p_race:yaris,p_choices:secili});return araIsaret[yaris].
clear(),tost(\u00E7("Oyun kaydedildi."),"vote"),{oy:r?.turnout,secmen:r?.voters??e.voters??null}},sonra:()=>tazele()})}function partiKur(){const r=v.c.party;pencereForm({ust:\u00E7("Parti"),baslik:\u00E7(
"Parti kur"),onayAd:\u00E7("Kur ({kr} kredi)",{kr:kr(r.foundingFeeCr)}),onayIkon:"users-round",govde:`<label class="alan"><span>${\u00E7("Partinin ad\u0131")}</span><input name="ad" required minlength\
="${r.nameMin}" maxlength="${r.nameMax}" autocapitalize="words">
            <small>${\u00E7("{min}\u2013{max} karakter; \xFClkede e\u015Fsiz.",{min:Number(r.nameMin),max:Number(r.nameMax)})}</small></label>
          <label class="alan"><span>${\u00E7("Program (iste\u011Fe ba\u011Fl\u0131)")}</span><textarea name="program" maxlength="${r.programMax}" placeholder="${\u00E7("Partin ne istiyor? K\u0131sa ve a\xE7\u0131k\
 yaz.")}"></textarea>
            <small>${\u00E7("En \xE7ok {n} karakter. Kurallara ayk\u0131r\u0131 program gizlenir.",{n:Number(r.programMax)})}</small></label>
          <p class="kucuk">${\u00E7("Kurulu\u015F bedeli {kr} kredi; hesab\u0131ndan d\xFC\u015F\xFCl\xFCr. \u015Eartlar: vatanda\u015Fl\u0131k \xF6\u011Freticisi, en az {n} saatlik hesap, topluluk kurallar\u0131.",
{kr:kr(r.foundingFeeCr),n:Number(r.founderAccountAgeH)})}</p>`,is:async d=>{const ad=String(d.get("ad")??"").trim().replace(/\s+/g," ");if(ad.length<r.nameMin||ad.length>r.nameMax)throw new Error(\u00E7(
"Ad {min}\u2013{max} karakter olmal\u0131.",{min:Number(r.nameMin),max:Number(r.nameMax)}));await Sunucu.yap("party_create",{p_name:ad,p_program:String(d.get("program")??"").trim()||null}),tost(\u00E7(
"Partin kuruldu. Ba\u015Fkan\u0131 sensin."),"users-round"),Durum.ozet().catch(()=>{}),await tazele()}})}async function islem(fn,args,mesaj,ik){try{await Sunucu.yap(fn,args),tost(mesaj,ik)}catch(e){tost(
hataMetni(e),"circle-alert")}await tazele()}const tazele=tazeleyici(async()=>{await yukle(),ciz()});await yukle(),ciz();const b1=Durum.dinle("ulke-olay",({olay})=>{/^(election\.|party\.|office\.|movement\.|mayor\.)/.
test(olay)&&tazele()}),b2=Durum.dinle("parti-olay",()=>tazele()),b3=Durum.dinle("olay",({olay})=>{/^party\./.test(olay)&&tazele()}),sandikSaat=setInterval(async()=>{if(!(document.hidden||!v?.s?.election||
!SANDIK_ASAMA.includes(v.s.election.stage)))try{const es=await Sunucu.cagir("election_scene");if((es?.election?.stage??null)!==v.s.election.stage){tazele();return}v.es=es,sandik.el.isConnected&&sandik.
yaz(sandikVeri())}catch{}},6e4);return()=>{durdur(),b1(),b2(),b3(),gece.kapat(),sandik.kapat(),clearInterval(sandikSaat)}}}),Kabuk.kaydet("ulke/meclis",{async ac(kap){let v=null,durdur=()=>{};const salon=MeclisSalonu.
ac();async function yukle(){const[o,m,w,vergi,kurallar,gumruk]=await Promise.all([Sunucu.cagir("country_overview"),Sunucu.cagir("motions"),Sunucu.cagir("war_targets"),Sunucu.cagir("country_taxes"),Durum.
kurallar(),Sunucu.cagir("customs").catch(()=>null)]);v={o,m,w,vergi,c:kurallar.data.civic,combat:kurallar.data.combat,g:gumruk}}function rol(){const ben=benimKimlik(),l=v.o.leadership;return{baskan:l.
president?.character_id===ben,vekil:l.acting?.kind==="deputy"&&l.acting.character_id===ben,mv:v.o.parliament.members.some(x=>x.character_id===ben)}}function oylamaKarti(m,r){const b=oneriBilgi(m),oy=m.
yes+m.no+m.abstain,bekleyen=Math.max(0,m.seats_filled-oy),tum=Math.max(1,m.seats_filled);return`<section class="kart oylama" data-oylama="${esc(m.motion_id)}">
        <div class="ust-satir"><p class="ust-yazi">${esc(b.tur)}</p><span class="cip">${ikon("clock")}<b data-bitis="${m.closes_at}"></b></span></div>
        <h3 class="b3">${esc(b.baslik)}</h3>
        <p class="kucuk" style="margin:0">${esc(b.aciklama)}${m.proposer?" "+\u00E7("\xD6neren: {ad}.",{ad:esc(m.proposer)}):""}</p>
        ${b.etki?`<div class="etki">${ikon("sparkles")}${esc(b.etki)}</div>`:""}
        <div class="oy-say"><span>${\u00E7("Evet")} <b>${sayi(m.yes)}</b></span><span>${\u00E7("\xC7ekimser")} <b>${sayi(m.abstain)}</b></span><span>${\u00E7("Bekleyen")} <b>${sayi(bekleyen)}</b></spa\
n><span>${\u00E7("Hay\u0131r")} <b>${sayi(m.no)}</b></span></div>
        <div class="oy-cubuk"><i class="evet" style="width:${m.yes/tum*100}%"></i><i style="width:${(m.abstain+bekleyen)/tum*100}%"></i><i class="hayir" style="width:${m.no/tum*100}%"></i></div>
        <p class="kucuk" style="margin:0">${\u00E7("Kabul i\xE7in {n} evet gerekir ({dolu} dolu sandalye).",{n:Number(m.required_yes),dolu:Number(m.seats_filled)})}</p>
        ${m.my_vote?`<div class="yasa-bant" style="margin:0">${ikon("check")}<span>${\u00E7("Oyun:")} <b>${esc(OY_AD[m.my_vote]??m.my_vote)}</b></span></div>`:r.mv?`<div class="oy-dugmeler uclu"><butt\
on class="dugme" data-oy="${esc(m.motion_id)}:yes">${ikon("check")}${\u00E7("Evet")}</button>
              <button class="dugme ikincil" data-oy="${esc(m.motion_id)}:abstain">${\u00E7("\xC7ekimser")}</button>
              <button class="dugme ikincil" data-oy="${esc(m.motion_id)}:no">${ikon("x")}${\u00E7("Hay\u0131r")}</button></div>`:`<p class="kucuk" style="margin:0">${\u00E7("Yaln\u0131z milletvekilleri oy \
verir.")}</p>`}
      </section>`}function gecmisHtml(kapanan){return kapanan.length?`<section class="kart" style="margin-top:20px"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Karar defteri")}</p><h2 cla\
ss="b2">${\u00E7("Son kararlar")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></div>
        <div class="liste">${kapanan.slice(0,12).map(m=>{const b=oneriBilgi(m),[ad,renk]=KAPANIS(m);return`<div class="liste-satir"><span class="liste-ikon ${renk==="mercan"?"mercan":renk==="yesil"?"y\
esil":""}">${ikon(b.ik)}</span>
            <div><span class="tur">${esc(b.tur)} \xB7 ${esc(saatYaz(m.closed_at??m.closes_at))}</span><b>${esc(b.baslik)}</b>
              <div class="alt">${\u00E7("Evet {e} \xB7 hay\u0131r {h} \xB7 \xE7ekimser {c}",{e:Number(m.yes),h:Number(m.no),c:Number(m.abstain)})}${m.proposer?" \xB7 "+\u00E7("\xF6neren {ad}",{ad:esc(
m.proposer)}):""}</div></div>
            <span class="cip ${renk}">${esc(ad)}</span></div>`}).join("")}</div></section>`:""}function oneriHtml(r){if(!r.baskan&&!r.vekil&&!r.mv)return"";const l=v.o.leadership,d=[];return(r.baskan||
r.vekil)&&d.push(["sales_tax","percent",\u00E7("Sat\u0131\u015F vergisi")],["wage_tax","hand-coins",\u00E7("Maa\u015F vergisi")]),(r.baskan||r.vekil)&&v.g&&d.push(["customs","shield",\u00E7("G\xFCmr\xFCk ya\
sas\u0131")]),r.baskan&&d.push(["war","swords",\u00E7("Sava\u015F yetkisi")]),(r.baskan||r.mv)&&d.push(["citizenship","id-card",\u00E7("Vatanda\u015Fl\u0131k yasas\u0131")]),r.mv&&d.push(["deputy","ba\
dge-check",\u00E7("Ba\u015Fkan vekili")]),r.mv&&l.president&&d.push(["impeach","user-round",\u00E7("Ba\u015Fkan\u0131 g\xF6revden al")]),r.mv&&d.push(["no_confidence","megaphone",\u00E7("G\xFCvensizlik \xF6\
nergesi")]),(r.baskan||r.vekil||r.mv)&&d.push(["national_goal","target",\u00E7("Haftal\u0131k \xFClke hedefi")]),(r.baskan||r.vekil||r.mv)&&d.push(["anthem","eighth-notes",\u00E7("Milli mar\u015F")]),
`<section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${r.baskan?\u00E7("Ba\u015Fkans\u0131n"):r.vekil?\u00E7("Ba\u015Fkan vekilisin"):\u00E7("Milletvekilisin")}</p><h2 class="b2">${\u00E7(
"\xD6neri yap")}</h2></div><span class="ik-kutu">${ikon("notebook-pen")}</span></div>
        <p class="aciklama">${\u00E7("\xD6neri meclis oylamas\u0131na a\xE7\u0131l\u0131r (en \xE7ok {n} saat). Ayn\u0131 t\xFCrden a\xE7\u0131k oylama varken yenisi a\xE7\u0131lmaz.",{n:Number(v.c.parliamentVoteH)})}\
</p>
        <div class="oneri-dugmeler" style="margin-top:12px">${d.map(([k,ik,ad])=>`<button class="dugme ikincil kucuk-d" data-oneri="${k}">${ikon(ik)}${esc(ad)}</button>`).join("")}</div></section>`}function ilanHtml(r){
const yetkiler=v.w.authorizations??[],ben=v.o.country_id,hazirlik=(v.o.campaigns??[]).filter(x=>x.attacker_country_id===ben&&x.status==="preparing");if(!yetkiler.length&&!hazirlik.length)return"";const iptalSonu=x=>Date.
parse(x.first_round_at)-(v.w.cancel_cutoff_h??6)*36e5;return`<section class="kart"><div class="kart-resim" style="background-image:url('img/olay_savas_ilani.webp')"></div>
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Meclisin verdi\u011Fi yetki")}</p><h2 class="b2">${\u00E7("Sava\u015F ilan\u0131")}</h2></div><span class="ik-kutu">${ikon("swords")}</\
span></div>
        ${hazirlik.map(x=>`<div class="hedef-cift" style="margin-bottom:12px"><span><b>${esc(bolgeAdi(x.target_region_id))} \xB7 ${\u00E7("haz\u0131rl\u0131kta")}</b>
            <span class="kucuk">${\u00E7("\u0130lk tur {zaman}.",{zaman:esc(saatYaz(x.first_round_at))})} ${Date.now()<iptalSonu(x)?\u00E7("\u0130ptal i\xE7in son an {zaman}.",{zaman:esc(saatYaz(new Date(
iptalSonu(x)).toISOString()))}):\u00E7("\u0130ptal s\xFCresi ge\xE7ti.")}</span></span>
          ${r.baskan&&Date.now()<iptalSonu(x)?`<button class="dugme sade kucuk-d" data-iptal="${esc(x.campaign_id)}">${\u00E7("\u0130ptal et")}</button>`:"<span></span>"}</div>`).join("")}
        ${yetkiler.map(y=>`<div class="yigin" style="margin-bottom:14px">
          <p class="aciklama">${\u00E7("Hedef <b>{ulke}</b> \xB7 b\xFCt\xE7e <b>{kr} kredi</b> \xB7 son g\xFCn <b>{zaman}</b>.",{ulke:esc(ulkeAdi(y.target_country_id)),kr:kr(y.budget_cr),zaman:esc(saatYaz(
y.valid_until))})}
            ${\u00E7("\u0130lan bedeli {kr} kredi hazineden d\xFC\u015Fer.",{kr:kr(v.w.declaration_cost_cr)})}${r.baskan?"":" "+\u00E7("\u0130lan\u0131 ba\u015Fkan yapar.")}</p>
          ${y.regime?`<p class="cip ${y.regime==="autonomous"?"yesil":""}" data-yetki-bicim="${esc(y.regime)}">${ikon(y.regime==="autonomous"?"landmark":"flag")}${y.regime==="autonomous"?\u00E7("Al\u0131na\
n b\xF6lgeler \xF6zerk b\xF6lge olur"):\u00E7("Al\u0131nan b\xF6lgeler do\u011Frudan y\xF6netilir")}</p>`:""}
          ${y.blocked?`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(sunucuIletisi(y.blocked.code,y.blocked.hint))}${y.blocked.until?" "+\u00E7("Bekleme biti\u015Fi: {zaman}.",{zaman:esc(
saatYaz(y.blocked.until))}):""}</span></div>`:""}
          ${y.pairs.length?y.pairs.map(p=>`<div class="hedef-cift"><span><b>${esc(bolgeAdi(p.target_region_id))}</b>${p.liberation?` <span class="cip yesil kucuk-cip">${\u00E7("geri alma")}</span>`:""}${p.
capital?` <span class="cip mercan kucuk-cip">${\u00E7("ba\u015Fkent")}</span>`:""}<span class="kucuk">${\u00E7("sald\u0131r\u0131 {bolge} b\xF6lgesinden",{bolge:esc(bolgeAdi(p.origin_region_id))})}${p.
wealth?" \xB7 "+\u00E7("{zenginlik}, g\xFCnde {kr} kr",{zenginlik:esc(ZENGINLIK_AD[p.wealth]??p.wealth),kr:kr(p.income_cr)}):""}</span></span>
            ${r.baskan?`<button class="dugme mercan kucuk-d" ${y.blocked?"disabled":""} data-ilan="${esc(y.authorization_id)}|${esc(p.target_region_id)}|${esc(p.origin_region_id)}">${ikon("swords")}${\u00E7(
"\u0130lan et")}</button>`:"<span></span>"}</div>`).join(""):`<p class="bos">${\u00E7("\u015Eu an sald\u0131r\u0131labilecek b\xF6lge yok: hedef \xFClkenin, kendi b\xF6lgemize kom\u015Fu ve ba\u015Fkent olmayan bir b\xF6lgesi gerekir.")}\
</p>`}
        </div>`).join("")}</section>`}function ciz(){durdur();const o=v.o,r=rol(),acik=v.m.filter(m=>m.status==="open"),kapanan=v.m.filter(m=>m.status!=="open");kap.innerHTML=`<div class="sayfa">
        <div class="meclis-bas resimli" style="--meclis-resim:url('img/baslik_meclis.webp')">
          <div>${ulkeUst(o.country_id,\u00E7("{n} / {toplam} sandalye dolu",{n:o.parliament.members.length,toplam:Number(o.parliament.seats)}))}<h1 class="b1">${\u00E7("Meclis")}</h1>
            <p>${r.baskan?\u00E7("Ba\u015Fkans\u0131n: vergi, g\xFCmr\xFCk ve sava\u015F yetkisi \xF6nerirsin; meclisin verdi\u011Fi yetkiyle sava\u015F ilan edersin."):r.mv?\u00E7("Milletvekilisin: o\
ylamalarda oy verirsin; vatanda\u015Fl\u0131k yasas\u0131, ba\u015Fkan vekili ve g\xF6revden alma \xF6nerebilirsin."):\u00E7("Kararlar dolu sandalyelerin \xE7o\u011Funlu\u011Fu ve en az iki evetle ge\xE7er. Oylamalar\
\u0131 burada izlersin.")}</p></div>
          <div class="butce"><small>${\u00E7("Hazine")}</small><b>${\u00E7("{kr} kr",{kr:kr(o.treasury_cr)})}</b><small>${\u00E7("Belediye {kr} kr",{kr:kr(o.capital_municipality_cr)})}</small></div>
        </div>
        <div class="yasa-bant">${ikon("scroll-text")}<span><b>${\u00E7("Y\xFCr\xFCrl\xFCkte:")}</b> ${\u00E7("sat\u0131\u015F vergisi {s} \xB7 maa\u015F vergisi {m} \xB7 vatanda\u015Fl\u0131k {v}",{s:ppmYuzde(
o.sales_tax_ppm),m:ppmYuzde(o.wage_tax_ppm),v:esc((POLITIKA[o.citizenship_policy]?.ad??o.citizenship_policy).toLocaleLowerCase(DIL.yerel))})}${v.g?" \xB7 "+\u00E7("g\xFCmr\xFCk {yasa}",{yasa:esc(gumrukOzet(
v.g.law))}):""}${o.at_war?" \xB7 "+\u00E7("sava\u015Fta"):""}</span></div>
        <div id="meclis-salon-yer"></div>
        ${acik.length?`<div class="izgara uc">${acik.map(m=>oylamaKarti(m,r)).join("")}</div>`:`<section class="kart"><p class="bos">${\u00E7("\u015Eu an a\xE7\u0131k oylama yok.")}${o.parliament.members.
length<v.c.motionMinYes?" "+\u00E7("Mecliste en az {n} milletvekili olunca \xF6neriler oylanabilir.",{n:Number(v.c.motionMinYes)}):""}</p></section>`}
        <div class="izgara iki" style="margin-top:20px">
          <div class="yigin">${oneriHtml(r)}${ilanHtml(r)}
            <section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Milletvekilleri")}</p><h2 class="b2">${\u00E7("Meclis \xFCyeleri")}</h2></div><span class="ik-kutu">${ikon("l\
andmark")}</span></div>
              ${o.parliament.members.length?`<div class="koltuk-liste">${o.parliament.members.map(m=>`<div class="koltuk">${avatarKutu(m.name,m.character_id)}
                <div><b>${esc(m.name)}${m.character_id===benimKimlik()?" "+\u00E7("(sen)"):""}</b><div class="kucuk">${esc(m.party??\u00E7("Ba\u011F\u0131ms\u0131z"))} \xB7 ${\u00E7("{n}. sandalye",{n:Number(
m.seat_no)})}</div></div>
                ${o.leadership.deputy?.character_id===m.character_id?`<span class="cip">${\u00E7("Ba\u015Fkan vekili")}</span>`:"<span></span>"}</div>`).join("")}</div>`:`<p class="bos">${\u00E7("Mecl\
is bo\u015F. Se\xE7imle dolacak.")}</p>`}
            </section>
          </div>
          <div class="yigin">${gecmisHtml(kapanan)||`<section class="kart"><p class="bos">${\u00E7("Hen\xFCz karar yok.")}</p></section>`}</div>
        </div></div>`,$("#meclis-salon-yer",kap)?.replaceWith(salon.el),salon.yaz({o:v.o,m:v.m}),bagla(r);const an=acik.map(m=>m.closes_at).sort()[0]??null;an!==sonAn&&(sonAn=an,sayac.n=0),durdur=geriSay(
kap,()=>setTimeout(tazele,gecikmeli(sayac)))}let sonAn=null;const sayac={n:0};function bagla(r){for(const b of $$("[data-oy]",kap))b.onclick=async()=>{const[id,oy]=b.dataset.oy.split(":");for(const x of $$(
"[data-oy]",kap))x.disabled=!0;try{const s=await Sunucu.yap("motion_vote",{p_motion:id,p_vote:oy});tost(s?.status==="passed"?\u00E7("Oyun kaydedildi; \xF6neri kabul edildi."):s?.status==="failed"?\u00E7(
"Oyun kaydedildi; \xF6neri reddedildi."):\u00E7("Oyun kaydedildi."),"gavel")}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()};for(const b of $$("[data-oneri]",kap))b.onclick=()=>ONERI[b.dataset.
oneri]();for(const b of $$("[data-ilan]",kap))b.onclick=()=>ilanEt(...b.dataset.ilan.split("|"));for(const b of $$("[data-iptal]",kap))b.onclick=()=>pencere({ust:\u00E7("Sava\u015F"),baslik:\u00E7("Ka\
mpanyay\u0131 iptal et"),govde:`<p class="aciklama">${\u00E7("Haz\u0131rl\u0131ktaki kampanya kapan\u0131r; iki \xFClkeye duyurulur. \u0130lan bedeli geri gelmez. Ayn\u0131 iki \xFClke aras\u0131nda yeni kampanya i\xE7in 48 saat beklenir.")}\
</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\u0130ptal et"),sinif:"mercan",is:async()=>{try{await Sunucu.yap("campaign_cancel",{p_campaign:b.dataset.iptal}),tost(\u00E7("Kampanya iptal edildi\
."),"swords")}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}}]})}const vergiFormu=tur=>()=>{const vg=v.vergi,bant=vg.band_ppm,simdi=tur==="sales"?vg.sales_tax_ppm:vg.wage_tax_ppm,ad=tur===
"sales"?\u00E7("Sat\u0131\u015F vergisi"):\u00E7("Maa\u015F vergisi");pencereForm({ust:\u00E7("\xD6neri"),baslik:ad,onayAd:\u00E7("Oylamaya a\xE7"),onayIkon:"gavel",govde:`<p class="aciklama">${\u00E7(
"Y\xFCr\xFCrl\xFCkteki oran <b>{oran}</b>. \u0130zin verilen bant {min}\u2013{max}.",{oran:ppmYuzde(simdi),min:ppmYuzde(bant.min),max:ppmYuzde(bant.max)})}
            ${\u00E7("Kabul edilirse {n} saat sonra y\xFCr\xFCrl\xFC\u011Fe girer.",{n:Number(vg.notice_h)})}</p>
          <label class="alan"><span>${\u00E7("Yeni oran (%)")}</span><input name="oran" inputmode="decimal" required placeholder="${\u00E7("\xF6r. 6")}"></label>`,is:async d=>{const ppm=yuzdePpm(d.get(
"oran"));if(!(ppm>=bant.min&&ppm<=bant.max))throw new Error(\u00E7("Oran {min}\u2013{max} aras\u0131nda olmal\u0131.",{min:ppmYuzde(bant.min),max:ppmYuzde(bant.max)}));await Sunucu.yap(tur==="sales"?"\
motion_propose_tax":"motion_propose_wage_tax",{p_rate_ppm:ppm}),tost(tur==="sales"?\u00E7("Sat\u0131\u015F vergisi \xF6nerisi oylamaya a\xE7\u0131ld\u0131."):\u00E7("Maa\u015F vergisi \xF6nerisi oylamaya a\xE7\u0131l\
d\u0131."),"gavel"),await tazele()}})};async function savasFormu(){const[secenek]=await Promise.all([Sunucu.cagir("character_options")]),hedefler=(secenek.countries??[]).filter(x=>x.id!==v.o.country_id).
sort((a,b)=>(a.awake===b.awake?0:a.awake===!1?1:-1)||ulkeAdi(a.id).localeCompare(ulkeAdi(b.id),DIL.yerel)),sinir=v.c.warAuthorizationH;pencereForm({ust:\u00E7("\xD6neri"),baslik:\u00E7("Sava\u015F yetkisi"),
onayAd:\u00E7("Oylamaya a\xE7"),onaySinif:"mercan",onayIkon:"swords",govde:`<p class="aciklama">${\u00E7("Meclis kabul ederse bu s\xFCre i\xE7inde hedef \xFClkeye sava\u015F ilan edebilirsin. B\xFCt\xE7e hazinedeki harca\
nabilir krediyi a\u015Famaz (\u015Fu an <b>{kr} kredi</b>); ilan bedeli {bedel} kredi b\xFCt\xE7eden d\xFC\u015Fer.",{kr:kr(v.o.treasury_cr),bedel:kr(v.w.declaration_cost_cr)})}</p>
          <label class="alan"><span>${\u00E7("Hedef \xFClke")}</span><select name="hedef" required>${hedefler.map(x=>`<option value="${esc(x.id)}" ${x.awake===!1?"disabled":""}>${esc(DUNYA.ulkeler?.[x.
id]?.ad??x.name)}${x.awake===!1?" \xB7 "+\u00E7("uyuyor"):""}</option>`).join("")}</select>
            <small>${\u00E7("Uyuyan \xFClkeye sava\u015F a\xE7\u0131lamaz.")}</small></label>
          <div class="izgara" style="grid-template-columns:1fr 1fr;gap:12px">
            <label class="alan"><span>${\u00E7("B\xFCt\xE7e (kredi)")}</span><input name="butce" inputmode="decimal" required value="${esc(krediGirdi(Math.min(v.o.treasury_cr,Math.max(v.w.declaration_cost_cr,
0))))}"></label>
            <label class="alan"><span>${\u00E7("S\xFCre (saat)")}</span><input name="saat" inputmode="numeric" required value="72"><small>${sayi(sinir.min)}\u2013${sayi(sinir.max)}</small></label>
          </div>
          <p class="alan-baslik" style="margin:12px 0 6px"><b>${\u00E7("Al\u0131nan b\xF6lgeler nas\u0131l y\xF6netilsin?")}</b></p>
          <div class="radyo-liste" data-bicim-secimi>
            <label class="radyo"><input type="radio" name="bicim" value="direct" checked><span><b>${\u00E7("Do\u011Frudan y\xF6netim")}</b><span class="kucuk">${\u00E7("B\xF6lgenin geliri ve vergisi bizi\
m; bak\u0131m tam; yerel direni\u015F e\u015Fi\u011Fi %25.")}</span></span></label>
            <label class="radyo"><input type="radio" name="bicim" value="autonomous"><span><b>${\u00E7("\xD6zerk b\xF6lge")}</b><span class="kucuk">${\u00E7("Yerliler valisini se\xE7er; gelirin yar\u0131s\u0131 bi\
ze hara\xE7; bak\u0131m d\xF6rtte bir; direni\u015F e\u015Fi\u011Fi %40. Sonradan do\u011Frudan y\xF6netime almak en erken 14 g\xFCn sonra ve s\xF6z bozma say\u0131l\u0131r.")}</span></span></label>
          </div>
          <p class="kucuk" style="margin-top:8px">${\u00E7("Meclis bunu bilerek oylar; ilanda savunan \xFClke ve b\xF6lgede ya\u015Fayanlar g\xF6r\xFCr. Bu yetkiyle al\u0131nan b\xFCt\xFCn b\xF6lgelere uygulan\u0131r.")}\
</p>`,is:async d=>{const butce=krediAlt(d.get("butce")),saat=adetAl(d.get("saat"));if(!(butce>0))throw new Error(\u00E7("B\xFCt\xE7eyi kredi olarak yaz."));if(butce>v.o.treasury_cr)throw new Error(\u00E7(
"B\xFCt\xE7e hazinedeki krediyi a\u015Famaz."));if(!(saat>=sinir.min&&saat<=sinir.max))throw new Error(\u00E7("S\xFCre {min}\u2013{max} saat olmal\u0131.",{min:Number(sinir.min),max:Number(sinir.max)}));
await Sunucu.yap("motion_propose_war",{p_target:d.get("hedef"),p_budget:butce,p_valid_hours:saat,p_regime:d.get("bicim")??"direct"}),tost(\u00E7("Sava\u015F yetkisi \xF6nerisi oylamaya a\xE7\u0131ld\u0131."),
"swords"),await tazele()}})}function vatandaslikFormu(){const simdi=v.o.citizenship_policy;pencereForm({ust:\u00E7("\xD6neri"),baslik:\u00E7("Vatanda\u015Fl\u0131k yasas\u0131"),onayAd:\u00E7("Oylamay\
a a\xE7"),onayIkon:"gavel",govde:`<p class="aciklama">${\u00E7("Y\xFCr\xFCrl\xFCkteki yasa: <b>{yasa}</b>. Kalabal\u0131k gruplar\u0131n \xFClkeye toplu ge\xE7ip se\xE7imleri ele ge\xE7irmesine kar\u015F\u0131 \xFClkenin arac\u0131d\u0131r.",
{yasa:esc(POLITIKA[simdi]?.ad??simdi)})}</p>
          <div class="radyo-liste">${Object.entries(POLITIKA).filter(([k])=>k!==simdi).map(([k,x],i)=>`<label class="radyo"><input type="radio" name="seviye" value="${k}" ${i===0?"checked":""}>
            <span><b>${esc(x.ad)}</b><span class="kucuk">${esc(x.aciklama)}</span></span></label>`).join("")}</div>`,is:async d=>{await Sunucu.yap("motion_propose_citizenship_policy",{p_level:d.get("s\
eviye")}),tost(\u00E7("Vatanda\u015Fl\u0131k yasas\u0131 \xF6nerisi oylamaya a\xE7\u0131ld\u0131."),"id-card"),await tazele()}})}function vekilFormu(){const uyeler=v.o.parliament.members;pencereForm({
ust:\u00E7("\xD6neri"),baslik:\u00E7("Ba\u015Fkan vekili"),onayAd:\u00E7("Oylamaya a\xE7"),onayIkon:"gavel",govde:`<p class="aciklama">${\u00E7("Ba\u015Fkanl\u0131k bo\u015Fal\u0131rsa \xFClkeyi vekil y\xF6netir: vergi \xF6nerebi\
lir, sava\u015F \xF6nerisi ve ilan\u0131 yapamaz. Vekil meclisin bir \xFCyesi olmal\u0131.")}</p>
          <label class="alan"><span>${\u00E7("Milletvekili")}</span><select name="aday">${uyeler.map(x=>`<option value="${esc(x.character_id)}">${esc(x.name)}</option>`).join("")}</select></label>`,is:async d=>{
await Sunucu.yap("motion_propose_deputy",{p_candidate:d.get("aday")}),tost(\u00E7("Ba\u015Fkan vekili \xF6nerisi oylamaya a\xE7\u0131ld\u0131."),"gavel"),await tazele()}})}function gorevdenAlFormu(){const pr=v.
o.leadership.president;pencereForm({ust:\u00E7("\xD6neri"),baslik:\u00E7("Ba\u015Fkan\u0131 g\xF6revden al"),onayAd:\u00E7("Oylamaya a\xE7"),onaySinif:"mercan",onayIkon:"gavel",govde:`<p class="acikla\
ma">${\u00E7("<b>{ad}</b> i\xE7in g\xF6revden alma oylamas\u0131 a\xE7\u0131l\u0131r. Kabul i\xE7in dolu sandalyelerin \xFC\xE7te ikisi ve en az {n} evet gerekir.",{ad:esc(pr?.name??""),n:Number(v.c.impeachment.
minYes)})}</p>`,is:async()=>{await Sunucu.yap("motion_propose_impeach",{}),tost(\u00E7("G\xF6revden alma \xF6nerisi oylamaya a\xE7\u0131ld\u0131."),"gavel"),await tazele()}})}function gumrukFormu(){const g=v.
g,r=g.rule,law=g.law;if(g.pending){tost(\u00E7("Kabul edilmi\u015F g\xFCmr\xFCk yasas\u0131 {zaman} tarihinde y\xFCr\xFCrl\xFC\u011Fe girecek; o zamana kadar yenisi \xF6nerilemez.",{zaman:saatYaz(g.pending.
effective_from)}),"circle-alert");return}pencereForm({ust:\u00E7("\xD6neri"),baslik:\u00E7("G\xFCmr\xFCk yasas\u0131"),onayAd:\u00E7("Oylamaya a\xE7"),onayIkon:"gavel",govde:`<p class="aciklama">${\u00E7(
"Y\xFCr\xFCrl\xFCkteki: <b>{yasa}</b>.",{yasa:esc(gumrukOzet(law))})}
            ${\u00E7("G\xFCmr\xFCk, sava\u015F b\xF6lgesindeki b\xF6lgelerimize d\u0131\u015Far\u0131dan ka\xE7ak y\xFCk getirenleri yakalar; el konan mal ve ceza hazineye ge\xE7er. Kabul edilirse {n} saat sonra y\xFCr\xFCrl\xFC\u011Fe girer.",
{n:Number(r.notice_h)})}</p>
          <p class="ust-yazi">${\u00E7("S\u0131k\u0131l\u0131k")}</p>
          <div class="radyo-liste">${["low","normal","high"].map(k=>`<label class="radyo"><input type="radio" name="sikilik" value="${k}" ${law.strictness===k?"checked":""}>
            <span><b>${esc(SIKILIK_AD[k])}</b><span class="kucuk">${\u00E7("Yakalanma ihtimalinin ba\u015Flang\u0131c\u0131 {oran}; yakalanan {n} saat g\xF6zalt\u0131 al\u0131r.",{oran:ppmYuzde(r.strictness_ppm[k]),
n:Number(r.detention_h[k])})}</span></span></label>`).join("")}</div>
          <label class="alan"><span>${\u00E7("Ceza oran\u0131 (%)")}</span><input name="ceza" inputmode="decimal" required value="${esc((Number(law.finePpm)/1e4).toLocaleString(DIL.yerel,{useGrouping:!1,
maximumFractionDigits:4}))}">
            <small>${\u00E7("Y\xFCk\xFCn kara al\u0131c\u0131daki de\u011Ferine g\xF6re; {min}\u2013{max}",{min:ppmYuzde(r.fine_ppm.min),max:ppmYuzde(r.fine_ppm.max)})}</small></label>
          <p class="ust-yazi">${\u00E7("Yasak mallar")}</p>
          <div class="radyo-liste">${r.goods.map(a=>`<label class="radyo"><input type="checkbox" name="yasak" value="${esc(a)}" ${(law.banned??[]).includes(a)?"checked":""}>
            <span><b>${esc(varlikAdi(a))}</b></span></label>`).join("")}</div>
          <p class="kucuk">${\u00E7("Yasak mal yakalanma ihtimalini art\u0131r\u0131r; yasak malla yakalanan\u0131n cezas\u0131 ve g\xF6zalt\u0131s\u0131 {k} kat\u0131na \xE7\u0131kar.",{k:Number(r.banned_multiplier)})}\
</p>
          <label class="alan"><span>${\u00E7("G\xFCnl\xFCk g\xFCmr\xFCk b\xFCt\xE7esi (kredi)")}</span><input name="butce" inputmode="decimal" required value="${esc(krediGirdi(law.budgetCr))}">
            <small>${\u00E7("Her g\xFCn hazineden \xF6denir; en \xE7ok {kr} kredi. Her 100 kredi yakalanma ihtimalini {oran} art\u0131r\u0131r. Hazinede yoksa o g\xFCn \xF6denmez.",{kr:kr(r.budget_max_cr),
oran:ppmYuzde(r.budget_ppm_per_cr*1e4)})}
              ${\u00E7("B\xFCt\xE7e ka\xE7ak\xE7\u0131y\u0131 cayd\u0131r\u0131r; hazineye gelir getirmez.")}</small></label>
          ${r.inspection_ppm?`<p class="ust-yazi">${\u00E7("Kara borsa denetimi")}</p>
          ${g.black_market_7d?`<p class="kucuk">${kbHaftasi(g.black_market_7d)}</p>`:""}
          <div class="radyo-liste">${["low","normal","high"].map(x=>`<label class="radyo"><input type="radio" name="denetim" value="${x}" ${(law.inspection??"normal")===x?"checked":""}>
            <span><b>${esc(DENETIM_AD[x])}</b><span class="kucuk">${\u00E7("Kara borsadaki her al\u0131mda yakalanma ihtimalinin ba\u015Flang\u0131c\u0131 {oran}.",{oran:ppmYuzde(r.inspection_ppm[x])})}\
</span></span></label>`).join("")}</div>
          <p class="kucuk">${\u00E7("Kara borsada vergi \xF6denmez; s\u0131k\u0131 denetim ka\xE7an vergiyi azalt\u0131r, gev\u015Fek denetimde kara borsa geli\u015Fir. Ceza oran\u0131 ve yasak mallar kara borsada da ge\xE7er.")}\
</p>`:""}
          ${r.police_budget_max_cr!=null?`<p class="ust-yazi">${\u00E7("Kolluk")}</p>
          ${g.police?`<p class="kucuk">${kollukOzeti(g.police)}</p>`:""}
          <label class="alan"><span>${\u00E7("G\xFCnl\xFCk kolluk b\xFCt\xE7esi (kredi)")}</span><input name="kolluk" inputmode="decimal" required value="${esc(kr(Number(law.policeBudgetCr??0)))}">
            <small>${\u00E7("Polis ve jandarma n\xF6betlerinin maa\u015F\u0131 her g\xFCn hazineden bu b\xFCt\xE7eyle \xF6denir (birim ba\u015F\u0131na {w} kredi); en \xE7ok {kr} kredi. 0 olursa n\xF6bet tutulmaz.",
{w:kr(r.police_wage_per_unit_cr),kr:kr(r.police_budget_max_cr)})}</small></label>
          <p class="kucuk">${\u00E7("N\xF6betteki polis b\xF6lgedeki kara borsa al\u0131mlar\u0131n\u0131n, jandarma o b\xF6lgeye gelen ka\xE7ak y\xFCk\xFCn yakalanma ihtimalini art\u0131r\u0131r; yakalanan\u0131n cezas\u0131ndan n\xF6bettekilere prim d\xFC\u015Fe\
r, kalan\u0131 hazineye.")}</p>`:""}`,is:async d=>{const ceza=yuzdePpm(d.get("ceza"));if(!(ceza>=r.fine_ppm.min&&ceza<=r.fine_ppm.max))throw new Error(\u00E7("Ceza oran\u0131 {min}\u2013{max} aras\u0131nda olmal\u0131.",
{min:ppmYuzde(r.fine_ppm.min),max:ppmYuzde(r.fine_ppm.max)}));const butce=krediAlt(d.get("butce"));if(!(butce>=0&&butce<=r.budget_max_cr))throw new Error(\u00E7("G\xFCnl\xFCk b\xFCt\xE7e 0\u2013{kr} kredi olmal\u0131.",
{kr:kr(r.budget_max_cr)}));const kolluk=d.get("kolluk")==null?null:krediAlt(d.get("kolluk"));if(kolluk!=null&&!(kolluk>=0&&kolluk<=r.police_budget_max_cr))throw new Error(\u00E7("Kolluk b\xFCt\xE7esi 0\u2013{kr}\
 kredi olmal\u0131.",{kr:kr(r.police_budget_max_cr)}));await Sunucu.yap("motion_propose_customs",{p_strictness:d.get("sikilik"),p_fine_ppm:ceza,p_banned:d.getAll("yasak"),p_budget_cr:butce,...d.get("d\
enetim")?{p_inspection:d.get("denetim")}:{},...kolluk!=null?{p_police_budget_cr:kolluk}:{}}),tost(\u00E7("G\xFCmr\xFCk yasas\u0131 \xF6nerisi oylamaya a\xE7\u0131ld\u0131."),"gavel"),await tazele()}})}
async function marsFormu(){const d=await Sunucu.cagir("anthem_songs"),l=(d?.songs??[]).filter(x=>!x.current);if(!l.length){tost(d?.anthem?\u00E7("Mar\u015F olabilecek ba\u015Fka kay\u0131tl\u0131 \u015Fark\u0131 yok: \xFClkenin grupl\
ar\u0131 yeni bir \u015Fark\u0131 kaydedince \xF6nerilebilir."):\u00E7("Hen\xFCz mar\u015F olabilecek \u015Fark\u0131 yok: \xFClkenin bir grubu bir \u015Fark\u0131y\u0131 st\xFCdyoda kaydedince \xF6nerilebilir."),
"circle-alert");return}pencereForm({ust:\u00E7("\xD6neri"),baslik:\u00E7("Milli mar\u015F"),onayAd:\u00E7("Oylamaya a\xE7"),onayIkon:"gavel",govde:`<p class="aciklama">${d?.anthem?\u00E7("Bug\xFCnk\xFC mar\u015F\
: <b>{sarki}</b> ({grup}). Yeni mar\u015F \xF6nerisi meclisin salt \xE7o\u011Funlu\u011Fuyla kabul edilir.",{sarki:esc(d.anthem.title),grup:esc(d.anthem.band)}):\u00E7("Meclis \xFClkenin bir grubunun kay\
d\u0131 bitmi\u015F \u015Fark\u0131s\u0131n\u0131 milli mar\u015F se\xE7er; salt \xE7o\u011Funluk yeter. Mar\u015F \xDClkem \u2192 \xD6zet'te \xE7alar, grup unvan al\u0131r; g\xFC\xE7 ya da oy vermez.")}\
</p>
          <fieldset class="alan"><legend>${\u00E7("\u015Eark\u0131")}</legend><div class="radyo-liste">${l.map((x,i)=>`<label class="radyo"><input type="radio" name="sarki" value="${esc(x.song_id)}" ${i===
0?"checked":""}>
            <span><b>${esc(x.title)}</b><span class="kucuk">${esc(\u00E7("{grup} \xB7 \u015Fark\u0131 kalitesi {k} \xB7 kay\u0131t kalitesi {kk}",{grup:x.band??"",k:Number(x.quality??0),kk:Number(x.recording_quality??
0)}))}</span></span></label>`).join("")}</div></fieldset>`,is:async f=>{await Sunucu.yap("motion_propose_anthem",{p_song:String(f.get("sarki"))}),tost(\u00E7("Milli mar\u015F \xF6nergesi oylamaya a\xE7\u0131ld\u0131."),
"gavel"),await tazele()}})}async function guvensizlikFormu(){let h;try{h=await Sunucu.cagir("movement_status")}catch(e){tost(hataMetni(e),"circle-alert");return}const b=h.blocker_no_confidence;if(b){tost(
sunucuIletisi(b.code,b.hint)+(b.until?" "+\u00E7("A\xE7\u0131l\u0131\u015F: {zaman}.",{zaman:saatYaz(b.until)}):""),"circle-alert");return}pencere({ust:\u00E7("\xD6neri"),baslik:\u00E7("G\xFCvensizlik \xF6n\
ergesi"),govde:`<p class="aciklama">${\u00E7("Oylama {saat} saat s\xFCrer. Kabul i\xE7in dolu sandalyelerin \xFC\xE7te ikisi ve en az {n} evet gerekir. Kabul edilirse ola\u011Fan\xFCst\xFC se\xE7im olur; reddedilirse {gun} g\xFCn\
 yeni hareket ba\u015Flamaz.",{saat:sayi(h.rules.parliament_vote_h),n:sayi(h.rules.no_confidence.minYes),gun:sayi(h.rules.cooldown_days)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Oylamaya\
 a\xE7"),sinif:"mercan",ikon:"gavel",is:async()=>{try{await Sunucu.yap("motion_propose_no_confidence",{}),tost(\u00E7("G\xFCvensizlik \xF6nergesi oylamaya a\xE7\u0131ld\u0131."),"gavel")}catch(e){tost(
hataMetni(e),"circle-alert")}await tazele()}}]})}const ONERI={sales_tax:vergiFormu("sales"),wage_tax:vergiFormu("wage"),war:()=>savasFormu().catch(e=>tost(hataMetni(e),"circle-alert")),citizenship:vatandaslikFormu,
deputy:vekilFormu,impeach:gorevdenAlFormu,customs:gumrukFormu,no_confidence:guvensizlikFormu,national_goal:()=>Millet.hedefOner(()=>tazele()).catch(e=>tost(hataMetni(e),"circle-alert")),anthem:()=>marsFormu().
catch(e=>tost(hataMetni(e),"circle-alert"))};function ilanEt(yetki,hedef,koken){const y=v.w.authorizations.find(x=>x.authorization_id===yetki);pencereForm({ust:\u00E7("Sava\u015F ilan\u0131"),baslik:bolgeAdi(
hedef),onayAd:\u00E7("Sava\u015F ilan et"),onaySinif:"mercan",onayIkon:"swords",govde:`<p class="aciklama">${\u00E7("Sald\u0131r\u0131 <b>{koken}</b> b\xF6lgesinden, hedef <b>{ulke}</b>.",{koken:esc(bolgeAdi(
koken)),ulke:esc(ulkeAdi(y?.target_country_id))})}
            ${\u00E7("\u0130lan bedeli <b>{kr} kredi</b> hazineden d\xFC\u015Fer.",{kr:kr(v.w.declaration_cost_cr)})} ${esc(turTakvimi(v.combat))} ${\u00E7("\u0130lan iki \xFClkeye de duyurulur.")}</p\
>
          <p class="kucuk">${\u00E7("\u0130lk turdan {n} saat \xF6ncesine kadar iptal edebilirsin; ilan bedeli geri gelmez.",{n:Number(v.w.cancel_cutoff_h??6)})}</p>`,is:async()=>{const s=await Sunucu.
yap("campaign_declare",{p_authorization:yetki,p_target_region:hedef,p_origin_region:koken});tost(\u00E7("Sava\u015F ilan edildi. \u0130lk tur: {zaman}.",{zaman:saatYaz(s.first_round_at)}),"swords"),Durum.
askerlik().catch(()=>{}),await tazele()}})}const tazele=tazeleyici(async()=>{await yukle(),ciz()});await yukle(),ciz();const b1=Durum.dinle("ulke-olay",({olay,yuk})=>{olay==="parliament.motion_voted"&&
salon.oy(yuk?.data),/^(parliament\.|office\.|tax\.|citizenship\.policy|country\.war_)/.test(olay)&&tazele()});return()=>{durdur(),b1(),salon.kapat()}}}),Parcalar.tamam("ek_27_ulke");
