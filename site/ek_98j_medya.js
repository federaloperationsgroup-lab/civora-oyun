// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_98j_medya.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/medya",{async ac(kap){let v={m:null,sirketler:[],kurallar:null,kariyer:null,okunmamis:0};const kareler=new Map;async function yukle(){const[m,kurallar,kariyer,kartpostallar]=await Promise.
all([Sunucu.cagir("media_overview"),Durum.kurallar(),Sunucu.cagir("media_career").catch(()=>null),Sunucu.cagir("postcards",{p_limit:1})]);v.m=m,v.kurallar=kurallar,v.kariyer=kariyer,v.okunmamis=Number(
kartpostallar.unread??0),v.sirketler=await Promise.all((m.companies??[]).map(c=>Sunucu.cagir("company_sponsorships",{p_company:c.company_id}).catch(()=>({company_id:c.company_id,company:c.name,offers:[]})))),
kareler.clear();for(const p of m.photos?.recent??[])kareler.set(p.photo_id,p)}const neden=(o,m)=>o.owner_id===(Durum.v.ozet?.character?.id??"")?\u00E7("kendi i\u015Fletmen"):o.kind==="ad"?m.newspaper?
\u00E7("en az {n} abone gerek",{n:Number(o.min_followers)}):\u00E7("gazete gerek"):\u00E7("en az {n} etkin takip\xE7i gerek",{n:Number(o.min_followers)});let geriDurdur=()=>{};function ciz(){const m=v.
m,t=m.tier??{},s=v.kurallar.data.media?.sponsorship??{},basamak=MEDYA_BASAMAK[t.tier_id]??t.tier_id??"",acik=(m.offers?.open??[]).map(o=>({...o,neden:o.eligible?"":neden(o,m)})),bekleyen=m.offers?.accepted??
[],yayimlanan=m.offers?.published??[],ilanlar=bekleyen.filter(o=>o.kind==="ad");kap.innerHTML=`<div class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m")}</p><h1 class="b1">${\u00E7("Medya")}</h1>
          <p class="aciklama">${\u00E7("Kare \xE7ek, video \xE7ek, canl\u0131 yay\u0131n a\xE7, gazete \xE7\u0131kar, sponsorluk al. Takip\xE7i sat\u0131n al\u0131nmaz: yaln\u0131z ger\xE7ek, etkin oyuncular say\u0131l\u0131r; basamak g\xFC\xE7 ya da oy vermez.")}\
</p></div></div>
        <section class="kart medya-basamak" data-basamak="${esc(t.tier_id??"")}">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Fenomen basama\u011F\u0131n")}</p><h2 class="b2">${esc(basamak)}</h2></div><span class="ik-kutu">${ikon(t.tier>=3?"star":t.tier>=2?"s\
parkles":t.tier>=1?"trending-up":"user-round")}</span></div>
          <p>${\u00E7("{n} etkin takip\xE7i ({t} takip\xE7i) \xB7 \xFClkende {m} etkin oyuncu \xB7 {k} takip",{n:Number(t.active_followers??0),t:Number(t.followers??0),m:Number(t.active_players??0),k:Number(
m.following??0)})}</p>
          ${t.next?`<p class="kucuk">${\u00E7("{basamak} i\xE7in {n} etkin takip\xE7i gerek (son {g} g\xFCnde oyunu a\xE7an takip\xE7iler).",{basamak:esc(MEDYA_BASAMAK[t.next.tier_id]??t.next.tier_id),
n:Number(t.next.need_followers),g:Number(v.kurallar.data.media?.activeDays??7)})}</p>`:`<p class="kucuk">${\u00E7("En \xFCst basamaktas\u0131n.")}</p>`}
          <p class="kucuk">${\u00E7("{n} Kare \xB7 {a} alk\u0131\u015F \xB7 {g} g\xF6r\xFCnt\xFClenme",{n:Number(m.photos?.count??0),a:Number(m.photos?.applause??0),g:Number(m.photos?.views??0)})}${m.
channel?` \xB7 ${\u00E7("{n} video",{n:Number(m.channel.count??0)})}`:""}</p>
          <div class="oneri-dugmeler" style="margin-top:10px">
            <button class="dugme altin" id="medya-kare">${ikon("camera")}${\u00E7("Kare \xE7ek")}</button>
            <button class="dugme ikincil" id="medya-album">${ikon("image")}${\u00E7("Alb\xFCm\xFCm")}</button>
            <button class="dugme ikincil" id="medya-kartpostal">${ikon("mail-open")}${\u00E7("Kartpostallar\u0131m")} <span class="cip altin">${esc(\u00E7("{n} okunmam\u0131\u015F",{n:sayi(v.okunmamis)}))}\
</span></button>
            ${m.newspaper||v.kariyer?.newspaper?`<button class="dugme" id="medya-makale">${ikon("notebook-pen")}${\u00E7("Makale yaz")}</button>`:`<button class="dugme" id="medya-gazete-kur">${ikon("n\
ewspaper")}${\u00E7("Gazete kur")}</button>`}
            ${m.newspaper?`<button class="dugme ikincil" id="medya-vaat">${ikon("scale")}${\u00E7("Vaat kayd\u0131 yaz")}</button>`:""}
            <button class="dugme ikincil" id="medya-akis">${ikon("megaphone")}${\u00E7("Ak\u0131\u015Fa git")}</button>
          </div>
        </section>
        ${kanalBolumuHtml(m,v.kurallar,v.kariyer)}
        ${gazeteciKartiHtml(v.kariyer,m)}
        ${platformKartiHtml(v.kariyer)}
        <section class="kart" id="medya-sponsorluk">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sponsorluk ve ilan")}</p><h2 class="b2">${\u00E7("Bug\xFCn {k} / {t} kredi \xB7 {n} / {m} i\xE7erik",{k:kr(m.earnings?.today_cr??0),t:kr(
s.dailyIncomeCapCr??0),n:Number(m.earnings?.published_today??0),m:Number(s.perDayPerCreator??0)})}</h2></div><span class="ik-kutu">${ikon("hand-coins")}</span></div>
          <p class="kucuk">${\u00E7('Son 30 g\xFCn: {kr} kredi. \u0130\u015Fletmeler \xFCr\xFCnlerini tan\u0131tman i\xE7in teklif a\xE7ar; kabul edince {s} saat i\xE7inde Kare ya da video (sponsorluk) ya da makale (ilan) ile yay\u0131mla\
rs\u0131n. \u0130\xE7erik "{etiket}" etiketlidir.',{kr:kr(m.earnings?.month_cr??0),s:Number(s.publishH??48),etiket:esc(isbirligiEtiketi(s.tag))})}</p>
          ${bekleyen.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Kabul ettiklerin (yay\u0131n bekliyor)")}</p><div class="yigin" id="medya-bekleyen">${bekleyen.map(o=>teklifSatiri(o,
{benim:!0})).join("")}</div>`:""}
          <p class="ust-yazi" style="margin-top:12px">${\u00E7("A\xE7\u0131k teklifler ({n})",{n:acik.length})}</p>
          <div class="yigin" id="medya-acik">${acik.map(o=>teklifSatiri(o)).join("")||`<p class="bos">${\u00E7("\u015Eu an \xFClkende a\xE7\u0131k tan\u0131t\u0131m teklifi yok. \u0130\u015Fletme sahipleri Medya'dan teklif a\xE7ar.")}\
</p>`}</div>
          ${yayimlanan.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Yay\u0131mlad\u0131klar\u0131n")}</p><div class="yigin" id="medya-yayimlanan">${yayimlanan.map(o=>teklifSatiri(o,{benim:!0})).
join("")}</div>`:""}
        </section>
        <section class="kart" id="medya-kareler">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kare")}</p><h2 class="b2">${m.photos?.count?\u00E7("Son Kare'lerin"):\u00E7("Hen\xFCz Kare yok")}</h2></div><span class="ik-kutu">${ikon(
"image")}</span></div>
          ${(m.photos?.recent??[]).length?`<div class="kare-izgara">${m.photos.recent.map(p=>kareKartHtml(p,{kucuk:!0})).join("")}</div>`:`<p class="bos">${\u00E7("Meydanda, evinde, konserde ya da cep\
hede Kare \xE7ek; arkada\u015Flar\u0131n ve o an yan\u0131ndakiler kareye girer. G\xFCnde en \xE7ok {n}.",{n:Number(v.kurallar.data.media?.photo?.perDay??10)})}</p>`}
        </section>
        <section class="kart" id="medya-gazete">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Gazete")}</p><h2 class="b2">${m.newspaper?esc(m.newspaper.name):\u00E7("Gazeten yok")}</h2></div><span class="ik-kutu">${ikon("newspa\
per")}</span></div>
          ${m.newspaper?.name_reset?`<div class="hata-kutusu" style="margin-bottom:8px">${ikon("id-card")}<span>${\u00E7("Gazetenin ad\u0131 topluluk kurallar\u0131na uymad\u0131\u011F\u0131 i\xE7in kald\u0131r\u0131ld\u0131. Yeni bir ad koy.")}\
