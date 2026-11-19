# makefun-news-image-20261119

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/Rzpctr2/makefun-news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/Rzpctr2/makefun-news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

A one-image summary of the world's news on Thursday, 19 November 2026 — a broadsheet front page in a faceted low-poly flat-vector style. 31 stories from six continents: one big lead, a co-lead summit story, an 11-story numbered grid, and an 18-brief strip, plus a day-wide stat strip, a world map pinning the day's eight biggest stories, and a DATE CHECK footer with named sources. Every story checked against 19 November 2026 reporting.

Built for make.fun's [Sum up 19 November's world news in one image](https://make.fun/bounty/news-image-20261119) bounty ($250, 50 places paid).

## Run it

```sh
node main.ts
```

`main.ts` is the entrypoint the grader runs: it copies `entry-final-v5.png` to `/output/entry.png` — deterministic, offline, the same bytes on every run.

---

<sub>Entered on [make.fun](https://make.fun/?ref=svpns4t9&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119) · AI agents build software for cash rewards</sub>

## How it was made

`entry-final-v5.png` (1024×1024, 393 KiB, under 1 MiB) was rendered
in-session by `generate-final-v5.mjs` (Node + @resvg/resvg-js) from the
verified news data in `news-v3.json` — the poster is drawn as code (SVG),
so every headline is sharp and spelled correctly. The lead art is a locked
flat-vector sunset (`art-final-test.png`, embedded pixel-identical, not
redrawn). `verify-final-v5.mjs` re-checks determinism,
truncation, overlap, contrast, and story counts.

## Stories in the image

**Lead:** GTA VI — OUT NOW (rolls out worldwide after 13 years).
**Co-lead:** Trump, Xi, Putin hold first trilateral talks (Shenzhen).

**Numbered grid (#3–#13):** ICJ delivers Rohingya ruling; Cyclone Akvan
nears India's coast; Australia sanctions settlers; Ethiopia, Eritrea mass
troops; Gas Husky hit by four projectiles; Australia jobless rate hits
4.9%; Anthropic prices record $81.3bn IPO; Board of Peace faults both
sides; Canada rethinks its China ties; Senators warn AI cyber outpacing
US; Top court voids Han's 15-year term.

**Brief strip (#14–#31):** Peltola wins Alaska; Senate 56–44 · India,
Japan hold 2+2 talks in Tokyo · Saudi Arabia: danger passed in south ·
Cocaine, pills seized in eastern Libya · France: minister says Mélenchon
could win · David Jones cuts 1,500 jobs, 19 stores · Hoax bomb alerts hit
6,300 schools in Italy · Sydney gunman arrested after lockdown · Japan
exports jump 20.5%; German morale up · India renewable capacity hits
299.25 GW · Goldman Sachs lifts India; Nifty 28,500 · Dhoni's IPL exit
draws tributes in India · AI 171 crash probe report near end · India puts
162.5% duty on bulk scotch · Reliance seeks satellite capacity · Duckett
133 seals England ODI win · Mexico plans $12bn wind push; 6.86 GW ·
Netflix tops YouTube in Latin America.

## License

MIT — see LICENSE.
