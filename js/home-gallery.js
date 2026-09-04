/* Home printed-work gallery — horizontal slider
   Tiles stay fully visible (never autoAlpha 0). Wheel/drag/arrows
   move the strip; click opens the lightbox. */
(function () {
  const grid = document.getElementById('work-gallery-grid');
  const viewport = document.getElementById('work-gallery-viewport');
  const data = window.TRICIL_GALLERY;
  if (!grid || !data || !data.length) return;

  const filters = document.querySelectorAll('.work-filter');
  const countEl = document.querySelector('.work-gallery__count');
  const prevBtn = document.getElementById('work-gallery-prev');
  const nextBtn = document.getElementById('work-gallery-next');
  const progressFill = document.querySelector('.work-gallery-progress__fill');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function srcFor(file) {
    return 'Assets/images/Porthfolio/' + encodeURIComponent(file);
  }

  grid.innerHTML = data.map(function (item, i) {
    const n = String(i + 1).padStart(2, '0');
    const classes = ['work-tile'];
    if (item.size === 'feature') classes.push('work-tile--feature');
    if (item.tone === 'dark') classes.push('work-tile--dark');
    const alt = item.title + ' — ' + item.caption;
    return (
      '<figure class="' + classes.join(' ') + '" data-cat="' + item.cat + '">' +
        '<div class="work-tile__media">' +
          '<img class="zoomable" src="' + srcFor(item.src) + '" alt="' + escapeHtml(alt) + '"' +
            ' data-caption="' + escapeHtml(item.title) + '"' +
            ' data-category="' + escapeHtml(item.category) + '"' +
            ' width="1200" height="1000"' +
            ' loading="' + (i < 6 ? 'eager' : 'lazy') + '" decoding="async" />' +
          '<span class="work-tile__zoom" aria-hidden="true">Click to zoom</span>' +
        '</div>' +
        '<figcaption class="work-tile__cap">' +
          '<span class="work-tile__num">' + n + '</span>' +
          '<span class="work-tile__copy">' +
            '<span class="work-tile__cat">' + escapeHtml(item.category) + '</span>' +
            '<strong class="work-tile__title">' + escapeHtml(item.title) + '</strong>' +
          '</span>' +
        '</figcaption>' +
      '</figure>'
    );
    }).join('');

  grid.style.display = 'flex';
  grid.style.flexWrap = 'nowrap';
  grid.style.width = 'max-content';
  if (viewport) {
    viewport.style.overflowX = 'auto';
    viewport.style.minWidth = '0';
    viewport.style.maxWidth = '100%';
  }

  function setCount(n, total, filter) {
    if (!countEl) return;
    if (filter === 'all') {
      countEl.textContent = total + ' printed works';
    } else {
      countEl.textContent = n + ' of ' + total;
    }
  }

  setCount(data.length, data.length, 'all');

  function visibleTiles() {
    return Array.prototype.filter.call(grid.querySelectorAll('.work-tile'), function (tile) {
      return !tile.classList.contains('is-hidden');
    });
  }

  function maxScroll() {
    if (!viewport) return 0;
    return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  }

  function updateChrome() {
    if (!viewport) return;
    const max = maxScroll();
    const p = max > 1 ? viewport.scrollLeft / max : 0;
    if (progressFill) progressFill.style.width = Math.max(6, p * 100) + '%';
    const atStart = viewport.scrollLeft < 10;
    const atEnd = viewport.scrollLeft >= max - 10;
    if (prevBtn) prevBtn.disabled = atStart;
    if (nextBtn) nextBtn.disabled = atEnd || max < 8;

    const tiles = visibleTiles();
    if (!tiles.length) return;
    const mid = viewport.getBoundingClientRect().left + viewport.clientWidth * 0.36;
    let best = tiles[0];
    let bestDist = Infinity;
    for (let i = 0; i < tiles.length; i++) {
      const r = tiles[i].getBoundingClientRect();
      const dist = Math.abs(r.left + r.width * 0.45 - mid);
      tiles[i].classList.remove('is-focus');
      if (dist < bestDist) {
        bestDist = dist;
        best = tiles[i];
      }
    }
    best.classList.add('is-focus');
  }

  function scrollByDir(dir) {
    if (!viewport) return;
    const amount = Math.min(viewport.clientWidth * 0.82, 560);
    viewport.scrollBy({ left: dir * amount, behavior: reduced ? 'auto' : 'smooth' });
  }

  function applyFilter(filter) {
    const tiles = grid.querySelectorAll('.work-tile');
    let visible = 0;

    tiles.forEach(function (tile) {
      const match = filter === 'all' || tile.getAttribute('data-cat') === filter;
      tile.classList.toggle('is-hidden', !match);
      if (match) visible += 1;
    });

    setCount(visible, data.length, filter);
    if (viewport) viewport.scrollTo({ left: 0, behavior: 'auto' });
    requestAnimationFrame(updateChrome);

    if (typeof ScrollTrigger !== 'undefined') {
      requestAnimationFrame(function () { ScrollTrigger.refresh(); });
    }
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      applyFilter(btn.getAttribute('data-filter') || 'all');
    });
  });

  if (viewport) {
    viewport.addEventListener('scroll', updateChrome, { passive: true });
    window.addEventListener('resize', updateChrome);

    viewport.addEventListener('wheel', function (e) {
      const max = maxScroll();
      if (max < 8) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const next = viewport.scrollLeft + delta;
      const blocked = (delta < 0 && viewport.scrollLeft <= 0) || (delta > 0 && viewport.scrollLeft >= max - 1);
      if (blocked) return;
      e.preventDefault();
      e.stopPropagation();
      viewport.scrollLeft = next;
    }, { passive: false, capture: true });

    let pointerId = null;
    let startX = 0;
    let startScroll = 0;
    let dragging = false;
    let startTarget = null;
    let didCapture = false;

    viewport.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest && e.target.closest('a, button')) return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScroll = viewport.scrollLeft;
      dragging = false;
      didCapture = false;
      startTarget = e.target;
    });

    viewport.addEventListener('pointermove', function (e) {
      if (pointerId !== e.pointerId) return;
      const dx = e.clientX - startX;
      if (!dragging && Math.abs(dx) > 16) {
        dragging = true;
        viewport.classList.add('is-dragging');
        if (!didCapture) {
          didCapture = true;
          try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
        }
      }
      if (dragging) viewport.scrollLeft = startScroll - dx;
    });

    function endDrag(e) {
      if (pointerId == null) return;
      if (e && pointerId !== e.pointerId) return;
      const origin = startTarget;
      const wasDragging = dragging;
      pointerId = null;
      startTarget = null;
      dragging = false;
      didCapture = false;
      viewport.classList.remove('is-dragging');
      if (wasDragging) {
        viewport.addEventListener('click', function swallow(ev) {
          ev.preventDefault();
          ev.stopPropagation();
          viewport.removeEventListener('click', swallow, true);
        }, true);
        return;
      }
      const tile = origin && origin.closest && origin.closest('.work-tile');
      if (!tile) return;
      const img = tile.querySelector('img.zoomable');
      if (!img) return;
      requestAnimationFrame(function () {
        img.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      });
    }

    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);

    viewport.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollByDir(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByDir(-1); }
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { scrollByDir(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { scrollByDir(1); });

  grid.addEventListener('click', function (e) {
    const tile = e.target.closest('.work-tile');
    if (!tile || e.target.tagName === 'IMG') return;
    const img = tile.querySelector('img.zoomable');
    if (img) img.click();
  });

  let autoplayId = 0;
  function stopAutoplay() {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = 0;
    }
  }
  function startAutoplay() {
    stopAutoplay();
    if (reduced || !viewport) return;
    autoplayId = window.setInterval(function () {
      const max = maxScroll();
      if (max < 8) return;
      if (viewport.scrollLeft >= max - 12) {
        viewport.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollByDir(1);
      }
    }, 4200);
  }

  const stage = document.querySelector('.work-gallery__stage');
  if (stage) {
    stage.addEventListener('mouseenter', stopAutoplay);
    stage.addEventListener('mouseleave', startAutoplay);
    stage.addEventListener('focusin', stopAutoplay);
    stage.addEventListener('focusout', function (e) {
      if (!stage.contains(e.relatedTarget)) startAutoplay();
    });
    stage.addEventListener('pointerdown', stopAutoplay);
  }

  requestAnimationFrame(function () {
    updateChrome();
    startAutoplay();
  });
})();
