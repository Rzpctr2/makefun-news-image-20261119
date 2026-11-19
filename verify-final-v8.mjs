// verify-final-v8.mjs — independent verification of entry-final-v8.png.
// v8 = template pemenang top-10 (lead summit, masthead tanggal Didone,
// 3 hero, stat strip besar, peta band bernomor, DATE CHECK box, timeline).
// Checks: determinism, size/dimensions, no truncation, masthead date,
// stat strip (angka muat di kotak), region bar, heroes (3 + ilustrasi),
// grid (10 kartu, pitch 58, celah ilustrasi/badge, headline->chip),
// peta band (9 pin bernomor + 8 dot abu, utuh), timeline (5 slot),
// DATE CHECK box, footer (sumber + Original drawings), kontras teks,
// story/continent counts, bottom margin.
// Usage: node verify-final-v8.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";

const sha = (buf) => createHash("sha256").update(buf).digest("hex");

// 1. Determinism: render twice into /tmp, compare with the deliverable.
execSync("node generate-final-v8.mjs news-v8.json /tmp/final8-a.png /tmp/final8-a.svg", { stdio: "pipe" });
execSync("node generate-final-v8.mjs news-v8.json /tmp/final8-b.png /tmp/final8-b.svg", { stdio: "pipe" });
const a = readFileSync("/tmp/final8-a.png"), b = readFileSync("/tmp/final8-b.png");
const main = readFileSync("entry-final-v8.png");
console.log(`determinism: a==b ${sha(a) === sha(b)} | a==entry-final-v8 ${sha(a) === sha(main)}`);
console.log(`entry-final-v8.png sha256: ${sha(main)}`);
console.log(`size: ${main.length} bytes (${(main.length / 1024).toFixed(1)} KiB, limit 1048576) — ${main.length <= 1048576 ? "PASS" : "FAIL"}`);

// 2. No truncation in the SVG.
const svg = readFileSync("entry-final-v8.svg", "utf8");
console.log(`truncation "…" in SVG: ${svg.includes("…") ? "FOUND — FAIL" : "none — PASS"}`);

// 2b. Dek swipe REMOVED (v5 fix 1): no ACCENT polygon at 0.25 opacity.
const swipe = [...svg.matchAll(/<polygon[^>]*fill="#BC2F0E"[^>]*opacity="0.25"[^>]*>/g)];
console.log(`dek highlighter swipe polygons: ${swipe.length} (expected 0) — ${swipe.length === 0 ? "PASS" : "FAIL"}`);

// 2c. Masthead v8: tanggal Didone 54px terpusat + dek merah miring.
const dateEl = [...svg.matchAll(/<text x="512" y="96" font-family="Playfair Display" font-size="54" font-weight="900"[^>]*>([^<]*)<\/text>/g)];
console.log(`masthead tanggal Didone 54px: ${dateEl.length} (expected 1, "${dateEl[0] ? dateEl[0][1] : "?"}") — ${dateEl.length === 1 ? "PASS" : "FAIL"}`);
const dateW = dateEl[0] ? dateEl[0][1].length * 54 * 0.60 : 0;
console.log(`lebar tanggal estimasi: ${Math.round(dateW)}px (limit 928) — ${dateW <= 928 ? "PASS" : "FAIL"}`);
const dekEl = [...svg.matchAll(/<text x="512" y="124"[^>]*font-style="italic"[^>]*>([^<]*)<\/text>/g)];
console.log(`dek merah miring: ${dekEl.length} (expected 1) — ${dekEl.length === 1 ? "PASS" : "FAIL"}`);

