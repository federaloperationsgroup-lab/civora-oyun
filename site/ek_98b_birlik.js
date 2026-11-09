// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_98b_birlik.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("ulke/birlik",{async ac(kap){let v=null,secTur=null,kanal=null,kanalBirak=null,kapandi=!1,durdur=()=>{};const arama={q:"",sonuc:null},karargah=BirlikKarargah.ac();karargah.dinle("sec",(ad,id)=>{
if(ad==="kisi"){id&&profilAc(id,()=>tazele());return}const el=$({takvim:"#birlik-takvim",depo:"#birlik-depo",duyuru:"#birlik-duyuru"}[ad]??"#yok",kap);el&&(el.scrollIntoView({behavior:hareketAzalt?"au\
to":"smooth",block:"start"}),el.classList.remove("vurgu-yan"),el.offsetWidth,el.classList.add("vurgu-yan"))});const ben=()=>Durum.v.ozet?.character??{},R=()=>birlikKurali()??{};async function yukle(){
await Durum.kurallar();const[mine,liste]=await Promise.all([Sunucu.cagir("unit_mine"),Sunucu.cagir("units").catch(()=>({units:[],country_id:null}))]);v={mine,liste:liste.units??[],ulke:liste.country_id??
ben().citizenship??null};const u=mine.unit;u&&!(u.calendar??[]).some(t=>t.round_id===secTur)&&(secTur=((u.calendar??[]).find(t=>t.status==="open")??(u.calendar??[])[0])?.round_id??null),kanalBagla()}function kanalBagla(){
const id=v?.mine?.unit?.unit_id??null;id!==kanal&&(kanalBirak?.(),kanalBirak=null,kanal=id,id&&(kanalBirak=Sunucu.Canli.dinle("unit:"+id,olay=>{/^unit\./.test(olay)&&yakinda()})))}let bekleyen=null;const yakinda=()=>{
clearTimeout(bekleyen),bekleyen=setTimeout(()=>{kapandi||tazele()},350)};function bosHtml(){const m=v.mine,f=m.found??{},hesapTamam=!f.account_ok_at||Date.parse(f.account_ok_at)<=Date.now(),bekleme=m.
join_after&&Date.parse(m.join_after)>Date.now()?m.join_after:null,sart=(tamam,ad,alt)=>`<div class="sart ${tamam?"tamam":"eksik"}">${ikon(tamam?"badge-check":"circle-alert")}<span><b>${esc(ad)}</b><sp\
an class="kucuk">${esc(alt)}</span></span><span></span></div>`,kurabilir=f.citizen&&f.trained&&hesapTamam&&!bekleme,davetler=m.invites??[],basvurular=m.applications??[],bekleyenBirlik=new Set(basvurular.
map(x=>x.unit_id));return`${bekleme?`<div class="bilgi-kutusu" style="margin-bottom:12px">${ikon("hourglass")}<span>${\u00E7("Bir birlikten ayr\u0131ld\u0131n: yeni bir birli\u011Fe girmek ya da birlik kurmak i\xE7in k\
alan s\xFCre")} <b data-bitis="${esc(bekleme)}"></b>.</span></div>`:""}
        ${davetler.length?`<section class="kart" id="birlik-davetler" style="margin-bottom:12px"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Davetlerin")}</p><h2 class="b2">${\u00E7("{n} \
birlik seni \xE7a\u011F\u0131r\u0131yor",{n:davetler.length})}</h2></div><span class="ik-kutu">${ikon("user-round-plus")}</span></div>
          <div class="liste">${davetler.map(x=>`<div class="liste-satir"><span class="liste-ikon">${birlikAmblem(x)}</span>
            <div><span class="tur">${\u00E7("{ad} davet etti \xB7 {n} \xFCye",{ad:esc(x.by??""),n:Number(x.members)})}</span><b>${esc(x.name)}</b>${x.note?`<div class="alt">\u201C${esc(x.note)}\u201D</div>`:
""}<div class="alt">${\u00E7("Son g\xFCn: {zaman}",{zaman:esc(saatYaz(x.expires_at))})}</div></div>
            <span class="birlik-satir-dugmeler"><button class="dugme kucuk-d" data-davet-kabul="${esc(x.request_id)}">${ikon("check")}${\u00E7("Kabul et")}</button>
              <button class="dugme sade kucuk-d" data-davet-ret="${esc(x.request_id)}">${\u00E7("Reddet")}</button></span></div>`).join("")}</div></section>`:""}
        <div class="izgara iki">
          <section class="kart" id="birlik-liste"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Birlikler \xB7 {n}",{n:v.liste.length})}</p><h2 class="b2">${\u00E7("{ulke} birlikleri",{ulke:esc(
ulkeAdi(v.ulke))})}</h2></div><span class="ik-kutu">${ikon("shield")}</span></div>
            ${v.liste.length?`<div class="liste">${v.liste.map(x=>`<div class="liste-satir" data-birlik-ac="${esc(x.unit_id)}" role="button" tabindex="0"><span class="liste-ikon">${birlikAmblem(x)}</s\
pan>
              <div><span class="tur">${\u00E7("{n} \xFCye \xB7 lider {ad}",{n:Number(x.members),ad:esc(x.leader??"")})}</span><b>${esc(x.name)}</b></div>
              ${bekleyenBirlik.has(x.unit_id)?`<span class="cip">${\u00E7("Ba\u015Fvurdun")}</span>`:`<button class="dugme ikincil kucuk-d" data-basvur="${esc(x.unit_id)}" ${bekleme||!f.citizen?"disab\
led":""}>${\u00E7("Ba\u015Fvur")}</button>`}</div>`).join("")}</div>`:`<p class="bos">${\u00E7("Bu \xFClkede hen\xFCz birlik yok. \u0130lk birli\u011Fi sen kur.")}</p>`}
            ${basvurular.length?`<hr class="ayrac"><p class="ust-yazi">${\u00E7("Ba\u015Fvurular\u0131n")}</p><div class="liste">${basvurular.map(x=>`<div class="liste-satir"><span class="liste-ikon">${birlikAmblem(
x)}</span>
              <div><span class="tur">${\u00E7("Yan\u0131t bekliyor \xB7 son g\xFCn {zaman}",{zaman:esc(saatYaz(x.expires_at))})}</span><b>${esc(x.name)}</b></div>
              <button class="dugme sade kucuk-d" data-basvuru-geri="${esc(x.request_id)}">${\u00E7("Geri \xE7ek")}</button></div>`).join("")}</div>`:""}</section>
          <section class="kart" id="birlik-kur-kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kendi birli\u011Fin")}</p><h2 class="b2">${\u00E7("Birlik kur")}</h2></div><span class="ik\
-kutu">${ikon("tent")}</span></div>
            <p class="aciklama">${\u00E7("Birlik, ayn\u0131 \xFClkenin askerlerinin birlikte sava\u015Ft\u0131\u011F\u0131 topluluktur: ortak emir, g\xF6rev takvimi, sohbet, kasa ve depo. En \xE7ok {n} \xFCye.",
{n:Number(R().members?.max??40)})}</p>
            <div class="yigin" style="margin-top:10px">
              ${sart(!!f.citizen,\u00E7("Vatanda\u015Fs\u0131n"),f.citizen?\u00E7("Birlik \xFClkenin vatanda\u015Flar\u0131ndan kurulur."):\u00E7("\xD6nce bir \xFClkenin vatanda\u015F\u0131 ol."))}
              ${sart(!!f.trained,\u00E7("Temel asker\xEE e\u011Fitim"),f.trained?\u00E7("Tamamlad\u0131n."):\u00E7("\xDClkem \u2192 Cephe'deki tatbikat\u0131 bitir."))}
              ${sart(hesapTamam,\u00E7("Hesab\u0131n en az {n} saatlik",{n:Number(R().found?.accountAgeH??48)}),hesapTamam?\u00E7("Sa\u011Flan\u0131yor."):\u00E7("Sa\u011Flanaca\u011F\u0131 an: {zaman}",
{zaman:saatYaz(f.account_ok_at)}))}
            </div>
            <p class="kucuk" style="margin-top:10px">${\u00E7("Kurulu\u015F bedeli {kr} kredi; hesab\u0131ndan d\xFC\u015F\xFCl\xFCr ve geri verilmez.",{kr:kr(f.fee_cr??0)})}</p>
            <div class="satir" style="margin-top:12px"><button class="dugme altin" id="birlik-kur" ${kurabilir?"":"disabled"}>${ikon("plus")}${\u00E7("Birlik kur ({kr} kredi)",{kr:kr(f.fee_cr??0)})}</\
button></div></section>
        </div>`}const benimRol=()=>v.mine.unit?.me?.role??"member",yetki=a=>!!v.mine.unit?.me?.can?.[a],cikarabilir=hedef=>yetki("expel")&&hedef!=="leader"&&(benimRol()==="leader"||hedef!=="deputy"),takvimTuru=id=>(v.
mine.unit?.calendar??[]).find(t=>t.round_id===id)??null;function duyuruHtml(u){const a=u.announcement;return`<section class="kart" id="birlik-duyuru"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7(
"Pano")}</p><h2 class="b2">${\u00E7("Duyuru")}</h2></div>
          ${yetki("announce")?`<button class="dugme ikincil kucuk-d" id="birlik-duyuru-yaz">${ikon("notebook-pen")}${a?\u00E7("De\u011Fi\u015Ftir"):\u00E7("Duyuru yaz")}</button>`:`<span class="ik-kut\
u">${ikon("megaphone")}</span>`}</div>
        ${a?`<blockquote class="birlik-duyuru-metin" id="birlik-duyuru-metin">${esc(a.text)}</blockquote><p class="kucuk">${esc(a.by??"")} \xB7 ${esc(zamanOnce(a.at))}</p>`:`<p class="bos">${\u00E7("P\
anoda duyuru yok.")}</p>`}</section>`}function turHtml(t){const benim=t.mine??{},going=t.going??[],ay=t.my_alloc??{},acik=t.status==="open",e=t.order;return`<div class="birlik-tur${t.round_id===secTur?
" secili":""}" data-tur="${esc(t.round_id)}">
        <div class="birlik-tur-bas"><div><b>${esc(bolgeAdi(t.target_region_id))} \xB7 ${\u00E7("{n}. tur",{n:Number(t.round_no)})}</b>
            <span class="kucuk">${t.side==="attacker"?\u00E7("Sald\u0131r\u0131"):\u00E7("Savunma")} \xB7 ${\u00E7("kar\u015F\u0131 taraf {ulke}",{ulke:esc(ulkeAdi(t.opponent_country_id))})}${t.paused?
" \xB7 "+\u00E7("duraklat\u0131ld\u0131"):""}</span></div>
          ${acik?`<span class="cip mercan">${ikon("swords")}${\u00E7("S\xFCr\xFCyor")}</span>`:`<span class="cip">${ikon("calendar")}${esc(saatYaz(t.starts_at))}</span>`}</div>
        <div class="birlik-emir" data-emir="${e?`${e.sector}:${e.stance}`:"yok"}">${e?`${ikon(DURUS2[e.stance]?.ik??"target")}<span><b>${esc(KESIM_AD2[e.sector]??e.sector)} \xB7 ${esc(DURUS2[e.stance]?.
ad??e.stance)}</b>${e.note?` <span class="birlik-emir-not">\u201C${esc(e.note)}\u201D</span>`:""}
            <small>${\u00E7("Emri veren {ad} \xB7 {zaman}",{ad:esc(e.by??""),zaman:esc(zamanOnce(e.at))})}</small></span>`:`<span class="kucuk">${\u00E7("Bu tur i\xE7in emir yok.")}</span>`}</div>
        <p class="kucuk birlik-tur-kisiler">${\u00E7("{n} ki\u015Fi kat\u0131lacak",{n:going.length})}${going.length?": "+going.map(g=>esc(g.name)).join(", "):""} \xB7 ${\u00E7("{n} ki\u015Fi emre uyuyor",
{n:Number(t.follow??0)})}</p>
        ${Number(ay.ammo)||Number(ay.logistics)?`<p class="kucuk birlik-tahsisim">${ikon("package")} ${\u00E7("Bu turda sana ayr\u0131lan: {a} m\xFChimmat, {l} lojistik paketi.",{a:Number(ay.ammo??0),
l:Number(ay.logistics??0)})}</p>`:""}
        <div class="oneri-dugmeler">
          <button class="dugme kucuk-d ${benim.going?"":"ikincil"}" data-isaret="going" data-tur-id="${esc(t.round_id)}" aria-pressed="${!!benim.going}">${ikon("check")}${\u00E7("Kat\u0131laca\u011F\u0131m")}\
</button>
          <button class="dugme kucuk-d ${benim.follow?"":"ikincil"}" data-isaret="follow" data-tur-id="${esc(t.round_id)}" aria-pressed="${!!benim.follow}">${ikon("target")}${\u00E7("Emre uy")}</butto\
n>
          ${t.round_id===secTur?"":`<button class="dugme sade kucuk-d" data-tur-sec="${esc(t.round_id)}">${ikon("map-pin")}${\u00E7("Masada g\xF6ster")}</button>`}
          ${yetki("order")?`<button class="dugme sade kucuk-d" data-emir-ver="${esc(t.round_id)}">${ikon("swords")}${e?\u00E7("Emri de\u011Fi\u015Ftir"):\u00E7("Emir ver")}</button>`:""}
          ${yetki("order")&&e?`<button class="dugme sade kucuk-d" data-emir-kaldir="${esc(t.round_id)}">${\u00E7("Emri kald\u0131r")}</button>`:""}
          ${yetki("allocate")?`<button class="dugme sade kucuk-d" data-tahsis-tur="${esc(t.round_id)}">${ikon("package")}${\u00E7("Tahsis et")}</button>`:""}
          ${acik?`<button class="dugme mercan kucuk-d" data-arena="${esc(t.campaign_id)}">${ikon("swords")}${\u00E7("Cepheye git")}</button>`:""}
        </div></div>`}function takvimHtml(u){const k=u.calendar??[],sonraki=k.find(t=>t.status==="scheduled");return`<section class="kart" id="birlik-takvim"><div class="kart-bas"><div><p class="ust-y\
azi">${\u00E7("G\xF6rev takvimi")}</p>
          <h2 class="b2">${k.length?\u00E7("{n} tur",{n:k.length}):\u00E7("Tur yok")}</h2></div><span class="ik-kutu">${ikon("calendar")}</span></div>
        ${sonraki?`<p class="kucuk">${\u00E7("S\u0131radaki turun ba\u015Flamas\u0131na:")} <b data-bitis="${esc(sonraki.starts_at)}"></b></p>`:""}
        ${k.length?`<div class="birlik-turlar">${k.slice(0,3).map(turHtml).join("")}</div>
            ${k.length>3?`<details class="birlik-ac" data-ac="turlar" ${k.slice(3).some(t=>t.round_id===secTur)?"open":""}><summary>${\u00E7("{n} tur daha",{n:k.length-3})}</summary>
              <div class="birlik-turlar" style="margin-top:10px">${k.slice(3).map(turHtml).join("")}</div></details>`:""}`:`<p class="bos">${\u00E7("\xDClkenin s\xFCren ya da haz\u0131rl\u0131kta bir sava\u015F\u0131 yok. Sava\
\u015F ilan edilince turlar\u0131 burada g\xF6r\xFCrs\xFCn.")}</p>`}
        <p class="kucuk" style="margin-top:8px">${\u00E7('Emir yaln\u0131z \xF6neridir; kimse senin ad\u0131na vurmaz. "Emre uy" dersen arenada kesim ve duru\u015F emre g\xF6re se\xE7ili gelir ve emir de\u011Fi\u015Fince kendili\u011Finden\
 de\u011Fi\u015Fir; istedi\u011Fin an kendin se\xE7ersin.')}</p></section>`}function uyelerHtml(u){const uyeler=u.members_list??[],istek=u.requests??[],basvuru=istek.filter(q=>q.kind==="apply"),davet=istek.
filter(q=>q.kind==="invite"),benimKim=ben().id;return`<section class="kart" id="birlik-uyeler"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xDCyeler \xB7 {n} / {max}",{n:uyeler.length,max:Number(
R().members?.max??40)})}</p><h2 class="b2">${\u00E7("Birli\u011Fin kadrosu")}</h2></div>
          <span class="ik-kutu">${ikon("users-round")}</span></div>
        <div class="liste">${uyeler.map(m=>`<div class="liste-satir birlik-uye" data-uye="${esc(m.character_id)}"><span class="liste-ikon">${avatarKutu(m.name,m.character_id)}</span>
            <div><span class="tur">${ikon(BIRLIK_ROL_IK[m.role]??"user-round")} ${esc(BIRLIK_ROL[m.role]??m.role)}${m.online?` \xB7 <span class="birlik-cevrimici">${\u00E7("\xE7evrimi\xE7i")}</span>`:
""}</span>
              <b><button class="baglanti" type="button" data-profil="${esc(m.character_id)}">${esc(m.name)}</button>${m.character_id===benimKim?" "+\u00E7("(sen)"):""}</b>
              <div class="alt">${\u00E7("Kat\u0131ld\u0131: {zaman}",{zaman:esc(saatYaz(m.joined_at))})}</div></div>
            <span class="birlik-satir-dugmeler">${yetki("roles")&&m.character_id!==benimKim?`<button class="dugme sade kucuk-d" data-rol-ver="${esc(m.character_id)}">${ikon("star")}${\u00E7("Rol")}</b\
utton>`:""}
              ${m.character_id!==benimKim&&cikarabilir(m.role)?`<button class="dugme sade kucuk-d" data-cikar="${esc(m.character_id)}">${\u00E7("\xC7\u0131kar")}</button>`:""}</span></div>`).join("")}\
</div>
        ${yetki("decide")&&basvuru.length?`<hr class="ayrac"><p class="ust-yazi">${\u00E7("Ba\u015Fvurular \xB7 {n}",{n:basvuru.length})}</p>
          <div class="liste" id="birlik-basvurular">${basvuru.map(q=>`<div class="liste-satir"><span class="liste-ikon">${avatarKutu(q.name,q.character_id)}</span>
            <div><span class="tur">${\u00E7("Ba\u015Fvurdu \xB7 {zaman}",{zaman:esc(zamanOnce(q.created_at))})}</span><b><button class="baglanti" type="button" data-profil="${esc(q.character_id)}">${esc(
q.name)}</button></b>${q.note?`<div class="alt">\u201C${esc(q.note)}\u201D</div>`:""}</div>
            <span class="birlik-satir-dugmeler"><button class="dugme kucuk-d" data-istek-kabul="${esc(q.request_id)}">${ikon("check")}${\u00E7("Kabul et")}</button>
              <button class="dugme sade kucuk-d" data-istek-ret="${esc(q.request_id)}">${\u00E7("Reddet")}</button></span></div>`).join("")}</div>`:""}
        ${yetki("invite")?`<hr class="ayrac"><p class="ust-yazi">${\u00E7("Davet et")}</p>
          <form class="sohbet-yaz" id="birlik-ara" novalidate style="margin-top:6px"><input name="q" minlength="2" maxlength="24" placeholder="${\u00E7("Ad yaz (en az 2 harf)")}" value="${esc(arama.q)}\
" aria-label="${\u00E7("Oyuncu ad\u0131")}" autocomplete="off">
            <button class="dugme" type="submit" aria-label="${\u00E7("Ara")}">${ikon("zoom-in")}</button></form>
          ${arama.sonuc?`<div class="koltuk-liste" style="margin-top:10px" id="birlik-ara-sonuc">${arama.sonuc.map(x=>{const uye=uyeler.some(m=>m.character_id===x.character_id),bekliyor=davet.some(q=>q.
character_id===x.character_id);return`<div class="koltuk">${avatarKutu(x.name,x.character_id)}<div><b>${esc(x.name)}</b><div class="kucuk">${esc(ulkeAdi(x.country_id))}</div></div>
                ${uye?`<span class="cip">${\u00E7("\xDCye")}</span>`:bekliyor?`<span class="cip">${\u00E7("Davet edildi")}</span>`:`<button class="dugme ikincil kucuk-d" data-davet="${esc(x.character_id)}\
">${ikon("user-round-plus")}${\u00E7("Davet et")}</button>`}</div>`}).join("")||`<p class="bos">${\u00E7("Bulunamad\u0131.")}</p>`}</div>`:""}
          <p class="kucuk">${\u00E7("Yaln\u0131z {ulke} vatanda\u015Flar\u0131 davet edilir. Davet {n} g\xFCn ge\xE7erlidir; birli\u011Fin ayn\u0131 anda en \xE7ok {m} bekleyen daveti olur.",{ulke:esc(
ulkeAdi(u.country_id)),n:Math.round(Number(R().members?.expiryH??168)/24),m:Number(R().members?.invitesPerUnit??20)})}</p>
          ${davet.length?`<div class="liste" id="birlik-davetlerimiz">${davet.map(q=>`<div class="liste-satir"><span class="liste-ikon">${avatarKutu(q.name,q.character_id)}</span>
            <div><span class="tur">${\u00E7("{ad} davet etti \xB7 yan\u0131t bekliyor",{ad:esc(q.by??"")})}</span><b>${esc(q.name)}</b></div>
            <button class="dugme sade kucuk-d" data-davet-geri="${esc(q.request_id)}">${\u00E7("Geri \xE7ek")}</button></div>`).join("")}</div>`:""}`:""}
      </section>`}function depoHtml(u){const dp=u.depot??{},b=dp.balances??{},kural=R().depot??{},benimKim=ben().id,emanetlerim=(dp.pledges??[]).filter(p=>p.character_id===benimKim),etkin=(dp.allocations??
[]).filter(a=>a.status==="active"),kapanan=(dp.allocations??[]).filter(a=>a.status!=="active"),tahsisSatir=a=>{const t=takvimTuru(a.round_id);return`<div class="liste-satir birlik-tahsis" data-tahsis=\
"${esc(a.allocation_id)}"><span class="liste-ikon"><span class="ozet-ikon">${ikon("package")}</span></span>
          <div><span class="tur">${t?`${esc(bolgeAdi(t.target_region_id))} \xB7 `:""}${\u00E7("{n}. tur",{n:Number(a.round_no)})} \xB7 ${esc(BIRLIK_TAHSIS_DURUM[a.status]??a.status)}</span>
            <b>${esc(birlikMiktar(a.asset,a.qty))} \u2192 ${esc(a.name)}</b>
            <div class="alt">${a.source==="pledge"?\u00E7("{ad} emanetinden",{ad:esc(a.pledge_owner??"")}):\u00E7("birli\u011Fin deposundan")} \xB7 ${\u00E7("tahsis eden {ad}",{ad:esc(a.by??"")})}${Number(
a.used)?" \xB7 "+\u00E7("kullan\u0131lan {n}",{n:Number(a.used)}):""}</div></div>
          ${a.revocable&&yetki("allocate")?`<button class="dugme sade kucuk-d" data-tahsis-geri="${esc(a.allocation_id)}">${\u00E7("Geri al")}</button>`:"<span></span>"}</div>`},defterSatir=l=>{const ne=birlikMiktar(
l.asset,l.qty),metin=l.kind==="donation"?\u00E7("{ad} ba\u011F\u0131\u015Flad\u0131: {ne}",{ad:esc(l.name??""),ne:esc(ne)}):l.kind==="payment"?\u00E7("{veren} \xF6dedi \u2192 {ad}: {ne}",{veren:esc(l.
by??""),ad:esc(l.name??""),ne:esc(ne)}):\u00E7("Hazineye ge\xE7ti: {ne}",{ne:esc(ne)});return`<div class="gunluk-oge"><time>${esc(zamanOnce(l.at))}</time><b>${metin}</b>${l.note?`<p>\u201C${esc(l.note)}\
\u201D</p>`:""}</div>`};return`<section class="kart" id="birlik-depo"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kasa ve depo")}</p><h2 class="b2">${\u00E7("Birli\u011Fin mal\u0131")}</h\
2></div><span class="ik-kutu">${ikon("warehouse")}</span></div>
        <div class="birlik-bakiyeler">${["CR","muhimmat@1","lojistik@1","erzak@1"].map(a=>{const x=b[a]??{amount:0,held:0,free:0};return`<div class="birlik-bakiye" data-varlik="${a}"><span class="kucu\
k">${esc(birlikVarlik(a))}</span><b>${a==="CR"?esc(kr(x.amount)):sayi(x.amount)}</b>
            ${Number(x.held)?`<small>${\u00E7("{n} tahsiste",{n:a==="CR"?kr(x.held):Number(x.held)})}</small>`:"<small>&nbsp;</small>"}</div>`}).join("")}</div>
        <div class="oneri-dugmeler" style="margin-top:10px">
          <button class="dugme altin kucuk-d" id="birlik-bagis">${ikon("hand-coins")}${\u00E7("Ba\u011F\u0131\u015F yap")}</button>
          <button class="dugme ikincil kucuk-d" id="birlik-emanet">${ikon("package")}${\u00E7("Emanet ver")}</button>
          ${yetki("allocate")?`<button class="dugme ikincil kucuk-d" id="birlik-tahsis">${ikon("truck")}${\u00E7("Tahsis et")}</button>`:""}
          ${yetki("pay")?`<button class="dugme ikincil kucuk-d" id="birlik-ode">${ikon("wallet")}${\u00E7("\xD6deme yap")}</button>`:""}
        </div>
        <p class="kucuk">${\u00E7("Ba\u011F\u0131\u015F birli\u011Fin olur ve geri al\u0131nmaz. Emanet senin kal\u0131r: tahsis edilmeyen k\u0131sm\u0131n\u0131 istedi\u011Fin an geri \xE7ekersin; birlikten ayr\u0131l\u0131nca kendili\u011Finden d\xF6ner.")}\

          ${yetki("pay")?\u00E7("Bug\xFCnk\xFC \xF6demeler: {n} / {max}.",{n:Number(dp.payments_today??0),max:Number(kural.payDailyMax??10)}):""}</p>
        ${emanetlerim.length?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("Emanetlerin")}</p><div class="liste" id="birlik-emanetlerim">${emanetlerim.map(p=>`<div class="liste-satir" data-ema\
net="${esc(p.pledge_id)}">
            <span class="liste-ikon"><span class="ozet-ikon">${ikon(p.asset==="muhimmat@1"?"box":"truck")}</span></span>
            <div><span class="tur">${\u00E7("{n} serbest \xB7 {m} tahsiste",{n:Number(p.free),m:Number(p.allocated)})}</span><b>${esc(birlikMiktar(p.asset,Number(p.free)+Number(p.allocated)))}</b></di\
v>
            ${Number(p.free)?`<button class="dugme sade kucuk-d" data-emanet-geri="${esc(p.asset)}">${\u00E7("Geri \xE7ek")}</button>`:"<span></span>"}</div>`).join("")}</div>`:""}
        ${(dp.pledges??[]).some(p=>p.character_id!==benimKim)?`<p class="ust-yazi" style="margin-top:12px">${\u00E7("\xDCyelerin emanetleri")}</p>
          <div class="liste">${(dp.pledges??[]).filter(p=>p.character_id!==benimKim).map(p=>`<div class="liste-satir"><span class="liste-ikon">${avatarKutu(p.name,p.character_id)}</span>
            <div><span class="tur">${\u00E7("{n} serbest \xB7 {m} tahsiste",{n:Number(p.free),m:Number(p.allocated)})}</span><b>${esc(p.name)} \xB7 ${esc(birlikVarlik(p.asset))}</b></div><span></span>\
</div>`).join("")}</div>`:""}
        <p class="ust-yazi" style="margin-top:12px">${\u00E7("Tahsisler")}</p>
        ${etkin.length?`<div class="liste" id="birlik-tahsisler">${etkin.map(tahsisSatir).join("")}</div>`:`<p class="bos">${\u00E7("Etkin tahsis yok.")}</p>`}
        ${kapanan.length?`<details class="birlik-ac" data-ac="tahsis"><summary>${\u00E7("Kapanan tahsisler \xB7 {n}",{n:kapanan.length})}</summary><div class="liste">${kapanan.map(tahsisSatir).join("")}\
</div></details>`:""}
        <p class="ust-yazi" style="margin-top:12px">${\u00E7("Defter")}</p>
        ${(dp.ledger??[]).length?`<div class="gunluk" id="birlik-defter">${dp.ledger.slice(0,20).map(defterSatir).join("")}</div>`:`<p class="bos">${\u00E7("Hen\xFCz ba\u011F\u0131\u015F ya da \xF6deme yok.")}\
</p>`}
      </section>`}function ayarHtml(u){const lider=benimRol()==="leader",bekle=u.edited_at?Date.parse(u.edited_at)+Number(R().name?.renameCooldownH??168)*36e5:0;return`<section class="kart" id="birlik\
-ayar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Rol\xFCn: {rol}",{rol:esc(BIRLIK_ROL[benimRol()]??"")})}</p><h2 class="b2">${\u00E7("Birli\u011Fin")}</h2></div>
          <span class="ik-kutu">${ikon(BIRLIK_ROL_IK[benimRol()]??"user-round")}</span></div>
        <p class="aciklama">${esc(BIRLIK_ROL_YETKI[benimRol()]??"")}</p>
        <p class="kucuk">${\u00E7("Lider ayr\u0131l\u0131r, hesab\u0131n\u0131 siler ya da {n} g\xFCn oyuna girmezse liderlik s\u0131rayla vekile, en eski komutana, en eski ikmal sorumlusuna ya da en eski \xFCyeye ge\xE7er.",
{n:Number(R().leaderAbsentDays??14)})}</p>
        <div class="oneri-dugmeler" style="margin-top:12px">
          ${lider?`<button class="dugme ikincil kucuk-d" id="birlik-duzenle" ${bekle>Date.now()?"disabled":""}>${ikon("palette")}${\u00E7("Ad ve amblem")}</button>
            <button class="dugme sade kucuk-d" id="birlik-magaza-amblem" title="${esc(\u00E7("Ma\u011Fazan\u0131n amblemi sancakta ve kartta birli\u011Fin simgesinin yerine ge\xE7er"))}">${ikon("store")}${\u00E7(
"Ma\u011Faza amblemi")}</button>`:""}
          <button class="dugme sade kucuk-d" id="birlik-ayril">${ikon("door-open")}${\u00E7("Birlikten ayr\u0131l")}</button>
          ${lider?`<button class="dugme sade kucuk-d" id="birlik-dagit">${ikon("trash")}${\u00E7("Birli\u011Fi da\u011F\u0131t")}</button>`:""}
        </div>
        ${lider&&bekle>Date.now()?`<p class="kucuk">${\u00E7("Ad ve amblem haftada bir de\u011Fi\u015Fir; yeniden de\u011Fi\u015Ftirebilece\u011Fin an: {zaman}.",{zaman:esc(saatYaz(new Date(bekle).toISOString()))})}\
</p>`:""}</section>`}function birlikHtml(u){return`<div id="birlik-karargah-yer"></div>
        <div class="izgara iki">
          <div class="yigin">${duyuruHtml(u)}${takvimHtml(u)}${uyelerHtml(u)}</div>
          <div class="yigin">${depoHtml(u)}${ayarHtml(u)}</div>
        </div>`}function ciz(){durdur();const girdi=$("#birlik-ara input",kap),odak=!!girdi&&document.activeElement===girdi;girdi&&(arama.q=girdi.value);const acikDetay=new Set($$("details[data-ac]",kap).
filter(x=>x.open).map(x=>x.dataset.ac)),u=v.mine.unit,ulke=u?.country_id??v.ulke;if(kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div>${ulke?ulkeUst(ulke,\u00E7("Birlik")):`<p class="ust-yazi">${\u00E7("Birlik")}</p>`}
          ${u?`<h1 class="b1 birlik-baslik">${birlikAmblem(u)}<span id="birlik-ad">${esc(u.name)}</span></h1>
            <p class="aciklama">${\u00E7("{n} \xFCye \xB7 lider {ad}",{n:Number(u.members),ad:esc(u.leader??"")})}</p>`:`<h1 class="b1">${\u00E7("Asker\xEE birlikler")}</h1><p class="aciklama">${\u00E7(
"Bir birli\u011Fe kat\u0131l ya da kendi birli\u011Fini kur: emirle birlikte vurun, ikmali payla\u015F\u0131n.")}</p>`}</div>
          ${u?`<span class="cip" id="birlik-rol">${ikon(BIRLIK_ROL_IK[benimRol()]??"user-round")}${esc(BIRLIK_ROL[benimRol()]??"")}</span>`:""}</div>
        ${u?birlikHtml(u):bosHtml()}</div>`,u){const yer=$("#birlik-karargah-yer",kap);yer&&(yer.replaceWith(karargah.el),karargah.yaz({u,tur:secTur,ben:ben().id}))}else karargah.birak();if(bagla(),odak){
const g=$("#birlik-ara input",kap);g?.focus({preventScroll:!0}),g?.setSelectionRange?.(g.value.length,g.value.length)}for(const dt of $$("details[data-ac]",kap))acikDetay.has(dt.dataset.ac)&&(dt.open=
!0);durdur=geriSay(kap,()=>setTimeout(()=>{kapandi||tazele()},gecikmeli(sayac)))}const sayac={n:0};async function islem(fn,args,mesaj,ik){try{const y=await Sunucu.yap(fn,args);return mesaj&&tost(mesaj,
ik??"check"),y??!0}catch(e){return tost(hataMetni(e),"circle-alert"),null}finally{await tazele()}}const konusmaTazele=()=>{try{Konusma.ozetYukle?.().catch(()=>{})}catch{}};function bagla(){for(const b of $$(
"[data-profil]",kap))b.onclick=()=>profilAc(b.dataset.profil,()=>tazele());for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const s of $$("[data-birlik-ac]",kap))s.onclick=
e=>{e.target.closest("button")||birlikKartiAc(s.dataset.birlikAc,tazele)},s.onkeydown=e=>{(e.key==="Enter"||e.key===" ")&&e.target===s&&(e.preventDefault(),birlikKartiAc(s.dataset.birlikAc,tazele))};for(const b of $$(
"[data-basvur]",kap))b.onclick=e=>{e.stopPropagation();const u=v.liste.find(x=>x.unit_id===b.dataset.basvur);u&&birlikBasvur(u,tazele)};for(const b of $$("[data-basvuru-geri]",kap))b.onclick=()=>islem(
"unit_request_cancel",{p_request:b.dataset.basvuruGeri},\u00E7("Ba\u015Fvurunu geri \xE7ektin."),"undo-2");for(const b of $$("[data-davet-kabul]",kap))b.onclick=()=>{const x=(v.mine.invites??[]).find(
q=>q.request_id===b.dataset.davetKabul);pencere({ust:\u00E7("Birlik"),baslik:\u00E7("Daveti kabul et: {birlik}",{birlik:x?.name??""}),govde:`<p class="aciklama">${\u00E7("Birli\u011Fe kat\u0131l\u0131rs\u0131n; \xF6teki dav\
etlerin ve ba\u015Fvurular\u0131n d\xFC\u015Fer. Ayn\u0131 anda tek birlikte olabilirsin; ayr\u0131l\u0131rsan {n} saat ba\u015Fka birli\u011Fe giremezsin.",{n:Number(R().members?.joinCooldownH??24)})}\
</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Kat\u0131l"),sinif:"altin",ikon:"shield",is:async()=>{await islem("unit_request_answer",{p_request:b.dataset.davetKabul,p_accept:!0},\u00E7("Birli\u011F\
e kat\u0131ld\u0131n: {birlik}.",{birlik:x?.name??""}),"shield")&&konusmaTazele()}}]})};for(const b of $$("[data-davet-ret]",kap))b.onclick=()=>islem("unit_request_answer",{p_request:b.dataset.davetRet,
p_accept:!1},\u00E7("Daveti reddettin."),"x");if($("#birlik-kur",kap)?.addEventListener("click",kur),!!v.mine.unit){$("#birlik-duyuru-yaz",kap)?.addEventListener("click",duyuruYaz);for(const b of $$("\
[data-tur-sec]",kap))b.onclick=()=>{secTur=b.dataset.turSec,ciz(),$("#birlik-karargah",kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"})};for(const b of $$("[data-isaret]",kap))
b.onclick=async()=>{const t=takvimTuru(b.dataset.turId);if(!t)return;b.disabled=!0;const going=b.dataset.isaret==="going",simdi=!!(going?t.mine?.going:t.mine?.follow);await islem("unit_mark",{p_round:t.
round_id,p_going:going?!simdi:null,p_follow:going?null:!simdi},going?simdi?\u00E7("Kat\u0131lmayaca\u011F\u0131n\u0131 i\u015Faretledin."):\u00E7("Bu tura kat\u0131laca\u011F\u0131n\u0131 i\u015Faretledin."):
simdi?\u00E7("Emre uymay\u0131 b\u0131rakt\u0131n."):\u00E7("Bu turda emre uyacaks\u0131n: arenada kesim ve duru\u015F emre g\xF6re se\xE7ili gelir."),going?"check":"target")};for(const b of $$("[data\
-emir-ver]",kap))b.onclick=()=>emirVer(b.dataset.emirVer);for(const b of $$("[data-emir-kaldir]",kap))b.onclick=()=>islem("unit_order",{p_round:b.dataset.emirKaldir,p_sector:null,p_stance:null,p_note:null},
\u00E7("Emir kald\u0131r\u0131ld\u0131."),"x");for(const b of $$("[data-tahsis-tur]",kap))b.onclick=()=>tahsisEt(b.dataset.tahsisTur);for(const b of $$("[data-arena]",kap))b.onclick=()=>{try{sessionStorage.
setItem("civora.kampanya",b.dataset.arena)}catch{}Kabuk.git("ulke/cephe")};for(const b of $$("[data-rol-ver]",kap))b.onclick=()=>rolVer(b.dataset.rolVer);for(const b of $$("[data-cikar]",kap))b.onclick=
()=>{const m=(v.mine.unit.members_list??[]).find(x=>x.character_id===b.dataset.cikar);pencere({ust:\u00E7("Birlik"),baslik:\u00E7("Birlikten \xE7\u0131kar: {ad}",{ad:m?.name??""}),govde:`<p class="aci\
klama">${\u00E7("\xC7\u0131kar\u0131lan ki\u015Finin emaneti kendisine d\xF6ner, ona yap\u0131lm\u0131\u015F tahsisler kayna\u011F\u0131na d\xF6ner. {n} g\xFCn bu birli\u011Fe d\xF6nemez.",{n:Math.round(
Number(R().members?.expelRejoinH??168)/24)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\xC7\u0131kar"),sinif:"mercan",is:()=>islem("unit_expel",{p_character:b.dataset.cikar},\u00E7("{ad} bi\
rlikten \xE7\u0131kar\u0131ld\u0131.",{ad:m?.name??""}),"door-open")}]})};for(const b of $$("[data-istek-kabul]",kap))b.onclick=()=>islem("unit_request_answer",{p_request:b.dataset.istekKabul,p_accept:!0},
\u00E7("Ba\u015Fvuru kabul edildi; yeni \xFCye birlikte."),"user-round-plus");for(const b of $$("[data-istek-ret]",kap))b.onclick=()=>islem("unit_request_answer",{p_request:b.dataset.istekRet,p_accept:!1},
\u00E7("Ba\u015Fvuru reddedildi."),"x");for(const b of $$("[data-davet-geri]",kap))b.onclick=()=>islem("unit_request_cancel",{p_request:b.dataset.davetGeri},\u00E7("Davet geri \xE7ekildi."),"undo-2");
$("#birlik-ara",kap)?.addEventListener("submit",async e=>{if(e.preventDefault(),arama.q=String(new FormData(e.target).get("q")??"").trim(),arama.q.length<2){tost(\u00E7("En az 2 harf yaz."),"circle-al\
ert");return}try{const liste=await Sunucu.cagir("character_search",{p_query:arama.q});arama.sonuc=liste.filter(x=>x.country_id===v.mine.unit.country_id&&x.character_id!==ben().id),ciz(),$("#birlik-ara\
-sonuc",kap)?.scrollIntoView({block:"nearest"})}catch(err){tost(hataMetni(err),"circle-alert")}});for(const b of $$("[data-davet]",kap))b.onclick=()=>{const x=arama.sonuc?.find(k=>k.character_id===b.dataset.
davet),notMax=Number(R().members?.noteMax??140);pencereForm({ust:\u00E7("Birlik"),baslik:\u00E7("Davet et: {ad}",{ad:x?.name??""}),onayAd:\u00E7("Davet et"),onayIkon:"user-round-plus",govde:`<p class=\
"aciklama">${\u00E7("{ad} daveti kabul edince birli\u011Fe kat\u0131l\u0131r.",{ad:esc(x?.name??"")})}</p>
            <label class="alan"><span>${\u00E7("Not (iste\u011Fe ba\u011Fl\u0131)")}</span><input name="not" maxlength="${notMax}" autocomplete="off"></label>`,is:async f=>{await Sunucu.yap("unit_invi\
te",{p_character:b.dataset.davet,p_note:birlikTekSatir(f.get("not"))||null}),tost(\u00E7("{ad} davet edildi.",{ad:x?.name??""}),"user-round-plus"),await tazele()}})};$("#birlik-bagis",kap)?.addEventListener(
"click",bagisYap),$("#birlik-emanet",kap)?.addEventListener("click",()=>emanet(1));for(const b of $$("[data-emanet-geri]",kap))b.onclick=()=>emanet(-1,b.dataset.emanetGeri);$("#birlik-tahsis",kap)?.addEventListener(
"click",()=>tahsisEt(secTur));for(const b of $$("[data-tahsis-geri]",kap))b.onclick=()=>islem("unit_allocation_revoke",{p_allocation:b.dataset.tahsisGeri},\u00E7("Tahsis geri al\u0131nd\u0131; mal kayna\u011F\u0131na d\xF6n\
d\xFC."),"undo-2");$("#birlik-ode",kap)?.addEventListener("click",odemeYap),$("#birlik-duzenle",kap)?.addEventListener("click",()=>amblemFormu(v.mine.unit)),$("#birlik-magaza-amblem",kap)?.addEventListener(
"click",()=>{try{sessionStorage.setItem("civora.magaza",JSON.stringify({tur:"amblem"}))}catch{}Kabuk.git("hayat/magaza")}),$("#birlik-ayril",kap)?.addEventListener("click",ayril),$("#birlik-dagit",kap)?.
addEventListener("click",dagit)}}const amblemSecimi=(renk,simge)=>{const e=R().emblem??{colors:[],icons:[]};return`<fieldset class="alan birlik-amblem-sec"><legend>${\u00E7("Amblemin rengi")}</legend>\
<div class="renk-sec">${e.colors.map((c,i)=>`<label class="birlik-renk">
          <input type="radio" name="renk" value="${esc(c)}" ${(renk?c===renk:i===0)?"checked":""}><span style="--renk:${esc(c)}" aria-label="${esc(\u00E7("Renk {n}",{n:i+1}))}"></span></label>`).join(
"")}</div></fieldset>
        <fieldset class="alan birlik-amblem-sec"><legend>${\u00E7("Amblemin simgesi")}</legend><div class="renk-sec">${e.icons.map((s,i)=>`<label class="birlik-simge">
          <input type="radio" name="simge" value="${esc(s)}" ${(simge?s===simge:i===0)?"checked":""}><span aria-label="${esc(\u00E7("Simge {n}",{n:i+1}))}">${ikon(s)}</span></label>`).join("")}</div><\
/fieldset>`};function kur(){const r=R(),f=v.mine.found??{};pencereForm({ust:\u00E7("Birlik"),baslik:\u00E7("Birlik kur"),onayAd:\u00E7("Kur ({kr} kredi)",{kr:kr(f.fee_cr??0)}),onayIkon:"tent",govde:`<\
label class="alan"><span>${\u00E7("Birli\u011Fin ad\u0131")}</span><input name="ad" required minlength="${Number(r.name?.min??3)}" maxlength="${Number(r.name?.max??40)}" autocapitalize="words" autocom\
plete="off">
            <small>${\u00E7("{min}\u2013{max} harf; \xFClkede e\u015Fsiz.",{min:Number(r.name?.min??3),max:Number(r.name?.max??40)})}</small></label>
          ${amblemSecimi()}
          <p class="kucuk">${\u00E7("Kurulu\u015F bedeli {kr} kredi; hesab\u0131ndan d\xFC\u015F\xFCl\xFCr ve geri verilmez. Kuran birli\u011Fin lideri olur.",{kr:kr(f.fee_cr??0)})}</p>`,is:async d=>{
const ad=birlikTekSatir(d.get("ad"));if([...ad].length<Number(r.name?.min??3)||[...ad].length>Number(r.name?.max??40))throw new Error(\u00E7("Ad {min}\u2013{max} harf olmal\u0131.",{min:Number(r.name?.
min??3),max:Number(r.name?.max??40)}));await Sunucu.yap("unit_found",{p_name:ad,p_color:String(d.get("renk")??""),p_icon:String(d.get("simge")??"")}),tost(\u00E7("Birli\u011Fin kuruldu: {birlik}. Lideri se\
nsin.",{birlik:ad}),"tent"),Durum.ozet().catch(()=>{}),konusmaTazele(),await tazele()}})}function amblemFormu(u){const r=R();pencereForm({ust:\u00E7("Birlik"),baslik:\u00E7("Ad ve amblem"),onayAd:\u00E7(
"Kaydet"),onayIkon:"palette",govde:`<label class="alan"><span>${\u00E7("Birli\u011Fin ad\u0131")}</span><input name="ad" required minlength="${Number(r.name?.min??3)}" maxlength="${Number(r.name?.max??
40)}" value="${esc(u.name)}" autocomplete="off"></label>
          ${amblemSecimi(u.color,u.icon)}
          <p class="kucuk">${\u00E7("Ad ve amblem haftada bir de\u011Fi\u015Fir.")}</p>`,is:async d=>{const ad=birlikTekSatir(d.get("ad"));await Sunucu.yap("unit_edit",{p_name:ad!==u.name?ad:null,p_color:String(
d.get("renk")??"")||null,p_icon:String(d.get("simge")??"")||null}),tost(\u00E7("Birli\u011Fin ad\u0131 ve amblemi kaydedildi."),"palette"),await tazele()}})}function duyuruYaz(){const u=v.mine.unit,n=Number(
R().announcementMax??280);pencereForm({ust:\u00E7("Pano"),baslik:\u00E7("Duyuru"),onayAd:\u00E7("Panoya as"),onayIkon:"megaphone",govde:`<label class="alan"><span>${\u00E7("Duyuru metni")}</span><text\
area name="metin" maxlength="${n}" placeholder="${\u00E7("\xD6r. Cuma 21.00 savunmaya herkes; m\xFChimmat\u0131 depodan al\u0131n.")}">${esc(u.announcement?.text??"")}</textarea>
            <small>${\u00E7("En \xE7ok {n} harf. Bo\u015F b\u0131rak\u0131rsan duyuru kalkar. Yaln\u0131z \xFCyeler g\xF6r\xFCr.",{n})}</small></label>`,is:async d=>{const metin=birlikTekSatir(d.get("\
metin"));await Sunucu.yap("unit_announce",{p_text:metin||null}),tost(metin?\u00E7("Duyuru panoya as\u0131ld\u0131."):\u00E7("Duyuru kald\u0131r\u0131ld\u0131."),"megaphone"),await tazele()}})}function emirVer(turId){
const t=takvimTuru(turId);if(!t)return;const e=t.order,n=Number(R().order?.noteMax??140);pencereForm({ust:\u00E7("Emir \xB7 {hedef}, {n}. tur",{hedef:bolgeAdi(t.target_region_id),n:Number(t.round_no)}),
baslik:e?\u00E7("Emri de\u011Fi\u015Ftir"):\u00E7("Emir ver"),onayAd:\u00E7("Emri ver"),onayIkon:"swords",govde:`<fieldset class="alan"><legend>${\u00E7("Kesim")}</legend><div class="radyo-liste birli\
k-yatay">${KESIMLER.map(k=>`<label class="radyo"><input type="radio" name="kesim" value="${k}" ${(e?.sector??"center")===k?"checked":""}>
            <span><b>${esc(KESIM_AD2[k])}</b></span></label>`).join("")}</div></fieldset>
          <fieldset class="alan"><legend>${\u00E7("Duru\u015F")}</legend><div class="radyo-liste">${Object.entries(DURUS2).map(([k,x])=>`<label class="radyo"><input type="radio" name="durus" value="${k}\
" ${(e?.stance??"assault")===k?"checked":""}>
            <span><b>${esc(x.ad)}</b><span class="kucuk">${esc(x.yener)}</span></span></label>`).join("")}</div></fieldset>
          <label class="alan"><span>${\u00E7("Not (iste\u011Fe ba\u011Fl\u0131)")}</span><input name="not" maxlength="${n}" value="${esc(e?.note??"")}" autocomplete="off" placeholder="${\u00E7("\xD6r. \u0130l\
k 5 dakika merkezde kal\u0131n.")}"></label>
          <p class="kucuk">${\u00E7("Emir yaln\u0131z birli\u011Fin \xFCyelerine g\xF6r\xFCn\xFCr ve \xF6neridir. Emre uyanlar\u0131n arenas\u0131nda kesim ve duru\u015F kendili\u011Finden se\xE7ilir; kimse onlar\u0131n ad\u0131na vurmaz.")}\
</p>`,is:async d=>{await Sunucu.yap("unit_order",{p_round:t.round_id,p_sector:String(d.get("kesim")),p_stance:String(d.get("durus")),p_note:birlikTekSatir(d.get("not"))||null}),tost(\u00E7("Emir veril\
di: {kesim}, {durus}.",{kesim:KESIM_AD2[d.get("kesim")]??"",durus:DURUS2[d.get("durus")]?.ad??""}),"swords"),await tazele()}})}function bagisYap(){const r=R().depot??{},varliklar=r.donate??["CR","muhi\
mmat@1","lojistik@1","erzak@1"],benimki=a=>a==="CR"?Durum.v.ozet?.balances?.find(b=>b.asset==="CR")?.spendable??0:Durum.stok(a);pencereForm({ust:\u00E7("Kasa ve depo"),baslik:\u00E7("Birli\u011Fe ba\u011F\u0131\u015F yap"),
onayAd:\u00E7("Ba\u011F\u0131\u015Fla"),onayIkon:"hand-coins",govde:`<label class="alan"><span>${\u00E7("Ne ba\u011F\u0131\u015Fl\u0131yorsun")}</span><select name="varlik">${varliklar.map(a=>`<option\
 value="${esc(a)}">${esc(birlikVarlik(a))} \xB7 ${esc(\u00E7("sende {n}",{n:a==="CR"?kr(benimki(a)):Number(benimki(a))}))}</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Miktar")}</span><input name="miktar" inputmode="decimal" required autocomplete="off"></label>
          <div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("Ba\u011F\u0131\u015F birli\u011Fin olur ve geri al\u0131nmaz. Birlik da\u011F\u0131l\u0131rsa kasa \xFClkenin hazinesine ge\xE7er. En az {kr} kredi.",
{kr:kr(r.donationMinCr??100)})}</span></div>`,is:async d=>{const a=String(d.get("varlik")),n=birlikMiktarOku(a,d.get("miktar"));if(!Number.isFinite(n)||n<=0)throw new Error(a==="CR"?\u00E7("Kredi mikt\
ar\u0131n\u0131 yaz (\xF6r. 25 ya da 12,50)."):\u00E7("Miktar pozitif bir tam say\u0131 olmal\u0131."));await Sunucu.yap("unit_donate",{p_asset:a,p_qty:n}),tost(\u00E7("Ba\u011F\u0131\u015F\u0131n birli\u011Fin kasas\u0131na ge\xE7ti\
: {ne}.",{ne:birlikMiktar(a,n)}),"hand-coins"),Durum.ozet().catch(()=>{}),await tazele()}})}function emanet(yon,varlik){const varliklar=(R().depot??{}).pledge??["muhimmat@1","lojistik@1"],benim=(v.mine.
unit.depot?.pledges??[]).filter(p=>p.character_id===ben().id),serbest=a=>Number(benim.find(p=>p.asset===a)?.free??0),ekle=yon>0;pencereForm({ust:\u00E7("Kasa ve depo"),baslik:ekle?\u00E7("Emanet ver"):
\u00E7("Emaneti geri \xE7ek"),onayAd:ekle?\u00E7("Emanet et"):\u00E7("Geri \xE7ek"),onayIkon:ekle?"package":"undo-2",govde:`<label class="alan"><span>${\u00E7("birlik::Mal")}</span><select name="varli\
k">${varliklar.map(a=>`<option value="${esc(a)}" ${a===varlik?"selected":""}>${esc(birlikVarlik(a))} \xB7 ${esc(ekle?\u00E7("sende {n}",{n:Number(Durum.stok(a))}):\u00E7("emanette serbest {n}",{n:serbest(
a)}))}</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Miktar")}</span><input name="miktar" inputmode="numeric" required autocomplete="off"></label>
          <p class="kucuk">${ekle?\u00E7("Mal senin kal\u0131r ama emanetteyken onu satamaz ve kendin harcayamazs\u0131n; birli\u011Fin ikmal sorumlusu turlarda \xFCyelere tahsis edebilir. Tahsis edilmeyen k\u0131sm\u0131 istedi\
\u011Fin an geri \xE7ekersin."):\u00E7("Yaln\u0131z tahsis edilmemi\u015F k\u0131s\u0131m geri \xE7ekilir; tahsistekiler tur kapan\u0131nca emanete d\xF6ner.")}</p>`,is:async d=>{const a=String(d.get(
"varlik")),n=birlikMiktarOku(a,d.get("miktar"));if(!Number.isFinite(n)||n<=0)throw new Error(\u00E7("Miktar pozitif bir tam say\u0131 olmal\u0131."));await Sunucu.yap("unit_pledge",{p_asset:a,p_delta:ekle?
n:-n}),tost(ekle?\u00E7("Emanet verdin: {ne}.",{ne:birlikMiktar(a,n)}):\u00E7("Emanetten geri \xE7ektin: {ne}.",{ne:birlikMiktar(a,n)}),ekle?"package":"undo-2"),Durum.ozet().catch(()=>{}),await tazele()}})}
function tahsisEt(turId){const u=v.mine.unit,turlar=u.calendar??[];if(!turlar.length){tost(\u00E7("Tahsis i\xE7in takvimde bir tur olmal\u0131."),"calendar");return}const r=R().depot??{},varliklar=r.allocate??
["muhimmat@1","lojistik@1"],b=u.depot?.balances??{},emanetler=(u.depot?.pledges??[]).filter(p=>Number(p.free)>0),kaynakSecenek=a=>`<option value="">${esc(\u00E7("Birli\u011Fin deposu \xB7 serbest {n}",
{n:Number(b[a]?.free??0)}))}</option>${emanetler.filter(x=>x.asset===a).map(x=>`<option value="${esc(x.pledge_id)}">${esc(\u00E7("{ad} emaneti \xB7 serbest {n}",{ad:x.name,n:Number(x.free)}))}</option\
>`).join("")}`,pf=pencereForm({ust:\u00E7("Kasa ve depo"),baslik:\u00E7("Tahsis et"),onayAd:\u00E7("Tahsis et"),onayIkon:"truck",govde:`<label class="alan"><span>${\u00E7("\xDCye")}</span><select name\
="kisi">${(u.members_list??[]).map(m=>`<option value="${esc(m.character_id)}">${esc(m.name)} \xB7 ${esc(BIRLIK_ROL[m.role]??"")}</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Tur")}</span><select name="tur">${turlar.map(t=>`<option value="${esc(t.round_id)}" ${t.round_id===turId?"selected":""}>${esc(bolgeAdi(t.target_region_id))}\
 \xB7 ${esc(\u00E7("{n}. tur",{n:Number(t.round_no)}))} \xB7 ${esc(t.status==="open"?\u00E7("S\xFCr\xFCyor"):saatYaz(t.starts_at))}</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("birlik::Mal")}</span><select name="varlik">${varliklar.map(a=>`<option value="${esc(a)}">${esc(birlikVarlik(a))}</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("tahsis::Kaynak")}</span><select name="kaynak">${kaynakSecenek(varliklar[0])}</select></label>
          <label class="alan"><span>${\u00E7("Miktar")}</span><input name="miktar" inputmode="numeric" required autocomplete="off"></label>
          <p class="kucuk">${\u00E7("Tahsis turun sonuna kadar o \xFCyenindir: vuru\u015Fta \xF6nce tahsisten, sonra kendi mal\u0131ndan kullan\u0131l\u0131r. Tur ba\u015Flamadan geri alabilirsin; tur ba\u015Flad\u0131ktan sonra kullan\u0131lmaya\
n k\u0131s\u0131m tur kapan\u0131nca kayna\u011F\u0131na d\xF6ner. Bir \xFCyeye bir turda bir malda en \xE7ok {n} tahsis.",{n:Number(r.allocPerMemberRound??4)})}</p>`,is:async d=>{const a=String(d.get(
"varlik")),n=birlikMiktarOku(a,d.get("miktar"));if(!Number.isFinite(n)||n<=0)throw new Error(\u00E7("Miktar pozitif bir tam say\u0131 olmal\u0131."));const kisi=String(d.get("kisi"));await Sunucu.yap(
"unit_allocate",{p_character:kisi,p_round:String(d.get("tur")),p_asset:a,p_qty:n,p_pledge:String(d.get("kaynak")??"")||null});const m=(u.members_list??[]).find(x=>x.character_id===kisi);tost(\u00E7("T\
ahsis edildi: {ne} \u2192 {ad}.",{ne:birlikMiktar(a,n),ad:m?.name??""}),"truck"),await tazele()}}),sec=$("select[name=varlik]",pf.form),kaynak=$("select[name=kaynak]",pf.form);sec?.addEventListener("c\
hange",()=>{kaynak.innerHTML=kaynakSecenek(sec.value)})}function odemeYap(){const u=v.mine.unit,r=R().depot??{},varliklar=r.pay??["CR","muhimmat@1","lojistik@1","erzak@1"],b=u.depot?.balances??{},kisiler=(u.
members_list??[]).filter(m=>m.character_id!==ben().id);if(!kisiler.length){tost(\u00E7("\xD6deme yapacak ba\u015Fka \xFCye yok."),"users-round");return}const n=Number(r.noteMax??140);pencereForm({ust:\u00E7(
"Kasa ve depo"),baslik:\u00E7("Kasadan \xF6deme"),onayAd:\u00E7("\xD6de"),onayIkon:"wallet",govde:`<label class="alan"><span>${\u00E7("Kime")}</span><select name="kisi">${kisiler.map(m=>`<option value\
="${esc(m.character_id)}">${esc(m.name)} \xB7 ${esc(BIRLIK_ROL[m.role]??"")}</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Ne")}</span><select name="varlik">${varliklar.map(a=>`<option value="${esc(a)}">${esc(birlikVarlik(a))} \xB7 ${esc(\u00E7("kasada serbest {n}",{n:a==="CR"?
kr(b[a]?.free??0):Number(b[a]?.free??0)}))}</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Miktar")}</span><input name="miktar" inputmode="decimal" required autocomplete="off"></label>
          <label class="alan"><span>${\u00E7("odeme::A\xE7\u0131klama")}</span><input name="not" maxlength="${n}" required autocomplete="off" placeholder="${\u00E7("\xD6r. Savunma turunun \xF6d\xFCl\xFC")}\
"></label>
          <p class="kucuk">${\u00E7("\xD6deme deftere a\xE7\u0131klamas\u0131yla yaz\u0131l\u0131r ve \xFCyeler g\xF6r\xFCr. Birlik g\xFCnde en \xE7ok {n} \xF6deme yapar.",{n:Number(r.payDailyMax??10)})}\
</p>`,is:async d=>{const a=String(d.get("varlik")),q=birlikMiktarOku(a,d.get("miktar")),not=birlikTekSatir(d.get("not"));if(!Number.isFinite(q)||q<=0)throw new Error(a==="CR"?\u00E7("Kredi miktar\u0131n\u0131 y\
az (\xF6r. 25 ya da 12,50)."):\u00E7("Miktar pozitif bir tam say\u0131 olmal\u0131."));if(!not)throw new Error(\u00E7("\xD6demenin a\xE7\u0131klamas\u0131n\u0131 yaz."));const kisi=String(d.get("kisi"));
await Sunucu.yap("unit_pay",{p_character:kisi,p_asset:a,p_qty:q,p_note:not}),tost(\u00E7("\xD6dendi: {ne} \u2192 {ad}.",{ne:birlikMiktar(a,q),ad:kisiler.find(m=>m.character_id===kisi)?.name??""}),"wal\
let"),await tazele()}})}function rolVer(kimlik){const u=v.mine.unit,m=(u.members_list??[]).find(x=>x.character_id===kimlik);if(!m)return;const sinir=R().roles??{deputy:1,commander:3,quartermaster:3},say=rol=>(u.
members_list??[]).filter(x=>x.role===rol).length,secenekler=["deputy","commander","quartermaster","member"].map(rol=>{const dolu=rol!=="member"&&m.role!==rol&&say(rol)>=Number(sinir[rol]??0);return`<l\
abel class="radyo"><input type="radio" name="rol" value="${rol}" ${m.role===rol?"checked":""} ${dolu?"disabled":""}>
          <span><b>${ikon(BIRLIK_ROL_IK[rol])} ${esc(BIRLIK_ROL[rol])}</b><span class="kucuk">${rol==="member"?esc(BIRLIK_ROL_YETKI.member):`${esc(BIRLIK_ROL_YETKI[rol])} (${sayi(say(rol))} / ${sayi(Number(
sinir[rol]??0))})`}</span></span></label>`}).join("");pencereForm({ust:\u00E7("Birlik"),baslik:\u00E7("Rol ver: {ad}",{ad:m.name}),onayAd:\u00E7("Kaydet"),onayIkon:"star",govde:`<div class="radyo-list\
e">${secenekler}
            <label class="radyo"><input type="radio" name="rol" value="leader"><span><b>${ikon("crown")} ${\u00E7("Liderli\u011Fi devret")}</b>
              <span class="kucuk">${\u00E7("{ad} lider olur, sen \xFCye olursun. Geri alamazs\u0131n.",{ad:esc(m.name)})}</span></span></label></div>`,is:async d=>{const rol=String(d.get("rol")??"");!rol||
rol===m.role||(await Sunucu.yap("unit_role",{p_character:kimlik,p_role:rol}),tost(rol==="leader"?\u00E7("Liderli\u011Fi {ad} adl\u0131 \xFCyeye devrettin.",{ad:m.name}):\u00E7("{ad} art\u0131k {rol}.",
{ad:m.name,rol:BIRLIK_ROL[rol]}),rol==="leader"?"crown":"star"),await tazele())}})}function ayril(){const u=v.mine.unit,lider=benimRol()==="leader",tek=(u.members_list??[]).length<=1;pencere({ust:\u00E7(
"Birlik"),baslik:\u00E7("Birlikten ayr\u0131l"),govde:`<p class="aciklama">${\u00E7("Emanetin sana d\xF6ner, sana yap\u0131lm\u0131\u015F tahsisler kayna\u011F\u0131na d\xF6ner. {n} saat ba\u015Fka birli\u011Fe giremezsin.",
{n:Number(R().members?.joinCooldownH??24)})}</p>
          ${lider?`<p class="kucuk" style="margin-top:8px">${tek?\u00E7("Birli\u011Fin tek \xFCyesisin: ayr\u0131l\u0131rsan birlik da\u011F\u0131l\u0131r, kasas\u0131 ve deposu \xFClkenin hazinesine ge\xE7er."):
\u00E7("Lidersin: ayr\u0131l\u0131nca liderlik s\u0131rayla vekile, en eski komutana, en eski ikmal sorumlusuna ya da en eski \xFCyeye ge\xE7er. \u0130stersen \xF6nce liderli\u011Fi devret.")}</p>`:""}`,
dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Ayr\u0131l"),sinif:"mercan",ikon:"door-open",is:async()=>{await islem("unit_leave",{},\u00E7("Birlikten ayr\u0131ld\u0131n."),"door-open")&&(secTur=null,
konusmaTazele())}}]})}function dagit(){pencere({ust:\u00E7("Birlik"),baslik:\u00E7("Birli\u011Fi da\u011F\u0131t"),govde:`<p class="aciklama">${\u00E7("Birlik kapan\u0131r: \xFCyelikler biter, emanetler sahip\
lerine, tahsisler kayna\u011F\u0131na d\xF6ner; kasa ve depo \xFClkenin hazinesine ge\xE7er. Geri al\u0131namaz.")}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Da\u011F\u0131t"),sinif:"mercan",
ikon:"trash",is:async()=>{await islem("unit_dissolve",{},\u00E7("Birli\u011Fi da\u011F\u0131tt\u0131n."),"trash")&&(secTur=null,konusmaTazele())}}]})}const tazele=tazeleyici(async()=>{await yukle(),kapandi||
ciz()});await yukle(),ciz();const b1=Durum.dinle("olay",({olay})=>{/^(unit\.|citizenship\.changed)/.test(olay)&&(yakinda(),olay!=="unit.invited"&&konusmaTazele())}),b2=Durum.dinle("ulke-olay",({olay})=>{
/^unit\.(founded|dissolved)$/.test(olay)&&!v?.mine?.unit&&yakinda()}),saat=setInterval(()=>{!document.hidden&&!document.querySelector(".perde")&&tazele()},6e4);return()=>{kapandi=!0,durdur(),b1(),b2(),
clearInterval(saat),clearTimeout(bekleyen),kanalBirak?.(),kanalBirak=null,kanal=null,karargah.kapat()}}}),Parcalar.tamam("ek_98b_birlik");
