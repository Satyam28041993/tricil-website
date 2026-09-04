/* ============================================================
   TRICIL — small gravure cylinder that follows behind the
   native cursor, with a light CMYK rocket-smoke trail.
   Desktop mouse only. Skips touch, narrow viewports, and
   prefers-reduced-motion.
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
    initFollower(e);
  }

  window.addEventListener('pointermove', onIntent, { passive: true });
  window.addEventListener('mousemove', onIntent, { passive: true });

  function initFollower(first) {
    const root = document.documentElement;
    root.classList.add('has-cmyk-cursor');

    const layer = document.createElement('div');
    layer.className = 'cmyk-smoke-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);

    const COLORS = ['#00A3D9', '#E31C79', '#FFED00', '#2a3f6b'];
    const POOL = 40;
    const puffs = [];
    for (let i = 0; i < POOL; i++) {
      const span = document.createElement('span');
      span.className = 'cmyk-smoke';
      layer.appendChild(span);
      puffs.push({
        el: span, life: 0, x: 0, y: 0, vx: 0, vy: 0, size: 12
      });
    }

    const el = document.createElement('div');
    el.className = 'cmyk-cursor is-on';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML =
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
          '<ellipse cx="24" cy="28" rx="7" ry="16" fill="url(#cylChrome)"/>' +
          '<rect x="24" y="13" width="80" height="7" fill="rgba(255,255,255,0.28)"/>' +
        '</g>' +
        '<ellipse cx="104" cy="28" rx="8" ry="18" fill="url(#cylChromeDark)"/>' +
        '<rect x="110" y="21" width="16" height="14" rx="3" fill="url(#cylChrome)"/>' +
      '</svg>';
    document.body.appendChild(el);

    const rollEl = el.querySelector('.cmyk-cursor__roll');
    const INTERACTIVE =
      'a, button, .btn, .card, .svc, .zoomable, .filter-btn, .work-filter, .work-tile, .wa-float, .chip, .nav__burger, .lightbox-close, .lightbox-nav, .partner, label, summary';
    const NATIVE_TEXT = 'input, textarea, select, [contenteditable="true"]';
    const HALF_W = 24;
    const HALF_H = 11;

    let mx = first && typeof first.clientX === 'number' ? first.clientX : window.innerWidth / 2;
    let my = first && typeof first.clientY === 'number' ? first.clientY : window.innerHeight / 2;
    let x = mx;
    let y = my;
    let px = mx;
    let py = my;
    let roll = 0;
    let emitAcc = 0;
    let colorI = 0;
    let hovering = false;

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

    function emit(px0, py0, dx, dy) {
      let p = null;
      for (let i = 0; i < puffs.length; i++) {
        if (puffs[i].life <= 0) { p = puffs[i]; break; }
      }
      if (!p) return;
      const len = Math.hypot(dx, dy) || 1;
      p.life = 1;
      p.x = px0 - (dx / len) * 10;
      p.y = py0 - (dy / len) * 10;
      p.vx = -(dx / len) * (0.55 + Math.random() * 0.7) + (Math.random() - 0.5) * 0.35;
      p.vy = -(dy / len) * (0.55 + Math.random() * 0.7) + (Math.random() - 0.5) * 0.35;
      p.size = 11 + Math.random() * 10;
      p.el.style.background = COLORS[colorI++ % COLORS.length];
      p.el.style.width = p.size + 'px';
      p.el.style.height = p.size + 'px';
      p.el.style.marginLeft = (-p.size / 2) + 'px';
      p.el.style.marginTop = (-p.size / 2) + 'px';
    }

    function onMove(e) {
      if (e.pointerType === 'touch') return;
      mx = e.clientX;
      my = e.clientY;
      el.classList.add('is-on');
      const nativeField = isNativeField(targetOf(e));
      const nextHover = isInteractive(targetOf(e));
      hovering = nextHover;
      el.classList.toggle('is-ink', hovering);
      el.classList.toggle('is-hidden', nativeField);
      layer.classList.toggle('is-hidden', nativeField);
    }

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', () => {
      el.classList.remove('is-on', 'is-ink');
    });

    window.addEventListener('resize', () => {
      const off = window.innerWidth <= 720;
      el.classList.toggle('is-hidden', off);
      layer.classList.toggle('is-hidden', off);
    });

    function tick() {
      x += (mx - x) * 0.14;
      y += (my - y) * 0.14;
      const dx = x - px;
      const dy = y - py;
      const speed = Math.hypot(dx, dy);
      roll += Math.min(speed, 24) * 0.7;
      px = x;
      py = y;

      const len = speed || 1;
      const behind = 20;
      const ox = speed > 0.15 ? -(dx / len) * behind : -14;
      const oy = speed > 0.15 ? -(dy / len) * behind : 6;
      const tilt = Math.max(-16, Math.min(16, dx * 1.6));

      el.style.transform =
        'translate3d(' + (x - HALF_W + ox) + 'px,' + (y - HALF_H + oy) + 'px,0) rotate(' + (tilt - 12) + 'deg)';

      if (rollEl) {
        rollEl.setAttribute('transform', 'translate(' + (-(roll % 80)) + ' 0)');
      }

      if (speed > 0.9) {
        emitAcc += speed;
        while (emitAcc > 2.8) {
          emitAcc -= 2.8;
          emit(x + ox, y + oy, dx, dy);
        }
      } else {
        emitAcc = Math.max(0, emitAcc - 0.4);
      }

      for (let i = 0; i < puffs.length; i++) {
        const p = puffs[i];
        if (p.life <= 0) {
          if (p.el.style.opacity !== '0') p.el.style.opacity = '0';
          continue;
        }
        p.life -= 0.016;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        const t = Math.max(0, p.life);
        const scale = 1 + (1 - t) * 2.4;
        p.el.style.transform = 'translate3d(' + p.x + 'px,' + p.y + 'px,0) scale(' + scale + ')';
        p.el.style.opacity = String(t * 0.42);
      }

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