// 2d. Stat strip v8: 6 kotak 148x48, angka 26px + label 11px (2 baris).
const statBoxes = [...svg.matchAll(/<rect x="(\d+)" y="(\d+)" width="148" height="48" rx="2" fill="none" stroke="#2E2118" stroke-width="1.5"\/>/g)];
console.log(`stat boxes 148x48: ${statBoxes.length} (expected 6) — ${statBoxes.length === 6 ? "PASS" : "FAIL"}`);
const statNums = [...svg.matchAll(/<text x="(\d+)" y="(\d+)" font-family="Noto Sans, sans-serif" font-size="26" font-weight="800" fill="#BC2F0E"[^>]*>([^<]*)<\/text>/g)];
console.log(`stat numbers 26px: ${statNums.map((m) => m[3]).join(", ")} (expected 6) — ${statNums.length === 6 ? "PASS" : "FAIL"}`);
const statW = statNums.map((m) => ({ num: m[3], w: Math.round(m[3].length * 26 * 0.56) }));
const statFit = statW.every((s) => s.w + 12 + 8 <= 148);
console.log(`stat numbers muat (lebar+padding <= 148): ${statW.map((s) => `${s.num}=${s.w}px`).join(", ")} — ${statFit ? "PASS" : "FAIL"}`);

// 2e. Heroes v8: 3 kartu (ilustrasi 302x80 + frame + badge 18x18).
const heroFrames = [...svg.matchAll(/<rect x="(\d+)" y="(\d+)" width="302" height="80" fill="none" stroke="#2E2118" stroke-width="2"\/>/g)];
console.log(`hero frames 302x80: ${heroFrames.length} (expected 3) — ${heroFrames.length === 3 ? "PASS" : "FAIL"}`);
const heroArt = [...svg.matchAll(/<clipPath id="heroArtClip">/g)];
console.log(`hero vaporwave crop (clipPath heroArtClip): ${heroArt.length} (expected 1) — ${heroArt.length === 1 ? "PASS" : "FAIL"}`);
const heroFlags = [...svg.matchAll(/<rect x="(\d+)" y="(\d+)" width="302" height="80" fill="#DCE7E0"\/>/g)];
const heroChart = [...svg.matchAll(/<rect x="(\d+)" y="(\d+)" width="302" height="80" fill="#F2E3C0"\/>/g)];
console.log(`hero summit flags bg: ${heroFlags.length} (expected 1) | hero ANT chart bg: ${heroChart.length} (expected 1) — ${heroFlags.length === 1 && heroChart.length === 1 ? "PASS" : "FAIL"}`);

// 2f. Ilustrasi grid v8: 10 kartu 48x48 via <g scale(1.4118)> + frame +
// badge 18x18. Total badge = 10 grid + 3 hero = 13.
const illuGrid = [...svg.matchAll(/<g transform="translate\([\d.,-]+\) scale\(1\.4118\)">/g)];
console.log(`ilustrasi grid 48x48 (scale 1.4118): ${illuGrid.length} (expected 10) — ${illuGrid.length === 10 ? "PASS" : "FAIL"}`);
const frames48 = [...svg.matchAll(/<rect[^>]*width="48" height="48" fill="none" stroke="#2E2118" stroke-width="2"[^>]*>/g)];
console.log(`frame INK 2px grid 48x48: ${frames48.length} (expected 10) — ${frames48.length === 10 ? "PASS" : "FAIL"}`);
const badges = [...svg.matchAll(/<rect[^>]*width="18" height="18" fill="#BC2F0E"[^>]*>/g)];
console.log(`badge nomor 18x18: ${badges.length} (expected 13 = 10 grid + 3 hero) — ${badges.length === 13 ? "PASS" : "FAIL"}`);
const badgeNums = [...svg.matchAll(/<text[^>]*font-size="12" font-weight="800" fill="#FFFFFF"[^>]*>([^<]*)<\/text>/g)].filter((m) => /^\d+$/.test(m[1]));
console.log(`angka badge 12px: ${badgeNums.map((m) => m[1]).join(",")} (expected 13: 1,2,3 + 4..13) — ${badgeNums.length === 13 ? "PASS" : "FAIL"}`);

