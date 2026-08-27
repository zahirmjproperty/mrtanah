// Mr Tanah — app.js
// Data dimuat dari data/listings.js (dikemas kini oleh Ali)

const SITE = window.SITE || {};
const DATA = window.LISTINGS || [];
const PHONE = (SITE.phone || "016-3119076").replace(/-/g, "").replace(/\s/g, "");
const WA = SITE.whatsapp || "60" + PHONE;

function fmt(n) {
  return "RM" + Number(n).toLocaleString("en-MY");
}

function card(l) {
  const waMsg = encodeURIComponent(`Assalamualaikum dan salam sejahtera, saya berminat dengan listing ${l.tracking} - ${l.title} (${l.price_label}). Adakah masih tersedia?`);

  // Gambar / placeholder
  const media = l.image
    ? `<img class="card-img" src="${l.image}" alt="${l.title}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">`
    : "";
  const placeholder = `<div class="card-img-ph">🏞️</div>`;
  const badges = `<span class="badge ${l.jenis === "SEWA" ? "promo" : ""}">${l.jenis}</span>`;

  // Specs
  const specs = [];
  if (l.land_area && l.land_area !== "-" && l.land_area) specs.push(`📐 ${l.land_area} ekar`);
  if (l.sqft) specs.push(`🏞️ ${Number(l.sqft.replace(/,/g, "")).toLocaleString("en-MY")} sqft`);
  if (l.tenure && l.tenure !== "-") specs.push(`📜 ${l.tenure}`);
  if (l.sekatan && l.sekatan !== "-") specs.push(`🔖 ${l.sekatan}`);

  // Harga + psf
  const priceHtml = l.price
    ? `<div class="price">${l.price_label}${l.psf ? `<span class="price-psf"> · RM${l.psf}/sqft</span>` : ""}</div>`
    : `<div class="price standby">${l.price_label} <span class="price-psf">(harga menyusul)</span></div>`;

  const mapBtn = l.map_url
    ? `<a class="btn btn-map" href="${l.map_url}" target="_blank" rel="noopener">📍 Peta</a>`
    : "";

  return `
  <article class="card">
    <div class="card-media">
      ${media}
      ${placeholder}
      ${badges}
    </div>
    <div class="card-body">
      <h3 class="card-title">${l.title}</h3>
      <p class="card-loc">📍 ${l.location}</p>
      ${priceHtml}
      ${specs.length ? `<div class="specs">${specs.join("")}</div>` : ""}
      <div class="card-actions">
        <a class="btn btn-wa-card" href="https://wa.me/${WA}?text=${waMsg}" target="_blank">WhatsApp</a>
        <a class="btn btn-call" href="tel:+${WA}">Panggil</a>
        ${mapBtn}
      </div>
      <div class="card-foot">${l.tracking} · ${l.date || ""}</div>
    </div>
  </article>`;
}

function render(query = "", state = "") {
  const grid = document.getElementById("listingGrid");
  const empty = document.getElementById("emptyMsg");
  const q = query.toLowerCase().trim();
  const items = DATA.filter(l => {
    const okState = !state || (l.location || "").toUpperCase().includes(state.toUpperCase());
    const hay = (l.title + " " + l.location + " " + (l.tenure || "") + " " + (l.sekatan || "")).toLowerCase();
    const okQ = !q || hay.includes(q);
    return okState && okQ;
  });
  grid.innerHTML = items.map(card).join("");
  empty.style.display = items.length ? "none" : "block";
}

document.getElementById("searchInput").addEventListener("input", e => {
  render(e.target.value, document.getElementById("stateFilter").value);
});
document.getElementById("stateFilter").addEventListener("change", e => {
  render(document.getElementById("searchInput").value, e.target.value);
});

render();
