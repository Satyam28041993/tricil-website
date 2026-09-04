/* ---------- Portfolio Filtering Logic ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const fallback = [
    {src: 'BOPP FILM.webp', category: 'bopp', title: 'BOPP FILM'},
    {src: 'BOPP FILM1.webp', category: 'bopp', title: 'BOPP FILM'},
    {src: 'BOPP FILM2.webp', category: 'bopp', title: 'BOPP FILM'},
    {src: 'LAMINATED POUCHES.webp', category: 'pouches', title: 'LAMINATED POUCHES'},
    {src: 'LAMINATED POUCHES1.webp', category: 'pouches', title: 'LAMINATED POUCHES'},
    {src: 'LAMINATED POUCHES10.webp', category: 'pouches', title: 'LAMINATED POUCHES'},
    {src: 'LAMINATED POUCHES11.webp', category: 'pouches', title: 'LAMINATED POUCHES'},
    {src: 'LAMINATED POUCHES2.webp', category: 'pouches', title: 'LAMINATED POUCHES'},
    {src: 'LAMINATED POUCHES3.webp', category: 'pouches', title: 'LAMINATED POUCHES'},
    {src: 'LAMINATED POUCHES4.webp', category: 'pouches', title: 'LAMINATED POUCHES'},
    {src: 'LAMINATED POUCHES5.webp', category: 'pouches', title: 'LAMINATED POUCHES'},
    {src: 'LAMINATED POUCHES6.webp', category: 'pouches', title: 'LAMINATED POUCHES'},
    {src: 'LAMINATED POUCHES7.webp', category: 'pouches', title: 'LAMINATED POUCHES'},
    {src: 'LAMINATED POUCHES8.webp', category: 'pouches', title: 'LAMINATED POUCHES'},
    {src: 'LAMINATED POUCHES9.webp', category: 'pouches', title: 'LAMINATED POUCHES'},
    {src: 'LAMINATED ROLLS.webp', category: 'rolls', title: 'LAMINATED ROLLS'},
    {src: 'LAMINATED ROLLS1.webp', category: 'rolls', title: 'LAMINATED ROLLS'},
    {src: 'LAMINATED ROLLS2.webp', category: 'rolls', title: 'LAMINATED ROLLS'},
    {src: 'LAMINATED ROLLS3.webp', category: 'rolls', title: 'LAMINATED ROLLS'},
    {src: 'LAMINATED ROLLS4.webp', category: 'rolls', title: 'LAMINATED ROLLS'},
    {src: 'LAMINATED ROLLS5.webp', category: 'rolls', title: 'LAMINATED ROLLS'},
    {src: 'LAMINATED ROLLS6.webp', category: 'rolls', title: 'LAMINATED ROLLS'},
    {src: 'LAMINATED ROLLS7.webp', category: 'rolls', title: 'LAMINATED ROLLS'},
    {src: 'LAMINATED ROLLS8.webp', category: 'rolls', title: 'LAMINATED ROLLS'},
    {src: 'PRINTED BOPP.webp', category: 'printed', title: 'PRINTED BOPP'},
    {src: 'PRINTED BOPP1.webp', category: 'printed', title: 'PRINTED BOPP'},
    {src: 'PRINTED BOPP2.webp', category: 'printed', title: 'PRINTED BOPP'},
    {src: 'PVC.webp', category: 'pvc', title: 'PVC SHRINK FILM'},
    {src: 'PVC1.webp', category: 'pvc', title: 'PVC SHRINK FILM'},
    {src: 'PVC2.webp', category: 'pvc', title: 'PVC SHRINK FILM'}
  ];

  const portfolioData = Array.isArray(window.TRICIL_GALLERY)
    ? window.TRICIL_GALLERY.map((item) => ({
        src: item.src,
        category: item.cat,
        title: item.title,
        caption: item.caption,
        kicker: item.category
      }))
    : fallback;

  const grid = document.querySelector('.portfolio-grid');
  if(!grid) return;

  // Render items
  portfolioData.forEach(item => {
    const div = document.createElement('div');
    div.className = "portfolio-item " + item.category;
    const cap = item.caption ? ` data-caption="${item.title}" data-category="${item.kicker || item.title}"` : '';
    div.innerHTML = `
      <div class="portfolio-item-inner tilt3d" style="border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.08); position: relative; aspect-ratio: 1/1; cursor: pointer;">
        <img src="Assets/images/Porthfolio/${encodeURIComponent(item.src)}" alt="${item.title}"${cap} style="width: 100%; height: 100%; object-fit: contain; padding: 1rem; transition: transform 0.5s ease;" class="zoomable portfolio-img" />
        <div class="portfolio-overlay" onclick="this.previousElementSibling.click()">
          <span class="portfolio-title">${item.title}</span>
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