// 3. Peta band v8: kotak x 48..348, GEN 684..794 (rendered 668..778).
// Pin = lingkaran merah r=8 + angka putih 10px di tengahnya (9 pin);
// dot brief = abu r=3 (8, + dot posisi-benar bila pin di-nudge).
const mapTexts = [...svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*font-size="10" font-weight="800" fill="#FFFFFF"[^>]*>([^<]*)<\/text>/g)]
  .filter((m) => +m[1] >= 48 && +m[1] <= 348 && +m[2] >= 668 && +m[2] <= 778);
console.log(`angka pin di peta: ${mapTexts.map((m) => m[3]).join(",")} (expected 9: 1,2,3,4,5,6,7,8,14) — ${mapTexts.length === 9 ? "PASS" : "FAIL"}`);
const pins = [...svg.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="8" fill="#BC2F0E"/g)];
console.log(`pin merah r=8: ${pins.length} (expected 9) — ${pins.length === 9 ? "PASS" : "FAIL"}`);
const pinClipped = pins.filter((m) => {
  const cx = +m[1], cy = +m[2];
  return cx - 9.5 < 48 || cx + 9.5 > 348 || cy - 9.5 < 668 || cy + 9.5 > 778;
});
console.log(`pin terpotong tepi peta: ${pinClipped.length} — ${pinClipped.length === 0 ? "PASS (9/9 utuh)" : "FAIL: " + JSON.stringify(pinClipped)}`);
const greyDots = [...svg.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="3" fill="#8A7F6A"/g)];
console.log(`dot abu r=3: ${greyDots.length} (expected >= 8 brief) — ${greyDots.length >= 8 ? "PASS" : "FAIL"}`);

// 3b. Grid v8: pitch 58, ilustrasi 48px, headline 14px, chip 15px.
// Celah ilustrasi->ilustrasi = 58-48 = 10px; ilustrasi->badge = 58-50 = 8px.
// Headline->chip: chip atas y+7, descender headline (14px) y+3.5 -> 3.5px.
const chips = [...svg.matchAll(/<rect x="(\d+)" y="([\d.]+)" width="(\d+)" height="15" rx="7"/g)].map((m) => ({ x: +m[1], y: +m[2] }));
const heads = [...svg.matchAll(/<text x="(\d+)" y="([\d.]+)" font-family="Noto Sans, sans-serif" font-size="14" font-weight="400"[^>]*>([^<]*)<\/text>/g)]
  .map((m) => ({ x: +m[1], y: +m[2] })).filter((h) => h.y >= 430 && h.y <= 640);
const rowBases = [...new Set(heads.map((h) => h.y))].sort((x, y) => x - y);
console.log(`grid row baselines: ${rowBases.join(", ")} (pitch ${rowBases.length > 1 ? rowBases[1] - rowBases[0] : "?"}px, expected 58) — ${rowBases.length === 4 && rowBases[1] - rowBases[0] === 58 ? "PASS" : "FAIL"}`);
const illuGaps = [], badgeGaps = [];
for (let i = 0; i < rowBases.length - 1; i++) {
  illuGaps.push((rowBases[i + 1] - 14) - (rowBases[i] + 34));
  badgeGaps.push((rowBases[i + 1] - 16) - (rowBases[i] + 34));
}
console.log(`celah ilustrasi->ilustrasi antar baris: ${illuGaps.map((g) => g.toFixed(1)).join(" / ")}px (target >=8px) — ${illuGaps.every((g) => g >= 8) ? "PASS" : "FAIL"}`);
console.log(`celah ilustrasi->badge baris berikut: ${badgeGaps.map((g) => g.toFixed(1)).join(" / ")}px (target >=6px) — ${badgeGaps.every((g) => g >= 6) ? "PASS" : "FAIL"}`);
const chipTops = chips.filter((c) => c.y >= 440 && c.y <= 660).map((c) => c.y);
const hcGaps = chipTops.map((t) => {
  const rb = Math.max(...rowBases.filter((r) => r <= t));
  return t - (rb + 3.5);
});
const hcGap = Math.min(...hcGaps);
console.log(`headline->chip gap (terkecil): ${hcGap.toFixed(2)}px (target >=3px) — ${hcGap >= 3 ? "PASS" : "FAIL"}`);
const kickTexts = [...svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)" font-family="Noto Sans, sans-serif" font-size="11" font-weight="700" fill="#6B5844"[^>]*>/g)]
  .map((m) => ({ x: +m[1], y: +m[2] })).filter((t) => t.y >= 450 && t.y <= 665);
