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
document.querySelectorAll('.skill-card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// ---------- i18n ----------
const SUPPORTED_LANGS = ['en', 'ja', 'mn', 'ko', 'zh'];
const LANG_CODES = { en: 'EN', ja: 'JA', mn: 'MN', ko: 'KO', zh: 'ZH' };

const i18n = {
  en: {
    'nav.about': 'about',
    'nav.skills': 'skills',
    'nav.projects': 'projects',
    'nav.contact': 'contact',
    'hero.bio': 'Building simulations, games, and graphics experiments in C++, CUDA, and OpenGL — chasing the line between math, performance, and pixels.',
    'hero.chip.location': 'Tokyo, JP',
    'hero.chip.available': 'Available for collaboration',
    'hero.cta.projects': 'View Projects',
    'scroll.hint': 'scroll',
    'about.title': 'about',
    'about.p1': "I'm <strong>Sodo-Hikaru</strong> — a developer from Tokyo who likes to take ideas to their limit and see what happens. Most of my work lives at the intersection of graphics, simulation, and systems programming.",
    'about.p2': "Lately I've been pushing ECS architectures, parallel computing with CUDA, and writing my own little games to learn the fundamentals from the ground up.",
    'about.quote': '"Trying to be better everyday."',
    'stat.projects': 'projects',
    'stat.years': 'years coding',
    'skills.title': 'skills',
    'skills.languages': 'Languages',
    'skills.graphics': 'Graphics & Game',
    'skills.concepts': 'Concepts',
    'skills.tools': 'Tools',
    'skills.ecs': 'ECS Architecture',
    'skills.parallel': 'Parallel Computing',
    'skills.simulations': 'Simulations',
    'skills.gameloop': 'Game Loop / Math',
    'projects.title': 'projects',
    'contact.title': 'contact',
    'contact.heading': "Let's build something <span class='gradient'>interesting</span>.",
    'contact.sub': 'Open to collaboration, freelance, and weird side projects.',
    'footer.built': 'Built with vanilla HTML / CSS / JS',
  },
  ja: {
    'nav.about': '私について',
    'nav.skills': 'スキル',
    'nav.projects': 'プロジェクト',
    'nav.contact': 'コンタクト',
    'hero.bio': 'C++、CUDA、OpenGLでシミュレーション、ゲーム、グラフィックス実験を制作。数学・パフォーマンス・ピクセルの境界を探求しています。',
    'hero.chip.location': '東京, 日本',
    'hero.chip.available': 'コラボレーション歓迎',
    'hero.cta.projects': 'プロジェクトを見る',
    'scroll.hint': 'スクロール',
    'about.title': '私について',
    'about.p1': '私は<strong>Sodo-Hikaru</strong>、東京を拠点とする開発者です。アイデアを限界まで突き詰めて何が起こるかを試すのが好き。グラフィックス、シミュレーション、システムプログラミングの交差点で仕事をしています。',
    'about.p2': '最近はECSアーキテクチャ、CUDAによる並列計算、基礎を一から学ぶための自作ゲームに取り組んでいます。',
    'about.quote': '「毎日もっと良くなろうとしている。」',
    'stat.projects': 'プロジェクト',
    'stat.years': 'コーディング歴',
    'skills.title': 'スキル',
    'skills.languages': '言語',
    'skills.graphics': 'グラフィックス & ゲーム',
    'skills.concepts': 'コンセプト',
    'skills.tools': 'ツール',
    'skills.ecs': 'ECSアーキテクチャ',
    'skills.parallel': '並列計算',
    'skills.simulations': 'シミュレーション',
    'skills.gameloop': 'ゲームループ / 数学',
    'projects.title': 'プロジェクト',
    'contact.title': 'コンタクト',
    'contact.heading': "<span class='gradient'>面白い</span>ものを一緒に作りましょう。",
    'contact.sub': 'コラボ、フリーランス、変わったサイドプロジェクト、お気軽にどうぞ。',
    'footer.built': 'Vanilla HTML / CSS / JS で構築',
  },
  mn: {
    'nav.about': 'Миний тухай',
    'nav.skills': 'Ур чадвар',
    'nav.projects': 'Төслүүд',
    'nav.contact': 'Холбоо барих',
    'hero.bio': 'C++, CUDA, OpenGL ашиглан симуляц, тоглоом, график туршилт хийдэг — математик, гүйцэтгэл, пикселийн зааг хязгаарыг эрэлхийлж байна.',
    'hero.chip.location': 'Токио, Япон',
    'hero.chip.available': 'Хамтран ажиллахад нээлттэй',
    'hero.cta.projects': 'Төслүүдийг үзэх',
    'scroll.hint': 'гүйлгэх',
    'about.title': 'Миний тухай',
    'about.p1': 'Намайг <strong>Sodo-Hikaru</strong> гэдэг — Токиод суурьшсан хөгжүүлэгч. Санааг хязгаарт нь хүртэл туршиж үзэх дуртай. Голчлон график, симуляц, системийн програмчлалын уулзвар дээр ажилладаг.',
    'about.p2': 'Сүүлийн үед ECS архитектур, CUDA-аар параллель тооцоолол, мөн үндсэн мэдлэгээ бэхжүүлэхийн тулд жижиг тоглоомууд бичиж байна.',
    'about.quote': '«Өдөр бүр илүү сайн болохыг хичээж байна.»',
    'stat.projects': 'төсөл',
    'stat.years': 'програмчлалын жил',
    'skills.title': 'Ур чадвар',
    'skills.languages': 'Хэл',
    'skills.graphics': 'График & Тоглоом',
    'skills.concepts': 'Үзэл баримтлал',
    'skills.tools': 'Хэрэгсэл',
    'skills.ecs': 'ECS Архитектур',
    'skills.parallel': 'Параллель тооцоолол',
    'skills.simulations': 'Симуляц',
    'skills.gameloop': 'Тоглоомын цикл / Математик',
    'projects.title': 'Төслүүд',
    'contact.title': 'Холбоо барих',
    'contact.heading': "<span class='gradient'>Сонирхолтой</span> зүйл хамтдаа бүтээе.",
    'contact.sub': 'Хамтын ажиллагаа, фрилэнс, ер бусын төслүүдэд нээлттэй.',
    'footer.built': 'Vanilla HTML / CSS / JS-ээр бүтээгдсэн',
  },
  ko: {
    'nav.about': '소개',
    'nav.skills': '기술',
    'nav.projects': '프로젝트',
    'nav.contact': '연락처',
    'hero.bio': 'C++, CUDA, OpenGL로 시뮬레이션, 게임, 그래픽 실험을 만들며 수학·성능·픽셀 사이의 경계를 탐구합니다.',
    'hero.chip.location': '도쿄, 일본',
    'hero.chip.available': '협업 가능',
    'hero.cta.projects': '프로젝트 보기',
    'scroll.hint': '스크롤',
    'about.title': '소개',
    'about.p1': '저는 <strong>Sodo-Hikaru</strong>입니다 — 도쿄를 기반으로 활동하는 개발자입니다. 아이디어를 한계까지 밀어붙여 무엇이 가능한지 보는 것을 좋아합니다. 주로 그래픽, 시뮬레이션, 시스템 프로그래밍이 교차하는 지점에서 작업합니다.',
    'about.p2': '최근에는 ECS 아키텍처, CUDA를 활용한 병렬 컴퓨팅, 그리고 기초를 바닥부터 익히기 위한 작은 게임 제작에 집중하고 있습니다.',
    'about.quote': '"매일 더 나아지려 노력합니다."',
    'stat.projects': '프로젝트',
    'stat.years': '코딩 경력',
    'skills.title': '기술',
    'skills.languages': '언어',
    'skills.graphics': '그래픽 & 게임',
    'skills.concepts': '개념',
    'skills.tools': '도구',
    'skills.ecs': 'ECS 아키텍처',
    'skills.parallel': '병렬 컴퓨팅',
    'skills.simulations': '시뮬레이션',
    'skills.gameloop': '게임 루프 / 수학',
    'projects.title': '프로젝트',
    'contact.title': '연락처',
    'contact.heading': "<span class='gradient'>흥미로운</span> 것을 함께 만들어요.",
    'contact.sub': '협업, 프리랜스, 별난 사이드 프로젝트 모두 환영합니다.',
    'footer.built': 'Vanilla HTML / CSS / JS로 제작',
  },
  zh: {
    'nav.about': '关于',
    'nav.skills': '技能',
    'nav.projects': '项目',
    'nav.contact': '联系',
    'hero.bio': '用 C++、CUDA 和 OpenGL 构建仿真、游戏和图形实验——在数学、性能和像素之间寻找平衡。',
    'hero.chip.location': '东京, 日本',
    'hero.chip.available': '欢迎合作',
    'hero.cta.projects': '查看项目',
    'scroll.hint': '滚动',
    'about.title': '关于',
    'about.p1': '我是 <strong>Sodo-Hikaru</strong>——一名居住在东京的开发者。我喜欢把想法推到极限，看看会发生什么。我的工作大多处于图形、仿真和系统编程的交叉地带。',
    'about.p2': '最近在深入 ECS 架构、CUDA 并行计算，以及通过自己写小游戏来从底层掌握基础。',
    'about.quote': '"每天努力变得更好。"',
    'stat.projects': '项目',
    'stat.years': '编程年限',
    'skills.title': '技能',
    'skills.languages': '编程语言',
    'skills.graphics': '图形 & 游戏',
    'skills.concepts': '概念',
    'skills.tools': '工具',
    'skills.ecs': 'ECS 架构',
    'skills.parallel': '并行计算',
    'skills.simulations': '仿真',
    'skills.gameloop': '游戏循环 / 数学',
    'projects.title': '项目',
    'contact.title': '联系',
    'contact.heading': "一起做些<span class='gradient'>有趣</span>的东西吧。",
    'contact.sub': '欢迎合作、自由职业，以及奇怪的副业项目。',
    'footer.built': '由纯 HTML / CSS / JS 构建',
  },
};

const t = (key, lang) => (i18n[lang] && i18n[lang][key]) || i18n.en[key] || key;

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
    language: 'Cuda',
    tags: ['CUDA', 'OpenGL', 'Raylib', 'Simulation'],
    stars: 1,
    featured: true,
    desc: {
      en: 'GPU-accelerated 3D flocking simulation. Boids swarm logic ported to CUDA, rendered in real-time with OpenGL and Raylib.',
      ja: 'GPUアクセラレーションによる3Dフロッキングシミュレーション。CUDAに移植したボイドロジックを、OpenGLとRaylibでリアルタイム描画。',
      mn: 'GPU хурдасгагч ашигласан 3D хийгээр нисэх симуляц. Boids алгоритмыг CUDA дээр шилжүүлж, OpenGL ба Raylib-ээр бодит цаг үед дүрсэлсэн.',
      ko: 'GPU 가속 3D 플로킹 시뮬레이션. Boids 무리 로직을 CUDA로 포팅하고 OpenGL과 Raylib로 실시간 렌더링.',
      zh: 'GPU 加速的 3D 群体仿真。将 Boids 群体逻辑移植到 CUDA，通过 OpenGL 和 Raylib 实时渲染。',
    },
  },
  {
    name: '2D Boids Simulation Plus',
    repo: '2D-Boids-Simulation-Plus',
    gif: 'BoidSim.gif',
    language: 'C++',
    tags: ['ECS', 'Simulation', 'Boids'],
    stars: 0,
    desc: {
      en: 'Pushed my ECS knowledge further — larger flocks, richer interactions, and tighter performance on top of the original 2D boids.',
      ja: 'ECSの知識をさらに深化。より大きな群れ、豊かな相互作用、元の2Dボイドを上回るパフォーマンス改善。',
      mn: 'ECS-ийн мэдлэгээ улам гүнзгийрүүлсэн — томоохон сүрэг, илүү баялаг харилцан үйлдэл, шинэчилсэн гүйцэтгэл.',
      ko: 'ECS 지식을 더 깊이 — 더 큰 무리, 풍부한 상호작용, 향상된 성능을 갖춘 2D 보이드의 진화판.',
      zh: '进一步推进 ECS 知识——更大的群体、更丰富的交互、更高的性能，对原版 2D Boids 的升级。',
    },
  },
  {
    name: '2D Boids Simulation',
    repo: '2D-Boids-Simulation',
    gif: 'SFML_Boid1.gif',
    language: 'C++',
    tags: ['SFML', 'ECS', 'Boids'],
    stars: 0,
    desc: {
      en: '2D boids built with SFML — first real dive into Entity Component System architecture.',
      ja: 'SFMLで構築した2Dボイド。ECS（Entity Component System）アーキテクチャへの本格的な最初の挑戦。',
      mn: 'SFML дээр бүтээсэн 2D boids — Entity Component System архитектурт хийсэн анхны жинхэнэ туршилт.',
      ko: 'SFML로 만든 2D 보이드 — Entity Component System 아키텍처에 본격적으로 도전한 첫 작품.',
      zh: '用 SFML 构建的 2D Boids——首次真正深入 Entity Component System 架构。',
    },
  },
  {
    name: 'WinAPI Puzzle',
    repo: 'WINAPI_Puzzle',
    gif: 'Puzzle.gif',
    language: 'C++',
    tags: ['WinAPI', 'Game', 'C++'],
    stars: 0,
    desc: {
      en: 'Sliding tile puzzle game written from scratch using the Win32 API. School assignment turned passion project.',
      ja: 'Win32 APIをゼロから使って作ったスライドパズルゲーム。学校の課題から熱中したプロジェクトへ。',
      mn: 'Win32 API ашиглан эхнээс нь бичсэн гулсдаг хайрцагтай оньсого тоглоом. Сургуулийн даалгавраас сэтгэлийн төсөл болсон.',
      ko: 'Win32 API로 처음부터 만든 슬라이딩 타일 퍼즐 게임. 학교 과제로 시작해 애착이 가는 프로젝트가 되었습니다.',
      zh: '使用 Win32 API 从零开始编写的滑块拼图游戏。从学校作业变成了热爱的项目。',
    },
  },
  {
    name: 'Minesweeper',
    repo: 'Minesweeper',
    gif: 'Minesweeper.gif',
    language: 'C++',
    tags: ['Game', 'WinAPI', 'Pixel Art'],
    stars: 0,
    desc: {
      en: 'Classic Minesweeper rebuilt with custom pixel art and a hand-rolled game loop.',
      ja: 'カスタムピクセルアートと自作ゲームループで再構築したクラシックなマインスイーパ。',
      mn: 'Өөрийн pixel art болон гараар бичсэн тоглоомын циклтэй сонгодог Minesweeper-ийн шинэ хувилбар.',
      ko: '커스텀 픽셀 아트와 직접 만든 게임 루프로 재구축한 클래식 지뢰찾기.',
      zh: '用自定义像素艺术和手写游戏循环重制的经典扫雷。',
    },
  },
  {
    name: 'Analog Clock',
    repo: 'Analog-Clock',
    gif: 'AnalogClock.gif',
    language: 'C++',
    tags: ['WinAPI', 'Graphics'],
    stars: 0,
    desc: {
      en: 'A working analog clock rendered with WinAPI — a small exercise in trig, timers, and double-buffered drawing.',
      ja: 'WinAPIで描画した動くアナログ時計。三角関数、タイマー、ダブルバッファ描画の小さな練習。',
      mn: 'WinAPI-аар дүрсэлсэн ажиллагаатай аналог цаг — тригонометр, таймер, double-buffer зурлагын жижиг дасгал.',
      ko: 'WinAPI로 그린 작동하는 아날로그 시계 — 삼각함수, 타이머, 더블 버퍼링 그리기의 작은 연습.',
      zh: '用 WinAPI 渲染的可运行模拟时钟——三角函数、定时器、双缓冲绘图的小练习。',
    },
  },
  {
    name: 'Star Collector',
    repo: 'Console-Game-Star-Collector',
    gif: 'ConsoleGame.gif',
    language: 'C++',
    tags: ['Console', 'STL', 'Game'],
    stars: 0,
    desc: {
      en: 'A console-based star-collecting mini-game made while learning STL and C++ fundamentals.',
      ja: 'STLとC++の基礎を学びながら作ったコンソールベースのスター集めミニゲーム。',
      mn: 'STL болон C++-ийн үндсийг сурах явцад бүтээсэн консол дээр ажилладаг од цуглуулах мини тоглоом.',
      ko: 'STL과 C++ 기초를 공부하며 만든 콘솔 기반 별 모으기 미니 게임.',
      zh: '在学习 STL 和 C++ 基础时制作的基于控制台的星星收集小游戏。',
    },
  },
];

