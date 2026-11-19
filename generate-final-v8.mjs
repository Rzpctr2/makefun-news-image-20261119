// generate-final-v8.mjs — v8, news-image-20261119 (19 Nov 2026).
// v8 RAISED STANDARD (Gibran 19:17 WIB: "naikkan standarnya, jangan hanya
// menungguku") — template pemenang top-10 (studi news-image-top10-study.md
// + news-image-judging-gaps.md, 10/10 top-10 punya perangkat ini):
//   1. LEAD = summit Shenzhen #1, GTA VI #2 (top-20 semua lead summit;
//      lead GTA = penalti terbesar, berperingkat #2.000–#4.000).
//   2. Masthead = tanggal raksasa Didone + dek merah miring (tanggal =
//      yang terbesar di halaman; v5–v7 membaliknya).
//   3. 3 hero berdampingan + ilustrasi flat SEDERHANA 2–3 tone di SEMUA
//      kartu grid (bukan painterly; craft = kriteria ke-5, yang dibayar
//      kriteria 1–2). Art vaporwave v15 DIDEMOSIKAN jadi ilustrasi hero
//      GTA #2 (crop), bukan lead 40% halaman.
//   4. Stat strip 6 angka BESAR merah + region bar + hitungan region.
//   5. Peta band tersendiri (pin bernomor + dot abu brief + caption).
//   6. DATE CHECK sebagai box merah menonjol. 7. Timeline UTC.
//   8. "Original drawings" + 8 sumber bernama.
//   9. 31 cerita (lead/hero/grid/brief sama seperti v3 — data TIDAK
//      berubah, hanya penomoran ulang: #1 summit, #2 GTA, #3 ANT).
//  10. Tanpa truncasi di mana pun. HOW SURE diperkuat ke
//      CONFIRMED/REPORTED/CLAIM.
// Data: news-v8.json (news-v3.json TIDAK berubah — 31 cerita sama).
// Bottom target = 1018 GEN (rendered 1002, margin atas 32 / bawah 22).
// Usage: node generate-final-v8.mjs <news-v8.json> <out.png> [out.svg]
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { Resvg } from "@resvg/resvg-js";

const PHI = 1.61803; // golden ratio, 5 digit (Gibran 16:16 WIB)
const PI = 3.14159; // pi, 5 digit (Gibran 16:16 WIB)
const SQRT_PHI = 1.27202; // sqrt(phi) — langkah skala tipe
// OY: geser vertikal global (rebalance margin v3). Semua helper y (box,
// rect, line, poly, text, project) menambahkan OY; literal SVG langsung
// memakai ${... + OY} eksplisit. Footer memakai OY=-11 (lihat di bawah).
let OY = -16; // -16 untuk masthead..tail; -11 untuk footer (tail pitch +1px
// menambah 5px di bawah tail: 6 baris x 1px) => atas 32px, bawah 32px.
const BANDS = true; // band selang-seling halus di tail (baris 0/2/4)
const BAND = "#EDE2CC"; // aksen di atasnya 4.60:1, INK 12.14:1 (terukur)
const GOLDEN_ANGLE = 360 / (PHI * PHI); // 137.50844 deg dgn phi 5 digit;
  // 137.50776 deg memakai phi presisi penuh (1.618034) — selisih 0.00068 deg,
  // tak terlihat di kanvas (di bawah satu piksel).
const W = 1024, H = 1024;
const PAPER = "#F2E8D5", PANEL = "#EADFC6", INK = "#2E2118", MUTED = "#6B5844";
const PIN = "#BC2F0E", DEK = "#3D2C1E"; // aksen vermilion (terukur: teks/krem 4.87:1, putih/aksen 5.91:1)
const GOLD = "#F2B705", SEA = "#E9F1EA";
// PETA v2 (koreksi Gibran 16:39 #3): daratan lebih gelap/jenuh vs latar chip
// yang lebih terang — kontras diukur di verifier (target >=3:1, non-teks).
const LAND = "#5C8A74", LAND2 = "#4C7A64", LAND3 = "#63917A";
// LAND3 v2.1: #7FA98E hanya 2.29:1 vs chip (di bawah target 3:1) —
// digelapkan ke #63917A (3.11:1). Konsekuensi jujur: LAND3 kini hampir sama
// dengan LAND (1.10:1) — peta efektif 2 nada (mid + gelap LAND2), bukan 3.
// Yang diutamakan: daratan vs laut (yang dikeluhkan Gibran), bukan variasi
// antar-benua; facet tetap memberi tekstur.
const FONT = "Noto Sans, sans-serif";
const DISPLAY = "Playfair Display"; // Didone Black (Treatment A)
const ACCENT = PIN; // SATU warna aksen sistem
const HEADLINE_FILL = "#FFFFFF"; // headline TERANG di atas langit gelap v15 (Gibran 15:15)

