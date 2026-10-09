# Amigos Barber Shop: information needed from the owner, and QA status

## A. Missing / unverified business information

| # | Item | Status | Where to change |
|---|------|--------|-----------------|
| 1 | **Postcode**: brief says 3174, every directory found says **3169** (Clayton South). Site uses 3169. | Please confirm | `config.js`, JSON-LD in `index.html`, map links |
| 2 | **Opening hours**: directories conflict (e.g. Mon–Fri 8:30–5:30 & Sat 8–2 on one; Sat 8–4 on others). Not published. Site says "Call the shop to confirm today's opening hours." | Needed | `config.js` → `hours` |
| 3 | **Google rating and review count** (brief: ~4.4 / ~240). Could not be verified, so not shown. | Needed | `config.js` → `rating` (set `verified:true`) |
| 4 | **Real photos**: exterior, interior, chairs, haircuts, tools, staff. None could be accessed, so the site uses designed placeholders and a "photos coming soon" gallery. | Needed | `config.js` → `gallery`, `images` |
| 5 | **Walk-ins welcome?** Not stated anywhere, so not claimed. | Needed | Add copy if yes |
| 6 | **Booking**: a Fresha listing exists, but it is not confirmed that the shop takes bookings there. No booking claim made. | Confirm | `config.js` → `links.booking` |
| 7 | **Direct Google review link** (the site currently opens a Google Maps search for the business). | Needed | `config.js` → `links.googleReviews` |
| 8 | **Source of the two review quotes** (supplied in the brief, shown as "Customer review"). Confirm they are Google reviews and the owner is happy to show them. | Confirm | `config.js` → `reviews` |
| 9 | **Existing website**: directories list amigosbarbers.com. Not verified, not linked. | Confirm | n/a |
| 10 | **Prices, service durations**: none invented. | Optional | Add a pricing block later |
| 11 | **Social profiles** (Instagram / Facebook) | Optional | `config.js` → `links` |
| 12 | **Production domain** for canonical URL, sitemap, Open Graph | Needed at launch | `index.html`, `sitemap.xml`, `robots.txt` |
| 13 | **Map coordinates** for structured data (not invented; omitted) | Optional | JSON-LD `geo` |

## B. QA status

**Tested in a headless Chromium render (desktop 1440, tablet 768, mobile 375, small 320):** no horizontal overflow at any width; all 40 links resolve (no broken in-page anchors; one phone number, `tel:+61395443327`, everywhere; all Maps links use the same address); mobile menu opens, closes on link click and sets `aria-expanded`; hero, services, trust strip and footer layouts inspected visually. One bug found and fixed: the hero phone number wrapped onto two lines on phones.

**Reviewed in code only (not exercised in a browser):** gallery lightbox (no photos exist yet to open), opening-hours table (no hours supplied), hero video fallback (no video supplied), reduced-motion handling, backdrop-blur fallback. No fake booking, payment, social or email content; no invented prices, hours or history; JSON-LD uses only the name, phone and address.

**Test-environment caveat:** the sandbox blocked Google Fonts and Google Maps, so renders used fallback fonts and the map iframe was not loaded. Check the real typography (Bebas Neue + Manrope) and the map on the deployed site.

**Not verifiable from here (please check before launch):**
- Real-device phone-dial behaviour of the call buttons
- Google Maps embed and directions on the live domain
- Live Google rating, review count and hours
- Visual check on real iPhone/Android and Core Web Vitals on the deployed site
- Postcode (3169 vs 3174)

The site has **not** been deployed.

## C. Running and deploying
It is a static site with no build step. Open `index.html`, or run `python3 -m http.server` in this folder. Deploy the folder to Netlify, Vercel, Cloudflare Pages or GitHub Pages, then fill in the domain items above.
