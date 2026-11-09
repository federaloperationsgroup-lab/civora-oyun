// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_98g_muzik.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/muzik",{async ac(kap){let v=null,kanal=null,kanalBirak=null,kapandi=!1,durdur=()=>{};const arama={q:"",sonuc:null},oda=ProvaOdasi.ac();oda.dinle("sec",(ad,id)=>{if(ad==="kisi"){id&&
profilAc(id,()=>tazele());return}if(ad==="calgi"){sahneRolu();return}const el=$({afis:"#muzik-ayar",gosterge:"#muzik-provalar",pano:"#muzik-repertuvar"}[ad]??"#yok",kap);el&&(el.scrollIntoView({behavior:hareketAzalt?
"auto":"smooth",block:"start"}),el.classList.remove("vurgu-yan"),el.offsetWidth,el.classList.add("vurgu-yan"))});const ben=()=>Durum.v.ozet?.character??{},R=()=>v?.m?.rule??Durum.v.kurallar?.data?.culture??
{},RK=()=>({...R(),studio:v?.m?.studio_rule??R().studio??{},ep:v?.m?.ep_rule??R().ep??{}}),B=()=>v?.m?.band??null,yetki=a=>!!B()?.me?.can?.[a],benimRol=()=>B()?.me?.role??"member",cikarabilir=hedef=>yetki(
"expel")&&hedef!=="manager"&&(benimRol()==="manager"||hedef==="member");async function yukle(){await Durum.kurallar().catch(()=>null);const[m,fv]=await Promise.all([Sunucu.cagir("music_overview"),Sunucu.
cagir("festival_view",{p_season:null}).catch(()=>null)]);v={m,fv},kanalBagla()}function kanalBagla(){const id=B()?.band_id??null;id!==kanal&&(kanalBirak?.(),kanalBirak=null,kanal=id,id&&(kanalBirak=Sunucu.
Canli.dinle("band:"+id,olay=>{/^(band\.|song\.)/.test(olay)&&yakinda()})))}let bekleyen=null;const yakinda=()=>{clearTimeout(bekleyen),bekleyen=setTimeout(()=>{kapandi||tazele()},350)},calismaYazi=()=>{
const me=v.m.me??{};return \u00E7("Bug\xFCn {n} / {max} birim \xE7al\u0131\u015Ft\u0131n (bir birim {d} dakika). \u015Eark\u0131 yazmak ve ki\u015Fisel prova g\xFCnl\xFCk s\u0131n\u0131ra say\u0131l\u0131r; ortak prova say\u0131lmaz.",
{n:Number(me.units_today??0),max:Number(me.daily_cap??8),d:Number(me.unit_minutes??30)})},birimSuresi=dk=>dk<60?\u00E7("{d} dk",{d:dk}):dk%60?\u00E7("{s} sa {d} dk",{s:Math.floor(dk/60),d:dk%60}):\u00E7(
"{n} sa",{n:dk/60}),birimSecimi=(ad,min,max,secili)=>`<fieldset class="alan"><legend>${\u00E7("Ka\xE7 birim")}</legend><div class="radyo-liste birlik-yatay ikili">${Array.from({length:max-min+1},(_,i)=>min+
i).map(n=>`<label class="radyo"><input type="radio" name="${ad}" value="${n}" ${n===secili?"checked":""}>
        <span><b>${\u00E7("{n} birim",{n})}</b><span class="kucuk">${esc(birimSuresi(n*Number(v.m.me?.unit_minutes??30)))}</span></span></label>`).join("")}</div></fieldset>`,rolSecimi=(ad,secili)=>`<\
fieldset class="alan"><legend>${\u00E7("Sahne rol\xFCn")}</legend><div class="radyo-liste birlik-yatay ikili">${(R().stageRoles??Object.keys(MUZIK_ROL)).map((r,i)=>`<label class="radyo"><input type="r\
adio" name="${ad}" value="${r}" ${(secili?r===secili:i===0)?"checked":""}>
        <span><b>${ikon(MUZIK_ROL_IK[r]??"eighth-notes")} ${esc(MUZIK_ROL[r]??r)}</b></span></label>`).join("")}</div></fieldset>`,turSecimi=(ad,secili)=>`<fieldset class="alan"><legend>${\u00E7("T\xFCr")}\
</legend><div class="radyo-liste birlik-yatay ikili">${(R().genres??Object.keys(MUZIK_TUR)).map((t,i)=>`<label class="radyo"><input type="radio" name="${ad}" value="${t}" ${(secili?t===secili:i===0)?"\
checked":""}>
        <span><b>${ikon(MUZIK_TUR_IK[t]??"eighth-notes")} ${esc(MUZIK_TUR[t]??t)}</b></span></label>`).join("")}</div></fieldset>`,agirliklar=tur=>Object.entries(R().band?.roleWeightsPpm?.[tur]??{}).sort(
(a,b)=>b[1]-a[1]).map(([r,p])=>`${MUZIK_ROL[r]??r} ${muzikYuzde(p)}`).join(" \xB7 ");function bosHtml(){const m=v.m,bekleme=m.join_after&&Date.parse(m.join_after)>Date.now()?m.join_after:null,davetler=m.
invites??[],ucret=Number(R().band?.foundFeeCr??5e3);return`${bekleme?`<div class="bilgi-kutusu" style="margin-bottom:12px">${ikon("hourglass")}<span>${\u00E7("Bir gruptan ayr\u0131ld\u0131n: yeni bir gruba girm\
ek ya da grup kurmak i\xE7in kalan s\xFCre")} <b data-bitis="${esc(bekleme)}"></b>.</span></div>`:""}
        ${davetler.length?`<section class="kart" id="muzik-davetler" style="margin-bottom:12px"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Davetlerin")}</p><h2 class="b2">${\u00E7("{n} g\
rup seni \xE7a\u011F\u0131r\u0131yor",{n:davetler.length})}</h2></div><span class="ik-kutu">${ikon("user-round-plus")}</span></div>
          <div class="liste">${davetler.map(x=>`<div class="liste-satir"><span class="liste-ikon">${muzikAfis(x)}</span>
            <div><span class="tur">${\u00E7("{ad} davet etti \xB7 {tur} \xB7 {n} \xFCye",{ad:esc(x.by??""),tur:esc(MUZIK_TUR[x.genre]??x.genre),n:Number(x.members)})}</span><b>${esc(x.name)}</b>
              <div class="alt">${\u00E7("\xDCs: {sehir} \xB7 son g\xFCn {zaman}",{sehir:esc(bolgeAdi(x.base_region_id)),zaman:esc(saatYaz(x.expires_at))})}</div></div>
            <span class="birlik-satir-dugmeler"><button class="dugme kucuk-d" data-davet-kabul="${esc(x.invite_id)}">${ikon("check")}${\u00E7("Kabul et")}</button>
              <button class="dugme sade kucuk-d" data-davet-ret="${esc(x.invite_id)}">${\u00E7("Reddet")}</button>
              <button class="dugme sade kucuk-d" data-grup-ac="${esc(x.band_id)}">${\u00E7("\u0130ncele")}</button></span></div>`).join("")}</div></section>`:""}
        <div class="izgara iki">
          <section class="kart" id="muzik-kur-kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kendi grubun")}</p><h2 class="b2">${\u00E7("Grup kur")}</h2></div><span class="ik-kutu">${ikon(
"guitar")}</span></div>
            <p class="aciklama">${\u00E7("Grup 1\u2013{n} ki\u015Fidir; tek ki\u015Filik grup solo sanat\xE7\u0131d\u0131r. Birlikte \u015Fark\u0131 yazar, prova eder, konser verirsiniz. Vatanda\u015Fl\u0131k \u015Fart\u0131 yok; ortak prova grubun \xFCs \u015Fehrin\
de yap\u0131l\u0131r.",{n:Number(R().bandSize?.max??4)})}</p>
            <p class="kucuk" style="margin-top:8px">${\u00E7("Kurulu\u015F bedeli {kr} kredi; hesab\u0131ndan d\xFC\u015F\xFCl\xFCr ve geri verilmez. Kuran grubun y\xF6neticisi olur; \xFCs \u015Fehri bulundu\u011Fun \u015Fehirdir.",
{kr:kr(ucret)})}</p>
            <div class="satir" style="margin-top:12px"><button class="dugme altin" id="muzik-kur" ${bekleme?"disabled":""}>${ikon("plus")}${\u00E7("Grup kur ({kr} kredi)",{kr:kr(ucret)})}</button></di\
v></section>
          <section class="kart" id="muzik-beceri"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("M\xFCzik becerin")}</p><h2 class="b2">${Number(m.me?.music_skill??0)} / 100</h2></div><span c\
lass="ik-kutu">${ikon("graduation-cap")}</span></div>
            <p class="aciklama">${\u00E7("Yazd\u0131\u011F\u0131n her birimin puan\u0131 becerinle artar: {taban} + becerinin %{yuzde}'i. Beceriyi Hayat\u0131m \u2192 E\u011Fitim'de y\xFCkseltirsin.",
{taban:Number(R().song?.point?.base??20),yuzde:Number(R().song?.point?.perSkillPct??80)})}</p>
            <div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="hayat/egitim">${ikon("graduation-cap")}${\u00E7("E\u011Fitime git")}</button></div></section>
        </div>
        <div class="izgara iki" style="margin-top:16px">${biletlerHtml()}${koleksiyonHtml(v.m)}</div>`}function sarkilarHtml(b){const taslak=b.drafts??[],biten=b.finished??[],S=R().song??{},sarkiSatir=(s,tas)=>{
const yazarlar=(s.writers??[]).map(w=>tas?`${esc(w.name)} (${\u00E7("{n} birim",{n:Number(w.units)})})`:`${esc(w.name)} ${esc(muzikYuzde(w.share_ppm??0))}`).join(", "),benimki=s.owner_id===ben().id;return`\
<div class="muzik-sarki${tas?" taslak":""}" data-sarki="${esc(s.song_id)}">
          <div class="muzik-sarki-bas"><div><b>${esc(s.title)}</b><span class="kucuk">${esc(MUZIK_TEMA[s.theme]??s.theme)} \xB7 ${esc(muzikSure(s.duration_s))} \xB7 ${\u00E7("{n} BPM",{n:Number(s.tempo)})}\
 \xB7 ${esc(muzikTon(s.key_no))}</span></div>
            ${tas?`<span class="cip">${\u00E7("Kalite \u015Fimdi {q}",{q:Number(s.quality_now??0)})}</span>`:`<span class="cip altin">${ikon("star")}${\u00E7("Kalite {q}",{q:Number(s.quality??0)})}</s\
pan>`}</div>
          ${tas?`<div class="muzik-ilerleme" role="img" aria-label="${esc(\u00E7("{n} / {max} birim yaz\u0131ld\u0131",{n:Number(s.units),max:Number(S.maxUnits??16)}))}"><span style="width:${Math.round(
Number(s.units)/Number(S.maxUnits??16)*100)}%"></span>
              <i style="left:${Math.round(Number(S.minUnits??4)/Number(S.maxUnits??16)*100)}%"></i><i style="left:${Math.round(Number(S.fullUnits??8)/Number(S.maxUnits??16)*100)}%"></i></div>
            <p class="kucuk">${\u00E7("{n} / {max} birim \xB7 en az {min} birimle biter; {tam} birimden k\u0131sa \u015Fark\u0131n\u0131n kalitesi oranla d\xFC\u015F\xFCk kal\u0131r.",{n:Number(s.units),
max:Number(S.maxUnits??16),min:Number(S.minUnits??4),tam:Number(S.fullUnits??8)})}</p>`:""}
          <p class="kucuk">${yazarlar?tas?\u00E7("Yazanlar: {liste}",{liste:yazarlar}):\u00E7("Besteciler: {liste}",{liste:yazarlar}):\u00E7("Hen\xFCz kimse yazmad\u0131.")}</p>
          <div class="oneri-dugmeler">
            ${tas?`<button class="dugme kucuk-d" data-yaz="${esc(s.song_id)}">${ikon("notebook-pen")}${\u00E7("beste::Yaz")}</button>`:""}
            ${muzikDinle(s)}
            ${tas&&(benimki||yetki("repertoire"))&&Number(s.units)>=Number(S.minUnits??4)?`<button class="dugme ikincil kucuk-d" data-bitir="${esc(s.song_id)}">${ikon("check")}${\u00E7("Bitir")}</butt\
on>`:""}
            ${tas&&(benimki||yetki("repertoire"))?`<button class="dugme sade kucuk-d" data-birak="${esc(s.song_id)}">${\u00E7("B\u0131rak")}</button>`:""}
            ${!tas&&!s.in_repertoire&&yetki("repertoire")?`<button class="dugme sade kucuk-d" data-rep-ekle="${esc(s.song_id)}">${ikon("plus")}${\u00E7("Repertuvara ekle")}</button>`:""}
          </div></div>`},dolu=taslak.length>=Number(S.draftsPerBand??3);return`<section class="kart" id="muzik-sarkilar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u015Eark\u0131lar \xB7 {n} taslak,\
 {m} bitmi\u015F",{n:taslak.length,m:biten.length})}</p>
          <h2 class="b2">${\u00E7("Beste")}</h2></div>
          <button class="dugme altin kucuk-d" id="muzik-sarki-ac" ${dolu?"disabled":""} title="${dolu?esc(\u00E7("En \xE7ok {n} a\xE7\u0131k taslak; \xF6nce birini bitir ya da b\u0131rak.",{n:Number(S.
draftsPerBand??3)})):""}">${ikon("plus")}${\u00E7("Yeni \u015Fark\u0131")}</button></div>
        <p class="kucuk">${esc(calismaYazi())}</p>
        ${taslak.length?`<div class="muzik-sarkilar">${taslak.map(s=>sarkiSatir(s,!0)).join("")}</div>`:`<p class="bos">${\u00E7("A\xE7\u0131k taslak yok. Yeni bir \u015Fark\u0131 a\xE7; grubun her \xFCyesi yazabilir.")}\
