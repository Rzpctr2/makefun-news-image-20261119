// generate-final-v5.mjs — v5, news-image-20261119 (19 Nov 2026).
// Tiga koreksi Gibran 17:41 WIB (dari screenshot crop v4):
//   1. DEK HIGHLIGHTER DIHAPUS: swipe ACCENT 0.25 di belakang dek
//      ("Rolls out worldwide…") dibuang total — Gibran: "itu apa kenapa
//      di-highlight". Swipe itu memang disengaja, tapi terbaca seperti
//      highlight nyasar. Dek kini duduk di kertas krem polos.
//   2. STAT STRIP: celah angka->label diukur dari piksel v4: 2/6/6/7/5/3px
//      (terburuk "17M GTA COPIES" = 2px — yang dilingkari Gibran).
//      Offset label +6 -> +14; celah baru terukur (lihat laporan).
//      Akar: estimasi lebar angka 8.4px/kar underestimasikan bold 15px.
//   3. CHIP KICKER: celah headline->chip v4 hanya 0.25px (praktis
//      menempel). Chip y+4..y+19 -> y+7..y+22, teks kicker baseline y+15
//      -> y+18; celah headline->chip = 3.25px (target >=3px). Dana:
//      baris grid naik 2px (706->704; celah label->grid 8.2->6.2px),
//      celah antar baris 9.2 -> 6.2px (pitch tetap 39 — grid TIDAK lebih
//      padat; celah didistribusikan ulang: 3.25 di atas chip, 6.2 di bawah).
//      Celah chip terakhir -> judul tail 5.2 -> 4.2px (harga 1px, jujur).
//      Margin 32/32 TETAP, bottom 992 TETAP.
// Art v15 TERKUNCI (embed piksel-identik, tidak digambar ulang).
// Data: news-v3.json (TIDAK berubah — 31 cerita sama).
// Bottom target = 992 (margin 32px).
// Usage: node generate-final-v4.mjs <news-v3.json> <out.png> [out.svg]
//   MAP_MODE=split node generate-final-v4.mjs news-v3.json /tmp/split.png
const MAP_MODE = process.env.MAP_MODE || "single"; // 'single' | 'split'
import { readFileSync, writeFileSync } from "node:fs";
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

