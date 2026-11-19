// verify-final-v5.mjs — independent verification of entry-final-v5.png.
// Checks: determinism, size/dimensions, no truncation, headline contrast on
// rendered pixels, map (0 text in chip, 8 red dots whole/unclipped,
// land-vs-chip contrast), grid row gaps (measured from SVG), other text
// contrast, story/continent counts, bottom margin.
// Usage: node verify-final-v5.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";

const sha = (buf) => createHash("sha256").update(buf).digest("hex");

// 1. Determinism: render twice into /tmp, compare with the deliverable.
execSync("node generate-final-v5.mjs news-v3.json /tmp/final5-a.png /tmp/final5-a.svg", { stdio: "pipe" });
execSync("node generate-final-v5.mjs news-v3.json /tmp/final5-b.png /tmp/final5-b.svg", { stdio: "pipe" });
const a = readFileSync("/tmp/final5-a.png"), b = readFileSync("/tmp/final5-b.png");
const main = readFileSync("entry-final-v5.png");
console.log(`determinism: a==b ${sha(a) === sha(b)} | a==entry-final-v5 ${sha(a) === sha(main)}`);
console.log(`entry-final-v5.png sha256: ${sha(main)}`);
console.log(`size: ${main.length} bytes (${(main.length / 1024).toFixed(1)} KiB, limit 1048576) — ${main.length <= 1048576 ? "PASS" : "FAIL"}`);

// 2. No truncation in the SVG.
const svg = readFileSync("entry-final-v5.svg", "utf8");
console.log(`truncation "…" in SVG: ${svg.includes("…") ? "FOUND — FAIL" : "none — PASS"}`);

// 2b. Dek swipe REMOVED (v5 fix 1): no ACCENT polygon at 0.25 opacity in
// the dek band (y 522..542 rendered = 538..558 pre-OY).
const swipe = [...svg.matchAll(/<polygon[^>]*fill="#BC2F0E"[^>]*opacity="0.25"[^>]*>/g)];
console.log(`dek highlighter swipe polygons: ${swipe.length} (expected 0 — dihapus v5) — ${swipe.length === 0 ? "PASS" : "FAIL"}`);

// 3. Map audit from the SVG itself.
//    (a) v4: strip DIHAPUS — chip (x 671..964, y 395..509) harus punya NOL
//    elemen teks (dulu 12: kode+angka strip). Pin = dot merah saja.
//    (b) Pin dots: 8 dot merah r=7, masing-masing UTUH (bbox dot di dalam
//    chip dengan margin radius luar 7.75px).
//    (c) Split trial (MAP_MODE=split) TIDAK dipakai di deliverable —
//    verifikasi ini hanya untuk mode single (default).
const chipTexts = [...svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*>([^<]*)<\/text>/g)]
  .filter((m) => +m[1] >= 671 && +m[1] <= 964 && +m[2] >= 395 && +m[2] <= 509);
console.log(`map chip text elements: ${chipTexts.length} (expected 0 — strip dihapus) — ${chipTexts.length === 0 ? "PASS" : "FAIL"}`);
const dots = [...svg.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="7" fill="#BC2F0E"/g)];
console.log(`red-dot pins r=7: ${dots.length} (expected 8) — ${dots.length === 8 ? "PASS" : "FAIL"}`);
const clipped = dots.filter((m) => {
  const cx = +m[1], cy = +m[2];
  return cx - 7.75 < 671 || cx + 7.75 > 964 || cy - 7.75 < 395 || cy + 7.75 > 509;
});
console.log(`dots terpotong tepi chip: ${clipped.length} — ${clipped.length === 0 ? "PASS (8/8 utuh)" : "FAIL: " + JSON.stringify(clipped)}`);
dots.forEach((m) => console.log(`  dot (${m[1]}, ${m[2]}) margin tepi: L${(+m[1] - 671).toFixed(1)} R${(964 - +m[1]).toFixed(1)} T${(+m[2] - 395).toFixed(1)} B${(509 - +m[2]).toFixed(1)}px`));