// ---------- audit bbox (gate overlap) ----------
const boxes = []; // {x,y,w,h,kind,label} — y = atas bbox
function box(x, y, w, h, kind, label) { boxes.push({ x, y: y + OY, w, h, kind, label }); return ""; }
// lebar teks estimasi (konservatif): bold 0.56em, regular 0.50em, display 0.60em
function textW(str, size, weight = 400, family = FONT) {
  const f = family === DISPLAY ? 0.60 : (weight >= 700 ? 0.56 : 0.50);
  return Math.round(String(str).length * size * f);
}
function textBox(x, y, str, { size = 16, weight = 400, family = FONT, anchor = "start" } = {}) {
  const w = textW(str, size, weight, family);
  const bx = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  // Tinggi bbox: cap ~0.72em di atas baseline; descender hanya bila ada
  // huruf descender (g,j,p,q,y) — tanpa itu, bawah = baseline + 0.02em.
  // (Estimasi 0.75/0.25 menandai "GTA VI" <> "OUT NOW" sebagai overlap
  // padahal keduanya all-caps tanpa descender: gap nyata ~7px.)
  const hasDesc = /[gjpqy]/.test(str);
  box(bx, y - size * 0.72, w, size * (hasDesc ? 0.97 : 0.74), "text", str);
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function text(x, y, str, { size = 16, weight = 400, fill = INK, anchor = "start", spacing = 0, style = "", family = FONT, stretch = "" } = {}) {
  textBox(x, y, str, { size, weight, family, anchor });
  const ls = spacing ? ` letter-spacing="${spacing}"` : "";
  const fs = style ? ` font-style="${style}"` : "";
  const fst = stretch ? ` font-stretch="${stretch}"` : "";
  return `<text x="${x}" y="${y + OY}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${ls}${fs}${fst}>${esc(str)}</text>`;
}

function wrap(str, maxWidth, size, weight = 400, cwFactor = null) {
  const cw = size * (cwFactor ?? (weight >= 700 ? 0.56 : 0.50));
  const maxChars = Math.max(8, Math.floor(maxWidth / cw));
  const words = String(str).split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? cur + " " + w : w;
    if (next.length <= maxChars) cur = next;
    else { if (cur) lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
}

function poly(points, fill, opacity = 1, stroke = null) {
  const pts = points.map((p) => [p[0], p[1] + OY].join(",")).join(" ");
  const st = stroke ? ` stroke="${stroke}" stroke-width="1.5"` : "";
  return `<polygon points="${pts}" fill="${fill}"${opacity !== 1 ? ` opacity="${opacity}"` : ""}${st}/>`;
}
function rect(x, y, w, h, fill, opacity = 1) {
  return `<rect x="${x}" y="${y + OY}" width="${w}" height="${h}" fill="${fill}"${opacity !== 1 ? ` opacity="${opacity}"` : ""}/>`;
}
function line(x1, y1, x2, y2, stroke, width = 2, opacity = 1) {
  return `<line x1="${x1}" y1="${y1 + OY}" x2="${x2}" y2="${y2 + OY}" stroke="${stroke}" stroke-width="${width}"${opacity !== 1 ? ` opacity="${opacity}"` : ""}/>`;
}

function octPts(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 8; i++) {
    const a = (PI / 4) * i + PI / 8; // pi 5 digit untuk geometri lingkaran
    pts.push([Math.round(cx + r * Math.cos(a)), Math.round(cy + r * Math.sin(a))]);
  }
  return pts;
}

// ---------- masthead v8 ----------
// Template pemenang: tanggal RAKSASA Didone sebagai masthead + dek merah
// miring; "THE WORLD IN ONE DAY" hanya kicker kecil di atas. (v5–v7
// membaliknya: judul raksasa, tanggal kecil — itu yang diperbaiki.)
// GEN y: kicker baseline 58, tanggal baseline 112 (54px Didone, lebar
// estimasi 27 kar x 54 x 0.60 = 875px, terpusat), dek baseline 134,
// rule y=144.
function masthead(d) {
  let s = "";
  s += text(512, 58, "THE WORLD IN ONE DAY", { size: 12, weight: 800, fill: INK, anchor: "middle", spacing: 4 });
  s += text(512, 112, d.date, { size: 54, weight: 900, fill: INK, anchor: "middle", family: DISPLAY });
  s += text(512, 140, d.dek, { size: 16, weight: 400, fill: ACCENT, anchor: "middle", style: "italic" });
  s += rect(48, 150, 928, 2, INK);
  return s;
}

// ---------- world map ----------
const CONTINENTS = [
  { name: "North America", fill: LAND, pts: [[-168,66],[-150,70],[-135,69],[-125,71],[-110,73],[-95,80],[-85,76],[-75,73],[-65,62],[-55,60],[-60,47],[-65,44],[-70,42],[-75,35],[-80,26],[-81,25],[-87,21],[-90,21],[-95,18],[-97,16],[-94,17],[-90,14],[-85,11],[-80,8],[-79,9],[-83,9],[-88,13],[-92,15],[-97,16],[-102,18],[-105,20],[-110,23],[-114,28],[-118,33],[-122,37],[-124,42],[-124,48],[-130,54],[-140,60],[-150,61],[-158,58],[-162,55],[-166,60],[-168,66]] },
  { name: "Greenland", fill: LAND3, pts: [[-58,64],[-52,60],[-43,60],[-32,68],[-25,70],[-30,76],[-45,78],[-58,76],[-62,70]] },
  { name: "South America", fill: LAND2, pts: [[-80,10],[-77,7],[-75,5],[-70,0],[-65,-3],[-60,-5],[-55,-5],[-50,-2],[-44,-3],[-38,-5],[-35,-8],[-37,-13],[-40,-20],[-42,-23],[-48,-27],[-52,-32],[-57,-38],[-62,-41],[-65,-45],[-68,-50],[-70,-54],[-72,-50],[-73,-44],[-73,-37],[-72,-30],[-71,-22],[-71,-18],[-75,-15],[-78,-10],[-80,-5],[-81,0],[-80,5]] },
  { name: "Africa", fill: LAND, pts: [[-17,15],[-16,20],[-12,27],[-9,31],[-5,35],[0,36],[5,37],[10,37],[15,32],[20,32],[25,31],[30,31],[32,30],[35,28],[38,22],[40,18],[43,12],[48,11],[51,10],[48,5],[44,0],[40,-5],[38,-10],[35,-15],[33,-20],[31,-25],[28,-30],[25,-34],[20,-35],[17,-32],[15,-27],[13,-22],[12,-17],[11,-12],[9,-5],[9,0],[9,4],[6,4],[0,6],[-7,5],[-12,7],[-15,10],[-17,15]] },
  { name: "Asia", fill: LAND2, pts: [[30,70],[35,68],[40,67],[45,65],[50,68],[55,69],[60,70],[65,72],[70,73],[75,74],[80,75],[90,76],[100,77],[110,77],[120,76],[130,73],[140,72],[150,70],[160,69],[170,67],[178,65],[175,62],[170,60],[162,58],[158,52],[155,50],[150,45],[145,42],[140,39],[135,35],[130,33],[127,35],[126,38],[124,40],[122,38],[120,34],[118,30],[115,25],[110,20],[108,15],[105,10],[103,8],[100,7],[98,10],[95,15],[92,20],[90,22],[88,22],[86,20],[83,18],[80,13],[77,8],[75,12],[73,18],[70,22],[67,25],[64,25],[61,25],[58,26],[55,27],[52,28],[50,29],[48,30],[46,29],[44,29],[42,28],[40,30],[38,32],[36,36],[34,36],[32,38],[30,40],[30,45],[30,50],[30,55],[30,60],[30,65],[30,70]] },
  { name: "Europe", fill: LAND3, pts: [[-10,36],[-9,38],[-9,43],[-5,44],[-2,46],[-1,46],[-4,48],[-2,49],[0,50],[2,51],[4,53],[7,54],[8,57],[10,59],[12,58],[15,56],[18,56],[21,55],[21,58],[24,59],[26,60],[28,62],[30,65],[30,70],[35,68],[40,67],[44,64],[45,60],[42,58],[40,55],[38,52],[35,50],[33,48],[30,46],[28,44],[28,42],[26,41],[23,40],[22,38],[21,40],[19,42],[16,44],[14,45],[12,44],[10,44],[8,44],[6,43],[3,43],[0,40],[-2,37],[-6,36],[-9,37]] },
  { name: "Australia", fill: LAND, pts: [[113,-22],[113,-26],[114,-30],[115,-33],[118,-35],[122,-34],[126,-32],[129,-32],[132,-32],[135,-35],[137,-35],[140,-38],[143,-39],[146,-39],[149,-37],[150,-34],[152,-30],[153,-27],[151,-24],[148,-20],[146,-19],[143,-15],[142,-11],[140,-17],[138,-17],[136,-15],[135,-12],[132,-11],[129,-14],[126,-14],[123,-17],[120,-19],[117,-20],[114,-21]] },
  { name: "SE Asia islands", fill: LAND2, pts: [[95,5],[97,8],[99,10],[101,8],[103,5],[104,2],[102,0],[100,-2],[98,-4]] },
  { name: "Java", fill: LAND2, pts: [[105,-5],[108,-6],[111,-7],[114,-8],[116,-9],[114,-10],[110,-8],[107,-6]] },
  { name: "New Guinea", fill: LAND, pts: [[131,-1],[134,-2],[137,-3],[140,-3],[142,-4],[145,-5],[147,-6],[150,-8],[150,-10],[147,-9],[144,-8],[141,-8],[138,-7],[135,-5],[132,-3]] },
  { name: "Japan", fill: LAND3, pts: [[130,31],[131,33],[133,34],[135,34],[137,35],[139,35],[140,37],[141,39],[141,41],[142,43],[144,44],[145,44],[144,42],[142,40],[140,38],[138,36],[136,35],[134,34],[132,33]] },
  { name: "UK", fill: LAND3, pts: [[-5,50],[-3,53],[-5,55],[-4,57],[-2,58],[0,57],[1,54],[0,52],[-3,51]] },
  { name: "New Zealand", fill: LAND2, pts: [[167,-45],[168,-44],[170,-43],[172,-41],[174,-39],[176,-38],[178,-38],[176,-40],[174,-42],[172,-43],[170,-45],[168,-46]] },
  { name: "Madagascar", fill: LAND2, pts: [[44,-16],[47,-15],[50,-16],[50,-20],[48,-24],[45,-25],[43,-22],[43,-18]] },
];
const FACETS = [
  { fill: "#FFFFFF", op: 0.16, pts: [[-140,68],[-110,72],[-125,58]] },
  { fill: "#2E2118", op: 0.10, pts: [[-100,45],[-80,30],[-95,20]] },
  { fill: "#FFFFFF", op: 0.14, pts: [[-60,-5],[-45,-15],[-55,-30]] },
  { fill: "#FFFFFF", op: 0.15, pts: [[10,30],[25,20],[15,5]] },
  { fill: "#2E2118", op: 0.08, pts: [[25,-10],[35,-25],[20,-30]] },
  { fill: "#FFFFFF", op: 0.16, pts: [[70,70],[95,72],[85,55]] },
  { fill: "#2E2118", op: 0.08, pts: [[120,50],[140,45],[130,30]] },
  { fill: "#FFFFFF", op: 0.14, pts: [[125,-20],[140,-30],[135,-38]] },
];

function project(lon, lat, box) {
  const x = box.x + ((lon + 180) / 360) * box.w;
  const y = box.y + ((80 - lat) / 140) * box.h + OY;
  return [Math.round(x), Math.round(y)];
}

// Benua per cerita (dulu untuk strip peta; v4: hanya untuk log/verifier).
// "GAMING" + "SPACE" = null (di luar benua). Urutan kunci penting: "CANADA" sebelum "CHINA",
// "JAPAN" sebelum "GERMAN" (headline #22 menyebut keduanya),
// "INDIA" sebelum "SPORT" (#25 India + sport).
const REGION_TO_CONT = {
  "GAMING": null, "SPACE": null,
  "CANADA": "NA", "U.S.": "NA", "ALASKA": "NA",
  "CHINA": "AS", "INDIA": "AS", "JAPAN": "AS", "KOREA": "AS", "GAZA": "AS", "SAUDI ARABIA": "AS",
  "THE HAGUE": "EU", "BLACK SEA": "EU", "EU": "EU", "FRANCE": "EU", "ITALY": "EU", "SPORT": "EU",
  "MEXICO": "NA", "LATIN AMERICA": "SA",
  "AUSTRALIA": "OC", "HORN OF AFRICA": "AF", "LIBYA": "AF",
};
function continentOf(it) {
  const hay = ((it.kicker || "") + " " + it.headline).toUpperCase();
  for (const [key, cont] of Object.entries(REGION_TO_CONT)) {
    if (hay.includes(key)) return cont;
  }
  return undefined;
}

function worldMap(d, x, y, w, h, { pinR = 8, pinGap = 18, pinNudge = 12 } = {}) {
  let s = "";
  s += rect(x, y, w, h, SEA);
  for (const lat of [60, 30, 0, -30]) {
    const yy = y + ((80 - lat) / 140) * h;
    s += line(x, yy, x + w, yy, "#FFFFFF", 1, 0.35);
  }
  const box = { x, y, w, h };
  // v2: outline tegas di daratan (koreksi kontras peta) — stroke INK 0.35.
  for (const c of CONTINENTS) s += `<polygon points="${c.pts.map(([lo, la]) => project(lo, la, box)).map((p) => p.join(",")).join(" ")}" fill="${c.fill}" stroke="${INK}" stroke-width="1" stroke-opacity="0.35"/>`;
  // v4: facet DIBANGUN LANGSUNG (bukan poly()) — poly() menambah OY ke
  // titik yang sudah ber-OY (project), jadi facet v1-v3 tergeser 16px ke
  // bawah dari posisi yang dimaksud. Dekoratif, tapi ini cacat nyata.
  for (const f of FACETS) s += `<polygon points="${f.pts.map(([lo, la]) => project(lo, la, box)).map((p) => p.join(",")).join(" ")}" fill="${f.fill}"${f.op !== 1 ? ` opacity="${f.op}"` : ""}/>`;
  const placed = [];
  for (const p of d.pins) {
    let [px, py] = project(p.lon, p.lat, box); // py = rendered (OY sudah)
    let nudged = false;
    for (const q of placed) {
      if (Math.abs(px - q[0]) < pinGap && Math.abs(py - q[1]) < pinGap) { py += pinNudge; nudged = true; }
    }
    if (nudged) {
      const [ox, oy] = project(p.lon, p.lat, box);
      s += `<circle cx="${ox}" cy="${oy}" r="3" fill="${PIN}"/>`;
      // v4: leader line LANGSUNG (bukan helper line()) — helper menambah
      // OY ke koordinat yang sudah ber-OY (bug laten v1-v3, tak pernah terpicu
      // karena belum ada pin yang berdesakan).
      s += `<line x1="${ox}" y1="${oy}" x2="${px}" y2="${py - (pinR - 1)}" stroke="${PIN}" stroke-width="1.2" opacity="0.9"/>`;
    }
    // v4: clamp dalam koordinat RENDERED (v3 mencampur gen/rendered: batas
    // gen y+pinR+1 menahan pin atas 16px lebih rendah dari posisi benarnya
    // — pin #14 Alaska di v3 duduk di 419, bukan 410.3; batas bawah longgar
    // 16px). Margin pinR+2.
    const top = y + OY + pinR + 2, bot = y + h + OY - pinR - 2;
    px = Math.max(x + pinR + 2, Math.min(x + w - pinR - 2, px));
    py = Math.max(top, Math.min(bot, py));
    placed.push([px, py]);
    // v2 (koreksi Gibran #1): pin = TITIK MERAH polos, TANPA ANGKA.
    // Dot r=pinR dengan outline INK — kebaca di daratan gelap maupun laut.
    s += `<circle cx="${px}" cy="${py}" r="${pinR}" fill="${PIN}" stroke="${INK}" stroke-width="1.5"/>`;
  }
  // v4: STRIP DIHAPUS SEPENUHNYA (Gibran 17:29) — tidak ada lagi teks/angka
  // di dalam chip peta. Peta kini memakai tinggi penuh 114px (dulu 92px +
  // strip 22px); pin #5 (OC) yang setengah tertutup strip di v3 kini utuh.
  // contCounts tetap dihitung di build() untuk log/verifier, tapi tidak
  // lagi digambar. "SIX CONTINENTS" di masthead tetap (dari countLine).
  return s;
}

// ---------- peta BAGI-2 (TRIAL, MAP_MODE=split) ----------
// Dua panel berdampingan: barat (lon -180..0) kiri, timur (lon 0..180)
// kanan, masing-masing 144x114, gap 5px. Skala: x 144/180 = 0.800,
// y 114/140 = 0.814 — hampir seragam (selisih 1.8%).
// Clip poligon di lon 0: tiap edge yang menyeberang dipotong dengan
// interpolasi linear; titik potong masuk ke kedua cincin.
function splitLon0(pts) {
  const L = [], R = [];
  const side = (p) => (p[0] <= 0 ? 0 : 1);
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    const sa = side(a), sb = side(b);
    const ring = sa === 0 ? L : R;
    if (!ring.length || ring[ring.length - 1] !== a) ring.push(a);
    if (sa !== sb) {
      const t = (0 - a[0]) / (b[0] - a[0]);
      const c = [0, a[1] + t * (b[1] - a[1])];
      L.push(c); R.push(c);
    }
  }
  return { L, R };
}

