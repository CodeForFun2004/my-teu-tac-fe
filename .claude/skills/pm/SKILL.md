---
name: pm
description: Use to check project status, plan what to work on next, or update progress tracking for this repo. Maintains docs/backlog.md grounded in the actual state of the code (not assumptions). Trigger phrases - "còn gì cần làm", "tiếp theo làm gì", "cập nhật tiến độ", "roadmap", "backlog".
---

# PM (Project Manager) Skill

Purpose: keep a single living source of truth for "what's built, what's next" across vibe-coding sessions on this solo project, so progress isn't lost between conversations and work doesn't get duplicated or forgotten.

## When to run this

- At the start of a work session, to decide what to work on.
- At the end of a work session, to record what got done.
- Whenever the user asks about project status, roadmap, or "what's left".

## Process

1. **Ground truth first.** Before touching `docs/backlog.md`, check the actual repo state:
   - `Glob`/`Grep` across `src/features/*/` to see which slices/services/pages are implemented vs. still empty stubs.
   - Check `src/routes/AppRoutes.tsx` for which routes are actually wired up.
   - Check `docs/specs/` for specs written by the `ba` skill that don't have corresponding code yet.
   - Cross-reference against `CLAUDE.md` §4's Feature ↔ Page ↔ Route Map.

2. **Read `docs/backlog.md`.** If it doesn't exist yet, create it using the template below, seeded from the ground-truth check in step 1 (don't invent scope the user hasn't mentioned).

3. **Reconcile.** Mark tasks done that the code now shows as done. Flag tasks that were marked done but no longer match the code (regressions, reverted work). Don't mark something done just because a file exists — an empty stub file is not "done".

4. **Report/update, don't implement.** This skill plans and tracks; it does not write feature code itself. If the user wants to act on the plan, hand off to normal implementation (or `stitch-convert` / `ba` as appropriate).

5. When asked "what's next", recommend based on: (a) unblocking dependencies first (e.g. shared `layout/Navbar` before individual pages that need it), (b) what has a Stitch design ready (lower ambiguity, faster) over what needs a `ba` spec first, (c) the user's stated priority if they gave one.

## `docs/backlog.md` template

```markdown
# Backlog — Tễu Tạc FE

_Last updated: <date>_

## Roadmap (MVP)
- [ ] Shared layout (Navbar, Footer)
- [ ] Home page
- [ ] Shop (product list)
- [ ] Product detail
- [ ] Cart / single-page checkout
- [ ] Auth (login/register)
- [ ] User account (profile, order history)

## Tasks

| Feature | Task | Status | Notes |
|---|---|---|---|
| layout | Navbar + Footer shared components | todo | Blocks all pages |
| home | HomePage sections | todo | Depends on layout, products service |
| products | ProductListPage | todo | |
| products | ProductDetailPage | todo | |
| cart | CartPage (single-page checkout UI) | todo | |
| checkout | createOrder logic | todo | Backs Cart page CTA — see CLAUDE.md §4 |

## Next up
1. ...
2. ...
3. ...
```

Keep this file terse — it's a working tracker, not documentation. Long-form rationale belongs in `docs/specs/` via the `ba` skill, not here.
