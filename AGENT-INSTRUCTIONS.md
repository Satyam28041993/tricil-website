# Tricil Website — Agent handoff

**Read this file first** before changing anything. Then start work from the “Suggested next work” section unless the user asked for something else.

Owner tells future agents: *“Read `AGENT-INSTRUCTIONS.md` and continue.”*

---

## What this project is

Official marketing site for **Tricil Packaging Pvt. Ltd.** (Vasai East, Palghar, Maharashtra). ISO 9001:2015, ISO 15378:2017, cGMP. Established 2005. Live domain: **https://tricil.in**

Static multi-page site: **HTML + CSS + JS, no build step, no npm app**. GSAP, Three.js, and Lenis load from CDN — local preview needs internet.

Do **not** convert this into React/Vite unless the owner explicitly asks.

---

## Git & GitHub (private)

| | |
|---|---|
| Remote | `https://github.com/Satyam28041993/tricil-website.git` |
| Default branch | `main` |
| Visibility | **Private** (set 17 Sep 2026). Only people the owner invites can see it. |
| Live deploy | Hostinger Git auto-deploy from `main` (see warning below) |

### When things went to GitHub

Dates from git history (UTC-ish commit dates). Local work around these days:

| Date | What landed on GitHub |
|------|------------------------|
| 3 Sep 2026 | Repo prepped for Hostinger Git deploy; premium navy-gold UI released via `main` |
| 4 Sep 2026 | Portfolio/product/hero photos converted to WebP; home printed-work gallery; Hostinger WebP MIME + cache; gallery slider/zoom fixes |
| 8 Sep 2026 | Home banner white text, Figtree + Inter, button hover |
| 9 Sep 2026 | `Assets/images/New Images/` added (95 packaging mockups as PNG), then **converted to WebP** (about 173 MB → 11 MB) and originals removed |
| 10 Sep 2026 | `.gitkeep` on that folder |
| 17 Sep 2026 | Remaining `Assets/images/VectorArt/` WebP illustrations + this handoff file; repo made **private** |

If you clone on a new machine: you need GitHub access to this **private** repo (`git clone` will fail for people who are not collaborators).

**Hostinger warning:** this repo used to be public. After going private, Hostinger Git auto-deploy will fail unless hPanel has a GitHub deploy key or personal access token. If the live site stops updating after a push, fix Hostinger Git credentials first — do not make the repo public again unless the owner asks.

---

## How to run locally

From the repo root (folder is often `Tricil_Website`):

```bash
python -m http.server 8080
```

Open `http://localhost:8080/index.html`. Double-clicking `index.html` also works, but a local server is better for paths.

**Folder name `Assets` is case-sensitive** on Hostinger/Linux. Never rename it to `assets`.

---

## Layout

```
index.html (+ 14 other pages)
css/style.css          ← all theme tokens in :root
js/
  animations.js        GSAP, Lenis, contact mailto, cookie banner, nav
  home-gallery.js      home printed-work slider
  gallery-data.js      TRICIL_GALLERY captions (Porthfolio files)
  portfolio.js         portfolio page filter + same gallery data
  cursor.js            CMYK gravure cursor trail
  scene3d.js           Three.js (light use)
Assets/images/
  logo.png
  hero-*.webp, banners
  Clients/             client-1.png … client-14.png
  Porthfolio/          live gallery photos (folder spelling is Porthfolio)
  Products/            product page photos
  New Images/          95 WebP mockups — NOT wired into pages yet
  VectorArt/           7 WebP format illustrations — NOT wired into pages yet
.htaccess              HTTPS (commented until SSL), CSP, block .md and .git, WebP MIME
robots.txt, sitemap.xml
```

### Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `about.html` | About |
| `products.html` | BOPP / printed BOPP |
| `laminated-pouches.html` | Laminated pouches |
| `laminated-rolls.html` | Laminated rolls |
| `standy-zipper.html` | Standy & zipper |
| `shape-pouches.html` | Shape pouches |
| `pvc-shrink.html` | PVC shrink |
| `machinery.html` | Machinery |
| `certificates.html` | Certificates |
| `portfolio.html` | Portfolio |
| `contact.html` | Contact / quote |
| `privacy.html` / `terms.html` | Legal |
| `404.html` | Error page |

Older notes (do not treat as current truth): `GUIDE.md`, `PLAN.md`, `HOME-CONTENT.md`, `PRODUCTS-AND-DETAILS.md`. Prefer this file + the live HTML.

---

## Company facts (keep consistent)

