// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_98zzu_usta.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/usta",{async ac(kap){let b=null,kapandi=!1;const yukle=async()=>{b=await Sunucu.cagir("mentor_board")},yap=async(ad,p,mesaj,ik="hand-heart")=>{try{await Sunucu.yap(ad,p),mesaj&&tost(
mesaj,ik)}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()},kisi=k=>`<button class="baglanti" type="button" data-profil="${esc(k.character_id)}"><b>${esc(k.name??"")}</b></button>`;function bagKarti(x,r){
const karsi=x.role==="mentor"?x.apprentice:x.mentor;return`<div class="usta-bag" data-bag="${esc(x.mentorship_id)}" data-rol="${esc(x.role??"")}">
        <div class="satir" style="justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">${avatarKutu(karsi.name,karsi.character_id)}
          <div style="flex:1;min-width:0"><p class="ust-yazi">${x.role==="mentor"?\u00E7("\xC7\u0131ra\u011F\u0131n"):\u00E7("Ustan")}</p>${kisi(karsi)}
            ${x.progress?`<p class="kucuk">${\u00E7("\xC7\u0131ra\u011F\u0131n seviyesi {n} \xB7 e\u015Fle\u015Fmeden beri {g} farkl\u0131 g\xFCn oyunda",{n:sayi(x.progress.level),g:sayi(x.progress.active_days)})}\
</p>`:""}
            ${x.closes_at?`<p class="kucuk">${\u00E7("Ba\u011F {zaman} kendili\u011Finden kapan\u0131r (mezuniyet olmazsa).",{zaman:saatYaz(x.closes_at)})}</p>`:""}</div>
          <div class="satir" style="gap:6px;flex-wrap:wrap"><button class="dugme ikincil kucuk-d" type="button" data-usta-mesaj="${esc(karsi.character_id)}" data-ad="${esc(karsi.name??"")}">${ikon("me\
ssage-circle")}${\u00E7("Mesaj")}</button>
            <button class="dugme sade kucuk-d" type="button" data-usta-bitir="${esc(x.mentorship_id)}" data-ad="${esc(karsi.name??"")}">${ikon("x")}${\u00E7("Ba\u011F\u0131 bitir")}</button></div></di\
v>
        ${ustaBasamaklar(x,r)}</div>`}function istekSatiri(x,gelen){const karsi=x.role==="mentor"?x.apprentice:x.mentor,ne=gelen?x.role==="apprentice"?\u00E7("sana usta olmak istiyor"):\u00E7("\xE7\u0131ra\u011F\u0131n\
 olmak istiyor"):x.role==="mentor"?\u00E7("\xE7\u0131ra\u011F\u0131n olsun diye istek g\xF6nderdin"):\u00E7("ustan olsun diye istek g\xF6nderdin");return`<div class="ilk-adim" data-istek="${esc(x.mentorship_id)}\
">${avatarKutu(karsi.name,karsi.character_id)}
        <span style="flex:1;min-width:0">${kisi(karsi)} <span class="kucuk">${esc(ne)} \xB7 ${esc(\u00E7("{zaman} d\xFC\u015Fer",{zaman:saatYaz(x.expires_at)}))}</span></span>
        ${gelen?`<span class="satir" style="gap:6px;flex-wrap:wrap;justify-content:flex-end"><button class="dugme kucuk-d" type="button" data-usta-kabul="${esc(x.mentorship_id)}" data-rol="${esc(x.role)}\
">${ikon("check")}${\u00E7("Kabul et")}</button>
          <button class="dugme sade kucuk-d" type="button" data-usta-ret="${esc(x.mentorship_id)}">${\u00E7("Geri \xE7evir")}</button></span>`:`<button class="dugme sade kucuk-d" type="button" data-us\
ta-geri="${esc(x.mentorship_id)}">${\u00E7("Geri al")}</button>`}</div>`}function ciz(){if(!b?.enabled){kap.innerHTML=`<div class="sayfa sayfa-dar"><h1 class="b1">${\u00E7("Usta-\xE7\u0131rak")}</h1><\
p class="bos">${\u00E7("Usta-\xE7\u0131rak \u015Fu an kapal\u0131.")}</p></div>`;return}const r=b.rule??{},me=b.me??{},usta=!me.can_mentor,cirak=!me.can_apprentice,ustalar=b.mentors??[],arayanlar=b.seekers??
[],cirakSay=Number(me.active_apprentices??0);kap.innerHTML=`<div class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m")}</p><h1 class="b1">${\u00E7("Usta-\xE7\u0131rak")}</h1>
          <p class="aciklama">${\u00E7("Deneyimli bir oyuncu (usta) yeni gelene (\xE7\u0131rak) yol g\xF6sterir. \xC7\u0131rak ilerledik\xE7e ikisi de g\xF6r\xFCn\xFCm \xF6d\xFCl\xFC al\u0131r; para, e\u015Fya ya da g\xFC\xE7 aktar\u0131lmaz. Mesaj i\xE7in \xF6zel me\
saj\u0131 kullan\u0131n.")}</p></div>
          <span class="ik-kutu">${ikon("hand-heart")}</span></div>
        <section class="kart" id="usta-durum">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Durumun")}</p><h2 class="b2">${usta?\u00E7("Usta olabilirsin"):cirak?\u00E7("\xC7\u0131rak olabilirsin"):b.apprenticeship?.status==="\
active"?\u00E7("\xC7\u0131raks\u0131n"):\u00E7("\u015Eu an usta-\xE7\u0131rak olamazs\u0131n")}</h2></div>
            <span class="ik-kutu">${ikon(usta?"hand-heart":"sprout")}</span></div>
          <p class="kucuk" data-usta-olur="${usta?1:0}">${usta?\u00E7("Usta: {n}/{m} \xE7\u0131rak \xB7 mezun etti\u011Fin {g} (son {d} g\xFCnde {s}/{t} say\u0131l\u0131r).",{n:sayi(cirakSay),m:sayi(r.
maxApprentices??3),g:sayi(me.graduates??0),d:sayi(r.countWindowDays??30),s:sayi(me.graduated_window??0),t:sayi(r.countPerWindow??3)}):esc(ustaKodMetni(me.can_mentor,r,me))}</p>
          <p class="kucuk" data-cirak-olur="${cirak?1:0}">${cirak?\u00E7('\xC7\u0131rak olabilirsin: \xFClkenin ustalar\u0131ndan birine "Ustam ol" de ya da "Usta ar\u0131yorum"u a\xE7; ustalar seni g\xF6r\xFCr.'):
esc(ustaKodMetni(me.can_apprentice,r,me))}</p>
          ${cirak||me.seeking?`<label class="radyo" style="margin-top:8px"><input type="checkbox" id="usta-ariyorum"${me.seeking?" checked":""}>
            <span><b>${\u00E7("Usta ar\u0131yorum")}</b><span class="kucuk">${\u00E7('A\xE7\u0131nca \xFClkenin ustalar\u0131 seni "Usta arayanlar" listesinde g\xF6r\xFCr ve istek g\xF6nderebilir.')}<\
/span></span></label>`:""}
          ${me.can_mentor==="MENTOR_NOT_GUIDE"?`<button class="dugme ikincil kucuk-d" type="button" id="usta-rehber" style="margin-top:8px">${ikon("settings")}${\u00E7("Rehber ol (Ayarlar)")}</button>`:
""}
        </section>
        ${b.apprenticeship?`<section class="kart" id="usta-ciraklik"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xC7\u0131rakl\u0131\u011F\u0131n")}</p>
            <h2 class="b2">${b.apprenticeship.status==="graduated"?\u00E7("Mezun oldun"):\u00E7("Ustan\u0131n yan\u0131nda")}</h2></div><span class="ik-kutu">${ikon("sprout")}</span></div>
            ${b.apprenticeship.status==="active"?bagKarti(b.apprenticeship,r):`<p>${\u00E7("Ustan {ad} ile mezun oldun: Kalfa Ni\u015Fan\u0131 ve Kalfa \xE7er\xE7evesi senin.",{ad:esc(b.apprenticeship.
mentor?.name??"")})}</p>`}</section>`:""}
        ${(b.apprentices??[]).length?`<section class="kart" id="usta-ciraklar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xC7\u0131raklar\u0131n")}</p>
            <h2 class="b2">${\u00E7("{n} \xE7\u0131rak",{n:sayi(b.apprentices.length)})}</h2></div><span class="ik-kutu">${ikon("users-round")}</span></div>
            <div class="yigin">${b.apprentices.map(x=>bagKarti(x,r)).join("")}</div></section>`:""}
        ${(b.incoming??[]).length?`<section class="kart" id="usta-gelen"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Gelen istekler")}</p>
            <h2 class="b2">${\u00E7("{n} istek",{n:sayi(b.incoming.length)})}</h2></div><span class="ik-kutu">${ikon("inbox")}</span></div>
            <p class="kucuk">${\u00E7("Kabul edersen usta, \xE7\u0131ra\u011F\u0131n seviyesini ve basamaklar\u0131n\u0131 g\xF6r\xFCr.")}</p>
            <div class="yigin">${b.incoming.map(x=>istekSatiri(x,!0)).join("")}</div></section>`:""}
        ${(b.outgoing??[]).length?`<section class="kart" id="usta-giden"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("G\xF6nderdi\u011Fin istekler")}</p>
            <h2 class="b2">${\u00E7("{n} istek bekliyor",{n:sayi(b.outgoing.length)})}</h2></div><span class="ik-kutu">${ikon("send")}</span></div>
            <div class="yigin">${b.outgoing.map(x=>istekSatiri(x,!1)).join("")}</div></section>`:""}
        ${cirak?`<section class="kart" id="usta-ustalar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xDClkenin ustalar\u0131")}</p>
            <h2 class="b2">${\u00E7("Bir usta se\xE7")}</h2></div><span class="ik-kutu">${ikon("hand-heart")}</span></div>
            <div class="yigin">${ustalar.map(u=>`<div class="ilk-adim" data-usta="${esc(u.character_id)}">${avatarKutu(u.name,u.character_id)}
              <span style="flex:1;min-width:0">${kisi(u)} <span class="kucuk">${esc(\u00E7("{g} mezun \xB7 {c} \xE7\u0131rak",{g:sayi(u.graduates??0),c:sayi(u.apprentices??0)}))}</span></span>
              ${u.pending?`<span class="kucuk">${\u00E7("\u0130stek bekliyor")}</span>`:`<button class="dugme kucuk-d" type="button" data-usta-iste="${esc(u.character_id)}" data-ad="${esc(u.name??"")}\
">${ikon("hand-heart")}${\u00E7("Ustam ol")}</button>`}</div>`).join("")||`<p class="bos">${\u00E7('\xDClkende \u015Fu an \xE7\u0131rak alabilen usta yok. "Usta ar\u0131yorum"u a\xE7; yeni ustalar seni g\xF6r\xFCr.')}\
</p>`}</div></section>`:""}
        ${usta&&cirakSay<Number(r.maxApprentices??3)?`<section class="kart" id="usta-arayanlar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Usta arayanlar")}</p>
            <h2 class="b2">${\u00E7("Yeni gelenler")}</h2></div><span class="ik-kutu">${ikon("sprout")}</span></div>
            <div class="yigin">${arayanlar.map(u=>`<div class="ilk-adim" data-arayan="${esc(u.character_id)}">${avatarKutu(u.name,u.character_id)}
              <span style="flex:1;min-width:0">${kisi(u)} <span class="kucuk">${esc(\u00E7("{s}. seviye \xB7 {g} g\xFCnl\xFCk",{s:sayi(u.level??1),g:sayi(u.age_days??0)}))}</span></span>
              ${u.pending?`<span class="kucuk">${\u00E7("\u0130stek bekliyor")}</span>`:`<button class="dugme kucuk-d" type="button" data-usta-iste="${esc(u.character_id)}" data-ad="${esc(u.name??"")}\
">${ikon("hand-heart")}${\u00E7("\xC7\u0131ra\u011F\u0131m ol")}</button>`}</div>`).join("")||`<p class="bos">${\u00E7(`\u015Eu an usta arayan yok. Yeni gelenler "Usta ar\u0131yorum"u a\xE7\u0131nca burada g\xF6r\xFCn\xFCr; Mey\
dan'da tan\u0131\u015Ft\u0131\u011F\u0131n birine profilinden de istek g\xF6nderebilirsin.`)}</p>`}</div></section>`:""}
        ${(b.history??[]).length?`<section class="kart" id="usta-gecmis"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ge\xE7mi\u015F")}</p><h2 class="b2">${\u00E7("Biten ba\u011Flar")}</h2\
></div><span class="ik-kutu">${ikon("scroll-text")}</span></div>
            <ul class="usta-gecmis">${b.history.map(x=>{const karsi=x.role==="mentor"?x.apprentice:x.mentor;return`<li>${esc(x.role==="mentor"?\u00E7("\xC7\u0131ra\u011F\u0131n {ad}",{ad:karsi.name??""}):
\u00E7("Ustan {ad}",{ad:karsi.name??""}))} \xB7 ${esc(x.status==="graduated"?\u00E7("mezun oldu"):\u00E7("ba\u011F bitti"))} \xB7 ${esc(saatYaz(x.ended_at??x.graduated_at))}</li>`}).join("")}</ul></se\
ction>`:""}
        <p class="kucuk" style="margin-top:12px">${\u00E7("Kurallar: usta en az {u}. seviye ve rehber, en \xE7ok {n} \xE7\u0131rak; \xE7\u0131rak hesab\u0131 {g} g\xFCnden gen\xE7 ve en \xE7ok {c}. seviye; ikisi ayn\u0131 \xFClkenin vatanda\u015F\
\u0131. G\xFCnde en \xE7ok {i} istek; istek {s} saatte d\xFC\u015Fer; ba\u011F {b} g\xFCnde mezuniyetle bitmezse kapan\u0131r. Ustan\u0131n madalyas\u0131na {d} g\xFCnde en \xE7ok {k} mezun say\u0131l\u0131r.",
{u:sayi(r.minLevel??8),n:sayi(r.maxApprentices??3),g:sayi(r.apprenticeMaxDays??14),c:sayi(r.apprenticeMaxLevel??7),i:sayi(r.requestsPerDay??5),s:sayi(r.requestExpiryH??48),b:sayi(r.activeMaxDays??30),
d:sayi(r.countWindowDays??30),k:sayi(r.countPerWindow??3)})}</p>
      </div>`,bagla()}function bagla(){for(const x of $$("[data-profil]",kap))x.onclick=()=>profilAc(x.dataset.profil,tazele);$("#usta-ariyorum",kap)?.addEventListener("change",e=>yap("mentor_seek",{p_on:e.
currentTarget.checked},e.currentTarget.checked?\u00E7("Usta ar\u0131yorsun: \xFClkenin ustalar\u0131 seni g\xF6r\xFCr."):\u00E7("Usta arama kapand\u0131."))),$("#usta-rehber",kap)?.addEventListener("c\
lick",()=>Kabuk.git("hayat/ayarlar"));for(const x of $$("[data-usta-iste]",kap))x.onclick=()=>yap("mentor_request",{p_character:x.dataset.ustaIste},\u00E7("\u0130stek g\xF6nderildi: {ad}.",{ad:x.dataset.
ad??""}),"send");for(const x of $$("[data-usta-kabul]",kap))x.onclick=()=>pencere({ust:\u00E7("Usta-\xE7\u0131rak"),baslik:\u00E7("\u0130stek kabul edilsin mi?"),govde:`<p>${x.dataset.rol==="apprentic\
e"?\u00E7("Kabul edince ustan olur; seviyeni ve basamaklar\u0131n\u0131 g\xF6r\xFCr. Bekleyen \xF6teki isteklerin d\xFC\u015Fer."):\u00E7("Kabul edince \xE7\u0131ra\u011F\u0131n olur; seviyesini ve basamaklar\u0131n\u0131 g\xF6r\xFCrs\
\xFCn.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Kabul et"),sinif:"altin",ikon:"check",is:()=>yap("mentor_respond",{p_mentorship:x.dataset.ustaKabul,p_accept:!0},\u00E7("Usta-\xE7\u0131rak ba\u011F\u0131 k\
uruldu."))}]});for(const x of $$("[data-usta-ret]",kap))x.onclick=()=>yap("mentor_respond",{p_mentorship:x.dataset.ustaRet,p_accept:!1},\u00E7("\u0130stek geri \xE7evrildi."),"x");for(const x of $$("[\
data-usta-geri]",kap))x.onclick=()=>yap("mentor_cancel",{p_mentorship:x.dataset.ustaGeri},\u00E7("\u0130stek geri al\u0131nd\u0131."),"undo-2");for(const x of $$("[data-usta-bitir]",kap))x.onclick=()=>pencere(
{ust:\u00E7("Usta-\xE7\u0131rak"),baslik:\u00E7("Ba\u011F bitirilsin mi?"),govde:`<p>${\u00E7("{ad} ile usta-\xE7\u0131rak ba\u011F\u0131 biter; ula\u015F\u0131lan basamaklar\u0131n \xF6d\xFClleri sende kal\u0131r. Sonra ba\u015Fka bir ba\u011F kurulabil\
ir.",{ad:esc(x.dataset.ad??"")})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Ba\u011F\u0131 bitir"),sinif:"mercan",is:()=>yap("mentor_end",{p_mentorship:x.dataset.ustaBitir},\u00E7("Ba\u011F bitti\
."),"x")}]});for(const x of $$("[data-usta-mesaj]",kap))x.onclick=()=>mesajBaslat(x.dataset.ustaMesaj,x.dataset.ad??"")}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()});await yukle(),ciz();
const b1=Durum.dinle("olay",({olay})=>{/^mentor\./.test(olay)&&tazele()});return()=>{kapandi=!0,b1()}}}),Parcalar.tamam("ek_98zzu_usta");
