/* ---------- Portfolio Filtering Logic ---------- */
document.addEventListener("DOMContentLoaded", () => {
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const portfolioData = Array.isArray(window.TRICIL_GALLERY)
    ? window.TRICIL_GALLERY.map((item) => ({
        src: item.src,
        category: item.cat,
        title: item.title,
        caption: item.caption,
        kicker: item.category
      }))
    : [];

  const grid = document.querySelector('.portfolio-grid');
  if(!grid) return;

  // Render items
  portfolioData.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = "portfolio-item " + item.category;
    const title = escapeHtml(item.title);
    const kicker = escapeHtml(item.kicker || item.title);
    const cap = item.caption
      ? ` data-caption="${title}" data-category="${kicker}"`
      : '';
    div.innerHTML = `
      <div class="portfolio-item-inner tilt3d" style="border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.08); position: relative; aspect-ratio: 1/1; cursor: pointer;">
        <img src="Assets/images/Porthfolio/${encodeURIComponent(item.src)}" alt="${title}"${cap} style="width: 100%; height: 100%; object-fit: contain; padding: 1rem; transition: transform 0.5s ease;" class="zoomable portfolio-img" loading="${i < 8 ? 'eager' : 'lazy'}" decoding="async" />
        <div class="portfolio-overlay" onclick="this.previousElementSibling.click()">
          <span class="portfolio-title">${title}</span>
          <div class="portfolio-zoom-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(div);
  });

  // Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const filterValue = e.target.getAttribute('data-filter');

      items.forEach(item => {
        if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
          item.classList.remove('is-hidden');
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
            item.classList.add('is-hidden');
          }, 400); 
        }
      });
    });
  });
});
