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

// ---------- Background simulations ----------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let W = 0, H = 0;

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
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
    onResize() { /* boids wrap, no reseed needed */ },
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
      ctx.fillStyle = 'rgba(147, 197, 253, 0.55)';
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
      ctx.fillStyle = 'rgba(96, 165, 250, 0.55)';
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
  const COLORS = ['#60a5fa', '#a5b4fc', '#93c5fd', '#38bdf8'];
  const TYPES = COLORS.length;
  const R_MAX = 80;
  const R_MIN = 14;
  const FRICTION = 0.86;
  const FORCE_SCALE = 0.18;
  const MAX_SPEED = 2.2;
  const MOUSE_REPEL_RADIUS = 100;
  const MOUSE_REPEL_FORCE = 0.5;

  // 4x4 attraction matrix, values in roughly [-1, 1]
  const M = [
    [ 0.55, -0.25, -0.15,  0.20],
    [-0.20,  0.50,  0.30, -0.10],
    [ 0.15, -0.20,  0.55,  0.30],
    [-0.30,  0.15, -0.20,  0.45],
  ];

  let parts = [];

  function spawn() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: 0, vy: 0,
      t: Math.floor(Math.random() * TYPES),
    };
  }

  return {
    label: 'particles', min: 30, max: 300, step: 10, default: 160,
    init(n) { parts = []; for (let i = 0; i < n; i++) parts.push(spawn()); },
    onResize() { /* particles stay in place; wrap will sort it out */ },
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
          // wrap-aware delta (toroidal)
          if (dx > W * 0.5) dx -= W; else if (dx < -W * 0.5) dx += W;
          if (dy > H * 0.5) dy -= H; else if (dy < -H * 0.5) dy += H;
          const d2 = dx * dx + dy * dy;
          if (d2 > r2 || d2 < 0.0001) continue;
          const d = Math.sqrt(d2);
          let f;
          if (d < R_MIN) {
            // hard repulsion when too close
            f = (d / R_MIN - 1);
          } else {
            // tent-shaped attraction peaking midway
            const t = (d - R_MIN) / (R_MAX - R_MIN);
            f = M[a.t][b.t] * (1 - Math.abs(2 * t - 1));
          }
          ax += (dx / d) * f;
          ay += (dy / d) * f;
        }

        // mouse repulsion
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

  simRange.min = String(currentSim.min);
  simRange.max = String(currentSim.max);
  simRange.step = String(currentSim.step);
  simRange.value = String(value);
  simCount.textContent = String(value);
  simLabel.textContent = currentSim.label;
  simCurrent.textContent = SIM_LABELS[name];

  document.querySelectorAll('.sim-menu [data-sim]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.sim === name);
  });

  ctx.clearRect(0, 0, W, H);
  currentSim.init(value);

  try {
    localStorage.setItem('simType', name);
    localStorage.setItem('simParam_' + name, String(value));
  } catch (_) {}
}

function setSimMenuOpen(open) {
  simMenu.classList.toggle('open', open);
  simBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

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

simRange.addEventListener('input', () => {
  const n = parseInt(simRange.value, 10);
  simCount.textContent = String(n);
  if (currentSim) currentSim.setCount(n);
  try { localStorage.setItem('simParam_' + currentSimName, String(n)); } catch (_) {}
});

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
  if (currentSim) {
    currentSim.step(t || performance.now());
    currentSim.draw();
  }
  if (!REDUCED) requestAnimationFrame(frame);
}
if (REDUCED) { if (currentSim) currentSim.draw(); }
else requestAnimationFrame(frame);
