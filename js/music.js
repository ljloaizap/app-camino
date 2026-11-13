/*
 * Ambient sound (YouTube). The player is prepared silently on load and only plays after a user click.
 * It lives outside <main>, so in-app navigation (app.js) never interrupts it.
 */
(function () {
  'use strict';
  const C = (window.CAMINO = window.CAMINO || {});

  const VIDEO_ID = 'PvZUKykChFc';
  const API_SRC = 'https://www.youtube.com/iframe_api';
  const LOAD_TIMEOUT = 15000;
  const PLAY_TIMEOUT = 5000;
  const LABELS = {
    off: 'Activar sonido',
    loading: 'Cargando…',
    on: 'Silenciar',
    blocked: 'Pulsa para activar',
    unavailable: 'Sonido no disponible',
  };

  const buttons = Array.from(document.querySelectorAll('[data-sound-toggle]'));

  let player = null;
  let ready = false;
  let wantPlay = false;
  let state = 'off';
  let loadTimer = null;
  let playTimer = null;

  function setState(next) {
    state = next;
    buttons.forEach((btn) => {
      btn.dataset.state = next;
      btn.setAttribute('aria-pressed', String(next === 'on'));
      btn.disabled = next === 'unavailable';
      const label = btn.querySelector('[data-sound-label]');
      if (label) label.textContent = LABELS[next];
    });
  }

  function fail() {
    clearTimeout(loadTimer);
    clearTimeout(playTimer);
    wantPlay = false;
    setState('unavailable');
  }

  function startPlayback() {
    wantPlay = true;
    try {
      player.unMute();
      player.setVolume(60);
      player.playVideo();
    } catch (err) {
      fail();
      return;
    }
    setState('loading');
    clearTimeout(playTimer);
    playTimer = setTimeout(() => {
      if (state === 'loading') setState('blocked');
    }, PLAY_TIMEOUT);
  }

  function pause() {
    wantPlay = false;
    clearTimeout(playTimer);
    if (!ready) {
      setState('off');
      return;
    }
    try {
      player.pauseVideo();
    } catch (err) {
      fail();
      return;
    }
    setState('off');
  }

  function play() {
    if (state === 'unavailable' || state === 'on') return;
    if (!ready) {
      wantPlay = true;
      setState('loading');
      return;
    }
    startPlayback();
  }

  function onReady() {
    ready = true;
    clearTimeout(loadTimer);
    const frame = player.getIframe && player.getIframe();
    if (frame) frame.setAttribute('tabindex', '-1');
    if (wantPlay) startPlayback();
    else setState('off');
  }

  function onStateChange(event) {
    const S = window.YT.PlayerState;
    if (event.data === S.PLAYING) {
      clearTimeout(playTimer);
      setState('on');
    } else if (event.data === S.PAUSED || event.data === S.CUED) {
      // A pause nobody asked for means the browser blocked playback with sound.
      if (wantPlay) {
        clearTimeout(playTimer);
        setState('blocked');
      } else if (state === 'on') {
        setState('off');
      }
    }
  }

  function createPlayer() {
    const wrap = document.createElement('div');
    const host = document.createElement('div');
    wrap.className = 'ambient-player';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.setAttribute('data-persist', '');
    wrap.append(host);
    document.body.append(wrap);
    try {
      player = new window.YT.Player(host, {
        width: 200,
        height: 200,
        videoId: VIDEO_ID,
        playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, loop: 1, playlist: VIDEO_ID, playsinline: 1, rel: 0 },
        events: { onReady, onStateChange, onError: fail },
      });
    } catch (err) {
      fail();
    }
  }

  function preparePlayer() {
    loadTimer = setTimeout(() => {
      if (!ready) fail();
    }, LOAD_TIMEOUT);

    if (window.YT && window.YT.Player) {
      createPlayer();
      return;
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === 'function') previous();
      createPlayer();
    };
    const script = document.createElement('script');
    script.src = API_SRC;
    script.async = true;
    script.onerror = fail;
    document.head.append(script);
  }

  function toggle() {
    if (state === 'on' || state === 'loading') pause();
    else play();
  }

  buttons.forEach((btn) => btn.addEventListener('click', toggle));
  setState('off');
  preparePlayer();

  C.music = { play };
})();
