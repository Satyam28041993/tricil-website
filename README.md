# Tricil Packaging — Website

Official website for **Tricil Packaging Pvt. Ltd.** — an ISO 9001:2015, ISO 15378:2017 & cGMP certified manufacturer of BOPP films, printed cartons, laminated pouches and rolls (established 2005), based in Vasai (East), Palghar, Maharashtra, India.

A fully static, multi-page site — pure HTML, CSS and JavaScript with **no build step** — ready to deploy on Hostinger or any static host.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About | `about.html` |
| Products (BOPP/Printed) | `products.html` |
| Laminated Pouches | `laminated-pouches.html` |
| Laminated Rolls | `laminated-rolls.html` |
| Standy & Zipper Pouches | `standy-zipper.html` |
| Shape Pouches | `shape-pouches.html` |
| PVC Shrink Film | `pvc-shrink.html` |
| Installed Machinery | `machinery.html` |
| Certificates | `certificates.html` |
| Portfolio | `portfolio.html` |
| Contact | `contact.html` |
| Privacy Policy | `privacy.html` |
| Terms of Use | `terms.html` |
| 404 error page | `404.html` |

## Structure

```
├── index.html + 14 more pages
├── css/style.css
├── js/            animations.js · portfolio.js · scene3d.js
├── Assets/        images, logo, client & product photos
├── .htaccess      HTTPS, security headers, caching, file protection
├── robots.txt
├── sitemap.xml
└── README.md
```

## Features

- Fully responsive, colourful 3D-styled design
- Auto-scrolling, drag/wheel-scrollable services row
- Client logo marquee, GSAP + Lenis smooth-scroll animations
- Contact form (opens the visitor's email client, pre-filled)
- Floating WhatsApp button and embedded Google Map
- SEO: unique titles/descriptions, canonical tags, JSON-LD Organization schema, sitemap
- Legal: Privacy Policy & Terms of Use (India IT Act 2000 + DPDP Act 2023), cookie notice
- Security: CSP, HSTS, X-Frame-Options, no-MIME-sniff, `rel="noopener"` on all external links

## Deploy (Hostinger)

1. Enable **free SSL** for the domain (hPanel → SSL).
2. Upload the entire folder contents into `public_html/`.
3. Confirm `.htaccess` uploaded (it enables HTTPS + security headers).

## License

© 2026 Tricil Packaging Pvt. Ltd. All rights reserved.
