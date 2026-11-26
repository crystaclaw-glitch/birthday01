// ✏️ Ganti nama panggilannya di sini
const NAME = "love";
const $=s=>document.querySelector(s), S=[...document.querySelectorAll('.slide')];
$('#nm').textContent=NAME; let c=0;
// dots
const dots=$('#dots');S.forEach((_,i)=>{const b=document.createElement('b');b.onclick=()=>go(i);dots.appendChild(b)});
function go(n){if(n<0||n>=S.length)return;c=n;
 S.forEach((s,i)=>{s.classList.toggle('active',i==n);s.classList.toggle('before',i<n);s.classList.toggle('after',i>n)});
 [...dots.children].forEach((b,i)=>b.classList.toggle('on',i==n));
 $('#num').textContent=String(n+1).padStart(2,'0')+' / 0'+S.length;
 $('#prev').disabled=n==0;$('#next').disabled=n==S.length-1;
 if(n==1)startLetter();if(n==5)resetGift()}
$('#prev').onclick=()=>go(c-1);$('#next').onclick=()=>go(c+1);
addEventListener('keydown',e=>{if(e.key=='ArrowRight'||e.key==' ')go(c+1);if(e.key=='ArrowLeft')go(c-1)});
let tx=0;addEventListener('touchstart',e=>tx=e.target.closest('.dg,input')?null:e.touches[0].clientX,{passive:true});
addEventListener('touchend',e=>{if(tx==null)return;const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>60)go(c+(d<0?1:-1))});
$('#open').onclick=e=>{burst(e.clientX,e.clientY,60);setTimeout(()=>go(1),350)};
$('#replay').onclick=()=>go(0);
// ambient: hearts + sparkles
const fx=$('#fx');
for(let i=0;i<22;i++){const s=document.createElement('span');s.className='sp';s.textContent='✦';
 s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;font-size:${8+Math.random()*12}px;animation-delay:${Math.random()*3}s`;fx.appendChild(s)}
setInterval(()=>{if(document.hidden)return;const h=document.createElement('span');h.className='hrt';h.textContent=Math.random()<.5?'♥':'♡';
 const d=(c==5?4:7)+Math.random()*6;h.style.cssText=`left:${Math.random()*100}%;font-size:${18+Math.random()*22}px;animation-duration:${d}s;--dx:${(Math.random()-.5)*120}px`;
 fx.appendChild(h);setTimeout(()=>h.remove(),d*1000)},c==5?500:900);
// confetti
const cv=$('#cf'),x=cv.getContext('2d');let P=[],run=0;
const rs=()=>{cv.width=cv.clientWidth;cv.height=cv.clientHeight};rs();addEventListener('resize',rs);
function burst(px,py,n=90){const r=cv.getBoundingClientRect(),cols=['#a3182c','#f3c9cf','#e8b4bc','#d4af6a','#fff'];
 for(let i=0;i<n;i++)P.push({x:px-r.left,y:py-r.top,vx:(Math.random()-.5)*14,vy:-Math.random()*12-3,r:Math.random()*6+4,c:cols[i%5],a:1,t:Math.random()*6,vt:(Math.random()-.5)*.3,h:Math.random()<.35});
 if(!run){run=1;loop()}}
function loop(){x.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.a>.02);
 P.forEach(p=>{p.vy+=.28;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.t+=p.vt;p.a-=.007;x.save();x.globalAlpha=Math.max(p.a,0);x.translate(p.x,p.y);x.rotate(p.t);x.fillStyle=p.c;
  if(p.h){x.font=p.r*3+'px serif';x.fillText('♥',0,0)}else x.fillRect(-p.r/2,-p.r/2,p.r,p.r*.6);x.restore()});
 P.length?requestAnimationFrame(loop):(run=0)}
// wish
let out=0;const FL=[...document.querySelectorAll('.fl')],PT=[...document.querySelectorAll('.pt')];
function off(i){if(FL[i].classList.contains('off'))return;FL[i].classList.add('off');PT[i].classList.add('on');vib(20);if(FL.every(f=>f.classList.contains('off')))done()}
FL.forEach((f,i)=>f.onclick=e=>{e.stopPropagation();off(i)});
function done(){if(out)return;out=1;setTimeout(()=>{const b=$('.cake').getBoundingClientRect();burst(b.left+b.width/2,b.top+30,130);$('#wm').classList.add('show');$('#wish').textContent='Your wish is on its way ✨';const w=$('#wi').value.trim();if(w)note('✨ '+w+' ✨',b.left+b.width/2,b.top)},500)}
function blow(){FL.forEach((_,i)=>setTimeout(()=>off(i),i*150))}
$('#wish').onclick=blow;
$('#mic').onclick=async()=>{try{const st=await navigator.mediaDevices.getUserMedia({audio:true}),ac=new AudioContext(),an=ac.createAnalyser(),d=new Uint8Array(an.fftSize);
 ac.createMediaStreamSource(st).connect(an);toast('Blow gently into your mic 🌬️');
 (function t(){an.getByteTimeDomainData(d);let m=0;d.forEach(v=>m=Math.max(m,Math.abs(v-128)));
  if(m>70){blow();st.getTracks().forEach(k=>k.stop());return}if(!out)requestAnimationFrame(t)})()}catch(e){toast('Mic not available — tap Make a Wish instead ♡')}};
// music
const au=$('#au');$('#mus').onclick=()=>{if(au.paused)au.play().then(()=>$('#mus').classList.add('on')).catch(()=>toast('Add music.mp3 to the folder ♪'));else{au.pause();$('#mus').classList.remove('on')}};
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
go(0);

// ===== extra interactions =====
const stage=$('#stage'),vib=n=>navigator.vibrate&&navigator.vibrate(n),rnd=a=>a[Math.random()*a.length|0];
const CMP=['cutie alert 🚨','pretty pretty 🌸','my favorite person','I see you ♡','proud of you!','you matter 🥺','that smile tho 😭','stay soft 🍓','my whole heart','certified cutie 🎀'];
function at(cls,t,x,y,ms=1400){const r=stage.getBoundingClientRect(),e=document.createElement('span');e.className=cls;e.textContent=t;e.style.left=x-r.left+'px';e.style.top=y-r.top+'px';stage.appendChild(e);setTimeout(()=>e.remove(),ms)}
function note(t,x,y){at('wn',t,x,y,6000)}
stage.addEventListener('pointerdown',e=>{if(e.target.closest('#ui,#mus,input,.dg'))return;
 at('pop',rnd(['♥','✨','🎀','🍓','💖','🌸','🫶']),e.clientX,e.clientY);
 const b=e.target.closest('[data-b]');if(b){at('bub',rnd(CMP),e.clientX,e.clientY-30,1800);vib(15);const t=b.querySelector('.tip');t&&t.remove()}});
// draggable stickers
document.querySelectorAll('.dg').forEach(e=>{let sx,sy,ox,oy;e.onpointerdown=v=>{v.stopPropagation();e.setPointerCapture(v.pointerId);sx=v.clientX;sy=v.clientY;ox=e.offsetLeft;oy=e.offsetTop;e.classList.add('hold');vib(10);
 e.onpointermove=m=>{e.style.left=ox+m.clientX-sx+'px';e.style.top=oy+m.clientY-sy+'px'};
 e.onpointerup=()=>{e.classList.remove('hold');e.onpointermove=null;burst(e.getBoundingClientRect().left+20,e.getBoundingClientRect().top+20,12)}}});
// bouncy title
const h1=$('h1');h1.innerHTML=h1.innerHTML.split('<br>').map(w=>[...w].map(l=>`<span>${l}</span>`).join('')).join('<br>');
h1.onclick=e=>{const s=e.target;if(s.tagName=='SPAN'){s.classList.remove('bn');void s.offsetWidth;s.classList.add('bn');vib(10)}};
// love meter
let lv=0;$('#lv').onclick=e=>{lv=Math.min(100,lv+5);$('#lf').style.width=lv+'%';$('#lt').textContent='love meter '+lv+'%';burst(e.clientX,e.clientY,10);vib(15);
 if(lv==100&&!$('#lv').dataset.d){$('#lv').dataset.d=1;burst(innerWidth/2,innerHeight/2,140);toast('100%! (for you it never ends ♾️)')}};
// cards
let oc=0;document.querySelectorAll('.fc').forEach(f=>f.onclick=e=>{if(f.classList.contains('on'))return;f.classList.add('on');oc++;$('#cc').textContent=oc+' / 4 opened';burst(e.clientX,e.clientY,40);vib(20);
 if(oc==4)setTimeout(()=>{burst(innerWidth/2,innerHeight/2,150);toast("all collected!! you're stuck with me now 🥰")},600)});
// catch the hearts
let ct=0;fx.addEventListener('pointerdown',e=>{const h=e.target.closest('.hrt');if(!h)return;e.stopPropagation();h.remove();ct++;burst(e.clientX,e.clientY,14);vib(10);if([5,15,30,50].includes(ct))toast(ct+' hearts caught 💕')});
// finale heart
const LV=['I love you ♡','aku sayang kamu 🥺','saranghae 💕','te quiero 🌹','ti amo ✨','wo ai ni 🧧',"je t'aime 🥐"];let li=0;
$('.heart').onclick=e=>{toast(LV[li++%LV.length]);burst(e.clientX,e.clientY,45);vib([20,30,20])};

// ===== love letter (slide 2) =====
const PG=["*Terima_kasih* sudah lahir ke dunia ini. Sejak hari itu, dunia pelan-pelan jadi lebih *hangat*, dan aku beruntung sekali bisa menemukanmu.",
"Terima kasih sudah *tetap_hidup*, bahkan di hari-hari ketika bertahan terasa begitu berat. Tidak semua orang tahu sekeras apa kamu berjuang.",
"Selama *23_tahun* kamu sudah melakukan yang terbaik, bahkan saat tak ada yang bertepuk tangan. *Aku_melihat_semuanya,* dan aku bangga padamu.",
"Terima kasih sudah jadi *orang_yang_hebat.* Semoga *kemenangan* selalu setia menemani langkahmu, dan hidup memberimu banyak alasan untuk bahagia. ♡"],EM=['🥺','🫶','🥹','🌷'];let pg=0;
function startLetter(){pg=0;showPg()}
function showPg(){$('#tw').innerHTML=PG[pg].split(' ').map((w,i)=>`<span style="animation-delay:${i*.07+.3}s">${w.startsWith('*')?'<mark>'+w.replace(/\*/g,'').replace(/_/g,' ')+'</mark>':w}</span> `).join('');
 $('#tn').textContent=pg<PG.length-1?'ketuk untuk lanjut ›':'kejutan berikutnya ♡'}
function react(){$('#em').textContent=EM[pg];const b=$('.pola').getBoundingClientRect();burst(b.left+b.width/2,b.top+b.height/2,25);vib(15)}
$('#tn').onclick=()=>{if(pg<PG.length-1){pg++;showPg();react()}else go(2)};
$('.paper').onclick=e=>{if(e.target.id!='tn')$('#tn').click()};

// ===== deserve bubbles (slide 3) =====
const WD=[['🌷','softness','You deserve softness: in your days, and in how you talk to yourself.'],['☁️','peace','You deserve peace. Quiet, uncomplicated, all yours.'],['🍓','good things','You deserve good things that stay.'],['🛌','rest','You deserve rest, with zero guilt.'],['🫶','all the love','You deserve a love that never makes you feel alone.'],['🌙','calm nights','You deserve calm nights, and mornings you are not afraid of.']];
let pp=0;WD.forEach((w,i)=>{const b=document.createElement('div');b.className='b';b.style.setProperty('--a',i*60+'deg');b.innerHTML=`<button>${w[0]}<small>${w[1]}</small></button>`;
 b.firstChild.onclick=e=>{if(b.classList.contains('gone'))return;b.classList.add('gone');pp++;$('#rc').textContent=w[2];$('#rn').textContent=pp+' / 6 popped';burst(e.clientX,e.clientY,25);vib(15);
  if(pp==6)setTimeout(()=>{burst(innerWidth/2,innerHeight/2,150);$('.circ').classList.add('done');$('#rc').textContent='Not someday. Right now. ♡';toast('you deserve all of it 🥹')},500)};
 $('.spin').appendChild(b)});

// ===== gift finale (slide 6) =====
const FT="Tetaplah tumbuh. Tetaplah tersenyum. Dan tolong, jangan pernah percaya, bahkan sedetik pun, bahwa kehadiranmu di dunia ini tidak berarti. Kamu berarti, lebih dari yang bisa kuucapkan.";
let gt=0;const G=$('#gift'),HT=['ketuk 3x untuk membuka','sekali lagi... 👀','tinggal sekali lagi! 🥺'];
function resetGift(){gt=0;G.className='gift';G.style.display='';G.style.setProperty('--s',1);$('#gift small').textContent=HT[0];$('#fin').classList.remove('show');$('.final').classList.remove('in');$('#ft').innerHTML=''}
G.onclick=e=>{if(gt>=3)return;gt++;vib(30);G.classList.remove('shk');void G.offsetWidth;G.classList.add('shk');G.style.setProperty('--s',1+gt*.12);burst(e.clientX,e.clientY,15);
 if(gt<3)$('#gift small').textContent=HT[gt];else{G.classList.add('open');burst(innerWidth/2,innerHeight/2,160);setTimeout(()=>{G.style.display='none';reveal()},700)}};
function reveal(){$('#fin').classList.add('show');const ws=FT.split(' ');$('#ft').innerHTML=ws.map((w,i)=>`<span style="animation-delay:${i*.08+.4}s">${w}</span> `).join('');
 setTimeout(()=>{$('.final').classList.add('in');burst(innerWidth/2,innerHeight*.6,140);vib([30,40,30])},ws.length*80+1200)}
