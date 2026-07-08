/* ═══ AkimiTech — Shared site behavior (used on every page) ═══ */

/* ═══ THEME ═══════════════════════════════════════════ */
let dark = true;
function toggleTheme(){
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  document.getElementById('themeIcon').textContent = dark ? '🌙' : '☀️';
  document.getElementById('themeLabel').textContent = dark ? 'Dark' : 'Light';
}

/* ═══ MOBILE NAV ══════════════════════════════════════ */
let mOpen = false;
function toggleMobileNav(){
  mOpen = !mOpen;
  document.getElementById('mobileNav').classList.toggle('open', mOpen);
}
function closeMobileNav(){
  mOpen = false;
  document.getElementById('mobileNav').classList.remove('open');
}

/* ═══ REVEAL ON SCROLL ════════════════════════════════ */
const revEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      // animate skill bars inside
      e.target.querySelectorAll('.skill-fill[data-w]').forEach(f=>{
        setTimeout(()=>{ f.style.width = f.getAttribute('data-w')+'%'; },200);
      });
    }
  });
},{threshold:0.12});
revEls.forEach(el=>ro.observe(el));

/* Auto-trigger hero reveals */
setTimeout(()=>{
  document.querySelectorAll('#hero .reveal').forEach(el=>el.classList.add('in'));
},100);

/* ═══ NAV SCROLL SHADOW ═══════════════════════════════ */
window.addEventListener('scroll',()=>{
  document.getElementById('nav').style.boxShadow =
    window.scrollY > 30 ? '0 4px 24px rgba(0,0,0,0.2)' : 'none';
});
