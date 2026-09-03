/* ============================================================
   TRICIL — CMYK rotogravure cylinder cursor
   Starts on real mouse movement (desktop). Skips touch, narrow
   viewports, and prefers-reduced-motion.
   Markup is injected so every page can include this file.
   ============================================================ */
(function () {
  let started = false;

  function allowStart(e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (window.innerWidth <= 720) return false;
    if (e && e.pointerType === 'touch') return false;
    return true;
  }

  function onIntent(e) {
    if (started || !allowStart(e)) return;
    started = true;
    window.removeEventListener('pointermove', onIntent);
    window.removeEventListener('mousemove', onIntent);
    initCursor(e);
  }

  window.addEventListener('pointermove', onIntent, { passive: true });
  window.addEventListener('mousemove', onIntent, { passive: true });

  function initCursor(first) {
    const root = document.documentElement;
    root.classList.add('has-cmyk-cursor');

    const el = document.createElement('div');
    el.className = 'cmyk-cursor is-on';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML =
      '<div class="cmyk-cursor__ring"></div>' +
      '<div class="cmyk-cursor__burst">' +
        '<span class="cmyk-cursor__dot cmyk-cursor__dot--c"></span>' +
        '<span class="cmyk-cursor__dot cmyk-cursor__dot--m"></span>' +
        '<span class="cmyk-cursor__dot cmyk-cursor__dot--y"></span>' +
        '<span class="cmyk-cursor__dot cmyk-cursor__dot--k"></span>' +
      '</div>' +
      '<svg class="cmyk-cursor__svg" viewBox="0 0 128 56" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
          '<linearGradient id="cylChrome" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#f8f9fb"/>' +
            '<stop offset="28%" stop-color="#c5ccd6"/>' +
            '<stop offset="48%" stop-color="#8b939f"/>' +
            '<stop offset="62%" stop-color="#eef1f4"/>' +
            '<stop offset="100%" stop-color="#6a7380"/>' +
          '</linearGradient>' +
          '<linearGradient id="cylChromeDark" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#dfe3e8"/>' +
            '<stop offset="45%" stop-color="#7a8490"/>' +
            '<stop offset="100%" stop-color="#3e4650"/>' +
          '</linearGradient>' +
          '<linearGradient id="cylBands" x1="0" y1="0" x2="1" y2="0.18">' +
            '<stop offset="0%" stop-color="#00A3D9"/>' +
            '<stop offset="25%" stop-color="#E31C79"/>' +
            '<stop offset="50%" stop-color="#FFED00"/>' +
            '<stop offset="75%" stop-color="#1A1A1A"/>' +
            '<stop offset="100%" stop-color="#00A3D9"/>' +
          '</linearGradient>' +
          '<pattern id="cylCells" width="3.2" height="3.2" patternUnits="userSpaceOnUse">' +
            '<circle cx="1.6" cy="1.6" r="0.72" fill="rgba(0,0,0,0.28)"/>' +
          '</pattern>' +
          '<clipPath id="cylBarrel">' +
            '<rect x="24" y="12" width="80" height="32" rx="16"/>' +
          '</clipPath>' +
        '</defs>' +
        '<rect x="2" y="21" width="16" height="14" rx="3" fill="url(#cylChrome)"/>' +
        '<ellipse cx="24" cy="28" rx="8" ry="18" fill="url(#cylChromeDark)"/>' +
        '<g clip-path="url(#cylBarrel)">' +
          '<g class="cmyk-cursor__roll">' +
            '<rect x="24" y="12" width="240" height="32" fill="url(#cylBands)"/>' +
            '<rect x="24" y="12" width="240" height="32" fill="url(#cylCells)"/>' +
          '</g>' +
          '<rect class="cmyk-cursor__blade" x="20" y="12" width="8" height="32" fill="rgba(255,255,255,0.78)"/>' +
          '<ellipse cx="24" cy="28" rx="7" ry="16" fill="url(#cylChrome)"/>' +
          '<rect x="24" y="13" width="80" height="7" fill="rgba(255,255,255,0.28)"/>' +
        '</g>' +
        '<ellipse cx="104" cy="28" rx="8" ry="18" fill="url(#cylChromeDark)"/>' +
        '<rect x="110" y="21" width="16" height="14" rx="3" fill="url(#cylChrome)"/>' +
        '<ellipse cx="24" cy="28" rx="3.2" ry="10" fill="rgba(0,0,0,0.18)"/>' +
        '<ellipse cx="104" cy="28" rx="3.2" ry="10" fill="rgba(255,255,255,0.22)"/>' +
      '</svg>';
    document.body.appendChild(el);

    const rollEl = el.querySelector('.cmyk-cursor__roll');
    const INTERACTIVE =
      'a, button, .btn, .card, .svc, .zoomable, .filter-btn, .wa-float, .chip, .nav__burger, .lightbox-close, .lightbox-nav, .partner, .acc-panel, label, summary';
    const NATIVE_TEXT = 'input, textarea, select, [contenteditable="true"]';

    let mx = first && typeof first.clientX === 'number' ? first.clientX : window.innerWidth / 2;
    let my = first && typeof first.clientY === 'number' ? first.clientY : window.innerHeight / 2;
    let x = mx;
    let y = my;
    let px = mx;
    let py = my;
    let roll = 0;
    let hovering = false;
    let burstTimer = 0;

    function targetOf(e) {
      return e && e.target;
    }

    function isInteractive(node) {
      if (!node || node === document || node === root) return false;
      const t = node.nodeType === 1 ? node : node.parentElement;
      if (!t) return false;
      if (t.closest(NATIVE_TEXT)) return false;
      return Boolean(t.closest(INTERACTIVE));
    }

    function isNativeField(node) {
      if (!node) return false;
      const t = node.nodeType === 1 ? node : node.parentElement;
      return Boolean(t && t.closest(NATIVE_TEXT));
    }

    function onMove(e) {
      if (e.pointerType === 'touch') return;
      mx = e.clientX;
      my = e.clientY;
      el.classList.add('is-on');
      const nextHover = isInteractive(targetOf(e));
      const nativeField = isNativeField(targetOf(e));
      if (nextHover !== hovering) {
        hovering = nextHover;
        el.classList.toggle('is-ink', hovering);
        if (hovering) {
          el.classList.remove('is-burst');
          void el.offsetWidth;
          el.classList.add('is-burst');
          clearTimeout(burstTimer);
          burstTimer = setTimeout(() => el.classList.remove('is-burst'), 520);
        }
      }
      el.classList.toggle('is-hidden', nativeField);
    }

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', () => el.classList.remove('is-on', 'is-ink'));
    document.addEventListener('mousedown', () => el.classList.add('is-down'));
    document.addEventListener('mouseup', () => el.classList.remove('is-down'));

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 720) {
        root.classList.remove('has-cmyk-cursor');
        el.classList.add('is-hidden');
      } else {
        root.classList.add('has-cmyk-cursor');
        el.classList.remove('is-hidden');
      }
    });

    function tick() {
      x += (mx - x) * 0.22;
      y += (my - y) * 0.22;
      const dx = x - px;
      const dy = y - py;
      const speed = Math.hypot(dx, dy);
      roll += Math.min(speed, 28) * 0.55;
      px = x;
      py = y;

      const tilt = Math.max(-18, Math.min(18, dx * 1.4));
      el.style.transform =
        'translate3d(' + (x - 44) + 'px,' + (y - 18) + 'px,0) rotate(' + (tilt - 18) + 'deg)';
      if (rollEl) {
        const shift = roll % 80;
        rollEl.setAttribute('transform', 'translate(' + (-shift) + ' 0)');
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
