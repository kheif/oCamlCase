# Building an Interpreter (ToyCaml) — Lecture 8 implementation

Plan map: `~/.claude/plans/flickering-kindling-diffie.md`

Ship in pipeline order, one vertical slice at a time.

## Slice 1 — Lexing ✅ DONE

- [x] `src/hooks/useStepper.ts` — extract shared stepper hook
- [x] `src/features/interpreter/lex.ts` — lecture-faithful instrumented lexer (token type + step trace)
- [x] `src/features/interpreter/LexerView.tsx` — char-strip → token-strip animated stepper
- [x] `src/features/interpreter/Lexing.tsx` — page (intro, code panels, grammar, widget)
- [x] `src/features/interpreter/Interpreter.css` — scoped styles
- [x] `src/App.tsx` — route `/interpreter/lexing`
- [x] `src/content/nav.ts` — new sidebar group "Building an Interpreter"
- [x] verify: `npm run build` (tsc + vite) clean, `npm run lint` clean, DEV self-check matches slide p29

## Slice 2 — Parsing ✅ DONE

- [x] `src/features/interpreter/parse.ts` — recursive-descent parser (lecture fragment) → CST + AST + step trace
- [x] `src/features/interpreter/ParserView.tsx` — token cursor + growing concrete syntax tree, stepper
- [x] `src/features/interpreter/Parsing.tsx` — grammar, derivation sequence, widget, code panels (p42–45)
- [x] `lex.ts` — added `tokenText` (surface forms) for CST leaves
- [x] CST + token-cursor + derivation CSS in `Interpreter.css`
- [x] route `/interpreter/parsing` + nav entry "2. Parsing"
- [x] verify: build + lint clean; vite-node check p45/p46 ASTs exact, cursor monotonic, fragment rejects ops

## Slice 3 — Dynamic Semantics ✅ DONE

- [x] `src/features/interpreter/evalTrace.ts` — `evalDerivation` builds value-judgement tree `V ⊢ e ⇒ v`
  (Dconst/Did/Dop/Diftrue/Diffalse/Dabs/Dapp); wraps same logic as pure `evaluate`
- [x] `src/features/interpreter/ValueDerivationTree.tsx` — natural-deduction renderer, post-order reveal
- [x] `src/features/interpreter/Dynamics.tsx` — value/closure intro, live rule cards (active highlight),
  widget, Dapp 4-step, `eval` code panel, type-erasure note
- [x] `vd-*` + `vr-*` CSS in `Interpreter.css`
- [x] route `/interpreter/dynamics`; nav 3. Static Semantics (reuse) + 4. Dynamic Semantics
- [x] **fixed pre-existing bug** in `toycaml/parser.ts`: `->` never tokenized (PUNCT3 2-char vs 3-char
  slice); moved to PUNCT2, dropped dead PUNCT3 path. Affected every `fun ... ->` (incl. elaborator)
- [x] verify: build + lint clean; vite-node — derivation == pure `evaluate` == slide values (5/6/7/1)

## Slice 4 — Recursion & Divergence ✅ DONE

- [x] `ast.ts` — `RFun` constructor (+ showExp/showExpAst/free/maybeParens)
- [x] `elab.ts` — `Srabs` rule (assume fn type while checking body)
- [x] `eval.ts` — `VRClosure` recursive closure; RFun eval; FApp rebinds fn name (Drapp)
- [x] `parser.ts` — parse `rfun f (x:t) : t' -> e`; **atomic retTy** (the trailing `->` separates body;
  parenthesize function return types). Added `rfun` keyword
- [x] `evalTrace.ts` — Drabs/Drapp + VRClosure display `(f,x,e,V)`; **fuel-capped** `evalDerivation`
  (budget param) so divergence is visualized safely instead of hanging
- [x] `Recursion.tsx` — rfun intro, Srabs/Drabs/Drapp rule cards (active highlight), widget (BUDGET 140),
  capped-divergence preset, eval-with-rfun code panel, divergence section
- [x] route `/interpreter/recursion`; nav "5. Recursion & Divergence"
- [x] verify: build + lint clean; vite-node — fac 3=6, fac 5=120, sum 4=10 (all == pure evaluate);
  fac 3 = 41 nodes (uncapped); diverging loop capped at budget with root error

## Mini Exercise Polish ✅ DONE

- [x] `MiniExercisePage.css` — me-pop/me-shake/me-correct-in/me-slide-up/me-slide-in-right keyframes; drag-over upgrade; all under prefers-reduced-motion
- [x] `MiniExerciseIndex.tsx` — viewMode state (concept|difficulty), localStorage persist, difficulty grouping
- [x] `MiniExerciseIndex.css` — .mini-view-toggle / .mini-view-btn / .mini-view-btn.active

## Content Expansion: 20 Concepts + Minis + JSON-LD + Celebration Pilot ✅ DONE (2026-06-11)

Plan map: `~/.claude/plans/you-are-a-senior-zany-lamport.md`

- [x] 3 new concept pages: 17. Options & Result (`options-result.html`, Options section
  extracted from constructors-exceptions + Option module/result/comparison fresh),
  18. Records (`records.html`), 20. Mutability: Refs & Arrays (`mutability.html`);
  Trees renumbered 17→19
- [x] All 20 page headers normalized to "Concept N of 20" (was a 14/17 mix)
- [x] `registry.ts` 3 entries + trees renum; footers patched (constructors-exceptions,
  trees, bindings deep-dive → mutability); `sitemap.xml` +3 (37 URLs)
