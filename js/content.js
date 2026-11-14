/*
 * Loads chapter and stamp titles from /content.md (source of truth).
 * Optional "### Hojas" table overrides leaf grouping; otherwise one leaf per chapter.
 */
(function () {
  'use strict';
  const C = (window.CAMINO = window.CAMINO || {});

  const ROW = /^\|\s*([^|]+?)\s*\|\s*(\d{1,2})\s*[—–-]\s*(.+?)\s*\|$/;
  const SLUG = (s) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'chapter';

  function isPendingTitle(title) {
    return /^\[pendiente\]$/i.test(title.trim());
  }

  function parseTable(md, startHeading) {
    const lines = md.split(/\r?\n/);
    let i = 0;
    if (startHeading) {
      const idx = lines.findIndex((l) => l.trim() === startHeading);
      if (idx === -1) return null;
      i = idx + 1;
    }
  while (i < lines.length && !lines[i].trim().startsWith('|')) i += 1;
    if (i >= lines.length) return null;

    const rows = [];
    for (; i < lines.length; i += 1) {
      const line = lines[i].trim();
      if (!line.startsWith('|')) break;
      if (/^\|\s*[-:]+/.test(line)) continue;
      const m = line.match(ROW);
      if (!m) continue;
      const chapter = m[1].trim();
      const id = parseInt(m[2], 10);
      const title = m[3].trim();
      rows.push({ id, chapter, title });
    }
    return rows.length ? rows : null;
  }

  function buildChapters(catalog) {
    const chapters = [];
    catalog.forEach((row) => {
      const last = chapters[chapters.length - 1];
      if (last && last.title === row.chapter) last.stamps.push(row.id);
      else chapters.push({ id: `chapter-${chapters.length + 1}`, title: row.chapter, stamps: [row.id] });
    });
    return chapters;
  }

  function parseLeaves(md, catalog, chapters) {
    const rows = parseTable(md, '### Hojas');
    if (!rows) return chapters.map((ch) => [...ch.stamps]);

    const byChapter = new Map();
    rows.forEach((row) => {
      if (!byChapter.has(row.chapter)) byChapter.set(row.chapter, []);
      byChapter.get(row.chapter).push(row.id);
    });

    const leaves = [];
    chapters.forEach((ch) => {
      const pack = byChapter.get(ch.title);
      if (pack && pack.length) leaves.push(pack);
      else leaves.push([...ch.stamps]);
    });
    return leaves;
  }

  function applyCatalog(catalog, leaves) {
    C.catalog = catalog;
    C.chapters = buildChapters(catalog);
    C.leaves = leaves;
    C.TOTAL_STAMPS = catalog.length;
    C.contentReady = true;
  }

  async function loadContent() {
    if (C.contentReady) return;
    const response = await fetch('content.md', { credentials: 'same-origin' });
    if (!response.ok) throw new Error(`content.md: HTTP ${response.status}`);
    const md = await response.text();
    const catalog = parseTable(md);
    if (!catalog || !catalog.length) throw new Error('content.md: no stamp table found');

    const chapters = buildChapters(catalog);
    const leaves = parseLeaves(md, catalog, chapters);
    applyCatalog(catalog, leaves);
  }

  C.loadContent = loadContent;
  C.catalogMeta = (id) => C.catalog && C.catalog.find((row) => row.id === id);
  C.isPendingTitle = isPendingTitle;
})();