const SUPPORTED_LANGS = ['en'];
const LANG_CODES = { en: 'EN' };

const i18n = {
  en: {
    'nav.about': 'about',
    'nav.skills': 'skills',
    'nav.projects': 'projects',
    'nav.contact': 'contact',
    'hero.bio': "i make simulations, little games, and graphics experiments — mostly in C++. usually with too many particles or not enough memory.",
    'hero.chip.location': 'Tokyo, JP',
    'hero.chip.available': 'open to projects',
    'hero.cta.projects': 'my projects',
    'scroll.hint': 'scroll',
    'about.title': 'about me',
    'about.p1': "i'm <strong>Sodo-Hikaru</strong>. i write C++ and i'm fairly confident i know what i'm doing. the compiler has a different opinion most days.",
    'about.p2': "picked up ECS last year and now i put components on everything. also doing CUDA — mostly by misreading the docs and hoping the GPU figures it out.",
    'about.quote': '"Trying to be better everyday."',
    'about.currently': 'currently: convincing myself the segfault is someone else\'s fault',
    'stat.projects': 'projects',
    'stat.years': 'years coding',
    'skills.title': 'what i know',
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
    'contact.heading': 'say hi.',
    'contact.sub': 'open to collabs, freelance, or just chatting about simulations.',
    'footer.built': 'made with html / css / js',
    'project.back': 'back to portfolio',
    'project.repo': 'view on GitHub',
    'project.overview': 'overview',
    'project.tech': 'tech stack',
    'project.structure': 'project structure',
    'project.architecture': 'architecture',
    'project.notFound': 'project not found.',
    'project.notFoundSub': "that project doesn't exist or got renamed.",
  },
};

