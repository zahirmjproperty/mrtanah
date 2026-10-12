// Ujian regresi: carian laman utama mrtanah.com (negeri, kata kunci, kod tracking, reset).
// Jalankan: node test_carian.js
const fs = require("fs");
function El(tag, attrs = {}) {
  const e = {
    tagName: tag.toUpperCase(), children: [], _attrs: { ...attrs }, value: "", textContent: "",
    style: {}, dataset: {}, hidden: false,
    classList: { _s: new Set(), add(c){this._s.add(c)}, remove(c){this._s.delete(c)},
      toggle(c, on){ on ? this._s.add(c) : this._s.delete(c) }, contains(c){return this._s.has(c)} },
    set innerHTML(v) { this._html = v; this.children = [];
      const m = /<option value="">([^<]*)<\/option>/.exec(v || "");
      if (m) { const o = El("option"); o.value = ""; o.textContent = m[1]; this.children.push(o); } },
    get innerHTML() { return this._html || ""; },
    appendChild(c) { this.children.push(c); return c; },
    addEventListener(t, f) { ((this._ev = this._ev || {})[t] = this._ev?.[t] || []).push(f); },
    dispatch(t) { ((this._ev || {})[t] || []).forEach(f => f({ preventDefault(){}, target: this })); },
    querySelectorAll() { return []; }, setAttribute(k,v){this._attrs[k]=v}, getAttribute(k){return this._attrs[k]},
    scrollIntoView() {}, insertBefore(n) { this.children.push(n); },
    get parentNode() { return El("div"); }, nextSibling: null,
  };
  if (attrs.id) e.id = attrs.id;
  return e;
}
const els = {};
const reg = e => (els[e.id] = e);
function mkSelect(id, label) { const s = El("select", { id }); const o = El("option"); o.value = ""; o.textContent = label; s.children.push(o); return s; }

const dealTabs = ["", "JUAL", "SEWA", "JV"].map(d => { const b = El("button"); b.dataset.deal = d; return b; });
global.document = {
  getElementById: id => els[id] || null,
  createElement: t => El(t),
  querySelectorAll: sel => (sel === ".deal-tab" ? dealTabs : []),
  addEventListener: () => {}, body: El("body"),
};
global.window = global; global.location = { search: "", pathname: "/" };
global.history = { replaceState() {} }; global.URLSearchParams = URLSearchParams;
global.Event = class { constructor(t){this.type=t} }; global.Node = class {};
global.LISTINGS = JSON.parse(fs.readFileSync("data/listings.js","utf8").match(/\[[\s\S]*\]/)[0]);

reg(El("div", { id: "listingGrid" }));
reg(mkSelect("stateFilter", "Semua Negeri"));
reg(mkSelect("typeFilter", "Jenis Aset"));
reg(mkSelect("priceFilter", "Julat Harga"));
reg(El("input", { id: "minPrice" })); reg(El("input", { id: "maxPrice" }));
reg(mkSelect("sortSelect", "Terkini"));
reg(El("input", { id: "searchInput" }));
reg(El("button", { id: "clearBtn" }));
reg(El("div", { id: "emptyMsg" }));
reg(El("span", { id: "statAktif" }));
reg(El("p", { id: "resultCount" }));

eval(fs.readFileSync("app.js", "utf8"));

const kad = () => (els.listingGrid.innerHTML.match(/class="card"/g) || []).length;
const kira = () => els.resultCount.textContent;

console.log("=== keadaan awal ===");
console.log("kad:", kad(), "| kira:", kira());

console.log("\n=== pilih Negeri=Pahang (dispatch change) ===");
els.stateFilter.value = "Pahang";
els.stateFilter.dispatch("change");
console.log("kad:", kad(), "| kira:", kira());

console.log("\n=== taip q='Pahang' (dispatch input) ===");
els.stateFilter.value = "";
els.stateFilter.dispatch("change");
els.searchInput.value = "Pahang";
els.searchInput.dispatch("input");
console.log("kad:", kad(), "| kira:", kira());

console.log("\n=== q='tanah' ===");
els.searchInput.value = "tanah";
els.searchInput.dispatch("input");
console.log("kad:", kad(), "| kira:", kira());

console.log("\n=== q kod tracking 'MTCOA-0059' ===");
els.searchInput.value = "MTCOA-0059";
els.searchInput.dispatch("input");
console.log("kad:", kad(), "| kira:", kira());

console.log("\n=== reset ===");
els.clearBtn.dispatch("click");
console.log("kad:", kad(), "| kira:", kira());
