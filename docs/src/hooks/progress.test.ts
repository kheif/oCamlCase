import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { usePracticeProgress } from './usePracticeProgress';
import { useMiniProgress } from './useMiniProgress';

const hooks = [
  { name: 'usePracticeProgress', use: usePracticeProgress, key: 'practice-progress' },
  { name: 'useMiniProgress', use: useMiniProgress, key: 'mini-progress' },
] as const;

beforeEach(() => {
  localStorage.clear();
});

describe.each(hooks)('$name', ({ use, key }) => {
  it('starts empty when nothing is stored', () => {
    const { result } = renderHook(() => use());
    expect(result.current.completed.size).toBe(0);
  });

  it('marks an id complete, dedups it, and persists to localStorage', () => {
    const { result } = renderHook(() => use());

    act(() => result.current.markComplete('ex-1'));
    expect(result.current.completed.has('ex-1')).toBe(true);

    act(() => result.current.markComplete('ex-1'));
    expect(result.current.completed.size).toBe(1);

    expect(JSON.parse(localStorage.getItem(key) as string)).toEqual(['ex-1']);
  });

  it('re-reads persisted progress on remount', () => {
    const first = renderHook(() => use());
    act(() => first.result.current.markComplete('ex-2'));
    first.unmount();

    const second = renderHook(() => use());
    expect(second.result.current.completed.has('ex-2')).toBe(true);
  });

  it('reset clears state and storage', () => {
    const { result } = renderHook(() => use());
    act(() => result.current.markComplete('ex-3'));

    act(() => result.current.reset());
    expect(result.current.completed.size).toBe(0);
    expect(localStorage.getItem(key)).toBeNull();
  });

  it('tolerates corrupt stored JSON without throwing', () => {
    localStorage.setItem(key, 'definitely-not-json');
    const { result } = renderHook(() => use());
    expect(result.current.completed.size).toBe(0);
  });

  it('does not crash when localStorage.setItem throws (private mode)', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError');
    });
    const { result } = renderHook(() => use());

    expect(() => act(() => result.current.markComplete('ex-4'))).not.toThrow();
    // state still updates in memory even though the write failed
    expect(result.current.completed.has('ex-4')).toBe(true);

    spy.mockRestore();
  });
});
