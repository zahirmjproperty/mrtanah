# Mr Tanah — Website Landing Page

**URL:** https://zahirmjproperty.github.io/mrtanah/
**Repo:** https://github.com/zahirmjproperty/mrtanah

## Jenama
- **Mr Tanah** — jenama kerjasama antara **Zahir** (Ejen Hartanah Berdaftar, PEA2684) dan **Ejen Fadilah Yusof** (PEA2313)
- Tagline: **DEAL DEVELOP DIVERSIFY**
- Kontak: **016-3119076** (WhatsApp: wa.me/60163119076)
- Tema: Biru & Gold (logo ikut reference: hijau terang, "Mr. TANAH" putih + outline hitam)

## Halaman
1. **index.html** — senarai listing (61 item) dengan carian (lokasi/jenis/negeri)
2. **jual-sewa-develop.html** — borang serahan listing (Jual/Sewa/Develop) → hantar terus ke WhatsApp

## Sumber Data
- Google Drive folder **"LISTING TANAH"** (mrtanahmy@gmail.com): https://drive.google.com/drive/folders/1SG2Qfsh3ANc1VOQrRFqwCeV12CkzqvDc
- Spreadsheet induk: **SENARAI TANAH** (sheet per negeri: PAHANG, MELAKA, NEGERI SEMBILAN, SELANGOR, KUALA LUMPUR, TERENGGANU, PUTRAJAYA)
- Struktur lajur: BIL, LOT, JUAL/SEWA, DAERAH, MUKIM, TEMPAT, STATUS, SEKATAN, TARIKH LUPUT, KATEGORI, SIZE, ZONING, HARGA, dll.

## Peraturan Privasi
- Nama **Zahir** & **Fadilah** HANYA dipaparkan dalam bahagian **Tentang Kami**
- Bahan awam lain: guna brand **Mr Tanah** + kontak 016-3119076 sahaja
- JANGAN paparkan: nama owner, kontak dalaman, komisen, nota urusan, HARGA KOS

## Proses Kemas Kini Listing
1. Ekstrak data: `/tmp/extract_mrtanah.py` (buang kolum sensitif, simpan ke `/tmp/mrtanah_listings.json`)
2. Jana: `/tmp/gen_mrtanah_site.py` → `data/listings.js` (penomboran MT-###)
3. Git commit + push ke `main` → GitHub Pages auto-update (~1 minit)

## Fail Penting
- `data/listings.js` — data listing (window.LISTINGS + window.SITE)
- `app.js` — render kad + carian + butang WhatsApp
- `style.css` — tema biru & gold
- `assets/logo.png` — logo asal (cropped dari reference 500x500)
- `assets/favicon.svg` — ikon MT
- `assets/mr-tanah-team.jpg` — gambar bersama Zahir & Fadilah

## Nota Teknikal
- Hosting: GitHub Pages (percuma) — repo `zahirmjproperty/mrtanah`, branch `main`, path `/`
- Token: GITHUB_TOKEN dalam `~/.hermes/.env` (push guna token inline, remote kekal bersih)
- Butang WhatsApp terapung: `.wa-float` (fixed bottom-right)
- Borang → WhatsApp: JS bina mesej + `window.open("https://wa.me/60163119076?text=...")`
