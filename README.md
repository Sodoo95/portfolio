# Sodo-Hikaru — Portfolio

Animated, interactive single-page portfolio built with vanilla HTML, CSS, and JavaScript. No build step, no dependencies.

## Features

- Animated particle background (canvas)
- Smooth cursor glow
- Typed terminal-style hero
- Reveal-on-scroll animations
- Animated stat counters
- Mouse-tracked glow on skill & project cards
- Project grid auto-rendered from a JS data object
- Fully responsive + `prefers-reduced-motion` support

## Local preview

Just open `index.html` in your browser. Or serve it locally:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit http://localhost:8000.

## Deploying to GitHub Pages

1. Create a new repo on GitHub (e.g. `portfolio` or `Sodoo95.github.io` for a user site).
2. Push these three files (`index.html`, `styles.css`, `script.js`) plus this README.
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/Sodoo95/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch → `main` / root → Save**.
4. Your site goes live at:
   - `https://sodoo95.github.io/<repo-name>/` (project site), or
   - `https://sodoo95.github.io/` (if you named the repo `Sodoo95.github.io`).

## Customizing

- **Projects** — edit the `projects` array near the top of `script.js`.
- **Colors / theme** — tweak the CSS variables at the top of `styles.css`.
- **Hero typing lines** — edit the `lines` array in `script.js`.

---

Built with vanilla tech. No framework, no tracking, no nonsense.
