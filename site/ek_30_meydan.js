// Civora istemcisi 2026-11-11-88bf220f-2e9125c (ek_30_meydan.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("meydan/akis",{async ac(kap){const TUR={all:\u00E7("Hepsi"),post:\u00E7("Payla\u015F\u0131mlar"),photo:\u00E7("Kare"),video:\u00E7("Kanal"),article:\u00E7("Gazete")};let v={kapsam:"all",kip:"\
recent",tur:"all",posts:[],photos:[],videos:[],streams:[],articles:[],official:[],trends:[],sonu:!1,yeni:0,kurallar:null,partim:null};try{const k=JSON.parse(sessionStorage.getItem("civora.akis")??"{}");
KAPSAM[k.kapsam]&&(v.kapsam=k.kapsam),k.kip&&(v.kip=k.kip),TUR[k.tur]&&(v.tur=k.tur)}catch{}const kareler=new Map,makaleler=new Map,videolar=new Map;let gundemDur=()=>{};const kareKipi=()=>({friends:"\
friends",following:"following"})[v.kapsam]??"country";async function yukle(){const kareIster=v.tur==="all"||v.tur==="photo",makaleIster=v.tur==="all"||v.tur==="article",paylasimIster=v.tur==="all"||v.
tur==="post",videoIster=v.tur==="all"||v.tur==="video",[f,t,kurallar,partim,kf,nf,vf,cf,gd]=await Promise.all([paylasimIster?Sunucu.cagir("square_feed",{p_scope:v.kapsam,p_mode:v.kip,p_limit:30}):Sunucu.
cagir("square_feed",{p_scope:v.kapsam,p_mode:v.kip,p_limit:1}),Sunucu.cagir("square_trends",{p_scope:["all","country","world","party"].includes(v.kapsam)?v.kapsam:"all"}).catch(()=>({trends:[]})),Durum.
kurallar(),Sunucu.cagir("my_party").catch(()=>null),kareIster?Sunucu.cagir("photo_feed",{p_mode:kareKipi(),p_limit:v.tur==="photo"?30:20}).catch(()=>({photos:[]})):{photos:[]},makaleIster?Sunucu.cagir(
"news_feed",{p_mode:v.kapsam==="following"?"subscribed":v.kip==="featured"?"featured":"recent",p_limit:v.tur==="article"?30:20}).catch(()=>({articles:[]})):{articles:[]},videoIster?Sunucu.cagir("video\
_feed",{p_mode:kareKipi(),p_limit:v.tur==="video"?30:12}).catch(()=>({videos:[]})):{videos:[]},videoIster?Sunucu.cagir("streams_live").catch(()=>({streams:[]})):{streams:[]},Sunucu.cagir("daily_issue").
catch(()=>null)]);Object.assign(v,{posts:paylasimIster?f.posts:[],official:f.official??[],trends:t.trends??[],sonu:!paylasimIster||f.posts.length<30,yeni:0,kurallar,partim,gundem:gd,photos:kf.photos??
[],articles:nf.articles??[],videos:vf.videos??[],streams:cf.streams??[]}),kareler.clear(),makaleler.clear(),videolar.clear();for(const p of v.photos)kareler.set(p.photo_id,p);for(const a of v.articles)
makaleler.set(a.article_id,a);for(const x of v.videos)videolar.set(x.video_id,x)}function ogeler(){const l=[...v.posts.map(p=>({t:Date.parse(p.at),html:paylasimHtml(p)})),...v.photos.map(p=>({t:Date.parse(
p.created_at),html:kareKartHtml(p)})),...v.videos.map(x=>({t:Date.parse(x.created_at),html:videoKartHtml(x)})),...v.articles.map(a=>({t:Date.parse(a.created_at),html:makaleKartHtml(a)}))];return(v.kip===
"recent"||v.tur!=="post")&&l.sort((a,b)=>b.t-a.t),l.map(x=>x.html).join("")}const paylasimHtml=p=>`<article class="paylasim" data-post="${p.post_id}">
      <div class="paylasim-ust"><button class="paylasim-yazar" data-profil="${esc(p.author_id)}">${avatarKutu(p.author_name,p.author_id)}<span><b>${esc(p.author_name)}</b>
        <span class="kucuk"><span class="ulke-nokta" style="background:${ulkeRenk(p.country_id)}"></span> ${esc(ulkeAdi(p.country_id))} \xB7 ${esc(YAZ_KAPSAM[p.scope]??p.scope)} \xB7 ${esc(zamanOnce(p.
at))}</span></span></button>
        <button class="paylasim-menu" data-menu="${p.post_id}" aria-label="${\u00E7("Se\xE7enekler")}">${ikon("ellipsis")}</button></div>
      <p class="paylasim-metin">${bahsetmeli(p.body)}</p>
      <div class="paylasim-alt">
        <button data-alkis="${p.post_id}" aria-pressed="${p.applauded_by_me}">${ikon("hand")}<span>${sayi(p.applause)}</span><span class="gizli-ad">${\u00E7("Alk\u0131\u015F")}</span></button>
        <button data-yanki="${p.post_id}" aria-pressed="${p.echoed_by_me}">${ikon("repeat-2")}<span>${sayi(p.echoes)}</span><span class="gizli-ad">${\u00E7("Yank\u0131")}</span></button>
        <button data-yanit="${p.post_id}">${ikon("message-circle")}<span>${sayi(p.replies)}</span><span class="gizli-ad">${\u00E7("Yan\u0131t")}</span></button>
      </div></article>`;function ciz(){const sk=v.kurallar.data.social.square,kapsamlar=Object.entries(YAZ_KAPSAM).filter(([k])=>k!=="party"||v.partim);kap.innerHTML=`<div class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Meydan")}</p><h1 class="b1">${\u00E7("Ak\u0131\u015F")}</h1><p class="aciklama">${\u00E7("K\u0131sa payla\u015F\u0131mlar ({n} harf). #etiket kullana\
bilirsin; en \xE7ok kullan\u0131lanlar g\xFCndeme \xE7\u0131kar.",{n:Number(sk.maxLength)})}</p></div></div>
        <section class="kart">
          <form class="form" id="paylas-form" novalidate>
            <label class="alan"><span>${\u00E7("Ne d\xFC\u015F\xFCn\xFCyorsun?")}</span><textarea name="metin" maxlength="${sk.maxLength}" placeholder="${\u00E7("Meydana bir \u015Fey yaz\u2026 #Bar\u0131\u015F")}\
"></textarea>
              <small id="paylas-sayac">0 / ${sayi(sk.maxLength)}</small></label>
            <div class="satir" style="flex-wrap:wrap;justify-content:space-between">
              <label class="alan" style="flex:1 1 160px"><span>${\u00E7("Kim g\xF6rs\xFCn")}</span><select name="kapsam">${kapsamlar.map(([k,a])=>`<option value="${k}">${esc(a)}</option>`).join("")}</\
select></label>
              <button class="dugme altin" type="submit" style="align-self:flex-end">${ikon("send")}${\u00E7("Payla\u015F")}</button>
            </div>
            <div class="form-mesaj"></div>
          </form>
        </section>
        ${v.gundem?.issue||v.gundem?.result?`<div id="gundem-akis">${Gundem.soruKarti(v.gundem,{yer:"akis"})}</div>`:""}
        <div class="akis-suzgec" role="tablist" aria-label="${\u00E7("Ak\u0131\u015F")}">${Object.entries(KAPSAM).filter(([k])=>k!=="party"||v.partim).map(([k,a])=>`<button class="altsekme" data-kapsa\
m="${k}" aria-pressed="${v.kapsam===k}">${esc(a)}</button>`).join("")}
          <span class="akis-ayrac"></span>
          <button class="altsekme" data-kip="recent" aria-pressed="${v.kip==="recent"}">${\u00E7("En yeni")}</button>
          <button class="altsekme" data-kip="featured" aria-pressed="${v.kip==="featured"}">${\u00E7("\xD6ne \xE7\u0131kan")}</button></div>
        <div class="akis-suzgec akis-tur" role="tablist" aria-label="${\u00E7("T\xFCr")}">${Object.entries(TUR).map(([k,a])=>`<button class="altsekme" data-tur="${k}" aria-pressed="${v.tur===k}">${ikon(
{all:"layers",post:"megaphone",photo:"camera",video:"video",article:"newspaper"}[k])}${esc(a)}</button>`).join("")}
          <button class="altsekme" data-medya-git>${ikon("camera")}${\u00E7("Kare \xE7ek")}</button></div>
        ${v.tur==="all"||v.tur==="video"?canliCipleriHtml(v.streams):""}
        ${v.trends.length?`<div class="gundem"><span class="ust-yazi">${\u00E7("G\xFCndem")}</span>${v.trends.map(t=>`<span class="cip">#${esc(t.tag)} \xB7 ${\u00E7("{n} ki\u015Fi",{n:Number(t.authors)})}\
</span>`).join("")}</div>`:""}
        ${v.yeni?`<button class="dugme ikincil tam yeni-paylasim" id="yeni-goster">${ikon("arrow-up-right")}${\u00E7("Yeni payla\u015F\u0131mlar var \xB7 g\xF6ster")}</button>`:""}
        ${v.official.length?`<section class="kart resmi-kayitlar"><p class="ust-yazi">${\u00E7("Resm\xEE kay\u0131tlar")}</p><div class="yigin" style="margin-top:8px">${v.official.map(r=>{const[ik,m]=resmiMetin(
r);return`<div class="resmi-satir">${ik}<span>${esc(m)}</span><span class="kucuk">${esc(zamanOnce(r.at))}</span></div>`}).join("")}</div></section>`:""}
        <div class="yigin" id="paylasimlar">${ogeler()||`<section class="kart"><p class="bos">${v.tur==="photo"?\u00E7("Burada hen\xFCz Kare yok. \u0130lk sen \xE7ek."):v.tur==="video"?\u00E7("Burada \
hen\xFCz video yok. Hayat\u0131m \u2192 Medya'dan ilk videoyu sen \xE7ek."):v.tur==="article"?\u00E7("Burada hen\xFCz makale yok. Gazete kur, ilk haberi sen yaz."):\u00E7("Burada hen\xFCz payla\u015F\u0131m yok. \u0130\
lk sen yaz.")}</p></section>`}</div>
        ${!v.sonu&&v.kip==="recent"?`<button class="dugme ikincil tam" id="daha" style="margin-top:12px">${\u00E7("Daha eski payla\u015F\u0131mlar")}</button>`:""}
      </div>`,bagla()}function bagla(){const f=$("#paylas-form",kap),sayac=$("#paylas-sayac",kap);bahsetmeOner($("textarea",f)),$("textarea",f).addEventListener("input",e=>{sayac.textContent=`${e.target.
value.length} / ${v.kurallar.data.social.square.maxLength}`}),f.addEventListener("submit",async e=>{e.preventDefault();const d=new FormData(f),metin=String(d.get("metin")??"").trim(),yer=$(".form-mesa\
j",f);if(!metin){yer.innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${\u00E7("Bo\u015F payla\u015F\u0131m olmaz.")}</span></div>`;return}const b=$("button[type=submit]",f);b.disabled=
!0;try{await Sunucu.yap("square_post",{p_scope:d.get("kapsam"),p_body:metin}),tost(\u00E7("Payla\u015F\u0131ld\u0131."),"send"),await tazele()}catch(err){err.kod==="TERMS_REQUIRED"&&kurallariKabul(),yer.
innerHTML=`<div class="hata-kutusu">${ikon("circle-alert")}<span>${esc(hataMetni(err))}</span></div>`,b.disabled=!1}});for(const b of $$("[data-kapsam]",kap))b.onclick=()=>{v.kapsam=b.dataset.kapsam,hatirla(),
tazele()};for(const b of $$("[data-kip]",kap))b.onclick=()=>{v.kip=b.dataset.kip,hatirla(),tazele()};for(const b of $$("[data-tur]",kap))b.onclick=()=>{v.tur=b.dataset.tur,hatirla(),tazele()};$("[data\
-medya-git]",kap)?.addEventListener("click",()=>kareStudyo({sonra:tazele})),kareKartlariBagla(kap,kareler,tazele),makaleKartlariBagla(kap,makaleler,tazele),videoKartlariBagla(kap,videolar,tazele),canliCipleriBagla(
kap,tazele),$("#yeni-goster",kap)?.addEventListener("click",tazele);const gk=$("#gundem-akis",kap);gundemDur(),gundemDur=()=>{},gk&&(Gundem.soruBagla(gk,v.gundem,tazele),gundemDur=geriSay(gk,tazele)),
$("#daha",kap)?.addEventListener("click",async()=>{const son=v.posts[v.posts.length-1]?.post_id;try{const f2=await Sunucu.cagir("square_feed",{p_scope:v.kapsam,p_mode:"recent",p_before:son,p_limit:30});
v.posts=v.posts.concat(f2.posts),v.sonu=f2.posts.length<30,ciz()}catch(e){tost(hataMetni(e),"circle-alert")}}),paylasimBagla(kap)}function paylasimBagla(kok){for(const b of $$("[data-profil]",kok))b.onclick=
()=>profilAc(b.dataset.profil,tazele);for(const b of $$("[data-alkis]",kok))b.onclick=()=>tepki(b,"applause");for(const b of $$("[data-yanki]",kok))b.onclick=()=>tepki(b,"echo");for(const b of $$("[da\
ta-yanit]",kok))b.onclick=()=>konusma(Number(b.dataset.yanit));for(const b of $$("[data-menu]",kok))b.onclick=()=>menu(Number(b.dataset.menu))}async function tepki(b,tur){const id=Number(b.dataset.alkis??
b.dataset.yanki),acik=b.getAttribute("aria-pressed")!=="true";try{const r=await Sunucu.cagir("square_react",{p_post:id,p_kind:tur,p_on:acik});b.setAttribute("aria-pressed",String(acik)),$("span",b).textContent=
sayi(tur==="applause"?r.applause:r.echoes);const p=v.posts.find(x=>x.post_id===id);p&&(tur==="applause"?(p.applause=r.applause,p.applauded_by_me=acik):(p.echoes=r.echoes,p.echoed_by_me=acik))}catch(e){
tost(hataMetni(e),"circle-alert")}}function menu(id){const p=v.posts.find(x=>x.post_id===id);p&&pencere({ust:\u00E7("Payla\u015F\u0131m"),baslik:p.author_name,govde:`<p class="aciklama">${bahsetmeli(p.
body)}</p>`,dugmeler:p.mine?[{ad:\u00E7("Kapat")},{ad:\u00E7("Sil"),sinif:"mercan",is:async()=>{try{await Sunucu.yap("square_delete",{p_post:id}),tost(\u00E7("Payla\u015F\u0131m\u0131n silindi."),"x")}catch(e){
tost(hataMetni(e),"circle-alert")}await tazele()}}]:[{ad:\u00E7("Kapat")},{ad:\u00E7("Profil"),is:()=>profilAc(p.author_id,tazele)},{ad:\u00E7("Raporla"),sinif:"mercan",is:()=>raporla({post:id,ad:p.author_name})}]})}
async function konusma(id){let t;try{t=await Sunucu.cagir("square_thread",{p_post:id})}catch(e){tost(hataMetni(e),"circle-alert");return}const sk=v.kurallar.data.social.square,{form,kapat}=pencereForm(
{ust:\u00E7("Konu\u015Fma"),baslik:t.root.author_name,onayAd:\u00E7("Yan\u0131tla"),onayIkon:"send",govde:`<div class="konusma">${[t.root,...t.replies].map((x,i)=>`<div class="konusma-satir ${i===0?"k\
ok":""}">
            <span class="kucuk"><b>${esc(x.author_name)}</b> \xB7 ${esc(zamanOnce(x.at))}</span><p>${bahsetmeli(x.body)}</p></div>`).join("")}
          ${t.replies.length?"":`<p class="kucuk">${\u00E7("Hen\xFCz yan\u0131t yok.")}</p>`}</div>
          <label class="alan"><span>${\u00E7("Yan\u0131t\u0131n")}</span><textarea name="metin" maxlength="${sk.maxLength}"></textarea></label>`,is:async d=>{const metin=String(d.get("metin")??"").trim();
if(!metin)throw new Error(\u00E7("Yan\u0131t bo\u015F olamaz."));await Sunucu.yap("square_reply",{p_post:t.root.post_id,p_body:metin}),tost(\u00E7("Yan\u0131t\u0131n g\xF6nderildi."),"message-circle"),
await tazele()}});bahsetmeOner($("textarea",form))}const hatirla=()=>{try{sessionStorage.setItem("civora.akis",JSON.stringify({kapsam:v.kapsam,kip:v.kip,tur:v.tur}))}catch{}},tazele=tazeleyici(async()=>{
await yukle(),ciz()});await yukle(),ciz();const yeniVar=olay=>{(olay==="square.new"||olay==="media.photo_published"||olay==="media.video_published"||olay==="news.article_published")&&v.kip==="recent"&&
(v.yeni++,$("#yeni-goster",kap)||ciz())},b1=Durum.dinle("ulke-olay",({olay})=>{olay==="media.stream_started"||olay==="media.stream_ended"||/^issue\./.test(olay)?tazele():yeniVar(olay)}),b2=Sunucu.Canli.
dinle("public:square",olay=>yeniVar(olay));return()=>{b1(),b2(),gundemDur()}}}),Kabuk.kaydet("meydan/arkadas",{async ac(kap){let v={a:null,ayar:null,sonuc:null,arama:"",foto:null,gorunus:void 0,engeller:[],
oneriler:[],baglar:null,parti:null},davetSayac=null;const foto=ArkadasFoto.ac();Sunucu.cagir("ping").catch(()=>{});async function yukle(){const[a,ayar2,f,bak,asker,engeller,oneri,baglar,parti]=await Promise.
all([Sunucu.cagir("friends"),Sunucu.cagir("social_settings"),Sunucu.cagir("friends_photo").catch(()=>v.foto),v.gorunus===void 0?Sunucu.cagir("my_look").catch(()=>null):null,Durum.askerlik().catch(()=>null),
Sunucu.cagir("square_blocks").catch(()=>[]),Sunucu.cagir("friend_suggestions").catch(()=>({items:[]})),MekanYolu.yakinliklar().catch(()=>null),EvPartisi.durum().catch(()=>null),Durum.kurallar().catch(
()=>null)]);v.a=a,v.ayar=ayar2,v.foto=f,v.asker=asker,v.engeller=engeller??[],v.oneriler=oneri?.items??[],v.baglar=baglar,v.parti=parti,v.gorunus===void 0&&(v.gorunus=bak?.look??null)}const kisi=(x,sag="")=>`\
<div class="koltuk">${avatarKutu(x.name,x.character_id)}<div><button class="baglanti" data-profil="${esc(x.character_id)}">${x.online?`<span class="cevrimici-nokta" title="${\u00E7("\xE7evrimi\xE7i")}\
"></span>`:""}<b>${esc(x.name)}</b></button>
      ${x.country_id?`<div class="kucuk">${esc(ulkeAdi(x.country_id))}</div>`:x.decided_at?`<div class="kucuk">${esc(beriYaz(x.decided_at))}</div>`:""}</div>${sag||"<span></span>"}</div>`,bagHaritasi=()=>new Map(
(v.baglar?.friends??[]).map(x=>[x.character_id,x])),bagCip=x=>{const b=bagHaritasi().get(x.character_id);return b&&(b.tier==="close"||b.tier==="kanka")?` <span class="cip ${b.tier==="kanka"?"mercan":"\
mor"} bag-cip" data-bag="${esc(b.tier)}">${ikon(BAG_IK[b.tier])}${esc(BAG_TUR[b.tier])}</span>`:""};function ciz(){const a=v.a,bh=bagHaritasi(),arkadaslar=[...a.friends].sort((x,y)=>Number(bh.get(y.character_id)?.
points??0)-Number(bh.get(x.character_id)?.points??0)||+!!y.online-+!!x.online||String(x.name).localeCompare(String(y.name),DIL.yerel)),tanidik=v.baglar?.acquaintances??[],bekleyen=new Set([...a.incoming,
...a.outgoing].map(x=>x.character_id));kap.innerHTML=`<div class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Meydan")}</p><h1 class="b1">${\u00E7("Arkada\u015Flar")}</h1><p class="aciklama">${\u00E7("{n} / {toplam} arkada\u015F. Arkada\u015Flar\u0131nla mesa\
jla\u015Fmak istek beklemez.",{n:a.friends.length,toplam:Number(a.max)})}</p></div></div>
        <div id="foto-yer"></div>
        <section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Oyuncu bul")}</p><h2 class="b2">${\u00E7("Ara")}</h2></div><span class="ik-kutu">${ikon("zoom-in")}</span></div>
          <form class="sohbet-yaz" id="ara-form" novalidate><input name="q" minlength="2" maxlength="24" placeholder="${\u00E7("Ad yaz (en az 2 harf)")}" value="${esc(v.arama)}" aria-label="${\u00E7("\
Oyuncu ad\u0131")}" autocomplete="off">
            <button class="dugme" type="submit" aria-label="${\u00E7("Ara")}">${ikon("zoom-in")}</button></form>
          ${v.sonuc?`<div class="koltuk-liste" style="margin-top:12px">${v.sonuc.map(x=>kisi(x)).join("")||`<p class="bos">${\u00E7("Bulunamad\u0131.")}</p>`}</div>`:""}</section>
        ${a.incoming.length?`<section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Gelen istekler")}</p><h2 class="b2">${\u00E7("{n} istek",{n:a.incoming.length})}</h2></div><\
/div>
          <div class="koltuk-liste">${a.incoming.map(x=>kisi(x,`<span class="satir" style="gap:6px"><button class="dugme kucuk-d" data-kabul="${esc(x.character_id)}">${\u00E7("Kabul")}</button><button\
 class="dugme sade kucuk-d" data-ret="${esc(x.character_id)}">${\u00E7("Reddet")}</button></span>`)).join("")}</div></section>`:""}
        ${partiDavetlerHtml(v.parti?.invitations)}
        <section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Arkada\u015Flar\u0131n")}</p><h2 class="b2">${a.friends.length?\u00E7("{n} arkada\u015F",{n:a.friends.length}):\u00E7(
"Hen\xFCz arkada\u015F\u0131n yok")}</h2></div><span class="ik-kutu">${ikon("users-round")}</span></div>
          ${a.friends.length?`<div class="koltuk-liste">${arkadaslar.map(x=>kisi(x,`<span class="satir" style="gap:6px;flex-wrap:wrap;justify-content:flex-end">${bagCip(x)}<button class="dugme ikincil\
 kucuk-d" data-mesaj="${esc(x.character_id)}|${esc(x.name)}">${ikon("message-circle")}${\u00E7("Mesaj")}</button></span>`)).join("")}</div>`:`<p class="bos">${\u00E7("Ak\u0131\u015Fta ya da sohbette birinin ad\u0131\
na dokun, profilinden arkada\u015F ekle.")}</p>`}
          ${a.friends.length?`<p class="kucuk" style="margin-top:10px">${\u00E7("Yak\u0131nl\u0131\u011Fa g\xF6re s\u0131ral\u0131. Arkada\u015F\u0131nla yak\u0131nl\u0131\u011F\u0131n 20 puana \xE7\u0131k\u0131nca yak\u0131n dost, 50 puana \xE7\u0131k\u0131nca kanka olursunuz; mek\xE2nda se\
lamla\u015Fmak, \u0131smarlamak ve ayn\u0131 masada oturmak yak\u0131nl\u0131\u011F\u0131 art\u0131r\u0131r.")}</p>`:""}
          <div class="oneri-dugmeler" style="margin-top:10px"><button class="dugme sade kucuk-d" id="ark-hediyeler">${ikon("gift")}${\u00E7("Hediyelerim")}</button>
            <button class="dugme sade kucuk-d" id="ark-mekanlar">${ikon("sofa")}${\u00E7("Mek\xE2nlar")}</button></div></section>
        ${tanidik.length?`<section class="kart" id="ark-tanidiklar"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Tan\u0131d\u0131klar\u0131n")}</p><h2 class="b2">${\u00E7("{n} tan\u0131d\u0131k",
{n:tanidik.length})}</h2></div><span class="ik-kutu">${ikon("hand")}</span></div>
          <div class="koltuk-liste">${tanidik.map(x=>`<div class="koltuk">${avatarKutu(x.name,x.character_id)}<div><button class="baglanti" data-profil="${esc(x.character_id)}"><b>${esc(x.name)}</b></\
button>
              <div class="kucuk">${esc(\u00E7("yak\u0131nl\u0131k {n}",{n:sayi(x.points??0)}))}</div></div>
            ${bekleyen.has(x.character_id)?`<span class="kucuk">${\u00E7("\u0130stek bekliyor")}</span>`:`<button class="dugme kucuk-d" data-oneri-ekle="${esc(x.character_id)}">${ikon("user-round-plus")}${\u00E7(
"Arkada\u015F ekle")}</button>`}</div>`).join("")}</div>
          <p class="kucuk">${\u00E7("Son 90 g\xFCnde mek\xE2nda, meydanda ya da evde etkile\u015Fimin oldu\u011Fu ama arkada\u015F\u0131n olmayan ki\u015Filer.")}</p></section>`:""}
        ${v.oneriler.length?`<section class="kart" id="arkadas-oneri"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("\xD6neriler")}</p><h2 class="b2">${\u00E7("Tan\u0131yor olabilece\u011Fin ki\u015Filer")}\
</h2></div><span class="ik-kutu">${ikon("user-round-plus")}</span></div>
          <div class="koltuk-liste">${v.oneriler.map(x=>`<div class="koltuk">${avatarKutu(x.name,x.character_id)}<div><button class="baglanti" data-profil="${esc(x.character_id)}">${x.online?`<span cl\
ass="cevrimici-nokta" title="${\u00E7("\xE7evrimi\xE7i")}"></span>`:""}<b>${esc(x.name)}</b></button>
              <div class="kucuk">${esc(oneriNedeni(x))}</div>
              ${x.language?`<div class="kucuk oneri-dil" data-oneri-dil="${esc(x.language)}">${ikon("languages")} ${esc(\u00E7("Ortak dil: {dil}",{dil:dilAdi(x.language)}))}</div>`:""}</div>
            <span class="satir" style="gap:6px"><button class="dugme kucuk-d" data-oneri-ekle="${esc(x.character_id)}">${ikon("user-round-plus")}${\u00E7("Ekle")}</button>
              <button class="dugme sade kucuk-d oneri-kisi-gizle" data-oneri-gizle="${esc(x.character_id)}" aria-label="${\u00E7("\xD6neriyi gizle")}" title="${\u00E7("\xD6neriyi gizle")}">${ikon("x")}\
</button></span></div>`).join("")}</div>
          <p class="kucuk">${\u00E7("Ortak arkada\u015F, birlik, m\xFCzik grubu, parti, \u015Fehir ve ortak dilden; son g\xFCnlerde oyunu a\xE7anlar. Gizledi\u011Fin ki\u015Fi {n} g\xFCn \xF6nerilmez.",
{n:Number(Durum.v.kurallar?.data?.social?.friends?.suggestions?.hideDays??30)})}</p></section>`:""}
        ${a.outgoing.length?`<section class="kart"><p class="ust-yazi">${\u00E7("G\xF6nderdi\u011Fin istekler")}</p><div class="koltuk-liste" style="margin-top:10px">${a.outgoing.map(x=>kisi(x,`<butto\
n class="dugme sade kucuk-d" data-geri="${esc(x.character_id)}">${\u00E7("Geri \xE7ek")}</button>`)).join("")}</div></section>`:""}
        <section class="kart"><div class="kart-bas"><div><p class="ust-yazi">${\u00E7("Gizlilik")}</p><h2 class="b2">${\u00E7("Kim ula\u015Fabilir?")}</h2></div><span class="ik-kutu">${ikon("lock")}</\
span></div>
          <div class="form">
            <label class="alan"><span>${\u00E7("Bana \xF6zel mesaj iste\u011Fi kimden gelebilir")}</span><select id="dm-politika">${Object.entries(POLITIKA_DM).map(([k,x])=>`<option value="${k}" ${v.ayar.
dm_policy===k?"selected":""}>${esc(x)}</option>`).join("")}</select></label>
            <label class="alan"><span>${\u00E7("Bana arkada\u015Fl\u0131k iste\u011Fi kimden gelebilir")}</span><select id="ark-politika">${Object.entries(POLITIKA_ARK).map(([k,x])=>`<option value="${k}\
" ${v.ayar.friend_policy===k?"selected":""}>${esc(x)}</option>`).join("")}</select></label>
            <label class="alan"><span>${\u00E7("Benden kim bahsedince (@Ad_Soyad) bildirim alay\u0131m")}</span><select id="bahsetme-politika">${Object.entries(POLITIKA_BAHSETME).map(([k,x])=>`<option\
 value="${k}" ${(v.ayar.mention_policy??"everyone")===k?"selected":""}>${esc(x)}</option>`).join("")}</select></label>
            <label class="alan"><span>${\u00E7("Mek\xE2nlarda bana kim \u0131smarlayabilir ve hediye verebilir")}</span><select id="ismarlama-politika">${Object.entries(ISMARLAMA_TERCIH).map(([k,x])=>`\
<option value="${k}" ${(v.ayar.treat_policy??"everyone")===k?"selected":""}>${esc(x)}</option>`).join("")}</select></label>
            <label class="alan"><span>${\u00E7("Beni ev partisine kim davet edebilir")}</span><select id="parti-politika">${Object.entries(PARTI_TERCIH).map(([k,x])=>`<option value="${k}" ${(v.ayar.party_invite_policy??
"everyone")===k?"selected":""}>${esc(x)}</option>`).join("")}</select></label>
            <label class="radyo"><input type="checkbox" id="cevrimici-ayar" ${v.ayar.show_online!==!1?"checked":""}>
              <span><b>${\u00E7("\xC7evrimi\xE7i oldu\u011Fum g\xF6r\xFCns\xFCn")}</b><span class="kucuk">${\u00E7("Kapal\u0131ysa arkada\u015F listesinde, profilinde, konu\u015Fmalarda ve foto\u011Frafta hep \xE7evrimd\u0131\u015F\u0131 \
g\xF6r\xFCn\xFCrs\xFCn; son g\xF6r\xFClme hi\xE7 g\xF6sterilmez.")}</span></span></label>
            <label class="radyo"><input type="checkbox" id="mekan-ad-ayar" ${v.ayar.hide_name_in_places?"checked":""}>
              <span><b>${\u00E7("Mek\xE2nlarda ad\u0131m\u0131 gizle")}</b><span class="kucuk">${\u00E7("A\xE7\u0131ksa meydanda ad\u0131n g\xF6r\xFCnmez; fig\xFCr\xFCn ve \xFClken g\xF6r\xFCn\xFCr. Buras\u0131'na yazd\u0131klar\u0131n yine ad\u0131nla g\xF6r\xFC\
n\xFCr.")}</span></span></label>
          </div>
          ${v.engeller.length?`<div class="koltuk-liste" id="meydan-engeller" style="margin-top:12px"><p class="ust-yazi">${\u00E7("Meydan engellerin")}</p>
            ${v.engeller.map(b=>`<div class="koltuk"><span class="ik-kutu">${ikon("eye-off")}</span><div><b>${\u00E7("Meydanda engelledi\u011Fin biri")}</b>
              <div class="kucuk">${esc(beriYaz(b.since))}</div></div><button class="dugme sade kucuk-d" data-meydan-engel="${esc(b.ref)}">${\u00E7("Kald\u0131r")}</button></div>`).join("")}
            <p class="kucuk">${\u00E7("Kim oldu\u011Fu g\xF6sterilmez; kald\u0131r\u0131nca meydanlarda yine birbirinizi g\xF6r\xFCrs\xFCn\xFCz.")}</p></div>`:""}
        </section>
      </div>`,$("#foto-yer",kap)?.replaceWith(foto.el),foto.yaz({foto:v.foto,gorunus:v.gorunus,ozet:Durum.v.ozet,asker:v.asker,baglar:v.baglar}),bagla(),davetSayac?.(),davetSayac=partiDavetlerBagla(kap,
v.parti?.invitations,tazele)}function bagla(){for(const b of $$("[data-profil]",kap))b.onclick=()=>profilAc(b.dataset.profil,tazele);for(const b of $$("[data-kabul]",kap))b.onclick=()=>islem("friend_r\
espond",{p_character:b.dataset.kabul,p_accept:!0},\u00E7("Art\u0131k arkada\u015Fs\u0131n\u0131z."),!0);for(const b of $$("[data-ret]",kap))b.onclick=()=>islem("friend_respond",{p_character:b.dataset.
ret,p_accept:!1},\u00E7("\u0130stek reddedildi."),!0);for(const b of $$("[data-geri]",kap))b.onclick=()=>islem("friend_cancel",{p_character:b.dataset.geri},\u00E7("\u0130stek geri \xE7ekildi."));for(const b of $$(
"[data-mesaj]",kap))b.onclick=()=>{const[k,ad]=b.dataset.mesaj.split("|");mesajBaslat(k,ad)};$("#ara-form",kap).addEventListener("submit",async e=>{if(e.preventDefault(),v.arama=String(new FormData(e.
target).get("q")??"").trim(),v.arama.length<2){tost(\u00E7("En az 2 harf yaz."),"circle-alert");return}try{v.sonuc=await Sunucu.cagir("character_search",{p_query:v.arama}),ciz()}catch(err){tost(hataMetni(
err),"circle-alert")}}),$("#dm-politika",kap).onchange=e=>ayar("social_settings_set",{p_dm_policy:e.target.value}),$("#ark-politika",kap).onchange=e=>ayar("friend_settings_set",{p_friend_policy:e.target.
value}),$("#cevrimici-ayar",kap).onchange=e=>ayar("presence_settings_set",{p_show:e.target.checked}),$("#bahsetme-politika",kap).onchange=e=>ayar("mention_settings_set",{p_policy:e.target.value}),$("#\
ismarlama-politika",kap).onchange=e=>ayar("treat_settings_set",{p_policy:e.target.value}),$("#parti-politika",kap).onchange=e=>ayar("party_invite_settings_set",{p_policy:e.target.value}),$("#ark-hediy\
eler",kap)?.addEventListener("click",hediyelerimPenceresi),$("#ark-mekanlar",kap)?.addEventListener("click",()=>Kabuk.git("sehir/mekanlar"));for(const b of $$("[data-oneri-ekle]",kap))b.onclick=()=>islem(
"friend_request",{p_character:b.dataset.oneriEkle},\u00E7("Arkada\u015Fl\u0131k iste\u011Fi g\xF6nderildi."),!0);for(const b of $$("[data-oneri-gizle]",kap))b.onclick=()=>islem("friend_suggestion_hide",
{p_character:b.dataset.oneriGizle},\u00E7("\xD6neri gizlendi."),!0);$("#mekan-ad-ayar",kap).onchange=e=>ayar("place_settings_set",{p_hide_name:e.target.checked},!0);for(const b of $$("[data-meydan-eng\
el]",kap))b.onclick=()=>islem("square_unblock",{p_ref:b.dataset.meydanEngel},\u00E7("Meydan engeli kald\u0131r\u0131ld\u0131."),!0)}async function ayar(fn,args,anahtarli=!1){try{await(anahtarli?Sunucu.
yap(fn,args):Sunucu.cagir(fn,args)),tost(\u00E7("Ayar kaydedildi."),"badge-check")}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}async function islem(fn,args,mesaj,anahtarli=!1){try{await(anahtarli?
Sunucu.yap(fn,args):Sunucu.cagir(fn,args)),tost(mesaj,"users-round")}catch(e){tost(hataMetni(e),"circle-alert")}await tazele()}const tazele=tazeleyici(async()=>{await yukle(),ciz()});await yukle(),ciz();
const saat=setInterval(async()=>{document.hidden||!foto.el.isConnected||(v.foto=await Sunucu.cagir("friends_photo").catch(()=>v.foto),foto.yaz({foto:v.foto,gorunus:v.gorunus,ozet:Durum.v.ozet,asker:v.
asker,baglar:v.baglar}))},12e4),b1=Durum.dinle("olay",({olay})=>{/^(friend\.|bond\.|homeparty\.)/.test(olay)&&tazele()});return()=>{b1(),clearInterval(saat),foto.kapat(),davetSayac?.()}}}),Parcalar.tamam(
"ek_30_meydan");
