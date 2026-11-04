const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const G=window.gsap&&window.ScrollTrigger&&!matchMedia('(prefers-reduced-motion: reduce)').matches,PG=document.body.dataset.p;
const arrived=sessionStorage.w;
/* ---- page content ---- */
if(PG==='home'){
 const M=SV.map(s=>`<span>${s[1]}</span>`).join('');$('#mq').innerHTML=`<div>${M}</div><div>${M}</div>`;
 $('#hst').innerHTML=PJ.slice(0,6).map(p=>`<a class="hc" href="work.html" data-t="Work" data-c="View"><div class="pic">${card(p[1])}</div><h3>${p[0]}</h3><span class="tag">${tagOf(p[1])}</span></a>`).join('');
 $('#svl').innerHTML=SV.map((s,i)=>`<a class="row" href="services.html#${i}" data-t="Services" data-c="Open"><span>${s[1]}</span><em>${s[2]}</em></a>`).join('');
}
if(PG==='work'){
 $('#chips').innerHTML=[["all","All"],...SV.map(s=>[s[0],s[1]])].map((c,i)=>`<button class="chip${i?'':' on'}" data-k="${c[0]}">${c[1]}</button>`).join('');
 $('#grid').innerHTML=PJ.map(p=>`<article class="wc" data-k="${p[1]}"><div class="pic">${card(p[1])}</div><h3>${p[0]}</h3><p>${p[2]}</p><span class="tag">${tagOf(p[1])}</span></article>`).join('');
 $('#chips').onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('.chip').forEach(x=>x.classList.toggle('on',x===b));
  $$('.wc').forEach(w=>w.hidden=!(b.dataset.k==='all'||w.dataset.k===b.dataset.k));
  G&&gsap.fromTo('.wc:not([hidden])',{y:50,opacity:0,scale:.92},{y:0,opacity:1,scale:1,stagger:.06,duration:.8,ease:'expo.out',overwrite:true})};
}
if(PG==='services'){
 $('#sl').innerHTML=SV.map((s,i)=>`<button class="sr" data-c="Show">${s[1]}</button>`).join('');
 const set=i=>{$$('.sr').forEach((b,k)=>b.classList.toggle('on',k===i));const s=SV[i];
  $('#sp').innerHTML=`<p>${s[2]}</p><ul>${s[3].map(x=>`<li>${x}</li>`).join('')}</ul><div class="card">${card(s[0])}</div>`;
  dispatchEvent(new CustomEvent('vfocus',{detail:i}));G&&gsap.from('#sp>*',{y:30,opacity:0,stagger:.1,duration:.8,ease:'expo.out'});history.replaceState(null,'','#'+i)};
 $$('.sr').forEach((b,i)=>b.onmouseenter=b.onfocus=b.onclick=()=>set(i));set(+location.hash.slice(1)||0);
}
if(PG==='contact')$('#f').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target);
 location.href=`mailto:hello@v-onecreations.com?subject=${encodeURIComponent('Project: '+d.get('type'))}&body=${encodeURIComponent(`Name: ${d.get('n')}\nEmail: ${d.get('e')}\n\n${d.get('m')}`)}`};
$$('.chk').forEach(l=>l.onclick=()=>$$('.chk').forEach(x=>x.classList.toggle('on',x===l)));

/* ---- page transition: warp forward, curtain with the next page's name ---- */
function go(h,t){if(go.l)return;go.l=1;$('.cv span').textContent=t;sessionStorage.w=t;window.__leave&&__leave();
 if(!G){location.href=h;return}gsap.set('.cv',{transformOrigin:'50% 100%'});gsap.to('.cv',{scaleY:1,duration:.85,ease:'expo.inOut',onComplete:()=>location.href=h})}
$$('a[href]').forEach(a=>{const h=a.getAttribute('href');if(/^[\w-]+\.html(#\d+)?$/.test(h))a.onclick=e=>{e.preventDefault();go(h,a.dataset.t||a.textContent.trim())}});
addEventListener('pageshow',e=>e.persisted&&location.reload());

/* ---- motion ---- */
if(!G){document.documentElement.classList.remove('in');sessionStorage.removeItem('w')}else{
 gsap.registerPlugin(ScrollTrigger);
 if(arrived){$('.cv span').textContent=arrived;gsap.set('.cv',{scaleY:1,transformOrigin:'50% 0'});document.documentElement.classList.remove('in');sessionStorage.removeItem('w');gsap.to('.cv',{scaleY:0,duration:1,ease:'expo.inOut',delay:.25})}
 const D=arrived?1:.2;
 if(window.Lenis){const L=new Lenis({lerp:.08});L.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>L.raf(t*1000));gsap.ticker.lagSmoothing(0);
  $$('a[href^="#"]').forEach(a=>{if(a.getAttribute('href').length>1)a.onclick=e=>{e.preventDefault();L.scrollTo(a.getAttribute('href'))}})}
 gsap.from('h1 .ln i',{yPercent:115,stagger:.12,duration:1.5,ease:'expo.out',delay:D});
 gsap.from('.lede,.cue,.chips,.sub,.nav',{y:30,opacity:0,stagger:.12,duration:1.2,delay:D+.5});
 ScrollTrigger.batch('.rv,.wc,.row',{start:'top 90%',onEnter:b=>gsap.from(b,{y:60,opacity:0,stagger:.1,duration:1.1,ease:'expo.out'})});
 gsap.to('.pg',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});
 if(PG==='home'){const t=$('#hst');
  gsap.to(t,{x:()=>-(t.scrollWidth-innerWidth+innerWidth*.08),ease:'none',scrollTrigger:{trigger:'#hs',pin:true,scrub:1,start:'top top',end:()=>'+='+t.scrollWidth,invalidateOnRefresh:true}});
  const m=gsap.to('#mq',{xPercent:-50,repeat:-1,duration:30,ease:'none'});
  ScrollTrigger.create({onUpdate:s=>{const v=s.getVelocity();gsap.to('#mq',{skewX:Math.max(-12,Math.min(12,-v/160)),duration:.3,overwrite:'auto'});m.timeScale(1+Math.min(6,Math.abs(v)/300))}})}
 // tilt cards toward the cursor
 if(matchMedia('(hover:hover)').matches){
  $$('.pic,.card').forEach(el=>{gsap.set(el,{transformPerspective:900});const rx=gsap.quickTo(el,'rotationX',{duration:.6}),ry=gsap.quickTo(el,'rotationY',{duration:.6});
   el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();ry(((e.clientX-r.left)/r.width-.5)*12);rx(-((e.clientY-r.top)/r.height-.5)*12)});el.addEventListener('pointerleave',()=>{rx(0);ry(0)})});
  // custom cursor
  const c=$('.cur'),x=gsap.quickTo(c,'x',{duration:.25}),y=gsap.quickTo(c,'y',{duration:.25});
  addEventListener('pointermove',e=>{x(e.clientX);y(e.clientY)});
  document.addEventListener('pointerover',e=>{const t=e.target.closest('[data-c],a,button');c.classList.toggle('big',!!t);c.textContent=t?(t.dataset.c||''):''});
  // magnetic buttons
  $$('.mag').forEach(b=>{const x=gsap.quickTo(b,'x',{duration:.5,ease:'power3'}),y=gsap.quickTo(b,'y',{duration:.5,ease:'power3'});b.onmousemove=e=>{const r=b.getBoundingClientRect();x((e.clientX-r.left-r.width/2)*.35);y((e.clientY-r.top-r.height/2)*.35)};b.onmouseleave=()=>{x(0);y(0)}})}
}
