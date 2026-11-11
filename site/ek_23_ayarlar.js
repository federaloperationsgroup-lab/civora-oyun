// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_23_ayarlar.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/ayarlar",{async ac(kap){const[liste,silme,dog,guven]=await Promise.all([Sunucu.cagir("my_feedback").catch(()=>null),Sunucu.cagir("account_deletion_status").catch(()=>null),Sunucu.cagir(
"verification_status").catch(()=>null),Sunucu.cagir("trust_status").catch(()=>null)]),email=Sunucu.Giris.kullanici?.email??"",misafir=Sunucu.Giris.misafirMi,gbler=Array.isArray(liste)?liste:liste?.items??
[],bekleyenSilme=silme?.status==="pending",baslangicKarti=()=>{const o=Durum.v.ozet?.onboarding;if(!o||typeof Rehber!="object")return"";const rol=o.role?Rehber.ROL[o.role]:null;return`<section class="\
kart" id="baslangic-kart">
            <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ba\u015Flang\u0131\xE7")}</p><h2 class="b2">${\u00E7("Oyun yolu ve rehber")}</h2></div><span class="ik-kutu">${ikon("signpost")}</s\
pan></div>
            <div class="satir" style="justify-content:space-between;flex-wrap:wrap;gap:8px">
              <span><b>${\u00E7("Oyun yolun")}</b><br><span class="kucuk">${rol?esc(rol.ad)+" \xB7 "+esc(rol.ne):\u00E7("Se\xE7ilmedi: g\xF6revler kar\u0131\u015F\u0131k gelir.")}</span></span>
              <button class="dugme ikincil kucuk-d" type="button" id="rol-degistir">${ikon("signpost")}${rol?\u00E7("De\u011Fi\u015Ftir"):\u00E7("Se\xE7")}</button>
            </div>
            <hr class="ayrac">
            <label class="radyo"><input type="checkbox" id="rehber-ayar" ${o.guided?"checked":""} ${o.age_days>=o.guided_days?"disabled":""}>
              <span><b>${\u00E7("Rehberli ba\u015Flang\u0131\xE7")}</b><span class="kucuk">${o.age_days>=o.guided_days?\u00E7("Bitti: hesab\u0131n {n} g\xFCnl\xFCk, b\xFCt\xFCn sistemler a\xE7\u0131k.",
{n:Number(o.age_days)}):o.guided?\u00E7("A\xE7\u0131k: sava\u015F, parti, i\u015Fletme, g\xF6lge, kul\xFCp ve m\xFCzik grubu g\xFCnler ilerledik\xE7e ya da ad\u0131mlarla a\xE7\u0131l\u0131r; {n} g\xFCn sonra kendili\u011Finden biter. Kapat\u0131rsan hepsi hemen a\
\xE7\u0131l\u0131r.",{n:Number(o.guided_days)}):\u00E7("Kapal\u0131: b\xFCt\xFCn sistemler a\xE7\u0131k. A\xE7arsan kilitler yeniden gelir (ilk {n} g\xFCn).",{n:Number(o.guided_days)})}</span></span><\
/label>
            <label class="radyo" style="margin-top:10px"><input type="checkbox" id="rehberlik-ayar" ${o.guide?"checked":""} ${o.can_guide?"":"disabled"}>
              <span><b>${\u00E7("Rehber olmak istiyorum")}</b><span class="kucuk">${o.can_guide?\u00E7("Yeni gelenler kanal\u0131n\u0131 g\xF6r\xFCr, sorular\u0131 yan\u0131tlars\u0131n (Konu\u015Fma d\xFC\u011Fmesi). Mesajlar\u0131nda rehber i\u015Faret\
i \xE7\u0131kar."):\u00E7("Hesab\u0131n en az bir haftal\u0131k olunca a\xE7\u0131l\u0131r; o zamana dek Yeni gelenler kanal\u0131 senin de sorular\u0131n\u0131 bekler.")}</span></span></label>
          </section>`},baslangicBagla=()=>{const k=$("#baslangic-kart",kap);k&&($("#rol-degistir",k).onclick=()=>Rehber.rolSec(),$("#rehber-ayar",k).addEventListener("change",async e=>{try{await Rehber.
ayarla({p_guided:e.target.checked}),tost(e.target.checked?\u00E7("Rehberli ba\u015Flang\u0131\xE7 a\xE7\u0131k."):\u00E7("Rehberli ba\u015Flang\u0131\xE7 kapand\u0131; b\xFCt\xFCn sistemler a\xE7\u0131k."),
"lock-open")}catch(err){e.target.checked=!e.target.checked,tost(hataMetni(err),"circle-alert")}}),$("#rehberlik-ayar",k).addEventListener("change",async e=>{try{await Rehber.ayarla({p_guide:e.target.checked}),
tost(e.target.checked?\u00E7("Rehbersin: Yeni gelenler kanal\u0131 Konu\u015Fma d\xFC\u011Fmesinde."):\u00E7("Rehberlik kapand\u0131."),"hand-helping")}catch(err){e.target.checked=!e.target.checked,tost(
hataMetni(err),"circle-alert")}}))},KAPI_AD={mayor:\u00E7("belediye ba\u015Fkanl\u0131\u011F\u0131"),governor:\u00E7("valilik"),autonomy:\u00E7("\xF6zerklik ve ba\u011F\u0131ms\u0131zl\u0131k"),petition:\u00E7(
"imza kampanyalar\u0131"),resistance:\u00E7("direni\u015F"),federation:\u00E7("futbol federasyonu")},telefonKarti=d=>{const ekler=(d.gates??[]).filter(g=>KAPI_AD[g]).map(g=>KAPI_AD[g]);return(d.gates??
[]).includes("transfer")&&d.big_transfer_cr&&ekler.push(\u00E7("ba\u015Fka oyunculara bir seferde {n} kredi ve \xFCst\xFC aktar\u0131m",{n:kr(d.big_transfer_cr)})),`<section class="kart" id="telefon-d\
ogrulama" data-telefon="${d.phone_verified?"dogrulandi":d.phone_required?"gerekli":"kapali"}">
            <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("G\xFCvenlik")}</p><h2 class="b2">${\u00E7("Telefon do\u011Frulamas\u0131")}</h2></div><span class="ik-kutu">${ikon(d.phone_verified?
"badge-check":"id-card")}</span></div>
            ${d.phone_verified?`<div class="bilgi-kutusu">${ikon("badge-check")}<span>${\u00E7("Telefonun do\u011Fruland\u0131 ({zaman}).",{zaman:esc(saatYaz(d.phone_verified_at))})}</span></div>`:d.phone_required?
`<div class="hata-kutusu">${ikon("circle-alert")}<span>${ekler.length?esc(\u00E7("Oy vermek, aday olmak ve parti kurmak i\xE7in telefon do\u011Frulamas\u0131 gerekir; ayr\u0131ca: {liste}.",{liste:ekler.
join(", ")})):\u00E7("Oy vermek, aday olmak ve parti kurmak i\xE7in telefon do\u011Frulamas\u0131 gerekir.")}</span></div>`:`<p class="aciklama">${\u00E7("\u015Eu an gerekmiyor. Bir ki\u015Finin \xE7ok hesapla oy \
kullanmas\u0131n\u0131 \xF6nlemek i\xE7in ileride oy vermek, aday olmak ve parti kurmak telefon do\u011Frulamas\u0131 isteyebilir; o zaman burada duyurulur.")}</p>`}
            ${d.phone_in_use?`<div class="hata-kutusu" style="margin-top:8px">${ikon("circle-alert")}<span>${\u00E7("Bu numara ba\u015Fka bir hesapta do\u011Frulanm\u0131\u015F. Her numara tek hesapta kullan\u0131l\u0131r; ba\u015Fka b\
ir numara dene.")}</span></div>`:""}
            ${!d.phone_verified&&d.phone_required?`<form class="form" id="telefon-form" novalidate style="margin-top:10px">
              <label class="alan"><span>${\u00E7("Telefon numaran")}</span><input name="telefon" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="${\u00E7("\xF6r. +90 555 123 45 \
67")}" required>
                <small>${\u00E7("\xDClke koduyla yaz (+90 \u2026). SMS ile bir kod gelir. Numaran oyunun kay\u0131tlar\u0131na yaz\u0131lmaz; bir numaraya bir hesap i\xE7in yaln\u0131z tek y\xF6nl\xFC \xF6zeti tutulur.")}\
</small></label>
              <div class="form-mesaj"></div>
              <button class="dugme altin" type="submit">${ikon("send")}${\u00E7("Kod g\xF6nder")}</button>
            </form>
            <form class="form" id="telefon-kod-form" novalidate hidden style="margin-top:10px">
              <label class="alan"><span>${\u00E7("SMS ile gelen kod")}</span><input name="kod" inputmode="numeric" autocomplete="one-time-code" maxlength="10" required></label>
              <div class="form-mesaj"></div>
              <div class="satir" style="flex-wrap:wrap"><button class="dugme altin" type="submit">${ikon("badge-check")}${\u00E7("Do\u011Frula")}</button>
                <button class="dugme sade" type="button" id="telefon-geri">${\u00E7("Numaray\u0131 de\u011Fi\u015Ftir")}</button></div>
            </form>`:""}
            ${d.starter_pending?`<p class="kucuk" style="margin-top:8px">${\u00E7("Ba\u015Flang\u0131\xE7 deste\u011Fin telefonunu do\u011Frulay\u0131nca verilir.")}</p>`:""}
            ${d.starter_used&&!d.starter_granted?`<p class="kucuk" style="margin-top:8px">${\u00E7("Bu numarayla daha \xF6nce ba\u015Flang\u0131\xE7 deste\u011Fi al\u0131nd\u0131; yeniden verilmez.")}\
</p>`:""}
          </section>`},yeniHesapKarti=g=>g?.young?`<section class="kart" id="yeni-hesap-kart">
            <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("G\xFCvenlik")}</p><h2 class="b2">${\u00E7("Yeni hesap s\u0131n\u0131r\u0131")}</h2></div><span class="ik-kutu">${ikon("shield-check")}\
</span></div>
            <p class="aciklama">${esc(\u00E7("\u0130lk {n} g\xFCn ba\u015Fka oyunculara (pazardan al\u0131\u015F, bilet, ba\u011F\u0131\u015F, hediye) kazand\u0131\u011F\u0131n kadar ve {pay} kredi daha g\xF6nderebilirsin. Ba\u015Flang\u0131\xE7 deste\u011Fi ki\u015Fisel i\u015Flerin\
e (yolculuk, e\u011Fitim, bedeller) serbest. Bu, bir ki\u015Finin \xE7ok hesap a\xE7\u0131p deste\u011Fi tek hesaba toplamas\u0131n\u0131 \xF6nler.",{n:Number(g.days),pay:kr(g.allowance_cr)}))}</p>
            <div class="satir" style="justify-content:space-between;flex-wrap:wrap;gap:8px;margin-top:8px" id="yeni-hesap-sayilar">
              <span><b>${\u00E7("\u015Eu an g\xF6nderebilece\u011Fin")}</b><br><span class="b2" data-kalan>${esc(kr(g.room_cr))} ${\u00E7("kredi")}</span></span>
              <span class="kucuk">${esc(\u00E7("Kazand\u0131\u011F\u0131n {k} \xB7 g\xF6nderdi\u011Fin {g} kredi",{k:kr(g.earned_cr),g:kr(g.sent_cr)}))}<br>${esc(\u00E7("{zaman} tarihinde s\u0131n\u0131r kalkar\
.",{zaman:saatYaz(g.young_until)}))}</span>
            </div>
          </section>`:"";kap.innerHTML=`<div class="sayfa sayfa-dar">
      <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Ayarlar")}</p><h1 class="b1">${\u00E7("Hesab\u0131n ve geri bildirim")}</h1></div></div>
      <div class="izgara iki">
        <section class="kart">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Geri bildirim")}</p><h2 class="b2">${\u00E7("Bir \u015Fey mi bozuk, s\u0131k\u0131c\u0131 m\u0131, eksik mi?")}</h2></div><span class\
="ik-kutu">${ikon("megaphone")}</span></div>
          <form class="form" id="gb-form" novalidate>
            <label class="alan"><span>${\u00E7("Konu")}</span><select name="tur">${Object.entries(GB_TUR).map(([k,v])=>`<option value="${k}">${v}</option>`).join("")}</select></label>
            <label class="alan"><span>${\u00E7("Ne oldu?")}</span><textarea name="metin" minlength="10" maxlength="2000" required placeholder="${\u00E7("Ne yap\u0131yordun, ne bekliyordun, ne oldu?")}\
"></textarea>
              <small>${\u00E7("10\u20132.000 karakter. Ekran ve uygulama s\xFCr\xFCm\xFC de eklenir; ba\u015Fka bilgi g\xF6nderilmez.")}</small></label>
            <div class="form-mesaj"></div>
            <button class="dugme altin" type="submit">${ikon("send")}${\u00E7("G\xF6nder")}</button>
          </form>
          ${gbler.length?`<hr class="ayrac"><div class="ayar-listesi">${gbler.slice(0,10).map(g=>`<div class="geri-bildirim-satir">
            <b>${esc(GB_TUR[g.kind]??g.kind)}</b> \xB7 ${esc(new Date(g.created_at).toLocaleString(DIL.yerel))} \xB7 ${esc(g.status==="closed"?\u00E7("kapand\u0131"):g.status==="seen"?\u00E7("g\xF6r\xFCld\xFC"):
\u00E7("yeni"))}
            <span class="kucuk">${esc(String(g.body??"").slice(0,160))}</span>
            ${g.reply?`<span class="kucuk"><b>${\u00E7("Yan\u0131t:")}</b> ${esc(g.reply)}</span>`:""}</div>`).join("")}</div>`:""}
        </section>
        <div class="yigin">
          <section class="kart">
            <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Hesap")}</p><h2 class="b2">${esc(email||(misafir?\u00E7("Misafir hesab\u0131"):\u00E7("Giri\u015F yap\u0131ld\u0131")))}</h2></div>\
<span class="ik-kutu">${ikon("user-round")}</span></div>
            ${misafir?`<div class="bilgi-kutusu" id="misafir-notu" style="margin-bottom:12px">${ikon("footprints")}<span>${\u00E7("Misafir hesab\u0131 ge\xE7icidir: ilerlemen yaln\u0131z bu taray\u0131c\u0131da kal\u0131r; \xE7\u0131k\u0131\u015F\
 yaparsan ya da taray\u0131c\u0131 verisi silinirse geri d\xF6nemezsin. E-posta ve parola ekleyince hesab\u0131n kal\u0131c\u0131 olur, her cihazdan girersin.")}</span></div>
            <form class="form" id="kalici-form" novalidate>
              <label class="alan"><span>${\u00E7("E-posta")}</span><input type="email" name="email" autocomplete="email" inputmode="email" required></label>
              <label class="alan"><span>${\u00E7("Parola")}</span><input type="password" name="parola" autocomplete="new-password" minlength="8" required><small>${\u00E7("En az 8 karakter.")}</small><\
