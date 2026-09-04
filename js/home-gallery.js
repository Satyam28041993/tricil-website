/* Home printed-work gallery — bento wall, filters, GSAP reveal */
(function () {
  const grid = document.getElementById('work-gallery-grid');
  const data = window.TRICIL_GALLERY;
  if (!grid || !data || !data.length) return;

  const filters = document.querySelectorAll('.work-filter');
  const countEl = document.querySelector('.work-gallery__count');
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
            ' loading="' + (i < 4 ? 'eager' : 'lazy') + '" decoding="async" />' +
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

  function setCount(n, total, filter) {
    if (!countEl) return;
    if (filter === 'all') {
      countEl.textContent = total + ' printed works';
    } else {
      countEl.textContent = n + ' of ' + total;
    }
  }

  setCount(data.length, data.length, 'all');

  function applyFilter(filter) {
    const tiles = grid.querySelectorAll('.work-tile');
    let visible = 0;
    grid.classList.toggle('work-gallery__grid--flat', filter !== 'all');

    tiles.forEach(function (tile) {
      const match = filter === 'all' || tile.getAttribute('data-cat') === filter;
      if (match) {
        visible += 1;
        tile.classList.remove('is-hidden');
        if (!reduced && typeof gsap !== 'undefined') {
          gsap.fromTo(tile, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', overwrite: true });
        } else {
          tile.style.opacity = '1';
          tile.style.visibility = 'visible';
        }
      } else if (!reduced && typeof gsap !== 'undefined') {
        gsap.to(tile, {
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power1.in',
          overwrite: true,
          onComplete: function () { tile.classList.add('is-hidden'); }
        });
      } else {
        tile.classList.add('is-hidden');
      }
    });

    setCount(visible, data.length, filter);

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

  if (reduced || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.set('.work-tile', { autoAlpha: 0, y: 28 });
  ScrollTrigger.batch('.work-tile', {
    start: 'top 92%',
    interval: 0.12,
    batchMax: 6,
    onEnter: function (batch) {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
        overwrite: true
      });
    }
  });
})();
