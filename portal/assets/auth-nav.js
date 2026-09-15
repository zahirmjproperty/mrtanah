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
    PEMILIK_LADANG:   { nama: "Dashboard Ladang",     ico: "🌴", url: "ladang-pemilik.html", sedia: true,  mod: "login" },
    PENYEWA:          { nama: "Dashboard Penyewa",    ico: "🧾", url: "penyewa.html",        sedia: true,  mod: "token" },
    KONTRAKTOR:       { nama: "Dashboard Kontraktor", ico: "🔧", url: "kontraktor.html",     sedia: true,  mod: "login" },
    EJEN:             { nama: "Dashboard Ejen",       ico: "🧑‍💼", url: "ejen.html",          sedia: true,  mod: "login" },
    /* ---- Role baharu (didaftar 13/9/2026; dashboard dalam perancangan) ---- */
    PEMBELI_HARTANAH:     { nama: "Dashboard Pembeli",      ico: "🛒", url: "pembeli.html",       sedia: true,  mod: "login" },
    PEMBELI_HASIL_LADANG:{ nama: "Dashboard Pembeli Ladang", ico: "🌾", url: "pembeli-ladang.html", sedia: true, mod: "login" },
    PENJUAL_HARTANAH:     { nama: "Dashboard Penjual",      ico: "🏷️", url: "penjual.html",       sedia: true,  mod: "login" },
    SOLICITOR:            { nama: "Dashboard Peguamcara", ico: "⚖️", url: "solicitor.html",  sedia: true,  mod: "login" },
    MORTGAGE_OFFICER:     { nama: "Dashboard Pembiayaan", ico: "🏦", url: "pembiayaan.html",  sedia: true,  mod: "login" },
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

  /* Bar "Menu Utama" — dipaparkan pada SEMUA dashboard (walaupun 1 peranan sahaja).
   * Arahan Zahir 15 Sep 2026: selepas log masuk pengguna nampak peranannya, boleh pilih dashboard
   * mengikut peranan, dan boleh kembali ke Menu Utama untuk tukar peranan atau mohon peranan baharu. */
  function lukis(el, peranans, semasa) {
    if (!el) return false;
    var set = senarai(peranans);
    var h = '<div class="phmt-nav" style="margin:0 0 12px;padding:10px 12px;background:#f4f7f9;border:1px solid #dbe4ea;border-radius:10px">';
    h += '<div style="display:flex;flex-wrap:wrap;gap:7px;align-items:center">'
      + '<a class="btn ghost" style="text-decoration:none;font-size:13px" href="/portal/masuk.html">🏠 Menu Utama</a>'
      + '<span style="font-size:12px;color:#5a6b76">Peranan anda' + (set.length ? " (" + set.length + ")" : "") + ":</span>";
    if (!set.length) h += '<span style="font-size:12.5px;color:#5a6b76">tiada dashboard dikaitkan</span>';
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
    h += '<a class="btn ghost" style="text-decoration:none;font-size:13px" href="/portal/daftar-peranan.html">➕ Permohonan Peranan</a>';
    h += '<span style="flex:1"></span>';
    h += '<button type="button" class="btn keluar" style="font-size:13px" id="phmtKeluar">🚪 Log Keluar</button>';
    h += "</div></div>";
    el.innerHTML = h;
    var bk = document.getElementById("phmtKeluar");
    if (bk) bk.onclick = function () { keluar(); };
    return true;
  }

  /* Log keluar dari peranti ini (peranti kongsi) — guna SDK jika ada, jika tidak guna REST Supabase. */
  function keluar() {
    if (typeof window === "undefined") return;
    if (!confirm("Log keluar dari akaun anda pada peranti ini?")) return;
    function selesai() { location.href = "/portal/login.html?keluar=1"; }
    var A = window.AUTH || {};
    var PR = String(A.url || "").replace(/^https?:\/\//, "").split(".")[0];
    var KUNCI = PR ? ("sb-" + PR + "-auth-token") : "";
    var tok = "";
    try {
      var raw = KUNCI ? localStorage.getItem(KUNCI) : "";
      if (raw) { var d = JSON.parse(raw); tok = (d && (d.access_token || (d.currentSession && d.currentSession.access_token))) || ""; }
    } catch (e) {}
    function bersih() {
      try { if (KUNCI) localStorage.removeItem(KUNCI); } catch (e) {}
      try { localStorage.removeItem("mt_admin_token"); } catch (e) {}
      try { sessionStorage.removeItem("mt_sesi_token"); } catch (e) {}
      selesai();
    }
    if (window.supabase && window.supabase.createClient && A.url && A.key) {
      try { window.supabase.createClient(A.url, A.key).auth.signOut().then(bersih, bersih); return; } catch (e) {}
    }
    if (tok && A.url) {
      fetch(A.url.replace(/\/+$/, "") + "/auth/v1/logout", { method: "POST", headers: { apikey: A.key, Authorization: "Bearer " + tok } })
        .then(bersih, bersih);
      return;
    }
    bersih();
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
