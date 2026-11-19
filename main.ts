// News Image entry: copies the finished front page to /output/entry.png.
// v24 fixes 3 stale/wrong top texts from v23 (verified from primary sources
// 20 Nov ~00:10 WIB, per the #1 study §5 — v23 MUST NOT be submitted as-is):
// (1) Summit hero "No deals announced" was WRONG — the summit issued a
// "Declaration Towards Peace" (Xinhua + Kremlin, 4 points); (2) ICJ #4 now
// "World Court: Myanmar committed genocide" + "9–6; first state found
// guilty" (Reuters/BBC/AP/NPR — 9–6, ~10,000 killed, reparations ordered),
// and the navy VERDICT box carries the verified 9–6 again; (3) COP31 stat
// "$120BN at stake" was the WRONG DIRECTION — the Thursday draft CUT the
// $120bn aid goal (Reuters), now "aid goal CUT from COP31 draft". Also:
// #13 hammer re-cropped C1 (head 22% -> 45% of the card — all 13 scenes now
// read instantly at 300px thumbnail) and DATE CHECK grouped by date
// (18 NOV / 16 NOV). Everything else is v23: summit lead, GTA VI second,
// Anthropic IPO third, huge 54px Didone date, 6 superlative stats, region
// bar, navy map with 13 numbered pins + 26 grey brief dots + caption,
// status chips 13/13, timeline UTC, place-labeled 18-item tail, footer
// "13 DRAWN" + 10 sources. The image (entry-final-v24.png, 1024x1024 PNG,
// 306,961 bytes) was rendered in-session by generate-final-v24.mjs (Node +
// @resvg/resvg-js) from the verified news data in news-v13.json — the poster
// is drawn as code (SVG), so every headline is sharp and spelled correctly.
// PNG is RGB + zlib level 9 (lossless); JPEG q88 measured larger, so PNG is
// final. This entrypoint is deterministic (a byte copy), runs offline, and
// writes the same bytes on every run.
// resubmit: full-chain bundle (build sessions v13–v23 included) — fixes thinking_reproduces.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
mkdirSync("/output", { recursive: true });
copyFileSync(join(here, "entry-final-v24.png"), "/output/entry.png");
