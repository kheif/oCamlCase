import type { GuidedPhase, LearnMode } from '../types';
import { contentRoutes } from './registry';

// Single source of truth for the GUIDED learning order. Reference order is the
// registry array order itself; numbers in both modes are computed, never stored.
export const guidedPhases: GuidedPhase[] = [
  {
    num: 0,
    title: 'Orientation',
    paths: ['/concepts/how-to-learn'],
  },
  {
    num: 1,
    title: 'Values & Bindings',
    paths: ['/concepts/bindings'],
  },
  {
    num: 2,
    title: 'Functions as Values',
    paths: [
      '/concepts/abstractions',
      '/concepts/lexical-scope',
      '/concepts/closures',
      '/concepts/currying',
    ],
  },
  {
    num: 3,
    title: 'Types',
    paths: ['/concepts/type-inference', '/concepts/polymorphism', '/concepts/compiler-errors'],
  },
  {
    num: 4,
    title: 'Data Modeling',
    paths: [
      '/concepts/tuples',
      '/concepts/variants',
      '/concepts/pattern-matching',
      '/concepts/options-result',
      '/concepts/records',
      '/concepts/exceptions',
    ],
  },
  {
    num: 5,
    title: 'Recursion & Collections',
    paths: [
      '/concepts/lists',
      '/concepts/list-operations',
      '/concepts/higher-order',
      '/concepts/tail-recursion',
      '/concepts/iteration',
      '/concepts/derived-forms',
      '/concepts/trees',
      '/concepts/sorting',
    ],
  },
  {
    num: 6,
    title: 'Practical OCaml',
    paths: [
      '/concepts/mutability',
      '/concepts/modules',
      '/concepts/functors',
      '/concepts/projects-dune-opam',
      '/concepts/testing-and-quality',
    ],
  },
];

/** Registry entries that participate in concept ordering, in reference order. */
export const conceptRoutes = contentRoutes.filter((r) => r.concept);

/** Concepts that carry a reference-mode number (orientation-style pages are excluded). */
const numberedConceptRoutes = conceptRoutes.filter((r) => !r.concept?.unnumbered);

const routeByPath = new Map(contentRoutes.map((r) => [r.path, r]));

// Drift guard: the guided path must cover exactly the registry's concept pages.
// Throws at module load so a mismatch fails instantly in dev and in build preview.
{
  const guided = guidedPhases.flatMap((p) => p.paths);
  const guidedSet = new Set(guided);
  const conceptSet = new Set(conceptRoutes.map((r) => r.path));
  if (guided.length !== guidedSet.size) {
    throw new Error('content/order: duplicate path in guidedPhases');
  }
  for (const p of guidedSet) {
    if (!conceptSet.has(p)) throw new Error(`content/order: guided path ${p} not in registry`);
  }
  for (const p of conceptSet) {
    if (!guidedSet.has(p)) throw new Error(`content/order: registry concept ${p} missing from guidedPhases`);
  }
}

export type PageLink = { label: string; href: string };

export type PagePosition = {
  /** e.g. "Concept 2 of 20" or "Phase 2 · Step 4 of 4" */
  label: string;
  prev: PageLink;
  next: PageLink;
};

/** The full linear concept sequence for a mode (paths in learning order).
 *  Unnumbered pages (orientation) exist only on the guided path. */
export function conceptSequence(mode: LearnMode): string[] {
  return mode === 'guided'
    ? guidedPhases.flatMap((p) => p.paths)
    : numberedConceptRoutes.map((r) => r.path);
}

function navLabelFor(path: string): string {
  return routeByPath.get(path)?.nav?.label ?? path;
}

// Sequence endpoints match the pre-existing hardcoded footers: the first
// concept points back Home, the last one hands off to the interpreter series.
const SEQ_START: PageLink = { label: 'Home', href: '/' };
const SEQ_END: PageLink = { label: 'Building an Interpreter', href: '/interpreter/lexing' };

/** Position metadata (page label + prev/next links) for a concept page in a mode.
 *  Returns null for pages that aren't part of the concept sequence. */
export function pagePosition(path: string, mode: LearnMode): PagePosition | null {
  const seq = conceptSequence(mode);
  const i = seq.indexOf(path);
  if (i === -1) return null;

  const prev: PageLink =
    i === 0 ? SEQ_START : { label: navLabelFor(seq[i - 1]), href: seq[i - 1] };
  const next: PageLink =
    i === seq.length - 1 ? SEQ_END : { label: navLabelFor(seq[i + 1]), href: seq[i + 1] };

  let label: string;
  if (mode === 'guided') {
    const phase = guidedPhases.find((p) => p.paths.includes(path));
    const step = (phase?.paths.indexOf(path) ?? 0) + 1;
    label = `Phase ${phase?.num} · Step ${step} of ${phase?.paths.length} · ${phase?.title}`;
  } else {
    const n = numberedConceptRoutes.findIndex((r) => r.path === path);
    label = `Concept ${n + 1} of ${numberedConceptRoutes.length}`;
  }
  return { label, prev, next };
}

/** Reference-mode concept number for sidebar/TOC ('1.', '2.', ...), or '·' if unnumbered. */
export function referenceNum(path: string): string {
  const n = numberedConceptRoutes.findIndex((r) => r.path === path);
  return n === -1 ? '·' : `${n + 1}.`;
}