const t = (key, lang) => (i18n[lang] && i18n[lang][key]) || i18n.en[key] || key;

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
      ja: 'GPUアクセラレーションによる3Dフロッキングシミュレーション。CUDAに移植したボイドロジックをOpenGLとRaylibでリアルタイム描画。',
      mn: 'GPU хурдасгагч ашигласан 3D хийгээр нисэх симуляц. Boids алгоритмыг CUDA дээр шилжүүлж, OpenGL ба Raylib-ээр бодит цаг үед дүрсэлсэн.',
    },
    overview: {
      en: 'This project takes the classic Reynolds boids flocking algorithm and scales it up to 3D, using CUDA to run the neighbor and steering calculations in parallel on the GPU. Rendering goes through OpenGL inside a Raylib window, so the simulation can sustain thousands of agents at interactive frame rates.',
      ja: 'クラシックなレイノルズのボイドアルゴリズムを3Dに拡張し、近傍探索とステアリング計算をCUDAでGPU上の並列処理で実行。RaylibウィンドウのOpenGLでレンダリングし、数千個のエージェントをインタラクティブなフレームレートで動かします。',
      mn: 'Сонгодог Reynolds-ийн boids алгоритмыг 3 хэмжээст рүү өргөтгөж, хөрш олох болон жолоодлогын тооцоог CUDA-ээр GPU дээр зэрэгцээ гүйцэтгэдэг. Raylib цонхон дотор OpenGL-ээр дүрсэлсэн тул мянга мянган бөөгнөрлийг интерактив хурдаар ажиллуулах боломжтой.',
    },
    tech: ['C++', 'CUDA', 'OpenGL', 'Raylib', 'GLM', 'Visual Studio'],
    structure: `3D-Boids-Simulation-Cuda-OpenGL-Raylib/
├── Boids sim 3D.slnx              // Visual Studio solution
├── BOID3D.gif
├── README.md
└── Boids sim 3D/
    ├── main.cpp                   // window + frame loop
    ├── Boid.h                     // boid struct (pos, vel)
    ├── flocking.cu                // CUDA flocking kernel
    ├── flocking.cuh               // kernel declarations
    └── renderer.cpp               // OpenGL draw calls`,
    diagram: {
      nodes: [
        { id: 'win',  row: 0, label: 'Raylib Window' },
        { id: 'init', row: 1, label: 'Init Boid Buffer' },
        { id: 'up',   row: 2, label: 'Upload to GPU' },
        { id: 'krn',  row: 3, label: 'CUDA Flocking Kernel' },
        { id: 'dn',   row: 4, label: 'Download to Host' },
        { id: 'rnd',  row: 5, label: 'OpenGL Render' },
      ],
      edges: [
        { from: 'win',  to: 'init' },
        { from: 'init', to: 'up' },
        { from: 'up',   to: 'krn' },
        { from: 'krn',  to: 'dn' },
        { from: 'dn',   to: 'rnd' },
        { from: 'rnd',  to: 'up', dashed: true, label: 'next frame' },
      ],
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
    },
    overview: {
      en: 'A follow-up to the original 2D boids project, rebuilt to push the Entity Component System pattern further. Components for position, velocity, and type are stored as contiguous arrays, and systems run in dependency order — giving larger flocks and richer interactions for almost no extra CPU cost.',
      ja: '元の2DボイドプロジェクトをベースにECSパターンをさらに深く活用。Position・Velocity・Typeなどのコンポーネントを連続配列に格納し、システムが依存順に処理することで、CPU負荷をほとんど増やさずに大規模な群れと複雑な相互作用を実現。',
      mn: 'Анхны 2D boids төслийн үргэлжлэл бөгөөд Entity Component System загварыг улам гүн нэвтрүүлсэн. Position, Velocity, Type зэрэг компонентыг үргэлжилсэн массивт хадгалж, систем нь хамаарлын дарааллаар ажилладаг — нэмэлт CPU зардал бараг байхгүйгээр илүү том сүрэг, баялаг харилцан үйлдэлд хүргэдэг.',
    },
    tech: ['C++', 'SFML', 'ECS', 'Spatial Hash', 'Visual Studio'],
    structure: `2D-Boids-Simulation-Plus/
├── Fishpond Simulation.sln
├── BoidSim.gif
├── README.md
└── Fishpond Simulation/
    ├── main.cpp                   // SFML window + loop
    ├── world.h                    // ECS registry
    ├── components.h               // Position, Velocity, Type
    └── systems/
        ├── flocking.cpp           // separation, alignment, cohesion
        ├── spatial.cpp            // spatial hash
        ├── movement.cpp           // integrate velocity
        └── render.cpp             // SFML draw`,
    diagram: {
      nodes: [
        { id: 'loop',  row: 0, label: 'SFML Game Loop' },
        { id: 'reg',   row: 1, label: 'Create Registry & Entities' },
        { id: 'spat',  row: 2, label: 'Spatial Hash Update' },
        { id: 'flk',   row: 3, label: 'Flocking System' },
        { id: 'mov',   row: 4, label: 'Movement System' },
        { id: 'rnd',   row: 5, label: 'Render System' },
      ],
      edges: [
        { from: 'loop', to: 'reg' },
        { from: 'reg',  to: 'spat' },
        { from: 'spat', to: 'flk' },
        { from: 'flk',  to: 'mov' },
        { from: 'mov',  to: 'rnd' },
        { from: 'rnd',  to: 'spat', dashed: true, label: 'next frame' },
      ],
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
      ja: 'SFMLで構築した2Dボイド。ECSアーキテクチャへの本格的な最初の挑戦。',
      mn: 'SFML дээр бүтээсэн 2D boids — Entity Component System архитектурт хийсэн анхны жинхэнэ туршилт.',
    },
    overview: {
      en: 'My first serious attempt at ECS architecture, applied to a 2D boids simulation rendered with SFML. The three classical rules — separation, alignment, cohesion — each run as their own system, keeping the data-oriented design clean and easy to extend.',
      ja: 'ECSアーキテクチャに本格的に挑戦した最初のプロジェクト。SFMLで2Dボイドシミュレーションを構築し、分離・整列・結束の3つの古典的ルールをそれぞれ独立したシステムとして実装。データ指向設計を清潔に保ち、拡張しやすい構造になっています。',
      mn: 'ECS архитектурт хийсэн анхны жинхэнэ оролдлого. SFML дээр 2D boids симуляц бүтээж, тусгаарлах, тэгшлэх, нягтрах гэсэн 3 сонгодог дүрмийг тус тусдаа систем болгон хэрэгжүүлсэн.',
    },
    tech: ['C++', 'SFML', 'ECS', 'Visual Studio'],
    structure: `2D-Boids-Simulation/
├── SFML_Boid.sln
├── SFML_Boid1.gif
├── SFML_Boid2.gif
├── README.md
└── SFML_Boid/
    ├── main.cpp                   // entrypoint + game loop
    ├── Boid.h / .cpp              // entity helpers
    ├── Components.h               // position, velocity
    ├── Systems.cpp                // separation / alignment / cohesion
    └── Game.cpp                   // SFML window + render`,
    diagram: {
      nodes: [
        { id: 'win',  row: 0, label: 'SFML Window' },
        { id: 'spawn',row: 1, label: 'Spawn Boid Entities' },
        { id: 'sep',  row: 2, label: 'Separation System' },
        { id: 'ali',  row: 3, label: 'Alignment System' },
        { id: 'coh',  row: 4, label: 'Cohesion System' },
        { id: 'mov',  row: 5, label: 'Apply Velocity + Wrap' },
        { id: 'rnd',  row: 6, label: 'Render Triangles' },
      ],
      edges: [
        { from: 'win',   to: 'spawn' },
        { from: 'spawn', to: 'sep' },
        { from: 'sep',   to: 'ali' },
        { from: 'ali',   to: 'coh' },
        { from: 'coh',   to: 'mov' },
        { from: 'mov',   to: 'rnd' },
        { from: 'rnd',   to: 'sep', dashed: true, label: 'next frame' },
      ],
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
    },
    overview: {
      en: 'A 3×3 / 4×4 sliding tile puzzle built directly on the Win32 API. Mouse and keyboard input are handled inside WndProc, the grid is double-buffered to a memory DC to avoid flicker, and the shuffle routine guarantees a solvable starting configuration.',
      ja: 'Win32 APIを直接使って構築した3×3/4×4のスライドパズル。マウスとキーボード入力はWndProc内で処理し、ちらつきを防ぐためにグリッドをメモリDCにダブルバッファリング、シャッフルルーチンは必ず解ける初期配置を保証します。',
      mn: 'Win32 API дээр шууд бүтээсэн 3×3 / 4×4 гулсдаг хайрцагтай оньсого. Хулгана болон гарын оролтыг WndProc дотор боловсруулж, анивчилтыг арилгахын тулд грид-ийг memory DC-д double-buffer хийдэг.',
    },
    tech: ['C++', 'Win32 API', 'GDI', 'Visual Studio'],
    structure: `WINAPI_Puzzle/
├── WINAPI_Puzzle.sln
├── Puzzle.gif
├── README.md
└── WINAPI_Puzzle/
    ├── main.cpp                   // WinMain + message loop
    ├── PuzzleGrid.cpp / .h        // tile state + solvable shuffle
    └── Renderer.cpp               // GDI double-buffered draw`,
    diagram: {
      nodes: [
        { id: 'win',  row: 0, label: 'WinMain' },
        { id: 'cls',  row: 1, label: 'RegisterClass + CreateWindow' },
        { id: 'msg',  row: 2, label: 'Message Loop' },
        { id: 'wnd',  row: 3, label: 'WndProc' },
        { id: 'in',   row: 4, label: 'Input: click / arrow keys' },
        { id: 'upd',  row: 5, label: 'Update Grid State' },
        { id: 'inv',  row: 6, label: 'InvalidateRect → WM_PAINT' },
      ],
      edges: [
        { from: 'win', to: 'cls' },
        { from: 'cls', to: 'msg' },
        { from: 'msg', to: 'wnd' },
        { from: 'wnd', to: 'in' },
        { from: 'in',  to: 'upd' },
        { from: 'upd', to: 'inv' },
        { from: 'inv', to: 'msg', dashed: true, label: 'repaint' },
      ],
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
    },
    overview: {
      en: 'A faithful Minesweeper clone with custom pixel-art tiles. Built on raw WinAPI with a hand-written game loop, recursive flood-fill for revealing empty cells, and a small sprite blitter for the cell, mine, and flag graphics.',
      ja: 'カスタムピクセルアートタイルを使った忠実なマインスイーパー再現。WinAPIだけで手作りのゲームループ、空セル開放のための再帰flood-fill、セル・地雷・旗の描画をする小さなスプライトブリッターで構築。',
      mn: 'Өөрийн pixel art хайрцагтай үнэнч Minesweeper хуулбар. Зөвхөн WinAPI дээр гараар бичсэн тоглоомын цикл, хоосон нүхийг нээх рекурсив flood-fill ашигласан.',
    },
    tech: ['C++', 'Win32 API', 'GDI', 'Pixel Art', 'Visual Studio'],
    structure: `Minesweeper/
├── MineSweeper.sln
├── Minesweeper.gif
├── README.md
└── MineSweeper/
    ├── main.cpp                   // WinMain + WndProc
    ├── Board.cpp / .h             // mines, reveal, flood-fill
    ├── Sprites.cpp                // pixel-art blitter
    └── resources/
        └── tiles.bmp`,
    diagram: {
      nodes: [
        { id: 'win',   row: 0, label: 'WinMain' },
        { id: 'init',  row: 1, label: 'Init Field (random mines)' },
        { id: 'msg',   row: 2, label: 'Message Loop' },
        { id: 'click', row: 3, label: 'WM_LBUTTON → Reveal' },
        { id: 'flag',  row: 4, label: 'WM_RBUTTON → Flag' },
        { id: 'flood', row: 5, label: 'Recursive Flood Fill' },
        { id: 'draw',  row: 6, label: 'WM_PAINT → Sprite Blit' },
      ],
      edges: [
        { from: 'win',   to: 'init' },
        { from: 'init',  to: 'msg' },
        { from: 'msg',   to: 'click' },
        { from: 'click', to: 'flood' },
        { from: 'flood', to: 'draw' },
        { from: 'flag',  to: 'draw' },
        { from: 'msg',   to: 'flag' },
        { from: 'draw',  to: 'msg', dashed: true, label: 'next msg' },
      ],
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
    },
    overview: {
      en: 'A WinAPI desktop analog clock driven by SetTimer and repainted through WM_PAINT. The hands are computed from system time using basic trigonometry and drawn to a back buffer to keep the face crisp and tear-free.',
      ja: 'SetTimerで駆動しWM_PAINTで再描画されるWinAPIデスクトップアナログ時計。針はシステム時刻から基本的な三角関数で計算し、バックバッファに描画することで文字盤を鮮明でテアフリーに保ちます。',
      mn: 'SetTimer-ээр удирдуулж WM_PAINT-аар дахин зурдаг WinAPI ширээний аналог цаг. Зүүний өнцгийг системийн цагаас энгийн тригонометрээр тооцоолж, back buffer дээр зурснаар цагны нүүр тод хэвээр үлддэг.',
    },
    tech: ['C++', 'Win32 API', 'GDI', 'Visual Studio'],
    structure: `Analog-Clock/
├── Clock.sln
├── AnalogClock.gif
├── README.md
└── Clock/
    ├── main.cpp                   // WinMain + WndProc
    └── ClockFace.cpp              // trig + GDI draw`,
    diagram: {
      nodes: [
        { id: 'win',   row: 0, label: 'WinMain' },
        { id: 'tmr',   row: 1, label: 'SetTimer (1s)' },
        { id: 'tick',  row: 2, label: 'WM_TIMER → InvalidateRect' },
        { id: 'paint', row: 3, label: 'WM_PAINT' },
        { id: 'time',  row: 4, label: 'Get System Time' },
        { id: 'trig',  row: 5, label: 'Compute Hand Angles (sin/cos)' },
        { id: 'draw',  row: 6, label: 'Back Buffer → Blit' },
      ],
      edges: [
        { from: 'win',   to: 'tmr' },
        { from: 'tmr',   to: 'tick' },
        { from: 'tick',  to: 'paint' },
        { from: 'paint', to: 'time' },
        { from: 'time',  to: 'trig' },
        { from: 'trig',  to: 'draw' },
        { from: 'draw',  to: 'tick', dashed: true, label: 'tick' },
      ],
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
    },
    overview: {
      en: 'A console-mode mini-game written while learning C++ basics and the STL. The player moves around a text grid collecting stars, scored against a timer, with a simple game loop using _kbhit/_getch for non-blocking input.',
      ja: 'C++の基礎とSTLを学びながら作ったコンソールモードのミニゲーム。プレイヤーがテキストグリッド内を移動して星を集め、タイマーに対してスコアを競う。',
      mn: 'C++-ийн үндэс ба STL-г сурах явцад бичсэн консолын мини тоглоом. Тоглогч текст грид дотор хөдөлж од цуглуулж, таймертай харьцуулан оноо авдаг.',
    },
    tech: ['C++', 'STL', 'Windows Console (conio)', 'Visual Studio'],
    structure: `Console-Game-Star-Collector/
├── ConsoleGame2.sln
├── ConsoleGame.gif
├── README.md
└── ConsoleGame2/
    ├── main.cpp                   // game loop
    ├── Player.h
    ├── Star.h
    └── Field.cpp / .h             // grid + console render`,
    diagram: {
      nodes: [
        { id: 'main',  row: 0, label: 'main()' },
        { id: 'init',  row: 1, label: 'Init Field, Player, Stars' },
        { id: 'in',    row: 2, label: '_kbhit / _getch (non-blocking)' },
        { id: 'mov',   row: 3, label: 'Move Player' },
        { id: 'col',   row: 4, label: 'Star Collision Check' },
        { id: 'scr',   row: 5, label: 'Update Score + Timer' },
        { id: 'rnd',   row: 6, label: 'Render Field (cout)' },
      ],
      edges: [
        { from: 'main', to: 'init' },
        { from: 'init', to: 'in' },
        { from: 'in',   to: 'mov' },
        { from: 'mov',  to: 'col' },
        { from: 'col',  to: 'scr' },
        { from: 'scr',  to: 'rnd' },
        { from: 'rnd',  to: 'in', dashed: true, label: 'next tick' },
      ],
    },
  },
];

