// main.ts — the program the harness runs (`node /bot/main.ts`, node22). It reads every case
// from /input/cases.json (a JSON array of {id, input}), answers each one alone with run()
// from solve.js, and writes /output/answers.json: a JSON array of the answers, one per case
// and in the cases' order. Outside a container MAKEFUN_INPUT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /input and /output.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setFlagsFromString } from 'node:v8';

// V8's incremental marking off, set before solve.js is imported so all of its work runs
// under it (the house baseline runs with --no-incremental-marking, and an entry may tune
// V8's flags too).
setFlagsFromString('--no-incremental-marking');

/** solve.js, imported by its URL (a .js module carries no types) and typed by its contract. */
const { run } = (await import(new URL('./solve.js', import.meta.url).href)) as { run: (input: unknown) => unknown };

const INPUT_DIR = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// A small warm-up site through run() before the real cases: it lets V8 compile the hot
// functions (front matter, Markdown, templates) on a few hundred bytes, so the first real
// case runs compiled instead of interpreted. run() is pure and clears its caches per call,
// so the warm-up cannot change any answer.
run({
  site: { title: 'W', base_url: 'https://w.test', per_page: 2, recent: 1 },
  templates: {
    post: '<h1>{{ page.title }}</h1>{{{ page.content }}}{% for t in page.tags %}{{ t.name }}{% endfor %}{% if page.is_post %}P{% endif %}',
    page: '<h1>{{ page.title }}</h1>{{{ page.content }}}',
    index: '{% for p in posts %}{{ p.title }}{% endfor %}{% include "pager" %}',
    tag: '{% for p in posts %}{{ p.title }}{% endfor %}',
    tags: '{% for t in tags %}{{ t.name }}{% endfor %}',
    pager: 'pager',
  },
  files: [
    {
      path: 'posts/w.md',
      content: '---\ntitle: "Warm"\ndate: 2023-01-01\ntags: [A]\n---\n\n# Head *em* **strong** `code` [x](w.md)\n\n- one\n- two\n\n> quote\n\n```\ncode fence\n```\n',
    },
    { path: 'about.md', content: '---\ntitle: "About"\n---\n\nplain para\n' },
  ],
});

const cases = JSON.parse(readFileSync(join(INPUT_DIR, 'cases.json'), 'utf8')) as { id: string; input: unknown }[];
const answers: unknown[] = [];
for (const c of cases) answers.push(run(c.input));
writeFileSync(join(OUTPUT_DIR, 'answers.json'), JSON.stringify(answers));
