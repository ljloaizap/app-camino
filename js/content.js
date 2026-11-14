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

  /**
   * Pack one chapter into credential leaves (2–4 stamps each; never mix chapters).
   * Leaf counts stay as equal as possible; if N does not divide evenly, earlier leaves get the extras.
   */
  function packChapter(stamps, min = 2, max = 4) {
    const n = stamps.length;
    if (n === 0) return [];
    if (n <= max) return [stamps.slice()];

    const candidates = [];
    const kMin = Math.ceil(n / max);
    const kMax = Math.floor(n / min);

    for (let k = kMin; k <= kMax; k += 1) {
      const base = Math.floor(n / k);
      const extra = n % k;
      const hi = extra > 0 ? base + 1 : base;
      if (base < min || hi > max) continue;

      const sizes = Array.from({ length: k }, (_, i) => (i < extra ? base + 1 : base));
      if (!sizes.every((s) => s >= min && s <= max)) continue;

      const spread = Math.max(...sizes) - Math.min(...sizes);
      candidates.push({ sizes, spread, k });
    }

    let sizes;
    if (candidates.length) {
      candidates.sort((a, b) => a.spread - b.spread || a.k - b.k);
      sizes = candidates[0].sizes;
    } else {
      sizes = [];
      let i = 0;
      while (i < n) {
        const rest = n - i;
        let size = Math.min(max, rest);
        if (rest > max && rest - size === 1) size = 3;
        sizes.push(size);
        i += size;
      }
    }

    const leaves = [];
    let offset = 0;
    sizes.forEach((size) => {
      leaves.push(stamps.slice(offset, offset + size));
      offset += size;
    });
    return leaves;
  }

  function parseLeaves(md, catalog) {
    const rows = parseTable(md, '### Hojas');
    if (rows) {
      const chapters = buildChapters(rows);
      return chapters.flatMap((ch) => packChapter(ch.stamps));
    }
    return buildChapters(catalog).flatMap((ch) => packChapter(ch.stamps));
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

    const leaves = parseLeaves(md, catalog);
    applyCatalog(catalog, leaves);
  }

  C.loadContent = loadContent;
  C.catalogMeta = (id) => C.catalog && C.catalog.find((row) => row.id === id);
  C.isPendingTitle = isPendingTitle;
})();