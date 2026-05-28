// ============================================================
// script.js — main page (index.html)
// Requires data.js loaded first (provides projects, i18n, helpers).
// ============================================================

// ---------- Year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Cursor glow ----------
const glow = document.getElementById('cursor-glow');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX, glowY = mouseY;

window.addEventListener('pointermove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;
  if (glow) glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => io.observe(el));

// ---------- Stat counters ----------
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });
statNums.forEach((el) => statObserver.observe(el));

// ---------- Skill card mouse-glow tracking ----------
document.querySelectorAll('.skill-card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// ---------- Render projects (cards link to sub-page) ----------
const grid = document.getElementById('projects-grid');

function renderProjects(lang) {
  if (!grid) return;
  grid.innerHTML = projects.map((p) => `
    <a class="project-card reveal" href="project.html?p=${encodeURIComponent(p.repo)}" style="--lang-color:${langColors[p.language] || '#b46a55'}">
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

// ---------- Language wiring ----------
function applyLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';
  applyI18nAttrs(lang);
  renderProjects(lang);
  saveLang(lang);
}
setupLangSwitcher(applyLanguage);
applyLanguage(getInitialLang());

// ============================================================
// Background simulations (Boids / Game of Life / Particle Life)
// ============================================================
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

function limitVec(vx, vy, max) {
  const m = Math.hypot(vx, vy);
  if (m > max) { const k = max / m; return [vx * k, vy * k]; }
  return [vx, vy];
}

// ============ BOIDS ============
const boidsSim = (() => {
  const NEIGHBOR_RADIUS = 55;
  const SEPARATION_RADIUS = 20;
  const MAX_SPEED = 1.6;
  const MIN_SPEED = 0.9;
  const MAX_FORCE = 0.05;
  const MOUSE_REPEL_RADIUS = 120;
  const MOUSE_REPEL_FORCE = 0.12;

  let boids = [];

  function spawn() {
    const a = Math.random() * Math.PI * 2;
    return { x: Math.random() * W, y: Math.random() * H, vx: Math.cos(a) * MAX_SPEED, vy: Math.sin(a) * MAX_SPEED };
  }

  return {
    label: 'boids', min: 10, max: 400, step: 5, default: 90,
    init(n) { boids = []; for (let i = 0; i < n; i++) boids.push(spawn()); },
    onResize() {},
    setCount(n) {
      if (n > boids.length) { while (boids.length < n) boids.push(spawn()); }
      else if (n < boids.length) { boids.length = n; }
    },
    step() {
      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];
        let sepX = 0, sepY = 0, aliX = 0, aliY = 0, cohX = 0, cohY = 0;
        let nAli = 0, nCoh = 0;

        for (let j = 0; j < boids.length; j++) {
          if (i === j) continue;
          const o = boids[j];
          const dx = b.x - o.x, dy = b.y - o.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > NEIGHBOR_RADIUS * NEIGHBOR_RADIUS) continue;
          const d = Math.sqrt(d2) || 0.0001;
          if (d < SEPARATION_RADIUS) { sepX += dx / d / d; sepY += dy / d / d; }
          aliX += o.vx; aliY += o.vy; nAli++;
          cohX += o.x;  cohY += o.y;  nCoh++;
        }

        let ax = 0, ay = 0;

        if (sepX || sepY) {
          const [sx, sy] = limitVec(sepX, sepY, MAX_SPEED);
          const [fx, fy] = limitVec(sx - b.vx, sy - b.vy, MAX_FORCE);
          ax += fx * 1.8; ay += fy * 1.8;
        }
        if (nAli) {
          aliX /= nAli; aliY /= nAli;
          const [sx, sy] = limitVec(aliX, aliY, MAX_SPEED);
          const [fx, fy] = limitVec(sx - b.vx, sy - b.vy, MAX_FORCE);
          ax += fx; ay += fy;
        }
        if (nCoh) {
          cohX = cohX / nCoh - b.x;
          cohY = cohY / nCoh - b.y;
          const [sx, sy] = limitVec(cohX, cohY, MAX_SPEED);
          const [fx, fy] = limitVec(sx - b.vx, sy - b.vy, MAX_FORCE);
          ax += fx * 0.55; ay += fy * 0.55;
        }

        const mdx = b.x - mouseX, mdy = b.y - mouseY;
        const md = Math.hypot(mdx, mdy);
        if (md < MOUSE_REPEL_RADIUS && md > 0.0001) {
          const k = (1 - md / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_FORCE;
          ax += (mdx / md) * k; ay += (mdy / md) * k;
        }

        b.vx += ax; b.vy += ay;

        const sp = Math.hypot(b.vx, b.vy);
        if (sp > MAX_SPEED) { b.vx = (b.vx / sp) * MAX_SPEED; b.vy = (b.vy / sp) * MAX_SPEED; }
        else if (sp < MIN_SPEED) {
          if (sp < 0.0001) { const a = Math.random() * Math.PI * 2; b.vx = Math.cos(a) * MIN_SPEED; b.vy = Math.sin(a) * MIN_SPEED; }
          else { b.vx = (b.vx / sp) * MIN_SPEED; b.vy = (b.vy / sp) * MIN_SPEED; }
        }

        b.x += b.vx; b.y += b.vy;
        if (b.x < -5) b.x = W + 5; else if (b.x > W + 5) b.x = -5;
        if (b.y < -5) b.y = H + 5; else if (b.y > H + 5) b.y = -5;
      }
    },
    draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(199, 184, 166, 0.6)';
      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];
        const ang = Math.atan2(b.vy, b.vx);
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(ang);
        ctx.beginPath();
        ctx.moveTo(6, 0); ctx.lineTo(-4, 3); ctx.lineTo(-4, -3); ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    },
  };
})();

// ============ GAME OF LIFE ============
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
    label: 'density', min: 5, max: 60, step: 5, default: 22,
    init(d) { density = d / 100; seed(); lastTick = performance.now(); },
    onResize() { seed(); },
    setCount(d) { density = d / 100; seed(); },
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

// ============ PARTICLE LIFE ============
const particlesSim = (() => {
  const COLORS = ['#b46a55', '#c7b8a6', '#d98b73', '#f2efe8'];
  const TYPES = COLORS.length;
  const R_MAX = 80;
  const R_MIN = 14;
  const FRICTION = 0.86;
  const FORCE_SCALE = 0.18;
  const MAX_SPEED = 2.2;
  const MOUSE_REPEL_RADIUS = 100;
  const MOUSE_REPEL_FORCE = 0.5;

  const M = [
    [ 0.55, -0.25, -0.15,  0.20],
    [-0.20,  0.50,  0.30, -0.10],
    [ 0.15, -0.20,  0.55,  0.30],
    [-0.30,  0.15, -0.20,  0.45],
  ];

  let parts = [];

  function spawn() {
    return { x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, t: Math.floor(Math.random() * TYPES) };
  }

  return {
    label: 'particles', min: 30, max: 300, step: 10, default: 160,
    init(n) { parts = []; for (let i = 0; i < n; i++) parts.push(spawn()); },
    onResize() {},
    setCount(n) {
      if (n > parts.length) { while (parts.length < n) parts.push(spawn()); }
      else if (n < parts.length) { parts.length = n; }
    },
    step() {
      const r2 = R_MAX * R_MAX;
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        let ax = 0, ay = 0;
        for (let j = 0; j < parts.length; j++) {
          if (i === j) continue;
          const b = parts[j];
          let dx = b.x - a.x, dy = b.y - a.y;
          if (dx > W * 0.5) dx -= W; else if (dx < -W * 0.5) dx += W;
          if (dy > H * 0.5) dy -= H; else if (dy < -H * 0.5) dy += H;
          const d2 = dx * dx + dy * dy;
          if (d2 > r2 || d2 < 0.0001) continue;
          const d = Math.sqrt(d2);
          let f;
          if (d < R_MIN) {
            f = (d / R_MIN - 1);
          } else {
            const tt = (d - R_MIN) / (R_MAX - R_MIN);
            f = M[a.t][b.t] * (1 - Math.abs(2 * tt - 1));
          }
          ax += (dx / d) * f;
          ay += (dy / d) * f;
        }

        let mdx = a.x - mouseX, mdy = a.y - mouseY;
        const md = Math.hypot(mdx, mdy);
        if (md < MOUSE_REPEL_RADIUS && md > 0.0001) {
          const k = (1 - md / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_FORCE;
          ax += (mdx / md) * k;
          ay += (mdy / md) * k;
        }

        a.vx = (a.vx + ax * FORCE_SCALE) * FRICTION;
        a.vy = (a.vy + ay * FORCE_SCALE) * FRICTION;

        const sp = Math.hypot(a.vx, a.vy);
        if (sp > MAX_SPEED) { a.vx = (a.vx / sp) * MAX_SPEED; a.vy = (a.vy / sp) * MAX_SPEED; }
      }
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0) a.x += W; else if (a.x >= W) a.x -= W;
        if (a.y < 0) a.y += H; else if (a.y >= H) a.y -= H;
      }
    },
    draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = 0.75;
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        ctx.fillStyle = COLORS[a.t];
        ctx.beginPath();
        ctx.arc(a.x, a.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    },
  };
})();

// ---------- Sim registry + switcher ----------
const sims = { boids: boidsSim, life: lifeSim, particles: particlesSim };
const SIM_LABELS = { boids: 'Boids', life: 'Game of Life', particles: 'Particle Life' };
let currentSim = null;
let currentSimName = 'boids';

const simRange = document.getElementById('sim-range');
const simCount = document.getElementById('sim-count');
const simLabel = document.getElementById('sim-label');
const simBtn = document.getElementById('sim-btn');
const simMenu = document.getElementById('sim-menu');
const simCurrent = document.querySelector('.sim-current');

function selectSim(name, paramOverride) {
  if (!sims[name]) name = 'boids';
  currentSimName = name;
  currentSim = sims[name];

  const value = paramOverride != null
    ? Math.max(currentSim.min, Math.min(currentSim.max, paramOverride))
    : currentSim.default;

  if (simRange) {
    simRange.min = String(currentSim.min);
    simRange.max = String(currentSim.max);
    simRange.step = String(currentSim.step);
    simRange.value = String(value);
  }
  if (simCount) simCount.textContent = String(value);
  if (simLabel) simLabel.textContent = currentSim.label;
  if (simCurrent) simCurrent.textContent = SIM_LABELS[name];

  document.querySelectorAll('.sim-menu [data-sim]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.sim === name);
  });

  if (ctx) ctx.clearRect(0, 0, W, H);
  currentSim.init(value);

  try {
    localStorage.setItem('simType', name);
    localStorage.setItem('simParam_' + name, String(value));
  } catch (_) {}
}

if (simBtn && simMenu) {
  const setSimMenuOpen = (open) => {
    simMenu.classList.toggle('open', open);
    simBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  simBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setSimMenuOpen(!simMenu.classList.contains('open'));
  });
  simMenu.querySelectorAll('[data-sim]').forEach((btn) => {
    btn.addEventListener('click', () => {
      let saved = null;
      try { saved = parseInt(localStorage.getItem('simParam_' + btn.dataset.sim), 10); } catch (_) {}
      selectSim(btn.dataset.sim, Number.isFinite(saved) ? saved : null);
      setSimMenuOpen(false);
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.sim-select')) setSimMenuOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setSimMenuOpen(false);
  });
}

if (simRange) {
  simRange.addEventListener('input', () => {
    const n = parseInt(simRange.value, 10);
    if (simCount) simCount.textContent = String(n);
    if (currentSim) currentSim.setCount(n);
    try { localStorage.setItem('simParam_' + currentSimName, String(n)); } catch (_) {}
  });
}

window.addEventListener('resize', () => {
  resize();
  if (currentSim) currentSim.onResize();
});

// ---------- Init sim ----------
let initialSim = 'boids';
try {
  const savedSim = localStorage.getItem('simType');
  if (savedSim && sims[savedSim]) initialSim = savedSim;
} catch (_) {}
let initialParam = null;
try {
  const p = parseInt(localStorage.getItem('simParam_' + initialSim), 10);
  if (Number.isFinite(p)) initialParam = p;
} catch (_) {}
selectSim(initialSim, initialParam);

// ---------- Main loop ----------
function frame(t) {
  if (currentSim && ctx) {
    currentSim.step(t || performance.now());
    currentSim.draw();
  }
  if (!REDUCED) requestAnimationFrame(frame);
}
if (REDUCED) { if (currentSim && ctx) currentSim.draw(); }
else requestAnimationFrame(frame);
