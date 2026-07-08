/* ═══ AkimiTech — News page-specific behavior ═══════════
   To add a new post: copy one object below and edit it.
   category must be one of: announcement | milestone | update
   Newest posts should go at the TOP of the array.
════════════════════════════════════════════════════════ */
const NEWS_POSTS = [
  {
    category: 'announcement',
    tag: 'Announcement',
    date: 'JUL 06, 2026',
    title: 'AkimiTech Services Goes Live',
    desc: 'Our official website is now live, showcasing our full range of services — from web development to system programming — built from Juba, South Sudan.'
  },
  {
    category: 'update',
    tag: 'Update',
    date: 'JUL 06, 2026',
    title: 'Now Accepting New Projects',
    desc: 'AkimiTech is currently open for new client engagements across web, desktop, automation, and consulting work.'
  }
];

/* ═══ RENDER NEWS ═════════════════════════════════════ */
const newsGrid = document.getElementById('newsGrid');

function renderNews(filter){
  const posts = filter === 'all'
    ? NEWS_POSTS
    : NEWS_POSTS.filter(p => p.category === filter);

  if(posts.length === 0){
    newsGrid.innerHTML = '<div class="news-empty">No posts in this category yet.</div>';
    return;
  }

  newsGrid.innerHTML = posts.map(p => `
    <article class="ncard">
      <div class="ncard-source">${p.tag}</div>
      <div class="ncard-title">${p.title}</div>
      <div class="ncard-desc">${p.desc}</div>
      <div class="ncard-foot"><span>${p.date}</span></div>
    </article>
  `).join('');
}

/* ═══ TABS ════════════════════════════════════════════ */
document.getElementById('newsTabs').addEventListener('click', (e) => {
  const tab = e.target.closest('.ntab');
  if(!tab) return;
  document.querySelectorAll('.ntab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  renderNews(tab.dataset.cat);
});

renderNews('all');
