/* Render dashboard marketing (mock-up) untuk satu jenama.
   Guna: <script>DASH.init('zmp')</script> */
(function () {
  var M = window.MOCK;
  var B = null, ENTRI = [], bulan = null, tapis = { status: "", saluran: "", cari: "" };
  var NAMA_BULAN = ["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"];
  var HARI = ["Ahd","Isn","Sel","Rab","Kha","Jum","Sab"];

  function esc(s) { return (s || "").replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function kodStatus(s) { return s === "Dijadualkan" ? "jadual" : s.charAt(0).toLowerCase() + s.slice(1); }
  function tarikh(d) { return new Date(d + "T00:00:00"); }
  function pad(n) { return String(n).padStart(2, "0"); }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }   // tarikh LOKAL (bukan UTC)
  function hariIni() { return M.today || iso(new Date()); }
  function lompatHari(d, n) { var x = tarikh(d); x.setDate(x.getDate() + n); return iso(x); }
  function labelTempat(t) {
    var ikon = { "FB Page": "📘", "FB Group": "👥", "Marketplace": "🛒", "Instagram": "📸", "TikTok": "🎵", "YouTube": "▶️",
      "WA Status": "🟢", "WA Broadcast": "📢", "Telegram": "✈️", "Mudah.my": "🏠", "PropertyGuru": "🔑", "EdgeProp": "📰",
      "Website/Blog": "🌐", "GBP": "📍", "Google Ads": "💰" };
    return (ikon[t] || "•") + " " + t;
  }
  function simpan() { try { localStorage.setItem("mock_mkt_" + B.slug, JSON.stringify(ENTRI)); } catch (e) {} }

  function head() {
    document.body.innerHTML =
      '<div class="topbar"><h1>📣 Dashboard Marketing — ' + esc(B.jenama) + '</h1>' +
      '<p>Jadual · perancangan · material · tempat posting — satu tempat untuk Zahir &amp; Fadilah.</p>' +
      '<div class="meta"><span class="pill">👤 Zahir (login)</span><span class="pill">👤 Fadilah (login)</span>' +
      '<span class="pill">' + esc(B.domain) + '</span><span class="pill uji">MOCK-UP — belum production</span></div>' +
      '<div class="crumbs"><a href="index.html">← Pilih jenama</a> · <a href="' + (B.slug === "zmp" ? "mt.html" : "zmp.html") + '">Tukar ke ' +
      (B.slug === "zmp" ? "Mr Tanah" : "Zahir MJ Property") + '</a></div></div>' +
      '<div class="wrap" id="isi"></div>' +
      '<div class="footer">Mock-up reka bentuk (Fasa 0) · data contoh — sebahagian daripada listing sebenar laman · ' +
      'Metrik &amp; Ads serta pematuhan automatik = Fasa 2 (belum aktif)</div>' +
      '<div class="modal" id="modal"><div class="dalam" id="modalIsi"></div></div>';
  }

  function ringkas() {
    var hari = hariIni(), tujuh = lompatHari(hari, 7);
    var bulanIni = ENTRI.filter(function (e) { return e.t.slice(0, 7) === hari.slice(0, 7); });
    var perlu = ENTRI.filter(function (e) { return e.t >= hari && e.t <= tujuh && e.s !== "Terbit"; });
    var tersekat = ENTRI.filter(function (e) { return (e.s === "Draf" || e.s === "Semakan") && e.t < hari; });
    var terbitBulanIni = bulanIni.filter(function (e) { return e.s === "Terbit"; }).length;
    var tac = {};
    bulanIni.forEach(function (e) { (e.tt || []).forEach(function (t) { tac[t] = (tac[t] || 0) + 1; }); });
    var saluranTerbaik = Object.keys(tac).sort(function (a, b) { return tac[b] - tac[a]; }).slice(0, 3)
      .map(function (k) { return esc(k) + " (" + tac[k] + ")"; }).join(" · ");
    return '<div class="angka">' +
      '<div><b>' + bulanIni.length + '</b><span>Entri dirancang bulan ini</span></div>' +
      '<div><b>' + terbitBulanIni + '</b><span>Sudah terbit</span></div>' +
      '<div><b>' + perlu.length + '</b><span>Perlu terbit 7 hari akan datang</span></div>' +
      '<div><b>' + tersekat.length + '</b><span>⚠️ Tersekat (tarikh berlalu, belum siap)</span></div>' +
      '<div style="flex:2 1 240px"><b style="font-size:13px">' + (saluranTerbaik || "—") + '</b><span>Tempat posting paling aktif bulan ini</span></div>' +
      '</div>';
  }

  function kadHariIni() {
    var hari = hariIni(), keluar = "", n = 0;
    for (var i = 0; i <= 3; i++) {
      var d = lompatHari(hari, i);
      ENTRI.filter(function (e) { return e.t === d; }).forEach(function (e) {
        n++;
        var lewat = (e.t < hari) || (e.t === hari && e.s !== "Terbit");
        keluar += '<div class="ki ' + (e.s === "Terbit" ? "ok" : (lewat ? "lewat" : "")) + '">' +
          '<b>' + (i === 0 ? "Hari ini" : i === 1 ? "Esok" : HARI[tarikh(d).getDay()] + " " + d.slice(8)) + " · " + e.m + ' · ' + esc(e.tj) + '</b>' +
          '<span>' + esc(e.j) + ' (' + esc(e.jp) + ') · ' + esc(e.l || "kandungan umum") + ' · PIC ' + esc(e.pic) + '</span><br>' +
          '<span class="tag s-' + e.s + '">' + esc(e.s) + '</span> ' +
          (e.tt || []).map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join(" ") + '</div>';
      });
    }
    if (!n) keluar = '<p class="sub">Tiada entri untuk 4 hari ini — tambah entri baharu.</p>';
    return '<div class="card"><h2>📌 Hari Ini &amp; 3 Hari Akan Datang <span class="kecil">— apa yang perlu terbit</span></h2>' +
      '<div class="hari-ini">' + keluar + '</div></div>';
  }

  function kalendar() {
    var y = bulan.getFullYear(), m = bulan.getMonth();
    var pertama = new Date(y, m, 1), hariPertama = pertama.getDay(), bilHari = new Date(y, m + 1, 0).getDate();
    var sel = "";
    HARI.forEach(function (h) { sel += '<div class="hd">' + h + '</div>'; });
    for (var k = 0; k < hariPertama; k++) sel += '<div></div>';
    for (var d = 1; d <= bilHari; d++) {
      var key = y + "-" + String(m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
      var ee = ENTRI.filter(function (e) { return e.t === key; });
      sel += '<div class="d' + (ee.length ? "" : " kosong") + (key === hariIni() ? " today" : "") + '">' +
        '<div class="no">' + d + '</div>' +
        ee.map(function (e) { return '<div class="e ' + kodStatus(e.s)[0] + '" title="' + esc(e.s + " · " + e.tj) + '">' + esc(e.tj.slice(0, 26)) + '</div>'; }).join("") +
        '</div>';
    }
    return '<div class="card"><h2>🗓️ Kalendar Bulan <span class="kecil">— lihat jurang &amp; kluster</span></h2>' +
      '<div class="filter" style="align-items:center"><button class="ghost" id="prev">‹</button><b>' + NAMA_BULAN[m] + " " + y +
      '</b><button class="ghost" id="next">›</button>' +
      '<span class="sub" style="margin:0 0 0 8px">Setiap kotak = kandungan pada tarikh itu · warna = status</span></div>' +
      '<div class="kal">' + sel + '</div></div>';
  }

  function jadual() {
    var senarai = ENTRI.filter(function (e) {
      if (tapis.status && e.s !== tapis.status) return false;
      if (tapis.saluran && (e.tt || []).indexOf(tapis.saluran) === -1) return false;
      if (tapis.cari) {
        var s = (e.tj + " " + (e.l || "") + " " + e.pic).toLowerCase();
        if (s.indexOf(tapis.cari.toLowerCase()) === -1) return false;
      }
      return true;
    }).sort(function (a, b) { return (a.t + a.m) < (b.t + b.m) ? -1 : 1; });

    var baris = senarai.map(function (e) {
      return '<tr><td><b>' + esc(e.t) + '</b><br><span class="sub" style="margin:0">' + esc(e.m) + '</span></td>' +
        '<td><b>' + esc(e.tj) + '</b><br><span class="tiang">' + esc(e.j) + ' · ' + esc(e.jp) + (e.l ? ' · ' + esc(e.l) : "") + '</span>' +
        (e.aset ? '<br><span class="chip b">📁 material sedia</span>' : '<br><span class="chip">📁 material belum ada</span>') + '</td>' +
        '<td>' + (e.tt || []).map(function (t) { return '<span class="chip">' + labelTempat(t) + '</span>'; }).join("") +
        ((e.tt || []).length < 3 ? '<br><span class="tiang">⚠️ kurang 3 tempat</span>' : "") + '</td>' +
        '<td>' + esc(e.pic) + '</td>' +
        '<td><span class="tag s-' + e.s + '">' + esc(e.s) + '</span></td></tr>';
    }).join("");

    return '<div class="card"><h2>📋 Jadual Posting <span class="kecil">— senarai penuh, boleh tapis</span></h2>' +
      '<div class="filter">' +
      '<select id="fStatus"><option value="">Semua status</option>' + M.status.map(function (s) { return '<option' + (tapis.status === s ? " selected" : "") + '>' + s + '</option>'; }).join("") + '</select>' +
      '<select id="fSaluran"><option value="">Semua tempat posting</option>' + M.saluran.map(function (s) { return '<option' + (tapis.saluran === s ? " selected" : "") + '>' + s + '</option>'; }).join("") + '</select>' +
      '<input type="search" id="fCari" placeholder="Cari tajuk / listing / PIC" value="' + esc(tapis.cari) + '">' +
      '<button id="tambah">+ Tambah entri</button>' +
      '<button class="ghost" id="reset">Set semula</button></div>' +
      '<div style="overflow:auto"><table><thead><tr><th>Tarikh / Masa</th><th>Kandungan &amp; material</th><th>Tempat posting</th><th>PIC</th><th>Status</th></tr></thead>' +
      '<tbody>' + (baris || '<tr><td colspan="5" class="sub">Tiada entri sepadan tapisan.</td></tr>') + '</tbody></table></div></div>';
  }

  function matriks() {
    var kol = M.saluran.filter(function (s) { return B.matriks.some(function (r) { return r[2].indexOf(s) > -1; }); });
    var baris = B.matriks.map(function (r) {
      return '<tr><td><b>' + esc(r[0]) + '</b><br><span class="sub" style="margin:0">' + esc(r[1]) + '</span></td>' +
        kol.map(function (s) { return '<td class="tick ' + (r[2].indexOf(s) > -1 ? "ya" : "tak") + '">' + (r[2].indexOf(s) > -1 ? "✓" : "–") + '</td>'; }).join("") +
        '<td class="sub" style="margin:0">' + r[2].length + ' tempat' + (r[2].length < 3 ? " ⚠️" : "") + '</td></tr>';
    }).join("");
    return '<div class="card"><h2>🧭 Matriks Tempat Posting <span class="kecil">— setiap listing × setiap saluran</span></h2>' +
      '<p class="sub">Peraturan laman: setiap listing baharu = <b>minimum 3 tempat</b> dalam minggu pertama (Telegram + FB/Group + portal/laman).</p>' +
      '<div style="overflow:auto"><table class="matriks"><thead><tr><th>Listing</th>' +
      kol.map(function (s) { return '<th style="font-size:10.5px">' + esc(s) + '</th>'; }).join("") + '<th>Jumlah</th></tr></thead>' +
      '<tbody>' + baris + '</tbody></table></div></div>';
  }

  function kanban() {
    var kol = M.status.map(function (s) {
      var isi = ENTRI.filter(function (e) { return e.s === s; });
      return '<div class="kol"><h4>' + s + " (" + isi.length + ')</h4>' + isi.map(function (e) {
        return '<div class="it ' + kodStatus(s) + '"><b>' + esc(e.tj) + '</b><span>' + esc(e.t.slice(5)) + " · " + esc(e.m) + " · " + esc(e.pic) + '</span></div>';
      }).join("") + '</div>';
    }).join("");
    return '<div class="card"><h2>🗂️ Papan Status (Kanban) <span class="kecil">— aliran kerja idea → terbit</span></h2>' +
      '<div class="kolam">' + kol + '</div></div>';
  }

  function nota() {
    return '<div class="card belum"><h2>📈 Metrik &amp; Ads <span class="kecil">— Fasa 2 (belum aktif)</span></h2>' +
      '<p class="sub">Akan disambung: GA4 (ZMP/MT), Google Ads, GBP (panggilan/arah/klik laman), lead per saluran &amp; kos per lead, ' +
      'top/bottom post, pangkalan bukti (format menang). Sumber: snapshot automatik → Google Sheet → Looker Studio.</p></div>' +
      '<div class="card belum"><h2>✅ Pematuhan (gate sebelum terbit) <span class="kecil">— Fasa 2</span></h2>' +
      '<p class="sub">Checklist automatik: nama firma + telefon + nombor REA/REN (MEAS Standard 6) · tiada superlatif ("terbaik/No.1") · ' +
      'kebenaran bertulis pemilik · gambar tanpa nombor telefon/watermark · consent PDPA jika guna nombor.</p></div>';
  }

  function borang() {
    var o = function (arr) { return arr.map(function (x) { return '<option>' + x + '</option>'; }).join(""); };
    var c = M.saluran.map(function (s) { return '<label style="font-size:11.5px"><input type="checkbox" value="' + s + '"> ' + s + '</label>'; }).join("");
    return '<h3>➕ Tambah entri (mock-up — tidak disimpan ke sistem)</h3><div class="f2">' +
      '<label style="grid-column:1/-1">Tajuk kandungan<input type="text" id="nTajuk" placeholder="cth. Tur rumah: End Lot Kajang"></label>' +
      '<label>Tarikh<input type="date" id="nTarikh"></label>' +
      '<label>Masa<input type="time" id="nMasa" value="20:30"></label>' +
      '<label>Tiang kandungan<select id="nTiang">' + o(M.tiang) + '</select></label>' +
      '<label>Jenis<select id="nJenis">' + o(M.jenis) + '</select></label>' +
      '<label>Listing berkaitan<select id="nListing"><option value="">— tiada —</option>' + o(B.listing.map(function (x) { return x[0] + " — " + x[1]; })) + '</select></label>' +
      '<label>PIC<select id="nPic">' + o(M.pic) + '</select></label>' +
      '<label>Status<select id="nStatus">' + o(M.status) + '</select></label>' +
      '<label style="grid-column:1/-1">Pautan material (Drive)<input type="text" id="nAset" placeholder="Drive: Listing/COA-0000/*.jpg"></label>' +
      '<label style="grid-column:1/-1">Tempat posting<Br><span id="nTempat" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:4px">' + c + '</span></label>' +
      '</div><div class="aksi"><button class="ghost" id="batal">Batal</button><button id="simpan">Tambah ke jadual</button></div>';
  }

  function ikat() {
    var el = function (id) { return document.getElementById(id); };
    if (el("prev")) el("prev").onclick = function () { bulan.setMonth(bulan.getMonth() - 1); lukis(); };
    if (el("next")) el("next").onclick = function () { bulan.setMonth(bulan.getMonth() + 1); lukis(); };
    if (el("fStatus")) el("fStatus").onchange = function () { tapis.status = this.value; lukis(); };
    if (el("fSaluran")) el("fSaluran").onchange = function () { tapis.saluran = this.value; lukis(); };
    if (el("fCari")) el("fCari").oninput = function () { tapis.cari = this.value; lukis(); };
    if (el("reset")) el("reset").onclick = function () { tapis = { status: "", saluran: "", cari: "" }; lukis(); };
    if (el("tambah")) el("tambah").onclick = function () {
      el("modalIsi").innerHTML = borang(); el("modal").classList.add("buka");
      el("nTarikh").value = hariIni();
      el("batal").onclick = function () { el("modal").classList.remove("buka"); };
      el("simpan").onclick = function () {
        var tt = Array.prototype.slice.call(document.querySelectorAll("#nTempat input:checked")).map(function (x) { return x.value; });
        var tajuk = el("nTajuk").value.trim(); if (!tajuk) { alert("Isi tajuk dahulu."); return; }
        ENTRI.push({ t: el("nTarikh").value || hariIni(), m: el("nMasa").value || "20:30", tj: tajuk, j: el("nTiang").value, jp: el("nJenis").value,
          tt: tt, l: (el("nListing").value || "").split(" — ")[0], pic: el("nPic").value, s: el("nStatus").value, aset: el("nAset").value, utm: "" });
        simpan(); el("modal").classList.remove("buka"); lukis();
      };
    };
    document.querySelectorAll(".modal").forEach(function (m) {
      m.onclick = function (ev) { if (ev.target === m) m.classList.remove("buka"); };
    });
  }

  function lukis() {
    document.getElementById("isi").innerHTML =
      '<div class="card">' + ringkas() + '<p class="sub" style="margin:0">Semua angka di atas dikira daripada entri dalam dashboard ini (data contoh mock-up).</p></div>' +
      '<div class="grid2"><div>' + kadHariIni() + kalendar() + jadual() + matriks() + kanban() + '</div>' +
      '<div>' + panelSisi() + nota() + '</div></div>';
    ikat();
  }

  function panelSisi() {
    var idea = ENTRI.filter(function (e) { return e.s === "Idea"; });
    var material = ENTRI.filter(function (e) { return e.aset; });
    return '<div class="card"><h2>💡 Bank Idea <span class="kecil">(' + idea.length + ')</span></h2>' +
      '<p class="sub">Supaya tiada skrin kosong bila tiba masa posting.</p>' +
      (idea.map(function (e) { return '<div class="it idea" style="border-left:4px solid #8a94a6;padding:6px 8px;background:#fbfdff;border-radius:8px;margin-bottom:6px;font-size:12px">' +
        '<b style="display:block">' + esc(e.tj) + '</b><span class="tiang">' + esc(e.j) + " · " + esc(e.jp) + '</span></div>'; }).join("") || '<p class="sub">—</p>') + '</div>' +
      '<div class="card"><h2>📁 Material Sedia</h2><p class="sub">Aset (gambar/video/flyer) dipautkan dari Drive per listing — bukan dicari bila nak post.</p>' +
      material.slice(0, 6).map(function (e) { return '<div style="font-size:12px;margin-bottom:5px"><span class="chip b">📁</span> ' + esc(e.aset) + '</div>'; }).join("") +
      '</div>' +
      '<div class="card"><h2>📊 Ringkasan Tempat Posting</h2>' +
      (function () {
        var tac = {}; ENTRI.forEach(function (e) { (e.tt || []).forEach(function (t) { tac[t] = (tac[t] || 0) + 1; }); });
        return Object.keys(tac).sort(function (a, b) { return tac[b] - tac[a]; }).map(function (k) {
          return '<div style="font-size:12px;display:flex;justify-content:space-between;margin-bottom:4px"><span>' + labelTempat(k) + '</span><b>' + tac[k] + '</b></div>';
        }).join("");
      })() + '</div>';
  }

  window.DASH = { init: function (slug) {
    B = M[slug];
    bulan = new Date(); bulan.setDate(1);
    var simpanan = null;
    try { simpanan = JSON.parse(localStorage.getItem("mock_mkt_" + slug) || "null"); } catch (e) {}
    ENTRI = simpanan && simpanan.length ? simpanan : B.entri.map(function (e) { return JSON.parse(JSON.stringify(e)); });
    head(); lukis();
  } };
})();
