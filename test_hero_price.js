// Ujian regresi: hero search mrtanah.com — penapis julat harga mesti berfungsi.
// Jalankan: node test_hero_price.js   (dari /home/ubuntu/mrtanah-site)
const fs = require("fs");
const assert = require("assert");

// ---- DOM stub minimum ----
function El(tag, attrs = {}) {
  const e = {
    tagName: tag.toUpperCase(), children: [], _attrs: { ...attrs }, value: "", textContent: "",
    style: {}, dataset: {}, classList: { _s: new Set(), add(c){this._s.add(c)}, remove(c){this._s.delete(c)},
      toggle(c, on){ on ? this._s.add(c) : this._s.delete(c) }, contains(c){return this._s.has(c)} },
    set innerHTML(v) {
      this._html = v; this.children = [];
      // tiru gantian penuh: placeholder <option value="">Label</option> jadi anak pertama
      const m = /<option value="">([^<]*)<\/option>/.exec(v || "");
      if (m) { const o = El("option", {}); o.value = ""; o.textContent = m[1]; this.children.push(o); }
    },
    get innerHTML() { return this._html || ""; },
    appendChild(c) { this.children.push(c); if (c.tagName === "OPTION") this.value = c.value === this.value ? this.value : this.value; return c; },
    addEventListener(t, f) { ((this._ev = this._ev || {})[t] = this._ev?.[t] || []).push(f); },
    dispatch(t) { ((this._ev || {})[t] || []).forEach(f => f({ preventDefault(){} })); },
    querySelectorAll() { return []; },
    setAttribute(k, v) { this._attrs[k] = v; },
    getAttribute(k) { return this._attrs[k]; },
    scrollIntoView() {},
    insertBefore(n) { this.children.push(n); },
    get parentNode() { return El("div"); },
    nextSibling: null,
  };
  if (attrs.id) e.id = attrs.id;
  return e;
}
function mkSelect(id, firstLabel) {
  const s = El("select", { id });
  const o = El("option", {}); o.value = ""; o.textContent = firstLabel;
  s.children.push(o);
  return s;
}
const els = {};
function reg(e) { els[e.id] = e; return e; }

const doc = {
  _ready: [],
  getElementById: (id) => els[id] || null,
  createElement: (t) => El(t),
  querySelectorAll: (sel) => {
    if (sel === ".deal-tab") return dealTabs;
    return [];
  },
  addEventListener: () => {},
  body: El("body"),
};

const grid = reg(El("div", { id: "listingGrid" }));
reg(mkSelect("stateFilter", "Semua Negeri"));
reg(mkSelect("typeFilter", "Jenis Aset"));
reg(mkSelect("priceFilter", "Julat Harga"));       // elemen BAHARU (hero)
const minI = reg(El("input", { id: "minPrice" }));
const maxI = reg(El("input", { id: "maxPrice" }));
reg(mkSelect("sortSelect", "Terkini"));
reg(El("input", { id: "searchInput" }));
reg(El("button", { id: "clearBtn" }));
reg(El("div", { id: "emptyMsg" }));
reg(El("span", { id: "statAktif" }));
reg(El("div", { id: "resultCount" }));

const dealTabs = ["", "JUAL", "SEWA", "JV"].map(d => {
  const b = El("button", { class: "tab deal-tab" }); b.dataset.deal = d; return b;
});

global.document = doc;
global.window = global;
global.location = { search: "" };
global.URLSearchParams = URLSearchParams;
global.Event = class { constructor(t) { this.type = t; } };
global.Node = class {};
global.history = { replaceState() {} };
global.location.pathname = "/index.html";

// ---- data sebenar ----
const src = fs.readFileSync("data/listings.js", "utf8");
const LISTINGS = JSON.parse(src.slice(src.indexOf("["), src.lastIndexOf("]") + 1));
global.LISTINGS = LISTINGS;

// ---- jalankan app.js ----
eval(fs.readFileSync("app.js", "utf8"));

// ---- ujian ----
const opts = els.priceFilter.children.map(o => o.textContent);
assert.ok(opts.length >= 6, "priceFilter mesti ada >=5 bucket + placeholder, dapat " + opts.length);
assert.strictEqual(opts[0], "Julat Harga");
console.log("bucket JUAL:", opts.slice(1).join(" | "));

// tab SEWA -> bucket sewa
dealTabs[2].dispatch("click");
const optsSewa = els.priceFilter.children.map(o => o.textContent);
assert.ok(optsSewa.includes("Bawah RM2k"), "tab Sewa mesti tukar bucket ke sewa: " + optsSewa.join(","));
console.log("bucket SEWA:", optsSewa.slice(1).join(" | "));

// kembali JUAL, pilih bucket -> kad ditapis
dealTabs[1].dispatch("click");
const idx = els.priceFilter.children.findIndex(o => o.textContent === "Bawah RM500k");
els.priceFilter.value = els.priceFilter.children[idx].value;
els.priceFilter.dispatch("change");
assert.strictEqual(minI.value, ""); assert.strictEqual(maxI.value, "499999");
const cards = (grid.innerHTML.match(/class="card"/g) || []).length;
const semuaHarga = LISTINGS.filter(l => l.active !== false && (Array.isArray(l.jenis) ? l.jenis.includes("JUAL") : l.jenis === "JUAL") && (l.price || 0) <= 499999).length;
console.log("kad selepas tapis Bawah RM500k:", cards, "| jangkaan:", semuaHarga);
assert.ok(cards > 0 && cards <= semuaHarga, "kad " + cards + " mesti antara 1.." + semuaHarga + " (dedupe projek)");
// setiap kad INDIVIDU mesti dalam bucket (kad projek papar julat penuh unit — pre-existing)
const arts = grid.innerHTML.split('<article class="card').slice(1);
const luar = [];
for (const a of arts) {
  if (a.startsWith(" card-proj")) continue;             // kad projek: julat penuh unit
  const m = /class="price">RM([\d,]+)/.exec(a);
  if (m && Number(m[1].replace(/,/g, "")) > 499999) luar.push(m[1]);
}
assert.strictEqual(luar.length, 0, "kad individu luar bucket: " + luar.join(","));
console.log("kad individu:", arts.length, "| semua dalam bucket");

// Reset -> bucket kosong
els.clearBtn.dispatch("click");
assert.strictEqual(els.priceFilter.value, "", "Reset mesti kosongkan priceFilter");
assert.strictEqual(minI.value, ""); assert.strictEqual(maxI.value, "");

console.log("\nSEMUA LULUS");
