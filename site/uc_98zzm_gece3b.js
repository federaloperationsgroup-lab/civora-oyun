// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (uc_98zzm_gece3b.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";function gece3bKur(THREE,cizici){if(!cizici.kur())throw new Error("webgl-yok");const sahne=new THREE.Scene,kamera=new THREE.PerspectiveCamera(30,1,.1,60);let w=1,h=1,kirli=!0,kapEl=null,gorunusDegisti=!1,
d=geceVerisi(null,"genel"),t0=performance.now(),asama="";const M=(renk,ek={})=>new THREE.MeshStandardMaterial({color:renk,roughness:.75,...ek}),kutu=(ust,gx,gy,gz,mat,x=0,y=0,z=0)=>{const m=new THREE.
Mesh(new THREE.BoxGeometry(gx,gy,gz),typeof mat=="string"?M(mat):mat);return m.position.set(x,y+gy/2,z),m.castShadow=!0,m.receiveShadow=!0,ust.add(m),m},tuvalDoku=(gen,yuk)=>{const c=document.createElement(
"canvas");c.width=gen,c.height=yuk;const t=new THREE.CanvasTexture(c);return t.colorSpace=THREE.SRGBColorSpace,t.anisotropy=4,{c,t,x:c.getContext("2d")}};sahne.background=new THREE.Color("#1E1A2B"),sahne.
add(new THREE.HemisphereLight(UC_RENK.gokIc,UC_RENK.yerIc,.8));const spot=new THREE.SpotLight("#FFF1D8",60,18,.55,.45,1.4);spot.position.set(0,7.5,4.5),spot.target.position.set(0,.8,-.3),spot.castShadow=
!0,spot.shadow.mapSize.set(1024,1024),sahne.add(spot,spot.target);const yanIsik=new THREE.DirectionalLight("#C9B8FF",.6);yanIsik.position.set(-5,4,3),sahne.add(yanIsik),kutu(sahne,9,.2,5.5,M("#3A2E24",
{roughness:.6}),0,-.2,0),kutu(sahne,1.4,.02,3.4,M("#9E2B2B",{roughness:1}),0,0,1.2);const perdeGeo=new THREE.PlaneGeometry(8.6,4.2,40,1);{const p=perdeGeo.attributes.position;for(let i=0;i<p.count;i++)
p.setZ(i,Math.sin(p.getX(i)*5)*.09);perdeGeo.computeVertexNormals()}const perde=new THREE.Mesh(perdeGeo,new THREE.MeshStandardMaterial({color:"#5A2338",roughness:.9,side:THREE.DoubleSide}));perde.position.
set(0,2.1,-2.2),perde.receiveShadow=!0,sahne.add(perde);const tabela=tuvalDoku(1024,160),tabelaM=new THREE.Mesh(new THREE.PlaneGeometry(3.8,.6),new THREE.MeshBasicMaterial({map:tabela.t,transparent:!0}));
tabelaM.position.set(0,3.55,-2.05),sahne.add(tabelaM);const basamaklar=[[2,-1.22,.7],[1,0,1],[3,1.22,.55]].map(([s,x,yuk])=>{const g=new THREE.Group;kutu(g,1.12,yuk,1,M("#5B4A3A",{roughness:.6}),0,0,0),
kutu(g,1.14,.05,1.02,M(GECE_MADEN[s-1],{metalness:.55,roughness:.35}),0,yuk,0);const n=tuvalDoku(128,128);n.x.fillStyle=GECE_MADEN[s-1],n.x.font="800 96px Georgia, serif",n.x.textAlign="center",n.x.textBaseline=
"middle",n.x.fillText(String(s),64,70),n.t.needsUpdate=!0;const no=new THREE.Mesh(new THREE.PlaneGeometry(.3,.3),new THREE.MeshBasicMaterial({map:n.t,transparent:!0}));no.position.set(0,(.26+yuk)/2,.506),
g.add(no);const lv=tuvalDoku(512,112),l=new THREE.Mesh(new THREE.PlaneGeometry(1.1,.24),new THREE.MeshStandardMaterial({map:lv.t,roughness:.5,transparent:!0}));l.position.set(0,.135,.507),g.add(l),g.position.
set(x,0,-.3),sahne.add(g);const fp=figurParcasi(THREE);return fp.grup.scale.setScalar(.7),fp.grup.position.set(x,yuk+.05,-.3),sahne.add(fp.grup),{s,x,yuk,g,lv,fp}}),KONFETI=200,konfeti=new THREE.InstancedMesh(
new THREE.PlaneGeometry(.06,.035),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),KONFETI);konfeti.frustumCulled=!1,konfeti.count=0;const renkler=GECE_KONFETI.map(r2=>new THREE.Color(r2)),r=rastgele(
5136),parcalar=Array.from({length:KONFETI},()=>({x:(r()-.5)*5.5,z:(r()-.5)*3,gec:r()*1.6,hiz:.7+r()*.6,don:(r()-.5)*12,sal:r()*6}));parcalar.forEach((_,i)=>konfeti.setColorAt(i,renkler[i%renkler.length])),
sahne.add(konfeti);const mt=new THREE.Matrix4,q=new THREE.Quaternion,e=new THREE.Euler,v=new THREE.Vector3,s1=new THREE.Vector3(1,1,1);function levhaYaz(b,k){const{x,c,t}=b.lv;x.clearRect(0,0,c.width,
c.height),x.fillStyle="rgba(23, 74, 64, 0.92)",x.beginPath(),x.roundRect(6,6,c.width-12,c.height-12,18),x.fill(),x.fillStyle="#FBE6A2",x.textAlign="center",x.textBaseline="middle",x.font="800 50px Fig\
tree, system-ui, sans-serif",x.fillText(k?geceAd(k):"\u2014",c.width/2,k?40:56,c.width-30),k&&(x.fillStyle="#E9E2D2",x.font="600 30px Figtree, system-ui, sans-serif",x.fillText(`${k.ulke?ulkeAdi(k.ulke):
""} \xB7 ${sayi(k.puan)}`,c.width/2,86,c.width-30)),t.needsUpdate=!0}function figurleriKur(){for(const b of basamaklar){const k=d.kursu[b.s-1];if(b.fp.grup.visible=!!k,k){const kayit=k.id&&k.ad?Gorunus.
al(k.id):null;b.fp.kur({anahtar:k.id??"",ad:k.ad??"?",gorunus:kayit?.look??null,ulke:k.ulke,rutbe:{sira:Number(kayit?.rank??0),sayi:12},ek:{kusak:GECE_MADEN[b.s-1],madalyalar:[GECE_MADEN[b.s-1]]}})}}}
function yaz(){{const{x,c,t}=tabela;x.clearRect(0,0,c.width,c.height),x.fillStyle="rgba(23, 74, 64, 0.95)",x.beginPath(),x.roundRect(10,10,c.width-20,c.height-20,30),x.fill(),x.strokeStyle="#D9B865",x.
lineWidth=6,x.stroke(),x.fillStyle="#FBE6A2",x.textAlign="center",x.textBaseline="middle",x.font="800 64px Figtree, system-ui, sans-serif",x.fillText(geceTabela(d),c.width/2,82,c.width-60),t.needsUpdate=
!0}figurleriKur();for(const b of basamaklar)levhaYaz(b,d.kursu[b.s-1]);kapYaz(),kirli=!0}function kapYaz(){kapEl&&(kapEl.dataset.dal=d.dal,kapEl.dataset.kursu=String(d.kursu.filter(Boolean).length),kapEl.
dataset.asama=asama)}Gorunus.dinle(ids=>{d.kursu.some(k=>k?.id&&ids.includes(k.id))&&(gorunusDegisti=!0,kirli=!0)});const YON=new THREE.Vector3(0,.38,1).normalize(),kamGenis={p:new THREE.Vector3,q:new THREE.
Quaternion},kamYakin={p:new THREE.Vector3,q:new THREE.Quaternion},kolay=x=>{const k=Math.min(1,Math.max(0,x));return k*k*(3-2*k)};function kameraKur(){kamera.aspect=w/h;const dar=w/h<1.2,V=dizi=>dizi.
map(p=>new THREE.Vector3(...p)),x=dar?2.6:3.4;kameraSigdir(THREE,kamera,V([[-x,0,1.8],[x,0,1.8],[-x,4,-2.1],[x,4,-2.1]]),YON,{x:.97,ust:.95,alt:-.95}),kamGenis.p.copy(kamera.position),kamGenis.q.copy(
kamera.quaternion);const yx=dar?1.78:1.95;kameraSigdir(THREE,kamera,V([[-yx,.02,.62],[yx,.02,.62],[-yx,2.85,-.6],[yx,2.85,-.6]]),YON,{x:.97,ust:.96,alt:-.97}),kamYakin.p.copy(kamera.position),kamYakin.
q.copy(kamera.quaternion),kirli=!0}const gecen=()=>(performance.now()-t0)/1e3;return{get etiket(){return \u00E7("Sezon kapan\u0131\u015F gecesi (3B): k\xFCrs\xFCde ilk \xFC\xE7, konfeti")},sahne,kamera,
get kareMs(){return hareketAzalt?1e3:gecen()>9?250:telefon()?40:0},get asama(){return asama},kapBagla(el){kapEl=el??null,kapYaz(),kirli=!0},durumYaz(y,oynat=!0){d={...d,...y};for(const k of d.kursu)k?.
id&&k.ad&&Gorunus.iste([k.id]);oynat&&(t0=performance.now(),asama=""),yaz()},oynat(){t0=performance.now(),asama="",kapYaz(),kirli=!0},kalite(k){spot.castShadow=k!=="dusuk",kirli=!0},boyut(gen,yuk){w=gen,
h=yuk,kameraKur()},etkinlestir(acik){acik&&(kirli=!0)},guncelle(dt,t){gorunusDegisti&&(gorunusDegisti=!1,figurleriKur());const g=gecen(),yeni=g<1?"giris":g<2.5?"an":g<6?"kutlama":"bitti";yeni!==asama&&
(asama=yeni,kapYaz());const azalt=hareketAzalt,kk=azalt?.45:kolay((g-.5)/1.8)-.55*kolay((g-6.5)/1.5);kamera.position.lerpVectors(kamGenis.p,kamYakin.p,kk),kamera.quaternion.slerpQuaternions(kamGenis.q,
kamYakin.q,kk);for(const b of basamaklar){if(!b.fp.grup.visible)continue;const eylem=azalt?"bekle":asama==="an"?b.s===1?"sevin":"alkis":asama==="kutlama"?"selamla":"bekle",sure=b.fp.eylemSuresi(eylem)||
2.4;b.fp.pozla(eylem,(t+b.s*.37)%sure/sure,t,azalt,!0),azalt||b.fp.canli(t+b.s)}let n=0;if(!azalt&&g>1.2&&g<9&&d.kursu.some(Boolean))for(const p of parcalar){const u=g-1.2-p.gec;if(u<0)continue;const y=4-
u*p.hiz;y<.02||(v.set(p.x+Math.sin(u*2+p.sal)*.25,y,p.z),q.setFromEuler(e.set(u*p.don,u*p.don*.7,p.sal)),mt.compose(v,q,s1),konfeti.setMatrixAt(n++,mt))}konfeti.count=n,konfeti.instanceMatrix.needsUpdate=
!0,kirli=!0},cizilmeli(){const c=kirli;return kirli=!1,c}}}Parcalar.tamam("uc_98zzm_gece3b");
