# Mr Tanah — Website Landing Page

**URL:** https://zahirmjproperty.github.io/mrtanah/
**Repo:** https://github.com/zahirmjproperty/mrtanah

## Jenama
- **Mr Tanah** — jenama kerjasama antara **Zahir** (Ejen Hartanah Berdaftar, PEA2684) dan **Ejen Fadilah Yusof** (PEA2313)
- Tagline: **DEAL DEVELOP DIVERSIFY**
- Kontak: **016-3119076** (WhatsApp: wa.me/60163119076)
- Tema: Biru & Gold (logo ikut reference: hijau terang, "Mr. TANAH" putih + outline hitam)

## Halaman
1. **index.html** — senarai listing (47 item) dengan carian (lokasi/negeri)
2. **jual-sewa-develop.html** — borang serahan listing (Jual/Sewa/Develop) → hantar terus ke WhatsApp

## Peraturan Akses Telegram

- **Fadilah Yusof** (Telegram ID `152167491`, @d131offwhite): dibenarkan mesej Ali untuk **kerja Mr Tanah SAHAJA**
- Soalan Fadilah di luar skop Mr Tanah → **JANGAN jawab**; maklumkan kepada Zahir (DM 47758290)
- Group Mr Tanah: chat `-1004434282738` (supergroup); channel Fadilah @realchamp_1 (chat `-1001603286448`)

## Peraturan Paparan (PENTING — v2, 27-Ogo-2026)

- **ZNA** = tanah tak available → **PADAM terus** dari website & Notion (bukan on/off)
- **On/Off**: Notion DB "Listing Mr Tanah" → field **Aktif** (checkbox). Untick = Ali buang dari website.
- **Gambar**: TIADA geran, TIADA peta/pelan, TIADA poster, TIADA gambar ada no lot (lot/PT/PTD). Hanya foto tanah sebenar.
- **Notion = pengurus gambar**: ruang "Gambar" (URL) = gambar yang dipaparkan di website. Tukar di Notion → Ali sync.
- **Tiada no lot** dalam tajuk/lokasi
- **Tiada pin peta** — caption lokasi = **nama tempat + negeri** sahaja
- Kad tunjuk: JUAL/SEWA/JV · Freehold/Leasehold · Open/Melayu Reserved · harga total + **harga psf**

## Status Gambar (27-Ogo-2026)

- 47 listing: **20 ada foto bersih**, 27 placeholder (folder Drive tiada foto sesuai — hanya geran/peta; standby)
- Audit gambar: vision_analyze (sub-agen selari) sebelum papar — geran/lot/peta/poster dibuang
- Notion DB "Listing Mr Tanah": https://app.notion.com/p/3c9304f98cfc81d29b70c295238d5f25 (ID 3c9304f9-8cfc-81d2-9b70-c295238d5f25, bawah halaman Hartanah) — ruang: Nama, Lokasi, Jenis, Status, Sekatan, Keluasan, Harga, Harga psf, Peta, Gambar, Nota, **Aktif**

## Proses Kemas Kini Listing
1. Ekstrak data: `/tmp/extract_mrtanah2.py` → `/tmp/mrtanah_full.json` (buang kolum sensitif)
2. Bina + pilih gambar: `/tmp/build_listings2.py` (ZNA dibuang, gambar foto sebenar sahaja) → `/tmp/mrtanah_build2.json`
3. Sync gambar: `/tmp/sync_listings.py` → `data/listings.js` (buang rujukan gambar tiada)
4. Audit gambar baru (vision_analyze) — buang geran/peta/no-lot; ganti `/tmp/repick_images.py`
5. Sync Notion (`Aktif` + `Gambar`): `/tmp/notion_sync_gambar.py`
6. Git commit + push → GitHub Pages auto-update (~1 minit)

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
