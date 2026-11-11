// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_98s_belediye.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/belediye",{async ac(kap){let s=null,bolge=bldBakilan;bldBakilan=null;let kapandi=!1,durdur=()=>{};const sandik=SandikBasi.ac(),oda=BelediyeOdasi.ac(),sira=sahneSirasiKur();let saatFarki=0;
sandik.dinle("sec",ad=>{(ad==="adaylar"?$("#bld-adaylar",kap):$("#bld-oy",kap)??$("#bld-adaylar",kap))?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})});const odeme={q:"",sonuc:null,
secilen:null,tutar:"",amac:"aid"},duzen={tur:"maraton",gun:"",saat:"15:00",havuz:""};let ev=null;async function yukle(){[s]=await Promise.all([Sunucu.cagir("municipal_status",{p_region:bolge}),Durum.ozet(),
Durum.kurallar()]),saatFarki=s?.server_time?Date.parse(s.server_time)-Date.now():0,ev=s?.municipality?await Sunucu.cagir("cityevents",{p_region:s.region_id}).catch(()=>null):null}const rm=()=>s.rule?.
mayor??{},rp=()=>s.rule?.projects??{},ben=()=>Durum.v.ozet?.character??{},simdi=()=>Date.now(),secmen=()=>!s.voter_code;function baskanKarti(){const m=s.mayor,e=s.election,yeniSecim=e?Date.parse(e.voting_start)<=
simdi()?\u00E7("Belediye se\xE7iminde oylama s\xFCr\xFCyor."):Date.parse(e.candidacy_start)<=simdi()?\u00E7("Belediye se\xE7iminde adayl\u0131k s\xFCr\xFCyor."):\u00E7("S\u0131radaki belediye se\xE7iminin ada\
yl\u0131\u011F\u0131 {zaman} ba\u015Flar.",{zaman:saatYaz(e.candidacy_start)}):"";return`<section class="kart" id="bld-kart" data-bld-durum="${m?"mayor":"none"}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Belediye")} \xB7 ${esc(bolgeAdi(s.region_id))}</p>
          <h2 class="b2">${m?\u00E7("Belediye Ba\u015Fkan\u0131 {ad}",{ad:esc(m.name)}):\u00E7("Ge\xE7ici sistem y\xF6netimi")}</h2></div><span class="ik-kutu">${ikon("landmark")}</span></div>
        ${m?`<div class="satir" style="margin-top:4px">${avatarKutu(m.name,m.character_id)}<div><button type="button" class="baglanti" data-bld-profil="${esc(m.character_id)}"><b>${esc(m.name)}</b></b\
utton>
            <div class="kucuk">${\u00E7("G\xF6reve {a} ba\u015Flad\u0131; d\xF6nemi {b} biter.",{a:esc(saatYaz(m.term_start)),b:esc(saatYaz(m.term_end))})} <b data-bitis="${esc(m.term_end)}"></b></div\
></div></div>`:`<p class="kucuk">${\u00E7("G\xF6revde belediye ba\u015Fkan\u0131 yok: b\xFCt\xE7e birikir, projelerin bak\u0131m\u0131 \xF6denmeye devam eder; se\xE7ilen ba\u015Fkan g\xF6reve ba\u015Flay\u0131nca b\xFCt\xE7eyi o kullan\u0131r.")}\
</p>`}
        <div class="ozk-butce" data-bld-butce="${esc(String(s.budget_cr??0))}"><span>${\u00E7("Belediye b\xFCt\xE7esi")}</span><b>${\u00E7("{kr} kr",{kr:kr(s.budget_cr??0)})}</b></div>
        <p class="kucuk">${\u00E7("Gelir: ba\u015Fkentte toplanan sat\u0131\u015F ve maa\u015F vergisinin belediye pay\u0131, konser ve st\xFCdyo kiralar\u0131. Gider: projelerin kurulu\u015Fu ve g\xFCnl\xFCk bak\u0131m\u0131 ({kr} kr/g\xFCn), ba\u015Fkan\u0131n \xF6dem\
eleri.",{kr:kr(s.upkeep_per_day_cr??0)})}</p>
        ${yeniSecim?`<p class="kucuk">${esc(yeniSecim)}</p>`:""}
        ${s.me_mayor?`<div class="satir" style="margin-top:8px"><button class="dugme sade kucuk-d" id="bld-istifa">${ikon("door-open")}${\u00E7("Belediye ba\u015Fkanl\u0131\u011F\u0131ndan istifa et")}\
</button></div>`:""}
        ${s.me_president?`<p class="kucuk" data-bld-cumhurbaskani>${\u00E7("Cumhurba\u015Fkan\u0131s\u0131n: ayn\u0131 anda belediye ba\u015Fkan\u0131 olamazs\u0131n.")}</p>`:""}
      </section>`}function secimKarti(){const e=s.election,son=s.last_election,k=rm();if(!e)return son?sonSecimKarti(son):"";const oylama=Date.parse(e.voting_start)<=simdi()&&Date.parse(e.voting_end)>
simdi(),adaylik=!oylama&&Date.parse(e.candidacy_start)<=simdi()&&Date.parse(e.voting_start)>simdi(),adaylar=e.candidates??[],adayOlabilir=adaylik&&secmen()&&!s.me_president;return`<section class="kart\
" id="bld-secim" data-bld-secim="${esc(e.election_id)}" data-bld-secim-asama="${oylama?"voting":adaylik?"candidacy":"scheduled"}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Belediye ba\u015Fkan\u0131 se\xE7imi")}</p><h2 class="b2">${oylama?\u00E7("Oylama s\xFCr\xFCyor"):adaylik?\u00E7("Adayl\u0131k s\xFCr\xFCyor"):
\u00E7("S\u0131radaki se\xE7im")}</h2></div>
          <span class="ik-kutu">${ikon("vote")}</span></div>
        <p class="kucuk">${oylama?\u00E7("Oylama {zaman} biter.",{zaman:esc(saatYaz(e.voting_end))})+` <b data-bitis="${esc(e.voting_end)}"></b>`:adaylik?\u00E7("Adayl\u0131k {zaman} biter; sonra {saat} sa\
at oylama.",{zaman:esc(saatYaz(e.voting_start)),saat:sayi(k.election?.votingH??48)})+` <b data-bitis="${esc(e.voting_start)}"></b>`:\u00E7("Adayl\u0131k {zaman} ba\u015Flar.",{zaman:esc(saatYaz(e.candidacy_start))})}\
</p>
        <div class="koltuk-liste" id="bld-adaylar" style="margin-top:10px">${adaylar.length?adaylar.map(c=>`<div class="koltuk" data-bld-aday="${esc(c.character_id)}">${avatarKutu(c.name,c.character_id)}\

            <div><b>${esc(c.name)}${c.character_id===ben().id?" "+\u00E7("(sen)"):""}</b><div class="kucuk">${\u00E7("Aday")}</div></div>
            ${oylama&&secmen()&&!e.me_voted?`<button class="dugme altin kucuk-d" data-bld-oy="${esc(c.character_id)}">${ikon("vote")}${\u00E7("Oy ver")}</button>`:"<span></span>"}</div>`).join(""):`<p\
 class="kucuk">${adaylik?\u00E7("Hen\xFCz aday yok. Adayl\u0131k bitince aday yoksa yeni se\xE7im a\xE7\u0131l\u0131r."):\u00E7("Adaylar adayl\u0131k ba\u015Flay\u0131nca g\xF6r\xFCn\xFCr.")}</p>`}</d\
iv>
        ${oylama&&e.me_voted||adayOlabilir||adaylik&&e.me_candidate?`<div class="oneri-dugmeler" style="margin-top:10px">
          ${oylama&&e.me_voted?`<span class="cip yesil" data-bld-oyladin>${ikon("check")}${\u00E7("Oyunu kulland\u0131n")}</span>`:""}
          ${adaylik&&e.me_candidate?`<span class="cip yesil">${ikon("check")}${\u00E7("Adays\u0131n")}</span><button class="dugme sade kucuk-d" id="bld-cekil">${\u00E7("Adayl\u0131ktan \xE7ekil")}</bu\
tton>`:adayOlabilir?`<button class="dugme ikincil" id="bld-aday">${ikon("user-round-plus")}${\u00E7("Belediye ba\u015Fkan\u0131 aday\u0131 ol")}</button>`:""}
        </div>`:""}
        ${!secmen()&&(oylama||adaylik)?`<p class="kucuk" data-bld-secmen="${esc(s.voter_code)}">${esc(bldSecmenNeden(s.voter_code,k))}</p>`:""}
        <p class="kucuk">${\u00E7("Se\xE7men: ba\u015Fkentte en az {g} g\xFCnd\xFCr oturan vatanda\u015Flar. En \xE7ok oy alan kazan\u0131r; e\u015Fitlikte kura \xE7ekilir. Oy gizlidir. D\xF6nem {gun} g\xFCn.",
{g:sayi(k.voter?.residenceDays??7),gun:sayi(k.election?.termDays??28)})}</p>
        ${oylama?`<p class="kucuk">${\u00E7("Se\xE7men listesi {n} ki\u015Fi; {m} oy kullan\u0131ld\u0131.",{n:sayi(e.voters??0),m:sayi(e.turnout??0)})}</p>`:""}
      </section>`}function sonSecimKarti(son){const adaylar=son.candidates??[],enCok=Math.max(1,...adaylar.map(c=>Number(c.votes??0)));return`<section class="kart" id="bld-son-secim" data-bld-son="${esc(
son.stage)}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Son se\xE7im")} \xB7 ${esc(saatYaz(son.voting_end))}</p>
          <h2 class="b2">${son.stage==="void"?son.void_reason==="no_candidates"?\u00E7("Aday \xE7\u0131kmad\u0131"):son.void_reason==="no_votes"?\u00E7("Oy kullan\u0131lmad\u0131"):\u00E7("Se\xE7im kapan\
d\u0131"):son.lot?\u00E7("{ad} kurayla kazand\u0131",{ad:esc(son.winner??"")}):\u00E7("{ad} kazand\u0131",{ad:esc(son.winner??"")})}</h2></div><span class="ik-kutu">${ikon("trophy")}</span></div>
        ${adaylar.length?adaylar.map(c=>`<div class="sonuc-satir ${c.character_id===son.winner_id?"kazandi":""}"><span><b>${esc(c.name)}</b></span>
            <span class="cubuk"><i style="width:${Math.round(Number(c.votes??0)/enCok*100)}%"></i></span>
            <span class="sonuc-say">${\u00E7("<b>{n}</b> oy",{n:Number(c.votes??0)})}${c.character_id===son.winner_id?`<span class="cip altin">${son.lot?\u00E7("Kurayla"):\u00E7("Kazand\u0131")}</span\
>`:""}</span></div>`).join(""):`<p class="kucuk">${\u00E7("Aday yoktu.")}</p>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Kat\u0131l\u0131m {m}/{n}.",{m:sayi(son.turnout??0),n:sayi(son.voters??0)})}</p>
      </section>`}function projeKarti(){const k=rp(),liste=s.projects??[],butce=Number(s.budget_cr??0),b=s.bonus??{},etkin=[b.travel_ppm?\u00E7("yolculuk {oran} k\u0131sa",{oran:ppmYuzde(b.travel_ppm)}):
"",b.training_ppm?\u00E7("e\u011Fitim {oran} k\u0131sa",{oran:ppmYuzde(b.training_ppm)}):"",b.concert_ppm?\u00E7("konser seyircisi {oran} fazla",{oran:ppmYuzde(b.concert_ppm)}):"",b.advantage_pct?\u00E7(
"\xFCretim \xFCst\xFCnl\xFC\u011F\xFC +{n}",{n:sayi(b.advantage_pct)}):"",Number(s.gym?.project_ppm)>0?\u00E7("salonda puan {oran} fazla",{oran:ppmYuzde(s.gym.project_ppm)}):"",...liste.filter(p=>p.effect?.
clinicRooms&&p.project?.status==="active").map(p=>\u00E7("sa\u011Fl\u0131k oca\u011F\u0131nda +{n} oda",{n:sayi(p.effect.clinicRooms)}))].filter(Boolean);return`<section class="kart" id="bld-projeler"\
>
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Belediye projeleri")}</p><h2 class="b2">${etkin.length?\u00E7("\u015Eehirde \u015Fu an: {liste}",{liste:esc(etkin.join(", "))}):\u00E7(
"\u015Eehirde \xE7al\u0131\u015Fan proje yok")}</h2></div><span class="ik-kutu">${ikon("hammer")}</span></div>
        <p class="kucuk">${\u00E7("Kurulu\u015F bedeli b\xFCt\xE7eden yak\u0131l\u0131r; proje {g} g\xFCn i\xE7inde haz\u0131r olur. Bak\u0131m\u0131 her g\xFCn b\xFCt\xE7eden \xF6denir; {n} g\xFCn \xF6denemezse proje ask\u0131ya al\u0131n\u0131r, b\xFCt\xE7e gelince kendili\u011Finden\
 a\xE7\u0131l\u0131r. Etkisi yaln\u0131z bu \u015Fehirde ge\xE7er; 4. seviye i\xE7in 1, 5. seviye i\xE7in 2 \xE7al\u0131\u015Fan proje gerekir.",{g:sayi(Math.max(...liste.map(p=>Number(p.buildDays??1)),
1)),n:sayi(k.suspendAfterUnpaidDays??3)})}</p>
        <div class="yigin" style="gap:8px;margin-top:8px">${liste.map(p=>{const q=p.project,durum=q?.status??null,yeter=butce>=Number(p.costCr??0);return`<div class="liste-satir" data-bld-proje="${esc(
p.id)}" data-bld-proje-durum="${esc(durum??"none")}">
            <span class="liste-ikon ${durum==="active"?"yesil":durum==="suspended"?"mercan":durum==="building"?"altin":""}">${ikon(BLD_PROJE_IKON[p.id]??"hammer")}</span>
            <div><span class="tur">${durum?esc(BLD_DURUM[durum]??durum):\u00E7("Kurulmad\u0131")}${durum==="building"&&q?.ready_at?` \xB7 ${\u00E7("haz\u0131r: {zaman}",{zaman:esc(saatYaz(q.ready_at))})}`:
""}${durum==="suspended"?` \xB7 ${\u00E7("{n} g\xFCn \xF6denmedi",{n:sayi(q?.unpaid_days??0)})}`:""}</span>
              <b>${esc(\u00E7v(p.name))}</b>
              <div class="alt">${esc(bldEtki(p))} ${\u00E7("Kurulu\u015F {kr} kr, bak\u0131m {b} kr/g\xFCn, yap\u0131m {g} g\xFCn.",{kr:kr(p.costCr??0),b:kr(p.upkeepCrPerDay??0),g:sayi(p.buildDays??1)})}${q?.
started_by_name?" "+\u00E7("Ba\u015Flatan: {ad}.",{ad:esc(q.started_by_name)}):""}</div></div>
            ${s.me_mayor?durum?`<button class="dugme sade kucuk-d" data-bld-iptal="${esc(p.id)}">${ikon("x")}${\u00E7("\u0130ptal")}</button>`:`<button class="dugme ${yeter?"altin":"ikincil"} kucuk-d"\
 data-bld-baslat="${esc(p.id)}" ${yeter?"":"disabled"}>${ikon("hammer")}${\u00E7("Ba\u015Flat")}</button>`:"<span></span>"}
          </div>`}).join("")}</div>
        ${s.me_mayor&&!liste.every(p=>butce>=Number(p.costCr??0))?`<p class="kucuk" style="margin-top:8px">${\u00E7("B\xFCt\xE7ede {kr} kr var; bedeli bundan y\xFCksek proje ba\u015Flat\u0131lamaz.",{
kr:kr(butce)})}</p>`:""}
      </section>`}function sporKarti(){const g=s.gym;if(!g)return"";const yuzde=sporAletYuzde(g.condition_ppm),dusuk=Number(g.condition_ppm)<Number(g.low_ppm);return`<section class="kart" id="bld-spor\
" data-aletler="${yuzde}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u015Fkentin spor salonu")}</p><h2 class="b2">${esc(\u00E7("Aletler %{n}",{n:yuzde}))}</h2></div>
          ${dusuk?`<span class="cip mercan">${ikon("wrench")}${\u00E7("Bak\u0131m gerekli")}</span>`:`<span class="ik-kutu">${ikon("dumbbell")}</span>`}</div>
        <div class="cubuk ${dusuk?"mercan":"yesil"}"><i style="width:${yuzde}%"></i></div>
        <p class="kucuk" style="margin-top:6px">${esc(\u00E7("Aletler her seansta y\u0131pran\u0131r; %{n} alt\u0131nda antrenmanlar daha az puan verir. Bak\u0131m {kr} kredi, b\xFCt\xE7eden.",{n:sporAletYuzde(
g.low_ppm),kr:kr(g.cost_cr)}))}
          ${g.last?" "+esc(\u00E7("Son bak\u0131m: {zaman}, {ad}.",{zaman:saatYaz(g.last.at),ad:g.last.by??\u00E7("ad\u0131n\u0131 gizleyen biri")})):""}</p>
        ${s.me_mayor?`<div class="oneri-dugmeler" style="margin-top:8px"><button class="dugme ${g.can?"ikincil":"altin"} kucuk-d" id="bld-spor-bakim" ${g.can?"disabled":""}>${ikon("wrench")}${\u00E7("\
Bak\u0131m yapt\u0131r")}</button>
          ${g.can?`<span class="kucuk">${esc(g.can==="GYM_MAINT_FULL"?\u00E7("Aletler zaten tam bak\u0131ml\u0131."):g.can==="GYM_MAINT_FUNDS"?\u00E7("B\xFCt\xE7ede bak\u0131m i\xE7in yeterli kredi yok."):
"")}</span>`:""}</div>`:""}
      </section>`}function odemeKarti(){if(!s.me_mayor)return"";const k=rm(),sec=odeme.secilen;return`<section class="kart" id="bld-odeme-kart">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Belediye ba\u015Fkan\u0131n\u0131n b\xFCt\xE7esi")}</p><h2 class="b2">${\u00E7("B\xFCt\xE7eden \xF6deme yap")}</h2></div><span class="i\
