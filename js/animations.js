/* ============================================================
   TRICIL — Animations & Interactions
   Lenis smooth scroll + GSAP ScrollTrigger reveals + navbar,
   mobile menu, magnetic buttons, counters, split-text.
   ============================================================ */

/* ---------- Mobile menu + navbar ---------- */
(function () {
  const burger = document.querySelector('.nav__burger');
  const links = document.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      links.classList.toggle('open');
      burger.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }
})();

/* ---------- Lenis smooth scroll ---------- */
let lenis;
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof Lenis === 'undefined') return;
  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    prevent: function (node) {
      return !!(node && node.closest && node.closest('[data-lenis-prevent]'));
    }
  });
  window.lenis = lenis;
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // Sync with GSAP ScrollTrigger if present
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }
})();

/* ---------- Split text into words/letters for reveal ---------- */
(function () {
  document.querySelectorAll('[data-splt]').forEach((el) => {
    const words = el.textContent.trim().split(' ');
    el.innerHTML = words
      .map((w) => `<span class="word"><span>${w}&nbsp;</span></span>`)
      .join('');
  });
})();

/* ---------- Reveal on scroll (IntersectionObserver fallback + GSAP) ---------- */
(function () {
  const items = document.querySelectorAll('.reveal, [data-splt]');
  if (!items.length) return;

  // Stagger children with data-splt words
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const spans = el.querySelectorAll('.word > span');
          spans.forEach((s, i) => (s.style.transitionDelay = `${i * 0.05}s`));
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );
  items.forEach((el) => io.observe(el));
})();

/* ---------- GSAP parallax on blobs & scroll effects ---------- */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.blob').forEach((blob, i) => {
    gsap.to(blob, {
      yPercent: (i % 2 === 0 ? -1 : 1) * 25,
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1 },
    });
  });

  // Parallax any element with data-speed
  gsap.utils.toArray('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed);
    gsap.to(el, {
      yPercent: -speed * 12,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  const hero = document.querySelector('.hero-cinematic');
  if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.to('.hero-cinematic__text', {
      y: 70,
      opacity: 0.15,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
})();

/* ---------- Animated number counters ---------- */
(function () {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1600;
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  nums.forEach((n) => io.observe(n));
})();

/* ---------- Magnetic buttons ---------- */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches === false) return;
  const magnets = document.querySelectorAll('.btn, .nav__logo');
  magnets.forEach((m) => {
    m.addEventListener('mousemove', (e) => {
      const r = m.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      m.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });
    m.addEventListener('mouseleave', () => (m.style.transform = ''));
  });
})();

/* ---------- Navbar hide on scroll down ---------- */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > last && y > 200) nav.style.transform = 'translateX(-50%) translateY(-130%)';
    else nav.style.transform = 'translateX(-50%) translateY(0)';
    last = y;
  }, { passive: true });
})();

/* ---------- Contact form: opens email + WhatsApp fallback ---------- */
(function () {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const get = (id) => (form.querySelector('#' + id)?.value || '').trim();
    const name = get('name'), email = get('email'), phone = get('phone');
    const product = get('product'), message = get('message');

    const subject = 'Quote request — ' + (product || 'Packaging') + (name ? ' (' + name + ')' : '');
    const bodyLines = [
      'Name: ' + name,
      'Email: ' + email,
      'Phone: ' + phone,
      'Product of interest: ' + product,
      '',
      'Requirement:',
      message,
    ];
    const body = bodyLines.join('\n');
    const mailto = 'mailto:info@tricil.in?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    // Open the user's email client with the message pre-filled
    window.location.href = mailto;

    const btn = form.querySelector('button[type="submit"]');
    const old = btn.textContent;
    btn.textContent = 'Opening email… ✓';
    btn.style.background = 'var(--grad-mint)';
    setTimeout(() => { btn.textContent = old; btn.style.background = ''; }, 3000);
  });
})();

/* ---------- Set active nav link by current page ---------- */
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) a.classList.add('active');
  });
})();

