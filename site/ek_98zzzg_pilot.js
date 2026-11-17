// Civora istemcisi 2026-11-17-53cc619b-0b92b6e (ek_98zzzg_pilot.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/pilot",{async ac(kap){let p;try{p=await Sunucu.cagir("pilot_info")}catch(e){kap.innerHTML=`<div class="sayfa sayfa-dar"><div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(
hataMetni(e))}</span></div></div>`;return}const gunler=Number(p.days??14),gun=p.day==null?null:Number(p.day),TAKVIM={start:\u00E7("A\xE7\u0131l\u0131\u015F: kay\u0131t, karakter ve tatbikatla temel e\u011Fitim. \u0130ki \xFClke a\xE7\u0131l\u0131r; \
Kurucu Meclis'in takvimi ba\u015Flar."),economy:\u00E7("\xDCretim, i\u015F, pazar ve e\u011Fitim; parti kurma ve adayl\u0131k."),government:\u00E7("\u0130lk meclis ve ba\u015Fkan g\xF6reve ba\u015Flar; sava\u015F yetkisi oy\
lanabilir."),campaign:\u00E7("\u0130lk kampanya d\xF6rt saatlik takvimle: 24 saat haz\u0131rl\u0131k, sonra d\xF6rt saatte bir alt\u0131 tur."),evening:\u00E7("Ak\u015Fam takvimi ba\u015Flar: turlar savunan ba\u015F\
kentin saatiyle 20.00 ve 21.30'da, \xFC\xE7 ak\u015Fam."),campaigns:\u00E7("Sonraki kampanyalar ak\u015Fam takvimiyle."),report:\u00E7("Pilotun raporu, k\u0131sa anket ve karar.")},HER_GUN=[{ik:"light\
bulb",ad:\u00E7("Bug\xFCn ne yapmal\u0131y\u0131m?"),ne:\u00E7("Hayat\u0131m \u2192 Profil'deki kart sana s\u0131radakini s\xF6yler."),git:"hayat/profil"},{ik:"list-checks",ad:\u00E7("G\xFCn\xFCn g\xF6revleri"),
ne:\u00E7("G\xFCnde d\xF6rt g\xF6rev; tamamlay\u0131nca deneyim."),git:"hayat/gorevler"},{ik:"briefcase-business",ad:\u00E7("\xC7al\u0131\u015F ve pazara bak"),ne:\u00E7("\u015Eehrim \u2192 \xC7al\u0131\u015F: \xFCcret ve erza\
k; Pazar: al ve sat."),git:"sehir/is"},{ik:"vote",ad:\u00E7("\xDClkenin i\u015Fleri"),ne:\u00E7("Se\xE7im, meclis ve partiler; sava\u015F ak\u015Famlar\u0131nda cephe."),git:"ulke/ozet"},{ik:"message-\
circle",ad:\u00E7("Meydan ve sohbet"),ne:\u00E7("Test\xE7ilerle konu\u015F; sorunu ba\u015Fkas\u0131 da g\xF6rd\xFC m\xFC sor."),git:"meydan/akis"}],gunYazi=x=>x.from===x.to?\u00E7("{g}. g\xFCn",{g:x.
from}):\u00E7("{a}\u2013{b}. g\xFCnler",{a:x.from,b:x.to}),bugun=x=>gun!=null&&x.from<=gun&&gun<=x.to,durumYazi=p.pilot?gun==null?\u00E7("\xDClkenin a\xE7\u0131l\u0131\u015F g\xFCn\xFC belli de\u011Fil."):
gun<=0?\u00E7("Bug\xFCn a\xE7\u0131l\u0131\u015F g\xFCn\xFC."):gun<=gunler?\u00E7("Bug\xFCn pilotun {g}. g\xFCn\xFC ({n} g\xFCn s\xFCrer).",{g:gun,n:gunler}):\u00E7("Pilot {n} g\xFCn s\xFCrd\xFC; rapor ve kara\
r bekleniyor.",{n:gunler}):"";kap.innerHTML=`<div class="sayfa sayfa-dar">
      <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Pilot")}</p><h1 class="b1">${\u00E7("Test\xE7i rehberi")}</h1></div></div>
      ${p.pilot?"":`<div class="bilgi-kutusu">${ikon("info")}<span>${\u00E7("\u015Eu an pilot s\xFCrm\xFCyor: d\xFCnya herkese a\xE7\u0131k. Sorunlar\u0131 yine Sorun bildir ile yazabilirsin.")}</span\
></div>`}
      <div class="yigin">
        <section class="kart" id="pilot-nedir">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Pilot nedir?")}</p><h2 class="b2">${esc(durumYazi||\u00E7("Civora'n\u0131n ilk kapal\u0131 denemesi"))}</h2></div><span class="ik-kut\
u">${ikon("flag")}</span></div>
          <p class="aciklama">${\u00E7("Civora'n\u0131n ilk kapal\u0131 denemesi: {n} g\xFCn, iki \xFClke (T\xFCrkiye ve Yunanistan), 20\u201340 test\xE7i. Ama\xE7 hatalar\u0131 bulmak ve dengeyi \xF6l\xE7mek; sen oynad\u0131k\xE7a oyun d\xFCzelir.",
{n:gunler})}</p>
          <p class="kucuk">${\u00E7("Pilot tamamen \xFCcretsizdir; sat\u0131n alma yoktur. Pilot bitince d\xFCnya s\u0131f\u0131rlan\u0131r: karakterin, paran ve e\u015Fyalar\u0131n yeni d\xFCnyaya ta\u015F\u0131nmaz.")}\
