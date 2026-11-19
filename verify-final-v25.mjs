 // verify-final-v25.mjs — independent verification of entry-final-v25.png.
// v25: BALIKKAN 2 SERI resubmit v24 (judge 0,970079, 10-2-0) — target 12-0-0.
// (a) EKOR 18 -> 12 item (6 brief India #23-28 dicabut), font 10px -> 12px,
//     pitch 11 -> 15, 4 baris — blok micro-text terpadat di halaman
//     (seri round 6: "dense broadsheet is illegible"); 9 headline dipersingkat
//     dgn membuang pengulangan label tempat (fakta sama). Cerita 31 -> 25.
// (b) DATE CHECK L5 + "20 NOV (not yet): COP31 closes · Akvan landfall"
//     (terverifikasi di v24) — menutup celah baca "19 Nov = masa depan"
//     (seri round 2 vs r3). (c) Grid #5 dek "landfall Fri." -> "red alert."
// (d) PERTAHANKAN 3 teks v24 (Summit/ICJ/COP31), DATE CHECK per tanggal,
//     chip, peta+pin, UTC strip; adegan scenes-ai/v24/ dipakai ulang tanpa
//     copy (sha map §5 sama dgn v24). Quantize hero03 q24 + #12 q12 DITOLAK
//     lagi (nilai kecil vs tie-break byte; headroom 7.098 B dibiarkan).
// Data news-v14.json (diff v13->v14 HANYA 6 field — gate §6);
// news-v13.json TIDAK disentuh (sha 26543964…).
// Gate baru v25: ekor 12px/4 baris (§6b) + DATE CHECK 20 NOV (§3c) +
// dek #5 red alert (§2g) + diff data (§6) + headline dipersingkat (§6b).
// (a) SILUET di atas detail: #04 kolom raksasa v2 (3 tiang saja, tanpa
// pedimen) + #12 chip raksasa (emas dominan) + hero #1 bendera AI (3 bendera
// besar, ganti code-drawn + figur/meja) + hero #3 koin+panah AI (ganti
// code-drawn bars+figur+koin); hero #2 GTA TERKUNCI; (b) resep tetap
// median 3x3 + quantize 12 SEMUA adegan (UnsharpMask DITOLAK: +90-100 KB);
// (c) #10 dahan 3 zaitun + #13 palu BESAR + #8 ledakan v2 + #09 panah v2
// dipertahankan dari v16 (8 adegan grid lain byte-identik v16).
// Final 299.764 B, headroom 7.436 B. Downscale adegan DILARANG (diukur
// +60.000 B — upscaling resvg menambah noise).
// (P2) chip status 13/13 + kotak VERDICT navy (3 baris terverifikasi,
// 9-6 dibuang) + MARKETS, legenda pin 2 kolom; (P3) DATE CHECK 5 baris
// (8 item + kalimat alasan + 2 item 20 NOV "not yet"), tail 12 item
// berlabel tempat font 12px pitch 15 (4 baris) + footer "13 DRAWN".
// Checks: determinism (PNG + JPG), size/dimensions, no truncation,
// masthead date, stat strip, region bar, heroes, grid adegan AI + chip,
// peta navy 300x78 (13 pin + 9 dot + legenda 2 kolom + VERDICT),
// timeline (820/834), DATE CHECK 5 baris, footer, kontras (teks + chip +
// VERDICT), story/continent, + gate v18 baru (hero#1/#3, kolom#04, chip#12,
// dahan/palu/lambung/std300).
// Usage: node verify-final-v25.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";

const sha = (buf) => createHash("sha256").update(buf).digest("hex");
let fails = 0;
const check = (label, ok, detail = "") => { console.log(`${label}: ${ok ? "PASS" : "FAIL"}${detail ? " — " + detail : ""}`); if (!ok) fails++; };

// 1. Determinism: render twice into /tmp, compare with the deliverable.
execSync("node generate-final-v25.mjs news-v14.json /home/hatch/workspace/.tmp-bundle/final25-a.png /home/hatch/workspace/.tmp-bundle/final25-a.svg", { stdio: "pipe" });
execSync("node generate-final-v25.mjs news-v14.json /home/hatch/workspace/.tmp-bundle/final25-b.png /home/hatch/workspace/.tmp-bundle/final25-b.svg", { stdio: "pipe" });
const a = readFileSync("/home/hatch/workspace/.tmp-bundle/final25-a.png"), b = readFileSync("/home/hatch/workspace/.tmp-bundle/final25-b.png");
const main = readFileSync("entry-final-v25.png");
const aj = readFileSync("/home/hatch/workspace/.tmp-bundle/final25-a.jpg"), bj = readFileSync("/home/hatch/workspace/.tmp-bundle/final25-b.jpg");
console.log(`determinism PNG: a==b ${sha(a) === sha(b)} | a==entry-final-v25 ${sha(a) === sha(main)}`);
console.log(`determinism JPG: a==b ${sha(aj) === sha(bj)}`);
check("determinism PNG byte-identik", sha(a) === sha(b) && sha(a) === sha(main));
check("determinism JPG byte-identik", sha(aj) === sha(bj));
console.log(`entry-final-v25.png sha256: ${sha(main)}`);
console.log(`entry-final-v25.jpg sha256: ${sha(readFileSync("entry-final-v25.jpg"))}`);
check("size PNG <= 1 MiB", main.length <= 1048576, `${main.length} B (${(main.length / 1024).toFixed(1)} KiB)`);
check("size PNG target <300 KB", main.length < 300 * 1024, `${main.length} B`);
console.log(`size JPG q88: ${readFileSync("entry-final-v25.jpg").length} B (format final = yang lebih kecil)`);

// 2. No truncation in the SVG.
const svg = readFileSync("entry-final-v25.svg", "utf8");
check('truncation "…" in SVG', !svg.includes("…"), svg.includes("…") ? "FOUND" : "none");

// 2b. Dek swipe REMOVED (v5 fix 1): no ACCENT polygon at 0.25 opacity.
const swipe = [...svg.matchAll(/<polygon[^>]*fill="#BC2F0E"[^>]*opacity="0.25"[^>]*>/g)];
check("dek highlighter swipe polygons", swipe.length === 0, `${swipe.length} (expected 0)`);

// 2c. Masthead v11: tanggal Didone 54px terpusat (rendered y=96) + dek merah miring (y=124).
const dateEl = [...svg.matchAll(/<text x="512" y="96" font-family="Playfair Display" font-size="54" font-weight="900"[^>]*>([^<]*)<\/text>/g)];
check("masthead tanggal Didone 54px", dateEl.length === 1, dateEl[0] ? `"${dateEl[0][1]}"` : "not found");
const dateW = dateEl[0] ? dateEl[0][1].length * 54 * 0.60 : 0;
check("lebar tanggal <= 928px", dateW <= 928, `${Math.round(dateW)}px`);
const dekEl = [...svg.matchAll(/<text x="512" y="124"[^>]*font-style="italic"[^>]*>([^<]*)<\/text>/g)];
check("dek merah miring", dekEl.length === 1);
check("dek menyebut ICJ (bukan GTA) sebagai #2", dekEl[0] ? dekEl[0][1].includes("A court rules on Myanmar") : false, dekEl[0] ? dekEl[0][1] : "");

// 2d. Stat strip v11: 6 kotak 148x48, angka 20px + caption 9px 2 baris.
// v18 (ref 18 Nov: angka hari itu cukup 1 baris kompak): 24->20px.
const statBoxes = [...svg.matchAll(/<rect x="(\d+)" y="(\d+)" width="148" height="48" rx="2" fill="none" stroke="#2E2118" stroke-width="1.5"\/>/g)];
check("stat boxes 148x48", statBoxes.length === 6, `${statBoxes.length} (expected 6)`);
const statNums = [...svg.matchAll(/<text x="(\d+)" y="(\d+)" font-family="Noto Sans, sans-serif" font-size="20" font-weight="800" fill="#BC2F0E"[^>]*>([^<]*)<\/text>/g)];
check("stat numbers 20px", statNums.length === 6, statNums.map((m) => m[3]).join(", "));
const statW = statNums.map((m) => ({ num: m[3], w: Math.round(m[3].length * 20 * 0.56) }));
check("stat numbers muat (lebar+12 <= 148)", statW.every((s) => s.w + 12 <= 148), statW.map((s) => `${s.num}=${s.w}px`).join(", "));
check("stat $120BN COP31 (bukan $12BN WIND)", svg.includes("$120BN") && !svg.includes("$12BN"), "");
// v24: stat COP31 dikoreksi — target $120bn DIHAPUS dari draf Kamis
// (Reuters 12:13 UTC); caption lama "at stake at COP31" SALAH ARAH.
check("stat COP31 v24: aid goal CUT from COP31 draft", svg.includes("aid goal CUT from") && svg.includes("COP31 draft"), "");
check("stat COP31 lama HILANG (at stake at COP31)", !svg.includes("at stake at COP31"));
const statCaps = [...svg.matchAll(/<text x="(\d+)" y="(\d+)" font-family="Noto Sans, sans-serif" font-size="9" font-weight="400"[^>]*>([^<]*)<\/text>/g)];
check("stat captions 9px (2 baris x 6)", statCaps.length === 12, `${statCaps.length} (expected 12)`);
check("caption superlatif: largest/record/farthest", ["the largest IPO on record", "a record game launch", "farthest human object"].every((s) => svg.includes(s)));

// 2e. Region bar v11: 7 segmen + WORLD 1, baseline rendered 210.
const regionNames = ["NORTH AMERICA", "SOUTH AMERICA", "EUROPE", "AFRICA", "ASIA", "OCEANIA", "WORLD"];
check("region bar 7 segmen", regionNames.every((n) => svg.includes(`>${n}<`)), regionNames.filter((n) => !svg.includes(`>${n}<`)).join(",") || "semua ada");
check("region bar WORLD 1", svg.includes(">WORLD<") && svg.includes(">1<"));

