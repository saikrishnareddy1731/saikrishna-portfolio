# Sai Krishna Reddy — Cinematic Portfolio

A responsive, Netflix-inspired portfolio experience built from scratch with semantic HTML, CSS and vanilla JavaScript. It uses Sai Krishna Reddy Ragula's existing portfolio content and public project links while keeping the branding original.

## Pages

- `index.html` — intro and profile selection
- `browse.html` — main portfolio, experience, projects and skills
- `about.html` — biography, career timeline and engineering principles

## Run locally

```bash
python -m http.server 5500
```

Open `http://localhost:5500`.

## Deploy to GitHub Pages

Replace the contents of `saikrishnareddy1731.github.io`, commit to the publishing branch, and enable Pages under **Settings → Pages** if it is not already enabled.

```bash
git add .
git commit -m "Redesign portfolio with cinematic experience"
git push origin master
```

## Edit content

Most content is directly inside `browse.html` and `about.html`. Global styling is in `assets/css/styles.css`; interactive behavior is in `assets/js/app.js`.
