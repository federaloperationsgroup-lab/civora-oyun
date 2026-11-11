// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_42_harita.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("dunya/harita",{async ac(kap){const[veriTam]=await Promise.all([haritaVerisi(),Durum.ozet(),Durum.kurallar()]);let harita=await Durum.harita(!0);Devletler.haritaya(veriTam);let yolDurum=await Sunucu.
cagir("travel_status").catch(()=>null),isb=await Sunucu.cagir("coop_map").catch(()=>null),trafik=await Sunucu.cagir("world_pulse").catch(()=>null);const filmIstek=HaritaFilm.bekleyen;HaritaFilm.bekleyen=
null;let filmVeri=filmIstek?.veri??null;if(filmIstek&&!filmVeri&&(filmVeri=await Sunucu.cagir("season_film",{p_season:filmIstek.no??null}).catch(e=>(tost(hataMetni(e),"circle-alert"),null))),filmVeri)
for(const u of HaritaFilm.ulkeler(filmVeri))haritaAcilan.add(u);const veri=haritaAyrinti(veriTam,harita,yolDurum);let saatFarki=harita.server_time?Date.parse(harita.server_time)-Date.now():0,kip="siya\
si",secili=null,mod=null,g2=null,gozlem2b=null,kapandi=!1,film=null;const bolgeById=new Map(veri.bolgeler.map(b=>[b.id,b])),ulkeById=new Map(veri.ulkeler.map((u,i)=>[u.id,{u,i}])),ch=()=>Durum.v.ozet?.
character??{};kap.innerHTML=`<div class="harita-ekran">
      <div class="sahne3b harita-sahne" id="harita-sahne">
        <div class="yukleniyor" id="harita-yukleniyor"><div class="yukleniyor-ic"><img src="img/amblem.png" alt=""><span>${\u00E7("D\xFCnya haz\u0131rlan\u0131yor\u2026")}</span></div></div>
        <div class="etiketler" id="harita-etiketler"></div>
        <div class="harita-2b-kap" id="harita-2b" hidden></div>
        <div class="sahne-katman">
          <div class="dunya-sol">
            <div class="harita-kipleri cam" role="group" aria-label="${\u00E7("Harita g\xF6r\xFCn\xFCm\xFC")}">
              <button class="kip" data-kip="siyasi" aria-pressed="true">${ikon("map-pin")}${\u00E7("Siyasi")}</button>
              <button class="kip" data-kip="kaynak" aria-pressed="false">${ikon("wheat")}${\u00E7("Kaynak")}</button>
              <button class="kip" data-kip="cephe" aria-pressed="false">${ikon("swords")}${\u00E7("Cephe")}</button>
            </div>
            <button class="cam film-ac" id="harita-film-ac" type="button">${ikon("clapperboard")}${\u00E7("Sezon filmi")}</button>
          </div>
          <div class="harita-kart" id="bolge-karti"></div>
          <div class="yakin-dugmeler">
            <button class="cam" data-yakin="yakin" aria-label="${\u00E7("Yak\u0131nla\u015F")}">${ikon("plus")}</button>
            <button class="cam" data-yakin="uzak" aria-label="${\u00E7("Uzakla\u015F")}">${ikon("minus")}</button>
            <button class="cam" data-yakin="ev" aria-label="${\u00E7("Bulundu\u011Fum yere d\xF6n")}">${ikon("locate-fixed")}</button>
            <button class="cam" id="harita-mod" aria-label="${\u00E7("G\xF6r\xFCn\xFCm\xFC de\u011Fi\u015Ftir")}">${ikon("layers")}</button>
          </div>
          <div class="dunya-alt cam" id="harita-ipucu"></div>
          <div class="film-bant cam" id="film-bant" hidden></div>
        </div>
      </div>
      <div class="sayfa harita-alt">
        <p class="kucuk harita-canli" id="harita-canli" hidden></p>
        <section class="kart">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Oyundaki \xFClkeler")}</p><h2 class="b2">${\u00E7("B\xF6lgeler")}</h2></div><span class="ik-kutu">${ikon("globe")}</span></div>
          <div id="harita-liste"></div>
        </section>
        <p class="kucuk" id="harita-not" style="margin-top:12px"></p>
      </div>
    </div>`,$("#harita-not",kap).textContent=\u00E7v(veri.not);const sahneEl=$("#harita-sahne",kap),canliDurum=()=>({sahip:harita.sahip,acik:new Set(harita.open_countries??[]),uyuyan:new Set(harita.dormant_countries??
[]),savaslar:harita.campaigns??[],girisimler:harita.seizures??[],ozerkler:harita.autonomies??[],ozkSurecler:harita.autonomy_drives??[],devletler:harita.states??[],sehirler:harita.cities??{},konum:ch().
location,ulkem:ch().citizenship,yol:yolDurum?.travel??null,saatFarki,isbirligi:isb,trafik,isgaller:harita.occupations??[],hasar:harita.damage??{}}),durumNesnesi=()=>{const d=canliDurum();return film?.
an?{...d,sahip:film.an.sahip,savaslar:film.an.savaslar,girisimler:[],ozerkler:[],ozkSurecler:[],devletler:[],isgaller:[],hasar:{},yol:null,trafik:null,konum:null,filmIgneleri:film.an.igneler}:d};function rota2b(y){
const r=[...y.route??[]];return r[0]!==y.from&&r.unshift(y.from),r[r.length-1]!==y.to&&r.push(y.to),r.map(id=>bolgeById.get(id)).filter(Boolean).map(b=>b.etiket)}function aracNoktasi2b(y){return kirikNokta(
rota2b(y),(Date.now()+saatFarki-Date.parse(y.departs_at))/Math.max(1,Date.parse(y.arrives_at)-Date.parse(y.departs_at)))}const yolPlaka=y=>[y?.vehicle?.land?.plate,y?.vehicle?.sea?.plate].filter(Boolean)[0]??
null;function yolKendiArac2b(y){if(!y?.vehicle)return null;const v=yolculukVerisi({ys:{travel:y},harita:null}),an=yolculukAni(v,Date.now()+saatFarki);return an.kendi?an.vapur?v.aracD:v.aracK:null}function canliYaz(){
const el=$("#harita-canli",kap);if(!el)return;if(!trafik){el.hidden=!0;return}const yolda=Number(trafik.travel_total??0),tic=(trafik.trade??[]).reduce((s,x)=>s+Number(x.trades??0),0),kon=(trafik.convoys??
[]).length,oto=(trafik.tour_buses??[]).length,kargo=Number(trafik.cargo_total??0),parca=[yolda?\u00E7("{n} ki\u015Fi yolda",{n:sayi(yolda)}):\u00E7("\u015Eu an yolda kimse yok")];tic&&parca.push(\u00E7(
"son 10 dakikada {n} s\u0131n\u0131r \xF6tesi al\u0131\u015Fveri\u015F",{n:sayi(tic)})),kargo&&parca.push(\u00E7("{n} kargo yolda",{n:sayi(kargo)})),kon&&parca.push(\u00E7("{n} cephede sava\u015F turu s\xFCr\xFC\
yor",{n:sayi(kon)})),oto&&parca.push(oto===1?\u00E7("turne otob\xFCs\xFC yolda: {grup}",{grup:trafik.tour_buses[0].band??""}):\u00E7("{n} turne otob\xFCs\xFC yolda",{n:sayi(oto)})),el.innerHTML=`${ikon(
"route")}<span><b>${\u00E7("Canl\u0131")}</b> \xB7 ${parca.join(" \xB7 ")}</span>`,el.hidden=!1}function kartHtml(){if(!secili)return"";const kapat=`<button class="kapat" data-kapat-kart aria-label="${\u00E7(
"Kapat")}">${ikon("x")}</button>`;if(secili.tur==="ulke"){const u=ulkeById.get(secili.id)?.u;if(!u)return"";const acik=(harita.open_countries??[]).includes(u.id),uyuyor=(harita.dormant_countries??[]).
includes(u.id),ayrintili=veri.bolgeler.some(b6=>b6.ulke===u.id);return`<section class="bolge-karti cam">${kapat}
          <p class="ust-yazi">${acik?uyuyor?\u00E7("Oyunda \xB7 uyuyan \xFClke"):\u00E7("Oyunda \xB7 uyan\u0131k"):\u00E7("Hen\xFCz a\xE7\u0131lmad\u0131")}</p><h2 class="b2">${esc(u.ad)}</h2>
          <p class="aciklama" style="font-size:14px">${acik?uyuyor?\u00E7("Etkin vatanda\u015F\u0131 az oldu\u011Fu i\xE7in uyuyor: sava\u015F a\xE7amaz, ona sava\u015F a\xE7\u0131lamaz. Yeterli etkin vatanda\u015Fa ula\u015F\u0131nca uyan\u0131r ve Kurucu Me\
clis se\xE7imi ba\u015Flar."):\u00E7("Uyan\u0131k \xFClke: se\xE7imler ve sava\u015F a\xE7\u0131k."):\u00E7("Bu \xFClke hen\xFCz oyuna a\xE7\u0131lmad\u0131; s\u0131n\u0131rlar bug\xFCnk\xFC haritadan.")}\
</p>
          ${koalisyonOf(harita,u.id)?`<p class="cip lacivert" style="margin:0 0 10px" data-kart-koalisyon="${esc(koalisyonOf(harita,u.id).coalition_id)}">${ikon("shield")}${\u00E7("Savunma koalisyonu:\
 {uyeler}",{uyeler:esc(koalisyonUyeleri(koalisyonOf(harita,u.id)))})}</p>`:""}
          ${acik&&!ayrintili?`<button class="dugme ikincil kucuk-d" data-bolgeleri="${esc(u.id)}" style="margin-bottom:10px">${ikon("map-pin")}${\u00E7("B\xF6lgelerini g\xF6ster")}</button>`:""}
          <div class="bilgi-izgara"><div><small>${\u00E7("Ba\u015Fkent b\xF6lgesi")}</small><b>${esc(u.baskentAd??"\u2014")}</b></div>
            <div><small>${\u00E7("N\xFCfus (ger\xE7ek)")}</small><b>${u.nufus?\u00E7("{n} milyon",{n:Math.round(u.nufus/1e5)/10}):"\u2014"}</b></div></div>
        </section>`}const b=bolgeById.get(secili.id);if(!b)return"";const sahip=harita.sahip[b.id]??b.ulke,seviye=Number(harita.cities?.[b.id]??1),savas=(harita.campaigns??[]).find(s=>s.target_region_id===
b.id||s.origin_region_id===b.id),girisim=(harita.seizures??[]).find(g=>g.region_id===b.id),ozerk=(harita.autonomies??[]).find(([id])=>id===b.id),ozkSurec=(harita.autonomy_drives??[]).find(([id])=>id===
b.id),bgmSurec=ozkSurec?.[3]==="independence",devlet=Devletler.baskentMi(b.id),isgal=(harita.occupations??[]).find(([id])=>id===b.id)??null,hasar=Number(harita.damage?.[b.id]??0),benim=ch(),burada=benim.
location===b.id,zk=zenginlikBilgi(harita.wealth_tiers,b.zenginlik),avantaj=Object.entries(b.avantaj??{}).map(([k])=>`${AVANTAJ_AD[k]??k} ${\u00E7("+%{n}",{n:zk?.avantaj?zk.avantaj:Number(b.avantaj[k])})}`).
join(", ")||\u00E7("Yok"),koal=koalisyonOf(harita,sahip),muttefikler=(savas?.allies??[]).map(u=>ulkeAdi(u)).join(", "),bizimSavas=savas&&(savas.attacker_country_id===benim.citizenship||savas.defender_country_id===
benim.citizenship||(savas.allies??[]).includes(benim.citizenship));return`<section class="bolge-karti cam" data-kart="${esc(b.id)}">${kapat}
        <p class="ust-yazi"><span class="ulke-nokta" style="background:${ulkeRenk(sahip)}"></span> ${esc(ulkeAdi(sahip))} \xB7 ${b.baskent?\u00E7("Ba\u015Fkent"):\u00E7("B\xF6lge")}</p>
        <h2 class="b2">${esc(b.ad)}</h2>
        ${sahip!==b.ulke?`<p class="kucuk" style="margin:4px 0 0">${\u00E7("As\u0131l \xFClkesi: {ulke}",{ulke:esc(ulkeAdi(b.ulke))})}</p>`:""}
        ${savas?`<p class="cip mercan" style="margin-top:8px">${ikon(savas.resistance_id?"flame":"swords")}${savas.drive_id?\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131"):savas.resistance_id?
\u00E7("Yerel direni\u015F"):savas.target_region_id===b.id?\u00E7("Hedef b\xF6lge"):\u00E7("Sald\u0131r\u0131 \xE7\u0131k\u0131\u015F\u0131")} \xB7 ${esc(savasDurumMetni(savas))}</p>`:""}
        ${muttefikler?`<p class="cip yesil" style="margin-top:8px" data-kart-muttefik>${ikon("heart-handshake")}${\u00E7("Savunan\u0131n m\xFCttefikleri: {ulkeler}",{ulkeler:esc(muttefikler)})}</p>`:""}\

        ${koal?`<p class="cip lacivert" style="margin-top:8px" data-kart-koalisyon="${esc(koal.coalition_id)}">${ikon("shield")}${\u00E7("Savunma koalisyonu: {uyeler}",{uyeler:esc(koalisyonUyeleri(koal))})}\
</p>`:""}
        ${isgal?.[3]&&isgal[3]!=="campaign"?`<p class="cip altin" style="margin-top:8px" data-kart-direnis="${esc(isgal[3])}">${ikon(drnDurum(isgal[3])[2])}${esc(drnDurum(isgal[3])[0])}</p>`:""}
        ${isgal?.[4]?`<p class="cip" style="margin-top:8px" data-kart-aksama>${ikon("trending-down")}${\u00E7("\u0130\u015Fgal bak\u0131m\u0131 aks\u0131yor")}</p>`:""}
        ${isgal?.[5]?`<p class="cip ${isgal[5]==="autonomous"?"yesil":""}" style="margin-top:8px" data-kart-bicim="${esc(isgal[5])}">${ikon(isgal[5]==="autonomous"?"landmark":"flag")}${isgal[5]==="aut\
onomous"?\u00E7("\u0130\u015Fgal \xB7 \xF6zerk b\xF6lge"):\u00E7("\u0130\u015Fgal \xB7 do\u011Frudan y\xF6netim")}${isgal[6]?" \xB7 "+\u00E7("kat\u0131lma {zaman}",{zaman:esc(saatYaz(isgal[6]))}):""}<\
/p>`:""}
        ${isgal?.[7]?`<p class="cip mercan" style="margin-top:8px" data-kart-soz-bozma>${ikon("ban")}${\u00E7("S\xF6z bozma: gelir ve avantaj yok, biti\u015F {zaman}",{zaman:esc(saatYaz(isgal[7]))})}<\
/p>`:""}
        ${hasar>0?`<p class="cip" style="margin-top:8px" data-kart-hasar="${hasar}">${ikon("hammer")}${\u00E7("Sava\u015F hasar\u0131 {n}",{n:ppmYuzde(hasar)})}</p>`:""}
        ${ozerk?`<p class="cip yesil" style="margin-top:8px" data-kart-ozerk>${ikon("landmark")}${ozerk[1]?\u00E7("\xD6zerk b\xF6lge \xB7 Vali {ad}",{ad:esc(ozerk[1])}):\u00E7("\xD6zerk b\xF6lge")}</p\
>`:""}
        ${ozkSurec&&ozkSurec[1]!=="war"?`<p class="cip altin" style="margin-top:8px" data-kart-ozk-surec="${esc(ozkSurec[1])}" data-kart-ozk-tur="${esc(ozkSurec[3]??"autonomy")}">${ikon(ozkSurec[4]===
"war"?"swords":bgmSurec?"castle":(OZK_ASAMA[ozkSurec[1]]??[])[2]??"scroll-text")}${bgmSurec?ozkSurec[1]==="referendum"?\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k referandumu s\xFCr\xFCyor"):ozkSurec[1]===
"parliament"?\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k mecliste"):ozkSurec[4]==="war"?\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131 dilek\xE7esi"):\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k dilek\xE7esi"):
ozkSurec[1]==="referendum"?\u00E7("\xD6zerklik referandumu s\xFCr\xFCyor"):ozkSurec[1]==="parliament"?\u00E7("\xD6zerklik mecliste"):\u00E7("\xD6zerklik dilek\xE7esi")}${ozkSurec[2]?" \xB7 "+\u00E7("b\
iti\u015F {zaman}",{zaman:esc(saatYaz(ozkSurec[2]))}):""}</p>`:""}
        ${devlet?`<p class="cip ${devlet.korumali?"yesil":"mercan"}" style="margin-top:8px" data-kart-devlet="${esc(devlet.ulke)}">${ikon("castle")}${devlet.korumali?\u00E7("Yeni devletin ba\u015Fkenti \xB7 k\
orumal\u0131"):\u00E7("Yeni devletin ba\u015Fkenti \xB7 korumas\u0131z, biti\u015F {zaman}",{zaman:esc(saatYaz(devlet.korumasiz))})}</p>`:""}
        ${girisim?`<p class="cip mor" style="margin-top:8px" data-kart-girisim>${ikon("shield-half")}${\u00E7("Ba\u015Fkentte y\xF6netime el koyma giri\u015Fimi \xB7 biti\u015F {zaman}",{zaman:esc(saatYaz(
girisim.ends_at))})}</p>`:""}
        <div class="bilgi-izgara">
          <div><small>${\u00E7("\u015Eehir")}</small><b>${\u00E7("{n}. seviye",{n:seviye})} \xB7 ${esc(SEVIYE_AD[seviye]??"")}</b></div>
          <div><small>${\u00E7("\xDCretim avantaj\u0131")}</small><b>${esc(avantaj)}</b></div>
          ${zk?`<div data-kart-zenginlik="${esc(b.zenginlik)}"><small>${\u00E7("Zenginlik")}</small><b>${esc(zk.ad)} \xB7 ${\u00E7("g\xFCnde {kr} kr",{kr:kr(zk.gelir)})}</b></div>`:""}
          <div><small>${\u00E7("\u0130klim")}</small><b>${esc(IKLIM_AD[b.iklim]??b.iklim??"\u2014")}</b></div>
          <div><small>${\u00E7("Cephe arazisi")}</small><b>${esc(ARAZI_AD[b.arazi]??b.arazi??"\u2014")}</b></div>
          <div data-bolge-hava="${esc(havaAn(b.id,Date.now()+saatFarki).tur)}"><small>${\u00E7("Hava")}</small><b>${esc(MEVSIM_AD[havaAn(b.id,Date.now()+saatFarki).mevsim])} \xB7 ${esc(havaAdi(havaAn(
b.id,Date.now()+saatFarki)))}</b></div>
        </div>
        ${hatlarBurada(b.id).map(l=>`<p class="cip ${l.status==="building"?"altin":l.weight_q==null?"":"yesil"}" style="margin:0 0 8px">${ikon(HAT_TUR[l.kind]?.ik??"route")}${esc(hatTurAd(l.kind))} \u2192 ${esc(
bolgeAdi(l.region_a===b.id?l.region_b:l.region_a))} \xB7 ${l.status==="building"?\u00E7("\u015Fantiye {n}",{n:yuzde(Number(l.progress_ppm??0)/1e6)}):l.weight_q==null?\u00E7("kapal\u0131"):Number(l.weight_q)>
2?\u00E7("bak\u0131ms\u0131z"):\u00E7("a\xE7\u0131k")}</p>
          ${l.status==="building"?`<button class="dugme kucuk-d" data-santiye-git="${esc(l.line_id)}" style="margin-bottom:10px">${ikon("hammer")}${\u00E7("\u015Eantiyeye git")}</button>`:""}`).join("")}\

        <div class="satir" style="flex-wrap:wrap;gap:8px">
          ${burada?`<span class="cip yesil">${ikon("map-pin")}${\u00E7("Buradas\u0131n")}</span><button class="dugme ikincil kucuk-d" data-git="sehir/ev">${ikon("house")}${\u00E7("Evim ve \u015Fehir")}\
