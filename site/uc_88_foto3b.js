// Civora istemcisi 2026-11-11-88bf220f-2e9125c (uc_88_foto3b.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";const FOTO_EN=8,FOTO_EN_TEL=6,FOTO_NOKTA=1.42,FOTO_YER=[[-1.05,.35,0],[1.05,.35,0],[-2.05,.25,0],[2.05,.25,0],[-.55,-.75,.32],[.55,-.75,.32],[-1.6,-.8,.32],[1.6,-.8,.32]],FOTO_SIRA=[0,1,4,5,2,3,6,7];function foto3bKur(THREE,cizici){
if(!cizici.kur())throw new Error("webgl-yok");const tuval=cizici.renderer.domElement,sahne=new THREE.Scene,kamera=new THREE.PerspectiveCamera(30,1,.1,60);let w=1,h=1,kirli=!0,kapEl=null,gorunur=!0,gozcu=null,
d={ben:null,arkadaslar:[],fazla:0};const dinleyici={},etkinMi=()=>cizici.etkin===api,M=(renk,ek={})=>new THREE.MeshStandardMaterial({color:renk,roughness:.8,...ek}),kutu=(ust,gx,gy,gz,mat,x=0,y=0,z=0)=>{
const m=new THREE.Mesh(new THREE.BoxGeometry(gx,gy,gz),mat);return m.position.set(x,y+gy/2,z),m.receiveShadow=!0,ust.add(m),m};sahne.add(new THREE.HemisphereLight(UC_RENK.gokIc,UC_RENK.yerIc,1.35));const isik=new THREE.
DirectionalLight(UC_RENK.gunesIc,1.9);isik.position.set(-2.5,6,6),isik.castShadow=!0,isik.shadow.mapSize.set(1024,1024),Object.assign(isik.shadow.camera,{left:-3.5,right:3.5,top:3.5,bottom:-1,near:1,far:20}),
sahne.add(isik,isik.target),sahne.background=new THREE.Color(UC_RENK.kagit);const fonMat=new THREE.MeshStandardMaterial({color:"#B9C9C1",roughness:1}),fon=new THREE.Mesh(new THREE.CylinderGeometry(1.2,
1.2,7.2,24,1,!0,Math.PI,Math.PI/2).rotateZ(Math.PI/2),fonMat);fon.material.side=THREE.DoubleSide,fon.position.set(0,1.2,-1.6),fon.receiveShadow=!0,sahne.add(fon),kutu(sahne,7.2,3.2,.05,fonMat,0,1.2,-2.8),
kutu(sahne,7.2,.05,3.4,fonMat,0,-.05,.9),kutu(sahne,4.6,.32,1,M("#8A6A4A",{roughness:.6}),0,0,-.78);for(const x of[-3,3]){const g=new THREE.Group;g.position.set(x,0,.6),kutu(g,.04,1.9,.04,M("#3A3633"),
0,0,0);const s=new THREE.Mesh(new THREE.ConeGeometry(.4,.3,16,1,!0),M("#F7F2E6",{side:THREE.DoubleSide,emissive:new THREE.Color("#FFF1D8"),emissiveIntensity:.4}));s.position.set(0,1.95,0),s.rotation.x=
Math.PI*.6*(x<0,1),s.rotation.z=x<0?-.5:.5,g.add(s),sahne.add(g)}const tabelaTuval=document.createElement("canvas");tabelaTuval.width=128,tabelaTuval.height=64;const tabelaDoku=new THREE.CanvasTexture(
tabelaTuval);tabelaDoku.colorSpace=THREE.SRGBColorSpace;const tabela=new THREE.Mesh(new THREE.PlaneGeometry(.6,.3),new THREE.MeshStandardMaterial({map:tabelaDoku,roughness:.7}));tabela.position.set(2.75,
.55,.9),tabela.rotation.y=-.3,sahne.add(tabela);const benim=figurParcasi(THREE);benim.grup.scale.setScalar(.62),benim.grup.position.set(0,0,.45),sahne.add(benim.grup);const noktaMat=new THREE.MeshBasicMaterial(
{color:"#3FD07A"}),yerler=FOTO_YER.map(([x,z,y])=>{const fp=figurParcasi(THREE);fp.grup.scale.setScalar(.56),fp.grup.position.set(x,y,z),fp.grup.rotation.y=-x*.08,fp.grup.visible=!1,sahne.add(fp.grup);
const nokta=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),noktaMat);return nokta.position.set(x,y+1.42,z),nokta.visible=!1,sahne.add(nokta),{fp,nokta,kisi:null,faz:Math.random()*3}});function yaz(){
d.ben&&benim.kur({...d.ben,ek:null});const en=telefon()?6:8;for(const y of yerler)y.kisi=null,y.fp.grup.visible=!1,y.nokta.visible=!1;d.arkadaslar.slice(0,en).forEach((k,j)=>{const y=yerler[FOTO_SIRA[j]];
y.kisi=k,y.fp.grup.visible=!0,y.nokta.visible=!!k.cevrimici,y.fp.kur({anahtar:k.kimlik,ad:k.ad,gorunus:k.gorunus,ulke:k.ulke,rutbe:k.rutbe,ek:null})});const fazla=Math.max(0,d.arkadaslar.length-en)+(d.
fazla??0);if(tabela.visible=fazla>0,tabela.position.x=genislik()-.3,fazla>0){const g=tabelaTuval.getContext("2d");g.fillStyle="#F7F2E6",g.fillRect(0,0,128,64),g.strokeStyle="#6B4E36",g.lineWidth=6,g.strokeRect(
3,3,122,58),g.fillStyle="#3A3324",g.font="800 34px Figtree, system-ui, sans-serif",g.textAlign="center",g.textBaseline="middle",g.fillText("+"+sayi(fazla),64,34),tabelaDoku.needsUpdate=!0}kapEl&&Object.
assign(kapEl.dataset,{kisi:String(yerler.filter(y=>y.kisi).length),cevrimici:String(yerler.filter(y=>y.kisi?.cevrimici).length)}),kameraKur()}const genislik=()=>Math.max(.9,...yerler.filter(y=>y.kisi).
map(y=>Math.abs(y.fp.grup.position.x)))+.6;function kameraKur(){kamera.aspect=w/h;const x=genislik(),n=[[-x,0,1.05],[x,0,1.05],[-x,1.8,-.85],[x,1.8,-.85]].map(p=>new THREE.Vector3(...p));kameraSigdir(
THREE,kamera,n,new THREE.Vector3(0,.3,1).normalize(),{x:.97,ust:.95,alt:-.95}),kirli=!0}const isin=new THREE.Raycaster,imlec=new THREE.Vector2;let selamBasi=0;tuval.addEventListener("pointerup",e=>{if(!etkinMi())
return;const r=tuval.getBoundingClientRect();imlec.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1),isin.setFromCamera(imlec,kamera);const hedefler=[benim.grup,...yerler.filter(y2=>y2.
kisi).map(y2=>y2.fp.grup)],v=isin.intersectObjects(hedefler,!0)[0];if(!v)return;let o=v.object;for(;o&&!hedefler.includes(o);)o=o.parent;if(o===benim.grup){selamBasi=performance.now(),kirli=!0;return}
const y=yerler.find(x=>x.fp.grup===o);y?.kisi&&dinleyici.profil?.(y.kisi.kimlik)});const api={etiket:\u00E7("Arkada\u015Flar foto\u011Fraf\u0131 (3B): arkada\u015Flar\u0131n yan yana, \xE7evrimi\xE7i olanlar el sallar"),
sahne,kamera,surekli:!0,get kareMs(){return!gorunur||hareketAzalt?1e3:telefon()?50:33},dinle(ad,fn){dinleyici[ad]=fn},kapBagla(el){kapEl=el??null,gozcu?.disconnect(),gozcu=null,kapEl&&typeof IntersectionObserver<
"u"&&(gozcu=new IntersectionObserver(g=>{gorunur=g.some(x=>x.isIntersecting),kirli=!0}),gozcu.observe(kapEl)),kirli=!0},durumYaz(y){d={...d,...y},yaz()},kalite(k){isik.castShadow=k!=="dusuk",kirli=!0},
boyut(gen,yuk){w=gen,h=yuk,kameraKur()},etkinlestir(acik){acik&&(kirli=!0)},guncelle(dt,t){if(!gorunur)return;const p=performance.now(),ss=benim.eylemSuresi("selamla");selamBasi&&(p-selamBasi)/1e3<ss&&
!hareketAzalt?benim.pozla("selamla",(p-selamBasi)/1e3/ss,(p-selamBasi)/1e3,!1,!1):benim.pozla("bekle",t%3/3,t,hareketAzalt,!0),hareketAzalt||benim.canli(t);for(const y of yerler){if(!y.kisi)continue;const tt=t+
y.faz;if(y.kisi.cevrimici){const sure=y.fp.eylemSuresi("selamla")||2,u=tt%4/4*(4/sure);u<1&&!hareketAzalt?y.fp.pozla("selamla",u,tt,!1,!1):y.fp.pozla("bekle",.5,tt,!0,!0),y.nokta.position.y=y.fp.grup.
position.y+1.42+(hareketAzalt?0:Math.sin(tt*3)*.03)}else y.fp.pozla("bekle",.5,tt,!0,!0);hareketAzalt||y.fp.canli(tt)}kirli=!0},cizilmeli(){const c=kirli;return kirli=!1,c}};return api}Parcalar.tamam(
"uc_88_foto3b");