// 2f. Heroes v11: 3 kartu (ilustrasi 302x80 + frame + badge 18x18), headline 20px, dek 12px 2 baris.
const heroFrames = [...svg.matchAll(/<rect x="(\d+)" y="(\d+)" width="302" height="80" fill="none" stroke="#2E2118" stroke-width="2"\/>/g)];
check("hero frames 302x80", heroFrames.length === 3, `${heroFrames.length} (expected 3)`);
const heroArt = [...svg.matchAll(/<clipPath id="heroArtClip">/g)];
check("hero vaporwave crop (clipPath heroArtClip)", heroArt.length === 1);
const heroAI = [...svg.matchAll(/<image x="(\d+)" y="([\d.]+)" width="302" height="80" href="data:image\/png;base64,/g)];
// v18: hero #1/#3 code-drawn DIGANTI adegan AI (2x <image> 302x80 data-URI);
// bg lama #DCE7E0 (summit) + #F2E3C0 (chart) HARUS hilang (0).
const heroFlagsOld = [...svg.matchAll(/<rect x="(\d+)" y="(\d+)" width="302" height="80" fill="#DCE7E0"\/>/g)];
const heroChartOld = [...svg.matchAll(/<rect x="(\d+)" y="(\d+)" width="302" height="80" fill="#F2E3C0"\/>/g)];
check("hero AI #1/#3 (2x <image> 302x80 data-URI PNG)", heroAI.length === 2, `${heroAI.length} (expected 2)`);
check("hero code-drawn lama HILANG (bg #DCE7E0 + #F2E3C0 = 0)", heroFlagsOld.length === 0 && heroChartOld.length === 0, `summit ${heroFlagsOld.length} + chart ${heroChartOld.length}`);
const heroHeads = [...svg.matchAll(/<text x="(\d+)" y="([\d.]+)" font-family="Noto Sans, sans-serif" font-size="20" font-weight="700"[^>]*>([^<]*)<\/text>/g)];
check("hero headline 20px (<=2 baris/hero)", heroHeads.length >= 3 && heroHeads.length <= 6, `${heroHeads.length} baris`);
// v21 (koreksi Gibran 23:18 WIB — bendera Cina kebaca Vietnam): tambal
// rect merah 24x24 + 5 bintang emas code-drawn di atas bendera AI.
// GEN rect(84, 243) -> rendered y=227; bintang GEN y -> rendered -16.
const flagPatch = [...svg.matchAll(/<rect x="84" y="227" width="24" height="24" fill="#C6131B"\/>/g)];
check("bendera Cina: rect tambal merah 24x24 di SVG", flagPatch.length === 1, `${flagPatch.length} (expected 1)`);
const flagStars = [...svg.matchAll(/<polygon points="[^"]*" fill="#DD9560"\/>/g)];
check("bendera Cina: 5 bintang emas di SVG (1 besar + 4 kecil)", flagStars.length === 5, `${flagStars.length} (expected 5)`);
const heroDeks = [...svg.matchAll(/<text x="(\d+)" y="([\d.]+)" font-family="Noto Sans, sans-serif" font-size="12" font-weight="400" fill="#6B5844"[^>]*>([^<]*)<\/text>/g)].filter((m) => +m[2] >= 380 && +m[2] <= 410);
check("hero dek 12px 2 baris/hero", heroDeks.length === 6, `${heroDeks.length} (expected 6)`);
check("hero dek ada angka spesifik (15.9m / $79.99 / $1.5tn)", svg.includes("15.9m") && svg.includes("$79.99") && svg.includes("$1.5tn"));
// v24: hero #1 dek dikoreksi — "No deals announced" SALAH (Xinhua+Kremlin:
// summit merilis "Declaration Towards Peace" 4 poin).
check("hero #1 dek v24: Declaration Towards Peace", svg.includes("Declaration Towards Peace") && svg.includes("nuclear-risk dialogue") && svg.includes("UN reform"));
check("hero #1 dek lama HILANG (No deals announced)", !svg.includes("No deals announced"));

// 2g. Grid v13: 10 ADEGAN FULL-WIDTH 179x70 (langit gradien + sumber
// cahaya + 3 lapis + bayangan keras + stipple) + headline 13px + dek 10px
// + kicker 10px + chip status.
const aiImgs = [...svg.matchAll(/<image x="(\d+)" y="(\d+)" width="179" height="70" href="data:image\/png;base64,/g)];
check("adegan grid AI: 10 <image> 179x70 (data-URI PNG)", aiImgs.length === 10, `${aiImgs.length} (expected 10)`);
const aiXs = aiImgs.map((m) => +m[1]);
check("adegan AI di 5 kolom grid (x=48..796, 2 baris)", JSON.stringify(aiXs) === JSON.stringify([48, 235, 422, 609, 796, 48, 235, 422, 609, 796]), aiXs.join(","));
const codeSkies = [...svg.matchAll(/fill="url\(#sky\d+\)"/g)];
check("langit gradien code-drawn hilang (0)", codeSkies.length === 0, `${codeSkies.length} (expected 0)`);
const codeSceneDefs = [...svg.matchAll(/<linearGradient id="sky\d+"/g)];
check("definisi gradien adegan code-drawn hilang (0)", codeSceneDefs.length === 0, `${codeSceneDefs.length} (expected 0)`);
const oldScaled = [...svg.matchAll(/scale\(1\.4706\)/g)];
check("simbol lama scale 1.4706 hilang", oldScaled.length === 0, `${oldScaled.length} (expected 0)`);
const chipReported = [...svg.matchAll(/>REPORTED</g)];
const chipForecast = [...svg.matchAll(/>FORECAST</g)];
const chipClaim = [...svg.matchAll(/>CLAIM</g)];
check("chip status: REPORTED 10 / FORECAST 1 / CLAIM 2", chipReported.length === 10 && chipForecast.length === 1 && chipClaim.length === 2, `R${chipReported.length} F${chipForecast.length} C${chipClaim.length} (expected R10 F1 C2)`);
const chipPills = [...svg.matchAll(/<rect[^>]*height="11" rx="5" fill="#(1B5E20|0D47A1|BF360C)"[^>]*>/g)];
check("chip grid 10 (pill 11px)", chipPills.length === 10, `${chipPills.length} (expected 10)`);
const heroPills = [...svg.matchAll(/<rect[^>]*height="13" rx="6" fill="#(1B5E20|0D47A1|BF360C)"[^>]*>/g)];
check("chip hero 3 (pill 13px)", heroPills.length === 3, `${heroPills.length} (expected 3)`);
const frames179 = [...svg.matchAll(/<rect[^>]*width="179" height="70" fill="none" stroke="#2E2118" stroke-width="2"[^>]*>/g)];
check("frame INK 2px grid 179x70 full-width", frames179.length === 10, `${frames179.length} (expected 10)`);
const badges = [...svg.matchAll(/<rect[^>]*width="18" height="18" fill="#BC2F0E"[^>]*>/g)];
check("badge nomor 18x18", badges.length === 13, `${badges.length} (expected 13 = 10 grid + 3 hero)`);
const gridHeads = [...svg.matchAll(/<text x="(\d+)" y="([\d.]+)" font-family="Noto Sans, sans-serif" font-size="13" font-weight="400"[^>]*>([^<]*)<\/text>/g)].filter((m) => +m[2] >= 500 && +m[2] <= 680);
check("grid headline 13px (10-20 baris)", gridHeads.length >= 10 && gridHeads.length <= 20, `${gridHeads.length} baris`);
const gridDeks = [...svg.matchAll(/<text x="(\d+)" y="([\d.]+)" font-family="Noto Sans, sans-serif" font-size="10" font-weight="400" fill="#6B5844"[^>]*>([^<]*)<\/text>/g)].filter((m) => +m[2] >= 530 && +m[2] <= 690);
check("grid dek 10px (10 kartu)", gridDeks.length === 10, `${gridDeks.length} (expected 10)`);
const gridKick = [...svg.matchAll(/<text x="(\d+)" y="([\d.]+)" font-family="Noto Sans, sans-serif" font-size="10" font-weight="800" fill="#BC2F0E"[^>]*>([^<]*)<\/text>/g)].filter((m) => +m[2] >= 540 && +m[2] <= 700);
check("grid kicker 10px ACCENT (10 kartu)", gridKick.length === 10, `${gridKick.length} (expected 10)`);
// v24: grid #4 ICJ dikoreksi — headline + dek lama vague/basi (Reuters/BBC/AP:
// 9-6, pertama kali negara bersalah genosida, reparasi diperintahkan).
check("grid #4 v24: World Court: Myanmar committed genocide (2 baris wrap)", svg.includes("World Court: Myanmar") && svg.includes("committed genocide"));
check("grid #4 v24 dek: 9–6; first state found guilty.", svg.includes("9–6; first state found guilty."));
check("grid #4 lama HILANG (ICJ delivers Rohingya ruling)", !svg.includes("ICJ delivers Rohingya ruling") && !svg.includes("The court rules on Myanmar"));
// v25 (seri round 2 — juri mengutip "Cyclone Akvan" sbg peristiwa masa
// depan): dek #5 "landfall Fri." DIHAPUS — "red alert" 19-20 Nov terverifikasi.
check("grid #5 v25 dek: red alert (bukan landfall Fri.)", svg.includes("200,000 evacuated; red alert.") && !svg.includes("landfall Fri."));
// v21 (koreksi Gibran 23:18 WIB — teks mepet): celah teks-vs-teks grid
// diukur dari kotak sebenarnya (cap 0.72em; descender 0.25em bila teks
// mengandung g/j/p/q/y, kalau tidak 0.02em). v20: h1->h2 1.4px,
// h2->dek 1.4px, dek->kicker 0.3px. Kini pitch 15 / dek +110 / kicker +122.
const hasDesc = (t) => /[gjpqy]/.test(t);
const boxTop = (y, size) => y - 0.72 * size;
const boxBot = (y, size, t) => y + (hasDesc(t) ? 0.25 : 0.02) * size;
const gridColsX = [48, 235, 422, 609, 796];
const gridGaps = { h1h2: [], h2dek: [], dekkick: [] };
for (const cx of gridColsX) {
  for (const rowY of [522, 646]) { // baseline baris-1 headline per baris grid
    const heads = gridHeads.filter((m) => +m[1] === cx && Math.abs(+m[2] - rowY) < 20).sort((a, b) => +a[2] - +b[2]);
    const dek = gridDeks.find((m) => +m[1] === cx && Math.abs(+m[2] - (rowY + 28)) < 20);
    const kick = gridKick.find((m) => +m[1] === cx && Math.abs(+m[2] - (rowY + 40)) < 20);
    if (heads.length === 2) gridGaps.h1h2.push(boxTop(+heads[1][2], 13) - boxBot(+heads[0][2], 13, heads[0][3]));
    if (heads.length >= 1 && dek) gridGaps.h2dek.push(boxTop(+dek[2], 10) - boxBot(+heads[heads.length - 1][2], 13, heads[heads.length - 1][3]));
    if (dek && kick) gridGaps.dekkick.push(boxTop(+kick[2], 10) - boxBot(+dek[2], 10, dek[3]));
  }
}
check("grid celah h1->h2 >= 2.0px (v20: 1.4px)", gridGaps.h1h2.length > 0 && Math.min(...gridGaps.h1h2) >= 2.0, `min ${Math.min(...gridGaps.h1h2).toFixed(2)}px (n=${gridGaps.h1h2.length})`);
check("grid celah h2->dek >= 2.0px (v20: 1.4px)", gridGaps.h2dek.length === 10 && Math.min(...gridGaps.h2dek) >= 2.0, `min ${Math.min(...gridGaps.h2dek).toFixed(2)}px (n=${gridGaps.h2dek.length})`);
check("grid celah dek->kicker >= 2.0px (v20: 0.3px)", gridGaps.dekkick.length === 10 && Math.min(...gridGaps.dekkick) >= 2.0, `min ${Math.min(...gridGaps.dekkick).toFixed(2)}px (n=${gridGaps.dekkick.length})`);

// 2h. Gate v11 BIRU: tidak ada lagi #A8C4D4 di halaman; kartu #4 teal,
// kartu #12 krem netral (kotak 179x70 — posisi rendered).
check("biru highlight #A8C4D4 hilang (v11)", !svg.includes("#A8C4D4"));
const card4teal = [...svg.matchAll(/<rect x="48" y="440" width="179" height="70" fill="#5C8A74"\/>/g)];
check("kartu #4 (ICJ) kotak teal", card4teal.length === 1, `${card4teal.length} (expected 1)`);
const card12cream = [...svg.matchAll(/<rect x="609" y="564" width="179" height="70" fill="#EDE2CC"\/>/g)];
check("kartu #12 (AI) kotak krem", card12cream.length === 1, `${card12cream.length} (expected 1)`);

// 2h2. Gate v15 AI: bendera #11 KODE v14 HILANG SEPENUHNYA (tidak ada lagi
// rect Kanada 477/483/501 + China 510 + diamond maple 492,572 di SVG) —
// bendera kini BAGIAN dari gambar AI scene11 (dicek via PIL di §5: band
// krem Kanada + blok merah China di kartu #11). Adegan code-drawn v13
// (zaitun/merpati/palu/dokumen/retakan/kolom/gradien langit) tetap HILANG.
check("bendera #11 kode v14 HILANG (Kanada 477/483/501)", !svg.includes('<rect x="477" y="568" width="6" height="22" fill="#BC2F0E"/>') && !svg.includes('<rect x="483" y="568" width="18" height="22" fill="#FFFFFF"/>') && !svg.includes('<rect x="501" y="568" width="6" height="22" fill="#BC2F0E"/>'));
check("bendera #11 kode v14 HILANG (China 510 + maple diamond)", !svg.includes('<rect x="510" y="568" width="30" height="22" fill="#BC2F0E"/>') && !svg.includes('<polygon points="492,572 496,579 492,586 488,579" fill="#BC2F0E"/>'));
check("adegan code-drawn v13 hilang", !svg.includes('r="2.6" fill="#5C7A3A"') && !svg.includes('r="4.5" fill="#FFFFFF" stroke="#2E2118"') && !svg.includes('transform="rotate(-35 ') && !svg.includes('<linearGradient id="sky'));
// 2h3. Standar v18: file adegan AI ada (10 grid + 2 hero, scenes-ai/v24/).
// v25: TIDAK ADA adegan baru — file v24 dipakai ulang tanpa copy (sha §5
// sama dgn v24). Ukuran terukur v24 grid 2.109-8.052 B (q8..q32 per adegan,
// lihat STATUS v23) — KECUALI scene13 = 2.497 B (re-crop C1 v24, v23: 3.308 B);
// hero01 5.354 B (q20), hero03 6.309 B (q20).
// #11 v18: bendera FULL AI, re-crop 179:70 (palet MEDIANCUT baru — krem
// (254,229,199), merah (154,83,59), BUKAN warna v15).
// Ambang >1.200 B (placeholder 1 warna penuh hanya ~0,3 KB).
const aiFiles = ["04", "05", "06", "07", "08", "09", "10", "11", "12", "13"].map((nn) => `scenes-ai/v24/scene${nn}.png`);
const aiSizes = aiFiles.map((f) => { try { return readFileSync(f).length; } catch { return 0; } });
check("file adegan AI 10 (scenes-ai/v24/sceneNN.png, >1,2 KB)", aiSizes.every((s) => s > 1200), aiSizes.join(","));
const heroFiles = ["hero01", "hero03"].map((nn) => `scenes-ai/v24/${nn}.png`);
const heroSizes = heroFiles.map((f) => { try { return readFileSync(f).length; } catch { return 0; } });
check("file hero AI 2 (scenes-ai/v24/heroNN.png, >1,2 KB)", heroSizes.every((s) => s > 1200), heroSizes.join(","));

// 3. Peta band NAVY v12: kotak x 48..348, GEN 722..800 (rendered 706..784).
// Pin = lingkaran merah r=8 stroke PUTIH + angka putih 10px DI DALAM
// lingkaran (nomor y = pin cy + 3.5, bukan 16px di atas — bug v8);
// dot brief = abu terang r=3 (9, termasuk Alaska).
const navyBg = [...svg.matchAll(/<rect x="48" y="706" width="300" height="78" fill="#24344A"\/>/g)];
check("peta navy bg #24344A 300x78", navyBg.length === 1, `${navyBg.length} (expected 1)`);
const pins = [...svg.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="8" fill="#BC2F0E" stroke="#FFFFFF" stroke-width="1.5"\/>/g)];
check("pin merah r=8 stroke putih", pins.length === 13, `${pins.length} (expected 13)`);
const pinNums = [...svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*font-size="10" font-weight="800" fill="#FFFFFF"[^>]*>([^<]*)<\/text>/g)]
  .filter((m) => +m[1] >= 48 && +m[1] <= 348 && +m[2] >= 706 && +m[2] <= 784);
check("angka pin di peta", pinNums.length === 13, `${pinNums.map((m) => m[3]).join(",")} (expected 13: 1..13)`);
const pinInCircle = pinNums.every((m) => pins.some((p) => Math.abs(+p[1] - +m[1]) < 2 && Math.abs((+p[2] + 3.5) - +m[2]) < 1.5));
check("angka pin DI DALAM lingkaran (y = cy+3.5)", pinInCircle, pinInCircle ? "" : "ada nomor melayang (bug OY)");
const pinClipped = pins.filter((m) => {
  const cx = +m[1], cy = +m[2];
  return cx - 9.5 < 48 || cx + 9.5 > 348 || cy - 9.5 < 706 || cy + 9.5 > 784;
});
check("pin terpotong tepi peta", pinClipped.length === 0, pinClipped.length ? JSON.stringify(pinClipped) : "0 (13/13 utuh)");
// v11: klaster US (pin 2/3/11/12) mengipas 2D, bukan tangga vertikal.
// Pin US = 4 pin dengan cx 100..170: sebar-x >= 24px (v10: 131..136 = 5px).
const usPins = pins.filter((m) => +m[1] >= 100 && +m[1] <= 170);
const usX = usPins.map((m) => +m[1]), usY = usPins.map((m) => +m[2]);
check("pin US 4 (fan-out)", usPins.length === 4, `${usPins.length} (expected 4)`);
check("pin US sebar-x >= 24px (v10: 5px)", usPins.length === 4 && Math.max(...usX) - Math.min(...usX) >= 24, usPins.length === 4 ? `${Math.min(...usX)}..${Math.max(...usX)}` : "");
check("pin US sebar-y >= 20px", usPins.length === 4 && Math.max(...usY) - Math.min(...usY) >= 20, usPins.length === 4 ? `${Math.min(...usY)}..${Math.max(...usY)}` : "");
const greyDots = [...svg.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="3" fill="#C9BFA8"/g)];
check("dot abu terang r=3 (v25: 17 + 3 baru = 20)", greyDots.length === 20, `${greyDots.length} (expected 20 = 17 lama + 3 baru)`);
// v21: 9 dot baru di posisi hasil pencarian placer (dot-dot >= 7px,
// dot-pin >= 12px, tanpa leader line). v25: 6 dot India DICABUT bersama
// brief #23-28 — tersisa 3 (TOKYO-2, SYDNEY-2, São Paulo).
const newDotsExpected = [[321, 731], [331, 762], [159, 764]];
const newDotsFound = newDotsExpected.filter(([ex, ey]) => greyDots.some((m) => Math.abs(+m[1] - ex) < 1 && Math.abs(+m[2] - ey) < 1));
check("dot baru v21 (v25: 3 posisi, India x6 dicabut)", newDotsFound.length === 3, `${newDotsFound.length}/3 ditemukan`);
const newDotsPts = newDotsExpected.map(([ex, ey]) => [ex, ey]);
const minNewNew = Math.min(...newDotsPts.flatMap((a, i) => newDotsPts.slice(i + 1).map((b) => Math.hypot(a[0] - b[0], a[1] - b[1]))));
check("dot baru: jarak dot-dot >= 7px", minNewNew >= 7, `min ${minNewNew.toFixed(1)}px`);
const minNewPin = Math.min(...newDotsPts.flatMap((a) => pins.map((p) => Math.hypot(a[0] - +p[1], a[1] - +p[2]))));
check("dot baru: jarak dot-pin >= 12px", minNewPin >= 12, `min ${minNewPin.toFixed(1)}px`);
const legendNums = [...svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*font-size="9" font-weight="800" fill="#FFFFFF"[^>]*>([^<]*)<\/text>/g)]
  .filter((m) => +m[1] >= 364 && +m[2] >= 700 && +m[2] <= 778);
check("legenda pin 13 label (2 kolom)", legendNums.length === 13, `${legendNums.map((m) => m[3]).join(",")} (expected 1..13)`);
const legendOrder = legendNums.map((m) => +m[3]);
check("legenda urut 1..13 per kolom", JSON.stringify(legendOrder) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), legendOrder.join(","));
const legendBadges = [...svg.matchAll(/<rect[^>]*width="12" height="12" fill="#BC2F0E"[^>]*>/g)];
check("legenda badge 12x12 (13)", legendBadges.length === 13, `${legendBadges.length} (expected 13)`);
check("map caption lengkap (v25: 12 briefs)", svg.includes("Red numbers mark stories 1–13; grey dots mark the 12 briefs below. Positions are approximate."));
// 3a. Kotak VERDICT navy (P2): x 706..976, GEN 722..800 (rendered 706..784).
const verdictBox = [...svg.matchAll(/<rect x="706" y="706" width="270" height="78" fill="#24344A"\/>/g)];
check("kotak VERDICT navy 270x78", verdictBox.length === 1, `${verdictBox.length} (expected 1)`);
check("VERDICT judul + jam", svg.includes("THE VERDICT — THE HAGUE · 10:00"));
check("VERDICT baris 1 v24 (headline #4 baru)", svg.includes("ICJ: Myanmar guilty of genocide."));
check("VERDICT baris 2 terverifikasi (stat FLED 730K)", svg.includes("730,000 Rohingya fled to Bangladesh."));
check("VERDICT baris 3 v24 (footer2 baru)", svg.includes("9–6; reparations ordered."));
check("VERDICT 9–6 HADIR (terverifikasi v24, dulu dibuang v13)", svg.includes("9–6") && svg.includes("reparations ordered") && svg.includes("ICJ: Myanmar guilty of genocide."));
check("VERDICT lama HILANG (Full text not yet public)", !svg.includes("Full text not yet public.") && !svg.includes("ICJ rules on Myanmar today."));
check("MARKETS di VERDICT", svg.includes("MARKETS") && svg.includes("$83 IPO") && svg.includes("4.9% jobless"));

