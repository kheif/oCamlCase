import { describe, it, expect } from 'vitest';
import { getTopbarLinks, getNavGroups } from './nav';

describe('getTopbarLinks', () => {
  for (const mode of ['reference', 'guided'] as const) {
    it(`exposes the canonical top-level sections (${mode})`, () => {
      const labels = getTopbarLinks(mode).map((l) => l.label);
      expect(labels).toEqual(['Cheat Sheet', 'Concepts', 'Labs', 'Exercises', 'Playground']);
    });
  }

  it('points Exercises at the hub with a prefix that covers nested routes', () => {
    const ex = getTopbarLinks('reference').find((l) => l.label === 'Exercises');
    expect(ex?.path).toBe('/exercises');
    // Must be the bare prefix so '/exercises' itself matches (see route-utils regression).
    expect(ex?.matchPrefix).toBe('/exercises');
  });

  it('prefix-matches the Concepts section', () => {
    const concepts = getTopbarLinks('reference').find((l) => l.label === 'Concepts');
    expect(concepts?.matchPrefix).toBe('/concepts/');
  });
});

describe('getNavGroups', () => {
  it('always appends Interactive Labs as the final group', () => {
    for (const mode of ['reference', 'guided'] as const) {
      const groups = getNavGroups(mode);
      expect(groups[groups.length - 1]?.label).toBe('Interactive Labs');
    }
  });

  it('hides the Start here and Exercises groups from the sidebar', () => {
    const labels = getNavGroups('reference').map((g) => g.label);
    expect(labels).not.toContain('Start here');
    expect(labels).not.toContain('Exercises');
  });

  it('groups guided mode into numbered phases', () => {
    const first = getNavGroups('guided')[0];
    expect(first.label).toMatch(/^Phase 0 /);
  });

  it('never emits an empty group', () => {
    for (const mode of ['reference', 'guided'] as const) {
      for (const group of getNavGroups(mode)) {
        expect(group.links.length).toBeGreaterThan(0);
      }
    }
  });
});