const gifUrl = (p) => `https://raw.githubusercontent.com/Sodoo95/${p.repo}/HEAD/${encodeURIComponent(p.gif)}`;

// ---------- Render projects ----------
const grid = document.getElementById('projects-grid');

function renderProjects(lang) {
  grid.innerHTML = projects.map((p) => `
    <a class="project-card reveal" href="https://github.com/Sodoo95/${p.repo}" target="_blank" rel="noopener" style="--lang-color:${langColors[p.language] || '#3b82f6'}">
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

  document.querySelectorAll('.project-card.reveal').forEach((el) => {
    el.classList.add('is-visible');
  });

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

// ---------- Apply language ----------
function applyLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n, lang);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml, lang);
  });

  document.querySelector('.lang-current').textContent = LANG_CODES[lang];
  document.querySelectorAll('.lang-menu [data-lang]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  renderProjects(lang);

  try { localStorage.setItem('lang', lang); } catch (_) {}
}

// ---------- Language switcher UI ----------
const langBtn = document.getElementById('lang-btn');
const langMenu = document.getElementById('lang-menu');

function setMenuOpen(open) {
  langMenu.classList.toggle('open', open);
  langBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  setMenuOpen(!langMenu.classList.contains('open'));
});

langMenu.querySelectorAll('[data-lang]').forEach((btn) => {
  btn.addEventListener('click', () => {
    applyLanguage(btn.dataset.lang);
    setMenuOpen(false);
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.lang-switch')) setMenuOpen(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenuOpen(false);
});

// ---------- Init language ----------
let initialLang = 'en';
try {
  const saved = localStorage.getItem('lang');
  if (saved && SUPPORTED_LANGS.includes(saved)) initialLang = saved;
  else {
    const nav = (navigator.language || 'en').toLowerCase();
    if (nav.startsWith('ja')) initialLang = 'ja';
    else if (nav.startsWith('mn')) initialLang = 'mn';
    else if (nav.startsWith('ko')) initialLang = 'ko';
    else if (nav.startsWith('zh')) initialLang = 'zh';
  }
} catch (_) {}
applyLanguage(initialLang);

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
else draw();