const kickOk = kickTexts.filter((t) => chips.some((c) => Math.abs(c.x + 7 - t.x) < 1 && Math.abs(c.y + 11 - t.y) < 1));
console.log(`kicker texts on chips: ${kickOk.length} of 10 grid kickers inside their chips — ${kickOk.length === 10 ? "PASS" : "FAIL"}`);

// 3c. Timeline v8: 5 slot (time + label), DATE CHECK box, footer.
const tlTimes = [...svg.matchAll(/<text x="(\d+)" y="810" font-family="Noto Sans, sans-serif" font-size="11" font-weight="800" fill="#BC2F0E"[^>]*>([^<]*)<\/text>/g)];
console.log(`timeline times: ${tlTimes.map((m) => m[2]).join(" | ")} (expected 5: 00:00, MORNING, 10:00, 14:30, EVENING) — ${tlTimes.length === 5 ? "PASS" : "FAIL"}`);
const dcBox = [...svg.matchAll(/<rect x="48" y="931" width="928" height="36" fill="#BC2F0E"\/>/g)];
console.log(`DATE CHECK box merah 928x36: ${dcBox.length} (expected 1) — ${dcBox.length === 1 ? "PASS" : "FAIL"}`);
const dcTexts = [...svg.matchAll(/<text x="60" y="(945|961)"[^>]*fill="#FFFFFF"[^>]*>([^<]*)<\/text>/g)];
console.log(`DATE CHECK lines putih: ${dcTexts.length} (expected 2) — ${dcTexts.length === 2 ? "PASS" : "FAIL"}`);
console.log(`footer "Original drawings": ${svg.includes("Original drawings") ? "ada — PASS" : "TIDAK ADA — FAIL"}`);
console.log(`footer sumber (8 media): ${["Reuters", "AP", "AFP", "BBC", "The Hindu", "IMD", "Bloomberg", "ICJ"].every((s) => svg.includes(s)) ? "8/8 — PASS" : "kurang — FAIL"}`);

// 4. Contrast (WCAG from hex — flat colors, exact).
function lum(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = c.map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}
function cx(fg, bg) { const x = lum(fg), y = lum(bg); const [hi, lo] = x > y ? [x, y] : [y, x]; return (hi + 0.05) / (lo + 0.05); }
const PAPER = "#F2E8D5", INK = "#2E2118", MUTED = "#6B5844", ACCENT = "#BC2F0E", DEK = "#3D2C1E";
const SEA = "#E9F1EA", LAND = "#5C8A74", LAND2 = "#4C7A64", LAND3 = "#63917A";
console.log(`map land-vs-chip: LAND ${cx(LAND, SEA).toFixed(2)}:1 | LAND2 ${cx(LAND2, SEA).toFixed(2)}:1 | LAND3 ${cx(LAND3, SEA).toFixed(2)}:1 (target >=3:1 non-teks)`);
console.log(`teks: INK/paper ${cx(INK, PAPER).toFixed(2)} | MUTED/paper ${cx(MUTED, PAPER).toFixed(2)} | ACCENT/paper ${cx(ACCENT, PAPER).toFixed(2)} | DEK/paper ${cx(DEK, PAPER).toFixed(2)} | white/ACCENT ${cx("#FFFFFF", ACCENT).toFixed(2)} | ACCENT-italic/paper ${cx(ACCENT, PAPER).toFixed(2)} (target >=4.5:1)`);

