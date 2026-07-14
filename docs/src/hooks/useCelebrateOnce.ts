import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * One-time 100% celebration for progress indexes.
 *
 * Fires once when `done` first reaches `total`, remembered under `storageKey`
 * so revisiting the page stays quiet. If progress drops below 100% again
 * (storage cleared / new exercises added), the flag resets so the next full
 * completion celebrates again.
 *
 * Attach `anchorRef` to the element the confetti should burst from.
 */
export function useCelebrateOnce(storageKey: string, done: number, total: number) {
  const [celebrating, setCelebrating] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const complete = total > 0 && done === total;
    let seen = false;
    try {
      seen = localStorage.getItem(storageKey) === '1';
    } catch {
      /* localStorage unavailable (private mode) */
    }
    if (complete && !seen) {
      try {
        localStorage.setItem(storageKey, '1');
      } catch {
        /* ignore */
      }
      const rect = anchorRef.current?.getBoundingClientRect();
      setOrigin(
        rect
          ? { x: rect.left + rect.width / 2, y: rect.top }
          : { x: window.innerWidth / 2, y: 160 },
      );
      setCelebrating(true);
    } else if (!complete && seen) {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    }
  }, [storageKey, done, total]);

  const stop = useCallback(() => setCelebrating(false), []);

  return { celebrating, origin, anchorRef, stop };
}
