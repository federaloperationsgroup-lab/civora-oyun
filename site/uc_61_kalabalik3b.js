// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (uc_61_kalabalik3b.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";function kalabalikKur(THREE,en){const grup=new THREE.Group,M=(ek={})=>new THREE.MeshStandardMaterial({color:"#FFFFFF",roughness:.75,...ek}),G={bacak:new THREE.CapsuleGeometry(.075,.3,3,8).translate(0,
-.22,0),govde:new THREE.CapsuleGeometry(.19,.24,4,12),bas:new THREE.SphereGeometry(.27,16,12),kol:new THREE.CapsuleGeometry(.055,.26,3,8).translate(0,-.18,0),sapka:new THREE.CylinderGeometry(.2,.25,.12,
14),kapuson:new THREE.SphereGeometry(.31,16,10,Math.PI/2+.85,Math.PI*2-1.7,0,Math.PI*.78),goz:new THREE.SphereGeometry(.034,8,6),semsiye:new THREE.ConeGeometry(.56,.24,12,1,!0).translate(0,.12,0),sap:new THREE.
CylinderGeometry(.016,.016,.82,6).translate(0,-.41,0)},mBacak=M(),mGovde=M(),mBas=M({roughness:.6}),mKol=M(),mSapka=M(),mGoz=M({color:"#2A2420",roughness:.3}),mKapuson=M({side:THREE.DoubleSide,roughness:.9}),
mSemsiye=M({side:THREE.DoubleSide,roughness:.55}),mSapGerec=M({color:"#3B3833",roughness:.5}),ins=(geo,mat,n)=>{const m=new THREE.InstancedMesh(geo,mat,Math.max(1,n));return m.castShadow=!0,m.receiveShadow=
!0,m.count=0,m.frustumCulled=!1,grup.add(m),m},bacaklar=ins(G.bacak,mBacak,en*2),govdeler=ins(G.govde,mGovde,en),baslar=ins(G.bas,mBas,en),kollar=ins(G.kol,mKol,en*2),sapkalar=ins(G.sapka,mSapka,en),gozler=ins(
G.goz,mGoz,en*2),kapusonlar=ins(G.kapuson,mKapuson,en),semsiyeler=ins(G.semsiye,mSemsiye,en),saplar=ins(G.sap,mSapGerec,en);gozler.castShadow=!1,semsiyeler.visible=saplar.visible=!1;const renk=new THREE.
Color;let kisiler=[];const m4=new THREE.Matrix4,mKisi=new THREE.Matrix4,mParca=new THREE.Matrix4,mSap=new THREE.Matrix4,q=new THREE.Quaternion,e=new THREE.Euler,v=new THREE.Vector3,s1=new THREE.Vector3(
1,1,1),sv=new THREE.Vector3;function yolda(k,t){const y=k.yol;if(!k._uz){k._parca=[];let top=0;for(let i=0;i<y.length-1;i++){const u=Math.hypot(y[i+1][0]-y[i][0],y[i+1][1]-y[i][1]);k._parca.push(u),top+=
u}k._uz=Math.max(.001,top)}let s=((t*(k.hiz??.5)+(k.faz??0)*k._uz)%k._uz+k._uz)%k._uz;for(let i=0;i<k._parca.length;i++){if(s<=k._parca[i]||i===k._parca.length-1){const a=y[i],b=y[i+1],f=Math.min(1,s/
Math.max(1e-4,k._parca[i]));return{x:a[0]+(b[0]-a[0])*f,z:a[1]+(b[1]-a[1])*f,yon:Math.atan2(b[0]-a[0],b[1]-a[1])}}s-=k._parca[i]}return{x:y[0][0],z:y[0][1],yon:0}}function durus(k,t){const f=(k.faz??0)*
6.283;let x=k.x??0,z=k.z??0,yon=k.yon??0,zip=0,egim=0,kalca=.5,kolS=0,kolD=0,kolSz=-.12,kolDz=.12,bacS=0,bacD=0;const a=Math.sin(t*7+f);switch(k.eylem){case"yuru":{k.yol&&({x,z,yon}=yolda(k,t));const w=Math.
sin(t*8*(k.hiz??.5)/.5+f);bacS=w*.55,bacD=-w*.55,kolS=-w*.5,kolD=w*.5,zip=Math.abs(w)*.03;break}case"calis":{const c=(1+Math.sin(t*8+f))/2;egim=.18,kolD=-(.6+1.1*c),kolS=-.6;break}case"tasi":{k.yol&&({
x,z,yon}=yolda(k,t)),kolS=kolD=-1.15,bacS=a*.4,bacD=-a*.4,zip=Math.abs(a)*.02;break}case"selam":kolD=0,kolDz=2.6+Math.sin(t*12+f)*.25;break;case"alkis":{const c=Math.abs(Math.sin(t*10+f));kolS=kolD=-1.2,
kolSz=.3*c,kolDz=-.3*c,zip=c*.02;break}case"talim":{const c=Math.sin(t*4+f);kolD=-.35,kolDz=.55,bacS=Math.max(0,c)*.9,zip=Math.max(0,-c)*.02;break}case"otur":kalca=.3,bacS=bacD=-1.2,kolS=kolD=-.6;break;case"\
otur_bekle":{const c=Math.max(0,Math.sin(t*6+f));kalca=.3,bacS=bacD=-1.2,kolS=-.62,kolD=-.8-c*.22,egim=Math.sin(t*.9+f)*.05;break}case"tokalas":kolD=-1.25+Math.sin(t*13+f)*.1,kolDz=0,egim=.05;break;case"\
dans":{const c=Math.sin(t*Math.PI*2+f);zip=Math.abs(c)*.045,kolS=kolD=-.25,kolSz=-(.35+1.9*Math.max(0,c)),kolDz=.35+1.9*Math.max(0,-c),bacS=-Math.max(0,c)*.3,bacD=-Math.max(0,-c)*.3;break}case"yerde":
kalca=.14,bacS=bacD=-1.45,kolS=kolD=.55,kolSz=-.3,kolDz=.3,egim=-.14;break;case"saygi":egim=.16+Math.sin(t*.8+f)*.01,kolS=kolD=-.32,kolSz=.24,kolDz=-.24;break;default:egim=Math.sin(t*1.3+f)*.04,kolS=Math.
sin(t*2+f)*.08,kolD=-kolS}return k.semsiye&&(kolD=-.95,kolDz=.06),{x,z,yon,zip,egim,kalca,kolS,kolD,kolSz,kolDz,bacS,bacD}}const api={grup,get sayi(){return kisiler.length},yaz(liste){kisiler=liste.slice(
0,en).map((k,i)=>({...k,faz:k.faz??i*.618%1}));for(const[m,n]of[[bacaklar,2],[govdeler,1],[baslar,1],[kollar,2],[gozler,2]])m.count=kisiler.length*n;sapkalar.count=0,kisiler.forEach((k,i)=>{const g=renk.
set(k.giysi??KALABALIK_GIYSI[i%KALABALIK_GIYSI.length]);govdeler.setColorAt(i,g),kollar.setColorAt(i*2,g),kollar.setColorAt(i*2+1,g),renk.set(k.alt??"#3B4A5E"),bacaklar.setColorAt(i*2,renk),bacaklar.setColorAt(
i*2+1,renk),baslar.setColorAt(i,renk.set(k.ten??KALABALIK_TEN[i%KALABALIK_TEN.length]))});let s=0;kisiler.forEach(k=>{k.sapka?(k._sapka=s,sapkalar.setColorAt(s++,renk.set(k.sapka))):k._sapka=-1}),sapkalar.
count=s;let c=0;kisiler.forEach(k=>{k.kapuson?(k._kapuson=c,kapusonlar.setColorAt(c++,renk.set(k.kapuson))):k._kapuson=-1}),kapusonlar.count=c;let u=0;kisiler.forEach(k=>{k.semsiye?(k._semsiye=u,semsiyeler.
setColorAt(u++,renk.set(k.semsiye))):k._semsiye=-1}),semsiyeler.count=saplar.count=u,semsiyeler.visible=saplar.visible=u>0;for(const m of[bacaklar,govdeler,baslar,kollar,sapkalar,kapusonlar,semsiyeler])
m.instanceColor&&(m.instanceColor.needsUpdate=!0);api.guncelle(0)},oynat(i,ek){const k=kisiler[i];k&&Object.assign(k,ek)},guncelle(t){kisiler.forEach((k,i)=>{const d=durus(k,t),o=k.olcek??1;mKisi.compose(
v.set(d.x,(k.y??0)+d.zip*o,d.z),q.setFromEuler(e.set(0,d.yon,0)),sv.set(o,o,o));for(const[j,yan,aci]of[[0,-1,d.bacS],[1,1,d.bacD]])mParca.compose(v.set(yan*.09,d.kalca,0),q.setFromEuler(e.set(aci,0,0)),
s1),bacaklar.setMatrixAt(i*2+j,m4.multiplyMatrices(mKisi,mParca));const govY=d.kalca+.34;mParca.compose(v.set(0,govY,0),q.setFromEuler(e.set(d.egim,0,0)),s1),govdeler.setMatrixAt(i,m4.multiplyMatrices(
mKisi,mParca));const basY=govY+.47,ileri=Math.sin(d.egim)*.47;mParca.compose(v.set(0,basY-(1-Math.cos(d.egim))*.47,ileri),q.setFromEuler(e.set(d.egim*.5,0,0)),s1);const mb=m4.multiplyMatrices(mKisi,mParca);
baslar.setMatrixAt(i,mb);for(const[j,yan]of[[0,-1],[1,1]])mParca.compose(v.set(yan*.095,.03,.245),q.identity(),s1),gozler.setMatrixAt(i*2+j,mSap.multiplyMatrices(mb,mParca));k._sapka>=0&&(mParca.compose(
v.set(0,.24,0),q.identity(),s1),sapkalar.setMatrixAt(k._sapka,mSap.multiplyMatrices(mb,mParca))),k._kapuson>=0&&(mParca.compose(v.set(0,.02,-.02),q.identity(),s1),kapusonlar.setMatrixAt(k._kapuson,mSap.
multiplyMatrices(mb,mParca))),k._semsiye>=0&&(mParca.compose(v.set(.2,govY+1.08,.24),q.setFromEuler(e.set(-.1,0,Math.sin(t*3+(k.faz??0)*6.283)*.04)),s1),m4.multiplyMatrices(mKisi,mParca),semsiyeler.setMatrixAt(
k._semsiye,m4),saplar.setMatrixAt(k._semsiye,m4));const omuzY=govY+.2,omuzZ=Math.sin(d.egim)*.2;for(const[j,yan,ax,az]of[[0,-1,d.kolS,d.kolSz],[1,1,d.kolD,d.kolDz]])mParca.compose(v.set(yan*.24,omuzY,
omuzZ),q.setFromEuler(e.set(ax,0,az)),s1),kollar.setMatrixAt(i*2+j,m4.multiplyMatrices(mKisi,mParca))});for(const m of[bacaklar,govdeler,baslar,kollar,sapkalar,gozler,kapusonlar,semsiyeler,saplar])m.instanceMatrix.
needsUpdate=!0}};return api}Parcalar.tamam("uc_61_kalabalik3b");
