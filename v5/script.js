/* ===== Edit your content here ===== */
const S=[["film","Films that hold a room.","Brand films, music videos and documentaries, shot, cut and graded in-house.","Filmmaking"],
["design","Identity that travels.","Logos, colour and type systems, and packaging that stands out on a shelf.","Graphic Design"],
["web","Websites that move.","Fast, animated sites and stores built to turn visitors into enquiries.","Web Development"],
["app","Apps people open daily.","Mobile apps with simple onboarding, tracking and payments.","App Development"],
["video","Edits with rhythm.","Launch reels and social campaigns cut to music and motion.","Video Editing"]];
/* ================================== */
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const PAL=[['#3a2bff','#ff4d6d'],['#ff4d6d','#ffb347'],['#19d3da','#3a2bff'],['#7b2ff7','#ff4d6d'],['#ffb347','#3a2bff']];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
$('#ch').innerHTML=S.map((s,i)=>`<section class="chap ${i%2?'r':'l'}" id="c${i}"><div class="t"><span class="tag">${s[3]}</span><h2>${s[1]}</h2><p>${s[2]}</p><div class="card"><div class="art" style="--a:${PAL[i][0]};--b:${PAL[i][1]}">${window.VIS?VIS[s[0]]:''}</div></div></div></section>`).join('');
$('.dots').innerHTML=['#top',...S.map((_,i)=>'#c'+i),'#contact'].map(h=>`<a href="${h}" aria-label="${h}"></a>`).join('');
const prog=()=>scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);

/* ---- 3D world: the camera flies down a tunnel, one object per chapter ---- */
let at=[]; // scroll progress (0..1) at the centre of each chapter
const measure=()=>{const m=Math.max(1,document.documentElement.scrollHeight-innerHeight);at=$$('.chap').map(c=>(c.offsetTop+c.offsetHeight/2-innerHeight/2)/m)};
if(window.THREE){
 const TOT=200,C=PAL.flat().map(h=>new THREE.Color(h));
 const R=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
 const sc=new THREE.Scene();sc.fog=new THREE.FogExp2(0x07060c,.016);
 const cam=new THREE.PerspectiveCamera(60,1,.1,400);sc.add(cam);sc.add(new THREE.AmbientLight(0xffffff,.6));
 const l1=new THREE.PointLight(0xff4d6d,2.4,40);cam.add(l1);const l2=new THREE.PointLight(0x3a2bff,2.4,50);l2.position.set(6,4,-6);cam.add(l2);
 // star field
 const n=2600,pos=new Float32Array(n*3),col=new Float32Array(n*3);
 for(let i=0;i<n;i++){pos.set([(Math.random()-.5)*60,(Math.random()-.5)*36,20-Math.random()*(TOT+60)],i*3);const c=C[(Math.random()*C.length)|0];col.set([c.r,c.g,c.b],i*3)}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));
 sc.add(new THREE.Points(g,new THREE.PointsMaterial({size:.1,vertexColors:true,transparent:true,opacity:.9})));
 // objects
 const G=[new THREE.TorusKnotGeometry(1,.3,140,16,2,3),new THREE.IcosahedronGeometry(1.6,1),new THREE.BoxGeometry(2.6,1.7,.25),new THREE.BoxGeometry(1.1,2.2,.22),new THREE.OctahedronGeometry(1.7)];
 const wire=(geo,c,o,s)=>{const w=new THREE.LineSegments(new THREE.WireframeGeometry(geo),new THREE.LineBasicMaterial({color:c,transparent:true,opacity:o}));w.scale.setScalar(s);return w};
 const objs=G.map((geo,i)=>{const grp=new THREE.Group();
  grp.add(new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:C[i*2],metalness:.65,roughness:.25,flatShading:true})),wire(geo,C[i*2+1],.4,1.35));
  sc.add(grp);return grp});
 const hero=wire(new THREE.IcosahedronGeometry(4.5,2),0xefe9df,.12,1);hero.position.set(0,0,-18);sc.add(hero);
 const rings=[0,1,2,3].map(k=>{const r=new THREE.Mesh(new THREE.TorusGeometry(3.2,.04,8,120),new THREE.MeshBasicMaterial({color:C[k*2%C.length]}));sc.add(r);return r});
 const place=()=>{objs.forEach((o,i)=>{o.userData.z=-(at[i]||i/5)*TOT-10;o.position.set(i%2?-3.6:3.6,0,o.userData.z)});
  rings.forEach((r,k)=>r.position.set(0,0,-.95*TOT-9-k*7))};
 const size=()=>{R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();
  const m=innerWidth<780;objs.forEach((o,i)=>o.scale.setScalar(m?.7:1));measure();place()};
 addEventListener('resize',size);addEventListener('load',()=>{ScrollTrigger&&ScrollTrigger.refresh();size()});size();
 let P=0,mx=0,my=0;
 addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
 const k=reduce?0:1;
 (function loop(t){requestAnimationFrame(loop);t*=.001;
  const tp=prog(),d=tp-P;P+=d*.07;
  cam.fov=60+Math.min(35,Math.abs(d)*1200)*k;cam.updateProjectionMatrix(); // speed-warp while scrolling fast
  cam.position.set(Math.sin(P*9)*1.6+mx*1.4,Math.cos(P*6)*.6-my*.9,-P*TOT);
  cam.rotation.set(my*.06,-mx*.1+Math.sin(P*9)*.07,Math.sin(P*9)*.08);
  objs.forEach((o,i)=>{o.rotation.x=t*.35*k+P*8+i;o.rotation.y=t*.5*k+P*6;o.position.y=Math.sin(t+i)*.35*k});
  hero.rotation.y=t*.08*k+P*3;hero.rotation.x=P*2;rings.forEach((r,j)=>r.rotation.z=t*.4*k*(j%2?1:-1));
  R.render(sc,cam)})(0);
}else{window.addEventListener('load',measure)}

