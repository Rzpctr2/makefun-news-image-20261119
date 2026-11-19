// generate-final-v24.mjs — v24, news-image-20261119 (19 Nov 2026).
// v24 = PERBAIKI 3 TEKS BASI/SALAH (studi #1 19 Nov §5, terverifikasi ulang
// dari sumber primer 20 Nov ~00:10 WIB) + #13 palu re-crop + quantize
// hero03 q24 + #12 q12 + DATE CHECK dikelompokkan per tanggal.
// (1) Teks (data news-v13.json BARU — news-v12.json TIDAK disentuh,
//     sha 2d09889e…; diff v12->v13 HANYA 10 field): hero #1 dek "No deals
//     announced" SALAH -> "Issued a 'Declaration Towards Peace' —
//     nuclear-risk dialogue, UN reform, oil supplies." (Xinhua+Kremlin,
//     Reuters); grid #4 "ICJ delivers Rohingya ruling" vague ->
//     "World Court: Myanmar committed genocide" + dek "9–6; first state
//     found guilty." (Reuters/BBC/AP/NPR: 9-6, pertama kali negara
//     bersalah genosida, ~10.000 tewas, reparasi diperintahkan); stat
//     COP31 "$120BN — at stake" SALAH ARAH -> "aid goal CUT from COP31
//     draft" (Reuters 12:13 UTC: draf Kamis 144->80 paragraf hapus fosil
//     + target $120bn); footer2 "full text not yet public" basi ->
//     "9–6, reparations ordered"; DATE CHECK dikelompokkan 18 NOV /
//     16 NOV (label tanggal saja — item 20 NOV COP31 close + Akvan
//     landfall TIDAK MUAT: ablasi penuh +2.210 B, headroom habis;
//     ditunda ke v25 bila ada ruang). VERDICT (generator): "ICJ:
//     Myanmar guilty of genocide." + "9–6; reparations ordered."
// (2) #13 palu re-crop C1 (620,40,1700,462) — kepala palu 22% -> 45%
//     lebar kartu, coklat kepala 679 -> 2.085 px (file; render 1.506 px),
//     total kartu 848 -> 1.958 px (render), file -877 B, RMSE
//     6,76 -> 6,16; q TETAP q12 (gate palet EKSAM); coklat kepala kini
//     (196,122,67) — gate verifier diperbarui. Cek mata thumbnail 300px:
//     palu terbaca instan sebagai palu (v23: garis tipis samar).
// (3) Quantize DITOLAK SEMUA (ablasi render penuh, headroom habis setelah
//     perbaikan teks): hero03 q24 (+1.496 B) dan #12 q12 (+1.277 B) —
//     RMSE membaik terukur (7,44->6,42 / 12,84->11,66, mata 3x beda
//     terlihat) TAPI final 306.961 B + keduanya = ~309.7 KB > batas;
//     #07 q24 dan #08 q48 sudah kalah nilai di v23. Jalur quantize
//     TUTUP untuk v24; butuh ruang dari penghapusan elemen (audit v25).
// (4) Audit 5 kriteria dengan lensa Gibran 20 Nov 00:00 WIB (full kanvas
//     gapapa — nilai tiap adegan terbaca 1 detik + warna ga nabrak).
// v23 = PERBAIKI RINGKASAN VERIFIER (teks usang v21) + quantize lanjutan
// dengan gate RMSE dilipat ke verifier + audit strip UTC (kriteria 1/4).
// (1) Quantize (kriteria 5, resep /tmp/v23-build.py; reproduksi v22 12/12
//     piksel-identik; RMSE v22 terukur ulang sama persis dengan STATUS v22):
//     #04 q12->q16 (RMSE 8,43->7,58, +345 B file / +469 B final), #05
//     q20->q24 (10,38->9,31, +394/+336 B), #06 q20->q24 (8,67->7,77,
//     +549/+545 B), #09 q8->q16 (14,68->8,08, +778/+1.043 B — panah merah
//     kembali ke merah asli raw). Total final +2.449 B, headroom 2.446 B.
//     DITOLAK dengan bukti: #10 q32 (-1,55 tapi +1.702 B final, nilai
//     terburuk 0,091/100 B — awalnya diterima, lalu DIBATALKAN setelah
//     ablasi render penuh menunjukkan headroom tinggal 744 B; q24 juga
//     buruk 0,058/100 B), hero03 q24 (-1,02, +1.341 B), hero01 q24 (RMSE
//     -0,17 saja), #07 q24 (-0,82, +1.350 B), #08 q48 (-0,48, +1.742 B),
//     #12 q12 (-1,18, +1.279 B), #09 q12 (RMSE 0,00 — palet tak berubah).
//     #11/#13 TIDAK diuji (gate palet EKSAM melarang q naik). Cek mata 3x:
//     keempat yang diterima beda terlihat (langit/pita lebih halus,
//     panah #09 merah terang). Gate RMSE kini dilipat ke verifier v23.
// (1) Audit byte jujur (ablasi render penuh, 11 kandidat): facet peta,
//     garis lintang, stroke kontinen, band tail, separator grid, border
//     peta, divider tail DIHAPUS — terukur -8.446 B gabungan, cek mata
//     crop 2x tiap elemen lolos (tidak ada penurunan keterbacaan).
//     DITOLAK: frame hero 2->1px (+917 B!), timeline rule (-31 B),
//     stat stroke 1.5->1 (-55 B), verdict divider (-23 B).
//     Klaster India TIDAK digeser (6 dot terpisah, bukan blob; dot
//     (269,728) 12px dari pin #5 = gate, geser apa pun hanya
//     memperketat gate lain).
// (2) Headroom yang pulih dibelanjakan untuk quantize (kriteria 5):
//     hero01/hero03/scene05/scene06/scene10 q16->q20, scene08 q24->q32
//     (resep /tmp/v22-build.py; reproduksi v20 12/12 piksel-identik).
//     scene07 q20 DITOLAK (RMSE -0,15, cek mata 3x TIDAK ADA beda).
//     #04 gate-kritis + #11/#13 gate palet EKSAM TIDAK disentuh.
// Adegan lain + hero GTA byte-identik v21; data news-v12.json TIDAK berubah.
//    yang langit/gradiennya paling banding, dalam headroom 7.140 B).
// prinsip: siluet di atas detail, warna jangan nabrak).
// HANYA 3 adegan dipoles, 8 adegan lain + hero GTA byte-identik v17:
//  #3 IPO: koin REGENERATE (2x) — koin raksasa, bintang utuh, margin kanan
//    jelas (v17: 13px -> v18: 28px); atas/bawah tetap close-up raksasa
//    (batas geometri slot 3,775:1, lihat STATUS.md v18).
//  #1 Summit: re-crop (86,130,2649,809) — matahari strip kini kelihatan
//    sebagai kubah bergaris di bawah bendera tengah; 3 bendera tetap utuh.
//  #12 chip: re-crop (350,49,1950,675) — zoom 19%, bayangan kiri mengecil,
//    tepi teal-abu kiri-bawah keluar frame; pin 3 sisi tetap utuh.
//  Chip REPORTED (#4 kapital kolom + #1 pojok bendera Rusia): DIBIARKAN —
//    tidak ada posisi geser yang tidak menutupi hal lain (diukur, STATUS v18).
// Resep proses: median 3x3 + quantize 12 (med3+q12) untuk SEMUA adegan.
// Data: news-v13.json (31 cerita SAMA — hanya 10 field teks dikoreksi,
//     lihat header v24). VERDICT 3 baris terverifikasi v24 (9-6 genosida);
//     DATE CHECK 8 item dikelompokkan per tanggal; chips 13/13.
// KOMPRESI: PNG RGB + zlib 9 (lossless) + JPEG q88 4:4:4 (target <300 KB);
// format final = yang lebih kecil.
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { Resvg } from "@resvg/resvg-js";

