/* ═══ AkimiTech — Homepage-specific behavior ═══ */

/* ═══ SMOOTH SCROLL ═══════════════════════════════════ */
function smooth(id){ document.getElementById(id).scrollIntoView({behavior:'smooth'}); }

/* ═══ TERMINAL ANIMATION ══════════════════════════════ */
const LINES = [
  {h:'<span class="tk-cmt"># AkimiTech · Software Engineering</span>'},
  {h:''},
  {h:'<span class="tk-kw">class</span> <span class="tk-fn">Developer</span>:'},
  {h:'    <span class="tk-kw">def</span> <span class="tk-fn">__init__</span>(self):'},
  {h:'        self.name     = <span class="tk-str">"Akim D. Malith"</span>'},
  {h:'        self.title    = <span class="tk-str">"Software Engineer"</span>'},
  {h:'        self.uni      = <span class="tk-str">"University of Juba"</span>'},
  {h:'        self.year     = <span class="tk-acc">2</span>'},
  {h:'        self.location = <span class="tk-str">"Juba, South Sudan"</span>'},
  {h:'        self.stack    = <span class="tk-acc">[</span><span class="tk-str">"Python"</span>,<span class="tk-str">"C"</span>,<span class="tk-str">"C++"</span>,<span class="tk-str">"JS"</span><span class="tk-acc">]</span>'},
  {h:''},
  {h:'    <span class="tk-kw">def</span> <span class="tk-fn">build</span>(self, your_idea):'},
  {h:'        <span class="tk-kw">return</span> <span class="tk-acc">✓</span> <span class="tk-str">"Quality. On time."</span>'},
];

let li=0, rendered=[], termEl=document.getElementById('termEl');
function tick(){
  if(li>=LINES.length){ termEl.innerHTML=rendered.join('<br>')+'<span class="t-cursor"></span>'; return; }
  rendered.push(LINES[li].h);
  termEl.innerHTML=rendered.join('<br>')+'<span class="t-cursor"></span>';
  li++;
  setTimeout(tick, LINES[li-1].h===''? 60 : 110);
}
setTimeout(tick, 900);

/* ═══ ORB FOLLOW MOUSE ════════════════════════════════ */
const hero = document.getElementById('hero');
const orb  = document.getElementById('orb');
hero.addEventListener('mousemove',(e)=>{
  const r = hero.getBoundingClientRect();
  orb.style.left = (e.clientX - r.left) + 'px';
  orb.style.top  = (e.clientY - r.top)  + 'px';
  orb.style.transform = 'translate(-50%,-50%)';
});

/* ═══ MODAL ═══════════════════════════════════════════ */
function openModal(svc){
  document.getElementById('mService').textContent = svc;
  document.getElementById('oName').value='';
  document.getElementById('oPhone').value='';
  document.getElementById('oDesc').value='';
  document.getElementById('oSuccess').classList.remove('show');
  document.getElementById('modalBg').classList.add('open');
}
function closeModal(){ document.getElementById('modalBg').classList.remove('open'); }
function bgClose(e){ if(e.target===document.getElementById('modalBg')) closeModal(); }

/* ═══ EMAILJS CONFIG ══════════════════════════════════
   1. Create a free account at https://www.emailjs.com
   2. Add an Email Service (e.g. Gmail) -> copy its Service ID
   3. Create TWO email templates (one for contact, one for orders) -> copy their Template IDs
   4. Copy your Public Key from Account > General
   5. Paste all four values below
════════════════════════════════════════════════════════ */
const EMAILJS_PUBLIC_KEY      = '4Cl88cXWfQeC0NeSE';
const EMAILJS_SERVICE_ID      = 'service_37xk509';
const EMAILJS_CONTACT_TEMPLATE = 'template_hd2lvkc';
const EMAILJS_ORDER_TEMPLATE   = 'template_ar8s5tn';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

async function submitOrder(){
  const n=document.getElementById('oName').value.trim();
  const d=document.getElementById('oDesc').value.trim();
  const phone=document.getElementById('oPhone').value.trim();
  const budget=document.getElementById('oBudget').value;
  const timeline=document.getElementById('oTime').value;
  const service=document.getElementById('mService').textContent;
  if(!n||!d){ alert('Please fill in your name and project description.'); return; }

  const btn=document.querySelector('#modalBg .btn-prim');
  const originalText=btn.innerHTML;
  btn.disabled=true; btn.innerHTML='Sending...';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ORDER_TEMPLATE, {
      name: n, phone: phone || 'Not provided', description: d,
      budget, timeline, service
    });
    document.getElementById('oSuccess').textContent = '🎉 Order received! Akim will contact you within 24 hours.';
    document.getElementById('oSuccess').classList.add('show');
    document.getElementById('oName').value='';
    document.getElementById('oPhone').value='';
    document.getElementById('oDesc').value='';
    setTimeout(()=>{ closeModal(); },3200);
  } catch (error) {
    document.getElementById('oSuccess').textContent='⚠️ Could not send right now. Please email akim1dau2@gmail.com directly.';
    document.getElementById('oSuccess').classList.add('show');
  } finally {
    btn.disabled=false; btn.innerHTML=originalText;
  }
}

/* ═══ CONTACT FORM ════════════════════════════════════ */
async function sendMsg(){
  const n=document.getElementById('cName').value.trim();
  const e=document.getElementById('cEmail').value.trim();
  const s=document.getElementById('cService').value;
  const m=document.getElementById('cMsg').value.trim();
  if(!n||!e||!m){ alert('Please fill in all fields.'); return; }

  const btn=document.querySelector('#contact .btn-prim');
  const originalText=btn.innerHTML;
  btn.disabled=true; btn.innerHTML='Sending...';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE, {
      name: n, email: e, service: s, message: m
    });
    document.getElementById('cSuccess').textContent = '✅ Message received! I\'ll get back to you within 24 hours.';
    document.getElementById('cSuccess').classList.add('show');
    document.getElementById('cName').value='';
    document.getElementById('cEmail').value='';
    document.getElementById('cMsg').value='';
  } catch (error) {
    document.getElementById('cSuccess').textContent='⚠️ Could not send right now. Please email akim1dau2@gmail.com directly.';
    document.getElementById('cSuccess').classList.add('show');
  } finally {
    btn.disabled=false; btn.innerHTML=originalText;
  }
}