// Proyeksi panel: koordinat GEN (tanpa OY); OY ditambah di tempat emisi.
function projectPanel(lon, lat, panel) {
  const x = panel.x + ((lon - panel.lon0) / (panel.lon1 - panel.lon0)) * panel.w;
  const y = panel.y + ((80 - lat) / 140) * panel.h;
  return [Math.round(x), Math.round(y)];
}

function worldMapSplit(d, x, y, w, h, { pinR = 7 } = {}) {
  const gap = 5;
  const pw = Math.floor((w - gap) / 2); // 144
  const panels = [
    { x, y, w: pw, h, lon0: -180, lon1: 0 },
    { x: x + pw + gap, y, w: pw, h, lon0: 0, lon1: 180 },
  ];
  let s = "";
  for (const p of panels) {
    s += rect(p.x, p.y, p.w, p.h, SEA);
    for (const lat of [60, 30, 0, -30]) {
      const yy = p.y + ((80 - lat) / 140) * p.h;
      s += line(p.x, yy, p.x + p.w, yy, "#FFFFFF", 1, 0.35);
    }
  }
  const polyGen = (ring, panel, fill, op, stroke) => {
    const pts = ring.map(([lo, la]) => { const [gx, gy] = projectPanel(lo, la, panel); return `${gx},${gy + OY}`; }).join(" ");
    const st = stroke ? ` stroke="${INK}" stroke-width="1" stroke-opacity="0.35"` : "";
    return `<polygon points="${pts}" fill="${fill}"${op !== 1 ? ` opacity="${op}"` : ""}${st}/>`;
  };
  for (const c of CONTINENTS) {
    const { L, R } = splitLon0(c.pts);
    if (L.length >= 3) s += polyGen(L, panels[0], c.fill, 1, true);
    if (R.length >= 3) s += polyGen(R, panels[1], c.fill, 1, true);
  }
  for (const f of FACETS) {
    const { L, R } = splitLon0(f.pts);
    if (L.length >= 3) s += polyGen(L, panels[0], f.fill, f.op, false);
    if (R.length >= 3) s += polyGen(R, panels[1], f.fill, f.op, false);
  }
  // Pin per panel (logika tabrakan sama seperti peta tunggal, per panel).
  for (const p of panels) {
    const placed = [];
    for (const pin of d.pins) {
      if (pin.lon < p.lon0 || pin.lon > p.lon1) continue;
      let [px, py] = projectPanel(pin.lon, pin.lat, p);
      let nudged = false;
      for (const q of placed) {
        if (Math.abs(px - q[0]) < 18 && Math.abs(py - q[1]) < 18) { py += 12; nudged = true; }
      }
      if (nudged) {
        const [ox, oy] = projectPanel(pin.lon, pin.lat, p);
        s += `<circle cx="${ox}" cy="${oy + OY}" r="3" fill="${PIN}"/>`;
        s += line(ox, oy, px, py - (pinR - 1), PIN, 1.2, 0.9);
      }
      px = Math.max(p.x + pinR + 2, Math.min(p.x + p.w - pinR - 2, px));
      py = Math.max(p.y + pinR + 2, Math.min(p.y + p.h - pinR - 2, py));
      placed.push([px, py]);
      s += `<circle cx="${px}" cy="${py + OY}" r="${pinR}" fill="${PIN}" stroke="${INK}" stroke-width="1.5"/>`;
    }
  }
  for (const p of panels) s += `<rect x="${p.x}" y="${p.y + OY}" width="${p.w}" height="${p.h}" fill="none" stroke="${MUTED}" stroke-width="1"/>`;
  return s;
}

