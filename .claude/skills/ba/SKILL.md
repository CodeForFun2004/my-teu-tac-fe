---
name: ba
description: Use before implementing any feature/page whose business rules aren't fully clear yet (pricing, stock, checkout, auth, account, promotions...) or when converting a Stitch design that implies logic beyond static layout. Produces a written spec in docs/specs/ instead of letting business rules get improvised inline while coding. Trigger phrases - "phân tích nghiệp vụ", "viết spec cho...", "user story", "trước khi code thì...".
---

# BA (Business Analyst) Skill

Purpose: turn a feature request into a written spec **before** code gets written, so vibe-coding sessions don't silently invent business rules (pricing logic, stock rules, order states...) that later contradict each other across features.

## When to run this

- A new feature/page has no corresponding Stitch design (e.g. `auth`, `user`, deeper `checkout` logic).
- A Stitch design exists but implies business logic the static HTML doesn't capture (e.g. Cart's voucher input, workshop registration capacity, stock-out states).
- The user asks to "plan", "spec", or "phân tích" a feature before building it.

Skip this for pure visual/layout work that has no business-rule ambiguity — that's the `stitch-convert` skill's job.

## Process

1. **Read context first, don't guess blind**:
   - Check `CLAUDE.md` §4 (Feature ↔ Page ↔ Route Map) for where this feature fits.
   - Check the matching `Stich-Design/<Page>/` folder if one exists (`code.html`, `DESIGN.md`, `screen.png`) for UI cues about the flow.
   - Check the target feature folder in `src/features/<feature>/` for anything already scaffolded (types, slice, components) so the spec doesn't contradict existing code.
   - Check `docs/backlog.md` if it exists, for related in-flight work.

2. **Identify what's genuinely ambiguous.** Don't spec things that are obvious from the design or from standard e-commerce conventions — focus the spec on decisions that actually need to be made (pricing rules, validation rules, state transitions, edge cases). If a business rule is unclear and consequential (e.g. "can a voucher stack with the combo discount?", "what happens to cart if a product goes out of stock mid-checkout?"), ask the user directly rather than inventing an answer — a wrong guess here costs more than a short question.

3. **Write the spec** to `docs/specs/<feature-slug>.md` using this structure:

```markdown
# <Feature name> — Spec

## Mục tiêu & phạm vi
(1-2 câu: feature này giải quyết gì, không bao gồm gì)

## Actor
(Ai dùng: khách vãng lai, khách đã đăng nhập, admin...)

## User flow chính
1. ...
2. ...

## Business rules & edge cases
- Rule: ...
  - Edge case: ...

## Data model nháp
(Field | Type | Ghi chú — phải khớp/định hướng cho src/types/ và feature's types/)

## API cần thiết
(Endpoint giả định | Method | Request | Response — để services/ implement mock rồi thay bằng thật sau)

## Acceptance criteria
- [ ] ...
- [ ] ...

## Liên kết
- Stitch design: Stich-Design/<Page>/ (nếu có)
- Feature code: src/features/<feature>/
```

4. **Do not write implementation code in this pass.** The BA skill's output is the spec file only. Hand off to normal coding (or the `stitch-convert` skill for design-driven pages) afterward.

5. If `docs/backlog.md` exists, add a line linking to the new spec under the relevant feature so the `pm` skill picks it up next time it runs.
