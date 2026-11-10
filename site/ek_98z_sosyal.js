// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_98z_sosyal.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/gunluk",{async ac(kap){let v=null;const yukle=async()=>{v=await Sunucu.cagir("life_journal",{p_character:null})};function ciz(){kap.innerHTML=`<div class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m")}</p><h1 class="b1">${\u00E7("G\xFCnl\xFC\u011F\xFCm")}</h1>
          <p class="aciklama">${\u00E7("Civora'daki hayat\u0131n\u0131n kronolojisi: ilkler, se\xE7imler, madalyalar ve r\xFCtbeler. Gizledi\u011Fin kay\u0131tlar\u0131 ba\u015Fkalar\u0131 profilinde g\xF6rmez.")}\
</p></div></div>
        <section class="kart" id="gunluk-kart">${gunlukHtml(v.items,{kendi:!0})}</section></div>`;for(const b of $$("[data-gunluk-gizle]",kap))b.onclick=async()=>{const gizle=b.dataset.gizli!=="1";b.disabled=
!0;try{await Sunucu.yap("life_journal_hide",{p_entry:Number(b.dataset.gunlukGizle),p_hidden:gizle}),tost(gizle?\u00E7("Kay\u0131t ba\u015Fkalar\u0131ndan gizlendi."):\u00E7("Kay\u0131t yeniden g\xF6r\xFCn\xFCr."),
gizle?"eye-off":"eye"),await tazele()}catch(e){tost(hataMetni(e),"circle-alert"),b.disabled=!1}}}const tazele=tazeleyici(async()=>{await yukle(),ciz()});await yukle(),ciz()}}),Parcalar.tamam("ek_98z_s\
osyal");