// 3b. Timeline v12: 5 slot (time + label), rendered y=818; spasi label
// MORNING/EVENING diukur PIL (56.5px / 49.6px), offset +26 -> celah >=12px;
// v11: label diberi word-spacing +1.5px (feedback oranye).
const tlTimes = [...svg.matchAll(/<text x="(\d+)" y="819" font-family="Noto Sans, sans-serif" font-size="11" font-weight="800" fill="#BC2F0E"[^>]*>([^<]*)<\/text>/g)];
check("timeline times", tlTimes.length === 5, tlTimes.map((m) => m[2]).join(" | "));
const tlLabels = [...svg.matchAll(/<text x="(\d+)" y="819" font-family="Noto Sans, sans-serif" font-size="11" font-weight="400"[^>]*>([^<]*)<\/text>/g)];
check("timeline labels", tlLabels.length === 5, tlLabels.map((m) => m[2]).join(" | "));
const tlWordSpacing = [...svg.matchAll(/<text x="(\d+)" y="819" font-family="Noto Sans, sans-serif" font-size="11" font-weight="400"[^>]*word-spacing="1.5"[^>]*>([^<]*)<\/text>/g)];
check('timeline labels word-spacing="1.5" (v11)', tlWordSpacing.length === 5, `${tlWordSpacing.length} (expected 5)`);
const realW = { "00:00": 28.3, "MORNING": 56.5, "10:00": 28.3, "14:30": 28.3, "EVENING": 49.6 };
const tlGaps = tlTimes.map((t, i) => {
  const labX = +tlLabels[i][1], timeX = +t[1];
  return labX - (timeX + realW[t[2]]);
});
check("timeline label gap (lebar PIL) >= 10px", tlGaps.every((g) => g >= 10), tlGaps.map((g) => g.toFixed(1)).join(" / "));
const tlNextGap = tlTimes.slice(1).map((t, i) => +t[1] - (+tlLabels[i][1] + tlLabels[i][2].length * 5.5 + 1.5 * (tlLabels[i][2].split(/\s+/).length - 1)));
check("timeline label tidak menabrak slot berikut", tlNextGap.every((g) => g >= 5), tlNextGap.map((g) => g.toFixed(1)).join(" / "));

