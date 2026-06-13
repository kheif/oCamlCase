import { describe, it, expect } from 'vitest';
import { isActive, isTopbarActive } from './route-utils';

describe('isActive', () => {
  it('matches an exact path', () => {
    expect(isActive('/concepts/lists', '/concepts/lists')).toBe(true);
    expect(isActive('/concepts/lists', '/concepts/trees')).toBe(false);
  });

  it('treats the .html variant as the same destination', () => {
    expect(isActive('/concepts/lists.html', '/concepts/lists')).toBe(true);
  });

  it('special-cases the home route', () => {
    expect(isActive('/', '/')).toBe(true);
    expect(isActive('/index.html', '/')).toBe(true);
    expect(isActive('/concepts/lists', '/')).toBe(false);
  });
});

describe('isTopbarActive', () => {
  it('uses exact/.html matching when no matchPrefix is given', () => {
    expect(isTopbarActive('/playground', { path: '/playground' })).toBe(true);
    expect(isTopbarActive('/playground.html', { path: '/playground' })).toBe(true);
    expect(isTopbarActive('/exercises', { path: '/playground' })).toBe(false);
  });

  it('prefix-matches every page under a section', () => {
    const labs = { path: '/concepts/static-semantics', matchPrefix: '/interpreter/' };
    expect(isTopbarActive('/interpreter/lexing', labs)).toBe(true);
    expect(isTopbarActive('/interpreter/parsing', labs)).toBe(true);
    expect(isTopbarActive('/concepts/lists', labs)).toBe(false);
  });

  // Regression: the Exercises link must light up on the hub itself AND on every
  // nested exercise route. A trailing-slash prefix ('/exercises/') silently
  // failed to match the bare '/exercises' hub.
  it('marks Exercises active on the hub and all nested routes', () => {
    const exercises = { path: '/exercises', matchPrefix: '/exercises' };
    expect(isTopbarActive('/exercises', exercises)).toBe(true);
    expect(isTopbarActive('/exercises/challenges', exercises)).toBe(true);
    expect(isTopbarActive('/exercises/mini', exercises)).toBe(true);
    expect(isTopbarActive('/exercises/practice/kind/complete', exercises)).toBe(true);
    expect(isTopbarActive('/concepts/lists', exercises)).toBe(false);
  });
});
