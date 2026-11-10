// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (ek_98zzr_matbaa.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/matbaa",{async ac(kap){let n=null,b=null,kapandi=!1,hata3b=!1,ayr="",okunuyor=!1;const mod=()=>Gorunum.uc()&&!hata3b?"3b":"2b",makaleler=new Map;async function yukle(){[n,b]=await Promise.
all([Sunucu.cagir("news_feed",{p_mode:"recent",p_limit:20}).catch(()=>({articles:[]})),Sunucu.cagir("morning_bulletin").catch(()=>null)]),makaleler.clear();for(const a of n?.articles??[])makaleler.set(
a.article_id,a)}const veri=()=>matbaaVerisi(n,b),bultenSatirlari=()=>{const l=gundemBultenSatirlari(b,{sabah:!0}),kayit=(b?.records??[]).map(r=>resmiMetin(r)[1]).filter(m=>m&&m!==\u00E7("Resm\xEE kay\u0131t")),
manset=(b?.headlines??[]).map(a=>\u00E7("{gazete} yaz\u0131yor: {baslik}",{gazete:a.newspaper??\u00E7("Gazete"),baslik:a.title})),hepsi=[...l,...kayit,...manset];return hepsi.length?hepsi:[\u00E7("Gec\
e sakin ge\xE7ti; kayda ge\xE7en yeni bir olay yok.")]};function sec(ad){const d=veri();ayr=matbaaAyrinti(d,ad);const el=$("#matbaa-ayrinti",kap);el&&(el.textContent=ayr);const[tur,i]=String(ad).split(
":"),s=tur==="sayfa"?d.sayfalar[Number(i)]:null,oku=$("#matbaa-oku",kap);oku&&(oku.hidden=!s,oku.dataset.makale=s?.id??"")}function birak(){matbaa3bOrnek&&Uc.cizici?.etkin===matbaa3bOrnek&&Uc.cizici.birak(
matbaa3bOrnek)}function ciz(){const d=veri(),m=mod(),ulke=d.ulke??Durum.v.ozet?.character?.citizenship??"",satirlar=bultenSatirlari();kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div>${ulkeUst(ulke,\u00E7("\u015Fehrin gazete binas\u0131"))}<h1 class="b1">${esc(\u00E7("{ulke} Matbaas\u0131",{ulke:ulkeAdi(ulke)}))}</h1>
          <p class="aciklama">${\u00E7("\xDClkenin gazeteleri burada bas\u0131l\u0131r: yeni say\u0131 \xE7\u0131k\u0131nca bask\u0131 makinesi d\xF6ner, man\u015Fetler iplere as\u0131l\u0131r, y\u0131\u011F\u0131n okunduk\xE7a b\xFCy\xFCr, yazarlar masalar\u0131ndad\u0131r. Panoda sabah\
 b\xFClteni.")}</p></div>
          <span class="ik-kutu">${ikon("newspaper")}</span></div>
        <section class="kart matbaa-kart" id="matbaa-salon"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Matbaa")}</p><h2 class="b2">${d.baski?\u00E7("Yeni say\u0131 bas\u0131l\u0131yor"):
\u00E7("Matbaan\u0131n salonu")}</h2></div>
            ${Gorunum.webglVar()?`<button class="dugme sade kucuk-d" id="matbaa-mod" aria-pressed="${m==="2b"}" title="${m==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCme (2B) ge\xE7"):\u00E7("3B g\xF6r\xFCn\xFCme ge\xE7")}\
">${ikon("layers")}${m==="3b"?\u00E7("2B"):\u00E7("3B")}</button>`:""}</div>
          <div class="matbaa-sahne sahne3b" id="matbaa-sahne" data-mod="${m}">
            ${m==="3b"?`<div class="yukleniyor matbaa-on${matbaa3bOrnek&&Uc.cizici?.etkin===matbaa3bOrnek?" bitti":""}" id="matbaa-yukleniyor" aria-label="${\u00E7("Matbaa a\xE7\u0131l\u0131yor\u2026")}\
">${matbaa2b(d)}</div>`:""}
            <div class="matbaa-2b" id="matbaa-2b"${m==="3b"?" hidden":""}>${m==="2b"?matbaa2b(d):""}</div>
          </div>
          <div class="satir" style="margin-top:8px;gap:8px;flex-wrap:wrap;align-items:center">
            <p class="kucuk matbaa-ayrinti" id="matbaa-ayrinti" aria-live="polite" style="flex:1 1 220px;margin:0">${esc(ayr||\u00E7("Bir sayfaya, makineye, y\u0131\u011F\u0131na, panoya ya da masaya dokun: ayr\u0131nt\u0131s\
\u0131 burada."))}</p>
            <button class="dugme ikincil kucuk-d" type="button" id="matbaa-oku" hidden>${ikon("book-open")}${\u00E7("Haberi oku")}</button></div>
          <p class="kucuk">${\u00E7("Son {m} makale \xB7 {n} okunma \xB7 {y} yazar.",{m:sayi(d.makale),n:sayi(d.okunma),y:sayi(d.yazarlar.length)})}</p></section>
        <div class="izgara iki" style="margin-top:16px">
          <section class="kart" id="matbaa-bulten"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xDClkenin radyosu ve panosu")}</p><h2 class="b2">${\u00E7("Sabah b\xFClteni")}</h2></div><s\
pan class="ik-kutu">${ikon("radio")}</span></div>
            <ol class="bulten-liste" data-bulten="matbaa">${satirlar.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
            <div class="satir" style="gap:8px;flex-wrap:wrap">${Seslendirme.varMi()?`<button class="dugme ikincil kucuk-d" type="button" id="matbaa-sesli">${ikon(okunuyor?"square":"volume-2")}${okunuyor?
\u00E7("Okumay\u0131 durdur"):\u00E7("Sesli oku")}</button>`:""}
              <button class="dugme sade kucuk-d" type="button" data-git="ulke/ozet">${ikon("vote")}${\u00E7("G\xFCn\xFCn meselesi")}</button></div></section>
          <section class="kart" id="matbaa-mansetler"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u0130plerdeki sayfalar")}</p><h2 class="b2">${\u00E7("Son man\u015Fetler")}</h2></div><s\
pan class="ik-kutu">${ikon("newspaper")}</span></div>
            <div class="yigin">${(n?.articles??[]).slice(0,MATBAA_SAYFA).map(makaleKartHtml).join("")||`<p class="bos">${\u00E7("\xDClkede hen\xFCz makale yok. Gazete kur, ilk haberi sen yaz.")}</p>`}\
</div>
            <div class="satir" style="margin-top:10px;gap:8px;flex-wrap:wrap"><button class="dugme ikincil kucuk-d" type="button" data-git="hayat/medya">${ikon("notebook-pen")}${\u00E7("Medya'ya git")}\
</button>
              <button class="dugme sade kucuk-d" type="button" data-git="meydan/akis">${ikon("megaphone")}${\u00E7("Ak\u0131\u015Fa git")}</button></div></section>
        </div></div>`;for(const x of $$("[data-git]",kap))x.onclick=()=>Kabuk.git(x.dataset.git);makaleKartlariBagla(kap,makaleler,tazele),$("#matbaa-oku",kap).onclick=e=>{const id=e.currentTarget.dataset.
makale;id&&makaleAc(id,tazele)},$("#matbaa-sesli",kap)?.addEventListener("click",()=>{if(okunuyor){Seslendirme.dur(),okunuyor=!1,ciz();return}okunuyor=Seslendirme.oku(satirlar,()=>{okunuyor=!1,kapandi||
ciz()}),ciz()}),$("#matbaa-mod",kap)?.addEventListener("click",()=>{hata3b=!1;const ikiB=mod()==="3b";Gorunum.ayarla(ikiB?"2b":"3b"),tost(ikiB?\u00E7("Hafif g\xF6r\xFCn\xFCm (2B) se\xE7ildi. Ayarlar'dan de\u011Fi\u015Ftire\
bilirsin."):\u00E7("3B g\xF6r\xFCn\xFCm se\xE7ildi."),"layers")});for(const g of $$("#matbaa-2b [data-matbaa-sec]",kap))g.addEventListener("click",()=>sec(g.dataset.matbaaSec));sahneBagla(d)}async function sahneBagla(d){
const kutu=$("#matbaa-sahne",kap);if(!kutu||mod()!=="3b"){birak();return}try{const{THREE,cizici}=await Uc.yukle("98zzr_matbaa.js");if(kapandi||$("#matbaa-sahne",kap)!==kutu)return;matbaa3bOrnek??=matbaa3bKur(
THREE,cizici);const a=matbaa3bOrnek;if(a.dinle("sec",sec),a.kapBagla(kutu),a.durumYaz(d),!cizici.bagla(a,kutu))throw new Error("webgl-bagla");$("#matbaa-yukleniyor",kutu)?.classList.add("bitti")}catch(e){
if(console.warn("3B matbaa a\xE7\u0131lamad\u0131:",e),kapandi)return;hata3b=!0,tost(\u00E7("3B sahne bu cihazda a\xE7\u0131lamad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),"layers"),ciz()}}const tazele=tazeleyici(
async()=>{await yukle(),kapandi||ciz()});await yukle(),ciz();const b1=Durum.dinle("ulke-olay",({olay})=>{(olay==="news.article_published"||/^(issue|gov)\./.test(olay))&&tazele()}),b2=Gorunum.dinle(()=>{
n&&ciz()}),saat=setInterval(()=>{document.hidden||tazele()},3e5);return()=>{kapandi=!0,b1(),b2(),clearInterval(saat),birak(),okunuyor&&Seslendirme.dur()}}}),Parcalar.tamam("ek_98zzr_matbaa");