// 3b2. Gate v12 HIJAU: celah kicker baris-2 -> judul peta dan
// timeline -> judul brief (dari koordinat SVG; cap 11px / descender 2px).
const mapTitle = [...svg.matchAll(/<text x="48" y="([\d.]+)"[^>]*font-size="15" font-weight="800" fill="#BC2F0E"[^>]*>WHERE IT HAPPENED<\/text>/g)];
const row2KickY = Math.max(...gridKick.filter((m) => +m[2] > 600).map((m) => +m[2]));
// v21: kotak SEBENARNYA (bukan konservatif): kicker 10px caps tanpa
// descender (bawah = y+0.2), judul 15px caps (atas = y-10.8).
// Kicker r2 di +122 (bukan +118) demi celah dek->kicker 2.3px;
// celah ke judul peta jadi 3.0px (v20: 5px konservatif / 7.0px sebenarnya).
const kickerMapGap = mapTitle[0] ? (+mapTitle[0][1] - 10.8) - (row2KickY + 0.2) : -99;
check("celah kicker r2 -> judul peta >= 2.5px (kotak sebenarnya)", kickerMapGap >= 2.5, `${kickerMapGap.toFixed(1)}px (v20: 7.0px sebenarnya, 5px konservatif)`);
const briefTitle = [...svg.matchAll(/<text x="48" y="([\d.]+)"[^>]*font-size="15" font-weight="800" fill="#BC2F0E"[^>]*>ALSO ON THURSDAY 19 NOVEMBER<\/text>/g)];
const tlBriefGap = briefTitle[0] ? (+briefTitle[0][1] - 11) - (819 + 2) : -99;
check("celah timeline -> judul brief >= 5px", tlBriefGap >= 5, `${tlBriefGap}px (v9 ~2px)`);

// 3b3. Gate v12 CAPTION: caption peta (baseline SVG y=790) -> header
// timeline (y=804); celah ≈ 3px (cap 0.72em, tanpa descender) — PIL §5.
const mapCaption = [...svg.matchAll(/<text x="48" y="791" font-family="Noto Sans, sans-serif" font-size="11" font-weight="400" fill="#6B5844"[^>]*>Red numbers mark stories 1–13; grey dots mark the 12 briefs below\. Positions are approximate\.<\/text>/g)];
check("caption peta y=791 (v21: +1px, header timeline y=821)", mapCaption.length === 1, `caption ${mapCaption.length} (expected 1)`);

// 3c. DATE CHECK v12: box 928x66 (rendered y=912), 5 baris, 8 pengecualian + kalimat alasan.
const dcBox = [...svg.matchAll(/<rect x="48" y="912" width="928" height="66" fill="#BC2F0E"\/>/g)];
check("DATE CHECK box merah 928x66", dcBox.length === 1, `${dcBox.length} (expected 1)`);
const dcTexts = [...svg.matchAll(/<text x="60" y="(923|935|947|959|971)"[^>]*fill="#FFFFFF"[^>]*>([^<]*)<\/text>/g)];
check("DATE CHECK lines putih (5)", dcTexts.length === 5, `${dcTexts.length} (expected 5)`);
check("DATE CHECK kalimat alasan", svg.includes("each was first reported before Thursday, so none is counted among today"));
const excl = ["€45bn Ukraine loan", "Voyager 1", "10:16 GMT", "Iranian drone", "251–11", "Pew", "COP31 draft", "Xi greets Trump", "GTA VI pre-orders (banked)"];
check("DATE CHECK 8 pengecualian bernama", excl.every((s) => svg.includes(s)), excl.filter((s) => !svg.includes(s)).join(",") || "semua ada");
// v25: DATE CHECK + item 20 NOV ("not yet") — dulu TIDAK MUAT di v24
// (ablasi +2.210 B); kini muat karena ekor membebaskan 6.859 B.
check("DATE CHECK dikelompokkan per tanggal (18 NOV: / 16 NOV: / 20 NOV not yet)", svg.includes("18 NOV:") && svg.includes("16 NOV:") && svg.includes("20 NOV (not yet):"));
check("DATE CHECK 20 NOV (not yet): COP31 closes · Akvan landfall", svg.includes("20 NOV (not yet): COP31 closes") && svg.includes("Akvan landfall."));
// v21: DATE CHECK teks 11->10.5px (pitch tetap 12) — celah seragam ~1.8px.
const dcSizes = [...svg.matchAll(/<text x="60" y="(923|935|947|959|971)" font-family="Noto Sans, sans-serif" font-size="10.5"[^>]*fill="#FFFFFF"[^>]*>([^<]*)<\/text>/g)];
check("DATE CHECK teks 10.5px (5 baris, v21)", dcSizes.length === 5, `${dcSizes.length} (expected 5)`);
const dcGaps = dcSizes.slice(1).map((m, i) => boxTop(+m[1], 10.5) - boxBot(+dcSizes[i][1], 10.5, dcSizes[i][2]));
check("DATE CHECK celah antar-baris >= 1.5px (v20: 1.3px)", dcGaps.length === 4 && Math.min(...dcGaps) >= 1.5, `min ${Math.min(...dcGaps).toFixed(2)}px (${dcGaps.map((g) => g.toFixed(2)).join(" / ")})`);
// v21 (koreksi Gibran 23:18 WIB — footer mepet): rule 998->996, sumber
// 1008->1007, HOW SURE 1019->1020. v20: sumber nyaris menempel rule
// (0.08px) dan sumber->HOW SURE 0.3px.
const footRule = [...svg.matchAll(/<rect x="48" y="980" width="928" height="2" fill="#BC2F0E"\/>/g)];
check("footer rule y=980 (v21: 998->996 GEN)", footRule.length === 1, `${footRule.length} (expected 1)`);
const footSrc = [...svg.matchAll(/<text x="48" y="991" font-family="Noto Sans, sans-serif" font-size="11" font-weight="400" fill="#6B5844"[^>]*>([^<]*)<\/text>/g)];
const footSure = [...svg.matchAll(/<text x="48" y="1004" font-family="Noto Sans, sans-serif" font-size="11" font-weight="400" fill="#6B5844"[^>]*>([^<]*)<\/text>/g)];
check("footer sumber y=991 (v21: 1008->1007 GEN)", footSrc.length === 1, footSrc[0] ? `"${footSrc[0][1].slice(0, 40)}..."` : "not found");
check("footer HOW SURE y=1004 (v21: 1019->1020 GEN)", footSure.length === 1, footSure[0] ? `"${footSure[0][1].slice(0, 40)}..."` : "not found");
if (footSrc.length === 1 && footSure.length === 1) {
  const ruleSrcGap = boxTop(991, 11) - (980 + 2);
  const srcSureGap = boxTop(1004, 11) - boxBot(991, 11, footSrc[0][1]);
  check("footer celah rule->sumber >= 1.0px (v20: 0.08px)", ruleSrcGap >= 1.0, `${ruleSrcGap.toFixed(2)}px`);
  check("footer celah sumber->HOW SURE >= 2.0px (v20: 0.3px)", srcSureGap >= 2.0, `${srcSureGap.toFixed(2)}px`);
}
// v21: legenda "Horn troops" (baris terakhir, y=778) -> caption peta
// (y=791): 1.33px -> 2.33px (caption +1px).
const legendLabels = [...svg.matchAll(/<text x="(\d+)" y="([\d.]+)" font-family="Noto Sans, sans-serif" font-size="11" font-weight="400" fill="#2E2118"[^>]*>([^<]*)<\/text>/g)]
  .filter((m) => +m[1] >= 380 && +m[1] <= 600 && +m[2] >= 700 && +m[2] <= 790);
const lastLegend = legendLabels.reduce((a, m) => (+m[2] > +a[2] ? m : a), legendLabels[0]);
const legendCapGap = boxTop(791, 11) - boxBot(+lastLegend[2], 11, lastLegend[3]);
check('legenda -> caption peta >= 2.0px (v20: 1.3px)', legendCapGap >= 2.0, `${legendCapGap.toFixed(2)}px ("${lastLegend[3]}" y=${lastLegend[2]})`);
check('footer "Original drawings"', svg.includes("Original drawings"));
check('footer "13 DRAWN" (3 hero + 10 grid)', svg.includes("13 DRAWN"));
const sources = ["Reuters", "AP", "AFP", "BBC", "The Hindu", "IMD", "Bloomberg", "NASA", "Pew", "ICJ"];
check("footer sumber (10 media)", sources.every((s) => svg.includes(s)), sources.filter((s) => !svg.includes(s)).join(",") || "10/10");

