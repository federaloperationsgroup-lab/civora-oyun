// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98zzh_millet.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("ulke/tarih",{async ac(kap){let t=null,h=null,sekme="tarih",kapandi=!1,hata3b=!1,muzeAyr="",ulke=null,acikUlkeler=[];const muzeMod=()=>Gorunum.uc()&&!hata3b?"3b":"2b";try{sekme=sessionStorage.
getItem("civora.tarih")||"tarih"}catch{}try{ulke=sessionStorage.getItem(TARIH_ULKE)||null,sessionStorage.removeItem(TARIH_ULKE)}catch{}const benimUlke=()=>Durum.v.ozet?.character?.citizenship??null,baskasi=()=>!!t&&
t.country_id!==benimUlke(),ulkeYaz=u=>{ulke=u&&u!==benimUlke()?u:null};ulke===benimUlke()&&(ulke=null);async function yukle(){const p=ulke?{p_country:ulke}:{};try{[t,h]=await Promise.all([Sunucu.cagir(
"country_history",p),Sunucu.cagir("country_hall",p)])}catch(e){if(!ulke||e?.kod!=="COUNTRY_NOT_FOUND")throw e;ulkeYaz(null),[t,h]=await Promise.all([Sunucu.cagir("country_history"),Sunucu.cagir("count\
ry_hall")])}}async function ulkeleriYukle(){acikUlkeler=[...(await Durum.harita().catch(()=>null))?.open_countries??[]]}function seciciHtml(){const ben=benimUlke(),liste=[...new Set([...ben?[ben]:[],...acikUlkeler,
t.country_id])].filter(Boolean).sort((a,b)=>a===ben?-1:b===ben?1:ulkeAdi(a).localeCompare(ulkeAdi(b),DIL.yerel));return`<div class="satir tarih-ulke" style="gap:8px;flex-wrap:wrap;margin-top:10px">
        <select id="tarih-ulke" class="alan" aria-label="${\u00E7("Hangi \xFClkenin tarihi")}">${liste.map(u=>`<option value="${esc(u)}" ${u===t.country_id?"selected":""}>${esc(u===ben?\u00E7("{ulke} \
(\xFClkem)",{ulke:ulkeAdi(u)}):ulkeAdi(u))}</option>`).join("")}</select>
        ${baskasi()&&ben?`<button class="dugme ikincil kucuk-d" type="button" id="tarih-ulkem">${ikon("house")}${\u00E7("\xDClkeme d\xF6n")}</button>`:""}</div>`}const madalyaAd=id=>{const m=(Durum.v.
kurallar?.data?.medal?.medals??[]).find(x=>x.id===id);return m?\u00E7v(m.name):id};function tarihHtml(){if(!t.rows.length)return`<p class="bos">${\u00E7("Hen\xFCz tarihe ge\xE7en bir olay yok.")}</p>`;
let yil=null;return`<ol class="tarih-cizelge">${t.rows.map(r=>{const[ik,metin]=resmiMetin(r),y=new Date(r.at).getUTCFullYear(),ayrac=y!==yil?`<li class="tarih-yil" aria-hidden="true">${String(y)}</li>`:
"";yil=y;const ek=r.type==="election"&&r.president?" "+\u00E7("Ba\u015Fkan: {ad}.",{ad:r.president}):"";return`${ayrac}<li class="tarih-olay" data-tur="${esc(r.type)}"><span class="tarih-nokta">${ik}<\
/span><div><span class="kucuk">${esc(gunYaz(r.at))}</span><p>${esc(metin+ek)}</p></div></li>`}).join("")}</ol>`}function kursuHtml(){return`<div class="izgara uc">${KURSU_DAL.map(([k,ad,ik,deger])=>{const l=h.
honor?.[k]??[];return`<section class="kart" data-kursu="${k}"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\u015Eeref k\xFCrs\xFCs\xFC")}</p><h2 class="b3">${esc(ad)}</h2></div><span class\
="ik-kutu">${ikon(ik)}</span></div>
          ${l.length?`<ol class="liste kursu-liste">${l.map((x,i)=>`<li class="liste-satir${x.character_id===benimKimlik()?" ben":""}"><span class="liste-ikon"><b>${i+1}</b></span>
            <div><b>${esc(x.name)}</b></div><div class="sag-yazi"><span class="kucuk">${esc(deger(x.value))}</span></div></li>`).join("")}</ol>`:`<p class="bos">${\u00E7("Hen\xFCz kimse yok.")}</p>`}<\
/section>`}).join("")}</div>`}function salonHtml(){const md=muzeVerisi(h),mod=muzeMod(),ozet=\u00E7("Salonda {a} sava\u015F tablosu, {b} bize ge\xE7en ve {c} bizden \xE7\u0131kan b\xF6lgenin sanca\u011F\u0131, {d} ba\u015Fkan\u0131n b\xFCst\xFC,\
 {e} kurucu.",{a:sayi(Math.min(MUZE_TABLO,md.zaferler.length)),b:sayi(Math.min(MUZE_SANCAK,md.kazanilan.length)),c:sayi(Math.min(MUZE_SANCAK,md.kaybedilen.length)),d:sayi(md.baskanlar.length),e:sayi(md.
kurucular.length)});return`<section class="kart muze-salon-kart" id="muze-salon"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("M\xFCze")}</p><h2 class="b2">${\u00E7("M\xFCzenin salonu")}</h\
2></div>
          ${Gorunum.webglVar()?`<button class="dugme sade kucuk-d" id="muze-mod" aria-pressed="${mod==="2b"}" title="${mod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCme (2B) ge\xE7"):\u00E7("3B g\xF6r\xFCn\xFCme ge\xE7")}\
