import { useEffect, useState } from 'react';

// Shared "reveal a process one step at a time" hook, extracted from the pattern
// first written in TreeLab/Toycaml. A stepper owns an index in [0, totalSteps]:
// 0 = nothing revealed, totalSteps = fully revealed. It autoplays at a fixed
// cadence and resets to fully-revealed whenever the underlying step count
// changes (new input), so the result never feels "stuck" mid-animation.
//
// Used by the interpreter feature (LexerView, ParserView) and intended to
// replace the inline copies in TreeLab/Toycaml in a later pass.
export function useStepper(totalSteps: number, intervalMs = 700) {
  const [stepIdx, setStepIdx] = useState(totalSteps);
  const [playing, setPlaying] = useState(false);

  // Adjust-on-identity-change: when totalSteps changes (input edited), jump to
  // fully-revealed and stop any autoplay.
  const [seen, setSeen] = useState(totalSteps);
  if (totalSteps !== seen) {
    setSeen(totalSteps);
    setStepIdx(totalSteps);
    if (playing) setPlaying(false);
  }

  useEffect(() => {
    if (!playing || stepIdx >= totalSteps) return;
    const id = setTimeout(() => setStepIdx((s) => Math.min(totalSteps, s + 1)), intervalMs);
    return () => clearTimeout(id);
  }, [playing, stepIdx, totalSteps, intervalMs]);

  // Clamp so consumers never receive an out-of-bounds index on the stale render
  // frame before state catches up.
  const clamped = Math.min(stepIdx, totalSteps);
  const atEnd = clamped >= totalSteps;

  function togglePlay() {
    if (atEnd) {
      setStepIdx(0);
      setPlaying(true);
    } else {
      setPlaying((p) => !p);
    }
  }
  function prev() {
    setPlaying(false);
    setStepIdx((s) => Math.max(0, s - 1));
  }
  function next() {
    setPlaying(false);
    setStepIdx((s) => Math.min(totalSteps, s + 1));
  }
  function replay() {
    setStepIdx(0);
    setPlaying(false);
  }
  function showAll() {
    setStepIdx(totalSteps);
    setPlaying(false);
  }

  return { stepIdx: clamped, playing, atEnd, togglePlay, prev, next, replay, showAll };
}
