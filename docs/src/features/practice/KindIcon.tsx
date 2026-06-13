import type { PracticeExercise } from './data/types';

export default function KindIcon({ kind, size = 14 }: { kind: PracticeExercise['kind']; size?: number }) {
  const base = {
    width: size,
    height: size,
    viewBox: '0 0 14 14',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };
  switch (kind) {
    case 'predict-output':
      // terminal: > cursor + underscore
      return (
        <svg {...base}>
          <path d="M2 4.5L6 7L2 9.5" />
          <line x1="8" y1="9.5" x2="12" y2="9.5" />
        </svg>
      );
    case 'predict-type':
      // angle brackets: < T >
      return (
        <svg {...base}>
          <path d="M3 4L1.5 7L3 10" />
          <path d="M11 4L12.5 7L11 10" />
          <line x1="5" y1="7" x2="9" y2="7" />
        </svg>
      );
    case 'fix-error':
      // warning triangle with dot
      return (
        <svg {...base}>
          <path d="M7 1.5L13 12.5H1L7 1.5Z" />
          <line x1="7" y1="5.5" x2="7" y2="8.5" />
          <circle cx="7" cy="10.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'complete':
      // braces { ... }
      return (
        <svg {...base}>
          <path d="M5.5 3H4C3.17 3 2.5 3.67 2.5 4.5V9.5C2.5 10.33 3.17 11 4 11H5.5" />
          <path d="M8.5 3H10C10.83 3 11.5 3.67 11.5 4.5V9.5C11.5 10.33 10.83 11 10 11H8.5" />
          <circle cx="5.5" cy="7" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="7" cy="7" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="7" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'refactor':
      // two curved arrows (refresh)
      return (
        <svg {...base}>
          <path d="M2 5C3 2.5 6 1.5 8.5 3L10.5 4" />
          <path d="M10.5 4L10.5 7L7.5 6" />
          <path d="M12 9C11 11.5 8 12.5 5.5 11L3.5 10" />
          <path d="M3.5 10L3.5 7L6.5 8" />
        </svg>
      );
  }
}
