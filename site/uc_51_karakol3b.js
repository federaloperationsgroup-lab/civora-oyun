// Civora istemcisi 2026-11-11-88bf220f-2e9125c (uc_51_karakol3b.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";function karakol3bKur(THREE,cizici){if(!cizici.kur())throw new Error("webgl-yok");const sahne=new THREE.Scene,kamera=new THREE.PerspectiveCamera(32,1,.1,120);let w=1,h=1,kirli=!0,ciz=!1,d={polis:0,jandarma:0,
ulkeRenk:"#87938C",gozalti:null,kendiRenk:"#C65A3B"};const M=(renk,ek={})=>new THREE.MeshStandardMaterial({color:renk,roughness:.85,...ek}),kutu=(gx,gy,gz,mat,x=0,y=0,z=0)=>{const m=new THREE.Mesh(new THREE.
BoxGeometry(gx,gy,gz),mat);return m.position.set(x,y+gy/2,z),m.castShadow=!0,m.receiveShadow=!0,m};function doku(gen,yuk,fn){const c=document.createElement("canvas");c.width=gen,c.height=yuk,fn(c.getContext(
"2d"),gen,yuk);const t=new THREE.CanvasTexture(c);return t.colorSpace=THREE.SRGBColorSpace,t}const yari=new THREE.HemisphereLight(UC_RENK.gokIc,UC_RENK.yerIc,1.3),gunes=new THREE.DirectionalLight(UC_RENK.
gunesIc,2.1);gunes.position.set(-5,10,7),gunes.target.position.set(0,0,0),gunes.castShadow=!0,gunes.shadow.mapSize.set(1024,1024),Object.assign(gunes.shadow.camera,{left:-8,right:8,top:6,bottom:-6,near:1,
far:30}),gunes.shadow.camera.updateProjectionMatrix(),gunes.shadow.bias=-6e-4,sahne.add(yari,gunes,gunes.target),sahne.add(kutu(13,.4,8.4,M("#D9C7A6"),0,-.4,0)),sahne.add(kutu(13,.04,1.5,M("#5E5A55",{
roughness:.95}),0,0,3.15));for(let x=-6;x<6.2;x+=1)sahne.add(kutu(.5,.012,.07,M("#EFE6CF"),x,.04,3.15));sahne.add(kutu(13,.06,.5,M("#CFC4AF"),0,0,2.15));const duvarMat=M("#EDE4D2"),tabanMat=M("#BFAE93"),
ciziMat=M("#23395B");sahne.add(kutu(9.2,.08,4.4,tabanMat,0,0,-.4));const DH=.95;sahne.add(kutu(9.2,DH,.18,duvarMat,0,0,-2.6)),sahne.add(kutu(.18,DH,4.4,duvarMat,-4.6,0,-.4)),sahne.add(kutu(.18,DH,4.4,
duvarMat,4.6,0,-.4)),sahne.add(kutu(3.2,DH,.18,duvarMat,-3,0,1.8)),sahne.add(kutu(2.2,DH,.18,duvarMat,.8,0,1.8)),sahne.add(kutu(.18,DH,4.4,duvarMat,1.9,0,-.4));const tabela=new THREE.Mesh(new THREE.PlaneGeometry(
2.4,.42),new THREE.MeshBasicMaterial({map:doku(320,56,(g,W,H)=>{g.fillStyle="#23395B",g.fillRect(0,0,W,H),g.fillStyle="#F7F1E4",g.font="700 34px system-ui, sans-serif",g.textAlign="center",g.textBaseline=
"middle",g.fillText(\u00E7("KARAKOL"),W/2,H/2+2)})}));tabela.position.set(-3,DH+.24,1.9),sahne.add(tabela,kutu(2.5,.06,.1,ciziMat,-3,DH,1.88));const masaMat=M("#8A6A4A"),sandalyeMat=M("#5E6B66"),masalar=[
[-3.6,-1.3],[-2,-1.3],[-.4,-1.3]];for(const[x,z]of masalar)sahne.add(kutu(1,.42,.55,masaMat,x,0,z),kutu(.36,.06,.2,M("#DCE6EA"),x-.15,.42,z-.05)),sahne.add(kutu(.36,.3,.36,sandalyeMat,x,0,z+.55));const tenMat=M(
"#D8A982");function figur(renkMat,kep=!0){const g=new THREE.Group;g.add(kutu(.28,.46,.2,renkMat,0,0,0));const bas=new THREE.Mesh(new THREE.SphereGeometry(.12,12,10),tenMat);return bas.position.y=.58,bas.
castShadow=!0,g.add(bas),kep&&g.add(kutu(.26,.06,.26,renkMat,0,.68,0)),g}const polisMat=M("#23395B"),jandarmaMat=M("#4F5D2F"),polisler=masalar.map(([x,z])=>{const f=figur(polisMat);return f.position.set(
x,.12,z+.55),sahne.add(f),f}),jandarmalar=[[.7,.9],[1.25,.6],[.2,.4]].map(([x,z])=>{const f=figur(jandarmaMat);return f.position.set(x,.04,z),f.rotation.y=-.6,sahne.add(f),f}),parmakMat=M("#4A4F55",{metalness:.5,
roughness:.4});for(let x=2.15;x<4.5;x+=.22){const c=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,DH,8),parmakMat);c.position.set(x,DH/2,.55),c.castShadow=!0,sahne.add(c)}sahne.add(kutu(2.5,.06,.08,
parmakMat,3.3,DH-.06,.55)),sahne.add(kutu(2.2,.26,.5,M("#7A5A3C"),3.3,0,-2.2));const kendiMat=M(d.kendiRenk),kendi=figur(kendiMat,!1);kendi.position.set(3.3,.08,-2),kendi.visible=!1,sahne.add(kendi);const saat=new THREE.
Group;saat.position.set(3.3,1.45,-2.48);const kadranMat=M("#F7F1E4",{roughness:.6}),kadran=new THREE.Mesh(new THREE.CylinderGeometry(.62,.62,.08,40).rotateX(Math.PI/2),kadranMat);saat.add(kadran,new THREE.
Mesh(new THREE.TorusGeometry(.64,.05,8,40),M("#23395B")));for(let i=0;i<12;i++){const t=kutu(.03,.11,.02,M("#23395B"),0,0,0);t.position.set(Math.sin(i/12*Math.PI*2)*.5,Math.cos(i/12*Math.PI*2)*.5,.05),
t.rotation.z=-(i/12)*Math.PI*2,saat.add(t)}const halkaMat=new THREE.MeshBasicMaterial({color:"#E07560",side:THREE.DoubleSide});let halka=null;const ibre=new THREE.Group;ibre.add(kutu(.045,.46,.02,M("#\
C2412D"),0,0,0)),ibre.position.z=.07,saat.add(ibre),sahne.add(kutu(.08,1.4,.08,M("#8F887A"),3.3,0,-2.6)),sahne.add(saat);const araba=new THREE.Group;araba.add(kutu(1.25,.32,.62,M("#F4F1EA"),0,.16,0),kutu(
.7,.26,.56,M("#F4F1EA"),-.1,.48,0),kutu(1.26,.07,.63,M("#2F5FA8"),0,.3,0));const tekerGeo=new THREE.CylinderGeometry(.15,.15,.1,14).rotateX(Math.PI/2);for(const[x,z]of[[-.4,.31],[.4,.31],[-.4,-.31],[.4,
-.31]]){const t=new THREE.Mesh(tekerGeo,M("#2A2724"));t.position.set(x,.15,z),araba.add(t)}const kirmiziMat=new THREE.MeshStandardMaterial({color:"#E04040",emissive:"#E04040",emissiveIntensity:.15}),maviMat=new THREE.
MeshStandardMaterial({color:"#3B6FE0",emissive:"#3B6FE0",emissiveIntensity:.15});araba.add(kutu(.16,.08,.18,kirmiziMat,-.1,.74,-.1),kutu(.16,.08,.18,maviMat,-.1,.74,.1)),araba.position.set(-1.3,0,3.1),
sahne.add(araba);const bayrakMat=M("#87938C");sahne.add(kutu(.05,1.9,.05,M("#C9C2B4",{metalness:.3,roughness:.4}),-5.4,0,1.9));const bayrak=new THREE.Mesh(new THREE.BoxGeometry(.62,.38,.02),bayrakMat);
bayrak.position.set(-5.07,1.65,1.9),bayrak.castShadow=!0,sahne.add(bayrak);let sonKalan=-1;function kalanPay(){const g=d.gozalti;return!g||!(g.bitis>g.bas)?0:Math.max(0,Math.min(1,(g.bitis-Date.now())/
(g.bitis-g.bas)))}function saatYazdir(){const pay=kalanPay();ibre.rotation.z=-(1-pay)*Math.PI*2,halka&&(saat.remove(halka),halka.geometry.dispose(),halka=null),pay>0&&(halka=new THREE.Mesh(new THREE.RingGeometry(
.52,.6,48,1,Math.PI/2,pay*Math.PI*2),halkaMat),halka.position.z=.055,saat.add(halka)),sonKalan=pay,kirli=!0}function yaz(){polisler.forEach((f,i)=>{f.visible=i<Math.min(3,d.polis)}),jandarmalar.forEach(
(f,i)=>{f.visible=i<Math.min(3,d.jandarma)}),bayrakMat.color.set(d.ulkeRenk),kendi.visible=!!d.gozalti,kendiMat.color.set(d.kendiRenk),kirmiziMat.emissiveIntensity=d.gozalti?1.6:.15,maviMat.emissiveIntensity=
d.gozalti?1.6:.15,saat.visible=!0,saatYazdir()}const YON=new THREE.Vector3(.12,.95,1).normalize();function kameraKur(){kamera.aspect=w/h;const n=[[-5.5,0,2.6],[5,0,2.6],[-5.5,1.9,1.9],[4.8,.9,-2.6],[-4.8,
.9,-2.6],[3.3,2.1,-2.48],[-1.3,.8,3.6]].map(([x,y,z])=>new THREE.Vector3(x,y,z));kameraSigdir(THREE,kamera,n,YON,{x:.95,ust:.95,alt:-.95}),kirli=!0}return{etiket:\u00E7("Karakol (3B): n\xF6betteki g\xF6revl\
iler ve g\xF6zalt\u0131 sayac\u0131"),sahne,kamera,get kareMs(){return d.gozalti?1e3:33},kapBagla(){kirli=!0},durumYaz(y){d={...d,...y},yaz()},kalite(k){gunes.castShadow=k!=="dusuk",kirli=!0},boyut(gen,yuk){
w=gen,h=yuk,kameraKur()},etkinlestir(acik){acik&&(kirli=!0)},guncelle(){d.gozalti&&Math.abs(kalanPay()-sonKalan)>5e-4&&saatYazdir(),ciz=kirli,kirli=!1},cizilmeli(){return ciz}}}Parcalar.tamam("uc_51_k\
arakol3b");
