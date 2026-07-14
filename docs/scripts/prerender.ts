/**
 * Post-build prerender: emit dist/<route>/index.html for every route with the
 * route's real <title>, meta description, og/twitter tags, canonical URL, and
 * (for concept/exercise pages) the same Article/LearningResource JSON-LD that
 * PageMeta injects at runtime.
 *
 * Why: the site is a SPA on GitHub Pages. Without these files every deep link
 * is served by the 404.html fallback -- an HTTP 404 with the generic homepage
 * meta. With them, every route is a real 200 whose head is correct before any
 * JavaScript runs (crawlers, social cards, RSS readers).
 *
 * Runs via vite-node (see package.json "build") so it can import the same
 * TypeScript modules the app uses -- titles can never drift from PageMeta.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { contentRoutes } from '../src/content/registry';
import { miniExercises } from '../src/features/mini-exercises/data';
import { practiceExercises } from '../src/features/practice/data';
import { KIND_LABEL, KIND_DESC, SECTION_ORDER } from '../src/features/practice/data/labels';

const BASE_URL = 'https://ocamlcase.dev';
const DIST = join(import.meta.dirname ?? __dirname, '..', 'dist');

type Page = { path: string; title: string; description: string };

// Feature pages whose PageMeta lives in JSX. Keep in sync with the components;
// each entry mirrors that page's <PageMeta title/description>.
const featurePages: Page[] = [
  {
    path: '/playground',
    title: 'Playground | oCamlCase',
    description:
      'Run OCaml in the browser: a full toplevel with an editor, type hints, and shareable snippets. No install required.',
  },
  {
    path: '/exercises',
    title: 'Exercises | oCamlCase',
    description:
      'Practice OCaml with coding challenges, drag-and-drop ordering, and five kinds of interactive exercises.',
  },
  {
    path: '/exercises/challenges',
    title: 'Challenges | oCamlCase',
    description: 'Multi-concept OCaml coding challenges. Write real code against hidden test suites.',
  },
  {
    path: '/exercises/mini',
    title: 'Mini Exercises | oCamlCase',
    description:
      '33 short OCaml drag-and-drop exercises covering the core concepts: bindings, closures, pattern matching, options, records, mutability, trees, and more.',
  },
  {
    path: '/concepts/static-semantics',
    title: 'Static Semantics | oCamlCase',
    description:
      "ToyCaml's static and dynamic semantics, live: typing judgements, inference rules, an elaborator that builds and animates the derivation tree for any expression you type, and an evaluator that runs what type-checks.",
  },
  {
    path: '/concepts/tree-lab',
    title: 'Tree Lab | oCamlCase',
    description:
      'Interactive rose-tree explorer: animated standard tour, live pre/post linearizations and projections, and the depthb balance check, all computed on your own tree.',
  },
  {
    path: '/interpreter',
    title: 'Building an Interpreter | oCamlCase',
    description:
      'A ToyCaml interpreter built in five interactive stages: lexing, parsing, static semantics, dynamic semantics, and recursion. Each stage is a live widget you can step through.',
  },
  {
    path: '/interpreter/lexing',
    title: 'Lexing | oCamlCase',
    description:
      'The first phase of a ToyCaml interpreter: a lexer that turns a character sequence into a token sequence. Watch lex consume input one token at a time, with maximal munch made visible.',
  },
  {
    path: '/interpreter/parsing',
    title: 'Parsing | oCamlCase',
    description:
      'The second phase of a ToyCaml interpreter: a recursive-descent parser that turns a token sequence into an abstract syntax tree. Watch the concrete syntax tree grow as each grammar rule is chosen.',
  },
  {
    path: '/interpreter/dynamics',
    title: 'Dynamic Semantics | oCamlCase',
    description:
      'The execution phase of a ToyCaml interpreter: big-step evaluation. Watch the value judgement V ⊢ e ⇒ v build as a derivation, with closures and the environment-extension dance of function application made visible.',
  },
  {
    path: '/interpreter/recursion',
    title: 'Recursion and Divergence | oCamlCase',
    description:
      'Adding recursive functions (rfun) to ToyCaml: the Srabs typing rule, the Drabs/Drapp evaluation rules with self-referential closures, and how recursion makes non-termination possible.',
  },
];

const pages: Page[] = [
  ...contentRoutes
    .filter((r) => r.path !== '/')
    .map((r) => ({ path: r.path, title: r.title, description: r.description })),
  ...featurePages,
  ...SECTION_ORDER.map((kind) => ({
    path: `/exercises/practice/kind/${kind}`,
    title: `${KIND_LABEL[kind]} | oCamlCase`,
    description: KIND_DESC[kind],
  })),
  ...practiceExercises.map((e) => ({
    path: `/exercises/practice/${e.id}`,
    title: `${e.title} | oCamlCase`,
    description: e.prompt,
  })),
  ...miniExercises.map((m) => ({
    path: `/exercises/mini/${m.id}`,
    title: `${m.title} | oCamlCase`,
    description: m.prompt,
  })),
];

function escapeAttr(s: string): string {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
}

/** Replace with a sanity check: a silent non-match would ship wrong meta. */
function mustReplace(html: string, re: RegExp, replacement: string, what: string): string {
  if (!re.test(html)) throw new Error(`prerender: could not find ${what} in built index.html`);
  return html.replace(re, replacement);
}

