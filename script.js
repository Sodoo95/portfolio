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
  glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
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
document.querySelectorAll('.skill-card, .project-card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// ---------- Project data ----------
const langColors = {
  'C++':  '#f34b7d',
  'Cuda': '#3a4e3a',
  'C':    '#555555',
  'JavaScript': '#f1e05a',
  'Python': '#3572A5',
};

const projects = [
  {
    name: '3D Boids Simulation',
    repo: '3D-Boids-Simulation-Cuda-OpenGL-Raylib',
    gif: 'BOID3D.gif',
    desc: 'GPU-accelerated 3D flocking simulation. Boids swarm logic ported to CUDA, rendered in real-time with OpenGL and Raylib.',
    language: 'Cuda',
    tags: ['CUDA', 'OpenGL', 'Raylib', 'Simulation'],
    stars: 1,
    featured: true,
  },
  {
    name: 'Fishpond Simulation',
    repo: 'Fishpond-Simulation',
    gif: 'BoidSim.gif',
    desc: 'Pushed ECS architecture to the limit — fish, food chains, and emergent behaviors in a virtual pond.',
    language: 'C++',
    tags: ['ECS', 'Simulation', 'C++'],
    stars: 0,
  },
  {
    name: 'SFML Boid',
    repo: 'SFML_Boid',
    gif: 'SFML_Boid1.gif',
    desc: '2D boids built on SFML — first real dive into Entity Component System architecture.',
    language: 'C++',
    tags: ['SFML', 'ECS', 'Boids'],
    stars: 0,
  },
  {
    name: 'WinAPI Puzzle',
    repo: 'WINAPI_Puzzle',
    gif: 'Puzzle.gif',
    desc: 'Sliding tile puzzle game written from scratch using the Win32 API. School assignment turned passion project.',
    language: 'C++',
    tags: ['WinAPI', 'Game', 'C++'],
    stars: 0,
  },
  {
    name: 'Minesweeper',
    repo: 'Minesweeper',
    gif: 'Minesweeper.gif',
    desc: 'Classic Minesweeper rebuilt with custom pixel art and a hand-rolled game loop.',
    language: 'C++',
    tags: ['Game', 'WinAPI', 'Pixel Art'],
    stars: 0,
  },
  {
    name: 'Analog Clock',
    repo: 'Analog-Clock',
    gif: 'AnalogClock.gif',
    desc: 'A working analog clock rendered with WinAPI — a small exercise in trig, timers, and double-buffered drawing.',
    language: 'C++',
    tags: ['WinAPI', 'Graphics'],
    stars: 0,
  },
  {
    name: 'Star Collector',
    repo: 'Console-Game-Star-Collector',
    gif: 'ConsoleGame.gif',
    desc: 'A console-based star-collecting mini-game made while learning STL and C++ fundamentals.',
    language: 'C++',
    tags: ['Console', 'STL', 'Game'],
    stars: 0,
  },
];

const gifUrl = (p) => `https://raw.githubusercontent.com/Sodoo95/${p.repo}/HEAD/${encodeURIComponent(p.gif)}`;

// ---------- Render projects ----------
const grid = document.getElementById('projects-grid');
grid.innerHTML = projects.map((p) => `
  <a class="project-card reveal" href="https://github.com/Sodoo95/${p.repo}" target="_blank" rel="noopener" style="--lang-color:${langColors[p.language] || '#3b82f6'}">
    <div class="project-thumb">
      <img src="${gifUrl(p)}" alt="${p.name} preview" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.style.display='none'" />
    </div>
    <div class="project-head">
      <h3 class="project-title">${p.name}</h3>
      <span class="project-icon">↗</span>
    </div>
    <p class="project-desc">${p.desc}</p>
    <div class="project-tags">
      ${p.tags.map((t) => `<span class="project-tag">${t}</span>`).join('')}
    </div>
    <div class="project-meta">
      <span class="lang">${p.language}</span>
      <span>★ ${p.stars}${p.featured ? ' · featured' : ''}</span>
    </div>
  </a>
`).join('');

// Re-observe the newly added cards for the reveal animation
document.querySelectorAll('.project-card.reveal').forEach((el) => io.observe(el));

// Attach mouse-glow tracking to project cards
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// ---------- Animated particle background ----------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let w = 0, h = 0;
const COUNT = 60;
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize() {
  w = canvas.width = window.innerWidth * window.devicePixelRatio;
  h = canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
window.addEventListener('resize', resize);
resize();

function initParticles() {
  particles = [];
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.4,
    });
  }
}
initParticles();

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // particles + connections
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(147, 197, 253, 0.45)';
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.18 * (1 - dist / 140)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  if (!REDUCED) requestAnimationFrame(draw);
}
if (!REDUCED) draw();
else {
  // single static frame for reduced-motion users
  draw();
}