/label>
              <div class="form-mesaj"></div>
              <button class="dugme altin" type="submit">${ikon("badge-check")}${\u00E7("Hesab\u0131 kal\u0131c\u0131 yap")}</button>
            </form>`:`<form class="form" id="parola-form" novalidate>
              <label class="alan"><span>${\u00E7("Yeni parola")}</span><input type="password" name="parola" autocomplete="new-password" minlength="8"><small>${\u00E7("En az 8 karakter.")}</small></lab\
el>
              <div class="form-mesaj"></div>
              <button class="dugme ikincil" type="submit">${ikon("lock")}${\u00E7("Parolay\u0131 de\u011Fi\u015Ftir")}</button>
            </form>`}
            <hr class="ayrac">
            <div class="satir" style="flex-wrap:wrap">
              <button class="dugme ikincil" id="veri-indir">${ikon("package")}${\u00E7("Verilerimi indir")}</button>
              <button class="dugme sade" id="cikis">${ikon("door-open")}${\u00E7("\xC7\u0131k\u0131\u015F yap")}</button>
            </div>
          </section>
          ${dog?telefonKarti(dog):""}
          ${yeniHesapKarti(guven)}
          <section class="kart" id="topluluk-kart">
            <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Topluluk")}</p><h2 class="b2">${\u00E7("Kurallar ve moderasyon")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></di\
v>
            <p class="aciklama">${Durum.v.ozet?.character?.terms_accepted?\u00E7("Topluluk kurallar\u0131n\u0131n {n}. s\xFCr\xFCm\xFCn\xFC kabul ettin.",{n:Number(Durum.v.ozet?.character?.community_rules_version??
1)}):\u00E7("Sohbet, payla\u015F\u0131m ve yorum i\xE7in topluluk kurallar\u0131n\u0131 kabul etmelisin.")}</p>
            <div class="satir" style="flex-wrap:wrap">
              <button class="dugme ikincil" type="button" id="topluluk-kurallar">${ikon("scroll-text")}${\u00E7("Topluluk kurallar\u0131")}</button>
              <button class="dugme sade" type="button" id="moderasyon-kayitlarim">${ikon("gavel")}${\u00E7("Moderasyon kay\u0131tlar\u0131m")}</button>
            </div>
          </section>
          ${baslangicKarti()}
          <section class="kart">
            <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Dil")}</p><h2 class="b2">${\u00E7("Oyunun dili")}</h2></div><span class="ik-kutu">${ikon("globe")}</span></div>
            <div class="radyo-liste" id="dil-secim">${[["tr","T\xFCrk\xE7e"],["en","English"]].map(([k,ad])=>`<label class="radyo"><input type="radio" name="dil" value="${k}"
              ${DIL.kod===k?"checked":""}><span><b lang="${k}">${ad}</b></span></label>`).join("")}</div>
          </section>
          <section class="kart">
            <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("ekran::G\xF6r\xFCn\xFCm")}</p><h2 class="b2">${\u00E7("Harita ve 3B")}</h2></div><span class="ik-kutu">${ikon("layers")}</span></di\
v>
            <div class="radyo-liste" id="gorunum-secim">${[["oto",\u00E7("Otomatik"),\u00E7("Telefonuna g\xF6re se\xE7ilir; telefon zorlan\u0131rsa hafif g\xF6r\xFCn\xFCme ge\xE7er.")],["3b",\u00E7("3\
B"),\u00E7("Her zaman 3B. Pili daha \xE7ok harcar.")],["2b",\u00E7("Hafif (2B)"),\u00E7("D\xFCz harita; en az pil. Oyunun her i\u015Fi aynen oynan\u0131r.")]].map(([k,ad,a])=>`<label class="radyo"><in\
put type="radio" name="gorunum" value="${k}" ${Gorunum.secim===k?"checked":""}>
              <span><b>${ad}</b><span class="kucuk">${a}</span></span></label>`).join("")}</div>
            ${Gorunum.webglVar()?"":`<p class="kucuk" style="margin-top:8px">${\u00E7("Bu cihazda 3B \xE7izim a\xE7\u0131lam\u0131yor; hafif g\xF6r\xFCn\xFCm kullan\u0131l\u0131r.")}</p>`}
            <label class="radyo" style="margin-top:10px"><input type="checkbox" id="toren-ayar" ${Toren.acik()?"checked":""}>
              <span><b>${\u00E7("T\xF6renler")}</b><span class="kucuk">${\u00E7("Seviye ya da r\xFCtbe atlay\u0131nca, ba\u015Fkan ya da milletvekili olunca k\u0131sa t\xF6ren; oy verince zarf\u0131n sand\u0131\u011Fa d\xFC\u015F\xFC\u015F\xFC; \xFClken bir \
sava\u015F\u0131 kazan\u0131nca zafer ge\xE7idi, kaybedince anma.")}</span></span></label>
          </section>
          <div id="tatil-yer"></div>
          <div id="bildirim-yer"></div>
          <section class="kart">
            <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ses")}</p><h2 class="b2">${\u00E7("Efekt ve ortam sesleri")}</h2></div><span class="ik-kutu">${ikon("volume-2")}</span></div>
            <div class="radyo-liste" id="ses-secim">${[["kapali",\u00E7("Kapal\u0131"),\u00E7("Dokunu\u015F ve bildirim sesi \xE7almaz.")],["kisik",\u00E7("K\u0131s\u0131k"),\u00E7("Hafif dokunu\u015F ve b\
ildirim sesleri.")],["acik",\u00E7("A\xE7\u0131k"),\u00E7("Ayn\u0131 sesler, daha duyulur.")]].map(([k,ad,a])=>`<label class="radyo"><input type="radio" name="ses" value="${k}" ${Ses.secim===k?"checke\
d":""}>
              <span><b>${ad}</b><span class="kucuk">${a}</span></span></label>`).join("")}</div>
            <p class="ust-yazi" style="margin-top:12px">${\u00E7("Ortam sesi")}</p>
            <div class="radyo-liste" id="ortam-secim">${[["kapali",\u00E7("Kapal\u0131")],["kisik",\u00E7("K\u0131s\u0131k")],["acik",\u00E7("A\xE7\u0131k")]].map(([k,ad])=>`<label class="radyo"><inpu\