- **Email:** info@tricil.in  
- **Phone / WhatsApp:** +91 98210 63408 (`https://wa.me/919821063408`)  
- **Address:** Unit #29, Sheetal Swapna Industrial Estate, Bhoidapada Naka, Sativali Road, Vasai (East), Dist. Palghar — 401208, Maharashtra, India  
- **Hours:** Monday to Friday, 9 AM – 5 PM  
- **LinkedIn:** https://in.linkedin.com/company/tricil-packaging-pvt-ltd  
- **Canonical URLs:** `https://tricil.in/...`

Contact form does **not** post to a backend. It opens the visitor’s mail app (`mailto:info@tricil.in`) with the fields pre-filled (`js/animations.js`).

---

## Conventions (follow these)

1. **Web images = WebP** for photos/mockups. Quality ~82, max long edge ~1600px. Keep `logo.png` as PNG (favicon). Client logos can stay PNG (tiny).
2. Filenames often contain spaces and `&`. Use the exact path; URL-encode in JS (`encodeURIComponent`) like `home-gallery.js` does.
3. Gallery photos live in `Assets/images/Porthfolio/` (typo in folder name is intentional — do not rename without updating JS + every reference).
4. After visual/CSS/HTML changes, check the real pages in a browser (home, a product page, portfolio, contact), desktop and a mobile width.
5. Do not commit secrets. There is no `.env`. Do not force-push `main`.
6. `.htaccess` already blocks `*.md` from public download. Keep that.
7. Cache-bust CSS with the existing `?v=` query on `style.css` if you change CSS and Hostinger caches hard.

---

## Unused assets (ready, not on the site yet)

These are in git. They are **not referenced** by HTML/JS as of 17 Sep 2026.

### `Assets/images/New Images/` (95 WebP)

Printed packaging mockups (food, pharma, personal care, agri, tape, etc.). Intended for portfolio / home gallery / a “recent work” grid. To use them:

- Add entries in `js/gallery-data.js` **or** a new data file + page section.
- Point `src` at `Assets/images/New Images/<filename.webp>` (not Porthfolio).
- Filenames have spaces — encode URLs.

### `Assets/images/VectorArt/` (7 WebP)

Format illustrations that match the home “Formats for every product” row (currently SVG icons):

- `BOPP HEATSEALABLE ROLL.webp`
- `SPOUT POUCH.webp`
- `ZIP LOCK.webp`
- `CENTRE SEAL.webp`
- `VFFS HFFS ROLLSTOCK.webp`
- `STANDUP.webp`
- `3 SIDE SEAL.webp`

Natural next job: replace the inline SVGs in `index.html` `.svc__art` with these images (and the duplicated loop cards).

---

## Missing / leftover work (owner + agent)

Do not invent Facebook/Instagram URLs. Ask the owner.

- [ ] **Wire VectorArt** into the home services/format cards.
- [ ] **Wire New Images** into portfolio and/or home gallery (95 files — pick a clean subset or paginate).
- [ ] **Facebook / Instagram / Twitter** top-bar links are still `href="#"` on every page. Only LinkedIn is real.
- [ ] **HTTPS redirect + HSTS** in `.htaccess` are still commented. Uncomment only after Hostinger SSL is confirmed live on https://tricil.in.
- [ ] Contact form is mailto-only — no server-side mailer, no spam protection beyond the user’s own email client.
- [ ] `GUIDE.md` is outdated (mentions fewer pages, old image names).
- [ ] Duplicate leftover images exist beside cleaned names (`About Us.png`, `cGMP Certificated.png`, numbered Client copies, etc.). Safe to leave; optional cleanup.
- [ ] Git history still contains the large PNG blobs from 9 Sep 2026 (commit `98488f1`) even though the current tree is WebP. Optional later: history rewrite — **only if the owner asks**, and never on a shared `main` without a plan.
- [ ] After making the repo private: confirm Hostinger still pulls `main`.
- [ ] Careers / “Become a Partner” CTAs from old-site notes are not full pages.

---

## Suggested next work (if the user just says “continue”)

1. Confirm Hostinger still deploys from the private GitHub repo.  
2. Put **VectorArt** on the home format cards.  
3. Add a curated set of **New Images** to portfolio/home gallery (not all 95 in one unfiltered dump unless asked).  
4. Ask owner for Facebook/Instagram URLs if they want those icons live.  
5. Only then: SSL `.htaccess` HTTPS block, if not already enabled on the server.

---

## Owner notes

- Work from this repo; push to `main` when the owner asks to put it on GitHub / live.  
- Speak plainly. The owner often writes in Hindi; replies can mix Hindi + English.  
- Packaging mockups in `New Images` are client-work photography — treat as confidential (repo is private for that reason).  
- Prefer small, visible UI changes over a redesign unless asked.
