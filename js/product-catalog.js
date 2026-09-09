document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.catalog-chip');
  const cards = document.querySelectorAll('.catalog-card');
  const search = document.getElementById('catalog-search');
  const showing = document.getElementById('catalog-showing');
  const count = document.getElementById('catalog-count');
  if (!chips.length || !cards.length) return;

  let active = 'all';

  const apply = () => {
    const q = (search ? search.value : '').trim().toLowerCase();
    let visible = 0;
    let label = 'All Products';
    chips.forEach((chip) => {
      if (chip.classList.contains('active')) label = chip.textContent.trim();
    });
    cards.forEach((card) => {
      const cat = card.getAttribute('data-cat') || '';
      const text = (card.textContent || '').toLowerCase();
      const matchCat = active === 'all' || cat === active;
      const matchQ = !q || text.includes(q);
      const show = matchCat && matchQ;
      card.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });
    if (showing) showing.textContent = label;
    if (count) count.textContent = String(visible);
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      active = chip.getAttribute('data-filter') || 'all';
      apply();
    });
  });

  if (search) search.addEventListener('input', apply);
  apply();
});