">${ikon("layers")}${mod==="3b"?\u00E7("2B"):\u00E7("3B")}</button>`:""}</div>
        <div class="muze-sahne sahne3b" id="muze-sahne" data-mod="${mod}">
          ${mod==="3b"?`<div class="yukleniyor muze-on${muze3bOrnek&&Uc.cizici?.etkin===muze3bOrnek?" bitti":""}" id="muze-yukleniyor" aria-label="${\u00E7("M\xFCze a\xE7\u0131l\u0131yor\u2026")}">${muze2b(
md)}</div>`:""}
          <div class="muze-2b" id="muze-2b"${mod==="3b"?" hidden":""}>${mod==="2b"?muze2b(md):""}</div>
        </div>
        <p class="kucuk muze-ayrinti" id="muze-ayrinti" aria-live="polite">${esc(muzeAyr||\u00E7("Bir tabloya, sanca\u011Fa, b\xFCste ya da kurucular ta\u015F\u0131na dokun: ayr\u0131nt\u0131s\u0131 burada."))}\
</p>
        <p class="kucuk">${esc(ozet)}${md.kazanilan.length>MUZE_SANCAK||md.kaybedilen.length>MUZE_SANCAK||md.zaferler.length>MUZE_TABLO?" "+\u00E7("Salonda en yeniler durur; hepsi zaman \xE7izelgesinde."):
""}</p></section>`}function muzeSec(ad){muzeAyr=muzeAyrinti(muzeVerisi(h),ad);const el=$("#muze-ayrinti",kap);el&&(el.textContent=muzeAyr)}function muzeBirak(){muze3bOrnek&&Uc.cizici?.etkin===muze3bOrnek&&
Uc.cizici.birak(muze3bOrnek)}async function muzeBagla(){const kutu=$("#muze-sahne",kap);for(const g of $$("#muze-2b [data-muze-sec]",kap))g.addEventListener("click",()=>muzeSec(g.dataset.muzeSec));if($(
"#muze-mod",kap)?.addEventListener("click",()=>{hata3b=!1;const ikiB=muzeMod()==="3b";Gorunum.ayarla(ikiB?"2b":"3b"),tost(ikiB?\u00E7("Hafif g\xF6r\xFCn\xFCm (2B) se\xE7ildi. Ayarlar'dan de\u011Fi\u015Ftirebilirsin."):
\u00E7("3B g\xF6r\xFCn\xFCm se\xE7ildi."),"layers")}),!kutu||muzeMod()!=="3b"){muzeBirak();return}try{const{THREE,cizici}=await Uc.yukle("98zzh_millet.js");if(kapandi||$("#muze-sahne",kap)!==kutu)return;
muze3bOrnek??=muze3bKur(THREE,cizici);const a=muze3bOrnek;if(a.dinle("sec",muzeSec),a.kapBagla(kutu),a.durumYaz(muzeVerisi(h)),!cizici.bagla(a,kutu))throw new Error("webgl-bagla");$("#muze-yukleniyor",
kutu)?.classList.add("bitti")}catch(e){if(console.warn("3B m\xFCze a\xE7\u0131lamad\u0131:",e),kapandi)return;hata3b=!0,tost(\u00E7("3B sahne bu cihazda a\xE7\u0131lamad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),
"layers"),ciz()}}function muzeMarsHtml(){const m=h.museum?.anthem,toren=milliMarsTorenYazi();return`<section class="kart" style="margin-top:16px" id="muze-mars" data-mars="${m?esc(m.song_id):""}"><div\
 class="kart-bas"><div><p class="ust-yazi">${\u00E7("M\xFCze")} \xB7 ${\u00E7("Milli mar\u015F")}</p>
          <h2 class="b2">${m?esc(m.title??""):\u00E7("Mar\u015F se\xE7ilmedi")}</h2></div><span class="ik-kutu">${ikon("eighth-notes")}</span></div>
        ${m?`<p class="aciklama">${esc(\u00E7("{grup} grubunun kayd\u0131; meclis {zaman} kabul etti.",{grup:m.band??"",zaman:saatYaz(m.set_at)}))}${m.proposed_by?" "+esc(\u00E7("\xD6neren: {ad}.",{ad:m.
proposed_by})):""}</p>
          ${toren?`<p class="kucuk">${esc(toren)}</p>`:""}
          <div class="satir" style="margin-top:10px">${milliMarsDugme(m,"muze",{id:"muze-mars-dinle",sinif:"altin"})}</div>`:`<p class="aciklama">${\u00E7("Meclis \xFClkenin bir grubunun kayd\u0131 bitmi\u015F \u015Far\
k\u0131s\u0131n\u0131 milli mar\u015F se\xE7ince m\xFCzede ve t\xF6renlerde \xE7alar.")}</p>`}</section>`}function muzeHtml(){const st=h.stats??{},kupalar=[...(h.cups??[]).map(c=>({at:c.at,ik:kupaIkonu(
c),ad:c.national?\u00E7("Mill\xEE tak\u0131m \xB7 {kupa}",{kupa:kupaAdi(c)}):\u00E7("{kulup} \xB7 {kupa}",{kulup:c.club,kupa:kupaAdi(c)}),alt:\u00E7("{n}. sezon",{n:String(Number(c.season))})})),...(h.
drill_firsts??[]).map(d=>({at:d.week_start,ik:"medal",ad:\u00E7("Tatbikat turnuvas\u0131 birincili\u011Fi"),alt:\u00E7("{gun} haftas\u0131 \xB7 {p} puan",{gun:gunYaz(d.week_start),p:sayi(d.points)})})),
...(h.goals??[]).map(g=>({at:g.week_start,ik:"target",ad:\u00E7("Ula\u015F\u0131lan hedef: {hedef}",{hedef:hedefYazi(g.metric,g.target)}),alt:\u00E7("{gun} haftas\u0131 \xB7 {n} ki\u015Fi",{gun:gunYaz(
g.week_start),n:Number(g.contributors)})}))].sort((a,b)=>String(b.at).localeCompare(String(a.at)));return`${salonHtml()}<section class="kart" style="margin-top:16px"><div class="kart-bas"><div><p clas\
s="ust-yazi">${\u00E7("M\xFCze")}</p><h2 class="b2">${\u00E7("\xDClkenin say\u0131lar\u0131")}</h2></div><span class="ik-kutu">${ikon("library")}</span></div>
          <div class="muze-sayilar">${MUZE_SAYI.map(([k,ad,ik])=>`<div class="muze-sayi" data-muze="${k}">${ikon(ik)}<b>${sayi(st[k]??0)}</b><span class="kucuk">${esc(ad)}</span></div>`).join("")}</di\
