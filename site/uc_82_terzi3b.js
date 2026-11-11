// Civora istemcisi 2026-11-11-88bf220f-2e9125c (uc_82_terzi3b.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";const TERZI_KIYAFETLER=["gunluk","takim","tulum","kazak","spor","yelek","uniforma"];function terziAynaKur(THREE,gen,yuk,cozunurluk=512){const dokuMatrisi=new THREE.Matrix4,hedef=new THREE.WebGLRenderTarget(
cozunurluk,cozunurluk,{type:THREE.HalfFloatType}),yansiyan=new THREE.ShaderMaterial({uniforms:{renk:{value:new THREE.Color("#B4BBBE")},doku:{value:hedef.texture},dokuMatrisi:{value:dokuMatrisi}},vertexShader:`\
uniform mat4 dokuMatrisi;
      varying vec4 vUv;
      void main() {
        vUv = dokuMatrisi * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`uniform vec3 renk;
      uniform sampler2D doku;
      varying vec4 vUv;
      float ortu(float a, float b) { return a < 0.5 ? (2.0 * a * b) : (1.0 - 2.0 * (1.0 - a) * (1.0 - b)); }
      void main() {
        vec4 t = texture2DProj(doku, vUv);
        gl_FragColor = vec4(ortu(t.r, renk.r), ortu(t.g, renk.g), ortu(t.b, renk.b), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`}),camTuval=document.createElement("canvas");camTuval.width=64,camTuval.height=128;{const g=camTuval.getContext("2d"),d=g.createLinearGradient(0,0,64,128);d.addColorStop(0,"#E8EFF0"),d.addColorStop(
.55,"#B9C9CC"),d.addColorStop(1,"#D5E0E2"),g.fillStyle=d,g.fillRect(0,0,64,128),g.fillStyle="rgba(255,255,255,0.5)",g.beginPath(),g.moveTo(10,128),g.lineTo(26,128),g.lineTo(58,0),g.lineTo(42,0),g.fill()}
const camDoku=new THREE.CanvasTexture(camTuval);camDoku.colorSpace=THREE.SRGBColorSpace;const duzCam=new THREE.MeshBasicMaterial({map:camDoku}),ayna=new THREE.Mesh(new THREE.PlaneGeometry(gen,yuk),yansiyan),
sanal=new THREE.PerspectiveCamera,duzlem=new THREE.Plane,normal=new THREE.Vector3,aynaKonum=new THREE.Vector3,kameraKonum=new THREE.Vector3,donme=new THREE.Matrix4,bakis=new THREE.Vector3,bak=new THREE.
Vector3,hedefN=new THREE.Vector3,kesit=new THREE.Vector4,q=new THREE.Vector4;let acik=!0;return ayna.onBeforeRender=(renderer,sahne,kamera)=>{if(!acik||(aynaKonum.setFromMatrixPosition(ayna.matrixWorld),
kameraKonum.setFromMatrixPosition(kamera.matrixWorld),donme.extractRotation(ayna.matrixWorld),normal.set(0,0,1).applyMatrix4(donme),bakis.subVectors(aynaKonum,kameraKonum),bakis.dot(normal)>0))return;
bakis.reflect(normal).negate().add(aynaKonum),donme.extractRotation(kamera.matrixWorld),bak.set(0,0,-1).applyMatrix4(donme).add(kameraKonum),hedefN.subVectors(aynaKonum,bak).reflect(normal).negate().add(
aynaKonum),sanal.position.copy(bakis),sanal.up.set(0,1,0).applyMatrix4(donme).reflect(normal),sanal.lookAt(hedefN),sanal.far=kamera.far,sanal.updateMatrixWorld(),sanal.projectionMatrix.copy(kamera.projectionMatrix),
dokuMatrisi.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),dokuMatrisi.multiply(sanal.projectionMatrix).multiply(sanal.matrixWorldInverse).multiply(ayna.matrixWorld),duzlem.setFromNormalAndCoplanarPoint(normal,
aynaKonum).applyMatrix4(sanal.matrixWorldInverse),kesit.set(duzlem.normal.x,duzlem.normal.y,duzlem.normal.z,duzlem.constant);const pm=sanal.projectionMatrix.elements;q.set((Math.sign(kesit.x)+pm[8])/pm[0],
(Math.sign(kesit.y)+pm[9])/pm[5],-1,(1+pm[10])/pm[14]),kesit.multiplyScalar(2/kesit.dot(q)),pm[2]=kesit.x,pm[6]=kesit.y,pm[10]=kesit.z+1-.003,pm[14]=kesit.w,ayna.visible=!1;const onceki=renderer.getRenderTarget(),
xr=renderer.xr.enabled,golge=renderer.shadowMap.autoUpdate;renderer.xr.enabled=!1,renderer.shadowMap.autoUpdate=!1,renderer.setRenderTarget(hedef),renderer.state.buffers.depth.setMask(!0),renderer.autoClear===
!1&&renderer.clear(),renderer.render(sahne,sanal),renderer.xr.enabled=xr,renderer.shadowMap.autoUpdate=golge,renderer.setRenderTarget(onceki),kamera.viewport!==void 0&&renderer.state.viewport(kamera.viewport),
ayna.visible=!0},{ayna,get acik(){return acik},yansima(x){acik=!!x,ayna.material=acik?yansiyan:duzCam}}}function terziGiysiKur(THREE,mat,id,renk){const g=new THREE.Group;g.userData.kiyafet=id;const koyu=(r,f)=>"\
#"+new THREE.Color(r).multiplyScalar(f).getHexString(),kutu=(gen,yuk,der,r,x,y,z=0,rz=0)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(gen,yuk,der),typeof r=="string"?mat(r):r);return m.position.set(
x,y,z),m.rotation.z=rz,g.add(m),m},gomlek="#F1EADB",uniforma=id==="uniforma",ana=uniforma?UNIFORMA.kumas:id==="takim"?koyu(renk,.8):id==="tulum"||id==="yelek"?gomlek:renk,govdeGen=id==="yelek"?.27:.3;
kutu(govdeGen,.42,.05,ana,0,-.33);const kol={gunluk:"kisa",spor:"uzun",takim:"uzun",tulum:"uzun",kazak:"uzun",uniforma:"uzun",yelek:null}[id];if(kol)for(const y of[-1,1]){const boy=kol==="kisa"?.13:.34,
k=kutu(.08,boy,.05,ana,y*(govdeGen/2+.03),-.14-boy/2+.02,0,y*.22);if(id==="spor"){const s=new THREE.Mesh(new THREE.BoxGeometry(.02,boy*.92,.052),mat("#F2EFE8"));s.position.set(y*.02,0,.001),k.add(s)}}
if(id==="gunluk")kutu(.12,.03,.055,koyu(renk,1.25),0,-.135);else if(id==="takim"){kutu(.08,.17,.052,gomlek,0,-.2),kutu(.028,.15,.056,"#7A2A2A",0,-.22);for(const y of[-1,1])kutu(.03,.2,.056,koyu(renk,.62),
y*.055,-.21,0,y*.32)}else if(id==="tulum"){kutu(.22,.2,.056,renk,0,-.44);for(const y of[-1,1])kutu(.04,.2,.056,renk,y*.09,-.26),kutu(.12,.34,.05,renk,y*.075,-.71)}else if(id==="kazak")kutu(.3,.05,.056,
koyu(renk,.82),0,-.52),kutu(.13,.04,.056,koyu(renk,.75),0,-.135);else if(id==="spor")kutu(.012,.4,.056,"#F2EFE8",0,-.33);else if(id==="yelek"){kutu(govdeGen+.004,.36,.056,renk,0,-.36);for(let i=0;i<3;i++)
kutu(.022,.022,.06,"#D9B865",.03,-.27-i*.09)}else if(uniforma){for(const y of[-1,1])kutu(.09,.08,.056,UNIFORMA.koyu,y*.07,-.25),kutu(.07,.025,.06,UNIFORMA.sirma,y*.13,-.125);kutu(.31,.04,.056,UNIFORMA.
kemer,0,-.5)}const kilit=new THREE.Group,kilitMat=mat("#D9B865",{metalness:.6,roughness:.35}),govde=new THREE.Mesh(new THREE.BoxGeometry(.08,.07,.03),kilitMat),kulp=new THREE.Mesh(new THREE.TorusGeometry(
.026,.008,6,14,Math.PI),kilitMat);return kulp.position.y=.035,kilit.add(govde,kulp),kilit.position.set(0,-.33,.05),kilit.visible=!1,g.add(kilit),g.userData.kilit=kilit,g}function terziOdasiKur(THREE){
const malzeme=new Map,mat=(r,ek={})=>{const k=r+JSON.stringify(ek);return malzeme.has(k)||malzeme.set(k,new THREE.MeshStandardMaterial({color:r,roughness:.75,...ek})),malzeme.get(k)},grup=new THREE.Group,
kutu=(ust,gen,yuk,der,r,x,y,z)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(gen,yuk,der),typeof r=="string"?mat(r):r);return m.position.set(x,y,z),m.receiveShadow=!0,ust.add(m),m},tuval=(gen,yuk,ciz)=>{
const c=document.createElement("canvas");c.width=gen,c.height=yuk,ciz(c.getContext("2d"));const t=new THREE.CanvasTexture(c);return t.colorSpace=THREE.SRGBColorSpace,t},Y0=-.22,tahta=tuval(512,512,g=>{
const r=rastgele(1515);for(let i=0;i<8;i++){const t=.85+r()*.2;g.fillStyle=`rgb(${Math.round(150*t)},${Math.round(104*t)},${Math.round(70*t)})`,g.fillRect(0,i*64,512,64),g.fillStyle="rgba(60,35,20,0.3\
5)",g.fillRect(0,i*64,512,2);const kes=r()*512;g.fillRect(kes,i*64,2,64);for(let j=0;j<6;j++)g.fillStyle="rgba(90,55,30,0.12)",g.fillRect(r()*512,i*64+8+r()*48,60+r()*120,2)}});tahta.wrapS=tahta.wrapT=
THREE.RepeatWrapping,tahta.repeat.set(3,2);const zemin=new THREE.Mesh(new THREE.PlaneGeometry(14,9),new THREE.MeshStandardMaterial({map:tahta,roughness:.6}));zemin.rotation.x=-Math.PI/2,zemin.position.
set(0,Y0,1.6),zemin.receiveShadow=!0,grup.add(zemin);const kagit=tuval(256,256,g=>{g.fillStyle="#EFE3C9",g.fillRect(0,0,256,256);for(let i=0;i<8;i++)g.fillStyle=i%2?"#E3D3B2":"#EFE3C9",g.fillRect(i*32,
0,32,256);g.fillStyle="rgba(169,82,58,0.25)";for(let i=0;i<8;i++)for(let j=0;j<4;j++)g.beginPath(),g.arc(i*32+16,j*64+(i%2?48:16),3,0,Math.PI*2),g.fill()});kagit.wrapS=kagit.wrapT=THREE.RepeatWrapping,
kagit.repeat.set(7,3);const DUVAR_Z=-2.2,duvar=new THREE.Mesh(new THREE.PlaneGeometry(14,6.5),new THREE.MeshStandardMaterial({map:kagit,roughness:.9}));duvar.position.set(0,Y0+3.25,DUVAR_Z),duvar.receiveShadow=
!0,grup.add(duvar),kutu(grup,14,.95,.06,"#6E4A32",0,Y0+.475,DUVAR_Z+.03),kutu(grup,14,.06,.1,"#4E3524",0,Y0+.98,DUVAR_Z+.05);const ampul=mat("#FFF1C8",{emissive:new THREE.Color("#FFC56E"),emissiveIntensity:.9});
for(const x of[-1.15,1.15]){kutu(grup,.08,.2,.06,"#B08A3E",x,Y0+2.95,DUVAR_Z+.04);const a=new THREE.Mesh(new THREE.SphereGeometry(.09,12,8),ampul);a.position.set(x,Y0+3.12,DUVAR_Z+.14),grup.add(a)}const hali=new THREE.
Mesh(new THREE.CylinderGeometry(1.75,1.75,.012,48),mat("#8E3B35",{roughness:1}));hali.position.set(0,Y0+.006,.15),hali.receiveShadow=!0,grup.add(hali);const kenar=new THREE.Mesh(new THREE.TorusGeometry(
1.6,.025,6,60),mat("#D9B865",{roughness:.9}));kenar.rotation.x=Math.PI/2,kenar.position.set(0,Y0+.014,.15),grup.add(kenar);const dolap=new THREE.Group,DG=1.5,DY=2.65,DD=.56,ahsap="#8A5A3A";kutu(dolap,
DG,DY,.04,"#C9A57A",0,DY/2,-DD/2);for(const x of[-1,1])kutu(dolap,.06,DY,DD,ahsap,x*(DG/2-.03),DY/2,0);kutu(dolap,DG,.08,DD+.04,ahsap,0,DY-.04,.02),kutu(dolap,DG,.14,DD,ahsap,0,.07,0),kutu(dolap,DG-.12,
.04,DD-.06,ahsap,0,1.38,0);const demir=mat("#C9C4BA",{metalness:.7,roughness:.3}),RAY=[2.38,1.3];for(const y of RAY){const r=new THREE.Mesh(new THREE.CylinderGeometry(.016,.016,DG-.12,10).rotateZ(Math.
PI/2),demir);r.position.set(0,y,0),dolap.add(r)}const askilar=new Map,yerler=[[-.51,0],[-.17,0],[.17,0],[.51,0],[-.36,1],[0,1],[.36,1]];TERZI_KIYAFETLER.forEach((id,i)=>{const[x,s]=yerler[i],kanca=new THREE.
Group;kanca.position.set(x,RAY[s],.02);const k=new THREE.Mesh(new THREE.TorusGeometry(.03,.006,6,12,Math.PI*1.3),demir);k.position.set(0,-.005,0),kanca.add(k);const cubuk=new THREE.Mesh(new THREE.BoxGeometry(
.32,.018,.018),mat("#6B4A32"));cubuk.position.set(0,-.11,0),kanca.add(cubuk),dolap.add(kanca),askilar.set(id,{kanca,giysi:null,salla:0})}),dolap.position.set(-2.1,Y0,-.85),dolap.rotation.y=.5,grup.add(
dolap);const aynaGrup=new THREE.Group,AG=.9,AY=2.45,AA=.28,cerceve=mat("#6B4A32",{roughness:.45});for(const x of[-1,1])kutu(aynaGrup,.07,AY+.14,.07,cerceve,x*(AG/2+.035),AA+AY/2,0);for(const y of[AA-.035,
AA+AY+.035])kutu(aynaGrup,AG+.14,.07,.07,cerceve,0,y,0);for(const x of[-1,1])kutu(aynaGrup,.07,AA,.07,cerceve,x*(AG/2+.035),AA/2,0),kutu(aynaGrup,.12,.05,.5,cerceve,x*(AG/2+.035),.025,0);kutu(aynaGrup,
AG+.02,AY+.02,.02,"#3A3633",0,AA+AY/2,-.03);const ayna=terziAynaKur(THREE,AG,AY);ayna.ayna.position.set(0,AA+AY/2,.005),aynaGrup.add(ayna.ayna),aynaGrup.position.set(1.85,Y0,-.55),aynaGrup.rotation.y=
-.74,grup.add(aynaGrup);const aynaNokta=new THREE.Vector3(1.85,0,-.55),noktalar=dar=>(dar?[[-2.05,Y0,-.35],[-2.05,2.45,-.95],[2.28,Y0,-.15],[2.28,2.6,-.2],[0,2.55,0],[0,Y0,1.1]]:[[-2.65,Y0,-.24],[-2.9,
2.45,-.74],[2.28,Y0,-.15],[2.28,2.6,-.2],[0,2.55,0],[0,Y0,1.1]]).map(p=>new THREE.Vector3(...p));let anahtar="";function giydir({kiyafet,renk,uniformaAcik}){const k=`${renk}|${uniformaAcik?1:0}`;if(k!==
anahtar){anahtar=k;for(const[id,a]of askilar)a.giysi&&a.kanca.remove(a.giysi),a.giysi=terziGiysiKur(THREE,mat,id,renk),a.giysi.userData.kilit.visible=id==="uniforma"&&!uniformaAcik,a.kanca.add(a.giysi)}
for(const[id,a]of askilar){const bos=id===kiyafet;a.giysi.visible===bos&&(a.salla=performance.now()),a.giysi.visible=!bos}}return{grup,askilar,ayna,aynaGrup,aynaNokta,noktalar,giydir,tiklanir:()=>[...askilar.
values()].map(a=>a.giysi).filter(g=>g?.visible)}}Parcalar.tamam("uc_82_terzi3b");
