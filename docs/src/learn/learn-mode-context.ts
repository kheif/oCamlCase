import { createContext, useContext } from 'react';
import type { LearnMode } from '../types';

export type LearnModeContextValue = {
  mode: LearnMode;
  setMode: (mode: LearnMode) => void;
};

export const LearnModeContext = createContext<LearnModeContextValue>({
  mode: 'reference',
  setMode: () => {},
});

export function useLearnMode() {
  return useContext(LearnModeContext);
}