</p>`}
        ${biten.length?`<details class="birlik-ac" data-ac="biten" open><summary>${\u00E7("Bitmi\u015F \u015Fark\u0131lar \xB7 {n}",{n:biten.length})}</summary>
          <div class="muzik-sarkilar" style="margin-top:10px">${biten.map(s=>sarkiSatir(s,!1)).join("")}</div></details>`:""}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Ezgi ger\xE7ek ses kayd\u0131 de\u011Fildir; \u015Fark\u0131n\u0131n verisinden oyunun kurallar\u0131yla \xFCretilir.")}</p></section>`}function repertuvarHtml(b){
const l=b.repertoire_list??[],H=R().rehearsal??{};return`<section class="kart" id="muzik-repertuvar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Repertuvar \xB7 {n} / {max}",{n:l.length,max:Number(
H.repertoireMax??20)})}</p>
          <h2 class="b2">${\u00E7("\xC7alabildi\u011Fimiz \u015Fark\u0131lar")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span></div>
        ${l.length?`<div class="liste">${l.map(s=>`<div class="liste-satir muzik-rep" data-rep="${esc(s.song_id)}"><span class="liste-ikon"><span class="ozet-ikon">${ikon("eighth-notes")}</span></span\
>
            <div><span class="tur">${\u00E7("Bilgin {b} \xB7 grubun ortalamas\u0131 {o}",{b:Number(s.my_level??0),o:Number(s.avg_level??0)})}</span><b>${esc(s.title)}</b>
              <div class="muzik-bilgi" aria-hidden="true"><span style="width:${Math.min(100,Number(s.my_level??0))}%"></span></div></div>
            <span class="birlik-satir-dugmeler"><button class="dugme kucuk-d" data-calis="${esc(s.song_id)}">${ikon("repeat-2")}${\u00E7("Prova et")}</button>${muzikDinle(s)}
              ${yetki("repertoire")?`<button class="dugme sade kucuk-d" data-rep-cikar="${esc(s.song_id)}">${\u00E7("repertuvar::\xC7\u0131kar")}</button>`:""}</span></div>`).join("")}</div>`:`<p clas\
s="bos">${\u00E7("Repertuvar bo\u015F. Biten \u015Fark\u0131lar kendili\u011Finden girer.")}</p>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Her prova biriminde \u015Fark\u0131 bilgin, kalan pay\u0131n %{n}'i kadar artar. Ki\u015Fisel prova her yerde yap\u0131l\u0131r; ortak prova grubun koordinasyonunu da art\u0131r\
\u0131r.",{n:Number(H.knowledgeGainPct??12)})}</p></section>`}function provalarHtml(b){const l=b.rehearsals??[],bekleyen2=l.filter(h=>h.status==="scheduled"),biten=l.filter(h=>h.status==="done"),H=R().
rehearsal??{},satir=h=>{const bitti=h.status==="done",gelecek=h.going??[];return`<div class="birlik-tur muzik-prova${bitti?"":" secili"}" data-prova="${esc(h.rehearsal_id)}">
          <div class="birlik-tur-bas"><div><b>${esc(saatYaz(h.starts_at))} \xB7 ${esc(bolgeAdi(h.region_id))}</b>
              <span class="kucuk">${\u00E7("{n} birim",{n:Number(h.units)})} \xB7 ${(h.songs??[]).map(s=>esc(s.title)).join(", ")} \xB7 ${\u00E7("ay\u0131ran {ad}",{ad:esc(h.booked_by??"")})}</span></\
div>
            ${bitti?`<span class="cip">${ikon("check")}${\u00E7("{a} / {m} kat\u0131ld\u0131",{a:Number(h.attended??0),m:Number(h.members??0)})}</span>`:`<span class="cip altin">${ikon("timer")}<b dat\
a-bitis="${esc(h.starts_at)}"></b></span>`}</div>
          ${bitti?`<p class="kucuk">${\u00E7("Koordinasyon {a} \u2192 {b}",{a:Number(h.coordination_before??0),b:Number(h.coordination_after??0)})}${gelecek.length?" \xB7 "+gelecek.map(g=>`${esc(g.name)}${g.
attended?"":` (${\u00E7("gelmedi")})`}`).join(", "):""}</p>`:`<p class="kucuk">${\u00E7("{n} ki\u015Fi kat\u0131lacak",{n:gelecek.length})}${gelecek.length?": "+gelecek.map(g=>esc(g.name)).join(", "):
""}</p>
            <div class="oneri-dugmeler">
              <button class="dugme kucuk-d ${h.mine?"":"ikincil"}" data-katil="${esc(h.rehearsal_id)}" aria-pressed="${!!h.mine}">${ikon("check")}${h.mine?\u00E7("Kat\u0131laca\u011F\u0131m"):\u00E7("\
Kat\u0131l")}</button>
              ${yetki("rehearse")?`<button class="dugme sade kucuk-d" data-prova-iptal="${esc(h.rehearsal_id)}">${\u00E7("\u0130ptal et")}</button>`:""}</div>`}</div>`};return`<section class="kart" id\
="muzik-provalar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ortak prova \xB7 \xFCs {sehir}",{sehir:esc(bolgeAdi(b.base_region_id))})}</p>
          <h2 class="b2">${bekleyen2.length?\u00E7("{n} prova ayr\u0131ld\u0131",{n:bekleyen2.length}):\u00E7("Ayr\u0131lm\u0131\u015F prova yok")}</h2></div>
          ${yetki("rehearse")?`<button class="dugme altin kucuk-d" id="muzik-prova-ayir" ${bekleyen2.length>=Number(H.pendingPerBand??3)||!(b.repertoire_list??[]).length?"disabled":""}>${ikon("calenda\
r")}${\u00E7("Prova ay\u0131r")}</button>`:`<span class="ik-kutu">${ikon("calendar")}</span>`}</div>
        ${bekleyen2.length?`<div class="birlik-turlar">${bekleyen2.map(satir).join("")}</div>`:`<p class="bos">${yetki("rehearse")?\u00E7("Repertuvardan \u015Fark\u0131lar se\xE7ip grubun \xFCs \u015Fehrinde bir saat ay\u0131r\
."):\u00E7("Y\xF6netici ya da vekil ortak prova ay\u0131r\u0131nca burada g\xF6r\xFCrs\xFCn.")}</p>`}
        ${biten.length?`<details class="birlik-ac" data-ac="provalar"><summary>${\u00E7("Son provalar \xB7 {n}",{n:biten.length})}</summary><div class="birlik-turlar" style="margin-top:10px">${biten.map(
satir).join("")}</div></details>`:""}
        <p class="kucuk" style="margin-top:8px">${\u00E7('Prova saatinde grubun \xFCs \u015Fehrinde bulunan (yolda ve g\xF6zalt\u0131nda de\u011Fil) ve "kat\u0131l" diyenler say\u0131l\u0131r; \xE7evrimi\xE7i olmak gerekmez. Kat\u0131lanlar\u0131n \u015Fark\
\u0131 bilgisi ve grubun koordinasyonu artar. Son provadan {n} g\xFCn sonra koordinasyon g\xFCnde {m} azal\u0131r.',{n:Number(H.coordinationIdleDays??7),m:Number(H.coordinationDecayPerDay??2)})}</p></\
section>`}function uyelerHtml(b){const uyeler=b.members_list??[],benimKim=ben().id,davetler=b.invites??[];return`<section class="kart" id="muzik-uyeler"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7(
"\xDCyeler \xB7 {n} / {max}",{n:uyeler.length,max:Number(R().bandSize?.max??4)})}</p><h2 class="b2">${\u00E7("Grubun kadrosu")}</h2></div>
          <span class="ik-kutu">${ikon("users-round")}</span></div>
        <p class="kucuk">${\u00E7("Sahne uyumu %{u}: {tur} i\xE7in a\u011F\u0131rl\u0131klar {agirlik}. Her rol bir kez say\u0131l\u0131r.",{u:Math.round(Number(b.coverage_ppm??0)/1e4),tur:esc(MUZIK_TUR[b.
genre]??b.genre),agirlik:esc(agirliklar(b.genre))})}</p>
        <div class="liste">${uyeler.map(m=>`<div class="liste-satir muzik-uye" data-uye="${esc(m.character_id)}"><span class="liste-ikon">${avatarKutu(m.name,m.character_id)}</span>
            <div><span class="tur">${ikon(MUZIK_YETKI_IK[m.role]??"user-round")} ${esc(MUZIK_YETKI[m.role]??m.role)} \xB7 ${ikon(MUZIK_ROL_IK[m.stage_role]??"eighth-notes")} ${esc(MUZIK_ROL[m.stage_role]??
"")}${m.online?` \xB7 <span class="birlik-cevrimici">${\u00E7("\xE7evrimi\xE7i")}</span>`:""}</span>
              <b><button class="baglanti" type="button" data-profil="${esc(m.character_id)}">${esc(m.name)}</button>${m.character_id===benimKim?" "+\u00E7("(sen)"):""}</b>
              <div class="alt">${\u00E7("Kat\u0131ld\u0131: {zaman}",{zaman:esc(saatYaz(m.joined_at))})}</div></div>
            <span class="birlik-satir-dugmeler">${m.character_id===benimKim?`<button class="dugme sade kucuk-d" id="muzik-sahne-rol">${ikon(MUZIK_ROL_IK[m.stage_role]??"eighth-notes")}${\u00E7("Sahne \
rol\xFCm")}</button>`:""}
              ${yetki("roles")&&m.character_id!==benimKim?`<button class="dugme sade kucuk-d" data-rol-ver="${esc(m.character_id)}">${ikon("star")}${\u00E7("Rol")}</button>`:""}
              ${m.character_id!==benimKim&&cikarabilir(m.role)?`<button class="dugme sade kucuk-d" data-cikar="${esc(m.character_id)}">${\u00E7("\xC7\u0131kar")}</button>`:""}</span></div>`).join("")}\
</div>
        ${yetki("invite")?`<hr class="ayrac"><p class="ust-yazi">${\u00E7("Davet et")}</p>
          ${uyeler.length>=Number(R().bandSize?.max??4)?`<p class="kucuk">${\u00E7("Grup dolu: en \xE7ok {n} ki\u015Fi.",{n:Number(R().bandSize?.max??4)})}</p>`:`
          <form class="sohbet-yaz" id="muzik-ara" novalidate style="margin-top:6px"><input name="q" minlength="2" maxlength="24" placeholder="${\u00E7("Ad yaz (en az 2 harf)")}" value="${esc(arama.q)}\
" aria-label="${\u00E7("Oyuncu ad\u0131")}" autocomplete="off">
            <button class="dugme" type="submit" aria-label="${\u00E7("Ara")}">${ikon("zoom-in")}</button></form>
          ${arama.sonuc?`<div class="koltuk-liste" style="margin-top:10px" id="muzik-ara-sonuc">${arama.sonuc.map(x=>{const uye=uyeler.some(m=>m.character_id===x.character_id),bekliyor=davetler.some(q=>q.
character_id===x.character_id);return`<div class="koltuk">${avatarKutu(x.name,x.character_id)}<div><b>${esc(x.name)}</b><div class="kucuk">${esc(ulkeAdi(x.country_id))}</div></div>
                ${uye?`<span class="cip">${\u00E7("\xDCye")}</span>`:bekliyor?`<span class="cip">${\u00E7("Davet edildi")}</span>`:`<button class="dugme ikincil kucuk-d" data-davet="${esc(x.character_id)}\
">${ikon("user-round-plus")}${\u00E7("Davet et")}</button>`}</div>`}).join("")||`<p class="bos">${\u00E7("Bulunamad\u0131.")}</p>`}</div>`:""}`}
          <p class="kucuk">${\u00E7("Her \xFClkeden oyuncu davet edilir. Davet {n} g\xFCn ge\xE7erlidir; grubun ayn\u0131 anda en \xE7ok {m} bekleyen daveti olur.",{n:Math.round(Number(R().band?.inviteExpiryH??
168)/24),m:Number(R().band?.invitesPerBand??6)})}</p>
          ${davetler.length?`<div class="liste" id="muzik-davetlerimiz">${davetler.map(q=>`<div class="liste-satir"><span class="liste-ikon">${avatarKutu(q.name,q.character_id)}</span>
            <div><span class="tur">${\u00E7("{ad} davet etti \xB7 yan\u0131t bekliyor",{ad:esc(q.by??"")})}</span><b>${esc(q.name)}</b></div>
            <button class="dugme sade kucuk-d" data-davet-geri="${esc(q.invite_id)}">${\u00E7("Geri \xE7ek")}</button></div>`).join("")}</div>`:""}`:""}
      </section>`}function payHtml(b){const p=b.pay??{},a=p.active,bek=p.pending,benimKim=ben().id,benimKabul=bek?.shares?.find(s=>s.character_id===benimKim),satirlar=(l,kabul)=>`<div class="muzik-pay\
lar">${(l??[]).map(s=>`<div class="muzik-pay"><span>${esc(s.name)}</span><b>${esc(muzikYuzde(s.ppm))}</b>
        ${kabul?`<small>${s.accepted?`${ikon("check")}${\u00E7("kabul etti")}`:\u00E7("bekleniyor")}</small>`:""}</div>`).join("")}</div>`;return`<section class="kart" id="muzik-pay"><div class="kart-\
bas"><div><p class="ust-yazi">${\u00E7("Pay plan\u0131")}</p><h2 class="b2">${\u00E7("Gelirin payla\u015F\u0131m\u0131")}</h2></div>
          ${yetki("pay")?`<button class="dugme ikincil kucuk-d" id="muzik-pay-oner">${ikon("percent")}${\u00E7("Yeni \xF6neri")}</button>`:`<span class="ik-kutu">${ikon("percent")}</span>`}</div>
        ${a?`<p class="ust-yazi">${\u00E7("Y\xFCr\xFCrl\xFCkte")}${p.fresh?"":` \xB7 <span class="muzik-eski">${\u00E7("eski")}</span>`}</p>${satirlar(a.shares,!1)}`:""}
        ${a&&!p.fresh?`<div class="bilgi-kutusu" style="margin-top:8px">${ikon("circle-alert")}<span>${\u00E7("\xDCyeler de\u011Fi\u015Fti: y\xFCr\xFCrl\xFCkteki planda bug\xFCnk\xFC \xFCyelerin hepsi yok. Y\xF6netici yeni bir plan \xF6n\
ermeli.")}</span></div>`:""}
        ${bek?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("\xD6neri \xB7 {ad}",{ad:esc(bek.proposed_by??"")})}</p>${satirlar(bek.shares,!0)}
          ${benimKabul&&!benimKabul.accepted?`<div class="satir" style="margin-top:8px"><button class="dugme altin kucuk-d" data-pay-kabul="${esc(bek.plan_id)}">${ikon("check")}${\u00E7("Kabul et")}</\
button></div>`:""}`:""}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Konserin k\xE2r\u0131 (kira ve malzeme kasaya d\xF6nd\xFCkten sonra kalan) bu plana g\xF6re b\xF6l\xFCn\xFCr; konser ayr\u0131l\u0131nca paylar o konser i\xE7in kilitlenir. Plan b\xFCt\
\xFCn \xFCyeler kabul edince y\xFCr\xFCrl\xFC\u011Fe girer; \xFCye de\u011Fi\u015Fince bekleyen \xF6neri d\xFC\u015Fer ve yeni konser i\xE7in yeni plan gerekir.")}</p></section>`}function kasaHtml(b){
const t=b.treasury??{},g=b.goods??{},defter=t.ledger??[],satir=l=>{const ad=esc(l.name??"");switch(l.kind){case"donation":return \u00E7("{ad} kasaya koydu: {kr} kredi",{ad,kr:kr(l.amount)});case"goods":
return \u00E7("{ad} kasaya {n} sahne malzemesi koydu",{ad,n:sayi(l.amount)});case"shop":return \u00E7("{ad} kasayla sahne malzemesi ald\u0131: {kr} kredi",{ad,kr:kr(l.amount)});case"public":return \u00E7(
"{ad} kasadan kamuya ba\u011F\u0131\u015Flad\u0131: {kr} kredi",{ad,kr:kr(l.amount)});case"tour":return \u00E7("Turne otob\xFCs\xFC: {kr} kredi",{kr:kr(l.amount)});case"studio":return \u00E7("{ad} st\xFC\
dyo kiras\u0131 \xF6dedi: {kr} kredi",{ad,kr:kr(l.amount)});case"ep":return \u00E7("EP sat\u0131\u015F\u0131ndan kasaya: {kr} kredi",{kr:kr(l.amount)});default:return \u00E7("Da\u011F\u0131lmada pay: {ad}, {kr}\
 kredi",{ad,kr:kr(l.amount)})}};return`<section class="kart" id="muzik-kasa"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Grubun kasas\u0131")}</p><h2 class="b2">${\u00E7("{kr} kredi",{kr:kr(
Number(t.balance??0))})}</h2></div>
          <button class="dugme altin kucuk-d" id="muzik-bagis">${ikon("hand-coins")}${\u00E7("Kasaya koy")}</button></div>
        <div class="konser-kasa">
          <div><small>${\u00E7("Harcanabilir")}</small><b>${\u00E7("{kr} kredi",{kr:kr(Number(t.free??t.balance??0))})}</b></div>
          <div><small>${\u00E7("Konserlere ayr\u0131lm\u0131\u015F")}</small><b>${\u00E7("{kr} kredi",{kr:kr(Number(t.held??0))})}</b></div>
          <div><small>${\u00E7("Sahne malzemesi")}</small><b>${sayi(Number(g.sahne??0))}${Number(g.sahne_held??0)?` <span class="kucuk">${\u00E7("(+{n} ayr\u0131lm\u0131\u015F)",{n:sayi(g.sahne_held)})}\
