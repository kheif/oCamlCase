# Decisions & Knowledge

Critical, non-obvious knowledge for this project: gotchas and constraints that will bite
you, plus genuine decisions (where there was a real fork and a reason for the pick), and
lessons from corrections. This is **not** a commit log and **not** a feature inventory --
do not record facts that are plainly derivable from the code (file lists, what a component
renders, how many of X exist). Append a short, dated `what + why` entry. Keep it skimmable.

---

## Architecture

- **OCaml toplevel needs a hidden DOM subtree, not just `#output`.** The
  `toplevel-5.1.1.js` bundle's `onload` init wires stdout to `#output` only if
  `#toplevel-container`, `#output`, `#userinput`, and a working `#test-canvas` all exist;
  otherwise it throws `Not_found` and silently falls back to writing to the JS console,
  so `#output` stays empty. `useOcamlToplevel.ts > ensureOutputEl()` recreates this
  subtree (mirrors `src/features/playground/legacy/playground-body.html`). _2026-06-15_
- **Practice test runner: compile once, run each test with `reset:false`.** After
  compiling user code (with reset), run each test expression against the persisted
  definitions WITHOUT reset, so the toplevel does not re-echo `val name : type = <fun>`
  into the output (which `firstLine()` would otherwise pick up instead of the printed
  result). Mirrors `playground-main.js` runCode. _2026-06-15_
- **CodeMirror reuses the Playground bundle.** Practice editor (`CmEditor.tsx`) loads
  `/playground/js/codemirror/*.js` + themes; type hints rendered as line-widgets above
  each `let` via `addLineWidget({above:true})`. _2026-06-14_

## UX / UI

- **Practice pages: full light/dark theme** (chosen over the earlier two-tone "light left
  / dark code panel" look). In light mode the code panel + editor + read-only code blocks
  are light; dark mode all dark. Theme tokens live in `Practice.css` (`--pr-*`); the dark
  block must match `.pr-page[data-theme='dark']` (the attribute sits ON `.pr-page`, not an
  ancestor). CodeMirror theme bg needs `.pr-page .CodeMirror.cm-s-ocamlcase{,-light}`
  (specificity 0,3,0) to beat base `codemirror.css .CodeMirror{background:#fff}`. _2026-06-15_
- **Quiet warm-paper aesthetic is intentional.** Demos match the existing demo-box look
  exactly; do not restyle chrome unless asked. _2026-06-11_

## UX / UI (practice, mobile)

- **Predict exercises on mobile show the code INSIDE the left panel** (a `.pr-mobile-code`
  duplicate block, right panel hidden at <=700px). The two-panel layout stacks left-first,
  which put the answer box above the code -- unanswerable without scrolling. Chosen over
  reordering panels because the header/prompt must stay on top. _2026-07-13_
- **Solved state always renders a forward CTA** (`NextUpLink`: next exercise in the kind,
  or back to the kind index on the last one). The topbar arrows alone were a dead end.
  _2026-07-13_

## Behavior

- **Predict-output answers are line-normalized + multiline.** `<textarea>` input;
  `normalizeOutput` trims each line and drops trailing blank lines, so spacing/trailing
  differences do not cause false fails (and multiline expected like `1\n2\n3` is
  answerable). Don't reintroduce a single-line `<input>` here. _2026-06-15_
- **Predict-type accepts alpha-equivalent answers + redundant outer parens.** `normalizeType`
  canonically renames type variables (first distinct -> `'a`, ...) and strips redundant
  outer parens, but keeps structurally different types distinct (`'a -> 'b` != `'a -> 'a`).
  _2026-06-15_

## Lessons (corrections)

- **2026-06-11 — Demo UI redesign rejected.** Upgraded stack-demo motion (accepted), then
  did an unrequested visual redesign (memory wells, heat overlay, LED gauges). User: "no
  okay revert last changes back."
  - Rule: "improve the animation/feel" = motion/rhythm/choreography ONLY. Do not restyle
    chrome (controls, columns, counters, captions) unless explicitly asked.
  - Rule: when a pass might be rejected, keep edits in clearly separable passes (one
    concern each) so a revert is mechanical.
