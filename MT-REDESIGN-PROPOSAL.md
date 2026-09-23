# Cadangan Upgrade UI/UX — Mr Tanah (mrtanah.com)

> Disediakan: 22 September 2026
> Sumber: Google Drive (brief + assets), folder `/home/ubuntu/mrtanah-site/`
> Status: **Dalam semakan — menunggu kelulusan Zahir**

---

## 1. Ringkasan

| Perkara | Butiran |
|---------|---------|
| **Laman** | https://mrtanah.com/ |
| **Repo** | `zahirmjproperty/mrtanah` (GitHub Pages) |
| **Theme Sedia Ada** | Navy + dark green + emerald (Fasa 1 & 2 sudah separa siap) |
| **Theme Baharu** | Carbon black (#030B0C) · Deep forest (#071714) · Champagne gold (#D7B469) · Teal data accent (#20C8B5) |
| **Logo Sedia Ada** | Green rectangle "Mr. TANAH" with white text + black outline (SVG + PNG 390×145) |
| **Logo Baharu** | 3D geometric "MT" monogram — champagne gold, architectural/land-contour influence (JPG 2048×2048, disediakan di Drive) |
| **Design Target** | Premium institutional property marketplace (bukan residential lifestyle) |
| **Audience** | Pelabur, pemilik perniagaan, pemaju, pengilang, pengusaha ladang, korporat |

---

## 2. Apa Yang Ada Sekarang (Current State Audit)

### Halaman Sedia Ada

| Halaman | URL | Status |
|---------|-----|--------|
| Utama | `/` | ✅ Live — hero, search, listing grid, trust row, segmen kategori |
| Projek Baharu | `/projek-baharu/` | ✅ Live — galeri projek (7 projek) |
| Listing detail | `/listing/MT-XXXX.html` | ✅ Live — ~47 halaman statik |
| Artikel | `/artikel/` | ✅ Live — 3 artikel + indeks |
| Tentang | `/tentang.html` | ✅ Live — pasukan + servis + cara kerja |
| Serah Listing | `/jual-sewa-develop.html` | ✅ Live — borang → webhook Google Sheets |
| Serah Dokumen | `/serah-dokumen.html` | ✅ Live — borang muat naik dokumen |
| Portal Pengurusan | `/portal/` | ✅ Live — dashboard log masuk |

### Design Sedia Ada (Fasa 1 — 12/9/2026)

- **CSS variables**: `--brand:#0F172A`, `--accent:#059669`, `--gold:#B45309`, `--brand-soft:#EEF3FA`
- **Font**: Plus Jakarta Sans (heading) + Inter (body)
- **Hero**: Dark gradient `#0A1120 → #0E3A2C → #059669` + background image with veil overlay
- **Segmen**: 3 kad (Pertanian, Lot Banglo, Komersial & Industri) dengan gambar
- **Trust bar**: 4 item (listing aktif, status hakmilik, data teknikal, ejen berdaftar)
- **Search panel**: Deal tabs (Semua/Jual/Sewa/JV) + search input + negeri filter + jenis filter + harga min/max + bilik/pegangan filter + price chips
- **Listing cards**: Kad grid dengan gambar, badge, price chip, specs, WhatsApp/call/detail buttons
- **Mobile nav**: Bottom nav bar + overlay menu panel (menu grid)
- **Navigasi**: Desktop nav + navchips (mobile chips scroll)
- **Dark footer**: `#0f172a` background, 3-column grid
- **Logo sedia ada**: `assets/logo.png` (PNG 390×145 — green rect "Mr. TANAH") + `assets/logo.svg` (same)
- **AI widget**: "Tanya Ali" — widget chat, notis privasi, WhatsApp fallback
- **Data listing**: ~47 listings dalam `data/listings.js` (setiap tracking MT-XXXX)
- **Listing pages**: Static HTML dalam `/listing/` — dijana dari data Notion

### Isu / Kurang

1. **Logonya masih green 'Mr. TANAH' rectangle** — tidak premium
2. **Hero kurang impak** — tiada grid kadaster, tiada floating technical card
3. **Search panel masih asas** — tiada advanced filters (tenure, zoning, keluasan)
4. **Asset category cards kurang menonjol** — hanya 3 segmen (Pertanian/Lot Banglo/Komersial), tiada Kilang/Pejabat
5. **Trust row terlalu teks heavy** — ikon tapi kurang visual
6. **Tiada animated border (spark-border)** — yang disebut dalam concept
7. **Listing grid tiada favourit** — tiada simpanan pengguna
8. **Mobile search tiada advanced filter** (bottom sheet)
9. **CSS masih separa Fasa 1** — design tokens belum konsisten
10. **Header tak berubah jadi dark/transparent on scroll** (masih static fixed putih)

---

## 3. Cadangan Reka Bentuk Baharu

### 3.1 🎨 Design System (Color Palette)

```css
:root {
  --bg:           #030B0C;  /* Carbon black */
  --forest:       #071714;  /* Deep forest */
  --navy:         #071824;  /* Midnight navy */
  --surface:      #0C2426;  /* Elevated surface */
  --surface-glass:rgba(7,25,27,.78);
  --gold:         #D7B469;  /* Champagne gold */
  --gold-light:   #F1D28B;
  --ivory:        #F4F0E7;  /* Warm ivory */
  --text:         #F4F6F8;
  --muted:        #A8B5B3;
  --teal:         #20C8B5;  /* Data accent */
  --line:         rgba(144,193,184,.24);
  --whatsapp:     #25D366;
  --radius:       18px;
  --page:         min(1480px, calc(100% - 64px));
}
```

**Prinsip warna:**
- Gold → premium actions, heading, selected borders
- Teal → ONLY for maps, technical data, active filters, location markers
- Jangan guna kuning terang, neon, crypto styling

### 3.2 🔤 Typography

- **Interface**: Manrope or Plus Jakarta Sans (weights 500/600/700/800)
- **Editorial headings**: Cormorant Garamond or DM Serif Display (weights 600/700)
- **Body**: Manrope 15px/1.55
- Loading from Google Fonts (preconnect)

### 3.3 🆕 Logo Baharu (Drive: `Create_3D_logo_2K_20260922160002.jpeg`)

**3D geometric "MT" monogram** (2048×2048):
- Champagne gold finish
- Land-contour architectural influence
- Simple for mobile + favicon
- Gantikan `assets/logo.png` dan `assets/logo.svg`
- Saiz: PNG (WebP) untuk web, SVG untuk scalability

**Proses:**
- Convert JPEG → PNG + WebP set responsive sizes
- Update `favicon.svg` untuk monogram
- Update OG image `og-card.jpg`
- Gantikan rujukan dalam semua HTML header

### 3.4 📐 Homepage Layout (Desktop)

```
┌──────────────────────────────────────────────────────────┐
│  HEADER (transparent) → [MT] MR TANAH | Nav | Serah | WA │
├──────────────────────────────────────────────────────────┤
│  HERO                                                      │
│  ┌──────┬──────────────┬────────────────────────────────┐ │
│  │ Copy │  Eyebrow     │  Floating Technical Asset Card │ │
│  │ H1   │  CTAs        │  (Zoning/Tenure/Price/Access)  │ │
│  └──────┴──────────────┴────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  SEARCH CONSOLE (glass panel, spark-border)          │ │
│  │  [Semua|Jual|Sewa|JV]  Cari...  Jenis  Negeri  Harga│ │
│  │  Keluasan  [Cari Aset]  Carian Lanjutan ▼            │ │
│  └──────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────┤
│  TRUST ROW: 4 items (Hakmilik | Data Teknikal | Liputan  │
│              Seluruh Malaysia | Ejen Berdaftar)          │
├──────────────────────────────────────────────────────────┤
│  ASSET CATEGORIES (4 kad): Tanah & Ladang | Bangunan      │
│  Komersial | Kilang & Gudang | Pejabat                   │
├──────────────────────────────────────────────────────────┤
│  PELUANG PILIHAN — 3 listing kad per row                  │
│  (spark-border, favourite, specs, harga)                  │
├──────────────────────────────────────────────────────────┤
│  FOOTER                                                   │
└──────────────────────────────────────────────────────────┘
```

### 3.5 Behaviour Utama

1. **Header**: Transparent → `is-scrolled` class → dark blurred `backdrop-filter: blur(18px)`, gold bottom border
2. **Spark-border**: `conic-gradient` animated around selected panels (7s cycle, stops on `prefers-reduced-motion`)
3. **Search**: URL-backed, shareable filters, advanced bottom-sheet on mobile
4. **Favourite**: LocalStorage sahaja (tiada data peribadi meninggalkan peranti)
5. **WhatsApp float**: Fixed bottom-right, `env(safe-area-inset-*)`, no overlap with important content

---

## 4. Fail Teknikal Baharu (dari Drive)

### Sumber dari Google Drive (`1vazYEsZ4VmXe4mkE_afCFKdrez6pWtxu`)

| Fail | Jenis | Fungsi |
|------|-------|--------|
| `mrtanah-homepage-template.html` | HTML | Semantic template — struktur hero, header, search, categories, listing grid |
| `mrtanah-redesign.css` | CSS (13.9KB) | Design tokens, glass panels, spark-border animation, responsive (182 lines) |
| `mrtanah-redesign.js` | JS (3.7KB) | Scroll header, menu, advanced filters toggle, URL restore, favourites |
| `hermes-agent-nous-prompt.md` | MD | Master prompt — design direction, data rules, full spec |
| `Create_3D_logo_2K_*.jpeg` | Image | Logo 3D MT monogram (2048×2048) |
| Design mockup (desktop PNG) | Image | 1586×992 — reference layout desktop |
| Design mockup (mobile PNG) | Image | 853×1844 — reference layout mobile |

### Lokasi dalam repo

- CSS → `assets/css/mrtanah-redesign.css` (or integrate into `style.css`)
- JS → `assets/js/mrtanah-redesign.js` (or append to `app.js`)
- Homepage template → guna sebagai rujukan, integrate ke `index.html`
- Logo → `assets/logo.png`, `assets/logo.webp`, `assets/favicon.svg`
- Hero images → `assets/images/mr-tanah-hero.webp` (new hero)
- Category images → `assets/images/category-land.webp`, etc.

### ⚠️ Integrasi vs Rewrite

**Jangan tulis semula HTML sedia ada dari kosong.** Sebaliknya:
1. Backup dulu `index.html`, `style.css`, `app.js`, `listing.html`, etc.
2. Tambah CSS baharu di **HUJUNG** style.css (menang cascade, sama seperti Fasa 1)
3. Guna struktur HTML template sebagai panduan, adaptasi class ke kod sedia ada
4. JS baharu tambah sebagai progressive enhancement (jangan ganti app.js)
5. Preserve EVERY existing form, route, portal link, AI widget, privacy notice

---

## 5. Pelaksanaan — Fasa-Fasa

### Fasa A: Persediaan & Backup
- [ ] Backup seluruh repo (`git tag pre-redesign && cp -r`)
- [ ] Convert logo JPEG → WebP + PNG + SVG
- [ ] Prepare hero image (existing hero.jpg boleh guna, tapi kena composite dengan grid overlay)
- [ ] Identify category images (3 sedia ada) + cari untuk Kilang + Pejabat

### Fasa B: Design Tokens + Global
- [ ] Replace CSS variables (`--brand:#0F172A` → `--forest:#071714`, etc.)
- [ ] Load Google Fonts (Cormorant Garamond + Manrope)
- [ ] Add `spark-border` animation class
- [ ] Update body background (dark `--bg:#030B0C`)
- [ ] Add glass panel styles

### Fasa C: Header
- [ ] New logo (MT monogram gold)
- [ ] Transparent-to-blur scroll behaviour
- [ ] Nav items: Listing, Tanah, Komersial, Industri, Projek Baharu, Artikel, Tentang
- [ ] Dropdown "Untuk Pemilik & Ejen" (existing)
- [ ] Mobile full-screen menu (body-scroll lock, focus trap, Escape key)
- [ ] "Serah Listing" button + "WhatsApp 016-3119076"

### Fasa D: Hero
- [ ] New hero layout: Copy left, floating technical card right
- [ ] Cadastral grid overlay (CSS `background-image: linear-gradient`)
- [ ] New eyeball copy: "PEA 2684 & PEA 2313 · LISTING SELURUH MALAYSIA"
- [ ] H1: "Tanah strategik. Aset bernilai. Peluang tanpa batas."
- [ ] CTAs: "Teroka Listing" (scroll) + "Jual Hartanah Anda" (serah-listing link)
- [ ] Floating asset-data card (Zoning/Tenure/Price sqft/Access — EXAMPLE labels)

### Fasa E: Search Console + Filters
- [ ] Glass panel positioned over lower hero
- [ ] Deal tabs: Semua | Jual | Sewa | JV
- [ ] Search + Jenis Aset + Negeri + Julat Harga + Keluasan
- [ ] "Cari Aset" button + "Carian Lanjutan" toggle
- [ ] Advanced filters: Tenure, Zoning, Reset
- [ ] URL-backed filter sync + shareable URLs

### Fasa F: Trust Row + Categories
- [ ] Trust row: 4 indicators (redesign)
- [ ] Asset categories: 4 kad (Tanah & Ladang, Bangunan Komersial, Kilang & Gudang, Pejabat)
- [ ] Each: gambar, gradient overlay, gold border, right arrow

### Fasa G: Listing Grid
- [ ] Featured listings: dinamik dari `window.LISTINGS` (active)
- [ ] Card design: gold border, hover effect, favourite button
- [ ] Listing specs: status badge, location, title, price, area, tenure, zoning
- [ ] Grid/list view toggle
- [ ] Sort: newest, price asc/desc, price/sqft, land area

### Fasa H: Detail Page
- [ ] Apply same design system: dark theme, gold accents
- [ ] Gallery, spec table, technical data table
- [ ] Factory/warehouse/office detail support
- [ ] "Maklumat sedang dilengkapkan" untuk data kosong

### Fasa I: Mobile
- [ ] Compact header (68px)
- [ ] Full-screen menu with focus trap
- [ ] Swipeable category cards (78% width, snap scroll)
- [ ] Single column listing
- [ ] Bottom-sheet advanced filters
- [ ] Safe-area padding, 44px minimum targets
- [ ] WhatsApp float dos NOT obscure cards/nav

### Fasa J: QA + Launch
- [ ] Test semua routes dan redirects
- [ ] Test search + all filters
- [ ] Test detail pages
- [ ] Test WhatsApp, forms, portals
- [ ] Test AI assistant + privacy notice
- [ ] Test 320px/390px/768px/1024px/desktop
- [ ] Test keyboard + screen reader
- [ ] Run accessibility + performance audit
- [ ] Deploy → git push

---

## 6. Bahan Dalam Google Drive (untuk rujukan)

**Folder:** https://drive.google.com/drive/folders/1vazYEsZ4VmXe4mkE_afCFKdrez6pWtxu

| Bahan | Saiz | Guna Untuk |
|-------|------|------------|
| Logo 3D MT monogram (JPEG) | ~2MB | Convert ke PNG, WebP, SVG untuk logo header + favicon |
| Desktop design mockup (PNG 1586×992) | ~2.3MB | Rujukan visual layout desktop |
| Mobile design mockup (PNG 853×1844) | ~2.1MB | Rujukan visual layout mobile |
| `mrtanah-redesign.css` | 13.9KB | Base CSS (dark theme, glass, spark-border, responsive) |
| `mrtanah-redesign.js` | 3.7KB | Behaviour (scroll header, menu, URL search, favourites) |
| `mrtanah-homepage-template.html` | 9.5KB | Semantic HTML structure — merge dont replace |
| `hermes-agent-nous-prompt.md` | 7.9KB | Full spec brief (data rules, design direction, verification) |

---

## 7. Keputusan Menunggu

1. ✅ **Logo baharu**: 3D MT monogram — guna dari Drive
2. ✅ **Warna**: Carbon black + forest + gold + teal — setuju?
3. ✅ **Header nav**: Listing, Tanah, Komersial, Industri, Projek Baharu, Artikel, Tentang
4. ⏳ **Hero image**: Guna existing `hero.jpg` dengan digital overlay, atau cari baru?
5. ⏳ **Category images**: Kilang & Gudang, Pejabat — guna gambar sedia ada atau cari stock?
6. ⏳ **Tarikh pelaksanaan**: Serentak dengan cutover Zentra Property Group (keputusan sep 17)?
7. ⏳ **Bila nak mula**: Selepas kelulusan proposal ini?

---

## 8. Nota Penting — Jangan Lupa

- [ ] Backup `git tag pre-redesign` SEBELUM sebarang perubahan
- [ ] **JANGAN ubah** listing data, ID rujukan, URL indexed
- [ ] **JANGAN** cipta harga/data teknikal palsu
- [ ] **JANGAN** buang "Tanya Ali" + notis privasi
- [ ] **JANGAN** buang tab Artikel (arahan Zahir 18/9)
- [ ] **JANGAN** buang footer Zahir + Fadilah identity
- [ ] Preserve semua form (webhook, WhatsApp fallback)
- [ ] CSS baru tambah di HUJUNG — jangan rewrite dari kosong