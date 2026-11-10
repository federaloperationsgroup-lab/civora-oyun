// Civora istemcisi 2026-11-10-07201b6c-c3ff3d2 (uc_41_harita3b.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";function harita3bKur(THREE,MapControls,cizici,veri){if(!cizici.kur())throw new Error("webgl-yok");const S=.1,YUK_KAPALI=.32,YUK_ACIK=.62,YUK_NOTR=.22,SIS=new THREE.Color("#E8E4D6"),[W,H]=veri.tuval,sahne=new THREE.
Scene,kamera=new THREE.PerspectiveCamera(36,1,.5,1200);let kontrol=null,kap=null,etiketKap=null,ipucuEl=null,boyutW=1,boyutH=1;const isinci=new THREE.Raycaster,isaretci=new THREE.Vector2,secilebilir=[],
bolgeMesh=new Map,ulkeMesh=new Map,sehirKume=new Map,baskentEtiket=new Map,etiketler=[],surekli=[];let kip="siyasi",secili=null,uzerinde=null;const zaman={value:0};let kameraDegisti=!0,ciz=!0,kaliteAdi="\
orta",etkilesimAn=0,ucuyor=!1,yokEdildi=!1,kameraKaresi=null,ucusNesli=0;const dinleyici={};let durum={sahip:{},acik:new Set,uyuyan:new Set,savaslar:[],girisimler:[],ozerkler:[],ozkSurecler:[],sehirler:{},
konum:null,ulkem:null,yol:null,saatFarki:0,isbirligi:null,trafik:null,isgaller:[],hasar:{}};const bolgeById=new Map(veri.bolgeler.map(b=>[b.id,b])),ulkeById=new Map(veri.ulkeler.map((u,i)=>[u.id,{u,i}])),
ayrintili=new Set(veri.bolgeler.map(b=>b.ulke)),savasGrubu=new THREE.Group;sahne.add(savasGrubu);let savasAnahtar="",savasEtiketleri=[],savasAnim=[];const girisimGrubu=new THREE.Group;sahne.add(girisimGrubu);
let girisimAnahtar="",girisimEtiketleri=[],girisimAnim=[],filmAnahtar="",filmEtiketleri=[];const ozkGrubu=new THREE.Group;sahne.add(ozkGrubu);let ozkAnahtar="",ozkEtiketleri=[],ozkAnim=[];const drnGrubu=new THREE.
Group;sahne.add(drnGrubu);let drnAnahtar="",drnEtiketleri=[],drnAnim=[],konumGrubu=null,konumEtiketi=null,konumAnim=null;const _yansit=new THREE.Vector3,dunyaNokta=(x,y,yuk=0)=>new THREE.Vector3((x-W/
2)*S,yuk,(y-H/2)*S),coz=h=>{const p=[];let x=0,y=0;for(let i=0;i<h.length;i+=2)x+=h[i],y+=h[i+1],p.push([x/10,y/10]);return p};function sekil(poligon){const[dis,...delikler]=poligon.map(coz),v=([x,y])=>new THREE.
Vector2((x-W/2)*S,-(y-H/2)*S),s=new THREE.Shape(dis.map(v));for(const d of delikler)s.holes.push(new THREE.Path(d.map(v)));return s}function kabart(poligonlar,yuk){const g=new THREE.ExtrudeGeometry(poligonlar.
map(sekil),{depth:yuk,bevelEnabled:!1,curveSegments:1});return g.rotateX(-Math.PI/2),g.computeBoundingSphere(),g}function cizgiler(poligonlar,yuk,renk,saydam){const noktalar=[];for(const p of poligonlar)
for(const h of p){const c=coz(h);for(let i=0;i<c.length;i++){const a=c[i],b=c[(i+1)%c.length];noktalar.push((a[0]-W/2)*S,yuk,(a[1]-H/2)*S,(b[0]-W/2)*S,yuk,(b[1]-H/2)*S)}}const g=new THREE.BufferGeometry;
return g.setAttribute("position",new THREE.Float32BufferAttribute(noktalar,3)),new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:renk,transparent:!0,opacity:saydam,depthWrite:!1}))}function ekranKonumu(nokta){
return _yansit.copy(nokta).project(kamera),{x:(_yansit.x*.5+.5)*boyutW,y:(-_yansit.y*.5+.5)*boyutH,arkada:_yansit.z>1,disarida:Math.abs(_yansit.x)>1.15||Math.abs(_yansit.y)>1.15}}function kameraDurdur(){
ucusNesli++,kameraKaresi!==null&&cancelAnimationFrame(kameraKaresi),kameraKaresi=null,ucuyor=!1}function kameraUc(hedef,konum,sure=1.2){if(yokEdildi)return;kameraDurdur();const benim=ucusNesli,h0=kontrol.
target.clone(),k0=kamera.position.clone(),t0=performance.now();ucuyor=!0;const adim=()=>{if(yokEdildi||benim!==ucusNesli)return;kameraKaresi=null;const t=Math.min(1,(performance.now()-t0)/(hareketAzalt?
1:sure*1e3)),e=yumusak.girisCikis(t);kontrol.target.lerpVectors(h0,hedef,e),kamera.position.lerpVectors(k0,konum,e),kontrol.update(),kameraDegisti=!0,t<1?kameraKaresi=requestAnimationFrame(adim):ucuyor=
!1};kameraKaresi=requestAnimationFrame(adim)}const KUM=["#E9DFC6","#E3D7BB","#EDE4CF","#E0D3B5","#E6DBC1"].map(c=>new THREE.Color(c)),KAYNAK_RENK={tahil:"#D9A548",cevher:"#7C8A94",lif:"#93B27E"},ulkeRengi=id=>new THREE.
Color(ulkeById.get(id)?.u.renk??DUNYA.ulkeler?.[id]?.renk??"#B9A98A"),sahibi=b=>durum.sahip[b.id]??b.ulke;function ulkeRenk(u){const renk=durum.acik.has(u.id)?new THREE.Color(u.renk).lerp(new THREE.Color(
"#FFFFFF"),.12):KUM[ulkeById.get(u.id).i%KUM.length].clone().lerp(new THREE.Color(u.renk),.17);return durum.uyuyan?.has(u.id)&&renk.lerp(new THREE.Color("#EDE6D4"),.5),kip!=="siyasi"&&renk.lerp(new THREE.
Color("#ECE8DD"),.55),renk}function bolgeRenk(b){if(kip==="kaynak"){const a=Object.keys(b.avantaj??{})[0];return new THREE.Color(a?KAYNAK_RENK[a]:"#CDB991").lerp(new THREE.Color("#F1EDE2"),zenginlikSoluklugu(
b))}if(kip==="cephe"){const s=durum.savaslar.find(x=>x.target_region_id===b.id||x.origin_region_id===b.id);return s?new THREE.Color(s.target_region_id===b.id?"#C65A3B":"#E08F70"):new THREE.Color("#D8D\
2C2")}const r=rastgele(ozet(b.id)),renk=ulkeRengi(sahibi(b)).offsetHSL(0,(r()-.5)*.08,(r()-.5)*.09),kar=havaAn(b.id,Date.now()+(durum.saatFarki??0)).kar;return kar&&renk.lerp(KAR_RENK,kar),durum.uyuyan?.
has(sahibi(b))?renk.lerp(new THREE.Color("#EDE6D4"),.45):renk}const malzeme=renk=>new THREE.MeshStandardMaterial({color:renk,roughness:.93,metalness:0}),KAR_RENK=new THREE.Color("#F4F7FA");function kiyiDokusu(){
const gw=telefon()?1280:2048,gh=Math.round(gw*H/W),c=document.createElement("canvas");c.width=gw,c.height=gh;const x=c.getContext("2d");x.fillStyle="#000",x.fillRect(0,0,gw,gh);const o=gw/W,yol=new Path2D,
ekle=poligonlar=>{for(const p of poligonlar)for(const h of p)coz(h).forEach(([px,py],i)=>i?yol.lineTo(px*o,py*o):yol.moveTo(px*o,py*o)),yol.closePath()};veri.ulkeler.forEach(u=>ekle(u.p)),ekle(veri.notr),
x.lineJoin="round","filter"in x&&(x.filter=`blur(${Math.round(14*o*1)}px)`,x.strokeStyle="rgba(255,255,255,0.55)",x.lineWidth=34*o,x.stroke(yol),x.filter=`blur(${Math.max(1,Math.round(4*o))}px)`,x.strokeStyle=
"rgba(255,255,255,0.5)",x.lineWidth=8*o,x.stroke(yol),x.filter="none"),x.fillStyle="#fff",x.fill(yol,"evenodd");const t=new THREE.CanvasTexture(c);return t.colorSpace=THREE.NoColorSpace,t.anisotropy=4,
t}function okyanusKur(){const mat=new THREE.ShaderMaterial({uniforms:{uKiyi:{value:kiyiDokusu()},uZaman:zaman,uBoyut:{value:new THREE.Vector2(W*S,H*S)},uDerin:{value:new THREE.Color("#3A6C7C")},uSig:{
value:new THREE.Color("#8CC3BA")},uKopuk:{value:new THREE.Color("#F4F1E4")},uSis:{value:SIS},uSisYakin:{value:120},uSisUzak:{value:420}},vertexShader:"varying vec3 vD; void main(){ vec4 w = modelMatri\
x * vec4(position,1.0); vD = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:`
        uniform sampler2D uKiyi; uniform float uZaman; uniform vec2 uBoyut;
        uniform vec3 uDerin, uSig, uKopuk, uSis; uniform float uSisYakin, uSisUzak;
        varying vec3 vD;
        void main(){
          vec2 uv = vec2(vD.x / uBoyut.x + 0.5, 1.0 - (vD.z / uBoyut.y + 0.5));
          float k = texture2D(uKiyi, uv).r;
          vec3 renk = mix(uDerin, uSig, smoothstep(0.02, 0.8, k));
          float d = sin(k * 20.0 - uZaman * 1.2) * 0.5 + 0.5;
          float serit = smoothstep(0.9, 1.0, d) * smoothstep(0.42, 0.6, k) * (1.0 - smoothstep(0.82, 0.95, k));
          renk = mix(renk, uKopuk, serit * 0.35);
          float desen = sin(vD.x * 1.3 + uZaman * 0.5) * sin(vD.z * 1.6 - uZaman * 0.4);
          renk *= 1.0 + desen * 0.025;
          float m = length(vD - cameraPosition);
          renk = mix(renk, uSis, smoothstep(uSisYakin, uSisUzak, m));
          gl_FragColor = vec4(renk, 1.0);
          #include <colorspace_fragment>
        }`}),g=new THREE.PlaneGeometry(2400,2400);g.rotateX(-Math.PI/2);const okyanus=new THREE.Mesh(g,mat);okyanus.position.y=-.02,sahne.add(okyanus)}const KUTU=new THREE.BoxGeometry(1,1,1).translate(
0,.5,0),DUVAR=new THREE.MeshStandardMaterial({color:"#F4ECDC",roughness:.85}),CATI=new THREE.MeshStandardMaterial({color:"#C4673F",roughness:.8}),KUBBE=new THREE.MeshStandardMaterial({color:"#6F9F8F",
roughness:.55});function pencereDokusu(){const c=document.createElement("canvas");c.width=32,c.height=32;const g=c.getContext("2d");g.fillStyle="#000",g.fillRect(0,0,32,32);const r=rastgele(5);for(let y=0;y<
4;y++)for(let x=0;x<3;x++)r()<.25||(g.fillStyle=r()<.5?"#FFE3A3":"#FFC76E",g.fillRect(3+x*10,3+y*7.5,6,4));const t=new THREE.CanvasTexture(c);return t.colorSpace=THREE.SRGBColorSpace,t}function parlamaDokusu(){
const c=document.createElement("canvas");c.width=64,c.height=64;const g=c.getContext("2d"),d=g.createRadialGradient(32,32,0,32,32,32);d.addColorStop(0,"rgba(255,255,255,1)"),d.addColorStop(.35,"rgba(2\
55,255,255,0.45)"),d.addColorStop(1,"rgba(255,255,255,0)"),g.fillStyle=d,g.fillRect(0,0,64,64);const t=new THREE.CanvasTexture(c);return t.colorSpace=THREE.SRGBColorSpace,t}const PENCERE=pencereDokusu(),
PARILTI=parlamaDokusu(),ISIK=new THREE.Color("#FFC46B"),DUVAR_GUN=new THREE.Color("#F4ECDC"),DUVAR_GECE=new THREE.Color("#6B6478"),PARILTI_GEO=new THREE.PlaneGeometry(1,1).rotateX(-Math.PI/2);function miniSehir(seviye,baskent,tohum){
const grup=new THREE.Group,r=rastgele(tohum),adet=[0,5,9,15,22,30][seviye]+(baskent?4:0),duvar=DUVAR.clone();duvar.emissive=ISIK.clone(),duvar.emissiveMap=PENCERE,duvar.emissiveIntensity=0;const govde=new THREE.
InstancedMesh(KUTU,duvar,adet),catilar=new THREE.InstancedMesh(KUTU,CATI,adet),m=new THREE.Matrix4,q=new THREE.Quaternion,e=new THREE.Euler,yaricap=.16+seviye*.07;for(let i=0;i<adet;i++){const a=i*2.39996,
rr=yaricap*Math.sqrt((i+.5)/adet),x=Math.cos(a)*rr,z=Math.sin(a)*rr,yuk=(.05+r()*.06)*(1+seviye*.35)*(1.4-rr/(yaricap+.001)*.7),gen=.05+r()*.035;e.set(0,r()*Math.PI,0),q.setFromEuler(e),m.compose(new THREE.
Vector3(x,0,z),q,new THREE.Vector3(gen,yuk,gen)),govde.setMatrixAt(i,m),m.compose(new THREE.Vector3(x,yuk,z),q,new THREE.Vector3(gen*1.1,.018,gen*1.1)),catilar.setMatrixAt(i,m)}if(govde.castShadow=!0,
grup.add(govde,catilar),baskent&&seviye>=3){const kubbe=new THREE.Mesh(new THREE.SphereGeometry(.075+seviye*.012,16,8,0,Math.PI*2,0,Math.PI/2),KUBBE);kubbe.position.y=.12+seviye*.02;const kaide=new THREE.
Mesh(new THREE.CylinderGeometry(.07+seviye*.012,.08+seviye*.012,.12+seviye*.02,16),duvar);kaide.position.y=(.12+seviye*.02)/2,grup.add(kaide,kubbe)}const parilti=new THREE.Mesh(PARILTI_GEO,new THREE.MeshBasicMaterial(
{map:PARILTI,color:"#FFB65C",transparent:!0,opacity:0,depthWrite:!1,blending:THREE.AdditiveBlending}));return parilti.scale.setScalar(yaricap*5),parilti.position.y=.04,parilti.renderOrder=2,parilti.visible=
!1,grup.add(parilti),grup.userData={duvar,parilti},grup}function sehirleriKur(){for(const b of veri.bolgeler){const seviye=Math.max(1,Math.min(5,Number(durum.sehirler[b.id]??1))),eski=sehirKume.get(b.
id);if(eski?.seviye===seviye)continue;const mesh=bolgeMesh.get(b.id);eski&&(mesh.remove(eski.grup),eski.grup.traverse(o=>{o.isInstancedMesh&&o.dispose()}),eski.grup.userData.duvar?.dispose(),eski.grup.
userData.parilti?.material.dispose());const grup=miniSehir(seviye,b.baskent,ozet(b.id));grup.position.copy(dunyaNokta(b.etiket[0],b.etiket[1],YUK_ACIK)),mesh.add(grup),sehirKume.set(b.id,{seviye,grup}),
geceSehir(b.id,grup);const et=baskentEtiket.get(b.id);et&&(et.el.querySelector("small").textContent=\u00E7("BA\u015EKENT \xB7 SV {n}",{n:seviye}))}ciz=!0}function etiketEkle(html,sinif,konum,oncelik,kosul,carpisma=!0){
const el=document.createElement("div");el.className="etiket sakli "+sinif,el.innerHTML=html,etiketKap?.appendChild(el);const e={el,konum,oncelik,kosul,carpisma,w:0,h:0,gorunur:!1};return etiketler.push(
e),etiketler.sort((a,b)=>b.oncelik-a.oncelik),kameraDegisti=!0,e}function etiketSil(e){const i=etiketler.indexOf(e);i>=0&&etiketler.splice(i,1),e.el.remove()}function etiketleriGuncelle(){if(!kontrol)
return;const mesafe=kamera.position.distanceTo(kontrol.target),dolu=[];for(const e of etiketler){let goster=!e.kosul||e.kosul(mesafe),px=0,py=0;if(goster){const k=ekranKonumu(e.konum);if(k.arkada||k.disarida)
goster=!1;else{e.w||(e.w=e.el.offsetWidth,e.h=e.el.offsetHeight),px=k.x-e.w/2,py=k.y-e.h/2;const kutu=[px-4,py-2,px+e.w+4,py+e.h+2];e.carpisma&&dolu.some(d=>!(kutu[2]<d[0]||kutu[0]>d[2]||kutu[3]<d[1]||
kutu[1]>d[3]))?goster=!1:dolu.push(kutu)}}goster&&(e.el.style.transform=`translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0)`),goster!==e.gorunur&&(e.el.classList.toggle("sakli",!goster),e.gorunur=
goster)}}function savaslariKur(){const anahtar=JSON.stringify(durum.savaslar);if(anahtar!==savasAnahtar){savasAnahtar=anahtar;for(const o of[...savasGrubu.children])savasGrubu.remove(o),o.geometry?.dispose(),
o.material?.dispose();for(const e of savasEtiketleri)etiketSil(e);savasEtiketleri=[];for(const a of savasAnim){const i=surekli.indexOf(a);i>=0&&surekli.splice(i,1)}savasAnim=[];for(const s of durum.savaslar){
const a=bolgeById.get(s.origin_region_id),b=bolgeById.get(s.target_region_id);if(!a||!b)continue;const p0=dunyaNokta(a.etiket[0],a.etiket[1],YUK_ACIK+.05),p1=dunyaNokta(b.etiket[0],b.etiket[1],YUK_ACIK+
.05);if(a!==b){const orta=p0.clone().lerp(p1,.5);orta.y+=1.2+p0.distanceTo(p1)*.45;const egri=new THREE.QuadraticBezierCurve3(p0,orta,p1),mat=new THREE.ShaderMaterial({transparent:!0,depthWrite:!1,uniforms:{
uZaman:zaman,uRenk:{value:new THREE.Color(s.paused?"#9A8F80":"#E0603B")}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); \
}",fragmentShader:`varying vec2 vUv; uniform float uZaman; uniform vec3 uRenk;
            void main(){ float f = fract(vUv.x * 5.0 - uZaman * 0.9); float p = smoothstep(0.0, 0.25, f) * (1.0 - smoothstep(0.45, 0.7, f));
            float uc = smoothstep(0.0, 0.08, vUv.x) * (1.0 - smoothstep(0.92, 1.0, vUv.x));
            gl_FragColor = vec4(mix(uRenk, vec3(1.0, 0.92, 0.8), p * 0.6), (0.45 + p * 0.55) * uc);
            #include <colorspace_fragment>
            }`}),yay=new THREE.Mesh(new THREE.TubeGeometry(egri,64,.07,8,!1),mat);yay.renderOrder=3,savasGrubu.add(yay)}for(let i=0;i<2;i++){const halka=new THREE.Mesh(new THREE.RingGeometry(.45,.6,48).
rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:"#E0603B",transparent:!0,opacity:.8,depthWrite:!1}));halka.position.copy(p1),halka.position.y=YUK_ACIK+.03,halka.renderOrder=3,savasGrubu.add(halka);
const anim=t=>{const f=(t*.45+i*.5)%1;halka.scale.setScalar(1+f*2.4),halka.material.opacity=.75*(1-f)};surekli.push(anim),savasAnim.push(anim)}savasEtiketleri.push(etiketEkle(`<span class="e-cephe">${ikon(
s.resistance_id?"flame":"swords")}${esc(b.ad)} \xB7 ${s.drive_id?esc(\u00E7("ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131"))+" \xB7 ":s.resistance_id?esc(\u00E7("yerel direni\u015F"))+" \xB7 ":""}${esc(
savasDurumMetni(s))}</span>`,"",p1.clone().setY(YUK_ACIK+1.1),95,null,!1))}ciz=!0}}function girisimleriKur(){const anahtar=JSON.stringify(durum.girisimler??[]);if(anahtar!==girisimAnahtar){girisimAnahtar=
anahtar;for(const o of[...girisimGrubu.children])girisimGrubu.remove(o),o.geometry?.dispose(),o.material?.dispose();for(const e of girisimEtiketleri)etiketSil(e);girisimEtiketleri=[];for(const a of girisimAnim){
const i=surekli.indexOf(a);i>=0&&surekli.splice(i,1)}girisimAnim=[];for(const g of durum.girisimler??[]){const b=bolgeById.get(g.region_id);if(!b)continue;const p=dunyaNokta(b.etiket[0],b.etiket[1],YUK_ACIK+
.03);for(let i=0;i<2;i++){const halka=new THREE.Mesh(new THREE.RingGeometry(.4,.55,48).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:"#7D5FA0",transparent:!0,opacity:.8,depthWrite:!1}));halka.
position.copy(p),halka.renderOrder=3,girisimGrubu.add(halka);const anim=t=>{const f=(t*.4+i*.5)%1;halka.scale.setScalar(1+f*2.2),halka.material.opacity=.75*(1-f)};surekli.push(anim),girisimAnim.push(anim)}
girisimEtiketleri.push(etiketEkle(`<span class="e-girisim">${ikon("shield-half")}${esc(b.ad)} \xB7 ${\u00E7("el koyma giri\u015Fimi")}</span>`,"",p.clone().setY(YUK_ACIK+1.1),96,null,!1))}ciz=!0}}function filmKur(){
const liste=durum.filmIgneleri??[],anahtar=JSON.stringify(liste.map(o=>[o.tur,o.bolge,o.ulke,o.parlak]));if(anahtar!==filmAnahtar){filmAnahtar=anahtar;for(const e of filmEtiketleri)etiketSil(e);filmEtiketleri=
[],liste.forEach((o,i)=>{const b=bolgeById.get(o.bolge);if(!b)return;const p=dunyaNokta(b.etiket[0],b.etiket[1],YUK_ACIK+.8);filmEtiketleri.push(etiketEkle(`<span class="e-film ${esc(o.tur)}${o.parlak?
" parlak":""}" data-film-igne="${esc(o.tur)}">${ikon(HaritaFilm.ikonu(o))}${o.parlak?esc(HaritaFilm.yazi(o)):""}</span>`,"",p,(o.parlak?98:30)+i/(liste.length+1),null,!0))}),ciz=!0}}function ozerkleriKur(){
const anahtar=JSON.stringify([durum.ozerkler??[],durum.ozkSurecler??[],(durum.devletler??[]).map(k=>[k.country_id,k.capital_region_id,k.protected])]);if(anahtar===ozkAnahtar)return;ozkAnahtar=anahtar;
for(const o of[...ozkGrubu.children])ozkGrubu.remove(o),o.geometry?.dispose(),o.material?.dispose();for(const e of ozkEtiketleri)etiketSil(e);ozkEtiketleri=[];for(const a of ozkAnim){const i=surekli.indexOf(
a);i>=0&&surekli.splice(i,1)}ozkAnim=[];const ogeler=[...(durum.ozerkler??[]).map(([id,vali])=>({id,tur:"ozerk",vali})),...(durum.ozkSurecler??[]).filter(([,asama])=>asama!=="war").map(([id,asama,,tur,
yol])=>({id,tur:asama,bgm:tur==="independence",savasYolu:yol==="war"})),...(durum.devletler??[]).filter(k=>!k.pending).map(k=>({id:k.capital_region_id,tur:"devlet",k}))];for(const x of ogeler){const b=bolgeById.
get(x.id);if(!b)continue;const p=dunyaNokta(b.etiket[0],b.etiket[1],YUK_ACIK+.025),ozk=x.tur==="ozerk",dv=x.tur==="devlet",halka=new THREE.Mesh(new THREE.RingGeometry(.55,.68,48).rotateX(-Math.PI/2),new THREE.
MeshBasicMaterial({color:dv?x.k.protected?"#3E8E5E":"#C65A3B":ozk?"#3E8E5E":"#D9A548",transparent:!0,opacity:.85,depthWrite:!1}));if(halka.position.copy(p),halka.renderOrder=3,ozkGrubu.add(halka),x.tur===
"referendum"){const anim=t=>{const f=t*.35%1;halka.scale.setScalar(1+f*1.6),halka.material.opacity=.8*(1-f)};surekli.push(anim),ozkAnim.push(anim)}if(dv){const yazi2=x.k.protected?\u00E7("{devlet} \xB7 k\
orumal\u0131",{devlet:devletGorunumAdi(x.k)}):\u00E7("{devlet} \xB7 korumas\u0131z",{devlet:devletGorunumAdi(x.k)});ozkEtiketleri.push(etiketEkle(`<span class="e-ozk ${x.k.protected?"ozerk":"devlet"}"\
>${ikon("castle")}${esc(yazi2)}</span>`,"",p.clone().setY(YUK_ACIK+.9),95,null,!1));continue}const yazi=ozk?x.vali?\u00E7("\xD6zerk \xB7 Vali {ad}",{ad:x.vali}):\u00E7("\xD6zerk b\xF6lge"):x.tur==="re\
ferendum"?x.bgm?\u00E7("ba\u011F\u0131ms\u0131zl\u0131k referandumu"):\u00E7("referandum"):x.savasYolu?\u00E7("ba\u011F\u0131ms\u0131zl\u0131k sava\u015F\u0131 dilek\xE7esi"):x.bgm?\u00E7("ba\u011F\u0131ms\u0131zl\u0131k\
 s\xFCreci"):\u00E7("\xF6zerklik s\xFCreci");ozkEtiketleri.push(etiketEkle(`<span class="e-ozk ${ozk?"ozerk":"surec"}">${ikon(ozk?"landmark":x.savasYolu?"swords":x.bgm?"castle":x.tur==="referendum"?"v\
ote":"scroll-text")}${esc(b.ad)} \xB7 ${esc(yazi)}</span>`,"",p.clone().setY(YUK_ACIK+.9),90,null,!1))}ciz=!0}function direnisleriKur(){const anahtar=JSON.stringify([durum.isgaller??[],durum.hasar??{}]);
if(anahtar!==drnAnahtar){drnAnahtar=anahtar;for(const o of[...drnGrubu.children])drnGrubu.remove(o),o.geometry?.dispose(),o.material?.dispose();for(const e of drnEtiketleri)etiketSil(e);drnEtiketleri=
[];for(const a of drnAnim){const i=surekli.indexOf(a);i>=0&&surekli.splice(i,1)}drnAnim=[];for(const[id,,asil,st]of durum.isgaller??[]){if(st!=="open"&&st!=="waiting")continue;const b=bolgeById.get(id);
if(!b)continue;const p=dunyaNokta(b.etiket[0],b.etiket[1],YUK_ACIK+.035),halka=new THREE.Mesh(new THREE.RingGeometry(.5,.64,48).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:ulkeRengi(asil),transparent:!0,
opacity:.85,depthWrite:!1}));if(halka.position.copy(p),halka.renderOrder=3,drnGrubu.add(halka),st==="open"){const anim=t=>{const f=t*.4%1;halka.scale.setScalar(1+f*1.8),halka.material.opacity=.8*(1-f)};
surekli.push(anim),drnAnim.push(anim)}drnEtiketleri.push(etiketEkle(`<span class="e-direnis">${ikon(st==="open"?"megaphone":"hourglass")}${esc(b.ad)} \xB7 ${esc(st==="open"?\u00E7("direni\u015F oylamas\u0131"):
\u00E7("direni\u015F bekliyor"))}</span>`,"",p.clone().setY(YUK_ACIK+.95),94,null,!1))}for(const[id,ppm]of Object.entries(durum.hasar??{})){const b=bolgeById.get(id);!b||Number(ppm)<=0||drnEtiketleri.
push(etiketEkle(`<span class="e-hasar">${ikon("hammer")}${esc(\u00E7("hasar {n}",{n:ppmYuzde(ppm)}))}</span>`,"",dunyaNokta(b.etiket[0],b.etiket[1]+2.6,YUK_ACIK+.25),42,m=>m<44))}ciz=!0}}function konumuKur(){
if(konumGrubu&&(sahne.remove(konumGrubu),konumGrubu.traverse(o=>{o.geometry?.dispose(),o.material?.dispose()}),konumGrubu=null),konumEtiketi&&(etiketSil(konumEtiketi),konumEtiketi=null),konumAnim){const i=surekli.
indexOf(konumAnim);i>=0&&surekli.splice(i,1),konumAnim=null}const b=durum.yol?null:bolgeById.get(durum.konum);if(!b){ciz=!0;return}const tepe=dunyaNokta(b.etiket[0],b.etiket[1],YUK_ACIK);konumGrubu=new THREE.
Group;const renk=new THREE.MeshStandardMaterial({color:"#C65A3B",roughness:.5,emissive:"#5A1A0C",emissiveIntensity:.25}),uc=new THREE.Mesh(new THREE.ConeGeometry(.14,.42,16).rotateX(Math.PI),renk);uc.
position.y=.21;const bas=new THREE.Mesh(new THREE.SphereGeometry(.17,16,12),renk);bas.position.y=.5;const golge=new THREE.Mesh(new THREE.CircleGeometry(.16,20).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial(
{color:"#000000",transparent:!0,opacity:.18,depthWrite:!1}));golge.position.y=.01;const igne=new THREE.Group;igne.add(uc,bas),konumGrubu.add(igne,golge),konumGrubu.position.copy(tepe).add(new THREE.Vector3(
.45,0,-.25)),sahne.add(konumGrubu),konumAnim=t=>{igne.position.y=.06+Math.sin(t*2.4)*.05},surekli.push(konumAnim),konumEtiketi=etiketEkle(`<span class="e-konum">${ikon("map-pin")}${\u00E7("Buradas\u0131n")}\
</span>`,"",konumGrubu.position.clone().setY(YUK_ACIK+1.25),97,null,!1),ciz=!0}const katmanGrubu=new THREE.Group;sahne.add(katmanGrubu);let katmanAnahtar="",katmanAnim=[],katmanEtiket=[];const _yon=new THREE.
Vector3,_ileri2=new THREE.Vector3,HAT_RENK={rail:"#3A3530",ferry:"#2F6F8F",bridge:"#8D8A84"};function bolgeNoktasi(id,ek=.06){const b=bolgeById.get(id),e=b?.etiket??DUNYA.bolgeler?.[id]?.e;return e?dunyaNokta(
e[0],e[1],(b?YUK_ACIK:YUK_KAPALI)+ek):null}function katmanTemizle(){for(const o of[...katmanGrubu.children])katmanGrubu.remove(o),o.traverse(x=>{x.geometry?.dispose();for(const m of[].concat(x.material??
[]))m.dispose?.()});for(const e of katmanEtiket)etiketSil(e);katmanEtiket=[];for(const a of katmanAnim){const i=surekli.indexOf(a);i>=0&&surekli.splice(i,1)}katmanAnim=[]}function trenYap(){const g=new THREE.
Group;return g.add(new THREE.Mesh(new THREE.BoxGeometry(.13,.1,.32).translate(0,.07,.12),new THREE.MeshStandardMaterial({color:"#23395B",roughness:.5}))),g.add(new THREE.Mesh(new THREE.BoxGeometry(.12,
.09,.26).translate(0,.065,-.18),new THREE.MeshStandardMaterial({color:"#D9A548",roughness:.6}))),g.scale.setScalar(1.6),g}function gemiYap(renk="#F4F0E6"){const g=new THREE.Group;return g.add(new THREE.
Mesh(new THREE.BoxGeometry(.16,.07,.4).translate(0,.035,0),new THREE.MeshStandardMaterial({color:renk,roughness:.6}))),g.add(new THREE.Mesh(new THREE.BoxGeometry(.12,.08,.14).translate(0,.11,-.04),new THREE.
MeshStandardMaterial({color:"#C65A3B",roughness:.6}))),g.scale.setScalar(1.5),g}function tirYap(){const g=new THREE.Group;return g.add(new THREE.Mesh(new THREE.BoxGeometry(.12,.11,.26).translate(0,.075,
-.05),new THREE.MeshStandardMaterial({color:"#367F70",roughness:.6}))),g.add(new THREE.Mesh(new THREE.BoxGeometry(.11,.08,.09).translate(0,.06,.14),new THREE.MeshStandardMaterial({color:"#F4ECDC",roughness:.6}))),
g.scale.setScalar(1.5),g}function aracEkle(egri,arac,sure,faz=0,yukseklik=0){const yer=t=>{const u=hareketAzalt?.5:.5-.5*Math.cos((t/sure+faz)*Math.PI*2);egri.getPointAt(u,arac.position),arac.position.
y+=yukseklik,egri.getTangentAt(Math.min(.999,Math.max(.001,u)),_ileri2);const geri=!hareketAzalt&&Math.sin((t/sure+faz)*Math.PI*2)<0;arac.rotation.y=Math.atan2(_ileri2.x,_ileri2.z)+(geri?Math.PI:0)};yer(
0),arac.renderOrder=4,katmanGrubu.add(arac),hareketAzalt||(surekli.push(yer),katmanAnim.push(yer))}function hatCiz(l){const p0=bolgeNoktasi(l.region_a),p1=bolgeNoktasi(l.region_b);if(!p0||!p1)return;const insaat=l.
status==="building",kapali=l.status==="built"&&l.weight_q==null,bakimsiz=l.status==="built"&&Number(l.weight_q)>2,uzun=p0.distanceTo(p1),orta=p0.clone().lerp(p1,.5);orta.y+=l.kind==="rail"?.04:l.kind===
"bridge"?.3+uzun*.06:.12+uzun*.04;const egri=new THREE.QuadraticBezierCurve3(p0,orta,p1),renk=insaat?"#E0A23A":kapali?"#9A948A":bakimsiz?"#8C5A3A":HAT_RENK[l.kind]??"#3A3530",tup=new THREE.Mesh(new THREE.
TubeGeometry(egri,24,l.kind==="bridge"?.085:.055,6,!1),new THREE.MeshStandardMaterial({color:renk,roughness:.6,transparent:insaat||kapali,opacity:insaat?.55:kapali?.5:1}));if(tup.renderOrder=3,katmanGrubu.
add(tup),l.kind==="rail"||insaat){const n=Math.max(4,Math.round(uzun/.3)),dolu=insaat?Math.round(n*Math.min(1,Number(l.progress_ppm??0)/1e6)):n,tm=new THREE.InstancedMesh(new THREE.BoxGeometry(.22,.03,
.05),new THREE.MeshStandardMaterial({color:insaat?"#F2C230":"#7A5B3F",roughness:.8}),Math.max(1,dolu)),m4=new THREE.Matrix4,q=new THREE.Quaternion,olc=new THREE.Vector3(1,1,1),nokta=new THREE.Vector3;
for(let i=0;i<dolu;i++){const u=(i+.5)/n;egri.getPointAt(u,nokta),egri.getTangentAt(u,_yon),q.setFromAxisAngle(new THREE.Vector3(0,1,0),Math.atan2(_yon.x,_yon.z)),m4.compose(nokta.setY(nokta.y+.03),q,
olc),tm.setMatrixAt(i,m4)}tm.count=dolu,tm.renderOrder=3,katmanGrubu.add(tm)}if(l.kind==="bridge")for(const u of[.3,.7]){const n=egri.getPointAt(u),ayak=new THREE.Mesh(new THREE.CylinderGeometry(.04,.05,
n.y,8).translate(0,n.y/2,0),new THREE.MeshStandardMaterial({color:"#A99C86",roughness:.8}));ayak.position.set(n.x,0,n.z),katmanGrubu.add(ayak)}if(l.status==="built"&&!kapali&&l.kind!=="bridge"&&aracEkle(
egri,l.kind==="rail"?trenYap():gemiYap(),Math.max(8,uzun*5),0,.02),insaat){const v=new THREE.Group,sari=new THREE.MeshStandardMaterial({color:"#E0A23A",roughness:.6});v.add(new THREE.Mesh(new THREE.BoxGeometry(
.04,.5,.04).translate(0,.25,0),sari),new THREE.Mesh(new THREE.BoxGeometry(.34,.04,.04).translate(-.1,.5,0),sari)),v.position.copy(orta).setY(orta.y-.02),v.renderOrder=4,katmanGrubu.add(v),katmanEtiket.
push(etiketEkle(`<span class="e-santiye">${ikon("hammer")}${\u00E7("\u015Eantiye \xB7 {n}",{n:yuzde(Number(l.progress_ppm??0)/1e6)})}</span>`,"",orta.clone().setY(orta.y+.75),60,m=>m<90,!1))}}function ticaretCiz(t){
const u=ticaretUclari(t.a,t.b);if(!u)return;const p0=bolgeNoktasi(u.a,.08),p1=bolgeNoktasi(u.b,.08);if(!p0||!p1||p0.distanceTo(p1)<.2)return;const orta=p0.clone().lerp(p1,.5);orta.y+=.5+p0.distanceTo(
p1)*.1;const egri=new THREE.QuadraticBezierCurve3(p0,orta,p1),cizgi=new THREE.Line(new THREE.BufferGeometry().setFromPoints(egri.getPoints(48)),new THREE.LineDashedMaterial({color:t.customs_union?"#23\
395B":"#367F70",dashSize:.22,gapSize:.22,transparent:!0,opacity:t.at_war?.3:.75,depthWrite:!1}));cizgi.computeLineDistances(),cizgi.renderOrder=3,katmanGrubu.add(cizgi);const adet=ticaretAdet(t);for(let i=0;i<
adet;i++)aracEkle(egri,u.gemi?gemiYap("#E9E4D6"):tirYap(),Math.max(10,p0.distanceTo(p1)*3),i/Math.max(1,adet),.03)}function havaCiz(){const simdi=Date.now()+(durum.saatFarki??0),dilim=havaDilimi(simdi),
bulutGeo=(()=>{const parcalar=[[0,0,0,.32],[.28,-.04,.05,.24],[-.27,-.05,-.03,.22],[.08,.1,-.12,.2]],g=new THREE.BufferGeometry,geolar=parcalar.map(([x,y,z,r])=>new THREE.SphereGeometry(r,10,8).translate(
x,y,z)),pos=[],nrm=[],idx=[];let o=0;for(const x of geolar){pos.push(...x.attributes.position.array),nrm.push(...x.attributes.normal.array);for(const i of x.index.array)idx.push(i+o);o+=x.attributes.position.
count,x.dispose()}return g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3)),g.setAttribute("normal",new THREE.Float32BufferAttribute(nrm,3)),g.setIndex(idx),g})(),beyaz=new THREE.MeshStandardMaterial(
{color:"#FFFFFF",roughness:1,transparent:!0,opacity:.88,depthWrite:!1}),gri=new THREE.MeshStandardMaterial({color:"#A7B1BA",roughness:1,transparent:!0,opacity:.9,depthWrite:!1}),koyu=new THREE.MeshStandardMaterial(
{color:"#7F8B96",roughness:1,transparent:!0,opacity:.92,depthWrite:!1}),pus=new THREE.MeshStandardMaterial({color:"#F1F3F4",roughness:1,transparent:!0,opacity:.6,depthWrite:!1});for(const b of veri.bolgeler){
const hv=havaAn(b.id,simdi),h=hv.tur;if(h==="acik")continue;const r=rastgele(ozet(b.id+":bulut:"+dilim)),sis=h==="sis",yer=dunyaNokta(b.etiket[0]+(r()-.5)*2.4,b.etiket[1]-1.6+(r()-.5)*1.2,sis?YUK_ACIK+
.35:YUK_ACIK+1.5+r()*.3),bulut=new THREE.Mesh(bulutGeo,sis?pus:h==="yagmur"?hv.guclu?koyu:gri:beyaz);if(bulut.position.copy(yer),bulut.scale.setScalar(.9+r()*.5),sis&&bulut.scale.set(bulut.scale.x*1.7,
bulut.scale.y*.32,bulut.scale.z*1.7),bulut.renderOrder=4,bulut.userData.hava=h,katmanGrubu.add(bulut),h==="yagmur"||h==="kar"){const n=hv.guclu?24:14,tane=new Float32Array(n*3);for(let i=0;i<n;i++)tane[i*
3]=(r()-.5)*.7,tane[i*3+1]=-r()*1.3,tane[i*3+2]=(r()-.5)*.5;const geo=new THREE.BufferGeometry;geo.setAttribute("position",new THREE.BufferAttribute(tane,3));const parca=new THREE.Points(geo,new THREE.
PointsMaterial({color:h==="kar"?"#FFFFFF":"#5F8FB0",size:h==="kar"?.07:.05,transparent:!0,opacity:.9,depthWrite:!1}));if(parca.position.copy(yer).setY(yer.y-.15),parca.renderOrder=4,katmanGrubu.add(parca),
!hareketAzalt){const hiz=h==="kar"?.35:1.4,dus=t=>{const a=geo.attributes.position.array;for(let i=0;i<n;i++){let y=-((t*hiz+i*.37)%1.3);a[i*3+1]=y,h==="kar"&&(a[i*3]+=Math.sin(t*1.3+i)*8e-4)}geo.attributes.
position.needsUpdate=!0};surekli.push(dus),katmanAnim.push(dus)}}}}function katmanlariKur(zorla=!1){const isb=durum.isbirligi??null,dilim=havaDilimi(Date.now()+(durum.saatFarki??0)),anahtar=JSON.stringify(
[isb?.lines??[],isb?.trade??[],kip,dilim]);if(!(!zorla&&anahtar===katmanAnahtar)){katmanAnahtar=anahtar,katmanTemizle();for(const l of isb?.lines??[])hatCiz(l);if(kip==="siyasi"){for(const t of isb?.trade??
[])ticaretCiz(t);havaCiz()}ciz=!0}}const trafikGrubu=new THREE.Group;sahne.add(trafikGrubu);const TRAFIK_SINIR={araba:[30,12],ticaret:[12,6],konvoy:[20,10],kargo:[12,6]},ARABA_RENK=["#E9E4D6","#B9C4CC",
"#8FA3B5","#D9C9A8","#A7B59A","#C9B8C9"],takimYap=(n,govdeGeo,ustGeo,ustRenk)=>{const govde=new THREE.InstancedMesh(govdeGeo,new THREE.MeshStandardMaterial({color:"#FFFFFF",roughness:.6}),n),ust=new THREE.
InstancedMesh(ustGeo,new THREE.MeshStandardMaterial({color:ustRenk,roughness:.6}),n);for(const m of[govde,ust])m.count=0,m.renderOrder=4,m.frustumCulled=!1,trafikGrubu.add(m);return govde.setColorAt(0,
new THREE.Color("#FFFFFF")),{govde,ust}},kutuGeo=(gx,gy,gz,x,y,z)=>new THREE.BoxGeometry(gx,gy,gz).translate(x,y,z).scale(1.5,1.5,1.5),arabaT=takimYap(30,kutuGeo(.13,.07,.24,0,.055,0),kutuGeo(.11,.06,
.11,0,.115,-.01),"#2F3B4A"),kamyonT=takimYap(44,kutuGeo(.12,.11,.26,0,.075,-.05),kutuGeo(.11,.08,.09,0,.06,.14),"#F4ECDC"),gemiT=takimYap(12,kutuGeo(.16,.07,.4,0,.035,0),kutuGeo(.12,.08,.14,0,.11,-.04),
"#F4F0E6"),otobusT=takimYap(8,kutuGeo(.14,.11,.36,0,.075,0),kutuGeo(.12,.03,.3,0,.145,0),"#F4F1E8"),bisikletT=takimYap(30,kutuGeo(.03,.06,.2,0,.05,0),kutuGeo(.05,.09,.05,0,.12,-.02),"#2F3B4A"),motoT=takimYap(
30,kutuGeo(.06,.07,.22,0,.055,0),kutuGeo(.06,.09,.06,0,.13,-.03),"#2F3B4A"),tekneT=takimYap(30,kutuGeo(.11,.05,.28,0,.025,0),kutuGeo(.06,.05,.08,0,.075,.02),"#F4F0E6"),dolmusT=takimYap(30,kutuGeo(.13,
.1,.3,0,.065,0),kutuGeo(.12,.03,.26,0,.13,0),"#F4F1E8"),ARAC_TAKIM={bisiklet:bisikletT,motosiklet:motoT,otomobil:arabaT,tekne:tekneT},DOLMUS_RENK=["#E3B23C","#F2EFE8","#D9B65A"];let otobusEtiketleri=[],
trafikAnahtar="",trafikSon=-1e9,trafikAraclari=[];const _tm4=new THREE.Matrix4,_tq=new THREE.Quaternion,_tp=new THREE.Vector3,_tt=new THREE.Vector3,_ts=new THREE.Vector3,_tyukari=new THREE.Vector3(0,1,
0),_trenk=new THREE.Color,konvoyAdet=n=>Number(n)<=1?1:Math.min(5,1+Math.floor(Math.log2(Number(n))));function trafikKur(){const d=durum.trafik??null,az=telefon()?1:0,anahtar=JSON.stringify([d?.travels??
[],d?.trade??[],d?.convoys??[],d?.tour_buses??[],d?.cargo??[],kip,az,durum.yol?.departs_at??null]);if(anahtar===trafikAnahtar)return;trafikAnahtar=anahtar,trafikAraclari=[];for(const e of otobusEtiketleri)
etiketSil(e);otobusEtiketleri=[];let na=0,nk=0,ng=0,nTic=0,nKon=0,nOto=0,nKargo=0,nArac=0;const ni=new Map;if(kip==="siyasi"){for(const y of d?.travels??[]){if(na>=TRAFIK_SINIR.araba[az])break;const noktalar=(y.
route??[]).map(id=>bolgeNoktasi(id,.05)).filter(Boolean);if(noktalar.length<2)continue;const egri=noktalar.length===2?new THREE.LineCurve3(noktalar[0],noktalar[1]):new THREE.CatmullRomCurve3(noktalar,
!1,"centripetal",.5);for(const[bas,son,arac]of y.samples??[]){if(na>=TRAFIK_SINIR.araba[az])break;if(durum.yol&&durum.yol.from===y.from&&durum.yol.to===y.to&&Date.parse(durum.yol.departs_at)===Date.parse(
bas))continue;const takim=ARAC_TAKIM[arac]??dolmusT,i=ni.get(takim)??0;ni.set(takim,i+1),trafikAraclari.push({tur:"yol",takim,i,egri,bas:Date.parse(bas),son:Date.parse(son)}),takim.govde.setColorAt(i,
_trenk.set(takim===dolmusT?DOLMUS_RENK[na*5%DOLMUS_RENK.length]:ARABA_RENK[na*5%ARABA_RENK.length])),arac&&nArac++,na++}}for(const o of d?.tour_buses??[]){if(nOto>=8)break;const noktalar=(o.route??[]).
map(id=>bolgeNoktasi(id,.06)).filter(Boolean);if(noktalar.length<2)continue;const egri=noktalar.length===2?new THREE.LineCurve3(noktalar[0],noktalar[1]):new THREE.CatmullRomCurve3(noktalar,!1,"centrip\
etal",.5),konum=noktalar[0].clone(),etiket=etiketEkle(`<span class="etiket-otobus-yazi">${ikon("bus")}${esc(o.band??"")}</span>`,"etiket-otobus",konum,6,m=>m<60,!1);otobusEtiketleri.push(etiket),trafikAraclari.
push({tur:"yol",takim:otobusT,i:nOto,egri,bas:Date.parse(o.departs_at),son:Date.parse(o.arrives_at),etiket}),otobusT.govde.setColorAt(nOto,_trenk.set(MUZIK_TUR_RENK[o.genre]??"#B5442F")),nOto++}for(const x of d?.
trade??[]){const u=ticaretUclari(x.from,x.to),p0=u&&bolgeNoktasi(u.a,.08),p1=u&&bolgeNoktasi(u.b,.08);if(!p0||!p1||p0.distanceTo(p1)<.2)continue;const orta=p0.clone().lerp(p1,.5);orta.y+=.5+p0.distanceTo(
p1)*.1;const egri=new THREE.QuadraticBezierCurve3(p0,orta,p1),adet=Math.min(3,Math.max(1,Number(x.trades)||1));for(let k=0;k<adet&&nTic<TRAFIK_SINIR.ticaret[az];k++,nTic++){const takim=u.gemi?gemiT:kamyonT,
i=u.gemi?ng++:nk++;trafikAraclari.push({tur:"gidip",takim,i,egri,sure:Math.max(10,p0.distanceTo(p1)*3),faz:k/adet+nTic*.13}),takim.govde.setColorAt(i,ulkeRengi(x.from))}}for(const x of d?.cargo??[]){if(nKargo>=
TRAFIK_SINIR.kargo[az])break;const noktalar=(x.route??[]).map(id=>bolgeNoktasi(id,.06)).filter(Boolean);if(noktalar.length<2)continue;const egri=noktalar.length===2?new THREE.LineCurve3(noktalar[0],noktalar[1]):
new THREE.CatmullRomCurve3(noktalar,!1,"centripetal",.5);for(const[bas,son]of x.samples??[]){if(nKargo>=TRAFIK_SINIR.kargo[az])break;trafikAraclari.push({tur:"yol",takim:kamyonT,i:nk,egri,bas:Date.parse(
bas),son:Date.parse(son)}),kamyonT.govde.setColorAt(nk++,_trenk.set("#B07A4A")),nKargo++}}}if(kip==="siyasi"||kip==="cephe")for(const c of d?.convoys??[]){const hedef=bolgeNoktasi(c.to,.05);if(!hedef)
continue;const kol=(bas,adet,renk)=>{const p0=bolgeNoktasi(bas,.05);if(!p0||p0.distanceTo(hedef)<.3)return;const orta=p0.clone().lerp(hedef,.5);orta.y+=.12;const egri=new THREE.QuadraticBezierCurve3(p0,
orta,hedef),sure=Math.max(8,p0.distanceTo(hedef)*2.2);for(let k=0;k<adet&&nKon<TRAFIK_SINIR.konvoy[az];k++,nKon++)trafikAraclari.push({tur:"konvoy",takim:kamyonT,i:nk,egri,sure,faz:-k*.12,sira:k}),kamyonT.
govde.setColorAt(nk++,_trenk.set(renk))};kol(c.from,konvoyAdet(c.attackers),"#5B6B3A"),c.defender_capital&&c.defender_capital!==c.to&&Number(c.defenders)>0&&kol(c.defender_capital,konvoyAdet(c.defenders),
"#2F3B5A")}for(const[tk,n]of[[arabaT,ni.get(arabaT)??0],[kamyonT,nk],[gemiT,ng],[otobusT,nOto],[bisikletT,ni.get(bisikletT)??0],[motoT,ni.get(motoT)??0],[tekneT,ni.get(tekneT)??0],[dolmusT,ni.get(dolmusT)??
0]])tk.govde.count=tk.ust.count=n,tk.govde.instanceColor&&(tk.govde.instanceColor.needsUpdate=!0);kap&&Object.assign(kap.dataset,{trafikAraba:String(na),trafikArac:String(nArac),trafikTicaret:String(nTic),
trafikKonvoy:String(nKon),trafikOtobus:String(nOto),trafikKargo:String(nKargo)}),trafikYerlestir(performance.now()/1e3)}function trafikYerlestir(t){const simdi=Date.now()+(durum.saatFarki??0),duruk=hareketAzalt||
kaliteAdi==="dusuk";for(const a of trafikAraclari){let u,geri=!1,olcek=1;if(a.tur==="yol")u=THREE.MathUtils.clamp((simdi-a.bas)/Math.max(1,a.son-a.bas),0,1);else if(a.tur==="gidip"){const f=duruk?.25+
a.faz*.5:t/a.sure+a.faz;u=.5-.5*Math.cos(f*Math.PI*2),geri=!duruk&&Math.sin(f*Math.PI*2)<0}else u=duruk?Math.max(.05,.66-a.sira*.12):((t/a.sure+a.faz)%1+1)%1,olcek=Math.min(1,u*14,(1-u)*14);a.egri.getPointAt(
u,_tp),a.egri.getTangentAt(Math.min(.999,Math.max(.001,u)),_tt),_tq.setFromAxisAngle(_tyukari,Math.atan2(_tt.x,_tt.z)+(geri?Math.PI:0)),_tm4.compose(_tp,_tq,_ts.setScalar(Math.max(.001,olcek))),a.takim.
govde.setMatrixAt(a.i,_tm4),a.takim.ust.setMatrixAt(a.i,_tm4),a.etiket&&(a.etiket.konum.copy(_tp),a.etiket.konum.y+=.25,kameraDegisti=!0)}for(const tk of[arabaT,kamyonT,gemiT,otobusT,bisikletT,motoT,tekneT,
dolmusT])tk.govde.instanceMatrix.needsUpdate=!0,tk.ust.instanceMatrix.needsUpdate=!0;ciz=!0}let yolGrubu=null,yolEgri=null,yolArac=null,yolEtiketi=null,yolAnahtar="",yolSon=-1e9;const _ileri=new THREE.
Vector3;function arabaYap(){const g=new THREE.Group,kasa=new THREE.Group,govde=new THREE.Mesh(new THREE.BoxGeometry(.2,.09,.36).translate(0,.085,0),new THREE.MeshStandardMaterial({color:"#C65A3B",roughness:.55})),
kabin=new THREE.Mesh(new THREE.BoxGeometry(.17,.08,.17).translate(0,.165,-.02),new THREE.MeshStandardMaterial({color:"#F4ECDC",roughness:.6}));govde.castShadow=!0,kasa.add(govde,kabin);const tekerMat=new THREE.
MeshStandardMaterial({color:"#2F2A26",roughness:.8}),tekerGeo=new THREE.CylinderGeometry(.045,.045,.03,12).rotateZ(Math.PI/2);for(const[x,z]of[[-.1,.11],[.1,.11],[-.1,-.11],[.1,-.11]]){const t=new THREE.
Mesh(tekerGeo,tekerMat);t.position.set(x,.045,z),g.add(t)}return g.add(kasa),g.scale.setScalar(1.7),g.userData.kasa=kasa,g}function yolculukKur(){const y=durum.yol,anahtar=y?`${y.travel_id}|${y.arrives_at}`:
"";if(anahtar===yolAnahtar)return!1;if(yolAnahtar=anahtar,yolGrubu&&(sahne.remove(yolGrubu),yolGrubu.traverse(o=>{o.geometry?.dispose(),o.material?.dispose()}),yolGrubu=null),yolEtiketi&&(etiketSil(yolEtiketi),
yolEtiketi=null),yolEgri=null,yolArac=null,ciz=!0,!y)return!0;const rota=[...y.route??[]];rota[0]!==y.from&&rota.unshift(y.from),rota[rota.length-1]!==y.to&&rota.push(y.to);const noktalar=rota.map(id=>bolgeById.
get(id)).filter(Boolean).map(b=>dunyaNokta(b.etiket[0],b.etiket[1],YUK_ACIK+.05));if(noktalar.length<2)return!0;yolEgri=new THREE.CatmullRomCurve3(noktalar,!1,"centripetal",.5);const tup=new THREE.Mesh(
new THREE.TubeGeometry(yolEgri,Math.max(24,noktalar.length*24),.045,6,!1),new THREE.ShaderMaterial({transparent:!0,depthWrite:!1,uniforms:{uZaman:zaman,uUzun:{value:yolEgri.getLength()},uRenk:{value:new THREE.
Color("#C65A3B")}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`varying vec2 vUv; uniform float uZam\
an, uUzun; uniform vec3 uRenk;
        void main(){ float a = step(0.45, fract(vUv.x * uUzun * 1.6 - uZaman * 0.8));
        gl_FragColor = vec4(mix(vec3(1.0, 0.97, 0.9), uRenk, a), 0.35 + 0.6 * a);
        #include <colorspace_fragment>
        }`}));tup.renderOrder=3,yolArac=new THREE.Group;const genel=arabaYap();yolArac.add(genel),yolArac.userData={genel,kasa:genel.userData.kasa,kara:null,deniz:null,veri:y.vehicle?yolculukVerisi({ys:{
travel:y},harita:null}):null};for(const[ad,x]of[["kara",yolArac.userData.veri?.aracK],["deniz",yolArac.userData.veri?.aracD]]){if(!x)continue;const m=aracModeli(THREE,x.tur,aracRengi(x.renk));m.scale.
setScalar(x.tur==="otomobil"?.32:x.tur==="tekne"?.3:.45),m.visible=!1,yolArac.add(m),yolArac.userData[ad]=m}return yolGrubu=new THREE.Group,yolGrubu.add(tup,yolArac),sahne.add(yolGrubu),yolEtiketi=etiketEkle(
`<span class="e-konum">${ikon("route")}${\u00E7("Yoldas\u0131n \xB7 {bolge}",{bolge:esc(bolgeById.get(y.to)?.ad??"")})}</span>`,"",new THREE.Vector3,97,null,!1),yolGuncelle(),!0}function yolGuncelle(){
if(!yolEgri||!yolArac||!durum.yol)return;const bas=Date.parse(durum.yol.departs_at),son=Date.parse(durum.yol.arrives_at),u=THREE.MathUtils.clamp((Date.now()+(durum.saatFarki??0)-bas)/Math.max(1,son-bas),
0,1);yolEgri.getPointAt(u,yolArac.position),yolEgri.getTangentAt(Math.min(.999,Math.max(.001,u)),_ileri),yolArac.rotation.y=Math.atan2(_ileri.x,_ileri.z);const ua=yolArac.userData;if(ua?.veri){const an=yolculukAni(
ua.veri,Date.now()+(durum.saatFarki??0)),m=an.kendi?an.vapur?ua.deniz:ua.kara:null;for(const x of[ua.kara,ua.deniz])x&&(x.visible=x===m);ua.genel.visible=!m,ua.kasa=(m??ua.genel).userData.kasa,kap&&kap.
dataset.yolArac!==(an.kendi?an.arac:"")&&(kap.dataset.yolArac=an.kendi?an.arac:"")}else kap&&kap.dataset.yolArac&&(kap.dataset.yolArac="");yolEtiketi?.konum.copy(yolArac.position).setY(YUK_ACIK+1),kameraDegisti=
!0,ciz=!0}const geceU={uGunes:{value:new THREE.Vector2},uBoyut:{value:new THREE.Vector2(W*S,H*S)},uTuval:{value:new THREE.Vector2(W,H)},uRenk:{value:new THREE.Vector3(.36,.42,.66)}},geceOrtu=new THREE.
Mesh(new THREE.PlaneGeometry(2400,2400).rotateX(-Math.PI/2),new THREE.ShaderMaterial({transparent:!0,depthWrite:!1,uniforms:geceU,blending:THREE.CustomBlending,blendEquation:THREE.AddEquation,blendSrc:THREE.
DstColorFactor,blendDst:THREE.ZeroFactor,vertexShader:"varying vec3 vD; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vD = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:`\

      uniform vec2 uGunes, uBoyut, uTuval; uniform vec3 uRenk; varying vec3 vD;
      const float XMAX = ${NE.XMAX.toFixed(6)}, OLCEK = ${NE.OLCEK.toFixed(6)}, YUST = ${NE.YUST.toFixed(6)};
      float neY(float p){ float p2 = p * p, p4 = p2 * p2; return p * (1.007226 + 0.015085 * p2 - 0.044475 * p4 * p2 + 0.028874 * p4 * p4 - 0.005916 * p4 * p4 * p2); }
      void main(){
        vec2 c = clamp((vD.xz / uBoyut + 0.5) * uTuval, vec2(0.0), uTuval);
        float Y = YUST - c.y / OLCEK;
        float p = Y / 1.007226;
        for (int i = 0; i < 3; i++) {
          float q2 = p * p, q4 = q2 * q2;
          p -= (neY(p) - Y) / (1.007226 + 0.045255 * q2 - 0.311325 * q4 * q2 + 0.259866 * q4 * q4 - 0.065076 * q4 * q4 * q2);
        }
        float p2 = p * p, p4 = p2 * p2;
        float l = (c.x / OLCEK - XMAX) / (0.8707 - 0.131979 * p2 - 0.013791 * p4 + 0.003971 * p4 * p4 * p2 - 0.001529 * p4 * p4 * p4);
        float sh = sin(p) * sin(uGunes.x) + cos(p) * cos(uGunes.x) * cos(l - uGunes.y);
        float g = smoothstep(0.02, -0.21, sh) * (1.0 - smoothstep(120.0, 420.0, length(vD - cameraPosition)));
        gl_FragColor = vec4(mix(vec3(1.0), uRenk, g), 1.0); // \xE7arpan (renk uzay\u0131 d\xF6n\xFC\u015F\xFCm\xFC yok)
      }`}));geceOrtu.position.y=YUK_ACIK+.015,geceOrtu.renderOrder=1;let geceSon=-1e9;const sehirKonum=new Map(veri.bolgeler.map(b=>[b.id,NE.enlemBoylam(b.etiket[0],b.etiket[1])])),simdikiGunes=()=>gunesKonumu(
Date.now()+(durum.saatFarki??0));function geceSehir(id,grup,g=simdikiGunes()){const k=sehirKonum.get(id);if(!k||!grup.userData.duvar)return;const f=gecePayi(gunesSin(k[0],k[1],g));grup.userData.duvar.
emissiveIntensity=f*1.1,grup.userData.duvar.color.copy(DUVAR_GUN).lerp(DUVAR_GECE,f*.6),grup.userData.parilti.material.opacity=f*.5,grup.userData.parilti.visible=f>.02}function geceUygula(){const g=simdikiGunes();
geceU.uGunes.value.set(g[0],g[1]);for(const[id,s]of sehirKume)geceSehir(id,s.grup,g);ciz=!0}sahne.fog=new THREE.Fog(SIS,120,420),sahne.add(new THREE.HemisphereLight("#FFF4DF","#4B6470",2.1));const gunes=new THREE.
DirectionalLight("#FFE1B5",2.4);gunes.position.set(-40,60,35),gunes.castShadow=!0,gunes.shadow.mapSize.set(1024,1024),Object.assign(gunes.shadow.camera,{left:-40,right:40,top:40,bottom:-40,near:1,far:220}),
gunes.shadow.bias=-6e-4,gunes.shadow.normalBias=.02,sahne.add(gunes,gunes.target),okyanusKur(),sahne.add(geceOrtu);const kapaliYan=new THREE.MeshStandardMaterial({color:"#C9BB9B",roughness:.95}),BASKENT_NOKTA=new THREE.
CylinderGeometry(.075,.075,.06,12),BASKENT_MAT=new THREE.MeshStandardMaterial({color:"#B7A27C",roughness:.8});for(const u of veri.ulkeler){if(ayrintili.has(u.id)||!u.p.length)continue;const mat=malzeme(
ulkeRenk(u)),mesh=new THREE.Mesh(kabart(u.p,YUK_KAPALI),[mat,kapaliYan]);if(mesh.receiveShadow=!0,mesh.castShadow=!0,mesh.userData={tur:"ulke",id:u.id},sahne.add(mesh),secilebilir.push(mesh),ulkeMesh.
set(u.id,mesh),u.baskentNokta){const n=new THREE.Mesh(BASKENT_NOKTA,BASKENT_MAT);n.position.copy(dunyaNokta(u.baskentNokta[0],u.baskentNokta[1],YUK_KAPALI+.03)),sahne.add(n)}const oda=u.oda||1;etiketEkle(
esc(u.ad),"e-kapali",dunyaNokta(u.etiket[0],u.etiket[1],YUK_KAPALI+.2),oda,m=>oda*(70/m)>9)}const notr=new THREE.Mesh(kabart(veri.notr,YUK_NOTR),[malzeme(new THREE.Color("#DCD5C4")),kapaliYan]);notr.receiveShadow=
!0,sahne.add(notr);const yanMalzeme=new Map,yanIcin=ulke=>(yanMalzeme.has(ulke)||yanMalzeme.set(ulke,new THREE.MeshStandardMaterial({color:ulkeRengi(ulke).multiplyScalar(.62),roughness:.9})),yanMalzeme.
get(ulke));for(const b of veri.bolgeler){const mesh=new THREE.Mesh(kabart(b.p,YUK_ACIK),[malzeme(bolgeRenk(b)),yanIcin(sahibi(b))]);mesh.castShadow=!0,mesh.receiveShadow=!0,mesh.userData={tur:"bolge",
id:b.id,yuk:0,hedefYuk:0},sahne.add(mesh),secilebilir.push(mesh),bolgeMesh.set(b.id,mesh),b.baskent?baskentEtiket.set(b.id,etiketEkle(`<div class="e-baskent"><b>${esc(b.ad)}</b><small>${\u00E7("BA\u015EKEN\
T \xB7 SV {n}",{n:1})}</small></div>`,"",dunyaNokta(b.etiket[0],b.etiket[1],YUK_ACIK+.9),96,m=>m<120)):etiketEkle(`<span class="e-bolge">${esc(b.ad)}</span>`,"",dunyaNokta(b.etiket[0],b.etiket[1]+1.4,
YUK_ACIK+.2),40,m=>m<46)}for(const id of ayrintili){const u=ulkeById.get(id)?.u;u&&(sahne.add(cizgiler(u.p,YUK_ACIK+.012,"#FFF6E4",.85)),etiketEkle(esc(u.ad.toLocaleUpperCase(DIL.yerel)),"e-ulke",dunyaNokta(
u.etiket[0],u.etiket[1]-3.2,YUK_ACIK+.4),92,m=>m>44))}for(const b of veri.bolgeler)sahne.add(cizgiler(b.p,YUK_ACIK+.01,"#FFF6E4",.4));sehirleriKur();const tuval=cizici.renderer.domElement,odak0=bolgeById.
get("TUR-ICA")?.etiket??[W/2,H/2],hedef0=dunyaNokta(odak0[0]-9,odak0[1]+2,0);kamera.position.copy(hedef0).add(new THREE.Vector3(2,21,18.5)),kontrol=new MapControls(kamera,tuval),kontrol.target.copy(hedef0),
Object.assign(kontrol,{enableDamping:!0,dampingFactor:.09,minDistance:7,maxDistance:190,minPolarAngle:.2,maxPolarAngle:1.18,screenSpacePanning:!1,zoomToCursor:!0,enabled:!1});const kontrolDegisti=()=>{
yokEdildi||(kameraDegisti=!0,etkilesimAn=performance.now())};kontrol.addEventListener("change",kontrolDegisti),kontrol.update();const etkinMi=()=>!yokEdildi&&cizici.etkin===api;function vur(e){const r=tuval.
getBoundingClientRect();return isaretci.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1),isinci.setFromCamera(isaretci,kamera),isinci.intersectObjects(secilebilir,!1)[0]?.object??
null}function vurgula(mesh,guc){if(!mesh)return;const mat=mesh.material[0];mat.emissive.set(guc>0?"#FFF3D6":"#000000"),mat.emissiveIntensity=guc,mesh.userData.tur==="bolge"&&(mesh.userData.hedefYuk=guc>
.2?.22:guc>0?.08:0),ciz=!0}const meshOf=s=>s&&(bolgeMesh.get(s.id)||ulkeMesh.get(s.id));function uzerineGel(mesh){mesh!==uzerinde&&(uzerinde&&uzerinde!==meshOf(secili)&&vurgula(uzerinde,0),uzerinde=mesh,
mesh&&mesh.userData.id!==secili?.id&&vurgula(mesh,.14))}function sec(ud,bildir=!0){vurgula(meshOf(secili),0),secili=ud?{tur:ud.tur,id:ud.id}:null,vurgula(meshOf(secili),.3),bildir&&dinleyici.secim?.(secili)}
let basla=null,sonDokunma=0;const isaretBasla=e=>{etkinMi()&&(basla={x:e.clientX,y:e.clientY,t:performance.now()},etkilesimAn=performance.now())},isaretBirak=e=>{if(!etkinMi()||!basla)return;const hareket=Math.
hypot(e.clientX-basla.x,e.clientY-basla.y),sure=performance.now()-basla.t;if(basla=null,hareket>7||sure>500)return;const vurus=vur(e),simdi=performance.now(),cift=simdi-sonDokunma<340;if(sonDokunma=simdi,
cift&&vurus?.userData.tur==="bolge"){api.odakla(vurus.userData.id,14);return}sec(vurus?vurus.userData:null)},isaretGezdir=e=>{if(!etkinMi()||e.pointerType==="touch"||e.buttons||!ipucuEl)return;const vurus=vur(
e);if(uzerineGel(vurus),vurus){const r=kap.getBoundingClientRect(),tur=vurus.userData.tur,ad=tur==="bolge"?bolgeById.get(vurus.userData.id).ad:ulkeById.get(vurus.userData.id).u.ad,kapali=tur==="ulke"&&
!durum.acik.has(vurus.userData.id);ipucuEl.innerHTML=`${esc(ad)}${kapali?` <span style="color:var(--soluk);font-weight:500">\xB7 ${\u00E7("hen\xFCz a\xE7\u0131lmad\u0131")}</span>`:""}`,ipucuEl.style.
transform=`translate(${e.clientX-r.left+14}px, ${e.clientY-r.top+14}px)`,ipucuEl.style.opacity=1,tuval.style.cursor="pointer"}else ipucuEl.style.opacity=0,tuval.style.cursor=""},isaretCik=()=>{etkinMi()&&
(ipucuEl&&(ipucuEl.style.opacity=0),uzerineGel(null))};tuval.addEventListener("pointerdown",isaretBasla),tuval.addEventListener("pointerup",isaretBirak),tuval.addEventListener("pointermove",isaretGezdir),
tuval.addEventListener("pointerleave",isaretCik);function renkleriYenile(){for(const b of veri.bolgeler){const m=bolgeMesh.get(b.id);m.material[0].color.copy(bolgeRenk(b)),m.material[1]=yanIcin(sahibi(
b))}for(const u of veri.ulkeler)ulkeMesh.get(u.id)?.material[0].color.copy(ulkeRenk(u));isgalKur(),ciz=!0}const isgalMeshler=[];let isgalAnahtar="";function isgalKur(){const liste=kip==="kaynak"?[]:veri.
bolgeler.filter(b=>sahibi(b)!==b.ulke),anahtar=kip+"|"+liste.map(b=>b.id+":"+sahibi(b)).join(",");if(kap&&kap.dataset.isgal!==String(liste.length)&&(kap.dataset.isgal=String(liste.length)),anahtar!==isgalAnahtar){
isgalAnahtar=anahtar;for(const o of isgalMeshler.splice(0))o.parent?.remove(o),o.geometry.dispose(),o.material.dispose();for(const b of liste){const ana=bolgeMesh.get(b.id);if(!ana)continue;const g=new THREE.
ShapeGeometry(b.p.map(sekil)).rotateX(-Math.PI/2),mat=new THREE.ShaderMaterial({transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,uniforms:{uRenk:{value:new THREE.Color(ulkeById.get(
b.ulke)?.u.renk??"#888888")}},vertexShader:"varying vec3 vP; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vP = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:`uni\
form vec3 uRenk; varying vec3 vP;
          void main(){ if (fract((vP.x + vP.z) * 2.6) < 0.55) discard; gl_FragColor = vec4(uRenk, 0.72);
          #include <colorspace_fragment>
          }`}),m=new THREE.Mesh(g,mat);m.position.y=YUK_ACIK+.012,m.renderOrder=2,m.raycast=()=>{},ana.add(m),isgalMeshler.push(m)}ciz=!0}}const api={etiket:\u00E7("D\xFCnya haritas\u0131"),sahne,kamera,
get veri(){return veri},get secili(){return secili},get kareMs(){return ucuyor||performance.now()-etkilesimAn<1200?0:kaliteAdi==="yuksek"?33:kaliteAdi==="orta"?66:0},dinle(ad,fn){yokEdildi||(dinleyici[ad]=
fn)},kapBagla(kapEl,etiketKapEl){if(!yokEdildi){kap=kapEl,etiketKap=etiketKapEl;for(const e of etiketler)etiketKap.appendChild(e.el),e.w=0,e.gorunur=null;ipucuEl??=Object.assign(document.createElement(
"div"),{className:"etiket cam"}),ipucuEl.style.cssText="padding:6px 10px;font-size:13px;font-weight:650;border-radius:10px;opacity:0;pointer-events:none;z-index:3",kap.appendChild(ipucuEl),kameraDegisti=
!0,trafikAnahtar=""}},durumYaz(d){if(yokEdildi)return;const eskiKonum=durum.konum;durum=d,renkleriYenile(),sehirleriKur(),savaslariKur(),girisimleriKur(),ozerkleriKur(),direnisleriKur(),filmKur(),katmanlariKur(),
trafikKur();const yolDegisti=yolculukKur();(eskiKonum!==d.konum||yolDegisti||!konumGrubu&&!d.yol)&&konumuKur(),geceUygula()},kipAyarla(k){yokEdildi||(kip=k,renkleriYenile(),katmanlariKur(),trafikKur())},
sec(id){if(yokEdildi)return;if(!id){sec(null,!1);return}const m=bolgeMesh.get(id)||ulkeMesh.get(id);m&&sec(m.userData,!1)},odakla(id,mesafe=26){if(yokEdildi||!kontrol)return;const b=bolgeById.get(id),
u=ulkeById.get(id)?.u,nokta=b?b.etiket:u?u.etiket:null;if(!nokta)return;const hedef=dunyaNokta(nokta[0],nokta[1],0),yon=kamera.position.clone().sub(kontrol.target).normalize();kameraUc(hedef,hedef.clone().
add(yon.multiplyScalar(b?mesafe:Math.max(mesafe,40))),1.1)},yakinlas(oran){if(yokEdildi)return;const yon=kamera.position.clone().sub(kontrol.target),yeni=THREE.MathUtils.clamp(yon.length()*oran,kontrol.
minDistance,kontrol.maxDistance);kameraUc(kontrol.target.clone(),kontrol.target.clone().add(yon.setLength(yeni)),.45)},eveDon(){if(yokEdildi)return;if(yolArac){const hedef2=yolArac.position.clone().setY(
0);kameraUc(hedef2,hedef2.clone().add(new THREE.Vector3(2,21,18.5)),1.2);return}const b=bolgeById.get(durum.konum)??bolgeById.get(DUNYA.ulkeler?.[durum.ulkem]?.baskent)??bolgeById.get("TUR-ICA");if(!b)
return;const hedef=dunyaNokta(b.etiket[0]-4,b.etiket[1]+1,0);kameraUc(hedef,hedef.clone().add(new THREE.Vector3(2,21,18.5)),1.2)},kalite(k){if(yokEdildi||k===kaliteAdi)return;kaliteAdi=k,gunes.castShadow=
k!=="dusuk";const boy=k==="yuksek"?2048:1024;gunes.shadow.mapSize.x!==boy&&(gunes.shadow.mapSize.set(boy,boy),gunes.shadow.map?.dispose(),gunes.shadow.map=null),ciz=!0},boyut(w,h){if(!yokEdildi){boyutW=
w,boyutH=h,kamera.aspect=w/h,kamera.updateProjectionMatrix(),kameraDegisti=!0;for(const e of etiketler)e.w=0}},etkinlestir(acik){yokEdildi||(kontrol.enabled=acik,acik?(kameraDegisti=!0,ciz=!0):(kameraDurdur(),
basla=null,sonDokunma=0,uzerineGel(null),ipucuEl&&(ipucuEl.style.opacity=0),cizici.etkin===api&&(tuval.style.cursor="")))},guncelle(dt,t){if(!yokEdildi){if(kaliteAdi!=="dusuk"){zaman.value=t;for(const a of surekli)
a(t);yolArac&&(yolArac.userData.kasa.position.y=Math.abs(Math.sin(t*9))*.012),ciz=!0}yolEgri&&t-yolSon>2&&(yolSon=t,yolGuncelle()),trafikAraclari.length&&(kaliteAdi!=="dusuk"&&!hareketAzalt||t-trafikSon>
2)&&(trafikSon=t,trafikYerlestir(t)),t-geceSon>30&&(geceSon=t,geceUygula(),katmanlariKur()),kontrol.update();for(const m of bolgeMesh.values()){const ud=m.userData;Math.abs(ud.yuk-ud.hedefYuk)>.001&&(ud.
yuk+=(ud.hedefYuk-ud.yuk)*Math.min(1,dt*10),m.position.y=ud.yuk,ciz=!0)}gunes.target.position.copy(kontrol.target),gunes.position.copy(kontrol.target).add(new THREE.Vector3(-40,60,35)),kameraDegisti&&
(etiketleriGuncelle(),kameraDegisti=!1,ciz=!0)}},cizilmeli(){const c=ciz;return ciz=!1,c},yokEt(){if(yokEdildi)return;yokEdildi=!0,kameraDurdur(),basla=null,sonDokunma=0,secili=null,uzerinde=null,ciz=
!1,cizici.etkin===api&&(tuval.style.cursor=""),cizici.birak?.(api),tuval.removeEventListener("pointerdown",isaretBasla),tuval.removeEventListener("pointerup",isaretBirak),tuval.removeEventListener("po\
intermove",isaretGezdir),tuval.removeEventListener("pointerleave",isaretCik),kontrol.removeEventListener("change",kontrolDegisti),kontrol.enabled=!1,kontrol.dispose?.();const birakilan=new Set,birak=kaynak=>{
!kaynak||birakilan.has(kaynak)||(birakilan.add(kaynak),kaynak.dispose?.())},dokuBirak=deger=>{if(deger?.isTexture)birak(deger);else if(Array.isArray(deger))for(const d of deger)dokuBirak(d)},gerecBirak=m=>{
if(!(!m||birakilan.has(m))){for(const deger of Object.values(m))dokuBirak(deger);for(const uniform of Object.values(m.uniforms??{}))dokuBirak(uniform?.value);birak(m)}};sahne.traverse(o=>{birak(o.geometry);
for(const m of[].concat(o.material??[]))gerecBirak(m);o.isInstancedMesh&&birak(o),o.shadow&&birak(o.shadow)});for(const g of[KUTU,PARILTI_GEO,BASKENT_NOKTA])birak(g);for(const m of[DUVAR,CATI,KUBBE,kapaliYan,
BASKENT_MAT,...yanMalzeme.values()])gerecBirak(m);for(const t of[PENCERE,PARILTI])birak(t);for(const e of etiketler)e.el.remove();etiketler.length=0,ipucuEl?.remove(),ipucuEl=null,kap=null,etiketKap=null,
kontrol=null;for(const ad of Object.keys(dinleyici))delete dinleyici[ad];sahne.clear(),secilebilir.length=0,surekli.length=0,bolgeMesh.clear(),ulkeMesh.clear(),sehirKume.clear(),baskentEtiket.clear(),
yanMalzeme.clear()}};return api}Parcalar.tamam("uc_41_harita3b");
