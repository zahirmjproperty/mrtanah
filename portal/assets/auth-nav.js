/* auth-nav.js — Pemilih Dashboard PHMT (Pengurusan Hartanah Mr Tanah)
 * Satu sumber kebenaran: role → dashboard. Satu akaun boleh ada banyak role.
 * Guna: PHMT.lukis(el, peranans, roleSemasa)  — el = elemen bekas; peranans = senarai dari aksi=sesi.
 */
(function () {
  "use strict";

  var SEMUA = {
    /* ---- Role pengurusan & pelanggan sedia ada ---- */
    ADMIN:            { nama: "Dashboard Pengurusan", ico: "📊", url: "pemuka.html",         sedia: true,  mod: "login" },
    PEMILIK_HARTANAH: { nama: "Dashboard Pemilik",    ico: "🏠", url: "pemilik.html",        sedia: true,  mod: "login" },
    PEMILIK_LADANG:   { nama: "Dashboard Ladang",     ico: "🌴", url: "ladang-pemilik.html", sedia: true,  mod: "token" },
    PENYEWA:          { nama: "Dashboard Penyewa",    ico: "🧾", url: "penyewa.html",        sedia: true,  mod: "token" },
    KONTRAKTOR:       { nama: "Dashboard Kontraktor", ico: "🔧", url: "kontraktor.html",     sedia: true,  mod: "login" },
    EJEN:             { nama: "Dashboard Ejen",       ico: "🧑‍💼", url: "ejen.html",          sedia: true,  mod: "login" },
    /* ---- Role baharu (didaftar 13/9/2026; dashboard dalam perancangan) ---- */
    PEMBELI_HARTANAH:     { nama: "Dashboard Pembeli",      ico: "🛒", url: "pembeli.html",       sedia: true,  mod: "login" },
    PEMBELI_HASIL_LADANG: { nama: "Pembeli Hasil Ladang", ico: "🌾", url: "pembeli-ladang.html", sedia: false, mod: "belum" },
    PENJUAL_HARTANAH:     { nama: "Penjual Hartanah",      ico: "🏷️", url: "penjual.html",       sedia: false, mod: "belum" },
    SOLICITOR:            { nama: "Solicitor (Conveyancing)", ico: "⚖️", url: "solicitor.html",  sedia: false, mod: "belum" },
    MORTGAGE_OFFICER:     { nama: "Mortgage Officer (Pembiayaan)", ico: "🏦", url: "pembiayaan.html", sedia: false, mod: "belum" },
    /* Role teknikal: pemilik dalam konteks tiket aduan sahaja (tiada dashboard portfolio) */
    PEMILIK:          { nama: "Pemilik (tiket aduan)", ico: "📋", url: "aduan-pemilik.html",   sedia: true,  mod: "token" }
  };

  function senarai(peranans) {
    var keluar = [];
    (peranans || []).forEach(function (p) {
      var s = SEMUA[String(p).toUpperCase()];
      if (s) keluar.push({ peranan: String(p).toUpperCase(), nama: s.nama, ico: s.ico, url: s.url, sedia: s.sedia, mod: s.mod });
    });
    return keluar;
  }

  /* Lukis bar pemilih. peranans = senarai peranan; semasa = peranan halaman ini (boleh kosong) */
  function lukis(el, peranans, semasa) {
    if (!el) return false;
    var set = senarai(peranans);
    if (set.length < 2) { el.innerHTML = ""; return false; }   // satu dashboard sahaja → tak perlu pemilih
    var h = '<div class="phmt-nav" style="margin:0 0 12px;padding:9px 11px;background:#f4f7f9;border:1px solid #dbe4ea;border-radius:10px">'
      + '<div style="font-size:12px;color:#5a6b76;margin-bottom:7px">Akses anda (' + set.length + ' dashboard) — pilih paparan:</div>'
      + '<div class="btnrow" style="display:flex;flex-wrap:wrap;gap:6px">';
    set.forEach(function (s) {
      var aktif = semasa && s.peranan === String(semasa).toUpperCase();
      if (!s.sedia) {
        h += '<span class="btn ghost" style="opacity:.5;cursor:not-allowed;text-decoration:none;font-size:13px" title="Belum dibina">'
          + s.ico + " " + s.nama + " <small>(akan datang)</small></span>";
      } else if (aktif) {
        h += '<span class="btn" style="text-decoration:none;font-size:13px;pointer-events:none">' + s.ico + " " + s.nama + " ✓</span>";
      } else {
        var nota = s.mod === "token" ? ' title="Paparan ini menggunakan pautan token"' : "";
        h += '<a class="btn ghost" style="text-decoration:none;font-size:13px"' + nota + ' href="' + s.url + '">' + s.ico + " " + s.nama + "</a>";
      }
    });
    h += "</div></div>";
    el.innerHTML = h;
    return true;
  }

  /* Ambil peranan dari pelayan (aksi=sesi) — pulangkan [] jika bukan mod log masuk */
  function ambilPeranan(api, accessToken) {
    if (!api || !accessToken) return Promise.resolve([]);
    return fetch(api + "?aksi=sesi&access_token=" + encodeURIComponent(accessToken) + "&_=" + Date.now())
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || !d.ok) return [];
        return (d.peranans && d.peranans.length) ? d.peranans : [d.peranan];
      })
      .catch(function () { return []; });
  }

  window.PHMT = { SEMUA: SEMUA, senarai: senarai, lukis: lukis, ambilPeranan: ambilPeranan };
})();