// ---------- masthead ----------
function masthead(d) {
  let s = "";
  s += rect(48, 48, 928, 64, ACCENT);
  s += `<rect x="49" y="${49 + OY}" width="926" height="62" fill="none" stroke="${INK}" stroke-width="2"/>`;
  s += text(512, 93, "THE WORLD IN ONE DAY", { size: 42, weight: 800, fill: "#FFFFFF", anchor: "middle", spacing: 6 });
  s += text(48, 126, d.countLine, { size: 12, weight: 700, fill: MUTED, spacing: 1 });
  s += text(976, 126, d.date, { size: 15, weight: 800, fill: INK, anchor: "end", spacing: 1 });
  s += rect(48, 140, 928, 2, INK);
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

// ---------- fragmen unit bernomor (anatomi playlist) ----------
function fragLine(it, colX, y) {
  let s = "";
  s += `<rect x="${colX}" y="${y - 15 + OY}" width="20" height="20" fill="${ACCENT}"/>`;
  s += text(colX + 10, y, String(it.n), { size: 12, weight: 800, fill: "#FFFFFF", anchor: "middle" });
  const maxW = 296 - 28;
  const lines = wrap(it.headline, maxW, 15, 400);
  let head = lines[0] || "";
  if (lines.length > 1) head = (wrap(it.headline, maxW - 14, 15, 400)[0] || "") + "…";
  s += text(colX + 28, y, head, { size: 15, weight: 400, fill: INK });
  // v5: chip 15px (y+7..y+22) — v4 y+4 memberi celah headline->chip hanya
  // 0.25px (praktis menempel, dilingkari Gibran 17:41). Celah baru:
  // descender headline (y+3.75) -> chip atas (y+7) = 3.25px (target >=3px).
  // Teks kicker baseline y+18: cap y+9.36 (2.36px di bawah tepi chip),
  // descender y+20.88 (1.12px di atas bawah chip) — di dalam chip.
  const data = it.kicker || "WORLD";
  const dw = Math.round(data.length * 8 + 14);
  s += `<rect x="${colX + 28}" y="${y + 7 + OY}" width="${dw}" height="15" rx="7" fill="none" stroke="${MUTED}" stroke-width="1"/>`;
  s += text(colX + 28 + 7, y + 18, data, { size: 12, weight: 700, fill: MUTED, spacing: 1 });
  return { s, truncated: lines.length > 1, head };
}

function build(d, artDataUri) {
  const hero2 = d.hero2;
  const grid = d.grid.slice(0, 12); // n=3..13
  const brief = d.brief.slice(0, 18); // n=14..31
  const items = grid.map((g) => ({ n: g.n, headline: g.headline, kicker: g.kicker }));
  // Hitung cerita per benua — SEHARI PENUH (31 cerita), untuk log/verifier.
  const allStories = [
    { n: 1, headline: "GTA VI rolls out worldwide", kicker: "GAMING · GLOBAL" },
    { n: 2, headline: hero2.headline, kicker: hero2.kicker },
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
  const storyCount = 1 + 1 + grid.length + brief.length; // 31
  d.countLine = `${storyCount} STORIES · SIX CONTINENTS`;
  const truncated = [];
  let s = "";
  s += `<rect width="${W}" height="${H}" fill="${PAPER}"/>`;
  // TIDAK ADA grain halaman: art v15 sudah membawa stipple/grain sendiri;
  // grain feTurbulence di atas seluruh halaman (rev-6/7) terbukti menaruh
  // bintik PUTIH di langit (p95 lum 1.0 di wilayah langit tanpa teks) —
  // merusak kontras headline putih yang diukur dari PNG hasil render.
  s += masthead(d);

  // ---- Art v15 (TERKUNCI) 928x384, y 150..534 + frame 6px ACCENT ----
  // Art di-embed sebagai PNG (data URI) — piksel-identik dengan v15 yang
  // disetujui Gibran; generator TIDAK menggambar ulang art.
  const artY = 150, artH = 384, artW = 928;
  s += `<clipPath id="artClip"><rect x="48" y="${artY + OY}" width="${artW}" height="${artH}"/></clipPath>`;
  s += `<g clip-path="url(#artClip)"><image x="48" y="${artY + OY}" width="${artW}" height="${artH}" href="${artDataUri}"/></g>`;
  s += `<rect x="51" y="${153 + OY}" width="922" height="378" fill="none" stroke="${ACCENT}" stroke-width="6"/>`;
  // Kicker tab DI DALAM frame (bukan menabrak tepinya — mode gagal rev-7):
  // x=60 (6px dari tepi dalam frame x=54), y=159..181 (3px di bawah stroke atas).
  const kickW = Math.round(28 + d.lead.kicker.length * 9.4);
  s += `<rect x="60" y="${159 + OY}" width="${kickW}" height="22" fill="${ACCENT}"/>`;
  s += `<rect x="61" y="${160 + OY}" width="${kickW - 2}" height="20" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
  s += text(60 + kickW / 2, 174, d.lead.kicker, { size: 12, weight: 800, fill: "#FFFFFF", anchor: "middle", spacing: 2 });
  // Headline 2 BARIS, TERANG (putih) di atas langit gelap v15:
  // "GTA VI" 110px baseline 285 + "OUT NOW" 68px baseline 338, flush left
  // x=60 (di dalam frame). Rasio 110/68 = 1.6176 ~ phi (1.61803).
  // Baseline OUT NOW 338 (bukan 340): ujung bawah huruf di y=338, 2px di
  // atas ujung pelepah teratas mahkota P2 (y=340, terukur) — gate bersih.
  s += text(60, 285, "GTA VI", { size: 110, weight: 900, fill: HEADLINE_FILL, family: DISPLAY, spacing: -1.2 });
  s += text(60, 338, "OUT NOW", { size: 68, weight: 900, fill: HEADLINE_FILL, family: DISPLAY, spacing: -0.5 });
  // Peta chip DI DALAM frame (bukan menabrak tepinya): (671,411,293,114),
  // outline MUTED 1px; tepi kanan 964 (6px dari tepi dalam frame x=970),
  // tepi bawah 525 (3px dari tepi dalam frame y=528).
  // RASIO PETA SERAGAM (aturan rev-3 #3): 293/114 = 2.570 ~ 360/140 = 2.571
  // (px/deg x = 0.814, y = 0.814) — chip 293x108 lama (2.713) menekan
  // peta 5,5% secara vertikal; 114px memperbaikinya tanpa biaya (chip
  // tetap di dalam zona art; tepi atas 411 = 9px di atas horizon, menutup
  // langit, bukan laut).
  // v4: strip DIHAPUS — peta memakai tinggi penuh 114px (dulu 92px + strip
  // 22px di bawah). MAP_MODE=split (trial) memakai dua panel 144x114;
  // default = peta tunggal (keputusan: lihat laporan — split ditolak).
  if (MAP_MODE === "split") s += worldMapSplit(d, 671, 411, 293, 114, { pinR: 7 });
  else {
    s += worldMap(d, 671, 411, 293, 114, { pinR: 7, pinGap: 18, pinNudge: 12 });
    s += `<rect x="671" y="${411 + OY}" width="293" height="114" fill="none" stroke="${MUTED}" stroke-width="1"/>`;
  }

  // ---- Dek 1 baris 15px, TANPA highlighter swipe (v5: swipe ACCENT 0.25
  // dihapus atas pertanyaan Gibran 17:41 — terbaca seperti highlight
  // nyasar; dek duduk di kertas krem polos) ----
  const dekText = d.lead.dek;
  const dekLines = wrap(dekText, 928, 15, 400).slice(0, 1);
  if (dekLines.length > 1 || (dekLines[0] || "") !== dekText) truncated.push("dek");
  s += text(48, 551, dekLines[0] || "", { size: 15, weight: 400, fill: DEK });

  // ---- Stat strip se-hari: 6 kotak tetap (148px, gap 8) y 561..587 (v4: naik 3px) ----
  const stats = d.stats; // dari news.json: 17M / $1.65BN / $81.3BN / 3 / 730K / 16BN
  stats.forEach(({ num, label: lab }, i) => {
    const bx = 48 + i * 156;
    s += `<rect x="${bx}" y="${561 + OY}" width="148" height="26" rx="2" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
    s += text(bx + 12, 580, num, { size: 15, weight: 800, fill: ACCENT });
    // v5: offset label +6 -> +14 — celah v4 terukur dari piksel: 2/6/6/7/5/3px
    // (estimasi lebar angka 8.4px/kar underestimasikan bold 15px; "17M"
    // hanya 2px). Chip tersempit "$1.65BN PRE-SOLD" tetap muat (lihat laporan).
    s += text(bx + 12 + Math.round(num.length * 8.4) + 14, 580, lab, { size: 12, weight: 700, fill: INK });
  });

  // ---- Hero #2 (summit, co-lead): kicker 601, headline 26px 631, sub-dek 653
  // (v4: naik 5/5/3px untuk mendanai grid). JUJUR: titik phi y=633 kini
  // jatuh di CELAH antara headline (cap 596..615) dan sub-dek (637) — TIDAK
  // lagi di dalam headline seperti v1/v2. Tidak diklaim sebaliknya.
  s += text(48, 601, hero2.kicker, { size: 12, weight: 800, fill: ACCENT, spacing: 1 });
  const heroLines = wrap(hero2.headline, 928, 26, 700);
  if (heroLines.length > 1) truncated.push("hero2");
  s += text(48, 631, heroLines[0] || "", { size: 26, weight: 700, fill: INK });
  const heroDekLines = wrap(hero2.dek, 928, 15, 400).slice(0, 1);
  if ((heroDekLines[0] || "") !== hero2.dek) truncated.push("hero2dek");
  s += text(48, 653, heroDekLines[0] || "", { size: 15, weight: 400, fill: MUTED });

  // ---- Label seksi BLOK solid aksen (663..687, 24px — v4: naik 3px) ----
  s += rect(48, 663, 200, 24, ACCENT);
  s += text(148, 680, d.gridTitle, { size: 15, weight: 800, fill: "#FFFFFF", anchor: "middle", spacing: 1 });

  // ---- Unit bernomor: 11 item (#3..13) + slot wayfinding, 3 kol x 4 baris ----
  // v5 (koreksi Gibran 17:41 — chip kicker menempel headline): chip
  // y+7..y+22 (celah headline->chip 3.25px); baris grid naik 2px
  // (706->704) agar celah chip terakhir -> judul tail tetap layak (4.2px).
  // Celah antar baris 9.2 -> 6.2px (pitch TETAP 39 — grid tidak lebih padat;
  // celah didistribusikan ulang). Pola Z (baris atas dulu).
  const cols = [48, 364, 680];
  const rows = [704, 743, 782, 821];
  s += line(354, 691, 354, 845, MUTED, 1, 0.5);
  s += line(669, 691, 669, 845, MUTED, 1, 0.5);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      const idx = r * 3 + c;
      if (idx < items.length) {
        const f = fragLine(items[idx], cols[c], rows[r]);
        s += f.s;
        if (f.truncated) truncated.push(items[idx].n);
      } else {
        // Slot ke-12: penanda jalan (bukan kosong) — "13 cerita utama,
        // 18 lagi di bawah" (Layer-Cake: nomor + arah membawa pembaca).
        s += text(cols[c] + 28, rows[r], "13 MAIN STORIES · 18 MORE BELOW ↓", { size: 12, weight: 700, fill: MUTED });
      }
    }
  }

  const briefRows0 = [878, 896, 914, 932, 950, 968]; // pitch 18 (v3), +6px (v4: dana grid)
  // ---- Brief tail: 18 cerita (#14..31), 3 kol x 6 baris, pitch 18 (TETAP —
  // brief TIDAK dibuat lebih padat untuk mendanai grid) ----
  // v4: judul 852->858, baris 872->878 (+6px: grid baris terakhir naik
  // 823+19=842, celah ke judul 5.2px — sedikit lebih rapat dari v3 7.2px,
  // harga yang dibayar grid; footer TETAP di 971 (celah rule tail->footer
  // 5px, dulu 11px). Judul 15px/800 ACCENT + band #EDE2CC baris 0/2/4
  // (v3). Rule vertikal diteruskan (v2).
  s += text(48, 858, d.briefTitle, { size: 15, weight: 800, fill: ACCENT, spacing: 1 });
  if (BANDS) {
    for (const r of [0, 2, 4]) s += rect(48, briefRows0[r] - 13, 928, 18, BAND);
  }
  s += line(354, 868, 354, 971, MUTED, 1, 0.5);
  s += line(669, 868, 669, 971, MUTED, 1, 0.5);
  const briefRows = [878, 896, 914, 932, 950, 968];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 3; c++) {
      const it = brief[r * 3 + c];
      const x0 = cols[c];
      const numW = Math.round(String(it.n).length * 7.2 + 12);
      s += text(x0, briefRows[r], String(it.n), { size: 12, weight: 800, fill: ACCENT });
      const bl = wrap(it.headline, 296 - numW, 12, 400);
      if (bl.length > 1) truncated.push(it.n);
      s += text(x0 + numW, briefRows[r], bl[0] || "", { size: 12, weight: 400, fill: INK });
    }
  }

  // ---- Footer: DATE CHECK + sumber (986) + HOW SURE ARE WE? (1000) ----
  // v3: OY=-11 di sini (bukan -16): tail pitch 18 menambah 5px di bawah
  // tail, jadi footer jatuh di rule 960 / footer 975 / footer2 989 /
  // bottom 992 (margin bawah 32px = margin atas 32px). Celah rule->footer
  // 15, footer->footer2 14 (sama seperti v2).
  // Footer2: lihat news-v3.json — diperbarui saat refresh berita terakhir.
  OY = -11;
  s += rect(48, 971, 928, 2, ACCENT);
  s += text(48, 986, d.footer, { size: 12, weight: 400, fill: MUTED });
  s += text(976, 986, "THE WORLD IN ONE DAY · PAGE 1", { size: 12, weight: 700, fill: MUTED, anchor: "end" });
  s += text(48, 1000, d.footer2, { size: 12, weight: 400, fill: MUTED });
  const bottom = 992; // margin bawah 32px (v2: 1003 -> 21px)
  return { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${s}</svg>`, bottom, storyCount, truncated, contCounts, offCont };
}

// ---------- gate overlap (teks-vs-teks, teks-vs-frame, teks-vs-art) ----------
// Frame art (stroke 6px): tepi luar 48..976 x 134..518 (v3: OY=-16).
// Frame chip (outline 1px): 671..964 x 395..509 (v3: OY=-16).
// Art busy (diukur dari art-final-test.png, koordinat halaman, art di y=134):
// mahkota P2 (88,324,110,55) | mahkota P3 (288,354,85,60) |
// mahkota P4 (688,339,140,65) | mahkota P1 (848,218,128,116) |
// menara lifeguard (436,332,112,150) | cakra matahari (589,235,156,156).
function overlapAudit() {
  const frame = [
    { x: 48, y: 134, w: 928, h: 6, label: "frame-art-top" },
    { x: 48, y: 512, w: 928, h: 6, label: "frame-art-bottom" },
    { x: 48, y: 134, w: 6, h: 384, label: "frame-art-left" },
    { x: 970, y: 134, w: 6, h: 384, label: "frame-art-right" },
    { x: 670, y: 394, w: 295, h: 2, label: "frame-chip-top" },
    { x: 670, y: 508, w: 295, h: 2, label: "frame-chip-bottom" },
    { x: 670, y: 394, w: 2, h: 116, label: "frame-chip-left" },
    { x: 963, y: 394, w: 2, h: 116, label: "frame-chip-right" },
  ];
  const artBusy = [
    { x: 88, y: 324, w: 110, h: 50, label: "art: mahkota P2" }, // ujung pelepah teratas y=324 (v2: 340, OY=-16)
    { x: 288, y: 354, w: 85, h: 60, label: "art: mahkota P3" },
    { x: 688, y: 339, w: 140, h: 65, label: "art: mahkota P4" },
    { x: 848, y: 218, w: 128, h: 116, label: "art: mahkota P1" },
    { x: 436, y: 332, w: 112, h: 150, label: "art: menara lifeguard" },
    { x: 589, y: 235, w: 156, h: 156, label: "art: cakra matahari" },
  ];
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
if (!jsonPath || !outPng) { console.error("usage: node generate-final-v4.mjs <news-v3.json> <out.png> [out.svg]"); process.exit(1); }
const d = JSON.parse(readFileSync(jsonPath, "utf8"));
const artB64 = readFileSync("art-final-test.png").toString("base64");
const artDataUri = `data:image/png;base64,${artB64}`;
console.error(`stories in file: ${1 + 1 + d.grid.length + d.brief.length} (lead 1 + hero2 1 + grid ${d.grid.length} + brief ${d.brief.length}), pins ${d.pins.length}`);
console.error(`constants: phi=${PHI}, pi=${PI}, sqrt(phi)=${SQRT_PHI}, golden angle=${GOLDEN_ANGLE.toFixed(5)} deg`);
const built = build(d, artDataUri);
console.error(`final: bottom y=${built.bottom}, total stories shown=${built.storyCount}, truncated: ${built.truncated.length ? built.truncated.join(",") : "none"}, continents NA ${built.contCounts.NA} / SA ${built.contCounts.SA} / EU ${built.contCounts.EU} / AF ${built.contCounts.AF} / AS ${built.contCounts.AS} / OC ${built.contCounts.OC} (off-continent ${built.offCont})`);
if (built.bottom > 1004) console.error(`WARNING: layout overflow, bottom y=${built.bottom} > 1004 (margin < 20px)`);
else console.error(`layout ok, bottom y=${built.bottom} (margin bawah ${1024 - built.bottom}px, atas 32px — target 32/32)`);
const issues = overlapAudit();
if (issues.length) { console.error(`OVERLAP GATE: ${issues.length} issue(s):`); for (const i of issues) console.error(`  - ${i}`); }
else console.error("OVERLAP GATE: 0 issues (teks-vs-teks, teks-vs-frame, teks-vs-art)");
const svg = built.svg;
if (outSvg) writeFileSync(outSvg, svg);
const r = new Resvg(svg, { fitTo: { mode: "width", value: 1024 }, font: { loadSystemFonts: true } });
const png = r.render().asPng();
writeFileSync(outPng, png);
console.log(`wrote ${outPng}: ${png.length} bytes (${(png.length / 1024).toFixed(0)} KiB, limit 1024 KiB)`);