- [x] `pattern-matching.html` — new "Or-patterns and as-patterns" section
- [x] 7 new mini exercises (26→33): safe-div, opt-chain, result-validate, record-make,
  record-update, ref-counter, array-sum; categories options/records/mutability wired
  in `data/index.ts` + `MiniExerciseIndex.tsx`
- [x] Stale counts fixed everywhere: home.html, index.html (meta + JSON-LD), ExercisesHub,
  MiniExerciseIndex, README (was even staler: 15 minis / 3 exercises)
- [x] `PageMeta.tsx` — per-page Article/LearningResource JSON-LD on /concepts/* and
  /exercises/* (upsert `#page-jsonld`, removed elsewhere)
- [x] Animation pilot: success celebration on `runCheck()` only (not Solution button) —
  `ConfettiBurst.tsx` (in-house canvas, ~36 particles, 900ms, reduced-motion → null),
  slot cascade-pop (55ms stagger, overshoot bezier), SVG checkmark draw, status spring,
  progress-dot pulse. All keyframes inside prefers-reduced-motion guard
- [x] verify: typecheck + build clean; my files lint clean (2 pre-existing `catch {}`
  no-empty errors in MiniExerciseIndex.tsx untouched); bundle markers confirmed;
  mini outputs hand-traced (no native OCaml on this machine)

## Concept Demo Pilot: React Island Stack Demo ✅ DONE (2026-06-11)

User clarified Duolingo-standard animations were meant for CONCEPT demos, not exercises
(confetti kept). Pilot = tail-recursion "Watch the stack grow".

- [x] `index.css` reduce rule: + `transition-delay: 0ms !important` (real gap — staggered
  demos in trees/constructors-exceptions revealed in delayed waves under reduce)
- [x] Island infra: `src/content/islands.tsx` registry; `ContentPage.tsx` mounts
  `[data-island]` placeholders via createRoot into a fresh child host per mount
  (StrictMode-safe: deferred unmount can't clobber successor root), cleanup deferred
  one tick
- [x] `src/features/demos/StackGrowthDemo.tsx` + `.css` — useStepper(9, 900ms), 9 steps
  (descend 1-4, base 5, one pop per step 6-9), spring frame drops, pop lift-off + receive
  flash, countdown slot pulse (re-keyed frame), real-text depth tick, result chip glow,
  one-shot IntersectionObserver auto-start (R1: remove if intrusive). Base CSS = final
  states; keyframes motion-only (reduce-safe)
- [x] `tail-recursion.html` — demo block → `<div data-island="stack-growth">`; all
  `#ss-*`/`.stack-*` inline styles pruned; acc-demo untouched (66 acc/as refs intact)
- [x] verify: typecheck/lint/build clean; bundle shrank (HTML demo removed); no ss-/stack-
  leftovers. Manual feel pass pending user (autoplay, scrub, dark, mobile, reduce)

Rollout candidates after verdict: exception unwind, insertion sort, closure formation.

### Feel pass 2 (same day, "still doesn't feel good")
- [x] `useStepper` accepts `intervalMs: number | (nextIdx) => number` (backward compatible)
- [x] Variable rhythm: pushes 800ms, base-case beat 1000ms, pops 1150ms, finale hold 1250ms
- [x] Pop now ends at opacity 0 (+ lift/rotate) — unmount snap gone; resolved equation
  snaps in via keyed span (`sg-eq-in`) before lift-off
- [x] Weight: landing squash in `sg-drop`; frames below absorb impact (`sg-press-a/b`
  parity-keyed so it retriggers each push)
- [x] Focus: `is-top` accent edge follows executing frame (receiver during pops)
- [x] Narrative polish: caption crossfade per step, 3px progress track fill, "stack empty"
  dashed placeholders at step 0/9, result chip delayed until final pop clears (0.5s)

### Loop mode (user request)
- [x] Demo auto-loops: finale holds 1800ms then replays from step 0, forever, until any
  control press (`interactedRef` via existing `manual()` wrapper kills auto mode)
- [x] Visibility-aware: loop pauses off-screen (IntersectionObserver tracks continuously),
  resumes when scrolled back to a finished demo; reduced-motion users never auto-loop

### UI pass 3 (designer pass) — ❌ REVERTED at user request
Memory wells + heat overlay, segmented depth gauges, red/green column temperature,
filled-Play control hierarchy, caption step badges. User rejected; fully reverted to
feel-pass-2 state (build re-verified, JS/CSS hashes match pass-2 output). Animations
(pass 2) retained. Lesson: visual redesign of demo chrome unwanted — keep site's quiet
chrome, invest only in motion.

## Later slices

- [ ] Capstone pipeline REPL + PipelineRail (chars→tokens→AST→type→value, M6+M8)
- [ ] Overview page; migrate TreeLab/Toycaml to shared useStepper
- [ ] Modules/signatures concept page (deferred from content expansion)
- [ ] Celebration rollout (after pilot review): index card completion, 100% progress moment
- [ ] Pre-rendering for SEO (JSON-LD currently client-injected)
- [ ] Verify 7 new mini-exercise outputs in the browser Playground

## Review

Content expansion 2026-06-11: site now 20 concepts / 33 minis. Pilot awaiting user
verdict on feel (repeat-trigger gating via `completed` set is the fallback if annoying).
