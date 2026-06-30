// main page script — needs data.js loaded first

// set stat numbers directly
document.querySelectorAll('.stat-num').forEach((el) => {
  el.textContent = el.dataset.target || '0';
});

// render project cards
const grid = document.getElementById('projects-grid');

function renderProjects(lang) {
  if (!grid) return;
  grid.innerHTML = projects.map((p) => `
    <a class="project-card reveal" href="https://github.com/Sodoo95/${p.repo}" target="_blank" rel="noopener" style="--lang-color:${langColors[p.language] || '#b46a55'}">
      <div class="project-thumb">
        <img src="${gifUrl(p)}" alt="${p.name} preview" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.style.display='none'" />
      </div>
      <div class="project-head">
        <h3 class="project-title">${p.name}</h3>
        <span class="project-icon">↗</span>
      </div>
      <p class="project-desc">${p.desc[lang] || p.desc.en}</p>
      <div class="project-tags">
        ${p.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
      <div class="project-meta">
        <span class="lang">${p.language}</span>
        <span>★ ${p.stars}${p.featured ? ' · featured' : ''}</span>
      </div>
    </a>
  `).join('');

  document.querySelectorAll('.project-card.reveal').forEach((el) => el.classList.add('is-visible'));

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });
}

renderProjects('en');

// background canvas — game of life
const canvas = document.getElementById('bg-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let W = 0, H = 0;

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}
resize();

const lifeSim = (() => {
  const CELL = 10;
  const TICK_MS = 110;
  let cw = 0, ch = 0;
  let cells = null, next = null;
  let density = 0.22;
  let lastTick = 0;

  function seed() {
    cw = Math.ceil(W / CELL);
    ch = Math.ceil(H / CELL);
    cells = new Uint8Array(cw * ch);
    next = new Uint8Array(cw * ch);
    for (let i = 0; i < cells.length; i++) cells[i] = Math.random() < density ? 1 : 0;
  }

  function tick() {
    for (let y = 0; y < ch; y++) {
      const ym1 = (y - 1 + ch) % ch;
      const yp1 = (y + 1) % ch;
      for (let x = 0; x < cw; x++) {
        const xm1 = (x - 1 + cw) % cw;
        const xp1 = (x + 1) % cw;
        const n = cells[ym1 * cw + xm1] + cells[ym1 * cw + x] + cells[ym1 * cw + xp1]
                + cells[y   * cw + xm1] +                           cells[y   * cw + xp1]
                + cells[yp1 * cw + xm1] + cells[yp1 * cw + x] + cells[yp1 * cw + xp1];
        const alive = cells[y * cw + x];
        next[y * cw + x] = (alive ? (n === 2 || n === 3) : (n === 3)) ? 1 : 0;
      }
    }
    const tmp = cells; cells = next; next = tmp;
  }

  return {
    init() { density = 0.22; seed(); lastTick = performance.now(); },
    onResize() { seed(); },
    step(t) {
      if (REDUCED) return;
      if (t - lastTick < TICK_MS) return;
      lastTick = t;
      tick();
    },
    draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(180, 106, 85, 0.6)';
      const pad = 1;
      const s = CELL - pad * 2;
      for (let y = 0; y < ch; y++) {
        for (let x = 0; x < cw; x++) {
          if (cells[y * cw + x]) ctx.fillRect(x * CELL + pad, y * CELL + pad, s, s);
        }
      }
    },
  };
})();

lifeSim.init();

window.addEventListener('resize', () => {
  resize();
  lifeSim.onResize();
});

function frame(t) {
  if (ctx) {
    lifeSim.step(t || performance.now());
    lifeSim.draw();
  }
  if (!REDUCED) requestAnimationFrame(frame);
}
if (REDUCED) { if (ctx) lifeSim.draw(); }
else requestAnimationFrame(frame);