</button>`:`<button class="dugme kucuk-d" data-seyahat="${esc(b.id)}">${ikon("route")}${\u00E7("Seyahat et")}</button>`}
          ${bizimSavas?`<button class="dugme mercan kucuk-d" data-git="ulke/cephe">${ikon("swords")}${\u00E7("Cephe")}</button>`:""}
          ${girisim&&girisim.country_id===benim.citizenship?`<button class="dugme mercan kucuk-d" data-git="ulke/hareket">${ikon("shield-half")}${\u00E7("Hareket")}</button>`:""}
          ${devlet||!b.baskent&&(ozerk||ozkSurec||sahip===benim.citizenship)?`<button class="dugme ikincil kucuk-d" data-ozk-bolge-ac="${esc(b.id)}">${ikon(devlet?"castle":"map-pin-house")}${\u00E7("B\
\xF6lge")}</button>`:""}
          ${isgal||hasar>0?`<button class="dugme ${isgal&&isgal[2]===benim.citizenship?"mercan":"ikincil"} kucuk-d" data-topraklar-ac="${esc(b.id)}">${ikon(isgal?"megaphone":"hammer")}${isgal?\u00E7("\
Direni\u015F"):\u00E7("Onar\u0131m")}</button>`:""}
        </div>
      </section>`}const hatlarBurada=id=>(isb?.lines??[]).filter(l=>l.region_a===id||l.region_b===id);function kartCiz(){const yer=$("#bolge-karti",kap);if(yer){yer.innerHTML=kartHtml();for(const b of $$(
"[data-santiye-git]",yer))b.onclick=()=>santiyeyeGit(b.dataset.santiyeGit);$("[data-kapat-kart]",yer)?.addEventListener("click",()=>secimYap(null));for(const b of $$("[data-git]",yer))b.onclick=()=>Kabuk.
git(b.dataset.git);for(const b of $$("[data-ozk-bolge-ac]",yer))b.onclick=()=>ozkBolgeAc(b.dataset.ozkBolgeAc);for(const b of $$("[data-topraklar-ac]",yer))b.onclick=()=>topraklarAc(b.dataset.topraklarAc);
$("[data-seyahat]",yer)?.addEventListener("click",e=>seyahatSor(e.currentTarget.dataset.seyahat,()=>yenile())),$("[data-bolgeleri]",yer)?.addEventListener("click",e=>{haritaAcilan.add(e.currentTarget.
dataset.bolgeleri),Kabuk.git("dunya/harita",{gecmis:!1})})}}function listeCiz(){const benim=ch(),acik=[...harita.open_countries??[]].sort((a,b)=>a===benim.citizenship?-1:b===benim.citizenship?1:ulkeAdi(
a).localeCompare(ulkeAdi(b),DIL.yerel));$("#harita-liste",kap).innerHTML=acik.map(u=>{const bolgeler=veri.bolgeler.filter(b=>b.ulke===u).sort((a,b)=>a.baskent?-1:b.baskent?1:a.ad.localeCompare(b.ad,DIL.
yerel));return bolgeler.length?`<div class="yol-ulke"><p class="ust-yazi"><span class="ulke-nokta" style="background:${ulkeRenk(u)}"></span> ${esc(ulkeAdi(u))}</p>
          <div class="liste">${bolgeler.map(b=>{const sahip=harita.sahip[b.id]??b.ulke,savas=(harita.campaigns??[]).find(s=>s.target_region_id===b.id),girisim=(harita.seizures??[]).some(g=>g.region_id===
b.id),ozerk=(harita.autonomies??[]).some(([id])=>id===b.id),ozkSurec=(harita.autonomy_drives??[]).find(([id])=>id===b.id),isgal=(harita.occupations??[]).find(([id])=>id===b.id),hasar=Number(harita.damage?.[b.
id]??0),seviye=Number(harita.cities?.[b.id]??1);return`<div class="liste-satir" data-liste-bolge="${esc(b.id)}" ${secili?.id===b.id?'aria-current="true"':""}>
              <span class="liste-ikon ${benim.location===b.id?"yesil":b.baskent?"lacivert":""}">${ikon(b.baskent?"landmark":"map-pin")}</span>
              <div><span class="tur">${b.baskent?\u00E7("Ba\u015Fkent"):\u00E7("B\xF6lge")} \xB7 ${\u00E7("{n}. seviye",{n:seviye})}</span><b>${esc(b.ad)}</b>
                <div class="odul">${benim.location===b.id?`<span>${ikon("map-pin")}${\u00E7("Buradas\u0131n")}</span>`:""}
                  ${sahip!==b.ulke?`<span>${ikon("flame")}${\u00E7("{ulke} elinde",{ulke:esc(ulkeAdi(sahip))})}</span>`:""}
                  ${savas?`<span class="rozet-cephe">${ikon(savas.resistance_id?"flame":"swords")}${savas.drive_id?esc(\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131"))+" \xB7 ":savas.resistance_id?
esc(\u00E7("Yerel direni\u015F"))+" \xB7 ":""}${esc(savasDurumMetni(savas))}</span>`:""}
                  ${isgal?.[3]&&isgal[3]!=="campaign"?`<span class="rozet-direnis">${ikon(drnDurum(isgal[3])[2])}${esc(drnDurum(isgal[3])[0])}</span>`:""}
                  ${hasar>0?`<span class="rozet-hasar">${ikon("hammer")}${\u00E7("hasar {n}",{n:ppmYuzde(hasar)})}</span>`:""}
                  ${girisim?`<span class="rozet-girisim">${ikon("shield-half")}${\u00E7("Ba\u015Fkentte el koyma giri\u015Fimi")}</span>`:""}
                  ${ozerk?`<span class="rozet-ozerk">${ikon("landmark")}${\u00E7("\xD6zerk b\xF6lge")}</span>`:""}
                  ${ozkSurec&&ozkSurec[1]!=="war"?`<span class="rozet-ozk">${ikon(ozkSurec[4]==="war"?"swords":ozkSurec[3]==="independence"?"castle":ozkSurec[1]==="referendum"?"vote":"scroll-text")}${ozkSurec[1]===
"referendum"?\u00E7("Referandum"):ozkSurec[4]==="war"?\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131 dilek\xE7esi"):ozkSurec[3]==="independence"?\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k s\xFCreci"):
\u00E7("\xD6zerklik s\xFCreci")}</span>`:""}
                  ${Devletler.baskentMi(b.id)?`<span class="rozet-ozerk">${ikon("castle")}${\u00E7("Yeni devlet")}</span>`:""}</div></div>
              <button class="dugme ikincil kucuk-d" data-goster="${esc(b.id)}">${ikon("eye")}${\u00E7("G\xF6ster")}</button>
            </div>`}).join("")}</div></div>`:""}).join("");for(const b of $$("[data-goster]",kap))b.onclick=()=>{secimYap({tur:"bolge",id:b.dataset.goster},!0),window.scrollTo({top:0,behavior:hareketAzalt?
"auto":"smooth"})}}function secimYap(s,odakla=!1){if(!(film&&s)){secili=s,kartCiz();for(const r of $$("[data-liste-bolge]",kap))r.toggleAttribute("aria-current",r.dataset.listeBolge===s?.id);if(mod===
"3b"&&harita3bOrnek)harita3bOrnek.sec(s?.id??null),odakla&&s&&harita3bOrnek.odakla(s.id);else if(mod==="2b"){for(const p of $$("#harita-2b [data-bolge], #harita-2b [data-ulke]",kap))p.classList.toggle(
"secili",(p.dataset.bolge??p.dataset.ulke)===s?.id);odakla&&s&&odakla2b(s.id)}}}let trafik2b=[];const TRAFIK2B_SINIR={araba:24,ticaret:8,konvoy:12,otobus:8,kargo:10},TRAFIK2B_ARAC={bisiklet:'<circle c\
x="-2.5" r="2.1"/><circle cx="2.5" r="2.1"/>',motosiklet:'<path d="M-4.6 2 h9.2 l-2 -4.4 h-4.6 Z"/>',otomobil:'<rect x="-4.4" y="-2.7" width="8.8" height="5.4" rx="1.8"/>',tekne:'<path d="M-4.8 -0.8 h\
9.6 l-2.2 3.4 h-5.2 Z"/>'};function trafik2bKur(d,nokta){const t=d.trafik,liste=[];if(!t)return liste;if(kip==="siyasi"){let na=0;for(const y of t.travels??[]){const n=(y.route??[]).map(nokta).filter(
Boolean);if(!(n.length<2))for(const[bas,son,arac]of y.samples??[]){if(na>=TRAFIK2B_SINIR.araba)break;d.yol&&d.yol.from===y.from&&d.yol.to===y.to&&Date.parse(d.yol.departs_at)===Date.parse(bas)||(liste.
push({tur:"araba",n,bas:Date.parse(bas),son:Date.parse(son),sinif:arac?`arac-${arac}`:"",svg:arac?`<title>${esc(\u00E7("Yolcu: {arac}",{arac:aracAdi(arac)}))}</title>${TRAFIK2B_ARAC[arac]??TRAFIK2B_ARAC.
otomobil}`:'<circle r="3.4"/>'}),na++)}}let no=0;for(const o of t.tour_buses??[]){if(no>=TRAFIK2B_SINIR.otobus)break;const n=(o.route??[]).map(nokta).filter(Boolean);n.length<2||(liste.push({tur:"otob\
us",n,bas:Date.parse(o.departs_at),son:Date.parse(o.arrives_at),ad:o.band??"",svg:`<title>${esc(\u00E7("Turne otob\xFCs\xFC: {grup} ({n} yolcu)",{grup:o.band??"",n:Number(o.riders??0)}))}</title><rect\
 x="-6" y="-3.2" width="12" height="6.4" rx="1.6" fill="${esc(MUZIK_TUR_RENK[o.genre]??"#B5442F")}"/><rect x="-4.5" y="-2.2" width="9" height="2.2" fill="#F4F1E8" opacity=".9"/><text y="-5" text-ancho\
r="middle" class="otobus2b-yazi">${esc(o.band??"")}</text>`}),no++)}let nkg=0;for(const x of t.cargo??[]){const n=(x.route??[]).map(nokta).filter(Boolean);if(!(n.length<2))for(const[bas,son]of x.samples??
[]){if(nkg>=TRAFIK2B_SINIR.kargo)break;liste.push({tur:"kargo",n,bas:Date.parse(bas),son:Date.parse(son),svg:`<title>${esc(\u00E7("Kargo: {a} \u2192 {b}",{a:bolgeAdi(x.from),b:bolgeAdi(x.to)}))}</titl\
e><rect x="-5.5" y="-3.4" width="11" height="6.8" rx="1.4"/><rect x="2" y="-2.2" width="3" height="3" class="kabin"/>`}),nkg++}}let nt=0;for(const x of t.trade??[]){const u=ticaretUclari(x.from,x.to),
a=u&&nokta(u.a),b=u&&nokta(u.b);if(!a||!b)continue;const m=[(a[0]+b[0])/2,(a[1]+b[1])/2-Math.hypot(b[0]-a[0],b[1]-a[1])*.16],adet=Math.min(2,Math.max(1,Number(x.trades)||1));for(let k=0;k<adet&&nt<TRAFIK2B_SINIR.
ticaret;k++,nt++)liste.push({tur:"ticaret",a,m,b,sure:14,faz:k/adet+nt*.13,svg:`<circle r="6.5" fill="${esc(ulkeRenk(x.from))}"/>${u.gemi?'<path d="M-4 1 L4 1 L2.5 3.5 L-2.5 3.5 Z M-1 1 L-1 -4 L2.5 -1\
 L-1 -1"/>':'<path d="M-4.5 -2 L1.5 -2 L1.5 2.5 L-4.5 2.5 Z M1.5 0 L4 0 L4.5 2.5 L1.5 2.5"/>'}`})}}if(kip==="siyasi"||kip==="cephe"){let nk=0;for(const c of t.convoys??[]){const h=nokta(c.to);if(!h)continue;
const kol=(bas,adet,sinif)=>{const a=nokta(bas);if(!(!a||Math.hypot(h[0]-a[0],h[1]-a[1])<1))for(let k=0;k<adet&&nk<TRAFIK2B_SINIR.konvoy;k++,nk++)liste.push({tur:"konvoy",sinif,a,m:[(a[0]+h[0])/2,(a[1]+
h[1])/2],b:h,sure:12,faz:-k*.12,sira:k,svg:'<rect x="-4.5" y="-3" width="9" height="6" rx="1.5"/>'})};kol(c.from,konvoyAdet(c.attackers),"saldiran"),c.defender_capital&&c.defender_capital!==c.to&&Number(
c.defenders)>0&&kol(c.defender_capital,konvoyAdet(c.defenders),"savunan")}}return liste}function trafik2bYerlestir(){const svg=$("#harita-2b svg",kap);if(!svg||!trafik2b.length)return;const simdi=Date.
now()+saatFarki,t=performance.now()/1e3;for(const el of $$("[data-trafik2b]",svg)){const a=trafik2b[Number(el.dataset.trafik2b)];if(!a)continue;let p;if(a.tur==="araba"||a.tur==="otobus"||a.tur==="kar\
go")p=kirikNokta(a.n,(simdi-a.bas)/Math.max(1,a.son-a.bas));else{const u=a.tur==="ticaret"?hareketAzalt?.3+a.faz%1*.4:.5-.5*Math.cos((t/a.sure+a.faz)*Math.PI*2):hareketAzalt?Math.max(.05,.66-a.sira*.12):
((t/a.sure+a.faz)%1+1)%1,v=1-u;p=[v*v*a.a[0]+2*v*u*a.m[0]+u*u*a.b[0],v*v*a.a[1]+2*v*u*a.m[1]+u*u*a.b[1]]}el.dataset.x=p[0].toFixed(2),el.dataset.y=p[1].toFixed(2)}}function ciz2b(){const kutu=$("#hari\
ta-2b",kap),y=yollar2b(veriTam),d=durumNesnesi(),acik=d.acik,ulkeRenk2b=(u,i)=>{let r=acik.has(u.id)?renkKaristir(u.renk,"#FFFFFF",.12):renkKaristir(KUM2B[i%KUM2B.length],u.renk,.17);return d.uyuyan.has(
u.id)&&(r=renkKaristir(r,"#EDE6D4",.5)),kip!=="siyasi"&&(r=renkKaristir(r,"#ECE8DD",.55)),r},bolgeRenk2b=b=>{if(kip==="kaynak"){const a=Object.keys(b.avantaj??{})[0];return renkKaristir(a?KAYNAK_RENK2B[a]:
"#CDB991","#F1EDE2",zenginlikSoluklugu(b))}if(kip==="cephe"){const s=d.savaslar.find(x=>x.target_region_id===b.id||x.origin_region_id===b.id);return s?s.target_region_id===b.id?"#C65A3B":"#E08F70":"#D\
8D2C2"}const kar=havaAn(b.id,Date.now()+saatFarki).kar;return kar?renkKaristir(ulkeRenk(d.sahip[b.id]??b.ulke),"#F4F7FA",kar):ulkeRenk(d.sahip[b.id]??b.ulke)},ulkeler=veri.ulkeler.filter(u=>y.ulke.has(
u.id)&&!veri.bolgeler.some(b=>b.ulke===u.id)).map(u=>`<path class="u2b${secili?.id===u.id?" secili":""}" data-ulke="${esc(u.id)}" d="${y.ulke.get(u.id)}" fill="${ulkeRenk2b(u,ulkeById.get(u.id).i)}"><\
title>${esc(u.ad)}</title></path>`).join(""),bolgeler=veri.bolgeler.map(b=>`<path class="b2b${secili?.id===b.id?" secili":""}" data-bolge="${esc(b.id)}" data-sahip="${esc(d.sahip[b.id]??b.ulke)}" d="${y.
bolge.get(b.id)}" fill="${bolgeRenk2b(b)}" role="button" aria-label="${esc(b.ad)}"><title>${esc(b.ad)}</title></path>`).join(""),savaslar=d.savaslar.map(s=>{const a=bolgeById.get(s.origin_region_id),b=bolgeById.
get(s.target_region_id);return!a||!b?"":`<line class="savas2b" x1="${a.etiket[0]}" y1="${a.etiket[1]}" x2="${b.etiket[0]}" y2="${b.etiket[1]}"/>
          <g class="olcekli savas-isaret" data-x="${b.etiket[0]}" data-y="${b.etiket[1]-2}"><circle r="9" class="savas-nokta"/><path d="M-4 -4 L4 4 M4 -4 L-4 4" class="savas-carpi"/>
            <text y="-14" text-anchor="middle" class="savas-etiket">${esc(b.ad)} \xB7 ${s.drive_id?esc(\u00E7("ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131"))+" \xB7 ":s.resistance_id?esc(\u00E7("\
yerel direni\u015F"))+" \xB7 ":""}${esc(savasDurumMetni(s))}</text></g>`}).join(""),girisimler=(d.girisimler??[]).map(g=>{const b=bolgeById.get(g.region_id);return b?`<g class="olcekli girisim-isaret"\
 data-x="${b.etiket[0]}" data-y="${b.etiket[1]-2}" data-girisim="${esc(g.country_id)}"><circle r="9" class="girisim-nokta"/>
          <path d="M0 -5 L4.4 -3.2 L4.4 0.8 Q4.4 4 0 5.8 Q-4.4 4 -4.4 0.8 L-4.4 -3.2 Z" class="girisim-kalkan"/>
          <text y="-14" text-anchor="middle" class="girisim-etiket">${esc(b.ad)} \xB7 ${\u00E7("el koyma giri\u015Fimi")}</text></g>`:""}).join(""),ozerkler=[...(d.ozerkler??[]).map(([id,vali])=>[id,"\
ozerk",vali,null]),...(d.ozkSurecler??[]).filter(([,asama])=>asama!=="war").map(([id,asama,,tur,yol])=>[id,asama,yol,tur]),...(d.devletler??[]).filter(k=>!k.pending).map(k=>[k.capital_region_id,"devle\
t",null,k])].map(([id,tur,vali,ek])=>{const b=bolgeById.get(id);if(!b)return"";const ozk=tur==="ozerk",dv=tur==="devlet",bgm=ek==="independence",simge=dv?'<path d="M-3.6 4 V-1.4 H-2.2 V-3.6 H-0.8 V-1.\
4 H0.8 V-3.6 H2.2 V-1.4 H3.6 V4 Z" class="ozk-simge"/>':ozk?'<path d="M-2 4 L-2 -4 L3.4 -2.4 L-2 -0.8" class="ozk-simge"/>':'<path d="M-3.2 -1 h6.4 v4.6 h-6.4 Z M-1.6 -1 v-2.6 h3.2 v2.6" class="ozk-si\
mge"/>',baslik=dv?ek.protected?\u00E7("{devlet} \xB7 ba\u015Fkent korumal\u0131",{devlet:devletGorunumAdi(ek)}):\u00E7("{devlet} \xB7 ba\u015Fkent korumas\u0131z",{devlet:devletGorunumAdi(ek)}):ozk?vali?
\u00E7("\xD6zerk b\xF6lge \xB7 Vali {ad}",{ad:vali}):\u00E7("\xD6zerk b\xF6lge"):bgm?tur==="referendum"?\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k referandumu s\xFCr\xFCyor"):vali==="war"?\u00E7("Ba\u011F\u0131ms\u0131\
zl\u0131k sava\u015F\u0131 dilek\xE7esi"):\u00E7("Ba\u011F\u0131ms\u0131zl\u0131k s\xFCreci"):tur==="referendum"?\u00E7("\xD6zerklik referandumu s\xFCr\xFCyor"):\u00E7("\xD6zerklik s\xFCreci");return`\
<g class="olcekli ozk-isaret ${dv?ek.protected?"ozerk":"devlet":ozk?"ozerk":"surec"}" data-x="${b.etiket[0]+9}" data-y="${b.etiket[1]-4}" data-ozk-isaret="${esc(id)}" data-ozk-tur="${esc(dv?"devlet":bgm?
"independence:"+tur:tur)}">
          <circle r="6.5" class="ozk-nokta"/>${simge}
          <title>${esc(b.ad)} \xB7 ${esc(baslik)}</title></g>`}).join(""),direnisler=(d.isgaller??[]).filter(([,,,st])=>st==="open"||st==="waiting").map(([id,,asil,st])=>{const b=bolgeById.get(id);return b?
`<g class="olcekli direnis-isaret ${st}" data-x="${b.etiket[0]}" data-y="${b.etiket[1]}" data-direnis-isaret="${esc(id)}" data-direnis-durum="${esc(st)}">
          <g transform="translate(-30 -16)"><circle r="8" class="direnis-halka"/><circle r="6.5" class="direnis-nokta" style="fill:${esc(ulkeRenk(asil))}"/>
          <path d="M-3.2 -3.8 H3.2 V1.6 H-3.2 Z M-1.8 -1.8 H1.8 M-1.8 -0.2 H1 M0 1.6 V4" class="direnis-simge"/></g>
          <title>${esc(b.ad)} \xB7 ${esc(st==="open"?\u00E7("direni\u015F oylamas\u0131"):\u00E7("direni\u015F kampanyas\u0131 bekliyor"))}</title></g>`:""}).join(""),hasarlar=Object.entries(d.hasar??
{}).filter(([id,ppm])=>Number(ppm)>0&&bolgeById.has(id)).map(([id,ppm])=>{const b=bolgeById.get(id);return`<g class="olcekli hasar-isaret" data-x="${b.etiket[0]}" data-y="${b.etiket[1]}" data-hasar-is\
aret="${esc(id)}" data-hasar="${Number(ppm)}">
          <g transform="translate(-30 4)"><circle r="6" class="hasar-nokta" style="opacity:${(.6+Math.min(1,Number(ppm)/5e5)*.4).toFixed(2)}"/>
          <path d="M-2.6 2.6 V-1.2 L0 -3 L2.6 -1.2 V2.6 Z M-0.3 -1.8 L0.7 0 L-0.5 1.3" class="hasar-simge"/></g>
          <title>${esc(b.ad)} \xB7 ${esc(\u00E7("sava\u015F hasar\u0131 {n}",{n:ppmYuzde(ppm)}))}</title></g>`}).join(""),filmIgneleri=(d.filmIgneleri??[]).map(o=>{const b=bolgeById.get(o.bolge);return b?
`<g class="olcekli film-igne ${esc(o.tur)}${o.parlak?" parlak":""}" data-x="${b.etiket[0]}" data-y="${b.etiket[1]-6}" data-film-igne="${esc(o.tur)}">
          <circle r="${o.parlak?9:6.5}" class="film-igne-nokta"/>
          <g transform="translate(${o.parlak?-6:-4.5} ${o.parlak?-6:-4.5}) scale(${o.parlak?.5:.375})" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="roun\
d" class="film-igne-ik">${IKON[HaritaFilm.ikonu(o)]??""}</g>
          ${o.parlak?`<text y="-14" text-anchor="middle" class="film-igne-yazi">${esc(HaritaFilm.yazi(o))}</text>`:""}<title>${esc(HaritaFilm.yazi(o))}</title></g>`:""}).join(""),yazilar=veri.bolgeler.
map(b=>`<text x="${b.etiket[0]}" y="${b.etiket[1]+(b.baskent?0:1.4)}" text-anchor="middle" class="${b.baskent?"y-baskent":"y-bolge"}" data-oncelik="${b.baskent?3:2}">${esc(b.ad)}${b.baskent?" \xB7 "+\u00E7(
"SV {n}",{n:Number(d.sehirler[b.id]??1)}):""}</text>`).join("")+veri.ulkeler.filter(u=>!veri.bolgeler.some(b=>b.ulke===u.id)&&(u.oda??0)>4).map(u=>`<text x="${u.etiket[0]}" y="${u.etiket[1]}" text-anc\
hor="middle" class="y-kapali" data-oncelik="1">${esc(u.ad)}</text>`).join(""),konum=d.yol?null:bolgeById.get(d.konum),yolY=d.yol?rota2b(d.yol):[],aracN=d.yol?aracNoktasi2b(d.yol):null,yol2b=yolY.length>
1?`<polyline class="yol2b" points="${yolY.map(p=>p.join(",")).join(" ")}"/>`:"",kendi=aracN?yolKendiArac2b(d.yol):null,arac=aracN?`<g class="olcekli arac2b" data-x="${aracN[0].toFixed(1)}" data-y="${aracN[1].
toFixed(1)}" data-yol-arac="${esc(kendi?.tur??"")}"><circle r="9" class="arac2b-govde"${kendi?` style="fill:${aracRengi(kendi.renk)}"`:""}/>
        <g class="arac2b-ikon"${kendi?` style="fill:${aracKarsit(kendi.renk)};stroke:${aracKarsit(kendi.renk)}"`:""}>${aracMini2b(kendi?.tur??"")}</g><text y="-15" text-anchor="middle" class="konum-ya\
zi"${yolPlaka(d.yol)?` data-harita-plaka="${esc(yolPlaka(d.yol))}"`:""}>${\u00E7("Yoldas\u0131n \xB7 {bolge}",{bolge:esc(bolgeById.get(d.yol.to)?.ad??"")})}${yolPlaka(d.yol)?" \xB7 "+esc(yolPlaka(d.yol)):
""}</text></g>`:"",gece=`<path class="gece2b" d="${geceYolu2b(Date.now()+saatFarki,veri.tuval)}"/>`,nokta=id=>bolgeById.get(id)?.etiket??DUNYA.bolgeler?.[id]?.e??null,egri=(a,b,kalk)=>{const mx=(a[0]+
b[0])/2,my=(a[1]+b[1])/2-kalk;return`M${a[0]},${a[1]} Q${mx.toFixed(1)},${my.toFixed(1)} ${b[0]},${b[1]}`},hatlar=(d.isbirligi?.lines??[]).map(l=>{const a=nokta(l.region_a),b=nokta(l.region_b);if(!a||
!b)return"";const insaat=l.status==="building",kapali=l.status==="built"&&l.weight_q==null,bakimsiz=l.status==="built"&&Number(l.weight_q)>2,sinif=insaat?"insaat":kapali?"kapali":`${l.kind}${bakimsiz?
" bakimsiz":""}`,yol=egri(a,b,l.kind==="rail"?0:Math.hypot(b[0]-a[0],b[1]-a[1])*.18),m=[(a[0]+b[0])/2,(a[1]+b[1])/2];return`<path class="hat2b ${sinif}" d="${yol}" data-hat2b="${esc(l.line_id)}" data-\
hat2b-durum="${esc(l.status)}"/>${l.kind==="rail"&&!insaat&&!kapali?`<path class="hat2b rail-ust" d="${yol}"/>`:""}
          ${insaat?`<g class="olcekli hat2b-isaret insaat" data-x="${m[0].toFixed(1)}" data-y="${m[1].toFixed(1)}"><circle r="8"/><path d="M-3 4 L-3 -4 L4 -4 M1 -4 L1 1" stroke="#E0A23A" stroke-width=\
"1.6" fill="none"/>
            <text y="-12" text-anchor="middle">${esc(yuzde(Number(l.progress_ppm??0)/1e6))}</text></g>`:""}`}).join(""),ticaret=kip!=="siyasi"?"":(d.isbirligi?.trade??[]).map(t=>{const u=ticaretUclari(
t.a,t.b),a=u&&nokta(u.a),b=u&&nokta(u.b);if(!a||!b)return"";const m=[(a[0]+b[0])/2,(a[1]+b[1])/2-Math.hypot(b[0]-a[0],b[1]-a[1])*.08];return`<path class="ticaret2b${t.customs_union?" gumruk":""}" d="${egri(
a,b,Math.hypot(b[0]-a[0],b[1]-a[1])*.16)}" data-ticaret2b="${esc(t.a+"|"+t.b)}"/>
          ${ticaretAdet(t)?`<g class="olcekli ticaret2b-arac" data-x="${m[0].toFixed(1)}" data-y="${m[1].toFixed(1)}"><circle r="7"/>${u.gemi?'<path d="M-4 1 L4 1 L2.5 3.5 L-2.5 3.5 Z M-1 1 L-1 -4 L2.\
5 -1 L-1 -1"/>':'<path d="M-4.5 -2 L1.5 -2 L1.5 2.5 L-4.5 2.5 Z M1.5 0 L4 0 L4.5 2.5 L1.5 2.5"/>'}</g>`:""}`}).join(""),simdi2b=Date.now()+saatFarki,dilim2b=havaDilimi(simdi2b),hava=kip!=="siyasi"?"":
veri.bolgeler.map(b=>{const hv=havaAn(b.id,simdi2b),h=hv.tur;if(h==="acik")return"";const r=rastgele(ozet(b.id+":bulut:"+dilim2b)),x=b.etiket[0]+(r()-.5)*2.4,y2=b.etiket[1]-3.2;return h==="sis"?`<g cl\
ass="olcekli hava2b" data-x="${x.toFixed(1)}" data-y="${(y2+3).toFixed(1)}" data-hava2b="sis"><g class="pus"><rect x="-10" y="-3" width="20" height="2.6" rx="1.3"/><rect x="-6" y="0.6" width="17" heig\
ht="2.6" rx="1.3"/><rect x="-12" y="4.2" width="15" height="2.4" rx="1.2"/></g></g>`:`<g class="olcekli hava2b" data-x="${x.toFixed(1)}" data-y="${y2.toFixed(1)}" data-hava2b="${h}"${hv.guclu?' data-g\
uclu="1"':""}><g class="bulut${h==="yagmur"?" yagmur":""}${hv.guclu?" guclu":""}"><circle cx="-5" cy="1" r="4.5"/><circle cx="0" cy="-2" r="6"/><circle cx="6" cy="1" r="4.5"/><rect x="-9" y="1" width=\
"19" height="4.5" rx="2.2"/></g>
          ${h==="yagmur"?'<line class="damla" x1="-4" y1="8" x2="-5" y2="12"/><line class="damla" x1="1" y1="8" x2="0" y2="12"/><line class="damla" x1="6" y1="8" x2="5" y2="12"/>':""}
          ${h==="kar"?'<circle class="kar" cx="-4" cy="10" r="1.5"/><circle class="kar" cx="1.5" cy="12" r="1.5"/><circle class="kar" cx="6" cy="9.5" r="1.5"/>':""}</g>`}).join(""),pin=konum?`<g class\
