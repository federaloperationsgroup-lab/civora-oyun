// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98w_parti.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("ulke/parti",{async ac(kap){let v=null,durdur=()=>{},uyeGoster=50,istekGoster=30,bagisTaslak="",bagisOdak=!1;const merkez=PartiMerkezi.ac(),liderIsaret={e:null,id:null};async function yukle(){
const[p,liste,kurallar]=await Promise.all([Sunucu.cagir("my_party"),Sunucu.cagir("parties").catch(()=>null),Durum.kurallar(),Durum.ozet()]);v={p,liste,c:kurallar.data.civic}}function uyelikHtml(p,lider){
const mr=p.membership_rule;if(!mr)return"";const tumIstekler=p.requests??[],istekler=tumIstekler.slice(0,istekGoster);return`<section class="kart" id="parti-uyelik"><div class="kart-bas"><div><p class\
="ust-yazi">${\u00E7("\xDCyelik")}</p>
          <h2 class="b2">${p.join_policy==="approval"?\u00E7("Onayl\u0131 \xFCyelik"):\u00E7("A\xE7\u0131k \xFCyelik")}</h2></div><span class="ik-kutu">${ikon("door-open")}</span></div>
        <div class="satir ara" style="flex-wrap:wrap;gap:8px" data-politika-durum="${esc(p.join_policy??"open")}">
          <span class="kucuk">${p.join_policy==="approval"?\u00E7("\xDCyelik onayl\u0131: kat\u0131lmak isteyenin iste\u011Fini ba\u015Fkan kabul eder."):\u00E7("\xDCyelik a\xE7\u0131k: vatanda\u015Flar do\u011Frudan kat\u0131\
l\u0131r.")}</span>
          ${lider?`<span class="satir" style="gap:6px"><button class="dugme kucuk-d ${p.join_policy==="approval"?"sade":"ikincil"}" data-politika="open" ${p.join_policy==="approval"?"":"disabled"}>${\u00E7(
"A\xE7\u0131k")}</button>
            <button class="dugme kucuk-d ${p.join_policy==="approval"?"ikincil":"sade"}" data-politika="approval" ${p.join_policy==="approval"?"disabled":""}>${\u00E7("Onayl\u0131")}</button></span>`:
""}</div>
        ${lider&&p.join_policy==="approval"?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("\xDCyelik istekleri \xB7 {n}",{n:tumIstekler.length})}</p>
          ${istekler.length?`<div class="koltuk-liste" style="margin-top:8px" id="uyelik-istekleri">${istekler.map(q=>`<div class="koltuk" data-istek="${esc(q.request_id)}">${avatarKutu(q.name,q.character_id)}\

              <div><b>${esc(q.name)}</b><div class="kucuk">${\u00E7("{zaman} d\xFC\u015Fer",{zaman:esc(saatYaz(q.expires_at))})}</div></div>
              <span class="satir" style="gap:6px"><button class="dugme altin kucuk-d" data-istek-karar="${esc(q.request_id)}" data-onay="1">${ikon("check")}${\u00E7("Kabul")}</button>
                <button class="dugme sade kucuk-d" data-istek-karar="${esc(q.request_id)}" data-onay="0">${ikon("x")}${\u00E7("Reddet")}</button></span></div>`).join("")}</div>
              ${tumIstekler.length>istekler.length?`<button class="dugme sade kucuk-d" style="margin-top:8px" data-daha="istek">${ikon("chevron-down")}${\u00E7("Daha fazla g\xF6ster ({n} istek daha)",
{n:sayi(tumIstekler.length-istekler.length)})}</button>`:""}`:`<p class="bos" style="margin-top:6px">${\u00E7("Bekleyen istek yok.")}</p>`}
          <p class="kucuk" style="margin-top:6px">${\u00E7("Karar verilmeyen istek {n} saatte d\xFC\u015Fer.",{n:Number(mr.requestExpiryH)})}</p>`:!lider&&p.join_policy==="approval"?`<p class="kucuk" \
style="margin-top:8px">${\u00E7("Kap\u0131da {n} istek bekliyor; karar\u0131 parti ba\u015Fkan\u0131 verir.",{n:sayi(p.pending_requests??0)})}</p>`:""}
      </section>`}function liderSecimHtml(p,lider){const r=p.leadership_rule;if(!r)return"";const e=p.leader_election,son=p.last_leader_election,simdi=Date.now(),kural=`<p class="kucuk" style="margin-\
top:10px">${\u00E7("\xDCyeler gizli oyla ba\u015Fkan\u0131 se\xE7er: {c} saat adayl\u0131k, {o} saat oylama. G\xF6revdeki ba\u015Fkan kendili\u011Finden aday; en \xE7ok oy alan ba\u015Fkan olur, e\u015Fitlikte kura. Oy i\xE7in en az {g} g\xFCnd\xFCr \xFCye ol\
mak gerekir; partide {b} g\xFCnde bir se\xE7im a\xE7\u0131l\u0131r.",{c:sayi(r.candidacyH),o:sayi(r.votingH),g:sayi(r.voterMemberDays),b:sayi(r.cooldownDays)})}</p>`;if(!e){const sonuc=son?son.stage===
"installed"?`<p class="aciklama" data-lider-son="installed">${son.lot?\u00E7("Son se\xE7im: {ad} {n} oyla ba\u015Fkan se\xE7ildi (e\u015Fitlikte kurayla).",{ad:esc(son.winner??""),n:sayi(son.winner_votes??
0)}):\u00E7("Son se\xE7im: {ad} {n} oyla ba\u015Fkan se\xE7ildi.",{ad:esc(son.winner??""),n:sayi(son.winner_votes??0)})} <span class="kucuk">${esc(saatYaz(son.voting_end))}</span></p>`:son.void_reason===
"dissolved"?"":`<p class="aciklama" data-lider-son="void">${son.void_reason==="no_votes"?\u00E7("Son se\xE7imde oy kullan\u0131lmad\u0131; ba\u015Fkan de\u011Fi\u015Fmedi."):\u00E7("Son se\xE7imde aday k\
almad\u0131; ba\u015Fkan de\u011Fi\u015Fmedi.")}</p>`:"",bekleme=p.election_cooldown_until&&Date.parse(p.election_cooldown_until)>simdi,yeni=!lider&&Number(p.my_member_days??0)<Number(r.challengeMemberDays);
return`<section class="kart" id="parti-secim" data-parti-secim="none"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Parti i\xE7i se\xE7im")}</p><h2 class="b2">${\u00E7("Parti ba\u015Fkanl\u0131\u011F\u0131")}\
</h2></div><span class="ik-kutu">${ikon("crown")}</span></div>
          ${sonuc}
          ${p.can_open_election?`<div class="satir" style="margin-top:8px"><button class="dugme ikincil" id="parti-secim-ac">${ikon("vote")}${\u00E7("Ba\u015Fkanl\u0131k se\xE7imi a\xE7")}</button></d\
iv>`:bekleme?`<p class="kucuk">${\u00E7("Yeni se\xE7im en erken {zaman} a\xE7\u0131labilir.",{zaman:esc(saatYaz(p.election_cooldown_until))})}</p>`:yeni?`<p class="kucuk">${\u00E7("Se\xE7im a\xE7mak i\xE7in en\
 az {n} g\xFCnd\xFCr \xFCye olmal\u0131s\u0131n (\u015Fu an {m} g\xFCn).",{n:sayi(r.challengeMemberDays),m:sayi(p.my_member_days??0)})}</p>`:""}
          ${kural}</section>`}const oylama=Date.parse(e.voting_start)<=simdi,adaylar=e.candidates??[],benimId=benimKimlik(),oyHakki=Number(p.my_member_days??0)>=Number(r.voterMemberDays);return liderIsaret.
e!==e.election_id&&(liderIsaret.e=e.election_id,liderIsaret.id=null),`<section class="kart" id="parti-secim" data-parti-secim="${oylama?"voting":"candidacy"}" data-parti-secim-id="${esc(e.election_id)}\
">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Parti i\xE7i se\xE7im")}${e.opened_by?" \xB7 "+\u00E7("a\xE7an {ad}",{ad:esc(e.opened_by)}):""}</p>
          <h2 class="b2">${oylama?\u00E7("Oylama s\xFCr\xFCyor"):\u00E7("Adayl\u0131k s\xFCr\xFCyor")}</h2></div><span class="ik-kutu">${ikon("crown")}</span></div>
        <p class="kucuk">${oylama?\u00E7("Oylama {zaman} biter.",{zaman:esc(saatYaz(e.voting_end))})+` <b data-bitis="${esc(e.voting_end)}"></b>`:\u00E7("Adayl\u0131k {zaman} biter; sonra {saat} saat oylam\
a.",{zaman:esc(saatYaz(e.voting_start)),saat:sayi(r.votingH)})+` <b data-bitis="${esc(e.voting_start)}"></b>`}</p>
        ${oylama&&!e.me_voted&&oyHakki?`<fieldset class="pusula" id="lider-pusula" style="margin-top:8px"><legend><p class="ust-yazi">${\u00E7("Oy pusulan")}</p><span class="kucuk">${\u00E7("Bir aday \
se\xE7.")}</span></legend>
            ${adaylar.map(x=>`<label class="aday-sec"><input type="radio" name="lider-oy" value="${esc(x.character_id)}" ${liderIsaret.id===x.character_id?"checked":""}>
              ${avatarKutu(x.name,x.character_id)}<span><b>${esc(x.name)}${x.character_id===benimId?" "+\u00E7("(sen)"):""}</b><span class="kucuk">${x.incumbent?\u00E7("g\xF6revdeki ba\u015Fkan"):\u00E7(
"aday")}</span></span></label>`).join("")}
            <button class="dugme altin" type="button" id="lider-oy-ver">${ikon("vote")}${\u00E7("Oyunu ver")}</button></fieldset>`:`<div class="koltuk-liste" style="margin-top:8px">${adaylar.map(x=>`<\
div class="koltuk" data-lider-aday="${esc(x.character_id)}">${avatarKutu(x.name,x.character_id)}
              <div><b>${esc(x.name)}${x.character_id===benimId?" "+\u00E7("(sen)"):""}</b><div class="kucuk">${x.incumbent?\u00E7("g\xF6revdeki ba\u015Fkan"):\u00E7("aday")}</div></div>
              ${!oylama&&x.character_id===benimId&&!x.incumbent?`<button class="dugme sade kucuk-d" id="lider-cekil">${ikon("x")}${\u00E7("\xC7ekil")}</button>`:"<span></span>"}</div>`).join("")}</div\
>`}
        ${!oylama&&!e.me_candidate?`<div class="satir" style="margin-top:10px"><button class="dugme ikincil" id="lider-aday-ol">${ikon("user-round-plus")}${\u00E7("Aday ol")}</button></div>`:""}
        ${oylama&&e.me_voted?`<div class="bilgi-kutusu" style="margin-top:8px">${ikon("check")}<span>${\u00E7("Oyunu kulland\u0131n. Oy gizlidir; kime verdi\u011Fin g\xF6sterilmez.")}</span></div>`:""}\

        ${oylama&&!e.me_voted&&!oyHakki?`<p class="kucuk" style="margin-top:8px">${\u00E7("Oy i\xE7in en az {n} g\xFCnd\xFCr \xFCye olmal\u0131s\u0131n.",{n:sayi(r.voterMemberDays)})}</p>`:""}
        ${oylama&&e.voters!=null?`<p class="kucuk" style="margin-top:6px">${\u00E7("{m} / {n} \xFCye oy kulland\u0131.",{m:sayi(e.turnout??0),n:sayi(e.voters)})}</p>`:""}
        ${kural}</section>`}function kasaHtml(p){const r=v.c.party,satirlar=(p.ledger??[]).slice(0,10),tur=k=>k==="donation"?\u00E7("ba\u011F\u0131\u015F"):k==="payment"?\u00E7("\xF6deme"):\u00E7("da\u011F\
\u0131lma");return`<section class="kart" id="parti-kasa" data-parti-kasa="${Number(p.balance_cr??0)}"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kasa ve ba\u011F\u0131\u015F defteri")}</\
p>
          <h2 class="b2">${\u00E7("{kr} kredi",{kr:kr(p.balance_cr??0)})}</h2></div><span class="ik-kutu">${ikon("hand-coins")}</span></div>
        <form class="satir" id="parti-bagis" novalidate style="gap:8px;flex-wrap:wrap;align-items:flex-end">
          <label class="alan" style="flex:1;min-width:140px;margin:0"><span>${\u00E7("Ba\u011F\u0131\u015F (kredi)")}</span><input name="tutar" inputmode="decimal" placeholder="${\u00E7("\xF6r. 25")}"\
