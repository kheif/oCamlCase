import { useCallback, useState, type ReactNode } from 'react';
import type { LearnMode } from '../types';
import { LearnModeContext } from './learn-mode-context';

const STORAGE_KEY = 'learn-mode';

function loadInitialMode(): LearnMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'guided' || stored === 'reference') return stored;
  } catch {
    // localStorage unavailable (private mode); fall through to default
  }
  return 'reference';
}

export function LearnModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<LearnMode>(loadInitialMode);

  const setMode = useCallback((next: LearnMode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // persistence is best-effort
    }
  }, []);

  return <LearnModeContext.Provider value={{ mode, setMode }}>{children}</LearnModeContext.Provider>;
}