/* ---- scroll choreography ---- */
const dots=$$('.dots a');
if(window.gsap&&window.ScrollTrigger&&!reduce){
 gsap.registerPlugin(ScrollTrigger);
 if(window.Lenis){const L=new Lenis({lerp:.08});L.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>L.raf(t*1000));gsap.ticker.lagSmoothing(0);
  $$('a[href^="#"]').forEach(a=>a.onclick=e=>{e.preventDefault();L.scrollTo(a.getAttribute('href'))})}
 gsap.from('.ln i',{yPercent:115,stagger:.12,duration:1.5,ease:'expo.out',delay:.2});
 gsap.from('.lede,.cue,.nav',{y:30,opacity:0,stagger:.15,duration:1.2,delay:1});
 gsap.to('.hero',{opacity:0,yPercent:-12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom 30%',scrub:true}});
 $$('.chap').forEach((c,i)=>{const t=$('.t',c);
  gsap.timeline({scrollTrigger:{trigger:c,start:'top 70%',end:'bottom 30%',scrub:true}})
   .fromTo(t,{opacity:0,y:80},{opacity:1,y:0,duration:1}).to(t,{opacity:1,duration:2}).to(t,{opacity:0,y:-60,duration:1});
  gsap.from($('.card',c),{rotationY:i%2?-35:35,scale:.8,ease:'none',scrollTrigger:{trigger:c,start:'top 70%',end:'top 20%',scrub:true}});
  ScrollTrigger.create({trigger:c,start:'top 50%',end:'bottom 50%',onToggle:s=>s.isActive&&dots.forEach((d,k)=>d.classList.toggle('on',k===i+1))})});
 ScrollTrigger.create({trigger:'.hero',start:'top top',end:'bottom 50%',onToggle:s=>s.isActive&&dots.forEach((d,k)=>d.classList.toggle('on',!k))});
 ScrollTrigger.create({trigger:'.contact',start:'top 50%',onToggle:s=>s.isActive&&dots.forEach((d,k)=>d.classList.toggle('on',k===dots.length-1))});
 gsap.from('.contact h2,.contact .btn,.contact li,.contact small',{y:60,opacity:0,stagger:.08,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'.contact',start:'top 55%'}});
 gsap.to('.pg',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});
 $$('.mag').forEach(b=>{const x=gsap.quickTo(b,'x',{duration:.5,ease:'power3'}),y=gsap.quickTo(b,'y',{duration:.5,ease:'power3'});b.onmousemove=e=>{const r=b.getBoundingClientRect();x((e.clientX-r.left-r.width/2)*.35);y((e.clientY-r.top-r.height/2)*.35)};b.onmouseleave=()=>{x(0);y(0)}});
}