</span>`:""}</b></div>
        </div>
        <div class="oneri-dugmeler" style="margin-top:8px">
          <button class="dugme sade kucuk-d" id="muzik-malzeme-bagis" ${Number(v.m.instrument?.stage??0)>0?"":"disabled"}>${ikon("package")}${\u00E7("Malzeme koy")}</button>
          ${yetki("pay")?`<button class="dugme sade kucuk-d" id="muzik-kamu-bagis" ${Number(t.free??0)>0?"":"disabled"}>${ikon("landmark")}${\u00E7("Kamuya ba\u011F\u0131\u015F")}</button>`:""}
        </div>
        <p class="kucuk">${\u00E7("Kasaya konan kredi ve malzeme grubun olur, geri al\u0131nmaz. Konser ayr\u0131l\u0131nca kira ve malzeme kasada ayr\u0131l\u0131r; bilet gelirinden \xF6nce bunlar\u0131n kar\u015F\u0131l\u0131\u011F\u0131 kasaya d\xF6ner, kala\
n k\xE2r kadroya pay plan\u0131yla b\xF6l\xFCn\xFCr. Grup da\u011F\u0131l\u0131rsa kasa kalan \xFCyelere e\u015Fit b\xF6l\xFCn\xFCr.")}</p>
        ${defter.length?`<div class="gunluk" id="muzik-defter">${defter.map(l=>`<div class="gunluk-oge"><time>${esc(zamanOnce(l.at))}</time><b>${satir(l)}</b></div>`).join("")}</div>`:`<p class="bos">${\u00E7(
"Hen\xFCz kasaya kredi konmad\u0131.")}</p>`}</section>`}const benimYerim=c=>{if(!["reserved","locked"].includes(c.status))return"";if(!(c.lineup??[]).some(l=>l.character_id===ben().id))return`<p clas\
s="kucuk konser-not">${\u00E7("Bu konserin kadrosunda de\u011Filsin; konser sen gruba kat\u0131lmadan \xF6nce ayr\u0131ld\u0131.")}</p>`;const burada=(v.m.me?.region_id??null)===c.region_id;return`<p \
class="kucuk konser-not${burada?"":" uyari"}">${ikon("map-pin")} ${burada?\u00E7("Konserin \u015Fehrindesin; konser saatinde burada ol."):\u00E7("Konser saatinde {sehir} \u015Fehrinde olmal\u0131s\u0131n (\u015Fimdi {sim\
di}).",{sehir:esc(bolgeAdi(c.region_id)),simdi:esc(v.m.me?.region_id?bolgeAdi(v.m.me.region_id):"")})}</p>`};function konserlerHtml(b){const l=b.concerts??[],bekleyen2=l.filter(c=>c.status==="reserved"||
c.status==="locked"),biten=l.filter(c=>!(c.status==="reserved"||c.status==="locked")),K=R().concert??{};return`<section class="kart" id="muzik-konserler"><div class="kart-bas"><div><p class="ust-yazi"\
>${\u00E7("Konserler")}</p>
          <h2 class="b2">${bekleyen2.length?\u00E7("{n} konser ayr\u0131ld\u0131",{n:bekleyen2.length}):\u00E7("Ayr\u0131lm\u0131\u015F konser yok")}</h2></div>
          ${yetki("rehearse")?`<button class="dugme altin kucuk-d" id="muzik-konser-ayir" ${bekleyen2.length>=Number(K.pendingPerBand??3)?"disabled":""}>${ikon("calendar")}${\u00E7("Konser ay\u0131r")}\
</button>`:`<span class="ik-kutu">${ikon("mic-vocal")}</span>`}</div>
        ${yetki("rehearse")&&b.pay&&!b.pay.fresh?`<div class="bilgi-kutusu" style="margin-bottom:10px">${ikon("circle-alert")}<span>${\u00E7("Konser ay\u0131rmak i\xE7in pay plan\u0131 bug\xFCnk\xFC \xFCyelerle yap\u0131lm\u0131\u015F ol\
mal\u0131: y\xF6netici yeni plan\u0131 \xF6nersin, herkes kabul etsin.")}</span></div>`:""}
        ${bekleyen2.length?`<div class="konser-satirlar">${bekleyen2.map(c=>konserSatiri(c,{git:!0,iptal:yetki("rehearse")})+benimYerim(c)).join("")}</div>`:`<p class="bos">${yetki("rehearse")?\u00E7(
"Repertuvardan en az {n} \u015Fark\u0131yla bir \u015Fehrin mek\xE2n\u0131na konser ay\u0131r. Kira ve sahne malzemesi grubun kasas\u0131ndan ayr\u0131l\u0131r.",{n:Number(K.setlist?.min??3)}):\u00E7(
"Y\xF6netici ya da vekil konser ay\u0131r\u0131nca burada g\xF6r\xFCrs\xFCn.")}</p>`}
        ${biten.length?`<details class="birlik-ac" data-ac="konserler"><summary>${\u00E7("Son konserler \xB7 {n}",{n:biten.length})}</summary>
          <div class="konser-satirlar" style="margin-top:10px">${biten.map(c=>konserSatiri(c,{git:!0})).join("")}</div></details>`:""}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Konser saatinde konserin \u015Fehrinde bulunan (yolda ve g\xF6zalt\u0131nda olmayan) kadro sahneye \xE7\u0131kar; \xE7evrimi\xE7i olmak gerekmez. Ba\u015Flang\u0131\xE7tan {dk} dakik\
a \xF6nce kilitlenir: kadro, paylar ve vergi sabitlenir, iptal edilemez.",{dk:Number(K.lockMinutes??60)})}</p></section>`}function enstrumanHtml(){const e=v.m.instrument??{},I=R().concert?.instrument??
{},acik=e.open,stok=e.stock??{},dayan=Number(I.durability??30),puan={1:60,2:80,3:100,...I.qualityScore??{}};return`<section class="kart" id="muzik-enstruman"><div class="kart-bas"><div><p class="ust-y\
azi">${\u00E7("Enstr\xFCman\u0131n")}</p>
          <h2 class="b2">${acik?\u00E7("Sahnede: {q}. kalite enstr\xFCman",{q:Number(acik.quality)}):\u00E7("Sahnede enstr\xFCman\u0131n yok")}</h2></div><span class="ik-kutu">${ikon("guitar")}</span>\
</div>
        ${acik?`<div class="muzik-ilerleme konser-asinma" role="img" aria-label="${esc(\u00E7("A\u015F\u0131nma {a} / {d}",{a:Number(acik.wear),d:dayan}))}"><span style="width:${Math.round(Number(acik.
wear)/dayan*100)}%"></span></div>
            <p class="kucuk">${\u00E7("A\u015F\u0131nma {a} / {d} \xB7 konser puan\u0131 {p} \xB7 {n} konser \xE7ald\u0131",{a:Number(acik.wear),d:dayan,p:Number(acik.score??0),n:Number(acik.concerts??
0)})}</p>
            <div class="oneri-dugmeler">
              ${Number(acik.wear)>0?`<button class="dugme kucuk-d" id="muzik-enstruman-onar" ${Number(e.kits??0)>0?"":"disabled"}>${ikon("wrench")}${\u00E7("Onar")}</button>`:`<button class="dugme sad\
e kucuk-d" id="muzik-enstruman-kaldir">${\u00E7("Sahneden kald\u0131r")}</button>`}
              <button class="dugme sade kucuk-d" id="muzik-enstruman-at">${ikon("trash")}${\u00E7("At")}</button></div>`:`<div class="konser-stok">${[1,2,3].map(q=>`<div class="konser-stok-oge"><span>${\u00E7(
"{q}. kalite",{q})}</span><b>${sayi(Number(stok[q]??0))}</b>
              <small>${\u00E7("puan {p}",{p:Number(puan[q]??0)})}</small>
              ${Number(stok[q]??0)>0?`<button class="dugme kucuk-d" data-enstruman-ac="${q}">${\u00E7("Sahneye \xE7\u0131kar")}</button>`:""}</div>`).join("")}</div>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Bak\u0131m kiti {k} \xB7 sahne malzemen {s}",{k:sayi(Number(e.kits??0)),s:sayi(Number(e.stage??0))})}</p>
        <p class="kucuk">${\u00E7("Konser kalitesinin %{w}'i enstr\xFCman bak\u0131m\u0131d\u0131r: sahnedeki enstr\xFCman\u0131n puan\u0131 (1., 2. ve 3. kalitede {p1}, {p2}, {p3}) a\u015F\u0131nd\u0131k\xE7a d\xFC\u015Fer. Her konser 1 a\u015F\u0131nd\u0131r\u0131r; {d} a\u015F\u0131n\
mada k\u0131r\u0131l\u0131r. Bir bak\u0131m kiti {r} a\u015F\u0131nmay\u0131 giderir. Sahnedeki enstr\xFCman sat\u0131lamaz.",{w:Number(R().weights?.enstruman_bakimi??10),p1:puan[1],p2:puan[2],p3:puan[3],
d:dayan,r:Number(I.repairPerKit??10)})}</p></section>`}function dukkanHtml(){const s=v.m.shop;if(!s)return"";const bugun=s.today??{},sinir=s.per_day??{},satir=(item,ad,ik,aciklama)=>`<div class="liste\
-satir"><span class="liste-ikon"><span class="ozet-ikon">${ikon(ik)}</span></span>
          <div><span class="tur">${\u00E7("{kr} kredi \xB7 bug\xFCn {n} / {m}",{kr:kr(s.prices?.[item]??0),n:Number(bugun[item]??0),m:Number(sinir[item]??0)})}</span><b>${esc(ad)}</b>
            <div class="alt">${esc(aciklama)}</div></div>
          <button class="dugme kucuk-d" data-dukkan="${item}" ${Number(bugun[item]??0)>=Number(sinir[item]??0)?"disabled":""}>${ikon("plus")}${\u00E7("Al")}</button></div>`;return`<section class="kart\
" id="muzik-dukkan"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Devletin m\xFCzik d\xFCkk\xE2n\u0131")}</p><h2 class="b2">${\u00E7("D\xFCkk\xE2n")}</h2></div><span class="ik-kutu">${ikon(
"store")}</span></div>
        <div class="liste">${satir("enstruman",\u00E7("Enstr\xFCman (1. kalite)"),"guitar",\u00E7("Kendin i\xE7in."))}
          ${satir("sahne",\u00E7("Sahne malzemesi"),"package",yetki("rehearse")?\u00E7("Kendin i\xE7in ya da grubun kasas\u0131yla (konserin malzemesi)."):\u00E7("Kendin i\xE7in; kasaya koyabilirsin."))}\
</div>
        <p class="kucuk" style="margin-top:8px">${\u00E7("Bedel yak\u0131l\u0131r (devletin d\xFCkk\xE2n\u0131); g\xFCnl\xFCk s\u0131n\u0131r ki\u015Fi ba\u015F\u0131nad\u0131r. 2. ve 3. kalite enstr\xFCman \xFCretimde yap\u0131l\u0131r ve pazarda sat\u0131l\u0131r.")}\