// Mirrors PageMeta.upsertPageJsonLd
function pageJsonLd(page: Page, url: string): string {
  const payload = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'LearningResource'],
    headline: page.title.replace(/ \| oCamlCase$/, ''),
    description: page.description,
    url,
    inLanguage: 'en',
    learningResourceType: page.path.startsWith('/exercises/') ? 'Exercise' : 'Article',
    isPartOf: { '@type': 'Course', name: 'Learn OCaml by Example', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'oCamlCase', url: BASE_URL },
    isAccessibleForFree: true,
  };
  // < guards against `</script>` inside string values.
  const json = JSON.stringify(payload).replaceAll('<', '\\u003c');
  return `<script type="application/ld+json" id="page-jsonld">${json}</script>`;
}

function renderPage(template: string, page: Page): string {
  const url = `${BASE_URL}${page.path}`;
  const title = escapeAttr(page.title);
  const desc = escapeAttr(page.description);

  let html = template;
  html = mustReplace(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, '<title>');
  html = mustReplace(
    html,
    /(<meta[^>]*name="description"[\s\S]*?content=")[^"]*(")/,
    `$1${desc}$2`,
    'meta description',
  );
  for (const prop of ['og:title', 'twitter:title']) {
    html = mustReplace(
      html,
      new RegExp(`(<meta[^>]*(?:property|name)="${prop}"[\\s\\S]*?content=")[^"]*(")`),
      `$1${title}$2`,
      prop,
    );
  }
  for (const prop of ['og:description', 'twitter:description']) {
    html = mustReplace(
      html,
      new RegExp(`(<meta[^>]*(?:property|name)="${prop}"[\\s\\S]*?content=")[^"]*(")`),
      `$1${desc}$2`,
      prop,
    );
  }
  html = mustReplace(
    html,
    /(<meta[^>]*property="og:url"[\s\S]*?content=")[^"]*(")/,
    `$1${url}$2`,
    'og:url',
  );
  html = mustReplace(
    html,
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${url}$2`,
    'canonical',
  );

  const isContent = page.path.startsWith('/concepts/') || page.path.startsWith('/exercises/');
  if (isContent) {
    html = mustReplace(html, /<\/head>/, `${pageJsonLd(page, url)}</head>`, '</head>');
  }
  return html;
}

// ---- main ---------------------------------------------------------------------

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

const seen = new Set<string>();
for (const page of pages) {
  if (seen.has(page.path)) throw new Error(`prerender: duplicate route ${page.path}`);
  seen.add(page.path);
  const dir = join(DIST, ...page.path.split('/').filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), renderPage(template, page));
}

// Sitemap generated from the same route list, so it can never drift from the
// prerendered pages (the old hand-maintained public/sitemap.xml did).
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...['/', ...pages.map((p) => p.path)].map(
    (path) => `  <url><loc>${BASE_URL}${path}</loc></url>`,
  ),
  '</urlset>',
  '',
].join('\n');
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

console.log(`prerender: wrote ${pages.length} route pages + sitemap (${pages.length + 1} URLs) into dist/`);
