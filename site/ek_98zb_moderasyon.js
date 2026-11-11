// Civora istemcisi 2026-11-11-4846b754-5664247 (ek_98zb_moderasyon.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";Kabuk.kaydet("hayat/moderasyon",{async ac(kap){const roller=Durum.v.ozet?.character?.staff??[],moderator=roller.some(r=>r==="moderator"||r==="admin"),teknik=roller.some(r=>["admin","release","support"].
includes(r)),v={genel:null,sekme:moderator?"rapor":"sunucu",tur:null,kuyruk:null,bekleyen:null,arama:"",sonuc:null,kayit:null,kayitSonu:!1,sunucu:null,isler:!1,guven:null,guvenTur:null};try{const s=sessionStorage.
getItem("civora.moderasyon");(moderator&&["rapor","bekleyen","inceleme","oyuncu","kayit"].includes(s)||teknik&&s==="sunucu")&&(v.sekme=s)}catch{}await Durum.kurallar().catch(()=>null);async function yukle(){
v.genel=moderator?await Sunucu.cagir("mod_overview"):{roles:roller,is_admin:roller.includes("admin")},v.sekme==="rapor"?v.kuyruk=await Sunucu.cagir("mod_queue",{p_kind:v.tur,p_limit:100}):v.sekme==="b\
ekleyen"?v.bekleyen=await Sunucu.cagir("mod_pending"):v.sekme==="kayit"?(v.kayit=await Sunucu.cagir("mod_log",{p_before:null,p_limit:50}),v.kayitSonu=v.kayit.length<50):v.sekme==="inceleme"?v.guven=await Sunucu.
cagir("mod_trust",{p_kind:null}):v.sekme==="sunucu"&&([v.sunucu,v.ekonomi]=await Promise.all([Sunucu.cagir("ops_status"),Sunucu.cagir("economy_balance",{p_days:14}).catch(()=>null)]))}const sonra=Object.
assign(async()=>{await tazele()},{get genel(){return v.genel}});function raporlarHtml(){const l=v.kuyruk?.items??[];v.tur||(v.turVar=[...new Set(l.map(x=>x.kind))]);const turler=(v.turVar??[]).length>
1||v.tur?v.turVar??[]:[];return`${turler.length?`<div class="secim-sec mod-turler" style="margin-bottom:10px">${[null,...turler].map(k=>`<button class="secim-cip" type="button" data-mod-tur="${k??""}"\
 aria-pressed="${v.tur===k}">${esc(k?RAPOR_TUR[k]:\u00E7("T\xFCm\xFC"))}</button>`).join("")}</div>`:""}
        <div class="yigin">${l.map(x=>`<div class="mod-satir" data-mod-rapor="${esc(x.report_id)}" role="button" tabindex="0">
            <div class="satir" style="gap:8px;flex-wrap:wrap;align-items:center"><span class="cip">${esc(RAPOR_TUR[x.kind]??x.kind)}</span>
              <b>${\u00E7("{n} rapor",{n:Number(x.count)})}</b><span class="kucuk">${esc(zamanOnce(x.last_at))}</span>
              ${x.state?.hidden?`<span class="cip">${\u00E7("gizli")}</span>`:""}${Number(x.target_sanctions)?`<span class="cip mercan">${\u00E7("yapt\u0131r\u0131ml\u0131")}</span>`:""}</div>
            <p class="mod-alinti">${esc(modAlinti(x.snapshot,x.state))||`<span class="kucuk">${\u00E7("Metin yok")}</span>`}</p>
            <p class="kucuk">${esc(x.target_name??"")} \xB7 ${esc(modNedenler(x.reasons))}${x.note?" \xB7 \u201C"+esc(String(x.note).slice(0,80))+"\u201D":""}</p></div>`).join("")||`<p class="bos">${\u00E7(
"A\xE7\u0131k rapor yok.")}</p>`}</div>`}function bekleyenHtml(){const b=v.bekleyen??{},kart=(s,dugmeler)=>`<div class="yaptirim-kart"><div class="satir" style="justify-content:space-between;gap:8px;f\
lex-wrap:wrap"><b>${esc(s.name??"")} \xB7 ${esc(yaptirimAdi(s))}</b>
          <span class="kucuk">${esc(saatYaz(s.created_at))} \xB7 ${esc(modAktor(s.created_by))}</span></div>
          <p>${esc(s.reason??"")}</p>${s.appeal_text?`<p class="mod-alinti">${esc(s.appeal_text)}</p>`:""}
          <div class="oneri-dugmeler">${dugmeler}</div></div>`;return`<p class="ust-yazi">${\u00E7("Onay bekleyen ask\u0131lar ({n})",{n:(b.approvals??[]).length})}</p>
        <div class="yigin">${(b.approvals??[]).map(s=>kart(s,`<button class="dugme kucuk-d" type="button" data-mod-onay="${esc(s.sanction_id)}|1">${ikon("check")}${\u00E7("Onayla")}</button>
          <button class="dugme sade kucuk-d" type="button" data-mod-onay="${esc(s.sanction_id)}|0">${\u00E7("Onaylama")}</button>`)).join("")||`<p class="bos">${\u00E7("Onay bekleyen yok.")}</p>`}</di\
v>
        <p class="ust-yazi" style="margin-top:14px">${\u00E7("\u0130tirazlar ({n})",{n:(b.appeals??[]).length})}</p>
        <div class="yigin">${(b.appeals??[]).map(s=>kart(s,`<button class="dugme kucuk-d" type="button" data-mod-itiraz="${esc(s.sanction_id)}|1">${ikon("undo-2")}${\u00E7("Kabul et, kald\u0131r")}</b\
utton>
          <button class="dugme sade kucuk-d" type="button" data-mod-itiraz="${esc(s.sanction_id)}|0">${\u00E7("Reddet, s\xFCrs\xFCn")}</button>`)).join("")||`<p class="bos">${\u00E7("Bekleyen itiraz y\
ok.")}</p>`}</div>
        <p class="ust-yazi" style="margin-top:14px">${\u00E7("\u0130ncelenecek y\xF6netici kararlar\u0131 ({n})",{n:(b.reviews??[]).length})}</p>
        <div class="yigin">${(b.reviews??[]).map(s=>kart(s,`<button class="dugme kucuk-d" type="button" data-mod-incele="${esc(s.sanction_id)}">${ikon("badge-check")}${\u00E7("\u0130ncelendi")}</butto\
n>
          <button class="dugme sade kucuk-d" type="button" data-mod-kaldir="${esc(s.sanction_id)}">${\u00E7("Kald\u0131r")}</button>`)).join("")||`<p class="bos">${\u00E7("\u0130ncelenecek karar yok.")}\
</p>`}</div>`}function oyuncuHtml(){return`<form class="sohbet-yaz" id="mod-ara" novalidate><input name="q" minlength="2" maxlength="24" placeholder="${\u00E7("Oyuncu ad\u0131 (en az 2 harf)")}" value\
="${esc(v.arama)}" autocomplete="off" aria-label="${\u00E7("Oyuncu ad\u0131")}">
          <button class="dugme" type="submit" aria-label="${\u00E7("Ara")}">${ikon("zoom-in")}</button></form>
        ${v.sonuc?`<div class="koltuk-liste" style="margin-top:12px">${v.sonuc.map(x=>`<div class="koltuk">${avatarKutu(x.name,x.character_id)}<div><button class="baglanti" type="button" data-mod-oyun\
cu="${esc(x.character_id)}"><b>${esc(x.name)}</b></button>
            <div class="kucuk">${esc(ulkeAdi(x.country_id))}${x.deleted?" \xB7 "+\u00E7("silinmi\u015F"):""}${Number(x.active_sanctions)?" \xB7 "+\u00E7("{n} y\xFCr\xFCrl\xFCkte yapt\u0131r\u0131m",{n:Number(
x.active_sanctions)}):""}${Number(x.reports_30d)?" \xB7 "+\u00E7("30 g\xFCnde {n} rapor",{n:Number(x.reports_30d)}):""}</div></div><span></span></div>`).join("")||`<p class="bos">${\u00E7("Bulunamad\u0131.")}\
</p>`}</div>`:""}`}function incelemeHtml(){const g=v.guven??{},l=(g.items??[]).filter(f=>!v.guvenTur||f.kind===v.guvenTur),sayi=k=>(g.items??[]).filter(f=>f.kind===k).length,yeniSayi=Object.values(g.counts??
{}).reduce((a,b)=>a+Number(b),0);return`<p class="aciklama">${\u00E7("Para a\u011F\u0131 bulgular\u0131: otomatik ceza yoktur. Ayn\u0131 ev ya da ayn\u0131 internet hatt\u0131 tek ba\u015F\u0131na ceza de\u011Fildir; bulguya bak, gerekirse oyunc\
unun kart\u0131ndan yapt\u0131r\u0131m ver. \u0130nceledi\u011Fin bulguya not d\xFC\u015F; yeni hareket gelirse bulgu yeniden a\xE7\u0131l\u0131r.")}</p>
        <p class="kucuk" style="margin:6px 0 10px">${esc(\u00E7("Son {g} g\xFCn \xB7 {n} yeni bulgu",{g:Number(g.rules?.windowDays??14),n:yeniSayi}))}</p>
        <div class="secim-sec mod-turler" style="margin-bottom:10px">${[null,...Object.keys(GUVEN_TUR)].map(k=>`<button class="secim-cip" type="button" data-guven-tur="${k??""}" aria-pressed="${v.guvenTur===
k}">${esc(k?GUVEN_TUR[k]:\u00E7("T\xFCm\xFC"))}${k&&Number(g.counts?.[k])?` <b class="sayi-rozet">${Number(g.counts[k])}</b>`:k?` (${sayi(k)})`:` (${(g.items??[]).length})`}</button>`).join("")}</div>\

        <div class="yigin" id="guven-liste">${l.map(f=>`<div class="mod-satir guven-bulgu" data-guven="${esc(f.kind)}|${esc(f.ref)}" data-yeni="${f.fresh?1:0}">
            <div class="satir" style="gap:8px;flex-wrap:wrap;align-items:center"><span class="cip">${esc(GUVEN_TUR[f.kind]??f.kind)}</span>
              ${f.fresh?`<span class="cip mercan">${f.review?\u00E7("yeni hareket"):\u00E7("yeni")}</span>`:`<span class="cip">${\u00E7("incelendi")}</span>`}
              <span class="kucuk">${esc(zamanOnce(f.last_at))}</span></div>
            <p>${esc(guvenOzet(f))}</p>
            <div class="satir" style="gap:6px;flex-wrap:wrap">${(f.people??[]).map(k=>`<button class="baglanti" type="button" data-mod-oyuncu="${esc(k.character_id)}">${esc(k.name)}</button>${Date.parse(
k.created_at)>Date.now()-30*864e5?` <span class="kucuk">${\u00E7("yeni hesap")}</span>`:""}${k.deleted?` <span class="kucuk">${\u00E7("silinmi\u015F")}</span>`:""}`).join(" \xB7 ")}</div>
            ${f.review?`<p class="kucuk">${esc(\u00E7("\u0130ncelendi: {ad}, {zaman}",{ad:modAktor(f.review.by),zaman:saatYaz(f.review.at)}))} \u2014 \u201C${esc(String(f.review.note??"").slice(0,200))}\
\u201D</p>`:""}
            ${f.self?`<p class="kucuk">${\u00E7("Bu bulguda sen de vars\u0131n; ba\u015Fka bir yetkili inceler.")}</p>`:f.fresh?`<div class="oneri-dugmeler"><button class="dugme kucuk-d" type="button"\
 data-guven-incele="${esc(f.kind)}|${esc(f.ref)}">${ikon("badge-check")}${\u00E7("\u0130ncelendi")}</button></div>`:""}
          </div>`).join("")||`<p class="bos">${v.guvenTur?\u00E7("Bu t\xFCrde bulgu yok."):\u00E7("Bulgu yok.")}</p>`}</div>`}function kayitHtml(){return`<ul class="mod-kayit">${(v.kayit??[]).map(x=>`\
<li>${esc(saatYaz(x.at))} \xB7 <b>${esc(modAktor(x.actor))}</b> \xB7 ${esc(MOD_KAYIT[x.action]??x.action)}${x.target_name?" \xB7 "+esc(x.target_name):""}${x.reason?` \u2014 ${esc(x.reason)}`:""}</li>`).
join("")||`<li>${\u00E7("Kay\u0131t yok.")}</li>`}</ul>
        ${v.kayitSonu?"":`<button class="dugme ikincil kucuk-d" type="button" id="mod-kayit-daha">${\u00E7("Daha eski")}</button>`}`}function sunucuHtml(){const s=v.sunucu??{},w=s.window??{},b=s.backlog??
{},acik=s.open??[],gecmis=s.history??[],isler=s.jobs??[],gecikmis=isler.filter(j=>j.late||j.last_status==="error"||j.last_status==="alarm"),uyari=(a,kapali=!1)=>`<div class="mod-satir ops-uyari${kapali?
" kapali":""}" data-ops-uyari="${esc(a.id)}">
          <div class="satir" style="gap:8px;flex-wrap:wrap;align-items:center">${ikon(kapali?"badge-check":"siren")}<b>${esc(opsMetin(a.kind,a.key,a.detail))}</b></div>
          <p class="kucuk">${esc(a.kind)}${a.key?" \xB7 "+esc(a.key):""} \xB7 ${kapali?\u00E7("{a} \u2013 {k}",{a:esc(saatYaz(a.opened_at)),k:esc(saatYaz(a.closed_at))}):\u00E7("{zaman} saatinden beri",
{zaman:esc(saatYaz(a.opened_at))})+(a.updated_at?" \xB7 "+\u00E7("son g\xF6r\xFClme {zaman}",{zaman:esc(zamanOnce(a.updated_at))}):"")}</p></div>`,yavas=(w.slow??[]).filter(x=>Number(x.calls)>0),ci=w.
client??{},oda=s.room??{},son=oda.last,odaDurum=oda.enabled?oda.measured?son?son.ok?\u00E7("sa\u011Flam (son yoklama {zaman})",{zaman:zamanOnce(son.at)}):\u00E7("yan\u0131t vermiyor: {hata} (son yoklama {z\
aman})",{hata:opsYoklama(son.error,son.status),zaman:zamanOnce(son.at)}):\u00E7("a\xE7\u0131k; ilk yoklama bekleniyor"):\u00E7("a\xE7\u0131k; veritaban\u0131ndan yoklanm\u0131yor (pg_net yok), d\u0131\u015F izleyici yoklar"):
\u00E7("kapal\u0131 (y\xFCr\xFCme Supabase'ten)");return`<p class="ust-yazi">${\u00E7("A\xE7\u0131k uyar\u0131lar ({n})",{n:acik.length})}</p>
        <div class="yigin" id="ops-acik">${acik.map(a=>uyari(a)).join("")||`<p class="bos">${\u00E7("Uyar\u0131 yok.")}${s.checked_at?" "+\u00E7("Son denetim {zaman}.",{zaman:esc(zamanOnce(s.checked_at))}):
""}</p>`}</div>
        ${ekonomiKarti(v.ekonomi)}
        <p class="ust-yazi" style="margin-top:14px">${\u00E7("Son {n} dakika",{n:Number(w.minutes??5)})}</p>
        <p id="ops-pencere">${\u00E7("{n} istek",{n:Number(w.count??0)})} \xB7 ${\u00E7("{n} sunucu hatas\u0131",{n:Number(w.errors??0)})} (%${Math.floor(Number(w.ppm??0)/1e4)})${w.mean_ms!=null?" \xB7 "+
\u00E7("ortalama {ms} ms",{ms:Number(w.mean_ms)}):""}
          ${s.measured?"":`<span class="kucuk">\xB7 ${\u00E7("api \xF6l\xE7\xFCm\xFC yok (say\u0131 i\u015Flem sayac\u0131ndan; yava\u015F istek \xF6l\xE7\xFClmez)")}</span>`}</p>
        <p class="kucuk" id="ops-istemci">${esc(\u00E7("\u0130stemcinin bildirdi\u011Fi: {s} sunucu hatas\u0131 \xB7 {g} oyun kural\u0131 reddi \xB7 {a} a\u011F hatas\u0131 ({o} oyuncu)",{s:Number(ci.
system??0),g:Number(ci.game??0),a:Number(ci.network??0),o:Number(ci.chars??0)}))}
          \xB7 ${esc(\u00E7("veritaban\u0131n\u0131n \xF6teki geri almalar\u0131: {n} (uyar\u0131 a\xE7maz)",{n:Number(w.other_rollbacks??0)}))}</p>
        ${(ci.top??[]).length?`<p class="kucuk" id="ops-istemci-en">${\u00E7("En \xE7ok")}: ${ci.top.map(x=>`${esc(x.fn)} (${esc(OPS_TUR[x.kind]??x.kind)}, ${esc(x.code)}) ${Number(x.n)}`).join(" \xB7 ")}\
</p>`:""}
        ${yavas.length?`<p class="kucuk">${\u00E7("En yava\u015F")}: ${yavas.map(x=>`${esc(x.fn)} ${Number(x.mean_ms)} ms (${Number(x.calls)})`).join(" \xB7 ")}</p>`:""}
        <p class="kucuk" id="ops-dis">${\u00E7("D\u0131\u015F izleyicinin g\xF6rd\xFC\u011F\xFC durum")}: <b>${s.state==="CIVORA-SAGLAM"?\u00E7("sa\u011Flam"):\u00E7("sorun")}</b> \xB7 ${\u00E7("Oda s\
unucusu")}: ${esc(odaDurum)}</p>
        <p class="ust-yazi" style="margin-top:14px">${\u00E7("Bekleyen kay\u0131tlar")}</p>
        <p id="ops-bekleyen">${[["contracts",\u00E7("s\xF6zle\u015Fme")],["market",\u00E7("ilan")],["travel",\u00E7("yolculuk")],["training",\u00E7("e\u011Fitim")],["outbox",\u00E7("yay\u0131n olay\u0131")]].
map(([k,ad])=>`${Number(b[k]??0)} ${esc(ad)}`).join(" \xB7 ")}${Number(b.outbox_oldest_s??0)>0?` (${\u00E7("en eskisi {n} sn",{n:Number(b.outbox_oldest_s)})})`:""}</p>
        <p class="ust-yazi" style="margin-top:14px">${\u00E7("Zamanlanm\u0131\u015F i\u015Fler ({n}; sorunlu {m})",{n:isler.length,m:gecikmis.length})}</p>
        ${gecikmis.length?`<div class="yigin" id="ops-sorunlu">${gecikmis.map(j=>`<div class="mod-satir"><b>${esc(j.job)}</b> \xB7 ${esc(j.late?\u00E7("gecikmi\u015F"):OPS_IS_DURUM[j.last_status]??j.last_status)}\

            \xB7 ${esc(j.last_finished_at?zamanOnce(j.last_finished_at):\u00E7("hi\xE7 \xE7al\u0131\u015Fmad\u0131"))}${j.last_error?`<p class="kucuk">${esc(j.last_error)}</p>`:""}</div>`).join("")}</\
div>`:""}
        <button class="dugme ikincil kucuk-d" type="button" id="ops-isler-ac" aria-expanded="${v.isler}">${ikon("list-ordered")}${v.isler?\u00E7("\u0130\u015Fleri gizle"):\u00E7("B\xFCt\xFCn i\u015Fler")}\