// ---------- modul ilustrasi v6 (flat vector, satu bahasa) ----------
// Aturan (studi broadsheet 18 Nov, §6): bidang datar, TANPA outline
// hitam; palet muted sama; wajah selalu kosong (tidak ada figur berwajah
// di modul ini); satu simbol dominan per ilustrasi (maks 3 elemen);
// merah #BC2F0E hanya untuk bahaya/perhatian; latar = setengah cerita
// (warna latar semantik, bukan warna region). Semua fungsi mengambil
// (x, y) = sudut kiri atas kotak, koordinat GEN (helper menambah OY).
// Sudut kiri atas 12x12 tiap kotak dibiarkan kosong (tempat badge nomor).
const ILLU_BG = "#EDE2CC"; // krem (latar default)
const ILLU_TEAL = "#5C8A74", ILLU_BLUE = "#A8C4D4", ILLU_SAGE = "#A8B89A",
  ILLU_NAVY = "#2E3A4A", ILLU_TAN = "#D9B98A", ILLU_GOLD_BG = "#F2E3C0",
  ILLU_CREAM = "#F2E8D5", ILLU_WHITE = "#FFFFFF", ILLU_OLIVE = "#7C9A4E",
  ILLU_DBLUE = "#7A9BB5", ILLU_BROWN = "#8A5A33", ILLU_GOLD = "#E3B25D",
  ILLU_ORANGE = "#D96C2E";
