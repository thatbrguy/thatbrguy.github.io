(function () {
  "use strict";

  var THEME_KEY = "theme-preference";
  var root = document.documentElement;

  function prefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  var ICON_SUN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
    '<circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none"/>' +
    '<line x1="12" y1="1.5" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22.5"/>' +
    '<line x1="1.5" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22.5" y2="12"/>' +
    '<line x1="4.2" y1="4.2" x2="6" y2="6"/><line x1="18" y1="18" x2="19.8" y2="19.8"/>' +
    '<line x1="4.2" y1="19.8" x2="6" y2="18"/><line x1="18" y1="6" x2="19.8" y2="4.2"/>' +
    "</svg>";

  var ICON_MOON =
    '<svg viewBox="0 0 24 24" fill="currentColor">' +
    '<path d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 1 0 20.354 15.354Z"/>' +
    "</svg>";

  function applyTheme(theme) {
    if (theme) {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
    var icon = document.getElementById("theme-toggle-icon");
    if (icon) {
      var isDark = theme === "dark" || (!theme && prefersDark());
      icon.innerHTML = isDark ? ICON_SUN : ICON_MOON;
    }
  }

  applyTheme(localStorage.getItem(THEME_KEY));

  var toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var stored = localStorage.getItem(THEME_KEY);
      var isDark = stored === "dark" || (!stored && prefersDark());
      var next = isDark ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.href = "mailto:" + "bharathrajn98" + "@" + "gmail.com";
  }

  // ---- Minimal frontmatter parser ----
  // Supports flat `key: value` pairs plus one level of flow-style
  // list-of-maps for a `key:` followed by `- { a: "x", b: "y" }` lines.

  function unquote(value) {
    var m = value.match(/^"(.*)"$/);
    return m ? m[1] : value;
  }

  function parseFlowMap(inner) {
    var obj = {};
    var re = /([a-zA-Z_]+)\s*:\s*"((?:[^"\\]|\\.)*)"/g;
    var m;
    while ((m = re.exec(inner)) !== null) {
      obj[m[1]] = m[2];
    }
    return obj;
  }

  function parseFrontmatter(raw) {
    var lines = raw.replace(/\r\n/g, "\n").split("\n");
    var data = {};
    if (lines[0].trim() !== "---") return data;

    for (var i = 1; i < lines.length; i++) {
      var line = lines[i];
      if (line.trim() === "---") break;
      if (!line.trim()) continue;

      var kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
      if (!kv) continue;
      var key = kv[1];
      var value = kv[2].trim();

      if (value !== "") {
        data[key] = unquote(value);
        continue;
      }

      // block list: consecutive `  - { ... }` lines
      var items = [];
      var j = i + 1;
      while (j < lines.length) {
        var itemMatch = lines[j].match(/^\s*-\s*\{(.+)\}\s*$/);
        if (!itemMatch) break;
        items.push(parseFlowMap(itemMatch[1]));
        j++;
      }
      data[key] = items;
      i = j - 1;
    }
    return data;
  }

  // ---- Rendering ----

  function el(tag, className, html) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function linkTag(label, url) {
    var a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = label;
    return a;
  }

  function renderLinksRow(pairs) {
    var p = el("p", "entry-links");
    pairs.forEach(function (pair, idx) {
      if (idx > 0) p.appendChild(el("span", "sep", "/"));
      p.appendChild(linkTag(pair[0], pair[1]));
    });
    return p;
  }

  function entryShell(data) {
    var article = el("article", "entry");
    if (data.image) {
      var img = document.createElement("img");
      img.className = "entry-thumb";
      img.src = data.image;
      img.alt = "";
      article.appendChild(img);
    }
    var body = el("div", "entry-body");
    article.appendChild(body);
    return { article: article, body: body };
  }

  // Name variants to bold when they appear in an author list, longest first
  // so a longer variant is never left partially matched by a shorter one.
  var SELF_NAMES = ["Bharath Raj Nagoor Kani", "Bharath Raj N."];

  function boldSelf(authors) {
    var result = authors;
    SELF_NAMES.forEach(function (name) {
      result = result.split(name).join("<b>" + name + "</b>");
    });
    return result;
  }

  function renderPublication(data) {
    var shell = entryShell(data);
    var body = shell.body;

    body.appendChild(el("h3", "entry-title", data.title || ""));
    if (data.authors) {
      body.appendChild(el("p", "entry-authors", boldSelf(data.authors)));
    }
    if (data.venue) {
      body.appendChild(el("p", "entry-venue", data.venue));
    }

    var pairs = [];
    if (data.project_page) pairs.push(["Project Page", data.project_page]);
    if (data.paper) pairs.push(["Paper", data.paper]);
    if (data.code) pairs.push(["Code", data.code]);
    if (pairs.length) body.appendChild(renderLinksRow(pairs));

    return shell.article;
  }

  function renderProject(data) {
    var shell = entryShell(data);
    var body = shell.body;

    body.appendChild(el("h3", "entry-title", data.title || ""));
    if (data.context) {
      body.appendChild(el("p", "entry-meta", data.context));
    }

    var pairs = (data.links || [])
      .filter(function (l) { return l.label && l.url; })
      .map(function (l) { return [l.label, l.url]; });
    if (pairs.length) body.appendChild(renderLinksRow(pairs));

    return shell.article;
  }

  // Filenames are expected to start with a YYMMDD date prefix (e.g.
  // "241001-upfusion.md"), which is used to sort entries newest-first.
  function datePrefix(filename) {
    var m = filename.match(/^(\d{6})-/);
    return m ? m[1] : "000000";
  }

  function loadCollection(basePath, filenames, containerId, renderFn) {
    var container = document.getElementById(containerId);
    if (!container) return;

    Promise.all(
      filenames.map(function (name) {
        return fetch(basePath + name)
          .then(function (res) {
            if (!res.ok) throw new Error("Failed to load " + name);
            return res.text();
          })
          .then(parseFrontmatter)
          .then(function (data) {
            data._date = datePrefix(name);
            return data;
          })
          .catch(function (err) {
            console.error(err);
            return null;
          });
      })
    ).then(function (entries) {
      entries
        .filter(Boolean)
        .sort(function (a, b) {
          return b._date.localeCompare(a._date);
        })
        .forEach(function (data) {
          container.appendChild(renderFn(data));
        });
    });
  }

  // Add a filename here whenever a new paper/project markdown file is added.
  // Newest-first ordering is derived automatically from each file's YYMMDD prefix.
  var PUBLICATIONS = ["260526-g3t.md", "260520-flatpack.md", "241001-upfusion.md", "200101-dehaze.md"];
  var PROJECTS = ["231201-photon-mapping.md", "200101-jetson-tinyyolo.md"];

  loadCollection("content/publications/", PUBLICATIONS, "publications-list", renderPublication);
  loadCollection("content/projects/", PROJECTS, "projects-list", renderProject);
})();
