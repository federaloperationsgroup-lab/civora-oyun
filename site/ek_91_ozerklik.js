// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_91_ozerklik.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("ulke/bolge",{async ac(kap){let s=null,bolge=ozkBakilan;ozkBakilan=null;let kapandi=!1,durdur=()=>{};const sandik=SandikBasi.ac();sandik.dinle("sec",ad=>{(ad==="adaylar"?$("#ozk-adaylar",
kap):$("#ozk-oy",kap)??$("#ozk-adaylar",kap))?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})});const odeme={q:"",sonuc:null,secilen:null,tutar:"",amac:"aid"};let secilenAd=null;
async function yukle(){[s]=await Promise.all([Sunucu.cagir("autonomy_status",{p_region:bolge}),Durum.ozet(),Durum.kurallar()])}const r=()=>s.rule,bk=()=>s.independence?.rule??(()=>{const c=Durum.v.kurallar?.
data?.civic;return c?.independence?{...c.independence,warFreeDays:c.autonomy?.region?.warFreeDays,voter:c.autonomy?.voter,petition:{...c.independence.petition,signerRetentionDays:c.autonomy?.petition?.
signerRetentionDays}}:null})(),ben=()=>Durum.v.ozet?.character??{},benimBolgem=()=>!!s.region.my_region;function sart(tamam,ad,alt){return`<div class="sart ${tamam?"tamam":"eksik"}">${ikon(tamam?"badg\
e-check":"circle-alert")}<span><b>${esc(ad)}</b><span class="kucuk">${esc(alt)}</span></span><span></span></div>`}function engelHtml(b,bgm=!1){return b?`<div class="hata-kutusu" data-${bgm?"bgm":"ozk"}\
-engel="${esc(b.code)}">${ikon("circle-alert")}<span>${esc(bgm?bgmEngel(b.code,bk()):ozkEngel(b.code,r()))}${b.until?" "+\u00E7("A\xE7\u0131l\u0131\u015F: {zaman}.",{zaman:esc(saatYaz(b.until))})+` <b\
 data-bitis="${esc(b.until)}"></b>`:""}</span></div>`:""}function sartlarKarti(){const g=s.region,b=s.blocker,me=s.me,c=ben(),k=r(),bolgeSart=[sart(!g.capital,\u00E7("Ba\u015Fkent de\u011Fil"),\u00E7(
"Ba\u015Fkent \xF6zerk olamaz.")),sart(ozkGun(g.owned_since)>=k.region.ownedDays,\u00E7("En az {n} g\xFCnd\xFCr bu \xFClkenin",{n:sayi(k.region.ownedDays)}),\u00E7("{n} g\xFCnd\xFCr {ulke} \xFClkesinin.",
{n:sayi(Math.floor(ozkGun(g.owned_since))),ulke:ulkeAdi(g.country_id)})),sart(b?.code!=="AUTONOMY_WAR",\u00E7("Son {n} g\xFCnde sava\u015F hedefi de\u011Fil",{n:sayi(k.region.warFreeDays)}),b?.code===
"AUTONOMY_WAR"?\u00E7("Yak\u0131n zamanda sava\u015F hedefi oldu."):\u00E7("Sava\u015F hedefi olmad\u0131.")),sart(Number(g.level)>=k.region.minLevel,\u00E7("\u015Eehir seviyesi en az {n}",{n:sayi(k.region.
minLevel)}),\u00E7("\u015Eu an {n}. seviye.",{n:sayi(g.level)})),sart(Number(g.active_residents)>=k.region.minActiveResidents,\u00E7("En az {n} etkin sakin",{n:sayi(k.region.minActiveResidents)}),\u00E7(
"\u015Eu an {n} etkin sakin (son 7 g\xFCnde \xE7al\u0131\u015Fan).",{n:sayi(g.active_residents)}))],secmenSart=[sart(c.citizenship===g.country_id,\u00E7("Bu \xFClkenin vatanda\u015F\u0131"),\u00E7("Va\
tanda\u015Fl\u0131\u011F\u0131n: {ulke}.",{ulke:ulkeAdi(c.citizenship)})),sart(c.residence===g.region_id&&ozkGun(me.residence_since)>=k.voter.residenceDays,\u00E7("Bu b\xF6lgede en az {n} g\xFCnd\xFCr ikamet",
{n:sayi(k.voter.residenceDays)}),c.residence===g.region_id?\u00E7("{n} g\xFCnd\xFCr burada oturuyorsun.",{n:sayi(Math.floor(ozkGun(me.residence_since)))}):\u00E7("\u0130kametin {bolge}.",{bolge:bolgeAdi(
c.residence)})),sart(ozkGun(c.created_at)>=k.voter.accountDays&&ozkGun(c.citizenship_since)>=k.voter.citizenDays,\u00E7("Hesap ve vatanda\u015Fl\u0131k en az {n} g\xFCnl\xFCk",{n:sayi(Math.max(k.voter.
accountDays,k.voter.citizenDays))}),\u00E7("Hesap {h} g\xFCn, vatanda\u015Fl\u0131k {v} g\xFCn.",{h:sayi(Math.floor(ozkGun(c.created_at))),v:sayi(Math.floor(ozkGun(c.citizenship_since)))})),sart(!!c.civic_tutorial_done,
\u00E7("Vatanda\u015Fl\u0131k \xF6\u011Freticisi"),c.civic_tutorial_done?\u00E7("Bitti."):\u00E7("\xDClkem \u2192 \xD6zet'ten bitirilir.")),sart(Number(me.work_days)>=k.voter.workDays,\u00E7("Son {g} \
g\xFCnde en az {n} g\xFCn i\u015F",{g:sayi(k.voter.workWindowDays),n:sayi(k.voter.workDays)}),\u00E7("{n} farkl\u0131 g\xFCnde i\u015F bitirdin.",{n:sayi(me.work_days)}))];return`<section class="kart"\
 id="ozk-sartlar">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u015Eartlar")}</p><h2 class="b2">${\u00E7("\xD6zerklik i\xE7in b\xF6lge ve se\xE7men")}</h2></div><span class="ik-kutu">${ikon("badge-\
check")}</span></div>
        <p class="ust-yazi">${\u00E7("B\xF6lge")}</p><div class="yigin" style="gap:8px">${bolgeSart.join("")}</div>
        <p class="ust-yazi" style="margin-top:12px">${\u00E7("B\xF6lge se\xE7meni (sen)")}</p><div class="yigin" style="gap:8px">${secmenSart.join("")}</div>
        <p class="kucuk" style="margin-top:8px">${\u00E7("Dilek\xE7eyi imzalamak, referandumda ve vali se\xE7iminde oy vermek i\xE7in b\xF6lge se\xE7meni olmak gerekir. Telefon do\u011Frulamas\u0131 gelince o da \u015Fart olacak.")}\
</p>
      </section>`}function anaKart(sandikYeri=""){const d=s.drive,a=s.autonomy,k=r();if(s.state)return devletKarti(s.state);if(a)return ozerkKarti(a)+(d?(d.stage==="referendum"?sandikYeri:"")+surecKarti(
d):bagimsizlikKarti()+savasYoluKarti());if(d)return(d.stage==="referendum"?sandikYeri:"")+surecKarti(d);const secmen=Number(s.voters??0),b=s.blocker,bf=s.forced_blocker,acik=!b&&s.me.voter,zorunlu=!bf&&
s.me.voter;return`<section class="kart" id="ozk-kart" data-ozk-durum="yok">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xD6zerklik")}</p><h2 class="b2">${\u00E7("B\xF6lge \xF6zerk de\u011Fil")}</h2></div><span class="ik-kutu">${ikon("map-pin-house")}</sp\
an></div>
        <p class="aciklama">${\u00E7("\xD6zerk b\xF6lge \xFClkenin par\xE7as\u0131 kal\u0131r (vatanda\u015Fl\u0131k ve sava\u015F taraf\u0131 de\u011Fi\u015Fmez); kendi valisini se\xE7er ve b\xF6lgede toplanan verginin bir k\u0131sm\u0131n\u0131 kendi b\xFCt\xE7esinde harcar.")}\
</p>
        ${b?engelHtml(b):""}${bf?.code==="AUTONOMY_FORCED_WAIT"?engelHtml(bf):""}
        ${!s.me.voter&&s.me.voter_code?`<div class="yasa-bant uyari" data-ozk-secmen="${esc(s.me.voter_code)}">${ikon("circle-alert")}<span>${esc(ozkSecmenNeden(s.me.voter_code,k))}</span></div>`:""}
        ${acik?`<p class="aciklama">${\u00E7("Dilek\xE7e {gun} g\xFCn imzaya a\xE7\u0131k kal\u0131r. B\xF6lgenin \u015Fu an {n} se\xE7meni var: e\u015Fik {esik} imza ({oran}, en az {min}). E\u015Fik dolunca ulusal meclis oylar.",
{gun:sayi(k.petition.days),n:sayi(secmen),esik:sayi(ozkEsik(k,secmen,!1)),oran:ppmYuzde(k.petition.thresholdPpm),min:sayi(k.petition.minSignatures)})}</p>
          <div class="satir"><button class="dugme altin" id="ozk-dilekce">${ikon("scroll-text")}${\u00E7("\xD6zerklik dilek\xE7esi a\xE7")}</button></div>`:""}
        ${zorunlu?`<hr class="ayrac"><p class="aciklama">${\u00E7("Meclis \xF6zerkli\u011Fi reddetti; b\xF6lge \u015Fimdi referandumu zorlayabilir: {esik} imza ({oran}) toplan\u0131rsa referandum meclise gitmeden a\xE7\u0131l\u0131r.",
{esik:sayi(ozkEsik(k,secmen,!0)),oran:ppmYuzde(k.forced.thresholdPpm)})}</p>
          <div class="satir"><button class="dugme mercan" id="ozk-zorunlu">${ikon("vote")}${\u00E7("Zorunlu referandum dilek\xE7esi a\xE7")}</button></div>`:""}
      </section>`}function surecKarti(d){const bgm=d.kind==="independence",savas=d.path==="war";if(savas&&d.stage==="war")return savasKarti(d);const k=bgm?bk():r(),kartId=bgm?"bgm-surec":"ozk-kart",[ad,
sinif,ik]=OZK_ASAMA[d.stage]??[d.stage,"","scroll-text"],ust=`<div class="kart-bas"><div><p class="ust-yazi">${savas?\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131 dilek\xE7esi"):bgm?\u00E7(
"Ba\u011F\u0131ms\u0131zl\u0131k dilek\xE7esi"):d.path==="forced"?\u00E7("Zorunlu referandum yolu"):\u00E7("\xD6zerklik dilek\xE7esi")} \xB7 ${esc(ad)}</p>
          <h2 class="b2">${bgm?\u00E7("{bolge} i\xE7in ba\u011F\u0131ms\u0131zl\u0131k: {devlet}",{bolge:esc(bolgeAdi(d.region_id)),devlet:esc(bgmAd(d))}):\u00E7("{bolge} i\xE7in \xF6zerklik",{bolge:esc(
bolgeAdi(d.region_id))})}</h2></div><span class="ik-kutu">${ikon(bgm&&d.stage==="petition"?"castle":ik)}</span></div>
        <p class="kucuk">${d.initiator?\u00E7("Ba\u015Flatan {ad} \xB7 {zaman}",{ad:esc(d.initiator),zaman:esc(saatYaz(d.opened_at))}):esc(saatYaz(d.opened_at))}</p>`;if(d.stage==="petition"){const oran=Math.
min(1,Number(d.signatures)/Math.max(1,Number(d.threshold)));return`<section class="kart" id="${kartId}" data-ozk-durum="petition" data-ozk-surec="${esc(d.drive_id)}" data-ozk-tur="${esc(d.kind??"auton\
omy")}">${ust}
          <div class="hareket-sayac"><b data-ozk-imza>${sayi(d.signatures)}</b><span>${\u00E7("/ {esik} imza",{esik:sayi(d.threshold)})}</span>
            <span class="cip">${ikon("clock")}<b data-bitis="${esc(d.petition_closes_at)}"></b></span></div>
          <div class="cubuk" style="margin-top:6px"><i style="width:${Math.round(oran*100)}%"></i></div>
          <p class="kucuk" style="margin-top:6px">${savas&&k.war?\u00E7("E\u015Fik a\xE7\u0131l\u0131\u015Ftaki {n} b\xF6lge se\xE7meninin {oran} kadar\u0131 (en az {min}). E\u015Fik dolunca meclise gitmeden ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131 ilan edilir;\
 ilk tur {gun} g\xFCn sonra.",{n:sayi(d.voters),oran:ppmYuzde(k.war.petition.thresholdPpm),min:sayi(k.war.petition.minSignatures),gun:sayi(k.war.prepDays)}):bgm?\u00E7("E\u015Fik a\xE7\u0131l\u0131\u015Ftaki {n} b\xF6lge se\xE7me\
ninin {oran} kadar\u0131 (en az {min}). E\u015Fik dolunca ulusal meclis \xFC\xE7te iki \xE7o\u011Funlukla oylar.",{n:sayi(d.voters),oran:ppmYuzde(k.petition.thresholdPpm),min:sayi(k.petition.minSignatures)}):
d.path==="forced"?\u00E7("E\u015Fik a\xE7\u0131l\u0131\u015Ftaki {n} b\xF6lge se\xE7meninin {oran} kadar\u0131 (en az {min}). E\u015Fik dolunca referandum meclise gitmeden a\xE7\u0131l\u0131r.",{n:sayi(
d.voters),oran:ppmYuzde(k.forced.thresholdPpm),min:sayi(k.petition.minSignatures)}):\u00E7("E\u015Fik a\xE7\u0131l\u0131\u015Ftaki {n} b\xF6lge se\xE7meninin {oran} kadar\u0131 (en az {min}). E\u015Fik dolunca ulusal meclis oylar.",
{n:sayi(d.voters),oran:ppmYuzde(k.petition.thresholdPpm),min:sayi(k.petition.minSignatures)})}</p>
          <div class="oneri-dugmeler" style="margin-top:10px">
            ${d.signed?`<span class="cip yesil" data-ozk-imzaladin>${ikon("check")}${\u00E7("\u0130mzalad\u0131n")}</span>`:s.me.voter?`<button class="dugme altin" id="ozk-imzala">${ikon("notebook-pen")}${\u00E7(
"\u0130mzala")}</button>`:""}
          </div>
          ${!d.signed&&!s.me.voter&&s.me.voter_code?`<p class="kucuk">${esc(ozkSecmenNeden(s.me.voter_code,k))}</p>`:""}
          <p class="kucuk">${\u00E7("Kimin imzalad\u0131\u011F\u0131 kimseye g\xF6sterilmez; yaln\u0131z say\u0131 herkese a\xE7\u0131k. S\xFCre\xE7 kapand\u0131ktan {gun} g\xFCn sonra imzalayanlar\u0131n kimli\u011Fi silinir.",
{gun:sayi(k.petition.signerRetentionDays)})}</p>
        </section>`}if(d.stage==="parliament"){const m=d.motion??{};return`<section class="kart" id="${kartId}" data-ozk-durum="parliament" data-ozk-surec="${esc(d.drive_id)}" data-ozk-tur="${esc(d.kind??
"autonomy")}">${ust}
          <p class="aciklama">${\u00E7("Dilek\xE7e {n} imzayla e\u015Fi\u011Fe ula\u015Ft\u0131. Ulusal meclis oyluyor: kabul i\xE7in {e} evet gerekir ({dolu} dolu sandalye).",{n:sayi(d.signatures),e:sayi(
m.required_yes??0),dolu:sayi(m.seats_filled??0)})}</p>
          <div class="oy-say"><span>${\u00E7("Evet")} <b>${sayi(m.yes??0)}</b></span><span>${\u00E7("\xC7ekimser")} <b>${sayi(m.abstain??0)}</b></span><span>${\u00E7("Hay\u0131r")} <b>${sayi(m.no??0)}\
</b></span>
            ${m.closes_at?`<span class="cip">${ikon("clock")}<b data-bitis="${esc(m.closes_at)}"></b></span>`:""}</div>
          <p class="kucuk" style="margin-top:8px">${bgm?\u00E7("Kabul edilirse b\xF6lgede {saat} saatlik referandum a\xE7\u0131l\u0131r. Reddedilirse s\xFCre\xE7 kapan\u0131r; b\xF6lge {gun} g\xFCn yeni ba\u011F\u0131ms\u0131zl\u0131k dilek\xE7esi a\xE7amaz.",
{saat:sayi(k.referendum.hours),gun:sayi(k.cooldownDays)}):\u00E7("Kabul edilirse b\xF6lgede {saat} saatlik referandum a\xE7\u0131l\u0131r. Reddedilirse b\xF6lge {gun} g\xFCn sonra {oran} imzayla referandumu zorlayabilir.",
{saat:sayi(k.referendum.hours),gun:sayi(k.forced.waitDays),oran:ppmYuzde(k.forced.thresholdPpm)})}</p>
          ${s.me.mp?`<div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="ulke/meclis">${ikon("gavel")}${\u00E7("Meclise git, oy ver")}</button></div>`:""}
        </section>`}const kat=Number(d.turnout??0),sec=Math.max(1,Number(d.referendum_voters??0));return`<section class="kart" id="${kartId}" data-ozk-durum="referendum" data-ozk-surec="${esc(d.drive_id)}\
" data-ozk-tur="${esc(d.kind??"autonomy")}">${ust}
        <div class="hareket-sayac"><b data-ozk-katilim>${sayi(kat)}</b><span>${\u00E7("/ {n} se\xE7men oy verdi",{n:sayi(d.referendum_voters??0)})}</span>
          <span class="cip">${ikon("clock")}<b data-bitis="${esc(d.referendum_closes_at)}"></b></span></div>
        <div class="cubuk" style="margin-top:6px"><i style="width:${Math.round(Math.min(1,kat/sec)*100)}%"></i></div>
        <p class="kucuk" style="margin-top:6px">${\u00E7("Kabul i\xE7in kat\u0131l\u0131m en az {k} ve oylar\u0131n en az {e} kadar\u0131 evet olmal\u0131. Se\xE7men listesi a\xE7\u0131l\u0131\u015Fta dondu; oylar gizli, sonu\xE7 kapan\u0131nca a\xE7\u0131klan\u0131r.",
{k:ppmYuzde(k.referendum.turnoutPpm),e:ppmYuzde(k.referendum.yesPpm)})}${bgm?" "+\u00E7("B\xF6lge sald\u0131r\u0131 alt\u0131ndaysa say\u0131m sava\u015F bitene kadar bekler. Kabul edilirse yeni devlet kurulur."):
""}</p>
        <div id="ozk-oy" class="oneri-dugmeler" style="margin-top:10px">
          ${d.voted?`<span class="cip yesil" data-ozk-oyladin>${ikon("check")}${\u00E7("Oyunu kulland\u0131n")}</span>`:d.in_referendum?`<button class="dugme altin" data-ozk-oy="yes">${ikon("check")}${\u00E7(
"Evet")}</button><button class="dugme mercan" data-ozk-oy="no">${ikon("x")}${\u00E7("Hay\u0131r")}</button>`:`<p class="kucuk">${\u00E7("Se\xE7men listesinde de\u011Filsin: liste referandum a\xE7\u0131l\u0131rken b\xF6lge se\
\xE7menlerinden dondu.")}</p>`}
        </div>
      </section>`}function ozerkKarti(a){const k=r(),g=a.governor,e=a.election,yeniSecim=e?Date.parse(e.voting_start)<=Date.now()?\u00E7("Vali se\xE7iminde oylama s\xFCr\xFCyor."):Date.parse(e.candidacy_start)<=
Date.now()?\u00E7("Vali se\xE7iminde adayl\u0131k s\xFCr\xFCyor."):\u00E7("S\u0131radaki vali se\xE7iminin adayl\u0131\u011F\u0131 {zaman} ba\u015Flar.",{zaman:saatYaz(e.candidacy_start)}):"",fetih=a.
conquest??null;return`<section class="kart" id="ozk-kart" data-ozk-durum="autonomous" data-ozk-ozerklik="${esc(a.autonomy_id)}" data-ozk-kaynak="${esc(a.source??"petition")}">
        <div class="kart-bas"><div><p class="ust-yazi">${fetih?\u00E7("Fetih \xF6zerkli\u011Fi \xB7 {zaman} tarihinden beri",{zaman:esc(saatYaz(a.started_at))}):\u00E7("\xD6zerk b\xF6lge \xB7 {zaman} tarihinde\
n beri",{zaman:esc(saatYaz(a.started_at))})}</p>
          <h2 class="b2">${g?\u00E7("Vali {ad}",{ad:esc(g.name)}):\u00E7("Vali yok")}</h2></div><span class="ik-kutu">${ikon("landmark")}</span></div>
        ${g?`<p class="kucuk">${\u00E7("D\xF6nemi {zaman} biter.",{zaman:esc(saatYaz(g.term_end))})} <b data-bitis="${esc(g.term_end)}"></b></p>`:`<p class="kucuk">${\u00E7("G\xF6revde vali yok; se\xE7ilen \
vali g\xF6reve ba\u015Flay\u0131nca b\xFCt\xE7eyi o kullan\u0131r.")}</p>`}
        <div class="ozk-butce" data-ozk-butce="${esc(String(a.budget_cr??0))}"><span>${\u00E7("B\xF6lge b\xFCt\xE7esi")}</span><b>${\u00E7("{kr} kr",{kr:kr(a.budget_cr??0)})}</b></div>
        ${fetih?`<p class="kucuk" data-ozk-fetih>${\u00E7("B\xF6lgeyi {ulke} tutuyor; yerliler ({halk} vatanda\u015Flar\u0131) ve {ulke} vatanda\u015Flar\u0131 valisini se\xE7er. B\xF6lgenin g\xFCnl\xFCk geliri ve vergisinin {oran} kad\
ar\u0131 {ulke} hazinesine hara\xE7, kalan\u0131 b\xF6lge b\xFCt\xE7esine.",{ulke:esc(ulkeAdi(a.country_id)),halk:esc(ulkeAdi(fetih.people_country_id)),oran:ppmYuzde(fetih.tribute_ppm??5e5)})}${fetih.
occupied?" "+\u00E7("\u0130\u015Fgal s\xFCrerken ulusal meclis \xF6zerkli\u011Fi kald\u0131ramaz; y\xF6netim bi\xE7imini Topraklar'dan meclis oyuyla de\u011Fi\u015Ftirir. Ba\u011F\u0131ms\u0131zl\u0131k yolu kapal\u0131."):
""}</p>`:`<p class="kucuk">${\u00E7("Her g\xFCn b\xF6lgede bir \xF6nceki g\xFCn toplan\u0131p hazineye kalan sat\u0131\u015F ve maa\u015F vergisinin {oran} kadar\u0131 hazineden b\xF6lge b\xFCt\xE7esine ge\xE7er (hazinede yoksa oldu\u011Fu kadar).",
{oran:ppmYuzde(k.taxSharePpm)})}</p>`}
        ${yeniSecim?`<p class="kucuk">${esc(yeniSecim)}</p>`:""}
        ${a.me_governor?`<div class="satir" style="margin-top:8px"><button class="dugme sade kucuk-d" id="ozk-istifa">${ikon("door-open")}${\u00E7("Valilikten istifa et")}</button></div>`:""}
        ${s.me.mp&&a.revoke_from?kaldirmaHtml(a):""}
      </section>`}function kaldirmaHtml(a){if(a.revoke_motion_id)return`<div class="yasa-bant uyari" data-ozk-kaldirma>${ikon("gavel")}<span>${\u00E7("Mecliste bu b\xF6lgenin \xF6zerkli\u011Fini kald\u0131rma oylamas\
\u0131 s\xFCr\xFCyor.")}</span>
        <button class="dugme kucuk-d ikincil" data-git="ulke/meclis">${\u00E7("Meclis")}</button></div>`;const erken=Date.parse(a.revoke_from)>Date.now();return`<hr class="ayrac"><p class="kucuk">${\u00E7(
"Ulusal meclis \xF6zerkli\u011Fi en erken {gun} g\xFCn sonra, dolu sandalyelerin \xFC\xE7te ikisiyle kald\u0131rabilir.",{gun:sayi(r().revoke.minDays)})}
        ${erken?" "+\u00E7("Kald\u0131rma \xF6nerisi {zaman} tarihinden sonra verilebilir.",{zaman:esc(saatYaz(a.revoke_from))}):""}</p>
        ${erken?"":`<div class="satir"><button class="dugme mercan kucuk-d" id="ozk-kaldir">${ikon("gavel")}${\u00E7("\xD6zerkli\u011Fi kald\u0131rma \xF6nergesi ver")}</button></div>`}`}function bagimsizlikKarti(){
const ind=s.independence,k=bk();if(!ind||!k)return"";const g=s.region,b=ind.blocker,a=s.autonomy,secmen=Number(ind.voters??0),acik=!b&&s.me.voter,adlar=ind.names??[],gun=ozkGun(a?.started_at),sartlar=[
sart(gun>=k.region.autonomyDays,\u00E7("En az {n} g\xFCnd\xFCr \xF6zerk",{n:sayi(k.region.autonomyDays)}),\u00E7("{n} g\xFCnd\xFCr \xF6zerk.",{n:sayi(Math.floor(gun))})),sart(b?.code!=="AUTONOMY_WAR",
\u00E7("Son {n} g\xFCnde sava\u015F hedefi de\u011Fil",{n:sayi(k.warFreeDays)}),b?.code==="AUTONOMY_WAR"?\u00E7("Yak\u0131n zamanda sava\u015F hedefi oldu."):\u00E7("Sava\u015F hedefi olmad\u0131.")),
sart(Number(g.level)>=k.region.minLevel,\u00E7("\u015Eehir seviyesi en az {n}",{n:sayi(k.region.minLevel)}),\u00E7("\u015Eu an {n}. seviye.",{n:sayi(g.level)})),sart(Number(g.active_residents)>=k.region.
minActiveResidents,\u00E7("En az {n} etkin sakin",{n:sayi(k.region.minActiveResidents)}),\u00E7("\u015Eu an {n} etkin sakin (son 7 g\xFCnde \xE7al\u0131\u015Fan).",{n:sayi(g.active_residents)}))];return`\
<section class="kart" id="bgm-kart" data-bgm-durum="${b?"engel":"acik"}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k")}</p><h2 class="b2">${\u00E7("Ba\u011F\u0131ms\u0131z devlet olmak")}</h2></div><span class="ik-kutu">${ikon(
"castle")}</span></div>
        <p class="aciklama">${\u00E7("\xD6zerk b\xF6lge referandumla ba\u011F\u0131ms\u0131z devlet olabilir. Devletin ad\u0131 listeden se\xE7ilir; ba\u015Fkent bu b\xF6lge olur ve ilk {gun} g\xFCn korumas\u0131zd\u0131r: bu s\xFCrede fethedilirse devl\
et da\u011F\u0131l\u0131r.",{gun:sayi(k.state.unprotectedDays)})}</p>
        <div class="yigin" style="gap:8px">${sartlar.join("")}</div>
        ${b?engelHtml(b,!0):""}
        ${!s.me.voter&&s.me.voter_code?`<div class="yasa-bant uyari" data-ozk-secmen="${esc(s.me.voter_code)}">${ikon("circle-alert")}<span>${esc(ozkSecmenNeden(s.me.voter_code,r()))}</span></div>`:""}\

        ${acik&&adlar.length?`<p class="aciklama" style="margin-top:10px">${\u00E7("Dilek\xE7e {gun} g\xFCn imzaya a\xE7\u0131k kal\u0131r. B\xF6lgenin \u015Fu an {n} se\xE7meni var: e\u015Fik {esik} imza ({oran}, en az {min}). E\u015Fik do\
lunca ulusal meclis \xFC\xE7te iki \xE7o\u011Funlukla oylar.",{gun:sayi(k.petition.days),n:sayi(secmen),esik:sayi(bgmEsik(k,secmen)),oran:ppmYuzde(k.petition.thresholdPpm),min:sayi(k.petition.minSignatures)})}\
</p>
          <label class="alan"><span>${\u00E7("Yeni devletin ad\u0131")}</span><select id="bgm-ad">${adlar.map(x=>`<option value="${esc(x.id)}"${secilenAd===x.id?" selected":""}>${esc(DIL.kod==="en"?x.
en:x.tr)}</option>`).join("")}</select></label>
          <div class="satir"><button class="dugme altin" id="bgm-dilekce">${ikon("castle")}${\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k dilek\xE7esi a\xE7")}</button></div>`:acik?`<p class="kucuk">${\u00E7(
"Listede bo\u015F ad kalmad\u0131; \u015Fu an yeni devlet kurulamaz.")}</p>`:""}
      </section>`}function savasYoluKarti(){const w=s.independence?.war,k=bk();if(!w||!k?.war)return"";const b=w.blocker;if(b?.code==="INDEPENDENCE_WAR_NO_REJECTION")return"";const acik=!b&&s.me.voter,
adlar=w.names??[],secmen=Number(w.voters??0),bitis=w.last_reject_at?new Date(Date.parse(w.last_reject_at)+k.war.afterRejectDays*864e5).toISOString():null;return`<section class="kart" id="bgm-savas-yol\
u" data-bgm-savas-yolu="${b?"engel":"acik"}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k \xB7 sava\u015F yolu")}</p><h2 class="b2">${\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131")}\
</h2></div><span class="ik-kutu">${ikon("swords")}</span></div>
        <p class="aciklama">${\u00E7("Ulusal meclis ba\u011F\u0131ms\u0131zl\u0131\u011F\u0131 reddetti. B\xF6lge se\xE7menleri daha y\xFCksek e\u015Fikli bir dilek\xE7eyle ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131 ba\u015Flatabilir: b\xF6lgenin se\xE7menleri ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131nda\
, \xFClkenin \xF6teki vatanda\u015Flar\u0131 \xFClke taraf\u0131nda sava\u015F\u0131r. Kazan\u0131l\u0131rsa devlet kurulur; kaybedilirse \xF6zerklik kalkar ve sava\u015F\u0131n liderleri siciline kay\u0131t d\xFC\u015Fer.")}\
</p>
        ${bitis?`<p class="kucuk">${\u00E7("Sava\u015F yolu {zaman} tarihine kadar a\xE7\u0131k.",{zaman:esc(saatYaz(bitis))})} <b data-bitis="${esc(bitis)}"></b></p>`:""}
        ${b?engelHtml(b,!0):""}
        ${!s.me.voter&&s.me.voter_code?`<div class="yasa-bant uyari" data-ozk-secmen="${esc(s.me.voter_code)}">${ikon("circle-alert")}<span>${esc(ozkSecmenNeden(s.me.voter_code,r()))}</span></div>`:""}\

        ${acik&&adlar.length?`<p class="aciklama" style="margin-top:10px">${\u00E7("Dilek\xE7e {gun} g\xFCn imzaya a\xE7\u0131k kal\u0131r. B\xF6lgenin \u015Fu an {n} se\xE7meni var: e\u015Fik {esik} imza ({oran}, en az {min}). E\u015Fik do\
lunca sava\u015F ilan edilir; ilk tur {hazirlik} g\xFCn sonra.",{gun:sayi(k.war.petition.days),n:sayi(secmen),esik:sayi(bgmSavasEsik(k,secmen)),oran:ppmYuzde(k.war.petition.thresholdPpm),min:sayi(k.war.
petition.minSignatures),hazirlik:sayi(k.war.prepDays)})}</p>
          <label class="alan"><span>${\u00E7("Kurulacak devletin ad\u0131")}</span><select id="bgm-savas-ad">${adlar.map(x=>`<option value="${esc(x.id)}"${secilenAd===x.id?" selected":""}>${esc(DIL.kod===
"en"?x.en:x.tr)}</option>`).join("")}</select></label>
          <div class="satir"><button class="dugme mercan" id="bgm-savas-dilekce">${ikon("swords")}${\u00E7("Sava\u015F yolunun dilek\xE7esini a\xE7")}</button></div>`:acik?`<p class="kucuk">${\u00E7("\
Listede bo\u015F ad kalmad\u0131; \u015Fu an yeni devlet kurulamaz.")}</p>`:""}
      </section>`}function savasKarti(d){const w=d.war??{},c=w.campaign??{},me=w.me??{},k=bk(),taraf=devletGorunumAdi(w.state),ulke2=ulkeAdi(d.country_id),hazirlik=c.status==="preparing",durum=c.paused?
\u00E7("Kampanya sistem ar\u0131zas\u0131 nedeniyle duraklat\u0131ld\u0131; devam\u0131 bekleniyor."):hazirlik?\u00E7("Haz\u0131rl\u0131k: ilk tur {zaman}.",{zaman:esc(saatYaz(c.first_round_at))}):c.open_round_no?
\u00E7("{n}. tur s\xFCr\xFCyor \xB7 skor {a}\u2013{d} (ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131\u2013\xFClke).",{n:sayi(c.open_round_no),a:sayi(c.attacker_wins??0),d:sayi(c.defender_wins??0)}):\u00E7(
"Turlar aras\u0131 \xB7 skor {a}\u2013{d} (ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131\u2013\xFClke); s\u0131radaki tur {zaman}.",{a:sayi(c.attacker_wins??0),d:sayi(c.defender_wins??0),zaman:esc(saatYaz(
c.next_round_at))}),sandik2=w.chest??{},verilen=w.given??{},son=w.supplied?.last,katildi2=!!me.joined,katilmaNeden=me.join_code==="INDEPENDENCE_WAR_DEFENDER"?\u00E7("Bu sava\u015Fta \xFClke taraf\u0131nda vurdun; \
ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131na ge\xE7emezsin."):me.join_code==="INDEPENDENCE_WAR_CLOSED"?"":me.join_code&&me.join_code!=="INDEPENDENCE_WAR_JOINED"?ozkSecmenNeden(me.join_code,r()):"";return`\
<section class="kart" id="bgm-savas" data-bgm-savas="${esc(d.drive_id)}" data-bgm-kampanya="${esc(w.campaign_id??"")}" data-bgm-savas-durum="${esc(c.status??"")}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131")} \xB7 ${hazirlik?\u00E7("Haz\u0131rl\u0131k"):\u00E7("Sava\u015F")}</p>
          <h2 class="b2">${\u00E7("{devlet}, {ulke} \xFClkesine kar\u015F\u0131",{devlet:`<span class="ulke-nokta" style="background:${esc(w.state?.color??"#87938C")}"></span> ${esc(taraf)}`,ulke:esc(
ulke2)})}</h2></div>
          <span class="ik-kutu">${ikon("swords")}</span></div>
        <p class="kucuk">${d.initiator?\u00E7("Ba\u015Flatan {ad} \xB7 {zaman}",{ad:esc(d.initiator),zaman:esc(saatYaz(d.opened_at))}):esc(saatYaz(d.opened_at))}</p>
        <div class="yasa-bant${hazirlik?"":" uyari"}" style="margin-top:8px">${ikon(hazirlik?"hourglass":"swords")}<span>${durum}${hazirlik&&c.first_round_at?` <b data-bitis="${esc(c.first_round_at)}"\
></b>`:""}</span></div>
        <div class="oy-say" style="margin-top:10px"><span>${\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131nda")} <b data-bgm-savasan>${sayi(w.fighters??0)}</b></span>
          <span>${\u00E7("Sand\u0131k")} <b data-bgm-sandik>${\u00E7("{kr} kr",{kr:kr(sandik2.cr??0)})}</b></span>
          <span>${ikon("target")} <b>${sayi(sandik2.ammo??0)}</b></span><span>${ikon("package")} <b>${sayi(sandik2.logistics??0)}</b></span></div>
        <p class="kucuk">${\u00E7("{n} ki\u015Fi sand\u0131\u011Fa koydu. Her tur a\xE7\u0131l\u0131rken sand\u0131\u011F\u0131n m\xFChimmat\u0131 ve lojisti\u011Fi cephedeki ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131na e\u015Fit da\u011F\u0131t\u0131l\u0131r (kalan turlara b\xF6l\xFCnerek; ki\u015Fi ba\u015F\u0131na bir tur\
da kullan\u0131labilecek kadar). Kazan\u0131l\u0131rsa kalan sand\u0131k yeni devletin, kaybedilirse \xFClkenin hazinesine ge\xE7er.",{n:sayi(verilen.donors??0)})}${son?" "+\u00E7("Son ikmal ({n}. tur\
): ki\u015Fi ba\u015F\u0131 {a} m\xFChimmat, {l} lojistik.",{n:sayi(son.round_no),a:sayi(son.ammo_each),l:sayi(son.logistics_each)}):""}</p>
        <div class="oneri-dugmeler" style="margin-top:10px">
          ${katildi2?`<span class="cip yesil" data-bgm-katildin>${ikon("check")}${\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131ndas\u0131n")}</span>`:me.can_join?`<button class="dugme mercan" id\
="bgm-katil">${ikon("user-round-plus")}${\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131na kat\u0131l")}</button>`:me.side==="defender"?`<span class="cip">${ikon("shield")}${\u00E7("\xDClke taraf\u0131nda\
s\u0131n")}</span>`:""}
          ${w.campaign_id&&(katildi2||me.side==="defender")?`<button class="dugme ikincil" data-bgm-cephe="${esc(w.campaign_id)}">${ikon("swords")}${\u00E7("Cepheye git")}</button>`:""}
        </div>
        ${me.can_join?`<p class="kucuk">${\u00E7("Kat\u0131lmadan vurursan \xFClke taraf\u0131nda say\u0131l\u0131rs\u0131n ve ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131na ge\xE7emezsin. Kat\u0131l\u0131m geri al\u0131nmaz.")}\
</p>`:""}
        ${katilmaNeden?`<p class="kucuk" data-bgm-katilamaz="${esc(me.join_code)}">${esc(katilmaNeden)}</p>`:""}
        ${katildi2?`<form class="form" id="bgm-sandik-form" novalidate style="margin-top:10px">
            <p class="ust-yazi">${\u00E7("Sand\u0131\u011Fa koy")}${me.gifts?" \xB7 "+\u00E7("Senin katk\u0131n: {kr} kr, {a} m\xFChimmat, {l} lojistik",{kr:kr(me.gifts.cr??0),a:sayi(me.gifts.ammo??0),
l:sayi(me.gifts.logistics??0)}):""}</p>
            <div class="satir" style="flex-wrap:wrap;gap:8px">
              <select name="varlik" aria-label="${\u00E7("Ne koyacaks\u0131n")}"><option value="CR">${\u00E7("Kredi")}</option><option value="muhimmat@1">${esc(varlikAdi("muhimmat@1"))}</option><optio\
n value="lojistik@1">${esc(varlikAdi("lojistik@1"))}</option></select>
              <input name="miktar" inputmode="decimal" placeholder="${\u00E7("Miktar")}" aria-label="${\u00E7("Miktar")}" style="max-width:9em">
              <button class="dugme altin" type="submit">${ikon("hand-coins")}${\u00E7("Sand\u0131\u011Fa koy")}</button></div>
            <p class="kucuk">${\u00E7("Koydu\u011Fun geri al\u0131nmaz. Kimin ne koydu\u011Fu g\xF6sterilmez; yaln\u0131z toplam ve katk\u0131 veren say\u0131s\u0131 herkese a\xE7\u0131k.")}</p>
          </form>`:""}
      </section>`}function devletKarti(st){const korumasiz=!st.protected&&st.unprotected_until,secim=Date.parse(st.choice_until)>Date.now(),e=st.election,ad=devletGorunumAdi(st);return`<section class=\
"kart" id="bgm-devlet" data-bgm-devlet="${esc(st.country_id)}" data-bgm-korumasiz="${korumasiz?"evet":"hayir"}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Yeni devlet \xB7 {zaman} kuruldu",{zaman:esc(saatYaz(st.founded_at))})}</p>
          <h2 class="b2">${esc(ad)}</h2></div><span class="ik-kutu">${ikon("castle")}</span></div>
        <p class="kucuk">${st.insurgent_since?\u00E7("{ulke} \xFClkesinden ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131yla ayr\u0131ld\u0131. Ba\u015Fkent {bolge}; {n} vatanda\u015F.",{ulke:esc(ulkeAdi(
st.independence_from)),bolge:esc(bolgeAdi(st.capital_region_id)),n:sayi(st.citizens??0)}):\u00E7("{ulke} \xFClkesinden referandumla ayr\u0131ld\u0131. Ba\u015Fkent {bolge}; {n} vatanda\u015F.",{ulke:esc(
ulkeAdi(st.independence_from)),bolge:esc(bolgeAdi(st.capital_region_id)),n:sayi(st.citizens??0)})}</p>
        ${korumasiz?`<div class="yasa-bant uyari" style="margin-top:8px">${ikon("shield-half")}<span>${\u00E7("Ba\u015Fkent korumas\u0131z: {zaman} tarihine kadar fethedilirse devlet da\u011F\u0131l\u0131r ve vatanda\u015Flar \xF6nce\
ki vatanda\u015Fl\u0131klar\u0131na d\xF6ner.",{zaman:esc(saatYaz(st.unprotected_until))})} <b data-bitis="${esc(st.unprotected_until)}"></b></span></div>`:`<div class="yasa-bant" style="margin-top:8p\
x">${ikon("shield")}<span>${\u00E7("Ba\u015Fkent korumal\u0131: art\u0131k fethedilemez.")}</span></div>`}
        ${secim?`<p class="aciklama" style="margin-top:10px">${\u00E7("B\xF6lgede oturan {ulke} vatanda\u015Flar\u0131 {zaman} tarihine kadar yeni devletin vatanda\u015F\u0131 olmay\u0131 se\xE7ebilir; sonra ola\u011Fan ba\u015Fvuru yap\u0131l\u0131r.",
{ulke:esc(ulkeAdi(st.independence_from)),zaman:esc(saatYaz(st.choice_until))})} <b data-bitis="${esc(st.choice_until)}"></b></p>`:""}
        <div class="oneri-dugmeler" style="margin-top:8px">
          ${st.me_citizen?`<span class="cip yesil" data-bgm-vatandas>${ikon("check")}${\u00E7("Bu devletin vatanda\u015F\u0131s\u0131n")}</span>`:st.can_choose?`<button class="dugme altin" id="bgm-sec\
">${ikon("id-card")}${\u00E7("{devlet} vatanda\u015F\u0131 ol",{devlet:esc(ad)})}</button>`:""}
        </div>
        ${e?`<p class="kucuk" style="margin-top:8px" data-bgm-secim="${esc(e.stage)}">${e.stage==="scheduled"?\u00E7("Kurucu Meclis se\xE7imi: se\xE7men listesi {zaman} donar; oylama {oy} ba\u015Flar.",
{zaman:esc(saatYaz(e.freeze_at)),oy:esc(saatYaz(e.voting_start))}):e.stage==="candidacy"?\u00E7("Kurucu Meclis se\xE7iminde adayl\u0131k s\xFCr\xFCyor (\xDClkem \u2192 Se\xE7im)."):\u00E7("Kurucu Mecl\
is se\xE7iminde oylama s\xFCr\xFCyor (\xDClkem \u2192 Se\xE7im).")}</p>`:""}
      </section>`}function bgmKurallarKarti(){const k=bk();if(!k||!s.independence&&!s.state)return"";const maddeler=[["map-pin-house",\u00E7("B\xF6lge \u015Fart\u0131: en az {gun} g\xFCnd\xFCr \xF6zerk, son {savas} g\xFCnde s\
ava\u015F hedefi de\u011Fil, \u015Fehir seviyesi en az {sev} ve en az {sakin} etkin sakin.",{gun:sayi(k.region.autonomyDays),savas:sayi(k.warFreeDays),sev:sayi(k.region.minLevel),sakin:sayi(k.region.minActiveResidents)})],
["scroll-text",\u00E7("Dilek\xE7e {gun} g\xFCn; e\u015Fik a\xE7\u0131l\u0131\u015Ftaki b\xF6lge se\xE7menlerinin {oran} kadar\u0131 (en az {min}). Devletin ad\u0131 listeden se\xE7ilir; bir ad bir kez verilir.",
{gun:sayi(k.petition.days),oran:ppmYuzde(k.petition.thresholdPpm),min:sayi(k.petition.minSignatures)})],["gavel",\u00E7("Ulusal meclis dolu sandalyelerin \xFC\xE7te ikisiyle (en az {n} evet) kabul ederse re\
ferandum a\xE7\u0131l\u0131r; reddederse s\xFCre\xE7 kapan\u0131r.",{n:sayi(k.parliament.minYes)})],["vote",\u00E7("Referandum {saat} saat s\xFCrer; kabul i\xE7in kat\u0131l\u0131m en az {k}, evet en az {e}. B\xF6lge sa\
ld\u0131r\u0131 alt\u0131ndayken say\u0131m sava\u015F bitene kadar bekler.",{saat:sayi(k.referendum.hours),k:ppmYuzde(k.referendum.turnoutPpm),e:ppmYuzde(k.referendum.yesPpm)})],["castle",\u00E7("Kab\
ul edilirse yeni devlet kurulur: ba\u015Fkent bu b\xF6lge, b\xF6lge b\xFCt\xE7esi devletin hazinesine ge\xE7er, Kurucu Meclis se\xE7imi a\xE7\u0131l\u0131r. B\xF6lgede oturan vatanda\u015Flar {gun} g\xFCn i\xE7inde yeni devletin vatanda\u015F\u0131 olmay\u0131 se\xE7e\
bilir.",{gun:sayi(k.state.choiceDays)})],["shield-half",\u00E7("Ba\u015Fkent ilk {gun} g\xFCn korumas\u0131zd\u0131r; bu s\xFCrede fethedilirse devlet da\u011F\u0131l\u0131r ve vatanda\u015Flar \xF6nceki vatanda\u015Fl\u0131klar\u0131na d\xF6ner. Sonra ba\u015Fkent k\
orumal\u0131 olur.",{gun:sayi(k.state.unprotectedDays)})],["hourglass",\u00E7("Ba\u015Far\u0131s\u0131z s\xFCre\xE7ten sonra {gun} g\xFCn yeni ba\u011F\u0131ms\u0131zl\u0131k dilek\xE7esi a\xE7\u0131lmaz.",
{gun:sayi(k.cooldownDays)})],...k.war?[["swords",\u00E7("Sava\u015F yolu: meclis reddettikten sonra {gun} g\xFCn i\xE7inde a\xE7\u0131l\u0131r (bu bekleme onu engellemez). Dilek\xE7e {dg} g\xFCn; e\u015Fik b\xF6lge se\xE7menlerinin {oran} ka\
dar\u0131 (en az {min}). E\u015Fik dolunca meclise gitmeden ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131 ilan edilir; ilk tur {hz} g\xFCn sonra, turlar ola\u011Fan sava\u015F\u0131n takvimiyle.",{
gun:sayi(k.war.afterRejectDays),dg:sayi(k.war.petition.days),oran:ppmYuzde(k.war.petition.thresholdPpm),min:sayi(k.war.petition.minSignatures),hz:sayi(k.war.prepDays)})],["users-round",\u00E7("Ba\u011F\u0131ms\u0131\
zl\u0131k taraf\u0131nda yaln\u0131z b\xF6lgenin se\xE7menleri (kat\u0131larak), \xFClke taraf\u0131nda \xFClkenin \xF6teki vatanda\u015Flar\u0131 sava\u015F\u0131r; d\u0131\u015Far\u0131dan g\xF6n\xFCll\xFC ve yabanc\u0131 yok. Kat\u0131lmadan vuran \xFClke taraf\u0131nda say\u0131l\u0131r. Sava\u015F s\xFCrerken \xF6zer\
klik kald\u0131r\u0131lamaz, b\xF6lgeye ba\u015Fka \xFClke sald\u0131ramaz, b\xF6lge bar\u0131\u015Fla devredilemez.")],["hand-coins",\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131ndakiler sand\u0131\u011Fa kredi, m\xFChimmat ve loji\
stik koyar; her tur a\xE7\u0131l\u0131rken m\xFChimmat ve lojistik cephedekilere e\u015Fit da\u011F\u0131t\u0131l\u0131r.")],["scale",\u00E7("Kazan\u0131l\u0131rsa devlet kurulur (ba\u015Fkent korumas\u0131z ba\u015Flar). Kay\
bedilirse \xF6zerklik kalkar, dilek\xE7eyi ba\u015Flatan ve en \xE7ok hasar veren {n} ki\u015Fi siciline kay\u0131t d\xFC\u015Fer, b\xF6lgede {gun} g\xFCn \xF6zerklik s\xFCreci a\xE7\u0131lmaz.",{n:sayi(
k.war.leaders),gun:sayi(k.war.cooldownDays)})]]:[]];return`<section class="kart" id="bgm-kurallar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kurallar")}</p><h2 class="b2">${\u00E7("Ba\u011F\u0131\
ms\u0131zl\u0131k nas\u0131l i\u015Fler?")}</h2></div><span class="ik-kutu">${ikon("castle")}</span></div>
        <div class="liste">${maddeler.map(([ik,m])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(m)}</div></div><span></span></div>`).
join("")}</div>
      </section>`}function seciminKarti(a){const e=a?.election;if(!e)return"";const oylama=Date.parse(e.voting_start)<=Date.now()&&Date.parse(e.voting_end)>Date.now(),adaylik=!oylama&&Date.parse(e.candidacy_start)<=
Date.now()&&Date.parse(e.voting_start)>Date.now(),adaylar=e.candidates??[];return`<section class="kart" id="ozk-secim" data-ozk-secim="${esc(e.election_id)}" data-ozk-secim-asama="${oylama?"voting":adaylik?
"candidacy":"scheduled"}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Vali se\xE7imi")}</p><h2 class="b2">${oylama?\u00E7("Oylama s\xFCr\xFCyor"):adaylik?\u00E7("Adayl\u0131k s\xFCr\xFCyor"):\u00E7("S\u0131rada\
ki se\xE7im")}</h2></div>
          <span class="ik-kutu">${ikon("vote")}</span></div>
        <p class="kucuk">${oylama?\u00E7("Oylama {zaman} biter.",{zaman:esc(saatYaz(e.voting_end))})+` <b data-bitis="${esc(e.voting_end)}"></b>`:adaylik?\u00E7("Adayl\u0131k {zaman} biter; sonra {saat} sa\
at oylama.",{zaman:esc(saatYaz(e.voting_start)),saat:sayi(r().governor.votingH)})+` <b data-bitis="${esc(e.voting_start)}"></b>`:\u00E7("Adayl\u0131k {zaman} ba\u015Flar.",{zaman:esc(saatYaz(e.candidacy_start))})}\
</p>
        <div class="koltuk-liste" id="ozk-adaylar" style="margin-top:10px">${adaylar.length?adaylar.map(c=>`<div class="koltuk" data-ozk-aday="${esc(c.character_id)}">${avatarKutu(c.name,c.character_id)}\

            <div><b>${esc(c.name)}</b><div class="kucuk">${\u00E7("Aday")}</div></div>
            ${oylama&&s.me.voter&&!e.me_voted?`<button class="dugme altin kucuk-d" data-ozk-vali-oy="${esc(c.character_id)}">${ikon("vote")}${\u00E7("Oy ver")}</button>`:""}</div>`).join(""):`<p class\
="kucuk">${adaylik?\u00E7("Hen\xFCz aday yok. Adayl\u0131k bitince aday yoksa yeni se\xE7im a\xE7\u0131l\u0131r."):\u00E7("Adaylar adayl\u0131k ba\u015Flay\u0131nca g\xF6r\xFCn\xFCr.")}</p>`}</div>
        ${oylama&&e.me_voted||adaylik&&s.me.voter?`<div class="oneri-dugmeler" style="margin-top:10px">
          ${oylama&&e.me_voted?`<span class="cip yesil" data-ozk-vali-oyladin>${ikon("check")}${\u00E7("Oyunu kulland\u0131n")}</span>`:""}
          ${adaylik&&s.me.voter?e.me_candidate?`<span class="cip yesil">${ikon("check")}${\u00E7("Adays\u0131n")}</span><button class="dugme sade kucuk-d" id="ozk-cekil">${\u00E7("Adayl\u0131ktan \xE7ekil")}\
</button>`:`<button class="dugme ikincil" id="ozk-aday">${ikon("user-round-plus")}${\u00E7("Vali aday\u0131 ol")}</button>`:""}
        </div>`:""}
        ${!s.me.voter&&(oylama||adaylik)&&s.me.voter_code?`<p class="kucuk">${esc(ozkSecmenNeden(s.me.voter_code,r()))}</p>`:""}
        <p class="kucuk">${\u00E7("En \xE7ok oy alan kazan\u0131r; e\u015Fitlikte kura \xE7ekilir. Oy gizlidir. D\xF6nem {gun} g\xFCn.",{gun:sayi(r().governor.termDays)})}</p>
      </section>`}function odemeKarti(a){if(!a?.me_governor)return"";const k=r(),sec=odeme.secilen;return`<section class="kart" id="ozk-odeme-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Valinin b\xFCt\xE7esi")}</p><h2 class="b2">${\u00E7("B\xFCt\xE7eden \xF6deme yap")}</h2></div><span class="ik-kutu">${ikon("hand-coins")}\
</span></div>
        <p class="kucuk">${\u00E7("Al\u0131c\u0131 b\xF6lgenin sakini olmal\u0131; kendine \xF6deme yapamazs\u0131n. G\xFCnde en \xE7ok {n} \xF6deme; bug\xFCn {m}. Her \xF6deme herkese a\xE7\u0131k resm\xEE kay\u0131tta.",
{n:sayi(k.payment.dailyMax),m:sayi(a.payments_today??0)})}</p>
        ${sec?`<div class="koltuk" style="margin-top:8px">${avatarKutu(sec.name,sec.character_id)}<div><b>${esc(sec.name)}</b><div class="kucuk">${esc(ulkeAdi(sec.country_id))}</div></div>
            <button class="dugme sade kucuk-d" id="ozk-alici-degis">${\u00E7("De\u011Fi\u015Ftir")}</button></div>
          <form class="form ozk-odeme" id="ozk-odeme" novalidate style="margin-top:8px">
            <label class="alan"><span>${\u00E7("Tutar (kredi)")}</span><input name="tutar" inputmode="decimal" value="${esc(odeme.tutar)}" placeholder="${\u00E7("\xF6r. 25")}"></label>
            <label class="alan"><span>${\u00E7("Ama\xE7")}</span><select name="amac">${(k.payment.purposes??Object.keys(OZK_AMAC)).map(x=>`<option value="${esc(x)}"${odeme.amac===x?" selected":""}>${esc(
ozkAmac(x))}</option>`).join("")}</select></label>
            <div class="satir"><button class="dugme altin" type="submit">${ikon("hand-coins")}${\u00E7("\xD6de")}</button><span class="kucuk">${\u00E7("B\xFCt\xE7ede {kr} kr",{kr:kr(a.budget_cr??0)})}\
</span></div>
          </form>`:`<form class="sohbet-yaz" id="ozk-alici-ara" novalidate style="margin-top:8px"><input name="q" minlength="2" maxlength="24" placeholder="${\u00E7("Sakinin ad\u0131 (en az 2 harf)")}\
" value="${esc(odeme.q)}" aria-label="${\u00E7("Sakinin ad\u0131")}" autocomplete="off">
            <button class="dugme ikincil" type="submit">${ikon("zoom-in")}${\u00E7("Ara")}</button></form>
          ${odeme.sonuc?`<div class="koltuk-liste" style="margin-top:10px">${odeme.sonuc.length?odeme.sonuc.map(x=>`<div class="koltuk">${avatarKutu(x.name,x.character_id)}<div><b>${esc(x.name)}</b>
              <div class="kucuk">${esc(ulkeAdi(x.country_id))}</div></div><button class="dugme ikincil kucuk-d" data-ozk-alici="${esc(x.character_id)}">${\u00E7("Se\xE7")}</button></div>`).join(""):`<\
p class="kucuk">${\u00E7("Bu adla b\xF6lgede oturan bulunamad\u0131.")}</p>`}</div>`:""}`}
      </section>`}function butceKarti(a){if(!a)return"";const paylar=a.tax_shares??[],odemeler=a.payments??[];return`<section class="kart" id="ozk-hareketler">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Herkese a\xE7\u0131k")}</p><h2 class="b2">${\u00E7("B\xF6lge b\xFCt\xE7esinin hareketleri")}</h2></div><span class="ik-kutu">${ikon("re\
ceipt-text")}</span></div>
        <p class="ust-yazi">${\u00E7("G\xFCnl\xFCk vergi pay\u0131")}</p>
        ${paylar.length?`<div class="yigin" style="gap:6px">${paylar.map(t=>`<div class="liste-satir" data-ozk-pay="${esc(t.game_day)}"><span class="liste-ikon">${ikon("coins")}</span>
            <div><span class="tur">${esc(new Date(t.game_day+"T12:00:00Z").toLocaleDateString(DIL.yerel,{day:"numeric",month:"short"}))}</span>
              <b>${\u00E7("{kr} kr b\xFCt\xE7eye ge\xE7ti",{kr:kr(t.paid_cr)})}</b>
              <div class="alt">${\u00E7("Taban: sat\u0131\u015F {s} kr, maa\u015F {m} kr; pay {p} kr.",{s:kr(t.sales_cr),m:kr(t.wage_cr),p:kr(t.share_cr)})}${Number(t.paid_cr)<Number(t.share_cr)?" "+\u00E7(
"Hazinede yetmedi."):""}</div></div><span></span></div>`).join("")}</div>`:`<p class="kucuk">${\u00E7("\u0130lk pay \xF6zerkli\u011Fin ilk g\xFCn\xFCn\xFCn ertesinde yaz\u0131l\u0131r.")}</p>`}
        <p class="ust-yazi" style="margin-top:12px">${\u00E7("Valinin \xF6demeleri")}</p>
        ${odemeler.length?`<div class="yigin" style="gap:6px">${odemeler.map(p=>`<div class="liste-satir" data-ozk-odeme="${esc(p.payment_id)}"><span class="liste-ikon altin">${ikon("hand-coins")}</sp\
an>
            <div><span class="tur">${esc(saatYaz(p.at))} \xB7 ${esc(ozkAmac(p.purpose))}</span><b>${\u00E7("{ad} adl\u0131 ki\u015Fiye {kr} kr",{ad:esc(p.recipient),kr:kr(p.amount_cr)})}</b></div><spa\
n></span></div>`).join("")}</div>`:`<p class="kucuk">${\u00E7("Hen\xFCz \xF6deme yok.")}</p>`}
      </section>`}function ulkeKarti(){const u=s.country??{},bu=s.region.region_id,oz=(u.autonomies??[]).filter(x=>x.region_id!==bu),sr=(u.drives??[]).filter(x=>x.region_id!==bu);return!oz.length&&!sr.
length?"":`<section class="kart" id="ozk-ulke">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(ulkeAdi(s.region.country_id))}</p><h2 class="b2">${\u00E7("\xD6zerk b\xF6lgeler ve s\xFCren s\xFCre\xE7ler")}</h2></div><span class="ik-kut\
u">${ikon("map-pin")}</span></div>
        <div class="yigin ozk-liste" style="gap:6px">
          ${oz.map(x=>`<button class="liste-satir tikla" data-ozk-bolge="${esc(x.region_id)}"><span class="liste-ikon yesil">${ikon("landmark")}</span>
            <div><b>${esc(bolgeAdi(x.region_id))}</b><div class="alt">${x.governor?\u00E7("\xD6zerk \xB7 Vali {ad}",{ad:esc(x.governor)}):\u00E7("\xD6zerk \xB7 vali yok")}</div></div><span></span></bu\
tton>`).join("")}
          ${sr.map(x=>`<button class="liste-satir tikla" data-ozk-bolge="${esc(x.region_id)}"><span class="liste-ikon altin">${ikon(x.kind==="independence"?"castle":(OZK_ASAMA[x.stage]??[])[2]??"scrol\
l-text")}</span>
            <div><b>${esc(bolgeAdi(x.region_id))}</b><div class="alt">${x.kind==="independence"?esc(\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k: {devlet}",{devlet:devletAdi(x.state_name)}))+" \xB7 ":""}${esc(
(OZK_ASAMA[x.stage]??[x.stage])[0])}${x.stage==="petition"?" \xB7 "+\u00E7("{n}/{esik} imza",{n:sayi(x.signatures),esik:sayi(x.threshold)}):""}</div></div><span></span></button>`).join("")}
        </div>
      </section>`}function gecmisKarti(){const g=s.recent??[];return g.length?`<section class="kart" id="ozk-gecmis"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("B\xF6lgenin kayd\u0131")}<\
/p><h2 class="b2">${\u00E7("Son s\xFCre\xE7ler")}</h2></div></div>
        <div class="yigin" style="gap:6px">${g.map(ozkSurecSatiri).join("")}</div></section>`:""}function kurallarKarti(){if(s.state)return"";const k=r(),maddeler=[["map-pin-house",\u00E7("B\xF6lge \u015Fart\u0131\
: ba\u015Fkent de\u011Fil, en az {gun} g\xFCnd\xFCr bu \xFClkenin, son {savas} g\xFCnde sava\u015F hedefi de\u011Fil, \u015Fehir seviyesi en az {sev} ve en az {sakin} etkin sakin.",{gun:sayi(k.region.
ownedDays),savas:sayi(k.region.warFreeDays),sev:sayi(k.region.minLevel),sakin:sayi(k.region.minActiveResidents)})],["users-round",\u00E7("B\xF6lge se\xE7meni: bu \xFClkenin vatanda\u015F\u0131; b\xF6lgede en az {i} g\xFCnd\xFCr \
oturan, hesab\u0131 ve vatanda\u015Fl\u0131\u011F\u0131 en az {h} g\xFCnl\xFCk, vatanda\u015Fl\u0131k \xF6\u011Freticisini bitirmi\u015F ve son {g} g\xFCnde en az {n} farkl\u0131 g\xFCnde i\u015F bitirmi\u015F.",
{i:sayi(k.voter.residenceDays),h:sayi(Math.max(k.voter.accountDays,k.voter.citizenDays)),g:sayi(k.voter.workWindowDays),n:sayi(k.voter.workDays)})],["scroll-text",\u00E7("Dilek\xE7e {gun} g\xFCn; e\u015Fik a\xE7\u0131l\u0131\
\u015Ftaki b\xF6lge se\xE7menlerinin {oran} kadar\u0131 (en az {min}). \u0130mzalayanlar gizli.",{gun:sayi(k.petition.days),oran:ppmYuzde(k.petition.thresholdPpm),min:sayi(k.petition.minSignatures)})],
["gavel",\u00E7("Ulusal meclis salt \xE7o\u011Funlukla kabul ederse referandum a\xE7\u0131l\u0131r. Reddederse (ya da mecliste yeterli milletvekili yoksa) {gun} g\xFCn sonra {oran} imzayla referandum zorlan\u0131r.",
{gun:sayi(k.forced.waitDays),oran:ppmYuzde(k.forced.thresholdPpm)})],["vote",\u00E7("Referandum {saat} saat s\xFCrer; se\xE7men listesi a\xE7\u0131l\u0131\u015Fta donar ve oy gizlidir. Kabul i\xE7in kat\u0131l\u0131m en az {k}, evet en a\
z {e}.",{saat:sayi(k.referendum.hours),k:ppmYuzde(k.referendum.turnoutPpm),e:ppmYuzde(k.referendum.yesPpm)})],["landmark",\u00E7("\xD6zerk b\xF6lge valisini {gun} g\xFCnl\xFCk d\xF6nemlerle se\xE7er ({c} saat adayl\u0131k, \
{v} saat oylama). B\xF6lgede toplan\u0131p hazineye kalan sat\u0131\u015F ve maa\u015F vergisinin {oran} kadar\u0131 her g\xFCn b\xF6lge b\xFCt\xE7esine ge\xE7er; vali b\xFCt\xE7eden b\xF6lgenin sakinlerine \xF6der ve her \xF6deme herkese a\xE7\u0131kt\u0131r.",
{gun:sayi(k.governor.termDays),c:sayi(k.governor.candidacyH),v:sayi(k.governor.votingH),oran:ppmYuzde(k.taxSharePpm)})],["shield",\u00E7("B\xF6lge \xFClkenin par\xE7as\u0131 kal\u0131r: vatanda\u015Fl\u0131k ve sava\u015F taraf\u0131 de\u011Fi\u015F\
mez. B\xF6lge el de\u011Fi\u015Ftirirse \xF6zerklik biter; ulusal meclis en erken {gun} g\xFCn sonra \xFC\xE7te iki \xE7o\u011Funlukla kald\u0131rabilir. Biten \xF6zerkli\u011Fin b\xFCt\xE7esi hazineye d\xF6ner.",
{gun:sayi(k.revoke.minDays)})],["hourglass",\u00E7("Ba\u015Far\u0131s\u0131z s\xFCre\xE7ten sonra {gun} g\xFCn yeni dilek\xE7e a\xE7\u0131lmaz; kald\u0131r\u0131lan \xF6zerklikten sonra {k} g\xFCn.",{
gun:sayi(k.cooldownDays),k:sayi(k.revoke.cooldownDays)})]];return`<section class="kart" id="ozk-kurallar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kurallar")}</p><h2 class="b2">${\u00E7(
"\xD6zerklik nas\u0131l i\u015Fler?")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></div>
        <div class="liste">${maddeler.map(([ik,m])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(m)}</div></div><span></span></div>`).