k-kutu">${ikon("hand-coins")}</span></div>
        <p class="kucuk">${\u00E7("Al\u0131c\u0131 ba\u015Fkentin sakini olmal\u0131; kendine \xF6deme yapamazs\u0131n. G\xFCnde en \xE7ok {n} \xF6deme; bug\xFCn {m}. Her \xF6deme herkese a\xE7\u0131k resm\xEE kay\u0131tta.",
{n:sayi(k.payment?.dailyMax??20),m:sayi(s.payments_today??0)})}</p>
        ${sec?`<div class="koltuk" style="margin-top:8px">${avatarKutu(sec.name,sec.character_id)}<div><b>${esc(sec.name)}</b><div class="kucuk">${esc(ulkeAdi(sec.country_id))}</div></div>
            <button class="dugme sade kucuk-d" id="bld-alici-degis">${\u00E7("De\u011Fi\u015Ftir")}</button></div>
          <form class="form ozk-odeme" id="bld-odeme" novalidate style="margin-top:8px">
            <label class="alan"><span>${\u00E7("Tutar (kredi)")}</span><input name="tutar" inputmode="decimal" value="${esc(odeme.tutar)}" placeholder="${\u00E7("\xF6r. 25")}"></label>
            <label class="alan"><span>${\u00E7("Ama\xE7")}</span><select name="amac">${(k.payment?.purposes??Object.keys(OZK_AMAC)).map(x=>`<option value="${esc(x)}"${odeme.amac===x?" selected":""}>${esc(
ozkAmac(x))}</option>`).join("")}</select></label>
            <div class="satir"><button class="dugme altin" type="submit">${ikon("hand-coins")}${\u00E7("\xD6de")}</button><span class="kucuk">${\u00E7("B\xFCt\xE7ede {kr} kr",{kr:kr(s.budget_cr??0)})}\
</span></div>
          </form>`:`<form class="sohbet-yaz" id="bld-alici-ara" novalidate style="margin-top:8px"><input name="q" minlength="2" maxlength="24" placeholder="${\u00E7("Sakinin ad\u0131 (en az 2 harf)")}\
" value="${esc(odeme.q)}" aria-label="${\u00E7("Sakinin ad\u0131")}" autocomplete="off">
            <button class="dugme ikincil" type="submit">${ikon("zoom-in")}${\u00E7("Ara")}</button></form>
          ${odeme.sonuc?`<div class="koltuk-liste" style="margin-top:10px">${odeme.sonuc.length?odeme.sonuc.map(x=>`<div class="koltuk">${avatarKutu(x.name,x.character_id)}<div><b>${esc(x.name)}</b>
              <div class="kucuk">${esc(ulkeAdi(x.country_id))}</div></div><button class="dugme ikincil kucuk-d" data-bld-alici="${esc(x.character_id)}">${\u00E7("Se\xE7")}</button></div>`).join(""):`<\
p class="kucuk">${\u00E7("Bu adla ba\u015Fkentte oturan bulunamad\u0131.")}</p>`}</div>`:""}`}
      </section>`}function sponsorKarti(){const f=s.festival_sponsor;if(!f?.rule||!f.season)return"";const r=f.rule,koyuldu=Number(f.sponsored_cr??0)>0,ev2=f.is_host?\u00E7("Bu sezonun ev sahibi \xFClkem\
iz ({sehir}).",{sehir:bolgeAdi(f.host_region_id)}):\u00E7("Bu sezonun ev sahibi {ulke} ({sehir}); katk\u0131y\u0131 ev sahibi \xFClkenin belediyesi koyar.",{ulke:ulkeAdi(f.host_country_id),sehir:bolgeAdi(
f.host_region_id)});return`<section class="kart" id="bld-sponsor" data-sponsor="${koyuldu?"var":f.can?"uygun":"yok"}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Festival sponsorlu\u011Fu \xB7 {n}. sezon",{n:Number(f.season)})}</p>
          <h2 class="b2">${koyuldu?\u00E7("Belediye {kr} kredi katk\u0131 koydu",{kr:kr(f.sponsored_cr)}):f.is_host?\u00E7("Festivale katk\u0131"):\u00E7("Ev sahibi de\u011Filiz")}</h2></div><span cla\