t type="radio" name="ortam" value="${k}" ${Ses.ortamSecim===k?"checked":""}><span><b>${ad}</b></span></label>`).join("")}</div>
            <p class="kucuk" style="margin-top:8px">${\u00E7("Efekt sesi (dokunu\u015F, bildirim) ve ortam sesi (\u015Fehir, meydan, trib\xFCn u\u011Fultusu) ayr\u0131 ayarlan\u0131r. Sesler cihazda \xFCretilir, dosya indirilmez; m\
\xFCzik yok. Telefonun sessiz modu her zaman \xF6nde.")}</p>
          </section>
          <section class="kart">
            <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Hesab\u0131 sil")}</p><h2 class="b2">${\u00E7("Kal\u0131c\u0131 silme")}</h2></div><span class="ik-kutu">${ikon("circle-alert")}</s\
pan></div>
            ${misafir?`<p class="aciklama">${\u00E7("Misafir hesab\u0131 i\xE7in silme talebi gerekmez: \xE7\u0131k\u0131\u015F yap\u0131nca bir daha girilemez ve hesap sonra silinir. Kal\u0131c\u0131 yaparsan ola\u011Fan silme kurallar\u0131 ge\xE7er.")}\
</p>`:bekleyenSilme?`<div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("Hesap silme talebin var. Bekleme s\xFCresi bitince hesab\u0131n silinecek.")}</span></div>
              <button class="dugme ikincil" id="silme-vazgec" style="margin-top:12px">${\u00E7("Vazge\xE7")}</button>`:`<p class="aciklama">${\u00E7("Silme talebinden sonra {n} saat beklenir; bu s\xFCred\
e vazge\xE7ebilirsin. G\xFCvenlik i\xE7in son 10 dakika i\xE7inde giri\u015F yapm\u0131\u015F olmal\u0131s\u0131n.",{n:72})}</p>
              <button class="dugme mercan" id="silme-baslat" style="margin-top:12px">${\u00E7("Hesab\u0131m\u0131 silmek istiyorum")}</button>`}
          </section>
          <p class="kucuk">${\u00E7("Civora pilot s\xFCr\xFCm\xFC")} \xB7 ${esc(SURUM)} \xB7 <a href="gizlilik.html">${\u00E7("Gizlilik ve oyun kurallar\u0131")}</a></p>
        </div>
      </div></div>`,baslangicBagla();let telefon="";const telHata=(f,m)=>{$(".form-mesaj",f).innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(m)}</span></div>`},telMetni=err=>({validation_failed:\u00E7(
"Numaray\u0131 \xFClke koduyla yaz (\xF6r. +90 555 123 45 67)."),otp_expired:\u00E7("Kod yanl\u0131\u015F ya da s\xFCresi dolmu\u015F; yeni kod iste."),phone_exists:\u00E7("Bu numara ba\u015Fka bir hesapta\
 kay\u0131tl\u0131."),sms_send_failed:\u00E7("SMS g\xF6nderilemedi; biraz sonra yeniden dene."),phone_provider_disabled:\u00E7("Telefon do\u011Frulamas\u0131 \u015Fu an a\xE7\u0131k de\u011Fil."),over_sms_send_rate_limit:\u00E7(
"\xC7ok s\u0131k kod istendi; biraz bekleyip yeniden dene.")})[err?.kod]??hataMetni(err);$("#telefon-form",kap)?.addEventListener("submit",async e=>{e.preventDefault();const f=e.target,d=$("button[typ\
e=submit]",f),t=String(new FormData(f).get("telefon")??"").replace(/[\s()-]/g,"");if(!/^\+[1-9][0-9]{7,14}$/.test(t)){telHata(f,\u00E7("Numaray\u0131 \xFClke koduyla yaz (\xF6r. +90 555 123 45 67).")),
formSerbest(f);return}d.disabled=!0;try{await Sunucu.Giris.telefonKodu(t),telefon=t,f.hidden=!0;const k=$("#telefon-kod-form",kap);k.hidden=!1,$(".form-mesaj",k).innerHTML=`<div class="bilgi-kutusu">${ikon(
"send")}<span>${esc(\u00E7("{tel} numaras\u0131na kod g\xF6nderildi.",{tel:t}))}</span></div>`,$("input[name=kod]",k).focus()}catch(err){telHata(f,telMetni(err))}finally{d.disabled=!1,formSerbest(f)}}),
$("#telefon-kod-form",kap)?.addEventListener("submit",async e=>{e.preventDefault();const f=e.target,d=$("button[type=submit]",f),kod=String(new FormData(f).get("kod")??"").replace(/\s/g,"");if(!/^[0-9]{4,10}$/.
test(kod)){telHata(f,\u00E7("Kodu SMS'te geldi\u011Fi gibi yaz.")),formSerbest(f);return}d.disabled=!0;try{await Sunucu.Giris.telefonDogrula(telefon,kod);const yeni=await Sunucu.cagir("verification_st\
atus");if(yeni?.phone_in_use){telHata(f,\u00E7("Bu numara ba\u015Fka bir hesapta do\u011Frulanm\u0131\u015F. Her numara tek hesapta kullan\u0131l\u0131r; ba\u015Fka bir numara dene."));return}tost(yeni?.
starter_granted&&!dog?.starter_granted?\u00E7("Telefonun do\u011Fruland\u0131; ba\u015Flang\u0131\xE7 deste\u011Fin verildi."):\u00E7("Telefonun do\u011Fruland\u0131."),"badge-check"),await Durum.ozet().
catch(()=>{}),Kabuk.git("hayat/ayarlar",{gecmis:!1})}catch(err){telHata(f,telMetni(err))}finally{d.disabled=!1,formSerbest(f)}}),$("#telefon-geri",kap)?.addEventListener("click",()=>{$("#telefon-kod-f\
orm",kap).hidden=!0,$("#telefon-form",kap).hidden=!1}),$("#topluluk-kurallar",kap).onclick=()=>toplulukKurallari({kabul:!Durum.v.ozet?.character?.terms_accepted}),$("#moderasyon-kayitlarim",kap).onclick=
()=>yaptirimlarimAc(),$("#dil-secim",kap).addEventListener("change",async e=>{await Promise.all([Sunucu.cagir("locale_set",{p_locale:e.target.value}).catch(()=>{}),Sunucu.Giris.dilYaz(e.target.value)]),
DIL.ayarla(e.target.value)}),$("#gorunum-secim",kap).addEventListener("change",e=>{Gorunum.ayarla(e.target.value),tost(\u00E7("G\xF6r\xFCn\xFCm kaydedildi."),"layers")}),$("#toren-ayar",kap).addEventListener(
"change",e=>{Toren.ayarla(e.target.checked),tost(e.target.checked?\u00E7("T\xF6renler a\xE7\u0131k."):\u00E7("T\xF6renler kapal\u0131."),"party-popper")}),$("#ortam-secim",kap).addEventListener("chang\
e",e=>{Ses.ayarlaOrtam(e.target.value),tost(e.target.value==="kapali"?\u00E7("Ortam sesi kapal\u0131."):\u00E7("Ortam sesi kaydedildi."),"volume-2")}),typeof Sezon=="object"&&(Sezon.tatilKarti($("#tat\
il-yer",kap)),Sezon.bildirimKarti($("#bildirim-yer",kap))),$("#ses-secim",kap).addEventListener("change",e=>{Ses.ayarla(e.target.value),tost(e.target.value==="kapali"?\u00E7("Ses kapal\u0131."):\u00E7(
"Ses kaydedildi."),"volume-2"),e.target.value!=="kapali"&&Ses.bildir()}),$("#gb-form",kap).addEventListener("submit",async e=>{e.preventDefault();const v=new FormData(e.target),yer=$(".form-mesaj",e.target),
metin=String(v.get("metin")??"").trim();if(metin.length<10){yer.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("En az 10 karakter yaz.")}</span></div>`;return}try{await Sunucu.
yap("feedback_send",{p_kind:String(v.get("tur")),p_body:metin,p_context:{screen:(Kabuk.etkin??"hayat/ayarlar").slice(0,60),app_version:SURUM.slice(0,60),platform:(navigator.platform||"web").slice(0,60)}}),
tost(\u00E7("Geri bildirimin al\u0131nd\u0131. Te\u015Fekk\xFCrler!"),"badge-check"),Kabuk.git("hayat/ayarlar",{gecmis:!1})}catch(err){yer.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<s\
pan>${esc(hataMetni(err))}</span></div>`}}),$("#parola-form",kap)?.addEventListener("submit",async e=>{e.preventDefault();const p=String(new FormData(e.target).get("parola")??""),yer=$(".form-mesaj",e.
target);if(p.length<8){yer.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("Parola en az 8 karakter olmal\u0131.")}</span></div>`;return}try{await Sunucu.Giris.parolaDegistir(
p),tost(\u00E7("Parolan de\u011Fi\u015Ftirildi."),"lock"),e.target.reset()}catch(err){yer.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(err))}</span></div>`}}),$("#c\
ikis",kap).onclick=()=>{if(!Sunucu.Giris.misafirMi){Uygulama.cikis();return}pencere({ust:\u00E7("Misafir hesab\u0131"),baslik:\u00E7("\xC7\u0131k\u0131ls\u0131n m\u0131?"),govde:`<p class="aciklama">${esc(
\u00E7("Misafir hesab\u0131ndan \xE7\u0131karsan bu karaktere bir daha giremezsin. \xD6nce Ayarlar'dan e-posta ve parola ekleyerek hesab\u0131 kal\u0131c\u0131 yapabilirsin."))}</p>`,dugmeler:[{ad:\u00E7(
"Vazge\xE7")},{ad:\u00E7("Yine de \xE7\u0131k"),sinif:"mercan",ikon:"door-open",is:()=>Uygulama.cikis()}]})},$("#kalici-form",kap)?.addEventListener("submit",async e=>{e.preventDefault();const f=e.target,
v=new FormData(f),yer=$(".form-mesaj",f),d=$("button[type=submit]",f),ePosta=String(v.get("email")??"").trim(),p=String(v.get("parola")??"");if(!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(ePosta)){yer.innerHTML=
`<div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("E-posta adresini denetle.")}</span></div>`,formSerbest(f);return}if(p.length<8){yer.innerHTML=`<div class="hata-kutusu">${ikon("circle-\
alert")}<span>${\u00E7("Parola en az 8 karakter olmal\u0131.")}</span></div>`,formSerbest(f);return}d.disabled=!0;try{await Sunucu.Giris.kaliciYap(ePosta,p),yer.innerHTML=`<div class="bilgi-kutusu">${ikon(
"send")}<span>${esc(\u00E7("{email} adresine do\u011Frulama ba\u011Flant\u0131s\u0131 g\xF6nderildi. Ba\u011Flant\u0131ya t\u0131klay\u0131nca hesab\u0131n kal\u0131c\u0131 olur; sonra bu e-posta ve parolayla her cihazdan girebilirsin.",
{email:ePosta}))}</span></div>`,f.querySelectorAll("input").forEach(g=>{g.disabled=!0})}catch(err){yer.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(err))}</span></d\
iv>`,d.disabled=!1}finally{formSerbest(f)}}),$("#veri-indir",kap).onclick=async()=>{try{const v=await Sunucu.cagir("my_data_export"),url=URL.createObjectURL(new Blob([JSON.stringify(v,null,2)],{type:"\
application/json"})),a=document.createElement("a");a.href=url,a.download="civora-verilerim.json",a.click(),setTimeout(()=>URL.revokeObjectURL(url),5e3)}catch(err){tost(hataMetni(err),"circle-alert")}},
$("#silme-vazgec",kap)?.addEventListener("click",async()=>{try{await Sunucu.yap("account_deletion_cancel"),tost(\u00E7("Hesap silme talebin iptal edildi."),"check"),Kabuk.git("hayat/ayarlar",{gecmis:!1})}catch(err){
tost(hataMetni(err),"circle-alert")}}),$("#silme-baslat",kap)?.addEventListener("click",async()=>{let on;try{on=await Sunucu.cagir("account_deletion_preview")}catch(err){tost(hataMetni(err),"circle-al\
ert");return}const ad=Durum.v.ozet?.character?.name??"";let onay="";pencere({ust:\u00E7("Hesab\u0131 sil"),baslik:\u00E7("Emin misin?"),govde:`<p class="aciklama">${\u00E7("Karakterin, mesajlar\u0131n ve k\
i\u015Fisel verilerin silinir; ba\u015Fka oyuncular\u0131n haklar\u0131 korunur.")} ${on?.summary?esc(\u00E7v(on.summary)):""}</p>
          <label class="alan" style="margin-top:12px"><span>${\u00E7("Onay i\xE7in karakter ad\u0131n\u0131 yaz:")} <b>${esc(ad)}</b></span><input id="silme-onay" autocomplete="off"></label>`,dugmeler:[
{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Silme talebini g\xF6nder"),sinif:"mercan",is:async()=>{try{await Sunucu.yap("account_deletion_request",{p_confirm:onay}),tost(\u00E7("Silme talebin al\u0131nd\u0131."),
"circle-alert"),Kabuk.git("hayat/ayarlar",{gecmis:!1})}catch(err){if(err.kod==="REAUTH_REQUIRED"){tost(\u00E7("G\xFCvenlik i\xE7in \xE7\u0131k\u0131\u015F yap\u0131p yeniden giri\u015F yap, sonra tekrar dene."),
"lock");return}tost(hataMetni(err),"circle-alert")}}}]}),document.getElementById("silme-onay")?.addEventListener("input",e=>{onay=e.target.value})});const b1=Durum.dinle("ozet",()=>{const k=$("#baslan\
gic-kart",kap);k&&(k.outerHTML=baslangicKarti(),baslangicBagla())});return()=>b1()}}),Parcalar.tamam("ek_23_ayarlar");
