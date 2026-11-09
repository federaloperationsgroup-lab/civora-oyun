// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_95_meydan.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("meydan/meydan",{async ac(kap){let sc=null,d=null,kapandi=!1,yer=null,dinleBirak=null,sonTellal;const kart=MeydanSahnesi.ac(),benimUlke=()=>Durum.v.ozet?.character?.citizenship??null;let ms=null,
kanalBirak=null,kalp=null,kalpMs=0,durumZaman=null,sonEylem=0,giriyor=null,dbEylem=!1;const kisiler=new Map,yuruS={son:0,pencere:0,n:0,bekleyen:null,zaman:null};let benYerel=null;const benimki=()=>ms?
kisiler.get(ms.presence_id)??null:null,donusKapisi=MeydanYolu.donusAl();let ilkGiris=!0,kapiNiyet=null,akis={kartlar:[],gundem:{etiketler:[],one:null},gazete:[],kus:null},yan={kapsam:"all",posts:[],kurallar:null,
yeni:0},listeAcik=!1;try{listeAcik=localStorage.getItem("civora.meydan.liste")==="1"}catch{}function sahneVerisi(){const burada=new Set([...kisiler.values()].filter(k=>!k.hidden&&k.character_id).map(k=>k.
character_id));return{...d,...akis,cay:d.cay.filter(m=>!m.kimlik||!burada.has(m.kimlik)),oyuncuSayi:kisiler.size,kapiListe:meydanKapilari(d,benimUlke()),kapiYer:ms?.rule?.doors??null,kapiHedef:kapiNiyet?.
kapi??null}}async function yukle(){sc=await Sunucu.cagir("square_scene"),d=meydanVerisi(sc)}async function akisYukle(){try{akis=await meydanAkisVerisi(d?.ulke??null)}catch{}}function yerDinle(){const yeni=sc?.
place_id??null;yeni!==yer&&(dinleBirak?.(),dinleBirak=null,yer=yeni,yer&&(dinleBirak=Sunucu.Canli.dinle("place:"+yer,(olay,yuk)=>{if(!/^chat\.(message|hidden)$/.test(olay))return;const m=yuk?.data??{};
olay==="chat.message"&&m.channel==="place"&&m.author_id&&kart.balon(m.author_id,m.body??""),gecikmeliTazele()})))}function tellalBak(){const k=d.tellal?.anahtar??null;k&&k!==sonTellal&&(!(sonTellal===
void 0)||Date.now()-Date.parse(d.tellal.at)<15*6e4)&&kart.cal(),sonTellal=k}function liste(){const[sik,sm]=meydanSahneMetni(d.sahne),sahneGit=d.ulke&&d.ulke===benimUlke()?{devlet:"ulke/ozet",yemin:"ul\
ke/ozet",sonuc:"ulke/secim",hareket:"ulke/hareket",afis:"ulke/secim"}[d.sahne.tur]:null,satir=(ik,ust,govde,dugme2)=>`<div class="meydan-satir"><span class="ik-kutu">${ikon(ik)}</span><div class="meyd\
an-satir-ic">
          <p class="ust-yazi">${ust}</p>${govde}</div>${dugme2??""}</div>`,dugme=(git2,ad,ik="arrow-right")=>`<button class="dugme ikincil kucuk-d" data-meydan-git="${git2}">${ikon(ik)}${ad}</button>`,
paylasim=d.paylasimlar.map(p=>`<li><b>${esc(p.author_name??"")}</b> ${esc(meydanKisa(p.body,90))}</li>`).join(""),cay=d.cay.map(m=>`<li><b>${esc(m.ad)}</b>${m.ulke&&m.ulke!==d.ulke?` <span class="cip \
kucuk-cip">${esc(ulkeAdi(m.ulke))}</span>`:""} ${sohbetKisaHtml(m.tam,90)}</li>`).join(""),et=akis.gundem.etiketler.map(t=>`<span class="cip">#${esc(t.tag)} \xB7 ${esc(\u00E7("{n} ki\u015Fi",{n:sayi(t.
n)}))}</span>`).join(" ");return`<section class="kart meydan-liste" id="meydan-liste"><p class="ust-yazi">${\u00E7("Meydanda neler var")}</p>
        ${satir("bell",\u00E7("Tellal"),`<p id="meydan-tellal">${d.tellal?esc(d.tellal.metin):\u00E7("Bug\xFCn duyurulacak b\xFCy\xFCk bir haber yok.")}</p>`,d.tellal?dugme("tellal",\u00E7("Dinle"),"b\
ell"):"")}
        ${satir("drama",\u00E7("T\xF6ren sahnesi"),`<p id="meydan-sahne-yazi">${esc(sm)}</p>`,sahneGit?dugme("sahne",\u00E7("Git")):"")}
        ${d.imza?satir("pencil",\u00E7("\u0130mza masas\u0131"),`<p id="meydan-imza-yazi">${esc(\u00E7("{ad}: {esya} \xB7 {durum}",{ad:d.imza.ad,esya:imzaEsyaYazi(d.imza),durum:imzaDurumYazi(d.imza)}))}${d.
imzalar.length>1?" "+esc(\u00E7("(ve {n} imza g\xFCn\xFC daha)",{n:sayi(d.imzalar.length-1)})):""}</p>`,dugme("imza",d.imza.durum==="live"&&!d.imza.benim&&!d.imza.hatiram&&d.imza.alinan<d.imza.tavan?\u00E7(
"\u0130mza al"):\u00E7("Bak"),"pencil")):""}
        ${satir("trending-up",\u00E7("G\xFCndem duvar\u0131"),et?`<p class="meydan-gundem-cipler">${et}</p>`:`<p>${\u00E7("G\xFCndemde bug\xFCn etiket yok.")}</p>`,dugme("gundem",\u00E7("G\xFCndem"),"\
trending-up"))}
        ${satir("newspaper",\u00E7("\u015Eehrin panosu \xB7 son 24 saat"),`<p>${d.pano?\u00E7("{n} payla\u015F\u0131m",{n:sayi(d.pano)}):\u00E7("Panoda bug\xFCn payla\u015F\u0131m yok.")}</p>${paylasim?
`<ul class="meydan-ufak">${paylasim}</ul>`:""}`,dugme("pano",\u00E7("Ak\u0131\u015F")))}
        ${satir("megaphone",\u00E7("Hatip k\xFCrs\xFCs\xFC"),`<p id="meydan-kursu-yazi">${esc(kursuMetni())}</p>`,dugme("kursu",\u00E7("K\xFCrs\xFC"),"megaphone"))}
        ${satir("scroll-text",\u00E7("Resm\xEE kay\u0131tlar"),d.kayitlar.length?`<ul class="meydan-ufak">${d.kayitlar.map(m=>`<li>${esc(m)}</li>`).join("")}</ul>`:`<p>${\u00E7("Son yedi g\xFCnde resm\xEE k\
ay\u0131t yok.")}</p>`,d.kayitlar.length?dugme("ekran",\u00E7("Kay\u0131tlar"),"scroll-text"):"")}
        ${satir("newspaper",\u00E7("Gazete b\xFCfesi"),akis.gazete.length?`<ul class="meydan-ufak">${akis.gazete.map(m=>`<li><b>${esc(m.gazete)}</b> ${esc(m.baslik)}</li>`).join("")}</ul>`:`<p>${\u00E7(
"Bug\xFCn man\u015Fet yok.")}</p>`,akis.gazete.length?dugme("bufe",\u00E7("Oku"),"newspaper"):"")}
        ${satir("message-circle",\u00E7("\xC7ay bah\xE7esi \xB7 Buras\u0131"),d.yolda?`<p>${\u00E7("Yoldayken \xE7ay bah\xE7esine oturulmaz.")}</p>`:`<p id="meydan-cay-oturan">${esc(cayOturanMetni())}\
</p>${cay?`<ul class="meydan-ufak" id="meydan-cay">${cay}</ul>`:`<p>${\u00E7("Buras\u0131'nda hen\xFCz konu\u015Fma yok; ilk sen yaz.")}</p>`}`,d.yolda?"":`${dugme("cay",\u00E7("Otur"),"armchair")} ${dugme(
"cay-konus",\u00E7("Konu\u015F"),"message-circle")}`)}
        ${satir("users-round",\u00E7("Hat\u0131ra k\xF6\u015Fesi"),`<p>${d.foto?\u00E7("{n} arkada\u015F \xB7 {m} \xE7evrimi\xE7i",{n:sayi(d.foto),m:sayi(d.cevrimici)}):\u00E7("Hen\xFCz arkada\u015F\u0131n yok; Ar\
kada\u015Flar'dan ekleyebilirsin.")}</p>`,dugme("hatira",\u00E7("Arkada\u015Flar")))}
        ${satir("users-round",`<span id="meydan-kisiler-ust">${esc(kisilerUst())}</span>`,`<div id="meydan-kisiler">${kisilerHtml()}</div>`,`<span id="meydan-adgizle-yer">${adGizleDugme()}</span>`)}
        ${satir("footprints",\u00E7("Yoldan ge\xE7enler"),`<p>${\u00E7("Son yar\u0131m saatte \u015Fehirde {n} ki\u015Fi.",{n:sayi(d.bulunan)})} ${\u00E7("Meydanda en \xE7ok {n} ki\u015Fi y\xFCr\xFCr; sahte kalabal\
\u0131k yok.",{n:MEYDAN_YAYA})}</p>`)}
        <p class="ust-yazi meydan-mekanlar-ust">${\u00E7("Mek\xE2nlar \xB7 kap\u0131lar")}</p>
        <div id="meydan-mekanlar">${meydanKapilari(d,benimUlke()).map(k=>satir(k.ik,esc(k.ad),`<p data-kapi-yazi="${k.kapi}">${esc(k.uzun)}</p>`,dugme("kapigit:"+k.kapi,k.kilitli?\u00E7("Kapal\u0131"):
\u00E7("Git"),k.kilitli?"lock":"door-open"))).join("")}</div>
      </section>`}function cayOturanMetni(){const oturan=[...kisiler.values()].filter(k=>k.emote==="sit"&&meydanSandalye(Number(k.x)/100,Number(k.z)/100));if(!oturan.length)return \u00E7("Masalar bo\u015F.\
 \xC7ay bah\xE7esine dokununca oraya y\xFCr\xFCy\xFCp oturursun; oturanlar Buras\u0131'nda konu\u015Fur.");const adlar=oturan.map(k=>k.me?\u00E7("sen"):k.hidden?\u00E7("biri"):k.name).join(", ");return \u00E7(
"Masalarda {n} ki\u015Fi: {adlar}.",{n:oturan.length,adlar})}function kisilerUst(){return \u00E7("Meydandakiler")+(ms&&Number(ms.instance)>1?" \xB7 "+\u00E7("Meydan {n}",{n:Number(ms.instance)}):"")}function kisilerHtml(idli=!0){
if(!ms)return`<p>${d?.yolda?\u00E7("Yoldayken meydana girilmez; vard\u0131\u011F\u0131n \u015Fehrin meydan\u0131na girersin."):\u00E7("Meydana giriliyor\u2026")}</p>`;const digerleri=[...kisiler.values()].
filter(k=>!k.me),gizli=digerleri.filter(k=>k.hidden).length,adli=digerleri.filter(k=>!k.hidden).sort((a,b)=>b.friend-a.friend||String(a.name).localeCompare(String(b.name),DIL.yerel)),ben=benimki(),metin=(digerleri.
length?\u00E7("Sen ve {n} ki\u015Fi daha meydandas\u0131n\u0131z.",{n:digerleri.length}):\u00E7("Meydanda \u015Fimdilik yaln\u0131zs\u0131n; biri gelince fig\xFCr\xFCyle g\xF6r\xFCn\xFCr."))+(gizli?" "+
\u00E7("{n} ki\u015Fi ad\u0131n\u0131 gizledi.",{n:gizli}):"")+(ben?.hides_name?" "+\u00E7("Senin ad\u0131n gizli."):""),cipler=[...adli.map(k=>`<button class="cip meydan-kisi-cip${k.friend?" arkadas":
""}" data-meydan-kisi="${esc(k.p)}">${k.friend?ikon("heart"):""}${esc(k.name)}</button>`),...digerleri.filter(k=>k.hidden).map(k=>`<button class="cip meydan-kisi-cip" data-meydan-kisi="${esc(k.p)}">${ikon(
"eye-off")}${esc(\u00E7("Biri"))}</button>`)];return`<p${idli?' id="meydan-kisiler-yazi"':""}>${esc(metin)}</p>${cipler.length?`<div class="meydan-kisiler">${cipler.join("")}</div>`:""}`}const adGizleDugme=(idli=!0)=>{
const ben=benimki();return ben?`<button class="dugme ikincil kucuk-d"${idli?' id="meydan-adgizle"':""} data-meydan-git="adgizle" aria-pressed="${ben.hides_name?"true":"false"}">${ikon(ben.hides_name?"\
eye":"eye-off")}${ben.hides_name?\u00E7("Ad\u0131m\u0131 g\xF6ster"):\u00E7("Ad\u0131m\u0131 gizle")}</button>`:""};function cayYaz(){const c=$("#meydan-cay-oturan",kap);c&&(c.textContent=cayOturanMetni())}
function kisilerYaz(){cayYaz();const u=$("#meydan-kisiler-ust",kap),g=$("#meydan-kisiler",kap),a=$("#meydan-adgizle-yer",kap);if(u&&(u.textContent=kisilerUst()),g&&(g.innerHTML=kisilerHtml(),kisiBagla(
g)),a){a.innerHTML=adGizleDugme();for(const b of $$("[data-meydan-git]",a))b.addEventListener("click",()=>git(b.dataset.meydanGit))}kart.sayfaAcik()==="kisiler"&&kisilerSayfa()}function kisiBagla(kok){
for(const b of $$("[data-meydan-kisi]",kok))b.addEventListener("click",()=>kisiKart(b.dataset.meydanKisi))}const listeDugme=()=>`<button class="dugme sade kucuk-d meydan-liste-ac" type="button" id="me\
ydan-liste-ac" aria-expanded="${listeAcik}">${ikon(listeAcik?"arrow-up":"chevron-down")}${listeAcik?\u00E7("Listeyi gizle"):\u00E7("Liste g\xF6r\xFCn\xFCm\xFC")}</button>`;function ciz(){const yol=d.yol?
\u00E7("Yoldas\u0131n: {a} \u2192 {b}. Burada \xE7\u0131kt\u0131\u011F\u0131n \u015Fehrin meydan\u0131; var\u0131nca {b} meydan\u0131ndas\u0131n.",{a:bolgeAdi(d.yol.from),b:bolgeAdi(d.yol.to)}):"",vakit=d.
gece>.5?\u00E7("Gece"):\u00E7("G\xFCnd\xFCz");kap.innerHTML=`<div class="sayfa meydan-sayfa">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Meydan")}</p><h1 class="b1" id="meydan-h1">${esc(\u00E7("{sehir} meydan\u0131",{sehir:bolgeAdi(d.bolge)}))}</h1>
          <p class="aciklama" id="meydan-ust">${esc([d.ulke?ulkeAdi(d.ulke):"",vakit,havaAdi({tur:d.hava,guclu:d.havaGuclu}),\u00E7("\u015Fu an {n} ki\u015Fi",{n:sayi(d.bulunan)})].filter(Boolean).join(
" \xB7 "))}</p></div></div>
        ${yol?`<div class="bilgi-kutusu" id="meydan-yolda" style="margin-bottom:12px">${ikon("route")}<span>${esc(yol)}</span></div>`:""}
        <div id="meydan-bayram"></div>
        <div id="meydan-kart-yer"></div>
        <div class="meydan-liste-dugme">${listeDugme()}</div>
        <div id="meydan-liste-yer"${listeAcik?"":" hidden"}>${liste()}</div>
      </div>`,$("#meydan-kart-yer",kap).replaceWith(kart.el),kart.yaz(sahneVerisi()),Millet.bayramBandi($("#meydan-bayram",kap)),listeBagla(),listeDugmeBagla()}function listeBagla(){for(const b of $$(
"#meydan-liste [data-meydan-git]",kap))b.addEventListener("click",()=>git(b.dataset.meydanGit));kisiBagla($("#meydan-liste",kap))}function listeDugmeBagla(){$("#meydan-liste-ac",kap)?.addEventListener(
"click",()=>{listeAcik=!listeAcik;try{localStorage.setItem("civora.meydan.liste",listeAcik?"1":"0")}catch{}$("#meydan-liste-yer",kap).hidden=!listeAcik,$(".meydan-liste-dugme",kap).innerHTML=listeDugme(),
listeDugmeBagla(),listeAcik&&$("#meydan-liste",kap)?.scrollIntoView({block:"start",behavior:hareketAzalt?"auto":"smooth"})})}function tazeCiz(){if(!$("#meydan-liste-yer",kap)){ciz();return}$("#meydan-\
h1",kap).textContent=\u00E7("{sehir} meydan\u0131",{sehir:bolgeAdi(d.bolge)});const vakit=d.gece>.5?\u00E7("Gece"):\u00E7("G\xFCnd\xFCz");if($("#meydan-ust",kap).textContent=[d.ulke?ulkeAdi(d.ulke):"",
vakit,havaAdi({tur:d.hava,guclu:d.havaGuclu}),\u00E7("\u015Fu an {n} ki\u015Fi",{n:sayi(d.bulunan)})].filter(Boolean).join(" \xB7 "),!!$("#meydan-yolda",kap)!=!!d.yol){ciz();return}$("#meydan-liste-ye\
r",kap).innerHTML=liste(),listeBagla(),kart.yaz(sahneVerisi()),kart.sayfaAcik()==="gundem"&&gundemSayfa()}function git(ad){if(ad==="adgizle"){adGizle();return}if(ad.startsWith("kapi:")){kapiyaGit(ad.slice(
5));return}if(ad.startsWith("kapigit:")){kapiyaGit(ad.slice(8),!0);return}if(ad==="pano"){akisAc();return}if(ad==="ekran"){kayitlarSayfa();return}if(ad==="hatira"){Kabuk.git("meydan/arkadas");return}if(ad===
"gundem"){gundemSayfa();return}if(ad==="kursu"){kursuSayfa();return}if(ad==="imza"){d.imza?imzaKartiAc(d.imza,()=>tazele()):tost(\u00E7("Bug\xFCn bu meydanda imza g\xFCn\xFC yok."),"pencil");return}if(ad===
"bufe"){meydanBufeAc(akis.gazete);return}if(ad==="kus"){meydanPaylasimAc(akis.kus?.post,akisTazele);return}if(ad==="cay"){cayaOtur();return}if(ad==="cay-konus"){if(d.yolda){tost(\u00E7("Yoldayken \xE7ay \
bah\xE7esine oturulmaz."),"route");return}Konusma.ac("burasi");return}if(ad==="tellal"){d.tellal?(kart.cal(),tost(d.tellal.metin,"bell")):tost(\u00E7("Bug\xFCn duyurulacak b\xFCy\xFCk bir haber yok."),
"bell");return}if(ad==="sahne"){const r=d.ulke&&d.ulke===benimUlke()?{devlet:"ulke/ozet",yemin:"ulke/ozet",sonuc:"ulke/secim",hareket:"ulke/hareket",afis:"ulke/secim"}[d.sahne.tur]:null;r?Kabuk.git(r):
tost(meydanSahneMetni(d.sahne)[1],"drama")}}kart.dinle("git",git),kart.dinle("kart",p=>meydanPaylasimAc(p,akisTazele)),kart.dinle("cizildi",()=>yanCiz()),kart.dinle("hizli",ad=>{ad==="akis"?akisAc():ad===
"gundem"?gundemSayfa():ad==="kursu"?kursuSayfa():ad==="cay"?git("cay"):ad==="kisiler"&&kisilerSayfa()});function akisAc(){const y=kart.yan;if(y&&getComputedStyle(y).display!=="none"){$(".meydan-akis-f\
orm textarea",y)?.focus({preventScroll:!0}),y.classList.add("vurgu"),setTimeout(()=>y.classList.remove("vurgu"),900);return}akisSayfa()}function kayitlarSayfa(){kart.sayfaAc("kayitlar",\u00E7("Resm\xEE k\
ay\u0131tlar"),`${d.kayitlar.length?`<ul class="meydan-ufak">${d.kayitlar.map(m=>`<li>${esc(m)}</li>`).join("")}</ul>`:`<p class="bos">${\u00E7("Son yedi g\xFCnde resm\xEE kay\u0131t yok.")}</p>`}
        <button class="dugme sade kucuk-d tam" type="button" data-meydan-akis-git>${ikon("arrow-right")}${\u00E7("Ak\u0131\u015F'\u0131n tamam\u0131")}</button>`,s=>$("[data-meydan-akis-git]",s)?.addEventListener(
"click",()=>Kabuk.git("meydan/akis")))}const YAN_KAPSAM={all:\u00E7("Hepsi"),country:\u00E7("\xDClkem"),world:\u00E7("D\xFCnya")};async function yanYukle(){const[f,kurallar]=await Promise.all([Sunucu.
cagir("square_feed",{p_scope:yan.kapsam,p_mode:"recent",p_limit:12}).catch(()=>({posts:[]})),Durum.kurallar()]);yan.posts=f.posts??[],yan.kurallar=kurallar,yan.yeni=0}const yanPaylasim=p=>`<article cl\
ass="meydan-akis-satir" data-post="${p.post_id}">
        <button class="meydan-akis-yazar" type="button" data-profil="${esc(p.author_id)}"><b>${esc(p.author_name)}</b><span class="kucuk">${esc(zamanOnce(p.at))}${p.podium?" \xB7 "+esc(\u00E7("k\xFCrs\xFCde\
n")):""}</span></button>
        <p class="meydan-akis-metin" data-ac="${p.post_id}">${bahsetmeli(meydanKisa(p.body,200))}</p>
        <div class="meydan-akis-alt">
          <button type="button" data-alkis="${p.post_id}" aria-pressed="${!!p.applauded_by_me}"${p.mine?" disabled":""}>${ikon("hand")}<span>${sayi(p.applause)}</span><span class="gizli-ad">${\u00E7("\
Alk\u0131\u015F")}</span></button>
          <button type="button" data-yanki="${p.post_id}" aria-pressed="${!!p.echoed_by_me}"${p.mine?" disabled":""}>${ikon("repeat-2")}<span>${sayi(p.echoes)}</span><span class="gizli-ad">${\u00E7("Y\
ank\u0131")}</span></button>
          <button type="button" data-yanit="${p.post_id}">${ikon("message-circle")}<span>${sayi(p.replies)}</span><span class="gizli-ad">${\u00E7("Yan\u0131t")}</span></button>
        </div></article>`;function akisHtml(){const sk=yan.kurallar?.data?.social?.square;return`<div class="meydan-akis">
        <div class="akis-suzgec" role="tablist">${Object.entries(YAN_KAPSAM).map(([k,a])=>`<button class="altsekme" type="button" data-yan-kapsam="${k}" aria-pressed="${yan.kapsam===k}">${esc(a)}</but\
ton>`).join("")}</div>
        <form class="form meydan-akis-form" novalidate>
          <label class="alan"><span>${\u00E7("Meydandan Ak\u0131\u015F'a yaz")}</span><textarea name="metin" maxlength="${sk?.maxLength??200}" placeholder="${esc(\u00E7("Meydana bir \u015Fey yaz\u2026 #Bar\u0131\u015F"))}\
"></textarea></label>
          <div class="satir" style="justify-content:space-between;flex-wrap:wrap;gap:6px">
            <select name="kapsam" aria-label="${esc(\u00E7("Kim g\xF6rs\xFCn"))}">${Object.entries(YAZ_KAPSAM).filter(([k])=>k!=="party").map(([k,a])=>`<option value="${k}">${esc(a)}</option>`).join("")}\
</select>
            <button class="dugme altin kucuk-d" type="submit">${ikon("send")}${\u00E7("Payla\u015F")}</button></div>
          <div class="form-mesaj"></div>
        </form>
        <button class="dugme ikincil tam kucuk-d" type="button" data-akis-yeni${yan.yeni?"":" hidden"}>${ikon("arrow-up-right")}${\u00E7("Yeni payla\u015F\u0131mlar var \xB7 g\xF6ster")}</button>
        <div class="meydan-akis-liste">${yan.posts.map(yanPaylasim).join("")||`<p class="bos">${\u00E7("Burada hen\xFCz payla\u015F\u0131m yok. \u0130lk sen yaz.")}</p>`}</div>
        <button class="dugme sade kucuk-d tam" type="button" data-meydan-akis-git>${ikon("arrow-right")}${\u00E7("Ak\u0131\u015F'\u0131n tamam\u0131")}</button>
      </div>`}function taslakAl(kok,secici=".meydan-akis-form"){const t=kok?$(secici+" textarea",kok):null;return t?{metin:t.value,kapsam:$(secici+" select",kok)?.value??null,odak:document.activeElement===
t,bas:t.selectionStart,son:t.selectionEnd}:null}function taslakKoy(kok,x,secici=".meydan-akis-form"){const t=x&&kok?$(secici+" textarea",kok):null;if(!t)return;t.value=x.metin;const s=$(secici+" selec\
t",kok);if(s&&x.kapsam&&(s.value=x.kapsam),x.odak){t.focus({preventScroll:!0});try{t.setSelectionRange(x.bas,x.son)}catch{}}}function yeniBandi(){for(const b of $$("[data-akis-yeni]",kart.el))b.hidden=
!yan.yeni}function akisBagla(kok){for(const b of $$("[data-yan-kapsam]",kok))b.onclick=async()=>{yan.kapsam=b.dataset.yanKapsam,await yanYukle(),akisCiz()};for(const b of $$("[data-profil]",kok))b.onclick=
()=>profilAc(b.dataset.profil,akisTazele);for(const b of $$("[data-ac]",kok))b.onclick=()=>meydanPaylasimAc(yan.posts.find(p=>p.post_id===Number(b.dataset.ac)),akisTazele);for(const b of $$("[data-alk\
is]",kok))b.onclick=()=>yanTepki(Number(b.dataset.alkis),"applause");for(const b of $$("[data-yanki]",kok))b.onclick=()=>yanTepki(Number(b.dataset.yanki),"echo");for(const b of $$("[data-yanit]",kok))
b.onclick=()=>meydanYanitla(yan.posts.find(p=>p.post_id===Number(b.dataset.yanit)),akisTazele);$("[data-meydan-akis-git]",kok)?.addEventListener("click",()=>Kabuk.git("meydan/akis")),$("[data-akis-yen\
i]",kok)?.addEventListener("click",akisTazele);const f=$(".meydan-akis-form",kok);f&&bahsetmeOner($("textarea, input[name=metin]",f)),f?.addEventListener("submit",async e=>{e.preventDefault();const v=new FormData(
f),metin=String(v.get("metin")??"").trim(),yerM=$(".form-mesaj",f);if(!metin){yerM.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("Bo\u015F payla\u015F\u0131m olmaz.")}</spa\
n></div>`;return}const b=$("button[type=submit]",f);b.disabled=!0;try{await Sunucu.yap("square_post",{p_scope:v.get("kapsam"),p_body:metin}),tost(ms?\u00E7("Payla\u015F\u0131ld\u0131; meydandakiler balonda g\xF6r\xFCr."):
\u00E7("Payla\u015F\u0131ld\u0131."),"send"),f.reset(),await akisTazele()}catch(err){err.kod==="TERMS_REQUIRED"&&kurallariKabul(),yerM.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(
hataMetni(err))}</span></div>`,b.disabled=!1}})}async function yanTepki(id,tur){const p=yan.posts.find(x=>x.post_id===id);p&&await meydanTepki(p,tur,akisCiz)}function yanCiz(){const y=kart.yan;if(!y||
!yan.kurallar)return;const t=taslakAl(y);y.innerHTML=`<p class="ust-yazi">${\u00E7("Ak\u0131\u015F")}</p>${akisHtml()}`,akisBagla(y),taslakKoy(y,t)}function akisSayfa(){const t=kart.sayfaAcik()==="aki\
s"?taslakAl($("#meydan-alt-sayfa",kart.el)):null,s=kart.sayfaAc("akis",\u00E7("Ak\u0131\u015F"),akisHtml(),akisBagla);s&&taslakKoy(s,t)}function akisCiz(){yanCiz(),kart.sayfaAcik()==="akis"&&akisSayfa()}
async function akisTazele(){await Promise.all([yanYukle(),akisYukle()]),!kapandi&&(akisCiz(),kart.yaz(sahneVerisi()))}async function yuzlerTazele(){await akisYukle(),!(kapandi||!d)&&(kart.yaz(sahneVerisi()),
kart.sayfaAcik()==="gundem"&&gundemSayfa())}let akisGecikme=null;const akisGecikmeli=()=>{clearTimeout(akisGecikme),akisGecikme=setTimeout(()=>{kapandi||yuzlerTazele()},900)};function gundemSayfa(){const one=akis.
gundem.one,et=akis.gundem.etiketler;kart.sayfaAc("gundem",\u00E7("G\xFCndem"),`<div class="meydan-gundem">
          ${et.length?`<div class="gundem">${et.map(t=>`<span class="cip">#${esc(t.tag)} \xB7 ${esc(\u00E7("{n} ki\u015Fi",{n:sayi(t.n)}))}</span>`).join("")}</div>`:`<p class="bos">${\u00E7("G\xFCndemde\
 bug\xFCn etiket yok; #etiketli bir payla\u015F\u0131m yaz.")}</p>`}
          ${one?`<p class="ust-yazi" style="margin-top:10px">${\u00E7("G\xFCn\xFCn \xF6ne \xE7\u0131kan payla\u015F\u0131m\u0131")}</p>${yanPaylasim(one)}`:""}
          <button class="dugme sade kucuk-d tam" type="button" data-meydan-akis-git>${ikon("arrow-right")}${\u00E7("Ak\u0131\u015F'\u0131n tamam\u0131")}</button></div>`,s=>{if($("[data-meydan-akis-gi\
t]",s)?.addEventListener("click",()=>Kabuk.git("meydan/akis")),!!one){$("[data-profil]",s)?.addEventListener("click",()=>profilAc(one.author_id,akisTazele)),$("[data-ac]",s)?.addEventListener("click",
()=>meydanPaylasimAc(one,akisTazele));for(const b of $$("[data-alkis], [data-yanki]",s))b.addEventListener("click",()=>meydanTepki(one,b.dataset.alkis?"applause":"echo",()=>{gundemSayfa(),akisTazele()}));
$("[data-yanit]",s)?.addEventListener("click",()=>meydanYanitla(one,akisTazele))}})}function kisilerSayfa(){kart.sayfaAc("kisiler",kisilerUst(),`<div id="meydan-kisiler-sayfa">${kisilerHtml(!1)}</div>\

          <div class="satir" style="gap:6px;flex-wrap:wrap;margin-top:8px">${adGizleDugme(!1)}<button class="dugme sade kucuk-d" type="button" data-meydan-git="hatira">${ikon("users-round")}${\u00E7("\
Arkada\u015Flar")}</button></div>`,s=>{kisiBagla(s);for(const b of $$("[data-meydan-git]",s))b.addEventListener("click",()=>git(b.dataset.meydanGit))})}let kursuDurum=null,kursuSaat=null,kursuYurutZaman=null;
function kursuMetni(){const k=kursuDurum;if(!ms||!k)return \u00E7("Meydana girince s\u0131raya girebilirsin: s\u0131ra gelince 2 dakika k\xFCrs\xFC senin.");const konusan=k.speaker?kisiler.get(k.speaker):
null,ad=k.speaking?\u00E7("Sen"):konusan?konusan.hidden?\u00E7("Biri"):konusan.name:k.speaker_hidden?\u00E7("Biri"):null,sira=Number(k.queue_length??0);return ad?\u00E7("K\xFCrs\xFCde {ad}; s\u0131rada {n} ki\u015Fi.",
{ad,n:sira}):sira?\u00E7("K\xFCrs\xFC bo\u015F; s\u0131rada {n} ki\u015Fi.",{n:sira}):\u00E7("K\xFCrs\xFC bo\u015F; ilk sen konu\u015F.")}const kalanSn=iso=>Math.max(0,Math.ceil((Date.parse(iso)-(Date.
now()-(ms?._sapma??0)))/1e3)),sureYaz=sn=>`${Math.floor(sn/60)}:${String(sn%60).padStart(2,"0")}`;function kursuUygula(k){const once=kursuDurum;kursuDurum=k??null;const metin=k?.post&&k.post.visible!==
!1?k.post.body??null:null;kart.kursu(k?{konusan:k.speaker??null,gizli:!!k.speaker_hidden,bitis:k.ends_at??null,metin,alkis:Number(k.post?.applause??0),sira:Number(k.queue_length??0)}:null);const y=$("\
#meydan-kursu-yazi",kap);if(y&&(y.textContent=kursuMetni()),k?.speaking&&!once?.speaking?(tost(\u00E7("S\xF6z sende: 2 dakika k\xFCrs\xFC senin. \xDClkene ya da d\xFCnyaya yaz."),"megaphone"),kursuSayfa()):
kart.sayfaAcik()==="kursu"&&kursuSayfa(),clearTimeout(kursuYurutZaman),k?.ends_at){const kalan=Math.max(0,Date.parse(k.ends_at)-(Date.now()-(ms?._sapma??0))),ek=k.speaking?400:Number(k.my_position)===
1?1200:4e3+Math.random()*4e3,bitis=k.ends_at;kursuYurutZaman=setTimeout(()=>{kapandi||!ms||kursuDurum?.ends_at!==bitis||MeydanYolu.kursuYurut().then(j=>{!kapandi&&ms&&kursuUygula(j)}).catch(()=>{})},kalan+
ek)}}function kursuSaatKur(){clearInterval(kursuSaat),kursuSaat=null;const bitis=kursuDurum?.ends_at;!bitis||kart.sayfaAcik()!=="kursu"||(kursuSaat=setInterval(()=>{const s=$("#meydan-kursu-sure",kap);
if(!s||kart.sayfaAcik()!=="kursu"){clearInterval(kursuSaat),kursuSaat=null;return}s.textContent=sureYaz(kalanSn(bitis))},1e3))}function kursuSayfa(){const taslak=kart.sayfaAcik()==="kursu"?taslakAl($(
"#meydan-alt-sayfa",kart.el),".meydan-kursu-form"):null,k=kursuDurum,sk=Durum.v.kurallar?.data?.social?.square,konusan=k?.speaker?kisiler.get(k.speaker):null,ad=k?.speaking?\u00E7("Sen"):konusan?konusan.
hidden?\u00E7("Biri"):konusan.name:k?.speaker_hidden?\u00E7("Biri"):null,post=k?.post&&k.post.visible!==!1?k.post:null,siradakiler=(k?.queue??[]).map(p=>kisiler.get(p)).filter(Boolean).map(x=>x.me?\u00E7(
"Sen"):x.hidden?\u00E7("Biri"):x.name),bekleme=k?.rest_until&&Date.parse(k.rest_until)>Date.now()?Math.ceil((Date.parse(k.rest_until)-Date.now())/6e4):0;let govde=`<div class="meydan-kursu" data-kursu\
-durum="${k?.speaking?"konusuyor":k?.my_position?"sirada":ad?"dolu":"bos"}">`;ms?ad?govde+=`<div class="meydan-kursu-konusan"><p class="ust-yazi">${\u00E7("K\xFCrs\xFCde")}</p><p><b>${esc(ad)}</b> \xB7 <\
span id="meydan-kursu-sure">${sureYaz(kalanSn(k.ends_at))}</span></p>
          ${post?`<p class="paylasim-metin">${bahsetmeli(post.body)}</p>`:`<p class="kucuk">${esc(k.speaker_hidden?\u00E7("K\xFCrs\xFCde biri konu\u015Fuyor."):\u00E7("Hen\xFCz yazmad\u0131."))}</p>`}\

          ${post&&!post.mine?`<button class="dugme ${post.applauded_by_me?"ikincil":"altin"} kucuk-d" type="button" id="meydan-kursu-alkis" aria-pressed="${!!post.applauded_by_me}">${ikon("hand")}${post.
applauded_by_me?\u00E7("Alk\u0131\u015Flad\u0131n"):\u00E7("Alk\u0131\u015Fla")} \xB7 <b>${sayi(post.applause)}</b></button>`:post?`<p class="kucuk">${\u00E7("{n} alk\u0131\u015F",{n:sayi(post.applause)})}\
</p>`:""}</div>`:govde+=`<p>${esc(\u00E7("K\xFCrs\xFC bo\u015F; ilk sen konu\u015F."))}</p>`:govde+=`<p>${esc(\u00E7("Meydana girince s\u0131raya girebilirsin: s\u0131ra gelince 2 dakika k\xFCrs\xFC senin."))}\
</p>`,ms&&(govde+=`<p class="kucuk" style="margin-top:8px">${esc(siradakiler.length?\u00E7("S\u0131rada: {adlar}",{adlar:siradakiler.join(", ")}):Number(k?.queue_length??0)?\u00E7("S\u0131rada {n} ki\u015Fi.",
{n:Number(k.queue_length)}):\u00E7("S\u0131rada kimse yok."))}</p>`,k?.speaking?govde+=`<form class="form meydan-kursu-form" id="meydan-kursu-form" novalidate>
              <label class="alan"><span>${\u00E7("K\xFCrs\xFCden Ak\u0131\u015F'a yaz")}</span><textarea name="metin" maxlength="${sk?.maxLength??200}" placeholder="${esc(\u00E7("Meydandakilere sesini\
 duyur\u2026"))}"></textarea></label>
              <div class="satir" style="justify-content:space-between;flex-wrap:wrap;gap:6px">
                <select name="kapsam" aria-label="${esc(\u00E7("Kim g\xF6rs\xFCn"))}"><option value="country">${esc(\u00E7("\xDClkem"))}</option><option value="world">${esc(\u00E7("D\xFCnya"))}</optio\
n></select>
                <button class="dugme altin kucuk-d" type="submit">${ikon("megaphone")}${\u00E7("K\xFCrs\xFCden yaz")}</button></div>
              <div class="form-mesaj"></div></form>
            <button class="dugme sade kucuk-d" type="button" id="meydan-kursu-in">${ikon("arrow-down")}${\u00E7("K\xFCrs\xFCden in")}</button>`:k?.my_position?govde+=`<p><b>${esc(\u00E7("S\u0131radas\u0131n: {n\
}.",{n:k.my_position}))}</b></p><button class="dugme sade kucuk-d" type="button" id="meydan-kursu-in">${ikon("x")}${\u00E7("S\u0131radan \xE7\u0131k")}</button>`:bekleme?govde+=`<p class="kucuk">${esc(
\u00E7("K\xFCrs\xFCden yeni indin; {n} dakika sonra yeniden s\u0131raya girebilirsin.",{n:bekleme}))}</p>`:govde+=`<button class="dugme altin kucuk-d" type="button" id="meydan-kursu-gir">${ikon("megap\
hone")}${ad?\u00E7("S\u0131raya gir"):\u00E7("K\xFCrs\xFCye \xE7\u0131k")}</button>
            <p class="kucuk">${esc(\u00E7("S\u0131ra gelince 2 dakika k\xFCrs\xFC senin; Ak\u0131\u015F'a meydan\u0131n kurallar\u0131yla yazars\u0131n. Ad\u0131n\u0131 gizlerken k\xFCrs\xFCye \xE7\u0131k\u0131lmaz."))}\
</p>`),govde+="</div>",kart.sayfaAc("kursu",\u00E7("Hatip k\xFCrs\xFCs\xFC"),govde,s=>{$("#meydan-kursu-gir",s)?.addEventListener("click",async()=>{try{kursuUygula(await MeydanYolu.kursuGir())}catch(e){
tost(hataMetni(e),"megaphone")}}),$("#meydan-kursu-in",s)?.addEventListener("click",async()=>{try{kursuUygula(await MeydanYolu.kursuIn())}catch(e){tost(hataMetni(e),"megaphone")}}),$("#meydan-kursu-al\
kis",s)?.addEventListener("click",async()=>{post&&(await meydanTepki(post,"applause"),post.applauded_by_me&&ms&&Date.now()-sonEylem>=Number(ms.rule?.emoteMinMs??2e3)&&eylemYap("cheer"),kursuSayfa())});
const f=$("#meydan-kursu-form",s);f?.addEventListener("submit",async e=>{e.preventDefault();const v=new FormData(f),metin=String(v.get("metin")??"").trim(),yerM=$(".form-mesaj",f);if(!metin){yerM.innerHTML=
`<div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("Bo\u015F payla\u015F\u0131m olmaz.")}</span></div>`;return}const b=$("button[type=submit]",f);b.disabled=!0;try{const r=await MeydanYolu.
kursuYaz(v.get("kapsam"),metin);tost(\u00E7("K\xFCrs\xFCden yazd\u0131n; meydandakiler balonda g\xF6r\xFCyor."),"megaphone"),f.reset(),kursuUygula(r.podium),akisTazele()}catch(err){err.kod==="TERMS_RE\
QUIRED"&&kurallariKabul(),yerM.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(err))}</span></div>`,b.disabled=!1}}),taslakKoy(s,taslak,".meydan-kursu-form")}),kursuSaatKur()}
async function meydanaGir(){if(!(kapandi||!d||d.yolda))return giriyor||(giriyor=(async()=>{try{const kapi=ilkGiris&&donusKapisi&&!kapiKilidi(donusKapisi)?donusKapisi:null,s=await MeydanYolu.gir(kapi);
if(ilkGiris=!1,kapandi){MeydanYolu.cik().catch(()=>{});return}durumAl(s)}catch(e){e?.kod==="ON_THE_ROAD"?meydandanCikti():console.warn("Meydana girilemedi:",e)}finally{giriyor=null}})(),giriyor)}function durumAl(s){
if(kapandi)return;if(!s?.in_square){meydandanCikti();return}ms?.topic!==s.topic&&(kanalBirak?.(),kanalBirak=MeydanYolu.dinle(s.topic,canliOlay)),ms=s,s.server_time&&(ms._sapma=Date.now()-Date.parse(s.
server_time)),kisiler.clear();for(const k of s.people??[])kisiler.set(k.p,k);OdaYolu.uygula("square",s.topic,kisiler),dbEylem=dbEylem&&Date.now()-sonEylem<1e4||!!kisiler.get(s.presence_id)?.emote;const ben=benimki();
ben&&benYerel&&Date.now()-benYerel.t<4e3&&Object.assign(ben,benYerel.veri),kalpKur(),kursuUygula(s.podium??null),kart.oyuncular([...kisiler.values()],ms.presence_id,ms.rule,ms.server_time,Number(ms.instance)),
kart.yaz(sahneVerisi()),kisilerYaz()}function meydandanCikti(){OdaYolu.birak("square"),kapiNiyetBitir(),cayNiyetBitir(),kanalBirak?.(),kanalBirak=null,ms=null,kisiler.clear(),kart.oyuncular([],null),kursuUygula(
null),d&&kart.yaz(sahneVerisi()),kisilerYaz()}function kalpKur(){const yeni=Math.max(10,Number(ms?.rule?.heartbeatSec??45))*1e3;kalp&&yeni===kalpMs||(clearInterval(kalp),kalpMs=yeni,kalp=setInterval(()=>{
document.hidden||meydanaGir()},kalpMs))}const gorunurluk=()=>{!document.hidden&&!kapandi&&meydanaGir()};document.addEventListener("visibilitychange",gorunurluk);let olayTampon=null;function durumIste(){
clearTimeout(durumZaman),durumZaman=setTimeout(()=>{if(!ms||kapandi)return;const tampon=olayTampon=[],bitir=()=>{olayTampon===tampon&&(olayTampon=null)};MeydanYolu.durum().then(s=>{bitir(),durumAl(s);
for(const[o,v]of tampon)canliOlay(o,v)}).catch(bitir)},400)}async function megafonGoster(p,post){if(!kisiler.get(p))return;let metin=null;try{metin=(await Sunucu.cagir("square_get",{p_post:post}))?.body??
null}catch{metin=null}kapandi||!ms||kart.megafon(p,metin)}function canliOlay(olay,v){if(!ms||kapandi)return;if(olayTampon&&(olay==="square.moved"||olay==="square.emote"||olay==="square.podium")&&olayTampon.
push([olay,v]),olay==="square.entered"||olay==="square.updated"){durumIste();return}if(olay==="square.left"){if(v.p===ms.presence_id){meydanaGir();return}kisiler.delete(v.p)&&(kart.cik(v.p,!1,MEYDAN_KAPI[v.
door]?v.door:null),kart.yaz(sahneVerisi()),kisilerYaz());return}if(olay==="square.podium"){const k2=kursuDurum;k2&&(v.speaker??null)===(k2.speaker??(k2.speaker_hidden?v.speaker:null))&&(v.post??null)===
(k2.post?.post_id??null)&&Number(v.queue??0)===Number(k2.queue_length??0)&&k2.post?(k2.post.applause=Number(v.applause??k2.post.applause),kursuUygula(k2)):durumIste();return}if(olay==="square.post"){megafonGoster(
v.p,v.post),akisGecikmeli();return}if(olay==="square.signing"){gecikmeliTazele();return}const k=kisiler.get(v.p);!k||k.me||(olay==="square.moved"?(kart.yuru(v.p,Number(v.x),Number(v.z)),Object.assign(
k,{moved_at:v.at,x:Number(v.x),z:Number(v.z),emote:null,emote_target:null}),cayYaz()):olay==="square.emote"&&(kart.eylem(v.p,v.e,v.to??null),Object.assign(k,{emote_at:v.at,emote:v.e,emote_target:v.to??
null}),cayYaz(),v.e==="wave"&&v.to&&v.to===ms.presence_id&&tost(k.hidden?\u00E7("Biri sana el sallad\u0131."):\u00E7("{ad} sana el sallad\u0131.",{ad:k.name}),"hand")))}let cayNiyet=null;function cayNiyetBitir(){
cayNiyet&&(clearTimeout(cayNiyet.zaman),cayNiyet=null)}function cayaOtur(){if(!ms){tost(d?.yolda?\u00E7("Yoldayken \xE7ay bah\xE7esine oturulmaz."):\u00E7("Meydana giriliyor\u2026"),"footprints");return}
const ben=benimki();if(!ben)return;if(kart.sandalyede?.(ms.presence_id)){Konusma.ac("burasi");return}const benX=Number(ben.x)/100,benZ=Number(ben.z)/100,digerleri=[...kisiler.values()].filter(k=>!k.me).
map(k=>({x:Number(k.x)/100,z:Number(k.z)/100})),s=meydanBosSandalye(digerleri,[benX,benZ]);if(!s){tost(\u00E7("\xC7ay bah\xE7esinde bo\u015F yer yok; biraz sonra yeniden dene."),"message-circle");return}
const x=Math.round(s.x*100),z=Math.round(s.z*100);if(cayNiyetBitir(),yuruIste(x,z,null,!0),!ms||yuruS.hedef?.[0]!==x||yuruS.hedef?.[1]!==z)return;sahneyiGoster();const w=ms.rule??{},yol=kart.kalanYol(
ms.presence_id)??Math.hypot(s.x-benX,s.z-benZ),hiz=Math.max(.3,Number(w.speedCmPerSec??220)/100);cayNiyet={x,z,zaman:setTimeout(cayaVardi,Math.max(400,(hareketAzalt?0:yol/hiz*1e3)+200))}}function sahneyiGoster(){
const el=$("#meydan-kart",kap);if(!el)return;const r=el.getBoundingClientRect();(r.top<0||r.bottom>window.innerHeight)&&el.scrollIntoView({block:"start",behavior:hareketAzalt?"auto":"smooth"})}function cayaVardi(){
const n=cayNiyet;if(cayNiyet=null,!n||!ms||yuruS.hedef?.[0]!==n.x||yuruS.hedef?.[1]!==n.z)return;const bekle=Number(ms.rule?.emoteMinMs??2e3)-(Date.now()-sonEylem);if(bekle>0){cayNiyet={...n,zaman:setTimeout(
cayaVardi,bekle+50)};return}eylemYap("sit"),Konusma.ac("burasi")}function yuruIste(x,z,kapi=null,caya=!1){if(!ms){tost(d?.yolda?\u00E7("Yoldayken meydana girilmez; vard\u0131\u011F\u0131n \u015Fehrin meydan\u0131na girersin."):
\u00E7("Meydana giriliyor\u2026"),"footprints");return}if(caya||cayNiyetBitir(),kursuDurum?.speaking&&!kapi){pencere({ust:\u00E7("Hatip k\xFCrs\xFCs\xFC"),baslik:\u00E7("K\xFCrs\xFCden inilsin mi?"),govde:`\
<p class="aciklama">${esc(\u00E7("Y\xFCr\xFCrsen k\xFCrs\xFCden inersin; s\xF6z s\u0131radakine ge\xE7er."))}</p>`,dugmeler:[{ad:\u00E7("K\xFCrs\xFCden in ve y\xFCr\xFC"),ikon:"footprints",sinif:"alti\
n",is:()=>{kursuDurum.speaking=!1,yuruIste(x,z)}},{ad:\u00E7("Vazge\xE7")}]});return}const w=ms.rule??{},simdi=Date.now();if(simdi-yuruS.pencere>=6e4&&(yuruS.pencere=simdi,yuruS.n=0),yuruS.n>=Number(w.
movesPerMinute??40)){tost(\u00E7("Bir dakikada \xE7ok fazla y\xFCr\xFCd\xFCn; biraz bekle."),"footprints");return}kapiNiyetBitir();const once=benimki(),duz=once?Math.hypot(Number(once.x)-x,Number(once.
z)-z)/100:0;if(kart.yuru(ms.presence_id,x,z,!0),kapi){const yol=kart.kalanYol(ms.presence_id)??duz,hiz=Math.max(.3,Number(w.speedCmPerSec??220)/100);kapiNiyet={kapi,zaman:setTimeout(()=>kapidanGec(kapi),
Math.max(700,(hareketAzalt?0:yol/hiz*1e3)+250))},kart.kapiYuruyor(kapi)}benYerel={t:Date.now(),veri:{x,z,emote:null,emote_target:null}},once&&(Object.assign(once,benYerel.veri),cayYaz()),yuruS.hedef=[
x,z],yuruS.bekleyen=[x,z],clearTimeout(yuruS.zaman),yuruS.zaman=setTimeout(yuruGonder,Math.max(0,yuruS.son+Number(w.moveMinMs??600)+60-simdi))}async function yuruGonder(){const h=yuruS.bekleyen;if(yuruS.
bekleyen=null,!(!h||!ms||kapandi)){yuruS.son=Date.now(),yuruS.n++;try{await MeydanYolu.yuru(h[0],h[1],{veritabani:dbEylem}),dbEylem=!1}catch(e){e?.kod==="WALK_NOT_IN_SQUARE"?meydanaGir():(tost(hataMetni(
e),"footprints"),durumIste())}}}function eylemYap(e,hedef=null){if(!ms){tost(\u00E7("Meydana giriliyor\u2026"),"hand");return}kapiNiyetBitir();const simdi=Date.now();if(simdi-sonEylem<Number(ms.rule?.
emoteMinMs??2e3)){tost(\u00E7("Biraz yava\u015F: bir sonraki ad\u0131m az sonra."),"hand");return}sonEylem=simdi,dbEylem=!0,kart.eylem(ms.presence_id,e,hedef),benYerel={t:simdi,veri:{...benYerel&&simdi-
benYerel.t<4e3?benYerel.veri:{},emote:e,emote_target:hedef}};const benim=benimki();benim&&(Object.assign(benim,{emote:e,emote_target:hedef}),cayYaz()),MeydanYolu.eylem(e,hedef).catch(err=>{tost(hataMetni(
err),"hand"),durumIste()})}const kapiKilidi=kapi=>meydanKapilari(d,benimUlke()).find(k=>k.kapi===kapi)?.kilit??null;function kapiNiyetBitir(){kapiNiyet&&(clearTimeout(kapiNiyet.zaman),kapiNiyet=null,kart.
kapiYuruyor(null))}function kapiyaGit(kapi,hemen=!1){const K=MEYDAN_KAPI[kapi];if(!K||!d)return;const kilit=kapiKilidi(kapi);if(kilit){tost(kilit,"lock");return}const yerK=ms?.rule?.doors?.[kapi];if(!ms||
!yerK){kapiNiyetBitir(),Kabuk.git(K.rota);return}if(hemen){kapidanGec(kapi);return}yuruIste(Number(yerK.x),Number(yerK.z),kapi)}function kapidanGec(kapi){const K=MEYDAN_KAPI[kapi];kapiNiyetBitir(),!(kapandi||
!K)&&(clearTimeout(yuruS.zaman),yuruS.bekleyen=null,ms&&(ms=null,kanalBirak?.(),kanalBirak=null,MeydanYolu.cik(kapi).catch(()=>{})),Kabuk.git(K.rota))}function kisiKart(p){const k=kisiler.get(p);if(!k||
k.me)return;kart.secili(p);const cipler=[k.country_id?`<span class="cip">${esc(ulkeAdi(k.country_id))}</span>`:"",k.friend?`<span class="cip">${ikon("heart")}${esc(\u00E7("Arkada\u015F\u0131n"))}</spa\
n>`:"",kursuDurum?.speaker===p?`<span class="cip">${ikon("megaphone")}${esc(\u00E7("K\xFCrs\xFCde"))}</span>`:""].filter(Boolean).join(" ");pencere({ust:\u00E7("Meydanda"),baslik:k.hidden?\u00E7("Ad\u0131n\
\u0131 gizleyen biri"):k.name,govde:`<div class="meydan-kisi-kart" data-meydan-kart="${esc(p)}">${cipler?`<p class="satir" style="gap:6px;flex-wrap:wrap">${cipler}</p>`:""}
          <p class="aciklama">${esc(k.hidden?\u00E7("Ad\u0131n\u0131 gizlemi\u015F; fig\xFCr\xFC ve \xFClkesi g\xF6r\xFCn\xFCr. Rahats\u0131z ediyorsa meydanda engelleyebilirsin."):\u00E7("Seninle ayn\
\u0131 meydanda. Profilinden arkada\u015F ekleyebilir, takip edebilir ya da engelleyebilirsin."))}</p></div>`,dugmeler:[{ad:\u00E7("El salla"),ikon:"hand",sinif:"altin",is:()=>eylemYap("wave",p)},...k.
hidden?[{ad:\u00E7("Meydanda engelle"),ikon:"eye-off",sinif:"mercan",is:()=>engelleSor(p)}]:[{ad:\u00E7("Profil"),ikon:"user-round",is:()=>profilAc(k.character_id)},{ad:\u00E7("Mesaj"),ikon:"message-c\
ircle",is:()=>mesajBaslat(k.character_id,k.name)}],{ad:\u00E7("Kapat")}]}),pencereKapaninca(()=>kart.secili(null))}function engelleSor(p){pencere({ust:\u00E7("Meydanda"),baslik:\u00E7("Meydanda engell\
ensin mi?"),govde:`<p class="aciklama">${esc(\u00E7("Meydanlarda birbirinizi g\xF6rmezsiniz. Kim oldu\u011Fu sana g\xF6sterilmez; arkada\u015Fl\u0131k, mesaj ve ak\u0131\u015F de\u011Fi\u015Fmez. Engeli Arkada\u015Flar \u2192 Gizlilik'ten kald\u0131rabilir\
sin."))}</p>`,dugmeler:[{ad:\u00E7("Engelle"),ikon:"eye-off",sinif:"mercan",is:()=>engelle(p)},{ad:\u00E7("Vazge\xE7")}]})}async function engelle(p){try{await MeydanYolu.engelle(p),kisiler.delete(p)&&
(kart.cik(p,!0),kart.yaz(sahneVerisi()),kisilerYaz()),tost(\u00E7("Meydanda engellendi; birbirinizi meydanlarda g\xF6rmezsiniz."),"eye-off")}catch(e){tost(hataMetni(e),"circle-alert"),durumIste()}}async function adGizle(){
const ben=benimki();if(!ben)return;const yeni=!ben.hides_name;try{await MeydanYolu.adGizle(yeni),ben.hides_name=yeni,kisilerYaz(),tost(yeni?\u00E7("Ad\u0131n meydanda gizli; fig\xFCr\xFCn ve \xFClken g\xF6r\xFCn\xFCr."):
\u00E7("Ad\u0131n meydanda yine g\xF6r\xFCn\xFCr."),yeni?"eye-off":"eye")}catch(e){tost(hataMetni(e),"circle-alert")}}kart.dinle("kisi",kisiKart),kart.dinle("yuru",yuruIste),kart.dinle("eylem",e=>eylemYap(
e));function meydanDurumu(){if(d){if(d.yolda){ms&&(MeydanYolu.cik().catch(()=>{}),meydandanCikti());return}(!ms||ms.region_id!==d.bolge)&&meydanaGir()}}const tazele=tazeleyici(async()=>{await Promise.
all([yukle(),akisYukle()]),!kapandi&&(yerDinle(),tazeCiz(),tellalBak(),meydanDurumu())});let gecikme=null;const gecikmeliTazele=()=>{clearTimeout(gecikme),gecikme=setTimeout(()=>{kapandi||tazele()},600)};
if(await yukle(),kapandi||(await Promise.all([akisYukle(),yanYukle()]),kapandi))return;yerDinle(),ciz(),tellalBak(),meydanDurumu();const yeniPaylasim=()=>{yan.yeni++,yeniBandi()},b1=Durum.dinle("ulke-\
olay",x=>{gecikmeliTazele(),x?.olay==="square.new"&&yeniPaylasim()}),b2=Durum.dinle("olay",({olay})=>{/^(travel\.|friend\.|signing\.)/.test(olay)&&gecikmeliTazele()}),b3=Sunucu.Canli.dinle("public:squ\
are",olay=>{olay==="square.new"&&(yeniPaylasim(),akisGecikmeli())}),saat=setInterval(()=>{document.hidden||tazele()},6e4);return()=>{kapandi=!0,clearInterval(saat),clearTimeout(gecikme),clearTimeout(akisGecikme),
b1(),b2(),b3(),dinleBirak?.(),kart.kapat(),clearInterval(kalp),clearTimeout(durumZaman),clearTimeout(yuruS.zaman),clearTimeout(kapiNiyet?.zaman),clearInterval(kursuSaat),clearTimeout(kursuYurutZaman),
document.removeEventListener("visibilitychange",gorunurluk),kanalBirak?.(),ms&&MeydanYolu.cik().catch(()=>{})}}}),Parcalar.tamam("ek_95_meydan");