// 4. Contrast (WCAG from hex — flat colors, exact).
function lum(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = c.map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}
function cx(fg, bg) { const x = lum(fg), y = lum(bg); const [hi, lo] = x > y ? [x, y] : [y, x]; return (hi + 0.05) / (lo + 0.05); }
const PAPER = "#F2E8D5", INK = "#2E2118", MUTED = "#6B5844", ACCENT = "#BC2F0E";
const NAVY = "#24344A", TAN = "#D9B98A", TAN2 = "#C9A86A", TAN3 = "#E3C99A", NAVYDOT = "#C9BFA8";
console.log(`peta navy: tan/navy ${cx(TAN, NAVY).toFixed(2)}:1 | tan2/navy ${cx(TAN2, NAVY).toFixed(2)}:1 | tan3/navy ${cx(TAN3, NAVY).toFixed(2)}:1 | dot/navy ${cx(NAVYDOT, NAVY).toFixed(2)}:1 (target >=3:1 non-teks)`);
console.log(`teks: INK/paper ${cx(INK, PAPER).toFixed(2)} | MUTED/paper ${cx(MUTED, PAPER).toFixed(2)} | ACCENT/paper ${cx(ACCENT, PAPER).toFixed(2)} | white/ACCENT ${cx("#FFFFFF", ACCENT).toFixed(2)} (target >=4.5:1)`);
check("kontras peta navy >= 3:1", cx(TAN, NAVY) >= 3 && cx(TAN2, NAVY) >= 3 && cx(NAVYDOT, NAVY) >= 3);
check("kontras teks >= 4.5:1", cx(INK, PAPER) >= 4.5 && cx(MUTED, PAPER) >= 4.5 && cx(ACCENT, PAPER) >= 4.5 && cx("#FFFFFF", ACCENT) >= 4.5);
console.log(`v11 recolor: krem/teal ${cx("#F2E8D5", "#5C8A74").toFixed(2)}:1 | navy/krem ${cx("#2E3A4A", "#EDE2CC").toFixed(2)}:1 (simbol, target >=3:1)`);
check("kontras simbol recolor >= 3:1", cx("#F2E8D5", "#5C8A74") >= 3 && cx("#2E3A4A", "#EDE2CC") >= 3);
console.log(`chip status putih: REPORTED #1B5E20 ${cx("#FFFFFF", "#1B5E20").toFixed(2)}:1 | FORECAST #0D47A1 ${cx("#FFFFFF", "#0D47A1").toFixed(2)}:1 | CLAIM #BF360C ${cx("#FFFFFF", "#BF360C").toFixed(2)}:1 | VERDICT putih/navy ${cx("#FFFFFF", NAVY).toFixed(2)}:1 (target >=4.5:1)`);
check("kontras chip status + VERDICT >= 4.5:1", cx("#FFFFFF", "#1B5E20") >= 4.5 && cx("#FFFFFF", "#0D47A1") >= 4.5 && cx("#FFFFFF", "#BF360C") >= 4.5 && cx("#FFFFFF", NAVY) >= 4.5);

