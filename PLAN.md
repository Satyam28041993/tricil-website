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

---

## 🗓️ SESSION UPDATE — 2026-08-01 (design research + premium effects planning)

Is session mein koi code change nahi hua — sirf research, reference analysis, aur agle kaam ka plan discuss hua. Neeche sab kuch note kiya hai taaki future session mein context na khoye.

### Reference site study: amanprint.com
- User ne amanprint.com ke screenshots share kiye — instruction clear thi: **content/layout copy nahi karna**, sirf "cleanliness/premium feel" ka level match karna hai.
- Observed strengths (inspiration ke liye, copy nahi karni):
  - Strict color discipline (sirf navy + white + light-gray, kahin random color nahi)
  - Consistent card system — same padding/radius/shadow har jagah
  - Ek hi icon style (line/duotone), mix nahi kiya
  - Proper whitespace/breathing room between sections
  - Fixed typography hierarchy (heading size/weight + gray subtext pattern repeat)
  - Product photos consistent background/lighting
  - Predictable CTA pattern (outline vs filled buttons)
  - Sticky bottom mobile nav bar (Home/Products/Industry/Call/WhatsApp)
- Verdict: Amanprint khud zyada animated/3D nahi hai — uski taakat consistency hai, motion/3D nahi. Tricil ko usse aage le jaana hai: same discipline + real 3D/premium touches jo unke paas nahi hain.

### Design system plan (foundation before any visual polish)
1. CSS custom properties / design tokens ek jagah fix karna — colors (already: navy `#12223f`, gold `#f5b81f` in `css/style.css`), spacing scale, font sizes, radius, shadow
2. Typography: ek hi Google Font family (Poppins/Manrope/Inter jaisa), sirf 2-3 weights, consistent heading→body ratio
3. Image standardization: product photos same aspect ratio + neutral background, WebP + srcset for perf
4. Shared component patterns for cards/buttons/icons — kahin bhi one-off styling na ho

### Premium 3D/motion effects discussed (implementation ideas, sab abhi tak sirf planned, NOT built)

**1. Hero 3D touch**
- Three.js se halka rotating pouch/roll ya gradient/particle background — sirf hero section tak limited (perf ke liye)

**2. Hover-tilt product cards**
- Mouse move pe CSS 3D transform tilt — lightweight depth effect

**3. Scroll-reveal animations**
- GSAP + ScrollTrigger se sections fade/slide-up on scroll
- Animated counters for stats (jaise "20+ Years", "100+ Industries")

**4. Exploded-view layer animation (pouch material breakdown)** — jaise Apple product pages
- Technique: section ko pin karo (sticky, tall wrapper e.g. 300vh), scroll progress ko 0→1 map karo
- Har material layer (jaise "12 micron Polyester", "100 micron BOPP", "30 micron LD") ek alag transparent image/element hai, jo scroll-range ke hisaab se separate hoti hai (translateY/Z + opacity), aur uska spec label saath mein fade-in hota hai
- Approach A (recommended, lightweight): 2D layered transparent PNG/SVG images + GSAP ScrollTrigger `scrub: true`
- Approach B (heavier, more premium): true Three.js 3D layers with real depth/lighting — needs proper 3D-rendered layer assets
- Assets needed: har layer ka clean cutout image (same angle/alignment) — 3D render se ya designer se banwana padega

**5. 360° product spin viewer**
- Single photo se REAL 360 rotation possible nahi (data exist nahi karta) — sirf fake tilt/parallax de sakte hain
- Real 360 ke liye: product ko turntable pe har 10-15° pe photo khinchni padegi (~24-36 images), phir drag/scroll se image-sequence switch karke spin illusion banayenge (jaisa Amazon/Shopify product viewers karte hain) — koi heavy 3D model nahi chahiye isme

**6. AI-generated product video (Gemini/Veo) — alternate route explored**
- User ne Gemini se 10-sec rotation video try kiya — generic silver pouch results aaye (achhe the, but bina brand text ke)
- Jab "Tricil Packaging" branded text + logo mangwaya, Gemini ne generate hi nahi kiya ("try another prompt") — likely trademark/brand-text safety filter trigger hua (exact quoted text + "logo" wording risky hota hai)
- Fix discussed: (a) chhota/simple prompt, hex codes hata ke plain color-names, "logo"/"exactly reading" words avoid karna, (b) ya blank/text-less pouch generate karke baad mein Tricil branding ko video ke upar overlay karna (zyada reliable, 100% accurate text)
- Caveat noted: AI video pouch ke print/text ko hubahu accurately reproduce nahi karta — sirf concept/hero-background use ke liye theek hai, catalog-accurate product shot ke liye real photography/video better hai

### Next steps (jab user "start karo" bole)
- [ ] Design tokens file banana (`css/tokens.css` ya existing `style.css` mein consolidate)
- [ ] Font finalize karna aur load karna
- [ ] Hero section mein 3D/motion touch add karna
- [ ] GSAP + ScrollTrigger + (optional) Lenis smooth scroll setup
- [ ] Exploded-view layer animation ke liye layer assets ready karwana (user se ya AI-render se)
- [ ] 360 viewer ke liye decide: real turntable photos vs AI video vs skip for now
- [ ] Product branding video/photos ka final source decide karna (AI-generated vs real shoot vs hybrid with overlay)