/* ---------- 3D hero gallery: mouse tilt + scroll depth ---------- */
(function () {
  const stage = document.querySelector('.hero3d__stage');
  if (!stage) return;
  const cards = stage.querySelectorAll('.floatcard');
  let mx = 0, my = 0, tmx = 0, tmy = 0;

  window.addEventListener('mousemove', (e) => {
    tmx = (e.clientX / window.innerWidth - 0.5);
    tmy = (e.clientY / window.innerHeight - 0.5);
  });

  function loop() {
    mx += (tmx - mx) * 0.06;
    my += (tmy - my) * 0.06;
    cards.forEach((c, i) => {
      const depth = (i + 1) * 6;
      const rot = (i % 2 === 0 ? 1 : -1) * 4;
      c.style.transform =
        `translate3d(${mx * depth}px, ${my * depth}px, 0) rotateY(${mx * 10 + rot}deg) rotateX(${-my * 8}deg)`;
    });
    requestAnimationFrame(loop);
  }
  loop();

  // Scroll: gentle float-up parallax on cards
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    cards.forEach((c, i) => {
      gsap.to(c, {
        yPercent: (i % 2 === 0 ? -14 : 14),
        ease: 'none',
        scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    });
  }
})();

/* ---------- Rotating hero headline word ---------- */
(function () {
  const el = document.querySelector('[data-rotate]');
  if (!el) return;
  const words = JSON.parse(el.getAttribute('data-rotate'));
  el.textContent = words[0];
  el.style.display = 'inline-block';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let i = 0;
  el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  setInterval(() => {
    i = (i + 1) % words.length;
    el.style.opacity = 0;
    el.style.transform = 'translateY(12px)';
    setTimeout(() => {
      el.textContent = words[i];
      el.style.opacity = 1;
      el.style.transform = 'none';
    }, 350);
  }, 2600);
})();

/* ---------- Parallax Background Orbs ---------- */
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  setTimeout(() => {
    gsap.to('.orb-1', {
      yPercent: 40,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });
    gsap.to('.orb-2', {
      yPercent: -40,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });
  }, 100);
})();

/* ---------- Reusable 3D tilt for .tilt3d elements ---------- */
(function () {
  const els = document.querySelectorAll('.tilt3d');
  if (!els.length || window.matchMedia('(max-width: 720px)').matches) return;
  els.forEach((el) => {
    const MAX = 9; // degrees
    function move(e) {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        `perspective(900px) rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg) translateZ(6px)`;
    }
    function reset() { el.style.transform = 'perspective(900px) rotateY(0) rotateX(0)'; }
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
  });
})();

