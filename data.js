// ============================================================
// data.js — shared data, i18n, and helpers used by both
// index.html (main page) and project.html (project detail).
// Must be loaded BEFORE script.js / project.js.
// ============================================================

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
    'project.back': 'Back to portfolio',
    'project.repo': 'View on GitHub',
    'project.overview': 'Overview',
    'project.tech': 'Tech stack',
    'project.structure': 'Project structure',
    'project.architecture': 'Architecture',
    'project.notFound': 'Project not found.',
    'project.notFoundSub': 'The project you are looking for does not exist or has been renamed.',
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
    'project.back': 'ポートフォリオに戻る',
    'project.repo': 'GitHubで見る',
    'project.overview': '概要',
    'project.tech': '使用技術',
    'project.structure': 'プロジェクト構成',
    'project.architecture': 'アーキテクチャ',
    'project.notFound': 'プロジェクトが見つかりません。',
    'project.notFoundSub': 'お探しのプロジェクトは存在しないか、名前が変更されています。',
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
    'project.back': 'Портфолио руу буцах',
    'project.repo': 'GitHub дээр үзэх',
    'project.overview': 'Тойм',
    'project.tech': 'Ашигласан технологи',
    'project.structure': 'Төслийн бүтэц',
    'project.architecture': 'Архитектур',
    'project.notFound': 'Төсөл олдсонгүй.',
    'project.notFoundSub': 'Таны хайж буй төсөл байхгүй эсвэл нэр нь өөрчлөгдсөн байна.',
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
    'project.back': '포트폴리오로 돌아가기',
    'project.repo': 'GitHub에서 보기',
    'project.overview': '개요',
    'project.tech': '기술 스택',
    'project.structure': '프로젝트 구조',
    'project.architecture': '아키텍처',
    'project.notFound': '프로젝트를 찾을 수 없습니다.',
    'project.notFoundSub': '찾으시는 프로젝트가 존재하지 않거나 이름이 변경되었습니다.',
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
    'project.back': '返回作品集',
    'project.repo': '在 GitHub 上查看',
    'project.overview': '概览',
    'project.tech': '技术栈',
    'project.structure': '项目结构',
    'project.architecture': '架构',
    'project.notFound': '找不到该项目。',
    'project.notFoundSub': '您查找的项目不存在或已被重命名。',
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