join("")}</div>
      </section>`}function ciz(){durdur();const a=s.autonomy,d=s.drive,cip=s.state?[\u00E7("Yeni devlet"),"yesil","castle"]:d?.stage==="war"?[\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131"),
"mercan","swords"]:d?.kind==="independence"?[\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k s\xFCreci"),"mercan","castle"]:a?[\u00E7("\xD6zerk b\xF6lge"),"yesil","landmark"]:d?OZK_ASAMA[d.stage]??[d.stage,"",
"scroll-text"]:[\u00E7("\xD6zerk de\u011Fil"),"","map-pin-house"],sv=s.state?null:ozkSandikVerisi(s),ref=sv&&d?.stage==="referendum";kap.innerHTML=`<div class="sayfa" data-ozk-bolge-ekran="${esc(s.region.
region_id)}">
        <div class="sayfa-bas"><div>${ulkeUst(s.region.country_id,\u00E7("B\xF6lge"))}<h1 class="b1">${esc(bolgeAdi(s.region.region_id))}</h1>
          <p class="aciklama">${s.state?\u00E7("Yeni bir devletin ba\u015Fkenti. B\xF6lgede oturan eski \xFClke vatanda\u015Flar\u0131 se\xE7im s\xFCresinde yeni devletin vatanda\u015F\u0131 olabilir."):
benimBolgem()?\u00E7("\u0130kamet etti\u011Fin b\xF6lge. B\xF6lgenin se\xE7menleri \xF6zerklik isteyebilir; \xF6zerk b\xF6lge kendi valisini se\xE7er ve b\xFCt\xE7esini harcar."):\u00E7("Ba\u015Fka bir b\xF6l\
geye bak\u0131yorsun; imza ve oy yaln\u0131z o b\xF6lgede oturanlar i\xE7indir.")}</p></div>
          <span class="cip ${cip[1]}" id="ozk-cip">${ikon(cip[2])}${esc(cip[0])}</span></div>
        ${!benimBolgem()&&ben().residence?`<div class="satir" style="margin-bottom:10px"><button class="dugme sade kucuk-d" data-ozk-bolge="${esc(ben().residence)}">${ikon("map-pin-house")}${\u00E7("K\
endi b\xF6lgeme d\xF6n")}</button></div>`:""}
        <div class="izgara iki">
          <div class="yigin">${anaKart(ref?'<div id="ozk-sandik-yer"></div>':"")}${sv&&!ref?'<div id="ozk-sandik-yer"></div>':""}${seciminKarti(a)}${odemeKarti(a)}</div>
          <div class="yigin">${!a&&!d&&!s.state?sartlarKarti():""}${butceKarti(a)}${ulkeKarti()}${gecmisKarti()}${bgmKurallarKarti()}${kurallarKarti()}</div>
        </div></div>`;const sy=$("#ozk-sandik-yer",kap);sy&&sv&&(sy.replaceWith(sandik.el),sandik.yaz(sv)),bagla();const an=[d?.stage==="petition"?d.petition_closes_at:null,d?.stage==="referendum"?d.referendum_closes_at:
null,d?.motion?.closes_at,s.blocker?.until,s.forced_blocker?.until,a?.election?.voting_start,a?.election?.voting_end,a?.election?.candidacy_start,a?.governor?.term_end,s.independence?.blocker?.until,s.
state?.choice_until,s.state?.unprotected_until,s.state?.election?.voting_start,d?.war?.campaign?.first_round_at,d?.war?.campaign?.next_round_at,s.independence?.war?.blocker?.until].filter(x=>x&&Date.parse(
x)>Date.now()-6e4).sort()[0]??null;an!==sonAn&&(sonAn=an,sayac.n=0),durdur=geriSay(kap,()=>setTimeout(tazele,gecikmeli(sayac)))}let sonAn=null;const sayac={n:0};function onay({ust,baslik,govde,ad,sinif="\
altin",ik="check",is}){pencere({ust,baslik,govde,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad,sinif,ikon:ik,is:async()=>{try{await is()}catch(err){tost(hataMetni(err),"circle-alert")}await tazele()}}]})}function bagla(){
for(const b of $$("[data-git]",kap))b.addEventListener("click",()=>Kabuk.git(b.dataset.git));for(const b of $$("[data-ozk-bolge]",kap))b.addEventListener("click",()=>{bolge=b.dataset.ozkBolge,odeme.sonuc=
null,odeme.secilen=null,tazele()});const k=r();$("#ozk-dilekce",kap)?.addEventListener("click",()=>onay({ust:\u00E7("\xD6zerklik"),baslik:\u00E7("\xD6zerklik dilek\xE7esi a\xE7"),govde:`<p class="acik\
lama">${\u00E7("Ba\u015Flatan olarak ad\u0131n herkese g\xF6r\xFCn\xFCr; ilk imzay\u0131 sen atars\u0131n. {gun} g\xFCn i\xE7inde {esik} imza toplan\u0131rsa ulusal meclis oylar.",{gun:sayi(k.petition.
days),esik:sayi(ozkEsik(k,s.voters??0,!1))})}</p>`,ad:\u00E7("Dilek\xE7eyi a\xE7"),ik:"scroll-text",is:async()=>{await Sunucu.yap("autonomy_petition_open",{p_forced:!1}),tost(\u00E7("Dilek\xE7e a\xE7\u0131ld\u0131; i\
lk imzay\u0131 sen att\u0131n."),"scroll-text")}})),$("#ozk-zorunlu",kap)?.addEventListener("click",()=>onay({ust:\u00E7("\xD6zerklik"),baslik:\u00E7("Zorunlu referandum dilek\xE7esi"),govde:`<p class\
="aciklama">${\u00E7("{gun} g\xFCn i\xE7inde {esik} imza toplan\u0131rsa referandum meclise gitmeden a\xE7\u0131l\u0131r. Ba\u015Flatan olarak ad\u0131n herkese g\xF6r\xFCn\xFCr.",{gun:sayi(k.petition.
days),esik:sayi(ozkEsik(k,s.voters??0,!0))})}</p>`,ad:\u00E7("Dilek\xE7eyi a\xE7"),sinif:"mercan",ik:"vote",is:async()=>{await Sunucu.yap("autonomy_petition_open",{p_forced:!0}),tost(\u00E7("Zorunlu r\
eferandum dilek\xE7esi a\xE7\u0131ld\u0131."),"vote")}})),$("#ozk-imzala",kap)?.addEventListener("click",()=>onay({ust:s.drive?.kind==="independence"?\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k dilek\xE7esi"):
\u00E7("\xD6zerklik dilek\xE7esi"),baslik:\u00E7("Dilek\xE7eyi imzala"),govde:`<p class="aciklama">${\u00E7("\u0130mzan geri al\u0131nmaz. Kimin imzalad\u0131\u011F\u0131 kimseye g\xF6sterilmez; yaln\u0131z say\u0131 herkese a\xE7\u0131k.")}\
</p>`,ad:\u00E7("\u0130mzala"),ik:"notebook-pen",is:async()=>{const y=await Sunucu.yap("autonomy_sign",{p_drive:s.drive.drive_id});tost(y?.stage==="parliament"?\u00E7("\u0130mzan e\u015Fi\u011Fi doldurdu: ulusal mec\
lis oylayacak."):y?.stage==="referendum"?\u00E7("\u0130mzan e\u015Fi\u011Fi doldurdu: referandum ba\u015Flad\u0131!"):\u00E7("\u0130mzan say\u0131ld\u0131."),y?.stage==="petition"?"check":"party-poppe\
r")}}));for(const b of $$("[data-ozk-oy]",kap))b.addEventListener("click",()=>{const evet=b.dataset.ozkOy==="yes",bgm=s.drive?.kind==="independence";OyKabini.ac({ust:\u00E7("Referandum"),baslik:bgm?evet?
\u00E7("Ba\u011F\u0131ms\u0131zl\u0131\u011Fa evet"):\u00E7("Ba\u011F\u0131ms\u0131zl\u0131\u011Fa hay\u0131r"):evet?\u00E7("\xD6zerkli\u011Fe evet"):\u00E7("\xD6zerkli\u011Fe hay\u0131r"),secim:bgm?\u00E7(
"Ba\u011F\u0131ms\u0131zl\u0131k referandumu"):\u00E7("\xD6zerklik referandumu"),pusula:[{ad:\u00E7("Evet"),secili:evet},{ad:\u00E7("Hay\u0131r"),secili:!evet}],not:`<p class="aciklama">${\u00E7("Oyun\
 gizlidir ve de\u011Fi\u015Ftirilemez. Sonu\xE7 referandum kapan\u0131nca a\xE7\u0131klan\u0131r.")}</p>`,ad:evet?\u00E7("Evet oyu ver"):\u00E7("Hay\u0131r oyu ver"),sinif:evet?"altin":"mercan",sayac:{
oy:Number(s.drive?.turnout??0),secmen:s.drive?.referendum_voters??null},gonder:async()=>{await Sunucu.yap("autonomy_vote",{p_drive:s.drive.drive_id,p_choice:evet?"yes":"no"}),tost(\u00E7("Oyun sand\u0131\u011Fa\
 at\u0131ld\u0131."),"vote")},sonra:()=>tazele()})});$("#bgm-ad",kap)?.addEventListener("change",e=>{secilenAd=e.target.value}),$("#bgm-dilekce",kap)?.addEventListener("click",()=>{const ind=s.independence,
bkr=bk(),ad=$("#bgm-ad",kap)?.value??ind?.names?.[0]?.id,x=(ind?.names??[]).find(n=>n.id===ad);x&&(secilenAd=ad,onay({ust:\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k"),baslik:\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k dilek\xE7esi\
 a\xE7"),govde:`<p class="aciklama">${\u00E7("\xD6nerilen devlet: {devlet}. Ba\u015Flatan olarak ad\u0131n herkese g\xF6r\xFCn\xFCr; ilk imzay\u0131 sen atars\u0131n. {gun} g\xFCn i\xE7inde {esik} imza toplan\u0131rsa ulusal meclis \xFC\xE7te iki \xE7o\
\u011Funlukla oylar.",{devlet:`<b>${esc(DIL.kod==="en"?x.en:x.tr)}</b>`,gun:sayi(bkr.petition.days),esik:sayi(bgmEsik(bkr,ind.voters??0))})}</p>`,ad:\u00E7("Dilek\xE7eyi a\xE7"),ik:"castle",is:async()=>{
await Sunucu.yap("independence_petition_open",{p_name:ad}),tost(\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k dilek\xE7esi a\xE7\u0131ld\u0131; ilk imzay\u0131 sen att\u0131n."),"castle")}}))}),$("#bgm-sava\
s-ad",kap)?.addEventListener("change",e=>{secilenAd=e.target.value}),$("#bgm-savas-dilekce",kap)?.addEventListener("click",()=>{const w=s.independence?.war,bkr=bk(),ad=$("#bgm-savas-ad",kap)?.value??w?.
names?.[0]?.id,x=(w?.names??[]).find(n=>n.id===ad);!x||!bkr?.war||(secilenAd=ad,onay({ust:\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131"),baslik:\u00E7("Sava\u015F yolunun dilek\xE7esini a\xE7"),
govde:`<p class="aciklama">${\u00E7("Kurulacak devlet: {devlet}. Ba\u015Flatan olarak ad\u0131n herkese g\xF6r\xFCn\xFCr; ilk imzay\u0131 sen atars\u0131n. {gun} g\xFCn i\xE7inde {esik} imza toplan\u0131rsa ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131 ilan edilir. S\
ava\u015F kaybedilirse ba\u015Flatan olarak siciline kay\u0131t d\xFC\u015Fer.",{devlet:`<b>${esc(DIL.kod==="en"?x.en:x.tr)}</b>`,gun:sayi(bkr.war.petition.days),esik:sayi(bgmSavasEsik(bkr,w.voters??0))})}\
</p>`,ad:\u00E7("Dilek\xE7eyi a\xE7"),sinif:"mercan",ik:"swords",is:async()=>{await Sunucu.yap("independence_war_petition_open",{p_name:ad}),tost(\u00E7("Sava\u015F yolunun dilek\xE7esi a\xE7\u0131ld\u0131; ilk imzay\u0131 sen\
 att\u0131n."),"swords")}}))}),$("#bgm-katil",kap)?.addEventListener("click",()=>onay({ust:\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131"),baslik:\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131na kat\u0131l"),
govde:`<p class="aciklama">${\u00E7("Bu sava\u015Fta ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131nda vurursun ve sand\u0131\u011Fa koyabilirsin. Kat\u0131l\u0131m geri al\u0131nmaz. Sava\u015F kaybedilirse en \xE7ok hasar verenler siciline kay\u0131t d\xFC\u015Fer.")}\
</p>`,ad:\u00E7("Kat\u0131l"),sinif:"mercan",ik:"user-round-plus",is:async()=>{await Sunucu.yap("independence_war_join",{p_drive:s.drive.drive_id}),tost(\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k taraf\u0131na kat\u0131ld\u0131n."),
"swords")}}));for(const b of $$("[data-bgm-cephe]",kap))b.addEventListener("click",()=>{try{sessionStorage.setItem("civora.kampanya",b.dataset.bgmCephe)}catch{}Kabuk.git("ulke/cephe")});$("#bgm-sandik\
-form",kap)?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target),varlik=String(f.get("varlik")??"CR"),metin=String(f.get("miktar")??"").trim(),miktar=varlik==="CR"?krediAlt(
metin):/^[0-9]{1,9}$/.test(metin)?Number(metin):0;if(!miktar||miktar<=0){tost(varlik==="CR"?\u00E7("Tutar\u0131 kredi olarak yaz (\xF6r. 25 ya da 12,50)."):\u00E7("Miktar\u0131 tam say\u0131 olarak yaz."),
"circle-alert");return}const ne=varlik==="CR"?\u00E7("{kr} kr",{kr:kr(miktar)}):`${sayi(miktar)} ${varlikAdi(varlik)}`;onay({ust:\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131"),baslik:\u00E7(
"Sand\u0131\u011Fa koy"),govde:`<p class="aciklama">${\u00E7("Sand\u0131\u011Fa {ne} koyacaks\u0131n. Geri al\u0131nmaz; kimin koydu\u011Fu g\xF6sterilmez.",{ne:`<b>${esc(ne)}</b>`})}</p>`,ad:\u00E7("\
Koy"),ik:"hand-coins",is:async()=>{await Sunucu.yap("independence_war_give",{p_drive:s.drive.drive_id,p_asset:varlik,p_qty:miktar}),tost(\u00E7("Sand\u0131\u011Fa koydun: {ne}.",{ne}),"hand-coins"),await Durum.
ozet().catch(()=>{})}})}),$("#bgm-sec",kap)?.addEventListener("click",()=>{const st=s.state,ad=devletGorunumAdi(st);onay({ust:\u00E7("Yeni devlet"),baslik:\u00E7("{devlet} vatanda\u015F\u0131 ol",{devlet:ad}),
govde:`<p class="aciklama">${\u00E7("Vatanda\u015Fl\u0131\u011F\u0131n {eski} yerine {yeni} olur. Partinden ayr\u0131l\u0131rs\u0131n ve s\xFCren adayl\u0131klar\u0131n d\xFC\u015Fer; g\xF6revdeysen \xF6nce g\xF6revden ayr\u0131lmal\u0131s\u0131n. \u0130lk 50 vatanda\u015F kurucu say\u0131l\u0131r.",
{eski:esc(ulkeAdi(st.independence_from)),yeni:`<b>${esc(ad)}</b>`})}</p>`,ad:\u00E7("Vatanda\u015F ol"),ik:"id-card",is:async()=>{await Sunucu.yap("state_choose",{}),tost(\u00E7("Art\u0131k {devlet} vatand\
a\u015F\u0131s\u0131n.",{devlet:ad}),"id-card"),await Durum.ozet().catch(()=>{})}})}),$("#ozk-aday",kap)?.addEventListener("click",()=>onay({ust:\u00E7("Vali se\xE7imi"),baslik:\u00E7("Vali aday\u0131 ol"),
govde:`<p class="aciklama">${\u00E7("Ad\u0131n aday listesinde herkese g\xF6r\xFCn\xFCr. Kazan\u0131rsan {gun} g\xFCn vali olursun; b\xFCt\xE7eden b\xF6lgenin sakinlerine herkese a\xE7\u0131k kay\u0131tla \xF6dersin.",
{gun:sayi(k.governor.termDays)})}</p>`,ad:\u00E7("Aday ol"),ik:"user-round-plus",is:async()=>{await Sunucu.yap("governor_register",{p_election:s.autonomy.election.election_id}),tost(\u00E7("Vali adayl\
\u0131\u011F\u0131n kaydedildi."),"user-round-plus")}})),$("#ozk-cekil",kap)?.addEventListener("click",async()=>{try{await Sunucu.yap("governor_withdraw",{p_election:s.autonomy.election.election_id}),
tost(\u00E7("Adayl\u0131ktan \xE7ekildin."),"check")}catch(err){tost(hataMetni(err),"circle-alert")}await tazele()});for(const b of $$("[data-ozk-vali-oy]",kap))b.addEventListener("click",()=>{const aday=(s.
autonomy?.election?.candidates??[]).find(c=>c.character_id===b.dataset.ozkValiOy);OyKabini.ac({ust:\u00E7("Vali se\xE7imi"),baslik:\u00E7("{ad} i\xE7in oy ver",{ad:aday?.name??""}),secim:\u00E7("Vali \
se\xE7imi"),pusula:[{ad:aday?.name??"",alt:aday?.party??null,secili:!0}],not:`<p class="aciklama">${\u00E7("Oyun gizlidir ve de\u011Fi\u015Ftirilemez.")}</p>`,ad:\u00E7("Oy ver"),sayac:{oy:Number(s.autonomy?.
election?.turnout??0),secmen:s.autonomy?.election?.voters??null},gonder:async()=>{await Sunucu.yap("governor_vote",{p_election:s.autonomy.election.election_id,p_candidate:b.dataset.ozkValiOy}),tost(\u00E7(
"Oyun sand\u0131\u011Fa at\u0131ld\u0131."),"vote")},sonra:()=>tazele()})});$("#ozk-istifa",kap)?.addEventListener("click",()=>onay({ust:\u00E7("Vali"),baslik:\u00E7("Valilikten istifa et"),govde:`<p \
class="aciklama">${\u00E7("G\xF6revin hemen biter; s\u0131radaki vali se\xE7iminin adayl\u0131\u011F\u0131 hemen ba\u015Flar.")}</p>`,ad:\u00E7("\u0130stifa et"),sinif:"mercan",ik:"door-open",is:async()=>{
await Sunucu.yap("governor_resign",{}),tost(\u00E7("Valilikten istifa ettin."),"door-open")}})),$("#ozk-kaldir",kap)?.addEventListener("click",()=>onay({ust:\u00E7("Meclis"),baslik:\u00E7("\xD6zerkli\u011Fi k\
ald\u0131rma \xF6nergesi"),govde:`<p class="aciklama">${\u00E7("Kabul i\xE7in dolu sandalyelerin \xFC\xE7te ikisi ve en az {n} evet gerekir. Kabul edilirse vali g\xF6revden ayr\u0131l\u0131r, b\xF6lge b\xFCt\xE7esi hazineye d\xF6ner; \
b\xF6lge {gun} g\xFCn yeni dilek\xE7e a\xE7amaz.",{n:sayi(k.revoke.minYes),gun:sayi(k.revoke.cooldownDays)})}</p>`,ad:\u00E7("Oylamaya a\xE7"),sinif:"mercan",ik:"gavel",is:async()=>{await Sunucu.yap("\
autonomy_revoke_open",{p_region:s.region.region_id}),tost(\u00E7("\xD6zerkli\u011Fi kald\u0131rma \xF6nergesi oylamaya a\xE7\u0131ld\u0131."),"gavel")}})),$("#ozk-alici-ara",kap)?.addEventListener("su\
bmit",async e=>{if(e.preventDefault(),odeme.q=String(new FormData(e.target).get("q")??"").trim(),odeme.q.length<2){tost(\u00E7("En az 2 harf yaz."),"circle-alert");return}try{odeme.sonuc=await Sunucu.
cagir("autonomy_resident_search",{p_query:odeme.q}),ciz()}catch(err){tost(hataMetni(err),"circle-alert")}});for(const b of $$("[data-ozk-alici]",kap))b.onclick=()=>{odeme.secilen=odeme.sonuc?.find(x=>x.
character_id===b.dataset.ozkAlici)??null,ciz()};$("#ozk-alici-degis",kap)?.addEventListener("click",()=>{odeme.secilen=null,ciz()});const of=$("#ozk-odeme",kap);of?.addEventListener("input",()=>{const f=new FormData(
of);odeme.tutar=String(f.get("tutar")??""),odeme.amac=String(f.get("amac")??"aid")}),of?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(of),alt=krediAlt(String(f.get("tutar")??""));
if(odeme.amac=String(f.get("amac")??"aid"),!alt||alt<=0){tost(\u00E7("Tutar\u0131 kredi olarak yaz (\xF6r. 25 ya da 12,50)."),"circle-alert");return}const kisi=odeme.secilen;onay({ust:\u00E7("B\xF6lge b\xFC\
t\xE7esi"),baslik:\u00E7("\xD6demeyi onayla"),govde:`<p class="aciklama">${\u00E7("{ad} adl\u0131 ki\u015Fiye {kr} kr \xF6denecek ({amac}). \xD6deme herkese a\xE7\u0131k resm\xEE kayda girer.",{ad:esc(
kisi.name),kr:kr(alt),amac:esc(ozkAmac(odeme.amac))})}</p>`,ad:\u00E7("\xD6de"),ik:"hand-coins",is:async()=>{await Sunucu.yap("governor_pay",{p_recipient:kisi.character_id,p_amount:alt,p_purpose:odeme.
amac}),odeme.tutar="",odeme.q="",odeme.secilen=null,odeme.sonuc=null,tost(\u00E7("\xD6deme yap\u0131ld\u0131; resm\xEE kayda girdi."),"hand-coins")}})})}const tazele=tazeleyici(async()=>{await yukle(),
kapandi||ciz()});await yukle(),ciz();const b1=Durum.dinle("ulke-olay",({olay})=>{/^(autonomy\.|parliament\.motion_|independence\.)/.test(olay)&&tazele()}),ulke=Durum.v.ozet?.character?.citizenship;let katildi=!1;
const b5=ulke?Sunucu.Canli.dinle("movement:"+ulke,olay=>{/^autonomy\./.test(olay)&&tazele()},{katilinca:()=>{katildi&&tazele(),katildi=!0}}):()=>{},b2=Durum.dinle("devlet",()=>tazele()),b3=Sunucu.Canli.
dinle("public:campaign",(olay,yuk)=>{const x=yuk?.data??{},w=s?.drive?.war;!w?.campaign_id||x.campaign_id!==w.campaign_id||/^(independence\.war_|war\.(round_closed|campaign_closed|paused|resuming|cancelled))/.
test(olay)&&tazele()}),saat=setInterval(()=>{!kapandi&&document.visibilityState==="visible"&&sandik.el.isConnected&&tazele()},6e4);return()=>{kapandi=!0,durdur(),b1(),b2(),b3(),b5(),clearInterval(saat),
sandik.kapat()}}}),Parcalar.tamam("ek_91_ozerklik");