function circle(cx, cy, r, fill, stroke = null, sw = 1) {
  const st = stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : "";
  return `<circle cx="${cx}" cy="${cy + OY}" r="${r}" fill="${fill}"${st}/>`;
}
function starPts(cx, cy, rO, rI, n = 5, rot = -Math.PI / 2) {
  const pts = [];
  for (let i = 0; i < 2 * n; i++) {
    const r = i % 2 === 0 ? rO : rI, a = rot + (i * Math.PI) / n;
    pts.push([Math.round((cx + r * Math.cos(a)) * 10) / 10, Math.round((cy + r * Math.sin(a)) * 10) / 10]);
  }
  return pts;
}
function spiralPts(cx, cy, turns, rMax) {
  // Spiral Archimedes: r tumbuh linear dengan sudut; polyline stroke.
  const pts = [];
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * 2 * Math.PI;
    const r = 1 + (t / (turns * 2 * Math.PI)) * (rMax - 1);
    pts.push([Math.round((cx + r * Math.cos(t)) * 10) / 10, Math.round((cy + r * Math.sin(t)) * 10) / 10]);
  }
  return pts;
}
function polyline(pts, stroke, width = 2, opacity = 1) {
  const p = pts.map((q) => [q[0], q[1] + OY].join(",")).join(" ");
  return `<polyline points="${p}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${opacity !== 1 ? ` opacity="${opacity}"` : ""}/>`;
}
// #3 ICJ — gedung pengadilan (atap segitiga + 3 kolom + dasar).
function illu3(x, y) {
  let s = rect(x, y, 34, 34, ILLU_BLUE);
  s += poly([[x + 14, y + 13], [x + 32, y + 13], [x + 23, y + 6]], ILLU_CREAM);
  for (const cx of [15, 21, 27]) s += rect(x + cx, y + 14, 3, 12, ILLU_CREAM);
  s += rect(x + 12, y + 27, 22, 3, ILLU_TAN);
  return s;
}
// #4 Siklon — spiral putih di atas laut teal (simbol terkuat studi).
function illu4(x, y) {
  let s = rect(x, y, 34, 34, ILLU_TEAL);
  s += polyline(spiralPts(x + 20, y + 20, 1.75, 11), ILLU_WHITE, 2.5);
  s += circle(x + 20, y + 20, 1.6, ILLU_WHITE);
  return s;
}
// #5 Sanksi — dokumen + segel larangan merah (lingkaran + garis miring).
function illu5(x, y) {
  let s = rect(x, y, 34, 34, ILLU_BG);
  s += rect(x + 12, y + 7, 16, 20, ILLU_WHITE);
  s += rect(x + 15, y + 11, 10, 2, MUTED, 0.5);
  s += rect(x + 15, y + 15, 10, 2, MUTED, 0.5);
  s += circle(x + 20, y + 20, 6.5, "none", ACCENT, 2.5);
  s += line(x + 15.5, y + 15.5, x + 24.5, y + 24.5, ACCENT, 2.5);
  return s;
}
// #6 Perbatasan — tiang penanda merah-putih + pegunungan (beda dari #7).
function illu6(x, y) {
  let s = rect(x, y, 34, 34, ILLU_SAGE);
  s += poly([[x + 8, y + 30], [x + 17, y + 18], [x + 26, y + 30]], ILLU_DBLUE);
  s += poly([[x + 20, y + 30], [x + 28, y + 20], [x + 34, y + 30]], "#6B8FA8");
  s += rect(x + 24, y + 8, 3, 22, ILLU_WHITE);
  s += rect(x + 24, y + 12, 3, 3, ACCENT);
  s += rect(x + 24, y + 20, 3, 3, ACCENT);
  return s;
}
// #7 Kapal gas — kapal di laut malam + ledakan emas/oranye (beda dari #6).
function illu7(x, y) {
  let s = rect(x, y, 34, 34, ILLU_NAVY);
  s += rect(x, y + 24, 34, 10, ILLU_TEAL);
  s += poly([[x + 7, y + 25], [x + 29, y + 25], [x + 26, y + 19], [x + 10, y + 19]], INK);
  s += rect(x + 15, y + 14, 8, 5, ILLU_CREAM);
  s += poly(starPts(x + 20, y + 9, 6, 2.5, 8), ILLU_GOLD);
  s += poly(starPts(x + 20, y + 9, 3.5, 1.5, 8), ILLU_ORANGE);
  return s;
}
// #8 Pekerjaan — koper + panah merah turun (beda dari grafik #9).
function illu8(x, y) {
  let s = rect(x, y, 34, 34, ILLU_TAN);
  s += rect(x + 9, y + 15, 18, 12, ILLU_BROWN);
  s += polyline([[x + 15, y + 15], [x + 15, y + 11], [x + 21, y + 11], [x + 21, y + 15]], ILLU_BROWN, 2);
  s += rect(x + 16, y + 19, 4, 3, ILLU_GOLD);
  s += line(x + 29, y + 8, x + 29, y + 20, ACCENT, 2.5);
  s += poly([[x + 26, y + 18], [x + 32, y + 18], [x + 29, y + 23]], ACCENT);
  return s;
}
// #9 IPO — garis naik + koin emas (beda dari koper #8).
function illu9(x, y) {
  let s = rect(x, y, 34, 34, ILLU_GOLD_BG);
  s += polyline([[x + 8, y + 26], [x + 16, y + 20], [x + 24, y + 14], [x + 30, y + 8]], ILLU_TEAL, 2.5);
  s += poly([[x + 27, y + 8], [x + 31, y + 8], [x + 30, y + 12]], ILLU_TEAL);
  s += circle(x + 23, y + 24, 7, ILLU_GOLD, ILLU_BROWN, 1);
  s += circle(x + 23, y + 24, 4, "none", ILLU_BROWN, 1);
  return s;
}
// #10 Perdamaian — dahan zaitun + retakan (simbol abstrak, studi §2 #4).
function illu10(x, y) {
  let s = rect(x, y, 34, 34, ILLU_BG);
  s += polyline([[x + 9, y + 29], [x + 27, y + 11]], ILLU_OLIVE, 2);
  for (const [lx, ly, a] of [[13, 24, -40], [17, 20, 40], [20, 17, -40], [24, 13, 40]]) {
    const dx = Math.round(4 * Math.cos((a * Math.PI) / 180)), dy = Math.round(4 * Math.sin((a * Math.PI) / 180));
    s += poly([[x + lx, y + ly], [x + lx + dx, y + ly + dy - 2], [x + lx + 2 * dx, y + ly], [x + lx + dx, y + ly + dy + 2]], ILLU_OLIVE);
  }
  s += polyline([[x + 28, y + 6], [x + 24, y + 12], [x + 28, y + 18], [x + 22, y + 24]], INK, 2);
  return s;
}
// #11 Kanada–China — dua bendera (atribut negara, bukan wajah).
function illu11(x, y) {
  let s = rect(x, y, 34, 34, ILLU_BG);
  // Kanada: putih + bar merah + daun (belah ketupat merah).
  s += rect(x + 12, y + 13, 10, 7, ILLU_WHITE);
  s += rect(x + 12, y + 13, 2, 7, ACCENT);
  s += rect(x + 20, y + 13, 2, 7, ACCENT);
  s += poly([[x + 17, y + 14], [x + 19, y + 16.5], [x + 17, y + 19], [x + 15, y + 16.5]], ACCENT);
  s += line(x + 17, y + 20, x + 17, y + 30, INK, 1.5);
  // China: merah + bintang emas.
  s += rect(x + 23, y + 13, 10, 7, ACCENT);
  s += poly(starPts(x + 26, y + 16.5, 2.5, 1, 5), ILLU_GOLD);
  s += line(x + 28, y + 20, x + 28, y + 30, INK, 1.5);
  return s;
}
// #12 AI — chip + segitiga peringatan merah (beda dari grafik #8/#9).
function illu12(x, y) {
  let s = rect(x, y, 34, 34, ILLU_BLUE);
  s += rect(x + 10, y + 10, 14, 14, ILLU_NAVY);
  for (const px of [14, 17, 20]) { s += line(x + px, y + 8, x + px, y + 10, ILLU_NAVY, 1.5); s += line(x + px, y + 24, x + px, y + 26, ILLU_NAVY, 1.5); }
  for (const py of [14, 17, 20]) { s += line(x + 8, y + py, x + 10, y + py, ILLU_NAVY, 1.5); s += line(x + 24, y + py, x + 26, y + py, ILLU_NAVY, 1.5); }
  s += rect(x + 15, y + 15, 4, 4, ILLU_GOLD);
  s += poly([[x + 26, y + 18], [x + 32, y + 29], [x + 20, y + 29]], ACCENT);
  s += rect(x + 25.5, y + 22, 1.5, 4, ILLU_WHITE);
  s += circle(x + 26.2, y + 27.5, 0.9, ILLU_WHITE);
  return s;
}
// #13 Pengadilan — palu + rantai putus (beda dari gedung #3).
function illu13(x, y) {
  let s = rect(x, y, 34, 34, ILLU_BG);
  s += rect(x + 12, y + 28, 18, 3, ILLU_TAN);
  s += rect(x + 14, y + 10, 14, 6, ILLU_BROWN);
  s += rect(x + 19, y + 16, 3, 12, ILLU_BROWN);
  s += circle(x + 27, y + 25, 3, "none", MUTED, 1.5);
  s += circle(x + 31, y + 20, 3, "none", MUTED, 1.5);
  return s;
}
// #2 Hero (60x60) — tiga bendera KTT (China, AS, Rusia) + tanah.
function illuHero2(x, y) {
  let s = rect(x, y, 60, 60, "#DCE7E0");
  // China: merah + bintang emas.
  s += line(x + 15, y + 10, x + 15, y + 50, INK, 2);
  s += rect(x + 15, y + 10, 14, 9, ACCENT);
  s += poly(starPts(x + 19, y + 14.5, 2.5, 1, 5), ILLU_GOLD);
  // AS: garis merah-putih + kanton biru.
  s += line(x + 30, y + 10, x + 30, y + 50, INK, 2);
  s += rect(x + 30, y + 10, 14, 9, ILLU_WHITE);
  s += rect(x + 30, y + 10, 14, 1.5, ACCENT);
  s += rect(x + 30, y + 13, 14, 1.5, ACCENT);
  s += rect(x + 30, y + 16, 14, 1.5, ACCENT);
  s += rect(x + 30, y + 10, 6, 4.5, ILLU_NAVY);
  // Rusia: triwarna putih-biru-merah.
  s += line(x + 45, y + 10, x + 45, y + 50, INK, 2);
  s += rect(x + 45, y + 10, 14, 3, ILLU_WHITE);
  s += rect(x + 45, y + 13, 14, 3, "#2E5A8A");
  s += rect(x + 45, y + 16, 14, 3, ACCENT);
  s += line(x + 8, y + 50, x + 52, y + 50, INK, 1.5);
  return s;
}
// ---------- hero lebar v8 (302x80) ----------
// Hero #1 Summit: tiga bendera berdampingan + karpet merah (lebar penuh
// kartu hero; bendera = atribut pengenal, bukan wajah — sesuai studi).
// Kotak (x, y) = sudut kiri atas, koordinat GEN.
function illuHeroSummitWide(x, y, w = 302, h = 80) {
  let s = rect(x, y, w, h, "#DCE7E0");
  const flags = [
    { fx: x + 14, pole: x + 14 }, // China
    { fx: x + 111, pole: x + 111 }, // AS
    { fx: x + 208, pole: x + 208 }, // Rusia
  ];
  for (const f of flags) s += line(f.pole, y + 8, f.pole, y + 70, INK, 2);
  // China: merah + bintang emas.
  s += rect(flags[0].fx, y + 8, 84, 44, ACCENT);
  s += poly(starPts(flags[0].fx + 18, y + 30, 11, 4.5, 5), ILLU_GOLD);
  // AS: garis merah-putih + kanton biru.
  s += rect(flags[1].fx, y + 8, 84, 44, ILLU_WHITE);
  for (let i = 0; i < 4; i++) s += rect(flags[1].fx, y + 8 + i * 11, 84, 5.5, ACCENT);
  s += rect(flags[1].fx, y + 8, 34, 22, ILLU_NAVY);
  // Rusia: triwarna putih-biru-merah.
  s += rect(flags[2].fx, y + 8, 84, 14.7, ILLU_WHITE);
  s += rect(flags[2].fx, y + 22.7, 84, 14.7, "#2E5A8A");
  s += rect(flags[2].fx, y + 37.3, 84, 14.7, ACCENT);
  // Karpet merah + garis tanah.
  s += line(x, y + 70, x + w, y + 70, INK, 1.5);
  s += rect(x, y + 70, w, 10, ACCENT);
  return s;
}
// Hero #3 Anthropic: grafik naik lebar (5 bar + garis + koin emas).
function illuHeroChartWide(x, y, w = 302, h = 80) {
  let s = rect(x, y, w, h, ILLU_GOLD_BG);
  const bars = [18, 28, 36, 46, 58];
  bars.forEach((bh, i) => {
    const bx = x + 24 + i * 44;
    s += rect(bx, y + 66 - bh, 30, bh, ILLU_TEAL);
  });
  s += polyline([[x + 24, y + 60], [x + 68, y + 48], [x + 112, y + 40], [x + 156, y + 30], [x + 200, y + 20], [x + 244, y + 12]], ILLU_TEAL, 3);
  s += poly([[x + 238, y + 12], [x + 248, y + 12], [x + 244, y + 19]], ILLU_TEAL);
  s += circle(x + 272, y + 52, 15, ILLU_GOLD, ILLU_BROWN, 1.5);
  s += circle(x + 272, y + 52, 9, "none", ILLU_BROWN, 1);
  s += line(x, y + 66, x + w, y + 66, INK, 1.5);
  return s;
}
const ILLU = { 3: illu3, 4: illu4, 5: illu5, 6: illu6, 7: illu7, 8: illu8, 9: illu9, 10: illu10, 11: illu11, 12: illu12, 13: illu13 };
// v7: skala ilustrasi — grid 34 -> 42px, hero 60 -> 80px. Dipakai via
// <g transform> di fragLine/hero (bukan rewrite 11 fungsi): fungsi
// dipanggil di (0,-OY) agar OY helper batal, lalu grup di-translate ke
// koordinat RENDERED (GEN + OY) dan di-scale.
const ILLU_S = 42 / 34;
const HERO_S = 80 / 60;

