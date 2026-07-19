# TRICIL — 3D Website Project Plan
> Ek fully 3D, colorful, gradient-based website for Tricil Packaging (printing/packaging company)
> Date started: 2026-07-19

---

## 🎯 GOAL
Ek modern, fully 3D, interactive website — jaisi Awwwards / Motion.dev pe hoti hain.
- Theme: **Gradient light colors, colorful, English aesthetic**
- Feel: Premium printing company jo "colour" bechti hai — toh website bhi colourful ho
- 3D elements: floating packaging boxes, pouches, BOPP film rolls jo scroll/mouse pe react karein

---

## 🎨 DESIGN DIRECTION (studied from Awwwards + Motion)

### Colors (Light Gradient Palette)
- Soft gradients: peach→pink, lavender→sky blue, mint→aqua, cream→coral
- Light/white base background so gradients pop
- Accent: vibrant CMYK nod (Cyan, Magenta, Yellow) — perfect for a PRINTING company!
- Example palette:
  - Background: `#FDFBFF` (off-white)
  - Gradient 1: `#FF9A8B → #FF6A88 → #FF99AC` (coral-pink)
  - Gradient 2: `#A18CD1 → #FBC2EB` (lavender)
  - Gradient 3: `#84FAB0 → #8FD3F4` (mint-sky)
  - CMYK accents: Cyan `#00BCD4`, Magenta `#E91E63`, Yellow `#FFEB3B`

### 3D / Motion techniques observed (Awwwards & Motion style)
1. **Hero 3D object** — a rotating 3D packaging box / pouch that follows mouse
2. **Scroll-driven animation** — objects transform as you scroll (Motion.dev signature style)
3. **Floating elements** — soft blurred gradient blobs in background
4. **Smooth scroll** (like Lenis) — buttery scrolling
5. **Text reveal animations** — words fade/slide in on scroll
6. **Magnetic buttons** & hover micro-interactions
7. **Glassmorphism cards** for products (frosted glass over gradients)
8. **Interactive product showcase** — 3D models you can rotate

---

## 🛠️ TECH STACK (decision)

**Approach: HTML + CSS + JavaScript with Three.js (no build tools needed — runs by opening index.html)**

Why this stack:
- Works by just opening the file / simple local server — no complex setup
- **Three.js** → for real 3D objects (boxes, rolls, pouches)
- **GSAP + ScrollTrigger** → for scroll animations (industry standard, used on Awwwards sites)
- **Lenis** → smooth scroll
- All loaded via CDN — no npm install needed

Alternative (if you want): React + Vite + React Three Fiber (more powerful, needs Node setup).
👉 **Recommendation: Start with the simple HTML/Three.js stack** so you can preview instantly.

---

## 📁 FOLDER STRUCTURE (planned)
```
Tricil website/
├── PLAN.md                     ← this file
├── PRODUCTS-AND-DETAILS.md     ← all company content ✅ done
├── index.html                  ← main page
├── css/
│   └── style.css
├── js/
│   ├── main.js                 ← general interactions
│   ├── scene3d.js              ← Three.js 3D scenes
│   └── animations.js           ← GSAP scroll animations
├── assets/
│   ├── images/                 ← product photos (NEED FROM USER)
│   ├── models/                 ← 3D models (.glb) if any
│   └── icons/
└── pages/
    ├── products.html
    ├── about.html
    └── contact.html
```

---

## 🖼️ IMAGES — THE BLOCKER (important!)
❌ Purani website ki images is environment se automatically download NAHI ho sakti (network blocked — sirf web search allowed hai).

**Options to get images:**
- **Option A (best):** Aap khud tricil.in ki images download karke is folder ke `assets/images/` me daal do. Ya screenshots bhejo.
- **Option B:** Main placeholder / AI-style generated gradient graphics aur CSS-drawn 3D packaging bana deta hoon (bina real photos ke bhi website sundar banegi).
- **Option C:** Aap product photos naye click karke bhejo.

👉 Filhaal main **Option B** se shuru karunga (CSS/3D generated visuals) taaki kaam ruke nahi, aur jab aap real images do to swap kar denge.

---

## 📋 EXECUTION PHASES

### Phase 0 — Prep ✅ (DONE)
- [x] Folder banaya
- [x] Company content research + save (PRODUCTS-AND-DETAILS.md)
- [x] Design study (Awwwards, gradient, colorful)
- [x] Plan file (this)

### Phase 1 — Foundation
- [ ] Folder structure banao (css, js, assets)
- [ ] Base index.html with sections
- [ ] Global CSS: colors, fonts, gradient system
- [ ] Smooth scroll (Lenis) + GSAP setup

### Phase 2 — Hero (the "wow")
- [ ] 3D hero object (Three.js rotating packaging box, CMYK colored)
- [ ] Animated gradient background with floating blobs
- [ ] Headline text reveal animation
- [ ] Navbar (glass, magnetic links)

### Phase 3 — Content sections
- [ ] About section (scroll animations)
- [ ] Products showcase — 3D/glass cards for BOPP, Cartons, Pouches, Rolls
- [ ] Industries served — animated grid
- [ ] "Why Tricil" stats (ISO, 2005, 46+ products, fast turnaround)

### Phase 4 — Interactivity & polish
- [ ] Scroll-driven 3D transforms
- [ ] Hover micro-interactions
- [ ] Product detail cards / modal
- [ ] Contact section + form

### Phase 5 — Responsive + finish
- [ ] Mobile/tablet responsive
- [ ] Performance (lazy load 3D)
- [ ] Replace placeholders with real images
- [ ] Final review

---

## ✅ DECISIONS CONFIRMED BY USER (2026-07-19)
1. **Images:** User will provide (build with swap-ready placeholders)
2. **Structure:** MULTI-PAGE (Home, About, Products, Contact)
3. **Hosting:** Hostinger → use STATIC files (HTML/CSS/JS), just upload — no build step
4. **3D Tech:** Three.js + GSAP ScrollTrigger + Lenis (all via CDN) — best for 3D + works on Hostinger
5. **Logo:** User has it (use placeholder, user replaces)
6. **Language:** English

## ⏳ STILL NEED FROM USER
- Real product images → drop into `assets/images/`
- Logo file → `assets/images/logo.png`
- Confirm phone & email for contact page
