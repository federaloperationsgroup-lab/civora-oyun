// Civora istemcisi 2026-11-09-22f8ad98-68be21e (ek_98zzb_spor.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("sehir/spor",{async ac(kap){let v=null,hata=null,kapandi=!1,mesgul=!1,saatFarki=0,gorunus;const salon=SporSalonu.ac(),ben=()=>Durum.v.ozet?.character??{},R=()=>sporKurali()??v?.rule??{},simdi=()=>Date.
now()+saatFarki,me=()=>v?.me??{},git=sec=>$(sec,kap)?.scrollIntoView({behavior:hareketAzalt?"auto":"smooth",block:"start"});salon.dinle("sec",(ad,id)=>{if(ad==="kisi"&&id){profilAc(id);return}if(ad===
"alet"){git(me().active?"#spor-antrenman":`#spor-kart-${id}`);return}if(ad==="tablo"){git("#spor-rekor");return}git("#spor-seviye")});async function yukle(){try{const[x,bak]=await Promise.all([Sunucu.
cagir("gym"),gorunus===void 0?Sunucu.cagir("my_look").catch(()=>null):null,Durum.kurallar().catch(()=>null)]);v=x,gorunus===void 0&&(gorunus=bak?.look??null),saatFarki=v?.server_time?Date.parse(v.server_time)-
Date.now():saatFarki,hata=null}catch(e){hata=e}}function sureliHtml(a){const bas=Date.parse(a.starts_at),son2=Date.parse(a.ends_at),oran=Math.max(0,Math.min(1,(simdi()-bas)/Math.max(1,son2-bas))),kalan=Math.
max(0,Math.ceil((son2-simdi())/1e3)),arkadas=(v.gym?.trainees??[]).filter(x=>x.partner&&!x.me);return`<section class="kart" id="spor-antrenman" data-spor-sure="${esc(a.kind)}">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("S\xFCren antrenman\u0131n")} \xB7 ${esc(bolgeAdi(a.region_id))}</p>
          <h2 class="b2">${ikon(sporIkon(a.kind))} ${esc(sporAdi(a.kind))}</h2></div><span class="cip deniz">${\u00E7("S\xFCr\xFCyor")}</span></div>
        <div class="cubuk deniz" style="margin-top:4px"><i id="spor-ilerleme" style="width:${(oran*100).toFixed(1)}%"></i></div>
        <p class="kucuk" style="margin-top:6px"><b id="spor-kalan" data-bitis="${esc(a.ends_at)}">${esc(kalan>0?\u00E7("{sure} kald\u0131",{sure:sporSure(kalan)}):\u00E7("Bitiyor; sonucun birazdan gel\
ir."))}</b>
          \xB7 ${esc(\u00E7("Ba\u015Flang\u0131\xE7ta seviye {s}, form {f}.",{s:sayi(a.level_before),f:sayi(a.form_before)}))}</p>
        ${arkadas.length?`<p class="kucuk">${ikon("users-round")} ${esc(\u00E7("Antrenman arkada\u015F\u0131n: {adlar}. En az {dk} dakika birlikte \xE7al\u0131\u015F\u0131rsan\u0131z ikinize de ek puan ve form.",
{adlar:arkadas.map(x=>x.name??\u00E7("biri")).join(", "),dk:sayi(R().session?.partnerMinMinutes??10)}))}</p>`:`<p class="kucuk">${esc(\u00E7("Salonda ayn\u0131 anda \xE7al\u0131\u015Fan biri olursa (en az {dk} dakika) \
antrenman arkada\u015F\u0131n olur: ikinize de ek puan ve form.",{dk:sayi(R().session?.partnerMinMinutes??10)}))}</p>`}
        <p class="kucuk">${esc(\u00E7("\xDCcret ({kr} kredi) ve erzak bitince d\xFC\u015F\xFCl\xFCr. Bitince sonucun burada ve bildirimde.",{kr:kr(a.fee_cr??0)}))}</p>
        <div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme sade" id="spor-vazgec" ${mesgul?"disabled":""}>${ikon("x")}${\u00E7("Vazge\xE7")}</button></div>
      </section>`}function kartHtml(tur){const r=R(),m=me(),rekor=r.kinds?.[tur]?.record??null,form=Number(m.form??0),seviye=Number(m.level??1),L=Number(r.performance?.luckPpm??5e4),formSonra=Math.min(
Number(r.form?.max??100),form+Number(r.kinds?.[tur]?.formGain??20)),tahmin=rekor?sporDeneme(r,rekor,seviye,form,0):null,a1=rekor?sporDeneme(r,rekor,seviye,form,-L):null,a2=rekor?sporDeneme(r,rekor,seviye,
form,L):null,kisisel=(m.bests??[]).find(b=>b.kind===rekor),acik=!(m.can??null);return`<div class="spor-antrenman-kart${acik?"":" kapali"}" id="spor-kart-${tur}" data-spor-kart="${tur}">
        <div class="spor-kart-bas"><span class="liste-ikon ${tur==="esneklik"?"deniz":"altin"}">${ikon(sporIkon(tur))}</span><b>${esc(sporAdi(tur))}</b></div>
        <p class="kucuk">${esc(SPOR_ACIKLAMA[tur])}</p>
        <p class="kucuk spor-kazanc">${esc(\u00E7("+{p} atletik puan \xB7 form {a} \u2192 {b}",{p:sayi(sporPuan(r,form)),a:sayi(form),b:sayi(formSonra)}))}</p>
        ${rekor&&tahmin!=null?`<p class="kucuk spor-tahmin" data-tahmin="${tahmin}">${ikon(SPOR_REKOR_IK[rekor])} ${esc(\u00E7("{rekor} denemesi: tahminen {d} (\u015Fansla {a}\u2013{b})",{rekor:sporRekorAdi(
rekor),d:sporDeger(rekor,tahmin),a:sporDeger(rekor,Math.min(a1,a2)),b:sporDeger(rekor,Math.max(a1,a2))}))}${kisisel?" \xB7 "+esc(\u00E7("ki\u015Fisel rekorun {d}",{d:sporDeger(rekor,kisisel.value)})):
""}</p>`:""}
        <button class="dugme ${acik?"altin":"ikincil"}" data-spor-basla="${tur}" ${!acik||mesgul?"disabled":""}>${ikon("play")}${\u00E7("Ba\u015Fla")}</button>
      </div>`}function antrenmanHtml(){const m=me(),r=R(),a=m.active;if(a)return sureliHtml(a);const fee=Number(r.session?.feeCr??300),hak=Number(r.session?.perDay??2),nereye=v.gym?v.gym.fee_to==="mun\
icipality"?\u00E7("belediye b\xFCt\xE7esine"):\u00E7("\xFClkenin hazinesine"):"",can=m.can??null;return`<section class="kart" id="spor-antrenman">
        <div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Antrenman se\xE7")}</p><h2 class="b2">${\u00E7("Bug\xFCn ne \xE7al\u0131\u015Fal\u0131m?")}</h2></div>
          <span class="cip ${Number(m.left_today??0)>0?"yesil":"mercan"}" data-spor-hak="${sayi(m.left_today??0)}">${esc(\u00E7("Hak {n}/{m}",{n:sayi(m.left_today??0),m:sayi(hak)}))}</span></div>
        <p class="kucuk">${esc(\u00E7("Seans {dk} dakika \xB7 \xFCcret {kr} kredi ({nereye}) \xB7 1 erzak \xB7 g\xFCnde en \xE7ok {n}.",{dk:sayi(r.session?.minutes??20),kr:kr(fee),nereye,n:sayi(hak)}))}\
</p>
        ${can?`<div class="bilgi-kutusu uyari-kutusu" id="spor-sart" data-sart="${esc(can)}" style="margin-top:8px">${ikon(can==="GYM_TRAVELING"?"route":can==="GYM_NO_FOOD"?"croissant":can==="GYM_NO_M\
ONEY"?"coins":"hourglass")}<span>${esc(SPOR_SART[can]??"")}
          ${can==="GYM_NO_FOOD"?` <button class="baglanti" type="button" data-git="sehir/pazar">${\u00E7("Pazar")}</button>`:can==="GYM_TRAVELING"?` <button class="baglanti" type="button" data-git="se\
hir/yol">${\u00E7("Seyahat")}</button>`:""}</span></div>`:""}
        <div class="spor-kartlar" style="margin-top:10px">${SPOR_TUR.map(kartHtml).join("")}</div>
        <p class="kucuk" style="margin-top:8px">${esc(\u00E7("\xC7antanda {e} erzak, {k} kredi.",{e:sayi(m.food??0),k:kr(m.credit??0)}))}</p>
      </section>`}function sonucHtml(){const s=me().last;if(!s)return"";const rekor=s.record,satir=[];satir.push(\u00E7("+{p} atletik puan; seviye {a} \u2192 {b}",{p:sayi(s.points??0),a:sayi(s.level_before),
b:sayi(s.level_after??s.level_before)})),satir.push(\u00E7("Form {a} \u2192 {b}",{a:sayi(s.form_before),b:sayi(s.form_after??s.form_before)})),rekor&&s.value!=null&&satir.push(\u00E7("{rekor}: {d}",{rekor:sporRekorAdi(
rekor),d:sporDeger(rekor,s.value)})+(s.record_taken?" \xB7 "+\u00E7("\u015Fehrin rekoru art\u0131k senin!"):s.city_record?" \xB7 "+\u00E7("\u015Fehir rekorunu geli\u015Ftirdin"):s.personal_best?" \xB7 "+
\u00E7("ki\u015Fisel rekor"):"")),s.partner&&satir.push(\u00E7("Antrenman arkada\u015F\u0131n: {ad}",{ad:s.partner.name??\u00E7("biri")})),Number(s.relief)>0&&satir.push(\u00E7("Yorgunlu\u011Fun {n} azald\u0131\
 ({a} \u2192 {b})",{n:sayi(s.relief),a:sayi(s.fatigue_before??0),b:sayi(s.fatigue_after??0)}));const vucut=sporVucut(s.level_after)>sporVucut(s.level_before);return`<section class="kart" id="spor-sonu\
c" data-spor-sonuc="${esc(s.session_id)}">
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
      </section>`:""}function seviyeHtml(){const m=me(),r=R(),seviye=Number(m.level??1),puan=Number(m.points??0),esik=Number(m.level_points??0),sonraki=m.next,oran=sonraki?Math.max(0,Math.min(1,(puan-
esik)/Math.max(1,Number(sonraki.points)-esik))):1,form=Number(m.form??0),fmax=Number(r.form?.max??100),madalyalar=(Durum.v.kurallar?.data?.medal?.medals??[]).filter(x=>["sporcu","rekortmen","antrenman"].
includes(x.id)),say={sporcu:m.sessions?seviye:0,rekortmen:Number(m.records_taken??0),antrenman:Number(m.sessions??0)},vucut=Number(m.build??0),sonVucut=Math.min(50,(vucut+1)*10);return`<section class=\
"kart" id="spor-seviye" data-seviye="${seviye}" data-vucut="${vucut}" data-form="${form}">
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
v>`},rek=g?.records??{gym:[],race:[]},bestler=m.bests??[];return`<section class="kart" id="spor-rekor">
        <div class="kart-bas"><div><p class="ust-yazi">${esc(g?bolgeAdi(g.region_id):\u00E7("Yoldas\u0131n"))}</p><h2 class="b2">${\u00E7("\u015Eehrin rekorlar\u0131")}</h2></div><span class="ik-kutu"\
>${ikon("trophy")}</span></div>
        ${g?`<div class="liste">${SPOR_REKORLAR.map(k=>satir(rek.gym.find(x=>x.kind===k),k)).join("")}
          ${(rek.race??[]).map(x=>satir(x,x.kind)).join("")}</div>`:`<p class="bos">${\u00E7("Bir \u015Fehre var\u0131nca o \u015Fehrin rekorlar\u0131n\u0131 g\xF6r\xFCrs\xFCn.")}</p>`}
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
r.")]];return`<section class="kart" id="spor-kurallar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Kurallar")}</p><h2 class="b2">${\u00E7("Salon nas\u0131l i\u015Fler?")}</h2></div><span \
class="ik-kutu">${ikon("book-open")}</span></div>
        <div class="liste">${maddeler.map(([ik,x])=>`<div class="liste-satir"><span class="liste-ikon">${ikon(ik)}</span><div><div class="alt" style="margin:0">${esc(x)}</div></div><span></span></div>`).
join("")}</div>
      </section>`}function ciz(){if(kapandi)return;if(hata&&!v){kap.innerHTML=`<div class="sayfa"><div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(hata))}</span></div>
          <button class="dugme ikincil" style="margin-top:14px" id="spor-yeniden">${\u00E7("Yeniden dene")}</button></div>`,$("#spor-yeniden",kap).onclick=()=>tazele();return}const burada=!!v.gym;kap.
innerHTML=`<div class="sayfa" data-spor-bolge="${esc(v.gym?.region_id??"")}">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("\u015Eehrim")}</p><h1 class="b1">${esc(burada?\u00E7("{sehir} spor salonu",{sehir:bolgeAdi(v.gym.region_id)}):\u00E7("Spor salonu"))}<\
/h1>
          <p class="aciklama">${\u00E7("Kuvvet, kardiyo, boks ve esneklik. Atletik seviyen y\xFCkseldik\xE7e v\xFCcudun g\xFC\xE7lenir, i\u015Flerin k\u0131sal\u0131r, yar\u0131\u015Flarda h\u0131zlan\u0131rs\u0131n.")}\
