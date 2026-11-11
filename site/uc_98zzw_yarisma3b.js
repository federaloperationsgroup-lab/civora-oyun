// Civora istemcisi 2026-11-11-88bf220f-2e9125c (uc_98zzw_yarisma3b.js; sıkıştırılmış: esbuild, adlar korunur). Kaynak: apps/istemci/kaynak.
"use strict";function yarisma3bKur(THREE,cizici){const a=konser3bKur(THREE,cizici),tuval=document.createElement("canvas");tuval.width=1536,tuval.height=614;const kalem=tuval.getContext("2d"),doku=new THREE.CanvasTexture(
tuval);doku.colorSpace=THREE.SRGBColorSpace;const levha=new THREE.Mesh(new THREE.PlaneGeometry(6.4,2.56),new THREE.MeshBasicMaterial({map:doku,toneMapped:!1})),y=KONSER_YER.festival,yer=konserSahneYeri(
y);levha.position.set(0,y.sY+1.35+1.28,yer.zArka+.055),a.sahne.add(levha);let anahtar="";return a.yarismaYaz=r=>{const d=yarismaSahneVerisi(r);a.durumYaz(d);const siralama=r.ranking??r.results??[],yeni=JSON.
stringify([r.season,siralama.map(e=>[e.country_id,e.band_name,e.total_points??e.points])]);yeni!==anahtar&&(anahtar=yeni,kalem.fillStyle="#11172C",kalem.fillRect(0,0,1536,614),kalem.fillStyle="#FFE5A1",
kalem.font="bold 54px sans-serif",kalem.textAlign="center",kalem.fillText(\u00E7("{n}. sezon \xB7 \u015Eark\u0131 Yar\u0131\u015Fmas\u0131",{n:Number(r.season)}),768,66,1460),siralama.slice(0,10).forEach(
(e,i)=>{const sutun=i<5?0:1,satir=i%5,x=48+sutun*755,z=126+satir*94;kalem.fillStyle=ulkeRenk(e.country_id),kalem.fillRect(x,z-37,20,53),kalem.font="bold 34px sans-serif",kalem.textAlign="left",kalem.fillStyle=
"#FFFFFF",kalem.fillText(`${i+1}. ${e.country_name??ulkeAdi(e.country_id)}`,x+34,z,475),kalem.font="24px sans-serif",kalem.fillStyle="#D3D8E5",kalem.fillText(e.band_name??"",x+34,z+31,475),kalem.textAlign=
"right",kalem.font="bold 40px sans-serif",kalem.fillStyle="#FFE5A1",kalem.fillText(String(e.total_points??e.points??0),x+665,z+8,120)}),doku.needsUpdate=!0)},a}Parcalar.tamam("uc_98zzw_yarisma3b");
