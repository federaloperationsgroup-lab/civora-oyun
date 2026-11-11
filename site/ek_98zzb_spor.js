// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98zzb_spor.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/spor",{async ac(kap){let v=null,hata=null,kapandi=!1,mesgul=!1,saatFarki=0,gorunus,secilen=null,rekorSekme="sehir";const siralama={country:null,world:null},siralamaHata={country:null,
world:null},salon=SporSalonu.ac(),ben=()=>Durum.v.ozet?.character??{},R=()=>sporKurali()??v?.rule??{},simdi=()=>Date.now()+saatFarki,me=()=>v?.me??{},git=sec=>$(sec,kap)?.scrollIntoView({behavior:hareketAzalt?
"auto":"smooth",block:"start"});salon.dinle("sec",(ad,id)=>{if(ad==="kisi"&&id){profilAc(id);return}if(ad==="alet"){git(me().active?"#spor-antrenman":`#spor-kart-${id}`);return}if(ad==="tablo"){git("#\
spor-rekor");return}if(ad==="aletler"){git("#spor-aletler");return}if(ad==="antrenor"){git("#spor-antrenorler");return}git("#spor-seviye")});const antrenorler=()=>v?.gym?.trainers??[],seciliAntrenor=()=>{
const t=antrenorler().find(x=>x.trainer_id===secilen);return t&&!t.me&&t.here&&Number(t.left)>0?t:null},oranlar=antrenor=>({antrenor,proje:Number(v?.gym?.project_ppm??0),durum:v?.gym?.equipment?Number(
v.gym.equipment.condition_ppm):null});async function yukle(){try{const[x,bak]=await Promise.all([Sunucu.cagir("gym"),gorunus===void 0?Sunucu.cagir("my_look").catch(()=>null):null,Durum.kurallar().catch(
()=>null)]);v=x,gorunus===void 0&&(gorunus=bak?.look??null),saatFarki=v?.server_time?Date.parse(v.server_time)-Date.now():saatFarki,hata=null}catch(e){hata=e}}function sureliHtml(a){const bas=Date.parse(
a.starts_at),son2=Date.parse(a.ends_at),oran=Math.max(0,Math.min(1,(simdi()-bas)/Math.max(1,son2-bas))),kalan=Math.max(0,Math.ceil((son2-simdi())/1e3)),arkadas=(v.gym?.trainees??[]).filter(x=>x.partner&&
!x.me);return`<section class="kart" id="spor-antrenman" data-spor-sure="${esc(a.kind)}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("S\xFCren antrenman\u0131n")} \xB7 ${esc(bolgeAdi(a.region_id))}</p>
          <h2 class="b2">${ikon(sporIkon(a.kind))} ${esc(sporAdi(a.kind))}</h2></div><span class="cip deniz">${\u00E7("S\xFCr\xFCyor")}</span></div>
        <div class="cubuk deniz" style="margin-top:4px"><i id="spor-ilerleme" style="width:${(oran*100).toFixed(1)}%"></i></div>
        <p class="kucuk" style="margin-top:6px"><b id="spor-kalan" data-bitis="${esc(a.ends_at)}">${esc(kalan>0?\u00E7("{sure} kald\u0131",{sure:sporSure(kalan)}):\u00E7("Bitiyor; sonucun birazdan gel\
ir."))}</b>
          \xB7 ${esc(\u00E7("Ba\u015Flang\u0131\xE7ta seviye {s}, form {f}.",{s:sayi(a.level_before),f:sayi(a.form_before)}))}</p>
        ${arkadas.length?`<p class="kucuk">${ikon("users-round")} ${esc(\u00E7("Antrenman arkada\u015F\u0131n: {adlar}. En az {dk} dakika birlikte \xE7al\u0131\u015F\u0131rsan\u0131z ikinize de ek puan ve form.",
{adlar:arkadas.map(x=>x.name??\u00E7("biri")).join(", "),dk:sayi(R().session?.partnerMinMinutes??10)}))}</p>`:`<p class="kucuk">${esc(\u00E7("Salonda ayn\u0131 anda \xE7al\u0131\u015Fan biri olursa (en az {dk} dakika) \
antrenman arkada\u015F\u0131n olur: ikinize de ek puan ve form.",{dk:sayi(R().session?.partnerMinMinutes??10)}))}</p>`}
        ${a.trainer?`<p class="kucuk" data-spor-sure-antrenor>${ikon("whistle")} ${esc(\u00E7("Antren\xF6r\xFCn {ad} yan\u0131nda: puan\u0131n {oran} fazla; \xFCcreti ({kr} kredi) bitince \xF6denir.",
{ad:a.trainer.name??\u00E7("Ad\u0131n\u0131 gizleyen antren\xF6r"),oran:ppmYuzde(R().trainer?.gainPpm??2e5),kr:kr(a.trainer.fee_cr??0)}))}</p>`:""}
        ${Number(a.project_ppm)>0||sporAletDusuk(R(),a.equipment_ppm)?`<p class="kucuk">${esc([Number(a.project_ppm)>0?\u00E7("\u015Eehrin projesiyle puan {oran} fazla.",{oran:ppmYuzde(a.project_ppm)}):
"",sporAletDusuk(R(),a.equipment_ppm)?\u00E7("Y\u0131pranm\u0131\u015F aletlerde ba\u015Flad\u0131: puan {oran} az.",{oran:ppmYuzde(R().equipment?.lowPenaltyPpm??1e5)}):""].filter(Boolean).join(" "))}\
</p>`:""}
        <p class="kucuk">${esc(a.member?\u00E7("\xDCyesin: salonun \xFCcreti yok; erzak bitince d\xFC\u015F\xFCl\xFCr. Bitince sonucun burada ve bildirimde."):\u00E7("\xDCcret ({kr} kredi) ve erzak bitin\
ce d\xFC\u015F\xFCl\xFCr. Bitince sonucun burada ve bildirimde.",{kr:kr(a.fee_cr??0)}))}</p>
        <div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme sade" id="spor-vazgec" ${mesgul?"disabled":""}>${ikon("x")}${\u00E7("Vazge\xE7")}</button></div>
      </section>`}function kartHtml(tur){const r=R(),m=me(),rekor=r.kinds?.[tur]?.record??null,form=Number(m.form??0),seviye=Number(m.level??1),L=Number(r.performance?.luckPpm??5e4),formSonra=Math.min(
Number(r.form?.max??100),form+Number(r.kinds?.[tur]?.formGain??20)),tahmin=rekor?sporDeneme(r,rekor,seviye,form,0):null,a1=rekor?sporDeneme(r,rekor,seviye,form,-L):null,a2=rekor?sporDeneme(r,rekor,seviye,
form,L):null,kisisel=(m.bests??[]).find(b=>b.kind===rekor),acik=!(m.can??null);return`<div class="spor-antrenman-kart${acik?"":" kapali"}" id="spor-kart-${tur}" data-spor-kart="${tur}">
        <div class="spor-kart-bas"><span class="liste-ikon ${tur==="esneklik"?"deniz":"altin"}">${ikon(sporIkon(tur))}</span><b>${esc(sporAdi(tur))}</b></div>
        <p class="kucuk">${esc(SPOR_ACIKLAMA[tur])}</p>
        <p class="kucuk spor-kazanc" data-kazanc="${sporPuanAyar(r,sporPuan(r,form),oranlar(!!seciliAntrenor()))}">${esc(\u00E7("+{p} atletik puan \xB7 form {a} \u2192 {b}",{p:sayi(sporPuanAyar(r,sporPuan(
r,form),oranlar(!!seciliAntrenor()))),a:sayi(form),b:sayi(formSonra)}))}</p>
        ${rekor&&tahmin!=null?`<p class="kucuk spor-tahmin" data-tahmin="${tahmin}">${ikon(SPOR_REKOR_IK[rekor])} ${esc(\u00E7("{rekor} denemesi: tahminen {d} (\u015Fansla {a}\u2013{b})",{rekor:sporRekorAdi(
rekor),d:sporDeger(rekor,tahmin),a:sporDeger(rekor,Math.min(a1,a2)),b:sporDeger(rekor,Math.max(a1,a2))}))}${kisisel?" \xB7 "+esc(\u00E7("ki\u015Fisel rekorun {d}",{d:sporDeger(rekor,kisisel.value)})):
""}</p>`:""}
        <button class="dugme ${acik?"altin":"ikincil"}" data-spor-basla="${tur}" ${!acik||mesgul?"disabled":""}>${ikon("play")}${\u00E7("Ba\u015Fla")}</button>
      </div>`}function antrenmanHtml(){const m=me(),r=R(),a=m.active;if(a)return sureliHtml(a);const fee=Number(r.session?.feeCr??300),hak=Number(r.session?.perDay??2),nereye=v.gym?v.gym.fee_to==="mun\
icipality"?\u00E7("belediye b\xFCt\xE7esine"):\u00E7("\xFClkenin hazinesine"):"",can=m.can??null,t=seciliAntrenor(),dusuk=v.gym?.equipment?.low,proje=Number(v.gym?.project_ppm??0),etkiler=[t?["whistle",
\u00E7("Antren\xF6r\xFCn {ad}: puan {oran} fazla, \xFCcreti {kr} kredi (bitince).",{ad:t.name??\u00E7("Ad\u0131n\u0131 gizleyen antren\xF6r"),oran:ppmYuzde(r.trainer?.gainPpm??2e5),kr:kr(t.fee_cr)}),"\
antrenor"]:null,proje>0?["sparkles",\u00E7("\u015Eehrin Spor salonu projesi: puan {oran} fazla.",{oran:ppmYuzde(proje)}),"proje"]:null,dusuk?["wrench",\u00E7("Aletler y\u0131prand\u0131 (%{n}): puan {oran} az; \
bak\u0131m bekleniyor.",{n:sporAletYuzde(v.gym.equipment.condition_ppm),oran:ppmYuzde(r.equipment?.lowPenaltyPpm??1e5)}),"aletler"]:null].filter(Boolean);return`<section class="kart" id="spor-antrenma\
n">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Antrenman se\xE7")}</p><h2 class="b2">${\u00E7("Bug\xFCn ne \xE7al\u0131\u015Fal\u0131m?")}</h2></div>
          <span class="cip ${Number(m.left_today??0)>0?"yesil":"mercan"}" data-spor-hak="${sayi(m.left_today??0)}">${esc(\u00E7("Hak {n}/{m}",{n:sayi(m.left_today??0),m:sayi(hak)}))}</span></div>
        <p class="kucuk">${esc(m.member?\u00E7("Seans {dk} dakika \xB7 \xFCyesin: \xFCcretsiz \xB7 1 erzak \xB7 g\xFCnde en \xE7ok {n}.",{dk:sayi(r.session?.minutes??20),n:sayi(hak)}):\u00E7("Seans {d\
k} dakika \xB7 \xFCcret {kr} kredi ({nereye}) \xB7 1 erzak \xB7 g\xFCnde en \xE7ok {n}.",{dk:sayi(r.session?.minutes??20),kr:kr(fee),nereye,n:sayi(hak)}))}</p>
        ${etkiler.length?`<div class="liste" id="spor-etkiler" style="margin-top:6px">${etkiler.map(([ik,x,tur])=>`<div class="liste-satir" data-spor-etki="${tur}"><span class="liste-ikon ${tur==="ale\
tler"?"mercan":"deniz"}">${ikon(ik)}</span>
          <div><div class="alt" style="margin:0">${esc(x)}</div></div>${tur==="antrenor"?`<button class="dugme sade kucuk-d" id="spor-antrenor-birak">${ikon("x")}${\u00E7("Antren\xF6rs\xFCz")}</button\
>`:"<span></span>"}</div>`).join("")}</div>`:""}
        ${can?`<div class="bilgi-kutusu uyari-kutusu" id="spor-sart" data-sart="${esc(can)}" style="margin-top:8px">${ikon(can==="GYM_TRAVELING"?"route":can==="GYM_NO_FOOD"?"croissant":can==="GYM_NO_M\
ONEY"?"coins":"hourglass")}<span>${esc(SPOR_SART[can]??"")}
          ${can==="GYM_NO_FOOD"?` <button class="baglanti" type="button" data-git="sehir/pazar">${\u00E7("Pazar")}</button>`:can==="GYM_TRAVELING"?` <button class="baglanti" type="button" data-git="se\
hir/yol">${\u00E7("Seyahat")}</button>`:""}</span></div>`:""}
        <div class="spor-kartlar" style="margin-top:10px">${SPOR_TUR.map(kartHtml).join("")}</div>
        <p class="kucuk" style="margin-top:8px">${esc(\u00E7("\xC7antanda {e} erzak, {k} kredi.",{e:sayi(m.food??0),k:kr(m.credit??0)}))}</p>
      </section>`}function sonucHtml(){const s=me().last;if(!s)return"";const rekor=s.record,satir=[];satir.push(\u00E7("+{p} atletik puan; seviye {a} \u2192 {b}",{p:sayi(s.points??0),a:sayi(s.level_before),
b:sayi(s.level_after??s.level_before)})),s.base_points!=null&&Number(s.base_points)!==Number(s.points)&&satir.push(\u00E7("Ham puan {h}; {neden}.",{h:sayi(s.base_points),neden:[Number(s.trainer?.ppm)>
0?\u00E7("antren\xF6r {oran}",{oran:"+"+ppmYuzde(s.trainer.ppm)}):"",Number(s.project_ppm)>0?\u00E7("proje {oran}",{oran:"+"+ppmYuzde(s.project_ppm)}):"",sporAletDusuk(R(),s.equipment_ppm)?\u00E7("y\u0131p\
ranm\u0131\u015F aletler {oran}",{oran:"\u2212"+ppmYuzde(R().equipment?.lowPenaltyPpm??1e5)}):""].filter(Boolean).join(", ")})),s.trainer&&satir.push(s.trainer.paid?\u00E7("Antren\xF6r\xFCn {ad}: {kr} kredi\
 \xF6dedin.",{ad:s.trainer.name??\u00E7("Ad\u0131n\u0131 gizleyen antren\xF6r"),kr:kr(s.trainer.fee_cr??0)}):Number(s.trainer.fee_cr)>0?\u00E7("Antren\xF6r\xFCn hesab\u0131 kapand\u0131; {kr} kredi \xFCcretin d\xF6nd\xFC.",
{kr:kr(s.trainer.fee_cr)}):\u00E7("Antren\xF6r\xFCn {ad} \xFCcretsiz \xE7al\u0131\u015Ft\u0131rd\u0131.",{ad:s.trainer.name??\u00E7("Ad\u0131n\u0131 gizleyen antren\xF6r")})),satir.push(\u00E7("Form {\
a} \u2192 {b}",{a:sayi(s.form_before),b:sayi(s.form_after??s.form_before)})),rekor&&s.value!=null&&satir.push(\u00E7("{rekor}: {d}",{rekor:sporRekorAdi(rekor),d:sporDeger(rekor,s.value)})+(s.record_taken?
" \xB7 "+\u00E7("\u015Fehrin rekoru art\u0131k senin!"):s.city_record?" \xB7 "+\u00E7("\u015Fehir rekorunu geli\u015Ftirdin"):s.personal_best?" \xB7 "+\u00E7("ki\u015Fisel rekor"):"")),s.partner&&satir.
push(\u00E7("Antrenman arkada\u015F\u0131n: {ad}",{ad:s.partner.name??\u00E7("biri")})),Number(s.relief)>0&&satir.push(\u00E7("Yorgunlu\u011Fun {n} azald\u0131 ({a} \u2192 {b})",{n:sayi(s.relief),a:sayi(
s.fatigue_before??0),b:sayi(s.fatigue_after??0)}));const vucut=sporVucut(s.level_after)>sporVucut(s.level_before);return`<section class="kart" id="spor-sonuc" data-spor-sonuc="${esc(s.session_id)}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(saatYaz(s.closed_at))}</p><h2 class="b2">${ikon(sporIkon(s.kind))} ${esc(\u00E7("Son antrenman\u0131n: {tur}",{tur:sporAdi(s.kind)}))}</h2>\
</div>
          ${s.record_taken?`<span class="cip altin">${ikon("trophy")}${\u00E7("\u015Eehir rekoru")}</span>`:s.personal_best?`<span class="cip yesil">${ikon("medal")}${\u00E7("Ki\u015Fisel rekor")}</sp\
an>`:""}</div>
        <div class="liste">${satir.map(x=>`<div class="liste-satir"><span class="liste-ikon">${ikon("check")}</span><div><div class="alt" style="margin:0">${esc(x)}</div></div><span></span></div>`).join(
"")}</div>
        ${vucut?`<p class="bilgi-kutusu" style="margin-top:8px">${ikon("biceps-flexed")}<span>${esc(\u00E7("V\xFCcudun de\u011Fi\u015Fti ({a} \u2192 {b}. basamak): aynada eski ve yeni h\xE2lin yan yana. Fig\xFCr\xFCn her yerde \
yeni v\xFCcuduyla.",{a:sporVucut(s.level_before),b:sporVucut(s.level_after)}))}</span></p>`:""}
      </section>`}function salondakilerHtml(){const hepsi=(v.gym?.trainees??[]).filter(x=>!x.me),l=[...hepsi.filter(x=>x.partner),...hepsi.filter(x=>!x.partner)].slice(0,30);return v.gym?`<section cla\
ss="kart" id="spor-salondakiler">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(bolgeAdi(v.gym.region_id))}</p><h2 class="b2">${\u00E7("Salonda \u015Fimdi")}</h2></div><span class="ik-kutu">${ikon("users-round")}</span>\
</div>
        ${l.length?`<div class="liste">${l.map(x=>{const kalan=Math.max(0,Math.ceil((Date.parse(x.ends_at)-simdi())/6e4)),ad=x.name??\u00E7("Ad\u0131n\u0131 gizleyen biri"),ic=`<span class="liste-ikon\
 ${x.partner?"deniz":""}">${ikon(sporIkon(x.kind))}</span>
            <div><b>${esc(ad)}</b><div class="alt">${esc(\u00E7("{tur} \xB7 atletik seviye {s} \xB7 {dk} dk kald\u0131",{tur:sporAdi(x.kind),s:sayi(x.level),dk:sayi(kalan)}))}</div></div>
            ${x.partner?`<span class="cip deniz kucuk-cip">${ikon("users-round")}${\u00E7("Antrenman arkada\u015F\u0131n")}</span>`:"<span></span>"}`;return x.character_id?`<button type="button" class\
="liste-satir" data-spor-kisi="${esc(x.character_id)}">${ic}</button>`:`<div class="liste-satir">${ic}</div>`}).join("")}</div>${hepsi.length>l.length?`<p class="kucuk" style="margin-top:8px" data-spo\
r-fazla>${\u00E7("ve {n} ki\u015Fi daha \xE7al\u0131\u015F\u0131yor",{n:sayi(hepsi.length-l.length)})}</p>`:""}`:`<p class="bos">${\u00E7("\u015Eu an salonda ba\u015Fka \xE7al\u0131\u015Fan yok.")}</p\
>`}
      </section>`:""}function uyelikHtml(){const m=me(),r=R(),u=r.membership;if(!u||!v.gym)return"";const uye=m.member,hak=Number(r.session?.perDay??2),gun=Number(u.days??7),nereye=v.gym.fee_to==="mun\
icipality"?\u00E7("belediye b\xFCt\xE7esine"):\u00E7("\xFClkenin hazinesine"),oteki=(m.memberships??[]).filter(x=>x.region_id!==v.gym.region_id),can=m.membership_can??null;return`<section class="kart"\
 id="spor-uyelik" data-uye="${uye?1:0}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Salon \xFCyeli\u011Fi")} \xB7 ${esc(bolgeAdi(v.gym.region_id))}</p>
          <h2 class="b2">${uye?\u00E7("\xDCyesin"):\u00E7("{n} g\xFCnl\xFCk \xFCyelik",{n:sayi(gun)})}</h2></div>${uye?`<span class="cip yesil">${ikon("badge-check")}${\u00E7("\xDCye")}</span>`:`<span\
 class="ik-kutu">${ikon("ticket")}</span>`}</div>
        ${uye?`<p class="kucuk">${esc(\u00E7("\xDCyeli\u011Fin {zaman} itibar\u0131yla biter ({kalan} kald\u0131). Bu salonda seanslar \xFCcretsiz; g\xFCnde en \xE7ok {n} seans yine ge\xE7erli.",{zaman:saatYaz(
uye.ends_at),kalan:sporKalan(uye.ends_at,simdi()),n:sayi(hak)}))}</p>`:`<p class="kucuk">${esc(\u00E7("{g} g\xFCn boyunca bu salonda seanslar \xFCcretsiz. \xDCcret {kr} kredi ({nereye}); g\xFCnde {n} seansla {g} \
g\xFCnde {s} seans (her biri {f} kredi).",{g:sayi(gun),kr:kr(u.feeCr),nereye,n:sayi(hak),s:sayi(hak*gun),f:kr(r.session?.feeCr??300)}))}</p>
          <div class="oneri-dugmeler" style="margin-top:8px"><button class="dugme ${can?"ikincil":"altin"}" id="spor-uye-ol" ${can||mesgul?"disabled":""}>${ikon("ticket")}${\u00E7("\xDCye ol ({kr} kr)",
{kr:kr(u.feeCr)})}</button>
            ${can?`<span class="kucuk" data-spor-uye-sart="${esc(can)}">${esc(sporSart2(can,r))}</span>`:""}</div>`}
        ${oteki.length?`<p class="kucuk" style="margin-top:6px">${esc(\u00E7("\xD6teki \xFCyeliklerin: {liste}.",{liste:oteki.map(x=>\u00E7("{sehir} ({kalan})",{sehir:bolgeAdi(x.region_id),kalan:sporKalan(
x.ends_at,simdi())})).join(", ")}))}</p>`:""}
      </section>`}function antrenorlerHtml(){const r=R(),t=r.trainer;if(!t||!v.gym)return"";const l=antrenorler(),sec=seciliAntrenor();return`<section class="kart" id="spor-antrenorler">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(bolgeAdi(v.gym.region_id))}</p><h2 class="b2">${\u00E7("Ki\u015Fisel antren\xF6rler")}</h2></div><span class="ik-kutu">${ikon("whistle")}</\
span></div>
        <p class="kucuk">${esc(\u00E7("Antren\xF6rle ba\u015Flayan seans\u0131n atletik puan\u0131 {oran} fazla. \xDCcretini seans bitince \xF6dersin (maa\u015F vergisiyle antren\xF6re). Antren\xF6r \u015Fehirde olmal\u0131; g\xFCnde en \xE7ok {n} \xF6\u011Fr\
enci al\u0131r.",{oran:ppmYuzde(t.gainPpm),n:sayi(t.perDay)}))}</p>
        ${l.length?`<div class="liste" style="margin-top:8px">${l.map(x=>{const ad=x.me?\u00E7("Sen"):x.name??\u00E7("Ad\u0131n\u0131 gizleyen antren\xF6r"),durum=x.me?`<span class="cip kucuk-cip">${\u00E7(
"Sensin")}</span>`:x.here?Number(x.left)<=0?`<span class="cip mercan kucuk-cip">${\u00E7("Bug\xFCn dolu")}</span>`:sec?.trainer_id===x.trainer_id?`<button class="dugme deniz kucuk-d" data-spor-antreno\
r-sec="" aria-pressed="true">${ikon("check")}${\u00E7("Antren\xF6r\xFCn")}</button>`:`<button class="dugme ikincil kucuk-d" data-spor-antrenor-sec="${esc(x.trainer_id)}" ${me().active?"disabled":""}>${ikon(
"whistle")}${\u00E7("Se\xE7")}</button>`:`<span class="cip kucuk-cip">${\u00E7("\u015Eehirde de\u011Fil")}</span>`;return`<div class="liste-satir" data-spor-antrenor="${esc(x.trainer_id)}"><span class\
="liste-ikon ${x.here?"deniz":""}">${ikon("whistle")}</span>
            <div><b>${esc(ad)}</b>
              <div class="alt">${esc(\u00E7("atletik seviye {s} \xB7 seans ba\u015F\u0131na {kr} kredi \xB7 bug\xFCn {a}/{b} \xF6\u011Frenci",{s:sayi(x.level),kr:kr(x.fee_cr),a:sayi(x.today),b:sayi(t.
perDay)}))}</div></div>
            ${durum}</div>`}).join("")}</div>`:`<p class="bos">${\u00E7("Bu \u015Fehirde antren\xF6rl\xFCk yapan yok.")}</p>`}
      </section>`}function antrenorlugumHtml(){const m=me(),r=R(),t=r.trainer,b=m.trainer;if(!t||!b&&Number(m.level??1)<Number(t.minLevel))return"";const ogrenciler=b?.students??[],kazanc=ogrenciler.reduce(
(x,y)=>x+Number(y.earned_cr??0),0),form=`<form class="form" id="spor-antrenor-form" novalidate style="margin-top:8px">
          <label class="alan"><span>${\u00E7("Seans ba\u015F\u0131na \xFCcret (kredi; 0\u2013{en})",{en:krediGirdi(t.feeMaxCr)})}</span><input name="ucret" inputmode="decimal" value="${esc(krediGirdi(
b?.fee_cr??t.feeMaxCr))}" aria-label="${\u00E7("Antren\xF6rl\xFCk \xFCcreti")}"></label>
          <div class="satir"><button class="dugme altin" type="submit" ${mesgul||m.trainer_can?"disabled":""}>${ikon("whistle")}${b?\u00E7("\xDCcreti kaydet"):\u00E7("Antren\xF6rl\xFCk a\xE7")}</butto\
n>
            ${b?`<button class="dugme sade" type="button" id="spor-antrenor-kapat" ${mesgul?"disabled":""}>${ikon("x")}${\u00E7("Kapat")}</button>`:""}</div>
          ${m.trainer_can?`<p class="kucuk">${esc(sporSart2(m.trainer_can,r))}</p>`:""}
        </form>`;return`<section class="kart" id="spor-antrenorlugum" data-acik="${b?1:0}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Antren\xF6rl\xFCk")}</p><h2 class="b2">${b?\u00E7("Antren\xF6rl\xFC\u011F\xFCn a\xE7\u0131k"):\u00E7("Antren\xF6r ol")}</h2></div><span\
 class="ik-kutu">${ikon("whistle")}</span></div>
        ${b?`<p class="kucuk">${esc(b.here?\u00E7("{sehir} salonunda, seans ba\u015F\u0131na {kr} kredi. Bug\xFCn {a}/{n} \xF6\u011Frenci; kazanc\u0131n {k} kredi.",{sehir:bolgeAdi(b.region_id),kr:kr(
b.fee_cr),a:sayi(b.today),n:sayi(t.perDay),k:kr(kazanc)}):\u00E7("Antren\xF6rl\xFC\u011F\xFCn {sehir} salonunda; oradayken \xF6\u011Frenci al\u0131rs\u0131n. Bu \u015Fehre ta\u015F\u0131mak i\xE7in \xFCcreti yeniden kaydet.",
{sehir:bolgeAdi(b.region_id)}))}</p>
          ${ogrenciler.length?`<div class="liste" style="margin-top:6px">${ogrenciler.map(x=>`<div class="liste-satir" data-spor-ogrenci="${esc(x.status)}"><span class="liste-ikon">${ikon(sporIkon(x.kind))}\
</span>
            <div><b>${esc(x.name??\u00E7("Ad\u0131n\u0131 gizleyen biri"))}</b>
              <div class="alt">${esc([sporAdi(x.kind),x.status==="active"?\u00E7("s\xFCr\xFCyor"):\u00E7("bitti"),x.paid?\u00E7("kazan\xE7 {kr} kredi",{kr:kr(x.earned_cr??0)}):Number(x.fee_cr)>0?\u00E7(
"\xFCcret bitince"):\u00E7("\xFCcretsiz")].join(" \xB7 "))}</div></div><span></span></div>`).join("")}</div>`:`<p class="kucuk">${\u00E7("Bug\xFCn hen\xFCz \xF6\u011Frencin yok.")}</p>`}`:`<p class="k\
ucuk">${esc(\u00E7("Atletik seviyen {n}: bu \u015Fehirdeki oyuncular seans\u0131n\u0131 seninle ba\u015Flatabilir, puanlar\u0131 {oran} artar. \xDCcreti sen belirlersin; seans bitince maa\u015F vergisiyle sana ge\xE7er. G\xFCnde en \xE7ok {g}\
 \xF6\u011Frenci; kendi seans hakk\u0131n\u0131 yemez.",{n:sayi(m.level),oran:ppmYuzde(t.gainPpm),g:sayi(t.perDay)}))}</p>`}
        ${form}
      </section>`}function aletlerHtml(){const g=v.gym,r=R(),e=g?.equipment;if(!g||!e||!r.equipment)return"";const yuzde=sporAletYuzde(e.condition_ppm),k=g.keeper??{},kim=k.role==="mayor"?k.name?\u00E7(
"belediye ba\u015Fkan\u0131 {ad}",{ad:k.name}):\u00E7("belediye ba\u015Fkan\u0131 (\u015Fu an yok)"):k.name?\u00E7("\xFClkenin ba\u015Fkan\u0131 {ad}",{ad:k.name}):\u00E7("\xFClkenin ba\u015Fkan\u0131 (\u015Fu an yok)");
return`<section class="kart" id="spor-aletler" data-aletler="${yuzde}" data-dusuk="${e.low?1:0}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Salonun aletleri")}</p><h2 class="b2">${esc(\u00E7("Aletler %{n}",{n:yuzde}))}</h2></div>
          ${e.low?`<span class="cip mercan">${ikon("wrench")}${\u00E7("Bak\u0131m gerekli")}</span>`:`<span class="ik-kutu">${ikon("dumbbell")}</span>`}</div>
        <div class="cubuk ${e.low?"mercan":"yesil"}"><i style="width:${yuzde}%"></i></div>
        <p class="kucuk" style="margin-top:6px">${esc(e.low?\u00E7("Aletler y\u0131prand\u0131: %{n} alt\u0131nda ba\u015Flayan seans\u0131n puan\u0131 {oran} az. Bak\u0131m\u0131 {kim} yapt\u0131r\u0131r.",
{n:sporAletYuzde(r.equipment.lowPpm),oran:ppmYuzde(r.equipment.lowPenaltyPpm),kim}):\u00E7("Her biten seansta {a} y\u0131pran\u0131r; %{n} alt\u0131nda seans\u0131n puan\u0131 {oran} az. Bak\u0131m\u0131 {kim} yapt\u0131r\u0131r.",
{a:ppmYuzde(r.equipment.wearPpm),n:sporAletYuzde(r.equipment.lowPpm),oran:ppmYuzde(r.equipment.lowPenaltyPpm),kim}))}</p>
        ${e.last?`<p class="kucuk">${esc(\u00E7("Son bak\u0131m: {zaman}, {ad}.",{zaman:saatYaz(e.last.at),ad:e.last.by??\u00E7("ad\u0131n\u0131 gizleyen biri")}))}</p>`:""}
        <p class="kucuk">${esc(Number(g.project_ppm)>0?\u00E7("\u015Eehrin Spor salonu projesi \xE7al\u0131\u015F\u0131yor: seanslarda puan {oran} fazla.",{oran:ppmYuzde(g.project_ppm)}):g.fee_to==="m\
unicipality"?\u00E7("Belediye Spor salonu projesini kurarsa bu salonda seanslarda puan artar."):\u00E7("\u015Eehrin projeleri ba\u015Fkentte kurulur."))}</p>
        ${k.me?`<div class="oneri-dugmeler" style="margin-top:8px"><button class="dugme ${k.can?"ikincil":"altin"}" id="spor-bakim" ${k.can||mesgul?"disabled":""}>${ikon("wrench")}${k.role==="mayor"?\u00E7(
"Bak\u0131m yapt\u0131r ({kr} kr, b\xFCt\xE7eden)",{kr:kr(r.equipment.maintenanceCr)}):\u00E7("Bak\u0131m yapt\u0131r ({kr} kr, hazineden)",{kr:kr(r.equipment.maintenanceCr)})}</button>
          <span class="kucuk">${esc(k.can?sporSart2(k.can,r):k.role==="mayor"?\u00E7("B\xFCt\xE7ede {kr} kr var.",{kr:kr(k.funds_cr??0)}):\u00E7("Hazinede {kr} kr var.",{kr:kr(k.funds_cr??0)}))}</span\
></div>`:""}
      </section>`}function seviyeHtml(){const m=me(),r=R(),seviye=Number(m.level??1),puan=Number(m.points??0),esik=Number(m.level_points??0),sonraki=m.next,oran=sonraki?Math.max(0,Math.min(1,(puan-esik)/
Math.max(1,Number(sonraki.points)-esik))):1,form=Number(m.form??0),fmax=Number(r.form?.max??100),madalyalar=(Durum.v.kurallar?.data?.medal?.medals??[]).filter(x=>["sporcu","rekortmen","antrenman"].includes(
x.id)),say={sporcu:m.sessions?seviye:0,rekortmen:Number(m.records_taken??0),antrenman:Number(m.sessions??0)},vucut=Number(m.build??0),sonVucut=Math.min(50,(vucut+1)*10);return`<section class="kart" id\
="spor-seviye" data-seviye="${seviye}" data-vucut="${vucut}" data-form="${form}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Sen")}</p><h2 class="b2">${esc(\u00E7("Atletik seviye {n}",{n:sayi(seviye)}))}</h2></div><span class="ik-kutu">${ikon("biceps-flexed")}\
</span></div>
        <div class="spor-vucut" aria-label="${esc(\u00E7("V\xFCcut {n}/5",{n:vucut}))}">${Array.from({length:5},(_,i)=>`<i class="${i<vucut?"dolu":""}"></i>`).join("")}
          <span class="kucuk">${esc(vucut>=5?\u00E7("V\xFCcut 5/5: en g\xFC\xE7l\xFC h\xE2lin."):\u00E7("V\xFCcut {n}/5 \xB7 s\u0131radaki basamak {s}. seviyede",{n:vucut,s:sayi(sonVucut)}))}</span></\
div>
        <p class="kucuk" style="margin-top:10px">${esc(sonraki?\u00E7("{p} atletik puan \xB7 {s}. seviyeye {k} puan",{p:sayi(puan),s:sayi(sonraki.level),k:sayi(sonraki.left)}):\u00E7("{p} atletik puan\
 \xB7 en \xFCst seviye",{p:sayi(puan)}))}</p>
        <div class="cubuk altin"><i style="width:${(oran*100).toFixed(1)}%"></i></div>
        <p class="kucuk" style="margin-top:10px">${ikon("flame")} ${esc(\u00E7("Form {n}/{m}",{n:sayi(form),m:sayi(fmax)}))}
          ${m.form_drops_at&&form>0?" \xB7 "+esc(\u00E7("{zaman} itibar\u0131yla {n} d\xFC\u015Fer (son antrenmandan {s} saat sonra her g\xFCn)",{zaman:saatYaz(m.form_drops_at),n:sayi(r.form?.decayPerDay??
10),s:sayi(r.form?.graceHours??24)})):""}</p>
        <div class="cubuk deniz"><i style="width:${Math.min(100,form/Math.max(1,fmax)*100).toFixed(1)}%"></i></div>
        <div class="etkinlik-sayac" style="margin-top:12px">${[["dumbbell",\u00E7("Antrenman"),m.sessions??0],["users-round",\u00E7("Arkada\u015Fla"),m.partner_sessions??0],["trophy",\u00E7("Al\u0131nan re\
kor"),m.records_taken??0],["sparkles",\u00E7("Bug\xFCn"),m.today??0]].map(([ik,ad,n])=>`<div>${ikon(ik)}<b>${sayi(n)}</b><small>${esc(ad)}</small></div>`).join("")}</div>
        ${madalyalar.length?`<p class="kucuk">${esc(madalyalar.map(x=>{const sira=(x.tiers??[]).find(t=>say[x.id]<t);return sira?\u00E7("{madalya}: s\u0131radaki basama\u011Fa {n}",{madalya:\u00E7v(x.
name),n:sayi(sira-say[x.id])}):\u00E7("{madalya}: b\xFCt\xFCn basamaklar",{madalya:\u00E7v(x.name)})}).join(" \xB7 "))}</p>`:""}
        ${m.mood?`<p class="kucuk">${ikon("face-grinning")} ${esc(\u00E7("Bug\xFCnk\xFC spor keyfi {a} / {b}.",{a:sayi(m.mood.today??0),b:sayi(m.mood.cap??0)}))}</p>`:""}
      </section>`}function faydaHtml(){const m=me(),b=m.benefits??{},r=R(),seviye=Number(m.level??1),xp=Durum.v.kurallar?.data?.progression?.xp?.gymSession,xpCap=Durum.v.kurallar?.data?.progression?.dailyCap?.
gymSession,l=[["briefcase-business",\u00E7("\u0130\u015Flerin {o} k\u0131sa s\xFCrer (her 10 seviyede %1, en \xE7ok %5). \xDCr\xFCn ve \xFCcret de\u011Fi\u015Fmez.",{o:ppmYuzde(b.work_ppm??0)})],["hea\
rt-pulse",\u00E7("Her antrenman yorgunlu\u011Funu {a} azalt\u0131r; esneklikte {b}.",{a:sayi(b.relief?.kuvvet??0),b:sayi(b.relief?.esneklik??0)})],b.race?["footprints",\u00E7("\u015Eehir yar\u0131\u015Flar\u0131nda marat\
onu {a}, bisiklet turunu {b} daha k\u0131sa bitirirsin.",{a:sporSure(b.race.maraton??0),b:sporSure(b.race.bisiklet??0)})]:null,["mic-vocal",\u00E7("Sahnede icra becerine +{n} (dayan\u0131kl\u0131l\u0131k; her 10 sev\
iyede +1).",{n:sayi(b.stage??0)})],xp?["award",\u00E7("Her antrenman +{n} deneyim (g\xFCnde en \xE7ok {m}).",{n:sayi(xp),m:sayi(xpCap??xp*2)})]:null].filter(Boolean);return`<section class="kart" id="s\
por-fayda" data-is="${Number(b.work_ppm??0)}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(\u00E7("Atletik seviye {n}",{n:sayi(seviye)}))}</p><h2 class="b2">${\u00E7("Faydalar\u0131")}</h2></div><span class="ik-kutu">${ikon("spark\
les")}</span></div>
        <div class="liste">${l.map(([ik,x])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(x)}</div></div><span></span></div>`).join(
"")}</div>
        <p class="kucuk" style="margin-top:8px">${esc(\u00E7("Spor sava\u015F g\xFCc\xFC, oy ya da gelir vermez; parayla h\u0131zlanmaz. Atletik seviye d\xFC\u015Fmez; form antrenmans\u0131z ge\xE7en g\xFCnlerde azal\u0131r."))}\
