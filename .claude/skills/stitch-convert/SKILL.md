---
name: stitch-convert
description: Use when turning a Stich-Design/<Page> folder (code.html + DESIGN.md + screen.png) into real feature-first React/TSX code in src/. This is the repeatable checklist for design-to-code conversion on this project - trigger phrases "convert trang này", "lên code cho trang...", "implement <Page> từ Stitch".
---

# Stitch → Code Conversion Skill

Purpose: convert a static Stitch mockup into production TSX that follows `CLAUDE.md` exactly, without re-deriving the same decisions (Tailwind vs SCSS, shared components, data vs hardcoded strings) every time.

This assumes `CLAUDE.md` §2/§3/§4 as prerequisite reading — this skill is the step-by-step execution of those rules for one specific page.

## Process

1. **Read the source**: `Stich-Design/<Page>/code.html`, `DESIGN.md` (tokens — already ported into `src/index.css`, read only for context/intent), `screen.png` (visual reference for anything the HTML structure doesn't make obvious).

2. **Check `CLAUDE.md` §4's Feature ↔ Page ↔ Route Map** for which feature/route this page belongs to. If the page isn't in the table, stop and update the table first (don't silently invent a new feature folder).

3. **Split shared vs. page-specific markup**:
   - TopNavBar and Footer markup is identical across every Stitch page → these must already exist in (or be added to) `src/components/layout/Navbar.tsx` and `Footer.tsx`. If they don't exist yet, build them once, generically, before the page-specific work — don't inline nav/footer markup into the feature page.
   - Anything else specific to this page becomes components under `src/features/<feature>/components/`.
   - A component reused by *multiple features* (e.g. `ProductCard` used by Home, Shop, and ProductDetail's related items) belongs in the owning feature's `components/` and gets imported by the others — not copy-pasted.

4. **Convert markup, not just copy it**:
   - Utility classes can largely be reused verbatim since the Tailwind theme mirrors Stitch's tokens 1:1 — don't rewrite class names that already work.
   - Replace business data (names, prices, dates, stock, images) with typed props/state sourced from `src/features/<feature>/types/` and `services/` (mock data acceptable at first — shape it like the real API response so swapping later is a one-file change).
   - Replace Stitch's `lh3.googleusercontent.com` image URLs with either a local placeholder asset or the entity's real `imageUrl` field — never hardcode a Stitch mockup URL into a component.
   - Icons: use the shared `Icon` component (`src/components/common/Icon.tsx`, wraps `<span class="material-symbols-outlined">`) instead of repeating raw spans — pass the Material Symbol name (e.g. `shopping_cart`, `expand_more`, `add_shopping_cart`) as a prop.
   - Forms (workshop registration, shipping info, voucher input): wire with `formik` + `yup`, typed initial values — don't leave them as uncontrolled static `<input>` markup.

5. **Wire state**:
   - Page-level or cross-page state (cart contents, product catalog, auth) → the feature's Redux slice.
   - Page-local UI state (open/close dropdown, active tab, form draft before submit) → `useState`.

6. **Route it**: register the page in `src/routes/AppRoutes.tsx` per the path in `CLAUDE.md` §4's table.

7. **Verify before calling it done**:
   - `npm run build` passes (type-check + bundle).
   - Visually sanity-check in the dev server (`npm run dev`) — compare against `screen.png`, don't just trust that the classes compiled.
   - No leftover literal Vietnamese business data that should have come from `services/` (spot-check prices/names against what a second product would need to look different).

## Common pitfalls on this project specifically

- Don't reintroduce SCSS/CSS Modules — Tailwind only (`CLAUDE.md` §1).
- Don't reintroduce `lucide-react` — Material Symbols only.
- Don't duplicate Navbar/Footer per feature — one shared implementation in `src/components/layout/`.
- Don't invent new design tokens — if a Stitch page seems to need a color/size not in `src/index.css`'s `@theme`, double-check `DESIGN.md` first; it's probably already there under a slightly different utility (e.g. the `deep-red` CTA color, `ghost-border`, `gold-gradient-divider`).