// 3b. Grid row gaps + headline->chip gap, measured from the SVG.
// v5: chip y+7..y+22 (teks baseline y+18). Headline descender y+3.75 ->
// chip atas y+7 = 3.25px (target >=3px). Row gap = pitch 39 - 10.8 - 22 =
// 6.2px (v4: 9.2px — didistribusikan ulang, pitch TETAP 39; target v5
// >=6.0px: masih 2.8x bencana v3 2.2px, dan jelas terlihat).
const chips = [...svg.matchAll(/<rect x="(\d+)" y="([\d.]+)" width="(\d+)" height="15" rx="7"/g)].map((m) => ({ x: +m[1], y: +m[2] }));
const heads = [...svg.matchAll(/<text x="(\d+)" y="([\d.]+)" font-family="Noto Sans, sans-serif" font-size="15" font-weight="400"[^>]*>([^<]*)<\/text>/g)]
  .map((m) => ({ x: +m[1], y: +m[2] })).filter((h) => h.y >= 680 && h.y <= 830);
const rowBases = [...new Set(heads.map((h) => h.y))].sort((x, y) => x - y);
const gaps = [];
for (let i = 0; i < rowBases.length - 1; i++) {
  const chipBottom = Math.max(...chips.filter((c) => Math.abs(c.y + 15 - (rowBases[i] + 22)) < 3).map((c) => c.y + 15), rowBases[i] + 22);
  gaps.push(rowBases[i + 1] - 10.8 - chipBottom);
}
console.log(`grid row baselines: ${rowBases.join(", ")} (pitch ${rowBases[1] - rowBases[0]}px)`);
console.log(`grid row gaps: ${gaps.map((g) => g.toFixed(1)).join(" / ")}px (v4: 9.2px; target v5 >=6.0px) — ${gaps.every((g) => g >= 6.0) ? "PASS" : "FAIL"}`);
// Headline->chip gap: per chip, its row's headline baseline is the
// largest rowBase <= chip top (chip top = baseline + 7). Gap =
// chipTop - (baseline + 3.75 descender). v4: 0.25px; target >=3px.
const chipTops = chips.filter((c) => c.y >= 680 && c.y <= 830).map((c) => c.y);
const hcGaps = chipTops.map((t) => {
  const rb = Math.max(...rowBases.filter((r) => r <= t));
  return t - (rb + 3.75);
});
const hcGap = Math.min(...hcGaps);
console.log(`headline->chip gap (terkecil): ${hcGap.toFixed(2)}px (v4: 0.25px; target >=3px) — ${hcGap >= 3 ? "PASS" : "FAIL"}`);
// Kicker text inside chip: baseline y+18 -> chip top y+7, so text y =
// chip y + 11 and text x = chip x + 7. (Wayfinding slot "13 MAIN STORIES…"
// has no chip by design — excluded: only count texts that sit on a chip.)
const kickTexts = [...svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)" font-family="Noto Sans, sans-serif" font-size="12" font-weight="700" fill="#6B5844"[^>]*>/g)]
  .map((m) => ({ x: +m[1], y: +m[2] })).filter((t) => t.y >= 690 && t.y <= 845);
const kickOk = kickTexts.filter((t) => chips.some((c) => Math.abs(c.x + 7 - t.x) < 1 && Math.abs(c.y + 11 - t.y) < 1));
console.log(`kicker texts on chips: ${kickOk.length} of 11 grid kickers inside their chips — ${kickOk.length === 11 ? "PASS" : "FAIL"}`);

