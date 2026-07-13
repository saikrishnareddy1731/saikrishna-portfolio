# Sai Krishna Reddy Ragula — Cinematic Portfolio V3

A responsive static portfolio with an original streaming-inspired profile selector, cinematic intro sound, clearly separated sections, project rails, resume-accurate experience, education and technical skills.

## V3 profile updates

- Added the full name **Sai Krishna Reddy Ragula** and **Open to Relocation**.
- Updated American Express experience with 500 TPS, 10M+ daily transactions, 99.999% availability, 40M+ Kafka events, 50% lower MTTD, 30% faster analytics jobs and 50% less manual operational work.
- Updated IBM experience with Go, React.js, OAuth/JWT, MySQL/Redis optimization, AWS EC2, Jenkins and Docker.
- Added both degrees, GPAs, dates, locations and coursework.
- Replaced the skills section with the exact languages, backend, AI/ML, databases, cloud/DevOps/observability and frontend practices supplied.
- Kept the click-to-enter sound flow required by modern browser autoplay restrictions.

## Required repository structure

```text
index.html
browse.html
about.html
404.html
.nojekyll
README.md
UPLOAD_THESE_FILES.txt
assets/
  audio/skr-intro.mp3
  css/styles.css
  img/favicon.svg
  img/profile.jpeg
  js/app.js
```

Keep `index.html` directly in the GitHub repository root.

## Run locally

```bash
python3 -m http.server 5500
```

Open `http://localhost:5500`.

## GitHub Pages

Use **Settings → Pages → Deploy from a branch → main → /(root)**.


## V4 layout fix
This build removes the hero/experience overlap and adds cache-busting asset URLs.