</p>
        <p class="kucuk">${esc(\u00E7("S\u0131radaki e\u015Fik ({s}. seviye): i\u015Flerin {o} k\u0131sa s\xFCrer.",{s:sayi(Math.min(Number(r.level?.max??50),Math.floor(seviye/10)*10+10)),o:ppmYuzde(Math.
min(Number(r.benefits?.workMaxPpm??5e4),(Math.floor(seviye/10)+1)*Number(r.benefits?.workPpmPerTen??1e4)))}))}</p>
      </section>`}function rekorHtml(){const g=v.gym,m=me(),satir=(x,k)=>{const ad=x?x.me?\u00E7("Sen"):x.name??\u00E7("Ad\u0131n\u0131 gizleyen biri"):\u00E7("Hen\xFCz rekor yok."),ic=`<span class="l\
iste-ikon ${x?"altin":""}">${ikon(SPOR_REKOR_IK[k]??etkinlikIkon(k))}</span>
          <div><b>${esc(sporRekorAdi(k))}${x?": "+esc(sporDeger(k,x.value)):""}</b><div class="alt">${esc(x?\u00E7("{ad} \xB7 {zaman}",{ad,zaman:saatYaz(x.at)}):ad)}</div></div><span></span>`;return x?.
character_id&&!x.me?`<button type="button" class="liste-satir" data-spor-rekor="${k}" data-spor-kisi="${esc(x.character_id)}">${ic}</button>`:`<div class="liste-satir" data-spor-rekor="${k}">${ic}</di\
v>`},rek=g?.records??{gym:[],race:[]},bestler=m.bests??[],sekmeler=R().ranking?`<div class="akis-suzgec" role="tablist" style="margin-top:4px">${[["sehir",\u00E7("\u015Eehir"),"building"],["ulke",\u00E7(
"\xDClke"),"flag"],["dunya",\u00E7("D\xFCnya"),"globe"]].map(([id,ad,ik])=>`<button class="altsekme" role="tab" data-spor-rekor-sekme="${id}" aria-pressed="${rekorSekme===id}">${ikon(ik)}${esc(ad)}</b\
utton>`).join("")}</div>`:"";let govde;if(rekorSekme==="sehir"||!R().ranking)govde=g?`<div class="liste">${SPOR_REKORLAR.map(k=>satir(rek.gym.find(x=>x.kind===k),k)).join("")}
          ${(rek.race??[]).map(x=>satir(x,x.kind)).join("")}</div>`:`<p class="bos">${\u00E7("Bir \u015Fehre var\u0131nca o \u015Fehrin rekorlar\u0131n\u0131 g\xF6r\xFCrs\xFCn.")}</p>`;else{const kapsam=rekorSekme===
"ulke"?"country":"world",s=siralama[kapsam];govde=siralamaHata[kapsam]?`<p class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(siralamaHata[kapsam]))}</span></p>`:s?`<p class="kucuk">${esc(
kapsam==="country"?\u00E7("{ulke} salonlar\u0131nda kurulan ki\u015Fisel rekorlar (ilk {n}).",{ulke:ulkeAdi(s.country_id),n:sayi(s.size)}):\u00E7("B\xFCt\xFCn d\xFCnyan\u0131n ki\u015Fisel rekorlar\u0131 (ilk {n}).",
{n:sayi(s.size)}))}</p>
            ${SPOR_REKORLAR.map(k=>{const t=s.kinds?.[k]??{top:[],me:null},benListede=(t.top??[]).some(x=>x.me);return`<p class="ust-yazi" style="margin-top:10px">${ikon(SPOR_REKOR_IK[k])} ${esc(sporRekorAdi(
k))}</p>
                ${(t.top??[]).length?`<div class="liste" data-spor-siralama="${k}">${t.top.map(x=>{const ad=x.me?\u00E7("Sen"):x.name??\u00E7("Bir oyuncu"),ic=`<span class="liste-ikon ${Number(x.rank)<=
3?"altin":""}">${sayi(x.rank)}</span>
                    <div><b>${esc(ad)}</b>
                      <div class="alt">${esc(\u00E7("{deger} \xB7 {sehir}",{deger:sporDeger(k,x.value),sehir:bolgeAdi(x.region_id)}))}</div></div>
                    ${x.me?`<span class="cip altin kucuk-cip">${\u00E7("Sen")}</span>`:"<span></span>"}`;return x.character_id&&!x.me?`<button type="button" class="liste-satir" data-spor-sira="${sayi(
x.rank)}" data-spor-kisi="${esc(x.character_id)}">${ic}</button>`:`<div class="liste-satir${x.me?" ben":""}" data-spor-sira="${sayi(x.rank)}">${ic}</div>`}).join("")}</div>`:`<p class="kucuk">${\u00E7(
"Hen\xFCz rekor yok.")}</p>`}
                ${t.me&&!benListede?`<p class="kucuk" data-spor-sira-ben="${sayi(t.me.rank)}">${esc(\u00E7("Senin s\u0131ran: {n} ({deger}).",{n:sayi(t.me.rank),deger:sporDeger(k,t.me.value)}))}</p>`:
""}`}).join("")}`:`<p class="kucuk" data-spor-siralama-yukleniyor>${\u00E7("S\u0131ralama y\xFCkleniyor\u2026")}</p>`}return`<section class="kart" id="spor-rekor" data-sekme="${rekorSekme}">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(rekorSekme==="sehir"?g?bolgeAdi(g.region_id):\u00E7("Yoldas\u0131n"):rekorSekme==="ulke"?\u00E7("\xDClke s\u0131ralamas\u0131"):\u00E7("D\xFCn\
ya s\u0131ralamas\u0131"))}</p>
          <h2 class="b2">${rekorSekme==="sehir"?\u00E7("\u015Eehrin rekorlar\u0131"):\u00E7("Rekorlar")}</h2></div><span class="ik-kutu">${ikon("trophy")}</span></div>
        ${sekmeler}
        ${govde}
        <p class="ust-yazi" style="margin-top:12px">${\u00E7("Ki\u015Fisel rekorlar\u0131n")}</p>
        ${bestler.length?`<div class="liste">${bestler.map(b=>`<div class="liste-satir" data-spor-kisisel="${esc(b.kind)}"><span class="liste-ikon">${ikon(SPOR_REKOR_IK[b.kind])}</span>
          <div><b>${esc(sporRekorAdi(b.kind))}: ${esc(sporDeger(b.kind,b.value))}</b><div class="alt">${esc(bolgeAdi(b.region_id))} \xB7 ${esc(saatYaz(b.at))}</div></div><span></span></div>`).join("")}\
</div>`:`<p class="kucuk">${\u00E7("Kuvvet, kardiyo ya da boks antrenman\u0131yla ilk rekorunu koy.")}</p>`}
      </section>`}function gecmisHtml(){const l=v.history??[];return`<section class="kart" id="spor-gecmis">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Ge\xE7mi\u015F")}</p><h2 class="b2">${\u00E7("Son antrenmanlar\u0131n")}</h2></div><span class="ik-kutu">${ikon("scroll-text")}</span><\
/div>
        ${l.length?`<div class="liste">${l.map(s=>`<div class="liste-satir" data-spor-gecmis="${esc(s.status)}"><span class="liste-ikon">${ikon(sporIkon(s.kind))}</span>
          <div><b>${esc(sporAdi(s.kind))}</b><div class="alt">${esc([saatYaz(s.starts_at),bolgeAdi(s.region_id),s.status==="cancelled"?\u00E7("vazge\xE7ildi"):\u00E7("+{p} puan",{p:sayi(s.points??0)}),
s.status==="done"&&s.record&&s.value!=null?sporDeger(s.record,s.value)+(s.record_taken?" \xB7 "+\u00E7("\u015Fehir rekoru"):s.personal_best?" \xB7 "+\u00E7("ki\u015Fisel rekor"):""):null,s.partner?\u00E7(
"arkada\u015Fla"):null].filter(Boolean).join(" \xB7 "))}</div></div><span></span></div>`).join("")}</div>`:`<p class="bos">${\u00E7("Hen\xFCz antrenman yapmad\u0131n.")}</p>`}
      </section>`}function kurallarHtml(){const r=R(),s=r.session??{},p=r.points??{},f=r.form??{},maddeler=[["dumbbell",\u00E7("Her \u015Fehrin belediye salonu a\xE7\u0131k; bulundu\u011Fun \u015Fehirde \xE7al\u0131\u015F\u0131rs\u0131n (yoldayke\
n olmaz). Seans {dk} dakika, g\xFCnde en \xE7ok {n}; \xFCcret {kr} kredi ve 1 erzak. Vazge\xE7ersen \xFCcret ve erzak geri d\xF6ner, hak say\u0131lmaz.",{dk:sayi(s.minutes??20),n:sayi(s.perDay??2),kr:kr(
s.feeCr??300)})],["biceps-flexed",\u00E7("Her antrenman {a} atletik puan; form {h} ve \xFCst\xFCndeyse +{b}, {m}\u2013{h2} aras\u0131 +{c}; antrenman arkada\u015F\u0131yla +{d}. Atletik seviye 1\u2013{max} ve d\xFC\u015Fmez; her 10 seviyed\
e v\xFCcudun bir basamak g\xFC\xE7lenir.",{a:sayi(p.base??10),h:sayi(p.formHigh??80),b:sayi(p.formHighBonus??5),m:sayi(p.formMid??50),h2:sayi((p.formHigh??80)-1),c:sayi(p.formMidBonus??3),d:sayi(p.partner??
2),max:sayi(r.level?.max??50)})],["flame",\u00E7("Form 0\u2013{m}: antrenman +{a} (esneklikte +{b}), arkada\u015Fla +{c}. Son antrenmandan {s} saat sonra her g\xFCn {d} d\xFC\u015Fer.",{m:sayi(f.max??
100),a:sayi(r.kinds?.kuvvet?.formGain??20),b:sayi(r.kinds?.esneklik?.formGain??30),c:sayi(f.partner??5),s:sayi(f.graceHours??24),d:sayi(f.decayPerDay??10)})],["trophy",\u00E7("Kuvvet halter, kardiyo 5\
 km ko\u015Fu, boks \u015F\u0131nav rekorunu dener: sonu\xE7 seviyenden, formundan (en d\xFC\u015F\xFCk formda %80) ve k\xFC\xE7\xFCk bir \u015Fanstan (\xB1%5). E\u015Fit sonu\xE7 rekoru k\u0131rmaz. \u015Eehrin rekoru salonun \u015Fehrinde tutulur.")],
["users-round",\u00E7("Antrenman arkada\u015F\u0131: ayn\u0131 salonda en az {dk} dakika ayn\u0131 anda \xE7al\u0131\u015Fan oyuncu; ikinize de ek puan ve form, yak\u0131nl\u0131\u011F\u0131n\u0131z artar.",
{dk:sayi(s.partnerMinMinutes??10)})],["sparkles",\u00E7("Madalyalar: Sporcu (atletik seviye), Rekortmen (ald\u0131\u011F\u0131n \u015Fehir rekoru), Antrenman (seans say\u0131s\u0131). Rekor ve e\u015Fik seviyeler ya\u015Fam g\xFCnl\xFC\u011F\xFCne yaz\u0131l\u0131\
r.")],r.membership?["ticket",\u00E7("\xDCyelik: {g} g\xFCn, {kr} kredi; s\xFCrerken o salonda seanslar \xFCcretsiz (g\xFCnde en \xE7ok {n} yine ge\xE7erli). S\xFCren \xFCyelik bitmeden yenisi al\u0131nmaz.",
{g:sayi(r.membership.days),kr:kr(r.membership.feeCr),n:sayi(s.perDay??2)})]:null,r.trainer?["whistle",\u00E7("Ki\u015Fisel antren\xF6r: atletik seviyesi {s}+ olan, bulundu\u011Fu \u015Fehirde antren\xF6rl\xFCk a\xE7ar (seans ba\
\u015F\u0131na 0\u2013{kr} kredi). Onunla ba\u015Flayan seans\u0131n puan\u0131 {oran} fazla; \xFCcret seans bitince maa\u015F vergisiyle ona ge\xE7er. G\xFCnde en \xE7ok {n} \xF6\u011Frenci; antren\xF6r\xFCn kendi hakk\u0131n\u0131 yemez.",
{s:sayi(r.trainer.minLevel),kr:kr(r.trainer.feeMaxCr),oran:ppmYuzde(r.trainer.gainPpm),n:sayi(r.trainer.perDay)})]:null,r.equipment?["wrench",\u00E7("Aletler her biten seansta {a} y\u0131pran\u0131r; %{n} alt\u0131n\
da ba\u015Flayan seans\u0131n puan\u0131 {oran} az. Bak\u0131m ({kr} kredi) ba\u015Fkentte belediye ba\u015Fkan\u0131 b\xFCt\xE7eden, ba\u015Fka \u015Fehirde \xFClkenin ba\u015Fkan\u0131 hazineden yapt\u0131r\u0131r: aletler %100.",
{a:ppmYuzde(r.equipment.wearPpm),n:sporAletYuzde(r.equipment.lowPpm),oran:ppmYuzde(r.equipment.lowPenaltyPpm),kr:kr(r.equipment.maintenanceCr)})]:null,r.ranking?["globe",\u00E7('Rekorlarda \xFClke ve d\xFCn\
ya s\u0131ralamas\u0131: ki\u015Fisel rekorlardan, rekor t\xFCr\xFC ba\u015F\u0131na ilk {n}; ad\u0131n\u0131 yerlerde gizleyen "bir oyuncu".',{n:sayi(r.ranking.size)})]:null].filter(Boolean);return`<\
section class="kart" id="spor-kurallar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kurallar")}</p><h2 class="b2">${\u00E7("Salon nas\u0131l i\u015Fler?")}</h2></div><span class="ik-kutu"\
>${ikon("book-open")}</span></div>
        <div class="liste">${maddeler.map(([ik,x])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(x)}</div></div><span></span></div>`).
join("")}</div>
      </section>`}function ciz(){if(kapandi)return;if(hata&&!v){kap.innerHTML=`<div class="sayfa"><div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(hata))}</span></div>
          <button class="dugme ikincil" style="margin-top:14px" id="spor-yeniden">${\u00E7("Yeniden dene")}</button></div>`,$("#spor-yeniden",kap).onclick=()=>tazele();return}const burada=!!v.gym;kap.
innerHTML=`<div class="sayfa" data-spor-bolge="${esc(v.gym?.region_id??"")}">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${esc(burada?\u00E7("{sehir} spor salonu",{sehir:bolgeAdi(v.gym.region_id)}):\u00E7("Spor salonu"))}<\
/h1>
          <p class="aciklama">${\u00E7("Kuvvet, kardiyo, boks ve esneklik. Atletik seviyen y\xFCkseldik\xE7e v\xFCcudun g\xFC\xE7lenir, i\u015Flerin k\u0131sal\u0131r, yar\u0131\u015Flarda h\u0131zlan\u0131rs\u0131n.")}\
</p></div>
          <div class="oneri-dugmeler">${kareSahneDugmeHtml("gym",v.gym?.region_id)}<span class="cip ${burada?"yesil":""}" id="spor-burada">${ikon("map-pin")}${esc(burada?\u00E7("\u015Eehirdesin"):\u00E7(
"Yoldas\u0131n"))}</span></div></div>
        <div id="spor-salon-yer"></div>
        <div class="izgara iki spor-izgara" style="margin-top:20px">
          <div class="yigin">${antrenmanHtml()}${sonucHtml()}${uyelikHtml()}${antrenorlerHtml()}${salondakilerHtml()}</div>
          <div class="yigin">${seviyeHtml()}${aletlerHtml()}${antrenorlugumHtml()}${faydaHtml()}${rekorHtml()}${gecmisHtml()}${kurallarHtml()}</div>
        </div></div>`,$("#spor-salon-yer",kap)?.replaceWith(salon.el),salon.yaz({v,ben:{id:ben().id,ad:ben().name,gorunus,ulke:ben().citizenship},saatFarki}),bagla()}async function isle(fn,basari){if(!mesgul){
mesgul=!0;try{const y=await fn();if(kapandi)return;basari?.(y),Durum.ozet().catch(()=>{}),await yukle()}catch(e){tost(hataMetni(e),"circle-alert"),await yukle().catch(()=>{})}finally{mesgul=!1,kapandi||
ciz()}}}function bagla(){for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-spor-kisi]",kap))b.onclick=()=>profilAc(b.dataset.sporKisi);for(const b of $$(
"[data-spor-basla]",kap))b.onclick=()=>{const tur=b.dataset.sporBasla,t=seciliAntrenor();isle(()=>Sunucu.yap("gym_start",t?{p_kind:tur,p_trainer:t.trainer_id}:{p_kind:tur}),()=>{tost(t?\u00E7("{tur} a\
ntrenman\u0131 antren\xF6r\xFCnle ba\u015Flad\u0131: {dk} dakika.",{tur:sporAdi(tur),dk:sayi(R().session?.minutes??20)}):\u00E7("{tur} antrenman\u0131 ba\u015Flad\u0131: {dk} dakika. Salonda aletinin ba\u015F\u0131ndas\u0131n.",
{tur:sporAdi(tur),dk:sayi(R().session?.minutes??20)}),sporIkon(tur)),secilen=null,salon.oyna("basla")})};for(const b of $$("[data-spor-antrenor-sec]",kap))b.onclick=()=>{secilen=b.dataset.sporAntrenorSec||
null,ciz(),secilen&&(git("#spor-antrenman"),tost(\u00E7("Antren\xF6r\xFCn se\xE7ildi; antrenman\u0131 ba\u015Flat\u0131nca yan\u0131nda olur."),"whistle"))};const ab=$("#spor-antrenor-birak",kap);ab&&
(ab.onclick=()=>{secilen=null,ciz()});const uo=$("#spor-uye-ol",kap);uo&&(uo.onclick=()=>{const u=R().membership;pencere({ust:\u00E7("Salon \xFCyeli\u011Fi"),baslik:\u00E7("{n} g\xFCnl\xFCk \xFCyelik",
{n:sayi(u?.days??7)}),govde:`<p class="aciklama">${esc(\u00E7("{kr} kredi \xF6dersin; {g} g\xFCn boyunca {sehir} salonunda seanslar \xFCcretsiz. Ba\u015Fka \u015Fehirlerin salonunda ge\xE7mez.",{kr:kr(
u?.feeCr??0),g:sayi(u?.days??7),sehir:bolgeAdi(v.gym?.region_id)}))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("\xDCye ol"),sinif:"altin",ikon:"ticket",is:()=>isle(()=>Sunucu.yap("gym_members\
hip_buy",{}),y=>tost(\u00E7("\xDCyesin: {zaman} itibar\u0131yla biter; seanslar \xFCcretsiz.",{zaman:saatYaz(y?.membership?.ends_at??Date.now())}),"ticket"))}]})});const af=$("#spor-antrenor-form",kap);
af&&(af.onsubmit=e=>{e.preventDefault();const ucret=krediAlt(new FormData(af).get("ucret")),en=Number(R().trainer?.feeMaxCr??200);if(!Number.isFinite(ucret)||ucret<0||ucret>en){tost(\u00E7("\xDCcret 0 il\
e {en} kredi aras\u0131nda olmal\u0131.",{en:kr(en)}),"circle-alert");return}isle(()=>Sunucu.yap("gym_trainer_open",{p_fee:ucret}),()=>tost(\u00E7("Antren\xF6rl\xFC\u011F\xFCn a\xE7\u0131k: seans ba\u015F\u0131na {kr} kredi.",
{kr:kr(ucret)}),"whistle"))});const ak=$("#spor-antrenor-kapat",kap);ak&&(ak.onclick=()=>pencere({ust:\u00E7("Antren\xF6rl\xFCk"),baslik:\u00E7("Antren\xF6rl\xFC\u011F\xFC kapat"),govde:`<p class="aci\
klama">${esc(\u00E7("Yeni \xF6\u011Frenci almazs\u0131n. S\xFCren \xF6\u011Frenci seanslar\u0131 s\xFCrer; \xFCcretleri bitince sana ge\xE7er."))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("K\
apat"),sinif:"mercan",ikon:"x",is:()=>isle(()=>Sunucu.yap("gym_trainer_close",{}),()=>tost(\u00E7("Antren\xF6rl\xFC\u011F\xFCn kapand\u0131."),"whistle"))}]}));const bk=$("#spor-bakim",kap);bk&&(bk.onclick=
()=>{const e=R().equipment,k=v.gym?.keeper??{};pencere({ust:\u00E7("Salonun aletleri"),baslik:\u00E7("Bak\u0131m yapt\u0131r"),govde:`<p class="aciklama">${esc(k.role==="mayor"?\u00E7("{kr} kredi bele\
diye b\xFCt\xE7esinden harcan\u0131r (belediye defterine yaz\u0131l\u0131r); aletler %100 olur.",{kr:kr(e?.maintenanceCr??0)}):\u00E7("{kr} kredi \xFClkenin hazinesinden harcan\u0131r; aletler %100 olur.",
{kr:kr(e?.maintenanceCr??0)}))}</p>`,dugmeler:[{ad:\u00E7("Vazge\xE7")},{ad:\u00E7("Bak\u0131m yapt\u0131r"),sinif:"altin",ikon:"wrench",is:()=>isle(()=>Sunucu.yap("gym_maintain",{p_region:v.gym?.region_id}),
()=>tost(\u00E7("Aletlerin bak\u0131m\u0131 yap\u0131ld\u0131: %100."),"wrench"))}]})});for(const b of $$("[data-spor-rekor-sekme]",kap))b.onclick=()=>{rekorSekme=b.dataset.sporRekorSekme;const kapsam=rekorSekme===
"ulke"?"country":rekorSekme==="dunya"?"world":null;ciz(),kapsam&&siralamaYukle(kapsam)};const vz=$("#spor-vazgec",kap);vz&&(vz.onclick=()=>{const a=me().active;a&&pencere({ust:sporAdi(a.kind),baslik:\u00E7(
"Antrenmandan vazge\xE7"),govde:`<p class="aciklama">${esc(\u00E7("\xDCcret ve erzak geri d\xF6ner; bug\xFCnk\xFC hakk\u0131ndan say\u0131lmaz. Bu seanstan puan ve rekor gelmez."))}</p>`,dugmeler:[{ad:\u00E7(
"Devam et")},{ad:\u00E7("Vazge\xE7"),sinif:"mercan",ikon:"x",is:()=>isle(()=>Sunucu.yap("gym_cancel",{}),y=>tost(y?.closed?.status==="done"?\u00E7("Antrenman\u0131n zaten bitmi\u015Fti; sonucun a\u015Fa\u011F\u0131da."):
\u00E7("Antrenmandan vazge\xE7tin; \xFCcret ve erzak geri d\xF6nd\xFC."),"x"))}]})})}function sayacYaz(){const el=$("#spor-kalan",kap),a=me().active;if(!el||!a)return;const bas=Date.parse(a.starts_at),
son2=Date.parse(a.ends_at),kalan=Math.max(0,Math.ceil((son2-simdi())/1e3));el.textContent=kalan>0?\u00E7("{sure} kald\u0131",{sure:sporSure(kalan)}):\u00E7("Bitiyor; sonucun birazdan gelir.");const i=$(
"#spor-ilerleme",kap);i&&(i.style.width=`${(Math.max(0,Math.min(1,(simdi()-bas)/Math.max(1,son2-bas)))*100).toFixed(1)}%`)}async function siralamaYukle(kapsam){try{siralama[kapsam]=await Sunucu.cagir(
"gym_ranking",{p_scope:kapsam}),siralamaHata[kapsam]=null}catch(e){siralamaHata[kapsam]=e}!kapandi&&!mesgul&&!document.querySelector(".perde")&&(rekorSekme==="ulke"?"country":rekorSekme==="dunya"?"wor\
ld":null)===kapsam&&ciz()}const tazele=tazeleyici(async()=>{await yukle();const kapsam=rekorSekme==="ulke"?"country":rekorSekme==="dunya"?"world":null;kapsam&&await siralamaYukle(kapsam).catch(()=>{}),
!kapandi&&!mesgul&&!document.querySelector(".perde")&&ciz()});if(await yukle(),!kap.isConnected)return salon.kapat(),()=>{};ciz();const b1=Durum.dinle("olay",({olay,yuk})=>{/^gym\./.test(olay)&&tazele().
then(()=>{olay==="gym.completed"&&!kapandi&&salon.oyna(yuk?.data?.record_taken||yuk?.data?.city_record?"rekor":"bitti")})});let son=Date.now();const saat=setInterval(()=>{if(kapandi||document.hidden)return;
sayacYaz();const a=me().active,bitti=a&&Date.parse(a.ends_at)<=simdi();Date.now()-son>=(bitti?1e4:3e4)&&(son=Date.now(),tazele())},1e3);return()=>{kapandi=!0,b1(),clearInterval(saat),salon.kapat()}}}),
Parcalar.tamam("ek_98zzb_spor");
