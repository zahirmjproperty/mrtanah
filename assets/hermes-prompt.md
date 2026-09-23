# Hermes Agent Nous — MRTanah Homepage Upgrade

## Objective

Upgrade the current `https://mrtanah.com/` homepage so it closely matches the supplied **Premium Malaysian Property Marketplace** reference image. The result must be a production-quality, responsive property marketplace for land, commercial buildings, factories, warehouses, offices, agricultural assets and development opportunities.

Do not recreate the mockup as one flattened image. Build the navigation, hero, search console, trust row, category cards, listing cards, buttons and decorative effects as semantic HTML/CSS/JS components.

## Mandatory audit before editing

1. Inspect the repository, framework, routing, build process and deployment configuration.
2. Identify the authoritative listing data source, image paths, listing reference IDs and availability/status fields.
3. Map existing URLs, forms and services: Listing, Projek Baharu, Artikel, Tentang, Serah Listing, Serah Dokumen and Portal Pengurusan.
4. Identify the existing WhatsApp integration and retain `016-3119076`.
5. Preserve the verified identity text: `Zahir MJ (PEA 2684) × Fadilah Yusof (PEA 2313)` and the existing IQI Realty registration information wherever currently shown.
6. Preserve the existing “Tanya Ali” assistant, its disclosures, privacy notice and consent behaviour. Do not expand data collection.
7. Make a recoverable backup before changing production files.

## Non-negotiable data rules

- Never replace real listings with mock listings.
- Never invent prices, acreage, zoning, tenure, title information, awards or transaction totals.
- Do not change listing reference IDs or existing indexed URLs.
- If a technical field is unavailable, hide it or show `Maklumat sedang dilengkapkan`—never display `0` or a guessed value.
- Use the existing listing data and images to populate all cards.
- Preserve existing forms, WhatsApp links, portals, article URLs and SEO metadata.

## Design direction

- Premium institutional property marketplace, not a residential lifestyle template.
- Carbon black, deep forest green, midnight navy, warm ivory and champagne gold.
- Restrained electric-teal accents for active filters, map pins and technical data.
- Cinematic land, office, factory and logistics imagery.
- Subtle cadastral grids, topographic contour lines and property-boundary overlays.
- Manrope or Plus Jakarta Sans for the UI; Cormorant Garamond or DM Serif Display for editorial headings.
- Thin borders, high contrast, controlled glassmorphism and generous spacing.
- Avoid bright yellow, excessive neon, crypto styling and heavy animation.

## Homepage structure

### 1. Sticky header

Desktop navigation:

- Utama
- Listing
- Tanah
- Komersial
- Industri
- Projek Baharu
- Artikel
- Tentang

Actions:

- `SERAH LISTING`
- WhatsApp `016-3119076`

The header is transparent over the hero and becomes a blurred dark surface after scrolling. On mobile use an accessible full-screen menu with body-scroll locking, focus trapping and Escape-key support.

### 2. Hero

Use the following copy exactly:

- Eyebrow: `PEA 2684 & PEA 2313 · LISTING SELURUH MALAYSIA`
- Heading: `Tanah strategik. Aset bernilai. Peluang tanpa batas.`
- Description: `Temui tanah, bangunan, kilang dan ruang komersial terpilih — disemak dari sudut hakmilik, lokasi dan potensi pasaran.`
- Primary CTA: `TEROKA LISTING`
- Secondary CTA: `JUAL HARTANAH ANDA`

Use a responsive hero image showing development land, an office building, a factory/warehouse and Malaysian urban connectivity. Add restrained map pins and boundary lines as separate CSS/SVG layers.

### 3. Search console

Transaction tabs:

- Semua
- Jual
- Sewa
- JV

Fields:

- Search: `Cari lokasi, jenis aset atau nombor rujukan`
- Jenis Aset
- Negeri
- Julat Harga
- Keluasan
- Advanced filters
- CTA: `CARI ASET`