v></section>
        <div class="izgara iki" style="margin-top:16px">
          <section class="kart" id="muze-kupalar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("M\xFCze")}</p><h2 class="b2">${\u00E7("Kupalar ve ba\u015Far\u0131lar")}</h2></div><span clas\
s="ik-kutu">${ikon("trophy")}</span></div>
            ${kupalar.length?`<ul class="liste">${kupalar.slice(0,30).map(x=>`<li class="liste-satir"><span class="liste-ikon altin">${ikon(x.ik)}</span><div><b>${esc(x.ad)}</b><span class="kucuk">${esc(
x.alt)}</span></div><span></span></li>`).join("")}</ul>`:`<p class="bos">${\u00E7("M\xFCzede hen\xFCz kupa yok: kul\xFCp ve mill\xEE tak\u0131m kupalar\u0131, tatbikat birincilikleri ve ula\u015F\u0131lan hedefler burada durur.")}\
</p>`}</section>
          <section class="kart" id="muze-baskanlar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("M\xFCze")}</p><h2 class="b2">${\u00E7("Devlet ba\u015Fkanlar\u0131")}</h2></div><span class\
="ik-kutu">${ikon("crown")}</span></div>
            ${(h.presidents??[]).length?`<ul class="liste">${h.presidents.map(p=>`<li class="liste-satir"><span class="liste-ikon">${avatarKutu(p.name,p.character_id)}</span>
              <div><b>${esc(p.name)}${p.active?" "+\u00E7("(g\xF6revde)"):""}</b><span class="kucuk">${\u00E7("{n} d\xF6nem \xB7 ilk {gun}",{n:Number(p.terms),gun:gunYaz(p.first)})}</span></div><span>\
</span></li>`).join("")}</ul>`:`<p class="bos">${\u00E7("\xDClkenin hen\xFCz se\xE7ilmi\u015F ba\u015Fkan\u0131 olmad\u0131.")}</p>`}</section>
        </div>
        ${muzeMarsHtml()}
        <section class="kart" style="margin-top:16px" id="muze-madalyalar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("M\xFCze")}</p><h2 class="b2">${\u00E7("Vatanda\u015Flar\u0131n \xFClke madalyalar\
