// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98zzy_kartpostal.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/kare-album",{async ac(kap){const kusak=Sunucu.Giris.kusak;let kapandi=!1,fotolar=[],ozel=0,devam=!1,sayfalaniyor=!1;const gecerli=()=>!kapandi&&kap.isConnected&&kusak===Sunucu.Giris.
kusak,kareler=new Map;async function yukle(ekle=!1){if(!gecerli())return;const r=await Sunucu.cagir("photo_album",{p_limit:30,p_before:ekle?fotolar.at(-1)?.created_at??null:null});if(!gecerli())return;
const yeni=r.photos??[];fotolar=ekle?[...fotolar,...yeni.filter(p=>!kareler.has(p.photo_id))]:yeni,ozel=Number(r.private_count??0),devam=yeni.length===30,kareler.clear();for(const p of fotolar)kareler.
set(p.photo_id,p);ciz()}function ciz(){gecerli()&&(kap.innerHTML=`<div class="sayfa sayfa-dar"><div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m \xB7 Medya")}</p><h1 class="b1">${\u00E7(
"Alb\xFCm\xFCm")}</h1>
        <p class="aciklama">${\u00E7("\xD6zel Kare'lerin yaln\u0131z sana g\xF6r\xFCn\xFCr. Diledi\u011Fini sonradan payla\u015Fabilir ya da kartpostal olarak g\xF6nderebilirsin.")}</p><p class="kucuk\
">${esc(\u00E7("{n} \xF6zel Kare",{n:sayi(ozel)}))}</p></div>
        <button type="button" class="dugme ikincil kucuk-d" data-medya-don>${ikon("arrow-left")}${\u00E7("Medya")}</button></div>
        <div class="oneri-dugmeler" style="margin-bottom:14px"><button type="button" class="dugme altin" data-album-cek>${ikon("camera")}${\u00E7("Kare \xE7ek")}</button>
        <button type="button" class="dugme ikincil" data-album-kartpostal>${ikon("mail-open")}${\u00E7("Kartpostallar\u0131m")}</button></div>
        <div class="kare-izgara">${fotolar.map(p=>kareKartHtml(p)).join("")||`<p class="bos">${\u00E7("Alb\xFCm\xFCnde hen\xFCz Kare yok.")}</p>`}</div>
        ${devam?`<button type="button" class="dugme ikincil" data-album-devam style="margin-top:14px">${\u00E7("Daha fazla g\xF6ster")}</button>`:""}</div>`,$("[data-medya-don]",kap).onclick=()=>Kabuk.
git("hayat/medya"),$("[data-album-kartpostal]",kap).onclick=()=>Kabuk.git("hayat/kartpostal"),$("[data-album-cek]",kap).onclick=()=>kareStudyo({sonra:tazele}),kareKartlariBagla(kap,kareler,tazele),$("\
[data-album-devam]",kap)?.addEventListener("click",async e=>{if(!sayfalaniyor){sayfalaniyor=!0,e.currentTarget.disabled=!0;try{await yukle(!0)}catch(err){gecerli()&&(tost(hataMetni(err),"circle-alert"),
ciz())}finally{sayfalaniyor=!1}}}))}const tazele=tazeleyici(()=>yukle());if(await tazele(),!gecerli())return()=>{kapandi=!0};const birak=Durum.dinle("olay",({olay})=>{gecerli()&&/^media\.photo/.test(olay)&&
tazele()});return()=>{kapandi=!0,birak()}}}),Kabuk.kaydet("hayat/kartpostal",{async ac(kap){const kusak=Sunucu.Giris.kusak;let kapandi=!1,kutu="inbox",liste=[],okunmamis=0,devam=!1,sira=0;const gecerli=()=>!kapandi&&
kap.isConnected&&kusak===Sunucu.Giris.kusak;async function yukle(ekle=!1){if(!gecerli())return;const secili=kutu,istek=++sira,r=await Sunucu.cagir("postcards",{p_box:secili,p_limit:30,p_before:ekle?liste.
at(-1)?.sent_at??null:null});if(!gecerli()||istek!==sira||secili!==kutu)return;const yeni=r.items??[],kimlikler=new Set(liste.map(p=>p.postcard_id));liste=ekle?[...liste,...yeni.filter(p=>!kimlikler.has(
p.postcard_id))]:yeni,okunmamis=Number(r.unread??0),devam=yeni.length===30,ciz()}function ciz(){if(gecerli()){kap.innerHTML=`<div class="sayfa sayfa-dar"><div class="sayfa-bas"><div><p class="ust-yazi\
">${\u00E7("Hayat\u0131m \xB7 Medya")}</p><h1 class="b1">${\u00E7("Kartpostallar\u0131m")}</h1>
        <p class="aciklama">${\u00E7("Bir an\u0131, bir not, bir te\u015Fekk\xFCr.")}</p></div><button type="button" class="dugme ikincil kucuk-d" data-medya-don>${ikon("arrow-left")}${\u00E7("Medya")}\
</button></div>
        <div class="cip-satir" role="group" aria-label="${esc(\u00E7("Kartpostal kutular\u0131"))}" style="margin-bottom:16px">
          <button type="button" class="cip-dugme" data-kartpostal-kutu="inbox" aria-pressed="${kutu==="inbox"}">${ikon("inbox")}${\u00E7("Gelenler")} <span class="cip altin">${esc(\u00E7("{n} okunmam\u0131\
\u015F",{n:sayi(okunmamis)}))}</span></button>
          <button type="button" class="cip-dugme" data-kartpostal-kutu="sent" aria-pressed="${kutu==="sent"}">${ikon("send")}${\u00E7("G\xF6nderilenler")}</button>
          <button type="button" class="dugme sade kucuk-d" data-kartpostal-album>${ikon("image")}${\u00E7("Alb\xFCm\xFCm")}</button></div>
        <div class="yigin" data-kartpostal-liste>${liste.map(p=>kartpostalKartHtml(p)).join("")||`<p class="bos">${esc(kutu==="inbox"?\u00E7("Hen\xFCz kartpostal almad\u0131n."):\u00E7("Hen\xFCz kartpost\
al g\xF6ndermedin."))}</p>`}</div>
        ${devam?`<button type="button" class="dugme ikincil" data-kartpostal-devam style="margin-top:14px">${\u00E7("Daha fazla g\xF6ster")}</button>`:""}</div>`,$("[data-medya-don]",kap).onclick=()=>Kabuk.
git("hayat/medya"),$("[data-kartpostal-album]",kap).onclick=()=>Kabuk.git("hayat/kare-album");for(const b of $$("[data-kartpostal-kutu]",kap))b.onclick=()=>{b.dataset.kartpostalKutu!==kutu&&(kutu=b.dataset.
kartpostalKutu,liste=[],sira++,ciz(),tazele())};for(const b of $$("[data-kartpostal-ac]",kap))b.onclick=async()=>{const p=liste.find(x=>x.postcard_id===b.dataset.kartpostalAc);if(!(!p||b.disabled)){b.
disabled=!0;try{await kartpostalAc(p,tazele,b)}finally{b.isConnected&&(b.disabled=!1)}}};$("[data-kartpostal-devam]",kap)?.addEventListener("click",async e=>{e.currentTarget.disabled=!0;try{await yukle(
!0)}catch(err){gecerli()&&(tost(hataMetni(err),"circle-alert"),ciz())}}),kartpostalResimleriBagla(kap,liste)}}const tazele=tazeleyici(()=>yukle());if(await tazele(),!gecerli())return()=>{kapandi=!0};const birak=Durum.
dinle("olay",({olay})=>{gecerli()&&/^media\.postcard/.test(olay)&&tazele()});return()=>{kapandi=!0,sira++,birak()}}}),Parcalar.tamam("ek_98zzy_kartpostal");
