// Mr Tanah — app.js
// Data dimuat dari data/listings.js (dikemas kini oleh Ali setiap kali ada listing baru)

const SITE = window.SITE || {};
const DATA = window.LISTINGS || [];
const PHONE = (SITE.phone || "016-3119076").replace(/-/g, "").replace(/\s/g, "");
const WA = SITE.whatsapp || "60" + PHONE;

function fmt(n) {
  return "RM" + Number(n).toLocaleString("en-MY");
}

function card(l) {
  const waMsg = encodeURIComponent(`Assalamualaikum, saya berminat dengan listing ${l.tracking} - ${l.title} (${l.price_label}). Adakah masih tersedia?`);
  const badges = [];
  if (l.status === "JUAL") badges.push('<span class="badge">JUAL</span>');
  if (l.status === "SEWA") badges.push('<span class="badge promo">SEWA</span>');
  const specs = [];
  if (l.land_area && l.land_area !== "-") specs.push(`📐 Tanah ${l.land_area}`);
  if (l.tenure && l.tenure !== "-") specs.push(`📜 ${l.tenure}`);

  const hls = (l.highlights || []).filter(h => h && h !== "📐 -").map(h => `<li>${h}</li>`).join("");

  return `
  <article class="card">
    <div class="card-media">
      🏞️
      ${badges.join("")}
    </div>
    <div class="card-body">
      <h3 class="card-title">${l.title}</h3>
      <p class="card-loc">📍 ${l.location}</p>
      <div class="price">${l.price_label}</div>
      ${specs.length ? `<div class="specs">${specs.join("")}</div>` : ""}
      ${hls ? `<ul class="highlights">${hls}</ul>` : ""}
      <p class="card-desc">${l.description || ""}</p>
      <div class="card-actions">
        <a class="btn btn-wa-card" href="https://wa.me/${WA}?text=${waMsg}" target="_blank">WhatsApp</a>
        <a class="btn btn-call" href="tel:+${WA}">Panggil</a>
      </div>
      <div class="card-foot">${l.tracking} · ${l.date || ""}</div>
    </div>
  </article>`;
}

function render(filterType = "", query = "", state = "") {
  const grid = document.getElementById("listingGrid");
  const empty = document.getElementById("emptyMsg");
  const q = query.toLowerCase().trim();
  const items = DATA.filter(l => {
    const okType = !filterType || l.type === filterType;
    const okState = !state || (l.location || "").toUpperCase().includes(state.toUpperCase());
    const hay = (l.title + " " + l.location + " " + (l.description || "")).toLowerCase();
    const okQ = !q || hay.includes(q);
    return okType && okState && okQ;
  });
  grid.innerHTML = items.map(card).join("");
  empty.style.display = items.length ? "none" : "block";
}

document.getElementById("searchInput").addEventListener("input", e => {
  render(document.getElementById("typeFilter").value, e.target.value, document.getElementById("stateFilter").value);
});
document.getElementById("typeFilter").addEventListener("change", e => {
  render(e.target.value, document.getElementById("searchInput").value, document.getElementById("stateFilter").value);
});
document.getElementById("stateFilter").addEventListener("change", e => {
  render(document.getElementById("typeFilter").value, document.getElementById("searchInput").value, e.target.value);
});

render();
