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
  if (typeof Lenis === 'undefined') return;
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
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
  let i = 0;
  el.textContent = words[0];
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
  el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  el.style.display = 'inline-block';
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

/* ---------- Lightbox Global Implementation ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<span class="lightbox-close">&times;</span><div class="lightbox-nav lightbox-prev">&#10094;</div><div class="lightbox-nav lightbox-next">&#10095;</div><img src="" alt="Zoomed Image">';
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let images = [];
  let currentIndex = 0;

  const refreshImages = () => {
    images = [];
    document.querySelectorAll('img.zoomable').forEach(img => {
      images.push(img.src);
    });
  };

  document.body.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && e.target.classList.contains('zoomable')) {
      refreshImages();
      currentIndex = images.indexOf(e.target.src);
      openLightbox(e.target.src);
    }
  });

  const openLightbox = (src) => {
    lbImg.src = src;
    lightbox.classList.add('active');
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
  };

  const showNext = (e) => {
    if(e) e.stopPropagation();
    if (images.length === 0) return;
    currentIndex = (currentIndex + 1) % images.length;
    lbImg.src = images[currentIndex];
  };

  const showPrev = (e) => {
    if(e) e.stopPropagation();
    if (images.length === 0) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lbImg.src = images[currentIndex];
  };

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
});

/* ---------- Hero Background Slider ---------- */
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  if(slides.length === 0) return;
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
