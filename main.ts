// News Image entry: copies the finished front page to /output/entry.png.
// v8 rebuilds the page around a stronger news hierarchy instead of a game
// headline: the Shenzhen summit leads, GTA VI drops to second, and the
// Anthropic IPO is third. The masthead is now dominated by a huge 54px
// Didone date, the single largest element on the page, with a red italic
// deck underneath. Three hero stories sit side by side, each carrying its
// own 302x80 illustration, and every grid card gets an illustration too.
// A bold six-number stat strip, a standalone band map with numbered pins,
// a red DATE CHECK box, and a five-slot "THE DAY IN UTC" timeline round
// out the broadsheet toolkit. The image (entry-final-v8.png, 1024x1024
// PNG, <1 MiB) was rendered in-session by generate-final-v8.mjs
// (Node + @resvg/resvg-js) from the verified news data in news-v8.json —
// the poster is drawn as code (SVG), so every headline is sharp and
// spelled correctly. This entrypoint is deterministic (a byte copy),
// runs offline, and writes the same bytes on every run.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
mkdirSync("/output", { recursive: true });
copyFileSync(join(here, "entry-final-v8.png"), "/output/entry.png");
