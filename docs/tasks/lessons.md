# Lessons

## 2026-06-11 — Demo UI redesign rejected
- **What happened:** Upgraded stack-demo MOTION (accepted), then did an unrequested-scope
  visual redesign (memory wells, heat overlay, LED depth gauges, filled-Play controls).
  User: "no okay revert last changes back."
- **Rule:** On this site, "improve the animation/feel" = motion, rhythm, choreography ONLY.
  Do not restyle chrome (controls, columns, counters, captions) unless explicitly asked.
  The site's quiet warm-paper aesthetic is intentional; demos should match existing
  demo-box look exactly.
- **Rule:** When a pass might be rejected, keep it in clearly separable edits (one concern
  per pass) so a revert is mechanical. This worked: pass 3 reverted cleanly because pass 2
  and pass 3 never touched the same declarations.