</button>
        ${v.isler?`<div class="tablo-kap" style="margin-top:8px"><table class="fis-tablo ops-isler" id="ops-isler"><thead><tr><th>${\u00E7("\u0130\u015F")}</th><th>${\u00E7("Takvim")}</th><th>${\u00E7(
"Son biti\u015F")}</th><th>${\u00E7("Durum")}</th><th>${\u00E7("S\xFCre")}</th></tr></thead>
          <tbody>${isler.map(j=>`<tr${j.late||j.last_status&&j.last_status!=="ok"?' class="sorunlu"':""}><td>${esc(j.job)}</td><td>${esc(j.schedule)}</td><td>${esc(j.last_finished_at?zamanOnce(j.last_finished_at):
"\u2014")}</td>
            <td>${esc(j.late?\u00E7("gecikmi\u015F"):OPS_IS_DURUM[j.last_status]??"\u2014")}</td><td>${j.last_ms!=null?\u00E7("{ms} ms",{ms:Number(j.last_ms)}):"\u2014"}</td></tr>`).join("")}</tbody><\
/table></div>`:""}
        <p class="ust-yazi" style="margin-top:14px">${\u00E7("Son kapanan uyar\u0131lar ({n})",{n:gecmis.length})}</p>
        <div class="yigin" id="ops-gecmis">${gecmis.slice(0,10).map(a=>uyari(a,!0)).join("")||`<p class="bos">${\u00E7("Kapanan uyar\u0131 yok.")}</p>`}</div>`}function ciz(){const g=v.genel,sekmeler=[
...moderator?[["rapor",\u00E7("Raporlar"),Number(g.open_subjects??0)],["bekleyen",\u00E7("Onay ve itiraz"),Number(g.pending_approvals??0)+Number(g.pending_appeals??0)+Number(g.review_needed??0)],["inc\
eleme",\u00E7("\u0130nceleme"),Object.values(v.guven?.counts??{}).reduce((a,b)=>a+Number(b),0)],["oyuncu",\u00E7("Oyuncu"),0],["kayit",\u00E7("Kay\u0131t"),0]]:[],...teknik?[["sunucu",\u00E7("Sunucu"),
(v.sunucu?.open??[]).length]]:[]];kap.innerHTML=`<div class="sayfa sayfa-dar">
        <div class="sayfa-bas"><div><p class="ust-yazi">${\u00E7("Hayat\u0131m")}</p><h1 class="b1">${\u00E7("Moderasyon")}</h1>
          <p class="aciklama">${\u00E7("Raporlara bak, gerek\xE7eyle karar ver. Her i\u015Flem kayda ge\xE7er. Kendinle ilgili kay\u0131tta i\u015Flem yapamazs\u0131n; a\u011F\u0131r ask\u0131y\u0131 ikinci bir yetkili onaylar.")}\