="olcekli konum2b" data-x="${konum.etiket[0]+3}" data-y="${konum.etiket[1]-2}"><path d="M0 0 C -7 -9 -8 -14 -8 -17 A 8 8 0 1 1 8 -17 C 8 -14 7 -9 0 0 Z" class="konum-igne"/><circle cy="-17" r="3" fill\
="#fff"/>
        <text y="-30" text-anchor="middle" class="konum-yazi">${\u00E7("Buradas\u0131n")}</text></g>`:"";trafik2b=trafik2bKur(d,nokta);const isgaller=kip==="kaynak"?[]:veri.bolgeler.filter(b=>(d.sahip[b.
id]??b.ulke)!==b.ulke),desenler=[...new Set(isgaller.map(b=>b.ulke))].map(u=>`<pattern id="isgal2b-${esc(u)}" patternUnits="userSpaceOnUse" width="2.4" height="2.4"
        patternTransform="rotate(45)"><rect width="1.1" height="2.4" fill="${esc(ulkeRenk(u))}" opacity="0.75"/></pattern>`).join(""),isgalSvg=isgaller.map(b=>`<path class="isgal2b" data-isgal2b="${esc(
b.id)}" d="${y.bolge.get(b.id)}" fill="url(#isgal2b-${esc(b.ulke)})"/>`).join(""),trafikSvg=trafik2b.map((a,k)=>`<g class="olcekli trafik2b-${a.tur}${a.sinif?" "+a.sinif:""}" data-trafik2b="${k}" data\
-x="0" data-y="0">${a.svg}</g>`).join(""),trafikSay=tur=>trafik2b.filter(a=>a.tur===tur).length;sonOlcek=0,kutu.innerHTML=`<svg viewBox="0 0 10 10" preserveAspectRatio="none" role="img" aria-label="${\u00E7(
"D\xFCnya haritas\u0131, hafif g\xF6r\xFCn\xFCm")}"
        data-trafik-araba="${trafikSay("araba")}" data-trafik-ticaret="${trafikSay("ticaret")}" data-trafik-konvoy="${trafikSay("konvoy")}" data-trafik-otobus="${trafikSay("otobus")}" data-trafik-karg\
