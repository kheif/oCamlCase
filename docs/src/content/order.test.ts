import { describe, it, expect } from 'vitest';
import {
  conceptSequence,
  pagePosition,
  referenceNum,
  guidedPhases,
  conceptRoutes,
} from './order';

describe('conceptSequence', () => {
  it('guided sequence equals the guided phases flattened in order', () => {
    expect(conceptSequence('guided')).toEqual(guidedPhases.flatMap((p) => p.paths));
  });

  it('reference sequence is a subset of guided (drops unnumbered orientation pages)', () => {
    const guided = new Set(conceptSequence('guided'));
    const reference = conceptSequence('reference');
    expect(reference.length).toBeLessThanOrEqual(guided.size);
    for (const path of reference) expect(guided.has(path)).toBe(true);
  });

  it('has no duplicate paths in either mode', () => {
    for (const mode of ['guided', 'reference'] as const) {
      const seq = conceptSequence(mode);
      expect(new Set(seq).size).toBe(seq.length);
    }
  });
});

// The module-load drift guard in order.ts throws if guided paths and the
// registry concept set diverge. Importing the module already ran it; assert the
// invariant explicitly so the intent is visible and locked.
describe('guided / registry drift guard', () => {
  it('guided paths cover exactly the registry concept pages', () => {
    const guided = new Set(guidedPhases.flatMap((p) => p.paths));
    const concepts = new Set(conceptRoutes.map((r) => r.path));
    expect(guided).toEqual(concepts);
  });
});

describe('pagePosition', () => {
  it('returns null for a path outside the concept sequence', () => {
    expect(pagePosition('/playground', 'guided')).toBeNull();
    expect(pagePosition('/exercises', 'reference')).toBeNull();
  });

  it('links the first guided page back to Home and labels it Phase 0', () => {
    const first = conceptSequence('guided')[0];
    const pos = pagePosition(first, 'guided');
    expect(pos?.prev).toEqual({ label: 'Home', href: '/' });
    expect(pos?.label).toMatch(/^Phase 0 · Step 1 of/);
  });

  it('hands the last guided page off to the interpreter series', () => {
    const seq = conceptSequence('guided');
    const pos = pagePosition(seq[seq.length - 1], 'guided');
    expect(pos?.next).toEqual({ label: 'Building an Interpreter', href: '/interpreter/lexing' });
  });

  it('labels reference pages as "Concept n of N"', () => {
    const seq = conceptSequence('reference');
    const pos = pagePosition(seq[0], 'reference');
    expect(pos?.label).toBe(`Concept 1 of ${seq.length}`);
    expect(pos?.prev).toEqual({ label: 'Home', href: '/' });
  });

  it('chains prev/next within the reference sequence', () => {
    const seq = conceptSequence('reference');
    const pos = pagePosition(seq[1], 'reference');
    expect(pos?.prev.href).toBe(seq[0]);
    expect(pos?.next.href).toBe(seq[2]);
  });
});

describe('referenceNum', () => {
  it('numbers concepts sequentially from 1', () => {
    const seq = conceptSequence('reference');
    expect(referenceNum(seq[0])).toBe('1.');
    expect(referenceNum(seq[1])).toBe('2.');
  });

  it('returns a bullet for unknown or unnumbered paths', () => {
    expect(referenceNum('/not/a/concept')).toBe('·');
  });
});
