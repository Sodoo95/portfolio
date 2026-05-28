// ============================================================
// project.js — sub-page (project.html)
// Reads ?p=<repo> from URL, finds matching project in data.js,
// renders detail content with i18n support.
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

const params = new URLSearchParams(location.search);
const repoSlug = params.get('p') || '';
const project = getProjectByRepo(repoSlug);

const repoLink = document.getElementById('repo-link');
const body = document.getElementById('project-body');

if (project) {
  repoLink.href = `https://github.com/Sodoo95/${project.repo}`;
  document.title = `${project.name} — Sodo-Hikaru`;
} else {
  repoLink.href = 'https://github.com/Sodoo95';
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function renderProject(lang) {
  if (!project) {
    body.innerHTML = `
      <div class="project-not-found">
        <h1 data-i18n="project.notFound">${t('project.notFound', lang)}</h1>
        <p class="muted" data-i18n="project.notFoundSub">${t('project.notFoundSub', lang)}</p>
      </div>
    `;
    return;
  }

  const overview = (project.overview && project.overview[lang]) || project.overview.en;
  const shortDesc = (project.desc && project.desc[lang]) || project.desc.en;

  body.innerHTML = `
    <header class="project-hero">
      <div class="project-hero-media">
        <img src="${gifUrl(project)}" alt="${escapeHtml(project.name)} preview" referrerpolicy="no-referrer" onerror="this.style.display='none'" />
      </div>
      <div class="project-hero-info">
        <h1 class="project-hero-title">${escapeHtml(project.name)}</h1>
        <p class="project-hero-desc">${escapeHtml(shortDesc)}</p>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
        <div class="project-hero-meta">
          <span class="lang" style="--lang-color:${langColors[project.language] || '#b46a55'}">${escapeHtml(project.language)}</span>
          <span class="muted">★ ${project.stars}${project.featured ? ' · featured' : ''}</span>
        </div>
      </div>
    </header>

    <section class="project-section">
      <h2 class="project-section-title" data-i18n="project.overview">${t('project.overview', lang)}</h2>
      <p class="project-overview">${escapeHtml(overview)}</p>
    </section>

    <section class="project-section">
      <h2 class="project-section-title" data-i18n="project.tech">${t('project.tech', lang)}</h2>
      <div class="tech-grid">
        ${project.tech.map((tag) => `<span class="tech-chip">${escapeHtml(tag)}</span>`).join('')}
      </div>
    </section>

    <section class="project-section">
      <h2 class="project-section-title" data-i18n="project.structure">${t('project.structure', lang)}</h2>
      <pre class="project-tree"><code>${escapeHtml(project.structure)}</code></pre>
    </section>

    <section class="project-section">
      <h2 class="project-section-title" data-i18n="project.architecture">${t('project.architecture', lang)}</h2>
      <div class="diagram-wrap">${renderDiagram(project.diagram)}</div>
    </section>
  `;
}

function applyLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';
  applyI18nAttrs(lang);
  renderProject(lang);
  saveLang(lang);
}

setupLangSwitcher(applyLanguage);
applyLanguage(getInitialLang());

// Subtle cursor glow shared by both pages — only set up if element exists
const glow = document.getElementById('cursor-glow');
if (glow) {
  let mx = window.innerWidth / 2, my = window.innerHeight / 2, gx = mx, gy = my;
  window.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
}
