import { useLayoutEffect, useRef, type RefObject } from 'react';

// FLIP animation for list reorders. Watches descendants carrying
// [data-flip-key] inside `containerRef`; when `signal` changes, items that
// moved glide from their previous rect to the new one (transform-only), and
// items that are new fade in. Keys (not node identity) drive matching, so an
// item remounted under a different parent group still animates.
export function useFlip(containerRef: RefObject<HTMLElement | null>, signal: unknown) {
  const prevRects = useRef<Map<string, DOMRect>>(new Map());
  const firstRun = useRef(true);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>('[data-flip-key]'));
    const nextRects = new Map<string, DOMRect>();
    for (const el of items) {
      nextRects.set(el.dataset.flipKey as string, el.getBoundingClientRect());
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (firstRun.current || reduced) {
      firstRun.current = false;
      prevRects.current = nextRects;
      return;
    }

    for (const el of items) {
      const key = el.dataset.flipKey as string;
      const prev = prevRects.current.get(key);
      const next = nextRects.get(key) as DOMRect;
      el.style.transition = 'none';
      if (prev) {
        const dx = prev.left - next.left;
        const dy = prev.top - next.top;
        if (dx === 0 && dy === 0) {
          el.style.transform = '';
          el.style.opacity = '';
          continue;
        }
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        el.style.opacity = '';
      } else {
        el.style.transform = '';
        el.style.opacity = '0';
      }
    }

    // Force a reflow so the inverted positions are committed before transitioning.
    void container.offsetHeight;

    for (const el of items) {
      el.style.transition = 'transform 240ms var(--ease, ease), opacity 240ms ease';
      el.style.transform = '';
      el.style.opacity = '';
    }

    const timer = setTimeout(() => {
      for (const el of items) {
        el.style.transition = '';
      }
    }, 300);

    prevRects.current = nextRects;
    return () => clearTimeout(timer);
  }, [containerRef, signal]);
}
