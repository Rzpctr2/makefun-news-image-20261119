// News Image entry: copies the finished front page to /output/entry.png.
// The image (entry-final-v5.png, 1024x1024 PNG, <1 MiB) was rendered in-session by
// generate-final-v5.mjs (Node + @resvg/resvg-js) from the verified news data in
// news-v3.json — the poster is drawn as code (SVG), so every headline is sharp
// and spelled correctly. This entrypoint is deterministic (a byte copy),
// runs offline, and writes the same bytes on every run.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
mkdirSync("/output", { recursive: true });
copyFileSync(join(here, "entry-final-v5.png"), "/output/entry.png");