\u0131")}</h2></div><span class="ik-kutu">${ikon("medal")}</span></div>
          <div class="muze-sayilar">${MUZE_MADALYA.map(([k,ik])=>`<div class="muze-sayi" data-muze-madalya="${k}">${ikon(ik)}<b>${sayi(h.medals?.[k]??0)}</b><span class="kucuk">${esc(madalyaAd(k))}</s\
pan></div>`).join("")}</div>
          <p class="kucuk">${\u00E7("Bug\xFCnk\xFC vatanda\u015Flar\u0131n toplad\u0131klar\u0131: emre uyulan g\xFCn, ula\u015F\u0131lan hedef, tatbikat kupas\u0131, devriye saati ve bayram t\xF6reni.")}\
</p></section>`}function ciz(){kap.innerHTML=`<div class="sayfa" data-tarih-ulke="${esc(t.country_id)}" data-baska="${baskasi()?1:0}">
        <div class="sayfa-bas"><div>${ulkeUst(t.country_id,baskasi()?\u00E7("ba\u015Fka \xFClke \xB7 resm\xEE kay\u0131ttan"):\u00E7("resm\xEE kay\u0131ttan"))}<h1 class="b1">${esc(\u00E7("{ulke} tari\
hi",{ulke:ulkeAdi(t.country_id)}))}</h1>
          <p class="aciklama">${\u00E7("\xDClkenin oyundaki tarihi: kurulu\u015F, se\xE7imler ve ba\u015Fkanlar, sava\u015Flar ve antla\u015Fmalar, ula\u015F\u0131lan hedefler, kupalar. Hepsi resm\xEE kay\u0131ttan; kimse elle yazmaz.")}\
</p>
          ${seciciHtml()}</div>
          <span class="ik-kutu">${ikon("library")}</span></div>
        <div class="altsekmeler" role="tablist" style="margin-bottom:16px">${[["tarih",\u00E7("Zaman \xE7izelgesi"),"scroll-text"],["kursu",\u00E7("\u015Eeref k\xFCrs\xFCs\xFC"),"award"],["muze",\u00E7(
"M\xFCze"),"library"]].map(([k,ad,ik])=>`<button class="altsekme" type="button" data-tarih-sekme="${k}" aria-pressed="${k===sekme}">${ikon(ik)}${esc(ad)}</button>`).join("")}</div>
        <div id="tarih-icerik">${sekme==="kursu"?kursuHtml():sekme==="muze"?muzeHtml():`<section class="kart">${tarihHtml()}</section>`}</div>
      </div>`;for(const b of $$("[data-tarih-sekme]",kap))b.onclick=()=>{sekme=b.dataset.tarihSekme;try{sessionStorage.setItem("civora.tarih",sekme)}catch{}ciz()};$("#tarih-ulke",kap)?.addEventListener(
"change",e=>ulkeDegistir(e.target.value)),$("#tarih-ulkem",kap)?.addEventListener("click",()=>ulkeDegistir(null)),sekme==="muze"?(muzeBagla(),milliMarsBagla(kap,h.museum?.anthem,"muze")):muzeBirak()}async function ulkeDegistir(u){
ulkeYaz(u),muzeAyr="";try{await yukle()}catch(e){tost(hataMetni(e),"circle-alert")}kapandi||ciz()}const tazele=tazeleyici(async()=>{await yukle(),ciz()});await Promise.all([yukle(),ulkeleriYukle(),Durum.
kurallar().catch(()=>null)]),ciz();const b1=Durum.dinle("ulke-olay",({olay})=>{!baskasi()&&/^(nation\.(goal_|drill_|holiday|anthem)|office\.installed|country\.war_closed|region\.annexed)/.test(olay)&&
tazele()}),b2=Gorunum.dinle(()=>{sekme==="muze"&&t&&h&&ciz()});return()=>{kapandi=!0,b1(),b2(),muzeBirak()}}}),Parcalar.tamam("ek_98zzh_millet");