o="${trafikSay("kargo")}" data-isgal="${isgaller.length}"
        data-direnis="${(d.isgaller??[]).filter(([,,,st])=>st).length}" data-hasar="${Object.values(d.hasar??{}).filter(x=>Number(x)>0).length}">
        <defs>${desenler}</defs>
        <rect x="-2000" y="-2000" width="${veri.tuval[0]+4e3}" height="${veri.tuval[1]+4e3}" class="deniz2b"/>
        <path d="${y.notr}" class="notr2b"/>
        <g>${ulkeler}</g><g>${bolgeler}</g><g class="isgal2b-grup">${isgalSvg}</g>
        ${gece}${hatlar}${ticaret}<g class="yazilar2b">${yazilar}</g>${hava}${savaslar}${girisimler}${ozerkler}${direnisler}${hasarlar}${trafikSvg}${filmIgneleri}${yol2b}${pin}${arac}</svg>`,trafik2bYerlestir(),
gorunumUygula(),bagla2b()}function baslangic2b(){const r=sahneEl.getBoundingClientRect(),k=bolgelerKutusu(yollar2b(veriTam),veri.bolgeler),pay=.12;let w=k.w*(1+pay*2),h=k.h*(1+pay*2);const oran=r.height/
Math.max(1,r.width);return h/w<oran?h=w*oran:w=h/oran,{x:k.x+k.w/2-w/2,y:k.y+k.h/2-h/2,w,h}}function gorunumUygula(){const svg=$("#harita-2b svg",kap);if(!svg||!g2)return;const r=svg.getBoundingClientRect();
if(r.width<2||r.height<2)return;g2.h=g2.w*(r.height/r.width),svg.setAttribute("viewBox",`${g2.x} ${g2.y} ${g2.w} ${g2.h}`);const birim=g2.w/Math.max(1,r.width);$(".yazilar2b",svg)?.setAttribute("font-\
size",(12*birim).toFixed(3));for(const el of $$(".olcekli",svg))el.setAttribute("transform",`translate(${el.dataset.x} ${el.dataset.y}) scale(${birim.toFixed(4)})`);svg.classList.toggle("uzak",g2.w>260),
Math.abs(g2.w-sonOlcek)>.01&&(sonOlcek=g2.w,yaziCakisma(svg))}let sonOlcek=0;function yaziCakisma(svg){const kutular=[],cakisir=k=>kutular.some(d=>!(k[2]<d[0]||k[0]>d[2]||k[3]<d[1]||k[1]>d[3]));for(const el of $$(
".konum-yazi, .savas-etiket, .film-igne-yazi",svg)){const r=el.getBoundingClientRect();r.width&&kutular.push([r.left-2,r.top-1,r.right+2,r.bottom+1])}const yazilar=$$(".yazilar2b text",svg).sort((a,b)=>Number(
b.dataset.oncelik??0)-Number(a.dataset.oncelik??0));for(const t of yazilar){t.style.visibility="";const r=t.getBoundingClientRect();if(!r.width)continue;const k=[r.left-2,r.top-1,r.right+2,r.bottom+1];
cakisir(k)?t.style.visibility="hidden":kutular.push(k)}}function odakla2b(id){const b=bolgeById.get(id),u=ulkeById.get(id)?.u,n=b?b.etiket:u?.etiket;if(!n||!g2)return;const w=Math.min(g2.w,b?90:220);g2=
{x:n[0]-w/2,y:n[1]-w*(g2.h/g2.w)/2,w,h:g2.h},gorunumUygula()}function yakinlas2b(oran){if(!g2)return;const cx=g2.x+g2.w/2,cy=g2.y+g2.h/2,w=Math.max(25,Math.min(veri.tuval[0],g2.w*oran)),h=w*(g2.h/g2.w);
g2={x:cx-w/2,y:cy-h/2,w,h},gorunumUygula()}function bagla2b(){const svg=$("#harita-2b svg",kap),imler=new Map;let bas=null;const durumAl=()=>{const p=[...imler.values()],r=svg.getBoundingClientRect(),
m=p.length>1?{x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2}:{...p[0]},d=p.length>1?Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y):0;return{g:{...g2},m,d,r,n:p.length,hareket:0,ilk:{...m}}};svg.addEventListener("p\
ointerdown",e=>{svg.setPointerCapture?.(e.pointerId),imler.set(e.pointerId,{x:e.clientX,y:e.clientY}),bas=durumAl()}),svg.addEventListener("pointermove",e=>{if(!imler.has(e.pointerId)||!bas)return;imler.
set(e.pointerId,{x:e.clientX,y:e.clientY});const p=[...imler.values()],{r,g}=bas;if(p.length>1&&bas.n>1){const m={x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2},d=Math.max(10,Math.hypot(p[0].x-p[1].x,p[0].y-
p[1].y)),w=Math.max(25,Math.min(veri.tuval[0],g.w*(bas.d/d))),h=w*(g.h/g.w),wx=g.x+(bas.m.x-r.left)/r.width*g.w,wy=g.y+(bas.m.y-r.top)/r.height*g.h;g2={x:wx-(m.x-r.left)/r.width*w,y:wy-(m.y-r.top)/r.height*
h,w,h},bas.hareket=99}else if(p.length===1){const dx=p[0].x-bas.m.x,dy=p[0].y-bas.m.y;bas.hareket=Math.max(bas.hareket,Math.hypot(dx,dy)),g2={...g,x:g.x-dx/r.width*g.w,y:g.y-dy/r.height*g.h}}gorunumUygula()});
const birak=e=>{if(imler.has(e.pointerId)){if(imler.delete(e.pointerId),bas&&bas.n===1&&imler.size===0&&bas.hareket<6&&e.type==="pointerup"){const hedef=document.elementFromPoint(e.clientX,e.clientY)?.
closest("[data-bolge], [data-ulke]");secimYap(hedef?{tur:hedef.dataset.bolge?"bolge":"ulke",id:hedef.dataset.bolge??hedef.dataset.ulke}:null)}bas=imler.size?durumAl():null}};svg.addEventListener("poin\
terup",birak),svg.addEventListener("pointercancel",birak),svg.addEventListener("wheel",e=>{if(e.preventDefault(),!g2)return;const r=svg.getBoundingClientRect(),w=Math.max(25,Math.min(veri.tuval[0],g2.
w*Math.exp(e.deltaY*.0015))),h=w*(g2.h/g2.w),wx=g2.x+(e.clientX-r.left)/r.width*g2.w,wy=g2.y+(e.clientY-r.top)/r.height*g2.h;g2={x:wx-(e.clientX-r.left)/r.width*w,y:wy-(e.clientY-r.top)/r.height*h,w,h},
gorunumUygula()},{passive:!1})}let ilk3b=!harita3bOrnek;async function modKur(){const yuk=$("#harita-yukleniyor",kap),iki=$("#harita-2b",kap);if(Gorunum.uc()){yuk.classList.remove("bitti");try{const{THREE,
MapControls,cizici}=await Uc.yukle("42_harita.js");if(kapandi)return;harita3bOrnek&&harita3bOrnek.ayrinti!==veri.ayrinti&&(cizici.birak?.(harita3bOrnek),harita3bOrnek.yokEt?.(),harita3bOrnek=null,ilk3b=
!0),harita3bOrnek||(harita3bOrnek=harita3bKur(THREE,MapControls,cizici,veri),harita3bOrnek.ayrinti=veri.ayrinti);const h=harita3bOrnek;if(h.kapBagla(sahneEl,$("#harita-etiketler",kap)),h.durumYaz(durumNesnesi()),
h.kipAyarla(kip),h.sec(secili?.id??null),h.dinle("secim",s=>secimYap(s)),!cizici.bagla(h,sahneEl))throw new Error("webgl-bagla");ilk3b&&(h.eveDon(),ilk3b=!1),iki.hidden=!0,iki.replaceChildren(),gozlem2b?.
disconnect(),mod="3b",sahneEl.dataset.mod="3b",yuk.classList.add("bitti"),ipucuYaz();return}catch(e){console.warn("3B harita a\xE7\u0131lamad\u0131:",e),kapandi||tost(\u00E7("3B harita bu cihazda a\xE7\u0131l\
amad\u0131; hafif g\xF6r\xFCn\xFCm g\xF6steriliyor."),"layers")}}if(kapandi)return;harita3bOrnek&&Uc.cizici?.birak(harita3bOrnek);const tuval=Uc.cizici?.renderer?.domElement;tuval?.parentElement===sahneEl&&
tuval.remove(),$("#harita-etiketler",kap).replaceChildren(),mod="2b",sahneEl.dataset.mod="2b",iki.hidden=!1,g2??=baslangic2b(),ciz2b(),gozlem2b??=new ResizeObserver(()=>gorunumUygula()),gozlem2b.observe(
iki),yuk.classList.add("bitti"),ipucuYaz()}function ipucuYaz(){$("#harita-ipucu",kap).innerHTML=kip==="kaynak"?`${ikon("wheat")}${\u00E7("Kaynak g\xF6r\xFCn\xFCm\xFC: renk b\xF6lgenin kayna\u011F\u0131 (tah\u0131l, cevher, lif); k\
oyu renk zengin, soluk renk orta ve fakir b\xF6lge. Ayr\u0131nt\u0131 i\xE7in b\xF6lgeye t\u0131kla.")}`:mod==="3b"?`${ikon("mouse-pointer-click")}${\u00E7("S\xFCr\xFCkle: kayd\u0131r \xB7 Sa\u011F t\u0131k: d\xF6nd\xFCr \xB7 Tekerle\
k: yak\u0131nla\u015F \xB7 B\xF6lgeye iki kez t\u0131kla: yak\u0131ndan bak \xB7 Gece ve g\xFCnd\xFCz ger\xE7ek saate g\xF6re")}`:`${ikon("mouse-pointer-click")}${\u00E7("Hafif g\xF6r\xFCn\xFCm \xB7 S\xFCr\xFCkle: kayd\
\u0131r \xB7 Tekerlek ya da iki parmak: yak\u0131nla\u015F")}`;const b=$("#harita-mod",kap);b.setAttribute("aria-label",mod==="3b"?\u00E7("Hafif g\xF6r\xFCn\xFCme (2B) ge\xE7"):\u00E7("3B g\xF6r\xFCn\xFCme ge\xE7")),
b.title=b.getAttribute("aria-label")}let filmSaat=null;const FILM_HIZ=[1,2,4];function filmCiz(zorla=!1){if(!film)return;const an=film.o.an(film.sn),degisti=zorla||an.anahtar!==film.an?.anahtar;film.an=
an,bantYaz(),degisti&&(mod==="3b"?harita3bOrnek?.durumYaz(durumNesnesi()):mod==="2b"&&ciz2b())}function bantYaz(){const el=$("#film-bant",kap);if(!el||!film?.an)return;const a=film.an,bitti=film.sn>=film.
o.uzunluk,tarih=new Date(a.t).toLocaleDateString(DIL.yerel,{day:"numeric",month:"long"});$("#film-tarih",el).textContent=`${\u00E7("{h}. hafta",{h:String(a.hafta)})} \xB7 ${tarih}`;const cubuk=$("#fil\
m-cubuk",el);document.activeElement!==cubuk&&(cubuk.value=String(Math.round(film.sn/film.o.uzunluk*1e3)));const oynat=$("#film-oynat",el);oynat.innerHTML=film.oynuyor?`${ikon("pause")}${\u00E7("Durakl\
at")}`:`${ikon("play")}${bitti?\u00E7("Yeniden oynat"):\u00E7("Oynat")}`,$("#film-hiz",el).textContent=`${film.hiz}\xD7`;const olay=$("#film-olay",el),yazi=bitti?`${ikon("flag")}<span>${esc(HaritaFilm.
ozet(film.fv))}</span>`:a.son?`${ikon(HaritaFilm.ikonu(a.son))}<span>${esc(HaritaFilm.yazi(a.son))}</span>`:`${ikon("map-pin")}<span>${esc(\u00E7("Sezon ba\u015Flad\u0131"))}</span>`;olay.dataset.yazi!==
yazi&&(olay.innerHTML=yazi,olay.dataset.yazi=yazi);const ds=el.dataset,yeni={filmDurum:film.oynuyor?"oynuyor":bitti?"bitti":"durdu",filmHafta:String(a.hafta),filmDegisim:String(a.anahtar.split("|")[0]),
filmSavas:String(a.savaslar.length),filmIgne:String(a.igneler.length)};for(const[k,x]of Object.entries(yeni))ds[k]!==x&&(ds[k]=x)}function bantKur(){const el=$("#film-bant",kap);el.dataset.filmSezon=String(
film.fv.season_no),el.innerHTML=`<div class="film-bas"><span class="film-baslik">${ikon("clapperboard")}<b>${\u00E7("{n}. sezonun tarih filmi",{n:String(film.fv.season_no)})}</b></span>
          <span class="film-tarih" id="film-tarih"></span>
          <button class="kapat" type="button" data-film-kapat aria-label="${\u00E7("Filmi kapat")}">${ikon("x")}</button></div>
        <input type="range" class="film-cubuk" id="film-cubuk" min="0" max="1000" step="1" value="0" aria-label="${\u00E7("Filmin an\u0131")}">
        <div class="film-alt">
          <button class="dugme kucuk-d altin" type="button" id="film-oynat"></button>
          <button class="dugme kucuk-d ikincil" type="button" id="film-bastan" aria-label="${\u00E7("Ba\u015Ftan")}" title="${\u00E7("Ba\u015Ftan")}">${ikon("rotate-ccw")}</button>
          <button class="dugme kucuk-d ikincil" type="button" id="film-hiz" aria-label="${\u00E7("H\u0131z")}" title="${\u00E7("H\u0131z")}">1\xD7</button>
          <span class="film-olay" id="film-olay" aria-live="polite"></span></div>`,el.hidden=!1,$("[data-film-kapat]",el).onclick=()=>filmKapat(),$("#film-oynat",el).onclick=()=>{film.sn>=film.o.uzunluk&&
(film.sn=0),film.oynuyor=!film.oynuyor,filmCiz()},$("#film-bastan",el).onclick=()=>{film.sn=0,film.oynuyor=!0,filmCiz()},$("#film-hiz",el).onclick=()=>{film.hiz=FILM_HIZ[(FILM_HIZ.indexOf(film.hiz)+1)%
FILM_HIZ.length],bantYaz()},$("#film-cubuk",el).oninput=e=>{film.sn=Number(e.target.value)/1e3*film.o.uzunluk,film.oynuyor=!1,filmCiz()}}async function filmBaslat(no=null,hazir=null){let fv=hazir;if(!fv)
try{fv=await Sunucu.cagir("season_film",{p_season:no})}catch(e){tost(hataMetni(e),"circle-alert");return}if(kapandi)return;const eksik=HaritaFilm.ulkeler(fv).filter(u=>!haritaAcilan.has(u)&&!veri.bolgeler.
some(b=>b.ulke===u)&&veriTam.bolgeler.some(b=>b.ulke===u));if(eksik.length&&!hazir){for(const u of eksik)haritaAcilan.add(u);HaritaFilm.bekleyen={no,veri:fv},Kabuk.git("dunya/harita",{gecmis:!1});return}
clearInterval(filmSaat),secimYap(null),film={fv,o:HaritaFilm.kur(fv,harita.sahip),sn:0,oynuyor:!0,hiz:1,an:null},$(".harita-ekran",kap).dataset.film="1",bantKur(),filmCiz(!0);let once=performance.now(),
sonCizim=0;filmSaat=setInterval(()=>{const simdi=performance.now(),dt=Math.min(.5,(simdi-once)/1e3);if(once=simdi,!(!film||document.hidden||!film.oynuyor)){if(film.sn=Math.min(film.o.uzunluk,film.sn+dt*
film.hiz),film.sn>=film.o.uzunluk&&(film.oynuyor=!1),mod==="2b"&&film.oynuyor&&simdi-sonCizim<330){bantYaz();return}sonCizim=simdi,filmCiz()}},100)}function filmKapat(){clearInterval(filmSaat),filmSaat=
null,film=null,delete $(".harita-ekran",kap).dataset.film;const el=$("#film-bant",kap);el.hidden=!0,el.replaceChildren(),mod==="3b"?harita3bOrnek?.durumYaz(durumNesnesi()):mod==="2b"&&ciz2b()}$("#hari\
ta-film-ac",kap).onclick=()=>filmBaslat(null);for(const b of $$("[data-kip]",kap))b.onclick=()=>{kip=b.dataset.kip;for(const x of $$("[data-kip]",kap))x.setAttribute("aria-pressed",String(x===b));mod===
"3b"?harita3bOrnek?.kipAyarla(kip):mod==="2b"&&ciz2b(),ipucuYaz()};for(const b of $$("[data-yakin]",kap))b.onclick=()=>{const k=b.dataset.yakin;if(mod==="3b"&&harita3bOrnek)k==="ev"?harita3bOrnek.eveDon():
harita3bOrnek.yakinlas(k==="yakin"?.6:1.6);else if(mod==="2b")if(k==="ev"){g2=baslangic2b();const kn=bolgeById.get(ch().location);kn?odakla2b(kn.id):gorunumUygula()}else yakinlas2b(k==="yakin"?.65:1.5)};
$("#harita-mod",kap).onclick=()=>Gorunum.ayarla(mod==="3b"?"2b":"3b");const yenile=tazeleyici(async()=>{[harita,yolDurum,isb,trafik]=await Promise.all([Durum.harita(!0),Sunucu.cagir("travel_status").catch(
()=>yolDurum),Sunucu.cagir("coop_map").catch(()=>isb),Sunucu.cagir("world_pulse").catch(()=>trafik)]),harita.server_time&&(saatFarki=Date.parse(harita.server_time)-Date.now()),await Durum.ozet(),!kapandi&&
(mod==="3b"?harita3bOrnek?.durumYaz(durumNesnesi()):mod==="2b"&&ciz2b(),kartCiz(),listeCiz(),canliYaz())});listeCiz(),canliYaz(),await modKur(),filmVeri&&!kapandi&&filmBaslat(filmIstek.no??null,filmVeri);
const birakGorunum=Gorunum.dinle(()=>{kapandi||modKur()}),b1=Durum.dinle("ulke-olay",({olay})=>{/^(country\.war_|seizure\.(struggle|result)|autonomy\.(started|ended|drive_opened|drive_closed|referendum_opened|governor_elected)|occupation\.(started|ended)|resistance\.(opened|vote_closed|closed))/.
test(olay)&&yenile()}),b2=Durum.dinle("olay",({olay})=>{/^travel\.(started|arrived|cancelled)/.test(olay)&&yenile()}),b3=Durum.dinle("diplomasi",({olay})=>{olay==="diplomacy.in_force"&&yenile()}),b5=Durum.
dinle("koalisyon",()=>yenile());let hatSaat=null;const b4=Durum.dinle("hat",({olay})=>{/^coop\.line_(building|built|closed|progress)/.test(olay)&&(clearTimeout(hatSaat),hatSaat=setTimeout(()=>{kapandi||
yenile()},olay==="coop.line_progress"?4e3:300))}),zamanlayici=setInterval(()=>{document.hidden||yenile()},6e4),aracSaat=setInterval(()=>{const y=yolDurum?.travel,el=$("#harita-2b .arac2b",kap);if(mod!==
"2b"||!y||!el||document.hidden)return;const n=aracNoktasi2b(y);if(!n)return;el.dataset.x=n[0].toFixed(1),el.dataset.y=n[1].toFixed(1);const kendi=yolKendiArac2b(y);if((kendi?.tur??"")!==(el.dataset.yolArac??
"")){el.dataset.yolArac=kendi?.tur??"",$(".arac2b-govde",el)?.setAttribute("style",kendi?`fill:${aracRengi(kendi.renk)}`:"");const ik=$(".arac2b-ikon",el);ik&&(ik.setAttribute("style",kendi?`fill:${aracKarsit(
kendi.renk)};stroke:${aracKarsit(kendi.renk)}`:""),ik.innerHTML=aracMini2b(kendi?.tur??""))}gorunumUygula()},5e3),trafikSaat=setInterval(()=>{mod!=="2b"||!trafik2b.length||document.hidden||(trafik2bYerlestir(),
gorunumUygula())},1500);return()=>{kapandi=!0,clearInterval(zamanlayici),clearInterval(aracSaat),clearInterval(trafikSaat),clearInterval(filmSaat),birakGorunum(),b1(),b2(),b3(),b4(),b5(),clearTimeout(
hatSaat),gozlem2b?.disconnect(),harita3bOrnek&&Uc.cizici?.birak(harita3bOrnek)}}}),Parcalar.tamam("ek_42_harita");
