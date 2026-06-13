import { useState, useCallback } from 'react';

const KEY = 'practice-progress';

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function save(ids: Set<string>) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...ids]));
  } catch { /* localStorage unavailable (private mode / quota) */ }
}

export function usePracticeProgress() {
  const [completed, setCompleted] = useState<Set<string>>(() => load());

  const markComplete = useCallback((id: string) => {
    setCompleted((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setCompleted(new Set());
    localStorage.removeItem(KEY);
  }, []);

  return { completed, markComplete, reset };
}
