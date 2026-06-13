import { describe, it, expect } from 'vitest';
import { practiceExercises, practiceExerciseById } from './index';
import { KIND_LABEL, KIND_DESC, SECTION_ORDER } from './labels';
import { contentRoutes } from '../../../content/registry';

const registryPaths = new Set(contentRoutes.map((r) => r.path));

describe('practice exercise ids', () => {
  it('are unique', () => {
    const ids = practiceExercises.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('round-trip through the by-id lookup', () => {
    expect(Object.keys(practiceExerciseById).length).toBe(practiceExercises.length);
    for (const e of practiceExercises) {
      expect(practiceExerciseById[e.id]).toBe(e);
    }
  });
});

describe('kinds and labels', () => {
  it('every exercise has a kind listed in SECTION_ORDER', () => {
    for (const e of practiceExercises) {
      expect(SECTION_ORDER).toContain(e.kind);
    }
  });

  it('every section kind has at least one exercise', () => {
    for (const kind of SECTION_ORDER) {
      expect(practiceExercises.some((e) => e.kind === kind)).toBe(true);
    }
  });

  it('label and description maps cover every section kind', () => {
    for (const kind of SECTION_ORDER) {
      expect(KIND_LABEL[kind]?.length).toBeGreaterThan(0);
      expect(KIND_DESC[kind]?.length).toBeGreaterThan(0);
    }
  });
});

describe('per-exercise required fields', () => {
  for (const e of practiceExercises) {
    it(`${e.id} is well formed`, () => {
      expect(e.title.trim().length).toBeGreaterThan(0);
      expect(e.prompt.trim().length).toBeGreaterThan(0);
      expect(['easy', 'medium', 'hard']).toContain(e.difficulty);

      if (e.kind === 'predict-output' || e.kind === 'predict-type') {
        expect(e.code.trim().length).toBeGreaterThan(0);
        expect(e.expected.trim().length).toBeGreaterThan(0);
        expect(e.explanation.trim().length).toBeGreaterThan(0);
      } else {
        // fix-error / complete / refactor: editable code run against hidden tests
        expect(e.starterCode.trim().length).toBeGreaterThan(0);
        expect(e.tests.length).toBeGreaterThanOrEqual(1);
        for (const t of e.tests) {
          expect(t.name.trim().length).toBeGreaterThan(0);
          expect(t.testCode.trim().length).toBeGreaterThan(0);
          expect(t.expected.trim().length).toBeGreaterThan(0);
        }
        if (e.solution != null) {
          expect(e.solution.trim().length).toBeGreaterThan(0);
        }
      }
    });
  }
});

describe('concept links', () => {
  it('point at routes that exist in the registry', () => {
    for (const e of practiceExercises) {
      if (e.conceptLink) {
        expect(registryPaths.has(e.conceptLink.href)).toBe(true);
      }
    }
  });
});