</p></div>
          <button class="dugme ikincil kucuk-d" type="button" id="mod-yenile">${ikon("rotate-cw")}${\u00E7("Yenile")}</button></div>
        <p class="kucuk" id="mod-ozet">${moderator?`${\u00E7("{n} a\xE7\u0131k konu ({r} rapor)",{n:Number(g.open_subjects??0),r:Number(g.open_reports??0)})} \xB7 ${\u00E7("{n} onay bekleyen",{n:Number(
g.pending_approvals??0)})} \xB7 ${\u00E7("{n} itiraz",{n:Number(g.pending_appeals??0)})} \xB7 ${\u00E7("{n} inceleme",{n:Number(g.review_needed??0)})}`:\u00E7("Teknik yetki: sunucu panosu")}${g.is_admin?
" \xB7 "+\u00E7("y\xF6netici"):""}</p>
        <div class="secim-sec" role="tablist" style="margin:10px 0">${sekmeler.map(([k,ad,n])=>`<button class="secim-cip" type="button" data-mod-sekme="${k}" aria-pressed="${v.sekme===k}">${esc(ad)}${n?
` <b class="sayi-rozet">${n}</b>`:""}</button>`).join("")}</div>
        <section class="kart" id="mod-icerik">${v.sekme==="rapor"?raporlarHtml():v.sekme==="bekleyen"?bekleyenHtml():v.sekme==="inceleme"?incelemeHtml():v.sekme==="oyuncu"?oyuncuHtml():v.sekme==="sunu\
cu"?sunucuHtml():kayitHtml()}</section></div>`,bagla()}function bagla(){$("#mod-yenile",kap).onclick=()=>tazele();for(const b of $$("[data-mod-sekme]",kap))b.onclick=async()=>{v.sekme=b.dataset.modSekme;
try{sessionStorage.setItem("civora.moderasyon",v.sekme)}catch{}await tazele()};for(const b of $$("[data-mod-tur]",kap))b.onclick=async()=>{v.tur=b.dataset.modTur||null,await tazele()};for(const b of $$(
"[data-guven-tur]",kap))b.onclick=()=>{v.guvenTur=b.dataset.guvenTur||null,ciz()};for(const b of $$("[data-guven-incele]",kap))b.onclick=()=>{const[tur,ref]=[b.dataset.guvenIncele.slice(0,b.dataset.guvenIncele.
indexOf("|")),b.dataset.guvenIncele.slice(b.dataset.guvenIncele.indexOf("|")+1)];modGerekce({baslik:\u00E7("Bulgu incelendi"),aciklama:esc(\u00E7("Notun kayda ge\xE7er; ceza de\u011Fildir. Yapt\u0131r\u0131m gerekiyors\
a oyuncunun kart\u0131ndan ver.")),onayAd:\u00E7("\u0130ncelendi"),is:async not=>{await Sunucu.yap("mod_trust_review",{p_kind:tur,p_ref:ref,p_note:not}),tost(\u00E7("Bulgu incelendi."),"badge-check"),
await tazele()}})};for(const s of $$("[data-mod-rapor]",kap))s.onclick=()=>modRaporAc(s.dataset.modRapor,sonra),s.onkeydown=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),s.click())};for(const b of $$(
"[data-mod-onay]",kap))b.onclick=()=>{const[id,evet]=b.dataset.modOnay.split("|");modGerekce({baslik:evet==="1"?\u00E7("Ask\u0131 onaylans\u0131n m\u0131?"):\u00E7("Ask\u0131 onaylanmas\u0131n m\u0131?"),
aciklama:esc(evet==="1"?\u00E7("Onaylay\u0131nca ask\u0131 ba\u015Flar."):\u00E7("Ask\u0131 ba\u015Flamaz; kay\u0131t reddedildi olarak kal\u0131r.")),onayAd:evet==="1"?\u00E7("Onayla"):\u00E7("Onayla\
ma"),onaySinif:evet==="1"?"mercan":"ikincil",is:async g=>{await Sunucu.yap("mod_sanction_approve",{p_sanction:id,p_approve:evet==="1",p_note:g}),tost(evet==="1"?\u00E7("Ask\u0131 onayland\u0131."):\u00E7(
"Ask\u0131 onaylanmad\u0131."),"badge-check"),await tazele()}})};for(const b of $$("[data-mod-itiraz]",kap))b.onclick=()=>{const[id,kaldir]=b.dataset.modItiraz.split("|");modGerekce({baslik:kaldir==="\
1"?\u00E7("\u0130tiraz kabul edilsin mi?"):\u00E7("\u0130tiraz reddedilsin mi?"),aciklama:esc(\u00E7("Karar\u0131n ve notun ki\u015Fiye bildirilir.")),onayAd:kaldir==="1"?\u00E7("Kabul et, kald\u0131r"):
\u00E7("Reddet, s\xFCrs\xFCn"),is:async g=>{await Sunucu.yap("mod_appeal_decide",{p_sanction:id,p_lift:kaldir==="1",p_note:g}),tost(\u00E7("\u0130tiraz karara ba\u011Fland\u0131."),"scale"),await tazele()}})};
for(const b of $$("[data-mod-incele]",kap))b.onclick=()=>modGerekce({baslik:\u00E7("Y\xF6neticinin karar\u0131 incelendi"),onayAd:\u00E7("\u0130ncelendi"),is:async g=>{await Sunucu.yap("mod_sanction_r\
eview",{p_sanction:b.dataset.modIncele,p_note:g}),tost(\u00E7("Karar incelendi."),"badge-check"),await tazele()}});for(const b of $$("[data-mod-kaldir]",kap))b.onclick=()=>modGerekce({baslik:\u00E7("Y\
apt\u0131r\u0131m kald\u0131r\u0131ls\u0131n m\u0131?"),onayAd:\u00E7("Kald\u0131r"),onayIkon:"undo-2",is:async g=>{await Sunucu.yap("mod_sanction_lift",{p_sanction:b.dataset.modKaldir,p_reason:g}),tost(
\u00E7("Yapt\u0131r\u0131m kald\u0131r\u0131ld\u0131."),"badge-check"),await tazele()}});$("#mod-ara",kap)?.addEventListener("submit",async e=>{if(e.preventDefault(),v.arama=String(new FormData(e.target).
get("q")??"").trim(),[...v.arama].length<2){tost(\u00E7("En az 2 harf yaz."),"circle-alert");return}try{v.sonuc=await Sunucu.cagir("mod_player_search",{p_query:v.arama}),ciz()}catch(err){tost(hataMetni(
err),"circle-alert")}});for(const b of $$("[data-mod-oyuncu]",kap))b.onclick=()=>modOyuncuAc(b.dataset.modOyuncu,sonra);$("#ops-isler-ac",kap)?.addEventListener("click",()=>{v.isler=!v.isler,ciz()}),$(
"#mod-kayit-daha",kap)?.addEventListener("click",async()=>{const son=(v.kayit??[]).at(-1);try{const x=await Sunucu.cagir("mod_log",{p_before:son?Number(son.id):null,p_limit:50});v.kayit=[...v.kayit??[],
...x],v.kayitSonu=x.length<50,ciz()}catch(err){tost(hataMetni(err),"circle-alert")}})}const tazele=tazeleyici(async()=>{await yukle(),ciz()});await yukle(),ciz();const saat=setInterval(()=>{!document.
hidden&&kap.isConnected&&!document.querySelector(".perde")&&tazele()},6e4);return()=>clearInterval(saat)}}),Parcalar.tamam("ek_98zb_moderasyon");
