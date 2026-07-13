# TODO

Task inbox. Add tasks here (or tell me in chat). I read this at the start of work and
whenever you say you wrote something here. Done items get removed -- this is a live
inbox, not a history log. Durable decisions that come out of a task move to `DECISIONS.md`.

## Now

Practice-fix audit plan (2026-07-13). Verified in dev: toplevel runs, pass/fail + answer
checking correct, light/dark theme correct. Remaining, in priority order:

- [ ] Ship it: merge `fix/practice-exercises-theme` into `main`, push (deploy workflow
      runs tests then publishes). Live site still has the broken practice pages.
- [ ] Scroll-to-top on route change (react-router keeps old scroll; pages open mid-scroll)
- [ ] Add `PageMeta` to `PracticePage` + `PracticeKindIndex` (only pages without titles/SEO)
- [ ] Platform-aware kbd hint: show `Ctrl ↵` on Windows/Linux, `⌘↵` on Mac (hardcoded ⌘ now)
- [ ] "Next exercise" CTA in the success state (all-pass / correct feedback) -- current
      dead-end forces hunting the small top-right arrows
- [ ] Mobile: predict-output/predict-type panel order -- code should stack ABOVE the
      answer input (code currently below the fold)
- [ ] Route-level code splitting with `React.lazy` (single 840 kB JS chunk today)
- [ ] Mobile topbar: theme toggle clipped off right edge

## Later

Carried over from the old `tasks/todo.md` backlog (still open):

- [ ] Capstone pipeline REPL + PipelineRail (chars -> tokens -> AST -> type -> value, M6+M8)
- [ ] Overview page; migrate TreeLab/Toycaml to shared `useStepper`
- [ ] Celebration rollout (after pilot review): index card completion, 100% progress moment
- [ ] Pre-rendering for SEO (JSON-LD currently client-injected)
- [ ] Verify 7 new mini-exercise outputs in the browser Playground

## Notes

- Format is free; a `- [ ]` checkbox or a plain line both work.
- The old "5 exercise types" spec that lived here is shipped; its rationale is in
  `DECISIONS.md` (Behavior).