</p></div>
          <span class="cip ${burada?"yesil":""}" id="spor-burada">${ikon("map-pin")}${esc(burada?\u00E7("\u015Eehirdesin"):\u00E7("Yoldas\u0131n"))}</span></div>
        <div id="spor-salon-yer"></div>
        <div class="izgara iki spor-izgara" style="margin-top:20px">
          <div class="yigin">${antrenmanHtml()}${sonucHtml()}${salondakilerHtml()}</div>
          <div class="yigin">${seviyeHtml()}${faydaHtml()}${rekorHtml()}${gecmisHtml()}${kurallarHtml()}</div>
        </div></div>`,$("#spor-salon-yer",kap)?.replaceWith(salon.el),salon.yaz({v,ben:{id:ben().id,ad:ben().name,gorunus,ulke:ben().citizenship},saatFarki}),bagla()}async function isle(fn,basari){if(!mesgul){
mesgul=!0;try{const y=await fn();if(kapandi)return;basari?.(y),Durum.ozet().catch(()=>{}),await yukle()}catch(e){tost(hataMetni(e),"circle-alert"),await yukle().catch(()=>{})}finally{mesgul=!1,kapandi||
ciz()}}}function bagla(){for(const b of $$("[data-git]",kap))b.onclick=()=>Kabuk.git(b.dataset.git);for(const b of $$("[data-spor-kisi]",kap))b.onclick=()=>profilAc(b.dataset.sporKisi);for(const b of $$(
"[data-spor-basla]",kap))b.onclick=()=>{const tur=b.dataset.sporBasla;isle(()=>Sunucu.yap("gym_start",{p_kind:tur}),()=>{tost(\u00E7("{tur} antrenman\u0131 ba\u015Flad\u0131: {dk} dakika. Salonda aletinin ba\u015F\u0131ndas\u0131n\
.",{tur:sporAdi(tur),dk:sayi(R().session?.minutes??20)}),sporIkon(tur)),salon.oyna("basla")})};const vz=$("#spor-vazgec",kap);vz&&(vz.onclick=()=>{const a=me().active;a&&pencere({ust:sporAdi(a.kind),baslik:\u00E7(
"Antrenmandan vazge\xE7"),govde:`<p class="aciklama">${esc(\u00E7("\xDCcret ve erzak geri d\xF6ner; bug\xFCnk\xFC hakk\u0131ndan say\u0131lmaz. Bu seanstan puan ve rekor gelmez."))}</p>`,dugmeler:[{ad:\u00E7(
"Devam et")},{ad:\u00E7("Vazge\xE7"),sinif:"mercan",ikon:"x",is:()=>isle(()=>Sunucu.yap("gym_cancel",{}),y=>tost(y?.closed?.status==="done"?\u00E7("Antrenman\u0131n zaten bitmi\u015Fti; sonucun a\u015Fa\u011F\u0131da."):
\u00E7("Antrenmandan vazge\xE7tin; \xFCcret ve erzak geri d\xF6nd\xFC."),"x"))}]})})}function sayacYaz(){const el=$("#spor-kalan",kap),a=me().active;if(!el||!a)return;const bas=Date.parse(a.starts_at),
son2=Date.parse(a.ends_at),kalan=Math.max(0,Math.ceil((son2-simdi())/1e3));el.textContent=kalan>0?\u00E7("{sure} kald\u0131",{sure:sporSure(kalan)}):\u00E7("Bitiyor; sonucun birazdan gelir.");const i=$(
"#spor-ilerleme",kap);i&&(i.style.width=`${(Math.max(0,Math.min(1,(simdi()-bas)/Math.max(1,son2-bas)))*100).toFixed(1)}%`)}const tazele=tazeleyici(async()=>{await yukle(),!kapandi&&!mesgul&&!document.
querySelector(".perde")&&ciz()});if(await yukle(),!kap.isConnected)return salon.kapat(),()=>{};ciz();const b1=Durum.dinle("olay",({olay,yuk})=>{/^gym\./.test(olay)&&tazele().then(()=>{olay==="gym.comp\
leted"&&!kapandi&&salon.oyna(yuk?.data?.record_taken||yuk?.data?.city_record?"rekor":"bitti")})});let son=Date.now();const saat=setInterval(()=>{if(kapandi||document.hidden)return;sayacYaz();const a=me().
active,bitti=a&&Date.parse(a.ends_at)<=simdi();Date.now()-son>=(bitti?1e4:3e4)&&(son=Date.now(),tazele())},1e3);return()=>{kapandi=!0,b1(),clearInterval(saat),salon.kapat()}}}),Parcalar.tamam("ek_98zz\
b_spor");
