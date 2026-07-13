# Workflow Orchestration

## 1. Plan Mode Default

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

## 2. Subagent Strategy

- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

## 3. Self-Improvement Loop

- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

## 4. Verification Before Done

- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

## 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

## 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

# Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

---

# Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- The graph is auto-refreshed by a `Stop` hook (`.claude/settings.json`) when source files change; a manual `graphify update .` is the fallback.

---

# Knowledge & Task System

Three files, three jobs. Keep them distinct -- do not let history pile up anywhere.

- **`TODO.md`** = task inbox. Read it at the start of work and whenever the user says they
  wrote something there. Remove items when done. It is a live inbox, not a log.
- **`DECISIONS.md`** = durable knowledge: design, UX/UI, behavior, architecture decisions
  and lessons from corrections. After any such decision (or a non-obvious thing learned),
  append a short dated `what + why` entry under the right section. This replaces
  commit-by-commit logs -- never recreate those. Before starting work in an area you do
  not already know, skim `DECISIONS.md` for relevant gotchas.
- **Plans** (`~/.claude/plans/*.md`) are ephemeral scratch. Delete a plan once its work
  ships/commits. Never let them accumulate.
- **Auto-memory** (`~/.claude/.../memory/`) holds only personal / cross-project preferences
  (e.g. no-em-dash, working style). Project knowledge goes in `DECISIONS.md`, not memory.

Token discipline (these files load every session, keep them lean): prefer
`graphify query/path/explain` over grep; read targeted file ranges; delegate broad search
to subagents; DECISIONS.md is read on demand, not loaded by default.