</p></section>`}function biletlerHtml(){const l=v.m.tickets??[],eski=v.m.tickets_past??[];return`<section class="kart" id="muzik-biletler"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Bile\
tlerim")}</p>
          <h2 class="b2">${l.length?\u00E7("{n} bilet",{n:l.length}):\u00E7("Biletin yok")}</h2></div><span class="ik-kutu">${ikon("ticket")}</span></div>
        ${l.length?`<div class="konser-satirlar">${l.map(c=>konserSatiri(c,{git:!0})).join("")}</div>`:`<p class="bos">${\u00E7("\u015Eehirlerin konserlerini \u015Eehrim \u2192 Sahne'de g\xF6r\xFCr, bilet al\u0131rs\u0131n.")}\
</p>`}
        ${eski.length?`<details class="birlik-ac" data-ac="biletler"><summary>${\u00E7("Ge\xE7mi\u015F biletler \xB7 {n}",{n:eski.length})}</summary>
          <div class="konser-satirlar" style="margin-top:10px">${eski.map(c=>konserSatiri(c,{git:!0})).join("")}</div></details>`:""}
        <div class="satir" style="margin-top:10px"><button class="dugme ikincil kucuk-d" data-git="sehir/sahne">${ikon("drama")}${\u00E7("\u015Eehrin sahnesi")}</button></div></section>`}function ayarHtml(b){
const yon=benimRol()==="manager",r=R().band??{},simdi=Date.now(),sonra=(at,saat2)=>at?Date.parse(at)+Number(saat2)*36e5:0,adBekle=sonra(b.renamed_at,r.name?.renameCooldownH??168),turBekle=sonra(b.genre_at,
r.genreChangeCooldownH??336),usBekle=sonra(b.base_at,r.baseMoveCooldownH??168),burada=(v.m.me?.region_id??null)===b.base_region_id;return`<section class="kart" id="muzik-ayar"><div class="kart-bas"><d\
iv><p class="ust-yazi">${\u00E7("Rol\xFCn: {rol}",{rol:esc(MUZIK_YETKI[benimRol()]??"")})}</p><h2 class="b2">${\u00E7("Grubun")}</h2></div>
          <span class="ik-kutu">${ikon(MUZIK_YETKI_IK[benimRol()]??"user-round")}</span></div>
        <p class="aciklama">${esc(MUZIK_YETKI_ACIKLAMA[benimRol()]??"")}</p>
        <p class="kucuk">${\u00E7("\xDCs \u015Fehri: {sehir}. Ortak provalar burada yap\u0131l\u0131r; konser her \u015Fehirde ayr\u0131labilir.",{sehir:esc(bolgeAdi(b.base_region_id))})}</p>
        <p class="kucuk">${\u00E7("Y\xF6netici ayr\u0131l\u0131r, hesab\u0131n\u0131 siler ya da {n} g\xFCn oyuna girmezse y\xF6netim vekile, vekil yoksa en eski \xFCyeye ge\xE7er.",{n:Number(r.managerAbsentDays??
14)})}</p>
        ${(()=>{const tema=v.m.stage_theme&&typeof magazaUrun=="function"?magazaUrun(v.m.stage_theme):null;return`<div class="muzik-tema">${tema?`<span class="magaza-resim kucuk-o">${magazaSahneSvg(tema)}\
</span>`:""}<p class="kucuk">${tema?\u00E7("Sahne temas\u0131: {ad}. Konserde \u0131\u015F\u0131klar, ekran ve sahne bu temayla.",{ad:esc(\u00E7v(tema.name))}):\u00E7("Sahne temas\u0131 yok: konserde t\xFCr\xFCn\
 \u0131\u015F\u0131klar\u0131 yanar.")}${yon?" "+\u00E7("Temay\u0131 Ma\u011Faza'dan takars\u0131n."):""}</p></div>`})()}
        <div class="oneri-dugmeler" style="margin-top:12px">
          ${yon?`<button class="dugme ikincil kucuk-d" id="muzik-tema">${ikon("drama")}${\u00E7("Sahne temas\u0131")}</button>`:""}
          ${yon?`<button class="dugme ikincil kucuk-d" id="muzik-duzenle">${ikon("notebook-pen")}${\u00E7("Ad ve t\xFCr")}</button>
            <button class="dugme ikincil kucuk-d" id="muzik-us" ${burada||usBekle>simdi?"disabled":""}>${ikon("map-pin")}${\u00E7("\xDCss\xFC bulundu\u011Fum \u015Fehre ta\u015F\u0131")}</button>`:""}\

          <button class="dugme sade kucuk-d" id="muzik-ayril">${ikon("door-open")}${\u00E7("Gruptan ayr\u0131l")}</button>
          ${yon?`<button class="dugme sade kucuk-d" id="muzik-dagit">${ikon("trash")}${\u00E7("Grubu da\u011F\u0131t")}</button>`:""}
        </div>
        ${yon&&(adBekle>simdi||turBekle>simdi||usBekle>simdi)?`<p class="kucuk">${[adBekle>simdi?\u00E7("Ad yeniden de\u011Fi\u015Fir: {zaman}.",{zaman:esc(saatYaz(new Date(adBekle).toISOString()))}):
"",turBekle>simdi?\u00E7("T\xFCr yeniden de\u011Fi\u015Fir: {zaman}.",{zaman:esc(saatYaz(new Date(turBekle).toISOString()))}):"",usBekle>simdi?\u00E7("\xDCs yeniden ta\u015F\u0131n\u0131r: {zaman}.",{
zaman:esc(saatYaz(new Date(usBekle).toISOString()))}):""].filter(Boolean).join(" ")}</p>`:""}</section>`}function grupHtml(b){return`<div id="prova-oda-yer"></div>
        <div class="izgara iki">
          <div class="yigin">${konserlerHtml(b)}${turneKartHtml(b,R().tour,yetki("rehearse"))}${festivalKartHtml(v.fv,b,yetki("repertoire"))}${studyoKartHtml(b,v.m,RK())}${epKartHtml(b,yetki("repertoi\
re"),RK())}${sarkilarHtml(b)}${repertuvarHtml(b)}${provalarHtml(b)}</div>
          <div class="yigin">${uyelerHtml(b)}${enstrumanHtml()}${payHtml(b)}${kasaHtml(b)}${dukkanHtml()}${biletlerHtml()}${koleksiyonHtml(v.m)}${ayarHtml(b)}</div>
        </div>`}function ciz(){durdur();const girdi=$("#muzik-ara input",kap),odak=!!girdi&&document.activeElement===girdi;girdi&&(arama.q=girdi.value);const acikDetay=new Set($$("details[data-ac]",kap).
filter(x=>x.open).map(x=>x.dataset.ac)),kapaliDetay=new Set($$("details[data-ac]",kap).filter(x=>!x.open).map(x=>x.dataset.ac)),b=B();if(kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("M\xFCzik")}</p>
          ${b?`<h1 class="b1 birlik-baslik">${muzikAfis(b)}<span id="muzik-ad">${esc(b.name)}</span></h1>
            <p class="aciklama">${b.solo?\u00E7("Solo sanat\xE7\u0131 \xB7 {tur} \xB7 \xFCs {sehir}",{tur:esc(MUZIK_TUR[b.genre]??b.genre),sehir:esc(bolgeAdi(b.base_region_id))}):\u00E7("{tur} grubu \xB7\
 {n} \xFCye \xB7 \xFCs {sehir}",{tur:esc(MUZIK_TUR[b.genre]??b.genre),n:Number(b.members),sehir:esc(bolgeAdi(b.base_region_id))})}</p>`:`<h1 class="b1">${\u00E7("M\xFCzik")}</h1><p class="aciklama">${\u00E7(
"Bir gruba kat\u0131l ya da kendi grubunu kur: \u015Fark\u0131 yaz, prova et, sahneye \xE7\u0131k.")}</p>`}</div>
          ${b?`<span class="cip" id="muzik-rol">${ikon(MUZIK_YETKI_IK[benimRol()]??"user-round")}${esc(MUZIK_YETKI[benimRol()]??"")}</span>`:""}</div>
        ${b?grupHtml(b):bosHtml()}${b?ImzaGunu.yer("muzik"):""}</div>`,b){const yer=$("#prova-oda-yer",kap);yer&&(yer.replaceWith(oda.el),oda.yaz({b,ben:ben().id}))}else oda.birak();if(bagla(),odak){const g=$(
"#muzik-ara input",kap);g?.focus({preventScroll:!0}),g?.setSelectionRange?.(g.value.length,g.value.length)}for(const dt of $$("details[data-ac]",kap))acikDetay.has(dt.dataset.ac)&&(dt.open=!0),kapaliDetay.
has(dt.dataset.ac)&&(dt.open=!1);durdur=geriSay(kap,()=>setTimeout(()=>{kapandi||tazele()},gecikmeli(sayac)))}const sayac={n:0};async function islem(fn,args,mesaj,ik){try{const y=await Sunucu.yap(fn,args);
return mesaj&&tost(typeof mesaj=="function"?mesaj(y):mesaj,ik??"check"),y??!0}catch(e){return tost(hataMetni(e),"circle-alert"),null}finally{await tazele()}}const konusmaTazele=()=>{try{Konusma.ozetYukle?.().
catch(()=>{})}catch{}};function bagla(){muzikDinleBagla(kap),ImzaGunu.bagla(kap,"muzik",tazele);for(const b of $$("[data-profil]",kap))b.onclick=()=>profilAc(b.dataset.profil,()=>tazele());for(const b of $$(
"[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-grup-ac]",kap))b.onclick=()=>muzikKartiAc(b.dataset.grupAc);for(const b of $$("[data-davet-kabul]",kap))b.onclick=()=>{
const x=(v.m.invites??[]).find(q=>q.invite_id===b.dataset.davetKabul);pencereForm({ust:\u00E7("M\xFCzik"),baslik:\u00E7("Daveti kabul et: {grup}",{grup:x?.name??""}),onayAd:\u00E7("Kat\u0131l"),onayIkon:"\
eighth-notes",govde:`<p class="aciklama">${\u00E7("{tur} grubuna kat\u0131l\u0131rs\u0131n; \xF6teki davetlerin d\xFC\u015Fer. Ayn\u0131 anda tek grupta olabilirsin; ayr\u0131l\u0131rsan {n} saat ba\u015Fka gruba giremezsin.",
{tur:esc(MUZIK_TUR[x?.genre]??""),n:Number(R().band?.joinCooldownH??24)})}</p>
            ${rolSecimi("rol")}
            <p class="kucuk">${\u00E7("{tur} i\xE7in a\u011F\u0131rl\u0131klar: {agirlik}.",{tur:esc(MUZIK_TUR[x?.genre]??""),agirlik:esc(agirliklar(x?.genre))})}</p>`,is:async f=>{await Sunucu.yap("b\
and_invite_answer",{p_invite:b.dataset.davetKabul,p_accept:!0,p_stage_role:String(f.get("rol")??"")}),tost(\u00E7("Gruba kat\u0131ld\u0131n: {grup}.",{grup:x?.name??""}),"eighth-notes"),konusmaTazele(),
await tazele()}})};for(const b of $$("[data-davet-ret]",kap))b.onclick=()=>islem("band_invite_answer",{p_invite:b.dataset.davetRet,p_accept:!1,p_stage_role:null},\u00E7("Daveti reddettin."),"x");$("#m\
uzik-kur",kap)?.addEventListener("click",kur),konserSatirBagla(kap,()=>[...B()?.concerts??[],...v.m.tickets??[],...v.m.tickets_past??[]],()=>tazele()),turneBagla(kap,()=>tazele());const tp=$("#muzik-t\
urne-planla",kap);tp&&(tp.onclick=()=>turnePlanla(B(),R(),v.m.me,()=>tazele()));const ti=$("#muzik-turne-iptal",kap);if(ti&&(ti.onclick=()=>{const t=B()?.tour;t&&turneIptal(t,()=>tazele())}),epBagla(kap,
()=>tazele()),festivalBagla(kap,()=>v.fv,()=>tazele()),$("#muzik-festival-basvur",kap)?.addEventListener("click",()=>festivalBasvur(v.fv,()=>tazele())),$("#muzik-festival-cek",kap)?.addEventListener("\
click",()=>festivalCekil(v.fv,()=>tazele())),!!B()){for(const b of $$("[data-kayit-yap]",kap))b.onclick=()=>kayitYap(B(),v.m,RK(),b.dataset.kayitYap,()=>tazele());$("#muzik-ep-hazirla",kap)?.addEventListener(
"click",()=>epHazirla(B(),RK(),()=>tazele()));for(const b of $$("[data-ep-yayimla]",kap))b.onclick=()=>{const e=(B().eps??[]).find(x=>x.ep_id===b.dataset.epYayimla);e&&epYayimla(e,B(),()=>tazele())};for(const b of $$(
"[data-ep-sil]",kap))b.onclick=()=>{const e=(B().eps??[]).find(x=>x.ep_id===b.dataset.epSil);e&&epSil(e,()=>tazele())};$("#muzik-konser-ayir",kap)?.addEventListener("click",()=>konserAyir());for(const b of $$(
"[data-konser-iptal]",kap))b.onclick=()=>konserIptal(b.dataset.konserIptal);for(const b of $$("[data-enstruman-ac]",kap))b.onclick=()=>islem("instrument_open",{p_quality:Number(b.dataset.enstrumanAc)},
\u00E7("Enstr\xFCman\u0131n sahnede; konserlerde \xE7alars\u0131n."),"guitar");$("#muzik-enstruman-kaldir",kap)?.addEventListener("click",()=>islem("instrument_close",{p_discard:!1},\u00E7("Enstr\xFCman \
sahneden kald\u0131r\u0131ld\u0131; sto\u011Funa d\xF6nd\xFC."),"guitar")),$("#muzik-enstruman-at",kap)?.addEventListener("click",enstrumanAt),$("#muzik-enstruman-onar",kap)?.addEventListener("click",
enstrumanOnar);for(const b of $$("[data-dukkan]",kap))b.onclick=()=>dukkanAl(b.dataset.dukkan);$("#muzik-malzeme-bagis",kap)?.addEventListener("click",malzemeBagis),$("#muzik-kamu-bagis",kap)?.addEventListener(
"click",kamuBagis),$("#muzik-sarki-ac",kap)?.addEventListener("click",sarkiAc);for(const b of $$("[data-yaz]",kap))b.onclick=()=>yaz(b.dataset.yaz);for(const b of $$("[data-bitir]",kap))b.onclick=()=>{
const s=(B().drafts??[]).find(x=>x.song_id===b.dataset.bitir);pencere({ust:\u00E7("Beste"),baslik:\u00E7("\u015Eark\u0131y\u0131 bitir: {ad}",{ad:s?.title??""}),govde:`<p class="aciklama">${\u00E7("Bi\
tince kalite ({q}) ve besteci paylar\u0131 kilitlenir; \u015Fark\u0131 yer varsa repertuvara girer. Bir daha yaz\u0131lmaz.",{q:Number(s?.quality_now??0)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7(
"Bitir"),sinif:"altin",ikon:"check",is:()=>islem("song_finish",{p_song:b.dataset.bitir},y=>\u00E7("\u015Eark\u0131 bitti: {ad}, kalite {q}.",{ad:s?.title??"",q:Number(y?.quality??0)}),"star")}]})};for(const b of $$(
"[data-birak]",kap))b.onclick=()=>{const s=(B().drafts??[]).find(x=>x.song_id===b.dataset.birak);pencere({ust:\u00E7("Beste"),baslik:\u00E7("Tasla\u011F\u0131 b\u0131rak: {ad}",{ad:s?.title??""}),govde:`\
<p class="aciklama">${\u00E7("Taslak kapan\u0131r; yaz\u0131lan birimler geri gelmez.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("B\u0131rak"),sinif:"mercan",is:()=>islem("song_abandon",{p_song:b.
dataset.birak},\u00E7("Taslak b\u0131rak\u0131ld\u0131."),"trash")}]})};for(const b of $$("[data-rep-ekle]",kap))b.onclick=()=>islem("repertoire_add",{p_song:b.dataset.repEkle},\u00E7("\u015Eark\u0131 repertuva\
ra eklendi."),"scroll-text");for(const b of $$("[data-rep-cikar]",kap))b.onclick=()=>islem("repertoire_remove",{p_song:b.dataset.repCikar},\u00E7("\u015Eark\u0131 repertuvardan \xE7\u0131kar\u0131ld\u0131."),
"x");for(const b of $$("[data-calis]",kap))b.onclick=()=>calis(b.dataset.calis);$("#muzik-prova-ayir",kap)?.addEventListener("click",provaAyir);for(const b of $$("[data-katil]",kap))b.onclick=async()=>{
const h=(B().rehearsals??[]).find(x=>x.rehearsal_id===b.dataset.katil);h&&(b.disabled=!0,await islem("rehearsal_mark",{p_rehearsal:h.rehearsal_id,p_going:!h.mine},h.mine?\u00E7("Provaya kat\u0131lmayaca\u011F\u0131n\
\u0131 i\u015Faretledin; \xE7izelgen bo\u015Fald\u0131."):\u00E7("Provaya kat\u0131lacaks\u0131n: {zaman}. O saatte grubun \xFCs \u015Fehrinde ol.",{zaman:saatYaz(h.starts_at)}),"check"))};for(const b of $$(
"[data-prova-iptal]",kap))b.onclick=()=>pencere({ust:\u00E7("Ortak prova"),baslik:\u00E7("Provay\u0131 iptal et"),govde:`<p class="aciklama">${\u00E7("Prova kapan\u0131r; kat\u0131lacaklar\u0131n \xE7izelgesi bo\u015Fal\u0131r.")}\
</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\u0130ptal et"),sinif:"mercan",is:()=>islem("rehearsal_cancel",{p_rehearsal:b.dataset.provaIptal},\u00E7("Ortak prova iptal edildi."),"x")}]});$("#\
muzik-sahne-rol",kap)?.addEventListener("click",sahneRolu);for(const b of $$("[data-rol-ver]",kap))b.onclick=()=>rolVer(b.dataset.rolVer);for(const b of $$("[data-cikar]",kap))b.onclick=()=>{const m=(B().
members_list??[]).find(x=>x.character_id===b.dataset.cikar);pencere({ust:\u00E7("M\xFCzik"),baslik:\u00E7("Gruptan \xE7\u0131kar: {ad}",{ad:m?.name??""}),govde:`<p class="aciklama">${\u00E7("\xC7\u0131kar\u0131lan\
 ki\u015Finin bekleyen provalardaki yeri bo\u015Fal\u0131r; bekleyen pay \xF6nerisi d\xFC\u015Fer. {n} saat ba\u015Fka gruba giremez.",{n:Number(R().band?.joinCooldownH??24)})}</p>`,dugmeler:[{ad:\u00E7(
"Vazge\xE7")},{ad:\u00E7("\xC7\u0131kar"),sinif:"mercan",is:()=>islem("band_expel",{p_character:b.dataset.cikar},\u00E7("{ad} gruptan \xE7\u0131kar\u0131ld\u0131.",{ad:m?.name??""}),"door-open")}]})};
for(const b of $$("[data-davet-geri]",kap))b.onclick=()=>islem("band_invite_cancel",{p_invite:b.dataset.davetGeri},\u00E7("Davet geri \xE7ekildi."),"undo-2");$("#muzik-ara",kap)?.addEventListener("sub\
mit",async e=>{if(e.preventDefault(),arama.q=String(new FormData(e.target).get("q")??"").trim(),arama.q.length<2){tost(\u00E7("En az 2 harf yaz."),"circle-alert");return}try{const liste=await Sunucu.cagir(
"character_search",{p_query:arama.q});arama.sonuc=liste.filter(x=>x.character_id!==ben().id),ciz(),$("#muzik-ara-sonuc",kap)?.scrollIntoView({block:"nearest"})}catch(err){tost(hataMetni(err),"circle-a\
lert")}});for(const b of $$("[data-davet]",kap))b.onclick=async()=>{const x=arama.sonuc?.find(k=>k.character_id===b.dataset.davet);b.disabled=!0,await islem("band_invite",{p_character:b.dataset.davet},
\u00E7("{ad} davet edildi.",{ad:x?.name??""}),"user-round-plus")};$("#muzik-pay-oner",kap)?.addEventListener("click",payOner);for(const b of $$("[data-pay-kabul]",kap))b.onclick=()=>islem("band_pay_ac\
cept",{p_plan:b.dataset.payKabul},y=>y?.status==="active"?\u00E7("Pay plan\u0131 kabul edildi ve y\xFCr\xFCrl\xFC\u011Fe girdi."):\u00E7("Pay plan\u0131n\u0131 kabul ettin; \xF6tekilerin kabul\xFC bekleniyor."),
"percent");$("#muzik-bagis",kap)?.addEventListener("click",bagis),$("#muzik-duzenle",kap)?.addEventListener("click",duzenle),$("#muzik-tema",kap)?.addEventListener("click",()=>{try{sessionStorage.setItem(
"civora.magaza",JSON.stringify({tur:"sahne"}))}catch{}Kabuk.git("hayat/magaza")}),$("#muzik-us",kap)?.addEventListener("click",()=>pencere({ust:\u00E7("M\xFCzik"),baslik:\u00E7("\xDCss\xFC ta\u015F\u0131"),
govde:`<p class="aciklama">${\u00E7("Grubun \xFCss\xFC bulundu\u011Fun \u015Fehre ({sehir}) ta\u015F\u0131n\u0131r; ortak provalar burada yap\u0131l\u0131r. Haftada bir ta\u015F\u0131n\u0131r.",{sehir:esc(
v.m.me?.region_id?bolgeAdi(v.m.me.region_id):"")})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Ta\u015F\u0131"),sinif:"altin",ikon:"map-pin",is:()=>islem("band_edit",{p_name:null,p_genre:null,
p_move_base:!0},\u00E7("Grubun \xFCss\xFC ta\u015F\u0131nd\u0131."),"map-pin")}]})),$("#muzik-ayril",kap)?.addEventListener("click",ayril),$("#muzik-dagit",kap)?.addEventListener("click",dagit)}}function kur(){
const r=R(),b=r.band??{},ucret=Number(b.foundFeeCr??5e3);pencereForm({ust:\u00E7("M\xFCzik"),baslik:\u00E7("Grup kur"),onayAd:\u00E7("Kur ({kr} kredi)",{kr:kr(ucret)}),onayIkon:"guitar",govde:`<label \
class="alan"><span>${\u00E7("Grubun ad\u0131 (solo isen sahne ad\u0131n)")}</span><input name="ad" required minlength="${Number(b.name?.min??3)}" maxlength="${Number(b.name?.max??40)}" autocapitalize=\
"words" autocomplete="off">
            <small>${\u00E7("{min}\u2013{max} harf; d\xFCnyada e\u015Fsiz.",{min:Number(b.name?.min??3),max:Number(b.name?.max??40)})}</small></label>
          ${turSecimi("tur")}
          ${rolSecimi("rol")}
          <p class="kucuk">${\u00E7("T\xFCr\xFCn sahne rollerine a\u011F\u0131rl\u0131klar\u0131: pop'ta vokal, rock'ta telli ve ritim, cazda klavye, elektronikte klavye ve elektronik \xF6ne \xE7\u0131kar. Grup kurulunca bu a\u011F\u0131rl\u0131klar ek\
randa g\xF6r\xFCn\xFCr.")}</p>
          <p class="kucuk">${\u00E7("Kurulu\u015F bedeli {kr} kredi; hesab\u0131ndan d\xFC\u015F\xFCl\xFCr ve geri verilmez. \xDCs \u015Fehri bulundu\u011Fun \u015Fehirdir: {sehir}.",{kr:kr(ucret),sehir:esc(
v.m.me?.region_id?bolgeAdi(v.m.me.region_id):"")})}</p>`,is:async d=>{const ad=muzikTekSatir(d.get("ad"));if([...ad].length<Number(b.name?.min??3)||[...ad].length>Number(b.name?.max??40))throw new Error(
\u00E7("Ad {min}\u2013{max} harf olmal\u0131.",{min:Number(b.name?.min??3),max:Number(b.name?.max??40)}));await Sunucu.yap("band_found",{p_name:ad,p_genre:String(d.get("tur")??""),p_stage_role:String(
d.get("rol")??"")}),tost(\u00E7("Grubun kuruldu: {grup}. Y\xF6neticisi sensin.",{grup:ad}),"guitar"),Durum.ozet().catch(()=>{}),konusmaTazele(),await tazele()}})}function sarkiAc(){const b=B(),S=R().song??
{},sure0=S.durationS?.[b.genre]??[150,240],tempo0=S.tempo?.[b.genre]??[90,130],orta=a=>Math.round((Number(a[0])+Number(a[1]))/2),pf=pencereForm({ust:\u00E7("Beste \xB7 {tur}",{tur:MUZIK_TUR[b.genre]??
b.genre}),baslik:\u00E7("Yeni \u015Fark\u0131"),onayAd:\u00E7("Tasla\u011F\u0131 a\xE7"),onayIkon:"notebook-pen",govde:`<label class="alan"><span>${\u00E7("\u015Eark\u0131n\u0131n ad\u0131")}</span><i\
nput name="ad" required minlength="${Number(S.title?.min??2)}" maxlength="${Number(S.title?.max??48)}" autocomplete="off"></label>
          <label class="alan"><span>${\u00E7("Tema")}</span><select name="tema">${(S.themes??Object.keys(MUZIK_TEMA)).map(t=>`<option value="${esc(t)}">${esc(MUZIK_TEMA[t]??t)}</option>`).join("")}</s\
elect></label>
          <label class="alan"><span>${\u00E7("S\xFCre (saniye)")}</span><input name="sure" type="number" required min="${Number(sure0[0])}" max="${Number(sure0[1])}" step="5" value="${orta(sure0)}">
            <small id="muzik-sure-yazi">${\u00E7("{min}\u2013{max} saniye \xB7 \u015Fimdi {sure}",{min:Number(sure0[0]),max:Number(sure0[1]),sure:muzikSure(orta(sure0))})}</small></label>
          <label class="alan"><span>${\u00E7("Tempo (BPM)")}</span><input name="tempo" type="number" required min="${Number(tempo0[0])}" max="${Number(tempo0[1])}" step="1" value="${orta(tempo0)}">
            <small>${\u00E7("{tur} i\xE7in {min}\u2013{max} BPM",{tur:esc(MUZIK_TUR[b.genre]??b.genre),min:Number(tempo0[0]),max:Number(tempo0[1])})}</small></label>
          <label class="alan"><span>${\u00E7("Ton")}</span><select name="ton">${Array.from({length:Number(S.keys??12)},(_,i)=>`<option value="${i}">${esc(muzikTon(i))}</option>`).join("")}</select></l\
abel>
          <p class="kucuk">${\u00E7("\u015Eark\u0131n\u0131n t\xFCr\xFC grubun t\xFCr\xFCd\xFCr. Taslak a\xE7\u0131ld\u0131ktan sonra grubun her \xFCyesi yazabilir (en \xE7ok {n} yazar). {gun} g\xFCn yaz\u0131lmayan taslak d\xFC\u015Fer.",
{n:Number(S.maxWriters??4),gun:Number(S.draftExpiryDays??14)})}</p>`,is:async d=>{const ad=muzikTekSatir(d.get("ad")),s=Number(d.get("sure")),t=Number(d.get("tempo"));if(!Number.isInteger(s)||s<Number(
sure0[0])||s>Number(sure0[1]))throw new Error(\u00E7("S\xFCre {min}\u2013{max} saniye olmal\u0131.",{min:Number(sure0[0]),max:Number(sure0[1])}));if(!Number.isInteger(t)||t<Number(tempo0[0])||t>Number(
tempo0[1]))throw new Error(\u00E7("Tempo {min}\u2013{max} BPM olmal\u0131.",{min:Number(tempo0[0]),max:Number(tempo0[1])}));await Sunucu.yap("song_start",{p_title:ad,p_theme:String(d.get("tema")),p_duration:s,
p_tempo:t,p_key:Number(d.get("ton"))}),tost(\u00E7("Taslak a\xE7\u0131ld\u0131: {ad}. \u015Eimdi yazmaya ba\u015Fla.",{ad}),"notebook-pen"),await tazele()}}),g=$("input[name=sure]",pf.form),y=$("#muzi\
k-sure-yazi",pf.form);g?.addEventListener("input",()=>{y.textContent=\u00E7("{min}\u2013{max} saniye \xB7 \u015Fimdi {sure}",{min:Number(sure0[0]),max:Number(sure0[1]),sure:muzikSure(Number(g.value)||
0)})})}function yaz(id){const s=(B().drafts??[]).find(x=>x.song_id===id);if(!s)return;const S=R().song??{},kalan=Number(S.maxUnits??16)-Number(s.units),max=Math.min(Number(S.sessionUnits?.max??4),kalan),
beceri=Number(v.m.me?.music_skill??0),puan=Math.min(100,Number(S.point?.base??20)+Math.floor(Number(S.point?.perSkillPct??80)*beceri/100));pencereForm({ust:\u00E7("Beste \xB7 {ad}",{ad:s.title}),baslik:\u00E7(
"Yaz\u0131m oturumu"),onayAd:\u00E7("beste::Yaz"),onayIkon:"notebook-pen",govde:`${birimSecimi("birim",Number(S.sessionUnits?.min??1),Math.max(1,max),Math.min(2,max))}
          <p class="kucuk">${\u00E7("Becerin {b}: her birim {p} puan katar. Kalite, puanlar\u0131n toplam\u0131n\u0131n en az {tam} birime b\xF6l\xFCm\xFCd\xFCr.",{b:beceri,p:puan,tam:Number(S.fullUnits??
8)})}</p>
          <p class="kucuk">${esc(calismaYazi())}</p>
          <p class="kucuk">${\u00E7("Oturum s\xFCresince ba\u015Fka i\u015F yapamazs\u0131n. \u015Eark\u0131 {max} birime var\u0131nca kendili\u011Finden biter.",{max:Number(S.maxUnits??16)})}</p>`,is:async d=>{
const n=Number(d.get("birim")),y=await Sunucu.yap("song_write",{p_song:id,p_units:n});tost(y?.finished?\u00E7("\u015Eark\u0131 {max} birime vard\u0131 ve bitti: {ad}, kalite {q}.",{max:Number(S.maxUnits??
16),ad:s.title,q:Number(y.finish?.quality??0)}):\u00E7("{n} birim yazd\u0131n; \u015Fark\u0131n\u0131n kalitesi \u015Fimdi {q}. Oturumun biti\u015Fi: {zaman}.",{n,q:Number(y?.quality_now??0),zaman:saatYaz(
y?.ends_at)}),"notebook-pen"),Durum.ozet().catch(()=>{}),await tazele()}})}function calis(id){const s=(B().repertoire_list??[]).find(x=>x.song_id===id);if(!s)return;const H=R().rehearsal??{};pencereForm(
{ust:\u00E7("Ki\u015Fisel prova \xB7 {ad}",{ad:s.title}),baslik:\u00E7("Prova et"),onayAd:\u00E7("Prova et"),onayIkon:"repeat-2",govde:`${birimSecimi("birim",Number(H.sessionUnits?.min??1),Number(H.sessionUnits?.
max??4),2)}
          <p class="kucuk">${\u00E7("Bilgin \u015Fimdi {b}. Her birimde kalan pay\u0131n %{n}'i kadar artar.",{b:Number(s.my_level??0),n:Number(H.knowledgeGainPct??12)})}</p>
          <p class="kucuk">${esc(calismaYazi())}</p>`,is:async d=>{const y=await Sunucu.yap("music_practice",{p_song:id,p_units:Number(d.get("birim"))});tost(\u00E7("Prova ettin: {ad} bilgin {a} \u2192 {b}\
.",{ad:s.title,a:Number(y?.level_before??0),b:Number(y?.level??0)}),"repeat-2"),await tazele()}})}function provaAyir(){const b=B(),H=R().rehearsal??{},l=b.repertoire_list??[],yerel=t=>{const z=new Date(
t);return z.setMinutes(z.getMinutes()-z.getTimezoneOffset()),z.toISOString().slice(0,16)},en=Date.now()+(Number(H.leadMinutes??30)+1)*6e4,son=Date.now()+Number(H.horizonDays??7)*864e5-6e4,oneri=new Date(
Math.max(en,Date.now()+36e5));oneri.setMinutes(0,0,0),oneri.setHours(oneri.getHours()+1);const enCok=Number(H.songsMax??4);pencereForm({ust:\u00E7("Ortak prova \xB7 \xFCs {sehir}",{sehir:bolgeAdi(b.base_region_id)}),
baslik:\u00E7("Prova ay\u0131r"),onayAd:\u00E7("Ay\u0131r"),onayIkon:"calendar",govde:`<label class="alan"><span>${\u00E7("Ba\u015Flang\u0131\xE7")}</span><input name="zaman" type="datetime-local" req\
uired min="${yerel(en)}" max="${yerel(son)}" value="${yerel(oneri)}">
            <small>${\u00E7("En erken {dk} dakika, en ge\xE7 {gun} g\xFCn sonra.",{dk:Number(H.leadMinutes??30),gun:Number(H.horizonDays??7)})}</small></label>
          ${birimSecimi("birim",Number(H.sessionUnits?.min??1),Number(H.sessionUnits?.max??4),2)}
          <fieldset class="alan"><legend>${\u00E7("\u015Eark\u0131lar (en \xE7ok {n})",{n:enCok})}</legend><div class="radyo-liste">${l.map((s,i)=>`<label class="radyo"><input type="checkbox" name="sa\
rki" value="${esc(s.song_id)}" ${i<Math.min(2,enCok)?"checked":""}>
            <span><b>${esc(s.title)}</b><span class="kucuk">${\u00E7("grubun ortalamas\u0131 {o}",{o:Number(s.avg_level??0)})}</span></span></label>`).join("")}</div></fieldset>
          <p class="kucuk">${\u00E7("Ay\u0131ran kendili\u011Finden kat\u0131l\u0131r (\xE7izelgesi bo\u015Fsa). Birimler \u015Fark\u0131lara s\u0131rayla gider.")}</p>`,is:async d=>{const z=new Date(
String(d.get("zaman")??""));if(Number.isNaN(z.getTime()))throw new Error(\u00E7("Ba\u015Flang\u0131\xE7 zaman\u0131n\u0131 se\xE7."));const sarkilar=d.getAll("sarki").map(String);if(!sarkilar.length||
sarkilar.length>enCok)throw new Error(\u00E7("1\u2013{n} \u015Fark\u0131 se\xE7.",{n:enCok}));await Sunucu.yap("rehearsal_book",{p_starts_at:z.toISOString(),p_units:Number(d.get("birim")),p_songs:sarkilar}),
tost(\u00E7("Ortak prova ayr\u0131ld\u0131: {zaman}.",{zaman:saatYaz(z.toISOString())}),"calendar"),await tazele()}})}function sahneRolu(){const b=B();b&&pencereForm({ust:\u00E7("M\xFCzik"),baslik:\u00E7(
"Sahne rol\xFCm"),onayAd:\u00E7("Kaydet"),onayIkon:"eighth-notes",govde:`${rolSecimi("rol",b.me?.stage_role)}
          <p class="kucuk">${\u00E7("{tur} i\xE7in a\u011F\u0131rl\u0131klar: {agirlik}. Her rol bir kez say\u0131l\u0131r; ayn\u0131 rol\xFC iki ki\u015Fi alabilir.",{tur:esc(MUZIK_TUR[b.genre]??b.genre),
agirlik:esc(agirliklar(b.genre))})}</p>`,is:async d=>{const r=String(d.get("rol")??"");if(r===b.me?.stage_role)return;const y=await Sunucu.yap("band_stage_role",{p_stage_role:r});tost(\u00E7("Sahne ro\
l\xFCn: {rol}. Sahne uyumu %{u}.",{rol:MUZIK_ROL[r]??r,u:Math.round(Number(y?.coverage_ppm??0)/1e4)}),MUZIK_ROL_IK[r]??"eighth-notes"),await tazele()}})}function rolVer(kimlik){const m=(B().members_list??
[]).find(x=>x.character_id===kimlik);if(!m)return;const secenekler=["deputy","member"].map(rol=>`<label class="radyo"><input type="radio" name="rol" value="${rol}" ${m.role===rol?"checked":""}>
          <span><b>${ikon(MUZIK_YETKI_IK[rol])} ${esc(MUZIK_YETKI[rol])}</b><span class="kucuk">${esc(MUZIK_YETKI_ACIKLAMA[rol])}${rol==="deputy"?" "+\u00E7("Tek vekil olur; eskisi \xFCye olur."):""}<\
/span></span></label>`).join("");pencereForm({ust:\u00E7("M\xFCzik"),baslik:\u00E7("Rol ver: {ad}",{ad:m.name}),onayAd:\u00E7("Kaydet"),onayIkon:"star",govde:`<div class="radyo-liste">${secenekler}
            <label class="radyo"><input type="radio" name="rol" value="manager"><span><b>${ikon("crown")} ${\u00E7("Y\xF6netimi devret")}</b>
              <span class="kucuk">${\u00E7("{ad} y\xF6netici olur, sen \xFCye olursun. Geri alamazs\u0131n.",{ad:esc(m.name)})}</span></span></label></div>`,is:async d=>{const rol=String(d.get("rol")??
"");!rol||rol===m.role||(await Sunucu.yap("band_role",{p_character:kimlik,p_role:rol}),tost(rol==="manager"?\u00E7("Y\xF6netimi {ad} adl\u0131 \xFCyeye devrettin.",{ad:m.name}):\u00E7("{ad} art\u0131k {rol\
}.",{ad:m.name,rol:MUZIK_YETKI[rol]}),rol==="manager"?"crown":"star"),await tazele())}})}function payOner(){const uyeler=B().members_list??[],n=uyeler.length,esit=Math.floor(1e6/n),bas=uyeler.map((m,i)=>esit+
(i<1e6-esit*n?1:0)),yaz2=ppm=>(ppm/1e4).toLocaleString(DIL.yerel,{maximumFractionDigits:4}),pf=pencereForm({ust:\u00E7("Pay plan\u0131"),baslik:\u00E7("Yeni \xF6neri"),onayAd:\u00E7("\xD6ner"),onayIkon:"\
percent",govde:`<p class="aciklama">${\u00E7("Her \xFCyenin konser gelirinden pay\u0131n\u0131 yaz; toplam tam %100 olmal\u0131. B\xFCt\xFCn \xFCyeler kabul edince y\xFCr\xFCrl\xFC\u011Fe girer.")}</p\
>
          ${uyeler.map((m,i)=>`<label class="alan"><span>${esc(m.name)} \xB7 ${esc(MUZIK_ROL[m.stage_role]??"")}</span>
            <input name="pay-${esc(m.character_id)}" inputmode="decimal" required value="${esc(yaz2(bas[i]))}" autocomplete="off" data-pay-girdi></label>`).join("")}
          <p class="kucuk" id="muzik-pay-toplam"></p>`,is:async d=>{const paylar=uyeler.map(m=>({id:m.character_id,ppm:yuzdePpm(d.get("pay-"+m.character_id))}));if(paylar.some(p=>!Number.isFinite(p.ppm)))
throw new Error(\u00E7("Paylar\u0131 y\xFCzde olarak yaz (\xF6r. 25 ya da 12,5)."));if(paylar.reduce((t,p)=>t+p.ppm,0)!==1e6)throw new Error(\u00E7("Paylar\u0131n toplam\u0131 tam %100 olmal\u0131."));
const y=await Sunucu.yap("band_pay_propose",{p_shares:paylar});tost(y?.status==="active"?\u00E7("Pay plan\u0131 y\xFCr\xFCrl\xFC\u011Fe girdi."):\u00E7("Pay plan\u0131 \xF6nerildi; \xFCyelerin kabul\xFC bekleniyor."),
"percent"),await tazele()}}),toplam=()=>{const t=$$("[data-pay-girdi]",pf.form).reduce((s,g)=>s+(yuzdePpm(g.value)||0),0),y=$("#muzik-pay-toplam",pf.form);y&&(y.textContent=\u00E7("Toplam: {t}",{t:muzikYuzde(
t)}))};for(const g of $$("[data-pay-girdi]",pf.form))g.addEventListener("input",toplam);toplam()}function bagis(){const r=R().band??{},benim=Durum.v.ozet?.balances?.find(x=>x.asset==="CR")?.spendable??
0;pencereForm({ust:\u00E7("Grubun kasas\u0131"),baslik:\u00E7("Kasaya koy"),onayAd:\u00E7("Koy"),onayIkon:"hand-coins",govde:`<label class="alan"><span>${\u00E7("Kredi")}</span><input name="miktar" in\
putmode="decimal" required autocomplete="off"><small>${\u00E7("Sende {kr} kredi.",{kr:kr(benim)})}</small></label>
          <div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("Kasaya konan kredi grubun olur ve geri al\u0131nmaz. En az {kr} kredi.",{kr:kr(Number(r.donationMinCr??100))})}</span></div>`,
is:async d=>{const n=krediAlt(d.get("miktar"));if(!Number.isFinite(n)||n<=0)throw new Error(\u00E7("Kredi miktar\u0131n\u0131 yaz (\xF6r. 25 ya da 12,50)."));await Sunucu.yap("band_donate",{p_amount:n}),
tost(\u00E7("Kasaya {kr} kredi koydun.",{kr:kr(n)}),"hand-coins"),Durum.ozet().catch(()=>{}),await tazele()}})}function duzenle(){const b=B(),r=R().band??{};pencereForm({ust:\u00E7("M\xFCzik"),baslik:\u00E7(
"Ad ve t\xFCr"),onayAd:\u00E7("Kaydet"),onayIkon:"notebook-pen",govde:`<label class="alan"><span>${\u00E7("Grubun ad\u0131")}</span><input name="ad" required minlength="${Number(r.name?.min??3)}" maxl\
ength="${Number(r.name?.max??40)}" value="${esc(b.name)}" autocomplete="off"></label>
          ${turSecimi("tur",b.genre)}
          <p class="kucuk">${\u00E7("Ad haftada bir, t\xFCr {n} g\xFCnde bir de\u011Fi\u015Fir. T\xFCr de\u011Fi\u015Fince yeni \u015Fark\u0131lar yeni t\xFCrde a\xE7\u0131l\u0131r; bitmi\u015F \u015Fark\u0131lar t\xFCr\xFCn\xFC korur.",
{n:Math.round(Number(r.genreChangeCooldownH??336)/24)})}</p>`,is:async d=>{const ad=muzikTekSatir(d.get("ad")),tur=String(d.get("tur")??"");ad===b.name&&tur===b.genre||(await Sunucu.yap("band_edit",{p_name:ad!==
b.name?ad:null,p_genre:tur!==b.genre?tur:null,p_move_base:!1}),tost(\u00E7("Grubun bilgileri kaydedildi."),"notebook-pen"),konusmaTazele(),await tazele())}})}function ayril(){const b=B(),yon=benimRol()===
"manager",tek=(b.members_list??[]).length<=1;pencere({ust:\u00E7("M\xFCzik"),baslik:\u00E7("Gruptan ayr\u0131l"),govde:`<p class="aciklama">${\u00E7("Bekleyen provalardaki yerin bo\u015Fal\u0131r; yazd\u0131\u011F\u0131n \u015Fark\
\u0131lar\u0131n besteci pay\u0131 sende kal\u0131r. {n} saat ba\u015Fka gruba giremezsin.",{n:Number(R().band?.joinCooldownH??24)})}</p>
          ${yon?`<p class="kucuk" style="margin-top:8px">${tek?\u00E7("Grubun tek \xFCyesisin: ayr\u0131l\u0131rsan grup da\u011F\u0131l\u0131r, kasas\u0131 sana kal\u0131r."):\u00E7("Y\xF6neticisin: ayr\
\u0131l\u0131nca y\xF6netim vekile, vekil yoksa en eski \xFCyeye ge\xE7er. \u0130stersen \xF6nce y\xF6netimi devret.")}</p>`:""}`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Ayr\u0131l"),sinif:"mer\
can",ikon:"door-open",is:async()=>{await islem("band_leave",{},\u00E7("Gruptan ayr\u0131ld\u0131n."),"door-open")&&konusmaTazele()}}]})}function dagit(){pencere({ust:\u00E7("M\xFCzik"),baslik:\u00E7("\
Grubu da\u011F\u0131t"),govde:`<p class="aciklama">${\u00E7("Grup kapan\u0131r: \xFCyelikler biter, taslaklar ve bekleyen provalar kapan\u0131r; kasa \xFCyelere e\u015Fit b\xF6l\xFCn\xFCr. Bitmi\u015F \u015Fark\u0131lar ve besteci paylar\u0131 kal\u0131r.\
 Geri al\u0131namaz.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Da\u011F\u0131t"),sinif:"mercan",ikon:"trash",is:async()=>{await islem("band_dissolve",{},\u00E7("Grubu da\u011F\u0131tt\u0131n."),
"trash")&&konusmaTazele()}}]})}async function konserAyir(bolgeIlk=null){const b=B();if(!b)return;const K=R().concert??{},rep=b.repertoire_list??[],enAz=Number(K.setlist?.min??3),enCok=Number(K.setlist?.
max??12);if(rep.length<enAz){tost(\u00E7("Konser i\xE7in repertuvarda en az {n} \u015Fark\u0131 olmal\u0131.",{n:enAz}),"circle-alert");return}const sehirler=[...new Set([bolgeIlk,b.base_region_id,v.m.
me?.region_id].filter(Boolean))];let veri;try{veri=Object.fromEntries(await Promise.all(sehirler.map(async x=>[x,await Sunucu.cagir("city_concerts",{p_region:x})])))}catch(e){tost(hataMetni(e),"circle\
-alert");return}const sahneBedel=Number(K.shop?.sahneCr??800);await Promise.all(sehirler.map(async x=>{const l=await MekanYolu.kulupler(x).catch(()=>[]),sistem=(veri[x].venues??[]).find(m=>m.venue==="\
kulup");veri[x].kulupler=(l??[]).map(c=>({venue:"kulup:"+c.venue_id,venue_id:c.venue_id,ad:c.name,owner:c.owner,open:!!sistem?.open,min_level:sistem?.min_level??2,capacity:Number(c.capacity),rent_cr:Number(
c.rent_cr),stage_units:Number(c.stage_units),fit:c.fit??{},cost_cr:Number(c.rent_cr)+Number(c.stage_units)*sahneBedel,style:c.style}))}));const mekanBul=(d,deger)=>[...d.venues??[],...d.kulupler??[]].
find(x=>x.venue===deger),mekanAd=(d,deger)=>mekanBul(d,deger)?.ad??konserMekanAdi(deger),vergi={};await Promise.all([...new Set(Object.values(veri).map(x=>x.country_id).filter(Boolean))].map(async u=>{
try{vergi[u]=Number((await Sunucu.cagir("country_overview",{p_country:u}))?.sales_tax_ppm??0)}catch{vergi[u]=null}}));const yerel=t=>{const z=new Date(t);return z.setMinutes(z.getMinutes()-z.getTimezoneOffset()),
z.toISOString().slice(0,16)},en=Date.now()+(Number(K.leadMinutes??120)+1)*6e4,son=Date.now()+Number(K.horizonDays??7)*864e5-6e4,oneri=new Date(en+30*6e4);oneri.setMinutes(0,0,0),oneri.setHours(Math.max(
oneri.getHours()+1,20)),oneri.getTime()>son&&oneri.setTime(en);const sureler=K.durationsMin??[60,90,120],secili=[...rep].sort((a,c)=>Number(c.avg_level??0)-Number(a.avg_level??0)).slice(0,enAz).map(x=>x.
song_id),sehirAd=x=>x===b.base_region_id?\u00E7("\xDCs \u015Fehri: {sehir}",{sehir:bolgeAdi(x)}):x===v.m.me?.region_id?\u00E7("Bulundu\u011Fun \u015Fehir: {sehir}",{sehir:bolgeAdi(x)}):bolgeAdi(x),mekanlarHtml=x=>{
const d=veri[x];if(d.war)return`<div class="hata-kutusu">${ikon("swords")}<span>${\u00E7("Bu \u015Fehir sava\u015F b\xF6lgesi: \u015Fimdilik konser ayr\u0131lmaz.")}</span></div>`;const ilkAcik=(d.venues??
[]).find(m=>m.open)?.venue;return`<div class="radyo-liste">${(d.venues??[]).map(m=>`<label class="radyo${m.open?"":" kapali"}"><input type="radio" name="mekan" value="${esc(m.venue)}" ${m.open?"":"dis\
abled"} ${m.venue===ilkAcik?"checked":""}>
            <span><b>${ikon(KONSER_MEKAN[m.venue]?.ik??"drama")} ${esc(konserMekanAdi(m.venue))}</b><span class="kucuk">${m.open?\u00E7("{n} ki\u015Filik \xB7 kira {kr} kredi \xB7 {s} sahne malzemesi \xB7 t\xFCr\xFCne uy\
umu %{u}",{n:sayi(m.capacity),kr:kr(m.rent_cr),s:Number(m.stage_units),u:Math.round(Number(m.fit?.[b.genre]??0)/1e4)}):\u00E7("\u015Eehir {s}. seviyeye b\xFCy\xFCy\xFCnce a\xE7\u0131l\u0131r.",{s:Number(
m.min_level)})}</span></span></label>`).join("")}
            ${(d.kulupler??[]).filter(m=>m.open).map(m=>`<label class="radyo"><input type="radio" name="mekan" value="${esc(m.venue)}">
              <span><b>${ikon("headphones")} ${esc(m.ad)}</b><span class="kucuk">${esc(\u00E7("Oyuncunun kul\xFCb\xFC (sahibi {ad}, tarz\u0131 {tarz}) \xB7 {n} ki\u015Filik \xB7 kira {kr} kredi kul\xFCb\xFCn kasas\u0131na \xB7 {s} sahne\
 malzemesi \xB7 t\xFCr\xFCne uyumu %{u}",{ad:m.owner??"",tarz:MUZIK_TUR[m.style]??m.style??"",n:sayi(m.capacity),kr:kr(m.rent_cr),s:Number(m.stage_units),u:Math.round(Number(m.fit?.[b.genre]??0)/1e4)}))}\
</span></span></label>`).join("")}</div>`},form=pencereForm({ust:\u00E7("Konser \xB7 {grup}",{grup:b.name}),baslik:\u00E7("Konser ay\u0131r"),onayAd:\u00E7("Ay\u0131r"),onayIkon:"calendar",govde:`${sehirler.
length>1?`<fieldset class="alan"><legend>${\u00E7("\u015Eehir")}</legend><div class="radyo-liste">${sehirler.map((x,i)=>`<label class="radyo"><input type="radio" name="sehir" value="${esc(x)}" ${i===0?
"checked":""}>
            <span><b>${esc(sehirAd(x))}</b><span class="kucuk">${\u00E7("{s}. seviye \xB7 {n} sakin",{s:Number(veri[x].level??1),n:sayi(veri[x].residents??0)})}</span></span></label>`).join("")}</div>\
</fieldset>`:`<input type="hidden" name="sehir" value="${esc(sehirler[0])}"><p class="aciklama">${esc(sehirAd(sehirler[0]))}</p>`}
          <fieldset class="alan"><legend>${\u00E7("Mek\xE2n")}</legend><div id="konser-mekanlar">${mekanlarHtml(sehirler[0])}</div></fieldset>
          <label class="alan"><span>${\u00E7("Ba\u015Flang\u0131\xE7")}</span><input name="zaman" type="datetime-local" required min="${yerel(en)}" max="${yerel(son)}" value="${yerel(oneri)}">
            <small>${\u00E7("En erken {s} saat, en ge\xE7 {g} g\xFCn sonra.",{s:Math.round(Number(K.leadMinutes??120)/60),g:Number(K.horizonDays??7)})}</small></label>
          <fieldset class="alan"><legend>${\u00E7("S\xFCre")}</legend><div class="radyo-liste birlik-yatay">${sureler.map((n,i)=>`<label class="radyo"><input type="radio" name="sure" value="${n}" ${i===
0?"checked":""}><span><b>${\u00E7("{n} dk",{n})}</b></span></label>`).join("")}</div></fieldset>
          <label class="alan"><span>${\u00E7("Bilet fiyat\u0131 (kredi)")}</span><input name="fiyat" inputmode="decimal" required value="${esc(kr(Number(K.demand?.refPriceCr??500)))}" autocomplete="of\
f">
            <small>${\u00E7("{min}\u2013{max} kredi. Ucuz bilet daha \xE7ok seyirci ve hayran getirir; kap\u0131dan gelen seyirci {r} kredide en \xE7ok paray\u0131 b\u0131rak\u0131r, {s} kredide hi\xE7 gelmez.",
{min:kr(Number(K.ticketPriceCr?.min??100)),max:kr(Number(K.ticketPriceCr?.max??5e3)),r:kr(Number(K.demand?.refPriceCr??500)),s:kr(Number(K.demand?.zeroPriceCr??1e3))})}</small></label>
          <fieldset class="alan"><legend>${\u00E7("Set listesi ({min}\u2013{max} \u015Fark\u0131)",{min:enAz,max:enCok})}</legend><div class="radyo-liste">${rep.map(x=>`<label class="radyo"><input typ\
e="checkbox" name="sarki" value="${esc(x.song_id)}" ${secili.includes(x.song_id)?"checked":""}>
              <span><b>${esc(x.title)}</b><span class="kucuk">${esc(muzikSure(x.duration_s))} \xB7 ${\u00E7("kalite {q} \xB7 grubun bilgisi {o}",{q:Number(x.quality??0),o:Number(x.avg_level??0)})}</sp\
an></span></label>`).join("")}</div>
            <small id="konser-set-yazi"></small></fieldset>
          <div class="konser-tahmin" id="konser-tahmin" aria-live="polite"></div>`,is:async f=>{const sehir=String(f.get("sehir")??""),mekan=String(f.get("mekan")??"");if(!mekan)throw new Error(\u00E7(
"Mek\xE2n\u0131 se\xE7."));const z=new Date(String(f.get("zaman")??""));if(Number.isNaN(z.getTime()))throw new Error(\u00E7("Ba\u015Flang\u0131\xE7 zaman\u0131n\u0131 se\xE7."));const fiyat=krediAlt(f.
get("fiyat"));if(!Number.isFinite(fiyat)||fiyat<=0)throw new Error(\u00E7("Bilet fiyat\u0131n\u0131 kredi olarak yaz (\xF6r. 5 ya da 7,50)."));const set=f.getAll("sarki").map(String);if(set.length<enAz||
set.length>enCok)throw new Error(\u00E7("Set listesinde {min}\u2013{max} \u015Fark\u0131 olur.",{min:enAz,max:enCok}));const kulup=mekan.startsWith("kulup:")?mekan.slice(6):null,y=await Sunucu.yap("co\
ncert_book",{p_region:sehir,p_venue:kulup?"kulup":mekan,p_starts_at:z.toISOString(),p_minutes:Number(f.get("sure")),p_price:fiyat,p_setlist:set,...kulup?{p_venue_id:kulup}:{}});tost(\u00E7("Konser ayr\
\u0131ld\u0131: {mekan}, {sehir}, {zaman}. Kira ve sahne malzemesi kasada ayr\u0131ld\u0131.",{mekan:mekanAd(veri[sehir],mekan),sehir:bolgeAdi(sehir),zaman:saatYaz(y?.starts_at??z.toISOString())}),"ca\
lendar"),await tazele()}}).form,tahmin=()=>{const f=new FormData(form),sehir=String(f.get("sehir")??sehirler[0]),d=veri[sehir],m=mekanBul(d,String(f.get("mekan")??"")),sure=Number(f.get("sure")??sureler[0]),
set=f.getAll("sarki").map(String),toplam=set.reduce((a,id)=>a+Number(rep.find(x=>x.song_id===id)?.duration_s??0),0),sy=$("#konser-set-yazi",form);sy&&(sy.textContent=\u00E7("Se\xE7ilen {n} \u015Fark\u0131 \xB7 {sure}\
 / {dk} dakika",{n:set.length,sure:muzikSure(toplam),dk:sure}),sy.classList.toggle("hata",toplam>sure*60||set.length<enAz||set.length>enCok));const kutu=$("#konser-tahmin",form);if(!kutu)return;if(!m||
d.war){kutu.innerHTML="";return}const fiyat=krediAlt(f.get("fiyat")),vergiPpm=vergi[d.country_id],bedelPpm=Number(K.systemFeePpm??5e4),fans=Number((b.fans??[]).find(h=>h.region_id===sehir)?.fans??0),yakin=(b.
concerts??[]).filter(c=>c.status==="done"&&c.region_id===sehir&&Date.now()-Date.parse(c.starts_at)<Number(K.demand?.fatigueDays??7)*864e5).length,gecerli=Number.isFinite(fiyat)&&fiyat>=Number(K.ticketPriceCr?.
min??100)&&fiyat<=Number(K.ticketPriceCr?.max??5e3),talep=gecerli?konserTalebi(K,Number(d.residents??0),fans,fiyat,yakin):null,netBilet=gecerli?fiyat-Math.floor(fiyat*(vergiPpm??0)/1e6)-Math.floor(fiyat*
bedelPpm/1e6):0,basabas=netBilet>0?Math.ceil(Number(m.cost_cr)/netBilet):null,kasa=b.treasury??{},mal=b.goods??{},kiraYok=Number(kasa.free??0)<Number(m.rent_cr),malYok=Number(mal.sahne??0)<Number(m.stage_units),
gec=Math.floor(Number(m.rent_cr)*Number(K.lateCancel?.rentPpm??5e5)/1e6),kulupMu=String(m.venue).startsWith("kulup:");kutu.innerHTML=`<p class="ust-yazi">${\u00E7("Ay\u0131rmadan \xF6nce")}</p><ul cla\
ss="konser-kurallar">
          <li${kiraYok?' class="hata"':""}>${kulupMu?\u00E7("Kira {kr} kredi grubun kasas\u0131ndan ayr\u0131l\u0131r (kasada harcanabilir {k} kredi); konser olunca kul\xFCb\xFCn kasas\u0131na ge\xE7er.",
{kr:kr(m.rent_cr),k:kr(Number(kasa.free??0))}):\u00E7("Kira {kr} kredi grubun kasas\u0131ndan ayr\u0131l\u0131r (kasada harcanabilir {k} kredi); konser olunca belediyeye ge\xE7er.",{kr:kr(m.rent_cr),k:kr(
Number(kasa.free??0))})}</li>
          <li${malYok?' class="hata"':""}>${\u00E7("{n} sahne malzemesi kasadan ayr\u0131l\u0131r (kasada {k}); konserde t\xFCkenir.",{n:Number(m.stage_units),k:sayi(Number(mal.sahne??0))})}</li>
          <li>${vergiPpm==null?\u00E7("Bilet gelirinden \u015Fehrin \xFClkesinin sat\u0131\u015F vergisi ve %{b} sistem bedeli d\xFC\u015F\xFCl\xFCr; vergi ay\u0131r\u0131rken kilitlenir.",{b:Math.round(
bedelPpm/1e4)}):\u00E7("Bilet gelirinden sat\u0131\u015F vergisi {v} ({u}) ve %{b} sistem bedeli d\xFC\u015F\xFCl\xFCr; vergi ay\u0131r\u0131rken kilitlenir.",{v:ppmYuzde(vergiPpm),u:ulkeAdi(d.country_id),
b:Math.round(bedelPpm/1e4)})}</li>
          <li>${\u00E7("Gelirden \xF6nce kira ve malzemenin kar\u015F\u0131l\u0131\u011F\u0131 ({g} kredi) kasaya d\xF6ner; kalan k\xE2r kadroya pay plan\u0131yla b\xF6l\xFCn\xFCr. Gelir yetmezse eksik kalan grubun zarar\u0131d\u0131r; kimse bor\xE7lanmaz.",
{g:kr(m.cost_cr)})}</li>
          <li>${kulupMu?\u00E7("\u0130ptal: ba\u015Flang\u0131ca {s} saatten \xE7ok varken bedelsiz; daha az kala kiran\u0131n yar\u0131s\u0131 ({kr} kredi) kul\xFCb\xFCn kasas\u0131na ge\xE7er; son {dk} dakikada iptal edilmez. Kul\xFCp kapan\u0131rsa kon\
ser bedelsiz iptal olur.",{s:Number(K.lateCancel?.hours??24),kr:kr(gec),dk:Number(K.lockMinutes??60)}):\u00E7("\u0130ptal: ba\u015Flang\u0131ca {s} saatten \xE7ok varken bedelsiz; daha az kala kiran\u0131n yar\u0131s\u0131 ({kr} kred\
i) belediyeye ge\xE7er; son {dk} dakikada iptal edilmez.",{s:Number(K.lateCancel?.hours??24),kr:kr(gec),dk:Number(K.lockMinutes??60)})}</li></ul>
          ${talep!=null?`<p class="kucuk">${\u00E7("Talep tahmini: yakla\u015F\u0131k {t} ki\u015Fi (\u015Fehrin {s} sakini, {h} hayran\u0131n{y}). Kapasite {k}. Masraf\u0131 \xE7\u0131karmak i\xE7in yakla\u015F\u0131k {b} bilet gerekir.",
{t:sayi(talep),s:sayi(d.residents??0),h:sayi(fans),y:yakin?\u00E7(", son 7 g\xFCnde burada {n} konser",{n:yakin}):"",k:sayi(m.capacity),b:basabas==null?"\u2014":sayi(basabas)})}</p>`:""}
          <p class="kucuk">${\u00E7("Kap\u0131dan gelen seyircinin bu \u015Fehirdeki bug\xFCnk\xFC b\xFCt\xE7esi {b} kredi (harcanan {p}); bir konser en \xE7ok %{e}'ini, kalitesiyle orant\u0131l\u0131 al\u0131r. Konser ba\u015Flarken \xE7\xF6z\xFCl\xFCr; so\
nucu haz\u0131rl\u0131k belirler.",{b:kr(d.budget?.budget_cr??0),p:kr(d.budget?.paid_cr??0),e:Math.round(Number(K.audience?.eventSharePpm??4e5)/1e4)})}</p>`};form.addEventListener("input",tahmin),form.
addEventListener("change",e=>{if(e.target.name==="sehir"){const kutu=$("#konser-mekanlar",form);kutu&&(kutu.innerHTML=mekanlarHtml(String(e.target.value)))}tahmin()}),tahmin()}function konserIptal(id){
const c=(B()?.concerts??[]).find(x=>x.concert_id===id);if(!c)return;const bedel=Number(c.late_fee_cr??0),kulup=!!c.venue_id;pencere({ust:\u00E7("Konser"),baslik:\u00E7("Konseri iptal et"),govde:`<p cl\
ass="aciklama">${bedel>0?kulup?\u00E7("Ba\u015Flang\u0131ca 24 saatten az kald\u0131: kiran\u0131n yar\u0131s\u0131 ({kr} kredi) kul\xFCb\xFCn kasas\u0131na ge\xE7er; kalan kira ve sahne malzemesi kasaya d\xF6ner.",
{kr:kr(bedel)}):\u00E7("Ba\u015Flang\u0131ca 24 saatten az kald\u0131: kiran\u0131n yar\u0131s\u0131 ({kr} kredi) belediyeye ge\xE7er; kalan kira ve sahne malzemesi kasaya d\xF6ner.",{kr:kr(bedel)}):\u00E7(
"Ba\u015Flang\u0131ca 24 saatten \xE7ok var: kira ve sahne malzemesi bedelsiz kasaya d\xF6ner.")}</p>
          <p class="kucuk">${\u00E7("Sat\u0131lan {n} bilet kendili\u011Finden iade edilir; kadronun \xE7izelgesi bo\u015Fal\u0131r.",{n:sayi(c.tickets??0)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{
ad:\u00E7("\u0130ptal et"),sinif:"mercan",is:()=>islem("concert_cancel",{p_concert:id},y=>Number(y?.fee_cr??0)>0?kulup?\u00E7("Konser iptal edildi; {n} bilet iade edildi, {kr} kredi ge\xE7 iptal bedeli k\
ul\xFCb\xFCn kasas\u0131na ge\xE7ti.",{n:sayi(y?.refunded??0),kr:kr(y.fee_cr)}):\u00E7("Konser iptal edildi; {n} bilet iade edildi, {kr} kredi ge\xE7 iptal bedeli belediyeye ge\xE7ti.",{n:sayi(y?.refunded??
0),kr:kr(y.fee_cr)}):\u00E7("Konser iptal edildi; {n} bilet iade edildi.",{n:sayi(y?.refunded??0)}),"x")}]})}function enstrumanAt(){const e=v.m.instrument?.open;e&&pencere({ust:\u00E7("Enstr\xFCman\u0131n"),
baslik:\u00E7("Enstr\xFCman\u0131 at"),govde:`<p class="aciklama">${\u00E7("{q}. kalite enstr\xFCman at\u0131l\u0131r (yok olur); geri gelmez.",{q:Number(e.quality)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\
\xE7")},{ad:\u00E7("At"),sinif:"mercan",ikon:"trash",is:()=>islem("instrument_close",{p_discard:!0},\u00E7("Enstr\xFCman at\u0131ld\u0131."),"trash")}]})}function enstrumanOnar(){const e=v.m.instrument??
{},I=R().concert?.instrument??{},gerek=Math.ceil(Number(e.open?.wear??0)/Number(I.repairPerKit??10)),en=Math.max(1,Math.min(gerek,Number(e.kits??0)));pencereForm({ust:\u00E7("Enstr\xFCman\u0131n"),baslik:\u00E7(
"Onar"),onayAd:\u00E7("Onar"),onayIkon:"wrench",govde:`<label class="alan"><span>${\u00E7("Bak\u0131m kiti")}</span><input name="kit" type="number" required min="1" max="${en}" value="${en}">
            <small>${\u00E7("A\u015F\u0131nma {a}; bir kit {r} a\u015F\u0131nma giderir. Sende {k} kit var.",{a:Number(e.open?.wear??0),r:Number(I.repairPerKit??10),k:sayi(Number(e.kits??0))})}</small\
></label>`,is:async f=>{const n=Number(f.get("kit"));if(!Number.isInteger(n)||n<1||n>en)throw new Error(\u00E7("1\u2013{n} kit se\xE7.",{n:en}));const y=await Sunucu.yap("instrument_repair",{p_kits:n});
tost(\u00E7("Enstr\xFCman onar\u0131ld\u0131: a\u015F\u0131nma {a}.",{a:Number(y?.wear??0)}),"wrench"),Durum.ozet().catch(()=>{}),await tazele()}})}function dukkanAl(item){const s=v.m.shop??{},fiyat=Number(
s.prices?.[item]??0),kalan=Math.max(0,Number(s.per_day?.[item]??0)-Number(s.today?.[item]??0));if(!kalan)return;const kasaya=item==="sahne"&&yetki("rehearse"),pf=pencereForm({ust:\u00E7("Devletin m\xFCzi\
k d\xFCkk\xE2n\u0131"),baslik:item==="enstruman"?\u00E7("Enstr\xFCman al"):\u00E7("Sahne malzemesi al"),onayAd:\u00E7("Al"),onayIkon:"store",govde:`<label class="alan"><span>${\u00E7("Adet")}</span><i\
nput name="adet" type="number" required min="1" max="${kalan}" value="${item==="sahne"?Math.min(kalan,4):1}">
            <small>${\u00E7("Bug\xFCn en \xE7ok {n} daha; tanesi {kr} kredi.",{n:kalan,kr:kr(fiyat)})}</small></label>
          ${kasaya?`<fieldset class="alan"><legend>${\u00E7("Kimin i\xE7in")}</legend><div class="radyo-liste">
            <label class="radyo"><input type="radio" name="kime" value="ben" checked><span><b>${\u00E7("Kendim i\xE7in")}</b><span class="kucuk">${\u00E7("Bedel hesab\u0131ndan.")}</span></span></labe\
l>
            <label class="radyo"><input type="radio" name="kime" value="grup"><span><b>${\u00E7("Grubun kasas\u0131 i\xE7in")}</b><span class="kucuk">${\u00E7("Bedel grubun kasas\u0131ndan; malzeme kasaya.")}\
</span></span></label></div></fieldset>`:""}
          <p class="kucuk" id="dukkan-toplam"></p>`,is:async f=>{const n=Number(f.get("adet"));if(!Number.isInteger(n)||n<1||n>kalan)throw new Error(\u00E7("1\u2013{n} adet se\xE7.",{n:kalan}));const grup=kasaya&&
f.get("kime")==="grup";await Sunucu.yap("music_shop_buy",{p_item:item,p_qty:n,p_for_band:grup}),tost(grup?\u00E7("Grubun kasas\u0131 i\xE7in {n} sahne malzemesi al\u0131nd\u0131.",{n}):item==="enstrum\
an"?\u00E7("{n} enstr\xFCman ald\u0131n.",{n}):\u00E7("{n} sahne malzemesi ald\u0131n.",{n}),"store"),Durum.ozet().catch(()=>{}),await tazele()}}),t=()=>{const y=$("#dukkan-toplam",pf.form);y&&(y.textContent=
\u00E7("Toplam {kr} kredi.",{kr:kr(fiyat*(Number($("input[name=adet]",pf.form)?.value)||0))}))};pf.form.addEventListener("input",t),t()}function malzemeBagis(){const n0=Number(v.m.instrument?.stage??0);
n0&&pencereForm({ust:\u00E7("Grubun kasas\u0131"),baslik:\u00E7("Sahne malzemesi koy"),onayAd:\u00E7("Koy"),onayIkon:"package",govde:`<label class="alan"><span>${\u00E7("Adet")}</span><input name="ade\
t" type="number" required min="1" max="${n0}" value="${n0}"><small>${\u00E7("Sende {n} sahne malzemesi var.",{n:sayi(n0)})}</small></label>
          <div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("Kasaya konan malzeme grubun olur ve geri al\u0131nmaz.")}</span></div>`,is:async f=>{const n=Number(f.get("adet"));if(!Number.
isInteger(n)||n<1||n>n0)throw new Error(\u00E7("1\u2013{n} adet se\xE7.",{n:n0}));await Sunucu.yap("band_donate_goods",{p_qty:n}),tost(\u00E7("Kasaya {n} sahne malzemesi koydun.",{n}),"package"),await tazele()}})}
function kamuBagis(){const t=B()?.treasury??{};pencereForm({ust:\u00E7("Grubun kasas\u0131"),baslik:\u00E7("Kamuya ba\u011F\u0131\u015F"),onayAd:\u00E7("Ba\u011F\u0131\u015Fla"),onayIkon:"landmark",govde:`\
<label class="alan"><span>${\u00E7("Kredi")}</span><input name="miktar" inputmode="decimal" required autocomplete="off"><small>${\u00E7("Kasada harcanabilir {kr} kredi.",{kr:kr(Number(t.free??0))})}</\
small></label>
          <p class="kucuk">${\u00E7("Kasan\u0131n harcanabilir paras\u0131ndan, \xFCs \u015Fehrinin bug\xFCnk\xFC \xFClkesinin hazinesine ge\xE7er. \xDCyelere duyurulur; geri al\u0131nmaz.")}</p>`,is:async f=>{
const n=krediAlt(f.get("miktar"));if(!Number.isFinite(n)||n<=0)throw new Error(\u00E7("Kredi miktar\u0131n\u0131 yaz (\xF6r. 25 ya da 12,50)."));const y=await Sunucu.yap("band_public_donate",{p_amount:n});
tost(\u00E7("Kasadan {ulke} hazinesine {kr} kredi ba\u011F\u0131\u015Fland\u0131.",{ulke:ulkeAdi(y?.country_id),kr:kr(n)}),"landmark"),await tazele()}})}const tazele=tazeleyici(async()=>{await yukle(),
kapandi||ciz()});await yukle(),ciz();const ayir=KonserHedef.ayirAl();ayir&&(B()&&yetki("rehearse")?konserAyir(ayir.bolge):tost(B()?\u00E7("Konseri y\xF6netici ya da vekil ay\u0131r\u0131r."):\u00E7("K\
onser vermek i\xE7in \xF6nce bir gruba kat\u0131l ya da grup kur."),"circle-alert"));const b1=Durum.dinle("olay",({olay})=>{/^band\./.test(olay)?(yakinda(),konusmaTazele()):/^(concert\.|instrument\.)/.
test(olay)&&yakinda()}),saat=setInterval(()=>{!document.hidden&&!document.querySelector(".perde")&&tazele()},6e4);return()=>{kapandi=!0,durdur(),b1(),clearInterval(saat),clearTimeout(bekleyen),kanalBirak?.(),
kanalBirak=null,kanal=null,oda.kapat(),Ezgi.durdur()}}}),Parcalar.tamam("ek_98g_muzik");