Connect this UI to the real listing data. Synchronise filters with URL query parameters so filtered pages can be shared. Preserve filters when users return from a detail page. Provide loading, no-results and reset states.

### 4. Trust row

- Hakmilik Disemak — `Maklumat sahih & dipercayai`
- Data Teknikal Tanah — `Zoning, keluasan & potensi`
- Liputan Seluruh Malaysia — `Dari utara ke selatan`
- Ejen Berdaftar — `Profesional & beretika`

### 5. Asset categories

Heading: `Teroka Mengikut Jenis Aset`

- Tanah & Ladang
- Bangunan Komersial
- Kilang & Gudang
- Pejabat

Each category must navigate to a filtered real-results page. Use existing images where suitable; otherwise use locally optimised and licensed assets.

### 6. Featured opportunities

Heading: `Peluang Pilihan`

Render active/featured listings dynamically. Cards must include only fields that exist:

- Status
- Location
- Title
- Price or “Harga Atas Permintaan” only when that is the real listing value
- Area
- Tenure
- Zoning/category
- Favourite control
- Listing-detail link

Use `Tanah 1 Ekar Tepi Jalan Beranang` only if it remains active in the data source.

## Visual effects

Implement the reference image’s glowing travelling border on premium panels and selected buttons. Use a masked `conic-gradient` pseudo-element and animate a narrow gold/teal highlight around the perimeter. The animation must be subtle, run slowly and stop when `prefers-reduced-motion: reduce` is enabled.

Use the supplied `mrtanah-redesign.css` as the visual foundation. Adapt class names to the existing codebase instead of duplicating conflicting styles.

## Responsive behaviour

### Desktop ≥ 1100px

- Full navigation
- Two-column hero balance
- Horizontal filter console
- Four category cards
- Three listing cards per row

### Tablet 768–1099px

- Wrapped search controls
- Two category/listing columns
- Reduced hero height

### Mobile ≤ 767px

- Compact sticky header and menu
- Single-column hero
- Full-width CTAs
- Scrollable transaction tabs
- Search and select fields stacked
- Advanced filters in a bottom sheet
- Swipeable category cards with a partial next card visible
- One listing card per row
- Safe-area padding and 44px minimum targets
- WhatsApp button must not obscure cards or navigation

## Accessibility

- Semantic landmarks and correct heading order
- Explicit field labels, even when visually hidden
- Keyboard-accessible cards, tabs, menus and galleries
- Visible focus states
- `aria-live` search result count/status
- WCAG AA contrast
- Meaningful property image alt text
- Reduced-motion support

## SEO and performance

- Preserve canonical URLs, titles, descriptions, Open Graph data, sitemap and robots settings.
- Preserve indexed listing and article URLs.
- Add valid structured data only from real fields: `RealEstateAgent`, `Offer`, `Place`, `BreadcrumbList`, `Article`.
- Generate AVIF/WebP responsive images; reserve dimensions; preload only the hero; lazy-load below the fold.
- Avoid autoplay video and continuous expensive map animation.
- Target strong Core Web Vitals and no cumulative layout shift.

## Files supplied with this prompt

- `mrtanah-homepage-template.html`: semantic reference structure; merge into the current page rather than replacing data logic blindly.
- `mrtanah-redesign.css`: tokens, responsive layout, glass surfaces and travelling-border effect.
- `mrtanah-redesign.js`: progressive enhancement for navigation, tabs, URL-backed search, favourites and scroll header.

## Final verification

Before delivery:

1. Test all existing routes and redirects.
2. Test search, filters and URL restoration.
3. Test actual listing detail pages.
4. Test WhatsApp, phone and submission actions.
5. Test Serah Listing, Serah Dokumen and Portal Pengurusan.
6. Test the AI assistant and its disclosure.
7. Test 320px, 390px, 768px, 1024px and wide desktop viewports.
8. Test keyboard navigation and screen-reader labels.
9. Run accessibility and performance audits.
10. Confirm no listings, IDs, technical fields, forms or privacy notices were lost.