// ---------- fragmen unit bernomor (anatomi playlist) ----------
function fragLine(it, colX, y) {
  let s = "";
  // v7: ilustrasi 42x42 di kiri sel (GEN y-11..y+31) + frame INK 2px +
  // badge nomor 18x18 di sudut kiri atasnya (GEN y-13..y+5).
  // Teks geser ke colX+56 (ilustrasi 42 + gap 14); lebar teks 296-56 =
  // 240px (headline terpanjang 30 kar, muat 1 baris — lihat news-v7).
  s += `<g transform="translate(${colX},${y - 11 + OY}) scale(${ILLU_S.toFixed(4)})">${ILLU[it.n](0, -OY)}</g>`;
  s += `<rect x="${colX}" y="${y - 11 + OY}" width="42" height="42" fill="none" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="${colX - 2}" y="${y - 13 + OY}" width="18" height="18" fill="${ACCENT}"/>`;
  s += text(colX + 7, y, String(it.n), { size: 12, weight: 800, fill: "#FFFFFF", anchor: "middle" });
  const maxW = 296 - 56;
  const lines = wrap(it.headline, maxW, 15, 400);
  let head = lines[0] || "";
  if (lines.length > 1) head = (wrap(it.headline, maxW - 14, 15, 400)[0] || "") + "…";
  s += text(colX + 56, y, head, { size: 15, weight: 400, fill: INK });
  // v5: chip 15px (y+7..y+22) — v4 y+4 memberi celah headline->chip hanya
  // 0.25px (praktis menempel, dilingkari Gibran 17:41). Celah baru:
  // descender headline (y+3.75) -> chip atas (y+7) = 3.25px (target >=3px).
  // Teks kicker baseline y+18: cap y+9.36 (2.36px di bawah tepi chip),
  // descender y+20.88 (1.12px di atas bawah chip) — di dalam chip.
  const data = it.kicker || "WORLD";
  const dw = Math.round(data.length * 8 + 14);
  s += `<rect x="${colX + 56}" y="${y + 7 + OY}" width="${dw}" height="15" rx="7" fill="none" stroke="${MUTED}" stroke-width="1"/>`;
  s += text(colX + 56 + 7, y + 18, data, { size: 12, weight: 700, fill: MUTED, spacing: 1 });
  return { s, truncated: lines.length > 1, head };
}

// ---------- fragmen grid v8 (ilustrasi 48x48, teks colX+62) ----------
// Seperti fragLine v7, tapi ilustrasi 48px (skala 48/34), pitch baris 58,
// headline 14px (lebar teks 234px), chip kicker 11px. Ilustrasi diambil
// dari it.illu (kunci fungsi v7 — penomoran cerita v8 bergeser, fungsi
// ilustrasi mengikuti CERITA, bukan nomor baru).
const ILLU_S8 = 48 / 34;
function fragLineV8(it, colX, y) {
  let s = "";
  // Ilustrasi 48x48 di kiri sel (GEN y-14..y+34) + frame INK 2px +
  // badge nomor 18x18 di sudut kiri atasnya (GEN y-16..y+2).
  s += `<g transform="translate(${colX},${y - 14 + OY}) scale(${ILLU_S8.toFixed(4)})">${ILLU[it.illu](0, -OY)}</g>`;
  s += `<rect x="${colX}" y="${y - 14 + OY}" width="48" height="48" fill="none" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="${colX - 2}" y="${y - 16 + OY}" width="18" height="18" fill="${ACCENT}"/>`;
  s += text(colX + 7, y - 4, String(it.n), { size: 12, weight: 800, fill: "#FFFFFF", anchor: "middle" });
  const maxW = 296 - 62;
  const lines = wrap(it.headline, maxW, 14, 400);
  let head = lines[0] || "";
  if (lines.length > 1) head = (wrap(it.headline, maxW - 14, 14, 400)[0] || "") + "…";
  s += text(colX + 62, y, head, { size: 14, weight: 400, fill: INK });
  const data = it.kicker || "WORLD";
  const dw = Math.round(data.length * 7.5 + 14);
  s += `<rect x="${colX + 62}" y="${y + 7 + OY}" width="${dw}" height="15" rx="7" fill="none" stroke="${MUTED}" stroke-width="1"/>`;
  s += text(colX + 62 + 7, y + 18, data, { size: 11, weight: 700, fill: MUTED, spacing: 1 });
  return { s, truncated: lines.length > 1, head };
}

// ---------- peta band v8 (pin bernomor + dot abu brief) ----------
// Peta tunggal (bukan split): kotak (x, y, w, h) dengan rasio ~2.7.
// Pin = lingkaran merah r=8 + angka putih 10px di tengahnya; dot brief =
// abu r=3. Nudge tabrakan sama seperti worldMap v7 (pinGap 18, nudge 12).
// Pin yang di-nudge: dot kecil r=3 di posisi benar + leader line + pin
// bernomor di posisi nudge.
function worldMapBand(d, x, y, w, h) {
  let s = "";
  s += rect(x, y, w, h, SEA);
  for (const lat of [60, 30, 0, -30]) {
    const yy = y + ((80 - lat) / 140) * h;
    s += line(x, yy, x + w, yy, "#FFFFFF", 1, 0.35);
  }
  const box = { x, y, w, h };
  for (const c of CONTINENTS) s += `<polygon points="${c.pts.map(([lo, la]) => project(lo, la, box)).map((p) => p.join(",")).join(" ")}" fill="${c.fill}" stroke="${INK}" stroke-width="1" stroke-opacity="0.35"/>`;
  for (const f of FACETS) s += `<polygon points="${f.pts.map(([lo, la]) => project(lo, la, box)).map((p) => p.join(",")).join(" ")}" fill="${f.fill}"${f.op !== 1 ? ` opacity="${f.op}"` : ""}/>`;
  const pinR = 8, pinGap = 18, pinNudge = 12;
  const placed = [];
  const placePin = (lon, lat, isBrief) => {
    let [px, py] = project(lon, lat, box);
    let nudged = false;
    // Nudge BERULANG (maks 4x): sekali tidak cukup untuk Miami/NYC
    // (jarak 12,8px) dan Hague/London (jarak 3,6px) — setelah 1 nudge
    // vertikal, pin masih dalam pinGap dari tetangganya.
    for (let k = 0; k < 4; k++) {
      let conflict = false;
      for (const q of placed) {
        if (Math.abs(px - q[0]) < pinGap && Math.abs(py - q[1]) < pinGap) { conflict = true; break; }
      }
      if (!conflict) break;
      py += pinNudge; nudged = true;
    }
    if (nudged) {
      const [ox, oy] = project(lon, lat, box);
      s += `<circle cx="${ox}" cy="${oy}" r="3" fill="${isBrief ? "#8A7F6A" : PIN}"/>`;
      s += `<line x1="${ox}" y1="${oy}" x2="${px}" y2="${py - (pinR - 1)}" stroke="${isBrief ? "#8A7F6A" : PIN}" stroke-width="1.2" opacity="0.9"/>`;
    }
    const top = y + OY + pinR + 2, bot = y + h + OY - pinR - 2;
    px = Math.max(x + pinR + 2, Math.min(x + w - pinR - 2, px));
    py = Math.max(top, Math.min(bot, py));
    placed.push([px, py]);
    return [px, py, nudged];
  };
  for (const p of d.pins) {
    const [px, py] = placePin(p.lon, p.lat, false);
    s += `<circle cx="${px}" cy="${py}" r="${pinR}" fill="${PIN}" stroke="${INK}" stroke-width="1.5"/>`;
    s += text(px, py + 3.5, String(p.n), { size: 10, weight: 800, fill: "#FFFFFF", anchor: "middle" });
  }
  for (const g of d.greyDots) {
    const [px, py] = placePin(g.lon, g.lat, true);
    s += `<circle cx="${px}" cy="${py}" r="3" fill="#8A7F6A" stroke="${INK}" stroke-width="0.75"/>`;
  }
  s += `<rect x="${x}" y="${y + OY}" width="${w}" height="${h}" fill="none" stroke="${MUTED}" stroke-width="1"/>`;
  return s;
}