/* ---------- Services: GSAP Pinned Horizontal Scroll ---------- */
(function () {
  const scrollWrap = document.getElementById('svc-scroll');
  const row = document.getElementById('svc-row');
  if (!scrollWrap || !row || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Wait for layout
  setTimeout(() => {
    const section = scrollWrap.closest('section');
    
    function getScrollAmount() {
      let rowWidth = row.scrollWidth;
      return -(rowWidth - window.innerWidth + 80);
    }

    const tween = gsap.to(row, {
      x: getScrollAmount,
      ease: "none"
    });

    ScrollTrigger.create({
      trigger: section,
      start: "center center",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });
  }, 100);
})();

/* ---------- Lightbox with zoom in / zoom out ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Zoomed photo');
  lightbox.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous photo">&#10094;</button>' +
    '<button type="button" class="lightbox-nav lightbox-next" aria-label="Next photo">&#10095;</button>' +
    '<div class="lightbox-frame">' +
      '<img src="" alt="Zoomed image">' +
    '</div>' +
    '<div class="lightbox-tools">' +
      '<button type="button" class="lightbox-tool lightbox-zoom-out" aria-label="Zoom out">−</button>' +
      '<span class="lightbox-zoom-label">100%</span>' +
      '<button type="button" class="lightbox-tool lightbox-zoom-in" aria-label="Zoom in">+</button>' +
      '<button type="button" class="lightbox-tool lightbox-zoom-reset">Zoom out</button>' +
    '</div>' +
    '<p class="lightbox-caption"></p>';
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const lbCap = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const zoomInBtn = lightbox.querySelector('.lightbox-zoom-in');
  const zoomOutBtn = lightbox.querySelector('.lightbox-zoom-out');
  const zoomResetBtn = lightbox.querySelector('.lightbox-zoom-reset');
  const zoomLabel = lightbox.querySelector('.lightbox-zoom-label');

  let images = [];
  let currentIndex = 0;
  let scale = 1;
  let tx = 0;
  let ty = 0;
  const MIN_Z = 1;
  const MAX_Z = 4;

  const escapeHtml = (str) => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const captionFor = (img) => {
    const title = img.getAttribute('data-caption') || '';
    const cat = img.getAttribute('data-category') || '';
    if (title && cat) {
      return '<span class="lightbox-kicker">' + escapeHtml(cat) + '</span>' + escapeHtml(title);
    }
    return escapeHtml(title || img.alt || '');
  };

  const applyZoom = () => {
    lbImg.style.setProperty('--z', String(scale));
    lbImg.style.setProperty('--tx', tx + 'px');
    lbImg.style.setProperty('--ty', ty + 'px');
    lightbox.classList.toggle('is-zoomed', scale > 1.02);
    if (zoomLabel) zoomLabel.textContent = Math.round(scale * 100) + '%';
    if (zoomOutBtn) zoomOutBtn.disabled = scale <= MIN_Z + 0.01;
    if (zoomInBtn) zoomInBtn.disabled = scale >= MAX_Z - 0.01;
  };

  const resetZoom = () => {
    scale = 1;
    tx = 0;
    ty = 0;
    applyZoom();
  };

  const setZoom = (next) => {
    scale = Math.min(MAX_Z, Math.max(MIN_Z, next));
    if (scale <= MIN_Z + 0.01) {
      tx = 0;
      ty = 0;
    }
    applyZoom();
  };

  const refreshImages = () => {
    images = [];
    document.querySelectorAll('img.zoomable').forEach(img => {
      if (img.closest('.is-hidden')) return;
      images.push({ src: img.src, caption: captionFor(img) });
    });
  };

  const renderSlide = () => {
    const item = images[currentIndex];
    if (!item) return;
    lbImg.src = item.src;
    lbCap.innerHTML = item.caption || '';
    resetZoom();
  };

  document.body.addEventListener('click', (e) => {
    const img = e.target.closest && e.target.closest('img.zoomable');
    if (!img) return;
    if (img.closest('.lightbox')) return;
    refreshImages();
    currentIndex = images.findIndex((item) => item.src === img.src);
    if (currentIndex < 0) currentIndex = 0;
    openLightbox();
  });

  const openLightbox = () => {
    renderSlide();
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
    if (window.lenis && typeof window.lenis.stop === 'function') window.lenis.stop();
    const cookie = document.querySelector('.cookie-consent');
    if (cookie) cookie.style.visibility = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
    resetZoom();
    if (window.lenis && typeof window.lenis.start === 'function') window.lenis.start();
    const cookie = document.querySelector('.cookie-consent');
    if (cookie) cookie.style.visibility = '';
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    if (images.length === 0) return;
    currentIndex = (currentIndex + 1) % images.length;
    renderSlide();
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    if (images.length === 0) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    renderSlide();
  };

  const zoomOutOrClose = (e) => {
    if (e) e.stopPropagation();
    if (scale > 1.02) setZoom(1);
    else closeLightbox();
  };

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);
  zoomInBtn.addEventListener('click', (e) => { e.stopPropagation(); setZoom(scale + 0.4); });
  zoomOutBtn.addEventListener('click', (e) => { e.stopPropagation(); setZoom(scale - 0.4); });
  zoomResetBtn.addEventListener('click', zoomOutOrClose);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-frame')) closeLightbox();
  });

  lbImg.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    if (scale > 1.2) setZoom(1);
    else setZoom(2.4);
  });

  lightbox.addEventListener('wheel', (e) => {
    if (!lightbox.classList.contains('active')) return;
    e.preventDefault();
    setZoom(scale + (e.deltaY > 0 ? -0.18 : 0.18));
  }, { passive: false });

  let panning = false;
  let panX = 0;
  let panY = 0;
  let originTx = 0;
  let originTy = 0;
  lbImg.addEventListener('pointerdown', (e) => {
    if (scale <= 1.02) return;
    panning = true;
    panX = e.clientX;
    panY = e.clientY;
    originTx = tx;
    originTy = ty;
    lbImg.classList.add('is-panning');
    try { lbImg.setPointerCapture(e.pointerId); } catch (err) {}
    e.preventDefault();
  });
  lbImg.addEventListener('pointermove', (e) => {
    if (!panning) return;
    tx = originTx + (e.clientX - panX);
    ty = originTy + (e.clientY - panY);
    applyZoom();
  });
  const endPan = () => {
    panning = false;
    lbImg.classList.remove('is-panning');
  };
  lbImg.addEventListener('pointerup', endPan);
  lbImg.addEventListener('pointercancel', endPan);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === '+' || e.key === '=') { e.preventDefault(); setZoom(scale + 0.4); }
    if (e.key === '-' || e.key === '_') { e.preventDefault(); setZoom(scale - 0.4); }
    if (e.key === '0') { e.preventDefault(); setZoom(1); }
  });
});

/* ---------- Hero Background Slider ---------- */
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  if(slides.length === 0) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4500);
})();

/* ---------- Cookie / privacy consent banner ---------- */
(function () {
  // Skip if the visitor already made a choice
  try { if (localStorage.getItem('tricil-consent')) return; } catch (e) { return; }

  const bar = document.createElement('div');
  bar.className = 'cookie-consent';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Privacy notice');
  bar.innerHTML =
    '<p>We use only essential functionality and trusted services (Google Fonts, Maps). ' +
    'We do not use advertising or tracking cookies. See our ' +
    '<a href="privacy.html">Privacy Policy</a>.</p>' +
    '<div class="cookie-consent__btns">' +
    '<button class="cc-accept" type="button">Got it</button>' +
    '<button class="cc-decline" type="button">Dismiss</button>' +
    '</div>';
  document.body.appendChild(bar);
  requestAnimationFrame(() => requestAnimationFrame(() => bar.classList.add('show')));

  function close(val) {
    try { localStorage.setItem('tricil-consent', val); } catch (e) {}
    bar.classList.remove('show');
    setTimeout(() => bar.remove(), 500);
  }
  bar.querySelector('.cc-accept').addEventListener('click', () => close('accepted'));
  bar.querySelector('.cc-decline').addEventListener('click', () => close('dismissed'));
})();
