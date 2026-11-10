// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (uc_98zzn_istasyon3b.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";function istasyon3bKur(THREE,cizici){if(!cizici.kur())throw new Error("webgl-yok");const sahne=new THREE.Scene,kamera=new THREE.PerspectiveCamera(30,1,.1,80);let w=1,h=1,kirli=!0,kapEl=null,gorunur=!0,
gozcu=null,hareketli=!1,d=istasyonVerisi(null);const M=(renk,ek={})=>new THREE.MeshStandardMaterial({color:renk,roughness:.8,...ek}),kutu=(ust,gx,gy,gz,mat,x=0,y=0,z=0)=>{const m=new THREE.Mesh(new THREE.
BoxGeometry(gx,gy,gz),typeof mat=="string"?M(mat):mat);return m.position.set(x,y+gy/2,z),m.castShadow=!0,m.receiveShadow=!0,ust.add(m),m};sahne.background=new THREE.Color("#CFE3EC"),sahne.add(new THREE.
HemisphereLight(UC_RENK.gokIc,UC_RENK.yerIc,1.2));const gunes=new THREE.DirectionalLight("#FFF1D8",2);gunes.position.set(-6,12,8),gunes.castShadow=!0,gunes.shadow.mapSize.set(1024,1024),Object.assign(
gunes.shadow.camera,{left:-14,right:14,top:10,bottom:-10}),sahne.add(gunes,gunes.target);const zemin=kutu(sahne,40,.2,16,M("#B9B3A4",{roughness:.95}),0,-.2,0);zemin.castShadow=!1;const istasyon=new THREE.
Group;sahne.add(istasyon),kutu(istasyon,9,3.4,1.6,M("#E9DCC3"),0,0,-4.2),kutu(istasyon,9.4,.18,2,M("#8C5A3C"),0,3.4,-4.2);for(let i=0;i<6;i++)kutu(istasyon,.7,1.1,.06,M("#26394A",{roughness:.3}),-3.75+
i*1.5,.35,-3.38);const tc=document.createElement("canvas");tc.width=1024,tc.height=256;const tx=tc.getContext("2d"),tt=new THREE.CanvasTexture(tc);tt.colorSpace=THREE.SRGBColorSpace,tt.anisotropy=4;const tabela=new THREE.
Mesh(new THREE.PlaneGeometry(4.6,1.15),new THREE.MeshBasicMaterial({map:tt}));tabela.position.set(0,2.72,-3.37),istasyon.add(tabela),kutu(istasyon,12,.3,1.8,M("#D8CDB8"),0,0,-2.4),kutu(istasyon,12,.02,
.12,M("#E3B23C"),0,.3,-1.56),kutu(istasyon,12,.08,1.6,M("#8C5A3C"),0,2,-2.5);for(const x of[-5.5,-2.75,0,2.75,5.5])kutu(istasyon,.1,1.7,.1,M("#5B6168"),x,.3,-1.85);const HAT_Z=[-.9,.5,1.9],rayMat=M("#\
6B6259",{metalness:.4,roughness:.4});for(const z of HAT_Z)for(const dz of[-.28,.28])kutu(istasyon,40,.06,.06,rayMat,0,0,z+dz);const traversGeo=new THREE.BoxGeometry(.16,.04,.8),traversler=new THREE.InstancedMesh(
traversGeo,M("#6B4F36"),HAT_Z.length*60);{const m=new THREE.Matrix4;let i=0;for(const z of HAT_Z)for(let k=0;k<60;k++)traversler.setMatrixAt(i++,m.makeTranslation(-20+k*.68,0,z))}traversler.receiveShadow=
!0,istasyon.add(traversler),kutu(istasyon,40,.03,1.2,M("#5E5A55",{roughness:.9}),0,0,3.4);const liman=new THREE.Group;sahne.add(liman);const su=new THREE.Mesh(new THREE.BoxGeometry(44,.2,5.2),M(IST_SU,
{roughness:.35,metalness:.1}));su.position.set(0,-.08,6.8),su.receiveShadow=!0,liman.add(su),kutu(liman,44,.26,.34,M("#8C8577",{roughness:.9}),0,-.06,4.25);for(const x of[-4.5,-1.5,1.5,4.5])kutu(liman,
.16,.34,.16,M("#4A4640"),x,0,4.32);const ISKELE_X=[-2.6,2.6],trenMat=M(IST_TREN,{roughness:.5}),vagonMat=M(IST_VAGON,{roughness:.6}),camMat=M("#26394A",{roughness:.3}),yildizMat=new THREE.MeshStandardMaterial(
{color:"#D9B865",emissive:new THREE.Color("#7A5418"),emissiveIntensity:.4,metalness:.5,roughness:.3}),seritMat=M("#C65A3B");function trenKur(){const g=new THREE.Group,lok=new THREE.Group;kutu(lok,1.7,
.9,.8,trenMat,0,.12,0),kutu(lok,.5,.36,.82,camMat,.45,.62,0),kutu(lok,1.72,.08,.82,seritMat,0,.5,0),g.add(lok);const vagonlar=[];for(let i=0;i<4;i++){const v=new THREE.Group;kutu(v,1.8,.85,.76,vagonMat,
0,.12,0),kutu(v,1.5,.22,.78,camMat,0,.55,0),v.position.x=-1.85*(i+1),g.add(v),vagonlar.push(v)}const yildiz=new THREE.Mesh(new THREE.OctahedronGeometry(.16),yildizMat);return yildiz.position.set(0,1.35,
0),g.add(yildiz),g.visible=!1,istasyon.add(g),{g,vagonlar,yildiz}}function gemiKur(){const g=new THREE.Group;kutu(g,3.2,.5,1.2,M("#F4F1E8",{roughness:.5}),0,-.2,0),kutu(g,3.22,.1,1.22,M("#23395B"),0,-.2,
0),kutu(g,1.3,.55,.9,M("#E9E0CE"),-.3,.3,0),kutu(g,.24,.55,.24,M(IST_TREN),.35,.85,0);const yildiz=new THREE.Mesh(new THREE.OctahedronGeometry(.16),yildizMat);return yildiz.position.set(0,1.7,0),g.add(
yildiz),g.visible=!1,liman.add(g),{g,yildiz}}const trenler=[trenKur(),trenKur(),trenKur()],gemiler=[gemiKur(),gemiKur()],ozeller=[new THREE.Group,new THREE.Group,new THREE.Group,new THREE.Group,new THREE.
Group];for(const o of ozeller)o.visible=!1,sahne.add(o),o.userData.anahtar="";function ozelYaz(o,arac){const a=arac?`${arac.tur}:${arac.renk}`:"";if(o.userData.anahtar===a)return;o.userData.anahtar=a;
for(const c of[...o.children])o.remove(c),aracBirak(c);if(!arac)return;const m=aracModeli(THREE,arac.tur,aracRengi(arac.renk));m.rotation.y=Math.PI/2,m.scale.setScalar(arac.tur==="otomobil"?1:arac.tur===
"tekne"?1.05:1.25),o.add(m)}const kalabalik=kalabalikKur(THREE,18);sahne.add(kalabalik.grup);function kalabalikYaz(){const r=rastgele(ozet(String(d.bolge??""))+3),bekleyen=Math.min(12,d.bekleyen),yeni=Math.
min(6,d.peron),liste=[];for(let i=0;i<bekleyen;i++)liste.push({x:-5+r()*10,z:-2.9+r()*.9,y:.3,yon:Math.PI*(.6+r()*.8),olcek:.62,eylem:"bekle"});for(let i=0;i<yeni;i++)liste.push({y:.3,olcek:.62,eylem:"\
yuru",hiz:.35,yol:[[-5+i*1.6,-1.9],[-4+i*1.6,-2.6],[-1.5+i*.6,-3.2]],faz:r()});kalabalik.yaz(liste)}function tabelaYaz(){tx.fillStyle="#1F2A2E",tx.fillRect(0,0,tc.width,tc.height),tx.fillStyle="#E3B23\
C",tx.fillRect(0,0,tc.width,6),tx.fillRect(0,tc.height-6,tc.width,6);const sutun=(liste,baslik,x0,top)=>{if(tx.textAlign="left",tx.textBaseline="middle",tx.fillStyle="#E3B23C",tx.font="800 34px Figtre\
e, system-ui, sans-serif",tx.fillText(`${baslik}${top?` \xB7 ${top}`:""}`,x0,34,470),tx.font="600 30px ui-monospace, Menlo, Consolas, monospace",!liste.length){tx.fillStyle="#9FB4B0",tx.fillText("\u2014",
x0,82);return}liste.slice(0,4).forEach((x,i)=>{tx.fillStyle=x.me?"#FBE6A2":"#E9F1EF";const yer=bolgeAdi(x.to??x.from);tx.fillText(`${istSaat(x.at)}  ${yer.length>16?yer.slice(0,15)+"\u2026":yer}${x.passengers>
1?` \xD7${x.passengers}`:""}`,x0,82+i*44,470)})};sutun(d.kalkis,\u00E7("Kalk\u0131\u015F"),24,d.kalkisTop),tx.fillStyle="#3A4A4E",tx.fillRect(510,18,3,tc.height-36),sutun(d.varis,\u00E7("Var\u0131\u015F"),
532,d.varisTop),tt.needsUpdate=!0}function yerYaz(t){const simdi=istasyonSimdi(d),yerli=istasyonYerlestir(d);hareketli=!1;const kullanilan=new Set;let oz=0;for(const a of yerli){const an=istasyonAn(a,
simdi);if(!an)continue;hareketli||=an.hareket;const ox=0;if(a.yer.tur==="hat"&&!kullanilan.has("h"+a.yer.i)){kullanilan.add("h"+a.yer.i);const tr=trenler[a.yer.i];tr.g.visible=!0,tr.vagonlar.forEach((v,i)=>{
v.visible=i<Math.min(4,a.yolcu)}),tr.yildiz.visible=a.ben,tr.g.position.set(ox+3+an.u*16,.04,HAT_Z[a.yer.i]),tr.yildiz.rotation.y=t*1.5}else if(a.yer.tur==="iskele"&&!kullanilan.has("i"+a.yer.i)&&!a.arac){
kullanilan.add("i"+a.yer.i);const gm=gemiler[a.yer.i];gm.g.visible=d.liman,gm.yildiz.visible=a.ben,gm.g.position.set(ISKELE_X[a.yer.i]+an.u*16,Math.sin(t*1.4+a.yer.i)*.04,5.2+Math.abs(an.u)*1.4),gm.g.
rotation.y=an.u<0?.12:an.u>0?-.12:0}else if(a.arac&&oz<ozeller.length){const o=ozeller[oz++];ozelYaz(o,a.arac),o.visible=!0,a.deniz?o.position.set((oz-1)*1.8+an.u*16,-.2+Math.sin(t*1.6)*.03,6.4):o.position.
set(ox+(oz-1)*1.6-1.6+an.u*16,.02,3.4),o.rotation.y=(an.u<0,0),an.hareket&&!hareketAzalt&&aracTekerDondur(o.children[0],.2)}}trenler.forEach((tr,i)=>{kullanilan.has("h"+i)||(tr.g.visible=!1)}),gemiler.
forEach((gm,i)=>{kullanilan.has("i"+i)||(gm.g.visible=!1)});for(let i=oz;i<ozeller.length;i++)ozeller[i].visible=!1;if(kalabalik.guncelle(hareketAzalt?0:t),kapEl){const n=yerli.filter(a=>istasyonAn(a,
simdi)).length;kapEl.dataset.arac!==String(n)&&(kapEl.dataset.arac=String(n))}}const YON=new THREE.Vector3(0,.62,1).normalize();function kameraKur(){kamera.aspect=w/h;const x=w/h<1.3?5.2:7.5,on=d.liman?
6.6:3.9,V=a=>a.map(p=>new THREE.Vector3(...p));kameraSigdir(THREE,kamera,V([[-x,0,on],[x,0,on],[-x,3.6,-5],[x,3.6,-5]]),YON,{x:.98,ust:.96,alt:-.97}),kirli=!0}return{get etiket(){return d.liman?\u00E7(
"Liman ve istasyon (3B): trenler, gemiler, tabela"):\u00E7("\u0130stasyon (3B): trenler ve tabela")},sahne,kamera,get kareMs(){return!gorunur||hareketAzalt?1e3:hareketli?telefon()?50:33:400},kapBagla(el){
kapEl=el??null,gozcu?.disconnect(),gozcu=null,kapEl&&typeof IntersectionObserver<"u"&&(gozcu=new IntersectionObserver(g=>{gorunur=g.some(x=>x.isIntersecting),kirli=!0}),gozcu.observe(kapEl)),kapEl&&(kapEl.
dataset.liman=d.liman?"1":"0"),kirli=!0},durumYaz(y){const limanDegisti=!!y.liman!==d.liman;d={...d,...y},liman.visible=d.liman,tabelaYaz(),kalabalikYaz(),limanDegisti&&kameraKur(),kapEl&&(kapEl.dataset.
liman=d.liman?"1":"0",kapEl.dataset.bekleyen=String(Math.min(12,d.bekleyen)),kapEl.dataset.peron=String(Math.min(6,d.peron))),yerYaz(performance.now()/1e3),kirli=!0},kalite(k){gunes.castShadow=k!=="du\
suk",kirli=!0},boyut(gen,yuk){w=gen,h=yuk,kameraKur()},etkinlestir(acik){acik&&(kirli=!0)},guncelle(dt,t){gorunur&&(yerYaz(t),kirli=!0)},cizilmeli(){const c=kirli;return kirli=!1,c}}}Parcalar.tamam("u\
c_98zzn_istasyon3b");
