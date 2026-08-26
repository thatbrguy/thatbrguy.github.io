# thatbrguy.github.io

Personal academic site. Plain HTML/CSS/JS, no build step, no framework.

## Structure

```
index.html              intro, publications, and projects sections
404.html
css/style.css           all styling (incl. light/dark theme variables)
js/main.js              theme toggle + fetches & renders content/*.md
content/
  publications/*.md     one file per paper
  projects/*.md         one file per project
assets/
  img/                  photo, favicon
  pdf/                  resume
```

`js/main.js` fetches each markdown file, parses its frontmatter, and renders it into the
page. There's no build step — just static files served over HTTP.

## Adding a publication

Create `content/publications/<slug>.md`:

```
---
title: Paper title
authors: First Author, Second Author
venue: Conference/Journal YEAR
project_page: https://...   (optional)
paper: https://...           (optional)
code: https://...            (optional)
---
```

Then add the filename to the `PUBLICATIONS` array near the top of `js/main.js`.
Omit `project_page`, `paper`, or `code` if that link doesn't exist — it will be skipped
automatically. Entries are sorted by `order` ascending (lower = shown first).

## Adding a project

Create `content/projects/<slug>.md`:

```
---
title: Project title
context: Short context line (course, venue, where it was featured, etc.) — optional
order: 1
summary: One sentence describing the project.
links:
  - { label: "Slides", url: "https://..." }
  - { label: "Code", url: "https://..." }
---
```

`links` is freeform — use whatever labels make sense for that project. Then add the
filename to the `PROJECTS` array near the top of `js/main.js`.

## Local preview

Fetching local markdown files requires `http://`, not `file://`. Serve the directory
with any static file server, e.g.:

```
python3 -m http.server
```

then open `http://localhost:8000`.

## Deploying

This is a plain static site — copy the repository contents to any static host
(GitHub Pages, Netlify, S3, etc). The `.nojekyll` file tells GitHub Pages to serve the
files as-is instead of running them through Jekyll.
