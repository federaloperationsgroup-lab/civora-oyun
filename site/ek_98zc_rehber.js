// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_98zc_rehber.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/gorevler",{async ac(kap){let g=null;const yukle=async()=>{g=await Sunucu.cagir("missions")};await yukle();const ciz=()=>{const rol=g.role?Rehber.ROL[g.role]:null;kap.innerHTML=`<di\
v class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m")}</p><h1 class="b1">${\u00E7("G\xFCn\xFCn g\xF6revleri")}</h1>
          <p class="aciklama">${\u00E7('G\xFCn\xFCn g\xF6revlerinde biteni "Al" ile topla: her biri {xp} deneyim. Ka\xE7\u0131rman\u0131n cezas\u0131 yok, zincir yok.',{xp:Number(g.xp_each??0)})}${rol?
" "+\u00E7("Yolun: {ad}; yap\u0131labilir g\xF6revler aras\u0131ndan \xF6ncelik verilir.",{ad:rol.ad}):" "+\u00E7("Yol se\xE7ersen, yap\u0131labilir g\xF6revlerinde o yola \xF6ncelik verilir (Ayarlar).")}\
</p></div>
          <button class="dugme ikincil kucuk-d" type="button" id="gorev-yenile">${ikon("rotate-cw")}${\u00E7("Yenile")}</button></div>
        <p class="kucuk" id="gorev-ozet">${\u00E7("Bug\xFCn al\u0131nan: {n}/{m}",{n:Number(g.claimed_today??0),m:(g.missions??[]).length})} \xB7 ${\u00E7("toplam {n} g\xF6rev",{n:Number(g.claimed_total??
0)})} \xB7 ${g.day?esc(new Date(g.day+"T12:00:00Z").toLocaleDateString(DIL.yerel,{day:"numeric",month:"long",timeZone:"UTC"})):""} <span class="soluk">${\u00E7("(oyun g\xFCn\xFC UTC'ye g\xF6re biter)")}\
</span></p>
        <section class="kart"><div class="yigin" id="gorev-liste">${(g.missions??[]).map(m=>`<div class="gorev-satir ${m.claimed_at?"alindi":m.done?"bitti":""}" data-gorev="${esc(m.key)}">
            <span class="ozet-ikon" style="background:var(--orman-acik);color:var(--orman)">${ikon(m.claimed_at?"badge-check":m.done?"check":"list-checks")}</span>
            <span><b>${esc(\u00E7v(m.title))}</b><span class="kucuk">${esc(\u00E7v(m.how))}</span>
              <span class="cubuk" style="margin-top:6px"><i style="display:block;height:100%;width:${Math.round(Math.min(1,Number(m.progress)/Math.max(1,Number(m.target)))*100)}%;background:var(--alti\
n)"></i></span>
              <span class="kucuk">${\u00E7("{p}/{t}",{p:Number(m.progress),t:Number(m.target)})}${m.role!=="general"?" \xB7 "+esc(Rehber.ROL[m.role]?.ad??m.role):""}</span></span>
            ${m.claimed_at?`<span class="cip yesil">${\u00E7("Al\u0131nd\u0131")}</span>`:m.done?`<button class="dugme altin kucuk-d" type="button" data-gorev-al="${esc(m.key)}">${ikon("gift")}${\u00E7(
"Al")}</button>`:`<span class="cip">${\u00E7("S\xFCr\xFCyor")}</span>`}</div>`).join("")||`<p class="bos">${\u00E7("Bug\xFCn g\xF6rev yok.")}</p>`}</div></section>
        <p class="kucuk">${\u00E7("G\xF6revler var olan kay\u0131tlardan say\u0131l\u0131r; se\xE7im oyu g\xF6rev de\u011Fildir. Tamamlanan her g\xF6rev G\xF6rev Madalyas\u0131'n\u0131 sayar (Hayat\u0131m \u2192 Profil \u2192 Vitrin).")}\
</p></div>`,$("#gorev-yenile",kap).onclick=async()=>{await yukle(),ciz()};for(const b of $$("[data-gorev-al]",kap))b.onclick=async()=>{b.disabled=!0;try{const r=await Sunucu.yap("mission_claim",{p_key:b.
dataset.gorevAl});g=r.missions??g,tost(\u00E7("G\xF6rev al\u0131nd\u0131: +{xp} deneyim.",{xp:Number(r.xp??0)}),"gift"),typeof Ses=="object"&&Ses.kutla(),ciz(),Durum.askerlik().catch(()=>{})}catch(e){
tost(hataMetni(e),"circle-alert"),b.disabled=!1}}};ciz();const b1=Durum.dinle("olay",({olay})=>{(olay==="mission.claimed"||olay==="progress.level_up")&&yukle().then(ciz).catch(()=>{})});return()=>b1()}}),
Parcalar.tamam("ek_98zc_rehber");