// 5. Masthead date contrast + hero GTA crop + DATE CHECK box + adegan grid, measured with PIL.
writeFileSync("/home/hatch/workspace/.tmp-bundle/verify-final25.py", `
from PIL import Image
import numpy as np
fin = np.asarray(Image.open('entry-final-v25.png').convert('RGB')).astype(float)
def lum(a):
    c = a/255.0
    lin = np.where(c<=0.04045, c/12.92, ((c+0.055)/1.055)**2.4)
    return 0.2126*lin[:,:,0]+0.7152*lin[:,:,1]+0.0722*lin[:,:,2]
# Masthead date (rendered y ~57..96, x ~58..966): INK on PAPER.
reg = fin[57:97, 58:966]
L = lum(reg)
Ls = np.sort(L.flatten())
print(f"masthead date region: p5 lum {Ls[int(len(Ls)*0.05)]:.3f} (INK ~0.02) | p95 {Ls[int(len(Ls)*0.95)]:.3f} (PAPER ~0.80)")
# Hero GTA crop (rendered x 658..960, y 214..294): harus ada matahari/palem (bukan krem polos).
hero = fin[214:294, 658:960]
Hl = lum(hero)
print(f"hero GTA crop: mean lum {Hl.mean():.3f} | min {Hl.min():.3f} | max {Hl.max():.3f} | std {Hl.std():.3f} (std>0.05 = ada isi, bukan polos)")
# DATE CHECK box (rendered y 904..976): merah ACCENT + teks putih.
dc = fin[912:978, 48:976]
R,G,B = dc[:,:,0], dc[:,:,1], dc[:,:,2]
red = (R>150)&(G<100)&(B<80)
white = (R>230)&(G>230)&(B>230)
print(f"DATE CHECK box: piksel merah {100*red.mean():.1f}% | piksel putih (teks) {100*white.mean():.1f}%")
# Peta navy (rendered x 48..348, y 706..784): latar navy + daratan tan.
mp = fin[706:784, 48:348]
R2,G2,B2 = mp[:,:,0], mp[:,:,1], mp[:,:,2]
navy = (B2>R2+10)&(R2<80)
tan = (R2>180)&(G2>140)&(B2<180)&(B2>90)
print(f"peta navy: piksel navy {100*navy.mean():.1f}% | piksel tan {100*tan.mean():.1f}%")
# v12: celah caption peta -> header timeline (MUTED bawah vs merah atas).
R3,G3,B3 = fin[:,:,0], fin[:,:,1], fin[:,:,2]
mut = (R3>90)&(R3<125)&(G3>70)&(G3<105)&(B3>50)&(B3<85)
cap = mut[778:798, 48:700]
cap_rows = np.where(cap.any(axis=1))[0]
redh = (R3>150)&(G3<110)&(B3<90)
hdr = redh[791:808, 48:170]
hdr_rows = np.where(hdr.any(axis=1))[0]
print(f"celah caption->timeline: caption bawah {778+cap_rows.max()} | header atas {791+hdr_rows.min()} | GAP {(791+hdr_rows.min())-(778+cap_rows.max())}px (v11: 4px, target >=3px)")
# v12: DATE CHECK baris 5 (terakhir) vs kotak bawah.
dcb = fin[912:978, 48:976]
Rd,Gd,Bd = dcb[:,:,0], dcb[:,:,1], dcb[:,:,2]
redb = (Rd>150)&(Gd<110)&(Bd<90)
box_rows = np.where(redb[:,500])[0]
whiteb = (Rd>230)&(Gd>230)&(Bd>230)
# v24: baris 5 = baseline y=971 (rendered); cap atas ~963. Descender
# di bawah baseline bisa ter-antialias di bawah ambang putih (v24:
# 0 px putih di y>=971 — 'p' pre-orders tipis). Ukur tepi bawah teks
# = baris putih TERAKHIR di band baris 5 (963..978), bukan asumsi
# ada piksel di bawah baseline (v23 bergantung pada 1 px rapuh).
lw = whiteb[963-912:978-912, 60:976]
lw_rows = np.where(lw.any(axis=1))[0]
lw_bot = 963 + int(lw_rows.max()) if len(lw_rows) else 971
print(f"DATE CHECK baris 5: teks putih bawah {lw_bot} | kotak bawah {912+box_rows.max()} | GAP {(912+box_rows.max())-lw_bot}px (target >=2px)")
# v13: tiap adegan grid 179x70 harus berisi gambar (std > 0.03), bukan blok datar.
cards = [(48,440),(235,440),(422,440),(609,440),(796,440),(48,564),(235,564),(422,564),(609,564),(796,564)]
stds = []
for (cx0, cy0) in cards:
    reg = fin[cy0:cy0+70, cx0:cx0+179]
    stds.append(round(float(lum(reg).std()), 3))
print(f"adegan grid std (10 kartu): {stds} (target semua >0.03)")
open('/home/hatch/workspace/.tmp-bundle/v18-scenestd.txt','w').write(','.join(str(s) for s in stds))
# v15: tiap kartu adegan AI harus kaya warna (bukan blok datar): warna unik > 8.
uniq = []
for (cx0, cy0) in cards:
    reg = fin[cy0:cy0+70, cx0:cx0+179]
    cols = len(np.unique(reg.reshape(-1,3), axis=0))
    uniq.append(int(cols))
print(f"adegan grid warna unik (10 kartu): {uniq} (target semua >8)")
open('/home/hatch/workspace/.tmp-bundle/v18-sceneuniq.txt','w').write(','.join(str(s) for s in uniq))
# v22: #08 q32 — warna unik file adegan 32 (q16 v19 = 16 warna).
s08 = np.asarray(Image.open('scenes-ai/v24/scene08.png').convert('RGB'))
u08 = len(np.unique(s08.reshape(-1,3), axis=0))
print(f"#08 adegan q32: warna unik {u08} (q16 v19: 16)")
open('/home/hatch/workspace/.tmp-bundle/v25-uniq08.txt','w').write(str(u08))
# v18: #11 FULL AI — bendera Kanada + China di DALAM gambar (slot terukur
# dari scene11.png v18 (re-crop 179:70, palet MEDIANCUT baru): Kanada x60-79
# y20-34, band krem x65-74; China x98-117 y20-34; kartu #11 di (422,564)).
# Krem = (254,229,199); merah bendera = (154,83,59) (BUKAN warna v15).
R4,G4,B4 = fin[:,:,0], fin[:,:,1], fin[:,:,2]
cream = (R4==254)&(G4==229)&(B4==199)
flagred = (R4==154)&(G4==83)&(B4==59)
can_band = int(cream[584:599, 487:497].sum())
can_red = int(flagred[584:599, 482:502].sum())
chi_red = int(flagred[584:599, 520:540].sum())
print(f"#11 bendera AI: band krem Kanada {can_band} px | merah Kanada {can_red} px | merah China {chi_red} px")
open('/home/hatch/workspace/.tmp-bundle/v18-flags11.txt','w').write(f"{can_band},{can_red},{chi_red}")
# v18: #7 tiang BESAR — zona bendera merah slot x~8-62 (rendered 617-671,
# y440-464) harus dominan merah; v14: tiang kecil, zona sama nyaris kosong.
# Uji RENTANG (bukan warna eksak): palet med5+q12 #07 memakai merah
# (155,74,59)/(188,47,14), bukan (177,73,52) milik #11 (med3+q16).
f7red = int(((R4>150)&(G4<110)&(B4<90))[440:465, 617:672].sum())
print(f"#7 zona bendera merah: {f7red} px (v18 terukur 741)")
open('/home/hatch/workspace/.tmp-bundle/v18-flag07.txt','w').write(str(f7red))
# v18: #8 diterangkan — mean lum kartu #8 (796,440) vs v14 0,128 / v15 0,434.
lum8 = float(lum(fin[440:510, 796:975]).mean())
print(f"#8 mean lum v18: {lum8:.3f} (v14: 0,128; v15: 0,434; target >0,30)")
open('/home/hatch/workspace/.tmp-bundle/v18-lum08.txt','w').write(str(round(lum8,3)))
# v18: #10 dahan zaitun JELAS — hijau dahan/zaitun di zona dahan
# (kartu #10 di (235,564); zona relatif x110-179 y15-55 -> abs 345:414, 579:619).
green10 = (G4>R4+8)&(G4>55)&(G4<160)&(B4<105)
g10 = int(green10[579:619, 345:414].sum())
print(f"#10 dahan zaitun: hijau {g10} px (target >150)")
open('/home/hatch/workspace/.tmp-bundle/v18-branch10.txt','w').write(str(g10))
# v24: #13 palu re-crop C1 (620,40,1700,462) — kepala palu BESAR.
# Coklat kepala kini (196,122,67) (v23: (187,121,73) — 0 px di C1);
# zona kepala BARU: relatif x47-119 y4-35 -> abs 843:915, 568:599
# (v23: x45-115 y2-32 -> 841:911, 566:596). Kepala kini ~2.085 px.
gavel = (R4==196)&(G4==122)&(B4==67)
gv_head = int(gavel[568:599, 843:915].sum())
gv_all = int(gavel[564:634, 796:975].sum())
print(f"#13 palu v24 (C1): coklat kepala {gv_head} px | total kartu {gv_all} px (target >1000 / >1500; v23: 679 / 848)")
open('/home/hatch/workspace/.tmp-bundle/v18-gavel13.txt','w').write(f"{gv_head},{gv_all}")
# v18: #8 tanker BESAR — lambung gelap di bawah kartu (lum<0.10).
dark8 = float((lum(fin[485:510, 796:975])<0.10).mean())
print(f"#8 lambung gelap: {100*dark8:.1f}% piksel gelap di bawah kartu (target >50%)")
open('/home/hatch/workspace/.tmp-bundle/v18-dark08.txt','w').write(str(round(dark8,3)))
# v18 (prinsip Gibran 22:38 WIB — siluet di atas detail, warna jangan
# nabrak): hero #1/#3 + #04/#12 BARU. Ambang dari ukur render v18.
# Hero #1 summit (rendered x 48..350, y 214..294): 3 bendera besar —
# merah (China+AS+Rusia), biru (kanton AS + Rusia), putih (AS+Rusia).
rH1 = int(((R4>150)&(G4<90)&(B4<90))[214:294, 48:350].sum())
bH1 = int(((B4>R4+20)&(B4>70))[214:294, 48:350].sum())
wH1 = int(((R4>225)&(G4>225)&(B4>225))[214:294, 48:350].sum())
print(f"hero#1 bendera AI: merah {rH1} | biru {bH1} | putih {wH1}")
open('/home/hatch/workspace/.tmp-bundle/v18-hero01.txt','w').write(f"{rH1},{bH1},{wH1}")
# v21 (koreksi Gibran 23:18 WIB — bendera Cina): bintang lama 1-besar
# (Vietnam) ditambal rect merah + 5 bintang emas code-drawn.
# Emas bintang = (221,149,96); merah tambal = (198,19,27).
# Zona (rendered): kanton x60..82 y216..240 (bintang besar); bintang
# kecil x80..93 y216..239; tambal x84..108 y227..251; pusat bintang lama
# x92..104 y232..242 (harus KOSONG dari emas — v20: ~200px emas di sana).
goldC = ((abs(R4-221)<=12)&(abs(G4-149)<=12)&(abs(B4-96)<=12))
redP = ((abs(R4-198)<=12)&(abs(G4-19)<=10)&(abs(B4-27)<=10))
canton_gold = int(goldC[216:240, 60:82].sum())
small_gold = int(goldC[216:239, 80:93].sum())
patch_gold = int(goldC[228:246, 84:108].sum())
centre_gold = int(goldC[232:242, 92:104].sum())
patch_red = int(redP[227:251, 84:108].sum())
print(f"bendera Cina v21: emas kanton {canton_gold} px | emas bintang kecil {small_gold} px | emas zona tambal {patch_gold} px | emas pusat lama {centre_gold} px | merah tambal {patch_red} px")
open('/home/hatch/workspace/.tmp-bundle/v21-flagcn.txt','w').write(f"{canton_gold},{small_gold},{patch_gold},{centre_gold},{patch_red}")
# Hero #3 IPO (rendered x 674..976, y 214..294): koin emas + panah teal.
goldH3 = int(((R4>170)&(G4>120)&(B4<130)&(R4>G4+30))[214:294, 674:976].sum())
tealH3 = int(((B4>G4+5)&(G4>60)&(G4<140)&(R4<100))[214:294, 674:976].sum())
print(f"hero#3 koin+panah AI: emas {goldH3} | teal {tealH3}")
open('/home/hatch/workspace/.tmp-bundle/v18-hero03.txt','w').write(f"{goldH3},{tealH3}")
# v18: #04 kolom RAKSASA v2 — tan kolom + emas matahari strip di antara kolom
# (kartu #04 di (48,440); zona penuh kartu).
tan04 = int(((R4>120)&(R4<180)&(G4>90)&(G4<140)&(B4>60)&(B4<120))[440:510, 48:227].sum())
sun04 = int(((R4>200)&(G4>150)&(B4<130))[440:510, 48:227].sum())
print(f"#04 kolom raksasa: tan {tan04} px | emas matahari {sun04} px")
open('/home/hatch/workspace/.tmp-bundle/v18-col04.txt','w').write(f"{tan04},{sun04}")
# v18: #12 chip RAKSASA — emas dominan + navy latar (kartu #12 di (609,564)).
gold12 = int(((R4>170)&(G4>120)&(B4<130))[564:634, 609:788].sum())
navy12 = int(((B4>R4+15)&(R4<60))[564:634, 609:788].sum())
print(f"#12 chip raksasa: emas {gold12} px | navy {navy12} px")
open('/home/hatch/workspace/.tmp-bundle/v18-chip12.txt','w').write(f"{gold12},{navy12}")
# v18 (poles v17): hero #3 koin — margin kanan emas + bintang utuh.
# Zona hero #3 (rendered x 674..976, y 214..294): kolom emas paling kanan.
goldH3m = ((R4>170)&(G4>120)&(B4<130)&(R4>G4+30))[214:294, 674:976]
gcols = np.where(goldH3m.any(axis=0))[0]
rmarg = int(976 - (674 + gcols.max())) if len(gcols) else 0
# Bintang koin (coklat gelap) di wilayah koin x 850..976: tepi kanan bintang.
starH3 = ((R4>100)&(R4<185)&(G4>55)&(G4<125)&(B4<75))[214:294, 850:976]
syy, sxx = np.where(starH3)
star_right = int(sxx.max() + 850) if len(sxx) else 0
print(f"hero#3 koin v18: margin kanan emas {rmarg}px | tepi kanan bintang x={star_right}")
open('/home/hatch/workspace/.tmp-bundle/v18-hero03margin.txt','w').write(f"{rmarg},{star_right}")
# v18 (poles v17): #12 chip — tepi teal-abu HILANG + bayangan kiri mengecil.
# Abu-biru redup (B>R+5, G>R, 40<R<140) di kartu #12 (609..788, 564..634).
muted12 = int(((B4>R4+5)&(G4>R4)&(R4>40)&(R4<140))[564:634, 609:788].sum())
darkleft12 = int(((B4>R4+15)&(R4<60))[564:634, 609:634].sum())
print(f"#12 chip v18: abu-biru redup {muted12} px | gelap 25px kiri {darkleft12} px")
open('/home/hatch/workspace/.tmp-bundle/v18-chip12clean.txt','w').write(f"{muted12},{darkleft12}")
# v18: keterbacaan thumbnail 300px (skala juri) — std tiap kartu >0.05.
th = np.asarray(Image.open('entry-final-v25.png').convert('RGB').resize((300,300), Image.LANCZOS)).astype(float)
Lt = lum(th)
std300 = []
for (cx0, cy0) in cards:
    tx, ty = round(cx0*300/1024), round(cy0*300/1024)
    tw, thh = round(179*300/1024), round(70*300/1024)
    std300.append(round(float(Lt[ty:ty+thh, tx:tx+tw].std()),3))
print(f"adegan grid std @300px (10 kartu): {std300} (target semua >0.05)")
open('/home/hatch/workspace/.tmp-bundle/v18-std300.txt','w').write(','.join(str(s) for s in std300))
# v25: GATE RMSE — 4 adegan v23 dihitung ulang dari raw+crop yang sama (file v24 dipakai ulang)
# (resep /tmp/v23-build.py: crop -> LANCZOS -> med3 -> MEDIANCUT,
# dither NONE). File v24 byte-identik v23 (tidak ada quantize baru di
# v24 — DITOLAK semua, headroom habis). RMSE vs med3-only base + warna
# unik file. Ambang = RMSE v22 (STATUS.md v22):
# #04 <8.43 (q12), #05 <10.38 (q20), #06 <8.67 (q20), #09 <14.68 (q8).
import glob as _glob, os as _os
from PIL import ImageFilter as _IF
def _proc(_im, _q):
    return _im.filter(_IF.MedianFilter(3)).quantize(_q, method=Image.MEDIANCUT, dither=Image.NONE).convert("RGB")
def _rmse(_a, _b):
    _d = np.asarray(_a).astype(float) - np.asarray(_b).astype(float)
    return float(np.sqrt((_d ** 2).mean()))
_RMSE_JOBS = [
    ("scene04", "scenes-ai/v17-raw/media-generation-v17-scene04-icj-v2-0-*.webp", (202, 0, 2534, 912), (179, 70)),
    ("scene05", "scenes-ai/media-generation-scene05-cyclone-0-*.webp", (202, 0, 2534, 912), (179, 70)),
    ("scene06", "scenes-ai/media-generation-scene06-sanctions-0-*.webp", (202, 0, 2534, 912), (179, 70)),
    ("scene09", "scenes-ai/v16-raw/media-generation-v16-scene09-jobs-v2-0-*.webp", (202, 0, 2534, 912), (179, 70)),
]
_rmse_out = []
for _name, _pat, _box, _size in _RMSE_JOBS:
    _fs = sorted(_glob.glob(_pat))
    assert len(_fs) >= 1, f"raw tidak ketemu: {_pat}"
    _im0 = Image.open(_fs[0]).convert("RGB")
    _im = _im0.crop(_box).resize(_size, Image.LANCZOS)
    _base = _im.filter(_IF.MedianFilter(3)).convert("RGB")
    _ship = Image.open(f"scenes-ai/v24/{_name}.png").convert("RGB")
    _r = _rmse(_ship, _base)
    _c = len(np.unique(np.asarray(_ship).reshape(-1, 3), axis=0))
    _rmse_out.append(f"{_name},{_r:.2f},{_c}")
    print(f"RMSE v24 {_name}: {_r:.2f} | warna unik {_c}")
open('/home/hatch/workspace/.tmp-bundle/v25-rmse.txt','w').write("\\n".join(_rmse_out))
`);
execSync("python3 /home/hatch/workspace/.tmp-bundle/verify-final25.py", { stdio: "inherit" });
const sceneStds = readFileSync("/home/hatch/workspace/.tmp-bundle/v18-scenestd.txt", "utf8").split(",").map(Number);
check("adegan grid std > 0.03 (10 kartu berisi gambar)", sceneStds.length === 10 && sceneStds.every((s) => s > 0.03), `std min ${Math.min(...sceneStds)}`);
const sceneUniq = readFileSync("/home/hatch/workspace/.tmp-bundle/v18-sceneuniq.txt", "utf8").split(",").map(Number);
check("adegan grid warna unik > 8 (10 kartu = gambar, bukan blok)", sceneUniq.length === 10 && sceneUniq.every((s) => s > 8), `unik min ${Math.min(...sceneUniq)}`);
const uniq08 = Number(readFileSync("/home/hatch/workspace/.tmp-bundle/v25-uniq08.txt", "utf8"));
check("#08 ledakan q32 (warna unik adegan >24; v19 q16: 16)", uniq08 > 24, `${uniq08} warna`);
const flags11 = readFileSync("/home/hatch/workspace/.tmp-bundle/v18-flags11.txt", "utf8").split(",").map(Number);
check("#11 bendera AI: band krem Kanada > 20 px", flags11[0] > 20, `${flags11[0]} px (v18 terukur 75)`);
check("#11 bendera AI: merah Kanada > 30 px", flags11[1] > 30, `${flags11[1]} px`);
check("#11 bendera AI: merah China > 80 px", flags11[2] > 80, `${flags11[2]} px (v18 terukur 229)`);
const flag07 = Number(readFileSync("/home/hatch/workspace/.tmp-bundle/v18-flag07.txt", "utf8"));
check("#7 bendera merah BESAR (>200 px merah di zona tiang)", flag07 > 200, `${flag07} px (v18 terukur 741)`);
const lum08 = Number(readFileSync("/home/hatch/workspace/.tmp-bundle/v18-lum08.txt", "utf8"));
check("#8 diterangkan (mean lum > 0,30; v14: 0,128)", lum08 > 0.30, `${lum08} (v18 terukur 0,401)`);
const branch10 = Number(readFileSync("/home/hatch/workspace/.tmp-bundle/v18-branch10.txt", "utf8"));
check("#10 dahan zaitun JELAS (hijau >150 px di zona dahan)", branch10 > 150, `${branch10} px (v18 terukur 264)`);
const gavel13 = readFileSync("/home/hatch/workspace/.tmp-bundle/v18-gavel13.txt", "utf8").split(",").map(Number);
check("#13 palu v24 C1 (coklat kepala >1000 px; v23 render: 679)", gavel13[0] > 1000, `${gavel13[0]} px (file 2085 px; render ${gavel13[0]} px)`);
check("#13 palu v24 C1 (coklat total kartu >1500 px; v23: 848)", gavel13[1] > 1500, `${gavel13[1]} px`);
const dark08 = Number(readFileSync("/home/hatch/workspace/.tmp-bundle/v18-dark08.txt", "utf8"));
check("#8 tanker BESAR (lambung gelap >50% bawah kartu)", dark08 > 0.50, `${(100 * dark08).toFixed(1)}% (v18 terukur 71,0%)`);
const hero01 = readFileSync("/home/hatch/workspace/.tmp-bundle/v18-hero01.txt", "utf8").split(",").map(Number);
check("hero#1 bendera AI: merah >2000 px (3 bendera)", hero01[0] > 2000, `${hero01[0]} px (v21 terukur 5744; v18: 6266)`);
check("hero#1 bendera AI: biru >800 px (kanton AS + Rusia)", hero01[1] > 800, `${hero01[1]} px (v21 terukur 1882; v18: 1963)`);
check("hero#1 bendera AI: putih >800 px (AS + Rusia)", hero01[2] > 800, `${hero01[2]} px (v21 terukur 1578; v18: 1578)`);
const flagCN = readFileSync("/home/hatch/workspace/.tmp-bundle/v21-flagcn.txt", "utf8").split(",").map(Number);
check("bendera Cina: emas kanton > 25 px (bintang besar; v20: 0)", flagCN[0] > 25, `${flagCN[0]} px (terukur 48)`);
check("bendera Cina: emas bintang kecil > 8 px (4 bintang)", flagCN[1] > 8, `${flagCN[1]} px (terukur 16)`);
check("bendera Cina: emas zona tambal 1..30 px (bintang lama hilang; v20: ~200)", flagCN[2] >= 1 && flagCN[2] <= 30, `${flagCN[2]} px (terukur 6)`);
check("bendera Cina: emas pusat lama < 5 px (bintang Vietnam tertutup)", flagCN[3] < 5, `${flagCN[3]} px (terukur 0)`);
check("bendera Cina: merah tambal > 400 px (24x24)", flagCN[4] > 400, `${flagCN[4]} px (terukur 558)`);
const hero03 = readFileSync("/home/hatch/workspace/.tmp-bundle/v18-hero03.txt", "utf8").split(",").map(Number);
check("hero#3 koin+panah AI: emas >2000 px (koin raksasa)", hero03[0] > 2000, `${hero03[0]} px (v18 terukur 7586)`);
check("hero#3 koin+panah AI: teal >1200 px (panah naik)", hero03[1] > 1200, `${hero03[1]} px (v18 terukur 2744)`);
const col04 = readFileSync("/home/hatch/workspace/.tmp-bundle/v18-col04.txt", "utf8").split(",").map(Number);
check("#04 kolom RAKSASA (tan >2000 px)", col04[0] > 2000, `${col04[0]} px (v18 terukur 4010)`);
check("#04 kolom RAKSASA (emas matahari >250 px)", col04[1] > 250, `${col04[1]} px (v18 terukur 652)`);
const chip12 = readFileSync("/home/hatch/workspace/.tmp-bundle/v18-chip12.txt", "utf8").split(",").map(Number);
check("#12 chip RAKSASA (emas >3000 px)", chip12[0] > 3000, `${chip12[0]} px (v18 terukur 7276)`);
check("#12 chip RAKSASA (navy latar >1500 px)", chip12[1] > 1500, `${chip12[1]} px (v18 terukur 2487)`);
const h03m = readFileSync("/home/hatch/workspace/.tmp-bundle/v18-hero03margin.txt", "utf8").split(",").map(Number);
check("hero#3 koin UTUH kanan (margin emas >30px; v17: 26px)", h03m[0] > 30, `margin ${h03m[0]}px (v18 terukur 40)`);
check("hero#3 bintang koin utuh (tepi kanan bintang <955; v17: 963)", h03m[1] > 0 && h03m[1] < 955, `tepi kanan x=${h03m[1]} (v18 terukur 948)`);
const chip12c = readFileSync("/home/hatch/workspace/.tmp-bundle/v18-chip12clean.txt", "utf8").split(",").map(Number);
check("#12 tepi teal-abu HILANG (abu-biru redup <5 px; v17: 425)", chip12c[0] < 5, `${chip12c[0]} px (v18 terukur 0)`);
check("#12 bayangan kiri mengecil (gelap 25px kiri <1100; v17: 1407)", chip12c[1] < 1100, `${chip12c[1]} px (v18 terukur 844)`);
const std300 = readFileSync("/home/hatch/workspace/.tmp-bundle/v18-std300.txt", "utf8").split(",").map(Number);
check("adegan grid std @300px > 0.05 (terbaca di skala juri)", std300.length === 10 && std300.every((s) => s > 0.05), `std300 min ${Math.min(...std300)}`);;
// v25: GATE RMSE — 4 adegan v23 harus LEBIH BAIK dari RMSE v22 (file v24 dipakai ulang)
// (dihitung ulang dari raw+crop di §5) + warna unik = q v23 persis.
const rmseRows = readFileSync("/home/hatch/workspace/.tmp-bundle/v25-rmse.txt", "utf8").trim().split("\n").map((l) => { const [n, r, c] = l.split(","); return { n, r: Number(r), c: Number(c) }; });
const rmseOf = (n) => rmseRows.find((x) => x.n === n);
check("RMSE #04 v24 < 8.43 (v22 q12; v23 q16, byte-identik)", rmseOf("scene04") && rmseOf("scene04").r < 8.43, `#04 RMSE ${rmseOf("scene04") ? rmseOf("scene04").r : "?"} (v22: 8.43)`);
check("#04 warna unik = 16 (q16)", rmseOf("scene04") && rmseOf("scene04").c === 16, `${rmseOf("scene04") ? rmseOf("scene04").c : "?"} warna`);
check("RMSE #05 v24 < 10.38 (v22 q20; v23 q24, byte-identik)", rmseOf("scene05") && rmseOf("scene05").r < 10.38, `#05 RMSE ${rmseOf("scene05") ? rmseOf("scene05").r : "?"} (v22: 10.38)`);
check("#05 warna unik = 24 (q24)", rmseOf("scene05") && rmseOf("scene05").c === 24, `${rmseOf("scene05") ? rmseOf("scene05").c : "?"} warna`);
check("RMSE #06 v24 < 8.67 (v22 q20; v23 q24, byte-identik)", rmseOf("scene06") && rmseOf("scene06").r < 8.67, `#06 RMSE ${rmseOf("scene06") ? rmseOf("scene06").r : "?"} (v22: 8.67)`);
check("#06 warna unik = 24 (q24)", rmseOf("scene06") && rmseOf("scene06").c === 24, `${rmseOf("scene06") ? rmseOf("scene06").c : "?"} warna`);
check("RMSE #09 v24 < 14.68 (v22 q8; v23 q16, byte-identik)", rmseOf("scene09") && rmseOf("scene09").r < 14.68, `#09 RMSE ${rmseOf("scene09") ? rmseOf("scene09").r : "?"} (v22: 14.68)`);
check("#09 warna unik = 16 (q16)", rmseOf("scene09") && rmseOf("scene09").c === 16, `${rmseOf("scene09") ? rmseOf("scene09").c : "?"} warna`);
// v25: 11 adegan TIDAK disentuh harus byte-identik v23 (sha v23 terukur);
// scene13 = C1 v24 — sha BARU v24, TIDAK di map ini. v25 TIDAK mengubah
// adegan apa pun: map ini = file scenes-ai/v24/ yang dipakai ulang.
const unchangedV23 = {
  "scenes-ai/v24/hero01.png": "a1c54db4f1bf86d54b8106595652a1e6cb1eb7108f639f7055213e1953bf43b0",
  "scenes-ai/v24/hero03.png": "161c23e5749d0d534629423f78401cd07c9f8123da9fa9b552d535b368315d69",
  "scenes-ai/v24/scene04.png": "36304c5db2fe961015c780c6cb5ed782f10d000ea88ba1db671a0cadef61486e",
  "scenes-ai/v24/scene05.png": "430547ff84992c762dbe3386f301192da107e7c61a99e7d13a78c749be554e6d",
  "scenes-ai/v24/scene06.png": "b405378e593dd60ab88ece261755830c1315f7e0466766b6fb58ae36b805d7e9",
  "scenes-ai/v24/scene07.png": "1ec35ebf345d131347ca6fe686c87142364fd2086d73307191a6b2f4529ef715",
  "scenes-ai/v24/scene08.png": "f73dc55bf398ed3832be61a94fbb9882142d06412244324610887e6b53e0583a",
  "scenes-ai/v24/scene09.png": "3bccf570182f423eefb81d9d4ea202b3bd8d4149f27034150dac1fab32c15163",
  "scenes-ai/v24/scene10.png": "73a01305d05029ec95cbc5eea2d8b91d0d76f8202394d390b4dc7c831994e65f",
  "scenes-ai/v24/scene11.png": "ec7b83a3d2031a496d4ef975771628ea728a7faecc9dbe172deb56e4aa99a587",
  "scenes-ai/v24/scene12.png": "8ddd161f6ee7822e94d4a4e573660b07dcc5f0cca8f219f93de5464ce7abca08",
};
for (const [f, want] of Object.entries(unchangedV23)) {
  const got = sha(readFileSync(f));
  check(`adegan tak-disentuh byte-identik v23 (${f})`, got === want, got === want ? "identik" : `BEDA: ${got.slice(0, 12)}…`);
}
check("scene13 v24 = C1 BARU (sha f688341e…, BUKAN v23 50ca4377…)", sha(readFileSync("scenes-ai/v24/scene13.png")) === "f688341ee5eaa08d5fca99f4fafb1937d7cef207c461abed3b65c6287b8f8be8");

