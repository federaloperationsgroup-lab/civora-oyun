// Civora istemcisi 2026-11-11-88bf220f-2e9125c (uc_48_sehir3b.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";const SEHIR_PROJE_YER={kultur:{a:30,rr:3.55},egitim:{a:-150,rr:9.85},yol:{a:-48,rr:13.35},hizmet:{a:-132,rr:13.35},spor:{a:-90,rr:9.85},saglik:{a:-90,rr:13.35}},SEHIR_PROJE_R=1.25;function sehir3bKur(THREE,OrbitControls,mergeGeometries,cizici){
if(!cizici.kur())throw new Error("webgl-yok");const tuval=cizici.renderer.domElement,R=SEHIR_R,HALKA=SEHIR_HALKA,BANT=SEHIR_BANT,CADDE=SEHIR_CADDE,MEYDAN_R=SEHIR_MEYDAN_R,PALET=SEHIR_PALET,ISLETME_EN_COK=SEHIR_ISLETME_EN_COK,
KAT=.44,CADDE_GEN=.95,HALKA_GEN=.62,DERECE=Math.PI/180,MAHALLE_BANT={merkez:1,ic:2,ara:3,kenar:4},ISCI_EN_COK=24,YAYA_EN_COK=40,ARAC_EN_COK=18,MITING_EN_COK=40,VAKIT={aksam:{gunes:"#FFC889",guc:3,gok:"\
#FFE3BC",yer:"#4E6470",yari:1.2,gece:0,su1:"#2F7E91",su2:"#93C9C1"},gun:{gunes:"#FFF7E8",guc:3.3,gok:"#EAF4FF",yer:"#5C7468",yari:1.5,gece:0,su1:"#2E86A0",su2:"#8FD0D2"},gece:{gunes:"#9DB6FF",guc:.38,
gok:"#2B3E6A",yer:"#0B111F",yari:.32,gece:1,su1:"#0F2741",su2:"#24476A"}},AY_YONU=[16,24,-12],sahne=new THREE.Scene,kamera=new THREE.PerspectiveCamera(30,1,.5,400),kontrol=new OrbitControls(kamera,tuval);
Object.assign(kontrol,{enableDamping:!0,dampingFactor:.08,enablePan:!1,minDistance:13,maxDistance:115,minPolarAngle:.42,maxPolarAngle:1.22,autoRotateSpeed:.32,enabled:!1}),kontrol.target.set(0,.6,0),kamera.
position.set(22,30,34),kontrol.update();let kap=null,noktaKap=null,boyutW=1,boyutH=1,ustBos=0,altBos=0,engeller=[];const zaman={value:0};let sehir=null,seviye=1,veri={evler:[],isletmeler:[],durumlar:{}},
gunesDurum={gun:0,aksam:1,gece:0,yon:[-24,19,15]},kaliteAdi="orta",kirli=!0,kameraDegisti=!0,etkin=!1,dokunuyor=!1,etkilesimSonu=0,varsayilanBakis=!0,bosta=0,donusDurdu=!1;const otoDonus=()=>!hareketAzalt&&
!telefon(),dinleyici={},isinci=new THREE.Raycaster,isaretci=new THREE.Vector2,etkinMi=()=>cizici.etkin===api,ORTAK=new Set,ortak=x=>(ORTAK.add(x),x),KUTU=ortak(new THREE.BoxGeometry(1,1,1).translate(0,
.5,0));function egikCati(){const A=[-.5,0,-.5],B=[.5,0,-.5],C=[.5,1,0],D=[-.5,1,0],E=[.5,0,.5],F=[-.5,0,.5],G=[-.5,1,0],Hh=[.5,1,0],v=[A,C,B,A,D,C,E,G,F,E,Hh,G,F,D,A,B,Hh,E].flat(),g=new THREE.BufferGeometry;
return g.setAttribute("position",new THREE.Float32BufferAttribute(v,3)),g.computeVertexNormals(),g}function testereCati(){const s=new THREE.Shape([[-.5,0],[.5,0],[.5,1],[.16666666666666666,.3],[.16666666666666666,
1],[-.16666666666666666,.3],[-.16666666666666666,1],[-.5,.3]].map(([x,y])=>new THREE.Vector2(x,y))),g=new THREE.ExtrudeGeometry(s,{depth:1,bevelEnabled:!1});return g.translate(0,0,-.5),g}const EGIK=ortak(
egikCati()),TESTERE=ortak(testereCati()),PENCERE=ortak(new THREE.PlaneGeometry(1,1)),DUMAN_GEO=ortak(new THREE.IcosahedronGeometry(.16,1)),ISCI_GOVDE=ortak(new THREE.CapsuleGeometry(.05,.12,2,6)),ISCI_BAS=ortak(
new THREE.SphereGeometry(.045,8,6)),SEMSIYE_GEO=ortak(new THREE.ConeGeometry(.105,.05,8,1,!0).translate(0,.025,0)),SEMSIYE_SAP=ortak(new THREE.CylinderGeometry(.0065,.0065,.17,4).translate(0,-.085,0)),
ARAC_GOVDE=ortak(new THREE.BoxGeometry(.36,.11,.18).translate(0,.085,0)),ARAC_UST=ortak(new THREE.BoxGeometry(.19,.09,.16).translate(-.02,.18,0)),ARAC_SIREN=ortak(new THREE.BoxGeometry(.06,.035,.13).translate(
-.02,.24,0)),ARAC_FAR=ortak(new THREE.BoxGeometry(.03,.045,.16).translate(.185,.1,0)),VINC_MAT=ortak(new THREE.MeshStandardMaterial({color:"#E3B23C",roughness:.6})),IP_MAT=ortak(new THREE.MeshStandardMaterial(
{color:"#333333"})),CAM_ACIK=ortak(new THREE.MeshStandardMaterial({color:"#3E4C57",emissive:"#FFC46B",emissiveIntensity:0,roughness:.4})),CAM_KOYU=ortak(new THREE.MeshStandardMaterial({color:"#3E4C57",
roughness:.4}));function agacGeo(tur){const govde=new THREE.CylinderGeometry(.05,.07,.4,6).translate(0,.2,0);let tepe;if(tur==="koni")tepe=new THREE.ConeGeometry(.34,1.2,7).translate(0,.95,0);else if(tur===
"kavak")tepe=new THREE.SphereGeometry(.26,8,6).scale(1,2.6,1).translate(0,1,0);else if(tur==="palmiye"){const yapraklar=[];for(let i=0;i<6;i++){const y=new THREE.BoxGeometry(.62,.03,.15).translate(.31,
0,0);y.rotateZ(-.35),y.rotateY(i/6*Math.PI*2),y.translate(0,1.32,0),yapraklar.push(y)}tepe=mergeGeometries(yapraklar);const uzun=new THREE.CylinderGeometry(.045,.07,1.35,6).translate(0,.67,0);return renkliBirlestir(
uzun,tepe)}else tepe=new THREE.IcosahedronGeometry(.42,0).translate(0,.72,0);return renkliBirlestir(govde,tepe)}function renkliBirlestir(govde,tepe){const boya=(g2,c)=>{g2=g2.index?g2.toNonIndexed():g2;
const renk=new THREE.Color(c),a=new Float32Array(g2.attributes.position.count*3);for(let i=0;i<a.length;i+=3)a[i]=renk.r,a[i+1]=renk.g,a[i+2]=renk.b;return g2.setAttribute("color",new THREE.BufferAttribute(
a,3)),g2.deleteAttribute("uv"),g2},g=mergeGeometries([boya(govde,"#7A5A40"),boya(tepe,"#FFFFFF")]);return g.computeVertexNormals(),g}function tuvalDokusu(gen,yuk,ciz){const c=document.createElement("c\
anvas");c.width=gen,c.height=yuk,ciz(c.getContext("2d"));const t=new THREE.CanvasTexture(c);return t.colorSpace=THREE.SRGBColorSpace,t}function zeminDokusu(renk){const t=tuvalDokusu(256,256,x=>{x.fillStyle=
renk,x.fillRect(0,0,256,256);const r=rastgele(7);for(let i=0;i<900;i++){const a=r()*.07;x.fillStyle=r()<.5?`rgba(255,255,240,${a})`:`rgba(60,50,20,${a})`;const s=2+r()*10;x.beginPath(),x.ellipse(r()*256,
r()*256,s,s*(.5+r()),r()*3,0,Math.PI*2),x.fill()}});return t.wrapS=t.wrapT=THREE.RepeatWrapping,t.repeat.set(.09,.09),t}const TARLA_DOKU=ortak(tuvalDokusu(64,64,x=>{x.fillStyle="#fff",x.fillRect(0,0,64,
64);for(let i=0;i<8;i++)x.fillStyle="rgba(90,70,20,0.22)",x.fillRect(0,i*8+5,64,2)})),GOLGE_DOKU=ortak((()=>{const t=tuvalDokusu(128,128,x=>{const g=x.createRadialGradient(64,64,10,64,64,64);g.addColorStop(
0,"rgba(40,50,45,0.45)"),g.addColorStop(.6,"rgba(40,50,45,0.2)"),g.addColorStop(1,"rgba(40,50,45,0)"),x.fillStyle=g,x.fillRect(0,0,128,128)});return t.colorSpace=THREE.NoColorSpace,t})()),kiyiZ=sehirKiyiZ;
function karadaMi(x,z,pay=0){return!sehir?.kiyi||z<kiyiZ(x)-pay}function tabanSekilleri(kiyi){const daire=[];for(let i=0;i<192;i++){const a=i/192*Math.PI*2;daire.push([Math.cos(a)*R,Math.sin(a)*R])}if(!kiyi)
return{kara:[daire],deniz:null};const icinde=([x,z])=>z<kiyiZ(x),kesis=(p,q)=>{let a=0,b=1;for(let k=0;k<30;k++){const m=(a+b)/2,x=p[0]+(q[0]-p[0])*m,z=p[1]+(q[1]-p[1])*m;icinde([x,z])===icinde(p)?a=m:
b=m}return[p[0]+(q[0]-p[0])*a,p[1]+(q[1]-p[1])*a]};let cikis=null,giris=null,cikisI=0,girisI=0;for(let i=0;i<192;i++){const p=daire[i],q=daire[(i+1)%192];icinde(p)&&!icinde(q)&&(cikis=kesis(p,q),cikisI=
i),!icinde(p)&&icinde(q)&&(giris=kesis(q,p),girisI=i+1)}const kiyiCizgisi=(x0,x1)=>{const pts=[];for(let k=0;k<=64;k++){const x=x0+(x1-x0)*k/64;pts.push([x,kiyiZ(x)])}return pts},kara=[giris];for(let i=girisI;kara.
push(daire[i]),i!==cikisI;i=(i+1)%192);kara.push(cikis,...kiyiCizgisi(cikis[0],giris[0]).slice(1,-1));const deniz=[cikis];for(let i=(cikisI+1)%192;deniz.push(daire[i]),i!==(girisI-1+192)%192;i=(i+1)%192)
;return deniz.push(giris,...kiyiCizgisi(giris[0],cikis[0]).slice(1,-1)),{kara:[kara],deniz:[deniz]}}const sekle=pts=>new THREE.Shape(pts.map(([x,z])=>new THREE.Vector2(x,-z)));function kalip(pts,alt,ust){
const g=new THREE.ExtrudeGeometry(sekle(pts),{depth:ust-alt,bevelEnabled:!1,curveSegments:1});return g.rotateX(-Math.PI/2),g.translate(0,alt,0),g}function seritGeo(parcalar,yuk){const v=[];for(const[a,
b,c,e]of parcalar)v.push(...a,...b,...c,...a,...c,...e);const g=new THREE.BufferGeometry;return g.setAttribute("position",new THREE.Float32BufferAttribute(v.map((n,i)=>i%3===1?yuk:n),3)),g.computeVertexNormals(),
g}function halkaParcalari(r,gen){const out=[],n=Math.ceil(r*9);for(let i=0;i<n;i++){const a0=i/n*Math.PI*2,a1=(i+1)/n*Math.PI*2,ic=r-gen/2,dis=r+gen/2,p=(rr,a)=>[Math.cos(a)*rr,0,Math.sin(a)*rr],orta=(a0+
a1)/2;karadaMi(Math.cos(orta)*dis,Math.sin(orta)*dis,.35)&&out.push([p(ic,a0),p(ic,a1),p(dis,a1),p(dis,a0)])}return out}function caddeParcalari(a,r0,r1,gen){const out=[],ux=Math.cos(a),uz=Math.sin(a),
nx=-uz,nz=ux;for(let r=r0;r<r1-.01;r+=.5){const r2=Math.min(r1,r+.5);if(!karadaMi(ux*r2,uz*r2,.3))break;const p=(rr,s)=>[ux*rr+nx*s,0,uz*rr+nz*s];out.push([p(r,-gen/2),p(r,gen/2),p(r2,gen/2),p(r2,-gen/
2)])}return out}const acifark=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));function uret(bolge){const r=rastgele(ozet(bolge.id)),palet=PALET[bolge.iklim]??PALET.bozkir,kiyi=sehirKiyida(bolge),
s={bolge,palet,kiyi,grup:new THREE.Group,binalar:[],pencereler:[],agaclar:[],tarlalar:[],simgeler:{},noktalar:[],yer:[],isletmeler:new Map,slot:new Map,evBina:new Map,animasyon:!1,gece:null};sehir=s,s.
yer=sehirIsletmeYerleri(kiyi);const ayrilmis=[{bant:1,a:150*DERECE,gen:15*DERECE,ad:"akademi"},{bant:1,a:30*DERECE,gen:15*DERECE,ad:"sahne"},{bant:1,a:-168*DERECE,gen:13*DERECE,ad:"park"},{bant:3,a:-160*
DERECE,gen:16*DERECE,ad:"kisla"},...s.yer.map(y=>({bant:2,a:y.a,gen:10*DERECE,ad:"isletme"}))];kiyi||ayrilmis.push({bant:4,a:107*DERECE,gen:9*DERECE,ad:"istasyon"});const ayrildi=(b,a,pay=0)=>ayrilmis.
some(y=>y.bant===b&&acifark(a,y.a)<y.gen+pay);let evNo=0;for(let b=1;b<=4;b++){const[r0,r1]=BANT[b];for(const rr of[r0+.55,r1-.55]){const cevre=Math.PI*2*rr;let yol=r()*.6;for(;yol<cevre-1;){const w=.8+
r()*.55,d=.85+r()*.3,a=(yol+w/2)/rr;yol+=w+.18+r()*.24;const x=Math.cos(a)*rr,z=Math.sin(a)*rr;if(CADDE.some(c=>acifark(a,c)*rr<CADDE_GEN/2+w/2+.12)||ayrildi(b,a)||!karadaMi(x,z,1.1))continue;const ilkSeviye=b===
1?r()<.38?1:2:b===2?r()<.4?2:3:b===3?r()<.45?3:4:r()<.5?4:5,temel=r()<.62?1:2,kule=b===1&&r()<.35,artis=kule?1.9:[0,1.25,.8,.42,.2][b],tavan=kule?9:[0,6,4,3,2][b],egik=r()<palet.egik;s.binalar.push({id:"\
ev-"+evNo++,x,z,rot:-a+Math.PI/2,w,d,bant:b,ilkSeviye,temel,artis,tavan,egik,duvar:new THREE.Color(palet.duvar[Math.floor(r()*palet.duvar.length)]),cati:new THREE.Color(palet.cati[Math.floor(r()*palet.
cati.length)]),kat:0,hedef:0,bas:0,gecikme:0,tur:"ev",a,rr,ev:null,sira:r()-.45*Math.sin(a)})}}}s.binalar.forEach((bi,i)=>{const enCok=Math.min(bi.tavan,bi.temel+Math.ceil(bi.artis*(5-bi.ilkSeviye)));
bi.enCok=Math.max(bi.temel,enCok,3);for(let k=0;k<bi.enCok;k++)for(let yuz=0;yuz<4;yuz++){const uzun=yuz%2===0?bi.w:bi.d,n=Math.max(1,Math.floor(uzun/.42));for(let j=0;j<n;j++)s.pencereler.push({bina:i,
kat:k,yuz,ofs:((j+.5)/n-.5)*uzun,yanik:r()<.55})}});for(let b=2;b<=4;b++){const[r0,r1]=BANT[b],adet=[0,0,7,12,16][b];for(let i=0;i<adet;i++){const a=r()*Math.PI*2,rr=r0+.3+r()*(r1-r0-.6),x=Math.cos(a)*
rr,z=Math.sin(a)*rr;CADDE.some(c=>acifark(a,c)*rr<1.6)||!karadaMi(x,z,1.4)||ayrildi(b,a,.1)||s.tarlalar.push({x,z,rot:-a+Math.PI/2+(r()-.5)*.3,w:1.6+r()*.9,d:.9+r()*.5,sonSeviye:b===2?1:b===3?2:3,renk:new THREE.
Color(["#E2C66F","#C9C46A","#B6C27A","#D9B866"][Math.floor(r()*4)]),olcek:1,hedef:1})}}const agacEkle=(x,z,ilk,son,olcek=1)=>{if(!karadaMi(x,z,.5))return;const tur=palet.agac[Math.floor(r()*palet.agac.
length)];s.agaclar.push({x,z,tur,ilk,son,olcek:olcek*(.75+r()*.5),rot:r()*6.28,renk:new THREE.Color(palet.yaprak[Math.floor(r()*palet.yaprak.length)]),sim:0,hedef:0})};for(let i=0;i<70;i++){const a=r()*
6.283,rr=17+r()*.75;agacEkle(Math.cos(a)*rr,Math.sin(a)*rr,1,5,1.05)}for(let b=2;b<=4;b++){const[r0,r1]=BANT[b];for(let i=0;i<[0,0,26,34,40][b];i++){const a=r()*6.283,rr=r0+r()*(r1-r0);CADDE.some(c=>acifark(
a,c)*rr<1)||ayrildi(b,a,.05)||agacEkle(Math.cos(a)*rr,Math.sin(a)*rr,1,b-1)}}const park=ayrilmis.find(y=>y.ad==="park");for(let i=0;i<16;i++){const a=park.a+(r()-.5)*park.gen*1.6,rr=5.4+r()*1.9;agacEkle(
Math.cos(a)*rr,Math.sin(a)*rr,1,5,1.1)}for(const c of CADDE)for(let rr=3.6;rr<17;rr+=1.45)for(const yan of[-1,1]){const x=Math.cos(c)*rr-Math.sin(c)*yan*.78,z=Math.sin(c)*rr+Math.cos(c)*yan*.78;agacEkle(
x,z,rr<HALKA[1]?3:rr<HALKA[2]?4:5,5,.7)}s.projeYer={},s.projeler=new Map,s.projeAktif=new Set;for(const[tur,y]of Object.entries(SEHIR_PROJE_YER)){const a=y.a*DERECE,px=Math.cos(a)*y.rr,pz=Math.sin(a)*
y.rr;s.projeYer[tur]={a,rr:y.rr,x:px,z:pz};for(const b of s.binalar)Math.hypot(b.x-px,b.z-pz)<SEHIR_PROJE_R+Math.max(b.w,b.d)/2&&(b.proje=tur)}return insaEt(s),s}function insaEt(s){const{palet,kiyi,grup}=s,
sekiller=tabanSekilleri(kiyi),zeminMat=new THREE.MeshStandardMaterial({color:"#ffffff",map:zeminDokusu(palet.zemin),roughness:.96});s.zeminMat=zeminMat,s.zeminKar=0;const yanMat=new THREE.MeshStandardMaterial(
{color:"#8B6B4C",roughness:1});for(const pts of sekiller.kara){const m=new THREE.Mesh(kalip(pts,-.45,0),[zeminMat,yanMat]);m.receiveShadow=!0,grup.add(m)}const alt1=new THREE.Mesh(new THREE.CylinderGeometry(
R-.02,R-.25,.9,128),new THREE.MeshStandardMaterial({color:"#7A5C42",roughness:1}));alt1.position.y=-.9;const alt2=new THREE.Mesh(new THREE.CylinderGeometry(R-.25,R-.6,.75,128),new THREE.MeshStandardMaterial(
{color:"#5F4836",roughness:1}));alt2.position.y=-1.72,grup.add(alt1,alt2);const golge=new THREE.Mesh(new THREE.PlaneGeometry(R*2.9,R*2.9).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({map:GOLGE_DOKU,
transparent:!0,depthWrite:!1}));if(golge.position.y=-2.15,grup.add(golge),kiyi){const suMat=new THREE.ShaderMaterial({fog:!0,uniforms:{...THREE.UniformsUtils.clone(THREE.UniformsLib.fog),uZaman:zaman,
uSu1:{value:new THREE.Color(VAKIT.aksam.su1)},uSu2:{value:new THREE.Color(VAKIT.aksam.su2)}},vertexShader:`#include <fog_pars_vertex>
          varying vec3 vD; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vD = w.xyz; vec4 mvPosition = viewMatrix * w; gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
          }`,fragmentShader:`#include <fog_pars_fragment>
          uniform float uZaman; uniform vec3 uSu1, uSu2; varying vec3 vD;
          float kiyi(float x){ return 7.3 + 0.9*sin(x*0.33+0.6) + 0.5*sin(x*0.81-1.1); }
          void main(){
            float d = vD.z - kiyi(vD.x);
            vec3 renk = mix(uSu2, uSu1, smoothstep(0.0, 6.0, d));
            float dalga = sin(d * 3.2 - uZaman * 1.6) * 0.5 + 0.5;
            renk = mix(renk, vec3(1.0, 0.98, 0.92), smoothstep(0.9, 1.0, dalga) * (1.0 - smoothstep(0.0, 2.2, d)) * 0.55);
            float parilti = sin(vD.x * 2.1 + uZaman * 0.9) * sin(vD.z * 2.7 - uZaman * 0.7);
            renk += smoothstep(0.75, 1.0, parilti) * 0.06;
            gl_FragColor = vec4(renk, 1.0);
            #include <colorspace_fragment>
            #include <fog_fragment>
          }`});for(const pts of sekiller.deniz)grup.add(new THREE.Mesh(kalip(pts,-.45,-.2),[suMat,new THREE.MeshStandardMaterial({color:"#3B7F8E",roughness:.5})]));s.suMat=suMat;const kumPts=[];for(let x=-R;x<=
R;x+=.4)x*x+kiyiZ(x)**2<R*R&&kumPts.push([x,kiyiZ(x)]);const parcalar=[];for(let i=0;i<kumPts.length-1;i++){const[x0,z0]=kumPts[i],[x1,z1]=kumPts[i+1];parcalar.push([[x0,0,z0-.75],[x1,0,z1-.75],[x1,0,
z1],[x0,0,z0]])}const kum=new THREE.Mesh(seritGeo(parcalar,.006),new THREE.MeshStandardMaterial({color:palet.kum,roughness:1,polygonOffset:!0,polygonOffsetFactor:-1}));kum.receiveShadow=!0,grup.add(kum)}
const meydan=new THREE.Mesh(new THREE.CircleGeometry(MEYDAN_R,64).rotateX(-Math.PI/2),new THREE.MeshStandardMaterial({color:palet.meydan,roughness:.9,polygonOffset:!0,polygonOffsetFactor:-2}));s.meydanMat=
meydan.material,meydan.position.y=.012,meydan.receiveShadow=!0,grup.add(meydan),s.yolMat=new THREE.MeshStandardMaterial({color:palet.yol,roughness:.92,polygonOffset:!0,polygonOffsetFactor:-1}),s.yolGrup=
new THREE.Group,grup.add(s.yolGrup);const n=s.binalar.length,duvarMat=new THREE.MeshStandardMaterial({color:"#ffffff",roughness:.88}),catiMat=new THREE.MeshStandardMaterial({color:"#ffffff",roughness:.82});
s.duvarlar=new THREE.InstancedMesh(KUTU,duvarMat,n),s.egikCatilar=new THREE.InstancedMesh(EGIK,catiMat,n),s.duzCatilar=new THREE.InstancedMesh(KUTU,catiMat,n);for(const m of[s.duvarlar,s.egikCatilar,s.
duzCatilar])m.castShadow=!0,m.receiveShadow=!0,m.frustumCulled=!1;s.binalar.forEach((b,i)=>{b.duzCati=b.duvar.clone().offsetHSL(0,-.05,.06),s.duvarlar.setColorAt(i,b.duvar),s.egikCatilar.setColorAt(i,
b.cati),s.duzCatilar.setColorAt(i,b.duzCati)}),grup.add(s.duvarlar,s.egikCatilar,s.duzCatilar),s.pencereMesh=new THREE.InstancedMesh(PENCERE,new THREE.MeshBasicMaterial({color:"#ffffff"}),s.pencereler.
length),s.pencereMesh.frustumCulled=!1,grup.add(s.pencereMesh),s.bahceMesh=new THREE.InstancedMesh(KUTU,new THREE.MeshStandardMaterial({color:"#8DB66E",roughness:1}),48),s.bahceMesh.receiveShadow=!0,s.
bahceMesh.frustumCulled=!1,s.bahceMesh.count=0,grup.add(s.bahceMesh);const tarlaMat=new THREE.MeshStandardMaterial({color:"#ffffff",map:TARLA_DOKU,roughness:1,polygonOffset:!0,polygonOffsetFactor:-1});
s.tarlaMesh=new THREE.InstancedMesh(new THREE.BoxGeometry(1,.05,1).translate(0,.025,0),tarlaMat,Math.max(1,s.tarlalar.length)),s.tarlaMesh.receiveShadow=!0,s.tarlaMesh.frustumCulled=!1,s.tarlalar.forEach(
(t,i)=>s.tarlaMesh.setColorAt(i,t.renk)),s.tarlaMesh.count=s.tarlalar.length,grup.add(s.tarlaMesh);const agacMat=new THREE.MeshStandardMaterial({color:"#ffffff",vertexColors:!0,roughness:.9});s.agacMesh=
{};for(const tur of new Set(s.agaclar.map(a=>a.tur))){const liste=s.agaclar.filter(a=>a.tur===tur),m=new THREE.InstancedMesh(agacGeo(tur),agacMat,liste.length);m.castShadow=!0,m.frustumCulled=!1,liste.
forEach((a,i)=>{a.indeks=i,m.setColorAt(i,a.renk)}),s.agacMesh[tur]=m,grup.add(m)}s.isletmeGrup=new THREE.Group,grup.add(s.isletmeGrup),s.duman=new THREE.InstancedMesh(DUMAN_GEO,new THREE.MeshStandardMaterial(
{color:"#F2EFE8",roughness:1,transparent:!0,opacity:.85}),ISLETME_EN_COK*6),s.duman.frustumCulled=!1,s.duman.count=0,s.isciGovde=new THREE.InstancedMesh(ISCI_GOVDE,new THREE.MeshStandardMaterial({color:"\
#ffffff",roughness:.8}),ISCI_EN_COK),s.isciBas=new THREE.InstancedMesh(ISCI_BAS,new THREE.MeshStandardMaterial({color:"#ffffff",roughness:.8}),ISCI_EN_COK);for(let i=0;i<ISCI_EN_COK;i++)s.isciGovde.setColorAt(
i,new THREE.Color(GIYSI[i%GIYSI.length])),s.isciBas.setColorAt(i,new THREE.Color(TEN[(i*3+1)%TEN.length]));for(const m of[s.isciGovde,s.isciBas])m.castShadow=!0,m.frustumCulled=!1,m.count=0;grup.add(s.
duman,s.isciGovde,s.isciBas);const tekRenk=()=>new THREE.MeshStandardMaterial({color:"#ffffff",roughness:.8});s.yayaGovde=new THREE.InstancedMesh(ISCI_GOVDE,tekRenk(),YAYA_EN_COK+MITING_EN_COK),s.yayaBas=
new THREE.InstancedMesh(ISCI_BAS,tekRenk(),YAYA_EN_COK+MITING_EN_COK);for(let i=0;i<YAYA_EN_COK+MITING_EN_COK;i++)s.yayaGovde.setColorAt(i,new THREE.Color(GIYSI[(i*5+2)%GIYSI.length])),s.yayaBas.setColorAt(
i,new THREE.Color(TEN[(i*7+3)%TEN.length]));s.arac=new THREE.InstancedMesh(ARAC_GOVDE,tekRenk(),ARAC_EN_COK),s.aracUst=new THREE.InstancedMesh(ARAC_UST,tekRenk(),ARAC_EN_COK),s.siren=new THREE.InstancedMesh(
ARAC_SIREN,new THREE.MeshBasicMaterial({color:"#ffffff"}),ARAC_EN_COK),s.far=new THREE.InstancedMesh(ARAC_FAR,new THREE.MeshBasicMaterial({color:"#FFF1C2"}),ARAC_EN_COK);for(const m of[s.yayaGovde,s.yayaBas,
s.arac,s.aracUst,s.siren,s.far])m.castShadow=m!==s.siren&&m!==s.far,m.frustumCulled=!1,m.count=0;grup.add(s.yayaGovde,s.yayaBas,s.arac,s.aracUst,s.siren,s.far),s.semsiye=new THREE.InstancedMesh(SEMSIYE_GEO,
new THREE.MeshStandardMaterial({color:"#ffffff",roughness:.6,side:THREE.DoubleSide}),YAYA_EN_COK+MITING_EN_COK),s.semsiyeSap=new THREE.InstancedMesh(SEMSIYE_SAP,new THREE.MeshStandardMaterial({color:"\
#3B3833",roughness:.5}),YAYA_EN_COK+MITING_EN_COK);for(const m of[s.semsiye,s.semsiyeSap])m.frustumCulled=!1,m.count=0,m.castShadow=!0;grup.add(s.semsiye,s.semsiyeSap),s.hayat={yayalar:[],araclar:[],miting:0},
s.simgeGrup=new THREE.Group,grup.add(s.simgeGrup),s.projeGrup=new THREE.Group,grup.add(s.projeGrup),sahne.add(grup)}function nesneBirak(kok){kok.traverse(o=>{o.isInstancedMesh&&o.dispose(),o.geometry&&
!ORTAK.has(o.geometry)&&o.geometry.dispose();for(const m of[o.material].flat())!m||ORTAK.has(m)||(m.map&&!ORTAK.has(m.map)&&m.map.dispose(),m.dispose())})}const M=(renk,ek={})=>new THREE.MeshStandardMaterial(
{color:renk,roughness:.85,...ek});function kutu(g,w,h,d,renk,x=0,y=0,z=0){const m=new THREE.Mesh(KUTU,typeof renk=="string"?M(renk):renk);return m.scale.set(w,h,d),m.position.set(x,y,z),m.castShadow=m.
receiveShadow=!0,g.add(m),m}function cati(g,w,h,d,renk,x=0,y=0,z=0,rotY=0){const m=new THREE.Mesh(EGIK,M(renk));return m.scale.set(w,h,d),m.position.set(x,y,z),m.rotation.y=rotY,m.castShadow=!0,g.add(
m),m}function silindir(g,r1,r2,h,renk,x=0,y=0,z=0,seg=16){const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,seg),M(renk));return m.position.set(x,y+h/2,z),m.castShadow=m.receiveShadow=!0,g.add(
m),m}const yerlestir=(g,a,rr)=>{g.position.set(Math.cos(a)*rr,0,Math.sin(a)*rr),g.rotation.y=-a-Math.PI/2},SIMGE={meclis(L){const g=new THREE.Group,tas="#EFE6D3",kolon="#F7F1E4",gen=L>=3?3.3:2.6,der=1.5;
kutu(g,gen+.5,.18,der+.6,"#D9CCB0",0,0,.1),kutu(g,gen,1.15+(L>=4?.25:0),der,tas,0,.18,-.12);const kolonSay=L>=3?6:4;for(let i=0;i<kolonSay;i++)silindir(g,.08,.09,.95,kolon,-gen/2+.3+i*(gen-.6)/(kolonSay-
1),.18,der/2+.16,10);if(kutu(g,gen,.14,.5,tas,0,1.13,der/2-.02),cati(g,gen+.1,.42,.55,"#E4D7BC",0,1.27,der/2-.02),L>=3){const r=.62+(L-3)*.12;silindir(g,r,r+.04,.5,tas,0,1.33+(L>=4?.25:0),-.2,24);const kubbe=new THREE.
Mesh(new THREE.SphereGeometry(r,24,12,0,Math.PI*2,0,Math.PI/2),M("#6F9F8F",{roughness:.5}));kubbe.position.set(0,1.83+(L>=4?.25:0),-.2),kubbe.castShadow=!0,g.add(kubbe),silindir(g,.04,.06,.32,"#D9A548",
0,1.83+r+(L>=4?.25:0),-.2,8)}else cati(g,gen+.08,.45,der+.06,"#B4673F",0,1.33,-.12);if(L>=4)for(const yan of[-1,1])kutu(g,1.2,.9,1.2,tas,yan*(gen/2+.6),.18,-.25),cati(g,1.25,.32,1.25,"#B4673F",yan*(gen/
2+.6),1.08,-.25);return g.userData.ust=L>=3?2.9+(L-3)*.3:2.1,g},belediye(L){const g=new THREE.Group,kat=2+(L>=4?1:0);kutu(g,1.7,kat*.5,1.3,"#E6C792",0,0,0),cati(g,1.78,.38,1.36,"#B4673F",0,kat*.5,0);const kule=1.5+
L*.28;kutu(g,.55,kule,.55,"#DDBB80",.62,0,.4);const tepe=new THREE.Mesh(new THREE.ConeGeometry(.44,.6,4),M("#8C5A3C"));tepe.position.set(.62,kule+.3,.4),tepe.rotation.y=Math.PI/4,tepe.castShadow=!0,g.
add(tepe);const saat=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,.04,20),M("#FBF6EA"));return saat.rotation.x=Math.PI/2,saat.position.set(.62,kule-.35,.69),g.add(saat),g.userData.ust=kule+.75,g},
gazete(L){const g=new THREE.Group,kat=L>=3?3:2;kutu(g,1.6,kat*.46,1.2,"#C9D3D8",0,0,0),kutu(g,1.68,.1,1.28,"#E8EDEF",0,kat*.46,0),kutu(g,.7,.42,.6,"#23395B",-.3,kat*.46+.1,-.1);const tente=kutu(g,1.5,
.05,.42,"#23395B",0,.62,.78);return tente.rotation.x=.25,g.userData.ust=kat*.46+.9,g},pazar(L){const g=new THREE.Group,renkler=["#C65A3B","#367F70","#D9A548","#F3EDE0","#23395B","#E08F70"],adet=Math.min(
12,3+L*2);for(let i=0;i<adet;i++){const a=(25+i*130/Math.max(1,adet-1))*DERECE,rr=i%2?1.75:2.25,t=new THREE.Group;for(const[px,pz]of[[-.28,-.22],[.28,-.22],[-.28,.22],[.28,.22]])silindir(t,.018,.018,.5,
"#6E5A44",px,0,pz,5);const ust=kutu(t,.72,.05,.6,renkler[i%renkler.length],0,.5,0);ust.rotation.x=.12,kutu(t,.6,.22,.3,"#B48A5C",0,0,.05),t.position.set(Math.cos(a)*rr,0,Math.sin(a)*rr),t.rotation.y=-a+
Math.PI/2,g.add(t)}return g.userData.ust=1,g.userData.merkez=new THREE.Vector3(0,0,2),g},meydan(L){const g=new THREE.Group;silindir(g,.75,.82,.22,"#D9CCB0",0,0,0,28);const su=new THREE.Mesh(new THREE.
CylinderGeometry(.66,.66,.04,28),M("#7FB9C4",{roughness:.2}));if(su.position.y=.2,g.add(su),L>=4){silindir(g,.16,.2,.3,"#D9CCB0",0,.2,0,8);const dikili=new THREE.Mesh(new THREE.ConeGeometry(.14,1.6+(L-
4)*.5,4),M("#EFE6D3"));dikili.position.y=.5+(.8+(L-4)*.25),dikili.rotation.y=Math.PI/4,dikili.castShadow=!0,g.add(dikili)}else silindir(g,.08,.1,.5,"#D9CCB0",0,.2,0,8);return g.userData.ust=L>=4?2.6:1.1,
g},akademi(L){const g=new THREE.Group;return L<2?(g.userData.ust=0,g):(kutu(g,2.2,.85,.7,"#E9DCC3",0,0,-.4),kutu(g,.6,.85,1.5,"#E9DCC3",-.8,0,.2),kutu(g,.6,.85,1.5,"#E9DCC3",.8,0,.2),cati(g,2.28,.32,.78,
"#B4673F",0,.85,-.4),cati(g,1.56,.3,.66,"#B4673F",-.8,.85,.2,Math.PI/2),cati(g,1.56,.3,.66,"#B4673F",.8,.85,.2,Math.PI/2),L>=4&&kutu(g,.5,1.6,.5,"#E1D2B5",0,0,-.55),g.userData.ust=L>=4?2.1:1.6,g)},sahne(L){
const g=new THREE.Group,kat=Math.min(5,1+L);for(let i=0;i<kat;i++){const sira=new THREE.Mesh(new THREE.CylinderGeometry(.9+i*.3,.9+i*.3,.12+i*.1,24,1,!1,Math.PI*.15,Math.PI*.7),M("#E4D7BC"));sira.position.
set(0,(.12+i*.1)/2,-.2),sira.rotation.y=Math.PI,sira.castShadow=sira.receiveShadow=!0,g.add(sira)}silindir(g,.62,.62,.14,"#B48A5C",0,0,.55,20);const kabuk=new THREE.Mesh(new THREE.SphereGeometry(.75,20,
10,0,Math.PI,0,Math.PI/2),M("#F3EDE0",{side:THREE.DoubleSide}));return kabuk.position.set(0,.14,.75),kabuk.rotation.y=Math.PI,kabuk.castShadow=!0,g.add(kabuk),L>=5&&(kutu(g,2.6,1.3,1,"#7D5FA0",0,0,1.5),
cati(g,2.7,.4,1.05,"#5D4280",0,1.3,1.5)),g.userData.ust=L>=5?2.3:1.3,g},kisla(L){const g=new THREE.Group,boy=1.8+L*.25;for(const[w,d,x,z]of[[boy,.12,0,-boy/2],[boy,.12,0,boy/2],[.12,boy,-boy/2,0],[.12,
boy,boy/2,0]])kutu(g,w,.32,d,"#B9A57E",x,0,z);L>=2&&(kutu(g,boy*.6,.55,.55,"#8D8A63",0,0,-boy/4),cati(g,boy*.62,.25,.6,"#5F6B4B",0,.55,-boy/4));for(let i=0;i<Math.min(4,L+1);i++){const cadir=new THREE.
Mesh(new THREE.ConeGeometry(.28,.4,4),M("#A9A27A"));cadir.position.set(-boy/3+i%2*.55,.2,boy/6+Math.floor(i/2)*.5),cadir.rotation.y=Math.PI/4,cadir.castShadow=!0,g.add(cadir)}const kule=1.1+L*.15;kutu(
g,.4,kule,.4,"#9C8A63",boy/2-.1,0,-boy/2+.1);const tepe=new THREE.Mesh(new THREE.ConeGeometry(.36,.4,4),M("#5F6B4B"));return tepe.position.set(boy/2-.1,kule+.2,-boy/2+.1),tepe.rotation.y=Math.PI/4,g.add(
tepe),g.userData.ust=kule+.6,g},istasyon(L){const g=new THREE.Group;kutu(g,1.9,.62,.8,"#D8B98C",0,0,0),cati(g,2,.34,.9,"#7C5A44",0,.62,0),kutu(g,2.6,.08,.5,"#CFC3AA",0,0,.75);const ray=kutu(g,.06,.04,
6,"#5E534B",-.18,.02,3.6),ray2=kutu(g,.06,.04,6,"#5E534B",.18,.02,3.6);if(ray.rotation.y=ray2.rotation.y=Math.PI/2,ray.position.set(1.6,.02,1.15),ray2.position.set(1.6,.02,1.45),L>=3)for(let i=0;i<3;i++)
kutu(g,.8,.4,.34,i?"#C65A3B":"#23395B",-.6+i*.85,.06,1.3);return g.userData.ust=1.4,g},liman(L){const g=new THREE.Group,x0=-1.2,kz=kiyiZ(x0),iskeleSay=Math.min(4,1+Math.floor(L/2)+(L>=4?1:0));for(let i=0;i<
iskeleSay;i++)kutu(g,.5,.16,3.2+i*.2,"#A88760",x0-1.6+i*1.4,-.12,kz+1.4);if(L>=2&&(kutu(g,2.2,.75,.9,"#C9B28E",x0+2.4,0,kz-1.25),cati(g,2.3,.3,1,"#7C7570",x0+2.4,.75,kz-1.25)),L>=3){kutu(g,.18,2.4,.18,
"#D9A548",x0+3,0,kz+.2);const kol=kutu(g,1.9,.14,.14,"#D9A548",x0+2.4,2.3,kz+.2);kol.rotation.y=.5}return L>=2&&(kutu(g,.42,.12,4.2,"#A99C86",x0+6.4,-.15,kz+2.2),silindir(g,.24,.3,1.5,"#F4F0E6",x0+6.4,
-.05,kz+4.2,14),silindir(g,.25,.25,.25,"#C65A3B",x0+6.4,.55,kz+4.2,14),silindir(g,.2,.2,.25,"#FFE7A8",x0+6.4,1.45,kz+4.2,14)),g.userData.ust=2.2,g.userData.merkez=new THREE.Vector3(x0,0,kz+.4),g}},SIMGE_YER={
meclis:{a:-90*DERECE,rr:3.55},belediye:{a:-28*DERECE,rr:3.55},gazete:{a:-152*DERECE,rr:3.55},akademi:{a:150*DERECE,rr:6.35},sahne:{a:30*DERECE,rr:6.4},kisla:{a:-160*DERECE,rr:13.35},istasyon:{a:107*DERECE,
rr:16.5}};function simgeleriKur(L,animasyon){const s=sehir,eskiler={...s.simgeler},yeni={};for(const ad of["meclis","belediye","gazete","pazar","meydan","akademi","sahne","kisla",s.kiyi?"liman":"istas\
yon"]){const anahtar=ad+":"+L;if(eskiler[ad]?.userData.anahtar===anahtar){yeni[ad]=eskiler[ad],delete eskiler[ad];continue}const g=SIMGE[ad](L);g.userData.anahtar=anahtar;const y=SIMGE_YER[ad];y&&yerlestir(
g,y.a,y.rr),g.traverse(o=>{o.userData.simge=ad}),s.simgeGrup.add(g),yeni[ad]=g,animasyon&&eskiler[ad]&&(g.scale.set(1,.01,1),tweenEkle(.9,e=>g.scale.set(1,Math.max(.01,yumusak.geri(e)),1),.35))}for(const g of Object.
values(eskiler)){const sil=()=>{s.simgeGrup.remove(g),nesneBirak(g)};animasyon?tweenEkle(.35,e=>g.scale.set(1,Math.max(.01,1-e),1),0,sil):sil()}s.simgeler=yeni}function elcilikleriKur(liste){const s=sehir;
if(!s)return;const anahtar=(liste??[]).slice(0,3).join(",");if(anahtar===s.elcilikAnahtar)return;s.elcilikAnahtar=anahtar,s.elcilikGrup&&(s.grup.remove(s.elcilikGrup),nesneBirak(s.elcilikGrup),s.elcilikGrup=
null);const ls=(liste??[]).slice(0,3);if(!ls.length)return;const g=new THREE.Group;ls.forEach((u,i)=>{const b=new THREE.Group;kutu(b,.5,.42,.42,"#EFE6D4",0,0,0),cati(b,.54,.16,.46,"#7D8B8E",0,.42,0);for(const x of[
-.16,0,.16])silindir(b,.022,.025,.36,"#F7F2E6",x,0,.24,8);silindir(b,.012,.012,.95,"#D8D4CC",.27,0,.26,6),kutu(b,.24,.15,.015,ulkeRenk(u),.4,.74,.26),b.position.set((i-(ls.length-1)/2)*.6,0,0),g.add(b)}),
yerlestir(g,90*DERECE,3.45),s.grup.add(g),s.elcilikGrup=g}function afisDokusu(a,renk){return tuvalDokusu(256,176,g=>{g.fillStyle=renk,g.fillRect(0,0,256,176),g.fillStyle="rgba(255,255,255,0.85)",g.font=
"700 17px Figtree, system-ui, sans-serif",g.textAlign="center",g.textBaseline="middle",g.fillText((a.yaris==="president"?\u00E7("Ba\u015Fkanl\u0131k aday\u0131"):\u00E7("Meclis aday\u0131")).toLocaleUpperCase(
DIL.yerel),128,22,236),g.fillStyle="#FFFFFF",g.font="800 34px Figtree, system-ui, sans-serif";const kelime=String(a.ad??"").split(/\s+/).filter(Boolean),ust=kelime.slice(0,Math.max(1,kelime.length-1)).
join(" "),alt=kelime.length>1?kelime[kelime.length-1]:"";g.fillText(ust,128,alt?66:84,240),alt&&g.fillText(alt,128,104,240),g.fillStyle="#F7F2E6",g.fillRect(0,134,256,42),g.fillStyle=renk,g.font="700 \
19px Figtree, system-ui, sans-serif",g.fillText(a.parti??\u00E7("Ba\u011F\u0131ms\u0131z"),128,156,236)})}function afisleriKur(secim){const s=sehir;if(!s)return;const liste=(secim?.adaylar??[]).slice(
0,SEHIR_AFIS_ACI.length),anahtar=JSON.stringify(liste.map(a=>[a.ad,a.parti,a.yaris]));if(kap&&(kap.dataset.afis=String(liste.length)),anahtar===s.afisAnahtar||(s.afisAnahtar=anahtar,s.afisGrup&&(s.grup.
remove(s.afisGrup),nesneBirak(s.afisGrup),s.afisGrup=null),kirli=!0,!liste.length))return;const g=new THREE.Group,direkMat=M("#3A3633"),kenarMat=M("#EFE9DB");liste.forEach((a,i)=>{const afis=new THREE.
Group;for(const x of[-.55,.55]){const d=new THREE.Mesh(new THREE.CylinderGeometry(.03,.036,1.45,8),direkMat);d.position.set(x,.725,0),d.castShadow=!0,afis.add(d)}const yuz=new THREE.MeshStandardMaterial(
{map:afisDokusu(a,a.parti?partiRenk(a.parti):"#5C6B7A"),roughness:.7}),pano=new THREE.Mesh(new THREE.BoxGeometry(1.28,.88,.04),[kenarMat,kenarMat,kenarMat,kenarMat,yuz,yuz]);pano.position.y=1.02,pano.
castShadow=!0,pano.receiveShadow=!0,afis.add(pano),afis.scale.setScalar(1.45),yerlestir(afis,SEHIR_AFIS_ACI[i]*DERECE,SEHIR_AFIS_R),g.add(afis)});const renkler=[...new Set(liste.map(a=>a.parti?partiRenk(
a.parti):"#5C6B7A"))];renkler.length<2&&renkler.push("#F7F2E6");const FLAMA=7,ipNoktalari=[],flamalar=[];for(const c of CADDE){const mx=Math.cos(c)*SEHIR_AFIS_R,mz=Math.sin(c)*SEHIR_AFIS_R,px=-Math.sin(
c),pz=Math.cos(c),nokta=u=>[mx+px*u*.85,2.1-(1-u*u)*.28,mz+pz*u*.85];for(let k=0;k<12;k++)ipNoktalari.push(...nokta(-1+k/12*2),...nokta(-1+(k+1)/12*2));for(let k=0;k<FLAMA;k++)flamalar.push({p:nokta(-.9+
k/(FLAMA-1)*1.8),yon:c})}const ip=new THREE.LineSegments(new THREE.BufferGeometry().setAttribute("position",new THREE.Float32BufferAttribute(ipNoktalari,3)),new THREE.LineBasicMaterial({color:"#5B544A"}));
g.add(ip);const ucgen=new THREE.BufferGeometry().setAttribute("position",new THREE.Float32BufferAttribute([-.15,0,0,.15,0,0,0,-.38,0],3));ucgen.computeVertexNormals();const flama=new THREE.InstancedMesh(
ucgen,new THREE.MeshStandardMaterial({color:"#FFFFFF",side:THREE.DoubleSide,roughness:.8}),flamalar.length),m4=new THREE.Matrix4,q=new THREE.Quaternion,e=new THREE.Euler,v=new THREE.Vector3,bir=new THREE.
Vector3(1,1,1);flamalar.forEach((f,k)=>{flama.setMatrixAt(k,m4.compose(v.set(...f.p),q.setFromEuler(e.set(0,-f.yon-Math.PI/2,0)),bir)),flama.setColorAt(k,_r.set(renkler[k%renkler.length]))}),flama.instanceMatrix.
needsUpdate=!0,flama.instanceColor&&(flama.instanceColor.needsUpdate=!0),g.add(flama),s.grup.add(g),s.afisGrup=g}const KUL=new THREE.Color("#4A4440"),MOLOZ_MAT=ortak(new THREE.MeshStandardMaterial({color:"\
#8C8174",roughness:1})),ISKELE_MAT=ortak(new THREE.MeshStandardMaterial({color:"#B68A4E",roughness:.9})),YANIK_GEO=ortak(new THREE.CircleGeometry(1,20).rotateX(-Math.PI/2)),AFIS_GEO=ortak(new THREE.PlaneGeometry(
.3,.4)),savasSirasi=b=>ozet(sehir.bolge.id+":savas:"+b.id)%10007/10007;function savasKur(sv){const s=sehir;if(!s)return;const oran=Math.min(1,Math.max(0,Number(sv?.hasar??0))/5e5),onarim=Math.min(8,Math.
max(0,Number(sv?.onarim??0))),anahtar=JSON.stringify([Math.round(oran*200),sv?.isgalci??null,sv?.asil??null,sv?.direnis??null,onarim,Math.ceil(Number(sv?.duman??0)*4),seviye]);if(anahtar===s.savasAnahtar){
kap&&s.savasSayilar&&Object.assign(kap.dataset,s.savasSayilar);return}s.savasAnahtar=anahtar,s.savasGrup&&(s.grup.remove(s.savasGrup),nesneBirak(s.savasGrup),s.savasGrup=null),s.savasDuman=null,s.savasIsci=
null;const pay=Math.min(.6,oran*1.1),cokuk=[],hasarli=[];s.binalar.forEach((b,i)=>{const h=savasSirasi(b);b.savas=h<pay?h<pay*.4&&!b.ev?2:1:0,b.savas&&hedefKat(b,seviye)>0&&(b.savas===2?cokuk:hasarli).
push(b),s.duvarlar.setColorAt(i,b.savas?_r.copy(b.duvar).lerp(KUL,b.savas===2?.62:.4):b.duvar),s.egikCatilar.setColorAt(i,b.savas?_r.copy(b.cati).lerp(KUL,.35):b.cati)});for(const m of[s.duvarlar,s.egikCatilar])
m.instanceColor&&(m.instanceColor.needsUpdate=!0);s.animasyon=!0;const g=new THREE.Group,r=rastgele(ozet(s.bolge.id+":moloz")),molozlar=cokuk.slice(0,40),yaniklar=[...cokuk,...hasarli].slice(0,60);if(molozlar.
length){const m=new THREE.InstancedMesh(KUTU,MOLOZ_MAT,molozlar.length*5);let i=0;for(const b of molozlar)for(let k=0;k<5;k++){const lx=(r()-.5)*(b.w+.5),lz=-(b.d/2+.05+r()*.3)*(k%2?1:-1),c=Math.cos(b.
rot),sn=Math.sin(b.rot);_q.setFromEuler(_e.set((r()-.5)*.5,r()*6.28,(r()-.5)*.5)),m.setMatrixAt(i++,_m.compose(_p.set(b.x+lx*c+lz*sn,0,b.z-lx*sn+lz*c),_q,_o.set(.12+r()*.18,.05+r()*.1,.1+r()*.16)))}m.
count=i,m.castShadow=!0,m.receiveShadow=!0,m.frustumCulled=!1,g.add(m)}if(yaniklar.length){const m=new THREE.InstancedMesh(YANIK_GEO,new THREE.MeshBasicMaterial({color:"#1E1A17",transparent:!0,opacity:.3,
depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}),yaniklar.length);yaniklar.forEach((b,i)=>{const o=Math.max(b.w,b.d)*(b.savas===2?.95:.7);m.setMatrixAt(i,_m.compose(_p.set(b.x,.016,b.z),_q.identity(),
_o.set(o,1,o)))}),m.frustumCulled=!1,m.renderOrder=1,g.add(m)}const kaynak=(cokuk.length?cokuk:hasarli).slice(0,Math.min(4,Math.max(1,Math.round(4*Number(sv?.duman??0)))));if(Number(sv?.duman??0)>0&&kaynak.
length){const m=new THREE.InstancedMesh(DUMAN_GEO,new THREE.MeshStandardMaterial({color:"#56504A",roughness:1,transparent:!0,opacity:.78}),kaynak.length*7);m.frustumCulled=!1,m.count=0,g.add(m),s.savasDuman=
{m,kaynak:kaynak.map((b,i)=>({x:b.x,y:hedefKat(b,seviye)*KAT*(b.savas===2?.7:1),z:b.z,faz:i*.27})),guc:Number(sv.duman)}}let bayrak=0;if(sv?.isgalci&&sv?.asil){const y=SIMGE_YER.belediye,a0=y.a,direk=(a,renk,yuk)=>{
const d=new THREE.Group;silindir(d,.022,.028,1.7,"#D8D4CC",0,0,0,6),kutu(d,.46,.3,.016,ulkeRenk(renk),.24,yuk,0),d.position.set(Math.cos(a)*2.6,0,Math.sin(a)*2.6),d.rotation.y=-a+Math.PI,g.add(d)};direk(
a0-.13,sv.isgalci,1.38),direk(a0+.13,sv.asil,.78),bayrak=1}let afis=0;if(sv?.direnis&&sv?.asil){const doku=tuvalDokusu(96,128,x=>{x.fillStyle=ulkeRenk(sv.asil),x.fillRect(0,0,96,128),x.strokeStyle="#F\
FFFFF",x.lineWidth=6,x.strokeRect(5,5,86,118),x.fillStyle="#FFFFFF",x.textAlign="center",x.textBaseline="middle",x.font="800 17px Figtree, system-ui, sans-serif",x.fillText(\u00E7("Direni\u015F").toLocaleUpperCase(
DIL.yerel),48,46,84),x.font="700 12px Figtree, system-ui, sans-serif",x.fillText(String(ulkeAdi(sv.asil)).toLocaleUpperCase(DIL.yerel),48,82,84)}),mat=new THREE.MeshStandardMaterial({map:doku,roughness:.8}),
adaylar=s.binalar.filter(b=>b.bant<=2&&b.savas!==2&&hedefKat(b,seviye)>=1).sort((p,q)=>savasSirasi(p)-savasSirasi(q)).slice(0,10);for(const b of adaylar){const m=new THREE.Mesh(AFIS_GEO,mat),lz=-(b.d/
2+.012),c=Math.cos(b.rot),sn=Math.sin(b.rot);m.position.set(b.x+lz*sn,.3,b.z+lz*c),m.rotation.y=b.rot+Math.PI,g.add(m),afis++}}let iskele=0;if(onarim>0){const binalar=[...cokuk,...hasarli].slice(0,Math.
min(3,Math.ceil(onarim/2))),isciler=[];for(const b of binalar){const boy=Math.max(.6,hedefKat(b,seviye)*KAT*(b.savas===2?.7:1)+.15),sk=new THREE.Group,w=b.w/2+.09,d=b.d/2+.09;for(const[x,z]of[[-w,-d],
[w,-d],[-w,d],[w,d]]){const dk=new THREE.Mesh(KUTU,ISKELE_MAT);dk.scale.set(.03,boy,.03),dk.position.set(x,0,z),sk.add(dk)}for(let yk=.35;yk<boy;yk+=.38)for(const z of[-d,d]){const tk=new THREE.Mesh(KUTU,
ISKELE_MAT);tk.scale.set(b.w+.24,.025,.1),tk.position.set(0,yk,z),sk.add(tk)}sk.position.set(b.x,0,b.z),sk.rotation.y=b.rot,sk.traverse(o=>{o.isMesh&&(o.castShadow=!0)}),g.add(sk),iskele++;const c=Math.
cos(b.rot),sn=Math.sin(b.rot),lz=-d;isciler.push({x:b.x+lz*sn,z:b.z+lz*c,ux:c,uz:-sn,w:b.w/2,boy})}if(isciler.length){const govde=new THREE.InstancedMesh(ISCI_GOVDE,new THREE.MeshStandardMaterial({color:"\
#E8782E",roughness:.8}),onarim),bas=new THREE.InstancedMesh(ISCI_BAS,new THREE.MeshStandardMaterial({color:TEN[2],roughness:.8}),onarim);for(const m of[govde,bas])m.castShadow=!0,m.frustumCulled=!1,g.
add(m);s.savasIsci={govde,bas,liste:Array.from({length:onarim},(_,k)=>({...isciler[k%isciler.length],faz:k*.37,sira:Math.floor(k/isciler.length)}))}}}s.grup.add(g),s.savasGrup=g,(s.savasDuman||s.savasIsci)&&
savasGuncelle(performance.now()/1e3),s.savasSayilar={hasar:String(cokuk.length+hasarli.length),cokuk:String(cokuk.length),savasDuman:String(s.savasDuman?s.savasDuman.kaynak.length:0),bayrak:String(bayrak),
direnisAfis:String(afis),iskele:String(iskele)},kap&&Object.assign(kap.dataset,s.savasSayilar),kirli=!0}function savasGuncelle(t){const s=sehir,dm=s?.savasDuman;if(dm){let i=0;for(const k of dm.kaynak)
for(let j=0;j<7;j++){const f=hareketAzalt?(j+.5)/7*.85:(t*.16+j/7+k.faz)%1,o=(.7+f*2.2)*(f<.8?1:(1-f)/.2)*(.6+.4*dm.guc);_m.compose(_y.set(k.x+Math.sin(f*3+j)*.18+f*.9,k.y+.1+f*3.4*(.6+.4*dm.guc),k.z-
f*.5),_q.identity(),_o.set(o,o,o)),dm.m.setMatrixAt(i++,_m)}dm.m.count=i,dm.m.instanceMatrix.needsUpdate=!0}const is=s?.savasIsci;is&&(is.liste.forEach((p,k)=>{const u=hareketAzalt?.3:Math.sin(t*.7+p.
faz*5)*.5+.5,kat=Math.min(p.boy-.1,.38*(1+p.sira%2)*(hareketAzalt?1:.8+.2*Math.sin(t*1.3+p.faz))),yan=(u-.5)*2*p.w*.85,x=p.x+p.ux*yan,z=p.z+p.uz*yan;is.govde.setMatrixAt(k,_m.makeTranslation(x,kat+.11,
z)),is.bas.setMatrixAt(k,_m.makeTranslation(x,kat+.27,z))}),is.govde.instanceMatrix.needsUpdate=is.bas.instanceMatrix.needsUpdate=!0)}function yollariKur(L){const s=sehir;for(const o of[...s.yolGrup.children])
s.yolGrup.remove(o),nesneBirak(o);const parcalar=[];for(let k=0;k<Math.min(L,4);k++)parcalar.push(...halkaParcalari(HALKA[k],HALKA_GEN));const son=L>=5?R-.4:HALKA[Math.min(L,4)-1]+1.6;for(const c of CADDE)
parcalar.push(...caddeParcalari(c,MEYDAN_R-.1,son,CADDE_GEN));const m=new THREE.Mesh(seritGeo(parcalar,.01),s.yolMat);if(m.receiveShadow=!0,s.yolGrup.add(m),s.ampuller=null,L<3)return;const direk=new THREE.
InstancedMesh(new THREE.CylinderGeometry(.025,.03,.75,5).translate(0,.375,0),M("#3E3A36"),120),ampul=new THREE.InstancedMesh(new THREE.SphereGeometry(.075,8,6),new THREE.MeshBasicMaterial({color:"#fff\
fff"}),120);let i=0;const m4=new THREE.Matrix4;for(const c of CADDE)for(let rr=3.4;rr<son-.3&&i<120;rr+=1.9){const x=Math.cos(c)*rr+Math.cos(c+Math.PI/2)*.58,z=Math.sin(c)*rr+Math.sin(c+Math.PI/2)*.58;
karadaMi(x,z,.3)&&(m4.makeTranslation(x,0,z),direk.setMatrixAt(i,m4),m4.makeTranslation(x,.78,z),ampul.setMatrixAt(i,m4),i++)}direk.count=ampul.count=i,direk.castShadow=!0,s.yolGrup.add(direk,ampul),s.
ampuller=ampul,lambaRengi()}function lambaRengi(){const s=sehir;if(!s?.ampuller)return;const c=new THREE.Color(gunesDurum.gece>.5?"#FFD27A":"#E9E2CF");for(let i=0;i<s.ampuller.count;i++)s.ampuller.setColorAt(
i,c);s.ampuller.instanceColor&&(s.ampuller.instanceColor.needsUpdate=!0)}const tweenler=[];function tweenEkle(sure,fn,gecikme=0,bitince){tweenler.push({t:-gecikme,sure,fn,bitince})}function kameraUc(hedef,konum,sure=1.2){
const h0=kontrol.target.clone(),k0=kamera.position.clone();tweenEkle(hareketAzalt?.01:sure,e=>{const f=yumusak.girisCikis(e);kontrol.target.lerpVectors(h0,hedef,f),kamera.position.lerpVectors(k0,konum,
f),kameraDegisti=!0})}function evleriYerlestir(evler){const s=sehir;for(const b of s.binalar)b.ev=null;s.evBina.clear();for(const[zone,bant]of Object.entries(MAHALLE_BANT)){const adaylar=s.binalar.filter(
b=>b.bant===bant&&!b.proje).sort((a,b)=>a.sira-b.sira);evler.filter(h=>h.zone===zone).sort((a,b)=>a.no-b.no).forEach((h,i)=>{adaylar[i]&&(adaylar[i].ev=h,s.evBina.set(h.house_id,adaylar[i]))})}const evli=s.
binalar.filter(b=>b.ev),alan=[...s.projeAktif].map(tur=>s.projeYer[tur]).filter(Boolean),alanda=(x,z,pay)=>alan.some(p=>Math.hypot(x-p.x,z-p.z)<SEHIR_PROJE_R+pay);for(const t of s.tarlalar)t.engel=evli.
some(b=>Math.hypot(t.x-b.x,t.z-b.z)<Math.max(t.w,t.d)/2+Math.max(b.w,b.d)/2+.25)||alanda(t.x,t.z,Math.max(t.w,t.d)/2);for(const a of s.agaclar)a.engel=evli.some(b=>Math.hypot(a.x-b.x,a.z-b.z)<Math.max(
b.w,b.d)/2+.45)||alanda(a.x,a.z,.3)}function hedefKat(b,L){return b.ev?Math.max(1,b.ev.floors):b.proje&&sehir?.projeAktif.has(b.proje)||L<b.ilkSeviye?0:Math.min(b.tavan,b.temel+Math.floor(b.artis*(L-b.
ilkSeviye)+.35))}function seviyeAyarla(L,animasyon){const s=sehir,onceki=seviye;seviye=L,s.binalar.forEach(b=>{const h=hedefKat(b,L);h!==b.hedef&&(b.bas=b.kat,b.hedef=h,b.gecikme=animasyon?.15+Math.hypot(
b.x,b.z)/R*1.5+Math.random()*.35:0,b.t=animasyon?0:1)}),s.tarlalar.forEach(t=>{t.hedef=!t.engel&&L<=t.sonSeviye?1:0}),s.agaclar.forEach(a=>{a.hedef=!a.engel&&L>=a.ilk&&L<=a.son?1:0}),animasyon||(s.binalar.
forEach(b=>{b.kat=b.hedef}),s.tarlalar.forEach(t=>{t.olcek=t.hedef}),s.agaclar.forEach(a=>{a.sim=a.hedef})),s.yolSeviye!==L&&(yollariKur(L),s.yolSeviye=L),animasyon&&vincKur(s.binalar.filter(b=>b.hedef>
0&&b.bas===0)),simgeleriKur(L,animasyon&&onceki!==L),s.animasyon=!0,kirli=!0}const _m=new THREE.Matrix4,_q=new THREE.Quaternion,_e=new THREE.Euler,_p=new THREE.Vector3,_o=new THREE.Vector3,SIFIR=new THREE.
Matrix4().makeScale(0,0,0),KOYU=new THREE.Color("#3E4C57"),YANIK=new THREE.Color("#FFD38A"),SONUK=new THREE.Color("#2A3342");function binalariGuncelle(dt){const s=sehir;let devam=!1;s.binalar.forEach(
(b,i)=>{if(b.kat!==b.hedef){b.t=(b.t??0)+dt;const ilerleme=THREE.MathUtils.clamp((b.t-b.gecikme)/.95,0,1);b.kat=ilerleme>=1?b.hedef:b.bas+(b.hedef-b.bas)*(b.hedef>b.bas?yumusak.geri(ilerleme):yumusak.
cikis(ilerleme)),devam=!0}const yuk=Math.max(0,b.kat)*KAT*(b.savas===2?.7:1);if(_e.set(0,b.rot,0),_q.setFromEuler(_e),yuk<.01){s.duvarlar.setMatrixAt(i,SIFIR),s.egikCatilar.setMatrixAt(i,SIFIR),s.duzCatilar.
setMatrixAt(i,SIFIR);return}_m.compose(_p.set(b.x,0,b.z),_q,_o.set(b.w,yuk,b.d)),s.duvarlar.setMatrixAt(i,_m),b.savas===2?(s.egikCatilar.setMatrixAt(i,SIFIR),s.duzCatilar.setMatrixAt(i,SIFIR)):b.egik&&
b.hedef<=3?(_m.compose(_p.set(b.x,yuk,b.z),_q,_o.set(b.w*1.08,.3+b.d*.16,b.d*1.12)),s.egikCatilar.setMatrixAt(i,_m),s.duzCatilar.setMatrixAt(i,SIFIR)):(_m.compose(_p.set(b.x,yuk,b.z),_q,_o.set(b.w*1.05,
.09,b.d*1.05)),s.duzCatilar.setMatrixAt(i,_m),s.egikCatilar.setMatrixAt(i,SIFIR))});for(const m of[s.duvarlar,s.egikCatilar,s.duzCatilar])m.instanceMatrix.needsUpdate=!0;s.duvarlar.boundingSphere=null;
const gece=gunesDurum.gece>.5;s.pencereler.forEach((p,j)=>{const b=s.binalar[p.bina];if(b.kat*(b.savas===2?.7:1)-p.kat<=.55){s.pencereMesh.setMatrixAt(j,SIFIR);return}const yariW=b.w/2+.006,yariD=b.d/
2+.006;let lx=0,lz=0,ry=0;p.yuz===0?(lx=p.ofs,lz=yariD):p.yuz===1?(lx=yariW,lz=p.ofs,ry=Math.PI/2):p.yuz===2?(lx=p.ofs,lz=-yariD,ry=Math.PI):(lx=-yariW,lz=p.ofs,ry=-Math.PI/2);const c=Math.cos(b.rot),
sn=Math.sin(b.rot);_e.set(0,b.rot+ry,0),_q.setFromEuler(_e),_m.compose(_p.set(b.x+lx*c+lz*sn,p.kat*KAT+KAT*.55,b.z-lx*sn+lz*c),_q,_o.set(.19,.23,1)),s.pencereMesh.setMatrixAt(j,_m),s.pencereMesh.setColorAt(
j,gece&&p.yanik&&!b.savas?YANIK:gece?SONUK:KOYU)}),s.pencereMesh.instanceMatrix.needsUpdate=!0,s.pencereMesh.instanceColor&&(s.pencereMesh.instanceColor.needsUpdate=!0);let bi=0;for(const b of s.binalar){
if(!b.ev?.garden||bi>=s.bahceMesh.instanceMatrix.count)continue;const o=THREE.MathUtils.clamp(b.kat/Math.max(1,b.hedef),0,1);_e.set(0,b.rot,0),_q.setFromEuler(_e),_m.compose(_p.set(b.x,0,b.z),_q,_o.set(
(b.w+.4)*Math.max(.001,o),.008,(b.d+.5)*Math.max(.001,o))),s.bahceMesh.setMatrixAt(bi++,_m)}s.bahceMesh.count=bi,s.bahceMesh.instanceMatrix.needsUpdate=!0,s.tarlalar.forEach((t,i)=>{t.olcek+=(t.hedef-
t.olcek)*Math.min(1,dt*3),Math.abs(t.hedef-t.olcek)>.01&&(devam=!0);const o=Math.max(.001,t.olcek);_e.set(0,t.rot,0),_q.setFromEuler(_e),_m.compose(_p.set(t.x,0,t.z),_q,_o.set(t.w*o,o,t.d*o)),s.tarlaMesh.
setMatrixAt(i,_m)}),s.tarlaMesh.instanceMatrix.needsUpdate=!0;for(const[tur,mesh]of Object.entries(s.agacMesh)){for(const a of s.agaclar){if(a.tur!==tur)continue;a.sim+=(a.hedef-a.sim)*Math.min(1,dt*4),
Math.abs(a.hedef-a.sim)>.01&&(devam=!0);const o=Math.max(.001,a.sim)*a.olcek;_e.set(0,a.rot,0),_q.setFromEuler(_e),_m.compose(_p.set(a.x,0,a.z),_q,_o.set(o,o,o)),mesh.setMatrixAt(a.indeks,_m)}mesh.instanceMatrix.
needsUpdate=!0}return devam}function vincKur(yeniler){const s=sehir;for(const b of yeniler.sort(()=>Math.random()-.5).slice(0,7))vincDik(b.x,b.z,b.rot,b.w,2.2+hedefKat(b,seviye)*KAT)}function vincDik(x,z,rot,w,boy){
const s=sehir,g=new THREE.Group,kule=new THREE.Mesh(KUTU,VINC_MAT);kule.scale.set(.12,boy,.12);const kol=new THREE.Mesh(KUTU,VINC_MAT);kol.scale.set(1.6,.08,.08),kol.position.set(.55,boy-.12,0);const ip=new THREE.
Mesh(KUTU,IP_MAT);ip.scale.set(.015,.9,.015),ip.position.set(1.1,boy-1,0),g.add(kule,kol,ip),g.traverse(o=>{o.isMesh&&(o.castShadow=!0)});const c=Math.cos(rot),sn=Math.sin(rot);g.position.set(x+(w/2+.25)*
c,0,z-(w/2+.25)*sn),g.rotation.y=rot+Math.random()*2,g.scale.set(1,.01,1),s.grup.add(g),tweenEkle(.5,e=>g.scale.set(1,Math.max(.01,yumusak.cikis(e)),1),Math.random()*.4),tweenEkle(2.2,()=>{g.rotation.
y+=.012},.4),tweenEkle(.45,e=>g.scale.set(1,Math.max(.01,1-e),1),3.1,()=>s.grup.remove(g))}function projeAlanlari(liste){const s=sehir;s.projeAktif=new Set((liste??[]).map(p=>p.tur).filter(t=>s.projeYer[t]))}
function projeleriKur(liste,animasyon){const s=sehir;if(!s)return;const yeni=new Map((liste??[]).filter(p=>s.projeYer[p.tur]).map(p=>[p.tur,p]));let yapimda=0,calisan=0,askida=0;for(const tur of Object.
keys(SEHIR_PROJE_YER)){const p=yeni.get(tur);let o=s.projeler.get(tur);if(!p){o&&(s.projeGrup.remove(o.kok),nesneBirak(o.kok),s.projeler.delete(tur));continue}if(!o){const y=s.projeYer[tur],kok=new THREE.
Group;yerlestir(kok,y.a,y.rr);const model=bldProjeModeli(THREE,tur,veri.ulke?ulkeRenk(veri.ulke):"#C65A3B");kok.add(model),kok.traverse(x=>{x.userData.proje=tur}),s.projeGrup.add(kok),o={kok,model,iskele:null,
vinc:null,anahtar:"",faz:Object.keys(SEHIR_PROJE_YER).indexOf(tur)*1.3},s.projeler.set(tur,o),animasyon&&(o.yukselis=.01,tweenEkle(.9,e=>{o.yukselis=Math.max(.01,yumusak.geri(e)),projeBoyu()},.2,()=>{
o.yukselis=1,projeBoyu()}))}bldProjeBoya(THREE,o.model,p.durum);const il=p.durum==="building"?Math.max(.12,Math.min(1,Number(p.ilerleme)||0)):1;o.boy=il;const anahtar=p.durum+":"+Math.round(il*20);if(anahtar!==
o.anahtar&&(o.anahtar=anahtar,o.iskele&&(o.kok.remove(o.iskele),o.iskele=null),p.durum==="building")){const[en,der]=o.model.userData.ayak;o.iskele=bldIskeleKur(THREE,KUTU,ISKELE_MAT,en*.82,der*.66,o.model.
userData.yuk*il+.22),o.kok.add(o.iskele)}p.durum==="building"&&!o.vinc?(o.vinc=bldVincKur(THREE,KUTU,VINC_MAT,IP_MAT,o.model.userData.yuk+1.15,1.35),o.vinc.position.set(o.model.userData.ayak[0]/2+.15,
0,-.35),o.kok.add(o.vinc)):p.durum!=="building"&&o.vinc&&(o.kok.remove(o.vinc),o.vinc=null),o.kok.traverse(x=>{x.userData.proje=tur}),p.durum==="building"?yapimda++:p.durum==="active"?calisan++:p.durum===
"suspended"&&askida++}projeBoyu(),s.projeSayilar={proje:String(s.projeler.size),projeYapimda:String(yapimda),projeCalisan:String(calisan),projeAskida:String(askida)},kap&&Object.assign(kap.dataset,s.projeSayilar),
kirli=!0}function projeBoyu(){for(const o of sehir?.projeler.values()??[])o.model.scale.set(1,Math.max(.01,(o.boy??1)*(o.yukselis??1)),1)}function projeleriOynat(t){for(const o of sehir.projeler.values())
o.vinc&&(o.vinc.userData.ust.rotation.y=Math.sin(t*.3+o.faz)*1.3),o.model.userData.durum==="active"&&o.model.userData.oyna(t+o.faz)}const ISLETME_TUR={tarla:"ciftlik",lif:"ciftlik",maden:"maden",lojistik:"\
depo"},ISLETME_DUVAR={gida:"#E3C98F",metal:"#B8644B",dokuma:"#E8DCC4",dokuma2:"#E8DCC4",dokuma3:"#E8DCC4",muhimmat:"#8D8A63",techizat:"#9AA7AE",techizat2:"#9AA7AE",techizat3:"#9AA7AE",techizat4:"#9AA7\
AE",techizat5:"#9AA7AE",bakim:"#C9B28E",sahne:"#9C84B8",enstruman:"#B88A5C",mobilya:"#A0784E",kamera:"#6E7B8B",isik:"#C9B458",mikrofon:"#8A8F99",bisiklet:"#7FA36B",motosiklet:"#A85C4A",otomobil:"#5B7F\
A3",tekne:"#4F8FA8"};function camSerit(g,w,x,y,z){const m=new THREE.Mesh(KUTU,CAM_KOYU);return m.scale.set(w,.13,.03),m.position.set(x,y,z),g.add(m),(g.userData.camlar??=[]).push(m),m}function isletmeBinasi(co){
const g=new THREE.Group,tur=ISLETME_TUR[co.recipe_id]??"fabrika",u=g.userData;if(tur==="ciftlik"){const ekin=co.recipe_id==="lif"?"#BFD08F":"#E2C66F",tarla=new THREE.Mesh(KUTU,new THREE.MeshStandardMaterial(
{color:ekin,map:TARLA_DOKU,roughness:1}));tarla.scale.set(1.5,.05,.72),tarla.position.set(0,0,.42),tarla.receiveShadow=!0,g.add(tarla),kutu(g,.95,.55,.66,"#B5523B",-.18,0,-.38),cati(g,1,.36,.72,"#5A3F\
35",-.18,.55,-.38),kutu(g,.3,.34,.03,"#5A3F35",-.18,0,-.04),silindir(g,.2,.2,.95,"#D9D2C4",.55,0,-.42,14);const kubbe=new THREE.Mesh(new THREE.SphereGeometry(.2,14,7,0,Math.PI*2,0,Math.PI/2),M("#B9B2A\
4"));kubbe.position.set(.55,.95,-.42),g.add(kubbe),silindir(g,.045,.05,.42,"#6E5A4C",-.45,.55,-.52,6),camSerit(g,.36,-.18,.3,-.04),u.baca=new THREE.Vector3(-.45,1,-.52),u.kapi=new THREE.Vector3(-.18,0,
.08),u.ust=1.6}else if(tur==="maden"){kutu(g,.72,.5,.6,"#A89A84",.45,0,-.3),cati(g,.76,.28,.64,"#5E534B",.45,.5,-.3),silindir(g,.07,.09,1.25,"#7A5A43",.72,0,-.5,8);for(const x of[-.62,-.18])kutu(g,.07,
1.35,.07,"#6B5B4B",x,0,-.12);kutu(g,.58,.08,.1,"#6B5B4B",-.4,1.35,-.12);const cark=new THREE.Mesh(new THREE.TorusGeometry(.2,.035,6,16),M("#4E4640"));cark.position.set(-.4,1.3,-.04),g.add(cark),u.cark=
cark;for(const[x,z,r]of[[-.42,.42,.3],[.22,.48,.22]]){const y=new THREE.Mesh(new THREE.ConeGeometry(r,r*.9,7),M("#6E6A66"));y.position.set(x,r*.45,z),y.castShadow=y.receiveShadow=!0,g.add(y)}kutu(g,.26,
.14,.18,"#8C5A3C",-.05,.03,.12),camSerit(g,.4,.45,.24,.01),u.baca=new THREE.Vector3(.72,1.3,-.5),u.kapi=new THREE.Vector3(-.4,0,0),u.ust=1.9}else if(tur==="depo"){kutu(g,1.7,.62,1.05,"#C9B28E",0,0,-.12),
kutu(g,1.76,.08,1.11,"#7C7570",0,.62,-.12);for(const x of[-.45,.25])kutu(g,.42,.42,.03,"#5E534B",x,0,.41);kutu(g,.2,.2,.2,"#B48A5C",.66,0,.62),kutu(g,.18,.16,.18,"#A87A4E",.7,.2,.6),kutu(g,.42,.22,.22,
"#23395B",-.48,.05,.72),kutu(g,.16,.2,.22,"#E9E2CF",-.2,.05,.72),silindir(g,.06,.07,.36,"#6E5A4C",.6,.7,-.45,6),camSerit(g,.5,-.1,.48,.41),u.baca=new THREE.Vector3(.6,1.08,-.45),u.kapi=new THREE.Vector3(
-.1,0,.45),u.ust=1.5}else{kutu(g,1.6,.72,1.1,ISLETME_DUVAR[co.recipe_id]??"#DCC7A4",0,0,-.08);const ust=new THREE.Mesh(TESTERE,M("#8F8A84"));ust.scale.set(1.6,.42,1.1),ust.position.set(0,.72,-.08),ust.
castShadow=!0,g.add(ust),kutu(g,.34,.42,.03,"#4A3A30",.2,0,.48),kutu(g,.46,.48,.5,"#EFE6D3",-.98,0,.12),kutu(g,.5,.06,.54,"#B9AE9C",-.98,.48,.12),silindir(g,.1,.13,1.6,"#9A5A43",.58,0,-.45,10),camSerit(
g,.5,-.38,.42,.48),camSerit(g,.36,.58,.42,.48),u.baca=new THREE.Vector3(.58,1.65,-.45),u.kapi=new THREE.Vector3(.2,0,.52),u.ust=2}return g.traverse(o=>{o.userData.isletme=co.company_id}),g}function isciYolu(g){
const kapi=g.localToWorld(g.userData.kapi.clone()).setY(0),ice=new THREE.Vector3(-g.position.x,0,-g.position.z).normalize(),yan=new THREE.Vector3(-ice.z,0,ice.x).multiplyScalar(g.userData.slot%2?.45:-.45),
P=kapi.clone().addScaledVector(ice,.75);return[kapi,P,P.clone().add(yan)]}function isletmeleriKur(liste,animasyon){const s=sehir,goster=liste.slice(0,s.yer.length),kimlik=new Set(goster.map(c=>c.company_id));
for(const[id,g]of[...s.isletmeler]){if(kimlik.has(id))continue;s.isletmeler.delete(id),s.slot.delete(id);const sil=()=>{s.isletmeGrup.remove(g),nesneBirak(g)};animasyon?tweenEkle(.4,e=>g.scale.set(1,Math.
max(.01,1-e),1),0,sil):sil()}const dolu=new Set(s.slot.values());for(const co of goster){let g=s.isletmeler.get(co.company_id);if(!g){let k=s.slot.get(co.company_id);if(k==null){if(k=s.yer.findIndex((_,j)=>!dolu.
has(j)),k<0)continue;s.slot.set(co.company_id,k),dolu.add(k)}g=isletmeBinasi(co);const y=s.yer[k];yerlestir(g,y.a,y.rr),g.userData.slot=k,g.userData.faz=ozet(co.company_id)%1e3/1e3,g.updateMatrixWorld(
!0),g.userData.bacaW=g.localToWorld(g.userData.baca.clone()),g.userData.yol=isciYolu(g),s.isletmeGrup.add(g),s.isletmeler.set(co.company_id,g),animasyon?(g.scale.set(1,.01,1),g.userData.hazir=!1,vincDik(
g.position.x,g.position.z,g.rotation.y,1.8,2.6),tweenEkle(1,e=>g.scale.set(1,Math.max(.01,yumusak.geri(e)),1),.6,()=>{g.userData.hazir=!0})):g.userData.hazir=!0}const u=g.userData;u.co=co,u.uretimde=!!co.
producing,u.isci=co.producing?co.mine?THREE.MathUtils.clamp(co.workers_now??1,1,4):2:0;for(const m of u.camlar??[])m.material=u.uretimde?CAM_ACIK:CAM_KOYU}canliMi()||(s.duman.count=0,s.isciGovde.count=
s.isciBas.count=0),kap&&(kap.dataset.isletme=String(s.isletmeler.size),kap.dataset.duman=String([...s.isletmeler.values()].filter(g=>g.userData.uretimde).length)),kirli=!0}const hayatVar=()=>!!sehir&&
(sehir.hayat.yayalar.length>0||sehir.hayat.araclar.length>0||sehir.hayat.miting>0),canliMi=()=>!!sehir&&([...sehir.isletmeler.values()].some(g=>g.userData.uretimde)||hayatVar()),_y=new THREE.Vector3;function dumanGuncelle(t){
const s=sehir,n=kaliteAdi==="dusuk"?4:6;let i=0;for(const g of s.isletmeler.values()){const u=g.userData;if(!u.uretimde||!u.hazir)continue;const p=u.bacaW;for(let k=0;k<n;k++){const f=hareketAzalt?(k+
.5)/n*.8:(t*.22+k/n+u.faz)%1,o=(.5+f*1.4)*(f<.85?1:(1-f)/.15);_m.compose(_y.set(p.x+Math.sin(f*4+k)*.12+f*.5,p.y+f*2,p.z-f*.3),_q.identity(),_o.set(o,o,o)),s.duman.setMatrixAt(i++,_m)}}s.duman.count=i,
s.duman.instanceMatrix.needsUpdate=!0}function iscileriGuncelle(t,dt){const s=sehir;let i=0;for(const g of s.isletmeler.values()){const u=g.userData;if(!u.uretimde||!u.hazir)continue;u.cark&&!hareketAzalt&&
(u.cark.rotation.z+=dt*2.4);const[A,B,C]=u.yol,l1=A.distanceTo(B),l2=B.distanceTo(C),top=l1+l2;for(let k=0;k<u.isci&&i<ISCI_EN_COK;k++){let f=hareketAzalt?.12+k*.22:(t*.32/top+k/u.isci+u.faz)%2;f>1&&(f=
2-f);const m=f*top;m<=l1?_y.lerpVectors(A,B,m/l1):_y.lerpVectors(B,C,(m-l1)/Math.max(.001,l2));const zip=hareketAzalt?0:Math.abs(Math.sin(t*9+k*1.7))*.025;_m.makeTranslation(_y.x,.11+zip,_y.z),s.isciGovde.
setMatrixAt(i,_m),_m.makeTranslation(_y.x,.27+zip,_y.z),s.isciBas.setMatrixAt(i,_m),i++}}s.isciGovde.count=s.isciBas.count=i,s.isciGovde.instanceMatrix.needsUpdate=s.isciBas.instanceMatrix.needsUpdate=
!0}const ARAC_RENK=["#C65A3B","#23395B","#D9A548","#367F70","#7D5FA0","#EFEDE6","#5C6B7A","#B24A5A"];function hayatKur(nabiz,kampanya){const s=sehir;if(!s)return;const az=telefon()||kaliteAdi==="dusuk",
halkalar=Math.max(1,Math.min(seviye,4)),rnd=rastgele(ozet(String(s.bolge.id))+17),bulunan=Math.max(0,Number(nabiz?.present??0)),yayaN=Math.min(az?20:YAYA_EN_COK,bulunan),yayalar=Array.from({length:yayaN},
(_,k)=>{const h=k%halkalar;return{r:HALKA[h]+(k%2?1:-1)*(HALKA_GEN/2+.12),a0:rnd()*Math.PI*2,yon:k%3?1:-1,hiz:.12+rnd()*.08}}),araclar=[],halkaAraci=(tur,k)=>{const h=(k+(tur==="polis"?1:0))%halkalar,
yon=k%2?1:-1;araclar.push({tur,r:HALKA[h]+yon*.15,a0:rnd()*Math.PI*2,yon,hiz:tur==="araba"?.75+rnd()*.3:.55})};for(let k=0;k<Math.min(az?5:8,Math.ceil(bulunan/3));k++)halkaAraci("araba",k);for(let k=0;k<
Math.min(3,Number(nabiz?.police??0));k++)halkaAraci("polis",k);for(let k=0;k<Math.min(3,Number(nabiz?.gendarmes??0));k++)halkaAraci("jandarma",k);const son=seviye>=5?R-.4:HALKA[Math.min(seviye,4)-1]+1.6,
yolcu=(yon,k)=>araclar.push({tur:"yolcu",cadde:CADDE[(k*2+(yon>0?1:4))%CADDE.length],r0:MEYDAN_R+.3,r1:son,yon,faz:rnd(),hiz:.6});for(let k=0;k<Math.min(2,Number(nabiz?.travel_out??0));k++)yolcu(1,k);
for(let k=0;k<Math.min(2,Number(nabiz?.travel_in??0));k++)yolcu(-1,k);s.hayat={yayalar,araclar:araclar.slice(0,ARAC_EN_COK),miting:Math.min(az?20:MITING_EN_COK,Math.max(0,Number(kampanya?.imza??0)))},
semsiyeleriAta(),s.hayat.araclar.forEach((a,i)=>{const govde=a.tur==="polis"?"#1F2A44":a.tur==="jandarma"?"#46553A":a.tur==="yolcu"?"#E9E0CE":ARAC_RENK[i%ARAC_RENK.length];s.arac.setColorAt(i,_r.set(govde)),
s.aracUst.setColorAt(i,_r.set(a.tur==="polis"||a.tur==="jandarma"?"#EFEDE6":"#A9C6D2"))});for(const m of[s.arac,s.aracUst])m.instanceColor&&(m.instanceColor.needsUpdate=!0);kap&&Object.assign(kap.dataset,
{yaya:String(yayaN),araba:String(s.hayat.araclar.filter(a=>a.tur==="araba").length),polis:String(s.hayat.araclar.filter(a=>a.tur==="polis").length),jandarma:String(s.hayat.araclar.filter(a=>a.tur==="j\
andarma").length),yolcu:String(s.hayat.araclar.filter(a=>a.tur==="yolcu").length),miting:String(s.hayat.miting)}),hayatGuncelle(performance.now()/1e3),kirli=!0}const _r=new THREE.Color;function hayatGuncelle(t){
const s=sehir;if(!s)return;const h=s.hayat,durgun=hareketAzalt;let i=0;const semsiyeYaz=(k,x,y,z,var_)=>{var_?(_m.makeTranslation(x+.035,y+.4,z+.02),s.semsiye.setMatrixAt(k,_m),s.semsiyeSap.setMatrixAt(
k,_m)):(s.semsiye.setMatrixAt(k,SIFIR),s.semsiyeSap.setMatrixAt(k,SIFIR))};h.yayalar.forEach((p,k)=>{const a=p.a0+(durgun?0:t*p.hiz*p.yon/p.r),x=Math.cos(a)*p.r,z=Math.sin(a)*p.r;if(!karadaMi(x,z,.35)){
semsiyeYaz(k,0,0,0,!1);return}const zip=durgun?0:Math.abs(Math.sin(t*8+p.a0*7))*.02;s.yayaGovde.setMatrixAt(i,_m.makeTranslation(x,.11+zip,z)),s.yayaBas.setMatrixAt(i,_m.makeTranslation(x,.27+zip,z)),
semsiyeYaz(k,x,zip,z,!!p.semsiye),i++});for(let k=0;k<h.miting;k++){const sira=Math.floor(k/10),a=-Math.PI/2+(k%10-4.5)*.17+sira%2*.08,rr=1.1+sira*.3,x=Math.cos(a)*rr,z=Math.sin(a)*rr,zip=durgun?0:Math.
max(0,Math.sin(t*5+k*.9))*.05;s.yayaGovde.setMatrixAt(i,_m.makeTranslation(x,.11+zip,z)),s.yayaBas.setMatrixAt(i,_m.makeTranslation(x,.27+zip,z)),semsiyeYaz(YAYA_EN_COK+k,x,zip*.3,z,!!h.mitingSemsiye?.[k]),
i++}s.yayaGovde.count=s.yayaBas.count=i,s.yayaGovde.instanceMatrix.needsUpdate=s.yayaBas.instanceMatrix.needsUpdate=!0,s.semsiye.count=s.semsiyeSap.count=h.semsiyeVar?YAYA_EN_COK+h.miting:0,h.semsiyeVar&&
(s.semsiye.instanceMatrix.needsUpdate=s.semsiyeSap.instanceMatrix.needsUpdate=!0);let j=0;const yan=Math.floor(t*3)%2;h.araclar.forEach((a,k)=>{let x,z,yon;if(a.tur==="yolcu"){const f=durgun?.5:(t*a.hiz/
(a.r1-a.r0)+a.faz)%1,rr=a.yon>0?a.r0+f*(a.r1-a.r0):a.r1-f*(a.r1-a.r0),sag=a.yon>0?.2:-.2;x=Math.cos(a.cadde)*rr+Math.cos(a.cadde+Math.PI/2)*sag,z=Math.sin(a.cadde)*rr+Math.sin(a.cadde+Math.PI/2)*sag,yon=
-a.cadde+(a.yon>0?0:Math.PI)}else{const aci=a.a0+(durgun?0:t*a.hiz*a.yon/a.r);x=Math.cos(aci)*a.r,z=Math.sin(aci)*a.r,yon=-aci-(a.yon>0?Math.PI/2:-Math.PI/2)}karadaMi(x,z,.35)&&(_q.setFromEuler(_e.set(
0,yon,0)),_m.compose(_y.set(x,0,z),_q,_o.set(1,1,1)),s.arac.setMatrixAt(j,_m),s.aracUst.setMatrixAt(j,_m),s.far.setMatrixAt(j,_m),a.tur==="polis"||a.tur==="jandarma"?(s.siren.setMatrixAt(j,_m),s.siren.
setColorAt(j,_r.set(durgun?"#3A6BFF":(yan+k)%2?"#FF3B30":"#3A6BFF"))):s.siren.setMatrixAt(j,_m.makeScale(0,0,0)),j++)}),s.arac.count=s.aracUst.count=s.siren.count=s.far.count=j,s.far.visible=gunesDurum.
gece>.3;for(const m of[s.arac,s.aracUst,s.siren,s.far])m.instanceMatrix.needsUpdate=!0;s.siren.instanceColor&&(s.siren.instanceColor.needsUpdate=!0)}const NOKTA={meclis:{ad:\u00E7("Meclis"),ik:"landma\
rk",oncelik:10},belediye:{ad:\u00E7("Belediye"),ik:"building",oncelik:6},gazete:{ad:\u00E7("Gazete"),ik:"newspaper",oncelik:4,kucuk:!0},pazar:{ad:\u00E7("Pazar"),ik:"store",oncelik:9},meydan:{ad:\u00E7(
"Meydan"),ik:"megaphone",oncelik:3,kucuk:!0},akademi:{ad:\u00E7("Akademi"),ik:"graduation-cap",oncelik:5,kucuk:!0},kisla:{ad:\u00E7("K\u0131\u015Fla"),ik:"castle",oncelik:8},liman:{ad:\u00E7("Liman"),
ik:"anchor",oncelik:7},istasyon:{ad:\u00E7("\u0130stasyon"),ik:"train-front",oncelik:7},sanayi:{ad:\u00E7("Sanayi"),ik:"factory",oncelik:8}};function noktalariKur(){const s=sehir;if(!s||!noktaKap)return;
noktaKap.replaceChildren(),s.noktalar=[];const durum=veri.durumlar??{},ekle=({ad,ik,sinif="",durumMetni,oncelik,konum,tik})=>{const el=document.createElement("button");return el.className="nokta "+sinif,
el.type="button",el.innerHTML=`<span class="nokta-ikon">${ikon(ik)}</span><span class="nokta-ad">${esc(ad)}</span>${durumMetni?`<span class="nokta-durum">${esc(durumMetni)}</span>`:""}`,el.setAttribute(
"aria-label",ad+(durumMetni?", "+durumMetni:"")),el.style.visibility="hidden",el.addEventListener("click",tik),noktaKap.appendChild(el),s.noktalar.push({el,konum,oncelik,w:0,h:0,durum:null}),el},simgeKonum=(ad,ek)=>{
const g=s.simgeler[ad];return!g||!g.userData.ust?null:(g.updateMatrixWorld(!0),(g.userData.merkez?g.userData.merkez.clone():g.localToWorld(new THREE.Vector3)).setY(g.userData.ust+ek))};for(const ad of[
"meclis","pazar","belediye","gazete","meydan","akademi","kisla",s.kiyi?"liman":"istasyon"]){const p=simgeKonum(ad,ad==="meydan"?.4:.35),n=NOKTA[ad];p&&ekle({ad:n.ad,ik:n.ik,sinif:n.kucuk?"kucuk-nokta":
"",durumMetni:durum[ad],oncelik:n.oncelik,konum:p,tik:()=>dinleyici.nokta?.(ad)})}if(s.yer.length){const a=Math.atan2(s.yer.reduce((t,y)=>t+Math.sin(y.a),0),s.yer.reduce((t,y)=>t+Math.cos(y.a),0));ekle(
{ad:NOKTA.sanayi.ad,ik:NOKTA.sanayi.ik,durumMetni:durum.sanayi,oncelik:NOKTA.sanayi.oncelik,konum:new THREE.Vector3(Math.cos(a)*12.4,1.6,Math.sin(a)*12.4),tik:()=>dinleyici.nokta?.("sanayi")})}for(const g of s.
isletmeler.values()){const co=g.userData.co;co?.mine&&ekle({ad:co.name,ik:"briefcase-business",sinif:"evim",durumMetni:co.producing?\u00E7("\xDCretimde"):\u00E7("Durgun"),oncelik:11,konum:g.position.clone().
setY(g.userData.ust+.2),tik:()=>dinleyici.isletme?.(co.company_id)})}s.noktalar.sort((a,b)=>b.oncelik-a.oncelik);for(const h of satilikPinleri()){const b=s.evBina.get(h.house_id);b&&ekle({ad:kr(h.price)+
" kr",ik:"key-round",sinif:"satilik",oncelik:2,konum:new THREE.Vector3(b.x,hedefKat(b,seviye)*KAT+.95,b.z),tik:()=>dinleyici.ev?.(h.house_id)})}for(const[tur,o]of s.projeler){const p=(veri.projeler??[]).
find(x=>x.tur===tur);p&&ekle({ad:p.ad,ik:BLD_PROJE_IKON[tur]??"hammer",sinif:"kucuk-nokta proje-nokta",durumMetni:p.durumYazi,oncelik:3,konum:o.kok.position.clone().setY(o.model.userData.yuk*(o.boy??1)+
.55),tik:()=>dinleyici.proje?.(tur)})}const benim=(veri.evler??[]).find(h=>h.mine),bb=benim&&s.evBina.get(benim.house_id);bb&&ekle({ad:\u00E7("Evim"),ik:"house",sinif:"evim",durumMetni:\u00E7("Senin e\
vin"),oncelik:12,konum:new THREE.Vector3(bb.x,hedefKat(bb,seviye)*KAT+1.2,bb.z),tik:()=>dinleyici.ev?.(benim.house_id)}),s.noktalar.sort((a,b)=>b.oncelik-a.oncelik),kameraDegisti=!0}function satilikPinleri(){
const evler=(veri.evler??[]).filter(h=>h.for_sale&&!h.mine),oyuncu=evler.filter(h=>h.seller==="player").sort((a,b)=>a.price-b.price).slice(0,3),sehirden=Object.keys(MAHALLE_BANT).map(z=>evler.filter(h=>h.
seller==="city"&&h.zone===z).sort((a,b)=>a.no-b.no)[0]).filter(Boolean);return[...oyuncu,...sehirden]}const _ek=new THREE.Vector3;function ekranKonumu(nokta){return _ek.copy(nokta).project(kamera),{x:(_ek.
x*.5+.5)*boyutW,y:(-_ek.y*.5+.5)*boyutH,arkada:_ek.z>1,disarida:Math.abs(_ek.x)>1.1||Math.abs(_ek.y)>1.1}}function noktalariYerlestir(){const s=sehir;if(!s)return;const dolu=[[-1e9,-1e9,1e9,ustBos],[-1e9,
boyutH-altBos,1e9,1e9],...engeller],kesisir=k=>dolu.some(d=>!(k[2]<d[0]||k[0]>d[2]||k[3]<d[1]||k[1]>d[3])),sigar=k=>k[0]>=2&&k[2]<=boyutW-2&&k[1]>=2&&k[3]<=boyutH-2;for(const n of s.noktalar){const k=ekranKonumu(
n.konum);let durum=k.arkada||k.disarida?"gizli":"tam";if(durum==="tam"){n.w||(n.el.classList.remove("sikisik"),n.w=n.el.offsetWidth,n.h=n.el.offsetHeight);const tam=[k.x-n.w/2,k.y-n.h,k.x+n.w/2,k.y],kucuk=[
k.x-21,k.y-44,k.x+21,k.y];sigar(tam)&&!kesisir(tam)?dolu.push(tam):sigar(kucuk)&&!kesisir(kucuk)?(durum="kucuk",dolu.push(kucuk)):durum="gizli",n.el.style.transform=`translate3d(${k.x.toFixed(1)}px, ${k.
y.toFixed(1)}px, 0) translate(-50%, -100%)`}n.durum!==durum&&(n.durum=durum,n.el.style.visibility=durum==="gizli"?"hidden":"visible",n.el.classList.toggle("sikisik",durum==="kucuk")),n.el.style.zIndex=
String(n.oncelik*100+Math.round(k.y/10))}}const yari=new THREE.HemisphereLight("#FFE7C4","#5B6F78",1.5),gunes=new THREE.DirectionalLight("#FFC98C",2.7);gunes.castShadow=!0,gunes.shadow.mapSize.set(1024,
1024),Object.assign(gunes.shadow.camera,{left:-22,right:22,top:22,bottom:-22,near:1,far:120}),gunes.shadow.bias=-4e-4,gunes.shadow.normalBias=.025,sahne.add(yari,gunes,gunes.target);const geceIsiklari=[
[0,0],[-1.6,1.8],[1.8,1.4]].map(([x,z])=>{const n=new THREE.PointLight("#FFB862",0,9,1.6);return n.position.set(x,1.6,z),sahne.add(n),n}),_c=new THREE.Color,karisim=(g,k)=>{_c.setRGB(0,0,0);for(const[
ad,w]of[["gun",g.gun],["aksam",g.aksam],["gece",g.gece]])w>0&&_c.add(new THREE.Color(VAKIT[ad][k]).multiplyScalar(w));return _c.clone()},toplam=(g,k)=>VAKIT.gun[k]*g.gun+VAKIT.aksam[k]*g.aksam+VAKIT.gece[k]*
g.gece;function gunesUygula(g,oran){const[hg,hy]=havaIsik(),kapali=hava.tur!=="acik",gr=karisim(g,"gunes");kapali&&gr.lerp(GUNES_GRI,.5),gunes.color.lerp(gr,oran),gunes.intensity+=(toplam(g,"guc")*hg-
gunes.intensity)*oran;const hedefYon=g.gece>=.5?new THREE.Vector3(...AY_YONU):new THREE.Vector3(...g.yon);gunes.position.lerp(hedefYon,oran);const gk=karisim(g,"gok");kapali&&gk.lerp(GOK_GRI,.45*(1-g.
gece)),yari.color.lerp(gk,oran),yari.groundColor.lerp(karisim(g,"yer"),oran),yari.intensity+=(toplam(g,"yari")*hy-yari.intensity)*oran,sahne.fog&&sahne.fog.color.lerp(sisRengi(),oran);const gece=g.gece;
for(const n of geceIsiklari)n.intensity+=((kaliteAdi==="dusuk"?0:gece*7)-n.intensity)*oran;CAM_ACIK.emissiveIntensity+=(gece*1.6-CAM_ACIK.emissiveIntensity)*oran,sehir?.suMat&&(sehir.suMat.uniforms.uSu1.
value.lerp(karisim(g,"su1"),oran),sehir.suMat.uniforms.uSu2.value.lerp(karisim(g,"su2"),oran)),kirli=!0}function gunesYaz(g,aninda){const geceOldu=g.gece>.5!=gunesDurum.gece>.5;gunesDurum=g,aninda?gunesUygula(
g,1):(tweenEkle(1.1,e=>gunesUygula(g,Math.min(1,e*.35+.05))),tweenEkle(.01,()=>{},1.15,()=>gunesUygula(g,1))),geceOldu&&sehir&&(lambaRengi(),sehir.animasyon=!0),geceOldu&&yagisUygula()}const HAVA_YUK=14,
TANE_EN_COK=1800;let hava={tur:"acik",guclu:!1,kar:0,mevsim:2,bugu:0};const havaZaman={value:0},yagisOlcek={value:400},_hc=new THREE.Color,_hc2=new THREE.Color,BEYAZ=new THREE.Color("#F4F7F8"),GOK_GRI=new THREE.
Color("#C9D1D6"),GUNES_GRI=new THREE.Color("#E6EAED"),KOYU0=KOYU.clone(),YANIK0=YANIK.clone(),SONUK0=SONUK.clone(),taneGeo=ortak((()=>{const g=new THREE.BufferGeometry,p=new Float32Array(TANE_EN_COK*3),
f=new Float32Array(TANE_EN_COK),r=rastgele(9172);for(let i=0;i<TANE_EN_COK;i++){const rr=Math.sqrt(r())*(R+.5),a=r()*Math.PI*2;p[i*3]=Math.cos(a)*rr,p[i*3+1]=r()*HAVA_YUK,p[i*3+2]=Math.sin(a)*rr,f[i]=
r()}return g.setAttribute("position",new THREE.BufferAttribute(p,3)),g.setAttribute("aFaz",new THREE.BufferAttribute(f,1)),g.setDrawRange(0,0),g})()),YAGIS_FS={karShader:`uniform vec3 uRenk; uniform f\
loat uSaydam;
      void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard;
        gl_FragColor = vec4(uRenk, uSaydam * (1.0 - smoothstep(0.15, 0.5, d)));
        #include <colorspace_fragment>
      }`,yagmurShader:`uniform vec3 uRenk; uniform float uSaydam;
      void main(){ vec2 c = gl_PointCoord - 0.5;
        float a = (1.0 - smoothstep(0.045, 0.12, abs(c.x + c.y * 0.1))) * (1.0 - smoothstep(0.26, 0.5, abs(c.y)));
        if (a < 0.03) discard;
        gl_FragColor = vec4(uRenk, uSaydam * a);
        #include <colorspace_fragment>
      }`},yagisGerec=kar=>ortak(new THREE.ShaderMaterial({uniforms:{uZaman:havaZaman,uOlcek:yagisOlcek,uHiz:{value:kar?.85:11},uYuk:{value:HAVA_YUK},uBoyut:{value:kar?.27:1.5},uRenk:{value:new THREE.Color(
kar?"#FFFFFF":"#EEF4F8")},uSaydam:{value:kar?.95:.62}},vertexShader:`attribute float aFaz; uniform float uZaman, uHiz, uYuk, uBoyut, uOlcek;
      void main(){
        float y = mod(position.y - uZaman * uHiz * (0.75 + aFaz * 0.5), uYuk);
        vec3 p = vec3(position.x, y, position.z);
        ${kar?"p.x += sin(uZaman * 0.8 + aFaz * 6.283) * 0.35; p.z += cos(uZaman * 0.55 + aFaz * 4.0) * 0.28;":"p.x += y * 0.05;"}
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = clamp(uBoyut * uOlcek / -mv.z * ${kar?"(0.6 + aFaz * 0.8)":"1.0"}, ${kar?"2.0":"4.0"}, 64.0);
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:kar?YAGIS_FS.karShader:YAGIS_FS.yagmurShader,transparent:!0,depthWrite:!1})),yagmurGerec=yagisGerec(!1),karGerec=yagisGerec(!0),yagis=new THREE.Points(taneGeo,yagmurGerec);yagis.
frustumCulled=!1,yagis.renderOrder=6,yagis.visible=!1,sahne.add(yagis);const PUS_DOKU=ortak((()=>{const t=tuvalDokusu(256,256,x=>{const r=rastgele(4417);for(let i=0;i<46;i++){const cx=r()*256,cy=r()*256,
rr=24+r()*52,a=.28+r()*.3;for(const ox of[-256,0,256])for(const oy of[-256,0,256]){const g=x.createRadialGradient(cx+ox,cy+oy,0,cx+ox,cy+oy,rr);g.addColorStop(0,`rgba(255,255,255,${a.toFixed(2)})`),g.
addColorStop(1,"rgba(255,255,255,0)"),x.fillStyle=g,x.fillRect(cx+ox-rr,cy+oy-rr,rr*2,rr*2)}}});return t.wrapS=t.wrapT=THREE.RepeatWrapping,t.repeat.set(2.2,2.2),t})()),PUS_KENAR=ortak((()=>{const t=tuvalDokusu(
128,128,x=>{const g=x.createRadialGradient(64,64,8,64,64,64);g.addColorStop(0,"#FFFFFF"),g.addColorStop(.62,"#FFFFFF"),g.addColorStop(1,"#000000"),x.fillStyle=g,x.fillRect(0,0,128,128)});return t.colorSpace=
THREE.NoColorSpace,t})()),pusKatman=[.3,.85,1.55].map((y,i)=>{const doku=PUS_DOKU.clone();doku.needsUpdate=!0;const m=new THREE.Mesh(ortak(new THREE.CircleGeometry(R-.2,48).rotateX(-Math.PI/2)),ortak(
new THREE.MeshBasicMaterial({map:ortak(doku),alphaMap:PUS_KENAR,transparent:!0,opacity:0,depthWrite:!1,fog:!1})));return m.position.y=y,m.renderOrder=5,m.visible=!1,m.userData.hiz=[.006,-.0045,.0032][i],
sahne.add(m),m}),sisRenk=new THREE.Color;function sisRengi(){const g=gunesDurum;sisRenk.setRGB(0,0,0);for(const[c,w]of[["#E1E6E9",g.gun],["#E6DDD2",g.aksam],["#283243",g.gece]])w>0&&sisRenk.add(_hc2.set(
c).multiplyScalar(w));return sisRenk}function sisMesafe(){if(!sahne.fog)return;const d=kamera.position.distanceTo(kontrol.target),yogun=hava.tur==="sis";sahne.fog.near=Math.max(.5,d-(yogun?15:6)),sahne.
fog.far=d+(yogun?13:42)}const HAVA_ISIK={acik:[1,1],bulut:[.5,1.22],yagmur:[.34,1.14],kar:[.55,1.3],sis:[.4,1.28]};function havaIsik(){const[g,y]=HAVA_ISIK[hava.tur]??HAVA_ISIK.acik;return hava.guclu?
[g*.72,y*.95]:[g,y]}function yagisUygula(){const az=telefon()||kaliteAdi==="dusuk",kar=hava.tur==="kar",n=hava.tur==="yagmur"?hava.guclu?az?900:1700:az?500:950:kar?hava.guclu?az?800:1500:az?420:800:0;
yagis.material=kar?karGerec:yagmurGerec,taneGeo.setDrawRange(0,n),yagis.visible=n>0;const gece=gunesDurum.gece>.5;yagmurGerec.uniforms.uRenk.value.set(gece?"#B8C7DA":"#EEF4F8"),yagmurGerec.uniforms.uSaydam.
value=(hava.guclu?.75:.62)*(gece?.85:1),yagmurGerec.uniforms.uHiz.value=hava.guclu?14:11,karGerec.uniforms.uHiz.value=hava.guclu?1.3:.85,hava.tur==="sis"||hava.guclu?(sahne.fog??=new THREE.Fog("#E1E6E\
9",30,90),sahne.fog.color.copy(sisRengi()),sisMesafe()):sahne.fog=null,pusKatman.forEach((m,i)=>{m.visible=hava.tur==="sis"&&(i<2||!az),m.material.opacity=[.5,.38,.26][i]}),kap&&Object.assign(kap.dataset,
{hava3b:hava.tur,tanecik:String(n),sis:sahne.fog?"1":"0",pus:String(pusKatman.filter(m=>m.visible).length),bugu:hava.bugu.toFixed(2)}),kirli=!0}const MEVSIMSIZ=new Set(["tropik","col","savan"]),SONBAHAR=[
"#C98A3A","#D8A93F","#B5602F","#C77B35"];function yaprakRengi(a,i,iklim){const c=_hc.copy(a.renk);if((a.tur==="yuvarlak"||a.tur==="kavak")&&!MEVSIMSIZ.has(iklim)){const hafif=iklim==="akdeniz_kiyi"?.45:
1;hava.mevsim===3?c.lerp(_hc2.set(SONBAHAR[i%SONBAHAR.length]),.62*hafif):hava.mevsim===0?c.lerp(_hc2.set(hava.kar>0?"#B8B1A0":"#8F8A70"),(hava.kar>0?.5:.35)*hafif):hava.mevsim===1&&c.lerp(_hc2.set(i%
7===0?"#F2B8C6":"#9CCB6A"),(i%7===0?.6:.28)*hafif)}return hava.kar>0&&c.lerp(BEYAZ,Math.min(.72,hava.kar*(a.tur==="koni"?1.15:.85))),c}function yuzeyUygula(){const s=sehir;if(!s)return;const kar=hava.
kar,islak=hava.tur==="yagmur",zk=Math.round(Math.min(.85,kar*1.1)*20)/20;if(zk!==s.zeminKar){const eski=s.zeminMat.map;s.zeminMat.map=zeminDokusu("#"+_hc.set(s.palet.zemin).lerp(BEYAZ,zk).getHexString()),
s.zeminMat.needsUpdate=!0,eski?.dispose(),s.zeminKar=zk}s.zeminMat.color.setScalar(islak?hava.guclu?.78:.85:1),s.zeminMat.roughness=islak?.72:.96,s.yolMat.color.set(s.palet.yol).multiplyScalar(islak?.8:
1).lerp(BEYAZ,kar*.25),s.meydanMat.color.set(s.palet.meydan).multiplyScalar(islak?.84:1).lerp(BEYAZ,kar*.3),s.yolMat.roughness=s.meydanMat.roughness=islak?.55:.9;const ck=Math.min(.92,kar*1.9);s.binalar.
forEach((b,i)=>{s.egikCatilar.setColorAt(i,_hc.copy(b.cati).lerp(BEYAZ,ck)),s.duzCatilar.setColorAt(i,_hc.copy(b.duzCati).lerp(BEYAZ,ck))});for(const m of[s.egikCatilar,s.duzCatilar])m.instanceColor&&
(m.instanceColor.needsUpdate=!0);s.tarlalar.forEach((t,i)=>s.tarlaMesh.setColorAt(i,_hc.copy(t.renk).lerp(BEYAZ,Math.min(.85,kar*1.2)))),s.tarlaMesh.instanceColor&&(s.tarlaMesh.instanceColor.needsUpdate=
!0),s.agaclar.forEach((a,i)=>s.agacMesh[a.tur]?.setColorAt(a.indeks,yaprakRengi(a,i,s.bolge.iklim)));for(const m of Object.values(s.agacMesh))m.instanceColor&&(m.instanceColor.needsUpdate=!0);KOYU.copy(
KOYU0).lerp(_hc.set("#C3CED4"),hava.bugu*.8),SONUK.copy(SONUK0).lerp(_hc.set("#4E596A"),hava.bugu*.6),YANIK.copy(YANIK0).lerp(_hc.set("#F7E6C2"),hava.bugu*.5),binalariGuncelle(0),kap&&Object.assign(kap.
dataset,{kar:kar.toFixed(2),mevsim:String(hava.mevsim)}),kirli=!0}function semsiyeleriAta(){const s=sehir;if(!s?.hayat||!s.semsiye)return;const h=s.hayat;let n=0;for(let i=0;i<YAYA_EN_COK+MITING_EN_COK;i++)
s.semsiye.setMatrixAt(i,SIFIR),s.semsiyeSap.setMatrixAt(i,SIFIR);h.yayalar.forEach((p,k)=>{p.semsiye=semsiyeli(hava.tur,hava.guclu,k)?SEMSIYE_RENK[k%SEMSIYE_RENK.length]:null,p.semsiye&&(s.semsiye.setColorAt(
k,_hc.set(p.semsiye)),n++)}),h.mitingSemsiye=Array.from({length:h.miting},(_,k)=>semsiyeli(hava.tur,hava.guclu,k+5,.85)?SEMSIYE_RENK[(k+3)%SEMSIYE_RENK.length]:null),h.mitingSemsiye.forEach((c,k)=>{c&&
(s.semsiye.setColorAt(YAYA_EN_COK+k,_hc.set(c)),n++)}),h.semsiyeVar=n>0,s.semsiye.instanceColor&&(s.semsiye.instanceColor.needsUpdate=!0),kap&&(kap.dataset.semsiye=String(n)),hayatGuncelle(performance.
now()/1e3)}function havaYaz(h,aninda=!1){const yeni={tur:h?.tur??"acik",guclu:!!h?.guclu,kar:Number(h?.kar??0),mevsim:Number(h?.mevsim??2),bugu:Number(h?.bugu??0)},degisti=JSON.stringify(yeni)!==JSON.
stringify(hava);hava=yeni,!(!degisti&&!aninda)&&(yagisUygula(),yuzeyUygula(),semsiyeleriAta(),aninda?gunesUygula(gunesDurum,1):(tweenEkle(1.1,e=>gunesUygula(gunesDurum,Math.min(1,e*.35+.05))),tweenEkle(
.01,()=>{},1.15,()=>gunesUygula(gunesDurum,1))))}let basla=null;kontrol.addEventListener("start",()=>{dokunuyor=!0,varsayilanBakis=!1,kontrol.autoRotate=!1,donusDurdu=!0,bosta=0}),kontrol.addEventListener(
"end",()=>{dokunuyor=!1,etkilesimSonu=performance.now()+900});function vur(e){const r=tuval.getBoundingClientRect();isaretci.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1),isinci.
setFromCamera(isaretci,kamera);const s=sehir,v=isinci.intersectObjects([s.simgeGrup,s.isletmeGrup,s.projeGrup,s.duvarlar],!0)[0];if(!v)return null;if(v.object===s.duvarlar){const b=s.binalar[v.instanceId];
return b?.ev?{tur:"ev",id:b.ev.house_id}:null}let o=v.object;for(;o&&!o.userData.simge&&!o.userData.isletme&&!o.userData.proje;)o=o.parent;return o?.userData.isletme?{tur:"isletme",id:o.userData.isletme}:
o?.userData.proje?{tur:"proje",id:o.userData.proje}:o?.userData.simge&&NOKTA[o.userData.simge]?{tur:"nokta",id:o.userData.simge}:null}tuval.addEventListener("pointerdown",e=>{!etkinMi()||!sehir||(basla=
{x:e.clientX,y:e.clientY,t:performance.now()})}),tuval.addEventListener("pointerup",e=>{if(!etkinMi()||!basla||!sehir)return;const kisa=Math.hypot(e.clientX-basla.x,e.clientY-basla.y)<=7&&performance.
now()-basla.t<=500;if(basla=null,!kisa)return;const h=vur(e);h?h.tur==="ev"?dinleyici.ev?.(h.id):h.tur==="isletme"?dinleyici.isletme?.(h.id):h.tur==="proje"?dinleyici.proje?.(h.id):dinleyici.nokta?.(h.
id):dinleyici.bos?.()}),tuval.addEventListener("pointermove",e=>{!etkinMi()||e.buttons||!sehir||e.pointerType==="touch"||(tuval.style.cursor=vur(e)?"pointer":"")});function izdusum(){const d=(ustBos-altBos)/
2;if(Math.abs(d)<1)kamera.clearViewOffset(),kamera.aspect=boyutW/boyutH;else{const tam=boyutH+2*Math.abs(d);kamera.aspect=boyutW/tam,kamera.setViewOffset(boyutW,tam,0,d>0?0:2*Math.abs(d),boyutW,boyutH)}
kamera.updateProjectionMatrix()}function bakisMesafesi(L){const sinir=L>=5?R+2:HALKA[Math.min(L,4)-1]+4.5,oran=boyutW/Math.max(1,boyutH)<1?1.45:1;return THREE.MathUtils.clamp((sinir*3+10)*oran,34,110)}
const GENEL_YON=new THREE.Vector3(.42,.62,.66).normalize(),MERKEZ=new THREE.Vector3(0,.6,0);function genelBakis(aninda){varsayilanBakis=!0;const konum=GENEL_YON.clone().multiplyScalar(bakisMesafesi(seviye)).
add(MERKEZ);aninda?(kamera.position.copy(konum),kontrol.target.copy(MERKEZ),kontrol.update(),kameraDegisti=!0):kameraUc(MERKEZ.clone(),konum,1.2)}function odakla(x,z){varsayilanBakis=!1;const hedef=new THREE.
Vector3(x,.5,z),yon=new THREE.Vector3(x*.4,0,z*.4+6).normalize();kontrol.autoRotate=!1,donusDurdu=!0,bosta=0,kameraUc(hedef,hedef.clone().add(yon.multiplyScalar(14)).setY(11),1.3)}function sehirKur(y){
sehir&&(sahne.remove(sehir.grup),nesneBirak(sehir.grup)),tweenler.length=0;const s=uret(y.bolge);projeAlanlari(y.projeler),evleriYerlestir(y.evler??[]),seviye=y.seviye,s.binalar.forEach(b=>{b.hedef=0,
b.kat=0}),seviyeAyarla(y.seviye,!1),binalariGuncelle(.016),isletmeleriKur(y.isletmeler??[],!1),projeleriKur(y.projeler,!1),genelBakis(!0)}const api={etiket:\u00E7("\u015Eehir (3B)"),sahne,kamera,get kareMs(){
return dokunuyor||performance.now()<etkilesimSonu||tweenler.length?0:kaliteAdi==="dusuk"?50:33},get seviye(){return seviye},dinle(ad,fn){dinleyici[ad]=fn},kapBagla(k,nk){kap=k,noktaKap=nk,noktalariKur(),
kirli=!0},durumYaz(y){const yeni=!sehir||sehir.bolge.id!==y.bolge.id;veri=y,yeni?sehirKur(y):(projeAlanlari(y.projeler),evleriYerlestir(y.evler??[]),seviyeAyarla(y.seviye,y.seviye>seviye),isletmeleriKur(
y.isletmeler??[],!0),projeleriKur(y.projeler,!0)),y.gunes&&gunesYaz(y.gunes,yeni),elcilikleriKur(y.elcilikler),afisleriKur(y.secim),savasKur(y.savas),hayatKur(y.nabiz,y.kampanya),y.hava&&havaYaz(y.hava,
yeni),noktalariKur(),kirli=!0},gunesYaz(g){gunesYaz(g,!1)},havaYaz(h){havaYaz(h,!1)},get hava(){return{...hava,tanecik:taneGeo.drawRange.count,sis:!!sahne.fog}},genelBakis(){genelBakis(!1)},odakla(tur,id){
const s=sehir;if(s){if(tur==="ev"){const b=s.evBina.get(id);b&&odakla(b.x,b.z)}else if(tur==="isletme"){const g=s.isletmeler.get(id);g&&odakla(g.position.x,g.position.z)}else if(tur==="proje"){const y=s.
projeYer[id];y&&odakla(y.x,y.z)}}},kalite(k){kaliteAdi=k,gunes.castShadow=k!=="dusuk";const boy=k==="yuksek"?2048:1024;gunes.shadow.mapSize.x!==boy&&(gunes.shadow.mapSize.set(boy,boy),gunes.shadow.map?.
dispose(),gunes.shadow.map=null);for(const n of geceIsiklari)n.intensity=k==="dusuk"?0:gunesDurum.gece*7;yagisUygula(),kirli=!0},bosluk(ust,alt,engel=[]){engeller=engel,kameraDegisti=!0,!(Math.abs(ust-
ustBos)<1&&Math.abs(alt-altBos)<1)&&(ustBos=Math.max(0,ust),altBos=Math.max(0,alt),izdusum(),kirli=!0)},boyut(w,h){boyutW=w,boyutH=h,yagisOlcek.value=h*(cizici.renderer?.getPixelRatio?.()??1)*.5,izdusum();
for(const n of sehir?.noktalar??[])n.w=0;varsayilanBakis&&sehir&&!tweenler.length&&genelBakis(!0),kameraDegisti=!0,kirli=!0},etkinlestir(acik){etkin=acik,kontrol.enabled=acik,kontrol.autoRotate=acik&&
otoDonus()&&!donusDurdu,noktaKap&&(noktaKap.style.display=acik?"":"none"),acik?(kameraDegisti=!0,kirli=!0):(basla=null,dokunuyor=!1,tuval.style.cursor="")},guncelle(dt,t){for(let i=tweenler.length-1;i>=
0;i--){const tw=tweenler[i];if(tw.t+=dt,tw.t<0)continue;const e=Math.min(1,tw.t/tw.sure);tw.fn(e),e>=1&&(tweenler.splice(i,1),tw.bitince?.()),kirli=!0}const s=sehir;if(s){if(s.animasyon&&(s.animasyon=
binalariGuncelle(dt)||tweenler.length>0,kirli=!0),canliMi()&&(dumanGuncelle(t),iscileriGuncelle(t,dt),hayatVar()&&hayatGuncelle(t),kirli=!0),(s.savasDuman||s.savasIsci)&&(savasGuncelle(t),kirli=!0),s.
projeler.size&&!hareketAzalt&&(projeleriOynat(t),kirli=!0),s.suMat&&kaliteAdi!=="dusuk"&&!hareketAzalt&&(zaman.value=t,kirli=!0),yagis.visible&&!hareketAzalt&&(havaZaman.value=t,kirli=!0),pusKatman[0].
visible&&!hareketAzalt){for(const m of pusKatman)m.material.map.offset.set(t*m.userData.hiz%1,t*m.userData.hiz*.6%1);kirli=!0}sahne.fog&&sisMesafe(),donusDurdu&&otoDonus()&&(bosta+=dt,bosta>14&&!dokunuyor&&
(kontrol.autoRotate=!0,donusDurdu=!1)),kontrol.update()&&(kameraDegisti=!0),kameraDegisti&&(noktalariYerlestir(),kameraDegisti=!1,kirli=!0),gunes.target.position.set(0,0,0)}},cizilmeli(){const c=kirli;
return kirli=!1,c}};return api}Parcalar.tamam("uc_48_sehir3b");