function build(d, artDataUri) {
  const heroes = d.heroes; // 3 hero: #1 summit, #2 GTA, #3 ANT
  const grid = d.grid.slice(0, 10); // n=4..13
  const brief = d.brief.slice(0, 18); // n=14..31
  const items = grid.map((g) => ({ n: g.n, headline: g.headline, kicker: g.kicker, illu: g.illu }));
  // Hitung cerita per benua — SEHARI PENUH (31 cerita), untuk log/verifier.
  // Penomoran v8 bergeser (lead/hero/grid), tapi cerita + kicker SAMA
  // seperti v3 — hitungan benua identik dengan v7.
  const allStories = [
    ...heroes.map((h) => ({ n: h.n, headline: h.headline, kicker: h.kicker })),
    ...grid.map((g) => ({ n: g.n, headline: g.headline, kicker: g.kicker })),
    ...brief.map((b) => ({ n: b.n, headline: b.headline, kicker: b.kicker })),
  ];
  const contCounts = { NA: 0, SA: 0, EU: 0, AF: 0, AS: 0, OC: 0 };
  let offCont = 0;
  for (const it of allStories) {
    const c = continentOf(it);
    if (c === undefined) console.error(`final: cerita #${it.n} tidak terpetakan ke benua: ${it.headline}`);
    else if (c === null) offCont++;
    else contCounts[c]++;
  }
  const storyCount = heroes.length + grid.length + brief.length; // 31
  d.countLine = `${storyCount} STORIES · SIX CONTINENTS`;
  const truncated = [];
  let s = "";
  s += `<rect width="${W}" height="${H}" fill="${PAPER}"/>`;
  s += masthead(d);

  // ---- Stat strip se-hari: 6 kotak (148px, gap 8) y 154..202 ----
  // Angka BESAR merah 26px + label 11px di bawahnya (bukan chip tipis v5).
  // Semua angka dari cerita di halaman ini (bukan stat satu cerita).
  const stats = d.stats;
  stats.forEach(({ num, label: lab }, i) => {
    const bx = 48 + i * 156;
    s += `<rect x="${bx}" y="${160 + OY}" width="148" height="48" rx="2" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
    s += text(bx + 12, 184, num, { size: 26, weight: 800, fill: ACCENT });
    s += text(bx + 12, 200, lab, { size: 11, weight: 700, fill: INK, spacing: 1 });
  });

  // ---- Region bar: hitungan per region (12px), nama MUTED + angka ACCENT ----
  {
    let rx = 48;
    d.regionBar.forEach((r, i) => {
      s += text(rx, 224, r.name, { size: 12, weight: 700, fill: MUTED });
      rx += textW(r.name, 12, 700) + 6;
      s += text(rx, 224, "·", { size: 12, weight: 700, fill: MUTED });
      rx += textW("·", 12, 700) + 6;
      s += text(rx, 224, String(r.count), { size: 12, weight: 800, fill: ACCENT });
      rx += textW(String(r.count), 12, 800) + 6;
      if (i < d.regionBar.length - 1) {
        s += text(rx, 224, "·", { size: 12, weight: 700, fill: MUTED });
        rx += textW("·", 12, 700) + 14;
      }
    });
  }

  // ---- 3 hero berdampingan (kolom 302px, gap 11) ----
  // Ilustrasi 302x80 di atas kartu + kicker + headline (2 baris) + dek.
  const heroCols = [48, 361, 674];
  const heroW = 302, heroIllusY = 230, heroIllusH = 80;
  heroes.forEach((h, i) => {
    const hx = heroCols[i];
    if (h.illu === "flags") {
      s += illuHeroSummitWide(hx, heroIllusY, heroW, heroIllusH);
    } else if (h.illu === "chart") {
      s += illuHeroChartWide(hx, heroIllusY, heroW, heroIllusH);
    } else if (h.illu === "vaporwave") {
      // Art v15 (TERKUNCI) di-crop ke 302x80: skala 302/928, tinggi 125px,
      // y=188 agar matahari (art y 235 -> skala 76) di tengah jendela.
      s += `<clipPath id="heroArtClip"><rect x="${hx}" y="${heroIllusY + OY}" width="${heroW}" height="${heroIllusH}"/></clipPath>`;
      s += `<g clip-path="url(#heroArtClip)"><image x="${hx}" y="${heroIllusY - 36 + OY}" width="${heroW}" height="125" href="${artDataUri}"/></g>`;
    }
    s += `<rect x="${hx}" y="${heroIllusY + OY}" width="${heroW}" height="${heroIllusH}" fill="none" stroke="${INK}" stroke-width="2"/>`;
    s += `<rect x="${hx - 2}" y="${heroIllusY - 2 + OY}" width="18" height="18" fill="${ACCENT}"/>`;
    s += text(hx + 7, heroIllusY + 10, String(h.n), { size: 12, weight: 800, fill: "#FFFFFF", anchor: "middle" });
    s += text(hx, 326, h.kicker, { size: 11, weight: 800, fill: ACCENT, spacing: 1 });
    const hl = wrap(h.headline, heroW, 22, 700);
    if (hl.length > 2) truncated.push("hero" + h.n);
    hl.slice(0, 2).forEach((ln, j) => { s += text(hx, 350 + j * 24, ln, { size: 22, weight: 700, fill: INK }); });
    const dl = wrap(h.dek, heroW, 13, 400).slice(0, 1);
    if ((dl[0] || "") !== h.dek) truncated.push("hero" + h.n + "dek");
    s += text(hx, 394, dl[0] || "", { size: 13, weight: 400, fill: MUTED });
  });

  // ---- Label seksi grid (412..436) ----
  s += rect(48, 418, 200, 24, ACCENT);
  s += text(148, 435, d.gridTitle, { size: 15, weight: 800, fill: "#FFFFFF", anchor: "middle", spacing: 1 });

  // ---- Unit bernomor: 10 item (#4..13), 3 kol x 4 baris, pitch 58 ----
  // Ilustrasi 48px; celah ilustrasi->ilustrasi 8px, ilustrasi->badge 6px.
  const cols = [48, 364, 680];
  const rows = [460, 518, 576, 634];
  s += line(354, 447, 354, 656, MUTED, 1, 0.5);
  s += line(669, 447, 669, 656, MUTED, 1, 0.5);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      const idx = r * 3 + c;
      if (idx < items.length) {
        const f = fragLineV8(items[idx], cols[c], rows[r]);
        s += f.s;
        if (f.truncated) truncated.push(items[idx].n);
      } else if (r === 3 && c === 1) {
        s += text(cols[c] + 62, rows[r], "13 MAIN STORIES · 18 MORE BELOW ↓", { size: 12, weight: 700, fill: MUTED });
      } else if (r === 3 && c === 2) {
        // Ringkasan halaman (wayfinding, bukan filler).
        s += text(cols[c] + 62, rows[r], "13 main stories · 18 briefs", { size: 12, weight: 700, fill: INK });
        s += text(cols[c] + 62, rows[r] + 16, "31 stories · 6 continents", { size: 12, weight: 400, fill: MUTED });
        s += text(cols[c] + 62, rows[r] + 32, "All verified 19 Nov 2026", { size: 12, weight: 400, fill: MUTED });
      }
    }
  }

  // ---- Peta band tersendiri ----
  s += text(48, 676, d.mapTitle, { size: 15, weight: 800, fill: ACCENT, spacing: 1 });
  s += worldMapBand(d, 48, 684, 300, 110);
  // Legenda pin (2 kolom, kanan peta; 12px, pitch 22).
  const pinLabels = [
    "Shenzhen summit", "GTA VI Miami", "Anthropic IPO New York",
    "ICJ The Hague", "Cyclone Akvan India",
    "Australia sanctions Canberra", "Ethiopia–Eritrea Horn",
    "Gas Husky Black Sea", "Peltola Alaska",
  ];
  const pinNums = [1, 2, 3, 4, 5, 6, 7, 8, 14];
  pinLabels.forEach((lab, i) => {
    const lx = i < 5 ? 364 : 672;
    const ly = 706 + (i % 5) * 22;
    s += `<rect x="${lx}" y="${ly - 11 + OY}" width="14" height="14" fill="${ACCENT}"/>`;
    s += text(lx + 7, ly, String(pinNums[i]), { size: 10, weight: 800, fill: "#FFFFFF", anchor: "middle" });
    s += text(lx + 20, ly, lab, { size: 12, weight: 400, fill: INK });
  });
  s += text(672, 794, d.mapCaption, { size: 11, weight: 400, fill: MUTED });

  // ---- Timeline "THE DAY IN UTC" ----
  s += text(48, 810, "THE DAY IN UTC", { size: 12, weight: 800, fill: ACCENT, spacing: 1 });
  s += line(170, 804, 976, 804, MUTED, 1, 0.5);
  d.timeline.forEach((t, i) => {
    const tx = 48 + i * 185;
    s += text(tx, 826, t.time, { size: 11, weight: 800, fill: ACCENT });
    s += text(tx + textW(t.time, 11, 800) + 16, 826, t.label, { size: 11, weight: 400, fill: INK });
  });

  // ---- Brief tail: 18 cerita (#14..31), 3 kol x 6 baris, pitch 13 ----
  s += text(48, 850, d.briefTitle, { size: 15, weight: 800, fill: ACCENT, spacing: 1 });
  const briefRows = [870, 883, 896, 909, 922, 935];
  if (BANDS) {
    for (const r of [0, 2, 4]) s += rect(48, briefRows[r] - 13, 928, 14, BAND);
  }
  s += line(354, 860, 354, 943, MUTED, 1, 0.5);
  s += line(669, 860, 669, 943, MUTED, 1, 0.5);
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 3; c++) {
      const it = brief[r * 3 + c];
      const x0 = cols[c];
      const numW = Math.round(String(it.n).length * 7.2 + 12);
      s += text(x0, briefRows[r], String(it.n), { size: 12, weight: 800, fill: ACCENT });
      const bl = wrap(it.headline, 296 - numW, 11, 400);
      if (bl.length > 1) truncated.push(it.n);
      s += text(x0 + numW, briefRows[r], bl[0] || "", { size: 11, weight: 400, fill: INK });
    }
  }

  // ---- DATE CHECK box merah menonjol (941..977) ----
  s += `<rect x="48" y="${947 + OY}" width="928" height="36" fill="${ACCENT}"/>`;
  s += text(60, 961, d.dateCheck, { size: 12, weight: 800, fill: "#FFFFFF" });
  s += text(60, 977, d.dateCheck2, { size: 12, weight: 400, fill: "#FFFFFF" });

  // ---- Footer: sumber + HOW SURE ----
  s += rect(48, 991, 928, 2, ACCENT);
  s += text(48, 1004, d.footer, { size: 12, weight: 400, fill: MUTED });
  s += text(48, 1018, d.footer2, { size: 12, weight: 400, fill: MUTED });
  const bottom = 1018; // GEN; rendered 1002, margin bawah 22px (atas 32px)
  return { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${s}</svg>`, bottom, storyCount, truncated, contCounts, offCont };
}

// ---------- gate overlap v8 (teks-vs-teks) ----------
// v8 TIDAK PUNYA frame art raksasa / chip peta lagi (v5–v7): semua teks
// duduk di kertas krem, dan art vaporwave kini ilustrasi hero yang
// di-crop (teks hero di BAWAH ilustrasi, bukan di atasnya). Frame
// ilustrasi hero/grid + badge nomor + box DATE CHECK/stat adalah elemen
// desain yang SENGAJA bersentuhan dengan teks (seperti frame ilustrasi
// v7 yang tidak pernah diaudit) — jadi gate ini hanya teks-vs-teks.
// Yang dijaga: tabrakan antar teks (region bar, slot timeline, legenda
// peta, angka pin, headline hero/grid, tail).
function overlapAudit() {
  const frame = [];
  const artBusy = [];
  const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  const texts = boxes.filter((b) => b.kind === "text");
  const issues = [];
  for (let i = 0; i < texts.length; i++) {
    for (let j = i + 1; j < texts.length; j++) {
      if (hit(texts[i], texts[j])) issues.push(`teks-vs-teks: "${texts[i].label}" <> "${texts[j].label}"`);
    }
  }
  for (const t of texts) for (const f of frame) if (hit(t, f)) issues.push(`teks-vs-frame: "${t.label}" <> ${f.label}`);
  for (const t of texts) for (const a of artBusy) if (hit(t, a)) issues.push(`teks-vs-art: "${t.label}" <> ${a.label}`);
  return issues;
}

const [,, jsonPath, outPng, outSvg] = process.argv;
if (!jsonPath || !outPng) { console.error("usage: node generate-final-v8.mjs <news-v8.json> <out.png> [out.svg]"); process.exit(1); }
const d = JSON.parse(readFileSync(jsonPath, "utf8"));
const artB64 = readFileSync("art-final-test.png").toString("base64");
const artDataUri = `data:image/png;base64,${artB64}`;
console.error(`stories in file: ${d.heroes.length + d.grid.length + d.brief.length} (heroes ${d.heroes.length} + grid ${d.grid.length} + brief ${d.brief.length}), pins ${d.pins.length} + grey dots ${d.greyDots.length}`);
console.error(`constants: phi=${PHI}, pi=${PI}, sqrt(phi)=${SQRT_PHI}, golden angle=${GOLDEN_ANGLE.toFixed(5)} deg`);
const built = build(d, artDataUri);
console.error(`final: bottom y=${built.bottom} GEN (rendered ${built.bottom + OY}, margin bawah ${1024 - (built.bottom + OY)}px), total stories shown=${built.storyCount}, truncated: ${built.truncated.length ? built.truncated.join(",") : "none"}, continents NA ${built.contCounts.NA} / SA ${built.contCounts.SA} / EU ${built.contCounts.EU} / AF ${built.contCounts.AF} / AS ${built.contCounts.AS} / OC ${built.contCounts.OC} (off-continent ${built.offCont})`);
if (built.bottom + OY > 1004) console.error(`WARNING: layout overflow, rendered bottom y=${built.bottom + OY} > 1004 (margin < 20px)`);
else console.error(`layout ok, rendered bottom y=${built.bottom + OY} (margin bawah ${1024 - (built.bottom + OY)}px, atas 32px)`);
const issues = overlapAudit();
if (issues.length) { console.error(`OVERLAP GATE: ${issues.length} issue(s):`); for (const i of issues) console.error(`  - ${i}`); }
else console.error("OVERLAP GATE: 0 issues (teks-vs-teks, teks-vs-frame, teks-vs-art)");
const svg = built.svg;
if (outSvg) writeFileSync(outSvg, svg);
const r = new Resvg(svg, { fitTo: { mode: "width", value: 1024 }, font: { loadSystemFonts: true } });
const png = r.render().asPng();
writeFileSync(outPng, png);
// Post-step (compression practice 19 Nov, NOTES.md §1.0): resvg emits RGBA
// with 100% opaque alpha — a dead-weight channel. Strip it to RGB + zlib
// level 9 via PIL. Lossless, pixel-identical (PSNR inf); saves ~10% here
// (v8 259.766 -> 233.511 B; v5 403 KB -> 313 KB). Deterministic: same SVG
// input always yields the same bytes, so verify-final-v8 determinism holds.
execSync(`python3 -c 'from PIL import Image; im = Image.open(${JSON.stringify(outPng)}).convert("RGB"); im.save(${JSON.stringify(outPng)}, optimize=True, compress_level=9)'`, { stdio: "pipe" });
const pngOpt = readFileSync(outPng);
console.log(`wrote ${outPng}: ${pngOpt.length} bytes (${(pngOpt.length / 1024).toFixed(0)} KiB, limit 1024 KiB) [RGB+zlib9, was ${png.length}]`);
