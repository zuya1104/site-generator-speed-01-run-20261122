[![make.fun · site-generator-speed-01-run-20261122](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/zuya1104/site-generator-speed-01-run-20261122/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/zuya1104/site-generator-speed-01-run-20261122/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)

# Build a static site faster

An entry for make.fun's "Build a static site faster, 22 November 2026" bounty: a faster
drop-in for makefun-site 1.0.0 that answers exactly as it does on every case.

`solve.js` (dependency-free ES module) reimplements the generator with chunked HTML
escaping, one-pass Markdown lexing and rendering, cards computed once, and cached slugs
and dates. `main.ts` is the driver the harness runs.