const gifUrl = (p) => `https://raw.githubusercontent.com/Sodoo95/${p.repo}/HEAD/${encodeURIComponent(p.gif)}`;
const getProjectByRepo = (repo) => projects.find((p) => p.repo === repo);

function renderDiagram(d) {
  if (!d || !d.nodes || !d.nodes.length) return '';

  const VBW = 540;
  const padding = 28;
  const nodeW = 300;
  const nodeH = 50;
  const rowH = 72;
  const cx = VBW / 2;
  const sideX = cx + nodeW / 2 + 36;
  const VBH = padding * 2 + d.nodes.length * rowH - (rowH - nodeH);

  const pos = {};
  for (const n of d.nodes) {
    const y = padding + (n.row || 0) * rowH;
    pos[n.id] = { x: cx - nodeW / 2, y, cx, cy: y + nodeH / 2, w: nodeW, h: nodeH, row: n.row || 0 };
  }

  const escapeXml = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  let svg = `<svg viewBox="0 0 ${VBW} ${VBH}" xmlns="http://www.w3.org/2000/svg" class="diagram-svg" role="img" aria-label="Architecture diagram">
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 Z" fill="#b46a55" />
      </marker>
    </defs>`;

  for (const e of d.edges) {
    const a = pos[e.from], b = pos[e.to];
    if (!a || !b) continue;
    const forward = a.row < b.row;
    const dash = e.dashed ? ' stroke-dasharray="5 4"' : '';
    let labelX, labelY;
    if (forward) {
      svg += `<line x1="${a.cx}" y1="${a.y + a.h}" x2="${b.cx}" y2="${b.y - 2}" stroke="#b46a55" stroke-width="1.5" opacity="0.8" marker-end="url(#arr)"${dash} />`;
      labelX = a.cx;
      labelY = (a.y + a.h + b.y) / 2;
    } else {
      const p1 = `${a.x + a.w},${a.cy}`;
      const p2 = `${sideX},${a.cy}`;
      const p3 = `${sideX},${b.cy}`;
      const p4 = `${b.x + b.w + 2},${b.cy}`;
      svg += `<polyline points="${p1} ${p2} ${p3} ${p4}" fill="none" stroke="#b46a55" stroke-width="1.5" opacity="0.6" marker-end="url(#arr)"${dash} />`;
      labelX = sideX;
      labelY = (a.cy + b.cy) / 2;
    }
    if (e.label) {
      const lbl = escapeXml(e.label);
      svg += `<g><rect x="${labelX - 38}" y="${labelY - 9}" width="76" height="18" fill="#0b1320" stroke="#34415f" /><text x="${labelX}" y="${labelY + 4}" text-anchor="middle" fill="#c7b8a6" font-family="ui-monospace, monospace" font-size="10">${lbl}</text></g>`;
    }
  }

  for (const n of d.nodes) {
    const p = pos[n.id];
    svg += `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" fill="rgba(180,106,85,0.12)" stroke="#b46a55" stroke-width="2" />`;
    const label = escapeXml(n.label);
    svg += `<text x="${p.cx}" y="${p.cy + 4.5}" text-anchor="middle" fill="#f2efe8" font-family="'VT323', ui-monospace, monospace" font-size="16">${label}</text>`;
  }

  return svg + '</svg>';
}

function applyI18nAttrs(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n, lang);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml, lang);
  });
  const cur = document.querySelector('.lang-current');
  if (cur) cur.textContent = LANG_CODES[lang] || 'EN';
  document.querySelectorAll('.lang-menu [data-lang]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