ss="ik-kutu">${ikon("disc-album")}</span></div>
        <p class="kucuk">${esc(ev2)} ${esc(\u00E7("Katk\u0131 \xF6d\xFCl gecesinde vergisiz olarak gruplar\u0131n havuzuna eklenir; sezon iptal olursa b\xFCt\xE7eye d\xF6ner. S\u0131n\u0131r {a}\u2013{b} kredi ve b\xFCt\xE7enin harcanabilir yar\u0131s\
\u0131; sezonda bir kez.",{a:kr(r.minCr??1e3),b:kr(r.maxCr??5e4)}))}${f.award_at?" "+esc(\u00E7("\xD6d\xFCl gecesi {zaman}.",{zaman:saatYaz(f.award_at)})):""}</p>
        ${f.can?`<form class="form ozk-odeme" id="bld-sponsor-form" novalidate style="margin-top:8px">
            <label class="alan"><span>${\u00E7("Katk\u0131 (kredi)")}</span><input name="tutar" inputmode="decimal" placeholder="${\u00E7("\xF6r. 100")}" aria-label="${\u00E7("Katk\u0131 (kredi)")}"><\
/label>
            <div class="satir"><button class="dugme altin" type="submit">${ikon("disc-album")}${\u00E7("Katk\u0131 koy")}</button><span class="kucuk">${\u00E7("\u015Eimdi en \xE7ok {kr} kredi",{kr:kr(
f.max_now??0)})}</span></div>
          </form>`:""}
        <div class="satir" style="margin-top:8px"><button class="dugme ikincil kucuk-d" data-git="sehir/festival">${ikon("disc-album")}${\u00E7("Festival")}</button></div>
      </section>`}function etkinlikKarti(){if(!ev?.is_capital)return"";const r=ev.rules??etkinlikKurali()??{},mr=r.mayor??{},tz=ev.time_zone??"UTC",yak=(ev.program??[]).filter(e=>e.status==="scheduled"||
e.status==="live"),bugun=etkinlikYerelGun(tz,Date.now()+saatFarki),gunler=Array.from({length:Number(mr.maxLeadDays??7)+1},(_,i)=>new Date(Date.parse(bugun+"T12:00:00Z")+i*864e5).toISOString().slice(0,
10));gunler.includes(duzen.gun)||(duzen.gun=gunler[2]??gunler[0]);const saatler=[];for(let h=Number(mr.firstHour??10);h<=Number(mr.lastHour??23);h++)for(const dk of[0,30])(h<Number(mr.lastHour??23)||dk===
0)&&saatler.push(`${String(h).padStart(2,"0")}:${dk?"30":"00"}`);saatler.includes(duzen.saat)||(duzen.saat=saatler[0]);const hafta=Number(ev.mayor?.weeks?.[etkinlikPazartesi(duzen.gun)]??0),haftaMax=Number(
mr.perWeek??2),bedel=Number(r.kinds?.[duzen.tur]?.feeCr??0),gunAdi=g=>new Date(g+"T12:00:00Z").toLocaleDateString(DIL.yerel,{weekday:"long",day:"numeric",month:"long",timeZone:"UTC"}),iptalOlur=e=>e.source===
"mayor"&&e.status==="scheduled"&&Date.parse(e.starts_at)-(Date.now()+saatFarki)>Number(mr.cancelLeadH??24)*36e5;return`<section class="kart" id="bld-etkinlik">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehir etkinlikleri")}</p><h2 class="b2">${\u00E7("Etkinlik takvimi")}</h2></div><span class="ik-kutu">${ikon("party-popper")}</spa\
n></div>
        <p class="kucuk">${esc(\u00E7("Gelenek: \xC7ar\u015Famba yar\u0131\u015F, Cumartesi \u015Fenlik. Ba\u015Fkan haftada {n} etkinlik daha d\xFCzenler; bedel b\xFCt\xE7eden yak\u0131l\u0131r, \xF6d\xFCl havuzu etkinlik bitince ilk \xFC\xE7e payla\u015F\u0131l\u0131r. Em\
anette \u015Fu an {kr} kr.",{n:sayi(haftaMax),kr:kr(s.events?.escrow_cr??0)}))}</p>
        <div class="yigin" style="gap:6px;margin-top:8px">${yak.length?yak.map(e=>`<div class="liste-satir" data-bld-etkinlik="${esc(e.id)}">
            <span class="liste-ikon ${e.source==="mayor"?"altin":""}">${ikon(etkinlikIkon(e.kind))}</span>
            <div><span class="tur">${esc(saatYaz(e.starts_at))} \xB7 ${esc(e.source==="mayor"?\u00E7("Ba\u015Fkan\u0131n"):\u00E7("Gelenek"))}</span><b>${esc(etkinlikAdi(e.kind))}</b>
              <div class="alt">${esc(etkinlikKume(e.kind,r)==="senlik"?\u00E7("\u015Eenlik"):Number(e.pool_cr)>0?\u00E7("\xD6d\xFCl havuzu {kr} kr",{kr:kr(e.pool_cr)}):\u00E7("\xD6d\xFCls\xFCz"))}</di\
v></div>
            <div class="mekan-satir-dugmeler">${s.me_mayor&&e.status==="scheduled"&&etkinlikKume(e.kind,r)!=="senlik"?`<button class="dugme ikincil kucuk-d" data-bld-etkinlik-odul="${esc(e.id)}">${ikon(
"hand-coins")}${\u00E7("\xD6d\xFCl koy")}</button>`:""}
              ${s.me_mayor&&iptalOlur(e)?`<button class="dugme sade kucuk-d" data-bld-etkinlik-iptal="${esc(e.id)}">${ikon("x")}${\u00E7("\u0130ptal")}</button>`:""}</div></div>`).join(""):`<p class="\
kucuk">${\u00E7("Takvimde etkinlik yok.")}</p>`}</div>
        ${s.me_mayor?`<form class="form" id="bld-etkinlik-form" novalidate style="margin-top:12px">
            <p class="ust-yazi">${\u00E7("Etkinlik d\xFCzenle")}</p>
            <label class="alan"><span>${\u00E7("T\xFCr")}</span><select name="tur">${Object.keys(r.kinds??ETKINLIK_AD).map(k=>`<option value="${esc(k)}"${duzen.tur===k?" selected":""}>${esc(\u00E7("{e\
tkinlik} (bedeli {kr} kr)",{etkinlik:etkinlikAdi(k),kr:kr(r.kinds?.[k]?.feeCr??0)}))}</option>`).join("")}</select></label>
            <div class="izgara iki" style="gap:8px">
              <label class="alan"><span>${\u00E7("G\xFCn")}</span><select name="gun">${gunler.map(g=>`<option value="${g}"${duzen.gun===g?" selected":""}>${esc(gunAdi(g))}</option>`).join("")}</select\
></label>
              <label class="alan"><span>${esc(\u00E7("Saat ({sehir} saatiyle)",{sehir:bolgeAdi(s.region_id)}))}</span><select name="saat">${saatler.map(h=>`<option value="${h}"${duzen.saat===h?" selec\
ted":""}>${h}</option>`).join("")}</select></label>
            </div>
            ${etkinlikKume(duzen.tur,r)!=="senlik"?`<label class="alan"><span>${esc(\u00E7("\xD6d\xFCl havuzu (kredi, en \xE7ok {kr})",{kr:kr(r.pool?.maxCr??5e4)}))}</span><input name="havuz" inputmod\
e="decimal" value="${esc(duzen.havuz)}" placeholder="0"></label>`:""}
            <p class="kucuk" id="bld-etkinlik-ozet">${esc(\u00E7("Bu hafta d\xFCzenledi\u011Fin: {n}/{m}. Bedel {kr} kr; b\xFCt\xE7ede {b} kr. En az {s} saat, en \xE7ok {g} g\xFCn sonras\u0131; ba\u015Fka etkinli\u011Fe en az {a} saat \
ara.",{n:sayi(hafta),m:sayi(haftaMax),kr:kr(bedel),b:kr(ev.mayor?.budget_cr??s.budget_cr??0),s:sayi(mr.minLeadH??24),g:sayi(mr.maxLeadDays??7),a:sayi(mr.gapH??3)}))}</p>
            <div class="satir"><button class="dugme altin" type="submit" ${hafta>=haftaMax?"disabled":""}>${ikon("calendar-plus")}${\u00E7("D\xFCzenle")}</button></div>
          </form>`:""}
        <div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme sade kucuk-d" data-git="sehir/etkinlikler">${ikon("party-popper")}${\u00E7("Etkinliklere git")}</button></div>
      </section>`}function defterKarti(){const h=s.spend??[];return`<section class="kart" id="bld-defter">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Herkese a\xE7\u0131k")}</p><h2 class="b2">${\u00E7("Belediye defteri")}</h2></div><span class="ik-kutu">${ikon("receipt-text")}</span><\
/div>
        ${h.length?`<div class="yigin" style="gap:6px">${h.map(x=>{const etk=String(x.kind).startsWith("event");return`<div class="liste-satir" data-bld-harcama="${esc(x.kind)}"><span class="liste-iko\
n ${x.kind==="payment"?"altin":x.kind==="event_refund"?"yesil":""}">${ikon(etk?etkinlikIkon(x.event_kind):x.kind==="payment"?"hand-coins":x.kind==="project_build"?"hammer":"wrench")}</span>
            <div><span class="tur">${esc(saatYaz(x.at))} \xB7 ${esc(BLD_HARCAMA[x.kind]??x.kind)}</span>
              <b>${x.kind==="payment"?\u00E7("{ad} adl\u0131 ki\u015Fiye {kr} kr",{ad:esc(x.recipient??""),kr:kr(x.amount_cr)}):etk?\u00E7("{etkinlik}: {kr} kr",{etkinlik:esc(etkinlikAdi(x.event_kind)),
kr:kr(x.amount_cr)}):x.kind==="gym_maintenance"?\u00E7("Spor salonu: {kr} kr",{kr:kr(x.amount_cr)}):\u00E7("{proje}: {kr} kr",{proje:esc(\u00E7v((s.projects??[]).find(p=>p.id===x.project_kind)?.name??
x.project_kind??"")),kr:kr(x.amount_cr)})}</b>
              <div class="alt">${x.kind==="payment"?\u00E7("{amac} \xB7 {ad}",{amac:esc(ozkAmac(x.purpose)),ad:esc(x.actor??"")}):x.kind==="event_refund"?\u00E7("Kullan\u0131lmayan b\xFCt\xE7eye d\xF6nd\xFC"):
x.kind==="gym_maintenance"?x.actor?\u00E7("Yapt\u0131ran {ad}",{ad:esc(x.actor)}):"":etk?x.actor?\u00E7("D\xFCzenleyen {ad}",{ad:esc(x.actor)}):"":x.actor?\u00E7("Ba\u015Flatan {ad}",{ad:esc(x.actor)}):
\u00E7("Ge\xE7ici sistem y\xF6netimi (bak\u0131m)")}</div></div><span></span></div>`}).join("")}</div>`:`<p class="kucuk">${\u00E7("B\xFCt\xE7eden hen\xFCz harcama yap\u0131lmad\u0131.")}</p>`}
        ${(s.past_mayors??[]).length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("\xD6nceki ba\u015Fkanlar")}</p><div class="yigin" style="gap:6px">${s.past_mayors.map(m=>`<div class="liste-\
satir" data-bld-eski="${esc(m.mayor_id)}"><span class="liste-ikon">${ikon("landmark")}</span>
            <div><span class="tur">${esc(saatYaz(m.term_start))} \u2013 ${esc(saatYaz(m.ended_at??m.term_end))}</span><b>${esc(m.name??\u00E7("Silinmi\u015F hesap"))}</b><div class="alt">${esc(BLD_BITIS[m.
end_reason]??"")}</div></div><span></span></div>`).join("")}</div>`:""}
      </section>`}function kurallarKarti(){const k=rm(),p=rp(),maddeler=[["vote",\u00E7("Her \xFClkenin ba\u015Fkentinde belediye ba\u015Fkan\u0131 se\xE7ilir: {c} saat adayl\u0131k, {v} saat oylama; en \xE7ok oy kazan\u0131r, e\u015Fitlik\
te kura. Oy gizlidir. D\xF6nem {gun} g\xFCn.",{c:sayi(k.election?.candidacyH??24),v:sayi(k.election?.votingH??48),gun:sayi(k.election?.termDays??28)})],["id-card",\u00E7("Se\xE7men ve aday: ba\u015Fkentte en \
az {r} g\xFCnd\xFCr oturan, hesab\u0131 ve vatanda\u015Fl\u0131\u011F\u0131 en az {h} g\xFCnl\xFCk, \xF6\u011Freticiyi bitirmi\u015F vatanda\u015F. Cumhurba\u015Fkan\u0131 belediye ba\u015Fkan\u0131 olamaz; ba\u015Fkan cumhurba\u015Fkan\u0131 se\xE7ilirse belediye g\xF6revi biter.",
{r:sayi(k.voter?.residenceDays??7),h:sayi(k.voter?.accountDays??7)})],["wallet",\u00E7("B\xFCt\xE7e: ba\u015Fkentte toplanan sat\u0131\u015F ve maa\u015F vergisinin belediye pay\u0131, konser ve st\xFCdyo kiralar\u0131. Ba\u015Fkan yokken b\xFCt\xE7e\
 birikir (ge\xE7ici sistem y\xF6netimi).")],["hammer",\u00E7("{m} proje: kurulu\u015F bedeli yak\u0131l\u0131r, bak\u0131m her g\xFCn yak\u0131l\u0131r; {n} g\xFCn \xF6denemezse ask\u0131ya al\u0131n\u0131r, b\xFCt\xE7e gelince a\xE7\u0131l\u0131r. Etki yaln\u0131z o \u015Fehirde; 4\
. seviye i\xE7in 1, 5. seviye i\xE7in 2 \xE7al\u0131\u015Fan proje gerekir.",{m:sayi((p.catalog??[]).length||5),n:sayi(p.suspendAfterUnpaidDays??3)})],["dumbbell",\u00E7("Spor salonunun aletleri her s\
eansta y\u0131pran\u0131r; bak\u0131m\u0131 ba\u015Fkan b\xFCt\xE7eden yapt\u0131r\u0131r (belediye defterine yaz\u0131l\u0131r). Spor salonu projesi salonda antrenmanlar\u0131n puan\u0131n\u0131 art\u0131r\u0131r.")],
["stethoscope",\u00E7("Sa\u011Fl\u0131k oca\u011F\u0131 projesi \u015Fehrin sa\u011Fl\u0131k oca\u011F\u0131na muayene odas\u0131 ekler; odalar doluyken yeni n\xF6bet a\xE7\u0131lmaz. Re\xE7etenin \xFCcreti ba\u015Fkentte belediye b\xFCt\xE7esine girer.")],
["hand-coins",\u00E7("Ba\u015Fkan b\xFCt\xE7eden ba\u015Fkentin sakinlerine \xF6der (g\xFCnde en \xE7ok {n}); kendine \xF6deyemez. Her harcama herkese a\xE7\u0131k defterde ve resm\xEE kay\u0131tta.",
{n:sayi(k.payment?.dailyMax??20)})],["door-open",\u00E7("Ba\u015Fkan istifa eder, hesab\u0131 silinir ya da ba\u015Fkentten ta\u015F\u0131n\u0131rsa g\xF6revi biter ve s\u0131radaki se\xE7imin adayl\u0131\u011F\u0131 hemen ba\u015Flar. Aday ya da oy \xE7\u0131kmayan se\
\xE7im ge\xE7ersizdir; yenisi hemen a\xE7\u0131l\u0131r.")]];return`<section class="kart" id="bld-kurallar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kurallar")}</p><h2 class="b2">${\u00E7(
"Belediye nas\u0131l i\u015Fler?")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></div>
        <div class="liste">${maddeler.map(([ik,m])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(m)}</div></div><span></span></div>`).
