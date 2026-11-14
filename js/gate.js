/*
 * Client-side access gate (hardcoded UUID). Obfuscation only — not server security.
 */
(function () {
  'use strict';

  const C = (window.CAMINO = window.CAMINO || {});

  const ACCESS_UUID = '8f2c6d1a-9e4b-4c7f-a3d8-1e5b7c9d2f4a';
  const STORAGE_KEY = 'camino.access';
  const LEAF_KEY = 'camino.credentialLeaf';
  const DENIED_PAGE = 'en-camino.html';
  const LOGOUT_PAGE = 'logout.html';

  function pageIs(name) {
    const path = window.location.pathname;
    return path.endsWith(`/${name}`) || path.endsWith(name);
  }

  function normalizeCode(value) {
    return String(value || '')
      .trim()
      .toLowerCase();
  }

  function isAuthorized() {
    return (
      localStorage.getItem(STORAGE_KEY) === ACCESS_UUID ||
      sessionStorage.getItem(STORAGE_KEY) === ACCESS_UUID
    );
  }

  function grant(code) {
    if (normalizeCode(code) !== ACCESS_UUID) return false;
    localStorage.setItem(STORAGE_KEY, ACCESS_UUID);
    sessionStorage.removeItem(STORAGE_KEY);
    return true;
  }

  function unlockUi() {
    document.documentElement.dataset.access = 'granted';
    document.body.classList.remove('is-locked');
    const gate = document.querySelector('.access-gate');
    if (gate) gate.remove();
    document.querySelectorAll('[data-access-hide]').forEach((node) => node.removeAttribute('aria-hidden'));
  }

  function lockUi() {
    document.body.classList.add('is-locked');
    document.querySelectorAll('main, .site-header, .sound-dock').forEach((node) => {
      if (!node.hasAttribute('data-access-hide')) node.setAttribute('aria-hidden', 'true');
    });
  }

  function redirectDenied() {
    const base = window.location.href.replace(/[^/]*$/, '');
    window.location.assign(base + DENIED_PAGE);
  }

  function buildGate() {
    const gate = document.createElement('div');
    gate.className = 'access-gate';
    gate.setAttribute('role', 'dialog');
    gate.setAttribute('aria-modal', 'true');
    gate.setAttribute('aria-labelledby', 'access-gate-title');

    const panel = document.createElement('div');
    panel.className = 'access-gate__panel paper';

    const title = document.createElement('h1');
    title.id = 'access-gate-title';
    title.className = 'access-gate__title';
    title.textContent = '¿Exploramos el Camino?';

    const lead = document.createElement('p');
    lead.className = 'access-gate__lead';
    lead.textContent = 'Introduce la clave para acceder a la credencial.';

    const form = document.createElement('form');
    form.className = 'access-gate__form';
    form.setAttribute('novalidate', '');

    const label = document.createElement('label');
    label.className = 'access-gate__label';
    label.htmlFor = 'access-code';
    label.textContent = 'Clave de acceso';

    const input = document.createElement('input');
    input.className = 'access-gate__input';
    input.id = 'access-code';
    input.name = 'code';
    input.type = 'text';
    input.inputMode = 'text';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.required = true;
    input.setAttribute('aria-describedby', 'access-gate-hint');

    const hint = document.createElement('p');
    hint.id = 'access-gate-hint';
    hint.className = 'access-gate__hint';
    hint.textContent = 'Formato UUID';

    const btn = document.createElement('button');
    btn.className = 'btn access-gate__submit';
    btn.type = 'submit';
    btn.textContent = 'Entrar';

    form.append(label, input, hint, btn);
    panel.append(title, lead, form);
    gate.append(panel);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (grant(input.value)) {
        unlockUi();
        window.dispatchEvent(new CustomEvent('camino:unlocked'));
        return;
      }
      redirectDenied();
    });

    return gate;
  }

  function showGate() {
    lockUi();
    const existing = document.querySelector('.access-gate');
    if (existing) return;
    document.body.append(buildGate());
    const input = document.querySelector('.access-gate__input');
    if (input) input.focus();
  }

  function clearAccess() {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(LEAF_KEY);
    delete document.documentElement.dataset.access;
    document.body.classList.add('is-locked');
    const gate = document.querySelector('.access-gate');
    if (gate) gate.remove();
  }

  function logoutAndRedirect() {
    clearAccess();
    window.location.replace('index.html');
  }

  function guardAccess() {
    if (pageIs(LOGOUT_PAGE) || pageIs(DENIED_PAGE)) return Promise.resolve(false);
    if (isAuthorized()) {
      unlockUi();
      return Promise.resolve(true);
    }
    return new Promise((resolve) => {
      showGate();
      const onUnlock = () => {
        window.removeEventListener('camino:unlocked', onUnlock);
        resolve(true);
      };
      window.addEventListener('camino:unlocked', onUnlock);
    });
  }

  C.isAccessGranted = isAuthorized;
  C.clearAccess = clearAccess;
  C.guardAccess = guardAccess;

  C.requireAccess = function requireAccess() {
    return new Promise((resolve) => {
      if (pageIs(LOGOUT_PAGE)) {
        logoutAndRedirect();
        resolve(false);
        return;
      }

      if (pageIs(DENIED_PAGE)) {
        if (isAuthorized()) {
          window.location.replace('index.html');
          resolve(false);
          return;
        }
        resolve(false);
        return;
      }

      if (isAuthorized()) {
        unlockUi();
        resolve(true);
        return;
      }

      showGate();

      const onUnlock = () => {
        window.removeEventListener('camino:unlocked', onUnlock);
        resolve(true);
      };
      window.addEventListener('camino:unlocked', onUnlock);
    });
  };

  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY || event.newValue) return;
    clearAccess();
    if (!pageIs(LOGOUT_PAGE) && !pageIs(DENIED_PAGE)) showGate();
  });

  window.addEventListener('pageshow', (event) => {
    if (event.persisted && !isAuthorized()) {
      clearAccess();
      showGate();
    }
  });

  if (pageIs(LOGOUT_PAGE)) logoutAndRedirect();
})();