// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_98zzt_odalar.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/odalar",{async ac(kap){let o=null,h=null,secili=null,kapandi=!1,hata3b=!1,ayr="";const mod=()=>Gorunum.uc()&&!hata3b?"3b":"2b";async function yukle(){o=await Sunucu.cagir("chambers"),
secili??=o?.member_kind??o?.kinds?.find(k=>k.members>0)?.kind??"sanayi",h=await Sunucu.cagir("chamber_hall",{p_kind:secili})}const veri=()=>odaSalonVerisi(h,secili),kural=()=>Durum.v.kurallar?.data?.profession?.
chambers??{},sec_=()=>({minMembers:2,voidRetryDays:2,...kural().election??{},...h?.chamber?.rule?.election??{}}),yazi_=()=>({minLen:10,maxLen:280,perDay:1,...kural().post??{},...h?.chamber?.rule?.post??
{}});function sec(ad){ayr=odaSalonAyrinti(veri(),ad);const el=$("#oda-ayrinti",kap);el&&(el.textContent=ayr)}function birak(){odaSalon3bOrnek&&Uc.cizici?.etkin===odaSalon3bOrnek&&Uc.cizici.birak(odaSalon3bOrnek)}
const yap=async(ad,p,mesaj)=>{try{await Sunucu.yap(ad,p),mesaj&&tost(mesaj,"badge-check"),await tazele()}catch(e){tost(hataMetni(e),"circle-alert")}};function uyelikKarti(k,c){const ben=o.member_kind;
if(ben===k.kind){const gun=Number(c?.me?.member_days??0);return`<p>${\u00E7("{oda} \xFCyesisin ({n} g\xFCnd\xFCr).",{oda:MESLEK_ODA_AD[k.kind],n:sayi(gun)})}${c?.me?.president?" "+\u00E7("Odan\u0131n ba\u015Fka\
n\u0131s\u0131n."):""}</p>
          <button class="dugme sade kucuk-d" type="button" id="oda-cik">${ikon("log-out")}${\u00E7("Odadan ayr\u0131l")}</button>`}const sart=`<p class="kucuk">${esc(odaSartMetni(k.kind,k.progress))}<\
/p>`;return ben?`${sart}<p class="kucuk">${\u00E7("\u015Eu an {oda} \xFCyesisin; ayn\u0131 anda tek odan\u0131n \xFCyesi olunur.",{oda:MESLEK_ODA_AD[ben]})}</p>`:o.cooldown_until?`${sart}<p class="kuc\
uk">${\u00E7("Odadan ayr\u0131ld\u0131n; {zaman} yeniden girebilirsin.",{zaman:saatYaz(o.cooldown_until)})}</p>`:`${sart}<button class="dugme kucuk-d" type="button" id="oda-gir"${k.qualifies?"":" disa\
bled"}>${ikon("user-round-plus")}${\u00E7("Odaya gir")}</button>`}function secimKarti(c){const e=c?.election;if(!e)return`<p class="kucuk">${\u00E7("\u015Eu an se\xE7im yok. Ba\u015Fkan yoksa (ya da d\xF6nemi bitiyor\
sa) en az {n} \xFCyeli odada se\xE7im kendili\u011Finden a\xE7\u0131l\u0131r.",{n:sayi(sec_().minMembers)})}</p>`;const uye=o.member_kind===c.kind;if(e.stage==="candidacy")return`<p>${\u00E7("Adayl\u0131k \
s\xFCr\xFCyor; oylama {zaman} ba\u015Fl\u0131yor.",{zaman:saatYaz(e.voting_start)})}</p>
          <ul class="oda-adaylar">${(e.candidates??[]).map(a=>`<li>${esc(a.name)}</li>`).join("")||`<li class="bos">${\u00E7("Hen\xFCz aday yok.")}</li>`}</ul>
          ${uye?`<button class="dugme ikincil kucuk-d" type="button" id="oda-aday" data-on="${e.me_candidate?0:1}">${ikon("vote")}${e.me_candidate?\u00E7("Adayl\u0131ktan \xE7ekil"):\u00E7("Aday ol")}\
</button>`:""}`;if(e.stage==="voting")return`<p>${\u00E7("Oylama s\xFCr\xFCyor: {n} \xFCye oy verdi; {zaman} biter. Oy gizlidir: kime verdi\u011Fin hi\xE7bir yerde g\xF6r\xFCnmez.",{n:sayi(e.turnout),
zaman:saatYaz(e.voting_end)})}</p>
          ${e.me_voted?`<p class="kucuk">${\u00E7("Oyunu kulland\u0131n.")}</p>`:uye?`<div class="satir" style="gap:8px;flex-wrap:wrap">${(e.candidates??[]).map(a=>`<button class="dugme ikincil kucuk-\
d" type="button" data-oda-oy="${esc(a.character_id)}">${ikon("vote")}${esc(a.name)}</button>`).join("")}</div>`:""}`;if(e.stage==="installed")return`<p>${\u00E7("Son se\xE7im: {ad} ba\u015Fkan se\xE7ildi ({oy} o\
y, {n} se\xE7men).",{ad:e.winner??"",oy:sayi(e.winner_votes??0),n:sayi(e.voters??0)})}</p>`;const g=sayi(sec_().voidRetryDays);return`<p class="kucuk">${e.void_reason==="no_candidates"?\u00E7("Son se\xE7\
im d\xFC\u015Ft\xFC: aday \xE7\u0131kmad\u0131. {n} g\xFCn sonra yeniden a\xE7\u0131l\u0131r.",{n:g}):\u00E7("Son se\xE7im d\xFC\u015Ft\xFC: oy verilmedi. {n} g\xFCn sonra yeniden a\xE7\u0131l\u0131r.",
{n:g})}</p>`}function duyuruKarti(c){const p=c?.post,baskan=!!c?.me?.president,y=yazi_(),kalan=Math.max(0,Number(y.perDay)-Number(c?.posts_today??0));return`${p?`<blockquote class="oda-duyuru">\u201C${esc(
p.body)}\u201D<span class="kucuk">${esc(p.author??"")} \xB7 ${esc(zamanOnce(p.created_at))}</span></blockquote>
          ${baskan?"":`<button class="dugme sade kucuk-d" type="button" id="oda-rapor" data-post="${esc(p.post_id)}">${ikon("flag")}${\u00E7("Raporla")}</button>`}`:`<p class="bos">${\u00E7("Ba\u015Fkan\u0131n \
duyurusu yok.")}</p>`}
        ${baskan?`<form class="form" id="oda-duyuru-form" novalidate style="margin-top:10px"><label>${\u00E7("Odaya duyuru (tek sat\u0131r, {a}\u2013{b} harf; g\xFCnde {n})",{a:sayi(y.minLen),b:sayi(y.
maxLen),n:sayi(y.perDay)})}
            <input name="metin" maxlength="${Number(y.maxLen)}" autocomplete="off"${kalan?"":" disabled"}></label>
            ${kalan?"":`<p class="kucuk">${\u00E7("Bug\xFCn\xFCn duyurusunu yazd\u0131n; yar\u0131n yeniden yazabilirsin.")}</p>`}
            <button class="dugme kucuk-d" type="submit"${kalan?"":" disabled"}>${ikon("megaphone")}${\u00E7("Duyur")}</button>
            <div class="form-mesaj"></div></form>`:""}`}function ciz(){if(o?.enabled===!1){kap.innerHTML=`<div class="sayfa"><h1 class="b1">${\u00E7("Meslek odalar\u0131")}</h1><p class="bos">${\u00E7(
"Meslek odalar\u0131 \u015Fu an kapal\u0131.")}</p></div>`;return}const d=veri(),m=mod(),c=h?.chamber??null,k=(o?.kinds??[]).find(x=>x.kind===secili)??{kind:secili,progress:null,qualifies:!1},ulke=o?.
country_id??Durum.v.ozet?.character?.citizenship??"",sira=c?.ranking?.rows??[];kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div>${ulkeUst(ulke,\u00E7("meslek odalar\u0131"))}<h1 class="b1">${\u00E7("Meslek odalar\u0131")}</h1>
          <p class="aciklama">${\u00E7("Her meslek kendi odas\u0131nda toplan\u0131r: \xFCyeler ba\u015Fkan\u0131n\u0131 gizli oyla se\xE7er, ba\u015Fkan duyuru yazar, sezonun en iyileri panoda. Ba\u015Fkanl\u0131k ve s\u0131ralama g\xFC\xE7 ya da oy vermez\
.")}</p></div>
          <span class="ik-kutu">${ikon("network")}</span></div>
        <div class="oda-secici" role="tablist" aria-label="${\u00E7("\xDClkenin meslek odalar\u0131")}">${(o?.kinds??[]).map(x=>`<button class="cip-dugme${x.kind===secili?" secili":""}" type="button" \
role="tab"
            aria-selected="${x.kind===secili}" data-oda="${x.kind}" data-uye="${Number(x.members??0)}" style="--oda:${MESLEK_ODA_RENK[x.kind]??"#5E534B"}">${ikon(MESLEK_ODA_IK[x.kind]??"network")}${esc(
MESLEK_ODA_AD[x.kind]??x.kind)}
            <span class="oda-sayi">${sayi(x.members??0)}</span>${o.member_kind===x.kind?`<b class="oda-odan">${\u00E7("odan")}</b>`:""}${x.election?`<span class="oda-secim-nokta" title="${esc(\u00E7("\
Se\xE7im s\xFCr\xFCyor"))}"></span>`:""}</button>`).join("")}</div>
        <section class="kart oda-kart" id="oda-salon" style="margin-top:12px"><div class="kart-bas"><div><p class="ust-yazi">${esc(MESLEK_ODA_AD[secili]??"")}</p>
            <h2 class="b2">${d.baskan?\u00E7("Ba\u015Fkan: {ad}",{ad:d.baskan.ad}):\u00E7("Odan\u0131n salonu")}</h2></div>
            ${Gorunum.webglVar()?`<button class="dugme sade kucuk-d" id="oda-mod" aria-pressed="${m==="2b"}" title="${m==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCme (2B) ge\xE7"):\u00E7("3B g\xF6r\xFCn\xFCme ge\xE7")}\
">${ikon("layers")}${m==="3b"?\u00E7("2B"):\u00E7("3B")}</button>`:""}</div>
          <div class="oda-sahne sahne3b" id="oda-sahne" data-mod="${m}">
            ${m==="3b"?`<div class="yukleniyor oda-on${odaSalon3bOrnek&&Uc.cizici?.etkin===odaSalon3bOrnek?" bitti":""}" id="oda-yukleniyor" aria-label="${\u00E7("Salon a\xE7\u0131l\u0131yor\u2026")}"\
>${odaSalon2b(d)}</div>`:""}
            <div class="oda-2b" id="oda-2b"${m==="3b"?" hidden":""}>${m==="2b"?odaSalon2b(d):""}</div>
          </div>
          <p class="kucuk" id="oda-ayrinti" aria-live="polite" style="margin-top:8px">${esc(ayr||\u00E7("K\xFCrs\xFCye, panolara, sand\u0131\u011Fa ya da s\u0131ralara dokun: ayr\u0131nt\u0131s\u0131 burada."))}\
</p>
          <p class="kucuk">${c?\u00E7("{n} \xFCye \xB7 son 24 saatte salona {m} \xFCye u\u011Frad\u0131.",{n:sayi(d.uye),m:sayi(d.mevcut)}):\u00E7("Bu oda hen\xFCz kurulmad\u0131: ilk \xFCye girince kurulur.")}\
</p></section>
        <div class="izgara iki" style="margin-top:16px">
          <section class="kart" id="oda-uyelik"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xDCyelik")}</p><h2 class="b2">${esc(MESLEK_ODA_AD[secili]??"")}</h2></div><span class="ik-kutu\
">${ikon(MESLEK_ODA_IK[secili]??"briefcase-business")}</span></div>
            ${uyelikKarti(k,c)}</section>
          <section class="kart" id="oda-secim"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u015Fkan se\xE7imi")}</p><h2 class="b2">${d.baskan?\u00E7("D\xF6nem {zaman} bitiyor",{zaman:saatYaz(
d.baskan.bitis)}):\u00E7("Odan\u0131n ba\u015Fkan\u0131 yok")}</h2></div><span class="ik-kutu">${ikon("vote")}</span></div>
            ${secimKarti(c)}</section>
          <section class="kart" id="oda-duyurular"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u015Fkan\u0131n duyurusu")}</p><h2 class="b2">${\u00E7("Duyuru panosu")}</h2></div><span \
class="ik-kutu">${ikon("megaphone")}</span></div>
            ${duyuruKarti(c)}</section>
          <section class="kart" id="oda-sira"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sezonun puan\u0131yla")}</p><h2 class="b2">${\u00E7("Meslek s\u0131ralamas\u0131")}</h2></div><sp\
an class="ik-kutu">${ikon("trophy")}</span></div>
            <ol class="oda-siralama">${sira.map(r=>`<li${r.character_id===Durum.v.ozet?.character?.id?' class="ben"':""}><span>${esc(r.name)}</span><b>${sayi(r.score)}</b></li>`).join("")||`<li class=\
"bos">${\u00E7("Bu sezon hen\xFCz puan yok.")}</li>`}</ol>
            ${c?.ranking?.me?`<p class="kucuk">${\u00E7("Senin yerin: {n}. ({p} puan)",{n:sayi(c.ranking.me.rank),p:sayi(c.ranking.me.score)})}</p>`:""}</section>
        </div></div>`;for(const b of $$("[data-oda]",kap))b.onclick=()=>{secili=b.dataset.oda,ayr="",tazele()};$("#oda-gir",kap)?.addEventListener("click",()=>yap("chamber_join",{p_kind:secili},\u00E7(
"{oda} \xFCyesi oldun.",{oda:MESLEK_ODA_AD[secili]}))),$("#oda-cik",kap)?.addEventListener("click",()=>pencere({ust:\u00E7("Meslek odas\u0131"),baslik:\u00E7("Odadan ayr\u0131lmak istiyor musun?"),govde:`\
<p>${\u00E7("Ayr\u0131l\u0131nca {n} g\xFCn ba\u015Fka odaya (ya da yeniden bu odaya) giremezsin. Ba\u015Fkansan ba\u015Fkanl\u0131k bo\u015Fal\u0131r.",{n:sayi(kural().switchCooldownDays??7)})}</p>`,
dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Odadan ayr\u0131l"),sinif:"mercan",is:()=>yap("chamber_leave",{},\u00E7("Odadan ayr\u0131ld\u0131n."))}]})),$("#oda-aday",kap)?.addEventListener("click",
e=>{const on=e.currentTarget.dataset.on==="1";yap("chamber_candidacy",{p_on:on},on?\u00E7("Adayl\u0131\u011F\u0131n yaz\u0131ld\u0131."):\u00E7("Adayl\u0131ktan \xE7ekildin."))});for(const b of $$("[d\
ata-oda-oy]",kap))b.onclick=()=>yap("chamber_vote",{p_election:h.chamber.election.election_id,p_candidate:b.dataset.odaOy},\u00E7("Oyun sand\u0131kta."));$("#oda-rapor",kap)?.addEventListener("click",
e=>raporla({tur:"chamber_post",ref:e.currentTarget.dataset.post,ad:MESLEK_ODA_AD[secili]})),$("#oda-duyuru-form",kap)?.addEventListener("submit",async e=>{e.preventDefault();const f=e.currentTarget,kutu=$(
".form-mesaj",f);try{await Sunucu.yap("chamber_post",{p_body:f.metin.value}),tost(\u00E7("Duyuru odaya as\u0131ld\u0131."),"megaphone"),await tazele()}catch(x){kutu.innerHTML=`<div class="hata-kutusu"\
>${esc(hataMetni(x))}</div>`}}),$("#oda-mod",kap)?.addEventListener("click",()=>{hata3b=!1;const ikiB=mod()==="3b";Gorunum.ayarla(ikiB?"2b":"3b"),tost(ikiB?\u00E7("Hafif g\xF6r\xFCn\xFCm (2B) se\xE7ildi. Ayarlar'\
dan de\u011Fi\u015Ftirebilirsin."):\u00E7("3B g\xF6r\xFCn\xFCm se\xE7ildi."),"layers")});for(const g of $$("#oda-2b [data-oda-sec]",kap))g.addEventListener("click",()=>sec(g.dataset.odaSec));sahneBagla(
d)}async function sahneBagla(d){const kutu=$("#oda-sahne",kap);if(!kutu||mod()!=="3b"){birak();return}try{const{THREE,cizici}=await Uc.yukle("98zzt_odalar.js");if(kapandi||$("#oda-sahne",kap)!==kutu)return;
odaSalon3bOrnek??=odaSalon3bKur(THREE,cizici);const a=odaSalon3bOrnek;if(a.dinle("sec",sec),a.kapBagla(kutu),a.durumYaz(d),!cizici.bagla(a,kutu))throw new Error("webgl-bagla");$("#oda-yukleniyor",kutu)?.
classList.add("bitti")}catch(e){if(console.warn("3B oda salonu a\xE7\u0131lamad\u0131:",e),kapandi)return;hata3b=!0,tost(\u00E7("3B sahne bu cihazda a\xE7\u0131lamad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),
"layers"),ciz()}}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()});await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^chamber\./.test(olay)&&tazele()}),b2=Gorunum.dinle(()=>{o&&
ciz()});return()=>{kapandi=!0,b1(),b2(),birak()}}}),Parcalar.tamam("ek_98zzt_odalar");