// ============================================================
// Projects
// ============================================================
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
    overview: {
      en: 'This project takes the classic Reynolds boids flocking algorithm and scales it up to 3D, using CUDA to run the neighbor and steering calculations in parallel on the GPU. Rendering goes through OpenGL inside a Raylib window, so the simulation can sustain thousands of agents at interactive frame rates.',
      ja: 'クラシックなレイノルズのボイドアルゴリズムを3Dに拡張し、近傍探索とステアリング計算をCUDAでGPU上の並列処理で実行。RaylibウィンドウのOpenGLでレンダリングし、数千個のエージェントをインタラクティブなフレームレートで動かします。',
      mn: 'Сонгодог Reynolds-ийн boids алгоритмыг 3 хэмжээст рүү өргөтгөж, хөрш олох болон жолоодлогын тооцоог CUDA-ээр GPU дээр зэрэгцээ гүйцэтгэдэг. Raylib цонхон дотор OpenGL-ээр дүрсэлсэн тул мянга мянган бөөгнөрлийг интерактив хурдаар ажиллуулах боломжтой.',
      ko: '고전 Reynolds 보이드 알고리즘을 3D로 확장하고, 이웃 탐색과 조향 계산을 CUDA로 GPU에서 병렬 처리합니다. 렌더링은 Raylib 창 안의 OpenGL을 통해 처리되어 수천 개의 개체를 인터랙티브한 프레임률로 시뮬레이션합니다.',
      zh: '将经典 Reynolds Boids 算法扩展到 3D，使用 CUDA 在 GPU 上并行计算邻居和转向。渲染由 Raylib 窗口中的 OpenGL 完成，可在交互帧率下模拟数千个体。',
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
      ko: 'ECS 지식을 더 깊이 — 더 큰 무리, 풍부한 상호작용, 향상된 성능을 갖춘 2D 보이드의 진화판.',
      zh: '进一步推进 ECS 知识——更大的群体、更丰富的交互、更高的性能，对原版 2D Boids 的升级。',
    },
    overview: {
      en: 'A follow-up to the original 2D boids project, rebuilt to push the Entity Component System pattern further. Components for position, velocity, and type are stored as contiguous arrays, and systems run in dependency order — giving larger flocks and richer interactions for almost no extra CPU cost.',
      ja: '元の2DボイドプロジェクトをベースにECSパターンをさらに深く活用。Position・Velocity・Typeなどのコンポーネントを連続配列に格納し、システムが依存順に処理することで、CPU負荷をほとんど増やさずに大規模な群れと複雑な相互作用を実現。',
      mn: 'Анхны 2D boids төслийн үргэлжлэл бөгөөд Entity Component System загварыг улам гүн нэвтрүүлсэн. Position, Velocity, Type зэрэг компонентыг үргэлжилсэн массивт хадгалж, систем нь хамаарлын дарааллаар ажилладаг — нэмэлт CPU зардал бараг байхгүйгээр илүү том сүрэг, баялаг харилцан үйлдэлд хүргэдэг.',
      ko: '원본 2D 보이드 프로젝트의 후속작으로 Entity Component System 패턴을 더 깊이 활용했습니다. Position, Velocity, Type 등의 컴포넌트를 연속 배열로 저장하고, 시스템이 의존 순서대로 동작하여 CPU 부하를 거의 늘리지 않고도 더 큰 무리와 풍부한 상호작용을 구현합니다.',
      zh: '在原版 2D Boids 项目基础上进一步深入实体组件系统模式。Position、Velocity、Type 等组件存储为连续数组，系统按依赖顺序运行——几乎不增加 CPU 开销，却能支持更大的群体和更丰富的交互。',
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
      ja: 'SFMLで構築した2Dボイド。ECS（Entity Component System）アーキテクチャへの本格的な最初の挑戦。',
      mn: 'SFML дээр бүтээсэн 2D boids — Entity Component System архитектурт хийсэн анхны жинхэнэ туршилт.',
      ko: 'SFML로 만든 2D 보이드 — Entity Component System 아키텍처에 본격적으로 도전한 첫 작품.',
      zh: '用 SFML 构建的 2D Boids——首次真正深入 Entity Component System 架构。',
    },
    overview: {
      en: 'My first serious attempt at ECS architecture, applied to a 2D boids simulation rendered with SFML. The three classical rules — separation, alignment, cohesion — each run as their own system, keeping the data-oriented design clean and easy to extend.',
      ja: 'ECSアーキテクチャに本格的に挑戦した最初のプロジェクト。SFMLで2Dボイドシミュレーションを構築し、分離・整列・結束の3つの古典的ルールをそれぞれ独立したシステムとして実装。データ指向設計を清潔に保ち、拡張しやすい構造になっています。',
      mn: 'ECS архитектурт хийсэн анхны жинхэнэ оролдлого. SFML дээр 2D boids симуляц бүтээж, тусгаарлах, тэгшлэх, нягтрах гэсэн 3 сонгодог дүрмийг тус тусдаа систем болгон хэрэгжүүлсэн. Энэ нь өгөгдөл хандсан загварыг цэвэр, өргөтгөхөд хялбар байлгасан.',
      ko: 'ECS 아키텍처에 본격적으로 도전한 첫 프로젝트입니다. SFML로 2D 보이드 시뮬레이션을 만들고 분리·정렬·응집의 세 가지 고전 규칙을 각각 독립된 시스템으로 구현하여, 데이터 지향 설계를 깔끔하고 확장하기 쉽게 유지했습니다.',
      zh: '我对 ECS 架构的首次正式尝试，使用 SFML 构建 2D Boids 仿真。将分离、对齐、聚集这三条经典规则分别实现为独立系统，使数据导向的设计保持清晰且易于扩展。',
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
      ko: 'Win32 API로 처음부터 만든 슬라이딩 타일 퍼즐 게임. 학교 과제로 시작해 애착이 가는 프로젝트가 되었습니다.',
      zh: '使用 Win32 API 从零开始编写的滑块拼图游戏。从学校作业变成了热爱的项目。',
    },
    overview: {
      en: 'A 3×3 / 4×4 sliding tile puzzle built directly on the Win32 API. Mouse and keyboard input are handled inside WndProc, the grid is double-buffered to a memory DC to avoid flicker, and the shuffle routine guarantees a solvable starting configuration.',
      ja: 'Win32 APIを直接使って構築した3×3/4×4のスライドパズル。マウスとキーボード入力はWndProc内で処理し、ちらつきを防ぐためにグリッドをメモリDCにダブルバッファリング、シャッフルルーチンは必ず解ける初期配置を保証します。',
      mn: 'Win32 API дээр шууд бүтээсэн 3×3 / 4×4 гулсдаг хайрцагтай оньсого. Хулгана болон гарын оролтыг WndProc дотор боловсруулж, анивчилтыг арилгахын тулд грид-ийг memory DC-д double-buffer хийдэг бөгөөд хольж заларсан байрлал нь шийдэгдэх боломжтой эхлэлийг баталгаажуулдаг.',
      ko: 'Win32 API 위에 직접 만든 3×3 / 4×4 슬라이딩 타일 퍼즐입니다. 마우스와 키보드 입력은 WndProc 안에서 처리하고, 깜빡임을 막기 위해 그리드를 메모리 DC에 더블 버퍼링하며, 셔플 루틴은 항상 풀 수 있는 시작 배치를 보장합니다.',
      zh: '直接基于 Win32 API 构建的 3×3 / 4×4 滑块拼图。鼠标和键盘输入在 WndProc 中处理，网格在内存 DC 中双缓冲以避免闪烁，洗牌例程确保初始布局始终可解。',
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
      ko: '커스텀 픽셀 아트와 직접 만든 게임 루프로 재구축한 클래식 지뢰찾기.',
      zh: '用自定义像素艺术和手写游戏循环重制的经典扫雷。',
    },
    overview: {
      en: 'A faithful Minesweeper clone with custom pixel-art tiles. Built on raw WinAPI with a hand-written game loop, recursive flood-fill for revealing empty cells, and a small sprite blitter for the cell, mine, and flag graphics.',
      ja: 'カスタムピクセルアートタイルを使った忠実なマインスイーパー再現。WinAPIだけで手作りのゲームループ、空セル開放のための再帰flood-fill、セル・地雷・旗の描画をする小さなスプライトブリッターで構築。',
      mn: 'Өөрийн pixel art хайрцагтай үнэнч Minesweeper хуулбар. Зөвхөн WinAPI дээр гараар бичсэн тоглоомын цикл, хоосон нүхийг нээх рекурсив flood-fill, нүх, мина, тугийн зургийг зурдаг жижиг sprite blitter ашигласан.',
      ko: '커스텀 픽셀 아트 타일을 사용한 충실한 지뢰찾기 클론입니다. 순수 WinAPI 위에 직접 작성한 게임 루프, 빈 셀 공개를 위한 재귀적 flood-fill, 셀·지뢰·깃발 그래픽을 그리는 작은 스프라이트 블리터로 구성되어 있습니다.',
      zh: '一款使用自定义像素艺术贴图的扫雷高仿版。基于原生 WinAPI，配合手写的游戏循环、用于揭示空格子的递归 flood-fill，以及一个绘制格子、地雷与旗帜图形的小型 sprite 渲染器。',
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
      ko: 'WinAPI로 그린 작동하는 아날로그 시계 — 삼각함수, 타이머, 더블 버퍼링 그리기의 작은 연습.',
      zh: '用 WinAPI 渲染的可运行模拟时钟——三角函数、定时器、双缓冲绘图的小练习。',
    },
    overview: {
      en: 'A WinAPI desktop analog clock driven by SetTimer and repainted through WM_PAINT. The hands are computed from system time using basic trigonometry and drawn to a back buffer to keep the face crisp and tear-free.',
      ja: 'SetTimerで駆動しWM_PAINTで再描画されるWinAPIデスクトップアナログ時計。針はシステム時刻から基本的な三角関数で計算し、バックバッファに描画することで文字盤を鮮明でテアフリーに保ちます。',
      mn: 'SetTimer-ээр удирдуулж WM_PAINT-аар дахин зурдаг WinAPI ширээний аналог цаг. Зүүний өнцгийг системийн цагаас энгийн тригонометрээр тооцоолж, back buffer дээр зурснаар цагны нүүр тод, tear-free хэвээр үлддэг.',
      ko: 'SetTimer로 구동되고 WM_PAINT로 다시 그려지는 WinAPI 데스크톱 아날로그 시계입니다. 시침과 분침은 시스템 시간에서 기본 삼각함수로 계산되며, 시계면을 선명하고 깔끔하게 유지하기 위해 백 버퍼에 그려집니다.',
      zh: '由 SetTimer 驱动、通过 WM_PAINT 重绘的 WinAPI 桌面模拟时钟。指针角度通过基础三角函数从系统时间计算得出，并绘制到后台缓冲区，使表盘清晰无撕裂。',
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
      ko: 'STL과 C++ 기초를 공부하며 만든 콘솔 기반 별 모으기 미니 게임.',
      zh: '在学习 STL 和 C++ 基础时制作的基于控制台的星星收集小游戏。',
    },
    overview: {
      en: 'A console-mode mini-game written while learning C++ basics and the STL. The player moves around a text grid collecting stars, scored against a timer, with a simple game loop using _kbhit/_getch for non-blocking input.',
      ja: 'C++の基礎とSTLを学びながら作ったコンソールモードのミニゲーム。プレイヤーがテキストグリッド内を移動して星を集め、タイマーに対してスコアを競う。_kbhit/_getchを使ったノンブロッキング入力のシンプルなゲームループを採用。',
      mn: 'C++-ийн үндэс ба STL-г сурах явцад бичсэн консолын мини тоглоом. Тоглогч текст грид дотор хөдөлж од цуглуулж, таймертай харьцуулан оноо авдаг. _kbhit/_getch ашигласан non-blocking оролттой энгийн тоглоомын цикл.',
      ko: 'C++ 기초와 STL을 학습하면서 만든 콘솔 모드 미니 게임입니다. 플레이어가 텍스트 그리드 안을 이동하며 별을 수집하고 타이머와 함께 점수를 겨루며, _kbhit/_getch를 활용한 논블로킹 입력의 단순한 게임 루프를 사용합니다.',
      zh: '学习 C++ 基础与 STL 时制作的控制台模式小游戏。玩家在文本网格中移动收集星星，与计时器竞分；使用 _kbhit/_getch 的非阻塞输入构建简单的游戏循环。',
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

// ============================================================
// Diagram renderer — turns { nodes, edges } spec into SVG
// ============================================================
function renderDiagram(d) {
  if (!d || !d.nodes || !d.nodes.length) return '';

  const VBW = 540;                  // viewBox width
  const padding = 28;
  const nodeW = 300;
  const nodeH = 50;
  const rowH = 72;
  const cx = VBW / 2;
  const sideX = cx + nodeW / 2 + 36;
  const VBH = padding * 2 + d.nodes.length * rowH - (rowH - nodeH);

  // Position by row index
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
        <path d="M0,0 L10,5 L0,10 Z" fill="#3b82f6" />
      </marker>
    </defs>`;

  // Edges first so they render under the nodes
  for (const e of d.edges) {
    const a = pos[e.from], b = pos[e.to];
    if (!a || !b) continue;
    const forward = a.row < b.row;
    const dash = e.dashed ? ' stroke-dasharray="5 4"' : '';
    let labelX, labelY;
    if (forward) {
      svg += `<line x1="${a.cx}" y1="${a.y + a.h}" x2="${b.cx}" y2="${b.y - 2}" stroke="#3b82f6" stroke-width="1.5" opacity="0.7" marker-end="url(#arr)"${dash} />`;
      labelX = a.cx;
      labelY = (a.y + a.h + b.y) / 2;
    } else {
      // Route around right side
      const p1 = `${a.x + a.w},${a.cy}`;
      const p2 = `${sideX},${a.cy}`;
      const p3 = `${sideX},${b.cy}`;
      const p4 = `${b.x + b.w + 2},${b.cy}`;
      svg += `<polyline points="${p1} ${p2} ${p3} ${p4}" fill="none" stroke="#3b82f6" stroke-width="1.5" opacity="0.55" marker-end="url(#arr)"${dash} />`;
      labelX = sideX;
      labelY = (a.cy + b.cy) / 2;
    }
    if (e.label) {
      const lbl = escapeXml(e.label);
      svg += `<g><rect x="${labelX - 38}" y="${labelY - 9}" width="76" height="18" rx="4" fill="#0d0d14" stroke="rgba(255,255,255,0.12)" /><text x="${labelX}" y="${labelY + 4}" text-anchor="middle" fill="#93c5fd" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="10">${lbl}</text></g>`;
    }
  }

  // Nodes on top
  for (const n of d.nodes) {
    const p = pos[n.id];
    svg += `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="10" fill="rgba(59,130,246,0.07)" stroke="#3b82f6" stroke-width="1.5" />`;
    const label = escapeXml(n.label);
    svg += `<text x="${p.cx}" y="${p.cy + 4.5}" text-anchor="middle" fill="#e8e8ee" font-family="'Space Grotesk', system-ui, sans-serif" font-size="13" font-weight="500">${label}</text>`;
  }

  return svg + '</svg>';
}

// ============================================================
// i18n helpers (apply to elements + lang switcher)
// ============================================================
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

function setupLangSwitcher(onChange) {
  const btn = document.getElementById('lang-btn');
  const menu = document.getElementById('lang-menu');
  if (!btn || !menu) return;
  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!menu.classList.contains('open'));
  });
  menu.querySelectorAll('[data-lang]').forEach((b) => {
    b.addEventListener('click', () => {
      onChange(b.dataset.lang);
      setOpen(false);
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-switch')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

function getInitialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  } catch (_) {}
  const nav = (navigator.language || 'en').toLowerCase();
  if (nav.startsWith('ja')) return 'ja';
  if (nav.startsWith('mn')) return 'mn';
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('zh')) return 'zh';
  return 'en';
}

function saveLang(lang) {
  try { localStorage.setItem('lang', lang); } catch (_) {}
}
