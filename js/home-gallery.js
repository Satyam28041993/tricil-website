/* Home printed-work gallery — bento wall + filters
   Tiles stay visible by default. Scroll polish is optional and
   must never leave photos at opacity 0 (that hid the live grid). */
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
            ' loading="' + (i < 8 ? 'eager' : 'lazy') + '" decoding="async" />' +
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
      tile.classList.toggle('is-hidden', !match);
      if (match) visible += 1;
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
})();