</span>
            <button class="dugme altin kucuk-d" type="button" id="medya-gazete-ad">${\u00E7("Yeni ad koy")}</button></div>`:""}
          ${m.newspaper?`<p class="kucuk">${\u00E7("{n} abone \xB7 {m} makale",{n:Number(m.newspaper.subscribers??0),m:Number(m.newspaper.articles_count??0)})}</p>
            <div class="yigin" style="margin-top:8px">${(m.newspaper.articles??[]).map(a=>`<div class="ilk-adim"><span class="ozet-ikon" style="background:var(--kagit-3)">${ikon("newspaper")}</span>
              <span><b>${esc(a.title)}</b><span class="kucuk">${esc(zamanOnce(a.created_at))} \xB7 ${\u00E7("{n} destek",{n:Number(a.endorsements??0)})} \xB7 ${ikon("eye")} ${sayi(a.views??0)}${a.hidden?
" \xB7 "+\u00E7("gizlendi"):""}${a.ad?` \xB7 <span class="etiket-vurgu">${esc(isbirligiEtiketi(a.ad.tag))}</span>`:""}</span></span>
              <button class="dugme sade kucuk-d" data-makale-ac="${esc(a.article_id)}">${\u00E7("A\xE7")}</button></div>`).join("")||`<p class="bos">${\u00E7("\u0130lk makaleni yaz: gazeten \xFClkenin ak\u0131\u015F\u0131nd\
a g\xF6r\xFCn\xFCr.")}</p>`}</div>`:v.kariyer?.newspaper?`<p class="bos">${\u00E7("{gazete} ekibindesin; kendi gazeteni kurmak i\xE7in \xF6nce ekipten ayr\u0131l (yukar\u0131da).",{gazete:esc(v.kariyer.
newspaper.name)})}</p>`:`<p class="bos">${\u00E7("Gazete kurmak \xFCcretsiz; hesab\u0131n birka\xE7 g\xFCnl\xFCk olmal\u0131. Uzun yaz\u0131, oyunun olaylar\u0131na ba\u011Fl\u0131 haber, abonelik; i\u015Fletmeler gazetene ilan verir. Bir gazeteni\
n ekibine \xE7a\u011Fr\u0131l\u0131rsan muhabir ya da edit\xF6r olarak da yazabilirsin.")}</p>`}
          <div class="satir" style="margin-top:10px;flex-wrap:wrap;gap:8px"><button class="dugme ikincil kucuk-d" type="button" id="medya-matbaa">${ikon("newspaper")}${\u00E7("Matbaaya git")}</button>\

            <span class="kucuk">${\u00E7("\xDClkenin gazeteleri \u015Fehrin matbaas\u0131nda bas\u0131l\u0131r: man\u015Fetler, yazarlar ve sabah b\xFClteni.")}</span></div>
        </section>
        ${ImzaGunu.yer("medya")}
        ${v.sirketler.length?`<section class="kart" id="medya-isletme">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u0130\u015Fletmelerin")}</p><h2 class="b2">${\u00E7("Tan\u0131t\u0131m ver")}</h2></div><span class="ik-kutu">${ikon("factory")}</sp\
an></div>
          ${v.sirketler.map(c=>`<div class="medya-isletme" data-sirket="${esc(c.company_id)}">
            <div class="satir" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><b>${esc(c.company)}</b><span class="kucuk">${\u00E7("Kasa: {kr} kredi harcanabilir",{kr:kr(
c.spendable_cr??0)})}</span>
              <button class="dugme kucuk-d" data-teklif-ver="${esc(c.company_id)}">${ikon("megaphone")}${\u00E7("Tan\u0131t\u0131m teklifi ver")}</button></div>
            <div class="yigin" style="margin-top:8px">${(c.offers??[]).map(o=>teklifSatiri(o,{isletme:!0})).join("")||`<p class="kucuk">${\u00E7("Hen\xFCz tan\u0131t\u0131m vermedin.")}</p>`}</div>
          </div>`).join("")}
        </section>`:""}
        <p class="kucuk" style="margin-top:12px">${\u00E7("Kurallar: g\xFCnde en \xE7ok {k} Kare, iki Kare aras\u0131nda {d} dakika; sponsorluk g\xFCnde en \xE7ok {n} i\xE7erik ve {kr} kredi; kendi i\u015Fletmen seni sponsorl\
ayamaz; siyasi reklam yok.",{k:Number(v.kurallar.data.media?.photo?.perDay??10),d:Number(v.kurallar.data.media?.photo?.minIntervalMin??2),n:Number(s.perDayPerCreator??2),kr:kr(s.dailyIncomeCapCr??0)})}\
</p>
      </div>`,bagla(),geriDurdur(),geriDurdur=geriSay(kap,()=>tazele())}function bagla(){const m=v.m;$("#medya-kare",kap).onclick=()=>kareStudyo({sonra:tazele}),$("#medya-album",kap).onclick=()=>Kabuk.
git("hayat/kare-album"),$("#medya-kartpostal",kap).onclick=()=>Kabuk.git("hayat/kartpostal"),$("#medya-makale",kap)?.addEventListener("click",()=>makaleYaz({ilanlar:(m.offers?.accepted??[]).filter(o=>o.
kind==="ad"),sonra:tazele})),$("#medya-vaat",kap)?.addEventListener("click",()=>vaatYaz({sonra:tazele})),$("#medya-matbaa",kap)?.addEventListener("click",()=>Kabuk.git("sehir/matbaa")),$("#medya-gazet\
e-kur",kap)?.addEventListener("click",()=>gazeteKur(tazele)),$("#medya-gazete-ad",kap)?.addEventListener("click",()=>gazeteAdiYenile(m.newspaper,tazele)),$("#medya-akis",kap).onclick=()=>Kabuk.git("me\
ydan/akis"),kareKartlariBagla(kap,kareler,tazele),kanalBagla(kap,m,tazele,v.kariyer),gazeteciBagla(kap,v.kariyer,tazele),ImzaGunu.bagla(kap,"medya",tazele);for(const b of $$("[data-makale-ac]",kap))b.
onclick=()=>makaleAc(b.dataset.makaleAc,tazele);for(const b of $$("[data-teklif-kabul]",kap))b.onclick=async()=>{const o=(m.offers?.open??[]).find(x=>x.offer_id===b.dataset.teklifKabul);pencere({ust:\u00E7(
"Sponsorluk"),baslik:\u00E7("Teklifi kabul et"),govde:`<p class="aciklama">${\u00E7("{isletme}: {urun}, {kr} kredi b\xFCt\xE7e, {g} g\xFCn tan\u0131t\u0131m. Kabul edince {s} saat i\xE7inde yay\u0131mlaman gerekir; aksi h\xE2lde t\
eklif d\xFC\u015Fer. Yay\u0131nda b\xFCt\xE7eden \xFClkenin sat\u0131\u015F vergisi ve %{p} platform pay\u0131 d\xFC\u015Fer, kalan\u0131 sana ge\xE7er.",{isletme:esc(o?.company??""),urun:esc(varlikAdi(
o?.asset)),kr:kr(o?.budget_cr??0),g:Number(o?.days??0),s:Number(v.kurallar.data.media?.sponsorship?.publishH??48),p:Number(v.kurallar.data.media?.sponsorship?.platformFeePpm??3e4)/1e4})}</p>`,dugmeler:[
{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Kabul et"),sinif:"altin",ikon:"check",is:async()=>{try{await Sunucu.yap("sponsorship_accept",{p_offer:b.dataset.teklifKabul}),tost(\u00E7("Teklif kabul edildi; \u015Fim\
di yay\u0131mla."),"megaphone")}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}}]})};for(const b of $$("[data-teklif-yayimla]",kap))b.onclick=()=>{const o=(m.offers?.accepted??[]).find(x=>x.
offer_id===b.dataset.teklifYayimla);o&&(o.kind==="ad"?makaleYaz({ilan:o,sonra:tazele}):kareStudyo({sponsorluk:o,sonra:tazele}))};for(const b of $$("[data-teklif-video]",kap))b.onclick=()=>{const o=(m.
offers?.accepted??[]).find(x=>x.offer_id===b.dataset.teklifVideo),acik=m.channel?.open_session;acik&&Date.parse(acik.ends_at)<=Date.now()?videoKurgula(acik,{sponsorluklar:[o].filter(Boolean),sonra:tazele}):
acik?tost(\u00E7('\xC7ekim ve kurgu s\xFCr\xFCyor; bitince "Kurgula ve yay\u0131mla" ile sponsorlu\u011Fu se\xE7ersin.'),"hourglass"):videoCek({sonra:tazele})};for(const b of $$("[data-teklif-ver]",kap))
b.onclick=()=>{const c=v.sirketler.find(x=>x.company_id===b.dataset.teklifVer);teklifVer({company_id:c.company_id,name:c.company},c.rule??v.kurallar.data.media?.sponsorship,tazele)};for(const b of $$(
"[data-teklif-iptal]",kap))b.onclick=async()=>{try{await Sunucu.yap("sponsorship_offer_cancel",{p_offer:b.dataset.teklifIptal}),tost(\u00E7("Teklif geri \xE7ekildi; b\xFCt\xE7e kasaya d\xF6nd\xFC."),"\
undo-2")}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()};for(const b of $$("[data-teklif-icerik]",kap))b.onclick=()=>{const[tur,id]=b.dataset.teklifIcerik.split(":");tur==="article"?makaleAc(
id,tazele):tur==="video"?videoAc(id,tazele):kareAc(id,tazele)}}const tazele=tazeleyici(async()=>{await yukle(),ciz()});await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{(/^media\./.test(olay)||
olay==="news.article_published")&&tazele()}),b2=Durum.dinle("ulke-olay",({olay})=>{(olay==="media.offer_opened"||olay==="media.stream_started"||olay==="media.stream_ended")&&tazele()});return()=>{b1(),
b2(),geriDurdur()}}}),Parcalar.tamam("ek_98j_medya");
