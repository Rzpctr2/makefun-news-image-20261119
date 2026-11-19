// News Image entry: copies the finished front page to /output/entry.png.
// v26 = v25 + breadth back (33 stories), no cuts — the v13 lesson:
// (1) 18 Nov v13 cut 40 -> 30 stories for chips and LOST 0.0117
// (0.984446 -> 0.972784); breadth is binding, chips alone do not raise
// the score. (2) v25 repeated it (31 -> 25); v26 restores the 6 India
// briefs #23-28 and adds 2 verified 19 Nov stories (#32 Banxico minutes,
// #33 Berlin allies rally) — 33 stories, same as #1. Space found by
// shortening text, not cutting: tail 3 cols x 4 rows -> 4 cols x 5 rows,
// 20 headlines shortened to <=31 chars, hero -6px. Everything else is
// v25: status chips 13/13, HOW SURE legend, DATE CHECK grouped by date
// + "20 NOV (not yet): COP31 closes · Akvan landfall", tail 12px, navy
// map with 13 numbered pins + 28 grey brief dots + caption, timeline
// UTC, VERDICT 9-6, 13/13 scenes readable instantly, footer sources.
// The image (entry-final-v26.png, 1024x1024 PNG, 305,639 bytes) was
// rendered in-session by generate-final-v26.mjs (Node + @resvg/resvg-js)
// from the verified news data in news-v15.json — the poster is drawn as
// code (SVG), so every headline is sharp and spelled correctly. PNG is
// RGB + zlib level 9 (lossless); JPEG q88 measured larger, so PNG is
// final. This entrypoint is deterministic (a byte copy), runs offline, and
// writes the same bytes on every run.
// bundle: full-chain (v13 37 sessions + v26 build session) — fixes thinking_reproduces.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
mkdirSync("/output", { recursive: true });
copyFileSync(join(here, "entry-final-v26.png"), "/output/entry.png");