// 4. Contrast (WCAG from hex — flat colors, exact).
function lum(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = c.map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}
function cx(fg, bg) { const x = lum(fg), y = lum(bg); const [hi, lo] = x > y ? [x, y] : [y, x]; return (hi + 0.05) / (lo + 0.05); }
const PAPER = "#F2E8D5", INK = "#2E2118", MUTED = "#6B5844", ACCENT = "#BC2F0E", DEK = "#3D2C1E";
const SEA = "#E9F1EA", LAND = "#5C8A74", LAND2 = "#4C7A64", LAND3 = "#63917A";
console.log(`map land-vs-chip: LAND ${cx(LAND, SEA).toFixed(2)}:1 | LAND2 ${cx(LAND2, SEA).toFixed(2)}:1 | LAND3 ${cx(LAND3, SEA).toFixed(2)}:1 (target >=3:1 non-teks; v1 LAND #8FAF9B vs #DCE7E0 = ${cx("#8FAF9B", "#DCE7E0").toFixed(2)}:1)`);
console.log(`pin-vs-map: PIN on SEA ${cx(ACCENT, SEA).toFixed(2)}:1 | PIN on LAND ${cx(ACCENT, LAND).toFixed(2)}:1 (luminansi rendah di daratan gelap — dot dibedakan oleh hue merah-vs-hijau + outline INK ${cx(INK, LAND).toFixed(2)}:1 vs LAND / ${cx(INK, LAND2).toFixed(2)}:1 vs LAND2 / ${cx(INK, LAND3).toFixed(2)}:1 vs LAND3)`);
console.log(`teks: INK/paper ${cx(INK, PAPER).toFixed(2)} | MUTED/paper ${cx(MUTED, PAPER).toFixed(2)} | ACCENT/paper ${cx(ACCENT, PAPER).toFixed(2)} | DEK/paper ${cx(DEK, PAPER).toFixed(2)} | white/ACCENT ${cx("#FFFFFF", ACCENT).toFixed(2)} (target >=4.5:1)`);

// 5. Headline contrast + palm pixels, measured with PIL on rendered pixels.
writeFileSync("/tmp/verify-final5.py", `
from PIL import Image
import numpy as np
fin = np.asarray(Image.open('entry-final-v5.png').convert('RGB')).astype(float)
art = np.asarray(Image.open('art-final-test.png').convert('RGB')).astype(float)
def lum(a):
    c = a/255.0
    lin = np.where(c<=0.04045, c/12.92, ((c+0.055)/1.055)**2.4)
    return 0.2126*lin[:,:,0]+0.7152*lin[:,:,1]+0.0722*lin[:,:,2]
def cw(l): return 1.05/(l+0.05)
for name,(x0,y0,x1,y1) in {"GTA VI":(12,53,408,135),"OUT NOW":(12,139,298,188)}.items():
    region = art[y0:y1, x0:x1]
    L = lum(region)
    Ls = np.sort(L.flatten())
    p95 = Ls[int(len(Ls)*0.95)]; p99 = Ls[int(len(Ls)*0.99)]; mx = Ls[-1]
    print(f"{name}: p95 white-contrast {cw(p95):.2f} | p99 {cw(p99):.2f} | worst {cw(mx):.2f} | {'PASS >=4.5 at p95' if cw(p95)>=4.5 else 'FAIL'}")
reg = fin[154:184, 300:400]
Lr = np.sort(lum(reg).flatten())
print(f"final sky (no text): p95 lum {Lr[int(len(Lr)*0.95)]:.3f} | white pixels (>0.9): {100*(Lr>0.9).mean():.2f}%")
sub = art[139:188, 12:298]
L2 = lum(sub)
palm = (L2 < 0.03) & (sub[:,:,2] <= sub[:,:,0])
print(f"OUT NOW bbox: palm pixels {int(palm.sum())} / {palm.size} = {100*palm.mean():.2f}% of bbox")
`);
execSync("python3 /tmp/verify-final5.py", { stdio: "inherit" });