join("")}</div>
      </section>`}function ciz(){if(durdur(),!s.municipality){sira.cikar(oda),sira.cikar(sandik),kap.innerHTML=`<div class="sayfa sayfa-dar" data-bld-bolge-ekran="${esc(s.region_id??"")}"><div class="\
sayfa-bas"><div><p class="ust-yazi">${\u00E7("Belediye")}</p><h1 class="b1">${esc(bolgeAdi(s.region_id))}</h1>
          <p class="aciklama">${\u00E7("Belediye ba\u015Fkan\u0131 yaln\u0131z ba\u015Fkentte se\xE7ilir; bu \u015Fehir ba\u015Fkent de\u011Fil.")}</p></div></div>
          <section class="kart"><div class="satir"><button class="dugme ikincil" id="bld-baskente">${ikon("landmark")}${\u00E7("\xDClkemin ba\u015Fkentinin belediyesi")}</button></div></section></div>`,
$("#bld-baskente",kap)?.addEventListener("click",()=>{bolge=null,tazele()});return}const sv=bldSandikVerisi(s),m=s.mayor,cip=m?[\u00E7("Ba\u015Fkan {ad}",{ad:m.name}),"yesil","landmark"]:[\u00E7("Ba\u015Fk\
an yok"),"","landmark"];kap.innerHTML=`<div class="sayfa" data-bld-bolge-ekran="${esc(s.region_id)}">
        <div class="sayfa-bas"><div>${ulkeUst(s.country_id,\u00E7("Ba\u015Fkent"))}<h1 class="b1">${\u00E7("{sehir} Belediyesi",{sehir:esc(bolgeAdi(s.region_id))})}</h1>
          <p class="aciklama">${ben().residence===s.region_id?\u00E7("Oturdu\u011Fun ba\u015Fkentin belediyesi. Ba\u015Fkan\u0131 ba\u015Fkentin sakinleri se\xE7er; b\xFCt\xE7eyi ba\u015Fkan projelere ve sakinlere harcar, her kuru\u015F herkese\
 a\xE7\u0131k."):\u00E7("Ba\u015Fkan\u0131 ba\u015Fkentte oturan vatanda\u015Flar se\xE7er; oy ve adayl\u0131k yaln\u0131z onlar i\xE7indir. B\xFCt\xE7enin her kuru\u015Fu herkese a\xE7\u0131k.")}</p>\