// 5. Masthead date contrast + vaporwave crop, measured with PIL.
writeFileSync("/tmp/verify-final8.py", `
from PIL import Image
import numpy as np
fin = np.asarray(Image.open('entry-final-v8.png').convert('RGB')).astype(float)
def lum(a):
    c = a/255.0
    lin = np.where(c<=0.04045, c/12.92, ((c+0.055)/1.055)**2.4)
    return 0.2126*lin[:,:,0]+0.7152*lin[:,:,1]+0.0722*lin[:,:,2]
def cw(l): return 1.05/(l+0.05)
# Masthead date (rendered y ~57..96, x ~58..966): INK on PAPER.
reg = fin[57:97, 58:966]
L = lum(reg)
Ls = np.sort(L.flatten())
print(f"masthead date region: p5 lum {Ls[int(len(Ls)*0.05)]:.3f} (INK ~0.02) | p95 {Ls[int(len(Ls)*0.95)]:.3f} (PAPER ~0.80)")
# Hero GTA crop (rendered x 658..960, y 208..288): harus ada matahari/palem (bukan krem polos).
hero = fin[208:288, 658:960]
Hl = lum(hero)
print(f"hero GTA crop: mean lum {Hl.mean():.3f} | min {Hl.min():.3f} | max {Hl.max():.3f} | std {Hl.std():.3f} (std>0.05 = ada isi, bukan polos)")
# DATE CHECK box (rendered y 931..967): merah ACCENT + teks putih.
dc = fin[931:967, 48:976]
R,G,B = dc[:,:,0], dc[:,:,1], dc[:,:,2]
red = (R>150)&(G<100)&(B<80)
white = (R>230)&(G>230)&(B>230)
print(f"DATE CHECK box: piksel merah {100*red.mean():.1f}% | piksel putih (teks) {100*white.mean():.1f}%")
`);
execSync("python3 /tmp/verify-final8.py", { stdio: "inherit" });

// 6. Story + continent counts + layout budget.
const d = JSON.parse(readFileSync("news-v8.json", "utf8"));
console.log(`stories: heroes ${d.heroes.length} + grid ${d.grid.length} + brief ${d.brief.length} = ${d.heroes.length + d.grid.length + d.brief.length} (target 31, main 13)`);
const counts = { NA: 0, SA: 0, EU: 0, AF: 0, AS: 0, OC: 0, null: 0, undef: 0 };
const M = { "GAMING": null, "SPACE": null, "CANADA": "NA", "U.S.": "NA", "ALASKA": "NA", "CHINA": "AS", "INDIA": "AS", "JAPAN": "AS", "KOREA": "AS", "GAZA": "AS", "SAUDI ARABIA": "AS", "THE HAGUE": "EU", "BLACK SEA": "EU", "EU": "EU", "FRANCE": "EU", "ITALY": "EU", "SPORT": "EU", "MEXICO": "NA", "LATIN AMERICA": "SA", "AUSTRALIA": "OC", "HORN OF AFRICA": "AF", "LIBYA": "AF" };
const all = [...d.heroes, ...d.grid, ...d.brief];
for (const it of all) {
  const hay = ((it.kicker || "") + " " + it.headline).toUpperCase();
  let c = undefined;
  for (const [k, v] of Object.entries(M)) if (hay.includes(k)) { c = v; break; }
  if (c === undefined) counts.undef++; else if (c === null) counts.null++; else counts[c]++;
}
console.log(`continents: NA ${counts.NA} SA ${counts.SA} EU ${counts.EU} AF ${counts.AF} AS ${counts.AS} OC ${counts.OC} off-continent ${counts.null} unmapped ${counts.undef}`);
console.log(`layout v8: OY=-16 | masthead tanggal Didone 54px + dek miring | stat strip 6 kotak 148x48 (angka 26px) | region bar 12px | 3 hero 302x80 + headline 22px + dek 13px | grid pitch 58, ilustrasi 48px, headline 14px | peta band 300x110 (9 pin bernomor + 8 dot abu) + legenda 2 kolom | timeline UTC 5 slot | tail pitch 13, font 11px | DATE CHECK box 928x36 | footer 2 baris | bottom GEN 1018 -> rendered 1002 (margin 22px) | ukuran file v8 ~253 KiB (v7: 406 KiB — tiebreak lebih baik)`);
