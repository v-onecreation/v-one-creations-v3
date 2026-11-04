/* One 3D world shared by every page: tunnel + floating shapes + a focus object. Colours change per page. */
(function(){if(!window.THREE)return;
const pg=document.body.dataset.p,MD={home:[0x3a2bff,0xff4d6d],work:[0xffb347,0xff4d6d],services:[0x19d3da,0x7b2ff7],contact:[0xff4d6d,0x3a2bff]}[pg]||[0x3a2bff,0xff4d6d];
const K=matchMedia('(prefers-reduced-motion: reduce)').matches?0:1,cols=[...MD,0xefe9df,0xffb347].map(h=>new THREE.Color(h));
const R=new THREE.WebGLRenderer({canvas:document.getElementById('gl'),antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
const sc=new THREE.Scene();sc.fog=new THREE.FogExp2(0x07060c,.017);
const cam=new THREE.PerspectiveCamera(60,1,.1,500);sc.add(cam,new THREE.AmbientLight(0xffffff,.6));
const l2=new THREE.PointLight(MD[0],2.6,50);l2.position.set(6,4,-6);cam.add(new THREE.PointLight(MD[1],2.6,40),l2);
const n=2600,pos=new Float32Array(n*3),col=new Float32Array(n*3);
for(let i=0;i<n;i++){pos.set([(Math.random()-.5)*60,(Math.random()-.5)*36,20-Math.random()*420],i*3);const c=cols[(Math.random()*4)|0];col.set([c.r,c.g,c.b],i*3)}
const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));
sc.add(new THREE.Points(g,new THREE.PointsMaterial({size:.1,vertexColors:true,transparent:true,opacity:.9})));
const GF=[new THREE.TorusKnotGeometry(1,.3,140,16,2,3),new THREE.IcosahedronGeometry(1.6,1),new THREE.BoxGeometry(2.6,1.7,.25),new THREE.BoxGeometry(1.1,2.2,.22),new THREE.OctahedronGeometry(1.7)];
const wf=(geo,c,o)=>new THREE.LineSegments(new THREE.WireframeGeometry(geo),new THREE.LineBasicMaterial({color:c,transparent:true,opacity:o}));
const PC=[[0x3a2bff,0xff4d6d],[0xff4d6d,0xffb347],[0x19d3da,0x3a2bff],[0x7b2ff7,0xff4d6d],[0xffb347,0x3a2bff]];
// shapes scattered along the flight path
const sh=Array.from({length:10},(_,i)=>{const geo=GF[i%5],o=new THREE.Group();o.add(new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:cols[i%4],metalness:.6,roughness:.3,flatShading:true})),wf(geo,0xefe9df,.25));o.userData={t:Math.random(),x:(i%2?-1:1)*(4+Math.random()*6),y:(Math.random()-.5)*8,s:Math.random()+.4};sc.add(o);return o});
// focus object bolted to the camera
const mat=new THREE.MeshStandardMaterial({color:cols[0],metalness:.65,roughness:.25,flatShading:true}),fo=new THREE.Group(),fm=new THREE.Mesh(GF[0],mat),fw=wf(GF[0],cols[1],.4);fw.scale.setScalar(1.35);fo.add(fm,fw);cam.add(fo);
let tc=new THREE.Color(),tw=new THREE.Color(),pop=1;
const setF=i=>{fm.geometry=GF[i];fw.geometry.dispose();fw.geometry=new THREE.WireframeGeometry(GF[i]);tc.set(PC[i][0]);tw.set(PC[i][1]);pop=1.5};
setF({home:0,work:1,services:0,contact:4}[pg]||0);mat.color.copy(tc);addEventListener('vfocus',e=>setF(e.detail));
let TOT=100,leave=0,wl=0,wa=sessionStorage.w?1:0,P=0,mx=0,my=0;window.__leave=()=>leave=1;
const size=()=>{R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();const m=innerWidth<780;
 fo.position.set(m?0:3.4,m?2:0,-9);fo.userData.s=m?.6:1;TOT=Math.min(320,Math.max(70,document.documentElement.scrollHeight/innerHeight*22));
 sh.forEach(o=>{const u=o.userData;o.position.set(m?u.x*.4:u.x,u.y,-u.t*TOT-8)})};
addEventListener('resize',size);addEventListener('load',size);size();
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
(function loop(t){requestAnimationFrame(loop);t*=.001;
 const tp=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight),d=tp-P;P+=d*.07;wl+=(leave-wl)*.05;wa*=.96;
 cam.fov=60+Math.min(35,Math.abs(d)*1200)*K+(wl+wa)*45;cam.updateProjectionMatrix();
 cam.position.set(Math.sin(P*9)*1.6+mx*1.4,Math.cos(P*6)*.6-my*.9,-P*TOT-wl*35+wa*30);
 cam.rotation.set(my*.06,-mx*.1+Math.sin(P*9)*.07,Math.sin(P*9)*.08);
 pop+=(1-pop)*.08;fo.scale.setScalar(fo.userData.s*pop);fo.rotation.set(t*.35*K+P*8,t*.5*K+P*6,0);
 mat.color.lerp(tc,.06);fw.material.color.lerp(tw,.06);
 sh.forEach(o=>{o.rotation.x=t*.3*K*o.userData.s;o.rotation.y=t*.4*K*o.userData.s});
 R.render(sc,cam)})(0);
})();