></label>
          <button class="dugme altin" type="submit">${ikon("hand-coins")}${\u00E7("Ba\u011F\u0131\u015F yap")}</button></form>
        <p class="kucuk" style="margin-top:6px">${\u00E7("En az {kr} kredi. Ba\u011F\u0131\u015F\u0131n herkese a\xE7\u0131k defterde ad\u0131nla g\xF6r\xFCn\xFCr; kasadan yaln\u0131z ba\u015Fkan \xF6der.",
{kr:kr(r.donationMinCr)})}</p>
        ${satirlar.length?`<div class="liste" style="margin-top:10px" id="parti-defter">${satirlar.map(l=>`<div class="liste-satir" data-defter-tur="${esc(l.kind)}">
            <span class="liste-ikon">${ikon(l.kind==="donation"?"hand-coins":l.kind==="payment"?"wallet":"circle-alert")}</span>
            <div><span class="tur">${esc(tur(l.kind))} \xB7 ${esc(saatYaz(l.at))}</span><b>${esc(l.name??\u00E7("Hazine"))}</b>${l.note?`<div class="alt">${esc(l.note)}</div>`:""}</div>
            <span class="cip ${l.kind==="donation"?"yesil":""}">${l.kind==="donation"?"+":"\u2212"}${esc(kr(l.amount))}</span></div>`).join("")}</div>`:`<p class="bos" style="margin-top:8px">${\u00E7(
"Hen\xFCz hareket yok.")}</p>`}
      </section>`}function uyelerHtml(p,lider){const ben=benimKimlik(),hepsi=p.member_list??[],sirali=[...hepsi.filter(m=>m.character_id===ben||m.leader),...hepsi.filter(m=>m.character_id!==ben&&!m.leader)],
gorunen=sirali.slice(0,uyeGoster);return`<section class="kart" id="parti-uyeler"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xDCyeler \xB7 {n}",{n:sayi(p.members)})}</p><h2 class="b2">${\u00E7(
"Partinin \xFCyeleri")}</h2></div><span class="ik-kutu">${ikon("users-round")}</span></div>
        <div class="koltuk-liste">${gorunen.map(m=>`<div class="koltuk" data-uye="${esc(m.character_id)}">${avatarKutu(m.name,m.character_id)}
            <div><b>${esc(m.name)}${m.character_id===ben?" "+\u00E7("(sen)"):""}</b><div class="kucuk">${m.leader?\u00E7("Parti ba\u015Fkan\u0131"):\u00E7("{zaman} kat\u0131ld\u0131",{zaman:esc(saatYaz(
m.joined_at))})}</div></div>
            ${lider&&m.character_id!==ben?`<span class="satir" style="gap:6px;flex-wrap:wrap;justify-content:flex-end">
              <button class="dugme ikincil kucuk-d" data-uye-ode="${esc(m.character_id)}">${ikon("wallet")}${\u00E7("\xD6de")}</button>
              <button class="dugme sade kucuk-d" data-uye-devret="${esc(m.character_id)}">${ikon("crown")}${\u00E7("Ba\u015Fkanl\u0131\u011F\u0131 devret")}</button>
              <button class="dugme sade kucuk-d" data-uye-cikar="${esc(m.character_id)}">${ikon("x")}${\u00E7("\xC7\u0131kar")}</button></span>`:"<span></span>"}</div>`).join("")}</div>
        ${sirali.length>gorunen.length?`<button class="dugme sade kucuk-d" style="margin-top:10px" data-daha="uye">${ikon("chevron-down")}${\u00E7("Daha fazla g\xF6ster ({n} ki\u015Fi daha)",{n:sayi(sirali.
length-gorunen.length)})}</button>`:""}
      </section>`}function ozetHtml(p,lider){return`<section class="kart" id="parti-ozet"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Program")}</p><h2 class="b2">${esc(p.name)}</h2></div\
><span class="ik-kutu">${ikon("scroll-text")}</span></div>
        ${p.program?`<p class="aciklama parti-program">${esc(p.program)}</p>`:p.program_hidden?`<p class="kucuk">${\u00E7("Program kurallara ayk\u0131r\u0131 bulundu\u011Fu i\xE7in gizlendi.")}</p>`:`\
<p class="bos">${\u00E7("Program yaz\u0131lmam\u0131\u015F.")}</p>`}
        <p class="kucuk" style="margin-top:8px">${lider?\u00E7("partinin ba\u015Fkan\u0131s\u0131n"):\u00E7("ba\u015Fkan {ad}",{ad:esc(p.leader??"")})} \xB7 ${\u00E7("{zaman} kuruldu",{zaman:esc(saatYaz(
p.created_at))})}</p>
        <div class="satir" style="margin-top:12px;flex-wrap:wrap;gap:8px">
          ${lider?`<button class="dugme ikincil kucuk-d" id="parti-guncelle">${ikon("scroll-text")}${\u00E7("Ad ve program")}</button>
            <button class="dugme ikincil kucuk-d" id="parti-amblem" title="${esc(\u00E7("Amblemi Ma\u011Faza'dan takars\u0131n (D-164)"))}">${ikon("flag")}${\u00E7("Amblem")}</button>`:""}
          <button class="dugme sade kucuk-d" data-git="ulke/secim">${ikon("vote")}${\u00E7("Se\xE7im ve partiler")}</button>
          <button class="dugme sade kucuk-d" id="parti-ayril">${ikon("door-open")}${\u00E7("Partiden ayr\u0131l")}</button></div>
      </section>`}function ciz(){durdur();const p=v.p;if(!p){merkez.birak();const ist=v.liste?.my_request;kap.innerHTML=`<div class="sayfa">
          <div class="sayfa-bas"><div>${ulkeUst(Durum.v.ozet?.character?.citizenship,\u00E7("Parti"))}<h1 class="b1">${\u00E7("Parti merkezi")}</h1>
            <p class="aciklama">${\u00E7("Bir partinin \xFCyesi de\u011Filsin.")}</p></div></div>
          <section class="kart" id="parti-yok">
            ${ist?`<div class="bilgi-kutusu" id="istegim">${ikon("hourglass")}<span>${\u00E7("\xDCyelik iste\u011Fin {parti} partisinde bekliyor; parti ba\u015Fkan\u0131 karar verecek. Karar \xE7\u0131kmazsa {zaman} d\xFC\u015Fer.",
{parti:esc(ist.party??""),zaman:esc(saatYaz(ist.expires_at))})}</span></div>`:""}
            <p class="aciklama" style="margin-top:8px">${\u00E7("Partilere \xDClkem \u2192 Se\xE7im ekran\u0131ndan kat\u0131labilir ya da yeni parti kurabilirsin. Parti kurunca ya da kat\u0131l\u0131nca parti merkezin burada a\xE7\u0131l\u0131\
r.")}</p>
            <div class="satir" style="margin-top:12px"><button class="dugme altin" data-git="ulke/secim">${ikon("users-round")}${\u00E7("Partilere bak")}</button></div>
          </section></div>`;for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);return}const lider=p.leader_id===benimKimlik();bagisOdak=!!document.activeElement?.closest?.("#pa\
rti-bagis"),kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div>${ulkeUst(p.country_id,\u00E7("Parti"))}<h1 class="b1">${esc(p.name)}</h1>
          <p class="aciklama">${\u00E7("{n} \xFCye \xB7 kasa {kr} kredi",{n:Number(p.members),kr:kr(p.balance_cr)})} \xB7 ${lider?\u00E7("partinin ba\u015Fkan\u0131s\u0131n"):\u00E7("ba\u015Fkan {ad}",
{ad:esc(p.leader??"")})}</p></div>
          <span class="cip" style="background:${partiRenk(p.name)};color:#fff">${ikon("users-round")}${p.join_policy==="approval"?\u00E7("onayl\u0131 \xFCyelik"):\u00E7("\xFCyelik a\xE7\u0131k")}</spa\
n></div>
        <div class="izgara iki">
          <div class="yigin"><div id="parti-merkezi-yer"></div>${liderSecimHtml(p,lider)}${kasaHtml(p)}</div>
          <div class="yigin">${ozetHtml(p,lider)}${uyelikHtml(p,lider)}${uyelerHtml(p,lider)}</div>
        </div></div>`,$("#parti-merkezi-yer",kap).replaceWith(merkez.el),merkez.yaz(p),bagla(p,lider),durdur=geriSay(kap,()=>setTimeout(tazele,1500))}function bagla(p,lider){for(const b of $$("[data-g\
it]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);const bagisAlan=$("#parti-bagis input[name=tutar]",kap);bagisAlan&&(bagisAlan.value=bagisTaslak,bagisAlan.addEventListener("input",()=>{bagisTaslak=bagisAlan.
value}),bagisOdak&&bagisAlan.focus());for(const b of $$("[data-daha]",kap))b.onclick=()=>{b.dataset.daha==="uye"?uyeGoster+=50:istekGoster+=30,ciz()};const r=v.c.party;for(const b of $$("[data-politik\
a]",kap))b.onclick=()=>{const pol=b.dataset.politika;pencere({ust:\u00E7("Parti"),baslik:pol==="approval"?\u00E7("\xDCyeli\u011Fi onayl\u0131 yap"):\u00E7("\xDCyeli\u011Fi a\xE7\u0131k yap"),govde:`<p\
 class="aciklama">${pol==="approval"?\u00E7("Bundan sonra kat\u0131lmak isteyenler istek g\xF6nderir; kabul ya da reddi sen verirsin."):\u00E7("Bundan sonra vatanda\u015Flar do\u011Frudan kat\u0131l\u0131r. Bekleyen iste\
kler d\xFC\u015Fer; isteyen yeniden kat\u0131l\u0131r.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("De\u011Fi\u015Ftir"),sinif:"altin",is:()=>islem("party_set_join_policy",{p_policy:pol},pol===
"approval"?\u00E7("\xDCyelik art\u0131k onayl\u0131."):\u00E7("\xDCyelik art\u0131k a\xE7\u0131k."),"users-round")}]})};for(const b of $$("[data-istek-karar]",kap))b.onclick=async()=>{if(b.disabled)return;
for(const x of $$(`[data-istek-karar="${b.dataset.istekKarar}"]`,kap))x.disabled=!0;const onay=b.dataset.onay==="1";try{const y=await Sunucu.yap("party_request_decide",{p_request:b.dataset.istekKarar,
p_approve:onay});tost(y?.expired?\u00E7("Bu ki\u015Fi bu arada ba\u015Fka bir partiye girmi\u015F; istek d\xFC\u015Ft\xFC."):onay?\u00E7("\xDCyelik iste\u011Fini kabul ettin."):\u00E7("\xDCyelik iste\u011Fini\
 reddettin."),y?.expired?"hourglass":onay?"users-round":"x")}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()};const liderId=$("#parti-secim",kap)?.dataset.partiSecimId;$("#parti-secim-ac",kap)?.
addEventListener("click",()=>{const k=p.leadership_rule??{};pencere({ust:\u00E7("Parti i\xE7i se\xE7im"),baslik:\u00E7("Ba\u015Fkanl\u0131k se\xE7imi a\xE7"),govde:`<p class="aciklama">${\u00E7("{c} s\
aat adayl\u0131k, sonra {o} saat oylama. G\xF6revdeki ba\u015Fkan kendili\u011Finden aday olur; se\xE7imi a\xE7an \xFCye de aday olur. Se\xE7im bitince partide {b} g\xFCn yeni se\xE7im a\xE7\u0131lmaz.",
{c:Number(k.candidacyH??24),o:Number(k.votingH??48),b:Number(k.cooldownDays??14)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Se\xE7imi a\xE7"),sinif:"altin",is:()=>islem("party_leader_elect\
ion_open",{},\u00E7("Parti i\xE7i se\xE7im a\xE7\u0131ld\u0131."),"vote")}]})}),$("#lider-aday-ol",kap)?.addEventListener("click",()=>islem("party_leader_register",{p_election:liderId},\u00E7("Parti b\
a\u015Fkanl\u0131\u011F\u0131na adays\u0131n."),"user-round-plus")),$("#lider-cekil",kap)?.addEventListener("click",()=>islem("party_leader_withdraw",{p_election:liderId},\u00E7("Parti i\xE7i se\xE7imde ada\
yl\u0131ktan \xE7ekildin."),"x"));for(const g of $$("#lider-pusula input",kap))g.onchange=()=>{liderIsaret.id=g.value};$("#lider-oy-ver",kap)?.addEventListener("click",()=>{const e=p.leader_election,aday=(e?.
candidates??[]).find(x=>x.character_id===liderIsaret.id);if(!aday){tost(\u00E7("\xD6nce bir aday i\u015Faretle."),"circle-alert");return}OyKabini.ac({ust:\u00E7("Parti i\xE7i se\xE7im"),baslik:\u00E7(
"Oyunu onayla"),secim:\u00E7("Parti ba\u015Fkanl\u0131\u011F\u0131"),pusula:[{ad:aday.name,alt:aday.incumbent?\u00E7("g\xF6revdeki ba\u015Fkan"):\u00E7("aday"),secili:!0}],not:`<p class="kucuk">${\u00E7(
"Oy gizlidir ve de\u011Fi\u015Ftirilemez. Kime oy verdi\u011Fin kimseye g\xF6sterilmez.")}</p>`,ad:\u00E7("Oyumu ver"),sayac:{oy:Number(e?.turnout??0),secmen:e?.voters??null},gonder:async()=>{const y=await Sunucu.
yap("party_leader_vote",{p_election:liderId,p_candidate:aday.character_id});return liderIsaret.id=null,tost(\u00E7("Oyun kaydedildi."),"vote"),{oy:y?.turnout,secmen:y?.voters??e?.voters??null}},sonra:()=>tazele()})}),
$("#parti-bagis",kap)?.addEventListener("submit",ev=>{ev.preventDefault();const alt=krediAlt(String(new FormData(ev.target).get("tutar")??""));if(!alt||alt<Number(r.donationMinCr)){tost(\u00E7("Ba\u011F\u0131\u015F \
en az {kr} kredi olmal\u0131 (\xF6r. 25 ya da 12,50).",{kr:kr(r.donationMinCr)}),"circle-alert");return}pencere({ust:\u00E7("Parti"),baslik:\u00E7("Ba\u011F\u0131\u015F\u0131 onayla"),govde:`<p class=\
"aciklama">${\u00E7("{parti} partisinin kasas\u0131na {kr} kredi ba\u011F\u0131\u015Flanacak. Ba\u011F\u0131\u015F\u0131n herkese a\xE7\u0131k defterde ad\u0131nla g\xF6r\xFCn\xFCr ve geri al\u0131nmaz.",
{parti:esc(p.name),kr:kr(alt)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Ba\u011F\u0131\u015F yap"),sinif:"altin",ikon:"hand-coins",is:()=>(bagisTaslak="",islem("party_donate",{p_party:p.party_id,
p_amount:alt},\u00E7("Ba\u011F\u0131\u015F\u0131n kasaya ge\xE7ti."),"hand-coins"))}]})});for(const b of $$("[data-uye-ode]",kap))b.onclick=()=>{const m=(p.member_list??[]).find(x=>x.character_id===b.
dataset.uyeOde);pencereForm({ust:\u00E7("Parti kasas\u0131"),baslik:\u00E7("{ad} adl\u0131 \xFCyeye \xF6de",{ad:m?.name??""}),onayAd:\u00E7("\xD6de"),onayIkon:"wallet",govde:`<label class="alan"><span\
>${\u00E7("Tutar (kredi)")}</span><input name="tutar" inputmode="decimal" required placeholder="${\u00E7("\xF6r. 25")}"></label>
            <label class="alan"><span>${\u00E7("A\xE7\u0131klama (iste\u011Fe ba\u011Fl\u0131)")}</span><input name="not" maxlength="${Number(r.noteMax)}" placeholder="${\u00E7("\xF6r. afi\u015F bask\u0131s\u0131")}\
"></label>
            <p class="kucuk">${\u00E7("Kasada {kr} kredi var. \xD6deme herkese a\xE7\u0131k defterde g\xF6r\xFCn\xFCr.",{kr:kr(p.balance_cr??0)})}</p>`,is:async d=>{const alt=krediAlt(String(d.get("tu\
tar")??""));if(!alt||alt<Number(r.donationMinCr))throw new Error(\u00E7("Tutar en az {kr} kredi olmal\u0131.",{kr:kr(r.donationMinCr)}));await Sunucu.yap("party_pay",{p_member:m.character_id,p_amount:alt,
p_note:String(d.get("not")??"").trim()||null}),tost(\u00E7("\xD6deme yap\u0131ld\u0131; defterde g\xF6r\xFCn\xFCr."),"wallet"),await tazele()}})};for(const b of $$("[data-uye-devret]",kap))b.onclick=()=>{
const m=(p.member_list??[]).find(x=>x.character_id===b.dataset.uyeDevret);pencere({ust:\u00E7("Parti"),baslik:\u00E7("Ba\u015Fkanl\u0131\u011F\u0131 {ad} adl\u0131 \xFCyeye devret",{ad:m?.name??""}),govde:`\
<p class="aciklama">${\u00E7("Ba\u015Fkanl\u0131k hemen ge\xE7er; kasa, \xFCyelik kararlar\u0131 ve aday g\xF6sterme yeni ba\u015Fkan\u0131n olur. Geri almak i\xE7in yeni ba\u015Fkan\u0131n devretmesi ya da parti i\xE7i se\xE7im gerekir.")}\
</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Devret"),sinif:"mercan",ikon:"crown",is:()=>islem("party_transfer_leader",{p_member:m.character_id},\u00E7("Ba\u015Fkanl\u0131\u011F\u0131 devrettin."),
"crown")}]})};for(const b of $$("[data-uye-cikar]",kap))b.onclick=()=>{const m=(p.member_list??[]).find(x=>x.character_id===b.dataset.uyeCikar);pencere({ust:\u00E7("Parti"),baslik:\u00E7("{ad} adl\u0131 \xFCy\
eyi \xE7\u0131kar",{ad:m?.name??""}),govde:`<p class="aciklama">${\u00E7("\xC7\u0131kar\u0131lan \xFCye {n} saat bu partiye yeniden kat\u0131lamaz.",{n:Number(r.expelRejoinH)})}</p>`,dugmeler:[{ad:\u00E7(
"Vazge\xE7")},{ad:\u00E7("\xC7\u0131kar"),sinif:"mercan",ikon:"x",is:()=>islem("party_expel",{p_member:m.character_id},\u00E7("\xDCyeyi partiden \xE7\u0131kard\u0131n."),"x")}]})};$("#parti-amblem",kap)?.
addEventListener("click",()=>{try{sessionStorage.setItem("civora.magaza",JSON.stringify({tur:"amblem"}))}catch{}Kabuk.git("hayat/magaza")}),$("#parti-guncelle",kap)?.addEventListener("click",()=>pencereForm(
{ust:\u00E7("Parti"),baslik:\u00E7("Ad ve program"),onayAd:\u00E7("Kaydet"),onayIkon:"scroll-text",govde:`<label class="alan"><span>${\u00E7("Partinin ad\u0131")}</span><input name="ad" value="${esc(p.
name)}" minlength="${r.nameMin}" maxlength="${r.nameMax}" autocapitalize="words">
            <small>${\u00E7("Ad {n} saatte bir de\u011Fi\u015Fir; \xFClkede e\u015Fsiz.",{n:Number(r.renameCooldownH)})}</small></label>
          <label class="alan"><span>${\u00E7("Program")}</span><textarea name="program" maxlength="${r.programMax}">${esc(p.program??"")}</textarea>
            <small>${\u00E7("En \xE7ok {n} karakter. Kurallara ayk\u0131r\u0131 program gizlenir.",{n:Number(r.programMax)})}</small></label>`,is:async d=>{const ad=String(d.get("ad")??"").trim().replace(
/\s+/g," "),program=String(d.get("program")??"").trim();if(ad.length<r.nameMin||ad.length>r.nameMax)throw new Error(\u00E7("Ad {min}\u2013{max} karakter olmal\u0131.",{min:Number(r.nameMin),max:Number(
r.nameMax)}));await Sunucu.yap("party_update",{p_name:ad===p.name?null:ad,p_program:program===(p.program??"")?null:program}),tost(\u00E7("Parti bilgileri kaydedildi."),"scroll-text"),await tazele()}})),
$("#parti-ayril",kap)?.addEventListener("click",()=>pencere({ust:\u00E7("Parti"),baslik:\u00E7("Partiden ayr\u0131l"),govde:`<p class="aciklama">${\u00E7("Ba\u015Fkansan ba\u015Fkanl\u0131k en eski \xFCyeye ge\xE7er; tek \
\xFCyeysen parti da\u011F\u0131l\u0131r ve kasas\u0131 hazineye ge\xE7er. Yeni partiye kat\u0131lmak i\xE7in {n} saat beklersin.",{n:Number(r.joinCooldownH)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},
{ad:\u00E7("Ayr\u0131l"),sinif:"mercan",is:()=>islem("party_leave",{},\u00E7("Partiden ayr\u0131ld\u0131n."),"door-open")}]}))}async function islem(fn,args,mesaj,ik){try{await Sunucu.yap(fn,args),tost(
mesaj,ik)}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}const tazele=tazeleyici(async()=>{await yukle(),ciz()});await yukle(),ciz();const b1=Durum.dinle("parti-olay",()=>tazele()),b2=Durum.
dinle("olay",({olay})=>{/^party\./.test(olay)&&tazele()}),b3=Durum.dinle("ulke-olay",({olay})=>{/^party\./.test(olay)&&tazele()});return()=>{durdur(),b1(),b2(),b3(),merkez.kapat()}}}),Parcalar.tamam("\
ek_98w_parti");
