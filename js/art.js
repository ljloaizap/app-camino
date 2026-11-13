/*
 * SVG artwork: stamps and scallop shell.
 */
(function () {
  'use strict';
  const C = (window.CAMINO = window.CAMINO || {});

  let uid = 0;

  const COLORS = {
    blue: 'var(--blue)',
    terra: 'var(--terra)',
    olive: 'var(--olive)',
    charcoal: 'var(--charcoal)',
  };

  const ICONS = {
    boot:
      '<path d="M7 3h5v7.5l4.8 1.9A3.2 3.2 0 0 1 19 15.4V19H5V5a2 2 0 0 1 2-2Z"/>' +
      '<path d="M4 21.5h16"/><path d="M8 7h4M8 10.5h4"/>',
    arrow: '<path d="M3 12h15"/><path d="M13 6l6 6-6 6"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
  };

  const INK_DEFS =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false" data-persist><defs>' +
    '<filter id="ink" x="-5%" y="-5%" width="110%" height="110%">' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3" result="noise"/>' +
    '<feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="shifted"/>' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="1" seed="8" result="spots"/>' +
    '<feColorMatrix in="spots" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.55" result="mask"/>' +
    '<feComposite in="shifted" in2="mask" operator="in"/>' +
    '</filter></defs></svg>';

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  const r1 = (n) => Math.round(n * 10) / 10;

  function polar(cx, cy, r, deg) {
    const a = (deg * Math.PI) / 180;
    return `${r1(cx + r * Math.sin(a))} ${r1(cy - r * Math.cos(a))}`;
  }

  function arc(cx, cy, r, top) {
    return `M${cx - r} ${cy}A${r} ${r} 0 0 ${top ? 1 : 0} ${cx + r} ${cy}`;
  }

  function textOnArc(id, cx, cy, r, top, text, spacing) {
    const label = String(text).toUpperCase();
    const room = Math.PI * r * 0.82 - label.length * spacing;
    const size = r1(Math.min(8.5, room / (label.length * 0.64)));
    return (
      `<path id="${id}" d="${arc(cx, cy, r, top)}" fill="none" stroke="none"/>` +
      `<text font-size="${size}" letter-spacing="${spacing}" fill="currentColor" stroke="none">` +
      `<textPath href="#${id}" startOffset="50%" text-anchor="middle">${esc(label)}</textPath></text>`
    );
  }

  function icon(name, cx, cy, size) {
    const s = size / 24;
    return (
      `<g transform="translate(${r1(cx - size / 2)} ${r1(cy - size / 2)}) scale(${r1(s * 100) / 100})" ` +
      `stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</g>`
    );
  }

  function open(w, h, label, color) {
    return (
      `<svg class="stamp-art" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}"` +
      `${color ? ` style="color:${COLORS[color] || COLORS.blue}"` : ''}>`
    );
  }

  function circleStamp(o, label) {
    const id = `st${++uid}`;
    return (
      open(120, 120, label, o.color) +
      '<g filter="url(#ink)" fill="none" stroke="currentColor">' +
      '<circle cx="60" cy="60" r="55" stroke-width="3"/>' +
      '<circle cx="60" cy="60" r="48" stroke-width="1.1"/>' +
      '<circle cx="60" cy="60" r="29" stroke-width="1" stroke-dasharray="1.5 2.5"/>' +
      textOnArc(`${id}a`, 60, 60, 37, true, o.top || '', 0.8) +
      textOnArc(`${id}b`, 60, 60, 43, false, o.bottom || '', 1.6) +
      '<circle cx="14" cy="60" r="1.6" fill="currentColor"/><circle cx="106" cy="60" r="1.6" fill="currentColor"/>' +
      icon(o.icon, 60, 60, 34) +
      '</g></svg>'
    );
  }

  function rectStamp(o, label) {
    return (
      open(150, 110, label, o.color) +
      '<g filter="url(#ink)" fill="none" stroke="currentColor">' +
      '<rect x="4" y="4" width="142" height="102" rx="16" stroke-width="3"/>' +
      '<rect x="11" y="11" width="128" height="88" rx="10" stroke-width="1.1"/>' +
      `<text x="75" y="29" text-anchor="middle" font-size="9" letter-spacing="2.2" fill="currentColor" stroke="none">${esc(
        String(o.top || '').toUpperCase()
      )}</text>` +
      '<path d="M30 36H120M30 75H120" stroke-width=".9"/>' +
      icon(o.icon, 75, 55.5, 28) +
      `<text class="art-serif" x="75" y="94" text-anchor="middle" font-size="17" fill="currentColor" stroke="none">${esc(
        o.label || ''
      )}</text>` +
      '<circle cx="22" cy="55.5" r="1.6" fill="currentColor"/><circle cx="128" cy="55.5" r="1.6" fill="currentColor"/>' +
      '</g></svg>'
    );
  }

  function scallopStamp(o, label) {
    const id = `st${++uid}`;
    const n = 28;
    let d = `M${polar(60, 60, 52, 0)}`;
    for (let i = 0; i < n; i++) {
      d += `Q${polar(60, 60, 58, ((i + 0.5) * 360) / n)} ${polar(60, 60, 52, ((i + 1) * 360) / n)}`;
    }
    return (
      open(120, 120, label, o.color) +
      '<g filter="url(#ink)" fill="none" stroke="currentColor">' +
      `<path d="${d}Z" stroke-width="2.6"/>` +
      '<circle cx="60" cy="60" r="45" stroke-width="1"/>' +
      textOnArc(`${id}a`, 60, 60, 34, true, o.top || '', 1.2) +
      textOnArc(`${id}b`, 60, 60, 40, false, o.bottom || '', 1.8) +
      icon(o.icon, 60, 60, 30) +
      '</g></svg>'
    );
  }

  function pendingStamp(o, label) {
    return (
      open(120, 120, label) +
      '<g fill="none" stroke="currentColor">' +
      '<circle cx="60" cy="60" r="50" stroke-width="1.3" stroke-dasharray="3 4"/>' +
      `<text class="art-serif" x="60" y="70" text-anchor="middle" font-size="30" fill="currentColor" stroke="none">${esc(
        o.number || ''
      )}</text>` +
      '</g></svg>'
    );
  }

  function shellPaths() {
    const hx = 50;
    const hy = 80;
    const r = 54;
    const span = 56;
    const ribs = 9;
    const angle = (i) => -span + (2 * span * i) / (ribs - 1);

    let edge = `M${hx} ${hy}L${polar(hx, hy, r, angle(0))}`;
    for (let i = 0; i < ribs - 1; i++) {
      edge += `Q${polar(hx, hy, r + 7, angle(i + 0.5))} ${polar(hx, hy, r, angle(i + 1))}`;
    }
    let lines = '';
    for (let i = 1; i < ribs - 1; i++) lines += `M${hx} ${hy}L${polar(hx, hy, r * 0.9, angle(i))}`;
    const ears = `M${hx - 5} ${hy}L${hx - 15} ${hy + 9}H${hx + 15}L${hx + 5} ${hy}Z`;

    return `<path d="${edge}Z"/><path d="${lines}"/><path d="${ears}"/>`;
  }

  function shell(label) {
    const a11y = label === '' ? 'aria-hidden="true"' : `role="img" aria-label="${esc(label || 'Vieira')}"`;
    return (
      `<svg class="art-shell" viewBox="0 0 100 100" ${a11y}>` +
      '<g fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">' +
      shellPaths() +
      '</g></svg>'
    );
  }

  const SHAPES = { circle: circleStamp, rect: rectStamp, scallop: scallopStamp, pending: pendingStamp };

  function stamp(config, label) {
    const render = SHAPES[config && config.shape] || pendingStamp;
    return render(config || {}, label || '');
  }

  const STATIC = {
    shell: (el) => shell(el.dataset.artLabel),
    friendship: () =>
      stamp(
        { shape: 'scallop', icon: 'heart', top: 'Sello de la', bottom: 'Amistad', color: 'terra' },
        'Sello de la amistad'
      ),
  };

  function ensureDefs() {
    if (document.getElementById('ink')) return;
    document.body.insertAdjacentHTML('afterbegin', INK_DEFS);
  }

  function hydrate(root) {
    ensureDefs();
    (root || document).querySelectorAll('[data-art]').forEach((el) => {
      const render = STATIC[el.dataset.art];
      if (!render) return;
      el.innerHTML = render(el);
      el.removeAttribute('data-art');
    });
  }

  C.art = { stamp, shell, hydrate, ensureDefs };
})();