const PHI = 1.61803; // golden ratio, 5 digit (Gibran 16:16 WIB)
const PI = 3.14159; // pi, 5 digit (Gibran 16:16 WIB)
const SQRT_PHI = 1.27202; // sqrt(phi) — langkah skala tipe
// OY: geser vertikal global (rebalance margin v3). Semua helper y (box,
// rect, line, poly, text, project) menambahkan OY; literal SVG langsung
// memakai ${... + OY} eksplisit. Footer memakai OY=-11 (lihat di bawah).
let OY = -16; // -16 untuk masthead..tail; -11 untuk footer (tail pitch +1px
// menambah 5px di bawah tail: 6 baris x 1px) => atas 32px, bawah 32px.
const BANDS = false; // v22 (audit byte): band tail dihapus (-4.744 B; kontras band vs kertas ~1,05:1 — nyaris tak terlihat di crop 2x; tail tetap terbaca lewat nomor + divider kolom) // band selang-seling halus di tail (baris 0/2/4)
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
// PETA NAVY v9 (studi #1: #1 memakai peta navy + kontinen tan + pin
// merah bernomor + dot abu + caption). Laut navy gelap, daratan tan.
const NAVY_MAP_BG = "#24344A"; // laut navy
const NAVY_LAND = "#D9B98A", NAVY_LAND2 = "#C9A86A", NAVY_LAND3 = "#E3C99A"; // tan
const NAVY_DOT = "#C9BFA8"; // dot abu terang di atas navy (kontras ~6:1)
// Kontinen navy: titik SAMA seperti CONTINENTS, isi TAN (bukan sage).
const CONTINENTS_NAVY = [
  { name: "North America", fill: NAVY_LAND, pts: [[-168,66],[-150,70],[-135,69],[-125,71],[-110,73],[-95,80],[-85,76],[-75,73],[-65,62],[-55,60],[-60,47],[-65,44],[-70,42],[-75,35],[-80,26],[-81,25],[-87,21],[-90,21],[-95,18],[-97,16],[-94,17],[-90,14],[-85,11],[-80,8],[-79,9],[-83,9],[-88,13],[-92,15],[-97,16],[-102,18],[-105,20],[-110,23],[-114,28],[-118,33],[-122,37],[-124,42],[-124,48],[-130,54],[-140,60],[-150,61],[-158,58],[-162,55],[-166,60],[-168,66]] },
  { name: "Greenland", fill: NAVY_LAND3, pts: [[-58,64],[-52,60],[-43,60],[-32,68],[-25,70],[-30,76],[-45,78],[-58,76],[-62,70]] },
  { name: "South America", fill: NAVY_LAND2, pts: [[-80,10],[-77,7],[-75,5],[-70,0],[-65,-3],[-60,-5],[-55,-5],[-50,-2],[-44,-3],[-38,-5],[-35,-8],[-37,-13],[-40,-20],[-42,-23],[-48,-27],[-52,-32],[-57,-38],[-62,-41],[-65,-45],[-68,-50],[-70,-54],[-72,-50],[-73,-44],[-73,-37],[-72,-30],[-71,-22],[-71,-18],[-75,-15],[-78,-10],[-80,-5],[-81,0],[-80,5]] },
  { name: "Africa", fill: NAVY_LAND, pts: [[-17,15],[-16,20],[-12,27],[-9,31],[-5,35],[0,36],[5,37],[10,37],[15,32],[20,32],[25,31],[30,31],[32,30],[35,28],[38,22],[40,18],[43,12],[48,11],[51,10],[48,5],[44,0],[40,-5],[38,-10],[35,-15],[33,-20],[31,-25],[28,-30],[25,-34],[20,-35],[17,-32],[15,-27],[13,-22],[12,-17],[11,-12],[9,-5],[9,0],[9,4],[6,4],[0,6],[-7,5],[-12,7],[-15,10],[-17,15]] },
  { name: "Asia", fill: NAVY_LAND2, pts: [[30,70],[35,68],[40,67],[45,65],[50,68],[55,69],[60,70],[65,72],[70,73],[75,74],[80,75],[90,76],[100,77],[110,77],[120,76],[130,73],[140,72],[150,70],[160,69],[170,67],[178,65],[175,62],[170,60],[162,58],[158,52],[155,50],[150,45],[145,42],[140,39],[135,35],[130,33],[127,35],[126,38],[124,40],[122,38],[120,34],[118,30],[115,25],[110,20],[108,15],[105,10],[103,8],[100,7],[98,10],[95,15],[92,20],[90,22],[88,22],[86,20],[83,18],[80,13],[77,8],[75,12],[73,18],[70,22],[67,25],[64,25],[61,25],[58,26],[55,27],[52,28],[50,29],[48,30],[46,29],[44,29],[42,28],[40,30],[38,32],[36,36],[34,36],[32,38],[30,40],[30,45],[30,50],[30,55],[30,60],[30,65],[30,70]] },
  { name: "Europe", fill: NAVY_LAND3, pts: [[-10,36],[-9,38],[-9,43],[-5,44],[-2,46],[-1,46],[-4,48],[-2,49],[0,50],[2,51],[4,53],[7,54],[8,57],[10,59],[12,58],[15,56],[18,56],[21,55],[21,58],[24,59],[26,60],[28,62],[30,65],[30,70],[35,68],[40,67],[44,64],[45,60],[42,58],[40,55],[38,52],[35,50],[33,48],[30,46],[28,44],[28,42],[26,41],[23,40],[22,38],[21,40],[19,42],[16,44],[14,45],[12,44],[10,44],[8,44],[6,43],[3,43],[0,40],[-2,37],[-6,36],[-9,37]] },
  { name: "Australia", fill: NAVY_LAND, pts: [[113,-22],[113,-26],[114,-30],[115,-33],[118,-35],[122,-34],[126,-32],[129,-32],[132,-32],[135,-35],[137,-35],[140,-38],[143,-39],[146,-39],[149,-37],[150,-34],[152,-30],[153,-27],[151,-24],[148,-20],[146,-19],[143,-15],[142,-11],[140,-17],[138,-17],[136,-15],[135,-12],[132,-11],[129,-14],[126,-14],[123,-17],[120,-19],[117,-20],[114,-21]] },
  { name: "SE Asia islands", fill: NAVY_LAND2, pts: [[95,5],[97,8],[99,10],[101,8],[103,5],[104,2],[102,0],[100,-2],[98,-4]] },
  { name: "Java", fill: NAVY_LAND2, pts: [[105,-5],[108,-6],[111,-7],[114,-8],[116,-9],[114,-10],[110,-8],[107,-6]] },
  { name: "New Guinea", fill: NAVY_LAND, pts: [[131,-1],[134,-2],[137,-3],[140,-3],[142,-4],[145,-5],[147,-6],[150,-8],[150,-10],[147,-9],[144,-8],[141,-8],[138,-7],[135,-5],[132,-3]] },
  { name: "Japan", fill: NAVY_LAND3, pts: [[130,31],[131,33],[133,34],[135,34],[137,35],[139,35],[140,37],[141,39],[141,41],[142,43],[144,44],[145,44],[144,42],[142,40],[140,38],[138,36],[136,35],[134,34],[132,33]] },
  { name: "UK", fill: NAVY_LAND3, pts: [[-5,50],[-3,53],[-5,55],[-4,57],[-2,58],[0,57],[1,54],[0,52],[-3,51]] },
  { name: "New Zealand", fill: NAVY_LAND2, pts: [[167,-45],[168,-44],[170,-43],[172,-41],[174,-39],[176,-38],[178,-38],[176,-40],[174,-42],[172,-43],[170,-45],[168,-46]] },
  { name: "Madagascar", fill: NAVY_LAND2, pts: [[44,-16],[47,-15],[50,-16],[50,-20],[48,-24],[45,-25],[43,-22],[43,-18]] },
];
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
function textBox(x, y, str, { size = 16, weight = 400, family = FONT, anchor = "start", wordSpacing = 0 } = {}) {
  const w = textW(str, size, weight, family) + wordSpacing * (String(str).split(/\s+/).length - 1);
  const bx = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  // Tinggi bbox: cap ~0.72em di atas baseline; descender hanya bila ada
  // huruf descender (g,j,p,q,y) — tanpa itu, bawah = baseline + 0.02em.
  // (Estimasi 0.75/0.25 menandai "GTA VI" <> "OUT NOW" sebagai overlap
  // padahal keduanya all-caps tanpa descender: gap nyata ~7px.)
  const hasDesc = /[gjpqy]/.test(str);
  box(bx, y - size * 0.72, w, size * (hasDesc ? 0.97 : 0.74), "text", str);
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function text(x, y, str, { size = 16, weight = 400, fill = INK, anchor = "start", spacing = 0, style = "", family = FONT, stretch = "", wordSpacing = 0 } = {}) {
  textBox(x, y, str, { size, weight, family, anchor, wordSpacing });
  const ls = spacing ? ` letter-spacing="${spacing}"` : "";
  const ws = wordSpacing ? ` word-spacing="${wordSpacing}"` : "";
  const fs = style ? ` font-style="${style}"` : "";
  const fst = stretch ? ` font-stretch="${stretch}"` : "";
  return `<text x="${x}" y="${y + OY}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${ls}${ws}${fs}${fst}>${esc(str)}</text>`;
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
  ILLU_ORANGE = "#D96C2E", ILLU_STORM = "#4F7285"; // v11: biru-slate badai (kartu #5, beda dari teal #4); spiral putih 5,17:1
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
// v21: bintang bendera Cina memakai titik BULAT (bukan 0.1px) —
// koordinat pecahan membuat resvg menghasilkan lebih banyak warna
// antialiasing (terukur +114 B); bentuk bintang R=2.4-7.2 tidak berubah
// secara visual pada pembulatan ini (cek mata crop 3x).
function starPtsI(cx, cy, rO, rI, n = 5, rot = -Math.PI / 2) {
  return starPts(cx, cy, rO, rI, n, rot).map(([a, b]) => [Math.round(a), Math.round(b)]);
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
// v11 (feedback biru): kotak simbol BIRU -> TEAL — biru pucat #A8C4D4
// terbaca sebagai highlight tanpa alasan; kolom krem di atas teal
// kontras ~3.4:1, tetap terbaca.
function illu3(x, y) {
  let s = rect(x, y, 34, 34, ILLU_TEAL);
  s += poly([[x + 14, y + 13], [x + 32, y + 13], [x + 23, y + 6]], ILLU_CREAM);
  for (const cx of [15, 21, 27]) s += rect(x + cx, y + 14, 3, 12, ILLU_CREAM);
  s += rect(x + 12, y + 27, 22, 3, ILLU_TAN);
  return s;
}
// #4 Siklon — spiral putih di atas laut STORM BLUE v11 (beda dari teal #4:
// dua kotak teal bersebelahan terbaca satu blok; storm blue #4F7285 tetap
// satu palet muted, spiral putih kontras 5,17:1).
function illu4(x, y) {
  let s = rect(x, y, 34, 34, ILLU_STORM);
  s += polyline(spiralPts(x + 20, y + 20, 1.75, 11), ILLU_WHITE, 2.5);
  s += circle(x + 20, y + 20, 1.6, ILLU_WHITE);
  return s;
}
// #5 Sanksi — dokumen + segel larangan merah (lingkaran + garis miring).
// v11: dokumen v10 PUTIH di atas krem nyaris tak terlihat (hanya segel
// merah yang terbaca) — dokumen kini berbingkai INK + 2 garis teks,
// segel diperbesar (r 6.5 -> 7.5, garis 2.5 -> 3).
function illu5(x, y) {
  let s = rect(x, y, 34, 34, ILLU_BG);
  s += poly([[x + 12, y + 7], [x + 28, y + 7], [x + 28, y + 27], [x + 12, y + 27]], ILLU_WHITE, 1, INK);
  s += rect(x + 15, y + 10, 10, 2, MUTED, 0.6);
  s += rect(x + 15, y + 14, 10, 2, MUTED, 0.6);
  s += circle(x + 20, y + 21, 7.5, "none", ACCENT, 3);
  s += line(x + 14.7, y + 15.7, x + 25.3, y + 26.3, ACCENT, 3);
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
// #10 Perdamaian — dahan zaitun (simbol abstrak, studi §2 #4).
// v11: retakan hitam v10 terbaca sebagai PETIR, bukan "fault" — dihapus.
// Dahan diperbesar (ujung 7,30 -> 29,9; daun 4 -> 6 helai, ukuran 4 -> 5)
// + 2 buah zaitun, agar terbaca sebagai dahan zaitun di thumbnail 300px.
function illu10(x, y) {
  let s = rect(x, y, 34, 34, ILLU_BG);
  s += polyline([[x + 7, y + 30], [x + 29, y + 9]], ILLU_OLIVE, 2.5);
  for (const [lx, ly, a] of [[11, 26, -45], [14, 23, 45], [17, 20, -45], [20, 17, 45], [23, 14, -45], [26, 11, 45]]) {
    const dx = Math.round(5 * Math.cos((a * Math.PI) / 180)), dy = Math.round(5 * Math.sin((a * Math.PI) / 180));
    s += poly([[x + lx, y + ly], [x + lx + dx, y + ly + dy - 2], [x + lx + 2 * dx, y + ly], [x + lx + dx, y + ly + dy + 2]], ILLU_OLIVE);
  }
  s += circle(x + 15, y + 26, 1.8, "#5C7A3A");
  s += circle(x + 23, y + 19, 1.8, "#5C7A3A");
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
// v11 (feedback biru): kotak simbol BIRU -> KREM netral — chip navy +
// inti emas + segitiga merah tetap kontras di atas krem, tanpa highlight.
function illu12(x, y) {
  let s = rect(x, y, 34, 34, ILLU_BG);
  s += rect(x + 10, y + 10, 14, 14, ILLU_NAVY);
  for (const px of [14, 17, 20]) { s += line(x + px, y + 8, x + px, y + 10, ILLU_NAVY, 1.5); s += line(x + px, y + 24, x + px, y + 26, ILLU_NAVY, 1.5); }
  for (const py of [14, 17, 20]) { s += line(x + 8, y + py, x + 10, y + py, ILLU_NAVY, 1.5); s += line(x + 24, y + py, x + 26, y + py, ILLU_NAVY, 1.5); }
  s += rect(x + 15, y + 15, 4, 4, ILLU_GOLD);
  s += poly([[x + 26, y + 18], [x + 32, y + 29], [x + 20, y + 29]], ACCENT);
  s += rect(x + 25.5, y + 22, 1.5, 4, ILLU_WHITE);
  s += circle(x + 26.2, y + 27.5, 0.9, ILLU_WHITE);
  return s;
}
// #13 Pengadilan — palu (beda dari gedung #3).
// v11: palu v10 tegak (kepala horizontal + gagang vertikal) terbaca
// sebagai huruf "T", 2 cincin rantai terbaca sebagai lingkaran acak —
// palu kini MIRING 35° (rotate group) + kepala/gagang diperbesar +
// landasan suara diperlebar; cincin dihapus (palu saja sudah terbaca).
function illu13(x, y) {
  let s = rect(x, y, 34, 34, ILLU_BG);
  s += rect(x + 11, y + 28, 20, 3, ILLU_TAN);
  s += `<g transform="rotate(-35 20 15)">`;
  s += rect(x + 12, y + 11, 16, 7, ILLU_BROWN);
  s += rect(x + 18, y + 18, 3, 11, ILLU_BROWN);
  s += `</g>`;
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
// v18 SUPERSEDED: illuHeroSummitWide + illuHeroChartWide DIGANTI adegan AI
// (hero01/hero03.png); fungsi dipertahankan sebagai jejak, tidak dipanggil.
// Hero #1 Summit v12 (adegan, standar GTA): 3 bendera + 3 figur duduk
// TANPA wajah (kepala polos + bahu jas) di balik meja + karpet merah.
// Bendera mengecil (44 -> 36px) agar figur + meja muat; tiang ke y+56.
function illuHeroSummitWide(x, y, w = 302, h = 80) {
  let s = rect(x, y, w, h, "#DCE7E0");
  s += rect(x, y, w, 6, "#B09A7A", 0.6);
  const flags = [
    { fx: x + 14 }, // China
    { fx: x + 111 }, // AS
    { fx: x + 208 }, // Rusia
  ];
  for (const f of flags) s += line(f.fx, y + 8, f.fx, y + 56, INK, 2);
  // China: merah + bintang emas.
  s += rect(flags[0].fx, y + 8, 84, 36, ACCENT);
  s += poly(starPts(flags[0].fx + 18, y + 26, 9, 3.6, 5), ILLU_GOLD);
  // AS: garis merah-putih + kanton biru.
  s += rect(flags[1].fx, y + 8, 84, 36, ILLU_WHITE);
  for (let i = 0; i < 3; i++) s += rect(flags[1].fx, y + 8 + i * 12, 84, 6, ACCENT);
  s += rect(flags[1].fx, y + 8, 34, 18, ILLU_NAVY);
  // Rusia: triwarna putih-biru-merah.
  s += rect(flags[2].fx, y + 8, 84, 12, ILLU_WHITE);
  s += rect(flags[2].fx, y + 20, 84, 12, "#2E5A8A");
  s += rect(flags[2].fx, y + 32, 84, 12, ACCENT);
  // 3 figur duduk (tanpa wajah): kepala polos + bahu jas, di depan bendera.
  const figs = [
    { cx: x + 56, head: "#D9B98A", suit: "#2E3A4A" },
    { cx: x + 151, head: "#C9A86A", suit: "#3D2C1E" },
    { cx: x + 246, head: "#B09A7A", suit: "#4A4A4A" },
  ];
  for (const f of figs) {
    s += circle(f.cx, y + 42, 7, f.head);
    s += poly([[f.cx - 13, y + 58], [f.cx - 9, y + 48], [f.cx + 9, y + 48], [f.cx + 13, y + 58]], f.suit);
  }
  // Meja + karpet merah.
  s += rect(x, y + 58, w, 12, "#6B4A2A");
  s += rect(x, y + 58, w, 2, "#F2E8D5");
  s += line(x, y + 70, x + w, y + 70, INK, 1.5);
  s += rect(x, y + 70, w, 10, ACCENT);
  return s;
}
// Hero #3 Anthropic v12: grafik naik + figur berdiri (tanpa wajah) +
// tumpukan koin emas (bukan 1 koin).
function illuHeroChartWide(x, y, w = 302, h = 80) {
  let s = rect(x, y, w, h, ILLU_GOLD_BG);
  const bars = [18, 28, 36, 46, 58];
  bars.forEach((bh, i) => {
    const bx = x + 24 + i * 44;
    s += rect(bx, y + 66 - bh, 30, bh, ILLU_TEAL);
  });
  s += polyline([[x + 24, y + 60], [x + 68, y + 48], [x + 112, y + 40], [x + 156, y + 30], [x + 200, y + 20], [x + 244, y + 12]], ILLU_TEAL, 3);
  s += poly([[x + 238, y + 12], [x + 248, y + 12], [x + 244, y + 19]], ILLU_TEAL);
  // Figur berdiri kiri (tanpa wajah): kepala + badan jas gelap.
  s += circle(x + 12, y + 20, 5, "#2E2118");
  s += poly([[x + 4, y + 66], [x + 7, y + 26], [x + 17, y + 26], [x + 20, y + 66]], "#2E2118");
  // Tumpukan koin: 2 kecil + 1 besar.
  s += circle(x + 250, y + 58, 8, ILLU_GOLD, ILLU_BROWN, 1);
  s += circle(x + 250, y + 50, 8, ILLU_GOLD, ILLU_BROWN, 1);
  s += circle(x + 272, y + 52, 15, ILLU_GOLD, ILLU_BROWN, 1.5);
  s += circle(x + 272, y + 52, 9, "none", ILLU_BROWN, 1);
  s += line(x, y + 66, x + w, y + 66, INK, 1.5);
  return s;
}
const ILLU = { 3: illu3, 4: illu4, 5: illu5, 6: illu6, 7: illu7, 8: illu8, 9: illu9, 10: illu10, 11: illu11, 12: illu12, 13: illu13 };
// v9: warna latar tiap ilustrasi grid (rect 34x34 pertama tiap fungsi
// illuN) — dipakai fragGridV9 untuk mengisi kotak 179x70 dengan warna
// yang sama, agar simbol yang di-scale (50x50, di tengah) menyatu
// mulus dengan latarnya.
const ILLU_BG_MAP = { 3: ILLU_TEAL, 4: ILLU_STORM, 5: ILLU_BG, 6: ILLU_SAGE, 7: ILLU_NAVY, 8: ILLU_TAN, 9: ILLU_GOLD_BG, 10: ILLU_BG, 11: ILLU_BG, 12: ILLU_BG, 13: ILLU_BG }; // v11: 4 storm blue (dulu TEAL — sama dengan #4)

// ---------- adegan grid v12 (standar art hero GTA) ----------
// Yang bikin art GTA bagus (diamati dari render art-final-test.png):
// langit GRADIEN kaya + matahari strip + kolom pantulan + siluet
// BERLAPIS (palem + menara, tinggi/posisi bervariasi, asimetris) +
// laut band datar + garis putih + stipple/grain + burung kecil.
// Tiap adegan grid v13 (kotak 179x70, (x, y) = sudut kiri atas GEN):
// langit gradien + sumber cahaya + 2-3 elemen BERLAPIS (belakang muted,
// depan jenuh) + tanah/laut band + garis horizon + stipple.
// Stipple memakai mulberry32 seed tetap -> deterministik antar run.
function mulberry(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function stipple(x, y, w, h, color, n, seed, rMax = 1.0, op = 0.3) {
  const rnd = mulberry(seed);
  let s = "";
  for (let i = 0; i < n; i++) {
    const cx = Math.round((x + rnd() * w) * 10) / 10;
    const cy = Math.round((y + rnd() * h) * 10) / 10;
    const r = Math.round((0.6 + rnd() * rMax) * 10) / 10;
    s += `<circle cx="${cx}" cy="${cy + OY}" r="${r}" fill="${color}" opacity="${op}"/>`;
  }
  return s;
}
// Matahari strip (tanda tangan art hero GTA): cakram emas + 2 garis
// langit — via clipPath agar strip tidak keluar lingkaran. id unik per
// adegan (tiap fungsi scene dipanggil sekali).
function stripedSun(cx, cy, r, stripe, id) {
  let s = `<clipPath id="${id}"><circle cx="${cx}" cy="${cy + OY}" r="${r}"/></clipPath>`;
  s += `<g clip-path="url(#${id})">`;
  s += `<rect x="${cx - r}" y="${cy - r + OY}" width="${2 * r}" height="${2 * r}" fill="#F2B705"/>`;
  s += `<rect x="${cx - r}" y="${cy - Math.round(r * 0.45) + OY}" width="${2 * r}" height="${Math.max(1, Math.round(r * 0.28))}" fill="${stripe}"/>`;
  s += `<rect x="${cx - r}" y="${cy + Math.round(r * 0.2) + OY}" width="${2 * r}" height="${Math.max(1, Math.round(r * 0.28))}" fill="${stripe}"/>`;
  s += `</g>`;
  s += circle(cx, cy, r, "none", "#D96C2E", 1);
  return s;
}
// Chip status (P2): warna gelap, teks putih kontras >=4.5:1 (gate verifier).
const STATUS_CHIP = {
  REPORTED: { label: "REPORTED", fill: "#1B5E20" },
  FORECAST: { label: "FORECAST", fill: "#0D47A1" },
  CLAIM: { label: "CLAIM", fill: "#BF360C" },
};
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

// ---------- fragmen grid v18 (adegan AI 179x70 full-width) ----------
// v18: adegan 179x70 full-width = GAMBAR AI (bukan code-drawn): langit
// gradien + sumber cahaya + 3 lapis + bayangan keras + stipple/grain
// sudah di dalam gambar. Dek tetap 1 baris (tidak perlu dipotong).
// Tiap kartu = ADEGAN AI penuh 179x70 via AI_SCENE[it.illu] (data-URI PNG);
// chip status di kanan atas adegan; headline 2 baris + dek 1 baris +
// kicker tetap. #11 FULL AI di v15 — bendera Kanada + China digenerate
// sebagai bagian adegan (bendera kode v14 DIHAPUS).
// (x, y) = sudut kiri atas KARTU, koordinat GEN.
function fragGridV9(it, colX, y) {
  let s = "";
  const bg = ILLU_BG_MAP[it.illu] || ILLU_BG;
  // Kotak ilustrasi v18 179x70 FULL-WIDTH: latar warna bg (fallback) + adegan AI penuh.
  s += `<rect x="${colX}" y="${y + OY}" width="179" height="70" fill="${bg}"/>`;
  s += `<image x="${colX}" y="${y + OY}" width="179" height="70" href="${AI_SCENE[it.illu]}"/>`;
  s += `<rect x="${colX}" y="${y + OY}" width="179" height="70" fill="none" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="${colX - 2}" y="${y - 2 + OY}" width="18" height="18" fill="${ACCENT}"/>`;
  s += text(colX + 7, y + 10, String(it.n), { size: 12, weight: 800, fill: "#FFFFFF", anchor: "middle" });
  // Chip status (P2) di kanan atas adegan — badge di kiri, chip di kanan.
  const chip = STATUS_CHIP[it.status] || STATUS_CHIP.REPORTED;
  const cw = textW(chip.label, 7, 800) + 10;
  s += `<rect x="${colX + 179 - cw - 3}" y="${y + 3 + OY}" width="${cw}" height="11" rx="5" fill="${chip.fill}"/>`;
  s += text(colX + 179 - cw - 3 + cw / 2, y + 11, chip.label, { size: 7, weight: 800, fill: "#FFFFFF", anchor: "middle" });
  // Headline 2 baris 13px (lebar 179px), dek 1 baris 10px, kicker 10px.
  // (teks kartu TIDAK dikecilkan: 13/122 = 10,7% tinggi kartu, sama dengan
  // proporsi referensi 18 Nov 17/170 = 10% — yang dikecilkan hanya stat +
  // DATE CHECK + footer; ruang ilustrasi datang dari tinggi kartu +18px.)
  const maxW = 179;
  const lines = wrap(it.headline, maxW, 13, 400);
  let head = lines[0] || "";
  let truncated = false;
  if (lines.length > 2) { truncated = true; head = lines.slice(0, 2).join(" ").slice(0, 27) + "…"; }
  const hl = lines.slice(0, 2);
  // v21 (koreksi Gibran 23:18 WIB — teks mepet): pitch headline 14->15,
  // dek +108->+110, kicker +118->+122. Terukur dari kotak teks SVG v20
  // (cap 0.72em + descender 0.25em): teks-vs-teks kini >= 2.3px —
  // h1->h2 2.39px (kartu #4, descender 'y'), h2->dek 2.55px (kartu #7
  // 'projectiles', satu-satunya baris-2 ber-descender), dek->kicker
  // 2.3px (7/10 dek ber-descender). Kicker baris-2 -> judul peta 3.0px
  // (kotak sebenarnya: kicker caps tanpa descender), kicker -> ilustrasi
  // baris berikut 1.8px. Pitch BULAT (bukan 14.5) — offset .5px terbukti
  // mahal byte (+1.383 B di DATE CHECK, terukur ablasi).
  hl.forEach((ln, j) => { s += text(colX, y + 82 + j * 15, ln, { size: 13, weight: 400, fill: INK }); });
  const dl = wrap(it.dek || "", maxW, 10, 400);
  if (dl.length > 1) truncated = true;
  s += text(colX, y + 110, dl[0] || "", { size: 10, weight: 400, fill: MUTED });
  s += text(colX, y + 122, it.kicker || "WORLD", { size: 10, weight: 800, fill: ACCENT, spacing: 1 });
  return { s, truncated, head };
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

// ---------- peta band NAVY v9 (studi #1: peta #1 navy + tan) ----------
// Sama seperti worldMapBand, tapi: laut navy gelap + daratan tan +
// stroke kontinen PAPER 0.30 (INK tak terlihat di navy) + pin merah
// ber-stroke PUTIH 1.5 (definisi di atas navy; stroke INK 1.5 di v8
// nyaris tak terlihat di navy) + dot brief abu TERANG #C9BFA8.
// Pin bernomor 1–13 + dot abu brief (termasuk Alaska #14).
function worldMapBandNavy(d, x, y, w, h) {
  let s = "";
  s += rect(x, y, w, h, NAVY_MAP_BG);
  // v22 (audit byte): garis lintang dihapus (-618 B; peta tetap terbaca,
  // pin/dot/kontinen tidak berubah) — cek mata crop 2x lolos.
  const box = { x, y, w, h };
  for (const c of CONTINENTS_NAVY) s += `<polygon points="${c.pts.map(([lo, la]) => project(lo, la, box)).map((p) => p.join(",")).join(" ")}" fill="${c.fill}" stroke="none"/>`;
  // v22 (audit byte): facet peta dihapus (-1.143 B; di 300x78 nyaris tak
  // terlihat) + stroke kontinen dihapus (C, -2.018 B) — daratan tetap
  // terbaca lewat kontras fill vs navy; cek mata crop 2x lolos.
  const pinR = 8, pinGap = 18, pinNudge = 12;
  const placed = [];
  const pinC = []; // pusat pin (untuk placeDot v21: dot-pin >= 12px)
  const miniC = []; // posisi benar marker yang di-nudge (dot r=3, >= 7px)
  const placePin = (lon, lat, isBrief) => {
    let [px, py] = project(lon, lat, box);
    const conflicts = (x, y) => placed.some((q) => Math.abs(x - q[0]) < pinGap && Math.abs(y - q[1]) < pinGap);
    let nudged = false;
    if (conflicts(px, py)) {
      // Nudge 2D v11: klaster US (Miami/NYC/Ottawa/DC) menumpuk VERTIKAL
      // bila offset pertama [0,12]/[0,24] — 4 pin dalam strip x 131..136
      // (tangga 61px, terukur SVG v10). Offset kini DIAGONAL dulu agar
      // pin mengipas 2D (simulasi: 2 (131,733), 3 (150,737), 11 (149,706),
      // 12 (120,710) — sebar-x 5px -> 30px); leader line ke posisi benar.
      const offsets = [[14,14],[-14,14],[14,-14],[-14,-14],[26,0],[-26,0],[0,26],[0,-26],[26,26],[-26,26],[26,-26],[-26,-26],[0,40],[40,0],[-40,0]];
      for (const [dx, dy] of offsets) {
        if (!conflicts(px + dx, py + dy)) { px += dx; py += dy; nudged = true; break; }
      }
      if (!nudged) { py += 48; nudged = true; } // fallback: ke bawah
    }
    if (nudged) {
      const [ox, oy] = project(lon, lat, box);
      s += `<circle cx="${ox}" cy="${oy}" r="3" fill="${isBrief ? NAVY_DOT : PIN}"/>`;
      miniC.push([ox, oy]); // v21: mini-dot ikut diaudit placeDot
      // Leader line ke PUSAT pin (lingkaran pin digambar setelahnya dan
      // menutupi ujung garis) — benar untuk nudge ke arah mana pun.
      s += `<line x1="${ox}" y1="${oy}" x2="${px}" y2="${py}" stroke="${isBrief ? NAVY_DOT : PIN}" stroke-width="1.2" opacity="0.9"/>`;
    }
    const top = y + OY + pinR + 2, bot = y + h + OY - pinR - 2;
    px = Math.max(x + pinR + 2, Math.min(x + w - pinR - 2, px));
    py = Math.max(top, Math.min(bot, py));
    placed.push([px, py]);
    if (!isBrief) pinC.push([px, py]); // v21: pusat pin
    return [px, py, nudged];
  };
  for (const p of d.pins) {
    const [px, py] = placePin(p.lon, p.lat, false);
    s += `<circle cx="${px}" cy="${py}" r="${pinR}" fill="${PIN}" stroke="#FFFFFF" stroke-width="1.5"/>`;
    // Nomor DI DALAM pin: py sudah rendered (project sudah +OY), jadi
    // text() harus dikurangi OY agar tidak digeser 16px ke atas lagi
    // (bug laten v8: nomor melayang di atas lingkaran).
    s += text(px, py + 3.5 - OY, String(p.n), { size: 10, weight: 800, fill: "#FFFFFF", anchor: "middle" });
  }
  for (const g of d.greyDots) {
    const [px, py] = placePin(g.lon, g.lat, true);
    s += `<circle cx="${px}" cy="${py}" r="3" fill="${NAVY_DOT}"/>`;
  }
  // v21 (kriteria #2 keluasan): 9 titik abu TAMBAHAN — 18 cerita tail
  // berlabel tempat, tapi peta v20 hanya menandai 9 di antaranya.
  // Yang belum bertitik: TOKYO-2 (#22), SYDNEY-2 (#21), São Paulo (#31),
  // India x6 (#23-28, New Delhi). Data news-v12.json TIDAK berubah —
  // dot didefinisikan di sini sebagai konstanta generator (lon/lat kota,
  // posisi perkiraan = praktik infografik standar; caption peta sudah
  // menyatakan "Positions are approximate" — jangan tulis koordinat di
  // halaman). Placer terpisah dari placePin: dot-dot >= 7px, dot-pin
  // >= 12px (Euclidean, bukan kotak), offset kecil dulu, TANPA leader
  // line / mini-dot. Klaster India menumpuk di New Delhi karena pin #5
  // (Cyclone Akvan) menutup sisi timur — 6 dot mengipas ke barat
  // (offset maks 14px, masih di wilayah India barat laut pada peta ini).
  const GREY_DOTS_V21 = [
    { label: "Tokyo #22", lon: 139.7, lat: 35.7 },
    { label: "Sydney #21", lon: 151.2, lat: -33.9 },
    { label: "Sao Paulo #31", lon: -46.6, lat: -23.5 },
    { label: "New Delhi #23", lon: 77.2, lat: 28.6 },
    { label: "New Delhi #24", lon: 77.2, lat: 28.6 },
    { label: "New Delhi #25", lon: 77.2, lat: 28.6 },
    { label: "New Delhi #26", lon: 77.2, lat: 28.6 },
    { label: "New Delhi #27", lon: 77.2, lat: 28.6 },
    { label: "New Delhi #28", lon: 77.2, lat: 28.6 },
  ];
  const placeDot = (lon, lat) => {
    const [ax, ay] = project(lon, lat, box); // rendered (project sudah +OY)
    const offsets = [[0,0],[7,0],[-7,0],[0,7],[0,-7],[7,7],[-7,7],[7,-7],[-7,-7],[14,0],[-14,0],[0,14],[0,-14],[14,7],[-14,7],[14,-7],[-14,-7],[7,14],[-7,14],[7,-14],[-7,-14],[14,14],[-14,14],[14,-14],[-14,-14],[21,0],[-21,0],[0,21],[0,-21]];
    const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    for (const [dx, dy] of offsets) {
      const cand = [ax + dx, ay + dy];
      if (pinC.some((p) => dist(cand, p) < 12)) continue;
      if (placed.some((p) => dist(cand, p) < 7)) continue;
      if (miniC.some((p) => dist(cand, p) < 7)) continue;
      const cx = Math.max(x + 5, Math.min(x + w - 5, cand[0])); // clamp margin 5px
      const cy = Math.max(y + OY + 5, Math.min(y + h + OY - 5, cand[1]));
      placed.push([cx, cy]);
      return [cx, cy, dx, dy];
    }
    return [ax, ay, 0, 0]; // fallback: jangkar (tidak terjadi di v21)
  };
  for (const g of GREY_DOTS_V21) {
    const [px, py, dx, dy] = placeDot(g.lon, g.lat);
    s += `<circle cx="${px}" cy="${py}" r="3" fill="${NAVY_DOT}"/>`;
    console.error(`  grey dot v21 ${g.label}: (${px}, ${py}) offset (${dx}, ${dy})`);
  }
  s += `<rect x="${x}" y="${y + OY}" width="${w}" height="${h}" fill="none" stroke="none"/>`; // v22 (audit byte): border peta dihapus (-374 B; tepi navy vs kertas tetap tajam)
  return s;
}

function build(d, artDataUri) {
  const heroes = d.heroes; // 3 hero: #1 summit, #2 GTA, #3 ANT
  const grid = d.grid.slice(0, 10); // n=4..13
  const brief = d.brief.slice(0, 18); // n=14..31
  const items = grid.map((g) => ({ n: g.n, headline: g.headline, kicker: g.kicker, illu: g.illu, dek: g.dek, status: g.status }));
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

  // ---- Stat strip v9: 6 kotak (148px, gap 8) y 158..206 (48px) ----
  // v18 (ref 18 Nov: angka hari itu cukup 1 baris kompak, bukan 24px):
  // angka 24->20px, kotak 56->48px — ruang 8px ke grid di bawah.
  // Angka BESAR merah 24px + caption 2 baris 9px (bukan label 1 kata).
  // Keenam angka SUPERLATIF (studi peringkat 1): rekor / pertama /
  // skala terbesar hari itu — caption menegaskan superlatifnya.
  // $12BN WIND (v8, angka lemah) -> $120BN COP31.
  const stats = d.stats;
  stats.forEach(({ num, cap }, i) => {
    const bx = 48 + i * 156;
    s += `<rect x="${bx}" y="${158 + OY}" width="148" height="48" rx="2" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
    s += text(bx + 12, 178, num, { size: 20, weight: 800, fill: ACCENT });
    s += text(bx + 12, 190, cap[0] || "", { size: 9, weight: 400, fill: INK });
    s += text(bx + 12, 202, cap[1] || "", { size: 9, weight: 400, fill: INK });
  });

  // ---- Region bar v9: ruang vertikal SENDIRI (baseline 218) ----
  // Perbaikan cacat v8 #1: region bar kini di bawah stat strip (kotak
  // berakhir 206) dan di atas hero (ilustrasi mulai 230) — 12px celah
  // ke hero badge, tidak ada yang menimpanya. 7 segmen + WORLD 1
  // (total 31 cerita).
  {
    let rx = 48;
    d.regionBar.forEach((r, i) => {
      s += text(rx, 218, r.name, { size: 12, weight: 700, fill: MUTED });
      rx += textW(r.name, 12, 700) + 6;
      s += text(rx, 218, "·", { size: 12, weight: 700, fill: MUTED });
      rx += textW("·", 12, 700) + 6;
      s += text(rx, 218, String(r.count), { size: 12, weight: 800, fill: ACCENT });
      rx += textW(String(r.count), 12, 800) + 6;
      if (i < d.regionBar.length - 1) {
        s += text(rx, 218, "·", { size: 12, weight: 700, fill: MUTED });
        rx += textW("·", 12, 700) + 14;
      }
    });
  }

  // ---- 3 hero berdampingan (kolom 302px, gap 11) ----
  // Ilustrasi 302x80 di atas kartu + kicker + headline 20px (2 baris)
  // + dek 12px 2 BARIS (v9: dek 1 baris v8 terlalu pendek — #1 memakai
  // dek hero 2–3 baris + 1 angka spesifik per hero).
  const heroCols = [48, 361, 674];
  const heroW = 302, heroIllusY = 230, heroIllusH = 80;
  heroes.forEach((h, i) => {
    const hx = heroCols[i];
    if (h.illu === "flags") {
      // v18: adegan AI hero01 (3 bendera besar) — ganti code-drawn.
      s += `<image x="${hx}" y="${heroIllusY + OY}" width="${heroW}" height="${heroIllusH}" href="${HERO_SCENE[1]}"/>`;
    } else if (h.illu === "chart") {
      // v18: adegan AI hero03 (koin raksasa + panah naik) — ganti code-drawn.
      s += `<image x="${hx}" y="${heroIllusY + OY}" width="${heroW}" height="${heroIllusH}" href="${HERO_SCENE[3]}"/>`;
    } else if (h.illu === "vaporwave") {
      // Art v15 (TERKUNCI) di-crop ke 302x80: skala 302/928, tinggi 125px,
      // y=188 agar matahari (art y 235 -> skala 76) di tengah jendela.
      s += `<clipPath id="heroArtClip"><rect x="${hx}" y="${heroIllusY + OY}" width="${heroW}" height="${heroIllusH}"/></clipPath>`;
      s += `<g clip-path="url(#heroArtClip)"><image x="${hx}" y="${heroIllusY - 36 + OY}" width="${heroW}" height="125" href="${artDataUri}"/></g>`;
    }
    s += `<rect x="${hx}" y="${heroIllusY + OY}" width="${heroW}" height="${heroIllusH}" fill="none" stroke="${INK}" stroke-width="2"/>`;
    s += `<rect x="${hx - 2}" y="${heroIllusY - 2 + OY}" width="18" height="18" fill="${ACCENT}"/>`;
    s += text(hx + 7, heroIllusY + 10, String(h.n), { size: 12, weight: 800, fill: "#FFFFFF", anchor: "middle" });
    // Chip status hero (P2) di kanan atas ilustrasi.
    const hchip = STATUS_CHIP[h.status] || STATUS_CHIP.REPORTED;
    const hw = textW(hchip.label, 8, 800) + 12;
    s += `<rect x="${hx + heroW - hw - 4}" y="${heroIllusY + 4 + OY}" width="${hw}" height="13" rx="6" fill="${hchip.fill}"/>`;
    s += text(hx + heroW - hw - 4 + hw / 2, heroIllusY + 13, hchip.label, { size: 8, weight: 800, fill: "#FFFFFF", anchor: "middle" });
    if (h.illu === "flags") {
      // v21 (koreksi Gibran 23:18 WIB — CACAT FAKTUAL, kriteria 4):
      // hero01.png AI menggambar bendera Cina dengan 1 bintang emas besar
      // di tengah (terukur: emas (221,149,96) 202px, scene x38..58 y15..35)
      // = layout Vietnam, BUKAN Cina. Cina yang benar: 1 bintang BESAR +
      // 4 bintang KECIL di kanton kiri atas.
      // Perbaikan code-drawn (deterministik, murah byte): tambal bintang
      // lama dengan rect merah + gambar 5 bintang emas baru.
      // Geometri bendera asli (30x20 unit, bidang scene x12..84 y0..48):
      // besar di (5,5) R=3 unit; kecil di (10,2),(12,4),(12,7),(10,9)
      // R=1 unit. Scene -> page (+48,+214); helper rect/poly memakai
      // koordinat GEN (y rendered +16).
      // Tambal: scene (36..60, 13..37) -> GEN rect(hx+36, 243, 24, 24),
      // fill #C6131B = merah bendera terukur (198,19,27).
      // Emas #DD9560 = emas bintang lama terukur (221,149,96).
      // Bendera AS (garis + kanton biru solid) + Rusia (putih-biru-merah)
      // terukur BENAR — tidak disentuh.
      s += rect(hx + 36, 243, 24, 24, "#C6131B");
      const FLAG_GOLD = "#DD9560";
      s += poly(starPtsI(hx + 24, 242, 7.2, 2.75), FLAG_GOLD);
      s += poly(starPtsI(hx + 36, 234.8, 2.4, 0.92), FLAG_GOLD);
      s += poly(starPtsI(hx + 40.8, 239.6, 2.4, 0.92), FLAG_GOLD);
      s += poly(starPtsI(hx + 40.8, 246.8, 2.4, 0.92), FLAG_GOLD);
      s += poly(starPtsI(hx + 36, 251.6, 2.4, 0.92), FLAG_GOLD);
    }
    s += text(hx, 326, h.kicker, { size: 11, weight: 800, fill: ACCENT, spacing: 1 });
    const hl = wrap(h.headline, heroW, 20, 700);
    if (hl.length > 2) truncated.push("hero" + h.n);
    hl.slice(0, 2).forEach((ln, j) => { s += text(hx, 350 + j * 24, ln, { size: 20, weight: 700, fill: INK }); });
    const dl = wrap(h.dek, heroW, 12, 400);
    if (dl.length > 2) truncated.push("hero" + h.n + "dek");
    dl.slice(0, 2).forEach((ln, j) => { s += text(hx, 398 + j * 14, ln, { size: 12, weight: 400, fill: MUTED }); });
  });

  // ---- Label seksi grid (428..448) ----
  s += rect(48, 428, 200, 20, ACCENT);
  s += text(148, 442, d.gridTitle, { size: 15, weight: 800, fill: "#FFFFFF", anchor: "middle", spacing: 1 });

  // ---- Grid v9: 10 item (#4..13), 5 kol x 2 baris ----
  // Kartu 179px, pitch kolom 187 (gap 8), pitch baris 124.
  // Ilustrasi 179x70 berlatar warna + headline 2 baris + dek 1 baris
  // + kicker (bukan 48px tanpa dek seperti v8).
  const gridCols = [48, 235, 422, 609, 796];
  const gridRows = [456, 580];
  // v22 (audit byte): separator vertikal grid dihapus (-165 B; kartu
  // sudah terpisah oleh frame ilustrasi + celah 8px — cek mata crop 2x lolos).
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 5; c++) {
      const idx = r * 5 + c;
      if (idx < items.length) {
        const f = fragGridV9(items[idx], gridCols[c], gridRows[r]);
        s += f.s;
        if (f.truncated) truncated.push(items[idx].n);
      }
    }
  }

  // Kolom tail (3 kol x 6 baris) — dipakai di bawah.
  const cols = [48, 364, 680];

  // ---- Peta band NAVY v12 ----
  // v18: judul 716 + peta 722..800 (78px) — ruang untuk DATE CHECK
  // 5 baris di bawah; dasar peta sejajar dengan kotak VERDICT (792).
  s += text(48, 716, d.mapTitle, { size: 15, weight: 800, fill: ACCENT, spacing: 1 });
  s += worldMapBandNavy(d, 48, 722, 300, 78);
  // Legenda pin 2 KOLOM label pendek (P2: kolom ke-3 jadi kotak VERDICT).
  // 13 label: kolom A 7 baris, kolom B 6 baris, pitch 13, badge 12x12.
  const pinLabels = [
    "Shenzhen summit", "GTA VI Miami", "Anthropic IPO",
    "ICJ The Hague", "Cyclone Akvan", "Settler sanctions",
    "Horn troops", "Gas Husky", "Jobless 4.9%",
    "Peace board", "Canada–China", "AI threat warning",
    "Han voided",
  ];
  const pinNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  pinLabels.forEach((lab, i) => {
    const lx = i < 7 ? 364 : 560;
    const row = i < 7 ? i : i - 7;
    const ly = 716 + row * 13; // v18: 6px lebih tinggi — baris ke-7 legenda tidak menabrak caption peta (gate overlap)
    s += `<rect x="${lx}" y="${ly - 9 + OY}" width="12" height="12" fill="${ACCENT}"/>`;
    s += text(lx + 6, ly, String(pinNums[i]), { size: 9, weight: 800, fill: "#FFFFFF", anchor: "middle" });
    s += text(lx + 20, ly, lab, { size: 11, weight: 400, fill: INK });
  });
  // Kotak VERDICT navy (P2): putusan ICJ + MARKETS — kanan legenda.
  // v13: angka 9-6 DIBUANG — tak terverifikasi (transkripsi kotak #1,
  // bukan data kita). v24: 9-6 KEMBALI — TERVERIFIKASI (Reuters/BBC/AP:
  // 9-6, pertama kali negara bersalah genosida, reparasi diperintahkan).
  // Isi kini HANYA fakta terverifikasi news-v13.json: headline #4
  // ("World Court: Myanmar committed genocide"), stat FLED 730K,
  // footer2 ("9–6, reparations ordered"), timeline 10:00. MARKETS tetap
  // (dek hero #3 $83, stat $81.3bn, headline #9 4.9%).
  s += `<rect x="706" y="${722 + OY}" width="270" height="78" fill="${NAVY_MAP_BG}"/>`;
  s += text(714, 736, "THE VERDICT — THE HAGUE · 10:00", { size: 11, weight: 800, fill: "#FFFFFF" });
  s += text(714, 750, "ICJ: Myanmar guilty of genocide.", { size: 10, weight: 400, fill: "#FFFFFF" });
  s += text(714, 762, "730,000 Rohingya fled to Bangladesh.", { size: 10, weight: 400, fill: "#FFFFFF" });
  s += text(714, 774, "9–6; reparations ordered.", { size: 10, weight: 400, fill: "#FFFFFF" });
  s += line(714, 780, 968, 780, "#FFFFFF", 1, 0.4);
  s += text(714, 794, "MARKETS", { size: 10, weight: 800, fill: "#E3B25D" });
  s += text(714 + textW("MARKETS", 10, 800) + 8, 794, "· $83 IPO · $81.3bn · 4.9% jobless", { size: 10, weight: 400, fill: "#FFFFFF" });
  // Caption lengkap 1 baris (menjelaskan kedua simbol + "approximate").
  // v21: menyebut "18 briefs" — semua cerita tail kini bertitik di peta.
  // Teks di-override di generator; news-v12.json TIDAK berubah.
  // Caption +1px (806->807): celah legenda "Horn troops" -> caption
  // 1.3px -> ~2.8px; timeline ikut +1px agar celah caption -> header
  // tetap ~4px (PIL).
  s += text(48, 807, "Red numbers mark stories 1–13; grey dots mark the 18 briefs below. Positions are approximate.", { size: 11, weight: 400, fill: MUTED });

  // ---- Timeline "THE DAY IN UTC" v12 (header 821, label 835) ----
  // Selisih caption (806) -> header (820) dipertahankan 14px seperti v11
  // (celah PIL ~4px); semua di bawah caption ikut -12 (brief, DATE CHECK).
  s += text(48, 821, "THE DAY IN UTC", { size: 12, weight: 800, fill: ACCENT, spacing: 1 });
  s += line(170, 815, 976, 815, MUTED, 1, 0.5);
  d.timeline.forEach((t, i) => {
    const tx = 48 + i * 185;
    s += text(tx, 835, t.time, { size: 11, weight: 800, fill: ACCENT });
    // v11 (feedback oranye): label diberi word-spacing +1.5px — celah
    // antar-kata timeline terukur paling rapat (median 5px, banyak 4px).
    s += text(tx + textW(t.time, 11, 800) + 26, 835, t.label, { size: 11, weight: 400, fill: INK, wordSpacing: 1.5 });
  });

  // ---- Brief tail v12: 18 cerita (#14..31), 3 kol x 6 baris, pitch 11 ----
  // v18: judul 854, baris 868..923; tiap item berlabel tempat (P3):
  // "PLACE — headline", font 10px (lebar 270px muat 54 kar).
  s += text(48, 854, d.briefTitle, { size: 15, weight: 800, fill: ACCENT, spacing: 1 });
  const briefRows = [868, 879, 890, 901, 912, 923];
  if (BANDS) {
    for (const r of [0, 2, 4]) s += rect(48, briefRows[r] - 12, 928, 13, BAND);
  }
  // v22 (audit byte): divider vertikal tail dihapus (-255 B; kolom sudah
  // terpisah oleh celah lebar + nomor merah — cek mata crop 2x lolos).
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 3; c++) {
      const it = brief[r * 3 + c];
      const x0 = cols[c];
      const numW = Math.round(String(it.n).length * 7.2 + 12);
      s += text(x0, briefRows[r], String(it.n), { size: 12, weight: 800, fill: ACCENT });
      const bl = wrap((it.place ? it.place + " — " : "") + it.headline, 296 - numW, 10, 400);
      if (bl.length > 1) truncated.push(it.n);
      s += text(x0 + numW, briefRows[r], bl[0] || "", { size: 10, weight: 400, fill: INK });
    }
  }

  // ---- DATE CHECK box merah v12 (928..994, 66px, 5 baris) ----
  // v18 (ref 18 Nov: DATE CHECK kotak merah kecil 2 baris): teks 12->11px,
  // pitch 13->12, box 72->66px — isi TETAP 8 pengecualian + alasan.
  // Header + kalimat alasan + 8 pengecualian bertanggal (P3).
  // v21: teks 11->10.5px (pitch tetap 12, celah seragam ~1.8px).
  // v21 (koreksi Gibran 23:18 WIB — teks mepet): teks 11->10.5px, pitch
  // tetap 12 — celah antar-baris kini seragam ~1.8px (descender) /
  // ~4.2px (tanpa descender), dari 1.3px di v20. Pitch 12.5 (.5px)
  // DITOLAK: terukur +1.383 B (offset setengah piksel membuat resvg
  // menghasilkan lebih banyak warna antialiasing). Koordinat y SAMA
  // dengan v20 (939/951/963/975/987); baris pertama 3.4px dari tepi
  // atas kotak, baris terakhir 4.4px dari tepi bawah.
  s += `<rect x="48" y="${928 + OY}" width="928" height="66" fill="${ACCENT}"/>`;
  s += text(60, 939, d.dateCheck, { size: 10.5, weight: 800, fill: "#FFFFFF" });
  s += text(60, 951, d.dateCheck2, { size: 10.5, weight: 400, fill: "#FFFFFF" });
  s += text(60, 963, d.dateCheck3, { size: 10.5, weight: 400, fill: "#FFFFFF" });
  s += text(60, 975, d.dateCheck4, { size: 10.5, weight: 400, fill: "#FFFFFF" });
  s += text(60, 987, d.dateCheck5, { size: 10.5, weight: 400, fill: "#FFFFFF" });

  // ---- Footer: sumber + HOW SURE ----
  // v21 (koreksi Gibran 23:18 WIB — teks mepet): rule 998->996, sumber
  // 1008->1007, HOW SURE 1019->1020. Terukur v20: sumber nyaris MENEMPEL
  // rule (cap atas 984.08 vs rule bawah 984 = 0.08px — tidak ketangkap
  // gate teks-vs-teks karena rule bukan teks) dan sumber->HOW SURE 0.3px.
  // Kini: rule->sumber 1.08px, sumber->HOW SURE 2.33px, margin bawah 20px.
  s += rect(48, 996, 928, 2, ACCENT);
  s += text(48, 1007, d.footer + " · 13 DRAWN", { size: 11, weight: 400, fill: MUTED });
  s += text(48, 1020, d.footer2, { size: 11, weight: 400, fill: MUTED });
  const bottom = 1020; // GEN; rendered 1004, margin bawah 20px (atas 32px)
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
if (!jsonPath || !outPng) { console.error("usage: node generate-final-v24.mjs <news-v13.json> <out.png> [out.svg]"); process.exit(1); }
const d = JSON.parse(readFileSync(jsonPath, "utf8"));
const artB64 = readFileSync("art-final-test.png").toString("base64");
const artDataUri = `data:image/png;base64,${artB64}`;
// Adegan AI v19: 10 PNG (crop 179:70 + downscale 1x + resep proses per
// varian, lihat STATUS.md v18) di scenes-ai/v24/ (q16/q20 pada adegan banding;
// 04/05/06/09/12 re-crop dari raw v14; 07/11 re-crop dari raw v15).
const AI_SCENE_FILE = { 3: "04", 4: "05", 5: "06", 6: "07", 7: "08", 8: "09", 10: "10", 11: "11", 12: "12", 13: "13" };
const AI_SCENE = {};
for (const [illu, nn] of Object.entries(AI_SCENE_FILE)) {
  AI_SCENE[illu] = `data:image/png;base64,${readFileSync(`scenes-ai/v24/scene${nn}.png`).toString("base64")}`;
}
// Hero AI v18 (koreksi Gibran 22:37 WIB — #1/#3 "belum berubah"):
// hero #1 summit (3 bendera besar) + hero #3 IPO (koin raksasa + panah
// naik), 302x80, med3+q12. Hero #2 GTA (vaporwave) TERKUNCI, tidak disentuh.
// Prinsip: siluet di atas detail; warna jangan nabrak (satu blok style hero).
const HERO_SCENE = {
  1: `data:image/png;base64,${readFileSync("scenes-ai/v24/hero01.png").toString("base64")}`,
  3: `data:image/png;base64,${readFileSync("scenes-ai/v24/hero03.png").toString("base64")}`,
};
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
// ---------- KOMPRESI v9 (studi news-image-compression/NOTES.md) ----------
// resvg menghasilkan RGBA dengan alpha 100% opaque (beban mati). Post-step
// PIL (deterministik, byte-identik antar run):
//   1. WAJIB: konversi RGB (strip alpha) + PNG compress_level=9,
//      optimize=True — lossless, pixel-identik (PSNR inf); v5 403->313 KB.
//   2. Format final: JPEG q88 4:4:4 (subsampling=0) bila mengalahkan PNG —
//      v5 284 KB (PSNR 38,15), cek mata bersih di zoom 100% + 300px.
//      4:2:0 DILARANG (teks merah berdarah), q95 DILARANG (hampir tak hemat).
//   Palette-256 DILARANG untuk v9: langit art v15 gradien radial -> banding.
// File JPEG ditulis di samping PNG (out.jpg); PIL menghitung PSNR JPEG vs PNG.
const outJpg = outPng.replace(/\.png$/i, ".jpg");
const pyScript = `
import sys, io, os, math
from PIL import Image
import numpy as np
png_path = ${JSON.stringify(outPng)}
jpg_path = ${JSON.stringify(outJpg)}
raw = sys.stdin.buffer.read()
im = Image.open(io.BytesIO(raw)).convert("RGB")
im.save(png_path, optimize=True, compress_level=9)
arr = np.asarray(im).astype(np.float64)
im.save(jpg_path, quality=88, subsampling=0, optimize=True)
jm = np.asarray(Image.open(jpg_path)).astype(np.float64)
mse = float(((arr - jm) ** 2).mean())
psnr = float("inf") if mse == 0 else 10 * math.log10(255.0 ** 2 / mse)
print("PNG-RGB-L9 " + png_path + ": " + str(os.path.getsize(png_path)) + " B")
print("JPEG-q88-444 " + jpg_path + ": " + str(os.path.getsize(jpg_path)) + " B (PSNR " + format(psnr, ".2f") + " dB vs PNG)")
`;
try {
  const out = execFileSync("python3", ["-c", pyScript], { input: Buffer.from(png), maxBuffer: 64 * 1024 * 1024, encoding: "utf8" });
  process.stdout.write(out);
} catch (e) {
  console.error("compression post-step FAILED:", e.message);
  if (e.stdout) process.stdout.write(e.stdout);
  if (e.stderr) process.stderr.write(e.stderr);
  process.exit(1);
}
console.log(`wrote ${outPng} + ${outJpg} (resvg raw ${png.length} B)`);