</div>
          <span class="cip ${cip[1]}" id="bld-cip">${ikon(cip[2])}${esc(cip[0])}</span></div>
        <div class="izgara iki">
          <div class="yigin"><div id="bld-oda-yer"></div>${baskanKarti()}${sv?'<div id="bld-sandik-yer"></div>':""}${secimKarti()}${odemeKarti()}</div>
          <div class="yigin">${projeKarti()}${sporKarti()}${sponsorKarti()}${etkinlikKarti()}${defterKarti()}${kurallarKarti()}</div>
        </div></div>`,$("#bld-oda-yer",kap)?.replaceWith(oda.el),sira.ekle(oda),oda.yaz(s,saatFarki);const sy=$("#bld-sandik-yer",kap);sy&&sv?(sy.replaceWith(sandik.el),sira.ekle(sandik),sandik.yaz(sv)):
sira.cikar(sandik),bagla();const an=[s.election?.candidacy_start,s.election?.voting_start,s.election?.voting_end,m?.term_end,...(s.projects??[]).map(p=>p.project?.status==="building"?p.project.ready_at:
null)].filter(x=>x&&Date.parse(x)>Date.now()-6e4).sort()[0]??null;an!==sonAn&&(sonAn=an,sayac.n=0),durdur=geriSay(kap,()=>setTimeout(tazele,gecikmeli(sayac)))}let sonAn=null;const sayac={n:0};function onay({
ust,baslik,govde,ad,sinif="altin",ik="check",is}){pencere({ust,baslik,govde,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad,sinif,ikon:ik,is:async()=>{try{await is()}catch(err){tost(hataMetni(err),"circle-aler\
t")}await tazele()}}]})}function bagla(){const k=rm();for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);$("#bld-sponsor-form",kap)?.addEventListener("submit",e=>{e.preventDefault();
const tutar=krediAlt(String(new FormData(e.target).get("tutar")??""));if(tutar==null||tutar<=0){tost(\u00E7("Katk\u0131y\u0131 kredi olarak yaz (\xF6r. 100)."),"circle-alert");return}onay({ust:\u00E7(
"Festival sponsorlu\u011Fu"),baslik:\u00E7("{kr} kredi katk\u0131 koy",{kr:kr(tutar)}),govde:`<p class="aciklama">${\u00E7("B\xFCt\xE7eden {kr} kredi festivalin havuzuna ge\xE7er; \xF6d\xFCl gecesinde sahneye \xE7\u0131kan \
gruplara vergisiz da\u011F\u0131t\u0131l\u0131r. Sezon iptal olursa b\xFCt\xE7eye d\xF6ner. Bu sezon bir kez.",{kr:kr(tutar)})}</p>`,ad:\u00E7("Katk\u0131 koy"),ik:"disc-album",is:async()=>{await Sunucu.
yap("festival_sponsor",{p_amount:tutar}),tost(\u00E7("Belediye festivale {kr} kredi katk\u0131 koydu.",{kr:kr(tutar)}),"disc-album")}})});const ef=$("#bld-etkinlik-form",kap),efOku=()=>{const f=new FormData(
ef);duzen.tur=String(f.get("tur")??duzen.tur),duzen.gun=String(f.get("gun")??duzen.gun),duzen.saat=String(f.get("saat")??duzen.saat),duzen.havuz=String(f.get("havuz")??"")};ef?.addEventListener("chang\
e",e=>{efOku(),e.target?.name!=="havuz"&&ciz()}),ef?.addEventListener("input",e=>{e.target.name==="havuz"&&(duzen.havuz=String(e.target.value??""))}),ef?.addEventListener("submit",e=>{e.preventDefault(),
efOku();const r=ev?.rules??etkinlikKurali()??{},havuz=etkinlikKume(duzen.tur,r)==="senlik"||!duzen.havuz.trim()?0:krediAlt(duzen.havuz);if(havuz==null||havuz<0){tost(\u00E7("\xD6d\xFCl havuzunu kredi olarak\
 yaz (\xF6r. 100)."),"circle-alert");return}const an=etkinlikYerelAn(ev?.time_zone??"UTC",duzen.gun,duzen.saat),bedel=Number(r.kinds?.[duzen.tur]?.feeCr??0);onay({ust:\u00E7("\u015Eehir etkinli\u011Fi"),
baslik:\u00E7("{etkinlik} d\xFCzenle",{etkinlik:etkinlikAdi(duzen.tur)}),govde:`<p class="aciklama">${esc(havuz>0?\u00E7("{zaman}. B\xFCt\xE7eden {kr} kr bedel (etkinlik ba\u015Flarken yak\u0131l\u0131r) ve {h} kr \xF6d\xFCl ha\
vuzu emanete al\u0131n\u0131r. Ba\u015Flamas\u0131na {s} saat kalana dek iptal edebilirsin; bedel ve havuz b\xFCt\xE7eye d\xF6ner.",{zaman:saatYaz(an),kr:kr(bedel),h:kr(havuz),s:sayi(r.mayor?.cancelLeadH??
24)}):\u00E7("{zaman}. B\xFCt\xE7eden {kr} kr bedel (etkinlik ba\u015Flarken yak\u0131l\u0131r) emanete al\u0131n\u0131r. Ba\u015Flamas\u0131na {s} saat kalana dek iptal edebilirsin; bedel b\xFCt\xE7eye d\xF6ner.",
{zaman:saatYaz(an),kr:kr(bedel),s:sayi(r.mayor?.cancelLeadH??24)}))}</p>`,ad:\u00E7("D\xFCzenle"),ik:"calendar-plus",is:async()=>{await Sunucu.yap("cityevent_schedule",{p_kind:duzen.tur,p_starts_at:an,
p_pool_cr:havuz}),duzen.havuz="";const hv=$("#bld-etkinlik-form input[name=havuz]",kap);hv&&(hv.value=""),tost(\u00E7("{etkinlik} takvime girdi: {zaman}.",{etkinlik:etkinlikAdi(duzen.tur),zaman:saatYaz(
an)}),"calendar-plus")}})});for(const b of $$("[data-bld-etkinlik-odul]",kap))b.onclick=()=>{const e=(ev?.program??[]).find(x=>x.id===b.dataset.bldEtkinlikOdul);if(!e)return;const r=ev?.rules??etkinlikKurali()??
{};pencereForm({ust:\u00E7("Belediye b\xFCt\xE7esi"),baslik:\u00E7("{etkinlik}: \xF6d\xFCl koy",{etkinlik:etkinlikAdi(e.kind)}),onayAd:\u00E7("\xD6d\xFCl koy"),onayIkon:"hand-coins",govde:`<p class="a\
ciklama">${esc(Number(e.sponsor_cr)>0?\u00E7("Havuzda {a} kr var ({s} kr sponsorlardan); b\xFCt\xE7enin koydu\u011Fu en \xE7ok {b} kr olabilir. Tutar b\xFCt\xE7eden emanete ge\xE7er.",{a:kr(e.pool_cr??
0),s:kr(e.sponsor_cr),b:kr(r.pool?.maxCr??5e4)}):\u00E7("Havuzda {a} kr var; en \xE7ok {b} kr olabilir. Tutar b\xFCt\xE7eden emanete ge\xE7er.",{a:kr(e.pool_cr??0),b:kr(r.pool?.maxCr??5e4)}))}</p>
            <label class="alan"><span>${\u00E7("Tutar (kredi)")}</span><input name="tutar" inputmode="decimal" required placeholder="${esc(\u00E7("\xF6r. 100"))}"></label>`,is:async f=>{const alt=krediAlt(
String(f.get("tutar")??""));if(!alt||alt<=0)throw new Error(\u00E7("Tutar\u0131 kredi olarak yaz (\xF6r. 100)."));await Sunucu.yap("cityevent_fund",{p_event:e.id,p_amount_cr:alt}),tost(\u00E7("\xD6d\xFCl ha\
vuzuna {kr} kredi kondu.",{kr:kr(alt)}),"hand-coins"),await tazele()}})};for(const b of $$("[data-bld-etkinlik-iptal]",kap))b.onclick=()=>{const e=(ev?.program??[]).find(x=>x.id===b.dataset.bldEtkinlikIptal);
e&&onay({ust:\u00E7("\u015Eehir etkinli\u011Fi"),baslik:\u00E7("{etkinlik} iptal edilsin mi?",{etkinlik:etkinlikAdi(e.kind)}),govde:`<p class="aciklama">${esc(\u00E7("Bedel ve \xF6d\xFCl havuzu b\xFCt\xE7eye d\xF6ne\
r; kay\u0131tl\u0131lara haber gider, porsiyonlar kilere d\xF6ner."))}</p>`,ad:\u00E7("\u0130ptal et"),sinif:"mercan",ik:"x",is:async()=>{await Sunucu.yap("cityevent_cancel",{p_event:e.id}),tost(\u00E7(
"{etkinlik} iptal edildi.",{etkinlik:etkinlikAdi(e.kind)}),"x")}})};for(const b of $$("[data-bld-profil]",kap))b.onclick=()=>profilAc(b.dataset.bldProfil);$("#bld-aday",kap)?.addEventListener("click",
()=>onay({ust:\u00E7("Belediye ba\u015Fkan\u0131 se\xE7imi"),baslik:\u00E7("Belediye ba\u015Fkan\u0131 aday\u0131 ol"),govde:`<p class="aciklama">${\u00E7("Ad\u0131n aday listesinde herkese g\xF6r\xFCn\xFCr. Kazan\u0131\
rsan {gun} g\xFCn belediye ba\u015Fkan\u0131 olursun; b\xFCt\xE7eyle proje kurar, sakinlere herkese a\xE7\u0131k kay\u0131tla \xF6dersin.",{gun:sayi(k.election?.termDays??28)})}</p>`,ad:\u00E7("Aday o\
l"),ik:"user-round-plus",is:async()=>{await Sunucu.yap("mayor_register",{p_election:s.election.election_id}),tost(\u00E7("Belediye ba\u015Fkan\u0131 adayl\u0131\u011F\u0131n kaydedildi."),"user-round-\
plus")}})),$("#bld-cekil",kap)?.addEventListener("click",async()=>{try{await Sunucu.yap("mayor_withdraw",{p_election:s.election.election_id}),tost(\u00E7("Adayl\u0131ktan \xE7ekildin."),"check")}catch(err){
tost(hataMetni(err),"circle-alert")}await tazele()});for(const b of $$("[data-bld-oy]",kap))b.addEventListener("click",()=>{const aday=(s.election?.candidates??[]).find(c=>c.character_id===b.dataset.bldOy);
OyKabini.ac({ust:\u00E7("Belediye ba\u015Fkan\u0131 se\xE7imi"),baslik:\u00E7("{ad} i\xE7in oy ver",{ad:aday?.name??""}),secim:\u00E7("Belediye ba\u015Fkan\u0131 se\xE7imi"),pusula:[{ad:aday?.name??"",
alt:aday?.party??null,secili:!0}],not:`<p class="aciklama">${\u00E7("Oyun gizlidir ve de\u011Fi\u015Ftirilemez.")}</p>`,ad:\u00E7("Oy ver"),sayac:{oy:Number(s.election?.turnout??0),secmen:s.election?.
voters??null},gonder:async()=>{await Sunucu.yap("mayor_vote",{p_election:s.election.election_id,p_candidate:b.dataset.bldOy}),tost(\u00E7("Oyun sand\u0131\u011Fa at\u0131ld\u0131."),"vote")},sonra:()=>tazele()})});
$("#bld-istifa",kap)?.addEventListener("click",()=>onay({ust:\u00E7("Belediye ba\u015Fkan\u0131"),baslik:\u00E7("Belediye ba\u015Fkanl\u0131\u011F\u0131ndan istifa et"),govde:`<p class="aciklama">${\u00E7(
"G\xF6revin hemen biter; s\u0131radaki belediye se\xE7iminin adayl\u0131\u011F\u0131 hemen ba\u015Flar.")}</p>`,ad:\u00E7("\u0130stifa et"),sinif:"mercan",ik:"door-open",is:async()=>{await Sunucu.yap(
"mayor_resign",{}),tost(\u00E7("Belediye ba\u015Fkanl\u0131\u011F\u0131ndan istifa ettin."),"door-open")}}));for(const b of $$("[data-bld-baslat]",kap))b.onclick=()=>{const p=(s.projects??[]).find(x=>x.
id===b.dataset.bldBaslat);p&&onay({ust:\u00E7("Belediye projesi"),baslik:\u00E7("{proje} projesini ba\u015Flat",{proje:\u00E7v(p.name)}),govde:`<p class="aciklama">${\u00E7("B\xFCt\xE7eden {kr} kr yak\u0131l\u0131r; \
proje {g} g\xFCn sonra haz\u0131r olur ve her g\xFCn {b} kr bak\u0131m \xF6denir. {etki}",{kr:kr(p.costCr??0),g:sayi(p.buildDays??1),b:kr(p.upkeepCrPerDay??0),etki:esc(bldEtki(p))})}</p>`,ad:\u00E7("B\
a\u015Flat"),ik:"hammer",is:async()=>{await Sunucu.yap("municipal_project_start",{p_kind:p.id}),tost(\u00E7("{proje} projesi ba\u015Flad\u0131.",{proje:\u00E7v(p.name)}),"hammer")}})};for(const b of $$(
"[data-bld-iptal]",kap))b.onclick=()=>{const p=(s.projects??[]).find(x=>x.id===b.dataset.bldIptal);p&&onay({ust:\u00E7("Belediye projesi"),baslik:\u00E7("{proje} projesini iptal et",{proje:\u00E7v(p.name)}),
govde:`<p class="aciklama">${\u00E7("Projenin etkisi hemen biter; kurulu\u015F bedeli geri gelmez, bak\u0131m \xF6denmez. Sonra yeniden kurulabilir (bedel yeniden \xF6denir).")}</p>`,ad:\u00E7("\u0130ptal \
et"),sinif:"mercan",ik:"x",is:async()=>{await Sunucu.yap("municipal_project_cancel",{p_kind:p.id}),tost(\u00E7("{proje} projesi iptal edildi.",{proje:\u00E7v(p.name)}),"x")}})};$("#bld-spor-bakim",kap)?.
addEventListener("click",()=>onay({ust:\u00E7("Ba\u015Fkentin spor salonu"),baslik:\u00E7("Bak\u0131m yapt\u0131r"),govde:`<p class="aciklama">${\u00E7("{kr} kredi belediye b\xFCt\xE7esinden harcan\u0131r (beled\
iye defterine yaz\u0131l\u0131r); aletler %100 olur.",{kr:kr(s.gym?.cost_cr??0)})}</p>`,ad:\u00E7("Bak\u0131m yapt\u0131r"),ik:"wrench",is:async()=>{await Sunucu.yap("gym_maintain",{p_region:s.region_id}),
tost(\u00E7("Aletlerin bak\u0131m\u0131 yap\u0131ld\u0131: %100."),"wrench")}})),$("#bld-alici-ara",kap)?.addEventListener("submit",async e=>{if(e.preventDefault(),odeme.q=String(new FormData(e.target).
get("q")??"").trim(),odeme.q.length<2){tost(\u00E7("En az 2 harf yaz."),"circle-alert");return}try{odeme.sonuc=await Sunucu.cagir("mayor_resident_search",{p_query:odeme.q}),ciz()}catch(err){tost(hataMetni(
err),"circle-alert")}});for(const b of $$("[data-bld-alici]",kap))b.onclick=()=>{odeme.secilen=odeme.sonuc?.find(x=>x.character_id===b.dataset.bldAlici)??null,ciz()};$("#bld-alici-degis",kap)?.addEventListener(
"click",()=>{odeme.secilen=null,ciz()});const of=$("#bld-odeme",kap);of?.addEventListener("input",()=>{const f=new FormData(of);odeme.tutar=String(f.get("tutar")??""),odeme.amac=String(f.get("amac")??
"aid")}),of?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(of),alt=krediAlt(String(f.get("tutar")??""));if(odeme.amac=String(f.get("amac")??"aid"),!alt||alt<=0){tost(\u00E7("Tu\
tar\u0131 kredi olarak yaz (\xF6r. 25 ya da 12,50)."),"circle-alert");return}const kisi=odeme.secilen;onay({ust:\u00E7("Belediye b\xFCt\xE7esi"),baslik:\u00E7("\xD6demeyi onayla"),govde:`<p class="aci\
klama">${\u00E7("{ad} adl\u0131 ki\u015Fiye {kr} kr \xF6denecek ({amac}). \xD6deme herkese a\xE7\u0131k resm\xEE kayda girer.",{ad:esc(kisi.name),kr:kr(alt),amac:esc(ozkAmac(odeme.amac))})}</p>`,ad:\u00E7(
"\xD6de"),ik:"hand-coins",is:async()=>{await Sunucu.yap("mayor_pay",{p_recipient:kisi.character_id,p_amount:alt,p_purpose:odeme.amac}),odeme.tutar="",odeme.q="",odeme.secilen=null,odeme.sonuc=null,tost(
\u00E7("\xD6deme yap\u0131ld\u0131; resm\xEE kayda girdi."),"hand-coins")}})})}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()});await yukle(),ciz();const b1=Durum.dinle("ulke-olay",({olay})=>{
/^(mayor\.|municipal\.|cityevent\.)/.test(olay)&&tazele()}),saat=setInterval(()=>{kapandi||document.visibilityState!=="visible"||(sandik.el.isConnected?tazele():s?.municipality&&oda.el.isConnected&&(s.
projects??[]).some(p=>p.project?.status==="building")&&oda.yaz(s,saatFarki))},6e4);return()=>{kapandi=!0,durdur(),b1(),clearInterval(saat),sira.kapat(),oda.kapat(),sandik.kapat()}}}),Parcalar.tamam("e\
k_98s_belediye");