// 5b. Stat number->label gaps, measured from PNG pixels (v5 fix 2).
// v4 terukur: 2/6/6/7/5/3px (terburuk chip 0 "17M GTA COPIES" = 2px).
// Target v5: tiap chip >=8px. Juga cek label tidak keluar dari chip.
writeFileSync("/tmp/verify-final5-stat.py", `
from PIL import Image
import numpy as np
im = np.asarray(Image.open('entry-final-v5.png').convert('RGB')).astype(int)
R,G,B = im[:,:,0], im[:,:,1], im[:,:,2]
red = (R>150)&(G<100)&(B<80)
dark = (R<80)&(G<70)&(B<60)
y0,y1 = 545,571
gaps = []
for i in range(6):
    bx = 48 + i*156
    ys,xs = np.where(red[y0:y1, bx:bx+148])
    num_right = bx + xs.max() if len(xs) else None
    bd = dark[y0:y1, bx:bx+148].copy()
    bd[:, :3] = False; bd[:, 145:] = False
    ys2,xs2 = np.where(bd)
    cand = xs2[(bx+xs2) > num_right+2] if num_right else xs2
    lab_left = bx + cand.min() if len(cand) else None
    lab_right = bx + xs2.max() if len(xs2) else None
    gaps.append(lab_left-num_right-1)
    print(f"chip {i}: num-right {num_right} | label-left {lab_left} | gap {lab_left-num_right-1}px | label-right {lab_right} (chip edge {bx+148})")
print(f"stat gaps: {gaps} (v4: 2/6/6/7/5/3; target v5 tiap chip >=8px) — {'PASS' if all(g>=8 for g in gaps) else 'FAIL'}")
`);
execSync("python3 /tmp/verify-final5-stat.py", { stdio: "inherit" });

// 6. Story + continent counts + layout budget.
const d = JSON.parse(readFileSync("news-v3.json", "utf8"));
console.log(`stories: lead 1 + hero2 1 + grid ${d.grid.length} + brief ${d.brief.length} = ${1 + 1 + d.grid.length + d.brief.length} (target 31, main 13)`);
const counts = { NA: 0, SA: 0, EU: 0, AF: 0, AS: 0, OC: 0, null: 0, undef: 0 };
const M = { "GAMING": null, "SPACE": null, "CANADA": "NA", "U.S.": "NA", "ALASKA": "NA", "CHINA": "AS", "INDIA": "AS", "JAPAN": "AS", "KOREA": "AS", "GAZA": "AS", "SAUDI ARABIA": "AS", "THE HAGUE": "EU", "BLACK SEA": "EU", "EU": "EU", "FRANCE": "EU", "ITALY": "EU", "SPORT": "EU", "MEXICO": "NA", "LATIN AMERICA": "SA", "AUSTRALIA": "OC", "HORN OF AFRICA": "AF", "LIBYA": "AF" };
const all = [{ n: 1, headline: "GTA VI", kicker: "GAMING · GLOBAL" }, { n: 2, headline: d.hero2.headline, kicker: d.hero2.kicker }, ...d.grid, ...d.brief];
for (const it of all) {
  const hay = ((it.kicker || "") + " " + it.headline).toUpperCase();
  let c = undefined;
  for (const [k, v] of Object.entries(M)) if (hay.includes(k)) { c = v; break; }
  if (c === undefined) counts.undef++; else if (c === null) counts.null++; else counts[c]++;
}
console.log(`continents: NA ${counts.NA} SA ${counts.SA} EU ${counts.EU} AF ${counts.AF} AS ${counts.AS} OC ${counts.OC} off-continent ${counts.null} unmapped ${counts.undef}`);
console.log(`layout v5: OY=-16 (footer -11) | unit pitch 39 (tetap) | chip 15px y+7..y+22, teks y+18 (v4: y+4..y+19, teks y+15) | headline->chip gap 3.25px (v4: 0.25px) | row gap 6.2px (v4: 9.2px — redistribusi, pitch tetap) | grid rows 704/743/782/821 (v4: 706/745/784/823) | stat label offset +14 (v4: +6) | dek swipe DIHAPUS | tail pitch 18 (tetap) | tail title 15px ACCENT | bands #EDE2CC rows 0/2/4 | strip benua DIHAPUS | map single 293x114 (split trial ditolak) | top margin 32px | bottom y=992 -> margin 32px`);