</p>
        </section>
        <section class="kart" id="pilot-takvim">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Takvim")}</p><h2 class="b2">${\u00E7("G\xFCn g\xFCn pilot")}</h2></div><span class="ik-kutu">${ikon("calendar-days")}</span></div>
          <ol class="pilot-takvim">${(p.calendar??[]).map(x=>`<li class="${bugun(x)?"bugun":""}" data-takvim="${esc(x.key)}">
            <span class="gun">${esc(gunYazi(x))}</span><span>${esc(TAKVIM[x.key]??"")}</span></li>`).join("")}</ol>
          <p class="kucuk">${\u00E7("G\xFCn, \xFClkenin a\xE7\u0131ld\u0131\u011F\u0131 g\xFCnden say\u0131l\u0131r; oyun g\xFCn\xFC T\xFCrkiye saatiyle 03.00'te de\u011Fi\u015Fir. De\u011Fi\u015Fiklik olursa Meydan'da duyurulur.")}\
</p>
        </section>
        <section class="kart" id="pilot-her-gun">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Her g\xFCn")}</p><h2 class="b2">${\u00E7("G\xFCnde 10\u201315 dakika yeter")}</h2></div><span class="ik-kutu">${ikon("list-checks")}<\
/span></div>
          <ol class="ilk-adimlar">${HER_GUN.map(x=>`<li class="ilk-adim">
            <span class="ozet-ikon" style="background:var(--orman-acik);color:var(--orman)">${ikon(x.ik)}</span>
            <span><b>${esc(x.ad)}</b><span class="kucuk">${esc(x.ne)}</span></span>
            <button class="dugme kucuk-d" type="button" data-pilot-git="${esc(x.git)}">${\u00E7("Git")}</button></li>`).join("")}</ol>
        </section>
        <section class="kart" id="pilot-bildir">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Nas\u0131l bildiririm?")}</p><h2 class="b2">${\u00E7("G\xF6rd\xFC\u011F\xFCn her sorunu yaz")}</h2></div><span class="ik-kutu">${ikon(
"megaphone")}</span></div>
          <p class="aciklama">${\u00E7("Her ekran\u0131n k\xF6\u015Fesindeki ? d\xFC\u011Fmesine dokun \u2192 Sorun bildir. Ne yap\u0131yordun, ne bekliyordun, ne oldu: \xFC\xE7 c\xFCmle yeter.")}</p>\

          <p class="kucuk">${\u00E7("O ekran, oyunun s\xFCr\xFCm\xFC, g\xF6r\xFCn\xFCm (3B ya da 2B), ekran boyu, dil ve son hatalar kendili\u011Finden eklenir; g\xF6ndermeden \xF6nce g\xF6r\xFCrs\xFCn. Yan\u0131t\u0131 Ayarlar \u2192 Geri bildirim'de g\
\xF6r\xFCrs\xFCn.")}</p>
          <div class="oneri-dugmeler"><button class="dugme altin kucuk-d" type="button" id="pilot-sorun">${ikon("megaphone")}${\u00E7("Sorun bildir")}</button>
            <button class="dugme ikincil kucuk-d" type="button" data-pilot-git="hayat/ayarlar">${ikon("settings")}${\u00E7("Geri bildirimlerim")}</button></div>
        </section>
        <section class="kart" id="pilot-rozet">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Rozet")}</p><h2 class="b2">${\u00E7("Pilot \xD6nc\xFCs\xFC")}</h2></div><span class="ik-kutu">${ikon("award")}</span></div>
          <p class="aciklama">${\u00E7('Pilota kat\u0131lan her test\xE7iye yeni d\xFCnyada "Pilot \xD6nc\xFCs\xFC" rozeti kal\u0131r. Yaln\u0131z g\xF6r\xFCn\xFCmd\xFCr; g\xFC\xE7 vermez.')}</p>
        </section>
        <section class="kart" id="pilot-gizlilik">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Gizlilik")}</p><h2 class="b2">${\u00E7("Ne \xF6l\xE7\xFCl\xFCyor?")}</h2></div><span class="ik-kutu">${ikon("shield-check")}</span></\
div>
          <p class="aciklama">${\u00E7("Pilotta oyunun ak\u0131c\u0131l\u0131\u011F\u0131 ve ba\u011Flant\u0131n\u0131n s\xFCreklili\u011Fi ad\u0131n ya da hesab\u0131nla ba\u011Flanmadan, yaln\u0131z g\xFCnl\xFCk toplam olarak \xF6l\xE7\xFCl\xFCr. Ayr\u0131nt\u0131lar gizlilik metninde.")}\
</p>
          <a class="dugme ikincil kucuk-d" href="gizlilik.html" target="_blank" rel="noopener">${ikon("shield-check")}${\u00E7("Gizlilik metni")}</a>
        </section>
      </div></div>`;for(const b of kap.querySelectorAll("[data-pilot-git]"))b.onclick=()=>Kabuk.git(b.dataset.pilotGit);$("#pilot-sorun",kap).onclick=()=>GeriBildirim.ac({ekran:"hayat/pilot"})}}),Parcalar.
tamam("ek_98zzzg_pilot","2026-11-17-53cc619b-0b92b6e");