// 6. Story + continent counts + layout budget.
const d = JSON.parse(readFileSync("news-v14.json", "utf8"));
// v25: data news-v14.json HANYA boleh beda 6 field dari news-v13.json
// (brief [len] 18->12 + countLine + dateCheck2 + dateCheck5 + grid[1]/dek
// + regionBar ASIA 13->7). 9 headline ekor dipersingkat — tersembunyi di
// balik [len] (walk tidak merekursi array yang panjangnya berubah);
// dicek eksplisit di gate §6b di bawah.
// news-v13.json TIDAK disentuh (sha 26543964…); cerita 25 (13 main + 12 brief).
const d13 = JSON.parse(readFileSync("news-v13.json", "utf8"));
const diffPaths = [];
(function walk(a, b, p) {
  if (typeof a !== typeof b) { diffPaths.push(p); return; }
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      if (a.length !== b.length) diffPaths.push(p + " [len]");
      else a.forEach((x, i) => walk(x, b[i], `${p}[${i}]`));
    } else {
      for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
        if (!(k in a) || !(k in b)) diffPaths.push(p + "/" + k);
        else walk(a[k], b[k], p + "/" + k);
      }
    }
  } else if (a !== b) diffPaths.push(p);
})(d13, d, "");
const diffExpected = ["/brief [len]", "/countLine", "/dateCheck2", "/dateCheck5", "/grid[1]/dek", "/regionBar[4]/count"];
check("data v14 vs v13: HANYA 6 field berubah (brief len + countLine + dateCheck2/5 + grid dek + regionBar ASIA)", JSON.stringify([...diffPaths].sort()) === JSON.stringify([...diffExpected].sort()), `diff: ${diffPaths.join(" | ") || "tidak ada"}`);
check("data v13 sha TIDAK berubah (26543964…)", sha(readFileSync("news-v13.json")) === "265439640d1129c054c9d89a5a17f9fcfb0b6b1e794bd7fef654ccda77fe26be");
console.log(`stories: heroes ${d.heroes.length} + grid ${d.grid.length} + brief ${d.brief.length} = ${d.heroes.length + d.grid.length + d.brief.length} (target 25, main 13)`);
check("stories 25 (13 main + 12 brief)", d.heroes.length + d.grid.length + d.brief.length === 25);
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
check("continents NA5 SA1 EU5 AF2 AS7 OC4 off 1 (v25: AS 13->7, India dicabut)", counts.NA === 5 && counts.SA === 1 && counts.EU === 5 && counts.AF === 2 && counts.AS === 7 && counts.OC === 4 && counts.null === 1 && counts.undef === 0);
// v12 (P3): tail 18 item berlabel tempat ("PLACE — headline").
const tailPlaces = [...svg.matchAll(/(ALASKA|TOKYO|SAUDI ARABIA|LIBYA|FRANCE|AUSTRALIA|ITALY|SYDNEY|JAPAN|INDIA|ENGLAND|MEXICO|LATIN AMERICA) — /g)];
check("tail berlabel tempat (12)", tailPlaces.length === 12, `${tailPlaces.length} (expected 12)`);
const tailSamples = ["ALASKA — Peltola wins Alaska", "TOKYO — India, Japan", "ENGLAND — Duckett 133", "LATIN AMERICA — Netflix"];
check("tail sampel label tempat", tailSamples.every((s) => svg.includes(s)), tailSamples.filter((s) => !svg.includes(s)).join(";") || "semua ada");
// §6b. Gate v25 — ekor 12px/4 baris + headline dipersingkat + India hilang.
// (1) 9 headline baru HADIR lengkap di SVG (bukan terpotong wrap — bila
//     wrap memotong, string lengkap tidak ada di SVG).
const shortHeads = ["Danger passed in south", "Cocaine, pills seized in east", "Minister: Mélenchon could win", "David Jones cuts 1,500 jobs", "Hoax bomb alerts hit 6,300 schools", "Gunman arrested after lockdown", "Exports jump 20.5%; German morale up", "$12bn wind push; 6.86 GW", "Netflix tops YouTube"];
check("tail v25: 9 headline dipersingkat HADIR lengkap", shortHeads.every((s) => svg.includes(s)), shortHeads.filter((s) => !svg.includes(s)).join(";") || "semua ada");
// (2) 9 headline lama + 6 headline India HILANG (fakta sama, kata dipangkas).
const oldHeads = ["Saudi Arabia: danger passed in south", "Cocaine, pills seized in eastern Libya", "France: minister says Mélenchon could win", "David Jones cuts 1,500 jobs, 19 stores", "Hoax bomb alerts hit 6,300 schools in Italy", "Sydney gunman arrested after lockdown", "Japan exports jump 20.5%; German morale up", "Mexico plans $12bn wind push; 6.86 GW", "Netflix tops YouTube in Latin America", "India renewable capacity hits 299.25 GW", "Goldman Sachs lifts India; Nifty 28,500", "Dhoni's IPL exit draws tributes in India", "AI 171 crash probe report near end", "India puts 162.5% duty on bulk scotch", "Reliance seeks satellite capacity"];
check("tail v25: 9 headline lama + 6 India HILANG", oldHeads.every((s) => !svg.includes(s)), oldHeads.filter((s) => svg.includes(s)).join(";") || "semua hilang");
// (3) Ekor font 12px, 4 baris, pitch 15 (rendered y 852/867/882/897).
const tailTexts = [...svg.matchAll(/<text x="([\d.]+)" y="(852|867|882|897)" font-family="Noto Sans, sans-serif" font-size="12"[^>]*>([^<]*)<\/text>/g)];
check("tail v25: 24 teks 12px di 4 baris (12 headline + 12 nomor)", tailTexts.length === 24, `${tailTexts.length} (expected 24)`);
const tailRows = [...new Set(tailTexts.map((m) => +m[2]))].sort((a, b) => a - b);
check("tail v25: baris di 852/867/882/897 (pitch 15)", JSON.stringify(tailRows) === JSON.stringify([852, 867, 882, 897]), tailRows.join(","));
// (4) Tiap baris ekor = 1 baris penuh di SVG (tidak terpotong wrap).
const tailFull = d.brief.map((b) => (b.place ? b.place + " — " : "") + b.headline);
check("tail v25: 12 baris lengkap di SVG (tidak terpotong)", tailFull.every((s) => svg.includes(s)), tailFull.filter((s) => !svg.includes(s)).join(";") || "semua lengkap");
check("tail v25: tidak ada INDIA di ekor", !svg.includes("INDIA — "), "");
// v24 (perbaikan housekeeping): ringkasan layout DIHITUNG dari file
// sebenarnya — ukuran PNG, headroom (batas 307.200 B), dan ukuran JPEG
// diambil dari hasil ukur, BUKAN teks hardcode; gate di bawah memastikan
// ringkasan selalu sama dengan file (tidak bisa usang lagi seperti v22).
const jpgSize = readFileSync("entry-final-v25.jpg").length;
const headroomB = 307200 - main.length;
const layoutSummary = `layout v25: OY=-16 | masthead tanggal Didone 54px + dek miring (ICJ #2) | stat strip 6 kotak 148x48 (angka 20px + caption 9px 2 baris, $120BN COP31 "aid goal CUT from COP31 draft") | region bar 12px 7 segmen + WORLD | 3 hero 302x80 (chip 13px, #1 bendera AI 3 negara + TAMBAHAN code-drawn v21: rect merah 24x24 + 5 bintang emas Cina (1 besar + 4 kecil kanton; Vietnam 1-bintang DITUTUP), #2 GTA TERKUNCI, #3 koin+panah AI) + headline 20px + dek 12px 2 baris (#1 dek v24: "Declaration Towards Peace") | grid 5x2, ADEGAN AI 179x70 (10 gambar: 11 byte-identik v23, #13 re-crop C1 v24 — palu 2,2x lebih besar di render (kepala 679→1.506 px), coklat (196,122,67); quantize DITOLAK lagi v25, headroom dibiarkan) + chip 11px, headline 13px pitch 15 (#4 v24: "World Court: Myanmar committed genocide", #5 dek v25: "200,000 evacuated; red alert."), dek 10px +110, kicker 10px +122 (celah teks >=2.3px, v20: 0.3px) | peta NAVY 300x78 (13 pin bernomor + 20 dot abu: 17 lama + 3 baru v21 TOKYO-2/SYDNEY-2/São Paulo, klaster US mengipas diagonal) + legenda 2 kolom + caption "12 briefs" + kotak VERDICT navy (9-6 TERVERIFIKASI v24: "ICJ: Myanmar guilty of genocide." + "9–6; reparations ordered.") + MARKETS | timeline UTC 5 slot (header 821, label 835, offset +26, label word-spacing 1.5) | tail 12 item font 12px pitch 15 (4 baris 868/883/898/913, 9 headline dipersingkat) + label tempat | DATE CHECK box 928x66 5 baris 10.5px (8 item dikelompokkan 18 NOV / 16 NOV + 20 NOV (not yet): COP31 closes · Akvan landfall, celah ~1.8px) | footer 2 baris (rule 996, sumber 1007, HOW SURE 1020, 10 sumber + 13 DRAWN) | bottom GEN 1020 -> rendered 1004 (margin 20px) | PNG RGB-L9 ${main.length} B (<300 KB, headroom ${headroomB} B), JPEG q88 ${jpgSize} B (PNG menang — format final PNG)`;
console.log(layoutSummary);
check("ringkasan layout: ukuran = file sebenarnya", layoutSummary.includes(`${main.length} B`) && layoutSummary.includes(`headroom ${headroomB} B`) && layoutSummary.includes(`${jpgSize} B`), `PNG ${main.length} B, headroom ${headroomB} B, JPEG ${jpgSize} B`);
console.log(`\nTOTAL: ${fails === 0 ? "SEMUA GATE LULUS" : fails + " GATE GAGAL"}`);
process.exit(fails === 0 ? 0 : 1);
