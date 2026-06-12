import { useLearnMode } from './learn-mode-context';

// Segmented Reference / Guided Path switch, styled to match the existing
// mini-exercise view toggle (quiet pill buttons, no new visual language).
export default function ModeToggle() {
  const { mode, setMode } = useLearnMode();
  return (
    <div className="mode-toggle" role="group" aria-label="Learning order">
      <button
        type="button"
        className={`mode-toggle-btn${mode === 'reference' ? ' active' : ''}`}
        onClick={() => setMode('reference')}
      >
        Reference
      </button>
      <button
        type="button"
        className={`mode-toggle-btn${mode === 'guided' ? ' active' : ''}`}
        onClick={() => setMode('guided')}
      >
        Guided Path
      </button>
    </div>
  );
}
