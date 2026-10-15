/* ===== Edit your content here ===== */
const P=[ // title, category, icon (video|design|web|app|film), description
["Brand film","Filmmaking","film","A short brand film shot, cut and graded in-house."],
["Logo system","Graphic Design","design","A logo, colour and type system built to work everywhere."],
["Studio website","Web Development","web","A fast, animated site that turns visitors into enquiries."],
["Fitness app","App Development","app","A mobile app with workout tracking and simple onboarding."],
["Product launch reel","Video Editing","video","A 30-second launch reel cut to music and motion."],
["Packaging set","Graphic Design","design","Packaging artwork that stands out on a crowded shelf."],
["Music video","Filmmaking","film","A narrative music video shot over two nights."],
["Online store","Web Development","web","A custom storefront with quick checkout."],
["Social campaign","Video Editing","video","Vertical edits and motion posters for a month-long campaign."],
["Booking app","App Development","app","An app that lets customers book and pay in three taps."]];
const FILMS=[["Showreel 2026","film","01:12"],["Brand film","video","00:58"],["Music video","film","03:24"],["Launch reel","video","00:30"],["Wedding story","film","02:05"],["Documentary cut","video","04:40"]];
const LOGOS={left:[],right:[]}; // e.g. {left:["assets/acme.svg"],right:[]} ; 4 slots per side
/* ================================== */
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const IC={video:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z"/>',design:'<path d="M12 3l7 7-7 11-7-11z"/><circle cx="12" cy="10" r="1.6"/><path d="M12 11.6V21"/>',web:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 13l-2 2 2 2M16 13l2 2-2 2"/>',app:'<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M10.5 18.5h3"/>',film:'<path d="M3 10h18v10H3zM3 10l2-5 4 1-2 4M9 6l4 1-2 4M13 7l4 1-2 4"/>'};
const ico=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg>`;
const PAL=[['#3a2bff','#ff4d6d'],['#ff4d6d','#ffb347'],['#19d3da','#3a2bff'],['#7b2ff7','#ff4d6d'],['#ffb347','#3a2bff']];
const art=(i,k)=>`<div class="art" style="--a:${PAL[i%5][0]};--b:${PAL[i%5][1]}">${ico(k)}<i></i><i class="r2"></i></div>`;
function split(el){const o=[];[...el.childNodes].forEach(n=>{if(n.nodeType===3)n.textContent.split(/(\s+)/).forEach(p=>{if(!p.trim())o.push(p?' ':'');else o.push(`<span class="w">${[...p].map(c=>`<span class="c">${c}</span>`).join('')}</span>`)});else o.push(n.outerHTML)});el.innerHTML=o.join('');return $$('.c',el)}

/* build content */
const HC=[["Video Editing","video","54%","17%"],["Graphic Design","design","76%","29%"],["Web Development","web","60%","45%"],["App Development","app","78%","58%"],["Filmmaking","film","55%","71%"]];
$('.cws').innerHTML=HC.map(c=>`<div class="cw" style="left:${c[2]};top:${c[3]}"><div class="chip">${ico(c[1])}<span>${c[0]}</span></div></div>`).join('');
const M='<span>Video Editing •</span><span>Graphic Design •</span><span>Web Development •</span><span>App Development •</span><span>Filmmaking •</span>';
$('.mq div').innerHTML=`<div>${M}</div><div>${M}</div>`;
[['.ph.l',0,'film'],['.ph.l2',1,'design'],['.ph.r',2,'web'],['.ph.r2',3,'video']].forEach(a=>$(a[0]).innerHTML=art(a[1],a[2]));
const slots=(s)=>Array.from({length:4},(_,i)=>`<div class="slot">${LOGOS[s][i]?`<img src="${LOGOS[s][i]}" alt="">`:'Client logo'}</div>`).join('');
$('#cl').innerHTML=slots('left');$('#cr').innerHTML=slots('right');
$('#work').innerHTML=P.map((p,i)=>`<article class="proj"><div class="pic">${art(i,p[2])}</div><div class="txt"><div class="num">${String(i+1).padStart(2,'0')}</div><span class="tag">${p[1]}</span><h3>${p[0]}</h3><p>${p[3]}</p></div></article>`).join('');
const V=FILMS.map((f,i)=>`<div class="vid">${art(i+2,f[1])}<span>${f[0]}</span><em>${f[2]}</em><u></u></div>`).join('');
$('#track').innerHTML=V+V;

/* motion */
const intro=$('#intro'),done=()=>{intro.remove();document.body.classList.remove('locked')};
if(!window.gsap||!window.ScrollTrigger||matchMedia('(prefers-reduced-motion: reduce)').matches){done()}else{
gsap.registerPlugin(ScrollTrigger);
let L;if(window.Lenis){L=new Lenis({lerp:.09});L.stop();L.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>L.raf(t*1000));gsap.ticker.lagSmoothing(0);$$('a[href^="#"]').forEach(a=>a.onclick=e=>{e.preventDefault();L.scrollTo(a.getAttribute('href'))})}
const st=(t,o={})=>({trigger:t,start:'top 75%',...o});
const rev=(el,t)=>gsap.from(split(el),{yPercent:115,rotate:6,stagger:.03,duration:1.2,ease:'expo.out',scrollTrigger:st(t||el)});

/* hero */
const hc=split($('.hero h1'));gsap.set(hc,{yPercent:120,rotate:6});
$$('.chip svg *').forEach(p=>{try{const l=p.getTotalLength();p.style.strokeDasharray=l;p.style.strokeDashoffset=l}catch(e){}});
gsap.set('.cw',{scale:0});
gsap.to('.blob',{x:'random(-140,140)',y:'random(-90,90)',duration:'random(6,10)',repeat:-1,yoyo:true,repeatRefresh:true,ease:'sine.inOut'});
gsap.to('.chip',{y:'random(-20,20)',rotation:'random(-3,3)',duration:'random(3,5)',repeat:-1,yoyo:true,repeatRefresh:true,ease:'sine.inOut'});
gsap.to('.mq',{xPercent:-50,duration:40,ease:'none',repeat:-1});
$$('.cw').forEach((c,i)=>{const d=(i%3+1)*16,x=gsap.quickTo(c,'x',{duration:1.2,ease:'power3'}),y=gsap.quickTo(c,'y',{duration:1.2,ease:'power3'});addEventListener('mousemove',e=>{x((e.clientX/innerWidth-.5)*d*2);y((e.clientY/innerHeight-.5)*d*2)})});
gsap.to('.hero .in',{yPercent:-25,opacity:0,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
const heroIn=()=>{document.body.classList.remove('locked');L&&L.start();
 gsap.timeline({defaults:{ease:'expo.out'}}).to(hc,{yPercent:0,rotate:0,stagger:.025,duration:1.5})
 .from('.lede,.hero .btn',{y:30,opacity:0,stagger:.15,duration:1},'-=1')
 .to('.cw',{scale:1,stagger:.12,duration:1.3,ease:'back.out(1.7)'},'-=1.2')
 .to('.chip svg *',{strokeDashoffset:0,duration:1.8,stagger:.03,ease:'power2.out'},'<')
 .from('.nav',{yPercent:-100,opacity:0,duration:1},'-=1.2')};

/* statement: images fly in from both sides, caption rises letter by letter */
const cc=split($('.caption'));cc.slice(-12).forEach(c=>c.style.color='var(--coral)');
gsap.timeline({scrollTrigger:{trigger:'#statement',start:'top top',end:'+=260%',pin:true,scrub:1}})
.from('.ph.l',{xPercent:-170,rotate:-25},0).from('.ph.l2',{xPercent:-230,rotate:18},.15)
.from('.ph.r',{xPercent:170,rotate:25},0).from('.ph.r2',{xPercent:230,rotate:-18},.15)
.from(cc,{yPercent:115,rotate:8,stagger:.05,ease:'power3.out',duration:1},.4)
.to('.caption',{scale:1.12,duration:1.5},1.6).to('.ph',{y:i=>i%2?-70:70,rotate:i=>i%2?6:-6,duration:1.5},1.6);

/* clients */
rev($('.clients h2'));
gsap.from('#cl .slot',{x:-180,opacity:0,stagger:.1,duration:1.3,ease:'expo.out',scrollTrigger:st('.clients',{start:'top 60%'})});
gsap.from('#cr .slot',{x:180,opacity:0,stagger:.1,duration:1.3,ease:'expo.out',scrollTrigger:st('.clients',{start:'top 60%'})});
gsap.from('.spin',{scale:0,rotate:-180,duration:1.6,ease:'back.out(1.4)',scrollTrigger:st('.clients',{start:'top 60%'})});
gsap.to('.ring',{rotate:360,duration:16,repeat:-1,ease:'none'});
gsap.to('.vv',{rotateY:360,duration:2.2,repeat:-1,repeatDelay:1.4,ease:'power2.inOut'});

/* portfolio */
const TINT=['#07060c','#0b0922','#16070f','#07131a','#120a22'];
$$('.proj').forEach((p,i)=>{
 const odd=i%2===0,pic=$('.pic',p);
 gsap.timeline({scrollTrigger:st(p,{start:'top 65%',toggleActions:'play none none reverse'})})
 .fromTo(pic,{clipPath:odd?'inset(0 100% 0 0)':'inset(0 0 0 100%)'},{clipPath:'inset(0 0% 0 0%)',duration:1.4,ease:'expo.inOut'})
 .from(split($('h3',p)),{yPercent:115,rotate:6,stagger:.03,duration:1,ease:'expo.out'},.5)
 .from($$('.tag,p',p),{y:24,opacity:0,stagger:.12,duration:.9},.7)
 .from($('.num',p),{xPercent:odd?25:-25,opacity:0,duration:1.2,ease:'expo.out'},.3);
 gsap.fromTo($('.art',pic),{yPercent:-8,scale:1.15},{yPercent:8,scale:1,ease:'none',scrollTrigger:{trigger:p,start:'top bottom',end:'bottom top',scrub:true}});
 ScrollTrigger.create({trigger:p,start:'top 50%',end:'bottom 50%',onToggle:s=>s.isActive&&gsap.to('body',{backgroundColor:TINT[i%5],duration:1})});
});

/* films: endless auto carousel, speeds up while scrolling, pauses on hover */
rev($('.films h2'));
gsap.from('.vid',{y:120,rotate:4,opacity:0,stagger:.08,duration:1.2,ease:'expo.out',scrollTrigger:st('.films')});
const loop=gsap.to('#track',{xPercent:-50,duration:55,ease:'none',repeat:-1});
ScrollTrigger.create({onUpdate:s=>gsap.timeline({overwrite:true}).to(loop,{timeScale:1+Math.min(5,Math.abs(s.getVelocity())/400),duration:.2}).to(loop,{timeScale:1,duration:1.2})});
$('.films').onmouseenter=()=>gsap.to(loop,{timeScale:0,duration:.6,overwrite:true});$('.films').onmouseleave=()=>gsap.to(loop,{timeScale:1,duration:.8,overwrite:true});

/* contact */
rev($('.contact h2'));
gsap.from('.contact .btn,.contact li,.contact small',{y:40,opacity:0,stagger:.08,duration:1,ease:'expo.out',scrollTrigger:st('.contact h2',{start:'top 60%'})});
$$('.mag').forEach(b=>{const x=gsap.quickTo(b,'x',{duration:.5,ease:'power3'}),y=gsap.quickTo(b,'y',{duration:.5,ease:'power3'});b.onmousemove=e=>{const r=b.getBoundingClientRect();x((e.clientX-r.left-r.width/2)*.35);y((e.clientY-r.top-r.height/2)*.35)};b.onmouseleave=()=>{x(0);y(0)}});
gsap.to('.pg',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});

/* intro: V slams in from the left and moves right as ONE CREATIONS appears, then the logo zooms through to the hero */
const rc=split($('.rest'));
Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1500))]).then(()=>{
 const rest=$('.rest'),W=rest.getBoundingClientRect().width;gsap.set(rest,{width:0});gsap.set(rc,{yPercent:120});
 ScrollTrigger.refresh();
 gsap.timeline()
 .fromTo('.v',{x:-innerWidth*.42,scale:3.5,opacity:0,filter:'blur(30px)'},{x:0,scale:1,opacity:1,filter:'blur(0px)',duration:1.5,ease:'expo.out'})
 .to(rest,{width:W,duration:1.2,ease:'power3.inOut'},.9)
 .to(rc,{yPercent:0,stagger:.05,duration:1,ease:'expo.out'},1.1)
 .to('.lg',{scale:14,opacity:0,duration:1.4,ease:'power4.in'},'+=.5')
 .add(heroIn,'-=.9').to(intro,{autoAlpha:0,duration:.6},'-=.9').add(()=>intro.remove());
});}
