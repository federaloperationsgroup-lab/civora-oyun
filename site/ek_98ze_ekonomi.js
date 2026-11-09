// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_98ze_ekonomi.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("ulke/ekonomi",{async ac(kap){let pano=null,kamu=null,stok=null,lojistik=null,kapandi=!1,ulkeSec=null;try{ulkeSec=sessionStorage.getItem("civora.ekonomi.ulke")||null}catch{}const sahne=EkonomiSahnesi.
ac();sahne.dinle("sec",ad=>{if(ad==="pano"){$("#ekonomi-akis",kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"});return}const rota={pazar:"sehir/pazar",hazine:"ulke/ozet",belediye:"\
sehir/belediye"}[ad];rota&&Kabuk.git(rota)});const vatandaslik=()=>Durum.v.ozet?.character?.citizenship??null;async function yukle(){await Durum.ozet(),lojistik=await Sunucu.cagir("logistics_me").catch(
()=>lojistik),[vatandaslik(),lojistik?.country_id].filter(Boolean).includes(ulkeSec)||(ulkeSec=null);const ulke=ulkeSec??vatandaslik();[pano,kamu,stok]=await Promise.all([Sunucu.cagir("economy_board",
ulke?{p_country:ulke}:{}),Sunucu.cagir("procurement_list",ulke?{p_country:ulke}:{}),ulke===vatandaslik()?Sunucu.cagir("state_stock_status").catch(()=>null):null])}function ulkeSecimi(){const v0=vatandaslik(),
b=lojistik?.country_id;if(!v0||!b||b===v0)return"";const sec=biz(),d=(u,ad)=>`<button class="dugme ${u===sec?"":"ikincil"} kucuk-d" type="button" data-ekonomi-ulke="${esc(u)}" aria-pressed="${u===sec}\
">
        <span class="ulke-nokta" style="background:${ulkeRenk(u)}"></span> ${esc(ad)}</button>`;return`<div class="oneri-dugmeler" style="margin:0 0 14px" role="group" aria-label="${esc(\u00E7("G\xF6ster\
ilen \xFClke"))}">
        ${d(v0,\u00E7("Vatanda\u015F\u0131 oldu\u011Fun \xFClke \xB7 {ulke}",{ulke:ulkeAdi(v0)}))}${d(b,\u00E7("Bulundu\u011Fun \xFClke \xB7 {ulke}",{ulke:ulkeAdi(b)}))}</div>`}const biz=()=>pano?.country_id??
kamu?.country_id,teslimYeriVar=u=>!!kamu?.here||(lojistik?.warehouses??[]).some(w=>w.country_id===u)||(lojistik?.companies??[]).some(c=>c.country_id===u),kural=()=>kamu?.rules?.procurement??{};function akisKarti(){
const deger=(z,k)=>Number(pano?.flows?.[z]?.[k]??0),satirlar=EKONOMI_AKIS.map(([t,ad])=>[ad,deger("day","treasury:"+t),deger("day","municipality:"+t),deger("hour","treasury:"+t)+deger("hour","municipa\
lity:"+t)]).filter(([,h,b,s],i)=>i<3||h||b||s),top=satirlar.reduce((s,x)=>[s[0]+x[1],s[1]+x[2],s[2]+x[3]],[0,0,0]);return`<section class="kart" id="ekonomi-akis">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Vergi ve gelir ak\u0131\u015F\u0131")}</p><h2 class="b2">${\u00E7("Son 24 saat")}</h2></div><span class="ik-kutu">${ikon("receipt-text")}\
</span></div>
        <div class="tablo-kap"><table class="fis-tablo ekonomi-tablo"><thead><tr><th></th><th>${\u00E7("Hazine")}</th><th>${\u00E7("Belediye")}</th><th>${\u00E7("Son saat")}</th></tr></thead><tbody>
          ${satirlar.map(([ad,h,b,s])=>`<tr><td>${esc(ad)}</td><td>${kr(h)}</td><td>${kr(b)}</td><td>${kr(s)}</td></tr>`).join("")}
          <tr class="ara"><td>${\u00E7("Toplam")}</td><td>${kr(top[0])}</td><td>${kr(top[1])}</td><td>${kr(top[2])}</td></tr></tbody></table></div>
        <p class="kucuk" style="margin-top:8px">${\u00E7("Sat\u0131\u015F vergisi bug\xFCn {oran}; pay\u0131n bir k\u0131sm\u0131 ba\u015Fkentin belediyesine gider. Hazinede {h} kr (harcanabilir {s} kr); belediyede {b} kr.",
{oran:ppmYuzde(pano?.sales_tax_ppm??0),h:kr(pano?.treasury_cr??0),s:kr(pano?.treasury_spendable_cr??0),b:kr(pano?.municipality_cr??0)})}</p>
      </section>`}function disTicaretKarti(){const c=pano?.cargo??{},ortaklar=c.partners??[];return`<section class="kart" id="ekonomi-dis">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("D\u0131\u015F ticaret")}</p><h2 class="b2">${\u00E7("Kargolar")}</h2></div><span class="ik-kutu">${ikon("truck")}</span></div>
        <div class="izgara" style="grid-template-columns:1fr 1fr;gap:12px">
          <div class="ekonomi-sayi"><small>${\u00E7("Yolda ithalat")}</small><b>${sayi(c.imports_in_transit??0)}</b><small>${\u00E7("{n} adet mal",{n:sayi(c.imports_qty??0)})}</small></div>
          <div class="ekonomi-sayi"><small>${\u00E7("Yolda ihracat")}</small><b>${sayi(c.exports_in_transit??0)}</b><small>${\u00E7("{n} adet mal",{n:sayi(c.exports_qty??0)})}</small></div>
        </div>
        <p class="kucuk" style="margin-top:10px">${\u00E7("Son 24 saatte varan: {i} ithalat, {e} ihracat kargosu.",{i:sayi(c.imports_day??0),e:sayi(c.exports_day??0)})}</p>
        ${ortaklar.length?`<div class="yigin" style="margin-top:8px">${ortaklar.map(o=>`<div class="ekonomi-ortak"><span class="ulke-nokta" style="background:${ulkeRenk(o.country_id)}"></span>
          <b>${esc(ulkeAdi(o.country_id))}</b><span class="kucuk">${\u00E7("giden {o} \xB7 gelen {i}",{o:sayi(o.out),i:sayi(o.in)})}</span></div>`).join("")}</div>`:""}
        <p class="kucuk" style="margin-top:8px">${\u00E7("Kargolar kimliksiz say\u0131l\u0131r: kimin ne g\xF6nderdi\u011Fi g\xF6r\xFCnmez.")}</p>
      </section>`}function siparisSatiri(p,acik){const kalanKota=Math.max(0,Number(p.quota)-Number(p.mine??0)),dugmeler=[];acik&&teslimYeriVar(p.country_id)&&kalanKota>0&&Number(p.qty_left)>0&&dugmeler.
push(`<button class="dugme altin kucuk-d" data-kamu-teslim="${esc(p.procurement_id)}">${ikon("package")}${\u00E7("Teslim et")}</button>`),dugmeler.push(`<button class="dugme ikincil kucuk-d" data-kamu\
-sira="${esc(p.procurement_id)}">${ikon("scroll-text")}${\u00E7("Teslim s\u0131ras\u0131")}</button>`),acik&&kamu.president&&dugmeler.push(`<button class="dugme sade kucuk-d" data-kamu-iptal="${esc(p.
procurement_id)}">${\u00E7("\u0130ptal et")}</button>`);const durum={open:[\u00E7("A\xE7\u0131k"),"altin"],filled:[\u00E7("Doldu"),"yesil"],cancelled:[\u00E7("\u0130ptal edildi"),"mercan"],expired:[\u00E7(
"S\xFCresi doldu"),""]}[p.status]??[p.status,""];return`<article class="antlasma kamu-siparis" data-kamu="${esc(p.procurement_id)}" data-durum="${esc(p.status)}">
        <div class="antlasma-bas"><span class="liste-ikon"><img src="${varlikResim(p.asset)}" alt="" width="34" height="34"></span>
          <div><span class="tur">${\u00E7("Kamu sipari\u015Fi \xB7 {ad}",{ad:esc(p.created_by??"")})}</span>
            <b>${\u00E7("{n} {urun} \xB7 birimi {kr} kredi",{n:sayi(p.qty_total),urun:esc(varlikAdi(p.asset)),kr:kr(p.unit_price)})}</b>
            <div class="alt">${acik?\u00E7("Teslim i\xE7in son: {zaman}",{zaman:esc(saatYaz(p.closes_at))}):\u00E7("Kapand\u0131: {zaman}",{zaman:esc(saatYaz(p.closed_at))})} \xB7 ${\u00E7("ki\u015Fi ba\u015F\u0131 \
kota {n}",{n:sayi(p.quota)})} \xB7 ${\u00E7("{n} tedarik\xE7i",{n:sayi(p.suppliers)})}</div></div>
          <span class="cip ${durum[1]}">${esc(durum[0])}</span></div>
        <div class="soz-ilerleme"><div class="cubuk"><i style="width:${Math.round(100*Number(p.qty_delivered)/Math.max(1,Number(p.qty_total)))}%"></i></div>
          <span class="kucuk">${\u00E7("{d} / {n} teslim edildi \xB7 kalan b\xFCt\xE7e {kr} kredi",{d:sayi(p.qty_delivered),n:sayi(p.qty_total),kr:kr(p.budget_left_cr)})}${Number(p.mine)>0?" \xB7 "+\u00E7(
"senin teslimin {n}",{n:sayi(p.mine)}):""}</span></div>
        <div class="oneri-dugmeler">${dugmeler.join("")}</div>
      </article>`}function kamuKarti(){const acik=kamu?.open??[],gecmis=kamu?.recent??[],r=kural();return`<section class="kart" id="kamu-siparis">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kamu sipari\u015Fleri")}</p><h2 class="b2">${acik.length?\u00E7("{n} a\xE7\u0131k sipari\u015F",{n:sayi(acik.length)}):\u00E7("A\xE7\u0131k kam\
u sipari\u015Fi yok")}</h2></div>
          ${kamu?.president?`<button class="dugme altin kucuk-d" type="button" id="kamu-yeni">${ikon("plus")}${\u00E7("Yeni kamu sipari\u015Fi")}</button>`:`<span class="ik-kutu">${ikon("landmark")}</\
span>`}</div>
        <p class="kucuk" style="margin:0 0 10px">${\u00E7("Devlet mal\u0131 b\xFCt\xE7esiyle al\u0131r: fiyat kural\u0131n band\u0131nda sabittir ve herkese ayn\u0131d\u0131r. Bir ki\u015Fi bir sipari\u015Fin en \xE7ok {kota} kadar\u0131n\u0131 verir; s\u0131ra il\
k gelen. Vergi ve hizmet bedeli yok; \xF6deme teslimde hazineden ayr\u0131lm\u0131\u015F b\xFCt\xE7eden. Teslim i\xE7in mal\u0131n \xFClkede olmal\u0131: burada bulun ya da buradaki deponda, i\u015Fletmende.",
{kota:ppmYuzde(r.quotaPpm??25e4)})}</p>
        ${!kamu?.here&&acik.length?`<div class="bilgi-kutusu uyari-kutusu" style="margin-bottom:10px">${ikon("map-pin")}<span>${\u00E7("\u015Eu an {ulke} d\u0131\u015F\u0131ndas\u0131n: \xE7antandan teslim i\xE7in \xFClkeye d\xF6n. Orada\
ki deponda ya da i\u015Fletmende mal\u0131n varsa oradan teslim edebilirsin.",{ulke:esc(ulkeAdi(biz()))})}</span></div>`:""}
        ${acik.length?`<div class="yigin">${acik.map(p=>siparisSatiri(p,!0)).join("")}</div>`:`<p class="bos">${kamu?.president?\u00E7("Ba\u015Fkan olarak hazinenin b\xFCt\xE7esiyle mal sipari\u015F edebilirsin; tesl\
im edilen mal kamu sto\u011Funa girer."):\u00E7("Ba\u015Fkan sipari\u015F a\xE7\u0131nca burada g\xF6r\xFCn\xFCr ve bildirim gelir.")}</p>`}
        ${gecmis.length?`<details style="margin-top:10px"><summary>${\u00E7("Kapanan sipari\u015Fler ({n})",{n:sayi(gecmis.length)})}</summary><div class="yigin" style="margin-top:8px">${gecmis.map(p=>siparisSatiri(
p,!1)).join("")}</div></details>`:""}
      </section>`}function stokKarti(){const s=stok;if(!s){const l=pano?.stock??[];return`<section class="kart" id="kamu-stok">
          <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Devlet deposu")} \xB7 ${esc(bolgeAdi(pano?.capital_region_id))}</p><h2 class="b2">${\u00E7("Kamu sto\u011Fu")}</h2></div><span class=\
"ik-kutu">${ikon("warehouse")}</span></div>
          ${l.length?`<div class="yigin">${l.map(g=>`<div class="ilk-adim" data-stok="${esc(g.asset)}"><img src="${varlikResim(g.asset)}" alt="" width="40" height="40" style="border-radius:10px">
            <span><b>${esc(varlikAdi(g.asset))} \xB7 ${sayi(g.qty)}</b></span><span></span></div>`).join("")}</div>`:`<p class="bos">${\u00E7("Kamu sto\u011Fu bo\u015F.")}</p>`}
          <p class="kucuk" style="margin-top:8px">${\u00E7("Kamu sto\u011Fundan yaln\u0131z o \xFClkenin vatanda\u015Flar\u0131, ba\u015Fkentteyken al\u0131r.")}</p>
        </section>`}const mallar=(s?.goods??[]).filter(g=>Number(g.stock)>0);return`<section class="kart" id="kamu-stok">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Devlet deposu")} \xB7 ${esc(bolgeAdi(pano?.capital_region_id))}</p><h2 class="b2">${\u00E7("Kamu sto\u011Fu")}</h2></div><span class="i\
k-kutu">${ikon("warehouse")}</span></div>
        <p class="kucuk" style="margin:0 0 10px">${\u00E7("Kamu sipari\u015Fiyle gelen mal burada. Vatanda\u015Flar ba\u015Fkentteyken sipari\u015Fin fiyat\u0131ndan al\u0131r (en eski sipari\u015Fin mal\u0131 \xF6nce); para hazineye d\xF6ner. Ki\
\u015Fi ba\u015F\u0131 g\xFCnl\xFCk s\u0131n\u0131r maldan mala de\u011Fi\u015Fir.")}</p>
        ${mallar.length?`<div class="yigin">${mallar.map(g=>`<div class="ilk-adim" data-stok="${esc(g.asset)}"><img src="${varlikResim(g.asset)}" alt="" width="40" height="40" style="border-radius:10p\
x">
          <span><b>${esc(varlikAdi(g.asset))} \xB7 ${sayi(g.stock)}</b><span class="kucuk">${\u00E7("birimi {kr} kr'den \xB7 bug\xFCn {n} hakk\u0131n kald\u0131 (g\xFCnde {en})",{kr:kr(g.price),n:sayi(
g.left_today),en:sayi(g.daily_cap)})}</span></span>
          ${s.here&&Number(g.left_today)>0?`<button class="dugme altin kucuk-d" data-stok-al="${esc(g.asset)}">${\u00E7("Al")}</button>`:"<span></span>"}</div>`).join("")}</div>`:`<p class="bos">${\u00E7(
"Kamu sto\u011Fu bo\u015F.")}</p>`}
        ${s&&!s.here&&mallar.length?`<p class="kucuk" style="margin-top:8px">${\u00E7("Almak i\xE7in \xFClkenin ba\u015Fkentinde ({yer}) bulunmal\u0131s\u0131n.",{yer:esc(bolgeAdi(pano?.capital_region_id))})}\
</p>`:""}
      </section>`}function ciz(){kap.innerHTML=`<div class="sayfa">
        <div class="sayfa-bas"><div>${ulkeUst(biz())}<h1 class="b1">${\u00E7("Ekonomi")}</h1>
          <p class="aciklama">${\u00E7("Pazar\u0131n, verginin, hazinenin ve d\u0131\u015F ticaretin ger\xE7ek g\xF6r\xFCnt\xFCs\xFC; kamu sipari\u015Fleri ve devlet deposundaki kamu sto\u011Fu. Kimin ne ald\u0131\u011F\u0131 g\xF6r\xFCnmez.")}\
</p></div></div>
        ${ulkeSecimi()}
        <div id="ekonomi-yer"></div>
        <div class="izgara iki">${akisKarti()}${disTicaretKarti()}</div>
        ${kamuKarti()}
        ${stokKarti()}
      </div>`,$("#ekonomi-yer",kap)?.replaceWith(sahne.el),sahne.yaz(pano),bagla()}async function islem(fn,args,mesaj,ik="landmark"){try{await Sunucu.yap(fn,args),mesaj&&tost(mesaj,ik)}catch(e){tost(hataMetni(
e),"circle-alert")}await tazele()}const siparisBul=id=>[...kamu?.open??[],...kamu?.recent??[]].find(p=>p.procurement_id===id);function bagla(){for(const b of $$("[data-ekonomi-ulke]",kap))b.onclick=()=>{
ulkeSec=b.dataset.ekonomiUlke===vatandaslik()?null:b.dataset.ekonomiUlke;try{ulkeSec?sessionStorage.setItem("civora.ekonomi.ulke",ulkeSec):sessionStorage.removeItem("civora.ekonomi.ulke")}catch{}tazele()};
$("#kamu-yeni",kap)?.addEventListener("click",yeniSiparis);for(const b of $$("[data-kamu-iptal]",kap))b.onclick=()=>{const p=siparisBul(b.dataset.kamuIptal);pencere({ust:\u00E7("Kamu sipari\u015Fi"),baslik:\u00E7(
"Sipari\u015Fi iptal et"),govde:`<p class="aciklama">${\u00E7("Teslim edilmemi\u015F k\u0131sm\u0131n b\xFCt\xE7esi ({kr} kredi) hazineye d\xF6ner; teslim edilen mal kamu sto\u011Funda kal\u0131r. \u0130ptal resm\xEE kayda ge\xE7er.",
{kr:kr(p?.budget_left_cr??0)})}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\u0130ptal et"),sinif:"mercan",ikon:"x",is:()=>islem("procurement_cancel",{p_procurement:b.dataset.kamuIptal},\u00E7(
"Kamu sipari\u015Fi iptal edildi."))}]})};for(const b of $$("[data-kamu-sira]",kap))b.onclick=()=>siraPenceresi(siparisBul(b.dataset.kamuSira));for(const b of $$("[data-kamu-teslim]",kap))b.onclick=()=>teslimPenceresi(
siparisBul(b.dataset.kamuTeslim));for(const b of $$("[data-stok-al]",kap))b.onclick=()=>stokAl((stok?.goods??[]).find(g=>g.asset===b.dataset.stokAl))}async function siraPenceresi(p){if(!p)return;let l=[];
try{l=await Sunucu.cagir("procurement_deliveries",{p_procurement:p.procurement_id})}catch(e){tost(hataMetni(e),"circle-alert");return}pencere({ust:\u00E7("Kamu sipari\u015Fi"),baslik:\u00E7("Teslim s\u0131\
ras\u0131 \xB7 {urun}",{urun:varlikAdi(p.asset)}),govde:l.length?`<p class="kucuk">${\u00E7("Herkese a\xE7\u0131k: kim, nereden, ne kadar, ne zaman. Fiyat herkese ayn\u0131: birimi {kr} kredi.",{kr:kr(
p.unit_price)})}</p>
          <ol class="kamu-sira">${l.map(x=>`<li data-sira="${Number(x.n)}"><b>${esc(x.supplier??"")}</b> <span class="kucuk">${esc(x.source==="company"?\u00E7("i\u015Fletmesinden ({ad})",{ad:x.company??
""}):x.source==="warehouse"?\u00E7("deposundan"):\u00E7("\xE7antas\u0131ndan"))}
            \xB7 ${\u00E7("{n} adet \xB7 {kr} kredi",{n:sayi(x.qty),kr:kr(x.amount)})} \xB7 ${esc(saatYaz(x.at))}</span></li>`).join("")}</ol>`:`<p class="bos">${\u00E7("Hen\xFCz teslim yok.")}</p>`})}
function teslimPenceresi(p){if(!p)return;const kalanKota=Math.max(0,Number(p.quota)-Number(p.mine??0)),enCok=Math.min(kalanKota,Number(p.qty_left)),ulke=p.country_id,kaynaklar=[...kamu?.here?[{deger:"\
bag",ad:\u00E7("\xC7antam ({n} var)",{n:sayi(Durum.stok(p.asset))})}]:[],...(lojistik?.warehouses??[]).filter(w=>w.country_id===ulke).map(w=>({deger:"w:"+w.warehouse_id,ad:\u00E7("{ulke} deposu ({n} v\
ar)",{ulke:ulkeAdi(w.country_id),n:sayi((w.balances??[]).find(x=>x.asset===p.asset)?.spendable??0)})})),...(lojistik?.companies??[]).filter(c=>c.country_id===ulke).map(c=>({deger:"c:"+c.company_id,ad:\u00E7(
"{isletme} ({n} var)",{isletme:c.name,n:sayi((c.balances??[]).find(x=>x.asset===p.asset)?.spendable??0)})}))];pencereForm({ust:\u00E7("Kamu sipari\u015Fi"),baslik:\u00E7("{urun} teslim et",{urun:varlikAdi(
p.asset)}),onayAd:\u00E7("Teslim et"),onayIkon:"package",govde:`<label class="alan"><span>${\u00E7("Nereden")}</span><select name="kaynak">${kaynaklar.map(x=>`<option value="${esc(x.deger)}">${esc(x.ad)}\
</option>`).join("")}</select></label>
          <label class="alan"><span>${\u00E7("Miktar (en \xE7ok {n})",{n:sayi(enCok)})}</span><input name="miktar" inputmode="numeric" value="${enCok}"></label>
          <p class="kucuk" id="kamu-tutar">${\u00E7("\xD6deme: birimi {kr} kredi; vergisiz, \xE7antana.",{kr:kr(p.unit_price)})}</p>`,is:async v=>{const m=adetAl(v.get("miktar"));if(!(m>0))throw new Error(
\u00E7("Miktar\u0131 denetle."));const k=String(v.get("kaynak")),kaynak=k==="bag"?{kind:"bag"}:k.startsWith("w:")?{kind:"warehouse",id:k.slice(2)}:{kind:"company",id:k.slice(2)},r=await Sunucu.yap("pr\
ocurement_deliver",{p_procurement:p.procurement_id,p_qty:m,p_source:kaynak});tost(\u00E7("{n} {urun} teslim ettin; {kr} kredi \xE7antana ge\xE7ti.",{n:sayi(m),urun:varlikAdi(p.asset),kr:kr(r?.amount??
m*p.unit_price)}),"package"),await tazele()}})}function yeniSiparis(){const r=kural(),mallar=Object.keys(r.goods??{});if(!mallar.length)return;const tavan=Math.min(Number(r.maxBudgetCr??0),Math.floor(
Number(kamu?.treasury_spendable_cr??0)*Number(r.budgetSharePpm??5e5)/1e6)),f=pencereForm({ust:\u00E7("Ba\u015Fkan"),baslik:\u00E7("Yeni kamu sipari\u015Fi"),onayAd:\u00E7("Sipari\u015Fi a\xE7"),onayIkon:"\
landmark",govde:`<label class="alan"><span>${\u00E7("Mal")}</span><select name="mal">${mallar.map(a=>`<option value="${esc(a)}">${esc(varlikAdi(a))}</option>`).join("")}</select></label>
          <div class="izgara" style="grid-template-columns:1fr 1fr;gap:12px">
            <label class="alan"><span>${\u00E7("Birim fiyat (kredi)")}</span><input name="fiyat" inputmode="decimal"></label>
            <label class="alan"><span>${\u00E7("Miktar")}</span><input name="miktar" inputmode="numeric" value="20"></label>
            <label class="alan"><span>${\u00E7("S\xFCre (g\xFCn)")}</span><input name="gun" type="number" inputmode="numeric" min="${r.minDays??1}" max="${r.maxDays??7}" value="3"></label>
          </div>
          <p class="kucuk" id="kamu-bant"></p>
          <p class="kucuk" id="kamu-butce"></p>
          <p class="kucuk">${\u00E7("B\xFCt\xE7e hazineden ayr\u0131l\u0131r ve hazinenin harcanabilir paras\u0131n\u0131n yar\u0131s\u0131n\u0131, en \xE7ok {en} krediyi a\u015Famaz (\u015Fu an en \xE7ok {tavan} kredi). \xDClke ba\u015F\u0131na en \xE7ok {n} a\xE7\u0131k sipari\u015F.\
 A\xE7\u0131l\u0131\u015F ve kapan\u0131\u015F resm\xEE kayda ge\xE7er; vatanda\u015Flara bildirim gider.",{en:kr(r.maxBudgetCr??0),tavan:kr(Math.max(0,tavan)),n:sayi(r.maxOpen??5)})}</p>`,is:async v=>{
const[urun,q]=String(v.get("mal")).split("@"),fiyat=krediAlt(v.get("fiyat")),miktar=adetAl(v.get("miktar")),gun=adetAl(v.get("gun"));if(!(fiyat>0)||!(miktar>0)||!(gun>0))throw new Error(\u00E7("Fiyat,\
 miktar ve s\xFCreyi denetle."));await Sunucu.yap("procurement_open",{p_product:urun,p_quality:Number(q),p_qty:miktar,p_unit_price:fiyat,p_days:gun}),tost(\u00E7("Kamu sipari\u015Fi a\xE7\u0131ld\u0131: {n} {urun}.",
{n:sayi(miktar),urun:varlikAdi(`${urun}@${q}`)}),"landmark"),await tazele()}}).form,yaz=malDegisti=>{const d=new FormData(f),g=r.goods[String(d.get("mal"))]??{};malDegisti&&($("input[name=fiyat]",f).value=
krediGirdi(g.minPrice??0));const fiyat=krediAlt(d.get("fiyat")),miktar=adetAl(d.get("miktar"));$("#kamu-bant",f).textContent=\u00E7("Fiyat band\u0131: {min}\u2013{max} kredi; ki\u015Fi ba\u015F\u0131 g\xFCnl\xFCk sat\u0131\u015F s\u0131n\u0131r\u0131 {n}.",
{min:kr(g.minPrice??0),max:kr(g.maxPrice??0),n:sayi(g.dailyCap??0)});const kota=miktar>0?Math.max(1,Math.floor(miktar*Number(r.quotaPpm??25e4)/1e6)):0;$("#kamu-butce",f).textContent=fiyat>0&&miktar>0?
\u00E7("B\xFCt\xE7e {kr} kredi; ki\u015Fi ba\u015F\u0131 kota {k}.",{kr:kr(fiyat*miktar),k:sayi(kota)}):\u00E7("Fiyat ve miktar\u0131 yaz.")};f.addEventListener("change",e=>yaz(e.target.name==="mal")),
f.addEventListener("input",()=>yaz(!1)),yaz(!0)}function stokAl(g){if(!g)return;const enCok=Math.min(Number(g.left_today),Number(g.stock)),p=pencereForm({ust:\u00E7("Devlet deposu"),baslik:\u00E7("{ur\
un} al",{urun:varlikAdi(g.asset)}),onayAd:\u00E7("Sat\u0131n al"),onayIkon:"store",govde:`<label class="alan"><span>${\u00E7("Miktar (en \xE7ok {n})",{n:sayi(enCok)})}</span><input name="miktar" input\
mode="numeric" value="1"></label>
          <p class="kucuk" id="stok-toplam"></p>`,is:async v=>{const m=adetAl(v.get("miktar")),top=m>0?kamuStokToplami(g.lots,m):null;if(!(m>0)||top==null)throw new Error(\u00E7("Miktar\u0131 denetle."));
await Sunucu.yap("state_stock_buy",{p_asset:g.asset,p_qty:m,p_expected_total:top}),tost(\u00E7("Devlet deposundan {n} {urun} ald\u0131n ({kr} kredi).",{n:sayi(m),urun:varlikAdi(g.asset),kr:kr(top)}),"\
store"),await tazele()}}),yaz=()=>{const m=adetAl(new FormData(p.form).get("miktar")),top=m>0?kamuStokToplami(g.lots,m):null;$("#stok-toplam",p.form).textContent=top!=null?\u00E7("Toplam: {kr} kredi (\
para hazineye).",{kr:kr(top)}):\u00E7("Miktar\u0131 denetle.")};p.form.addEventListener("input",yaz),yaz()}const tazele=tazeleyici(async()=>{await yukle(),kapandi||ciz()});await yukle(),ciz();const b1=Durum.
dinle("ulke-olay",({olay})=>{/^procurement\./.test(olay)&&tazele()}),b2=Sunucu.Canli.dinle("public:procurement",(olay,yuk)=>{yuk?.data?.country_id===biz()&&tazele()}),b3=Durum.dinle("olay",({olay})=>{
/^(shipment\.|market\.)/.test(olay)&&tazele()}),zaman=setInterval(async()=>{if(document.visibilityState!=="visible")return;const ulke=biz(),yeni=await Sunucu.cagir("economy_board",ulke?{p_country:ulke}:
{}).catch(()=>null);yeni&&!kapandi&&(pano=yeni,sahne.yaz(pano))},6e4);return()=>{kapandi=!0,b1(),b2(),b3(),clearInterval(zaman),sahne.kapat()}}}),Parcalar.tamam("ek_98ze_ekonomi");
