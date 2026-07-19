# 🚀 Tricil Website — Guide

Aapki fully 3D, colorful website ready hai! Ye guide batati hai kaise dekhein, edit karein aur Hostinger pe upload karein.

---

## 👀 1. Website kaise dekhein
Bas **`index.html`** file pe double-click karo — aapke browser (Chrome/Edge) mein khul jayegi.
> Internet connection chahiye — kyunki 3D effects (Three.js), animations (GSAP) aur smooth scroll (Lenis) CDN se load hote hain.

---

## 📄 2. Pages
| File | Page |
|---|---|
| `index.html` | Home (3D hero, products preview, certifications, stats) |
| `products.html` | Products (BOPP, Cartons, Pouches, Rolls + spec table) |
| `about.html` | About (story, why us, certifications, industries) |
| `contact.html` | Contact (quote form + address) |

---

## ✏️ 3. Content edit karna (aasaan)
- **Phone/Email daalna:** `contact.html` kholo → "Add your email here" / "Add your phone here" ko apne details se replace karo. Footer aur contact dono jagah.
- **Text badalna:** Kisi bhi `.html` file me text seedha badal sakte ho.
- **Google Map:** `contact.html` me "Google Map embed here" waale box me apna Maps embed code paste karo.

---

## 🖼️ 4. Images
Saari images `Assets/images/` me hain. **Web-safe naam** (lowercase, no spaces) use kiye gaye hain taaki Hostinger pe chalein:
| Website me | File |
|---|---|
| Logo | `logo.png` |
| Home intro / About | `about.png` |
| BOPP Films | `bopp.jpg` |
| Pouches | `pouches.jpg` |
| Rolls | `rolls.png` |
| Stand-up pouches | `standup.jpg` |
| Certificates | `cert-iso9001.png`, `cert-iso15378.png`, `cert-cgmp.png`, `cert-cpcb.png` |

Nayi image badalni ho to same naam se replace kar do — apne aap lag jayegi.

---

## 🎨 5. Colors (theme)
Sab colors ek jagah: `css/style.css` ke top me `:root` section.
- Brand navy: `--navy: #12223f`
- Brand gold: `--gold: #f5b81f`
- CMYK accents (printing theme): cyan, magenta, yellow
- Gradients: `--grad-coral`, `--grad-lav`, `--grad-mint`, `--grad-cmyk` etc.

---

## 🌐 6. Hostinger pe upload karna
1. Hostinger → **hPanel** → **File Manager** kholo
2. `public_html` folder me jao (purani files hata do agar chahiye)
3. In sab files/folders ko upload karo:
   - `index.html`, `products.html`, `about.html`, `contact.html`
   - `css/` folder
   - `js/` folder
   - `Assets/` folder
4. Bas! `aapkadomain.com` khol ke dekho.

> ⚠️ **Important:** File aur folder ke naam bilkul same rakhna (case-sensitive). `Assets` capital A hi rehna chahiye.
>
> 💡 Tip: Aap poore "Tricil website" folder ko ZIP karke File Manager me upload + extract bhi kar sakte ho (fast).

---

## 🧹 7. Optional cleanup (upload se pehle)
Ye files sirf reference ke liye hain, upload karne ki zaroorat nahi (chahe to rakho, koi harm nahi):
- `PLAN.md`, `PRODUCTS-AND-DETAILS.md`, `GUIDE.md`, `.gitkeep`
- `Assets/images/README.md`
- Purane naam waali images (spaces/capitals waali) — clean copies already ban gayi hain

---

## ❓ Aur kya add kar sakte hain (bolo to kardu)
- Real phone/email/WhatsApp button
- Product detail pages (har product ka alag page)
- Client logos / testimonials
- Gallery of more product photos
- Multi-language (Hindi/English toggle)
- SEO meta tags + favicon
